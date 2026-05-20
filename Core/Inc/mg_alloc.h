/**
 * @file mg_alloc.h
 * @brief Override mg_calloc/mg_free to use FreeRTOS heap_4 (192KB).
 *
 * Mongoose uses mg_calloc() and mg_free() functions, not MG_MALLOC macros.
 * Setting MG_ENABLE_CUSTOM_CALLOC=1 disables Mongoose's default
 * calloc(3)/free(3) implementations and requires us to provide our own.
 *
 * heap_4 has coalescing — much better for long-running MQTT reconnect cycles
 * than the 32KB newlib sbrk heap.
 */
#pragma once

#include "FreeRTOS.h"
#include "task.h"
#include <string.h>

static inline void mg_free(void *ptr) {
  if (ptr != NULL) vPortFree(ptr);
}

static inline void *mg_calloc(size_t count, size_t size) {
  size_t total = count * size;
  void *p = pvPortMalloc(total);
  if (p != NULL) memset(p, 0, total);
  return p;
}
