#pragma once
#include <stdint.h>

/* Метаданные образа прошивки: под какой банк слинкована эта сборка.
 * Записываются в фиксированное место .bin (сразу после .isr_vector,
 * см. FW_META_OFFSET и патч в STM32F767ZITX_FLASH*.ld), чтобы сервер
 * (net.c, handle_firmware_upload) мог проверить это ДО записи во flash,
 * независимо от имени файла, которое мог отредактировать пользователь. */

#define FW_META_MAGIC   0x5A47304DUL   /* 'ZG0M' */
#define FW_META_OFFSET  0x300          /* смещение в .bin от начала образа;
                                           должно быть >= размера таблицы
                                           векторов прерываний Cortex-M7 */

typedef struct {
    uint32_t magic;
    uint8_t  target_bank;   /* 0 = Bank A, 1 = Bank B */
    uint8_t  reserved[3];
    uint32_t link_base;     /* ORIGIN(FLASH) этой сборки, доп. sanity-check */
} fw_meta_t;

extern const fw_meta_t g_fw_meta;
