import { lockToggle } from '../helpLock.js';
import { ModalButton } from '../Modals/ModalButton.js';
import { h, render, useState, useEffect, useRef, useContext, html, Router } from '../bundle.js';
import { registerPoll, unregisterPoll } from '../pollQueue.js';
import { StateContext } from '../context.js';
import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';
import { MyPolzunok, Chart, DeveloperNote } from '../main.js';
import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire } from '../rulang.js';
import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire } from '../enlang.js';
import { condHelpTitle } from '../condlib.js';

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

  // Touch screens: tap on an element with a tooltip shows it, tap elsewhere hides it
  document.addEventListener('click', e => {
    if (!window.matchMedia('(pointer: coarse)').matches) return;
    const el = e.target.closest('[data-tip]');
    if (el) show(el); else hide();
  });
}
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Чистые функции и компоненты вынесены ЗА пределы TabButton, чтобы React не
// пересоздавал DOM всей таблицы при каждом обновлении состояния (опросе).
// ---------------------------------------------------------------------------
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

const getTooltipText = (language, index) => {
  const langbutton = language === 'ru' ? rulangbutton : enlangbutton;
  const tooltipText = langbutton && langbutton[index] ? langbutton[index] : '';
  return formatText(tooltipText);
};

// Заголовок таблицы с tooltip через data-tip (портал в body)
const Th = ({ title, tooltipIndex, language }) => html`
  <th
    class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
    data-tip=${getTooltipText(language, tooltipIndex)}
  >
    ${title}
  </th>
`;

const ArrayButton = ({ d, index, onToggle, onEdit }) => {
  const displayId = d.display_id || d.id;

  return html`
    <tr class="${index % 2 === 1 ? 'bg-white/80' : 'bg-sky-200/40'} hover:bg-slate-200/80 transition-colors">
      <td class="px-6 py-2 text-sm text-slate-800">${displayId}</td>
      <td class="px-6 py-2 text-sm text-slate-800 font-medium">${d.is_zigbee ? 'Z2M' : d.pins}</td>
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
          onChange=${(value) => onToggle({ ...d, onoff: value })}
        />
      </td>
      <td class="px-6 py-2 text-sm">
        <button
          onClick=${() => onEdit('edit', d)}
          class="text-blue-600 hover:text-blue-800 font-semibold transition-colors ml-2"
        >
          Edit
        </button>
      </td>
    </tr>
  `;
};
// ---------------------------------------------------------------------------

const TabButton = () => {
  const [varbutton, setButton] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [language, setLanguage] = useState('ru');
  const isPendingOnOff = useRef(false);
  // Инициализируем глобальный tooltip один раз при монтировании
  useEffect(() => { initGlobalTooltip(); }, []);

  const helpContent = {
    ru: html`
      <div class="mytext space-y-6 font-sans text-base leading-relaxed text-slate-700 [&_code]:font-sans [&_code]:font-semibold [&_pre]:font-sans">
        <section class="rounded-2xl border-2 bg-indigo-50 border-indigo-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Как подключить кнопку (пошагово)</h2>

          <ol class="list-decimal ml-6 space-y-3">
            <li>
              <b>Выберите пин.</b> Откройте страницу <b>"Select pin(s)"</b>, найдите нужный пин
              (например, <b>PA15</b>), выберите для него режим <b>"BUTTON"</b> и нажмите <b>"Submit"</b>. После этого пин сам появится в таблице на этой странице.
            </li>
            <li>
              <b>Выберите подтяжку</b> (столбец "Pullup type"), нажав <b>Edit</b>:
              <ul class="list-disc ml-6 mt-1">
                <li><b>GPIO_PULLUP</b> — если при нажатии кнопка соединяет пин с <b>землёй (GND)</b>. Это самый частый вариант.</li>
                <li><b>GPIO_PULLDOWN</b> — если при нажатии кнопка соединяет пин с <b>плюсом питания (3.3V)</b>.</li>
              </ul>
              Не уверены — начните с GPIO_PULLUP. Если кнопка срабатывает сама или не срабатывает вообще, попробуйте другой вариант.
            </li>
            <li>
              <b>Скажите, что делать.</b> В полях <b>SINGLE CLICK</b> (одно нажатие), <b>DOUBLE CLICK</b>
              (два быстрых нажатия) и <b>LONG PRESS</b> (удержание) впишите, каким устройством управлять.
              Пишется так: <b>ID устройства, двоеточие, команда</b>. Без пробелов!
              <ul class="list-disc ml-6 mt-1">
                <li><b>1</b> — включить</li>
                <li><b>0</b> — выключить</li>
                <li><b>2</b> — переключить (было выключено — включится, было включено — выключится; это TOGGLE)</li>
              </ul>
            </li>
            <li>
              <b>Включите ползунок On/Off</b> в строке кнопки. Если он выключен, кнопка будет проигнорирована.
            </li>
            <li>
              <b>Проверьте:</b> нажмите физическую кнопку — устройство должно сработать.
            </li>
          </ol>

          <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300">
            <b>Как это работает:</b> кнопка распознаёт три жеста: одно нажатие (SINGLE CLICK), два быстрых нажатия подряд (DOUBLE CLICK)
            и удержание (LONG PRESS). На каждый жест можно повесить своё действие или оставить поле пустым. Дребезг контактов прошивка отсеивает сама.
          </div>

          <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300">
            <b>Важно:</b> в полях действий пишется <b>ID устройства, которым вы хотите управлять</b>
            (светодиод, реле, Zigbee-устройство), а <b>не</b> ID самой кнопки.
          </div>

          <div class="mt-4">
            <b>Пример.</b> Кнопка подключена к пину <b>PA15</b>. На плате есть светодиоды:
            <ul class="list-disc ml-6 mt-1">
              <li><b>ID = 6</b> — зелёный светодиод</li>
              <li><b>ID = 12</b> — синий светодиод</li>
              <li><b>ID = 18</b> — красный светодиод</li>
            </ul>
            <div class="mt-2">Хотим, чтобы:</div>
            <ul class="list-disc ml-6 mt-1">
              <li>одно нажатие — переключало зелёный светодиод: в SINGLE CLICK пишем <code>6:2</code></li>
              <li>двойное нажатие — включало синий светодиод: в DOUBLE CLICK пишем <code>12:1</code></li>
              <li>долгое нажатие — выключало все три светодиода: в LONG PRESS пишем <code>6:0,12:0,18:0</code></li>
            </ul>
            Чтобы управлять несколькими устройствами сразу, перечислите их через запятую:
            <code>6:1,12:1,18:0</code> (включить зелёный и синий, выключить красный).
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Управление по SMS и DTMF</h2>
<div><h4 class="text-lg font-bold text-black mt-4 mb-2">Рубильник On/Off по SMS и DTMF</h4><p class="mb-2">Ползунок On/Off любой строки этой страницы можно переключить с телефона, номер которого указан в настройках SIM800L: SMS-сообщением или во время звонка (тональный набор DTMF). Формат команды одинаков на всех страницах: <b>ID#КОД*</b>, где ID - число из колонки ID нужной строки.</p><table class="w-full border-collapse my-2 bg-white/70"><thead><tr><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">Действие</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">SMS</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">DTMF (во время звонка)</th></tr></thead><tbody><tr><td class="border px-3 py-1">Отключить строку (ползунок Off)</td><td class="border px-3 py-1"><code>5#00*</code></td><td class="border px-3 py-1"><code>5#00*#</code></td></tr><tr><td class="border px-3 py-1">Включить строку (ползунок On)</td><td class="border px-3 py-1"><code>5#11*</code></td><td class="border px-3 py-1"><code>5#11*#</code></td></tr></tbody></table><p class="mb-2">В таблице ID = 5 - это пример, подставьте ID своей строки.</p><p class="mb-2">Несколько команд подряд: <code>5#00*7#11*</code> (SMS) и <code>5#00*7#11*#</code> (звонок). Ввод во время звонка всегда завершается символами <code>*#</code>: последняя команда уже заканчивается на <code>*</code>, поэтому в конце добавляется только <code>#</code>.</p><p class="mb-2">Коды для всех страниц: Button, Switch, Encoder, OneWire, Security, Zigbee - <b>00</b> (выкл) и <b>11</b> (вкл); Cron - <b>33</b> и <b>44</b>; PID - <b>55</b> и <b>66</b>.</p><p class="mb-2">В ответ приходит SMS-отчёт, например <code>OnOff: Pin5=OFF</code> (отчёт отправляется, только если включён общий ползунок SIM800L). Неверные команды попадают в список Invld pins/cmd.</p><p class="mb-2">Не путайте: <code>ID#SC*</code>, <code>ID#DC*</code> и <code>ID#LP*</code> - это нажатие кнопки (клик, двойной клик, долгое нажатие), а <code>ID#00*</code> и <code>ID#11*</code> - ползунок On/Off. Пока ползунок Off, клики этой кнопки блокируются.</p></div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Примеры SMS и DTMF команд</h3>
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Источник</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Команда</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">SMS</td>
                <td class="border px-4 py-2">30#SC*#</td>
                <td class="border px-4 py-2">Выполняет действие, прописанное в SINGLE CLICK для кнопки с id = 30.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">SMS</td>
                <td class="border px-4 py-2">30#DC*#</td>
                <td class="border px-4 py-2">Выполняет действие, прописанное в DOUBLE CLICK для кнопки с id = 30.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">SMS</td>
                <td class="border px-4 py-2">30#LP*#</td>
                <td class="border px-4 py-2">Выполняет действие, прописанное в LONG PRESS для кнопки с id = 30.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">DTMF (Звонок)</td>
                <td class="border px-4 py-2">30#3*#</td>
                <td class="border px-4 py-2">Аналог 30#SC*#. Выполняет SINGLE CLICK. (в тональном режиме букв нет)</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">DTMF (Звонок)</td>
                <td class="border px-4 py-2">30#4*#</td>
                <td class="border px-4 py-2">Аналог 30#DC*#. Выполняет DOUBLE CLICK.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">DTMF (Звонок)</td>
                <td class="border px-4 py-2">30#5*#</td>
                <td class="border px-4 py-2">Аналог 30#LP*#. Выполняет LONG PRESS.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">SMS</td>
                <td class="border px-4 py-2">30#SC*31#DC*#</td>
                <td class="border px-4 py-2">Можно группировать несколько команд в одну! В конце строки обязательно нужно добавить символ <b>#</b>, чтобы закрыть команду.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Ответ</td>
                <td class="border px-4 py-2">DISABLED</td>
                <td class="border px-4 py-2">Если Главный рубильник (On/Off) на этой странице выключен, то команда будет проигнорирована, а в ответном SMS придет сообщение <b>30:DISABLED</b>, а не дефолтное действие.</td>
              </tr>
            </tbody>
          </table>
          <div class="mt-2 text-slate-700">
            Примечание: При желании, вы можете использовать цифровые команды (30#3*#, 30#4*#, 30#5*#) в том числе и в SMS-сообщениях.
          </div>
        </div>
        </section>
        <section class="rounded-2xl border-2 bg-emerald-50 border-emerald-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Управление по API (локальная сеть)</h2>
        <div>
          <p class="mb-1">Данный API позволяет дистанционно управлять кнопкой, просто выполнив команду в браузере любого устройства в вашей локальной сети.</p>
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
        </section>
        <section class="rounded-2xl border-2 bg-violet-50 border-violet-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">MQTT: управление и отслеживание</h2>
        <div>
          <p class="mb-1">MQTT позволяет дистанционно управлять кнопкой из интернета!</p>
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
                <td class="border px-4 py-2">Zagotovka/button/id=30/single_click</td>
                <td class="border px-4 py-2">
                  Данная MQTT команда выполнит команду, прописанную в 'SINGLE CLICK' c id = 30. Где "Zagotovka" это Ваш 'RX topic'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Zagotovka/button/id=30/double_click</td>
                <td class="border px-4 py-2">
                  Данная MQTT команда выполнит команду, прописанную в 'DOUBLE CLICK' c id = 30. Где "Zagotovka" это Ваш 'RX topic'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Zagotovka/button/id=30/long_press</td>
                <td class="border px-4 py-2">
                  Данная MQTT команда выполнит команду, прописанную в 'LONG PRESS' c id = 30. Где "Zagotovka" это Ваш 'RX topic'.
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
                <td class="border px-4 py-2 whitespace-nowrap">Swarm/button/</td>
                <td class="border px-4 py-2">
                  Данная страница отслеживает изменения кнопок и автоматически отправляет каждое изменение по MQTT на топик: Swarm/button/.
                  Где "Swarm" это Ваш 'TX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </section>
        <section class="rounded-2xl border-2 bg-teal-50 border-teal-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Поля действий: SINGLE CLICK, DOUBLE CLICK, LONG PRESS</h2>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Сколько устройств можно подключить (SINGLE CLICK)</h3>
          <p class="mb-2">В поле SINGLE CLICK записывается, что произойдёт при <b>одном нажатии</b> на кнопку. Можно указать сразу несколько устройств через запятую — <b>примерно 25 штук</b>.</p>
          <p class="mb-2"><b>Пример:</b> запись <b>6:1,7:0,12:2</b> означает: включить устройство №6, выключить №7, переключить №12.</p>
          <div class="mt-2 text-slate-700">
            Примечания: (1) После двоеточия: 0 — выключить, 1 — включить, 2 — переключить на противоположное. (2) Записывать без пробелов. (3) Точный предел — 124 символа вместе с условиями после знака ? (цифры ниже верны для записей без условий): до 31 устройства с однозначными номерами, до 25 с двузначными, до 20 с трёхзначными.
          </div>
        </div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Сколько устройств можно подключить (DOUBLE CLICK)</h3>
          <p class="mb-2">В поле DOUBLE CLICK записывается, что произойдёт при <b>двух быстрых нажатиях подряд</b>. Можно указать сразу несколько устройств через запятую — <b>примерно 25 штук</b>.</p>
          <p class="mb-2"><b>Пример:</b> запись <b>6:0,7:0,8:0,9:0</b> означает: выключить устройства №6, №7, №8 и №9.</p>
          <div class="mt-2 text-slate-700">
            Примечания: (1) После двоеточия: 0 — выключить, 1 — включить, 2 — переключить на противоположное. (2) Записывать без пробелов. (3) Точный предел — 124 символа вместе с условиями после знака ? (цифры ниже верны для записей без условий): до 31 устройства с однозначными номерами, до 25 с двузначными, до 20 с трёхзначными.
          </div>
        </div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Сколько устройств можно подключить (LONG PRESS)</h3>
          <p class="mb-2">В поле LONG PRESS записывается, что произойдёт при <b>удержании</b> кнопки. Можно указать сразу несколько устройств через запятую — <b>примерно 25 штук</b>.</p>
          <p class="mb-2"><b>Пример:</b> запись <b>6:0,7:0,12:0,15:0</b> означает: «выключить всё»: устройства №6, №7, №12 и №15 выключатся одним долгим нажатием.</p>
          <div class="mt-2 text-slate-700">
            Примечания: (1) После двоеточия: 0 — выключить, 1 — включить, 2 — переключить на противоположное. (2) Записывать без пробелов. (3) Точный предел — 124 символа вместе с условиями после знака ? (цифры ниже верны для записей без условий): до 31 устройства с однозначными номерами, до 25 с двузначными, до 20 с трёхзначными.
          </div>
        </div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Формат полей Action</h3>
          <p class="mb-2">Максимальное количество записей в формате <code>ID:Action</code> с разделителем <code>,</code> ограничено длиной строки — <b>124 символа</b> (вместе с условиями после знака ?).</p>
          <p class="mb-2">Примеры записи: <code>6:1</code> (пин 6 → ON), <code>93:2</code> (пин 93 → TOGGLE), <code>93.1:0</code> (Zigbee слот 93, sub-action 1 → OFF).</p>
          <table class="w-full bg-white/70">
            <thead><tr><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">Длина ID</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">Пример</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">Байт на запись</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">Записей в строке</th></tr></thead>
            <tbody>
              <tr><td class="border px-3 py-1">1 знак</td><td class="border px-3 py-1"><code>5:1</code></td><td class="border px-3 py-1">3 + запятая = 4</td><td class="border px-3 py-1">до 31</td></tr>
              <tr><td class="border px-3 py-1">2 знака</td><td class="border px-3 py-1"><code>15:1</code></td><td class="border px-3 py-1">4 + запятая = 5</td><td class="border px-3 py-1">до 25</td></tr>
              <tr><td class="border px-3 py-1">3 знака</td><td class="border px-3 py-1"><code>155:1</code></td><td class="border px-3 py-1">5 + запятая = 6</td><td class="border px-3 py-1">до 20</td></tr>
            </tbody>
          </table>
        </div>
        </section>
        <section class="rounded-2xl border-2 bg-amber-50 border-amber-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">${condHelpTitle(true)}</h2>
        <div class="space-y-3">
          <p class="text-slate-600 italic mb-2">Нажми кнопку, но сделай только если...</p>
          <p class="mb-2">Условие - это «замок» на одном действии в полях <b>SINGLE CLICK</b>, <b>DOUBLE CLICK</b> и <b>LONG PRESS</b>. Когда вы нажимаете кнопку, прошивка проверяет условие каждого действия отдельно. Если условие верно (ДА) - действие выполняется. Если неверно (НЕТ) - это действие молча пропускается, а остальные действия в той же строке выполняются как обычно. Если условия нет - действие выполняется всегда.</p>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Как записать условие: три шага</h4>
          <ol class="list-decimal ml-6 mb-3 space-y-1">
            <li>Запишите действие как обычно: <code>${'6:1'}</code> (пин 6, включить).</li>
            <li>Сразу после него, <b>без пробелов</b>, поставьте знак <b>?</b>: <code>${'6:1?'}</code></li>
            <li>Допишите условие: <code>${'6:1?D2&!D3'}</code>. Читаем так: «включить пин 6, но только если устройство 2 включено и устройство 3 выключено».</li>
          </ol>
          <p class="mb-3">Общий вид: <code>${'ID:команда?условие'}</code>. Команда: <b>0</b> - выключить, <b>1</b> - включить, <b>2</b> - переключить на противоположное. Несколько действий пишутся через запятую, и у каждого может быть своё условие или не быть никакого.</p>

          <div class="p-4 rounded-xl bg-white/80 border border-amber-300 mb-3">
            <p class="text-lg font-bold text-black mb-1">Пример из жизни: малыш и кнопка обогревателя</p>
            <p class="mb-1">Малыш обожает нажимать все кнопки подряд. Кнопка обогревателя в гостиной - не исключение, а на улице +30. Перегрев? Только не в этом доме.</p>
            <p class="mb-1">Спокойно! В поле SINGLE CLICK пишем <code>${'9:1?T5<18'}</code>: обогреватель (устройство 9) включится, только если датчик 5 показывает ниже 18 градусов.</p>
            <p class="mb-1">Результат: в жару нажатие тихо игнорируется, в холод обогреватель включается. Условие проверяется в момент нажатия.</p>
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
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'D5'}</code></td><td class="border px-4 py-2">Устройство (пин DEVICE) с ID 5 сейчас ВКЛючено. Для Zigbee-устройства - оно включено.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'!D5'}</code></td><td class="border px-4 py-2">Пин с ID 5 сейчас ВЫКЛючен (знак ! означает «НЕ»).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3>0'}</code></td><td class="border px-4 py-2">Диммер (ШИМ) с ID 3: значение больше нуля, то есть светит. Для Zigbee - яркость устройства.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3=255'}</code></td><td class="border px-4 py-2">Значение диммера 3 ровно 255.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3g100'}</code></td><td class="border px-4 py-2">Значение диммера 3 БОЛЬШЕ ИЛИ РАВНО 100 (буква g - «greater», то же, что ${'>='}).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3l100'}</code></td><td class="border px-4 py-2">Значение диммера 3 МЕНЬШЕ ИЛИ РАВНО 100 (буква l - «less», то же, что ${'<='}).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'B1'}</code></td><td class="border px-4 py-2">Кнопка с ID 1 сейчас нажата.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'BU1'}</code></td><td class="border px-4 py-2">Кнопка с ID 1 сейчас НЕ нажата.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'BH1'}</code></td><td class="border px-4 py-2">Кнопка с ID 1 сейчас удерживается (долгое нажатие).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5>25.5'}</code></td><td class="border px-4 py-2">Температура датчика 5 больше 25.5 градусов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5<10'}</code></td><td class="border px-4 py-2">Температура датчика 5 меньше 10 градусов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'H4>50'}</code></td><td class="border px-4 py-2">Влажность датчика 4 больше 50 процентов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'H4<30'}</code></td><td class="border px-4 py-2">Влажность датчика 4 меньше 30 процентов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Sr'}</code></td><td class="border px-4 py-2">Sunrise (время восхода), ежедневно рассчитывается по координатам на странице «Global Settings».</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Ss'}</code></td><td class="border px-4 py-2">Sunset (время заката), ежедневно рассчитывается по координатам на странице «Global Settings».</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'C3'}</code></td><td class="border px-4 py-2">Подставить готовое условие из ячейки C3 (ячейки хранятся на странице «Global Settings», строка Conditions). Вложенность - не глубже двух уровней.</td></tr>
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
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'= > < g l'}</code></td><td class="border px-4 py-2">Равно, больше, меньше (g = больше или равно, l = меньше или равно, то же, что ${'>='} и ${'<='})</td><td class="border px-4 py-2"><code>${'T5>25.5'}</code>, <code>${'DV3=255'}</code>, <code>${'DV3l100'}</code></td></tr>
            </tbody>
          </table>
          <p class="mb-3 text-slate-700">Совет: если в одном условии смешиваете & и |, всегда ставьте скобки. Так результат будет именно тот, который вы задумали.</p>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Готовые примеры - просто скопируйте в нужное поле</h4>
          <table class="w-full mb-3 bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что вписать в поле</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что произойдёт</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D2'}</code></td><td class="border px-4 py-2">Включить пин 6, только если устройство 2 включено.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?!D2'}</code></td><td class="border px-4 py-2">Включить пин 6, только если устройство 2 выключено.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:2?D1&D2'}</code></td><td class="border px-4 py-2">Переключить пин 6, только если включены и устройство 1, и устройство 2.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D1|D2'}</code></td><td class="border px-4 py-2">Включить пин 6, если включено хотя бы одно из устройств 1 и 2.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D1&!D2'}</code></td><td class="border px-4 py-2">Включить пин 6, если устройство 1 включено, а устройство 2 выключено.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:0?!D1&!D2'}</code></td><td class="border px-4 py-2">Выключить пин 6, только если оба устройства выключены.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?(D1|D2)&!D3'}</code></td><td class="border px-4 py-2">Включить пин 6, если включено устройство 1 или 2 и при этом устройство 3 выключено.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:2?Ss'}</code></td><td class="border px-4 py-2">Переключить пин 6 по условию заката (Ss).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?Sr'}</code></td><td class="border px-4 py-2">Включить пин 6 по условию восхода (Sr).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?Ss&B1'}</code></td><td class="border px-4 py-2">Включить пин 6, если выполнено условие заката (Ss) и нажата кнопка 1.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?Ss|D1'}</code></td><td class="border px-4 py-2">Включить пин 6, если выполнено условие заката (Ss) ИЛИ включено устройство 1.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?BU1'}</code></td><td class="border px-4 py-2">Включить пин 6, только если кнопка 1 не нажата.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?BH1'}</code></td><td class="border px-4 py-2">Включить пин 6, только если кнопка 1 удерживается.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5>25.5'}</code></td><td class="border px-4 py-2">Включить пин 6, если на датчике 5 жарче 25.5 градусов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5<18'}</code></td><td class="border px-4 py-2">Включить пин 6, если на датчике 5 холоднее 18 градусов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?H4>50'}</code></td><td class="border px-4 py-2">Включить пин 6, если влажность на датчике 4 выше 50 процентов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?H4<30'}</code></td><td class="border px-4 py-2">Включить пин 6, если влажность на датчике 4 ниже 30 процентов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5>25&H4>60&!D7'}</code></td><td class="border px-4 py-2">Включить пин 6, если жарко, влажно и вентилятор (устройство 7) ещё не включён.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:0?Sr&T5<20'}</code></td><td class="border px-4 py-2">Выключить пин 6, если выполнено условие восхода (Sr) и при этом холодно.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?(T5>28|H4>70)&Sr'}</code></td><td class="border px-4 py-2">Включить пин 6, если выполнено условие восхода (Sr) и при этом жарко или очень влажно.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3>0'}</code></td><td class="border px-4 py-2">Включить пин 6, только если диммер 3 светит (значение больше нуля).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3=255'}</code></td><td class="border px-4 py-2">Включить пин 6, только если диммер 3 ровно на 255.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3g100'}</code></td><td class="border px-4 py-2">Включить пин 6, только если значение диммера 3 больше или равно 100.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3l100'}</code></td><td class="border px-4 py-2">Включить пин 6, только если значение диммера 3 меньше или равно 100.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3>0&Ss'}</code></td><td class="border px-4 py-2">Включить пин 6, если диммер 3 светит и выполнено условие заката (Ss).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D93'}</code></td><td class="border px-4 py-2">Включить пин 6, только если Zigbee-устройство с ID 93 включено (ID Zigbee-устройств начинаются с 89).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV93g100'}</code></td><td class="border px-4 py-2">Включить пин 6, только если яркость Zigbee-устройства 93 не меньше 100.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'93.1:2?D2'}</code></td><td class="border px-4 py-2">Zigbee: слот 93, sub-action 1, переключить - только если устройство 2 включено.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5<25|D1'}</code></td><td class="border px-4 py-2">Включить пин 6, если на датчике 5 ниже 25 градусов ИЛИ включено устройство 1 (особый случай при неисправном датчике - см. правила ниже).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?C3'}</code></td><td class="border px-4 py-2">Включить пин 6, только если верно готовое условие из ячейки C3.</td></tr>
            </tbody>
          </table>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Несколько действий в одном поле</h4>
          <table class="w-full mb-3 bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что вписать в поле</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что произойдёт</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D2,7:0?!D2'}</code></td><td class="border px-4 py-2">Два действия сразу: пин 6 включить, если устройство 2 включено; пин 7 выключить, если устройство 2 выключено.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1,7:0?D2'}</code></td><td class="border px-4 py-2">Пин 6 включить всегда; пин 7 выключить только если устройство 2 включено.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:2?D1,12:2?!D1,18:0'}</code></td><td class="border px-4 py-2">Три действия: пин 6 переключить, если устройство 1 включено; пин 12 переключить, если устройство 1 выключено; пин 18 выключить всегда.</td></tr>
            </tbody>
          </table>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Важные правила</h4>
          <ul class="list-disc ml-6 mb-3 space-y-1">
            <li><b>Условие проверяется в момент нажатия</b> и для каждого поля отдельно (одно нажатие, двойное, долгое). Если в момент нажатия было НЕТ - действие пропущено. Когда условие потом станет ДА, само по себе ничего не произойдёт: нужно нажать кнопку ещё раз.</li>
            <li><b>Условие работает</b> и при нажатии физической кнопки, и когда «нажатие» приходит по API или MQTT.</li>
            <li><b>Главный ползунок On/Off в строке кнопки</b> сильнее любого условия: если он выключен, кнопка игнорируется целиком.</li>
            <li><b>Если в действии указан выключатель</b> (пин со страницы Switch pin), он передаст команду своим устройствам, а условие из его поля Connection в этом случае не проверяется. Пишите условие прямо в действии кнопки, через знак ?.</li>
            <li><b>Прямое управление устройством</b> (ползунок On/Off у самого реле, команда API или MQTT прямо на реле) условия не проверяет.</li>
            <li><b>Неисправный датчик</b> даёт ответ «неизвестно», и действие блокируется, даже если перед условием стоит !. Исключение: явная правда через |. Например <code>${'6:1?T5<25|D1'}</code> сработает при неисправном датчике 5, если устройство 1 включено.</li>
            <li><b>Длина поля - 124 символа вместе с условиями.</b> Чем длиннее условия, тем меньше действий поместится. Если условие длинное и нужно в нескольких местах, запишите его один раз в ячейку на странице «Global Settings» (строка Conditions, 12 ячеек) и пишите в действии коротко: <code>${'6:1?C3'}</code>.</li>
            <li><b>Допустимые символы в условии:</b> латинские буквы, цифры и знаки ( ) ! & | = ${'>'} ${'<'}, точка и минус (минус только для отрицательного числа справа от знака сравнения). Пробелы не допускаются. Если запись неверна, под полем появится красное сообщение, и сохранить строку не получится.</li>
            <li><b>Жёлтое предупреждение под полем</b> обычно значит, что действие ссылается на ячейку Conditions, которая была сброшена в 0 (например, после удаления устройства). Такое действие заблокировано, пока в ячейке снова не будет верное условие.</li>
            <li><b>Одну ячейку можно использовать во многих местах.</b> Число рядом с ячейкой на странице «Global Settings» показывает, сколько мест её используют. Правка ячейки сразу меняет поведение всех этих мест.</li>
          </ul>
        </div>
        </section>
        <section class="rounded-2xl border-2 bg-rose-50 border-rose-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Примеры из жизни: что на самом деле умеет эта страница</h2>
          <p class="mb-2">Четыре истории о том, как одна кнопка превращается в пульт управления домом.</p>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Руки заняты, а свет горит везде</p>
            <p class="mb-1">Утро, вы опаздываете. В одной руке чемодан, в другой пакет с завтраком, ключи уже в двери. И тут понимаете: свет горит во всех комнатах. Возвращаться - потерять десять минут и нервы.</p>
            <p class="mb-1">Спокойно! В поле LONG PRESS кнопки у двери записано <code>${'6:0,12:0,18:0,93:0'}</code> (три лампы и Zigbee-лампа 93). Удержали кнопку локтем - и Zagotovka-M гасит всё сразу. Пакет не уронили.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Одна кнопка у кровати - три сценария</p>
            <p class="mb-1">Вы почти уснули, и тут вспоминаете: лампа ещё горит, а вставать совсем не хочется.</p>
            <p class="mb-1">Спокойно! Кнопка у кровати знает три жеста. SINGLE CLICK <code>${'6:2'}</code> - переключает лампу. DOUBLE CLICK <code>${'12:1,6:0'}</code> - гасит лампу и включает мягкий ночник. LONG PRESS <code>${'6:0,12:0,18:0'}</code> - гасит всё. Один палец, три сценария.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Звонит сосед: «У вас во всех окнах свет!»</p>
            <p class="mb-1">Вы в отпуске за тысячу километров. Звонит сосед: «У вас в каждом окне горит свет, всё в порядке?» Сердце ёкает...</p>
            <p class="mb-1">Спокойно! Отправьте SMS <code>${'30#LP*#'}</code> (с номера, указанного в настройках SIM800L), где 30 - кнопка у двери. Zagotovka-M выполнит её LONG PRESS, «выключить всё», как будто вы держите кнопку в прихожей. То же умеют API (long_press) и MQTT.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Бабушка стесняется звать на помощь</p>
            <p class="mb-1">Бабушка живёт одна и не хочет вас беспокоить. А вам по ночам не спится: вдруг ей станет плохо?</p>
            <p class="mb-1">Спокойно! Поставьте кнопку у её кровати. Долгое нажатие (LONG PRESS <code>${'6:1'}</code>) включает свет в коридоре, а Zagotovka-M сама отправляет событие кнопки по MQTT в топик <b>Swarm/button/</b> (где Swarm - ваш 'TX topic'). Подключите топик к серверу умного дома или MQTT-приложению на телефоне - и вы узнаете о нажатии сразу, даже из другого города.</p>
          </div>
        </section>
      </div>
    `,
    en: html`
      <div class="mytext space-y-6 font-sans text-base leading-relaxed text-slate-700 [&_code]:font-sans [&_code]:font-semibold [&_pre]:font-sans">
        <section class="rounded-2xl border-2 bg-indigo-50 border-indigo-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">How to connect a button (step by step)</h2>

          <ol class="list-decimal ml-6 space-y-3">
            <li>
              <b>Choose a pin.</b> Open the <b>"Select pin(s)"</b> page, find the pin you need
              (for example, <b>PA15</b>), set its mode to <b>"BUTTON"</b> and press <b>"Submit"</b>. After that the pin appears in the table on this page by itself.
            </li>
            <li>
              <b>Choose the pull type</b> ("Pullup type" column) by pressing <b>Edit</b>:
              <ul class="list-disc ml-6 mt-1">
                <li><b>GPIO_PULLUP</b> — if pressing the button connects the pin to <b>ground (GND)</b>. This is the most common case.</li>
                <li><b>GPIO_PULLDOWN</b> — if pressing the button connects the pin to <b>the supply voltage (3.3V)</b>.</li>
              </ul>
              Not sure? Start with GPIO_PULLUP. If the button triggers by itself or does not trigger at all, try the other option.
            </li>
            <li>
              <b>Tell it what to do.</b> In the <b>SINGLE CLICK</b> (one press), <b>DOUBLE CLICK</b>
              (two quick presses) and <b>LONG PRESS</b> (hold) fields, write which device to control.
              Format: <b>device ID, colon, command</b>. No spaces!
              <ul class="list-disc ml-6 mt-1">
                <li><b>1</b> — turn on</li>
                <li><b>0</b> — turn off</li>
                <li><b>2</b> — toggle (if it was off it turns on, if it was on it turns off; this is TOGGLE)</li>
              </ul>
            </li>
            <li>
              <b>Turn on the On/Off slider</b> in the button's row. If it is off, the button is ignored.
            </li>
            <li>
              <b>Test it:</b> press the physical button — the device should react.
            </li>
          </ol>

          <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300">
            <b>How it works:</b> the button recognizes three gestures: a single press (SINGLE CLICK), two quick presses in a row (DOUBLE CLICK)
            and a hold (LONG PRESS). Each gesture can have its own action, or the field can stay empty. The firmware filters out contact bounce by itself.
          </div>

          <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300">
            <b>Important:</b> the action fields take the <b>ID of the device you want to control</b>
            (LED, relay, Zigbee device), <b>not</b> the ID of the button itself.
          </div>

          <div class="mt-4">
            <b>Example.</b> A button is connected to pin <b>PA15</b>. The board has these LEDs:
            <ul class="list-disc ml-6 mt-1">
              <li><b>ID = 6</b> — green LED</li>
              <li><b>ID = 12</b> — blue LED</li>
              <li><b>ID = 18</b> — red LED</li>
            </ul>
            <div class="mt-2">We want:</div>
            <ul class="list-disc ml-6 mt-1">
              <li>one press to toggle the green LED: in SINGLE CLICK write <code>6:2</code></li>
              <li>a double press to turn the blue LED on: in DOUBLE CLICK write <code>12:1</code></li>
              <li>a long press to turn all three LEDs off: in LONG PRESS write <code>6:0,12:0,18:0</code></li>
            </ul>
            To control several devices at once, list them separated by commas:
            <code>6:1,12:1,18:0</code> (turn on green and blue, turn off red).
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Control by SMS and DTMF</h2>
<div><h4 class="text-lg font-bold text-black mt-4 mb-2">On/Off switch by SMS and DTMF</h4><p class="mb-2">The On/Off slider of any row on this page can be switched from the phone number set in the SIM800L settings: by SMS or during a call (DTMF tones). The command format is the same on every page: <b>ID#CODE*</b>, where ID is the number from the ID column of the needed row.</p><table class="w-full border-collapse my-2 bg-white/70"><thead><tr><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">Action</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">SMS</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">DTMF (during a call)</th></tr></thead><tbody><tr><td class="border px-3 py-1">Turn the row off (slider Off)</td><td class="border px-3 py-1"><code>5#00*</code></td><td class="border px-3 py-1"><code>5#00*#</code></td></tr><tr><td class="border px-3 py-1">Turn the row on (slider On)</td><td class="border px-3 py-1"><code>5#11*</code></td><td class="border px-3 py-1"><code>5#11*#</code></td></tr></tbody></table><p class="mb-2">In the table ID = 5 is an example, use the ID of your own row.</p><p class="mb-2">Several commands in a row: <code>5#00*7#11*</code> (SMS) and <code>5#00*7#11*#</code> (call). Input during a call always ends with <code>*#</code>: the last command already ends with <code>*</code>, so only <code>#</code> is added at the end.</p><p class="mb-2">Codes for all pages: Button, Switch, Encoder, OneWire, Security, Zigbee - <b>00</b> (off) and <b>11</b> (on); Cron - <b>33</b> and <b>44</b>; PID - <b>55</b> and <b>66</b>.</p><p class="mb-2">An SMS report is sent back, for example <code>OnOff: Pin5=OFF</code> (the report is sent only if the common SIM800L slider is On). Wrong commands are listed in Invld pins/cmd.</p><p class="mb-2">Do not confuse them: <code>ID#SC*</code>, <code>ID#DC*</code> and <code>ID#LP*</code> press the button (click, double click, long press), while <code>ID#00*</code> and <code>ID#11*</code> change the On/Off slider. While the slider is Off, clicks of this button are blocked.</p></div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">SMS & DTMF Command Examples</h3>
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Source</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Command</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">SMS</td>
                <td class="border px-4 py-2">30#SC*#</td>
                <td class="border px-4 py-2">Executes the action specified in SINGLE CLICK for button with id = 30.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">SMS</td>
                <td class="border px-4 py-2">30#DC*#</td>
                <td class="border px-4 py-2">Executes the action specified in DOUBLE CLICK for button with id = 30.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">SMS</td>
                <td class="border px-4 py-2">30#LP*#</td>
                <td class="border px-4 py-2">Executes the action specified in LONG PRESS for button with id = 30.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">DTMF (Call)</td>
                <td class="border px-4 py-2">30#3*#</td>
                <td class="border px-4 py-2">Same as 30#SC*#. Executes SINGLE CLICK. (since letters are unavailable in DTMF)</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">DTMF (Call)</td>
                <td class="border px-4 py-2">30#4*#</td>
                <td class="border px-4 py-2">Same as 30#DC*#. Executes DOUBLE CLICK.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">DTMF (Call)</td>
                <td class="border px-4 py-2">30#5*#</td>
                <td class="border px-4 py-2">Same as 30#LP*#. Executes LONG PRESS.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">SMS</td>
                <td class="border px-4 py-2">30#SC*31#DC*#</td>
                <td class="border px-4 py-2">You can chain multiple commands! You must append the <b>#</b> symbol at the very end of the string.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Response</td>
                <td class="border px-4 py-2">DISABLED</td>
                <td class="border px-4 py-2">If the master On/Off switch on this page is off, the command is ignored and the reply SMS says <b>30:DISABLED</b> instead of the default action.</td>
              </tr>
            </tbody>
          </table>
          <div class="mt-2 text-slate-700">
            Note: You can also use the digital commands (30#3*#, 30#4*#, 30#5*#) natively via SMS.
          </div>
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
                <td class="border px-4 py-2">Zagotovka/button/id=30/single_click</td>
                <td class="border px-4 py-2">
                  This MQTT command will execute the command specified in 'SINGLE CLICK' with id = 30. Where "Zagotovka" is your 'RX topic'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Zagotovka/button/id=30/double_click</td>
                <td class="border px-4 py-2">
                  This MQTT command will execute the command specified in 'DOUBLE CLICK' with id = 30. Where "Zagotovka" is your 'RX topic'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Zagotovka/button/id=30/long_press</td>
                <td class="border px-4 py-2">
                  This MQTT command will execute the command specified in 'LONG PRESS' with id = 30. Where "Zagotovka" is your 'RX topic'.
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
                <td class="border px-4 py-2 whitespace-nowrap">Swarm/button/</td>
                <td class="border px-4 py-2">
                  This page tracks changes in buttons and automatically sends each change via MQTT to the topic: Swarm/button/. Where "Swarm" is your 'TX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </section>
        <section class="rounded-2xl border-2 bg-teal-50 border-teal-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Action fields: SINGLE CLICK, DOUBLE CLICK, LONG PRESS</h2>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">How many devices can be connected (SINGLE CLICK)</h3>
          <p class="mb-2">The SINGLE CLICK field defines what happens on <b>one press</b> of the button. You can list several devices at once, separated by commas — <b>about 25</b>.</p>
          <p class="mb-2"><b>Example:</b> <b>6:1,7:0,12:2</b> means: turn on device #6, turn off #7, toggle #12.</p>
          <div class="mt-2 text-slate-700">
            Notes: (1) After the colon: 0 — turn off, 1 — turn on, 2 — toggle to the opposite state. (2) Write without spaces. (3) The exact limit is 124 characters including conditions after the ? sign (the numbers below are for entries without conditions): up to 31 devices with one-digit numbers, up to 25 with two-digit numbers, up to 20 with three-digit numbers.
          </div>
        </div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">How many devices can be connected (DOUBLE CLICK)</h3>
          <p class="mb-2">The DOUBLE CLICK field defines what happens on <b>two quick presses in a row</b>. You can list several devices at once, separated by commas — <b>about 25</b>.</p>
          <p class="mb-2"><b>Example:</b> <b>6:0,7:0,8:0,9:0</b> means: turn off devices #6, #7, #8 and #9.</p>
          <div class="mt-2 text-slate-700">
            Notes: (1) After the colon: 0 — turn off, 1 — turn on, 2 — toggle to the opposite state. (2) Write without spaces. (3) The exact limit is 124 characters including conditions after the ? sign (the numbers below are for entries without conditions): up to 31 devices with one-digit numbers, up to 25 with two-digit numbers, up to 20 with three-digit numbers.
          </div>
        </div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">How many devices can be connected (LONG PRESS)</h3>
          <p class="mb-2">The LONG PRESS field defines what happens on <b>holding</b> the button. You can list several devices at once, separated by commas — <b>about 25</b>.</p>
          <p class="mb-2"><b>Example:</b> <b>6:0,7:0,12:0,15:0</b> means: "turn everything off": devices #6, #7, #12 and #15 turn off with one long press.</p>
          <div class="mt-2 text-slate-700">
            Notes: (1) After the colon: 0 — turn off, 1 — turn on, 2 — toggle to the opposite state. (2) Write without spaces. (3) The exact limit is 124 characters including conditions after the ? sign (the numbers below are for entries without conditions): up to 31 devices with one-digit numbers, up to 25 with two-digit numbers, up to 20 with three-digit numbers.
          </div>
        </div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Action Field Format</h3>
          <p class="mb-2">Maximum number of entries in <code>ID:Action</code> format with <code>,</code> separator is limited by string length — <b>124 characters</b> (including conditions after the ? sign).</p>
          <p class="mb-2">Entry examples: <code>6:1</code> (pin 6 → ON), <code>93:2</code> (pin 93 → TOGGLE), <code>93.1:0</code> (Zigbee slot 93, sub-action 1 → OFF).</p>
          <table class="w-full bg-white/70">
            <thead><tr><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">ID Length</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">Example</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">Bytes per entry</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">Entries in string</th></tr></thead>
            <tbody>
              <tr><td class="border px-3 py-1">1 digit</td><td class="border px-3 py-1"><code>5:1</code></td><td class="border px-3 py-1">3 + comma = 4</td><td class="border px-3 py-1">up to 31</td></tr>
              <tr><td class="border px-3 py-1">2 digits</td><td class="border px-3 py-1"><code>15:1</code></td><td class="border px-3 py-1">4 + comma = 5</td><td class="border px-3 py-1">up to 25</td></tr>
              <tr><td class="border px-3 py-1">3 digits</td><td class="border px-3 py-1"><code>155:1</code></td><td class="border px-3 py-1">5 + comma = 6</td><td class="border px-3 py-1">up to 20</td></tr>
            </tbody>
          </table>
        </div>
        </section>
        <section class="rounded-2xl border-2 bg-amber-50 border-amber-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">${condHelpTitle(false)}</h2>
        <div class="space-y-3">
          <p class="text-slate-600 italic mb-2">Press the button, but act only if...</p>
          <p class="mb-2">A condition is a "lock" on a single action in the <b>SINGLE CLICK</b>, <b>DOUBLE CLICK</b> and <b>LONG PRESS</b> fields. When you press the button, the firmware checks the condition of each action separately. If the condition is true (YES), the action is executed. If it is false (NO), that action is silently skipped, and the other actions in the same field run as usual. If there is no condition, the action always runs.</p>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">How to write a condition: three steps</h4>
          <ol class="list-decimal ml-6 mb-3 space-y-1">
            <li>Write the action as usual: <code>${'6:1'}</code> (pin 6, turn on).</li>
            <li>Right after it, <b>without spaces</b>, put the <b>?</b> sign: <code>${'6:1?'}</code></li>
            <li>Add the condition: <code>${'6:1?D2&!D3'}</code>. Read it as: "turn on pin 6, but only if device 2 is on and device 3 is off".</li>
          </ol>
          <p class="mb-3">General form: <code>${'ID:command?condition'}</code>. Command: <b>0</b> - turn off, <b>1</b> - turn on, <b>2</b> - toggle to the opposite. Several actions are separated by commas, and each one may have its own condition or none at all.</p>

          <div class="p-4 rounded-xl bg-white/80 border border-amber-300 mb-3">
            <p class="text-lg font-bold text-black mb-1">Real-life example: a toddler and the heater button</p>
            <p class="mb-1">A toddler loves pressing every button. The heater button in the living room is no exception, and it is +30 outside. Overheating? Not in this house.</p>
            <p class="mb-1">Calm down! In the SINGLE CLICK field type <code>${'9:1?T5<18'}</code>: the heater (device 9) turns on only if sensor 5 shows below 18 degrees.</p>
            <p class="mb-1">Result: in the heat the press is quietly ignored, in the cold the heater turns on. The condition is checked at the moment of the press.</p>
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
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'D5'}</code></td><td class="border px-4 py-2">The device (DEVICE pin) with ID 5 is ON now. For a Zigbee device - it is on.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'!D5'}</code></td><td class="border px-4 py-2">The pin with ID 5 is OFF now (the ! sign means "NOT").</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3>0'}</code></td><td class="border px-4 py-2">Dimmer (PWM) with ID 3: value above zero, that is, it is lit. For Zigbee - device brightness.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3=255'}</code></td><td class="border px-4 py-2">Dimmer 3 value is exactly 255.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3g100'}</code></td><td class="border px-4 py-2">Dimmer 3 value is GREATER THAN OR EQUAL TO 100 (letter g = "greater", same as ${'>='}).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3l100'}</code></td><td class="border px-4 py-2">Dimmer 3 value is LESS THAN OR EQUAL TO 100 (letter l = "less", same as ${'<='}).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'B1'}</code></td><td class="border px-4 py-2">Button with ID 1 is pressed now.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'BU1'}</code></td><td class="border px-4 py-2">Button with ID 1 is NOT pressed now.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'BH1'}</code></td><td class="border px-4 py-2">Button with ID 1 is being held (long press).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5>25.5'}</code></td><td class="border px-4 py-2">Temperature of sensor 5 is above 25.5 degrees.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5<10'}</code></td><td class="border px-4 py-2">Temperature of sensor 5 is below 10 degrees.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'H4>50'}</code></td><td class="border px-4 py-2">Humidity of sensor 4 is above 50 percent.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'H4<30'}</code></td><td class="border px-4 py-2">Humidity of sensor 4 is below 30 percent.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Sr'}</code></td><td class="border px-4 py-2">Sunrise (time of sunrise), calculated daily from the coordinates set on the "Global Settings" page.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Ss'}</code></td><td class="border px-4 py-2">Sunset (time of sunset), calculated daily from the coordinates set on the "Global Settings" page.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'C3'}</code></td><td class="border px-4 py-2">Insert the ready-made condition from cell C3 (cells are stored on the "Global Settings" page, Conditions row). Nesting no deeper than two levels.</td></tr>
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
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'&'}</code></td><td class="border px-4 py-2">AND (BOTH must be true)</td><td class="border px-4 py-2"><code>${'D1&D2'}</code> - device 1 is on AND device 2 is on</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'|'}</code></td><td class="border px-4 py-2">OR (ONE is enough)</td><td class="border px-4 py-2"><code>${'D1|D2'}</code> - device 1 OR device 2 is on (or both)</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'!'}</code></td><td class="border px-4 py-2">NOT (the opposite)</td><td class="border px-4 py-2"><code>${'!D1'}</code> - device 1 is off; <code>${'!(D1&D2)'}</code> - it is not true that both are on at once</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'( )'}</code></td><td class="border px-4 py-2">Brackets - what to evaluate first</td><td class="border px-4 py-2"><code>${'(D1|D2)&!D3'}</code> - (device 1 or device 2) AND device 3 is off</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'= > < g l'}</code></td><td class="border px-4 py-2">Equal, greater, less (g = greater or equal, l = less or equal, same as ${'>='} and ${'<='})</td><td class="border px-4 py-2"><code>${'T5>25.5'}</code>, <code>${'DV3=255'}</code>, <code>${'DV3l100'}</code></td></tr>
            </tbody>
          </table>
          <p class="mb-3 text-slate-700">Tip: if you mix & and | in one condition, always use brackets. Then the result is exactly what you meant.</p>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Ready-made examples - just copy into the needed field</h4>
          <table class="w-full mb-3 bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What to type in the field</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What happens</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D2'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if device 2 is on.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?!D2'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if device 2 is off.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:2?D1&D2'}</code></td><td class="border px-4 py-2">Toggle pin 6 only if both device 1 and device 2 are on.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D1|D2'}</code></td><td class="border px-4 py-2">Turn on pin 6 if at least one of devices 1 and 2 is on.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D1&!D2'}</code></td><td class="border px-4 py-2">Turn on pin 6 if device 1 is on and device 2 is off.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:0?!D1&!D2'}</code></td><td class="border px-4 py-2">Turn off pin 6 only if both devices are off.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?(D1|D2)&!D3'}</code></td><td class="border px-4 py-2">Turn on pin 6 if device 1 or 2 is on and device 3 is off.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:2?Ss'}</code></td><td class="border px-4 py-2">Toggle pin 6 on the sunset condition (Ss).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?Sr'}</code></td><td class="border px-4 py-2">Turn on pin 6 on the sunrise condition (Sr).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?Ss&B1'}</code></td><td class="border px-4 py-2">Turn on pin 6 if the sunset condition (Ss) is met and button 1 is pressed.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?Ss|D1'}</code></td><td class="border px-4 py-2">Turn on pin 6 if the sunset condition (Ss) is met OR device 1 is on.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?BU1'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if button 1 is not pressed.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?BH1'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if button 1 is being held.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5>25.5'}</code></td><td class="border px-4 py-2">Turn on pin 6 if sensor 5 reads above 25.5 degrees.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5<18'}</code></td><td class="border px-4 py-2">Turn on pin 6 if sensor 5 reads below 18 degrees.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?H4>50'}</code></td><td class="border px-4 py-2">Turn on pin 6 if humidity on sensor 4 is above 50 percent.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?H4<30'}</code></td><td class="border px-4 py-2">Turn on pin 6 if humidity on sensor 4 is below 30 percent.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5>25&H4>60&!D7'}</code></td><td class="border px-4 py-2">Turn on pin 6 if it is hot, humid and the fan (device 7) is not on yet.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:0?Sr&T5<20'}</code></td><td class="border px-4 py-2">Turn off pin 6 if the sunrise condition (Sr) is met and it is cold.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?(T5>28|H4>70)&Sr'}</code></td><td class="border px-4 py-2">Turn on pin 6 if the sunrise condition (Sr) is met and it is hot or very humid.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3>0'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if dimmer 3 is lit (value above zero).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3=255'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if dimmer 3 is exactly 255.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3g100'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if dimmer 3 value is greater than or equal to 100.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3l100'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if dimmer 3 value is less than or equal to 100.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3>0&Ss'}</code></td><td class="border px-4 py-2">Turn on pin 6 if dimmer 3 is lit and the sunset condition (Ss) is met.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D93'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if the Zigbee device with ID 93 is on (Zigbee device IDs start from 89).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV93g100'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if the brightness of Zigbee device 93 is 100 or more.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'93.1:2?D2'}</code></td><td class="border px-4 py-2">Zigbee: slot 93, sub-action 1, toggle - only if device 2 is on.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5<25|D1'}</code></td><td class="border px-4 py-2">Turn on pin 6 if sensor 5 is below 25 degrees OR device 1 is on (special case with a dead sensor - see the rules below).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?C3'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if the ready-made condition from cell C3 is true.</td></tr>
            </tbody>
          </table>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Several actions in one field</h4>
          <table class="w-full mb-3 bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What to type in the field</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What happens</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D2,7:0?!D2'}</code></td><td class="border px-4 py-2">Two actions at once: turn on pin 6 if device 2 is on; turn off pin 7 if device 2 is off.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1,7:0?D2'}</code></td><td class="border px-4 py-2">Turn on pin 6 always; turn off pin 7 only if device 2 is on.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:2?D1,12:2?!D1,18:0'}</code></td><td class="border px-4 py-2">Three actions: toggle pin 6 if device 1 is on; toggle pin 12 if device 1 is off; turn off pin 18 always.</td></tr>
            </tbody>
          </table>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Important rules</h4>
          <ul class="list-disc ml-6 mb-3 space-y-1">
            <li><b>The condition is checked at the moment of the press</b>, separately for each field (single click, double click, long press). If it was NO at the moment of the press, the action is skipped. When the condition later becomes YES, nothing happens by itself: press the button again.</li>
            <li><b>The condition works</b> both for a press of the physical button and when the "press" comes via API or MQTT.</li>
            <li><b>The master On/Off slider in the button row</b> is stronger than any condition: if it is off, the button is ignored entirely.</li>
            <li><b>If an action points to a switch</b> (a pin from the Switch pin page), it passes the command to its devices, and the condition from its Connection field is NOT checked in that case. Write the condition right in the button action, with the ? sign.</li>
            <li><b>Direct control of a device</b> (the On/Off slider of the relay itself, an API or MQTT command sent straight to the relay) does not check conditions.</li>
            <li><b>A dead sensor</b> gives the answer "unknown", and the action is blocked even if the condition starts with !. Exception: explicit truth through |. For example <code>${'6:1?T5<25|D1'}</code> fires with a dead sensor 5 if device 1 is on.</li>
            <li><b>The field length is 124 characters including the conditions.</b> The longer the conditions, the fewer actions fit. If a condition is long and needed in several places, write it once into a cell on the "Global Settings" page (Conditions row, 12 cells) and use it in the action in short form: <code>${'6:1?C3'}</code>.</li>
            <li><b>Allowed characters in a condition:</b> Latin letters, digits and the signs ( ) ! & | = ${'>'} ${'<'}, a dot and a minus sign (the minus only for a negative number to the right of a comparison sign). Spaces are not allowed. If the entry is wrong, a red message appears under the field and the row cannot be saved.</li>
            <li><b>A yellow warning under the field</b> usually means that the action refers to a Conditions cell that was reset to 0 (for example, after a device was deleted). Such an action is blocked until the cell holds a correct condition again.</li>
            <li><b>One cell can be used in many places.</b> The number next to a cell on the "Global Settings" page shows how many places use it. Editing a cell instantly changes the behavior of all those places.</li>
          </ul>
        </div>
        </section>
        <section class="rounded-2xl border-2 bg-rose-50 border-rose-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Real-life examples: what this page can really do</h2>
          <p class="mb-2">Four stories about how one button turns into a remote control for your home.</p>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Hands full, and the lights are on everywhere</p>
            <p class="mb-1">Morning, you are late. A suitcase in one hand, a bag with breakfast in the other, the keys already in the door. And then you realize: the lights are on in every room. Going back means losing ten minutes and your nerves.</p>
            <p class="mb-1">Calm down! The LONG PRESS field of the button by the door contains <code>${'6:0,12:0,18:0,93:0'}</code> (three lamps and the Zigbee lamp 93). Hold the button with your elbow - and Zagotovka-M turns everything off at once. The bag stays in your hand.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">One bedside button - three scenarios</p>
            <p class="mb-1">You are almost asleep, and then you remember: the lamp is still on, and you really do not want to get up.</p>
            <p class="mb-1">Calm down! The bedside button knows three gestures. SINGLE CLICK <code>${'6:2'}</code> toggles the lamp. DOUBLE CLICK <code>${'12:1,6:0'}</code> turns the lamp off and a soft night light on. LONG PRESS <code>${'6:0,12:0,18:0'}</code> turns everything off. One finger, three scenarios.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">The neighbor calls: "Every window of yours is lit!"</p>
            <p class="mb-1">You are on vacation a thousand kilometers away. The neighbor calls: "The lights are on in every window of your house, is everything all right?" Your heart skips a beat...</p>
            <p class="mb-1">Calm down! Send an SMS <code>${'30#LP*#'}</code> (from the number set in the SIM800L settings), where 30 is the button by the door. Zagotovka-M runs its LONG PRESS, "turn everything off", as if you were holding the button in your hallway. API (long_press) and MQTT can do the same.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Grandma is too shy to ask for help</p>
            <p class="mb-1">Grandma lives alone and does not want to bother you. And you cannot sleep at night: what if she feels unwell?</p>
            <p class="mb-1">Calm down! Put a button by her bed. A long press (LONG PRESS <code>${'6:1'}</code>) turns on the hallway light, and Zagotovka-M itself sends the button event via MQTT to the topic <b>Swarm/button/</b> (where Swarm is your 'TX topic'). Connect the topic to a smart-home server or an MQTT app on your phone - and you learn about the press right away, even from another city.</p>
          </div>
        </section>
      </div>
    `,
  };

  useEffect(() => {
    let active = true;

    // ── Загрузка + polling через pollQueue (одно соединение, без нового handshake) ──
    registerPoll('buttons', '/api/state/button', (data) => {
      if (!active) return;
      if (isPendingOnOff.current) return;
      if (data !== null && data !== undefined && data.buttons) {
        setButton(data.buttons);
        setLanguage(data.lang);
      }
    }, { immediate: true });

    return () => {
      active = false;
      unregisterPoll('buttons');
    };
  }, []);

  const openModal = (type, buttonData) => {
    setModalType(type);
    setSelectedButton(buttonData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedButton(null);
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

    isPendingOnOff.current = true;

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
      })
      .finally(() => {
        setTimeout(() => {
          isPendingOnOff.current = false;
        }, 1500);
      });

    closeModal();
  };

  // Сохранение из модалки "Edit Button pin": /api/button/set уже записал
  // info/sclick/dclick/lpress. /api/onoff/set нужен ТОЛЬКО если On/Off
  // реально переключён в модалке: parse_onoff_json() для Zigbee-кнопки
  // выполняет vbtn_execute() (sclick), т.е. Save "нажимал" кнопку, а для
  // физического — выставлял ШИМ-выходам dvalue. Ползунок в таблице
  // по-прежнему использует handleButtonChange.
  const handleButtonSaved = (updatedButton) => {
    console.log('handleButtonSaved:', updatedButton);
    if (updatedButton.onoff !== selectedButton?.onoff) {
      handleButtonChange(updatedButton);
    } else {
      setButton((prevButtons) =>
        prevButtons.map((button) =>
          button.id === updatedButton.id
            ? { ...button, ...updatedButton }
            : button
        )
      );
      closeModal();
    }
  };

  if (!varbutton) return '';

  return html`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col justify-start items-center" style="overflow-anchor:none;">
      <!-- Decorative background glow -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-2 drop-shadow-sm tracking-tight uppercase">
          Button(s) pin(s)
        </div>
        <p class="text-sm text-slate-600 mb-6 max-w-3xl">${language === 'ru' ? 'Утро, вы опаздываете, руки заняты — одно долгое нажатие кнопки, и весь дом выключен! А вечером двойное нажатие встретит вас светом и теплом. Три жеста одной кнопки — три сценария вашей жизни!' : 'Morning, you are late, your hands are full - one long press of a button and the whole house is off! In the evening a double press greets you with light and warmth. Three gestures of one button - three scenarios of your life!'}</p>

        <div class="flex-grow flex flex-col justify-center items-center w-full">
          <div class="w-full">
            <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6 overflow-auto">
              <div class="overflow-x-auto w-full">
                <table class="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <${Th} title="ID" tooltipIndex=${1} language=${language} />
                      <${Th} title="Pin" tooltipIndex=${2} language=${language} />
                      <${Th} title="Pullup type" tooltipIndex=${3} language=${language} />
                      <${Th} title="SINGLE CLICK" tooltipIndex=${4} language=${language} />
                      <${Th} title="DOUBLE CLICK" tooltipIndex=${5} language=${language} />
                      <${Th} title="LONG PRESS" tooltipIndex=${6} language=${language} />
                      <${Th} title="INFO" tooltipIndex=${7} language=${language} />
                      <${Th} title="On/Off" tooltipIndex=${8} language=${language} />
                      <${Th} title="Action" tooltipIndex=${9} language=${language} />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/40">
                    ${varbutton.map(
                      (d, index) => html`<${ArrayButton}
                        d=${d}
                        index=${index}
                        key=${d.id}
                        onToggle=${handleButtonChange}
                        onEdit=${openModal}
                      />`
                    )}
                  </tbody>
                </table>
              </div>
            </div>

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
      </div>
    </div>

    ${isModalOpen &&
      html`
        <${ModalButton}
          modalType=${modalType}
          page="TabButton"
          hideModal=${closeModal}
          title="Edit Button pin"
          selectedButton=${selectedButton}
          onButtonChange=${handleButtonSaved}
        />
      `}
  `;
};

export { TabButton };