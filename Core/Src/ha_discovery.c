#include "ha_discovery.h"
#include "db.h"
#include "ds18b20Config.h"
#include "zagotovka.h"
#include "main.h"
#include "mqtt_server.h"
#include "dtcm_alloc.h"
#include "fmt_float.h"
#include "version_gen.h"
#include <stdio.h>
#include <string.h>

#define HA_CFG_BUF    ((char *) dtcm_sensor_batch)   /* scratch для конфигов */
#define HA_CFG_SZ     (DTCM_BUF_SENSOR_BATCH)
#define HA_SNAP_BUF   ((char *) dtcm_timer_batch)    /* scratch для снимков состояний */
#define HA_SNAP_SZ    (DTCM_BUF_TIMER_BATCH)
#define HA_STEP_MS    30u     /* пауза между конфигами */
#define HA_CLR_MS     5u      /* пауза между пустыми (удаляющими) конфигами */
#define HA_STATE_MS   1000u   /* опрос состояний */
#define HA_SIG_MS     5000u   /* опрос изменений состава устройств */
#define HA_NODE_MAX   20    /* макс. длина имени узла в топиках Discovery */
#define HA_SN_MAX     24    /* сколько серийников DS18B20 помним для очистки */
#define HA_CLR_PIN    18    /* слотов очистки на один физический пин */

extern volatile bool mqtt_connected_reported;
extern char g_ip_addr[16];

/* 1: заранее известные entity_id через default_entity_id (нужен Home Assistant 2025.10 или новее).
 * Для более старых версий поставьте 0, иначе они отклонят конфиги с неизвестным ключом. */
#ifndef HA_ENTITY_IDS
#define HA_ENTITY_IDS 1
#endif

typedef struct {
  char     node[HA_NODE_MAX + 1];
  char     tx[32];
  char     rx[32];
  char     pfx[24];
  uint32_t last_ms, last_state_ms, last_sig_ms, sig;
  uint32_t h[4];            /* хэши последних снимков: sw, pwm, ds, dht */
  uint16_t a, s;
  uint8_t  active, pass, phase, b, force;
  uint8_t  sn_n;                 /* сколько серийников запомнено */
  uint8_t  sn[HA_SN_MAX][8];     /* серийники DS18B20, когда-либо выданные в Discovery */
} HaCtx;

static HaCtx *g = NULL;     /* единственный указатель в .bss */

static const char *k_bk[3] = {"SINGLE_CLICK", "DOUBLE_CLICK", "LONG_PRESS"};
static const char *k_bn[3] = {"short", "double", "long"};
static const char *k_bl[3] = {"click", "double click", "long press"};
static const char *k_cl[3] = {"single_click", "double_click", "long_press"};
static const char *k_grp[4] = {"sw", "pwm", "ds", "dht"};

static uint32_t fnv(uint32_t h, const void *p, size_t n) {
  const uint8_t *s = (const uint8_t *) p;
  while (n--) { h ^= *s++; h *= 16777619u; }
  return h;
}

static const char *pwm_comp(void) {
  return HA_PWM_TYPE == 1 ? "light" : (HA_PWM_TYPE == 2 ? "fan" : "number");
}

static int pin_is(int id, uint8_t t) {
  return id >= 1 && id <= NUMPIN && PinsConf[id - 1].topin == t;
}

static int dht_has(int id) {
  for (int j = 0; j < MAX_DHT22_P; j++) {
    if (dht22[j].id == id && dht22[j].onoff && dht22[j].typsensr == 2) return 1;
  }
  return 0;
}
/* Zigbee-слот является кнопкой, если он занят, включен и имеет роль TRIGGER */
static int zb_btn(int k) {
  return k >= 0 && k < NUMZBEE && ZigbeeConf[k].zbee_ieee[0] != '\0' &&
         ZigbeeConf[k].zbee_role == ZBEE_ROLE_TRIGGER && ZigbeeConf[k].onoff != 0;
}

/* id: физический пин 1..NUMPIN или Zigbee NUMPIN+1.. */
static int btn_exists(int id) {
  return pin_is(id, 1) || (IsZigbeePin(id) && zb_btn(ZbeeIdx(id)));
}
static void sn_str(char *out, const uint8_t *a) {
  snprintf(out, 17, "%02X%02X%02X%02X%02X%02X%02X%02X",
           a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]);
}

static int ds_has(const char *sn) {
  char cur[17];
  for (int p = 0; p < MAX_DS18B20_P; p++) {
    if (!ds18b20[p].onoff) continue;
    for (int s = 0; s < ds18b20[p].numsens; s++) {
      sn_str(cur, ds18b20[p].sensors[s].addr);
      if (strcmp(cur, sn) == 0) return 1;
    }
  }
  return 0;
}

static int sn_known(const uint8_t *a) {
  for (int i = 0; i < g->sn_n; i++) {
    if (memcmp(g->sn[i], a, 8) == 0) return 1;
  }
  return 0;
}

/* Запоминаем серийники текущих датчиков. Старые не забываем: по ним шлём очистку */
static void sn_remember(void) {
  for (int p = 0; p < MAX_DS18B20_P; p++) {
    if (!ds18b20[p].onoff) continue;
    for (int s = 0; s < ds18b20[p].numsens; s++) {
      const uint8_t *a = ds18b20[p].sensors[s].addr;
      if (sn_known(a)) continue;
      if (g->sn_n >= HA_SN_MAX) {   /* заполнено: вытесняем самый старый */
        memmove(g->sn[0], g->sn[1], 8 * (HA_SN_MAX - 1));
        g->sn_n = HA_SN_MAX - 1;
      }
      memcpy(g->sn[g->sn_n++], a, 8);
    }
  }
}

/* Подпись состава устройств: меняется при добавлении, удалении, переименовании, смене типа */
static uint32_t calc_sig(void) {
  uint32_t h = 2166136261u;
  for (int i = 0; i < NUMPIN; i++) {
    uint8_t t = PinsConf[i].topin;
    uint8_t ib = (uint8_t) i;
    if (t != 1 && t != 3 && t != 5 && t != 10) continue;
    h = fnv(h, &t, 1);
    h = fnv(h, &ib, 1);
    h = fnv(h, PinsConf[i].info, strnlen(PinsConf[i].info, 29));
  }
  for (int p = 0; p < MAX_DS18B20_P; p++) {
    uint8_t f[2] = {ds18b20[p].onoff, ds18b20[p].numsens};
    h = fnv(h, f, 2);
    if (!f[0]) continue;
    for (int s = 0; s < ds18b20[p].numsens; s++) {
      h = fnv(h, ds18b20[p].sensors[s].addr, 8);
      h = fnv(h, ds18b20[p].sensors[s].info, strnlen(ds18b20[p].sensors[s].info, 29));
    }
  }
  for (int j = 0; j < MAX_DHT22_P; j++) {
    uint8_t f[3] = {dht22[j].id, dht22[j].onoff, dht22[j].typsensr};
    h = fnv(h, f, 3);
    h = fnv(h, dht22[j].info, strnlen(dht22[j].info, 29));
  }
  for (int k = 0; k < NUMZBEE; k++) {
    uint8_t kb = (uint8_t) k;
    if (!zb_btn(k)) continue;
    h = fnv(h, &kb, 1);
    h = fnv(h, ZigbeeConf[k].zbee_label, strnlen(ZigbeeConf[k].zbee_label, 29));
  }
  return h;
}

void ha_discovery_init(void) {
  size_t i, n;
  if (g != NULL) return;
  if (!SetSettings.check_ha_disc) { printf("[HA] disabled (check_ha_disc=0)\r\n"); return; }
  if (SetSettings.txmqttop[0] == '\0') { printf("[HA] TX topic is empty, discovery off\r\n"); return; }
  g = (HaCtx *) dtcm_malloc(sizeof(HaCtx));
  if (g == NULL) { printf("[HA] dtcm_malloc failed\r\n"); return; }
  memset(g, 0, sizeof(*g));
  strncpy(g->tx, SetSettings.txmqttop, sizeof(g->tx) - 1);
  strncpy(g->rx, SetSettings.rxmqttop, sizeof(g->rx) - 1);
  for (i = 0, n = strlen(g->tx); i < n && i < HA_NODE_MAX; i++) {
    char ch = g->tx[i];
    g->node[i] = ((ch >= '0' && ch <= '9') || (ch >= 'a' && ch <= 'z') ||
                  (ch >= 'A' && ch <= 'Z') || ch == '-') ? ch : '_';
  }
  strncpy(g->pfx, SetSettings.ha_prefix[0] ? SetSettings.ha_prefix : "homeassistant",
          sizeof(g->pfx) - 1);
  for (i = 0, n = strlen(g->pfx); i < n; i++) {
    if (g->pfx[i] == '#' || g->pfx[i] == '+' || g->pfx[i] == ' ') g->pfx[i] = '_';
  }
  g->sig = calc_sig();
  sn_remember();
  g->force = 0x0F;
  g->active = 1;   /* первая выдача после старта */
  printf("[HA] init ok: node=%s pfx=%s tx=%s\r\n", g->node, g->pfx, g->tx);
}

void ha_discovery_request(void) {
  if (g == NULL) return;
  g->pass = 0; g->phase = 0; g->a = 0; g->s = 0; g->b = 0;
  g->force = 0x0F;
  g->active = 1;
}

uint8_t ha_discovery_filter_hit(const char *filter, size_t len) {
  size_t pl;
  if (g == NULL) return 0;
  pl = strlen(g->pfx);
  return (len > pl && memcmp(filter, g->pfx, pl) == 0 && filter[pl] == '/') ? 1 : 0;
}

/* 1, если топик — конфиг Discovery: <prefix>/<comp>/<obj>/config.
 * Используется брокером: конфиги доставляются клиентам с флагом ha_cfg,
 * даже если у них нет подходящего слота подписки. */
uint8_t ha_discovery_is_cfg_topic(const char *topic) {
  size_t pl, tl;
  if (g == NULL) return 0;
  pl = strlen(g->pfx);
  tl = strlen(topic);
  return (tl > pl + 8 && memcmp(topic, g->pfx, pl) == 0 && topic[pl] == '/' &&
          memcmp(topic + tl - 7, "/config", 7) == 0) ? 1 : 0;
}

static void pub(struct mg_connection *c, const char *topic, const char *payload) {
  send_mqtt_raw(c, topic, payload, true);
}

static void dev_block(char *out, size_t n) {
  char extra[64];
  extra[0] = '\0';
  if (g_ip_addr[0] != '\0' && strcmp(g_ip_addr, "0.0.0.0") != 0) {
    snprintf(extra, sizeof(extra), ",\"cu\":\"http://%s/\"", g_ip_addr);
  }
  /* Имя устройства фиксированное; различает контроллеры только ids (node) */
  snprintf(out, n,
           "\"dev\":{\"ids\":[\"%s\"],\"name\":\"Zagotovka - M\",\"mf\":\"Zagotovka\","
           "\"mdl\":\"M\",\"sw\":\"%s\",\"sa\":\"Zagotovka\"%s}",
           g->node, FW_VERSION, extra);
}

static void esc_name(char *nm, size_t n, const char *info, const char *dflt) {
  char raw[40];
  if (info != NULL && info[0] != '\0') snprintf(raw, sizeof(raw), "%.29s", info);
  else snprintf(raw, sizeof(raw), "%s", dflt);
  json_escape_str(nm, raw, n);
}

/* Достает comp и obj из <pfx>/<comp>/<node>/<obj>/config; 1 при успехе */
static int cfg_parts(const char *tp, char *comp, size_t cn, char *obj, size_t on) {
  const char *p = tp + strlen(g->pfx) + 1;
  const char *e1 = strchr(p, '/');
  const char *e2 = e1 ? strchr(e1 + 1, '/') : NULL;
  const char *e3 = e2 ? strchr(e2 + 1, '/') : NULL;
  if (e3 == NULL || (size_t) (e1 - p) >= cn || (size_t) (e3 - e2 - 1) >= on) return 0;
  memcpy(comp, p, (size_t) (e1 - p)); comp[e1 - p] = '\0';
  memcpy(obj, e2 + 1, (size_t) (e3 - e2 - 1)); obj[e3 - e2 - 1] = '\0';
  return 1;
}

/* Перед отправкой вставляем в JSON значок и заранее известный entity_id */
static void send_cfg(struct mg_connection *c, const char *tp, int written) {
  char comp[24], obj[40], ins[160];
  int add = 0;
  if (written <= 0 || written >= (int) HA_CFG_SZ) return;
  if (HA_CFG_BUF[0] == '{' && strncmp(tp, g->pfx, strlen(g->pfx)) == 0 &&
      cfg_parts(tp, comp, sizeof(comp), obj, sizeof(obj)) &&
      strcmp(comp, "device_automation") != 0) {
    const char *icon = NULL;
    for (char *q = obj; *q; q++) {
      if (*q >= 'A' && *q <= 'Z') *q = (char) (*q + 32);   /* entity_id только строчными */
    }
    if (strcmp(comp, "button") == 0) icon = "mdi:gesture-tap-button";
    else if (strcmp(comp, "event") == 0) icon = (obj[0] == 's') ? "mdi:shield-alert" : "mdi:gesture-tap";
    else if (strcmp(comp, "number") == 0) icon = "mdi:tune-variant";
    if (icon != NULL) add += snprintf(ins + add, sizeof(ins) - (size_t) add, "\"icon\":\"%s\",", icon);
#if HA_ENTITY_IDS
    add += snprintf(ins + add, sizeof(ins) - (size_t) add,
                    "\"default_entity_id\":\"%s.zagotovka_%s\",", comp, obj);
#endif
    if (add > 0 && add < (int) sizeof(ins) && written + add < (int) HA_CFG_SZ) {
      memmove(HA_CFG_BUF + 1 + add, HA_CFG_BUF + 1, (size_t) written);   /* вместе с '\0' */
      memcpy(HA_CFG_BUF + 1, ins, (size_t) add);
    }
  }
  pub(c, tp, HA_CFG_BUF);
}

/* ---- Какие объекты принадлежат текущему проекту (для удаления лишних) ---- */
static int obj_exists(const char *comp, const char *obj) {
  int id;
  if (strncmp(obj, "sw", 2) == 0 && sscanf(obj + 2, "%d", &id) == 1)
    return strcmp(comp, "switch") == 0 && pin_is(id, 3);
  if (strncmp(obj, "pwm", 3) == 0 && sscanf(obj + 3, "%d", &id) == 1)
    return strcmp(comp, pwm_comp()) == 0 && pin_is(id, 5);
  if (obj[0] == 'b' && obj[1] == 't' && obj[2] >= '0' && obj[2] <= '9' && sscanf(obj + 2, "%d", &id) == 1) {
    const char *u = strchr(obj, '_');
    return btn_exists(id) && (u == NULL ? strcmp(comp, "event") == 0 : strcmp(comp, "button") == 0);
  }
  if (strncmp(obj, "sec", 3) == 0 && sscanf(obj + 3, "%d", &id) == 1)
    return strcmp(comp, "event") == 0 && pin_is(id, 10);
  if (strncmp(obj, "dht", 3) == 0 && sscanf(obj + 3, "%d_", &id) == 1)
    return strcmp(comp, "sensor") == 0 && dht_has(id);
  if (obj[0] == 't' && strlen(obj) == 17)
    return strcmp(comp, "sensor") == 0 && ds_has(obj + 1);
  return 0;   /* неизвестный объект нашего node: удаляем */
}

/* Приём retained-конфигов своего node (внешний брокер): лишние стираем пустым retained */
uint8_t ha_discovery_handle_rx(const char *topic, const char *payload) {
  char st[40], comp[24], obj[40];
  const char *p, *e;
  size_t pl, n;
  if (g == NULL) return 0;
  pl = strlen(g->pfx);
  if (strncmp(topic, g->pfx, pl) != 0 || topic[pl] != '/') return 0;
  snprintf(st, sizeof(st), "%s/status", g->pfx);
  if (strcmp(topic, st) == 0) {
    if (strcmp(payload, "online") == 0) ha_discovery_request();
    return 1;
  }
  p = topic + pl + 1;
  e = strchr(p, '/');
  if (e == NULL) return 0;
  n = (size_t) (e - p);
  if (n >= sizeof(comp)) return 0;
  memcpy(comp, p, n); comp[n] = '\0';
  p = e + 1;
  e = strchr(p, '/');
  if (e == NULL || (size_t) (e - p) != strlen(g->node) || memcmp(p, g->node, (size_t) (e - p)) != 0) return 0;
  p = e + 1;
  e = strchr(p, '/');
  if (e == NULL || strcmp(e, "/config") != 0) return 0;
  n = (size_t) (e - p);
  if (n >= sizeof(obj)) return 0;
  memcpy(obj, p, n); obj[n] = '\0';
  if (payload[0] == '\0') return 1;               /* уже очищен */
  if (!obj_exists(comp, obj)) send_mqtt_raw(s_conn, topic, "", true);
  return 1;
}
/* Кнопка (физическая или Zigbee) как отдельное устройство, привязанное к основному.
 * b: 0 = событие нажатия (event), 1..3 = нажимаемые кнопки click / double / long */
static void emit_btn(struct mg_connection *c, int id, const char *info, int b) {
  char tp[128], dev[256], nm[64], d[24];
  char *buf = HA_CFG_BUF;
  const char *N = g->node, *T = g->tx, *R = g->rx, *P = g->pfx;
  const char *sfx = "sdl";
  int w;

  snprintf(d, sizeof(d), "Button %d", id);
  esc_name(nm, sizeof(nm), info, d);
  snprintf(dev, sizeof(dev),
    "\"dev\":{\"ids\":[\"%s_btn%d\"],\"name\":\"%s\",\"mf\":\"Zagotovka\","
    "\"mdl\":\"Button\",\"via_device\":\"%s\",\"sa\":\"Zagotovka Buttons\"}", N, id, nm, N);
  if (b == 0) {
    snprintf(tp, sizeof(tp), "%s/event/%s/bt%d/config", P, N, id);
    w = snprintf(buf, HA_CFG_SZ,
      "{\"uniq_id\":\"%s_bt%d\",\"name\":\"event\",\"stat_t\":\"%s/ev/bt%d\","
      "\"device_class\":\"button\",\"event_types\":[\"short\",\"double\",\"long\"],"
      "\"avty_t\":\"%s/status\",%s}", N, id, T, id, T, dev);
  } else if (b >= 1 && b <= 3) {
    int k = b - 1;
    snprintf(tp, sizeof(tp), "%s/button/%s/bt%d_%c/config", P, N, id, sfx[k]);
    w = snprintf(buf, HA_CFG_SZ,
      "{\"uniq_id\":\"%s_bt%d_%c\",\"name\":\"%s\",\"cmd_t\":\"%s\","
      "\"payload_press\":\"%s/button/id=%d/%s\",\"avty_t\":\"%s/status\",%s}",
      N, id, sfx[k], k_bl[k], R, R, id, k_cl[k], T, dev);
  } else {
    return;
  }
  send_cfg(c, tp, w);
}
/* ---- Конфиги ---- */
static int pin_msgs(int i) {
  uint8_t t = PinsConf[i].topin;
  if (t == 3 || t == 5) return 1;
  if (t == 1) return 4;
  if (t == 10) return 1;
  return 0;
}

static void emit_pin(struct mg_connection *c, int i, int b) {
  char tp[128], dev[192], nm[64];
  char *buf = HA_CFG_BUF;
  int id = i + 1, w = 0;
  uint8_t t = PinsConf[i].topin;
  const char *N = g->node, *T = g->tx, *R = g->rx, *P = g->pfx;

  dev_block(dev, sizeof(dev));
  if (t == 3) {
    char d[24]; snprintf(d, sizeof(d), "Switch %d", id);
    esc_name(nm, sizeof(nm), PinsConf[i].info, d);
    snprintf(tp, sizeof(tp), "%s/switch/%s/sw%d/config", P, N, id);
    w = snprintf(buf, HA_CFG_SZ,
      "{\"uniq_id\":\"%s_sw%d\",\"name\":\"%s\",\"stat_t\":\"%s/ha/sw\","
      "\"val_tpl\":\"{{ 'ON' if value_json['%d']|int else 'OFF' }}\","
      "\"cmd_t\":\"%s\",\"pl_on\":\"%s/switch/id=%d/state=1\","
      "\"pl_off\":\"%s/switch/id=%d/state=0\",\"stat_on\":\"ON\",\"stat_off\":\"OFF\","
      "\"avty_t\":\"%s/status\",%s}",
      N, id, nm, T, id, R, R, id, R, id, T, dev);
  } else if (t == 5) {
    char d[24]; snprintf(d, sizeof(d), "PWM %d", id);
    esc_name(nm, sizeof(nm), PinsConf[i].info, d);
    snprintf(tp, sizeof(tp), "%s/%s/%s/pwm%d/config", P, pwm_comp(), N, id);
#if HA_PWM_TYPE == 1
    w = snprintf(buf, HA_CFG_SZ,
      "{\"uniq_id\":\"%s_pwm%d\",\"name\":\"%s\",\"stat_t\":\"%s/ha/pwm\","
      "\"stat_val_tpl\":\"{{ 'ON' if value_json['%d']|int > 0 else 'OFF' }}\","
      "\"cmd_t\":\"%s\",\"pl_on\":\"%s/pwm/id=%d/dvalue=100\",\"pl_off\":\"%s/pwm/id=%d/dvalue=0\","
      "\"bri_stat_t\":\"%s/ha/pwm\",\"bri_val_tpl\":\"{{ value_json['%d']|int }}\",\"bri_scl\":100,"
      "\"bri_cmd_t\":\"%s\",\"brightness_command_template\":\"{{ '%s/pwm/id=%d/dvalue=' ~ value }}\","
      "\"avty_t\":\"%s/status\",%s}",
      N, id, nm, T, id, R, R, id, R, id, T, id, R, R, id, T, dev);
#elif HA_PWM_TYPE == 2
    w = snprintf(buf, HA_CFG_SZ,
      "{\"uniq_id\":\"%s_pwm%d\",\"name\":\"%s\",\"stat_t\":\"%s/ha/pwm\","
      "\"stat_val_tpl\":\"{{ 'ON' if value_json['%d']|int > 0 else 'OFF' }}\","
      "\"cmd_t\":\"%s\",\"pl_on\":\"%s/pwm/id=%d/dvalue=100\",\"pl_off\":\"%s/pwm/id=%d/dvalue=0\","
      "\"pct_stat_t\":\"%s/ha/pwm\",\"pct_val_tpl\":\"{{ value_json['%d']|int }}\","
      "\"pct_cmd_t\":\"%s\",\"percentage_command_template\":\"{{ '%s/pwm/id=%d/dvalue=' ~ value }}\","
      "\"avty_t\":\"%s/status\",%s}",
      N, id, nm, T, id, R, R, id, R, id, T, id, R, R, id, T, dev);
#else
    w = snprintf(buf, HA_CFG_SZ,
      "{\"uniq_id\":\"%s_pwm%d\",\"name\":\"%s\",\"stat_t\":\"%s/ha/pwm\","
      "\"val_tpl\":\"{{ value_json['%d']|int }}\",\"cmd_t\":\"%s\","
      "\"cmd_tpl\":\"{{ '%s/pwm/id=%d/dvalue=' ~ (value|int) }}\","
      "\"min\":0,\"max\":100,\"step\":1,\"mode\":\"slider\",\"unit_of_meas\":\"%%\","
      "\"avty_t\":\"%s/status\",%s}",
      N, id, nm, T, id, R, R, id, T, dev);
#endif
    } else if (t == 1) {
    emit_btn(c, id, PinsConf[i].info, b);
    return;
    } else if (t == 10) {
      char d[24]; snprintf(d, sizeof(d), "Security %d", id);
      esc_name(nm, sizeof(nm), PinsConf[i].info, d);
      snprintf(tp, sizeof(tp), "%s/event/%s/sec%d/config", P, N, id);
      w = snprintf(buf, HA_CFG_SZ,
        "{\"uniq_id\":\"%s_sec%d\",\"name\":\"%s\",\"stat_t\":\"%s/ev/sec%d\","
        "\"device_class\":\"motion\",\"event_types\":[\"triggered\"],"
        "\"avty_t\":\"%s/status\",%s}", N, id, nm, T, id, T, dev);
  } else {
    return;
  }
  send_cfg(c, tp, w);
}

static void emit_ds(struct mg_connection *c, int pin, int s) {
  char tp[128], dev[192], sn[17], nm[64], d[28];
  char *buf = HA_CFG_BUF;
  const char *N = g->node, *T = g->tx, *P = g->pfx;
  sn_str(sn, ds18b20[pin].sensors[s].addr);
  snprintf(d, sizeof(d), "DS18B20 %s", sn);
  esc_name(nm, sizeof(nm), ds18b20[pin].sensors[s].info, d);
  dev_block(dev, sizeof(dev));
  snprintf(tp, sizeof(tp), "%s/sensor/%s/t%s/config", P, N, sn);
  send_cfg(c, tp, snprintf(buf, HA_CFG_SZ,
    "{\"uniq_id\":\"%s_t%s\",\"name\":\"%s\",\"stat_t\":\"%s/ha/ds\","
    "\"val_tpl\":\"{{ value_json['%s'] if '%s' in value_json else None }}\","
    "\"dev_cla\":\"temperature\",\"unit_of_meas\":\"\\u00b0C\",\"stat_cla\":\"measurement\","
    "\"avty_t\":\"%s/status\",%s}", N, sn, nm, T, sn, sn, T, dev));
}

static void emit_dht(struct mg_connection *c, int j, int b) {
  char tp[128], dev[192], nm[64], d[24], full[96];
  char *buf = HA_CFG_BUF;
  int id = dht22[j].id;
  const char *N = g->node, *T = g->tx, *P = g->pfx;
  snprintf(d, sizeof(d), "DHT22 %d", id);
  esc_name(nm, sizeof(nm), dht22[j].info, d);
  snprintf(full, sizeof(full), "%s %s", nm, b == 0 ? "temperature" : "humidity");
  dev_block(dev, sizeof(dev));
  snprintf(tp, sizeof(tp), "%s/sensor/%s/dht%d_%c/config", P, N, id, b == 0 ? 't' : 'h');
  if (b == 0) {
    send_cfg(c, tp, snprintf(buf, HA_CFG_SZ,
      "{\"uniq_id\":\"%s_dht%d_t\",\"name\":\"%s\",\"stat_t\":\"%s/ha/dht\","
      "\"val_tpl\":\"{{ value_json['t%d'] if 't%d' in value_json else None }}\","
      "\"dev_cla\":\"temperature\",\"unit_of_meas\":\"\\u00b0C\",\"stat_cla\":\"measurement\","
      "\"avty_t\":\"%s/status\",%s}", N, id, full, T, id, id, T, dev));
  } else {
    send_cfg(c, tp, snprintf(buf, HA_CFG_SZ,
      "{\"uniq_id\":\"%s_dht%d_h\",\"name\":\"%s\",\"stat_t\":\"%s/ha/dht\","
      "\"val_tpl\":\"{{ value_json['h%d'] if 'h%d' in value_json else None }}\","
      "\"dev_cla\":\"humidity\",\"unit_of_meas\":\"%%\",\"stat_cla\":\"measurement\","
      "\"avty_t\":\"%s/status\",%s}", N, id, full, T, id, id, T, dev));
  }
}

/* ---- Очистка (внутренний брокер: retained не хранится, список опубликованного неизвестен,
 *      поэтому стираем все возможные объекты пинов, которых сейчас нет) ---- */
static int emit_clear(struct mg_connection *c, int idx) {
  char tp[128];
  const char *N = g->node, *P = g->pfx;
  int i = idx / HA_CLR_PIN, k = idx % HA_CLR_PIN, id = i + 1;
  uint8_t t;

  if (idx >= NUMPIN * HA_CLR_PIN) {   /* Zigbee-кнопки: 4 объекта на слот */
    int z = (idx - NUMPIN * HA_CLR_PIN) / 4;
    k = (idx - NUMPIN * HA_CLR_PIN) % 4;
    if (zb_btn(z)) return 0;
    id = ZbeeIdFromIdx(z);
    if (k == 0) snprintf(tp, sizeof(tp), "%s/event/%s/bt%d/config", P, N, id);
    else snprintf(tp, sizeof(tp), "%s/button/%s/bt%d_%c/config", P, N, id, "sdl"[k - 1]);
    pub(c, tp, "");
    return 1;
  }

  t = PinsConf[i].topin;
  switch (k) {
  case 0: if (t == 3) return 0;
          snprintf(tp, sizeof(tp), "%s/switch/%s/sw%d/config", P, N, id); break;
  case 1: case 2: case 3:
          if (t == 5 && (k - 1) == HA_PWM_TYPE) return 0;
          snprintf(tp, sizeof(tp), "%s/%s/%s/pwm%d/config", P,
                   k == 1 ? "number" : (k == 2 ? "light" : "fan"), N, id); break;
  case 4: case 5: case 6:   /* старые триггеры кнопок: стираем всегда */
          snprintf(tp, sizeof(tp), "%s/device_automation/%s/btn%d_%s/config", P, N, id, k_bn[k - 4]); break;
  case 7: /* старый триггер охраны: стираем всегда */
          snprintf(tp, sizeof(tp), "%s/device_automation/%s/sec%d/config", P, N, id); break;
  case 8: case 9:
          if (dht_has(id)) return 0;
          snprintf(tp, sizeof(tp), "%s/sensor/%s/dht%d_%c/config", P, N, id, k == 8 ? 't' : 'h'); break;
  case 10: case 11: case 12:   /* старые кнопки на основном устройстве: стираем всегда */
          snprintf(tp, sizeof(tp), "%s/button/%s/btn%d_%s/config", P, N, id, k_bn[k - 10]); break;
  case 13: if (t == 1) return 0;
          snprintf(tp, sizeof(tp), "%s/event/%s/bt%d/config", P, N, id); break;
  case 17: if (t == 10) return 0;
          snprintf(tp, sizeof(tp), "%s/event/%s/sec%d/config", P, N, id); break;
  default:   /* 14..16 */
          if (t == 1) return 0;
          snprintf(tp, sizeof(tp), "%s/button/%s/bt%d_%c/config", P, N, id, "sdl"[k - 14]); break;
  }
  pub(c, tp, "");
  return 1;
}

static void sweep_subscribe(struct mg_connection *c) {
  char f[96];
  struct mg_mqtt_opts o;
  snprintf(f, sizeof(f), "%s/+/%s/+/config", g->pfx, g->node);
  memset(&o, 0, sizeof(o));
  o.topic = mg_str(f);
  mg_mqtt_unsub(c, &o);
  mg_mqtt_sub(c, &o);   /* брокер повторит retained-конфиги: лишние стирает ha_discovery_handle_rx */
}

/* -1 завершено, 0 перешли дальше без отправки, 1 отправлено сообщение */
static int step(struct mg_connection *c) {
  HaCtx *x = g;
  if (x->pass == 1) {   /* очистка */
      if (x->a < NUMPIN * HA_CLR_PIN + NUMZBEE * 4) return emit_clear(c, x->a++);
    /* DS18B20, которые были раньше, а сейчас пропали: стираем их конфиги */
    while (x->s < x->sn_n) {
      char sn[17], tp[128];
      sn_str(sn, x->sn[x->s++]);
      if (ds_has(sn)) continue;
      snprintf(tp, sizeof(tp), "%s/sensor/%s/t%s/config", x->pfx, x->node, sn);
      pub(c, tp, "");
      return 1;
    }
    x->pass = 2;
    return 0;
  }
  if (x->pass == 2) {   /* завершение */
    char tp[48];
    sn_remember();      /* новые датчики запоминаем только после очистки старых */
    snprintf(tp, sizeof(tp), "%s/status", x->tx);
    pub(c, tp, "online");
    if (c != NULL && mqtt_connected_reported) sweep_subscribe(c);
    x->active = 0;
    x->last_state_ms = 0;
    return -1;
  }
  switch (x->phase) {
  case 0: {
    int n;
    if (x->a >= NUMPIN) { x->phase = 1; x->a = 0; x->s = 0; x->b = 0; return 0; }
    n = pin_msgs(x->a);
    if (x->b >= n) { x->a++; x->b = 0; return 0; }
    emit_pin(c, x->a, x->b);
    x->b++;
    return 1;
  }
  case 1:
    if (x->a >= MAX_DS18B20_P) { x->phase = 2; x->a = 0; x->s = 0; x->b = 0; return 0; }
    if (!ds18b20[x->a].onoff || x->s >= ds18b20[x->a].numsens) { x->a++; x->s = 0; return 0; }
    emit_ds(c, x->a, x->s);
    x->s++;
    return 1;
  case 2:
    if (x->a >= MAX_DHT22_P) { x->phase = 3; x->a = 0; x->b = 0; return 0; }
    if (!dht22[x->a].onoff || dht22[x->a].typsensr != 2 || x->b >= 2) { x->a++; x->b = 0; return 0; }
        emit_dht(c, x->a, x->b);
    x->b++;
    return 1;
  case 3:   /* Zigbee-кнопки */
    if (x->a >= NUMZBEE) { x->phase = 4; return 0; }
    if (!zb_btn((int) x->a) || x->b >= 4) { x->a++; x->b = 0; return 0; }
    emit_btn(c, ZbeeIdFromIdx((int) x->a), ZigbeeConf[x->a].zbee_label, x->b);
    x->b++;
    return 1;
  default:
	    x->pass = SetSettings.check_mqtt_srv ? 1 : 2;
	    x->a = 0;
	    x->s = 0;
    return 0;
  }
}

/* ---- Состояния: группами, публикуются только при изменении ---- */
static int snap(int grp) {
  char *b = HA_SNAP_BUF;
  int o = 0, n = 0;
  o += snprintf(b + o, HA_SNAP_SZ - o, "{");
  if (grp == 0 || grp == 1) {
    uint8_t want = (grp == 0) ? 3 : 5;
    for (int i = 0; i < NUMPIN && o < (int) HA_SNAP_SZ - 24; i++) {
      int v;
      if (PinsConf[i].topin != want) continue;
      v = (grp == 0) ? (PinsConf[i].on ? 1 : 0) : (int) PinsConf[i].dvalue;
      o += snprintf(b + o, HA_SNAP_SZ - o, "%s\"%d\":%d", n++ ? "," : "", i + 1, v);
    }
  } else if (grp == 2) {
    for (int p = 0; p < MAX_DS18B20_P; p++) {
      if (!ds18b20[p].onoff) continue;
      for (int s = 0; s < ds18b20[p].numsens && o < (int) HA_SNAP_SZ - 40; s++) {
        char sn[17], tv[16];
        if (!ds18b20[p].sensors[s].valid) continue;
        sn_str(sn, ds18b20[p].sensors[s].addr);
        fmt_float(tv, sizeof(tv), ds18b20[p].sensors[s].temp, 1);
        o += snprintf(b + o, HA_SNAP_SZ - o, "%s\"%s\":%s", n++ ? "," : "", sn, tv);
      }
    }
  } else {
    for (int j = 0; j < MAX_DHT22_P && o < (int) HA_SNAP_SZ - 48; j++) {
      char tv[16], hv[16];
      if (!dht22[j].onoff || dht22[j].typsensr != 2 || !dht22[j].valid) continue;
      fmt_float(tv, sizeof(tv), dht22[j].temp, 1);
      fmt_float(hv, sizeof(hv), dht22[j].humid, 0);
      o += snprintf(b + o, HA_SNAP_SZ - o, "%s\"t%d\":%s,\"h%d\":%s",
                    n++ ? "," : "", dht22[j].id, tv, dht22[j].id, hv);
    }
  }
  o += snprintf(b + o, HA_SNAP_SZ - o, "}");
  return o;
}

static void states(struct mg_connection *c) {
  char tp[64];
  for (int k = 0; k < 4; k++) {
    int n = snap(k);
    uint32_t h = fnv(2166136261u, HA_SNAP_BUF, (size_t) n);
    if (!(g->force & (1u << k)) && h == g->h[k]) continue;
    snprintf(tp, sizeof(tp), "%s/ha/%s", g->tx, k_grp[k]);
    pub(c, tp, HA_SNAP_BUF);
    g->h[k] = h;
    g->force &= (uint8_t) ~(1u << k);
  }
}

void ha_discovery_poll(struct mg_connection *c) {
  HaCtx *x = g;
  uint32_t now;
  if (x == NULL) return;
  if (!SetSettings.check_mqtt_srv && !(c != NULL && mqtt_connected_reported)) return;
  if (c != NULL && mqtt_connected_reported && c->send.len > 2048) return;
  /* Встроенный брокер: внешний клиент не подписан — backpressure не виден.
   * Ждём, пока send-буферы всех клиентов брокера разгрузятся, иначе
   * конфиги теряются молча (mqtt_server_publish пропускает их по лимиту). */
  if (SetSettings.check_mqtt_srv && mqtt_server_max_sendlen() > 2048) return;
  now = HAL_GetTick();
  if (x->active) {
    if (now - x->last_ms < (x->pass == 1 ? HA_CLR_MS : HA_STEP_MS)) return;
    x->last_ms = now;
    for (int guard = 0; guard < 128; guard++) {
      if (step(c) != 0) break;
    }
    return;
  }
  if (now - x->last_state_ms >= HA_STATE_MS) {
    x->last_state_ms = now;
    states(c);
  }
  if (now - x->last_sig_ms >= HA_SIG_MS) {
    uint32_t sg;
    x->last_sig_ms = now;
    sg = calc_sig();
    if (sg != x->sig) { x->sig = sg; ha_discovery_request(); }
  }
}

/* ---- События кнопок и охраны: один общий топик <tx>/ev, без retain ---- */
void ha_observe(struct mg_connection *c, const char *topic, const char *msg) {
  int id;
  char kind[16], tp[48], pl[32];
  if (g == NULL) return;
  if (strcmp(topic, "/button/") == 0) {
    const char *k;
    if (sscanf(msg, "ID=%d/%15[A-Z_]/", &id, kind) != 2 || !btn_exists(id)) return;
    k = strcmp(kind, k_bk[0]) == 0 ? k_bn[0] : strcmp(kind, k_bk[1]) == 0 ? k_bn[1]
      : strcmp(kind, k_bk[2]) == 0 ? k_bn[2] : NULL;
    if (k == NULL) return;
    snprintf(pl, sizeof(pl), "{\"event_type\":\"%s\"}", k);
    snprintf(tp, sizeof(tp), "%s/ev/bt%d", g->tx, id);
  } else if (strcmp(topic, "/security/") == 0) {
    if (sscanf(msg, "SECURITY/ID=%d/", &id) != 1 || !pin_is(id, 10)) return;
    snprintf(pl, sizeof(pl), "{\"event_type\":\"triggered\"}");
    snprintf(tp, sizeof(tp), "%s/ev/sec%d", g->tx, id);
  } else {
    return;
  }
  send_mqtt_raw(c, tp, pl, false);
}
