/**
 * @file compat_ota.h
 * @brief Compatibility shim for Mongoose OTA/Flash API removed in 7.21
 *
 * Mongoose 7.13 provided mg_ota_*, mg_flash_*, mg_device_reset() functions.
 * In 7.21 these were removed. This header provides stub implementations
 * so that existing application code (net.c handlers) compiles and runs.
 *
 * OTA firmware upload is stubbed with HTTP 501 responses.
 * mg_device_reset() maps to NVIC_SystemReset().
 */
#pragma once

#include "mongoose.h"
#include <stdint.h>
#include <stddef.h>
#include <stdbool.h>

#ifdef __cplusplus
extern "C" {
#endif

/* ---- mg_device_reset ---------------------------------------------------- */
/* In 7.13 this was provided by mongoose.  Now we implement it ourselves.    */
void mg_device_reset(void);

/* ---- OTA status constants ----------------------------------------------- */
#ifndef MG_FIRMWARE_CURRENT
#define MG_FIRMWARE_CURRENT  0
#endif
#ifndef MG_FIRMWARE_PREVIOUS
#define MG_FIRMWARE_PREVIOUS 1
#endif

/* OTA status codes (compatible with 7.13) */
#define MG_OTA_UNAVAILABLE 0
#define MG_OTA_FIRST_BOOT  1
#define MG_OTA_UNCOMMITTED 2
#define MG_OTA_COMMITTED   3

/* ---- OTA query stubs ---------------------------------------------------- */
int      mg_ota_status(int firmware);
uint32_t mg_ota_crc32(int firmware);
uint32_t mg_ota_timestamp(int firmware);
size_t   mg_ota_size(int firmware);

bool mg_ota_commit(void);
bool mg_ota_rollback(void);

/* ---- Flash stubs -------------------------------------------------------- */
void  *mg_flash_start(void);
size_t mg_flash_size(void);
size_t mg_flash_sector_size(void);
size_t mg_flash_write_align(void);
int    mg_flash_bank(void);

bool mg_flash_write(void *addr, const void *buf, size_t len);
bool mg_flash_erase(void *sector);
bool mg_flash_swap_bank(void);

bool mg_flash_load(void *sector, uint32_t key, void *buf, size_t len);
bool mg_flash_save(void *sector, uint32_t key, const void *buf, size_t len);

#ifdef __cplusplus
}
#endif
