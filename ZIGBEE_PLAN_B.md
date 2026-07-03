# ПЛАН B: Отдельный массив ZigbeeConf (Zagotovka-M)

> Статус: черновик к реализации
> Предпосылка: физическое пространство пинов (`NUMPIN=89`) не расширяется.
> Zigbee-устройства живут в отдельном массиве `ZigbeeConf[NUMZBEE]`.
> RAM: ~9 KB на 100 устройств. Точная цифра — после подтверждения
> `sizeof(struct ZigbeeVirtualPin)` из компилятора.

---

## 0. Цели и не-цели

**Цели:**
- Освободить физические пины (PA15 и т.п.) от Zigbee-конфигурации.
- Держать RAM-оверхед пропорциональным реальному числу Zigbee-устройств,
  а не тащить полноразмерную `dbPinsConf` (592 байта) на каждое.
- Сохранить работающую логику pin-to-pin, cron, SMS — без переписывания
  самого движка связей, только точку входа к данным пина.

**Не-цели (сознательно вне этого плана):**
- Не трогаем `NUMPIN`, `PinsInfo`, GPIO-инициализацию — они не меняются.
- Не переносим существующие Zigbee-пины из `PinsConf` (ID=5 и т.п.) —
  это отдельная миграционная задача, делается последним шагом.

---

## 1. Структуры данных

### 1.1. `ZigbeeVirtualPin`

```c
// db.h
#define NUMZBEE 100
_Static_assert(NUMPIN + NUMZBEE <= 255, "ID space exceeds uint8_t range");

typedef struct {
    char     zbee_ieee[17];      // IEEE-адрес без "0x", 16 hex + '\0'
    uint8_t  zbee_endpoint;      // 1-240
    uint16_t zbee_cluster;       // 0x0006=OnOff, 0x0008=Level, 0x0300=Color
    uint16_t zbee_attribute;     // 0x0000 и т.д., зависит от кластера
    char     zbee_label[30];     // Произвольное имя для UI (не участвует в MQTT)
    uint8_t  state;              // 0/1 — текущее состояние устройства
    int      dvalue;             // яркость/hue/etc
    uint8_t  onoff;              // Master-enable: 1=вкл (режим по умолчанию),
                                 // 0=выкл (временно отключить логику без удаления).
                                 // Сохраняется в zigbee.ini, переживает перезагрузку.
    char     info[30];           // служебное поле
    uint8_t  topin;              // всегда 11 (ZIGBEE), для унификации
} ZigbeeVirtualPin;

extern ZigbeeVirtualPin ZigbeeConf[NUMZBEE];
```

⚠️ **`pinact[PINPAIRS]` и `sclick[125]` НЕ включены** — в текущем коде реальное
выполнение pin-to-pin идёт через `PinsLinks[NUMPINLINKS]` (db.h:179-183), а
`PinAction pinact[]` в `dbPinsConf` — это только UI-копия (читается в
`gen_encoder_json`, но собирается из `PinsLinks[]`, а не из `pinact[]`).
`sclick` — аналогичный мёртвый вес для Zigbee. Убираем оба поля → экономим
185 байт на запись.

**Оценка размера** (без `pinact` и `sclick`):

```
zbee_ieee[17]    offset  0 → 17
zbee_endpoint    offset 17 → 18
zbee_cluster     offset 18 → 20
zbee_attribute   offset 20 → 22
zbee_label[30]   offset 22 → 52
state            offset 52 → 53
[паддинг 3 байта перед dvalue]
dvalue (int)     offset 56 → 60
onoff            offset 60 → 61
info[30]         offset 61 → 91
topin            offset 91 → 92
[финальный паддинг до кратного 4]
ИТОГО: 92 байта × 100 = 9.0 KB
```

Ранее было 280 байт (с `pinact[60]` + `sclick[125]`). Экономия: **18.3 KB**.

⚠️ **Требует подтверждения:** реальный `sizeof(struct ZigbeeVirtualPin)` из
компилятора. Оценка "92 байта" основана на полях без `pinact`/`sclick` —
если они действительно не нужны (см. анализ в §5.1), это ~9 KB на 100 устройств.

### 1.2. Адресация: единое пространство ID

Чтобы pin-to-pin мог ссылаться на Zigbee-пин так же, как на физический (одним
числом в `PinAction.pin`), вводим сквозную нумерацию:

```c
// ID < NUMPIN        → физический пин, PinsConf[id]
// ID >= NUMPIN        → Zigbee-пин, ZigbeeConf[id - NUMPIN]

static inline bool IsZigbeePin(int id) { return id >= NUMPIN; }
static inline int  ZbeeIdx(int id)     { return id - NUMPIN; }
```

Максимальный ID = `NUMPIN + NUMZBEE - 1` = 188. Это специально сделано так,
чтобы `PinAction.pin` не пришлось расширять до нового типа — если сейчас это
`uint8_t`, 188 всё ещё влезает.

### 1.3. `PinView` — тонкий интерфейс для общих операций

Полный диспетчер, возвращающий `dbPinsConf*` на Zigbee-данные, — тупиковый
путь: копия в `dbPinsConf`-формате на 100 элементов съедает 59.2 KB (100 ×
592 байта), что сводит на нет всю экономию RAM от отдельного массива. Вместо
этого — узкий view только на поля, которые реально нужны *общему* коду
(движку связей, throttle, логам):

```c
typedef struct {
    uint8_t    topin;
    uint8_t    state;
    int        dvalue;
    const char *label;     // PinsConf[i].info либо ZigbeeConf[i].zbee_label
    bool       is_zigbee;
    void      *raw;        // dbPinsConf* либо ZigbeeVirtualPin* — для кода,
                            // которому специфика точно нужна
} PinView;

PinView GetPinView(int id) {
    PinView v = {0};
    if (id < NUMPIN) {
        struct dbPinsConf *p = &PinsConf[id];
        v = (PinView){ p->topin, p->state, p->dvalue, p->info, false, p };
    } else {
        ZigbeeVirtualPin *z = &ZigbeeConf[ZbeeIdx(id)];
        v = (PinView){ z->topin, z->state, z->dvalue, z->zbee_label, true, z };
    }
    return v;
}
```

`GetPinView()` подходит для: движка связей (`state`/`dvalue`/`pinact`), логов,
throttle. **Не подходит** для: GPIO-операций, PWM, encoder, `PinsInfo[i]` —
там код обязан явно знать, физический перед ним пин или нет, и такие места
переписываются с явной веткой `if (id < NUMPIN)`, без `PinView`.

---

## 2. Хранение конфигурации (USB/FatFs)

### 2.1. Отдельный файл `zigbee.ini`

Не смешиваем с `pins.ini` — так проще писать/читать независимо и не трогать
парсер `GetPinConfig()`/`SetPinConfig()` для физических пинов вообще.

```c
// setings.c
void GetZigbeeConfig(void) {
    // читает zigbee.ini, парсит построчно: id;ieee;ep;cluster;attr;label;onoff
    // заполняет ZigbeeConf[idx]
    //
    // Формат строки: id;ieee;ep;cluster;attr;label;onoff
    // Пример: 0;588e81fffe36a343;1;0006;0000;Лампа Кухня;1
    //
    // onoff — опциональное поле (7-е). Если отсутствует в файле
    // (старый формат, до добавления onoff) — по умолчанию 1 (вкл).
    // Если присутствует — читается как есть (пользователь мог отключить).
    //
    // При СОЗДАНИИ НОВОЙ записи (id не найден в zigbee.ini)
    // onoff = 1 по умолчанию. При ПОВТОРНОМ ЧТЕНИИ — не трогать.
}

void SetZigbeeConfig(void) {
    // пишет ZigbeeConf[] в zigbee.ini при сохранении из UI
    // формат строки: id;ieee;ep;cluster;attr;label;onoff
}
```

Формат строки (с полем `onoff`):

```
0;588e81fffe36a343;1;0006;0000;Лампа Кухня;1
1;a1b2c3d4e5f60718;1;0008;0000;Лампа Спальня;0
```

### 2.2. Валидация ввода

Тот же принцип, что и в предыдущей версии плана — `zbee_sanitize_str()` для
`zbee_label` (может попасть в HTTP JSON-ответ без экранирования). Для
`zbee_ieee` — дополнительно валидировать, что это ровно 16 hex-символов:

```c
static bool zbee_validate_ieee(const char *s) {
    if (strlen(s) != 16) return false;
    for (int i = 0; i < 16; i++) if (!isxdigit((unsigned char)s[i])) return false;
    return true;
}
```

Если не проходит — не сохранять, вернуть ошибку в HTTP-ответе (см. §6.2).

---

## 3. Сетевой уровень (`net.c`)

### 3.1. Динамическая подписка

Заменяет цикл по `PinsConf[i].topin==11` (net.c:1126-1143) на цикл по `ZigbeeConf`:

```c
// net.c, MG_EV_MQTT_OPEN — замена существующего цикла на строках 1126-1143
extern ZigbeeVirtualPin ZigbeeConf[NUMZBEE];

for (int i = 0; i < NUMZBEE; i++) {
    if (ZigbeeConf[i].zbee_ieee[0] == '\0') continue;
    char sub_topic[80];
    snprintf(sub_topic, sizeof(sub_topic), "%s/data/%s/%d/%04X/%04X",
             get_rxzbtop(),  // ← НЕ хардкод! Берётся из SetSettings.rxzbtop
             ZigbeeConf[i].zbee_ieee, ZigbeeConf[i].zbee_endpoint,
             ZigbeeConf[i].zbee_cluster, ZigbeeConf[i].zbee_attribute);
    struct mg_mqtt_opts zbee_sub;
    memset(&zbee_sub, 0, sizeof(zbee_sub));
    zbee_sub.topic = mg_str(sub_topic);
    zbee_sub.qos = s_qos;
    mg_mqtt_sub(c, &zbee_sub);
    printf("[MQTT] SUBSCRIBED to '%s' (zigbee idx %d)\r\n", sub_topic, i);
}
```

⚠️ **Важно:** текущий код использует `get_rxzbtop()` (zagotovka.c:3435-3437) для
префикса топика — это `SetSettings.rxzbtop` с fallback на `RXZBTOP` ("zigbee2mqtt").
Нельзя хардкодить "zigbee2mqtt" — пользователь может настроить другой префикс.

### 3.2. Приём (`MG_EV_MQTT_MSG` → `mqtt_zigbee_handler()`)

Фильтр по префиксу уже работает в `mqtt_message_handler()` (zagotovka.c:3544-3550):
```c
const char *zbtop = get_rxzbtop();
if (strncmp(topic, zbtop, strlen(zbtop)) == 0 && topic[strlen(zbtop)] == '/') {
    mqtt_zigbee_handler(topic, payload);
    return;
}
```
Заменяем тело `mqtt_zigbee_handler()` — поиск идёт по `ZigbeeConf`, не по `PinsConf`:

```c
// zagotovka.c — замена существующей функции (строки 3439-3492)
static void mqtt_zigbee_handler(const char *topic, const char *body) {
    struct mg_str body_str = mg_str_n(body, strlen(body));

    for (int i = 0; i < NUMZBEE; i++) {
        if (ZigbeeConf[i].zbee_ieee[0] == '\0') continue;

        char expect[80];
        snprintf(expect, sizeof(expect), "%s/data/%s/%d/%04X/%04X",
                 get_rxzbtop(),
                 ZigbeeConf[i].zbee_ieee, ZigbeeConf[i].zbee_endpoint,
                 ZigbeeConf[i].zbee_cluster, ZigbeeConf[i].zbee_attribute);
        if (strcmp(expect, topic) != 0) continue;

        int toklen = 0;
        int off = mg_json_get(body_str, "$.data.val", &toklen);
        if (off < 0) continue;
        const char *raw = body + off;
        int raw_len = toklen;
        if (raw_len >= 2 && raw[0] == '"' && raw[raw_len-1] == '"') {
            raw++; raw_len -= 2;
        }

        printf("[Z2M] idx[%d] ieee='%s' cl=%04X val='%.*s'\r\n",
               i, ZigbeeConf[i].zbee_ieee, ZigbeeConf[i].zbee_cluster,
               raw_len, raw);

        taskENTER_CRITICAL();
        if (ZigbeeConf[i].zbee_cluster == 0x0006) {
            if (raw_len == 2 && memcmp(raw, "ON", 2) == 0) {
                ZigbeeConf[i].state = 1;
                ZigbeeConf[i].dvalue = 254;
            } else if (raw_len == 3 && memcmp(raw, "OFF", 3) == 0) {
                ZigbeeConf[i].state = 0;
                ZigbeeConf[i].dvalue = 0;
            }
        } else if (ZigbeeConf[i].zbee_cluster == 0x0008 ||
                   ZigbeeConf[i].zbee_cluster == 0x0300) {
            char numbuf[16];
            int copylen = raw_len < (int)sizeof(numbuf)-1 ? raw_len : (int)sizeof(numbuf)-1;
            memcpy(numbuf, raw, copylen);
            numbuf[copylen] = '\0';
            ZigbeeConf[i].dvalue = atoi(numbuf);
        }
        taskEXIT_CRITICAL();

        // Пробрасываем изменение в pin-to-pin через единый ID
        processPins(NUMPIN + i, ZigbeeConf[i].state ? 1 : 0);
    }
}
```

⚠️ **Ключевое отличие от текущего кода:** `processPins()` (zagotovka.c:3966) сейчас
обращается к `PinsConf[i].onoff` — OOB при `i >= NUMPIN`. См. §5.1 — там
показано, как это исправить. Без этой правки `processPins(NUMPIN + i)` вызовет
buffer overflow.

---

## 4. Команды: `SendZigbeeCommand()` + throttle

Throttle-массив теперь индексируется по `zb_idx` напрямую.

⚠️ **Текущий код** (zagotovka.c:3421): `static uint32_t s_zbee_last_cmd_tick[NUMPIN] = {0};`
Размер `NUMPIN` — лишний (89 элементов, 356 байт тратятся впустую). Меняем на `NUMZBEE`.

```c
// zagotovka.c — замена существующей SendZigbeeCommand (строки 3495-3542)
#define ZBEE_CMD_MIN_INTERVAL_MS 250
static uint32_t s_zbee_last_cmd_tick[NUMZBEE] = {0};  // ← NUMZBEE, не NUMPIN!

static bool zbee_cmd_throttle_ok(int zb_idx) {
    uint32_t now = HAL_GetTick();
    bool ok = false;
    taskENTER_CRITICAL();
    if (now - s_zbee_last_cmd_tick[zb_idx] >= ZBEE_CMD_MIN_INTERVAL_MS) {
        s_zbee_last_cmd_tick[zb_idx] = now;
        ok = true;
    }
    taskEXIT_CRITICAL();
    return ok;
}

void SendZigbeeCommand(int zb_idx, const char *payload) {
    extern osMessageQueueId_t zbeeCmdQueueHandle;

    if (zb_idx < 0 || zb_idx >= NUMZBEE) return;
    if (ZigbeeConf[zb_idx].zbee_ieee[0] == '\0') return;

    if (!zbee_cmd_throttle_ok(zb_idx)) {
        LOG_Z2M("Throttled cmd to zb[%d]\r\n", zb_idx);
        return;
    }

    char set_topic[80];
    snprintf(set_topic, sizeof(set_topic), "%s/cmd/%s/%d/%04X",
             get_rxzbtop(),  // ← НЕ хардкод! Текущий код тоже использует get_rxzbtop()
             ZigbeeConf[zb_idx].zbee_ieee, ZigbeeConf[zb_idx].zbee_endpoint,
             ZigbeeConf[zb_idx].zbee_cluster);

    ZbeeCmdMsg_t cmd;
    memset(&cmd, 0, sizeof(cmd));
    strncpy(cmd.topic, set_topic, sizeof(cmd.topic) - 1);
    strncpy(cmd.payload, payload, sizeof(cmd.payload) - 1);

    if (xQueueSend(zbeeCmdQueueHandle, &cmd, 0) != pdPASS) {
        LOG_Z2M("ZbeeCmd queue full, dropped: %s\r\n", set_topic);
    } else {
        LOG_Z2M("Queued: topic='%s' payload='%s'\r\n", set_topic, payload);
    }
}
```

Обработка в `StartWebServerTask` — без изменений относительно плана v5
(`xQueueReceive(zbeeCmdQueueHandle, ...)` → `send_mqtt_message()`).

---

## 5. Интеграция pin-to-pin

### 5.1. Реальный механизм pin-to-pin в текущем коде

Текущий flow (уже работающий для физических пинов):

```
Кнопка/выключатель
    ↓
processPins(trigger_id, action)          ← zagotovka.c:3966
    ↓ (ищет PinsLinks[a].idin == trigger_id)
outputQueueHandle                        ← очередь FreeRTOS
    ↓
StartOutputTask                           ← main.c:1931
    ↓ (data_pin.id = PinsLinks[a].idout)
if (PinsConf[id].topin == 11) → SendZigbeeCommand()
else → HAL_GPIO_WritePin()
```

**Ключевой момент:** `PinAction pinact[PINPAIRS]` в `dbPinsConf` — это **только
для UI** (отображение связей в `gen_encoder_json`). Реальное выполнение идёт
через `PinsLinks[NUMPINLINKS]` (db.h:179-183).

### 5.2. Правки для поддержки Zigbee ID

**processPins** (zagotovka.c:3966) — ОБЯЗАТЕЛЬНО переписать:

```c
// БЫЛО (текущий код):
void processPins(uint8_t i, uint8_t action) {
    if (PinsConf[i].onoff == 0) {  // ← OOB при i >= NUMPIN!
        return;
    }
    for (uint8_t a = 0; a < NUMPINLINKS; a++) {
        if (PinsLinks[a].idin == i) {
            data_pin_t data_pin = {0};
            data_pin.id = PinsLinks[a].idout;
            ...
```

```c
// СТАЛО:
void processPins(uint8_t i, uint8_t action) {
    // Проверка onoff только для физических пинов
    if (i < NUMPIN && PinsConf[i].onoff == 0) {
        printf("[processPins] Switch %d DISABLED (master off)\r\n", i);
        return;
    }
    // Для Zigbee-пинов onoff проверяется отдельно (см. ниже)
    if (i >= NUMPIN) {
        int zb_idx = i - NUMPIN;
        if (zb_idx < 0 || zb_idx >= NUMZBEE) return;
        if (ZigbeeConf[zb_idx].onoff == 0) return;
    }
    for (uint8_t a = 0; a < NUMPINLINKS; a++) {
        if (PinsLinks[a].idin == i) {
            data_pin_t data_pin = {0};
            data_pin.id = PinsLinks[a].idout;
            data_pin.action = action;
            data_pin.cntrlid = i;
            xQueueSend(outputQueueHandle, (void *)&data_pin, 0);
        }
    }
}
```

**StartOutputTask** (main.c:1946) — расширить проверку `data_pin.id`:

```c
// БЫЛО:
if (data_pin.id >= 0 && data_pin.id < NUMPIN) {
    if (PinsConf[data_pin.id].topin == 11) { ... }
    else { ... GPIO ... }
} else {
    printf("Invalid pin number: %d\r\n", data_pin.id);
}

// СТАЛО:
if (data_pin.id >= 0 && data_pin.id < NUMPIN + NUMZBEE) {
    if (data_pin.id >= NUMPIN) {
        // Zigbee-пин
        int zb_idx = data_pin.id - NUMPIN;
        const char *cmd = (data_pin.action == 1) ? "ON" : "OFF";
        SendZigbeeCommand(zb_idx, cmd);
    } else {
        // Физический GPIO — БЕЗ ИЗМЕНЕНИЙ
        switch (data_pin.action) { ... }
    }
} else {
    printf("Invalid pin number: %d\r\n", data_pin.id);
}
```

⚠️ **`data_pin_t.id` — это `int` (main.h:135), не `uint8_t`.** Значения 128-188
не обрезаются и не становятся отрицательными. Проверено.

### 5.3. Обратное направление (Zigbee → физический пин)

Из `mqtt_zigbee_handler()` (§3.2) вызывается `processPins(NUMPIN + i, action)`.
Далее `processPins` ищет `PinsLinks[a].idin == NUMPIN + i` — если такой link
существует (Zigbee-лампа → физическое реле), `data_pin.id` будет физическим
ID, и `StartOutputTask` обработает его как GPIO. Обратная связь работает
без дополнительного кода.

---

## 6. HTTP API и фронтенд

### 6.1. Отдельная вкладка вместо radio-кнопки в "Select pin(s)"

Ключевое отличие от v5: Zigbee-пины **не занимают строку в таблице физических
пинов**. Новая вкладка в левом меню — "Zigbee devices", отдельный список,
динамически растущий (Add/Edit/Delete), а не фиксированные 89 строк.

```
web_root/Tabs/TabZigbee.js   ← новый компонент
```

Макет — по образцу таблицы Devices на самом шлюзе SLZB (см. скриншот из
предыдущего обсуждения): колонки IEEE / EP / Cluster / Label / Actions,
кнопка "+" для добавления нового устройства.

### 6.2. Новые HTTP-эндпоинты

```c
// zagotovka.c
void handle_zigbee_get(struct mg_connection *c, struct mg_http_message *hm) {
    // отдаёт JSON-массив ZigbeeConf[] (только заполненные записи)
}

void handle_zigbee_set(struct mg_connection *c, struct mg_http_message *hm) {
    // парсит JSON, валидирует (zbee_validate_ieee, zbee_sanitize_str),
    // пишет в ZigbeeConf[], вызывает SetZigbeeConfig()
    // при добавлении нового устройства — переподписка требует реконнекта
    // к MQTT (то же MVP-ограничение, что было в v5, §"Известные ограничения")
}
```

### 6.3. Pin-to-pin в UI

В существующей странице связей (`TabConnections`/аналог) выпадающий список
"источник/цель" должен показывать не только физические пины, но и записи из
`ZigbeeConf` — с ID, вычисленным как `NUMPIN + idx`, и подписью `zbee_label`.
Со стороны пользователя это выглядит как единый список целей, без разницы
между физическим реле и Zigbee-лампой — то, что и было целью абстракции
"виртуального пина" с самого начала (v1 плана).

---

## 7. Список мест правки (по файлам, в порядке правки)

| Файл | Что делаем | Тип правки |
|------|-----------|-----------|
| `db.h` | `ZigbeeVirtualPin`, `NUMZBEE`, `ZigbeeConf[]`, `IsZigbeePin()`/`ZbeeIdx()`, `PinView`+`GetPinView()` | Новый код |
| `setings.c` | `GetZigbeeConfig()`/`SetZigbeeConfig()`, `zbee_validate_ieee()`, `zbee_sanitize_str()` | Новый код |
| `net.c` | Динамическая подписка (§3.1) — замена цикла на строках 1126-1143 | Правка существующего цикла |
| `zagotovka.c` | `mqtt_zigbee_handler()` (§3.2) — замена тела функции (строки 3439-3492) | Правка существующей функции |
| `zagotovka.c` | `s_zbee_last_cmd_tick[NUMPIN]` → `s_zbee_last_cmd_tick[NUMZBEE]` (строка 3421) | Правка размера массива |
| `zagotovka.c` | `SendZigbeeCommand()` (§4) — изменить сигнатуру на `(int zb_idx, const char *payload)` | Правка существующей функции |
| `zagotovka.c` | `processPins()` (§5.2) — добавить проверку `i < NUMPIN` перед `PinsConf[i].onoff` | Правка существующей функции (КРИТИЧНАЯ) |
| `main.c` | `StartOutputTask` (§5.2) — расширить проверку `data_pin.id` на Zigbee ID | Правка существующей функции |
| `zagotovka.c` | `handle_zigbee_get/set()` (§6.2) | Новый код |
| `web_root/Tabs/TabZigbee.js` | Новый компонент | Новый код |
| `web_root/Tabs/TabConnections.js` | Добавить Zigbee-записи в dropdown источник/цель (фильтруя `PinsLinks[]` по ID >= NUMPIN) | Правка существующего списка |

**Явно НЕ трогаем:** `PinsInfo[]`, `handle_select_get()` для физических пинов,
`gen_button_json`/`gen_switch_json`/`gen_encoder_json`, GPIO-инициализация,
`InitPin()`. Существующий, отлаженный код физических пинов остаётся
нетронутым.

⚠️ **`handle_connection_del`** (zagotovka.c:2538-2550) — текущий код удаляет
из `PinsConf[id].pinact[]` при удалении связи. Для Zigbee-пинов это не нужно
(у них нет `pinact`), но `PinsLinks[]` (строки 2552-2563) по-прежнему требует
правки — там `idin`/`idout` могут содержать ID >= NUMPIN.

---

## 8. Порядок реализации (пошагово, с эмпирической проверкой)

1. **Структуры** — `ZigbeeVirtualPin`, `ZigbeeConf[]`, `GetZigbeeConfig()`/
   `SetZigbeeConfig()`. Проверка: ручной тестовый `zigbee.ini`, чтение при
   старте, UART-лог со значениями.
2. **Подписка** (§3.1) — без парсинга, просто UART-лог сырого payload.
   Проверка: физическое переключение лампы → лог с топиком и телом сообщения.
3. **Парсинг** (§3.2, `mqtt_zigbee_handler`) — `ZigbeeConf[i].state`/`dvalue`
   обновляются. Проверка: ON/OFF-тест кейсы, как в предыдущих раундах.
4. **Команды** (§4) — `SendZigbeeCommand()` + throttle. Проверка: ручной вызов
   из отладочной HTTP-ручки или UART-команды, до интеграции с pin-to-pin.
5. **Pin-to-pin** (§5) — `processPins()` + `StartOutputTask`. Проверка:
   физическая кнопка → Zigbee-лампа. Убедиться, что `PinsLinks[]` может хранить
   ID >= NUMPIN (short — влезает, max 32767).
6. **HTTP API + фронтенд** (§6) — `TabZigbee.js`, эндпоинты. Проверка: полный
   цикл через UI — добавить устройство, сохранить, реконнект, управление.
7. **Миграция существующих Zigbee-пинов из `PinsConf`** (если они уже
   настроены через v5-подход) — перенос записи ID=5 и подобных в `ZigbeeConf`,
   освобождение физического пина PA15.

---

## 9. Открытые вопросы перед стартом

### Вопрос 1: sizeof(struct dbPinsConf) и sizeof(PinAction)/PINPAIRS

**Ответ из реального кода:**
- `PINPAIRS = 10` (db.h:19) — подтверждено
- `sizeof(PinAction)` = 6 байт (`{ uint8_t id; char pin[5]; }`, без padding на ARM)
- `sizeof(struct dbPinsConf)` ≈ 592 байта (оценка по Python-скрипту с alignment;
  точное значение — `printf("%u", sizeof(struct dbPinsConf))` или `.map`-файл,
  погрешность ±10-20%)

**Итого для ZigbeeConf:** 92 байта × 100 = 9.0 KB (без `pinact`/`sclick`;
подтверждается `sizeof()` из компилятора)

### Вопрос 2: Реальная точка интеграции pin-to-pin

**Ответ из реального кода:**
- Точка входа — `processPins(trigger_id, action)` (zagotovka.c:3966)
- Вызывается из: `StartInputTask` (main.c:2206,2214) при переключении выключателя,
  а также из `button_event_handler` при нажатии кнопки
- `processPins` ищет `PinsLinks[a].idin == trigger_id` — это **рабочий** механизм
- `PinAction pinact[PINPAIRS]` используется **только для UI** (gen_encoder_json),
  не для выполнения

### Вопрос 3: Сигнатура check_pin_links()

**Ответ: ЭТОЙ ФУНКЦИИ НЕ СУЩЕСТВУЕТ** в текущем коде. grep по `*.c` — 0 совпадений.
План v5 ссылался на неё ошибочно. Реальный механизм — `processPins()` → `PinsLinks[]`
→ `outputQueue` → `StartOutputTask`.

### Вопрос 4: Кластеры/атрибуты для brightness и color

**Код готов принять, формат не подтверждён эмпирически.**

Текущий `mqtt_zigbee_handler()` (zagotovka.c:3473-3488) обрабатывает:
- `0x0006` (OnOff) — ON/OFF строковые → `state`/`dvalue` ✅ подтверждено
- `0x0008` (Level) — числовые → `atoi()` → `dvalue` ⚠️ код не падает, но формат не проверен
- `0x0300` (Color) — числовые → `atoi()` → `dvalue` ⚠️ код не падает, но формат не проверен

Проблема: `ZIGBEE_PROTOCOL_V6.md` писал "кластеры brightness/color пока не
подтверждены эмпирически, нужен доп. сниффинг". Если Color Control реально шлёт
`{"data":{"val":"255,29,0"}}` (RGB-строка) вместо голого числа, `atoi()` тихо
возьмёт только `255`. Код не упадёт, но `dvalue` будет неверным.

**Нужно до реализации §6 (UI):** покрутить яркость/цвет на Dashboard шлюза и
посмотреть реальный payload в UART-логе. До этого — в UI-выпадающем списке
кластеров предлагать только `OnOff (0x0006)`, остальные — с пометкой "experimental".
