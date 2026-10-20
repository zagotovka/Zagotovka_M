/**
 * @file net_limits.h
 * @brief Единый бюджет сетевых соединений (HTTP/HTTPS + MQTT-сервер + MQTT-клиент)
 *        и защита FreeRTOS heap от просадок при TLS-handshake.
 *
 * Зачем: каждая TLS-связь на этом MCU стоит ~6 КБ heap + ~150 мс CPU (x25519 +
 * ECDSA), поэтому пачка параллельных handshake (мобильный браузер открывает
 * до 6 сокетов) просаживала "FreeRTOS min ever" до 32-38 КБ.
 *
 * Все пороги — макросы: правятся здесь, без поиска по net.c / mqtt_server.c.
 *
 * Уровни защиты (от дешёвого к дорогому):
 *   1. SYN-фильтр (mongoose.c, mg_tcpip_syn_filter): SYN молча отбрасывается ДО
 *      выделения mg_connection. Клиент ретранслирует SYN через 1 с / 3 с / 7 с —
 *      для браузера это просто "соединение чуть позже", а не ошибка.
 *   2. MG_EV_ACCEPT: если лимит всё же превышен (гонка) — TCP RST ДО mg_tls_init().
 *   3. MG_EV_POLL: handshake, не завершившийся за NET_HS_TIMEOUT_MS, закрывается.
 */
#ifndef NET_LIMITS_H
#define NET_LIMITS_H

#include "mongoose.h"

#ifdef __cplusplus
extern "C" {
#endif

/* ── Handshake ───────────────────────────────────────────────────────────── */
/* Одновременных TLS-handshake (входящих И исходящих, напр. mqtts://): ВСЕГДА 1. */
#define NET_HS_MAX_PARALLEL      1
/* Handshake, не завершившийся за это время, считается зависшим и закрывается.
 * 3 с с запасом покрывает LTE (RTT 100-300 мс) и не держит единственный
 * слот handshake занятым "тихим" сокетом (preconnect, сканер). */
#define NET_HS_TIMEOUT_MS        3000u

/* ── Пороги FreeRTOS heap (байт) ─────────────────────────────────────────── */
/* Не начинаем TLS-handshake, если свободно меньше (RST / drop SYN). */
#define NET_HEAP_HS_MIN          (30u * 1024u)
/* ... или если самый большой свободный блок меньше (фрагментация). */
#define NET_HEAP_LARGEST_MIN     (12u * 1024u)
/* Порог для соединений без TLS (HTTP :8000, MQTT-сервер, MQTT-клиент). */
#define NET_HEAP_CONN_MIN        (20u * 1024u)

/* ── Бюджет соединений (listener'ы и UDP не считаются) ───────────────────── */
/* Всего TCP-соединений: web + MQTT-сервер + MQTT-клиент. */
#define NET_TOTAL_CONNS_MAX      8
/* Web (HTTP+HTTPS, включая handshake): жёсткий максимум. */
#define NET_WEB_CONNS_MAX        3
/* Не более N web-соединений с одного IP: один браузер с 6 сокетами не вытеснит
 * второе устройство (ноут + телефон + планшет работают одновременно). */
#define NET_WEB_PER_IP_MAX       2
/* Резерв под web: MQTT (сервер+клиент) суммарно не может занять последние
 * NET_WEB_RESERVED слотов. Гарантия: одна web-сессия (1 established + 1 новый
 * handshake) всегда помещается, что бы ни подключили по MQTT. */
#define NET_WEB_RESERVED         2

/* ── Keep-alive политика web ─────────────────────────────────────────────── */
/* Единственное web-соединение держим долго (опрос идёт по keep-alive,
 * новый handshake дорог); при >1 соединении лишние закрываем быстро. */
#define NET_WEB_IDLE_SOLO_MS     20000u
#define NET_WEB_IDLE_EXTRA_MS    5000u

/* ── Типы соединений (fn_data), ставятся в MG_EV_ACCEPT ──────────────────── */
#define CONN_TYPE_HTTP           1
#define CONN_TYPE_HTTPS          2
#define CONN_TYPE_MQTT           3
#define CONN_TYPE_LISTENER       0xFF  /* не пересекается с HTTP/HTTPS/MQTT */

typedef struct {
  uint8_t hs_total;   /* TLS-handshake в процессе (входящие + исходящие)   */
  uint8_t web_est;    /* HTTP/HTTPS, handshake завершён                    */
  uint8_t web_hs;     /* HTTPS в handshake                                 */
  uint8_t mqtt_srv;   /* входящие MQTT (встроенный брокер)                 */
  uint8_t mqtt_out;   /* исходящие TCP (MQTT-клиент и пр.)                 */
  uint8_t same_ip;    /* web-соединений с тем же IP, что у rem             */
  struct mg_connection *idle_any;      /* самое старое простаивающее web  */
  struct mg_connection *idle_same_ip;  /* то же, но только с IP как rem   */
  struct mg_connection *hs_oldest;     /* самый старый web-handshake      */
  uint32_t hs_oldest_age;              /* его возраст, мс                 */
} net_census_t;

/* Пересчёт соединений. skip — соединение, которое не считаем (то, что сейчас
 * принимается); rem — адрес клиента для подсчёта per-IP (может быть NULL). */
void net_census(struct mg_mgr *mgr, const struct mg_connection *skip,
                const struct mg_addr *rem, net_census_t *out);

/* true, если свободно >= min_free И самый большой блок >= min_largest. */
bool net_heap_ok(uint32_t min_free, uint32_t min_largest);

/* Admission-проверки для MQTT (вызываются из mqtt_server.c / net.c). */
bool net_mqtt_srv_may_accept(struct mg_connection *c);
bool net_mqtt_cli_may_connect(struct mg_mgr *mgr, bool tls);

extern volatile uint32_t g_net_syn_drops;  /* SYN, отброшенные фильтром */
extern volatile uint32_t g_net_rejects;    /* RST после accept          */

/* SYN-фильтр для mongoose.c (см. mg_tcpip_syn_filter). */
bool net_syn_filter(struct mg_connection *lsn, size_t backlog_pending);

/* ── Расширения mongoose.c (помечены "[ZG]") ─────────────────────────────── */
/* Если не NULL и вернул false — SYN отбрасывается молча (mg_connection не
 * создаётся, память не тратится; клиент ретранслирует SYN). */
extern bool (*mg_tcpip_syn_filter)(struct mg_connection *lsn,
                                   size_t backlog_pending);
/* Немедленно закрыть TCP-соединение через RST (без FIN, без TLS-alert). */
void mg_tcpip_rst_conn(struct mg_connection *c);

#ifdef __cplusplus
}
#endif

#endif /* NET_LIMITS_H */
