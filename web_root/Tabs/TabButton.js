import { ModalButton } from '../Modals/ModalButton.js';
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
      <div class="mytext space-y-6">
<div class="p-4 rounded-2xl bg-sky-50 border border-sky-300 text-sm"><h3 class="font-bold mb-2">Рубильник On/Off по SMS и DTMF</h3><p class="mb-2">Ползунок On/Off любой строки этой страницы можно переключить с телефона, номер которого указан в настройках SIM800L: SMS-сообщением или во время звонка (тональный набор DTMF). Формат команды одинаков на всех страницах: <b>ID#КОД*</b>, где ID - число из колонки ID нужной строки.</p><table class="w-full text-sm border-collapse my-2"><thead><tr><th class="border px-3 py-1 text-left">Действие</th><th class="border px-3 py-1 text-left">SMS</th><th class="border px-3 py-1 text-left">DTMF (во время звонка)</th></tr></thead><tbody><tr><td class="border px-3 py-1">Отключить строку (ползунок Off)</td><td class="border px-3 py-1"><code>5#00*</code></td><td class="border px-3 py-1"><code>5#00*#</code></td></tr><tr><td class="border px-3 py-1">Включить строку (ползунок On)</td><td class="border px-3 py-1"><code>5#11*</code></td><td class="border px-3 py-1"><code>5#11*#</code></td></tr></tbody></table><p class="mb-2">В таблице ID = 5 - это пример, подставьте ID своей строки.</p><p class="mb-2">Несколько команд подряд: <code>5#00*7#11*</code> (SMS) и <code>5#00*7#11*#</code> (звонок). Ввод во время звонка всегда завершается символами <code>*#</code>: последняя команда уже заканчивается на <code>*</code>, поэтому в конце добавляется только <code>#</code>.</p><p class="mb-2">Коды для всех страниц: Button, Switch, Encoder, OneWire, Security, Zigbee - <b>00</b> (выкл) и <b>11</b> (вкл); Cron - <b>33</b> и <b>44</b>; PID - <b>55</b> и <b>66</b>.</p><p class="mb-2">В ответ приходит SMS-отчёт, например <code>OnOff: Pin5=OFF</code> (отчёт отправляется, только если включён общий ползунок SIM800L). Неверные команды попадают в список Invld pins/cmd.</p><p class="mb-2">Не путайте: <code>ID#SC*</code>, <code>ID#DC*</code> и <code>ID#LP*</code> - это нажатие кнопки (клик, двойной клик, долгое нажатие), а <code>ID#00*</code> и <code>ID#11*</code> - ползунок On/Off. Пока ползунок Off, клики этой кнопки блокируются.</p></div>
        <div class="p-5 rounded-2xl bg-teal-50 border border-teal-300">
          <h2 class="text-xl font-bold mb-3">Как подключить кнопку (пошагово)</h2>
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

          <div class="mt-4 p-3 rounded-xl bg-white/80 border border-teal-200">
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
        </div>
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
                <td class="border px-4 py-2 whitespace-nowrap">Swarm/button/</td>
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
          <div class="mt-2 text-sm text-slate-500">
            Примечание: При желании, вы можете использовать цифровые команды (30#3*#, 30#4*#, 30#5*#) в том числе и в SMS-сообщениях.
          </div>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Сколько устройств можно подключить (SINGLE CLICK)</h2>
          <p class="mb-2">В поле SINGLE CLICK записывается, что произойдёт при <b>одном нажатии</b> на кнопку. Можно указать сразу несколько устройств через запятую — <b>примерно 25 штук</b>.</p>
          <p class="mb-2"><b>Пример:</b> запись <b>6:1,7:0,12:2</b> означает: включить устройство №6, выключить №7, переключить №12.</p>
          <div class="mt-2 text-sm text-slate-500">
            Примечания: (1) После двоеточия: 0 — выключить, 1 — включить, 2 — переключить на противоположное. (2) Записывать без пробелов. (3) Точный предел — 124 символа: до 31 устройства с однозначными номерами, до 25 с двузначными, до 20 с трёхзначными.
          </div>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Сколько устройств можно подключить (DOUBLE CLICK)</h2>
          <p class="mb-2">В поле DOUBLE CLICK записывается, что произойдёт при <b>двух быстрых нажатиях подряд</b>. Можно указать сразу несколько устройств через запятую — <b>примерно 25 штук</b>.</p>
          <p class="mb-2"><b>Пример:</b> запись <b>6:0,7:0,8:0,9:0</b> означает: выключить устройства №6, №7, №8 и №9.</p>
          <div class="mt-2 text-sm text-slate-500">
            Примечания: (1) После двоеточия: 0 — выключить, 1 — включить, 2 — переключить на противоположное. (2) Записывать без пробелов. (3) Точный предел — 124 символа: до 31 устройства с однозначными номерами, до 25 с двузначными, до 20 с трёхзначными.
          </div>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Сколько устройств можно подключить (LONG PRESS)</h2>
          <p class="mb-2">В поле LONG PRESS записывается, что произойдёт при <b>удержании</b> кнопки. Можно указать сразу несколько устройств через запятую — <b>примерно 25 штук</b>.</p>
          <p class="mb-2"><b>Пример:</b> запись <b>6:0,7:0,12:0,15:0</b> означает: «выключить всё»: устройства №6, №7, №12 и №15 выключатся одним долгим нажатием.</p>
          <div class="mt-2 text-sm text-slate-500">
            Примечания: (1) После двоеточия: 0 — выключить, 1 — включить, 2 — переключить на противоположное. (2) Записывать без пробелов. (3) Точный предел — 124 символа: до 31 устройства с однозначными номерами, до 25 с двузначными, до 20 с трёхзначными.
          </div>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Формат полей Action</h2>
          <p class="mb-2">Максимальное количество записей в формате <code>ID:Action</code> с разделителем <code>,</code> ограничено длиной строки — <b>124 символа</b>.</p>
          <p class="mb-2">Примеры записи: <code>6:1</code> (пин 6 → ON), <code>93:2</code> (пин 93 → TOGGLE), <code>93.1:0</code> (Zigbee слот 93, sub-action 1 → OFF).</p>
          <table class="w-full text-sm">
            <thead><tr><th class="border px-3 py-1">Длина ID</th><th class="border px-3 py-1">Пример</th><th class="border px-3 py-1">Байт на запись</th><th class="border px-3 py-1">Записей в строке</th></tr></thead>
            <tbody>
              <tr><td class="border px-3 py-1">1 знак</td><td class="border px-3 py-1"><code>5:1</code></td><td class="border px-3 py-1">3 + запятая = 4</td><td class="border px-3 py-1">до 31</td></tr>
              <tr><td class="border px-3 py-1">2 знака</td><td class="border px-3 py-1"><code>15:1</code></td><td class="border px-3 py-1">4 + запятая = 5</td><td class="border px-3 py-1">до 25</td></tr>
              <tr><td class="border px-3 py-1">3 знака</td><td class="border px-3 py-1"><code>155:1</code></td><td class="border px-3 py-1">5 + запятая = 6</td><td class="border px-3 py-1">до 20</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `,
    en: html`
      <div class="mytext space-y-6">
<div class="p-4 rounded-2xl bg-sky-50 border border-sky-300 text-sm"><h3 class="font-bold mb-2">On/Off switch by SMS and DTMF</h3><p class="mb-2">The On/Off slider of any row on this page can be switched from the phone number set in the SIM800L settings: by SMS or during a call (DTMF tones). The command format is the same on every page: <b>ID#CODE*</b>, where ID is the number from the ID column of the needed row.</p><table class="w-full text-sm border-collapse my-2"><thead><tr><th class="border px-3 py-1 text-left">Action</th><th class="border px-3 py-1 text-left">SMS</th><th class="border px-3 py-1 text-left">DTMF (during a call)</th></tr></thead><tbody><tr><td class="border px-3 py-1">Turn the row off (slider Off)</td><td class="border px-3 py-1"><code>5#00*</code></td><td class="border px-3 py-1"><code>5#00*#</code></td></tr><tr><td class="border px-3 py-1">Turn the row on (slider On)</td><td class="border px-3 py-1"><code>5#11*</code></td><td class="border px-3 py-1"><code>5#11*#</code></td></tr></tbody></table><p class="mb-2">In the table ID = 5 is an example, use the ID of your own row.</p><p class="mb-2">Several commands in a row: <code>5#00*7#11*</code> (SMS) and <code>5#00*7#11*#</code> (call). Input during a call always ends with <code>*#</code>: the last command already ends with <code>*</code>, so only <code>#</code> is added at the end.</p><p class="mb-2">Codes for all pages: Button, Switch, Encoder, OneWire, Security, Zigbee - <b>00</b> (off) and <b>11</b> (on); Cron - <b>33</b> and <b>44</b>; PID - <b>55</b> and <b>66</b>.</p><p class="mb-2">An SMS report is sent back, for example <code>OnOff: Pin5=OFF</code> (the report is sent only if the common SIM800L slider is On). Wrong commands are listed in Invld pins/cmd.</p><p class="mb-2">Do not confuse them: <code>ID#SC*</code>, <code>ID#DC*</code> and <code>ID#LP*</code> press the button (click, double click, long press), while <code>ID#00*</code> and <code>ID#11*</code> change the On/Off slider. While the slider is Off, clicks of this button are blocked.</p></div>
        <div class="p-5 rounded-2xl bg-teal-50 border border-teal-300">
          <h2 class="text-xl font-bold mb-3">How to connect a button (step by step)</h2>
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

          <div class="mt-4 p-3 rounded-xl bg-white/80 border border-teal-200">
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
        </div>
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
                <td class="border px-4 py-2 whitespace-nowrap">Swarm/button/</td>
                <td class="border px-4 py-2">
                  This page tracks changes in buttons and automatically sends each change via MQTT to the topic: Swarm/button/. Where "Swarm" is your 'TX topic'.
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
          <div class="mt-2 text-sm text-slate-500">
            Note: You can also use the digital commands (30#3*#, 30#4*#, 30#5*#) natively via SMS.
          </div>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">How many devices can be connected (SINGLE CLICK)</h2>
          <p class="mb-2">The SINGLE CLICK field defines what happens on <b>one press</b> of the button. You can list several devices at once, separated by commas — <b>about 25</b>.</p>
          <p class="mb-2"><b>Example:</b> <b>6:1,7:0,12:2</b> means: turn on device #6, turn off #7, toggle #12.</p>
          <div class="mt-2 text-sm text-slate-500">
            Notes: (1) After the colon: 0 — turn off, 1 — turn on, 2 — toggle to the opposite state. (2) Write without spaces. (3) The exact limit is 124 characters: up to 31 devices with one-digit numbers, up to 25 with two-digit numbers, up to 20 with three-digit numbers.
          </div>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">How many devices can be connected (DOUBLE CLICK)</h2>
          <p class="mb-2">The DOUBLE CLICK field defines what happens on <b>two quick presses in a row</b>. You can list several devices at once, separated by commas — <b>about 25</b>.</p>
          <p class="mb-2"><b>Example:</b> <b>6:0,7:0,8:0,9:0</b> means: turn off devices #6, #7, #8 and #9.</p>
          <div class="mt-2 text-sm text-slate-500">
            Notes: (1) After the colon: 0 — turn off, 1 — turn on, 2 — toggle to the opposite state. (2) Write without spaces. (3) The exact limit is 124 characters: up to 31 devices with one-digit numbers, up to 25 with two-digit numbers, up to 20 with three-digit numbers.
          </div>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">How many devices can be connected (LONG PRESS)</h2>
          <p class="mb-2">The LONG PRESS field defines what happens on <b>holding</b> the button. You can list several devices at once, separated by commas — <b>about 25</b>.</p>
          <p class="mb-2"><b>Example:</b> <b>6:0,7:0,12:0,15:0</b> means: "turn everything off": devices #6, #7, #12 and #15 turn off with one long press.</p>
          <div class="mt-2 text-sm text-slate-500">
            Notes: (1) After the colon: 0 — turn off, 1 — turn on, 2 — toggle to the opposite state. (2) Write without spaces. (3) The exact limit is 124 characters: up to 31 devices with one-digit numbers, up to 25 with two-digit numbers, up to 20 with three-digit numbers.
          </div>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Action Field Format</h2>
          <p class="mb-2">Maximum number of entries in <code>ID:Action</code> format with <code>,</code> separator is limited by string length — <b>124 characters</b>.</p>
          <p class="mb-2">Entry examples: <code>6:1</code> (pin 6 → ON), <code>93:2</code> (pin 93 → TOGGLE), <code>93.1:0</code> (Zigbee slot 93, sub-action 1 → OFF).</p>
          <table class="w-full text-sm">
            <thead><tr><th class="border px-3 py-1">ID Length</th><th class="border px-3 py-1">Example</th><th class="border px-3 py-1">Bytes per entry</th><th class="border px-3 py-1">Entries in string</th></tr></thead>
            <tbody>
              <tr><td class="border px-3 py-1">1 digit</td><td class="border px-3 py-1"><code>5:1</code></td><td class="border px-3 py-1">3 + comma = 4</td><td class="border px-3 py-1">up to 31</td></tr>
              <tr><td class="border px-3 py-1">2 digits</td><td class="border px-3 py-1"><code>15:1</code></td><td class="border px-3 py-1">4 + comma = 5</td><td class="border px-3 py-1">up to 25</td></tr>
              <tr><td class="border px-3 py-1">3 digits</td><td class="border px-3 py-1"><code>155:1</code></td><td class="border px-3 py-1">5 + comma = 6</td><td class="border px-3 py-1">up to 20</td></tr>
            </tbody>
          </table>
        </div>
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
          title="Edit Button pin"
          selectedButton=${selectedButton}
          onButtonChange=${handleButtonSaved}
        />
      `}
  `;
};

export { TabButton };