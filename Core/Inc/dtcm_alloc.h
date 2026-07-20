#ifndef DTCM_ALLOC_H
#define DTCM_ALLOC_H

#include <stddef.h>
#include <stdint.h>
#include <stdbool.h>
#include "db.h"
#include "lwdtc.h"

extern uint8_t _sdtcm_pool[];

void   dtcm_alloc_init(void);
void  *dtcm_malloc(size_t size);

size_t dtcm_alloc_get_used(void);
size_t dtcm_alloc_get_free(void);
size_t dtcm_alloc_get_total(void);
uint32_t dtcm_alloc_get_fail_count(void);

/* DTCM buffers — выделяются один раз в dtcm_alloc_init() */

/* zagotovka.c */
#define DTCM_BUF_ZBEE_BODY      4096
#define DTCM_BUF_ZBEE_RAW       2048
#define DTCM_BUF_SENSOR_BATCH   4096
#define DTCM_BUF_TIMER_BATCH    4256
#define DTCM_BUF_DECODED        1024

/* setings.c */
#define DTCM_BUF_SETTINGS_A     1536
#define DTCM_BUF_SETTINGS_B     1536
#define DTCM_BUF_SETTINGS_C     1024

/* gsm.c */
#define DTCM_BUF_GSM_RX         512
#define DTCM_BUF_GSM_DTMF       512
#define DTCM_BUF_GSM_VLDPINS    240
#define DTCM_BUF_GSM_INVPINS    256
#define DTCM_BUF_GSM_BUF        512
#define DTCM_BUF_GSM_STR2       512

/* net.c */
#define DTCM_BUF_TLS_CERT      1024
#define DTCM_BUF_TLS_KEY        512

/* zagotovka.c cache */
#define DTCM_BUF_CACHE_TLS_CA   512
#define DTCM_BUF_CACHE_DOMAIN   128
#define DTCM_BUF_CACHE_TG_TOKEN 256

/* usart_ring.c */
#define DTCM_BUF_DBG_RX          64

extern uint8_t *dtcm_zbee_body;
extern uint8_t *dtcm_zbee_raw;
extern uint8_t *dtcm_sensor_batch;
extern uint8_t *dtcm_timer_batch;
extern uint8_t *dtcm_decoded;
extern uint8_t *dtcm_settings_a;
extern uint8_t *dtcm_settings_b;
extern uint8_t *dtcm_settings_c;
extern uint8_t *dtcm_gsm_rx;
extern uint8_t *dtcm_gsm_dtmf;
extern uint8_t *dtcm_gsm_vldpins;
extern uint8_t *dtcm_gsm_invpins;
extern uint8_t *dtcm_gsm_buf;
extern uint8_t *dtcm_gsm_str2;
extern uint8_t *dtcm_tls_cert;
extern uint8_t *dtcm_tls_key;
extern uint8_t *dtcm_cache_tls_ca;
extern uint8_t *dtcm_cache_domain;
extern uint8_t *dtcm_cache_tg_token;
extern uint8_t *dtcm_dbg_rx;

/* ── BSS → DTCM: безопасные переносы ── */
/* main.c */
typedef struct {
    bool     active;
    float    current_duty;
    float    delta;
    uint32_t steps_left;
    int      end_duty;
    int      cronindex;
    uint8_t  saved_pid_duty;
} FadeState_t;

extern dbPidConf           *dtcm_pid_conf;
extern uint32_t            *dtcm_sec_deb_tm;
extern uint32_t            *dtcm_sec_lasttrg;
extern FadeState_t         *dtcm_fade_state;
extern lwdtc_cron_ctx_t    *dtcm_cron_ctxs;

/* zagotovka.c */
extern int                  *dtcm_prev_pwm_dvalue;
extern uint8_t              *dtcm_prev_gpio;
extern int16_t              *dtcm_prev_duty;
extern uint32_t             *dtcm_zbee_last_cmd_tick;

#endif // DTCM_ALLOC_H
