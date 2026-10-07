
// CondInput (в самом конце файла) рендерится через html из bundle.js —
// без этого импорта модалки падают с "html is not defined".
import { html } from './bundle.js';

// condlib.js — общие хелперы для "Дополнительного условия срабатывания действия".
//
// Синтаксис условия (после '?' в токене действия "id:действие?УСЛОВИЕ"):
//   D<id>   - устройство с ID id включено: выход на пине DEVICE, PWM (яркость > 0) или
//             Zigbee-устройство; !D<id> - выключено. Прежняя буква R (R<id>, RV<id>) тоже
//             принимается прошивкой, DV<id> - значение диммера
//   RV<id>  - значение диммера: DV1>0, DV2<200, DV1=255, DV1g100 (>=), DV1l100 (<=)
//   B<id>   - кнопка нажата;  BU<id> / !B<id> - не нажата;  BH<id> - удерживается
//   T<id>   - температура x0.1: T5>25.5 (датчики OneWire/DHT22), T5.2 - датчик #2
//   H<id>   - влажность x0.1 (DHT22): H4>50
//   C3      - ссылка на условие №3 из библиотеки (панель Conditions на страницах
//             Switch/Encoder/PID и строка Conditions в Global Settings)
//   Sr/Ss   - день (восход..закат) / ночь: включать свет только ночью - "Ss"
//   Операторы: ! (НЕ), & (И), | (ИЛИ), ( ), =, >, <, g (>=), l (<=)
//   Пример: BH1|(D1&!D2)|(DV5=255)
//
// Страницы Switch / Encoder / PID: условие вводится СВОБОДНО (тот же синтаксис).
// Прошивка хранит выражения в пуле на 48 уникальных строк и передаёт номер
// в dbPinToPin.cond / dbPidConf.cond, поэтому одинаковые условия занимают
// по одному месту, а в GET-ответах приходит "cexpr" с текстом условия.
// Ссылка на ячейку библиотеки (номер 1..12) остаётся рабочей: пока текст
// условия не меняли, веб шлёт номер, и связь продолжает следовать за ячейкой.

// Допустимые символы условия (буквы/цифры/скобки/операторы/точка)
// '-' нужен для отрицательных порогов справа от сравнения: T5<-5, T5>-0.5
const COND_CHARS = 'A-Za-z0-9()!&|=<>.-';
const COND_PART = `(\\?[${COND_CHARS}]{1,60})?`;

// Предельная длина выражения условия (COND_LEN-1 в прошивке)
export const COND_MAX_LEN = 46;

// Токен действия с опциональным условием: "6:1", "93.1:2", "6:1?D2&DV3>50"
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
    : 'Format: None, 6:1, 93.1:2, 6:1?D2 (pin:value?condition, 0=OFF 1=ON 2=TOGGLE)';
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

// Загрузить библиотеку условий (12 строк). Редактируется на страницах
// Switch/Encoder/PID (CondLibrary.js) и в Global Settings - хранилище общее.
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
  ru: 'Условие после "?": D1 - устройство с ID 1 включено (выход на пине DEVICE, PWM с яркостью больше 0 или Zigbee-устройство; ID из первой колонки таблицы; прежняя запись R1 тоже работает), !D2 - выключено, DV1>0 / DV1=255 / DV1g100 / DV1l100 - диммер, B1 - кнопка нажата, BU1 - не нажата, BH1 - удерживается, T5>25.5 - температура, H4>50 - влажность, Sr - день, Ss - ночь. Операторы: ! & | ( ) = > < g l. Пример: BH1|(D1&!D2)|(DV5=255). Мёртвый датчик: T/H-сравнение «неизвестно», блокирует действие даже под ! (Клейни), НО явная истина через | перекрывает: T5<25|D1 сработает при мёртвом T5, если D1 вкл. C3 - ссылка на условие №3 из библиотеки (работает цепочка из 2 вложенных ссылок, глубже - блокировка). ВНИМАНИЕ: прямое управление (ползунок On/Off, MQTT/API) условие НЕ проверяет - это не защита от одновременного включения',
  en: 'Condition after "?": D1 - device with ID 1 is on (an output on a DEVICE pin, PWM with brightness above 0, or a Zigbee device; the ID is from the first table column; the old notation R1 also works), !D2 - off, DV1>0 / DV1=255 / DV1g100 / DV1l100 - dimmer, B1 - button pressed, BU1 - not pressed, BH1 - held, T5>25.5 - temperature, H4>50 - humidity, Sr - daytime, Ss - night. Operators: ! & | ( ) = > < g l. Example: BH1|(D1&!D2)|(DV5=255). If a sensor is dead, T/H is false. NOTE: direct control (On/Off toggle, MQTT/API) does NOT check conditions'
};

// Короткая подсказка для placeholder
export const COND_PLACEHOLDER = '6:1?D2&!D3';

export function condHint(isRu) {
  return isRu ? COND_HINT.ru : COND_HINT.en;
}

export const COND_HELP_TITLE = {
  ru: 'Как пользоваться условиями',
  en: 'How to use conditions'
};

export function condHelpTitle(isRu) {
  return isRu ? COND_HELP_TITLE.ru : COND_HELP_TITLE.en;
}

// ---------------------------------------------------------------------------
// Показ условия связи (Switch/Encoder) и PID-слота в таблицах.
// cond  - число из прошивки: 0 = условия нет, 1..12 = ячейка библиотеки,
//         13.. = слот встроенного пула.
// cexpr - текст условия из GET-ответа ("" если условия нет).
// conds - массив из fetchConditions() (12 строк) либо [] если не загружен.
// ---------------------------------------------------------------------------
// Ссылки вида C<n> внутри текста условия, которые указывают на пустую ячейку,
// ячейку со значением 0 или на несуществующий номер (C13 и выше). Для
// прошивки такая ссылка всегда НЕТ. Возвращает массив номеров ссылок
// (без повторов) либо [] если библиотека ещё не загружена или проблем нет.
export function condEmptyRefs(text, conds) {
  if (!text || !Array.isArray(conds) || conds.length === 0) return [];
  const bad = [];
  const re = /C(\d{1,3})(?![0-9])/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const k = parseInt(m[1], 10);
    const cell = k >= 1 && k <= 12 ? String(conds[k - 1] || '').trim() : '';
    if ((cell === '' || cell === '0') && bad.indexOf(k) < 0) bad.push(k);
  }
  return bad;
}

export function condInfo(cond, conds, cexpr) {
  const n = parseInt(cond, 10) || 0;
  const text = cexpr === undefined || cexpr === null ? '' : String(cexpr).trim();

  if (text !== '') {
    // Прошивка вернула текст: это либо ячейка библиотеки, либо встроенное
    // выражение. Различать не нужно - показываем то, что реально проверяется.
    return {
      n,
      empty: false,
      inline: n > 12,
      loaded: true,
      text,
      blocked: text === '0',
      emptyRefs: condEmptyRefs(text, conds),
      conds
    };
  }

  if (n <= 0) return { n: 0, empty: true };
  const loaded = Array.isArray(conds) && conds.length > 0;
  const libText = loaded ? (conds[n - 1] || '') : '';
  // Прошивка: пустая ячейка и "0" всегда дают ложь, то есть блокируют действие
  return { n, empty: false, inline: false, loaded, text: libText, blocked: loaded && (libText === '' || libText === '0') };
}

// Свободное выражение: синтаксис проверяет прошивка (cond_valid), здесь —
// только длина и набор символов, чтобы не отправлять заведомый мусор.
export function validateCondExpr(value) {
  const v = (value || '').trim();
  if (v === '') return null;
  if (v.length > COND_MAX_LEN) {
    return { ru: `Слишком длинное условие: ${v.length} символов, максимум ${COND_MAX_LEN}`,
             en: `Condition too long: ${v.length} chars, max ${COND_MAX_LEN}` };
  }
  if (!new RegExp(`^[${COND_CHARS}]+$`).test(v)) {
    return { ru: 'Недопустимые символы. Разрешены латинские буквы, цифры, ( ) ! & | = < > . -',
             en: 'Invalid characters. Allowed: latin letters, digits, ( ) ! & | = < > . -' };
  }
  return null;
}

// Что отправить прошивке: пустой ввод снимает условие, неизменённый текст
// ячейки библиотеки остаётся ссылкой на ячейку (номер), новое выражение
// уходит строкой "cexpr".
export function condPayload({ loadedText, loadedNum, text }) {
  const t = (text || '').trim();
  if (t === '') return { cexpr: '' };
  const same = t === String(loadedText || '').trim();
  const n = parseInt(loadedNum, 10) || 0;
  if (same && n >= 1 && n <= 12) return { cond: n };
  return { cexpr: t };
}

// Заполненность пула встроенных выражений (из /api/mysett/get).
export async function fetchCondPool() {
  try {
    const r = await fetch('/api/mysett/get', { cache: 'no-store' });
    if (!r.ok) return null;
    const data = await r.json();
    if (!data || !data.cond_pool) return null;
    return { used: parseInt(data.cond_pool.used, 10) || 0, total: parseInt(data.cond_pool.total, 10) || 0 };
  } catch (e) {
    return null;
  }
}

const BADGE_BASE =
  'display:inline-block;margin-left:6px;padding:2px 8px;border-radius:6px;' +
  'font-size:14px;font-weight:600;line-height:1.5;font-family:ui-monospace,monospace;white-space:nowrap;';
const BADGE_OK = BADGE_BASE + 'color:#3730a3;background:#e0e7ff;border:1px solid #c7d2fe;';
const BADGE_BAD = BADGE_BASE + 'color:#b91c1c;background:#fee2e2;border:1px solid #fecaca;';
const BADGE_SELF =
  BADGE_BASE + 'color:#065f46;background:#d1fae5;border:1px solid #a7f3d0;';
const BADGE_WARN =
  BADGE_BASE + 'color:#92400e;background:#fef3c7;border:1px solid #fde68a;';

// Возвращает { style, label, title } для бейджа либо null, если условия нет.
export function condBadgeProps(info, isRu) {
  if (!info || info.empty) return null;

  // Встроенное выражение (не ячейка библиотеки): показываем сам текст.
  if (info.inline) {
    if (info.text === '0') {
      return {
        style: BADGE_BAD,
        label: isRu ? 'условие: 0' : 'cond: 0',
        title: isRu
          ? 'Условие сброшено в 0 (обычно после удаления устройства): всегда ложно, действие заблокировано'
          : 'The condition was reset to 0 (usually after deleting a device): always false, the action is blocked'
      };
    }
    const refs = info.emptyRefs || [];
    if (refs.length > 0) {
      const tags = refs.map((k) => 'C' + k).join(', ');
      // Условие целиком состоит из одной ссылки на пустую ячейку: показываем
      // так же, как прямую связь с пустой ячейкой (красным).
      if (/^C\d{1,3}$/.test(info.text)) {
        const k = refs[0];
        const cellVal = k >= 1 && k <= 12 ? String((info.conds || [])[k - 1] || '').trim() : null;
        const word = cellVal === null ? (isRu ? 'нет такой ячейки' : 'no such cell')
          : cellVal === '0' ? '0'
          : (isRu ? 'пусто' : 'empty');
        return {
          style: BADGE_BAD,
          label: info.text + ': ' + word,
          title: isRu
            ? 'Условие ссылается на пустую ячейку ' + info.text + ' (или на ячейку со значением 0): оно всегда НЕТ, связь заблокирована. Заполните ячейку в панели Conditions на этой странице или очистите поле Condition'
            : 'The condition refers to the empty cell ' + info.text + ' (or a cell holding 0): it is always NO, the link is blocked. Fill the cell in the Conditions panel on this page or clear the Condition field'
        };
      }
      // Составное выражение: пустая ячейка внутри. В ИЛИ она безвредна,
      // в И блокирует всё условие - предупреждаем, не утверждая лишнего.
      const shownW = info.text.length > 24 ? info.text.slice(0, 23) + '...' : info.text;
      return {
        style: BADGE_WARN,
        label: (isRu ? 'если: ' : 'if: ') + shownW + (isRu ? ' (' + tags + ' пусто)' : ' (' + tags + ' empty)'),
        title: (isRu ? 'Условие: ' : 'Condition: ') + info.text + (isRu
          ? '. В нём есть ссылка на пустую ячейку (' + tags + '), она считается НЕТ. Внутри И это блокирует всё условие'
          : '. It refers to an empty cell (' + tags + '), which counts as NO. Inside an AND it blocks the whole condition')
      };
    }
    const shown = info.text.length > 24 ? info.text.slice(0, 23) + '...' : info.text;
    return {
      style: BADGE_SELF,
      label: (isRu ? 'если: ' : 'if: ') + shown,
      title: (isRu ? 'Условие: ' : 'Condition: ') + info.text
    };
  }

  const tag = 'C' + info.n;

  if (!info.loaded) return { style: BADGE_OK, label: tag, title: tag };
  if (info.text === '') {
    return {
      style: BADGE_BAD,
      label: tag + ': ' + (isRu ? 'ячейка пуста' : 'cell is empty'),
      title: isRu
        ? 'Ячейка условия пуста: действие заблокировано. Заполните её в панели Conditions на этой странице'
        : 'The condition cell is empty: the action is blocked. Fill it in in the Conditions library panel on this page'
    };
  }
  if (info.text === '0') {
    return {
      style: BADGE_BAD,
      label: tag + ': 0',
      title: isRu
        ? 'Условие сброшено в 0 (обычно после удаления устройства): всегда ложно, действие заблокировано'
        : 'The condition was reset to 0 (usually after deleting a device): always false, the action is blocked'
    };
  }
  const shown = info.text.length > 24 ? info.text.slice(0, 23) + '...' : info.text;
  return { style: BADGE_OK, label: tag + ': ' + shown, title: tag + ': ' + info.text };
}
// ---------------------------------------------------------------------------
// CondInput — поле свободного ввода условия для Switch / Encoder / PID.
// Тот же синтаксис, что и в действиях кнопок ("6:1?D2&!D3"), но без ведущего
// "пин:действие?" — здесь пишется только выражение: "D2&!D3".
// Пустое поле = условия нет.
// ---------------------------------------------------------------------------
export function CondInput({ value, onChange, conds = [], pool = null, isRu = true, name = 'cexpr' }) {
  const v = value || '';
  const err = validateCondExpr(v);
  const errText = err ? (isRu ? err.ru : err.en) : null;
  const free = pool && pool.total ? pool.total - pool.used : null;

  return html`
    <div>
      <input
        type="text"
        name=${name}
        value=${v}
        onInput=${(e) => onChange(e.target.value)}
        class="border rounded p-2 w-full font-mono ${errText ? 'border-red-500' : ''}"
        placeholder=${isRu ? 'Нет условия. Например: D2&!D3 или T5>25.5 или Ss|C3' : 'No condition. Example: D2&!D3 or T5>25.5 or Ss|C3'}
        maxLength=${String(COND_MAX_LEN)}
      />
      ${errText && html`<p class="text-red-500 text-xs mt-1">${errText}</p>`}
      <p class="text-gray-500 text-xs mt-1 text-right">${COND_MAX_LEN - v.length}/${COND_MAX_LEN}</p>
      ${conds.some((c) => c) &&
      html`<div class="flex flex-wrap gap-1 mt-1">
            <span class="text-gray-500 text-xs self-center">
              ${isRu ? 'Из библиотеки:' : 'From library:'}
            </span>
            ${conds.map((c, i) =>
              c
                ? html`<button
                    type="button"
                    onClick=${() => {
                      const tag = `C${i + 1}`;
                      onChange(v ? `${v}|${tag}` : tag);
                    }}
                    class="text-[10px] px-1 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-200 hover:bg-indigo-200 font-mono"
                    title=${c}
                  >${`C${i + 1}`}</button>`
                : null
            )}
          </div>`}
      ${conds.some((c) => c) &&
      html`<details class="mt-1 text-xs text-gray-600">
            <summary class="cursor-pointer select-none">${isRu ? 'Что записано в ячейках' : 'What the cells contain'}</summary>
            <div class="mt-1 space-y-0.5 font-mono">
              ${conds.map((c, i) =>
                c ? html`<div><span class="font-bold text-indigo-800">${`C${i + 1}`}</span>: ${c}</div>` : null
              )}
            </div>
          </details>`}
      <p class="text-gray-500 text-xs mt-1">${condHint(isRu)}</p>
      ${free !== null &&
      html`<p class="text-xs mt-1 ${free <= 2 ? 'text-amber-600' : 'text-gray-400'}">
            ${isRu
              ? `Свободных выражений: ${free} из ${pool.total} (одинаковые условия не занимают новое место)`
              : `Free expression slots: ${free} of ${pool.total} (identical conditions do not take a new slot)`}
          </p>`}
    </div>
  `;
}
