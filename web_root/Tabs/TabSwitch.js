import { lockToggle } from '../helpLock.js';


import { ModalSwitch } from '../Modals/ModalSwitch.js';
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
  const condLib = useCondLibrary();
  const condsList = condLib.loaded ? condLib.conds : [];
  const [debugInfo, setDebugInfo] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const isPendingOnOff = useRef(false);

  // Инициализируем глобальный tooltip один раз при монтировании
  useEffect(() => { initGlobalTooltip(); }, []);

  // Библиотека условий (общий стор CondLibrary.js) - для показа текста условия связи
  

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

  useEffect(() => {
    let active = true;
    refresh();

    // ── Загрузка + polling через pollQueue (одно соединение, без нового handshake) ──
    registerPoll('switches', '/api/state/switch', function(data) {
      if (!active) return;
      if (isPendingOnOff.current) return;
      if (data !== null && data !== undefined) {
        if (data.switches) { setSwitch(data.switches); setLanguage(data.lang); }
        if (data.pintopin) setPintopin(data.pintopin);
      }
    }, { immediate: true });

    return function() {
      active = false;
      unregisterPoll('switches');
    };
  }, []);

  const isGpioPin = (pin) => /^P[A-Z]\d+$/i.test(pin);

  const getConnectedPins = (switchId) => {
    const connectedPins = new Map();

    // Номер и текст условия связи из /api/pintopin/get (0/""/пусто = нет)
    const linkCond = (relayId) => {
      const l = pintopin.find((p) => p.idin === switchId && p.idout === relayId);
      return l ? parseInt(l.cond, 10) || 0 : 0;
    };
    const linkCexpr = (relayId) => {
      const l = pintopin.find((p) => p.idin === switchId && p.idout === relayId);
      return l ? l.cexpr || '' : '';
    };

    const switchItem = varswitch.find((sw) => sw.id === switchId);
    console.log(`[getConnectedPins] switchId=${switchId}`, 'pinact=', switchItem?.pinact, 'pintopin entries=', pintopin.filter(p => p.idin === switchId));
    if (switchItem && switchItem.pinact) {
      Object.entries(switchItem.pinact).forEach(([deviceId, pinName]) => {
        console.log(`[getConnectedPins] pinact entry: deviceId=${deviceId}, pinName=${pinName}, isGpio=${isGpioPin(pinName)}`);
        if (pinName) {
          const rid = parseInt(deviceId);
          connectedPins.set(rid, { pin: pinName, relayId: rid, cond: linkCond(rid), cexpr: linkCexpr(rid) });
        }
      });
    }

    pintopin.forEach((item) => {
      if (item.idin === switchId) {
        if (!connectedPins.has(item.idout)) {
          connectedPins.set(item.idout, { pin: item.pins, relayId: item.idout, cond: parseInt(item.cond, 10) || 0, cexpr: item.cexpr || '' });
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
      body: JSON.stringify({ id: id, pin: pinName.trim(), idout: idout })
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

    // Optimistic UI update
    setSwitch((prevSwitches) =>
      prevSwitches.map((sw) =>
        sw.id === updatedSwitch.id ? updatedSwitch : sw
      )
    );
    isPendingOnOff.current = true;

    const request = fetch('/api/onoff/set', {
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
      })
      .finally(() => {
        setTimeout(() => {
          isPendingOnOff.current = false;
        }, 1500);
      });

    closeModal();
    return request;
  };

  // Сохранение из модалок "Edit switch" / "Edit Connection": /api/switch/set
  // уже записал info/ptype/связи. /api/onoff/set нужен ТОЛЬКО если On/Off
  // реально переключён в модалке: parse_onoff_json() для Zigbee-выключателя
  // вызывает processPins() (включает все пины из Device connection), а для
  // физического — выставляет ШИМ-выходам dvalue, т.е. Save "щёлкал"
  // выключателем. Ползунок в таблице по-прежнему использует handleSwitchChange.
  const handleSwitchSaved = (updatedSwitch) => {
    console.log('handleSwitchSaved:', updatedSwitch);
    if (updatedSwitch.onoff !== selectedSwitch?.onoff) {
      handleSwitchChange(updatedSwitch).then(() => refresh());
    } else {
      setSwitch((prevSwitches) =>
        prevSwitches.map((sw) =>
          sw.id === updatedSwitch.id ? updatedSwitch : sw
        )
      );
      closeModal();
      refresh();
    }
  };

  const getRelayConnection = (switchId) => {
    const connection = pintopin.find((item) => item.idin === switchId);
    return connection ? `${connection.pins} (${connection.idout})` : '';
  };

  const helpContent = {
    ru: html`
      <div class="mytext space-y-6 font-sans text-base leading-relaxed text-slate-700 [&_code]:font-sans [&_code]:font-semibold [&_pre]:font-sans">
        <section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Управление по SMS и DTMF</h2>
<div><h4 class="text-lg font-bold text-black mt-4 mb-2">Рубильник On/Off по SMS и DTMF</h4><p class="mb-2">Ползунок On/Off любой строки этой страницы можно переключить с телефона, номер которого указан в настройках SIM800L: SMS-сообщением или во время звонка (тональный набор DTMF). Формат команды одинаков на всех страницах: <b>ID#КОД*</b>, где ID - число из колонки ID нужной строки.</p><table class="w-full border-collapse my-2 bg-white/70"><thead><tr><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">Действие</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">SMS</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">DTMF (во время звонка)</th></tr></thead><tbody><tr><td class="border px-3 py-1">Отключить строку (ползунок Off)</td><td class="border px-3 py-1"><code>5#00*</code></td><td class="border px-3 py-1"><code>5#00*#</code></td></tr><tr><td class="border px-3 py-1">Включить строку (ползунок On)</td><td class="border px-3 py-1"><code>5#11*</code></td><td class="border px-3 py-1"><code>5#11*#</code></td></tr></tbody></table><p class="mb-2">В таблице ID = 5 - это пример, подставьте ID своей строки.</p><p class="mb-2">Несколько команд подряд: <code>5#00*7#11*</code> (SMS) и <code>5#00*7#11*#</code> (звонок). Ввод во время звонка всегда завершается символами <code>*#</code>: последняя команда уже заканчивается на <code>*</code>, поэтому в конце добавляется только <code>#</code>.</p><p class="mb-2">Коды для всех страниц: Button, Switch, Encoder, OneWire, Security, Zigbee - <b>00</b> (выкл) и <b>11</b> (вкл); Cron - <b>33</b> и <b>44</b>; PID - <b>55</b> и <b>66</b>.</p><p class="mb-2">В ответ приходит SMS-отчёт, например <code>OnOff: Pin5=OFF</code> (отчёт отправляется, только если включён общий ползунок SIM800L). Неверные команды попадают в список Invld pins/cmd.</p><p class="mb-2">Не путайте: команды из одной цифры (<code>ID#0*</code>, <code>ID#1*</code>, <code>ID#2*</code>) управляют выходом, а команды из двух цифр (<code>ID#00*</code>, <code>ID#11*</code>) - ползунком On/Off. Пока ползунок Off, переключатель блокируется.</p></div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Примеры SMS и DTMF команд</h3>
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Команда</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">14#1*#</td>
                <td class="border px-4 py-2">Данная команда ВКЛючает все пины, указанные в поле “Device connection” для строки с id = 14. Она работает как по SMS, так и с помощью тонального набора (DTMF) во время звонка.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">14#0*#</td>
                <td class="border px-4 py-2">Данная команда ОТКлючает все пины, указанные в поле “Device connection” для строки с id = 14. Она работает как по SMS, так и с помощью тонального набора (DTMF) во время звонка.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">14#2*#</td>
                <td class="border px-4 py-2">Данная команда переключит (TOGGLE) все пины, указанные в поле “Device connection” для строки с id = 14 на противоположное.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">14#1*15#0*#</td>
                <td class="border px-4 py-2">Можно группировать несколько команд в одну! В конце строки обязательно нужно добавить символ <b>#</b>, чтобы закрыть команду.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Ответ</td>
                <td class="border px-4 py-2">Если главный рубильник (On/Off) в какой-либо строке таблицы выключен, то команда будет проигнорирована для этой строки, а в ответном SMS придет подобное сообщение <b>14:DISABLED</b>.</td>
              </tr>
            </tbody>
          </table>
        </div>
        </section>
        <section class="rounded-2xl border-2 bg-emerald-50 border-emerald-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Управление по API (локальная сеть)</h2>
        <div>
          <p class="mb-1">Данный API позволяет дистанционно управлять выключателем, просто выполнив команду в браузере любого устройства в вашей локальной сети.</p>
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
                <td class="border px-4 py-2 whitespace-nowrap">
                  http://192.168.1.24:8000/api/Zerg/switch?id=27&state=1
                </td>
                <td class="border px-4 py-2">
                  Данная команда ВКЛючает все пины, указанные в поле “Device connection”, для строки с id = 27. Где “Zerg” — это ваш “Token”.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">
                  http://192.168.1.24:8000/api/Zerg/switch?id=27&state=0
                </td>
                <td class="border px-4 py-2">
                  Данная команда ОТКлючает все пины, указанные в поле “Device connection”, для строки с id = 27. Где “Zerg” — это ваш “Token”.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </section>
        <section class="rounded-2xl border-2 bg-violet-50 border-violet-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">MQTT: управление и отслеживание</h2>
        <div>
          <p class="mb-1">MQTT позволяет дистанционно управлять выключателем из интернета!</p>
        </div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Примеры команд MQTT</h3>
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Команда</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">Zagotovka/switch/id=27/state=1</td>
                <td class="border px-4 py-2">
                  Данная MQTT команда ВКЛючает все пины, указанные в поле “Device connection”, для строки с id = 27. Где "Zagotovka" это Ваш 'RX topic'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Zagotovka/switch/id=27/state=0</td>
                <td class="border px-4 py-2">
                  Данная MQTT команда ОТКлючает все пины, указанные в поле “Device connection”, для строки с id = 27. Где "Zagotovka" это Ваш 'RX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Отслеживание изменений</h3>
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Топик</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">Swarm/switch/</td>
                <td class="border px-4 py-2">
                  Данная страница отслеживает изменения выключателей и автоматически отправляет каждое изменение по MQTT на топик: Swarm/switch/.
                  Где "Swarm" это Ваш 'TX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </section>
        <section class="rounded-2xl border-2 bg-amber-50 border-amber-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">${condHelpTitle(true)}</h2>
        <div class="space-y-3">
          <p class="text-slate-600 italic mb-2">Включай только если...</p>
          <p class="mb-2">Условие - это «замок» на связи выключателя с пином из поля <b>Device connection</b>. Каждый раз, когда выключатель срабатывает, прошивка проверяет условие. Если оно верно (ДА) - связь работает как обычно. Если неверно (НЕТ) - эта связь молча пропускается. Остальные связи этого же выключателя живут сами по себе. Если условие не выбрано (<b>None</b>) - связь работает всегда.</p>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Как поставить условие: один шаг</h4>
          <ol class="list-decimal ml-6 mb-3 space-y-1">
            <li><b>Впишите условие прямо в связи.</b> На этой странице у нужного выключателя нажмите <b>Connection</b>, выберите пин в поле <b>Connection</b> и впишите условие в поле <b>Condition</b>, например ${'D1&!D2'} или ${'T5>25.5'}. Нажмите <b>Save changes</b>. Пустое поле - условия нет.</li>
            <li><b>Короткая ссылка на общую ячейку (необязательно).</b> Под таблицей на этой странице находится панель <b>«Библиотека условий (Conditions)»</b> с 12 ячейками C1..C12 (те же ячейки есть и в Global Settings). Ячейки видны и правятся прямо здесь: впишите выражение и нажмите <b>Сохранить</b>. Кнопки <b>C1..C12</b> в поле Condition вставляют ссылку вида ${'C1'} - условие берётся из ячейки, и её правка сразу меняет поведение всех ссылок (в том числе в действиях кнопок и таймеров).</li>
          </ol>

          <div class="p-4 rounded-xl bg-white/80 border border-amber-300 mb-3">
            <p class="text-lg font-bold text-black mb-1">Пример из жизни</p>
            <p class="mb-1">Выключатель в коридоре включает свет (устройство с ID 5). Хотим, чтобы свет включался выключателем только ночью.</p>
            <p class="mb-1">1) На странице Switch pin: Connection, выбираем устройство 5, в Condition вписываем ${'Ss'} (Ss - это «сейчас ночь»), Save changes.</p>
            <p>Результат: днём щёлкаете выключателем - свет не включается. Ночью щёлкаете - включается.</p>
          </div>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Из чего строится условие (слова)</h4>
          <table class="w-full mb-3 bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Запись</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Как читать</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">Буквы</td><td class="border px-4 py-2">Буквы в условии: D - состояние устройства (выход на пине DEVICE, PWM или Zigbee-устройство), DV - значение диммера, B - кнопка (BU - не нажата, BH - удерживается), T - температурный датчик, H - датчик влажности, Sr / Ss - день / ночь, C - ссылка на ячейку библиотеки. Число после буквы - ID из первой колонки таблицы. Прежние буквы R и RV тоже работают.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'D5'}</td><td class="border px-4 py-2">Устройство (пин DEVICE) с ID 5 сейчас ВКЛючено. Для Zigbee-устройства - оно включено.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'!D5'}</td><td class="border px-4 py-2">Пин с ID 5 сейчас ВЫКЛючен (знак ! означает «НЕ»).</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'DV3>0'}</td><td class="border px-4 py-2">Диммер (ШИМ) с ID 3: значение больше нуля, то есть светит. Для Zigbee - яркость устройства.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'DV3=255'}</td><td class="border px-4 py-2">Значение диммера 3 ровно 255.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'DV3g100'}</td><td class="border px-4 py-2">Значение диммера 3 БОЛЬШЕ ИЛИ РАВНО 100 (буква g - «greater», то же, что ${'>='}).</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'DV3l100'}</td><td class="border px-4 py-2">Значение диммера 3 МЕНЬШЕ ИЛИ РАВНО 100 (буква l - «less», то же, что ${'<='}).</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'B1'}</td><td class="border px-4 py-2">Кнопка с ID 1 сейчас нажата.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'BU1'}</td><td class="border px-4 py-2">Кнопка с ID 1 сейчас НЕ нажата.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'BH1'}</td><td class="border px-4 py-2">Кнопка с ID 1 сейчас удерживается (долгое нажатие).</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'T5>25.5'}</td><td class="border px-4 py-2">Температура датчика 5 больше 25.5 градусов.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'T5<10'}</td><td class="border px-4 py-2">Температура датчика 5 меньше 10 градусов.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'H4>50'}</td><td class="border px-4 py-2">Влажность датчика 4 больше 50 процентов.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'H4<30'}</td><td class="border px-4 py-2">Влажность датчика 4 меньше 30 процентов.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'Sr'}</td><td class="border px-4 py-2">Сейчас ДЕНЬ.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'Ss'}</td><td class="border px-4 py-2">Сейчас НОЧЬ.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'C3'}</td><td class="border px-4 py-2">Подставить условие из ячейки C3. Работает и в условии связи, и в действиях после знака ?. Ссылка внутри ссылки допустима не глубже двух уровней.</td></tr>
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
              <tr><td class="border px-4 py-2 font-semibold">${'&'}</td><td class="border px-4 py-2">И (нужно, чтобы выполнились ОБА)</td><td class="border px-4 py-2"><span class="font-semibold">${'D1&D2'}</span> - устройство 1 включено И устройство 2 включено</td></tr>
              <tr><td class="border px-4 py-2 font-semibold">${'|'}</td><td class="border px-4 py-2">ИЛИ (достаточно ОДНОГО)</td><td class="border px-4 py-2"><span class="font-semibold">${'D1|D2'}</span> - включено устройство 1 ИЛИ устройство 2 (или оба)</td></tr>
              <tr><td class="border px-4 py-2 font-semibold">${'!'}</td><td class="border px-4 py-2">НЕ (наоборот)</td><td class="border px-4 py-2"><span class="font-semibold">${'!D1'}</span> - устройство 1 выключено; <span class="font-semibold">${'!(D1&D2)'}</span> - неверно, что включены оба сразу</td></tr>
              <tr><td class="border px-4 py-2 font-semibold">${'( )'}</td><td class="border px-4 py-2">Скобки - что считать первым</td><td class="border px-4 py-2"><span class="font-semibold">${'(D1|D2)&Ss'}</span> - (устройство 1 или устройство 2) И ночь</td></tr>
              <tr><td class="border px-4 py-2 font-semibold">${'= > < g l'}</td><td class="border px-4 py-2">Равно, больше, меньше (g = больше или равно, l = меньше или равно, то же, что ${'>='} и ${'<='})</td><td class="border px-4 py-2"><span class="font-semibold">${'T5>25.5'}</span>, <span class="font-semibold">${'DV3=255'}</span>, <span class="font-semibold">${'DV3l100'}</span></td></tr>
            </tbody>
          </table>
          <p class="mb-3 text-slate-700">Совет: если в одном условии смешиваете & и |, всегда ставьте скобки. Так результат будет именно тот, который вы задумали.</p>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Готовые примеры - просто скопируйте</h4>
          <table class="w-full mb-3 bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Условие</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Связь сработает, только если...</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'D1'}</td><td class="border px-4 py-2">устройство с ID 1 включено (ID из первой колонки таблицы): выход на пине DEVICE, PWM с яркостью больше 0 или Zigbee-устройство. Прежняя запись R1 тоже работает</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'!D1'}</td><td class="border px-4 py-2">устройство 1 выключено</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'D1&D2'}</td><td class="border px-4 py-2">включены и устройство 1, и устройство 2</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'D1|D2'}</td><td class="border px-4 py-2">включено хотя бы одно из двух устройств</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'D1&!D2'}</td><td class="border px-4 py-2">устройство 1 включено, а устройство 2 выключено</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'!D1&!D2'}</td><td class="border px-4 py-2">выключены оба устройства</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'(D1|D2)&!D3'}</td><td class="border px-4 py-2">включено устройство 1 или 2, и при этом устройство 3 выключено</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'Ss'}</td><td class="border px-4 py-2">Cейчас ночь. Sunset (время заката), ежедневно рассчитывается по координатам на странице 'Global Settings'.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'Sr'}</td><td class="border px-4 py-2">Cейчас день. Sunrise (время восхода), ежедневно рассчитывается по координатам на странице 'Global Settings'.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'Ss&B1'}</td><td class="border px-4 py-2">ночь и кнопка 1 нажата</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'Ss|D1'}</td><td class="border px-4 py-2">ночь ИЛИ включено устройство 1</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'BU1'}</td><td class="border px-4 py-2">кнопка 1 не нажата</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'BH1'}</td><td class="border px-4 py-2">кнопка 1 удерживается</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'T5>25.5'}</td><td class="border px-4 py-2">на датчике 5 жарче 25.5 градусов</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'T5<18'}</td><td class="border px-4 py-2">на датчике 5 холоднее 18 градусов</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'H4>50'}</td><td class="border px-4 py-2">влажность на датчике 4 выше 50 процентов</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'H4<30'}</td><td class="border px-4 py-2">влажность на датчике 4 ниже 30 процентов</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'T5>25&H4>60&!D7'}</td><td class="border px-4 py-2">жарко, влажно и вентилятор (устройство 7) ещё не включён</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'Sr&T5<20'}</td><td class="border px-4 py-2">день и при этом холодно</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'(T5>28|H4>70)&Sr'}</td><td class="border px-4 py-2">днём, и при этом жарко или очень влажно</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'DV3>0'}</td><td class="border px-4 py-2">диммер 3 светит (значение больше нуля)</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'DV3=255'}</td><td class="border px-4 py-2">диммер 3 ровно на 255</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'DV3g100'}</td><td class="border px-4 py-2">значение диммера 3 больше или равно 100</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'DV3l100'}</td><td class="border px-4 py-2">значение диммера 3 меньше или равно 100</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'DV3>0&Ss'}</td><td class="border px-4 py-2">диммер 3 светит и сейчас ночь</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'D93'}</td><td class="border px-4 py-2">Zigbee-устройство с ID 93 включено (ID Zigbee-устройств начинаются с 89)</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'DV93g100'}</td><td class="border px-4 py-2">яркость Zigbee-устройства 93 не меньше 100</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'T5<25|D1'}</td><td class="border px-4 py-2">температура датчика 5 ниже 25 ИЛИ устройство 1 включено (особый случай при неисправном датчике - см. правила ниже)</td></tr>
            </tbody>
          </table>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Важные правила</h4>
          <ul class="list-disc ml-6 mb-3 space-y-1">
            <li><b>Условие проверяется в момент срабатывания.</b> Если выключатель щёлкнули, а условие было НЕТ - связь пропущена. Когда условие потом станет ДА, само по себе ничего не включится: нужно щёлкнуть выключателем ещё раз.</li>
            <li><b>Условие связи работает</b>, когда выключатель сработал от физического тумблера, по API (switch?id=27&state=1), по MQTT или от Zigbee-выключателя.</li>
            <li><b>Если выключатель вызывается из действия</b> кнопки, датчика, рассвета/заката (например 6:1, где 6 - это Switch pin), условие из Connection в этом случае НЕ проверяется. Пишите условие прямо в действии через знак ? (см. ниже).</li>
            <li><b>Прямое управление пином</b> (ползунок On/Off у самого реле, MQTT/API-команда прямо на реле) условия не проверяет.</li>
            <li><b>Главный ползунок On/Off выключателя</b> сильнее любого условия: если он выключен, выключатель не работает вообще.</li>
            <li><b>Неисправный датчик</b> даёт ответ «неизвестно», и действие блокируется, даже если перед условием стоит !. Исключение: явная правда через |. Например ${'T5<25|D1'} сработает при неисправном датчике 5, если устройство 1 включено.</li>
            <li><b>Ограничения:</b> 12 общих ячеек библиотеки условий плюс 48 свободных выражений, вписанных прямо в связи (одинаковые хранятся один раз). В одном условии не более 46 символов. Допустимы только латинские буквы, цифры и знаки ( ) ! & | = ${'>'} ${'<'}, точка и минус (минус только для отрицательного числа справа от знака сравнения). Если запись неверна, прошивка откажется её сохранить.</li>
            <li><b>Одну ячейку можно использовать во многих связях.</b> Надпись вида «3 мест» рядом с ячейкой в панели показывает, сколько мест её используют (одинаковые условия в связях хранятся один раз и считаются за одно место). Исправив ячейку, вы сразу меняете поведение всех этих мест, поэтому перед сохранением используемой ячейки панель просит подтверждение.</li>
            <li><b>Метка «сброшено (0)»</b> у ячейки в панели означает, что в ней стоит 0: так бывает после удаления устройства, которое было в условии. Пустая ячейка тоже считается НЕТ. Пока в ячейке 0 или пусто, все связи, которые на неё ссылаются, заблокированы. Впишите правильное условие в панели заново. В таблице такая связь подсвечивается красным бейджем «C1: пусто» (или жёлтым, если пустая ячейка стоит внутри составного условия).</li>
          </ul>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Условие прямо в действии: <span class="font-semibold">${'6:1?D2&!D3'}</span></h4>
          <p class="mb-2">В действиях кнопок, датчиков, таймеров, рассвета и заката условие пишется сразу после знака <b>?</b>, без пробелов:</p>
          <p class="mb-2 font-semibold">${'пин:действие?условие'}</p>
          <p class="mb-2">Действие: <b>0</b> - выключить, <b>1</b> - включить, <b>2</b> - переключить на противоположное. Несколько действий разделяются запятой, и у каждого может быть своё условие.</p>
          <table class="w-full mb-3 bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Запись</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Как читать</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'6:1?D2&!D3'}</td><td class="border px-4 py-2">Включить пин 6, но только если устройство 2 включено и устройство 3 выключено.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'6:0?Sr'}</td><td class="border px-4 py-2">Выключить пин 6, только если сейчас день.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'6:2?T5>25.5'}</td><td class="border px-4 py-2">Переключить пин 6, только если на датчике 5 жарче 25.5 градусов.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'6:1?Ss|B1'}</td><td class="border px-4 py-2">Включить пин 6 ночью или когда нажата кнопка 1.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'6:1?C3'}</td><td class="border px-4 py-2">Включить пин 6, только если верно условие из ячейки C3 (панель «Библиотека условий» под таблицей).</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'6:1?D2,7:0?!D2'}</td><td class="border px-4 py-2">Два действия сразу: пин 6 включить, если устройство 2 включено; пин 7 выключить, если устройство 2 выключено.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'6:1,7:0?D2'}</td><td class="border px-4 py-2">Пин 6 включить всегда; пин 7 выключить только если устройство 2 включено.</td></tr>
            </tbody>
          </table>
        </div>
        </section>
        <section class="rounded-2xl border-2 bg-teal-50 border-teal-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Сколько устройств можно подключить (Device connection)</h2>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Общий лимит: 1024 места</h3>
          <p class="mb-2">В системе есть <b>1024 «места» для подключений</b>. Каждая связь «выключатель - устройство» (пин или Zigbee) занимает одно место. Одно и то же устройство, подключённое к трём выключателям, займёт три места.</p>
          <p class="mb-2"><b>Ограничения на один выключатель нет.</b> К выключателю с id = 27 можно подключить и 1, и 4, и 50 устройств - главное, чтобы во всей системе в сумме не набралось больше 1024.</p>
          <p class="mb-2"><b>Пример:</b> если на странице «Switch(es) pin(s)» вы подключили в общей сумме 57 устройств, то остаётся <b>967 свободных мест</b> (1024 − 57 = 967).</p>
        </div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Условия места не занимают</h3>
          <p class="mb-2">Условие хранится внутри самой связи: связь с условием и без него занимает одно и то же одно место из 1024.</p>
          <p class="mb-2">Отдельный, небольшой лимит действует на число разных условий: <b>12 общих ячеек</b> (панель «Библиотека условий») и <b>48 свободных выражений</b>, вписанных прямо в связи Switch, Encoder и PID. Одинаковые выражения хранятся один раз. Выражение, на которое больше никто не ссылается, освобождается автоматически, когда понадобится место. Сколько свободных выражений осталось, показано рядом с полем Condition. Если они закончились, прошивка не сохранит связь (ошибка Condition pool is full): используйте уже существующее условие или удалите ненужные связи.</p>
        </div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Как освободить место</h3>
          <ul class="list-disc ml-6 space-y-1">
            <li>Красное <b>[x]</b> рядом с подключением удаляет связь и освобождает место.</li>
            <li>Удаление самого выключателя или устройства убирает все связи с ним. Условия, в которых упоминалось удалённое устройство, превращаются в 0 и блокируют действие, пока вы не впишете их заново.</li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Если места закончились</h3>
          <p class="mb-2">Когда заняты все 1024 места, новое подключение не добавится: устройство вернёт ошибку (No free slots in PinsLinks, limit 1024). Сначала удалите ненужные связи.</p>
        </div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Что ещё использует эти места</h3>
          <ul class="list-disc ml-6 space-y-1">
            <li>Поле <b>PWM connection</b> на странице Encoder pin использует те же 1024 места.</li>
            <li>После перезагрузки устройство само восстанавливает все сохранённые подключения (из файла pintopin.ini) - новых мест они не занимают.</li>
          </ul>
        </div>
        </section>
      </div>
    `,
        en: html`
      <div class="mytext space-y-6 font-sans text-base leading-relaxed text-slate-700 [&_code]:font-sans [&_code]:font-semibold [&_pre]:font-sans">
        <section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Control by SMS and DTMF</h2>
<div><h4 class="text-lg font-bold text-black mt-4 mb-2">On/Off switch by SMS and DTMF</h4><p class="mb-2">The On/Off slider of any row on this page can be switched from the phone number set in the SIM800L settings: by SMS or during a call (DTMF tones). The command format is the same on every page: <b>ID#CODE*</b>, where ID is the number from the ID column of the needed row.</p><table class="w-full border-collapse my-2 bg-white/70"><thead><tr><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">Action</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">SMS</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">DTMF (during a call)</th></tr></thead><tbody><tr><td class="border px-3 py-1">Turn the row off (slider Off)</td><td class="border px-3 py-1"><code>5#00*</code></td><td class="border px-3 py-1"><code>5#00*#</code></td></tr><tr><td class="border px-3 py-1">Turn the row on (slider On)</td><td class="border px-3 py-1"><code>5#11*</code></td><td class="border px-3 py-1"><code>5#11*#</code></td></tr></tbody></table><p class="mb-2">In the table ID = 5 is an example, use the ID of your own row.</p><p class="mb-2">Several commands in a row: <code>5#00*7#11*</code> (SMS) and <code>5#00*7#11*#</code> (call). Input during a call always ends with <code>*#</code>: the last command already ends with <code>*</code>, so only <code>#</code> is added at the end.</p><p class="mb-2">Codes for all pages: Button, Switch, Encoder, OneWire, Security, Zigbee - <b>00</b> (off) and <b>11</b> (on); Cron - <b>33</b> and <b>44</b>; PID - <b>55</b> and <b>66</b>.</p><p class="mb-2">An SMS report is sent back, for example <code>OnOff: Pin5=OFF</code> (the report is sent only if the common SIM800L slider is On). Wrong commands are listed in Invld pins/cmd.</p><p class="mb-2">Do not confuse them: one-digit commands (<code>ID#0*</code>, <code>ID#1*</code>, <code>ID#2*</code>) control the output, while two-digit commands (<code>ID#00*</code>, <code>ID#11*</code>) change the On/Off slider. While the slider is Off, the switch is blocked.</p></div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">SMS & DTMF Command Examples</h3>
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Command</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">14#1*#</td>
                <td class="border px-4 py-2">This command turns ON all pins specified in the "Device connection" field for the row with id = 14. Works via both SMS and DTMF tone dialing during a voice call.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">14#0*#</td>
                <td class="border px-4 py-2">This command turns OFF all pins specified in the "Device connection" field for the row with id = 14. Works via both SMS and DTMF tone dialing during a voice call.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">14#2*#</td>
                <td class="border px-4 py-2">This command will TOGGLE all pins specified in the "Device connection" field for the row with id = 14 to the opposite state.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">14#1*15#0*#</td>
                <td class="border px-4 py-2">You can chain multiple commands into one! At the end of the string you must append the <b>#</b> symbol to close the command.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Response</td>
                <td class="border px-4 py-2">If the master switch (On/Off) in any row of the table is turned off, the command will be ignored for that row, and a message like <b>14:DISABLED</b> will be sent in the SMS response.</td>
              </tr>
            </tbody>
          </table>
        </div>
        </section>
        <section class="rounded-2xl border-2 bg-emerald-50 border-emerald-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">API control (local network)</h2>
        <div>
          <p class="mb-1">This API allows you to remotely control a switch by simply executing a command in the browser of any device on your local network.</p>
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
                <td class="border px-4 py-2 whitespace-nowrap">
                  http://192.168.1.24:8000/api/Zerg/switch?id=27&state=1
                </td>
                <td class="border px-4 py-2">
                  This command turns ON all pins specified in the "Device connection" field for the row with id = 27. Where "Zerg" is your "Token".
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">
                  http://192.168.1.24:8000/api/Zerg/switch?id=27&state=0
                </td>
                <td class="border px-4 py-2">
                  This command turns OFF all pins specified in the "Device connection" field for the row with id = 27. Where "Zerg" is your "Token".
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </section>
        <section class="rounded-2xl border-2 bg-violet-50 border-violet-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">MQTT: control and tracking</h2>
        <div>
          <p class="mb-1">MQTT allows you to remotely control a switch from the internet!</p>
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
                <td class="border px-4 py-2 whitespace-nowrap">Zagotovka/switch/id=27/state=1</td>
                <td class="border px-4 py-2">
                  This MQTT command turns ON all pins specified in the "Device connection" field for the row with id = 27. Where "Zagotovka" is your 'RX topic'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">Zagotovka/switch/id=27/state=0</td>
                <td class="border px-4 py-2">
                  This MQTT command turns OFF all pins specified in the "Device connection" field for the row with id = 27. Where "Zagotovka" is your 'RX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Change Tracking</h3>
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Topic</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">Swarm/switch/</td>
                <td class="border px-4 py-2">
                  This page tracks switch changes and automatically sends each change via MQTT to the topic: Swarm/switch/.
                  Where "Swarm" is your 'TX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </section>
        <section class="rounded-2xl border-2 bg-amber-50 border-amber-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">${condHelpTitle(false)}</h2>
        <div class="space-y-3">
          <p class="text-slate-600 italic mb-2">Turn on only if...</p>
          <p class="mb-2">A condition is a "lock" on the link between a switch and a pin from the <b>Device connection</b> field. Every time the switch fires, the firmware checks the condition. If it is true (YES), the link works as usual. If it is false (NO), this link is silently skipped. The other links of the same switch work on their own. If no condition is selected (<b>None</b>), the link always works.</p>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">How to set a condition: one step</h4>
          <ol class="list-decimal ml-6 mb-3 space-y-1">
            <li><b>Type the condition right into the link.</b> On this page press <b>Connection</b> for the needed switch, choose a pin in the <b>Connection</b> field and type the condition into the <b>Condition</b> field, for example ${'D1&!D2'} or ${'T5>25.5'}. Press <b>Save changes</b>. An empty field means no condition.</li>
            <li><b>Short reference to a shared cell (optional).</b> Under the table on this page there is the <b>Conditions library</b> panel with 12 cells C1..C12 (the same cells are also shown on the Global Settings page). The cells are visible and editable right here: type an expression and press <b>Save</b>. The <b>C1..C12</b> buttons in the Condition field insert a reference like ${'C1'} - the condition is taken from that cell, so editing it changes every reference at once (including references in button and timer actions).</li>
          </ol>

          <div class="p-4 rounded-xl bg-white/80 border border-amber-300 mb-3">
            <p class="text-lg font-bold text-black mb-1">Real-life example</p>
            <p class="mb-1">A hallway switch turns on a light (device with ID 5). We want the switch to turn the light on only at night.</p>
            <p class="mb-1">1) On the Switch pin page: Connection, choose device 5, type ${'Ss'} into Condition (Ss means "it is night now"), Save changes.</p>
            <p>Result: during the day the switch does nothing to the light. At night it turns the light on.</p>
          </div>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Building blocks (words)</h4>
          <table class="w-full mb-3 bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Entry</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">Letters</td><td class="border px-4 py-2">Letters in a condition: D - device state (output on a DEVICE pin, PWM or Zigbee device), DV - dimmer value, B - button (BU - not pressed, BH - held), T - temperature sensor, H - humidity sensor, Sr / Ss - day / night, C - reference to a library cell. The number after a letter is the ID from the first table column. The old letters R and RV still work.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'D5'}</td><td class="border px-4 py-2">The device (DEVICE pin) with ID 5 is ON now. For a Zigbee device - it is on.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'!D5'}</td><td class="border px-4 py-2">The pin with ID 5 is OFF now (the ! sign means "NOT").</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'DV3>0'}</td><td class="border px-4 py-2">Dimmer (PWM) with ID 3: value above zero, that is, it is lit. For Zigbee - device brightness.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'DV3=255'}</td><td class="border px-4 py-2">Dimmer 3 value is exactly 255.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'DV3g100'}</td><td class="border px-4 py-2">Dimmer 3 value is GREATER THAN OR EQUAL TO 100 (letter g = "greater", same as ${'>='}).</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'DV3l100'}</td><td class="border px-4 py-2">Dimmer 3 value is LESS THAN OR EQUAL TO 100 (letter l = "less", same as ${'<='}).</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'B1'}</td><td class="border px-4 py-2">Button with ID 1 is pressed now.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'BU1'}</td><td class="border px-4 py-2">Button with ID 1 is NOT pressed now.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'BH1'}</td><td class="border px-4 py-2">Button with ID 1 is being held (long press).</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'T5>25.5'}</td><td class="border px-4 py-2">Temperature of sensor 5 is above 25.5 degrees.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'T5<10'}</td><td class="border px-4 py-2">Temperature of sensor 5 is below 10 degrees.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'H4>50'}</td><td class="border px-4 py-2">Humidity of sensor 4 is above 50 percent.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'H4<30'}</td><td class="border px-4 py-2">Humidity of sensor 4 is below 30 percent.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'Sr'}</td><td class="border px-4 py-2">It is DAYTIME now. Sunrise (sunrise time), calculated daily based on the coordinates configured on the Global Settings page.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'Ss'}</td><td class="border px-4 py-2">It is NIGHT now. Sunset (sunset time), calculated daily based on the coordinates configured on the Global Settings page.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'C3'}</td><td class="border px-4 py-2">Insert the condition from cell C3. Works in a link condition and in actions after the ? sign. A reference inside a reference is allowed no deeper than two levels.</td></tr>
            </tbody>
          </table>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">How to join the words (signs)</h4>
          <table class="w-full mb-3 bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Sign</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Meaning</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Example and how to read it</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 font-semibold">${'&'}</td><td class="border px-4 py-2">AND (BOTH must be true)</td><td class="border px-4 py-2"><span class="font-semibold">${'D1&D2'}</span> - device 1 is on AND device 2 is on</td></tr>
              <tr><td class="border px-4 py-2 font-semibold">${'|'}</td><td class="border px-4 py-2">OR (ONE is enough)</td><td class="border px-4 py-2"><span class="font-semibold">${'D1|D2'}</span> - device 1 OR device 2 is on (or both)</td></tr>
              <tr><td class="border px-4 py-2 font-semibold">${'!'}</td><td class="border px-4 py-2">NOT (the opposite)</td><td class="border px-4 py-2"><span class="font-semibold">${'!D1'}</span> - device 1 is off; <span class="font-semibold">${'!(D1&D2)'}</span> - it is not true that both are on at once</td></tr>
              <tr><td class="border px-4 py-2 font-semibold">${'( )'}</td><td class="border px-4 py-2">Brackets - what to evaluate first</td><td class="border px-4 py-2"><span class="font-semibold">${'(D1|D2)&Ss'}</span> - (device 1 or device 2) AND night</td></tr>
              <tr><td class="border px-4 py-2 font-semibold">${'= > < g l'}</td><td class="border px-4 py-2">Equal, greater, less (g = greater or equal, l = less or equal, same as ${'>='} and ${'<='})</td><td class="border px-4 py-2"><span class="font-semibold">${'T5>25.5'}</span>, <span class="font-semibold">${'DV3=255'}</span>, <span class="font-semibold">${'DV3l100'}</span></td></tr>
            </tbody>
          </table>
          <p class="mb-3 text-slate-700">Tip: if you mix & and | in one condition, always use brackets. Then the result is exactly what you meant.</p>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Ready-made examples - just copy</h4>
          <table class="w-full mb-3 bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Condition</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">The link works only if...</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'D1'}</td><td class="border px-4 py-2">the device with ID 1 is on (the ID from the first table column): an output on a DEVICE pin, PWM with brightness above 0, or a Zigbee device. The old notation R1 also works</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'!D1'}</td><td class="border px-4 py-2">device 1 is off</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'D1&D2'}</td><td class="border px-4 py-2">both device 1 and device 2 are on</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'D1|D2'}</td><td class="border px-4 py-2">at least one of the two devices is on</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'D1&!D2'}</td><td class="border px-4 py-2">device 1 is on and device 2 is off</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'!D1&!D2'}</td><td class="border px-4 py-2">both devices are off</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'(D1|D2)&!D3'}</td><td class="border px-4 py-2">device 1 or 2 is on, and device 3 is off</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'Ss'}</td><td class="border px-4 py-2">it is night</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'Sr'}</td><td class="border px-4 py-2">it is daytime</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'Ss&B1'}</td><td class="border px-4 py-2">night and button 1 is pressed</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'Ss|D1'}</td><td class="border px-4 py-2">night OR device 1 is on</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'BU1'}</td><td class="border px-4 py-2">button 1 is not pressed</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'BH1'}</td><td class="border px-4 py-2">button 1 is being held</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'T5>25.5'}</td><td class="border px-4 py-2">sensor 5 reads above 25.5 degrees</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'T5<18'}</td><td class="border px-4 py-2">sensor 5 reads below 18 degrees</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'H4>50'}</td><td class="border px-4 py-2">humidity on sensor 4 is above 50 percent</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'H4<30'}</td><td class="border px-4 py-2">humidity on sensor 4 is below 30 percent</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'T5>25&H4>60&!D7'}</td><td class="border px-4 py-2">hot, humid and the fan (device 7) is not on yet</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'Sr&T5<20'}</td><td class="border px-4 py-2">daytime and cold</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'(T5>28|H4>70)&Sr'}</td><td class="border px-4 py-2">daytime, and it is hot or very humid</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'DV3>0'}</td><td class="border px-4 py-2">dimmer 3 is lit (value above zero)</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'DV3=255'}</td><td class="border px-4 py-2">dimmer 3 is exactly 255</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'DV3g100'}</td><td class="border px-4 py-2">dimmer 3 value is greater than or equal to 100</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'DV3l100'}</td><td class="border px-4 py-2">dimmer 3 value is less than or equal to 100</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'DV3>0&Ss'}</td><td class="border px-4 py-2">dimmer 3 is lit and it is night</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'D93'}</td><td class="border px-4 py-2">Zigbee device with ID 93 is on (Zigbee device IDs start from 89)</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'DV93g100'}</td><td class="border px-4 py-2">brightness of Zigbee device 93 is 100 or more</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'T5<25|D1'}</td><td class="border px-4 py-2">sensor 5 is below 25 OR device 1 is on (special case with a dead sensor - see the rules below)</td></tr>
            </tbody>
          </table>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Important rules</h4>
          <ul class="list-disc ml-6 mb-3 space-y-1">
            <li><b>The condition is checked at the moment of firing.</b> If the switch was pressed while the condition was NO, the link is skipped. When the condition later becomes YES, nothing turns on by itself: press the switch again.</li>
            <li><b>The link condition works</b> when the switch fires from the physical toggle, via API (switch?id=27&state=1), via MQTT or from a Zigbee switch.</li>
            <li><b>If the switch is called from an action</b> of a button, sensor, sunrise/sunset (for example 6:1, where 6 is a Switch pin), the condition from Connection is NOT checked in that case. Write the condition right in the action with the ? sign (see below).</li>
            <li><b>Direct control of a pin</b> (the On/Off slider of the relay itself, an MQTT/API command sent straight to the relay) does not check conditions.</li>
            <li><b>The master On/Off slider of the switch</b> is stronger than any condition: if it is off, the switch does not work at all.</li>
            <li><b>A dead sensor</b> gives the answer "unknown", and the action is blocked even if the condition starts with !. Exception: explicit truth through |. For example ${'T5<25|D1'} fires with a dead sensor 5 if device 1 is on.</li>
            <li><b>Limits:</b> 12 shared library cells plus 48 free expressions typed directly into links (identical ones are stored once). No more than 46 characters per condition. Only Latin letters, digits and the signs ( ) ! & | = ${'>'} ${'<'}, a dot and a minus sign (the minus only for a negative number to the right of a comparison sign) are allowed. If the entry is wrong, the firmware refuses to save it.</li>
            <li><b>One cell can be used by many links.</b> The label like "3 places" next to a cell in the panel shows how many places use it (identical conditions in links are stored once and count as one place). Editing a cell instantly changes the behavior of all those places, so before saving a cell that is in use the panel asks for confirmation.</li>
            <li><b>The "reset (0)" label</b> on a cell in the panel means it holds 0: this happens after deleting a device that was used in the condition. An empty cell also counts as NO. While the cell holds 0 or is empty, all links that refer to it are blocked. Write a correct condition in the panel again. In the table such a link is shown with a red badge "C1: empty" (or a yellow one if the empty cell is inside a compound condition).</li>
          </ul>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Condition right in the action: <span class="font-semibold">${'6:1?D2&!D3'}</span></h4>
          <p class="mb-2">In actions of buttons, sensors, timers, sunrise and sunset the condition is written right after the <b>?</b> sign, without spaces:</p>
          <p class="mb-2 font-semibold">${'pin:action?condition'}</p>
          <p class="mb-2">Action: <b>0</b> - turn off, <b>1</b> - turn on, <b>2</b> - toggle to the opposite. Several actions are separated by a comma, and each one can have its own condition.</p>
          <table class="w-full mb-3 bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Entry</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'6:1?D2&!D3'}</td><td class="border px-4 py-2">Turn on pin 6, but only if device 2 is on and device 3 is off.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'6:0?Sr'}</td><td class="border px-4 py-2">Turn off pin 6, only if it is daytime.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'6:2?T5>25.5'}</td><td class="border px-4 py-2">Toggle pin 6, only if sensor 5 reads above 25.5 degrees.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'6:1?Ss|B1'}</td><td class="border px-4 py-2">Turn on pin 6 at night or when button 1 is pressed.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'6:1?C3'}</td><td class="border px-4 py-2">Turn on pin 6, only if the condition from cell C3 (Conditions library panel under the table) is true.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'6:1?D2,7:0?!D2'}</td><td class="border px-4 py-2">Two actions at once: turn on pin 6 if device 2 is on; turn off pin 7 if device 2 is off.</td></tr>
              <tr><td class="border px-4 py-2 font-semibold whitespace-nowrap">${'6:1,7:0?D2'}</td><td class="border px-4 py-2">Turn on pin 6 always; turn off pin 7 only if device 2 is on.</td></tr>
            </tbody>
          </table>
        </div>
        </section>
        <section class="rounded-2xl border-2 bg-teal-50 border-teal-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">How many devices can be connected (Device connection)</h2>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Total limit: 1024 slots</h3>
          <p class="mb-2">Think of it as <b>1024 "slots" for connections</b> in the whole system. Every "switch - device" link (pin or Zigbee) takes one slot. The same device connected to three switches takes three slots.</p>
          <p class="mb-2"><b>There is no limit per switch.</b> The switch with id = 27 can have 1, 4 or 50 devices connected - as long as the total across the whole system does not exceed 1024.</p>
          <p class="mb-2"><b>Example:</b> if you have connected 57 devices in total on the "Switch(es) pin(s)" page, <b>967 free slots</b> are left (1024 − 57 = 967).</p>
        </div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Conditions do not take slots</h3>
          <p class="mb-2">A condition is stored inside the link itself: a link with a condition and a link without one take exactly the same single slot out of 1024.</p>
          <p class="mb-2">A separate, small limit applies to the number of different conditions: <b>12 shared cells</b> (the Conditions library panel) and <b>48 free expressions</b> typed directly into Switch, Encoder and PID links. Identical expressions are stored once. An expression nobody refers to any more is released automatically when the room is needed. The number of free expressions left is shown next to the Condition field. When they run out, the firmware refuses to save the link (error Condition pool is full): reuse an existing condition or delete unused links.</p>
        </div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">How to free a slot</h3>
          <ul class="list-disc ml-6 space-y-1">
            <li>The red <b>[x]</b> next to a connection removes the link and frees a slot.</li>
            <li>Deleting a switch or a device removes all links to it. Conditions that mentioned the deleted device become 0 and block the action until you write them again.</li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">When the slots run out</h3>
          <p class="mb-2">When all 1024 slots are used, a new connection will not be added: the device returns an error (No free slots in PinsLinks, limit 1024). Remove unused links first.</p>
        </div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">What else uses these slots</h3>
          <ul class="list-disc ml-6 space-y-1">
            <li>The <b>PWM connection</b> field on the Encoder pin page uses the same 1024 slots.</li>
            <li>After a reboot the device restores all saved connections by itself (from the pintopin.ini file) - they do not take any extra slots.</li>
          </ul>
        </div>
        </section>
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
        <td class="px-6 py-2 text-sm text-slate-800 font-medium">${isGpioPin(d.pins) ? d.pins : 'Z2M'}</td>
        <td class="px-6 py-2 text-sm text-slate-700">
          ${['None', 'GPIO_PULLUP', 'GPIO_PULLDOWN'][d.ptype]}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono">
          ${connectedPins.map(
            ({ pin, relayId, cond, cexpr }) => {
              const zigbee = !isGpioPin(pin);
              const cb = condBadgeProps(condInfo(cond, condsList, cexpr), language === 'ru');
              const label = zigbee ? `Z2M(${relayId})` : `${pin}(${relayId})`;
              const delKey = `${pin}(${relayId})`;
              return html`
              <span class="mr-2 inline-flex items-center">
                ${label}
                ${cb ? html`<span style=${cb.style} title=${cb.title}>${cb.label}</span>` : null}
                <button
                  onClick=${(e) => {
                    e.preventDefault();
                    onsave(d.id, delKey);
                  }}
                  class="ml-1 text-red-500 hover:text-red-700 transition-colors font-bold"
                  title="Remove connection"
                >
                  [x]
                </button>
              </span>
            `}
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
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col justify-start items-center" style="overflow-anchor:none;">
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
                <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700" style="max-height:70vh;overflow-y:auto;">
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
              onSwitchChange=${handleSwitchSaved}
              pintopin=${pintopin}
            />
          `}
      </div>
    </div>
  `;
}

export { TabSwitch };

