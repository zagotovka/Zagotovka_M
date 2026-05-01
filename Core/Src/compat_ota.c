/**
 * @file compat_ota.c
 * @brief Stub implementations for Mongoose OTA/Flash API removed in 7.21
 *
 * These stubs allow existing firmware-update handlers in net.c to compile.
 * OTA queries return "no firmware info" and flash operations return false.
 * mg_device_reset() triggers a real MCU reset via NVIC_SystemReset().
 */

#include "compat_ota.h"

/* Cortex-M CMSIS header for NVIC_SystemReset() */
#if defined(__GNUC__) || defined(__CC_ARM) || defined(__ICCARM__)
#include "stm32f7xx.h"   /* Provides NVIC_SystemReset via CMSIS */
#endif

/* ---- mg_device_reset ---------------------------------------------------- */
void mg_device_reset(void) {
    NVIC_SystemReset();
    /* Never returns */
}

/* ---- OTA query stubs ---------------------------------------------------- */
int mg_ota_status(int firmware) {
    (void) firmware;
    return MG_OTA_UNAVAILABLE;
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
    return false;
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
