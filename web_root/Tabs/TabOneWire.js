import { ModalEditSensor } from '../Modals/ModalEditSensor.js';
import { ModalOneWire } from '../Modals/ModalOneWire.js';
import { h, render, useState, useEffect, useRef, html, Router } from '../bundle.js';
import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';
import { MyPolzunok, Chart, DeveloperNote } from '../main.js';
import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire } from '../rulang.js';
import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire } from '../enlang.js';

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

const TabOneWire = () => {
  const [varonewire, setOneWire]       = useState([]);
  const [error, setError]              = useState(null);
  const [isModalOpen, setIsModalOpen]  = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [editingOneWire, setEditingOneWire] = useState(null);
  const [language, setLanguage]        = useState('ru');
  const [modalType, setModalType]      = useState(null);

  // ── Collapsible state ───────────────────────────────────────────────────
  const [expandedPins, setExpandedPins] = useState({});

  const togglePin = (id) =>
    setExpandedPins(prev => ({ ...prev, [id]: !prev[id] }));

  // Вспомогательная очистка строки от мусорных байт (для S/N)
  const clean = (s) =>
    typeof s === 'string' ? s.replace(/[^\x20-\x7E\u0400-\u04FF]/g, '') : s;
  // ───────────────────────────────────────────────────────────────────────

  // Инициализируем глобальный tooltip один раз при монтировании
  useEffect(() => { initGlobalTooltip(); }, []);

  const refresh = () => {
    console.log('Calling initial refresh...');
    fetch('/api/onewire/get')
      .then((r) => r.json())
      .then((data) => {
        console.log('Initial data received:', data);
        setLanguage(data.lang || 'ru');
        setOneWire(data.pins || []);
        console.log('Initial OneWire state set:', data.pins);
        setError(null);
      })
      .catch((err) => {
        console.error('Error in refresh:', err);
        setError(err.message);
        setOneWire([]);
      });
  };

  const updateSensorData = async () => {
    try {
      const response = await fetch('/api/temp/get');
      const data = await response.json();

      setOneWire((prevState) => {
        return prevState.map((device) => {
          if (
            !device.sensors ||
            (device.typsensor !== 1 &&
              device.typsensr !== 1 &&
              device.typsensor !== 2 &&
              device.typsensr !== 2)
          ) {
            return device;
          }

          const updatedSensors = device.sensors.map((sensor) => {
            if (device.typsensor === 1 || device.typsensr === 1) {
              const matchedSensor = data.ds18b20?.find(
                (d) => d.addr === sensor.s_number
              );
              if (matchedSensor) {
                return { ...sensor, t: matchedSensor.temp };
              }
            } else if (device.typsensor === 2 || device.typsensr === 2) {
              const matchedSensor = data.dht22?.find((d) => d.id === device.id);
              if (matchedSensor) {
                return { ...sensor, t: matchedSensor.temp, humidity: matchedSensor.humidity };
              }
            }
            return sensor;
          });

          return { ...device, sensors: updatedSensors };
        });
      });
    } catch (error) {
      console.error('Error in updateSensorData:', error);
    }
  };

  useEffect(() => {
    console.log('Setting up initial data and interval...');
    refresh();
    const updateInterval = setInterval(updateSensorData, 1000);
    return () => { clearInterval(updateInterval); };
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSensor(null);
    setEditingOneWire(null);
  };

  const handleSensorUpdate = (updatedSensor) => {
    setOneWire((prevState) => {
      return prevState.map((device) => {
        if (device.id === updatedSensor.oneWireId) {
          const updatedSensors =
            device.sensors?.map((sensor) =>
              sensor.s_number === updatedSensor.s_number
                ? { ...sensor, ...updatedSensor }
                : sensor
            ) || [];
          return { ...device, sensors: updatedSensors };
        }
        return device;
      });
    });
    closeModal();
  };

  const openOneWireModal = (oneWire) => {
    setEditingOneWire(oneWire);
    setIsModalOpen(true);
  };

  const handleOWOnOffChange = (updatedOneWire) => {
    setOneWire((prevState) => {
      return prevState.map((device) =>
        device.id === updatedOneWire.id
          ? { ...device, onoff: updatedOneWire.onoff }
          : device
      );
    });
  };

  const handleOneWireUpdate = (updatedOneWire) => {
    setOneWire((prevState) => {
      return prevState.map((device) =>
        device.id === updatedOneWire.id ? updatedOneWire : device
      );
    });
    closeModal();
  };

  if (error) {
    return html`<div>Error fetching sensor data: ${error}</div>`;
  }

  const getLangObject = () => ({
    lang1Wire: language === 'ru' ? rulange1Wire : enlange1Wire
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

  // ── Th — заголовок таблицы с tooltip (портал в body) ──────────────────
  const Th = (props) => html`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${getTooltipText('lang1Wire', props.tooltipIndex)}
    >
      ${props.title}
    </th>
  `;

  // ── ArrayOneWire — строка устройства + сворачиваемая группа сенсоров ──
  //
  // Каждое устройство обёрнуто в отдельный <tbody>.
  // Это единственный валидный способ вставлять пары <tr>…</tr> в таблицу
  // без нарушения структуры DOM (HTML5 допускает несколько <tbody>).
  //
  // stopPropagation на <td> с MyPolzunok и Edit — чтобы клик по контролам
  // не сворачивал/разворачивал строку.
  // ───────────────────────────────────────────────────────────────────────
  const ArrayOneWire = ({ device, index }) => {
    const isExpanded  = !!expandedPins[device.id];
    const pinValue    = device.pins || device.pin;
    const sensorType  = device.typsensor || device.typsensr || 0;
    const numDevices  = device.numdevices || device.numsens || 0;
    const hasChildren = sensorType !== 0 && numDevices > 0;

    return html`
      <tbody key=${'db-' + device.id}>
        <tr
          class="${index % 2 === 1 ? 'bg-white/80' : 'bg-sky-200/40'} hover:bg-slate-200/80 transition-colors ${hasChildren ? 'cursor-pointer' : ''}"
          onclick=${() => hasChildren && togglePin(device.id)}
        >
          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${device.id}</td>
          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${pinValue}</td>
          <td class="px-6 py-4 text-sm text-slate-700 font-medium">${['None', 'DS18B20', 'DHT22'][sensorType]}</td>
          <td class="px-6 py-4 text-sm text-slate-700 font-medium">${numDevices}</td>
          <td class="px-6 py-4" onclick=${(e) => e.stopPropagation()}>
            <${MyPolzunok}
              value=${device.onoff || 0}
              onChange=${(value) => handleOWOnOffChange({ ...device, onoff: value })}
            />
          </td>
          <td class="px-6 py-4" onclick=${(e) => e.stopPropagation()}>
            <button
              class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap"
              onclick=${() => openOneWireModal(device)}
            >
              Edit
            </button>
            ${hasChildren && html`
              <span class="ml-3 text-slate-400 text-xs select-none pointer-events-none">
                ${isExpanded ? '▲' : '▼'}
              </span>
            `}
          </td>
        </tr>

        ${isExpanded && hasChildren ? html`
          <tr onclick=${(e) => e.stopPropagation()}>
            <td colspan="6" class="px-4 py-3 bg-gradient-to-r from-cyan-50/80 via-slate-50/60 to-blue-50/80 border-t border-cyan-100/60">
              <div class="w-full">
                <${SensorTable} d=${device} />
              </div>
            </td>
          </tr>
        ` : ''}
      </tbody>
    `;
  };

  // ── SensorTable — оригинальное содержимое раскрытой группы (без изменений)
  const SensorTable = ({ d }) => {
    const sensorType = d.typsensor || d.typsensr || 0;
    const numDevices = d.numdevices || d.numsens || 0;

    if (sensorType === 0 || numDevices === 0) {
      return html`
        <div class="px-4 py-2 text-slate-500 font-medium">
          No connected sensors for this OneWire pin.
        </div>
      `;
    }

    let sensors = d.sensors || [];

    // Цвета строк чередуются: тёплый cyan и голубой slate
    const rowBg = [
      'bg-cyan-50/60 border-cyan-200/50',
      'bg-slate-100/70 border-slate-200/50',
    ];

    const renderSensor = (sensorData, idx) => {
      const isDHT22 = sensorType === 2;
      const sn      = clean(sensorData.s_number) || '';

      const copySN = (e) => {
        e.stopPropagation();
        if (!sn) return;
        const btn = e.currentTarget;
        navigator.clipboard.writeText(sn).then(() => {
          btn.textContent = '✅ copied!';
          btn.style.background = '#059669';
          setTimeout(() => {
            btn.textContent = '📋 copy';
            btn.style.background = '';
          }, 1500);
        }).catch(() => {
          btn.textContent = '❌ error';
          setTimeout(() => { btn.textContent = '📋 copy'; }, 1500);
        });
      };

      return html`
        <div class="w-full flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3
                    rounded-xl border ${rowBg[idx % 2]}
                    backdrop-blur-sm shadow-sm hover:shadow-md transition-all">

          <!-- S/N полностью + кнопка копирования -->
          ${isDHT22
            ? html`<span class="font-mono text-base font-semibold text-teal-700 shrink-0">DHT22</span>`
            : html`
                <span class="flex items-center gap-2 shrink-0">
                  <span class="font-mono text-base font-semibold text-slate-500 select-none">SN</span>
                  <span class="font-mono text-base text-slate-700 select-all" title="Serial number">
                    ${sn}
                  </span>
                  <button
                    style="transition: background 0.08s, transform 0.08s, box-shadow 0.08s;"
                    class="text-xs text-white font-bold px-3 py-1 rounded-lg
                           bg-emerald-500 hover:bg-emerald-600
                           shadow-md hover:shadow-lg
                           active:scale-95 active:shadow-inner active:bg-emerald-700
                           leading-none shrink-0"
                    onmousedown=${(e) => {
                      e.currentTarget.style.transform = 'scale(0.93)';
                      e.currentTarget.style.boxShadow = 'inset 0 2px 6px rgba(0,0,0,0.25)';
                    }}
                    onmouseup=${(e) => {
                      e.currentTarget.style.transform = '';
                      e.currentTarget.style.boxShadow = '';
                    }}
                    onmouseleave=${(e) => {
                      e.currentTarget.style.transform = '';
                      e.currentTarget.style.boxShadow = '';
                    }}
                    onclick=${copySN}
                    title="Copy S/N to clipboard"
                  >📋 copy</button>
                </span>
              `}

          <span class="text-slate-300 select-none text-base">|</span>

          <!-- Температура -->
          <span class="font-bold text-cyan-700 text-base shrink-0">
            🌡 ${sensorData.t ?? '—'}°C
          </span>

          ${isDHT22 && 'humidity' in sensorData ? html`
            <span class="font-bold text-teal-600 text-base shrink-0">
              💧 ${sensorData.humidity}%
            </span>
          ` : ''}

          <span class="text-slate-300 select-none text-base">|</span>

          <!-- Лимиты температуры -->
          <span
            class="px-2.5 py-1 bg-orange-100 text-orange-700 rounded-md text-sm font-semibold shrink-0"
            title="Upper temperature limit"
          >↑${sensorData.ut}°C → ${sensorData.action_ut}</span>
          <span
            class="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-semibold shrink-0"
            title="Lower temperature limit"
          >↓${sensorData.lt}°C → ${sensorData.action_lt}</span>

          ${isDHT22 && 'upphumid' in sensorData ? html`
            <span class="text-slate-300 select-none text-base">|</span>
            <span
              class="px-2.5 py-1 bg-orange-50 text-orange-600 rounded-md text-sm font-semibold shrink-0"
              title="Upper humidity limit"
            >💧↑${sensorData.upphumid}% → ${sensorData.actuphum}</span>
            <span
              class="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-md text-sm font-semibold shrink-0"
              title="Lower humidity limit"
            >💧↓${sensorData.humlolim}% → ${sensorData.actlowhum}</span>
          ` : ''}

          ${sensorData.info ? html`
            <span class="text-slate-300 select-none text-base">|</span>
            <span class="text-sm text-slate-500 italic" title=${sensorData.info}>
              ${sensorData.info}
            </span>
          ` : ''}

          <!-- Edit — прижат вправо -->
          <a
            href="#"
            class="ml-auto text-blue-600 hover:text-blue-800 font-semibold text-sm uppercase tracking-wide bg-white/70 hover:bg-white/95 px-3 py-1 rounded-lg shadow-sm transition-colors shrink-0"
            onclick=${(e) => {
              e.preventDefault();
              setSelectedSensor({
                ...sensorData,
                oneWireId: d.id,
                sensorType: sensorType,
                pins: d.pins || d.pin
              });
              setIsModalOpen(true);
            }}
          >Edit</a>
        </div>
      `;
    };

    return sensors.length > 0 && Object.keys(sensors[0]).length > 0
      ? html`<div class="flex flex-col gap-2 w-full">${sensors.map((sensor, idx) => renderSensor(sensor, idx))}</div>`
      : html`
          <div class="px-4 py-4 text-slate-500 font-medium bg-white/50 backdrop-blur-sm rounded-xl border border-white/40 text-center w-full">
            No sensor data available for this OneWire pin.
          </div>
        `;
  };

  return html`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col justify-center items-center">
      <!-- Decorative background glow -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
          OneWire(s) pin(s)
        </div>
        <div class="justify-center w-full">
          <div class="mb-4">
            <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6 overflow-auto">
              <div class="overflow-x-auto w-full">
                <table class="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <${Th} title="ID"                tooltipIndex=${1} />
                      <${Th} title="Pin"               tooltipIndex=${2} />
                      <${Th} title="Selected sensor"   tooltipIndex=${3} />
                      <${Th} title="Count of sensors"  tooltipIndex=${4} />
                      <${Th} title="On/Off"            tooltipIndex=${5} />
                      <${Th} title="Actions"           tooltipIndex=${6} />
                    </tr>
                  </thead>
                  ${varonewire.length > 0
                    ? varonewire.map(
                        (device, index) => html`<${ArrayOneWire} device=${device} index=${index} key=${device.id} />`
                      )
                    : html`
                        <tbody>
                          <tr>
                            <td colspan="6" class="px-4 py-2">
                              ${error ? `Error fetching sensor data: ${error}` : 'No available pins configured as OneWire!'}
                            </td>
                          </tr>
                        </tbody>
                      `}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    ${isModalOpen &&
      (selectedSensor
        ? html`
            <${ModalEditSensor}
              typsensor=${selectedSensor}
              oneWireId=${selectedSensor.oneWireId}
              pins=${selectedSensor.pins}
              onClose=${closeModal}
              onUpdate=${handleSensorUpdate}
              sensorType=${selectedSensor.sensorType}
              closeOnOverlayClick=${true}
              refresh=${refresh}
            />
          `
        : html`
            <${ModalOneWire}
              oneWire=${editingOneWire}
              onClose=${closeModal}
              onUpdate=${handleOneWireUpdate}
              closeOnOverlayClick=${true}
              refresh=${refresh}
            />
          `)}
  `;
};

export { TabOneWire };