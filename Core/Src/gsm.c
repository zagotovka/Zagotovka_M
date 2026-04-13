/*
 * gsm.c
 *
 *  Created on: 18 авг. 2019 г.
 *      Author: dima
 */

#include "gsm.h"
#include "cmsis_os.h"
#include "db.h"
#include "main.h"    /* SMS_ENABLE_CODE, SMS_DISABLE_CODE, NUMPIN и др. */
#include "setings.h" /* SetSettings */
#include "usart_ring.h" /* GSM_RX_BUFFER_SIZE, DTMF_BUF_SIZE, gsm_available(), gsm_read() */
#include "zagotovka.h" /* send_sms(), action_handler() */

#define SEND_STR_SIZE 64

/* ───── extern-объявления переменных, живущих в main.c ───── */
extern struct dbSettings SetSettings;
extern struct dbPinsConf PinsConf[NUMPIN];
extern struct dbPinsInfo PinsInfo[NUMPIN];
extern osMessageQueueId_t mqttQueueHandle;
extern osMessageQueueId_t usbQueueHandle;
extern UART_HandleTypeDef huart2;
extern UART_HandleTypeDef huart3;
extern uint8_t RxByte;
extern uint32_t zerg_t;
extern uint32_t swarm_t;

/* ───── extern-объявления функций из других модулей ───── */
extern uint8_t read_button_level(uint8_t button_id);
extern void send_sms(int index);
extern void Error_Handler(void);
extern void process_actions(const char *actions);
/* MX_USART2_UART_Init — static в main.c, недоступна напрямую.
 * check_speed() переинициализирует UART вручную через HAL_UART_Init(). */

/* ───── Переменные GSM-модуля (перенесены из main.c) ───── */
char dtmf_buf[DTMF_BUF_SIZE] = {0}; /* буфер DTMF-цифр              */
uint8_t dtmf_idx = 0;               /* индекс в dtmf_buf             */
char vldpins[240] = {0};            /* валидные пины  (результат)    */
char invpins[256] = {0};            /* невалидные пины (результат)   */
int validcnt = 0;
int invldcnt = 0;
char buf[GSM_RX_BUFFER_SIZE] = {0};  /* рабочий приёмный буфер        */
char str2[GSM_RX_BUFFER_SIZE] = {0}; /* вспомогательный буфер         */

/* ────────────────────────────────────────────────────────────
 *  Внутренние вспомогательные функции
 * ──────────────────────────────────────────────────────────── */

/* Удаляет первые два символа \r/\n из строки, остальные заменяет пробелом */
static void clear_string(char *src) {
  char *dst = NULL;
  if (!src)
    return;
  uint8_t i = 0;
  for (dst = src; *src; src++) {
    if (i < 2 && (*src == '\n' || *src == '\r')) {
      i++;
      continue;
    } else if (*src == '\n' || *src == '\r') {
      *src = ' ';
    }
    *dst++ = *src;
  }
  *dst = 0;
}

/* Заменяет все \r/\n на пробелы (для set_comand) */
void replac_string(char *src) {
  if (!src)
    return;
  for (; *src; src++) {
    if (*src == '\n' || *src == '\r')
      *src = ' ';
  }
}

/* Проверка и установка скорости UART модема (выполняется один раз при init) */
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

    char str[16] = {0};
    HAL_UART_Transmit(GSM, (uint8_t *)"AT\r\n", strlen("AT\r\n"), 1000);
    osDelay(300);

    if (gsm_available()) {
      uint16_t j = 0;
      while (gsm_available()) {
        str[j++] = gsm_read();
        if (j > 15)
          break;
        osDelay(1);
      }
      if (strstr(str, "OK") != NULL) {
        char cbuf[64] = {0};
        snprintf(cbuf, 64, "Uart modem was %lu, switched to 57600\n",
                 huart2.Init.BaudRate);
        HAL_UART_Transmit(myDEBUG, (uint8_t *)cbuf, strlen(cbuf), 100);
        HAL_UART_Transmit(GSM, (uint8_t *)"AT+IPR=57600\r\n",
                          strlen("AT+IPR=57600\r\n"), 1000);
        osDelay(250);
        /* Переинициализируем UART на 57600 напрямую,
         * т.к. MX_USART2_UART_Init() static в main.c */
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
        break;
      }
    }
  }
}

/* ────────────────────────────────────────────────────────────
 *  set_comand — отправка AT-команды с ожиданием ответа
 * ──────────────────────────────────────────────────────────── */
void set_comand(char *buff) {
  uint8_t count_err = 0;
  char str[SEND_STR_SIZE] = {0};
  snprintf(str, SEND_STR_SIZE, "%s\r\n", buff);
  HAL_UART_Transmit(GSM, (uint8_t *)str, strlen(str), 1000);
  osDelay(200);
  memset(str, 0, SEND_STR_SIZE);

  for (uint8_t i = 0; i < 30; i++) {
    if (gsm_available()) {
      uint16_t j = 0;
      while (gsm_available()) {
        str[j++] = gsm_read();
        if (j > SEND_STR_SIZE - 1)
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
          while (1) {
            count_err++;
            HAL_GPIO_TogglePin(LD3_GPIO_Port, LD3_Pin);
            HAL_Delay(100);
          }
        }
      } else if ((p = strstr(str, "+CREG:")) != NULL) {
        if (strstr(str, "0,1") == NULL) {
          HAL_UART_Transmit(myDEBUG, (uint8_t *)p, strlen(p), 1000);
          HAL_UART_Transmit(myDEBUG,
                            (uint8_t *)"\n+CREG not ready, must be '0,1'\n",
                            strlen("\n+CREG not ready, must be '0,1'\n"), 1000);
          while (1) {
            count_err++;
            HAL_GPIO_TogglePin(LD3_GPIO_Port, LD3_Pin);
            HAL_Delay(100);
          }
        }
      }
      p = 0;
      char dbg_str[SEND_STR_SIZE + 32] = {0};
      snprintf(dbg_str, SEND_STR_SIZE + 32, "Set %s %s\n", buff, str);
      HAL_UART_Transmit(myDEBUG, (uint8_t *)dbg_str, strlen(dbg_str), 1000);
      return;
    }
    HAL_Delay(500);
  }
  HAL_UART_Transmit(myDEBUG, (uint8_t *)"Not reply ", strlen("Not reply "),
                    1000);
  HAL_UART_Transmit(myDEBUG, (uint8_t *)buff, strlen(buff), 1000);
  while (1) {
    count_err++;
    HAL_GPIO_TogglePin(LD3_GPIO_Port, LD3_Pin);
    HAL_Delay(100);
  }
}

/* ────────────────────────────────────────────────────────────
 *  Управление соединением
 * ──────────────────────────────────────────────────────────── */
void disable_connection(void) {
  char ATH[] = "ATH\r\n";
  HAL_UART_Transmit(GSM, (uint8_t *)ATH, strlen(ATH), 1000);
}

void call(void) {
  char ATD[32];
  snprintf(ATD, sizeof(ATD), "ATD+%s\r\n", SetSettings.tel);
  HAL_UART_Transmit(GSM, (uint8_t *)ATD, strlen(ATD), 1000);
}

void incoming_call(void) {
  char ATA[] = "ATA\r\n";
  HAL_UART_Transmit(GSM, (uint8_t *)ATA, strlen(ATA), 1000);
}

void get_date_time(void) {
  char ATCCLK[] = "AT+CCLK?\r\n";
  HAL_UART_Transmit(GSM, (uint8_t *)ATCCLK, strlen(ATCCLK), 1000);
}

/* ────────────────────────────────────────────────────────────
 *  init_sim800l_module — перенесена из main.c
 * ──────────────────────────────────────────────────────────── */
void init_sim800l_module(void) {
  zerg_t = HAL_GetTick();
  swarm_t = HAL_GetTick();

  __HAL_UART_ENABLE_IT(GSM, UART_IT_RXNE);
  __HAL_UART_ENABLE_IT(myDEBUG, UART_IT_RXNE);

  HAL_StatusTypeDef status = HAL_UART_Receive_IT(GSM, &RxByte, 1);
  if (status != HAL_OK) {
    printf("Failed to start UART receive: %d\r\n", status);
  }

  check_speed();

  /* Настройка модема */
  set_comand(ATCPAS);
  set_comand(ATCREG);
  set_comand(ATCLIP1);
  set_comand(ATE);
  set_comand(ATS);
  set_comand(ATDDET);

  /* Настройки SMS */
  set_comand(ATCMGF);
  set_comand(ATCPBS);
  set_comand(ATCSCS);
  set_comand(ATCNMI);

  /* Информация */
  set_comand(ATIPR);
  set_comand(ATI);
  set_comand(ATCGSN);
  set_comand(ATCSPN);
}

/* ════════════════════════════════════════════════════════════
 *  execute_commands — общая функция разбора команд
 *
 *  Принимает строку команд формата:  ID#Action*[ID#Action*...]
 *  где Action: 0 = OFF, 1 = ON, 2 = TOGGLE
 *  Результат записывается в глобальные vldpins / invpins.
 *  Подходит как для DTMF, так и для SMS.
 * ════════════════════════════════════════════════════════════ */
void execute_commands(char *cmd_str) {
  char *cmd = cmd_str;

  while (*cmd) {
    int pin = 0;
    int value = 0;
    char *cmd_start = cmd;

    /* Читаем номер пина */
    while (*cmd >= '0' && *cmd <= '9') {
      pin = pin * 10 + (*cmd - '0');
      cmd++;
    }

    if (*cmd == '#') {
      int valid_format = 0;
      char *hash_pos = cmd;
      cmd++; /* пропускаем # */

      if (*cmd >= '0' && *cmd <= '5' && *(cmd + 1) == '*') {
        value = *cmd - '0';
        cmd += 2; /* пропускаем значение и * */
        valid_format = 1;
      } else if ((*cmd == 'S' || *cmd == 's') && (*(cmd + 1) == 'L' || *(cmd + 1) == 'l') && *(cmd + 2) == '*') {
        value = 3;
        cmd += 3;
        valid_format = 1;
      } else if ((*cmd == 'D' || *cmd == 'd') && (*(cmd + 1) == 'C' || *(cmd + 1) == 'c') && *(cmd + 2) == '*') {
        value = 4;
        cmd += 3;
        valid_format = 1;
      } else if ((*cmd == 'L' || *cmd == 'l') && (*(cmd + 1) == 'P' || *(cmd + 1) == 'p') && *(cmd + 2) == '*') {
        value = 5;
        cmd += 3;
        valid_format = 1;
      }

      if (valid_format) {
        if (pin >= 0 && pin < NUMPIN) {
          if ((PinsConf[pin].topin == 2 || PinsConf[pin].topin == 10 || PinsConf[pin].topin == 3) && (value >= 0 && value <= 2)) {
            /* Для типа SECURITY (topin==10) и SWITCH (topin==3) управляем onoff */
            if (PinsConf[pin].topin == 10 || PinsConf[pin].topin == 3) {
              if (value == 1) PinsConf[pin].onoff = 1;
              else if (value == 0) PinsConf[pin].onoff = 0;
              else if (value == 2) PinsConf[pin].onoff = !PinsConf[pin].onoff;
            }

            /* Формируем строку "pin:value" и добавляем в vldpins */
            char cmd_msg[16];
            int cmd_len = snprintf(cmd_msg, sizeof(cmd_msg), "%d:%d", pin, value);
            if (cmd_len < 0 || cmd_len >= (int)sizeof(cmd_msg)) {
              HAL_UART_Transmit(myDEBUG, (uint8_t *)"Error: cmd_msg overflow\n",
                                strlen("Error: cmd_msg overflow\n"), 1000);
              continue;
            }

            char pin_str[17];
            int pin_len;
            if (validcnt > 0)
              pin_len = snprintf(pin_str, sizeof(pin_str), ",%s", cmd_msg);
            else
              pin_len = snprintf(pin_str, sizeof(pin_str), "%s", cmd_msg);

            if (pin_len < 0 || pin_len >= (int)sizeof(pin_str)) {
              HAL_UART_Transmit(myDEBUG, (uint8_t *)"Error: pin_str overflow\n",
                                strlen("Error: pin_str overflow\n"), 1000);
              continue;
            }

            if (strlen(vldpins) + strlen(pin_str) < sizeof(vldpins)) {
              strcat(vldpins, pin_str);
              validcnt++;
            } else {
              HAL_UART_Transmit(myDEBUG,
                                (uint8_t *)"Error: vldpins buffer full\n",
                                strlen("Error: vldpins buffer full\n"), 1000);
            }

          } else if (PinsConf[pin].topin == 1 && (value >= 3 && value <= 5)) {
            /* Для типа BUTTON (topin==1) обрабатываем нажатие */
            if (value == 3 && PinsConf[pin].sclick[0] != '\0') {
              process_actions(PinsConf[pin].sclick);
            } else if (value == 4 && PinsConf[pin].dclick[0] != '\0') {
              process_actions(PinsConf[pin].dclick);
            } else if (value == 5 && PinsConf[pin].lpress[0] != '\0') {
              process_actions(PinsConf[pin].lpress);
            }

            /* Формируем строку "pin:value" и добавляем в vldpins для отчета */
            char cmd_msg[16];
            int cmd_len = snprintf(cmd_msg, sizeof(cmd_msg), "%d:%d", pin, value);
            if (cmd_len > 0 && cmd_len < (int)sizeof(cmd_msg)) {
              char pin_str[17];
              if (validcnt > 0)
                snprintf(pin_str, sizeof(pin_str), ",%s", cmd_msg);
              else
                snprintf(pin_str, sizeof(pin_str), "%s", cmd_msg);

              if (strlen(vldpins) + strlen(pin_str) < sizeof(vldpins)) {
                strcat(vldpins, pin_str);
                validcnt++;
              }
            }
          } else {
            /* Пин не того типа или неверное значение — в невалидные */
            char inv_str[DTMF_BUF_SIZE];
            snprintf(inv_str, sizeof(inv_str), "%s%d#%d*",
                     invldcnt > 0 ? "," : "", pin, value);
            strcat(invpins, inv_str);
            invldcnt++;
          }
        } else {
          /* Пин вне диапазона — в невалидные */
          char inv_str[DTMF_BUF_SIZE];
          snprintf(inv_str, sizeof(inv_str), "%s%d#%d*", invldcnt > 0 ? "," : "",
                   pin, value);
          strcat(invpins, inv_str);
          invldcnt++;
        }
      } else {
        /* Неверный формат команды (восстанавливаем cmd для обработки ошибки) */
        cmd = hash_pos;
        char *end = cmd;
        while (*end && *end != '*')
          end++;
        if (*end == '*')
          end++;

      int inv_len = end - cmd_start;
      char invalid_cmd[DTMF_BUF_SIZE] = {0};
      strncpy(invalid_cmd, cmd_start, inv_len);

      if (strlen(invalid_cmd) > 0) {
        char inv_str[DTMF_BUF_SIZE];
        snprintf(inv_str, sizeof(inv_str), "%s%s", invldcnt > 0 ? "," : "",
                 invalid_cmd);
        strcat(invpins, inv_str);
        invldcnt++;
      }

      char err_msg[DTMF_BUF_SIZE];
      strcpy(err_msg, "Error ");
      size_t prefix_len = strlen(err_msg);
      size_t max_cmd_len = sizeof(err_msg) - prefix_len - 2;
      strncat(err_msg, invalid_cmd, max_cmd_len);
      strcat(err_msg, "\n");
      cmd = end;
    }
  }
  }
  /* Выполняем валидные действия */
  action_handler(0, vldpins, "CMD");

  /* Отладочный вывод */
  char valid_msg[DTMF_BUF_SIZE];
  char invalid_msg[DTMF_BUF_SIZE];
  snprintf(valid_msg, sizeof(valid_msg), "Valid pins: %s\n", vldpins);
  snprintf(invalid_msg, sizeof(invalid_msg), "Invld pins/cmd: %s\n", invpins);
  HAL_UART_Transmit(myDEBUG, (uint8_t *)valid_msg, strlen(valid_msg), 1000);
  HAL_UART_Transmit(myDEBUG, (uint8_t *)invalid_msg, strlen(invalid_msg), 1000);
}

/* ════════════════════════════════════════════════════════════
 *  send_command_result_sms — формирует и отправляет SMS-отчёт
 *  по результатам execute_commands().
 *  Логика идентична DTMF-блоку "NO CARRIER" из оригинального main.c.
 * ════════════════════════════════════════════════════════════ */
void send_command_result_sms(void) {
  char mqtt_pins[240];
  char formatted_vldpins[GSM_RX_BUFFER_SIZE];

  const char valid_prefix[] = "Valid pins: ";
  const char invalid_prefix[] = " Invld pins/cmd: ";

  /* Форматируем vldpins: заменяем "pin:value" на "pin:ON/OFF" */
  if (strlen(vldpins) > 0) {
    /*
     * Формат результата:
     *   SEC-TY:86:OFF,87:ON   — для topin==10, префикс один раз
     *   2:ON,3:OFF            — для topin==2, без префикса
     */
    /* "SEC-TY:" = 7 символов, оставляем место в formatted_vldpins */
    char sec_buf[GSM_RX_BUFFER_SIZE - 8] = {0}; /* пины типа 10 (SECURITY) */
    char out_buf[GSM_RX_BUFFER_SIZE - 8] = {0}; /* пины типа 2  (OUTPUT)   */
    int sec_cnt = 0;
    int out_cnt = 0;

    char vldpins_fmt[sizeof(vldpins)];
    strncpy(vldpins_fmt, vldpins, sizeof(vldpins_fmt) - 1);
    vldpins_fmt[sizeof(vldpins_fmt) - 1] = '\0';

    char *tok = strtok(vldpins_fmt, ",");
    while (tok != NULL) {
      char pin_number[4] = {0};
      int k = 0;
      while (tok[k] && tok[k] != ':' && k < 3) {
        pin_number[k] = tok[k];
        k++;
      }
      uint8_t pin_id = atoi(pin_number);

      char *colon = strchr(tok, ':');
      int action_val = -1;
      if (colon) { action_val = atoi(colon + 1); }

      if (PinsConf[pin_id].topin == 10) {
        char entry[32];
        snprintf(entry, sizeof(entry), "%s%s:%s", sec_cnt > 0 ? "," : "",
                 pin_number, PinsConf[pin_id].onoff == 1 ? "ON" : "OFF");
        strncat(sec_buf, entry, sizeof(sec_buf) - strlen(sec_buf) - 1);
        sec_cnt++;
      } else if (PinsConf[pin_id].topin == 3) {
        /* Switch logic */
        char entry[16];
        snprintf(entry, sizeof(entry), "%s%s:%s", out_cnt > 0 ? "," : "",
                 pin_number, PinsConf[pin_id].onoff == 1 ? "ON" : "OFF");
        strncat(out_buf, entry, sizeof(out_buf) - strlen(out_buf) - 1);
        out_cnt++;
      } else if (PinsConf[pin_id].topin == 1) {
        /* Button logic */
        char entry[16];
        const char *btn_act = "SC";
        if (action_val == 4) btn_act = "DC";
        else if (action_val == 5) btn_act = "LP";
        snprintf(entry, sizeof(entry), "%s%s:%s", out_cnt > 0 ? "," : "",
                 pin_number, btn_act);
        strncat(out_buf, entry, sizeof(out_buf) - strlen(out_buf) - 1);
        out_cnt++;
      } else {
        /* Physical device output */
        uint8_t current_state = read_button_level(pin_id);
        char entry[16];
        snprintf(entry, sizeof(entry), "%s%s:%s", out_cnt > 0 ? "," : "",
                 pin_number, current_state == GPIO_PIN_SET ? "ON" : "OFF");
        strncat(out_buf, entry, sizeof(out_buf) - strlen(out_buf) - 1);
        out_cnt++;
      }
      tok = strtok(NULL, ",");
    }

    /* Собираем итоговую строку */
    formatted_vldpins[0] = '\0';
    if (sec_cnt > 0)
      snprintf(formatted_vldpins, GSM_RX_BUFFER_SIZE, "SEC-TY:%s", sec_buf);
    if (out_cnt > 0) {
      if (sec_cnt > 0)
        strncat(formatted_vldpins, " ",
                GSM_RX_BUFFER_SIZE - strlen(formatted_vldpins) - 1);
      strncat(formatted_vldpins, out_buf,
              GSM_RX_BUFFER_SIZE - strlen(formatted_vldpins) - 1);
    }
    if (strlen(formatted_vldpins) == 0)
      strcpy(formatted_vldpins, "None");
  } else {
    strcpy(formatted_vldpins, "None");
  }

  /* Вычисляем доступное место */
  int remaining_space =
      GSM_RX_BUFFER_SIZE - strlen(valid_prefix) - strlen(invalid_prefix) - 5;
  int max_per_section = remaining_space - 128;

  /* Проверяем, есть ли пин типа 10 (SECURITY) в валидных */
  bool has_type_10 = false;
  uint8_t type_10_pin = 0;
  char vldpins_copy[sizeof(vldpins)];
  strncpy(vldpins_copy, vldpins, sizeof(vldpins_copy));
  vldpins_copy[sizeof(vldpins_copy) - 1] = '\0';

  char *token = strtok(vldpins_copy, ",");
  while (token != NULL) {
    char pin_str[4] = {0};
    int pi = 0;
    while (token[pi] != ':' && pi < (int)sizeof(pin_str) - 1) {
      pin_str[pi] = token[pi];
      pi++;
    }
    uint8_t pin = atoi(pin_str);
    if (PinsConf[pin].topin == 10) {
      has_type_10 = true;
      type_10_pin = pin;
      break;
    }
    token = strtok(NULL, ",");
  }

  /* Условие отправки — то же, что в DTMF-блоке */
  if ((has_type_10 && PinsConf[1].onoff == 1 &&
       PinsConf[type_10_pin].onoff == 1) ||
      (validcnt > 0 && PinsConf[1].onoff == 1)) {
    if ((strlen(vldpins) > 0 && strcmp(formatted_vldpins, "None") != 0) ||
        (strlen(invpins) > 0 && strcmp(invpins, "None") != 0)) {
      char message[GSM_RX_BUFFER_SIZE];
      message[0] = '\0';
      mqtt_pins[0] = '\0';

      if (strlen(formatted_vldpins) > 0 &&
          strcmp(formatted_vldpins, "None") != 0) {
        snprintf(message, GSM_RX_BUFFER_SIZE, "%s%.*s", valid_prefix,
                 max_per_section, formatted_vldpins);
        strncpy(mqtt_pins, formatted_vldpins, sizeof(mqtt_pins) - 1);
        mqtt_pins[sizeof(mqtt_pins) - 1] = '\0';
      }

      if (strlen(invpins) > 0 && strcmp(invpins, "None") != 0) {
        int current_len = strlen(message);
        const char *pfx =
            (current_len > 0) ? invalid_prefix : "Invld pins/cmd: ";
        snprintf(message + current_len, GSM_RX_BUFFER_SIZE - current_len,
                 "%s%.*s", pfx, max_per_section, invpins);
      }

      /* Отправляем SMS */
      char str[GSM_RX_BUFFER_SIZE];
      snprintf(str, GSM_RX_BUFFER_SIZE, "AT+CMGS=\"%s\"\r\n", SetSettings.tel);
      HAL_UART_Transmit(GSM, (uint8_t *)str, strlen(str), 1000);
      osDelay(100);
      HAL_UART_Transmit(GSM, (uint8_t *)message, strlen(message), 1000);
      osDelay(100);
      uint8_t ctrlZ = 26;
      HAL_UART_Transmit(GSM, &ctrlZ, 1, 1000);

      /* Отправляем в MQTT только если есть валидные пины */
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
}

/* ════════════════════════════════════════════════════════════
 *  process_sim800l_data — перенесена и переработана из main.c
 *
 *  DTMF: логика без изменений, парсинг делегирован execute_commands().
 *  SMS:  Zerg/Call удалены; добавлена обработка 777/222
 *        и команд формата ID#Action*[...] через execute_commands().
 *        Отчётный SMS отправляется по "NO CARRIER" (как у DTMF).
 * ════════════════════════════════════════════════════════════ */
void process_sim800l_data(void) {
  uint16_t i = 0;
  memset(buf, 0, GSM_RX_BUFFER_SIZE);
  osDelay(50);
  while (gsm_available()) {
    buf[i++] = gsm_read();
    if (i > GSM_RX_BUFFER_SIZE - 1)
      break;
    osDelay(1);
  }
  clear_string(buf);

  /* ── ЗВОНОК ── */
  if (strstr(buf, "RING") != NULL) {
    if (SetSettings.tel[0] != '\0') {
      if (strstr(buf, SetSettings.tel) != NULL) {
        incoming_call();
      } else {
        HAL_UART_Transmit(myDEBUG, (uint8_t *)"Unknow number or empty!\n",
                          strlen("Unknow number or empty!\n"), 1000);
        disable_connection();
      }
    }
  }

  /* ── SMS ── */
  if (strstr(buf, "+CMT:") != NULL) {
    if (SetSettings.tel[0] != '\0') {
      if (strstr(buf, SetSettings.tel) != NULL) {

        /* Считываем текст SMS
         * Заголовок CMT имеет вид:
         *   +CMT: "+358...","","yy/mm/dd,hh:mm:ss+ZZ"
         * После заголовка идёт \r\n, затем тело SMS.
         * Ищем конец заголовка по последней кавычке перед телом.
         * НЕ используем маркер "+08\"" — он зависит от часового пояса. */
        char sms_text[GSM_RX_BUFFER_SIZE] = {0};

        /* ─────────────────────────────────────────────────────────
         *  ВАЖНО: clear_string(buf) уже вызвана выше и заменила
         *  все \r\n на пробелы. Поэтому искать \r\n нельзя!
         *
         *  Формат CMT-заголовка:
         *    +CMT: "+7XXX","","YY/MM/DD,HH:MM:SS+ZZ"
         *  Три поля в кавычках = 6 кавычек итого.
         *  После 6-й кавычки идут пробелы (бывший \r\n),
         *  затем тело SMS.
         * ───────────────────────────────────────────────────────── */
        char *cmt_line = strstr(buf, "+CMT:");
        char *body_start = NULL;
        if (cmt_line != NULL) {
          char *scan = cmt_line + 5; /* пропускаем "+CMT:" */
          int qcnt = 0;
          while (*scan && qcnt < 6) {
            if (*scan == '"')
              qcnt++;
            scan++;
          }
          /* scan стоит сразу после 6-й кавычки (конец заголовка) */
          /* пропускаем пробелы, которые заменили \r\n */
          while (*scan == ' ' || *scan == '\r' || *scan == '\n')
            scan++;
          if (*scan != '\0')
            body_start = scan;
        }

        if (body_start != NULL && *body_start != '\0') {
          strncpy(sms_text, body_start, GSM_RX_BUFFER_SIZE - 1);
          sms_text[GSM_RX_BUFFER_SIZE - 1] = '\0';
          /* Обрезаем по первому пробелу-терминатору
           * (пробел = бывший \r\n конца тела SMS).         */
          char *tail = sms_text;
          while (*tail && *tail != '\r' && *tail != '\n')
            tail++;
          *tail = '\0';
          /* Убираем завершающие пробелы */
          int len = (int)strlen(sms_text);
          while (len > 0 && sms_text[len - 1] == ' ')
            sms_text[--len] = '\0';
        }

        /* Дочитываем остаток тела если SMS пришла не целиком */
        osDelay(500);
        uint16_t j = strlen(sms_text);
        while (gsm_available()) {
          char c = gsm_read();
          if (c == '\r' || c == '\n')
            break; /* конец тела */
          sms_text[j++] = c;
          if (j >= GSM_RX_BUFFER_SIZE - 1)
            break;
          osDelay(1);
        }
        sms_text[j] = '\0';
        /* Обрезаем пробелы в конце */
        while (j > 0 && sms_text[j - 1] == ' ')
          sms_text[--j] = '\0';

        /* Отладочный вывод — убрать после проверки */
        HAL_UART_Transmit(myDEBUG, (uint8_t *)"SMS body: [",
                          strlen("SMS body: ["), 1000);
        HAL_UART_Transmit(myDEBUG, (uint8_t *)sms_text, strlen(sms_text), 1000);
        HAL_UART_Transmit(myDEBUG, (uint8_t *)"]\n", 2, 1000);

        /* ── Быстрые команды 777 / 222 ── */
        if (strstr(sms_text, "777") != NULL) {
          PinsConf[1].onoff = 1;
          strcpy(PinsConf[1].sclick, "All SMS alerts ON!");
          send_sms(SMS_ENABLE_CODE);

          uint8_t usbnum = 1;
          xQueueSend(usbQueueHandle, &usbnum, 0);

          MqttMessage_t mqttMsg;
          mqttMsg.command = 6;
          mqttMsg.deviceId = 1;
          mqttMsg.state = 0;
          mqttMsg.reserved = 0;
          if (xQueueSend(mqttQueueHandle, &mqttMsg, 0) != pdPASS) {
            printf("Error sending SMS 777 to MQTT queue!\r\n");
          }

        } else if (strstr(sms_text, "222") != NULL) {
          PinsConf[1].onoff = 0;
          strcpy(PinsConf[1].sclick, "All SMS alerts OFF!");
          send_sms(SMS_DISABLE_CODE);

          uint8_t usbnum = 1;
          xQueueSend(usbQueueHandle, &usbnum, 0);

          MqttMessage_t mqttMsg;
          mqttMsg.command = 6;
          mqttMsg.deviceId = 1;
          mqttMsg.state = 0;
          mqttMsg.reserved = 0;
          if (xQueueSend(mqttQueueHandle, &mqttMsg, 0) != pdPASS) {
            printf("Error sending SMS 222 to MQTT queue!\r\n");
          }

        } else {
          /* ── Команды формата ID#Action*[...] ── */
          /* Ищем наличие паттерна "цифры#цифра*" */
          char *p = sms_text;
          bool has_cmd = false;
          while (*p) {
            if (*p >= '0' && *p <= '9') {
              char *q = p;
              while (*q >= '0' && *q <= '9')
                q++;
              if (*q == '#' && *(q + 1) >= '0' && *(q + 1) <= '2' &&
                  *(q + 2) == '*') {
                has_cmd = true;
                break;
              }
            }
            p++;
          }

          if (has_cmd) {
            memset(vldpins, 0, sizeof(vldpins));
            memset(invpins, 0, sizeof(invpins));
            validcnt = 0;
            invldcnt = 0;

            execute_commands(sms_text);

            /* SMS не создаёт голосовой звонок → NO CARRIER никогда не придёт.
             * Отправляем отчёт сразу после выполнения команд. */
            osDelay(1000);
            send_command_result_sms();

            /* Сбрасываем буферы после отчёта */
            memset(vldpins, 0, sizeof(vldpins));
            memset(invpins, 0, sizeof(invpins));
            validcnt = 0;
            invldcnt = 0;
          } else {
            HAL_UART_Transmit(myDEBUG, (uint8_t *)"Unknown SMS content: ",
                              strlen("Unknown SMS content: "), 1000);
            HAL_UART_Transmit(myDEBUG, (uint8_t *)sms_text, strlen(sms_text),
                              1000);
            HAL_UART_Transmit(myDEBUG, (uint8_t *)"\n", 1, 1000);
          }
        }
      } else {
        HAL_UART_Transmit(myDEBUG, (uint8_t *)"Unknow number sms\n",
                          strlen("Unknow number sms\n"), 1000);
      }
    }
  }

  /* ── DTMF ── */
  if (strstr(buf, "+DTMF:") != NULL) {
    char dtmf_dig = buf[7];
    if (dtmf_idx < sizeof(dtmf_buf) - 1) {
      dtmf_buf[dtmf_idx++] = dtmf_dig;
      dtmf_buf[dtmf_idx] = '\0';

      /* Быстрые команды 777 / 222 */
      if (dtmf_idx == 3) {
        if (strcmp(dtmf_buf, "777") == 0) {
          PinsConf[1].onoff = 1;
          strcpy(PinsConf[1].sclick, "All SMS alerts ON!");
          send_sms(SMS_ENABLE_CODE);
          memset(dtmf_buf, 0, sizeof(dtmf_buf));
          dtmf_idx = 0;
          uint8_t usbnum = 1;
          xQueueSend(usbQueueHandle, &usbnum, 0);
          MqttMessage_t mqttMsg;
          mqttMsg.command = 6;
          mqttMsg.deviceId = 1;
          mqttMsg.state = 0;
          mqttMsg.reserved = 0;
          xQueueSend(mqttQueueHandle, &mqttMsg, 0);
          return;
        } else if (strcmp(dtmf_buf, "222") == 0) {
          send_sms(SMS_DISABLE_CODE);
          strcpy(PinsConf[1].sclick, "All SMS alerts OFF!");
          PinsConf[1].onoff = 0;
          memset(dtmf_buf, 0, sizeof(dtmf_buf));
          dtmf_idx = 0;
          uint8_t usbnum = 1;
          xQueueSend(usbQueueHandle, &usbnum, 0);
          MqttMessage_t mqttMsg;
          mqttMsg.command = 6;
          mqttMsg.deviceId = 1;
          mqttMsg.state = 0;
          mqttMsg.reserved = 0;
          xQueueSend(mqttQueueHandle, &mqttMsg, 0);
          return;
        }
      }

      /* Признак конца серии команд: *# */
      if (dtmf_idx >= 2 && dtmf_buf[dtmf_idx - 2] == '*' &&
          dtmf_buf[dtmf_idx - 1] == '#') {
        memset(vldpins, 0, sizeof(vldpins));
        memset(invpins, 0, sizeof(invpins));
        validcnt = 0;
        invldcnt = 0;

        /* Убираем завершающий '#' из буфера перед парсингом */
        char cmd_copy[DTMF_BUF_SIZE];
        strncpy(cmd_copy, dtmf_buf, dtmf_idx - 1);
        cmd_copy[dtmf_idx - 1] = '\0';

        execute_commands(cmd_copy);

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

    /* ── NO CARRIER: конец звонка — отправляем SMS-отчёт ── */
  } else if (strstr(buf, "NO CARRIER") != NULL) {
    memset(dtmf_buf, 0, sizeof(dtmf_buf));
    dtmf_idx = 0;

    osDelay(1000);
    send_command_result_sms();

    /* После отправки очищаем буферы */
    memset(vldpins, 0, sizeof(vldpins));
    memset(invpins, 0, sizeof(invpins));
    validcnt = 0;
    invldcnt = 0;
  }

  /* Вычитываем остаток буфера */
  uint16_t j = 0;
  osDelay(50);
  while (gsm_available()) {
    buf[j++] = gsm_read();
    if (j > GSM_RX_BUFFER_SIZE - 1)
      break;
    osDelay(1);
  }
}
