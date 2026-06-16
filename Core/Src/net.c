// Copyright (c) 2023 Cesanta Software Limited
// All rights reserved

#include "net.h"
#include "zagotovka.h"
#include "ds18b20.h"
#include "ds18b20Config.h"
#include "main.h"
#include "compat_ota.h"
#include "fmt_float.h"
#include <stdlib.h>   // rand()

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
  // Если активна чужая сессия — логируем вытеснение
  if (session_is_active() && s_active_user != u) {
    MG_INFO(("Session of [%s] forcibly taken over by [%s]",
             s_active_user->name, u->name));
  }
  // Если тот же пользователь входит повторно (другой браузер) —
  // старый токен инвалидируется, новый браузер получает новый токен
  if (session_is_active() && s_active_user == u) {
    MG_INFO(("User [%s] logged in again — previous session invalidated",
             u->name));
  }

  // Генерируем новый токен — старый токен (в другом браузере) умирает
  session_generate_token(u);
  s_active_user       = u;
  s_session_last_seen = HAL_GetTick();

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

void handle_firmware_upload(struct mg_connection *c,
                                   struct mg_http_message *hm) {
  char name[64], offset[20], total[20];
  struct mg_str data = hm->body;
  long ofs = -1, tot = -1;
  name[0] = offset[0] = '\0';
  mg_http_get_var(&hm->query, "name", name, sizeof(name));
  mg_http_get_var(&hm->query, "offset", offset, sizeof(offset));
  mg_http_get_var(&hm->query, "total", total, sizeof(total));
  MG_INFO(("File %s, offset %s, len %lu", name, offset, data.len));
  if ((ofs = mg_json_get_long(mg_str(offset), "$", -1)) < 0 ||
      (tot = mg_json_get_long(mg_str(total), "$", -1)) < 0) {
    mg_http_reply(c, 500, "", "offset and total not set\n");
  } else if (ofs == 0 && mg_ota_begin((size_t) tot) == false) {
    mg_http_reply(c, 500, "", "mg_ota_begin(%ld) failed\n", tot);
  } else if (data.len > 0 && mg_ota_write(data.buf, data.len) == false) {
    mg_http_reply(c, 500, "", "mg_ota_write(%lu) @%ld failed\n", data.len, ofs);
    mg_ota_end();
  } else if (data.len == 0 && mg_ota_end() == false) {
    mg_http_reply(c, 500, "", "mg_ota_end() failed\n", tot);
  } else {
    mg_http_reply(c, 200, s_json_header, "true\n");
    if (data.len == 0) {
      // Successful mg_ota_end() called, schedule device reboot
      mg_timer_add(c->mgr, 500, 0, (void (*)(void *)) mg_device_reset, NULL);
    }
  }
}

void handle_firmware_commit(struct mg_connection *c, struct mg_http_message *hm) {
  if (!require_post_json(c, hm)) return;
  mg_http_reply(c, 200, s_json_header, "%s\n",
                mg_ota_commit() ? "true" : "false");
}

void handle_firmware_rollback(struct mg_connection *c, struct mg_http_message *hm) {
  if (!require_post_json(c, hm)) return;
  mg_http_reply(c, 200, s_json_header, "%s\n",
                mg_ota_rollback() ? "true" : "false");
}

static size_t print_status(void (*out)(char, void *), void *ptr, va_list *ap) {
  int fw = va_arg(*ap, int);
  return mg_xprintf(out, ptr, "{%m:%d,%m:%c%lx%c,%m:%u,%m:%u}\n",
                    MG_ESC("status"), mg_ota_status(fw), MG_ESC("crc32"), '"',
                    mg_ota_crc32(fw), '"', MG_ESC("size"), mg_ota_size(fw),
                    MG_ESC("timestamp"), mg_ota_timestamp(fw));
}

void handle_firmware_status(struct mg_connection *c) {
  mg_http_reply(c, 200, s_json_header, "[%M,%M]\n", print_status,
                MG_FIRMWARE_CURRENT, print_status, MG_FIRMWARE_PREVIOUS);
}

void handle_device_reset(struct mg_connection *c, struct mg_http_message *hm) {
  if (!require_post_json(c, hm)) return;
  mg_http_reply(c, 200, s_json_header, "true\n");
  mg_timer_add(c->mgr, 500, 0, (void (*)(void *)) mg_device_reset, NULL);
}

void handle_device_eraselast(struct mg_connection *c) {
  size_t ss = mg_flash_sector_size(), size = mg_flash_size();
  char *base = (char *) mg_flash_start(), *last = base + size - ss;
  if (mg_flash_bank() == 2) last -= size / 2;
  mg_flash_erase(last);
  mg_http_reply(c, 200, s_json_header, "true\n");
}
// Определяем типы соединений
#define CONN_TYPE_HTTP     1
#define CONN_TYPE_HTTPS    2
#define CONN_TYPE_MQTT     3
#define CONN_TYPE_LISTENER 0xFF  // уникальное значение, не пересекается с HTTP/HTTPS/MQTT

// Rate limiter для /api/login: блокировка на 30 сек после 5 неудачных попыток
#define LOGIN_MAX_FAILS   5
#define LOGIN_BLOCK_MS    30000
static uint32_t s_login_fail_count  = 0;
static uint32_t s_login_block_until = 0;

/* TLS handshake timing tracking (per-connection) */
#define TLS_HS_TRACK_MAX 4
static struct {
	unsigned long conn_id;
	uint64_t      accept_ms;
} s_tls_hs_track[TLS_HS_TRACK_MAX];

char s_tls_cert[1024] = {0};  /* PEM certificate, loaded once in web_init() */
char s_tls_key[512]   = {0};  /* PEM private key, loaded once in web_init() */
bool s_tls_loaded = false;           /* true after successful preload */

static void tls_hs_track_start(unsigned long conn_id) {
	for (int i = 0; i < TLS_HS_TRACK_MAX; i++) {
		if (s_tls_hs_track[i].conn_id == 0) {
			s_tls_hs_track[i].conn_id = conn_id;
			s_tls_hs_track[i].accept_ms = mg_millis();
			return;
		}
	}
}

//static uint64_t tls_hs_track_finish(unsigned long conn_id) {
//	for (int i = 0; i < TLS_HS_TRACK_MAX; i++) {
//		if (s_tls_hs_track[i].conn_id == conn_id) {
//			uint64_t elapsed = mg_millis() - s_tls_hs_track[i].accept_ms;
//			s_tls_hs_track[i].conn_id = 0;
//			return elapsed;
//		}
//	}
//	return 0;
//}

static bool check_etag_304(struct mg_connection *c, struct mg_http_message *hm,
                           volatile uint32_t *ver);
void handle_buttons(struct mg_connection *c);
void handle_switches(struct mg_connection *c);
void handle_encoders(struct mg_connection *c);
static void handle_get_pins(struct mg_connection *c, struct mg_http_message *hm);
static void handle_pid(struct mg_connection *c);
static void handle_security(struct mg_connection *c);
static void handle_sensors(struct mg_connection *c);
static void handle_common(struct mg_connection *c);
static void handle_onewire(struct mg_connection *c);

// Shared buffer for all Content-Length JSON handlers — mongoose + FreeRTOS event loop
// is single-threaded, only one handler runs at a time.  Saves ~36 KB vs separate buffers.
char g_body[16384];

/* ── Лимит активных соединений ── */
#define MAX_CONNS  8

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
        // Лимит: 3 активных веб-соединения. Handshake-соединения не
        // ограничены — браузеру нужно 3+ параллельных для загрузки
        // HTML + JS + CSS при первом открытии HTTPS-страницы.
        int cnt_active = 0;       // установленные (не в handshake)
        int cnt_hs     = 0;       // в процессе TLS handshake
        struct mg_connection *oldest_idle = NULL;
        uint32_t oldest_time = UINT32_MAX;

        for (struct mg_connection *t = c->mgr->conns; t; t = t->next) {
            if (t == c) continue;
            if ((uintptr_t)t->fn_data != CONN_TYPE_HTTP &&
                (uintptr_t)t->fn_data != CONN_TYPE_HTTPS) continue;

            if (t->is_tls_hs) {
                cnt_hs++;          // в handshake — не трогаем, только считаем
                continue;
            }

            cnt_active++;

            // Кандидат на вытеснение: idle, буферы пусты, был хотя бы 1 запрос
            uint32_t last_used = *(uint32_t *)t->data;
            if (t->send.len == 0 && t->recv.len == 0 && last_used > 0) {
                if (last_used < oldest_time) {
                    oldest_time  = last_used;
                    oldest_idle  = t;
                }
            }
        }

        if (cnt_active >= 3) { // было 3
            if (oldest_idle != NULL) {
                MG_INFO(("Evict idle conn %lu to free slot", oldest_idle->id));
                mg_close_conn(oldest_idle);
            } else {
                MG_INFO(("Rejected conn %lu: %d active + %d hs, no idle",
                         c->id, cnt_active, cnt_hs));
                printf("[NET] REJECT conn %lu: active=%d hs=%d\r\n",
                               c->id, cnt_active, cnt_hs);
                mg_close_conn(c);
                return;
            }
        }

        s_active_conns++;
        unsigned int local_port = mg_ntohs(c->loc.port);
        char buf_rem[32];
        mg_snprintf(buf_rem, sizeof(buf_rem), "%M", mg_print_ip_port, &c->rem);

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
                    mg_close_conn(c);
                    return;
                }
            }
        }

        if (local_port == atoi(HTTP_PORT)) {
            c->fn_data = (void *)CONN_TYPE_HTTP;
            MG_INFO(("HTTP connection accepted on port %s", HTTP_PORT));
        }
        else if (local_port == atoi(HTTPS_PORT)) {
            c->fn_data = (void *)CONN_TYPE_HTTPS;
            /* is_tls и is_tls_hs выставляет mg_tls_init() — здесь не трогаем */
            MG_INFO(("HTTPS connection accepted on port %s", HTTPS_PORT));
/***************************************************************************/
            if (SetSettings.usehttps == 1) {
//                uint32_t t_start = HAL_GetTick();
                tls_hs_track_start(c->id);

                /* Сертификаты уже загружены в web_init() — никакого файлового I/O */
                if (!s_tls_loaded ||
                    s_tls_cert[0] == '\0' || s_tls_key[0] == '\0') {
                    MG_ERROR(("TLS cert/key not preloaded"));
                    mg_close_conn(c);
                    return;
                }

                // printf("[TLS] cert+key from cache\r\n");

                struct mg_tls_opts opts = {
                    .cert = mg_str(s_tls_cert),
                    .key  = mg_str(s_tls_key),
                };
//                uint32_t t_init = HAL_GetTick();
                mg_tls_init(c, &opts);
                // printf("[TLS] mg_tls_init(cert=%u,key=%u): %lu ms\r\n",
                //        (unsigned)opts.cert.len, (unsigned)opts.key.len,
                //        (unsigned long)(HAL_GetTick() - t_init));

                if (c->tls == NULL) {
                    MG_ERROR(("Error: TLS initialization failed"));
                    mg_close_conn(c);
                    return;
                }
                // printf("[TLS] ACCEPT total init: %lu ms (conn %lu)\r\n",
                //        (unsigned long)(HAL_GetTick() - t_start), (unsigned long)c->id);
            }
        }
    }
    break;

    case MG_EV_TLS_HS: {
//        uint64_t hs_elapsed = tls_hs_track_finish(c->id);
        // printf("[TLS] handshake complete: %llu ms (conn %lu)\r\n",
        //        (unsigned long long)hs_elapsed, (unsigned long)c->id);
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
					mg_http_reply(c, 403, "Connection: close\r\n", "{\"error\":\"session_expired\"}\n");
					c->is_draining = 1;
				} else if (mg_match(hm->uri, mg_str("/api/state/sensors"), NULL)) {
					if (!check_etag_304(c, hm, &g_ver_sensors)) handle_sensors(c);
				} else if (mg_match(hm->uri, mg_str("/api/state/common"), NULL)) {
					if (!check_etag_304(c, hm, &g_ver_common)) handle_common(c);
				} else if (mg_match(hm->uri, mg_str("/api/state/pid"), NULL)) {
					if (!check_etag_304(c, hm, &g_ver_pid)) handle_pid(c);
				} else if (mg_match(hm->uri, mg_str("/api/state/onewire"), NULL)) {
					if (!check_etag_304(c, hm, &g_ver_onewire)) handle_onewire(c);
				} else if (mg_match(hm->uri, mg_str("/api/state/button"), NULL)) {
					if (!check_etag_304(c, hm, &g_ver_button)) handle_buttons(c);
				} else if (mg_match(hm->uri, mg_str("/api/state/security"), NULL)) {
					if (!check_etag_304(c, hm, &g_ver_security)) handle_security(c);
				} else if (mg_match(hm->uri, mg_str("/api/state/switch"), NULL)) {
					if (!check_etag_304(c, hm, &g_ver_switch)) handle_switches(c);
				} else if (mg_match(hm->uri, mg_str("/api/state/encoder"), NULL)) {
					if (!check_etag_304(c, hm, &g_ver_encoder)) handle_encoders(c);
				} else {
					mg_http_reply(c, 404, "", "");
				}
				keep_alive = true;
				break;
			}

			/* ── Unified /api/pins (ETag + 304, chunked JSON, all pin types) ── */
			if (mg_match(hm->uri, mg_str("/api/pins"), NULL)) {
				if (u == NULL) { mg_http_reply(c, 403, "Connection: close\r\n", "{\"error\":\"session_expired\"}\n"); }
				else { handle_get_pins(c, hm); }
				keep_alive = true;
				break;
			}
			/* ── /api/pid (ETag + 304, Content-Length) — PID is a separate subsystem ── */
			if (mg_match(hm->uri, mg_str("/api/pid"), NULL)) {
				if (u == NULL) { mg_http_reply(c, 403, "Connection: close\r\n", "{\"error\":\"session_expired\"}\n"); }
				else if (!check_etag_304(c, hm, &g_ver_pid)) { handle_pid(c); }
				keep_alive = true;
				break;
			}
			/* ── Keep-Alive GET poll endpoints (reuse connection, no TLS storm) ── */
			if (mg_match(hm->uri, mg_str("/api/select/get"), NULL)) {
				MG_INFO(("%lu Processing /api/select/get", c->id));
				handle_select_get(c);
				keep_alive = true;
				break;
			}
			if (mg_match(hm->uri, mg_str("/api/cron/get"), NULL)) {
				MG_INFO(("%lu Processing /api/cron/get", c->id));
				handle_timers_get(c);
				keep_alive = true;
				break;
			}
			if (mg_match(hm->uri, mg_str("/api/mysett/get"), NULL)) {
				MG_INFO(("%lu Processing /api/mysett/get", c->id));
				handle_mysett_get(c);
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
			    mg_http_reply(c, 403, "Connection: close\r\n", "{\"error\":\"session_expired\"}\n");

                c->is_draining = 1;
			} else if (mg_match(hm->uri, mg_str("/api/debug"), NULL)) {
				MG_INFO(("%lu Processing /api/debug", c->id));
				handle_debug(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/stats/get"), NULL)) {
				MG_INFO(("%lu Processing /api/stats/get", c->id));
				handle_stats_get(c);
			} else if (mg_match(hm->uri, mg_str("/api/events/get"), NULL)) {
				MG_INFO(("%lu Processing /api/events/get", c->id));
				handle_events_get(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/settings/get"), NULL)) {
				MG_INFO(("%lu Processing /api/settings/get", c->id));
				handle_settings_get(c);
			} else if (mg_match(hm->uri, mg_str("/api/settings/set"), NULL)) {
				MG_INFO(("%lu Processing /api/settings/set", c->id));
				handle_settings_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/firmware/upload"), NULL)) {
				MG_INFO(("%lu Processing /api/firmware/upload", c->id));
				handle_firmware_upload(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/firmware/commit"), NULL)) {
				MG_INFO(("%lu Processing /api/firmware/commit", c->id));
				handle_firmware_commit(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/firmware/rollback"), NULL)) {
				MG_INFO(("%lu Processing /api/firmware/rollback", c->id));
				handle_firmware_rollback(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/firmware/status"), NULL)) {
				MG_INFO(("%lu Processing /api/firmware/status", c->id));
				handle_firmware_status(c);
			} else if (mg_match(hm->uri, mg_str("/api/device/reset"), NULL)) {
				MG_INFO(("%lu Processing /api/device/reset", c->id));
				handle_device_reset(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/device/eraselast"), NULL)) {
				MG_INFO(("%lu Processing /api/device/eraselast", c->id));
				handle_device_eraselast(c);
			} else if (mg_match(hm->uri, mg_str("/api/pintopin/get"), NULL)) {
				MG_INFO(("%lu Processing /api/pintopin/get", c->id));
				handle_pintopin_get(c);
			} else if (mg_match(hm->uri, mg_str("/api/select/set"), NULL)) {
				MG_INFO(("%lu Processing /api/select/set", c->id));
				handle_select_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/switch/get"), NULL)) {
				MG_INFO(("%lu Processing /api/switch/get", c->id));
				handle_switch_get(c);
			} else if (mg_match(hm->uri, mg_str("/api/switch/set"), NULL)) {
				MG_INFO(("%lu Processing /api/switch/set", c->id));
				handle_switch_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/onoff/set"), NULL)) {
				MG_INFO(("%lu Processing /api/onoff/set", c->id));
				handle_onoff_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/button/get"), NULL)) {
				MG_INFO(("%lu Processing /api/button/get", c->id));
				handle_button_get(c);
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
			} else if (mg_match(hm->uri, mg_str("/api/onewire/get"), NULL)) {
				MG_INFO(("%lu Processing /api/onewire/get", c->id));
				handle_onewire_get(c);
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
		MG_INFO(("%lu Connection closed (TLS: %d, listening: %d)",
		         c->id, c->is_tls, c->is_listening));
		break;
 
	case MG_EV_ERROR:
		MG_ERROR(("%lu ERROR: %s", c->id, (char*) ev_data));
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

            /* TLS idle watchdog: принудительно закрываем зависшие TLS соединения */
            if (c->is_tls && !c->is_listening && conn_type == CONN_TYPE_HTTPS) {
                uint32_t last_used = *(uint32_t *)c->data;
                uint32_t now = (uint32_t)mg_millis();
                if (last_used > 0 && (now - last_used) > 15000 && c->send.len == 0) {
                    MG_INFO(("%lu TLS idle watchdog: force close (idle %lu ms)",
                             c->id, (unsigned long)(now - last_used)));
                    mg_close_conn(c);
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
	s_tcp_backoff = 0;                 /* сброс backoff  -  соединение успешно */
	s_tcp_delay_idx = 0;
	printf("[MQTT] txmqttop='%s' rxmqttop='%s'\r\n", SetSettings.txmqttop, SetSettings.rxmqttop);
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
    struct mg_mqtt_opts pub_opts;
    memset(&pub_opts, 0, sizeof(pub_opts));
    pub_opts.topic = pubt;
    pub_opts.message = data;
    pub_opts.qos = s_qos, pub_opts.retain = false;
    mg_mqtt_pub(c, &pub_opts);
    MG_INFO(("%lu PUBLISHED %.*s -> %.*s", c->id, (int) data.len, data.buf, (int) pubt.len, pubt.buf));
    mqtt_publish_logfilter_status();
  } else if (ev == MG_EV_MQTT_MSG) {
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

    if (s_conn != NULL) {
      if (mqtt_connected_reported && !s_conn->is_closing && !s_conn->is_draining) {
        static uint64_t s_last_ping = 0;
        if (mg_millis() - s_last_ping >= 30000) {
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

  char url[70];
  snprintf(url, sizeof(url), "mqtt://%s:%d", SetSettings.mqtt_hst, SetSettings.mqtt_prt);

  struct mg_mqtt_opts opts;
  memset(&opts, 0, sizeof(opts));
  opts.clean = true;
  opts.qos = s_qos;
  opts.topic = mg_str(get_mqtt_topic());
  opts.version = 4;
  opts.keepalive = 60;
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
    char etag[16], hdr[128];
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
        return true;  /* 304 sent, Keep-Alive — caller stops */
    }
    return false;     /* data changed, caller sends full response */
}



/* Escape JSON-special chars in src → dst (max dst_sz). Returns dst. */
const char *json_escape_str(char *dst, const char *src, size_t dst_sz) {
    size_t j = 0;
    for (size_t i = 0; src[i] && j < dst_sz - 1; i++) {
        switch (src[i]) {
            case '"':  if (j+2 < dst_sz) { dst[j++] = '\\'; dst[j++] = '"';  } break;
            case '\\': if (j+2 < dst_sz) { dst[j++] = '\\'; dst[j++] = '\\'; } break;
            case '\n': if (j+2 < dst_sz) { dst[j++] = '\\'; dst[j++] = 'n';  } break;
            case '\r': if (j+2 < dst_sz) { dst[j++] = '\\'; dst[j++] = 'r';  } break;
            case '\t': if (j+2 < dst_sz) { dst[j++] = '\\'; dst[j++] = 't';  } break;
            default:   dst[j++] = src[i]; break;
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
        json_escape_str(esc_info, PinsConf[i].info, sizeof(esc_info));

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
                i, PinsInfo[i].pins,
                PinsConf[i].ptype, PinsConf[i].onoff,
                esc_sc, esc_dc, esc_lp, esc_info);
            break;
        }

        case 3: /* SWITCH */
            CHUNK_SEND_FMT(c, &first,
                "{\"id\":%d,\"pin\":\"%s\",\"type\":\"SWITCH\","
                "\"ptype\":%d,\"onoff\":%d,\"info\":\"%s\"}",
                i, PinsInfo[i].pins,
                PinsConf[i].ptype, PinsConf[i].onoff, esc_info);
            break;

        case 4: /* ONEWIRE */
            CHUNK_SEND_FMT(c, &first,
                "{\"id\":%d,\"pin\":\"%s\",\"type\":\"ONEWIRE\","
                "\"onoff\":%d,\"info\":\"%s\"}",
                i, PinsInfo[i].pins,
                PinsConf[i].onoff, esc_info);
            break;

        case 5: /* PWM */
            CHUNK_SEND_FMT(c, &first,
                "{\"id\":%d,\"pin\":\"%s\",\"type\":\"PWM\","
                "\"dvalue\":%d,\"pwm\":%d,\"pwmmax\":%d,"
                "\"onoff\":%d,\"info\":\"%s\"}",
                i, PinsInfo[i].pins,
                PinsConf[i].dvalue, PinsConf[i].pwm, PinsConf[i].pwmmax,
                PinsConf[i].onoff, esc_info);
            break;

        case 2: /* DEVICE */
            CHUNK_SEND_FMT(c, &first,
                "{\"id\":%d,\"pin\":\"%s\",\"type\":\"DEVICE\","
                "\"onoff\":%d,\"info\":\"%s\"}",
                i, PinsInfo[i].pins,
                PinsConf[i].onoff, esc_info);
            break;

        case 8: /* ENCODER A (Encoder B пропускаем — его данные внутри слота A) */
            CHUNK_SEND_FMT(c, &first,
                "{\"id\":%d,\"pin\":\"%s\",\"type\":\"ENCODER\","
                "\"dvalue\":%d,\"pwm\":%d,\"pwmmax\":%d,"
                "\"ponr\":%d,\"onoff\":%d,\"info\":\"%s\"}",
                i, PinsInfo[i].pins,
                PinsConf[i].dvalue, PinsConf[i].pwm, PinsConf[i].pwmmax,
                PinsConf[i].ponr, PinsConf[i].onoff, esc_info);
            break;

        case 10: /* SECURITY */
            CHUNK_SEND_FMT(c, &first,
                "{\"id\":%d,\"pin\":\"%s\",\"type\":\"SECURITY\","
                "\"ptype\":%d,\"onoff\":%d,\"info\":\"%s\"}",
                i, PinsInfo[i].pins,
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

/* ─── /api/state/button (Keep-Alive polling) ─── */
/* ─── /api/state/button (Keep-Alive polling) ─── */
void handle_buttons(struct mg_connection *c) {

    int pos = 0;

    /* ── Заголовок JSON ── */
    pos += snprintf(g_body + pos, sizeof(g_body) - pos,
        "{\"lang\":\"%s\",\"buttons\":[", SetSettings.lang);

    bool first = true;

    /* ── Массив buttons ── */
    for (int i = 0; i < NUMPIN; i++) {
        if (PinsConf[i].topin != 1) continue;

        int remaining = (int)sizeof(g_body) - pos;
        if (remaining < 700) {  // 700 — максимум одной кнопки (3 строки × 200 + фикс.)
            MG_ERROR(("buttons: OVERFLOW at pin %d, pos=%d remaining=%d",
                      i, pos, remaining));
            break;
        }

        char esc_info[64], esc_sc[200], esc_dc[200], esc_lp[200];
        json_escape_str(esc_sc,   PinsConf[i].sclick, sizeof(esc_sc));
        json_escape_str(esc_dc,   PinsConf[i].dclick, sizeof(esc_dc));
        json_escape_str(esc_lp,   PinsConf[i].lpress, sizeof(esc_lp));
        json_escape_str(esc_info, PinsConf[i].info,   sizeof(esc_info));

        pos += snprintf(g_body + pos, sizeof(g_body) - pos,
            "%s{\"topin\":%d,\"id\":%d,\"pins\":\"%s\",\"ptype\":%d,"
            "\"sclick\":\"%s\",\"dclick\":\"%s\",\"lpress\":\"%s\","
            "\"pinact\":{},\"info\":\"%s\",\"onoff\":%d}",
            first ? "" : ",",
            PinsConf[i].topin, i, PinsInfo[i].pins,
            PinsConf[i].ptype,
            esc_sc, esc_dc, esc_lp, esc_info,
            PinsConf[i].onoff);

        first = false;
    }

    /* ── Закрываем JSON ── */
    pos += snprintf(g_body + pos, sizeof(g_body) - pos, "]}");

    /* ── Лог для контроля ── */
    MG_DEBUG(("buttons: len=%d buf=%d", pos, (int)sizeof(g_body)));

    /* ── Ответ с Content-Length → Keep-Alive работает ── */
    char extra[128];
    snprintf(extra, sizeof(extra), "%sETag: \"%lu\"\r\n",
             s_json_header, (unsigned long)g_ver_button);

    mg_http_reply(c, 200, extra, "%s", g_body);
    /* НЕТ c->is_draining = 1 — соединение остаётся живым! */
}

/* ─── /api/state/switch (Keep-Alive polling) ─── */
void handle_switches(struct mg_connection *c) {

    int pos = 0;

    /* ── Заголовок JSON ── */
    pos += snprintf(g_body + pos, sizeof(g_body) - pos,
        "{\"lang\":\"%s\",\"switches\":[", SetSettings.lang);

    bool first = true;

    /* ── Массив switches ── */
    for (int i = 0; i < NUMPIN; i++) {
        if (PinsConf[i].topin != 3) continue;

        int remaining = (int)sizeof(g_body) - pos;
        if (remaining < 150) {
            MG_ERROR(("switches: OVERFLOW at pin %d, pos=%d remaining=%d",
                      i, pos, remaining));
            break;
        }

        char esc_info[64];
        json_escape_str(esc_info, PinsConf[i].info, sizeof(esc_info));

        pos += snprintf(g_body + pos, sizeof(g_body) - pos,
            "%s{\"topin\":%d,\"id\":%d,\"pins\":\"%s\",\"ptype\":%d,"
            "\"pinact\":{},\"info\":\"%s\",\"onoff\":%d}",
            first ? "" : ",",
            PinsConf[i].topin, i, PinsInfo[i].pins,
            PinsConf[i].ptype, esc_info, PinsConf[i].onoff);

        first = false;
    }

    /* ── Массив pintopin ── */
    pos += snprintf(g_body + pos, sizeof(g_body) - pos, "],\"pintopin\":[");
    first = true;

    for (int i = 0; i < NUMPINLINKS; i++) {
        int remaining = (int)sizeof(g_body) - pos;
        if (remaining < 80) {
            MG_ERROR(("switches: OVERFLOW at pintopin %d, pos=%d remaining=%d",
                      i, pos, remaining));
            break;
        }

        pos += snprintf(g_body + pos, sizeof(g_body) - pos,
            "%s{\"idin\":%d,\"idout\":%d,\"pins\":\"%s\"}",
            first ? "" : ",",
            PinsLinks[i].idin, PinsLinks[i].idout, PinsLinks[i].pins);

        first = false;
    }

    /* ── Закрываем JSON ── */
    pos += snprintf(g_body + pos, sizeof(g_body) - pos, "]}");

    /* ── Лог для контроля ── */
    MG_DEBUG(("switches: len=%d buf=%d", pos, (int)sizeof(g_body)));

    /* ── Ответ с Content-Length → Keep-Alive работает ── */
    char extra[128];
    snprintf(extra, sizeof(extra), "%sETag: \"%lu\"\r\n",
             s_json_header, (unsigned long)g_ver_switch);

    mg_http_reply(c, 200, extra, "%s", g_body);
    /* НЕТ c->is_draining = 1 — соединение остаётся живым! */
}

/* ─── /api/state/encoder (Keep-Alive polling) ─── */
void handle_encoders(struct mg_connection *c) {

    int pos = 0;

    /* ── Заголовок JSON ── */
    pos += snprintf(g_body + pos, sizeof(g_body) - pos,
        "{\"lang\":\"%s\",\"encoders\":[", SetSettings.lang);

    bool first = true;

    /* ── Массив encoders ── */
    for (int i = 0; i < NUMPIN; i++) {
        if (PinsConf[i].topin != 8) continue;

        /* ── Encoder B pin ── */
        uint8_t encoderb_id = PinsConf[i].encoderb;
        if (encoderb_id == 0 || encoderb_id > NUMPIN) encoderb_id = 255;
        const char *encb_pin = (encoderb_id != 255 && encoderb_id < NUMPIN)
            ? PinsInfo[encoderb_id].pins : "";

        /* ── PWM параметры через PinsLinks ── */
        int pwm_dvalue = 0, pwm_freq = 0, pwm_max = 0;
        for (int j = 0; j < NUMPIN; j++) {
            if (PinsConf[j].topin != 5) continue;
            for (int k = 0; k < NUMPINLINKS; k++) {
                if (PinsLinks[k].idin == i && PinsLinks[k].idout == j) {
                    pwm_dvalue = PinsConf[j].dvalue;
                    pwm_freq   = PinsConf[j].pwm;
                    pwm_max    = PinsConf[j].pwmmax;
                    break;
                }
            }
        }

        /* ── pinact — стековый буфер, собирается локально ── */
        char pinact[256];
        int pa_off   = 0;
        int pa_first = 1;
        for (int j = 0; j < NUMPIN; j++) {
            if (PinsConf[j].topin != 5) continue;
            for (int k = 0; k < NUMPINLINKS; k++) {
                if (PinsLinks[k].idin == i && PinsLinks[k].idout == j
                    && PinsLinks[k].pins[0] != '\0') {
                    pa_off += snprintf(pinact + pa_off, sizeof(pinact) - pa_off,
                        "%s\"%s\":%d",
                        pa_first ? "" : ",",
                        PinsLinks[k].pins, PinsLinks[k].idout);
                    pa_first = 0;
                }
            }
        }
        if (pa_off >= (int)sizeof(pinact)) pa_off = sizeof(pinact) - 1;
        pinact[pa_off] = '\0';

        char esc_info[64];
        json_escape_str(esc_info, PinsConf[i].info, sizeof(esc_info));

        /* ── Проверка остатка буфера перед записью слота ── */
        int remaining = (int)sizeof(g_body) - pos;
        if (remaining < 400) {  // 400 — максимум одного encoder-слота с pinact
            MG_ERROR(("encoders: OVERFLOW at pin %d, pos=%d remaining=%d",
                      i, pos, remaining));
            break;
        }

        pos += snprintf(g_body + pos, sizeof(g_body) - pos,
            "%s{\"topin\":%d,\"id\":%d,\"pins\":\"%s\","
            "\"encoderb\":%d,\"encdrbpin\":\"%s\","
            "\"dvalue\":%d,\"pwm\":%d,\"pwmmax\":%d,\"ponr\":%d,"
            "\"pinact\":{%s},\"info\":\"%s\",\"onoff\":%d}",
            first ? "" : ",",
            PinsConf[i].topin, i, PinsInfo[i].pins,
            encoderb_id, encb_pin,
            pwm_dvalue, pwm_freq, pwm_max,
            PinsConf[i].ponr,
            pinact, esc_info, PinsConf[i].onoff);

        first = false;
    }

    /* ── Массив pintopin ── */
    pos += snprintf(g_body + pos, sizeof(g_body) - pos, "],\"pintopin\":[");
    first = true;

    for (int i = 0; i < NUMPINLINKS; i++) {
        int remaining = (int)sizeof(g_body) - pos;
        if (remaining < 80) {
            MG_ERROR(("encoders: OVERFLOW at pintopin %d, pos=%d remaining=%d",
                      i, pos, remaining));
            break;
        }

        pos += snprintf(g_body + pos, sizeof(g_body) - pos,
            "%s{\"idin\":%d,\"idout\":%d,\"pins\":\"%s\"}",
            first ? "" : ",",
            PinsLinks[i].idin, PinsLinks[i].idout, PinsLinks[i].pins);

        first = false;
    }

    /* ── Закрываем JSON ── */
    pos += snprintf(g_body + pos, sizeof(g_body) - pos, "]}");

    /* ── Лог для контроля ── */
    MG_DEBUG(("encoders: len=%d buf=%d", pos, (int)sizeof(g_body)));

    /* ── Ответ с Content-Length → Keep-Alive работает ── */
    char extra[128];
    snprintf(extra, sizeof(extra), "%sETag: \"%lu\"\r\n",
             s_json_header, (unsigned long)g_ver_encoder);

    mg_http_reply(c, 200, extra, "%s", g_body);
    /* НЕТ c->is_draining = 1 — соединение остаётся живым! */
}

/* ─── /api/state/pid (Keep-Alive polling) ─── */
static void handle_pid(struct mg_connection *c) {

    int pos = 0;

    /* ── Заголовок JSON ── */
    pos += snprintf(g_body + pos, sizeof(g_body) - pos,
        "{\"lang\":\"%s\",\"pidline\":%d,\"pid\":[",
        SetSettings.lang, SetSettings.pidline);

    bool first = true;

    for (int i = 0; i < PID_MAX_SLOTS; i++) {

        const char *pin_name = "";
        uint8_t pin_id = PidConf[i].pwm_pin_id;
        int duty = 0;

        if (pin_id > 0 && pin_id < NUMPIN) {
            pin_name = PinsInfo[pin_id].pins;
            duty     = PinsConf[pin_id].dvalue;
        }

        char esc_info[64];
        json_escape_str(esc_info, PidConf[i].info, sizeof(esc_info));

        /* Проверка — остаток буфера перед записью слота */
        int remaining = (int)sizeof(g_body) - pos;
        if (remaining < 350) {  // 350 — максимум одного PID-слота
            MG_ERROR(("pid: OVERFLOW at slot %d, pos=%d remaining=%d",
                      i, pos, remaining));
            break;  // JSON будет неполным но не битым — закроем массив ниже
        }

        char s_ts[16]; fmt_float(s_ts, sizeof(s_ts), PidConf[i].tmpset, 1);
        char s_tc[16]; fmt_float(s_tc, sizeof(s_tc), PidConf[i].tmpcur, 1);
        pos += snprintf(g_body + pos, sizeof(g_body) - pos,
            "%s{\"id\":%d,\"pins\":\"%s\",\"pinact\":{\"%s\":%d},"
            "\"selsens\":\"%s\",\"sernum\":\"%s\",\"presets\":\"%u\","
            "\"tmpset\":\"%s\",\"tmpcur\":\"%s\","
            "\"duty\":%d,\"info\":\"%s\",\"onoff\":%d,"
            "\"tune_state\":%u,\"tune_progress\":%u}",
            first ? "" : ",",
            i + 1, pin_name,
            pin_name, pin_id,
            PidConf[i].selsens == 1 ? "1" : "2",
            PidConf[i].sernum,
            PidConf[i].preset,
            s_ts, s_tc,
            duty,
            esc_info,
            PidConf[i].onoff,
            PidConf[i].tune_state, PidConf[i].tune_progress);

        first = false;
    }

    /* ── Закрываем JSON ── */
    pos += snprintf(g_body + pos, sizeof(g_body) - pos, "]}");

    /* ── Лог для контроля ── */
    MG_DEBUG(("pid: len=%d buf=%d", pos, (int)sizeof(g_body)));

    /* ── Ответ с Content-Length → Keep-Alive работает ── */
    char extra[128];
    snprintf(extra, sizeof(extra), "%sETag: \"%lu\"\r\n",
             s_json_header, (unsigned long)g_ver_pid);

    mg_http_reply(c, 200, extra, "%s", g_body);
    /* НЕТ c->is_draining = 1 — соединение остаётся живым! */
}

/* ─── /api/state/security (Keep-Alive polling) ─── */
static void handle_security(struct mg_connection *c) {

    int pos = 0;

    /* ── Заголовок JSON ── */
    char esc_info[64];
    json_escape_str(esc_info, PinsConf[1].info, sizeof(esc_info));

    pos += snprintf(g_body + pos, sizeof(g_body) - pos,
        "{\"lang\":\"%s\",\"sim800l\":%d,\"tel\":\"%s\","
        "\"info\":\"%s\",\"onoff\":%d,\"pins\":[",
        SetSettings.lang, SetSettings.sim800l, SetSettings.tel,
        esc_info, PinsConf[1].onoff);

    bool first = true;

    /* ── Массив security pins ── */
    for (int i = 0; i < NUMPIN; i++) {
        if (PinsConf[i].topin != 10) continue;

        int remaining = (int)sizeof(g_body) - pos;
        if (remaining < 200) {
            MG_ERROR(("security: OVERFLOW at pin %d, pos=%d remaining=%d",
                      i, pos, remaining));
            break;
        }

        const char *action   = PinsConf[i].sclick[0]   ? PinsConf[i].sclick   : "None";
        const char *send_sms = PinsConf[i].send_sms[0] ? PinsConf[i].send_sms : "NO";

        char esc_info2[64];
        json_escape_str(esc_info2, PinsConf[i].info, sizeof(esc_info2));

        pos += snprintf(g_body + pos, sizeof(g_body) - pos,
            "%s{\"topin\":%d,\"id\":%d,\"pins\":\"%s\",\"ptype\":%d,"
            "\"action\":\"%s\",\"send_sms\":\"%s\","
            "\"info\":\"%s\",\"onoff\":%d}",
            first ? "" : ",",
            PinsConf[i].topin, i, PinsInfo[i].pins, PinsConf[i].ptype,
            action, send_sms, esc_info2, PinsConf[i].onoff);

        first = false;
    }

    /* ── Закрываем JSON ── */
    pos += snprintf(g_body + pos, sizeof(g_body) - pos, "]}");

    /* ── Лог для контроля ── */
    MG_DEBUG(("security: len=%d buf=%d", pos, (int)sizeof(g_body)));

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
    pos += snprintf(g_body + pos, sizeof(g_body) - pos, "{\"ds18b20\":[");

    bool first = true;

    for (int i = 0; i < MAX_DS18B20_P; i++) {
        if (ds18b20[i].typsensr != 1) continue;
        for (int j = 0; j < ds18b20[i].numsens && j < MAX_DS18B20_PER_PIN; j++) {
            if (!ds18b20[i].sensors[j].valid) continue;

            int remaining = (int)sizeof(g_body) - pos;
            if (remaining < 80) {
                MG_ERROR(("sensors: OVERFLOW at DS18B20 [%d][%d], pos=%d remaining=%d",
                          i, j, pos, remaining));
                goto close_ds18b20;
            }

            const uint8_t *a = ds18b20[i].sensors[j].addr;
            char s_t[16]; fmt_float(s_t, sizeof(s_t), ds18b20[i].sensors[j].temp, 2);
            pos += snprintf(g_body + pos, sizeof(g_body) - pos,
                "%s{\"addr\":\"%02X%02X%02X%02X%02X%02X%02X%02X\",\"temp\":%s}",
                first ? "" : ",",
                a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7],
                s_t);
            first = false;
        }
    }

close_ds18b20:
    /* ── Массив dht22 ── */
    pos += snprintf(g_body + pos, sizeof(g_body) - pos, "],\"dht22\":[");
    first = true;

    for (int i = 0; i < MAX_DHT22_P; i++) {
        if (dht22[i].typsensr != 2 || !dht22[i].valid) continue;

        int remaining = (int)sizeof(g_body) - pos;
        if (remaining < 60) {
            MG_ERROR(("sensors: OVERFLOW at DHT22 [%d], pos=%d remaining=%d",
                      i, pos, remaining));
            break;
        }

        char s_t[16]; fmt_float(s_t, sizeof(s_t), dht22[i].temp, 2);
        char s_h[16]; fmt_float(s_h, sizeof(s_h), dht22[i].humid, 2);
        pos += snprintf(g_body + pos, sizeof(g_body) - pos,
            "%s{\"id\":%d,\"temp\":%s,\"humidity\":%s}",
            first ? "" : ",",
            dht22[i].id, s_t, s_h);
        first = false;
    }

    /* ── Закрываем JSON ── */
    pos += snprintf(g_body + pos, sizeof(g_body) - pos, "]}");

    /* ── Лог для контроля ── */
    MG_DEBUG(("sensors: len=%d buf=%d", pos, (int)sizeof(g_body)));

    /* ── Ответ с Content-Length → Keep-Alive работает ── */
    char extra[128];
    snprintf(extra, sizeof(extra), "%sETag: \"%lu\"\r\n",
             s_json_header, (unsigned long)g_ver_sensors);

    mg_http_reply(c, 200, extra, "%s", g_body);
    /* НЕТ c->is_draining = 1 — соединение остаётся живым! */
}

/* ─── /api/state/common ─── */
static void handle_common(struct mg_connection *c) {
    char b[320];
    char tbuf[256];
    char extra[160];
    parse_stm32time(tbuf, sizeof(tbuf), &SetSettings);
    unsigned long uptime = (unsigned long)(HAL_GetTick() / 1000);
    unsigned long heap = (unsigned long)xPortGetFreeHeapSize();

    snprintf(extra, sizeof(extra),
        "Content-Type: application/json\r\n"
        "Cache-Control: no-cache\r\n"
        "ETag: \"%lu\"\r\n",
        (unsigned long)g_ver_common);
    snprintf(b, sizeof(b),
        "{\"uptime\":%lu,\"heap\":%lu,\"ip\":\"%s\",\"gsm\":\"%s\",\"time\":%s}",
        uptime, heap, "0.0.0.0", "ok", tbuf);
    mg_http_reply(c, 200, extra, "%s", b);
}

/* ─── /api/state/onewire (Keep-Alive polling) ─── */
static void handle_onewire(struct mg_connection *c) {

    int pos = 0;

    /* ── Заголовок JSON ── */
    pos += snprintf(g_body + pos, sizeof(g_body) - pos,
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
            if (ds18b20[j].id != i || ds18b20[j].typsensr != 1) continue;
            snsr_fnd = true;

            int remaining = (int)sizeof(g_body) - pos;
            if (remaining < 128) {
                MG_ERROR(("onewire: OVERFLOW before DS18B20 pin %d, pos=%d", i, pos));
                goto close_json;
            }

            pos += snprintf(g_body + pos, sizeof(g_body) - pos,
                "%s{\"id\":%d,\"pin\":\"%s\",\"typsensr\":%d,"
                "\"numsens\":%d,\"onoff\":%d,\"sensors\":[",
                first_pin ? "" : ",",
                ds18b20[j].id, ds18b20[j].pin, ds18b20[j].typsensr,
                ds18b20[j].numsens, ds18b20[j].onoff);
            first_pin = false;

            bool first_sens = true;
            for (int k = 0; k < ds18b20[j].numsens && k < MAX_DS18B20_PER_PIN; k++) {

                remaining = (int)sizeof(g_body) - pos;
                if (remaining < 250) {
                    MG_ERROR(("onewire: OVERFLOW at DS18B20 sensor %d pin %d, pos=%d",
                              k, i, pos));
                    break;
                }

                char esc_info[64];
                json_escape_str(esc_info, ds18b20[j].sensors[k].info, sizeof(esc_info));

                char s_t[16];   fmt_float(s_t,  sizeof(s_t),  ds18b20[j].sensors[k].temp, 4);
                char s_ut[16];  fmt_float(s_ut, sizeof(s_ut), ds18b20[j].sensors[k].upt,  2);
                char s_lt[16];  fmt_float(s_lt, sizeof(s_lt), ds18b20[j].sensors[k].lowt, 2);
                pos += snprintf(g_body + pos, sizeof(g_body) - pos,
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

            pos += snprintf(g_body + pos, sizeof(g_body) - pos, "]}");
        }

        /* ── DHT22 ── */
        for (int j = 0; j < MAX_DHT22_P && !snsr_fnd; j++) {
            if (dht22[j].id != i || dht22[j].typsensr != 2) continue;
            snsr_fnd = true;

            int remaining = (int)sizeof(g_body) - pos;
            if (remaining < 400) {
                MG_ERROR(("onewire: OVERFLOW before DHT22 pin %d, pos=%d", i, pos));
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
            pos += snprintf(g_body + pos, sizeof(g_body) - pos,
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
                dht22[j].id, dht22[j].pin, dht22[j].typsensr,
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
            int remaining = (int)sizeof(g_body) - pos;
            if (remaining < 100) {
                MG_ERROR(("onewire: OVERFLOW before no-sensor pin %d, pos=%d", i, pos));
                goto close_json;
            }
            pos += snprintf(g_body + pos, sizeof(g_body) - pos,
                "%s{\"id\":%d,\"pin\":\"%s\",\"typsensr\":0,"
                "\"numsens\":0,\"info\":\"No active sensors found\",\"onoff\":0}",
                first_pin ? "" : ",",
                i, PinsInfo[i].pins);
            first_pin = false;
        }
    }

    /* ── OneWire пинов нет вообще ── */
    if (!owfound) {
        pos += snprintf(g_body + pos, sizeof(g_body) - pos,
            "{\"id\":0,\"pin\":\"N/A\",\"typsensr\":0,"
            "\"numsens\":0,\"info\":\"No OneWire pins found\",\"onoff\":0}");
    }

close_json:
    /* ── Закрываем JSON ── */
    pos += snprintf(g_body + pos, sizeof(g_body) - pos, "]}");

    /* ── Лог для контроля ── */
    MG_DEBUG(("onewire: len=%d buf=%d", pos, (int)sizeof(g_body)));

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

    // Подключение упакованной файловой системы
    mg_mem_files = mg_packed_files;

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
        bool cert_ok = https_get_tls_cert(s_tls_cert, sizeof(s_tls_cert));
        bool key_ok  = https_get_tls_key(s_tls_key, sizeof(s_tls_key));
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
