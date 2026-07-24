/*
 * zbee_vbtn.c — Universal virtual button state machine for Zigbee triggers
 *
 * Two modes:
 *   RAW         — controller counts clicks itself (press/release from dumb remotes)
 *   PASSTHROUGH — smart remote sends specific words, controller matches them
 *
 DTCM pool в проекте Zagotovka_M:
 ┌───────────────────────────────┬───────────────────────────────────────┐
 │Параметр                       │Значение                               │
 ├───────────────────────────────┼───────────────────────────────────────┤
 │Начало (_sdtcm_pool)           │0x20000EA0                             │
 ├───────────────────────────────┼───────────────────────────────────────┤
 │Конец (_edtcm_pool)            │0x2001FFF8                             │
 ├───────────────────────────────┼───────────────────────────────────────┤
 │Размер                         │127 320 байт (~124.3 КБ)               │
 └───────────────────────────────┴───────────────────────────────────────┘

 Определено в линковщике STM32F767ZITX_FLASH.ld:171-178:
 - Начало — динамическое, вычисляется линковщиком после .edata + _Min_Heap_Size + _Min_Stack_Size (сейчас 0x0 + 0x800), выровненное по 8
 - Конец — фиксированный 0x20020000 - 8 (перед секцией .ethernet_dma)

 Это first-fit bump-allocator (dtcm_alloc.c), память выделяется только вперёд, без free.
 *
 *
 */

#include "db.h"
#include "zagotovka.h"
#include "logger.h"
#include <string.h>
#include <stdio.h>

extern ZigbeeVirtualPin ZigbeeConf[NUMZBEE];

/* ── Helper: extract integer value at a dotted JSON path, e.g. "data.val" ──
 * Walks the path segment by segment with strstr, so it does NOT build a
 * real tree — but this guards against name collisions between sibling
 * objects (e.g. {"data":{"val":1},"battery":{"val":87}}).
 * Deliberately no support for arrays or escaped quotes inside strings. */
static int json_find_val_path(const char *payload, const char *path, long *out) {
    char key_buf[32];
    const char *p = payload;
    const char *seg = path;

    while (seg && *seg) {
        const char *dot = strchr(seg, '.');
        size_t len = dot ? (size_t)(dot - seg) : strlen(seg);
        if (len == 0 || len >= sizeof(key_buf) - 3) return 0;

        snprintf(key_buf, sizeof(key_buf), "\"%.*s\":", (int)len, seg);
        p = strstr(p, key_buf);
        if (!p) return 0;
        p += strlen(key_buf);

        seg = dot ? dot + 1 : NULL;
    }

    while (*p == ' ') p++;
    if (*p == '"') p++;
    char *end;
    long v = strtol(p, &end, 10);
    if (end == p) return 0;
    *out = v;
    return 1;
}

/* ── Helper: normalize a payload to a click state ──
 *   1  = press/on
 *   0  = release/off
 *  -1  = not a recognized raw click state (PASSTHROUGH candidate) */
static int click_state_from_payload(const char *payload) {
    if (!payload || payload[0] == '\0') return -1;

    if (strcmp(payload, "press") == 0 || strcmp(payload, "on") == 0) return 1;
    if (strcmp(payload, "release") == 0 || strcmp(payload, "off") == 0) return 0;

    long v;
    if (json_find_val_path(payload, "data.val", &v)) {
        if (v == 1) return 1;
        if (v == 0) return 0;
    }

    return -1;
}

/* ── Helper: check if payload is a raw press/release event (any form) ── */
int is_raw_payload(const char *payload) {
    return click_state_from_payload(payload) != -1;
}

/* ── Execute button action (event_type: 0=sclick, 1=dclick, 2=lpress) ── */
void vbtn_execute(int slot, int event_type) {
    const char *action_str = NULL;
    const char *press_type = NULL;

    switch (event_type) {
    case 0: action_str = zbee_action_sclick(slot); press_type = "sclick press"; break;
    case 1: action_str = zbee_action_dclick(slot); press_type = "double press"; break;
    case 2: action_str = zbee_action_lpress(slot); press_type = "long press"; break;
    default: return;
    }

    if (action_str && action_str[0] && strcmp(action_str, "None") != 0) {
        uint8_t btn_id = (uint8_t)(NUMPIN + slot);
        printf("[VBTN] slot=%d event=%d action='%s'\r\n", slot, event_type, action_str);
        action_handler(btn_id, action_str, press_type);
        mqtt_queue_send_safe((uint8_t)(3 + event_type), btn_id, (uint8_t)(1 + event_type), 0);
    }
}

/* ── PASSTHROUGH mode: universal payload matcher ── */
static int match_payload_word(const char *payload, const char *target_word, int ep) {
    if (!payload || !target_word || target_word[0] == '\0') return 0;

    /* 1. Прямое полное совпадение */
    if (strcmp(payload, target_word) == 0) return 1;

    /* 2. Подстрока (слово внутри JSON/строки) */
    if (strstr(payload, target_word) != NULL) return 1;

    /* 3. Обобщенное сопоставление JSON data.val с pt_single ("1", "EP1", "EP5" и т.д.) */
    long v;
    if (json_find_val_path(payload, "data.val", &v)) {
        char numbuf[16];
        snprintf(numbuf, sizeof(numbuf), "%ld", v);
        if (strcmp(numbuf, target_word) == 0) return 1;

        char epbuf[16];
        snprintf(epbuf, sizeof(epbuf), "EP%d", ep);
        if (strcmp(epbuf, target_word) == 0 && v != 0) return 1;
    }

    return 0;
}

/* ── PASSTHROUGH mode: match payload to configured words ── */
static void vbtn_execute_payload(int slot, const char *payload) {
    int ep = ZigbeeConf[slot].ep;
    if (match_payload_word(payload, ZigbeeConf[slot].pt_single, ep)) {
        vbtn_execute(slot, 0);
    } else if (ZigbeeConf[slot].pt_double[0] &&
               match_payload_word(payload, ZigbeeConf[slot].pt_double, ep)) {
        vbtn_execute(slot, 1);
    } else if (ZigbeeConf[slot].pt_long[0] &&
               match_payload_word(payload, ZigbeeConf[slot].pt_long, ep)) {
        vbtn_execute(slot, 2);
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  zbee_vbtn_tick() — called every ~10ms from InputTask
 * ═══════════════════════════════════════════════════════════════════════════ */
void zbee_vbtn_tick(void) {
    uint32_t now = HAL_GetTick();

    for (int i = 0; i < NUMZBEE; i++) {
        ZigbeeVirtualPin *zb = &ZigbeeConf[i];

        if (zb->zbee_role != ZBEE_ROLE_TRIGGER) continue;
        if (zb->vbtn_mode != VBTN_MODE_RAW) continue;
        if (zb->zbee_ieee[0] == '\0') continue;

        /* Импульсный авто-сброс нажатого состояния (для устройств без явного release) */
        if (zb->vbtn_level == 1 && zb->vbtn_auto_release) {
            if (now - zb->vbtn_state_tick >= 50) {
                zb->vbtn_level = 0;
                zb->vbtn_auto_release = 0;
            }
        }

        uint32_t elapsed = now - zb->vbtn_state_tick;

        switch (zb->vbtn_state) {
        case VBTN_STATE_IDLE:
            break;

        case VBTN_STATE_PRESSED:
            if (zb->vbtn_level == 0) {
                if (elapsed < VBTN_DEBOUNCE_MS) {
                    zb->vbtn_state = VBTN_STATE_IDLE;
                } else {
                    zb->vbtn_repeat = 1;
                    zb->vbtn_state = VBTN_STATE_WAIT_REPEAT;
                    zb->vbtn_state_tick = now;
                }
            } else if (elapsed >= VBTN_LONG_MS) {
                vbtn_execute(i, 2);
                zb->vbtn_state = VBTN_STATE_LONG_HOLD;
                zb->vbtn_state_tick = now;
            }
            if (elapsed >= VBTN_WATCHDOG_MS) {
                printf("[VBTN] watchdog release slot=%d\r\n", i);
                zb->vbtn_level = 0;
                zb->vbtn_state = VBTN_STATE_IDLE;
            }
            break;

        case VBTN_STATE_WAIT_REPEAT:
            if (zb->vbtn_level == 1) {
                if (elapsed < VBTN_DOUBLE_MS) {
                    zb->vbtn_repeat = 2;
                    zb->vbtn_state = VBTN_STATE_RE_PRESSED;
                    zb->vbtn_state_tick = now;
                } else {
                    vbtn_execute(i, 0);
                    zb->vbtn_state = VBTN_STATE_IDLE;
                }
            } else {
                if (elapsed >= VBTN_DOUBLE_MS) {
                    vbtn_execute(i, 0);
                    zb->vbtn_state = VBTN_STATE_IDLE;
                }
            }
            break;

        case VBTN_STATE_RE_PRESSED:
            if (zb->vbtn_level == 0) {
                if (elapsed < VBTN_DEBOUNCE_MS) {
                    zb->vbtn_state = VBTN_STATE_IDLE;
                } else {
                    vbtn_execute(i, 1);
                    zb->vbtn_state = VBTN_STATE_IDLE;
                }
            }
            if (elapsed >= VBTN_WATCHDOG_MS) {
                printf("[VBTN] watchdog release slot=%d\r\n", i);
                zb->vbtn_level = 0;
                zb->vbtn_state = VBTN_STATE_IDLE;
            }
            break;

        case VBTN_STATE_LONG_HOLD:
            if (zb->vbtn_level == 0) {
                zb->vbtn_state = VBTN_STATE_IDLE;
            }
            break;
        }
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  zbee_vbtn_mqtt_event() — called when MQTT message arrives
 * ═══════════════════════════════════════════════════════════════════════════ */
void zbee_vbtn_mqtt_event(int slot, const char *payload) {
    if (slot < 0 || slot >= NUMZBEE) return;
    ZigbeeVirtualPin *zb = &ZigbeeConf[slot];

    if (zb->zbee_role != ZBEE_ROLE_TRIGGER) return;

    if (zb->vbtn_mode == VBTN_MODE_RAW) {
        uint8_t old_level = zb->vbtn_level;
        uint32_t now = HAL_GetTick();

        int click_state = click_state_from_payload(payload);

        zb->vbtn_last_tick = now;

        /* Универсальная кнопка: любой payload (val:0 ИЛИ val:1) = нажатие */
        if (zb->vbtn_state == VBTN_STATE_IDLE &&
            (click_state == 0 || click_state == 1)) {
            zb->vbtn_level = 1;
            zb->vbtn_state = VBTN_STATE_PRESSED;
            zb->vbtn_state_tick = now;
            zb->vbtn_auto_release = 1;
        } else if (zb->vbtn_level != old_level) {
            if (zb->vbtn_level == 1 && zb->vbtn_state == VBTN_STATE_IDLE) {
                zb->vbtn_state = VBTN_STATE_PRESSED;
                zb->vbtn_state_tick = now;
            }
            if (zb->vbtn_level == 1 && old_level == 0) {
                zb->vbtn_auto_release = 1;
            }
        }
    } else {
        vbtn_execute_payload(slot, payload);
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  zbee_vbtn_auto_detect() — auto-detect mode from first observed payload
 * ═══════════════════════════════════════════════════════════════════════════ */
void zbee_vbtn_auto_detect(int slot, const char *first_payload) {
    if (slot < 0 || slot >= NUMZBEE) return;
    ZigbeeVirtualPin *zb = &ZigbeeConf[slot];

    if (is_raw_payload(first_payload)) {
        zb->vbtn_mode = VBTN_MODE_RAW;
        printf("[VBTN] slot=%d mode=RAW (payload='%s')\r\n", slot, first_payload);
    } else {
        zb->vbtn_mode = VBTN_MODE_PASSTHROUGH;
        strncpy(zb->pt_single, first_payload, sizeof(zb->pt_single) - 1);
        zb->pt_single[sizeof(zb->pt_single) - 1] = '\0';
        printf("[VBTN] slot=%d mode=PASSTHROUGH pt_single='%s'\r\n",
               slot, first_payload);
    }
}
