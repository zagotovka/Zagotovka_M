// Copyright (c) 2023 Cesanta Software Limited
// All rights reserved

#include "net.h"
#include "zagotovka.h"
#include "setings.h" /* Power On State: ponr_eff_*() */
#include "logger.h"
#include "ds18b20.h"
#include "ds18b20Config.h"
#include "main.h"
#include "compat_ota.h"
#include "fw_meta.h"
#include "fmt_float.h"
#include <stdlib.h>   // rand()
#include <stdarg.h>   // va_list for ota_log_direct()
#include "cond_eval.h" /* текст условия связи для /api/state/encoder */
#include "dtcm_alloc.h"
#include "net_limits.h"  /* единый бюджет соединений + пороги heap */

struct user {
  const char *name, *pass;
  char access_token[33];  // генерируется при логине, не константа
};

// Settings
struct settings {
  bool log_enabled;
  int log_level;
  long brightness;
  char *device_name;
};

static const char default_name[] = "My Device";
static struct settings s_settings = {true, 1, 57, NULL};

const char *s_json_header =
    "Content-Type: application/json\r\n"
    "Cache-Control: no-cache\r\n";

extern struct dbPinsConf PinsConf[NUMPIN];

/* ─── Static file header ─── */


int ui_event_next(int no, struct ui_event *e) {
  if (no < 0 || no >= MAX_EVENTS_NO) return 0;

  /* Инициализируем srand() один раз аппаратным RNG.
     rand() используется исключительно для генерации демонстрационных событий (non-security). */
  static bool srand_done = false;
  if (!srand_done) {
    extern RNG_HandleTypeDef hrng;
    uint32_t rnd;
    if (HAL_RNG_GenerateRandomNumber(&hrng, &rnd) == HAL_OK) {
      srand((unsigned) rnd);
    } else {
      srand((unsigned) mg_millis());  /* fallback (non-security) */
    }
    srand_done = true;
  }
  e->type = (uint8_t) rand() % 4;
  e->prio = (uint8_t) rand() % 3;
  e->timestamp =
      (unsigned long) ((int64_t) mg_now() - 86400 * 1000 /* one day back */ +
                       no * 300 * 1000 /* 5 mins between alerts */ +
                       1000 * (rand() % 300) /* randomize event time */) /
      1000UL;

  mg_snprintf(e->text, MAX_EVENT_TEXT_SIZE, "event#%d", no);
  return no + 1;
}

uint64_t s_boot_timestamp = 0;

static bool s_sntp_synced = false;  /* время получено  -  не спамим UDP */

static void sfn(struct mg_connection *c, int ev, void *ev_data) {
  if (ev == MG_EV_SNTP_TIME) {
    uint64_t t = *(uint64_t *) ev_data;
    s_boot_timestamp = t - mg_millis();
    s_sntp_synced = true;
    MG_INFO(("SNTP synced"));
  }
}

static void timer_sntp_fn(void *param) {  // SNTP timer function. Sync up time
  /* После первой синхронизации  -  не создаём новые UDP соединения.
     Это предотвращает 540 alloc/free циклов в час на heap_4. */
  static uint64_t s_last_sntp = 0;
  if (s_sntp_synced) {
    /* Ресинхронизация раз в час */
    if (mg_millis() - s_last_sntp < 3600ULL * 1000) return;
  }
  s_last_sntp = mg_millis();
  mg_sntp_connect(param, "udp://time.google.com:123", sfn, NULL);
}

/* ── One active session ── */
static struct user   *s_active_user       = NULL;  // кто сейчас залогинен
static uint32_t       s_session_last_seen = 0;
static char           s_last_client_ip[40] = {0};  // IP:port предыдущей сессии
#define SESSION_TIMEOUT_MS 30000U

static void session_generate_token(struct user *u) {
  static bool srand_done = false;
  if (!srand_done) {
    extern RNG_HandleTypeDef hrng;
    uint32_t rnd;
    if (HAL_RNG_GenerateRandomNumber(&hrng, &rnd) == HAL_OK)
      srand((unsigned) rnd);
    else
      srand((unsigned) HAL_GetTick());
    srand_done = true;
  }
  static const char hex[] = "0123456789abcdef";
  for (int i = 0; i < 32; i++)
    u->access_token[i] = hex[rand() % 16];
  u->access_token[32] = '\0';
}

static bool session_is_active(void) {
  if (s_active_user == NULL) return false;
  return (HAL_GetTick() - s_session_last_seen) < SESSION_TIMEOUT_MS;
}

// Parse HTTP requests, return authenticated user or NULL
//static struct user *authenticate(struct mg_http_message *hm) {
struct user *authenticate(struct mg_http_message *hm) {
  static struct user users[] = {
      {SetSettings.adm_name, SetSettings.adm_pswd, ""},
      {"Zerg", "Sworm", ""},
      {NULL, NULL, ""},
  };
  char user[64], pass[64];
  struct user *u, *result = NULL;
  mg_http_creds(hm, user, sizeof(user), pass, sizeof(pass));
  MG_VERBOSE(("user [%s] pass [%s]", user, pass));

  if (user[0] != '\0' && pass[0] != '\0') {
    // Логин по user+pass
    for (u = users; result == NULL && u->name != NULL; u++)
      if (strcmp(user, u->name) == 0 && strcmp(pass, u->pass) == 0)
        result = u;
  } else if (user[0] == '\0' && pass[0] != '\0') {
    // Токен из куки
    for (u = users; result == NULL && u->name != NULL; u++)
      if (u->access_token[0] != '\0' &&
          strcmp(pass, u->access_token) == 0)
        result = u;
    if (result != NULL) {
      // Токен найден — проверяем что это именно активная сессия
      if (!session_is_active() || s_active_user != result) {
        return NULL;  // сессия истекла или вытеснена другим логином
      }
      s_session_last_seen = HAL_GetTick();  // продлеваем
    }
  }
  return result;
}

static bool require_post_json(struct mg_connection *c, struct mg_http_message *hm) {
  if (mg_strcasecmp(hm->method, mg_str("POST")) != 0) {
    mg_http_reply(c, 405, "", "{\"error\":\"method not allowed\"}\n");
    return false;
  }
  struct mg_str *ct = mg_http_get_header(hm, "Content-Type");
  if (ct == NULL || !mg_match(*ct, mg_str("application/json*"), NULL)) {
    mg_http_reply(c, 415, "", "{\"error\":\"unsupported media type\"}\n");
    return false;
  }
  return true;
}

void handle_login(struct mg_connection *c, struct user *u) {
  char rem_buf[40];
  mg_snprintf(rem_buf, sizeof(rem_buf), "%M", mg_print_ip_port, &c->rem);

  // Если активна чужая сессия — логируем вытеснение
  if (session_is_active() && s_active_user != u) {
    printf("[NET] Session of [%s] forcibly taken over [%s], old_client=%s new_client=%s\r\n",
           s_active_user->name, u->name, s_last_client_ip, rem_buf);
  }
  // Если тот же пользователь входит повторно (другой браузер) —
  // старый токен инвалидируется, новый браузер получает новый токен
  if (session_is_active() && s_active_user == u) {
    printf("[NET] User [%s] re-login — session invalidated, old_client=%s new_client=%s\r\n",
           u->name, s_last_client_ip, rem_buf);
  } else if (!session_is_active()) {
    printf("[NET] Login success [%s], client=%s\r\n", u->name, rem_buf);
  }

  // Принудительно закрыть ВСЕ остальные клиентские TLS-соединения —
  // single-session: после этого момента валидна только текущая (c).
  // Любое другое — зомби-хвост старой сессии.
  for (struct mg_connection *t = c->mgr->conns; t != NULL; t = t->next) {
    if (t != c && t->is_tls && !t->is_listening && !t->is_closing) {
      char t_rem[40];
      mg_snprintf(t_rem, sizeof(t_rem), "%M", mg_print_ip_port, &t->rem);
      printf("[NET] Stale session conn=%lu client=%s — will expire on next request\r\n",
             t->id, t_rem);
    }
  }

  // Генерируем новый токен — старый токен (в другом браузере) умирает
  session_generate_token(u);
  s_active_user       = u;
  s_session_last_seen = HAL_GetTick();
  mg_snprintf(s_last_client_ip, sizeof(s_last_client_ip), "%s", rem_buf);

  char cookie[256];
  mg_snprintf(cookie, sizeof(cookie),
              "Set-Cookie: access_token=%s; Path=/; "
              "%sHttpOnly; SameSite=Lax; Max-Age=%d\r\n",
              u->access_token, c->is_tls ? "Secure; " : "", 3600 * 24);
  mg_http_reply(c, 200, cookie, "{%m:%m}", MG_ESC("user"), MG_ESC(u->name));
}

void handle_logout(struct mg_connection *c) {
  if (s_active_user != NULL) {
    MG_INFO(("User [%s] logged out", s_active_user->name));
    s_active_user->access_token[0] = '\0';  // инвалидируем токен
  }
  s_active_user       = NULL;
  s_session_last_seen = 0;
  char cookie[256];
  mg_snprintf(cookie, sizeof(cookie),
              "Set-Cookie: access_token=; Path=/; "
              "Expires=Thu, 01 Jan 1970 00:00:00 UTC; "
              "%sHttpOnly; Max-Age=0;\r\n",
              c->is_tls ? "Secure; " : "");
  mg_http_reply(c, 200, cookie, "true\n");
}

void handle_debug(struct mg_connection *c, struct mg_http_message *hm) {
  int level = (int) mg_json_get_long(hm->body, "$.level", MG_LL_DEBUG);

  if (level < MG_LL_NONE)    level = MG_LL_NONE;
  if (level > MG_LL_VERBOSE) level = MG_LL_VERBOSE;

  mg_log_set(level);
  mg_http_reply(c, 200, "", "Debug level set to %d\n", level);
}

#define PRINT_INT_ARR_MAX 64  // максимум элементов в points[]

static size_t print_int_arr(void (*out)(char, void *), void *ptr, va_list *ap) {
  size_t i, len = 0, num = va_arg(*ap, size_t);  // Number of items in the array
  int *arr = va_arg(*ap, int *);              // Array ptr
  if (arr == NULL || num == 0 || num > PRINT_INT_ARR_MAX) return 0;
  for (i = 0; i < num; i++) {
    len += mg_xprintf(out, ptr, "%s%d", i == 0 ? "" : ",", arr[i]);
  }
  return len;
}

void handle_stats_get(struct mg_connection *c) {
  int points[] = {21, 22, 22, 19, 18, 20, 23, 23, 22, 22, 22, 23, 22};
  mg_http_reply(c, 200, s_json_header, "{%m:%d,%m:%d,%m:[%M]}\n",
                MG_ESC("temperature"), 21,  //
                MG_ESC("humidity"), 67,     //
                MG_ESC("points"), print_int_arr,
                sizeof(points) / sizeof(points[0]), points);
}

static size_t print_events(void (*out)(char, void *), void *ptr, va_list *ap) {
  size_t len = 0;
  struct ui_event ev;
  int pageno = va_arg(*ap, int);
  int no = (pageno - 1) * EVENTS_PER_PAGE;
  int end = no + EVENTS_PER_PAGE;

  while ((no = ui_event_next(no, &ev)) != 0 && no <= end) {
    len += mg_xprintf(out, ptr, "%s{%m:%lu,%m:%d,%m:%d,%m:%m}\n",  //
                      len == 0 ? "" : ",",                         //
                      MG_ESC("time"), ev.timestamp,                //
                      MG_ESC("type"), ev.type,                     //
                      MG_ESC("prio"), ev.prio,                     //
                      MG_ESC("text"), MG_ESC(ev.text));
  }

  return len;
}

void handle_events_get(struct mg_connection *c,
                              struct mg_http_message *hm) {
  int pageno = mg_json_get_long(hm->body, "$.page", 1);
  mg_http_reply(c, 200, s_json_header, "{%m:[%M], %m:%d}\n", MG_ESC("arr"),
                print_events, pageno, MG_ESC("totalCount"), MAX_EVENTS_NO);
}

/* Хвост системного лога для веб-вьюера. tmp[] на стеке WebServerTask
 * (18 КБ) — НЕ static: в .bss свободно 64 байта, линкер-ASSERT
 * ((_ebss + _Min_Stack_Size) <= _estack) заблокирует сборку.
 *
 * Запрос: GET /api/logs/get?since=N (опрос через pollQueue, keep-alive, один
 * запрос в полёте) либо прежний POST /api/logs/get с телом {"since":N}.
 * Ответ: {"text":"...","cursor":N,"dropped":0|1,"lang":"ru"}.
 * Поле "lang" позволяет странице не запрашивать отдельно /api/mysett/get
 * (весь JSON настроек ради двух символов).
 *
 * Текст экранируется собственной функцией print_log_text: mg_print_esc
 * экранирует только \b \f \n \r \t \\ \", а любой другой управляющий байт
 * (например 0x1B из ответа модема или MQTT-нагрузки) уходил в JSON сырым,
 * JSON.parse на странице падал, и окно лога замирало.
 *
 * Размер ответа ограничен так, чтобы заголовки (~106 Б), рамка JSON (~60 Б)
 * и экранированный текст целиком помещались в один блок MG_IO_SIZE (2048 Б):
 * буфер отправки не растёт, и в куче нет пика "старый + новый буфер".
 * Обычный лог (1 КБ, переводы строк \r\n) занимает ~1,1 КБ и под предел не
 * попадает. При превышении отбрасываются самые СТАРЫЕ байты окна, ответ
 * получает dropped=1 (страница покажет пометку о пропуске). */
#define LOGS_REPLY_MAX_ESC 1700u

/* Сколько байт займёт символ в JSON-строке */
static size_t logs_esc_len(unsigned char ch) {
  switch (ch) {
    case '"': case '\\': case '\n': case '\r': case '\t': case '\b': case '\f':
      return 2;
    default:
      return ch < 0x20 ? 6 : 1;   /* \u00XX для прочих управляющих */
  }
}

/* %m-печать текста лога: аргументы (const unsigned char *p, size_t n).
 * Кавычки вокруг строки добавляет сам %m. */
static size_t print_log_text(void (*out)(char, void *), void *arg,
                             va_list *ap) {
  const unsigned char *p = va_arg(*ap, const unsigned char *);
  size_t n = va_arg(*ap, size_t);
  static const char hex[] = "0123456789abcdef";
  size_t written = 0;
  for (size_t i = 0; i < n; i++) {
    unsigned char ch = p[i];
    switch (ch) {
      case '"':  out('\\', arg); out('"', arg);  written += 2; break;
      case '\\': out('\\', arg); out('\\', arg); written += 2; break;
      case '\n': out('\\', arg); out('n', arg);  written += 2; break;
      case '\r': out('\\', arg); out('r', arg);  written += 2; break;
      case '\t': out('\\', arg); out('t', arg);  written += 2; break;
      case '\b': out('\\', arg); out('b', arg);  written += 2; break;
      case '\f': out('\\', arg); out('f', arg);  written += 2; break;
      default:
        if (ch < 0x20) {
          out('\\', arg); out('u', arg); out('0', arg); out('0', arg);
          out(hex[ch >> 4], arg); out(hex[ch & 0x0F], arg);
          written += 6;
        } else {
          out((char) ch, arg);
          written++;
        }
        break;
    }
  }
  return written;
}

/* Курсор since - счётчик записанных байт, uint32 (до 4294967295). Читать его
 * через mg_json_get_long нельзя: long на этой платформе 32-битный, и после
 * 2147483647 записанных байт (около 25 суток при 1 КБ/с) преобразование
 * double -> long выходит за диапазон (в C поведение не определено, на практике
 * значение насыщается). Курсор клиента тогда всегда оказывался меньше текущего,
 * и каждый запрос отдавал весь буфер заново с пометкой о пропуске. */
static uint32_t logs_parse_since(struct mg_str s, const char *path) {
  double dv = 0;
  if (!mg_json_get_num(s, path, &dv) || dv <= 0) return 0;
  if (dv >= 4294967295.0) return 0xFFFFFFFFu;
  return (uint32_t) dv;
}

void handle_logs_get(struct mg_connection *c, struct mg_http_message *hm) {
  uint32_t since = 0;
  if (hm->body.len > 0) {
    since = logs_parse_since(hm->body, "$.since");                 /* POST */
  } else {
    char vb[16];
    if (mg_http_get_var(&hm->query, "since", vb, sizeof(vb)) > 0)  /* GET */
      since = logs_parse_since(mg_str(vb), "$");
  }

  char tmp[LOG_RING_SIZE];
  size_t n = 0;
  uint32_t cursor = 0;
  bool dropped = false;
  logger_ring_read(since, tmp, sizeof(tmp), &n, &cursor, &dropped);

  /* Ограничиваем экранированный размер: лишнее отбрасываем с начала окна */
  size_t esc = 0;
  for (size_t i = 0; i < n; i++) esc += logs_esc_len((unsigned char) tmp[i]);
  size_t skip = 0;
  while (esc > LOGS_REPLY_MAX_ESC && skip < n) {
    esc -= logs_esc_len((unsigned char) tmp[skip]);
    skip++;
  }
  if (skip > 0) {
    dropped = true;
    /* не начинаем текст с "хвоста" многобайтового символа UTF-8 */
    while (skip < n && ((unsigned char) tmp[skip] & 0xC0) == 0x80) skip++;
  }

  const char *lang = (strncmp(SetSettings.lang, "en", 2) == 0) ? "en" : "ru";

  mg_http_reply(c, 200, s_json_header, "{%m:%m,%m:%lu,%m:%d,%m:%m}\n",
                MG_ESC("text"), print_log_text, tmp + skip, n - skip,
                MG_ESC("cursor"), (unsigned long) cursor,
                MG_ESC("dropped"), dropped ? 1 : 0,
                MG_ESC("lang"), mg_print_esc, 0, lang);
}

void handle_settings_set(struct mg_connection *c, struct mg_http_message *hm) {
  if (!require_post_json(c, hm)) return;
  struct mg_str body = hm->body;
  struct settings settings;
  char *s = mg_json_get_str(body, "$.device_name");
  bool ok = true;
  memset(&settings, 0, sizeof(settings));
  mg_json_get_bool(body, "$.log_enabled", &settings.log_enabled);
  settings.log_level = mg_json_get_long(body, "$.log_level", 0);
  settings.brightness = mg_json_get_long(body, "$.brightness", 0);
  if (s && strlen(s) < MAX_DEVICE_NAME) {
    settings.device_name = s;
  } else {
    mg_free(s);
    settings.device_name = (char *)default_name;  // fallback на sentinel
  }
  /* Освобождаем старый device_name через mg_free()  -  парный к mg_calloc()
     внутри mg_json_get_str(). Корректно при любом MG_ARCH. */
  if (s_settings.device_name != NULL && s_settings.device_name != default_name) {
    mg_free(s_settings.device_name);
  }
  s_settings = settings; // Save to the device flash
  mg_http_reply(c, 200, s_json_header,
                "{%m:%s,%m:%m}",                          //
                MG_ESC("status"), ok ? "true" : "false",  //
                MG_ESC("message"), MG_ESC(ok ? "Success" : "Failed"));
}

void handle_settings_get(struct mg_connection *c) {
  mg_http_reply(c, 200, s_json_header, "{%m:%s,%m:%hhu,%m:%hhu,%m:%m}\n",  //
                MG_ESC("log_enabled"),
                s_settings.log_enabled ? "true" : "false",    //
                MG_ESC("log_level"), s_settings.log_level,    //
                MG_ESC("brightness"), s_settings.brightness,  //
                MG_ESC("device_name"), MG_ESC(s_settings.device_name));
}

/* ---- OTA upload session tracking (app layer, independent of the
 * mongoose-internal s_size flag) -------------------------------------------
 * last_ofs/s_ota_written track how many bytes we have ACTUALLY flashed so
 * far, so duplicate/replayed/out-of-order chunks can be detected properly
 * instead of only comparing against the single previous offset.
 * s_ota_owner_id + s_ota_last_activity_ms let a stale session (client
 * vanished mid-upload without sending the final 0-byte chunk) be detected
 * and cleared automatically by ota_watchdog_fn(), instead of requiring a
 * device reboot before the next OTA attempt can succeed. */
static long          last_ofs               = -1; // last chunk offset actually written
static size_t        s_ota_written          = 0;   // bytes actually flashed so far
static size_t        s_ota_expected         = 0;   // expected firmware size, 0 = no session
static unsigned long s_ota_owner_id         = 0;   // connection id that owns the session
static uint64_t      s_ota_last_activity_ms = 0;

#define OTA_SESSION_IDLE_TIMEOUT_MS (20 * 1000)  // abort if no activity for 20s

static void ota_session_clear(void) {
  last_ofs = -1;
  s_ota_written = 0;
  s_ota_expected = 0;
  s_ota_owner_id = 0;
}

// Called from a repeating timer (see web_init()/ setup) to reclaim a
// session that was abandoned mid-upload (dropped connection, closed tab,
// etc.) without ever sending the terminating 0-byte chunk.
void ota_watchdog_fn(void *arg) {
  (void) arg;
  if (s_ota_expected != 0 &&
      mg_millis() - s_ota_last_activity_ms > OTA_SESSION_IDLE_TIMEOUT_MS) {
    LOG_OTA("OTA session idle for >%dms, aborting stale session (owner conn=%lu, %u/%u bytes)\n",
            OTA_SESSION_IDLE_TIMEOUT_MS, s_ota_owner_id,
            (unsigned) s_ota_written, (unsigned) s_ota_expected);
    mg_ota_end();      // clears the mongoose-internal s_size flag; CRC/size
                        // mismatch is expected and harmless here, it will
                        // just fail to swap partitions.
    ota_session_clear();
  }
}

/* One-shot health-check timer: fires on the 3rd trial boot of Bank B.
   If firmware survived OTA_BOOT_COMMIT_DELAY_MS with pending=1 state=1
   retries=3, the new bank is considered healthy and committed.
   Bootloader retry loop no longer increments, future boots use active bank. */

void ota_health_check_fn(void *arg) {
  (void) arg;
  const HTTPSsettings *s = get_valid_settings();
  if (s && s->ota_pending == 1 && s->ota_state == 1
      && s->ota_boot_retries >= OTA_BOOT_RETRY_MAX) {
    LOG_OTA("Health-check: firmware stable for %lums, committing OTA "
            "(retries=%u)\n",
            (unsigned long) OTA_BOOT_COMMIT_DELAY_MS,
            (unsigned) s->ota_boot_retries);
    mg_ota_commit();
  }
}

/* Однократная проверка после старта: если образ в банке залит напрямую
   (ST-Link), записи о его версии и CRC устарели. Сбрасываем их, чтобы
   интерфейс показал "прошито напрямую", а bootloader не считал образ битым. */
static void ota_sync_banks_fn(void *arg) {
  (void) arg;
  if (s_ota_expected != 0) return;   /* идёт OTA-загрузка: настройки не трогаем */
  if (mg_ota_sync_bank_records()) {
    LOG_OTA("Direct flash detected, bank records reset\n");
  }
}

extern UART_HandleTypeDef huart3;

static void ota_log_direct(const char *fmt, ...) {
    if (!(g_log_filter_mask & LOG_MASK_OTA)) return;
    char msg[160];
    va_list ap;
    va_start(ap, fmt);
    int n = vsnprintf(msg, sizeof(msg), fmt, ap);
    va_end(ap);
    if (n < 0) return;
    const char *prefix = cat_prefixes[LOG_CAT_OTA];
    HAL_UART_Transmit(&huart3, (uint8_t *) prefix, strlen(prefix), 50);
    HAL_UART_Transmit(&huart3, (uint8_t *) msg, (uint16_t) n, 200);
}

void handle_firmware_upload(struct mg_connection *c, struct mg_http_message *hm) {
	char name[64], offset[20], total[20];
	struct mg_str data = hm->body;
	long ofs = -1, tot = -1;

	name[0] = offset[0] = '\0';
	mg_http_get_var(&hm->query, "name", name, sizeof(name));
	mg_http_get_var(&hm->query, "offset", offset, sizeof(offset));
	mg_http_get_var(&hm->query, "total", total, sizeof(total));

	if ((ofs = mg_json_get_long(mg_str(offset), "$", -1)) < 0 || (tot =
			mg_json_get_long(mg_str(total), "$", -1)) < 0) {
		ota_log_direct("Upload error: offset or total not set\n");
		mg_http_reply(c, 500, "", "offset and total not set\n");
		return;
	}

	s_ota_last_activity_ms = mg_millis();

	if (ofs == 0) {
		// Start of a new OTA session.
		if (s_ota_expected != 0) {
			ota_log_direct(
					"Aborting stale OTA session (owner conn=%lu, %u/%u bytes) to start a new one\n",
					s_ota_owner_id, (unsigned ) s_ota_written,
					(unsigned ) s_ota_expected);
			mg_ota_end();
			ota_session_clear();
		}

		/* ---- Bank safety check --------------------------------------
		 * Каждая сборка несёт метку (fw_meta.c) о том, для какого банка
		 * она слинкована. Целевой банк записи — всегда противоположный
		 * активному. Если образ собран не для того банка — отклоняем ДО
		 * вызова mg_ota_begin(): ни один байт ещё не пишется во flash. */
		if (data.len >= FW_META_OFFSET + sizeof(fw_meta_t)) {
			const fw_meta_t *meta =
					(const fw_meta_t *) (data.buf + FW_META_OFFSET);
			uint8_t want_bank = mg_ota_get_active_bank() ^ 1;
			if (meta->magic == FW_META_MAGIC
					&& meta->target_bank != want_bank) {
				ota_log_direct(
						"Upload rejected: image built for Bank %c, but Bank %c needs update\n",
						meta->target_bank ? 'B' : 'A',
						want_bank ? 'B' : 'A');
				mg_http_reply(c, 400, "",
						"Wrong bank image: built for Bank %c, need Bank %c\n",
						meta->target_bank ? 'B' : 'A',
						want_bank ? 'B' : 'A');
				return;
			}
			/* magic не совпал — старая сборка без метки: проверку
			 * пропускаем молча, чтобы не ломать совместимость. */
		}

		if (mg_ota_begin((size_t) tot) == false) {
			// At this point we know (from the check above) no session was
			// active at the app layer, so a false return here means the
			// firmware is simply too big for the staging area, not a
			// in-progress conflict -- there is nothing of ours to clean up.
			ota_log_direct(
					"Upload error: mg_ota_begin(%ld) failed (firmware too big?)\n",
					tot);
			mg_http_reply(c, 500, "", "mg_ota_begin(%ld) failed\n", tot);
			return;
		}
		last_ofs = -1;
		s_ota_written = 0;
		s_ota_expected = (size_t) tot;
		s_ota_owner_id = c->id;
		ota_log_direct("OTA session started by conn=%lu, expecting %ld bytes\n", c->id,
				tot);
		mg_ota_reset_status();   // сбрасываем статус ДО начала записи чанков,чтобы не пересекаться по flash с mg_ota_write()
	}

	if (data.len > 0) {
		if (s_ota_expected == 0) {
			ota_log_direct(
					"Upload error: chunk offset=%ld received but no session active\n",
					ofs);
			mg_http_reply(c, 409, "",
					"No OTA session in progress, restart upload from offset 0\n");
			return;
		}
		if ((size_t) ofs < s_ota_written) {
			// Already-written data being retransmitted -- safe to ignore.
			ota_log_direct("Duplicate chunk offset=%ld ignored (already at %u)\n", ofs,
					(unsigned ) s_ota_written);
			mg_http_reply(c, 200, s_json_header, "true\n");
		} else if ((size_t) ofs > s_ota_written) {
			// Gap: client and device disagree on how much has been flashed.
			// Writing here would silently corrupt the image (flash writes are
			// sequential and ignore `ofs`), so abort instead of guessing.
			ota_log_direct(
					"Upload error: offset gap (got %ld, expected %u), aborting session\n",
					ofs, (unsigned ) s_ota_written);
			mg_ota_end();
			ota_session_clear();
			mg_http_reply(c, 400, "",
					"Offset gap detected, restart upload from offset 0\n");
		} else {
			ota_log_direct("Writing chunk: offset=%ld, len=%lu\n", ofs, data.len);
			if (mg_ota_write(data.buf, data.len) == false) {
				ota_log_direct("Upload error: mg_ota_write(%lu) @%ld failed\n",
						data.len, ofs);
				mg_http_reply(c, 500, "", "mg_ota_write(%lu) @%ld failed\n",
						data.len, ofs);
				mg_ota_end();
				ota_session_clear();
			} else {
				last_ofs = ofs;
				s_ota_written += data.len;
				mg_http_reply(c, 200, s_json_header, "true\n");
			}
		}
	} else if (data.len == 0) {
		ota_log_direct("Final chunk received. Total size: %ld. Verifying...\n", tot);
#if defined(__CORTEX_M) && (__CORTEX_M == 7U)
		SCB_CleanInvalidateDCache();
#endif
    if (mg_ota_end() == false) {
        ota_log_direct("Upload error: mg_ota_end() failed, CRC or size mismatch\n");
        /* mg_ota_mark_pending() здесь НЕ вызывался: ota_pending/ota_active_bank
         * не тронуты, устройство остаётся на текущем банке. Целевой банк
         * остаётся помеченным OTA_BANK_VERSION_PARTIAL (поставлено при старте
         * загрузки), поэтому не считается рабочим. */
        mg_http_reply(c, 500, "", "mg_ota_end() failed, CRC or size mismatch\n");
        ota_session_clear();
    } else {
        // Double Bank: mg_ota_end() вернул true — CRC+size ОК.
        // HTTP 200 OK отправляется ПЕРВЫМ, потом через 500мс — ребут.
        // Это даёт TCP-стеку время отправить ответ браузеру.
        mg_ota_mark_pending();  // только теперь: CRC+size сошлись, банк-кандидат целый
        ota_log_direct("OTA SUCCESS! Rebooting device...\n");
        mg_http_reply(c, 200, s_json_header, "true\n");
        ota_session_clear();
        mg_timer_add(c->mgr, 500, 0, (void (*)(void*)) mg_device_reset, NULL);
    }
}
}


void handle_firmware_commit(struct mg_connection *c, struct mg_http_message *hm) {
  if (!require_post_json(c, hm)) return;
  if (s_ota_expected != 0) {
    mg_http_reply(c, 409, "", "OTA upload in progress, wait until it finishes\n");
    return;
  }
  mg_http_reply(c, 200, s_json_header, "%s\n",
                mg_ota_commit() ? "true" : "false");
}

void handle_firmware_rollback(struct mg_connection *c, struct mg_http_message *hm) {
  if (!require_post_json(c, hm)) return;
  if (s_ota_expected != 0) {
    mg_http_reply(c, 409, "", "OTA upload in progress, wait until it finishes\n");
    return;
  }
  mg_http_reply(c, 200, s_json_header, "%s\n",
                mg_ota_rollback() ? "true" : "false");
}

void handle_firmware_switch_bank(struct mg_connection *c, struct mg_http_message *hm) {
  if (!require_post_json(c, hm)) return;
  if (s_ota_expected != 0) {
    mg_http_reply(c, 409, "", "OTA upload in progress, wait until it finishes\n");
    return;
  }
  mg_http_reply(c, 200, s_json_header, "%s\n",
                mg_ota_switch_bank() ? "true" : "false");
}

static size_t print_status(void (*out)(char, void *), void *ptr, va_list *ap) {
  int fw = va_arg(*ap, int);
  const HTTPSsettings *s = get_valid_settings();
  return mg_xprintf(out, ptr, "{%m:%d,%m:%c%lx%c,%m:%u,%m:%u,%m:%m,%m:%u,%m:%u}\n",
                    MG_ESC("status"), mg_ota_status(fw), MG_ESC("crc32"), '"',
                    mg_ota_crc32(fw), '"', MG_ESC("size"), mg_ota_size(fw),
                    MG_ESC("timestamp"), mg_ota_timestamp(fw),
                    MG_ESC("version"), MG_ESC(FW_VERSION),
                    MG_ESC("retries"), (unsigned)(s ? s->ota_boot_retries : 0),
                    MG_ESC("max_retries"), (unsigned) OTA_BOOT_RETRY_MAX);
}

void handle_firmware_status(struct mg_connection *c) {
  const HTTPSsettings *s = get_valid_settings();
  uint8_t active = mg_ota_get_active_bank();
  /* Форма ответа изменилась: массив статусов теперь вложен в поле
   * "firmwares" объекта + добавлены active_bank, версии банков и
   * bank_a_valid/bank_b_valid — реальное наличие рабочего образа в банке
   * по содержимому flash (MSP в векторной таблице, тот же критерий, что
   * в bootloader'е и mg_ota_switch_bank()). Версия (bank_X_version)
   * появляется только после mg_ota_commit(), т.е. только у образов,
   * залитых через OTA: Bank A, прошитый напрямую через ST-Link, отдаёт
   * пустую версию при bank_a_valid=true — фронтенд (update_page.js)
   * завязан на валидность, а не на непустоту версии. */
  mg_http_reply(c, 200, s_json_header,
                "{%m:[%M,%M],%m:%d,%m:%m,%m:%m,%m:%s,%m:%s,%m:%m}\n",
                MG_ESC("firmwares"), print_status, MG_FIRMWARE_CURRENT,
                          print_status, MG_FIRMWARE_PREVIOUS,
                MG_ESC("active_bank"), (int) active,
                MG_ESC("bank_a_version"),
                    MG_ESC(s ? s->ota_bank_a_version : ""),
                MG_ESC("bank_b_version"),
                    MG_ESC(s ? s->ota_bank_b_version : ""),
                MG_ESC("bank_a_valid"),
                    mg_ota_bank_image_valid(0) ? "true" : "false",
                MG_ESC("bank_b_valid"),
                    mg_ota_bank_image_valid(1) ? "true" : "false",
                MG_ESC("lang"), MG_ESC(SetSettings.lang));
}

void handle_device_reset(struct mg_connection *c, struct mg_http_message *hm) {
  if (!require_post_json(c, hm)) return;
  mg_http_reply(c, 200, s_json_header, "true\n");
  mg_timer_add(c->mgr, 500, 0, (void (*)(void *)) mg_device_reset, NULL);
}

#ifdef ENABLE_ERASE_LAST_SECTOR
void handle_device_eraselast(struct mg_connection *c, struct mg_http_message *hm) {
  if (!require_post_json(c, hm)) return;
  size_t ss = mg_flash_sector_size(), size = mg_flash_size();
  char *base = (char *) mg_flash_start(), *last = base + size - ss;
  if (mg_flash_bank() == 2) last -= size / 2;
  mg_flash_erase(last);
  mg_http_reply(c, 200, s_json_header, "true\n");
}
#endif
// Типы соединений (CONN_TYPE_*) и лимиты — см. net_limits.h

// Rate limiter для /api/login: блокировка на 30 сек после 5 неудачных попыток
#define LOGIN_MAX_FAILS   5
#define LOGIN_BLOCK_MS    30000
static uint32_t s_login_fail_count  = 0;
static uint32_t s_login_block_until = 0;

/* Лимит тела запроса для JSON API — защита от mg_iobuf_resiz starvation.
   Firmware upload исключён явно, там body законно большой. */
#define MAX_API_BODY_SIZE 8192

/* Максимальное тело одного чанка /api/firmware/upload. Страница шлёт 4096 байт,
   запас вдвое. Тело принимается целиком в c->recv, поэтому лимит и проверка
   авторизации выполняются в MG_EV_HTTP_HDRS, до приёма тела. */
#define OTA_MAX_CHUNK_BODY 8192

/* Максимальный limit для пагинации /api/select/get — защита от OOB. */
#define MAX_SELECT_PAGE_LIMIT 100

/* TLS handshake timing tracking (per-connection) */
#define TLS_HS_TRACK_MAX 4
static struct {
	unsigned long conn_id;
	uint32_t      accept_cycles;
	uint64_t      accept_ms;
} s_tls_hs_track[TLS_HS_TRACK_MAX];

char *s_tls_cert = NULL;  /* PEM certificate, loaded once in web_init() */
char *s_tls_key  = NULL;  /* PEM private key, loaded once in web_init() */
extern osMutexId_t s_mysett_mutexHandle;  /* создаётся в main() (CubeMX) */

void net_dtcm_init(void) {
    s_tls_cert = (char *)dtcm_tls_cert;
    s_tls_key  = (char *)dtcm_tls_key;
}
bool s_tls_loaded = false;           /* true after successful preload */

static void tls_hs_track_start(unsigned long conn_id) {
	for (int i = 0; i < TLS_HS_TRACK_MAX; i++) {
		if (s_tls_hs_track[i].conn_id == 0) {
			s_tls_hs_track[i].conn_id = conn_id;
			s_tls_hs_track[i].accept_ms = mg_millis();
			s_tls_hs_track[i].accept_cycles = DWT->CYCCNT;
			return;
		}
	}
}

static uint32_t tls_hs_get_age_ms(unsigned long conn_id) {
	for (int i = 0; i < TLS_HS_TRACK_MAX; i++) {
		if (s_tls_hs_track[i].conn_id == conn_id) {
			return (uint32_t)(mg_millis() - s_tls_hs_track[i].accept_ms);
		}
	}
	return 0;  // не найдено — считаем что только начался
}

static uint64_t tls_hs_track_finish(unsigned long conn_id, uint32_t *out_cycles) {
	for (int i = 0; i < TLS_HS_TRACK_MAX; i++) {
		if (s_tls_hs_track[i].conn_id == conn_id) {
			uint64_t elapsed = mg_millis() - s_tls_hs_track[i].accept_ms;
			if (out_cycles) *out_cycles = DWT->CYCCNT - s_tls_hs_track[i].accept_cycles;
			s_tls_hs_track[i].conn_id = 0;
			return elapsed;
		}
	}
	if (out_cycles) *out_cycles = 0;
	return 0;
}

/* ═══════════════ [NETLIM-BEGIN] единый бюджет соединений ═══════════════
 * Пороги и объяснения — в net_limits.h. */

/* Текущий лимит простоя web-соединения: 1 соединение — держим долго (keep-alive,
 * новый handshake дорог), >1 — лишние закрываем быстро. Обновляется в
 * MG_EV_ACCEPT / MG_EV_CLOSE, читается в MG_EV_POLL (без обхода списка). */
static uint32_t s_web_idle_limit_ms = NET_WEB_IDLE_SOLO_MS;

/* Счётчики для диагностики (видны в строке [NET] REJECT и из отладчика). */
volatile uint32_t g_net_syn_drops = 0;  /* SYN отброшены фильтром (уровень 1) */
volatile uint32_t g_net_rejects   = 0;  /* RST после accept (уровень 2)       */

bool net_heap_ok(uint32_t min_free, uint32_t min_largest) {
  HeapStats_t st;
  vPortGetHeapStats(&st);
  return st.xAvailableHeapSpaceInBytes >= min_free &&
         st.xSizeOfLargestFreeBlockInBytes >= min_largest;
}

static bool same_remote(const struct mg_addr *a, const struct mg_addr *b) {
  if (a->is_ip6 != b->is_ip6) return false;
  if (a->is_ip6)
    return a->addr.ip6[0] == b->addr.ip6[0] && a->addr.ip6[1] == b->addr.ip6[1];
  return a->addr.ip4 == b->addr.ip4;
}

void net_census(struct mg_mgr *mgr, const struct mg_connection *skip,
                const struct mg_addr *rem, net_census_t *o) {
  uint32_t oldest_any = UINT32_MAX, oldest_same = UINT32_MAX;
  memset(o, 0, sizeof(*o));
  for (struct mg_connection *t = mgr->conns; t != NULL; t = t->next) {
    if (t == skip || t->is_listening || t->is_udp) continue;
    if (t->is_closing || t->is_draining) continue;  /* умирающие не считаем */

    uintptr_t type = (uintptr_t) t->fn_data;
    bool web = (type == CONN_TYPE_HTTP || type == CONN_TYPE_HTTPS);

    if (t->is_tls_hs && o->hs_total < 255) o->hs_total++;

    if (!web) {
      if (t->is_accepted) { if (o->mqtt_srv < 255) o->mqtt_srv++; }
      else                { if (o->mqtt_out < 255) o->mqtt_out++; }
      continue;
    }

    bool same = (rem != NULL) && same_remote(&t->rem, rem);
    if (same && o->same_ip < 255) o->same_ip++;

    if (t->is_tls_hs) {
      uint32_t age = tls_hs_get_age_ms(t->id);
      if (o->web_hs < 255) o->web_hs++;
      if (o->hs_oldest == NULL || age >= o->hs_oldest_age) {
        o->hs_oldest = t;
        o->hs_oldest_age = age;
      }
      continue;
    }
    if (o->web_est < 255) o->web_est++;

    /* Кандидат на вытеснение: idle, буферы пусты, был хотя бы 1 запрос,
     * не владелец OTA-сессии. */
    uint32_t last_used = *(uint32_t *) t->data;
    if (t->send.len == 0 && t->recv.len == 0 && last_used > 0 &&
        !(s_ota_expected != 0 && t->id == s_ota_owner_id)) {
      if (last_used < oldest_any) { oldest_any = last_used; o->idle_any = t; }
      if (same && last_used < oldest_same) {
        oldest_same = last_used;
        o->idle_same_ip = t;
      }
    }
  }
}

/* SYN-фильтр (уровень 1): вызывается из mongoose.c ДО выделения соединения.
 * false => SYN молча отбрасывается, клиент повторит его через 1-3 с. */
static bool net_syn_filter_impl(struct mg_connection *lsn, size_t backlog_pending) {
  static uint16_t s_https = 0;
  if (s_https == 0) s_https = (uint16_t) atoi(HTTPS_PORT);

  if (mg_ntohs(lsn->loc.port) == s_https) {
    if (!net_heap_ok(NET_HEAP_HS_MIN, NET_HEAP_LARGEST_MIN)) return false;
    net_census_t cs;
    net_census(lsn->mgr, NULL, NULL, &cs);
    /* handshake в процессе + уже принятые, но ещё не пришедшие в ACCEPT (backlog) */
    return ((size_t) cs.hs_total + backlog_pending) < NET_HS_MAX_PARALLEL;
  }
  /* HTTP :8000 и MQTT-сервер: без TLS, достаточно heap */
  return net_heap_ok(NET_HEAP_CONN_MIN, 4096u);
}

bool net_syn_filter(struct mg_connection *lsn, size_t backlog_pending) {
  bool ok = net_syn_filter_impl(lsn, backlog_pending);
  if (!ok) g_net_syn_drops++;
  return ok;
}

/* MQTT-сервер: можно ли принять ещё одного клиента. MQTT (сервер+клиент)
 * не заходит в последние NET_WEB_RESERVED слотов — web-сессия всегда войдёт. */
bool net_mqtt_srv_may_accept(struct mg_connection *c) {
  net_census_t cs;
  net_census(c->mgr, c, NULL, &cs);
  uint32_t mqtt = (uint32_t) cs.mqtt_srv + cs.mqtt_out;
  uint32_t web  = (uint32_t) cs.web_est + cs.web_hs;
  if (!net_heap_ok(NET_HEAP_CONN_MIN, 4096u)) return false;
  if (mqtt + 1 > NET_TOTAL_CONNS_MAX - NET_WEB_RESERVED) return false;
  if (web + mqtt + 1 > NET_TOTAL_CONNS_MAX) return false;
  return true;
}

/* MQTT-клиент: можно ли открыть исходящее соединение (не раньше, чем
 * закончится идущий handshake — пики не складываются). */
bool net_mqtt_cli_may_connect(struct mg_mgr *mgr, bool tls) {
  net_census_t cs;
  net_census(mgr, NULL, NULL, &cs);
  uint32_t mqtt = (uint32_t) cs.mqtt_srv + cs.mqtt_out;
  uint32_t web  = (uint32_t) cs.web_est + cs.web_hs;
  if (cs.hs_total >= NET_HS_MAX_PARALLEL) return false;
  if (tls ? !net_heap_ok(NET_HEAP_HS_MIN, NET_HEAP_LARGEST_MIN)
          : !net_heap_ok(NET_HEAP_CONN_MIN, 4096u)) return false;
  if (mqtt + 1 > NET_TOTAL_CONNS_MAX - NET_WEB_RESERVED) return false;
  if (web + mqtt + 1 > NET_TOTAL_CONNS_MAX) return false;
  return true;
}

/* Отказ принятому соединению: TCP RST (уровень 2). Лог — не чаще раза в 2 с,
 * чтобы сканер/шторм не забил UART. */
static void net_reject_conn(struct mg_connection *c, const char *why,
                            const char *rem, const net_census_t *cs) {
  static uint32_t s_last_log = 0;
  uint32_t now = (uint32_t) mg_millis();
  g_net_rejects++;
  if (now - s_last_log > 2000u) {
    s_last_log = now;
    printf("[NET] REJECT %s conn=%lu client=%s heap=%lu hs=%u web=%u mqtt=%u "
           "(rst=%lu syn_drop=%lu)\r\n",
           why, (unsigned long) c->id, rem,
           (unsigned long) xPortGetFreeHeapSize(), (unsigned) cs->hs_total,
           (unsigned) (cs->web_est + cs->web_hs),
           (unsigned) (cs->mqtt_srv + cs->mqtt_out),
           (unsigned long) g_net_rejects, (unsigned long) g_net_syn_drops);
  }
#if MG_ENABLE_TCPIP
  mg_tcpip_rst_conn(c);
#else
  c->is_draining = 1;
  c->is_closing  = 1;
#endif
}
/* ═══════════════ [NETLIM-END] ═══════════════ */

static bool check_etag_304(struct mg_connection *c, struct mg_http_message *hm,
                           volatile uint32_t *ver);
void handle_buttons(struct mg_connection *c, struct mg_http_message *hm);
void handle_switches(struct mg_connection *c);
static void handle_switches_req(struct mg_connection *c, struct mg_http_message *hm);
void handle_encoders(struct mg_connection *c, struct mg_http_message *hm);
static void handle_get_pins(struct mg_connection *c, struct mg_http_message *hm);
static void handle_pid(struct mg_connection *c, struct mg_http_message *hm);
static void handle_security(struct mg_connection *c, struct mg_http_message *hm);
static void handle_sensors(struct mg_connection *c);
static void handle_common(struct mg_connection *c);
static void handle_onewire(struct mg_connection *c);

// Shared buffer for all Content-Length JSON handlers — mongoose + FreeRTOS event loop
// is single-threaded, only one handler runs at a time.  Saves ~36 KB vs separate buffers.
// Allocated in FreeRTOS heap (web_init) to save 16 KB of .bss (AXI SRAM is tight).
char *g_body;

/* ── Лимит активных соединений ── */
#define MAX_CONNS  8

/* ═══════════════ /api/state/remote — состояние пульта ═══════════════
 * Постраничная выдача, единый линейный курсор ?next=:
 *   0..NUMPIN-1                 — физ. пины (sw/pw/bt/sc),
 *   NUMPIN..NUMPIN+NUMZBEE-1    — Zigbee (zb/bt/sc),
 *   далее PID-слоты, датчики DS18B20, датчики DHT22.
 * Массивы разделов (sw,bt,pw,zb,pd,sc,ow) открываются лениво при первом
 * элементе; пустые разделы не отдаются. В конце — "next": курсор следующей
 * страницы или -1. Страница не больше REMOTE_PAGE_BUDGET байт.
 * ETag = FNV-хеш состояния (remote_state_hash(), zagotovka.c). 304 отдаётся
 * ТОЛЬКО при cursor==0: pollQueue хранит один ETag на ключ и не вызывает
 * callback при 304 — на середине пагинации это намертво остановило бы
 * опрос. RAM: только стек, новых static-буферов нет. */
#define REMOTE_PAGE_BUDGET 4800
#define REMOTE_BASE_ZBEE (NUMPIN)
#define REMOTE_BASE_PID  (NUMPIN + NUMZBEE)
#define REMOTE_BASE_DS   (REMOTE_BASE_PID + PID_MAX_SLOTS)
#define REMOTE_BASE_DHT  (REMOTE_BASE_DS + (MAX_DS18B20_P * MAX_DS18B20_PER_PIN))
#define REMOTE_END       (REMOTE_BASE_DHT + MAX_DHT22_P)

/* Начало элемента плоского массива items: {"s":"раздел","d":
 * Тело элемента печатает вызывающий код. Закрывающая } предыдущего элемента
 * пишется здесь же при следующем открытии либо в конце ответа.
 * Флаг any = "есть незакрытый элемент". */
static int rem_sec_open(int pos, const char *name, bool *opened, bool *any) {
    pos += snprintf(g_body + pos, G_BODY_SIZE - pos, "%s{\"s\":\"%s\",\"d\":",
                    *any ? "}," : "", name);
    *opened = true;
    *any = true;
    return pos;
}

/* Разделители теперь пишет rem_sec_open; функция оставлена, чтобы не
 * менять вызовы в цикле. */
static int rem_item_sep(int pos, bool opened, bool *first) {
    (void) opened;
    (void) first;
    return pos;
}

/* Сборка списка целей кнопки: "id[.sub];...", не более 6 целей */
typedef struct { char *dst; int cap; int off; int n; } rem_tgt_ctx;
static void rem_tgt_cb(int id, int sub_idx, int action, void *vctx) {
    (void) action;
    rem_tgt_ctx *t = (rem_tgt_ctx *)vctx;
    char tok[16];
    snprintf(tok, sizeof(tok), "%d%s", id, sub_idx > 0 ? ".z" : "");

    /* Пропуск повторов: цель уже есть в списке (токен целиком между ';') */
    size_t tl = strlen(tok);
    for (const char *p = t->dst; *p != '\0'; ) {
        const char *e = strchr(p, ';');
        size_t l = e ? (size_t)(e - p) : strlen(p);
        if (l == tl && strncmp(p, tok, l) == 0) return;
        if (e == NULL) break;
        p = e + 1;
    }

    if (t->n >= 6 || t->off + 14 >= t->cap) return;
    t->off += snprintf(t->dst + t->off, (size_t)(t->cap - t->off),
                       "%s%s", t->n ? ";" : "", tok);
    t->n++;
}

static void handle_remote_state(struct mg_connection *c,
                                struct mg_http_message *hm) {
    /* Версия состояния — в начале сборки: если данные изменятся во время
     * сборки, клиент получит старый ETag и перезапросит (безопасная сторона) */
    uint32_t etag = remote_state_hash();
    char etag_q[16];
    snprintf(etag_q, sizeof(etag_q), "\"%08lX\"", (unsigned long)etag);

    int cursor = 0;
    char vb[12];
    if (mg_http_get_var(&hm->query, "next", vb, sizeof(vb)) > 0) {
        long v = mg_json_get_long(mg_str(vb), "$", 0);
        if (v > 0) cursor = (v < (long)REMOTE_END) ? (int)v : REMOTE_END;
    }

    /* 304 — только на первой странице (см. комментарий выше) */
    if (cursor == 0) {
        struct mg_str *inm = mg_http_get_header(hm, "If-None-Match");
        if (inm && mg_strcmp(*inm, mg_str(etag_q)) == 0) {
            char hdr[80];
            snprintf(hdr, sizeof(hdr),
                     "ETag: %s\r\nCache-Control: no-cache\r\n", etag_q);
            mg_http_reply(c, 304, hdr, "");
            return;
        }
    }

    int pos = 0;
    int next = -1;
    bool any = false;
    bool o_sw = false, o_bt = false, o_pw = false, o_zb = false;
    bool o_pd = false, o_sc = false, o_ow = false;
    bool f_sw = true, f_bt = true, f_pw = true, f_zb = true;
    bool f_pd = true, f_sc = true, f_ow = true;

    pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
                    "{\"lang\":\"%s\",\"etag\":\"%08lX\",\"items\":[",
                    SetSettings.lang, (unsigned long)etag);

    /* ── Физ. пины: sw (topin 3), pw (topin 5), bt (topin 1), sc (topin 10) ── */
    for (int i = (cursor < NUMPIN ? cursor : NUMPIN);
         i < NUMPIN && next < 0; i++) {
        if (pos > REMOTE_PAGE_BUDGET) { next = i; break; }
        if ((int)G_BODY_SIZE - pos < 700) { next = i; break; }

        /* Главная карточка охраны (id 0) — первой строкой раздела sc */
        if (i == 0 && cursor == 0) {
            pos = rem_sec_open(pos, "sc", &o_sc, &any);
            pos = rem_item_sep(pos, o_sc, &f_sc);
            pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
                            "{\"id\":0,\"n\":\"\",\"t\":\"\",\"on\":%d}",
                            (int)PinsConf[1].onoff);
        }

        const struct dbPinsConf *p = &PinsConf[i];
        char esc_info[64], esc_pins[16];
        json_escape_str(esc_info, p->info, sizeof(esc_info));
        json_escape_str(esc_pins, PinsInfo[i].pins, sizeof(esc_pins));
        int id = i + 1;

        if (p->topin == 3) { /* ── переключатели ── */
            pos = rem_sec_open(pos, "sw", &o_sw, &any);
            pos = rem_item_sep(pos, o_sw, &f_sw);
            pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
                            "{\"id\":%d,\"n\":\"%s\",\"t\":\"%s\","
                            "\"on\":%d,\"st\":%d}",
                            id, esc_pins, esc_info,
                            (int)p->onoff, (int)p->state);
        } else if (p->topin == 5) { /* ── PWM ── */
            int onoff_eff = (p->pwm_flags & PWMF_SWITCH) ? p->onoff : 1;
            pos = rem_sec_open(pos, "pw", &o_pw, &any);
            pos = rem_item_sep(pos, o_pw, &f_pw);
            pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
                            "{\"id\":%d,\"n\":\"%s\",\"t\":\"%s\","
                            "\"v\":%d,\"on\":%d,\"lk\":%d}",
                            id, esc_pins, esc_info,
                            p->dvalue, onoff_eff,
                            is_pin_in_autotune((uint8_t)i) ? 1 : 0);
        } else if (p->topin == 1) { /* ── кнопки ── */
            if (p->onoff == 0) continue;
            const char *acts[3] = {p->sclick, p->dclick, p->lpress};
            bool has_any = false;
            for (int a = 0; a < 3; a++) {
                if (acts[a][0] != '\0' && strcmp(acts[a], "None") != 0)
                    has_any = true;
            }
            if (!has_any) continue;
            char targets[96];
            rem_tgt_ctx tctx = {targets, (int)sizeof(targets), 0, 0};
            targets[0] = '\0';
            for (int a = 0; a < 3; a++) {
                if (acts[a][0] != '\0' && strcmp(acts[a], "None") != 0)
                    action_str_walk(acts[a], rem_tgt_cb, &tctx, false);
            }
            pos = rem_sec_open(pos, "bt", &o_bt, &any);
            pos = rem_item_sep(pos, o_bt, &f_bt);
            pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
                            "{\"id\":%d,\"n\":\"%s\",\"t\":\"%s\","
                            "\"sc\":%d,\"dc\":%d,\"lp\":%d,\"a\":\"%s\"}",
                            id, esc_pins, esc_info,
                            (acts[0][0] && strcmp(acts[0], "None")) ? 1 : 0,
                            (acts[1][0] && strcmp(acts[1], "None")) ? 1 : 0,
                            (acts[2][0] && strcmp(acts[2], "None")) ? 1 : 0,
                            targets);
        } else if (p->topin == 10) { /* ── датчики охраны ── */
            pos = rem_sec_open(pos, "sc", &o_sc, &any);
            pos = rem_item_sep(pos, o_sc, &f_sc);
            pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
                            "{\"id\":%d,\"n\":\"%s\",\"t\":\"%s\","
                            "\"on\":%d}",
                            id, esc_pins, esc_info, (int)p->onoff);
        }
    }

    /* ── Zigbee: bt (Trigger), sc (PIR), zb (прочие) ── */
    for (int k = (cursor > REMOTE_BASE_ZBEE ? cursor - REMOTE_BASE_ZBEE : 0);
         k < NUMZBEE && next < 0; k++) {
        if (pos > REMOTE_PAGE_BUDGET) { next = REMOTE_BASE_ZBEE + k; break; }
        if ((int)G_BODY_SIZE - pos < 700) { next = REMOTE_BASE_ZBEE + k; break; }
        const ZigbeeVirtualPin *z = &ZigbeeConf[k];
        if (z->zbee_ieee[0] == '\0') continue;
        int id = ZbeeIdFromIdx(k);
        char esc_label[64];
        json_escape_str(esc_label, z->zbee_label, sizeof(esc_label));

        if (z->zbee_role == ZBEE_ROLE_TRIGGER) {
            if (z->onoff == 0) continue;
            const char *acts[3] = {zbee_action_sclick(k), zbee_action_dclick(k),
                                   zbee_action_lpress(k)};
            bool has_any = false;
            for (int a = 0; a < 3; a++) {
                if (acts[a] && acts[a][0] != '\0' && strcmp(acts[a], "None") != 0)
                    has_any = true;
            }
            if (!has_any) continue;
            char targets[96];
            rem_tgt_ctx tctx = {targets, (int)sizeof(targets), 0, 0};
            targets[0] = '\0';
            for (int a = 0; a < 3; a++) {
                if (acts[a] && acts[a][0] != '\0' && strcmp(acts[a], "None") != 0)
                    action_str_walk(acts[a], rem_tgt_cb, &tctx, false);
            }
            pos = rem_sec_open(pos, "bt", &o_bt, &any);
            pos = rem_item_sep(pos, o_bt, &f_bt);
            pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
                            "{\"id\":%d,\"n\":\"%s\",\"t\":\"%s\","
                            "\"sc\":%d,\"dc\":%d,\"lp\":%d,\"a\":\"%s\"}",
                            id, esc_label, esc_label,
                            (acts[0] && acts[0][0] && strcmp(acts[0], "None")) ? 1 : 0,
                            (acts[1] && acts[1][0] && strcmp(acts[1], "None")) ? 1 : 0,
                            (acts[2] && acts[2][0] && strcmp(acts[2], "None")) ? 1 : 0,
                            targets);
        } else if (zbee_is_pir(z)) { /* ── PIR в разделе охраны ── */
            pos = rem_sec_open(pos, "sc", &o_sc, &any);
            pos = rem_item_sep(pos, o_sc, &f_sc);
            pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
                            "{\"id\":%d,\"n\":\"%s\",\"t\":\"%s\","
                            "\"on\":%d}",
                            id, esc_label, esc_label, (int)z->onoff);
        } else { /* ── actuators / switches ── */
            const char *kind = (z->zbee_role == ZBEE_ROLE_SWITCH) ? "sw"
                             : (z->cluster_flags & ZBEE_CL_COLOR)  ? "clr"
                             : (z->cluster_flags & ZBEE_CL_DIMMER) ? "dim"
                                                                   : "rly";
            pos = rem_sec_open(pos, "zb", &o_zb, &any);
            pos = rem_item_sep(pos, o_zb, &f_zb);
            pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
                            "{\"id\":%d,\"n\":\"%s\",\"k\":\"%s\","
                            "\"on\":%d,\"st\":%d,\"v\":%d,\"c\":\"#%06lX\"}",
                            id, esc_label, kind,
                            (int)z->onoff, (int)z->state, z->dvalue,
                            (unsigned long)(z->color_hex & 0xFFFFFF));
        }
    }

    /* ── PID-слоты ── */
    for (int s = (cursor > REMOTE_BASE_PID ? cursor - REMOTE_BASE_PID : 0);
         s < PID_MAX_SLOTS && next < 0; s++) {
        if (pos > REMOTE_PAGE_BUDGET) { next = REMOTE_BASE_PID + s; break; }
        if ((int)G_BODY_SIZE - pos < 500) { next = REMOTE_BASE_PID + s; break; }
        const dbPidConf *pp = &PidConf[s];
        if (pp->pwm_pin_id == 0) continue;
        char esc_info[64];
        char s_sp[16], s_cu[16];
        json_escape_str(esc_info, pp->info, sizeof(esc_info));
        fmt_float(s_sp, sizeof(s_sp), pp->tmpset, 1);
        fmt_float(s_cu, sizeof(s_cu), pp->tmpcur, 1);
        pos = rem_sec_open(pos, "pd", &o_pd, &any);
        pos = rem_item_sep(pos, o_pd, &f_pd);
        pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
                        "{\"id\":%d,\"t\":\"%s\",\"on\":%d,"
                        "\"sp\":%s,\"cu\":%s,\"lk\":%d}",
                        s + 1, esc_info, (int)pp->onoff, s_sp, s_cu,
                        (pp->tune_state == PID_TUNE_STEP ||
                         pp->tune_state == PID_TUNE_BIAS) ? 1 : 0);
    }

    /* ── Датчики DS18B20 (по строке на датчик) ── */
    int ds_cur = (cursor > REMOTE_BASE_DS) ? cursor - REMOTE_BASE_DS : 0;
    for (int j = 0; j < MAX_DS18B20_P && next < 0; j++) {
        /* Слот учитываем только пока его пин реально OneWire (topin==4):
         * после перевода пина в NONE слот не должен попадать в пульт. */
        if (ds18b20[j].typsensr != 1 || !IsPinId(ds18b20[j].id) ||
            PinsConf[PinIdxFromId(ds18b20[j].id)].topin != 4) continue;
        int n = ds18b20[j].numsens;
        if (n > MAX_DS18B20_PER_PIN) n = MAX_DS18B20_PER_PIN;
        for (int s = 0; s < n && next < 0; s++) {
            int cur = j * MAX_DS18B20_PER_PIN + s;
            if (cur < ds_cur) continue;
            if (pos > REMOTE_PAGE_BUDGET) { next = REMOTE_BASE_DS + cur; break; }
            if ((int)G_BODY_SIZE - pos < 400) { next = REMOTE_BASE_DS + cur; break; }
            char esc_info[64], esc_pins[16];
            char s_t[16];
            json_escape_str(esc_info, ds18b20[j].sensors[s].info,
                            sizeof(esc_info));
            json_escape_str(esc_pins, ds18b20[j].pin, sizeof(esc_pins));
            fmt_float(s_t, sizeof(s_t), ds18b20[j].sensors[s].temp, 1);
            pos = rem_sec_open(pos, "ow", &o_ow, &any);
            pos = rem_item_sep(pos, o_ow, &f_ow);
            if (ds18b20[j].sensors[s].valid) {
                pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
                                "{\"id\":%d,\"sub\":%d,\"n\":\"%s\","
                                "\"t\":\"%s\",\"v\":%s,\"ok\":1}",
                                (int)ds18b20[j].id, s, esc_pins, esc_info, s_t);
            } else {
                pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
                                "{\"id\":%d,\"sub\":%d,\"n\":\"%s\","
                                "\"t\":\"%s\",\"ok\":0}",
                                (int)ds18b20[j].id, s, esc_pins, esc_info);
            }
        }
    }

    /* ── Датчики DHT22 ── */
    for (int j = (cursor > REMOTE_BASE_DHT ? cursor - REMOTE_BASE_DHT : 0);
         j < MAX_DHT22_P && next < 0; j++) {
        if (dht22 == NULL || dht22[j].typsensr != 2 ||
            !IsPinId(dht22[j].id) ||
            PinsConf[PinIdxFromId(dht22[j].id)].topin != 4)
            continue;
        if (pos > REMOTE_PAGE_BUDGET) { next = REMOTE_BASE_DHT + j; break; }
        if ((int)G_BODY_SIZE - pos < 400) { next = REMOTE_BASE_DHT + j; break; }
        char esc_info[64], esc_pins[16];
        char s_t[16], s_h[16];
        json_escape_str(esc_info, dht22[j].info, sizeof(esc_info));
        json_escape_str(esc_pins, dht22[j].pin, sizeof(esc_pins));
        fmt_float(s_t, sizeof(s_t), dht22[j].temp, 1);
        fmt_float(s_h, sizeof(s_h), dht22[j].humid, 1);
        pos = rem_sec_open(pos, "ow", &o_ow, &any);
        pos = rem_item_sep(pos, o_ow, &f_ow);
        if (dht22[j].valid) {
            pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
                            "{\"id\":%d,\"n\":\"%s\",\"t\":\"%s\","
                            "\"v\":%s,\"h\":%s,\"ok\":1}",
                            (int)dht22[j].id, esc_pins, esc_info, s_t, s_h);
        } else {
            pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
                            "{\"id\":%d,\"n\":\"%s\",\"t\":\"%s\",\"ok\":0}",
                            (int)dht22[j].id, esc_pins, esc_info);
        }
    }

    /* ── Закрытие разделов + курсор следующей страницы ── */
    if (any) pos += snprintf(g_body + pos, G_BODY_SIZE - pos, "}");
    pos += snprintf(g_body + pos, G_BODY_SIZE - pos, "],\"next\":%d}", next);

    char hdr[80];
    snprintf(hdr, sizeof(hdr),
             "ETag: %s\r\nCache-Control: no-cache\r\n", etag_q);
    mg_printf(c, "HTTP/1.1 200 OK\r\n%s%sContent-Length: %d\r\n\r\n",
              s_json_header, hdr, pos);
    mg_send(c, g_body, pos);
    c->is_resp = 0;
}

/* ═══════════════ POST /api/remote/cmd — команды пульта ═══════════════
 * Тело ≤256 байт: {"t":"sw","id":5,"v":1}. Диспетчер вызывает общие
 * cmd_*_exec (zagotovka.c) — логика с api_handler не дублируется.
 * Ответ: {"ok":true} либо {"ok":false,"code":N}, N из 400/403/409/429/503. */
static void handle_remote_cmd(struct mg_connection *c,
                              struct mg_http_message *hm) {
    if (!require_post_json(c, hm)) return; /* 405/415 */
    if (hm->body.len == 0 || hm->body.len >= 256) {
        mg_http_reply(c, 400, s_json_header, "{\"ok\":false,\"code\":400}");
        return;
    }
    char body[256];
    memcpy(body, hm->body.buf, hm->body.len);
    body[hm->body.len] = '\0';
    struct mg_str json = mg_str(body);

    int id = (int)mg_json_get_long(json, "$.id", -1);
    char *t = mg_json_get_str(json, "$.t");
    if (t == NULL || id < 0) {
        if (t) mg_free(t);
        mg_http_reply(c, 400, s_json_header, "{\"ok\":false,\"code\":400}");
        return;
    }

    int st = 400;
    if (strcmp(t, "sw") == 0) {
        st = cmd_switch_exec(id, (int)mg_json_get_long(json, "$.v", -1));
    } else if (strcmp(t, "bt") == 0) {
        st = cmd_button_exec(id, (int)mg_json_get_long(json, "$.a", -1));
    } else if (strcmp(t, "pw") == 0) {
        st = cmd_pwm_exec(id, (int)mg_json_get_long(json, "$.v", -1));
    } else if (strcmp(t, "zb") == 0) {
        int on   = (int)mg_json_get_long(json, "$.on", -1);
        int v    = (int)mg_json_get_long(json, "$.v", -1);
        long col = (long)mg_json_get_long(json, "$.c", -1);
        st = cmd_zigbee_exec(id, on, v, col);
    } else if (strcmp(t, "pd") == 0) {
        bool has_sp = mg_json_get(json, "$.sp", NULL) >= 0;
        double sp = 0;
        if (has_sp && !mg_json_get_num(json, "$.sp", &sp))
            sp = (double)mg_json_get_long(json, "$.sp", 0);
        bool has_on = mg_json_get(json, "$.on", NULL) >= 0;
        int on = (int)mg_json_get_long(json, "$.on", 0);
        st = cmd_pid_exec(id, has_sp, sp, has_on, on);
    } else if (strcmp(t, "sc") == 0) {
        long on = mg_json_get_long(json, "$.on", -1);
        if (on < 0) on = mg_json_get_long(json, "$.v", -1);
        st = cmd_security_exec(id, (int)on);
    }
    mg_free(t);

    MG_INFO(("%lu remote/cmd t=%.*s id=%d -> %d", c->id,
             (int) hm->body.len > 8 ? 8 : (int) hm->body.len, hm->body.buf,
             id, st));
    if (st == 200) {
        mg_http_reply(c, 200, s_json_header, "{\"ok\":true}");
    } else {
        mg_http_reply(c, st, s_json_header, "{\"ok\":false,\"code\":%d}", st);
    }
}

void fn(struct mg_connection *c, int ev, void *ev_data, void *fn_data) {

	// --- Логирование всех событий для отладки ---
	(void) fn_data;
	static int s_active_conns = 0;
	// MG_DEBUG(("%lu Event received: %d", c->id, ev));
	// --- TLS-specific event handling (for HTTPS) ---
	// ...
	// --- General events (for HTTP, HTTPS, and MQTT) ---
	switch (ev) {
	case MG_EV_OPEN:
		MG_INFO(("%lu Connection created (TLS: %d)", c->id, c->is_tls));
		break;

    case MG_EV_ACCEPT: {
        // ПЕРВЫМ ДЕЛОМ — определяем тип соединения до любого цикла.
        // Listener имеет CONN_TYPE_LISTENER=0xFF — в подсчёт не попадёт.
        unsigned int local_port = mg_ntohs(c->loc.port);
        if (local_port == atoi(HTTP_PORT)) {
            c->fn_data = (void *)CONN_TYPE_HTTP;
        } else if (local_port == atoi(HTTPS_PORT)) {
            c->fn_data = (void *)CONN_TYPE_HTTPS;
        }
        const bool is_https = (local_port == atoi(HTTPS_PORT));

        /* ── Единый бюджет соединений (см. net_limits.h) ──────────────────
         * Уровень 1 (SYN-фильтр в mongoose.c) отсекает почти всё ДО выделения
         * памяти. Здесь — страховка от гонки (несколько SYN приняты в одном
         * poll) и от лимитов, которые SYN-фильтр не видит. Все отказы — TCP RST
         * ДО mg_tls_init(): x25519/ECDSA и буферы TLS не тратятся. */
        s_active_conns++;
        char buf_rem[32];
        mg_snprintf(buf_rem, sizeof(buf_rem), "%M", mg_print_ip_port, &c->rem);

        net_census_t cs;
        net_census(c->mgr, c, &c->rem, &cs);

        /* [1] FreeRTOS heap: не начинаем handshake, если свободно < 30 КБ
         *     (или самый большой блок мал — фрагментация). */
        if (!net_heap_ok(is_https ? NET_HEAP_HS_MIN : NET_HEAP_CONN_MIN,
                         is_https ? NET_HEAP_LARGEST_MIN : 4096u)) {
            net_reject_conn(c, "heap", buf_rem, &cs);
            return;
        }

        /* [2] Параллельных TLS-handshake — ВСЕГДА не больше NET_HS_MAX_PARALLEL (1).
         *     Вытесняем только ЗАВИСШИЙ (> NET_HS_TIMEOUT_MS); свежий не трогаем —
         *     обрыв середины handshake тратит CPU впустую. */
        if (is_https && cs.hs_total >= NET_HS_MAX_PARALLEL) {
            if (cs.hs_oldest != NULL && cs.hs_oldest_age > NET_HS_TIMEOUT_MS) {
                printf("[NET] Evict stale hs conn %lu, age=%lu ms\r\n",
                       (unsigned long)cs.hs_oldest->id,
                       (unsigned long)cs.hs_oldest_age);
                cs.hs_oldest->is_draining = 1;
                cs.hs_oldest->is_closing  = 1;
            } else {
                net_reject_conn(c, "hs", buf_rem, &cs);
                return;
            }
        }

        /* [3] Бюджет web-соединений: per-IP, общий web, общий web+MQTT.
         *     Новая сессия всегда проходит, если есть простаивающее соединение
         *     (вытесняем самое старое); иначе RST. */
        {
            const uint32_t web_now = (uint32_t)cs.web_est + cs.web_hs;
            const uint32_t all_now = web_now + cs.mqtt_srv + cs.mqtt_out;
            struct mg_connection *victim = NULL;
            bool need_evict = false;

            if (cs.same_ip >= NET_WEB_PER_IP_MAX) {
                need_evict = true;
                victim = cs.idle_same_ip;
            } else if (web_now >= NET_WEB_CONNS_MAX ||
                       all_now >= NET_TOTAL_CONNS_MAX) {
                need_evict = true;
                victim = cs.idle_any;
            }
            if (need_evict) {
                if (victim == NULL) {
                    net_reject_conn(c, "budget", buf_rem, &cs);
                    return;
                }
                MG_INFO(("Evict idle conn %lu to free slot", victim->id));
                victim->is_draining = 1;
                victim->is_closing  = 1;
            }
            /* Лимит простоя: 1 web-соединение — держим долго, >1 — лишние быстро */
            {
                const uint32_t web_after = web_now + 1u - ((need_evict && victim) ? 1u : 0u);
                s_web_idle_limit_ms = (web_after > 1u) ? NET_WEB_IDLE_EXTRA_MS
                                                       : NET_WEB_IDLE_SOLO_MS;
            }
        }

        MG_INFO(("Accept: local %M remote %M", mg_print_ip_port, &c->loc, mg_print_ip_port, &c->rem));

        /* ── Блокировка внешних сканеров при ОТКлюченном HTTPS ── */
        if (local_port == atoi(HTTP_PORT) && !c->rem.is_ip6) {
            if (SetSettings.usehttps != 1) {
                /* ip4 в network byte order, mg_ntohl преобразует в host byte order */
                uint32_t ip4 = mg_ntohl(c->rem.addr.ip4);
                uint8_t b0 = (uint8_t)(ip4 >> 24);
                uint8_t b1 = (uint8_t)(ip4 >> 16);
                bool priv = (b0 == 10) ||
                            (b0 == 172 && (b1 & 0xF0) == 16) ||
                            (b0 == 192 && b1 == 168) ||
                            (b0 == 127);
                if (!priv) {
                    printf("[NET] rejected external conn from %s (HTTPS disabled)\r\n", buf_rem);
                    c->is_draining = 1;
                    c->is_closing  = 1;
                    return;
                }
            }
        }

        /* ── TLS init для HTTPS ── */
        if (local_port == atoi(HTTPS_PORT)) {
            MG_INFO(("HTTPS connection accepted on port %s", HTTPS_PORT));
            if (SetSettings.usehttps == 1) {
                tls_hs_track_start(c->id);

                /* Сертификаты уже загружены в web_init() — никакого файлового I/O */
                if (s_mysett_mutexHandle)
                    osMutexAcquire(s_mysett_mutexHandle, osWaitForever);
                if (!s_tls_loaded ||
                    s_tls_cert[0] == '\0' || s_tls_key[0] == '\0') {
                    if (s_mysett_mutexHandle)
                        osMutexRelease(s_mysett_mutexHandle);
                    MG_ERROR(("TLS cert/key not preloaded"));
                    c->is_draining = 1;
                    c->is_closing  = 1;
                    return;
                }

                struct mg_tls_opts opts = {
                    .cert = mg_str(s_tls_cert),
                    .key  = mg_str(s_tls_key),
                };
                mg_tls_init(c, &opts);
                if (s_mysett_mutexHandle)
                    osMutexRelease(s_mysett_mutexHandle);

                if (c->tls == NULL) {
                    MG_ERROR(("Error: TLS initialization failed"));
                    c->is_draining = 1;
                    c->is_closing  = 1;
                    return;
                }
            }
        } else {
            MG_INFO(("HTTP connection accepted on port %s", HTTP_PORT));
        }
    }
    break;

    case MG_EV_TLS_HS: {
        // uint32_t hs_cycles = 0;
        // uint64_t hs_elapsed = tls_hs_track_finish(c->id, &hs_cycles);
        // uint32_t hs_ms = (uint32_t)hs_elapsed;
        // uint32_t hs_us = (SystemCoreClock >= 1000000)
        //     ? (hs_cycles / (SystemCoreClock / 1000000))
        //     : (hs_cycles * 1000000 / SystemCoreClock);
        // printf("[SYSTEM] TLS hs conn=%lu ms=%lu us=%lu cyc=%lu\r\n",
        //        (unsigned long)c->id,
        //        (unsigned long)hs_ms,
        //        (unsigned long)hs_us,
        //        (unsigned long)hs_cycles);
        tls_hs_track_finish(c->id, NULL);
    }
    break;

    case MG_EV_HTTP_HDRS: {
        struct mg_http_message *hm = (struct mg_http_message *) ev_data;
        if (mg_match(hm->uri, mg_str("/api/firmware/upload"), NULL)) {
            struct mg_str *cl_hdr = mg_http_get_header(hm, "Content-Length");
            int content_length = 0;
            if (authenticate(hm) == NULL) {
                mg_http_reply(c, 403, "Connection: close\r\n",
                              "{\"error\":\"session_expired\"}");
                c->is_draining = 1;
            } else if (cl_hdr == NULL ||
                       !mg_str_to_num(*cl_hdr, 10, &content_length, sizeof(content_length))) {
                mg_http_reply(c, 411, "Connection: close\r\n",
                              "{\"status\":false,\"message\":\"Length required\"}");
                c->is_draining = 1;
            } else if (content_length > OTA_MAX_CHUNK_BODY) {
                MG_ERROR(("%lu Rejecting oversized OTA chunk: %d bytes (limit %d)",
                          (unsigned long) c->id, content_length, OTA_MAX_CHUNK_BODY));
                mg_http_reply(c, 413, "Connection: close\r\n",
                              "{\"status\":false,\"message\":\"Payload too large\"}");
                c->is_draining = 1;
            }
        } else {
            struct mg_str *cl_hdr = mg_http_get_header(hm, "Content-Length");
            if (cl_hdr != NULL) {
                int content_length = 0;
                if (mg_str_to_num(*cl_hdr, 10, &content_length, sizeof(content_length))) {
                    if (mg_match(hm->uri, mg_str("/api/select/set"), NULL)) {
                        MG_DEBUG(("%lu select/set body size=%d", (unsigned long) c->id, content_length));
                    }
                    if (content_length > MAX_API_BODY_SIZE) {
                        MG_ERROR(("%lu Rejecting oversized body: %d bytes (limit %d), uri=%.*s",
                                  (unsigned long) c->id, content_length, MAX_API_BODY_SIZE,
                                  (int) hm->uri.len, hm->uri.buf));
                        mg_http_reply(c, 413, "Connection: close\r\n",
                                      "{\"status\":false,\"message\":\"Payload too large\"}");
                        c->is_draining = 1;
                    }
                }
            }
        }
    }
    break;
/***************************************************************************/
	case MG_EV_HTTP_MSG: {
		uint32_t t_req_start = HAL_GetTick();
		*(uint32_t*)c->data = t_req_start;  // timestamp last request
		struct mg_http_message *hm = (struct mg_http_message*) ev_data;
		req_total++;
		if (mg_match(hm->uri, mg_str("/api/#"), NULL)) {
			req_api++;
		}
		// printf("[HTTP] %s req #%lu: %.*s (conn %lu)\r\n",
		//        c->is_tls ? "HTTPS" : "HTTP", (unsigned long)req_total,
		//        (int)hm->uri.len, hm->uri.buf, (unsigned long)c->id);
		MG_DEBUG(("%lu %s msg: %.*s", c->id, c->is_tls ? "HTTPS" : "HTTP", (int) hm->uri.len, hm->uri.buf));

		// Проверка авторизации для API
		struct user *u = authenticate(hm);
		MG_DEBUG(("%lu Auth: user=%p", c->id, (void*) u));

		struct mg_str uri = hm->uri;
		bool keep_alive = false;

		// Обработка корневого пути (/)
		if (uri.len == 1 && strncmp(uri.buf, "/", uri.len) == 0) {
			MG_DEBUG(("%lu Serving root /", c->id));
			char extra_headers[256];
			bool is_js  = mg_match(hm->uri, mg_str("/assets/*.js"),  NULL) ||
			              mg_match(hm->uri, mg_str("/history.min.js"), NULL);
			bool is_css = mg_match(hm->uri, mg_str("*.css"), NULL) ||
			              mg_match(hm->uri, mg_str("/assets/*.css"), NULL);
			snprintf(extra_headers, sizeof(extra_headers),
			         "Cache-Control: %s\r\nConnection: keep-alive\r\n%s",
			         (is_js || is_css) ? "max-age=31536000" : "no-cache, no-store, must-revalidate",
			         (is_js || is_css) ? "Content-Encoding: gzip\r\n" : "");
			struct mg_http_serve_opts opts = {0};
			opts.root_dir = "/web_root";
			opts.fs = &mg_fs_packed;
			opts.extra_headers = extra_headers;
			mg_http_serve_dir(c, ev_data, &opts);
			keep_alive = true;
			// c->is_draining = 1;
		}  else {
			MG_INFO(("%lu Not root path, proceeding to API handling", c->id));

			/* ── State slice polling endpoints (Keep-Alive) ── */
			if (mg_match(hm->uri, mg_str("/api/state/*"), NULL)) {
				if (u == NULL) {
					mg_printf(c, "HTTP/1.1 403 Forbidden\r\n"
					             "Content-Type: application/json\r\n"
					             "Content-Length: 27\r\n"
					             "\r\n"
					             "{\"error\":\"session_expired\"}");
					c->is_resp = 0;
					return;
				} else if (mg_match(hm->uri, mg_str("/api/state/sensors"), NULL)) {
					if (!check_etag_304(c, hm, &g_ver_sensors)) handle_sensors(c);
				} else if (mg_match(hm->uri, mg_str("/api/state/common"), NULL)) {
					if (!check_etag_304(c, hm, &g_ver_common)) handle_common(c);
} else if (mg_match(hm->uri, mg_str("/api/state/pid"), NULL)) {
				if (!check_etag_304(c, hm, &g_ver_pid)) handle_pid(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/state/onewire"), NULL)) {
					if (!check_etag_304(c, hm, &g_ver_onewire)) handle_onewire(c);
				} else if (mg_match(hm->uri, mg_str("/api/state/button"), NULL)) {
					if (!check_etag_304(c, hm, &g_ver_button)) handle_buttons(c, hm);
				} else if (mg_match(hm->uri, mg_str("/api/state/security"), NULL)) {
					if (!check_etag_304(c, hm, &g_ver_security)) handle_security(c, hm);
				} else if (mg_match(hm->uri, mg_str("/api/state/switch"), NULL)) {
					if (!check_etag_304(c, hm, &g_ver_switch)) handle_switches_req(c, hm);
				} else if (mg_match(hm->uri, mg_str("/api/state/encoder"), NULL)) {
					if (!check_etag_304(c, hm, &g_ver_encoder)) handle_encoders(c, hm);
				} else if (mg_match(hm->uri, mg_str("/api/state/remote"), NULL)) {
					/* ETag/304 внутри хендлера: хеш считается на лету,
					 * 304 допустим только на первой странице */
					handle_remote_state(c, hm);
				} else {
					mg_http_reply(c, 404, "", "");
				}
				keep_alive = true;
				break;
			}

			/* ── Unified /api/pins (ETag + 304, chunked JSON, all pin types) ── */
			if (mg_match(hm->uri, mg_str("/api/pins"), NULL)) {
				if (u == NULL) {
					mg_printf(c, "HTTP/1.1 403 Forbidden\r\n"
					             "Content-Type: application/json\r\n"
					             "Content-Length: 27\r\n"
					             "\r\n"
					             "{\"error\":\"session_expired\"}");
					c->is_resp = 0;
					return;
				}
				else { handle_get_pins(c, hm); }
				keep_alive = true;
				break;
			}
			/* ── /api/pid (ETag + 304, Content-Length) — PID is a separate subsystem ── */
			if (mg_match(hm->uri, mg_str("/api/pid"), NULL)) {
				if (u == NULL) {
					mg_printf(c, "HTTP/1.1 403 Forbidden\r\n"
					             "Content-Type: application/json\r\n"
					             "Content-Length: 27\r\n"
					             "\r\n"
					             "{\"error\":\"session_expired\"}");
					c->is_resp = 0;
					return;
				}
				else if (!check_etag_304(c, hm, &g_ver_pid)) { handle_pid(c, hm); }
				keep_alive = true;
				break;
			}
			/* ── /api/pins/get (user labels for pin modals) ── */
			if (mg_match(hm->uri, mg_str("/api/pins/get"), NULL)) {
				if (u == NULL) {
					mg_printf(c, "HTTP/1.1 403 Forbidden\r\n"
					             "Content-Type: application/json\r\n"
					             "Content-Length: 27\r\n"
					             "\r\n"
					             "{\"error\":\"session_expired\"}");
					c->is_resp = 0;
					return;
				}
				handle_pins_get(c, hm);
				keep_alive = true;
				break;
			}
			/* /api/sensors/get - компактный постраничный список датчиков OneWire (для окна Edit PID).
			   В отличие от /api/pins/get требует авторизации. */
			if (mg_match(hm->uri, mg_str("/api/sensors/get"), NULL)) {
				if (u == NULL) {
					mg_printf(c, "HTTP/1.1 403 Forbidden\r\n"
					             "Content-Type: application/json\r\n"
					             "Content-Length: 27\r\n"
					             "\r\n"
					             "{\"error\":\"session_expired\"}");
					c->is_resp = 0;
					return;
				}
				handle_sensors_get(c, hm);
				keep_alive = true;
				break;
			}
			if (mg_match(hm->uri, mg_str("/api/switch/get"), NULL)) {
				if (u == NULL) {
					mg_printf(c, "HTTP/1.1 403 Forbidden\r\n"
					             "Content-Type: application/json\r\n"
					             "Content-Length: 27\r\n"
					             "\r\n"
					             "{\"error\":\"session_expired\"}");
					c->is_resp = 0;
					return;
				}
				handle_switches_req(c, hm);
				keep_alive = true;
				break;
			}
			if (mg_match(hm->uri, mg_str("/api/pintopin/get"), NULL)) {
				if (u == NULL) {
					mg_printf(c, "HTTP/1.1 403 Forbidden\r\n"
					             "Content-Type: application/json\r\n"
					             "Content-Length: 27\r\n"
					             "\r\n"
					             "{\"error\":\"session_expired\"}");
					c->is_resp = 0;
					return;
				}
				keep_alive = handle_pintopin_get_ex(c, hm);
				break;
			}
			/* ── Keep-Alive GET poll endpoints (reuse connection, no TLS storm) ── */
			if (mg_match(hm->uri, mg_str("/api/select/get"), NULL)) {
				if (u == NULL) {
					mg_printf(c, "HTTP/1.1 403 Forbidden\r\n"
					             "Content-Type: application/json\r\n"
					             "Content-Length: 27\r\n"
					             "\r\n"
					             "{\"error\":\"session_expired\"}");
					c->is_resp = 0;
					return;
				}
				if (!check_etag_304(c, hm, &g_ver_select)) {
					char buf[32];
					long offset = 0, limit = 30;
					if (mg_http_get_var(&hm->query, "offset", buf, sizeof(buf)) > 0)
						offset = mg_json_get_long(mg_str(buf), "$", 0);
					if (mg_http_get_var(&hm->query, "limit", buf, sizeof(buf)) > 0)
						limit = mg_json_get_long(mg_str(buf), "$", 30);
					if (offset < 0) offset = 0;
					if (limit <= 0) limit = 30;
					if (limit > MAX_SELECT_PAGE_LIMIT) limit = MAX_SELECT_PAGE_LIMIT;
					MG_INFO(("%lu Processing /api/select/get offset=%ld limit=%ld", c->id, offset, limit));
					handle_select_get(c, offset, limit);
				}
				keep_alive = true;
				break;
			}
			if (mg_match(hm->uri, mg_str("/api/cron/get"), NULL)) {
				if (u == NULL) {
					mg_printf(c, "HTTP/1.1 403 Forbidden\r\n"
					             "Content-Type: application/json\r\n"
					             "Content-Length: 27\r\n"
					             "\r\n"
					             "{\"error\":\"session_expired\"}");
					c->is_resp = 0;
					return;
				}
				MG_INFO(("%lu Processing /api/cron/get", c->id));
				if (!check_etag_304(c, hm, &g_ver_timers)) handle_timers_get(c, hm);
				keep_alive = true;
				break;
			}
			if (mg_match(hm->uri, mg_str("/api/onewire/get"), NULL)) {
				if (u == NULL) {
					mg_printf(c, "HTTP/1.1 403 Forbidden\r\n"
					             "Content-Type: application/json\r\n"
					             "Content-Length: 27\r\n"
					             "\r\n"
					             "{\"error\":\"session_expired\"}");
					c->is_resp = 0;
					return;
				}
				/* ETag = версия конфигурации (onewire_cfg_ver), не температур. */
				volatile uint32_t ow_ver = onewire_cfg_ver();
				if (!check_etag_304(c, hm, &ow_ver)) {
				    MG_INFO(("%lu Processing /api/onewire/get", c->id));
				    handle_onewire_get(c, hm, (uint32_t) ow_ver);
				}
				keep_alive = true;
				break;
			}
			if (mg_match(hm->uri, mg_str("/api/mysett/get"), NULL)) {
				if (u == NULL) {
					mg_printf(c, "HTTP/1.1 403 Forbidden\r\n"
				                 "Content-Type: application/json\r\n"
				                 "Content-Length: 27\r\n"
				                 "\r\n"
				                 "{\"error\":\"session_expired\"}");
					c->is_resp = 0;
					return;
				}
				MG_INFO(("%lu Processing /api/mysett/get", c->id));
				if (!check_etag_304(c, hm, &g_ver_settings)) handle_mysett_get(c);
				keep_alive = true;
				break;
			}
			// Обработка API-запросов
			if (mg_match(hm->uri, mg_str("/api/login"), NULL)) {
			    MG_INFO(("%lu Processing /api/login", c->id));
			    uint32_t now = mg_millis();
			    if (now < s_login_block_until) {
			        mg_http_reply(c, 429, "Connection: close\r\n",
			                      "{\"error\":\"too many requests\"}\n");
			        c->is_draining = 1;
			    } else if (u == NULL) {
			        // Неудачная попытка: неверные credentials
			        if (++s_login_fail_count >= LOGIN_MAX_FAILS) {
			            s_login_block_until = mg_millis() + LOGIN_BLOCK_MS;
			            MG_ERROR(("%lu Login blocked for %d ms after %d failures",
			                      c->id, LOGIN_BLOCK_MS, LOGIN_MAX_FAILS));
			        }
			        mg_http_reply(c, 403, "Connection: close\r\n",
			                      "{\"error\":\"Invalid credentials\"}\n");
			        c->is_draining = 1;
			    } else {
			        // Успешный логин: сбрасываем счётчик
			        s_login_fail_count = 0;
			        handle_login(c, u);
			    }
			} else if (mg_match(hm->uri, mg_str("/api/logout"), NULL)) {
			    MG_INFO(("%lu Processing /api/logout", c->id));
			    handle_logout(c);
			} else if (mg_match(hm->uri, mg_str("/api/#"), NULL) && u == NULL) {
			    MG_ERROR(("%lu Unauthorized API request: %.*s", c->id, (int) hm->uri.len, hm->uri.buf));
			    mg_printf(c, "HTTP/1.1 403 Forbidden\r\n"
			                 "Content-Type: application/json\r\n"
			                 "Content-Length: 27\r\n"
			                 "\r\n"
			                 "{\"error\":\"session_expired\"}");
			    c->is_resp = 0;
			    return;
			} else if (mg_match(hm->uri, mg_str("/api/debug"), NULL)) {
				MG_INFO(("%lu Processing /api/debug", c->id));
				handle_debug(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/stats/get"), NULL)) {
				MG_INFO(("%lu Processing /api/stats/get", c->id));
				handle_stats_get(c);
			} else if (mg_match(hm->uri, mg_str("/api/events/get"), NULL)) {
				MG_INFO(("%lu Processing /api/events/get", c->id));
				handle_events_get(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/logs/get"), NULL)) {
				MG_INFO(("%lu Processing /api/logs/get", c->id));
				handle_logs_get(c, hm);
				keep_alive = true;
			} else if (mg_match(hm->uri, mg_str("/api/settings/get"), NULL)) {
				MG_INFO(("%lu Processing /api/settings/get", c->id));
				handle_settings_get(c);
			} else if (mg_match(hm->uri, mg_str("/api/settings/set"), NULL)) {
				MG_INFO(("%lu Processing /api/settings/set", c->id));
				handle_settings_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/firmware/upload"), NULL)) {
				MG_INFO(("%lu Processing /api/firmware/upload", c->id));
				handle_firmware_upload(c, hm);
				// Keep-Alive нужен только МЕЖДУ чанками одной OTA-сессии.
				// На финальном чанке (успех -> reboot через 500мс) или при ошибке
				// ota_session_clear() обнуляет s_ota_expected — соединение НЕ держим:
				// иначе браузер переиспользует этот сокет для следующего запроса
				// (например /api/firmware/status), а устройство уже ребутается —
				// запрос зависает без ответа и без ошибки, и страница не обновляется.
				keep_alive = (s_ota_expected != 0);
			} else if (mg_match(hm->uri, mg_str("/api/firmware/commit"), NULL)) {
				MG_INFO(("%lu Processing /api/firmware/commit", c->id));
				handle_firmware_commit(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/firmware/switch-bank"), NULL)) {
				MG_INFO(("%lu Processing /api/firmware/switch-bank", c->id));
				handle_firmware_switch_bank(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/firmware/rollback"), NULL)) {
				MG_INFO(("%lu Processing /api/firmware/rollback", c->id));
				handle_firmware_rollback(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/firmware/status"), NULL)) {
				MG_INFO(("%lu Processing /api/firmware/status", c->id));
				handle_firmware_status(c);
			} else if (mg_match(hm->uri, mg_str("/api/device/reset"), NULL)) {
				MG_INFO(("%lu Processing /api/device/reset", c->id));
				handle_device_reset(c, hm);
			#ifdef ENABLE_ERASE_LAST_SECTOR
			} else if (mg_match(hm->uri, mg_str("/api/device/eraselast"), NULL)) {
				MG_INFO(("%lu Processing /api/device/eraselast", c->id));
				handle_device_eraselast(c, hm);
#endif
			} else if (mg_match(hm->uri, mg_str("/api/select/set"), NULL)) {
				MG_INFO(("%lu Processing /api/select/set", c->id));
				handle_select_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/switch/set"), NULL)) {
				MG_INFO(("%lu Processing /api/switch/set", c->id));
				handle_switch_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/zigbee/get"), NULL)) {
				if (!check_etag_304(c, hm, &g_ver_zigbee)) {
					char buf[32];
					char tbuf[64];
					const char *type_filter = NULL;  /* ?type=dimmer,color_lamp - серверный фильтр по типам */
					long offset = 0, limit = 30;
					if (mg_http_get_var(&hm->query, "offset", buf, sizeof(buf)) > 0)
						offset = mg_json_get_long(mg_str(buf), "$", 0);
					if (mg_http_get_var(&hm->query, "limit", buf, sizeof(buf)) > 0)
						limit = mg_json_get_long(mg_str(buf), "$", 30);
					if (mg_http_get_var(&hm->query, "type", tbuf, sizeof(tbuf)) > 0)
						type_filter = tbuf;
					if (offset < 0) offset = 0;
					if (limit <= 0) limit = 30;
					if (limit > MAX_SELECT_PAGE_LIMIT) limit = MAX_SELECT_PAGE_LIMIT;
					MG_INFO(("%lu Processing /api/zigbee/get offset=%ld limit=%ld", c->id, offset, limit));
					handle_zigbee_get(c, offset, limit, type_filter);
				}
				keep_alive = true;
				break;
			} else if (mg_match(hm->uri, mg_str("/api/zigbee/set"), NULL)) {
				MG_INFO(("%lu Processing /api/zigbee/set", c->id));
				handle_zigbee_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/zigbee/enable"), NULL)) {
				MG_INFO(("%lu Processing /api/zigbee/enable", c->id));
				handle_zigbee_enable(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/zigbee/command"), NULL)) {
				MG_INFO(("%lu Processing /api/zigbee/command", c->id));
				handle_zigbee_command(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/zigbee/rescan"), NULL)) {
				MG_INFO(("%lu Processing /api/zigbee/rescan", c->id));
				handle_zigbee_rescan(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/zigbee/learn/status"), NULL)) {
				MG_INFO(("%lu Processing /api/zigbee/learn/status", c->id));
				handle_zigbee_learn_status(c, hm);
				keep_alive = true;
			} else if (mg_match(hm->uri, mg_str("/api/zigbee/learn/get"), NULL)) {
				MG_INFO(("%lu Processing /api/zigbee/learn/get", c->id));
				handle_zigbee_learn_get(c, hm);
				keep_alive = true;
			} else if (mg_match(hm->uri, mg_str("/api/zigbee/learn/label"), NULL)) {
				MG_INFO(("%lu Processing /api/zigbee/learn/label", c->id));
				handle_zigbee_learn_label(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/zigbee/learn/start"), NULL)) {
				MG_INFO(("%lu Processing /api/zigbee/learn/start", c->id));
				handle_zigbee_learn_start(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/zigbee/learn/stop"), NULL)) {
				MG_INFO(("%lu Processing /api/zigbee/learn/stop", c->id));
				handle_zigbee_learn_stop(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/remote/cmd"), NULL)) {
				MG_INFO(("%lu Processing /api/remote/cmd", c->id));
				handle_remote_cmd(c, hm);
				keep_alive = true;
				break;
			} else if (mg_match(hm->uri, mg_str("/api/onoff/set"), NULL)) {
				MG_INFO(("%lu Processing /api/onoff/set", c->id));
				handle_onoff_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/button/get"), NULL)) {
				MG_INFO(("%lu Processing /api/button/get", c->id));
				handle_button_get(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/button/set"), NULL)) {
				MG_INFO(("%lu Processing /api/button/set", c->id));
				handle_button_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/encoder/get"), NULL)) {
				req_encoder++;
				MG_INFO(("%lu Processing /api/encoder/get", c->id));
//				uint32_t t1 = HAL_GetTick();
				handle_encoder_get(c);
				// printf("[NET] encoder_get=%lu ms\r\n", (unsigned long)(HAL_GetTick() - t1));
			} else if (mg_match(hm->uri, mg_str("/api/encoder/set"), NULL)) {
				req_encoder++;
				MG_INFO(("%lu Processing /api/encoder/set", c->id));
//				uint32_t t1 = HAL_GetTick();
				handle_encoder_set(c, hm);
				// printf("[NET] encoder_set=%lu ms\r\n", (unsigned long)(HAL_GetTick() - t1));
			} else if (mg_match(hm->uri, mg_str("/api/pid/get"), NULL)) {
				MG_INFO(("%lu Processing /api/pid/get", c->id));
				handle_pid_get(c);
			} else if (mg_match(hm->uri, mg_str("/api/pid/set"), NULL)) {
				MG_INFO(("%lu Processing /api/pid/set", c->id));
				handle_pid_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/pidline/set"), NULL)) {
				MG_INFO(("%lu Processing /api/pidline/set", c->id));
				handle_pidline_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/pid/tune"), NULL)) {
				MG_INFO(("%lu Processing /api/pid/tune", c->id));
				handle_pid_tune_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/numline/set"), NULL)) {
				MG_INFO(("%lu Processing /api/numline/set", c->id));
				handle_numline_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/cron/set"), NULL)) {
				MG_INFO(("%lu Processing /api/cron/set", c->id));
				handle_timers_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/mysett/set"), NULL)) {
				MG_INFO(("%lu Processing /api/mysett/set", c->id));
				handle_mysett_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/logfilter"), NULL)) {
				MG_INFO(("%lu Processing /api/logfilter", c->id));
				handle_logfilter(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/connection/del"), NULL)) {
				MG_INFO(("%lu Processing /api/connection/del", c->id));
				handle_connection_del(c, hm, PinsLinks);
			} else if (mg_match(hm->uri, mg_str("/api/stm32-time"), NULL)) {
				MG_INFO(("%lu Processing /api/stm32-time", c->id));
				handle_stm32time_get(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/temp/get"), NULL)) {
				MG_INFO(("%lu Processing /api/temp/get", c->id));
				handle_temp_get(c);
			} else if (mg_match(hm->uri, mg_str("/api/security/get"), NULL)) {
				MG_INFO(("%lu Processing /api/security/get", c->id));
				handle_security_get(c);
			} else if (mg_match(hm->uri, mg_str("/api/security/set"), NULL)) {
				MG_INFO(("%lu Processing /api/security/set", c->id));
				handle_security_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/sensor/set"), NULL)) {
				MG_INFO(("%lu Processing /api/sensor/set", c->id));
				handle_sensor_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/onewire/set"), NULL)) {
				MG_INFO(("%lu Processing /api/onewire/set", c->id));
				handle_onewire_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/*/*"), NULL)) {
				MG_INFO(("%lu Processing /api/*/*", c->id));
				const char *api_path = hm->uri.buf + 5;  // Skip "/api/"
				const char *second_slash = strchr(api_path, '/');
				if (second_slash) {
					// Извлекаем токен для проверки
					size_t token_len = second_slash - api_path;
					if (token_len > 0 && token_len == strlen(SetSettings.token) && strncmp(api_path, SetSettings.token, token_len) == 0) {
						const char *command = api_path;  // Полный путь с токеном
						const char *end = strchr(command, ' ');  // Find end of URI
						size_t command_len = end ? (size_t) (end - command) : strlen(command);
 
						if (command_len > 0) {
							// Пропускаем токен и проверяем команду
							const char *cmd_after_token = second_slash + 1;
							if (strncmp(cmd_after_token, "switch", 6) == 0 || strncmp(cmd_after_token, "button", 6) == 0 || strncmp(cmd_after_token, "pwm", 3) == 0) {
								struct mg_http_message modified_hm = *hm;
								modified_hm.uri.buf = (char*) command;
								modified_hm.uri.len = command_len;
								MG_INFO(("%lu Processing API command with token: %.*s", c->id, (int) command_len, command));
								api_handler(c, &modified_hm);
							} else {
								MG_ERROR(("%lu Invalid command format: %.*s", c->id, (int)(command_len - token_len - 1), cmd_after_token));
								mg_http_reply(c, 400, NULL, "Invalid command format\n");
							}
						} else {
							MG_ERROR(("%lu Empty command after token", c->id));
							mg_http_reply(c, 400, NULL, "Empty command\n");
						}
					} else {
						MG_ERROR(("%lu Invalid token: %.*s", c->id, (int) token_len, api_path));
						mg_http_reply(c, 401, NULL, "Invalid token\n");
					}
				} else {
					MG_ERROR(("%lu Invalid API path format: %.*s", c->id, (int) hm->uri.len, hm->uri.buf));
					mg_http_reply(c, 400, NULL, "Invalid API path format\n");
				}
                c->is_draining = 1;  // API: close connection after response
			} else {
				// Обработка статических страниц для всех остальных запросов
				MG_INFO(("%lu Did not match any API pattern, serving static content", c->id));
				struct mg_http_serve_opts opts;
				memset(&opts, 0, sizeof(opts));
 
				char extra_headers[256];
				bool is_js  = mg_match(hm->uri, mg_str("/assets/*.js"),  NULL) ||
				              mg_match(hm->uri, mg_str("/history.min.js"), NULL);
				bool is_css = mg_match(hm->uri, mg_str("*.css"), NULL) ||
				              mg_match(hm->uri, mg_str("/assets/*.css"), NULL);
                snprintf(extra_headers, sizeof(extra_headers),
                         "Cache-Control: %s\r\n"
                         "Connection: keep-alive\r\n"
                         "%s",
                         (is_js || is_css) ? "max-age=31536000" : "no-cache, no-store, must-revalidate",
                         (is_js || is_css) ? "Content-Encoding: gzip\r\n" : "");
#if MG_ARCH == MG_ARCH_UNIX || MG_ARCH == MG_ARCH_WIN32
                            opts.root_dir = "web_root";
                            MG_INFO(("%lu Using filesystem root_dir: %s for static content", c->id, opts.root_dir));
            #else
				opts.root_dir = "/web_root";
				opts.fs = &mg_fs_packed;
				MG_INFO(("%lu Using packed filesystem root_dir: %s for static content", c->id, opts.root_dir));
#endif
				opts.extra_headers = extra_headers;
				mg_http_serve_dir(c, ev_data, &opts);
                keep_alive = true;
                // c->is_draining = 1;  // close after static
				MG_INFO(("%lu Static content served", c->id));
			}
		}
        if (!keep_alive) c->is_draining = 1;
		// printf("[HTTP] req done: %lu ms (conn %lu, %s)\r\n", (unsigned long)(HAL_GetTick() - t_req_start), (unsigned long)c->id, c->is_tls ? "HTTPS" : "HTTP");
			MG_DEBUG(("%lu req done", c->id));
		break;
	}
 
	case MG_EV_WRITE:
		// if (c->is_tls) {
			// 	printf("[DBG] MG_EV_WRITE conn=%lu send.len=%u\r\n",
			// 	       c->id, (unsigned)c->send.len);
			// }
		break;

	case MG_EV_CLOSE:
		if (c->is_listening) {
			MG_ERROR(("%lu LISTENER CLOSED! port=%d TLS=%d",
			          c->id, (int)mg_ntohs(c->loc.port), c->is_tls));
		}
		if (s_active_conns > 0) s_active_conns--;
		// Освобождаем слот трекинга handshake, если соединение было в процессе
		tls_hs_track_finish(c->id, NULL);
		{	/* пересчёт лимита простоя без закрывающегося соединения */
			net_census_t cs_close;
			net_census(c->mgr, c, NULL, &cs_close);
			s_web_idle_limit_ms = ((uint32_t)cs_close.web_est + cs_close.web_hs > 1)
			                    ? NET_WEB_IDLE_EXTRA_MS : NET_WEB_IDLE_SOLO_MS;
		}
		MG_INFO(("%lu Connection closed (TLS: %d, listening: %d)",
		         c->id, c->is_tls, c->is_listening));
		break;
 
	case MG_EV_ERROR:
		{
			char err_rem[40];
			mg_snprintf(err_rem, sizeof(err_rem), "%M", mg_print_ip_port, &c->rem);
			printf("[NET] ERROR conn=%lu client=%s: %s\r\n", c->id, err_rem, (char*) ev_data);
		}
		break;
 
	case MG_EV_POLL:
		// Закомментировано для уменьшения спама
		// MG_DEBUG(("%lu MG_EV_POLL: Connection polled", c->id));
		/* Send buffer watchdog: для MQTT */
        {
            uintptr_t conn_type = (uintptr_t)c->fn_data;
            if (conn_type != CONN_TYPE_HTTP &&
                conn_type != CONN_TYPE_HTTPS &&
                conn_type != CONN_TYPE_LISTENER) {
                if (c->send.len > 16384) {
                    c->is_draining = 1;
                }
            }

            /* Idle watchdog для HTTP и HTTPS: помечаем зависшие соединения
             * для закрытия в цикле mg_mgr_poll. Прямой вызов mg_close_conn
             * здесь опасен — после возврата в mg_mgr_poll будет use-after-free.
             * HTTP  без TLS: браузер держит keep-alive, но может уйти без FIN.
             * HTTPS с TLS:  то же самое + возможны зависшие handshake. */
            /* Зависший TLS-handshake (клиент замолчал / сканер) держит
             * единственный слот handshake — закрываем по таймауту. */
            if (conn_type == CONN_TYPE_HTTPS && c->is_tls_hs && !c->is_closing &&
                !c->is_listening &&
                tls_hs_get_age_ms(c->id) > NET_HS_TIMEOUT_MS) {
                printf("[NET] hs timeout conn=%lu (%lu ms) - RST\r\n",
                       (unsigned long)c->id,
                       (unsigned long)tls_hs_get_age_ms(c->id));
#if MG_ENABLE_TCPIP
                mg_tcpip_rst_conn(c);
#else
                c->is_closing = 1;
#endif
            }
            if (!c->is_listening &&
                (conn_type == CONN_TYPE_HTTP || conn_type == CONN_TYPE_HTTPS)) {
                uint32_t last_used = *(uint32_t *)c->data;
                uint32_t now = (uint32_t)mg_millis();
                if (last_used > 0 && (now - last_used) > s_web_idle_limit_ms &&
                    c->send.len == 0) {
                    MG_INFO(("%lu %s idle watchdog: force close (idle %lu ms)",
                             c->id,
                             conn_type == CONN_TYPE_HTTPS ? "HTTPS" : "HTTP",
                             (unsigned long)(now - last_used)));
                    c->is_draining = 1;
                    c->is_closing = 1;
                }
            }
        }
		break;

	default:
		// Логирование неизвестных событий для отладки
		MG_DEBUG(("%lu Unknown event: %d", c->id, ev));
		break;
	}
}

/****************************************************************/

// MQTT
// Без volatile это тихая бомба  -  симптомы могут проявляться непредсказуемо в зависимости от уровня оптимизации компилятора (-O2/-O3 особенно агрессивны).
volatile bool mqtt_connected_reported = false;  // Глобальный: main.c проверяет перед publish_sensor_batch()
static bool s_mqtt_reconnect_reported = false; // Флаг для однократного вывода reconnecting
static uint64_t s_mqtt_conn_tick = 0;    /* метка: когда соединение было создано */
static uint64_t s_mqtt_alive_since = 0;  /* метка: когда MG_EV_MQTT_OPEN был получен */

/* Exponential backoff для TCP-level реконнектов (не только OOM).
   Без этого каждую секунду alloc/free mg_connection → фрагментация heap_4. */
static uint8_t  s_tcp_backoff = 0;       /* тиков ожидания перед коннектом */
static uint8_t  s_tcp_delay_idx = 0;     /* индекс в таблице backoff */
static const uint8_t s_backoff_tbl[] = {5, 10, 15, 30, 45, 60};
#define BACKOFF_TBL_SZ (sizeof(s_backoff_tbl)/sizeof(s_backoff_tbl[0]))

/* RAM-бюджет: над .bss лежит .noinit_ram (0x24 Б, dtcm_ota_*), а над ней
 * стек (0x2007F800..0x20080000). ASSERT в .ld проверяет ТОЛЬКО _ebss —
 * переполнение .noinit_ram поверх стека он НЕ ловит. Свободно ~8-24 Б
 * (Bank A/B). Каждый новый static/глобал - только после сверки с .map! */
#define MQTT_CLIENT_KEEPALIVE_S 20u  /* keepalive в CONNECT: связан И с интервалом PING,
                                        И с порогом RX-watchdog ниже - не разъедутся */
#define MQTT_CLIENT_PING_MS ((uint32_t)MQTT_CLIENT_KEEPALIVE_S * 1000u / 2u)

static uint32_t s_mqtt_last_rx_ms = 0;      /* момент последнего ЛЮБОГО входящего байта от брокера */
static uint32_t s_mqtt_watchdog_kills = 0;  /* сколько раз RX-watchdog форсировал реконнект */

static void fn_mqtt(struct mg_connection *c, int ev, void *ev_data, void *fn_data) {
  if (ev == MG_EV_OPEN) {
    MG_INFO(("%lu CREATED", c->id));
    // c->is_hexdumping = 1;
  } else if (ev == MG_EV_ERROR) {
    // On error, log error message
    MG_ERROR(("%lu ERROR %s", c->id, (char *) ev_data));
  } else if (ev == MG_EV_CONNECT) {
    // If target URL is SSL/TLS, command client connection to use TLS
    if (mg_url_is_ssl(get_mqtt_url())) {
      //struct mg_tls_opts opts = {.ca = "ca.pem"};
      //mg_tls_init(c, &opts);
    }
  } else if (ev == MG_EV_MQTT_OPEN) {// MQTT connect is successful
	printf("[MQTT] connected to %s\r\n", get_mqtt_url());
	mqtt_connected_reported = true;
	s_mqtt_reconnect_reported = false; // Сброс: при следующем дисконнекте снова напечатает 1 раз
	s_mqtt_conn_tick = mg_millis();    /* сбрасываем таймер watchdog  -  соединение здорово */
	s_mqtt_alive_since = mg_millis();  /* запоминаем время успешного коннекта */
	s_mqtt_last_rx_ms = (uint32_t) mg_millis(); /* CONNACK = первая живая активность брокера */
	s_tcp_backoff = 0;                 /* сброс backoff  -  соединение успешно */
	s_tcp_delay_idx = 0;
	printf("[MQTT] txmqttop='%s' rxmqttop='%s'\r\n", SetSettings.txmqttop, SetSettings.rxmqttop);
    LOG_Z2M("MQTT sub='%s' rxzbtop='%s'\r\n", s_sub_topic, get_rxzbtop());
    struct mg_str subt = mg_str(s_sub_topic);
    struct mg_str pubt = mg_str(get_mqtt_topic()), data = mg_str("Hello from stm32!");
    MG_INFO(("%lu CONNECTED to %s", c->id, get_mqtt_url()));
    struct mg_mqtt_opts sub_opts;
    memset(&sub_opts, 0, sizeof(sub_opts));
    sub_opts.topic = subt;
    sub_opts.qos = s_qos;
    mg_mqtt_sub(c, &sub_opts);
    MG_INFO(("%lu SUBSCRIBED to %.*s", c->id, (int) subt.len, subt.buf));

    /* Subscribe to wildcard topic as well to catch Swarm/switch/... */
    char subt_wildcard[64];
    snprintf(subt_wildcard, sizeof(subt_wildcard), "%s/#", s_sub_topic);
    sub_opts.topic = mg_str(subt_wildcard);
    mg_mqtt_sub(c, &sub_opts);
    MG_INFO(("%lu SUBSCRIBED to %s", c->id, subt_wildcard));

    /* Подписка на zigbee2mqtt data если rxzbtop отличается от rxmqttop */
    const char *zbtop = get_rxzbtop();
    if (strcmp(zbtop, s_sub_topic) != 0) {
      char zb_wildcard[64];
      snprintf(zb_wildcard, sizeof(zb_wildcard), "%s/#", zbtop);
      sub_opts.topic = mg_str(zb_wildcard);
      mg_mqtt_sub(c, &sub_opts);
      LOG_Z2M("MQTT SUBSCRIBED to '%s' (zigbee2mqtt data)\r\n", zb_wildcard);
    }
    struct mg_mqtt_opts pub_opts;
    memset(&pub_opts, 0, sizeof(pub_opts));
    pub_opts.topic = pubt;
    pub_opts.message = data;
    pub_opts.qos = s_qos, pub_opts.retain = false;
    mg_mqtt_pub(c, &pub_opts);
    MG_INFO(("%lu PUBLISHED %.*s -> %.*s", c->id, (int) data.len, data.buf, (int) pubt.len, pubt.buf));
    mqtt_publish_logfilter_status();

    /* КРИТИЧНО: использовать фиксированные ZBEE_ATTR_*, а не zbee_attribute!
       После зонда cluster_flags установлен, но zbee_attribute может быть 0
       (по умолчанию) — тогда подписка уйдёт не на тот атрибут. */
    for (int i = 0; i < NUMZBEE; i++) {
      if (ZigbeeConf[i].zbee_ieee[0] != '\0') {
        /* multi-EP слоты — подписка на конкретный EP */
        if (ZigbeeConf[i].ep_onoff > 0) {
          char zbee_sub_topic[96];
          snprintf(zbee_sub_topic, sizeof(zbee_sub_topic),
                   "%s/data/%.16s/%d/EF00/%04X",
                   get_rxzbtop(),
                   ZigbeeConf[i].zbee_ieee,
                   ZigbeeConf[i].zbee_endpoint,
                   ZigbeeConf[i].ep);
          struct mg_mqtt_opts zbee_sub;
          memset(&zbee_sub, 0, sizeof(zbee_sub));
          zbee_sub.topic = mg_str(zbee_sub_topic);
          zbee_sub.qos = s_qos;
          mg_mqtt_sub(c, &zbee_sub);
          printf("[MQTT] SUBSCRIBED to '%s' (zigbee id %d ep=%d)\r\n",
                 zbee_sub_topic, ZbeeIdFromIdx(i), ZigbeeConf[i].ep);

          /* Также подписываемся на кластер 8 (Dimmer) для этого EP */
          if (ZigbeeConf[i].cluster_flags & ZBEE_CL_DIMMER) {
            snprintf(zbee_sub_topic, sizeof(zbee_sub_topic),
                     "%s/data/%.16s/%d/0008/%04X",
                     get_rxzbtop(),
                     ZigbeeConf[i].zbee_ieee,
                     ZigbeeConf[i].zbee_endpoint,
                     ZBEE_ATTR_DIMMER);
            memset(&zbee_sub, 0, sizeof(zbee_sub));
            zbee_sub.topic = mg_str(zbee_sub_topic);
            zbee_sub.qos = s_qos;
            mg_mqtt_sub(c, &zbee_sub);
            printf("[MQTT] SUBSCRIBED to '%s' (zigbee id %d dimmer)\r\n",
                   zbee_sub_topic, ZbeeIdFromIdx(i));
          }

          continue;
        }

        uint8_t flags = ZigbeeConf[i].cluster_flags;
        if (flags & ZBEE_CL_ONOFF) {
          char zbee_sub_topic[80];
          snprintf(zbee_sub_topic, sizeof(zbee_sub_topic),
                   "%s/data/%.16s/%d/0006/%04X",
                   get_rxzbtop(),
                   ZigbeeConf[i].zbee_ieee,
                   ZigbeeConf[i].zbee_endpoint,
                   ZBEE_ATTR_ONOFF);
          struct mg_mqtt_opts zbee_sub;
          memset(&zbee_sub, 0, sizeof(zbee_sub));
          zbee_sub.topic = mg_str(zbee_sub_topic);
          zbee_sub.qos = s_qos;
          mg_mqtt_sub(c, &zbee_sub);
          printf("[MQTT] SUBSCRIBED to '%s' (zigbee id %d)\r\n", zbee_sub_topic, ZbeeIdFromIdx(i));
        }
        if (flags & ZBEE_CL_DIMMER) {
          char zbee_sub_topic[80];
          snprintf(zbee_sub_topic, sizeof(zbee_sub_topic),
                   "%s/data/%.16s/%d/0008/%04X",
                   get_rxzbtop(),
                   ZigbeeConf[i].zbee_ieee,
                   ZigbeeConf[i].zbee_endpoint,
                   ZBEE_ATTR_DIMMER);
          struct mg_mqtt_opts zbee_sub;
          memset(&zbee_sub, 0, sizeof(zbee_sub));
          zbee_sub.topic = mg_str(zbee_sub_topic);
          zbee_sub.qos = s_qos;
          mg_mqtt_sub(c, &zbee_sub);
          printf("[MQTT] SUBSCRIBED to '%s' (zigbee id %d)\r\n", zbee_sub_topic, ZbeeIdFromIdx(i));
        }
        if (flags & ZBEE_CL_COLOR) {
          char zbee_sub_topic[80];
          snprintf(zbee_sub_topic, sizeof(zbee_sub_topic),
                   "%s/data/%.16s/%d/0300/%04X",
                   get_rxzbtop(),
                   ZigbeeConf[i].zbee_ieee,
                   ZigbeeConf[i].zbee_endpoint,
                   ZBEE_ATTR_COLOR);
          struct mg_mqtt_opts zbee_sub;
          memset(&zbee_sub, 0, sizeof(zbee_sub));
          zbee_sub.topic = mg_str(zbee_sub_topic);
          zbee_sub.qos = s_qos;
          mg_mqtt_sub(c, &zbee_sub);
          printf("[MQTT] SUBSCRIBED to '%s' (zigbee id %d)\r\n", zbee_sub_topic, ZbeeIdFromIdx(i));
        }
        if (flags & ZBEE_CL_COVER) {
          char zbee_sub_topic[80];
          snprintf(zbee_sub_topic, sizeof(zbee_sub_topic),
                   "%s/data/%.16s/%d/0102/%04X",
                   get_rxzbtop(),
                   ZigbeeConf[i].zbee_ieee,
                   ZigbeeConf[i].zbee_endpoint,
                   ZBEE_ATTR_COVER);
          struct mg_mqtt_opts zbee_sub;
          memset(&zbee_sub, 0, sizeof(zbee_sub));
          zbee_sub.topic = mg_str(zbee_sub_topic);
          zbee_sub.qos = s_qos;
          mg_mqtt_sub(c, &zbee_sub);
          printf("[MQTT] SUBSCRIBED to '%s' (zigbee id %d)\r\n", zbee_sub_topic, ZbeeIdFromIdx(i));
        }
        if (flags & ZBEE_CL_THERMO) {
          char zbee_sub_topic[80];
          snprintf(zbee_sub_topic, sizeof(zbee_sub_topic),
                   "%s/data/%.16s/%d/0201/%04X",
                   get_rxzbtop(),
                   ZigbeeConf[i].zbee_ieee,
                   ZigbeeConf[i].zbee_endpoint,
                   ZBEE_ATTR_THERMO);
          struct mg_mqtt_opts zbee_sub;
          memset(&zbee_sub, 0, sizeof(zbee_sub));
          zbee_sub.topic = mg_str(zbee_sub_topic);
          zbee_sub.qos = s_qos;
          mg_mqtt_sub(c, &zbee_sub);
          printf("[MQTT] SUBSCRIBED to '%s' (zigbee id %d)\r\n", zbee_sub_topic, ZbeeIdFromIdx(i));
        }
        if (flags & ZBEE_CL_LOCK) {
          char zbee_sub_topic[80];
          snprintf(zbee_sub_topic, sizeof(zbee_sub_topic),
                   "%s/data/%.16s/%d/0101/%04X",
                   get_rxzbtop(),
                   ZigbeeConf[i].zbee_ieee,
                   ZigbeeConf[i].zbee_endpoint,
                   ZBEE_ATTR_LOCK);
          struct mg_mqtt_opts zbee_sub;
          memset(&zbee_sub, 0, sizeof(zbee_sub));
          zbee_sub.topic = mg_str(zbee_sub_topic);
          zbee_sub.qos = s_qos;
          mg_mqtt_sub(c, &zbee_sub);
          printf("[MQTT] SUBSCRIBED to '%s' (zigbee id %d)\r\n", zbee_sub_topic, ZbeeIdFromIdx(i));
        }

        /* Подписка на trigger топик если это кнопка (TRIGGER role) */
        {
          int is_trigger = (ZigbeeConf[i].zbee_role == ZBEE_ROLE_TRIGGER);
          // printf("[SYSTEM][BOOT] zbee[%d] ieee='%s' is_trigger=%d\r\n",
          //        i, ZigbeeConf[i].zbee_ieee, is_trigger);
          if (is_trigger) {
            char zbee_sub_topic[80];
            snprintf(zbee_sub_topic, sizeof(zbee_sub_topic),
                     "%s/trigger/%.16s",
                     get_rxzbtop(),
                     ZigbeeConf[i].zbee_ieee);
            struct mg_mqtt_opts zbee_sub;
            memset(&zbee_sub, 0, sizeof(zbee_sub));
            zbee_sub.topic = mg_str(zbee_sub_topic);
            zbee_sub.qos = s_qos;
            mg_mqtt_sub(c, &zbee_sub);
            printf("[MQTT] SUBSCRIBED to '%s' (zigbee id %d TRIGGER)\r\n", zbee_sub_topic, ZbeeIdFromIdx(i));
          }
        }
      }
    }
  } else if (ev == MG_EV_MQTT_MSG) {
    s_mqtt_last_rx_ms = (uint32_t) mg_millis(); /* любой PUBLISH от брокера = брокер жив */
    // When we get echo response, print it
    struct mg_mqtt_message *mm = (struct mg_mqtt_message *) ev_data;
    printf("[MQTT] topic='%.*s' data='%.*s'\r\n",
               (int)mm->topic.len, mm->topic.buf,
               (int)mm->data.len, mm->data.buf);
   MG_INFO(("%lu RECEIVED %.*s <- %.*s", c->id, (int) mm->data.len, mm->data.buf, (int) mm->topic.len, mm->topic.buf));
    /* Dispatch received payload to command handler (через очередь,
       чтобы не блокировать mg_mgr_poll) */
    {
      extern osMessageQueueId_t mqttRxQueueHandle;
      MqttRxMsg_t rx = {0};
      size_t tlen = mm->topic.len < sizeof(rx.topic) - 1 ? mm->topic.len : sizeof(rx.topic) - 1;
      size_t dlen = mm->data.len  < sizeof(rx.payload) - 1 ? mm->data.len : sizeof(rx.payload) - 1;
      memcpy(rx.topic,   mm->topic.buf, tlen);
      memcpy(rx.payload, mm->data.buf,  dlen);
      if (xQueueSend(mqttRxQueueHandle, &rx, 0) != pdPASS) {
        printf("[MQTT] RX queue full, message dropped!\r\n");
      }
    }
  } else if (ev == MG_EV_READ) {
    s_mqtt_last_rx_ms = (uint32_t) mg_millis(); /* любой входящий байт, вкл. PINGRESP,
                                                   который отдельно нигде не разбирается */
  } else if (ev == MG_EV_CLOSE) {
    MG_INFO(("%lu CLOSED", c->id));
    if (s_conn == c) {
      if (mqtt_connected_reported) {
        unsigned long alive_sec = (unsigned long)(mg_millis() - s_mqtt_alive_since) / 1000;
        printf("Error: MQTT disconnected (was up %lus)\r\n", alive_sec);
        mqtt_connected_reported = false;
      }
      s_conn = NULL;
    }
  }
  (void) fn_data;
}

// Timer function - recreate client connection if it is closed
//static void timer_fn_mqtt(void *arg) {
void timer_fn_mqtt(void *arg) {
  struct mg_mgr *mgr = (struct mg_mgr *) arg;

  static uint16_t s_mqtt_retry_cnt = 0;
  static uint64_t s_close_since = 0;
  static uint8_t  s_oom_backoff = 0;   /* счётчик тиков при OOM */
  static uint8_t  s_oom_delay = 5;     /* текущая задержка, растёт 5→10→15→30 */
  static bool     s_oom_reported = false;

  if (s_conn != NULL) {
    bool timed_out_connecting = (s_conn->is_connecting || !mqtt_connected_reported)
                             && (mg_millis() - s_mqtt_conn_tick > 5000);
    bool stuck_closing = (s_conn->is_closing || s_conn->is_draining);

    if (timed_out_connecting) {
      unsigned long stale_ms = (unsigned long)(mg_millis() - s_mqtt_conn_tick);
      s_mqtt_retry_cnt++;
      printf("[MQTT] stale conn  -  %s%s(%lums), retry #%u  -  force close\r\n",
             s_conn->is_connecting ? "connecting " : "!reported ",
             s_conn->is_closing    ? "closing "    : "",
             stale_ms,
             s_mqtt_retry_cnt);
      s_conn->is_closing = 1;
      s_mqtt_conn_tick = mg_millis();
      s_mqtt_reconnect_reported = false;
      s_close_since = 0;
      s_oom_reported = false;
      s_oom_backoff = 0;
      s_oom_delay = 5;
      return;
    }

    if (stuck_closing) {
      if (s_close_since == 0) {
        s_close_since = mg_millis();
        return;
      }
      if (mg_millis() - s_close_since < 10000) {
        return;
      }
      printf("[MQTT] close stuck %lums  -  force reconnect\r\n",
             (unsigned long)(mg_millis() - s_close_since));
      s_conn = NULL;
      s_close_since = 0;
    } else {
      s_close_since = 0;
    }

    /* RX-watchdog: соединение официально открыто (CONNACK получен), но от
     * брокера дольше 1.5x keepalive + 5с не пришло вообще ничего - ни PUBLISH,
     * ни PONG на наш периодический PING. Аналог MQTT 3.1.1 [MQTT-3.1.2-24],
     * симметрично mqtt_server.c: ловим "тихий" обрыв TCP (SLZB пропал без
     * FIN/RST) - на голом TCP-таймауте lwIP это могло длиться вечно. */
    if (s_conn != NULL && mqtt_connected_reported
        && !s_conn->is_closing && !s_conn->is_draining) {
      uint32_t idle  = (uint32_t) mg_millis() - s_mqtt_last_rx_ms;
      uint32_t limit = MQTT_CLIENT_KEEPALIVE_S * 1500u + 5000u;
      if (idle > limit) {
        s_mqtt_watchdog_kills++;
        printf("[MQTT] no data from broker for %lus (limit %lus), kills=%lu - "
               "assuming dead, forcing reconnect\r\n",
               (unsigned long)(idle / 1000), (unsigned long)(limit / 1000),
               (unsigned long)s_mqtt_watchdog_kills);
        s_conn->is_closing = 1;  /* следующий тик даст MG_EV_CLOSE -> быстрый реконнект */
        return;
      }
    }

    if (s_conn != NULL) {
      if (mqtt_connected_reported && !s_conn->is_closing && !s_conn->is_draining) {
        static uint64_t s_last_ping = 0;
        if (mg_millis() - s_last_ping >= MQTT_CLIENT_PING_MS) {
          s_last_ping = mg_millis();
          mg_mqtt_ping(s_conn);
        }
      }
      return;
    }
  }

  /* s_conn == NULL - создаём новое MQTT соединение */
  if (!SetSettings.check_mqtt || SetSettings.mqtt_hst[0] == '\0') return;

  /* Сеть не готова - ждём, не тратим попытки */
  {
    static bool s_netdown_reported = false;
    if (mgr->ifp == NULL || mgr->ifp->state != MG_TCPIP_STATE_READY) {
      if (!s_netdown_reported) {
        printf("[MQTT] network down (ifp state=%d) - waiting\r\n",
               mgr->ifp ? (int)mgr->ifp->state : -1);
        s_netdown_reported = true;
      }
      return;
    }
    /* Сеть восстановилась - сбрасываем флаг для следующего раза */
    s_netdown_reported = false;
  }

  /* Backoff при OOM: после первого провала ждём 5 тиков (5с), потом 10с, 20с... */
  if (s_oom_backoff > 0) {
    s_oom_backoff--;
    return;
  }

  /* TCP-level backoff: экспоненциальная задержка между попытками
     Без этого при недоступном брокере - alloc/free каждую 1с → фрагментация */
  if (s_tcp_backoff > 0) {
    s_tcp_backoff--;
    return;
  }

  /* Единый бюджет соединений: MQTT-клиент тоже соединение. Не открываем его,
   * пока идёт TLS-handshake, мало heap или заняты слоты (MQTT не заходит в
   * резерв web). Без счётчиков backoff - проверка повторится на следующем тике. */
  {
    static bool s_budget_logged = false;
    if (!net_mqtt_cli_may_connect(mgr, mg_url_is_ssl(get_mqtt_url()))) {
      if (!s_budget_logged) {
        printf("[MQTT] connect deferred: conn budget / heap=%lu\r\n",
               (unsigned long)xPortGetFreeHeapSize());
        s_budget_logged = true;
      }
      return;
    }
    s_budget_logged = false;
  }

  char url[70];
  snprintf(url, sizeof(url), "mqtt://%s:%d", SetSettings.mqtt_hst, SetSettings.mqtt_prt);

  struct mg_mqtt_opts opts;
  memset(&opts, 0, sizeof(opts));
  opts.clean = true;
  opts.qos = s_qos;
  opts.topic = mg_str(get_mqtt_topic());
  opts.version = 4;
  opts.keepalive = MQTT_CLIENT_KEEPALIVE_S;  /* было 60; см. комментарий у #define */
  opts.message = mg_str("bye");

  if (SetSettings.mqtt_clt[0] != '\0')
    opts.client_id = mg_str(SetSettings.mqtt_clt);
  if (SetSettings.mqtt_usr[0] != '\0')
    opts.user = mg_str(SetSettings.mqtt_usr);
  if (SetSettings.mqtt_pswd[0] != '\0')
    opts.pass = mg_str(SetSettings.mqtt_pswd);

  s_conn = mg_mqtt_connect(mgr, url, &opts, (mg_event_handler_t) fn_mqtt, NULL);
  s_mqtt_conn_tick = mg_millis();
  if (s_conn != NULL) {
    if (!s_mqtt_reconnect_reported) {
      printf("[MQTT] reconnecting to %s ...\r\n", url);
      s_mqtt_reconnect_reported = true;
    }
    /* Exponential backoff: 1→2→5→10→30→60с между попытками */
    s_tcp_backoff = s_backoff_tbl[s_tcp_delay_idx];
    if (s_tcp_delay_idx < BACKOFF_TBL_SZ - 1) s_tcp_delay_idx++;
    s_oom_reported = false;
    s_oom_backoff = 0;
    s_oom_delay = 5;
  } else {
    if (!s_oom_reported) {
      printf("[MQTT] connect failed (likely OOM) - heap=%lu min=%lu - retry with backoff\r\n",
             (unsigned long)xPortGetFreeHeapSize(),
             (unsigned long)xPortGetMinimumEverFreeHeapSize());
      s_oom_reported = true;
      s_oom_delay = 5;
      s_oom_backoff = 5;
    } else {
      s_oom_backoff = s_oom_delay;
      if (s_oom_delay < 30) s_oom_delay += 5;
    }
    s_mqtt_reconnect_reported = false;
  }
}


/* ═══════════════════════════════════════════════════════════════════════════
 Returns true (and sends 304) if ETag matches — caller stops.
 Returns false if data changed — caller proceeds with full chunked response. */
static bool check_etag_304(struct mg_connection *c, struct mg_http_message *hm,
                           volatile uint32_t *ver) {
    char etag[16], hdr[160];
    snprintf(etag, sizeof(etag), "\"%lu\"", (unsigned long)*ver);
    struct mg_str *inm = mg_http_get_header(hm, "If-None-Match");
    int match = (inm && mg_strcmp(*inm, mg_str(etag)) == 0) ? 1 : 0;
	// printf("[DBG] etag check: uri=%.*s ver=%lu inm=%.*s etag=%s match=%d\r\n",
	// 		(int) hm->uri.len, hm->uri.buf, (unsigned long) *ver,
	// 		inm ? (int) inm->len : 4, inm ? inm->buf : "none", etag,
	// 		inm ? (mg_strcmp(*inm, mg_str(etag)) == 0 ? 1 : 0) : 0);
    if (match) {
        snprintf(hdr, sizeof(hdr),
            "ETag: %s\r\nCache-Control: no-cache\r\n",
            etag);
        mg_http_reply(c, 304, hdr, "");
        return true;  /* 304 sent, caller stops */
    }
    return false;     /* data changed, caller sends full response */
}



/* Escape JSON-special chars in src → dst (max dst_sz). Returns dst. */
const char *json_escape_str(char *dst, const char *src, size_t dst_sz) {
    size_t j = 0;
    for (size_t i = 0; src[i] && j < dst_sz - 1; i++) {
        unsigned char c = (unsigned char)src[i];
        if (c < 0x20) {
            /* все контрольные символы 0x00–0x1F → \u00XX */
            static const char hex[] = "0123456789abcdef";
            if (j + 6 < dst_sz) {
                dst[j++] = '\\'; dst[j++] = 'u';
                dst[j++] = '0';  dst[j++] = '0';
                dst[j++] = hex[(c >> 4) & 0xF];
                dst[j++] = hex[c & 0xF];
            }
        } else if (c == '"') {
            if (j + 2 < dst_sz) { dst[j++] = '\\'; dst[j++] = '"'; }
        } else if (c == '\\') {
            if (j + 2 < dst_sz) { dst[j++] = '\\'; dst[j++] = '\\'; }
        } else {
            dst[j++] = src[i];
        }
    }
    dst[j] = '\0';
    return dst;
}

/* ============================================================
 *  CHUNK_SEND_FMT  —  динамический буфер точного размера
 *
 *  1. snprintf(NULL, 0, fmt, ...) → точный размер
 *  2. mg_calloc(size + 1)        → ровно столько, сколько нужно
 *  3. snprintf(buf, size+1, ...) → заполняем
 *  4. mg_http_printf_chunk(...)  → отправляем чанк
 *  5. mg_free(buf)               → сразу освобождаем
 *
 *  При ошибке alloc / snprintf — лог и откат first.
 * ============================================================ */
#define CHUNK_SEND_FMT(c, first_ptr, fmt, ...)                           \
    do {                                                                 \
        int _need = snprintf(NULL, 0, fmt, ##__VA_ARGS__);               \
        if (_need <= 0) break;                                           \
        char *_buf = (char *)mg_calloc(1, (size_t)_need + 1);           \
        if (_buf == NULL) {                                              \
            MG_ERROR(("CHUNK: mg_calloc(%d) failed", _need + 1));       \
            break;                                                       \
        }                                                                \
        int _written = snprintf(_buf, (size_t)_need + 1, fmt, ##__VA_ARGS__); \
        if (_written != _need) {                                         \
            MG_ERROR(("CHUNK: snprintf mismatch %d vs %d",              \
                      _written, _need));                                 \
            mg_free(_buf);                                               \
            break;                                                       \
        }                                                                \
        if (!*(first_ptr)) mg_http_printf_chunk(c, ",");                 \
        mg_http_printf_chunk(c, "%s", _buf);                             \
        mg_free(_buf);                                                   \
        *(first_ptr) = false;                                            \
    } while (0)

/* ============================================================
 *  handle_get_pins  —  /api/pins  (все типы пинов в одном ответе)
 * ============================================================ */
static void handle_get_pins(struct mg_connection *c,
                            struct mg_http_message *hm)
{
    char etag[16];
    snprintf(etag, sizeof(etag), "\"%lu\"", (unsigned long)g_ver_pins);

    struct mg_str *inm = mg_http_get_header(hm, "If-None-Match");
    if (inm && mg_strcmp(*inm, mg_str(etag)) == 0) {
        char hdr[128];
        snprintf(hdr, sizeof(hdr),
                 "ETag: %s\r\nCache-Control: no-cache\r\n", etag);
        mg_http_reply(c, 304, hdr, "");
        return;
    }

    mg_printf(c,
              "HTTP/1.1 200 OK\r\n"
              "Content-Type: application/json\r\n"
              "Transfer-Encoding: chunked\r\n"
              "ETag: %s\r\n"
              "Cache-Control: no-cache\r\n\r\n",
              etag);

    mg_http_printf_chunk(c, "[");

    bool first = true;

    for (int i = 0; i < NUMPIN; i++) {
        uint8_t t = PinsConf[i].topin;
        if (t == 0) continue;

        char esc_info[128];
        char esc_pins[16];
        json_escape_str(esc_info, PinsConf[i].info, sizeof(esc_info));
        json_escape_str(esc_pins, PinsInfo[i].pins, sizeof(esc_pins));

        switch (t) {

        case 1: { /* BUTTON */
            char esc_sc[256], esc_dc[256], esc_lp[256];
            json_escape_str(esc_sc, PinsConf[i].sclick, sizeof(esc_sc));
            json_escape_str(esc_dc, PinsConf[i].dclick, sizeof(esc_dc));
            json_escape_str(esc_lp, PinsConf[i].lpress, sizeof(esc_lp));
            CHUNK_SEND_FMT(c, &first,
                "{\"id\":%d,\"pin\":\"%s\",\"type\":\"BUTTON\","
                "\"ptype\":%d,\"onoff\":%d,"
                "\"sclick\":\"%s\",\"dclick\":\"%s\",\"lpress\":\"%s\","
                "\"info\":\"%s\"}",
                i + 1, esc_pins,
                PinsConf[i].ptype, PinsConf[i].onoff,
                esc_sc, esc_dc, esc_lp, esc_info);
            break;
        }

        case 3: /* SWITCH */
            CHUNK_SEND_FMT(c, &first,
                "{\"id\":%d,\"pin\":\"%s\",\"type\":\"SWITCH\","
                "\"ptype\":%d,\"onoff\":%d,\"info\":\"%s\"}",
                i + 1, esc_pins,
                PinsConf[i].ptype, PinsConf[i].onoff, esc_info);
            break;

        case 4: /* ONEWIRE */
            CHUNK_SEND_FMT(c, &first,
                "{\"id\":%d,\"pin\":\"%s\",\"type\":\"ONEWIRE\","
                "\"onoff\":%d,\"info\":\"%s\"}",
                i + 1, esc_pins,
                PinsConf[i].onoff, esc_info);
            break;

        case 5: /* PWM */
            CHUNK_SEND_FMT(c, &first,
                "{\"id\":%d,\"pin\":\"%s\",\"type\":\"PWM\","
                "\"dvalue\":%d,\"pwm\":%d,\"pwmmax\":%d,"
                "\"onoff\":%d,\"info\":\"%s\"}",
                i + 1, esc_pins,
                PinsConf[i].dvalue, PinsConf[i].pwm, PinsConf[i].pwmmax,
                PinsConf[i].onoff, esc_info);
            break;

        case 2: /* DEVICE */
            CHUNK_SEND_FMT(c, &first,
                "{\"id\":%d,\"pin\":\"%s\",\"type\":\"DEVICE\","
                "\"onoff\":%d,\"info\":\"%s\"}",
                i + 1, esc_pins,
                PinsConf[i].onoff, esc_info);
            break;

        case 8: /* ENCODER A (Encoder B пропускаем — его данные внутри слота A) */
            CHUNK_SEND_FMT(c, &first,
                "{\"id\":%d,\"pin\":\"%s\",\"type\":\"ENCODER\","
                "\"dvalue\":%d,\"pwm\":%d,\"pwmmax\":%d,"
                "\"ponr\":%d,\"onoff\":%d,\"info\":\"%s\"}",
                i + 1, esc_pins,
                PinsConf[i].dvalue, PinsConf[i].pwm, PinsConf[i].pwmmax,
                (int)ponr_eff_enc(i), PinsConf[i].onoff, esc_info);
            break;

        case 10: /* SECURITY */
            CHUNK_SEND_FMT(c, &first,
                "{\"id\":%d,\"pin\":\"%s\",\"type\":\"SECURITY\","
                "\"ptype\":%d,\"onoff\":%d,\"info\":\"%s\"}",
                i + 1, esc_pins,
                PinsConf[i].ptype, PinsConf[i].onoff, esc_info);
            break;

        /* I2C (6,7), Encoder B (9) и всё остальное — пропускаем */
        default:
            continue;
        }
    }

    mg_http_printf_chunk(c, "]");
    mg_http_write_chunk(c, "", 0);
    c->is_draining = 1;
}

/* ─── /api/state/button?from=ID&limit=N (Chunked, постранично) ───
 *
 * Весь ответ собирается в c->send целиком: буфер растёт кратно MG_IO_SIZE, и при
 * каждом росте Mongoose выделяет новый, копирует и только потом освобождает старый
 * (пик = старый + новый). При 89 физических и 200 Zigbee-кнопках один ответ весил
 * бы ~112 КБ, пик ~218 КБ при configTOTAL_HEAP_SIZE 192512 - не помещается.
 * Поэтому один ответ ограничен: не больше limit записей и не больше
 * BUTTON_PAGE_BYTES байт в c->send. Продолжение - поле "next" (id первой не
 * отданной записи, -1 если всё отдано), курсор по id устойчив к правкам между
 * запросами. Поле "ver" - версия всей таблицы (то же значение, что в ETag):
 * клиент сравнивает его, а не данные первой страницы.
 * Пустые поля не отдаются (sclick/dclick/lpress/info), у Zigbee нет ptype
 * (всегда 0), "pinact" и "display_id" убраны: клиент их не использует. */
#define BUTTON_GET_DEF_LIMIT   20
#define BUTTON_GET_MAX_LIMIT   40
#define BUTTON_PAGE_BYTES      4096
#define BUTTON_FRAG_SZ         272   /* ,"sclick":"<до 124 символов с экранированием>" */

/* Фрагмент ,"key":"escaped" для вставки в запись либо пустая строка, если значение пустое. */
static void json_frag_str(char *dst, size_t dst_sz, const char *key, const char *src) {
    dst[0] = '\0';
    if (src == NULL || src[0] == '\0') return;
    int n = snprintf(dst, dst_sz, ",\"%s\":\"", key);
    if (n < 0 || (size_t)n + 4 >= dst_sz) { dst[0] = '\0'; return; }
    json_escape_str(dst + n, src, dst_sz - (size_t)n - 1);
    size_t len = strlen(dst);
    dst[len] = '"';
    dst[len + 1] = '\0';
}

void handle_buttons(struct mg_connection *c, struct mg_http_message *hm) {
    char qbuf[16];
    long from = 0, limit = BUTTON_GET_DEF_LIMIT;
    if (mg_http_get_var(&hm->query, "from", qbuf, sizeof(qbuf)) > 0)
        from = mg_json_get_long(mg_str(qbuf), "$", 0);
    if (mg_http_get_var(&hm->query, "limit", qbuf, sizeof(qbuf)) > 0)
        limit = mg_json_get_long(mg_str(qbuf), "$", BUTTON_GET_DEF_LIMIT);
    if (from < 0) from = 0;
    if (limit <= 0) limit = BUTTON_GET_DEF_LIMIT;
    if (limit > BUTTON_GET_MAX_LIMIT) limit = BUTTON_GET_MAX_LIMIT;

    const unsigned long ver = (unsigned long)g_ver_button;
    const long total = (long)NUMPIN + (long)NUMZBEE;

    mg_printf(c,
              "HTTP/1.1 200 OK\r\n"
              "Content-Type: application/json\r\n"
              "Transfer-Encoding: chunked\r\n"
              "ETag: \"%lu\"\r\n"
              "Cache-Control: no-cache\r\n\r\n",
              ver);

    /* ── Заголовок JSON ── */
    mg_http_printf_chunk(c, "{\"lang\":\"%s\",\"ver\":%lu,\"buttons\":[",
                         SetSettings.lang, ver);

    char frag_sc[BUTTON_FRAG_SZ], frag_dc[BUTTON_FRAG_SZ], frag_lp[BUTTON_FRAG_SZ];
    char frag_info[96];
    char esc_pins[64];

    long emitted = 0, next = -1;

    for (long i = from; i < total; i++) {
        const bool phys = (i < (long)NUMPIN);
        int zbi = -1;

        /* Является ли слот кнопкой - до проверки лимитов, чтобы "next" указывал на реальную запись */
        if (phys) {
            if (PinsConf[i].topin != 1) continue;
        } else {
            zbi = (int)(i - (long)NUMPIN);
            if (ZigbeeConf[zbi].zbee_role != ZBEE_ROLE_TRIGGER) continue;
            if (ZigbeeConf[zbi].zbee_ieee[0] == '\0') continue;
        }

        /* Лимит записей либо байт в буфере отправки: продолжение со следующего запроса.
           Хотя бы одна запись на страницу отдаётся всегда - прогресс гарантирован. */
        if (emitted >= limit || (emitted > 0 && c->send.len >= BUTTON_PAGE_BYTES)) {
            next = i;
            break;
        }

        if (phys) {
            json_frag_str(frag_sc, sizeof(frag_sc), "sclick", PinsConf[i].sclick);
            json_frag_str(frag_dc, sizeof(frag_dc), "dclick", PinsConf[i].dclick);
            json_frag_str(frag_lp, sizeof(frag_lp), "lpress", PinsConf[i].lpress);
            json_frag_str(frag_info, sizeof(frag_info), "info", PinsConf[i].info);
            json_escape_str(esc_pins, PinsInfo[i].pins, sizeof(esc_pins));

            mg_http_printf_chunk(c,
                "%s{\"topin\":1,\"id\":%ld,\"pins\":\"%s\",\"ptype\":%d%s%s%s%s,\"onoff\":%d}",
                emitted ? "," : "", i + 1, esc_pins, PinsConf[i].ptype,
                frag_sc, frag_dc, frag_lp, frag_info, PinsConf[i].onoff);
        } else {
            json_frag_str(frag_sc, sizeof(frag_sc), "sclick", zbee_action_sclick(zbi));
            json_frag_str(frag_dc, sizeof(frag_dc), "dclick", zbee_action_dclick(zbi));
            json_frag_str(frag_lp, sizeof(frag_lp), "lpress", zbee_action_lpress(zbi));
            json_frag_str(frag_info, sizeof(frag_info), "info", ZigbeeConf[zbi].zbee_label);

            if (ZigbeeConf[zbi].ep > 0) {
                snprintf(esc_pins, sizeof(esc_pins), "EP%d", ZigbeeConf[zbi].ep);
            } else if (ZigbeeConf[zbi].pt_single[0] != '\0') {
                json_escape_str(esc_pins, ZigbeeConf[zbi].pt_single, sizeof(esc_pins));
            } else {
                snprintf(esc_pins, sizeof(esc_pins), "ZB_%.16s", ZigbeeConf[zbi].zbee_ieee);
            }

            mg_http_printf_chunk(c,
                "%s{\"topin\":1,\"id\":%ld,\"pins\":\"%s\"%s%s%s%s,\"onoff\":%d,"
                "\"is_zigbee\":1,\"vbtn_mode\":%d}",
                emitted ? "," : "", i + 1, esc_pins,
                frag_sc, frag_dc, frag_lp, frag_info,
                ZigbeeConf[zbi].onoff, ZigbeeConf[zbi].vbtn_mode);
        }
        emitted++;
    }

    /* ── Закрываем JSON ── */
    mg_http_printf_chunk(c, "],\"next\":%ld}", next);
    mg_http_write_chunk(c, "", 0);
    /* НЕТ c->is_draining = 1 — соединение остаётся живым (опрос идёт по keep-alive,
       без нового TCP/TLS-рукопожатия на каждый полный ответ). */

    MG_DEBUG(("%lu buttons: from=%ld n=%ld next=%ld ver=%lu send=%lu heap=%lu min=%lu",
              c->id, from, emitted, next, ver, (unsigned long)c->send.len,
              (unsigned long)xPortGetFreeHeapSize(),
              (unsigned long)xPortGetMinimumEverFreeHeapSize()));
}

/* ─── Вспомогательная: сборка pinact JSON из PinsLinks[] ─── */
static int build_pinact_json(char *buf, size_t bufsize, int for_id) {
    size_t p = 0;
    if (bufsize < 3) { if (bufsize) buf[0] = '\0'; return 0; }
    buf[p++] = '{';
    bool pa_first = true;

    for (int k = 0; k < NUMPINLINKS; k++) {
        if (PinsLinks[k].idin == 0 && PinsLinks[k].idout == 0) continue;
        if (PinsLinks[k].idin != for_id) continue;
        if (bufsize - p < 48) break;

        char name[32];
        int target = PinsLinks[k].idout;
        if (IsPinId(target)) {
            json_escape_str(name, PinsInfo[target - 1].pins, sizeof(name));
        } else {
            int zbi = ZbeeIdx(target);
            if (IsZigbeePin(target)) {
                json_escape_str(name,
                    ZigbeeConf[zbi].zbee_label[0] ? ZigbeeConf[zbi].zbee_label : "Zigbee",
                    sizeof(name));
            } else {
                snprintf(name, sizeof(name), "?");
            }
        }

        int written = snprintf(buf + p, bufsize - p, "%s\"%d\":\"%s\"",
                                pa_first ? "" : ",", target, name);
        if (written < 0 || (size_t)written >= bufsize - p) break;
        p += (size_t)written;
        pa_first = false;
    }

    if (p < bufsize - 2) { buf[p++] = '}'; buf[p] = '\0'; }
    return (int)p;
}

/* ─── /api/state/switch (Keep-Alive polling) ─── */
void handle_switches(struct mg_connection *c) {

    int pos = 0;

    /* ── Заголовок JSON ── */
    pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
        "{\"lang\":\"%s\",\"switches\":[", SetSettings.lang);

    bool first = true;

    /* ── Физические пины с topin == 3 ── */
    for (int i = 0; i < NUMPIN; i++) {
        if (PinsConf[i].topin != 3) continue;

        int remaining = (int)G_BODY_SIZE - pos;
        if (remaining < 450) {
            MG_ERROR(("switches: OVERFLOW at pin %d, pos=%d remaining=%d",
                      PinIdFromIdx(i), pos, remaining));
            break;
        }

        char esc_info[64];
        char esc_pins[16];
        json_escape_str(esc_info, PinsConf[i].info, sizeof(esc_info));
        json_escape_str(esc_pins, PinsInfo[i].pins, sizeof(esc_pins));

        char pinact_buf[256];
        build_pinact_json(pinact_buf, sizeof(pinact_buf), i + 1);

        pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
            "%s{\"topin\":%d,\"id\":%d,\"pins\":\"%s\",\"ptype\":%d,"
            "\"pinact\":%s,\"info\":\"%s\",\"onoff\":%d}",
            first ? "" : ",",
            PinsConf[i].topin, i + 1, esc_pins,
            PinsConf[i].ptype, pinact_buf, esc_info, PinsConf[i].onoff);

        first = false;
    }

    /* ── Zigbee выключатели (zbee_role == ZBEE_ROLE_SWITCH) ── */
    for (int i = 0; i < NUMZBEE; i++) {
        if (ZigbeeConf[i].zbee_role != ZBEE_ROLE_SWITCH) continue;

        int remaining = (int)G_BODY_SIZE - pos;
        if (remaining < 450) {
            MG_ERROR(("switches: OVERFLOW at zigbee %d, pos=%d remaining=%d",
                      ZbeeIdFromIdx(i), pos, remaining));
            break;
        }

        char esc_info[64];
        json_escape_str(esc_info, ZigbeeConf[i].info, sizeof(esc_info));

        /* Новый логический ID Zigbee: 90..289 */
        int zigbee_id = ZbeeIdFromIdx(i);

        /* Payload: если vbtn_mode == PASSTHROUGH и pt_single задан, используем его */
        char esc_pins[64];
        if (ZigbeeConf[i].vbtn_mode == VBTN_MODE_PASSTHROUGH &&
            ZigbeeConf[i].pt_single[0] != '\0') {
            json_escape_str(esc_pins, ZigbeeConf[i].pt_single, sizeof(esc_pins));
        } else {
            snprintf(esc_pins, sizeof(esc_pins), "ZB_%.16s", ZigbeeConf[i].zbee_ieee);
        }

        char pinact_buf[256];
        build_pinact_json(pinact_buf, sizeof(pinact_buf), zigbee_id);

        pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
            "%s{\"topin\":11,\"id\":%d,\"pins\":\"%s\",\"ptype\":0,"
            "\"pinact\":%s,\"info\":\"%s\",\"onoff\":%d}",
            first ? "" : ",",
            zigbee_id, esc_pins, pinact_buf, esc_info, ZigbeeConf[i].onoff);

        first = false;
    }

    /* ── Закрываем JSON ──
     * Массив pintopin больше не встраивается в state-ответы:
     * при NUMPINLINKS=1024 (~45 Б/запись) он не помещается в g_body.
     * Полный список отдаёт отдельный стриминговый /api/pintopin/get,
     * который фронтенд и так опрашивает первоисточником (TabSwitch/TabButton/TabEncoder). */
    pos += snprintf(g_body + pos, G_BODY_SIZE - pos, "]}");

    /* ── Лог для контроля ── */
    MG_DEBUG(("switches: len=%d buf=%d", pos, (int)G_BODY_SIZE));

    /* ── Ответ с Content-Length → Keep-Alive работает ── */
    char extra[128];
    snprintf(extra, sizeof(extra), "%sETag: \"%lu\"\r\n",
             s_json_header, (unsigned long)g_ver_switch);

    mg_http_reply(c, 200, extra, "%s", g_body);
    /* НЕТ c->is_draining = 1 — соединение остаётся живым! */
}

#define SWITCH_PAGE_DEF_LIMIT 10
#define SWITCH_PAGE_MAX_LIMIT 20

static void handle_switches_page(struct mg_connection *c, long from, long limit) {
    if (from < 0) from = 0;
    if (limit <= 0) limit = SWITCH_PAGE_DEF_LIMIT;
    if (limit > SWITCH_PAGE_MAX_LIMIT) limit = SWITCH_PAGE_MAX_LIMIT;

    mg_printf(c, "HTTP/1.1 200 OK\r\n"
                 "Content-Type: application/json\r\n"
                 "Transfer-Encoding: chunked\r\n"
                 "Cache-Control: no-cache\r\n"
                 "ETag: \"%lu\"\r\n"
                 "\r\n", (unsigned long)g_ver_switch);
    mg_http_printf_chunk(c, "{\"lang\":\"%s\",\"ver\":%lu,\"switches\":[",
                         SetSettings.lang, (unsigned long)g_ver_switch);

    const long total = (long)NUMPIN + (long)NUMZBEE;
    long emitted = 0, next = -1;
    bool first = true;

    for (long id = from; id < total; id++) {
        char esc_info[64];
        char esc_pins[64];
        char pinact_buf[256];
        char rec[512];
        int n;

        if (id < (long)NUMPIN) {
            if (PinsConf[id].topin != 3) continue;
            if (emitted >= limit) { next = id; break; }

            json_escape_str(esc_info, PinsConf[id].info, sizeof(esc_info));
            json_escape_str(esc_pins, PinsInfo[id].pins, sizeof(esc_pins));
            build_pinact_json(pinact_buf, sizeof(pinact_buf), (int)id + 1);
            n = snprintf(rec, sizeof(rec),
                "%s{\"topin\":%d,\"id\":%ld,\"pins\":\"%s\",\"ptype\":%d,"
                "\"pinact\":%s,\"info\":\"%s\",\"onoff\":%d}",
                first ? "" : ",",
                PinsConf[id].topin, id + 1, esc_pins,
                PinsConf[id].ptype, pinact_buf, esc_info, PinsConf[id].onoff);
        } else {
            long zi = id - (long)NUMPIN;
            if (ZigbeeConf[zi].zbee_role != ZBEE_ROLE_SWITCH) continue;
            if (emitted >= limit) { next = id; break; }

            json_escape_str(esc_info, ZigbeeConf[zi].info, sizeof(esc_info));
            if (ZigbeeConf[zi].vbtn_mode == VBTN_MODE_PASSTHROUGH &&
                ZigbeeConf[zi].pt_single[0] != '\0') {
                json_escape_str(esc_pins, ZigbeeConf[zi].pt_single, sizeof(esc_pins));
            } else {
                snprintf(esc_pins, sizeof(esc_pins), "ZB_%.16s", ZigbeeConf[zi].zbee_ieee);
            }
            int zigbee_id = ZbeeIdFromIdx((int)zi);
            build_pinact_json(pinact_buf, sizeof(pinact_buf), zigbee_id);
            n = snprintf(rec, sizeof(rec),
                "%s{\"topin\":11,\"id\":%d,\"pins\":\"%s\",\"ptype\":0,"
                "\"pinact\":%s,\"info\":\"%s\",\"onoff\":%d}",
                first ? "" : ",",
                zigbee_id, esc_pins, pinact_buf, esc_info, ZigbeeConf[zi].onoff);
        }

        if (n > 0 && (size_t)n < sizeof(rec)) {
            mg_http_write_chunk(c, rec, (size_t)n);
            first = false;
            emitted++;
        }
    }

    mg_http_printf_chunk(c, "],\"next\":%ld}", next);
    mg_http_write_chunk(c, "", 0);
}

static void handle_switches_req(struct mg_connection *c, struct mg_http_message *hm) {
    char buf[16];
    if (mg_http_get_var(&hm->query, "limit", buf, sizeof(buf)) > 0) {
        long limit = mg_json_get_long(mg_str(buf), "$", SWITCH_PAGE_DEF_LIMIT);
        long from = 0;
        if (mg_http_get_var(&hm->query, "from", buf, sizeof(buf)) > 0)
            from = mg_json_get_long(mg_str(buf), "$", 0);
        handle_switches_page(c, from, limit);
    } else {
        handle_switches(c);
    }
}

/* ─── /api/state/encoder (Keep-Alive polling) ───
 * Постраничная выдача: ?from=<курсор>. Курсор 0..NUMPIN-1 - строки энкодеров
 * (по номеру пина), NUMPIN..2*NUMPIN-1 - строки PWM без энкодера. Страница
 * заканчивается, когда в g_body уже больше ENC_PAGE_BUDGET байт; в конце JSON
 * поле "next" - курсор следующей страницы или -1, если всё отдано.
 * Страница не больше ~5.6 КБ (строка не длиннее ~0.55 КБ), поэтому буфер
 * c->send растёт не выше 6 КБ и пик кучи при росте (prev + new, шаг MG_IO_SIZE)
 * не выше 10 КБ, а не около 55 КБ для полного ответа в худшем случае.
 * hm == NULL (/api/encoder/get) - прежнее поведение, один ответ целиком. */
#define ENC_PAGE_BUDGET 4800
void handle_encoders(struct mg_connection *c, struct mg_http_message *hm) {

    int pos = 0;
    int cursor = 0;
    int next = -1;
    bool paged = (hm != NULL);
    /* Версия берётся в начале сборки: если данные изменятся во время сборки,
     * клиент получит старый ETag и перезапросит (безопасная сторона). */
    uint32_t ver = g_ver_encoder;

    if (paged) {
        char vb[12];
        if (mg_http_get_var(&hm->query, "from", vb, sizeof(vb)) > 0) {
            long v = mg_json_get_long(mg_str(vb), "$", 0);
            if (v > 0) cursor = (v < 2L * NUMPIN) ? (int)v : 2 * NUMPIN;
        }
    }

    /* ── Заголовок JSON ── */
    pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
        "{\"lang\":\"%s\",\"ver\":%lu,\"encoders\":[", SetSettings.lang, (unsigned long)ver);

    bool first = true;

    /* ── Массив encoders ── */
    for (int i = (cursor < NUMPIN ? cursor : NUMPIN); i < NUMPIN; i++) {
        if (PinsConf[i].topin != 8) continue;
        /* Страница полна: эта строка ещё НЕ записана, продолжение начнётся с неё */
        if (paged && pos > ENC_PAGE_BUDGET) { next = i; break; }

        /* ── Encoder B pin ── */
        uint8_t encoderb_id = PinsConf[i].encoderb;
        if (encoderb_id < 1 || encoderb_id > NUMPIN) encoderb_id = 255;
        const char *encb_pin = (encoderb_id != 255)
            ? PinsInfo[encoderb_id - 1].pins : "";

        /* ── PWM параметры + pinact через PinsLinks — один проход ──
         * dvalue берётся от совпадения с наибольшим idout (как в старом
         * двойном цикле), pinact собирается за один проход без O(N²). */
        int pwm_dvalue = 0, pwm_freq = 0, pwm_max = 0;
        int pwm_pol = 0;   /* CH Polarity связанного PWM (PWMF_INVERT) */
        int best_out = -1;
        int enc_cond = 0;          /* условие на связи энкодера (первая связь с PWM) */
        bool cond_set = false;
        char pinact[256];
        int pa_off   = 0;
        int pa_first = 1;
        for (int k = 0; k < NUMPINLINKS; k++) {
            if (PinsLinks[k].idin != (short)(i + 1)) continue;
            int out_id = PinsLinks[k].idout;
            if (out_id < 1 || out_id > NUMPIN) continue;
            int out_idx = out_id - 1;
            if (PinsConf[out_idx].topin != 5) continue;
            if (!cond_set) { enc_cond = PinsLinks[k].cond; cond_set = true; }
            if (out_id > best_out) {
                best_out   = out_id;
                pwm_dvalue = PinsConf[out_idx].dvalue;
                pwm_freq   = PinsConf[out_idx].pwm;
                pwm_max    = PinsConf[out_idx].pwmmax;
                pwm_pol    = (PinsConf[out_idx].pwm_flags & PWMF_INVERT) ? 1 : 0;
            }
            if (PinsLinks[k].pins[0] != '\0') {
                pa_off += snprintf(pinact + pa_off, sizeof(pinact) - pa_off,
                    "%s\"%s\":%d",
                    pa_first ? "" : ",",
                    PinsLinks[k].pins, out_id);
                if (pa_off >= (int)sizeof(pinact)) pa_off = (int)sizeof(pinact) - 1;
                pa_first = 0;
            }
        }
        pinact[pa_off] = '\0';

        char esc_info[64];
        char esc_pins[16];
        char esc_encb[16];
        char ce_raw[COND_LEN];
        char ce_expr[2 * COND_LEN + 8];
        json_escape_str(esc_info, PinsConf[i].info, sizeof(esc_info));
        json_escape_str(esc_pins, PinsInfo[i].pins, sizeof(esc_pins));
        json_escape_str(esc_encb, encb_pin, sizeof(esc_encb));
        cond_text_copy(enc_cond, ce_raw, sizeof(ce_raw));
        json_escape_str(ce_expr, ce_raw, sizeof(ce_expr));

        /* ── Проверка остатка буфера перед записью слота ── */
        int remaining = (int)G_BODY_SIZE - pos;
        if (remaining < 700) {  // 700 — максимум одного encoder-слота (pinact 256 + cexpr 102 + поля)
            MG_ERROR(("encoders: OVERFLOW at pin %d, pos=%d remaining=%d",
                      PinIdFromIdx(i), pos, remaining));
            if (paged) next = i;
            break;
        }

        pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
            "%s{\"topin\":%d,\"id\":%d,\"pins\":\"%s\","
            "\"encoderb\":%d,\"encdrbpin\":\"%s\","
            "\"dvalue\":%d,\"pwm\":%d,\"pwmmax\":%d,\"ponr\":%d,"
            "\"pinact\":{%s},\"info\":\"%s\",\"onoff\":%d,"
        	"\"zbee_bind\":%d,\"cond\":%d,\"cexpr\":\"%s\",\"pol\":%d}",
            first ? "" : ",",
            PinsConf[i].topin, i + 1, esc_pins,
            encoderb_id, esc_encb,
            pwm_dvalue, pwm_freq, pwm_max,
            (int)ponr_eff_enc(i),
            pinact, esc_info, PinsConf[i].onoff,
			PinsConf[i].zbee_bind_id, enc_cond, ce_expr, pwm_pol);

        first = false;
    }

    /* ── Строки PWM без энкодера (kind:"pwm") ──
     * PWM-пины (topin == 5), на которые не ссылается ни один Encoder A.
     * Без них PWM пользователя без пинов A/B (Zigbee, API, MQTT, cron, PID)
     * негде настроить. Связи просматриваем один раз (без O(N^2)). */
    uint8_t enc_linked[NUMPIN];
    memset(enc_linked, 0, sizeof(enc_linked));
    for (int k = 0; k < NUMPINLINKS; k++) {
        int in_id = PinsLinks[k].idin;
        int out_id = PinsLinks[k].idout;
        if (!IsPinId(in_id) || !IsPinId(out_id)) continue;
        if (PinsConf[in_id - 1].topin == 8) enc_linked[out_id - 1] = 1;
    }
    for (int i = (cursor > NUMPIN ? cursor - NUMPIN : 0); next < 0 && i < NUMPIN; i++) {
        if (PinsConf[i].topin != 5 || enc_linked[i]) continue;
        /* Страница полна: эта строка ещё НЕ записана, продолжение начнётся с неё */
        if (paged && pos > ENC_PAGE_BUDGET) { next = NUMPIN + i; break; }

        int remaining = (int)G_BODY_SIZE - pos;
        if (remaining < 700) {
            MG_ERROR(("encoders: OVERFLOW (pwm rows) at pin %d, pos=%d remaining=%d",
                      PinIdFromIdx(i), pos, remaining));
            if (paged) next = NUMPIN + i;
            break;
        }

        bool by_pid = pwm_owned_by_pid((uint8_t)i);
        bool locked = is_pin_in_autotune((uint8_t)i);
        /* Для старых PWM (бит рубильника не стоял) onoff исторически не
         * использовался: показываем "включено", чтобы первый Save не погасил их. */
        int onoff_eff = (PinsConf[i].pwm_flags & PWMF_SWITCH) ? PinsConf[i].onoff : 1;

        char esc_info[64];
        char esc_pins[16];
        json_escape_str(esc_info, PinsConf[i].info, sizeof(esc_info));
        json_escape_str(esc_pins, PinsInfo[i].pins, sizeof(esc_pins));

        pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
            "%s{\"kind\":\"pwm\",\"topin\":5,\"id\":%d,\"pins\":\"%s\","
            "\"encoderb\":255,\"encdrbpin\":\"\","
            "\"dvalue\":%d,\"pwm\":%d,\"pwmmax\":%d,\"ponr\":%d,"
            "\"pinact\":{},\"info\":\"%s\",\"onoff\":%d,"
            "\"zbee_bind\":%d,\"cond\":0,\"cexpr\":\"\","
            "\"pol\":%d,\"owner\":\"%s\",\"locked\":%d}",
            first ? "" : ",", i + 1, esc_pins,
            PinsConf[i].dvalue, PinsConf[i].pwm, PinsConf[i].pwmmax,
            (int)ponr_eff_pin(i), esc_info, onoff_eff,
            PinsConf[i].zbee_bind_id,
            (PinsConf[i].pwm_flags & PWMF_INVERT) ? 1 : 0,
            by_pid ? "pid" : "", locked ? 1 : 0);
        first = false;
    }

    /* ── Закрываем JSON ──
     * Массив pintopin больше не встраивается (см. комментарий в handle_switches) —
     * полный список отдаёт /api/pintopin/get. */
    pos += snprintf(g_body + pos, G_BODY_SIZE - pos, "],\"next\":%d}", next);

    /* ── Лог для контроля ── */
    MG_DEBUG(("encoders: len=%d buf=%d next=%d", pos, (int)G_BODY_SIZE, next));

    /* ── Ответ с Content-Length → Keep-Alive работает ── */
    char extra[128];
    snprintf(extra, sizeof(extra), "%sETag: \"%lu\"\r\n",
             s_json_header, (unsigned long)ver);

    mg_http_reply(c, 200, extra, "%s", g_body);
    /* НЕТ c->is_draining = 1 — соединение остаётся живым! */
}

/* ─── /api/state/pid (Keep-Alive polling) ─── */

/* Постраничная выдача: страница заканчивается, когда добавление следующего слота
   вышло бы за PID_PAGE_BYTES (мягкий лимит; хотя бы один слот на страницу отдаётся всегда)
   или набралось limit слотов. Худший слот ~380 байт, т.е. страница вмещает 7-8 слотов. */
#define PID_PAGE_BYTES   3000
#define PID_SLOT_MAX     448

/* Один раз резервируем место в c->send. Иначе Mongoose растит буфер шагами по MG_IO_SIZE,
   на каждом шаге выделяя новый буфер, копируя и освобождая старый: пик кучи = старый + новый.
   Условие size < need обязательно: mg_iobuf_resize умеет и уменьшать буфер. */
static bool net_reserve_send(struct mg_connection *c, size_t extra) {
    size_t need = c->send.len + extra + 2;
    if (c->send.size >= need) return true;
    return mg_iobuf_resize(&c->send, need);
}

/* Слот, в котором нечего показывать (ни пина, ни датчика, ни имени, ни условия). */
static bool pid_slot_is_empty(const dbPidConf *p) {
    return p->pwm_pin_id == 0 && p->selsens == PID_SENS_NONE && p->sensor_pin_id == 0 &&
           p->sernum[0] == '\0' && p->info[0] == '\0' && p->onoff == 0 &&
           p->cond == 0 && p->preset == 0 && p->tune_state == PID_TUNE_IDLE &&
           p->tmpset == 0.0f;
}

/* Форматирует один слот в out. Пустой слот - компактно: {"id":N}. Возвращает длину или 0. */
static int pid_format_slot(char *out, size_t sz, int i, bool first) {
    const char *sep = first ? "" : ",";

    if (pid_slot_is_empty(&PidConf[i])) {
        int n = snprintf(out, sz, "%s{\"id\":%d}", sep, i + 1);
        return (n > 0 && (size_t)n < sz) ? n : 0;
    }

    const char *pin_name = "";
    uint16_t pin_id = PidConf[i].pwm_pin_id;
    int duty = 0;

    if (pin_id >= 1 && pin_id <= NUMPIN) {
        pin_name = PinsInfo[pin_id - 1].pins;
        duty     = PinsConf[pin_id - 1].dvalue;
    }

    char esc_info[64];
    char esc_pname[16];
    char ce_raw[COND_LEN];
    char ce_expr[2 * COND_LEN + 8];
    json_escape_str(esc_info, PidConf[i].info, sizeof(esc_info));
    json_escape_str(esc_pname, pin_name, sizeof(esc_pname));
    cond_text_copy(PidConf[i].cond, ce_raw, sizeof(ce_raw));
    json_escape_str(ce_expr, ce_raw, sizeof(ce_expr));

    char s_ts[16]; fmt_float(s_ts, sizeof(s_ts), PidConf[i].tmpset, 1);
    char s_tc[16]; fmt_float(s_tc, sizeof(s_tc), PidConf[i].tmpcur, 1);

    /* Выбранный датчик: ID/имя пина и признак наличия валидной температуры */
    uint16_t sp_id = PidConf[i].sensor_pin_id;
    const char *sp_name = (PidConf[i].selsens != PID_SENS_NONE &&
                           sp_id >= 1 && sp_id <= NUMPIN)
                          ? PinsInfo[sp_id - 1].pins : "";
    char esc_spname[16];
    json_escape_str(esc_spname, sp_name, sizeof(esc_spname));
    int tmpok = (PidConf[i].selsens != PID_SENS_NONE &&
                 PidConf[i].stale_cnt == 0) ? 1 : 0;

    /* pinact: пустой объект, если PWM-пин не привязан (иначе UI покажет "(0)") */
    char pinact[40];
    if (pin_id >= 1 && pin_id <= NUMPIN) {
        snprintf(pinact, sizeof(pinact), "\"%s\":%d", esc_pname, pin_id);
    } else {
        pinact[0] = '\0';
    }

    /* selsens: "0" = NONE, "1" = DS18B20, "2" = DHT22 */
    const char *s_sens =
        (PidConf[i].selsens == 1) ? "1" :
        (PidConf[i].selsens == 2) ? "2" : "0";

    int n = snprintf(out, sz,
        "%s{\"id\":%d,\"pins\":\"%s\",\"pinact\":{%s},"
        "\"selsens\":\"%s\",\"sernum\":\"%s\",\"presets\":\"%u\","
        "\"tmpset\":\"%s\",\"tmpcur\":\"%s\","
        "\"duty\":%d,\"info\":\"%s\",\"onoff\":%d,"
        "\"tune_state\":%u,\"tune_progress\":%u,"
        "\"sensor_pin_id\":%d,\"sensor_pin\":\"%s\",\"tmpok\":%d,"
        "\"cond\":%d,\"cexpr\":\"%s\"}",
        sep,
        i + 1, esc_pname,
        pinact,
        s_sens,
        PidConf[i].sernum,
        PidConf[i].preset,
        s_ts, s_tc,
        duty,
        esc_info,
        PidConf[i].onoff,
        PidConf[i].tune_state, PidConf[i].tune_progress,
        (int)sp_id, esc_spname, tmpok,
        (int)PidConf[i].cond, ce_expr);
    return (n > 0 && (size_t)n < sz) ? n : 0;
}

/* Собирает JSON страницы слотов [from, ...) в buf. Возвращает длину.
   paged=false (параметра limit нет): все слоты одним ответом, как раньше.
   В конце "next": индекс первого неотданного слота или -1, если всё отдано. */
static int pid_build_body(char *buf, int bufsz, int from, int limit, bool paged,
                          unsigned long ver) {
    int pos = snprintf(buf, bufsz,
        "{\"lang\":\"%s\",\"pidline\":%d,\"ver\":%lu,\"from\":%d,\"pid\":[",
        SetSettings.lang, SetSettings.pidline, ver, from);

    char slot[PID_SLOT_MAX];
    int emitted = 0;
    int next = -1;

    for (int i = from; i < PID_MAX_SLOTS; i++) {
        if (paged && emitted >= limit) { next = i; break; }

        int n = pid_format_slot(slot, sizeof(slot), i, emitted == 0);
        if (n <= 0) continue;

        if (paged && emitted > 0 && (pos + n) > PID_PAGE_BYTES) { next = i; break; }

        /* Защита от переполнения g_body: вместо тихой обрезки отдаём "next" с продолжением. */
        if (bufsz - pos < n + 32) { next = i; break; }

        memcpy(buf + pos, slot, (size_t)n);
        pos += n;
        emitted++;
    }

    pos += snprintf(buf + pos, bufsz - pos, "],\"next\":%d}", next);
    return pos;
}

static void handle_pid(struct mg_connection *c, struct mg_http_message *hm) {
    char qv[16];
    int from = 0, limit = PID_MAX_SLOTS;
    bool paged = false;

    if (hm != NULL) {
        if (mg_http_get_var(&hm->query, "from", qv, sizeof(qv)) > 0) from = atoi(qv);
        if (mg_http_get_var(&hm->query, "limit", qv, sizeof(qv)) > 0) { limit = atoi(qv); paged = true; }
    }
    if (from < 0) from = 0;
    if (from > PID_MAX_SLOTS) from = PID_MAX_SLOTS;
    if (limit < 1) limit = 1;
    if (limit > PID_MAX_SLOTS) limit = PID_MAX_SLOTS;

    unsigned long ver = (unsigned long)g_ver_pid;
    int pos = pid_build_body(g_body, (int)G_BODY_SIZE, from, limit, paged, ver);

    MG_DEBUG(("pid: from=%d limit=%d len=%d buf=%d heap_free=%lu heap_min=%lu",
              from, limit, pos, (int)G_BODY_SIZE,
              (unsigned long)xPortGetFreeHeapSize(),
              (unsigned long)xPortGetMinimumEverFreeHeapSize()));

    char extra[160];
    snprintf(extra, sizeof(extra), "%sETag: \"%lu\"\r\n", s_json_header, ver);

    /* Статус-строка + заголовки + Content-Length: резерв 96 байт с запасом. */
    if (!net_reserve_send(c, (size_t)pos + strlen(extra) + 96)) {
        MG_ERROR(("pid: no memory for %d bytes", pos));
        mg_http_reply(c, 503, "Connection: close\r\nContent-Type: application/json\r\n",
                      "{\"error\":\"low memory\"}");
        c->is_draining = 1;
        return;
    }

    mg_http_reply(c, 200, extra, "%s", g_body);
    /* НЕТ c->is_draining = 1 - соединение остаётся живым! */
}

/* ─── /api/state/security (Keep-Alive polling) ───
 * Строки таблицы: физические пины с topin==10 и Zigbee-PIR.
 * Внутренний курсор from/next — сквозной 0-based: 0..NUMPIN-1 индексируют
 * PinsConf[], NUMPIN..NUMPIN+NUMZBEE-1 — ZigbeeConf[]. В JSON отдаётся
 * логический ID: физический i+1, Zigbee ZBEE_ID_BASE+z. Параметры запроса:
 *   from  - сквозной id, с которого искать строки (по умолчанию 0)
 *   limit - максимум строк в ответе (1..SEC_PAGE_MAX_LIMIT). Без limit число
 *           строк не режется (как раньше), ответ ограничен только размером
 *           g_body; при его нехватке отдаётся "next" вместо молчаливой обрезки.
 * В конце JSON: "next" - id для продолжения или -1, если всё отдано.
 * "ver" в заголовке JSON - версия таблицы (g_ver_security, совпадает с ETag). */
#define SEC_PAGE_DEF_LIMIT  20
#define SEC_PAGE_MAX_LIMIT  40
#define SEC_ACTION_ESC      256   /* sclick[125]: с запасом на экранирование */
#define SEC_REC_RESERVE     400   /* максимум одной записи + хвост JSON */

static bool sec_row_present(long i) {
    if (i < (long)NUMPIN) return PinsConf[i].topin == 10;
    int z = (int)(i - (long)NUMPIN);
    return ZigbeeConf[z].zbee_ieee[0] != '\0' && zbee_is_pir(&ZigbeeConf[z]);
}

static void handle_security(struct mg_connection *c, struct mg_http_message *hm) {

    int pos = 0;
    char qb[16];
    long from = 0, limit = 0;
    bool paged = false;

    if (mg_http_get_var(&hm->query, "from", qb, sizeof(qb)) > 0)
        from = mg_json_get_long(mg_str(qb), "$", 0);
    if (mg_http_get_var(&hm->query, "limit", qb, sizeof(qb)) > 0) {
        limit = mg_json_get_long(mg_str(qb), "$", SEC_PAGE_DEF_LIMIT);
        paged = true;
        if (limit <= 0) limit = SEC_PAGE_DEF_LIMIT;
        if (limit > SEC_PAGE_MAX_LIMIT) limit = SEC_PAGE_MAX_LIMIT;
    }
    if (from < 0) from = 0;

    /* ── Заголовок JSON ── */
    char esc_info[64];
    json_escape_str(esc_info, PinsConf[1].info, sizeof(esc_info));

    pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
        "{\"lang\":\"%s\",\"sim800l\":%d,\"tel\":\"%s\","
        "\"info\":\"%s\",\"onoff\":%d,\"ver\":%lu,\"pins\":[",
        SetSettings.lang, SetSettings.sim800l, SetSettings.tel,
        esc_info, PinsConf[1].onoff, (unsigned long)g_ver_security);

    const long total = (long)NUMPIN + (long)NUMZBEE;
    long emitted = 0, next = -1;
    bool first = true;

    /* ── Security pins и Zigbee-PIR одним проходом по сквозному id ── */
    for (long i = from; i < total; i++) {
        if (!sec_row_present(i)) continue;

        if (paged && emitted >= limit) { next = i; break; }

        int remaining = (int)G_BODY_SIZE - pos;
        if (remaining < SEC_REC_RESERVE) {
            long log_id = (i < (long)NUMPIN) ? i + 1
                                             : ZbeeIdFromIdx((int)(i - (long)NUMPIN));
            MG_ERROR(("security: buffer full at id %ld, pos=%d remaining=%d",
                      log_id, pos, remaining));
            next = i;   /* клиент продолжит с этого id, а не потеряет хвост */
            break;
        }

        char esc_action[SEC_ACTION_ESC], esc_sms[16], esc_row_info[64];

        if (i < (long)NUMPIN) {
            const char *action   = PinsConf[i].sclick[0]   ? PinsConf[i].sclick   : "None";
            const char *send_sms = PinsConf[i].send_sms[0] ? PinsConf[i].send_sms : "NO";
            char esc_pins2[16];
            json_escape_str(esc_row_info, PinsConf[i].info, sizeof(esc_row_info));
            json_escape_str(esc_pins2, PinsInfo[i].pins, sizeof(esc_pins2));
            json_escape_str(esc_action, action, sizeof(esc_action));
            json_escape_str(esc_sms, send_sms, sizeof(esc_sms));

            pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
                "%s{\"topin\":%d,\"id\":%d,\"pins\":\"%s\",\"ptype\":%d,"
                "\"action\":\"%s\",\"send_sms\":\"%s\","
                "\"info\":\"%s\",\"onoff\":%d}",
                first ? "" : ",",
                PinsConf[i].topin, (int)i + 1, esc_pins2, PinsConf[i].ptype,
                esc_action, esc_sms, esc_row_info, PinsConf[i].onoff);
        } else {
            int z = (int)(i - (long)NUMPIN);
            const char *zact = zbee_action_sclick(z);
            const char *action   = (zact[0] != '\0' && strcmp(zact, "None") != 0) ? zact : "None";
            const char *send_sms = ZigbeeConf[z].sec_send_sms ? "YES" : "NO";
            char esc_zpins[24];
            json_escape_str(esc_row_info, ZigbeeConf[z].zbee_label, sizeof(esc_row_info));
            json_escape_str(esc_zpins, ZigbeeConf[z].zbee_ieee, sizeof(esc_zpins));
            json_escape_str(esc_action, action, sizeof(esc_action));
            json_escape_str(esc_sms, send_sms, sizeof(esc_sms));

            pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
                "%s{\"topin\":11,\"id\":%d,\"pins\":\"%s\",\"ptype\":0,\"zbee\":1,"
                "\"action\":\"%s\",\"send_sms\":\"%s\","
                "\"info\":\"%s\",\"onoff\":%d}",
                first ? "" : ",", ZbeeIdFromIdx(z), esc_zpins,
                esc_action, esc_sms, esc_row_info, ZigbeeConf[z].onoff);
        }

        first = false;
        emitted++;
    }

    /* ── Закрываем JSON ── */
    pos += snprintf(g_body + pos, G_BODY_SIZE - pos, "],\"next\":%ld}", next);

    /* ── Лог для контроля ── */
    MG_DEBUG(("security: len=%d buf=%d rows=%ld next=%ld", pos, (int)G_BODY_SIZE, emitted, next));

    /* ── Ответ с Content-Length → Keep-Alive работает ── */
    char extra[128];
    snprintf(extra, sizeof(extra), "%sETag: \"%lu\"\r\n",
             s_json_header, (unsigned long)g_ver_security);

    mg_http_reply(c, 200, extra, "%s", g_body);
    /* НЕТ c->is_draining = 1 — соединение остаётся живым! */
}

/* ─── /api/state/sensors (Keep-Alive polling) ─── */
static void handle_sensors(struct mg_connection *c) {

    int pos = 0;

    /* ── Массив ds18b20 ── */
    pos += snprintf(g_body + pos, G_BODY_SIZE - pos, "{\"ds18b20\":[");

    bool first = true;

    for (int i = 0; i < MAX_DS18B20_P; i++) {
        if (ds18b20[i].typsensr != 1) continue;
        for (int j = 0; j < ds18b20[i].numsens && j < MAX_DS18B20_PER_PIN; j++) {
            if (!ds18b20[i].sensors[j].valid) continue;

            int remaining = (int)G_BODY_SIZE - pos;
            if (remaining < 80) {
                MG_ERROR(("sensors: OVERFLOW at DS18B20 [%d][%d], pos=%d remaining=%d",
                          i, j, pos, remaining));
                goto close_ds18b20;
            }

            const uint8_t *a = ds18b20[i].sensors[j].addr;
            char s_t[16]; fmt_float(s_t, sizeof(s_t), ds18b20[i].sensors[j].temp, 2);
            pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
                "%s{\"addr\":\"%02X%02X%02X%02X%02X%02X%02X%02X\",\"temp\":%s}",
                first ? "" : ",",
                a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7],
                s_t);
            first = false;
        }
    }

close_ds18b20:
    /* ── Массив dht22 ── */
    pos += snprintf(g_body + pos, G_BODY_SIZE - pos, "],\"dht22\":[");
    first = true;

    for (int i = 0; i < MAX_DHT22_P; i++) {
        if (dht22[i].typsensr != 2 || !dht22[i].valid) continue;

        int remaining = (int)G_BODY_SIZE - pos;
        if (remaining < 60) {
            MG_ERROR(("sensors: OVERFLOW at DHT22 [%d], pos=%d remaining=%d",
                      i, pos, remaining));
            break;
        }

        char s_t[16]; fmt_float(s_t, sizeof(s_t), dht22[i].temp, 2);
        char s_h[16]; fmt_float(s_h, sizeof(s_h), dht22[i].humid, 2);
        pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
            "%s{\"id\":%d,\"temp\":%s,\"humidity\":%s}",
            first ? "" : ",",
            dht22[i].id, s_t, s_h);
        first = false;
    }

    /* ── Закрываем JSON ── */
    pos += snprintf(g_body + pos, G_BODY_SIZE - pos, "]}");

    /* ── Лог для контроля ── */
    MG_DEBUG(("sensors: len=%d buf=%d", pos, (int)G_BODY_SIZE));

    /* ── Ответ с Content-Length → Keep-Alive работает ── */
    char extra[128];
    snprintf(extra, sizeof(extra), "%sETag: \"%lu\"\r\n",
             s_json_header, (unsigned long)g_ver_sensors);

    mg_http_reply(c, 200, extra, "%s", g_body);
    /* НЕТ c->is_draining = 1 — соединение остаётся живым! */
}

/* ─── /api/state/common ───
 * Поллинг-эндпоинт, опрашивается каждые 2с.
 * Работает в режиме Keep-Alive. Защита от гонки OTA (когда upload-запрос
 * попадает на закрывающийся сокет) реализована на фронтенде
 * через pauseAll() перед аплоадом и защиту OTA-owner в MG_EV_ACCEPT. */
static void handle_common(struct mg_connection *c) {
    char b[400];
    char tbuf[256];
    char extra[192];
    parse_stm32time(tbuf, sizeof(tbuf), &SetSettings);
    unsigned long uptime = (unsigned long)(HAL_GetTick() / 1000);
    unsigned long heap = (unsigned long)xPortGetFreeHeapSize();

    snprintf(extra, sizeof(extra),
        "Content-Type: application/json\r\n"
        "Cache-Control: no-cache\r\n"
        "ETag: \"%lu\"\r\n",
        (unsigned long)g_ver_common);
    snprintf(b, sizeof(b),
        "{\"uptime\":%lu,\"heap\":%lu,\"ip\":\"%s\",\"gsm\":\"%s\",\"time\":%s,\"fw\":\"%s\"}",
        uptime, heap, "0.0.0.0", "ok", tbuf, FW_VERSION);
    mg_http_reply(c, 200, extra, "%s", b);
}

/* ─── /api/state/onewire (Keep-Alive polling) ─── */
static void handle_onewire(struct mg_connection *c) {

    int pos = 0;

    /* ── Заголовок JSON ── */
    pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
        "{\"lang\":\"%s\",\"pins\":[", SetSettings.lang);

    bool first_pin = true;
    bool owfound   = false;

    /* ── Цикл по OneWire пинам ── */
    for (int i = 0; i < NUMPIN; i++) {
        if (PinsConf[i].topin != 4) continue;
        owfound = true;
        bool snsr_fnd = false;

        /* ── DS18B20 ── */
        for (int j = 0; j < MAX_DS18B20_P; j++) {
            if (ds18b20[j].id != (uint8_t)(i + 1) || ds18b20[j].typsensr != 1) continue;
            snsr_fnd = true;

            int remaining = (int)G_BODY_SIZE - pos;
            if (remaining < 128) {
                MG_ERROR(("onewire: OVERFLOW before DS18B20 pin %d, pos=%d",
                          PinIdFromIdx(i), pos));
                goto close_json;
            }

            pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
                "%s{\"id\":%d,\"pin\":\"%s\",\"typsensr\":%d,"
                "\"numsens\":%d,\"onoff\":%d,\"sensors\":[",
                first_pin ? "" : ",",
                i + 1, ds18b20[j].pin, ds18b20[j].typsensr,
                ds18b20[j].numsens, ds18b20[j].onoff);
            first_pin = false;

            bool first_sens = true;
            for (int k = 0; k < ds18b20[j].numsens && k < MAX_DS18B20_PER_PIN; k++) {

                remaining = (int)G_BODY_SIZE - pos;
                if (remaining < 250) {
                    MG_ERROR(("onewire: OVERFLOW at DS18B20 sensor %d pin %d, pos=%d",
                              k, PinIdFromIdx(i), pos));
                    break;
                }

                char esc_info[64];
                json_escape_str(esc_info, ds18b20[j].sensors[k].info, sizeof(esc_info));

                char s_t[16];   fmt_float(s_t,  sizeof(s_t),  ds18b20[j].sensors[k].temp, 4);
                char s_ut[16];  fmt_float(s_ut, sizeof(s_ut), ds18b20[j].sensors[k].upt,  2);
                char s_lt[16];  fmt_float(s_lt, sizeof(s_lt), ds18b20[j].sensors[k].lowt, 2);
                pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
                    "%s{\"s_number\":\"%02X%02X%02X%02X%02X%02X%02X%02X\","
                    "\"t\":%s,\"valid\":%s,"
                    "\"ut\":%s,\"lt\":%s,"
                    "\"action_ut\":\"%s\",\"action_lt\":\"%s\","
                    "\"info\":\"%s\"}",
                    first_sens ? "" : ",",
                    ds18b20[j].sensors[k].addr[0], ds18b20[j].sensors[k].addr[1],
                    ds18b20[j].sensors[k].addr[2], ds18b20[j].sensors[k].addr[3],
                    ds18b20[j].sensors[k].addr[4], ds18b20[j].sensors[k].addr[5],
                    ds18b20[j].sensors[k].addr[6], ds18b20[j].sensors[k].addr[7],
                    s_t,
                    ds18b20[j].sensors[k].valid ? "true" : "false",
                    s_ut, s_lt,
                    ds18b20[j].sensors[k].actup, ds18b20[j].sensors[k].actlow,
                    esc_info);
                first_sens = false;
            }

            pos += snprintf(g_body + pos, G_BODY_SIZE - pos, "]}");
        }

        /* ── DHT22 ── */
        for (int j = 0; j < MAX_DHT22_P && !snsr_fnd; j++) {
            if (dht22[j].id != (uint8_t)(i + 1) || dht22[j].typsensr != 2) continue;
            snsr_fnd = true;

            int remaining = (int)G_BODY_SIZE - pos;
            if (remaining < 400) {
                MG_ERROR(("onewire: OVERFLOW before DHT22 pin %d, pos=%d",
                          PinIdFromIdx(i), pos));
                goto close_json;
            }

            char esc_info[64];
            json_escape_str(esc_info, dht22[j].info, sizeof(esc_info));

            char s_t[16];  fmt_float(s_t,  sizeof(s_t),  dht22[j].temp,  2);
            char s_h[16];  fmt_float(s_h,  sizeof(s_h),  dht22[j].humid, 2);
            char s_ut[16]; fmt_float(s_ut, sizeof(s_ut), dht22[j].upt,   2);
            char s_lt[16]; fmt_float(s_lt, sizeof(s_lt), dht22[j].lowt,  2);
            char s_uh[16]; fmt_float(s_uh, sizeof(s_uh), dht22[j].uph,   2);
            char s_lh[16]; fmt_float(s_lh, sizeof(s_lh), dht22[j].lowh,  2);
            pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
                "%s{\"id\":%d,\"pin\":\"%s\",\"typsensr\":%d,"
                "\"numsens\":%d,\"onoff\":%d,\"sensors\":["
                "{\"s_number\":\"DHT22\",\"t\":%s,\"humidity\":%s,"
                "\"valid\":%s,"
                "\"ut\":%s,\"lt\":%s,"
                "\"action_ut\":\"%s\",\"action_lt\":\"%s\","
                "\"upphumid\":%s,\"humlolim\":%s,"
                "\"actuphum\":\"%s\",\"actlowhum\":\"%s\","
                "\"info\":\"%s\"}"
                "]}",
                first_pin ? "" : ",",
                i + 1, dht22[j].pin, dht22[j].typsensr,
                dht22[j].numsens, dht22[j].onoff,
                s_t, s_h,
                dht22[j].valid ? "true" : "false",
                s_ut, s_lt,
                dht22[j].actup, dht22[j].actlow,
                s_uh, s_lh,
                dht22[j].actuh, dht22[j].actlh,
                esc_info);
            first_pin = false;
        }

        /* ── Пин без сенсоров ── */
        if (!snsr_fnd) {
            int remaining = (int)G_BODY_SIZE - pos;
            if (remaining < 100) {
                MG_ERROR(("onewire: OVERFLOW before no-sensor pin %d, pos=%d",
                          PinIdFromIdx(i), pos));
                goto close_json;
            }
            char esc_ow_pins[16];
            json_escape_str(esc_ow_pins, PinsInfo[i].pins, sizeof(esc_ow_pins));
            pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
                "%s{\"id\":%d,\"pin\":\"%s\",\"typsensr\":0,"
                "\"numsens\":0,\"info\":\"No active sensors found\",\"onoff\":0}",
                first_pin ? "" : ",",
                i + 1, esc_ow_pins);
            first_pin = false;
        }
    }

    /* ── OneWire пинов нет вообще ── */
    if (!owfound) {
        pos += snprintf(g_body + pos, G_BODY_SIZE - pos,
            "{\"id\":0,\"pin\":\"N/A\",\"typsensr\":0,"
            "\"numsens\":0,\"info\":\"No OneWire pins found\",\"onoff\":0}");
    }

close_json:
    /* ── Закрываем JSON ── */
    pos += snprintf(g_body + pos, G_BODY_SIZE - pos, "]}");

    /* ── Лог для контроля ── */
    MG_DEBUG(("onewire: len=%d buf=%d", pos, (int)G_BODY_SIZE));

    /* ── Ответ с Content-Length → Keep-Alive работает ── */
    char extra[128];
    snprintf(extra, sizeof(extra), "%sETag: \"%lu\"\r\n",
             s_json_header, (unsigned long)g_ver_onewire);

    mg_http_reply(c, 200, extra, "%s", g_body);
    /* НЕТ c->is_draining = 1 — соединение остаётся живым! */
}

//void web_init(struct mg_mgr *mgr) {
//  s_settings.device_name = strdup("My Device");
//  mg_http_listen(mgr, HTTP_URL, (mg_event_handler_t)fn, NULL);
//  mg_http_listen(mgr, HTTPS_URL, (mg_event_handler_t)fn, (void *) 1);
//  mg_timer_add(mgr, 10 * 1000, MG_TIMER_RUN_NOW | MG_TIMER_REPEAT, timer_sntp_fn, mgr);
//  mg_timer_add(mgr, 1000, MG_TIMER_REPEAT | MG_TIMER_RUN_NOW, timer_fn_mqtt, mgr);
//}
void web_init(struct mg_mgr *mgr) {
    // Инициализация настроек устройства
    s_settings.device_name = (char *)default_name;

    // Allocate shared JSON buffer: DTCM pool, fallback to FreeRTOS heap
    if (g_body == NULL) {
        g_body = (char *)dtcm_malloc(G_BODY_SIZE);
        if (g_body == NULL) {
            /* DTCM-пул исчерпан — HTTP-сервер всё равно должен подняться */
            g_body = (char *)pvPortMalloc(G_BODY_SIZE);
            if (g_body == NULL) {
                MG_ERROR(("OOM: g_body allocation failed (DTCM and heap)"));
                return;
            }
            MG_INFO(("g_body allocated from FreeRTOS heap (DTCM pool full)"));
        }
        memset(g_body, 0, G_BODY_SIZE);
    }

    // Подключение упакованной файловой системы
    mg_mem_files = mg_packed_files;

#if MG_ENABLE_TCPIP
    /* Уровень 1 защиты: SYN-фильтр (heap + 1 handshake + бюджет) до выделения
     * памяти под соединение. Ставим ДО mg_http_listen(). */
    mg_tcpip_syn_filter = net_syn_filter;
#endif

    // Формируем URL для HTTP и HTTPS
    char http_url[32], https_url[32];
    snprintf(http_url, sizeof(http_url), "http://0.0.0.0:%s", HTTP_PORT);
    snprintf(https_url, sizeof(https_url), "https://0.0.0.0:%s", HTTPS_PORT);

    // Запуск HTTP-сервера
    struct mg_connection *http_conn = mg_http_listen(mgr, http_url, (mg_event_handler_t)fn, (void *)CONN_TYPE_LISTENER);
    if (http_conn) {
        MG_INFO(("HTTP server started on %s, conn=%p", http_url, (void *)http_conn));
    } else {
        MG_ERROR(("Failed to start HTTP server on %s", http_url));
    }

    // Запуск HTTPS-сервера (только если HTTPS включен и сертификаты загружены)
    if (SetSettings.usehttps == 1) {
        /* Предзагрузка TLS-сертификатов ОДИН раз — до accept, без файлового I/O в mg_mgr_poll */
        uint32_t t_cert = HAL_GetTick();
        if (s_mysett_mutexHandle)
            osMutexAcquire(s_mysett_mutexHandle, osWaitForever);
        bool cert_ok = https_get_tls_cert(s_tls_cert, DTCM_BUF_TLS_CERT);
        bool key_ok  = https_get_tls_key(s_tls_key, DTCM_BUF_TLS_KEY);
        printf("[TLS] cert+key preloaded: %lu ms\r\n", (unsigned long)(HAL_GetTick() - t_cert));

        if (!cert_ok || !key_ok) {
            MG_ERROR(("Failed to load TLS cert/key — HTTPS disabled"));
            s_tls_loaded = false;
        } else if (strstr(s_tls_cert, "-----BEGIN CERTIFICATE-----") == NULL ||
                   strstr(s_tls_cert, "-----END CERTIFICATE-----") == NULL) {
            MG_ERROR(("Invalid certificate format — HTTPS disabled"));
            s_tls_loaded = false;
        } else if (strstr(s_tls_key, "-----BEGIN EC PRIVATE KEY-----") == NULL ||
                   strstr(s_tls_key, "-----END EC PRIVATE KEY-----") == NULL) {
            MG_ERROR(("Invalid key format — HTTPS disabled"));
            s_tls_loaded = false;
        } else {
            s_tls_loaded = true;
        }
        if (s_mysett_mutexHandle)
            osMutexRelease(s_mysett_mutexHandle);

        if (s_tls_loaded) {
            struct mg_connection *https_conn = mg_http_listen(mgr, https_url, (mg_event_handler_t)fn, (void *)CONN_TYPE_LISTENER);
            if (https_conn) {
                MG_INFO(("HTTPS server started on %s, conn=%p", https_url, (void *)https_conn));
            } else {
                MG_ERROR(("Failed to start HTTPS server on %s", https_url));
            }
        }
    } else {
        MG_INFO(("HTTPS disabled in settings, skipping listener on %s", https_url));
    }

    // Добавление таймеров
    mg_timer_add(mgr, 10 * 1000, MG_TIMER_RUN_NOW | MG_TIMER_REPEAT, timer_sntp_fn, mgr);
    mg_timer_add(mgr, 1000, MG_TIMER_REPEAT | MG_TIMER_RUN_NOW, timer_fn_mqtt, mgr); // Не дублирует в web_init() т.к. setup_mqtt() не вызывается нигде в коде проекта!
    mg_timer_add(mgr, 5000, MG_TIMER_REPEAT | MG_TIMER_RUN_NOW, ota_watchdog_fn, NULL);

    /* OTA health-check: register ONLY on 3rd trial boot (retries >= 3).
       On boots 1 and 2 no timer is created — user can still rollback via
       future web-UI button (mg_ota_rollback). */
    {
        const HTTPSsettings *s = get_valid_settings();
        if (s && s->ota_pending == 1 && s->ota_state == 1
            && s->ota_boot_retries >= OTA_BOOT_RETRY_MAX) {
            LOG_OTA("3rd trial boot (retries=%u), registering health-check "
                    "timer (%lums)\n",
                    (unsigned) s->ota_boot_retries,
                    (unsigned long) OTA_BOOT_COMMIT_DELAY_MS);
            mg_timer_add(mgr, OTA_BOOT_COMMIT_DELAY_MS, 0,
                         ota_health_check_fn, NULL);
        }
        /* Автоопределение банка, залитого напрямую (ST-Link). Один раз, через 5 с. */
        mg_timer_add(mgr, 5000, 0, ota_sync_banks_fn, NULL);
    }
}
/*********************************** From Zagotovka ****************************************************/
extern bool *flagmqtt;
void setup_mqtt(struct mg_mgr *mgr, struct mg_tcpip_if *mif){
    if (mif->state != MG_TCPIP_STATE_READY) {// Проверяем готовность сети
        MG_INFO(("setup_mqtt: Network not ready, skipping MQTT setup"));
        return; // Если сеть не готова, выходим
    }
    // Инициализация MQTT (выполняется только один раз)
    if (SetSettings.check_mqtt) {
        set_mqtt_topic(SetSettings.txmqttop);  // Установим топик (например, "Swarm")
        MG_INFO(("set_mqtt_topic: Topic set to: %s", SetSettings.txmqttop));

        // Формирование URL с корректной схемой mqtt://
        char mqtt_url[70];  // Увеличен размер буфера для URL
        int result = snprintf(mqtt_url, sizeof(mqtt_url), "mqtt://%s:%d",
                              SetSettings.mqtt_hst, SetSettings.mqtt_prt);
        if (result < 0 || result >= sizeof(mqtt_url)) {
            MG_ERROR(("Error: MQTT URL truncated or formatting error"));
        } else {
            set_mqtt_url(mqtt_url);
            MG_INFO(("MQTT URL set: %s", mqtt_url));
        }

        // Добавление таймера для MQTT
        MG_INFO(("Adding MQTT timer"));
        mg_timer_add(mgr, 3000, MG_TIMER_REPEAT | MG_TIMER_RUN_NOW, timer_fn_mqtt, mgr);
        *flagmqtt = true; // Устанавливаем флаг, что инициализация выполнена
    } else {
        MG_INFO(("MQTT is disabled in settings"));
        *flagmqtt = true; // Устанавливаем флаг, чтобы не пытаться инициализировать снова
    }
}
