import { h, render, useState, useEffect, useRef, html, Router } from '../bundle.js';
import { registerPoll, unregisterPoll } from '../pollQueue.js';
import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';
import { MyPolzunok, Chart, DeveloperNote } from '../main.js';
import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire, ruLangselect } from '../rulang.js';
import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire, enLangselect } from '../enlang.js';

// ---------------------------------------------------------------------------
// Глобальный tooltip-хелпер (портал в document.body, position:fixed)
// Инициализируется один раз, работает для всех [data-tip] на странице.
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
}
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Модульные компоненты — стабильный identity между ре-рендерами TabSelect.
// Preact не пересоздаёт DOM-узлы при каждом обновлении state родителя.
// ---------------------------------------------------------------------------
const RadioOption = ({ id, value, label, disabled = false, onChange, checked }) => html`
  <div class="relative">
    <input
      id="${id}_${value}"
      class="sr-only peer"
      type="radio"
      name="topin_${id}"
      value="${value}"
      checked=${checked}
      onChange=${onChange}
      disabled=${disabled}
      aria-label="${label}"
    />
    <label
      for="${id}_${value}"
      class="cursor-pointer px-3 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-300
             ${disabled ? 'text-gray-400 cursor-not-allowed opacity-60' : 'text-slate-700 hover:bg-black/5'}
             peer-checked:bg-gradient-to-r peer-checked:from-teal-500 peer-checked:to-cyan-500 peer-checked:text-white peer-checked:shadow-sm"
    >
      ${label}
    </label>
  </div>
`;

const Th = ({ title, tooltipIndex, center, getTooltipText }) => html`
  <th
    class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
    style=${center ? 'text-align: center' : ''}
    data-tip=${getTooltipText('langselect', tooltipIndex)}
  >
    ${title}
  </th>
`;

const ArraySelect = ({ d, selectedValues, isRowDisabled, handleRadioChange, handleFieldChange }) => {
  const isPhysicalPin = d.id < 89;
  const isZigbeePin = d.id >= 89;
  const currentTopin = selectedValues[`topin_${d.id}`];

  return html`
  <tr class="${isRowDisabled(d.id)
      ? 'bg-red-200/50 opacity-50 pointer-events-none'
      : d.id % 2 === 1
        ? 'bg-white/80'
        : 'bg-sky-200/40'
    } hover:bg-slate-200/80 transition-colors">
    <td class="px-6 py-2 text-sm text-slate-800">${d.id}</td>
    <td class="px-6 py-2 text-sm text-slate-800 font-medium">${d.pins}</td>
    <td class="px-2 py-2">
      <div class="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
        ${isPhysicalPin ? html`
          <${RadioOption} id=${d.id} value="0"  label="NONE"     checked=${currentTopin === '0'}  onChange=${handleRadioChange} />
          <${RadioOption} id=${d.id} value="3"  label="SWITCH"   checked=${currentTopin === '3'}  onChange=${handleRadioChange} />
          <${RadioOption} id=${d.id} value="1"  label="BUTTON"   checked=${currentTopin === '1'}  onChange=${handleRadioChange} />
          <${RadioOption} id=${d.id} value="2"  label="DEVICE"   checked=${currentTopin === '2'}  onChange=${handleRadioChange} />
          <${RadioOption} id=${d.id} value="4"  label="1-WIRE"   checked=${currentTopin === '4'}  onChange=${handleRadioChange} />
          <${RadioOption} id=${d.id} value="5"  label="PWM"      disabled=${d.pwm == 0} checked=${currentTopin === '5'}  onChange=${handleRadioChange} />
          <${RadioOption} id=${d.id} value="8"  label="Enc.OutA" checked=${currentTopin === '8'}  onChange=${handleRadioChange} />
          <${RadioOption} id=${d.id} value="9"  label="Enc.OutB" checked=${currentTopin === '9'}  onChange=${handleRadioChange} />
          <${RadioOption} id=${d.id} value="10" label="Security" disabled=${d.monitoring == 0} checked=${currentTopin === '10'} onChange=${handleRadioChange} />
        ` : html`
          <${RadioOption} id=${d.id} value="0"  label="NONE"     checked=${currentTopin === '0'}  onChange=${handleRadioChange} />
          <${RadioOption} id=${d.id} value="11" label="Zigbee"   checked=${currentTopin === '11'} onChange=${handleRadioChange} />
        `}
      </div>
    </td>
  </tr>
  ${isZigbeePin && currentTopin === '11' && html`
  <tr class="bg-slate-50/80">
    <td colspan="3" class="px-6 py-3">
      <div class="flex flex-col gap-2">
        <div class="flex flex-col sm:flex-row gap-2">
          <input type="text" placeholder="IEEE Address (e.g. 588e81fffe36a343)"
            value=${selectedValues[`zbee_ieee_${d.id}`] || ''}
            onInput=${(e) => {
              let v = e.target.value.replace(/^0x/i, '').replace(/[^0-9a-fA-F]/g, '').slice(0, 16);
              handleFieldChange(d.id, 'zbee_ieee', v);
            }}
            class="text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-400 flex-1" />
          <input type="text" placeholder="Info (e.g. Lamp Kuhnya)"
            maxlength="29"
            value=${selectedValues[`zbee_label_${d.id}`] || ''}
            onInput=${(e) => handleFieldChange(d.id, 'zbee_label', e.target.value)}
            class="text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-400 flex-1" />
        </div>
      </div>
    </td>
  </tr>
  `}
`;
};

// ---------------------------------------------------------------------------
// Help Content
// ---------------------------------------------------------------------------
const HELP_CONTENT = {
  ru: html`
    <div style="line-height:1.8; font-size:14px; color:#334155;">
      <p style="margin-bottom:12px; font-weight:700; font-size:15px;">Select pin — справка</p>

      <p style="margin-bottom:10px;">На этой странице вы назначаете роль каждому пину контроллера: физическому или виртуальному Zigbee.</p>

      <div style="margin-bottom:14px; line-height:1.6;">
        <p style="font-weight:700; margin-bottom:6px;">Типы пинов:</p>
        <span style="display:block;"><b style="color:#16a34a;">NONE</b> — пин не используется. Все связи этого пина автоматически удаляются!</span>
        <span style="display:block;"><b>SWITCH</b> — управляемое реле / выключатель</span>
        <span style="display:block;"><b>BUTTON</b> — физическая кнопка</span>
        <span style="display:block;"><b>DEVICE</b> — Zigbee-устройство (лампа, реле и т.д.)</span>
        <span style="display:block;"><b>1-WIRE</b> — температурный датчик DS18B20 или DHT22</span>
        <span style="display:block;"><b>PWM</b> — ШИМ-выход (яркость, скорость вентилятора)</span>
        <span style="display:block;"><b>Enc.OutA / Enc.OutB</b> — выход энкодера</span>
        <span style="display:block;"><b>Security</b> — это пин, к которому подключаются геркон или датчики движения для отслеживания изменения их состояния.</span>
      </div>

      <div style="margin-bottom:14px; line-height:1.6;">
        <p style="font-weight:700; margin-bottom:6px;">Как удалить Zigbee-устройство:</p>
        <ol style="padding-left:20px; margin:0;">
          <li>Найдите устройство в разделе <b>«Виртуальные пины Zigbee»</b>.</li>
          <li>Установите тип пина на <b style="color:#16a34a;">NONE</b>.</li>
          <li>Нажмите <b>Submit</b>.</li>
          <li>Все связи этого устройства на других страницах (Таймеры, OneWire, Zigbee-кнопки и т.д.) <b>удаляются автоматически</b>.</li>
        </ol>
      </div>

      <div style="margin-bottom:14px; line-height:1.6;">
        <p style="font-weight:700; margin-bottom:6px;">Автоматическая очистка связей:</p>
        <div class="bg-amber-50 p-4 rounded-lg border border-amber-200 text-sm">
          <p style="margin-bottom:6px;">При установке любого пина (физического или Zigbee) в <b style="color:#16a34a;">NONE</b>, контроллер автоматически удаляет все ссылки на этот ID:</p>
          <ul class="list-disc pl-5 space-y-1 text-slate-700">
            <li>Связи между пинами (PinsLinks)</li>
            <li>Действия кнопок (single click / double click / long press)</li>
            <li>Таймеры и крон-задачи</li>
            <li>Действия датчиков温度 (OneWire DS18B20 / DHT22)</li>
            <li>Zigbee-кнопки (виртуальные пины)</li>
            <li>Рассвет / Закат (Sunrise / Sunset)</li>
            <li>Привязка энкодеров к Zigbee</li>
          </ul>
          <p style="margin-top:8px; color:#92400e;">Вам <b>не нужно</b> вручную заходить на каждую страницу и искать, где этот пин используется — всё очищается за одно действие!</p>
        </div>
      </div>

      <div style="line-height:1.6;">
        <p style="font-weight:700; margin-bottom:6px;">IEEE Address:</p>
        <p>Уникальный 64-битный адрес Zigbee-устройства (например, <b>588e81fffe36a343</b>). Найдите его в Zigbee2MQTT или на наклейке устройства.</p>
      </div>
    </div>
  `,
  en: html`
    <div style="line-height:1.8; font-size:14px; color:#334155;">
      <p style="margin-bottom:12px; font-weight:700; font-size:15px;">Select pin — Help</p>

      <p style="margin-bottom:10px;">On this page you assign a role to each controller pin — physical or virtual Zigbee.</p>

      <div style="margin-bottom:14px; line-height:1.6;">
        <p style="font-weight:700; margin-bottom:6px;">Pin types:</p>
        <span style="display:block;"><b style="color:#16a34a;">NONE</b> — pin is not used. All connections for this pin are automatically deleted!</span>
        <span style="display:block;"><b>SWITCH</b> — controllable relay / switch</span>
        <span style="display:block;"><b>BUTTON</b> — physical button</span>
        <span style="display:block;"><b>DEVICE</b> — Zigbee device (lamp, relay, etc.)</span>
        <span style="display:block;"><b>1-WIRE</b> — DS18B20 or DHT22 temperature sensor</span>
        <span style="display:block;"><b>PWM</b> — PWM output (brightness, fan speed)</span>
        <span style="display:block;"><b>Enc.OutA / Enc.OutB</b> — encoder output</span>
        <span style="display:block;"><b>Security</b> — a pin for connecting reed switches or motion sensors to monitor their state changes.</span>
      </div>

      <div style="margin-bottom:14px; line-height:1.6;">
        <p style="font-weight:700; margin-bottom:6px;">How to delete a Zigbee device:</p>
        <ol style="padding-left:20px; margin:0;">
          <li>Find the device in the <b>«Virtual pins of Zigbee»</b> section.</li>
          <li>Set the pin type to <b style="color:#16a34a;">NONE</b>.</li>
          <li>Click <b>Submit</b>.</li>
          <li>All connections for this device on other pages (Timers, OneWire, Zigbee buttons, etc.) are <b>automatically removed</b>.</li>
        </ol>
      </div>

      <div style="margin-bottom:14px; line-height:1.6;">
        <p style="font-weight:700; margin-bottom:6px;">Automatic connection cleanup:</p>
        <div class="bg-amber-50 p-4 rounded-lg border border-amber-200 text-sm">
          <p style="margin-bottom:6px;">When any pin (physical or Zigbee) is set to <b style="color:#16a34a;">NONE</b>, the controller automatically removes all references to that ID:</p>
          <ul class="list-disc pl-5 space-y-1 text-slate-700">
            <li>Device connections (PinsLinks)</li>
            <li>Button actions (single click / double click / long press)</li>
            <li>Timers and cron tasks</li>
            <li>Sensor actions (OneWire DS18B20 / DHT22)</li>
            <li>Zigbee virtual buttons</li>
            <li>Sunrise / Sunset actions</li>
            <li>Encoder-to-Zigbee bindings</li>
          </ul>
          <p style="margin-top:8px; color:#92400e;">You <b>don't need</b> to manually visit each page to find where this pin is used — everything is cleaned up in one action!</p>
        </div>
      </div>

      <div style="line-height:1.6;">
        <p style="font-weight:700; margin-bottom:6px;">IEEE Address:</p>
        <p>The unique 64-bit address of a Zigbee device (e.g. <b>588e81fffe36a343</b>). Find it in Zigbee2MQTT or on the device label.</p>
      </div>
    </div>
  `
};

function TabSelect({ }) {
  const [varselect, setSelect] = useState(null);
  const [selectedValues, setSelectedValues] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [gpsEnabled, setGpsEnabled] = useState(false);
  const [language, setLanguage] = useState('ru');
  const [expandedSections, setExpandedSections] = useState({ physical: false, zigbee: false });
  const [showHelp, setShowHelp] = useState(false);
  const lastChangeTime = useRef(0);
  const lastPollData = useRef(null);
  const serverSnapshot = useRef({});

  const buildSnapshotEntry = (d) => ({
    topin: d.topin.toString(),
    zbee_ieee: d.zbee_ieee || '',
    zbee_endpoint: d.zbee_endpoint || 1,
    clusters: d.clusters || [6],
    zbee_label: d.zbee_label || '',
  });

  // Инициализируем глобальный tooltip один раз при монтировании
  useEffect(() => { initGlobalTooltip(); }, []);

  const handleGpsToggle = (enabled) => {
    setGpsEnabled(enabled);
    lastChangeTime.current = Date.now();
  };

  const isRowDisabled = (id) => {
    return gpsEnabled && (id === 1 || id === 35);
  };

  const PAGE_SIZE = 30;

  const fetchPage = (offset) =>
    fetch(`/api/select/get?offset=${offset}&limit=${PAGE_SIZE}`, { cache: 'no-store' })
      .then((r) => r.json());

  const refresh = () =>
    fetchPage(0).then(async (first) => {
      const total = first.total || first.data.length;
      const data = [...first.data];
      let offset = first.data.length;
      while (offset < total) {
        const page = await fetchPage(offset);
        data.push(...page.data);
        offset += page.data.length;
        if (page.data.length === 0) break;
      }
      return { ...first, data, total: data.length };
    }).then((r) => {
      const data = r.data || r;
      setSelect(data);
      setGpsEnabled(r.sim800l === 1);
      if (r.lang) setLanguage(r.lang);

      const initialValues = {};
      data.forEach((d) => {
        initialValues[`topin_${d.id}`] = d.topin.toString();
        if (d.zbee_ieee !== undefined) initialValues[`zbee_ieee_${d.id}`] = d.zbee_ieee;
        if (d.zbee_endpoint !== undefined) initialValues[`zbee_endpoint_${d.id}`] = d.zbee_endpoint;
        if (d.zbee_label !== undefined) initialValues[`zbee_label_${d.id}`] = d.zbee_label;
      });
      setSelectedValues(initialValues);

      const snap = {};
      data.forEach((d) => { snap[d.id] = buildSnapshotEntry(d); });
      serverSnapshot.current = snap;
    });

  useEffect(() => {
    let active = true;

    registerPoll('select', `/api/select/get?offset=0&limit=${PAGE_SIZE}`, function(r) {
      if (!active) return;
      if (Date.now() - lastChangeTime.current < 3000) return;
      if (r !== null && r !== undefined) {
        const total = r.total || r.data.length;
        const firstPageStr = JSON.stringify(r.data);
        if (firstPageStr !== lastPollData.current) {
          lastPollData.current = firstPageStr;
          refresh();
        }
      }
    }, { immediate: true });

    return function() {
      active = false;
      unregisterPoll('select');
    };
  }, []);

  useEffect(() => {
    let timer;
    if (isButtonDisabled && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsButtonDisabled(false);
      setSubmissionStatus(null);
    }
    return () => clearTimeout(timer);
  }, [isButtonDisabled, countdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const changed = [];
    varselect.forEach((d) => {
      const snap = serverSnapshot.current[d.id] || {};
      if (d.id < 89) {
        const raw = selectedValues[`topin_${d.id}`];
        const cur = raw !== undefined ? raw : d.topin.toString();
        if (cur !== snap.topin) {
          changed.push({ id: d.id, topin: parseInt(cur) });
        }
      } else {
        const curTopin = selectedValues[`topin_${d.id}`] !== undefined
          ? selectedValues[`topin_${d.id}`]
          : d.topin.toString();
        const cur = {
          zbee_ieee: selectedValues[`zbee_ieee_${d.id}`] || '',
          zbee_label: selectedValues[`zbee_label_${d.id}`] || '',
        };
        const isDirty =
          curTopin !== snap.topin ||
          cur.zbee_ieee !== snap.zbee_ieee ||
          cur.zbee_label !== snap.zbee_label;
        if (isDirty) {
            if (curTopin === '0') {
              changed.push({
                id: d.id,
                topin: 0,
                zbee_ieee: '',
                zbee_endpoint: 1,
                clusters: [6],
                zbee_label: '',
              });
            } else {
              changed.push({
                id: d.id,
                zbee_ieee: cur.zbee_ieee,
                zbee_endpoint: 1,
                clusters: d.clusters || [6],
                zbee_label: cur.zbee_label,
              });
            }
        }
      }
    });

    setIsButtonDisabled(true);
    setCountdown(3);

    if (changed.length === 0) {
      setSubmissionStatus('success');
      return;
    }

    setSubmissionStatus('submitting');

    try {
      const CHUNK_SIZE = 20; // ~20 записей ≈ 3КБ, комфортно для mg_iobuf
      const jsonBase = { lang: language, sim800l: gpsEnabled ? 1 : 0 };

      for (let i = 0; i < changed.length; i += CHUNK_SIZE) {
        const slice = changed.slice(i, i + CHUNK_SIZE);
        const response = await fetch('/api/select/set', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...jsonBase, data: slice })
        });
        if (!response.ok) throw new Error('Network response was not ok');
      }

      setSubmissionStatus('success');

      const updatedValues = {};
      changed.forEach((item) => {
        if (item.topin !== undefined) updatedValues[`topin_${item.id}`] = item.topin.toString();
        if (item.zbee_ieee !== undefined) updatedValues[`zbee_ieee_${item.id}`] = item.zbee_ieee;
        if (item.zbee_label !== undefined) updatedValues[`zbee_label_${item.id}`] = item.zbee_label;
      });
      setSelectedValues((prevState) => ({ ...prevState, ...updatedValues }));
      lastChangeTime.current = 0;

      refresh();
    } catch (error) {
      setSubmissionStatus('error');
      console.error('Error:', error);
    }
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setSelectedValues((prevState) => ({ ...prevState, [name]: value }));
    lastChangeTime.current = Date.now();
  };

  const handleFieldChange = (id, field, value) => {
    setSelectedValues(prev => ({ ...prev, [`${field}_${id}`]: value }));
    lastChangeTime.current = Date.now();
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  if (!varselect) return '';

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // getTooltipText передаётся в Th как prop (зависит от language)
  const getTooltipText = (key, index) => {
    const langObject = { langselect: language === 'ru' ? ruLangselect : enLangselect };
    let tooltipText =
      langObject[key] && langObject[key][index] ? langObject[key][index] : '';
    const words = tooltipText.split(' ');
    const lines = [];
    for (let i = 0; i < words.length; i += 15) {
      lines.push(words.slice(i, i + 15).join(' '));
    }
    return lines.join('<br>');
  };

  return html`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col justify-center items-center">
      <!-- Decorative background glow -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
          Select pin(s)
        </div>

        <form onSubmit=${handleSubmit} class="flex-grow flex flex-col justify-center items-center w-full">
          <div class="w-full">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <button
                type="submit"
                class=${`px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${isButtonDisabled
                  ? 'bg-gray-400 cursor-not-allowed opacity-70 hover:scale-100 hover:shadow-none'
                  : 'bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40'
                }`}
                disabled=${isButtonDisabled}
              >
                ${isButtonDisabled ? `Please wait ${countdown} sec.` : 'Submit'}
              </button>

              <div class="flex items-center gap-3">
                <span class="text-slate-600 font-bold uppercase tracking-widest text-2xl drop-shadow-sm">SIM800L</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    class="sr-only peer"
                    checked=${gpsEnabled}
                    onChange=${(e) => handleGpsToggle(e.target.checked)}
                  />
                  <div class="w-[42px] h-[22px] bg-slate-200/80 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-300/50 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-teal-400 peer-checked:to-cyan-500 shadow-inner"></div>
                </label>
              </div>
            </div>

            ${submissionStatus === 'success' && html`
              <div class="mb-6 bg-green-50/80 backdrop-blur-sm border border-green-200 text-green-700 px-4 py-3 rounded-xl shadow-sm" role="alert">
                <strong class="font-bold">Успех! </strong>
                <span class="block sm:inline">Данные успешно сохранены. Идет запись на USB флешку. Кнопка станет активной через ${countdown} секунд.</span>
              </div>
            `}
            ${submissionStatus === 'error' && html`
              <div class="mb-6 bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-sm" role="alert">
                <strong class="font-bold">Ошибка!</strong>
                <span class="block sm:inline">Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз через ${countdown} секунд.</span>
              </div>
            `}

            <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6 overflow-auto">
              <div class="overflow-x-auto w-full">
                <table class="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <${Th} title="ID" tooltipIndex=${1} getTooltipText=${getTooltipText} />
                      <${Th} title="Pin" tooltipIndex=${2} getTooltipText=${getTooltipText} />
                      <${Th} title="Type(s) of pin(s)" tooltipIndex=${3} center=${true} getTooltipText=${getTooltipText} />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/40">
                    ${varselect && html`
                      <!-- Physical pins section -->
                      <tr class="bg-gradient-to-r from-slate-100 to-slate-50 cursor-pointer hover:from-slate-200 hover:to-slate-100 transition-colors" onclick=${() => toggleSection('physical')}>
                        <td colspan="3" class="px-6 py-3 text-lg font-bold text-slate-700">
                          <span class="mr-2 text-slate-500">${expandedSections.physical ? '▼' : '▶'}</span>
                          ${language === 'ru' ? 'Физические пины STM32' : 'Physical pins of STM32'}
                          <span class="ml-2 text-sm font-normal text-slate-500">(${varselect.filter(d => d.id < 89).length})</span>
                        </td>
                      </tr>
                      ${expandedSections.physical && varselect.filter(d => d.id < 89).map((d) => html`<${ArraySelect} d=${d} selectedValues=${selectedValues} isRowDisabled=${isRowDisabled} handleRadioChange=${handleRadioChange} handleFieldChange=${handleFieldChange} />`)}
                      
                      <!-- Zigbee virtual pins section -->
                      <tr class="bg-gradient-to-r from-cyan-100 to-cyan-50 cursor-pointer hover:from-cyan-200 hover:to-cyan-100 transition-colors" onclick=${() => toggleSection('zigbee')}>
                        <td colspan="3" class="px-6 py-3 text-lg font-bold text-cyan-700">
                          <span class="mr-2 text-cyan-500">${expandedSections.zigbee ? '▼' : '▶'}</span>
                          ${language === 'ru' ? 'Виртуальные пины Zigbee' : 'Virtual pins of Zigbee'}
                          <span class="ml-2 text-sm font-normal text-cyan-500">(${varselect.filter(d => d.id >= 89).length})</span>
                        </td>
                      </tr>
                      ${expandedSections.zigbee && varselect.filter(d => d.id >= 89).map((d) => html`<${ArraySelect} d=${d} selectedValues=${selectedValues} isRowDisabled=${isRowDisabled} handleRadioChange=${handleRadioChange} handleFieldChange=${handleFieldChange} />`)}
                    `}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex justify-between items-center mb-4 mt-2">
              <div class="flex justify-end flex-1">
                <button
                  type="submit"
                  class=${`px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${isButtonDisabled
                    ? 'bg-gray-400 cursor-not-allowed opacity-70 hover:scale-100 hover:shadow-none'
                    : 'bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40'
                  }`}
                  disabled=${isButtonDisabled}
                >
                  ${isButtonDisabled ? `Please wait ${countdown} sec.` : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </form>

        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 p-4 rounded-2xl">
          <button class="px-8 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-teal-400 to-cyan-500" onclick=${() => setShowHelp(!showHelp)}>
            ${showHelp ? (language === 'ru' ? 'Скрыть справку' : 'Hide Help') : (language === 'ru' ? 'Показать справку' : 'Show Help')}
          </button>
        </div>
        ${showHelp && html`<div class="mt-2 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner w-full">${HELP_CONTENT[language] || HELP_CONTENT['en']}</div>`}
      </div>
    </div>
  `;
}

export { TabSelect };