// Индикаторы связи HA / Z2M / CD для шапки. Данные: commonData.lk из /api/state/common
// lk.c - код диагностики Z2M (z2m_diag_t), lk.h - состояние HA, lk.g - шлюз в режиме Hub
// Если на светлой теме подсветка слишком слабая или слишком сильная, меняются два числа в GLOW_CSS: 0.10 (фон) и 0.28 (ореол)
import { html, useState, useEffect, useContext, useRef } from './bundle.js';
import { StateContext } from './context.js';
import { lastPollActivity } from './pollQueue.js';

const STALE_MS = 15000;

const TXT = {
  ru: {
    names: { HA: 'Home Assistant', Z2M: 'Zigbee2MQTT', CD: 'Zigbee-координатор' },
    status: 'Статус', reason: 'Причина',
    ok: 'подключён', lost: 'нет связи', unknown: 'неизвестно', check: 'проверка', off: 'не используется',
    whyCtrl: 'нет ответа от контроллера',
    whyNoData: 'данные ещё не получены',
    whyHaNone: 'адрес Home Assistant не задан в настройках',
    whyHaLost: 'Home Assistant не отвечает (проверьте IP и порт)',
    whyHaTcp: 'порт открыт, но ответ не HTTP (вероятно, включён HTTPS)',
    whyHaGw: 'прокси сообщает, что Home Assistant недоступен',
    whyHaNoTcp: 'TCP-соединение не установлено (проверьте IP, порт и брандмауэр)',
    whyHaTimeout: 'Home Assistant не ответил за 5 секунд',
    whyZ2mOff: 'режим Zigbee2MQTT выключен в настройках',
    whyMqtt: {
      1: 'нет связи с MQTT-брокером', 2: 'неверный адрес MQTT-брокера',
      3: 'порт MQTT-брокера закрыт', 4: 'неверный логин или пароль MQTT',
      5: 'таймаут подключения к MQTT-брокеру', 6: 'Zigbee2MQTT не публикует своё состояние',
    },
    whyStopped: 'Zigbee2MQTT сообщает: мост остановлен',
    whyCdNoZ2m: 'нет связи с Zigbee2MQTT',
    whyCdWait: 'ожидание данных от Zigbee2MQTT',
    whyCdHub: 'координатор не подключён к встроенному MQTT-брокеру',
    whyCdHubNone: 'состояние координатора не определено',
    aria: 'Состояние связи',
  },
  en: {
    names: { HA: 'Home Assistant', Z2M: 'Zigbee2MQTT', CD: 'Zigbee coordinator' },
    status: 'Status', reason: 'Reason',
    ok: 'connected', lost: 'no connection', unknown: 'unknown', check: 'checking', off: 'not used',
    whyCtrl: 'no response from the controller',
    whyNoData: 'data not received yet',
    whyHaNone: 'Home Assistant address is not set in settings',
    whyHaLost: 'Home Assistant does not respond (check IP and port)',
    whyHaTcp: 'port is open, but the reply is not HTTP (HTTPS is probably enabled)',
    whyHaGw: 'proxy reports that Home Assistant is unavailable',
    whyHaNoTcp: 'TCP connection failed (check IP, port and firewall)',
    whyHaTimeout: 'Home Assistant did not reply within 5 seconds',
    whyZ2mOff: 'Zigbee2MQTT mode is disabled in settings',
    whyMqtt: {
      1: 'no connection to the MQTT broker', 2: 'wrong MQTT broker address',
      3: 'MQTT broker port is closed', 4: 'wrong MQTT login or password',
      5: 'MQTT broker connection timeout', 6: 'Zigbee2MQTT does not publish its state',
    },
    whyStopped: 'Zigbee2MQTT reports: bridge stopped',
    whyCdNoZ2m: 'no connection to Zigbee2MQTT',
    whyCdWait: 'waiting for data from Zigbee2MQTT',
    whyCdHub: 'coordinator is not connected to the built-in MQTT broker',
    whyCdHubNone: 'coordinator state is not determined',
    aria: 'Link status',
  },
};

const TXT_CLS = { ok: 'text-green-700', lost: 'text-red-700', unk: 'text-slate-500' };
const BAR_CLS = { ok: 'bg-green-600', lost: 'bg-red-600', unk: 'bg-slate-400' };

/* Подсветка только на десктопе, только в СВЕТЛОЙ теме и только для зелёного и красного.
 * Серый (нет данных) без подсветки: «подсвечено» = связь известна, «не подсвечено» = нет данных.
 * В тёмной теме буквы и так контрастны, подсветки нет.
 * Подсветка - мягкое пятно ЗА буквами (фон + box-shadow), а не text-shadow:
 * контуры самих букв остаются чёткими. Стили вставлены сюда, output.css пересобирать не нужно. */
const GLOW_CSS = `
html:not([data-theme="dark"]) .lk-glow { padding: 1px 5px; border-radius: 8px; }
html:not([data-theme="dark"]) .lk-glow-ok   { background: rgba(22,163,74,0.10);  box-shadow: 0 0 7px 1px rgba(22,163,74,0.28); }
html:not([data-theme="dark"]) .lk-glow-lost { background: rgba(220,38,38,0.10);  box-shadow: 0 0 7px 1px rgba(220,38,38,0.28); }
`;
const GLOW_CLS = { ok: 'lk-glow lk-glow-ok', lost: 'lk-glow lk-glow-lost', unk: '' };

const mk = (st, status, why) => ({ st, status, why });

function buildModel(lk, stale, t) {
  if (stale || !lk) {
    const u = mk('unk', t.unknown, stale ? t.whyCtrl : t.whyNoData);
    return { HA: u, Z2M: u, CD: u };
  }
  let ha;
  if (lk.h === 1) ha = mk('ok', t.ok, lk.hi === 3 ? t.whyHaTcp : null);
  else if (lk.h === 2) {
    const why = lk.hi === 2 ? `${t.whyHaGw} (HTTP ${lk.hs})`
      : lk.hi === 4 ? t.whyHaNoTcp
      : lk.hi === 5 ? t.whyHaTimeout
      : t.whyHaLost;
    ha = mk('lost', t.lost, why);
  }
  else if (lk.h === 3) ha = mk('unk', t.check);
  else ha = mk('unk', t.unknown, t.whyHaNone);

  let z2m, cd;
  const c = lk.c;
  if (c === 0) {                       // режим Z2M выключен (Hub)
    z2m = mk('unk', t.off, t.whyZ2mOff);
    cd = lk.g === 1 ? mk('ok', t.ok)
       : lk.g === 2 ? mk('lost', t.lost, t.whyCdHub)
       : mk('unk', t.unknown, t.whyCdHubNone);
  } else if (c === 8) {                // мост online
    z2m = mk('ok', t.ok);
    cd = mk('ok', t.ok);
  } else if (c === 9) {                // MQTT есть, ждём bridge/state
    z2m = mk('unk', t.check);
    cd = mk('unk', t.unknown, t.whyCdWait);
  } else if (c === 7) {                // bridge/state = offline
    z2m = mk('lost', t.lost, t.whyStopped);
    cd = mk('lost', t.lost, t.whyStopped);
  } else {                             // 1..6: нет связи с брокером или Z2M молчит
    z2m = mk('lost', t.lost, t.whyMqtt[c] || t.whyMqtt[1]);
    cd = mk('unk', t.unknown, t.whyCdNoZ2m);
  }
  return { HA: ha, Z2M: z2m, CD: cd };
}

const tipText = (t, key, m) =>
  `${key} - ${t.names[key]}\n${t.status}: ${m.status}` + (m.why ? `\n${t.reason}: ${m.why}` : '');

/* Десктоп: буквы HA/Z2M/CD; светлая тема - мягкая подсветка за зелёным/красным, серый и тёмная тема без неё.
 * Мобильный: три вертикальные полоски без свечения (не путаются с «гамбургером» меню).
 * tooltips=false - подсказки и раскрытие по нажатию отключены.
 * offline=true - браузер потерял связь с контроллером: все полоски серые. */
export const LinkIndicators = ({ tooltips = true, offline = false }) => {
  const common = useContext(StateContext);
  const [, setTick] = useState(0);
  const [open, setOpen] = useState(false);
  const [tipTop, setTipTop] = useState(64);
  const barsRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setTick((v) => v + 1), 2000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (!open) return undefined;
    const id = setTimeout(() => setOpen(false), 6000);
    return () => clearTimeout(id);
  }, [open]);

  const t = TXT[common && common.lang === 'en' ? 'en' : 'ru'];
  const last = lastPollActivity('common');
  const stale = offline || (!document.hidden && last > 0 && Date.now() - last > STALE_MS);
  const model = buildModel(common ? common.lk : null, stale, t);
  const items = ['HA', 'Z2M', 'CD'].map((k) => ({ k, m: model[k], tip: tipText(t, k, model[k]) }));
  const ariaAll = items.map((i) => i.tip.replace(/\n/g, ', ')).join('; ');

  /* Попап позиционируется от вьюпорта (fixed), а не от контейнера полосок:
   * на Пульте справа от полосок есть ещё кнопки, и right-0 контейнера
   * выталкивал бы попап за левый край узкого экрана. Верх берём из
   * реального положения полосок (getBoundingClientRect - координаты вьюпорта). */
  const toggleOpen = () => {
    if (!open && barsRef.current) {
      const r = barsRef.current.getBoundingClientRect();
      setTipTop(Math.round(r.bottom + 6));
    }
    setOpen((v) => !v);
  };

  return html`
    <div class="relative flex items-center" role="group" aria-label=${t.aria}>
      <style>${GLOW_CSS}</style>
      <div class="hidden md:flex items-center gap-x-2 text-xs font-bold tracking-wide select-none">
        ${items.map((i) => html`
          <span key=${i.k} class=${TXT_CLS[i.m.st] + ' ' + GLOW_CLS[i.m.st]}
            title=${tooltips ? i.tip : null} aria-label=${i.tip.replace(/\n/g, ', ')}>${i.k}</span>`)}
      </div>
      <div ref=${barsRef} class="md:hidden flex flex-row items-center p-1 select-none" style=${{ gap: '3px' }} aria-label=${ariaAll}
        onclick=${tooltips ? toggleOpen : null}>
        ${items.map((i) => html`<span key=${i.k} class="block rounded-sm ${BAR_CLS[i.m.st]}" style=${{ width: '4px', height: '20px' }}></span>`)}
      </div>
      ${open && tooltips ? html`
        <div class="md:hidden fixed right-2 z-[60] w-64 max-w-[calc(100vw-16px)] rounded-lg p-3 text-xs shadow-lg
                    whitespace-pre-line border
                    bg-[#1a2332] text-[#e8f4f8] border-[rgba(0,188,188,0.35)]
                    dark:bg-[#e6eef4] dark:text-[#14202b] dark:border-[rgba(0,160,170,0.65)]"
          style=${{ top: tipTop + 'px' }}
          onclick=${() => setOpen(false)}>
          ${items.map((i) => html`<div key=${i.k} class="mb-2 last:mb-0">${i.tip}</div>`)}
        </div>` : null}
    </div>`;
};
