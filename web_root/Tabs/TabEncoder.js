import { ModalEncoder } from '../Modals/ModalEncoder.js';
import { h, render, useState, useEffect, useRef, useContext, html, Router } from '../bundle.js';
import { safeFetch } from '../safeFetch.js';
import { StateContext } from '../context.js';
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

export const pwmTimerMap = {
  'PA0': 'TIM2', 'PA3': 'TIM2', 'PB10': 'TIM2',
  'PA6': 'TIM3', 'PB1': 'TIM3',
  'PB15': 'TIM12',
  'PC6': 'TIM8', 'PC7': 'TIM8', 'PC8': 'TIM8', 'PC9': 'TIM8',
  'PD12': 'TIM4', 'PD13': 'TIM4', 'PD14': 'TIM4', 'PD15': 'TIM4',
  'PE5': 'TIM9', 'PE6': 'TIM9',
  'PE9': 'TIM1', 'PE11': 'TIM1', 'PE13': 'TIM1', 'PE14': 'TIM1',
  'PF6': 'TIM10', 'PF7': 'TIM11', 'PF8': 'TIM13', 'PF9': 'TIM14'
};

function TabEncoder({ }) {
  {
    const [varencoder, setEncoder] = useState(null);
    const [saveResult, setSaveResult] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedEncoder, setSelectedEncoder] = useState(null);
    const [showHelp, setShowHelp] = useState(false);
    const [language, setLanguage] = useState('ru');
    const [pintopin, setPintopin] = useState([]);
    const isPendingOnOff = useRef(false);

    // Инициализируем глобальный tooltip один раз при монтировании
    useEffect(() => { initGlobalTooltip(); }, []);

    const refresh = () =>
      Promise.all([
        fetch('/api/encoder/get').then((r) => r.json()),
        fetch('/api/pintopin/get').then((r) => r.json())
      ])
        .then(([encoderData, pintopinData]) => {
          setLanguage(encoderData.lang);
          setEncoder(encoderData.encoders);
          setPintopin(pintopinData);
          console.log('Encoder data:', encoderData.encoders);
          console.log('Pintopin data:', pintopinData);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });

    const fetchEncoderData = () => {
      safeFetch('/api/encoder/get', 'encoder').then(data => {
        if (!data) return;
        if (isPendingOnOff.current) {
          return;
        }
        setEncoder(data.encoders);
        setLanguage(data.lang);
      });
    };

    const fetchPintopinData = () => {
      safeFetch('/api/pintopin/get', 'pintopin-enc').then(data => {
        if (!data) return;
        setPintopin(data);
      });
    };

    useEffect(() => {
      let timer = null;
      let isFetching = false;

      fetchEncoderData();
      fetchPintopinData();

      const poll = () => {
        if (isFetching) return;
        if (isPendingOnOff.current) return;
        isFetching = true;
        safeFetch('/api/encoders', 'encoder-slice').then(data => {
          if (!data) return;
          if (data.encoders) { setEncoder(data.encoders); setLanguage(data.lang); }
          if (data.pintopin) setPintopin(data.pintopin);
        }).finally(() => { isFetching = false; });
      };

      timer = setInterval(poll, window.pollIntervalMs || 1000);// было 3000
      return () => clearInterval(timer);
    }, []);

    const handleEncoderChange = (updatedEncoder) => {
      setEncoder((prevEncoders) =>
        prevEncoders.map((enc) =>
          enc.id === updatedEncoder.id ? updatedEncoder : enc
        )
      );

      isPendingOnOff.current = true;

      fetch('/api/onoff/set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: updatedEncoder.id, onoff: updatedEncoder.onoff })
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Response from /api/onoff/set (Encoder):', data);
        })
        .catch((error) => {
          console.error('Error calling /api/onoff/set (Encoder):', error);
        })
        .finally(() => {
          isPendingOnOff.current = false;
        });
    };

    const getConnectedPins = (encoderId) => {
      const encoderItem = varencoder.find((enc) => enc.id === encoderId);
      const connectedPins = [];

      if (encoderItem && encoderItem.pinact) {
        Object.entries(encoderItem.pinact).forEach(([pin, idout]) => {
          connectedPins.push({ pin, idout });
        });
      }

      return connectedPins;
    };

    const getFreqStatus = (mhz) => {
      const hz = mhz / 1000;
      if (hz <= 40000) return { cls: 'text-green-600', msg: '✓' };
      if (hz <= 200000) return { cls: 'text-yellow-600', msg: '~' };
      return { cls: 'text-red-600', msg: '!' };
    };

    const formatPwmFreq = (mhz) => {
      if (!mhz) return '—';
      const hz = mhz / 1000;
      if (hz >= 1000000) return `${(hz / 1000000).toFixed(2)} MHz`;
      if (hz >= 1000) return `${(hz / 1000).toFixed(1)} kHz`;
      return `${hz} Hz`;
    };

    const getLangObject = () => ({
      langbutton: language === 'ru' ? ruencoder : enencoder
    });

    const getTooltipText = (key, index) => {
      const langObject = getLangObject();
      const tooltipText =
        langObject[key] && langObject[key][index] ? langObject[key][index] : '';
      return formatText(tooltipText);
    };

    const formatText = (text, maxLength = 50) => {
      if (!text || typeof text !== 'string') return '';

      const words = text.split(' ');
      let lines = [];
      let currentLine = '';

      for (let i = 0; i < words.length; i++) {
        if (currentLine.length + words[i].length + 1 <= maxLength) {
          currentLine += `${currentLine ? ' ' : ''}${words[i]}`;
        } else {
          if (currentLine) lines.push(currentLine.trim());
          currentLine = words[i];
        }
      }

      if (currentLine) lines.push(currentLine.trim());

      return lines.join('\n');
    };

    const onsave = (id, pinInfo) => {
      console.log('Deleting connection:', id, pinInfo);

      const pinName = pinInfo.split('(')[0].trim();

      fetch('/api/connection/del', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, pin: pinName })
      })
        .then((response) => {
          if (!response.ok) {
            return response.text().then((text) => {
              throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
            });
          }
          return response.json();
        })
        .then((r) => {
          setSaveResult(r);
          setEncoder((prevEncoder) =>
            prevEncoder.map((enc) => {
              if (enc.id === id) {
                const updatedPinact = { ...enc.pinact };
                delete updatedPinact[pinName];
                return { ...enc, pinact: updatedPinact };
              }
              return enc;
            })
          );
          setPintopin((prevPintopin) =>
            prevPintopin.filter(
              (item) => !(item.idin === id && item.pins === pinName)
            )
          );
        })
        .then(() => {
          console.log('Connection deleted successfully');
          refresh();
        })
        .catch((error) => {
          console.error('Error deleting connection:', error);
        });
    };

    const openModal = (type, encoderData) => {
      console.log('Opening modal:', type, encoderData);
      setModalType(type);
      setSelectedEncoder(encoderData);
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
      setModalType(null);
      setSelectedEncoder(null);
    };

    const helpContent = {
      ru: html`
        <div class="mytext space-y-6">
          <div>
            <pre class="mb-4">
              Данный API позволяет дистанционно управлять энкодером, просто выполнив команду в браузере любого устройства в вашей локальной сети.
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
                    http://192.168.1.24:8000/api/Zerg/pwm?id=4&dvalue=25
                  </td>
                  <td class="border px-4 py-2">
                    Данная API команда установит значение димера в 25% для PWM-пина с id = 4. Где "Zerg" это Ваш 'Token'.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <pre class="mb-4">
              MQTT позволяет дистанционно управлять энкодером из интернета!
            </pre>
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Примеры команд MQTT</h2>
            <table class="w-full">
              <thead>
                <tr>
                  <th class="border px-4 py-2">API</th>
                  <th class="border px-4 py-2">Описание</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border px-4 py-2">Zerg/pwm/id=4/dvalue=25</td>
                  <td class="border px-4 py-2">
                    Данная MQTT команда установит значение диммера в 25% для PWM-пина с id = 4. Где "Zerg" это Ваш 'RX topic'.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Отслеживание изменений</h2>
            <div class="bg-teal-50 p-4 rounded-lg border border-teal-100 text-sm">
              <p class="mb-3">Контроллер автоматически публикует состояние сенсоров и PWM-выходов в MQTT-топик <strong>Swarm/sensors/</strong>, где <strong>"Swarm"</strong> — ваш TX topic.</p>
              <p class="mb-2 font-semibold text-teal-800">Формат пакета:</p>
              <div class="font-mono bg-white/70 border border-teal-200 px-3 py-2 mb-3 text-xs rounded">
                {"sn":value,"hid":[Tvalue, Hvalue],"pid":Duty}
              </div>
              <li><b>Пример: {"28B63A75D0013C7B":26.44,"h46":[20.6,46.0],"p24":18}</b></li>
              <ul class="list-disc pl-5 space-y-1 text-slate-700">
                <li><b>sn</b> — серийный номер DS18B20 : (Tvalue - температура, °C)</li>
                <li><b>hid</b> — датчик DHT22 : (массив [Tvalue - значение температуры, Hvalue - значение влажности])</li>
                <li><b>pid</b> — PWM-выход : (значение Duty 0–100%)</li>
              </ul>
            </div>
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2 text-indigo-700">Ограничения аппаратных таймеров (Hardware Timers)</h2>
            <div class="bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-sm">
              <p class="mb-2"><strong>Важно:</strong> Вы можете установить желаемую частоту ШИМ от <strong>0.05 Hz до 2 MHz</strong>. Однако, генерация ШИМ зависит от аппаратных таймеров микроконтроллера (например, TIM1, TIM2 и т.д.).</p>
              <p class="mb-2"><strong>Один таймер не может генерировать разные частоты одновременно!</strong> Если вы назначите разные пины, которые используют <em>один и тот же таймер</em>, к разным энкодерам и зададите им разную частоту, применится последняя установленная частота ко всем пинам этого таймера.</p>
              <p class="mb-2">Чтобы использовать разную частоту для разных устройств, выбирайте пины, привязанные к <strong>разным таймерам</strong>.</p>
              <p class="mt-4 font-semibold text-indigo-800">Карта привязки пинов ШИМ к таймерам и их возможности:</p>
              <ul class="list-disc pl-5 mt-2 space-y-3 text-slate-700">
                <li>
                  <strong>TIM1 (16-bit Advanced):</strong> PE9, PE11, PE13, PE14<br/>
                  <span class="text-sm text-slate-500">Высокоскоростной таймер. Оптимален для средних и высоких частот (от 10 Hz до 2 MHz).</span>
                </li>
                <li>
                  <strong>TIM2 (32-bit):</strong> PA0, PA3, PB10<br/>
                  <span class="text-sm text-slate-500">За счет 32-битного счетчика аппаратно поддерживает сверхнизкие частоты с максимальным разрешением (от 0.05 Hz до 100 kHz).</span>
                </li>
                <li>
                  <strong>TIM3 (16-bit General):</strong> PA6, PB1<br/>
                  <span class="text-sm text-slate-500">Базовый ШИМ таймер (от 10 Hz до 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM4 (16-bit General):</strong> PD12, PD13, PD14, PD15<br/>
                  <span class="text-sm text-slate-500">Базовый ШИМ таймер (от 10 Hz до 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM8 (16-bit Advanced):</strong> PC6, PC7, PC8, PC9<br/>
                  <span class="text-sm text-slate-500">Высокоскоростной таймер. Оптимален для средних и высоких частот (от 10 Hz до 2 MHz).</span>
                </li>
                <li>
                  <strong>TIM9 (16-bit):</strong> PE5, PE6<br/>
                  <span class="text-sm text-slate-500">Вспомогательный таймер (от 10 Hz до 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM10 (16-bit):</strong> PF6<br/>
                  <span class="text-sm text-slate-500">Вспомогательный таймер (от 10 Hz до 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM11 (16-bit):</strong> PF7<br/>
                  <span class="text-sm text-slate-500">Вспомогательный таймер (от 10 Hz до 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM12 (16-bit):</strong> PB15<br/>
                  <span class="text-sm text-slate-500">Вспомогательный таймер (от 10 Hz до 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM13 (16-bit):</strong> PF8<br/>
                  <span class="text-sm text-slate-500">Вспомогательный таймер (от 10 Hz до 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM14 (16-bit):</strong> PF9<br/>
                  <span class="text-sm text-slate-500">Вспомогательный таймер (от 10 Hz до 500 kHz).</span>
                </li>
              </ul>
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
                    http://192.168.1.24:8000/api/Zerg/pwm?id=7&dvalue=25
                  </td>
                  <td class="border px-4 py-2">
                    This command will set the dimmer to 25% for the PWM-pin with ID=7. Where "Zerg" is your 'Token'.
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
                  <td class="border px-4 py-2">Zerg/pwm/id=7/dvalue=25</td>
                  <td class="border px-4 py-2">
                    This command will set the dimmer to 25% for the PWM-pin with ID=7. Where "Zerg" is your 'RX topic'.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Change Tracking</h2>
            <div class="bg-teal-50 p-4 rounded-lg border border-teal-100 text-sm">
              <p class="mb-3">The controller automatically publishes sensor states and PWM output values to the MQTT topic <strong>Swarm/sensors/</strong>, where <strong>"Swarm"</strong> is your TX topic.</p>
              <p class="mb-2 font-semibold text-teal-800">Packet format:</p>
              <div class="font-mono bg-white/70 border border-teal-200 px-3 py-2 mb-3 text-xs rounded">
                {"sn":value,"hid":[Tvalue, Hvalue],"pid":Duty}
              </div>
              <li><b>Example: {"28B63A75D0013C7B":26.44,"h46":[20.6,46.0],"p24":18}</b></li>
              <ul class="list-disc pl-5 space-y-1 text-slate-700">
                <li><b>sn</b> — DS18B20 serial number : (Tvalue — temperature, °C)</li>
                <li><b>hid</b> — DHT22 sensor : (array [Tvalue — temperature, Hvalue — humidity])</li>
                <li><b>pid</b> — PWM output : (Duty value 0–100%)</li>
              </ul>
            </div>
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2 text-indigo-700">Hardware Timer Limitations</h2>
            <div class="bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-sm">
              <p class="mb-2"><strong>Important:</strong> You can set the desired PWM frequency from <strong>0.05 Hz to 2 MHz</strong>. However, PWM generation depends on the microcontroller's hardware timers (e.g., TIM1, TIM2, etc.).</p>
              <p class="mb-2"><strong>A single timer cannot generate different frequencies simultaneously!</strong> If you assign different pins that share the <em>same timer</em> to different encoders and set different frequencies, the last set frequency will apply to all pins sharing that timer.</p>
              <p class="mb-2">To use different frequencies for different devices, choose pins connected to <strong>different hardware timers</strong>.</p>
              <p class="mt-4 font-semibold text-indigo-800">PWM Pin to Timer Mapping and Capabilities:</p>
              <ul class="list-disc pl-5 mt-2 space-y-3 text-slate-700">
                <li>
                  <strong>TIM1 (16-bit Advanced):</strong> PE9, PE11, PE13, PE14<br/>
                  <span class="text-sm text-slate-500">High-speed timer. Optimal for medium and high frequencies (from 10 Hz to 2 MHz).</span>
                </li>
                <li>
                  <strong>TIM2 (32-bit):</strong> PA0, PA3, PB10<br/>
                  <span class="text-sm text-slate-500">32-bit counter natively supports ultra-low frequencies with maximum resolution (from 0.05 Hz to 100 kHz).</span>
                </li>
                <li>
                  <strong>TIM3 (16-bit General):</strong> PA6, PB1<br/>
                  <span class="text-sm text-slate-500">Standard PWM timer (from 10 Hz to 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM4 (16-bit General):</strong> PD12, PD13, PD14, PD15<br/>
                  <span class="text-sm text-slate-500">Standard PWM timer (from 10 Hz to 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM8 (16-bit Advanced):</strong> PC6, PC7, PC8, PC9<br/>
                  <span class="text-sm text-slate-500">High-speed timer. Optimal for medium and high frequencies (from 10 Hz to 2 MHz).</span>
                </li>
                <li>
                  <strong>TIM9 (16-bit):</strong> PE5, PE6<br/>
                  <span class="text-sm text-slate-500">Auxiliary timer (from 10 Hz to 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM10 (16-bit):</strong> PF6<br/>
                  <span class="text-sm text-slate-500">Auxiliary timer (from 10 Hz to 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM11 (16-bit):</strong> PF7<br/>
                  <span class="text-sm text-slate-500">Auxiliary timer (from 10 Hz to 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM12 (16-bit):</strong> PB15<br/>
                  <span class="text-sm text-slate-500">Auxiliary timer (from 10 Hz to 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM13 (16-bit):</strong> PF8<br/>
                  <span class="text-sm text-slate-500">Auxiliary timer (from 10 Hz to 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM14 (16-bit):</strong> PF9<br/>
                  <span class="text-sm text-slate-500">Auxiliary timer (from 10 Hz to 500 kHz).</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      `
    };

    // -------------------------------------------------------------------------
    // Th — заголовок таблицы с tooltip через data-tip (портал в body)
    // -------------------------------------------------------------------------
    const Th = ({ title, tooltipIndex }) => html`
      <th
        class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
        data-tip=${getTooltipText('langbutton', tooltipIndex)}
      >
        ${title}
      </th>
    `;

    const ArrayEncoder = ({ d, index }) => {
      const connectedPins = getConnectedPins(d.id);
      const fStatus = getFreqStatus(d.pwm || 0);

      const connectedTimers = connectedPins
        .map(p => pwmTimerMap[p.pin])
        .filter((t, i, arr) => t && arr.indexOf(t) === i);

      return html`
        <tr class="${index % 2 === 1 ? 'bg-white/80' : 'bg-sky-200/40'} hover:bg-slate-200/80 transition-colors">
          <td class="px-6 py-2 text-sm text-slate-800 font-medium">${d.pins}(${d.id})</td>
          <td class="px-6 py-2 text-sm text-slate-700">
            ${d.encdrbpin ? `${d.encdrbpin}(${d.encoderb})` : 'Not set'}
          </td>
          <td class="px-6 py-2 text-sm text-slate-700 font-mono">
            ${connectedPins.length > 0
          ? connectedPins.map(
            ({ pin, idout }) => html`
                    <span class="mr-2 inline-flex items-center">
                      ${pin}(${idout})
                      <button
                        onClick=${(e) => {
                e.preventDefault();
                onsave(d.id, `${pin}(${idout})`);
              }}
                        class="ml-1 text-red-500 hover:text-red-700 transition-colors font-bold"
                        title="Remove connection"
                      >
                        [x]
                      </button>
                    </span>
                  `
          )
          : 'Not set'}
          </td>
          <td class="px-6 py-2 text-sm">
            <span class="font-mono text-slate-700">${formatPwmFreq(d.pwm)}</span>
            <span class="ml-1 font-bold ${fStatus.cls}">${fStatus.msg}</span>
            ${connectedTimers.length > 0 ? html`<span class="ml-2 font-mono text-xs text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200 shadow-sm" title="Hardware Timer">${connectedTimers.join(', ')}</span>` : ''}
          </td>
          <td class="px-6 py-2 font-mono text-sm text-blue-600">
            ${d.pwmmax ? `${d.pwmmax} steps` : '—'}
          </td>
          <td class="px-6 py-2 text-sm text-slate-800">${d.dvalue}</td>
          <td class="px-6 py-2 text-sm text-slate-700 font-semibold">${d.ponr === 1 ? 'ON' : 'OFF'}</td>
          <td class="px-6 py-2 text-sm text-slate-600">${d.info}</td>
          <td class="px-6 py-2">
            <${MyPolzunok}
              value=${d.onoff}
              onChange=${(value) => handleEncoderChange({ ...d, onoff: value })}
            />
          </td>
          <td class="px-6 py-2 text-sm whitespace-nowrap">
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
              Edit Encdr.
            </button>
          </td>
        </tr>
      `;
    };

    if (!varencoder) return html`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">Loading...</div>`;

    return html`
      <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col justify-center items-center">
        <!-- Decorative background glow -->
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div class="w-full relative z-10">
          <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
            Encoder(s) pin(s)
          </div>
          <div class="flex-grow flex flex-col justify-center items-center w-full">
            <div class="w-full">
              <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6 overflow-auto">
                <div class="overflow-x-auto w-full">
                  <table class="w-full text-left border-collapse whitespace-nowrap">
                    <thead>
                      <tr class="bg-teal-600/10 border-b border-teal-600/20">
                        <${Th} title="Encoder A (ID)" tooltipIndex=${3} />
                        <${Th} title="Encoder B (ID)" tooltipIndex=${4} />
                        <${Th} title="PWM connection" tooltipIndex=${5} />
                        <${Th} title="PWM Frequency" tooltipIndex=${11} />
                        <${Th} title="Resolution (steps)" tooltipIndex=${12} />
                        <${Th} title="Dimmer value (0-100)" tooltipIndex=${6} />
                        <${Th} title="Duty on restore" tooltipIndex=${7} />
                        <${Th} title="INFO" tooltipIndex=${8} />
                        <${Th} title="On/Off" tooltipIndex=${9} />
                        <${Th} title="Action" tooltipIndex=${10} />
                      </tr>
                    </thead>
                    <tbody id="tab1" class="divide-y divide-white/40">
                      ${varencoder.map(
      (d, index) =>
        html`<${ArrayEncoder} d=${d} index=${index} key=${d.id} />`
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
              <${ModalEncoder}
                modalType=${modalType}
                page="TabEncoder"
                hideModal=${closeModal}
                title=${modalType === 'connection'
          ? 'Edit Connection'
          : 'Edit Encoder'}
                selectedEncoder=${selectedEncoder}
                handleEncoderChange=${handleEncoderChange}
              />
            `}
        </div>
      </div>
    `;
  }
}

export { TabEncoder };