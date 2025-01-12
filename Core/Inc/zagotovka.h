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
void parse_mysett_json(char* json_string, struct dbSettings* settings);

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

#endif /* INC_ZAGOTOVKA_H_ */
