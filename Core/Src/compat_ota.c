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

/* ---- Публичный вызов: пометить "первая загрузка после OTA" -------------- */
uint32_t mg_ota_mark_pending(void) {
    uint32_t prev = ota_flag_read();
    ota_flag_write(1); // 1 = First boot (uncommitted)
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
    ota_flag_write(3); // 3 = Committed
    return true;
}

bool mg_ota_rollback(void) {
    return false;
}

/* ---- Flash stubs -------------------------------------------------------- */
void *mg_flash_start(void) {
    return (void *) 0x08000000;  /* STM32F7 flash base */
}

size_t mg_flash_size(void) {
    return 2 * 1024 * 1024;  /* 2 MB for STM32F767 */
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
