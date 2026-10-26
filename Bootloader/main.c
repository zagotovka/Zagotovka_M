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
 * в области настроек по адресу 0x081C0000 (256 КБ: сектор 11 в
 * однобанковом режиме, секторы 22 + 23 в двухбанковом режиме).
 * Если старый код (оставшийся в другом банке или в непереприошенном
 * bootloader) не знает о новых полях — он трактует эти байты как
 * соседние/padding и может затереть их при следующей записи.
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
    uint32_t ota_bank_a_size;        // размер образа Bank A (0 = записи нет, прошито напрямую)
    uint32_t ota_bank_a_crc;         // CRC32 образа Bank A
    uint32_t ota_bank_b_size;        // размер образа Bank B (0 = записи нет)
    uint32_t ota_bank_b_crc;         // CRC32 образа Bank B
} HTTPSsettings;
/* USER CODE END PTD */

/* Private define ------------------------------------------------------------*/
/* USER CODE BEGIN PD */
#define SETTINGS_MAGIC_VALUE 0xA5B6C7D8
#define FLASH_SECTOR_11_START_ADDR 0x081C0000
#define SETTINGS_VERSION_COUNT 94

#define SETTINGS_ALIGNED_SIZE ((sizeof(HTTPSsettings) + 3) / 4 * 4)
#define GET_SETTINGS_ADDR(index) (FLASH_SECTOR_11_START_ADDR + (index) * SETTINGS_ALIGNED_SIZE)

/* Общий размер области настроек во Flash: 256 КБ.
 *  - Single Bank: один сектор 11 (256 КБ).
 *  - Dual Bank  : два сектора по 128 КБ: 22 (0x081C0000) и 23 (0x081E0000). */
#define SETTINGS_AREA_SIZE (256u * 1024u)

/* Все 94 слота обязаны помещаться в область настроек. */
typedef char static_assertion_settings_slots_fit_area[
    ((SETTINGS_VERSION_COUNT * ((sizeof(HTTPSsettings) + 3) / 4 * 4)) <= SETTINGS_AREA_SIZE) ? 1 : -1];

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
/* Адрес текущего (последнего валидного) слота настроек во Flash.
 * 0 — валидных настроек нет. Обновляется после каждой успешной записи,
 * поэтому не зависит от того, что после стирания сектора старый слот
 * во Flash уже недоступен. */
static uint32_t s_slot_addr = 0;
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
static bool write_settings(const HTTPSsettings *data);
static bool settings_area_is_erased(void);
static bool flash_is_dual_bank(void);
static bool app_image_valid(uint32_t app_addr);
#define BANK_CAPACITY 0x000C0000u

typedef enum {
    IMG_BAD_MSP = 0,
    IMG_BAD_CRC = 1,
    IMG_OK      = 2
} img_status_t;

/* CRC32 zlib (полином 0xEDB88320): тот же алгоритм, что mg_crc32() в приложении. */
static uint32_t image_crc32(uint32_t addr, uint32_t size)
{
    static const uint32_t lut[16] = {
        0x00000000, 0x1DB71064, 0x3B6E20C8, 0x26D930AC,
        0x76DC4190, 0x6B6B51F4, 0x4DB26158, 0x5005713C,
        0xEDB88320, 0xF00F9344, 0xD6D6A3E8, 0xCB61B38C,
        0x9B64C2B0, 0x86D3D2D4, 0xA00AE278, 0xBDBDF21C };
    const uint8_t *p = (const uint8_t *)addr;
    uint32_t crc = 0xFFFFFFFFu;
    while (size--) {
        uint8_t b = *p++;
        crc = lut[(crc ^ b) & 0x0F] ^ (crc >> 4);
        crc = lut[(crc ^ (b >> 4)) & 0x0F] ^ (crc >> 4);
    }
    return ~crc;
}

static img_status_t bank_image_status(const HTTPSsettings *s, uint32_t addr)
{
    if (!app_image_valid(addr)) return IMG_BAD_MSP;
    if (s == 0) return IMG_OK;

    /* CRC считается только на пробных загрузках OTA-кандидата (pending == 1).
     * В штатном режиме подтверждённый образ уже работал, а банк, залитый
     * напрямую через ST-Link, определяет и исправляет само приложение
     * (mg_ota_sync_bank_records()). Так обычный старт не тратит ~4 с на CRC. */
    if (s->ota_pending != 1) {
        log_msg(addr == BANK_B_ADDR ?
                "[BOOT] Bank B: MSP check only (no OTA trial)\r\n" :
                "[BOOT] Bank A: MSP check only (no OTA trial)\r\n");
        return IMG_OK;
    }

    uint32_t size = (addr == BANK_B_ADDR) ? s->ota_bank_b_size : s->ota_bank_a_size;
    uint32_t crc  = (addr == BANK_B_ADDR) ? s->ota_bank_b_crc  : s->ota_bank_a_crc;

    /* Записи о CRC нет (прошито напрямую через ST-Link): остаётся проверка MSP. */
    if (size == 0 || size > BANK_CAPACITY) return IMG_OK;

    uint32_t calc = image_crc32(addr, size);
    char buf[110];
    char name = (addr == BANK_B_ADDR) ? 'B' : 'A';
    if (calc != crc) {
        snprintf(buf, sizeof(buf),
                 "[BOOT] Bank %c: CRC MISMATCH size=%lu exp=0x%08lX got=0x%08lX\r\n",
                 name, (unsigned long)size, (unsigned long)crc, (unsigned long)calc);
        log_msg(buf);
        return IMG_BAD_CRC;
    }
    snprintf(buf, sizeof(buf), "[BOOT] Bank %c: CRC OK size=%lu\r\n",
             name, (unsigned long)size);
    log_msg(buf);
    return IMG_OK;
}

/* Банк пригоден к запуску: MSP валиден, а на пробной загрузке OTA-кандидата
 * (ota_pending == 1) ещё и совпал CRC. Несовпадение CRC при pending == 1 =
 * повреждённый образ, банк отвергается, как и раньше. */
static bool bank_bootable(const HTTPSsettings *s, uint32_t addr)
{
    return bank_image_status(s, addr) == IMG_OK;
}
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

/*
 * Проверка, что вся область слотов настроек стёрта (все слова == 0xFFFFFFFF).
 * Нужна после стирания: HAL_FLASHEx_Erase() может вернуть HAL_OK и при
 * неверно выбранном секторе, а запись поверх нестёртых данных даёт слот
 * с верным magic и битым CRC.
 */
static bool settings_area_is_erased(void)
{
    const volatile uint32_t *p = (const volatile uint32_t *)FLASH_SECTOR_11_START_ADDR;
    const size_t words = (SETTINGS_VERSION_COUNT * SETTINGS_ALIGNED_SIZE) / 4;
    for (size_t i = 0; i < words; i++) {
        if (p[i] != 0xFFFFFFFFu) return false;
    }
    return true;
}

/*
 * Запись новой копии настроек в следующий слот (по кругу, 94 слота).
 * Когда круг замыкается (следующий индекс 0), стирается ВСЯ область
 * настроек и запись идёт в слот 0.
 *
 * Область настроек 0x081C0000 .. 0x081FFFFF (256 КБ):
 *  - Single Bank: сектор 11 (FLASH_SECTOR_11), 256 КБ;
 *  - Dual Bank  : Bank 2, секторы 22 и 23 (FLASH_SECTOR_22, FLASH_SECTOR_23),
 *                 по 128 КБ каждый — стирать нужно ОБА.
 * Сектора 19 и 20 (0x08160000 .. 0x0819FFFF) в Dual Bank относятся к образу
 * Bank B — стирать их нельзя.
 */
static bool write_settings(const HTTPSsettings *data)
{
  int cur_idx = -1;
  if (s_slot_addr != 0) {
    cur_idx = (int)((s_slot_addr - FLASH_SECTOR_11_START_ADDR) / SETTINGS_ALIGNED_SIZE);
  }
  int next_idx = (cur_idx + 1) % SETTINGS_VERSION_COUNT;
  uint32_t next_addr = GET_SETTINGS_ADDR(next_idx);
  bool need_erase = (next_idx == 0) || (next_idx < cur_idx);

  if (HAL_FLASH_Unlock() != HAL_OK) {
    log_msg("[BOOT] settings: flash unlock FAILED\r\n");
    return false;
  }

  if (need_erase) {
    FLASH_EraseInitTypeDef erase = {0};
    erase.TypeErase    = FLASH_TYPEERASE_SECTORS;
    erase.VoltageRange = FLASH_VOLTAGE_RANGE_3;
    if (flash_is_dual_bank()) {
      erase.Sector    = FLASH_SECTOR_22;   /* 0x081C0000, 128 КБ */
      erase.NbSectors = 2;                 /* + FLASH_SECTOR_23, 0x081E0000 */
    } else {
      erase.Sector    = FLASH_SECTOR_11;   /* 0x081C0000, 256 КБ */
      erase.NbSectors = 1;
    }
    uint32_t err = 0;
    if (HAL_FLASHEx_Erase(&erase, &err) != HAL_OK) {
      HAL_FLASH_Lock();
      log_msg("[BOOT] settings: erase FAILED\r\n");
      return false;
    }
    if (!settings_area_is_erased()) {
      HAL_FLASH_Lock();
      log_msg("[BOOT] settings: area NOT erased after erase, abort\r\n");
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
      log_msg("[BOOT] settings: program FAILED\r\n");
      return false;
    }
  }

  HAL_FLASH_Lock();

  /* Проверка записи: содержимое слота должно совпасть с записанным. */
  if (memcmp((const void *)next_addr, data, sizeof(HTTPSsettings)) != 0) {
    log_msg("[BOOT] settings: verify FAILED\r\n");
    return false;
  }

  s_slot_addr = next_addr;
  return true;
}

/*
 * cur — рабочая КОПИЯ настроек в RAM (не указатель на Flash). После успешной
 * записи копия обновляется, поэтому она всегда соответствует последнему
 * слоту, даже если запись потребовала стирания области.
 */
static bool settings_write_retries(HTTPSsettings *cur, uint8_t new_retries)
{
  HTTPSsettings tmp;
  memcpy(&tmp, cur, sizeof(HTTPSsettings));
  tmp.ota_boot_retries = new_retries;
  tmp.version = cur->version + 1;
  tmp.crc = calculate_crc(&tmp);
  if (!write_settings(&tmp)) return false;
  memcpy(cur, &tmp, sizeof(HTTPSsettings));
  return true;
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
static bool settings_rollback(HTTPSsettings *cur, uint8_t new_state)
{
  HTTPSsettings tmp;
  memcpy(&tmp, cur, sizeof(HTTPSsettings));
  tmp.ota_active_bank  = cur->ota_prev_active_bank;
  tmp.ota_pending      = 0;
  tmp.ota_state        = new_state;
  tmp.ota_boot_retries = 0;
  tmp.version = cur->version + 1;
  tmp.crc = calculate_crc(&tmp);
  if (!write_settings(&tmp)) return false;
  memcpy(cur, &tmp, sizeof(HTTPSsettings));
  return true;
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

	{
		char b[160];
		snprintf(b, sizeof(b),
				"\r\n[BOOT] === Bootloader started, build %s %s ===\r\n",
				__DATE__, __TIME__);
		log_msg(b);
		snprintf(b, sizeof(b),
				"[BOOT] settings: struct=%u slot=%u OPTCR=0x%08lX\r\n",
				(unsigned)sizeof(HTTPSsettings),
				(unsigned)SETTINGS_ALIGNED_SIZE,
				(unsigned long)FLASH->OPTCR);
		log_msg(b);
	}

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

	/* Рабочая копия настроек в RAM: после любой записи во Flash
	 * (а она может стереть область настроек) указатель на старый слот
	 * использовать нельзя, поэтому все решения принимаются по копии. */
	HTTPSsettings s_copy;
	const HTTPSsettings *s = 0;
	{
		const HTTPSsettings *s_flash = get_latest_settings();
		if (s_flash != 0) {
			memcpy(&s_copy, s_flash, sizeof(HTTPSsettings));
			s_slot_addr = (uint32_t)s_flash;
			s = &s_copy;
		}
	}
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
				if (!settings_rollback(&s_copy, OTA_STATE_COMMITTED)) {
					log_msg("[BOOT] WARN: rollback write FAILED\r\n");
				}
				target_addr = (s->ota_prev_active_bank == 1) ? BANK_B_ADDR : BANK_A_ADDR;
			} else {
				uint8_t r = s->ota_boot_retries;
				if (r >= OTA_BOOT_RETRY_MAX) {
					log_msg("[BOOT] Max retries -> rollback to previous bank\r\n");
					if (!settings_rollback(&s_copy, OTA_STATE_AUTO_ROLLED_BACK)) {
						log_msg("[BOOT] WARN: rollback write FAILED\r\n");
					}
					target_addr = (s->ota_prev_active_bank == 1) ? BANK_B_ADDR : BANK_A_ADDR;
				} else {
					/* Если запись счётчика пройдёт успешно, копия s_copy будет
					 * обновлена (pending остаётся 1, retries = r + 1). */
					uint8_t cand_bank = s->ota_active_bank;
					uint8_t prev_bank = s->ota_prev_active_bank;
					if (!settings_write_retries(&s_copy, r + 1)) {
						/* Не смогли зафиксировать попытку — тест кандидата
						 * небезопасен (упадём в цикл без счётчика).
						 * Возвращаемся на банк, откуда пришли. */
						log_msg("[BOOT] WARN: retries write FAILED\r\n");
						target_addr = (prev_bank == 1) ? BANK_B_ADDR : BANK_A_ADDR;
					} else {
						/* Кандидат — банк из ota_active_bank (его выставил
						 * mg_ota_set_pending_bank: противоположный тому,
						 * откуда выполнялась прошивка). */
						target_addr = (cand_bank == 1) ? BANK_B_ADDR : BANK_A_ADDR;
						log_msg(cand_bank == 1 ?
								"[BOOT] Testing BANK B\r\n" : "[BOOT] Testing BANK A\r\n");
					}
				}
			}
		} else {
			target_addr = (s->ota_active_bank == 1) ? BANK_B_ADDR : BANK_A_ADDR;
			log_msg("[BOOT] No OTA -> active bank\r\n");
		}
	}

	/* Не прыгать в пустой/битый образ: MSP + CRC32 (если запись о CRC есть). */
	if (!bank_bootable(s, target_addr)) {
		log_msg("[BOOT] Target bank image INVALID\r\n");
		if (s != 0 && s->ota_pending == 1) {
			if (!settings_rollback(&s_copy, OTA_STATE_COMMITTED)) {
				log_msg("[BOOT] WARN: rollback write FAILED\r\n");
			}
		}
		uint32_t fallback = (target_addr == BANK_A_ADDR) ? BANK_B_ADDR : BANK_A_ADDR;
		if (bank_bootable(s, fallback)) {
			target_addr = fallback;
			log_msg("[BOOT] Falling back to the other bank\r\n");
		} else if (app_image_valid(target_addr)) {
			/* Ни один банк не прошёл CRC: лучше запустить образ с верным MSP,
			 * чем остановиться (контроллер в труднодоступном месте). */
			log_msg("[BOOT] No bank passed CRC, booting target by MSP only\r\n");
		} else if (app_image_valid(fallback)) {
			target_addr = fallback;
			log_msg("[BOOT] No bank passed CRC, booting other bank by MSP only\r\n");
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
