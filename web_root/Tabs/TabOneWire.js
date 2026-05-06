import { ModalEditSensor } from '../Modals/ModalEditSensor.js';
import { ModalOneWire } from '../Modals/ModalOneWire.js';
import { h, render, useState, useEffect, useRef, html, Router } from '../bundle.js';
import { safeFetch } from '../safeFetch.js';
import { wsSubscribe, wsUnsubscribe } from '../ws-client.js';
import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';
import { MyPolzunok, Chart, DeveloperNote } from '../main.js';
import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire } from '../rulang.js';
import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire } from '../enlang.js';

// ---------------------------------------------------------------------------
// Глобальный tooltip-хелпер
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
// Action helpers
// ---------------------------------------------------------------------------
const _stateLabel = (s) => s === '1' ? 'ON' : s === '0' ? 'OFF' : s === '2' ? 'TG' : (s ?? '?');
const _stateColor = (s) => s === '1' ? '#16a34a' : s === '0' ? '#dc2626' : s === '2' ? '#d97706' : '#64748b';
const _parseAction = (str) => {
  if (!str) return [];
  return str.split(',').map(p => {
    const [pin, state] = p.trim().split(':');
    return { pin: pin?.trim(), state: state?.trim() };
  }).filter(x => x.pin !== undefined && x.pin !== '');
};

const ActionBadge = ({ isUpper, isHumid, value, unit, str }) => {
  const parts = _parseAction(str);
  const arrow = (isHumid ? '💧 ' : '') + (isUpper ? '↑' : '↓');
  const borderColor = isUpper ? '#fdba74' : '#93c5fd';
  const bg = isUpper ? '#fff7ed' : '#eff6ff';
  const labelColor = isUpper ? '#9a3412' : '#1e3a5f';
  return html`
    <span style="display:inline-flex;align-items:center;gap:4px;background:${bg};border:1.5px solid ${borderColor};border-radius:10px;padding:3px 10px;font-size:12px;font-weight:600;white-space:nowrap;line-height:1.6;">
      <span style="color:${labelColor};margin-right:2px;">${arrow} ${value ?? '—'}${unit}:</span>
      ${parts.length === 0
        ? html`<span style="color:#94a3b8;">[—]</span>`
        : html`
          <span style="color:#475569;">[</span>
          ${parts.map(({ pin, state }, i) => html`
            <span>
              <span style="color:#94a3b8;font-weight:400;">id</span><span style="color:#334155;font-weight:700;">${pin}</span><span style="color:#475569;">:</span><span style="color:${_stateColor(state)};font-weight:700;">${_stateLabel(state)}</span>${i < parts.length - 1 ? html`<span style="color:#94a3b8;">,${' '}</span>` : ''}
            </span>
          `)}
          <span style="color:#475569;">]</span>
        `}
    </span>
  `;
};

// ---------------------------------------------------------------------------
// Help Content (с таблицами отслеживания изменений)
// ---------------------------------------------------------------------------
const HELP_CONTENT = {
  ru: html`
    <div style="line-height:1.8; font-size:14px; color:#334155;">
      <p style="margin-bottom:12px; font-weight:700; font-size:15px;">OneWire — справка</p>
      <p style="margin-bottom:10px;">На этой странице для каждого сенсора задайте действия, которые необходимо выполнить при достижении пределов температуры/влажности.</p>
      <p style="margin-bottom:10px;">Кнопка «copy SN» копирует уникальный серийный номер (SN) датчика DS18B20 в буфер обмена для привязки к PID-контроллеру на странице «PID controller».</p>
      <div style="margin-bottom:10px; line-height: 1.5;">
        Значение:
        <span style="display:block;"><b style="color:#16a34a;">ON</b> — включить пин при достижении порога</span>
        <span style="display:block;"><b style="color:#dc2626;">OFF</b> — выключить</span>
        <span style="display:block;"><b style="color:#d97706;">TG</b> — переключить состояние пина (toggle)</span>
      </div>
      <div>
        <h2 class="text-xl font-bold mb-2 mt-6">Отслеживание изменений</h2>
        <table class="w-full">
          <thead>
            <tr>
              <th class="border px-4 py-2">Топик</th>
              <th class="border px-4 py-2">Описание</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2 whitespace-nowrap">Swarm/tsensors/</td>
              <td class="border px-4 py-2">
                Данная страница отслеживает изменения температурных сенсоров DS18B20/DHT22 и автоматически отправляет каждое изменение по MQTT на топик: Swarm/tsensors/.
                Где "Swarm" это Ваш 'TX topic'.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  en: html`
    <div style="line-height:1.8; font-size:14px; color:#334155;">
      <p style="margin-bottom:12px; font-weight:700; font-size:15px;">OneWire — Help</p>
      <p style="margin-bottom:10px;">On this page, for each sensor, set the actions to perform when temperature/humidity limits are reached.</p>
      <p style="margin-bottom:10px;">The "copy SN" button copies the unique serial number (SN) of the DS18B20 sensor to the clipboard for linking with the PID controller on the "PID controller" page.</p>
      <div style="margin-bottom:10px; line-height: 1.5;">
        Action values:
        <span style="display:block;"><b style="color:#16a34a;">ON</b> — turn the pin on when the threshold is reached</span>
        <span style="display:block;"><b style="color:#dc2626;">OFF</b> — turn it off</span>
        <span style="display:block;"><b style="color:#d97706;">TG</b> — toggle the pin state</span>
      </div>
      <div>
        <h2 class="text-xl font-bold mb-2 mt-6">Tracking Changes</h2>
        <table class="w-full">
          <thead>
            <tr>
              <th class="border px-4 py-2">Topic</th>
              <th class="border px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2 whitespace-nowrap">Swarm/tsensors/</td>
              <td class="border px-4 py-2">
                This page tracks changes in temperature sensors DS18B20/DHT22 and automatically sends each change via MQTT to the topic: Swarm/tsensors/.
                Where "Swarm" is your 'TX topic'.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
};

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
const TabOneWire = () => {
  const [varonewire, setOneWire] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [editingOneWire, setEditingOneWire] = useState(null);
  const [language, setLanguage] = useState('ru');
  const [showHelp, setShowHelp] = useState(false);
  const [expandedPins, setExpandedPins] = useState({});

  const i18n = {
    ru: {
      colId:       'ID',
      colPin:      'Пин',
      colSensor:   'Выбранный сенсор',
      colCount:    'Кол-во сенсоров',
      colOnOff:    'Вкл/Выкл',
      colActions:  'Действия',
      noSensors:   'Нет сенсоров для этого OneWire пина.',
      noData:      'Нет данных сенсора для этого OneWire пина.',
      noPins:      'Нет настроенных OneWire пинов!',
      errFetch:    (e) => `Ошибка получения данных: ${e}`,
      edit:        'Ред.',
      showHelp:    'Показать справку',
      hideHelp:    'Скрыть справку',
      title:       'OneWire(s) pin(s)',
    },
    en: {
      colId:       'ID',
      colPin:      'Pin',
      colSensor:   'Selected sensor',
      colCount:    'Count of sensors',
      colOnOff:    'On/Off',
      colActions:  'Actions',
      noSensors:   'No connected sensors for this OneWire pin.',
      noData:      'No sensor data available for this OneWire pin.',
      noPins:      'No available pins configured as OneWire!',
      errFetch:    (e) => `Error fetching sensor data: ${e}`,
      edit:        'Edit',
      showHelp:    'Show Help',
      hideHelp:    'Hide Help',
      title:       'OneWire(s) pin(s)',
    },
  };

  const T = i18n[language] || i18n['en'];

  const togglePin = (id) => setExpandedPins(prev => ({ ...prev, [id]: !prev[id] }));
  const clean = (s) => typeof s === 'string' ? s.replace(/[^\x20-\x7E\u0400-\u04FF]/g, '') : s;

  useEffect(() => { initGlobalTooltip(); }, []);

  const refresh = () => {
    fetch('/api/onewire/get')
      .then((r) => r.json())
      .then((data) => {
        setLanguage(data.lang || 'ru');
        setOneWire(data.pins || []);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setOneWire([]);
      });
  };

  const updateSensorData = (data) => {
    if (!data) return;
    setOneWire((prevState) => prevState.map((device) => {
      const type = device.typsensor || device.typsensr;
      if (!device.sensors || ![1, 2].includes(type)) return device;
      const updatedSensors = device.sensors.map((sensor) => {
        if (type === 1) {
          const matched = data.ds18b20?.find((d) => d.addr === sensor.s_number);
          return matched ? { ...sensor, t: matched.temp } : sensor;
        } else if (type === 2) {
          const matched = data.dht22?.find((d) => d.id === device.id);
          return matched ? { ...sensor, t: matched.temp, humidity: matched.humidity } : sensor;
        }
        return sensor;
      });
      return { ...device, sensors: updatedSensors };
    }));
  };

  useEffect(() => {
    refresh();
    safeFetch('/api/temp/get', 'temp').then(updateSensorData); // initial fallback

    const wsTempId = wsSubscribe('temp', updateSensorData);
    return () => wsUnsubscribe(wsTempId);
  }, []);

  const closeModal = () => { setIsModalOpen(false); setSelectedSensor(null); setEditingOneWire(null); };

  const handleSensorUpdate = (updatedSensor) => {
    setOneWire(prev => prev.map(dev => dev.id === updatedSensor.oneWireId ? { ...dev, sensors: dev.sensors?.map(s => s.s_number === updatedSensor.s_number ? { ...s, ...updatedSensor } : s) } : dev));
    closeModal();
  };

  const openOneWireModal = (oneWire) => { setEditingOneWire(oneWire); setIsModalOpen(true); };

  const getTooltipText = (index) => {
    const langKey = language === 'ru' ? rulange1Wire : enlange1Wire;
    let tooltipText = langKey && langKey[index] ? langKey[index] : '';
    const words = tooltipText.split(' ');
    const lines = [];
    for (let i = 0; i < words.length; i += 15) lines.push(words.slice(i, i + 15).join(' '));
    return lines.join('<br>');
  };

  const Th = ({ title, tooltipIndex }) => html`
    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help" data-tip=${getTooltipText(tooltipIndex)}>
      ${title}
    </th>
  `;

  const ArrayOneWire = ({ device, index }) => {
    const isExpanded = !!expandedPins[device.id];
    const sensorType = device.typsensor || device.typsensr || 0;
    const numDevices = device.numdevices || device.numsens || 0;
    const hasChildren = sensorType !== 0 && numDevices > 0;
    return html`
      <tbody key=${'db-' + device.id}>
        <tr class="${index % 2 === 1 ? 'bg-white/80' : 'bg-sky-200/40'} hover:bg-slate-200/80 transition-colors ${hasChildren ? 'cursor-pointer' : ''}" onclick=${() => hasChildren && togglePin(device.id)}>
          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${device.id}</td>
          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${device.pins || device.pin}</td>
          <td class="px-6 py-4 text-sm text-slate-700 font-medium">${['None', 'DS18B20', 'DHT22'][sensorType]}</td>
          <td class="px-6 py-4 text-sm text-slate-700 font-medium">${numDevices}</td>
          <td class="px-6 py-4" onclick=${(e) => e.stopPropagation()}>
            <${MyPolzunok} value=${device.onoff || 0} onChange=${(v) => handleOWOnOffChange({ ...device, onoff: v })} />
          </td>
          <td class="px-6 py-4" onclick=${(e) => e.stopPropagation()}>
            <button class="text-blue-600 hover:text-blue-800 font-semibold transition-colors" onclick=${() => openOneWireModal(device)}>${T.edit}</button>
            ${hasChildren && html`<span class="ml-3 text-slate-400 text-xs">${isExpanded ? '▲' : '▼'}</span>`}
          </td>
        </tr>
        ${isExpanded && hasChildren ? html`
          <tr>
            <td colspan="6" class="px-4 py-3 bg-gradient-to-r from-cyan-50/80 via-slate-50/60 to-blue-50/80 border-t">
              <${SensorTable} d=${device} />
            </td>
          </tr>
        ` : ''}
      </tbody>
    `;
  };

  const SensorTable = ({ d }) => {
    const sensorType = d.typsensor || d.typsensr || 0;
    const numDevices = d.numdevices || d.numsens || 0;
    if (sensorType === 0 || numDevices === 0) return html`<div class="px-4 py-2 text-slate-500 font-medium">${T.noSensors}</div>`;
    
    let sensors = d.sensors || [];
    const rowBg = ['bg-cyan-50/60 border-cyan-200/50', 'bg-slate-100/70 border-slate-200/50'];

    return sensors.length > 0 && Object.keys(sensors).length > 0
      ? html`<div class="flex flex-col gap-2 w-full">${sensors.map((s, idx) => html`
          <div class="w-full flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3 rounded-xl border ${rowBg[idx % 2]} backdrop-blur-sm shadow-sm">
            ${sensorType === 2 ? html`<span class="font-mono text-base font-semibold text-teal-700">DHT22</span>` : html`
              <span class="flex items-center gap-2">
                <span class="font-mono text-base font-semibold text-slate-500">SN</span>
                <span class="font-mono text-base text-slate-700 select-all">${clean(s.s_number)}</span>
                <button class="px-4 py-1.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-teal-400 to-cyan-500" onclick=${(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(clean(s.s_number));
                  e.target.textContent = 'Copied!';
                  setTimeout(() => e.target.textContent = 'copy SN', 1500);
                }}>copy SN</button>
              </span>
            `}
            <span class="text-slate-300">|</span>
            <span class="font-bold text-cyan-700">${s.t ?? '—'}°C 🌡</span>
            ${sensorType === 2 && 'humidity' in s ? html`<span class="font-bold text-teal-600">${s.humidity}% 💧</span>` : ''}
            <span class="text-slate-300">|</span>
            <${ActionBadge} isUpper=${true} value=${s.ut} unit="°C" str=${s.action_ut} />
            <${ActionBadge} isUpper=${false} value=${s.lt} unit="°C" str=${s.action_lt} />
            <a href="#" class="ml-auto text-blue-600 font-semibold text-sm uppercase px-3 py-1 bg-white/70 rounded-lg" onclick=${(e) => {
              e.preventDefault();
              setSelectedSensor({ ...s, oneWireId: d.id, sensorType, pins: d.pins || d.pin });
              setIsModalOpen(true);
            }}>${T.edit}</a>
          </div>
        `)}</div>`
      : html`<div class="px-4 py-4 text-slate-500 font-medium bg-white/50 rounded-xl text-center w-full">${T.noData}</div>`;
  };

  const handleOneWireUpdate = (upd) => {
    setOneWire(prev => prev.map(dev => dev.id === upd.id ? upd : dev));
    closeModal();
  };

  const handleOWOnOffChange = (upd) => {
    setOneWire(prev => prev.map(dev => dev.id === upd.id ? { ...dev, onoff: upd.onoff } : dev));
  };

  return html`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col items-center">
      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 uppercase">${T.title}</div>
        <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6 overflow-auto">
          <table class="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr class="bg-teal-600/10 border-b border-teal-600/20">
                <${Th} title=${T.colId} tooltipIndex=${1} />
                <${Th} title=${T.colPin} tooltipIndex=${2} />
                <${Th} title=${T.colSensor} tooltipIndex=${3} />
                <${Th} title=${T.colCount} tooltipIndex=${4} />
                <${Th} title=${T.colOnOff} tooltipIndex=${5} />
                <${Th} title=${T.colActions} tooltipIndex=${6} />
              </tr>
            </thead>
            ${varonewire.length > 0
              ? varonewire.map((device, index) => html`<${ArrayOneWire} device=${device} index=${index} key=${device.id} />`)
              : html`<tbody><tr><td colspan="6" class="px-4 py-2">${error ? T.errFetch(error) : T.noPins}</td></tr></tbody>`}
          </table>
        </div>
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 p-4 rounded-2xl">
          <button class="px-8 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-teal-400 to-cyan-500" onclick=${() => setShowHelp(!showHelp)}>
            ${showHelp ? T.hideHelp : T.showHelp}
          </button>
        </div>
        ${showHelp && html`<div class="mt-2 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner w-full">${HELP_CONTENT[language] || HELP_CONTENT['en']}</div>`}
      </div>
    </div>
    ${isModalOpen && (selectedSensor 
      ? html`<${ModalEditSensor} typsensor=${selectedSensor} oneWireId=${selectedSensor.oneWireId} pins=${selectedSensor.pins} onClose=${closeModal} onUpdate=${handleSensorUpdate} sensorType=${selectedSensor.sensorType} closeOnOverlayClick=${true} refresh=${refresh} />`
      : html`<${ModalOneWire} oneWire=${editingOneWire} onClose=${closeModal} onUpdate=${handleOneWireUpdate} closeOnOverlayClick=${true} refresh=${refresh} />`
    )}
  `;
};

export { TabOneWire };
