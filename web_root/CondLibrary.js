// CondLibrary.js - панель "Библиотека условий (Conditions)": 12 общих ячеек C1..C12.
//
// Показывается на страницах Switch, Encoder и PID под таблицей и позволяет
// смотреть и править ячейки, не уходя на Global Settings. Та же библиотека
// отображается и в Global Settings (общее хранилище в прошивке).
//
// Сохранение: POST /api/mysett/set с телом {"conds":[12 строк]}. Прошивка
// (parse_mysett_json) меняет только присланные ключи, остальные настройки не
// затрагиваются; каждая непустая ячейка проверяется cond_valid(), при ошибке
// приходит 400 с текстом в поле message.
//
// Состояние хранится в модульном сторе и общее для всех экземпляров панели,
// поэтому правка видна сразу везде, где панель подключена.

import { html, useState, useEffect } from './bundle.js';
import { lockToggle } from './helpLock.js';
import { COND_MAX_LEN, validateCondExpr } from './condlib.js';

const NUM_CELLS = 12;
const OPEN_KEY = 'condlib_panel_open';

const store = {
  conds: new Array(NUM_CELLS).fill(''),
  used: new Array(NUM_CELLS).fill(0),
  pool: null,
  loaded: false,
  error: null,
  listeners: new Set(),
};

function emit() {
  store.listeners.forEach((fn) => {
    try { fn(); } catch (e) { /* слушатель мог размонтироваться */ }
  });
}

let inflight = null;

async function loadOnce() {
  try {
    const r = await fetch('/api/mysett/get', { cache: 'no-store' });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const d = await r.json();
    const c = Array.isArray(d.conds) ? d.conds : [];
    const u = Array.isArray(d.conds_used) ? d.conds_used : [];
    store.conds = Array.from({ length: NUM_CELLS }, (_, i) => (typeof c[i] === 'string' ? c[i] : ''));
    store.used = Array.from({ length: NUM_CELLS }, (_, i) => parseInt(u[i], 10) || 0);
    store.pool = d.cond_pool
      ? { used: parseInt(d.cond_pool.used, 10) || 0, total: parseInt(d.cond_pool.total, 10) || 0 }
      : null;
    store.loaded = true;
    store.error = null;
  } catch (e) {
    store.error = String((e && e.message) || e);
  } finally {
    emit();
  }
}

// Загрузить ячейки, счётчики использования и заполненность пула.
// force = true: дождаться уже идущей загрузки и выполнить новую (после записи).
export async function refreshCondLibrary(force = false) {
  if (inflight) {
    if (!force) return inflight;
    await inflight;
  }
  inflight = loadOnce().finally(() => { inflight = null; });
  return inflight;
}

// Записать одну ячейку. Перед отправкой перечитываем библиотеку, чтобы не
// затереть правку, сделанную с другой страницы или вкладки браузера.
// Возвращает { ok: true } либо { ok: false, message }.
export async function saveCondCell(index, text) {
  try {
    await refreshCondLibrary(true);
    if (!store.loaded || store.error) return { ok: false, message: store.error || 'load failed' };
    const next = store.conds.slice();
    next[index] = text;
    const r = await fetch('/api/mysett/set', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conds: next }),
    });
    let data = null;
    try { data = await r.json(); } catch (e) { data = null; }
    if (!r.ok || (data && data.status === false)) {
      return { ok: false, message: (data && data.message) || ('HTTP ' + r.status) };
    }
    await refreshCondLibrary(true);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: String((e && e.message) || e) };
  }
}

// Хук: подписка на стор. Возвращает снимок состояния.
export function useCondLibrary() {
  const [, setTick] = useState(0);
  useEffect(() => {
    const fn = () => setTick((t) => t + 1);
    store.listeners.add(fn);
    if (!store.loaded) refreshCondLibrary();
    return () => { store.listeners.delete(fn); };
  }, []);
  return store;
}

function readOpen() {
  try {
    const v = window.localStorage.getItem(OPEN_KEY);
    return v === null ? true : v === '1';
  } catch (e) {
    return true;
  }
}

function writeOpen(v) {
  try { window.localStorage.setItem(OPEN_KEY, v ? '1' : '0'); } catch (e) { /* хранилище недоступно */ }
}

const T = {
  ru: {
    title: 'Библиотека условий (Conditions)',
    sub: 'Общие ячейки C1..C12. Правка ячейки сразу меняет все места, где на неё ссылаются.',
    show: 'Показать',
    hide: 'Скрыть',
    cell: 'Ячейка',
    expr: 'Выражение',
    usedIn: 'Используется',
    places: 'мест',
    notUsed: 'не используется',
    usedTip: 'Считаются разные выражения, а не связи: несколько связей с одинаковым условием хранятся в пуле один раз и дают одно место',
    save: 'Сохранить',
    saving: 'Сохранение...',
    revert: 'Отмена',
    clear: 'Очистить',
    reset: 'сброшено (0)',
    emptyBlocks: 'пусто: связи с этой ячейкой заблокированы',
    resetHint: 'В ячейке 0: так бывает после удаления устройства, которое было в условии. Пока там 0, все связи с этой ячейкой заблокированы. Впишите новое условие.',
    selfRef: 'Ячейка ссылается сама на себя: такое условие всегда НЕТ.',
    saved: 'Сохранено',
    loading: 'Загрузка...',
    loadErr: 'Не удалось загрузить библиотеку условий',
    retry: 'Повторить',
    pool: 'Свободных выражений в пуле',
    poolNote: 'одинаковые условия хранятся один раз',
    confirmUsed: (n, c) => `Ячейка ${c} используется в ${n} местах. Изменение сразу поменяет их поведение. Сохранить?`,
    placeholder: 'Пусто. Например: D2&!D3 или T5>25.5 или Ss',
    legend: 'Буквы в условии: D - состояние устройства (выход на пине DEVICE, PWM или Zigbee-устройство), DV - значение диммера, B - кнопка (BU - не нажата, BH - удерживается), T - температурный датчик, H - датчик влажности, Sr / Ss - день / ночь, C - ссылка на ячейку библиотеки. Число после буквы - ID из первой колонки таблицы. Прежние буквы R и RV тоже работают.',
    note: [
  'Одна ячейка - одно условие, до 46 символов. Писать без запятых и пробелов.',
  'Нужно два условия сразу? Запишите каждое в свою ячейку (например C3 и C4), а в поле Condition напишите C3|C4 (верно хотя бы одно) или C3&C4 (верны оба).',
  'Вставить ячейку в поле Condition: кнопкой C1..C12 под полем (она добавляет через |) или вручную, например C3.',
  'Ячейка может ссылаться на другую ячейку, но не глубже двух уровней.',
],
  },
  en: {
    title: 'Conditions library',
    sub: 'Shared cells C1..C12. Editing a cell instantly changes every place that refers to it.',
    show: 'Show',
    hide: 'Hide',
    cell: 'Cell',
    expr: 'Expression',
    usedIn: 'Used in',
    places: 'places',
    notUsed: 'not used',
    usedTip: 'Distinct expressions are counted, not links: several links with an identical condition are stored once in the pool and count as one place',
    save: 'Save',
    saving: 'Saving...',
    revert: 'Cancel',
    clear: 'Clear',
    reset: 'reset (0)',
    emptyBlocks: 'empty: links that use this cell are blocked',
    resetHint: 'The cell holds 0: this happens after deleting a device that was used in the condition. While it holds 0, all links that use this cell are blocked. Write a new condition.',
    selfRef: 'The cell refers to itself: such a condition is always NO.',
    saved: 'Saved',
    loading: 'Loading...',
    loadErr: 'Could not load the conditions library',
    retry: 'Retry',
    pool: 'Free expression slots in the pool',
    poolNote: 'identical conditions are stored once',
    confirmUsed: (n, c) => `Cell ${c} is used in ${n} places. The change takes effect for them immediately. Save?`,
    placeholder: 'Empty. Example: D2&!D3 or T5>25.5 or Ss',
    legend: 'Letters in a condition: D - device state (output on a DEVICE pin, PWM or Zigbee device), DV - dimmer value, B - button (BU - not pressed, BH - held), T - temperature sensor, H - humidity sensor, Sr / Ss - day / night, C - reference to a library cell. The number after a letter is the ID from the first table column. The old letters R and RV still work.',
    note: [
  'One cell is one condition, up to 46 characters. Write it without commas or spaces.',
  'Need two conditions at once? Put each in its own cell (for example C3 and C4), then write C3|C4 (at least one is true) or C3&C4 (both are true) in the Condition field.',
  'To insert a cell into the Condition field, press a C1..C12 button under the field (it adds the cell with |) or type it by hand, for example C3.',
  'A cell can refer to another cell, but no deeper than two levels.',
],
  },
};

function selfRefs(text, index) {
  if (!text) return false;
  const re = new RegExp('C' + (index + 1) + '(?![0-9])');
  return re.test(text);
}

export function CondLibraryPanel({ isRu = true }) {
  const lib = useCondLibrary();
  const t = isRu ? T.ru : T.en;
  const [open, setOpen] = useState(readOpen());
  const [drafts, setDrafts] = useState({});
  const [busy, setBusy] = useState(-1);
  const [msgs, setMsgs] = useState({});

  const setMsg = (i, type, text) => setMsgs((m) => ({ ...m, [i]: { type, text } }));
  const clearMsg = (i) => setMsgs((m) => { const n = { ...m }; delete n[i]; return n; });
  const setDraft = (i, v) => {
    setDrafts((d) => ({ ...d, [i]: v }));
    clearMsg(i);
  };
  const dropDraft = (i) => setDrafts((d) => { const n = { ...d }; delete n[i]; return n; });

  const toggle = (e) => {
    lockToggle(e);
    const v = !open;
    setOpen(v);
    writeOpen(v);
  };

  const save = async (i, rawText) => {
    const text = (rawText || '').trim();
    if (validateCondExpr(text)) return;
    const used = lib.used[i] || 0;
    if (used > 0 && !window.confirm(t.confirmUsed(used, 'C' + (i + 1)))) return;
    setBusy(i);
    clearMsg(i);
    const res = await saveCondCell(i, text);
    setBusy(-1);
    if (res.ok) {
      dropDraft(i);
      setMsg(i, 'ok', t.saved);
    } else {
      setMsg(i, 'err', res.message);
    }
  };

  const freeSlots = lib.pool && lib.pool.total ? lib.pool.total - lib.pool.used : null;

  const renderRow = (i) => {
    const stored = lib.conds[i] || '';
    const hasDraft = Object.prototype.hasOwnProperty.call(drafts, i);
    const value = hasDraft ? drafts[i] : stored;
    const dirty = hasDraft && drafts[i].trim() !== stored;
    const err = validateCondExpr(value);
    const errText = err ? (isRu ? err.ru : err.en) : null;
    const used = lib.used[i] || 0;
    const isReset = stored === '0' && !dirty;
    const emptyUsed = stored === '' && used > 0 && !dirty;
    const self = selfRefs(value, i);
    const msg = msgs[i];
    const isBusy = busy === i;

    return html`
      <tr key=${i} class="border-b border-white/40 align-top">
        <td class="px-3 py-2 font-mono font-bold text-indigo-800 whitespace-nowrap">C${i + 1}</td>
        <td class="px-3 py-2 w-full">
          <input
            type="text"
            value=${value}
            maxLength=${String(COND_MAX_LEN)}
            placeholder=${t.placeholder}
            disabled=${isBusy}
            onInput=${(e) => setDraft(i, e.target.value)}
            onKeyDown=${(e) => { if (e.key === 'Enter' && dirty && !errText) save(i, value); }}
            class="border rounded p-2 w-full font-mono text-sm bg-white/80 ${errText ? 'border-red-500' : 'border-slate-300'}"
          />
          ${errText && html`<p class="text-red-500 text-xs mt-1">${errText}</p>`}
          ${!errText && self && html`<p class="text-amber-600 text-xs mt-1">${t.selfRef}</p>`}
          ${isReset && html`<p class="text-red-600 text-xs mt-1">${t.resetHint}</p>`}
          ${emptyUsed && html`<p class="text-red-600 text-xs mt-1">${t.emptyBlocks}</p>`}
          ${msg && html`<p class="text-xs mt-1 ${msg.type === 'ok' ? 'text-emerald-600' : 'text-red-600'}">${msg.text}</p>`}
        </td>
        <td class="px-3 py-2 whitespace-nowrap text-sm text-slate-600">
          ${used > 0
            ? html`<span title=${t.usedTip} class="inline-block px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-200 font-semibold">${used} ${t.places}</span>`
            : html`<span class="text-slate-400">${t.notUsed}</span>`}
          ${isReset && html`<span class="inline-block ml-1 px-2 py-0.5 rounded-md bg-red-100 text-red-700 border border-red-200 font-semibold">${t.reset}</span>`}
        </td>
        <td class="px-3 py-2 whitespace-nowrap">
          <button
            type="button"
            disabled=${!dirty || !!errText || isBusy}
            onClick=${() => save(i, value)}
            class="px-3 py-1.5 rounded-lg text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >${isBusy ? t.saving : t.save}</button>
          ${dirty && html`<button
            type="button"
            disabled=${isBusy}
            onClick=${() => { dropDraft(i); clearMsg(i); }}
            class="ml-1 px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-700 bg-white/80 border border-slate-300 hover:bg-white"
          >${t.revert}</button>`}
          ${!dirty && stored !== '' && html`<button
            type="button"
            disabled=${isBusy}
            onClick=${() => save(i, '')}
            class="ml-1 px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-700 bg-white/80 border border-slate-300 hover:bg-white"
          >${t.clear}</button>`}
        </td>
      </tr>
    `;
  };

  return html`
    <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6">
      <div class="flex items-center justify-between gap-3 p-4 cursor-pointer select-none" onClick=${toggle}>
        <div>
          <div class="text-lg font-bold text-slate-800">${t.title}</div>
          <div class="text-sm text-slate-600">${t.sub}</div>
        </div>
        <button
          type="button"
          class="px-4 py-1.5 rounded-full text-sm font-bold text-white shadow bg-gradient-to-r from-teal-400 to-cyan-500"
          onClick=${(e) => { e.stopPropagation(); toggle(e); }}
        >${open ? t.hide : t.show}</button>
      </div>
      ${open && html`
        <div class="px-4 pb-4" style="max-height:70vh;overflow-y:auto;">
          <div class="mb-3 p-3 rounded-xl bg-white/60 border border-white/70 text-sm text-slate-700 space-y-1">
            ${t.note.map((s) => html`<div>${s}</div>`)}
            <div>${t.legend}</div>
            ${freeSlots !== null && html`
              <div class=${freeSlots <= 2 ? 'text-amber-700 font-semibold' : 'text-slate-600'}>
                ${t.pool}: ${freeSlots} / ${lib.pool.total} (${t.poolNote})
              </div>`}
          </div>
          ${!lib.loaded && !lib.error && html`<div class="p-3 text-slate-500">${t.loading}</div>`}
          ${lib.error && html`
            <div class="p-3 text-red-600">
              ${t.loadErr}: ${lib.error}
              <button type="button" class="ml-2 underline font-semibold" onClick=${() => refreshCondLibrary()}>${t.retry}</button>
            </div>`}
          ${lib.loaded && html`
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-teal-600/10 border-b border-teal-600/20 text-sm text-slate-700">
                    <th class="px-3 py-2 font-bold">${t.cell}</th>
                    <th class="px-3 py-2 font-bold">${t.expr}</th>
                    <th class="px-3 py-2 font-bold">${t.usedIn}</th>
                    <th class="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  ${Array.from({ length: NUM_CELLS }, (_, i) => renderRow(i))}
                </tbody>
              </table>
            </div>
          `}
        </div>
      `}
    </div>
  `;
}