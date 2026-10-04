// condlib.js — общие хелперы для "Дополнительного условия срабатывания действия".
//
// Синтаксис условия (после '?' в токене действия "id:действие?УСЛОВИЕ"):
//   R<id>   - реле/устройство включено (для PWM - яркость > 0); !R<id> - выключено
//   RV<id>  - значение диммера: RV1>0, RV2<200, RV1=255, RV1g100 (>=), RV1l100 (<=)
//   B<id>   - кнопка нажата;  BU<id> / !B<id> - не нажата;  BH<id> - удерживается
//   T<id>   - температура x0.1: T5>25.5 (датчики OneWire/DHT22), T5.2 - датчик #2
//   H<id>   - влажность x0.1 (DHT22): H4>50
//   C3      - ссылка на условие №3 из библиотеки (Global Settings) - для коротких полей
//   Sr/Ss   - день (восход..закат) / ночь: включать свет только ночью - "Ss"
//   Операторы: ! (НЕ), & (И), | (ИЛИ), ( ), =, >, <, g (>=), l (<=)
//   Пример: BH1|(R1&!R2)|(RV5=255)
//
// Условия для связей (Encoder/Switch) и PID выбираются из библиотеки условий
// (12 записей, редактируются на странице Global Settings) и хранятся номером.

// Допустимые символы условия (буквы/цифры/скобки/операторы/точка)
const COND_CHARS = 'A-Za-z0-9()!&|=<>.';
const COND_PART = `(\\?[${COND_CHARS}]{1,60})?`;

// Токен действия с опциональным условием: "6:1", "93.1:2", "6:1?R2&RV3>50"
export const ACTION_TOKEN_RE_SOURCE =
  `(None|\\d{1,4}(\\.\\d)?:[012]${COND_PART})`;

// Полная строка действий: токены через запятую
export function buildActionRegex(idDigits) {
  return new RegExp(
    `^(None|\\d{1,${idDigits}}(\\.\\d)?:[012]${COND_PART})` +
    `(,\\d{1,${idDigits}}(\\.\\d)?:[012]${COND_PART})*$`
  );
}

// Проверка строки действий (формат как в модалках кнопок: 4 цифры ID)
export function validateActionStr(value) {
  if (!value || value.trim() === '' || value.toLowerCase() === 'none') return null;
  return buildActionRegex(4).test(value)
    ? null
    : 'Format: None, 6:1, 93.1:2, 6:1?R2 (pin:value?condition, 0=OFF 1=ON 2=TOGGLE)';
}

// Проверка одного токена "пин:действие?условие" (для Sunrise/Sunset, до 3 цифр)
export function validateSunToken(token) {
  const m = new RegExp(
    `^(\\d{1,3})(?:\\.([12]))?:([0-2])${COND_PART}$`
  ).exec(token);
  if (!m || parseInt(m[1], 10) > 255) return false;
  return true;
}

// Обнаружить 'сломанное' условие: '?0' (сброшено после удаления устройства)
// в строке действий. Возвращает true, если хотя бы одно действие заблокировано.
export function hasDisabledCond(str) {
  if (!str || typeof str !== 'string') return false;
  return /\?0($|[^0-9])/.test(str);
}

export const DISABLED_COND_WARN = {
  ru: 'Обнаружено отключённое условие "?0" - действие не срабатывает (обычно после удаления устройства, на которое ссылалось условие). Задайте новое условие',
  en: 'Disabled condition "?0" found - action will not fire (usually after deleting the device the condition referenced). Set a new condition'
};

// Загрузить библиотеку условий (12 строк) из Global Settings
export async function fetchConditions() {
  try {
    const r = await fetch('/api/mysett/get', { cache: 'no-store' });
    if (!r.ok) return [];
    const data = await r.json();
    const conds = Array.isArray(data.conds) ? data.conds : [];
    // нормализуем до 12 строк
    const out = [];
    for (let i = 0; i < 12; i++) out.push(conds[i] || '');
    return out;
  } catch (e) {
    console.error('fetchConditions:', e);
    return [];
  }
}

// Подсказка по синтаксису (RU/EN)
export const COND_HINT = {
  ru: 'Условие после "?": R1 - реле 1 вкл (Zigbee - состояние), !R2 - выкл, RV1>0 / RV1=255 / RV1g100 / RV1l100 - диммер, B1 - кнопка нажата, BU1 - не нажата, BH1 - удерживается, T5>25.5 - температура, H4>50 - влажность, Sr - день, Ss - ночь. Операторы: ! & | ( ) = > < g l. Пример: BH1|(R1&!R2)|(RV5=255). Мёртвый датчик: T/H-сравнение «неизвестно», блокирует действие даже под ! (Клейни), НО явная истина через | перекрывает: T5<25|R1 сработает при мёртвом T5, если R1 вкл. C3 - ссылка на условие №3 из библиотеки (работает цепочка из 2 вложенных ссылок, глубже - блокировка). ВНИМАНИЕ: прямое управление (ползунок On/Off, MQTT/API) условие НЕ проверяет - это не защита от одновременного включения',
  en: 'Condition after "?": R1 - relay 1 on (Zigbee - device state), !R2 - off, RV1>0 / RV1=255 / RV1g100 / RV1l100 - dimmer, B1 - button pressed, BU1 - not pressed, BH1 - held, T5>25.5 - temperature, H4>50 - humidity, Sr - daytime, Ss - night. Operators: ! & | ( ) = > < g l. Example: BH1|(R1&!R2)|(RV5=255). If a sensor is dead, T/H is false. NOTE: direct control (On/Off toggle, MQTT/API) does NOT check conditions'
};

// Короткая подсказка для placeholder
export const COND_PLACEHOLDER = '6:1?R2&!R3';

export function condHint(isRu) {
  return isRu ? COND_HINT.ru : COND_HINT.en;
}
