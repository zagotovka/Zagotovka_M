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
#include "mongoose.h"
#include "hal.h"
#include "net.h"
#include "db.h"
#include "multi_button.h"
#include "cJSON.h"
#include "setings.h"

#include "stdio.h"/* для printf */
#include <string.h>
#include "lwdtc.h"
#include "ds18b20.h"
#include "ds18b20Config.h"
#include "zagotovka.h"
#include "mongoose.h"
#include <math.h>
#include <time.h>
#include <inttypes.h> // Для поддержки PRIuPTR

#include "usart_ring.h"
#include "gsm.h"

#define BLINK_PERIOD_MS 1000  // LED blinking period in millis
#define DEBOUNCE_DELAY 45 //Encoder (ms)

#define PI 3.14159265358979323846
#define ZENITH -.83  // Средняя атмосферная рефракция.

extern OneWire_t    OneWire;
extern uint8_t	    OneWireDevices;
extern uint8_t 	    temp_cnt;
extern uint8_t		Ds18b20StartConvert;
extern uint16_t	    Ds18b20Timeout;
extern uint64_t s_boot_timestamp;
uint32_t onoffid;
extern onewire_config_t ow_conf[MAX_DS18B20_P + MAX_DHT22_P];
struct Button button[NUMPIN];
extern uint8_t onlineFlg;
extern uint8_t gsm_rx_buffer[GSM_RX_BUFFER_SIZE];
extern volatile gsm_rx_buffer_index_t gsm_rx_buffer_head;
uint8_t RxByte; // Буфер для приема одного байта по UART

uint8_t owflag = 0;

ds18b20_pin_t ds18b20[MAX_DS18B20_P];
dht22_pin_t dht22[MAX_DHT22_P];

MqttMessage_t mqttMsg;
char mqtt_topic[100];
char mqtt_payload[300];
/* USER CODE END Includes */

/* Private typedef -----------------------------------------------------------*/
/* USER CODE BEGIN PTD */
TIM_HandleTypeDef htim[NUMPIN];
uint8_t usbnum = 0;
uint8_t mqttnum = 0;
uint8_t sumowpin = 0;
data_pin_t data_pin;
/* USER CODE END PTD */

/* Private define ------------------------------------------------------------*/
/* USER CODE BEGIN PD */

/* USER CODE END PD */

/* Private macro -------------------------------------------------------------*/
/* USER CODE BEGIN PM */
// Cron variable
struct tm *timez;
time_t cronetime;
time_t cronetime_old;
time_t moontime = (time_t)-1;
int year;
int month;
int day;
char str[40] = { 0 };
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

ETH_HandleTypeDef heth;

RNG_HandleTypeDef hrng;

TIM_HandleTypeDef htim1;

UART_HandleTypeDef huart2;
UART_HandleTypeDef huart3;

/* Definitions for ConfigTask */
osThreadId_t ConfigTaskHandle;
const osThreadAttr_t ConfigTask_attributes = {
  .name = "ConfigTask",
  .stack_size = 512 * 4,
  .priority = (osPriority_t) osPriorityNormal,
};
/* Definitions for WebServerTask */
osThreadId_t WebServerTaskHandle;
const osThreadAttr_t WebServerTask_attributes = {
  .name = "WebServerTask",
  .stack_size = 2048 * 4,
  .priority = (osPriority_t) osPriorityNormal,
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
/* Definitions for mqttTask */
osThreadId_t mqttTaskHandle;
const osThreadAttr_t mqttTask_attributes = {
  .name = "mqttTask",
  .stack_size = 512 * 4,
  .priority = (osPriority_t) osPriorityNormal,
};
/* Definitions for ds18b20Task */
osThreadId_t ds18b20TaskHandle;
const osThreadAttr_t ds18b20Task_attributes = {
  .name = "ds18b20Task",
  .stack_size = 512 * 4,
  .priority = (osPriority_t) osPriorityNormal,
};
/* Definitions for dht22Task */
osThreadId_t dht22TaskHandle;
const osThreadAttr_t dht22Task_attributes = {
  .name = "dht22Task",
  .stack_size = 512 * 4,
  .priority = (osPriority_t) osPriorityNormal,
};
/* Definitions for ServiceTask */
osThreadId_t ServiceTaskHandle;
const osThreadAttr_t ServiceTask_attributes = {
  .name = "ServiceTask",
  .stack_size = 512 * 4,
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
/* USER CODE BEGIN PV */
extern struct dbSettings SetSettings;
extern struct dbCron dbCrontxt[MAXSIZE];
extern struct dbPinsConf PinsConf[NUMPIN];
extern struct dbPinsInfo PinsInfo[NUMPIN];
extern struct dbPinToPin PinsLinks[NUMPINLINKS];

extern ApplicationTypeDef Appli_state;
/**************************** GSM ***************************************/
char dtmf_buf[DTMF_BUF_SIZE] = {0}; // Buffer to store DTMF digits
uint8_t dtmf_idx = 0;  // Index for DTMF buffer
char vldpins[240] = { 0 };  // Буфер для валидных пинов
char invpins[256] = { 0 };  // Буфер для невалидных пинов

int validcnt = 0; // Счетчик для запятых в valid_pins
int invldcnt = 0; // Счетчик для запятых в invalid_pins
char buf[GSM_RX_BUFFER_SIZE] = { 0, };
char str2[GSM_RX_BUFFER_SIZE] = { 0, };
/*************************** END GSM ************************************/
/* USER CODE END PV */

/* Private function prototypes -----------------------------------------------*/
void SystemClock_Config(void);
static void MX_GPIO_Init(void);
static void MX_ETH_Init(void);
static void MX_USART3_UART_Init(void);
static void MX_RNG_Init(void);
static void MX_TIM1_Init(void);
static void MX_USART2_UART_Init(void);
void StartConfigTask(void *argument);
void StartWebServerTask(void *argument);
void StartOutputTask(void *argument);
void StartCronTask(void *argument);
void StartInputTask(void *argument);
void StartEncoderTask(void *argument);
void StartMqttTask(void *argument);
void StartDs18b20Task(void *argument);
void StartDht22Task(void *argument);
void StartServiceTask(void *argument);
void StartSIM800LTask(void *argument);
void StartSecurityTask(void *argument);

/* USER CODE BEGIN PFP */

/* USER CODE END PFP */

/* Private user code ---------------------------------------------------------*/
/* USER CODE BEGIN 0 */
/*********************** для printf ******************************/
#ifdef __GNUC__
/* With GCC/RAISONANCE, small printf (option LD Linker->Libraries->Small printf set to 'Yes') calls __io_putchar() */
#define PUTCHAR_PROTOTYPE int __io_putchar(int ch)
#else
#define PUTCHAR_PROTOTYPE int fputc(int ch, FILE *f)
#endif /* __GNUC__ */
/*********************** M ******************************/
#define LAN8742A_PHY_ADDRESS       0x00
#define LAN8742A_BSR               0x01
#define LAN8742A_BSR_LINK_STATUS       0x0004
#define LAN8742A_BSR_AUTONEGO_COMPLETE 0x0020

static bool quick_network_check(void) {
    uint32_t phyreg;
    uint32_t retry_count = 3;

    while (retry_count--) {
        // Чтение Basic Status Register (BSR)
        HAL_ETH_ReadPHYRegister(&heth, LAN8742A_PHY_ADDRESS, LAN8742A_BSR, &phyreg);

        if ((phyreg & LAN8742A_BSR_LINK_STATUS) && (phyreg & LAN8742A_BSR_AUTONEGO_COMPLETE)) {
            return true;
        }

        HAL_Delay(10);
    }

    return false;
}

const char *s_sub_topic = SetSettings.rxmqttop;// Rx topic

void mg_random(void *buf, size_t len) {  // Use on-board RNG
  extern RNG_HandleTypeDef hrng;
  for (size_t n = 0; n < len; n += sizeof(uint32_t)) {
    uint32_t r;
    HAL_RNG_GenerateRandomNumber(&hrng, &r);
    memcpy((char *) buf + n, &r, n + sizeof(r) > len ? len - n : sizeof(r));
  }
}

static void timer_fn(void *arg) {
  struct mg_tcpip_if *ifp = arg; // And show
  const char *names[] = {"down", "up", "req", "ready"};  // network stats
  MG_INFO(("Ethernet: %s, IP: %M, rx:%u, tx:%u, dr:%u, er:%u",
           names[ifp->state], mg_print_ip4, &ifp->ip, ifp->nrecv, ifp->nsent,
           ifp->ndrop, ifp->nerr));
}

uint64_t mg_millis(void) {
  return HAL_GetTick();
}
static void fn(struct mg_connection *c, int ev, void *ev_data, void *fn_data) {
//	printf("Event received: %d\n", ev);
	switch (ev) {
		case MG_EV_OPEN:
			MG_INFO(("%lu CREATED", c->id));
//			printf("Connection created: %lu\n", c->id);
			break;
		case MG_EV_ERROR:
			MG_ERROR(("%lu ERROR %s", c->id, (char *) ev_data));
//			printf("Error occurred: %lu ERROR %s\n", c->id, (char *) ev_data);
			break;
		case MG_EV_CONNECT:
//			printf("Connection attempt: %lu\n", c->id);
			if (mg_url_is_ssl(get_mqtt_url())) {
//				printf("SSL connection required\n");
			}
			break;
		case MG_EV_MQTT_OPEN:
//			printf("MQTT connection opened: %lu\n", c->id);
			struct mg_str subt = mg_str(SetSettings.rxmqttop);
			struct mg_str pubt = mg_str(SetSettings.txmqttop);
			struct mg_str data = mg_str("Hello, this is a greeting from STM32 by mqtt!");
			MG_INFO(("%lu CONNECTED to %s", c->id, get_mqtt_url()));

			// Подписка
			struct mg_mqtt_opts sub_opts;
			memset(&sub_opts, 0, sizeof(sub_opts));
			sub_opts.topic = subt;
			sub_opts.qos = s_qos;
			mg_mqtt_sub(c, &sub_opts);
			printf("Subscribed topic - %.*s\n", (int) subt.len, subt.buf);

			// Публикация
			struct mg_mqtt_opts pub_opts;
			memset(&pub_opts, 0, sizeof(pub_opts));
			pub_opts.topic = pubt;
			pub_opts.message = data;
			pub_opts.qos = s_qos;
			pub_opts.retain = false;
			mg_mqtt_pub(c, &pub_opts);
			printf("Publishing to topic - %.*s\n", (int) pubt.len, pubt.buf);
			break;
		case MG_EV_MQTT_CMD:
			{
				struct mg_mqtt_message *mm = (struct mg_mqtt_message *) ev_data;
//				printf("MQTT command received: %d\n", mm->cmd);
				switch (mm->cmd) {
					case MQTT_CMD_CONNACK:
//						printf("Connection acknowledged\n");
						break;
					case MQTT_CMD_PUBACK:
//						printf("Publish acknowledged\n");
						break;
					case MQTT_CMD_PUBREC:
//						printf("Publish received\n");
						break;
					case MQTT_CMD_PUBREL:
//						printf("Publish release\n");
						break;
					case MQTT_CMD_PUBCOMP:
//						printf("Publish complete\n");
						break;
					case MQTT_CMD_SUBACK:
//						printf("Subscribe acknowledged\n");
						break;
					case MQTT_CMD_UNSUBACK:
//						printf("Unsubscribe acknowledged\n");
						break;
					case MQTT_CMD_PINGRESP:
//						printf("Ping response\n");
						break;
					default:
//						printf("Unknown MQTT command: %d\n", mm->cmd);
						break;
				}
			}
			break;
		case MG_EV_MQTT_MSG:
//			printf("MQTT message received\n");
		    struct mg_mqtt_message *mm = (struct mg_mqtt_message*) ev_data;

		    // Проверяем, что топик соответствует ожидаемому
		    if (mm->topic.len == strlen(SetSettings.rxmqttop) &&
		        strncmp(mm->topic.buf, SetSettings.rxmqttop, mm->topic.len) == 0) {

		        if (mm->data.len > 0) {
		            printf("Raw topic: '%.*s'\n", (int) mm->topic.len, mm->topic.buf);
		            printf("Expected topic prefix: '%s'\n", SetSettings.rxmqttop);
		            printf("RECEIVED on topic '%.*s', content: %.*s\n",
		                   (int) mm->topic.len, mm->topic.buf,
		                   (int) mm->data.len, (char*)mm->data.buf);

		            // Передаем содержимое payload как команду
		            mqtt_message_handler(SetSettings.rxmqttop, (const char*)mm->data.buf);
		        }
		    }
			break;
		case MG_EV_CLOSE:
			MG_INFO(("%lu CLOSED", c->id));
//			printf("Connection closed: %lu\n", c->id);
			s_conn = NULL;
			break;
		case MG_EV_POLL:
			// Убрал вывод для уменьшения шума в логах
			break;
		case MG_EV_READ:
//			printf("Data received: %" PRIuPTR " bytes\n", c->recv.len);
//			if (c->recv.len > 0) {
//				printf("Received data: ");
//				for (size_t i = 0; i < c->recv.len && i < 16; i++) {
//					printf("%02x ", c->recv.buf[i]);
//				}
//				if (c->recv.len > 16) printf("...");
//				printf("\n");
//			}
			break;
		case MG_EV_WRITE:
//			printf("Data sent: %" PRIuPTR " bytes\n", c->send.len);
			break;
		case MG_EV_RESOLVE:
			printf("DNS resolution completed\n");
			break;
		default:
//			printf("Unhandled event: %d\n", ev);
			break;
	}

	(void) fn_data;
}

static void timer_fn_mqtt(void *arg) {
  struct mg_mgr *mgr = (struct mg_mgr *) arg;
  struct mg_mqtt_opts opts = {.clean = true,
                              .qos = s_qos,
                              .topic = mg_str(get_mqtt_topic()),
                              .version = 4,
                              .message = mg_str("bye")};
  if (s_conn == NULL) s_conn = mg_mqtt_connect(mgr, get_mqtt_url(), &opts, (mg_event_handler_t) fn, NULL);
}

void send_mqtt_message(struct mg_connection *conn, const char *topic, const char *msg) {
    if (conn == NULL || conn->is_closing) {// Проверка соединения
        if (onlineFlg != 0) {
              MG_ERROR(("MQTT connection unavailable"));
          }
        return;
    }

    struct mg_mqtt_opts pub_opts;
    memset(&pub_opts, 0, sizeof(pub_opts));
    char full_topic[128];// Буфер для полного топика
    snprintf(full_topic, sizeof(full_topic), "%s%s", get_mqtt_topic(), topic);
    pub_opts.topic = mg_str(full_topic);
    pub_opts.message = mg_str(msg);
    pub_opts.qos = s_qos;
    pub_opts.retain = false;
    mg_mqtt_pub(conn, &pub_opts);
    MG_INFO(("%lu PUBLISHED %s -> %.*s", conn->id, msg, (int) pub_opts.topic.len, pub_opts.topic.buf));
}
/*********************** End M ******************************/

#ifdef __GNUC__
/* With GCC/RAISONANCE, small MG_INFO (option LD Linker->Libraries->Small MG_INFO set to 'Yes') calls __io_putchar() */
#define PUTCHAR_PROTOTYPE int __io_putchar(int ch)
#else
#define PUTCHAR_PROTOTYPE int fputc(int ch, FILE *f)
#endif /* __GNUC__ */

unsigned long Ti;
unsigned long Te;

static bool check_mqtt_connection(void* conn) {
    if (conn == NULL) {
        return false;
    }
    return true;
}

void button_event_handler(Button *handle) {// Функция callback для обработки событий кнопки
    if (handle->button_id >= NUMPIN) {
        return;
    }
	// Обработчик событий кнопки
	PressEvent event = get_button_event(handle);

	switch (event) {
	case NONE_PRESS:// Нет нажатия
		break;
	case PRESS_DOWN:// Кнопка нажата
//       printf("Button %d: PRESS_DOWN!\r\n", handle->button_id);
		break;
	case PRESS_UP:// Кнопка отпущена
//       printf("Button %d: PRESS_UP!\r\n", handle->button_id);
		break;
	case LONG_PRESS_START:// Начало долгого нажатия
//       printf("Button %d: LONG_PRESS_START!\r\n", handle->button_id);
		if (handle->button_id < NUMPIN) {
//        	 printf("PinsConf[%d].lpress content: %s\n", handle->button_id, PinsConf[handle->button_id].lpress);
			action_handler(handle->button_id, PinsConf[handle->button_id].lpress, "long press");
			// Формируем payload
			memset(mqtt_payload, 0, sizeof(mqtt_payload));
			snprintf(mqtt_payload, sizeof(mqtt_payload), "ID=%d/LONG_PRESS/%s", handle->button_id, PinsConf[handle->button_id].lpress);
			// Подготовка MQTT сообщения
			mqttMsg.command = 3;  // Команда для LONG_PRESS
			mqttMsg.deviceId = handle->button_id;
			mqttMsg.state = 1;    // Для long press
			mqttMsg.reserved = 0;
			// Отправка в очередь
			if (xQueueSend(mqttQueueHandle, &mqttMsg, 0) != pdPASS) {
				printf("Error sending LONG_PRESS to MQTT queue!\r\n");
			}
		} else {
			printf("Invalid button ID: %d\n", handle->button_id);
		}
		break;
	case LONG_PRESS_HOLD:// Продолжение долгого нажатия
//       printf("Button %d: LONG_PRESS_HOLD!\r\n", handle->button_id);
		break;
	case SINGLE_CLICK:// Одиночное нажатие кнопки
		if (handle->button_id < NUMPIN) {
			//printf("PinsConf[%d].sclick content: %s\n", handle->button_id, PinsConf[handle->button_id].sclick);
			action_handler(handle->button_id, PinsConf[handle->button_id].sclick, "sclick press");
		    // Формируем payload
			memset(mqtt_payload, 0, sizeof(mqtt_payload));
			snprintf(mqtt_payload, sizeof(mqtt_payload),"ID=%d/SINGLE_CLICK/%s", handle->button_id, PinsConf[handle->button_id].sclick);
			// Подготовка MQTT сообщения
			mqttMsg.command = 4;  // Команда для SINGLE_CLICK
			mqttMsg.deviceId = handle->button_id;
			mqttMsg.state = 2;    // Для single click
			mqttMsg.reserved = 0;
			// Отправка в очередь
			if (xQueueSend(mqttQueueHandle, &mqttMsg, 0) != pdPASS) {
				printf("Error sending SINGLE_CLICK to MQTT queue!\r\n");
			}
		    } else {
		        printf("Invalid button ID: %d\n", handle->button_id);
		    }
		    printf("Button %d: SINGLE_CLICK!\r\n", handle->button_id);
		    break;
	case DOUBLE_CLICK:// Двойное нажатие кнопки
//		printf("Button %d: DOUBLE_CLICK!\r\n", handle->button_id);
		if (handle->button_id < NUMPIN) {
//        	 rintf("PinsConf[%d].lpress content: %s\n", handle->button_id, PinsConf[handle->button_id].lpress);
			action_handler(handle->button_id, PinsConf[handle->button_id].dclick, "double press");
			// Формируем payload
			memset(mqtt_payload, 0, sizeof(mqtt_payload));
			snprintf(mqtt_payload, sizeof(mqtt_payload), "ID=%d/DOUBLE_CLICK/%s", handle->button_id, PinsConf[handle->button_id].dclick);
			// Подготовка MQTT сообщения
			mqttMsg.command = 5;  // Команда для DOUBLE_CLICK
			mqttMsg.deviceId = handle->button_id;
			mqttMsg.state = 3;    // Для double click
			mqttMsg.reserved = 0;
			// Отправка в очередь
			if (xQueueSend(mqttQueueHandle, &mqttMsg, 0) != pdPASS) {
				printf("Error sending DOUBLE_CLICK to MQTT queue!\r\n");
			}
		} else {
			printf("Invalid button ID: %d\n", handle->button_id);
		}
		break;
	case PRESS_REPEAT:// Повторное нажатие кнопки
		printf("Button %d: PRESS_REPEAT!\r\n", handle->button_id);
		break;
	default:
		// Обработка неизвестного значения event
		break;
	}
}

 void pwm_event_handler(Button* handle)
  {
      // Обработчик событий кнопки
      PressEvent event = get_button_event(handle);

      int i = 0;

      switch (event) {
          case NONE_PRESS:// Нет нажатия
              break;
          case PRESS_DOWN: // Кнопка нажата
//              printf("Button %d: PRESS_DOWN!\r\n", handle->button_id);
              break;
          case PRESS_UP: // Кнопка отпущена
//              printf("Button %d: PRESS_UP!\r\n", handle->button_id);
              break;
          case LONG_PRESS_START:// Начало долгого нажатия
              printf("Button %d: LONG_PRESS_START!\r\n", handle->button_id);
              break;
          case LONG_PRESS_HOLD:
//        	  if(PinsConf[handle->button_id].sclick == 2){
				for (uint8_t a = 0; a < NUMPINLINKS; a++) {
					if (PinsLinks[a].idin == handle->button_id) {
						//PinsInfo[i].tim->CCR1 = 50;
								// PWM
								i = PinsLinks[a].idout;
								if (PinsConf[i].topin == 5 ){
									  //for (int d = 0; d <= 11; ++d) {
									PinsConf[i].dvalue  = (int) HAL_TIM_ReadCapturedValue(&htim[i], PinsInfo[i].tim_channel);

									if(PinsConf[handle->button_id].on == 1) {
										PinsConf[i].pwmmax = 100;
										PinsConf[i].dvalue += 1;
										if(PinsConf[i].dvalue > PinsConf[i].pwmmax){
											PinsConf[i].dvalue = PinsConf[i].pwmmax;
											//pwmflag[handle->button_id] = 0;
										}
									}
									if(PinsConf[handle->button_id].on == 0) {
										PinsConf[i].dvalue -= 1;
										if(PinsConf[i].dvalue < 0){
											PinsConf[i].dvalue = 0;
											//pwmflag[handle->button_id] = 1;
										}
									}

									__HAL_TIM_SET_COMPARE(&htim[i], PinsInfo[i].tim_channel, PinsConf[i].dvalue);
									printf("PWM pwmValue %d %s \r\n", PinsConf[i].dvalue, PinsInfo[i].pins);
								}
// 						data_pin.id = PinsLinks[a].idout;
// 						data_pin.action = 2;
// 						xQueueSend(outputQueueHandle, (void* ) &data_pin, 0);
								printf("Button %d: SINGLE_CLICK PWM pwmValue %d flag %d!\r\n", handle->button_id, PinsConf[i].dvalue, PinsConf[handle->button_id].on);
					}
//				}
        	  }
        	  printf("Button %d: LONG_PRESS_HOLD!\r\n", handle->button_id);
              break;
          case SINGLE_CLICK: // Одиночное нажатие кнопки
//        	  if(PinsConf[handle->button_id].sclick == 2){
 				for (uint8_t a = 0; a < NUMPINLINKS; a++) {
 					if (PinsLinks[a].idin == handle->button_id) {
 						//PinsInfo[i].tim->CCR1 = 50;
 							//for (uint8_t i = 0; i < NUMPIN; i++) {
 								// PWM
 								i = PinsLinks[a].idout;
 								if (PinsConf[i].topin == 5){
 									  //for (int d = 0; d <= 11; ++d) {
 									PinsConf[i].dvalue  = (int) HAL_TIM_ReadCapturedValue(&htim[i], PinsInfo[i].tim_channel);
 									//printf("PWM pwmValue %d \r\n", PinsConf[i].dvalue);
 									if(PinsConf[handle->button_id].on == 1) {
 										PinsConf[i].pwmmax = 100;
 										PinsConf[i].dvalue += 1;
										if(PinsConf[i].dvalue > PinsConf[i].pwmmax){
											PinsConf[i].dvalue = PinsConf[i].pwmmax;
											PinsConf[handle->button_id].on = 0;
										}
 									}
 									if(PinsConf[handle->button_id].on == 0) {
 										PinsConf[i].dvalue -= 1;
										if(PinsConf[i].dvalue < 0){
											PinsConf[i].dvalue = 0;
											PinsConf[handle->button_id].on = 1;
										}
 									}
									__HAL_TIM_SET_COMPARE(&htim[i], PinsInfo[i].tim_channel, PinsConf[i].dvalue);
									printf("PWM pwmValue %d %s \r\n", PinsConf[i].dvalue, PinsInfo[i].pins);
 								//}
 							}

// 						data_pin.id = PinsLinks[a].idout;
// 						data_pin.action = 2;
// 						xQueueSend(outputQueueHandle, (void* ) &data_pin, 0);
 						printf("Button %d: SINGLE_CLICK PWM pwmValue %d flag %d!\r\n", handle->button_id, PinsConf[i].dvalue, PinsConf[handle->button_id].on);
 					}
 				}
//        	  }
              //printf("Button %d: SINGLE_CLICK PWM!\r\n", handle->button_id);
              break;
          case DOUBLE_CLICK: // Двойное нажатие кнопки
        	  PinsConf[handle->button_id].on ^= 1;
              printf("Button %d: DOUBLE_CLICK PWM %d!\r\n", handle->button_id, PinsConf[handle->button_id].on);
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
  uint8_t read_button_level(uint8_t button_id)
  {
      // Вернуть состояние GPIO пина, к которому подключена кнопка
 	 return  HAL_GPIO_ReadPin(PinsInfo[button_id].gpio_name, PinsInfo[button_id].hal_pin);
      //return GPIO_PIN_RESET; // Значение по умолчанию, если кнопка не найдена
  }

  /**************************** GSM ***************************************/
  uint8_t Rx_data[524]; // Укажи размер получаемых данных
  uint8_t test[524];
  volatile uint32_t tx_сntr = 0;
  volatile uint8_t needrsp = 0;
  char tx_buffer[128];
  uint32_t tx_cntr = 0;
  uint32_t zerg_t;
  uint32_t swarm_t;

  /////////////////// удалить символы \r и \n из строки //////////////////////
  static void clear_string(char *src)
  {
  char *dst = NULL;
  if(!src) return;
  uint8_t i = 0;

  for(dst = src; *src; src++)
  {
    if(i < 2 && (*src == '\n' || *src == '\r'))
    {
     i++;
     continue;
    }
    else if(*src == '\n' || *src == '\r') *src = ' ';
    *dst++ = *src;
  }
  *dst = 0;
  }
  //////////////// проверка и установка скорости 19200, нужна один раз /////////////////
  void check_speed(void)
  {
//	taskENTER_CRITICAL();
    for(uint8_t i = 0; i < 7; i++)
    {
     uint32_t sp = 0;

     if(i == 0) sp = 2400;
     else if(i == 1) sp = 4800;
     else if(i == 2) sp = 9600;
     else if(i == 3) sp = 19200;
     else if(i == 4) sp = 38400;
     else if(i == 5) sp = 57600;
     else if(i == 6) sp = 115200;

     huart2.Instance = USART2;
     huart2.Init.BaudRate = sp;
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

     char str[16] = {0,};
     HAL_UART_Transmit(GSM, (uint8_t*)"AT\r\n", strlen("AT\r\n"), 1000);
     osDelay(300);

     if(gsm_available()) //если модуль что-то прислал
     {
      uint16_t i = 0;

      while(gsm_available())
      {
       str[i++] = gsm_read();
       if(i > 15) break;
       osDelay(1);
      }

      if(strstr(str, "OK") != NULL)
      {
       char buf[64] = {0,};
       snprintf(buf, 64, "Uart modem was %lu, switched to 57600\n", huart2.Init.BaudRate);
       HAL_UART_Transmit(myDEBUG, (uint8_t*)buf, strlen(buf), 100);
       HAL_UART_Transmit(GSM, (uint8_t*)"AT+IPR=57600\r\n", strlen("AT+IPR=57600\r\n"), 1000);
       osDelay(250);
       MX_USART2_UART_Init();
       break;
      }
     }
    }
//    taskEXIT_CRITICAL();
  }
  /*************************** END GSM ************************************/
/* USER CODE END 0 */

/**
  * @brief  The application entry point.
  * @retval int
  */
int main(void)
{

  /* USER CODE BEGIN 1 */

  /* USER CODE END 1 */

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
  /* USER CODE BEGIN 2 */
  // Инициализация массивов датчиков
  memset(ds18b20, 0, sizeof(ds18b20));
  memset(dht22, 0, sizeof(dht22));
  DWT_Init();
  test_init();
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
  mqttQueueHandle = osMessageQueueNew (16, sizeof(MqttMessage_t), &mqttQueue_attributes);

  /* USER CODE BEGIN RTOS_QUEUES */
  /* add queues, ... */
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

  /* creation of mqttTask */
  mqttTaskHandle = osThreadNew(StartMqttTask, NULL, &mqttTask_attributes);

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
  while (1)
  {
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
/*********************** для printf ******************************/
PUTCHAR_PROTOTYPE {
	HAL_UART_Transmit(&huart3, (uint8_t*) &ch, 1, 0xFFFF);
	return ch;
}

void parse_string(char *str, time_t cronetime_olds, int cronindex, int pause) {
    char *token;
    char *saveptr;
    int flag = 0;
    int k = 0;
    int pin = 0;
    char delim[] = ",";
    MqttMessage_t mqttMsg = {0};
    int mqtt_sent = 0;  // Флаг отправки MQTT сообщения
//    printf("Debug: Parsing string for cronindex=%d, pause=%d\n", cronindex, pause);
//    printf("Debug: Input string: %s\n", str);
    token = strtok_r(str, delim, &saveptr);
    while (token != NULL) {
        char *end_token;
//        printf("Debug: Processing token: %s\n", token);
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
                xQueueSend(outputQueueHandle, (void* )&data_pin, 0);
                if (!mqtt_sent) {
//                    printf("Debug: Sending MQTT message for cronindex=%d\n", cronindex);
                    mqttMsg.command = 7;
                    mqttMsg.deviceId = cronindex;
                    mqttMsg.state = data_pin.action;
                    mqttMsg.reserved = 0;
                    if (xQueueSend(mqttQueueHandle, &mqttMsg, 0) != pdPASS) {
                        printf("Error sending TIMER event to MQTT queue!\r\n");
                    }
                    mqtt_sent = 1;  // Устанавливаем флаг отправки
                }
            }
        }
        token = strtok_r(NULL, delim, &saveptr);
    }
}
/************************ GSM *************************************/
static void init_sim800l_module(void) {
	//osDelay(1000);
	//HAL_GPIO_WritePin(ON_RELAY_GPIO_Port, ON_RELAY_Pin, GPIO_PIN_SET);
	zerg_t = HAL_GetTick();
	swarm_t = HAL_GetTick();

	//osDelay(1000);
	//HAL_GPIO_WritePin(ON_RELAY_GPIO_Port, ON_RELAY_Pin, GPIO_PIN_SET);
//	printf("Enabling UART interrupts...\r\n");
	__HAL_UART_ENABLE_IT(GSM, UART_IT_RXNE);
	__HAL_UART_ENABLE_IT(myDEBUG, UART_IT_RXNE);
//    printf("Starting first UART receive...\r\n");
	HAL_StatusTypeDef status = HAL_UART_Receive_IT(GSM, &RxByte, 1);
	if (status != HAL_OK) {
		printf("Failed to start UART receive: %d\r\n", status);
	}
//	osDelay(5000); // задержка чтоб модем успел раздуплиться, если его включение происходит вместе с включением МК
	check_speed(); // проверка и установка скорости 19200, нужна один раз

	////////////////// настройка модема ///////////////////
	set_comand(ATCPAS);  // проверка статуса модема ответ должени быть примерно такой "+CPAS: 0"
	set_comand(ATCREG);  // проверка регистрации в сети - должен вернуть  +CREG: 0,1
	set_comand(ATCLIP1); // включить АОН
	set_comand(ATE);     // отключить «эхо»
	set_comand(ATS);     // поднимать трубку только "вручную"
	set_comand(ATDDET);  // включить DTMF
	//set_comand(ATCCLKK); // установить дату/время

	/////////////////// настройки для работы с sms ////////////////
	set_comand(ATCMGF);    // устанавливает текстовый режим смс-сообщения
	set_comand(ATCPBS);    // открывает доступ к данным телефонной книги SIM-карты
	set_comand(ATCSCS);    // кодировка текста - GSM
	set_comand(ATCNMI);    // настройка вывода смс в консоль

	//////////////////// различная инфа /////////////////////
	set_comand(ATIPR);       // скорость usart'a модема
	set_comand(ATI);         // название и версия модуля
	set_comand(ATCGSN);      // считывание IMEI из EEPROM
	set_comand(ATCSPN);      // оператор сети
}

	static void process_sim800l_data(void) {
	//	if (gsm_available()) //если модуль что-то прислал
	//	{
		//printf("Data available in buffer\r\n");
		char mqtt_pins[240];
		uint16_t i = 0;
		memset(buf, 0, GSM_RX_BUFFER_SIZE);
		osDelay(50);
		while (gsm_available()) {
			buf[i++] = gsm_read();
			if (i > GSM_RX_BUFFER_SIZE - 1)
				break;
			osDelay(1);
		}
		clear_string(buf); // очищаем строку от символов \r и \n
		/////////////////// НАЧИНАЕМ РАСПОЗНАВАТЬ ЧТО ПРИСЛАЛ МОДУЛЬ /////////////////////
		if (strstr(buf, "RING") != NULL) // ЕСЛИ ЭТО ЗВОНОК
		{
			if (SetSettings.tel[0] != '\0') { // проверка что номер задан
				if (strstr(buf, SetSettings.tel) != NULL) // если звонит нужный номер
				{
					//HAL_UART_Transmit(myDEBUG, (uint8_t*) "My number\n", strlen("My number\n"), 1000);
					incoming_call(); // принять звонок
				} else {
					HAL_UART_Transmit(myDEBUG, (uint8_t*) "Unknow number or empty!\n", strlen("Unknow number or empty!\n"), 1000);
					disable_connection(); // сброс соединения
				}
			}
		}
		if (strstr(buf, "+CMT:") != NULL) // ЕСЛИ ЭТО SMS
		{
			if (SetSettings.tel[0] != '\0') { // проверка что номер задан
				//printf("Raw SMS buffer:\n[%s]\n", buf);
				if (strstr(buf, SetSettings.tel) != NULL) // проверяем от кого смс
				{
					//HAL_UART_Transmit(myDEBUG, (uint8_t*) "Sms my number\n", strlen("Sms my number\n"), 1000);
					// Получаем первую часть сообщения из первого буфера
					char sms_text[GSM_RX_BUFFER_SIZE] = { 0 };
					char *first_part = strstr(buf, "+08\"");  // ищем конец заголовка
					if (first_part != NULL) {
						first_part += 4;  // пропускаем "+08\""
						strcpy(sms_text, first_part);
					}
					// Ждем вторую часть сообщения
					osDelay(500);
					// Читаем вторую часть сообщения
					uint16_t i = strlen(sms_text);  // продолжаем с конца первой части
					while (gsm_available()) {
						sms_text[i++] = gsm_read();
						if (i >= GSM_RX_BUFFER_SIZE - 1)
							break;
						osDelay(1);
					}
					sms_text[i] = '\0';
					//printf("Complete SMS before cleaning: [%s]\n", sms_text);
					//HAL_UART_Transmit(myDEBUG, (uint8_t*) "Complete SMS received: ", strlen("Complete SMS received: "), 1000);
					//HAL_UART_Transmit(myDEBUG, (uint8_t*) sms_text, strlen(sms_text), 1000);
					//HAL_UART_Transmit(myDEBUG, (uint8_t*) "\n", 1, 1000);

					clear_string(sms_text);// Очищаем строку от спецсимволов
					// printf("Final cleaned SMS: [%s]\n", sms_text);
					// Проверяем содержимое сообщения
					if (strstr(sms_text, "Zerg") != NULL) {
						HAL_UART_Transmit(myDEBUG, (uint8_t*) "Reciv Zerg\n", strlen("Reciv Zerg\n"), 1000);
					} else if (strstr(sms_text, "Call") != NULL) {
						// printf("Found 'Call' in message!\n");
						call();
					} else {
						HAL_UART_Transmit(myDEBUG, (uint8_t*) "Unknown SMS content: ", strlen("Unknown SMS content: "), 1000);
						HAL_UART_Transmit(myDEBUG, (uint8_t*) sms_text, strlen(sms_text), 1000);
						HAL_UART_Transmit(myDEBUG, (uint8_t*) "\n", 1, 1000);
					}
				} else {
					HAL_UART_Transmit(myDEBUG, (uint8_t*) "Unknow number sms\n", strlen("Unknow number sms\n"), 1000);
				}
			}
		}
		if (strstr(buf, "+DTMF:") != NULL) { //ЕСЛИ ЭТО DTMF СИГНАЛ
			char dtmf_dig = buf[7];
			if (dtmf_idx < sizeof(dtmf_buf) - 1) {
				dtmf_buf[dtmf_idx++] = dtmf_dig;
				dtmf_buf[dtmf_idx] = '\0';
		        if (dtmf_idx == 3) {
		            if (strcmp(dtmf_buf, "777") == 0) {
		                PinsConf[1].onoff = 1;
		                strcpy(PinsConf[1].sclick, "All SMS alerts ON!");// Это для MQTT
		                send_sms(SMS_ENABLE_CODE);
		                memset(dtmf_buf, 0, sizeof(dtmf_buf));
		                dtmf_idx = 0;
		                usbnum = 1;// Сохраянем в "pins.ini"
		                xQueueSend(usbQueueHandle, &usbnum, 0);
		                mqttMsg.command = 6;
						mqttMsg.deviceId = 1;
						mqttMsg.state = 0;
						mqttMsg.reserved = 0;
						if (xQueueSend(mqttQueueHandle, &mqttMsg, 0) != pdPASS) {
							printf("Error sending SECURITY event to MQTT queue!\r\n");
						}
		                return;
		            }
		            else if (strcmp(dtmf_buf, "222") == 0) {
		            	send_sms(SMS_DISABLE_CODE);
		            	strcpy(PinsConf[1].sclick, "All SMS alerts OFF!");// Это для MQTT
		                PinsConf[1].onoff = 0;
		                memset(dtmf_buf, 0, sizeof(dtmf_buf));
		                dtmf_idx = 0;
		                usbnum = 1;// Сохраянем в "pins.ini"
		                xQueueSend(usbQueueHandle, &usbnum, 0);
		                mqttMsg.command = 6;
		                mqttMsg.deviceId = 1;
		                mqttMsg.state = 0;
		                mqttMsg.reserved = 0;
		                if (xQueueSend(mqttQueueHandle, &mqttMsg, 0) != pdPASS) {
		                    printf("Error sending SECURITY event to MQTT queue!\r\n");
		                }
		                return;
		            }
		        }
				if (dtmf_idx >= 2 && dtmf_buf[dtmf_idx - 2] == '*' && dtmf_buf[dtmf_idx - 1] == '#') {
		            memset(vldpins, 0, sizeof(vldpins));
		            memset(invpins, 0, sizeof(invpins));
		            validcnt = 0;
		            invldcnt = 0;
					char dbg_msg[DTMF_BUF_SIZE];
					const char prefix[] = "Processing commands: ";
					int free_sp = sizeof(dbg_msg) - strlen(prefix) - 2; // -2 для \n и \0
					snprintf(dbg_msg, sizeof(dbg_msg), "%s%.*s\n", prefix, free_sp, dtmf_buf);
					//HAL_UART_Transmit(myDEBUG, (uint8_t*) dbg_msg, strlen(dbg_msg), 1000);
					char *cmd = dtmf_buf;
					while (*cmd && cmd < dtmf_buf + dtmf_idx - 1) {
						int pin = 0; //Ключ, тут int т.к ползователь может ввести случайно большое число!
						int value = 0; //Значение
						char *cmd_start = cmd;
						while (*cmd >= '0' && *cmd <= '9') {
							pin = pin * 10 + (*cmd - '0');
							cmd++;
						}
						if (*cmd == '#' && (*(cmd + 1) >= '0' && *(cmd + 1) <= '2') && *(cmd + 2) == '*') {
							cmd++; // Пропускаем #
							value = *cmd - '0';
							cmd++; // Пропускаем значение
							cmd++; // Пропускаем *
							if (pin >= 0 && pin < NUMPIN) {
								// Проверяем, является ли пин устройством нужного типа
								if (PinsConf[pin].topin == 2 || PinsConf[pin].topin == 10) {
									if (PinsConf[pin].topin == 10) {
										if (value == 1) {
											PinsConf[pin].onoff = 1;
										} else {
											PinsConf[pin].onoff = 0;
										}
									}
									// Буфер для строки формата "xx:y" (максимум 4 символа + \0)
									char cmd_msg[16];
									int cmd_len = snprintf(cmd_msg, sizeof(cmd_msg), "%d:%d", pin, value);
									if (cmd_len < 0 || cmd_len >= sizeof(cmd_msg)) {
										HAL_UART_Transmit(myDEBUG, (uint8_t*) "Error: cmd_msg overflow\n", strlen("Error: cmd_msg overflow\n"), 1000);
										continue;
									}
									// Буфер для новой части строки (включая запятую)
									char pin_str[17];
									int pin_len;
									if (validcnt > 0) {
										pin_len = snprintf(pin_str, sizeof(pin_str), ",%s", cmd_msg);
									} else {
										pin_len = snprintf(pin_str, sizeof(pin_str), "%s", cmd_msg);
									}
									if (pin_len < 0 || pin_len >= sizeof(pin_str)) {
										HAL_UART_Transmit(myDEBUG, (uint8_t*) "Error: pin_str overflow\n", strlen("Error: pin_str overflow\n"), 1000);
										continue;
									}
									// Проверяем, достаточно ли места в vldpins
									if (strlen(vldpins) + strlen(pin_str) < sizeof(vldpins)) {
										strcat(vldpins, pin_str);
										validcnt++;
									} else {
										HAL_UART_Transmit(myDEBUG, (uint8_t*) "Error: vldpins buffer full\n", strlen("Error: vldpins buffer full\n"), 1000);
									}
								} else {
									// Пин не соответствует типу устройства - добавляем в invalid
									char cmd_str[DTMF_BUF_SIZE];
									snprintf(cmd_str, sizeof(cmd_str), "%s%d#%d*", invldcnt > 0 ? "," : "", pin, value);
									strcat(invpins, cmd_str);
									invldcnt++;
								}
							} else {
								// Пин вне допустимого диапазона - добавляем в invalid
								char cmd_str[DTMF_BUF_SIZE];
								snprintf(cmd_str, sizeof(cmd_str), "%s%d#%d*", invldcnt > 0 ? "," : "", pin, value);
								strcat(invpins, cmd_str);
								invldcnt++;
							}
						} else {
							char err_msg[DTMF_BUF_SIZE];
							char *end = cmd;
							while (*end && *end != '*')
								end++;
							if (*end == '*')
								end++;
							int cmd_len = end - cmd_start;
							char invalid_cmd[DTMF_BUF_SIZE] = { 0 };
							strncpy(invalid_cmd, cmd_start, cmd_len);
							// Добавляем полную невалидную команду в список
							if (strlen(invalid_cmd) > 0) {
								char cmd_str[DTMF_BUF_SIZE];
								snprintf(cmd_str, sizeof(cmd_str), "%s%s", invldcnt > 0 ? "," : "", invalid_cmd);
								strcat(invpins, cmd_str);
								invldcnt++;
							}
							// Формируем сообщение об ошибке, явные проверки размеров буферо.
							strcpy(err_msg, "Error ");
							size_t prefix_len = strlen(err_msg);
							size_t max_cmd_len = sizeof(err_msg) - prefix_len - 2; // -2 для \n и \0
							strncat(err_msg, invalid_cmd, max_cmd_len);
							strcat(err_msg, "\n");
							//HAL_UART_Transmit(myDEBUG, (uint8_t*) err_msg, strlen(err_msg), 1000);
							cmd = end;
						}
					}
					action_handler(0, vldpins, "DTMF"); // Первый аргумент 0, поскольку это не имеет значения для действий 'vldpins'.

					// Выводим результаты
					char valid_msg[DTMF_BUF_SIZE];
					char invalid_msg[DTMF_BUF_SIZE];
					snprintf(valid_msg, sizeof(valid_msg), "Valid pins: %s\n", vldpins);
					snprintf(invalid_msg, sizeof(invalid_msg), "Invld pins/cmd: %s\n", invpins);
					HAL_UART_Transmit(myDEBUG, (uint8_t*) valid_msg, strlen(valid_msg), 1000);
					HAL_UART_Transmit(myDEBUG, (uint8_t*) invalid_msg, strlen(invalid_msg), 1000);
					memset(dtmf_buf, 0, sizeof(dtmf_buf));
					dtmf_idx = 0;
				}
			}
			if (dtmf_idx >= sizeof(dtmf_buf) - 1) {
				memset(dtmf_buf, 0, sizeof(dtmf_buf));
				dtmf_idx = 0;
				HAL_UART_Transmit(myDEBUG, (uint8_t*) "Buffer overflow, cleared\n", strlen("Buffer overflow, cleared\n"), 1000);
			}
		} else if (strstr(buf, "NO CARRIER") != NULL) {
			// Сброс буфера при разрыве соединения
			memset(dtmf_buf, 0, sizeof(dtmf_buf));
			dtmf_idx = 0;
			//HAL_UART_Transmit(myDEBUG, (uint8_t*) "Connection ended, buffer cleared\n", strlen("Connection ended, buffer cleared\n"), 1000);
			// Формируем и отправляем SMS после завершения звонка
			osDelay(1000); //Небольшая задержка для стабильности
			// Формируем сообщение с явным контролем длины
			char message[GSM_RX_BUFFER_SIZE];
			char formatted_vldpins[GSM_RX_BUFFER_SIZE]; // Буфер для форматированной строки
			const char valid_prefix[] = "Valid pins: ";
			const char invalid_prefix[] = "\nInvld pins/cmd: ";
			// Форматируем vldpins, заменяя 1 на ON и 0 на OFF
			if (strlen(vldpins) > 0) {
			    char *src = vldpins;
			    char *dst = formatted_vldpins;

			    while (*src) {
			        char pin_number[4] = { 0 }; // Буфер для номера пина
			        int i = 0;
			        // Считываем номер пина до двоеточия
			        while (*src && *src != ':') {
			            pin_number[i++] = *src++;
			        }
			        if (*src == ':') { // Если нашли двоеточие
			            src++; // Пропускаем двоеточие и значение после него
			            while (*src && *src != ',')
			                src++; // Пропускаем старое значение

			            // Получаем текущее состояние пина
			            uint8_t pin_id = atoi(pin_number);
			            uint8_t current_state = read_button_level(pin_id);
					if (PinsConf[pin_id].topin == 10) { // Если SECURITY
						dst += sprintf(dst, "SEC-TY:%s:%s:%s", // SEC-TY:0:OFF:TEST-security TODO
							pin_number,
							PinsConf[pin_id].onoff == 1 ? "ON" : "OFF", // PinsConf[pin_id].send_sms,
							PinsConf[pin_id].info);
					} else {
			                // Для остальных устройств используем стандартный формат
			                dst += sprintf(dst, "%s:%s",
			                    pin_number,
			                    current_state == GPIO_PIN_SET ? "ON" : "OFF");
			            }

			        }
			        if (*src == ',') { // Если есть разделитель, копируем его
			            *dst++ = *src++;
			        }
			    }
			    *dst = '\0'; // Завершаем строку
			} else {
			    strcpy(formatted_vldpins, "None");
			}
			// Вычисляем доступное место
			int remaining_space = GSM_RX_BUFFER_SIZE - strlen(valid_prefix) - strlen(invalid_prefix) - 5;
			int max_per_section = remaining_space - 128;

			bool has_type_10 = false;
			uint8_t type_10_pin = 0;

			char *token = strtok(vldpins, ",");
			while (token != NULL) {
			    char pin_str[4] = { 0 };
			    int i = 0;
			    // Получаем номер пина
			    while (token[i] != ':' && i < sizeof(pin_str) - 1) {
			        pin_str[i] = token[i];
			        i++;
			    }
			    uint8_t pin = atoi(pin_str);

			    if (PinsConf[pin].topin == 10) {
			        has_type_10 = true;
			        type_10_pin = pin;
			        break;
			    }
			    token = strtok(NULL, ",");
			}

			// Проверяем условие для отправки SMS
			if ((has_type_10 && PinsConf[1].onoff == 1 && PinsConf[type_10_pin].onoff == 1) || (validcnt > 0 && PinsConf[1].onoff == 1))
			{
			    // Проверяем, есть ли что отправлять
			    if ((strlen(vldpins) > 0 && strcmp(formatted_vldpins, "None") != 0) ||
			        (strlen(invpins) > 0 && strcmp(invpins, "None") != 0)) {
			    	message[0] = '\0';
			    	// Добавляем valid pins только если есть что добавлять
			    	if (strlen(formatted_vldpins) > 0 && strcmp(formatted_vldpins, "None") != 0) {
			    	    snprintf(message, GSM_RX_BUFFER_SIZE, "%s%.*s", valid_prefix, max_per_section, formatted_vldpins);
			    	    strncpy(mqtt_pins, formatted_vldpins, sizeof(mqtt_pins) - 1);// Сохраняем копию formatted_vldpins для MQTT
				        mqtt_pins[sizeof(mqtt_pins) - 1] = '\0';
			    	}
			    	// Добавляем invalid pins только если есть что добавлять
			    	if (strlen(invpins) > 0 && strcmp(invpins, "None") != 0) {
			    	    int current_len = strlen(message);
			    	    // Если это первая часть сообщения, не добавляем перенос строки
			    	    const char* prefix = (current_len > 0) ? invalid_prefix : "Invld pins/cmd: ";
			    	    snprintf(message + current_len, GSM_RX_BUFFER_SIZE - current_len, "%s%.*s", prefix, max_per_section, invpins);
			    	}
			        // Отправляем SMS
			        snprintf(str, GSM_RX_BUFFER_SIZE, "AT+CMGS=\"%s\"\r\n", SetSettings.tel);
			        HAL_UART_Transmit(GSM, (uint8_t*) str, strlen(str), 1000);
			        osDelay(100);

			        // Отправляем текст сообщения
			        HAL_UART_Transmit(GSM, (uint8_t*) message, strlen(message), 1000);
			        osDelay(100);

			        // Отправляем символ ctrl-z для завершения сообщения
			        uint8_t ctrlZ = 26;
			        HAL_UART_Transmit(GSM, &ctrlZ, 1, 1000);
					// Отправляем в MQTT только если есть валидные пины.
			        if (strlen(mqtt_pins) > 0) {
			            strncpy(PinsConf[1].sclick, mqtt_pins, sizeof(PinsConf[1].sclick) - 1);
			            PinsConf[1].sclick[sizeof(PinsConf[1].sclick) - 1] = '\0';

			            MqttMessage_t mqttMsg;
			            mqttMsg.command = 1;
			            mqttMsg.deviceId = 1;
			            mqttMsg.state = 0;
			            mqttMsg.reserved = 0;

			            if (xQueueSend(mqttQueueHandle, &mqttMsg, 0) != pdPASS) {
			                printf("Error sending DEVICE event to MQTT queue!\r\n");
			            }
			        }
			    }
			}
			// ПОСЛЕ отправки SMS очищаем буферы
			memset(vldpins, 0, sizeof(vldpins));
			memset(invpins, 0, sizeof(invpins));
			validcnt = 0;
			invldcnt = 0;
			memset(dtmf_buf, 0, sizeof(dtmf_buf));
			dtmf_idx = 0;
		}
		uint16_t j = 0;
		osDelay(50); // Даем время накопиться данным в буфере
		while (gsm_available()) {
			buf[j++] = gsm_read();
			if (j > GSM_RX_BUFFER_SIZE - 1)
				break;
			osDelay(1);
		}
	}
/*********************** END GSM **********************************/
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

				FRESULT fresult = f_stat("settings.ini", &finfo);// Проверяем существует ли файл или нет!?
				if (fresult == FR_OK) {
					GetSettingsConfig();// если файл "settings.ini" существует, открываем его и перезаписываем
					GetCronConfig();   // если файл "cron.ini" существует, открываем для чтения.
					GetPinConfig();    // если файл "pins.ini" существует, открываем для чтения.
					GetPinToPin();     // если файл "pintopin.ini" существует, открываем его
					GetOneWireConfig();// если файл "onewire.ini" существует, открываем его

					InitPin();// Инициализация пинов

					if (SetSettings.sim800l == 1) {// Если модуль sim800l включен
						xTaskNotifyGive(SIM800LTaskHandle); // ТО ВКЛЮЧАЕМ ЗАДАЧУ SIM800LTask
						ulTaskNotifyTake(pdTRUE, portMAX_DELAY);// Ждем уведомления от SIM800LTask
					}

					xTaskNotifyGive(WebServerTaskHandle); // ТО ВКЛЮЧАЕМ ЗАДАЧУ WebServerTask
					xTaskNotifyGive(CronTaskHandle);      // И ВКЛЮЧАЕМ ЗАДАЧУ CronTask
					xTaskNotifyGive(OutputTaskHandle);    // И ВКЛЮЧАЕМ ЗАДАЧУ OutputTask
					xTaskNotifyGive(InputTaskHandle);     // И ВКЛЮЧАЕМ ЗАДАЧУ InputTask
					xTaskNotifyGive(EncoderTaskHandle);   // И ВКЛЮЧАЕМ ЗАДАЧУ PWMTask

					xTaskNotifyGive(ServiceTaskHandle);  // И ВКЛЮЧАЕМ ЗАДАЧУ TechnolTask
					xTaskNotifyGive(mqttTaskHandle);     // И ВКЛЮЧАЕМ ЗАДАЧУ mqttTask
					xTaskNotifyGive(SecurityTaskHandle); // И ВКЛЮЧАЕМ ЗАДАЧУ SecurityTask

					osDelay(100);
					xTaskNotifyGive(ds18b20TaskHandle); // И ВКЛЮЧАЕМ ЗАДАЧУ ds18b20
					xTaskNotifyGive(dht22TaskHandle);   // И ВКЛЮЧАЕМ ЗАДАЧУ dht22

				} else {// Файл "pins.ini" не существует, создаем его и записываем данные
					StartSettingsConfig();

					xTaskNotifyGive(WebServerTaskHandle); // ВКЛЮЧАЕМ ЗАДАЧУ WebServerTask
					xTaskNotifyGive(CronTaskHandle);      // ВКЛЮЧАЕМ ЗАДАЧУ CronTask
					xTaskNotifyGive(OutputTaskHandle);    // ВКЛЮЧАЕМ ЗАДАЧУ OutputTask
					xTaskNotifyGive(InputTaskHandle);     // ВКЛЮЧАЕМ ЗАДАЧУ InputTask
					xTaskNotifyGive(EncoderTaskHandle);   // ВКЛЮЧАЕМ ЗАДАЧУ PWMTask
					xTaskNotifyGive(mqttTaskHandle);      // ВКЛЮЧАЕМ ЗАДАЧУ mqttTask

					osDelay(100);
					xTaskNotifyGive(ServiceTaskHandle); // ВКЛЮЧАЕМ ЗАДАЧУ TechnolTask
					xTaskNotifyGive(ds18b20TaskHandle);  // ВКЛЮЧАЕМ ЗАДАЧУ ds18b20
					xTaskNotifyGive(dht22TaskHandle);    // ВКЛЮЧАЕМ ЗАДАЧУ dht22
					xTaskNotifyGive(SecurityTaskHandle); // ВКЛЮЧАЕМ ЗАДАЧУ SecurityTask

				}
				usbflag = 0;
			}
			// Функция для чтения целых чисел из очереди
			if (xQueueReceive(usbQueueHandle, &usbnum, portMAX_DELAY) == pdTRUE) {
				switch (usbnum) {
				case 1:
					SetPinConfig();// Если файл "pins.ini" не существует, создаем его и записываем данные
					break;
				case 2:
					SetSettingsConfig();// Когда сохраняем форму в файл "setings.ini"
					break;
				case 3:
					SetCronConfig();// Если файл "cron.ini" не существует, создаем его и записываем данные
					break;
				case 4:
					SetPinToPin();// Если файл "pintopin.ini" не существует, создаем его и записываем данные
					break;
				case 5:
					SetOneWireConfig();// Если файл "onewire.ini" не существует, создаем его и записываем данные
					break;
				default:
					printf("xQueueReceive get wrong data! \r\n");
					break;
				}
//				printf("xQueueReceive number: %u\n", usbnum);
			}
			break;
		default:
			//printf("Wrong data! \r\n");
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
/* USER CODE END Header_StartWebServerTask */
void StartWebServerTask(void *argument)
{
  /* USER CODE BEGIN StartWebServerTask */
	ulTaskNotifyTake(0, portMAX_DELAY);

    if (!quick_network_check()) {// Проверка подключен LAN провод или нет.
        printf("Network link down - Web server not started");
        vTaskDelete(NULL);
        return;
    }else{
    	onlineFlg = 1;
    }

	//	printf("Start 'WebServer' task \r\n");
		struct mg_tcpip_if mif = { // Полная инициализация структуры mif
				.mac = GENERATE_LOCALLY_ADMINISTERED_MAC(), .ip = 0, .mask = 0, .gw = 0, .driver = &mg_tcpip_driver_stm32f, .driver_data = NULL };
		// Для теста вывод сгенерированного MAC-адреса
		MG_INFO(("Initial Generated MAC: %02X:%02X:%02X:%02X:%02X:%02X\r\n", mif.mac[0], mif.mac[1], mif.mac[2], mif.mac[3], mif.mac[4], mif.mac[5]));
		// MG_INFO(("Initial UUID: %02X%02X%02X%02X%02X%02X%02X%02X%02X%02X%02X%02X\r\n", UUID[0], UUID[1], UUID[2], UUID[3], UUID[4], UUID[5], UUID[6], UUID[7], UUID[8], UUID[9], UUID[10], UUID[11]));
		/* Infinite loop */
		struct mg_mgr mgr;     // Initialise Mongoose event manager
		mg_mgr_init(&mgr);     // and attach it to the interface
		mg_log_set(MG_LL_NONE);// Set log level
		// Настройка MQTT
		char mqtt_url[35];
		if (SetSettings.check_mqtt) {
			int result = snprintf(mqtt_url, sizeof(mqtt_url), "http://%d.%d.%d.%d:%d", SetSettings.mqtt_hst0, SetSettings.mqtt_hst1, SetSettings.mqtt_hst2, SetSettings.mqtt_hst3, SetSettings.mqtt_prt);
			if (result < 0 || result >= sizeof(mqtt_url)) {
				printf("Error: MQTT URL truncated or formatting error\n");
			} else {
				set_mqtt_url(mqtt_url);
			}
		}
		set_mqtt_topic(SetSettings.txmqttop);//Zagotovka
		// UUID перед генерацией MAC-адреса
		MG_INFO(("UUID before MAC generation: %02X%02X%02X%02X%02X%02X%02X%02X%02X%02X%02X%02X\r\n", UUID[0], UUID[1], UUID[2], UUID[3], UUID[4], UUID[5], UUID[6], UUID[7], UUID[8], UUID[9], UUID[10], UUID[11]));
		// Initialise Mongoose network stack
		struct mg_tcpip_driver_stm32f_data driver_data = { .mdc_cr = 4 };
		mif.driver_data = &driver_data;	// Дополнение структуры mif
		MG_INFO(("MAC before static_or_dynamic_ip: %02X:%02X:%02X:%02X:%02X:%02X\r\n", mif.mac[0], mif.mac[1], mif.mac[2], mif.mac[3], mif.mac[4], mif.mac[5]));
		void static_or_dynamic_ip(struct mg_tcpip_if *mif, struct dbSettings *config) {
			if (config->check_ip == 1) {// DHCP
				// MAC address and driver settings are already set in mif
				MG_INFO(("2 - Generated MAC: %02X:%02X:%02X:%02X:%02X:%02X\r\n", mif->mac[0], mif->mac[1], mif->mac[2], mif->mac[3], mif->mac[4], mif->mac[5]));
			} else {  // Статический IP
		        mif->ip = mg_htonl(MG_U32(config->ip_addr0, config->ip_addr1, config->ip_addr2, config->ip_addr3));
		        mif->mask = mg_htonl(MG_U32(config->sb_mask0, config->sb_mask1, config->sb_mask2, config->sb_mask3));
		        mif->gw = mg_htonl(MG_U32(config->gateway0, config->gateway1, config->gateway2, config->gateway3));
		        // Настройка DNS для статического IP
		        mg_htonl(MG_U32(8, 8, 8, 8)); // TODO DNS сервер Google, ДОРАБОТАЙ!
		    }
		}
		static_or_dynamic_ip(&mif, &SetSettings);
		MG_INFO(("MAC before mg_tcpip_init: %02X:%02X:%02X:%02X:%02X:%02X\r\n", mif.mac[0], mif.mac[1], mif.mac[2], mif.mac[3], mif.mac[4], mif.mac[5]));
		// Проверка, что MAC-адрес не нулевой
		if (mif.mac[0] == 0 && mif.mac[1] == 0 && mif.mac[2] == 0 && mif.mac[3] == 0 && mif.mac[4] == 0 && mif.mac[5] == 0) {
			MG_ERROR(("Error: MAC address is all zeros!"));
			// Здесь можно добавить код для обработки ошибки
		}
		mg_tcpip_init(&mgr, &mif);
		mg_timer_add(&mgr, BLINK_PERIOD_MS, MG_TIMER_REPEAT, timer_fn, &mif);
		MG_INFO(("MAC: %M. Waiting for IP...", mg_print_mac, mif.mac));
		while (mif.state != MG_TCPIP_STATE_READY) {
			mg_mgr_poll(&mgr, 0);
		}
		MG_INFO(("Network ready, IP: %M", mg_print_ip4, &mif.ip));
		MG_INFO(("Initialising application..."));
		web_init(&mgr);
		// Запуск таймера для MQTT
		mg_timer_add(&mgr, 3000, MG_TIMER_REPEAT | MG_TIMER_RUN_NOW, timer_fn_mqtt, &mgr);
		MG_INFO(("Starting event loop"));
	    /* Infinite loop */
	for (;;) {
        mg_mgr_poll(&mgr, 1000);
    }
    mg_mgr_free(&mgr);
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
		if (xQueueReceive(outputQueueHandle, &data_pin, portMAX_DELAY) == pdTRUE) {
			if (data_pin.id >= 0 && data_pin.id < NUMPIN) {// data_pin.id - это ID Devices а не Switch!
				switch (data_pin.action) {
				case 0:
					HAL_GPIO_WritePin(PinsInfo[data_pin.id].gpio_name, PinsInfo[data_pin.id].hal_pin, GPIO_PIN_RESET);
//					printf("case 0: %d-%d  \r\n", (int) data_pin.id, (int) data_pin.action);
					break;
				case 1:
					HAL_GPIO_WritePin(PinsInfo[data_pin.id].gpio_name, PinsInfo[data_pin.id].hal_pin, GPIO_PIN_SET);
//					printf("case 1: %d-%d  \r\n", (int) data_pin.id, (int) data_pin.action);
					break;
				case 2:
					HAL_GPIO_TogglePin(PinsInfo[data_pin.id].gpio_name, PinsInfo[data_pin.id].hal_pin);
//					printf("%d-%d  \r\n", (int) data_pin.id, (int) data_pin.action);
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
void StartCronTask(void *argument) {
	/* USER CODE BEGIN StartCronTask */
	ulTaskNotifyTake(0, portMAX_DELAY);
	init_offline_time();
	static lwdtc_cron_ctx_t cron_ctxs[MAXSIZE];
	int i = 0;
	char str[40] = { 0 };
	int cfg_tasks = MAXSIZE;  // Количество возможно настроенных cron задач
	time_t base_timestamp;
	static uint8_t t_printd = 0;

	base_timestamp = initializeTime();  // Инициализация базового времени

	/* Define context for CRON, used to parse data to */
	size_t fail_index = 0;

	taskENTER_CRITICAL();
	if (lwdtc_cron_parse_multi(cron_ctxs, dbCrontxt, MAXSIZE, &fail_index) != lwdtcOK) {// Parse all cron strings
		printf("Failed to parse cron at index %d\r\n", (int) fail_index);
	}
	taskEXIT_CRITICAL();
	printf("CRONs parsed and ready to go\r\n");
	/* Infinite loop */
	for (;;) {
		if (s_boot_timestamp != 0) {
			cronetime = (time_t) (s_boot_timestamp / 1000) + (mg_millis() / 1000) + (time_t) (SetSettings.timezone * 3600);

			if (!onlineFlg) {  // Оффлайн режим:
				cronetime = base_timestamp + (mg_millis() / 1000);
			} else { // Онлайн режим: используем время от NTP
				cronetime = (time_t) (s_boot_timestamp / 1000) + (mg_millis() / 1000) + (time_t) (SetSettings.timezone * 3600);
			}

			if (!t_printd && cronetime != 0) {
				timez = localtime(&cronetime);
				taskENTER_CRITICAL();
				if (!onlineFlg) {
					printf( "[OFFLINE MODE] Initial Date:%02d.%02d.%04d Time:%02d:%02d:%02d\r\n",
							timez->tm_mday, timez->tm_mon + 1,
							timez->tm_year + 1900, timez->tm_hour,
							timez->tm_min, timez->tm_sec);
				} else {
					printf( "[ONLINE MODE] Initial Date:%02d.%02d.%04d Time:%02d:%02d:%02d\r\n",
							timez->tm_mday, timez->tm_mon + 1,
							timez->tm_year + 1900, timez->tm_hour,
							timez->tm_min, timez->tm_sec);
				}
				taskEXIT_CRITICAL();
				year = timez->tm_year + 1900;  // Эти переменные не удаляй!
				month = timez->tm_mon + 1;     // они нужны для
				day = timez->tm_mday;          // задачи ServiceTask!
				t_printd = 1;
			}

			if (cronetime != cronetime_old) {
				cronetime_old = cronetime;
				timez = localtime(&cronetime);
				timez->tm_mon += 1;
//				printf("CronTask: today's date: %02d.%02d.%d\n", day, month, year);
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
					if (lwdtc_cron_is_valid_for_time(timez, cron_ctxs, &i) == lwdtcOK) {
						strcpy(str, dbCrontxt[i].activ);
						parse_string(str, cronetime_old, i, 0);
					}
					i++;
				}
				timez->tm_mon -= 1;
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
	uint8_t pinStates[NUMPIN] = { 0 };
	uint32_t pinTimes[NUMPIN] = { 0 };
	uint32_t millis;
	uint8_t pinLevel[NUMPIN] = { 0 };
//    char mqtt_payload[20] = {0};
//    char mqtt_topic[20] = {0};
	osDelay(1000);
	InitMultibutton();
  /* Infinite loop */
  for(;;)
  {
		millis = HAL_GetTick();
		for (uint8_t i = 0; i < NUMPIN; i++) {
			if (PinsConf[i].topin == 1 && PinsConf[i].act == 1){// BUTTON
				if ((millis - pinTimes[i]) >= 5) {
					pinTimes[i] = millis;
					button_ticks(&button[i]);
				}
			}
			/*
			// INPUT Button GPIO_PULLDOWN
			if (PinsConf[i].topin == 1 && PinsConf[i].ptype == 2) { // Для 'button'
				pinStates[i] = HAL_GPIO_ReadPin(PinsInfo[i].gpio_name, PinsInfo[i].hal_pin);
				if (pinStates[i] == 1 && (millis - pinTimes[i]) >= 200) {
					pinTimes[i] = millis;

					// OUTPUT (вынести в отдельную функцию)
					for (uint8_t a = 0; a < NUMPINLINKS; a++) {
						if (PinsLinks[a].idin == i) {
							data_pin.id = PinsLinks[a].idout;
							data_pin.action = 2;
							xQueueSend(outputQueueHandle, (void* ) &data_pin, 0);
						}
					}
				}
			}
			// INPUT Button GPIO_PULLUP
			if (PinsConf[i].topin == 1 && PinsConf[i].ptype == 1) { // Для 'button'
				pinStates[i] = HAL_GPIO_ReadPin(PinsInfo[i].gpio_name, PinsInfo[i].hal_pin);
				if (pinStates[i] == 0 && (millis - pinTimes[i]) >= 200) {
					pinTimes[i] = millis;

					// OUTPUT (вынести в отдельную функцию)
					for (uint8_t a = 0; a < NUMPINLINKS; a++) {
						if (PinsLinks[a].idin == i) {
							data_pin.id = PinsLinks[a].idout;
							data_pin.action = 2;
							xQueueSend(outputQueueHandle, (void* ) &data_pin, 0);
						}
					}
				}
			}

			*/
			// INPUT Switch
			if (PinsConf[i].topin == 3) {
				pinStates[i] = HAL_GPIO_ReadPin(PinsInfo[i].gpio_name, PinsInfo[i].hal_pin);
				    if(pinStates[i] != GPIO_PIN_RESET && pinStates[i] != GPIO_PIN_SET) {
				        printf("Error reading GPIO pin %d\r\n", i);
				        continue;
				    }
				// Инвертируем логику для pull-up выключателей
				// Когда выключатель замкнут (нажат) - на входе 0
			    if (pinStates[i] == 0 && (millis - pinTimes[i]) >= 200 && pinLevel[i] != pinStates[i]) {
			        pinLevel[i] = pinStates[i];
			        pinTimes[i] = millis;
			        processPins(i, 1);// Отправляем 1, т.к. выключатель включен
			        PinsConf[i].onoff = 1;
			        // Заполняем структуру для отправки в mqtt очередь.
			        memset(&mqttMsg, 0, sizeof(MqttMessage_t));
			        mqttMsg.command = 2;
			        mqttMsg.deviceId = i;
			        mqttMsg.state = 1;//ON

//			        printf("InputTask: Before Queue - Command:%d ID:%d State:%d\r\n\n", mqttMsg.command, mqttMsg.deviceId, mqttMsg.state);

			        // Отправляем в очередь
			        if (xQueueSend(mqttQueueHandle, &mqttMsg, 0) != pdPASS) {
			            printf("Error sending to MQTT queue!\r\n");
			        } else {
//			            printf("InputTask: Successfully sent to queue\r\n");
			        }
			    }
			    // Когда выключатель разомкнут (отжат) - на входе 1
			    if (pinStates[i] == 1 && (millis - pinTimes[i]) >= 200 && pinLevel[i] != pinStates[i]) {
			        pinLevel[i] = pinStates[i];
			        pinTimes[i] = millis;
			        processPins(i, 0);// Отправляем 0, т.к. выключатель выключен
			        PinsConf[i].onoff = 0;
			        // Заполняем структуру для отправки в mqtt очередь.
			        memset(&mqttMsg, 0, sizeof(MqttMessage_t));  // Очищаем структуру
			        mqttMsg.command = 2;
			        mqttMsg.deviceId = i;
			        mqttMsg.state = 0;//OFF

//			        printf("InputTask: Before Queue - Command:%d ID:%d State:%d\r\n", mqttMsg.command, mqttMsg.deviceId, mqttMsg.state);

			        // Отправляем в очередь
			        if (xQueueSend(mqttQueueHandle, &mqttMsg, 0) != pdPASS) {
			            printf("Error sending to MQTT queue!\r\n");
			        } else {
//			            printf("InputTask: Successfully sent to queue\r\n");
			        }
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
    uint8_t idpinb = 0;
    uint32_t millis;
    uint32_t pinTimes[NUMPIN] = { 0 };
    uint8_t prev_A[NUMPIN] = {0,};
    uint8_t prev_B[NUMPIN] =  {0,};
    uint8_t id = 0;
    uint8_t a = 0;
    uint8_t idpwm = 0;
    uint16_t lstvalue[NUMPIN] = {0,};  //Ммассив для хранения последних значений dvalue
  /* Infinite loop */
  for(;;)
  {
        millis = HAL_GetTick();
        for (id = 0; id < NUMPIN; id++) {
            // INPUT Encoder A
            if (PinsConf[id].topin == 8) {   // EncodrerA
                idpinb = PinsConf[id].encoderb;// id EncodrerB
                if (idpinb != 0) {
                    if (millis - pinTimes[id] >= DEBOUNCE_DELAY) { // игнорируем дребезг
                        PinsConf[id].on = HAL_GPIO_ReadPin(PinsInfo[id].gpio_name,PinsInfo[id].hal_pin);// Cчитываем состояние "EncodrerA".
                        osDelay(3);
                        PinsConf[idpinb].on = HAL_GPIO_ReadPin(PinsInfo[idpinb].gpio_name,PinsInfo[idpinb].hal_pin);// Cчитываем состояние "EncodrerB".
                        if (PinsConf[id].on != prev_A[id] || PinsConf[idpinb].on != prev_B[idpinb]) { //Если состояние изменилось
                            pinTimes[id] = millis; // Сбрасываем дребезг
                            if (PinsConf[id].on == 1 && PinsConf[idpinb].on == 0) {// Узнаем направление вращения энкодера.
//                                printf("ID:%d  A = %d & B = %d\r\n",id, PinsConf[id].on, PinsConf[idpinb].on);
                                for (a = 0; a < NUMPINLINKS; a++) {// Перебираем структуру "PinsLinks" на совпадение!
                                    if (PinsLinks[a].idin == id) {// Если нашли "EncodrerA".
                                    	idpwm = PinsLinks[a].idout;// то узнаем id "EncodrerB".
                                        if (PinsConf[idpwm].topin == 5) {// PWM
                                            // Проверяем, изменилось ли значение dvalue из модального окна.
                                            if (PinsConf[idpwm].dvalue != lstvalue[idpwm]) {
                                            	lstvalue[idpwm] = PinsConf[idpwm].dvalue;
                                            } else {
                                                PinsConf[idpwm].dvalue -= 1;
                                            }
                                            if(PinsConf[idpwm].dvalue <= 0){
                                                PinsConf[idpwm].dvalue = 0;
                                            }
                                            __HAL_TIM_SET_COMPARE(&htim[idpwm],PinsInfo[idpwm].tim_channel,PinsConf[idpwm].dvalue);
                                            lstvalue[idpwm] = PinsConf[idpwm].dvalue;
//                                            printf("PWM = %d\r\n", PinsConf[idpwm].dvalue);
                                        }
                                    }
                                }
                            } else if (PinsConf[id].on == 0 && PinsConf[idpinb].on == 1) {// Узнаем направление вращения энкодера.
                                printf("ID:%d  A = %d & B = %d\r\n",id, PinsConf[id].on, PinsConf[idpinb].on);
                                for (a = 0; a < NUMPINLINKS; a++) {// Перебираем структуру "PinsLinks" на совпадение!
                                    if (PinsLinks[a].idin == id) {// Если нашли "EncodrerA".
                                    	idpwm = PinsLinks[a].idout;// то узнаем "EncodrerB".
                                        if (PinsConf[idpwm].topin == 5) {// PWM
                                            // Проверяем, изменилось ли значение dvalue из модального окна.
                                            if (PinsConf[idpwm].dvalue != lstvalue[idpwm]) {
                                            	lstvalue[idpwm] = PinsConf[idpwm].dvalue;
                                            } else {
                                                PinsConf[idpwm].dvalue += 1;
                                            }
                                            if(PinsConf[idpwm].dvalue >= 100){
                                                PinsConf[idpwm].dvalue = 100;
                                            }
                                            __HAL_TIM_SET_COMPARE(&htim[idpwm],PinsInfo[idpwm].tim_channel,PinsConf[idpwm].dvalue);
                                            lstvalue[idpwm] = PinsConf[idpwm].dvalue;
                                            printf("PWM = %d\r\n", PinsConf[idpwm].dvalue);
                                        }
                                    }
                                }
                            }
                            prev_A[id] = PinsConf[id].on; //Сохраняем текущее значение "EncodrerA".
                            prev_B[idpinb] = PinsConf[idpinb].on; //Сохраняем текущее значение "EncodrerB".
                        }
                    }
                }
            }
        }
    }
  /* USER CODE END StartEncoderTask */
}

/* USER CODE BEGIN Header_StartMqttTask */
/**
* @brief Function implementing the mqttTask thread.
* @param argument: Not used
* @retval None
*/
/* USER CODE END Header_StartMqttTask */
void StartMqttTask(void *argument)
{
  /* USER CODE BEGIN StartMqttTask */
	ulTaskNotifyTake(0, portMAX_DELAY);
	MqttMessage_t rxMsg = { 0 };
	BaseType_t status;
//	uint8_t messagesWaiting = uxQueueMessagesWaiting(mqttQueueHandle);
//	uint8_t emptySpaces = uxQueueSpacesAvailable(mqttQueueHandle);
	/* Infinite loop */
	for (;;) {
		// Получаем данные из очереди
		memset(&rxMsg, 0, sizeof(MqttMessage_t)); // Очищаем структуру перед получением
		status = xQueueReceive(mqttQueueHandle, &rxMsg, pdMS_TO_TICKS(100));
		if (status == pdPASS) {
			switch (rxMsg.command) {
			case 1:// DEVICE
			    if (SetSettings.txmqttop[0] != '\0' && SetSettings.check_mqtt == 1) {
			        if (check_mqtt_connection(s_conn)) {
			            memset(mqtt_topic, 0, sizeof(mqtt_topic));
			            memset(mqtt_payload, 0, sizeof(mqtt_payload));
			            strcpy(mqtt_topic, "/device/");

			            printf("Debug: PinsConf[1].sclick in MQTT task = '%s'\n", PinsConf[1].sclick);  // Отладка

			            snprintf(mqtt_payload, sizeof(mqtt_payload), "DEVICE(s)/ACTION=%s", PinsConf[1].sclick);

			            printf("Debug: Final MQTT payload = '%s'\n", mqtt_payload);  // Отладка

			            send_mqtt_message(s_conn, mqtt_topic, mqtt_payload);
			        } else {
			            if (onlineFlg != 0) {
			                printf("Error: MQTT not connected\r\n");
			            }
			        }
			    } else {
			        printf("Error: MQTT settings not configured\r\n");
			    }
			    break;
			case 2: // Switch
				if (SetSettings.txmqttop[0] != '\0' && SetSettings.check_mqtt == 1) {
					if (check_mqtt_connection(s_conn)) {
						memset(mqtt_topic, 0, sizeof(mqtt_topic));
						memset(mqtt_payload, 0, sizeof(mqtt_payload));
						snprintf(mqtt_topic, sizeof(mqtt_topic), "/switch/"); // Формируем топик
						snprintf(mqtt_payload, sizeof(mqtt_payload), "ID:%d=%s", rxMsg.deviceId, rxMsg.state ? "ON" : "OFF"); // Формируем payload
						send_mqtt_message(s_conn, mqtt_topic, mqtt_payload); // Отправляем сообщение
					} else {
						if (onlineFlg != 0) {
							printf("Error: MQTT not connected\r\n");
						}
					}
				} else {
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
						snprintf(mqtt_topic, sizeof(mqtt_topic), "/button/");// Формируем топик
						// Формируем payload в зависимости от команды
						switch (rxMsg.command) {
						case 3: // LONG_PRESS
							snprintf(mqtt_payload, sizeof(mqtt_payload),"ID=%d/LONG_PRESS/%s", rxMsg.deviceId,PinsConf[rxMsg.deviceId].lpress);
							break;
						case 4: // SINGLE_CLICK
							snprintf(mqtt_payload, sizeof(mqtt_payload),"ID=%d/SINGLE_CLICK/%s", rxMsg.deviceId,PinsConf[rxMsg.deviceId].sclick);
							break;
						case 5: // DOUBLE_CLICK
							snprintf(mqtt_payload, sizeof(mqtt_payload),"ID=%d/DOUBLE_CLICK/%s", rxMsg.deviceId,PinsConf[rxMsg.deviceId].dclick);
							break;
						}
						send_mqtt_message(s_conn, mqtt_topic, mqtt_payload);// Отправляем сообщение
					} else {
						if (onlineFlg != 0) {
							printf("Error: MQTT not connected\r\n");
						}
					}
				} else {
					printf("Error: MQTT settings not configured\r\n");
				}
				break;
			case 6:// SECURITY
//			    printf("Processing SECURITY message, deviceId: %d, state: %d\r\n", rxMsg.deviceId, rxMsg.state);
			    if (SetSettings.txmqttop[0] != '\0' && SetSettings.check_mqtt == 1) {
			        if (check_mqtt_connection(s_conn)) {
			            memset(mqtt_topic, 0, sizeof(mqtt_topic));
			            memset(mqtt_payload, 0, sizeof(mqtt_payload));
			            snprintf(mqtt_topic, sizeof(mqtt_topic), "/security/");

			            snprintf(mqtt_payload, sizeof(mqtt_payload), "SECURITY/ID=%d/ACTION=%s/%s", rxMsg.deviceId, PinsConf[rxMsg.deviceId].sclick, PinsConf[rxMsg.deviceId].info);

//			            printf("Sending MQTT message: Topic=%s, Payload=%s\r\n", mqtt_topic, mqtt_payload);

			            send_mqtt_message(s_conn, mqtt_topic, mqtt_payload);
//			            printf("MQTT message sent\r\n");
			        } else {
						if (onlineFlg != 0) {
							printf("Error: MQTT not connected\r\n");
						}
					}
			    } else {
			        printf("Error: MQTT settings not configured\r\n");
			    }
			    break;
            case 7:// TIMER'S
            	 if (SetSettings.txmqttop[0] != '\0' && SetSettings.check_mqtt == 1) {
						if (check_mqtt_connection(s_conn)) {

							memset(mqtt_topic, 0, sizeof(mqtt_topic));
							memset(mqtt_payload, 0, sizeof(mqtt_payload));

							strcpy(mqtt_topic, "/timer/");// Формируем топик

							// Формируем payload по частям
							strcpy(mqtt_payload, "TIMER/ID=");
							char temp[16];
							sprintf(temp, "%d", rxMsg.deviceId);
							strcat(mqtt_payload, temp);
							strcat(mqtt_payload, "/ACTION=");
							strcat(mqtt_payload, dbCrontxt[rxMsg.deviceId].activ);
							strcat(mqtt_payload, "/");
							strcat(mqtt_payload, dbCrontxt[rxMsg.deviceId].info);

							send_mqtt_message(s_conn, mqtt_topic, mqtt_payload);
						} else {
							if (onlineFlg != 0) {
								printf("Error: MQTT not connected\r\n");
							}
						}
					} else {
						printf("Error: MQTT settings not configured\r\n");
					}
					break;
			case 8:// OnOff
	           	 if (SetSettings.txmqttop[0] != '\0' && SetSettings.check_mqtt == 1) {
							if (check_mqtt_connection(s_conn)) {

								memset(mqtt_topic, 0, sizeof(mqtt_topic));
								memset(mqtt_payload, 0, sizeof(mqtt_payload));

								strcpy(mqtt_topic, "/onoff/");// Формируем топик

								// Формируем payload по частям
								strcpy(mqtt_payload, "ID=");
								char temp[16];
								sprintf(temp, "%d", rxMsg.deviceId);
								strcat(mqtt_payload, temp);
								strcat(mqtt_payload, "/OnOff=");
								strcat(mqtt_payload, PinsConf[rxMsg.deviceId].onoff ? "ON" : "OFF");
								strcat(mqtt_payload, "/");
								strcat(mqtt_payload, PinsConf[rxMsg.deviceId].info);

								send_mqtt_message(s_conn, mqtt_topic, mqtt_payload);
							} else {
								if (onlineFlg != 0) {
									printf("Error: MQTT not connected\r\n");
								}
							}
						} else {
							printf("Error: MQTT settings not configured\r\n");
						}
						break;
			default:
				printf("mqttnum = %d \r\n", mqttnum);
				break;
			}
//		printf("xQueueReceive number: %u\n", mqttnum);
		}
//		if(1){
//		printf("Messages waiting: %d \r\n", messagesWaiting);
//		printf("Empty spaces: %d \r\n", emptySpaces);
//	    osDelay(1000);
//		}
		publish_ds18b20_changes(s_conn);
		publish_dht22_changes(s_conn);
		osDelay(100);
	}
  /* USER CODE END StartMqttTask */
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
					snprintf(ds18b20[j].pin, sizeof(ds18b20[j].pin), "%s", PinsInfo[i].pins);

					init_ds18b20(&ow_conf[owpinnum].OneWire, ow_conf[owpinnum].OneWirePort, ow_conf[owpinnum].OneWirePin, &ow_conf[owpinnum].owflag, &ow_conf[owpinnum].temp_cnt, ds18b20[j].id, j);

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
	/* Infinite loop */
	for (;;) {
		if (dscount != 0) {
			for (uint8_t i = 0; i < MAX_DS18B20_P; i++) {
				if (ds18b20[i].onoff && ow_conf[i].owflag) {
					process_ds18b20(&ow_conf[i].OneWire, ow_conf[i].owflag, i);
				}
			}
		}
		osDelay(10);
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
				printf("+++ i = %d j = %d \r\n", i, j);
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
			check_DHT22_limits();// В этой функции откажись от process_actions() в пользуй action_handler()!
		}
		osDelay(10);
	}
  /* USER CODE END StartDht22Task */
}

/* USER CODE BEGIN Header_StartServiceTask */
/**
* @brief Function implementing the ServiceTask thread.
* @param argument: Not used
* @retval None
*/
/* USER CODE END Header_StartServiceTask */
void StartServiceTask(void *argument) {
	/* USER CODE BEGIN StartServiceTask */
	ulTaskNotifyTake(0, portMAX_DELAY);
	uint32_t now = 0;
	uint32_t oldchk = 0;
//	static uint8_t moonflag = 0; // Счетчик
	static uint8_t prevday = 0; // Для отслеживания смены дня
	static uint8_t prevmin = 0xFF; // Для отслеживания смены минуты
//	DateTime nextfullmoon; // Declare nextFullMoon outside the loop
	DateTime nextfullmnlcl; // Local time version of nextFullMoon
	/**********************************************************************/
	double degToRad(double degree) {
		return (degree * PI / 180);
	}
	// Convert radian to degree
	double radToDeg(double radian) {
		return (radian * 180 / PI);
	}
	// Calculate the day of the year
	int dayOfYear(int year, int month, int day) {
		int N1 = floor(275 * month / 9);
		int N2 = floor((month + 9) / 12);
		int N3 = (1 + floor((year - 4 * floor(year / 4) + 2) / 3));
		return N1 - (N2 * N3) + day - 30;
	}
	// Calculate sunrise or sunset
	double calculateSunriseOrSunset(int isSunrise) {
		int N = dayOfYear(year, month, day);
		// Convert the SetSettings.lon_de to hour value and calculate an approximate time
		double lngHour = SetSettings.lon_de / 15.0;
		double t = N + ((isSunrise ? 6 : 18) - lngHour) / 24;
		// Calculate the Sun's mean anomaly
		double M = (0.9856 * t) - 3.289;
		// Calculate the Sun's true SetSettings.lon_de
		double L = fmod( M + (1.916 * sin(degToRad(M))) + (0.020 * sin(2 * degToRad(M))) + 282.634, 360.0);
		// Calculate the Sun's right ascension
		double RA = fmod(radToDeg(atan(0.91764 * tan(degToRad(L)))), 360.0);
		// Right ascension value needs to be in the same quadrant as L
		double Lquadrant = floor(L / 90) * 90;
		double RAquadrant = floor(RA / 90) * 90;
		RA = RA + (Lquadrant - RAquadrant);
		// Right ascension value needs to be converted into hours
		RA = RA / 15;
		// Calculate the Sun's declination
		double sinDec = 0.39782 * sin(degToRad(L));
		double cosDec = cos(asin(sinDec));
		// Calculate the Sun's local hour angle
		double cosH = (sin(degToRad(ZENITH)) - (sinDec * sin(degToRad(SetSettings.lat_de)))) / (cosDec * cos(degToRad(SetSettings.lat_de)));
		if (cosH > 1 || cosH < -1) {
			return -1; // The sun never rises/sets on this location on the specified date
		}
		// Finish calculating H and convert into hours
		double H = isSunrise ? 360 - radToDeg(acos(cosH)) : radToDeg(acos(cosH));
		H = H / 15;
		// Calculate local mean time of rising/setting
		double T = H + RA - (0.06571 * t) - 6.622;
		// Adjust back to UTC
		double UT = fmod(T - lngHour + 24.0, 24.0);
		// Convert UT value to local time zone of SetSettings.lat_de/SetSettings.lon_de
		double localT = fmod(UT + SetSettings.timezone + 24.0, 24.0);
		return localT;
	}
	void printResults() {
		double sunrise = calculateSunriseOrSunset(1);
		double sunset = calculateSunriseOrSunset(0);
		if (sunrise == -1 || sunset == -1) {
			printf( "The sun doesn't rise or set on this day at this location.\n");
		} else {
			int sunriseHour = (int) sunrise;
			int sunriseMinute = (int) ((sunrise - sunriseHour) * 60);
			int sunsetHour = (int) sunset;
			int sunsetMinute = (int) ((sunset - sunsetHour) * 60);
//			printf("ServiceTask: date: %d-%d-%d\n", year, month, day);
//			printf("Location: %.4f, %.4f\n", SetSettings.lat_de, SetSettings.lon_de);
//			printf("SetSettings.timezone: UTC%f\n", SetSettings.timezone);
//			printf("Sunrise: %02d:%02d\n", sunriseHour, sunriseMinute);
//			printf("Sunset: %02d:%02d\n", sunsetHour, sunsetMinute);
			// Сохранение времени восхода солнца
			sprintf(SetSettings.sunrise, "%02d:%02d", sunriseHour, sunriseMinute);
			// Сохранение времени заката солнца
			sprintf(SetSettings.sunset, "%02d:%02d", sunsetHour, sunsetMinute);
			// Calculate day length
			double dayLength = sunset - sunrise;
			if (dayLength < 0)
				dayLength += 24;
			int dayLengthHours = (int) dayLength;
			int dayLengthMinutes = (int) ((dayLength - dayLengthHours) * 60);
			// Сохранение длины светового дня
			sprintf(SetSettings.dlength, "%02d:%02d", dayLengthHours, dayLengthMinutes);
//			printf("Day length: %02d hours and %02d minutes\n", dayLengthHours, dayLengthMinutes);
//			printf("---SetSettings.lat_de %.4f\n", SetSettings.lat_de);
//			printf("---SetSettings.lon_de %.4f\n", SetSettings.lon_de);
//			printf("---SetSettings.timezone: UTC%+.1f\n", SetSettings.timezone);
//			printf("Today's date: %02d.%02d.%d\n", day, month, year);
//			printf("Sunrise: %s\n", SetSettings.sunrise);
//			printf("Sunset: %s\n", SetSettings.sunset);
//			printf("Day light: %s\n", SetSettings.dlength);
		}
	}
	/**********************************************************************/
	/* Infinite loop */
	for (;;) {
		if (day != prevday) {
//           moonflag = 0;
			prevday = day;
			// Calculate after system reboot
			printResults();

			if (year != 0000) { // Ensure year is set
				calculateMoonPhase( (DateTime ) { year, month, day, timez->tm_hour, timez->tm_min, timez->tm_sec }, &nextfullmnlcl);
				nextfullmnlcl.hour += SetSettings.timezone; // Adjust for timezone
				if (nextfullmnlcl.hour >= 24) {
					nextfullmnlcl.hour -= 24;
					nextfullmnlcl.day++;
				}
				// Store the full moon data in the correct format
				uint8_t len = snprintf(SetSettings.fullmoon, sizeof(SetSettings.fullmoon), "%02d.%02d.%04d %02d:%02d", nextfullmnlcl.day, nextfullmnlcl.month, nextfullmnlcl.year,
						nextfullmnlcl.hour, nextfullmnlcl.minute);
				if (len < 0 || (size_t) len >= sizeof(SetSettings.fullmoon)) {
					printf("ERROR: len > setsettings.fullmoon! \n");
				}
			}

			if (SetSettings.lat_de != 0.0 && SetSettings.lon_de != 0.0) {
				if (now - oldchk >= 1000) {
					Check_SunriseSunset_Actions(); // Проверка "Sunrise/Sunset" after system reboot
					oldchk = HAL_GetTick();
				}
			}
		}

		if (timez->tm_min != prevmin) { // Проверка раз в минуту
			prevmin = timez->tm_min;
			if (timez->tm_hour == 0 && timez->tm_min == 1 && year != 0000) {
//          if (moonflag < 3) { // Для уверенности 3 раза!
				if (year != 0000) { // Ensure year is set
					calculateMoonPhase(
							(DateTime ) { year, month, day, timez->tm_hour, timez->tm_min, timez->tm_sec }, &nextfullmnlcl);
					nextfullmnlcl.hour += SetSettings.timezone; // Adjust for timezone
					if (nextfullmnlcl.hour >= 24) {
						nextfullmnlcl.hour -= 24;
						nextfullmnlcl.day++;
					}
					// Store the full moon data in the correct format
					uint8_t len = snprintf(SetSettings.fullmoon, sizeof(SetSettings.fullmoon), "%02d.%02d.%04d %02d:%02d", nextfullmnlcl.day,
							nextfullmnlcl.month, nextfullmnlcl.year, nextfullmnlcl.hour, nextfullmnlcl.minute);
					if (len < 0 || (size_t) len >= sizeof(SetSettings.fullmoon)) {
						printf("ERROR: len > setsettings.fullmoon! \n");
					}
				}
//             moonflag++;
//         }
			}
			if (SetSettings.lat_de != 0.0 && SetSettings.lon_de != 0.0) {
				if (now - oldchk >= 1000) {
					Check_SunriseSunset_Actions(); // Проверка "Sunrise/Sunset"
					oldchk = HAL_GetTick();
				}
			}
		}
//		if (sumowpin != 0) {
//			check_sensors_limits();
//		}
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
	xTaskNotify(ConfigTaskHandle, 0, eNoAction); // Уведомляем ConfigTask о завершении инициализации GSM Task!
//	printf("Hi world! It's from GPS task! \r\n");
	/* Infinite loop */
	for (;;) {
		if (gsm_available()) { //если модуль что-то прислал
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

            uint8_t current_state = HAL_GPIO_ReadPin(PinsInfo[i].gpio_name, PinsInfo[i].hal_pin);

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

                    if (trigger_event) {// Если обнаружено срабатывание
                        if ((currtime - PinsConf[i].lasttrg) >= 1000) {
                            if (PinsConf[i].onoff && PinsConf[i].sclick[0] != '\0' && strcmp(PinsConf[i].sclick, "None") != 0) {
                                action_handler(i, PinsConf[i].sclick, "Security action");

                                // Формируем payload для MQTT
                                memset(mqtt_payload, 0, sizeof(mqtt_payload));
                                snprintf(mqtt_payload, sizeof(mqtt_payload), "SECURITY/ID=%d/ACTION=%s/%s", i, PinsConf[i].sclick, PinsConf[i].info);

                                // Подготовка MQTT сообщения
                                mqttMsg.command = 6;
                                mqttMsg.deviceId = i;
                                mqttMsg.state = current_state;
                                mqttMsg.reserved = 0;

                                // Отправка в очередь
                                if (xQueueSend(mqttQueueHandle, &mqttMsg, 0) != pdPASS) {
                                    printf("Error sending SECURITY event to MQTT queue!\r\n");
                                }
                            }

                            if (PinsConf[i].onoff && PinsConf[i].send_sms[0] != '\0' && strcmp(PinsConf[i].send_sms, "None") != 0) {
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
  /* User can add his own implementation to report the HAL error return state */
  __disable_irq();
  while (1)
  {
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
  /* User can add his own implementation to report the file name and line number,
     ex: printf("Wrong parameters value: file %s on line %d\r\n", file, line) */
  /* USER CODE END 6 */
}
#endif /* USE_FULL_ASSERT */
