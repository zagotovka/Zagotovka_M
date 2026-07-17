#include "dtcm_alloc.h"
#include <string.h>
#include <stdio.h>

extern uint8_t _sdtcm_pool[];
extern uint8_t _edtcm_pool[];

static uint8_t  *dtcm_next       = NULL;
static uint32_t  dtcm_fail_count = 0;

/* DTCM buffers */
uint8_t *dtcm_zbee_body     = NULL;
uint8_t *dtcm_zbee_raw      = NULL;
uint8_t *dtcm_sensor_batch  = NULL;
uint8_t *dtcm_timer_batch   = NULL;
uint8_t *dtcm_decoded       = NULL;
uint8_t *dtcm_settings_a    = NULL;
uint8_t *dtcm_settings_b    = NULL;
uint8_t *dtcm_settings_c    = NULL;
uint8_t *dtcm_gsm_rx        = NULL;
uint8_t *dtcm_gsm_dtmf      = NULL;
uint8_t *dtcm_gsm_vldpins   = NULL;
uint8_t *dtcm_gsm_invpins   = NULL;
uint8_t *dtcm_gsm_buf       = NULL;
uint8_t *dtcm_gsm_str2      = NULL;
uint8_t *dtcm_tls_cert      = NULL;
uint8_t *dtcm_tls_key       = NULL;
uint8_t *dtcm_cache_tls_ca  = NULL;
uint8_t *dtcm_cache_domain  = NULL;
uint8_t *dtcm_cache_tg_token = NULL;
uint8_t *dtcm_dbg_rx        = NULL;

void dtcm_alloc_init(void)
{
    dtcm_next       = _sdtcm_pool;
    dtcm_fail_count = 0;

    /* Выделяем все DTCM buffers одним блоком при старте */
    dtcm_zbee_body     = dtcm_malloc(DTCM_BUF_ZBEE_BODY);
    dtcm_zbee_raw      = dtcm_malloc(DTCM_BUF_ZBEE_RAW);
    dtcm_sensor_batch  = dtcm_malloc(DTCM_BUF_SENSOR_BATCH);
    dtcm_timer_batch   = dtcm_malloc(DTCM_BUF_TIMER_BATCH);
    dtcm_decoded       = dtcm_malloc(DTCM_BUF_DECODED);
    dtcm_settings_a    = dtcm_malloc(DTCM_BUF_SETTINGS_A);
    dtcm_settings_b    = dtcm_malloc(DTCM_BUF_SETTINGS_B);
    dtcm_settings_c    = dtcm_malloc(DTCM_BUF_SETTINGS_C);
    dtcm_gsm_rx        = dtcm_malloc(DTCM_BUF_GSM_RX);
    dtcm_gsm_dtmf      = dtcm_malloc(DTCM_BUF_GSM_DTMF);
    dtcm_gsm_vldpins   = dtcm_malloc(DTCM_BUF_GSM_VLDPINS);
    dtcm_gsm_invpins   = dtcm_malloc(DTCM_BUF_GSM_INVPINS);
    dtcm_gsm_buf       = dtcm_malloc(DTCM_BUF_GSM_BUF);
    dtcm_gsm_str2      = dtcm_malloc(DTCM_BUF_GSM_STR2);
    dtcm_tls_cert      = dtcm_malloc(DTCM_BUF_TLS_CERT);
    dtcm_tls_key       = dtcm_malloc(DTCM_BUF_TLS_KEY);
    dtcm_cache_tls_ca  = dtcm_malloc(DTCM_BUF_CACHE_TLS_CA);
    dtcm_cache_domain  = dtcm_malloc(DTCM_BUF_CACHE_DOMAIN);
    dtcm_cache_tg_token = dtcm_malloc(DTCM_BUF_CACHE_TG_TOKEN);
    dtcm_dbg_rx        = dtcm_malloc(DTCM_BUF_DBG_RX);

    /* Проверяем что всё выделилось */
    if (!dtcm_zbee_body || !dtcm_zbee_raw || !dtcm_sensor_batch ||
        !dtcm_timer_batch || !dtcm_decoded ||
        !dtcm_settings_a || !dtcm_settings_b || !dtcm_settings_c ||
        !dtcm_gsm_rx || !dtcm_gsm_dtmf || !dtcm_gsm_vldpins ||
        !dtcm_gsm_invpins || !dtcm_gsm_buf || !dtcm_gsm_str2 ||
        !dtcm_tls_cert || !dtcm_tls_key || !dtcm_dbg_rx ||
        !dtcm_cache_tls_ca || !dtcm_cache_domain || !dtcm_cache_tg_token) {
        printf("[DTCM] FATAL: buffer allocation failed! used=%u free=%u\r\n",
               (unsigned)dtcm_alloc_get_used(), (unsigned)dtcm_alloc_get_free());
    }
}

void *dtcm_malloc(size_t size)
{
    size = (size + 7) & ~(size_t)7; // выравнивание по 8 байт

    if (dtcm_next == NULL || dtcm_next + size > _edtcm_pool) {
        dtcm_fail_count++;
        return NULL;
    }

    void *p = dtcm_next;
    dtcm_next += size;
    return p;
}

size_t dtcm_alloc_get_used(void)
{
    return (size_t)(dtcm_next - _sdtcm_pool);
}

size_t dtcm_alloc_get_free(void)
{
    return (size_t)(_edtcm_pool - dtcm_next);
}

size_t dtcm_alloc_get_total(void)
{
    return (size_t)(_edtcm_pool - _sdtcm_pool);
}

uint32_t dtcm_alloc_get_fail_count(void)
{
    return dtcm_fail_count;
}
