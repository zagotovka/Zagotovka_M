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

function TabSelect({ }) {
  const [varselect, setSelect] = useState(null);
  const [selectedValues, setSelectedValues] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [gpsEnabled, setGpsEnabled] = useState(false);
  const [language, setLanguage] = useState('ru');
  const [expandedSections, setExpandedSections] = useState({ physical: false, zigbee: false });
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

            <div class="flex justify-end">
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
        </form>
      </div>
    </div>
  `;
}

export { TabSelect };