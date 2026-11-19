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

    /* Master Enable: onoff == 0 - кнопка отключена, никакая логика
     * (действия, MQTT-события) для этого ID не выполняется. */
    if (slot < 0 || slot >= NUMZBEE || ZigbeeConf[slot].onoff == 0) {
        return;
    }

    switch (event_type) {
    case 0: action_str = zbee_action_sclick(slot); press_type = "sclick press"; break;
    case 1: action_str = zbee_action_dclick(slot); press_type = "double press"; break;
    case 2: action_str = zbee_action_lpress(slot); press_type = "long press"; break;
    default: return;
    }

    if (action_str && action_str[0] && strcmp(action_str, "None") != 0) {
        uint16_t btn_id = (uint16_t)ZbeeIdFromIdx(slot);
        const char *event_name[] = {"[SINGLE CLICK]", "[DOUBLE CLICK]", "[LONG PRESS]"};
        LOG_SYSTEM("%s Zigbee Button %d: %s\r\n", event_name[event_type], btn_id, action_str);
        action_handler(btn_id, action_str, press_type);
        /* cmd в MQTT-очереди: 3=LONG_PRESS, 4=SINGLE_CLICK, 5=DOUBLE_CLICK
         * (см. main.c). event_type: 0=sclick -> 4, 1=dclick -> 5, 2=lpress -> 3 */
        uint8_t mqtt_cmd = (event_type == 2) ? 3 : (uint8_t)(4 + event_type);
        mqtt_queue_send_safe(mqtt_cmd, btn_id, (uint8_t)(1 + event_type), 0);
    }
}

/* Слово в конфиге могло быть усечено при сохранении: старые прошивки хранили
 * ZBEE_PT_LEGACY_LEN символов, текущая хранит имя целиком (до ZBEE_PT_LEN-1).
 * Только такие слова допускают сопоставление подстрокой. Полное имя любой
 * другой длины сравнивается целиком: payload, не нажатый при обучении
 * ("..._hold" у кнопки, обученной на "..._click"), не может совпасть с чужим
 * словом по общему фрагменту. */
static int vbtn_word_maybe_truncated(const char *w) {
    size_t n = strlen(w);
    return (ZBEE_PT_LEGACY_LEN > 0 && n == ZBEE_PT_LEGACY_LEN) ||
           n == (ZBEE_PT_LEN - 1);
}
/* ── Оценка совпадения payload с сохранённым словом ──
 * Больше — точнее. Приоритеты прежнего match_payload_word(): точное
 * совпадение, затем алиас, затем подстрока, затем JSON data.val/EP.
 * Число нужно, чтобы внутри одного слота выбрать лучшее событие
 * (single/double/long), а не первое попавшееся: payload "on_double" содержит
 * слово "on", поэтому старый порядок сначала запускал single. */
static int vbtn_word_quality(const char *payload, const char *aliased,
                             const char *w, int ep) {
    if (!payload || !w || w[0] == '\0') return 0;
    if (strcmp(payload, w) == 0) return 1000;
    if (aliased != NULL && strcmp(aliased, w) == 0) return 900;
    /* Подстрока: для JSON-payload как раньше, для простых имён только для
     * слов, которые могли быть усечены. */
    if (payload[0] == '{' || vbtn_word_maybe_truncated(w)) {
        if (strstr(payload, w) != NULL) return (int)strlen(w);
    }

    long v;
    if (json_find_val_path(payload, "data.val", &v)) {
        char numbuf[16];
        snprintf(numbuf, sizeof(numbuf), "%ld", v);
        if (strcmp(numbuf, w) == 0) return 500;

        char epbuf[16];
        snprintf(epbuf, sizeof(epbuf), "EP%d", ep);
        if (strcmp(epbuf, w) == 0) return 500;
    }
    return 0;
}

/* event: 0=single, 1=double, 2=long; -1 = ни одно слово не подошло.
 * quality получает оценку лучшего события (0, если ничего не подошло). */
static int vbtn_best_event(int slot, const char *payload,
                           const char *aliased, int *quality) {
    const ZigbeeVirtualPin *zb = &ZigbeeConf[slot];
    const char *words[3] = { zb->pt_single, zb->pt_double, zb->pt_long };
    int best_ev = -1;
    int best_q = 0;

    for (int k = 0; k < 3; k++) {
        int q = vbtn_word_quality(payload, aliased, words[k], zb->ep);
        if (q > best_q) {
            best_q = q;
            best_ev = k;
        }
    }
    if (quality) *quality = best_q;
    return best_ev;
}

/* Оценка слота под payload по ВСЕМ его словам: у кнопки это
 * single/double/long, у выключателя pt_single/on/off. 0 - слот не подходит. */
static int vbtn_slot_score(int slot, const char *payload, const char *aliased) {
    const ZigbeeVirtualPin *z = &ZigbeeConf[slot];
    const char *words[3];
    int best = 0;

    words[0] = z->pt_single;
    if (z->zbee_role == ZBEE_ROLE_SWITCH) {
        words[1] = z->switch_payload_on;
        words[2] = z->switch_payload_off;
    } else {
        words[1] = z->pt_double;
        words[2] = z->pt_long;
    }
    for (int k = 0; k < 3; k++) {
        int q = vbtn_word_quality(payload, aliased, words[k], z->ep);
        if (q > best) best = q;
    }
    return best;
}

/* ── Арбитраж между слотами одного устройства (кнопки и выключатели) ──
 * Один payload должен исполнить ровно один слот. Побеждает слот с лучшей
 * оценкой: точное совпадение, затем алиас, затем подстрока (только для
 * слов, которые могли быть усечены; из них побеждает более длинное слово).
 * Слот-владелец payload блокирует остальные, даже если он выключен
 * (Master Enable): выключенная кнопка не должна отдавать своё нажатие
 * соседней. При полной ничьей (одинаковые слова у двух включённых слотов,
 * обычно старый конфиг) срабатывает слот с меньшим индексом и пишется
 * предупреждение: устройство нужно переобучить.
 * Возвращает 1, если слот вправе выполнить payload. */
int zbee_trigger_owns_payload(int slot, const char *payload) {
    if (slot < 0 || slot >= NUMZBEE) return 1;

    /* Структурный JSON (сырые /data/-топики, data.val, EP) разбирается
     * прежним путём: там слоты различаются по ep/полю JSON, не по имени. */
    if (payload == NULL || payload[0] == '\0' || payload[0] == '{') return 1;

    const char *aliased = zbee_payload_find_alias(payload);
    int mine = vbtn_slot_score(slot, payload, aliased);
    if (mine == 0) return 1;

    for (int j = 0; j < NUMZBEE; j++) {
        if (j == slot) continue;
        const ZigbeeVirtualPin *o = &ZigbeeConf[j];
        if (o->zbee_role != ZBEE_ROLE_TRIGGER && o->zbee_role != ZBEE_ROLE_SWITCH) continue;
        if (o->vbtn_mode != VBTN_MODE_PASSTHROUGH) continue;
        if (strcmp(o->zbee_ieee, ZigbeeConf[slot].zbee_ieee) != 0) continue;

        int s = vbtn_slot_score(j, payload, aliased);
        if (s > mine) return 0;
        if (s == mine && o->onoff != 0 && j < slot) {
            LOG_Z2M("zbee: AMBIGUOUS payload '%s': id=%d and id=%d share one trigger word, relearn the remote\r\n",
                    payload, ZbeeIdFromIdx(slot), ZbeeIdFromIdx(j));
            return 0;
        }
    }
    return 1;
}

/* Сопоставление payload со словами выключателя (PASSTHROUGH).
 * Возвращает 1, если payload относится к этому слоту; *is_off = 1, если это
 * слово выключения (switch_payload_off). Совпадение идёт тем же матчером, что
 * у кнопок: точное имя, алиас, подстрока только для усечённых слов. */
int zbee_switch_match(int slot, const char *payload, int *is_off) {
    if (slot < 0 || slot >= NUMZBEE || payload == NULL) return 0;
    const ZigbeeVirtualPin *z = &ZigbeeConf[slot];
    const char *aliased = zbee_payload_find_alias(payload);

    int q_off = vbtn_word_quality(payload, aliased, z->switch_payload_off, z->ep);
    int q_on  = vbtn_word_quality(payload, aliased, z->switch_payload_on,  z->ep);
    int q_pt  = vbtn_word_quality(payload, aliased, z->pt_single,          z->ep);
    if (q_pt > q_on) q_on = q_pt;

    if (q_off == 0 && q_on == 0) return 0;
    if (is_off) *is_off = (q_off > 0 && q_off >= q_on);
    return 1;
}

/* ── PASSTHROUGH mode: match payload to configured words ──
 * Returns 1 if the payload belongs to this slot (an action was dispatched),
 * 0 if the slot has nothing configured for it. */
static int vbtn_execute_payload(int slot, const char *payload) {
    const char *aliased = zbee_payload_find_alias(payload);
    int ev = vbtn_best_event(slot, payload, aliased, NULL);
    if (ev < 0) return 0;
    vbtn_execute(slot, ev);
    return 1;
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  zbee_vbtn_tick() — called every ~5ms from InputTask (timing is ms-based, period-independent)
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
 *  Returns 1 if the payload belongs to this slot, 0 otherwise.
 * ═══════════════════════════════════════════════════════════════════════════ */
int zbee_vbtn_mqtt_event(int slot, const char *payload) {
    if (slot < 0 || slot >= NUMZBEE) return 0;
    ZigbeeVirtualPin *zb = &ZigbeeConf[slot];

    // Обрабатываем только Zigbee-устройства с ролью триггера (кнопки)
    if (zb->zbee_role != ZBEE_ROLE_TRIGGER) return 0;

    /* Миграция уже сохранённой настройки: ветка обучения "trigger_count > 3"
     * писала каждому слоту свой payload (on/off/...) в pt_single, но затем
     * вызывала zbee_vbtn_auto_detect() и переводила слот в RAW. В RAW один
     * слот не может различить несколько кнопок. Настоящая RAW-ветка обучения
     * (<= 3 триггеров) pt_single не заполняет, поэтому реальные RAW-пульты
     * здесь не затрагиваются. */
    if (zb->vbtn_mode == VBTN_MODE_RAW && zb->pt_single[0] != '\0') {
        zb->vbtn_mode = VBTN_MODE_PASSTHROUGH;
        zb->vbtn_state = VBTN_STATE_IDLE;
        zb->vbtn_level = 0;
        LOG_Z2M("zbee: slot=%d RAW->PASSTHROUGH (pt_single='%s')\r\n",
                slot, zb->pt_single);
    }

    if (zb->vbtn_mode == VBTN_MODE_RAW) {
        // 1. Извлекаем уровень (1-нажато, 0-отпущено) из payload [2]
        int level = click_state_from_payload(payload);
        if (level == -1) return 0; // Игнорируем payload, не подходящий для RAW-режима

        uint8_t new_level = (uint8_t)level;
        uint8_t old_level = zb->vbtn_level;
        uint32_t now = HAL_GetTick();

        // 2. Проверяем факт изменения уровня сигнала [1]
        if (new_level != old_level) {
            zb->vbtn_level = new_level;
            zb->vbtn_last_tick = now;

            // 3. Логика переходов конечного автомата [3]
            if (zb->vbtn_state == VBTN_STATE_IDLE) {
                // Стартуем автомат при первом нажатии (переход из IDLE в 1)
                if (new_level == 1) {
                    zb->vbtn_state = VBTN_STATE_PRESSED;
                    zb->vbtn_state_tick = now;   // время входа в состояние
                }
            }
            else if (zb->vbtn_state == VBTN_STATE_WAIT_REPEAT) {
                // Если мы ждем повторного клика (300мс) и пришло новое нажатие (1)
                // Теперь эта ветка достижима, что позволяет детектировать DOUBLE_CLICK [1]
                if (new_level == 1) {
                    zb->vbtn_state = VBTN_STATE_RE_PRESSED;
                    zb->vbtn_state_tick = now;   // время входа в состояние
                }
            }
            // Остальные переходы (отпускание, таймауты) обрабатываются в zbee_vbtn_tick()
            return 1;
        }
        return 0;
    } else {
        // Режим PASSTHROUGH: сопоставление строковых команд (pt_single/double/long) [4]
        if (!zbee_trigger_owns_payload(slot, payload)) return 0;
        return vbtn_execute_payload(slot, payload);
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
