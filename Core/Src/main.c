/* USER CODE BEGIN Header */
/**
 ******************************************************************************
 * @file           : main.c
 * @brief          : Main program body
 ******************************************************************************
 * @attention
 *
 * Copyright (c) 2024 STMicroelectronics.
 * All rights reserved.
 *
 * This software is licensed under terms that can be found in the LICENSE file
 * in the root directory of this software component.
 * If no LICENSE file comes with this software, it is provided AS-IS.
 *
 ******************************************************************************
 */
/* USER CODE END Header */
/* Includes ------------------------------------------------------------------*/
#include "main.h"
#include "string.h"
#include "cmsis_os.h"
#include "fatfs.h"
#include "usb_host.h"

/* Private includes ----------------------------------------------------------*/
/* USER CODE BEGIN Includes */
#include "cJSON.h"
#include "db.h"
#include "hal.h"
#include "mongoose.h"
#include "multi_button.h"
#include "net.h"
#include "setings.h"
#include "logger.h"
#include "ds18b20.h"
#include "ds18b20Config.h"
#include "lwdtc.h"
#include "mongoose.h"
#include "stdio.h"
#include "zagotovka.h"
#include <inttypes.h> // Для поддержки PRIuPTR
#include <math.h>
#include <string.h>
#include <time.h>

#include "gsm.h"
#include "usart_ring.h"

#define BLINK_PERIOD_MS 1000 // LED blinking period in millis
#define DEBOUNCE_DELAY 45    // Encoder (ms)

#define PI 3.14159265358979323846
#define ZENITH -.83 // Средняя атмосферная рефракция.

extern OneWire_t OneWire;
extern uint8_t OneWireDevices;
extern uint8_t temp_cnt;
extern uint8_t Ds18b20StartConvert;
extern uint16_t Ds18b20Timeout;
extern uint64_t s_boot_timestamp;
int32_t onoffid;  /* знаковый: JSON id может быть < 0 */
extern onewire_config_t ow_conf[MAX_DS18B20_P + MAX_DHT22_P];
struct Button button[NUMPIN];
extern volatile uint8_t onlineFlg;
extern uint8_t gsm_rx_buffer[GSM_RX_BUFFER_SIZE];
extern volatile gsm_rx_buffer_index_t gsm_rx_buffer_head;
uint8_t RxByte; // Буфер для приема одного байта по UART

uint8_t owflag = 0;

ds18b20_pin_t ds18b20[MAX_DS18B20_P];
dht22_pin_t dht22[MAX_DHT22_P];

/* A4: global mqttMsg removed — each send site uses a local copy */
/* mqtt_topic[100] / mqtt_payload[300] теперь локальны в WebServerTask */
/* USER CODE END Includes */

/* Private typedef -----------------------------------------------------------*/
/* USER CODE BEGIN PTD */
TIM_HandleTypeDef htim[NUMPIN];
uint8_t usbnum = 0;
uint8_t mqttnum = 0;
uint8_t sumowpin = 0;
/* A3: global data_pin removed — each producer/consumer uses a local copy */
dbPidConf PidConf[PID_MAX_SLOTS];

#define HTTP_URL "http://0.0.0.0:8000"
#define HTTPS_URL "https://0.0.0.0:8443"
/* USER CODE END PTD */

/* Private define ------------------------------------------------------------*/
/* USER CODE BEGIN PD */

/* USER CODE END PD */

/* Private macro -------------------------------------------------------------*/
/* USER CODE BEGIN PM */
// Cron variable — копия struct tm, а не указатель на static buffer localtime()
struct tm timez_copy;
time_t cronetime;
time_t cronetime_old;
time_t moontime = (time_t)-1;
int year;
uint8_t month; // 1-12
uint8_t day;   // 1-31
char str[40] = {0};
char g_ip_addr[16] = "0.0.0.0";
char g_mac_addr[18] = "00:00:00:00:00:00";
/* USER CODE END PM */

/* Private variables ---------------------------------------------------------*/
#if defined ( __ICCARM__ ) /*!< IAR Compiler */
#pragma location=0x2007c000
ETH_DMADescTypeDef  DMARxDscrTab[ETH_RX_DESC_CNT]; /* Ethernet Rx DMA Descriptors */
#pragma location=0x2007c0a0
ETH_DMADescTypeDef  DMATxDscrTab[ETH_TX_DESC_CNT]; /* Ethernet Tx DMA Descriptors */

#elif defined ( __CC_ARM )  /* MDK ARM Compiler */

__attribute__((at(0x2007c000))) ETH_DMADescTypeDef  DMARxDscrTab[ETH_RX_DESC_CNT]; /* Ethernet Rx DMA Descriptors */
__attribute__((at(0x2007c0a0))) ETH_DMADescTypeDef  DMATxDscrTab[ETH_TX_DESC_CNT]; /* Ethernet Tx DMA Descriptors */

#elif defined ( __GNUC__ ) /* GNU Compiler */

ETH_DMADescTypeDef DMARxDscrTab[ETH_RX_DESC_CNT] __attribute__((section(".RxDecripSection"))); /* Ethernet Rx DMA Descriptors */
ETH_DMADescTypeDef DMATxDscrTab[ETH_TX_DESC_CNT] __attribute__((section(".TxDecripSection")));   /* Ethernet Tx DMA Descriptors */
#endif

ETH_TxPacketConfig TxConfig;

CRC_HandleTypeDef hcrc;

ETH_HandleTypeDef heth;

RNG_HandleTypeDef hrng;

TIM_HandleTypeDef htim1;

UART_HandleTypeDef huart2;
UART_HandleTypeDef huart3;

/* Definitions for ConfigTask */
osThreadId_t ConfigTaskHandle;
const osThreadAttr_t ConfigTask_attributes = {
  .name = "ConfigTask",
  .stack_size = 384 * 4,
  .priority = (osPriority_t) osPriorityNormal,
};
/* Definitions for WebServerTask */
osThreadId_t WebServerTaskHandle;
const osThreadAttr_t WebServerTask_attributes = {
  .name = "WebServerTask",
  .stack_size = 4608 * 4,
  .priority = (osPriority_t) osPriorityAboveNormal,
};
/* Definitions for OutputTask */
osThreadId_t OutputTaskHandle;
const osThreadAttr_t OutputTask_attributes = {
  .name = "OutputTask",
  .stack_size = 512 * 4,
  .priority = (osPriority_t) osPriorityNormal,
};
/* Definitions for CronTask */
osThreadId_t CronTaskHandle;
const osThreadAttr_t CronTask_attributes = {
  .name = "CronTask",
  .stack_size = 512 * 4,
  .priority = (osPriority_t) osPriorityNormal,
};
/* Definitions for InputTask */
osThreadId_t InputTaskHandle;
const osThreadAttr_t InputTask_attributes = {
  .name = "InputTask",
  .stack_size = 512 * 4,
  .priority = (osPriority_t) osPriorityNormal,
};
/* Definitions for EncoderTask */
osThreadId_t EncoderTaskHandle;
const osThreadAttr_t EncoderTask_attributes = {
  .name = "EncoderTask",
  .stack_size = 512 * 4,
  .priority = (osPriority_t) osPriorityNormal,
};
/* Definitions for ds18b20Task */
osThreadId_t ds18b20TaskHandle;
const osThreadAttr_t ds18b20Task_attributes = {
  .name = "ds18b20Task",
  .stack_size = 768 * 4,
  .priority = (osPriority_t) osPriorityBelowNormal,
};
/* Definitions for dht22Task */
osThreadId_t dht22TaskHandle;
const osThreadAttr_t dht22Task_attributes = {
  .name = "dht22Task",
  .stack_size = 512 * 4,
  .priority = (osPriority_t) osPriorityBelowNormal,
};
/* Definitions for ServiceTask */
osThreadId_t ServiceTaskHandle;
const osThreadAttr_t ServiceTask_attributes = {
  .name = "ServiceTask",
  .stack_size = 1024 * 4,
  .priority = (osPriority_t) osPriorityNormal,
};
/* Definitions for SIM800LTask */
osThreadId_t SIM800LTaskHandle;
const osThreadAttr_t SIM800LTask_attributes = {
  .name = "SIM800LTask",
  .stack_size = 1024 * 4,
  .priority = (osPriority_t) osPriorityNormal,
};
/* Definitions for SecurityTask */
osThreadId_t SecurityTaskHandle;
const osThreadAttr_t SecurityTask_attributes = {
  .name = "SecurityTask",
  .stack_size = 1024 * 4,
  .priority = (osPriority_t) osPriorityNormal,
};
/* Definitions for PIDTask */
osThreadId_t PIDTaskHandle;
const osThreadAttr_t PIDTask_attributes = {
  .name = "PIDTask",
  .stack_size = 1024 * 4,
  .priority = (osPriority_t) osPriorityNormal,
};
/* Definitions for my_DgnTask */
osThreadId_t my_DgnTaskHandle;
const osThreadAttr_t my_DgnTask_attributes = {
  .name = "my_DgnTask",
  .stack_size = 768 * 4,
  .priority = (osPriority_t) osPriorityNormal,
};
/* Definitions for LoggerTask */
osThreadId_t LoggerTaskHandle;
const osThreadAttr_t LoggerTask_attributes = {
  .name = "LoggerTask",
  .stack_size = 512 * 4,
  .priority = (osPriority_t) osPriorityBelowNormal,
};
/* Definitions for outputQueue */
osMessageQueueId_t outputQueueHandle;
const osMessageQueueAttr_t outputQueue_attributes = {
  .name = "outputQueue"
};
/* Definitions for usbQueue */
osMessageQueueId_t usbQueueHandle;
const osMessageQueueAttr_t usbQueue_attributes = {
  .name = "usbQueue"
};
/* Definitions for mqttQueue */
osMessageQueueId_t mqttQueueHandle;
const osMessageQueueAttr_t mqttQueue_attributes = {
  .name = "mqttQueue"
};
/* Definitions for mqttRxQueue */
osMessageQueueId_t mqttRxQueueHandle;
const osMessageQueueAttr_t mqttRxQueue_attributes = {
  .name = "mqttRxQueue"
};
/* USER CODE BEGIN PV */
extern struct dbSettings SetSettings;
extern struct dbCron dbCrontxt[MAXSIZE];
extern struct dbPinsConf PinsConf[NUMPIN];
extern struct dbPinsInfo PinsInfo[NUMPIN];
extern struct dbPinToPin PinsLinks[NUMPINLINKS];
extern bool g_log_filter_from_file;  // Флаг: log_filter_mask был в settings.ini

extern ApplicationTypeDef Appli_state;

/* Глобальные переменные мониторинга пиков и ошибок */
volatile uint32_t malloc_fail_count = 0;
static uint32_t mqtt_tx_peak = 0;
static uint32_t mqtt_rx_peak = 0;
static uint32_t output_peak = 0;
static uint32_t usb_peak = 0;
static uint32_t mg_conn_peak = 0;
static uint32_t mg_poll_gap_peak = 0;
volatile uint32_t mg_poll_gap_over_50ms_cnt = 0;

/* Счётчики HTTP запросов */
volatile uint32_t req_total = 0;
volatile uint32_t req_encoder = 0;
volatile uint32_t req_api = 0;

/* USER CODE END PV */

/* Private function prototypes -----------------------------------------------*/
void SystemClock_Config(void);
static void MPU_Config(void);
static void MX_GPIO_Init(void);
static void MX_ETH_Init(void);
static void MX_USART3_UART_Init(void);
static void MX_RNG_Init(void);
static void MX_TIM1_Init(void);
static void MX_USART2_UART_Init(void);
static void MX_CRC_Init(void);
void StartConfigTask(void *argument);
void StartWebServerTask(void *argument);
void StartOutputTask(void *argument);
void StartCronTask(void *argument);
void StartInputTask(void *argument);
void StartEncoderTask(void *argument);
void StartDs18b20Task(void *argument);
void StartDht22Task(void *argument);
void StartServiceTask(void *argument);
void StartSIM800LTask(void *argument);
void StartSecurityTask(void *argument);
void StartPIDTask(void *argument);
void StartDgnTask(void *argument);
void StartLoggerTask(void *argument);

/* USER CODE BEGIN PFP */

/* USER CODE END PFP */

/* Private user code ---------------------------------------------------------*/
/* USER CODE BEGIN 0 */
/*********************** для printf ******************************/
#ifdef __GNUC__
/* With GCC/RAISONANCE, small printf (option LD Linker->Libraries->Small printf
 * set to 'Yes') calls __io_putchar() */
#define PUTCHAR_PROTOTYPE int __io_putchar(int ch)
#else
#define PUTCHAR_PROTOTYPE int fputc(int ch, FILE *f)
#endif /* __GNUC__ */
/*********************** M ******************************/
#define LAN8742A_PHY_ADDRESS 0x00
#define LAN8742A_BSR 0x01
#define LAN8742A_BSR_LINK_STATUS 0x0004
#define LAN8742A_BSR_AUTONEGO_COMPLETE 0x0020

static bool quick_network_check(void) {
  uint32_t phyreg;
  uint32_t retry_count = 3;

  while (retry_count--) {
    // Чтение Basic Status Register (BSR)
    HAL_ETH_ReadPHYRegister(&heth, LAN8742A_PHY_ADDRESS, LAN8742A_BSR, &phyreg);

    if ((phyreg & LAN8742A_BSR_LINK_STATUS) &&
        (phyreg & LAN8742A_BSR_AUTONEGO_COMPLETE)) {
      return true;
    }
    osDelay(10);
  }
  return false;
}

const char *s_sub_topic = SetSettings.rxmqttop; // Rx topic

bool mg_random(void *buf, size_t len) { // Use on-board RNG
  extern RNG_HandleTypeDef hrng;
  for (size_t n = 0; n < len; n += sizeof(uint32_t)) {
    uint32_t r;
    HAL_RNG_GenerateRandomNumber(&hrng, &r);
    memcpy((char *)buf + n, &r, n + sizeof(r) > len ? len - n : sizeof(r));
  }
  return true;
}

uint64_t mg_millis(void) {
    // Proper 64-bit extension of 32-bit HAL_GetTick.
    // HAL_GetTick wraps at ~49.7 days; we track wraps in a 64-bit accumulator.
    // Called frequently enough (every mg_mgr_poll) to never miss a wrap.
    static uint32_t last_tick;
    static uint64_t ms64;
    uint32_t now = HAL_GetTick();
    uint32_t delta = now - last_tick;  // Safe modulo-2^32 subtraction
    ms64 += delta;
    last_tick = now;
    return ms64;
}

/*
 Порядок у меня правильный:
    Сначала происходит MG_EV_ACCEPT - принятие TCP соединения
    В этом обработчике выполняется mg_tls_init()
    После этого может начаться TLS рукопожатие (событие MG_EV_TLS_HS)
 * */

volatile uint32_t mqtt_sent_count = 0;

static bool check_mqtt_connection(void *conn);

void send_mqtt_message(struct mg_connection *conn, const char *topic,
                       const char *msg) {
  if (!check_mqtt_connection(conn)) {
    return;
  }

  /* Защита от переполнения send-буфера при зависшем TCP соединении.
   * Если брокер перестал ACK-ить пакеты, conn->send растёт бесконечно
   * и через ~2 часа исчерпывает FreeRTOS heap → deadlock.
   * Порог 4096 = ~20-40 сообщений в буфере. */
  if (conn->send.len > 4096) {
    static uint32_t last_err_tick = 0;
    if (mg_millis() - last_err_tick > 5000) {
      MG_ERROR(("MQTT send buf overflow (%lu), draining", (unsigned long)conn->send.len));
      last_err_tick = mg_millis();
    }
    conn->is_draining = 1;
    return;
  }

  struct mg_mqtt_opts pub_opts;
  memset(&pub_opts, 0, sizeof(pub_opts));
  char full_topic[128]; // Буфер для полного топика
  snprintf(full_topic, sizeof(full_topic), "%s%s", get_mqtt_topic(), topic);
  pub_opts.topic = mg_str(full_topic);
  pub_opts.message = mg_str(msg);
  pub_opts.qos = s_qos;
  pub_opts.retain = false;
  mg_mqtt_pub(conn, &pub_opts);
  taskENTER_CRITICAL();
  mqtt_sent_count++;
  taskEXIT_CRITICAL();

  /* Диагностика длины JSON-сообщения */
  size_t msg_len = strlen(msg);
  if (msg_len > 256) {
    printf("[MQTT] Large publish len=%d on topic %s\r\n", (int)msg_len, full_topic);
  }

  MG_INFO(("%lu PUBLISHED %s -> %.*s", conn->id, msg, (int)pub_opts.topic.len,
           pub_opts.topic.buf));
}
/*********************** End M ******************************/

#ifdef __GNUC__
/* With GCC/RAISONANCE, small MG_INFO (option LD Linker->Libraries->Small
 * MG_INFO set to 'Yes') calls __io_putchar() */
#define PUTCHAR_PROTOTYPE int __io_putchar(int ch)
#else
#define PUTCHAR_PROTOTYPE int fputc(int ch, FILE *f)
#endif /* __GNUC__ */

unsigned long Ti;
unsigned long Te;

static bool check_mqtt_connection(void *conn) {
  struct mg_connection *c = (struct mg_connection *)conn;
  extern volatile bool mqtt_connected_reported;
  if (c == NULL || c->is_closing || c->is_draining || !mqtt_connected_reported) {
    return false;
  }
  return true;
}

void button_event_handler(
    Button *handle) { // Функция callback для обработки событий кнопки
  if (handle->button_id >= NUMPIN) {
    return;
  }
  // Обработчик событий кнопки
  PressEvent event = get_button_event(handle);

  switch (event) {
  case NONE_PRESS: // Нет нажатия
    break;
  case PRESS_DOWN: // Кнопка нажата
    //       printf("Button %d: PRESS_DOWN!\r\n", handle->button_id);
    break;
  case PRESS_UP: // Кнопка отпущена
                 //       printf("Button %d: PRESS_UP!\r\n", handle->button_id);
    break;
  case LONG_PRESS_START: // Начало долгого нажатия
    //       printf("Button %d: LONG_PRESS_START!\r\n", handle->button_id);
    if (handle->button_id < NUMPIN) {
      //	 printf("PinsConf[%d].lpress content: %s\n",
      //        handle->button_id, PinsConf[handle->button_id].lpress);
      action_handler(handle->button_id, PinsConf[handle->button_id].lpress,
                     "long press");
      // Подготовка MQTT сообщения (локальная копия — без гонки данных)
      mqtt_queue_send_safe(3, handle->button_id, 1, 0);
    } else {
      printf("Invalid button ID: %d\n", handle->button_id);
    }
    break;
  case LONG_PRESS_HOLD: // Продолжение долгого нажатия
    //       printf("Button %d: LONG_PRESS_HOLD!\r\n", handle->button_id);
    break;
  case SINGLE_CLICK: // Одиночное нажатие кнопки
    if (handle->button_id < NUMPIN) {
      // printf("PinsConf[%d].sclick content: %s\n", handle->button_id,
      // PinsConf[handle->button_id].sclick);
      action_handler(handle->button_id, PinsConf[handle->button_id].sclick,
                     "sclick press");
      // Подготовка MQTT сообщения (локальная копия — без гонки данных)
      mqtt_queue_send_safe(4, handle->button_id, 2, 0);
    } else {
      printf("Invalid button ID: %d\n", handle->button_id);
    }
//    printf("Button %d: SINGLE_CLICK!\r\n", handle->button_id);
    break;
  case DOUBLE_CLICK: // Двойное нажатие кнопки
    //		printf("Button %d: DOUBLE_CLICK!\r\n", handle->button_id);
    if (handle->button_id < NUMPIN) {
      //	 rintf("PinsConf[%d].lpress content: %s\n",
      //        handle->button_id, PinsConf[handle->button_id].lpress);
      action_handler(handle->button_id, PinsConf[handle->button_id].dclick,
                     "double press");
      // Подготовка MQTT сообщения (локальная копия — без гонки данных)
      mqtt_queue_send_safe(5, handle->button_id, 3, 0);
    } else {
      printf("Invalid button ID: %d\n", handle->button_id);
    }
    break;
  case PRESS_REPEAT: // Повторное нажатие кнопки
    printf("Button %d: PRESS_REPEAT!\r\n", handle->button_id);
    break;
  default:
    // Обработка неизвестного значения event
    break;
  }
}

void pwm_event_handler(Button *handle) {
  // Обработчик событий кнопки
  PressEvent event = get_button_event(handle);

  int i = 0;

  switch (event) {
  case NONE_PRESS: // Нет нажатия
    break;
  case PRESS_DOWN: // Кнопка нажата
    //              printf("Button %d: PRESS_DOWN!\r\n", handle->button_id);
    break;
  case PRESS_UP: // Кнопка отпущена
    //              printf("Button %d: PRESS_UP!\r\n", handle->button_id);
    break;
  case LONG_PRESS_START: // Начало долгого нажатия
    printf("Button %d: LONG_PRESS_START!\r\n", handle->button_id);
    break;
  case LONG_PRESS_HOLD:
    //	  if(PinsConf[handle->button_id].sclick == 2){
    for (uint8_t a = 0; a < NUMPINLINKS; a++) {
      if (PinsLinks[a].idin == handle->button_id) {
        // PinsInfo[i].tim->CCR1 = 50;
        //  PWM
        i = PinsLinks[a].idout;
        if (PinsConf[i].topin == 5) {
          if (is_pin_in_autotune(i)) break; /* AutoTune lock */
          // dvalue - ПРОЦЕНТ 0-100, step = 1%
          if (PinsConf[handle->button_id].on == 1) {
            taskENTER_CRITICAL();
            PinsConf[i].dvalue += 1;
            if (PinsConf[i].dvalue > 100)
              PinsConf[i].dvalue = 100;
            taskEXIT_CRITICAL();
          }
          if (PinsConf[handle->button_id].on == 0) {
            taskENTER_CRITICAL();
            PinsConf[i].dvalue -= 1;
            if (PinsConf[i].dvalue < 0)
              PinsConf[i].dvalue = 0;
            taskEXIT_CRITICAL();
          }
          uint32_t pulse_lh = (uint32_t)((uint64_t)PinsConf[i].dvalue *
                                         PinsConf[i].pwmmax / 100ULL);
          __HAL_TIM_SET_COMPARE(&htim[i], PinsInfo[i].tim_channel, pulse_lh);
          printf("PWM LONG [%d] %s: %d%% = %lu steps\r\n", i, PinsInfo[i].pins,
                 PinsConf[i].dvalue, (unsigned long)pulse_lh);
        }
        //						data_pin.id =
        // PinsLinks[a].idout;
        // data_pin.action = 2;
        // xQueueSend(outputQueueHandle, (void* ) &data_pin, 0);
        printf("Button %d: SINGLE_CLICK PWM pwmValue %d flag %d!\r\n",
               handle->button_id, PinsConf[i].dvalue,
               PinsConf[handle->button_id].on);
      }
      //				}
    }
    printf("Button %d: LONG_PRESS_HOLD!\r\n", handle->button_id);
    break;
  case SINGLE_CLICK: // Одиночное нажатие кнопки
                     //	  if(PinsConf[handle->button_id].sclick == 2){
    for (uint8_t a = 0; a < NUMPINLINKS; a++) {
      if (PinsLinks[a].idin == handle->button_id) {
        // PinsInfo[i].tim->CCR1 = 50;
        // for (uint8_t i = 0; i < NUMPIN; i++) {
        //  PWM
        i = PinsLinks[a].idout;
        if (PinsConf[i].topin == 5) {
          if (is_pin_in_autotune(i)) break; /* AutoTune lock */
          // dvalue - ПРОЦЕНТ 0-100, step = 1%
          if (PinsConf[handle->button_id].on == 1) {
            PinsConf[i].dvalue += 1;
            if (PinsConf[i].dvalue > 100) {
              PinsConf[i].dvalue = 100;
              PinsConf[handle->button_id].on = 0;
            }
          }
          if (PinsConf[handle->button_id].on == 0) {
            PinsConf[i].dvalue -= 1;
            if (PinsConf[i].dvalue < 0) {
              PinsConf[i].dvalue = 0;
              PinsConf[handle->button_id].on = 1;
            }
          }
          uint32_t pulse_sc = (uint32_t)((uint64_t)PinsConf[i].dvalue *
                                         PinsConf[i].pwmmax / 100ULL);
          __HAL_TIM_SET_COMPARE(&htim[i], PinsInfo[i].tim_channel, pulse_sc);
          printf("PWM CLICK [%d] %s: %d%% = %lu steps\r\n", i, PinsInfo[i].pins,
                 PinsConf[i].dvalue, (unsigned long)pulse_sc);
        }

        //						data_pin.id =
        // PinsLinks[a].idout;
        // data_pin.action = 2;
        // xQueueSend(outputQueueHandle, (void* ) &data_pin, 0);
        printf("Button %d: SINGLE_CLICK PWM pwmValue %d flag %d!\r\n",
               handle->button_id, PinsConf[i].dvalue,
               PinsConf[handle->button_id].on);
      }
    }
    //	  }
    // printf("Button %d: SINGLE_CLICK PWM!\r\n", handle->button_id);
    break;
  case DOUBLE_CLICK: // Двойное нажатие кнопки
    PinsConf[handle->button_id].on ^= 1;
    printf("Button %d: DOUBLE_CLICK PWM %d!\r\n", handle->button_id,
           PinsConf[handle->button_id].on);
    break;
  case PRESS_REPEAT: // Повторное нажатие кнопки
    printf("Button %d: PRESS_REPEAT PWM!\r\n", handle->button_id);
    break;
  default:
    // Обработка неизвестного значения event
    break;
  }
}

// Функция для получения состояния GPIO кнопки
uint8_t read_button_level(uint8_t button_id) {
  // Вернуть состояние GPIO пина, к которому подключена кнопка
  return HAL_GPIO_ReadPin(PinsInfo[button_id].gpio_name,
                          PinsInfo[button_id].hal_pin);
  // return GPIO_PIN_RESET; // Значение по умолчанию, если кнопка не найдена
}

/**************************** GSM ***************************************/
uint32_t zerg_t;  /* используется в gsm.c через extern */
uint32_t swarm_t; /* используется в gsm.c через extern */

/* clear_string перенесена в gsm.c */
/* check_speed перенесена в gsm.c */
/*************************** END GSM ************************************/

/* Reset reason ---------------------------------------------------------*/
static uint32_t reset_csr_value = 0;
static char reset_reason_str[128] = "Unknown";

static void read_reset_reason(void) {
    reset_csr_value = RCC->CSR;
    __HAL_RCC_CLEAR_RESET_FLAGS();

    reset_reason_str[0] = '\0';
    size_t len = 0;

    if (reset_csr_value & RCC_CSR_PORRSTF) {
        len = strlen(reset_reason_str);
        snprintf(reset_reason_str + len, sizeof(reset_reason_str) - len, "POR ");
    }
    if (reset_csr_value & RCC_CSR_BORRSTF) {
        len = strlen(reset_reason_str);
        snprintf(reset_reason_str + len, sizeof(reset_reason_str) - len, "BOR ");
    }
    if (reset_csr_value & RCC_CSR_SFTRSTF) {
        len = strlen(reset_reason_str);
        snprintf(reset_reason_str + len, sizeof(reset_reason_str) - len, "SFTRST ");
    }
    if (reset_csr_value & RCC_CSR_IWDGRSTF) {
        len = strlen(reset_reason_str);
        snprintf(reset_reason_str + len, sizeof(reset_reason_str) - len, "IWDG ");
    }
    if (reset_csr_value & RCC_CSR_WWDGRSTF) {
        len = strlen(reset_reason_str);
        snprintf(reset_reason_str + len, sizeof(reset_reason_str) - len, "WWDG ");
    }
    if (reset_csr_value & RCC_CSR_LPWRRSTF) {
        len = strlen(reset_reason_str);
        snprintf(reset_reason_str + len, sizeof(reset_reason_str) - len, "LPWRRST ");
    }
    if (reset_csr_value & RCC_CSR_PINRSTF) {
        len = strlen(reset_reason_str);
        snprintf(reset_reason_str + len, sizeof(reset_reason_str) - len, "PINRST ");
    }

    // Trim trailing space
    len = strlen(reset_reason_str);
    if (len > 0 && reset_reason_str[len - 1] == ' ') {
        reset_reason_str[len - 1] = '\0';
    }

    if (reset_reason_str[0] == '\0') {
        strcpy(reset_reason_str, "None");
    }
}
/* USER CODE END 0 */

/**
  * @brief  The application entry point.
  * @retval int
  */
int main(void)
{

  /* USER CODE BEGIN 1 */
  read_reset_reason();
  /* USER CODE END 1 */

  /* MPU Configuration--------------------------------------------------------*/
  MPU_Config();

  /* Барьеры после MPU_Config — гарантируют, что MPU активна до кеша */
  __DSB();
  __ISB();

  /* Enable the CPU Cache */

  /* Enable I-Cache---------------------------------------------------------*/
  SCB_EnableICache();

  /* Enable D-Cache---------------------------------------------------------*/
  SCB_EnableDCache();

  /* MCU Configuration--------------------------------------------------------*/

  /* Reset of all peripherals, Initializes the Flash interface and the Systick. */
  HAL_Init();

  /* USER CODE BEGIN Init */

  /* USER CODE END Init */

  /* Configure the system clock */
  SystemClock_Config();

  /* USER CODE BEGIN SysInit */

  /* USER CODE END SysInit */

  /* Initialize all configured peripherals */
  MX_GPIO_Init();
  MX_ETH_Init();
  MX_USART3_UART_Init();
  MX_RNG_Init();
  MX_TIM1_Init();
  MX_FATFS_Init();
  MX_USART2_UART_Init();
  MX_CRC_Init();
  /* USER CODE BEGIN 2 */
  // Инициализация массивов датчиков
  memset(ds18b20, 0, sizeof(ds18b20));
  memset(dht22, 0, sizeof(dht22));
  DWT_Init();
  test_init();
  printf("[SYSTEM] Reset CSR=0x%08lX\r\n", reset_csr_value);
  printf("[SYSTEM] Reset flags: %s\r\n", reset_reason_str);
  printf("[SYSTEM] Reset reason: %s (CSR=0x%08lX)\r\n", reset_reason_str, reset_csr_value);
  /* USER CODE END 2 */

  /* Init scheduler */
  osKernelInitialize();

  /* USER CODE BEGIN RTOS_MUTEX */
  /* add mutexes, ... */
  /* USER CODE END RTOS_MUTEX */

  /* USER CODE BEGIN RTOS_SEMAPHORES */
  /* add semaphores, ... */
  /* USER CODE END RTOS_SEMAPHORES */

  /* USER CODE BEGIN RTOS_TIMERS */
  /* start timers, add new ones, ... */
  /* USER CODE END RTOS_TIMERS */

  /* Create the queue(s) */
  /* creation of outputQueue */
  outputQueueHandle = osMessageQueueNew (16, sizeof(struct data_pin_t), &outputQueue_attributes);

  /* creation of usbQueue */
  usbQueueHandle = osMessageQueueNew (16, sizeof(uint8_t), &usbQueue_attributes);

  /* creation of mqttQueue */
  mqttQueueHandle = osMessageQueueNew (32, sizeof(MqttMessage_t), &mqttQueue_attributes);

  /* creation of mqttRxQueue */
  mqttRxQueueHandle = osMessageQueueNew (4, sizeof(MqttRxMsg_t), &mqttRxQueue_attributes);

  /* USER CODE BEGIN RTOS_QUEUES */
  /* add queues, ... */
  logger_init();
  /* USER CODE END RTOS_QUEUES */

  /* Create the thread(s) */
  /* creation of ConfigTask */
  ConfigTaskHandle = osThreadNew(StartConfigTask, NULL, &ConfigTask_attributes);

  /* creation of WebServerTask */
  WebServerTaskHandle = osThreadNew(StartWebServerTask, NULL, &WebServerTask_attributes);

  /* creation of OutputTask */
  OutputTaskHandle = osThreadNew(StartOutputTask, NULL, &OutputTask_attributes);

  /* creation of CronTask */
  CronTaskHandle = osThreadNew(StartCronTask, NULL, &CronTask_attributes);

  /* creation of InputTask */
  InputTaskHandle = osThreadNew(StartInputTask, NULL, &InputTask_attributes);

  /* creation of EncoderTask */
  EncoderTaskHandle = osThreadNew(StartEncoderTask, NULL, &EncoderTask_attributes);

  /* creation of ds18b20Task */
  ds18b20TaskHandle = osThreadNew(StartDs18b20Task, NULL, &ds18b20Task_attributes);

  /* creation of dht22Task */
  dht22TaskHandle = osThreadNew(StartDht22Task, NULL, &dht22Task_attributes);

  /* creation of ServiceTask */
  ServiceTaskHandle = osThreadNew(StartServiceTask, NULL, &ServiceTask_attributes);

  /* creation of SIM800LTask */
  SIM800LTaskHandle = osThreadNew(StartSIM800LTask, NULL, &SIM800LTask_attributes);

  /* creation of SecurityTask */
  SecurityTaskHandle = osThreadNew(StartSecurityTask, NULL, &SecurityTask_attributes);

  /* creation of PIDTask */
  PIDTaskHandle = osThreadNew(StartPIDTask, NULL, &PIDTask_attributes);

  /* creation of my_DgnTask */
  my_DgnTaskHandle = osThreadNew(StartDgnTask, NULL, &my_DgnTask_attributes);

  /* creation of LoggerTask */
  LoggerTaskHandle = osThreadNew(StartLoggerTask, NULL, &LoggerTask_attributes);

  /* USER CODE BEGIN RTOS_THREADS */
  /* add threads, ... */

  /* USER CODE END RTOS_THREADS */

  /* USER CODE BEGIN RTOS_EVENTS */
  /* add events, ... */
  /* USER CODE END RTOS_EVENTS */

  /* Start scheduler */
  osKernelStart();

  /* We should never get here as control is now taken by the scheduler */

  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while (1) {
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
  }
  /* USER CODE END 3 */
}

/**
  * @brief System Clock Configuration
  * @retval None
  */
void SystemClock_Config(void)
{
  RCC_OscInitTypeDef RCC_OscInitStruct = {0};
  RCC_ClkInitTypeDef RCC_ClkInitStruct = {0};

  /** Configure LSE Drive Capability
  */
  HAL_PWR_EnableBkUpAccess();

  /** Configure the main internal regulator output voltage
  */
  __HAL_RCC_PWR_CLK_ENABLE();
  __HAL_PWR_VOLTAGESCALING_CONFIG(PWR_REGULATOR_VOLTAGE_SCALE1);

  /** Initializes the RCC Oscillators according to the specified parameters
  * in the RCC_OscInitTypeDef structure.
  */
  RCC_OscInitStruct.OscillatorType = RCC_OSCILLATORTYPE_HSE;
  RCC_OscInitStruct.HSEState = RCC_HSE_BYPASS;
  RCC_OscInitStruct.PLL.PLLState = RCC_PLL_ON;
  RCC_OscInitStruct.PLL.PLLSource = RCC_PLLSOURCE_HSE;
  RCC_OscInitStruct.PLL.PLLM = 4;
  RCC_OscInitStruct.PLL.PLLN = 216;
  RCC_OscInitStruct.PLL.PLLP = RCC_PLLP_DIV2;
  RCC_OscInitStruct.PLL.PLLQ = 9;
  RCC_OscInitStruct.PLL.PLLR = 2;
  if (HAL_RCC_OscConfig(&RCC_OscInitStruct) != HAL_OK)
  {
    Error_Handler();
  }

  /** Activate the Over-Drive mode
  */
  if (HAL_PWREx_EnableOverDrive() != HAL_OK)
  {
    Error_Handler();
  }

  /** Initializes the CPU, AHB and APB buses clocks
  */
  RCC_ClkInitStruct.ClockType = RCC_CLOCKTYPE_HCLK|RCC_CLOCKTYPE_SYSCLK
                              |RCC_CLOCKTYPE_PCLK1|RCC_CLOCKTYPE_PCLK2;
  RCC_ClkInitStruct.SYSCLKSource = RCC_SYSCLKSOURCE_PLLCLK;
  RCC_ClkInitStruct.AHBCLKDivider = RCC_SYSCLK_DIV1;
  RCC_ClkInitStruct.APB1CLKDivider = RCC_HCLK_DIV4;
  RCC_ClkInitStruct.APB2CLKDivider = RCC_HCLK_DIV2;

  if (HAL_RCC_ClockConfig(&RCC_ClkInitStruct, FLASH_LATENCY_7) != HAL_OK)
  {
    Error_Handler();
  }
}

/**
  * @brief CRC Initialization Function
  * @param None
  * @retval None
  */
static void MX_CRC_Init(void)
{

  /* USER CODE BEGIN CRC_Init 0 */

  /* USER CODE END CRC_Init 0 */

  /* USER CODE BEGIN CRC_Init 1 */

  /* USER CODE END CRC_Init 1 */
  hcrc.Instance = CRC;
  hcrc.Init.DefaultPolynomialUse = DEFAULT_POLYNOMIAL_ENABLE;
  hcrc.Init.DefaultInitValueUse = DEFAULT_INIT_VALUE_ENABLE;
  hcrc.Init.InputDataInversionMode = CRC_INPUTDATA_INVERSION_NONE;
  hcrc.Init.OutputDataInversionMode = CRC_OUTPUTDATA_INVERSION_DISABLE;
  hcrc.InputDataFormat = CRC_INPUTDATA_FORMAT_BYTES;
  if (HAL_CRC_Init(&hcrc) != HAL_OK)
  {
    Error_Handler();
  }
  /* USER CODE BEGIN CRC_Init 2 */

  /* USER CODE END CRC_Init 2 */

}

/**
  * @brief ETH Initialization Function
  * @param None
  * @retval None
  */
static void MX_ETH_Init(void)
{

  /* USER CODE BEGIN ETH_Init 0 */

  /* USER CODE END ETH_Init 0 */

   static uint8_t MACAddr[6];

  /* USER CODE BEGIN ETH_Init 1 */

  /* USER CODE END ETH_Init 1 */
  heth.Instance = ETH;
  MACAddr[0] = 0x00;
  MACAddr[1] = 0x80;
  MACAddr[2] = 0xE1;
  MACAddr[3] = 0x00;
  MACAddr[4] = 0x00;
  MACAddr[5] = 0x00;
  heth.Init.MACAddr = &MACAddr[0];
  heth.Init.MediaInterface = HAL_ETH_RMII_MODE;
  heth.Init.TxDesc = DMATxDscrTab;
  heth.Init.RxDesc = DMARxDscrTab;
  heth.Init.RxBuffLen = 1524;

  /* USER CODE BEGIN MACADDRESS */
  /* Генерируем уникальный MAC из 96-bit UUID чипа (locally administered) */
  MACAddr[0] = 0x02;  /* locally administered, unicast */
  MACAddr[1] = UUID[0] ^ UUID[1];
  MACAddr[2] = UUID[2] ^ UUID[3];
  MACAddr[3] = UUID[4] ^ UUID[5];
  MACAddr[4] = UUID[6] ^ UUID[7] ^ UUID[8];
  MACAddr[5] = UUID[9] ^ UUID[10] ^ UUID[11];
  /* USER CODE END MACADDRESS */

  if (HAL_ETH_Init(&heth) != HAL_OK)
  {
    Error_Handler();
  }

  memset(&TxConfig, 0 , sizeof(ETH_TxPacketConfig));
  TxConfig.Attributes = ETH_TX_PACKETS_FEATURES_CSUM | ETH_TX_PACKETS_FEATURES_CRCPAD;
  TxConfig.ChecksumCtrl = ETH_CHECKSUM_IPHDR_PAYLOAD_INSERT_PHDR_CALC;
  TxConfig.CRCPadCtrl = ETH_CRC_PAD_INSERT;
  /* USER CODE BEGIN ETH_Init 2 */

  /* USER CODE END ETH_Init 2 */

}

/**
  * @brief RNG Initialization Function
  * @param None
  * @retval None
  */
static void MX_RNG_Init(void)
{

  /* USER CODE BEGIN RNG_Init 0 */

  /* USER CODE END RNG_Init 0 */

  /* USER CODE BEGIN RNG_Init 1 */

  /* USER CODE END RNG_Init 1 */
  hrng.Instance = RNG;
  if (HAL_RNG_Init(&hrng) != HAL_OK)
  {
    Error_Handler();
  }
  /* USER CODE BEGIN RNG_Init 2 */

  /* USER CODE END RNG_Init 2 */

}

/**
  * @brief TIM1 Initialization Function
  * @param None
  * @retval None
  */
static void MX_TIM1_Init(void)
{

  /* USER CODE BEGIN TIM1_Init 0 */

  /* USER CODE END TIM1_Init 0 */

  TIM_ClockConfigTypeDef sClockSourceConfig = {0};
  TIM_MasterConfigTypeDef sMasterConfig = {0};

  /* USER CODE BEGIN TIM1_Init 1 */

  /* USER CODE END TIM1_Init 1 */
  htim1.Instance = TIM1;
  htim1.Init.Prescaler = 216-1;
  htim1.Init.CounterMode = TIM_COUNTERMODE_UP;
  htim1.Init.Period = 65535;
  htim1.Init.ClockDivision = TIM_CLOCKDIVISION_DIV1;
  htim1.Init.RepetitionCounter = 0;
  htim1.Init.AutoReloadPreload = TIM_AUTORELOAD_PRELOAD_DISABLE;
  if (HAL_TIM_Base_Init(&htim1) != HAL_OK)
  {
    Error_Handler();
  }
  sClockSourceConfig.ClockSource = TIM_CLOCKSOURCE_INTERNAL;
  if (HAL_TIM_ConfigClockSource(&htim1, &sClockSourceConfig) != HAL_OK)
  {
    Error_Handler();
  }
  sMasterConfig.MasterOutputTrigger = TIM_TRGO_RESET;
  sMasterConfig.MasterOutputTrigger2 = TIM_TRGO2_RESET;
  sMasterConfig.MasterSlaveMode = TIM_MASTERSLAVEMODE_DISABLE;
  if (HAL_TIMEx_MasterConfigSynchronization(&htim1, &sMasterConfig) != HAL_OK)
  {
    Error_Handler();
  }
  /* USER CODE BEGIN TIM1_Init 2 */

  /* USER CODE END TIM1_Init 2 */

}

/**
  * @brief USART2 Initialization Function
  * @param None
  * @retval None
  */
static void MX_USART2_UART_Init(void)
{

  /* USER CODE BEGIN USART2_Init 0 */

  /* USER CODE END USART2_Init 0 */

  /* USER CODE BEGIN USART2_Init 1 */

  /* USER CODE END USART2_Init 1 */
  huart2.Instance = USART2;
  huart2.Init.BaudRate = 57600;
  huart2.Init.WordLength = UART_WORDLENGTH_8B;
  huart2.Init.StopBits = UART_STOPBITS_1;
  huart2.Init.Parity = UART_PARITY_NONE;
  huart2.Init.Mode = UART_MODE_TX_RX;
  huart2.Init.HwFlowCtl = UART_HWCONTROL_NONE;
  huart2.Init.OverSampling = UART_OVERSAMPLING_16;
  huart2.Init.OneBitSampling = UART_ONE_BIT_SAMPLE_DISABLE;
  huart2.AdvancedInit.AdvFeatureInit = UART_ADVFEATURE_NO_INIT;
  if (HAL_UART_Init(&huart2) != HAL_OK)
  {
    Error_Handler();
  }
  /* USER CODE BEGIN USART2_Init 2 */

  /* USER CODE END USART2_Init 2 */

}

/**
  * @brief USART3 Initialization Function
  * @param None
  * @retval None
  */
static void MX_USART3_UART_Init(void)
{

  /* USER CODE BEGIN USART3_Init 0 */

  /* USER CODE END USART3_Init 0 */

  /* USER CODE BEGIN USART3_Init 1 */

  /* USER CODE END USART3_Init 1 */
  huart3.Instance = USART3;
  huart3.Init.BaudRate = 115200;
  huart3.Init.WordLength = UART_WORDLENGTH_8B;
  huart3.Init.StopBits = UART_STOPBITS_1;
  huart3.Init.Parity = UART_PARITY_NONE;
  huart3.Init.Mode = UART_MODE_TX_RX;
  huart3.Init.HwFlowCtl = UART_HWCONTROL_NONE;
  huart3.Init.OverSampling = UART_OVERSAMPLING_16;
  huart3.Init.OneBitSampling = UART_ONE_BIT_SAMPLE_DISABLE;
  huart3.AdvancedInit.AdvFeatureInit = UART_ADVFEATURE_NO_INIT;
  if (HAL_UART_Init(&huart3) != HAL_OK)
  {
    Error_Handler();
  }
  /* USER CODE BEGIN USART3_Init 2 */

  /* USER CODE END USART3_Init 2 */

}

/**
  * @brief GPIO Initialization Function
  * @param None
  * @retval None
  */
static void MX_GPIO_Init(void)
{
  GPIO_InitTypeDef GPIO_InitStruct = {0};
/* USER CODE BEGIN MX_GPIO_Init_1 */
/* USER CODE END MX_GPIO_Init_1 */

  /* GPIO Ports Clock Enable */
  __HAL_RCC_GPIOC_CLK_ENABLE();
  __HAL_RCC_GPIOH_CLK_ENABLE();
  __HAL_RCC_GPIOA_CLK_ENABLE();
  __HAL_RCC_GPIOB_CLK_ENABLE();
  __HAL_RCC_GPIOD_CLK_ENABLE();
  __HAL_RCC_GPIOG_CLK_ENABLE();

  /*Configure GPIO pin Output Level */
  HAL_GPIO_WritePin(SENSOR_GPIO_Port, SENSOR_Pin, GPIO_PIN_RESET);

  /*Configure GPIO pin Output Level */
  HAL_GPIO_WritePin(GPIOB, LD1_Pin|LD3_Pin|LD2_Pin, GPIO_PIN_RESET);

  /*Configure GPIO pin Output Level */
  HAL_GPIO_WritePin(USB_PowerSwitchOn_GPIO_Port, USB_PowerSwitchOn_Pin, GPIO_PIN_RESET);

  /*Configure GPIO pin : USER_Btn_Pin */
  GPIO_InitStruct.Pin = USER_Btn_Pin;
  GPIO_InitStruct.Mode = GPIO_MODE_IT_RISING;
  GPIO_InitStruct.Pull = GPIO_NOPULL;
  HAL_GPIO_Init(USER_Btn_GPIO_Port, &GPIO_InitStruct);

  /*Configure GPIO pin : SENSOR_Pin */
  GPIO_InitStruct.Pin = SENSOR_Pin;
  GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
  GPIO_InitStruct.Pull = GPIO_NOPULL;
  GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
  HAL_GPIO_Init(SENSOR_GPIO_Port, &GPIO_InitStruct);

  /*Configure GPIO pins : LD1_Pin LD3_Pin LD2_Pin */
  GPIO_InitStruct.Pin = LD1_Pin|LD3_Pin|LD2_Pin;
  GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
  GPIO_InitStruct.Pull = GPIO_NOPULL;
  GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
  HAL_GPIO_Init(GPIOB, &GPIO_InitStruct);

  /*Configure GPIO pin : USB_PowerSwitchOn_Pin */
  GPIO_InitStruct.Pin = USB_PowerSwitchOn_Pin;
  GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
  GPIO_InitStruct.Pull = GPIO_NOPULL;
  GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
  HAL_GPIO_Init(USB_PowerSwitchOn_GPIO_Port, &GPIO_InitStruct);

  /*Configure GPIO pin : USB_OverCurrent_Pin */
  GPIO_InitStruct.Pin = USB_OverCurrent_Pin;
  GPIO_InitStruct.Mode = GPIO_MODE_INPUT;
  GPIO_InitStruct.Pull = GPIO_NOPULL;
  HAL_GPIO_Init(USB_OverCurrent_GPIO_Port, &GPIO_InitStruct);

/* USER CODE BEGIN MX_GPIO_Init_2 */
/* USER CODE END MX_GPIO_Init_2 */
}

/* USER CODE BEGIN 4 */
void vApplicationMallocFailedHook(void)
{
    malloc_fail_count++;
    printf("\r\n!!! CRITICAL: MALLOC FAIL %lu !!!\r\n", malloc_fail_count);
}

/*********************** для printf ******************************/
/* PUTCHAR_PROTOTYPE перенесен в logger.c */
/************************ PWM Fade *************************************/
/* PWM Fade state — без динамических задач, без malloc */
typedef struct {
    bool     active;
    float    current_duty;
    float    delta;
    uint32_t steps_left;
    int      end_duty;
    int      cronindex;
} FadeState_t;

static FadeState_t fade_state[NUMPIN] = {0};

/* Запускает (или перезапускает) плавное изменение PWM.
 * pwm_id       — индекс PWM-пина (topin == 5)
 * duration_sec — длительность перехода в секундах
 * start_duty   — начальная яркость 0–100%
 * end_duty     — конечная яркость   0–100% */
void start_pwm_fade(uint8_t pwm_id, uint32_t duration_sec,
                    int start_duty, int end_duty, int cronindex) {
    if (pwm_id >= NUMPIN || PinsConf[pwm_id].topin != 5) {
        printf("start_pwm_fade: bad id=%d\r\n", pwm_id);
        return;
    }
    if (is_pin_in_autotune(pwm_id)) {
        printf("[FADE] BLOCKED by AutoTune: pwm_id=%d\r\n", pwm_id);
        return;
    }

    /* Encoder onoff — ПРИОРИТЕТНЫЙ рубильник */
    bool enc_on = true;
    for (uint8_t a = 0; a < NUMPINLINKS; a++) {
        if (PinsLinks[a].idout == pwm_id) {
            uint8_t enc_id = PinsLinks[a].idin;
            if (PinsConf[enc_id].topin == 8 && PinsConf[enc_id].onoff == 0) {
                enc_on = false;
                break;
            }
        }
    }
    if (!enc_on) {
        // Гасим PWM и блокируем — БЕЗОПАСНОСТЬ
        __HAL_TIM_SET_COMPARE(&htim[pwm_id], PinsInfo[pwm_id].tim_channel, 0);
        fade_state[pwm_id].active = false;
        return;
    }

    uint32_t steps = duration_sec > 0 ? duration_sec : 1;

    fade_state[pwm_id].active       = true;
    fade_state[pwm_id].current_duty = (float)start_duty;
    fade_state[pwm_id].delta        = (float)(end_duty - start_duty)
                                       / (float)steps;
    fade_state[pwm_id].steps_left   = steps;
    fade_state[pwm_id].end_duty     = end_duty;
    fade_state[pwm_id].cronindex    = cronindex;

    /* Устанавливаем начальное значение немедленно */
    PinsConf[pwm_id].dvalue = start_duty;
    uint32_t pulsef3 =
        (uint32_t)((uint64_t)start_duty * PinsConf[pwm_id].pwmmax / 100ULL);
    __HAL_TIM_SET_COMPARE(&htim[pwm_id], PinsInfo[pwm_id].tim_channel, pulsef3);

//    printf("PWM fade: id=%d %ds %d%%->%d%%\r\n",pwm_id, (int)duration_sec, start_duty, end_duty);
}
/*********************** END PWM Fade **********************************/
void parse_string(char *str, time_t cronetime_olds, int cronindex, int pause) {
  /* Timer onoff — только управление расписанием */
  if (cronindex >= 0 && cronindex < MAXSIZE && dbCrontxt[cronindex].onoff == 0) {
    // Просто не запускаем fade/события, PWM не трогаем
    return;
  }
  char *token;
  char *saveptr;
  int flag = 0;
  int k = 0;
  int pin = 0;
  char delim[] = ",";
  /* mqtt_sent удалён — таймеры публикуются через send_mqtt_timer_batch() */
  data_pin_t data_pin = {0}; /* A3: локальная копия */
  //    printf("Debug: Parsing string for cronindex=%d, pause=%d\n", cronindex,
  //    pause); printf("Debug: Input string: %s\n", str);
  token = strtok_r(str, delim, &saveptr);
  while (token != NULL) {
    char *end_token;
    //        printf("Debug: Processing token: %s\n", token);
    /* --- PWM Fade: формат "pwm:<id>,<duration_sec>,<start%>,<end%>" --- */
    if (strncmp(token, "pwm:", 4) == 0 && pause == 0) {
      int pwm_id = 0, dur = 0, sduty = 0, eduty = 0;
      char *t1 = token + 4;
      char *t2 = strtok_r(NULL, delim, &saveptr);
      char *t3 = strtok_r(NULL, delim, &saveptr);
      char *t4 = strtok_r(NULL, delim, &saveptr);
      if (t1 && t2 && t3 && t4) {
        pwm_id = atoi(t1);
        dur = atoi(t2);
        sduty = atoi(t3);
        eduty = atoi(t4);
        start_pwm_fade((uint8_t)pwm_id, (uint32_t)dur, sduty, eduty, cronindex);
        /* MQTT: батч send_mqtt_timer_batch() отправляет состояние раз в 1с */
      } else {
        printf("parse_string: bad pwm token: %s\r\n", token);
      }
      token = strtok_r(NULL, delim, &saveptr);
      continue; /* переходим к следующему токену */
    }
    if (token[0] == 'p') {
      char *newstring = token + 1;
      dbCrontxt[cronindex].ptime = cronetime_olds + atoi(newstring);
      flag = 1;
      //            printf("Debug: Found pause token, flag set to 1\n");
    }
    if (flag == pause) {
      char *token2 = strtok_r(token, ":", &end_token);
      k = 0;
      while (token2 != NULL) {
        if (k == 0) {
          pin = atoi(token2);
          if (pin != 0) {
            data_pin.id = pin;
          }
        }
        if (k == 1) {
          data_pin.action = atoi(token2);
        }
        token2 = strtok_r(NULL, ":", &end_token);
        k++;
      }
      if (k == 2) {
        xQueueSend(outputQueueHandle, (void *)&data_pin, 0);
        /* MQTT: батч send_mqtt_timer_batch() отправляет состояние раз в 1с */
      }
    }
    token = strtok_r(NULL, delim, &saveptr);
  }
}

/* USER CODE END 4 */

/* USER CODE BEGIN Header_StartConfigTask */
/**
 * @brief  Function implementing the ConfigTask thread.
 * @param  argument: Not used
 * @retval None
 */
/* USER CODE END Header_StartConfigTask */
void StartConfigTask(void *argument)
{
  /* init code for USB_HOST */
  MX_USB_HOST_Init();
  /* USER CODE BEGIN 5 */
  /* Infinite loop */
  int usbflag = 1;
  FILINFO finfo;
  for (;;) {
    switch (Appli_state) {
    case APPLICATION_READY:
      if (usbflag == 1) {
        osDelay(1000);
        printf("APPLICATION_READY! \r\n");

        /* Перенаправляем cJSON на pvPortMalloc/vPortFree напрямую,
           минуя newlib _sbrk. Это гарантирует, что cJSON_Delete()
           возвращает память ПРЯМО в FreeRTOS heap. */
        cJSON_Hooks cjson_hooks = { pvPortMalloc, vPortFree };
        cJSON_InitHooks(&cjson_hooks);

        FRESULT fresult = f_stat(
            "settings.ini", &finfo); // Проверяем существует ли файл или нет!?
        if (fresult == FR_OK) {
          GetSettingsConfig(); // если файл "settings.ini" существует, открываем
                               // его и перезаписываем
          g_log_filter_mask = g_log_filter_from_file ? SetSettings.log_filter_mask : LOG_MASK_ALL;
          GetCronConfig();     // если файл "cron.ini" существует, открываем для
                               // чтения.
          GetPinConfig();      // если файл "pins.ini" существует, открываем для
                               // чтения.
          GetPinToPin(); // если файл "pintopin.ini" существует, открываем его
          GetOneWireConfig(); // если файл "onewire.ini" существует, открываем
                              // его
          GetPidConfig();     // если файл "pid.ini" существует, открываем его

          InitPin(); // Инициализация пинов

          if (SetSettings.sim800l == 1) { // Если модуль sim800l включен
            xTaskNotifyGive(
                SIM800LTaskHandle); // ТО ВКЛЮЧАЕМ ЗАДАЧУ SIM800LTask
            ulTaskNotifyTake(pdTRUE,
                             portMAX_DELAY); // Ждем уведомления от SIM800LTask
          }

          xTaskNotifyGive(
              WebServerTaskHandle);          // ТО ВКЛЮЧАЕМ ЗАДАЧУ WebServerTask
          xTaskNotifyGive(CronTaskHandle);   // И ВКЛЮЧАЕМ ЗАДАЧУ CronTask
          xTaskNotifyGive(OutputTaskHandle); // И ВКЛЮЧАЕМ ЗАДАЧУ OutputTask
          xTaskNotifyGive(InputTaskHandle);  // И ВКЛЮЧАЕМ ЗАДАЧУ InputTask
          xTaskNotifyGive(EncoderTaskHandle); // И ВКЛЮЧАЕМ ЗАДАЧУ PWMTask

          xTaskNotifyGive(ServiceTaskHandle);  // И ВКЛЮЧАЕМ ЗАДАЧУ TechnolTask
          xTaskNotifyGive(SecurityTaskHandle); // И ВКЛЮЧАЕМ ЗАДАЧУ SecurityTask

          osDelay(100);
          xTaskNotifyGive(ds18b20TaskHandle); // И ВКЛЮЧАЕМ ЗАДАЧУ ds18b20
          xTaskNotifyGive(dht22TaskHandle);   // И ВКЛЮЧАЕМ ЗАДАЧУ dht22
          xTaskNotifyGive(PIDTaskHandle);     // И ВКЛЮЧАЕМ ЗАДАЧУ PIDTask
          xTaskNotifyGive(my_DgnTaskHandle);  // И ВКЛЮЧАЕМ ЗАДАЧУ DgnTask

        } else { // Файл "pins.ini" не существует, создаем его и записываем
                 // данные
          StartSettingsConfig();
          g_log_filter_mask = LOG_MASK_ALL;

          xTaskNotifyGive(WebServerTaskHandle); // ВКЛЮЧАЕМ ЗАДАЧУ WebServerTask
          xTaskNotifyGive(CronTaskHandle);      // ВКЛЮЧАЕМ ЗАДАЧУ CronTask
          xTaskNotifyGive(OutputTaskHandle);    // ВКЛЮЧАЕМ ЗАДАЧУ OutputTask
          xTaskNotifyGive(InputTaskHandle);     // ВКЛЮЧАЕМ ЗАДАЧУ InputTask
          xTaskNotifyGive(EncoderTaskHandle);   // ВКЛЮЧАЕМ ЗАДАЧУ PWMTask

          osDelay(100);
          xTaskNotifyGive(ServiceTaskHandle);  // ВКЛЮЧАЕМ ЗАДАЧУ TechnolTask
          xTaskNotifyGive(ds18b20TaskHandle);  // ВКЛЮЧАЕМ ЗАДАЧУ ds18b20
          xTaskNotifyGive(dht22TaskHandle);    // ВКЛЮЧАЕМ ЗАДАЧУ dht22
          xTaskNotifyGive(SecurityTaskHandle); // ВКЛЮЧАЕМ ЗАДАЧУ SecurityTask
          xTaskNotifyGive(PIDTaskHandle);      // ВКЛЮЧАЕМ ЗАДАЧУ PIDTask
          xTaskNotifyGive(my_DgnTaskHandle);  // И ВКЛЮЧАЕМ ЗАДАЧУ DgnTask
        }
        usbflag = 0;
      }
      // Функция для чтения целых чисел из очереди
      if (xQueueReceive(usbQueueHandle, &usbnum, portMAX_DELAY) == pdTRUE) {
        {
          uint32_t cur_usb = uxQueueMessagesWaiting(usbQueueHandle) + 1;
          if (cur_usb > usb_peak) {
            usb_peak = cur_usb;
          }
        }
        switch (usbnum) {
        case 1:
          SetPinConfig(); // Если файл "pins.ini" не существует, создаем его и
                          // записываем данные
          break;
        case 2:
          SetSettingsConfig(); // Когда сохраняем форму в файл "setings.ini"
          break;
        case 3:
          SetCronConfig(); // Если файл "cron.ini" не существует, создаем его и
                           // записываем данные
          break;
        case 4:
          SetPinToPin(); // Если файл "pintopin.ini" не существует, создаем его
                         // и записываем данные
          break;
        case 5:
          SetOneWireConfig(); // Если файл "onewire.ini" не существует, создаем
                              // его и записываем данные
          break;
        case 6:
          SetPidConfig(); // Сохранение PID конфигурации в "pid.ini"
          break;
        default:
          printf("xQueueReceive get wrong data! \r\n");
          break;
        }
        //				printf("xQueueReceive number: %u\n",
        // usbnum);
      }
      break;
    default:
      // printf("Wrong data! \r\n");
      break;
    }
    osDelay(1);
  }
  /* USER CODE END 5 */
}

/* USER CODE BEGIN Header_StartWebServerTask */
/**
 * @brief Function implementing the WebServerTask thread.
 * @param argument: Not used
 * @retval None
 */
/* Вынесена из StartWebServerTask — GCC nested functions используют трамплины
 * на стеке, что вызывает HardFault на Cortex-M7 (XN-protected SRAM). */
static void static_or_dynamic_ip(struct mg_tcpip_if *mif,
                                 struct dbSettings *config) {
  if (config->check_ip == 1) { // DHCP
    MG_INFO(("2 - Generated MAC: %02X:%02X:%02X:%02X:%02X:%02X\r\n",
             mif->mac[0], mif->mac[1], mif->mac[2], mif->mac[3], mif->mac[4],
             mif->mac[5]));
  } else { // Статический IP
    mif->ip = mg_htonl(MG_U32(config->ip_addr0, config->ip_addr1,
                              config->ip_addr2, config->ip_addr3));
    mif->mask = mg_htonl(MG_U32(config->sb_mask0, config->sb_mask1,
                                config->sb_mask2, config->sb_mask3));
    mif->gw = mg_htonl(MG_U32(config->gateway0, config->gateway1,
                                config->gateway2, config->gateway3));
  }
}
/* USER CODE END Header_StartWebServerTask */
void StartWebServerTask(void *argument)
{
  /* USER CODE BEGIN StartWebServerTask */
  ulTaskNotifyTake(0, portMAX_DELAY);
  mg_log_set(MG_LL_NONE); // Установлен уровень логирования INFO для отладки
  if (!quick_network_check()) { // Проверка подключен LAN провод или нет.
    printf("Network link down - Web server not started");
    vTaskDelete(NULL);
    return;
  } else {
    onlineFlg = 1;
  }

  /* Инициализация настроек HTTPS */
  if (SetSettings.usehttps == 1) {
    if (!initialize_https_settings()) {
      Error_Handler();
    }
  }

  // Инициализация TLS параметров
  struct mg_tcpip_if mif = {.mac = GENERATE_LOCALLY_ADMINISTERED_MAC(),
                            .ip = 0,
                            .mask = 0,
                            .gw = 0,
                            .driver = &mg_tcpip_driver_stm32f,
                            .driver_data = NULL};

  snprintf(g_mac_addr, sizeof(g_mac_addr), "%02X:%02X:%02X:%02X:%02X:%02X",
           mif.mac[0], mif.mac[1], mif.mac[2], mif.mac[3], mif.mac[4], mif.mac[5]);

  MG_INFO(("Initial Generated MAC: %02X:%02X:%02X:%02X:%02X:%02X\r\n",
           mif.mac[0], mif.mac[1], mif.mac[2], mif.mac[3], mif.mac[4],
           mif.mac[5]));

  struct mg_mgr *mgr =
      (struct mg_mgr *)pvPortMalloc(sizeof(struct mg_mgr)); // Одноразовый при загрузке, живёт весь runtime
  mg_mgr_init(mgr);                                   // Инициализируем менеджер

  // Настройка MQTT
  char mqtt_url[70];
  if (SetSettings.check_mqtt && SetSettings.mqtt_hst[0] != '\0') {
    int result = snprintf(mqtt_url, sizeof(mqtt_url), "mqtt://%s:%d",
                          SetSettings.mqtt_hst, SetSettings.mqtt_prt);
    if (result < 0 || result >= sizeof(mqtt_url)) {
      printf("Error: MQTT URL truncated or formatting error\n");
    } else {
      set_mqtt_url(mqtt_url);
      MG_INFO(("MQTT URL set: %s", mqtt_url)); // Добавляем лог для проверки
    }
  } else {
    MG_INFO(("MQTT is disabled in settings"));
  }
  set_mqtt_topic(SetSettings.txmqttop); // Zagotovka

  //    // UUID перед генерацией MAC-адреса
  //    MG_INFO(("UUID before MAC generation:
  //    %02X%02X%02X%02X%02X%02X%02X%02X%02X%02X%02X%02X\r\n",
  //             UUID[0], UUID[1], UUID[2], UUID[3], UUID[4], UUID[5],
  //             UUID[6], UUID[7], UUID[8], UUID[9], UUID[10], UUID[11]));

  // Initialise Mongoose network stack
  struct mg_tcpip_driver_stm32f_data driver_data = {.mdc_cr = 4};
  mif.driver_data = &driver_data;
  MG_INFO(("MAC before static_or_dynamic_ip: %02X:%02X:%02X:%02X:%02X:%02X\r\n",
           mif.mac[0], mif.mac[1], mif.mac[2], mif.mac[3], mif.mac[4],
           mif.mac[5]));

  static_or_dynamic_ip(&mif, &SetSettings);

  mg_tcpip_init(mgr, &mif);

  MG_INFO(("MAC: %M. Waiting for IP...", mg_print_mac, mif.mac));
  while (mif.state != MG_TCPIP_STATE_READY) {
    mg_mgr_poll(mgr, 0);
  }

  {
    uint8_t *ip_bytes = (uint8_t *)&mif.ip;
    snprintf(g_ip_addr, sizeof(g_ip_addr), "%d.%d.%d.%d", ip_bytes[0], ip_bytes[1], ip_bytes[2], ip_bytes[3]);
    snprintf(g_mac_addr, sizeof(g_mac_addr), "%02X:%02X:%02X:%02X:%02X:%02X", mif.mac[0], mif.mac[1], mif.mac[2], mif.mac[3], mif.mac[4], mif.mac[5]);
  }

  web_init(mgr);

  MqttMessage_t rxMsg = {0};
  BaseType_t status;
  char mqtt_topic[100];
  char mqtt_payload[300];

  static uint32_t lsens_tk = 0;  // Батч-публикация сенсоров: 5000мс
  /* ── Диагностика: задержка между вызовами mg_mgr_poll ── */
  static uint32_t s_poll_warn_tk = 0;
  static uint32_t s_last_poll_tk = 0;
  /* Infinite loop */
  for (;;) {
    /* Измеряем интервал между poll-вызовами */
    uint32_t now_poll = HAL_GetTick();
    uint32_t poll_gap = now_poll - s_last_poll_tk;
    if (s_last_poll_tk != 0) {
      if (poll_gap > mg_poll_gap_peak) {
        mg_poll_gap_peak = poll_gap;
      }
      if (poll_gap > 50) {  /* >50ms = starvation */
        mg_poll_gap_over_50ms_cnt++; // Увеличиваем счетчик
        if (now_poll - s_poll_warn_tk > 30000) {     /* не спамим чаще 1р/30с */
          s_poll_warn_tk = now_poll;
          printf("[NET] WARN: mg_mgr_poll gap=%lums (starvation! total cnt: %lu)\r\n",
                 (unsigned long)poll_gap, (unsigned long)mg_poll_gap_over_50ms_cnt);
        }
      }
    }
    s_last_poll_tk = now_poll;

    uint32_t t_poll = HAL_GetTick();
    mg_mgr_poll(mgr, 0); // Было 10
    t_poll = HAL_GetTick() - t_poll;
    /* Статический пик времени выполнения mg_mgr_poll */
    {
      static uint32_t s_poll_exec_peak = 0;
      static uint32_t s_poll_warn_exec_tk = 0;
      if (t_poll > s_poll_exec_peak) {
        s_poll_exec_peak = t_poll;
      }
      if (t_poll > 10) { /* >10ms в одном poll - аномалия */
        if (now_poll - s_poll_warn_exec_tk > 30000) {
          s_poll_warn_exec_tk = now_poll;
          printf("[NET] WARN: mg_mgr_poll exec=%lums (peak=%lu, gap=%lu)\r\n",
                 (unsigned long)t_poll, (unsigned long)s_poll_exec_peak,
                 (unsigned long)poll_gap);
        }
      }
    }

    /* Диагностика пика соединений Mongoose */
    {
      uint32_t active_conns = 0;
      for (struct mg_connection *c = mgr->conns; c != NULL; c = c->next) {
        active_conns++;
      }
      if (active_conns > mg_conn_peak) {
        mg_conn_peak = active_conns;
      }
    }

    /* Обработка входящих MQTT-команд (вынесена из fn_mqtt callback,
       чтобы не блокировать mg_mgr_poll) */
    {
        uint32_t cur_rx = uxQueueMessagesWaiting(mqttRxQueueHandle);
        if (cur_rx > mqtt_rx_peak) {
            mqtt_rx_peak = cur_rx;
        }
        MqttRxMsg_t rx;
        while (xQueueReceive(mqttRxQueueHandle, &rx, 0) == pdPASS) {
            mqtt_message_handler(rx.topic, rx.payload);
        }
    }

    /* Explicit drain: rapidly clear the queue if disconnected to avoid buildup */
    if (s_conn == NULL || s_conn->is_closing || !mqtt_connected_reported) {
      MqttMessage_t drain;
      while (xQueueReceive(mqttQueueHandle, &drain, 0) == pdPASS) {
        /* Drop silently */
      }
    }

    // Получаем данные из очереди (не блокируем поток Mongoose)
    memset(&rxMsg, 0, sizeof(MqttMessage_t));
    {
      uint32_t cur_tx = uxQueueMessagesWaiting(mqttQueueHandle);
      if (cur_tx > mqtt_tx_peak) {
        mqtt_tx_peak = cur_tx;
      }
    }
    status = xQueueReceive(mqttQueueHandle, &rxMsg, 0);
    if (status == pdPASS) {
			printf("[MQTT_Q] cmd=%d dev=%d state=%d\r\n", rxMsg.command,rxMsg.deviceId, rxMsg.state); // Подсветит кто спамит в MQTT.
      /* Защита от повреждённых сообщений в очереди */
      if (rxMsg.deviceId >= NUMPIN && rxMsg.command != 1) {
        printf("MQTT queue: invalid deviceId=%d, cmd=%d — skipped\r\n", rxMsg.deviceId, rxMsg.command);
      } else {
      switch (rxMsg.command) {
      case 1: // DEVICE
        if (SetSettings.txmqttop[0] != '\0' && SetSettings.check_mqtt == 1) {
          if (check_mqtt_connection(s_conn)) {
            memset(mqtt_topic, 0, sizeof(mqtt_topic));
            memset(mqtt_payload, 0, sizeof(mqtt_payload));
            strcpy(mqtt_topic, "/device/");
            snprintf(mqtt_payload, sizeof(mqtt_payload), "DEVICE(s)/ACTION=%s", PinsConf[1].sclick);
            send_mqtt_message(s_conn, mqtt_topic, mqtt_payload);
          } else {
            /* MQTT not connected — состояние логируется однократно в fn_mqtt */
          }
        } else if (SetSettings.check_mqtt == 1) {
          printf("Error: MQTT settings not configured\r\n");
        }
        break;
      case 2: // Switch
        if (SetSettings.txmqttop[0] != '\0' && SetSettings.check_mqtt == 1) {
          if (check_mqtt_connection(s_conn)) {
            memset(mqtt_topic, 0, sizeof(mqtt_topic));
            memset(mqtt_payload, 0, sizeof(mqtt_payload));
            snprintf(mqtt_topic, sizeof(mqtt_topic), "/switch/");
            snprintf(mqtt_payload, sizeof(mqtt_payload), "ID:%d=%s", rxMsg.deviceId, rxMsg.state ? "ON" : "OFF");
            send_mqtt_message(s_conn, mqtt_topic, mqtt_payload);
          } else {
            /* MQTT not connected — состояние логируется однократно в fn_mqtt */
          }
        } else if (SetSettings.check_mqtt == 1) {
          printf("Error: MQTT settings not configured\r\n");
        }
        break;
      case 3: // BUTTON LONG_PRESS
      case 4: // BUTTON SINGLE_CLICK
      case 5: // BUTTON DOUBLE_CLICK
        if (SetSettings.txmqttop[0] != '\0' && SetSettings.check_mqtt == 1) {
          if (check_mqtt_connection(s_conn)) {
            memset(mqtt_topic, 0, sizeof(mqtt_topic));
            memset(mqtt_payload, 0, sizeof(mqtt_payload));
            snprintf(mqtt_topic, sizeof(mqtt_topic), "/button/");
            switch (rxMsg.command) {
            case 3: snprintf(mqtt_payload, sizeof(mqtt_payload), "ID=%d/LONG_PRESS/%s", rxMsg.deviceId, PinsConf[rxMsg.deviceId].lpress); break;
            case 4: snprintf(mqtt_payload, sizeof(mqtt_payload), "ID=%d/SINGLE_CLICK/%s", rxMsg.deviceId, PinsConf[rxMsg.deviceId].sclick); break;
            case 5: snprintf(mqtt_payload, sizeof(mqtt_payload), "ID=%d/DOUBLE_CLICK/%s", rxMsg.deviceId, PinsConf[rxMsg.deviceId].dclick); break;
            }
            send_mqtt_message(s_conn, mqtt_topic, mqtt_payload);
          } else {
            /* MQTT not connected — состояние логируется однократно в fn_mqtt */
          }
        } else if (SetSettings.check_mqtt == 1) {
          printf("Error: MQTT settings not configured\r\n");
        }
        break;
      case 6: // SECURITY
        if (SetSettings.txmqttop[0] != '\0' && SetSettings.check_mqtt == 1) {
          if (check_mqtt_connection(s_conn)) {
            memset(mqtt_topic, 0, sizeof(mqtt_topic));
            memset(mqtt_payload, 0, sizeof(mqtt_payload));
            snprintf(mqtt_topic, sizeof(mqtt_topic), "/security/");
            snprintf(mqtt_payload, sizeof(mqtt_payload), "SECURITY/ID=%d/ACTION=%s/%s", rxMsg.deviceId, PinsConf[rxMsg.deviceId].sclick, PinsConf[rxMsg.deviceId].info);
            send_mqtt_message(s_conn, mqtt_topic, mqtt_payload);
          } else {
            /* MQTT not connected — состояние логируется однократно в fn_mqtt */
          }
        } else if (SetSettings.check_mqtt == 1) {
          printf("Error: MQTT settings not configured\r\n");
        }
        break;
      case 7: // TIMER — заменён на send_mqtt_timer_batch()
      case 9: // PWM_TIMER — заменён на send_mqtt_timer_batch()
        break; // no-op: батч обрабатывает всё
      case 8: // OnOff
        if (SetSettings.txmqttop[0] != '\0' && SetSettings.check_mqtt == 1) {
          if (check_mqtt_connection(s_conn)) {
            memset(mqtt_topic, 0, sizeof(mqtt_topic));
            memset(mqtt_payload, 0, sizeof(mqtt_payload));
            snprintf(mqtt_topic, sizeof(mqtt_topic), "/onoff/");
            int written = snprintf(mqtt_payload, sizeof(mqtt_payload),
                                   "ID=%d/OnOff=%s/%s",
                                   rxMsg.deviceId,
                                   PinsConf[rxMsg.deviceId].onoff ? "ON" : "OFF",
                                   PinsConf[rxMsg.deviceId].info);
            if (written < 0 || (size_t)written >= sizeof(mqtt_payload)) {
              printf("[MQTT] payload truncated for deviceId=%d, skipping\r\n",
                     rxMsg.deviceId);
              break;
            }
            send_mqtt_message(s_conn, mqtt_topic, mqtt_payload);
          } else {
            /* MQTT not connected — состояние логируется однократно в fn_mqtt */
          }
        } else if (SetSettings.check_mqtt == 1) {
          printf("Error: MQTT settings not configured\r\n");
        }
        break;
      default:
        printf("mqttnum = %d \r\n", mqttnum);
        break;
      }
      } /* end of deviceId bounds guard */
    }
    // Батч-публикация всех сенсоров (DS18B20 + DHT22 + PWM) одним JSON-пакетом
    // раз в 5 секунд. Гистерезис применяется внутри publish_sensor_batch().
    // Для Home Assistant / Node-RED обновление раз в 5с более чем достаточно.
    {
          uint32_t now = HAL_GetTick();

          if (now - lsens_tk >= 5000) {
	  lsens_tk = now;
            if (s_conn != NULL && mqtt_connected_reported && !s_conn->is_connecting && !s_conn->is_closing && !s_conn->is_draining) {
              publish_sensor_batch(s_conn);
            }
          }
        }

    /* Батч-публикация таймеров раз в 1 секунду (только при изменениях) */
    {
          static uint32_t ltim_tk = 0;
          uint32_t now = HAL_GetTick();
          if (now - ltim_tk >= 1000) {
              ltim_tk = now;
              if (s_conn != NULL && mqtt_connected_reported &&
                  !s_conn->is_connecting && !s_conn->is_closing && !s_conn->is_draining) {
                  send_mqtt_timer_batch(s_conn);
              }
          }
    }



    osDelay(1); /* Yield CPU to RTOS, preventing 100% CPU loop starvation */
  }
  mg_mgr_free(mgr);
  vPortFree(mgr); // парный к pvPortMalloc() на строке инициализации
  /* USER CODE END StartWebServerTask */
}

/* USER CODE BEGIN Header_StartOutputTask */
/**
 * @brief Function implementing the OutputTask thread.
 * @param argument: Not used
 * @retval None
 */
/* USER CODE END Header_StartOutputTask */
void StartOutputTask(void *argument)
{
  /* USER CODE BEGIN StartOutputTask */
  ulTaskNotifyTake(0, portMAX_DELAY);
  //	printf("Start 'Output' task \r\n");
  /* Infinite loop */
  for (;;) {
    data_pin_t data_pin = {0}; /* A3: локальная копия для xQueueReceive */
    if (xQueueReceive(outputQueueHandle, &data_pin, portMAX_DELAY) == pdTRUE) {
      {
        uint32_t cur_out = uxQueueMessagesWaiting(outputQueueHandle) + 1;
        if (cur_out > output_peak) {
          output_peak = cur_out;
        }
      }
      if (data_pin.id >= 0 &&
          data_pin.id < NUMPIN) { // data_pin.id - это ID Devices а не Switch!
        switch (data_pin.action) {
        case 0:
          HAL_GPIO_WritePin(PinsInfo[data_pin.id].gpio_name,
                            PinsInfo[data_pin.id].hal_pin, GPIO_PIN_RESET);
          //					printf("case 0: %d-%d  \r\n",
          //(int) data_pin.id, (int) data_pin.action);
          break;
        case 1:
          HAL_GPIO_WritePin(PinsInfo[data_pin.id].gpio_name,
                            PinsInfo[data_pin.id].hal_pin, GPIO_PIN_SET);
          //					printf("case 1: %d-%d  \r\n",
          //(int) data_pin.id, (int) data_pin.action);
          break;
        case 2:
          HAL_GPIO_TogglePin(PinsInfo[data_pin.id].gpio_name,
                             PinsInfo[data_pin.id].hal_pin);
          //					printf("%d-%d  \r\n", (int)
          // data_pin.id, (int) data_pin.action);
          break;
        default:
          printf("Invalid action: %d\r\n", data_pin.action);
          break;
        }
      } else {
        printf("Invalid pin number: %d\r\n", data_pin.id);
      }
    }
    osDelay(1);
  }
  /* USER CODE END StartOutputTask */
}

/* USER CODE BEGIN Header_StartCronTask */
/**
 * @brief Function implementing the CronTask thread.
 * @param argument: Not used
 * @retval None
 */
/* USER CODE END Header_StartCronTask */
void StartCronTask(void *argument)
{
  /* USER CODE BEGIN StartCronTask */
  ulTaskNotifyTake(0, portMAX_DELAY);
  init_offline_time();
  static lwdtc_cron_ctx_t cron_ctxs[MAXSIZE];
  int i = 0;
  char str[40] = {0};
  int cfg_tasks = MAXSIZE; // Количество возможно настроенных cron задач
  time_t base_timestamp;
  static uint8_t t_printd = 0;

  base_timestamp = initializeTime(); // Инициализация базового времени

  /* Define context for CRON, used to parse data to */
  size_t fail_index = 0;

  taskENTER_CRITICAL();
  if (lwdtc_cron_parse_multi(cron_ctxs, dbCrontxt, MAXSIZE, &fail_index) !=
      lwdtcOK) { // Parse all cron strings
    printf("Failed to parse cron at index %d\r\n", (int)fail_index);
  }
  taskEXIT_CRITICAL();
  printf("CRONs parsed and ready to go\r\n");
  /* Infinite loop */
  for (;;) {
    if (s_boot_timestamp != 0) {
      cronetime = (time_t)(s_boot_timestamp / 1000) + (mg_millis() / 1000) +
                  (time_t)(SetSettings.timezone * 3600);

      if (!onlineFlg) { // Оффлайн режим:
        cronetime = base_timestamp + (mg_millis() / 1000);
      } else { // Онлайн режим: используем время от NTP
        cronetime = (time_t)(s_boot_timestamp / 1000) + (mg_millis() / 1000) +
                    (time_t)(SetSettings.timezone * 3600);
      }

      if (!t_printd && cronetime != 0) {
        { struct tm *tmp = localtime(&cronetime); if (tmp) memcpy(&timez_copy, tmp, sizeof(timez_copy)); }
        taskENTER_CRITICAL();
        if (!onlineFlg) {
          printf("[OFFLINE MODE] Initial Date:%02d.%02d.%04d "
                 "Time:%02d:%02d:%02d\r\n",
                 timez_copy.tm_mday, timez_copy.tm_mon + 1, timez_copy.tm_year + 1900,
                 timez_copy.tm_hour, timez_copy.tm_min, timez_copy.tm_sec);
        } else {
          printf("[ONLINE MODE] Initial Date:%02d.%02d.%04d "
                 "Time:%02d:%02d:%02d IP:%s MAC:%s\r\n",
                 timez_copy.tm_mday, timez_copy.tm_mon + 1, timez_copy.tm_year + 1900,
                 timez_copy.tm_hour, timez_copy.tm_min, timez_copy.tm_sec,
                 g_ip_addr, g_mac_addr);
        }
        taskEXIT_CRITICAL();
        t_printd = 1;
        printf("[SYSTEM] Reset CSR=0x%08lX\r\n", reset_csr_value);
        printf("[SYSTEM] Reset flags: %s\r\n", reset_reason_str);
        printf("[SYSTEM] Reset reason: %s (CSR=0x%08lX)\r\n", reset_reason_str, reset_csr_value);
      }

      if (cronetime != cronetime_old) {
        cronetime_old = cronetime;
        { struct tm *tmp = localtime(&cronetime); if (tmp) memcpy(&timez_copy, tmp, sizeof(timez_copy)); }
        timez_copy.tm_mon += 1;

        // Эти переменные нужны для задачи ServiceTask!
        if (timez_copy.tm_mday !=
            day) { // Если текущий день отличается от сохраненного
          year = timez_copy.tm_year + 1900;
          month = timez_copy.tm_mon; // Не добавляем 1, так как уже сделано выше
          day = timez_copy.tm_mday;
        }

        static int last_min = -1;
        if (timez_copy.tm_min != last_min) {
            if (last_min != -1) {
                taskENTER_CRITICAL();
//                printf("[MQTT] sent=%lu per minute\r\n", (unsigned long)mqtt_sent_count);
                mqtt_sent_count = 0;
                taskEXIT_CRITICAL();
            }
            last_min = timez_copy.tm_min;
        }

        //				printf("CronTask: today's date:
        //%02d.%02d.%d\n", day, month, year);
        // Обработка задач с фиксированным временем
        i = 0;
        while (i < cfg_tasks) {
          if (cronetime >= dbCrontxt[i].ptime && dbCrontxt[i].ptime != 0) {
            strcpy(str, dbCrontxt[i].activ);
            parse_string(str, cronetime_old, i, 1);
            dbCrontxt[i].ptime = 0;
          }
          i++;
        }
        // Проверка CRON выражений
        i = 0;
        while (i < LWDTC_ARRAYSIZE(cron_ctxs)) {
          if (lwdtc_cron_is_valid_for_time(&timez_copy, cron_ctxs, &i) == lwdtcOK) {
            strcpy(str, dbCrontxt[i].activ);
            parse_string(str, cronetime_old, i, 0);
          }
          i++;
        }
        timez_copy.tm_mon -= 1;
      }
    }
    osDelay(1);
  }
  /* USER CODE END StartCronTask */
}

/* USER CODE BEGIN Header_StartInputTask */
/**
 * @brief Function implementing the InputTask thread.
 * @param argument: Not used
 * @retval None
 */
/* USER CODE END Header_StartInputTask */
void StartInputTask(void *argument)
{
  /* USER CODE BEGIN StartInputTask */
  ulTaskNotifyTake(0, portMAX_DELAY);
  //	printf("Start 'Input' task \r\n");
  uint8_t pinStates[NUMPIN] = {0};
  uint32_t pinTimes[NUMPIN] = {0};
  uint32_t millis;
  uint8_t pinLevel[NUMPIN] = {0};
  //    char mqtt_payload[20] = {0};
  //    char mqtt_topic[20] = {0};
  osDelay(1000);
  InitMultibutton();
  /* Infinite loop */
  for (;;) {
    millis = HAL_GetTick();
    for (uint8_t i = 0; i < NUMPIN; i++) {
      if (PinsConf[i].topin == 1 && PinsConf[i].act == 1) { // BUTTON
        if ((millis - pinTimes[i]) >= 5) {
          pinTimes[i] = millis;
          button_ticks(&button[i]);
        }
      }
      /*
      // INPUT Button GPIO_PULLDOWN
      if (PinsConf[i].topin == 1 && PinsConf[i].ptype == 2) { // Для 'button'
              pinStates[i] = HAL_GPIO_ReadPin(PinsInfo[i].gpio_name,
      PinsInfo[i].hal_pin); if (pinStates[i] == 1 && (millis - pinTimes[i]) >=
      200) { pinTimes[i] = millis;

                      // OUTPUT (вынести в отдельную функцию)
                      for (uint8_t a = 0; a < NUMPINLINKS; a++) {
                              if (PinsLinks[a].idin == i) {
                                      data_pin.id = PinsLinks[a].idout;
                                      data_pin.action = 2;
                                      xQueueSend(outputQueueHandle, (void* )
      &data_pin, 0);
                              }
                      }
              }
      }
      // INPUT Button GPIO_PULLUP
      if (PinsConf[i].topin == 1 && PinsConf[i].ptype == 1) { // Для 'button'
              pinStates[i] = HAL_GPIO_ReadPin(PinsInfo[i].gpio_name,
      PinsInfo[i].hal_pin); if (pinStates[i] == 0 && (millis - pinTimes[i]) >=
      200) { pinTimes[i] = millis;

                      // OUTPUT (вынести в отдельную функцию)
                      for (uint8_t a = 0; a < NUMPINLINKS; a++) {
                              if (PinsLinks[a].idin == i) {
                                      data_pin.id = PinsLinks[a].idout;
                                      data_pin.action = 2;
                                      xQueueSend(outputQueueHandle, (void* )
      &data_pin, 0);
                              }
                      }
              }
      }

      */
      // INPUT Switch
      if (PinsConf[i].topin == 3) {
        pinStates[i] =
            HAL_GPIO_ReadPin(PinsInfo[i].gpio_name, PinsInfo[i].hal_pin);
        if (pinStates[i] != GPIO_PIN_RESET && pinStates[i] != GPIO_PIN_SET) {
          printf("Error reading GPIO pin %d\r\n", i);
          continue;
        }
        /* Master Enable: если onoff == 0, игнорируем физический выключатель.
           Обновляем pinLevel/pinTimes, чтобы при включении onoff не произошёл
           ложный фронт. */
        if (PinsConf[i].onoff == 0) {
          if (pinLevel[i] != pinStates[i]) {
            pinLevel[i] = pinStates[i];
            pinTimes[i] = millis;
          }
          continue;
        }
        // Инвертируем логику для pull-up выключателей
        // Когда выключатель замкнут (нажат) - на входе 0
        if (pinStates[i] == 0 && (millis - pinTimes[i]) >= 200 &&
            pinLevel[i] != pinStates[i]) {
          pinLevel[i] = pinStates[i];
          pinTimes[i] = millis;
          processPins(i, 1); // Отправляем 1, т.к. выключатель включен
          mqtt_queue_send_safe(2, i, 1, 0);
        }
        // Когда выключатель разомкнут (отжат) - на входе 1
        if (pinStates[i] == 1 && (millis - pinTimes[i]) >= 200 &&
            pinLevel[i] != pinStates[i]) {
          pinLevel[i] = pinStates[i];
          pinTimes[i] = millis;
          processPins(i, 0); // Отправляем 0, т.к. выключатель выключен
          mqtt_queue_send_safe(2, i, 0, 0);
        }
      }
    }
    osDelay(10);
  }
  /* USER CODE END StartInputTask */
}

/* USER CODE BEGIN Header_StartEncoderTask */
/**
 * @brief Function implementing the EncoderTask thread.
 * @param argument: Not used
 * @retval None
 */
/* USER CODE END Header_StartEncoderTask */
void StartEncoderTask(void *argument)
{
  /* USER CODE BEGIN StartEncoderTask */
  ulTaskNotifyTake(0, portMAX_DELAY);

  const int8_t enc_states[4][4] = {
      { 0, -1,  1,  0},
      { 1,  0,  0, -1},
      {-1,  0,  0,  1},
      { 0,  1, -1,  0}
  };

  uint8_t enc_state[NUMPIN] = {0};
  int8_t  enc_counter[NUMPIN] = {0};

  /* ── Инициализация реальным состоянием пинов — ОДИН РАЗ до цикла ── */
  for (uint8_t id = 0; id < NUMPIN; id++) {
      if (PinsConf[id].topin == 8) {
          uint8_t idpinb_init = PinsConf[id].encoderb;
          if (idpinb_init != 0) {
              uint8_t init_A = HAL_GPIO_ReadPin(PinsInfo[id].gpio_name, PinsInfo[id].hal_pin);
              uint8_t init_B = HAL_GPIO_ReadPin(PinsInfo[idpinb_init].gpio_name, PinsInfo[idpinb_init].hal_pin);
              enc_state[id] = (init_A << 1) | init_B;
//              printf("ENC INIT[%d]: A=%d B=%d -> state=%d\r\n", id, init_A, init_B, enc_state[id]);
          }
      }
  }
  /* ─────────────────────────────────────────────────────────────────── */
  /* Infinite loop */
  for (;;) {
	  for (uint8_t id = 0; id < NUMPIN; id++) {
	           if (PinsConf[id].topin == 8) {
	               uint8_t idpinb = PinsConf[id].encoderb;
	               if (idpinb == 0) continue;

	               uint8_t curr_A = HAL_GPIO_ReadPin(PinsInfo[id].gpio_name, PinsInfo[id].hal_pin);
	               uint8_t curr_B = HAL_GPIO_ReadPin(PinsInfo[idpinb].gpio_name, PinsInfo[idpinb].hal_pin);
	               uint8_t current_state = (curr_A << 1) | curr_B;

	               if (enc_state[id] != current_state) {
	                   int8_t movement = enc_states[enc_state[id]][current_state];
	                   enc_state[id] = current_state;

	                   if (movement != 0) {
	                       enc_counter[id] += movement;

	                       if (enc_counter[id] >= 4 || enc_counter[id] <= -4) {
	                           int8_t step = (enc_counter[id] > 0) ? 1 : -1;
	                           enc_counter[id] = 0;

	                           /* Обновляем dvalue для всех связанных PWM, даже если onoff=0 */
	                           for (uint8_t a = 0; a < NUMPINLINKS; a++) {
	                               if (PinsLinks[a].idin == id) {
	                                   uint8_t idpwm = PinsLinks[a].idout;
	                                   if (PinsConf[idpwm].topin == 5) {
	                                       if (is_pin_in_autotune(idpwm)) continue; /* AutoTune lock */
	                                       // Изменяем значение в памяти
	                                       int16_t val = PinsConf[idpwm].dvalue + step;
	                                       if (val < 0)   val = 0;
	                                       if (val > 100) val = 100;
	                                       PinsConf[idpwm].dvalue = (int8_t)val;
	                                       mark_slice_dirty(&g_ver_encoder);
                                       mark_slice_dirty(&g_ver_pins);

	                                       /* Применяем к железу только если включено */
	                                       if (PinsConf[id].onoff != 0) {
	                                           uint32_t pulse = (uint32_t)((uint64_t)PinsConf[idpwm].dvalue
	                                                             * PinsConf[idpwm].pwmmax / 100ULL);
	                                           __HAL_TIM_SET_COMPARE(&htim[idpwm], PinsInfo[idpwm].tim_channel, pulse);
//	                                           printf("ENC[%d] -> PWM[%d]: %d%%\r\n", id, idpwm, PinsConf[idpwm].dvalue);
	                                       } else {
//	                                           printf("ENC[%d] -> PRESET[%d]: %d%% (OFF)\r\n", id, idpwm, PinsConf[idpwm].dvalue);
	                                       }
	                                   }
	                               }
	                           }
	                       }
	                   }
	               }
	           }
	       }
	       osDelay(1);
  }
  /* USER CODE END StartEncoderTask */
}

/* USER CODE BEGIN Header_StartDs18b20Task */
/**
 * @brief Function implementing the ds18b20Task thread.
 * @param argument: Not used
 * @retval None
 */
/* USER CODE END Header_StartDs18b20Task */
void StartDs18b20Task(void *argument)
{
  /* USER CODE BEGIN StartDs18b20Task */
  ulTaskNotifyTake(0, portMAX_DELAY);
  uint8_t dscount = 0;
  uint8_t owpinnum = 0;

  printf("\r\n[DEBUG] Searching for DS18B20 sensors...\r\n");
  // Initialize configuration array
  for (uint8_t i = 0; i < NUMPIN; i++) {
    if (PinsConf[i].topin == 4) { // OneWire pin found
      for (uint8_t j = 0; j < MAX_DS18B20_P; j++) {
        if (ds18b20[j].id == i && ds18b20[j].typsensr == 1) {
          if (dscount >= MAX_DS18B20_P) {
            printf("[ERROR] Too many DS18B20 pins! Max: %d\r\n", MAX_DS18B20_P);
            break;
          }
          ow_conf[owpinnum].OneWirePort = PinsInfo[i].gpio_name;
          ow_conf[owpinnum].OneWirePin = PinsInfo[i].hal_pin;
          snprintf(ds18b20[j].pin, sizeof(ds18b20[j].pin), "%.*s", (int)sizeof(ds18b20[j].pin) - 1, PinsInfo[i].pins);

          init_ds18b20(&ow_conf[owpinnum].OneWire,
                       ow_conf[owpinnum].OneWirePort,
                       ow_conf[owpinnum].OneWirePin, &ow_conf[owpinnum].owflag,
                       &ow_conf[owpinnum].temp_cnt, ds18b20[j].id, j);

          if (ow_conf[owpinnum].owflag && ow_conf[owpinnum].temp_cnt > 0) {
            ds18b20[j].onoff = 1;
            ds18b20[j].numsens = ow_conf[owpinnum].temp_cnt;
            for (uint8_t k = 0; k < ds18b20[j].numsens; k++) {
              ds18b20[j].sensors[k].valid = true;
            }
            dscount++;
            owpinnum++;
          }
          break;
        }
      }
    }
  }
  if (dscount != 0) {
    printf("[DEBUG] Found DS18B20 pins: %d\r\n", dscount);
  } else {
    printf("[DEBUG] No DS18B20 pins found!\r\n");
  }
  /* Таймер для периодической переинициализации отключённых шин */
  uint32_t reinit_tick = HAL_GetTick();

  /* Infinite loop */
  for (;;) {
    if (dscount != 0) {
      for (uint8_t i = 0; i < MAX_DS18B20_P; i++) {
        if (ds18b20[i].onoff && ow_conf[i].owflag) {
          process_ds18b20(&ow_conf[i].OneWire, ow_conf[i].owflag, i);
        }
      }

      /* ── Авто-переинициализация отключённых шин каждые DS18B20_REINIT_INTERVAL_MS ── */
      if ((HAL_GetTick() - reinit_tick) >= DS18B20_REINIT_INTERVAL_MS) {
        reinit_tick = HAL_GetTick();
        for (uint8_t i = 0; i < MAX_DS18B20_P; i++) {
          if (ds18b20[i].auto_disabled && ds18b20[i].typsensr == 1) {
            printf("[INFO] Attempting reinit of auto-disabled DS18B20 bus idx %d (pin %s)...\r\n",
                   i, ds18b20[i].pin);
            /* Сброс флагов */
            ds18b20[i].error_cnt = 0;
            ds18b20[i].auto_disabled = 0;
            ow_conf[i].owflag = 0;
            ow_conf[i].temp_cnt = 0;

            /* Переинициализация */
            init_ds18b20(&ow_conf[i].OneWire,
                         ow_conf[i].OneWirePort,
                         ow_conf[i].OneWirePin, &ow_conf[i].owflag,
                         &ow_conf[i].temp_cnt, ds18b20[i].id, i);

            if (ow_conf[i].owflag && ow_conf[i].temp_cnt > 0) {
              ds18b20[i].onoff = 1;
              ds18b20[i].numsens = ow_conf[i].temp_cnt;
              for (uint8_t k = 0; k < ds18b20[i].numsens; k++) {
                ds18b20[i].sensors[k].valid = true;
                ds18b20[i].sensors[k].errorflg = false;
              }
              mark_slice_dirty(&g_ver_sensors);
              mark_slice_dirty(&g_ver_onewire);
              mark_slice_dirty(&g_ver_pins);
              printf("[INFO] DS18B20 bus idx %d REINIT OK - %d sensors found!\r\n",
                     i, ds18b20[i].numsens);
            } else {
              /* Не удалось — снова отключаем, попробуем через DS18B20_REINIT_INTERVAL_MS */
              ds18b20[i].auto_disabled = 1;
              printf("[WARN] DS18B20 bus idx %d reinit FAILED — will retry in %d sec.\r\n",
                     i, DS18B20_REINIT_INTERVAL_MS / 1000);
            }
          }
        }
      }
    }
    mark_slice_dirty(&g_ver_sensors);
    osDelay(2000);
  }
  /* USER CODE END StartDs18b20Task */
}

/* USER CODE BEGIN Header_StartDht22Task */
/**
 * @brief Function implementing the dht22Task thread.
 * @param argument: Not used
 * @retval None
 */
/* USER CODE END Header_StartDht22Task */
void StartDht22Task(void *argument)
{
  /* USER CODE BEGIN StartDht22Task */
  ulTaskNotifyTake(0, portMAX_DELAY);
  uint8_t dhtcount = 0;
  uint8_t owpinnum = 0;

  printf("\r\n[DEBUG] Searching for DHT22 sensors...\r\n");
  // Initialize configuration array
  for (uint8_t i = 0; i < NUMPIN; i++) {
    if (PinsConf[i].topin == 4) {
      for (uint8_t j = 0; j < MAX_DHT22_P; j++) {
//        printf("+++ i = %d j = %d \r\n", i, j);
        if (dht22[j].id == i && dht22[j].typsensr == 2) {
          DHT22_Init(j, i);
          dht22[j].valid = true;
          dht22[j].onoff = 1;
          dhtcount++;
          owpinnum++;
        }
      }
    }
  }

  if (dhtcount != 0) {
    printf("[DEBUG] Found DHT22 sensors: %d\r\n", dhtcount);
  } else {
    printf("[DEBUG] No DHT22 sensors found!\r\n");
  }
  /* Infinite loop */
  for (;;) {
    if (dhtcount != 0) {
      for (uint8_t i = 0; i < MAX_DHT22_P; i++) {
        if (dht22[i].onoff) {
          process_dht22(i);
        }
      }
      check_DHT22_limits();
    }
    mark_slice_dirty(&g_ver_sensors);
    osDelay(2000);
  }
  /* USER CODE END StartDht22Task */
}

/* USER CODE BEGIN Header_StartServiceTask */
/**
 * @brief Function implementing the ServiceTask thread.
 * @param argument: Not used
 * @retval None
 */
/* ── Вспомогательные функции для sunrise/sunset ──
 * Вынесены из StartServiceTask — GCC nested functions используют трамплины
 * на стеке, что вызывает HardFault на Cortex-M7 (XN-protected SRAM). */
static double svc_degToRad(double degree) { return (degree * PI / 180.0); }
static double svc_radToDeg(double radian) { return (radian * 180.0 / PI); }

static int svc_dayOfYear(int yr, uint8_t mon, uint8_t d) {
  int N1 = floor(275 * mon / 9);
  int N2 = floor((mon + 9) / 12);
  int N3 = (1 + floor((yr - 4 * floor(yr / 4) + 2) / 3));
  return N1 - (N2 * N3) + d - 30;
}

static double svc_calculateSunriseOrSunset(int isSunrise) {
  int N = svc_dayOfYear(year, month, day);
  // Convert the SetSettings.lon_de to hour value and calculate an approximate
  // time
  double lngHour = SetSettings.lon_de / 15.0;
  double t = N + ((isSunrise ? 6 : 18) - lngHour) / 24;
  // Calculate the Sun's mean anomaly
  double M = (0.9856 * t) - 3.289;
  // Calculate the Sun's true longitude
  double L = fmod(M + (1.916 * sin(svc_degToRad(M))) +
                      (0.020 * sin(2 * svc_degToRad(M))) + 282.634,
                  360.0);
  // Calculate the Sun's right ascension
  double RA = fmod(svc_radToDeg(atan(0.91764 * tan(svc_degToRad(L)))), 360.0);
  // Right ascension value needs to be in the same quadrant as L
  double Lquadrant = floor(L / 90) * 90;
  double RAquadrant = floor(RA / 90) * 90;
  RA = RA + (Lquadrant - RAquadrant);
  // Right ascension value needs to be converted into hours
  RA = RA / 15;
  // Calculate the Sun's declination
  double sinDec = 0.39782 * sin(svc_degToRad(L));
  double cosDec = cos(asin(sinDec));
  // Calculate the Sun's local hour angle
  double cosH =
      (sin(svc_degToRad(ZENITH)) - (sinDec * sin(svc_degToRad(SetSettings.lat_de)))) /
      (cosDec * cos(svc_degToRad(SetSettings.lat_de)));
  if (cosH > 1 || cosH < -1) {
    return -1; // The sun never rises/sets on this location on the specified
               // date
  }
  // Finish calculating H and convert into hours
  double H = isSunrise ? 360 - svc_radToDeg(acos(cosH)) : svc_radToDeg(acos(cosH));
  H = H / 15;
  // Calculate local mean time of rising/setting
  double T = H + RA - (0.06571 * t) - 6.622;
  // Adjust back to UTC
  double UT = fmod(T - lngHour + 24.0, 24.0);
  // Convert UT value to local time zone of
  // SetSettings.lat_de/SetSettings.lon_de
  double localT = fmod(UT + SetSettings.timezone + 24.0, 24.0);
  return localT;
}

static void svc_printResults(void) {
  double sunrise = svc_calculateSunriseOrSunset(1);
  double sunset = svc_calculateSunriseOrSunset(0);
  if (sunrise == -1 || sunset == -1) {
    printf("The sun doesn't rise or set on this day at this location.\n");
  } else {
    int sunriseHour = (int)sunrise;
    int sunriseMinute = (int)((sunrise - sunriseHour) * 60);
    int sunsetHour = (int)sunset;
    int sunsetMinute = (int)((sunset - sunsetHour) * 60);
    // Сохранение времени восхода солнца
    snprintf(SetSettings.sunrise,
             sizeof(SetSettings.sunrise),
             "%02d:%02d",
             sunriseHour,
             sunriseMinute);
    // Сохранение времени заката солнца
    snprintf(SetSettings.sunset,
             sizeof(SetSettings.sunset),
             "%02d:%02d",
             sunsetHour,
             sunsetMinute);
    // Calculate day length
    double dayLength = sunset - sunrise;
    if (dayLength < 0)
      dayLength += 24;
    int dayLengthHours = (int)dayLength;
    int dayLengthMinutes = (int)((dayLength - dayLengthHours) * 60);
    // Сохранение длины светового дня
    snprintf(SetSettings.dlength,
             sizeof(SetSettings.dlength),
             "%02d:%02d",
             dayLengthHours,
             dayLengthMinutes);
  }
}

/* USER CODE END Header_StartServiceTask */
void StartServiceTask(void *argument)
{
  /* USER CODE BEGIN StartServiceTask */
  ulTaskNotifyTake(0, portMAX_DELAY);
  //	static uint8_t moonflag = 0; // Счетчик
  static uint8_t prevday = 0;    // Для отслеживания смены дня
  static uint8_t prevmin = 0xFF; // Для отслеживания смены минуты
  //	DateTime nextfullmoon; // Declare nextFullMoon outside the loop
  DateTime nextfullmnlcl; // Local time version of nextFullMoon
  /* ── PWM Fade тик-счётчик ── */
  static uint32_t fade_tick = 0;
  /* Infinite loop */
  for (;;) {
/* ═══════════════════════════════════════════════
 *  БЛОК PWM Fade — каждые 1000 мс (НОВОЕ)
 * ═══════════════════════════════════════════════ */
	    if (HAL_GetTick() - fade_tick >= 1000) {
	      fade_tick = HAL_GetTick();
          mark_slice_dirty(&g_ver_common);
          mark_slice_dirty(&g_ver_sensors);
          mark_slice_dirty(&g_ver_pid);
          mark_slice_dirty(&g_ver_onewire);
          mark_slice_dirty(&g_ver_encoder);
          mark_slice_dirty(&g_ver_pins);
	      for (int i = 0; i < NUMPIN; i++) {
	        if (!fade_state[i].active)   continue;
	        if (PinsConf[i].topin != 5)  continue;
	        if (is_pin_in_autotune(i))   continue; /* AutoTune lock */

	        /* Encoder onoff — ПРИОРИТЕТНЫЙ рубильник */
	        bool enc_on = true;
	        for (uint8_t a = 0; a < NUMPINLINKS; a++) {
	            if (PinsLinks[a].idout == i) {
	                uint8_t enc_id = PinsLinks[a].idin;
	                if (PinsConf[enc_id].topin == 8 && PinsConf[enc_id].onoff == 0) {
	                    enc_on = false;
	                    break;
	                }
	            }
	        }
	        if (!enc_on) {
	            // Гасим PWM и блокируем — БЕЗОПАСНОСТЬ
	            __HAL_TIM_SET_COMPARE(&htim[i], PinsInfo[i].tim_channel, 0);
	            fade_state[i].active = false;
	            continue;
	        }

	        /* ── Timer onoff — останавливаем fade, PWM не трогаем ── */
	        bool timer_on = false;
	        for (int t = 0; t < MAXSIZE; t++) {
	            if (dbCrontxt[t].onoff == 1) {
	                /* Проверяем что этот cron управляет именно этим PWM */
	                char tmp[sizeof(dbCrontxt[t].activ)];
	                strncpy(tmp, dbCrontxt[t].activ, sizeof(tmp) - 1);
	                tmp[sizeof(tmp) - 1] = '\0';
	                char needle[12];
	                snprintf(needle, sizeof(needle), "pwm:%d,", i);
	                if (strstr(tmp, needle) != NULL) {
	                    timer_on = true;
	                    break;
	                }
	            }
	        }
	        if (!timer_on) {
	            /* Таймер выключен — останавливаем fade на текущем значении */
	            fade_state[i].active = false;
	            printf("PWM fade stopped by Timer OFF: id=%d at %d%%\r\n",
	                   i, PinsConf[i].dvalue);
	            continue; /* PWM НЕ трогаем — остаётся на текущем значении */
	        }
	        /* ──────────────────────────────────────────────────────── */

	        fade_state[i].steps_left--;
	        fade_state[i].current_duty += fade_state[i].delta;

	        /* Клампинг 0–100% */
	        if (fade_state[i].current_duty < 0.0f)
	            fade_state[i].current_duty = 0.0f;
	        if (fade_state[i].current_duty > 100.0f)
	            fade_state[i].current_duty = 100.0f;

	        int d = (int)(fade_state[i].current_duty + 0.5f);

	        /* На последнем шаге гарантируем точное финальное значение */
	        if (fade_state[i].steps_left == 0) {
	          d = fade_state[i].end_duty;
	          fade_state[i].active = false;
//	          printf("PWM fade done: id=%d final=%d%%\r\n", i, d);
	        }

	        PinsConf[i].dvalue = d;
	        uint32_t pulse = (uint32_t)((uint64_t)d
	                          * PinsConf[i].pwmmax / 100ULL);
	        __HAL_TIM_SET_COMPARE(&htim[i], PinsInfo[i].tim_channel, pulse);
            /* MQTT: send_mqtt_timer_batch() отслеживает PWM duty раз в 1с */
	      }
	    }
/* ═══════════════════════════════════════════════
 *  End PWM Fade
 * ═══════════════════════════════════════════════ */

    if (day != prevday) {
      prevday = day;
      // Calculate after system reboot
      svc_printResults();
      if (year != 0000) { // Ensure year is set
        calculateMoonPhase((DateTime){year, month, day, timez_copy.tm_hour,
                                      timez_copy.tm_min, timez_copy.tm_sec},
                           &nextfullmnlcl);
        nextfullmnlcl.hour += SetSettings.timezone; // Adjust for timezone
        if (nextfullmnlcl.hour >= 24) {
          nextfullmnlcl.hour -= 24;
          nextfullmnlcl.day++;
        }
        // Store the full moon data in the correct format
        uint8_t len = snprintf(
            SetSettings.fullmoon, sizeof(SetSettings.fullmoon),
            "%02d.%02d.%04d %02d:%02d", nextfullmnlcl.day, nextfullmnlcl.month,
            nextfullmnlcl.year, nextfullmnlcl.hour, nextfullmnlcl.minute);
        if (len < 0 || (size_t)len >= sizeof(SetSettings.fullmoon)) {
          printf("ERROR: len > setsettings.fullmoon! \n");
        }
      }
      if (SetSettings.lat_de != 0.0 && SetSettings.lon_de != 0.0) {
        Check_SunriseSunset_Actions(); // Проверка "Sunrise/Sunset" after system
                                       // reboot
      }
    }
    if (timez_copy.tm_min != prevmin) { // Проверка раз в минуту
      prevmin = timez_copy.tm_min;
      if (timez_copy.tm_hour == 0 && timez_copy.tm_min == 1 && year != 0000) {
        //          if (moonflag < 3) { // Для уверенности 3 раза!
        if (year != 0000) { // Ensure year is set
          calculateMoonPhase((DateTime){year, month, day, timez_copy.tm_hour,
                                        timez_copy.tm_min, timez_copy.tm_sec},
                             &nextfullmnlcl);
          nextfullmnlcl.hour += SetSettings.timezone; // Adjust for timezone
          if (nextfullmnlcl.hour >= 24) {
            nextfullmnlcl.hour -= 24;
            nextfullmnlcl.day++;
          }
          // Store the full moon data in the correct format
          uint8_t len =
              snprintf(SetSettings.fullmoon, sizeof(SetSettings.fullmoon),
                       "%02d.%02d.%04d %02d:%02d", nextfullmnlcl.day,
                       nextfullmnlcl.month, nextfullmnlcl.year,
                       nextfullmnlcl.hour, nextfullmnlcl.minute);
          if (len < 0 || (size_t)len >= sizeof(SetSettings.fullmoon)) {
            printf("ERROR: len > setsettings.fullmoon! \n");
          }
        }
      }
      if (SetSettings.lat_de != 0.0 && SetSettings.lon_de != 0.0) {
        Check_SunriseSunset_Actions(); // Проверка "Sunrise/Sunset" один раз в
                                       // минуту.
      }
    }
    // === ПЕРИОДИЧЕСКИЙ ДАМП PWM РЕГИСТРОВ (каждые 10 секунд) ===
//    {
//      static uint32_t pwm_dbg_tick = 0;
//      if (HAL_GetTick() - pwm_dbg_tick >= 10000) {
//        pwm_dbg_tick = HAL_GetTick();
//        bool found_pwm = false;
//        for (int pi = 0; pi < NUMPIN; pi++) {
//          if (PinsConf[pi].topin == 5 && PinsInfo[pi].tim != NULL) {
//            found_pwm = true;
//            printf("\r\n--- PWM [%d] %s (10s tick) ---\r\n", pi,
//                   PinsInfo[pi].pins);
//            printf("  dvalue=%d  pwmmax=%d  pwm=%d mHz\r\n",
//                   PinsConf[pi].dvalue, PinsConf[pi].pwmmax, PinsConf[pi].pwm);
//            printf("  CR1=0x%04lX(EN=%lu)  ARR=%lu  PSC=%lu\r\n",
//                   (unsigned long)PinsInfo[pi].tim->CR1,
//                   (unsigned long)(PinsInfo[pi].tim->CR1 & TIM_CR1_CEN),
//                   (unsigned long)PinsInfo[pi].tim->ARR,
//                   (unsigned long)PinsInfo[pi].tim->PSC);
//            uint32_t ccr = 0;
//            if (PinsInfo[pi].tim_channel == TIM_CHANNEL_1)
//              ccr = PinsInfo[pi].tim->CCR1;
//            else if (PinsInfo[pi].tim_channel == TIM_CHANNEL_2)
//              ccr = PinsInfo[pi].tim->CCR2;
//            else if (PinsInfo[pi].tim_channel == TIM_CHANNEL_3)
//              ccr = PinsInfo[pi].tim->CCR3;
//            else if (PinsInfo[pi].tim_channel == TIM_CHANNEL_4)
//              ccr = PinsInfo[pi].tim->CCR4;
//            printf("  CCR(ch%lu)=%lu\r\n",
//                   (unsigned long)PinsInfo[pi].tim_channel, (unsigned long)ccr);
//            if (PinsInfo[pi].tim == TIM1 || PinsInfo[pi].tim == TIM8)
//              printf("  BDTR=0x%08lX  MOE=%lu  <<< MUST be 1!\r\n",
//                     (unsigned long)PinsInfo[pi].tim->BDTR,
//                     (unsigned long)((PinsInfo[pi].tim->BDTR >> 15) & 1));
//          }
//        }
//        if (!found_pwm){
//          printf("[PWM] No PWM pins configured (topin==5)!\r\n");}
//      }
//    }
    osDelay(500);
  }
  /* USER CODE END StartServiceTask */
}

/* USER CODE BEGIN Header_StartSIM800LTask */
/**
 * @brief Function implementing the SIM800LTask thread.
 * @param argument: Not used
 * @retval None
 */
/* USER CODE END Header_StartSIM800LTask */
void StartSIM800LTask(void *argument)
{
  /* USER CODE BEGIN StartSIM800LTask */
  ulTaskNotifyTake(0, portMAX_DELAY);
  init_sim800l_module();
  xTaskNotify(
      ConfigTaskHandle, 0,
      eNoAction); // Уведомляем ConfigTask о завершении инициализации GSM Task!
                  //	printf("Hi world! It's from GPS task! \r\n");
  /* Infinite loop */
  for (;;) {
    if (gsm_available()) { // если модуль что-то прислал
      process_sim800l_data();
    }
    osDelay(1);
  }
  /* USER CODE END StartSIM800LTask */
}

/* USER CODE BEGIN Header_StartSecurityTask */
/**
 * @brief Function implementing the SecurityTask thread.
 * @param argument: Not used
 * @retval None
 */
/* USER CODE END Header_StartSecurityTask */
void StartSecurityTask(void *argument)
{
  /* USER CODE BEGIN StartSecurityTask */
  ulTaskNotifyTake(0, portMAX_DELAY);
  /* Infinite loop */
  for (;;) {
    uint32_t currtime = HAL_GetTick();

    for (int i = 0; i < NUMPIN; i++) {
      if (PinsConf[i].topin != 10)
        continue;

      uint8_t current_state =
          HAL_GPIO_ReadPin(PinsInfo[i].gpio_name, PinsInfo[i].hal_pin);

      if (current_state != PinsConf[i].prvstate) {
        if ((currtime - PinsConf[i].deb_tm) >= DEBOUNCE_DELAY) {
          bool trigger_event = false;

          switch (PinsConf[i].ptype) {
          case 0: // PIR датчик движения
                  // Подключение: PIR->pin, None
                  // В покое - 0, при движении - 1
                  // Срабатывание на появление движения (0->1)
            trigger_event = (PinsConf[i].prvstate == 0 && current_state == 1);
            break;

          case 1: // Геркон NO (нормально разомкнутый)
                  // Подключение: 3.3V->Геркон->pin.
                  // При поднесенном магните - контакты замкнуты - 1
                  // При отсутствии магнита - контакты разомкнуты - 0
                  // Срабатывание на размыкание контактов (1->0)
            trigger_event = (PinsConf[i].prvstate == 1 && current_state == 0);
            break;

          case 2: // Геркон NC (нормально замкнутый)
                  // Подключение: 3.3V->Геркон->pin.
                  // При поднесенном магните - контакты разомкнуты - 0
                  // При отсутствии магнита - контакты замкнуты - 1
                  // Срабатывание на змыкание контактов (0->1)
            trigger_event = (PinsConf[i].prvstate == 0 && current_state == 1);
            break;
          }

          if (trigger_event) { // Если обнаружено срабатывание
            if ((currtime - PinsConf[i].lasttrg) >= 1000) {
              if (PinsConf[i].onoff && PinsConf[i].sclick[0] != '\0' &&
                  strcmp(PinsConf[i].sclick, "None") != 0) {
                action_handler(i, PinsConf[i].sclick, "Security action");

                mqtt_queue_send_safe(6, i, current_state, 0);
              }

              if (PinsConf[i].onoff && PinsConf[i].send_sms[0] != '\0' &&
                  strcmp(PinsConf[i].send_sms, "None") != 0) {
                send_sms(i);
              }

              PinsConf[i].lasttrg = currtime;
            }
          }
          PinsConf[i].prvstate = current_state;
          PinsConf[i].state = current_state;
          PinsConf[i].deb_tm = currtime;
        }
      }
    }
    osDelay(1);
  }
  /* USER CODE END StartSecurityTask */
}

/* USER CODE BEGIN Header_StartPIDTask */
/**
* @brief Function implementing the PIDTask thread.
* @param argument: Not used
* @retval None
*/
/* USER CODE END Header_StartPIDTask */
void StartPIDTask(void *argument)
{
  /* USER CODE BEGIN StartPIDTask */
  ulTaskNotifyTake(0, portMAX_DELAY);
  printf("\r\n[PID] Task started\r\n");

  /* Инициализация Ts_ms по умолчанию для слотов без пресета */
  for (int i = 0; i < PID_MAX_SLOTS; i++) {
    if (PidConf[i].preset > 0 && PidConf[i].Kp == 0.0f && PidConf[i].Ki == 0.0f) {
        // Force fully applying preset locally if Kp/Ki is zero (legacy config load fix)
        extern void apply_pid_preset_extern(int slot, uint8_t preset_idx);
        apply_pid_preset_extern(i, PidConf[i].preset);
    }
    if (PidConf[i].Ts_ms == 0) PidConf[i].Ts_ms = 1000;
    if (PidConf[i].pwm_max == 0) PidConf[i].pwm_max = 100;
    if (PidConf[i].temp_max < 1.0f) PidConf[i].temp_max = 100.0f;
  }

  /* Infinite loop */
  for(;;)
  {
    for (int i = 0; i < PID_MAX_SLOTS; i++) {
      if (PidConf[i].pwm_pin_id == 0 && PidConf[i].selsens == PID_SENS_NONE) continue;

      uint32_t now = HAL_GetTick();
      if ((now - PidConf[i].last_tick) < PidConf[i].Ts_ms) continue;
      PidConf[i].last_tick = now;

      /* 1. Чтение температуры (читаем всегда, чтобы обновлять UI) */
      float T = pid_read_temperature(i);
      if (T >= -100.0f) {
          PidConf[i].tmpcur = T;
          PidConf[i].stale_cnt = 0;  /* Сброс — датчик жив */
      } else {
          PidConf[i].stale_cnt++;
      }

      /* 2a. Авто-тюн (если запущен) — работает НЕЗАВИСИМО от onoff */
      if (PidConf[i].tune_state == PID_TUNE_STEP ||
          PidConf[i].tune_state == PID_TUNE_BIAS) {
        pid_autotune_tick(i);
        continue;
      }

      /* Если PID выключен - глушим ШИМ и интегратор, но переходим к следующему слоту */
      if (!PidConf[i].onoff) {
          if (PidConf[i].pwm_out > 0 || PidConf[i].integral != 0.0f) {
              taskENTER_CRITICAL();
              PidConf[i].pwm_out = 0;
              PidConf[i].integral = 0.0f;
              taskEXIT_CRITICAL();
              pid_set_pwm(i, 0);
          }
          continue;
      }

      /* ── Аварийное отключение PWM при потере датчика ── */
      /* Если датчик не прочитался 5 циклов подряд — АВАРИЙНО глушим ШИМ */
      #define PID_MAX_STALE_CYCLES  5
      if (PidConf[i].stale_cnt >= PID_MAX_STALE_CYCLES) {
          if (PidConf[i].pwm_out > 0) {
              printf("[PID] SENSOR LOST slot=%d - no valid T for %d cycles! "
                     "EMERGENCY PWM OFF!\r\n", i, PidConf[i].stale_cnt);
              taskENTER_CRITICAL();
              PidConf[i].pwm_out = 0;
              PidConf[i].integral = 0.0f;
              taskEXIT_CRITICAL();
              pid_set_pwm(i, 0);
          }
          continue;
      }

      /* Если датчик не прочитался, а PID включен - пропускаем расчет (чтобы не было бешеных всплесков) */
      if (T < -100.0f) continue;

      /* 2b. Аварийное отключение */
      if (T >= PidConf[i].temp_max) {
        pid_set_pwm(i, 0);
        PidConf[i].pwm_out = 0;
        printf("[PID] EMERGENCY OFF slot=%d T=%.1f >= Tmax=%.1f\r\n",
               i, T, PidConf[i].temp_max);
        continue;
      }

      /* 4. PID-регулятор */
      float error = PidConf[i].tmpset - T;
      float Ts_sec = PidConf[i].Ts_ms / 1000.0f;

      /* P */
      float P_term = PidConf[i].Kp * error;

      /* I (с anti-windup) */
      PidConf[i].integral += PidConf[i].Ki * error * Ts_sec;
      if (PidConf[i].integral > (float)PidConf[i].pwm_max)
        PidConf[i].integral = (float)PidConf[i].pwm_max;
      if (PidConf[i].integral < 0.0f)
        PidConf[i].integral = 0.0f;

      /* D */
      float D_term = 0.0f;
      if (Ts_sec > 0.0f) {
        D_term = PidConf[i].Kd * (error - PidConf[i].prev_error) / Ts_sec;
      }
      PidConf[i].prev_error = error;

      float output = PidConf[i].bias + P_term + PidConf[i].integral + D_term;

      /* Клампинг */
      if (output > (float)PidConf[i].pwm_max) output = (float)PidConf[i].pwm_max;
      if (output < 0.0f) output = 0.0f;

      /* Пауза реверса (холодильник) */
      if (PidConf[i].pause_sec > 0) {
        if (output < 1.0f && PidConf[i].pwm_out > 0) {
          PidConf[i].last_off_tick = now;
        }
        if (output > 0.0f && PidConf[i].pwm_out == 0) {
          if ((now - PidConf[i].last_off_tick) < (uint32_t)PidConf[i].pause_sec * 1000U) {
            output = 0.0f;  /* ещё рано включать */
          }
        }
      }

      PidConf[i].pwm_out = (uint8_t)(output + 0.5f);
//      printf("[PID DEBUG] slot=%d, T=%.1f, tmpset=%.1f, err=%.1f, P=%.1f, I=%.1f, out=%.1f => duty=%d\r\n",
//             i, T, PidConf[i].tmpset, error, P_term, PidConf[i].integral, output, PidConf[i].pwm_out);
      pid_set_pwm(i, PidConf[i].pwm_out);
    }
    osDelay(50);  /* базовый тик 50 мс, реальный Ts контролируется per-slot */
  }
  /* USER CODE END StartPIDTask */
}

/* USER CODE BEGIN Header_StartDgnTask */
/**
* @brief Function implementing the my_DgnTask thread.
* @param argument: Not used
* @retval None
*/
/* Функция диагностики памяти с delta-отслеживанием */
static void heap_diagnostic(void)
{
    static unsigned last_free = 0;
    static unsigned last_min_ever = 0;
    static uint32_t last_malloc_fail = 0;
    static uint32_t last_mqtt_tx_peak = 0;
    static uint32_t last_mqtt_rx_peak = 0;
    static uint32_t last_output_peak = 0;
    static uint32_t last_usb_peak = 0;
    static uint32_t last_mg_conn_peak = 0;
    static uint32_t last_mg_poll_gap_peak = 0;
    static uint32_t last_mg_poll_gap_over_50ms_cnt = 0;
    static uint32_t last_req_total = 0;
    static uint32_t last_req_encoder = 0;
    static uint32_t last_req_api = 0;
    static uint8_t first_run = 1;

    unsigned current_free = (unsigned)xPortGetFreeHeapSize();
    unsigned current_min  = (unsigned)xPortGetMinimumEverFreeHeapSize();
    uint32_t current_malloc_fail = malloc_fail_count;

    HeapStats_t stats;
    vPortGetHeapStats(&stats);

    /* Печатаем только если показатели изменились */
    if (current_free != last_free || current_min != last_min_ever ||
        current_malloc_fail != last_malloc_fail ||
        mqtt_tx_peak != last_mqtt_tx_peak ||
        mqtt_rx_peak != last_mqtt_rx_peak ||
        output_peak != last_output_peak ||
        usb_peak != last_usb_peak ||
        mg_conn_peak != last_mg_conn_peak ||
        mg_poll_gap_peak != last_mg_poll_gap_peak ||
        mg_poll_gap_over_50ms_cnt != last_mg_poll_gap_over_50ms_cnt ||
        req_total != last_req_total ||
        req_encoder != last_req_encoder ||
        req_api != last_req_api) {

        printf("\r\n=== DIAGNOSTIC REPORT ===\r\n");
        if (first_run) {
            printf("FreeRTOS free now:  %u B\r\n", current_free);
            printf("FreeRTOS min ever:  %u B\r\n", current_min);
            first_run = 0;
        } else {
            printf("FreeRTOS free now:  %u B (delta=%+d)\r\n",
                   current_free, (int)current_free - (int)last_free);
            printf("FreeRTOS min ever:  %u B (delta=%+d)\r\n",
                   current_min, (int)current_min - (int)last_min_ever);
        }

        printf("Heap free blocks:   %lu\r\n", (unsigned long)stats.xNumberOfFreeBlocks);
        printf("Largest free block: %lu B\r\n", (unsigned long)stats.xSizeOfLargestFreeBlockInBytes);
        printf("Smallest free block: %lu B\r\n", (unsigned long)stats.xSizeOfSmallestFreeBlockInBytes);
        if (stats.xAvailableHeapSpaceInBytes > 0) {
            uint32_t frag_pct = 100 - (uint32_t)((uint64_t)stats.xSizeOfLargestFreeBlockInBytes * 100 / stats.xAvailableHeapSpaceInBytes);
            printf("Fragmentation:      %lu%%\r\n", (unsigned long)frag_pct);
        }

        printf("Malloc fail count:  %lu\r\n", current_malloc_fail);
        printf("MQTT TX queue peak: %lu / 32\r\n", mqtt_tx_peak);
        printf("MQTT RX queue peak: %lu / 4\r\n", mqtt_rx_peak);
        printf("Output queue peak:  %lu / 16\r\n", output_peak);
        printf("USB queue peak:     %lu / 16\r\n", usb_peak);
        printf("Mongoose conns peak: %lu\r\n", mg_conn_peak);
        printf("Mongoose gap peak:   %lu ms (starvation cnt: %lu)\r\n", mg_poll_gap_peak, (unsigned long)mg_poll_gap_over_50ms_cnt);
        printf("HTTP Requests:      Total=%lu, API=%lu, Encoder=%lu\r\n",
               (unsigned long)req_total, (unsigned long)req_api, (unsigned long)req_encoder);
        printf("=========================\r\n");

        last_free = current_free;
        last_min_ever = current_min;
        last_malloc_fail = current_malloc_fail;
        last_mqtt_tx_peak = mqtt_tx_peak;
        last_mqtt_rx_peak = mqtt_rx_peak;
        last_output_peak = output_peak;
        last_usb_peak = usb_peak;
        last_mg_conn_peak = mg_conn_peak;
        last_mg_poll_gap_peak = mg_poll_gap_peak;
        last_mg_poll_gap_over_50ms_cnt = mg_poll_gap_over_50ms_cnt;
        last_req_total = req_total;
        last_req_encoder = req_encoder;
        last_req_api = req_api;
    }
}
/* USER CODE END Header_StartDgnTask */
void StartDgnTask(void *argument)
{
  /* USER CODE BEGIN StartDgnTask */
  /* Немного ждём после загрузки, чтобы сеть успела подняться */
  osDelay(5000);

  /* Структура для динамического отслеживания минимума свободного стека (HWM) */
  struct
  {
      osThreadId_t *handle_ptr;
      const char *name;
      unsigned min_free_words;

  } tasks[] =
  {
      {&ConfigTaskHandle,    "ConfigTask",    0xFFFF},
      {&WebServerTaskHandle, "WebServerTask", 0xFFFF},
      {&OutputTaskHandle,    "OutputTask",    0xFFFF},
      {&CronTaskHandle,      "CronTask",      0xFFFF},
      {&InputTaskHandle,     "InputTask",     0xFFFF},
      {&EncoderTaskHandle,   "EncoderTask",   0xFFFF},
      {&ds18b20TaskHandle,   "ds18b20Task",   0xFFFF},
      {&dht22TaskHandle,     "dht22Task",     0xFFFF},
      {&ServiceTaskHandle,   "ServiceTask",   0xFFFF},
      {&SIM800LTaskHandle,   "SIM800LTask",   0xFFFF},
      {&SecurityTaskHandle,  "SecurityTask",  0xFFFF},
      {&PIDTaskHandle,       "PIDTask",       0xFFFF},
      {&my_DgnTaskHandle,    "DgnTask",       0xFFFF},
      {&LoggerTaskHandle,    "LoggerTask",    0xFFFF}

  };

  const size_t num_tasks = sizeof(tasks) / sizeof(tasks[0]);
  uint32_t last_full_report = xTaskGetTickCount();

  /* Infinite loop */
  for(;;)
  {
      /*
       * Ожидаем уведомления от других кусков кода (например HTTP/SMS)
       * с уменьшенным таймаутом 5000 мс (5 секунд), чтобы чаще проверять стеки под нагрузкой.
       */
      ulTaskNotifyTake(pdTRUE, pdMS_TO_TICKS(60000));// было 5000

      heap_diagnostic();

		int printed_header = 0;

		for (size_t i = 0; i < num_tasks; i++) {
			if (tasks[i].handle_ptr && *(tasks[i].handle_ptr)) {
				unsigned current_hwm = uxTaskGetStackHighWaterMark((TaskHandle_t) *(tasks[i].handle_ptr));

				if (current_hwm < tasks[i].min_free_words) {
					if (!printed_header) {
						printf("\r\n""=== STACK HWM UPDATE ===\r\n");
						printed_header = 1;
					}

					if (tasks[i].min_free_words == 0xFFFF) {
						printf("%-15s " "initial=%u words " "(%u bytes)\r\n", tasks[i].name, current_hwm,current_hwm * 4);
					} else {
						printf("%-15s " "%u -> %u words " "(%u bytes)\r\n",
						tasks[i].name,
						tasks[i].min_free_words,
						current_hwm,
						current_hwm * 4);
					}
					tasks[i].min_free_words = current_hwm;
				}
			}
		}

		if (printed_header) {
			printf("========================\r\n");
		}

		/*
		 * Полный отчёт раз в час
		 */
		if ((xTaskGetTickCount() - last_full_report) > pdMS_TO_TICKS(3600000)) {
			last_full_report = xTaskGetTickCount();

			printf("\r\n" "=== STACK WATERMARK ===\r\n");

			for (size_t i = 0; i < num_tasks; i++) {
				if (tasks[i].handle_ptr && *(tasks[i].handle_ptr)) {
					UBaseType_t hwm = uxTaskGetStackHighWaterMark((TaskHandle_t) *(tasks[i].handle_ptr));
					printf("%-15s %lu words " "(%lu bytes)\r\n", tasks[i].name, (uint32_t) hwm, (uint32_t) hwm * 4);
				}
			}

			printf("\r\n""=== HEAP ===\r\n");
			printf("Free bytes: %lu\r\n",
			(uint32_t) xPortGetFreeHeapSize());
			printf("Min ever: %lu\r\n",
			(uint32_t) xPortGetMinimumEverFreeHeapSize());
			printf("Malloc fail count: %lu\r\n", malloc_fail_count);

			printf("\r\n""=== QUEUE PEAKS ===\r\n");
			printf("MQTT TX peak:  %lu / 32\r\n", mqtt_tx_peak);
			printf("MQTT RX peak:  %lu / 4\r\n", mqtt_rx_peak);
			printf("Output peak:   %lu / 16\r\n", output_peak);
			printf("USB peak:      %lu / 16\r\n", usb_peak);

			printf("\r\n""=== MONGOOSE PEAKS ===\r\n");
			printf("Conns peak:    %lu\r\n", mg_conn_peak);
			printf("Poll gap peak: %lu ms (starvation cnt: %lu)\r\n", mg_poll_gap_peak, (unsigned long)mg_poll_gap_over_50ms_cnt);

			printf("\r\n""=== RUNTIME ===\r\n");
			printf("Tick=%lu\r\n",
			(uint32_t) xTaskGetTickCount());
			printf("===================\r\n");
      }
  }
  /* USER CODE END StartDgnTask */
}

/* USER CODE BEGIN Header_StartLoggerTask */
/**
* @brief Function implementing the LoggerTask thread.
* @param argument: Not used
* @retval None
*/
/* USER CODE END Header_StartLoggerTask */
void StartLoggerTask(void *argument)
{
  /* USER CODE BEGIN StartLoggerTask */
    (void)argument;
    char rx_buf[192 + 16];
  /* Infinite loop */
  for(;;)
  {
      if (xMessageBuffer != NULL) {
          /* Если все категории отключены — не тратим CPU на приём и UART */
          if (g_log_filter_mask == 0) {
              /* Сливаем остатки сообщений, которые могли остаться в буфере */
              while (xMessageBufferReceive(xMessageBuffer, rx_buf, sizeof(rx_buf) - 1, 0) > 0) {}
              osDelay(200); /* спим 200ms, пользователь может включить фильтр в любой момент */
              continue;
          }

          size_t bytes_received = xMessageBufferReceive(xMessageBuffer, rx_buf, sizeof(rx_buf) - 1, portMAX_DELAY);
          if (bytes_received > 1) {
              LogCategory_t cat = (LogCategory_t)rx_buf[0];
              char *msg = rx_buf + 1;
              rx_buf[bytes_received] = '\0';

              if (cat < LOG_CAT_COUNT && (g_log_filter_mask & (1u << cat))) {
                  int prefix_len = strlen(cat_prefixes[cat]);
                  int msg_len = strlen(msg);
                  int total = prefix_len + msg_len;
                  /* Сборка в один буфер для одной неблокирующей передачи */
                  char tx_buf[256];
                  if (total < (int)sizeof(tx_buf)) {
                      memcpy(tx_buf, cat_prefixes[cat], prefix_len);
                      memcpy(tx_buf + prefix_len, msg, msg_len);
                      // Bounded timeout: 200ms хватает на ~2300 байт на 115200 bps
                      HAL_UART_Transmit(&huart3, (uint8_t*)tx_buf, total, 200);
                  }
              }
          }
      } else {
          osDelay(100);
      }
  }
  /* USER CODE END StartLoggerTask */
}

 /* MPU Configuration */

void MPU_Config(void)
{
  MPU_Region_InitTypeDef MPU_InitStruct = {0};

  /* Disables the MPU */
  HAL_MPU_Disable();

  /*--- Region 0: Вся AXI SRAM 0x20020000..0x2007FFFF (384 KB) ---
   * Normal memory, Non-cacheable, Non-shareable.
   * Покрывает ВСЮ AXI SRAM (SRAM1 368KB + SRAM2 16KB).
   * FreeRTOS heap, .bss, стеки задач — всё здесь.
   * MPU требует size = power-of-2, BaseAddress кратен size.
   * Используем 512KB от 0x20000000 и отключаем sub-region 0
   * (0x20000000-0x2001FFFF = DTCM, не нуждается в MPU).
   */
  MPU_InitStruct.Enable = MPU_REGION_ENABLE;
  MPU_InitStruct.Number = MPU_REGION_NUMBER0;
  MPU_InitStruct.BaseAddress = 0x20000000;
  MPU_InitStruct.Size = MPU_REGION_SIZE_512KB;
  MPU_InitStruct.SubRegionDisable = 0x0;  /* Все sub-regions включены */
  MPU_InitStruct.TypeExtField = MPU_TEX_LEVEL1; /* TEX=001, C=0, B=0 → Normal, Non-cacheable */
  MPU_InitStruct.AccessPermission = MPU_REGION_FULL_ACCESS;
  MPU_InitStruct.DisableExec = MPU_INSTRUCTION_ACCESS_DISABLE;
  MPU_InitStruct.IsShareable = MPU_ACCESS_NOT_SHAREABLE;
  MPU_InitStruct.IsCacheable = MPU_ACCESS_NOT_CACHEABLE;
  MPU_InitStruct.IsBufferable = MPU_ACCESS_NOT_BUFFERABLE;

  HAL_MPU_ConfigRegion(&MPU_InitStruct);

  /* Enables the MPU */
  HAL_MPU_Enable(MPU_PRIVILEGED_DEFAULT);

}

/**
  * @brief  Period elapsed callback in non blocking mode
  * @note   This function is called  when TIM6 interrupt took place, inside
  * HAL_TIM_IRQHandler(). It makes a direct call to HAL_IncTick() to increment
  * a global variable "uwTick" used as application time base.
  * @param  htim : TIM handle
  * @retval None
  */
void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim)
{
  /* USER CODE BEGIN Callback 0 */

  /* USER CODE END Callback 0 */
  if (htim->Instance == TIM6) {
    HAL_IncTick();
  }
  /* USER CODE BEGIN Callback 1 */

  /* USER CODE END Callback 1 */
}

/**
  * @brief  This function is executed in case of error occurrence.
  * @retval None
  */
void Error_Handler(void)
{
  /* USER CODE BEGIN Error_Handler_Debug */
  /* Диагностика: кто вызвал Error_Handler? */
  __disable_irq();

  /* Прямой вывод в USART3 — без HAL (HAL может быть сломан) */
  volatile uint32_t *ISR = (volatile uint32_t *)(0x40004800 + 0x1C);
  volatile uint32_t *TDR = (volatile uint32_t *)(0x40004800 + 0x28);

  const char *msg = "\r\n\r\n!!! Error_Handler() called !!!\r\n  Caller LR = 0x";
  while (*msg) {
    volatile uint32_t t = 2000000;
    while (!((*ISR) & (1 << 7)) && --t) {}
    *TDR = (uint32_t)*msg++;
  }

  /* Выводим адрес вызывающей функции */
  uint32_t lr = (uint32_t)__builtin_return_address(0);
  const char hex[] = "0123456789ABCDEF";
  for (int i = 28; i >= 0; i -= 4) {
    volatile uint32_t t = 2000000;
    while (!((*ISR) & (1 << 7)) && --t) {}
    *TDR = (uint32_t)hex[(lr >> i) & 0xF];
  }

  const char *msg2 = "\r\n  Use: arm-none-eabi-addr2line -e firmware.elf 0x";
  while (*msg2) {
    volatile uint32_t t = 2000000;
    while (!((*ISR) & (1 << 7)) && --t) {}
    *TDR = (uint32_t)*msg2++;
  }
  for (int i = 28; i >= 0; i -= 4) {
    volatile uint32_t t = 2000000;
    while (!((*ISR) & (1 << 7)) && --t) {}
    *TDR = (uint32_t)hex[(lr >> i) & 0xF];
  }
  const char *msg3 = "\r\n  System halted. All 3 LEDs blink.\r\n";
  while (*msg3) {
    volatile uint32_t t = 2000000;
    while (!((*ISR) & (1 << 7)) && --t) {}
    *TDR = (uint32_t)*msg3++;
  }

  /* Мигание ВСЕХ 3 LED — паттерн Error_Handler */
  while (1) {
    HAL_GPIO_TogglePin(LD1_GPIO_Port, LD1_Pin);
    HAL_GPIO_TogglePin(LD2_GPIO_Port, LD2_Pin);
    HAL_GPIO_TogglePin(LD3_GPIO_Port, LD3_Pin);
    for(volatile uint32_t i = 0; i < 500000; i++);
  }
  /* USER CODE END Error_Handler_Debug */
}

#ifdef  USE_FULL_ASSERT
/**
  * @brief  Reports the name of the source file and the source line number
  *         where the assert_param error has occurred.
  * @param  file: pointer to the source file name
  * @param  line: assert_param error line source number
  * @retval None
  */
void assert_failed(uint8_t *file, uint32_t line)
{
  /* USER CODE BEGIN 6 */
  /* User can add his own implementation to report the file name and line
     number, ex: printf("Wrong parameters value: file %s on line %d\r\n", file,
     line) */
  /* USER CODE END 6 */
}
#endif /* USE_FULL_ASSERT */
