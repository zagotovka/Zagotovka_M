/*
 * Zagotovka.h
 *
 *  Created on: Jul 15, 2024
 *      Author: denis
 */

#ifndef INC_ZAGOTOVKA_H_
#define INC_ZAGOTOVKA_H_

#include "db.h"
#include "ds18b20.h"
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include "cJSON.h"
#include "mongoose.h" // For MQTT
#include "net.h"
#include "setings.h"
#include "ds18b20Config.h"
#include "main.h"

#include "FreeRTOS.h"
#include "queue.h"

#define BUFFER_SIZE 10000 //(max Button = 9835 символов, это не точно!)
#define ENTER_CRITICAL() taskENTER_CRITICAL()
#define EXIT_CRITICAL()  taskEXIT_CRITICAL()

extern osMessageQueueId_t mqttQueueHandle;
extern osMessageQueueId_t usbQueueHandle;
extern uint8_t usbnum;
extern struct dbSettings SetSettings;

extern struct tm *timez;
extern struct dbPinsInfo PinsInfo[NUMPIN];
extern struct dbPinsConf PinsConf[NUMPIN];
extern struct dbCron dbCrontxt[MAXSIZE];
extern struct dbSettings SetSettings;
extern const char *s_json_header;
extern struct dbPinToPin PinsLinks[NUMPINLINKS];
void processPins(uint8_t i, uint8_t action);

void log_headers(const char *headers);
/******************** Zerg section ****************************/
// Статическая проверка на этапе компиляции
#define STATIC_ASSERT(COND, MSG) typedef char static_assertion_##MSG[(COND) ? 1 : -1]
#define BACKUP_OFFSET (((sizeof(HTTPSsettings) + 3) / 4) * 4) // Округление вверх до кратного 4
typedef struct __attribute__((packed)) {
    uint32_t magic;          // Магическое значение для проверки валидности
    uint32_t crc;            // Контрольная сумма
    char domain[50];
    char tls_key[512];       // Private Key
    char tls_cert[1024];     // Public Key
    char tls_ca[1024];       // Secret Key
    char telegram_token[100];
    uint16_t port;
    uint32_t timeout;
    uint8_t retry_cnt;
    uint8_t connection_mode;
    uint8_t version;    // Номер версии настроек (0-94)
    uint8_t padding[1]; // Остаток для выравнивания чтобы размер стал 2728 байт (кратен 4)
} HTTPSsettings; // ~11КБ

// Проверка, что размер структуры не превышает размер сектора (256 КБ)
STATIC_ASSERT(sizeof(HTTPSsettings) <= 256 * 1024, structure_size_exceeds_flash_sector);

// Определяем функции доступа к полям настроек
bool https_get_domain(char *domain, size_t max_len);
bool https_set_domain(const char *domain);

bool https_get_tls_key(char *key, size_t max_len);
bool https_set_tls_key(const char *key);

bool https_get_tls_cert(char *cert, size_t max_len);
bool https_set_tls_cert(const char *cert);

bool https_get_tls_ca(char *ca, size_t max_len);
bool https_set_tls_ca(const char *ca);

bool https_get_telegram_token(char *token, size_t max_len);
bool https_set_telegram_token(const char *token);

uint16_t https_get_port(void);
bool https_set_port(uint16_t port);

uint32_t https_get_timeout(void);
bool https_set_timeout(uint32_t timeout);

uint8_t https_get_retry_cnt(void);
bool https_set_retry_cnt(uint8_t retry_cnt);

uint8_t https_get_connection_mode(void);
bool https_set_connection_mode(uint8_t mode);

// Функции для работы с настройками целиком
bool is_settings_valid(const HTTPSsettings *settings);
bool initialize_https_settings(void);
bool reset_to_defaults(void);
bool backup_settings(void);
bool restore_from_backup(void);

/****************** End Zerg section **************************/

/******************** moon ****************************/
typedef struct {
    uint16_t year;
    uint8_t month;
    uint8_t day;
    uint8_t hour;
    uint8_t minute;
    uint8_t second;
} DateTime;
/******************** global_vars ****************************/
extern char s_url[50];
extern char s_pub_topic[30];
extern int s_qos;
extern struct mg_connection *s_conn;

char* get_mqtt_url(void);
char* get_mqtt_topic(void);
void set_mqtt_url(const char* url);
void set_mqtt_topic(const char* topic);

//void send_mqtt_message(struct mg_connection *conn, const char *topic, const char *msg);
void send_mqtt_message(struct mg_connection *conn, const char *topic, const char *msg);

typedef struct {
    OneWire_t OneWire;
    GPIO_TypeDef *OneWirePort;
    uint16_t OneWirePin;
    uint8_t owflag;
    uint8_t temp_cnt;
} onewire_config_t;
extern onewire_config_t ow_conf[MAX_DS18B20_P + MAX_DHT22_P];

/****************** End global_vars **************************/
void parse_onoff_json(const char *json_string, struct dbPinsConf *PinsConf, int num_pins);
void handle_onoff_set(struct mg_connection *c, struct mg_http_message *hm);

void handle_pintopin_get(struct mg_connection *c);

void handle_select_get(struct mg_connection *c);
void handle_select_set(struct mg_connection *c, struct mg_http_message *hm);
void gen_select_json(const struct dbPinsInfo *pins_info,
        const struct dbPinsConf *pins_conf, uint8_t num_pins, char *buffer,
        int buffer_size);
void parse_select_json(const char *json_string, struct dbPinsConf *PinsConf, uint8_t num_pins);

void handle_switch_get(struct mg_connection *c);
void handle_switch_set(struct mg_connection *c, struct mg_http_message *hm);
void gen_switch_json(const struct dbPinsInfo *pins_info,
		const struct dbPinsConf *pins_conf, int num_pins, char *buffer,
		int buffer_size);
void parse_switch_json(char* json, struct dbPinsConf* PinsConf, const struct dbPinsInfo* PinsInfo, int count);

void handle_button_get(struct mg_connection *c);
void handle_button_set(struct mg_connection *c, struct mg_http_message *hm);
void gen_button_json(const struct dbPinsInfo *pins_info, struct dbPinsConf *pins_conf, int num_pins, char *buffer, int buffer_size);
void parse_button_json(char* json, struct dbPinsConf* PinsConf,const struct dbPinsInfo* PinsInfo, int count);

void handle_encoder_get(struct mg_connection *c);
void handle_encoder_set(struct mg_connection *c, struct mg_http_message *hm);

void gen_encoder_json(const struct dbPinsInfo *pins_info, const struct dbPinsConf *pins_conf, uint8_t num_pins, char *buffer, int buffer_size, const struct dbPinToPin *PinsLinks, int num_pin_links);

void parse_encoder_json(const char* json, struct dbPinsConf* PinsConf, struct dbPinToPin* PinsLinks, struct dbPinsInfo* PinsInfo, uint8_t count);

void parse_relay_json(char* json_string, struct dbPinsConf* PinsConf,const struct dbPinsInfo* PinsInfo, int count);

void parse_pwm_json(char* json_string, struct dbPinsConf* PinsConf,const struct dbPinsInfo* PinsInfo, int count);

void handle_timers_get(struct mg_connection *c);
void parse_numline_json(char* json_string, struct dbSettings* SetSettings);
void handle_numline_set(struct mg_connection *c, struct mg_http_message *hm);
void handle_timers_set(struct mg_connection *c, struct mg_http_message *hm);
void gen_timer_json(const struct dbCron *dbCrontxt, int num_timers, char *buffer, int buffer_size);
void parse_timers_json(char* json_string, struct dbCron* dbCrontxt, int count);

void handle_mysett_get(struct mg_connection *c);
void handle_mysett_set(struct mg_connection *c, struct mg_http_message *hm);
void gen_mysett_json(const struct dbSettings *settings, char *buffer, int buffer_size);
void parse_mysett_json(char *json_string, struct dbSettings *settings);

void handle_connection_del(struct mg_connection *c, struct mg_http_message *hm, struct dbPinToPin PinsLinks[NUMPINLINKS]);

void api_handler(struct mg_connection *c, struct mg_http_message *hm);

void gen_onewire_json(char *buffer, int buffer_size);
bool parse_onewire_json(const char* json_string, struct dbPinsConf *PinsConf);
//void parse_onewire_json(const char *json, struct dbPinsConf *pins_conf, Ds18b20Sensor_t *tempsens, struct dbPinsInfo *PinsInfo, uint8_t num_pins);
//void parse_ow_json(const char *json, const struct dbPinsConf *pins_conf, Ds18b20Sensor_t *ds18b20, struct dbPinsInfo *PinsInfo, uint8_t count);
void handle_sensor_set(struct mg_connection *c, struct mg_http_message *hm);
bool parse_sensor_json(const char* json_string);

void handle_onewire_get(struct mg_connection *c);

//void handle_onewire_set(struct mg_connection *c, struct mg_http_message *hm);
void handle_onewire_set(struct mg_connection *c, struct mg_http_message *hm);

void parse_stm32time(char *response, size_t response_size, const struct dbSettings *settings);

void handle_stm32time_get(struct mg_connection *c, struct mg_http_message *hm);

void handle_temp_get(struct mg_connection *c);

void handle_sim800l_get(struct mg_connection *c);
int gen_sim800l_json(char *buffer, int buffer_size);
void handle_sim800l_set(struct mg_connection *c, struct mg_http_message *hm);
void parse_sim800l_json(char *buffer);

void mqtt_message_handler(const char* topic, const char* payload);

void action_handler(uint8_t button_id, const char* action_str, const char* press_type);

void handle_monitoring_get(struct mg_connection *c);
void handle_monitoring_set(struct mg_connection *c, struct mg_http_message *hm);
void gen_monitoring_json(const struct dbPinsInfo *pins_info, struct dbPinsConf *pins_conf, uint8_t num_pins, char *buffer, int buffer_size);
void parse_monitoring_json(char *json, struct dbPinsConf *PinsConf, const struct dbPinsInfo *PinsInfo, uint8_t count);

double calculateSunriseOrSunset(int isSunrise);
void Check_SunriseSunset_Actions();
void printResults();

void init_ds18b20(OneWire_t *OneWire, GPIO_TypeDef *OneWirePort, uint16_t OneWirePin, uint8_t *owflag, uint8_t *temp_cnt, uint8_t pin_id, uint8_t pin_index);
void process_ds18b20(OneWire_t *OneWire, uint8_t owflag, uint8_t pin_index);
void print_all_sensors_data(void);

void DHT22_System_Init(void);
void DHT22_Init(uint8_t index, uint8_t id);
void Set_Pin_Output(GPIO_TypeDef* port, uint16_t pin);
void Set_Pin_Input(GPIO_TypeDef* port, uint16_t pin);
void delay(uint16_t time);
uint8_t DHT22_Start(uint8_t index);
uint8_t DHT22_Check_Response(GPIO_TypeDef* port, uint16_t pin);
uint8_t DHT22_Read(uint8_t index);
void process_dht22(uint8_t index);
void check_DHT22_limits(void);

void DWT_Init(void);// delay_micros()

char* pars_temp_sensors(char *buffer, int buffer_size);
void process_actions(const char* actions);

double julianDate(int year, int month, int day, int hour, int minute, int second);
void trackFullMoon(void);
double calculateNextFullMoon(double jd);
double calculateJulianDate(DateTime dt);
void calculateMoonPhase(DateTime current, DateTime *next);

void checkPortClockStatus(GPIO_TypeDef* GPIO_Port);

void send_sms(int index);

void publish_ds18b20_changes(struct mg_connection *conn);
void publish_dht22_changes(struct mg_connection *conn);
void check_ds18b20_changes(uint8_t pin_id, uint8_t sensor_id);
void check_dht22_changes(uint8_t sensor_id);

time_t initializeTime(void);
void init_offline_time(void);

/**************************************************************************/
// Прототипы функций для обработки API (https)
struct user *authenticate(struct mg_http_message *hm);
void handle_login(struct mg_connection *c, struct user *u);
void handle_logout(struct mg_connection *c);
void handle_debug(struct mg_connection *c, struct mg_http_message *hm);
void handle_stats_get(struct mg_connection *c);
void handle_events_get(struct mg_connection *c, struct mg_http_message *hm);
void handle_settings_get(struct mg_connection *c);
void handle_settings_set(struct mg_connection *c, struct mg_str body);
void handle_firmware_upload(struct mg_connection *c, struct mg_http_message *hm);
void handle_firmware_commit(struct mg_connection *c);
void handle_firmware_rollback(struct mg_connection *c);
void handle_firmware_status(struct mg_connection *c);
void handle_device_reset(struct mg_connection *c);
void handle_device_eraselast(struct mg_connection *c);
void handle_select_get(struct mg_connection *c);
void handle_pintopin_get(struct mg_connection *c);
void handle_select_set(struct mg_connection *c, struct mg_http_message *hm);
void handle_switch_get(struct mg_connection *c);
void handle_switch_set(struct mg_connection *c, struct mg_http_message *hm);
void handle_onoff_set(struct mg_connection *c, struct mg_http_message *hm);
void handle_button_get(struct mg_connection *c);
void handle_button_set(struct mg_connection *c, struct mg_http_message *hm);
void handle_encoder_get(struct mg_connection *c);
void handle_encoder_set(struct mg_connection *c, struct mg_http_message *hm);
void handle_timers_get(struct mg_connection *c);
void handle_numline_set(struct mg_connection *c, struct mg_http_message *hm);
void handle_timers_set(struct mg_connection *c, struct mg_http_message *hm);
void handle_mysett_get(struct mg_connection *c);
void handle_mysett_set(struct mg_connection *c, struct mg_http_message *hm);
void handle_connection_del(struct mg_connection *c, struct mg_http_message *hm, struct dbPinToPin PinsLinks[NUMPINLINKS]);
void handle_stm32time_get(struct mg_connection *c, struct mg_http_message *hm);
void handle_temp_get(struct mg_connection *c);
void handle_sim800l_get(struct mg_connection *c);
void handle_sim800l_set(struct mg_connection *c, struct mg_http_message *hm);
void handle_monitoring_get(struct mg_connection *c);
void handle_monitoring_set(struct mg_connection *c, struct mg_http_message *hm);
void handle_onewire_get(struct mg_connection *c);
void handle_sensor_set(struct mg_connection *c, struct mg_http_message *hm);
void handle_onewire_set(struct mg_connection *c, struct mg_http_message *hm);
void api_handler(struct mg_connection *c, struct mg_http_message *hm);

//void setup_mqtt(struct mg_mgr *mgr, struct mg_tcpip_if *mif);

struct mg_event {
    struct mg_connection *c;
    int ev;
    void *ev_data;
    // For copied event data
    struct mg_http_message http_message;
    struct mg_mqtt_message mqtt_message;
};

extern struct mg_event event; // Было в "worker_task"

typedef struct {
    struct mg_connection *c;          // Указатель на соединение
    int ev;                           // Тип события (например, MG_EV_HTTP_MSG)
    struct mg_http_message hm;        // Данные HTTP-сообщения
} HttpEvent;

typedef struct {
    struct mg_connection *c;          // Указатель на соединение
    int ev;                           // Тип события (например, MG_EV_HTTP_MSG, MG_EV_TLS_HS)
    struct mg_http_message hm;        // Данные HTTP-сообщения (для MG_EV_HTTP_MSG)
    char error_msg[256];              // Буфер для сообщения об ошибке (для MG_EV_ERROR)
} HttpsEvent;

typedef struct {
    struct mg_connection *c;          // Указатель на соединение
    int ev;                           // Тип события (например, MG_EV_MQTT_MSG)
    struct mg_mqtt_message mm;        // Данные MQTT-сообщения
    char error_msg[256];              // Буфер для сообщения об ошибке
    int connack_status;               // Статус подключения для MG_EV_MQTT_OPEN
} MqttEvent;

/**************************************************************************/

#endif /* INC_ZAGOTOVKA_H_ */
