/**
 * @file slzb_watchdog.c
 * @brief Watchdog автовосстановления связи со шлюзом SLZB-06p7U (см. .h).
 *
 * Дизайн-ограничения:
 *  - весь модуль крутится в контексте WebServerTask (тот же mg_mgr);
 *  - никакой динамической памяти: только статики (~100 B .bss);
 *  - логи идут через LOG_MQTT с префиксом "[SLZB-WD]" (категория MQTT
 *    в Global Settings), в один UART-поток с логами брокера "[server]".
 */
#include "slzb_watchdog.h"
#include "mqtt_server.h"
#include "logger.h"
#include <string.h>
#include <stdio.h>

#define WD_LOG(...) LOG_MQTT(__VA_ARGS__)

/* Host шлюза (снимок из SetSettings.slzb_host на момент старта, как и
 * креды брокера — изменение требует перезагрузки). Пусто = выключен. */
static char s_slzb_host[16]             = {0};
static uint32_t s_disconnected_since_ms = 0;  /* 0 = SLZB подключён, таймер не идёт */
static uint32_t s_last_trigger_ms       = 0;  /* момент последнего reboot-запроса */
static uint32_t s_req_start_ms          = 0;  /* момент отправки запроса (таймаут) */
static uint8_t  s_have_last_trigger     = 0;
static uint8_t  s_trigger_pending       = 0;  /* HTTP-запрос сейчас в полёте */
static struct mg_connection *s_req_conn = NULL; /* коннект запроса (для таймаута) */

/* ---------- HTTP-callback reboot-запроса ---------- */
static void slzb_reboot_cb(struct mg_connection *c, int ev, void *ev_data) {
  if (ev == MG_EV_CONNECT) {
    /* Команда кнопки "Reboot" веб-панели SLZB-OS: /api2?action=4&cmd=3 */
    mg_printf(c,
              "GET /api2?action=4&cmd=3 HTTP/1.1\r\n"
              "Host: %s\r\n"
              "Connection: close\r\n\r\n",
              s_slzb_host);
  } else if (ev == MG_EV_HTTP_MSG) {
    struct mg_http_message *hm = (struct mg_http_message *) ev_data;
    WD_LOG("[SLZB-WD] reboot response: status=%d body='%.*s'\r\n",
           mg_http_status(hm), (int) hm->body.len, hm->body.buf);
    s_trigger_pending = 0;
    s_req_conn = NULL;
    c->is_closing = 1;
  } else if (ev == MG_EV_ERROR) {
    WD_LOG("[SLZB-WD] reboot request failed: %s\r\n", (char *) ev_data);
    s_trigger_pending = 0;
    s_req_conn = NULL;
  } else if (ev == MG_EV_CLOSE) {
    s_trigger_pending = 0;
    s_req_conn = NULL;
  }
}

/* ---------- Публичные функции ---------- */

void slzb_watchdog_init(const char *slzb_host) {
  if (slzb_host == NULL || slzb_host[0] == '\0') {
    WD_LOG("[SLZB-WD] init: host empty, watchdog disabled\r\n");
    s_slzb_host[0] = '\0';
    return;
  }
  strncpy(s_slzb_host, slzb_host, sizeof(s_slzb_host) - 1);
  s_slzb_host[sizeof(s_slzb_host) - 1] = '\0';
  s_disconnected_since_ms = mg_millis();  /* отсчёт 40с стартует сразу после старта брокера */
  s_last_trigger_ms      = 0;
  s_req_start_ms         = 0;
  s_have_last_trigger    = 0;
  s_trigger_pending      = 0;
  s_req_conn             = NULL;
  WD_LOG("[SLZB-WD] armed for host %s (wait=%lus, cooldown=%lus)\r\n",
         s_slzb_host,
         (unsigned long) (SLZB_WD_WAIT_MS / 1000u),
         (unsigned long) (SLZB_WD_COOLDOWN_MS / 1000u));
}

static void slzb_watchdog_trigger(struct mg_mgr *mgr) {
  char url[48];
  struct mg_connection *req;

  if (s_slzb_host[0] == '\0' || s_trigger_pending) return;

  /* "http://" + до 15 символов IP + "/" + запас под '\0' */
  if (snprintf(url, sizeof(url), "http://%s/", s_slzb_host) >= (int) sizeof(url)) {
    return;
  }
  WD_LOG("[SLZB-WD] no SLZB subscription for >%lus, triggering reboot on %s\r\n",
         (unsigned long) (SLZB_WD_WAIT_MS / 1000u), s_slzb_host);

  req = mg_http_connect(mgr, url, slzb_reboot_cb, NULL);
  if (req == NULL) {
    WD_LOG("[SLZB-WD] mg_http_connect() failed\r\n");
    return;
  }
  s_req_conn         = req;   /* для страховки по таймауту (см. poll) */
  s_trigger_pending  = 1;
  s_req_start_ms     = mg_millis();
  s_last_trigger_ms  = s_req_start_ms;
  s_have_last_trigger = 1;
  /* Таймер ожидания сбрасываем вместе с таймером срабатывания — благодаря
   * этому 60с cooldown естественно доминирует над 40с ожидания, и
   * повторная попытка не может случиться раньше чем через минуту. */
  s_disconnected_since_ms = s_req_start_ms;
}

void slzb_watchdog_poll(struct mg_mgr *mgr) {
  uint32_t now;

  if (s_slzb_host[0] == '\0') return;   /* watchdog выключен (host пустой) */

  /* Страховка: зависший HTTP-запрос (шлюз не отвечает и не закрывает
   * соединение) не должен заклинить watchdog. По таймауту закрываем
   * коннект — MG_EV_CLOSE сам сбросит s_trigger_pending. */
  if (s_trigger_pending && s_req_conn != NULL) {
    now = mg_millis();
    if (now - s_req_start_ms > SLZB_WD_HTTP_TIMEOUT_MS) {
      WD_LOG("[SLZB-WD] reboot request timeout (%lums), aborting\r\n",
             (unsigned long) (now - s_req_start_ms));
      s_req_conn->is_closing = 1;
      s_req_conn = NULL;
      s_trigger_pending = 0;
    }
  }

  if (mqtt_server_slzb_connected()) {
    s_disconnected_since_ms = 0;        /* связь есть — таймер выключен */
    return;
  }

  if (s_disconnected_since_ms == 0) {
    s_disconnected_since_ms = mg_millis();  /* только что отвалились */
    return;
  }

  now = mg_millis();
  if (now - s_disconnected_since_ms < SLZB_WD_WAIT_MS) return;   /* ещё рано */
  if (s_trigger_pending) return;                                 /* запрос в полёте */
  if (s_have_last_trigger &&
      (now - s_last_trigger_ms < SLZB_WD_COOLDOWN_MS)) return;   /* cooldown */

  slzb_watchdog_trigger(mgr);
}
