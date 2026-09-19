import { ModalPid } from '../Modals/ModalPid.js';
import { h, render, useState, useEffect, useRef, useContext, html, Router } from '../bundle.js';
import { registerPoll, unregisterPoll } from '../pollQueue.js';
import { StateContext } from '../context.js';
import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';
import { MyPolzunok, Chart, DeveloperNote } from '../main.js';
import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire, rulangpid } from '../rulang.js';
import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire, enlangpid } from '../enlang.js';

// ---------------------------------------------------------------------------
// Глобальный tooltip-хелпер (портал в document.body, position:fixed)
// ---------------------------------------------------------------------------
function initGlobalTooltip() {
  if (document.__tipInited) return;
  document.__tipInited = true;

  const tip = document.createElement('div');
  tip.id = '__global_tip';
  Object.assign(tip.style, {
    position: 'fixed',
    zIndex: '99999',
    maxWidth: '280px',
    background: '#1a2332',
    color: '#e8f4f8',
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid rgba(0,188,188,0.35)',
    fontSize: '12px',
    lineHeight: '1.6',
    boxShadow: '0 6px 20px rgba(0,0,0,0.45)',
    pointerEvents: 'none',
    whiteSpace: 'normal',
    display: 'none',
    transition: 'opacity 0.12s ease',
    opacity: '0',
  });
  document.body.appendChild(tip);

  let hideTimer = null;

  function show(el) {
    clearTimeout(hideTimer);
    tip.innerHTML = el.dataset.tip;
    tip.style.display = 'block';
    tip.style.opacity = '0';
    tip.style.left = '0px';
    tip.style.top = '0px';
    requestAnimationFrame(() => {
      const tw = tip.offsetWidth;
      const th = tip.offsetHeight;
      const vw = window.innerWidth;
      const r = el.getBoundingClientRect();
      let left = r.left + r.width / 2 - tw / 2;
      left = Math.max(8, Math.min(left, vw - tw - 8));
      let top = r.top - th - 8;
      if (top < 8) top = r.bottom + 8;
      tip.style.left = left + 'px';
      tip.style.top = top + 'px';
      tip.style.opacity = '1';
    });
  }

  function hide() {
    hideTimer = setTimeout(() => {
      tip.style.opacity = '0';
      setTimeout(() => { tip.style.display = 'none'; }, 120);
    }, 80);
  }

  document.addEventListener('mouseover', e => {
    const el = e.target.closest('[data-tip]');
    if (el) show(el);
  });
  document.addEventListener('mouseout', e => {
    const el = e.target.closest('[data-tip]');
    if (el) hide();
  });
}
// ---------------------------------------------------------------------------

// =============================================================================
//  ПРЕСЕТЫ PID И СПРАВКА — всё в этом файле.
//
//  Где что искать (Ctrl+F):
//    PID_PRESETS   — таблица пресетов (числа должны совпадать с pid_presets[] в zagotovka.c)
//    USE_CASES     — таблица «что регулирую -> какой пресет»
//    PresetHint    — подсказка под списком «Presets» в окне Edit (передаётся в ModalPid)
//    const HELP    — ТЕКСТЫ СПРАВКИ (русский и английский), правьте здесь
//    PidHelp       — сборка справки из разделов; показывается кнопкой «Как это работает? Справка»
// =============================================================================
/* =============================================================================
 * Пресеты PID-регулятора — единый источник для TabPid.js и ModalPid.js.
 *
 * ВАЖНО: tmin / tmax / pwmMax / tsSec ДОЛЖНЫ совпадать с таблицей pid_presets[]
 * в прошивке (Core/Src/zagotovka.c). Если меняете числа там — меняйте и здесь.
 *
 * Как прошивка использует пороги (проверено по коду):
 *   - T >= tmax                     -> выход PID выключается (и автотюн падает в Error)
 *   - автотюн не стартует, если     tset >= tmax, или (tmax - tset) < 2, или tset <= tmin
 *   - значит допустимая уставка:    tmin < tset <= tmax - 2
 *   - tmax / tmin из веб-интерфейса изменить нельзя — они приходят только с пресетом
 *
 * cap — верхний предел, который сужает допустимую уставку из-за датчика
 *       (DS18B20 не измеряет выше +125 °C).
 * ========================================================================== */
const PID_PRESETS = [
  {
    id: '1', kind: 'heat', tmin: -55, tmax: 150, cap: 120, pwmMax: 100, tsSec: 1, dht: false,
    ru: {
      name: 'Паяльная станция',
      use: 'Быстрый нагрев небольшой металлической детали: термоплатформа, подогрев, сушилка. Быстро реагирует, разрешена полная мощность.',
      note: 'Датчик DS18B20 не измеряет выше +125 °C, поэтому задавайте не больше 120 °C. Работает только с DS18B20.',
    },
    en: {
      name: 'Soldering station',
      use: 'Fast heating of a small metal part: hot plate, preheater, dryer. Reacts quickly, full power is allowed.',
      note: 'The DS18B20 sensor cannot measure above +125 °C, so do not set more than 120 °C. Works with DS18B20 only.',
    },
  },
  {
    id: '2', kind: 'cool', tmin: -55, tmax: 70, pwmMax: 100, tsSec: 1, dht: false,
    ru: {
      name: 'Кулер / вентилятор',
      use: 'Охлаждение: чем горячее объект, тем быстрее крутится вентилятор. Радиатор, блок питания, шкаф с электроникой.',
      note: 'Работает «наоборот»: чем выше температура, тем больше мощность. Не подключайте к нагревателю! Датчик ставьте на охлаждаемый объект. Только DS18B20.',
    },
    en: {
      name: 'Cooler / fan',
      use: 'Cooling: the hotter the object, the faster the fan spins. Heatsink, power supply, electronics cabinet.',
      note: 'Works in reverse: the higher the temperature, the more power. Never connect it to a heater! Put the sensor on the object being cooled. DS18B20 only.',
    },
  },
  {
    id: '3', kind: 'heat', tmin: 0, tmax: 120, pwmMax: 100, tsSec: 1, dht: false,
    ru: {
      name: '3D‑принтер (стол)',
      use: 'Нагрев с полной мощностью и быстрым откликом. Стол 3D‑принтера: PLA около 60 °C, PETG около 80 °C, ABS около 100 °C.',
      note: 'Это же ближайший пресет для водяного ТЭНа, бойлера и бака с водой (до 118 °C). Работает только с DS18B20.',
    },
    en: {
      name: '3D printer (bed)',
      use: 'Heating at full power with a fast response. 3D printer bed: PLA about 60 °C, PETG about 80 °C, ABS about 100 °C.',
      note: 'This is also the closest preset for a water heating element, boiler or water tank (up to 118 °C). Works with DS18B20 only.',
    },
  },
  {
    id: '4', kind: 'cool', tmin: -55, tmax: 60, pwmMax: 100, tsSec: 2, dht: true,
    ru: {
      name: 'Форточка / вентиляция',
      use: 'Охлаждение проветриванием: чем жарче в помещении, тем сильнее открывается форточка или быстрее крутится вентилятор. Реакция плавная.',
      note: 'Работает «наоборот»: чем выше температура, тем больше мощность. Не подключайте к нагревателю!',
    },
    en: {
      name: 'Window / ventilation',
      use: 'Cooling by ventilation: the hotter the room, the wider the window opens or the faster the fan spins. Smooth response.',
      note: 'Works in reverse: the higher the temperature, the more power. Never connect it to a heater!',
    },
  },
  {
    id: '5', kind: 'heat', tmin: 0, tmax: 40, pwmMax: 70, tsSec: 5, dht: true,
    ru: {
      name: 'Тёплый пол',
      use: 'Медленный нагрев пола: нагревательный кабель или мат. Мощность ограничена 70 %, чтобы не перегреть стяжку и покрытие.',
      note: 'Обычно хватает 26–32 °C. Выше 35 °C не рекомендуется для стяжки и покрытия. Датчик DS18B20 лучше положить под покрытие рядом с нагревательным кабелем.',
    },
    en: {
      name: 'Warm floor',
      use: 'Slow floor heating: heating cable or mat. Power is limited to 70 % so the screed and floor covering do not overheat.',
      note: '26–32 °C is usually enough. Above 35 °C is not recommended for the screed and floor covering. Best sensor: DS18B20 under the covering next to the heating cable.',
    },
  },
  {
    id: '6', kind: 'cool', tmin: -25, tmax: 10, pwmMax: 100, tsSec: 5, dht: true,
    ru: {
      name: 'Холодильник',
      use: 'Охлаждение компрессором. Между включениями держится пауза 3 минуты — это защита компрессора, так и должно быть.',
      note: 'Обычный холодильник 2–6 °C, морозилка около -18 °C. Работает «наоборот»: чем выше температура, тем больше мощность.',
    },
    en: {
      name: 'Refrigerator',
      use: 'Compressor cooling. A 3-minute pause is kept between starts — this protects the compressor, it is normal.',
      note: 'Regular fridge 2–6 °C, freezer about -18 °C. Works in reverse: the higher the temperature, the more power.',
    },
  },
  {
    id: '7', kind: 'heat', tmin: 15, tmax: 32, pwmMax: 60, tsSec: 3, dht: true,
    ru: {
      name: 'Аквариум',
      use: 'Подогрев воды в аквариуме. Мощность ограничена 60 %, потолок 32 °C: выше для большинства рыб опасно.',
      note: 'НЕ подходит для бойлера и водяного ТЭНа: нагрев отключится на 32 °C. Для рыб обычно 24–26 °C, не выше 28 °C. Датчик DS18B20 во влагозащищённом корпусе.',
    },
    en: {
      name: 'Aquarium',
      use: 'Aquarium water heating. Power is limited to 60 %, ceiling is 32 °C: higher is dangerous for most fish.',
      note: 'NOT suitable for a boiler or water heating element: heating shuts off at 32 °C. Fish usually need 24–26 °C, no more than 28 °C. Use a waterproof DS18B20.',
    },
  },
  {
    id: '8', kind: 'heat', tmin: 35, tmax: 40, pwmMax: 50, tsSec: 3, dht: true,
    ru: {
      name: 'Инкубатор',
      use: 'Точное поддержание температуры для инкубации яиц. Мощность ограничена 50 %, регулировка более строгая.',
      note: 'Куриные яйца: 37,5–37,8 °C. Выше 40 °C эмбрионы погибают, поэтому потолок 40 °C, а задать можно не больше 38 °C.',
    },
    en: {
      name: 'Incubator',
      use: 'Precise temperature control for egg incubation. Power is limited to 50 %, tighter regulation.',
      note: 'Chicken eggs: 37.5–37.8 °C. Above 40 °C the embryos die, so the ceiling is 40 °C and you can set no more than 38 °C.',
    },
  },
  {
    id: '9', kind: 'heat', tmin: 5, tmax: 35, pwmMax: 80, tsSec: 5, dht: true,
    ru: {
      name: 'Теплица / комната',
      use: 'Медленный нагрев воздуха: теплица, комната, гараж, погреб. Мощность до 80 %.',
      note: 'Для воздуха удобен DHT22 (он ещё измеряет влажность), для почвы или воды — DS18B20.',
    },
    en: {
      name: 'Greenhouse / room',
      use: 'Slow air heating: greenhouse, room, garage, cellar. Power up to 80 %.',
      note: 'DHT22 suits air (it also measures humidity); use DS18B20 for soil or water.',
    },
  },
];

/* Что человек хочет регулировать -> какой пресет брать */
const USE_CASES = [
  { id: '5', ru: 'Электрический тёплый пол', en: 'Electric underfloor heating' },
  { id: '3', ru: 'Водяной ТЭН, бойлер, бак с водой (30–100 °C)', en: 'Water heating element, boiler, water tank (30–100 °C)' },
  { id: '7', ru: 'Аквариум', en: 'Aquarium' },
  { id: '8', ru: 'Инкубатор', en: 'Egg incubator' },
  { id: '9', ru: 'Теплица, комната, гараж, погреб', en: 'Greenhouse, room, garage, cellar' },
  { id: '3', ru: 'Стол 3D‑принтера', en: '3D printer bed' },
  { id: '1', ru: 'Нагрев небольшой металлической детали, термоплатформа', en: 'Small metal part, hot plate' },
  { id: '2', ru: 'Вентилятор охлаждает радиатор, блок питания или шкаф', en: 'Fan cooling a heatsink, power supply or cabinet' },
  { id: '4', ru: 'Форточка или вентиляция: открывается, когда жарко', en: 'Window or ventilation: opens when it is hot' },
  { id: '6', ru: 'Холодильник, морозильная камера', en: 'Fridge, freezer' },
];

/* ---------------------------------------------------------------------------
 * Хелперы
 * ------------------------------------------------------------------------- */
const langOf = (lang) => (lang === 'ru' ? 'ru' : 'en');
const findPreset = (id) => PID_PRESETS.find((p) => p.id === String(id));

/* Максимальная уставка, которую примет автотюн (и не упрёмся в предел датчика) */
const maxSet = (p) => Math.min(p.tmax - 2, p.cap !== undefined ? p.cap : Infinity);

const NO_LOW = -55; // «нижней границы нет» (нижний предел DS18B20)

function rangeShort(p, L) {
  if (p.tmin > NO_LOW) return `${p.tmin}…${maxSet(p)}`;
  return L === 'ru' ? `до ${maxSet(p)}` : `up to ${maxSet(p)}`;
}

function rangeLong(p, L) {
  const hi = maxSet(p);
  if (L === 'ru') return p.tmin <= NO_LOW ? `до ${hi} °C` : `выше ${p.tmin}, до ${hi} °C`;
  return p.tmin <= NO_LOW ? `up to ${hi} °C` : `above ${p.tmin}, up to ${hi} °C`;
}

const KIND = {
  ru: { heat: 'нагрев', cool: 'охлаждение' },
  en: { heat: 'heating', cool: 'cooling' },
};

const SENS = {
  ru: { ds: 'только DS18B20', both: 'DS18B20 или DHT22' },
  en: { ds: 'DS18B20 only', both: 'DS18B20 or DHT22' },
};

const sensText = (p, L) => (p.dht ? SENS[L].both : SENS[L].ds);

/* Список для <select>: "5. Тёплый пол — нагрев, 0…38 °C" */
function presetOptions(lang) {
  const L = langOf(lang);
  return PID_PRESETS.map((p) => ({
    value: p.id,
    label: `${p.id}. ${p[L].name} — ${KIND[L][p.kind]}, ${rangeShort(p, L)} °C`,
  }));
}

/* Короткое имя для ячейки таблицы */
function presetName(lang, id) {
  const p = findPreset(id);
  return p ? p[langOf(lang)].name : String(id || '');
}

/* ---------------------------------------------------------------------------
 * Общие стили (inline — чтобы не зависеть от пересборки Tailwind)
 * ------------------------------------------------------------------------- */
const S = {
  h3: 'font-size:17px;font-weight:700;color:#0f172a;margin:0 0 8px 0;',
  p: 'margin:0 0 8px 0;line-height:1.6;',
  card: 'background:rgba(255,255,255,0.75);border:1px solid rgba(13,148,136,0.25);border-radius:12px;padding:14px 16px;',
  th: 'padding:10px 12px;font-weight:700;color:#334155;text-align:left;white-space:nowrap;border-bottom:1px solid rgba(13,148,136,0.25);',
  td: 'padding:9px 12px;vertical-align:top;border-bottom:1px solid rgba(148,163,184,0.25);',
  pillHeat: 'display:inline-block;padding:1px 9px;border-radius:999px;font-size:12px;font-weight:700;background:#ffedd5;color:#9a3412;',
  pillCool: 'display:inline-block;padding:1px 9px;border-radius:999px;font-size:12px;font-weight:700;background:#e0f2fe;color:#075985;',
  warn: 'margin-top:8px;padding:8px 10px;border-radius:8px;background:#fee2e2;border:1px solid #fca5a5;color:#7f1d1d;line-height:1.5;',
  info: 'margin-top:8px;padding:8px 10px;border-radius:8px;background:#fef9c3;border:1px solid #fde047;color:#713f12;line-height:1.5;',
  ok: 'margin-top:8px;padding:8px 10px;border-radius:8px;background:#dcfce7;border:1px solid #86efac;color:#14532d;line-height:1.5;',
};

const pill = (p, L) =>
  html`<span style=${p.kind === 'heat' ? S.pillHeat : S.pillCool}>${KIND[L][p.kind]}</span>`;

/* ---------------------------------------------------------------------------
 * PresetHint — живая подсказка под списком «Presets» в окне Edit
 * ------------------------------------------------------------------------- */
const HINT = {
  ru: {
    range: 'Уставку можно задать',
    power: 'Мощность не выше',
    sensor: 'Датчик',
    ceiling: 'Аварийный потолок',
    outOfRange: (t, p) =>
      `Уставка ${t} °C не подходит для этого пресета (допустимо: ${rangeLong(p, 'ru')}). Автонастройка не запустится и покажет ⚠ Error!. Выберите другой пресет или измените температуру.`,
    overCap: (p) =>
      `Датчик DS18B20 не измеряет выше +125 °C. Для этого пресета задавайте не больше ${maxSet(p)} °C.`,
    needDs: 'Для этого пресета нужен датчик DS18B20: DHT22 слишком медленный.',
    changed: 'Вы сменили пресет: после сохранения нажмите «Run tune» заново, чтобы подобрать коэффициенты.',
    inRange: 'Уставка в допустимом диапазоне.',
  },
  en: {
    range: 'Allowed set point',
    power: 'Power limit',
    sensor: 'Sensor',
    ceiling: 'Emergency ceiling',
    outOfRange: (t, p) =>
      `Set point ${t} °C does not fit this preset (allowed: ${rangeLong(p, 'en')}). Auto tune will not start and will show ⚠ Error!. Pick another preset or change the temperature.`,
    overCap: (p) =>
      `The DS18B20 sensor cannot measure above +125 °C. For this preset set no more than ${maxSet(p)} °C.`,
    needDs: 'This preset needs a DS18B20 sensor: DHT22 is too slow.',
    changed: 'You changed the preset: after saving, press "Run tune" again to recalculate the coefficients.',
    inRange: 'Set point is within the allowed range.',
  },
};

function PresetHint({ lang, presetId, tmpset, sensor, changed }) {
  const L = langOf(lang);
  const p = findPreset(presetId);
  if (!p) return null;
  const X = HINT[L];

  const t = parseFloat(String(tmpset === undefined || tmpset === null ? '' : tmpset).replace(',', '.'));
  const hasT = Number.isFinite(t);
  const outOfRange = hasT && (t <= p.tmin || t > p.tmax - 2);
  const overCap = hasT && !outOfRange && p.cap !== undefined && t > p.cap;
  const needDs = String(sensor) === '2' && !p.dht;

  return html`
    <div style=${S.card + 'margin-top:8px;font-size:13px;'}>
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px;">
        ${pill(p, L)}<b style="font-size:14px;">${p[L].name}</b>
      </div>
      <div style=${S.p}>${p[L].use}</div>
      <div style="line-height:1.7;">
        <div>${X.range}: <b>${rangeLong(p, L)}</b></div>
        <div>${X.power}: <b>${p.pwmMax} %</b></div>
        <div>${X.ceiling}: <b>${p.tmax} °C</b></div>
        <div>${X.sensor}: <b>${sensText(p, L)}</b></div>
      </div>
      <div style=${S.info}>${p[L].note}</div>
      ${outOfRange ? html`<div style=${S.warn}>${X.outOfRange(t, p)}</div>` : null}
      ${overCap ? html`<div style=${S.warn}>${X.overCap(p)}</div>` : null}
      ${needDs ? html`<div style=${S.warn}>${X.needDs}</div>` : null}
      ${hasT && !outOfRange && !overCap && !needDs ? html`<div style=${S.ok}>${X.inRange}</div>` : null}
      ${changed ? html`<div style=${S.info}>${X.changed}</div>` : null}
    </div>
  `;
}

/* ---------------------------------------------------------------------------
 * PidHelp — полная справка на странице «PID Controller(s)»
 * Порядок: что это -> что нужно -> что на странице -> шаги -> выбор пресета -> FAQ
 * ------------------------------------------------------------------------- */
const HELP = {
  ru: {
    whatTitle: 'Что это такое и зачем',
    what: [
      'PID-регулятор — это «умный термостат». Вы говорите, какую температуру держать, например 28 °C на тёплом полу или 37,5 °C в инкубаторе. Дальше устройство всё делает само: смотрит на датчик и решает, насколько сильно включить нагреватель (или вентилятор), чтобы нужная температура установилась и держалась ровно.',
      'Это похоже на круиз-контроль в машине: вы называете скорость, а он сам плавно добавляет и убавляет газ. Обычный термостат только включает и выключает нагрев, поэтому температура качается вверх-вниз. PID-регулятор подбирает мощность в процентах (например, 35 %), поэтому температура держится ровнее и не перегревается.',
      'Подходит для тёплого пола, аквариума, инкубатора, теплицы, бойлера, вентилятора охлаждения, холодильника.',
    ],

    needTitle: 'Что нужно заранее',
    need: [
      ['Нагреватель или вентилятор', 'Он подключается к выводу (пину), который настроен как PWM. Пин настраивается на странице «Select pin».'],
      ['Датчик температуры', 'DS18B20 (щуп на проводе: подходит для воды, пола, металла) или DHT‑22 (измеряет воздух и влажность). Датчик добавляется на странице «OneWire pin».'],
      ['Эта страница', 'Здесь вы говорите регулятору, какую температуру держать.'],
    ],
    needNote: 'Если первого или второго ещё нет, сначала настройте их: без нагревателя нечем греть, а без датчика нечем мерить.',

    pageTitle: 'Что есть на этой странице',
    page: [
      ['No', 'Номер регулятора в списке.'],
      ['PWM Pin', 'Что именно управляется: вывод, к которому подключён нагреватель или вентилятор.'],
      ['Sel. sensor', 'Какой датчик слушает регулятор: DS18B20 или DHT‑22.'],
      ['Dev. ser. number', 'Серийный номер датчика DS18B20, как его «имя». По нему регулятор понимает, какой из подключённых датчиков слушать. Для DHT‑22 не нужен.'],
      ['Presets', 'Готовый набор настроек под ваше устройство: тёплый пол, аквариум, инкубатор и так далее. Как выбрать, написано ниже.'],
      ['T set.', 'Температура, которую вы хотите получить. Её задаёте вы.'],
      ['T cur.', 'Температура прямо сейчас, её показывает датчик. Если тут пусто или число странное, значит датчик не работает или выбран не тот.'],
      ['Duty', 'Сколько мощности регулятор выдаёт сейчас, в процентах: 0 — не греет, 100 — на полную. Надпись OFF означает, что регулятор выключен.'],
      ['Info', 'Ваше название, например «Тёплый пол в детской».'],
      ['On/Off', 'Включатель регулятора. Пока он выключен, регулятор ничего не греет.'],
      ['Edit', 'Открывает окно настроек этого регулятора.'],
      ['Run tune', 'Автоподбор: устройство само выясняет, как быстро ваш нагреватель греет, и подстраивается под него. Красная кнопка — подбор ещё не делали, полоса — идёт подбор, зелёная — готово, мигающая «⚠ Error!» — ошибка.'],
      ['«+» и «−» внизу', 'Добавить регулятор или убрать последний.'],
    ],

    stepsTitle: 'Как настроить по шагам',
    steps: [
      'Нажмите зелёную кнопку «+» под таблицей. Появится новая строка — это ваш регулятор. Если строка уже есть, этот шаг пропустите.',
      'Нажмите «Edit» в этой строке. Это безопасно: окно только открывается, и пока вы не нажали «Save changes», ничего не меняется. Закрыть окно можно кнопкой «Close».',
      'В «PWM Pin» выберите вывод, к которому подключён ваш нагреватель или вентилятор.',
      'В «Selected sensor» выберите тип датчика. Для DS18B20 вставьте в «Dev. ser. number» его серийный номер (скопируйте на странице «OneWire pin»). Для DHT‑22 номер не нужен.',
      'В «Presets» выберите готовый вариант под своё устройство (как выбрать — в следующем разделе). Под списком появится подсказка.',
      'В «t_set» впишите температуру, которую надо держать. Подсказка под пресетом сразу покажет, если число не подходит.',
      'Включите ползунок «On/Off» и нажмите «Save changes». Теперь в таблице должна появиться температура в «T cur.»: значит, датчик работает.',
      'Нажмите красную кнопку «Run tune». Во время автоподбора устройство само включает нагреватель, даже если «On/Off» выключен, поэтому не уходите, пока не убедитесь, что всё греется безопасно. Когда кнопка станет зелёной, регулятор готов.',
    ],
    stepsNote: 'Сменили пресет или температуру? Нажмите «Run tune» заново.',

    chooseTitle: 'Какой пресет выбрать',
    rules: [
      'Нагреваете или охлаждаете? Пресеты «нагрев» включают нагреватель, когда холодно. Пресеты «охлаждение» работают наоборот: чем жарче, тем сильнее вентилятор или компрессор.',
      'Ваша температура должна попасть в диапазон «Можно задать». Если не попадает, этот пресет не подходит.',
      'Если подходят несколько, берите тот, у которого ниже аварийный потолок. Это безопаснее.',
    ],
    colUse: 'Что вы регулируете',
    colPreset: 'Пресет',
    colRange: 'Можно задать («T set.»)',
    colCeil: 'Аварийный потолок',
    colSens: 'Датчик',
    colPwr: 'Мощность не выше',

    faqTitle: 'Частые вопросы',
    faq: [
      {
        q: 'У меня тёплый пол. Что выбрать?',
        a: 'Пресет 5 «Тёплый пол». Обычно достаточно 26–32 °C, больше 38 °C задать нельзя. Датчик DS18B20 положите под покрытие рядом с нагревательным кабелем.',
      },
      {
        q: 'У меня водяной ТЭН (бойлер, бак с водой). Что выбрать?',
        a: 'Отдельного пресета для бойлера нет. Берите пресет 3 «3D‑принтер (стол)»: у него полная мощность, потолок 120 °C и уставка до 118 °C. Не берите «Аквариум»: он отключит нагрев на 32 °C. Датчик нужен влагозащищённый DS18B20 (в гильзе или прижатый к трубе). У ТЭНа обязан быть свой аппаратный термостат: программа его не заменяет.',
      },
      {
        q: 'Ничего не подходит. Что делать?',
        a: 'Выберите пресет того же типа (нагрев или охлаждение), в диапазон которого попадает ваша температура. Если такого нет, напишите разработчику: пресет можно добавить.',
      },
    ],

    numbersTitle: 'Что означают цифры в таблице пресетов',
    numbers: [
      ['Аварийный потолок', 'Если датчик показал эту температуру или выше, регулятор выключает выход. Потолок зашит в пресет, изменить его в веб-интерфейсе нельзя.'],
      ['Можно задать', 'Диапазон для «T set.». Нижняя граница не включается, а до потолка должно быть не меньше 2 °C запаса. Вне диапазона автоподбор не запустится.'],
      ['Мощность не выше', 'Ограничение выхода в процентах. Защищает от перегрева: например, тёплый пол никогда не получит больше 70 % мощности.'],
    ],

    errTitle: 'Кнопка стала красной с надписью «⚠ Error!»',
    err: [
      'Чаще всего температура «T set.» вне диапазона вашего пресета. Исправьте её или выберите другой пресет.',
      'Температура дошла до аварийного потолка. Проверьте, что датчик стоит в нужном месте, а нагреватель не греет без нагрузки.',
      'Чтобы сбросить ошибку, нажмите на кнопку ещё раз.',
      'Если в «T cur.» нет значения, проверьте датчик, провода и серийный номер.',
    ],
  },

  en: {
    whatTitle: 'What is this and what is it for',
    what: [
      'A PID controller is a "smart thermostat". You tell it which temperature to keep, for example 28 °C on a warm floor or 37.5 °C in an incubator. The device does the rest: it watches the sensor and decides how hard to run the heater (or fan) so the temperature reaches the target and stays steady.',
      'It is like cruise control in a car: you name the speed and it smoothly adds and lifts the throttle. An ordinary thermostat only switches heating on and off, so the temperature swings up and down. A PID controller picks the power in percent (say, 35 %), so the temperature stays steadier and does not overshoot.',
      'Good for underfloor heating, aquariums, incubators, greenhouses, boilers, cooling fans and refrigerators.',
    ],

    needTitle: 'What you need first',
    need: [
      ['A heater or a fan', 'It is connected to a pin that is set up as PWM. Pins are set up on the "Select pin" page.'],
      ['A temperature sensor', 'DS18B20 (a probe on a wire: good for water, floors, metal) or DHT‑22 (measures air and humidity). Sensors are added on the "OneWire pin" page.'],
      ['This page', 'Here you tell the controller which temperature to keep.'],
    ],
    needNote: 'If the first or second is missing, set them up first: without a heater there is nothing to heat with, and without a sensor there is nothing to measure with.',

    pageTitle: 'What is on this page',
    page: [
      ['No', 'The number of the controller in the list.'],
      ['PWM Pin', 'What is being controlled: the pin your heater or fan is connected to.'],
      ['Sel. sensor', 'Which sensor the controller listens to: DS18B20 or DHT‑22.'],
      ['Dev. ser. number', 'The serial number of a DS18B20 sensor, like its "name". The controller uses it to know which of the connected sensors to listen to. Not needed for DHT‑22.'],
      ['Presets', 'A ready-made set of settings for your device: warm floor, aquarium, incubator and so on. How to choose is explained below.'],
      ['T set.', 'The temperature you want to get. You set it.'],
      ['T cur.', 'The temperature right now, shown by the sensor. If it is empty or looks odd, the sensor does not work or the wrong one is selected.'],
      ['Duty', 'How much power the controller outputs now, in percent: 0 — not heating, 100 — full power. OFF means the controller is switched off.'],
      ['Info', 'Your own name, for example "Kids room warm floor".'],
      ['On/Off', 'The controller switch. While it is off, the controller heats nothing.'],
      ['Edit', 'Opens the settings window of this controller.'],
      ['Run tune', 'Auto tuning: the device works out how fast your heater warms things up and adapts to it. Red button — not tuned yet, progress bar — tuning is running, green — done, blinking "⚠ Error!" — an error.'],
      ['"+" and "−" at the bottom', 'Add a controller or remove the last one.'],
    ],

    stepsTitle: 'Step-by-step setup',
    steps: [
      'Click the green "+" button under the table. A new row appears — this is your controller. If a row already exists, skip this step.',
      'Click "Edit" in that row. It is safe: the window just opens, and nothing changes until you click "Save changes". You can close the window with the "Close" button.',
      'In "PWM Pin" choose the pin your heater or fan is connected to.',
      'In "Selected sensor" choose the sensor type. For DS18B20 paste its serial number into "Dev. ser. number" (copy it from the "OneWire pin" page). DHT‑22 needs no number.',
      'In "Presets" choose a ready-made option for your device (how to choose is in the next section). A hint appears under the list.',
      'In "t_set" type the temperature to keep. The hint under the preset immediately tells you if the number does not fit.',
      'Turn the "On/Off" switch on and click "Save changes". The table should now show a temperature in "T cur.": that means the sensor works.',
      'Click the red "Run tune" button. During auto tuning the device switches the heater on by itself, even if "On/Off" is off, so stay nearby until you are sure everything heats safely. When the button turns green, the controller is ready.',
    ],
    stepsNote: 'Changed the preset or the temperature? Press "Run tune" again.',

    chooseTitle: 'Which preset to choose',
    rules: [
      'Heating or cooling? "Heating" presets switch the heater on when it is cold. "Cooling" presets work in reverse: the hotter it gets, the harder the fan or compressor works.',
      'Your temperature must fall inside the "Allowed set point" range. If it does not, that preset does not fit.',
      'If several fit, take the one with the lower emergency ceiling. It is safer.',
    ],
    colUse: 'What you control',
    colPreset: 'Preset',
    colRange: 'Allowed set point ("T set.")',
    colCeil: 'Emergency ceiling',
    colSens: 'Sensor',
    colPwr: 'Power limit',

    faqTitle: 'Common questions',
    faq: [
      {
        q: 'I have underfloor heating. What do I choose?',
        a: 'Preset 5 "Warm floor". 26–32 °C is usually enough, you cannot set more than 38 °C. Put the DS18B20 sensor under the floor covering next to the heating cable.',
      },
      {
        q: 'I have a water heating element (boiler, water tank). What do I choose?',
        a: 'There is no dedicated boiler preset. Use preset 3 "3D printer (bed)": full power, 120 °C ceiling and a set point up to 118 °C. Do not use "Aquarium": it shuts heating off at 32 °C. You need a waterproof DS18B20 (in a sleeve or pressed against the pipe). The heating element must also have its own hardware thermostat: this software does not replace it.',
      },
      {
        q: 'Nothing fits. What now?',
        a: 'Pick a preset of the same type (heating or cooling) whose range contains your temperature. If there is none, ask the developer: a preset can be added.',
      },
    ],

    numbersTitle: 'What the numbers in the preset table mean',
    numbers: [
      ['Emergency ceiling', 'If the sensor reads this temperature or higher, the controller switches the output off. The ceiling is built into the preset and cannot be changed in the web interface.'],
      ['Allowed set point', 'The range for "T set.". The lower limit is not included, and there must be at least 2 °C of margin below the ceiling. Outside the range auto tuning will not start.'],
      ['Power limit', 'Output limit in percent. It protects against overheating: for example, a warm floor never gets more than 70 % power.'],
    ],

    errTitle: 'The button turned red and says "⚠ Error!"',
    err: [
      'Most often "T set." is outside your preset range. Fix it or choose another preset.',
      'The temperature reached the emergency ceiling. Check that the sensor is in the right place and the heater is not running with no load.',
      'To clear the error, click the button again.',
      'If "T cur." is empty, check the sensor, the wires and the serial number.',
    ],
  },
};

const SEC_STYLE =
  'background:rgba(255,255,255,0.55);border:1px solid rgba(13,148,136,0.25);border-radius:14px;padding:14px 18px;';
const SUM_STYLE = 'font-size:18px;font-weight:700;color:#0f172a;cursor:pointer;';

/* Сворачиваемый раздел. Первые разделы открыты, справочные — свёрнуты. */
const sec = (title, open, body) => html`
  <details open=${open} style=${SEC_STYLE}>
    <summary style=${SUM_STYLE}>${title}</summary>
    <div style="margin-top:12px;">${body}</div>
  </details>
`;

const OL = 'margin:0;padding-left:1.4rem;list-style:decimal;line-height:1.65;';
const UL = 'margin:0;padding-left:1.4rem;list-style:disc;line-height:1.65;';

/* Список «термин — пояснение» */
const glossary = (rows) => html`
  <div style="display:flex;flex-direction:column;gap:8px;">
    ${rows.map(
      (r) => html`
        <div style="line-height:1.6;">
          <b style="color:#0f172a;">${r[0]}</b> — ${r[1]}
        </div>
      `
    )}
  </div>
`;

function PidHelp({ lang }) {
  const L = langOf(lang);
  const X = HELP[L];

  const presetTable = html`
    <div style="overflow-x:auto;border-radius:12px;border:1px solid rgba(13,148,136,0.25);background:rgba(255,255,255,0.6);margin-top:12px;">
      <table style="width:100%;min-width:760px;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="background:rgba(13,148,136,0.10);">
            <th style=${S.th}>${X.colUse}</th>
            <th style=${S.th}>${X.colPreset}</th>
            <th style=${S.th}>${X.colRange}</th>
            <th style=${S.th}>${X.colCeil}</th>
            <th style=${S.th}>${X.colSens}</th>
            <th style=${S.th}>${X.colPwr}</th>
          </tr>
        </thead>
        <tbody>
          ${USE_CASES.map((u) => {
            const p = findPreset(u.id);
            return html`
              <tr>
                <td style=${S.td}>${u[L]}</td>
                <td style=${S.td}>
                  <div style="font-weight:700;">${p.id}. ${p[L].name}</div>
                  <div style="margin-top:3px;">${pill(p, L)}</div>
                </td>
                <td style=${S.td + 'white-space:nowrap;'}>${rangeLong(p, L)}</td>
                <td style=${S.td + 'white-space:nowrap;'}>${p.tmax} °C</td>
                <td style=${S.td}>${sensText(p, L)}</td>
                <td style=${S.td + 'white-space:nowrap;'}>${p.pwmMax} %</td>
              </tr>
            `;
          })}
        </tbody>
      </table>
    </div>
  `;

  return html`
    <div class="mytext" style="display:flex;flex-direction:column;gap:14px;font-size:15px;color:#334155;">

      ${sec(
        X.whatTitle,
        true,
        html`${X.what.map((t) => html`<p style=${S.p}>${t}</p>`)}`
      )}

      ${sec(
        X.needTitle,
        true,
        html`
          <ol style=${OL}>
            ${X.need.map(
              (n) => html`<li style="margin-bottom:6px;"><b style="color:#0f172a;">${n[0]}.</b> ${n[1]}</li>`
            )}
          </ol>
          <div style=${S.info}>${X.needNote}</div>
        `
      )}

      ${sec(X.pageTitle, true, glossary(X.page))}

      ${sec(
        X.stepsTitle,
        true,
        html`
          <ol style=${OL}>
            ${X.steps.map((t) => html`<li style="margin-bottom:8px;">${t}</li>`)}
          </ol>
          <div style=${S.info}>${X.stepsNote}</div>
        `
      )}

      ${sec(
        X.chooseTitle,
        true,
        html`
          <ol style=${OL}>
            ${X.rules.map((t) => html`<li style="margin-bottom:4px;">${t}</li>`)}
          </ol>
          ${presetTable}
        `
      )}

      ${sec(
        X.faqTitle,
        true,
        html`
          <div style="display:flex;flex-direction:column;gap:10px;">
            ${X.faq.map(
              (f) => html`
                <div style=${S.card}>
                  <div style="font-weight:700;color:#0f172a;margin-bottom:4px;">${f.q}</div>
                  <div style="line-height:1.6;">${f.a}</div>
                </div>
              `
            )}
          </div>
        `
      )}

      ${sec(X.numbersTitle, false, glossary(X.numbers))}

      ${sec(
        X.errTitle,
        false,
        html`
          <ul style=${UL}>
            ${X.err.map((t) => html`<li style="margin-bottom:4px;">${t}</li>`)}
          </ul>
        `
      )}

    </div>
  `;
}

const SENSOR_OPTIONS = [
  { value: '1', label: 'DS18B20' },
  { value: '2', label: 'DHT-22' },
];

// Максимальное число PID-слотов — фиксировано на уровне прошивки
const PID_MAX_SLOTS = 24;

// Tune state enum — совпадает с PidTuneState_e в прошивке
const TUNE_IDLE  = 0;
const TUNE_STEP  = 1;
const TUNE_BIAS  = 2;
const TUNE_DONE  = 3;
const TUNE_ERROR = 4;

// ---------------------------------------------------------------------------
// Инжект глобальных стилей для анимации мигания прогресс-бара
// ---------------------------------------------------------------------------
function initTuneStyles() {
  if (document.__tuneStylesInited) return;
  document.__tuneStylesInited = true;
  const style = document.createElement('style');
  style.textContent = `
    @keyframes tuneBlink {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0; }
    }
    .tune-blink {
      animation: tuneBlink 0.4s ease-in-out 3;
    }
    @keyframes tuneProgress {
      from { width: 0%; }
      to   { width: 100%; }
    }
  `;
  document.head.appendChild(style);
}

function TabPid({ }) {
  const [varpid, setPid] = useState(null);
  const [saveResult, setSaveResult] = useState(null);
  const formRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedPid, setSelectedPid] = useState(null);
  const [language, setLanguage] = useState('ru');
  const [showHelp, setShowHelp] = useState(false);
  const [visiblePids, setVisiblePids] = useState(0);
  const [pidline, setPidline] = useState(0);

  const isPendingOnOff = useRef(false);

  useEffect(() => {
    initGlobalTooltip();
    initTuneStyles();
  }, []);

  useEffect(() => {
    let active = true;

    registerPoll('pid', '/api/state/pid', function(data) {
      if (!active || isPendingOnOff.current) return;
      if (data !== null && data !== undefined && Array.isArray(data.pid)) {
        setPid(data.pid);
        setLanguage(data.lang || 'ru');
        if (typeof data.pidline === 'number') {
          setPidline(data.pidline);
          setVisiblePids(data.pidline);
        }
      }
    }, {immediate: true});

    return function() {
      active = false;
      unregisterPoll('pid');
    };
  }, []);

  const isFirstPidlineMount = useRef(true);
  useEffect(() => {
    if (isFirstPidlineMount.current) {
      isFirstPidlineMount.current = false;
      return;
    }
    sendPidlineToStm32(pidline);
  }, [pidline]);

  const sendPidlineToStm32 = (value) => {
    isPendingOnOff.current = true;
    fetch('/api/pidline/set', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pidline: value })
    })
      .then((response) => response.json())
      .catch((error) => console.error('Error sending PID line to stm32:', error))
      .finally(() => {
        setTimeout(() => {
          isPendingOnOff.current = false;
        }, 1500);
      });
  };

  const addPid = () => {
    if (visiblePids < PID_MAX_SLOTS) {
      const newVisible = visiblePids + 1;
      setVisiblePids(newVisible);
      setPidline(newVisible);
    }
  };

  const deletePid = () => {
    if (visiblePids > 0) {
      const newVisible = visiblePids - 1;
      setVisiblePids(newVisible);
      setPidline(newVisible);
    }
  };

  if (varpid === null) {
    return html`<div>Loading...</div>`;
  }

  const getLangObject = () => ({
    langtimers: language === 'ru' ? rulangtimers : enlangtimers,
    langpid: language === 'ru' ? rulangpid : enlangpid
  });

  const getTooltipText = (key, index) => {
    const langObject = getLangObject();
    let tooltipText =
      langObject[key] && langObject[key][index] ? langObject[key][index] : '';
    const words = tooltipText.split(' ');
    const lines = [];
    for (let i = 0; i < words.length; i += 15) {
      lines.push(words.slice(i, i + 15).join(' '));
    }
    return lines.join('<br>');
  };

  const openModal = (type, pidData) => {
    setModalType(type);
    setSelectedPid(pidData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedPid(null);
  };

  const handlePidChange = (updatedPid) => {
    console.log('handlePidChange:', updatedPid);
    setPid(varpid.map((b) => (b.id === updatedPid.id ? updatedPid : b)));

    isPendingOnOff.current = true;

    fetch('/api/pid/set', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPid),
    })
      .then(response => response.json())
      .then(data => { console.log('PID job updated successfully:', data); })
      .catch(error => { console.error('Error updating PID job:', error); })
      .finally(() => {
        setTimeout(() => {
          isPendingOnOff.current = false;
        }, 1500);
      });
  };

  // -------------------------------------------------------------------------
  // Auto Tune: запуск (Run) — отправляет команду на прошивку
  // -------------------------------------------------------------------------
  const handleRunTune = (d) => {
    const id = d.id;
    // Если уже идёт тюн — игнорируем
    const ts = d.tune_state || 0;
    if (ts === TUNE_STEP || ts === TUNE_BIAS) return;

    /* Если была ошибка — сбрасываем состояние, пользователь может попробовать снова */
    if (ts === TUNE_ERROR) {
      handleStopTune(id);
      return;
    }

    console.log('Run tune for id:', id);
    fetch('/api/pid/tune', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, action: 'start' }),
    })
      .then(response => response.json())
      .then(data => { console.log('Tune start response:', data); })
      .catch(error => { console.error('Error starting tune:', error); });
  };

  // -------------------------------------------------------------------------
  // Auto Tune: остановка (Stop) — отправляет команду на прошивку
  // -------------------------------------------------------------------------
  const handleStopTune = (id) => {
    console.log('Stop tune for id:', id);
    fetch('/api/pid/tune', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, action: 'stop' }),
    })
      .then(response => response.json())
      .then(data => { console.log('Tune stop response:', data); })
      .catch(error => { console.error('Error stopping tune:', error); });
  };

  const getPresetLabel = (value) => presetName(language, value);

  const getSensorLabel = (value) => {
    const s = SENSOR_OPTIONS.find(s => s.value === String(value));
    return s ? s.label : value;
  };

  // -------------------------------------------------------------------------
  // Th — заголовок таблицы с tooltip
  // -------------------------------------------------------------------------
  const Th = (props) => html`
    <th
      class="px-4 py-4 text-base font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${getTooltipText('langpid', props.tooltipIndex)}
    >
      ${props.title}
    </th>
  `;

  // -------------------------------------------------------------------------
  // renderPidRow — обычная функция (не компонент!), вызывается напрямую.
  // Прогресс берётся из реальных данных прошивки (d.tune_state, d.tune_progress)
  // -------------------------------------------------------------------------
  const renderPidRow = (d, index) => {
    const tuneState = d.tune_state || 0;
    const tuneProgress = d.tune_progress || 0;
    const isRunning  = (tuneState === TUNE_STEP || tuneState === TUNE_BIAS);
    const isDone     = (tuneState === TUNE_DONE);
    const isError    = (tuneState === TUNE_ERROR);

    // Кнопка Run tune / Done / Error
    const btnStyle = isDone
      ? 'background:linear-gradient(to right,#4ade80,#10b981);box-shadow:0 4px 14px rgba(16,185,129,0.4);'
      : isError
        ? 'background:linear-gradient(to right,#dc2626,#b91c1c);box-shadow:0 4px 14px rgba(220,38,38,0.5);animation:tuneBlink 1s ease-in-out infinite;'
        : 'background:linear-gradient(to right,#ef4444,#e11d48);box-shadow:0 4px 14px rgba(239,68,68,0.4);';
    const btnBaseClass = 'px-3 py-1 rounded-full text-sm font-bold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 whitespace-nowrap';

    const btnLabel = isDone ? 'Tuning Done'
                   : isError ? '⚠ Error!'
                   : 'Run tune';

    // Если тюн идёт — показываем прогресс-бар вместо строки
    if (isRunning) {
      const pctStr  = tuneProgress.toFixed(1);
      const phaseText = tuneState === TUNE_STEP ? 'Step test' : 'Bias search';
      const label   = `Auto Tune (${phaseText})… ${tuneProgress}%`;
      return html`
        <tr key=${d.id} class="${index % 2 === 1 ? 'bg-white/80' : 'bg-sky-200/40'}">
          <td colspan="11" class="px-2 py-2">
            <div style="position:relative;width:100%;height:2.5rem;border-radius:0.75rem;overflow:hidden;background:#d1d5db;box-shadow:inset 0 2px 6px rgba(0,0,0,0.12);">
              <div
                style="position:absolute;left:0;top:0;bottom:0;width:${pctStr}%;background:linear-gradient(90deg,#22c55e 0%,#16a34a 60%,#4ade80 100%);border-radius:inherit;transition:width 0.3s ease;box-shadow:0 0 14px rgba(34,197,94,0.55);"
              ></div>
              <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;user-select:none;">
                <span style="font-size:0.875rem;font-weight:700;color:#111827;white-space:nowrap;">${label}</span>
              </div>
            </div>
          </td>
          <td class="px-4 py-2 text-center">
            <button
              onclick=${() => handleStopTune(d.id)}
              class="px-3 py-1 rounded-full text-sm font-bold text-white whitespace-nowrap transition-all duration-300 hover:scale-105 active:scale-95"
              style="background:linear-gradient(to right,#f97316,#ef4444);box-shadow:0 4px 14px rgba(239,68,68,0.4);"
            >Stop</button>
          </td>
        </tr>
      `;
    }

    return html`
      <tr key=${d.id} class="${index % 2 === 1 ? 'bg-white/80' : 'bg-sky-200/40'} hover:bg-slate-200/80 transition-colors">
        <td class="px-4 py-3 text-sm text-slate-800 font-medium">${d.id}</td>
        <td class="px-4 py-3 text-sm text-slate-700 font-mono">
          ${(() => {
            const entries = Object.entries(d.pinact || {});
            if (!entries.length) return '—';
            const [pinName, pinId] = entries[0];
            return `${pinName}(${pinId})`;
          })()}
        </td>
        <td class="px-4 py-3 text-sm text-slate-700">${getSensorLabel(d.selsens)}</td>
        <td class="px-4 py-3 text-sm font-mono ${d.selsens === '1' ? 'text-slate-700' : 'text-slate-400 italic'}">${d.selsens === '1' ? (d.sernum || '—') : 'N/A'}</td>
        <td class="px-4 py-3 text-sm text-slate-700">${getPresetLabel(d.presets)}</td>
        <td class="px-4 py-3 text-sm text-slate-700 font-mono">${d.tmpset}</td>
        <td class="px-4 py-3 text-sm text-slate-700 font-mono">${d.tmpcur}</td>
        <td class="px-4 py-3 text-sm text-slate-800 font-mono ${!d.onoff ? 'text-rose-500 font-bold' : ''}">${!d.onoff ? 'OFF' : (d.duty !== undefined ? d.duty : '—')}</td>
        <td class="px-4 py-3 text-sm text-slate-600">${d.info}</td>
        <td class="px-4 py-3">
          <${MyPolzunok}
            value=${d.onoff}
            onChange=${(value) => handlePidChange({ ...d, onoff: value })}
          />
        </td>
        <td class="px-4 py-3 text-center">
          <button
            onclick=${() => openModal('edit', d)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap mr-2"
          >Edit</button>
        </td>
        <td class="px-4 py-3 text-center">
          <button
            onclick=${() => handleRunTune(d)}
            class="${btnBaseClass}"
            style="${btnStyle}"
          >${btnLabel}</button>
        </td>
      </tr>
    `;
  };

  return html`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col justify-center items-center">
      <!-- Decorative background glow -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
          PID Controller(s)
        </div>
        <div class="w-full mb-6 relative">
          ${visiblePids > 0
            ? html`
              <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6 overflow-auto">
                <div class="overflow-x-auto w-full">
                  <table class="w-full text-left border-collapse whitespace-nowrap">
                    <thead>
                      <tr class="bg-teal-600/10 border-b border-teal-600/20">
                        <${Th} title="No" tooltipIndex=${1} />
                        <${Th} title="PWM Pin" tooltipIndex=${2} />
                        <${Th} title="Sel. sensor" tooltipIndex=${3} />
                        <${Th} title="Dev. ser. number" tooltipIndex=${4} />
                        <${Th} title="Presets" tooltipIndex=${5} />
                        <${Th} title="T set." tooltipIndex=${6} />
                        <${Th} title="T cur." tooltipIndex=${7} />
                        <${Th} title="Duty" tooltipIndex=${8} />
                        <${Th} title="Info" tooltipIndex=${9} />
                        <${Th} title="On/Off" tooltipIndex=${10} />
                        <${Th} title="Action" tooltipIndex=${11} />
                        <${Th} title="Auto tune" tooltipIndex=${12} />
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-white/40">
                      ${Array.from({ length: visiblePids }, (_, index) => {
                        const pid = varpid && varpid[index] ? varpid[index] : { id: index + 1, pins: '', pinact: {}, selsens: '', sernum: '', presets: '', tmpset: '', tmpcur: '', info: '', onoff: 0, tune_state: 0, tune_progress: 0 };
                        return renderPidRow(pid, index);
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            `
            : html`<div class="flex flex-col items-center justify-center p-8 text-slate-600 font-medium text-center" style="gap:6px;line-height:1.6;">
              <div style="font-size:18px;font-weight:700;color:#0f172a;">${language === 'ru' ? 'Регуляторов пока нет' : 'No controllers yet'}</div>
              <div>${language === 'ru'
                ? 'Нажмите зелёную кнопку «+» справа внизу, чтобы добавить первый регулятор.'
                : 'Click the green "+" button at the bottom right to add your first controller.'}</div>
              <div>${language === 'ru'
                ? 'Не знаете, что это и с чего начать? Нажмите «Как это работает? Справка» слева внизу.'
                : 'Not sure what this is or where to start? Click "How does it work? Help" at the bottom left.'}</div>
            </div>`}
        </div>
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm p-4 rounded-2xl">
          <button
            class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
            onclick=${() => setShowHelp(!showHelp)}
          >
            ${showHelp
            ? (language === 'ru' ? 'Скрыть справку' : 'Hide Help')
            : (language === 'ru' ? 'Как это работает? Справка' : 'How does it work? Help')}
          </button>
          <div class="font-semibold text-slate-600 tracking-wide">
            ${varpid && (PID_MAX_SLOTS - visiblePids > 0)
            ? (language === 'ru'
                ? `Ещё доступно: ${PID_MAX_SLOTS - visiblePids} ПИД-регулятор(ов)`
                : `Still available: ${PID_MAX_SLOTS - visiblePids} PID jobs`)
            : (language === 'ru' ? 'Нет доступных ПИД-регуляторов!' : 'No available: PID jobs!')}
          </div>
          <div class="flex gap-2">
            ${visiblePids < PID_MAX_SLOTS ? html`
            <button
                class="bg-emerald-500 hover:bg-emerald-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-emerald-500/30"
                onclick=${addPid}
                title=${language === 'ru' ? 'Добавить ПИД-регулятор' : 'Add PID'}
            >+</button>
            ` : null}
            ${visiblePids > 0
              ? html`
                <button
                  class="bg-rose-500 hover:bg-rose-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-rose-500/30"
                  onclick=${deletePid}
                  title=${language === 'ru' ? 'Удалить ПИД-регулятор' : 'Remove PID'}
                >-</button>
              `
              : null}
          </div>
        </div>
      </div>

      ${showHelp && html`
        <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700 w-full">
          <${PidHelp} lang=${language} />
        </div>
      `}

      ${isModalOpen ? html`
        <${ModalPid}
          modalType=${modalType}
          page="TabPid"
          hideModal=${closeModal}
          title="Edit PID"
          selectedPid=${selectedPid}
          handlePidChange=${handlePidChange}
          language=${language}
          presetList=${presetOptions(language)}
          PresetHintComponent=${PresetHint}
          modalClass="mt-24"
        />
      ` : null}
    </div>
  `;
}

export { TabPid };

