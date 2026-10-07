import { lockToggle } from '../helpLock.js';


import { ModalEditSensor } from '../Modals/ModalEditSensor.js';
import { ModalOneWire } from '../Modals/ModalOneWire.js';
import { h, render, useState, useEffect, useRef, useContext, html, Router } from '../bundle.js';
import { registerPoll, unregisterPoll } from '../pollQueue.js';
import { StateContext } from '../context.js';
import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';
import { MyPolzunok, Chart, DeveloperNote } from '../main.js';
import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire } from '../rulang.js';
import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire } from '../enlang.js';
import { condHelpTitle } from '../condlib.js';

// ---------------------------------------------------------------------------
// Глобальный tooltip-хелпер
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
// Action helpers
// ---------------------------------------------------------------------------
const _stateLabel = (s) => s === '1' ? 'ON' : s === '0' ? 'OFF' : s === '2' ? 'TG' : (s ?? '?');
const _stateColor = (s) => s === '1' ? '#16a34a' : s === '0' ? '#dc2626' : s === '2' ? '#d97706' : '#64748b';
const _parseAction = (str) => {
  if (!str) return [];
  return str.split(',').map(p => {
    const [pin, state] = p.trim().split(':');
    return { pin: pin?.trim(), state: state?.trim() };
  }).filter(x => x.pin !== undefined && x.pin !== '');
};

const ActionBadge = ({ isUpper, isHumid, value, unit, str }) => {
  const parts = _parseAction(str);
  const arrow = (isHumid ? 'H ' : '') + (isUpper ? '↑' : '↓');
  const borderColor = isUpper ? '#fdba74' : '#93c5fd';
  const bg = isUpper ? '#fff7ed' : '#eff6ff';
  const labelColor = isUpper ? '#9a3412' : '#1e3a5f';
  return html`
    <span style="display:inline-flex;align-items:center;gap:4px;background:${bg};border:1.5px solid ${borderColor};border-radius:10px;padding:3px 10px;font-size:12px;font-weight:600;white-space:nowrap;line-height:1.6;">
      <span style="color:${labelColor};margin-right:2px;">${arrow} ${value ?? '—'}${unit}:</span>
      ${parts.length === 0
        ? html`<span style="color:#94a3b8;">[—]</span>`
        : html`
          <span style="color:#475569;">[</span>
          ${parts.map(({ pin, state }, i) => html`
            <span>
              <span style="color:#94a3b8;font-weight:400;">id</span><span style="color:#334155;font-weight:700;">${pin}</span><span style="color:#475569;">:</span><span style="color:${_stateColor(state)};font-weight:700;">${_stateLabel(state)}</span>${i < parts.length - 1 ? html`<span style="color:#94a3b8;">,${' '}</span>` : ''}
            </span>
          `)}
          <span style="color:#475569;">]</span>
        `}
    </span>
  `;
};

// ---------------------------------------------------------------------------
// Help Content (с таблицами отслеживания изменений)
// ---------------------------------------------------------------------------
const HELP_CONTENT = {
  ru: html`
<div class="mytext space-y-6 font-sans text-base leading-relaxed text-slate-700 [&_code]:font-sans [&_code]:font-semibold [&_pre]:font-sans">
<section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
<h2 class="text-xl font-bold text-black">Управление по SMS и DTMF</h2>
<div>
<h3 class="text-lg font-bold text-black mb-2">Рубильник On/Off по SMS и DTMF</h3>
<p class="mb-2">Ползунок On/Off любой строки этой страницы можно переключить с телефона, номер которого указан в настройках SIM800L: SMS-сообщением или во время звонка (тональный набор DTMF). Формат команды одинаков на всех страницах: <b>ID#КОД*</b>, где ID - число из колонки ID нужной строки. Здесь команда переключает ползунок всего пина, то есть сразу всех его датчиков.</p>
<table class="w-full mb-3 bg-white/70">
<thead>
<tr>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Действие</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">SMS</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">DTMF (во время звонка)</th>
</tr>
</thead>
<tbody>
<tr><td class="border px-4 py-2">Отключить строку (ползунок Off)</td><td class="border px-4 py-2"><code>${'5#00*'}</code></td><td class="border px-4 py-2"><code>${'5#00*#'}</code></td></tr>
<tr><td class="border px-4 py-2">Включить строку (ползунок On)</td><td class="border px-4 py-2"><code>${'5#11*'}</code></td><td class="border px-4 py-2"><code>${'5#11*#'}</code></td></tr>
</tbody>
</table>
<p class="mb-2">В таблице ID = 5 - это пример, подставьте ID своей строки.</p>
<p class="mb-2">Несколько команд подряд: <code>${'5#00*7#11*'}</code> (SMS) и <code>${'5#00*7#11*#'}</code> (звонок). Ввод во время звонка всегда завершается символами <code>${'*#'}</code>: последняя команда уже заканчивается на <code>${'*'}</code>, поэтому в конце добавляется только <code>${'#'}</code>.</p>
<p class="mb-2">Коды для всех страниц: Button, Switch, Encoder, OneWire, Security, Zigbee - <b>00</b> (выкл) и <b>11</b> (вкл); Cron - <b>33</b> и <b>44</b>; PID - <b>55</b> и <b>66</b>.</p>
<p class="mb-2">В ответ приходит SMS-отчёт, например <code>${'OnOff: Pin5=OFF'}</code> (отчёт отправляется, только если включён общий ползунок SIM800L). Неверные команды попадают в список Invld pins/cmd.</p>
</div>
</section>
<section class="rounded-2xl border-2 bg-indigo-50 border-indigo-300 p-5 space-y-4">
<h2 class="text-xl font-bold text-black">Как подключить датчик (пошагово)</h2>
<ol class="list-decimal ml-6 space-y-3">
<li><b>Выберите пин.</b> Откройте страницу <b>"Select pin(s)"</b>, найдите нужный пин, выберите для него режим <b>"1-WIRE"</b> и нажмите <b>"Submit"</b>. После этого пин сам появится в таблице на этой странице.</li>
<li><b>Задайте тип датчика.</b> Нажмите <b>Ред.</b> в строке пина. В поле <b>Selected sensor</b> выберите <b>DS18B20</b> или <b>DHT22</b> (None - пин не используется). Поле <b>Count of sensors</b> у DS18B20 заполняется автоматически при поиске датчиков на шине (максимум 10), у DHT22 всегда 1. Включите ползунок <b>On/Off</b> и нажмите <b>Save changes</b>.</li>
<li><b>Перезагрузите контроллер.</b> Настройки сохраняются сразу, но поиск датчиков на шине выполняется только при загрузке.</li>
<li><b>Проверьте, что датчики найдены.</b> Нажмите на строку пина: раскроется список датчиков с серийным номером (SN), текущей температурой (у DHT22 ещё и влажностью), пределами и действиями. Если «Кол-во сенсоров» равно 0, при последнем поиске датчики не найдены. Проверьте провода и подтягивающий резистор около 4,7 кОм между линией данных и +3,3 В.</li>
<li><b>Скажите, что делать.</b> Нажмите <b>Ред.</b> у нужного датчика. В полях <b>Upper Temperature</b> и <b>Lower Temperature</b> задаются пределы температуры (от -55 до 125 градусов). В полях <b>Action for Upper Temperature</b> (при верхнем пределе) и <b>Action for Lower Temperature</b> (при нижнем) впишите, каким устройством управлять. У DHT22 есть ещё пределы влажности <b>Humidity upper limit</b> и <b>Humidity lower limit</b> (от 0 до 100) и поля <b>Action for upper H</b> и <b>Action for lower H</b>. Пишется так: <b>ID устройства, двоеточие, команда</b>. Без пробелов!</li>
<li><b>Проверьте ползунок On/Off</b> в строке пина. Если он выключен, датчик игнорируется целиком и никакие действия не выполняются.</li>
</ol>
<p class="rounded-xl border border-red-300 bg-red-50 px-4 py-2 font-bold text-red-700">После смены типа датчика повторный поиск датчиков на шине выполняется только при перезагрузке контроллера. Не забудьте перезагрузить устройство!</p>
<table class="w-full mb-3 bg-white/70">
<thead>
<tr>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Команда</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что произойдёт</th>
</tr>
</thead>
<tbody>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'1'}</code></td><td class="border px-4 py-2">включить (на странице показывается как ON)</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'0'}</code></td><td class="border px-4 py-2">выключить (OFF)</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'2'}</code></td><td class="border px-4 py-2">переключить на противоположное: было выключено - включится, было включено - выключится (TG, это TOGGLE)</td></tr>
</tbody>
</table>
<div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300">
<b>Важно:</b> в полях действий пишется <b>ID устройства, которым вы хотите управлять</b> (светодиод, реле, Zigbee-устройство), а <b>не</b> ID самого пина с датчиком.
</div>
<div class="p-4 rounded-xl bg-white/80 border border-indigo-300 mb-3">
<p class="text-lg font-bold text-black mb-1">Пример</p>
<p class="mb-1">Датчик DS18B20 стоит в теплице, верхний предел - 28 градусов, нижний - 18. Вентилятор подключён к пину <b>6</b>, обогреватель - к пину <b>7</b>.</p>
<p class="mb-1">В поле <b>Action for Upper Temperature</b> пишем: <code>${'6:1,7:0'}</code> - при жаре включить вентилятор и выключить обогреватель.</p>
<p class="mb-1">В поле <b>Action for Lower Temperature</b> пишем: <code>${'6:0,7:1'}</code> - при холоде выключить вентилятор и включить обогреватель.</p>
<p class="mb-1">Чтобы управлять несколькими устройствами сразу, перечислите их через запятую.</p>
</div>
<p class="mb-2">Кнопка «copy SN» рядом с серийным номером DS18B20 копирует его в буфер обмена. Номер нужен для привязки датчика к PID-контроллеру на странице «PID controller».</p>
</section>
<section class="rounded-2xl border-2 bg-violet-50 border-violet-300 p-5 space-y-4">
<h2 class="text-xl font-bold text-black">MQTT: отслеживание изменений</h2>
<div>
<p class="mb-1">У этой страницы нет команд управления по API или MQTT: датчики только публикуют свои показания.</p>
</div>
<div>
<h3 class="text-lg font-bold text-black mb-2">Отслеживание изменений</h3>
<table class="w-full mb-3 bg-white/70">
<thead>
<tr>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Топик</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Описание</th>
</tr>
</thead>
<tbody>
<tr><td class="border px-4 py-2 whitespace-nowrap">Swarm/sensors/</td><td class="border px-4 py-2">Данная страница отслеживает изменения показаний датчиков и значений PWM-выходов и автоматически отправляет их одним пакетом по MQTT на топик: Swarm/sensors/. Где "Swarm" это Ваш 'TX topic'.</td></tr>
</tbody>
</table>
<h3 class="text-lg font-bold text-black mb-2">Формат пакета</h3>
<table class="w-full mb-3 bg-white/70">
<thead>
<tr>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Ключ</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что означает</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Пример</th>
</tr>
</thead>
<tbody>
<tr><td class="border px-4 py-2 whitespace-nowrap">16 знаков (SN)</td><td class="border px-4 py-2">Датчик DS18B20: ключ - его серийный номер, значение - температура в градусах Цельсия</td><td class="border px-4 py-2"><code>${'"28B63A75D0013C7B":26.44'}</code></td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap">h + ID пина</td><td class="border px-4 py-2">Датчик DHT22: массив из двух чисел - температура и влажность</td><td class="border px-4 py-2"><code>${'"h46":[20.6,46.0]'}</code></td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap">p + ID пина</td><td class="border px-4 py-2">PWM-выход: значение Duty от 0 до 100 процентов</td><td class="border px-4 py-2"><code>${'"p24":18'}</code></td></tr>
</tbody>
</table>
<p class="mb-2">Пример целого пакета: <code>${'{"28B63A75D0013C7B":26.44,"h46":[20.6,46.0],"p24":18}'}</code></p>
<ul class="list-disc ml-6 mb-3 space-y-1">
<li>Пакет отправляется, только если включён MQTT (клиент или встроенный сервер) и задан TX topic.</li>
<li>В пакет попадают только изменившиеся значения: температура - на 0.2 градуса и больше, влажность - на 1 процент и больше, PWM - на 2 и больше.</li>
<li>Датчики пина с выключенным ползунком On/Off в пакет не попадают.</li>
</ul>
</div>
</section>
<section class="rounded-2xl border-2 bg-teal-50 border-teal-300 p-5 space-y-4">
<h2 class="text-xl font-bold text-black">Поля действий: пределы температуры и влажности</h2>
<div>
<h3 class="text-lg font-bold text-black mb-2">Сколько датчиков можно подключить</h3>
<table class="w-full mb-3 bg-white/70">
<thead>
<tr>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Тип датчика</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Датчиков на один пин</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Пинов под этот тип</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Всего</th>
</tr>
</thead>
<tbody>
<tr><td class="border px-4 py-2">DS18B20</td><td class="border px-4 py-2">до 10</td><td class="border px-4 py-2">до 2</td><td class="border px-4 py-2">до 20</td></tr>
<tr><td class="border px-4 py-2">DHT22</td><td class="border px-4 py-2">1</td><td class="border px-4 py-2">до 20</td><td class="border px-4 py-2">до 20</td></tr>
</tbody>
</table>
<p class="mb-2">DS18B20 - цифровая шина с адресацией по серийному номеру, поэтому на один пин можно повесить несколько датчиков. У DHT22 адреса на шине нет, поэтому каждому DHT22 нужен отдельный пин.</p>
</div>
<div>
<h3 class="text-lg font-bold text-black mb-2">Формат полей Action</h3>
<p class="mb-2">Поля <b>Action for Upper Temperature</b>, <b>Action for Lower Temperature</b> (у DHT22 ещё <b>Action for upper H</b> и <b>Action for lower H</b>) содержат записи формата <code>${'ID:Action'}</code> с разделителем <code>${','}</code>. Длина поля - не больше <b>29 символов</b> вместе с условиями после знака ?. Под полем показан счётчик, а прошивка отклоняет более длинную строку целиком, без обрезки.</p>
<p class="mb-2">Примеры записи: <code>${'6:1'}</code> (пин 6 - ON), <code>${'93:2'}</code> (пин 93 - TOGGLE), <code>${'93.1:0'}</code> (Zigbee слот 93, sub-action 1 - OFF).</p>
<table class="w-full mb-3 bg-white/70">
<thead>
<tr>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Длина ID</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Пример</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Байт на запись</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Записей в строке</th>
</tr>
</thead>
<tbody>
<tr><td class="border px-4 py-2">1 знак</td><td class="border px-4 py-2"><code>${'5:1'}</code></td><td class="border px-4 py-2">3 + запятая = 4</td><td class="border px-4 py-2">до 7</td></tr>
<tr><td class="border px-4 py-2">2 знака</td><td class="border px-4 py-2"><code>${'15:1'}</code></td><td class="border px-4 py-2">4 + запятая = 5</td><td class="border px-4 py-2">до 6</td></tr>
<tr><td class="border px-4 py-2">3 знака</td><td class="border px-4 py-2"><code>${'155:1'}</code></td><td class="border px-4 py-2">5 + запятая = 6</td><td class="border px-4 py-2">до 5</td></tr>
</tbody>
</table>
<div class="mt-2 text-slate-700">
Цифры в таблице верны для записей без условий.
</div>
</div>
</section>
<section class="rounded-2xl border-2 bg-amber-50 border-amber-300 p-5 space-y-4">
<h2 class="text-xl font-bold text-black">${condHelpTitle(true)}</h2>
<div class="space-y-3">
<p class="text-slate-600 italic mb-2">Сделай, но только если...</p>
<p class="mb-2">Датчик следит за температурой (DHT22 - ещё и за влажностью). Когда показание доходит до верхнего или нижнего предела, прошивка выполняет действие из поля Action. Обычно оно выполняется всегда. Условие добавляет к действию слова «но только если». Например: «при жаре включить вентилятор, но только если сейчас день».</p>
<p class="mb-2">Условие - это «замок» на одном действии. В момент, когда предел достигнут, прошивка проверяет условие каждого действия отдельно. Если условие верно (ДА) - действие выполняется. Если неверно (НЕТ) - это действие молча пропускается, а остальные действия в этом же поле выполняются как обычно. Если условия нет - действие выполняется всегда.</p>
<h4 class="text-lg font-bold text-black mt-4 mb-2">Как записать условие: три шага</h4>
<ol class="list-decimal ml-6 mb-3 space-y-1">
<li>Нажмите на строку нужного пина, чтобы раскрыть список датчиков, и нажмите <b>Ред.</b> у нужного датчика. В поле <b>Action for Upper Temperature</b> или <b>Action for Lower Temperature</b> запишите действие как обычно: <code>${'6:1'}</code> (устройство 6, включить). У датчика DHT22 есть ещё два поля для влажности: <b>Action for upper H</b> и <b>Action for lower H</b>.</li>
<li>Сразу после действия, <b>без пробелов</b>, поставьте знак <b>?</b>: <code>${'6:1?'}</code></li>
<li>Допишите условие: <code>${'6:1?Sr'}</code>. Читаем так: «включить устройство 6, но только если сейчас день». Нажмите <b>Save changes</b>.</li>
</ol>
<p class="mb-3">Общий вид: <code>${'ID:команда?условие'}</code>. Команда: <b>0</b> - выключить, <b>1</b> - включить, <b>2</b> - переключить на противоположное. Несколько действий пишутся через запятую без пробелов, и у каждого может быть своё условие или не быть никакого. Предел температуры, при котором всё это срабатывает, по-прежнему задаётся в полях Upper/Lower Temperature, условие его не заменяет.</p>
<div class="p-4 rounded-xl bg-white/80 border border-amber-300 mb-3">
<p class="text-lg font-bold text-black mb-1">Пример из жизни: вентилятор в теплице только днём</p>
<p class="mb-1">В теплице стоит датчик, верхний предел температуры - 28 градусов. Вентилятор подключён к пину 6. Ночью шуметь не нужно.</p>
<p class="mb-1">В поле <b>Action for Upper Temperature</b> пишем: <code>${'6:1?Sr'}</code></p>
<p class="mb-1">Результат: если температура дошла до 28 днём - вентилятор включится. Если дошла ночью - действие будет пропущено. Чтобы Sr и Ss работали, на странице «Global Settings» должно быть настроено время восхода и заката. Что будет утром, когда станет день, читайте в правиле 1 ниже.</p>
</div>
<div class="p-4 rounded-xl bg-white/80 border border-amber-300 mb-3">
<p class="text-lg font-bold text-black mb-1">Пример из жизни: обогрев не включать при открытой форточке</p>
<p class="mb-1">Нижний предел температуры - 18 градусов. Обогреватель подключён к пину 7. Форточка открывается реле с ID 9 (реле включено - форточка открыта).</p>
<p class="mb-1">В поле <b>Action for Lower Temperature</b> пишем: <code>${'7:1?!D9'}</code></p>
<p class="mb-1">Читаем: «включить обогреватель, но только если устройство 9 выключено, то есть форточка закрыта». Если форточка открыта, действие пропускается и тепло не уходит на улицу.</p>
</div>
<div class="p-4 rounded-xl bg-white/80 border border-amber-300 mb-3">
<p class="text-lg font-bold text-black mb-1">Пример из жизни: два действия, у каждого свой «замок»</p>
<p class="mb-1">В поле <b>Action for Lower Temperature</b> пишем: <code>${'7:1,8:0?D2'}</code></p>
<p class="mb-1">Читаем: «включить 7 - всегда; выключить 8 - только если включено устройство 2». Условие относится только к тому действию, после которого стоит знак ?.</p>
</div>
<div class="p-4 rounded-xl bg-white/80 border border-amber-300 mb-3">
<p class="text-lg font-bold text-black mb-1">Пример из жизни: вытяжка по влажности (DHT22)</p>
<p class="mb-1">Датчик DHT22 подключён к пину с ID 4, верхний предел влажности - 70 процентов. Вытяжка подключена к пину 8. Нужно, чтобы она включалась при высокой влажности, но не в мороз.</p>
<p class="mb-1">В поле <b>Action for upper H</b> пишем: <code>${'8:1?T4>5'}</code></p>
<p class="mb-1">Читаем: «включить вытяжку, но только если температура на датчике 4 выше 5 градусов». В условии можно ссылаться и на этот же датчик, и на любой другой пин OneWire.</p>
</div>
<div class="p-4 rounded-xl bg-white/80 border border-amber-300 mb-3">
<p class="text-lg font-bold text-black mb-1">Пример из жизни: обогрев погреба только в сильный мороз</p>
<p class="mb-1">Датчик в погребе, нижний предел температуры - 2 градуса. Обогреватель подключён к пину 7. Уличный датчик - пин OneWire с ID 6. Нужно греть погреб, только если на улице холоднее минус 5.</p>
<p class="mb-1">В поле <b>Action for Lower Temperature</b> пишем: <code>${'7:1?T6<-5'}</code></p>
<p class="mb-1">Читаем: «включить обогреватель, но только если на уличном датчике 6 холоднее минус 5». В оттепель действие будет пропущено. Помните правило 1: условие проверяется один раз, когда в погребе дошло до 2 градусов.</p>
</div>
<h4 class="text-lg font-bold text-black mt-4 mb-2">Из чего строится условие (слова)</h4>
<p class="mb-2">Число после буквы - это <b>ID</b> устройства из таблицы на соответствующей странице. Для температуры и влажности (T и H) это ID пина OneWire из первого столбца таблицы на этой странице. Регистр букв не важен: D2 и r2 - одно и то же.</p>
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
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3=100'}</code></td><td class="border px-4 py-2">Значение диммера 3 ровно 100. У ШИМ-диммера шкала 0-100 (проценты), поэтому это полная яркость.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3g50'}</code></td><td class="border px-4 py-2">Значение диммера 3 равно 50 или БОЛЬШЕ (буква g - «greater», то же, что ${'>='}).</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3l50'}</code></td><td class="border px-4 py-2">Значение диммера 3 равно 50 или МЕНЬШЕ (буква l - «less», то же, что ${'<='}).</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'B1'}</code></td><td class="border px-4 py-2">Кнопка с ID 1 сейчас нажата.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'BU1'}</code></td><td class="border px-4 py-2">Кнопка с ID 1 сейчас НЕ нажата.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'BH1'}</code></td><td class="border px-4 py-2">Кнопка с ID 1 сейчас удерживается (долгое нажатие).</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5>25.5'}</code></td><td class="border px-4 py-2">Температура на пине OneWire с ID 5 больше 25.5 градусов.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5<-5'}</code></td><td class="border px-4 py-2">Температура на пине OneWire с ID 5 ниже минус 5 градусов (минус - сразу перед числом, без пробела).</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5<10'}</code></td><td class="border px-4 py-2">Температура на пине OneWire с ID 5 меньше 10 градусов.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5.2>25.5'}</code></td><td class="border px-4 py-2">Температура второго датчика DS18B20 на пине 5 больше 25.5 градусов (.2 - номер датчика на пине, от 1 до 9; без .номер берётся первый исправный).</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'H4>50'}</code></td><td class="border px-4 py-2">Влажность датчика DHT22 на пине с ID 4 больше 50 процентов.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'H4<30'}</code></td><td class="border px-4 py-2">Влажность датчика DHT22 на пине с ID 4 меньше 30 процентов.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Sr'}</code></td><td class="border px-4 py-2">День: сейчас время между восходом и закатом. Берётся из времени восхода/заката в «Global Settings».</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Ss'}</code></td><td class="border px-4 py-2">Ночь: сейчас время между закатом и восходом. Если время восхода/заката не настроено, Sr и Ss оба считаются НЕТ.</td></tr>
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
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'= > < g l'}</code></td><td class="border px-4 py-2">Равно, больше, меньше; g - больше или равно, l - меньше или равно (также работают ${'>='} и ${'<='})</td><td class="border px-4 py-2"><code>${'T5>25.5'}</code>, <code>${'DV3=100'}</code>, <code>${'DV3l50'}</code></td></tr>
</tbody>
</table>
<p class="mb-3 text-slate-700">Совет: если в одном условии есть и <code>${'&'}</code> и <code>${'|'}</code>, всегда ставьте скобки - тогда результат точно такой, как вы задумали. Без скобок порядок такой: сначала !, потом <code>${'&'}</code>, потом <code>${'|'}</code> (поэтому <code>${'D1|D2&D3'}</code> читается как <code>${'D1|(D2&D3)'}</code>). Числа для температуры и влажности пишутся как обычно: <code>${'T5>25'}</code> и <code>${'T5>25.0'}</code> - одно и то же.</p>
<h4 class="text-lg font-bold text-black mt-4 mb-2">Готовые примеры - просто скопируйте в поле Action</h4>
<p class="mb-2">Здесь 6 - устройство, которым управляем (подставьте своё). Все примеры помещаются в предел 29 символов.</p>
<table class="w-full mb-3 bg-white/70">
<thead>
<tr>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что писать в поле Action</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что произойдёт</th>
</tr>
</thead>
<tbody>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D2'}</code></td><td class="border px-4 py-2">Включить 6, только если устройство 2 включено.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?!D2'}</code></td><td class="border px-4 py-2">Включить 6, только если устройство 2 выключено.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:2?D1&D2'}</code></td><td class="border px-4 py-2">Переключить 6, только если включены И устройство 1, И устройство 2.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D1|D2'}</code></td><td class="border px-4 py-2">Включить 6, если включено хотя бы одно из устройств 1 и 2.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D1&!D2'}</code></td><td class="border px-4 py-2">Включить 6, если устройство 1 включено, а устройство 2 выключено.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:0?!D1&!D2'}</code></td><td class="border px-4 py-2">Выключить 6, только если оба устройства выключены.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?(D1|D2)&!D3'}</code></td><td class="border px-4 py-2">Включить 6, если включено устройство 1 или 2, а устройство 3 выключено.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?!(D1&D2)'}</code></td><td class="border px-4 py-2">Включить 6, если устройство 1 и 2 НЕ включены одновременно.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?Ss'}</code></td><td class="border px-4 py-2">Включить 6, только если сейчас ночь.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:0?Sr'}</code></td><td class="border px-4 py-2">Выключить 6, только если сейчас день.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?Ss&B1'}</code></td><td class="border px-4 py-2">Включить 6, если сейчас ночь и кнопка 1 нажата.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?Ss|D1'}</code></td><td class="border px-4 py-2">Включить 6, если сейчас ночь ИЛИ включено устройство 1.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?BU1'}</code></td><td class="border px-4 py-2">Включить 6, только если кнопка 1 не нажата.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?BH1'}</code></td><td class="border px-4 py-2">Включить 6, только если кнопка 1 удерживается.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5>25.5'}</code></td><td class="border px-4 py-2">Включить 6, если на датчике 5 теплее 25.5 градусов.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5<18'}</code></td><td class="border px-4 py-2">Включить 6, если на датчике 5 холоднее 18 градусов.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5<-5'}</code></td><td class="border px-4 py-2">Включить 6, если на датчике 5 холоднее минус 5 градусов.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'7:1?T5>-10&T5<0'}</code></td><td class="border px-4 py-2">Включить 7, если на датчике 5 от минус 10 до нуля градусов.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:0?T5g-0.5'}</code></td><td class="border px-4 py-2">Выключить 6, если на датчике 5 минус 0.5 градуса или теплее.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5>=25'}</code></td><td class="border px-4 py-2">Включить 6, если на датчике 5 25 градусов или больше (можно писать и T5g25).</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5.2>25.5'}</code></td><td class="border px-4 py-2">Включить 6, если второй датчик на пине 5 показывает больше 25.5 градусов.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?H4>50'}</code></td><td class="border px-4 py-2">Включить 6, если влажность на датчике 4 больше 50 процентов.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?H4<30'}</code></td><td class="border px-4 py-2">Включить 6, если влажность на датчике 4 меньше 30 процентов.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5>25|T6>25'}</code></td><td class="border px-4 py-2">Включить 6, если на датчике 5 ИЛИ на датчике 6 теплее 25 градусов.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5>25&H4>60&!D7'}</code></td><td class="border px-4 py-2">Включить 6, если жарко, влажно и вентилятор (устройство 7) ещё не включён.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:0?Sr&T5<20'}</code></td><td class="border px-4 py-2">Выключить 6, если сейчас день и холодно.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?(T5>28|H4>70)&Sr'}</code></td><td class="border px-4 py-2">Включить 6, если сейчас день и жарко или очень влажно.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3>0'}</code></td><td class="border px-4 py-2">Включить 6, только если диммер 3 светит (значение больше нуля).</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3=100'}</code></td><td class="border px-4 py-2">Включить 6, только если диммер 3 на полной яркости (100).</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3g50'}</code></td><td class="border px-4 py-2">Включить 6, только если значение диммера 3 равно 50 или больше.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3l50'}</code></td><td class="border px-4 py-2">Включить 6, только если значение диммера 3 равно 50 или меньше.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3>0&Ss'}</code></td><td class="border px-4 py-2">Включить 6, если диммер 3 светит и сейчас ночь.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D93'}</code></td><td class="border px-4 py-2">Включить 6, только если включено Zigbee-устройство с ID 93 (ID Zigbee-устройств начинаются с 89).</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV93g100'}</code></td><td class="border px-4 py-2">Включить 6, только если яркость Zigbee-устройства 93 равна 100 или больше.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'93.1:2?D2'}</code></td><td class="border px-4 py-2">Zigbee: слот 93, подкоманда 1, переключить - только если устройство 2 включено.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5<25|D1'}</code></td><td class="border px-4 py-2">Включить 6, если на датчике 5 холоднее 25 градусов ИЛИ включено устройство 1 (особый случай с неисправным датчиком - см. правило 7).</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?C3'}</code></td><td class="border px-4 py-2">Включить 6, только если верно готовое условие из ячейки C3 (см. правило 3).</td></tr>
</tbody>
</table>
<h4 class="text-lg font-bold text-black mt-4 mb-2">Несколько действий в одном поле</h4>
<table class="w-full mb-3 bg-white/70">
<thead>
<tr>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что писать в поле Action</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что произойдёт</th>
</tr>
</thead>
<tbody>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1,7:0?D2'}</code></td><td class="border px-4 py-2">Включить 6 всегда; выключить 7 только если устройство 2 включено.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D2,7:0?!D2'}</code></td><td class="border px-4 py-2">Два действия сразу: включить 6, если устройство 2 включено; выключить 7, если устройство 2 выключено.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D1,12:1?!D1,18:0'}</code></td><td class="border px-4 py-2">Три действия: включить 6, если устройство 1 включено; включить 12, если устройство 1 выключено; выключить 18 всегда.</td></tr>
</tbody>
</table>
<h4 class="text-lg font-bold text-black mt-4 mb-2">Важные правила</h4>
<p class="rounded-xl border border-red-300 bg-red-50 px-4 py-2 font-bold text-red-700">Условие проверяется один раз, в момент достижения предела. Прочитайте правила ниже обязательно!</p>
<ol class="list-decimal ml-6 mb-3 space-y-1">
<li><b>Условие проверяется один раз - в момент, когда показание дошло до предела.</b> Если в этот момент было НЕТ, действие пропущено и само потом не выполнится, даже когда условие станет ДА. Датчик «сработает» заново только после того, как показание отойдёт от предела назад (примерно на 0.5 градуса, у влажности - на 2 процента) и дойдёт до него снова. Если условие нужно проверять постоянно, используйте таймер на странице «Timers (cron)»: в поле Cron пишем <code>${'0 * * * * * *'}</code> (каждую минуту), в поле Script пишем, например, <code>${'6:1?T5>28&Sr'}</code>. Тогда каждую минуту прошивка сама смотрит на температуру и условие.</li>
<li><b>Главный ползунок On/Off в строке пина сильнее любого условия.</b> Если он выключен, датчик игнорируется целиком и никакие действия не выполняются.</li>
<li><b>Длина поля Action у датчиков OneWire - не больше 29 символов</b> вместе с условием (поле не даст ввести больше, а прошивка отклонит более длинную строку целиком). Если условие длинное, запишите его один раз в ячейку на странице «Global Settings» (строка Conditions, 12 ячеек, до 46 символов в каждой) и пишите в действии коротко: <code>${'6:1?C3'}</code>. В ячейку пишется только условие, без знака ?, например <code>${'Ss&T5>25&!D7'}</code>. Пустая или сброшенная ячейка считается НЕТ (действие блокируется). Правка ячейки сразу меняет все места, где она используется.</li>
<li><b>Условие работает только в полях Action.</b> Прямое управление устройством (ползунок On/Off у самого реле, команда API или MQTT прямо на реле) условия не проверяет.</li>
<li><b>Числа и минус.</b> После знака сравнения можно писать и отрицательные числа: <code>${'T5<-5'}</code> - «температура ниже минус 5 градусов», <code>${'T5>-0.5'}</code>, <code>${'T5g-12.3'}</code>. Минус пишется сразу перед цифрами, без пробела, и только справа от знака сравнения (запись <code>${'-5<T5'}</code> - ошибка). После точки допустима одна цифра: <code>${'T5>25.55'}</code> - ошибка. Помните, что условие только «смотрит» на температуру. Сам предел, при котором срабатывает датчик, по-прежнему задаётся в полях Upper/Lower Temperature, там тоже можно писать отрицательные значения.</li>
<li><b>Номер датчика на пине:</b> <code>${'T5.2'}</code> - второй датчик DS18B20 на пине 5 (по порядку в списке датчиков этого пина). Номер - одна цифра от 1 до 9. Без номера берётся первый исправный датчик.</li>
<li><b>Неисправный датчик</b> (нет ответа, ошибка чтения) даёт ответ «неизвестно», и действие блокируется, даже если перед условием стоит !. Исключение: явная правда через |. Например, <code>${'6:1?T5<25|D1'}</code> сработает при неисправном датчике 5, если устройство 1 включено.</li>
<li><b>Если условие записано с ошибкой</b>, страница при сохранении ничего не скажет, а действие будет молча пропускаться. Условие прямо в поле Action при сохранении не проверяется (ячейки библиотеки проверяются). Типичные ошибки: цифра забыта (<code>${'R'}</code> вместо <code>${'D2'}</code>), не закрыта скобка, два знака подряд (<code>${'D1&&D2'}</code>), <code>${'=>'}</code> вместо <code>${'>='}</code>, лишняя запятая внутри условия. После сохранения проверьте условие на простом примере.</li>
<li><b>Запятая разделяет действия</b>, поэтому внутри самого условия запятых быть не может.</li>
<li><b>Если вы удалите устройство</b>, на которое ссылается условие, прошивка заменит такое условие на заведомо ложное <code>${'?0'}</code>. Действие перестанет срабатывать, но не станет безусловным. Задайте новое условие.</li>
<li><b>Если верхний и нижний предел равны</b>, датчик работает как термостат с одной точкой: верхнее действие срабатывает при показании предел плюс 0.5 и выше, нижнее - при показании предел минус 0.5 и ниже (у влажности - плюс и минус 2 процента).</li>
</ol>
</div>
</section>
</div>
  `,
  en: html`
<div class="mytext space-y-6 font-sans text-base leading-relaxed text-slate-700 [&_code]:font-sans [&_code]:font-semibold [&_pre]:font-sans">
<section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
<h2 class="text-xl font-bold text-black">Control by SMS and DTMF</h2>
<div>
<h3 class="text-lg font-bold text-black mb-2">On/Off switch by SMS and DTMF</h3>
<p class="mb-2">The On/Off slider of any row on this page can be switched from the phone number set in the SIM800L settings: by SMS or during a call (DTMF tones). The command format is the same on every page: <b>ID#CODE*</b>, where ID is the number from the ID column of the needed row. Here the command switches the slider of the whole pin, that is of all its sensors at once.</p>
<table class="w-full mb-3 bg-white/70">
<thead>
<tr>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Action</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">SMS</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">DTMF (during a call)</th>
</tr>
</thead>
<tbody>
<tr><td class="border px-4 py-2">Turn the row off (slider Off)</td><td class="border px-4 py-2"><code>${'5#00*'}</code></td><td class="border px-4 py-2"><code>${'5#00*#'}</code></td></tr>
<tr><td class="border px-4 py-2">Turn the row on (slider On)</td><td class="border px-4 py-2"><code>${'5#11*'}</code></td><td class="border px-4 py-2"><code>${'5#11*#'}</code></td></tr>
</tbody>
</table>
<p class="mb-2">In the table ID = 5 is an example, use the ID of your own row.</p>
<p class="mb-2">Several commands in a row: <code>${'5#00*7#11*'}</code> (SMS) and <code>${'5#00*7#11*#'}</code> (call). Input during a call always ends with the characters <code>${'*#'}</code>: the last command already ends with <code>${'*'}</code>, so only <code>${'#'}</code> is added at the end.</p>
<p class="mb-2">Codes for all pages: Button, Switch, Encoder, OneWire, Security, Zigbee - <b>00</b> (off) and <b>11</b> (on); Cron - <b>33</b> and <b>44</b>; PID - <b>55</b> and <b>66</b>.</p>
<p class="mb-2">A report SMS comes back in reply, for example <code>${'OnOff: Pin5=OFF'}</code> (the report is sent only if the main SIM800L slider is on). Wrong commands go to the Invld pins/cmd list.</p>
</div>
</section>
<section class="rounded-2xl border-2 bg-indigo-50 border-indigo-300 p-5 space-y-4">
<h2 class="text-xl font-bold text-black">How to connect a sensor (step by step)</h2>
<ol class="list-decimal ml-6 space-y-3">
<li><b>Choose a pin.</b> Open the <b>"Select pin(s)"</b> page, find the needed pin, choose the <b>"1-WIRE"</b> mode for it and click <b>"Submit"</b>. After that the pin appears in the table on this page by itself.</li>
<li><b>Set the sensor type.</b> Click <b>Edit</b> in the pin row. In the <b>Selected sensor</b> field choose <b>DS18B20</b> or <b>DHT22</b> (None - the pin is not used). The <b>Count of sensors</b> field is filled automatically for DS18B20 when the bus is scanned (maximum 10), and is always 1 for DHT22. Turn on the <b>On/Off</b> slider and click <b>Save changes</b>.</li>
<li><b>Reboot the controller.</b> The settings are saved at once, but the sensors on the bus are searched only at boot.</li>
<li><b>Check that the sensors are found.</b> Click the pin row: the sensor list opens with the serial number (SN), the current temperature (and humidity for DHT22), the limits and the actions. If "Count of sensors" is 0, no devices were found on the last scan. Check the wiring and the ~4.7 kOhm pull-up resistor between the data line and +3.3 V.</li>
<li><b>Say what to do.</b> Click <b>Edit</b> next to the needed sensor. The <b>Upper Temperature</b> and <b>Lower Temperature</b> fields set the temperature limits (from -55 to 125 degrees). In the <b>Action for Upper Temperature</b> (at the upper limit) and <b>Action for Lower Temperature</b> (at the lower limit) fields write which device to control. DHT22 also has the humidity limits <b>Humidity upper limit</b> and <b>Humidity lower limit</b> (0 to 100) and the fields <b>Action for upper H</b> and <b>Action for lower H</b>. The format is: <b>device ID, colon, command</b>. No spaces!</li>
<li><b>Check the On/Off slider</b> in the pin row. If it is off, the sensor is ignored completely and no actions are executed.</li>
</ol>
<p class="rounded-xl border border-red-300 bg-red-50 px-4 py-2 font-bold text-red-700">After a sensor type change, the bus is searched again only when the controller reboots. Do not forget to reboot the device!</p>
<table class="w-full mb-3 bg-white/70">
<thead>
<tr>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Command</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What happens</th>
</tr>
</thead>
<tbody>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'1'}</code></td><td class="border px-4 py-2">turn on (shown as ON on the page)</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'0'}</code></td><td class="border px-4 py-2">turn off (OFF)</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'2'}</code></td><td class="border px-4 py-2">toggle to the opposite: was off - turns on, was on - turns off (TG, this is TOGGLE)</td></tr>
</tbody>
</table>
<div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300">
<b>Important:</b> the action fields take the <b>ID of the device you want to control</b> (LED, relay, Zigbee device), <b>not</b> the ID of the sensor pin itself.
</div>
<div class="p-4 rounded-xl bg-white/80 border border-indigo-300 mb-3">
<p class="text-lg font-bold text-black mb-1">Example</p>
<p class="mb-1">A DS18B20 sensor is in a greenhouse, the upper limit is 28 degrees, the lower limit is 18. The fan is connected to pin <b>6</b>, the heater to pin <b>7</b>.</p>
<p class="mb-1">In <b>Action for Upper Temperature</b> write: <code>${'6:1,7:0'}</code> - when hot, turn the fan on and the heater off.</p>
<p class="mb-1">In <b>Action for Lower Temperature</b> write: <code>${'6:0,7:1'}</code> - when cold, turn the fan off and the heater on.</p>
<p class="mb-1">To control several devices at once, list them separated by commas.</p>
</div>
<p class="mb-2">The "copy SN" button next to the DS18B20 serial number copies it to the clipboard. The number is needed to link the sensor to a PID controller on the "PID controller" page.</p>
</section>
<section class="rounded-2xl border-2 bg-violet-50 border-violet-300 p-5 space-y-4">
<h2 class="text-xl font-bold text-black">MQTT: change tracking</h2>
<div>
<p class="mb-1">This page has no control commands over API or MQTT: the sensors only publish their readings.</p>
</div>
<div>
<h3 class="text-lg font-bold text-black mb-2">Change tracking</h3>
<table class="w-full mb-3 bg-white/70">
<thead>
<tr>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Topic</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Description</th>
</tr>
</thead>
<tbody>
<tr><td class="border px-4 py-2 whitespace-nowrap">Swarm/sensors/</td><td class="border px-4 py-2">This page tracks changes of sensor readings and PWM output values and automatically sends them in one packet over MQTT to the topic: Swarm/sensors/. Where "Swarm" is your 'TX topic'.</td></tr>
</tbody>
</table>
<h3 class="text-lg font-bold text-black mb-2">Packet format</h3>
<table class="w-full mb-3 bg-white/70">
<thead>
<tr>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Key</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Meaning</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Example</th>
</tr>
</thead>
<tbody>
<tr><td class="border px-4 py-2 whitespace-nowrap">16 characters (SN)</td><td class="border px-4 py-2">DS18B20 sensor: the key is its serial number, the value is the temperature in degrees Celsius</td><td class="border px-4 py-2"><code>${'"28B63A75D0013C7B":26.44'}</code></td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap">h + pin ID</td><td class="border px-4 py-2">DHT22 sensor: an array of two numbers - temperature and humidity</td><td class="border px-4 py-2"><code>${'"h46":[20.6,46.0]'}</code></td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap">p + pin ID</td><td class="border px-4 py-2">PWM output: the Duty value from 0 to 100 percent</td><td class="border px-4 py-2"><code>${'"p24":18'}</code></td></tr>
</tbody>
</table>
<p class="mb-2">Example of a whole packet: <code>${'{"28B63A75D0013C7B":26.44,"h46":[20.6,46.0],"p24":18}'}</code></p>
<ul class="list-disc ml-6 mb-3 space-y-1">
<li>The packet is sent only if MQTT is enabled (client or built-in server) and the TX topic is set.</li>
<li>Only changed values are included: temperature by 0.2 degrees or more, humidity by 1 percent or more, PWM by 2 or more.</li>
<li>Sensors of a pin whose On/Off slider is off are not included in the packet.</li>
</ul>
</div>
</section>
<section class="rounded-2xl border-2 bg-teal-50 border-teal-300 p-5 space-y-4">
<h2 class="text-xl font-bold text-black">Action fields: temperature and humidity limits</h2>
<div>
<h3 class="text-lg font-bold text-black mb-2">How many sensors can be connected</h3>
<table class="w-full mb-3 bg-white/70">
<thead>
<tr>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Sensor type</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Sensors per pin</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Pins for this type</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Total</th>
</tr>
</thead>
<tbody>
<tr><td class="border px-4 py-2">DS18B20</td><td class="border px-4 py-2">up to 10</td><td class="border px-4 py-2">up to 2</td><td class="border px-4 py-2">up to 20</td></tr>
<tr><td class="border px-4 py-2">DHT22</td><td class="border px-4 py-2">1</td><td class="border px-4 py-2">up to 20</td><td class="border px-4 py-2">up to 20</td></tr>
</tbody>
</table>
<p class="mb-2">DS18B20 is a digital bus addressed by serial number, so several sensors can share one pin. DHT22 has no bus address, so each DHT22 needs its own pin.</p>
</div>
<div>
<h3 class="text-lg font-bold text-black mb-2">Action field format</h3>
<p class="mb-2">The fields <b>Action for Upper Temperature</b>, <b>Action for Lower Temperature</b> (DHT22 also <b>Action for upper H</b> and <b>Action for lower H</b>) hold entries in the <code>${'ID:Action'}</code> format with the <code>${','}</code> separator. The field length is no more than <b>29 characters</b> including the conditions after the ? sign. A counter is shown under the field, and the firmware rejects a longer string as a whole, without truncating it.</p>
<p class="mb-2">Entry examples: <code>${'6:1'}</code> (pin 6 - ON), <code>${'93:2'}</code> (pin 93 - TOGGLE), <code>${'93.1:0'}</code> (Zigbee slot 93, sub-action 1 - OFF).</p>
<table class="w-full mb-3 bg-white/70">
<thead>
<tr>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">ID length</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Example</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Bytes per entry</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Entries in the string</th>
</tr>
</thead>
<tbody>
<tr><td class="border px-4 py-2">1 digit</td><td class="border px-4 py-2"><code>${'5:1'}</code></td><td class="border px-4 py-2">3 + comma = 4</td><td class="border px-4 py-2">up to 7</td></tr>
<tr><td class="border px-4 py-2">2 digits</td><td class="border px-4 py-2"><code>${'15:1'}</code></td><td class="border px-4 py-2">4 + comma = 5</td><td class="border px-4 py-2">up to 6</td></tr>
<tr><td class="border px-4 py-2">3 digits</td><td class="border px-4 py-2"><code>${'155:1'}</code></td><td class="border px-4 py-2">5 + comma = 6</td><td class="border px-4 py-2">up to 5</td></tr>
</tbody>
</table>
<div class="mt-2 text-slate-700">
The numbers in the table are valid for entries without conditions.
</div>
</div>
</section>
<section class="rounded-2xl border-2 bg-amber-50 border-amber-300 p-5 space-y-4">
<h2 class="text-xl font-bold text-black">${condHelpTitle(false)}</h2>
<div class="space-y-3">
<p class="text-slate-600 italic mb-2">Do it, but only if...</p>
<p class="mb-2">The sensor watches the temperature (DHT22 - the humidity as well). When the reading reaches the upper or lower limit, the firmware runs the action from the Action field. Normally it runs always. A condition adds the words "but only if" to the action. For example: "when it is hot, turn on the fan, but only if it is daytime".</p>
<p class="mb-2">A condition is a "lock" on one action. At the moment the limit is reached, the firmware checks the condition of each action separately. If the condition is true (YES) - the action runs. If it is false (NO) - this action is silently skipped, and the other actions in the same field run as usual. If there is no condition - the action always runs.</p>
<h4 class="text-lg font-bold text-black mt-4 mb-2">How to write a condition: three steps</h4>
<ol class="list-decimal ml-6 mb-3 space-y-1">
<li>Click the row of the needed pin to expand the sensor list, then click <b>Edit</b> next to the needed sensor. In the <b>Action for Upper Temperature</b> or <b>Action for Lower Temperature</b> field write the action as usual: <code>${'6:1'}</code> (device 6, turn on). A DHT22 sensor has two more fields for humidity: <b>Action for upper H</b> and <b>Action for lower H</b>.</li>
<li>Right after the action, <b>without spaces</b>, put the <b>?</b> sign: <code>${'6:1?'}</code></li>
<li>Add the condition: <code>${'6:1?Sr'}</code>. Read it as: "turn on device 6, but only if it is daytime now". Click <b>Save changes</b>.</li>
</ol>
<p class="mb-3">General form: <code>${'ID:command?condition'}</code>. Command: <b>0</b> - turn off, <b>1</b> - turn on, <b>2</b> - toggle to the opposite. Several actions are separated by a comma, without spaces, and each one may have its own condition or none. The temperature limit that triggers all this is still set in the Upper/Lower Temperature fields, the condition does not replace it.</p>
<div class="p-4 rounded-xl bg-white/80 border border-amber-300 mb-3">
<p class="text-lg font-bold text-black mb-1">Real-life example: greenhouse fan only in the daytime</p>
<p class="mb-1">A sensor is in the greenhouse, the upper temperature limit is 28 degrees. The fan is connected to pin 6. You do not want noise at night.</p>
<p class="mb-1">In <b>Action for Upper Temperature</b> write: <code>${'6:1?Sr'}</code></p>
<p class="mb-1">Result: if the temperature reached 28 in the daytime - the fan turns on. If it reached 28 at night - the action is skipped. For Sr and Ss to work, the sunrise and sunset times must be set on the Global Settings page. What happens in the morning when the day comes - see rule 1 below.</p>
</div>
<div class="p-4 rounded-xl bg-white/80 border border-amber-300 mb-3">
<p class="text-lg font-bold text-black mb-1">Real-life example: no heating while the window is open</p>
<p class="mb-1">The lower temperature limit is 18 degrees. The heater is connected to pin 7. The window is opened by the relay with ID 9 (relay on = window open).</p>
<p class="mb-1">In <b>Action for Lower Temperature</b> write: <code>${'7:1?!D9'}</code></p>
<p class="mb-1">Read it as: "turn on the heater, but only if device 9 is off, that is the window is closed". If the window is open, the action is skipped and the heat does not go outside.</p>
</div>
<div class="p-4 rounded-xl bg-white/80 border border-amber-300 mb-3">
<p class="text-lg font-bold text-black mb-1">Real-life example: two actions, each with its own "lock"</p>
<p class="mb-1">In <b>Action for Lower Temperature</b> write: <code>${'7:1,8:0?D2'}</code></p>
<p class="mb-1">Read it as: "turn on 7 - always; turn off 8 - only if device 2 is on". A condition belongs only to the action it follows after the ? sign.</p>
</div>
<div class="p-4 rounded-xl bg-white/80 border border-amber-300 mb-3">
<p class="text-lg font-bold text-black mb-1">Real-life example: exhaust fan by humidity (DHT22)</p>
<p class="mb-1">A DHT22 sensor is on the pin with ID 4, the upper humidity limit is 70 percent. The exhaust fan is connected to pin 8. It should turn on at high humidity, but not in frost.</p>
<p class="mb-1">In <b>Action for upper H</b> write: <code>${'8:1?T4>5'}</code></p>
<p class="mb-1">Read it as: "turn on the exhaust fan, but only if the temperature on sensor 4 is above 5 degrees". A condition may refer to the same sensor or to any other OneWire pin.</p>
</div>
<div class="p-4 rounded-xl bg-white/80 border border-amber-300 mb-3">
<p class="text-lg font-bold text-black mb-1">Real-life example: cellar heating only in hard frost</p>
<p class="mb-1">A sensor is in the cellar, the lower temperature limit is 2 degrees. The heater is connected to pin 7. The outdoor sensor is the OneWire pin with ID 6. You want to heat the cellar only if it is colder than minus 5 outside.</p>
<p class="mb-1">In <b>Action for Lower Temperature</b> write: <code>${'7:1?T6<-5'}</code></p>
<p class="mb-1">Read it as: "turn on the heater, but only if the outdoor sensor 6 reads colder than minus 5". In a thaw the action is skipped. Remember rule 1: the condition is checked once, when the cellar reaches 2 degrees.</p>
</div>
<h4 class="text-lg font-bold text-black mt-4 mb-2">What a condition is made of (words)</h4>
<p class="mb-2">The number after the letter is the <b>ID</b> of the device from the table on the corresponding page. For temperature and humidity (T and H) it is the ID of the OneWire pin from the first column of the table on this page. Letter case does not matter: D2 and r2 are the same.</p>
<table class="w-full mb-3 bg-white/70">
<thead>
<tr>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Entry</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">How to read it</th>
</tr>
</thead>
<tbody>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'D5'}</code></td><td class="border px-4 py-2">The device (DEVICE pin) with ID 5 is ON now. For a Zigbee device - it is on.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'!D5'}</code></td><td class="border px-4 py-2">The pin with ID 5 is OFF now (the ! sign means "NOT").</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3>0'}</code></td><td class="border px-4 py-2">Dimmer (PWM) with ID 3: the value is above zero, that is it is lit. For Zigbee - the brightness of the device.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3=100'}</code></td><td class="border px-4 py-2">The value of dimmer 3 is exactly 100. A PWM dimmer has a 0-100 scale (percent), so this is full brightness.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3g50'}</code></td><td class="border px-4 py-2">The value of dimmer 3 is 50 or MORE (the letter g means "greater", same as ${'>='}).</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3l50'}</code></td><td class="border px-4 py-2">The value of dimmer 3 is 50 or LESS (the letter l means "less", same as ${'<='}).</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'B1'}</code></td><td class="border px-4 py-2">The button with ID 1 is pressed now.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'BU1'}</code></td><td class="border px-4 py-2">The button with ID 1 is NOT pressed now.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'BH1'}</code></td><td class="border px-4 py-2">The button with ID 1 is held now (long press).</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5>25.5'}</code></td><td class="border px-4 py-2">The temperature on the OneWire pin with ID 5 is above 25.5 degrees.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5<-5'}</code></td><td class="border px-4 py-2">The temperature on the OneWire pin with ID 5 is below minus 5 degrees (the minus goes right before the number, no space).</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5<10'}</code></td><td class="border px-4 py-2">The temperature on the OneWire pin with ID 5 is below 10 degrees.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5.2>25.5'}</code></td><td class="border px-4 py-2">The temperature of the second DS18B20 sensor on pin 5 is above 25.5 degrees (.2 is the sensor number on the pin, from 1 to 9; without .number the first working sensor is used).</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'H4>50'}</code></td><td class="border px-4 py-2">The humidity of the DHT22 sensor on the pin with ID 4 is above 50 percent.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'H4<30'}</code></td><td class="border px-4 py-2">The humidity of the DHT22 sensor on the pin with ID 4 is below 30 percent.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Sr'}</code></td><td class="border px-4 py-2">Day: it is now between sunrise and sunset. Taken from the sunrise/sunset times in "Global Settings".</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Ss'}</code></td><td class="border px-4 py-2">Night: it is now between sunset and sunrise. If the sunrise/sunset times are not set, both Sr and Ss count as NO.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'C3'}</code></td><td class="border px-4 py-2">Insert the ready-made condition from cell C3 (cells are stored on the "Global Settings" page, the Conditions row). Nesting - no deeper than two levels.</td></tr>
</tbody>
</table>
<h4 class="text-lg font-bold text-black mt-4 mb-2">What to join the words with (signs)</h4>
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
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'( )'}</code></td><td class="border px-4 py-2">Brackets - what to count first</td><td class="border px-4 py-2"><code>${'(D1|D2)&!D3'}</code> - (device 1 or device 2) AND device 3 is off</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'= > < g l'}</code></td><td class="border px-4 py-2">Equal, greater, less; g - greater or equal, l - less or equal (${'>='} and ${'<='} also work)</td><td class="border px-4 py-2"><code>${'T5>25.5'}</code>, <code>${'DV3=100'}</code>, <code>${'DV3l50'}</code></td></tr>
</tbody>
</table>
<p class="mb-3 text-slate-700">Tip: if you mix <code>${'&'}</code> and <code>${'|'}</code> in one condition, always use brackets. Then the result is exactly what you meant. Without brackets the order is: first !, then <code>${'&'}</code>, then <code>${'|'}</code> (so <code>${'D1|D2&D3'}</code> reads as <code>${'D1|(D2&D3)'}</code>). Numbers for temperature and humidity are written as usual: <code>${'T5>25'}</code> and <code>${'T5>25.0'}</code> are the same.</p>
<h4 class="text-lg font-bold text-black mt-4 mb-2">Ready-made examples - just copy into the Action field</h4>
<p class="mb-2">Here 6 is the device being controlled (use your own). All examples fit the 29-character limit.</p>
<table class="w-full mb-3 bg-white/70">
<thead>
<tr>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What to type in the Action field</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What happens</th>
</tr>
</thead>
<tbody>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D2'}</code></td><td class="border px-4 py-2">Turn on 6 only if device 2 is on.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?!D2'}</code></td><td class="border px-4 py-2">Turn on 6 only if device 2 is off.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:2?D1&D2'}</code></td><td class="border px-4 py-2">Toggle 6 only if BOTH device 1 and device 2 are on.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D1|D2'}</code></td><td class="border px-4 py-2">Turn on 6 if at least one of devices 1 and 2 is on.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D1&!D2'}</code></td><td class="border px-4 py-2">Turn on 6 if device 1 is on and device 2 is off.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:0?!D1&!D2'}</code></td><td class="border px-4 py-2">Turn off 6 only if both devices are off.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?(D1|D2)&!D3'}</code></td><td class="border px-4 py-2">Turn on 6 if device 1 or 2 is on and device 3 is off.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?!(D1&D2)'}</code></td><td class="border px-4 py-2">Turn on 6 if devices 1 and 2 are NOT on at the same time.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?Ss'}</code></td><td class="border px-4 py-2">Turn on 6 only if it is night now.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:0?Sr'}</code></td><td class="border px-4 py-2">Turn off 6 only if it is day now.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?Ss&B1'}</code></td><td class="border px-4 py-2">Turn on 6 if it is night and button 1 is pressed.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?Ss|D1'}</code></td><td class="border px-4 py-2">Turn on 6 if it is night OR device 1 is on.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?BU1'}</code></td><td class="border px-4 py-2">Turn on 6 only if button 1 is not pressed.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?BH1'}</code></td><td class="border px-4 py-2">Turn on 6 only if button 1 is held.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5>25.5'}</code></td><td class="border px-4 py-2">Turn on 6 if sensor 5 is warmer than 25.5 degrees.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5<18'}</code></td><td class="border px-4 py-2">Turn on 6 if sensor 5 is colder than 18 degrees.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5<-5'}</code></td><td class="border px-4 py-2">Turn on 6 if sensor 5 is colder than minus 5 degrees.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'7:1?T5>-10&T5<0'}</code></td><td class="border px-4 py-2">Turn on 7 if sensor 5 reads between minus 10 and zero degrees.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:0?T5g-0.5'}</code></td><td class="border px-4 py-2">Turn off 6 if sensor 5 reads minus 0.5 degrees or warmer.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5>=25'}</code></td><td class="border px-4 py-2">Turn on 6 if sensor 5 reads 25 degrees or more (T5g25 also works).</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5.2>25.5'}</code></td><td class="border px-4 py-2">Turn on 6 if the second sensor on pin 5 reads above 25.5 degrees.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?H4>50'}</code></td><td class="border px-4 py-2">Turn on 6 if the humidity on sensor 4 is above 50 percent.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?H4<30'}</code></td><td class="border px-4 py-2">Turn on 6 if the humidity on sensor 4 is below 30 percent.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5>25|T6>25'}</code></td><td class="border px-4 py-2">Turn on 6 if sensor 5 OR sensor 6 is warmer than 25 degrees.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5>25&H4>60&!D7'}</code></td><td class="border px-4 py-2">Turn on 6 if it is hot, humid and the fan (device 7) is not on yet.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:0?Sr&T5<20'}</code></td><td class="border px-4 py-2">Turn off 6 if it is day and cold.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?(T5>28|H4>70)&Sr'}</code></td><td class="border px-4 py-2">Turn on 6 if it is day and it is hot or very humid.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3>0'}</code></td><td class="border px-4 py-2">Turn on 6 only if dimmer 3 is lit (value above zero).</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3=100'}</code></td><td class="border px-4 py-2">Turn on 6 only if dimmer 3 is at full brightness (100).</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3g50'}</code></td><td class="border px-4 py-2">Turn on 6 only if the value of dimmer 3 is 50 or more.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3l50'}</code></td><td class="border px-4 py-2">Turn on 6 only if the value of dimmer 3 is 50 or less.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3>0&Ss'}</code></td><td class="border px-4 py-2">Turn on 6 if dimmer 3 is lit and it is night.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D93'}</code></td><td class="border px-4 py-2">Turn on 6 only if the Zigbee device with ID 93 is on (Zigbee device IDs start from 89).</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV93g100'}</code></td><td class="border px-4 py-2">Turn on 6 only if the brightness of Zigbee device 93 is 100 or more.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'93.1:2?D2'}</code></td><td class="border px-4 py-2">Zigbee: slot 93, sub-command 1, toggle - only if device 2 is on.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5<25|D1'}</code></td><td class="border px-4 py-2">Turn on 6 if sensor 5 is colder than 25 degrees OR device 1 is on (special case with a faulty sensor - see rule 7).</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?C3'}</code></td><td class="border px-4 py-2">Turn on 6 only if the ready-made condition from cell C3 is true (see rule 3).</td></tr>
</tbody>
</table>
<h4 class="text-lg font-bold text-black mt-4 mb-2">Several actions in one field</h4>
<table class="w-full mb-3 bg-white/70">
<thead>
<tr>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What to type in the Action field</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What happens</th>
</tr>
</thead>
<tbody>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1,7:0?D2'}</code></td><td class="border px-4 py-2">Turn on 6 always; turn off 7 only if device 2 is on.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D2,7:0?!D2'}</code></td><td class="border px-4 py-2">Two actions at once: turn on 6 if device 2 is on; turn off 7 if device 2 is off.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D1,12:1?!D1,18:0'}</code></td><td class="border px-4 py-2">Three actions: turn on 6 if device 1 is on; turn on 12 if device 1 is off; turn off 18 always.</td></tr>
</tbody>
</table>
<h4 class="text-lg font-bold text-black mt-4 mb-2">Important rules</h4>
<p class="rounded-xl border border-red-300 bg-red-50 px-4 py-2 font-bold text-red-700">The condition is checked once, when the limit is reached. Please read the rules below!</p>
<ol class="list-decimal ml-6 mb-3 space-y-1">
<li><b>The condition is checked once - at the moment the reading reaches the limit.</b> If it was NO at that moment, the action is skipped and will not run later by itself, even when the condition becomes YES. The sensor will "fire" again only after the reading moves back from the limit (by about 0.5 degrees, for humidity - 2 percent) and reaches it again. If the condition must be checked all the time, use a timer on the "Timers (cron)" page: in the Cron field write <code>${'0 * * * * * *'}</code> (every minute), in the Script field write, for example, <code>${'6:1?T5>28&Sr'}</code>. Then every minute the firmware looks at the temperature and the condition by itself.</li>
<li><b>The main On/Off slider in the pin row is stronger than any condition.</b> If it is off, the sensor is ignored completely and no actions are executed.</li>
<li><b>The length of the Action field of OneWire sensors is no more than 29 characters</b> including the condition (the field will not let you type more, and the firmware rejects a longer string as a whole). If the condition is long, write it once into a cell on the "Global Settings" page (the Conditions row, 12 cells, up to 46 characters each) and write it short in the action: <code>${'6:1?C3'}</code>. Only the condition goes into the cell, without the ? sign, for example <code>${'Ss&T5>25&!D7'}</code>. An empty or reset cell counts as NO (the action is blocked). Editing a cell immediately changes every place where it is used.</li>
<li><b>A condition works only in the Action fields.</b> Direct control of a device (the On/Off slider of the relay itself, an API or MQTT command straight to the relay) does not check conditions.</li>
<li><b>Numbers and minus.</b> After the comparison sign you can also write negative numbers: <code>${'T5<-5'}</code> - "temperature below minus 5 degrees", <code>${'T5>-0.5'}</code>, <code>${'T5g-12.3'}</code>. The minus goes right before the digits, without a space, and only to the right of the comparison sign (the entry <code>${'-5<T5'}</code> is an error). Only one digit is allowed after the point: <code>${'T5>25.55'}</code> is an error. Remember that the condition only "looks" at the temperature. The limit at which the sensor fires is still set in the Upper/Lower Temperature fields, where negative values are allowed too.</li>
<li><b>Sensor number on the pin:</b> <code>${'T5.2'}</code> - the second DS18B20 sensor on pin 5 (in the order of the sensor list of this pin). The number is one digit from 1 to 9. Without a number the first working sensor is used.</li>
<li><b>A faulty sensor</b> (no answer, read error) gives the answer "unknown", and the action is blocked even if ! stands before the condition. Exception: explicit truth through |. For example, <code>${'6:1?T5<25|D1'}</code> will fire with a faulty sensor 5 if device 1 is on.</li>
<li><b>If a condition is written with an error</b>, the page says nothing on save, and the action is silently skipped. A condition written directly in the Action field is not checked on save (library cells are checked). Typical mistakes: a forgotten digit (<code>${'R'}</code> instead of <code>${'D2'}</code>), an unclosed bracket, two signs in a row (<code>${'D1&&D2'}</code>), <code>${'=>'}</code> instead of <code>${'>='}</code>, an extra comma inside the condition. After saving, test the condition on a simple example.</li>
<li><b>A comma separates actions</b>, so there can be no commas inside a condition itself.</li>
<li><b>If you delete a device</b> that a condition refers to, the firmware replaces such a condition with the always-false <code>${'?0'}</code>. The action stops firing but does not become unconditional. Set a new condition.</li>
<li><b>If the upper and lower limits are equal</b>, the sensor works as a one-point thermostat: the upper action fires at a reading of the limit plus 0.5 and above, the lower one at the limit minus 0.5 and below (for humidity - plus and minus 2 percent).</li>
</ol>
</div>
</section>
</div>
  `
};

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
const TabOneWire = () => {
  const [varonewire, setOneWire] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [editingOneWire, setEditingOneWire] = useState(null);
  const [language, setLanguage] = useState('ru');
  const [showHelp, setShowHelp] = useState(false);
  const [expandedPins, setExpandedPins] = useState({});

  const i18n = {
    ru: {
      colId:       'ID',
      colPin:      'Пин',
      colSensor:   'Выбранный сенсор',
      colCount:    'Кол-во сенсоров',
      colOnOff:    'Вкл/Выкл',
      colActions:  'Действия',
      noSensors:   'Нет сенсоров для этого OneWire пина.',
      noData:      'Нет данных сенсора для этого OneWire пина. Проверьте подключение и подтягивающий резистор ~4,7 кОм.',
      noPins:      'Нет настроенных OneWire пинов!',
      errFetch:    (e) => `Ошибка получения данных: ${e}`,
      edit:        'Ред.',
      showHelp:    'Показать справку',
      hideHelp:    'Скрыть справку',
      title:       'OneWire(s) pin(s)',
      subtitle:    'Здесь настраиваются датчики температуры (DS18B20) и температуры/влажности (DHT22), подключённые к контроллеру, и действия при выходе показаний за заданные пределы.',
      expandHint:  'Нажмите на строку, чтобы посмотреть список датчиков на этом пине',
    },
    en: {
      colId:       'ID',
      colPin:      'Pin',
      colSensor:   'Selected sensor',
      colCount:    'Count of sensors',
      colOnOff:    'On/Off',
      colActions:  'Actions',
      noSensors:   'No connected sensors for this OneWire pin.',
      noData:      'No sensor data available for this OneWire pin. Check the wiring and the ~4.7kOhm pull-up resistor.',
      noPins:      'No available pins configured as OneWire!',
      errFetch:    (e) => `Error fetching sensor data: ${e}`,
      edit:        'Edit',
      showHelp:    'Show Help',
      hideHelp:    'Hide Help',
      title:       'OneWire(s) pin(s)',
      subtitle:    'Configure temperature (DS18B20) and temperature/humidity (DHT22) sensors connected to the controller, and the actions to run when readings go outside the set limits.',
      expandHint:  'Click the row to see the list of sensors on this pin',
    },
  };

  const T = i18n[language] || i18n['en'];

  const togglePin = (id) => setExpandedPins(prev => ({ ...prev, [id]: !prev[id] }));
  const clean = (s) => typeof s === 'string' ? s.replace(/[^\x20-\x7E\u0400-\u04FF]/g, '') : s;

  // ---------------------------------------------------------------------
  // Надёжное копирование в буфер обмена.
  // navigator.clipboard доступен только в защищённом контексте (HTTPS
  // или localhost). Устройство обычно открывают по обычному http://<ip>
  // в локальной сети — там navigator.clipboard отсутствует или его
  // вызов молча падает, поэтому кнопка "copy SN" не работала ни в
  // Firefox, ни в Chrome. Делаем откат на document.execCommand('copy')
  // через временный textarea, плюс явную обработку ошибок/отказа
  // в разрешении, чтобы пользователь видел результат в любом случае.
  // ---------------------------------------------------------------------
  const copyToClipboard = (text, buttonEl) => {
    const original = 'copy SN';
    const showResult = (ok) => {
      if (!buttonEl) return;
      buttonEl.textContent = ok ? 'Copied!' : 'Copy failed';
      setTimeout(() => { buttonEl.textContent = original; }, 1500);
    };

    const legacyFallbackCopy = () => {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.top = '-9999px';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        ta.setSelectionRange(0, ta.value.length);
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        showResult(ok);
      } catch (e) {
        showResult(false);
      }
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(
        () => showResult(true),
        () => legacyFallbackCopy()
      );
    } else {
      // Небезопасный контекст (обычный http://192.168.x.x) — сразу используем fallback.
      legacyFallbackCopy();
    }
  };

  useEffect(() => { initGlobalTooltip(); }, []);

  const updateSensorData = (data) => {
    if (!data) return;
    setOneWire((prevState) => prevState.map((device) => {
      const type = device.typsensor || device.typsensr;
      if (!device.sensors || ![1, 2].includes(type)) return device;
      const updatedSensors = device.sensors.map((sensor) => {
        if (type === 1) {
          const matched = data.ds18b20?.find((d) => d.addr === sensor.s_number);
          return matched ? { ...sensor, t: matched.temp } : sensor;
        } else if (type === 2) {
          const matched = data.dht22?.find((d) => d.id === device.id);
          return matched ? { ...sensor, t: matched.temp, humidity: matched.humidity } : sensor;
        }
        return sensor;
      });
      return { ...device, sensors: updatedSensors };
    }));
  };

  const refresh = () => {
    registerPoll('onewire_init', '/api/onewire/get', function(data) {
      setLanguage(data.lang || 'ru');
      setOneWire(data.pins || []);
      setError(null);
      
      // ── Загрузка показаний + polling через pollQueue (одно соединение, без нового handshake) ──
      registerPoll('sensors', '/api/state/sensors', function(sData) {
        if (sData !== null && sData !== undefined) updateSensorData(sData);
      }, { immediate: true });
    }, { immediate: true, oneShot: true });
  };

  useEffect(() => {
    refresh();
    return function() {
      unregisterPoll('onewire_init');
      unregisterPoll('sensors');
    };
  }, []);

  const closeModal = () => { setIsModalOpen(false); setSelectedSensor(null); setEditingOneWire(null); };

  const handleSensorUpdate = (updatedSensor) => {
    setOneWire(prev => prev.map(dev => dev.id === updatedSensor.oneWireId ? { ...dev, sensors: dev.sensors?.map(s => s.s_number === updatedSensor.s_number ? { ...s, ...updatedSensor } : s) } : dev));
    closeModal();
  };

  const openOneWireModal = (oneWire) => { setEditingOneWire(oneWire); setIsModalOpen(true); };

  const getTooltipText = (index) => {
    const langKey = language === 'ru' ? rulange1Wire : enlange1Wire;
    let tooltipText = langKey && langKey[index] ? langKey[index] : '';
    const words = tooltipText.split(' ');
    const lines = [];
    for (let i = 0; i < words.length; i += 15) lines.push(words.slice(i, i + 15).join(' '));
    return lines.join('<br>');
  };

  const Th = ({ title, tooltipIndex }) => html`
    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help" data-tip=${getTooltipText(tooltipIndex)}>
      ${title}
    </th>
  `;

  const ArrayOneWire = ({ device, index }) => {
    const isExpanded = !!expandedPins[device.id];
    const sensorType = device.typsensor || device.typsensr || 0;
    const numDevices = device.numdevices || device.numsens || 0;
    const hasChildren = sensorType !== 0 && numDevices > 0;
    return html`
      <tbody key=${'db-' + device.id}>
        <tr class="${index % 2 === 1 ? 'bg-white/80' : 'bg-sky-200/40'} hover:bg-slate-200/80 transition-colors ${hasChildren ? 'cursor-pointer' : ''}" onclick=${() => hasChildren && togglePin(device.id)}>
          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${device.id}</td>
          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${device.pins || device.pin}</td>
          <td class="px-6 py-4 text-sm text-slate-700 font-medium">${['None', 'DS18B20', 'DHT22'][sensorType]}</td>
          <td class="px-6 py-4 text-sm text-slate-700 font-medium">${numDevices}</td>
          <td class="px-6 py-4" onclick=${(e) => e.stopPropagation()}>
            <${MyPolzunok} value=${device.onoff || 0} onChange=${(v) => handleOWOnOffChange({ ...device, onoff: v })} />
          </td>
          <td class="px-6 py-4" onclick=${(e) => e.stopPropagation()}>
            <button class="text-blue-600 hover:text-blue-800 font-semibold transition-colors" onclick=${() => openOneWireModal(device)}>${T.edit}</button>
            ${hasChildren && html`<span class="ml-3 text-slate-400 text-xs" title=${T.expandHint}>${isExpanded ? '▲' : '▼'}</span>`}
          </td>
        </tr>
        ${isExpanded && hasChildren ? html`
          <tr>
            <td colspan="6" class="px-4 py-3 bg-gradient-to-r from-cyan-50/80 via-slate-50/60 to-blue-50/80 border-t">
              <${SensorTable} d=${device} />
            </td>
          </tr>
        ` : ''}
      </tbody>
    `;
  };

  const SensorTable = ({ d }) => {
    const sensorType = d.typsensor || d.typsensr || 0;
    const numDevices = d.numdevices || d.numsens || 0;
    if (sensorType === 0 || numDevices === 0) return html`<div class="px-4 py-2 text-slate-500 font-medium">${T.noSensors}</div>`;

    let sensors = d.sensors || [];
    const rowBg = ['bg-cyan-50/60 border-cyan-200/50', 'bg-slate-100/70 border-slate-200/50'];

    return sensors.length > 0 && Object.keys(sensors).length > 0
      ? html`<div class="flex flex-col gap-2 w-full">${sensors.map((s, idx) => html`
          <div class="w-full flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3 rounded-xl border ${rowBg[idx % 2]} backdrop-blur-sm shadow-sm">
            ${sensorType === 2 ? html`<span class="font-mono text-base font-semibold text-teal-700">DHT22</span>` : html`
              <span class="flex items-center gap-2">
                <span class="font-mono text-base font-semibold text-slate-500">SN</span>
                <span class="font-mono text-base text-slate-700 select-all">${clean(s.s_number)}</span>
                <button class="px-4 py-1.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-teal-400 to-cyan-500" onclick=${(e) => {
                  e.stopPropagation();
                  copyToClipboard(clean(s.s_number), e.target);
                }}>copy SN</button>
              </span>
            `}
            <span class="text-slate-300">|</span>
            <span class="font-bold text-cyan-700">${s.t ?? '—'}°C</span>
            ${sensorType === 2 && 'humidity' in s ? html`<span class="font-bold text-teal-600">${s.humidity}%</span>` : ''}
            <span class="text-slate-300">|</span>
            <${ActionBadge} isUpper=${true} value=${s.ut} unit="°C" str=${s.action_ut} />
            <${ActionBadge} isUpper=${false} value=${s.lt} unit="°C" str=${s.action_lt} />
            ${s.info ? html`<span class="text-slate-300">|</span><span class="font-semibold text-sm text-amber-600" style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:2px 10px;white-space:nowrap;">${s.info}</span>` : ''}
            <a href="#" class="ml-auto text-blue-600 font-semibold text-sm uppercase px-3 py-1 bg-white/70 rounded-lg" onclick=${(e) => {
              e.preventDefault();
              setSelectedSensor({ ...s, oneWireId: d.id, sensorType, pins: d.pins || d.pin });
              setIsModalOpen(true);
            }}>${T.edit}</a>
          </div>
        `)}</div>`
      : html`<div class="px-4 py-4 text-slate-500 font-medium bg-white/50 rounded-xl text-center w-full">${T.noData}</div>`;
  };

  const handleOneWireUpdate = (upd) => {
    setOneWire(prev => prev.map(dev => dev.id === upd.id ? upd : dev));
    closeModal();
  };

  const handleOWOnOffChange = (upd) => {
    setOneWire(prev => prev.map(dev => dev.id === upd.id ? { ...dev, onoff: upd.onoff } : dev));
  };

  return html`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col items-center" style="overflow-anchor:none;">
      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-2 uppercase">${T.title}</div>
        <p class="text-sm text-slate-600 mb-6 max-w-3xl">${T.subtitle}</p>
        <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6 overflow-auto">
          <table class="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr class="bg-teal-600/10 border-b border-teal-600/20">
                <${Th} title=${T.colId} tooltipIndex=${1} />
                <${Th} title=${T.colPin} tooltipIndex=${2} />
                <${Th} title=${T.colSensor} tooltipIndex=${3} />
                <${Th} title=${T.colCount} tooltipIndex=${4} />
                <${Th} title=${T.colOnOff} tooltipIndex=${5} />
                <${Th} title=${T.colActions} tooltipIndex=${6} />
              </tr>
            </thead>
            ${varonewire.length > 0
              ? varonewire.map((device, index) => html`<${ArrayOneWire} device=${device} index=${index} key=${device.id} />`)
              : html`<tbody><tr><td colspan="6" class="px-4 py-2">${error ? T.errFetch(error) : T.noPins}</td></tr></tbody>`}
          </table>
        </div>
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 p-4 rounded-2xl">
          <button class="px-8 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-teal-400 to-cyan-500" onclick=${(e) => { lockToggle(e); setShowHelp(!showHelp); }}>
            ${showHelp ? T.hideHelp : T.showHelp}
          </button>
        </div>
        ${showHelp && html`<div class="mt-2 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner w-full" style="max-height:70vh;overflow-y:auto;">${HELP_CONTENT[language] || HELP_CONTENT['en']}</div>`}
      </div>
    </div>
    ${isModalOpen && (selectedSensor
      ? html`<${ModalEditSensor} typsensor=${selectedSensor} oneWireId=${selectedSensor.oneWireId} pins=${selectedSensor.pins} onClose=${closeModal} onUpdate=${handleSensorUpdate} sensorType=${selectedSensor.sensorType} closeOnOverlayClick=${true} refresh=${refresh} />`
      : html`<${ModalOneWire} oneWire=${editingOneWire} onClose=${closeModal} onUpdate=${handleOneWireUpdate} closeOnOverlayClick=${true} refresh=${refresh} />`
    )}
  `;
};

export { TabOneWire };

