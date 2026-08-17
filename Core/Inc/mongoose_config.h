
// If we could guess an MG_ARCH so far, preserve it, otherwise try GCC-based
#pragma once

#define MG_TLS MG_TLS_BUILTIN // HTTPS
// #define TLS_TWOWAY // Двусторонняя аутентификация

/* Использовать AES-128-GCM вместо CHACHA20_POLY1305.
   AES-128-GCM на STM32F быстрее: меньше размер ключа (16 vs 32 байта),
   проще раунды шифрования, меньше CPU load на handshake и передачу данных.
   Разница особенно заметна при двух одновременных TLS-соединениях. */
#define MG_ENABLE_CHACHA20 0

#define MG_ENABLE_CUSTOM_RANDOM 1
#define MG_ARCH MG_ARCH_NEWLIB
#define MG_ENABLE_TCPIP 1
#define MG_ENABLE_CUSTOM_MILLIS 1
#define MG_ENABLE_DRIVER_STM32F 1

#if defined(MG_ARCH)
#define MG_STMPACK_ARCH MG_ARCH
#undef MG_ARCH
#elif defined(__GNUC__)
#define MG_STMPACK_ARCH MG_ARCH_NEWLIB
#endif

/* OTA flash functions must be executed from RAM to prevent HardFault during flash swap.
   The project's startup script copies the .itcm section to ITCM RAM. */
#define MG_IRAM __attribute__((section(".itcm")))

#define MG_ENABLE_PACKED_FS 1
#define MG_ENABLE_MBEDTLS 0
#define MG_ARCH MG_ARCH_CMSIS_RTOS2
#define MG_STMPACK_NET 0
#define MG_ENABLE_CUSTOM_RANDOM 1

/* Увеличиваем IO buffer granularity для ускорения передачи больших файлов через TLS.
   По умолчанию 2048 — Mongoose отдаёт статику порциями по MG_IO_SIZE байт.
   При 512-байтовых TLS records это 4 записи на итерацию poll вместо 1.

   Важно: MG_IO_SIZE влияет на размер буфера аллокации, не на TLS record size.
   TLS record остаётся стандартным (до 16384 байт), но Mongoose будет читать из packed FS
   и шифровать большими кусками за раз.
   */
#define MG_IO_SIZE 2048 // was 4096, reduced to save 16KB constant RAM (8 conns × 2KB)

// Translate to Mongoose macros
#if MG_STMPACK_NET == 0
#define MG_ENABLE_TCPIP 1
#elif MG_STMPACK_NET == 1
#define MG_ENABLE_LWIP 1
#elif MG_STMPACK_NET == 2
#define MG_ENABLE_FREERTOS_TCP 1
#elif MG_STMPACK_NET == 3
#define MG_ENABLE_RL 1
#endif

#if MG_ENABLE_PACKED_FS
#define MG_ENABLE_POSIX_FS 0
#endif

/* TCP backlog: 100 / 5 байт на слот = 20 слотов.
   По умолчанию MG_DATA_SIZE=32 → только 6 слотов.
   Браузер открывает до 6 HTTP + 1 WS соединений одновременно при загрузке
   страницы → WS SYN дропался → обрывы. 20 слотов покрывают с запасом. */
#define MG_DATA_SIZE 32  // was 100; per-conn scratch buffer, 32B enough for small headers

/* MIP TCP keepalive: 30 секунд.
   Мёртвые соединения (браузер ушёл без FIN) убиваются через 30с,
   освобождая TCP-слоты. Для MQTT есть свой PINGREQ/PINGRESP. */
#define MG_TCPIP_KEEPALIVE_MS 30000

/* Перенаправляем mg_calloc/mg_free на FreeRTOS heap_4 (192KB, коалесценция).
   Без этого Mongoose использует свои дефолтные mg_calloc/mg_free,
   которые вызывают newlib calloc/free (sbrk heap 32KB) → фрагментация,
   calloc возвращает NULL при 143KB свободного FreeRTOS heap.
   MG_MALLOC/MG_CALLOC — макросы старого API, которые Mongoose НЕ использует. */
#define MG_ENABLE_CUSTOM_CALLOC 1
#include "mg_alloc.h"

/* ---- OTA / Firmware update -------------------------------------------
 * Включаем встроенный в Mongoose потоковый механизм OTA-обновления для
 * STM32 F-серии (F2/F4/F7). Реализация лежит в mongoose.c (секция
 * "src/ota_stm32f.c") и даёт mg_ota_begin()/mg_ota_write()/mg_ota_end() —
 * запись файла прошивки во flash по мере получения HTTP-чанков, без
 * буферизации всего файла в RAM.
 *
 * Без этого define MG_OTA скатывается в MG_OTA_NONE (т.к. generic-макрос
 * STM32F7 в проекте не определён — используется только STM32F767xx от
 * CMSIS), и mg_ota_begin/write/end остаются объявленными, но не
 * реализованными нигде — net.c, вызывающий их напрямую, не слинкуется.
 *
 * ВАЖНО: в mg_ota_begin() flash->start = 0x08040000, size = 0x180000 (1536 КБ).
 * Это даёт active = Sectors 5-7 [0x08040000..0x080FFFFF],
 * staging = Sectors 8-10 [0x08100000..0x081BFFFF].
 * Sector 11 (ZERG_FLASH, 0x081C0000) зарезервирован под настройки.
 */
#define MG_OTA MG_OTA_STM32F

// See https://mongoose.ws/documentation/#build-options
#define MG_TCPIP_FIN_MS 200
