import { ModalPid } from '../Modals/ModalPid.js';
import { h, render, useState, useEffect, useRef, html, Router } from '../bundle.js';
import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';
import { MyPolzunok, Chart, DeveloperNote } from '../main.js';
import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire } from '../rulang.js';
import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire } from '../enlang.js';

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

// Пресеты по языку
const PRESETS = {
  ru: [
    { value: '1', label: 'Паяльная станция T max=125°C, T min=-55°C' },
    { value: '2', label: 'Кулер / вентилятор T max=70°C, T min=-55°C' },
    { value: '3', label: '3D‑принтер (стол) T max=120°C, T min=0°C' },
    { value: '4', label: 'Форточный нагреватель T max=60°C, T min=-55°C' },
    { value: '5', label: 'Тёплый пол T max=45°C, T min=0°C' },
    { value: '6', label: 'Холодильник T max=100°C, T min=-55°C' },
    { value: '7', label: 'Аквариум / бойлер T max=80°C, T min=0°C' },
    { value: '8', label: 'Инкубатор T max=45°C, T min=0°C' },
    { value: '9', label: 'Теплица / комната T max=50°C, T min=-55°C' },
  ],
  en: [
    { value: '1', label: 'Soldering station T max=125°C, T min=-55°C' },
    { value: '2', label: 'Cooler / fan T max=70°C, T min=-55°C' },
    { value: '3', label: '3D printer (table) T max=120°C, T min=0°C' },
    { value: '4', label: 'Vent heater T max=60°C, T min=-55°C' },
    { value: '5', label: 'Warm floor T max=45°C, T min=0°C' },
    { value: '6', label: 'Refrigerator T max=100°C, T min=-55°C' },
    { value: '7', label: 'Aquarium / boiler T max=80°C, T min=0°C' },
    { value: '8', label: 'Incubator T max=45°C, T min=0°C' },
    { value: '9', label: 'Greenhouse / room T max=50°C, T min=-55°C' },
  ],
};

const SENSOR_OPTIONS = [
  { value: '1', label: 'DS18B20' },
  { value: '2', label: 'DHT-22' },
];

// Максимальное число PID-слотов — фиксировано на уровне прошивки
const PID_MAX_SLOTS = 24;

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

  useEffect(() => { initGlobalTooltip(); }, []);

  const fetchPidData = () => {
    fetch('/api/pid/get')
      .then((r) => r.json())
      .then((r) => {
        if (isPendingOnOff.current) return;
        if (r && Array.isArray(r.pid)) {
          setPid(r.pid);
          setLanguage(r.lang || 'ru');
          if (typeof r.pidline === 'number') {
            setPidline(r.pidline);
            setVisiblePids(r.pidline);
          }
        }
      })
      .catch((error) => console.error('Error fetching PID data:', error));
  };

  useEffect(() => {
    fetchPidData();
    const intervalId = setInterval(() => {
      fetchPidData();
    }, 500);
    return () => clearInterval(intervalId);
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
    fetch('/api/pidline/set', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pidline: value })
    })
      .then((response) => response.json())
      .then((data) => console.log('Pidline sent to stm32:', data))
      .catch((error) => console.error('Error sending PID line to stm32:', error));
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
    langtimers: language === 'ru' ? rulangtimers : enlangtimers
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
        isPendingOnOff.current = false;
      });
  };

  // Отправка команды Auto Tune для конкретной строки
  const handleRunTune = (d) => {
    console.log('Run tune for id:', d.id);
    fetch('/api/pid/tune', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: d.id }),
    })
      .then(response => response.json())
      .then(data => { console.log('Tune response:', data); })
      .catch(error => { console.error('Error running tune:', error); });
  };

  const presets = PRESETS[language] || PRESETS['en'];

  const getPresetLabel = (value) => {
    const p = presets.find(p => p.value === String(value));
    return p ? p.label : value;
  };

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
      data-tip=${getTooltipText('langtimers', props.tooltipIndex)}
    >
      ${props.title}
    </th>
  `;

  const ArrayPid = ({ d, index }) => html`
    <tr class="${index % 2 === 1 ? 'bg-white/80' : 'bg-sky-200/40'} hover:bg-slate-200/80 transition-colors">
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
      <td class="px-4 py-3 text-sm text-slate-800 font-mono">${d.duty !== undefined ? d.duty : '—'}</td>
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
        >
          Edit
        </button>
      </td>
      <td class="px-4 py-3 text-center">
        <button
          onclick=${() => handleRunTune(d)}
          class="px-3 py-1 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40 whitespace-nowrap"
        >
          Run tune
        </button>
      </td>
    </tr>
  `;

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
                        <${Th} title="Dev. ser. number" tooltipIndex=${3} />
                        <${Th} title="Presets" tooltipIndex=${4} />
                        <${Th} title="T set." tooltipIndex=${5} />
                        <${Th} title="T cur." tooltipIndex=${6} />
                        <${Th} title="Duty" tooltipIndex=${7} />
                        <${Th} title="Info" tooltipIndex=${4} />
                        <${Th} title="On/Off" tooltipIndex=${5} />
                        <${Th} title="Action" tooltipIndex=${6} />
                        <${Th} title="Auto tune" tooltipIndex=${7} />
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-white/40">
                      ${Array.from({ length: visiblePids }, (_, index) => {
                        const pid = varpid && varpid[index] ? varpid[index] : { id: index + 1, pins: '', pinact: {}, selsens: '', sernum: '', presets: '', tmpset: '', tmpcur: '', info: '', onoff: 0 };
                        return html`<${ArrayPid} d=${pid} index=${index} key=${pid.id} />`;
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            `
            : html`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">No PID jobs available</div>`}
        </div>
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm p-4 rounded-2xl">
          <button
            class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
            onclick=${() => setShowHelp(!showHelp)}
          >
            ${showHelp ? 'Hide Help' : 'Show Help'}
          </button>
          <div class="font-semibold text-slate-600 tracking-wide">
            ${varpid && (PID_MAX_SLOTS - visiblePids > 0)
            ? `Still available: ${PID_MAX_SLOTS - visiblePids} PID jobs`
            : 'No available: PID jobs!'}
          </div>
          <div class="flex gap-2">
            ${visiblePids < PID_MAX_SLOTS ? html`
            <button
                class="bg-emerald-500 hover:bg-emerald-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-emerald-500/30"
                onclick=${addPid}
                title="Add PID"
            >+</button>
            ` : null}
            ${visiblePids > 0
              ? html`
                <button
                  class="bg-rose-500 hover:bg-rose-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-rose-500/30"
                  onclick=${deletePid}
                  title="Remove PID"
                >-</button>
              `
              : null}
          </div>
        </div>
      </div>

      ${showHelp && html`
        <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700 w-full">
          <p class="text-slate-600">Help content for PID controller.</p>
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
          modalClass="mt-24"
        />
      ` : null}
    </div>
  `;
}

export { TabPid };