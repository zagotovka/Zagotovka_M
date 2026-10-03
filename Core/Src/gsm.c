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
#include "dtcm_alloc.h"
#include "logger.h"    /* LOG_GSM() — вывод с учётом фильтра категорий */

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
/* process_actions() удалена: все вызовы переведены на action_handler() */
/* MX_USART2_UART_Init — static в main.c, недоступна напрямую.
 * check_speed() переинициализирует UART вручную через HAL_UART_Init(). */

/* ───── Переменные GSM-модуля (перенесены из main.c) ───── */
char *dtmf_buf = NULL;       /* буфер DTMF-цифр              */
uint16_t dtmf_idx = 0;              /* индекс в dtmf_buf (512 байт)  */
char *vldpins = NULL;        /* валидные пины  (результат)    */
char *invpins = NULL;        /* невалидные пины (результат)   */
int validcnt = 0;
int invldcnt = 0;
char *buf = NULL;            /* рабочий приёмный буфер        */
char *str2 = NULL;           /* вспомогательный буфер         */

void gsm_dtcm_init(void) {
    dtmf_buf  = (char *)dtcm_gsm_dtmf;
    vldpins   = (char *)dtcm_gsm_vldpins;
    invpins   = (char *)dtcm_gsm_invpins;
    buf       = (char *)dtcm_gsm_buf;
    str2      = (char *)dtcm_gsm_str2;
    /* pool — NOLOAD: стартап .bss-обнуление не выполняется */
    memset(dtmf_buf, 0, DTCM_BUF_GSM_DTMF);
    memset(vldpins, 0, DTCM_BUF_GSM_VLDPINS);
    memset(invpins, 0, DTCM_BUF_GSM_INVPINS);
    memset(buf, 0, DTCM_BUF_GSM_BUF);
    memset(str2, 0, DTCM_BUF_GSM_STR2);
}

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
        LOG_GSM("Uart modem was %lu, switched to 57600\n",
                (unsigned long)huart2.Init.BaudRate);
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
        osDelay(1);
      }
      replac_string(str);
      char *p = NULL;

      if ((p = strstr(str, "+CPAS:")) != NULL) {
        if (strstr(str, "0") == NULL) {
          LOG_GSM("%s\n+CPAS not ready, must be '0'\n", p);
          for (int retry = 0; retry < 50; retry++) {
            HAL_GPIO_TogglePin(LD3_GPIO_Port, LD3_Pin);
            osDelay(100);
          }
          printf("[FATAL] +CPAS not ready — system reset\r\n");
          NVIC_SystemReset();
        }
      } else if ((p = strstr(str, "+CREG:")) != NULL) {
        if (strstr(str, "0,1") == NULL) {
          LOG_GSM("%s\n+CREG not ready, must be '0,1'\n", p);
          for (int retry = 0; retry < 50; retry++) {
            HAL_GPIO_TogglePin(LD3_GPIO_Port, LD3_Pin);
            osDelay(100);
          }
          printf("[FATAL] +CREG not registered — system reset\r\n");
          NVIC_SystemReset();
        }
      }
      p = 0;
      LOG_GSM("Set %s %s\n", buff, str);
      return;
    }
    osDelay(500);
  }
  LOG_GSM("Not reply %s\n", buff);
  for (int retry = 0; retry < 50; retry++) {
    HAL_GPIO_TogglePin(LD3_GPIO_Port, LD3_Pin);
    osDelay(100);
  }
  printf("[FATAL] No reply from modem for '%s' — system reset\r\n", buff);
  NVIC_SystemReset();
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
/* ════════════════════════════════════════════════════════════
 *  sanitize_cmd_str — фильтр входной строки команд
 *
 *  Удаляет все символы, не входящие в допустимый алфавит:
 *  цифры 0-9, #, *, S, C, D, L, P (без учёта регистра).
 *  Модифицирует строку in-place.
 * ════════════════════════════════════════════════════════════ */
void sanitize_cmd_str(char *s) {
    if (!s) return;
    char *r = s, *w = s;
    while (*r) {
        char c = toupper((unsigned char)*r);
        if ((c >= '0' && c <= '9') || c == '#' || c == '*' || c == '.' ||
            c == 'S' || c == 'C' || c == 'D' || c == 'L' || c == 'P') {
            *w++ = *r;
        }
        r++;
    }
    *w = '\0';
}

static char s_onoff_rep[96]; /* отчёт по командам-рубильникам ID#КОД* */

static void onoff_rep_add(const char *label) {
  size_t cur = strlen(s_onoff_rep);
  size_t need = strlen(label) + (cur > 0 ? 1u : 0u);
  if (cur + need >= sizeof(s_onoff_rep)) return;
  if (cur > 0) s_onoff_rep[cur++] = ',';
  strcpy(s_onoff_rep + cur, label);
}

void execute_commands(char *cmd_str) {
  if (!cmd_str || *cmd_str == '\0') return;

  s_onoff_rep[0] = '\0';

  bool sec_changed = false;   /* менялся On/Off у SECURITY-пина или Zigbee PIR */
  int  sec_last_id = -1;
  bool psec_changed = false;  /* менялся физический SECURITY-пин (pins.ini) */
  bool zsec_changed = false;  /* менялся Zigbee PIR (zigbee.ini) */

  /* Санитизация на входе — убираем мусор до парсинга */
  sanitize_cmd_str(cmd_str);

  char *cmd = cmd_str;

  while (*cmd) {
    int pin = 0;
    int value = 0;
    char *cmd_start = cmd;

    /* Читаем номер пина */
    while (*cmd >= '0' && *cmd <= '9') {
      if (pin < 10000) pin = pin * 10 + (*cmd - '0');
      cmd++;
    }

    /* Дочерняя строка Zigbee: ID вида 93.1 (точка набирается только в SMS) */
    int sub = 0;
    if (*cmd == '.' && *(cmd + 1) >= '0' && *(cmd + 1) <= '9') {
      cmd++;
      while (*cmd >= '0' && *cmd <= '9') {
        if (sub < 1000) sub = sub * 10 + (*cmd - '0');
        cmd++;
      }
    }

    if (*cmd == '#') {
      int valid_format = 0;
      char *hash_pos = cmd;
      cmd++; /* пропускаем # */

      int onoff_cmd = 0; /* 1 - команда-рубильник On/Off (ID#КОД*) */
      if (*cmd >= '0' && *cmd <= '9' && *(cmd + 1) >= '0' &&
          *(cmd + 1) <= '9' && *(cmd + 2) == '*') {
        /* Две цифры и *: 00/11 - пины, 33/44 - Cron, 55/66 - PID */
        value = (*cmd - '0') * 10 + (*(cmd + 1) - '0');
        cmd += 3; /* пропускаем две цифры и * */
        onoff_cmd = 1;
        valid_format = 1;
      } else if (*cmd >= '0' && *cmd <= '5' && *(cmd + 1) == '*') {
        value = *cmd - '0';
        cmd += 2; /* пропускаем значение и * */
        valid_format = 1;
      } else if ((*cmd == 'S' || *cmd == 's') &&
                 (*(cmd + 1) == 'C' || *(cmd + 1) == 'c') &&
                 *(cmd + 2) == '*') {
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
        if (onoff_cmd) {
          char olabel[24];
          if (remote_onoff_set(value, pin, sub, olabel, sizeof(olabel))) {
            onoff_rep_add(olabel);
            validcnt++;
          } else {
            char inv_str[40];
            if (sub > 0)
              snprintf(inv_str, sizeof(inv_str), "%s%d.%d#%02d*",
                       invldcnt > 0 ? "," : "", pin, sub, value);
            else
              snprintf(inv_str, sizeof(inv_str), "%s%d#%02d*",
                       invldcnt > 0 ? "," : "", pin, value);
            if (strlen(invpins) + strlen(inv_str) < DTCM_BUF_GSM_INVPINS) {
              strcat(invpins, inv_str);
              invldcnt++;
            }
          }
        } else if (sub > 0) {
          /* Суффикс .N допустим только в командах-рубильниках */
          char inv_str[40];
          snprintf(inv_str, sizeof(inv_str), "%s%d.%d#%d*",
                   invldcnt > 0 ? "," : "", pin, sub, value);
          if (strlen(invpins) + strlen(inv_str) < DTCM_BUF_GSM_INVPINS) {
            strcat(invpins, inv_str);
            invldcnt++;
          }
        } else if (pin >= NUMPIN && pin < NUMPIN + NUMZBEE) {
          /* Zigbee-слоты: поддерживается только On/Off охранного PIR */
          int zbi = pin - NUMPIN;
          if (zbee_is_pir(&ZigbeeConf[zbi]) && ZigbeeConf[zbi].zbee_ieee[0] != '\0' &&
              value >= 0 && value <= 2) {
            if (value == 1) ZigbeeConf[zbi].onoff = 1;
            else if (value == 0) ZigbeeConf[zbi].onoff = 0;
            else ZigbeeConf[zbi].onoff = !ZigbeeConf[zbi].onoff;
            sec_changed = true;
            zsec_changed = true;
            sec_last_id = pin;

            char zcmd[16];
            int zlen = snprintf(zcmd, sizeof(zcmd), "%s%d:%d",
                                validcnt > 0 ? "," : "", pin, value);
            if (zlen > 0 && zlen < (int)sizeof(zcmd) &&
                strlen(vldpins) + (size_t)zlen < DTCM_BUF_GSM_VLDPINS) {
              strcat(vldpins, zcmd);
              validcnt++;
            }
          } else {
            char inv_str[32];
            snprintf(inv_str, sizeof(inv_str), "%s%d#%d*",
                     invldcnt > 0 ? "," : "", pin, value);
            if (strlen(invpins) + strlen(inv_str) < DTCM_BUF_GSM_INVPINS) {
              strcat(invpins, inv_str);
              invldcnt++;
            }
          }
        } else if (pin >= 0 && pin < NUMPIN) {
          if ((PinsConf[pin].topin == 2 || PinsConf[pin].topin == 10 || PinsConf[pin].topin == 3) && (value >= 0 && value <= 2)) {
            /* Для типа SECURITY (topin==10) управляем onoff */
            if (PinsConf[pin].topin == 10) {
              if (value == 1) PinsConf[pin].onoff = 1;
              else if (value == 0) PinsConf[pin].onoff = 0;
              else if (value == 2) PinsConf[pin].onoff = !PinsConf[pin].onoff;
              sec_changed = true;
              psec_changed = true;
              sec_last_id = pin;
            }

            /* Формируем строку "pin:value" и добавляем в vldpins */
            char cmd_msg[16];
            int cmd_len = snprintf(cmd_msg, sizeof(cmd_msg), "%d:%d", pin, value);
            if (cmd_len < 0 || cmd_len >= (int)sizeof(cmd_msg)) {
              LOG_GSM("Error: cmd_msg overflow\n");
              continue;
            }

            char pin_str[17];
            int pin_len;
            if (validcnt > 0)
              pin_len = snprintf(pin_str, sizeof(pin_str), ",%s", cmd_msg);
            else
              pin_len = snprintf(pin_str, sizeof(pin_str), "%s", cmd_msg);

            if (pin_len < 0 || pin_len >= (int)sizeof(pin_str)) {
              LOG_GSM("Error: pin_str overflow\n");
              continue;
            }

            if (strlen(vldpins) + strlen(pin_str) < DTCM_BUF_GSM_VLDPINS) {
              strcat(vldpins, pin_str);
              validcnt++;
            } else {
              LOG_GSM("Error: vldpins buffer full\n");
            }

          } else if (PinsConf[pin].topin == 1 && (value >= 3 && value <= 5)) {
            /* Для типа BUTTON (topin==1) обрабатываем нажатие через action_handler:
               поддерживает PinsLinks, Switch-логику, PWM, onoff/master enable. */
            if (PinsConf[pin].onoff != 0) {
              if (value == 3 && PinsConf[pin].sclick[0] != '\0') {
                action_handler(pin, PinsConf[pin].sclick, "SC");
              } else if (value == 4 && PinsConf[pin].dclick[0] != '\0') {
                action_handler(pin, PinsConf[pin].dclick, "DC");
              } else if (value == 5 && PinsConf[pin].lpress[0] != '\0') {
                action_handler(pin, PinsConf[pin].lpress, "LP");
              }
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

              if (strlen(vldpins) + strlen(pin_str) < DTCM_BUF_GSM_VLDPINS) {
                strcat(vldpins, pin_str);
                validcnt++;
              }
            }
          } else {
            /* Пин не того типа или неверное значение — в невалидные */
            char inv_str[32];
            snprintf(inv_str, sizeof(inv_str), "%s%d#%d*",
                     invldcnt > 0 ? "," : "", pin, value);
            if (strlen(invpins) + strlen(inv_str) < DTCM_BUF_GSM_INVPINS) {
              strcat(invpins, inv_str);
              invldcnt++;
            }
          }
        } else {
          /* Пин вне диапазона — в невалидные */
          char inv_str[32];
          snprintf(inv_str, sizeof(inv_str), "%s%d#%d*", invldcnt > 0 ? "," : "",
                   pin, value);
          if (strlen(invpins) + strlen(inv_str) < DTCM_BUF_GSM_INVPINS) {
            strcat(invpins, inv_str);
            invldcnt++;
          }
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
        if (inv_len > 0) {
          char invalid_cmd[32] = {0};
          strncpy(invalid_cmd, cmd_start, sizeof(invalid_cmd) - 1);
          invalid_cmd[sizeof(invalid_cmd) - 1] = '\0';

          char inv_str[64];
          snprintf(inv_str, sizeof(inv_str), "%s%s", invldcnt > 0 ? "," : "",
                   invalid_cmd);
          if (strlen(invpins) + strlen(inv_str) < DTCM_BUF_GSM_INVPINS) {
            strcat(invpins, inv_str);
            invldcnt++;
          }

          LOG_GSM("Error %s\n", invalid_cmd);
        }
        cmd = end;
      }
    } else {
      /* ═══════════════════════════════════════════════════
       *  ЗАЩИТА ОТ INFINITE LOOP
       *  Сдвигаем указатель вперед, чтобы пропустить мусорный
       *  символ и продолжить парсинг следующей команды.
       * ═══════════════════════════════════════════════════ */
      if (*cmd) cmd++;
    }
  }

  /* Выполняем валидные действия */
  action_handler(0, vldpins, "CMD");

  /* On/Off охранного пина изменён по SMS/DTMF: делаем то же, что делает
   * веб-путь (handle_onoff_set): обновляем ETag страниц, чтобы ползунок
   * сменился в браузере, сохраняем конфиг и шлём MQTT-уведомление. */
  if (sec_changed) {
    mark_slice_dirty(&g_ver_security);
    mark_slice_dirty(&g_ver_pins);
    if (usbQueueHandle) {
      uint8_t usbnum;
      if (psec_changed) {
        usbnum = 1; /* pins.ini */
        xQueueSend(usbQueueHandle, &usbnum, 0);
      }
      if (zsec_changed) {
        usbnum = 7; /* zigbee.ini */
        xQueueSend(usbQueueHandle, &usbnum, 0);
      }
    }
    if (sec_last_id >= 0 && sec_last_id < NUMPIN) {
      mqtt_queue_send_safe(8, (uint8_t)sec_last_id, 0, 0);
    }
  }

  /* Отладочный вывод */
  LOG_GSM("Parsed cmds: %.100s\n", vldpins);
  LOG_GSM("Invld pins/cmd: %.100s\n", invpins);
}

/* ════════════════════════════════════════════════════════════
 *  send_command_result_sms — формирует и отправляет SMS-отчёт
 *  по результатам execute_commands().
 *  Логика идентична DTMF-блоку "NO CARRIER" из оригинального main.c.
 * ════════════════════════════════════════════════════════════ */
void send_command_result_sms(void) {
  /* Минимизируем использование стека, т.к. функция вызывается из задач FreeRTOS */
  char message[256];
  message[0] = '\0';

  const char valid_prefix[] = "Valid pins: ";
  const char invalid_prefix[] = " Invld pins/cmd: ";

  bool has_type_10 = false;
  uint8_t type_10_pin = 0;

  /* Обрабатываем валидные пины */
  if (strlen(vldpins) > 0) {
    char sec_buf[128] = {0};
    char out_buf[128] = {0};
    int sec_cnt = 0;
    int out_cnt = 0;

    char vldpins_fmt[128];
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
      int pin_id_full = atoi(pin_number);
      if (pin_id_full >= NUMPIN) {
        /* Zigbee PIR (единое пространство ID): отдельная запись в SEC-TY */
        if (pin_id_full < NUMPIN + NUMZBEE &&
            zbee_is_pir(&ZigbeeConf[pin_id_full - NUMPIN])) {
          char zentry[24];
          snprintf(zentry, sizeof(zentry), "%s%s:%s", sec_cnt > 0 ? "," : "",
                   pin_number,
                   ZigbeeConf[pin_id_full - NUMPIN].onoff == 1 ? "ON" : "OFF");
          strncat(sec_buf, zentry, sizeof(sec_buf) - strlen(sec_buf) - 1);
          sec_cnt++;
        }
        tok = strtok(NULL, ",");
        continue;
      }
      uint8_t pin_id = (uint8_t)pin_id_full;

      char *colon = strchr(tok, ':');
      int action_val = -1;
      if (colon) { action_val = atoi(colon + 1); }

      if (PinsConf[pin_id].topin == 10) {
        has_type_10 = true;
        type_10_pin = pin_id;
        char entry[24];
        snprintf(entry, sizeof(entry), "%s%s:%s", sec_cnt > 0 ? "," : "",
                 pin_number, PinsConf[pin_id].onoff == 1 ? "ON" : "OFF");
        strncat(sec_buf, entry, sizeof(sec_buf) - strlen(sec_buf) - 1);
        sec_cnt++;
      } else if (PinsConf[pin_id].topin == 3) {
        char entry[24];
        const char *sw_status = "OK";
        if (PinsConf[pin_id].onoff == 0) sw_status = "DISABLED";
        else {
            if (action_val == 0) sw_status = "OFF";
            else if (action_val == 1) sw_status = "ON";
            else if (action_val == 2) sw_status = "TOGGLE";
        }
        snprintf(entry, sizeof(entry), "%s%s:%s", out_cnt > 0 ? "," : "", pin_number, sw_status);
        strncat(out_buf, entry, sizeof(out_buf) - strlen(out_buf) - 1);
        out_cnt++;
      } else if (PinsConf[pin_id].topin == 1) {
        char entry[24];
        const char *btn_act = "OK";
        if (PinsConf[pin_id].onoff == 0) btn_act = "DISABLED";
        else {
            if (action_val == 3) btn_act = "SC";
            else if (action_val == 4) btn_act = "DC";
            else if (action_val == 5) btn_act = "LP";
        }
        snprintf(entry, sizeof(entry), "%s%s:%s", out_cnt > 0 ? "," : "", pin_number, btn_act);
        strncat(out_buf, entry, sizeof(out_buf) - strlen(out_buf) - 1);
        out_cnt++;
      } else {
        char entry[24];
        if (PinsConf[pin_id].topin != 5 && PinsConf[pin_id].onoff == 0) {
            snprintf(entry, sizeof(entry), "%s%s:DISABLED", out_cnt > 0 ? "," : "", pin_number);
        } else {
            uint8_t current_state = read_button_level(pin_id);
            snprintf(entry, sizeof(entry), "%s%s:%s", out_cnt > 0 ? "," : "",
                     pin_number, current_state == GPIO_PIN_SET ? "ON" : "OFF");
        }
        strncat(out_buf, entry, sizeof(out_buf) - strlen(out_buf) - 1);
        out_cnt++;
      }
      tok = strtok(NULL, ",");
    }

    if (sec_cnt > 0) snprintf(message, sizeof(message), "SEC-TY:%s", sec_buf);
    if (out_cnt > 0) {
      if (sec_cnt > 0) strncat(message, " ", sizeof(message) - strlen(message) - 1);
      strncat(message, out_buf, sizeof(message) - strlen(message) - 1);
    }

    if (strlen(message) > 0 && strcmp(message, "None") != 0) {
        /* Сохраняем в MQTT */
        taskENTER_CRITICAL();
        strncpy(PinsConf[1].sclick, message, sizeof(PinsConf[1].sclick) - 1);
        PinsConf[1].sclick[sizeof(PinsConf[1].sclick) - 1] = '\0';
        taskEXIT_CRITICAL();

        /* Добавляем префикс валидных пинов */
        char temp_msg[280]; /* Увеличен размер, чтобы вместить префикс + message */
        snprintf(temp_msg, sizeof(temp_msg), "%s%s", valid_prefix, message);
        strncpy(message, temp_msg, sizeof(message) - 1);
        message[sizeof(message) - 1] = '\0';
    } else {
        message[0] = '\0';
    }
  }

  /* Результаты команд-рубильников On/Off (ID#КОД*) */
  if (s_onoff_rep[0] != '\0') {
    size_t mlen = strlen(message);
    snprintf(message + mlen, sizeof(message) - mlen, "%sOnOff: %s",
             mlen > 0 ? " " : "", s_onoff_rep);
  }

  if ((has_type_10 && PinsConf[1].onoff == 1 && PinsConf[type_10_pin].onoff == 1) ||
      (validcnt > 0 && PinsConf[1].onoff == 1)) {

    if (strlen(invpins) > 0 && strcmp(invpins, "None") != 0) {
        int current_len = strlen(message);
        const char *pfx = (current_len > 0) ? invalid_prefix : "Invld pins/cmd: ";
        snprintf(message + current_len, sizeof(message) - current_len, "%s%.80s", pfx, invpins);
    }

    if (strlen(message) > 0) {
        /* Выводим финальное сообщение в консоль отладки */
        LOG_GSM("Final SMS: %.170s\n", message);

        char str[128];
        snprintf(str, sizeof(str), "AT+CMGS=\"%s\"\r\n", SetSettings.tel);
        HAL_UART_Transmit(GSM, (uint8_t *)str, strlen(str), 1000);
        osDelay(100);
        HAL_UART_Transmit(GSM, (uint8_t *)message, strlen(message), 1000);
        osDelay(100);
        uint8_t ctrlZ = 26;
        HAL_UART_Transmit(GSM, &ctrlZ, 1, 1000);

        if (validcnt > 0) {
            mqtt_queue_send_safe(1, 1, 0, 0);
        }
    }
  }

  s_onoff_rep[0] = '\0';
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
    if (SetSettings.tel[0] == '\0') {
      LOG_GSM("RING, but mobile number is not set\n");
    } else if (strstr(buf, SetSettings.tel) != NULL) {
      LOG_GSM("Incoming call answered\n");
      incoming_call();
    } else {
      LOG_GSM("Unknow number or empty!\n");
      disable_connection();
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
        char sms_text[256] = {0};

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
          strncpy(sms_text, body_start, sizeof(sms_text) - 1);
          sms_text[sizeof(sms_text) - 1] = '\0';
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
          if (j >= sizeof(sms_text) - 1)
            break;
        }
        sms_text[j] = '\0';
        /* Обрезаем пробелы в конце */
        while (j > 0 && sms_text[j - 1] == ' ')
          sms_text[--j] = '\0';

        /* Отладочный вывод — убрать после проверки */
        LOG_GSM("SMS body: [%.170s]\n", sms_text);

        /* ── Быстрые команды 777 / 222 ── */
        if (strstr(sms_text, "777") != NULL) {
          taskENTER_CRITICAL();
          PinsConf[1].onoff = 1;
          snprintf(PinsConf[1].sclick, sizeof(PinsConf[1].sclick), "All SMS alerts ON!");
          taskEXIT_CRITICAL();
          send_sms(SMS_ENABLE_CODE);

          uint8_t usbnum = 1;
          xQueueSend(usbQueueHandle, &usbnum, 0);

          mqtt_queue_send_safe(6, 1, 0, 0);

        } else if (strstr(sms_text, "222") != NULL) {
          taskENTER_CRITICAL();
          PinsConf[1].onoff = 0;
          snprintf(PinsConf[1].sclick, sizeof(PinsConf[1].sclick), "All SMS alerts OFF!");
          taskEXIT_CRITICAL();
          send_sms(SMS_DISABLE_CODE);

          uint8_t usbnum = 1;
          xQueueSend(usbQueueHandle, &usbnum, 0);

          mqtt_queue_send_safe(6, 1, 0, 0);

        } else {
          /* ── Команды формата ID#Action*[...] ── */
          /* Ищем наличие паттерна "цифры#цифра*" или "цифры#БУКВЫ*" */
          char *p = sms_text;
          bool has_cmd = false;
          while (*p) {
            if (*p >= '0' && *p <= '9') {
              char *q = p;
              while (*q >= '0' && *q <= '9')
                q++;
              if (*q == '#') {
                char c1 = *(q + 1);
                char c2 = *(q + 2);
                char c3 = *(q + 3);

                /* Рубильник On/Off: две цифры и звёздочка (00/11/33/44/55/66) */
                if (c1 >= '0' && c1 <= '9' && c2 >= '0' && c2 <= '9' &&
                    c3 == '*') {
                  has_cmd = true;
                  break;
                }

                /* Проверяем: цифра 0-5 и звёздочка (поддержка цифровых команд кнопок) */
                if (c1 >= '0' && c1 <= '5' && c2 == '*') {
                  has_cmd = true;
                  break;
                }

                /* Проверяем: буквы DC, SC, LP и звёздочка */
                if ( ((c1 == 'd' || c1 == 'D') && (c2 == 'c' || c2 == 'C') && c3 == '*') ||
                     ((c1 == 's' || c1 == 'S') && (c2 == 'c' || c2 == 'C') && c3 == '*') ||
                     ((c1 == 'l' || c1 == 'L') && (c2 == 'p' || c2 == 'P') && c3 == '*') ) {
                  has_cmd = true;
                  break;
                }
              }
            }
            p++;
          }

          if (has_cmd) {
            /* Убираем завершающий '#', если пользователь отправил его по привычке от DTMF */
            int slen = strlen(sms_text);
            if (slen >= 2 && sms_text[slen - 1] == '#' && sms_text[slen - 2] == '*') {
              sms_text[slen - 1] = '\0';
            }
            memset(vldpins, 0, DTCM_BUF_GSM_VLDPINS);
            memset(invpins, 0, DTCM_BUF_GSM_INVPINS);
            validcnt = 0;
            invldcnt = 0;

            execute_commands(sms_text);

            /* SMS не создаёт голосовой звонок → NO CARRIER никогда не придёт.
             * Отправляем отчёт сразу после выполнения команд. */
            osDelay(1000);
            send_command_result_sms();

            /* Сбрасываем буферы после отчёта */
            memset(vldpins, 0, DTCM_BUF_GSM_VLDPINS);
            memset(invpins, 0, DTCM_BUF_GSM_INVPINS);
            validcnt = 0;
            invldcnt = 0;
          } else {
            LOG_GSM("Unknown SMS content: %.160s\n", sms_text);
          }
        }
      } else {
        LOG_GSM("Unknow number sms\n");
      }
    }
  }

  /* ── DTMF ── */
  if (strstr(buf, "+DTMF:") != NULL) {
    char dtmf_dig = buf[7];
    if (dtmf_idx < DTCM_BUF_GSM_DTMF - 1) {
      dtmf_buf[dtmf_idx++] = dtmf_dig;
      dtmf_buf[dtmf_idx] = '\0';

      /* Быстрые команды 777 / 222 */
      if (dtmf_idx == 3) {
        if (strcmp(dtmf_buf, "777") == 0) {
          taskENTER_CRITICAL();
          PinsConf[1].onoff = 1;
          snprintf(PinsConf[1].sclick, sizeof(PinsConf[1].sclick), "All SMS alerts ON!");
          taskEXIT_CRITICAL();
          send_sms(SMS_ENABLE_CODE);
          memset(dtmf_buf, 0, DTCM_BUF_GSM_DTMF);
          dtmf_idx = 0;
          uint8_t usbnum = 1;
          xQueueSend(usbQueueHandle, &usbnum, 0);
          mqtt_queue_send_safe(6, 1, 0, 0);
          return;
        } else if (strcmp(dtmf_buf, "222") == 0) {
          send_sms(SMS_DISABLE_CODE);
          taskENTER_CRITICAL();
          snprintf(PinsConf[1].sclick, sizeof(PinsConf[1].sclick), "All SMS alerts OFF!");
          PinsConf[1].onoff = 0;
          taskEXIT_CRITICAL();
          memset(dtmf_buf, 0, DTCM_BUF_GSM_DTMF);
          dtmf_idx = 0;
          uint8_t usbnum = 1;
          xQueueSend(usbQueueHandle, &usbnum, 0);
          mqtt_queue_send_safe(6, 1, 0, 0);
          return;
        }
      }

      /* Признак конца серии команд: *# */
      if (dtmf_idx >= 2 && dtmf_buf[dtmf_idx - 2] == '*' &&
          dtmf_buf[dtmf_idx - 1] == '#') {
        memset(vldpins, 0, DTCM_BUF_GSM_VLDPINS);
        memset(invpins, 0, DTCM_BUF_GSM_INVPINS);
        validcnt = 0;
        invldcnt = 0;

        /* Убираем завершающий '#' из буфера перед парсингом */
        char cmd_copy[DTMF_BUF_SIZE];
        strncpy(cmd_copy, dtmf_buf, dtmf_idx - 1);
        cmd_copy[dtmf_idx - 1] = '\0';

        execute_commands(cmd_copy);

        memset(dtmf_buf, 0, DTCM_BUF_GSM_DTMF);
        dtmf_idx = 0;
      }
    }

    if (dtmf_idx >= DTCM_BUF_GSM_DTMF - 1) {
      memset(dtmf_buf, 0, DTCM_BUF_GSM_DTMF);
      dtmf_idx = 0;
      LOG_GSM("Buffer overflow, cleared\n");
    }

    /* ── NO CARRIER: конец звонка — отправляем SMS-отчёт ── */
  } else if (strstr(buf, "NO CARRIER") != NULL) {
    memset(dtmf_buf, 0, DTCM_BUF_GSM_DTMF);
    dtmf_idx = 0;

    osDelay(1000);
    send_command_result_sms();

    /* После отправки очищаем буферы */
    memset(vldpins, 0, DTCM_BUF_GSM_VLDPINS);
    memset(invpins, 0, DTCM_BUF_GSM_INVPINS);
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
