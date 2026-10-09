import { lockToggle } from '../helpLock.js';
import { ModalEncoder } from '../Modals/ModalEncoder.js';
import { condInfo, condBadgeProps, condHelpTitle } from '../condlib.js';
import { CondLibraryPanel, useCondLibrary } from '../CondLibrary.js';
import { h, render, useState, useEffect, useRef, useContext, html, Router } from '../bundle.js';
import { registerPoll, unregisterPoll } from '../pollQueue.js';
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

  // Touch screens: tap on an element with a tooltip shows it, tap elsewhere hides it
  document.addEventListener('click', e => {
    if (!window.matchMedia('(pointer: coarse)').matches) return;
    const el = e.target.closest('[data-tip]');
    if (el) show(el); else hide();
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
    const condLib = useCondLibrary();
    const condsList = condLib.loaded ? condLib.conds : [];
    const isPendingOnOff = useRef(false);
    const isModalOpenRef = useRef(false);

    // Инициализируем глобальный tooltip один раз при монтировании
    useEffect(() => { initGlobalTooltip(); }, []);

    // Библиотека условий (общий стор CondLibrary.js) - для показа текста условия связи
    

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

    useEffect(() => {
      let active = true;

      // ── Загрузка + polling через pollQueue (одно соединение, без нового handshake) ──
      registerPoll('encoders', '/api/state/encoder', function(data) {
        if (!active) return;
        if (isPendingOnOff.current) return;
        if (isModalOpenRef.current) return; // Не обновлять пока модалка открыта
        if (data !== null && data !== undefined) {
          if (data.encoders) { setEncoder(data.encoders); setLanguage(data.lang); }
          if (data.pintopin) setPintopin(data.pintopin);
        }
      }, { immediate: true });

      return function() {
        active = false;
        unregisterPoll('encoders');
      };
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
          setTimeout(() => {
            isPendingOnOff.current = false;
          }, 1500);
        });
    };

    // Сохранение из модалок "Edit Encoder" / "Edit Connection": /api/encoder/set
    // уже записал info/pwm/связи. /api/onoff/set нужен ТОЛЬКО если On/Off
    // реально переключён в модалке: parse_onoff_json() выставляет ШИМ-выходам
    // в связях значение dvalue*pwmmax/100, т.е. Save "включал" их. Ползунок
    // в таблице по-прежнему использует handleEncoderChange.
    const handleEncoderSaved = (updatedEncoder) => {
      console.log('handleEncoderSaved:', updatedEncoder);
      // Строка PWM без энкодера: /api/encoder/set уже применил On/Off на самом PWM-пине
      if (updatedEncoder.kind !== 'pwm' && updatedEncoder.onoff !== selectedEncoder?.onoff) {
        handleEncoderChange(updatedEncoder);
      } else {
        setEncoder((prevEncoders) =>
          prevEncoders.map((enc) =>
            enc.id === updatedEncoder.id ? updatedEncoder : enc
          )
        );
      }
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
      if (hz <= 40000) return { cls: 'text-green-600', msg: 'OK' };
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
      isModalOpenRef.current = true;
    };

    const closeModal = () => {
      setIsModalOpen(false);
      setModalType(null);
      setSelectedEncoder(null);
      isModalOpenRef.current = false;
    };

    const helpContent = {
      ru: html`
      <div class="mytext space-y-6 font-sans text-base leading-relaxed text-slate-700 [&_code]:font-sans [&_code]:font-semibold [&_pre]:font-sans">
        <section class="rounded-2xl border-2 bg-indigo-50 border-indigo-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Как подключить энкодер и PWM-выход (пошагово)</h2>

          <ol class="list-decimal ml-6 space-y-3">
            <li>
              <b>Выберите пины.</b> Откройте страницу <b>"Select pin(s)"</b>. Для первого контакта энкодера выберите режим <b>"Enc.OutA"</b>,
              для второго - <b>"Enc.OutB"</b>, а для лампы или вентилятора - <b>"PWM"</b> (этот режим доступен только у пинов с аппаратным ШИМ).
              Нажмите <b>"Submit"</b>. После этого на этой странице появится строка энкодера (по пину Enc.OutA), а PWM-пин пока будет стоять отдельной строкой с меткой PWM.
            </li>
            <li>
              <b>Свяжите ручку с лампой.</b> В строке энкодера нажмите <b>Connection</b>. В окне Edit Connection в поле <b>Encoder B</b> выберите второй пин энкодера,
              в поле <b>PWM connection</b> - PWM-выход лампы и нажмите <b>Save changes</b>. Один энкодер управляет одним выходом.
            </li>
            <li>
              <b>Настройте выход.</b> Нажмите <b>Edit Encdr.</b> и при необходимости задайте <b>PWM Frequency (milliHz)</b> (значение в миллигерцах: 10000000 - это 10 kHz),
              стартовую яркость в поле <b>Dimmer value %</b>, а в поле <b>Duty on restore</b> выберите, возвращать ли яркость после включения контроллера.
              Не уверены - оставьте значения по умолчанию. Нажмите <b>Save changes</b>.
            </li>
            <li>
              <b>Включите ползунок On/Off</b> в строке энкодера. Если он выключен, ручка меняет только запомненную яркость, а лампа остаётся погашенной.
            </li>
            <li>
              <b>Проверьте:</b> покрутите ручку. Каждый щелчок меняет яркость на 1%, а число в колонке <b>Dimmer value (0-100)</b> меняется на глазах.
            </li>
            <li>
              <b>Если нужно - заприте ручку условием.</b> В окне <b>Connection</b> впишите правило в поле <b>Condition</b> (как это сделать - в блоке про условия ниже).
            </li>
          </ol>

          <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300">
            <b>Как это работает:</b> два пина энкодера (A и B) выдают сигналы со сдвигом, по порядку которых прошивка понимает, в какую сторону вы крутите.
            Один щелчок ручки меняет яркость подключённого PWM-выхода на 1% в пределах от 0 до 100. Выход, у которого нет энкодера
            (строка с меткой PWM), управляется без ручки: Zigbee-диммером, по API, MQTT, SMS, со страниц Timer(s) и PID.
          </div>

          <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300">
            <b>Важно:</b> ползунок <b>On/Off</b> энкодера сильнее всего. Пока он выключен, лампа не светится, сколько ни крутите ручку:
            меняется только запомненное значение, и оно проявится при включении ползунка.
          </div>

          <div class="mt-4">
            <b>Пример.</b> Ручка подключена к пинам <b>PE2</b> (Encoder A) и <b>PE3</b> (Encoder B), лампа - к PWM-пину <b>PE9</b>.
            Пусть в таблице у строки энкодера <b>ID = 20</b>, а у PWM-пина <b>ID = 4</b> (все пины и ID здесь условные, свои смотрите в колонке ID).
            <ul class="list-disc ml-6 mt-1">
              <li>В <b>Select pin(s)</b>: PE2 - <b>Enc.OutA</b>, PE3 - <b>Enc.OutB</b>, PE9 - <b>PWM</b>, затем <b>Submit</b></li>
              <li>В строке с ID 20 нажимаем <b>Connection</b>: в <b>Encoder B</b> выбираем PE3, в <b>PWM connection</b> - PE9, затем <b>Save changes</b></li>
              <li>Включаем ползунок <b>On/Off</b> в строке 20 и крутим ручку</li>
              <li>Выключить лампу с телефона: SMS <code>${'20#00*'}</code>, включить обратно: <code>${'20#11*'}</code> (ID энкодера, а не PWM-пина)</li>
              <li>Выставить яркость 25% по API: <code class="break-all">${'http://192.168.1.24:8000/api/Zerg/pwm?id=4&dvalue=25'}</code> (здесь id - это ID PWM-пина)</li>
            </ul>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Управление по SMS и DTMF</h2>
<div><h4 class="text-lg font-bold text-black mt-4 mb-2">Рубильник On/Off по SMS и DTMF</h4><p class="mb-2">Ползунок On/Off строки энкодера или PWM без энкодера на этой странице можно переключить с телефона, номер которого указан в настройках SIM800L: SMS-сообщением или во время звонка (тональный набор DTMF). Формат команды одинаков на всех страницах: <b>ID#КОД*</b>, где ID - число из колонки ID нужной строки.</p><table class="w-full border-collapse my-2 bg-white/70"><thead><tr><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">Действие</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">SMS</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">DTMF (во время звонка)</th></tr></thead><tbody><tr><td class="border px-3 py-1">Отключить строку (ползунок Off)</td><td class="border px-3 py-1"><code>5#00*</code></td><td class="border px-3 py-1"><code>5#00*#</code></td></tr><tr><td class="border px-3 py-1">Включить строку (ползунок On)</td><td class="border px-3 py-1"><code>5#11*</code></td><td class="border px-3 py-1"><code>5#11*#</code></td></tr></tbody></table><p class="mb-2">В таблице ID = 5 - это пример, подставьте ID своей строки.</p><p class="mb-2">Несколько команд подряд: <code>5#00*7#11*</code> (SMS) и <code>5#00*7#11*#</code> (звонок). Ввод во время звонка всегда завершается символами <code>*#</code>: последняя команда уже заканчивается на <code>*</code>, поэтому в конце добавляется только <code>#</code>.</p><p class="mb-2">Коды для всех страниц: Button, Switch, Encoder, OneWire, Security, Zigbee - <b>00</b> (выкл) и <b>11</b> (вкл); Cron - <b>33</b> и <b>44</b>; PID - <b>55</b> и <b>66</b>.</p><p class="mb-2">В ответ приходит SMS-отчёт, например <code>OnOff: Pin5=OFF</code> (отчёт отправляется, только если включён общий ползунок SIM800L). Неверные команды попадают в список Invld pins/cmd.</p><p class="mb-2"><b>Строка PWM без энкодера:</b> <code>12#00*</code> выключает выход (на нём 0%, заданная яркость запоминается), <code>12#11*</code> включает его обратно; ответ - <code>OnOff: Pin12=OFF</code> или <code>OnOff: Pin12=ON</code>. ID = 12 - пример, подставьте ID своей строки. Состояние рубильника сохраняется и после перезагрузки.</p><p class="mb-2">Команда отклоняется (попадёт в Invld pins/cmd), если PWM подключён к энкодеру (используйте ID энкодера), управляется PID (используйте коды PID 55 и 66) или идёт автотюн PID.</p></div>
        </section>
        <section class="rounded-2xl border-2 bg-emerald-50 border-emerald-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Управление по API (локальная сеть)</h2>
          <div>
            <p class="mb-1">Данный API позволяет дистанционно управлять яркостью PWM-выхода (диммера), просто выполнив команду в браузере любого устройства в вашей локальной сети.</p>
            <p class="rounded-xl border border-red-300 bg-red-50 px-4 py-2 font-bold text-red-700">Не открывайте доступ из интернета к вашим API - это небезопасно!</p>
          </div>
          <div>
            <h3 class="text-lg font-bold text-black mb-2">Примеры API</h3>
            <table class="w-full bg-white/70">
              <thead>
                <tr>
                  <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">API</th>
                  <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Описание</th>
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
            <ul class="list-disc ml-6 mb-2 space-y-1"><li>id - это ID самого PWM-пина (у строки с меткой PWM - её собственный ID).</li><li>Если рубильник On/Off выхода выключен (или выключен связанный энкодер), значение запоминается, но на выходе остаётся 0%.</li><li>Если выходом управляет PID, регулятор перезапишет значение на следующем цикле. Во время автотюна PID команда отклоняется (ошибка 409).</li></ul>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-violet-50 border-violet-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">MQTT: управление и отслеживание</h2>
          <div>
            <p class="mb-1">MQTT позволяет дистанционно управлять PWM-выходами (диммерами) из интернета!</p>
          </div>
          <div>
            <h3 class="text-lg font-bold text-black mb-2">Примеры команд MQTT</h3>
            <table class="w-full bg-white/70">
              <thead>
                <tr>
                  <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">API</th>
                  <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Описание</th>
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
            <p class="mb-2">Рубильник On/Off, PID и автотюн действуют так же, как у API: при выключенном рубильнике значение запоминается, но на выходе остаётся 0%.</p>
          </div>
          <div>
            <h3 class="text-lg font-bold text-black mb-2">Отслеживание изменений</h3>
            <div class="bg-violet-50 p-4 rounded-lg border border-violet-200 text-sm">
              <p class="mb-3">Контроллер автоматически публикует состояние сенсоров и PWM-выходов в MQTT-топик <strong>Swarm/sensors/</strong>, где <strong>"Swarm"</strong> — ваш TX topic.</p>
              <p class="mb-2 font-semibold text-violet-800">Формат пакета:</p>
              <div class="font-semibold bg-white/70 border border-violet-200 px-3 py-2 mb-3 text-xs rounded">
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
        </section>
        <section class="rounded-2xl border-2 bg-teal-50 border-teal-300 p-5 space-y-4"><h2 class="text-xl font-bold text-black">Строки таблицы и поля настройки</h2>
          <div>
            <p class="mb-2">В таблице бывает два вида строк.</p>
            <ul class="list-disc ml-6 mb-2 space-y-1">
              <li><b>Строка энкодера</b> - пины Encoder A и Encoder B, подключённый PWM-выход (PWM connection) и условие (Condition). Ручкой меняется яркость подключённого выхода. В колонке Action две кнопки: <b>Connection</b> (пин Encoder B, PWM connection, Condition, Zigbee Device) и <b>Edit Encdr.</b> (параметры выхода).</li>
              <li><b>Строка с меткой PWM</b> - PWM-пин, на который не ссылается ни один энкодер. В колонках Encoder A, Encoder B, PWM connection и Condition у неё прочерки. Так настраивается выход, которым управляют без ручки: Zigbee-диммер, API, MQTT, страницы Timer(s) и PID. Если подключить такой PWM к энкодеру (Edit энкодера - PWM connection), он перейдёт в строку этого энкодера.</li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-bold text-black mb-2">Окна Edit PWM и Edit Encdr.: что можно настроить</h3>
            <table class="w-full border-collapse my-2 bg-white/70"><thead><tr><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">Поле</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">Что делает</th></tr></thead><tbody><tr><td class="border px-3 py-1 whitespace-nowrap"><b>PWM Frequency (milliHz)</b></td><td class="border px-3 py-1">Частота ШИМ в миллигерцах (от 50 до 2000000000, то есть от 0.05 Hz до 2 MHz). Применяется сразу, без перезагрузки.</td></tr><tr><td class="border px-3 py-1 whitespace-nowrap"><b>Resolution</b></td><td class="border px-3 py-1">Число шагов яркости. Только для чтения: прошивка считает его сама по частоте.</td></tr><tr><td class="border px-3 py-1 whitespace-nowrap"><b>Dimmer value %</b></td><td class="border px-3 py-1">Яркость выхода в процентах.</td></tr><tr><td class="border px-3 py-1 whitespace-nowrap"><b>Duty on restore</b></td><td class="border px-3 py-1">Восстановить яркость после включения контроллера.</td></tr><tr><td class="border px-3 py-1 whitespace-nowrap"><b>INFO</b></td><td class="border px-3 py-1">Название строки для быстрой навигации.</td></tr><tr><td class="border px-3 py-1 whitespace-nowrap"><b>On/Off</b></td><td class="border px-3 py-1">Рубильник выхода. В положении Off на выходе 0%, а заданное значение запоминается и вернётся при включении. Рубильник сохраняется: после перезагрузки выключенный выход остаётся выключенным. Переключается ползунком, а также по SMS и DTMF (команды - в разделе «Управление по SMS и DTMF»). У PWM, настроенных раньше, ползунок показывает «включено» и ничего не гасит, пока вы сами его не переключите.</td></tr><tr><td class="border px-3 py-1 whitespace-nowrap"><b>Полярность PWM / CH Polarity</b></td><td class="border px-3 py-1">Normal: 20% в интерфейсе = 20% на нагрузке. Inverted: для плат с инвертирующим каскадом (например, оптрон 6N137): активным уровнем выхода становится LOW, и 20% в интерфейсе по-прежнему дают 20% на нагрузке. Применяется сразу, сохраняется и действует после перезагрузки. Настройка у каждого PWM-пина своя, в Edit энкодера она относится к подключённому PWM.</td></tr><tr><td class="border px-3 py-1 whitespace-nowrap"><b>Zigbee Device</b></td><td class="border px-3 py-1">Zigbee-диммер управляет этим PWM напрямую, пины Encoder A/B не нужны. Рубильник On/Off при этом сохраняет силу.</td></tr></tbody></table>
          </div>
          <div>
            <h3 class="text-lg font-bold text-black mb-2">Метки в строке PWM</h3>
            <ul class="list-disc ml-6 mb-2 space-y-1">
              <li><b>PWM</b> - строка без энкодера.</li>
              <li><b>PID</b> - выходом управляет PID-регулятор. Значение Dimmer value только для чтения (регулятор перезаписывает его каждый цикл), а ползунок On/Off заблокирован: у PID свой переключатель.</li>
              <li><b>[lock]</b> - идёт автотюн PID. Настройки этого выхода заблокированы до его окончания.</li>
            </ul>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-amber-50 border-amber-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">${condHelpTitle(true)}</h2>
          <div class="space-y-3">
            <p class="text-slate-600 italic mb-2">Крути ручку, но только если...</p>
            <p class="mb-2">Условие - это «замок» на ручке энкодера. Каждый раз, когда вы поворачиваете ручку на один щелчок, прошивка спрашивает себя: «Условие сейчас верно?». Если верно (ДА) - яркость меняется на 1%. Если неверно (НЕТ) - этот щелчок молча пропускается, яркость не меняется. Условие проверяется <b>заново на каждый щелчок</b>: как только оно снова станет верным, ручка сразу заработает, ничего нажимать и перезапускать не нужно. Если условие не выбрано (None) - ручка работает всегда.</p>

            <div class="p-4 rounded-xl bg-white/80 border border-amber-300 mb-3">
              <p class="text-lg font-bold text-black mb-1">У энкодера условие вписывается в поле Condition</p>
              <p class="mb-1">У кнопок и таймеров условие пишется прямо в действии: <code>${'6:1?D2&!D3'}</code>. У энкодера строки действия нет, поэтому условие пишется <b>свободным текстом</b> в поле <b>Condition</b> окна <b>Connection</b> энкодера.</p>
              <p>Пишите то, что стоит <b>после знака ?</b>. Было <code>${'6:1?D2&!D3'}</code> - в поле пишем только <code>${'D2&!D3'}</code>. Знак ? и часть <code>${'6:1'}</code> писать не надо. Если одно и то же условие нужно менять сразу в нескольких местах, держите его в ячейке: под таблицей есть панель <b>«Библиотека условий (Conditions)»</b> (ячейки C1..C12, их можно править прямо там), а кнопки C1..C12 в поле Condition вставляют ссылку на ячейку.</p>
              <p>Буквы в условии: D - состояние устройства (выход на пине DEVICE, PWM или Zigbee-устройство), DV - значение диммера, B - кнопка (BU - не нажата, BH - удерживается), T - температурный датчик, H - датчик влажности, Sr / Ss - день / ночь, C - ссылка на ячейку библиотеки. Число после буквы - ID из первой колонки таблицы. Прежние буквы R и RV тоже работают.</p>
            </div>

            <h4 class="text-lg font-bold text-black mt-4 mb-2">Как настроить: два шага</h4>
            <ol class="list-decimal ml-6 mb-3 space-y-1">
              <li>Откройте эту страницу и нажмите <b>Connection</b> в строке нужного энкодера.</li>
              <li>В поле <b>Condition</b> впишите условие, например <code>${'D2&!D3'}</code>, и нажмите <b>Save changes</b>.</li>
            </ol>
            <p class="mb-3">Готово: теперь ручка меняет яркость, только когда устройство 2 включено, а устройство 3 выключено. Чтобы убрать условие - очистите поле. Одинаковые условия хранятся один раз: свободных выражений всего 48 (плюс 12 общих ячеек), поэтому уже существующее условие не занимает новое место.</p>

            <div class="p-4 rounded-xl bg-white/80 border border-amber-300 mb-3">
              <p class="text-lg font-bold text-black mb-1">Пример из жизни</p>
              <p class="mb-1">Над кроватью светильник (диммер), ручкой энкодера меняем яркость. Хотим, чтобы днём ручка не меняла яркость случайно, а работала только вечером и ночью.</p>
              <p class="mb-1">В Connection - Condition пишем: <code>${'Ss'}</code> и сохраняем.</p>
              <p>Результат: днём ручка «заперта», с заката - крутится как обычно.</p>
            </div>

            <h4 class="text-lg font-bold text-black mt-4 mb-2">Из чего строится условие (слова)</h4>
            <p class="mb-2">Число после буквы - это <b>ID</b> устройства из таблицы на соответствующей странице.</p>
          <table class="w-full mb-3 bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Запись</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Как читать</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'D5'}</code></td><td class="border px-4 py-2">Устройство (пин DEVICE) с ID 5 сейчас ВКЛючено. Для Zigbee-устройства - оно включено.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'!D5'}</code></td><td class="border px-4 py-2">Пин с ID 5 сейчас ВЫКЛючен (знак ! означает «НЕ»).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3>0'}</code></td><td class="border px-4 py-2">Диммер (ШИМ) с ID 3 светит (значение больше нуля). Для Zigbee - яркость устройства.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3=100'}</code></td><td class="border px-4 py-2">Значение диммера 3 ровно 100. У ШИМ-диммера шкала 0-100 (проценты), поэтому это полная яркость. Для Zigbee - значение, которое отдаёт само устройство.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3g50'}</code></td><td class="border px-4 py-2">Значение диммера 3 равно 50 или БОЛЬШЕ (буква g - «greater», то же, что >=).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3l50'}</code></td><td class="border px-4 py-2">Значение диммера 3 равно 50 или МЕНЬШЕ (буква l - «less», то же, что ${'<='}).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'B1'}</code></td><td class="border px-4 py-2">Кнопка с ID 1 сейчас нажата.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'BU1'}</code></td><td class="border px-4 py-2">Кнопка с ID 1 сейчас НЕ нажата.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'BH1'}</code></td><td class="border px-4 py-2">Кнопка с ID 1 сейчас удерживается (долгое нажатие).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5>25.5'}</code></td><td class="border px-4 py-2">Температура датчика 5 больше 25.5 градусов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5<10'}</code></td><td class="border px-4 py-2">Температура датчика 5 меньше 10 градусов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5.2>25.5'}</code></td><td class="border px-4 py-2">Температура второго датчика на шине DS18B20 пина 5 больше 25.5 градусов (.2 - номер датчика на шине; без .номер берётся первый исправный).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'H4>50'}</code></td><td class="border px-4 py-2">Влажность датчика 4 больше 50 процентов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'H4<30'}</code></td><td class="border px-4 py-2">Влажность датчика 4 меньше 30 процентов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Sr'}</code></td><td class="border px-4 py-2">День (Sunrise): сейчас время между восходом и закатом. Берётся из времени восхода/заката в «Global Settings».</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Ss'}</code></td><td class="border px-4 py-2">Ночь (Sunset): сейчас время между закатом и восходом. Если время восхода/заката не настроено, Sr и Ss оба считаются НЕТ.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'C3'}</code></td><td class="border px-4 py-2">Подставить готовое условие из ячейки C3. Вложенность - не глубже двух уровней.</td></tr>
            </tbody>
          </table>

            <h4 class="text-lg font-bold text-black mt-4 mb-2">Чем соединять слова (знаки)</h4>
          <table class="w-full mb-3 bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Знак</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Смысл</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Пример и как читать</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'&'}</code></td><td class="border px-4 py-2">И (нужно, чтобы выполнились ОБА)</td><td class="border px-4 py-2"><code>${'D1&D2'}</code> - устройство 1 включено И устройство 2 включено</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'|'}</code></td><td class="border px-4 py-2">ИЛИ (достаточно ОДНОГО)</td><td class="border px-4 py-2"><code>${'D1|D2'}</code> - включено устройство 1 ИЛИ устройство 2 (или оба)</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'!'}</code></td><td class="border px-4 py-2">НЕ (наоборот)</td><td class="border px-4 py-2"><code>${'!D1'}</code> - устройство 1 выключено; <code>${'!(D1&D2)'}</code> - неверно, что включены оба сразу</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'( )'}</code></td><td class="border px-4 py-2">Скобки - что считать первым</td><td class="border px-4 py-2"><code>${'(D1|D2)&!D3'}</code> - (устройство 1 или устройство 2) И устройство 3 выключено</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'= > < g l'}</code></td><td class="border px-4 py-2">Равно, больше, меньше; g - больше или равно, l - меньше или равно (можно писать и ${'>='}, ${'<='})</td><td class="border px-4 py-2"><code>${'T5>25.5'}</code>, <code>${'DV3=100'}</code>, <code>${'DV3l50'}</code></td></tr>
            </tbody>
          </table>

            <p class="mb-3 text-slate-700">Совет: если в одном условии смешиваете & и |, всегда ставьте скобки. Без скобок порядок такой: сначала !, потом &, потом | (то есть <code>${'D1|D2&D3'}</code> читается как <code>${'D1|(D2&D3)'}</code>). Числа у температуры и влажности пишутся как обычно: <code>${'T5>25'}</code> и <code>${'T5>25.0'}</code> - одно и то же, после точки допускается одна цифра.</p>
            <h4 class="text-lg font-bold text-black mt-4 mb-2">Готовые примеры - впишите в поле Condition энкодера</h4>
            <p class="mb-2">Во всех примерах «ручка» - это ваш энкодер. В поле Condition вписывается только левая колонка.</p>
            <p class="text-lg font-bold text-black mb-1">Устройства и выключатели</p>
          <table class="w-full mb-3 bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что вписать в поле Condition</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что произойдёт</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'D2'}</code></td><td class="border px-4 py-2">Ручка работает, только если устройство 2 включено.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'!D2'}</code></td><td class="border px-4 py-2">Ручка работает, только если устройство 2 выключено.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'D1&D2'}</code></td><td class="border px-4 py-2">Ручка работает, только если включены и устройство 1, и устройство 2.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'D1|D2'}</code></td><td class="border px-4 py-2">Ручка работает, если включено хотя бы одно из устройств 1 и 2.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'D1&!D2'}</code></td><td class="border px-4 py-2">Ручка работает, если устройство 1 включено, а устройство 2 выключено.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'!D1&!D2'}</code></td><td class="border px-4 py-2">Ручка работает, только если оба устройства выключены.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'(D1|D2)&!D3'}</code></td><td class="border px-4 py-2">Ручка работает, если включено устройство 1 или 2 и при этом устройство 3 выключено.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'!(D1&D2)'}</code></td><td class="border px-4 py-2">Ручка работает всегда, кроме случая, когда включены оба устройства сразу.</td></tr>
            </tbody>
          </table>

            <p class="text-lg font-bold text-black mb-1">Диммеры (ШИМ) и Zigbee</p>
          <table class="w-full mb-3 bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что вписать в поле Condition</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что произойдёт</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3>0'}</code></td><td class="border px-4 py-2">Ручка работает, только если диммер 3 светит.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3=100'}</code></td><td class="border px-4 py-2">Ручка работает, только если диммер 3 ровно на 100 (полная яркость).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3g50'}</code></td><td class="border px-4 py-2">Ручка работает, только если значение диммера 3 равно 50 или больше.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3l50'}</code></td><td class="border px-4 py-2">Ручка работает, только если значение диммера 3 равно 50 или меньше.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3>0&DV3l90'}</code></td><td class="border px-4 py-2">Ручка работает, пока диммер 3 светит, но не ярче 90.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'D93'}</code></td><td class="border px-4 py-2">Ручка работает, только если Zigbee-устройство с ID 93 включено (ID Zigbee-устройств начинаются с 89).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV93g100'}</code></td><td class="border px-4 py-2">Ручка работает, только если значение Zigbee-устройства 93 равно 100 или больше.</td></tr>
            </tbody>
          </table>

            <p class="text-lg font-bold text-black mb-1">Кнопки</p>
          <table class="w-full mb-3 bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что вписать в поле Condition</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что произойдёт</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'B1'}</code></td><td class="border px-4 py-2">Ручка работает, только пока кнопка 1 нажата (крутите ручку, удерживая кнопку).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'BU1'}</code></td><td class="border px-4 py-2">Ручка работает, только если кнопка 1 не нажата.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'BH1'}</code></td><td class="border px-4 py-2">Ручка работает, только пока кнопка 1 удерживается долгим нажатием.</td></tr>
            </tbody>
          </table>

            <p class="text-lg font-bold text-black mb-1">Температура и влажность</p>
          <table class="w-full mb-3 bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что вписать в поле Condition</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что произойдёт</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5>25.5'}</code></td><td class="border px-4 py-2">Ручка работает, только если на датчике 5 жарче 25.5 градусов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5<18'}</code></td><td class="border px-4 py-2">Ручка работает, только если на датчике 5 холоднее 18 градусов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5.2>25.5'}</code></td><td class="border px-4 py-2">Ручка работает, только если второй датчик DS18B20 на пине 5 показывает больше 25.5 градусов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'H4>50'}</code></td><td class="border px-4 py-2">Ручка работает, только если влажность на датчике 4 выше 50 процентов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'H4<30'}</code></td><td class="border px-4 py-2">Ручка работает, только если влажность на датчике 4 ниже 30 процентов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5>25&H4>60&!D7'}</code></td><td class="border px-4 py-2">Ручка работает, если жарко, влажно и вентилятор (устройство 7) ещё не включён.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'(T5>28|H4>70)&Sr'}</code></td><td class="border px-4 py-2">Ручка работает днём, если жарко или очень влажно.</td></tr>
            </tbody>
          </table>

            <p class="text-lg font-bold text-black mb-1">День и ночь</p>
          <table class="w-full mb-3 bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что вписать в поле Condition</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что произойдёт</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Ss'}</code></td><td class="border px-4 py-2">Ручка работает только ночью.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Sr'}</code></td><td class="border px-4 py-2">Ручка работает только днём.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Ss&B1'}</code></td><td class="border px-4 py-2">Ручка работает ночью и только пока нажата кнопка 1.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Ss|D1'}</code></td><td class="border px-4 py-2">Ручка работает ночью ИЛИ когда включено устройство 1.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Sr&T5<20'}</code></td><td class="border px-4 py-2">Ручка работает днём, если на датчике 5 холодно.</td></tr>
            </tbody>
          </table>

            <p class="text-lg font-bold text-black mb-1">Готовое условие из другой ячейки</p>
          <table class="w-full mb-3 bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что вписать в поле Condition</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что произойдёт</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'C3'}</code></td><td class="border px-4 py-2">Ручка работает, только если верно условие из ячейки C3.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'C3&!D2'}</code></td><td class="border px-4 py-2">Условие из ячейки C3 верно И устройство 2 выключено.</td></tr>
            </tbody>
          </table>

            <p class="text-lg font-bold text-black mb-1">Особый случай: неисправный датчик</p>
          <table class="w-full mb-3 bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что вписать в поле Condition</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что произойдёт</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5<25|D1'}</code></td><td class="border px-4 py-2">Ручка работает, если на датчике 5 ниже 25 градусов ИЛИ включено устройство 1. Если датчик 5 неисправен, а устройство 1 включено - ручка всё равно работает.</td></tr>
            </tbody>
          </table>

            <h4 class="text-lg font-bold text-black mt-4 mb-2">Важные правила</h4>
            <ul class="list-disc ml-6 mb-3 space-y-1">
              <li><b>Проверка идёт на каждый щелчок.</b> Если в момент щелчка условие НЕТ - этот щелчок пропущен: яркость и сохранённое значение не меняются. Когда условие станет ДА, ручка снова заработает сама.</li>
              <li><b>Главный ползунок On/Off энкодера</b> сильнее любого условия. Если он выключен, ручка не меняет яркость на лампе (запоминаемое значение меняется, только если условие ДА).</li>
              <li><b>У строк PWM без энкодера условия нет.</b> Поле Condition есть только у энкодеров. PWM без энкодера управляется напрямую (Zigbee, API, MQTT, PID), а его рубильник On/Off действует так же, как главный ползунок энкодера.</li>
              <li><b>Прямое управление условие не проверяет:</b> ползунок диммера на странице, команда API или MQTT, а также обратная связь от Zigbee-диммера работают независимо от условия.</li>
              <li><b>Неисправный или молчащий датчик</b> даёт ответ «неизвестно», и ручка блокируется, даже если перед условием стоит !: <code>${'!(T5<25)'}</code> при мёртвом датчике НЕ откроет ручку. Исключение: явная правда через |, например <code>${'T5<25|D1'}</code>.</li>
              <li><b>Пустая ячейка и ячейка со значением 0 блокируют ручку.</b> Если условие энкодера ссылается на ячейку (например C3), а потом ячейку очистили - ручка перестанет работать (пустая ячейка считается НЕТ, а не «без условия»). Значение 0 появляется, например, после удаления устройства, которое было в условии. Впишите верное условие в ячейку в панели «Библиотека условий» или очистите поле Condition у энкодера. В таблице такая связь подсвечивается красным бейджем «C1: пусто» (или жёлтым, если пустая ячейка стоит внутри составного условия).</li>
              <li><b>Если время восхода/заката не настроено,</b> условия с Sr и Ss всегда НЕТ, и ручка с таким условием заблокирована.</li>
              <li><b>Допустимые символы в условии и в ячейках:</b> латинские буквы, цифры и знаки ( ) ! & | = ${'>'} ${'<'}, точка и минус (минус только для отрицательного числа справа от знака сравнения). Пробелы лучше не ставить. Максимум 46 символов. Неверная запись будет отклонена при сохранении; если неверная запись всё же оказалась в ячейке, условие считается НЕТ, и ручка заблокирована.</li>
              <li><b>Если условие длинное,</b> запишите его в одну ячейку панели «Библиотека условий», а в других условиях ссылайтесь на него коротко: <code>${'C3'}</code>. Вложенность ссылок - не глубже двух уровней, третий уровень считается НЕТ.</li>
              <li><b>Одну ячейку можно выбрать во многих местах</b> (у энкодеров, Switch, PID). Надпись вида «3 мест» рядом с ячейкой в панели «Библиотека условий» показывает, сколько мест её используют (одинаковые условия в связях хранятся один раз и считаются за одно место). Правка ячейки сразу меняет поведение всех этих мест, поэтому перед сохранением используемой ячейки панель просит подтверждение.</li>
              <li><b>Если ручка «не крутится»:</b> проверьте по порядку - включён ли ползунок On/Off энкодера; верно ли условие прямо сейчас (все ли устройства в нём в нужном состоянии); нет ли опечатки или пустой ячейки.</li>
            </ul>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-rose-50 border-rose-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Примеры из жизни: что на самом деле умеет эта страница</h2>
          <p class="mb-2">Четыре истории о том, как обычная лампа становится умным светом. Пины и ID в примерах условные.</p>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Малыш нашёл волшебную ручку</p>
            <p class="mb-1">Ночь, детская. Малыш потянулся к ручке ночника и крутанул её до упора. Комната залита светом, ребёнок проснулся и плачет. У вас всё внутри оборвалось.</p>
            <p class="mb-1">Спокойно! В окне <b>Connection</b> энкодера в поле <b>Condition</b> впишите <code>${'B1'}</code> и нажмите <b>Save changes</b>. Теперь ручка работает, только пока удерживается кнопка 1 со страницы Button. Малыш одной рукой не справится, а вы - легко.</p>
            <p>Результат: Connection - Condition - <code>${'B1'}</code>. Повторите у себя с ID своей кнопки.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Рассада жарится под лампой, а вы в аэропорту</p>
            <p class="mb-1">Вы уже у стойки регистрации и вдруг вспоминаете: лампа над рассадой горит на полную мощность. Вернуться нельзя, а семена жалко.</p>
            <p class="mb-1">Спокойно! Отправьте SMS <code>${'12#00*'}</code> с номера из настроек SIM800L, где 12 - ID строки PWM. Выход гаснет до 0%, а заданная яркость запоминается. Вернётесь - отправьте <code>${'12#11*'}</code>, и лампа засветит как раньше. Ответ придёт в виде <code>${'OnOff: Pin12=OFF'}</code>, если включён общий ползунок SIM800L.</p>
            <p>Результат: две короткие SMS вместо потерянного урожая. Для строки с энкодером используйте ID энкодера.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Фильм начался, а лампа слепит</p>
            <p class="mb-1">Вы устроились на диване, пошли первые кадры, а торшер светит на полную. Вставать не хочется, а пропустить начало ещё обиднее.</p>
            <p class="mb-1">Спокойно! Сделайте на телефоне закладку <code class="break-all">${'http://192.168.1.24:8000/api/Zerg/pwm?id=4&dvalue=10'}</code>, где Zerg - ваш Token, а 4 - ID PWM-пина торшера. Одно касание - и свет приглушён до 10%.</p>
            <p>Результат: закладка на каждый сценарий (кино, чтение, ночник) и ни одного шага с дивана. API работает только внутри вашей локальной сети.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Стена без дырок</p>
            <p class="mb-1">В съёмной квартире сверлить стену под выключатель нельзя, а крутить ручку на столе неудобно. Хочется нормальный диммер у кровати.</p>
            <p class="mb-1">Спокойно! Купите Zigbee-диммер, на этой странице нажмите <b>Edit PWM</b> у нужного PWM-пина и выберите диммер в поле <b>Zigbee Device</b>. Пины Encoder A и B не нужны: диммер управляет выходом напрямую.</p>
            <p>Результат: беспроводной диммер, который приклеивается на тумбочку. Ползунок On/Off выхода по-прежнему остаётся главным.</p>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-orange-50 border-orange-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Сколько устройств можно подключить (PWM connection)</h2>
          <div>
            <h3 class="text-lg font-bold text-black mb-2">Общий лимит: 1024 места</h3>
            <p class="mb-2">Поле PWM connection — это лампа или диммер, яркостью которой управляет энкодер («крутилка»). <b>Один энкодер управляет одним устройством:</b> в окне Edit выбирается одно устройство. Каждое такое подключение занимает одно из <b>1024 «мест»</b>, тех же, что и на странице «Switch(es) pin(s)».</p>
            <p class="mb-2"><b>Строки PWM без энкодера места не занимают:</b> место тратится только на подключение PWM к энкодеру.</p>
            <p class="mb-2"><b>Ограничения на количество энкодеров нет</b> — главное, чтобы во всей системе в сумме не набралось больше 1024 подключений.</p>
            <p class="mb-2"><b>Пример:</b> если на странице «Switch(es) pin(s)» уже подключено 57 устройств, то для энкодеров остаётся только <b>967 свободных мест</b> (1024 − 57 = 967).</p>
          </div>
          <div>
            <h3 class="text-lg font-bold text-black mb-2">Условия места не занимают</h3>
            <p class="mb-2">Условие хранится внутри самой связи, поэтому связь с условием и без него занимает одно и то же одно место из 1024. Отдельный лимит действует только на число разных условий: 12 общих ячеек и 48 свободных выражений (общих для Switch, Encoder и PID). Если свободные выражения закончились, прошивка не сохранит связь (ошибка Condition pool is full): используйте уже существующее условие или удалите ненужные связи.</p>
          </div>
          <div>
            <h3 class="text-lg font-bold text-black mb-2">Если места закончились</h3>
            <p class="mb-2">Когда все 1024 места заняты, новое подключение не добавится: устройство вернёт ошибку (No free slots in PinsLinks, limit 1024). Сначала удалите ненужные подключения на страницах Switch и Encoder.</p>
            <p class="mb-2">После перезагрузки устройство само восстанавливает все сохранённые подключения (из файла pintopin.ini) — новых мест они не занимают.</p>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-cyan-50 border-cyan-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Ограничения аппаратных таймеров (Hardware Timers)</h2>
          <div>
            <div class="space-y-2">
              <p class="mb-2"><strong>Важно:</strong> Вы можете установить желаемую частоту ШИМ от <strong>0.05 Hz до 2 MHz</strong>. Однако, генерация ШИМ зависит от аппаратных таймеров микроконтроллера (например, TIM1, TIM2 и т.д.).</p>
              <p class="mb-2"><strong>Один таймер не может генерировать разные частоты одновременно!</strong> Если вы назначите разные пины, которые используют <em>один и тот же таймер</em>, к разным энкодерам (или PWM-строкам) и зададите им разную частоту, применится последняя установленная частота ко всем пинам этого таймера.</p>
              <p class="mb-2">Чтобы использовать разную частоту для разных устройств, выбирайте пины, привязанные к <strong>разным таймерам</strong>.</p>
              <p class="mb-2">Полярность (CH Polarity) у каждого канала своя: два пина одного таймера могут иметь разную полярность, но частота у них общая. У таймеров TIM1 и TIM8 вместе с полярностью автоматически меняется и уровень выхода в покое.</p>
              <p class="mt-4 font-bold text-black">Карта привязки пинов ШИМ к таймерам и их возможности:</p>
              <ul class="list-disc pl-5 mt-2 space-y-3 text-slate-700">
                <li>
                  <strong>TIM1 (16-bit Advanced):</strong> PE9, PE11, PE13, PE14<br/>
                  <span class="text-slate-700">Высокоскоростной таймер. Оптимален для средних и высоких частот (от 10 Hz до 2 MHz).</span>
                </li>
                <li>
                  <strong>TIM2 (32-bit):</strong> PA0, PA3, PB10<br/>
                  <span class="text-slate-700">За счет 32-битного счетчика аппаратно поддерживает сверхнизкие частоты с максимальным разрешением (от 0.05 Hz до 100 kHz).</span>
                </li>
                <li>
                  <strong>TIM3 (16-bit General):</strong> PA6, PB1<br/>
                  <span class="text-slate-700">Базовый ШИМ таймер (от 10 Hz до 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM4 (16-bit General):</strong> PD12, PD13, PD14, PD15<br/>
                  <span class="text-slate-700">Базовый ШИМ таймер (от 10 Hz до 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM8 (16-bit Advanced):</strong> PC6, PC7, PC8, PC9<br/>
                  <span class="text-slate-700">Высокоскоростной таймер. Оптимален для средних и высоких частот (от 10 Hz до 2 MHz).</span>
                </li>
                <li>
                  <strong>TIM9 (16-bit):</strong> PE5, PE6<br/>
                  <span class="text-slate-700">Вспомогательный таймер (от 10 Hz до 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM10 (16-bit):</strong> PF6<br/>
                  <span class="text-slate-700">Вспомогательный таймер (от 10 Hz до 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM11 (16-bit):</strong> PF7<br/>
                  <span class="text-slate-700">Вспомогательный таймер (от 10 Hz до 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM12 (16-bit):</strong> PB15<br/>
                  <span class="text-slate-700">Вспомогательный таймер (от 10 Hz до 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM13 (16-bit):</strong> PF8<br/>
                  <span class="text-slate-700">Вспомогательный таймер (от 10 Hz до 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM14 (16-bit):</strong> PF9<br/>
                  <span class="text-slate-700">Вспомогательный таймер (от 10 Hz до 500 kHz).</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
      `,
      en: html`
      <div class="mytext space-y-6 font-sans text-base leading-relaxed text-slate-700 [&_code]:font-sans [&_code]:font-semibold [&_pre]:font-sans">
        <section class="rounded-2xl border-2 bg-indigo-50 border-indigo-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">How to connect an encoder and a PWM output (step by step)</h2>

          <ol class="list-decimal ml-6 space-y-3">
            <li>
              <b>Choose the pins.</b> Open the <b>"Select pin(s)"</b> page. For the first contact of the encoder choose the <b>"Enc.OutA"</b> mode,
              for the second one - <b>"Enc.OutB"</b>, and for the lamp or fan - <b>"PWM"</b> (this mode is available only on pins with hardware PWM).
              Press <b>"Submit"</b>. After that an encoder row (by the Enc.OutA pin) appears on this page, and the PWM pin is shown as a separate row marked PWM for now.
            </li>
            <li>
              <b>Link the knob to the lamp.</b> In the encoder row press <b>Connection</b>. In the Edit Connection window choose the second encoder pin in the <b>Encoder B</b> field,
              the lamp PWM output in the <b>PWM connection</b> field, and press <b>Save changes</b>. One encoder controls one output.
            </li>
            <li>
              <b>Tune the output.</b> Press <b>Edit Encdr.</b> and, if needed, set <b>PWM Frequency (milliHz)</b> (the value is in millihertz: 10000000 is 10 kHz),
              the starting brightness in <b>Dimmer value %</b>, and in <b>Duty on restore</b> choose whether the brightness returns after the controller starts.
              Not sure - keep the defaults. Press <b>Save changes</b>.
            </li>
            <li>
              <b>Turn the On/Off slider on</b> in the encoder row. While it is off, the knob changes only the remembered brightness and the lamp stays dark.
            </li>
            <li>
              <b>Check:</b> turn the knob. Every click changes the brightness by 1%, and the number in the <b>Dimmer value (0-100)</b> column changes right in front of you.
            </li>
            <li>
              <b>If needed - lock the knob with a condition.</b> In the <b>Connection</b> window type a rule into the <b>Condition</b> field (how - in the conditions block below).
            </li>
          </ol>

          <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300">
            <b>How it works:</b> the two encoder pins (A and B) produce signals shifted against each other, and the firmware tells the turning direction from their order.
            One click of the knob changes the brightness of the connected PWM output by 1%, within 0 to 100. An output without an encoder
            (a row marked PWM) is controlled without a knob: by a Zigbee dimmer, API, MQTT, SMS, from the Timer(s) and PID pages.
          </div>

          <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300">
            <b>Important:</b> the encoder <b>On/Off</b> slider beats everything. While it is off, the lamp stays dark no matter how much you turn the knob:
            only the remembered value changes, and it shows up when you turn the slider on.
          </div>

          <div class="mt-4">
            <b>Example.</b> The knob is connected to pins <b>PE2</b> (Encoder A) and <b>PE3</b> (Encoder B), the lamp - to the PWM pin <b>PE9</b>.
            Let the encoder row have <b>ID = 20</b> and the PWM pin <b>ID = 4</b> (all pins and IDs here are made up, look up your own in the ID column).
            <ul class="list-disc ml-6 mt-1">
              <li>In <b>Select pin(s)</b>: PE2 - <b>Enc.OutA</b>, PE3 - <b>Enc.OutB</b>, PE9 - <b>PWM</b>, then <b>Submit</b></li>
              <li>In the row with ID 20 press <b>Connection</b>: choose PE3 in <b>Encoder B</b>, PE9 in <b>PWM connection</b>, then <b>Save changes</b></li>
              <li>Turn on the <b>On/Off</b> slider in row 20 and turn the knob</li>
              <li>Turn the lamp off from your phone: SMS <code>${'20#00*'}</code>, back on: <code>${'20#11*'}</code> (the encoder ID, not the PWM pin)</li>
              <li>Set 25% brightness via API: <code class="break-all">${'http://192.168.1.24:8000/api/Zerg/pwm?id=4&dvalue=25'}</code> (here id is the ID of the PWM pin)</li>
            </ul>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Control by SMS and DTMF</h2>
<div><h4 class="text-lg font-bold text-black mt-4 mb-2">On/Off switch by SMS and DTMF</h4><p class="mb-2">The On/Off slider of an encoder row or of a PWM row without an encoder on this page can be switched from the phone number set in the SIM800L settings: by SMS or during a call (DTMF tones). The command format is the same on every page: <b>ID#CODE*</b>, where ID is the number from the ID column of the needed row.</p><table class="w-full border-collapse my-2 bg-white/70"><thead><tr><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">Action</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">SMS</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">DTMF (during a call)</th></tr></thead><tbody><tr><td class="border px-3 py-1">Turn the row off (slider Off)</td><td class="border px-3 py-1"><code>5#00*</code></td><td class="border px-3 py-1"><code>5#00*#</code></td></tr><tr><td class="border px-3 py-1">Turn the row on (slider On)</td><td class="border px-3 py-1"><code>5#11*</code></td><td class="border px-3 py-1"><code>5#11*#</code></td></tr></tbody></table><p class="mb-2">In the table ID = 5 is an example, use the ID of your own row.</p><p class="mb-2">Several commands in a row: <code>5#00*7#11*</code> (SMS) and <code>5#00*7#11*#</code> (call). Input during a call always ends with <code>*#</code>: the last command already ends with <code>*</code>, so only <code>#</code> is added at the end.</p><p class="mb-2">Codes for all pages: Button, Switch, Encoder, OneWire, Security, Zigbee - <b>00</b> (off) and <b>11</b> (on); Cron - <b>33</b> and <b>44</b>; PID - <b>55</b> and <b>66</b>.</p><p class="mb-2">An SMS report is sent back, for example <code>OnOff: Pin5=OFF</code> (the report is sent only if the common SIM800L slider is On). Wrong commands are listed in Invld pins/cmd.</p><p class="mb-2"><b>A PWM row without an encoder:</b> <code>12#00*</code> turns the output off (it gives 0%, the set brightness is remembered), <code>12#11*</code> turns it back on; the reply is <code>OnOff: Pin12=OFF</code> or <code>OnOff: Pin12=ON</code>. ID = 12 is an example, use the ID of your own row. The switch state is saved and kept after a reboot.</p><p class="mb-2">The command is rejected (it goes to Invld pins/cmd) if the PWM is connected to an encoder (use the encoder ID), is controlled by PID (use the PID codes 55 and 66) or PID autotune is running.</p></div>
        </section>
        <section class="rounded-2xl border-2 bg-emerald-50 border-emerald-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">API control (local network)</h2>
          <div>
            <p class="mb-1">This API allows you to remotely control the brightness of a PWM output (dimmer) by simply executing a command in the browser of any device on your local network.</p>
            <p class="rounded-xl border border-red-300 bg-red-50 px-4 py-2 font-bold text-red-700">Do not expose your APIs to the internet - it's not secure!</p>
          </div>
          <div>
            <h3 class="text-lg font-bold text-black mb-2">API Examples</h3>
            <table class="w-full bg-white/70">
              <thead>
                <tr>
                  <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">API</th>
                  <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Description</th>
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
            <ul class="list-disc ml-6 mb-2 space-y-1"><li>id is the ID of the PWM pin itself (for a row marked PWM it is the ID of that row).</li><li>If the On/Off switch of the output is off (or the linked encoder is off), the value is remembered, but the output stays at 0%.</li><li>If the output is controlled by PID, the regulator overwrites the value on the next cycle. During PID autotune the command is rejected (error 409).</li></ul>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-violet-50 border-violet-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">MQTT: control and tracking</h2>
          <div>
            <p class="mb-1">MQTT allows you to remotely control PWM outputs (dimmers) from the internet!</p>
          </div>
          <div>
            <h3 class="text-lg font-bold text-black mb-2">MQTT Command Examples</h3>
            <table class="w-full bg-white/70">
              <thead>
                <tr>
                  <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Command</th>
                  <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Description</th>
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
            <p class="mb-2">The On/Off switch, PID and autotune work the same way as for the API: with the switch off the value is remembered, but the output stays at 0%.</p>
          </div>
          <div>
            <h3 class="text-lg font-bold text-black mb-2">Change Tracking</h3>
            <div class="bg-violet-50 p-4 rounded-lg border border-violet-200 text-sm">
              <p class="mb-3">The controller automatically publishes sensor states and PWM output values to the MQTT topic <strong>Swarm/sensors/</strong>, where <strong>"Swarm"</strong> is your TX topic.</p>
              <p class="mb-2 font-semibold text-violet-800">Packet format:</p>
              <div class="font-semibold bg-white/70 border border-violet-200 px-3 py-2 mb-3 text-xs rounded">
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
        </section>
        <section class="rounded-2xl border-2 bg-teal-50 border-teal-300 p-5 space-y-4"><h2 class="text-xl font-bold text-black">Table rows and settings</h2>
          <div>
            <p class="mb-2">The table has two kinds of rows.</p>
            <ul class="list-disc ml-6 mb-2 space-y-1">
              <li><b>Encoder row</b> - the Encoder A and Encoder B pins, the connected PWM output (PWM connection) and the condition (Condition). The knob changes the brightness of the connected output. The Action column has two buttons: <b>Connection</b> (the Encoder B pin, PWM connection, Condition, Zigbee Device) and <b>Edit Encdr.</b> (output parameters).</li>
              <li><b>Row marked PWM</b> - a PWM pin that no encoder refers to. Its Encoder A, Encoder B, PWM connection and Condition columns show dashes. This is how you configure an output controlled without a knob: a Zigbee dimmer, API, MQTT, the Timer(s) and PID pages. If you connect such a PWM to an encoder (encoder Edit - PWM connection), it moves into the row of that encoder.</li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-bold text-black mb-2">The Edit PWM and Edit Encdr. windows: what you can set</h3>
            <table class="w-full border-collapse my-2 bg-white/70"><thead><tr><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">Field</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">What it does</th></tr></thead><tbody><tr><td class="border px-3 py-1 whitespace-nowrap"><b>PWM Frequency (milliHz)</b></td><td class="border px-3 py-1">PWM frequency in millihertz (from 50 to 2000000000, that is from 0.05 Hz to 2 MHz). Applied immediately, no reboot needed.</td></tr><tr><td class="border px-3 py-1 whitespace-nowrap"><b>Resolution</b></td><td class="border px-3 py-1">Number of brightness steps. Read-only: the firmware calculates it from the frequency.</td></tr><tr><td class="border px-3 py-1 whitespace-nowrap"><b>Dimmer value %</b></td><td class="border px-3 py-1">Output brightness in percent.</td></tr><tr><td class="border px-3 py-1 whitespace-nowrap"><b>Duty on restore</b></td><td class="border px-3 py-1">Restore the brightness when the controller starts.</td></tr><tr><td class="border px-3 py-1 whitespace-nowrap"><b>INFO</b></td><td class="border px-3 py-1">Row name for quick navigation.</td></tr><tr><td class="border px-3 py-1 whitespace-nowrap"><b>On/Off</b></td><td class="border px-3 py-1">Output switch. In the Off position the output is 0%, and the set value is remembered and returns when you switch it on. The switch is saved: after a reboot a switched-off output stays off. It can be switched with the slider and also by SMS and DTMF (commands - see "Control by SMS and DTMF"). For PWM configured earlier the slider shows "on" and turns nothing off until you switch it yourself.</td></tr><tr><td class="border px-3 py-1 whitespace-nowrap"><b>CH Polarity</b></td><td class="border px-3 py-1">Normal: 20% in the interface = 20% on the load. Inverted: for boards with an inverting stage (for example a 6N137 optocoupler): the active level of the output becomes LOW, and 20% in the interface is still 20% on the load. Applied immediately, saved and kept after a reboot. The setting is per PWM pin; in the encoder Edit window it applies to the connected PWM.</td></tr><tr><td class="border px-3 py-1 whitespace-nowrap"><b>Zigbee Device</b></td><td class="border px-3 py-1">A Zigbee dimmer controls this PWM directly, the Encoder A/B pins are not needed. The On/Off switch stays in force.</td></tr></tbody></table>
          </div>
          <div>
            <h3 class="text-lg font-bold text-black mb-2">Marks in a PWM row</h3>
            <ul class="list-disc ml-6 mb-2 space-y-1">
              <li><b>PWM</b> - a row without an encoder.</li>
              <li><b>PID</b> - the output is controlled by a PID regulator. Dimmer value is read-only (the regulator overwrites it every cycle), and the On/Off slider is locked: PID has its own switch.</li>
              <li><b>[lock]</b> - PID autotune is running. The settings of this output are locked until it finishes.</li>
            </ul>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-amber-50 border-amber-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">${condHelpTitle(false)}</h2>
          <div class="space-y-3">
            <p class="text-slate-600 italic mb-2">Turn the knob, but only if...</p>
            <p class="mb-2">A condition is a "lock" on the encoder knob. Every time you turn the knob by one click, the firmware asks itself: "Is the condition true right now?". If it is true (YES), the brightness changes by 1%. If it is false (NO), this click is silently skipped and the brightness does not change. The condition is checked <b>again on every click</b>: as soon as it becomes true again, the knob works immediately, there is nothing to press or restart. If no condition is selected (None), the knob always works.</p>

            <div class="p-4 rounded-xl bg-white/80 border border-amber-300 mb-3">
              <p class="text-lg font-bold text-black mb-1">For an encoder the condition is typed into the Condition field</p>
              <p class="mb-1">For buttons and timers the condition is written right inside the action: <code>${'6:1?D2&!D3'}</code>. An encoder has no action line, so the condition is typed as <b>free text</b> into the <b>Condition</b> field of the encoder <b>Connection</b> window.</p>
              <p>Type the part <b>after the ? sign</b>. If you had <code>${'6:1?D2&!D3'}</code>, type only <code>${'D2&!D3'}</code> into the field. Do not type the ? sign or the <code>${'6:1'}</code> part. If the same condition has to be changed in several places at once, keep it in a cell: under the table there is the <b>Conditions library</b> panel (cells C1..C12, editable right there), and the C1..C12 buttons in the Condition field insert a reference to a cell.</p>
              <p>Letters in a condition: D - device state (output on a DEVICE pin, PWM or Zigbee device), DV - dimmer value, B - button (BU - not pressed, BH - held), T - temperature sensor, H - humidity sensor, Sr / Ss - day / night, C - reference to a library cell. The number after a letter is the ID from the first table column. The old letters R and RV still work.</p>
            </div>

            <h4 class="text-lg font-bold text-black mt-4 mb-2">How to set it up: two steps</h4>
            <ol class="list-decimal ml-6 mb-3 space-y-1">
              <li>Open this page and press <b>Connection</b> in the row of the encoder you need.</li>
              <li>In the <b>Condition</b> field type the condition, for example <code>${'D2&!D3'}</code>, and press <b>Save changes</b>.</li>
            </ol>
            <p class="mb-3">Done: now the knob changes brightness only when device 2 is on and device 3 is off. To remove the condition, clear the field. Identical conditions are stored once: there are 48 free expressions in total (plus 12 shared cells), so re-using an existing condition does not take a new slot.</p>

            <div class="p-4 rounded-xl bg-white/80 border border-amber-300 mb-3">
              <p class="text-lg font-bold text-black mb-1">Real-life example</p>
              <p class="mb-1">There is a bedside lamp (dimmer) and you change its brightness with the encoder knob. You want the knob to be locked during the day so it does not change brightness by accident, and to work only in the evening and at night.</p>
              <p class="mb-1">In Connection - Condition type: <code>${'Ss'}</code> and save.</p>
              <p>Result: during the day the knob is "locked"; from sunset on it turns as usual.</p>
            </div>

            <h4 class="text-lg font-bold text-black mt-4 mb-2">What a condition is made of (words)</h4>
            <p class="mb-2">The number after the letter is the device <b>ID</b> from the table on the corresponding page.</p>
          <table class="w-full mb-3 bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Entry</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">How to read it</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'D5'}</code></td><td class="border px-4 py-2">The device (DEVICE pin) with ID 5 is ON right now. For a Zigbee device - it is on.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'!D5'}</code></td><td class="border px-4 py-2">The pin with ID 5 is OFF right now (the ! sign means "NOT").</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3>0'}</code></td><td class="border px-4 py-2">Dimmer (PWM) with ID 3 is lit (value greater than zero). For Zigbee - the device brightness.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3=100'}</code></td><td class="border px-4 py-2">Dimmer 3 value is exactly 100. A PWM dimmer uses a 0-100 scale (percent), so this is full brightness. For Zigbee - the value reported by the device itself.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3g50'}</code></td><td class="border px-4 py-2">Dimmer 3 value is 50 or GREATER (letter g = "greater", same as >=).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3l50'}</code></td><td class="border px-4 py-2">Dimmer 3 value is 50 or LESS (letter l = "less", same as ${'<='}).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'B1'}</code></td><td class="border px-4 py-2">Button with ID 1 is pressed right now.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'BU1'}</code></td><td class="border px-4 py-2">Button with ID 1 is NOT pressed right now.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'BH1'}</code></td><td class="border px-4 py-2">Button with ID 1 is being held (long press).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5>25.5'}</code></td><td class="border px-4 py-2">Temperature of sensor 5 is above 25.5 degrees.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5<10'}</code></td><td class="border px-4 py-2">Temperature of sensor 5 is below 10 degrees.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5.2>25.5'}</code></td><td class="border px-4 py-2">Temperature of the second DS18B20 sensor on the bus of pin 5 is above 25.5 degrees (.2 is the sensor number on the bus; without .number the first working sensor is used).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'H4>50'}</code></td><td class="border px-4 py-2">Humidity of sensor 4 is above 50 percent.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'H4<30'}</code></td><td class="border px-4 py-2">Humidity of sensor 4 is below 30 percent.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Sr'}</code></td><td class="border px-4 py-2">Daytime (Sunrise): it is now between sunrise and sunset. The times are taken from the sunrise/sunset values in "Global Settings".</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Ss'}</code></td><td class="border px-4 py-2">Night (Sunset): it is now between sunset and sunrise. If the sunrise/sunset times are not set, both Sr and Ss count as NO.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'C3'}</code></td><td class="border px-4 py-2">Insert the ready-made condition from cell C3. Nesting - no deeper than two levels.</td></tr>
            </tbody>
          </table>

            <h4 class="text-lg font-bold text-black mt-4 mb-2">What joins the words (signs)</h4>
          <table class="w-full mb-3 bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Sign</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Meaning</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Example and how to read it</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'&'}</code></td><td class="border px-4 py-2">AND (BOTH must be true)</td><td class="border px-4 py-2"><code>${'D1&D2'}</code> - device 1 is on AND device 2 is on</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'|'}</code></td><td class="border px-4 py-2">OR (ONE is enough)</td><td class="border px-4 py-2"><code>${'D1|D2'}</code> - device 1 is on OR device 2 is on (or both)</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'!'}</code></td><td class="border px-4 py-2">NOT (the opposite)</td><td class="border px-4 py-2"><code>${'!D1'}</code> - device 1 is off; <code>${'!(D1&D2)'}</code> - it is not true that both are on at once</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'( )'}</code></td><td class="border px-4 py-2">Brackets - what to calculate first</td><td class="border px-4 py-2"><code>${'(D1|D2)&!D3'}</code> - (device 1 or device 2) AND device 3 is off</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'= > < g l'}</code></td><td class="border px-4 py-2">Equal, greater, less; g - greater or equal, l - less or equal (${'>='} and ${'<='} also work)</td><td class="border px-4 py-2"><code>${'T5>25.5'}</code>, <code>${'DV3=100'}</code>, <code>${'DV3l50'}</code></td></tr>
            </tbody>
          </table>

            <p class="mb-3 text-slate-700">Tip: if you mix & and | in one condition, always use brackets. Without brackets the order is: ! first, then &, then | (so <code>${'D1|D2&D3'}</code> reads as <code>${'D1|(D2&D3)'}</code>). Numbers for temperature and humidity are written as usual: <code>${'T5>25'}</code> and <code>${'T5>25.0'}</code> are the same, one digit after the dot is allowed.</p>
            <h4 class="text-lg font-bold text-black mt-4 mb-2">Ready-made examples - type into the Condition field of the encoder</h4>
            <p class="mb-2">In all examples "the knob" is your encoder. Type only the left column into the Condition field.</p>
            <p class="text-lg font-bold text-black mb-1">Devices and switches</p>
          <table class="w-full mb-3 bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What to type into the Condition field</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What will happen</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'D2'}</code></td><td class="border px-4 py-2">The knob works only if device 2 is on.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'!D2'}</code></td><td class="border px-4 py-2">The knob works only if device 2 is off.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'D1&D2'}</code></td><td class="border px-4 py-2">The knob works only if both device 1 and device 2 are on.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'D1|D2'}</code></td><td class="border px-4 py-2">The knob works if at least one of devices 1 and 2 is on.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'D1&!D2'}</code></td><td class="border px-4 py-2">The knob works if device 1 is on and device 2 is off.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'!D1&!D2'}</code></td><td class="border px-4 py-2">The knob works only if both devices are off.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'(D1|D2)&!D3'}</code></td><td class="border px-4 py-2">The knob works if device 1 or 2 is on and device 3 is off.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'!(D1&D2)'}</code></td><td class="border px-4 py-2">The knob always works, except when both devices are on at once.</td></tr>
            </tbody>
          </table>

            <p class="text-lg font-bold text-black mb-1">Dimmers (PWM) and Zigbee</p>
          <table class="w-full mb-3 bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What to type into the Condition field</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What will happen</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3>0'}</code></td><td class="border px-4 py-2">The knob works only if dimmer 3 is lit.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3=100'}</code></td><td class="border px-4 py-2">The knob works only if dimmer 3 is exactly 100 (full brightness).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3g50'}</code></td><td class="border px-4 py-2">The knob works only if the dimmer 3 value is 50 or greater.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3l50'}</code></td><td class="border px-4 py-2">The knob works only if the dimmer 3 value is 50 or less.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3>0&DV3l90'}</code></td><td class="border px-4 py-2">The knob works while dimmer 3 is lit but not brighter than 90.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'D93'}</code></td><td class="border px-4 py-2">The knob works only if the Zigbee device with ID 93 is on (Zigbee device IDs start from 89).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV93g100'}</code></td><td class="border px-4 py-2">The knob works only if the value of Zigbee device 93 is 100 or greater.</td></tr>
            </tbody>
          </table>

            <p class="text-lg font-bold text-black mb-1">Buttons</p>
          <table class="w-full mb-3 bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What to type into the Condition field</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What will happen</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'B1'}</code></td><td class="border px-4 py-2">The knob works only while button 1 is pressed (turn the knob while holding the button).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'BU1'}</code></td><td class="border px-4 py-2">The knob works only if button 1 is not pressed.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'BH1'}</code></td><td class="border px-4 py-2">The knob works only while button 1 is held with a long press.</td></tr>
            </tbody>
          </table>

            <p class="text-lg font-bold text-black mb-1">Temperature and humidity</p>
          <table class="w-full mb-3 bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What to type into the Condition field</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What will happen</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5>25.5'}</code></td><td class="border px-4 py-2">The knob works only if sensor 5 is hotter than 25.5 degrees.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5<18'}</code></td><td class="border px-4 py-2">The knob works only if sensor 5 is colder than 18 degrees.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5.2>25.5'}</code></td><td class="border px-4 py-2">The knob works only if the second DS18B20 sensor on pin 5 shows more than 25.5 degrees.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'H4>50'}</code></td><td class="border px-4 py-2">The knob works only if humidity on sensor 4 is above 50 percent.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'H4<30'}</code></td><td class="border px-4 py-2">The knob works only if humidity on sensor 4 is below 30 percent.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5>25&H4>60&!D7'}</code></td><td class="border px-4 py-2">The knob works if it is hot, humid and the fan (device 7) is not on yet.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'(T5>28|H4>70)&Sr'}</code></td><td class="border px-4 py-2">The knob works in the daytime if it is hot or very humid.</td></tr>
            </tbody>
          </table>

            <p class="text-lg font-bold text-black mb-1">Day and night</p>
          <table class="w-full mb-3 bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What to type into the Condition field</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What will happen</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Ss'}</code></td><td class="border px-4 py-2">The knob works only at night.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Sr'}</code></td><td class="border px-4 py-2">The knob works only in the daytime.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Ss&B1'}</code></td><td class="border px-4 py-2">The knob works at night and only while button 1 is pressed.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Ss|D1'}</code></td><td class="border px-4 py-2">The knob works at night OR when device 1 is on.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Sr&T5<20'}</code></td><td class="border px-4 py-2">The knob works in the daytime if sensor 5 shows cold.</td></tr>
            </tbody>
          </table>

            <p class="text-lg font-bold text-black mb-1">A ready-made condition from another cell</p>
          <table class="w-full mb-3 bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What to type into the Condition field</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What will happen</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'C3'}</code></td><td class="border px-4 py-2">The knob works only if the condition from cell C3 is true.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'C3&!D2'}</code></td><td class="border px-4 py-2">The condition from cell C3 is true AND device 2 is off.</td></tr>
            </tbody>
          </table>

            <p class="text-lg font-bold text-black mb-1">Special case: a faulty sensor</p>
          <table class="w-full mb-3 bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What to type into the Condition field</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What will happen</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5<25|D1'}</code></td><td class="border px-4 py-2">The knob works if sensor 5 is below 25 degrees OR device 1 is on. If sensor 5 is faulty but device 1 is on, the knob still works.</td></tr>
            </tbody>
          </table>

            <h4 class="text-lg font-bold text-black mt-4 mb-2">Important rules</h4>
            <ul class="list-disc ml-6 mb-3 space-y-1">
              <li><b>The check happens on every click.</b> If the condition is NO at the moment of a click, that click is skipped: neither the brightness nor the stored value changes. When the condition becomes YES, the knob works again by itself.</li>
              <li><b>The encoder main On/Off slider</b> is stronger than any condition. If it is off, the knob does not change the lamp brightness (the remembered value changes only if the condition is YES).</li>
              <li><b>Rows PWM without an encoder have no condition.</b> The Condition field exists only for encoders. A PWM without an encoder is controlled directly (Zigbee, API, MQTT, PID), and its On/Off switch acts like the main slider of an encoder.</li>
              <li><b>Direct control does not check the condition:</b> the dimmer slider on the page, an API or MQTT command, and feedback from a Zigbee dimmer all work regardless of the condition.</li>
              <li><b>A faulty or silent sensor</b> gives the answer "unknown", and the knob is blocked even if the condition starts with !: <code>${'!(T5<25)'}</code> with a dead sensor does NOT unlock the knob. Exception: explicit truth through |, for example <code>${'T5<25|D1'}</code>.</li>
              <li><b>An empty cell and a cell with the value 0 block the knob.</b> If the encoder condition refers to a cell (for example C3) and the cell is later cleared, the knob stops working (an empty cell counts as NO, not as "no condition"). The value 0 appears, for example, after a device used in the condition is deleted. Type a valid condition into the cell in the Conditions library panel, or clear the Condition field of the encoder. In the table such a link is shown with a red badge "C1: empty" (or a yellow one if the empty cell is inside a compound condition).</li>
              <li><b>If the sunrise/sunset times are not set,</b> conditions with Sr and Ss are always NO, and the knob with such a condition is blocked.</li>
              <li><b>Allowed characters in a condition and in cells:</b> Latin letters, digits and the signs ( ) ! & | = ${'>'} ${'<'}, a dot and a minus sign (the minus only for a negative number to the right of a comparison sign). Better not to use spaces. Maximum 46 characters. An invalid entry is rejected when saving; if an invalid entry still ends up in a cell, the condition counts as NO and the knob is blocked.</li>
              <li><b>If a condition is long,</b> write it once into one cell of the Conditions library panel and refer to it briefly from other conditions: <code>${'C3'}</code>. References nest no deeper than two levels; the third level counts as NO.</li>
              <li><b>One cell can be selected in many places</b> (encoders, Switch, PID). The label like "3 places" next to a cell in the Conditions library panel shows how many places use it (identical conditions in links are stored once and count as one place). Editing a cell instantly changes the behavior of all those places, so before saving a cell that is in use the panel asks for confirmation.</li>
              <li><b>If the knob "does not turn":</b> check in order - is the encoder On/Off slider on; is the condition true right now (are all devices in it in the required state); is there a typo or an empty cell.</li>
            </ul>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-rose-50 border-rose-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Real-life examples: what this page can really do</h2>
          <p class="mb-2">Four stories about how an ordinary lamp becomes smart light. Pins and IDs in the examples are made up.</p>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">The toddler found a magic knob</p>
            <p class="mb-1">Night, the nursery. The toddler reaches for the night light knob and twists it all the way. The room is flooded with light, the child wakes up and cries. Your heart sinks.</p>
            <p class="mb-1">Relax! In the encoder <b>Connection</b> window type <code>${'B1'}</code> into the <b>Condition</b> field and press <b>Save changes</b>. Now the knob works only while button 1 from the Button page is held. A toddler cannot manage that with one hand, and you can easily.</p>
            <p>Result: Connection - Condition - <code>${'B1'}</code>. Repeat it with the ID of your own button.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Seedlings are roasting under the lamp and you are at the airport</p>
            <p class="mb-1">You are already at the check-in desk and suddenly remember: the lamp over the seedlings is on at full power. You cannot go back, and the seedlings are precious.</p>
            <p class="mb-1">Relax! Send the SMS <code>${'12#00*'}</code> from the number set in the SIM800L settings, where 12 is the ID of the PWM row. The output drops to 0% and the set brightness is remembered. When you are back, send <code>${'12#11*'}</code> and the lamp shines as before. The reply looks like <code>${'OnOff: Pin12=OFF'}</code> if the common SIM800L slider is On.</p>
            <p>Result: two short SMS instead of a lost harvest. For a row with an encoder use the encoder ID.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">The movie started and the lamp glares</p>
            <p class="mb-1">You settled on the sofa, the first frames are rolling, and the floor lamp shines at full blast. You do not want to get up, and missing the opening is even worse.</p>
            <p class="mb-1">Relax! Make a bookmark on your phone: <code class="break-all">${'http://192.168.1.24:8000/api/Zerg/pwm?id=4&dvalue=10'}</code>, where Zerg is your Token and 4 is the ID of the floor lamp PWM pin. One tap and the light is dimmed to 10%.</p>
            <p>Result: a bookmark for every scene (movie, reading, night light) and not one step off the sofa. The API works only inside your local network.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">A wall without holes</p>
            <p class="mb-1">In a rented flat you cannot drill the wall for a switch, and turning a knob on the desk is awkward. You want a proper dimmer by the bed.</p>
            <p class="mb-1">Relax! Buy a Zigbee dimmer, on this page press <b>Edit PWM</b> on the PWM pin you need and choose the dimmer in the <b>Zigbee Device</b> field. The Encoder A and B pins are not needed: the dimmer controls the output directly.</p>
            <p>Result: a wireless dimmer you can stick on the bedside table. The On/Off slider of the output is still the boss.</p>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-orange-50 border-orange-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">How many devices can be connected (PWM connection)</h2>
          <div>
            <h3 class="text-lg font-bold text-black mb-2">Total limit: 1024 slots</h3>
            <p class="mb-2">The PWM connection field is the lamp or dimmer whose brightness the encoder (the "knob") controls. <b>One encoder controls one device:</b> a single device is selected in the Edit window. Every such connection takes one of the <b>1024 "slots"</b> — the same slots used on the "Switch(es) pin(s)" page.</p>
            <p class="mb-2"><b>Rows PWM without an encoder take no slots:</b> a slot is used only when a PWM is connected to an encoder.</p>
            <p class="mb-2"><b>There is no limit on the number of encoders</b> — as long as the total across the whole system does not exceed 1024 connections.</p>
            <p class="mb-2"><b>Example:</b> if 57 devices are already connected on the "Switch(es) pin(s)" page, only <b>967 free slots</b> are left for encoders (1024 − 57 = 967).</p>
          </div>
          <div>
            <h3 class="text-lg font-bold text-black mb-2">Conditions do not take slots</h3>
            <p class="mb-2">A condition is stored inside the link itself, so a link with a condition and a link without one take exactly the same single slot out of 1024. A separate limit applies only to the number of different conditions: 12 shared cells and 48 free expressions (shared by Switch, Encoder and PID). When the free expressions run out, the firmware refuses to save the link (error Condition pool is full): reuse an existing condition or delete unused links.</p>
          </div>
          <div>
            <h3 class="text-lg font-bold text-black mb-2">When the slots run out</h3>
            <p class="mb-2">When all 1024 slots are used, a new connection will not be added: the device returns an error (No free slots in PinsLinks, limit 1024). Remove unused connections on the Switch and Encoder pages first.</p>
            <p class="mb-2">After a reboot the device restores all saved connections by itself (from the pintopin.ini file) — they do not take any extra slots.</p>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-cyan-50 border-cyan-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Hardware Timer Limitations</h2>
          <div>
            <div class="space-y-2">
              <p class="mb-2"><strong>Important:</strong> You can set the desired PWM frequency from <strong>0.05 Hz to 2 MHz</strong>. However, PWM generation depends on the microcontroller's hardware timers (e.g., TIM1, TIM2, etc.).</p>
              <p class="mb-2"><strong>A single timer cannot generate different frequencies simultaneously!</strong> If you assign different pins that share the <em>same timer</em> to different encoders (or PWM rows) and set different frequencies, the last set frequency will apply to all pins sharing that timer.</p>
              <p class="mb-2">To use different frequencies for different devices, choose pins connected to <strong>different hardware timers</strong>.</p>
              <p class="mb-2">The polarity (CH Polarity) is set per channel: two pins of one timer can have different polarity, but they share the frequency. For the TIM1 and TIM8 timers the idle level of the output also changes automatically together with the polarity.</p>
              <p class="mt-4 font-bold text-black">PWM Pin to Timer Mapping and Capabilities:</p>
              <ul class="list-disc pl-5 mt-2 space-y-3 text-slate-700">
                <li>
                  <strong>TIM1 (16-bit Advanced):</strong> PE9, PE11, PE13, PE14<br/>
                  <span class="text-slate-700">High-speed timer. Optimal for medium and high frequencies (from 10 Hz to 2 MHz).</span>
                </li>
                <li>
                  <strong>TIM2 (32-bit):</strong> PA0, PA3, PB10<br/>
                  <span class="text-slate-700">32-bit counter natively supports ultra-low frequencies with maximum resolution (from 0.05 Hz to 100 kHz).</span>
                </li>
                <li>
                  <strong>TIM3 (16-bit General):</strong> PA6, PB1<br/>
                  <span class="text-slate-700">Standard PWM timer (from 10 Hz to 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM4 (16-bit General):</strong> PD12, PD13, PD14, PD15<br/>
                  <span class="text-slate-700">Standard PWM timer (from 10 Hz to 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM8 (16-bit Advanced):</strong> PC6, PC7, PC8, PC9<br/>
                  <span class="text-slate-700">High-speed timer. Optimal for medium and high frequencies (from 10 Hz to 2 MHz).</span>
                </li>
                <li>
                  <strong>TIM9 (16-bit):</strong> PE5, PE6<br/>
                  <span class="text-slate-700">Auxiliary timer (from 10 Hz to 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM10 (16-bit):</strong> PF6<br/>
                  <span class="text-slate-700">Auxiliary timer (from 10 Hz to 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM11 (16-bit):</strong> PF7<br/>
                  <span class="text-slate-700">Auxiliary timer (from 10 Hz to 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM12 (16-bit):</strong> PB15<br/>
                  <span class="text-slate-700">Auxiliary timer (from 10 Hz to 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM13 (16-bit):</strong> PF8<br/>
                  <span class="text-slate-700">Auxiliary timer (from 10 Hz to 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM14 (16-bit):</strong> PF9<br/>
                  <span class="text-slate-700">Auxiliary timer (from 10 Hz to 500 kHz).</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
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

    // Номер условия связи энкодера: из состояния энкодера, иначе из /api/pintopin/get
    const condOf = (d) => {
      if (d.cond !== undefined && d.cond !== null) return parseInt(d.cond, 10) || 0;
      const l = pintopin.find((p) => p.idin === d.id);
      return l ? (parseInt(l.cond, 10) || 0) : 0;
    };

    // Текст условия: сначала из состояния энкодера, иначе из /api/pintopin/get
    const cexprOf = (d) => {
      if (d.cexpr) return d.cexpr;
      const l = pintopin.find((p) => p.idin === d.id);
      return l ? l.cexpr || '' : '';
    };

    // Строка PWM без энкодера (kind:"pwm"): без Encoder A/B/Condition,
    // остаются PWM, рубильник, Zigbee и полярность (в Edit).
    const ArrayPwmRow = ({ d, index }) => {
      const fStatus = getFreqStatus(d.pwm || 0);
      const timerName = pwmTimerMap[d.pins];
      const isPid = d.owner === 'pid';
      const isRu = language === 'ru';
      const pidTip = isRu
        ? 'Этим PWM управляет PID: значение перезаписывается каждый цикл, у PID свой переключатель.'
        : 'This PWM is driven by PID: the value is overwritten every cycle, PID has its own switch.';
      const lockTip = isRu
        ? 'Идёт автотюн PID: настройки заблокированы.'
        : 'PID autotune is running: settings are locked.';
      return html`
        <tr class="${index % 2 === 1 ? 'bg-white/80' : 'bg-sky-200/40'} hover:bg-slate-200/80 transition-colors">
          <td class="px-6 py-2 text-sm text-slate-800 font-medium">
            ${d.pins}(${d.id})
            <span class="ml-2 text-xs font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200">PWM</span>
            ${isPid ? html`<span class="ml-1 text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300 cursor-help" data-tip=${pidTip}>PID</span>` : ''}
            ${d.locked ? html`<span class="ml-1 text-xs font-bold text-red-700 cursor-help" data-tip=${lockTip}>[lock]</span>` : ''}
          </td>
          <td class="px-6 py-2 text-sm text-slate-400">—</td>
          <td class="px-6 py-2 text-sm text-slate-400">—</td>
          <td class="px-6 py-2 text-sm text-slate-400">—</td>
          <td class="px-6 py-2 text-sm">
            <span class="font-mono text-slate-700">${formatPwmFreq(d.pwm)}</span>
            <span class="ml-1 font-bold ${fStatus.cls}">${fStatus.msg}</span>
            ${timerName ? html`<span class="ml-2 font-mono text-xs text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200 shadow-sm" title="Hardware Timer">${timerName}</span>` : ''}
            <span class="ml-2 text-xs font-semibold ${d.pol ? 'text-orange-700' : 'text-slate-500'}">${d.pol ? 'Inverted' : 'Normal'}</span>
          </td>
          <td class="px-6 py-2 font-mono text-sm text-blue-600">${d.pwmmax ? `${d.pwmmax} steps` : '—'}</td>
          <td class="px-6 py-2 text-sm text-slate-800">${d.dvalue}${isPid ? ' (PID)' : ''}</td>
          <td class="px-6 py-2 text-sm text-slate-700 font-semibold">${d.ponr === 1 ? 'ON' : 'OFF'}</td>
          <td class="px-6 py-2 text-sm text-slate-600">${d.info}</td>
          <td class="px-6 py-2" data-tip=${isPid ? pidTip : ''}>
            <${MyPolzunok}
              value=${d.onoff}
              disabled=${isPid || !!d.locked}
              onChange=${(value) => handleEncoderChange({ ...d, onoff: value })}
            />
          </td>
          <td class="px-6 py-2 text-sm">
            ${d.zbee_bind && d.zbee_bind > 0 ? html`
              <span class="font-mono text-sm text-cyan-700 font-semibold">ID ${d.zbee_bind}</span>
            ` : html`<span class="text-slate-400 text-sm">—</span>`}
          </td>
          <td class="px-6 py-2 text-sm whitespace-nowrap">
            <button
              onClick=${() => openModal('edit', d)}
              class="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
            >
              Edit PWM
            </button>
          </td>
        </tr>
      `;
    };

    const ArrayEncoder = ({ d, index }) => {
      if (d.kind === 'pwm') return html`<${ArrayPwmRow} d=${d} index=${index} />`;
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
          <td class="px-6 py-2 text-sm text-slate-700">
            ${(() => {
              const cb = condBadgeProps(condInfo(condOf(d), condsList, cexprOf(d)), language === 'ru');
              return cb
                ? html`<span style=${cb.style.replace('margin-left:6px;', '')} title=${cb.title}>${cb.label}</span>`
                : html`<span class="text-slate-400 text-sm">—</span>`;
            })()}
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
          <td class="px-6 py-2 text-sm">
            ${d.zbee_bind && d.zbee_bind > 0 ? html`
              <span class="font-mono text-sm text-cyan-700 font-semibold">
                ID ${d.zbee_bind}
              </span>
            ` : html`
              <span class="text-slate-400 text-sm">—</span>
            `}
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

    const pageSubtitle = {
      ru: 'Ночь, малыш уснул, а лампа всё ещё светит как прожектор. Один поворот ручки или команда с телефона - и свет плавно гаснет, а условие не даёт чужим рукам сбить настройку. Здесь живут ШИМ-выходы (диммеры, регуляторы скорости) и энкодеры к ним.',
      en: 'It is night, the baby is asleep, and the lamp still blazes like a floodlight. One turn of a knob or one command from your phone dims it smoothly, and a condition keeps clumsy hands from ruining your setting. This is where PWM outputs (dimmers, speed controllers) and their encoders live.',
    };

    if (!varencoder) return html`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">Loading...</div>`;

    return html`
      <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col justify-start items-center" style="overflow-anchor:none;">
        <!-- Decorative background glow -->
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div class="w-full relative z-10">
          <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-2 drop-shadow-sm tracking-tight uppercase">
            PWM/Encoder(s) pin(s)
          </div>
          <p class="text-sm text-slate-600 mb-6 max-w-3xl">${pageSubtitle[language] || pageSubtitle.en}</p>
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
                        <${Th} title="Condition" tooltipIndex=${14} />
                        <${Th} title="PWM Frequency" tooltipIndex=${11} />
                        <${Th} title="Resolution (steps)" tooltipIndex=${12} />
                        <${Th} title="Dimmer value (0-100)" tooltipIndex=${6} />
                        <${Th} title="Duty on restore" tooltipIndex=${7} />
                        <${Th} title="INFO" tooltipIndex=${8} />
                        <${Th} title="On/Off" tooltipIndex=${9} />
                        <${Th} title="Zigbee" tooltipIndex=${13} />
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

              <${CondLibraryPanel} isRu=${language === 'ru'} />

              <div class="flex justify-end mt-6">
                <button
                  onclick=${(e) => { lockToggle(e); setShowHelp(!showHelp); }}
                  class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
                >
                  ${showHelp ? 'Hide Help' : 'Show Help'}
                </button>
              </div>

              ${showHelp &&
      html`
                  <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700" style="max-height:70vh;max-height:70dvh;overflow-y:auto;">
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
          : (selectedEncoder && selectedEncoder.kind === 'pwm' ? 'Edit PWM' : 'Edit Encoder')}
                selectedEncoder=${selectedEncoder}
                handleEncoderChange=${handleEncoderSaved}
              />
            `}
        </div>
      </div>
    `;
  }
}

export { TabEncoder };