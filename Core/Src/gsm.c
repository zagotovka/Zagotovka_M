/*
 * gsm.c
 *
 *  Created on: 18 авг. 2019 г.
 *      Author: dima
 */
#include "gsm.h"
#include "cmsis_os.h"
#include "db.h"
#include "main.h"
#include "usart_ring.h"
#include "zagotovka.h"

#define SEND_STR_SIZE 64

extern MqttMessage_t mqttMsg;
extern BaseType_t mqtt_enqueue(const MqttMessage_t *msg);
extern uint8_t read_button_level(uint8_t button_id);

/* huart2 определён здесь — единственное место в проекте */
UART_HandleTypeDef huart2;

extern struct dbSettings SetSettings;

/* ===== Переменные SIM800L (единственное определение) ===== */
uint8_t Rx_data[524];
uint8_t test[524];
volatile uint32_t tx_сntr = 0;
volatile uint8_t needrsp = 0;
char tx_buffer[128];
uint32_t tx_cntr = 0;
uint32_t zerg_t;
uint32_t swarm_t;
uint8_t RxByte;                     // Буфер для приёма одного байта по UART
char dtmf_buf[DTMF_BUF_SIZE] = {0}; // Buffer to store DTMF digits
uint8_t dtmf_idx = 0;               // Index for DTMF buffer
char vldpins[240] = {0};            // Буфер для валидных пинов
char invpins[256] = {0};            // Буфер для невалидных пинов
int validcnt = 0;
int invldcnt = 0;
char buf[GSM_RX_BUFFER_SIZE] = {
    0,
};
char str2[GSM_RX_BUFFER_SIZE] = {
    0,
};

/* ===== Локальная функция инициализации USART2 (57600 baud) ===== */
static void MX_USART2_UART_Init(void) {
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
  if (HAL_UART_Init(&huart2) != HAL_OK) {
    Error_Handler();
  }
}

///////////////////////// Функция для замены смволов \r и \n на пробелы
///////////////////////////////
void replac_string(char *src) {
  if (!src)
    return;

  for (; *src; src++) {
    if (*src == '\n' || *src == '\r')
      *src = ' ';
  }
}

///////////////////////// Функция для отправки настроечных команд, в цикле лучше
/// не использовать ////////////////////////////
void set_comand(char *buff) {
  uint8_t count_err = 0;
  char str[SEND_STR_SIZE] = {
      0,
  };
  snprintf(str, SEND_STR_SIZE, "%s\r\n", buff);
  HAL_UART_Transmit(GSM, (uint8_t *)str, strlen(str), 1000);
  osDelay(200);
  memset(str, 0, SEND_STR_SIZE);
  for (uint8_t i = 0; i < 30; i++) {
    if (gsm_available()) // если модуль что-то прислал
    {
      uint16_t i = 0;
      while (gsm_available()) {
        str[i++] = gsm_read();
        if (i > SEND_STR_SIZE - 1)
          break;
        HAL_Delay(1);
      }
      replac_string(str);
      char *p = NULL;

      if ((p = strstr(str, "+CPAS:")) != NULL) {
        if (strstr(str, "0") == NULL) {
          HAL_UART_Transmit(myDEBUG, (uint8_t *)p, strlen(p), 1000);
          HAL_UART_Transmit(myDEBUG,
                            (uint8_t *)"\n+CPAS not ready, must be '0'\n",
                            strlen("\n+CPAS not ready, must be '0'\n"), 1000);

          while (1) // мигаем 5 секунд и ресетим плату
          {
            count_err++;
            HAL_GPIO_TogglePin(LD3_GPIO_Port, LD3_Pin);
            HAL_Delay(100);
            // if(count_err > 49) HAL_NVIC_SystemReset();
          }
        }
      } else if ((p = strstr(str, "+CREG:")) != NULL) {
        if (strstr(str, "0,1") == NULL) {
          HAL_UART_Transmit(myDEBUG, (uint8_t *)p, strlen(p), 1000);
          HAL_UART_Transmit(myDEBUG,
                            (uint8_t *)"\n+CREG not ready, must be '0,1'\n",
                            strlen("\n+CREG not ready, must be '0,1'\n"), 1000);

          while (1) // мигаем 5 секунд и ресетим плату
          {
            count_err++;
            HAL_GPIO_TogglePin(LD3_GPIO_Port, LD3_Pin);
            HAL_Delay(100);
            // if(count_err > 49) HAL_NVIC_SystemReset();
          }
        }
      }
      p = 0;
      char dbg_str[SEND_STR_SIZE + 32] = {
          0,
      };
      snprintf(dbg_str, SEND_STR_SIZE + 32, "Set %s %s\n", buff, str);
      HAL_UART_Transmit(myDEBUG, (uint8_t *)dbg_str, strlen(dbg_str), 1000);
      return;
    }
    HAL_Delay(500);
  } // END for()
  HAL_UART_Transmit(myDEBUG, (uint8_t *)"Not reply ", strlen("Not reply "),
                    1000);
  HAL_UART_Transmit(myDEBUG, (uint8_t *)buff, strlen(buff), 1000);
  while (1) // мигаем 5 секунд и ресетим плату
  {
    count_err++;
    HAL_GPIO_TogglePin(LD3_GPIO_Port, LD3_Pin);
    HAL_Delay(100);
    // if(count_err > 49) HAL_NVIC_SystemReset();
  }
}

/////////////////////// Функции для использования в цикле
/////////////////////////////
void disable_connection(void) {
  char ATH[] = "ATH\r\n"; // сбросить все соединения
  HAL_UART_Transmit(GSM, (uint8_t *)ATH, strlen(ATH), 1000);
}

void call(void) {
  char ATD[32];
  snprintf(ATD, sizeof(ATD), "ATD+%s\r\n", SetSettings.tel); // позвонить
  HAL_UART_Transmit(GSM, (uint8_t *)ATD, strlen(ATD), 1000);
}

void incoming_call(void) {
  char ATA[] = "ATA\r\n"; // принять звонок
  HAL_UART_Transmit(GSM, (uint8_t *)ATA, strlen(ATA), 1000);
}

void get_date_time(void) {
  char ATCCLK[] = "AT+CCLK?\r\n"; // узнать дату/время
  HAL_UART_Transmit(GSM, (uint8_t *)ATCCLK, strlen(ATCCLK), 1000);
}

void balance(void) {
  char ATCUSD[] = "AT+CUSD=1,\"*100#\"\r\n"; // запрос баланса через USSD
  HAL_UART_Transmit(GSM, (uint8_t *)ATCUSD, strlen(ATCUSD), 1000);
}

/////////////////// удалить символы \r и \n из строки //////////////////////
void clear_string(char *src) {
  char *dst = NULL;
  if (!src)
    return;
  uint8_t i = 0;

  for (dst = src; *src; src++) {
    if (i < 2 && (*src == '\n' || *src == '\r')) {
      i++;
      continue;
    } else if (*src == '\n' || *src == '\r')
      *src = ' ';
    *dst++ = *src;
  }
  *dst = 0;
}

//////////////// проверка и установка скорости 19200, нужна один раз
///////////////////////
void check_speed(void) {
  for (uint8_t i = 0; i < 7; i++) {
    uint32_t sp = 0;

    if (i == 0)
      sp = 2400;
    else if (i == 1)
      sp = 4800;
    else if (i == 2)
      sp = 9600;
    else if (i == 3)
      sp = 19200;
    else if (i == 4)
      sp = 38400;
    else if (i == 5)
      sp = 57600;
    else if (i == 6)
      sp = 115200;

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
    if (HAL_UART_Init(&huart2) != HAL_OK) {
      Error_Handler();
    }

    char str[16] = {
        0,
    };
    HAL_UART_Transmit(GSM, (uint8_t *)"AT\r\n", strlen("AT\r\n"), 1000);
    osDelay(300);

    if (gsm_available()) {
      uint16_t i = 0;
      while (gsm_available()) {
        str[i++] = gsm_read();
        if (i > 15)
          break;
        osDelay(1);
      }

      if (strstr(str, "OK") != NULL) {
        char buf_s[64] = {
            0,
        };
        snprintf(buf_s, 64, "Uart modem was %lu, switched to 57600\n",
                 huart2.Init.BaudRate);
        HAL_UART_Transmit(myDEBUG, (uint8_t *)buf_s, strlen(buf_s), 100);
        HAL_UART_Transmit(GSM, (uint8_t *)"AT+IPR=57600\r\n",
                          strlen("AT+IPR=57600\r\n"), 1000);
        osDelay(250);
        MX_USART2_UART_Init(); // переинициализируем на 57600
        break;
      }
    }
  }
}
/*************************** END GSM ************************************/

/*===========================================================================
 * init_sim800l_module()
 * Вызывается из StartSIM800LTask один раз при старте.
 * Инициализирует USART2 и модуль только если пользователь включил SIM800L
 * (SetSettings.sim800l == 1).
 *==========================================================================*/
void init_sim800l_module(void) {
  // osDelay(1000);
  // HAL_GPIO_WritePin(ON_RELAY_GPIO_Port, ON_RELAY_Pin, GPIO_PIN_SET);
  zerg_t = HAL_GetTick();
  swarm_t = HAL_GetTick();

  // osDelay(1000);
  // HAL_GPIO_WritePin(ON_RELAY_GPIO_Port, ON_RELAY_Pin, GPIO_PIN_SET);
  //	printf("Enabling UART interrupts...\r\n");
  __HAL_UART_ENABLE_IT(GSM, UART_IT_RXNE);
  __HAL_UART_ENABLE_IT(myDEBUG, UART_IT_RXNE);
  //    printf("Starting first UART receive...\r\n");
  HAL_StatusTypeDef status = HAL_UART_Receive_IT(GSM, &RxByte, 1);
  if (status != HAL_OK) {
    printf("Failed to start UART receive: %d\r\n", status);
  }
  //	osDelay(5000); // задержка чтоб модем успел раздуплиться, если его
  // включение происходит вместе с включением МК
  check_speed(); // проверка и установка скорости 19200, нужна один раз

  ////////////////// настройка модема ///////////////////
  set_comand(ATCPAS); // проверка статуса модема ответ должени быть примерно
                      // такой "+CPAS: 0"
  set_comand(
      ATCREG); // проверка регистрации в сети - должен вернуть  +CREG: 0,1
  set_comand(ATCLIP1); // включить АОН
  set_comand(ATE);     // отключить «эхо»
  set_comand(ATS);     // поднимать трубку только "вручную"
  set_comand(ATDDET);  // включить DTMF
  // set_comand(ATCCLKK); // установить дату/время

  /////////////////// настройки для работы с sms ////////////////
  set_comand(ATCMGF); // устанавливает текстовый режим смс-сообщения
  set_comand(ATCPBS); // открывает доступ к данным телефонной книги SIM-карты
  set_comand(ATCSCS); // кодировка текста - GSM
  set_comand(ATCNMI); // настройка вывода смс в консоль

  //////////////////// различная инфа /////////////////////
  set_comand(ATIPR);  // скорость usart'a модема
  set_comand(ATI);    // название и версия модуля
  set_comand(ATCGSN); // считывание IMEI из EEPROM
  set_comand(ATCSPN); // оператор сети
}

/*===========================================================================
 * process_sim800l_data()
 * Вызывается в цикле StartSIM800LTask когда в кольцевом буфере есть данные.
 *==========================================================================*/
void process_sim800l_data(void) {
  //	if (gsm_available()) //если модуль что-то прислал
  //	{
  // printf("Data available in buffer\r\n");
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
  //////// НАЧИНАЕМ РАСПОЗНАВАТЬ ЧТО ПРИСЛАЛ МОДУЛЬ //////////////
  if (strstr(buf, "RING") != NULL) // ЕСЛИ ЭТО ЗВОНОК
  {
    if (SetSettings.tel[0] != '\0') {           // проверка что номер задан
      if (strstr(buf, SetSettings.tel) != NULL) // если звонит нужный номер
      {
        // HAL_UART_Transmit(myDEBUG, (uint8_t*) "My number\n", strlen("My
        // number\n"), 1000);
        incoming_call(); // принять звонок
      } else {
        HAL_UART_Transmit(myDEBUG, (uint8_t *)"Unknow number or empty!\n",
                          strlen("Unknow number or empty!\n"), 1000);
        disable_connection(); // сброс соединения
      }
    }
  }
  if (strstr(buf, "+CMT:") != NULL) // ЕСЛИ ЭТО SMS
  {
    if (SetSettings.tel[0] != '\0') { // проверка что номер задан
      // printf("Raw SMS buffer:\n[%s]\n", buf);
      if (strstr(buf, SetSettings.tel) != NULL) // проверяем от кого смс
      {
        // HAL_UART_Transmit(myDEBUG, (uint8_t*) "Sms my number\n", strlen("Sms
        // my number\n"), 1000);
        //  Получаем первую часть сообщения из первого буфера
        char sms_text[GSM_RX_BUFFER_SIZE] = {0};
        char *first_part = strstr(buf, "+08\""); // ищем конец заголовка
        if (first_part != NULL) {
          first_part += 4; // пропускаем "+08\""
          strcpy(sms_text, first_part);
        }
        // Ждем вторую часть сообщения
        osDelay(500);
        // Читаем вторую часть сообщения
        uint16_t i = strlen(sms_text); // продолжаем с конца первой части
        while (gsm_available()) {
          sms_text[i++] = gsm_read();
          if (i >= GSM_RX_BUFFER_SIZE - 1)
            break;
          osDelay(1);
        }
        sms_text[i] = '\0';
        // printf("Complete SMS before cleaning: [%s]\n", sms_text);
        // HAL_UART_Transmit(myDEBUG, (uint8_t*) "Complete SMS received: ",
        // strlen("Complete SMS received: "), 1000); HAL_UART_Transmit(myDEBUG,
        // (uint8_t*) sms_text, strlen(sms_text), 1000);
        // HAL_UART_Transmit(myDEBUG, (uint8_t*) "\n", 1, 1000);

        clear_string(sms_text); // Очищаем строку от спецсимволов
        // printf("Final cleaned SMS: [%s]\n", sms_text);
        // Проверяем содержимое сообщения
        if (strstr(sms_text, "Zerg") != NULL) {
          HAL_UART_Transmit(myDEBUG, (uint8_t *)"Reciv Zerg\n",
                            strlen("Reciv Zerg\n"), 1000);
        } else if (strstr(sms_text, "Call") != NULL) {
          // printf("Found 'Call' in message!\n");
          call();
        } else {
          HAL_UART_Transmit(myDEBUG, (uint8_t *)"Unknown SMS content: ",
                            strlen("Unknown SMS content: "), 1000);
          HAL_UART_Transmit(myDEBUG, (uint8_t *)sms_text, strlen(sms_text),
                            1000);
          HAL_UART_Transmit(myDEBUG, (uint8_t *)"\n", 1, 1000);
        }
      } else {
        HAL_UART_Transmit(myDEBUG, (uint8_t *)"Unknow number sms\n",
                          strlen("Unknow number sms\n"), 1000);
      }
    }
  }
  if (strstr(buf, "+DTMF:") != NULL) { // ЕСЛИ ЭТО DTMF СИГНАЛ
    char dtmf_dig = buf[7];
    if (dtmf_idx < sizeof(dtmf_buf) - 1) {
      dtmf_buf[dtmf_idx++] = dtmf_dig;
      dtmf_buf[dtmf_idx] = '\0';
      if (dtmf_idx == 3) {
        if (strcmp(dtmf_buf, "777") == 0) {
          PinsConf[1].onoff = 1;
          strcpy(PinsConf[1].sclick, "All SMS alerts ON!"); // Это для MQTT
          send_sms(SMS_ENABLE_CODE);
          memset(dtmf_buf, 0, sizeof(dtmf_buf));
          dtmf_idx = 0;
          usbnum = 1; // Сохраянем в "pins.ini"
          xQueueSend(usbQueueHandle, &usbnum, 0);
          mqttMsg.command = 6;
          mqttMsg.deviceId = 1;
          mqttMsg.state = 0;
          mqttMsg.reserved = 0;
          mqtt_enqueue(&mqttMsg);
          return;
        } else if (strcmp(dtmf_buf, "222") == 0) {
          send_sms(SMS_DISABLE_CODE);
          strcpy(PinsConf[1].sclick, "All SMS alerts OFF!"); // Это для MQTT
          PinsConf[1].onoff = 0;
          memset(dtmf_buf, 0, sizeof(dtmf_buf));
          dtmf_idx = 0;
          usbnum = 1; // Сохраянем в "pins.ini"
          xQueueSend(usbQueueHandle, &usbnum, 0);
          mqttMsg.command = 6;
          mqttMsg.deviceId = 1;
          mqttMsg.state = 0;
          mqttMsg.reserved = 0;
          mqtt_enqueue(&mqttMsg);
          return;
        }
      }
      if (dtmf_idx >= 2 && dtmf_buf[dtmf_idx - 2] == '*' &&
          dtmf_buf[dtmf_idx - 1] == '#') {
        memset(vldpins, 0, sizeof(vldpins));
        memset(invpins, 0, sizeof(invpins));
        validcnt = 0;
        invldcnt = 0;
        char dbg_msg[DTMF_BUF_SIZE];
        const char prefix[] = "Processing commands: ";
        int free_sp = sizeof(dbg_msg) - strlen(prefix) - 2; // -2 для \n и \0
        snprintf(dbg_msg, sizeof(dbg_msg), "%s%.*s\n", prefix, free_sp,
                 dtmf_buf);
        // HAL_UART_Transmit(myDEBUG, (uint8_t*) dbg_msg, strlen(dbg_msg),
        // 1000);
        char *cmd = dtmf_buf;
        while (*cmd && cmd < dtmf_buf + dtmf_idx - 1) {
          int pin = 0;   // Ключ, тут int т.к ползователь может ввести случайно
                         // большое число!
          int value = 0; // Значение
          char *cmd_start = cmd;
          while (*cmd >= '0' && *cmd <= '9') {
            pin = pin * 10 + (*cmd - '0');
            cmd++;
          }
          if (*cmd == '#' && (*(cmd + 1) >= '0' && *(cmd + 1) <= '2') &&
              *(cmd + 2) == '*') {
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
                int cmd_len =
                    snprintf(cmd_msg, sizeof(cmd_msg), "%d:%d", pin, value);
                if (cmd_len < 0 || cmd_len >= sizeof(cmd_msg)) {
                  HAL_UART_Transmit(myDEBUG,
                                    (uint8_t *)"Error: cmd_msg overflow\n",
                                    strlen("Error: cmd_msg overflow\n"), 1000);
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
                  HAL_UART_Transmit(myDEBUG,
                                    (uint8_t *)"Error: pin_str overflow\n",
                                    strlen("Error: pin_str overflow\n"), 1000);
                  continue;
                }
                // Проверяем, достаточно ли места в vldpins
                if (strlen(vldpins) + strlen(pin_str) < sizeof(vldpins)) {
                  strcat(vldpins, pin_str);
                  validcnt++;
                } else {
                  HAL_UART_Transmit(
                      myDEBUG, (uint8_t *)"Error: vldpins buffer full\n",
                      strlen("Error: vldpins buffer full\n"), 1000);
                }
              } else {
                // Пин не соответствует типу устройства - добавляем в invalid
                char cmd_str[DTMF_BUF_SIZE];
                snprintf(cmd_str, sizeof(cmd_str), "%s%d#%d*",
                         invldcnt > 0 ? "," : "", pin, value);
                strcat(invpins, cmd_str);
                invldcnt++;
              }
            } else {
              // Пин вне допустимого диапазона - добавляем в invalid
              char cmd_str[DTMF_BUF_SIZE];
              snprintf(cmd_str, sizeof(cmd_str), "%s%d#%d*",
                       invldcnt > 0 ? "," : "", pin, value);
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
            char invalid_cmd[DTMF_BUF_SIZE] = {0};
            strncpy(invalid_cmd, cmd_start, cmd_len);
            // Добавляем полную невалидную команду в список
            if (strlen(invalid_cmd) > 0) {
              char cmd_str[DTMF_BUF_SIZE];
              snprintf(cmd_str, sizeof(cmd_str), "%s%s",
                       invldcnt > 0 ? "," : "", invalid_cmd);
              strcat(invpins, cmd_str);
              invldcnt++;
            }
            // Формируем сообщение об ошибке, явные проверки размеров буферо.
            strcpy(err_msg, "Error ");
            size_t prefix_len = strlen(err_msg);
            size_t max_cmd_len =
                sizeof(err_msg) - prefix_len - 2; // -2 для \n и \0
            strncat(err_msg, invalid_cmd, max_cmd_len);
            strcat(err_msg, "\n");
            // HAL_UART_Transmit(myDEBUG, (uint8_t*) err_msg, strlen(err_msg),
            // 1000);
            cmd = end;
          }
        }
        action_handler(0, vldpins,
                       "DTMF"); // Первый аргумент 0, поскольку это не имеет
                                // значения для действий 'vldpins'.

        // Выводим результаты
        char valid_msg[DTMF_BUF_SIZE];
        char invalid_msg[DTMF_BUF_SIZE];
        snprintf(valid_msg, sizeof(valid_msg), "Valid pins: %s\n", vldpins);
        snprintf(invalid_msg, sizeof(invalid_msg), "Invld pins/cmd: %s\n",
                 invpins);
        HAL_UART_Transmit(myDEBUG, (uint8_t *)valid_msg, strlen(valid_msg),
                          1000);
        HAL_UART_Transmit(myDEBUG, (uint8_t *)invalid_msg, strlen(invalid_msg),
                          1000);
        memset(dtmf_buf, 0, sizeof(dtmf_buf));
        dtmf_idx = 0;
      }
    }
    if (dtmf_idx >= sizeof(dtmf_buf) - 1) {
      memset(dtmf_buf, 0, sizeof(dtmf_buf));
      dtmf_idx = 0;
      HAL_UART_Transmit(myDEBUG, (uint8_t *)"Buffer overflow, cleared\n",
                        strlen("Buffer overflow, cleared\n"), 1000);
    }
  } else if (strstr(buf, "NO CARRIER") != NULL) {
    // Сброс буфера при разрыве соединения
    memset(dtmf_buf, 0, sizeof(dtmf_buf));
    dtmf_idx = 0;
    // HAL_UART_Transmit(myDEBUG, (uint8_t*) "Connection ended, buffer
    // cleared\n", strlen("Connection ended, buffer cleared\n"), 1000);
    //  Формируем и отправляем SMS после завершения звонка
    osDelay(1000); // Небольшая задержка для стабильности
    // Формируем сообщение с явным контролем длины
    char message[GSM_RX_BUFFER_SIZE];
    char formatted_vldpins[GSM_RX_BUFFER_SIZE]; // Буфер для форматированной
                                                // строки
    const char valid_prefix[] = "Valid pins: ";
    const char invalid_prefix[] = "\nInvld pins/cmd: ";
    // Форматируем vldpins, заменяя 1 на ON и 0 на OFF
    if (strlen(vldpins) > 0) {
      char *src = vldpins;
      char *dst = formatted_vldpins;

      while (*src) {
        char pin_number[4] = {0}; // Буфер для номера пина
        int i = 0;
        // Считываем номер пина до двоеточия
        while (*src && *src != ':') {
          pin_number[i++] = *src++;
        }
        if (*src == ':') { // Если нашли двоеточие
          src++;           // Пропускаем двоеточие и значение после него
          while (*src && *src != ',')
            src++; // Пропускаем старое значение

          // Получаем текущее состояние пина
          uint8_t pin_id = atoi(pin_number);
          uint8_t current_state = read_button_level(pin_id);
          if (PinsConf[pin_id].topin == 10) {      // Если SECURITY
            dst += sprintf(dst, "SEC-TY:%s:%s:%s", // SEC-TY:0:OFF:TEST-security
                           pin_number,
                           PinsConf[pin_id].onoff == 1
                               ? "ON"
                               : "OFF", // PinsConf[pin_id].send_sms,
                           PinsConf[pin_id].info);
          } else {
            // Для остальных устройств используем стандартный формат
            dst += sprintf(dst, "%s:%s", pin_number,
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
    int remaining_space =
        GSM_RX_BUFFER_SIZE - strlen(valid_prefix) - strlen(invalid_prefix) - 5;
    int max_per_section = remaining_space - 128;

    bool has_type_10 = false;
    uint8_t type_10_pin = 0;

    char *token = strtok(vldpins, ",");
    while (token != NULL) {
      char pin_str[4] = {0};
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
    if ((has_type_10 && PinsConf[1].onoff == 1 &&
         PinsConf[type_10_pin].onoff == 1) ||
        (validcnt > 0 && PinsConf[1].onoff == 1)) {
      // Проверяем, есть ли что отправлять
      if ((strlen(vldpins) > 0 && strcmp(formatted_vldpins, "None") != 0) ||
          (strlen(invpins) > 0 && strcmp(invpins, "None") != 0)) {
        message[0] = '\0';
        // Добавляем valid pins только если есть что добавлять
        if (strlen(formatted_vldpins) > 0 &&
            strcmp(formatted_vldpins, "None") != 0) {
          snprintf(message, GSM_RX_BUFFER_SIZE, "%s%.*s", valid_prefix,
                   max_per_section, formatted_vldpins);
          strncpy(mqtt_pins, formatted_vldpins,
                  sizeof(mqtt_pins) -
                      1); // Сохраняем копию formatted_vldpins для MQTT
          mqtt_pins[sizeof(mqtt_pins) - 1] = '\0';
        }
        // Добавляем invalid pins только если есть что добавлять
        if (strlen(invpins) > 0 && strcmp(invpins, "None") != 0) {
          int current_len = strlen(message);
          // Если это первая часть сообщения, не добавляем перенос строки
          const char *prefix =
              (current_len > 0) ? invalid_prefix : "Invld pins/cmd: ";
          snprintf(message + current_len, GSM_RX_BUFFER_SIZE - current_len,
                   "%s%.*s", prefix, max_per_section, invpins);
        }
        // Отправляем SMS
        snprintf(str2, GSM_RX_BUFFER_SIZE, "AT+CMGS=\"%s\"\r\n",
                 SetSettings.tel);
        HAL_UART_Transmit(GSM, (uint8_t *)str2, strlen(str2), 1000);
        osDelay(100);

        // Отправляем текст сообщения
        HAL_UART_Transmit(GSM, (uint8_t *)message, strlen(message), 1000);
        osDelay(100);

        // Отправляем символ ctrl-z для завершения сообщения
        uint8_t ctrlZ = 26;
        HAL_UART_Transmit(GSM, &ctrlZ, 1, 1000);
        // Отправляем в MQTT только если есть валидные пины.
        if (strlen(mqtt_pins) > 0) {
          strncpy(PinsConf[1].sclick, mqtt_pins,
                  sizeof(PinsConf[1].sclick) - 1);
          PinsConf[1].sclick[sizeof(PinsConf[1].sclick) - 1] = '\0';

          MqttMessage_t mqttMsg;
          mqttMsg.command = 1;
          mqttMsg.deviceId = 1;
          mqttMsg.state = 0;
          mqttMsg.reserved = 0;

          mqtt_enqueue(&mqttMsg);
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
