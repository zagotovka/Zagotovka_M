/*
 * zagotovka.c
 *
 *  Created on: Jul 15, 2024
 *      Author: denis
 */

#include <stdio.h>/* для printf */
#include <string.h>
#include <stdint.h>
#include <stdlib.h>  // Для функции free()
#include "zagotovka.h"
#include <db.h>
#include "ds18b20.h"
#include <stdbool.h>
#include "ds18b20Config.h"
#include "usart_ring.h"
#include "gsm.h"
#include "lwdtc.h"// Для OFFLINE cron
/*********************** Moon *****************************/
#include "net.h"
#include <math.h>
#define PI 3.14159265358979323846
#define RAD (PI / 180.0)
extern int year;
extern int month;
extern int day;

/*********************** delay_us() *****************************/
#include "FreeRTOS.h"
#include "task.h"
#include "semphr.h"

#define DHT22_TIMEOUT_TICKS 2

static bool srise_ok = false; // флаг выполнения действий восхода
static bool sset_ok = false;  // флаг выполнения действий заката
static time_t lastchk = 0;    // время последней проверки

uint8_t RH1, RH2, TC1, TC2, SUM, CHECK;
float tCelsius = 0;
float tFahrenheit = 0;
float RH = 0;
uint32_t pMillis, cMillis;

//const char* print_port_pin(uint16_t pin, GPIO_TypeDef* port, uint8_t index) {
//    static char pin_name[16]; // Статический буфер для хранения строки
//    // Находим номер пина (позицию установленного бита)
//    uint8_t pin_number = 0;
//    uint16_t temp = pin;
//    while (temp > 1) {
//        temp = temp >> 1;
//        pin_number++;
//    }
//    snprintf(pin_name, sizeof(pin_name), "GPIO_PIN_%d", pin_number);// Формируем строку в формате GPIO_PIN_X
//
//    printf("Initializing DHT22 index = %d on port = %s, pin = %s\n",
//           index,
//           (port == GPIOA) ? "GPIOA" :
//           (port == GPIOB) ? "GPIOB" :
//           (port == GPIOC) ? "GPIOC" :
//           (port == GPIOD) ? "GPIOD" :
//           (port == GPIOE) ? "GPIOE" :
//           (port == GPIOF) ? "GPIOF" :
//           (port == GPIOG) ? "GPIOG" :
//           (port == GPIOH) ? "GPIOH" : "Unknown",
//           pin_name);
//    return pin_name;
//}

/*********************** End delay_us() **************************/
extern uint64_t s_boot_timestamp;
char jsonbuf[BUFFER_SIZE];
extern osMessageQueueId_t outputQueueHandle;
extern struct data_pin_t data_pin;
extern MqttMessage_t mqttMsg;
extern osMessageQueueId_t outputQueueHandle;
extern char mqtt_payload[300];
extern ds18b20_pin_t ds18b20[MAX_DS18B20_P];
extern dht22_pin_t dht22[MAX_DHT22_P];


char s_url[50] = {0};  // Статический буфер для URL
char s_pub_topic[30] = {0};  // Public topic
int s_qos = 1;
extern int32_t onoffid;// Для parse_onoff_json().
struct mg_connection *s_conn = NULL;
char* get_mqtt_url(void)
{
    return s_url;
}
char* get_mqtt_topic(void)
{
    return s_pub_topic;
}
void set_mqtt_url(const char* url)
{
    strncpy(s_url, url, sizeof(s_url) - 1);
    s_url[sizeof(s_url) - 1] = '\0';  // Ensure null-termination
}
void set_mqtt_topic(const char* topic)
{
    strncpy(s_pub_topic, topic, sizeof(s_pub_topic) - 1);
    s_pub_topic[sizeof(s_pub_topic) - 1] = '\0';  // Ensure null-termination
}

void gen_select_json(const struct dbPinsInfo *pins_info,
        const struct dbPinsConf *pins_conf, uint8_t num_pins, char *buffer,
        int buffer_size) {
    int offset = 0;
    // Добавляем начальные поля
    offset += snprintf(buffer + offset, buffer_size - offset,
            "{\"lang\":\"%s\",\"sim800l\":%d,\"data\":[",
            SetSettings.lang, SetSettings.sim800l);
    // Генерируем массив данных пинов
    for (int i = 0; i < num_pins && offset < buffer_size; i++) {
        offset += snprintf(buffer + offset, buffer_size - offset,
                "{\"id\":%d,\"pins\":\"%s\",\"topin\":%d,"
                "\"onewire\":%d,\"pwm\":%d,\"i2cdata\":%d,\"i2cclok\":%d}%s",
                i, pins_info[i].pins, pins_conf[i].topin,
                pins_info[i].onewire, pins_info[i].pwm,
                pins_info[i].i2cdata, pins_info[i].i2cclok,
                (i < num_pins - 1) ? "," : "");
    }
    // Закрываем массив data и основной объект
    if (offset < buffer_size) {
        offset += snprintf(buffer + offset, buffer_size - offset, "]}");
    }
//    printf("Generated SELECT json:\n%s\n", buffer);
}
void handle_select_get(struct mg_connection *c) {
  gen_select_json(PinsInfo, PinsConf, NUMPIN, jsonbuf, BUFFER_SIZE);
  mg_http_reply(c, 200, s_json_header, "%s\n", jsonbuf);
}
void handle_select_set(struct mg_connection *c, struct mg_http_message *hm) {
 if (hm->body.len > 0) {
//	printf("We got a select JSON: %.*s\n", (int) hm->body.len, hm->body.buf);
    parse_select_json(hm->body.buf, PinsConf, NUMPIN);
	char response[256];// Формируем корректный JSON-ответ
	snprintf(response, sizeof(response),"{\"status\":true,\"message\":\"Received JSON data\",\"length\":%lu}",(unsigned long)hm->body.len);
	//printf("Sending response: %s\n", response);//чтобы увидеть, какой именно ответ формируется перед отправкой клиенту:
	mg_http_reply(c, 200, "Content-Type: application/json\r\n", "%s", response);// Отправляем ответ клиенту
  } else {// Обработка пустого тела запроса
	mg_http_reply(c, 400, "Content-Type: application/json\r\n","{\"status\":false,\"message\":\"Empty request body\"}");
  }
}
void parse_select_json(const char *json_string, struct dbPinsConf *PinsConf, uint8_t num_pins) {
    cJSON *json = cJSON_Parse(json_string);
    if (json == NULL) {
        const char *error_ptr = cJSON_GetErrorPtr();
        if (error_ptr != NULL) {
            printf("Error before: %s\n", error_ptr);
        }
        return;
    }
    // Получаем значения lang и gps
    cJSON *jlang = cJSON_GetObjectItemCaseSensitive(json, "lang");
    if (cJSON_IsString(jlang) && jlang->valuestring != NULL) {
        strncpy(SetSettings.lang, jlang->valuestring, sizeof(SetSettings.lang) - 1);
    }
    cJSON *jgps = cJSON_GetObjectItemCaseSensitive(json, "sim800l");
    if (cJSON_IsNumber(jgps)) {
        SetSettings.sim800l = jgps->valueint;
    }
    // Получаем массив data
    cJSON *data = cJSON_GetObjectItemCaseSensitive(json, "data");
    if (data == NULL || !cJSON_IsArray(data)) {
        cJSON_Delete(json);
        return;
    }
    // Обрабатываем каждый элемент массива data
    cJSON *item;
    int i = 0;
    cJSON_ArrayForEach(item, data) {
        if (i >= num_pins) break;
        cJSON *jtopin = cJSON_GetObjectItemCaseSensitive(item, "topin");
        if (cJSON_IsNumber(jtopin)) {
            PinsConf[i].topin = jtopin->valueint;
        } else {
            PinsConf[i].topin = 0; // Значение по умолчанию
        }
        i++;
    }
    cJSON_Delete(json);
    uint8_t usbnum = 1;// Сохраянем в "pins.ini"
    xQueueSend(usbQueueHandle, &usbnum, 0);
    usbnum = 2;// Сохраянем в "setings.ini"
    xQueueSend(usbQueueHandle, &usbnum, 0);
}

void parse_onoff_json(const char *json_string, struct dbPinsConf *PinsConf, int num_pins) {
    cJSON *json = cJSON_Parse(json_string);
    if (json == NULL) {
        // Обработка ошибки парсинга JSON
        const char *error_ptr = cJSON_GetErrorPtr();
        if (error_ptr != NULL) {
            printf("Error before: %s\n", error_ptr);
        }
        return;
    }

    cJSON *id_item = cJSON_GetObjectItemCaseSensitive(json, "id");
    cJSON *onoff_item = cJSON_GetObjectItemCaseSensitive(json, "onoff");

    if (cJSON_IsNumber(id_item) && cJSON_IsNumber(onoff_item)) {
        onoffid = id_item->valueint;
        uint8_t onoff = onoff_item->valueint;
        // Проверяем, что id находится в допустимом диапазоне
        if (onoffid >= 0 && onoffid < num_pins) {
            PinsConf[onoffid].onoff = (uint8_t)onoff;
            printf("Updated pin %ld: onoff = %d\n", onoffid, onoff);
/*********************************************************/
            // Формируем payload
            memset(mqtt_payload, 0, sizeof(mqtt_payload));
            snprintf(mqtt_payload, sizeof(mqtt_payload), "ID=%ld/OnOff/%s", onoffid, PinsConf[onoffid].info);// Подготовка MQTT сообщения
            mqttMsg.command = 8;  // Команда для OnOFF
            mqttMsg.deviceId = (uint8_t)onoffid;
            mqttMsg.state = 0;
            mqttMsg.reserved = 0;
            // Отправка в очередь
            if (xQueueSend(mqttQueueHandle, &mqttMsg, 0) != pdPASS) {
                printf("Error sending LONG_PRESS to MQTT queue!\r\n");
            }
/*********************************************************/
        } else {
            printf("Invalid id: %ld\n", onoffid);
        }
    } else {
        printf("Invalid JSON format\n");
    }
    cJSON_Delete(json);
}
void handle_onoff_set(struct mg_connection *c, struct mg_http_message *hm) {
 if (hm->body.len > 0) {
printf("We got a ONOFF JSON: %.*s\n", (int) hm->body.len, hm->body.buf);
parse_onoff_json(hm->body.buf, PinsConf, NUMPIN);
char response[256];// Формируем корректный JSON-ответ
snprintf(response, sizeof(response),"{\"status\":true,\"message\":\"Received JSON data\",\"length\":%lu}",(unsigned long)hm->body.len);
//printf("Sending response: %s\n", response);//чтобы увидеть, какой именно ответ формируется перед отправкой клиенту:
mg_http_reply(c, 200, "Content-Type: application/json\r\n", "%s", response);// Отправляем ответ клиенту
  } else {// Обработка пустого тела запроса
mg_http_reply(c, 400, "Content-Type: application/json\r\n","{\"status\":false,\"message\":\"Empty request body\"}");
  }
}

void gen_pintopin_json(struct dbPinToPin *PinsLinks, char *buffer, int buffer_size) {
	int offset = 0;
	int remaining = buffer_size;
	// Начало JSON массива
	offset += snprintf(buffer + offset, remaining, "[");
	remaining = buffer_size - offset;
	int elements_added = 0;
	for (int i = 0; i < NUMPINLINKS; i++) {
//		if (PinsLinks[i].idin == 0 && PinsLinks[i].idout == 0 && strlen(PinsLinks[i].pins) == 0) {
//			// Пропускаем пустые записи
//			continue;
//		}
		// Добавляем запятую, если это не первый элемент
		if (elements_added > 0) {
			offset += snprintf(buffer + offset, remaining, ",");
			remaining = buffer_size - offset;
		}
		// Форматируем каждый элемент массива
		offset += snprintf(buffer + offset, remaining, "{\"idin\":%d,\"idout\":%d,\"pins\":\"%s\"}", PinsLinks[i].idin, PinsLinks[i].idout, PinsLinks[i].pins);
		remaining = buffer_size - offset;
		elements_added++;
		// Проверка на переполнение буфера
		if (remaining <= 1) {
			// Буфер переполнен, прерываем цикл
			break;
		}
	}
	if (remaining > 1) {// Закрытие JSON массива
		snprintf(buffer + offset, remaining, "]");
	}
//	printf("Generated pintopin JSON:\n%s\n", buffer);
}
void handle_pintopin_get(struct mg_connection *c) {
	gen_pintopin_json(PinsLinks, jsonbuf, BUFFER_SIZE);
  mg_http_reply(c, 200, s_json_header, "%s\n", jsonbuf);
}

void handle_switch_get(struct mg_connection *c) {
	gen_switch_json(PinsInfo, PinsConf, NUMPIN, jsonbuf, BUFFER_SIZE);
  mg_http_reply(c, 200, s_json_header, "%s\n", jsonbuf);
}
void handle_switch_set(struct mg_connection *c, struct mg_http_message *hm) {
 if (hm->body.len > 0) {
//	printf("We got a switch JSON: %.*s\n", (int) hm->body.len, hm->body.buf);
	parse_switch_json(hm->body.buf, PinsConf, PinsInfo, NUMPIN);
	char response[256];// Формируем корректный JSON-ответ
	snprintf(response, sizeof(response),"{\"status\":true,\"message\":\"Received JSON data\",\"length\":%lu}",(unsigned long)hm->body.len);
	//printf("Sending response: %s\n", response);//чтобы увидеть, какой именно ответ формируется перед отправкой клиенту:
	mg_http_reply(c, 200, "Content-Type: application/json\r\n", "%s", response);// Отправляем ответ клиенту
  } else {// Обработка пустого тела запроса
	mg_http_reply(c, 400, "Content-Type: application/json\r\n","{\"status\":false,\"message\":\"Empty request body\"}");
  }
}
void gen_switch_json(const struct dbPinsInfo *pins_info,
        const struct dbPinsConf *pins_conf, int num_pins, char *buffer,
        int buffer_size) {
    int offset = 0;
    int first_switch = 1; // Флаг для определения первого переключателя
    offset += snprintf(buffer + offset, buffer_size - offset, "{\"lang\":\"%s\",\"switches\":[", SetSettings.lang);
    for (uint8_t i = 0; i < num_pins && offset < buffer_size; i++) {
        if (pins_conf[i].topin == 3) { // If pin is a SWITCH
            if (!first_switch) {  // Если это не первый элемент, добавляем запятую
                offset += snprintf(buffer + offset, buffer_size - offset, ",");
            } else {
                first_switch = 0; // Сбрасываем флаг после первого переключателя
            }
            offset += snprintf(buffer + offset, buffer_size - offset,
                    "{\"topin\":%d,\"id\":%d,\"pins\":\"%s\",\"ptype\":%d,\"pinact\":{},\"info\":\"%s\",\"onoff\":%d}",
                    pins_conf[i].topin, i, pins_info[i].pins,
                    pins_conf[i].ptype, pins_conf[i].info,
                    pins_conf[i].onoff);
        }
    }
    if (offset < buffer_size) {
        offset += snprintf(buffer + offset, buffer_size - offset, "]}");
    }
//    printf("Generated switch JSON:\n%s\n", buffer);
}
// функция для инициализации PinsLinks по умолчанию.
//void initialize_PinsLinks() {
//    for (int i = 0; i < NUMPINLINKS; i++) {
//        PinsLinks[i].idin = -1;
//        PinsLinks[i].idout = -1;
//        PinsLinks[i].flag = 0;
//    }
//    printf("PinsLinks initialized\r\n");

    // Для проверки инициализации
//    for (int i = 0; i < NUMPINLINKS; i++) {
//        printf("DEBUG: After init - PinsLinks[%d]: idin=%d, idout=%d, flag=%d\r\n",
//               i, PinsLinks[i].idin, PinsLinks[i].idout, PinsLinks[i].flag);
//    }
//}

/*******************************************************************************************************************/
void parse_switch_json(char *json, struct dbPinsConf *PinsConf, const struct dbPinsInfo *PinsInfo, int count) {
	cJSON *root = cJSON_Parse(json);
	if (!root) {
		printf("Error parsing JSON\n");
		return;
	}
	cJSON *id_item = cJSON_GetObjectItem(root, "id");
	if (!cJSON_IsNumber(id_item)) {
		printf("Error: 'id' is not a number or not found\r\n");
		cJSON_Delete(root);
		return;
	}
	uint8_t id = id_item->valueint;
	if (id < 0 || id >= count) {
		printf("switch ID out of bounds %d\r\n",id);
		cJSON_Delete(root);
		return;
	}
	if (strstr(json, "\"ptype\"") != NULL) {
//		printf("We got json from 'Edit switch' - %s\n", json);
		cJSON *ptype_item = cJSON_GetObjectItem(root, "ptype");  // Парсинг ptype
		if (cJSON_IsString(ptype_item)) {
			PinsConf[id].ptype = (uint8_t) atoi(ptype_item->valuestring);
		} else if (cJSON_IsNumber(ptype_item)) {
			PinsConf[id].ptype = (uint8_t) ptype_item->valueint;
		}
		cJSON *info_item = cJSON_GetObjectItem(root, "info");  // Парсинг info
		if (cJSON_IsString(info_item)) {
			strncpy(PinsConf[id].info, info_item->valuestring, sizeof(PinsConf[id].info) - 1);
			PinsConf[id].info[sizeof(PinsConf[id].info) - 1] = '\0';
		}
		cJSON *onoff_item = cJSON_GetObjectItem(root, "onoff");  // Парсинг onoff
		if (cJSON_IsNumber(onoff_item)) {
			PinsConf[id].onoff = (uint8_t) onoff_item->valueint;
		}
		int usbnum = 1;
		xQueueSend(usbQueueHandle, &usbnum, 0);

		snprintf(jsonbuf, BUFFER_SIZE, "{"
				"\"ID\":%d,"
				"\"ptype\":%d,\"info\":\"%s\",\"onoff\":%d"
				"}", id, PinsConf[id].ptype, PinsConf[id].info, PinsConf[id].onoff);

		if ((s_conn != NULL && !s_conn->is_closing) && SetSettings.check_mqtt) {
			size_t json_len = strlen(json);
			strncpy(jsonbuf, json, json_len);
			jsonbuf[json_len] = '\0';
//			send_mqtt_message(conn,"/dht22/", payload);
		} else if (s_conn == NULL || s_conn->is_closing) {
			printf("MQTT connection lost! \r\n");
		}
	} else if (strstr(json, "\"setrpins\"") != NULL) {
//		printf("We got json from 'Edit Connection' - %s\n", json);
		cJSON *pins_item = cJSON_GetObjectItem(root, "pins");        // Парсинг pins
		if (cJSON_IsString(pins_item)) {
			strncpy(PinsLinks[id].pins, pins_item->valuestring, sizeof(PinsLinks[id].pins) - 1);
			PinsLinks[id].pins[sizeof(PinsLinks[id].pins) - 1] = '\0';
		}
		cJSON *pinact_item = cJSON_GetObjectItem(root, "pinact");        // Обработка "pinact"
		if (cJSON_IsObject(pinact_item)) {
			cJSON *pin_item = NULL;
			cJSON_ArrayForEach(pin_item, pinact_item)
			{
				if (cJSON_IsString(pin_item)) {
					uint8_t pin_id = atoi(pin_item->string);
					const char *pin_value = pin_item->valuestring;

					// Поиск свободного места или существующей записи в PinsLinks
					short findex = -1;        // free_index
					short eindex = -1;        // existing_index
					for (short i = 0; i < NUMPINLINKS; i++) {
						if (PinsLinks[i].idin == id && PinsLinks[i].idout == pin_id) {
							eindex = i;
							break;
						}
						if (findex == -1 && PinsLinks[i].idin == 0) {
							findex = i;
						}
					}
					// Обновление или добавление записи в PinsLinks
					int indextu = (eindex != -1) ? eindex : findex;        //index_to_use
					if (indextu != -1) {
						PinsLinks[indextu].idin = id;
						PinsLinks[indextu].idout = pin_id;
						strncpy(PinsLinks[indextu].pins, PinsInfo[pin_id].pins, sizeof(PinsLinks[indextu].pins) - 1);
						PinsLinks[indextu].pins[sizeof(PinsLinks[indextu].pins) - 1] = '\0';
//						printf("Updated PinsLinks[%d]: idin=%d, idout=%d, pins=%s \r\n", indextu, PinsLinks[indextu].idin, PinsLinks[indextu].idout, PinsLinks[indextu].pins);
					} else {
						printf("No free space in PinsLinks array. Last checked: findex=%d, eindex=%d\r\n", findex, eindex);
					}

					// Обновление PinsConf
					for (int j = 0; j < PINPAIRS; j++) {
						if (PinsConf[id].pinact[j].pin[0] == '\0') {
							PinsConf[id].pinact[j].id = pin_id;
							strncpy(PinsConf[id].pinact[j].pin, pin_value, sizeof(PinsConf[id].pinact[j].pin) - 1);
							PinsConf[id].pinact[j].pin[sizeof(PinsConf[id].pinact[j].pin) - 1] = '\0';
							break;
						}
					}
				}
			}
		}
		int usbnum = 4;
		xQueueSend(usbQueueHandle, &usbnum, 0);

		if ((s_conn != NULL && !s_conn->is_closing) && SetSettings.check_mqtt) {
			size_t json_len = strlen(json);
			strncpy(jsonbuf, json, json_len);
			jsonbuf[json_len] = '\0';
//			send_mqtt_message(s_conn, jsonbuf);
		} else if (s_conn == NULL || s_conn->is_closing) {
			printf("MQTT connection lost! \r\n");
		}
	} else {
		// Неизвестный тип JSON
		printf("Unknown JSON type received: %s\n", json);
	}

	cJSON_Delete(root);

	// Вывод обновленных значений PinsConf
//	printf("UPDATED pin ID[%d]: ", id);
	for (int j = 0; j < PINPAIRS && PinsConf[id].pinact[j].pin[0] != '\0'; j++) {
//		printf("pinact[%d]=%s, ", PinsConf[id].pinact[j].id, PinsConf[id].pinact[j].pin);
	}
//	printf("ptype=%d, info=%s, onoff=%d, pins=%s \r\n", PinsConf[id].ptype, PinsConf[id].info, PinsConf[id].onoff, PinsLinks[id].pins);
}
/*******************************************************************************************************************/
void handle_button_get(struct mg_connection *c) {
	gen_button_json(PinsInfo, PinsConf, NUMPIN, jsonbuf, BUFFER_SIZE);
  mg_http_reply(c, 200, s_json_header, "%s\n", jsonbuf);
}
void handle_button_set(struct mg_connection *c, struct mg_http_message *hm) {
 if (hm->body.len > 0) {
//	printf("We got a button JSON: %.*s\n", (int) hm->body.len, hm->body.buf);
	parse_button_json(hm->body.buf, PinsConf, PinsInfo, NUMPIN);
	char response[256];// Формируем корректный JSON-ответ
	snprintf(response, sizeof(response),"{\"status\":true,\"message\":\"Received JSON data\",\"length\":%lu}",(unsigned long)hm->body.len);
	//printf("Sending response: %s\n", response);//чтобы увидеть, какой именно ответ формируется перед отправкой клиенту:
	mg_http_reply(c, 200, "Content-Type: application/json\r\n", "%s", response);// Отправляем ответ клиенту
  } else {// Обработка пустого тела запроса
	mg_http_reply(c, 400, "Content-Type: application/json\r\n","{\"status\":false,\"message\":\"Empty request body\"}");
  }
}
void gen_button_json(const struct dbPinsInfo *pins_info, struct dbPinsConf *pins_conf, int num_pins, char *buffer,
        int buffer_size) {
    int offset = 0;
    int first_button = 1; // Флаг для определения первой кнопки

    offset += snprintf(buffer + offset, buffer_size - offset, "{\"lang\":\"%s\",\"buttons\":[", SetSettings.lang);
    for (int i = 0; i < num_pins && offset < buffer_size; i++) {
        if (pins_conf[i].topin == 1) { // If pin is a BUTTON
            if (!first_button) {  // Если это не первый элемент, добавляем запятую
                offset += snprintf(buffer + offset, buffer_size - offset, ",");
            } else {
                first_button = 0; // Сбрасываем флаг после первой кнопки
            }
            offset += snprintf(buffer + offset, buffer_size - offset,
                    "{\"topin\":%d,\"id\":%d,\"pins\":\"%s\",\"ptype\":%d,"
                            "\"sclick\":\"%s\",\"dclick\":\"%s\",\"lpress\":\"%s\","
                            "\"pinact\":{", pins_conf[i].topin, i,
                    pins_info[i].pins, pins_conf[i].ptype, pins_conf[i].sclick,
                    pins_conf[i].dclick, pins_conf[i].lpress);

            //ZERG, Здесь логика для заполнения pinact (pinact":{})
            offset += snprintf(buffer + offset, buffer_size - offset, "},");

            offset += snprintf(buffer + offset, buffer_size - offset,
                    "\"info\":\"%s\",\"onoff\":%d}", pins_conf[i].info,
                    pins_conf[i].onoff);
        }
    }
    if (offset < buffer_size) {
        offset += snprintf(buffer + offset, buffer_size - offset, "]}");
    }
//    printf("Generated BUTTON JSON:\n%s\n", buffer);
}
void parse_button_json(char *json, struct dbPinsConf *PinsConf, const struct dbPinsInfo *PinsInfo, int count) {
	cJSON *root = cJSON_Parse(json);
	if (!root) {
		printf("Error parsing JSON\n");
		return;
	}
	cJSON *id_item = cJSON_GetObjectItem(root, "id");
	if (!cJSON_IsNumber(id_item)) {
		printf("Error: 'id' is not a number or not found\n");
		cJSON_Delete(root);
		return;
	}
	int id = id_item->valueint;
	if (id < 0 || id >= count) {
		printf("button ID out of bounds %d\r\n",id);
		cJSON_Delete(root);
		return;
	}
	cJSON *setrpins_item = cJSON_GetObjectItem(root, "setrpins"); // This is the second type of JSON

	if (setrpins_item) {
		if (cJSON_IsString(setrpins_item)) {
			// Process setrpins if needed
		}
		cJSON *pinact_item = cJSON_GetObjectItem(root, "pinact");
		if (cJSON_IsObject(pinact_item)) {
//			printf("We got json from 'Edit Connection' - %s\n", json);
			cJSON *pins_item = cJSON_GetObjectItem(root, "pins");        // Парсинг pins
			if (cJSON_IsString(pins_item)) {
				strncpy(PinsLinks[id].pins, pins_item->valuestring, sizeof(PinsLinks[id].pins) - 1);
				PinsLinks[id].pins[sizeof(PinsLinks[id].pins) - 1] = '\0';
			}
			cJSON *pinact_item = cJSON_GetObjectItem(root, "pinact");        // Обработка "pinact"
			if (cJSON_IsObject(pinact_item)) {
				cJSON *pin_item = NULL;
				cJSON_ArrayForEach(pin_item, pinact_item)
				{
					if (cJSON_IsString(pin_item)) {
						int pin_id = atoi(pin_item->string);
						const char *pin_value = pin_item->valuestring;

						// Поиск свободного места или существующей записи в PinsLinks
						short findex = -1;        // free_index
						short eindex = -1;        // existing_index
						for (short i = 0; i < NUMPINLINKS; i++) {
							if (PinsLinks[i].idin == id && PinsLinks[i].idout == pin_id) {
								eindex = i;
								break;
							}
							if (findex == -1 && PinsLinks[i].idin == 0) {
								findex = i;
							}
						}

						// Обновление или добавление записи в PinsLinks
						int indextu = (eindex != -1) ? eindex : findex;        //index_to_use
						if (indextu != -1) {
							PinsLinks[indextu].idin = id;
							PinsLinks[indextu].idout = pin_id;
							strncpy(PinsLinks[indextu].pins, PinsInfo[pin_id].pins, sizeof(PinsLinks[indextu].pins) - 1);
							PinsLinks[indextu].pins[sizeof(PinsLinks[indextu].pins) - 1] = '\0';
//							printf("Updated PinsLinks[%d]: idin=%d, idout=%d, pins=%s \r\n", indextu, PinsLinks[indextu].idin, PinsLinks[indextu].idout, PinsLinks[indextu].pins);
						} else {
							printf("No free space in PinsLinks array. Last checked: findex=%d, eindex=%d\r\n", findex, eindex);
						}

						// Обновление PinsConf
						for (int j = 0; j < PINPAIRS; j++) {
							if (PinsConf[id].pinact[j].pin[0] == '\0') {
								PinsConf[id].pinact[j].id = pin_id;
								strncpy(PinsConf[id].pinact[j].pin, pin_value, sizeof(PinsConf[id].pinact[j].pin) - 1);
								PinsConf[id].pinact[j].pin[sizeof(PinsConf[id].pinact[j].pin) - 1] = '\0';
								break;
							}
						}
					}
				}
			}
			int usbnum = 4;
			xQueueSend(usbQueueHandle, &usbnum, 0);

			if ((s_conn != NULL && !s_conn->is_closing) && SetSettings.check_mqtt) {
				size_t json_len = strlen(json);
				strncpy(jsonbuf, json, json_len);
				jsonbuf[json_len] = '\0';
//				send_mqtt_message(s_conn, jsonbuf);
			} else if (s_conn == NULL || s_conn->is_closing) {
				printf("MQTT connection lost! \r\n");
			}
		}
	} else {
		cJSON *ptype_item = cJSON_GetObjectItem(root, "ptype");
		if (cJSON_IsString(ptype_item)) {
			PinsConf[id].ptype = (uint8_t) atoi(ptype_item->valuestring);
		} else if (cJSON_IsNumber(ptype_item)) {
			PinsConf[id].ptype = (uint8_t) ptype_item->valueint;
		}
		cJSON *sclick_item = cJSON_GetObjectItem(root, "sclick");
		if (cJSON_IsString(sclick_item)) {
			strncpy(PinsConf[id].sclick, sclick_item->valuestring, sizeof(PinsConf[id].sclick) - 1);
			PinsConf[id].sclick[sizeof(PinsConf[id].sclick) - 1] = '\0';
		}
		cJSON *dclick_item = cJSON_GetObjectItem(root, "dclick");
		if (cJSON_IsString(dclick_item)) {
			strncpy(PinsConf[id].dclick, dclick_item->valuestring, sizeof(PinsConf[id].dclick) - 1);
			PinsConf[id].dclick[sizeof(PinsConf[id].dclick) - 1] = '\0';
		}
		cJSON *lpress_item = cJSON_GetObjectItem(root, "lpress");
		if (cJSON_IsString(lpress_item)) {
			strncpy(PinsConf[id].lpress, lpress_item->valuestring, sizeof(PinsConf[id].lpress) - 1);
			PinsConf[id].lpress[sizeof(PinsConf[id].lpress) - 1] = '\0';
		}
		cJSON *info_item = cJSON_GetObjectItem(root, "info");
		if (cJSON_IsString(info_item)) {
			strncpy(PinsConf[id].info, info_item->valuestring, sizeof(PinsConf[id].info) - 1);
			PinsConf[id].info[sizeof(PinsConf[id].info) - 1] = '\0';
		}
		cJSON *onoff_item = cJSON_GetObjectItem(root, "onoff");
		if (cJSON_IsNumber(onoff_item)) {
			PinsConf[id].onoff = (uint8_t) onoff_item->valueint;
		}
		usbnum = 1;
		xQueueSend(usbQueueHandle, &usbnum, 0);
//		printf("RESULT - PinsConf[id].ptype:%d PinsConf[id].sclick:%d PinsConf[id].dclick:%s PinsConf[id].lpress:%s PinsConf[id].info:%s PinsConf[id].onoff:%d \r\n ", PinsConf[id].ptype, PinsConf[id].sclick, PinsConf[id].dclick, PinsConf[id].lpress, PinsConf[id].info, PinsConf[id].onoff);
	}

	cJSON *pins_item = cJSON_GetObjectItem(root, "pins");
	if (cJSON_IsString(pins_item)) {
		if (strcmp(PinsInfo[id].pins, pins_item->valuestring) != 0) {
			printf("Warning: Pins in JSON (%s) do not match PinsInfo (%s)\n", pins_item->valuestring, PinsInfo[id].pins);
		}
	}
	cJSON_Delete(root);
}

void handle_encoder_get(struct mg_connection *c) {
	gen_encoder_json(PinsInfo, PinsConf, NUMPIN, jsonbuf, BUFFER_SIZE, PinsLinks, NUMPINLINKS);
  mg_http_reply(c, 200, s_json_header, "%s\n", jsonbuf);
}
void handle_encoder_set(struct mg_connection *c, struct mg_http_message *hm) {
 if (hm->body.len > 0) {
//	printf("We got a encoder JSON: %.*s\n", (int) hm->body.len, hm->body.buf);
	parse_encoder_json(hm->body.buf, PinsConf, PinsLinks, PinsInfo, NUMPIN);
	char response[256];// Формируем корректный JSON-ответ
	snprintf(response, sizeof(response),"{\"status\":true,\"message\":\"Received JSON data\",\"length\":%lu}",(unsigned long)hm->body.len);
	//printf("Sending response: %s\n", response);//чтобы увидеть, какой именно ответ формируется перед отправкой клиенту:
	mg_http_reply(c, 200, "Content-Type: application/json\r\n", "%s", response);// Отправляем ответ клиенту
  } else {// Обработка пустого тела запроса
	mg_http_reply(c, 400, "Content-Type: application/json\r\n","{\"status\":false,\"message\":\"Empty request body\"}");
  }
}
void gen_encoder_json(const struct dbPinsInfo *pins_info, const struct dbPinsConf *pins_conf, uint8_t num_pins, char *buffer, int buffer_size, const struct dbPinToPin *PinsLinks, int num_pin_links) {
    int offset = 0;
    int encoder_count = 0;
    offset += snprintf(buffer + offset, buffer_size - offset, "{\n  \"lang\": \"%s\",\n  \"encoders\": [", SetSettings.lang);

    for (uint8_t i = 0; i < num_pins && offset < buffer_size; i++) {
        if (pins_conf[i].topin == 8) { // "Encoder A"
            if (encoder_count > 0) {
                offset += snprintf(buffer + offset, buffer_size - offset, ",");
            }
            offset += snprintf(buffer + offset, buffer_size - offset, "\n    {\n");
            uint8_t encoderb_id = pins_conf[i].encoderb;
            if (encoderb_id == 0 || encoderb_id > num_pins) {
                encoderb_id = 255;
            }
            // Найдем связанный PWM-пин и его dvalue
            int pwm_dvalue = 0;
            for (uint8_t j = 0; j < num_pins; j++) {
                if (pins_conf[j].topin == 5) { // Проверяем, что это 'PWM'
                    for (uint8_t k = 0; k < num_pin_links; k++) {
                        if (PinsLinks[k].idin == i && PinsLinks[k].idout == j) {
                            pwm_dvalue = pins_conf[j].dvalue;
                            break;
                        }
                    }
                    if (pwm_dvalue != 0) break;
                }
            }
            offset += snprintf(buffer + offset, buffer_size - offset,
                "      \"topin\": %d,\n"
                "      \"id\": %d,\n"
                "      \"pins\": \"%s\",\n"
                "      \"encoderb\": %d,\n"
                "      \"encdrbpin\": \"%s\",\n"
                "      \"dvalue\": %d,\n"
                "      \"ponr\": %d,\n",
                pins_conf[i].topin, i, pins_info[i].pins, encoderb_id,
                pins_conf[i].encbpin, pwm_dvalue, pins_conf[i].ponr);
            // Обработка pinact
            offset += snprintf(buffer + offset, buffer_size - offset, "      \"pinact\": {");
            uint8_t pinact_count = 0;
            for (uint8_t j = 0; j < num_pins; j++) {
                if (pins_conf[j].topin == 5) { // Проверяем, что это 'PWM'.
                    for (uint8_t k = 0; k < num_pin_links; k++) {
                        if (PinsLinks[k].idin == i && PinsLinks[k].idout == j && PinsLinks[k].pins[0] != '\0') {
                            if (pinact_count > 0) {
                                offset += snprintf(buffer + offset, buffer_size - offset, ", ");
                            }
                            offset += snprintf(buffer + offset, buffer_size - offset, "\"%s\": %d",
                                PinsLinks[k].pins, PinsLinks[k].idout);
                            pinact_count++;
                        }
                    }
                }
            }
            offset += snprintf(buffer + offset, buffer_size - offset, "},\n");

            offset += snprintf(buffer + offset, buffer_size - offset,
                "      \"info\": \"%s\",\n"
                "      \"onoff\": %d\n"
                "    }", pins_conf[i].info, pins_conf[i].onoff);
            encoder_count++;
        }
    }
    offset += snprintf(buffer + offset, buffer_size - offset, "\n  ]\n}");
    if (offset >= buffer_size) {
        printf("Error: JSON buffer overflow\n");
        buffer[buffer_size - 1] = '\0';
    }
//    if (encoder_count > 0) {
//        printf("Generated encoder JSON:\n%s\n", buffer);
//        printf("Summary: Found %d encoders\n", encoder_count);
//    } else {
//        printf("No encoders found.\n");
//    }
}
void parse_encoder_json(const char *json, struct dbPinsConf *PinsConf, struct dbPinToPin *PinsLinks, struct dbPinsInfo *PinsInfo, uint8_t count) {
	cJSON *root = cJSON_Parse(json);
	uint8_t usbnum = 255;
	if (!root) {
		printf("Error parsing JSON\n");
		return;
	}
	cJSON *id_item = cJSON_GetObjectItem(root, "id");
	if (!cJSON_IsNumber(id_item)) {
		printf("Error: 'id' is not a number or not found\n");
		cJSON_Delete(root);
		return;
	}
	int id = id_item->valueint;
	if (id < 0 || id >= count) {
		printf("encoder ID out of bounds %d\r\n", id);
		cJSON_Delete(root);
		return;
	}
	cJSON *topin_item = cJSON_GetObjectItem(root, "topin");
	if (topin_item) { // Type of JSON-2
		cJSON *pins_item = cJSON_GetObjectItem(root, "pins");
		if (cJSON_IsString(pins_item)) {
			strncpy(PinsInfo[id].pins, pins_item->valuestring, sizeof(PinsInfo[id].pins) - 1);
			PinsInfo[id].pins[sizeof(PinsInfo[id].pins) - 1] = '\0';
		}
		if (cJSON_IsNumber(topin_item)) {
			PinsConf[id].topin = (uint8_t) topin_item->valueint;
		}
		cJSON *dvalue_item = cJSON_GetObjectItem(root, "dvalue");
		if (cJSON_IsNumber(dvalue_item)) {
			// Найдем связанный PWM-пин и установим его dvalue
			uint16_t dvalue = (uint16_t) dvalue_item->valueint;
			for (uint8_t j = 0; j < count; j++) {
				if (PinsConf[j].topin == 5) { // Проверяем, что это 'PWM'
					for (short k = 0; k < NUMPINLINKS; k++) {
						if (PinsLinks[k].idin == id && PinsLinks[k].idout == j) {
							PinsConf[j].dvalue = dvalue;
							printf("Updated PWM pin %d with dvalue %d\n", j, dvalue);
							break;
						}
					}
				}
			}
		}
		cJSON *ponr_item = cJSON_GetObjectItem(root, "ponr");
		if (cJSON_IsNumber(ponr_item)) {
			PinsConf[id].ponr = (uint8_t) ponr_item->valueint;
		}
		cJSON *info_item = cJSON_GetObjectItem(root, "info");
		if (cJSON_IsString(info_item)) {
			strncpy(PinsConf[id].info, info_item->valuestring, sizeof(PinsConf[id].info) - 1);
			PinsConf[id].info[sizeof(PinsConf[id].info) - 1] = '\0';
		}
		cJSON *onoff_item = cJSON_GetObjectItem(root, "onoff");
		if (cJSON_IsNumber(onoff_item)) {
			PinsConf[id].onoff = (uint8_t) onoff_item->valueint;
		}
		printf("Type 2 JSON: id=%d, pins=%s, topin=%d, ponr=%d, info=%s, onoff=%d\r\n", id, PinsInfo[id].pins, PinsConf[id].topin, PinsConf[id].ponr, PinsConf[id].info, PinsConf[id].onoff);
		usbnum = 1;
		xQueueSend(usbQueueHandle, &usbnum, 0);
	} else { // Type of JSON-1
		cJSON *pins_item = cJSON_GetObjectItem(root, "pins");
		if (cJSON_IsString(pins_item)) {
			strncpy(PinsInfo[id].pins, pins_item->valuestring, sizeof(PinsInfo[id].pins) - 1);
			PinsInfo[id].pins[sizeof(PinsInfo[id].pins) - 1] = '\0';
		}

		cJSON *encoderb_item = cJSON_GetObjectItem(root, "encoderb");
		if (cJSON_IsNumber(encoderb_item)) {
			PinsConf[id].encoderb = (uint8_t) encoderb_item->valueint;
		}

		cJSON *encdrbpin_item = cJSON_GetObjectItem(root, "encdrbpin");
		if (cJSON_IsString(encdrbpin_item)) {
			strncpy(PinsConf[id].encbpin, encdrbpin_item->valuestring, sizeof(PinsConf[id].encbpin) - 1);
			PinsConf[id].encbpin[sizeof(PinsConf[id].encbpin) - 1] = '\0';
		}

		cJSON *pinact_item = cJSON_GetObjectItem(root, "pinact");
		if (cJSON_IsObject(pinact_item)) {
			cJSON *pin;
			cJSON_ArrayForEach(pin, pinact_item)
			{
				const char *key = pin->string;
				uint8_t value = pin->valueint;

				bool found = false;
				for (uint8_t i = 0; i < NUMPINLINKS; i++) {
					if (PinsLinks[i].idin == id) {
						strncpy(PinsLinks[i].pins, key, sizeof(PinsLinks[i].pins) - 1);
						PinsLinks[i].pins[sizeof(PinsLinks[i].pins) - 1] = '\0';
						PinsLinks[i].idout = value;
						found = true;
						printf("Updated existing PinsLinks entry: idin=%d, idout=%d, pins=%s\r\n", PinsLinks[i].idin, PinsLinks[i].idout, PinsLinks[i].pins);
						break;
					}
				}
				if (!found) {
					int free_i = -1;
					for (uint8_t i = 0; i < NUMPINLINKS; i++) {
						if (PinsLinks[i].idin == 0 && PinsLinks[i].idout == 0) {
							free_i = i;
							break;
						}
					}
					if (free_i != -1) {
						PinsLinks[free_i].idin = id;
						PinsLinks[free_i].idout = value;
						strncpy(PinsLinks[free_i].pins, key, sizeof(PinsLinks[free_i].pins) - 1);
						PinsLinks[free_i].pins[sizeof(PinsLinks[free_i].pins) - 1] = '\0';
						printf("Added new PinsLinks: idin=%d, idout=%d, pins=%s\r\n", PinsLinks[free_i].idin, PinsLinks[free_i].idout, PinsLinks[free_i].pins);
					} else {
						printf("No free space in PinsLinks array for new entry!\r\n");
					}
				}
			}
		}
		printf("Type of JSON-1: id=%d, pins=%s, encoderB=%d, encdrBpin=%s\r\n", id, PinsInfo[id].pins, PinsConf[id].encoderb, PinsConf[id].encbpin);
		usbnum = 1;
		xQueueSend(usbQueueHandle, &usbnum, 0);
		usbnum = 4;
		xQueueSend(usbQueueHandle, &usbnum, 0);
	}
	cJSON_Delete(root);
}

void handle_timers_get(struct mg_connection *c) {
	gen_timer_json(dbCrontxt, MAXSIZE, jsonbuf, BUFFER_SIZE);
  mg_http_reply(c, 200, s_json_header, "%s\n", jsonbuf);
}
void handle_timers_set(struct mg_connection *c, struct mg_http_message *hm) {
 if (hm->body.len > 0) {
//	printf("We got a cron JSON: %.*s\n", (int) hm->body.len, hm->body.buf);
	char response[256];// Формируем корректный JSON-ответ
	parse_timers_json(hm->body.buf, dbCrontxt, MAXSIZE);
	snprintf(response, sizeof(response),"{\"status\":true,\"message\":\"Received JSON data\",\"length\":%lu}",(unsigned long)hm->body.len);
	//printf("Sending response: %s\n", response);//чтобы увидеть, какой именно ответ формируется перед отправкой клиенту:
	mg_http_reply(c, 200, "Content-Type: application/json\r\n", "%s", response);// Отправляем ответ клиенту
  } else {// Обработка пустого тела запроса
	mg_http_reply(c, 400, "Content-Type: application/json\r\n","{\"status\":false,\"message\":\"Empty request body\"}");
  }
}

void parse_numline_json(char* json_string, struct dbSettings* SetSettings) {
    if (json_string == NULL || SetSettings == NULL) {
        fprintf(stderr, "Invalid input parameters\n");
        return;
    }
    cJSON* root = cJSON_Parse(json_string);// Парсинг JSON
    if (root == NULL) {
        const char* error_ptr = cJSON_GetErrorPtr();
        if (error_ptr != NULL) {
            fprintf(stderr, "JSON parsing error near: %s\n", error_ptr);
        } else {
            fprintf(stderr, "JSON parsing error, but error pointer is NULL\n");
        }
        return;
    }
    cJSON* numline_item = cJSON_GetObjectItem(root, "numline");
    if (cJSON_IsNumber(numline_item)) {
        if (numline_item->valueint > 0 && numline_item->valueint <= MAXSIZE) {
            SetSettings->numline = (uint8_t)numline_item->valueint;
        } else {
//            fprintf(stderr, "Invalid 'numline' value: %d\n", numline_item->valueint);
        }
    } else {
        fprintf(stderr, "Missing or invalid 'numline' in JSON\n");
    }
    cJSON_Delete(root);// Освобождение памяти, выделенной для JSON-объекта
//    printf("parse_numline_json: numline=%u\n", SetSettings->numline);
    usbnum = 2;
    xQueueSend(usbQueueHandle, &usbnum, 0);
}
void handle_numline_set(struct mg_connection *c, struct mg_http_message *hm){
 if (hm->body.len > 0) {
//	printf("We got a cron JSON: %.*s\n", (int) hm->body.len, hm->body.buf);
	char response[256];// Формируем корректный JSON-ответ
	parse_numline_json(hm->body.buf, &SetSettings);
	snprintf(response, sizeof(response),"{\"status\":true,\"message\":\"Received JSON data\",\"length\":%lu}",(unsigned long)hm->body.len);
	//printf("Sending response: %s\n", response);//чтобы увидеть, какой именно ответ формируется перед отправкой клиенту:
	mg_http_reply(c, 200, "Content-Type: application/json\r\n", "%s", response);// Отправляем ответ клиенту
  } else {// Обработка пустого тела запроса
	mg_http_reply(c, 400, "Content-Type: application/json\r\n","{\"status\":false,\"message\":\"Empty request body\"}");
  }
}
void gen_timer_json(const struct dbCron *dbCrontxt, int num_timers,char *buffer, int buffer_size) {
	int offset = 0;
	int first_timer = 1; // Флаг для определения первого таймера
	offset += snprintf(buffer + offset, buffer_size - offset, "{\"lang\":\"%s\",\"numline\":%d,\"timers\":[", SetSettings.lang, SetSettings.numline);
	for (int i = 0; i < num_timers && offset < buffer_size; i++) {
		if (!first_timer) {  // Если это не первый элемент, добавляем запятую
			offset += snprintf(buffer + offset, buffer_size - offset, ",");
		} else {
			first_timer = 0; // Сбрасываем флаг после первого таймера
		}
		offset += snprintf(buffer + offset, buffer_size - offset,
						"{ \"id\": %d, \"cron\": \"%s\", \"activ\": \"%s\", \"info\": \"%s\", \"onoff\": %d }",
						i, dbCrontxt[i].cron, dbCrontxt[i].activ,
						dbCrontxt[i].info, dbCrontxt[i].onoff);
	}
	if (offset < buffer_size) {
		offset += snprintf(buffer + offset, buffer_size - offset, "]}");
	}
//    printf("Generated timer JSON:\n%s\n", buffer);
}
void parse_timers_json(char* json_string, struct dbCron* dbCrontxt, int count) {
    // Проверка входных данных
    if (json_string == NULL || dbCrontxt == NULL || count <= 0) {
        fprintf(stderr, "Invalid input parameters\n");
        return;
    }
//    printf("Received JSON string: %s\n", json_string);
    cJSON* root = cJSON_Parse(json_string);
    if (root == NULL) {
        const char* error_ptr = cJSON_GetErrorPtr();
        if (error_ptr != NULL) {
            fprintf(stderr, "JSON parsing error near: %s\n", error_ptr);
        } else {
            fprintf(stderr, "JSON parsing error, but error pointer is NULL\n");
        }
        return;
    }
    cJSON* id_item = cJSON_GetObjectItem(root, "id");
    if (!cJSON_IsNumber(id_item) || id_item->valueint < 0 || id_item->valueint >= MAXSIZE) {
        fprintf(stderr, "Invalid or missing 'id' in JSON\n");
        cJSON_Delete(root);
        return;
    }
    int id = id_item->valueint;
    // Обновление полей структуры dbCrontxt
    cJSON* cron_item = cJSON_GetObjectItem(root, "cron");
    if (cJSON_IsString(cron_item)) {
        strncpy(dbCrontxt[id].cron, cron_item->valuestring, sizeof(dbCrontxt[id].cron) - 1);
        dbCrontxt[id].cron[sizeof(dbCrontxt[id].cron) - 1] = '\0';
    }
    cJSON* activ_item = cJSON_GetObjectItem(root, "activ");
    if (cJSON_IsString(activ_item)) {
        strncpy(dbCrontxt[id].activ, activ_item->valuestring, sizeof(dbCrontxt[id].activ) - 1);
        dbCrontxt[id].activ[sizeof(dbCrontxt[id].activ) - 1] = '\0';
    }
    cJSON* info_item = cJSON_GetObjectItem(root, "info");
    if (cJSON_IsString(info_item)) {
        strncpy(dbCrontxt[id].info, info_item->valuestring, sizeof(dbCrontxt[id].info) - 1);
        dbCrontxt[id].info[sizeof(dbCrontxt[id].info) - 1] = '\0';
    }
    cJSON* onoff_item = cJSON_GetObjectItem(root, "onoff");
    if (cJSON_IsNumber(onoff_item)) {
        dbCrontxt[id].onoff = (uint8_t)onoff_item->valueint;
    }
    cJSON_Delete(root);
    usbnum = 3;
    xQueueSend(usbQueueHandle, &usbnum, 0);

//    printf("RESULT, parse_timers_json: id=%d, cron=%s, activ=%s, info=%s, onoff=%u\n",
//           id,
//           dbCrontxt[id].cron,
//           dbCrontxt[id].activ,
//           dbCrontxt[id].info,
//           dbCrontxt[id].onoff);
}

void handle_mysett_get(struct mg_connection *c) {
	gen_mysett_json(&SetSettings, jsonbuf, BUFFER_SIZE);
  mg_http_reply(c, 200, s_json_header, "%s\n", jsonbuf);
}
void handle_mysett_set(struct mg_connection *c, struct mg_http_message *hm) {
 if (hm->body.len > 0) {
//	printf("We got a my_settings JSON: %.*s\n", (int) hm->body.len, hm->body.buf);
	parse_mysett_json(hm->body.buf, &SetSettings);
	char response[256];// Формируем корректный JSON-ответ
	snprintf(response, sizeof(response),"{\"status\":true,\"message\":\"Received JSON data\",\"length\":%lu}",(unsigned long)hm->body.len);
	//printf("Sending response: %s\n", response);//чтобы увидеть, какой именно ответ формируется перед отправкой клиенту:
	mg_http_reply(c, 200, "Content-Type: application/json\r\n", "%s", response);// Отправляем ответ клиенту
  } else {// Обработка пустого тела запроса
	mg_http_reply(c, 400, "Content-Type: application/json\r\n","{\"status\":false,\"message\":\"Empty request body\"}");
  }
}
void gen_mysett_json(const struct dbSettings *settings, char *buffer, int buffer_size) {
    int offset = 0;
    offset += snprintf(buffer + offset, buffer_size - offset, "{");
    // Основные настройки
    offset += snprintf(buffer + offset, buffer_size - offset,
            "\"lang\":\"%s\",\"lon_de\":%.6f,\"lat_de\":%.6f,"
            "\"timezone\":%.4f,\"adm_name\":\"%s\",\"adm_pswd\":\"%s\","
            "\"token\":\"%s\",",
            settings->lang, settings->lon_de, settings->lat_de,
            settings->timezone, settings->adm_name, settings->adm_pswd,
            settings->token);
    // Coordinate settings
    offset += snprintf(buffer + offset, buffer_size - offset,
            "\"sunset\":\"%s\",\"sunrise\":\"%s\","
            "\"onsunrise\":%d,\"onsunset\":%d,"
            "\"sunrise_pins\":\"%s\",\"sunset_pins\":\"%s\",\"dlength\":\"%s\",\"fullmoon\":\"%s\",",
            settings->sunset, settings->sunrise,
            settings->onsunrise, settings->onsunset,
            settings->srise_pins, settings->sset_pins,settings->dlength,settings->fullmoon);
    // MQTT настройки
    offset += snprintf(buffer + offset, buffer_size - offset,
            "\"check_mqtt\":%d,\"mqtt_prt\":%d,\"mqtt_clt\":\"%s\","
            "\"mqtt_usr\":\"%s\",\"mqtt_pswd\":\"%s\",\"txmqttop\":\"%s\","
            "\"rxmqttop\":\"%s\",\"mqtt_hst\":\"%d.%d.%d.%d\",",
            settings->check_mqtt, settings->mqtt_prt, settings->mqtt_clt,
            settings->mqtt_usr, settings->mqtt_pswd, settings->txmqttop,
            settings->rxmqttop, settings->mqtt_hst0, settings->mqtt_hst1,
            settings->mqtt_hst2, settings->mqtt_hst3);
    // IP настройки
    offset += snprintf(buffer + offset, buffer_size - offset,
            "\"check_ip\":%d,\"ip_addr\":\"%d.%d.%d.%d\","
            "\"sb_mask\":\"%d.%d.%d.%d\",\"gateway\":\"%d.%d.%d.%d\",",
            settings->check_ip,
            settings->ip_addr0, settings->ip_addr1, settings->ip_addr2, settings->ip_addr3,
            settings->sb_mask0, settings->sb_mask1, settings->sb_mask2, settings->sb_mask3,
            settings->gateway0, settings->gateway1, settings->gateway2, settings->gateway3);
    // Добавляем offldt
    offset += snprintf(buffer + offset, buffer_size - offset,
            "\"offldt\":\"d:%d.%d.%d t:%02d:%02d:%02d\"",
            settings->mday, settings->mon, settings->year,
            settings->hour, settings->min, settings->sec);

    if (offset < buffer_size) {
        offset += snprintf(buffer + offset, buffer_size - offset, "}");
    }
//    printf("Generated settings JSON:\n%s\n", buffer);
}

void parse_mysett_json(char *json_string, struct dbSettings *settings) {
	cJSON *json = cJSON_Parse(json_string);
	if (json == NULL) {
		const char *error_ptr = cJSON_GetErrorPtr();
		if (error_ptr != NULL) {
			fprintf(stderr, "JSON parsing error: %s\n", error_ptr);
		}
		return;
	}
	cJSON *sunrise = cJSON_GetObjectItemCaseSensitive(json, "sunrise");
	if (cJSON_IsString(sunrise) && (sunrise->valuestring != NULL)) {
		strncpy(settings->sunrise, sunrise->valuestring, sizeof(settings->sunrise) - 1);
		settings->sunrise[sizeof(settings->sunrise) - 1] = '\0';
	}
	cJSON *sunset = cJSON_GetObjectItemCaseSensitive(json, "sunset");
	if (cJSON_IsString(sunset) && (sunset->valuestring != NULL)) {
		strncpy(settings->sunset, sunset->valuestring, sizeof(settings->sunset) - 1);
		settings->sunset[sizeof(settings->sunset) - 1] = '\0';
	}
	cJSON *dlength = cJSON_GetObjectItemCaseSensitive(json, "dlength");
	if (cJSON_IsString(dlength) && (dlength->valuestring != NULL)) {
		strncpy(settings->dlength, dlength->valuestring, sizeof(settings->dlength) - 1);
		settings->dlength[sizeof(settings->dlength) - 1] = '\0';
	}

	cJSON *adm_name = cJSON_GetObjectItemCaseSensitive(json, "adm_name");
	if (cJSON_IsString(adm_name) && (adm_name->valuestring != NULL)) {
		strncpy(settings->adm_name, adm_name->valuestring, sizeof(settings->adm_name) - 1);
		settings->adm_name[sizeof(settings->adm_name) - 1] = '\0';
	}
	cJSON *adm_pswd = cJSON_GetObjectItemCaseSensitive(json, "adm_pswd");
	if (cJSON_IsString(adm_pswd) && (adm_pswd->valuestring != NULL)) {
		strncpy(settings->adm_pswd, adm_pswd->valuestring, sizeof(settings->adm_pswd) - 1);
		settings->adm_pswd[sizeof(settings->adm_pswd) - 1] = '\0';
	}
	cJSON *lang = cJSON_GetObjectItemCaseSensitive(json, "lang");
	if (cJSON_IsString(lang) && (lang->valuestring != NULL)) {
		strncpy(settings->lang, lang->valuestring, sizeof(settings->lang) - 1);
		settings->lang[sizeof(settings->lang) - 1] = '\0';
	}
	cJSON *timezone = cJSON_GetObjectItemCaseSensitive(json, "timezone");
	if (cJSON_IsNumber(timezone)) {
		settings->timezone = timezone->valueint;
	}
	cJSON *lon_de = cJSON_GetObjectItemCaseSensitive(json, "lon_de");
	if (cJSON_IsNumber(lon_de)) {
		settings->lon_de = lon_de->valuedouble;
	}
	cJSON *lat_de = cJSON_GetObjectItemCaseSensitive(json, "lat_de");
	if (cJSON_IsNumber(lat_de)) {
		settings->lat_de = lat_de->valuedouble;
	}
	cJSON *onsunrise = cJSON_GetObjectItemCaseSensitive(json, "onsunrise");
	if (cJSON_IsNumber(onsunrise)) {
		settings->onsunrise = (short) onsunrise->valueint;
	}
	cJSON *onsunset = cJSON_GetObjectItemCaseSensitive(json, "onsunset");
	if (cJSON_IsNumber(onsunset)) {
		settings->onsunset = (short) onsunset->valueint;
	}
	cJSON *sunrise_pins = cJSON_GetObjectItemCaseSensitive(json, "sunrise_pins");
	if (cJSON_IsString(sunrise_pins) && (sunrise_pins->valuestring != NULL)) {
		strncpy(settings->srise_pins, sunrise_pins->valuestring, sizeof(settings->srise_pins) - 1);
		settings->srise_pins[sizeof(settings->srise_pins) - 1] = '\0';
	}
	cJSON *sunset_pins = cJSON_GetObjectItemCaseSensitive(json, "sunset_pins");
	if (cJSON_IsString(sunset_pins) && (sunset_pins->valuestring != NULL)) {
		strncpy(settings->sset_pins, sunset_pins->valuestring, sizeof(settings->sset_pins) - 1);
		settings->sset_pins[sizeof(settings->sset_pins) - 1] = '\0';
	}
	cJSON *check_ip = cJSON_GetObjectItemCaseSensitive(json, "check_ip");
	if (cJSON_IsNumber(check_ip)) {
		settings->check_ip = check_ip->valueint;
	}
	cJSON *check_mqtt = cJSON_GetObjectItemCaseSensitive(json, "check_mqtt");
	if (cJSON_IsNumber(check_mqtt)) {
		settings->check_mqtt = check_mqtt->valueint;
	}
	cJSON *ip_addr = cJSON_GetObjectItemCaseSensitive(json, "ip_addr");
	if (cJSON_IsString(ip_addr) && (ip_addr->valuestring != NULL)) {
		sscanf(ip_addr->valuestring, "%hu.%hu.%hu.%hu", &settings->ip_addr0, &settings->ip_addr1, &settings->ip_addr2, &settings->ip_addr3);
	}
	cJSON *sb_mask = cJSON_GetObjectItemCaseSensitive(json, "sb_mask");
	if (cJSON_IsString(sb_mask) && (sb_mask->valuestring != NULL)) {
		sscanf(sb_mask->valuestring, "%hu.%hu.%hu.%hu", &settings->sb_mask0, &settings->sb_mask1, &settings->sb_mask2, &settings->sb_mask3);
	}
	cJSON *gateway = cJSON_GetObjectItemCaseSensitive(json, "gateway");
	if (cJSON_IsString(gateway) && (gateway->valuestring != NULL)) {
		sscanf(gateway->valuestring, "%hu.%hu.%hu.%hu", &settings->gateway0, &settings->gateway1, &settings->gateway2, &settings->gateway3);
	}
	cJSON *token = cJSON_GetObjectItemCaseSensitive(json, "token");
	if (cJSON_IsString(token) && (token->valuestring != NULL)) {
		strncpy(settings->token, token->valuestring, sizeof(settings->token) - 1);
		settings->token[sizeof(settings->token) - 1] = '\0';
	}
	cJSON *mqtt_hst = cJSON_GetObjectItemCaseSensitive(json, "mqtt_hst");
	if (cJSON_IsString(mqtt_hst) && (mqtt_hst->valuestring != NULL)) {
		sscanf(mqtt_hst->valuestring, "%hu.%hu.%hu.%hu", &settings->mqtt_hst0, &settings->mqtt_hst1, &settings->mqtt_hst2, &settings->mqtt_hst3);
	}
	cJSON *mqtt_prt = cJSON_GetObjectItemCaseSensitive(json, "mqtt_prt");
	if (cJSON_IsNumber(mqtt_prt)) {
		settings->mqtt_prt = mqtt_prt->valueint;
	}
	cJSON *mqtt_clt = cJSON_GetObjectItemCaseSensitive(json, "mqtt_clt");
	if (cJSON_IsString(mqtt_clt) && (mqtt_clt->valuestring != NULL)) {
		strncpy(settings->mqtt_clt, mqtt_clt->valuestring, sizeof(settings->mqtt_clt) - 1);
		settings->mqtt_clt[sizeof(settings->mqtt_clt) - 1] = '\0';
	}
	cJSON *mqtt_usr = cJSON_GetObjectItemCaseSensitive(json, "mqtt_usr");
	if (cJSON_IsString(mqtt_usr) && (mqtt_usr->valuestring != NULL)) {
		strncpy(settings->mqtt_usr, mqtt_usr->valuestring, sizeof(settings->mqtt_usr) - 1);
		settings->mqtt_usr[sizeof(settings->mqtt_usr) - 1] = '\0';
	}
	cJSON *mqtt_pswd = cJSON_GetObjectItemCaseSensitive(json, "mqtt_pswd");
	if (cJSON_IsString(mqtt_pswd) && (mqtt_pswd->valuestring != NULL)) {
		strncpy(settings->mqtt_pswd, mqtt_pswd->valuestring, sizeof(settings->mqtt_pswd) - 1);
		settings->mqtt_pswd[sizeof(settings->mqtt_pswd) - 1] = '\0';
	}
	cJSON *txmqttop = cJSON_GetObjectItemCaseSensitive(json, "txmqttop");
	if (cJSON_IsString(txmqttop) && (txmqttop->valuestring != NULL)) {
		strncpy(settings->txmqttop, txmqttop->valuestring, sizeof(settings->txmqttop) - 1);
		settings->txmqttop[sizeof(settings->txmqttop) - 1] = '\0';
	}
	cJSON *rxmqttop = cJSON_GetObjectItemCaseSensitive(json, "rxmqttop");
	if (cJSON_IsString(rxmqttop) && (rxmqttop->valuestring != NULL)) {
		strncpy(settings->rxmqttop, rxmqttop->valuestring, sizeof(settings->rxmqttop) - 1);
		settings->rxmqttop[sizeof(settings->rxmqttop) - 1] = '\0';
	}
	cJSON *offlinedt = cJSON_GetObjectItemCaseSensitive(json, "offldt");//
	if (cJSON_IsString(offlinedt) && (offlinedt->valuestring != NULL)) {
		char *dt_str = offlinedt->valuestring;
		int day, month, year, hour, min, sec;

		char *date_start = strstr(dt_str, "d:"); // Find the date part after "d:"
		if (date_start) {
			sscanf(date_start + 2, "%d.%d.%d", &day, &month, &year);
			settings->mday = (uint8_t) day;
			settings->mon = (uint8_t) month;
			settings->year = (uint8_t) (year);
		}

		char *time_start = strstr(dt_str, "t:"); // Find the time part after "t:"
		if (time_start) {
			sscanf(time_start + 2, "%d:%d:%d", &hour, &min, &sec);
			settings->hour = (uint8_t) hour;
			settings->min = (uint8_t) min;
			settings->sec = (uint8_t) sec;
		}
	}
	cJSON_Delete(json);
	usbnum = 2;
	xQueueSend(usbQueueHandle, &usbnum, 0);
//	printf("parse_mysett_json: adm_name=%s, adm_pswd=%s, token=%s, lang=%s, timezone=%.1f, "
//			"lon_de=%.6f, lat_de=%.6f, ip1_sntp=%d.%d.%d.%d, ip2_sntp=%d.%d.%d.%d, "
//			"ip3_sntp=%d.%d.%d.%d, check_mqtt=%d, mqtt_prt=%d, mqtt_clt=%s, mqtt_usr=%s, "
//			"mqtt_pswd=%s, txmqttop=%s, rxmqttop=%s, mqtt_hst=%d.%d.%d.%d, check_ip=%d, "
//			"ip_addr=%d.%d.%d.%d, sb_mask=%d.%d.%d.%d, gateway=%d.%d.%d.%d, "
//			"onsunrise=%d, onsunset=%d, srise_pins=%s, sset_pins=%s, "
//			"sunrise=%s, sunset=%s, dlength=%s, OFFLINE date=%02d.%02d.%02d, OFFLINE time=%02d:%02d:%02d\n", settings->adm_name, settings->adm_pswd, settings->token, settings->lang, settings->timezone, settings->lon_de, settings->lat_de, settings->ip1_sntp0, settings->ip1_sntp1, settings->ip1_sntp2, settings->ip1_sntp3, settings->ip2_sntp0,
//			settings->ip2_sntp1, settings->ip2_sntp2, settings->ip2_sntp3, settings->ip3_sntp0, settings->ip3_sntp1, settings->ip3_sntp2, settings->ip3_sntp3, settings->check_mqtt, settings->mqtt_prt, settings->mqtt_clt, settings->mqtt_usr, settings->mqtt_pswd, settings->txmqttop,
//			settings->rxmqttop, settings->mqtt_hst0, settings->mqtt_hst1, settings->mqtt_hst2, settings->mqtt_hst3, settings->check_ip, settings->ip_addr0, settings->ip_addr1, settings->ip_addr2, settings->ip_addr3, settings->sb_mask0, settings->sb_mask1, settings->sb_mask2, settings->sb_mask3,
//			settings->gateway0, settings->gateway1, settings->gateway2, settings->gateway3, settings->onsunrise, settings->onsunset, settings->srise_pins, settings->sset_pins, settings->sunrise, settings->sunset, settings->dlength, settings->mday, settings->mon, settings->year,
//	           settings->hour, settings->min, settings->sec);
}

void handle_connection_del(struct mg_connection *c, struct mg_http_message *hm, struct dbPinToPin PinsLinks[NUMPINLINKS]) {
//    printf("We got a delJSON: %.*s\n", (int) hm->body.len, hm->body.buf);

    if (hm->body.len > 0) {
        cJSON *root = cJSON_ParseWithLength(hm->body.buf, hm->body.len);
        if (root) {
            cJSON *id_item = cJSON_GetObjectItem(root, "id");
//            printf("id: %d\n", id_item->valueint);
            cJSON *pin_item = cJSON_GetObjectItem(root, "pin");
//            printf("pin: %s\n", pin_item->valuestring);
            if (cJSON_IsNumber(id_item) && cJSON_IsString(pin_item)) {
                uint8_t id = id_item->valueint;
                const char* pin_str = pin_item->valuestring;

                char* bracket_pos = strchr(pin_str, '(');// Remove everything after and including the opening parenthesis
                if (bracket_pos != NULL) {
                    *bracket_pos = '\0';  // Truncate the string at the opening parenthesis
                }
//                printf("modified pin: %s\n", pin_str);
                if (id >= 0 && id < NUMPIN) {
                    int found = 0;
                    for (int i = 0; i < PINPAIRS; i++) {
                    	if (bracket_pos != NULL) {
                    	    *bracket_pos = '\0';  // Обрезаем строку до скобки
                    	}
                        if (strcmp(PinsConf[id].pinact[i].pin, pin_str) == 0) { // Сравнение строк
                            // Удаляем элемент, сдвигая все последующие
                            for (int j = i; j < PINPAIRS; j++) {
                                PinsConf[id].pinact[j] = PinsConf[id].pinact[j+1];
                            }
                            // Очищаем последний элемент
                            memset(&PinsConf[id].pinact[9], 0, sizeof(PinAction));
                            found = 1;
                            break;
                        }
                    }
//                    printf("Searching for id: %d, pin: %s\n", id, pin_str);
                    // Поиск и обновление в PinsLinks
                    for (int i = 0; i < NUMPINLINKS; i++) {
                        if (PinsLinks[i].idin == id && strcmp(PinsLinks[i].pins, pin_str) == 0) { // Сравнение строк
//                        	printf("PinsLinks[%d].idin:%d == id[%d] & PinsLinks[%d].pins:%s",i, PinsLinks[i].idin, id, i, PinsLinks[i].pins);
                            PinsLinks[i].idin = 0;
                            PinsLinks[i].idout = 0;
                            strcpy(PinsLinks[i].pins, "");
                            found = 2;

                            uint8_t usbnum = 4;
                            xQueueSend(usbQueueHandle, &usbnum, 0);
                            break;
                        }
                    }

                    if (found == 2) {
                        printf("We deleted a pin with ID = %s from pinact[%d] and updated PinsLinks! \r\n", pin_str, id);
                        mg_http_reply(c, 200, "Content-Type: application/json\r\n",
                                      "{\"status\":true,\"message\":\"Pin deleted successfully and PinsLinks updated\"}");
                    } else if (found == 1) {
                        printf("We deleted a pin with ID = %s from pinact[%d], but didn't find it in PinsLinks!\n", pin_str, id);
                        mg_http_reply(c, 200, "Content-Type: application/json\r\n",
                                      "{\"status\":true,\"message\":\"Pin deleted successfully, but not found in PinsLinks\"}");
                    } else {
                        mg_http_reply(c, 404, "Content-Type: application/json\r\n",
                                      "{\"status\":false,\"message\":\"Pin not found\"}");
                    }
                } else {
                    mg_http_reply(c, 400, "Content-Type: application/json\r\n",
                                  "{\"status\":false,\"message\":\"Invalid ID\"}");
                }
            } else {
                mg_http_reply(c, 400, "Content-Type: application/json\r\n",
                              "{\"status\":false,\"message\":\"Invalid JSON format\"}");
            }
            cJSON_Delete(root);
        } else {
            mg_http_reply(c, 400, "Content-Type: application/json\r\n",
                          "{\"status\":false,\"message\":\"Invalid JSON\"}");
        }
    } else {
        mg_http_reply(c, 400, "Content-Type: application/json\r\n",
                      "{\"status\":false,\"message\":\"Empty request body\"}");
    }
}
void api_handler(struct mg_connection *c, struct mg_http_message *hm) {
    char id_str[10], value_str[10], token[11];
    int id = -1, value = -1;
    printf("Full URI in handle_api: %.*s\r\n", (int)hm->uri.len, hm->uri.buf);

    // Копируем URI в локальный буфер для разбора
    char full_uri[256];
    char urlcopy[256];
    snprintf(full_uri, sizeof(full_uri), "%.*s", (int)hm->uri.len, hm->uri.buf);
    strncpy(urlcopy, full_uri, sizeof(urlcopy) - 1);
    printf("full_uri: %s\n", full_uri);

    // Извлекаем токен (первая часть пути)
    char *tokenptr = full_uri;
    char *nxtslash = strchr(tokenptr, '/');
    if (nxtslash) {
        size_t token_len = nxtslash - tokenptr;
        if (token_len < sizeof(token)) {
            strncpy(token, tokenptr, token_len);
            token[token_len] = '\0';
            printf("Extracted token: '%s'\n", token);
        }
    }

    // Проверяем токен
    if (strcmp(token, SetSettings.token) != 0) {
        printf("Token mismatch: got '%s', expected '%s'\n", token, SetSettings.token);
        mg_http_reply(c, 401, NULL, "Invalid token\n");
        return;
    }

    // Получаем команду (часть после токена, до знака вопроса)
    const char *command = strchr(urlcopy, '/');
    if (command) {
        command++; // Пропускаем первый слэш
        size_t cmdlen = strcspn(command, "?");
        printf("Command part: %.*s\n", (int)cmdlen, command);

        if (mg_http_get_var(&hm->query, "id", id_str, sizeof(id_str)) > 0) {
            id = atoi(id_str);
            if (id >= 0 && id < NUMPIN) {
                if (strncmp(command, "switch", cmdlen) == 0) {
                    if (PinsConf[id].topin == 3) { // ONEWIRE
                        if (mg_http_get_var(&hm->query, "onoff", value_str, sizeof(value_str)) > 0) {
                            value = atoi(value_str);
                            processPins(id, value);
                            PinsConf[id].onoff = value;
                            mg_http_reply(c, 200, "Content-Type: text/plain\r\n", "Switch %d set to %d\n", id, value);
                        } else {
                            mg_http_reply(c, 400, NULL, "Missing onoff parameter\n");
                        }
                    } else {
                        mg_http_reply(c, 400, NULL, "Error, switch with id = %d doesn't exist!\n", id);
                    }
                } else if (strncmp(command, "button", cmdlen) == 0) {
                    if (PinsConf[id].topin == 1) {  // BUTTON
                        // Проверяем наличие параметров в URL
                        if (strstr(full_uri, "single_click") != NULL) {
                            if (strlen(PinsConf[id].sclick) > 0) {
                                printf("Executing single click actions: '%s'\n", PinsConf[id].sclick);
                                process_actions(PinsConf[id].sclick);
                                mg_http_reply(c, 200, "Content-Type: text/plain\r\n", "Button %d: The 'SINGLE CLICK' action was performed!\r\n", id);
                            } else {
                                mg_http_reply(c, 400, NULL, "No single click actions configured\n");
                            }
                        } else if (strstr(full_uri, "double_click") != NULL) {
                            if (strlen(PinsConf[id].dclick) > 0) {
                                printf("Executing double click actions: '%s'\n", PinsConf[id].dclick);
                                process_actions(PinsConf[id].dclick);
                                mg_http_reply(c, 200, "Content-Type: text/plain\r\n", "Button %d: The 'DOUBLE CLICK' action was performed!\r\n", id);
                            } else {
                                mg_http_reply(c, 400, NULL, "No double click actions configured\n");
                            }
                        } else if (strstr(full_uri, "long_press") != NULL) {
                            if (strlen(PinsConf[id].lpress) > 0) {
                                printf("Executing long press actions: '%s'\n", PinsConf[id].lpress);
                                process_actions(PinsConf[id].lpress);
                                mg_http_reply(c, 200, "Content-Type: text/plain\r\n", "Button %d: The 'LONG PRESS' action was performed!\r\n", id);
                            } else {
                                mg_http_reply(c, 400, NULL, "No long press actions configured\n");
                            }
                        } else {
                            mg_http_reply(c, 400, NULL, "Missing click type parameter (single_click/double_click/long_press)\n");
                        }
                    } else {
                        mg_http_reply(c, 400, NULL, "Error, button with id = %d doesn't exist!\n", id);
                    }
                } else if (strncmp(command, "pwm", cmdlen) == 0) {
                    if (PinsConf[id].topin == 5) { // PWM
                        if (mg_http_get_var(&hm->query, "dvalue", value_str, sizeof(value_str)) > 0) {
                            value = atoi(value_str);
                            PinsConf[id].dvalue = value;
                            mg_http_reply(c, 200, "Content-Type: text/plain\r\n", "PWM %d set to %d\n", id, value);
                        } else {
                            mg_http_reply(c, 400, NULL, "Missing dvalue parameter for pwm\n");
                        }
                    } else {
                        mg_http_reply(c, 400, NULL, "Error, pwm with id = %d doesn't exist!\n", id);
                    }
                } else {
                    mg_http_reply(c, 400, NULL, "Invalid command\n");
                }
            } else {
                mg_http_reply(c, 400, NULL, "Invalid ID\n");
            }
        } else {
            mg_http_reply(c, 400, NULL, "Missing ID parameter\n");
        }
    } else {
        mg_http_reply(c, 400, NULL, "Invalid URI format\n");
    }
}

/*********************************** ONEWIRE ****************************************/
void gen_onewire_json(char *buffer, int buffer_size) {
//    printf("\n=== Start of gen_onewire_json ===\n");
//    printf("Buffer size: %d\n", buffer_size);

    int offset = 0;
    bool fstpin = true;
    bool bfrfull = false;
    bool owfound = false;
    bool snsr_fnd = false;

    // Start JSON
    offset += snprintf(buffer + offset, buffer_size - offset,
                      "{\"lang\":\"%s\",\"pins\":[", SetSettings.lang);

    for (uint8_t i = 0; i < NUMPIN && !bfrfull; i++) {
        if (PinsConf[i].topin == 4) { // Нашли OneWire пин
            owfound = true;
            snsr_fnd = false;

            // Проверяем есть ли этот пин в массиве ds18b20
            for (uint8_t j = 0; j < MAX_DS18B20_P && !bfrfull; j++) {
                if (ds18b20[j].id == i && ds18b20[j].typsensr == 1) {
                    snsr_fnd = true;
                    if (!fstpin) {
                        offset += snprintf(buffer + offset, buffer_size - offset, ",");
                    }
                    fstpin = false;

                    if (offset > (buffer_size - 1000)) {
                        bfrfull = true;
                        break;
                    }

                    // Основная информация о пине DS18B20
                    offset += snprintf(buffer + offset, buffer_size - offset,
                        "{\"id\":%d,\"pin\":\"%s\",\"typsensr\":%d,\"numsens\":%d,\"onoff\":%d",
                        ds18b20[j].id, ds18b20[j].pin, ds18b20[j].typsensr,
                        ds18b20[j].numsens, ds18b20[j].onoff);

                    // Массив датчиков DS18B20
                    offset += snprintf(buffer + offset, buffer_size - offset, ",\"sensors\":[");
                    bool first_sensor = true;

                    for (uint8_t k = 0; k < ds18b20[j].numsens && k < MAX_DS18B20_PER_PIN; k++) {
                        if (offset > (buffer_size - 500)) {
                            bfrfull = true;
                            break;
                        }

                        if (!first_sensor) {
                            offset += snprintf(buffer + offset, buffer_size - offset, ",");
                        }
                        first_sensor = false;

                        char address_str[17];
                        snprintf(address_str, sizeof(address_str),
                                "%02X%02X%02X%02X%02X%02X%02X%02X",
                                ds18b20[j].sensors[k].addr[0], ds18b20[j].sensors[k].addr[1],
                                ds18b20[j].sensors[k].addr[2], ds18b20[j].sensors[k].addr[3],
                                ds18b20[j].sensors[k].addr[4], ds18b20[j].sensors[k].addr[5],
                                ds18b20[j].sensors[k].addr[6], ds18b20[j].sensors[k].addr[7]);

                        offset += snprintf(buffer + offset, buffer_size - offset,
                            "{\"s_number\":\"%s\",\"t\":%.4f,\"valid\":%s,"
                            "\"ut\":%.2f,\"lt\":%.2f,\"action_ut\":\"%s\","
                            "\"action_lt\":\"%s\",\"info\":\"%s\"}",
                            address_str, ds18b20[j].sensors[k].temp,
                            ds18b20[j].sensors[k].valid ? "true" : "false",
                            ds18b20[j].sensors[k].upt, ds18b20[j].sensors[k].lowt,
                            ds18b20[j].sensors[k].actup, ds18b20[j].sensors[k].actlow,
                            ds18b20[j].sensors[k].info);
                    }
                    offset += snprintf(buffer + offset, buffer_size - offset, "]}");
                }
            }

            // Проверяем есть ли этот пин в массиве dht22
            for (uint8_t j = 0; j < MAX_DHT22_P && !bfrfull && !snsr_fnd; j++) {
                if (dht22[j].id == i && dht22[j].typsensr == 2) {
                    snsr_fnd = true;
                    if (!fstpin) {
                        offset += snprintf(buffer + offset, buffer_size - offset, ",");
                    }
                    fstpin = false;

                    if (offset > (buffer_size - 500)) {
                        bfrfull = true;
                        break;
                    }

                    offset += snprintf(buffer + offset, buffer_size - offset,
                        "{\"id\":%d,\"pin\":\"%s\",\"typsensr\":%d,\"numsens\":%d,\"onoff\":%d,\"sensors\":[",
                        dht22[j].id, dht22[j].pin, dht22[j].typsensr,
                        dht22[j].numsens, dht22[j].onoff);

                    offset += snprintf(buffer + offset, buffer_size - offset,
                        "{\"s_number\":\"DHT22\",\"t\":%.2f,\"humidity\":%.2f,\"valid\":%s,"
                        "\"ut\":%.2f,\"lt\":%.2f,\"action_ut\":\"%s\",\"action_lt\":\"%s\","
                        "\"upphumid\":%.2f,\"humlolim\":%.2f,\"actuphum\":\"%s\","
                        "\"actlowhum\":\"%s\",\"info\":\"%s\"}",
                        dht22[j].temp, dht22[j].humid,
                        dht22[j].valid ? "true" : "false",
                        dht22[j].upt, dht22[j].lowt,
                        dht22[j].actup, dht22[j].actlow,
                        dht22[j].uph, dht22[j].lowh,
                        dht22[j].actuh, dht22[j].actlh,
                        dht22[j].info);

                    offset += snprintf(buffer + offset, buffer_size - offset, "]}");
                }
            }

            // Если OneWire пин найден, но не активен (нет датчиков)
            if (!snsr_fnd && !bfrfull) {
                if (!fstpin) {
                    offset += snprintf(buffer + offset, buffer_size - offset, ",");
                }
                fstpin = false;

                offset += snprintf(buffer + offset, buffer_size - offset,
                    "{\"id\":%d,\"pin\":\"%s\",\"typsensr\":0,"
                    "\"numsens\":0,\"info\":\"No active sensors found\",\"onoff\":0}",
                    i, PinsInfo[i].pins);
            }
        }
    }
    // Если не нашли ни одного OneWire пина
    if (!owfound && !bfrfull) {
        offset += snprintf(buffer + offset, buffer_size - offset,
            "{\"id\":0,\"pin\":\"N/A\",\"typsensr\":0,"
            "\"numsens\":0,\"info\":\"No OneWire pins found\",\"onoff\":0}");
    }
    // Завершаем JSON
    if (bfrfull) {
        offset += snprintf(buffer + offset, buffer_size - offset,
            "],\"warning\":\"Data truncated due to buffer size limitation\"}");
    } else {
        offset += snprintf(buffer + offset, buffer_size - offset, "]}");
    }
//    printf("\nJSON generated (%d bytes). %s\n", offset, bfrfull ? "Warning: Data truncated!" : "All data included");
//    printf("%s\n", buffer);
//    printf("=== End of gen_onewire_json ===\n\n");

//    uint8_t usbnum = 5;
//    xQueueSend(usbQueueHandle, &usbnum, 0);
}

void handle_onewire_get(struct mg_connection *c) {
//	init_device();
//	printf("Before generating JSON:\n");
//	printf("  g_device.numowpin: %d\n", g_device.numowpin);
//	printf("  myowpin.id: %d\n", myowpin.id);
//	printf("  myowpin.pin: %s\n", myowpin.pin);
//	printf("  myowpin.typsensr: %d\n", myowpin.typsensr);
//	printf("  myowpin.numsens: %d\n", myowpin.numsens);
//	printf("  myowpin[%d].onoff: %d\n", myowpin.id, myowpin.onoff);
//	gen_onewire_json(&g_device, PinsConf, NUMPIN, jsonbuf, BUFFER_SIZE);
	gen_onewire_json(jsonbuf, BUFFER_SIZE);
  mg_http_reply(c, 200, s_json_header, "%s\n", jsonbuf);
}
bool parse_onewire_json(const char* jstr, struct dbPinsConf *pincfg) {
    if (jstr == NULL) return false;

    cJSON* json = cJSON_Parse(jstr);
    if (json == NULL) {
        const char* errptr = cJSON_GetErrorPtr();
        if (errptr != NULL) {
            fprintf(stderr, "Error parsing JSON: %s\n", errptr);
        }
        return false;
    }
    // Проверяем все необходимые поля
    cJSON* id = cJSON_GetObjectItemCaseSensitive(json, "id");
    cJSON* pin = cJSON_GetObjectItemCaseSensitive(json, "pin");
    cJSON* type = cJSON_GetObjectItemCaseSensitive(json, "typsensor");
    cJSON* numdev = cJSON_GetObjectItemCaseSensitive(json, "numdevices");
    cJSON* onoff = cJSON_GetObjectItemCaseSensitive(json, "onoff");
    // Проверяем наличие и типы обязательных полей
    if (!cJSON_IsNumber(id) || !cJSON_IsString(pin) ||
        !cJSON_IsNumber(type) || !cJSON_IsNumber(onoff)) {
        fprintf(stderr, "Error: missing or invalid required fields\n");
        cJSON_Delete(json);
        return false;
    }
    uint8_t sensrtpe = (uint8_t)type->valueint;
    uint8_t sensr_id = (uint8_t)id->valueint;
    if (sensrtpe == 1) { // DS18B20
        int free_slot = -1;
        int existing_id_slot = -1;
        // Сначала ищем существующие записи
        for (uint8_t i = 0; i < MAX_DS18B20_P; i++) {
            if (ds18b20[i].typsensr == 0 && free_slot == -1) {
                free_slot = i; // Запоминаем первый свободный слот
            }
            if (ds18b20[i].typsensr == sensrtpe) {
                if (ds18b20[i].id == sensr_id) {
                    existing_id_slot = i; // Нашли запись с таким же ID
                    break; // Приоритет у совпадения по ID
                }
            }
        }
        // Определяем, какой слот использовать
        int target_slot;
        if (existing_id_slot != -1) {
            target_slot = existing_id_slot; // Используем слот с совпадающим ID
        } else if (free_slot != -1) {
            target_slot = free_slot; // Используем свободный слот
        } else {
            fprintf(stderr, "Error: no free slots for DS18B20\n");
            cJSON_Delete(json);
            return false;
        }
        // Записываем данные в выбранный слот
        ds18b20[target_slot].id = sensr_id;
        strncpy(ds18b20[target_slot].pin, pin->valuestring, sizeof(ds18b20[target_slot].pin) - 1);
        ds18b20[target_slot].pin[sizeof(ds18b20[target_slot].pin) - 1] = '\0';
        ds18b20[target_slot].typsensr = sensrtpe;
        ds18b20[target_slot].onoff = (uint8_t)onoff->valueint;
        ds18b20[target_slot].numsens = cJSON_IsNumber(numdev) ? (uint8_t)numdev->valueint : 0;

        // Добавляем отправку в очередь USB для DS18B20
        uint8_t usbnum = 5;
        xQueueSend(usbQueueHandle, &usbnum, 0);

        cJSON_Delete(json);
        return true;
    }
    else if (sensrtpe == 2) { // DHT22
        int free_slot = -1;
        int existing_id_slot = -1;
        // Сначала ищем существующие записи
        for (uint8_t i = 0; i < MAX_DHT22_P; i++) {
            if (dht22[i].typsensr == 0 && free_slot == -1) {
                free_slot = i; // Запоминаем первый свободный слот
            }
            if (dht22[i].typsensr == sensrtpe) {
                if (dht22[i].id == sensr_id) {
                    existing_id_slot = i; // Нашли запись с таким же ID
                    break; // Приоритет у совпадения по ID
                }
            }
        }
        // Определяем, какой слот использовать
        int target_slot;
        if (existing_id_slot != -1) {
            target_slot = existing_id_slot; // Используем слот с совпадающим ID
        } else if (free_slot != -1) {
            target_slot = free_slot; // Используем свободный слот
        } else {
            fprintf(stderr, "Error: no free slots for DHT22\n");
            cJSON_Delete(json);
            return false;
        }
        // Записываем данные в выбранный слот
        dht22[target_slot].id = sensr_id;
        strncpy(dht22[target_slot].pin, pin->valuestring, sizeof(dht22[target_slot].pin) - 1);
        dht22[target_slot].pin[sizeof(dht22[target_slot].pin) - 1] = '\0';
        dht22[target_slot].typsensr = sensrtpe;
        dht22[target_slot].numsens = cJSON_IsNumber(numdev) ? (uint8_t)numdev->valueint : 0;
        dht22[target_slot].onoff = (uint8_t)onoff->valueint;

        uint8_t usbnum = 5;
        xQueueSend(usbQueueHandle, &usbnum, 0);

        cJSON_Delete(json);
        return true;
    }
    // Если тип датчика неизвестен
    fprintf(stderr, "Error: unknown sensor type\n");
    cJSON_Delete(json);
    return false;
}


bool parse_sensor_json(const char *json_string) {
    cJSON *json = cJSON_Parse(json_string);
    if (json == NULL) {
        const char *error_ptr = cJSON_GetErrorPtr();
        if (error_ptr != NULL) {
            fprintf(stderr, "JSON parsing error: %s\n", error_ptr);
        }
        return false;
    }

    cJSON *sensorNumber = cJSON_GetObjectItemCaseSensitive(json, "sensorNumber");
    if (!sensorNumber) {
        sensorNumber = cJSON_GetObjectItemCaseSensitive(json, "s_number");
    }
    if (!cJSON_IsString(sensorNumber)) {
        fprintf(stderr, "Error: Invalid or missing sensorNumber/s_number\n");
        cJSON_Delete(json);
        return false;
    }

//    printf("Searching for sensor with address: %s\n", sensorNumber->valuestring);

    if (strcmp(sensorNumber->valuestring, "DHT22") == 0) {
        // Обработка DHT22 датчиков
        cJSON *pin_id = cJSON_GetObjectItemCaseSensitive(json, "id");
        if (!cJSON_IsNumber(pin_id)) {
            fprintf(stderr, "Error: Invalid or missing id for DHT22\n");
            cJSON_Delete(json);
            return false;
        }
        cJSON *pinName = cJSON_GetObjectItemCaseSensitive(json, "pins");
        if (!cJSON_IsString(pinName)) {
            fprintf(stderr, "Error: Invalid or missing pin for DHT22\n");
            cJSON_Delete(json);
            return false;
        }

        // Ищем нужный DHT22 датчик
        dht22_pin_t *t_dht22 = NULL;
        for (int i = 0; i < MAX_DHT22_P; i++) {
            if (dht22[i].id == pin_id->valueint && strcmp(dht22[i].pin, pinName->valuestring) == 0) {
                t_dht22 = &dht22[i];
                printf("Found DHT22 on Pin %s with ID:%d\n", pinName->valuestring, dht22[i].id);
                break;
            }
        }

        if (!t_dht22) {
            fprintf(stderr, "Error: DHT22 with id %d and pin %s not found\n", pin_id->valueint, pinName->valuestring);
            cJSON_Delete(json);
            return false;
        }

        // Обновление параметров DHT22
        cJSON *ut = cJSON_GetObjectItemCaseSensitive(json, "ut");
        if (cJSON_IsNumber(ut)) t_dht22->upt = ut->valuedouble;

        cJSON *lt = cJSON_GetObjectItemCaseSensitive(json, "lt");
        if (cJSON_IsNumber(lt)) t_dht22->lowt = lt->valuedouble;

        cJSON *uh = cJSON_GetObjectItemCaseSensitive(json, "upphumid");
        if (cJSON_IsNumber(uh)) t_dht22->uph = uh->valuedouble;

        cJSON *lh = cJSON_GetObjectItemCaseSensitive(json, "humlolim");
        if (cJSON_IsNumber(lh)) t_dht22->lowh = lh->valuedouble;

        cJSON *acut = cJSON_GetObjectItemCaseSensitive(json, "action_ut");
        if (!acut) acut = cJSON_GetObjectItemCaseSensitive(json, "actup");
        if (cJSON_IsString(acut)) strncpy(t_dht22->actup, acut->valuestring, sizeof(t_dht22->actup) - 1);

        cJSON *aclt = cJSON_GetObjectItemCaseSensitive(json, "action_lt");
        if (!aclt) aclt = cJSON_GetObjectItemCaseSensitive(json, "actlow");
        if (cJSON_IsString(aclt)) strncpy(t_dht22->actlow, aclt->valuestring, sizeof(t_dht22->actlow) - 1);

        cJSON *acuh = cJSON_GetObjectItemCaseSensitive(json, "actuphum");
        if (cJSON_IsString(acuh)) strncpy(t_dht22->actuh, acuh->valuestring, sizeof(t_dht22->actuh) - 1);

        cJSON *aclh = cJSON_GetObjectItemCaseSensitive(json, "actlowhum");
        if (cJSON_IsString(aclh)) strncpy(t_dht22->actlh, aclh->valuestring, sizeof(t_dht22->actlh) - 1);

        cJSON *info = cJSON_GetObjectItemCaseSensitive(json, "info");
        if (cJSON_IsString(info)) strncpy(t_dht22->info, info->valuestring, sizeof(t_dht22->info) - 1);

    } else {
        // Обработка DS18B20 датчиков
        ds18b20_pin_t *t_ds18b20 = NULL;
        int sensor_index = -1;

        for (int i = 0; i < MAX_DS18B20_P; i++) {
            for (int j = 0; j < ds18b20[i].numsens; j++) {
                char sensor_addr_str[17] = {0};
                for (int k = 0; k < 8; k++) {
                    sprintf(sensor_addr_str + (k * 2), "%02X", ds18b20[i].sensors[j].addr[k]);
                }
                if (strcasecmp(sensor_addr_str, sensorNumber->valuestring) == 0) {
                    t_ds18b20 = &ds18b20[i];
                    sensor_index = j;
                    printf("Match found! Pin: %s, Sensor index: %d\n", t_ds18b20->pin, sensor_index);
                    break;
                }
            }
            if (t_ds18b20) break;
        }

        if (!t_ds18b20 || sensor_index == -1) {
            fprintf(stderr, "Error: DS18B20 with address %s not found\n", sensorNumber->valuestring);
            cJSON_Delete(json);
            return false;
        }

        // Обновление параметров DS18B20
        cJSON *ut = cJSON_GetObjectItemCaseSensitive(json, "ut");
        if (cJSON_IsNumber(ut)) t_ds18b20->sensors[sensor_index].upt = ut->valuedouble;

        cJSON *lt = cJSON_GetObjectItemCaseSensitive(json, "lt");
        if (cJSON_IsNumber(lt)) t_ds18b20->sensors[sensor_index].lowt = lt->valuedouble;

        cJSON *acut = cJSON_GetObjectItemCaseSensitive(json, "action_ut");
        if (!acut) acut = cJSON_GetObjectItemCaseSensitive(json, "actup");
        if (cJSON_IsString(acut)) strncpy(t_ds18b20->sensors[sensor_index].actup, acut->valuestring, sizeof(t_ds18b20->sensors[sensor_index].actup) - 1);

        cJSON *aclt = cJSON_GetObjectItemCaseSensitive(json, "action_lt");
        if (!aclt) aclt = cJSON_GetObjectItemCaseSensitive(json, "actlow");
        if (cJSON_IsString(aclt)) strncpy(t_ds18b20->sensors[sensor_index].actlow, aclt->valuestring, sizeof(t_ds18b20->sensors[sensor_index].actlow) - 1);

        cJSON *info = cJSON_GetObjectItemCaseSensitive(json, "info");
        if (cJSON_IsString(info)) strncpy(t_ds18b20->sensors[sensor_index].info, info->valuestring, sizeof(t_ds18b20->sensors[sensor_index].info) - 1);
    }

	uint8_t usbnum = 5;
	xQueueSend(usbQueueHandle, &usbnum, 0);

    cJSON_Delete(json);
    return true;
}


void handle_onewire_set(struct mg_connection *c, struct mg_http_message *hm){
	if (hm->body.len > 0) {
//		printf("We got a OneWire JSON: %.*s\n", (int) hm->body.len, hm->body.buf);
		parse_onewire_json(hm->body.buf, &PinsConf[NUMPIN]);
		char response[256]; // Формируем корректный JSON-ответ
		snprintf(response, sizeof(response), "{\"status\":true,\"message\":\"Received JSON data\",\"length\":%lu}", (unsigned long) hm->body.len);
//      printf("Sending response: %s\n", response);//чтобы увидеть, какой именно ответ формируется перед отправкой клиенту:
		mg_http_reply(c, 200, "Content-Type: application/json\r\n", "%s", response); // Отправляем ответ клиенту
	} else { // Обработка пустого тела запроса
		mg_http_reply(c, 400, "Content-Type: application/json\r\n", "{\"status\":false,\"message\":\"Empty request body\"}");
	}
}
void handle_sensor_set(struct mg_connection *c, struct mg_http_message *hm){
	if (hm->body.len > 0) {
//		printf("We got a OW_SENSOR JSON: %.*s\n", (int) hm->body.len, hm->body.buf);
		parse_sensor_json(hm->body.buf);
		char response[256]; // Формируем корректный JSON-ответ
		snprintf(response, sizeof(response), "{\"status\":true,\"message\":\"Received JSON data\",\"length\":%lu}", (unsigned long) hm->body.len);
//      printf("Sending response: %s\n", response);//чтобы увидеть, какой именно ответ формируется перед отправкой клиенту:
		mg_http_reply(c, 200, "Content-Type: application/json\r\n", "%s", response); // Отправляем ответ клиенту
	} else { // Обработка пустого тела запроса
		mg_http_reply(c, 400, "Content-Type: application/json\r\n", "{\"status\":false,\"message\":\"Empty request body\"}");
	}
}
/*********************************** End ONEWIRE ****************************************/

void parse_stm32time(char *response, size_t response_size, const struct dbSettings *settings) {
    if (timez == NULL) {
        snprintf(response, response_size, "{\"status\":false,\"message\":\"STM32 time not available\"}");
        return;
    }
    // Отправляем сырые данные из структуры tm, включая часовой пояс из settings
    snprintf(response, response_size,
             "{\"status\":true,\"time\":{\"sec\":%d,\"min\":%d,\"hour\":%d,"
             "\"mday\":%d,\"mon\":%d,\"year\":%d,\"wday\":%d,\"yday\":%d,\"isdst\":%d},"
             "\"timezone\":%.1f}",
             timez->tm_sec, timez->tm_min, timez->tm_hour,
             timez->tm_mday, timez->tm_mon, timez->tm_year,
             timez->tm_wday, timez->tm_yday, timez->tm_isdst,
             settings->timezone);
}

void handle_stm32time_get(struct mg_connection *c, struct mg_http_message *hm) {
    char response[256];
    parse_stm32time(response, sizeof(response), &SetSettings);
    //printf("Sending response: %s\n", response);
    mg_http_reply(c, 200, "Content-Type: application/json\r\n", "%s", response);
}
void handle_temp_get(struct mg_connection *c) {
    pars_temp_sensors(jsonbuf, BUFFER_SIZE);
    mg_http_reply(c, 200, s_json_header, "%s\n", jsonbuf);
}
int gen_sim800l_json(char *buffer, int buffer_size) {
    if (buffer == NULL || buffer_size <= 0) {
        return -1;
    }
    uint8_t gps_state = SetSettings.sim800l;
    char* phone = SetSettings.tel;
    char* info = PinsConf[1].info;// PA3
    uint8_t onoff_state = PinsConf[1].onoff;// PA3
    // Форматируем JSON строку
    int written = snprintf(buffer, buffer_size,
        "{\n"
        "  \"lang\": \"%s\",\n"
        "  \"sim800l\": %d,\n"
        "  \"tel\": \"%s\",\n"
        "  \"info\": \"%s\",\n"
        "  \"onoff\": %d\n"
        "}",
        SetSettings.lang,
        gps_state,
        phone,
        info,
        onoff_state
    );
    // Проверяем, хватило ли места в буфере
    if (written >= buffer_size) {
        return -1;
    }
    return written;
}
void handle_sim800l_get(struct mg_connection *c) {
	gen_sim800l_json(jsonbuf, BUFFER_SIZE);
    mg_http_reply(c, 200, s_json_header, "%s\n", jsonbuf);
}

void parse_sim800l_json(char *buffer) {
    char *p = buffer;
    char value[32];
    int i = 0;

    // Ищем "tel"
    if ((p = strstr(buffer, "\"tel\":"))) {
        p += 6; // пропускаем "tel":"
        while (*p == ' ' || *p == '"') p++; // пропускаем пробелы и кавычку
        i = 0;
        while (*p != '"' && *p != ',' && *p != '}' && i < sizeof(value) - 1) {
            value[i++] = *p++;
        }
        value[i] = '\0';
//        printf("Debug: Extracted tel value: '%s'\n", value);
        strncpy(SetSettings.tel, value, sizeof(SetSettings.tel) - 1);
        SetSettings.tel[sizeof(SetSettings.tel) - 1] = '\0';
    }

    // Ищем "info"
    p = buffer;
    if ((p = strstr(buffer, "\"info\":"))) {
        p += 7; // пропускаем "info":"
        while (*p == ' ' || *p == '"') p++; // пропускаем пробелы и кавычку
        i = 0;
        while (*p != '"' && *p != ',' && *p != '}' && i < sizeof(value) - 1) {
            value[i++] = *p++;
        }
        value[i] = '\0';
//        printf("Debug: Extracted info value: '%s'\n", value);
        strncpy(PinsConf[1].info, value, sizeof(PinsConf[1].info) - 1);
        PinsConf[1].info[sizeof(PinsConf[1].info) - 1] = '\0';
    }

    // Ищем "onoff"
    p = buffer;
    if ((p = strstr(buffer, "\"onoff\":"))) {
        p += 8; // пропускаем "onoff":
        while (*p == ' ') p++; // пропускаем пробелы
        if (*p == '0') {
            PinsConf[1].onoff = 0;
        } else if (*p == '1') {
            PinsConf[1].onoff = 1;
        }
        printf("Debug: Extracted onoff value: %d\n", PinsConf[1].onoff);
    }
    uint8_t usbnum = 1;// Сохраянем в "pins.ini"
    xQueueSend(usbQueueHandle, &usbnum, 0);
    usbnum = 2;// Сохраянем в "setings.ini"
    xQueueSend(usbQueueHandle, &usbnum, 0);

//    printf("\nFinal values:\n");
//    printf("SetSettings.tel = '%s'\n", SetSettings.tel);
//    printf("PinsConf[1].info = '%s'\n", PinsConf[1].info);
//    printf("PinsConf[1].onoff = %d\n", PinsConf[1].onoff);
}


void handle_sim800l_set(struct mg_connection *c, struct mg_http_message *hm) {
 if (hm->body.len > 0) {
//	printf("We got a GPS json %.*s\n", (int) hm->body.len, hm->body.buf);
	parse_sim800l_json(hm->body.buf);
	char response[256];// Формируем корректный JSON-ответ
	snprintf(response, sizeof(response),"{\"status\":true,\"message\":\"Received JSON data\",\"length\":%lu}",(unsigned long)hm->body.len);
	//printf("Sending response: %s\n", response);//чтобы увидеть, какой именно ответ формируется перед отправкой клиенту:
	mg_http_reply(c, 200, "Content-Type: application/json\r\n", "%s", response);// Отправляем ответ клиенту
  } else {// Обработка пустого тела запроса
	mg_http_reply(c, 400, "Content-Type: application/json\r\n","{\"status\":false,\"message\":\"Empty request body\"}");
  }
}
void mqtt_message_handler(const char *topic, const char *payload) {
    char command[20];
    int id = -1;
//    printf("Received topic: %s, payload: %s\n", topic, payload);

    // Проверяем, начинается ли payload с токена из структуры
    if (strncmp(payload, SetSettings.rxmqttop, strlen(SetSettings.rxmqttop)) != 0 ||
        payload[strlen(SetSettings.rxmqttop)] != '/') {
        printf("Invalid token in payload: %s (expected: %s)\n", payload, SetSettings.rxmqttop);
        return;
    }

    // Пропускаем префикс в payload (токен + слэш)
    const char *command_start = strchr(payload, '/');
    if (!command_start) {
        printf("Invalid payload format, no command found: %s\n", payload);
        return;
    }
    command_start++; // Пропускаем слэш

	// Извлекаем команду
	if (sscanf(command_start, "%[^/]", command) != 1) {
		printf("Invalid command format in payload: %s\n", command_start);
		return;
	}

	// Ищем ID после "id="
	const char *id_part = strstr(command_start, "id=");
	if (!id_part) {
		printf("No id found in payload\n");
		return;
	}
	if (sscanf(id_part + 3, "%d", &id) != 1) {
		printf("Invalid id format in payload\n");
		return;
	}

//	printf("Parsed command: %s, id: %d\n", command, id);
	if (id < 0 || id >= NUMPIN) {
		printf("Invalid ID: %d\n", id);
		return;
	}

	if (strcmp(command, "button") == 0) {
		if (PinsConf[id].topin == 1) { // BUTTON
			// Ищем тип клика после последнего слэша
			const char *last_slash = strrchr(command_start, '/');
			if (last_slash) {
				const char *click_type = last_slash + 1;
				if (strcmp(click_type, "single_click") == 0 && PinsConf[id].sclick[0] != '\0') {
					process_actions(PinsConf[id].sclick);
					printf("Executing single click actions: '%s'\n", PinsConf[id].sclick);
				} else if (strcmp(click_type, "double_click") == 0 && PinsConf[id].dclick[0] != '\0') {
					process_actions(PinsConf[id].dclick);
					printf("Executing double click actions: '%s'\n", PinsConf[id].dclick);
				} else if (strcmp(click_type, "long_press") == 0 && PinsConf[id].lpress[0] != '\0') {
					process_actions(PinsConf[id].lpress);
					printf("Executing long press actions: '%s'\n", PinsConf[id].lpress);
				} else {
					printf("Invalid or unconfigured click type: %s\n", click_type);
				}
			} else {
				printf("No click type found in payload\n");
			}
		} else {
			printf("Error, button with id = %d doesn't exist or has incorrect topin value (%d)!\n", id, PinsConf[id].topin);
		}
	} else if (strcmp(command, "switch") == 0) {
		if (PinsConf[id].topin == 3) { // SWITCH
			const char *onoff_part = strstr(command_start, "onoff=");
			if (onoff_part) {
				int value;
				if (sscanf(onoff_part + 6, "%d", &value) == 1) {
					if (value == 0 || value == 1) {
						processPins(id, value);
						PinsConf[id].onoff = value;
						printf("Switch %d set to %d by mqtt!\n", id, value);
					} else {
						printf("Invalid onoff value for switch: %d\n", value);
					}
				} else {
					printf("Invalid onoff format in payload\n");
				}
			} else {
				printf("No onoff value found in payload\n");
			}
		} else {
			printf("Error, switch with id = %d doesn't exist or has incorrect topin value (%d)!\n", id, PinsConf[id].topin);
		}
	} else if (strcmp(command, "pwm") == 0) {
		if (PinsConf[id].topin == 5) { // PWM
			const char *dvalue_part = strstr(command_start, "dvalue=");
			if (dvalue_part) {
				int value;
				if (sscanf(dvalue_part + 7, "%d", &value) == 1) {
					PinsConf[id].pwmmax = 100;
					if (value >= 0 && value <= PinsConf[id].pwmmax) {
						PinsConf[id].dvalue = value;
						processPins(id, value);
						printf("PWM %d set to %d by mqtt!\n", id, value);
					} else {
						printf("Invalid dvalue for PWM: %d\n", value);
					}
				} else {
					printf("Invalid dvalue format in payload\n");
				}
			} else {
				printf("No dvalue found in payload\n");
			}
		} else {
			printf("Error, pwm with id = %d doesn't exist or has incorrect topin value (%d)!\n", id, PinsConf[id].topin);
		}
	} else {
		printf("Unsupported command: %s\n", command);
	}
}

void action_handler(uint8_t button_id, const char* action_str, const char* press_type) {
//    printf("Processing %s for DEVICE %d, actions: %s\n", press_type, button_id, action_str);
    if (action_str == NULL || strlen(action_str) == 0 || strcmp(action_str, "None") == 0) {
//        printf("No actions defined for this button or 'None' specified.\n");
        return;
    }
    char* str = strdup(action_str);
    if (str == NULL) {
        printf("Failed to allocate memory for string duplication.\n");
        return;
    }
//    printf("Duplicated string: %s\n", str);
    char* token = strtok(str, ",");
    while (token != NULL) {
//        printf("Current token: %s\n", token);
        int id;
        int action;
        int result = sscanf(token, "%d:%d", &id, &action);
//        printf("sscanf result: %d\n", result);
        if (result == 2) {
//            printf("Parsed action: ID=%d, Action=%d\n", id, action);
            switch (action) {
                case 0:
//                    printf("Sending OFF command for ID %d\n", id);
                    data_pin.id = id;
                    data_pin.action = 0;
                    if (xQueueSend(outputQueueHandle, (void*)&data_pin, 0) != pdPASS) {
                        printf("Failed to send OFF command to queue\n");
                    }
                    break;
                case 1:
//                    printf("Sending ON command for ID %d\n", id);
                    data_pin.id = id;
                    data_pin.action = 1;
                    if (xQueueSend(outputQueueHandle, (void*)&data_pin, 0) != pdPASS) {
                        printf("Failed to send ON command to queue\n");
                    }
                    break;
                case 2:
//                    printf("Sending TOGGLE command for ID %d\n", id);
                    data_pin.id = id;
                    data_pin.action = 2;
                    if (xQueueSend(outputQueueHandle, (void*)&data_pin, 0) != pdPASS) {
                        printf("Failed to send TOGGLE command to queue\n");
                    }
                    break;
                default:
                    printf("Unknown action %d for ID %d\n", action, id);
                    break;
            }
        } else {
            printf("Failed to parse token: %s (expected format: %%d:%%d)\n", token);
        }
        token = strtok(NULL, ",");
    }
    free(str);
//    printf("Finished processing %s actions for button %d\n", press_type, button_id);
}
/****************************** Sunrise/Sunset *******************************/
void safe_split(const char* input, char* first_part, char* second_part, char delimiter) {
    const char* delim_pos = strchr(input, delimiter);
    if (delim_pos) {
        size_t first_part_len = delim_pos - input;
        strncpy(first_part, input, first_part_len);
        first_part[first_part_len] = '\0';
        strcpy(second_part, delim_pos + 1);
    } else {
        strcpy(first_part, input);
        second_part[0] = '\0';
    }
}

time_t parse_time(const char *time_str) {
    struct tm time_components = *timez;
    sscanf(time_str, "%d:%d", &time_components.tm_hour, &time_components.tm_min);
    time_components.tm_sec = 0;
    return mktime(&time_components);
}

void execute_actions(const char* actions, const char* event_type, const char* current_time_str) {
    action_handler(0, actions, event_type); // Первый аргумент 0, поскольку это не имеет значения для действий sunrise/sunset
}

void Check_SunriseSunset_Actions() {
//    printf("DEBUG: Input timez: %02d:%02d:%02d\n", timez->tm_hour, timez->tm_min, timez->tm_sec);
    time_t curtime = mktime(timez);
    time_t srisetime = parse_time(SetSettings.sunrise);
    time_t ssettime = parse_time(SetSettings.sunset);
    char timestr[9];
    strftime(timestr, sizeof(timestr), "%H:%M:%S", timez);
//    printf("Current time: %s\n", timestr);
    // Сброс флагов в начале нового дня
    if (curtime - lastchk >= 86400) { // 86400 seconds in a day
        srise_ok = false;
        sset_ok = false;
//        printf("DEBUG: Reset daily flags\n");
    }
    lastchk = curtime;
    if (SetSettings.onsunrise && !srise_ok) {
        char offstr[20], acts[100];
        safe_split(SetSettings.srise_pins, offstr, acts, '/');
        if (offstr[0] != '\0' && acts[0] != '\0') {
            int offset = atoi(offstr);
            time_t tgttime = srisetime + offset;
            char tgtstr[9];
            strftime(tgtstr, sizeof(tgtstr), "%H:%M:%S", localtime(&tgttime));
//            printf("SUNRISE + offset: %s to execute actions: %s\n", tgtstr, acts);
            if (curtime >= tgttime && curtime - tgttime < 300) {
                execute_actions(acts, "Sunrise", timestr);
                srise_ok = true;
                printf("DEBUG: Executed sunrise actions \r\n");
            }
        } else {
            printf("Invalid sunrise settings \r\n");
        }
    } else if (!SetSettings.onsunrise) {
        printf("DEBUG: Sunrise actions are disabled \r\n");
    }
    if (SetSettings.onsunset && !sset_ok) {
        char offstr[20], acts[100];
        safe_split(SetSettings.sset_pins, offstr, acts, '/');
        if (offstr[0] != '\0' && acts[0] != '\0') {
            int offset = atoi(offstr);
            time_t tgttime = ssettime + offset;
            char tgtstr[9];
            strftime(tgtstr, sizeof(tgtstr), "%H:%M:%S", localtime(&tgttime));
//            printf("SUNSET + offset: %s to execute actions: %s\n", tgtstr, acts);
            if (curtime >= tgttime && curtime - tgttime < 300) {
                execute_actions(acts, "Sunset", timestr);
                sset_ok = true;
                printf("DEBUG: Executed sunset actions \r\n");
            }
        } else {
            printf("Invalid sunset settings \r\n");
        }
    } else if (!SetSettings.onsunset) {
        printf("DEBUG: Sunset actions are disabled \r\n");
    }
}
void processPins(uint8_t i, uint8_t action) { // TODO Будет время откажись от этой логики и от process_actions() в пользу action_handler()!!!
//	printf("processPins called with i=%d, action=%d\r\n", i, action);
	for (uint8_t a = 0; a < NUMPINLINKS; a++) {
		if (PinsLinks[a].idin == i) {
			data_pin.id = PinsLinks[a].idout;  // ID устройства (пина)
			data_pin.action = action;  // Действие (0, 1, 2)
			data_pin.cntrlid = i;  // ID переключателя (в данном случае совпадает с ID пина)
//			printf("Sending to queue: id=%d, action=%d, cntrlid=%d\r\n", data_pin.id, data_pin.action, data_pin.cntrlid);
			if (xQueueSend(outputQueueHandle, (void*)&data_pin, 0) == pdPASS) {
//				printf("Successfully sent to queue\r\n");
			} else {
				printf("Failed to send to queue\r\n");
			}
		}
	}
}

void gen_monitoring_json(const struct dbPinsInfo *pins_info, struct dbPinsConf *pins_conf, uint8_t num_pins, char *buffer, int buffer_size)
 {
//	printf("\nDebug at start of JSON generation:\n");
//	    for(int i = 0; i < num_pins; i++) {
//	        if(pins_conf[i].topin == 10) {
//	            printf("Pin %d send_sms content:\n", i);
//	            printf("  Value: '%s'\n", pins_conf[i].send_sms);
//	            printf("  Bytes: ");
//	            for(int j = 0; j < sizeof(pins_conf[i].send_sms); j++) {
//	                printf("%d ", (int)pins_conf[i].send_sms[j]);
//	            }
//	            printf("\n");
//	        }
//	    }

    int offset = 0;
    int first_pin = 1; // Флаг для определения первого элемента

    // Начало JSON
    offset += snprintf(buffer + offset, buffer_size - offset, "{\"lang\":\"%s\",\"pins\":[", SetSettings.lang);

    // Перебор всех пинов
    for (int i = 0; i < num_pins && offset < buffer_size; i++) {
        if (pins_conf[i].topin == 10) { // Проверка на SECURITY
            // Добавляем запятую между элементами
            if (!first_pin) {
                offset += snprintf(buffer + offset, buffer_size - offset, ",");
            } else {
                first_pin = 0;
            }
            // Если action и send_sms пусты то в json пропишем 'None'/'NO'
            const char *action = (pins_conf[i].sclick[0] == '\0') ? "None" : pins_conf[i].sclick; //Проверка на пустоту

//            printf("Debug before check (i=%d):\n", i);
//            printf("  send_sms value: '%s'\n", pins_conf[i].send_sms);
//            printf("  send_sms length: %zu\n", strlen(pins_conf[i].send_sms));
//            printf("  First 5 chars codes: %d %d %d %d %d\n",
//                (int)pins_conf[i].send_sms[0],
//                (int)pins_conf[i].send_sms[1],
//                (int)pins_conf[i].send_sms[2],
//                (int)pins_conf[i].send_sms[3],
//                (int)pins_conf[i].send_sms[4]);
            const char *send_sms = (pins_conf[i].send_sms[0] == '\0') ? "NO" : pins_conf[i].send_sms; //Проверка на пустоту
            // Формируем JSON для каждого пина типа MONITORING
            offset += snprintf(buffer + offset, buffer_size - offset,
                    "{\"topin\":%d,\"id\":%d,\"pins\":\"%s\",\"ptype\":%d,"
                    "\"action\":\"%s\",\"send_sms\":\"%s\","
                    "\"info\":\"%s\",\"onoff\":%d}",
                    pins_conf[i].topin, i,
                    pins_info[i].pins,
                    pins_conf[i].ptype,
                    action,
                    send_sms,
                    pins_conf[i].info,
                    pins_conf[i].onoff);
        }
    }
    // Закрываем JSON структуру
    if (offset < buffer_size) {
        offset += snprintf(buffer + offset, buffer_size - offset, "]}");
    }
//    printf("Generated SECURITY JSON: %s\n", buffer);
}

void handle_monitoring_get(struct mg_connection *c) {
	gen_monitoring_json(PinsInfo, PinsConf, NUMPIN, jsonbuf, BUFFER_SIZE);
  mg_http_reply(c, 200, s_json_header, "%s\n", jsonbuf);
}

void parse_monitoring_json(char *json, struct dbPinsConf *PinsConf, const struct dbPinsInfo *PinsInfo, uint8_t count) {
    cJSON *root = cJSON_Parse(json);
    if (!root) {
        printf("Error parsing JSON\n");
        return;
    }
    cJSON *id_item = cJSON_GetObjectItem(root, "id");
    if (!cJSON_IsNumber(id_item)) {
        printf("Error: 'id' is not a number or not found\n");
        cJSON_Delete(root);
        return;
    }
    int id = id_item->valueint;
    if (id < 0 || id >= count) {
        printf("button ID out of bounds %d\r\n", id);
        cJSON_Delete(root);
        return;
    }
    cJSON *ptype_item = cJSON_GetObjectItem(root, "ptype");
    if (cJSON_IsString(ptype_item)) {
        PinsConf[id].ptype = (uint8_t) atoi(ptype_item->valuestring);
    } else if (cJSON_IsNumber(ptype_item)) {
        PinsConf[id].ptype = (uint8_t) ptype_item->valueint;
    }
    cJSON *action_item = cJSON_GetObjectItem(root, "action");
    if (cJSON_IsString(action_item)) {
        strncpy(PinsConf[id].sclick, action_item->valuestring, sizeof(PinsConf[id].sclick) - 1);
        PinsConf[id].sclick[sizeof(PinsConf[id].sclick) - 1] = '\0';
    }
    cJSON *send_sms_item = cJSON_GetObjectItem(root, "send_sms");
    if (cJSON_IsString(send_sms_item)) {
        strncpy(PinsConf[id].send_sms, send_sms_item->valuestring, sizeof(PinsConf[id].send_sms) - 1);
        PinsConf[id].send_sms[sizeof(PinsConf[id].send_sms) - 1] = '\0';
    }
    cJSON *info_item = cJSON_GetObjectItem(root, "info");
    if (cJSON_IsString(info_item)) {
        strncpy(PinsConf[id].info, info_item->valuestring, sizeof(PinsConf[id].info) - 1);
        PinsConf[id].info[sizeof(PinsConf[id].info) - 1] = '\0';
    }
    cJSON *onoff_item = cJSON_GetObjectItem(root, "onoff");
    if (cJSON_IsNumber(onoff_item)) {
        PinsConf[id].onoff = (uint8_t) onoff_item->valueint;
    }
    int usbnum = 1;
    xQueueSend(usbQueueHandle, &usbnum, 0);
//	printf("RESULT - PinsConf[id].send_sms = %s PinsConf[id].info = %s PinsConf[id].onoff = %d \r\n ", PinsConf[id].send_sms, PinsConf[id].info, PinsConf[id].onoff);

    // Send MQTT message if connected
    if ((s_conn != NULL && !s_conn->is_closing) && SetSettings.check_mqtt) {
        size_t json_len = strlen(json);
        strncpy(jsonbuf, json, json_len);
        jsonbuf[json_len] = '\0';
//        send_mqtt_message(s_conn, jsonbuf);
    } else if (s_conn == NULL || s_conn->is_closing) {
        printf("MQTT connection lost! \r\n");
    }

    cJSON_Delete(root);
}

void handle_monitoring_set(struct mg_connection *c, struct mg_http_message *hm) {
 if (hm->body.len > 0) {
//	printf("We got a monitoring JSON: %.*s\n", (int) hm->body.len, hm->body.buf);
	parse_monitoring_json(hm->body.buf, PinsConf, PinsInfo, NUMPIN);
	char response[256];// Формируем корректный JSON-ответ
	snprintf(response, sizeof(response),"{\"status\":true,\"message\":\"Received JSON data\",\"length\":%lu}",(unsigned long)hm->body.len);
	//printf("Sending response: %s\n", response);//чтобы увидеть, какой именно ответ формируется перед отправкой клиенту:
	mg_http_reply(c, 200, "Content-Type: application/json\r\n", "%s", response);// Отправляем ответ клиенту
  } else {// Обработка пустого тела запроса
	mg_http_reply(c, 400, "Content-Type: application/json\r\n","{\"status\":false,\"message\":\"Empty request body\"}");
  }
}
/****************************** OneWire *******************************/
typedef struct {
    bool hitempac;  // Флаг активности верхнего порога температуры
    bool lwtempac;  // Флаг активности нижнего порога температуры
    bool hihumact;  // Флаг активности верхнего порога влажности
    bool lwhumact;  // Флаг активности нижнего порога влажности
} sensor_state_t;

void process_actions(const char *actions) {// Будет время откажись от этой функции!!!
	printf("process_actions called with actions: %s\n", actions ? actions : "NULL");
	if (actions == NULL || strlen(actions) == 0 || strcmp(actions, "None") == 0 || strspn(actions, " \t\n\r") == strlen(actions)) {  // проверка на строку из пробельных символов
		printf("No actions to process\n");
		return;
	}
	char *str = strdup(actions);  // Создаем копию строки для безопасного разбора
	if (str == NULL) {
		printf("Failed to allocate memory for actions string\n");
		return;
	}
	data_pin_t data_pin;  // Временная структура для отправки в очередь
	char *token = strtok(str, ", "); // Разбираем строку действий по разделителю ","
	while (token != NULL) {
		uint8_t id = 0, action = 0;
		char *colon = strchr(token, ':');
//		printf("Processing token: %s\n", token);
		if (colon != NULL) {
			*colon = '\0';  // Разделяем строку на две части
			id = (uint8_t) atoi(token);
			action = (uint8_t) atoi(colon + 1);
			printf("Parsed values - id: %d, action: %d\n", id, action);
			if (action <= 2) {  // 0=OFF, 1=ON, 2=TOGGLE
				data_pin.id = id;
				data_pin.action = action;
				data_pin.cntrlid = id;
				printf("Sending to queue: id=%d, action=%d, cntrlid=%d\n", data_pin.id, data_pin.action, data_pin.cntrlid);
				if (xQueueSend(outputQueueHandle, (void*)&data_pin, 0) == pdPASS) {
					printf("Successfully sent to queue\n");
				} else {
					printf("Failed to send to queue\n");
				}
			} else {
				printf("Invalid action value: %d\n", action);
			}
		} else {
			printf("Invalid token format (missing colon): %s\n", token);
		}
		token = strtok(NULL, ", ");
	}
	free(str);
}

void check_DHT22_limits(void) {
    // Проверка DHT22 датчиков
    for (uint8_t pin = 0; pin < MAX_DHT22_P; pin++) {
        if (!dht22[pin].onoff || !dht22[pin].valid) {
            continue;
        }
        float temp = dht22[pin].temp;
        double humid = dht22[pin].humid;

        if (temp >= dht22[pin].upt) {
            if (dht22[pin].actup[0] != '\0' && !dht22[pin].upflag) {
                process_actions(dht22[pin].actup);
                dht22[pin].upflag = 1;
                dht22[pin].lowflag = 0;
                printf("DHT22 Pin %d: Temperature HIGH trigger for %s: %.4f >= %.4f\n",
                       pin, dht22[pin].info, temp, dht22[pin].upt);
            }
        }
        else if (temp <= dht22[pin].lowt) {
            if (dht22[pin].actlow[0] != '\0' && !dht22[pin].lowflag) {
                process_actions(dht22[pin].actlow);
                dht22[pin].lowflag = 1;
                dht22[pin].upflag = 0;
                printf("DHT22 Pin %d: Temperature LOW trigger for %s: %.4f <= %.4f\n",
                       pin, dht22[pin].info, temp, dht22[pin].lowt);
            }
        }

        if (humid >= dht22[pin].uph) {
            if (dht22[pin].actuh[0] != '\0' && !dht22[pin].uphflg) {
                process_actions(dht22[pin].actuh);
                dht22[pin].uphflg = 1;
                dht22[pin].lowhflg = 0;
                printf("DHT22 Pin %d: Humidity HIGH trigger for %s: %.4f >= %.4f\n",
                       pin, dht22[pin].info, humid, dht22[pin].uph);
            }
        }
        else if (humid <= dht22[pin].lowh) {
            if (dht22[pin].actlh[0] != '\0' && !dht22[pin].lowhflg) {
                process_actions(dht22[pin].actlh);
                dht22[pin].lowhflg = 1;
                dht22[pin].uphflg = 0;
                printf("DHT22 Pin %d: Humidity LOW trigger for %s: %.4f <= %.4f\n",
                       pin, dht22[pin].info, humid, dht22[pin].lowh);
            }
        }
    }
}

onewire_config_t ow_conf[MAX_DHT22_P + MAX_DS18B20_P] = {0};

void init_ds18b20(OneWire_t *OneWire, GPIO_TypeDef *OneWirePort, uint16_t OneWirePin, uint8_t *owflag, uint8_t *temp_cnt, uint8_t pin_id, uint8_t pin_index) {
	*owflag = 0;
	*temp_cnt = 0;
	uint8_t OneWireDevices;

//	printf("\r\n[DEBUG] Starting OneWire initialization for pin ID %d (index %d)...\r\n", pin_id, pin_index);
// Сразу устанавливаем флаг, так как пин уже проверен
	*owflag = 1;

	uint8_t Ds18b20TryToFind = 5;
	do {
		OneWire_Init(OneWire, OneWirePort, OneWirePin);
//		printf("[DEBUG] OneWire initialized. Searching for devices...\r\n");
		*temp_cnt = 0;
		osDelay(3000);
		OneWireDevices = OneWire_First(OneWire);

		while (OneWireDevices) {
			osDelay(100);
			(*temp_cnt)++;
			OneWire_GetFullROM(OneWire, pin_index, *temp_cnt - 1);
//			printf("[DEBUG] Found sensor %d, address: ", *temp_cnt);
//			for (int j = 0; j < 8; j++) {
//				printf("%02X ", ds18b20[pin_index].sensors[*temp_cnt - 1].addr[j]);
//			}
//			printf("\r\n");
			OneWireDevices = OneWire_Next(OneWire);
		}

		if (*temp_cnt != 0) {
			ds18b20[pin_index].numsens = *temp_cnt;  // Обновлено
//			printf("[DEBUG] Total sensors found on pin %d: %d\r\n", pin_id, *temp_cnt);
			break;
		} else {
//			printf("[DEBUG] No sensors found on pin %d, attempt %d of %d\r\n", pin_id, 5 - Ds18b20TryToFind + 1, 5);
		}
		Ds18b20TryToFind--;
	} while (Ds18b20TryToFind > 0);

	if (*temp_cnt == 0) {
		printf("[ERROR] Failed to find any sensors on pin %d!\r\n", pin_id);
		*owflag = 0;
	} else {
		for (uint8_t i = 0; i < *temp_cnt; i++) {
			osDelay(50);
//			printf("[DEBUG] Configuring sensor %d on pin %d...\r\n", i + 1, pin_id);
//			printf("[DEBUG] Sensor %d address: ", i + 1);
//			for (int j = 0; j < 8; j++) {
//				printf("%02X ", ds18b20[pin_index].sensors[i].addr[j]);  // Обновлено
//			}
//			printf("\r\n");
			DS18B20_SetResolution(OneWire, ds18b20[pin_index].sensors[i].addr,  // Обновлено
					DS18B20_Resolution_12bits);
			osDelay(50);
			DS18B20_DisableAlarmTemperature(OneWire, ds18b20[pin_index].sensors[i].addr);  // Обновлено
//			printf("[DEBUG] Sensor %d on pin %d configured successfully\r\n", i + 1, pin_id);
		}
//		printf("[DEBUG] All sensors on pin %d configured\r\n", pin_id);
	}
}
void process_ds18b20(OneWire_t *OneWire, uint8_t owflag, uint8_t pin) {
    if (pin >= MAX_DS18B20_P || ds18b20[pin].numsens == 0) {
        return;
    }

    if (owflag && ds18b20[pin].onoff) {
        DS18B20_StartAll(OneWire);
        uint32_t start_time = HAL_GetTick();
        while (!DS18B20_AllDone(OneWire)) {
            osDelay(10);
            if (HAL_GetTick() - start_time > _DS18B20_CONVERT_TIMEOUT_MS) {
                printf("[ERROR] Conversion timeout on pin %s (index %d)!\r\n", ds18b20[pin].pin, pin);
                break;
            }
        }

        for (uint8_t sens = 0; sens < ds18b20[pin].numsens && sens < MAX_DS18B20_PER_PIN; sens++) {
            osDelay(5);
            float temp;
            bool valid = DS18B20_Read(OneWire, ds18b20[pin].sensors[sens].addr, &temp);

            if (valid) {
                ds18b20[pin].sensors[sens].temp = temp;
                ds18b20[pin].sensors[sens].valid = true;
                check_ds18b20_changes(pin, sens);// Проверка изменений temp для mqtt
                float upt = ds18b20[pin].sensors[sens].upt;
                float lowt = ds18b20[pin].sensors[sens].lowt;

                // Проверка верхнего предела
                if (temp >= upt) {
                    if (!ds18b20[pin].sensors[sens].upflag) {
                        ds18b20[pin].sensors[sens].upflag = 1;
                        ds18b20[pin].sensors[sens].lowflag = 0;
//                        printf("DS18B20 Pin %d, Sensor %d with address:%02X%02X%02X%02X%02X%02X%02X%02X Temperature HIGH trigger for %s: %.4f >= %.4f\n",
//                               pin, sens,
//                               ds18b20[pin].sensors[sens].addr[0],
//                               ds18b20[pin].sensors[sens].addr[1],
//                               ds18b20[pin].sensors[sens].addr[2],
//                               ds18b20[pin].sensors[sens].addr[3],
//                               ds18b20[pin].sensors[sens].addr[4],
//                               ds18b20[pin].sensors[sens].addr[5],
//                               ds18b20[pin].sensors[sens].addr[6],
//                               ds18b20[pin].sensors[sens].addr[7],
//                               ds18b20[pin].sensors[sens].info, temp, upt);

                        // Отправка в очередь при превышении верхнего предела
                        action_handler(pin, ds18b20[pin].sensors[sens].actup, "No Data!");

                        if (xQueueSend(outputQueueHandle, (void*)&data_pin, 0) == pdPASS) {
//                            printf("Successfully sent HIGH trigger to queue\n");
                        } else {
                            printf("Failed to send HIGH trigger to queue\n");
                        }
                    }
                }
                // Сброс верхнего флага при достижении нижнего предела T
                else if (temp < lowt) {
                    ds18b20[pin].sensors[sens].upflag = 0;
                }

                // Проверка нижнего предела
                if (temp <= lowt) {
                    if (!ds18b20[pin].sensors[sens].lowflag) {
                        ds18b20[pin].sensors[sens].lowflag = 1;
                        ds18b20[pin].sensors[sens].upflag = 0;
                        printf("DS18B20 Pin %d, Sensor %d with address:%02X%02X%02X%02X%02X%02X%02X%02X Temperature LOW trigger for %s: %.4f <= %.4f\n",
                               pin, sens,
                               ds18b20[pin].sensors[sens].addr[0],
                               ds18b20[pin].sensors[sens].addr[1],
                               ds18b20[pin].sensors[sens].addr[2],
                               ds18b20[pin].sensors[sens].addr[3],
                               ds18b20[pin].sensors[sens].addr[4],
                               ds18b20[pin].sensors[sens].addr[5],
                               ds18b20[pin].sensors[sens].addr[6],
                               ds18b20[pin].sensors[sens].addr[7],
                               ds18b20[pin].sensors[sens].info, temp, lowt);

                        // Отправка в очередь при достижении нижнего предела
                        action_handler(pin, ds18b20[pin].sensors[sens].actlow, "No Data!");

                        if (xQueueSend(outputQueueHandle, (void*)&data_pin, 0) == pdPASS) {
//                            printf("Successfully sent LOW trigger to queue\n");
                        } else {
                            printf("Failed to send LOW trigger to queue\n");
                        }
                    }
                }
                // Сброс нижнего флага при достижении верхнего предела T
                else if (temp > upt) {
                    ds18b20[pin].sensors[sens].lowflag = 0;
                }
            } else {
                ds18b20[pin].sensors[sens].valid = false;
                if (!ds18b20[pin].sensors[sens].errorflg) {
                    printf("[ERROR] Failed to read sensor %d on pin %s! Status: valid=%d\r\n", sens + 1, ds18b20[pin].pin, valid);
                    ds18b20[pin].sensors[sens].errorflg = true;
                }
            }
        }
        osDelay(1);
    }
}

void print_all_sensors_data(void) {
    bool has_sens = false;

    // Обработка DS18B20 датчиков
    for (uint8_t pin = 0; pin < MAX_DS18B20_P; pin++) {
        if (!ds18b20[pin].onoff) {
            continue;  // Пропускаем неактивные пины
        }

        if (ds18b20[pin].numsens > 0) {
            has_sens = true;
            printf("\r\nDS18B20 Pin[%s] sensors:\r\n", ds18b20[pin].pin);

            for (uint8_t i = 0; i < ds18b20[pin].numsens && i < MAX_DS18B20_PER_PIN; i++) {
                if (ds18b20[pin].sensors[i].valid) {
                	printf("ROM:%02X%02X%02X%02X%02X%02X%02X%02X Sensor[%d] temp = %.5f Limits: %.2f to %.2f C Info:", ds18b20[pin].sensors[i].addr[0], ds18b20[pin].sensors[i].addr[1], ds18b20[pin].sensors[i].addr[2], ds18b20[pin].sensors[i].addr[3], ds18b20[pin].sensors[i].addr[4], ds18b20[pin].sensors[i].addr[5], ds18b20[pin].sensors[i].addr[6], ds18b20[pin].sensors[i].addr[7], i, ds18b20[pin].sensors[i].temp, ds18b20[pin].sensors[i].lowt, ds18b20[pin].sensors[i].upt);
                    if (ds18b20[pin].sensors[i].info[0] != '\0') {
                        printf("%s\r\n", ds18b20[pin].sensors[i].info);
                    }
                } else {
                    printf("  Sensor[%d] = ERROR (invalid reading)\r\n", i);
                }
            }
        }
    }

    // Обработка DHT22 датчиков
    for (uint8_t pin = 0; pin < MAX_DHT22_P; pin++) {
        if (!dht22[pin].onoff) {
            continue;  // Пропускаем неактивные пины
        }

        has_sens = true;
        printf("\r\nDHT22 Pin[%s] sensor:\r\n", dht22[pin].pin);

        if (dht22[pin].valid) {
            printf("  Temperature = %.5f C, Humidity = %.5f%%\r\n",
                   dht22[pin].temp,
                   dht22[pin].humid);

            // Вывод информации о пределах
            printf("    Temperature limits: %.2f to %.2f C\r\n",
                   dht22[pin].lowt,
                   dht22[pin].upt);
            printf("    Humidity limits: %.2f to %.2f %%\r\n",
                   dht22[pin].lowh,
                   dht22[pin].uph);
            if (dht22[pin].info[0] != '\0') {
                printf("    Info: %s\r\n", dht22[pin].info);
            }
        } else {
            printf("  Sensor = ERROR (invalid reading)\r\n");
        }
    }

    if (!has_sens) {
        printf("\r\nNo active sensors found!\r\n");
    }
    printf("\r\n");
}

void DWT_Init(void)
{
    // Включаем счетчик циклов DWT
    CoreDebug->DEMCR |= CoreDebug_DEMCR_TRCENA_Msk; // Включаем модуль ядра Cortex-M7, который включает счетчик циклов DWT.
    DWT->LAR = 0xC5ACCE55;
    DWT->CYCCNT = 0;
    DWT->CTRL |= DWT_CTRL_CYCCNTENA_Msk;
}

void delay_us(uint32_t us)
{
    uint32_t start = DWT->CYCCNT;
    uint32_t end = start + (us * (SystemCoreClock / 1000000));
    while (DWT->CYCCNT < end);
}
/********************** END  DWT ****************************/
// Функция для конвертации строки пина в GPIO_PIN_x
uint16_t get_gpio_pin_number(const char* pin_str) {
    // Ожидаем формат "PCx" где x - номер пина
    if (strlen(pin_str) < 3) return 0;

    int pin_num = atoi(&pin_str[2]); // Получаем число после PC
    return GPIO_PIN_0 << pin_num;    // Преобразуем в GPIO_PIN_x
}

// Функция для получения GPIO порта из строки
GPIO_TypeDef* get_gpio_port(const char* pin_str) {
    if (strlen(pin_str) < 2) return NULL;

    switch (pin_str[1]) {
        case 'A': return GPIOA;
        case 'B': return GPIOB;
        case 'C': return GPIOC;
        case 'D': return GPIOD;
        case 'E': return GPIOE;
        case 'F': return GPIOF;
        default: return NULL;
    }
}


const char* get_gpio_pin_name(uint16_t pin, GPIO_TypeDef* port, uint8_t index) {
    static char pin_name[16];
    uint8_t pin_number = 0;
    uint16_t temp = pin;
    while (temp > 1) {
        temp = temp >> 1;
        pin_number++;
    }
    snprintf(pin_name, sizeof(pin_name), "GPIO_PIN_%d", pin_number);

    printf("Initializing DHT22 sensor-%d on port-%s, pin-%s\n",
           index,
           (port == GPIOA) ? "GPIOA" :
           (port == GPIOB) ? "GPIOB" :
           (port == GPIOC) ? "GPIOC" :
           (port == GPIOD) ? "GPIOD" :
           (port == GPIOE) ? "GPIOE" :
           (port == GPIOF) ? "GPIOF" : "Unknown",
           pin_name);

    return pin_name;
}

void DHT22_Init(uint8_t index, uint8_t id) {
    dht22[index].id = id;
    strncpy(dht22[index].pin, PinsInfo[id].pins, sizeof(dht22[index].pin) - 1);
    dht22[index].onoff = 1;
    dht22[index].typsensr = 2; // DHT22
    dht22[index].lastread = 0;

    GPIO_TypeDef* port = PinsInfo[id].gpio_name; // GPIOF
    uint16_t pin = PinsInfo[id].hal_pin; // GPIO_PIN_6

    GPIO_InitTypeDef GPIO_InitStructPrivate = {0};
    GPIO_InitStructPrivate.Pin = pin;
    GPIO_InitStructPrivate.Mode = GPIO_MODE_OUTPUT_PP;
    GPIO_InitStructPrivate.Speed = GPIO_SPEED_FREQ_LOW;
    GPIO_InitStructPrivate.Pull = GPIO_NOPULL;
    HAL_GPIO_Init(port, &GPIO_InitStructPrivate);

    HAL_GPIO_WritePin(port, pin, GPIO_PIN_SET);
}

uint8_t DHT22_Start(uint8_t index) {
    uint8_t Response = 0;
    GPIO_TypeDef* port = get_gpio_port(dht22[index].pin);
    uint16_t pin = get_gpio_pin_number(dht22[index].pin);
//    ENTER_CRITICAL();
    GPIO_InitTypeDef GPIO_InitStructPrivate = {0};
    GPIO_InitStructPrivate.Pin = pin;
    GPIO_InitStructPrivate.Mode = GPIO_MODE_OUTPUT_PP;
    GPIO_InitStructPrivate.Speed = GPIO_SPEED_FREQ_LOW;
    GPIO_InitStructPrivate.Pull = GPIO_NOPULL;
    HAL_GPIO_Init(port, &GPIO_InitStructPrivate);

    HAL_GPIO_WritePin(port, pin, GPIO_PIN_RESET);
    delay_us(1300);
    HAL_GPIO_WritePin(port, pin, GPIO_PIN_SET);
    delay_us(30);

    GPIO_InitStructPrivate.Mode = GPIO_MODE_INPUT;
    GPIO_InitStructPrivate.Pull = GPIO_PULLUP;
    HAL_GPIO_Init(port, &GPIO_InitStructPrivate);

    delay_us(40);

    if (!HAL_GPIO_ReadPin(port, pin)) {
        delay_us(80);
        if (HAL_GPIO_ReadPin(port, pin)) Response = 1;
    }

    uint32_t timeout = DWT->CYCCNT + (100 * (SystemCoreClock / 1000000));
    while (HAL_GPIO_ReadPin(port, pin) && DWT->CYCCNT < timeout) {
    }
//    EXIT_CRITICAL();
    return Response;
}

uint8_t DHT22_Read(uint8_t index) {
    GPIO_TypeDef* port = get_gpio_port(dht22[index].pin);
    uint16_t pin = get_gpio_pin_number(dht22[index].pin);
    uint8_t data = 0;
//    ENTER_CRITICAL();
    for (uint8_t i = 0; i < 8; i++) {
        uint32_t timeout = DWT->CYCCNT + (100 * (SystemCoreClock / 1000000));
        while (!HAL_GPIO_ReadPin(port, pin) && DWT->CYCCNT < timeout);

        delay_us(40);

        if (HAL_GPIO_ReadPin(port, pin)) {
            data |= (1 << (7 - i));
            timeout = DWT->CYCCNT + (100 * (SystemCoreClock / 1000000));
            while (HAL_GPIO_ReadPin(port, pin) && DWT->CYCCNT < timeout);
        }
    }
//    EXIT_CRITICAL();
    return data;
}

void process_dht22(uint8_t indx) {
    uint32_t tnow = HAL_GetTick();
    if (tnow - dht22[indx].lastread < 500) {// Рекомендованно 2000!
        return;
    }
    dht22[indx].lastread = tnow;
//    printf("\nDHT22_%d: Starting new reading cycle...\r\n", indx);
    ENTER_CRITICAL();
    if (DHT22_Start(indx)) {
        uint8_t data[5] = {0};
        for(uint8_t i = 0; i < MAX_DHT22_P; i++) {
            data[i] = DHT22_Read(indx);
        }
        if (data[4] == ((data[0] + data[1] + data[2] + data[3]) & 0xFF)) {
            dht22[indx].humid = ((data[0] << 8) | data[1]) / 10.0;

            int16_t temp = (data[2] & 0x7F) << 8 | data[3];
            if (data[2] & 0x80) {
                temp = -temp;
            }
            dht22[indx].temp = temp / 10.0f;
            dht22[indx].valid = true;
            dht22[indx].errflag = false;
            check_dht22_changes(indx);// Проверка изменений temp для mqtt
//            printf("DHT22_%d: Valid reading - T=%.1fC, RH=%.1f%%\r\n", indx, dht22[indx].temp, dht22[indx].humid);

        } else {
            if (!dht22[indx].errflag) {
                printf("DHT22_%d: Checksum error\r\n", indx);
                dht22[indx].errflag = true;
//                printf("DHT22_%d: Checksum error\r\n", indx);
            }
            dht22[indx].valid = false;
        }
    } else {
        if (!dht22[indx].errflag) {
            dht22[indx].errflag = true;
            printf("DHT22_%d: No response detected\r\n", indx);
        }
        dht22[indx].valid = false;
    }
    EXIT_CRITICAL();
}


/**********************************************/
char* pars_temp_sensors(char *buffer, int buffer_size){
	int offset = 0;
	// Начало JSON
	offset += snprintf(jsonbuf + offset, BUFFER_SIZE - offset, "{");
	// Обработка DS18B20
	offset += snprintf(jsonbuf + offset, BUFFER_SIZE - offset, "\"ds18b20\":[");
	int first_ds = 1;
	for (uint8_t i = 0; i < MAX_DS18B20_P; i++) {
		if (ds18b20[i].typsensr == 1) {
			for (uint8_t j = 0; j < ds18b20[i].numsens; j++) {
				if (ds18b20[i].sensors[j].valid == true) {
					if (!first_ds) {
						offset += snprintf(jsonbuf + offset, BUFFER_SIZE - offset, ",");
					}
					offset += snprintf(jsonbuf + offset, BUFFER_SIZE - offset, "{\"addr\":\"%02X%02X%02X%02X%02X%02X%02X%02X\",\"temp\":%.2f}", ds18b20[i].sensors[j].addr[0], ds18b20[i].sensors[j].addr[1], ds18b20[i].sensors[j].addr[2], ds18b20[i].sensors[j].addr[3],
							ds18b20[i].sensors[j].addr[4], ds18b20[i].sensors[j].addr[5], ds18b20[i].sensors[j].addr[6], ds18b20[i].sensors[j].addr[7], ds18b20[i].sensors[j].temp);
					first_ds = 0;
				}
			}
		}
	}
	offset += snprintf(jsonbuf + offset, BUFFER_SIZE - offset, "],");
	// Обработка DHT22
	offset += snprintf(jsonbuf + offset, BUFFER_SIZE - offset, "\"dht22\":[");
	int first_dht = 1;
	for (uint8_t i = 0; i < MAX_DHT22_P; i++) {
		if (dht22[i].typsensr == 2 && dht22[i].valid == true) {
			if (!first_dht) {
				offset += snprintf(jsonbuf + offset, BUFFER_SIZE - offset, ",");
			}
			offset += snprintf(jsonbuf + offset, BUFFER_SIZE - offset, "{\"id\":%d,\"temp\":%.2f,\"humidity\":%.2f}", dht22[i].id, dht22[i].temp, dht22[i].humid);
			first_dht = 0;
		}
	}
	offset += snprintf(jsonbuf + offset, BUFFER_SIZE - offset, "]}");
//	printf("%s\n", jsonbuf);
	return jsonbuf;
}
/******************** Moon **************************/
// Optimized Julian Date calculation
double calculateJulianDate(DateTime dt) {
  int32_t y = dt.year;
  int32_t m = dt.month;
  if (m <= 2) {
    y--;
    m += 12;
  }

  int32_t a = y / 100;
  int32_t b = 2 - a + (a / 4);

  double jd = (int32_t)(365.25 * (y + 4716))
    + (int32_t)(30.6001 * (m + 1))
    + dt.day + b - 1524.5;

  jd += dt.hour / 24.0 + dt.minute / 1440.0 + dt.second / 86400.0;
  return jd;
}

double calculateNextFullMoon(double jd) {
    double k = floor((jd - 2451550.09766) / 29.530588861);
    double T, T2, T3, T4;
    double E, M, Ms, F;
    double W1, W2;
    double jde;

    k = k - 0.5;

    do {
        k++;
        // Увеличена точность расчета T
        T = k / 1236.85;
        T2 = T * T;
        T3 = T2 * T;
        T4 = T3 * T;

        // Уточненные коэффициенты
        jde = 2451550.09765 + k * 29.530588861
            + 0.000154374 * T2
            - 0.000000150 * T3
            + 0.000000000730 * T4;

        // Учет периодических возмущений с повышенной точностью
        E = 1.0 - 0.002516 * T - 0.0000074 * T2;
        M = RAD * fmod(2.5534 + 29.10535669 * k - 0.0000014 * T2 - 0.00000011 * T3, 360.0);
        Ms = RAD * fmod(201.5643 + 385.81693528 * k + 0.0107582 * T2 + 0.00001238 * T3 - 0.000000058 * T4, 360.0);
        F = RAD * fmod(160.7108 + 390.67050274 * k - 0.0016118 * T2 - 0.00000227 * T3 + 0.000000011 * T4, 360.0);

        // Уточненные коэффициенты периодических возмущений
        jde += -0.407020 * sin(Ms)
             + 0.172410 * E * sin(M)
             + 0.016080 * sin(2 * Ms)
             + 0.010390 * sin(2 * F)
             + 0.007390 * E * sin(Ms - M)
             - 0.005140 * E * sin(Ms + M)
             + 0.002080 * E * E * sin(2 * M)
             + 0.001900 * sin(Ms - 2 * F);  // Добавлен дополнительный член

        W1 = 0.003060 - 0.000380 * E * cos(M) + 0.000260 * cos(Ms)
           - 0.000020 * cos(Ms - M) + 0.000020 * cos(Ms + M);
        W2 = 0.004360 * sin(Ms) + 0.000250 * sin(M);

        jde += W1 * sin(F) + W2;

    } while (jde <= jd);

    return jde;
}

void calculateMoonPhase(DateTime current, DateTime *next) {
    double jdNow = calculateJulianDate(current);
    double jdNext = calculateNextFullMoon(jdNow);
    double daysUntil = jdNext - jdNow;
    (void)daysUntil; // Убираем предупреждение

    // Конвертация юлианской даты обратно в календарную
    double z = floor(jdNext + 0.5);
    double f = jdNext + 0.5 - z;

    double alpha = floor((z - 1867216.25) / 36524.25);
    double A = z + 1 + alpha - floor(alpha / 4);
    double B = A + 1524;
    double C = floor((B - 122.1) / 365.25);
    double D = floor(365.25 * C);
    double E = floor((B - D) / 30.6001);

    next->day = B - D - floor(30.6001 * E);
    next->month = (E < 14) ? E - 1 : E - 13;
    next->year = (next->month > 2) ? C - 4716 : C - 4715;

    // Расчет времени
    f *= 24;
    next->hour = floor(f);
    f = (f - next->hour) * 60;
    next->minute = floor(f);
    next->second = floor((f - next->minute) * 60);

    DateTime local = *next;// Создаем копию для local времени
    local.hour += SetSettings.timezone;// Добавляем локальное время
    if (local.hour >= 24) {
    	local.hour -= 24;
    	local.day++;
        // Здесь можно добавить обработку перехода месяца/года если нужно
    }
    int len = snprintf(SetSettings.fullmoon, sizeof(SetSettings.fullmoon), "%02d.%02d.%04d %02d:%02d", next->day, next->month, next->year, local.hour, local.minute);
    if (len < 0 || (size_t)len >= sizeof(SetSettings.fullmoon)) {
    	 printf("ERROR: len > SetSettings.fullmoon! \n");
    }
//    printf("Debug: JD Now = %.6f\n", jdNow);
//    printf("Debug: JD Next = %.6f\n", jdNext);
//    printf("Debug: Days until = %.6f\n", daysUntil);
//    printf("Next full moon GMT: %04d-%02d-%02d %02d:%02d:%02d  \r\n", next->year, next->month, next->day, next->hour, next->minute, next->second);
//    printf("Next full moon MSK: %04d-%02d-%02d %02d:%02d:%02d \r\n", local.year, local.month, local.day, local.hour, local.minute, local.second);
}

void checkPortClockStatus(GPIO_TypeDef* GPIO_Port) {
    if(GPIO_Port == GPIOA) {
        if(!(RCC->AHB1ENR & RCC_AHB1ENR_GPIOAEN)) {
            RCC->AHB1ENR |= RCC_AHB1ENR_GPIOAEN;
            printf("GPIOA: Clock was disabled. ENABLING now.\n");
        }
    }
    else if(GPIO_Port == GPIOB) {
        if(!(RCC->AHB1ENR & RCC_AHB1ENR_GPIOBEN)) {
            RCC->AHB1ENR |= RCC_AHB1ENR_GPIOBEN;
            printf("GPIOB: Clock was disabled. ENABLING now.\n");
        }
    }
    else if(GPIO_Port == GPIOC) {
        if(!(RCC->AHB1ENR & RCC_AHB1ENR_GPIOCEN)) {
            RCC->AHB1ENR |= RCC_AHB1ENR_GPIOCEN;
            printf("GPIOC: Clock was disabled. ENABLING now.\n");
        }
    }
    else if(GPIO_Port == GPIOD) {
        if(!(RCC->AHB1ENR & RCC_AHB1ENR_GPIODEN)) {
            RCC->AHB1ENR |= RCC_AHB1ENR_GPIODEN;
            printf("GPIOD: Clock was disabled. ENABLING now.\n");
        }
    }
    else if(GPIO_Port == GPIOE) {
        if(!(RCC->AHB1ENR & RCC_AHB1ENR_GPIOEEN)) {
            RCC->AHB1ENR |= RCC_AHB1ENR_GPIOEEN;
            printf("GPIOE: Clock was disabled. ENABLING now.\n");
        }
    }
    else if(GPIO_Port == GPIOF) {
        if(!(RCC->AHB1ENR & RCC_AHB1ENR_GPIOFEN)) {
            RCC->AHB1ENR |= RCC_AHB1ENR_GPIOFEN;
            printf("GPIOF: Clock was disabled. ENABLING now.\n");
        }
    }
    else if(GPIO_Port == GPIOG) {
        if(!(RCC->AHB1ENR & RCC_AHB1ENR_GPIOGEN)) {
            RCC->AHB1ENR |= RCC_AHB1ENR_GPIOGEN;
            printf("GPIOG: Clock was disabled. ENABLING now.\n");
        }
    }
}

void send_sms(int index) {
    char index_str[4];
    snprintf(index_str, sizeof(index_str), "%03d", index);

        // Блок обработки специальных кодов
        if (index == SMS_ENABLE_CODE || (index == SMS_DISABLE_CODE)) {

        char message[GSM_RX_BUFFER_SIZE];
        snprintf(message, GSM_RX_BUFFER_SIZE, index == SMS_ENABLE_CODE ?  "ALL SMS notifications are switched ON!" : "ALL SMS notifications are switched OFF!");

        osDelay(1000);
        // Устанавливаем формат номера
        HAL_UART_Transmit(GSM, (uint8_t*) "AT+CSCS=\"GSM\"\r\n", strlen("AT+CSCS=\"GSM\"\r\n"), 1000);
        osDelay(100);
        // Устанавливаем текстовый режим
        HAL_UART_Transmit(GSM, (uint8_t*) "AT+CMGF=1\r\n", strlen("AT+CMGF=1\r\n"), 1000);
        osDelay(100);
        // Устанавливаем ID отправителя
        char clip[64];
        snprintf(clip, sizeof(clip), "AT+CLIP=\"%s\"\r\n", SetSettings.tel);
        HAL_UART_Transmit(GSM, (uint8_t*) clip, strlen(clip), 1000);
        osDelay(100);
        // Указываем номер получателя
        char str[GSM_RX_BUFFER_SIZE];
        snprintf(str, GSM_RX_BUFFER_SIZE, "AT+CMGS=\"%s\"\r\n", SetSettings.tel);
        HAL_UART_Transmit(GSM, (uint8_t*) str, strlen(str), 1000);
        osDelay(100);
        // Отправляем текст сообщения
        HAL_UART_Transmit(GSM, (uint8_t*)message, strlen(message), 1000);
        osDelay(100);
        // Завершаем отправку SMS
        uint8_t ctrlZ = 26;
        HAL_UART_Transmit(GSM, &ctrlZ, 1, 1000);
        return;
    }

    // Regular SMS handling
    if (PinsConf[1].onoff == 1 && strcmp(PinsConf[index].send_sms, "YES") == 0) {
        osDelay(1000);
        // Устанавливаем формат номера
        HAL_UART_Transmit(GSM, (uint8_t*) "AT+CSCS=\"GSM\"\r\n", strlen("AT+CSCS=\"GSM\"\r\n"), 1000);
        osDelay(100);
        // Устанавливаем текстовый режим
        HAL_UART_Transmit(GSM, (uint8_t*) "AT+CMGF=1\r\n", strlen("AT+CMGF=1\r\n"), 1000);
        osDelay(100);
        // Устанавливаем ID отправителя (ваш номер)
        char clip[64];
        snprintf(clip, sizeof(clip), "AT+CLIP=\"%s\"\r\n", SetSettings.tel);
        HAL_UART_Transmit(GSM, (uint8_t*) clip, strlen(clip), 1000);
        osDelay(100);
        // Отправляем SMS
        char str[GSM_RX_BUFFER_SIZE];
        snprintf(str, GSM_RX_BUFFER_SIZE, "AT+CMGS=\"%s\"\r\n", SetSettings.tel);
        HAL_UART_Transmit(GSM, (uint8_t*) str, strlen(str), 1000);
        osDelay(100);
        // Формируем новое сообщение в формате "ALARM:%d:%d:%s"
        char message[GSM_RX_BUFFER_SIZE];
        snprintf(message, GSM_RX_BUFFER_SIZE, "ALARM:ID=%d:%s", index, PinsConf[index].info);
        HAL_UART_Transmit(GSM, (uint8_t*)message, strlen(message), 1000);
        osDelay(100);
        uint8_t ctrlZ = 26;
        HAL_UART_Transmit(GSM, &ctrlZ, 1, 1000);
    }
}

/******************** Send data via MQTT **************************/
typedef struct {
    uint8_t changes[BYTES_FOR_BITS(MAX_DHT22_P)]; // 89 датчиков = 89 бит ≈ 12 байт
} dht22_changes_t;// Для отслеживания изменений температур dht22

typedef struct {
    uint8_t  changes[MAX_DS18B20_P][BYTES_FOR_BITS(MAX_DS18B20_PER_PIN)]; // 89 пинов × 256 датчиков = 22784 бит
} ds18b20_changes_t;// Для отслеживания изменений температур ds18b20

dht22_changes_t dht22_changes;
ds18b20_changes_t ds18b20_changes;

void check_dht22_changes(uint8_t sensor_id) { // Функция проверки изменений для DHT22
	if (sensor_id >= MAX_DHT22_P) {  // Защита от выхода за границы
		return;
	}
	if (dht22[sensor_id].temp != dht22[sensor_id].prevtemp
			|| dht22[sensor_id].humid != dht22[sensor_id].prvhumid) {
		dht22_changes.changes[sensor_id / 8] |= (1 << (sensor_id % 8));
	}
}
// Функция проверки изменений для DS18B20
void check_ds18b20_changes(uint8_t pin_id, uint8_t sensor_id) {
    if (ds18b20[pin_id].sensors[sensor_id].temp != ds18b20[pin_id].sensors[sensor_id].prevtemp) {
        ds18b20_changes.changes[pin_id][sensor_id / 8] |= (1 << (sensor_id % 8));// Устанавливаем бит изменения
    }
}
// Функция публикации изменений DHT22
void publish_dht22_changes(struct mg_connection *conn) {
    if (!conn) return;
    char payload[150];

    for (uint8_t i = 0; i < NUMPIN; i++) {
        if (PinsConf[i].topin == 4) {
            for (uint8_t j = 0; j < MAX_DHT22_P; j++) {
                if (dht22[j].id == i && dht22[j].typsensr == 2) {
                    uint8_t byte_index = j / 8;
                    uint8_t bit_index = j % 8;

                    if (dht22_changes.changes[byte_index] & (1 << bit_index)) {
                        if (dht22[j].onoff && dht22[j].valid) {
                            snprintf(payload, sizeof(payload), "dht22/ID=%d/temp=%.3f,hum=%.1f", i, dht22[j].temp, dht22[j].humid);
                            send_mqtt_message(conn,"/dht22/", payload);
                            dht22[j].prevtemp = dht22[j].temp;
                            dht22[j].prvhumid = dht22[j].humid;
                        }
                        dht22_changes.changes[byte_index] &= ~(1 << bit_index);
                    }
                    break;
                }
            }
        }
    }
}

// Функция публикации изменений DS18B20
void publish_ds18b20_changes(struct mg_connection *conn) {
    char payload[150];
    char addr_str[17];  // Для 8 байт нужно 16 символов HEX + завершающий нуль

    for (uint8_t pin = 0; pin < MAX_DS18B20_P; pin++) {
        if (ds18b20[pin].onoff) {
            for (uint8_t sensor = 0; sensor < ds18b20[pin].numsens; sensor++) {
                if (ds18b20_changes.changes[pin][sensor / 8] & (1 << (sensor % 8))) {
                    if (ds18b20[pin].sensors[sensor].valid) {
                        snprintf(addr_str, sizeof(addr_str),
                                "%02x%02x%02x%02x%02x%02x%02x%02x",
                                ds18b20[pin].sensors[sensor].addr[0],
                                ds18b20[pin].sensors[sensor].addr[1],
                                ds18b20[pin].sensors[sensor].addr[2],
                                ds18b20[pin].sensors[sensor].addr[3],
                                ds18b20[pin].sensors[sensor].addr[4],
                                ds18b20[pin].sensors[sensor].addr[5],
                                ds18b20[pin].sensors[sensor].addr[6],
                                ds18b20[pin].sensors[sensor].addr[7]);

                        snprintf(payload, sizeof(payload), "ds18b20/ID=%d/sn:%s/temp=%.2f", pin, addr_str, ds18b20[pin].sensors[sensor].temp);
                        send_mqtt_message(conn,"/ds18b20/", payload);
                        ds18b20[pin].sensors[sensor].prevtemp = ds18b20[pin].sensors[sensor].temp;
                    }
                    ds18b20_changes.changes[pin][sensor / 8] &= ~(1 << (sensor % 8));
                }
            }
        }
    }
}

/*********************** OFFLINE TIME *******************************/
uint8_t onlineFlg = 0;  // Флаг онлайн статуса
lwdtc_cron_ctx_t offlineTime;

static uint8_t getBitValue(const uint8_t* array, uint8_t arraySize) {
    for (uint8_t byte = 0; byte < arraySize; byte++) {
        if (array[byte] == 0) continue;

        for (uint8_t bit = 0; bit < 8; bit++) {
            if (array[byte] & (1 << bit)) {
                return byte * 8 + bit;
            }
        }
    }
    return 0;
}

static void setBitInArray(uint8_t* array, uint8_t arraySize, uint8_t value) {
    if (value >= arraySize * 8) return;
    uint8_t byteIndex = value / 8;
    uint8_t bitIndex = value % 8;
    if (byteIndex < arraySize) {
        array[byteIndex] |= (1 << bitIndex);
    }
}

void init_offline_time(void) {
    memset(&offlineTime, 0, sizeof(lwdtc_cron_ctx_t));
    offlineTime.flags = 0;

    setBitInArray(offlineTime.sec, sizeof(offlineTime.sec), SetSettings.sec % 60);
    setBitInArray(offlineTime.min, sizeof(offlineTime.min), SetSettings.min % 60);
    setBitInArray(offlineTime.hour, sizeof(offlineTime.hour), SetSettings.hour % 24);
    setBitInArray(offlineTime.mday, sizeof(offlineTime.mday), SetSettings.mday - 1);
    setBitInArray(offlineTime.mon, sizeof(offlineTime.mon), SetSettings.mon);
    setBitInArray(offlineTime.year, sizeof(offlineTime.year), SetSettings.year);
}

struct tm convert_cron_to_tm(const lwdtc_cron_ctx_t *cron_time) {
    struct tm timeinfo = {0};
    // Конвертируем значения из битовых полей в обычные числа
    timeinfo.tm_sec = getBitValue(cron_time->sec, sizeof(cron_time->sec));
    timeinfo.tm_min = getBitValue(cron_time->min, sizeof(cron_time->min));
    timeinfo.tm_hour = getBitValue(cron_time->hour, sizeof(cron_time->hour));
    timeinfo.tm_mday = getBitValue(cron_time->mday, sizeof(cron_time->mday)) + 1;  // 0-30 -> 1-31
    timeinfo.tm_mon = getBitValue(cron_time->mon, sizeof(cron_time->mon)) - 1;  // Корректировка для соответствия tm
    timeinfo.tm_year = getBitValue(cron_time->year, sizeof(cron_time->year)) + 100;
    timeinfo.tm_isdst = -1;

    return timeinfo;
}

time_t initializeTime(void) {
    time_t timestamp;
    if (!onlineFlg) {
        struct tm timeinfo = convert_cron_to_tm(&offlineTime);
        timestamp = mktime(&timeinfo);
        s_boot_timestamp = timestamp * 1000;
        return timestamp;
    } else {
        timestamp = (time_t)(s_boot_timestamp / 1000);
    }
    return timestamp;
}
