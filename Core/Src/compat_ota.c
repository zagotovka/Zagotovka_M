/**
 * @file compat_ota.c
 * @brief Stub implementations for Mongoose OTA/Flash API removed in 7.21
 *
 * These stubs allow existing firmware-update handlers in net.c to compile.
 * OTA queries return "no firmware info" and flash operations return false.
 * mg_device_reset() triggers a real MCU reset via NVIC_SystemReset().
 *
 * OTA commit-flag storage:
 *   Изначально флаг ("первая загрузка / подтверждено") хранился в статической
 *   переменной в секции .noinit_itcm (обычная ITCM RAM). Это переживало
 *   программный NVIC_SystemReset() (вызывается из mg_device_reset() сразу
 *   после успешной OTA-заливки), но НЕ переживало реальное отключение
 *   питания — RAM теряет содержимое, magic-число "бьётся", и статус на
 *   странице Firmware Update откатывался на 0 ("Нет данных о версии"), даже
 *   если сама прошивка была залита и работает корректно.
 *
 *   Сейчас флаг хранится в поле ota_state структуры HTTPSsettings, которая
 *   пишется во Flash-сектор 11 (ZERG_FLASH, 0x081C0000) через уже имеющийся
 *   в zagotovka.c механизм: magic + CRC + ротация по 94 слотам (wear
 *   leveling). Это настоящая энергонезависимая память — значение переживает
 *   и программный ресет, и полное отключение питания без батарейки/VBAT.
 *   Запись происходит только при mg_ota_mark_pending()/mg_ota_commit(), т.е.
 *   пару раз за цикл обновления прошивки, так что ресурс Flash не проблема.
 */

#include "compat_ota.h"
#include "zagotovka.h" /* HTTPSsettings, get_valid_settings(), update_and_write_settings() */
#include "version_gen.h" /* FW_VERSION */
#include "logger.h"    /* LOG_CAT_OTA, LOG_MASK_OTA, cat_prefixes[], g_log_filter_mask */
#include <string.h>    /* strlen */
/* Cortex-M CMSIS header for NVIC_SystemReset() */
#if defined(__GNUC__) || defined(__CC_ARM) || defined(__ICCARM__)
#include "stm32f7xx_hal.h"
#endif

extern UART_HandleTypeDef huart3;

/* ---- Персистентный флаг состояния OTA ------------------------------------
 * Теперь хранится во flash-структуре HTTPSsettings (поле ota_state, сектор
 * 11 / ZERG_FLASH), которая уже защищена magic+CRC+wear-leveling в
 * zagotovka.c — переживает и программный ресет, и полное отключение
 * питания. */

static uint32_t ota_flag_read(void) {
    const HTTPSsettings *s = get_valid_settings();
    return s ? s->ota_state : 0;
}

static void ota_flag_write(uint32_t state) {
	    const HTTPSsettings *cur = get_valid_settings();
	    HTTPSsettings tmp;
	    if (cur) memcpy(&tmp, cur, sizeof(tmp));
	    else     memset(&tmp, 0, sizeof(tmp));

	    tmp.ota_state = (uint8_t) state;
	    bool ok = update_and_write_settings(&tmp);

	    // Прямой, БЛОКИРУЮЩИЙ вывод в обход logger_send()/xMessageBuffer —
	    // чтобы сообщение гарантированно ушло по UART ДО возможного ребута,
	    // а не потерялось в очереди у низкоприоритетного LoggerTask.
	    //
	    // Используем тот же префикс "[OTA] " и ту же маску фильтра
	    // LOG_MASK_OTA, что и обычный LOG_OTA()/logger_send(LOG_CAT_OTA, ...),
	    // чтобы строка была видна/скрываема в общем фильтре логов так же,
	    // как остальные [OTA]-сообщения, а не отдельным неучтённым тегом.
	    if (g_log_filter_mask & LOG_MASK_OTA) {
	        char dbg[96];
	        int n = snprintf(dbg, sizeof(dbg),
	                          "ota_flag_write(%lu) -> %s\r\n",
	                          (unsigned long) state, ok ? "OK" : "FAILED");
	        const char *prefix = cat_prefixes[LOG_CAT_OTA];
	        HAL_UART_Transmit(&huart3, (uint8_t *) prefix, strlen(prefix), 50);
	        HAL_UART_Transmit(&huart3, (uint8_t *) dbg, n, 200);
	    }
	}

/* ---- mg_device_reset ---------------------------------------------------- */
void mg_device_reset(void) {
    NVIC_SystemReset();
    /* Never returns */
}

/* ---- OTA Rollback helpers ----------------------------------------------- */
/* target_bank — банк-кандидат (противоположный активному),
 * prev_bank — банк, активный ДО текущего OTA-цикла (для отката). */
void mg_ota_set_pending_bank(uint8_t target_bank, uint8_t prev_bank) {
    const HTTPSsettings *current = get_valid_settings();
    HTTPSsettings tmp;
    if (current) memcpy(&tmp, current, sizeof(tmp));
    else memset(&tmp, 0, sizeof(tmp));

    tmp.ota_pending = 1;
    tmp.ota_active_bank = target_bank;
    tmp.ota_prev_active_bank = prev_bank;
    tmp.ota_state = 1; // MG_OTA_FIRST_BOOT
    /* Явное обнуление: каждый новый OTA-цикл стартует с чистым счётчиком
     * попыток, независимо от того, чем закончился предыдущий цикл
     * (иначе, например, перепрошивка поверх незавершённого trial-цикла
     * с retries=2 унаследует счётчик, и после первого падения нового
     * образа bootloader откатится сразу, не дав трёх свежих попыток). */
    tmp.ota_boot_retries = 0;
    update_and_write_settings(&tmp);
}

uint8_t mg_ota_get_active_bank(void) {
    uint32_t vtor = *(volatile uint32_t *)0xE000ED08; // SCB->VTOR
    return (vtor == 0x08100000) ? 1 : 0; // 0=Bank A, 1=Bank B
}

/* ---- Публичный вызов: пометить "первая загрузка после OTA" -------------- */
uint32_t mg_ota_mark_pending(void) {
    uint32_t prev = ota_flag_read();
    uint8_t current = mg_ota_get_active_bank();
    uint8_t target   = current ? 0 : 1; // кандидат = противоположный активному
    mg_ota_set_pending_bank(target, current);
    return prev;
}

/* ---- Откат флага, если mg_ota_end() не выполнил своп -------------------- */
void mg_ota_cancel_pending(uint32_t prev_state) {
    ota_flag_write(prev_state);
}

/* ---- Сброс статуса в 0 при старте новой записи прошивки -------------- */
void mg_ota_reset_status(void) {
    ota_flag_write(0); // 0 = Нет данных / флаг сброшен
}

/* ---- OTA query stubs ---------------------------------------------------- */
int mg_ota_status(int firmware) {
    (void) firmware;
    uint32_t state = ota_flag_read();
    if (state == 1 || state == 3) return (int) state;
    return 0; // 0 = Нет данных / Не через OTA
}

uint32_t mg_ota_crc32(int firmware) {
    (void) firmware;
    return 0;
}

uint32_t mg_ota_timestamp(int firmware) {
    (void) firmware;
    return 0;
}

size_t mg_ota_size(int firmware) {
    (void) firmware;
    return 0;
}

bool mg_ota_commit(void) {
    const HTTPSsettings *current = get_valid_settings();
    HTTPSsettings tmp;
    if (current) memcpy(&tmp, current, sizeof(tmp));
    else memset(&tmp, 0, sizeof(tmp));

    tmp.ota_state = 3; // Committed
    tmp.ota_pending = 0;

    /* Запоминаем версию образа в активном банке — её показывает
     * /api/firmware/status и использует кнопка switch-bank в UI. */
    uint8_t active = mg_ota_get_active_bank();
    char *slot = active ? tmp.ota_bank_b_version : tmp.ota_bank_a_version;
    strncpy(slot, FW_VERSION, sizeof(tmp.ota_bank_a_version) - 1);
    slot[sizeof(tmp.ota_bank_a_version) - 1] = '\0';

    return update_and_write_settings(&tmp);
}

/* Валидность образа по начальному MSP: обязан указывать в SRAM (0x200xxxxx).
 * Адреса банков: Bank A = 0x08040000, Bank B = 0x08100000 (как в bootloader). */
static bool bank_image_valid(uint8_t bank) {
    uint32_t addr = bank ? 0x08100000u : 0x08040000u;
    uint32_t msp  = *(volatile uint32_t *)addr;
    return (msp & 0xFFF00000u) == 0x20000000u;
}

/* Переключение на противоположный банк без заливки нового образа
 * (ручной откат на предыдущую версию или возврат вперёд). */
bool mg_ota_switch_bank(void) {
    uint8_t current = mg_ota_get_active_bank();
    uint8_t target  = current ? 0 : 1;

    if (!bank_image_valid(target)) {
        LOG_OTA("switch_bank: target bank %u has no valid image, aborting\n",
                (unsigned) target);
        return false;
    }

    const HTTPSsettings *cur = get_valid_settings();
    HTTPSsettings tmp;
    if (cur) memcpy(&tmp, cur, sizeof(tmp));
    else     memset(&tmp, 0, sizeof(tmp));

    tmp.ota_active_bank  = target;
    tmp.ota_pending      = 0;
    tmp.ota_state        = 3;
    tmp.ota_boot_retries = 0;

    bool ok = update_and_write_settings(&tmp);
    if (ok) mg_device_reset();
    return ok;
}

bool mg_ota_rollback(void) {
    const HTTPSsettings *current = get_valid_settings();
    HTTPSsettings tmp;
    if (current) memcpy(&tmp, current, sizeof(tmp));
    else memset(&tmp, 0, sizeof(tmp));
    
    tmp.ota_state = 2; // Uncommitted (rollback)
    tmp.ota_pending = 1;
    bool ok = update_and_write_settings(&tmp);
    if (ok) mg_device_reset();
    return ok;
}

/* ---- Flash stubs -------------------------------------------------------- */
void *mg_flash_start(void) {
    return (void *) 0x08040000;  /* Active firmware start (Sector 5) */
}

size_t mg_flash_size(void) {
    return 1536 * 1024;  /* 1536 KB: Sectors 5-10 (active + staging) */
}

size_t mg_flash_sector_size(void) {
    return 256 * 1024;  /* 256 KB (largest sector on STM32F767) */
}

size_t mg_flash_write_align(void) {
    return 32;  /* STM32F7 flash write granularity */
}

int mg_flash_bank(void) {
    return 1;  /* Single bank mode by default */
}

bool mg_flash_write(void *addr, const void *buf, size_t len) {
    (void) addr; (void) buf; (void) len;
    return false;  /* Stub — not implemented */
}

bool mg_flash_erase(void *sector) {
    (void) sector;
    return false;  /* Stub — not implemented */
}

bool mg_flash_swap_bank(void) {
    return false;  /* Stub — not implemented */
}

bool mg_flash_load(void *sector, uint32_t key, void *buf, size_t len) {
    (void) sector; (void) key; (void) buf; (void) len;
    return false;
}

bool mg_flash_save(void *sector, uint32_t key, const void *buf, size_t len) {
    (void) sector; (void) key; (void) buf; (void) len;
    return false;
}
