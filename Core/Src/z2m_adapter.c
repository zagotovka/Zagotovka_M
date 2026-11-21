#include "z2m_adapter.h"
#include "zagotovka.h"
#include "db.h"
#include "main.h"
#include "logger.h"
#include "mqtt_server.h"
#include "cmsis_os2.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <strings.h>

#define Z2M_BRIDGE_WAIT_MS 30000u

static uint8_t  s_mqtt_up   = 0;
static uint8_t  s_err_class = 0;   /* причина последнего сбоя соединения (z2m_diag_t) */
static uint8_t  s_bridge    = 0;   /* 0 = неизвестно, 1 = online, 2 = offline */
static uint32_t s_open_ms   = 0;
static uint8_t  s_disc_cnt  = 0;   /* сколько discovery-конфигов Z2M получено с момента подключения */

static uint8_t  s_ha_state  = 0;   /* 0 = не проверялся, 1 = отвечает, 2 = нет ответа, 3 = идёт проверка */
static struct mg_connection *s_ha_conn = NULL;
#define Z2M_HA_PERIOD_MS   15000u   /* период фоновой проверки HA */
#define Z2M_HA_TIMEOUT_MS   5000u   /* HA не ответил за это время: связи нет */
static uint32_t s_ha_start_ms = 0;
static uint8_t  s_ha_info = 0;   /* 0 нет данных, 1 HTTP-ответ, 2 шлюз вернул 502/503/504, 3 порт открыт, но ответ не HTTP (вероятно HTTPS), 4 TCP не установлен, 5 таймаут */
static uint16_t s_ha_http = 0;   /* последний HTTP-статус */
static uint8_t  s_ha_tcp  = 0;   /* 1 = TCP-соединение установлено в текущей проверке */
static uint8_t  s_ha_to   = 0;   /* 1 = соединение закрыто по таймауту */

bool z2m_enabled(void) {
  return SetSettings.zb_mode == 1;
}

/* ---------- Диагностика ---------- */

void z2m_on_mqtt_open(void) {
  s_mqtt_up   = 1;
  s_err_class = 0;
  s_bridge    = 0;
  s_disc_cnt  = 0;
  s_open_ms   = (uint32_t) mg_millis();
}

void z2m_on_mqtt_close(void) {
  s_mqtt_up = 0;
  s_bridge  = 0;
}

void z2m_on_connack_error(int code) {
  s_mqtt_up   = 0;
  s_err_class = (code == 4 || code == 5) ? Z2M_DIAG_BAD_AUTH : Z2M_DIAG_MQTT_DOWN;
}

void z2m_on_mqtt_error(const char *err) {
  if (s_mqtt_up || err == NULL) return;
  if (strncmp(err, "DNS", 3) == 0) {
    s_err_class = Z2M_DIAG_BAD_HOST;
  } else if (strcmp(err, "connection refused") == 0 || strcmp(err, "peer RST") == 0) {
    s_err_class = Z2M_DIAG_BAD_PORT;
  } else if (strcmp(err, "Connection timeout") == 0) {
    s_err_class = Z2M_DIAG_TIMEOUT;
  } else {
    s_err_class = Z2M_DIAG_MQTT_DOWN;
  }
}

static uint8_t z2m_diag_code(void) {
  if (!z2m_enabled()) return Z2M_DIAG_OFF;
  if (!s_mqtt_up) return s_err_class ? s_err_class : Z2M_DIAG_MQTT_DOWN;
  if (s_bridge == 2) return Z2M_DIAG_Z2M_OFFLINE;
  if (s_bridge == 1) return Z2M_DIAG_OK;
  if ((uint32_t) mg_millis() - s_open_ms > Z2M_BRIDGE_WAIT_MS) return Z2M_DIAG_NO_BRIDGE;
  return Z2M_DIAG_WAIT;
}

void z2m_diag_json(char *buf, size_t n) {
  snprintf(buf, n,
          "{\"mode\":%d,\"mqtt\":%d,\"bridge\":%d,\"code\":%d,\"ha\":%d,\"wd\":%d,\"dn\":%d}",
          (int) SetSettings.zb_mode, (int) s_mqtt_up, (int) s_bridge,
          (int) z2m_diag_code(), (int) s_ha_state, (int) SetSettings.wd_en,
          (int) s_disc_cnt);
}

void z2m_link_json(char *buf, size_t n) {
  /* g: шлюз в режиме Hub: 0 = неизвестно, 1 = подключён, 2 = нет связи */
  int g = 0;
  if (!z2m_enabled() && SetSettings.check_mqtt_srv && HAL_GetTick() > 60000u) {
    g = mqtt_server_slzb_connected_cached() ? 1 : 2;
  }
  snprintf(buf, n, "{\"c\":%d,\"h\":%d,\"g\":%d,\"hi\":%d,\"hs\":%d}",
           (int) z2m_diag_code(), (int) s_ha_state, g, (int) s_ha_info, (int) s_ha_http);
}

/* ---------- Проверка Home Assistant ---------- */

static void ha_done(uint8_t st, uint8_t info, uint16_t http) {
  if (s_ha_state != st || s_ha_info != info || s_ha_http != http) {
    LOG_Z2M("ha: probe state=%d info=%d http=%d\r\n", (int) st, (int) info, (int) http);
  }
  s_ha_state = st;
  s_ha_info  = info;
  s_ha_http  = http;
}

static void ha_cb(struct mg_connection *c, int ev, void *ev_data) {
  if (ev == MG_EV_CONNECT) {
    if (c == s_ha_conn) s_ha_tcp = 1;
    mg_printf(c,
    		  "GET /manifest.json HTTP/1.1\r\n"
              "Host: %s:%d\r\n"
              "Connection: close\r\n\r\n",
              SetSettings.ha_host,
              SetSettings.ha_port > 0 ? SetSettings.ha_port : 8123);
  } else if (ev == MG_EV_HTTP_MSG) {
    struct mg_http_message *hm = (struct mg_http_message *) ev_data;
    int st = mg_http_status(hm);
    if (c == s_ha_conn) {
      /* Любой HTTP-ответ = хост жив (401 без токена, 301, 404 за прокси и т.д.).
       * Нет связи только если прокси сообщает, что HA за ним недоступен */
      bool gw = (st == 502 || st == 503 || st == 504);
      ha_done(gw ? 2 : 1, gw ? 2 : 1, (uint16_t) st);
      s_ha_conn = NULL;
    }
    c->is_closing = 1;
  } else if (ev == MG_EV_ERROR || ev == MG_EV_CLOSE) {
    /* Корректного HTTP-ответа не было (после ответа s_ha_conn уже NULL) */
    if (c == s_ha_conn) {
      if (s_ha_to)       ha_done(2, 5, 0);   /* молчит до таймаута */
      else if (s_ha_tcp) ha_done(1, 3, 0);   /* порт принял TCP, ответ не HTTP: HTTPS */
      else               ha_done(2, 4, 0);   /* TCP не установлен */
      s_ha_conn = NULL;
    }
  }
}

/* keep_state = 1: фоновая проверка не сбрасывает известный результат в "идёт проверка",
 * иначе индикатор мигал бы серым каждые 15 с */
static void ha_probe_start(struct mg_mgr *mgr, bool keep_state) {
  char url[64];
  if (SetSettings.ha_host[0] == '\0') { s_ha_state = 0; return; }
  if (s_ha_conn != NULL) return;
  snprintf(url, sizeof(url), "http://%s:%d/", SetSettings.ha_host,
           SetSettings.ha_port > 0 ? SetSettings.ha_port : 8123);
  if (!keep_state || s_ha_state == 0) s_ha_state = 3;
  s_ha_start_ms = (uint32_t) mg_millis();
  s_ha_tcp = 0;
  s_ha_to  = 0;
  s_ha_conn = mg_http_connect(mgr, url, ha_cb, NULL);
  if (s_ha_conn == NULL) ha_done(2, 4, 0);
}

void z2m_ha_probe(struct mg_mgr *mgr) {   /* кнопка "Проверить соединение" в Settings */
  ha_probe_start(mgr, false);
}

void z2m_ha_tick(struct mg_mgr *mgr) {
  static uint32_t s_next_ms = 0;
  uint32_t now = (uint32_t) mg_millis();
  if (SetSettings.ha_host[0] == '\0') { s_ha_state = 0; return; }
  if (s_ha_conn != NULL) {
    /* зависшее соединение: закрываем, MG_EV_CLOSE выставит состояние "нет связи" */
    if (now - s_ha_start_ms > Z2M_HA_TIMEOUT_MS) { s_ha_to = 1; s_ha_conn->is_closing = 1; }
    return;
  }
  if ((int32_t) (now - s_next_ms) < 0) return;
  s_next_ms = now + Z2M_HA_PERIOD_MS;
  ha_probe_start(mgr, true);
}

/* ---------- Подписки ---------- */

static volatile uint8_t s_resub = 0;   /* 1 = нужно заново получить retained discovery */

/* Подписка на discovery-конфиги Z2M. Повторный SUBSCRIBE заставляет брокер
 * заново прислать все retained-сообщения (так слот, добавленный после
 * подключения, получает имя устройства). */
static void z2m_sub_disc(struct mg_connection *c, int qos) {
  char t[64];
  struct mg_mqtt_opts o;
  memset(&o, 0, sizeof(o));
  o.qos = (uint8_t) qos;
  snprintf(t, sizeof(t), "%s/sensor/+/linkquality/config",
           SetSettings.ha_prefix[0] ? SetSettings.ha_prefix : "homeassistant");
  o.topic = mg_str(t);
  mg_mqtt_sub(c, &o);
}

/* Вызывается из веб-обработчиков: только ставит флаг, Mongoose не трогает */
void z2m_request_resub(void) {
  if (z2m_enabled()) s_resub = 1;
}

/* Вызывается из timer_fn_mqtt (контекст Mongoose) при живом соединении */
void z2m_poll(struct mg_connection *c, int qos) {
  if (!s_resub) return;
  s_resub = 0;
  if (!z2m_enabled() || c == NULL) return;
  z2m_sub_disc(c, qos);
  LOG_Z2M("z2m: re-subscribed to discovery\r\n");
}

void z2m_subscribe(struct mg_connection *c, int qos) {
  char t[64];
  struct mg_mqtt_opts o;
  const char *base = get_rxzbtop();

  memset(&o, 0, sizeof(o));
  o.qos = (uint8_t) qos;

  snprintf(t, sizeof(t), "%s/+", base);
  o.topic = mg_str(t);
  mg_mqtt_sub(c, &o);

  snprintf(t, sizeof(t), "%s/bridge/state", base);
  o.topic = mg_str(t);
  mg_mqtt_sub(c, &o);

  z2m_sub_disc(c, qos);
  LOG_Z2M("z2m: subscribed to '%s/+' and '%s/bridge/state'\r\n", base, base);
}

/* ---------- Входящие сообщения ---------- */

/* <pfx>/sensor/0x<IEEE>/linkquality/config -> событие {"i":"<ieee>"}
 * с топиком <base>/<friendly name>. Возврат: 0 = не наш топик,
 * 1 = поглощено, 2 = out заполнен, ставить в очередь. */
static int disc_rx(const struct mg_mqtt_message *mm, MqttRxMsg_t *out) {
  static const char mid[]  = "/sensor/0x";
  static const char tail[] = "/linkquality/config";
  const size_t ml = sizeof(mid) - 1, tl = sizeof(tail) - 1;
  const char *pfx = SetSettings.ha_prefix[0] ? SetSettings.ha_prefix : "homeassistant";
  const char *base = get_rxzbtop();
  const char *t = mm->topic.buf;
  size_t pl = strlen(pfx), bl = strlen(base), nl;
  char *stp;
  int res = 1;

  if (mm->topic.len != pl + ml + 16 + tl) return 0;
  if (memcmp(t, pfx, pl) != 0 || memcmp(t + pl, mid, ml) != 0 ||
      memcmp(t + pl + ml + 16, tail, tl) != 0) return 0;
  if (mm->data.len == 0) return 1;
  if (s_disc_cnt < 255) s_disc_cnt++;
  stp = mg_json_get_str(mm->data, "$.state_topic");
  if (stp == NULL) return 1;
  nl = (strncmp(stp, base, bl) == 0 && stp[bl] == '/') ? strlen(stp + bl + 1) : 0;
  if (nl > 0 && nl < sizeof(ZigbeeConf[0].info) &&
      strchr(stp + bl + 1, '/') == NULL && bl + 1 + nl < sizeof(out->topic)) {
    memset(out, 0, sizeof(*out));
    snprintf(out->topic, sizeof(out->topic), "%s/%s", base, stp + bl + 1);
    snprintf(out->payload, sizeof(out->payload), "{\"i\":\"%.16s\"}", t + pl + ml);
    res = 2;
  }
  mg_free(stp);
  return res;
}

static bool contains(struct mg_str s, const char *w) {
  size_t n = strlen(w);
  if (s.len < n) return false;
  for (size_t i = 0; i + n <= s.len; i++) {
    if (memcmp(s.buf + i, w, n) == 0) return true;
  }
  return false;
}

/* Приближённое преобразование CIE xy в RGB (гамма около 2.0 через sqrt, чтобы не тянуть libm) */
static uint32_t xy_to_rgb(double x, double y) {
  double r, g, b, m, X, Z;
  if (y < 0.001) y = 0.001;
  X = x / y;
  Z = (1.0 - x - y) / y;
  r =  X * 1.656492 - 1.0 * 0.354851 - Z * 0.255038;
  g = -X * 0.707196 + 1.0 * 1.655397 + Z * 0.036152;
  b =  X * 0.051713 - 1.0 * 0.121364 + Z * 1.011530;
  m = r;
  if (g > m) m = g;
  if (b > m) m = b;
  if (m > 1.0) { r /= m; g /= m; b /= m; }
  if (r < 0.0) r = 0.0;
  if (g < 0.0) g = 0.0;
  if (b < 0.0) b = 0.0;
  r = __builtin_sqrt(r); g = __builtin_sqrt(g); b = __builtin_sqrt(b);
  return ((uint32_t) (r * 255.0 + 0.5) << 16) |
         ((uint32_t) (g * 255.0 + 0.5) << 8)  |
          (uint32_t) (b * 255.0 + 0.5);
}

/* ---------- Универсальные свойства Z2M (любое устройство) ---------- */

#define Z2M_PROP_MAX   64
#define Z2M_PROP_NAME  28
#define Z2M_X_MAX      12

enum { Z2M_K_NUM = 0, Z2M_K_ONOFF_UP = 1, Z2M_K_ONOFF_LOW = 2, Z2M_K_BOOL = 3 };

typedef struct {
  uint16_t id;
  uint8_t  kind;
  char     name[Z2M_PROP_NAME];
} z2m_prop_t;

static z2m_prop_t s_props[Z2M_PROP_MAX];
static volatile uint8_t s_prop_cnt = 0;

/* Стабильный 16-битный id свойства (DP) из имени; всегда >= 0x0100 */
static uint16_t z2m_prop_hash(const char *s) {
  uint32_t h = 2166136261u;
  uint16_t id;
  while (*s) { h ^= (uint8_t) *s++; h *= 16777619u; }
  h ^= h >> 16;
  id = (uint16_t) (h & 0xFFFFu);
  if (id < 0x0100) id = (uint16_t) (id + 0x0100);
  return id;
}

/* Поля, которые уже обрабатываются отдельно или не нужны */
static bool z2m_x_skip(const char *k) {
  static const char *const skip[] = {
    "state", "brightness", "color", "color_mode", "action", "occupancy",
    "presence", "temperature", "humidity", "linkquality", "last_seen",
    "update", "update_available", NULL
  };
  for (int i = 0; skip[i] != NULL; i++) {
    if (strcmp(k, skip[i]) == 0) return true;
  }
  return false;
}

/* Скалярное значение -> целое + тип. Прочие строки/объекты пропускаются. */
static bool z2m_x_value(struct mg_str v, int *out, uint8_t *kind) {
  if (v.len == 0) return false;
  if (v.buf[0] == '"') {
    const char *s = v.buf + 1;
    size_t n = v.len >= 2 ? v.len - 2 : 0;
    if (n == 2 && memcmp(s, "ON", 2) == 0)  { *out = 1; *kind = Z2M_K_ONOFF_UP;  return true; }
    if (n == 3 && memcmp(s, "OFF", 3) == 0) { *out = 0; *kind = Z2M_K_ONOFF_UP;  return true; }
    if (n == 2 && memcmp(s, "on", 2) == 0)  { *out = 1; *kind = Z2M_K_ONOFF_LOW; return true; }
    if (n == 3 && memcmp(s, "off", 3) == 0) { *out = 0; *kind = Z2M_K_ONOFF_LOW; return true; }
    return false;
  }
  if (v.len == 4 && memcmp(v.buf, "true", 4) == 0)  { *out = 1; *kind = Z2M_K_BOOL; return true; }
  if (v.len == 5 && memcmp(v.buf, "false", 5) == 0) { *out = 0; *kind = Z2M_K_BOOL; return true; }
  if (v.buf[0] == '-' || (v.buf[0] >= '0' && v.buf[0] <= '9')) {
    char tmp[24];
    size_t n = v.len < sizeof(tmp) - 1 ? v.len : sizeof(tmp) - 1;
    double d;
    memcpy(tmp, v.buf, n);
    tmp[n] = '\0';
    d = strtod(tmp, NULL);
    *out = (int) (d + (d < 0 ? -0.5 : 0.5));
    *kind = Z2M_K_NUM;
    return true;
  }
  return false;
}

/* Регистрирует имя свойства (для обратной отправки команд). 0 = не удалось. */
static uint16_t z2m_prop_register(const char *name, uint8_t kind) {
  uint16_t id;
  for (int i = 0; i < s_prop_cnt; i++) {
    if (strcmp(s_props[i].name, name) == 0) {
      s_props[i].kind = kind;
      return s_props[i].id;
    }
  }
  if (s_prop_cnt >= Z2M_PROP_MAX) return 0;
  id = z2m_prop_hash(name);
  for (int i = 0; i < s_prop_cnt; i++) {
    if (s_props[i].id == id) {
      LOG_Z2M("z2m: prop '%s' id collision with '%s'\r\n", name, s_props[i].name);
      return 0;
    }
  }
  snprintf(s_props[s_prop_cnt].name, Z2M_PROP_NAME, "%s", name);
  s_props[s_prop_cnt].id = id;
  s_props[s_prop_cnt].kind = kind;
  s_prop_cnt++;
  return id;
}

const char *z2m_prop_name(uint16_t dp) {
  for (int i = 0; i < s_prop_cnt; i++) {
    if (s_props[i].id == dp) return s_props[i].name;
  }
  return NULL;
}

static bool z2m_slot_has_ep(const char *ieee, uint16_t dp) {
  for (int i = 0; i < NUMZBEE; i++) {
    if (ZigbeeConf[i].zbee_ieee[0] != '\0' && ZigbeeConf[i].ep == dp &&
        strncasecmp(ZigbeeConf[i].zbee_ieee, ieee, 16) == 0) return true;
  }
  return false;
}

/* ---------- Имя свойства хранится в самом слоте ----------
 * DP свойства в Z2M-режиме - хеш имени, обратно имя из него не получить, а
 * команде нужно именно имя ("fan_speed", "brightness_l1", ...). Раньше имя
 * знали только после первого отчёта устройства с момента старта, поэтому
 * сразу после перезагрузки команды из веба не уходили (HTTP 400).
 * Теперь слот-свойство (роль MFR, ep >= 0x100) помнит "<тип>:<имя>" в pt_long:
 * у не-кнопок это поле не используется, оно уже сохраняется в zigbee.ini и
 * не требует ни нового поля структуры, ни новой RAM. */
static const z2m_prop_t *z2m_prop_by_id(uint16_t id) {
  for (int i = 0; i < s_prop_cnt; i++) {
    if (s_props[i].id == id) return &s_props[i];
  }
  return NULL;
}

static bool z2m_slot_is_prop(const ZigbeeVirtualPin *z) {
  return z->zbee_ieee[0] != '\0' && z->zbee_role == ZBEE_ROLE_MFR && z->ep >= 0x0100;
}

/* Записать имя свойства во все слоты этого IEEE с ep == id. true = что-то изменилось */
static bool z2m_remember_prop(const char *ieee, uint16_t id) {
  const z2m_prop_t *pr = z2m_prop_by_id(id);
  char want[Z2M_PROP_NAME + 4];
  bool chg = false;
  if (pr == NULL) return false;
  snprintf(want, sizeof(want), "%d:%s", (int) pr->kind, pr->name);
  for (int i = 0; i < NUMZBEE; i++) {
    ZigbeeVirtualPin *z = &ZigbeeConf[i];
    if (!z2m_slot_is_prop(z) || z->ep != id) continue;
    if (strncasecmp(z->zbee_ieee, ieee, 16) != 0) continue;
    if (strcmp(z->pt_long, want) == 0) continue;
    snprintf(z->pt_long, sizeof(z->pt_long), "%s", want);
    chg = true;
  }
  return chg;
}

/* Имя свойства из сохранённого слота (после перезагрузки, до первого отчёта) */
static const z2m_prop_t *z2m_prop_restore(const char *ieee, uint16_t dp) {
  for (int i = 0; i < NUMZBEE; i++) {
    const ZigbeeVirtualPin *z = &ZigbeeConf[i];
    const char *w = z->pt_long;
    if (!z2m_slot_is_prop(z) || z->ep != dp) continue;
    if (strncasecmp(z->zbee_ieee, ieee, 16) != 0) continue;
    if (w[0] < '0' || w[0] > '3' || w[1] != ':' || w[2] == '\0') continue;
    {
      bool ok = true;
      for (const char *q = w + 2; *q; q++) {
        if (!((*q >= '0' && *q <= '9') || (*q >= 'a' && *q <= 'z') ||
              (*q >= 'A' && *q <= 'Z') || *q == '_')) { ok = false; break; }
      }
      if (!ok) continue;
    }
    if (z2m_prop_register(w + 2, (uint8_t) (w[0] - '0')) == dp) {
      LOG_Z2M("z2m: prop '%s' restored from slot %d\r\n", w + 2, i);
      return z2m_prop_by_id(dp);
    }
  }
  return NULL;
}

/* Есть ли настроенный слот-свойство с таким DP (для диагностики) */
static bool z2m_any_slot_ep(uint16_t dp) {
  for (int i = 0; i < NUMZBEE; i++) {
    if (z2m_slot_is_prop(&ZigbeeConf[i]) && ZigbeeConf[i].ep == dp) return true;
  }
  return false;
}

/* Команда по свойству: {"<имя>": значение} в прежнем типе устройства */
int z2m_send_dp(const char *ieee, uint16_t dp, const char *val) {
  extern osMessageQueueId_t zbeeCmdQueueHandle;
  const z2m_prop_t *pr = NULL;
  ZbeeCmdMsg_t cmd;
  int v;

  if (ieee == NULL || val == NULL) return 400;
  pr = z2m_prop_by_id(dp);
  if (pr == NULL) pr = z2m_prop_restore(ieee, dp);
  if (pr == NULL) {
    LOG_Z2M("z2m: DP %04X name unknown yet (no report from device, nothing stored in slot)\r\n",
            (unsigned) dp);
    return 400;
  }
  v = atoi(val);
  memset(&cmd, 0, sizeof(cmd));
  snprintf(cmd.topic, sizeof(cmd.topic), "%s/0x%.16s/set", get_rxzbtop(), ieee);
  switch (pr->kind) {
    case Z2M_K_ONOFF_UP:
      snprintf(cmd.payload, sizeof(cmd.payload), "{\"%s\":\"%s\"}", pr->name, v ? "ON" : "OFF");
      break;
    case Z2M_K_ONOFF_LOW:
      snprintf(cmd.payload, sizeof(cmd.payload), "{\"%s\":\"%s\"}", pr->name, v ? "on" : "off");
      break;
    case Z2M_K_BOOL:
      snprintf(cmd.payload, sizeof(cmd.payload), "{\"%s\":%s}", pr->name, v ? "true" : "false");
      break;
    default:
      snprintf(cmd.payload, sizeof(cmd.payload), "{\"%s\":%d}", pr->name, v);
      break;
  }
  if (xQueueSend(zbeeCmdQueueHandle, &cmd, 0) != pdPASS) {
    LOG_Z2M("z2m: QUEUE FULL topic='%s'\r\n", cmd.topic);
    return 503;
  }
  LOG_Z2M("z2m: QUEUED topic='%s' payload='%s'\r\n", cmd.topic, cmd.payload);
  return 200;
}

int z2m_rx_filter(const struct mg_mqtt_message *mm, MqttRxMsg_t *out) {
  const char *base;
  size_t bl, rl;
  const char *rest;
  struct mg_str j;
  size_t o;
  char *p;
  const size_t cap = sizeof(out->payload);
  double d, cx, cy;
  bool bv;
  int len, off;

  if (!z2m_enabled()) return 0;
  {
    int dr = disc_rx(mm, out);
    if (dr != 0) return dr;
  }
  base = get_rxzbtop();
  bl = strlen(base);
  if (mm->topic.len <= bl + 1) return 0;
  if (memcmp(mm->topic.buf, base, bl) != 0 || mm->topic.buf[bl] != '/') return 0;
  rest = mm->topic.buf + bl + 1;
  rl = mm->topic.len - bl - 1;

  /* bridge/state: "online"/"offline" (Z2M 1.x) или {"state":"online"} (Z2M 2.x) */
  if (rl == 12 && memcmp(rest, "bridge/state", 12) == 0) {
    if (contains(mm->data, "offline")) s_bridge = 2;
    else if (contains(mm->data, "online")) s_bridge = 1;
    return 1;
  }
  /* Остальные многоуровневые топики (bridge/..., <имя>/availability, <имя>/set) не нужны */
  if (memchr(rest, '/', rl) != NULL) return 1;
  if (rl == 0 || bl + 1 + rl >= sizeof(out->topic)) return 1;

  memset(out, 0, sizeof(*out));
  snprintf(out->topic, sizeof(out->topic), "%s/%.*s", base, (int) rl, rest);

  /* Компактное событие: только нужные поля, независимо от размера исходного JSON */
  j = mm->data;
  p = out->payload;
  o = 0;
  p[o++] = '{';

  off = mg_json_get(j, "$.state", &len);
  if (off >= 0) {
    bool on = (len == 4 && memcmp(j.buf + off, "\"ON\"", 4) == 0);
    o += (size_t) snprintf(p + o, cap - o, "\"s\":%d,", on ? 1 : 0);
  }
  if (mg_json_get_num(j, "$.brightness", &d)) {
    o += (size_t) snprintf(p + o, cap - o, "\"b\":%d,", (int) d);
  }
  if (mg_json_get_num(j, "$.color.x", &cx) && mg_json_get_num(j, "$.color.y", &cy)) {
    o += (size_t) snprintf(p + o, cap - o, "\"c\":%lu,", (unsigned long) xy_to_rgb(cx, cy));
  }
  if (mg_json_get_num(j, "$.temperature", &d)) {
    o += (size_t) snprintf(p + o, cap - o, "\"t\":%d,", (int) (d * 100.0 + (d < 0 ? -0.5 : 0.5)));
  }
  if (mg_json_get_num(j, "$.humidity", &d)) {
    o += (size_t) snprintf(p + o, cap - o, "\"h\":%d,", (int) (d * 100.0 + 0.5));
  }
  if (mg_json_get_bool(j, "$.occupancy", &bv) || mg_json_get_bool(j, "$.presence", &bv)) {
    o += (size_t) snprintf(p + o, cap - o, "\"o\":%d,", bv ? 1 : 0);
  }
  off = mg_json_get(j, "$.action", &len);
  if (off >= 0 && len > 2 && j.buf[off] == '"') {
    char act[40];
    int k = 0;
    for (int i = 1; i < len - 1 && k < (int) sizeof(act) - 1; i++) {
      char ch = j.buf[off + i];
      if ((ch >= '0' && ch <= '9') || (ch >= 'a' && ch <= 'z') ||
          (ch >= 'A' && ch <= 'Z') || ch == '_' || ch == '-') {
        act[k++] = ch;
      }
    }
    act[k] = '\0';
    if (k > 0) o += (size_t) snprintf(p + o, cap - o, "\"a\":\"%s\",", act);
  }
  /* Универсально: все прочие скалярные поля -> "x":{"имя":[тип,значение],...} */
  {
    size_t xs = o;
    size_t xofs = 0;
    int xn = 0;
    struct mg_str xk, xv;
    if (o + 8 < cap) o += (size_t) snprintf(p + o, cap - o, "\"x\":{");
    while ((xofs = mg_json_next(j, xofs, &xk, &xv)) > 0 && xn < Z2M_X_MAX) {
      char key[Z2M_PROP_NAME];
      size_t kl;
      int val = 0;
      uint8_t kind = 0;
      bool ok = true;
      if (xk.len < 3 || xk.len - 2 >= sizeof(key)) continue;
      kl = xk.len - 2;
      for (size_t i = 0; i < kl; i++) {
        char ch = xk.buf[1 + i];
        if (!((ch >= '0' && ch <= '9') || (ch >= 'a' && ch <= 'z') ||
              (ch >= 'A' && ch <= 'Z') || ch == '_')) { ok = false; break; }
        key[i] = ch;
      }
      if (!ok) continue;
      key[kl] = '\0';
      if (z2m_x_skip(key) || !z2m_x_value(xv, &val, &kind)) continue;
      if (o + kl + 24 >= cap - 6) break;
      o += (size_t) snprintf(p + o, cap - o, "\"%s\":[%d,%d],", key, (int) kind, val);
      xn++;
    }
    if (xn > 0) {
      o--;                                   /* убрать последнюю запятую */
      o += (size_t) snprintf(p + o, cap - o, "},");
    } else {
      o = xs;
    }
  }
  if (o <= 1 || o >= cap - 2) return 1;   /* нечего передавать или переполнение */
  p[o - 1] = '}';                         /* заменяем последнюю запятую */
  p[o] = '\0';
  return 2;
}

/* Слот принадлежит устройству, если его "Name" (info) равен friendly name в Z2M,
 * либо friendly name по умолчанию: 0x + IEEE. Info автоматически обновляется
 * из HA Discovery Z2M (disc_rx), поэтому переименование в Z2M ничего не ломает. */
static bool slot_matches(const ZigbeeVirtualPin *z, const char *name) {
  if (z->zbee_ieee[0] == '\0') return false;
  if (z->info[0] != '\0' && strcmp(z->info, name) == 0) return true;
  if (name[0] == '0' && (name[1] == 'x' || name[1] == 'X') &&
      strncasecmp(name + 2, z->zbee_ieee, 16) == 0 && name[18] == '\0') {
    return true;
  }
  return false;
}

static void inject(const char *base, const char *ieee, int ep,
                   unsigned cluster, const char *valjson) {
  char t[96];
  char p[48];
  snprintf(t, sizeof(t), "%s/data/%.16s/%d/%04X/0000", base, ieee, ep, cluster);
  snprintf(p, sizeof(p), "{\"data\":{\"val\":%s}}", valjson);
  zbee_rx_inject(t, p);
}

static void inject_dp(const char *base, const char *ieee, int ep,
                      uint16_t dp, int val) {
  char t[96];
  char p[48];
  snprintf(t, sizeof(t), "%s/data/%.16s/%d/EF00/%04X", base, ieee, ep, (unsigned) dp);
  snprintf(p, sizeof(p), "{\"data\":{\"val\":%d}}", val);
  zbee_rx_inject(t, p);
}

/* ---------- Универсальные триггеры: смена значения любого поля Z2M ---------- */
typedef struct {
  char     ieee[17];
  uint16_t id;      /* 0 = поле state */
  int      val;
} z2m_last_t;

static z2m_last_t s_last[48];
static uint8_t s_last_next = 0;

/* 1 = значение изменилось; первое увиденное значение только запоминается */
static int z2m_changed(const char *ieee, uint16_t id, int val) {
  for (int i = 0; i < 48; i++) {
    if (s_last[i].ieee[0] != '\0' && s_last[i].id == id &&
        strncasecmp(s_last[i].ieee, ieee, 16) == 0) {
      int ch = (s_last[i].val != val);
      s_last[i].val = val;
      return ch;
    }
  }
  {
    z2m_last_t *e = &s_last[s_last_next];
    s_last_next = (uint8_t) ((s_last_next + 1) % 48);
    snprintf(e->ieee, sizeof(e->ieee), "%.16s", ieee);
    e->id = id;
    e->val = val;
  }
  return 0;
}

/* У устройства есть слот-кнопка или слот-выключатель */
static bool z2m_has_trig_slot(const char *ieee) {
  for (int i = 0; i < NUMZBEE; i++) {
    if (ZigbeeConf[i].zbee_ieee[0] == '\0') continue;
    if (strncasecmp(ZigbeeConf[i].zbee_ieee, ieee, 16) != 0) continue;
    if (ZigbeeConf[i].zbee_role == ZBEE_ROLE_TRIGGER ||
        ZigbeeConf[i].zbee_role == ZBEE_ROLE_SWITCH) return true;
  }
  return false;
}

/* Какой-то слот-кнопка/выключатель этого IEEE ждёт payload cand */
static bool z2m_trig_ref(const char *ieee, const char *cand) {
  for (int i = 0; i < NUMZBEE; i++) {
    const ZigbeeVirtualPin *z = &ZigbeeConf[i];
    const char *w[5];
    if (z->zbee_ieee[0] == '\0') continue;
    if (strncasecmp(z->zbee_ieee, ieee, 16) != 0) continue;
    if (z->zbee_role != ZBEE_ROLE_TRIGGER && z->zbee_role != ZBEE_ROLE_SWITCH) continue;
    w[0] = z->pt_single; w[1] = z->pt_double; w[2] = z->pt_long;
    w[3] = z->switch_payload_on; w[4] = z->switch_payload_off;
    for (int k = 0; k < 5; k++) {
      if (w[k][0] != '\0' && strstr(cand, w[k]) != NULL) return true;
    }
  }
  return false;
}

/* Смена поля -> payload "<имя>" и "<имя>_<значение>" (только если на них есть слот) */
static void z2m_emit_trig(const char *topic, const char *ieee, const char *name, int val) {
  char cand[32];
  snprintf(cand, sizeof(cand), "%.27s", name);
  if (z2m_trig_ref(ieee, cand)) zbee_rx_inject(topic, cand);
  snprintf(cand, sizeof(cand), "%.27s_%d", name, val);
  if (z2m_trig_ref(ieee, cand)) zbee_rx_inject(topic, cand);
}

bool z2m_handle_rx(const char *topic, const char *payload) {
  const char *base = get_rxzbtop();
  size_t bl = strlen(base);
  const char *name;
  struct mg_str j;
  bool has_s, has_b, has_c, has_t, has_h, has_o, has_a;
  double d = 0;
  int s_val = 0, b_val = 0, t_val = 0, h_val = 0, o_val = 0;
  uint32_t c_val = 0;
  char act[40] = {0};
  bool need_save = false;

  if (strncmp(topic, base, bl) != 0 || topic[bl] != '/') return false;
  name = topic + bl + 1;
  j = mg_str(payload);


  /* Событие discovery: friendly name этого IEEE -> Info слотов */
  {
    double dd;
    int ilen = 0;
    int ioff = mg_json_get(j, "$.i", &ilen);
    if (ioff >= 0 && ilen == 18 && !mg_json_get_num(j, "$.s", &dd)) {
      bool chg = false;
      for (int i = 0; i < NUMZBEE; i++) {
        ZigbeeVirtualPin *z = &ZigbeeConf[i];
        if (z->zbee_ieee[0] == '\0' ||
            strncasecmp(z->zbee_ieee, payload + ioff + 1, 16) != 0) continue;
        if (strcmp(z->info, name) == 0) continue;
        snprintf(z->info, sizeof(z->info), "%s", name);
        chg = true;
        LOG_Z2M("z2m: %.16s -> '%s'\r\n", z->zbee_ieee, name);
      }
      if (chg) {
        extern volatile uint32_t g_ver_zigbee;
        mark_slice_dirty(&g_ver_zigbee);
        extern osMessageQueueId_t usbQueueHandle;
        uint8_t usbnum = 7; /* zigbee.ini */
        if (usbQueueHandle) xQueueSend(usbQueueHandle, &usbnum, 0);
      }
      return true;
    }
  }

  has_s = mg_json_get_num(j, "$.s", &d); if (has_s) s_val = (int) d;
  has_b = mg_json_get_num(j, "$.b", &d); if (has_b) b_val = (int) d;
  has_c = mg_json_get_num(j, "$.c", &d); if (has_c) c_val = (uint32_t) d;
  has_t = mg_json_get_num(j, "$.t", &d); if (has_t) t_val = (int) d;
  has_h = mg_json_get_num(j, "$.h", &d); if (has_h) h_val = (int) d;
  has_o = mg_json_get_num(j, "$.o", &d); if (has_o) o_val = (int) d;
  {
    int len = 0;
    int off = mg_json_get(j, "$.a", &len);
    has_a = (off >= 0 && len > 2 && len < (int) sizeof(act) + 2);
    if (has_a) { memcpy(act, payload + off + 1, (size_t) (len - 2)); act[len - 2] = '\0'; }
  }
  struct { uint16_t id; int val; } xs[Z2M_X_MAX];
  int xcnt = 0;
  {
    int xl = 0;
    int xo = mg_json_get(j, "$.x", &xl);
    if (xo >= 0) {
      struct mg_str xj = mg_str_n(payload + xo, (size_t) xl), xk, xv;
      size_t xofs = 0;
      while ((xofs = mg_json_next(xj, xofs, &xk, &xv)) > 0 && xcnt < Z2M_X_MAX) {
        char key[Z2M_PROP_NAME];
        uint16_t id;
        if (xk.len < 3 || xk.len - 2 >= sizeof(key)) continue;
        memcpy(key, xk.buf + 1, xk.len - 2);
        key[xk.len - 2] = '\0';
        id = z2m_prop_register(key, (uint8_t) mg_json_get_long(xv, "$[0]", 0));
        if (id == 0) continue;
        xs[xcnt].id = id;
        xs[xcnt].val = (int) mg_json_get_long(xv, "$[1]", 0);
        xcnt++;
      }
    }
  }
  bool matched = false;
  for (int i = 0; i < NUMZBEE; i++) {
    ZigbeeVirtualPin *z = &ZigbeeConf[i];
    bool dup = false;
    int ep;
    uint8_t add = 0;

    if (!slot_matches(z, name)) continue;
    matched = true;
    /* один раз на пару IEEE + endpoint */
    for (int k = 0; k < i; k++) {
      if (slot_matches(&ZigbeeConf[k], name) &&
          strcmp(ZigbeeConf[k].zbee_ieee, z->zbee_ieee) == 0 &&
          ZigbeeConf[k].zbee_endpoint == z->zbee_endpoint) { dup = true; break; }
    }
    if (dup) continue;
    ep = z->zbee_endpoint ? z->zbee_endpoint : 1;

    /* Возможности устройства определяем по трафику Z2M (зонд SLZB в этом режиме не работает) */
    if (has_s) add |= ZBEE_CL_ONOFF;
    if (has_b) add |= ZBEE_CL_DIMMER;
    if (has_c) add |= ZBEE_CL_COLOR;
    if ((z->cluster_flags & add) != add) { z->cluster_flags |= add; need_save = true; }

    if (has_s) inject(base, z->zbee_ieee, ep, 0x0006, s_val ? "\"ON\"" : "\"OFF\"");
    if (has_b) { char v[12]; snprintf(v, sizeof(v), "%d", b_val); inject(base, z->zbee_ieee, ep, 0x0008, v); }
    if (has_c && (z->cluster_flags & ZBEE_CL_COLOR)) z->color_hex = c_val;
    if (has_t) { char v[12]; snprintf(v, sizeof(v), "%d", t_val); inject(base, z->zbee_ieee, ep, ZBEE_CLUSTER_TEMP, v); }
    if (has_h) { char v[12]; snprintf(v, sizeof(v), "%d", h_val); inject(base, z->zbee_ieee, ep, ZBEE_CLUSTER_HUMIDITY, v); }
    if (has_o) inject(base, z->zbee_ieee, ep, ZBEE_CLUSTER_OCCUPANCY, o_val ? "1" : "0");

    /* Универсальные свойства: только при обучении или если слот на них настроен */
    for (int k = 0; k < xcnt; k++) {
      if (!zbee_learn_is_active_for(z->zbee_ieee) &&
          !z2m_slot_has_ep(z->zbee_ieee, xs[k].id)) continue;
      inject_dp(base, z->zbee_ieee, ep, xs[k].id, xs[k].val);
      /* имя свойства запоминаем в слоте: команды работают и после перезагрузки */
      if (z2m_remember_prop(z->zbee_ieee, xs[k].id)) need_save = true;
    }

    /* Действия кнопок передаются слотам-кнопкам/выключателям.
     * Во время обучения — любому слоту этого IEEE: только что добавленный
     * слот ещё имеет роль по умолчанию, иначе нажатия не дойдут до обучения. */
    if (has_a && (z->zbee_role == ZBEE_ROLE_TRIGGER ||
                  z->zbee_role == ZBEE_ROLE_SWITCH  ||
                  zbee_learn_is_active_for(z->zbee_ieee))) {
      char t[96];
      snprintf(t, sizeof(t), "%s/trigger/%.16s", base, z->zbee_ieee);
      zbee_rx_inject(t, act);
    }
  }

  /* Сообщение похоже на настроенное устройство (совпал DP слота), но топик не
   * привязан ни к одному слоту: у слота не заполнено Name и Z2M не прислал
   * HA Discovery (в Z2M выключена интеграция Home Assistant) либо устройство
   * переименовано. Без привязки ни одно значение в веб не попадёт. */
  if (!matched) {
    static uint32_t s_unb_ms = 0;
    uint32_t now = HAL_GetTick();
    for (int k = 0; k < xcnt; k++) {
      if (z2m_any_slot_ep(xs[k].id) && (now - s_unb_ms > 30000u || s_unb_ms == 0)) {
        s_unb_ms = now;
        LOG_Z2M("z2m: topic '%s' is not bound to any slot. Put '%s' into the slot Name "
                "or rename the device in Z2M to 0x<IEEE>\r\n", name, name);
        break;
      }
    }
  }

  /* Универсальные триггеры: смена любого поля, на которое настроена кнопка/выключатель.
   * Во время обучения значения только запоминаются (чтобы первое нажатие после
   * сохранения уже считалось сменой), события в таблицу обучения не шлются. */
  if (has_s || xcnt > 0) {
    const char *tg = NULL;
    for (int i = 0; i < NUMZBEE; i++) {
      if (slot_matches(&ZigbeeConf[i], name)) { tg = ZigbeeConf[i].zbee_ieee; break; }
    }
    if (tg != NULL) {
      bool learning = zbee_learn_is_active_for(tg);
      if (learning || z2m_has_trig_slot(tg)) {
        char tt[96];
        snprintf(tt, sizeof(tt), "%s/trigger/%.16s", base, tg);
        if (has_s && z2m_changed(tg, 0, s_val) && !learning) {
          z2m_emit_trig(tt, tg, "state", s_val);
        }
        for (int k = 0; k < xcnt; k++) {
          const char *pn = z2m_prop_name(xs[k].id);
          if (pn != NULL && z2m_changed(tg, xs[k].id, xs[k].val) && !learning) {
            z2m_emit_trig(tt, tg, pn, xs[k].val);
          }
        }
      }
    }
  }

  if (need_save) {
    extern osMessageQueueId_t usbQueueHandle;
    uint8_t usbnum = 7; /* zigbee.ini */
    if (usbQueueHandle) xQueueSend(usbQueueHandle, &usbnum, 0);
  }
  return true;
}

/* ---------- Исходящие команды ---------- */

int z2m_send_cmd(int slot, uint16_t cluster, const char *val) {
  extern osMessageQueueId_t zbeeCmdQueueHandle;
  const ZigbeeVirtualPin *z;
  char name[32];
  ZbeeCmdMsg_t cmd;

  if (slot < 0 || slot >= NUMZBEE || val == NULL) return 400;
  z = &ZigbeeConf[slot];
  /* Адресация всегда по IEEE (0x + 16 hex): приём слотов (slot_matches)
   * понимает и friendly name из Info, но команды идут строго по IEEE.
   * Z2M принимает адрес устройства в топике и по имени, и по IEEE,
   * поэтому схема "переименовать устройства в Z2M в их IEEE" работает
   * в обе стороны, а поле Info остаётся произвольной пометкой. */
  snprintf(name, sizeof(name), "0x%.16s", z->zbee_ieee);

  memset(&cmd, 0, sizeof(cmd));
  snprintf(cmd.topic, sizeof(cmd.topic), "%s/%s/set", get_rxzbtop(), name);

  if (cluster == 0x0006) {
    const char *st = (strcmp(val, "OFF") == 0) ? "OFF"
                   : (strcmp(val, "TOGGLE") == 0) ? "TOGGLE" : "ON";
    snprintf(cmd.payload, sizeof(cmd.payload), "{\"state\":\"%s\"}", st);
  } else if (cluster == 0x0008) {
    int v = atoi(val);
    if (v < 0) v = 0;
    if (v > 254) v = 254;
    snprintf(cmd.payload, sizeof(cmd.payload), "{\"brightness\":%d}", v);
  } else if (cluster == 0x0300 && val[0] == '#') {
    snprintf(cmd.payload, sizeof(cmd.payload), "{\"color\":{\"hex\":\"%.7s\"}}", val);
  } else {
    LOG_Z2M("z2m: cluster %04X cmd '%s' not supported in Z2M mode\r\n", (unsigned) cluster, val);
    return 400;
  }

  if (xQueueSend(zbeeCmdQueueHandle, &cmd, 0) != pdPASS) {
    LOG_Z2M("z2m: QUEUE FULL topic='%s'\r\n", cmd.topic);
    return 503;
  }
  LOG_Z2M("z2m: QUEUED topic='%s' payload='%s'\r\n", cmd.topic, cmd.payload);
  return 200;
}
