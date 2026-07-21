/*
 * db.h
 *
 *  Created on: Dec 14, 2022
 *      Author: Anton & Denis
 */

#ifndef INC_DB_H_
#define INC_DB_H_

#define NUMPIN 89 // количество пинов
#define PID_MAX_SLOTS 24 // макс. число PID-каналов
#define NUMPINLINKS 100 // количество pin to pin
#define NUMTASK 50 // кол-во CRON task

/* Zigbee cluster bitflags */
#define ZBEE_CL_ONOFF   0x01  // 0x0006
#define ZBEE_CL_DIMMER  0x02  // 0x0008
#define ZBEE_CL_COLOR   0x04  // 0x0300
#define ZBEE_CL_COVER   0x08  // 0x0102 Window Covering
#define ZBEE_CL_THERMO  0x10  // 0x0201 Thermostat
#define ZBEE_CL_LOCK    0x20  // 0x0101 Door Lock

/* Zigbee cluster fixed attributes — фиксированные атрибуты для актуаторов.
   Поле zbee_attribute для них больше не используется. */
#define ZBEE_ATTR_ONOFF   0x0000
#define ZBEE_ATTR_DIMMER  0x0000
#define ZBEE_ATTR_COLOR   0x0004
#define ZBEE_ATTR_COVER   0x0008
#define ZBEE_ATTR_THERMO  0x0000
#define ZBEE_ATTR_LOCK    0x0000

/* Пассивные кластеры (сенсоры/multi-EP — не зондируем, только слушаем) */
#define ZBEE_CLUSTER_TEMP       0x0402
#define ZBEE_CLUSTER_HUMIDITY   0x0405
#define ZBEE_CLUSTER_OCCUPANCY  0x0406
#define ZBEE_CLUSTER_MFR        0xEF00

/* Роль устройства (пассивная классификация) */
#define ZBEE_ROLE_UNKNOWN   0
#define ZBEE_ROLE_ACTUATOR  1
#define ZBEE_ROLE_SENSOR    2
#define ZBEE_ROLE_TRIGGER   3
#define ZBEE_ROLE_MFR       4
#define ZBEE_ROLE_SWITCH    5

#include "stdio.h"
#include <stdbool.h>
#include "stm32f7xx_hal.h"
#define PINPAIRS 3 // Пар {ID:Pin} для каждой кнопки

// Определение структуры для хранения пары {ID:Pin}.
typedef struct {
    uint8_t id;  // ID
    char pin[5]; // Пин (например, "PA4" + нулевой терминатор)
} PinAction;

struct dbCron {
	char cron[35];  // 30-45 30-45 1-22 15-17 5-12 1-7 23 max возможное кол-во символов.
	char activ[255];// max 534
	uint32_t ptime; // для паузы в Unix time sec.
	char info[30];
	uint8_t onoff;	// On | Off
};

struct dbPinsConf {     // Создали структуру с необходимым набором типов элиментов.
	uint8_t topin;		// Type of pins: NONE-0; BUTTON-1; DEVICE-2; SWITCH-3; ONEWIRE-4; PWM-5; I2C-6,7; Encoder-8,9; SECURITY-10; ZIGBEE-11;
	int pwm;		    // PWM frequency
	int pwmmax;         // PWM максимальное значение сейчас пока 100
	uint8_t on;			// Состояние выхода - 1-вкл, 0-выкл. К примеру 'EncoderB'.
	uint8_t istate;		// Invert state
	int dvalue;		    // Dimmer value
	uint8_t ponr;		// Power on restore
	uint8_t ptype;		// Pullup type 0 - NONE; 1 - GPIO_PULLUP; 2 - GPIO_PULLDOWN
	char sclick[125];	// SINGLE CLICK, (где 125 - 25-27 пар)
	char dclick[125];	// DOUBLE CLICK,(где 125 - 25-27 пар) где 255 это 51 пара ключ занчение (15:2).
	char lpress[125];	// LONG PRESS, (где 125 - 25-27 пар) где 255 это 51 пара ключ занчение (15:2).
	uint8_t encoderb;	// ID of "Encoder B"
	char encbpin[5];	// PIN  of "Encoder B"
	uint8_t hinter;	// Hold interval
	uint8_t repeat;	// Repeat
	uint8_t rinter;	// Repeat interval
	uint8_t dcinter;	// Double-click interval
	uint8_t pclick;	// Prevent Click
	char info[30];	    // Info
	uint8_t onoff;		// On | Off
	uint8_t event;      // Event (StateChanged - 0, Pressed -1, Released - 2, Repeat - 3, Hold - 4, LongClick - 5, Click - 6, DoubleClick - 7)
	uint8_t act;        // Action (No action - 0, On - 1,  Off - 2, Toggle - 3, Value - 4, IncValue - 5)
	short parametr;     // Parameter value for dimmer (0-255), value for IncValue (-255 to 255).
	int timeout;        // Timeout (ms)
	// === ZIGBEE v6 ===
	char     zbee_ieee[17];       // IEEE адрес, 16 + '\0' (без "0x")
	uint8_t  zbee_endpoint;       // Endpoint (1-240)
	uint16_t zbee_cluster;        // Cluster ID: 0x0006=OnOff, 0x0008=Level, 0x0300=Color
	uint16_t zbee_attribute;      // Attribute ID (16-bit): 0x0000=OnOff state
	char     zbee_label[30];      // Friendly name для UI (только для отображения)
	// === ENCODER ↔ ZIGBEE BINDING ===
	uint8_t  zbee_bind_id;        // ID привязанного Zigbee устройства (NUMPIN+zbi)
	char     send_sms[5];         // Send sms YES/NO
	uint8_t  prvstate;            // Предыдущее состояние (для edge detection)
	uint8_t  state;               // Текущее состояние пина (0/1)
};

/* ─── PID Controller ─── */

/* Тип датчика, привязанного к PID-каналу */
typedef enum {
    PID_SENS_NONE    = 0,
    PID_SENS_DS18B20 = 1,
    PID_SENS_DHT22   = 2,
} PidSensorType_e;

/* Состояние авто-тюна */
typedef enum {
    PID_TUNE_IDLE  = 0,  // ничего не делаем
    PID_TUNE_STEP  = 1,  // шаговый тест (ищем τ и K)
    PID_TUNE_BIAS  = 2,  // бинарный поиск Bias
    PID_TUNE_DONE  = 3,  // тест завершён
    PID_TUNE_ERROR = 4,  // ошибка теста
} PidTuneState_e;

typedef struct {
    /* ── Привязка ── */
    uint8_t  pwm_pin_id;           // ID пина в PinsConf[] (topin==5)
    PidSensorType_e selsens;       // тип датчика: 1=DS18B20, 2=DHT22
    uint8_t  sensor_pin_id;        // ID пина сенсора в PinsConf[] (topin==4)
    char     sernum[17];           // серийник DS18B20 (16 hex + '\0'), пусто для DHT22
    uint8_t  sensor_sub_idx;       // индекс датчика на шине DS18B20 (0-9), 0 для DHT22

    /* ── Пресет ── */
    uint8_t  preset;               // 1..9 (индекс пресета из таблицы Plan_PID)

    /* ── Уставки ── */
    float    tmpset;               // целевая температура (°C)
    float    tmpcur;               // текущая температура (°C) — runtime, не сохраняется

    /* ── PID-коэфф. (заполняются авто-тюном или вручную) ── */
    float    Kp;
    float    Ki;
    float    Kd;
    float    bias;                 // Bias (рабочая точка PWM%)

    /* ── Параметры из пресета (копируются при выборе) ── */
    uint16_t Ts_ms;                // период вызова pid_compute() (мс)
    float    lambda_factor;        // λ коэфф. (0.2..1.0) × τ
    uint8_t  pwm_start;            // PWM старт %
    uint8_t  pwm_max;              // PWM макс %
    float    temp_max;             // T макс (аварийное отключение)
    float    temp_min;             // T мин (из пресета)
    uint16_t pause_sec;            // пауза реверса (для холодильника), 0 если нет

    /* ── Авто-тюн ── */
    PidTuneState_e tune_state;     // текущее состояние авто-тюна
    float    tau;                  // постоянная времени системы (сек), результат теста
    float    K_gain;               // коэффициент усиления объекта (°C/%)

    /* ── Авто-тюн: рантайм-данные (не сохраняются на USB) ── */
    float    T_filtered;           // ИИР-фильтрованная температура
    uint8_t  tune_progress;        // 0..100 % прогресс автотюна для UI
    uint8_t  tune_phase_b;         // 0=фаза A, 1=фаза B
    uint8_t  tune_iter;            // текущая итерация внутри фазы
    float    tune_lo;              // нижняя граница бинарного поиска
    float    tune_hi;              // верхняя граница бинарного поиска
    float    tune_T_samples[10];   // кольцевой буфер температур для σ
    uint8_t  tune_sample_idx;      // индекс в кольцевом буфере
    uint32_t tune_stab_start;      // HAL_GetTick() начала ожидания стабилизации
    float    tune_sigma_thr;       // адаптивный порог σ (зависит от датчика)
    float    tune_err_thr;         // адаптивный порог ошибки (зависит от датчика)
    uint16_t tune_stable_cnt;      // счётчик тиков непрерывной стабильности
    uint16_t tune_stable_req;      // требуемое кол-во тиков для признания стабильности
    float    tune_step_delta;      // безопасный шаг PWM для step-теста (%)
    float    tune_tau_sum;         // накопитель суммы T для area-метода расчёта tau
    uint16_t tune_tau_n;            // кол-во тиков накопления (для area-метода)
    float    tune_T_start;         // T до шагового теста
    float    tune_T_end;           // T после шагового теста
    uint32_t tune_step_start_tick; // HAL_GetTick() начала шагового теста
    float    tune_step_pwm;        // PWM% при шаговом тесте
    uint8_t  tune_step_phase;      // 0=ждём стабилиз. до шага, 1=шаг подан, 2=ждём стабилиз. после

    /* ── Рабочее состояние (runtime) ── */
    float    integral;             // накопленная интегральная составляющая
    float    prev_error;           // ошибка на предыдущем шаге (для D)
    uint32_t last_tick;            // HAL_GetTick() последнего вызова pid_compute
    uint32_t last_off_tick;        // для паузы реверса компрессора
    uint8_t  pwm_out;              // текущий выход PID (0..100%)
    uint8_t  stale_cnt;            // счётчик циклов без валидной температуры (для аварийного отключения)

    /* ── Мета ── */
    char     info[30];             // описание
    uint8_t  onoff;                // 1=вкл, 0=выкл
} dbPidConf;


struct dbPinsInfo { // Создали структуру с необходимым набором типов элиментов для PIN's.
	char pins[5];
	char port[2];
	int number;
	uint16_t hal_pin;// GPIO_PIN_0
	GPIO_TypeDef* gpio_name; // GPIOA
	short onewire; // 0 - Not able; 1 - Able
	short pwm; // 0 - Not able; 1 - Able
	short i2cdata; // 0 - Not able; 1 - Able
	short i2cclok; // 0 - Not able; 1 - Able
	TIM_TypeDef* tim;
	uint32_t tim_channel;
	uint16_t af; // Alternate function
};

struct dbPinToPin { // Привязка кнопок/выключателей/pwm к Device
	short idin; // Encoder A
	short idout;// idPWM
	char pins[5];// PWM
};

struct dbSettings {	// Cтруктура для setting
	char adm_name[10];  // Имя пользователя для авторизации
	char adm_pswd[15];  // Пароль для авторизации
	char token[11];     // Token для API
	char lang[3];       // ru,en
	uint8_t numline;    // Количество строк "Cron jobs"
	double timezone;    // UTC
	double lon_de;	// Longitude - Долгота
	double lat_de;	// Latitude - Широта
	char sunrise[7];    // 07:00
	char sunset[7];     // 17:00
	char dlength[7];    // Day length: 10:00
	short onsunrise;    // onoff sunrise chekbox
	short onsunset;     // onoff sunset chekbox
	char srise_pins[250];// sunrise action
	char sset_pins[250]; // sunset action
	short ip1_sntp0;	// SMTP Server primary
	short ip1_sntp1;	// SMTP Server primary
	short ip1_sntp2;	// SMTP Server primary
	short ip1_sntp3;	// SMTP Server primary
	short ip2_sntp0;	// SMTP Server secondary
	short ip2_sntp1;	// SMTP Server secondary
	short ip2_sntp2;	// SMTP Server secondary
	short ip2_sntp3;	// SMTP Server secondary
	short ip3_sntp0;	// SMTP Server teriary
	short ip3_sntp1;	// SMTP Server teriary
	short ip3_sntp2;	// SMTP Server teriary
	short ip3_sntp3;	// SMTP Server teriary
	// Настройки MQTT
	short check_mqtt;	// check MQTT on/off
	int mqtt_prt;       // Your MQTT broker port (default port is set to 1883)
	char mqtt_clt[32];  // Device's unique identifier.
	char mqtt_usr[32];  // MQTT Имя пользователя для авторизации
	char mqtt_pswd[32]; // MQTT Пароль для авторизации
	char txmqttop[32];  // Transmit MQTT topic
	char rxmqttop[32];  // Receive MQTT topic
	char rxzbtop[32];   // Receive Zigbee2MQTT topic prefix (default "zigbee2mqtt")
	char mqtt_hst[50];  // Your MQTT broker address or domain name (e.g. "192.168.1.100" or "broker.hivemq.com")
	// Настройки IP адреса
	short check_ip;	// check DHCP on/off
	short ip_addr0;	// IP адрес
	short ip_addr1;	// IP адрес
	short ip_addr2;	// IP адрес
	short ip_addr3;	// IP адрес
	short sb_mask0;		// Маска сети
	short sb_mask1;		// Маска сети
	short sb_mask2;		// Маска сети
	short sb_mask3;		// Маска сети
	short gateway0;	// Шлюз
	short gateway1;	// Шлюз
	short gateway2;	// Шлюз
	short gateway3;	// Шлюз
	char fullmoon[18];  // Full moon time
//	uint8_t macaddr0;	// MAC address
//	uint8_t macaddr1;	// MAC address
//	uint8_t macaddr2;	// MAC address
//	uint8_t macaddr3;	// MAC address
//	uint8_t macaddr4;	// MAC address
//	uint8_t macaddr5;	// MAC address
	// Настройки GPS
	uint8_t sim800l;    // GPS on или off
	char tel[20];       // Mobile number
	uint8_t monflg;     // Monitoring flag
	uint8_t sec;        // OFFLINE Секунды: 30
	uint8_t min;        // OFFLINE Минуты: 20
	uint8_t hour;       // OFFLINE Часы: 15 (15:00)
	uint8_t mday;       // OFFLINE День месяца: 3
	uint8_t mon;        // OFFLINE Месяц:
	uint8_t year;       // OFFLINE год (25 = 2025-2000)
	short usehttps;     // enable/disable HTTPS
	uint8_t pidline;    // Количество видимых PID-строк
	uint32_t log_filter_mask; // Маска фильтра логов
};

/* ═══════════════════════════════════════════════════════════════════════════
 *  ZIGBEE PLAN B — отдельный массив ZigbeeConf[NUMZBEE]
 * ═══════════════════════════════════════════════════════════════════════════ */
#define NUMZBEE 100

typedef struct {
    char     zbee_ieee[17];      // IEEE-адрес без "0x", 16 hex + '\0'
    uint8_t  zbee_endpoint;      // 1-240
    uint8_t  cluster_flags;      // Bitmask: ZBEE_CL_ONOFF|ZBEE_CL_DIMMER|ZBEE_CL_COLOR
    uint16_t zbee_attribute;     // 0x0000 и т.д., зависит от кластера (только для сенсоров)
    char     zbee_label[30];     // Произвольное имя для UI
    uint8_t  state;              // 0/1 — текущее состояние устройства
    int      dvalue;             // яркость/hue/etc
    uint8_t  onoff;              // Master-enable: 1=вкл, 0=выкл
    uint32_t color_hex;          // Текущий цвет RGB (0xRRGGBB), по умолчанию 0xFFAA00
    char     info[30];           // служебное поле
    uint8_t  topin;              // всегда 11 (ZIGBEE), для унификации
    uint8_t  zbee_role;          // ZBEE_ROLE_* — тип поведения
    uint16_t sensor_cluster;     // какой кластер сработал (для SENSOR)
    int      sensor_last_val;    // последнее значение сенсора
    uint16_t ep_onoff;      // EP-номер для вкл/выкл (0 = не размечен)
    uint16_t ep_brightness; // EP-номер для яркости
    uint16_t ep_color;      // EP-номер для цвета
    uint16_t ep;            // EP-номер этого слота (0 = не sub-slot)
    uint8_t  device_type_override; // 0=Auto, 1=Socket, 2=Dimmer, 3=Color Lamp

    /* ── Button fields (when zbee_role == ZBEE_ROLE_TRIGGER) ── */
    char     sclick[125];         // Single click action (124 симв + '\0')
    char     dclick[125];         // Double click action (124 симв + '\0')
    char     lpress[125];         // Long press action   (124 симв + '\0')

    uint8_t  vbtn_mode;          // 0 = PASSTHROUGH, 1 = RAW (auto-detected)
    char     pt_single[12];      // Payload for single click (PASSTHROUGH)
    char     pt_double[12];      // Payload for double click
    char     pt_long[12];        // Payload for long press

    /* ── Runtime state for RAW mode (not saved to flash) ── */
    uint8_t  vbtn_state;         // 0=IDLE, 1=PRESSED, 2=WAIT_REPEAT, 3=RE_PRESSED, 5=LONG_HOLD
    uint8_t  vbtn_repeat;        // Click counter (1 or 2)
    uint8_t  vbtn_level;         // Current level (1=pressed, 0=released)
    uint32_t vbtn_last_tick;     // Last event time
    uint32_t vbtn_state_tick;    // Time of state entry

    /* ── Switch payload mapping (when zbee_role == ZBEE_ROLE_SWITCH) ── */
    char     switch_payload_on[32];    // Payload для state=1 (напр. "btn_double")
    char     switch_payload_off[32];   // Payload для state=0 (напр. "btn_long")

    /* ── Dimmer range auto-detection (from Learning Mode observations) ── */
    uint16_t dimmer_min;         // Минимальное значение яркости (автоопределённое или ручное)
    uint16_t dimmer_max;         // Максимальное значение яркости
    uint16_t dimmer_cluster;     // Cluster: 0x0008=Level, 0xEF00=Manufacturer
    uint8_t  dimmer_attr;        // Attribute: 0x0000=Level, DP# for Manufacturer
} ZigbeeVirtualPin;

extern ZigbeeVirtualPin ZigbeeConf[NUMZBEE];

/* ── Virtual button constants ── */
#define VBTN_STATE_IDLE        0
#define VBTN_STATE_PRESSED     1
#define VBTN_STATE_WAIT_REPEAT 2
#define VBTN_STATE_RE_PRESSED  3
#define VBTN_STATE_LONG_HOLD   5

#define VBTN_MODE_PASSTHROUGH  0
#define VBTN_MODE_RAW          1

#define VBTN_DEBOUNCE_MS       30
#define VBTN_DOUBLE_MS         300
#define VBTN_LONG_MS           800
#define VBTN_WATCHDOG_MS       5000

/* ── Addressing: unified ID space ── */
static inline bool IsZigbeePin(int id) { return id >= NUMPIN && id < NUMPIN + NUMZBEE; }
static inline int  ZbeeIdx(int id)     { return id - NUMPIN; }

/* ── Virtual button functions ── */
void zbee_vbtn_tick(void);
void zbee_vbtn_mqtt_event(int slot, const char *payload);
void zbee_vbtn_auto_detect(int slot, const char *first_payload);
void vbtn_execute(int slot, int event_type);

/* ── PinView — тонкий интерфейс для общих операций ── */
typedef struct {
    uint8_t    topin;
    uint8_t    state;
    int        dvalue;
    const char *label;
    bool       is_zigbee;
    void      *raw;        // dbPinsConf* либо ZigbeeVirtualPin*
} PinView;

/* Функции конфигурации zigbee.ini */
void GetZigbeeConfig(void);
void SetZigbeeConfig(void);

#endif /* INC_DB_H_ */

