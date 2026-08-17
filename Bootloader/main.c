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
/* USER CODE END Includes */

/* Private typedef -----------------------------------------------------------*/
/* USER CODE BEGIN PTD */
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
    uint8_t padding[1];
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

#define OTA_BOOT_RETRY_MAX 3
/* USER CODE END PD */

/* Private macro -------------------------------------------------------------*/
/* USER CODE BEGIN PM */

/* USER CODE END PM */

/* Private variables ---------------------------------------------------------*/

UART_HandleTypeDef huart3;
CRC_HandleTypeDef hcrc;

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

    for (int i = 0; i < SETTINGS_VERSION_COUNT; i++) {
        const HTTPSsettings *s = (const HTTPSsettings *)GET_SETTINGS_ADDR(i);
        if (s->magic != SETTINGS_MAGIC_VALUE) continue;

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
    erase.Sector = FLASH_SECTOR_20;

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

static bool settings_rollback(const HTTPSsettings *cur)
{
  HTTPSsettings tmp;
  memcpy(&tmp, cur, sizeof(HTTPSsettings));
  tmp.ota_pending = 0;
  tmp.ota_active_bank = 0;
  tmp.ota_state = 0;
  tmp.ota_boot_retries = 0;
  tmp.version = cur->version + 1;
  tmp.crc = calculate_crc(&tmp);
  return write_settings(cur, &tmp);
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
	log_msg("\r\n[BOOT] === Bootloader started ===\r\n");

	/* ── Проверка режима flash bank ── */
	{
		volatile uint32_t optcr = *(volatile uint32_t *)(0x40023C00 + 0x1C);
		int is_single_bank = (optcr & (1UL << 29)) ? 1 : 0;
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
			if (s->ota_state == 3) {
				target_addr = (s->ota_active_bank == 1) ? BANK_B_ADDR : BANK_A_ADDR;
				log_msg("[BOOT] Committed -> active bank\r\n");
			} else if (s->ota_state == 2) {
				log_msg("[BOOT] App requested rollback -> BANK A\r\n");
				settings_rollback(s);
				target_addr = BANK_A_ADDR;
			} else {
				uint8_t r = s->ota_boot_retries;
				if (r >= OTA_BOOT_RETRY_MAX) {
					log_msg("[BOOT] Max retries -> rollback BANK A\r\n");
					settings_rollback(s);
					target_addr = BANK_A_ADDR;
				} else {
					settings_write_retries(s, r + 1);
					target_addr = BANK_B_ADDR;
					log_msg("[BOOT] Testing BANK B\r\n");
				}
			}
		} else {
			target_addr = (s->ota_active_bank == 1) ? BANK_B_ADDR : BANK_A_ADDR;
			log_msg("[BOOT] No OTA -> active bank\r\n");
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

static void MX_CRC_Init(void)
{
  __HAL_RCC_CRC_CLK_ENABLE();

  hcrc.Instance = CRC;
  hcrc.Init.DefaultPolynomialUse = DEFAULT_POLYNOMIAL_ENABLE;
  hcrc.Init.DefaultInitValueUse = DEFAULT_INIT_VALUE_ENABLE;
  hcrc.Init.InputDataInversionMode = CRC_INPUTDATA_INVERSION_NONE;
  hcrc.Init.OutputDataInversionMode = CRC_OUTPUTDATA_INVERSION_DISABLE;
  hcrc.InputDataFormat = CRC_INPUTDATA_FORMAT_BYTES;

  if (HAL_CRC_Init(&hcrc) != HAL_OK) {
    Error_Handler();
  }
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
