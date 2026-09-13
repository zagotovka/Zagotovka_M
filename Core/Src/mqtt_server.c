/**
 * @file mqtt_server.c
 * @brief Экспериментальный встроенный MQTT-брокер (QoS 0, MQTT 3.1.1).
 *
 * Архитектура: свой listener (mg_mqtt_listen) в общем mgr WebServerTask.
 * Mongoose парсит входящие MQTT-пакеты (pfn = mqtt_cb из mongoose.c) и
 * диспатчит MG_EV_MQTT_CMD / MG_EV_MQTT_MSG в наш callback. Отдельная задача
 * не нужна — брокер крутится в той же задаче, что и mg_mgr_poll (Mongoose
 * не потокобезопасен между задачами без мьютекса).
 *
 * Память: таблица клиентов + копии usr/pswd выделяются ОДИН раз при старте
 * из DTCM-пула (bump-allocator, .bss проекта упирается в лимит — slack 164 B).
 * Никакой динамической аллокации на клиента — предсказуемая RAM.
 *
 * Все вызовы (init/poll/publish/callback) происходят в контексте WebServerTask.
 */
#include "mqtt_server.h"
#include "dtcm_alloc.h"
#include "db.h"
#include "logger.h"     /* LOG_MQTT + g_log_filter_mask (фильтр Global Settings) */
#include "main.h"        /* MqttRxMsg_t + mqttRxQueueHandle (Этап 3.3) */
#include "cmsis_os2.h"   /* osMessageQueueId_t */
#include "queue.h"       /* xQueueSend (FreeRTOS.h уже приходит через mongoose.h) */
#include <string.h>
#include <stdio.h>

extern struct dbSettings SetSettings;

/* ---------------------------------------------------------------------------
 * Диагностический лог сервера.
 *
 * ФИЛЬТР: SRV_LOG идёт через LOG_MQTT (logger.c), т.е. уважает галочку
 * "MQTT" на странице Global Settings: маска g_log_filter_mask проверяется
 * на месте вызова (дешёвое чтение volatile), а сама доставка — через
 * MessageBuffer в LoggerTask (не блокирует WebServerTask UART'ом).
 * Сообщения сохраняют текстовый префикс "[MQTTS]", чтобы отличать логи
 * встроенного брокера от логов MQTT-клиента (net.c/zagotovka.c).
 * В UART строка попадает в виде: "[MQTT] [MQTTS] heartbeat: ...".
 *
 * ВАЖНО про производительность:
 *  - SRV_LOG вызывается ТОЛЬКО в редких, событийных точках: CONNECT/DISCONNECT/
 *    reject/ошибки. Это единичные события за время жизни соединения.
 *  - SRV_LOG НИКОГДА не вызывается в hot-path фан-аута PUBLISH
 *    (mqtt_server_publish обходит до MQTT_SRV_MAX_CLIENTS_HARDCAP клиентов на
 *    КАЖДОЕ сообщение) — там только дешёвые инкременты счётчиков (s_stat_*),
 *    без единого printf.
 *  - mqtt_server_poll() дергается каждую итерацию WebServerTask (см. main.c),
 *    т.е. потенциально сотни раз в секунду. Единственный лог там —
 *    heartbeat, и он ЗАЩИЩЁН проверкой по тику ДО SRV_LOG, так что в
 *    подавляющем большинстве вызовов poll() это просто одно сравнение чисел
 *    (проверка маски фильтра не выполняется вовсе — она внутри heartbeat).
 *  - Если категория MQTT выключена в Global Settings, logger_send() станет
 *    no-op'ом (маска проверяется и в макросе, и внутри logger_send).
 *  - MQTT_SRV_DEBUG=0 полностью убирает весь SRV_LOG на этапе компиляции
 *    (макрос разворачивается в no-op) — можно выключить для продакшена без
 *    правки самого кода. */
#ifndef MQTT_SRV_DEBUG
#define MQTT_SRV_DEBUG 1
#endif
#if MQTT_SRV_DEBUG
#define SRV_LOG(...) LOG_MQTT(__VA_ARGS__)
#else
#define SRV_LOG(...) do {} while (0)
#endif

#define MQTT_SRV_HEARTBEAT_MS 30000u   /* heartbeat не чаще раза в 30с */

/* ---- Флаги CONNECT-пакета (MQTT 3.1.1) — продублированы локально,
 *      т.к. MQTT_HAS_* объявлены внутри mongoose.c ---- */
#define SRV_FLAG_USERNAME 0x80
#define SRV_FLAG_PASSWORD 0x40
#define SRV_FLAG_WILL     0x04

typedef struct {
    struct mg_connection *conn;   // NULL = слот свободен
    char subs[MQTT_SRV_MAX_SUBS_PER_CLIENT][MQTT_SRV_TOPIC_LEN];
    uint16_t keepalive_s;         // keepalive из CONNECT (0 = клиент не задал)
    uint8_t  num_subs;
    uint8_t  authenticated;       // CONNACK(0x00) отправлен
    uint32_t last_activity_ms;    // любой входящий трафик (MG_EV_READ)
} MqttSrvClient_t;

/* Указатели в .bss (~20 байт), сами данные — в DTCM */
static MqttSrvClient_t *s_cli = NULL;
static char *s_usr  = NULL;
static char *s_pswd = NULL;
static uint8_t s_cli_count = 0;
static uint8_t s_running = 0;

/* Счётчики за всё время работы (не сбрасываются между клиентами) — дают
 * представление "сервер вообще что-то делает?" без спама логами. */
static uint32_t s_stat_accepted   = 0;  /* успешных CONNECT */
static uint32_t s_stat_rejected   = 0;  /* отклонённых CONNECT (proto/auth/мусор) */
static uint32_t s_stat_rx_msgs    = 0;  /* принятых PUBLISH от клиентов */
static uint32_t s_stat_tx_msgs    = 0;  /* вызовов mqtt_server_publish() */
static uint32_t s_last_heartbeat_ms = 0;

/* ---------- мелкие парсеры ---------- */
static uint16_t srv_be16(const uint8_t *p) {
  return (uint16_t) (((uint16_t) p[0]) << 8 | p[1]);
}

/* Смещение конца varint, начиная с pos; возвращает 0 при неполном varint */
static size_t srv_varint_end(const uint8_t *d, size_t pos, size_t len) {
  size_t i;
  for (i = 0; i < 4 && pos + i < len; i++) {
    if (!(d[pos + i] & 0x80)) return pos + i + 1;
  }
  return 0;
}

/* ---------- Wildcard-матчинг: точное совпадение или "prefix/#" ---------- */
static bool srv_topic_match(const char *filter, const char *topic) {
  size_t flen = strlen(filter);
  if (flen == 1 && filter[0] == '#') return true;   // вся маска топиков
  if (flen >= 2 && filter[flen - 1] == '#' && filter[flen - 2] == '/') {
    return strncmp(filter, topic, flen - 1) == 0;   // префиксное совпадение
  }
  return strcmp(filter, topic) == 0;                // точное совпадение
}

static bool srv_match_any(const MqttSrvClient_t *cl, const char *topic) {
  for (uint8_t i = 0; i < cl->num_subs; i++) {
    if (srv_topic_match(cl->subs[i], topic)) return true;
  }
  return false;
}

/* ---------- Валидация фильтра подписки ----------
 * Поддерживаем только точное имя и "#" в конце ("/..."#").
 * "+" в середине отклоняем (0x80) — по плану первой версии. */
static uint8_t srv_filter_rc(const char *topic, size_t len) {
  if (topic[0] == '\0') return 0x80;
  if (len > MQTT_SRV_TOPIC_LEN - 1) return 0x80;
  for (size_t i = 0; i < len; i++) {
    if (topic[i] == '+') return 0x80;               // wildcard + не поддержан
    if (topic[i] == '#') {
      if (i != len - 1) return 0x80;                // '#' не в конце
      if (i > 0 && topic[i - 1] != '/') return 0x80;
      if (i == 0) return 0x00;                      // голый "#" — ok
    }
  }
  return 0x00;
}

/* ---------- Слоты ---------- */
static int srv_slot_alloc(struct mg_connection *c) {
  uint8_t limit = SetSettings.mqtt_srv_maxcli;
  if (limit == 0 || limit > MQTT_SRV_MAX_CLIENTS_HARDCAP) {
    limit = MQTT_SRV_MAX_CLIENTS_HARDCAP;
  }
  if (s_cli_count >= limit) return -1;
  for (int i = 0; i < MQTT_SRV_MAX_CLIENTS_HARDCAP; i++) {
    if (s_cli[i].conn == NULL) return i;
  }
  return -1;
}

static MqttSrvClient_t *srv_client(struct mg_connection *c) {
  uint8_t idx;
  if (s_cli == NULL || c == NULL) return NULL;
  memcpy(&idx, c->data, 1);
  if (idx >= MQTT_SRV_MAX_CLIENTS_HARDCAP) return NULL;
  if (s_cli[idx].conn != c) return NULL;
  return &s_cli[idx];
}

/* ---------- Ответы протокола ---------- */
static void srv_send_connack(struct mg_connection *c, uint8_t rc) {
  uint8_t body[2] = {0, rc};  // session present = 0, return code
  mg_mqtt_send_header(c, MQTT_CMD_CONNACK, 0, 2);
  mg_send(c, body, sizeof(body));
}

static void srv_send_suback(struct mg_connection *c, uint16_t pktid,
                            const uint8_t *codes, uint8_t n) {
  uint8_t id = (uint8_t) (pktid >> 8), id2 = (uint8_t) pktid;
  mg_mqtt_send_header(c, MQTT_CMD_SUBACK, 0, 2 + n);
  mg_send(c, &id, 1);
  mg_send(c, &id2, 1);
  mg_send(c, codes, n);
}

static void srv_send_unsuback(struct mg_connection *c, uint16_t pktid) {
  uint8_t body[2] = {(uint8_t) (pktid >> 8), (uint8_t) pktid};
  mg_mqtt_send_header(c, MQTT_CMD_UNSUBACK, 0, 2);
  mg_send(c, body, sizeof(body));
}

/* ---------- CONNECT: разбор и авторизация (только MQTT 3.1.1) ---------- */
static void srv_handle_connect(struct mg_connection *c,
                               const struct mg_mqtt_message *mm) {
  MqttSrvClient_t *cl = srv_client(c);
  const uint8_t *d = (const uint8_t *) mm->dgram.buf;
  size_t len = mm->dgram.len, off, plen;
  uint8_t level, flags;

  if (cl == NULL) return;
  if (len < 12) {                                   // мусор вместо CONNECT
    SRV_LOG("[MQTTS] reject: CONNECT too short (%u B)\r\n", (unsigned) len);
    s_stat_rejected++;
    c->is_closing = 1; return;
  }

  off = 1;                                          // за байт заголовка
  {
    size_t ve = srv_varint_end(d, off, len);
    if (ve == 0) {
      SRV_LOG("[MQTTS] reject: bad remaining-length varint\r\n");
      s_stat_rejected++;
      c->is_closing = 1; return;
    }
    off = ve;
  }
  if (off + 10 > len) {
    SRV_LOG("[MQTTS] reject: CONNECT truncated (fixed header)\r\n");
    s_stat_rejected++;
    c->is_closing = 1; return;
  }

  plen = srv_be16(d + off); off += 2;
  if (off + plen + 4 > len) {
    SRV_LOG("[MQTTS] reject: CONNECT truncated (protocol name)\r\n");
    s_stat_rejected++;
    c->is_closing = 1; return;
  }
  off += plen;                                      // "MQTT"/"MQIsdp"
  level = d[off++];
  flags = d[off++];

  if (level != 4 && level != 3) {                   // v3.1.1 / v3.1 only
    SRV_LOG("[MQTTS] reject: unsupported protocol level=%u (клиент шлёт MQTT5?)\r\n",
            (unsigned) level);
    s_stat_rejected++;
    srv_send_connack(c, 0x01);                      // unacceptable protocol
    c->is_closing = 1;
    return;
  }

  cl->keepalive_s = srv_be16(d + off); off += 2;

  /* Payload: client id, [will], [user], [pass] */
  {
    uint16_t clen;
    if (off + 2 > len) {
      SRV_LOG("[MQTTS] reject: CONNECT truncated (client-id length)\r\n");
      s_stat_rejected++; c->is_closing = 1; return;
    }
    clen = srv_be16(d + off); off += 2;
    if (off + clen > len) {
      SRV_LOG("[MQTTS] reject: CONNECT truncated (client-id body)\r\n");
      s_stat_rejected++; c->is_closing = 1; return;
    }
    off += clen;
  }
  if (flags & SRV_FLAG_WILL) {
    uint16_t wl, ml;
    if (off + 2 > len) {
      SRV_LOG("[MQTTS] reject: CONNECT truncated (will-topic length)\r\n");
      s_stat_rejected++; c->is_closing = 1; return;
    }
    wl = srv_be16(d + off); off += 2 + wl;
    if (off + 2 > len) {
      SRV_LOG("[MQTTS] reject: CONNECT truncated (will-message length)\r\n");
      s_stat_rejected++; c->is_closing = 1; return;
    }
    ml = srv_be16(d + off); off += 2 + ml;
    if (off > len) {
      SRV_LOG("[MQTTS] reject: CONNECT truncated (will-message body)\r\n");
      s_stat_rejected++; c->is_closing = 1; return;
    }
  }
  if (flags & SRV_FLAG_USERNAME) {
    uint16_t ul;
    if (off + 2 > len) {
      SRV_LOG("[MQTTS] reject: CONNECT truncated (username length)\r\n");
      s_stat_rejected++; c->is_closing = 1; return;
    }
    ul = srv_be16(d + off); off += 2;
    if (off + ul > len) {
      SRV_LOG("[MQTTS] reject: CONNECT truncated (username body)\r\n");
      s_stat_rejected++; c->is_closing = 1; return;
    }
    /* Проверка логина. НЕ печатаем сами значения — только длины, этого
     * достаточно чтобы понять что не так (опечатка/лишний пробел/не тот
     * логин), без утечки credentials в UART-лог. */
    if (s_usr[0] != '\0') {
      if (ul != strlen(s_usr) || memcmp(d + off, s_usr, ul) != 0) {
        SRV_LOG("[MQTTS] reject: bad username (got %u B, expected %u B)\r\n",
                (unsigned) ul, (unsigned) strlen(s_usr));
        s_stat_rejected++;
        srv_send_connack(c, 0x04);
        c->is_closing = 1;
        return;
      }
    }
    off += ul;
  } else if (s_usr[0] != '\0') {
    SRV_LOG("[MQTTS] reject: username required, но клиент не выставил флаг USERNAME\r\n");
    s_stat_rejected++;
    srv_send_connack(c, 0x05);                      // not authorized
    c->is_closing = 1;
    return;
  }
  if (flags & SRV_FLAG_PASSWORD) {
    uint16_t pw;
    if (off + 2 > len) {
      SRV_LOG("[MQTTS] reject: CONNECT truncated (password length)\r\n");
      s_stat_rejected++; c->is_closing = 1; return;
    }
    pw = srv_be16(d + off); off += 2;
    if (off + pw > len) {
      SRV_LOG("[MQTTS] reject: CONNECT truncated (password body)\r\n");
      s_stat_rejected++; c->is_closing = 1; return;
    }
    if (s_pswd[0] != '\0') {
      if (pw != strlen(s_pswd) || memcmp(d + off, s_pswd, pw) != 0) {
        SRV_LOG("[MQTTS] reject: bad password (got %u B, expected %u B)\r\n",
                (unsigned) pw, (unsigned) strlen(s_pswd));
        s_stat_rejected++;
        srv_send_connack(c, 0x04);
        c->is_closing = 1;
        return;
      }
    }
  } else if (s_pswd[0] != '\0') {
    SRV_LOG("[MQTTS] reject: password required, но клиент не выставил флаг PASSWORD\r\n");
    s_stat_rejected++;
    srv_send_connack(c, 0x05);
    c->is_closing = 1;
    return;
  }

  if (cl->authenticated) {                                // второй CONNECT
    SRV_LOG("[MQTTS] reject: duplicate CONNECT on already-authenticated conn\r\n");
    s_stat_rejected++;
    c->is_closing = 1; return;
  }
  cl->authenticated = 1;
  srv_send_connack(c, 0x00);
  s_stat_accepted++;
  SRV_LOG("[MQTTS] client accepted (%d/%d), keepalive=%us\r\n",
         s_cli_count, MQTT_SRV_MAX_CLIENTS_HARDCAP, cl->keepalive_s);
}

/* ---------- SUBSCRIBE / UNSUBSCRIBE ---------- */
static void srv_handle_subscribe(struct mg_connection *c,
                                 const struct mg_mqtt_message *mm) {
  MqttSrvClient_t *cl = srv_client(c);
  const uint8_t *d = (const uint8_t *) mm->dgram.buf;
  size_t len = mm->dgram.len, off;
  uint8_t codes[16];                                // максимум топиков в пакете
  uint8_t nsubs = 0;

  if (cl == NULL) return;
  {
    size_t ve = srv_varint_end(d, 1, len);
    if (ve == 0) {
      SRV_LOG("[MQTTS] reject: SUBSCRIBE bad remaining-length varint\r\n");
      c->is_closing = 1; return;
    }
    off = ve;
  }
  if (off + 2 > len) {
    SRV_LOG("[MQTTS] reject: SUBSCRIBE truncated (packet-id)\r\n");
    c->is_closing = 1; return;
  }
  off += 2;                                         /* FIX: пропустить 2B Packet Identifier */

  /* payload: [2B tlen][topic][1B qos]* — до конца пакета */
  while (off + 3 <= len && nsubs < 16) {
    uint16_t tlen = srv_be16(d + off);
    const char *topic = (const char *) d + off + 2;
    uint8_t rc = 0x00;
    if (off + 2 + tlen + 1 > len) break;            // битый пакет
    off += 2 + tlen + 1;                            // topic + qos

    if (cl->num_subs >= MQTT_SRV_MAX_SUBS_PER_CLIENT) {
      rc = 0x80;
    } else {
      rc = srv_filter_rc(topic, tlen);
    }
    if (rc == 0x00) {
      /* topic[0] != '\0' гарантирован srv_filter_rc */
      memcpy(cl->subs[cl->num_subs], topic, tlen);
      cl->subs[cl->num_subs][tlen] = '\0';
      cl->num_subs++;
      SRV_LOG("[MQTTS] sub '%.*s' (%d/%d)\r\n", (int) tlen, topic,
             cl->num_subs, MQTT_SRV_MAX_SUBS_PER_CLIENT);
    } else {
      SRV_LOG("[MQTTS] sub rejected '%.*s' (rc=0x%02x)\r\n",
             (int) tlen, topic, rc);
    }
    codes[nsubs++] = rc;
  }
  /* nsubs==0: битый пакет; off<len: лишние топики (>16) — закрываем.
   * Это ровно та точка, которая объясняет "accepted → closed (0 subs)"
   * без строки "client sent DISCONNECT" в логе: клиент прислал SUBSCRIBE,
   * который не распарсился (либо кривой топик, либо >16 фильтров разом). */
  if (nsubs == 0 || off < len) {
    SRV_LOG("[MQTTS] reject: malformed SUBSCRIBE payload (nsubs=%u, off=%u, len=%u)\r\n",
            (unsigned) nsubs, (unsigned) off, (unsigned) len);
    c->is_closing = 1; return;
  }
  srv_send_suback(c, mm->id, codes, nsubs);
}

static void srv_handle_unsubscribe(struct mg_connection *c,
                                   struct mg_mqtt_message *mm) {
  MqttSrvClient_t *cl = srv_client(c);
  const uint8_t *d = (const uint8_t *) mm->dgram.buf;
  size_t len = mm->dgram.len, off;
  uint8_t removed = 0;

  if (cl == NULL) return;
  {
    size_t ve = srv_varint_end(d, 1, len);
    if (ve == 0) {
      SRV_LOG("[MQTTS] reject: UNSUBSCRIBE bad remaining-length varint\r\n");
      c->is_closing = 1; return;
    }
    off = ve;
  }
  if (off + 2 > len) {                              /* FIX: symmetric guard */
    SRV_LOG("[MQTTS] reject: UNSUBSCRIBE truncated (packet-id)\r\n");
    c->is_closing = 1; return;
  }
  off += 2;                                         /* FIX: пропустить 2B Packet Identifier */

  while (off + 2 <= len) {
    uint16_t tlen = srv_be16(d + off);
    const char *topic = (const char *) d + off + 2;
    if (off + 2 + tlen > len) break;                // битый пакет
    off += 2 + (size_t) tlen;
    for (uint8_t i = 0; i < cl->num_subs; i++) {
      if (tlen == strlen(cl->subs[i]) &&
          memcmp(cl->subs[i], topic, tlen) == 0) {
        memmove(&cl->subs[i], &cl->subs[i + 1],
                sizeof(cl->subs[0]) * (cl->num_subs - i - 1));
        memset(cl->subs[cl->num_subs - 1], 0, sizeof(cl->subs[0]));
        cl->num_subs--;
        removed++;
        break;
      }
    }
  }
  (void) removed;
  srv_send_unsuback(c, mm->id);
}

/* ---------- Event handler ----------
 * ВНИМАНИЕ: эта форкнутая версия Mongoose (mg_event_handler_t) вызывает
 * handler с ТРЕМЯ аргументами (c, ev, ev_data) — fn_data в r3 не передаётся
 * и читать его нельзя. Поэтому сигнатура 3-аргументная, без fn_data. */
static void mqtt_srv_cb(struct mg_connection *c, int ev, void *ev_data) {
  struct mg_mqtt_message *mm;

  switch (ev) {
    case MG_EV_ACCEPT:
      /* Лимит: заняты все слоты -> сразу отказ, соединение не открывается */
      {
        int slot = srv_slot_alloc(c);
        if (slot < 0) {
          SRV_LOG("[MQTTS] REFUSED: client limit (%d) reached\r\n",
                 MQTT_SRV_MAX_CLIENTS_HARDCAP);
          c->is_closing = 1;
          return;
        }
        memset(c->data, 0, sizeof(c->data));
        c->data[0] = (char) slot;
        s_cli[slot].conn = c;
        s_cli[slot].num_subs = 0;
        s_cli[slot].keepalive_s = 0;
        s_cli[slot].authenticated = 0;
        s_cli[slot].last_activity_ms = mg_millis();
        s_cli_count++;
      }
      break;

    case MG_EV_READ:                                  // любой входящий трафик
      {
        MqttSrvClient_t *cl = srv_client(c);
        if (cl != NULL) cl->last_activity_ms = mg_millis();
      }
      break;

    case MG_EV_MQTT_CMD:
      mm = (struct mg_mqtt_message *) ev_data;
      {
        MqttSrvClient_t *cl = srv_client(c);
        if (cl == NULL) return;
      }
      switch (mm->cmd) {
        case MQTT_CMD_CONNECT:
          srv_handle_connect(c, mm);
          break;
        case MQTT_CMD_SUBSCRIBE:
          srv_handle_subscribe(c, mm);
          break;
        case MQTT_CMD_UNSUBSCRIBE:
          srv_handle_unsubscribe(c, mm);
          break;
        case MQTT_CMD_PINGREQ:
          mg_mqtt_pong(c);
          break;
        case MQTT_CMD_DISCONNECT:
          /* Явный, корректный DISCONNECT от клиента — в отличие от
           * "тихого" обрыва TCP, эта строка ПОЯВИТСЯ в логе перед
           * "client closed". Если её нет — клиент разорвал соединение
           * сам, не отправив DISCONNECT (частый паттерн у "тестовых"
           * connect-check в мобильных приложениях). */
          SRV_LOG("[MQTTS] client sent DISCONNECT\r\n");
          c->is_closing = 1;
          break;
        default:                                      // PUBLISH и пр. служебные команды
          break;                                      // PUBLISH обрабатывается в MG_EV_MQTT_MSG ниже
      }
      break;

    case MG_EV_MQTT_MSG: {                            // PUBLISH от клиента
      MqttSrvClient_t *cl = srv_client(c);
      if (cl == NULL || !cl->authenticated) break;    // до CONNACK не доверяем данным
      struct mg_mqtt_message *msg = (struct mg_mqtt_message *) ev_data;
      extern osMessageQueueId_t mqttRxQueueHandle;
      MqttRxMsg_t rx = {0};
      size_t tlen = msg->topic.len < sizeof(rx.topic) - 1
                        ? msg->topic.len : sizeof(rx.topic) - 1;
      size_t dlen = msg->data.len < sizeof(rx.payload) - 1
                        ? msg->data.len : sizeof(rx.payload) - 1;
      memcpy(rx.topic,   msg->topic.buf, tlen);
      memcpy(rx.payload, msg->data.buf,  dlen);
      s_stat_rx_msgs++;   /* дешёвый инкремент — НЕ printf на каждое сообщение */
      if (xQueueSend(mqttRxQueueHandle, &rx, 0) != pdPASS) {
        SRV_LOG("[MQTTS] RX queue full, message dropped!\r\n");
      }
      break;
    }

    case MG_EV_CLOSE:
      {
        uint8_t idx;
        memcpy(&idx, c->data, 1);
        if (idx < MQTT_SRV_MAX_CLIENTS_HARDCAP && s_cli != NULL &&
            s_cli[idx].conn == c) {
          SRV_LOG("[MQTTS] client closed (auth=%d, %d subs)\r\n",
                  s_cli[idx].authenticated, s_cli[idx].num_subs);
          s_cli[idx].conn = NULL;
          s_cli[idx].num_subs = 0;
          s_cli[idx].authenticated = 0;
          s_cli_count--;
        }
      }
      break;

    default:
      break;
  }
}

/* ---------- Публичные функции ---------- */

void mqtt_server_init(struct mg_mgr *mgr, uint16_t port) {
  size_t tbl_sz = sizeof(MqttSrvClient_t) * MQTT_SRV_MAX_CLIENTS_HARDCAP;

  if (s_running) return;

  /* Порт не должен конфликтовать с веб-интерфейсом */
  if (port == 8000 || port == 8443 || port == 0) {
    SRV_LOG("[MQTTS] FATAL: port %u conflicts with web UI / invalid, "
           "server not started\r\n", (unsigned) port);
    return;
  }

  s_cli = (MqttSrvClient_t *) dtcm_malloc(tbl_sz);
  s_usr = (char *) dtcm_malloc(32);
  s_pswd = (char *) dtcm_malloc(32);
  if (s_cli == NULL || s_usr == NULL || s_pswd == NULL) {
    SRV_LOG("[MQTTS] FATAL: DTCM alloc failed (need %u B), server disabled\r\n",
           (unsigned) (tbl_sz + 64));
    s_cli = NULL;
    return;
  }
  memset(s_cli, 0, tbl_sz);

  /* Снимок кредов на момент старта (изменение настроек требует reboot) */
  strncpy(s_usr, SetSettings.mqtt_srv_usr, 31);
  strncpy(s_pswd, SetSettings.mqtt_srv_pswd, 31);
  s_usr[31] = '\0';
  s_pswd[31] = '\0';

  {
    char url[24];
    snprintf(url, sizeof(url), "mqtt://0.0.0.0:%u", (unsigned) port);
    struct mg_connection *lsn = mg_mqtt_listen(mgr, url, mqtt_srv_cb, NULL);
    if (lsn == NULL) {
      SRV_LOG("[MQTTS] FATAL: cannot listen on %s\r\n", url);
      s_cli = NULL;
      return;
    }
  }
  s_running = 1;
  s_last_heartbeat_ms = mg_millis();
  s_stat_accepted = s_stat_rejected = s_stat_rx_msgs = s_stat_tx_msgs = 0;
  SRV_LOG("[MQTTS] MQTT 3.1.1 broker started on port %u (max %d clients, "
         "QoS 0, subs/client %d)\r\n",
         (unsigned) port, MQTT_SRV_MAX_CLIENTS_HARDCAP,
         MQTT_SRV_MAX_SUBS_PER_CLIENT);
}

void mqtt_server_poll(void) {
  if (!s_running || s_cli == NULL) return;

  /* Heartbeat: единственный "регулярный" лог во всём файле. poll()
   * вызывается на каждой итерации WebServerTask (потенциально сотни
   * раз/с), поэтому SRV_LOG строго под защитой сравнения тиков — в 999
   * случаях из 1000 это просто "if" без выхода в UART (и даже проверка
   * маски фильтра не выполняется — она внутри SRV_LOG). Текст сообщение
   * уходит через LoggerTask и печатается только при включённой категории
   * MQTT в Global Settings.
   * Если сервер вообще не работает (не запущен / завис) — эта строка
   * просто не появится в логе, что само по себе диагностика. */
  {
    uint32_t now = mg_millis();
    if (now - s_last_heartbeat_ms >= MQTT_SRV_HEARTBEAT_MS) {
      s_last_heartbeat_ms = now;
      SRV_LOG("[MQTTS] heartbeat: clients=%u accepted=%lu rejected=%lu "
              "rx=%lu tx=%lu\r\n",
              (unsigned) s_cli_count,
              (unsigned long) s_stat_accepted,
              (unsigned long) s_stat_rejected,
              (unsigned long) s_stat_rx_msgs,
              (unsigned long) s_stat_tx_msgs);
    }
  }

  for (int i = 0; i < MQTT_SRV_MAX_CLIENTS_HARDCAP; i++) {
    MqttSrvClient_t *cl = &s_cli[i];
    uint32_t idle, limit;
    if (cl->conn == NULL || cl->conn->is_closing) continue;
    idle = mg_millis() - cl->last_activity_ms;
    if (!cl->authenticated) {
      if (idle > MQTT_SRV_CONNECT_TIMEOUT_MS) {
        SRV_LOG("[MQTTS] slot %d: no CONNECT in %dms, closing\r\n", i,
               MQTT_SRV_CONNECT_TIMEOUT_MS);
        cl->conn->is_closing = 1;
      }
      continue;
    }
    /* MQTT 3.1.1 [MQTT-3.1.2-24]: сервер отключает клиента через 1.5х keepalive */
    limit = (cl->keepalive_s > 0)
                ? (uint32_t) cl->keepalive_s * 1500u + 5000u
                : 0;
    if (limit != 0 && idle > limit) {
      SRV_LOG("[MQTTS] slot %d: keepalive timeout (%lums > %ums), closing\r\n",
             i, (unsigned long) idle, (unsigned) limit);
      cl->conn->is_closing = 1;
    }
  }
}

void mqtt_server_publish(const char *topic, const char *payload) {
  struct mg_mqtt_opts o;
  struct mg_str t, m;
  size_t tlen;

  if (!s_running || s_cli == NULL) return;
  tlen = strlen(topic);
  if (tlen == 0 || tlen > 127) return;              // топики >127 не публикуем
  s_stat_tx_msgs++;   /* дешёвый инкремент, НЕ printf — вызывается на каждое сообщение */

  t = mg_str(topic);
  m = mg_str(payload);
  for (int i = 0; i < MQTT_SRV_MAX_CLIENTS_HARDCAP; i++) {
    MqttSrvClient_t *cl = &s_cli[i];
    if (cl->conn == NULL || !cl->authenticated) continue;
    if (cl->conn->is_closing || cl->conn->is_draining) continue;
    /* Backpressure: клиент не забирает данные — не копим send-буфер */
    if (cl->conn->send.len > MQTT_SRV_SEND_LIMIT) continue;
    if (!srv_match_any(cl, topic)) continue;
    memset(&o, 0, sizeof(o));
    o.topic = t;
    o.message = m;
    o.qos = 0;
    o.retain = false;
    mg_mqtt_pub(cl->conn, &o);
  }
}

uint8_t mqtt_server_client_count(void) {
  return s_cli_count;
}
