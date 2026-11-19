#ifndef Z2M_ADAPTER_H
#define Z2M_ADAPTER_H

#include <stdbool.h>
#include <stdint.h>
#include <stddef.h>
#include "mongoose.h"
#include "main.h"

/* Коды диагностики (совпадают с таблицей сообщений в Settings.js) */
typedef enum {
  Z2M_DIAG_OFF = 0,        /* режим Z2M выключен */
  Z2M_DIAG_MQTT_DOWN = 1,  /* нет связи с MQTT */
  Z2M_DIAG_BAD_HOST = 2,   /* DNS не разрешился: неверный IP/имя хоста */
  Z2M_DIAG_BAD_PORT = 3,   /* connection refused: неверный порт */
  Z2M_DIAG_BAD_AUTH = 4,   /* CONNACK 4/5: неверный логин/пароль */
  Z2M_DIAG_TIMEOUT = 5,    /* таймаут соединения */
  Z2M_DIAG_NO_BRIDGE = 6,  /* MQTT жив, bridge/state не пришёл за 30 с */
  Z2M_DIAG_Z2M_OFFLINE = 7,/* bridge/state = offline: Z2M не видит координатор */
  Z2M_DIAG_OK = 8,
  Z2M_DIAG_WAIT = 9        /* MQTT подключён, ждём bridge/state */
} z2m_diag_t;

/* 1, если выбран режим Zigbee2MQTT */
bool z2m_enabled(void);

/* Хуки MQTT-клиента (net.c, fn_mqtt) */
void z2m_on_mqtt_open(void);
void z2m_on_mqtt_close(void);
void z2m_on_mqtt_error(const char *err);
void z2m_on_connack_error(int code);

/* Подписки Z2M: <base>/+, <base>/bridge/state и <prefix>/sensor/+/linkquality/config
 * (имя по IEEE из HA Discovery; НЕ #, bridge/devices слишком большой) */
void z2m_subscribe(struct mg_connection *c, int qos);

/* Повторно запросить имена устройств (retained discovery). Безопасно из любого потока */
void z2m_request_resub(void);

/* Выполнить запрошенную повторную подписку. Только из контекста Mongoose (timer_fn_mqtt) */
void z2m_poll(struct mg_connection *c, int qos);

/* Фильтр входящего PUBLISH (вызывается в MG_EV_MQTT_MSG до постановки в очередь).
 * Возврат: 0 = не Z2M, обработка прежняя;
 *          1 = сообщение поглощено, в очередь ничего не ставить;
 *          2 = out заполнен компактным событием, поставить его в очередь. */
int z2m_rx_filter(const struct mg_mqtt_message *mm, MqttRxMsg_t *out);

/* Обработка компактного события из очереди (WebServerTask).
 * true = топик принадлежит Z2M и обработан. */
bool z2m_handle_rx(const char *topic, const char *payload);

/* Команда слота: cluster 6 (ON/OFF/TOGGLE), 8 (яркость), 768 (#RRGGBB).
 * Возврат как у zbee_send_cmd_status: 200, 400, 503. */
int z2m_send_cmd(int slot, uint16_t cluster, const char *val);

int z2m_send_dp(const char *ieee, uint16_t dp, const char *val);
const char *z2m_prop_name(uint16_t dp);

/* JSON состояния связи для GET /api/zigbee/link */
void z2m_diag_json(char *buf, size_t n);

/* Запуск проверки живости Home Assistant (GET /manifest.json, любой HTTP-ответ = жив) */
void z2m_ha_probe(struct mg_mgr *mgr);

/* Фрагмент JSON для шапки веб-интерфейса: {"c":код_диагностики,"h":состояние_HA,"g":шлюз_Hub} */
void z2m_link_json(char *buf, size_t n);

/* Фоновая проверка Home Assistant. Вызывать раз в секунду из контекста Mongoose */
void z2m_ha_tick(struct mg_mgr *mgr);

#endif /* Z2M_ADAPTER_H */
