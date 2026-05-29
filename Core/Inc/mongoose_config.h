
// If we could guess an MG_ARCH so far, preserve it, otherwise try GCC-based
#pragma once

#define MG_TLS MG_TLS_BUILTIN // HTTPS
// #define TLS_TWOWAY // Двусторонняя аутентификация

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

#define MG_ENABLE_PACKED_FS 1
#define MG_ENABLE_MBEDTLS 0
#define MG_ARCH MG_ARCH_CMSIS_RTOS2
#define MG_STMPACK_NET 0
#define MG_ENABLE_CUSTOM_RANDOM 1

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
#define MG_DATA_SIZE 100

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

// See https://mongoose.ws/documentation/#build-options
