#include "fw_meta.h"

#ifndef FW_TARGET_BANK
#error "FW_TARGET_BANK не задан. Задайте в Properties -> C/C++ Build -> " \
       "Settings -> MCU GCC Compiler -> Preprocessor -> Defined symbols: " \
       "FW_TARGET_BANK=0 для конфигурации Bank_A, FW_TARGET_BANK=1 для Bank_B."
#endif

#ifndef FW_LINK_BASE
#error "FW_LINK_BASE не задан. Должен совпадать с ORIGIN(FLASH) из " \
       "linker script этой конфигурации (0x08040000 для Bank_A, " \
       "0x08100000 для Bank_B)."
#endif

/* Секция .fw_meta размещена линкер-скриптом сразу после .isr_vector,
 * на фиксированном смещении FW_META_OFFSET от начала образа — см.
 * STM32F767ZITX_FLASH.ld / STM32F767ZITX_FLASH_BANK_B.ld. Это гарантирует,
 * что метка попадёт в самый первый (offset=0) чанк OTA-загрузки (4 КБ),
 * независимо от размера итогового .bin. */
__attribute__((section(".fw_meta"), used))
const fw_meta_t g_fw_meta = {
    .magic       = FW_META_MAGIC,
    .target_bank = FW_TARGET_BANK,
    .reserved    = {0, 0, 0},
    .link_base   = FW_LINK_BASE,
};
