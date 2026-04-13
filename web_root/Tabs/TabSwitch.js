import { ModalSwitch } from '../Modals/ModalSwitch.js';
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
    tip.innerHTML = el.dataset.tip;   // поддерживаем <br> из getTooltipText
    tip.style.display = 'block';

    // Позиционируем над элементом
    const r = el.getBoundingClientRect();
    tip.style.opacity = '0';           // сначала скрытый, чтобы измерить высоту
    tip.style.left = '0px';
    tip.style.top  = '0px';

    requestAnimationFrame(() => {
      const tw = tip.offsetWidth;
      const th = tip.offsetHeight;
      const vw = window.innerWidth;

      let left = r.left + r.width / 2 - tw / 2;
      // не вылезаем за правый/левый край вьюпорта
      left = Math.max(8, Math.min(left, vw - tw - 8));

      let top = r.top - th - 8;
      // если не помещается сверху — рисуем снизу
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

function TabSwitch({ }) {
  const [switchData, setSwitchData] = useState(null);
  const [saveResult, setSaveResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedSwitch, setSelectedSwitch] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [language, setLanguage] = useState('ru');
  const [varswitch, setSwitch] = useState(null);
  const [pintopin, setPintopin] = useState([]);
  const [debugInfo, setDebugInfo] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  // Инициализируем глобальный tooltip один раз при монтировании
  useEffect(() => { initGlobalTooltip(); }, []);

  const refresh = () =>
    Promise.all([
      fetch('/api/switch/get').then((r) => r.json()),
      fetch('/api/pintopin/get').then((r) => r.json())
    ])
      .then(([switchData, pintopinData]) => {
        setLanguage(switchData.lang);
        setSwitch(switchData.switches);
        setSwitchData(switchData);
        setPintopin(pintopinData);
        setDebugInfo(
          `Pintopin data: ${JSON.stringify(
            pintopinData,
            null,
            2
          )}\n\nSwitch data: ${JSON.stringify(switchData.switches, null, 2)}`
        );
        console.log('Pintopin data:', pintopinData);
        console.log('Switch data:', switchData.switches);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setDebugInfo(`Error fetching data: ${error.message}`);
      });

  const fetchSwitchData = () => {
    fetch('/api/switch/get')
      .then((r) => r.json())
      .then((data) => {
        setSwitch(data.switches);
        setLanguage(data.lang);
        console.log('Updated switch data:', data.switches);
      })
      .catch((error) => {
        console.error('Error fetching switch data:', error);
      });
  };

  const fetchPintopinData = () => {
    fetch('/api/pintopin/get')
      .then((r) => r.json())
      .then((data) => {
        setPintopin(data);
        console.log('Updated pintopin data:', data);
      })
      .catch((error) => {
        console.error('Error fetching pintopin data:', error);
      });
  };

  useEffect(() => {
    fetchSwitchData();
    fetchPintopinData();

    const intervalId = setInterval(() => {
      fetchSwitchData();
      fetchPintopinData();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const getConnectedPins = (switchId) => {
    const connectedPins = new Map();

    const switchItem = varswitch.find((sw) => sw.id === switchId);
    if (switchItem && switchItem.pinact) {
      Object.entries(switchItem.pinact).forEach(([pin, relayId]) => {
        connectedPins.set(pin, { pin, relayId });
      });
    }

    pintopin.forEach((item) => {
      if (item.idin === switchId) {
        const key = `${item.pins}(${item.idout})`;
        if (!connectedPins.has(key)) {
          connectedPins.set(key, { pin: item.pins, relayId: item.idout });
        }
      }
    });
    return Array.from(connectedPins.values());
  };

  const getLangObject = () => ({
    langswitch: language === 'ru' ? ruLangswitch : enLangswitch
  });

  const getTooltipText = (key, index) => {
    const langObject = getLangObject();
    const tooltipText = (langObject[key] && langObject[key][index]) || '';

    const words = tooltipText.split(' ');
    const lines = [];
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (currentLine.length + word.length + 1 <= 200) {
        currentLine += (currentLine.length > 0 ? ' ' : '') + word;
      } else {
        if (currentLine.length > 0) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine.length > 0) lines.push(currentLine);

    return lines.join('<br>');
  };

  const onsave = (id, pinInfo) => {
    console.log('Удаление соединения:', id, pinInfo);

    const [pinName, idoutStr] = pinInfo.split('(');
    const idout = idoutStr ? parseInt(idoutStr) : null;

    fetch('/api/connection/del', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, pin: pinName.trim() })
    })
      .then((r) => r.json())
      .then((r) => {
        setSaveResult(r);
        setSwitch((prevSwitch) =>
          prevSwitch.map((sw) => {
            if (sw.id === id) {
              const updatedPinact = { ...sw.pinact };
              delete updatedPinact[pinName.trim()];
              return { ...sw, pinact: updatedPinact };
            }
            return sw;
          })
        );
        setPintopin((prevPintopin) =>
          prevPintopin.filter(
            (item) =>
              !(
                item.idin === id &&
                item.pins === pinName.trim() &&
                (idout === null || item.idout === idout)
              )
          )
        );
      })
      .then(() => {
        console.log('Соединение удалено успешно');
        refresh();
      })
      .catch((error) => {
        console.error('Ошибка при удалении соединения:', error);
      });
  };

  const openModal = (type, switchData) => {
    setModalType(type);
    setSelectedSwitch(switchData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedSwitch(null);
  };

  const handleSwitchChange = (updatedSwitch) => {
    console.log('handleSwitchChange:', updatedSwitch);

    fetch('/api/onoff/set', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: updatedSwitch.id, onoff: updatedSwitch.onoff })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response from /api/onoff/set:', data);
      })
      .catch((error) => {
        console.error('Error calling /api/onoff/set:', error);
      });

    closeModal();
  };

  const getRelayConnection = (switchId) => {
    const connection = pintopin.find((item) => item.idin === switchId);
    return connection ? `${connection.pins} (${connection.idout})` : '';
  };

  const helpContent = {
    ru: html`
      <div class="mytext space-y-6">
        <div>
          <pre class="mb-4">
            Данный API позволяет дистанционно управлять выключателем, просто выполнив команду в браузере любого устройства в вашей локальной сети.
          </pre>
          <pre class="text-red-500 font-bold">
            Не открывайте доступ из интернета к вашим API - это небезопасно!
          </pre>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Примеры API</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">API</th>
                <th class="border px-4 py-2">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/switch?id=27&onoff=1
                </td>
                <td class="border px-4 py-2">
                  Данная команда ВКЛючит выключатель с id = 27. Где "Zerg" это Ваш 'Token'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/switch?id=27&onoff=0
                </td>
                <td class="border px-4 py-2">
                  Данная команда ОТКлючит выключатель с id = 27. Где "Zerg" это Ваш 'Token'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <pre class="mb-4">
            MQTT позволяет дистанционно управлять выключателем из интернета!
          </pre>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Примеры команд MQTT</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">Команда</th>
                <th class="border px-4 py-2">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">Swarm/switch/id=27/onoff=1</td>
                <td class="border px-4 py-2">
                  Данная MQTT команда ВКЛючит выключатель с id = 27. Где "Swarm" это Ваш 'TX topic'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Swarm/switch/id=27/onoff=0</td>
                <td class="border px-4 py-2">
                  Данная MQTT команда ОТКлючит выключатель с id = 27. Где "Swarm" это Ваш 'TX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Отслеживание изменений</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">Топик</th>
                <th class="border px-4 py-2">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">Swarm/switch/</td>
                <td class="border px-4 py-2">
                  Данная страница отслеживает изменения выключателей и автоматически отправляет каждое изменение по MQTT на топик: Swarm/switch/.
                  Где "Swarm" это Ваш 'TX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Примеры SMS и DTMF команд</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">Команда</th>
                <th class="border px-4 py-2">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">14#1*</td>
                <td class="border px-4 py-2">Данная команда ВКЛючит выключатель с id = 14. Работает как по SMS, так и в тональном наборе (DTMF) во время звонка.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">14#0*</td>
                <td class="border px-4 py-2">Данная команда ОТКлючит выключатель с id = 14.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">14#2*</td>
                <td class="border px-4 py-2">Данная команда переключит (TOGGLE) состояние выключателя с id = 14 на противоположное.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `,
    en: html`
      <div class="mytext space-y-6">
        <div>
          <pre class="mb-4">
            This API allows you to remotely control a switch by simply executing a command in the browser of any device on your local network.
          </pre>
          <pre class="text-red-500 font-bold">
            Do not expose your APIs to the internet - it's not secure!
          </pre>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">API Examples</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">API</th>
                <th class="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/switch?id=15&onoff=1
                </td>
                <td class="border px-4 py-2">
                  Where "Zerg" is your 'Token'. This command will turn on the switch with id = 15.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/switch?id=15&onoff=0
                </td>
                <td class="border px-4 py-2">
                  Where "Zerg" is your 'Token'. This command will turn off the switch with id = 15.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <pre class="mb-4">
            MQTT allows you to remotely control a switch from the internet!
          </pre>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">MQTT Command Examples</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">Command</th>
                <th class="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">Swarm/switch/id=27/onoff=1</td>
                <td class="border px-4 py-2">
                  Where "Swarm" is your 'RX topic'. This command will turn ON the switch with id = 27.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Swarm/switch/id=27/onoff=0</td>
                <td class="border px-4 py-2">
                  Where "Swarm" is your 'RX topic'. This command will turn OFF the switch with id = 27.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Change Tracking</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">Topic</th>
                <th class="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">Swarm/switch/</td>
                <td class="border px-4 py-2">
                  This page tracks changes in switches and automatically sends each change via MQTT to the topic: Swarm/switch/.
                  Where "Swarm" is your 'RX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">SMS & DTMF Command Examples</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">Command</th>
                <th class="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">14#1*</td>
                <td class="border px-4 py-2">This command will turn ON the switch with id = 14. Works via SMS and DTMF during a voice call.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">14#0*</td>
                <td class="border px-4 py-2">This command will turn OFF the switch with id = 14.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">14#2*</td>
                <td class="border px-4 py-2">This command will TOGGLE the state of the switch with id = 14.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `
  };

  // -------------------------------------------------------------------------
  // Th — заголовок таблицы с tooltip через data-tip (портал в body)
  // Убран старый div с position:absolute внутри overflow-контейнера.
  // -------------------------------------------------------------------------
  const Th = (props) => html`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${getTooltipText('langswitch', props.tooltipIndex)}
    >
      ${props.title}
    </th>
  `;

  const ArraySwitch = ({ d, index }) => {
    const connectedPins = getConnectedPins(d.id);

    return html`
      <tr class="${index % 2 === 1 ? 'bg-white/80' : 'bg-sky-200/40'} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-2 text-sm text-slate-800">${d.id}</td>
        <td class="px-6 py-2 text-sm text-slate-800 font-medium">${d.pins}</td>
        <td class="px-6 py-2 text-sm text-slate-700">
          ${['None', 'GPIO_PULLUP', 'GPIO_PULLDOWN'][d.ptype]}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono">
          ${connectedPins.map(
            ({ pin, relayId }) => html`
              <span class="mr-2 inline-flex items-center">
                ${pin}${relayId !== undefined ? `(${relayId})` : ''}
                <button
                  onClick=${(e) => {
                    e.preventDefault();
                    onsave(d.id, `${pin}(${relayId})`);
                  }}
                  class="ml-1 text-red-500 hover:text-red-700 transition-colors font-bold"
                  title="Remove connection"
                >
                  [x]
                </button>
              </span>
            `
          )}
        </td>
        <td class="px-6 py-2 text-sm text-slate-600">${d.info}</td>
        <td class="px-6 py-2">
          <${MyPolzunok}
            value=${d.onoff}
            onChange=${(value) => handleSwitchChange({ ...d, onoff: value })}
          />
        </td>
        <td class="px-6 py-2 text-sm">
          <button
            onClick=${() => openModal('connection', d)}
            class="text-teal-600 hover:text-cyan-600 font-semibold transition-colors mr-2"
          >
            Connection
          </button>
          <span class="text-slate-300">|</span>
          <button
            onClick=${() => openModal('edit', d)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors ml-2"
          >
            Edit
          </button>
        </td>
      </tr>
    `;
  };

  if (!varswitch) return '';

  return html`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col justify-center items-center">
      <!-- Decorative background glow -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
          Switch(es) pin(s)
        </div>

        <div class="flex-grow flex flex-col justify-center items-center w-full">
          <div class="w-full">
            <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6 overflow-auto">
              <div class="overflow-x-auto w-full">
                <table class="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <${Th} title="ID" tooltipIndex=${1} />
                      <${Th} title="Pin" tooltipIndex=${2} />
                      <${Th} title="Pullup type" tooltipIndex=${3} />
                      <${Th} title="Device connection" tooltipIndex=${4} />
                      <${Th} title="INFO" tooltipIndex=${5} />
                      <${Th} title="On/Off" tooltipIndex=${6} />
                      <${Th} title="Action" tooltipIndex=${7} />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/40">
                    ${varswitch.map(
                      (d, index) =>
                        html`<${ArraySwitch} d=${d} index=${index} key=${d.id} />`
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <button
                onclick=${() => setShowHelp(!showHelp)}
                class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
              >
                ${showHelp ? 'Hide Help' : 'Show Help'}
              </button>
            </div>

            ${showHelp &&
              html`
                <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                  ${helpContent[language]}
                </div>
              `}
          </div>
        </div>

        ${isModalOpen &&
          html`
            <${ModalSwitch}
              modalType=${modalType}
              page="TabSwitch"
              hideModal=${closeModal}
              title=${modalType === 'connection'
                ? 'Edit Connection'
                : 'Edit switch'}
              selectedSwitch=${selectedSwitch}
              onSwitchChange=${handleSwitchChange}
            />
          `}
      </div>
    </div>
  `;
}

export { TabSwitch };