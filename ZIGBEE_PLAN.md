# ПЛАН ИНТЕГРАЦИИ ZIGBEE MQTT В PROJECT ZAGOTOVKA-M (v5)

> **v5**: `zbee_find_pin_by_topic()` обёрнут в `taskENTER_CRITICAL()`,
> убран `__attribute__((packed))` из `ZbeeCmdMsg_t`,
> добавлено определение `zbeeCmd_attributes`,
> `extern PinsConf` вынесен на уровень файла в `net.c`,
> добавлена валидация ввода `zbee_topic`/`zbee_key` (защита от JSON-инъекций),
> задокументировано ограничение MVP: подписка только при (ре)коннекте к брокеру.
>
> **v4**: Исправлен баг OFF-детекта (mg_json_get возвращает токен с кавычками),
> throttle стал честно per-topic (массив `s_zbee_last_cmd_tick[NUMPIN]`),
> `taskENTER_CRITICAL()` на записи в PinsConf И на throttle-счётчиках,
> удалены мёртвые черновики.

---

## Контекст

Проект Zagotovka-M — STM32F767 + FreeRTOS, Mongoose networking, USB-flash (FatFs),
Preact+htm фронтенд. Уже работает: MQTT к брокеру `192.168.1.100:1883`, подписка
на `Zagotovka/#`, очередь `mqttRxQueueHandle` (4 элемента, `MqttRxMsg_t` =
`topic[64]` + `payload[256]`), обработчик `mqtt_message_handler()` в `zagotovka.c:3381`.

**Архитектура MQTT TX**:
```
StartInputTask / StartSIM800LTask / StartSecurityTask / StartConfigTask
        |
        | mqtt_queue_send_safe()   ←唯一 choke-point, rate-limit 20/sec
        v
  mqttQueueHandle  (32-slot, MqttMessage_t = 4 байта)
        |
        | xQueueReceive (non-blocking)
        v
StartWebServerTask  →  send_mqtt_message()  →  mg_mqtt_pub(s_conn)
```

Все `mg_mqtt_pub()` serialized через **одну задачу** (`StartWebServerTask`).
Другие задачи **никогда** не вызывают `mg_mqtt_pub()` напрямую.

**Защита `PinsConf`**: При чтении из HTTP-обработчиков используется
`taskENTER_CRITICAL()` для атомарного снапшота (zagotovka.c:313).
При записи — аналогично, если запись происходит из обработчика, не совпадающего
с читателем.

---

## ЧАСТЬ 1: БЭКЕНД (C-код STM32)

### Шаг 1. Эмпирический тест подписки — хардкод на `zigbee2mqtt/Kuhnya`

**Цель**: Пакеты от лампы IKEA долетают до STM32, тайминги `mg_mgr_poll` не ломаются.

#### 1.1. Подписка

**`net.c` — `fn_mqtt()`, `MG_EV_MQTT_OPEN` (~строка 1098)**:

```c
// === ZIGBEE TEST (временно, удаляется на Шаге 3) ===
struct mg_mqtt_opts zbee_sub;
memset(&zbee_sub, 0, sizeof(zbee_sub));
zbee_sub.topic = mg_str("zigbee2mqtt/Kuhnya");
zbee_sub.qos = s_qos;
mg_mqtt_sub(c, &zbee_sub);
printf("[MQTT] SUBSCRIBED to zigbee2mqtt/Kuhnya (test)\r\n");
```

#### 1.2. Приём и вывод в лог

**`net.c` — `fn_mqtt()`, `MG_EV_MQTT_MSG` (~строка 1123)**:

```c
if (mm->topic.len >= 12 && strncmp(mm->topic.buf, "zigbee2mqtt/", 12) == 0) {
    printf("[Z2M] topic='%.*s' payload='%.*s'\r\n",
           (int)mm->topic.len, mm->topic.buf,
           (int)mm->data.len, mm->data.buf);
    MqttRxMsg_t rx = {0};
    size_t tlen = mm->topic.len < sizeof(rx.topic) - 1
                ? mm->topic.len : sizeof(rx.topic) - 1;
    size_t dlen = mm->data.len  < sizeof(rx.payload) - 1
                ? mm->data.len  : sizeof(rx.payload) - 1;
    memcpy(rx.topic,   mm->topic.buf, tlen);
    memcpy(rx.payload, mm->data.buf,  dlen);
    if (xQueueSend(mqttRxQueueHandle, &rx, 0) != pdPASS) {
        printf("[Z2M] RX queue full!\r\n");
    }
}
```

#### 1.3. Обработка в WebServerTask (ВРЕМЕННАЯ правка)

**`main.c` — обработчик очереди (~строка 1732)**:

```c
while (xQueueReceive(mqttRxQueueHandle, &rx, 0) == pdPASS) {
    // === ZIGBEE TEST (временно, УДАЛЯЕТСЯ на Шаге 4) ===
    if (strncmp(rx.topic, "zigbee2mqtt/", 12) == 0) {
        printf("[Z2M] topic='%s' payload='%s'\r\n", rx.topic, rx.payload);
        continue;
    }
    mqtt_message_handler(rx.topic, rx.payload);
}
```

**⚠️ ВАЖНО**: Эта правка в `main.c` — временная. На Шаге 4 она **удаляется**,
обработка переходит в `mqtt_zigbee_handler()` внутри `mqtt_message_handler()`.

---

### Шаг 2. Расширение структуры `dbPinsConf` — `topin = 11`

#### 2.1. Структура

**`db.h` — `struct dbPinsConf`** (добавить В КОНЕЦ, после `lasttrg`, ~строка 65):

```c
struct dbPinsConf {
    // ... все существующие поля ...
    uint32_t lasttrg;   // Last trigger time
    // === ZIGBEE ===
    char zbee_topic[48];   // MQTT-топик, 47 + '\0'
    char zbee_key[24];     // JSON-ключ, 23 + '\0'
};
```

**`db.h` — комментарий к `topin` (строка 36)**:
```c
// Type of pins: NONE-0; BUTTON-1; DEVICE-2; SWITCH-3; ONEWIRE-4; PWM-5; I2C-6,7; Encoder-8,9; SECURITY-10; ZIGBEE-11;
```

#### 2.2. Чтение с USB

**`setings.c` — `GetPinConfig()`** (добавить в цепочку `else if`, после ~строки 947):

```c
else if (strcmp(key, "zbee_topic") == 0) {
    strncpy(PinsConf[currentPin].zbee_topic, value,
            sizeof(PinsConf[currentPin].zbee_topic) - 1);
    zbee_sanitize_str(PinsConf[currentPin].zbee_topic,
                      sizeof(PinsConf[currentPin].zbee_topic));
}
else if (strcmp(key, "zbee_key") == 0) {
    strncpy(PinsConf[currentPin].zbee_key, value,
            sizeof(PinsConf[currentPin].zbee_key) - 1);
    zbee_sanitize_str(PinsConf[currentPin].zbee_key,
                      sizeof(PinsConf[currentPin].zbee_key));
}
```

Парсер `key[32]` / `value[64]` — влезает.

#### 2.2a. Валидация ввода (защита от JSON-инъекций)

**`setings.c`** — вспомогательная функция (перед `GetPinConfig()`):

```c
// Удаляет символы, опасные для JSON: " \ и управляющие (< 0x20).
// Допускаются: буквы, цифры, / _ - . пробел
static void zbee_sanitize_str(char *s, size_t max_len) {
    for (size_t i = 0; i < max_len && s[i] != '\0'; i++) {
        unsigned char ch = (unsigned char)s[i];
        if (ch == '"' || ch == '\\' || ch < 0x20) {
            s[i] = '_';
        }
    }
}
```

> **⚠️ ЗАЧЕМ**: `handle_select_get()` вставляет `zbee_topic`/`zbee_key` в JSON
> через `mg_http_printf_chunk(... "%s" ...)` без экранирования. Если пользователь
> введёт `"` или `\` — JSON сломается. Валидация на входе (при чтении с USB)
> дешевле и надёжнее, чем экранирование на каждом HTTP-ответе.

#### 2.3. Запись на USB

**`setings.c` — `SetPinConfig()`** (после записи `send_sms`, ~строка 1230):

```c
snprintf(buffer, sizeof(buffer), ",\"zbee_topic\":\"%s\"", PinsConf[i].zbee_topic);
f_write(&USBHFile, buffer, strlen(buffer), &Byteswritten);
snprintf(buffer, sizeof(buffer), ",\"zbee_key\":\"%s\"", PinsConf[i].zbee_key);
f_write(&USBHFile, buffer, strlen(buffer), &Byteswritten);
```

#### 2.4. API-ответ

**`zagotovka.c` — `handle_select_get()` (строка 298)**:

```c
if (conf.topin == 11) {
    mg_http_printf_chunk(c, ",\"zbee_topic\":\"%s\",\"zbee_key\":\"%s\"",
        conf.zbee_topic, conf.zbee_key);
}
```

**Размер**: +72 байта/пин × 89 = 6408 байт (~1.2% RAM).

---

### Шаг 3. Динамическая подписка при старте из `PinsConf`

**`net.c` — `extern` на уровне файла (после прочих extern'ов, ~строка 30)**:

```c
extern struct dbPinsConf PinsConf[NUMPIN];
```

> Вынесено из тела функции на файловый уровень, рядом с существующими extern'ами —
> единообразие, видимость для других функций в `net.c`.

**`net.c` — `fn_mqtt()`, `MG_EV_MQTT_OPEN` (после строки ~1113)**:

```c
for (int i = 0; i < NUMPIN; i++) {
    if (PinsConf[i].topin == 11 && PinsConf[i].zbee_topic[0] != '\0') {
        struct mg_mqtt_opts zbee_sub;
        memset(&zbee_sub, 0, sizeof(zbee_sub));
        zbee_sub.topic = mg_str(PinsConf[i].zbee_topic);
        zbee_sub.qos = s_qos;
        mg_mqtt_sub(c, &zbee_sub);
        printf("[MQTT] SUBSCRIBED to '%s' (zigbee pin %d)\r\n",
               PinsConf[i].zbee_topic, i);
    }
}
```

**Удаляем хардкод** из Шага 1.1.

---

### Шаг 4. Парсинг JSON от шлюза и обновление state/dvalue

#### 4.1. Хук в `mqtt_message_handler()`

**`zagotovka.c` — `mqtt_message_handler()` (строка 3381)**:
В НАЧАЛО функции, ДО проверки на `SetSettings.rxmqttop`:

```c
if (strncmp(topic, "zigbee2mqtt/", 12) == 0) {
    mqtt_zigbee_handler(topic, payload);
    return;
}
```

#### 4.2. Удаление временной правки

В `main.c` (~строка 1732) — **УДАЛЯЕМ** блок фильтрации zigbee2mqtt/ из Шага 1.3.
Теперь сообщения проходят через `mqtt_message_handler()` → `mqtt_zigbee_handler()`.

#### 4.3. Нерасходящийся парсинг (исправленный OFF-детект)

**`zagotovka.c` — `mqtt_zigbee_handler()`**:

```c
static void mqtt_zigbee_handler(const char *topic, const char *payload) {
    struct mg_str body = mg_str_n(payload, strlen(payload));

    for (int i = 0; i < NUMPIN; i++) {
        if (PinsConf[i].topin != 11) continue;
        if (strcmp(PinsConf[i].zbee_topic, topic) != 0) continue;

        char key_path[32];
        snprintf(key_path, sizeof(key_path), "$.%s", PinsConf[i].zbee_key);

        // mg_json_get() — возвращает offset, НЕ аллоцирует память
        int toklen = 0;
        int offset = mg_json_get(body, key_path, &toklen);
        if (offset < 0) continue;

        // mg_json_get() возвращает JSON-токен ВКЛЮЧАЯ кавычки:
        // "ON"  → buf + offset, len = 4  (символы: " O N ")
        // "OFF" → buf + offset, len = 5  (символы: " O F F ")
        // Читаем raw-токен, потом отрезаем кавычки:
        const char *raw = payload + offset;
        int raw_len = toklen;

        // Отрезаем кавычки: если токен начинается и заканчивается на '"'
        if (raw_len >= 2 && raw[0] == '"' && raw[raw_len - 1] == '"') {
            raw++;      // пропускаем "
            raw_len -= 2; // убираем " с обеих сторон
        }

        printf("[Z2M] pin[%d] key='%s' val='%.*s'\r\n",
               i, PinsConf[i].zbee_key, raw_len, raw);

        // --- Защита от гонки при записи в PinsConf ---
        taskENTER_CRITICAL();

        if (strcmp(PinsConf[i].zbee_key, "state") == 0) {
            if (raw_len == 3 && memcmp(raw, "OFF", 3) == 0) {
                PinsConf[i].state = 0;
                PinsConf[i].dvalue = 0;
            } else if (raw_len == 2 && memcmp(raw, "ON", 2) == 0) {
                PinsConf[i].state = 1;
                PinsConf[i].dvalue = 254;
            }
        } else if (strcmp(PinsConf[i].zbee_key, "brightness") == 0 ||
                   strcmp(PinsConf[i].zbee_key, "color_temp") == 0 ||
                   strcmp(PinsConf[i].zbee_key, "color.hue") == 0 ||
                   strcmp(PinsConf[i].zbee_key, "color.saturation") == 0) {
            char numbuf[16];
            int copylen = raw_len < (int)sizeof(numbuf) - 1
                        ? raw_len : (int)sizeof(numbuf) - 1;
            memcpy(numbuf, raw, copylen);
            numbuf[copylen] = '\0';
            PinsConf[i].dvalue = atoi(numbuf);
        }

        taskEXIT_CRITICAL();
    }
    // break НЕ допустим — один топик может обслуживать несколько пинов
}
```

**Ключевые моменты v4**:
- `mg_json_get()` возвращает токен **с кавычками**. `"OFF"` = 5 символов,
  `"ON"` = 4. Предыдущая версия сравнивала `val.len == 4` для OFF — никогда
  не срабатывало. Теперь отрезаем кавычки перед сравнением.
- `taskENTER_CRITICAL()` защищает запись в `PinsConf[i].state/dvalue` от гонки
  с чтением из `handle_select_get()` (который тоже использует `taskENTER_CRITICAL()`
  для атомарного снапшота).
- `memcmp()` вместо `strncmp()` — нет NUL-терминатора в raw-токене, нужна
  точная проверка длины.
- **Нет `break`** — один топик может обслуживать несколько виртуальных пинов.
- Per-topic throttle: `s_zbee_last_cmd_tick[NUMPIN]` + `taskENTER_CRITICAL()` —
  каждый Zigbee-пин имеет независимый лимит 4 команды/сек.
- Поддерживаемые ключи: `state`, `brightness`, `color_temp`, `color.hue`,
  `color.saturation`. Остальные логируются, но не обрабатываются (MVP).
- `SetPinConfig()` **не** вызывается — запись на USB только через UI.

---

### Шаг 5. Отправка команд управления на шлюз

#### 5.1. Отдельная очередь `zbeeCmdQueueHandle`

**Не расширяет** `MqttMessage_t` (остаётся 4 байта) — экономия RAM.

**`main.h`** — добавить:
```c
typedef struct {
    char topic[48];
    char payload[64];
} ZbeeCmdMsg_t;
```

> `__attribute__((packed))` удалён: структура уже выровнена (48+64=112 байт,
> кратно 4). На Cortex-M7 packed может вызвать невыровненный доступ и
> штраф производительности без какой-либо экономии.

**`main.c`** — атрибуты и создание очереди (~строка 804):
```c
static const osMessageQueueAttr_t zbeeCmd_attributes = {
    .name = "zbeeCmdQueue"
};

osMessageQueueId_t zbeeCmdQueueHandle =
    osMessageQueueNew(4, sizeof(ZbeeCmdMsg_t), &zbeeCmd_attributes);
```

> `zbeeCmd_attributes` определён явно — без него `osMessageQueueNew` получает
> неинициализированный указатель, что ведёт к UB.

#### 5.2. Per-topic throttle для Zigbee-команд

Очередь всего 4 слота — при быстром overflow команды дропаются с "queue full".
Для защиты от шторма (быстрый слайдер яркости, несколько ламп) — дебаунс
**по одному таймеру на каждый виртуальный Zigbee-пин**.

Паттерн: ищем индекс пина по `zbee_topic` (уже есть в `mqtt_zigbee_handler`),
храним `last_cmd_tick` в параллельном статическом массиве. Синхронизация через
`taskENTER_CRITICAL()` — по аналогии с защитой `PinsConf`.

**`zagotovka.c`** — per-topic throttle:
```c
#define ZBEE_CMD_MIN_INTERVAL_MS 250  // 4 cmds/sec per pin

// Массив времени последней команды для каждого пина (runtime-only, не persisted)
static uint32_t s_zbee_last_cmd_tick[NUMPIN] = {0};

// Возвращает true если можно отправлять, false если throttle
static bool zbee_cmd_throttle_ok(int pin_idx) {
    uint32_t now = HAL_GetTick();
    bool ok = false;
    taskENTER_CRITICAL();
    if (now - s_zbee_last_cmd_tick[pin_idx] >= ZBEE_CMD_MIN_INTERVAL_MS) {
        s_zbee_last_cmd_tick[pin_idx] = now;
        ok = true;
    }
    taskEXIT_CRITICAL();
    return ok;
}

// Поиск индекса Zigbee-пина по топику.
// Читает PinsConf[].topin и zbee_topic — защищаем critical section
// от гонки с HTTP-обработчиком (handle_select_get тоже использует critical).
static int zbee_find_pin_by_topic(const char *topic) {
    int found = -1;
    taskENTER_CRITICAL();
    for (int i = 0; i < NUMPIN; i++) {
        if (PinsConf[i].topin == 11 &&
            strcmp(PinsConf[i].zbee_topic, topic) == 0) {
            found = i;
            break;  // topic → pin: 1:1 для поиска (break допустим)
        }
    }
    taskEXIT_CRITICAL();
    return found;
}
```

#### 5.3. `SendZigbeeCommand()`

```c
void SendZigbeeCommand(const char *zbee_topic, const char *json_cmd) {
    extern osMessageQueueId_t zbeeCmdQueueHandle;

    int pin_idx = zbee_find_pin_by_topic(zbee_topic);
    if (pin_idx < 0) {
        printf("[Z2M] No zigbee pin for topic '%s'\r\n", zbee_topic);
        return;
    }

    if (!zbee_cmd_throttle_ok(pin_idx)) {
        printf("[Z2M] Throttled cmd to pin[%d] %s\r\n", pin_idx, zbee_topic);
        return;
    }

    char set_topic[64];
    snprintf(set_topic, sizeof(set_topic), "%s/set", zbee_topic);

    ZbeeCmdMsg_t cmd;
    memset(&cmd, 0, sizeof(cmd));
    strncpy(cmd.topic, set_topic, sizeof(cmd.topic) - 1);
    strncpy(cmd.payload, json_cmd, sizeof(cmd.payload) - 1);

    if (xQueueSend(zbeeCmdQueueHandle, &cmd, 0) != pdPASS) {
        printf("[Z2M] ZbeeCmd queue full, dropped: %s\r\n", set_topic);
    }
}
```

**Почему per-topic, а не глобальный счётчик**:
- Одно физическое реле может быть связано с 3-4 Zigbee-лампами.
  При "выключить свет" — 4 команды уходят одновременно. Глобальный лимит
  4/сек заблокировал бы все остальные команды в этой секунде.
- Per-topic: каждая лампа получает свои 4 команды/сек независимо.
- Лимит 250ms между командами для одного пина предотвращает шторм
  при быстром слайдере яркости.

#### 5.4. Обработка в WebServerTask

**`main.c`** — рядом с обработкой `mqttQueueHandle` (~строка 1735):

```c
ZbeeCmdMsg_t zcmd;
while (xQueueReceive(zbeeCmdQueueHandle, &zcmd, 0) == pdPASS) {
    if (s_conn != NULL && mqtt_connected_reported) {
        send_mqtt_message(s_conn, zcmd.topic, zcmd.payload);
    }
}
```

#### 5.5. Интеграция в pin-to-pin

**`zagotovka.c` — `parse_switch_json()` (~строка 571)**:
В ветке обработки `pinact[j]`:

```c
if (PinsConf[action_pin].topin == 11) {
    const char *cmd = (new_state) ? "{\"state\":\"ON\"}" : "{\"state\":\"OFF\"}";
    SendZigbeeCommand(PinsConf[action_pin].zbee_topic, cmd);
}
```

---

## ЧАСТЬ 2: ФРОНТЕНД (Preact / Vite)

### Шаг 1. `TabSelect.js` — radio "Zigbee" + поля

**Файл**: `web_root/Tabs/TabSelect.js`

#### 1.1. Radio-кнопка (строка ~302, после Security):

```javascript
<${RadioOption} id=${d.id} value="11" label="Zigbee"
    checked=${selectedValues[`topin_${d.id}`] === '11'}
    onChange=${handleRadioChange} />
```

#### 1.2. Поля ввода (внутри ArraySelect, при `topin === '11'`):

```javascript
${selectedValues[`topin_${d.id}`] === '11' && html`
    <div class="flex flex-col gap-2 mt-2 w-full">
        <input type="text" placeholder="MQTT Topic (e.g. zigbee2mqtt/Kuhnya)"
            maxlength="47"
            value=${selectedValues[`zbee_topic_${d.id}`] || ''}
            onChange=${(e) => handleFieldChange(d.id, 'zbee_topic', e.target.value)}
            class="text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-400" />
        <input type="text" placeholder="JSON Key (e.g. state)"
            maxlength="23"
            value=${selectedValues[`zbee_key_${d.id}`] || ''}
            onChange=${(e) => handleFieldChange(d.id, 'zbee_key', e.target.value)}
            class="text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-400" />
    </div>
`}
```

Плейсхолдер ключа: только `state` — MVP-ограничение. Поле свободного ввода.

#### 1.3. `handleFieldChange`:

```javascript
const handleFieldChange = (id, field, value) => {
    setSelectedValues(prev => ({ ...prev, [`${field}_${id}`]: value }));
};
```

### Шаг 2. `handleSubmit` — отправка новых полей

```javascript
const payload = {
    lang: language,
    sim800l: gpsEnabled ? 1 : 0,
    data: Object.keys(selectedValues)
        .filter(k => k.startsWith('topin_'))
        .map(k => {
            const id = parseInt(k.split('_')[1]);
            const obj = { id, topin: parseInt(selectedValues[k]) };
            if (selectedValues[k] === '11') {
                obj.zbee_topic = selectedValues[`zbee_topic_${id}`] || '';
                obj.zbee_key = selectedValues[`zbee_key_${id}`] || '';
            }
            return obj;
        })
};
```

---

## СВОДНАЯ ТАБЛИЦА ИЗМЕНЕНИЙ

| Файл | Что меняем | Строки |
|------|-----------|--------|
| `Core/Inc/db.h` | `zbee_topic[48]`, `zbee_key[24]` в `dbPinsConf` | ~65 |
| `Core/Inc/main.h` | `ZbeeCmdMsg_t` | ~141 |
| `Core/Src/main.c` | `zbeeCmdQueueHandle`, обработка в WebServerTask, удаление врем. фильтра | ~804, ~1732 |
| `Core/Src/net.c` | Динамическая подписка в `MG_EV_MQTT_OPEN`, фильтр в `MG_EV_MQTT_MSG` | ~1098, ~1123 |
| `Core/Src/zagotovka.c` | `mqtt_zigbee_handler()` + `SendZigbeeCommand()` + per-topic throttle | ~3381, ~5041 |
| `Core/Src/zagotovka.c` | Хуки в `mqtt_message_handler()` и `parse_switch_json()` | ~3381, ~571 |
| `Core/Src/zagotovka.c` | JSON-ответ в `handle_select_get()` | ~298 |
| `Core/Src/setings.c` | Парсинг/запись `zbee_topic`, `zbee_key` | ~948, ~1200 |
| `web_root/Tabs/TabSelect.js` | Radio "Zigbee", поля ввода | ~293, ~170 |

## ПОРЯДОК РЕАЛИЗАЦИИ

1. **Шаг 1** — хардкод тест подписки → UART
2. **Шаг 2** — расширение `dbPinsConf` + чтение/запись USB + валидация ввода
3. **Шаг 3** — динамическая подписка (удаляем хардкод Шага 1)
4. **Шаг 4** — парсинг через `mg_json_get()` + `taskENTER_CRITICAL()` (удаляем фильтр из `main.c`)
5. **Шаг 5** — `zbeeCmdQueueHandle` + throttle + pin-to-pin
6. **Фронтенд** — `TabSelect.js`

---

## ИЗВЕСТНЫЕ ОГРАНИЧЕНИЯ (MVP)

1. **Подписка только при (ре)коннекте к брокеру**.
   Если пользователь добавит Zigbee-пин через UI без перезагрузки —
   новая подписка НЕ произойдёт до следующего реконнекта к MQTT-брокеру.
   Подписка выполняется в `MG_EV_MQTT_OPEN` (однократно при установке соединения).
   **Workaround**: после сохранения конфигурации перезагрузить контроллер,
   или принудительно переподключить MQTT (если реализован механизм).
   **Будущее**: на Шаге сохранения конфига — вызывать `mg_mqtt_sub()` для
   новых топиков через очередь команд в `StartWebServerTask`.

2. **Поддерживаемые JSON-ключи ограничены**.
   Парсер `mqtt_zigbee_handler()` обрабатывает только: `state`, `brightness`,
   `color_temp`, `color.hue`, `color.saturation`. Остальные ключи логируются,
   но не влияют на `PinsConf`. Расширение — по мере необходимости.

3. **Нет экранирования JSON в HTTP-ответе**.
   `handle_select_get()` использует `%s` для `zbee_topic`/`zbee_key`.
   Безопасность обеспечивается валидацией на входе (`zbee_sanitize_str()` в
   `GetPinConfig()`). Если данные пишутся в `PinsConf` из другого источника —
   нужна аналогичная валидация.

---

## ПРОВЕРКА (тест-кейсы)

1. **UART-лог**: При переключении лампы на шлюзе → `[Z2M] pin[XX] key='state' val='ON'`
2. **Выключение**: `[Z2M] pin[XX] key='state' val='OFF'` (до v3 ловилось только ON)
3. **Reconnect**: При реконнекте к брокеру → `[MQTT] SUBSCRIBED to 'zigbee2mqtt/Kuhnya' (zigbee pin XX)`
4. **Сохранение**: Pin type "Zigbee" → topic/key записываются в `pins.ini`, читаются при перезагрузке
5. **Throttle per-topic**: Быстрое переключение одной лампы → `[Z2M] Throttled cmd to pin[XX] ...` при <250ms. Параллельное выключение 3+ ламп через одно реле — ВСЕ команды проходят (каждая лампа имеет свой таймер).
6. **pin-to-pin**: Физический свитч → команда `zigbee2mqtt/Kuhnya/set {"state":"OFF"}` уходит через `zbeeCmdQueueHandle`
7. **Валидация ввода**: Ввод `zbee_topic` = `test"inject` → после `zbee_sanitize_str()` превращается в `test_inject`
8. **Critical section в поиске**: `zbee_find_pin_by_topic()` не вызывает гонку с HTTP GET при параллельном чтении `PinsConf`
