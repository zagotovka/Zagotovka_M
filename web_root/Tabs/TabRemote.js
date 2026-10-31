/**
 * TabRemote — «Пульт управления / Remote control».
 *
 * Одна страница со всеми разделами (ТЗ): выключатели, PWM, кнопки, Zigbee,
 * термостаты (PID), охрана и датчики. Данные — /api/state/remote (постранично,
 * единый курсор ?next=, ETag/304), команды — POST /api/remote/cmd.
 *
 * Клиентская очередь команд: на элемент — не более одной команды в полёте,
 * последнее значение побеждает, между командами Zigbee выдерживается пауза
 * 250 мс. Оптимистичное обновление интерфейса + подтверждение/откат.
 * pollQueue/safeFetch переиспользуются как есть, эмодзи и внешние запросы
 * отсутствуют.
 *
 * Защита от случайных нажатий: управление заблокировано при входе и
 * разблокируется удержанием кнопки-замка; блокировка возвращается сама через
 * UNLOCK_TTL_MS без действий и при сворачивании страницы. Любая попытка
 * изменить параметр при замке: мигание замка + тост + вибрация телефона
 * (navigator.vibrate, где поддерживается). Ползунки двигаются
 * только перетаскиванием бегунка (тап по дорожке и вертикальный свайп значение
 * не меняют). Рубрики по умолчанию свёрнуты (аккордеон).
 *
 * Связь: баннер «Нет связи с контроллером» показывается по последнему ответу
 * контроллера (lastPollActivity: 2xx/3xx/4xx, включая 304 Not Modified) — пока
 * ответы идут, связь есть, даже если данные не менялись. 5xx (прошивка отвечает
 * ошибкой, прокси отдаёт 502 вместо молчащего МК), таймауты и сетевые отказы
 * связью не считаются. Если pollQueue снял опрос после MAX_FAILS ошибок
 * подряд, сторож регистрирует его заново.
 */
import { h, useState, useEffect, useRef, html } from '../bundle.js';
import { registerPoll, unregisterPoll, isPollActive, lastPollActivity } from '../pollQueue.js';
import { postJson } from '../safeFetch.js';
import { ThemeToggle } from '../theme.js';
import { WordLogo } from '../main.js';
import '../remote.css';

// ---------------------------------------------------------------------------
// Глобальный tooltip-хелпер (портал в document.body, position:fixed)
// Инициализируется один раз, работает для всех [data-tip] на странице.
// Цвета инвертируются относительно темы (как на странице Select pin(s)):
// светлая тема — тёмный фон с светлым текстом, тёмная — светлый фон
// с тёмным текстом, поэтому подсказка видна на любом фоне.
// ---------------------------------------------------------------------------
function initGlobalTooltip() {
  if (document.__tipInited) return;
  document.__tipInited = true;

  const tip = document.createElement('div');
  tip.id = '__global_tip';
  Object.assign(tip.style, {
    position:      'fixed',
    zIndex:        '99999',
    maxWidth:      '280px',
    background:    '#1a2332',
    color:         '#e8f4f8',
    padding:       '8px 12px',
    borderRadius:  '8px',
    border:        '1px solid rgba(0,188,188,0.35)',
    fontSize:      '12px',
    lineHeight:    '1.6',
    boxShadow:     '0 6px 20px rgba(0,0,0,0.45)',
    pointerEvents: 'none',
    whiteSpace:    'normal',
    display:       'none',
    transition:    'opacity 0.12s ease',
    opacity:       '0',
  });
  document.body.appendChild(tip);

  let hideTimer = null;

  function show(el) {
    clearTimeout(hideTimer);
    tip.innerHTML = el.dataset.tip;
    const darkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
    tip.style.background = darkTheme ? '#e6eef4' : '#1a2332';
    tip.style.color      = darkTheme ? '#14202b' : '#e8f4f8';
    tip.style.border     = darkTheme ? '1px solid rgba(0,160,170,0.65)' : '1px solid rgba(0,188,188,0.35)';
    tip.style.boxShadow  = darkTheme ? '0 6px 22px rgba(0,0,0,0.65)' : '0 6px 20px rgba(0,0,0,0.45)';
    tip.style.display = 'block';

    tip.style.opacity = '0';
    tip.style.left = '0px';
    tip.style.top  = '0px';

    requestAnimationFrame(() => {
      const tw = tip.offsetWidth;
      const th = tip.offsetHeight;
      const vw = window.innerWidth;
      const r  = el.getBoundingClientRect();

      let left = r.left + r.width / 2 - tw / 2;
      left = Math.max(8, Math.min(left, vw - tw - 8));

      let top = r.top - th - 8;
      if (top < 8) top = r.bottom + 8;

      tip.style.left    = left + 'px';
      tip.style.top     = top  + 'px';
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

  // Touch screens: tap on an element with a tooltip shows it, tap elsewhere hides it
  document.addEventListener('click', e => {
    if (!window.matchMedia('(pointer: coarse)').matches) return;
    const el = e.target.closest('[data-tip]');
    if (el) show(el); else hide();
  });
}
// ---------------------------------------------------------------------------

const CMD_MIN_INTERVAL_MS = 250; // пауза между командами (Zigbee throttle)
const UNLOCK_TTL_MS = 20000;    // автоблокировка управления без действий
const HOLD_MS = 600;            // удержание кнопки-замка для разблокировки
const ACCORDION_EXCLUSIVE = true; // true: открыта одна рубрика, false: можно несколько
const THUMB_PX = 22;            // видимый диаметр бегунка ползунка
const THUMB_HIT_PX = 44;        // зона касания бегунка
const OFFLINE_AFTER_MS = 15000; // ответов от контроллера нет дольше — «нет связи»
const OFFLINE_CHECK_MS = 5000;  // как часто проверяем наличие ответов
const WATCHDOG_MS = 10000;      // перерегистрация опроса, если его сняли в pollQueue
const BLOCK_VIBRATE = [80, 60, 80]; // вибрация при попытке изменить заблокированное

const fsElement = () => document.fullscreenElement || document.webkitFullscreenElement || null;
const fsSupported = () => {
  const el = document.documentElement;
  return !!(el.requestFullscreen || el.webkitRequestFullscreen);
};

/* Вибрация на телефоне при попытке изменить заблокированное управление:
 * красный мигающий замок и тост слышит не каждый, а тактильный отклик
 * чувствуется сразу. navigator.vibrate() поддерживают Android-браузеры,
 * в iOS Safari метода нет, а часть окружений бросает исключение на вызове —
 * оба случая не должны ронять обработчик. */
const vibrateBlocked = () => {
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate(BLOCK_VIBRATE);
    }
  } catch (_) { /* вибрация недоступна — предупреждение видно на экране */ }
};

const T = {
  ru: {
    title: 'Пульт управления',
    exit: 'Выйти в интерфейс',
    empty: 'Нет настроенных устройств',
    offline: 'Нет связи с контроллером',
    wait: 'ожидает',
    ok: 'подтверждено',
    err: 'не подтверждено',
    err400: 'неверная команда',
    err403: 'устройство отключено',
    err409: 'идёт автотюн PID',
    err429: 'слишком часто, повторите',
    err503: 'занято, повторите',
    errNet: 'нет связи',
    on: 'Вкл',
    off: 'Выкл',
    lock: 'занято автотюном',
    disabled: 'отключено',
    targets: 'цели',
    scene: 'Сценарий',
    secMain: 'Охрана (основной выключатель)',
    color: 'Цвет',
    colorPick: 'свой цвет',
    setpoint: 'Уставка',
    current: 'Текущая',
    t: 'Т',
    h: 'Вл',
    noSensor: 'нет данных',
    sw: 'Выключатели',
    pw: 'Яркость PWM',
    bt: 'Кнопки',
    zb: 'Устройства Zigbee',
    pd: 'Термостаты',
    sc: 'Охрана',
    ow: 'Датчики',
    sclick: '1 наж.',
    dclick: '2 наж.',
    lpress: 'долг.',
    lockedMsg: 'Управление заблокировано для защиты от случайных касаний. Удерживайте замок, чтобы разблокировать',
    holdUnlock: 'Удерживайте, чтобы разблокировать',
    lockNow: 'Заблокировать',
    fsEnter: 'На весь экран',
    fsExit: 'Выйти из полноэкранного режима'
  },
  en: {
    title: 'Remote control',
    exit: 'Back to interface',
    empty: 'No devices configured',
    offline: 'No connection to controller',
    wait: 'pending',
    ok: 'confirmed',
    err: 'not confirmed',
    err400: 'invalid command',
    err403: 'device is disabled',
    err409: 'PID autotune running',
    err429: 'too often, retry',
    err503: 'busy, retry',
    errNet: 'no connection',
    on: 'On',
    off: 'Off',
    lock: 'locked by autotune',
    disabled: 'disabled',
    targets: 'targets',
    scene: 'Scene',
    secMain: 'Security (main switch)',
    color: 'Colour',
    colorPick: 'custom',
    setpoint: 'Setpoint',
    current: 'Current',
    t: 'T',
    h: 'RH',
    noSensor: 'no data',
    sw: 'Switches',
    pw: 'PWM dimmers',
    bt: 'Buttons',
    zb: 'Zigbee devices',
    pd: 'Thermostats',
    sc: 'Security',
    ow: 'Sensors',
    sclick: 'single',
    dclick: 'double',
    lpress: 'long',
    lockedMsg: 'Controls are locked to prevent accidental changes. Press and hold the lock to unlock',
    holdUnlock: 'Hold to unlock',
    lockNow: 'Lock now',
    fsEnter: 'Full screen',
    fsExit: 'Exit full screen'
  }
};

const SECTION_ORDER = ['sw', 'bt', 'pw', 'pd', 'ow', 'sc', 'zb'];

const EMPTY_SECS = { sw: [], pw: [], bt: [], zb: [], pd: [], sc: [], ow: [] };

/* Пресеты цветовой панели (CSS-градиенты, без картинок) */
const COLOR_PRESETS = [
  '#FFFFFF', '#FFD9A0', '#FF6B4A', '#FF2D55', '#FF9500',
  '#FFE24A', '#4CD964', '#34C7C7', '#007AFF', '#5856D6',
  '#AF52DE', '#8E8E93'
];

/* ── Кнопка-тумблер с тремя состояниями подтверждения ── */
const ToggleBtn = ({ on, busy, disabled, labels, onClick }) => html`
  <button
    type="button"
    class=${'rem-toggle' + (on ? ' is-on' : '') + (busy ? ' is-busy' : '')}
    disabled=${disabled}
    onClick=${onClick}
  >
    <span class="rem-toggle-knob"></span>
    <span class="rem-toggle-label">${on ? labels.on : labels.off}</span>
  </button>`;

/* ── Иконки (inline SVG, без внешних ресурсов) ── */
const IconLock = ({ open }) => html`
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="5" y="11" width="14" height="10" rx="2"/>
    ${open ? html`<path d="M8 11V8a4 4 0 0 1 7.5-2"/>` : html`<path d="M8 11V8a4 4 0 0 1 8 0v3"/>`}
  </svg>`;

const IconFs = ({ on }) => html`
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    ${on
    ? html`<path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/>`
    : html`<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>`}
  </svg>`;

/* ── Кнопка-замок: разблокировка удержанием, блокировка одним касанием ── */
const LockBtn = ({ locked, pulse, labels, onUnlock, onLock }) => {
  const tRef = useRef(0);
  const skipClick = useRef(false);
  const [holding, setHolding] = useState(false);
  useEffect(() => () => clearTimeout(tRef.current), []);

  const start = () => {
    if (!locked) return;
    skipClick.current = false;
    setHolding(true);
    clearTimeout(tRef.current);
    tRef.current = setTimeout(() => {
      skipClick.current = true; // click после отпускания пальца не должен сразу снова заблокировать
      setHolding(false);
      onUnlock();
    }, HOLD_MS);
  };
  const cancel = () => {
    clearTimeout(tRef.current);
    setHolding(false);
  };
  return html`
    <button
      type="button"
      class=${'rem-lock' + (locked ? '' : ' is-open') + (holding ? ' is-holding' : '') + (pulse ? ' is-pulse' : '')}
      style=${holding ? 'animation-duration:' + HOLD_MS + 'ms' : ''}
      data-tip=${locked ? labels.holdUnlock : labels.lockNow}
      aria-label=${locked ? labels.holdUnlock : labels.lockNow}
      aria-pressed=${!locked}
      onPointerDown=${start}
      onPointerUp=${cancel}
      onPointerLeave=${cancel}
      onPointerCancel=${cancel}
      onContextMenu=${(e) => e.preventDefault()}
      onKeyDown=${(e) => {
      if (locked && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onUnlock(); }
    }}
      onClick=${() => {
      if (skipClick.current) { skipClick.current = false; return; }
      if (!locked) onLock();
    }}
    >
      <${IconLock} open=${!locked} />
      <span class="rem-lock-fill" style=${holding ? 'animation-duration:' + HOLD_MS + 'ms' : ''}></span>
    </button>`;
};

/* ── Ползунок: значение меняется только перетаскиванием бегунка ──
 * Тап по дорожке значение не меняет, вертикальный жест над дорожкой
 * прокручивает страницу (touch-action: pan-y). Бегунок двигается
 * относительно точки касания, отправка команды - при отпускании. */
const RemSlider = ({ value, disabled, locked, onBlocked, onCommit }) => {
  const [v, setV] = useState(value);
  const [drag, setDrag] = useState(false);
  const trackRef = useRef(null);
  const gest = useRef({ x0: 0, v0: 0, vv: 0 });
  useEffect(() => { if (!drag) setV(value); }, [value, drag]);

  const clamp = (n) => Math.max(0, Math.min(100, Math.round(n)));

  const onDown = (e) => {
    if (disabled) return;
    if (locked) { onBlocked(); return; }
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    gest.current = { x0: e.clientX, v0: v, vv: v };
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) { /* ignore */ }
    setDrag(true);
  };
  const onMove = (e) => {
    if (!drag) return;
    const w = trackRef.current ? trackRef.current.getBoundingClientRect().width - THUMB_PX : 0;
    if (w <= 0) return;
    const nv = clamp(gest.current.v0 + ((e.clientX - gest.current.x0) / w) * 100);
    gest.current.vv = nv;
    setV(nv);
  };
  const finish = (commit) => (e) => {
    if (!drag) return;
    setDrag(false);
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch (_) { /* ignore */ }
    const nv = gest.current.vv;
    if (commit && nv !== value) onCommit(nv); else setV(value);
  };
  const onKey = (e) => {
    if (disabled) return;
    const step = e.shiftKey ? 10 : 1;
    let nv = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') nv = clamp(v + step);
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') nv = clamp(v - step);
    else if (e.key === 'Home') nv = 0;
    else if (e.key === 'End') nv = 100;
    if (nv === null) return;
    e.preventDefault();
    if (locked) { onBlocked(); return; }
    setV(nv);
    onCommit(nv);
  };

  const left = 'calc((100% - ' + THUMB_PX + 'px) * ' + (v / 100) + ' - ' + ((THUMB_HIT_PX - THUMB_PX) / 2) + 'px)';
  return html`
    <div class="rem-slider-row">
      <div
        ref=${trackRef}
        class=${'rem-slider' + (disabled ? ' is-disabled' : '') + (drag ? ' is-drag' : '')}
      >
        <div class="rem-slider-track"></div>
        <div
          class="rem-slider-thumb"
          role="slider"
          tabIndex=${disabled ? -1 : 0}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow=${v}
          aria-disabled=${disabled}
          style=${'left:' + left}
          onPointerDown=${onDown}
          onPointerMove=${onMove}
          onPointerUp=${finish(true)}
          onPointerCancel=${finish(false)}
          onContextMenu=${(e) => e.preventDefault()}
          onKeyDown=${onKey}
        ></div>
      </div>
      <span class="rem-slider-val">${v}%</span>
    </div>`;
};

/* Цвет приходит от прошивки строкой "#RRGGBB" (или числом) -> число 0xRRGGBB */
const toRgbInt = (c) => {
  if (typeof c === 'string') {
    const m = /^#?([0-9a-fA-F]{6})$/.exec(c.trim());
    return m ? parseInt(m[1], 16) : 0xffffff;
  }
  return (c >>> 0) & 0xffffff;
};

/* ── Цветовая панель: пресеты-градиенты + системный выбор цвета ── */
const ColorPanel = ({ color, disabled, locked, onBlocked, onPick, pickLabel }) => {
  const hex = '#' + ('000000' + toRgbInt(color).toString(16).toUpperCase()).slice(-6);
  return html`
    <div class="rem-colors">
      ${COLOR_PRESETS.map(
    (c) => html`<button
          type="button"
          key=${c}
          class=${'rem-swatch' + (hex === c.toUpperCase() ? ' is-active' : '')}
          style=${'background:' + c}
          disabled=${disabled}
          onClick=${() => onPick(parseInt(c.slice(1), 16))}
        ></button>`
  )}
      <label class="rem-swatch rem-swatch-pick" data-tip=${pickLabel}>
        <input
          type="color"
          value=${hex.toLowerCase()}
          disabled=${disabled}
          onClick=${(e) => { if (locked) { e.preventDefault(); onBlocked(); } }}
          onInput=${(e) => onPick(parseInt(e.target.value.slice(1), 16))}
        />
        <span>${hex}</span>
      </label>
    </div>`;
};

export function TabRemote({ }) {
  const [data, setData] = useState(null); // последний ответ сервера
  const [secs, setSecs] = useState(EMPTY_SECS);
  const [lang, setLang] = useState('ru');
  const [statuses, setStatuses] = useState({}); // key -> 'wait'|'ok'|400|403|...
  const [offline, setOffline] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const cursorRef = useRef(0);
  const mountedRef = useRef(Date.now()); // открытие страницы: fallback, пока нет ни одного ответа
  const queueRef = useRef(new Map()); // key -> job {t, id, body, prev}
  const busyRef = useRef(false);
  const seenRef = useRef(new Set()); // ключи, пришедшие за текущий проход по страницам
  const [openSecs, setOpenSecs] = useState([]); // по умолчанию все рубрики свёрнуты
  const [locked, setLocked] = useState(true);   // при входе управление заблокировано
  const [hint, setHint] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [fs, setFs] = useState(!!fsElement());
  const idleRef = useRef(0);
  const hintRef = useRef(0);

  const armIdle = () => {
    clearTimeout(idleRef.current);
    idleRef.current = setTimeout(() => setLocked(true), UNLOCK_TTL_MS);
  };
  // Подсказки [data-tip] (замок, полный экран, выход и т.п.) инициализируем
  // один раз при монтировании пульта — цвета зависят от активной темы.
  useEffect(() => { initGlobalTooltip(); }, []);
  const unlock = () => { setLocked(false); armIdle(); };
  const lockNow = () => { clearTimeout(idleRef.current); setLocked(true); };
  const flashBlocked = () => {
    vibrateBlocked(); // тактильный отклик: предупреждение чувствуется, а не только видно
    setHint(true);
    setPulse(true);
    clearTimeout(hintRef.current);
    hintRef.current = setTimeout(() => { setHint(false); setPulse(false); }, 2500);
  };

  useEffect(() => {
    const onVis = () => { if (document.hidden) { clearTimeout(idleRef.current); setLocked(true); } };
    const onFs = () => setFs(!!fsElement());
    document.addEventListener('visibilitychange', onVis);
    document.addEventListener('fullscreenchange', onFs);
    document.addEventListener('webkitfullscreenchange', onFs);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      document.removeEventListener('fullscreenchange', onFs);
      document.removeEventListener('webkitfullscreenchange', onFs);
      clearTimeout(idleRef.current);
      clearTimeout(hintRef.current);
      /* при уходе со страницы пульта выходим из полноэкранного режима */
      if (fsElement()) {
        const ex = document.exitFullscreen || document.webkitExitFullscreen;
        if (ex) { const p = ex.call(document); if (p && p.catch) p.catch(() => {}); }
      }
    };
  }, []);

  /* Полный экран: запрос допустим только из обработчика касания/клика */
  const toggleFs = () => {
    if (fsElement()) {
      const ex = document.exitFullscreen || document.webkitExitFullscreen;
      if (ex) { const p = ex.call(document); if (p && p.catch) p.catch(() => {}); }
      return;
    }
    const el = document.documentElement;
    const rq = el.requestFullscreen || el.webkitRequestFullscreen;
    if (rq) {
      const p = rq.call(el, { navigationUI: 'hide' });
      if (p && p.catch) p.catch(() => {});
    }
  };

  const L = T[lang] || T.ru;

  /* ── Опрос: пагинация через ?next=, пока не придёт next == -1 ──
   * После MAX_FAILS ошибок подряд pollQueue снимает ключ и больше сам его
   * не возвращает — сторож (как в TabPid) регистрирует опрос заново, иначе
   * страница навсегда остаётся с баннером «нет связи с контроллером». */
  useEffect(() => {
    const start = () => registerPoll(
      'remote',
      () => (cursorRef.current > 0
        ? '/api/state/remote?next=' + cursorRef.current
        : '/api/state/remote'),
      (d) => {
        if (!d || d.__session_expired) return;
        setOffline(false);
        setLoaded(true);
        if (d.lang) setLang(d.lang);
        const isFirst = cursorRef.current === 0;
        const isLast = !(typeof d.next === 'number' && d.next >= 0);
        cursorRef.current = isLast ? 0 : d.next;
        const list = Array.isArray(d.items) ? d.items : [];
        const rk = (x) => x.id + (x.sub !== undefined ? '.' + x.sub : '');
        if (isFirst) seenRef.current = new Set();
        for (const w of list) {
          if (w && w.s && w.d) seenRef.current.add(w.s + ':' + rk(w.d));
        }
        const seen = isLast ? seenRef.current : null;
        setData(d);
        setSecs((prev) => {
          const out = { ...prev };
          const copied = {};
          for (const w of list) {
            const k = w && w.s;
            const it = w && w.d;
            if (!k || !it || !Array.isArray(out[k])) continue;
            if (!copied[k]) { out[k] = out[k].slice(); copied[k] = true; }
            const idx = out[k].findIndex((m) => rk(m) === rk(it));
            if (idx >= 0) out[k][idx] = it; else out[k].push(it);
          }
          /* Последняя страница прохода: убираем устройства, которых сервер
           * больше не прислал (удалены или отключены в настройках). */
          if (seen) {
            for (const k of Object.keys(out)) {
              if (out[k].some((m) => !seen.has(k + ':' + rk(m)))) {
                out[k] = out[k].filter((m) => seen.has(k + ':' + rk(m)));
              }
            }
          }
          return out;
        });
      },
      { immediate: true }
    );
    start();
    /* Сторож: после MAX_FAILS подряд ошибок pollQueue снимает ключ и сам его
     * больше не возвращает — без перерегистрации страница навсегда показывает
     * «нет связи». Повторная регистрация даёт чистый ETag, поэтому первый же
     * ответ после восстановления будет 200, а не 304. */
    const watchdog = setInterval(() => {
      if (!isPollActive('remote')) start();
    }, WATCHDOG_MS);
    return () => {
      clearInterval(watchdog);
      unregisterPoll('remote');
    };
  }, []);

  /* ── Баннер «нет связи»: ответов от контроллера нет дольше OFFLINE_AFTER_MS ──
   * Отсчёт по lastPollActivity — моменту последнего ответа контроллера
   * (2xx/3xx/4xx, включая 304 Not Modified): пока ответы идут, связь есть,
   * даже если данные стоят на месте. Раньше здесь был момент последнего
   * callback'а, а pollQueue его при 304 не вызывает — статичный пульт через
   * 15 с начинал «терять» связь, хотя всё работало. 5xx/таймаут/обрыв
   * связью не считаются: если ответов нет, баннер загорается, а сторож выше
   * возвращает опрос после MAX_FAILS. */
  useEffect(() => {
    const check = () => {
      /* При ответах 0 (ещё не было ни одного) отсчитываем от открытия страницы */
      const alive = lastPollActivity('remote') || mountedRef.current;
      setOffline(Date.now() - alive > OFFLINE_AFTER_MS);
    };
    check();
    const t = setInterval(check, OFFLINE_CHECK_MS);
    return () => clearInterval(t);
  }, []);

  /* ── Оптимистичное изменение полей элемента ── */
  const patchItem = (section, id, fields, prevFields) => {
    setSecs((prev) => {
      const arr = prev[section];
      const idx = arr.findIndex((m) => m.id === id);
      if (idx < 0) return prev;
      const it = { ...arr[idx], ...fields };
      const merged = arr.slice();
      merged[idx] = it;
      return { ...prev, [section]: merged };
    });
    return prevFields;
  };

  /* ── Очередь команд: одна в полёте, последнее значение побеждает ── */
  const pump = () => {
    if (busyRef.current) return;
    const q = queueRef.current;
    if (q.size === 0) return;
    const key = q.keys().next().value;
    const job = q.get(key);
    q.delete(key);
    busyRef.current = true;
    postJson('/api/remote/cmd', job.body)
      .then((r) => {
        if (r && r.ok) {
          setStatuses((s) => ({ ...s, [key]: 'ok' }));
          setTimeout(() => {
            setStatuses((s) => {
              const n = { ...s };
              if (n[key] === 'ok') delete n[key];
              return n;
            });
          }, 2000);
        } else {
          const code = r ? r.status : 0;
          setStatuses((s) => ({ ...s, [key]: code || 'net' }));
          if (job.revert) job.revert(); // откат оптимистичного значения
        }
      })
      .catch(() => {
        setStatuses((s) => ({ ...s, [key]: 'net' }));
        if (job.revert) job.revert();
      })
      .finally(() => {
        busyRef.current = false;
        if (q.size > 0) setTimeout(pump, CMD_MIN_INTERVAL_MS);
      });
  };

  /* cmd: {section, id, body, fields, prevFields} */
  const sendCmd = ({ section, id, body, fields, prevFields }) => {
    if (locked) { flashBlocked(); return; } // заблокировано: команда не уходит
    armIdle();
    const key = body.t + ':' + id;
    const revert = () => patchItem(section, id, prevFields, {});
    patchItem(section, id, fields, {});
    setStatuses((s) => ({ ...s, [key]: 'wait' }));
    queueRef.current.set(key, { body, revert }); // перезапись = последнее побеждает
    pump();
  };

  /* ── Обработчики команд ── */
  const toggleSwitch = (it) => {
    const nv = it.st ? 0 : 1;
    sendCmd({
      section: 'sw', id: it.id,
      body: { t: 'sw', id: it.id, v: nv },
      fields: { st: nv }, prevFields: { st: it.st }
    });
  };

  const setPwm = (it, v) => {
    if (v === it.v) return;
    sendCmd({
      section: 'pw', id: it.id,
      body: { t: 'pw', id: it.id, v },
      fields: { v }, prevFields: { v: it.v }
    });
  };

  const pressButton = (it, a) => {
    sendCmd({
      section: 'bt', id: it.id,
      body: { t: 'bt', id: it.id, a },
      fields: {}, prevFields: {}
    });
  };

  const toggleZb = (it) => {
    const nv = it.st ? 0 : 1;
    sendCmd({
      section: 'zb', id: it.id,
      body: { t: 'zb', id: it.id, on: nv },
      fields: { st: nv }, prevFields: { st: it.st }
    });
  };

  const setZbDim = (it, v) => {
    sendCmd({
      section: 'zb', id: it.id,
      body: { t: 'zb', id: it.id, v },
      fields: { v }, prevFields: { v: it.v }
    });
  };

  const setZbColor = (it, c) => {
    sendCmd({
      section: 'zb', id: it.id,
      body: { t: 'zb', id: it.id, c },
      fields: { c: c & 0xffffff }, prevFields: { c: it.c }
    });
  };

  const setPidSp = (it, sp) => {
    sendCmd({
      section: 'pd', id: it.id,
      body: { t: 'pd', id: it.id, sp },
      fields: { sp }, prevFields: { sp: it.sp }
    });
  };

  const togglePid = (it) => {
    const nv = it.on ? 0 : 1;
    sendCmd({
      section: 'pd', id: it.id,
      body: { t: 'pd', id: it.id, on: nv },
      fields: { on: nv }, prevFields: { on: it.on }
    });
  };

  const toggleSecurity = (id, on) => {
    sendCmd({
      section: 'sc', id,
      body: { t: 'sc', id, on: on ? 0 : 1 },
      fields: { on: on ? 0 : 1 }, prevFields: { on }
    });
  };

  /* ── Статус команды под карточкой ── */
  const statusLine = (key) => {
    const st = statuses[key];
    if (st === undefined) return null;
    const text = st === 'wait' ? L.wait
      : st === 'ok' ? L.ok
        : st === 'net' ? L.errNet
          : (L['err' + st] || (L.err + ' (' + st + ')'));
    return html`<span class=${'rem-status' + (st === 'ok' ? ' is-ok' : st === 'wait' ? ' is-wait' : ' is-err')}>${text}</span>`;
  };

  const busy = (key) => statuses[key] === 'wait';

  /* ── Карточки ── */
  const swCard = (it) => html`
    <div class="rem-card">
      <div class="rem-card-head">
        <span class="rem-card-name">${it.n || 'ID ' + it.id}${it.t ? ' · ' + it.t : ''}</span>
        ${statusLine('sw:' + it.id)}
      </div>
      <${ToggleBtn}
        on=${!!it.st}
        busy=${busy('sw:' + it.id)}
        disabled=${!it.on}
        labels=${it.on ? { on: L.on, off: L.off } : { on: L.disabled, off: L.disabled }}
        onClick=${() => it.on && toggleSwitch(it)}
      />
    </div>`;

  const pwCard = (it) => {
    const dis = !!it.lk || !it.on;
    return html`
      <div class="rem-card">
        <div class="rem-card-head">
          <span class="rem-card-name">${it.n || 'ID ' + it.id}${it.t ? ' · ' + it.t : ''}</span>
          ${statusLine('pw:' + it.id)}
        </div>
        <${RemSlider}
          value=${it.v || 0}
          disabled=${dis}
          locked=${locked}
          onBlocked=${flashBlocked}
          onCommit=${(v) => setPwm(it, v)}
        />
        ${it.lk ? html`<div class="rem-note">${L.lock}</div>` : null}
      </div>`;
  };

  const btCard = (it) => {
    const key = 'bt:' + it.id;
    const mk = (a, label, has) => html`
      <button
        type="button"
        class="rem-btn"
        disabled=${!has || busy(key)}
        onClick=${() => pressButton(it, a)}
      >${label}</button>`;
    return html`
      <div class="rem-card">
        <div class="rem-card-head">
          <span class="rem-card-name">${it.n || 'ID ' + it.id}${it.t && it.t !== it.n ? ' · ' + it.t : ''}</span>
          ${statusLine(key)}
        </div>
        <div class="rem-btn-row">
          ${mk(0, L.sclick, it.sc)}${mk(1, L.dclick, it.dc)}${mk(2, L.lpress, it.lp)}
        </div>
        ${it.a ? html`<div class="rem-note">${L.targets}: ${it.a}</div>` : null}
      </div>`;
  };

  const zbCard = (it) => {
    const key = 'zb:' + it.id;
    const dis = !it.on;
    return html`
      <div class="rem-card">
        <div class="rem-card-head">
          <span class="rem-card-name">${it.n || 'ID ' + it.id}</span>
          ${statusLine(key)}
        </div>
        <${ToggleBtn}
          on=${!!it.st}
          busy=${busy(key)}
          disabled=${dis}
          labels=${dis ? { on: L.disabled, off: L.disabled } : { on: L.on, off: L.off }}
          onClick=${() => !dis && toggleZb(it)}
        />
        ${(it.k === 'dim' || it.k === 'clr') ? html`
          <${RemSlider}
            value=${it.v || 0}
            disabled=${dis}
            locked=${locked}
            onBlocked=${flashBlocked}
            onCommit=${(v) => setZbDim(it, v)}
          />` : null}
        ${it.k === 'clr' ? html`
          <${ColorPanel}
            color=${it.c || 0xffffff}
            disabled=${dis}
            locked=${locked}
            onBlocked=${flashBlocked}
            onPick=${(c) => !dis && setZbColor(it, c)}
            pickLabel=${L.colorPick}
          />` : null}
      </div>`;
  };

  const pdCard = (it) => {
    const key = 'pd:' + it.id;
    return html`
      <div class="rem-card">
        <div class="rem-card-head">
          <span class="rem-card-name">${it.t || 'PID ' + it.id}</span>
          ${statusLine(key)}
        </div>
        <div class="rem-pd-row">
          <span class="rem-pd-cur">${L.current}: <b>${it.cu}</b> °C</span>
          <${ToggleBtn}
            on=${!!it.on}
            busy=${busy(key)}
            disabled=${!!it.lk}
            labels=${it.lk ? { on: L.lock, off: L.lock } : { on: L.on, off: L.off }}
            onClick=${() => !it.lk && togglePid(it)}
          />
        </div>
        <label class="rem-pd-set">
          <span>${L.setpoint}, °C</span>
          <input
            type="number" step="0.5"
            value=${it.sp}
            readOnly=${locked}
            onClick=${() => { if (locked) flashBlocked(); }}
            disabled=${!!it.lk}
            onChange=${(e) => {
      const v = parseFloat(e.target.value);
      if (!isNaN(v)) setPidSp(it, v);
    }}
          />
        </label>
      </div>`;
  };

  const scRow = (it) => html`
    <div class="rem-card rem-card-row">
      <div class="rem-card-head">
        <span class="rem-card-name">${it.n || 'ID ' + it.id}${it.t ? ' · ' + it.t : ''}</span>
        ${statusLine('sc:' + it.id)}
      </div>
      <${ToggleBtn}
        on=${!!it.on}
        busy=${busy('sc:' + it.id)}
        labels=${{ on: L.on, off: L.off }}
        onClick=${() => toggleSecurity(it.id, !!it.on)}
      />
    </div>`;

  const owRow = (it) => html`
    <div class="rem-card rem-card-row">
      <span class="rem-card-name">${it.n || 'ID ' + it.id}${typeof it.sub === 'number' ? ' #' + (it.sub + 1) : ''}${it.t ? ' · ' + it.t : ''}</span>
      <span class="rem-ow-val">
        ${it.ok
      ? html`${it.v} °C${typeof it.h === 'number' ? html` · ${L.h} ${it.h}%` : ''}`
      : html`<span class="rem-note">${L.noSensor}</span>`}
      </span>
    </div>`;

  /* count - для заголовка, render - вызывается только для раскрытой рубрики,
   * поэтому свёрнутые рубрики не строят сотни карточек. */
  const SECTIONS = [
    { k: 'sw', title: L.sw, count: secs.sw.length, render: () => secs.sw.map((it) => swCard(it)) },
    { k: 'pw', title: L.pw, count: secs.pw.length, render: () => secs.pw.map((it) => pwCard(it)) },
    { k: 'bt', title: L.bt, count: secs.bt.length, render: () => secs.bt.map((it) => btCard(it)) },
    { k: 'zb', title: L.zb, count: secs.zb.length, render: () => secs.zb.map((it) => zbCard(it)) },
    { k: 'pd', title: L.pd, count: secs.pd.length, render: () => secs.pd.map((it) => pdCard(it)) },
    {
      k: 'sc', title: L.sc, count: secs.sc.length,
      render: () => [
        ...(secs.sc.some((s) => s.id === 0)
          ? [html`<div class="rem-card rem-card-row">
              <span class="rem-card-name">${L.secMain}</span>
              <${ToggleBtn}
                on=${!!secs.sc.find((s) => s.id === 0).on}
                busy=${busy('sc:0')}
                labels=${{ on: L.on, off: L.off }}
                onClick=${() => { const m = secs.sc.find((s) => s.id === 0); toggleSecurity(0, !!m.on); }}
              />
            </div>`]
          : []),
        ...secs.sc.filter((s) => s.id !== 0).map((it) => scRow(it))
      ]
    },
    { k: 'ow', title: L.ow, count: secs.ow.length, render: () => secs.ow.map((it) => owRow(it)) }
  ].filter((s) => s.count > 0)
    .sort((a, b) => SECTION_ORDER.indexOf(a.k) - SECTION_ORDER.indexOf(b.k));

  const totalItems = SECTION_ORDER.reduce((n, k) => n + secs[k].length, 0);

  /* Активная кнопка нижнего меню = раскрытая рубрика. Не зависит от высоты
   * страницы и количества устройств в рубрике. */
  const activeSec = openSecs.length ? openSecs[openSecs.length - 1] : '';

  const scrollToSec = (k, behavior) => {
    setTimeout(() => {
      const el = document.getElementById('rem-sec-' + k);
      if (el) el.scrollIntoView({ behavior, block: 'start' });
    }, 60);
  };

  /* Тап по заголовку: раскрыть/свернуть */
  const toggleSec = (k) => {
    const isOpen = openSecs.includes(k);
    setOpenSecs((p) => (p.includes(k)
      ? p.filter((x) => x !== k)
      : (ACCORDION_EXCLUSIVE ? [k] : [...p, k])));
    if (isOpen) {
      /* после сворачивания длинного списка возвращаем заголовок в видимую зону */
      setTimeout(() => {
        const el = document.getElementById('rem-sec-' + k);
        if (el && el.getBoundingClientRect().top < 64) el.scrollIntoView({ behavior: 'auto', block: 'start' });
      }, 60);
    }
  };

  /* Нижнее меню: раскрыть рубрику и перейти к ней */
  const gotoSec = (k) => {
    setOpenSecs((p) => (ACCORDION_EXCLUSIVE ? [k] : (p.includes(k) ? p : [...p, k])));
    scrollToSec(k, 'auto');
  };

  const armIfOpen = () => { if (!locked) armIdle(); };

  return html`
    <div
      class=${'rem-wrap' + (locked ? ' is-locked' : '')}
      onPointerDown=${armIfOpen}
      onPointerUp=${armIfOpen}
    >
      <header class="rem-topbar">
        <a href="#/" class="rem-exit" data-tip=${L.exit}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M15 17l5-5-5-5"/><path d="M20 12H9"/><path d="M12 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6"/></svg>
          <span class="rem-exit-label">${L.exit}</span>
        </a>
        <div class="rem-title rem-logo">
          <${WordLogo} />
        </div>
        <div class="rem-actions">
          ${fsSupported() ? html`
            <button
              type="button"
              class=${'rem-iconbtn' + (fs ? ' is-on' : '')}
              data-tip=${fs ? L.fsExit : L.fsEnter}
              aria-label=${fs ? L.fsExit : L.fsEnter}
              onClick=${toggleFs}
            ><${IconFs} on=${fs} /></button>` : null}
          <${LockBtn}
            locked=${locked}
            pulse=${pulse}
            labels=${L}
            onUnlock=${unlock}
            onLock=${lockNow}
          />
          <div class="rem-theme">
            <${ThemeToggle} lang=${lang} />
          </div>
        </div>
      </header>

      ${offline ? html`<div class="rem-banner">${L.offline}</div>` : null}

      <main class="rem-body">
        ${loaded && totalItems === 0 ? html`
          <div class="rem-empty">${L.empty}</div>` : null}
        ${SECTIONS.map((s) => {
    const open = openSecs.includes(s.k);
    return html`
            <section id=${'rem-sec-' + s.k} key=${s.k} class=${'rem-section' + (open ? ' is-open' : '')}>
              <h2 class="rem-section-h">
                <button
                  type="button"
                  class="rem-section-head"
                  aria-expanded=${open}
                  aria-controls=${'rem-grid-' + s.k}
                  onClick=${() => toggleSec(s.k)}
                >
                  <span class="rem-chevron" aria-hidden="true"></span>
                  <span class="rem-section-title">${s.title}</span>
                  <span class="rem-count">${s.count}</span>
                </button>
              </h2>
              ${open ? html`<div class="rem-grid" id=${'rem-grid-' + s.k}>${s.render()}</div>` : null}
            </section>`;
  })}
      </main>

      ${hint ? html`<div class="rem-toast" role="status">${L.lockedMsg}</div>` : null}

      ${SECTIONS.length >= 3 ? html`
        <nav class="rem-nav">
          ${SECTIONS.map(
    (s) => html`<button type="button" class=${'rem-nav-btn' + (activeSec === s.k ? ' is-active' : '')} onClick=${() => gotoSec(s.k)}>${s.title}</button>`
  )}
        </nav>` : null}
    </div>`;
}
