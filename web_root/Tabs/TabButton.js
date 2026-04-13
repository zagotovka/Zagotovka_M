import { ModalButton } from '../Modals/ModalButton.js';
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

const TabButton = () => {
  const [buttonData, setButtonData] = useState(null);
  const [pintopin, setPintopin] = useState([]);
  const [varbutton, setButton] = useState(null);
  const [saveResult, setSaveResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [language, setLanguage] = useState('ru');
  const [debugInfo, setDebugInfo] = useState('');
  const [isUpdating, setIsUpdating] = useState(true);

  // Инициализируем глобальный tooltip один раз при монтировании
  useEffect(() => { initGlobalTooltip(); }, []);

  const helpContent = {
    ru: html`
      <div class="mytext space-y-6">
        <div>
          <pre class="mb-4">
            Данный API позволяет дистанционно управлять кнопкой, просто выполнив команду в браузере любого устройства в вашей локальной сети.
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
                  http://192.168.1.24:8000/api/Zerg/button?id=30&single_click
                </td>
                <td class="border px-4 py-2">
                  Данная API команда выполнит действие, прописанное в 'SINGLE CLICK' c id = 30. Где "Zerg" это Ваш 'Token'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/button?id=30&double_click
                </td>
                <td class="border px-4 py-2">
                  Данная API команда выполнит действие, прописанное в 'DOUBLE CLICK' c id = 30. Где "Zerg" это Ваш 'Token'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/button?id=30&long_press
                </td>
                <td class="border px-4 py-2">
                  Данная API команда выполнит действие, прописанное в 'LONG PRESS' c id = 30. Где "Zerg" это Ваш 'Token'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <pre class="mb-4">
            MQTT позволяет дистанционно управлять кнопкой из интернета!
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
                <td class="border px-4 py-2">Swarm/button/id=30/single_click</td>
                <td class="border px-4 py-2">
                  Данная MQTT команда выполнит команду, прописанную в 'SINGLE CLICK' c id = 30. Где "Swarm" это Ваш 'TX topic'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Swarm/button/id=30/double_click</td>
                <td class="border px-4 py-2">
                  Данная MQTT команда выполнит команду, прописанную в 'DOUBLE CLICK' c id = 30. Где "Swarm" это Ваш 'TX topic'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Swarm/button/id=30/long_press</td>
                <td class="border px-4 py-2">
                  Данная MQTT команда выполнит команду, прописанную в 'LONG PRESS' c id = 30. Где "Swarm" это Ваш 'TX topic'.
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
                <td class="border px-4 py-2">Swarm/button/</td>
                <td class="border px-4 py-2">
                  Данная страница отслеживает изменения кнопок и автоматически отправляет каждое изменение по MQTT на топик: Swarm/button/.
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
                <th class="border px-4 py-2">Источник</th>
                <th class="border px-4 py-2">Команда</th>
                <th class="border px-4 py-2">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">SMS</td>
                <td class="border px-4 py-2">30#SL*</td>
                <td class="border px-4 py-2">Выполняет действие, прописанное в SINGLE CLICK для кнопки с id = 30.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">SMS</td>
                <td class="border px-4 py-2">30#DC*</td>
                <td class="border px-4 py-2">Выполняет действие, прописанное в DOUBLE CLICK для кнопки с id = 30.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">SMS</td>
                <td class="border px-4 py-2">30#LP*</td>
                <td class="border px-4 py-2">Выполняет действие, прописанное в LONG PRESS для кнопки с id = 30.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">DTMF (Звонок)</td>
                <td class="border px-4 py-2">30#3*</td>
                <td class="border px-4 py-2">Аналог 30#SL*. Выполняет SINGLE CLICK. (в тональном режиме букв нет)</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">DTMF (Звонок)</td>
                <td class="border px-4 py-2">30#4*</td>
                <td class="border px-4 py-2">Аналог 30#DC*. Выполняет DOUBLE CLICK.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">DTMF (Звонок)</td>
                <td class="border px-4 py-2">30#5*</td>
                <td class="border px-4 py-2">Аналог 30#LP*. Выполняет LONG PRESS.</td>
              </tr>
            </tbody>
          </table>
          <div class="mt-2 text-sm text-slate-500">
            Примечание: При желании, вы можете использовать цифровые команды (30#3*, 30#4*, 30#5*) в том числе и в SMS-сообщениях.
          </div>
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
                  http://192.168.1.24:8000/api/Zerg/button?id=30&single_click
                </td>
                <td class="border px-4 py-2">
                  This API command will execute the action specified in 'SINGLE CLICK' with id = 30. Where "Zerg" is your 'Token'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/button?id=30&double_click
                </td>
                <td class="border px-4 py-2">
                  This API command will execute the action specified in 'DOUBLE CLICK' with id = 30. Where "Zerg" is your 'Token'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/button?id=30&long_press
                </td>
                <td class="border px-4 py-2">
                  This API command will execute the action specified in 'LONG PRESS' with id = 30. Where "Zerg" is your 'Token'.
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
                <td class="border px-4 py-2">Swarm/button/id=30/single_click</td>
                <td class="border px-4 py-2">
                  This MQTT command will execute the command specified in 'SINGLE CLICK' with id = 30. Where "Swarm" is your 'RX topic'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Swarm/button/id=30/double_click</td>
                <td class="border px-4 py-2">
                  This MQTT command will execute the command specified in 'DOUBLE CLICK' with id = 30. Where "Swarm" is your 'RX topic'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Swarm/button/id=30/long_press</td>
                <td class="border px-4 py-2">
                  This MQTT command will execute the command specified in 'LONG PRESS' with id = 30. Where "Swarm" is your 'RX topic'.
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
                <td class="border px-4 py-2">Swarm/button/</td>
                <td class="border px-4 py-2">
                  This page tracks changes in buttons and automatically sends each change via MQTT to the topic: Swarm/button/. Where "Swarm" is your 'RX topic'.
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
                <th class="border px-4 py-2">Source</th>
                <th class="border px-4 py-2">Command</th>
                <th class="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">SMS</td>
                <td class="border px-4 py-2">30#SL*</td>
                <td class="border px-4 py-2">Executes the action specified in SINGLE CLICK for button with id = 30.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">SMS</td>
                <td class="border px-4 py-2">30#DC*</td>
                <td class="border px-4 py-2">Executes the action specified in DOUBLE CLICK for button with id = 30.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">SMS</td>
                <td class="border px-4 py-2">30#LP*</td>
                <td class="border px-4 py-2">Executes the action specified in LONG PRESS for button with id = 30.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">DTMF (Call)</td>
                <td class="border px-4 py-2">30#3*</td>
                <td class="border px-4 py-2">Same as 30#SL*. Executes SINGLE CLICK. (since letters are unavailable in DTMF)</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">DTMF (Call)</td>
                <td class="border px-4 py-2">30#4*</td>
                <td class="border px-4 py-2">Same as 30#DC*. Executes DOUBLE CLICK.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">DTMF (Call)</td>
                <td class="border px-4 py-2">30#5*</td>
                <td class="border px-4 py-2">Same as 30#LP*. Executes LONG PRESS.</td>
              </tr>
            </tbody>
          </table>
          <div class="mt-2 text-sm text-slate-500">
            Note: You can also use the digital commands (30#3*, 30#4*, 30#5*) natively via SMS.
          </div>
        </div>
      </div>
    `,
  };

  const refresh = () =>
    Promise.all([fetch('/api/button/get').then((r) => r.json())])
      .then(([buttonData, pintopinData]) => {
        setLanguage(buttonData.lang);
        setButton(buttonData.switches);
        setButtonData(buttonData);
        setPintopin(pintopinData);
        setDebugInfo(
          `Pintopin data: ${JSON.stringify(pintopinData, null, 2)}\n\nButton data: ${JSON.stringify(buttonData.buttons, null, 2)}`
        );
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setDebugInfo(`Error fetching data: ${error.message}`);
      });

  const fetchButtonData = () => {
    fetch('/api/button/get')
      .then((r) => r.json())
      .then((data) => {
        setButton(data.buttons);
        setLanguage(data.lang);
        console.log('Updated button data:', data.buttons);
      })
      .catch((error) => {
        console.error('Error fetching button data:', error);
      });
  };

  useEffect(() => {
    fetchButtonData();

    let intervalId;
    if (isUpdating) {
      intervalId = setInterval(() => {
        fetchButtonData();
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isUpdating]);

  const getConnectedPins = (buttonId) => {
    const connectedPins = new Map();

    const buttonItem = varbutton.find((b) => b.id === buttonId);
    if (buttonItem && buttonItem.pinact) {
      Object.entries(buttonItem.pinact).forEach(([pin, relayId]) => {
        connectedPins.set(pin, { pin, relayId });
      });
    }

    pintopin.forEach((item) => {
      if (item.idin === buttonId) {
        const key = `${item.pins}(${item.idout})`;
        if (!connectedPins.has(key)) {
          connectedPins.set(key, { pin: item.pins, relayId: item.idout });
        }
      }
    });
    return Array.from(connectedPins.values());
  };

  const getLangObject = () => {
    return {
      langbutton: language === 'ru' ? rulangbutton : enlangbutton
    };
  };

  const getTooltipText = (key, index) => {
    const langObject = getLangObject();
    const tooltipText =
      langObject[key] && langObject[key][index] ? langObject[key][index] : '';
    return formatText(tooltipText);
  };

  const formatText = (text, maxLength = 100) => {
    if (!text || typeof text !== 'string') return '';

    const lines = [];
    let currentLine = '';

    const paragraphs = text.split('\n');

    paragraphs.forEach((paragraph, paragraphIndex) => {
      const words = paragraph.split(' ').filter((word) => word.length > 0);

      words.forEach((word) => {
        const wordWithSpace = currentLine.length === 0 ? word : ' ' + word;
        const potentialLength = currentLine.length + wordWithSpace.length;

        if (potentialLength <= maxLength) {
          currentLine += wordWithSpace;
        } else {
          if (currentLine.length > 0) lines.push(currentLine);
          currentLine = word;
        }
      });

      if (currentLine.length > 0) {
        lines.push(currentLine);
        currentLine = '';
      }

      if (paragraphIndex < paragraphs.length - 1) lines.push('');
    });

    if (currentLine.length > 0) lines.push(currentLine);

    return lines.join('\n');
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
        setButton((prevButton) =>
          prevButton.map((b) => {
            if (b.id === id) {
              const updatedPinact = { ...b.pinact };
              delete updatedPinact[pinName.trim()];
              return { ...b, pinact: updatedPinact };
            }
            return b;
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

  const openModal = (type, buttonData) => {
    setModalType(type);
    setSelectedButton(buttonData);
    setIsModalOpen(true);
    setIsUpdating(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedButton(null);
    setIsUpdating(true);
  };

  const handleButtonChange = (updatedButton) => {
    console.log('handleButtonChange:', updatedButton);

    setButton((prevButtons) =>
      prevButtons.map((button) =>
        button.id === updatedButton.id
          ? { ...button, ...updatedButton }
          : button
      )
    );

    fetch('/api/onoff/set', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: updatedButton.id, onoff: updatedButton.onoff })
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

  // -------------------------------------------------------------------------
  // Th — заголовок таблицы с tooltip через data-tip (портал в body)
  // -------------------------------------------------------------------------
  const Th = (props) => html`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${getTooltipText('langbutton', props.tooltipIndex)}
    >
      ${props.title}
    </th>
  `;

  const ArrayButton = ({ d, index }) => {
    const connectedPins = getConnectedPins(d.id);

    return html`
      <tr class="${index % 2 === 1 ? 'bg-white/80' : 'bg-sky-200/40'} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-2 text-sm text-slate-800">${d.id}</td>
        <td class="px-6 py-2 text-sm text-slate-800 font-medium">${d.pins}</td>
        <td class="px-6 py-2 text-sm text-slate-700">
          ${['None', 'GPIO_PULLUP', 'GPIO_PULLDOWN'][d.ptype]}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${formatText(d.sclick)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${formatText(d.dclick)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${formatText(d.lpress)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-600">${d.info}</td>
        <td class="px-6 py-2">
          <${MyPolzunok}
            value=${d.onoff}
            onChange=${(value) => handleButtonChange({ ...d, onoff: value })}
          />
        </td>
        <td class="px-6 py-2 text-sm">
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

  if (!varbutton) return '';

  return html`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col justify-center items-center">
      <!-- Decorative background glow -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
          Button(s) pin(s)
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
                      <${Th} title="SINGLE CLICK" tooltipIndex=${4} />
                      <${Th} title="DOUBLE CLICK" tooltipIndex=${5} />
                      <${Th} title="LONG PRESS" tooltipIndex=${6} />
                      <${Th} title="INFO" tooltipIndex=${7} />
                      <${Th} title="On/Off" tooltipIndex=${8} />
                      <${Th} title="Action" tooltipIndex=${9} />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/40">
                    ${varbutton.map(
                      (d, index) => html`<${ArrayButton} d=${d} index=${index} key=${d.id} />`
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
      </div>
    </div>

    ${isModalOpen &&
      html`
        <${ModalButton}
          modalType=${modalType}
          page="TabButton"
          hideModal=${closeModal}
          title=${modalType === 'connection'
            ? 'Edit Connection'
            : 'Edit Button pin'}
          selectedButton=${selectedButton}
          onButtonChange=${handleButtonChange}
        />
      `}
  `;
};

export { TabButton };