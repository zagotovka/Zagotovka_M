/**
 * @file mqtt_server.h
 * @brief Экспериментальный встроенный MQTT-брокер (QoS 0, без retained/LWT/TLS).
 *
 * Ограничения первой версии (см. MQTT_Server_Implementation_Plan.md):
 *  - максимум клиентов: MQTT_SRV_MAX_CLIENTS_HARDCAP (clamp, не обходится через UI);
 *  - только QoS 0;
 *  - wildcard: только "#" в конце фильтра и точное совпадение;
 *  - MQTT 3.1.1 клиенты (v5 CONNECT отклоняется с rc 0x01);
 *  - таблица клиентов в DTCM (bump-allocator), .bss не расходуется.
 *
 * Запускается ТОЛЬКО если check_mqtt_srv==1 на момент старта WebServerTask.
 * Изменение настроек сервера требует перезагрузки (как и настройки MQTT-клиента).
 */
#ifndef MQTT_SERVER_H
#define MQTT_SERVER_H

#include "mongoose.h"

/* Жёсткий лимит слотов — таблица фикс. размера в DTCM, никакого heap-фрагментирования */
#define MQTT_SRV_MAX_CLIENTS_HARDCAP 6
/* Подписок на клиента: 8 * 64 байт = 512 B на слот */
#define MQTT_SRV_MAX_SUBS_PER_CLIENT 8
#define MQTT_SRV_TOPIC_LEN           64
/* Backpressure: не паблишим клиенту, чей send-буфер больше этого (байт) */
#define MQTT_SRV_SEND_LIMIT          4096
/* Таймаут ожидания CONNECT после accept (мс) */
#define MQTT_SRV_CONNECT_TIMEOUT_MS  30000

/* Вызывается ОДИН раз в StartWebServerTask после web_init(), только при
 * check_mqtt_srv == 1. Таблица клиентов выделяется в DTCM-пуле (dtcm_malloc). */
void mqtt_server_init(struct mg_mgr *mgr, uint16_t port);

/* Каждую итерацию цикла WebServerTask: enforce keepalive-таймаутов клиентов.
 * Сама проверяет флаг включения — вызов "вхолостую" стоит один if. */
void mqtt_server_poll(void);

/* Fan-out публикации локальным подписчикам. Одна точка вызова —
 * send_mqtt_message() в main.c. Возвращает мгновенно, если сервер выключен.
 * ВЫЗЫВАТЬ ТОЛЬКО из контекста WebServerTask (там же, где mg_mgr_poll). */
void mqtt_server_publish(const char *topic, const char *payload);

/* Текущее число занятых клиентских слотов (для диагностики/UI) */
uint8_t mqtt_server_client_count(void);

#endif /* MQTT_SERVER_H */