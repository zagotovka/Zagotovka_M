/* USER CODE BEGIN Header */
/**
  ******************************************************************************
  * @file           : main.c
  * @brief          : Main program body
  ******************************************************************************
  * @attention
  *
  * Copyright (c) 2026 STMicroelectronics.
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

/* Private includes ----------------------------------------------------------*/
/* USER CODE BEGIN Includes */
#include <stddef.h>
#include <stdint.h>
#include <stdbool.h>
#include <stdio.h>
#include <string.h>
#include "fw_meta.h"
/* USER CODE END Includes */

/* Private typedef -----------------------------------------------------------*/
/* USER CODE BEGIN PTD */
/*
 * ВНИМАНИЕ (совместимость между поколениями прошивок):
 * Bank A и Bank B могут содержать РАЗНЫЕ версии прошивки сколько угодно
 * долго. Обе версии читают/пишут ОДНУ И ТУ ЖЕ структуру HTTPSsettings
 * в Flash-секторе 11. Если старый код (оставшийся в другом банке или
 * в непереприошенном bootloader) не знает о новых полях — он трактует
 * эти байты как соседние/padding и может затереть их при следующей записи.
 *
 * Правило: менять эту структуру ТОЛЬКО добавлением полей в конец,
 * синхронно и байт-в-байт одинаково в Core/Inc/zagotovka.h и
 * Bootloader/.../main.c. Не переставлять и не менять смысл существующих байт.
 */
typedef struct __attribute__((packed)) {
    uint32_t magic;
    uint32_t crc;
    char domain[50];
    char tls_key[512];
    char tls_cert[1024];
    char tls_ca[1024];
    char telegram_token[100];
    uint16_t port;
    uint32_t timeout;
    uint8_t retry_cnt;
    uint8_t connection_mode;
    uint8_t ota_state;
    uint8_t version;
    uint8_t ota_active_bank;
    uint8_t ota_pending;
    uint8_t ota_boot_retries;
    uint8_t ota_prev_active_bank;    // банк, активный ДО текущего OTA-цикла
    char    ota_bank_a_version[16];  // последняя подтверждённая версия в Bank A
    char    ota_bank_b_version[16];  // последняя подтверждённая версия в Bank B
} HTTPSsettings;
/* USER CODE END PTD */

/* Private define ------------------------------------------------------------*/
/* USER CODE BEGIN PD */
#define SETTINGS_MAGIC_VALUE 0xA5B6C7D8
#define FLASH_SECTOR_11_START_ADDR 0x081C0000
#define SETTINGS_VERSION_COUNT 94

#define SETTINGS_ALIGNED_SIZE ((sizeof(HTTPSsettings) + 3) / 4 * 4)
#define GET_SETTINGS_ADDR(index) (FLASH_SECTOR_11_START_ADDR + (index) * SETTINGS_ALIGNED_SIZE)

#define BANK_A_ADDR 0x08040000
#define BANK_B_ADDR 0x08100000

/* USER CODE END PD */

/* Private macro -------------------------------------------------------------*/
/* USER CODE BEGIN PM */

/* USER CODE END PM */

/* Private variables ---------------------------------------------------------*/

CRC_HandleTypeDef hcrc;

UART_HandleTypeDef huart3;

/* USER CODE BEGIN PV */

/* USER CODE END PV */

/* Private function prototypes -----------------------------------------------*/
void SystemClock_Config(void);
static void MPU_Config(void);
static void MX_GPIO_Init(void);
static void MX_USART3_UART_Init(void);
static void MX_CRC_Init(void);
/* USER CODE BEGIN PFP */
static const HTTPSsettings* get_latest_settings(void);
static void log_msg(const char *msg);
static void jump_to_app(uint32_t app_addr);
static uint32_t calculate_crc(const HTTPSsettings *settings);
static bool write_settings(const HTTPSsettings *cur_flash, const HTTPSsettings *data);
static bool flash_is_dual_bank(void);
static bool app_image_valid(uint32_t app_addr);
/* USER CODE END PFP */

/* Private user code ---------------------------------------------------------*/
/* USER CODE BEGIN 0 */
static void log_msg(const char *msg)
{
    HAL_UART_Transmit(&huart3, (uint8_t *)msg, (uint16_t)strlen(msg), 200);
}

static const HTTPSsettings* get_latest_settings(void)
{
    const HTTPSsettings *valid = 0;
    uint8_t max_ver = 0;
    int found = 0;
    int magic_cnt = 0;

    for (int i = 0; i < SETTINGS_VERSION_COUNT; i++) {
        const HTTPSsettings *s = (const HTTPSsettings *)GET_SETTINGS_ADDR(i);
        if (s->magic != SETTINGS_MAGIC_VALUE) continue;
        magic_cnt++;

        uint32_t calc_crc = calculate_crc(s);
        if (s->crc != calc_crc) {
            char buf[80];
            snprintf(buf, sizeof(buf),
                    "[BOOT] Slot %d: CRC bad (0x%08lX!=0x%08lX), skip\r\n",
                    i, (unsigned long)s->crc, (unsigned long)calc_crc);
            log_msg(buf);
            continue;
        }
        if (!found || (uint8_t)(s->version - max_ver) < 128) {
            valid = s;
            max_ver = s->version;
            found = 1;
        }
    }

    /* Диагностика: если ни один слот не прошёл проверку — показать,
     * что реально лежит во Flash, чтобы отличить "пустой сектор" от
     * "битого CRC" (несовпадение алгоритма CRC app/bootloader). */
    if (!found) {
        char buf[96];
        snprintf(buf, sizeof(buf),
                "[BOOT] WARN: 0 valid slots (%d with magic) out of %d\r\n",
                magic_cnt, SETTINGS_VERSION_COUNT);
        log_msg(buf);

        const HTTPSsettings *s0 = (const HTTPSsettings *)GET_SETTINGS_ADDR(0);
        snprintf(buf, sizeof(buf),
                "[BOOT] Slot0: magic=0x%08lX crc=0x%08lX calc=0x%08lX ver=%u\r\n",
                (unsigned long)s0->magic, (unsigned long)s0->crc,
                (unsigned long)calculate_crc(s0), s0->version);
        log_msg(buf);
    }
    return valid;
}

static void jump_to_app(uint32_t app_addr)
{
    uint32_t msp_val = *(volatile uint32_t *)app_addr;
    uint32_t reset_vector = *(volatile uint32_t *)(app_addr + 4);

    if ((msp_val & 0xFFF00000) != 0x20000000) {
        char buf[80];
        snprintf(buf, sizeof(buf), "[BOOT] Bad MSP 0x%08lX at 0x%08lX, halting\r\n",
                 (unsigned long)msp_val, (unsigned long)app_addr);
        log_msg(buf);
        while (1);
    }

    char buf[100];
    snprintf(buf, sizeof(buf), "[BOOT] -> 0x%08lX (MSP=0x%08lX)\r\n",
            (unsigned long)app_addr, (unsigned long)msp_val);
    log_msg(buf);

    HAL_Delay(5);
    HAL_DeInit();
    HAL_RCC_DeInit();
    __disable_irq();
    SysTick->CTRL = 0;
    SysTick->LOAD = 0;
    SysTick->VAL  = 0;
    SCB->ICSR = SCB_ICSR_PENDSTCLR_Msk;
    for (uint32_t i = 0; i < 8; i++) {
        NVIC->ICER[i] = 0xFFFFFFFF;
        NVIC->ICPR[i] = 0xFFFFFFFF;
    }
    SCB->ICSR = SCB_ICSR_PENDSVCLR_Msk;
    __set_BASEPRI(0);
    __set_FAULTMASK(0);
    SCB->VTOR = app_addr;
    __DSB();
    __ISB();
    __enable_irq();
    __asm volatile (
        "msr msp, %0 \n"
        "bx %1       \n"
        :
        : "r" (msp_val), "r" (reset_vector)
    );
    while(1);
}

static uint32_t calculate_crc(const HTTPSsettings *settings)
{
    uint32_t word __attribute__((aligned(4)));
    uint32_t result;

    /* CRC по magic */
    memcpy(&word, &settings->magic, sizeof(word));
    result = HAL_CRC_Calculate(&hcrc, &word, 1);

    /*
     * CRC по данным после поля crc:
     * domain ... padding.
     * Само поле settings->crc в расчёт не входит.
     */
    const uint8_t *data = (const uint8_t *)&settings->domain;
    const size_t bytes = sizeof(HTTPSsettings) - offsetof(HTTPSsettings, domain);
    const size_t words = bytes / sizeof(uint32_t);

    for (size_t i = 0; i < words; i++) {
        memcpy(&word, data, sizeof(word));
        result = HAL_CRC_Accumulate(&hcrc, &word, 1);
        data += sizeof(word);
    }

    return result;
}

static bool write_settings(const HTTPSsettings *cur_flash, const HTTPSsettings *data)
{
  int cur_idx = -1;
  if (cur_flash) {
    cur_idx = ((uint32_t)cur_flash - FLASH_SECTOR_11_START_ADDR) / SETTINGS_ALIGNED_SIZE;
  }
  int next_idx = (cur_idx + 1) % SETTINGS_VERSION_COUNT;
  uint32_t next_addr = GET_SETTINGS_ADDR(next_idx);
  bool need_erase = (next_idx == 0) || (next_idx < cur_idx);

  if (HAL_FLASH_Unlock() != HAL_OK) return false;

  if (need_erase) {
    FLASH_EraseInitTypeDef erase = {0};
    erase.TypeErase = FLASH_TYPEERASE_SECTORS;
    erase.Banks = FLASH_BANK_2;
    /*
     * Сектор с настройками 0x081C0000:
     *  - dual bank  -> Bank 2, сектор 7 (HAL: FLASH_SECTOR_19)
     *  - single bank-> сектор 11 (HAL: FLASH_SECTOR_11)
     * FLASH_SECTOR_20 в dual bank даёт SNB=24 -> "Bank2 сектор 8",
     * которого не существует — стирание всегда фейлилось.
     */
    erase.Sector = flash_is_dual_bank() ? FLASH_SECTOR_19 : FLASH_SECTOR_11;

    erase.NbSectors = 1;
    erase.VoltageRange = FLASH_VOLTAGE_RANGE_3;
    uint32_t err = 0;
    if (HAL_FLASHEx_Erase(&erase, &err) != HAL_OK) {
      HAL_FLASH_Lock();
      return false;
    }
    next_addr = FLASH_SECTOR_11_START_ADDR;
  }

  const uint8_t *src = (const uint8_t *)data;
  uint32_t *dst = (uint32_t *)next_addr;
  uint32_t word __attribute__((aligned(4)));
  for (size_t i = 0; i < sizeof(HTTPSsettings) / 4; i++) {
    memcpy(&word, src + i * 4, sizeof(uint32_t));
    if (HAL_FLASH_Program(FLASH_TYPEPROGRAM_WORD, (uint32_t)(dst + i), word) != HAL_OK) {
      HAL_FLASH_Lock();
      return false;
    }
  }

  HAL_FLASH_Lock();
  return true;
}

static bool settings_write_retries(const HTTPSsettings *cur, uint8_t new_retries)
{
  HTTPSsettings tmp;
  memcpy(&tmp, cur, sizeof(HTTPSsettings));
  tmp.ota_boot_retries = new_retries;
  tmp.version = cur->version + 1;
  tmp.crc = calculate_crc(&tmp);
  return write_settings(cur, &tmp);
}

/*
 * Откат: возвращаемся на банк, который был активен ДО текущего OTA-цикла.
 * new_state:
 *   OTA_STATE_COMMITTED        — ручной откат по запросу пользователя,
 *                                 либо восстановление после повреждённого
 *                                 образа (кандидат тут ни при чём).
 *   OTA_STATE_AUTO_ROLLED_BACK — автоматический откат: кандидат сам
 *                                 не смог доказать свою надёжность
 *                                 (исчерпан лимит пробных загрузок).
 */
static bool settings_rollback(const HTTPSsettings *cur, uint8_t new_state)
{
  HTTPSsettings tmp;
  memcpy(&tmp, cur, sizeof(HTTPSsettings));
  tmp.ota_active_bank  = cur->ota_prev_active_bank;
  tmp.ota_pending      = 0;
  tmp.ota_state        = new_state;
  tmp.ota_boot_retries = 0;
  tmp.version = cur->version + 1;
  tmp.crc = calculate_crc(&tmp);
  return write_settings(cur, &tmp);
}

/*
 * Проверка режима банков Flash: бит 29 (nDBANK) регистра OPTCR.
 * 0 = Dual Bank, 1 = Single Bank. Раньше читался неверный адрес
 * (0x40023C1C — reserved), из-за чего режим всегда определялся
 * как "Dual Bank (OK)".
 */
static bool flash_is_dual_bank(void)
{
  return (FLASH->OPTCR & FLASH_OPTCR_nDBANK) == 0;
}

/*
 * Валидность образа приложения по вектору сброса: первый DWORD —
 * начальный MSP, обязан указывать в SRAM (0x200xxxxx).
 */
static bool app_image_valid(uint32_t app_addr)
{
  uint32_t msp_val = *(volatile uint32_t *)app_addr;
  return (msp_val & 0xFFF00000) == 0x20000000;
}

/* USER CODE END 0 */

/**
  * @brief  The application entry point.
  * @retval int
  */
int main(void)
{

  /* USER CODE BEGIN 1 */

  /* USER CODE END 1 */

  /* MPU Configuration--------------------------------------------------------*/
  MPU_Config();

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
  MX_USART3_UART_Init();
  MX_CRC_Init();
  /* USER CODE BEGIN 2 */
	/* Дать терминалу/монитору порта успеть подключиться,
	 * иначе первые строки [BOOT] теряются. */
	HAL_Delay(100);

	log_msg("\r\n[BOOT] === Bootloader started ===\r\n");

	/* ── Проверка режима flash bank ── */
	{
		int is_single_bank = flash_is_dual_bank() ? 0 : 1;
		if (is_single_bank) {
			log_msg("[BOOT] *** WARNING: Flash is Single Bank! ***\r\n");
			log_msg("[BOOT] Run: STM32_Programmer_CLI -c port=SWD -ob DBANK=0\r\n");
			log_msg("[BOOT] OTA will not work until Dual Bank is enabled.\r\n");
		} else {
			log_msg("[BOOT] Flash: Dual Bank (OK)\r\n");
		}
	}

	const HTTPSsettings *s = get_latest_settings();
	uint32_t target_addr = BANK_A_ADDR;

	if (s == 0) {
		log_msg("[BOOT] No valid settings, default BANK A\r\n");
	} else {
		char buf[100];
		snprintf(buf, sizeof(buf),
				"[BOOT] Settings: bank=%u pending=%u state=%u retries=%u ver=%u\r\n",
				s->ota_active_bank, s->ota_pending, s->ota_state,
				s->ota_boot_retries, s->version);
		log_msg(buf);

		if (s->ota_pending == 1) {
			if (s->ota_state == OTA_STATE_COMMITTED) {
				target_addr = (s->ota_active_bank == 1) ? BANK_B_ADDR : BANK_A_ADDR;
				log_msg("[BOOT] Committed -> active bank\r\n");
			} else if (s->ota_state == OTA_STATE_UNCOMMITTED) {
				log_msg("[BOOT] App requested rollback\r\n");
				if (!settings_rollback(s, OTA_STATE_COMMITTED)) {
					log_msg("[BOOT] WARN: rollback write FAILED\r\n");
				}
				target_addr = (s->ota_prev_active_bank == 1) ? BANK_B_ADDR : BANK_A_ADDR;
			} else {
				uint8_t r = s->ota_boot_retries;
				if (r >= OTA_BOOT_RETRY_MAX) {
					log_msg("[BOOT] Max retries -> rollback to previous bank\r\n");
					if (!settings_rollback(s, OTA_STATE_AUTO_ROLLED_BACK)) {
						log_msg("[BOOT] WARN: rollback write FAILED\r\n");
					}
					target_addr = (s->ota_prev_active_bank == 1) ? BANK_B_ADDR : BANK_A_ADDR;
				} else {
					if (!settings_write_retries(s, r + 1)) {
						/* Не смогли зафиксировать попытку — тест кандидата
						 * небезопасен (упадём в цикл без счётчика).
						 * Возвращаемся на банк, откуда пришли. */
						log_msg("[BOOT] WARN: retries write FAILED\r\n");
						target_addr = (s->ota_prev_active_bank == 1) ? BANK_B_ADDR : BANK_A_ADDR;
					} else {
						/* Кандидат — банк из ota_active_bank (его выставил
						 * mg_ota_set_pending_bank: противоположный тому,
						 * откуда выполнялась прошивка). */
						target_addr = (s->ota_active_bank == 1) ? BANK_B_ADDR : BANK_A_ADDR;
						log_msg(s->ota_active_bank == 1 ?
								"[BOOT] Testing BANK B\r\n" : "[BOOT] Testing BANK A\r\n");
					}
				}
			}
		} else {
			target_addr = (s->ota_active_bank == 1) ? BANK_B_ADDR : BANK_A_ADDR;
			log_msg("[BOOT] No OTA -> active bank\r\n");
		}
	}

	/* Не прыгать в пустой/битый образ. Оба банка проверяются одинаково
	 * (без привилегии Bank A): при невалидном цели откатываем настройки
	 * на предыдущий банк и пробуем противоположный. */
	if (!app_image_valid(target_addr)) {
		log_msg("[BOOT] Target bank image INVALID\r\n");
		if (s != 0 && s->ota_pending == 1) {
			/* Клеймо "авто-откат кандидата" здесь неуместно: сюда же попадают
			 * случаи повреждения УЖЕ committed-банка (state==3) и неудачного
			 * ручного отката (state==2). Оставляем прежнее поведение. */
			if (!settings_rollback(s, OTA_STATE_COMMITTED)) {
				log_msg("[BOOT] WARN: rollback write FAILED\r\n");
			}
		}
		uint32_t fallback = (target_addr == BANK_A_ADDR) ? BANK_B_ADDR : BANK_A_ADDR;
		if (app_image_valid(fallback)) {
			target_addr = fallback;
			log_msg("[BOOT] Falling back to the other bank\r\n");
		} else {
			log_msg("[BOOT] BOTH banks invalid, halting\r\n");
			while (1);
		}
	}

	log_msg(target_addr == BANK_A_ADDR ?
			"[BOOT] Target: BANK A\r\n" : "[BOOT] Target: BANK B\r\n");

	jump_to_app(target_addr);

	log_msg("[BOOT] ERROR: returned from jump_to_app!\r\n");

  /* USER CODE END 2 */

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

  /** Configure the main internal regulator output voltage
  */
  __HAL_RCC_PWR_CLK_ENABLE();
  __HAL_PWR_VOLTAGESCALING_CONFIG(PWR_REGULATOR_VOLTAGE_SCALE3);

  /** Initializes the RCC Oscillators according to the specified parameters
  * in the RCC_OscInitTypeDef structure.
  */
  RCC_OscInitStruct.OscillatorType = RCC_OSCILLATORTYPE_HSI;
  RCC_OscInitStruct.HSIState = RCC_HSI_ON;
  RCC_OscInitStruct.HSICalibrationValue = RCC_HSICALIBRATION_DEFAULT;
  RCC_OscInitStruct.PLL.PLLState = RCC_PLL_NONE;
  if (HAL_RCC_OscConfig(&RCC_OscInitStruct) != HAL_OK)
  {
    Error_Handler();
  }

  /** Initializes the CPU, AHB and APB buses clocks
  */
  RCC_ClkInitStruct.ClockType = RCC_CLOCKTYPE_HCLK|RCC_CLOCKTYPE_SYSCLK
                              |RCC_CLOCKTYPE_PCLK1|RCC_CLOCKTYPE_PCLK2;
  RCC_ClkInitStruct.SYSCLKSource = RCC_SYSCLKSOURCE_HSI;
  RCC_ClkInitStruct.AHBCLKDivider = RCC_SYSCLK_DIV1;
  RCC_ClkInitStruct.APB1CLKDivider = RCC_HCLK_DIV1;
  RCC_ClkInitStruct.APB2CLKDivider = RCC_HCLK_DIV1;

  if (HAL_RCC_ClockConfig(&RCC_ClkInitStruct, FLASH_LATENCY_0) != HAL_OK)
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
/* USER CODE BEGIN MX_GPIO_Init_1 */
/* USER CODE END MX_GPIO_Init_1 */

  /* GPIO Ports Clock Enable */
  __HAL_RCC_GPIOD_CLK_ENABLE();

/* USER CODE BEGIN MX_GPIO_Init_2 */
/* USER CODE END MX_GPIO_Init_2 */
}

/* USER CODE BEGIN 4 */

/* USER CODE END 4 */

 /* MPU Configuration */

void MPU_Config(void)
{
  MPU_Region_InitTypeDef MPU_InitStruct = {0};

  /* Disables the MPU */
  HAL_MPU_Disable();

  /** Initializes and configures the Region and the memory to be protected
  */
  MPU_InitStruct.Enable = MPU_REGION_ENABLE;
  MPU_InitStruct.Number = MPU_REGION_NUMBER0;
  MPU_InitStruct.BaseAddress = 0x0;
  MPU_InitStruct.Size = MPU_REGION_SIZE_4GB;
  MPU_InitStruct.SubRegionDisable = 0x87;
  MPU_InitStruct.TypeExtField = MPU_TEX_LEVEL0;
  MPU_InitStruct.AccessPermission = MPU_REGION_NO_ACCESS;
  MPU_InitStruct.DisableExec = MPU_INSTRUCTION_ACCESS_DISABLE;
  MPU_InitStruct.IsShareable = MPU_ACCESS_SHAREABLE;
  MPU_InitStruct.IsCacheable = MPU_ACCESS_NOT_CACHEABLE;
  MPU_InitStruct.IsBufferable = MPU_ACCESS_NOT_BUFFERABLE;

  HAL_MPU_ConfigRegion(&MPU_InitStruct);
  /* Enables the MPU */
  HAL_MPU_Enable(MPU_PRIVILEGED_DEFAULT);

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
