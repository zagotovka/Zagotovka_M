/*
 * setengs.h
 *
 *  Created on: 29 мая 2023 г.
 *      Author: anton
 */

#ifndef INC_SETINGS_H_
#define INC_SETINGS_H_

#include <stdbool.h>

void SetSettingsConfig(void);
void StartSettingsConfig(void);
void GetSettingsConfig(void);
void GetCronConfig(void);
void SetCronConfig(void);
void GetPinConfig(void);
void SetPinConfig(void);
void GetPinToPin(void);
void SetPinToPin(void);
void InitPin(void);
void InitMultibutton(void);

void GetOneWireConfig();
void SetOneWireConfig();

extern bool g_log_filter_from_file; // Флаг: log_filter_mask был прочитан из settings.ini

void GetPidConfig();
void SetPidConfig();

#define ADM_NAME "admin"
#define ADM_PASS "12345678"
#define LANG "ru"
#define TIMEZONE 0
#define CHECK_IP 1
#define CHECK_MQTT 0
#define CHECK_USEHTTPS 0
//#define IP_ADDR0 192
//#define IP_ADDR1 168
//#define IP_ADDR2 18
//#define IP_ADDR3 88
//#define SB_MASK0 255
//#define SB_MASK1 255
//#define SB_MASK2 255
//#define SB_MASK3 0
//#define GATEWAY0 192
//#define GATEWAY1 168
//#define GATEWAY2 18
//#define GATEWAY3 1
#define MQTT_PRT 1883
#define MQTT_QOS 0
#define MQTT_TPC "Zagotovka"
#define RXZBTOP "zigbee2mqtt"
// MQTT Server (встроенный брокер)
#define CHECK_MQTT_SRV 0      // по умолчанию ВЫКЛ
#define MQTT_SRV_PRT 1884     // порт сервера (не совпадать с HTTP 8000 / HTTPS 8443)
#define MQTT_SRV_MAXCLI 4     // UI-лимит клиентов; прошивка clamp до MQTT_SRV_MAX_CLIENTS_HARDCAP
#define MQTT_SRV_USR  "Yahsalta"    // дефолтный логин встроенного MQTT-брокера
#define MQTT_SRV_PSWD "Zagotovka"   // дефолтный пароль встроенного MQTT-брокера
#define SLZB_HOST     ""            // IP шлюза SLZB-06p7U для watchdog'а; пусто = watchdog выключен
//void writedatatofile(const char* json_input);

#endif /* INC_SETINGS_H_ */
