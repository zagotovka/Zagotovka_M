/* Интеграция с Home Assistant (MQTT Discovery): состав сущностей, имена entity_id,
 * требования и ограничения описаны в docs/HOME_ASSISTANT.md. Готовые дашборды:
 * zagotovka_dashboard.yaml (нужен auto-entities) и zagotovka_dashboard_core.yaml. */

#ifndef HA_DISCOVERY_H
#define HA_DISCOVERY_H

#include <stdint.h>
#include <stddef.h>
#include <stdbool.h>
#include "mongoose.h"

/* Тип сущности для PWM-выходов: 0 = number (ползунок 0-100, нейтрально, годится для мотора),
 * 1 = light (яркость), 2 = fan (скорость в процентах). */
#ifndef HA_PWM_TYPE
#define HA_PWM_TYPE 0
#endif

/* Вызывать ОДИН раз в StartWebServerTask после mqtt_server_init(). */
void ha_discovery_init(void);

/* Запросить полную перепубликацию конфигов (и очистку удалённых сущностей). */
void ha_discovery_request(void);

/* Каждую итерацию цикла WebServerTask: выдача конфигов, очистка, состояния, контроль изменений. */
void ha_discovery_poll(struct mg_connection *conn);

/* 1, если топик относится к Discovery (<prefix>/status или чужие/устаревшие конфиги этого node). */
uint8_t ha_discovery_handle_rx(const char *topic, const char *payload);

/* 1, если фильтр подписки клиента брокера лежит под prefix. */
uint8_t ha_discovery_filter_hit(const char *filter, size_t len);

/* 1, если топик — конфиг Discovery (<prefix>/.../config). Для брокера:
 * доставка конфигов клиентам с флагом ha_cfg без слота подписки. */
uint8_t ha_discovery_is_cfg_topic(const char *topic);

/* Вызывается из send_mqtt_message(): превращает события кнопок и охраны в триггеры <tx>/ev. */
void ha_observe(struct mg_connection *conn, const char *topic, const char *msg);

#endif /* HA_DISCOVERY_H */
