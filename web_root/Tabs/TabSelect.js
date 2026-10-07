import { lockToggle } from '../helpLock.js';


import { h, render, useState, useEffect, useRef, html, Router } from '../bundle.js';
import { registerPoll, unregisterPoll } from '../pollQueue.js';
import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';
import { MyPolzunok, Chart, DeveloperNote } from '../main.js';
import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire, ruLangselect } from '../rulang.js';
import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire, enLangselect } from '../enlang.js';

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
// Модульные компоненты — стабильный identity между ре-рендерами TabSelect.
// Preact не пересоздаёт DOM-узлы при каждом обновлении state родителя.
// ---------------------------------------------------------------------------
const RadioOption = ({ id, value, label, disabled = false, onChange, checked }) => html`
  <div class="relative">
    <input
      id="${id}_${value}"
      class="sr-only peer"
      type="radio"
      name="topin_${id}"
      value="${value}"
      checked=${checked}
      onChange=${onChange}
      disabled=${disabled}
      aria-label="${label}"
    />
    <label
      for="${id}_${value}"
      class="cursor-pointer px-3 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-300
             ${disabled ? 'text-gray-400 cursor-not-allowed opacity-60' : 'text-slate-700 hover:bg-black/5'}
             peer-checked:bg-gradient-to-r peer-checked:from-teal-500 peer-checked:to-cyan-500 peer-checked:text-white peer-checked:shadow-sm"
    >
      ${label}
    </label>
  </div>
`;

const Th = ({ title, tooltipIndex, center, getTooltipText }) => html`
  <th
    class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
    style=${center ? 'text-align: center' : ''}
    data-tip=${getTooltipText('langselect', tooltipIndex)}
  >
    ${title}
  </th>
`;

const ArraySelect = ({ d, selectedValues, isRowDisabled, handleRadioChange, handleFieldChange }) => {
  const isPhysicalPin = d.id < 89;
  const isZigbeePin = d.id >= 89;
  const currentTopin = selectedValues[`topin_${d.id}`];

  return html`
  <tr class="${isRowDisabled(d.id)
      ? 'bg-red-200/50 opacity-50 pointer-events-none'
      : d.id % 2 === 1
        ? 'bg-white/80'
        : 'bg-sky-200/40'
    } hover:bg-slate-200/80 transition-colors">
    <td class="px-6 py-2 text-sm text-slate-800">${d.id}</td>
    <td class="px-6 py-2 text-sm text-slate-800 font-medium">${isZigbeePin ? 'Z2M' : d.pins}</td>
    <td class="px-2 py-2">
      <div class="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
        ${isPhysicalPin ? html`
          <${RadioOption} id=${d.id} value="0"  label="NONE"     checked=${currentTopin === '0'}  onChange=${handleRadioChange} />
          <${RadioOption} id=${d.id} value="3"  label="SWITCH"   checked=${currentTopin === '3'}  onChange=${handleRadioChange} />
          <${RadioOption} id=${d.id} value="1"  label="BUTTON"   checked=${currentTopin === '1'}  onChange=${handleRadioChange} />
          <${RadioOption} id=${d.id} value="2"  label="DEVICE"   checked=${currentTopin === '2'}  onChange=${handleRadioChange} />
          <${RadioOption} id=${d.id} value="4"  label="1-WIRE"   checked=${currentTopin === '4'}  onChange=${handleRadioChange} />
          <${RadioOption} id=${d.id} value="5"  label="PWM"      disabled=${d.pwm == 0} checked=${currentTopin === '5'}  onChange=${handleRadioChange} />
          <${RadioOption} id=${d.id} value="8"  label="Enc.OutA" checked=${currentTopin === '8'}  onChange=${handleRadioChange} />
          <${RadioOption} id=${d.id} value="9"  label="Enc.OutB" checked=${currentTopin === '9'}  onChange=${handleRadioChange} />
          <${RadioOption} id=${d.id} value="10" label="Security" disabled=${d.monitoring == 0} checked=${currentTopin === '10'} onChange=${handleRadioChange} />
        ` : html`
          <${RadioOption} id=${d.id} value="0"  label="NONE"     checked=${currentTopin === '0'}  onChange=${handleRadioChange} />
          <${RadioOption} id=${d.id} value="11" label="Zigbee"   checked=${currentTopin === '11'} onChange=${handleRadioChange} />
        `}
      </div>
    </td>
  </tr>
  ${isZigbeePin && currentTopin === '11' && html`
  <tr class="bg-slate-50/80">
    <td colspan="3" class="px-6 py-3">
      <div class="flex flex-col gap-2">
        <div class="flex flex-col sm:flex-row gap-2">
          <input type="text" placeholder="IEEE Address (e.g. 588e81fffe36a343)"
            value=${selectedValues[`zbee_ieee_${d.id}`] || ''}
            onInput=${(e) => {
              let v = e.target.value.replace(/^0x/i, '').replace(/[^0-9a-fA-F]/g, '').slice(0, 16);
              handleFieldChange(d.id, 'zbee_ieee', v);
            }}
            class="text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-400 flex-1" />
          <input type="text" placeholder="Info (e.g. Lamp Kuhnya)"
            maxlength="29"
            value=${selectedValues[`zbee_label_${d.id}`] || ''}
            onInput=${(e) => handleFieldChange(d.id, 'zbee_label', e.target.value)}
            class="text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-400 flex-1" />
        </div>
      </div>
    </td>
  </tr>
  `}
`;
};

// ---------------------------------------------------------------------------
// Help Content
// ---------------------------------------------------------------------------
const HELP_CONTENT = {
  ru: html`
    <div class="mytext space-y-6 font-sans text-base leading-relaxed text-slate-700 [&_code]:font-sans [&_code]:font-semibold [&_pre]:font-sans">
      <section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">Для чего эта страница</h2>
        <p>Здесь вы назначаете роль каждому пину контроллера: физическому пину STM32 или виртуальному пину Zigbee. Пока пину не назначена роль (тип <b>NONE</b>), он нигде не используется и не появляется на других страницах.</p>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Как назначить роль пину</h3>
          <ol class="list-decimal ml-6 space-y-2">
            <li>Раскройте нужный раздел: <b>«Физические пины STM32»</b> или <b>«Виртуальные пины Zigbee»</b>.</li>
            <li>В строке нужного пина выберите тип.</li>
            <li>Нажмите <b>Submit</b> вверху страницы. Настройки записываются на USB-флешку, поэтому кнопка на несколько секунд становится неактивной.</li>
            <li>Перейдите на страницу, соответствующую выбранному типу, и настройте пин там. Пин сам появится в её таблице.</li>
          </ol>
        </div>
      </section>

      <section class="rounded-2xl border-2 bg-indigo-50 border-indigo-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">Типы пинов</h2>
        <table class="w-full bg-white/70">
          <thead>
            <tr>
              <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Тип</th>
              <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что это</th>
              <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Где настраивается</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2"><b>NONE</b></td>
              <td class="border px-4 py-2">Пин не используется. При переводе пина в NONE все его связи удаляются автоматически (см. ниже).</td>
              <td class="border px-4 py-2">Не требуется</td>
            </tr>
            <tr>
              <td class="border px-4 py-2"><b>SWITCH</b></td>
              <td class="border px-4 py-2">Вход настенного выключателя.</td>
              <td class="border px-4 py-2">Страница <b>Switch(es) pin(s)</b>: там задаётся, какие устройства (пины DEVICE или Zigbee) он включает.</td>
            </tr>
            <tr>
              <td class="border px-4 py-2"><b>BUTTON</b></td>
              <td class="border px-4 py-2">Физическая кнопка.</td>
              <td class="border px-4 py-2">Страница <b>Button(s) pin(s)</b>: действия на одно нажатие, двойное нажатие и удержание.</td>
            </tr>
            <tr>
              <td class="border px-4 py-2"><b>DEVICE</b></td>
              <td class="border px-4 py-2">Выход, к которому подключено исполнительное устройство: реле, лампа, мотор и т.п. В условиях на других страницах обозначается буквой <b>D</b>: <b>D6</b> означает, что устройство с ID 6 включено.</td>
              <td class="border px-4 py-2">Управляется со страниц Button, Switch, Timer(s) и других. Zigbee-устройства добавляются отдельно, в разделе «Виртуальные пины Zigbee».</td>
            </tr>
            <tr>
              <td class="border px-4 py-2"><b>1-WIRE</b></td>
              <td class="border px-4 py-2">Вход температурного датчика DS18B20 или DHT22.</td>
              <td class="border px-4 py-2">Страница <b>OneWire(s) pin(s)</b>.</td>
            </tr>
            <tr>
              <td class="border px-4 py-2"><b>PWM</b></td>
              <td class="border px-4 py-2">ШИМ-выход: яркость лампы, скорость вентилятора.</td>
              <td class="border px-4 py-2">Страницы Timer(s) и PID Controller(s).</td>
            </tr>
            <tr>
              <td class="border px-4 py-2"><b>Enc.OutA</b>, <b>Enc.OutB</b></td>
              <td class="border px-4 py-2">Выходы A и B энкодера.</td>
              <td class="border px-4 py-2">Страница <b>Encoder(s) pin(s)</b>.</td>
            </tr>
            <tr>
              <td class="border px-4 py-2"><b>Security</b></td>
              <td class="border px-4 py-2">Пин, к которому подключаются геркон или датчик движения для отслеживания изменения их состояния.</td>
              <td class="border px-4 py-2">Страница <b>Security</b>, блок <b>Security Pins</b>.</td>
            </tr>
          </tbody>
        </table>
        <div class="mt-2 text-slate-700">
          Если переключатель <b>PWM</b> или <b>Security</b> у пина неактивен, этот пин такую роль выполнять не может.
        </div>
      </section>

      <section class="rounded-2xl border-2 bg-emerald-50 border-emerald-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">Виртуальные пины Zigbee</h2>
        <p>Каждое Zigbee-устройство занимает один виртуальный пин. У такого пина всего два типа: <b>NONE</b> (свободен) и <b>Zigbee</b> (занят устройством).</p>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Как добавить устройство</h3>
          <ol class="list-decimal ml-6 space-y-2">
            <li>В разделе <b>«Виртуальные пины Zigbee»</b> выберите свободный пин и установите тип <b>Zigbee</b>.</li>
            <li>В появившейся строке введите <b>IEEE Address</b> устройства и, при желании, название в поле <b>Info</b> (до 29 символов).</li>
            <li>Нажмите <b>Submit</b>. Дальше устройство настраивается на странице <b>Zigbee Devices</b>.</li>
          </ol>
        </div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Как удалить устройство</h3>
          <ol class="list-decimal ml-6 space-y-2">
            <li>Найдите устройство в разделе <b>«Виртуальные пины Zigbee»</b>.</li>
            <li>Установите тип пина <b>NONE</b>.</li>
            <li>Нажмите <b>Submit</b>. Адрес, название и все связи устройства на других страницах удаляются автоматически.</li>
          </ol>
        </div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">IEEE Address</h3>
          <p>Уникальный 64-битный адрес Zigbee-устройства, 16 шестнадцатеричных символов (например, <b>588e81fffe36a343</b>). Его можно найти в Zigbee2MQTT или на наклейке устройства. Буквы в верхнем регистре устройство само приводит к нижнему.</p>
        </div>
      </section>

      <section class="rounded-2xl border-2 bg-amber-50 border-amber-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">Автоматическая очистка связей</h2>
        <p>Когда любой пин (физический или Zigbee) переводится в <b>NONE</b>, контроллер сам удаляет все ссылки на его ID:</p>
        <ul class="list-disc ml-6 space-y-1">
          <li>связи между пинами (Switch);</li>
          <li>действия кнопок и охранных датчиков (одно нажатие, двойное нажатие, удержание);</li>
          <li>действия таймеров;</li>
          <li>действия датчиков 1-Wire (DS18B20 и DHT22);</li>
          <li>действия Zigbee-кнопок (виртуальные пины);</li>
          <li>действия Sunrise / Sunset (рассвет и закат);</li>
          <li>привязку энкодеров к Zigbee;</li>
          <li>PID-регуляторы, привязанные к этому PWM-пину;</li>
          <li>условия, в которых встречается этот ID, как в полях действий, так и в библиотеке условий.</li>
        </ul>
        <p>Если пин работал как <b>PWM</b> или <b>DEVICE</b>, его выход сразу выключается.</p>
        <p>Заходить на каждую страницу и искать, где пин использовался, не нужно: всё очищается одним действием.</p>
        <p class="rounded-xl border border-red-300 bg-red-50 px-4 py-2 font-bold text-red-700">Очистка необратима. После нажатия Submit вернуть удалённые связи можно только вручную.</p>
      </section>

      <section class="rounded-2xl border-2 bg-violet-50 border-violet-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">Переключатель SIM800L</h2>
        <p>Переключатель SIM800L вверху страницы включает работу с GSM-модулем. Модуль подключается к пинам UART2, поэтому при включённом переключателе эти два пина (ID 1 и ID 35) блокируются и их тип изменить нельзя.</p>
        <p>Номер телефона и остальные параметры модуля задаются на странице <b>Security</b>, в блоке <b>SIM800L Settings</b>.</p>
      </section>
    </div>
  `,
  en: html`
    <div class="mytext space-y-6 font-sans text-base leading-relaxed text-slate-700 [&_code]:font-sans [&_code]:font-semibold [&_pre]:font-sans">
      <section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">What this page is for</h2>
        <p>Here you assign a role to each controller pin: a physical STM32 pin or a virtual Zigbee pin. While a pin has no role (type <b>NONE</b>), it is not used anywhere and does not appear on other pages.</p>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">How to assign a role to a pin</h3>
          <ol class="list-decimal ml-6 space-y-2">
            <li>Expand the section you need: <b>"Physical pins of STM32"</b> or <b>"Virtual pins of Zigbee"</b>.</li>
            <li>Choose the type in the row of the pin.</li>
            <li>Click <b>Submit</b> at the top of the page. The settings are written to the USB flash drive, so the button stays inactive for a few seconds.</li>
            <li>Open the page that matches the chosen type and configure the pin there. The pin appears in its table by itself.</li>
          </ol>
        </div>
      </section>

      <section class="rounded-2xl border-2 bg-indigo-50 border-indigo-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">Pin types</h2>
        <table class="w-full bg-white/70">
          <thead>
            <tr>
              <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Type</th>
              <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What it is</th>
              <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Where it is configured</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2"><b>NONE</b></td>
              <td class="border px-4 py-2">The pin is not used. When a pin is set to NONE, all its connections are removed automatically (see below).</td>
              <td class="border px-4 py-2">Not required</td>
            </tr>
            <tr>
              <td class="border px-4 py-2"><b>SWITCH</b></td>
              <td class="border px-4 py-2">Input of a wall switch.</td>
              <td class="border px-4 py-2">The <b>Switch(es) pin(s)</b> page: it sets which devices (DEVICE pins or Zigbee) the switch turns on.</td>
            </tr>
            <tr>
              <td class="border px-4 py-2"><b>BUTTON</b></td>
              <td class="border px-4 py-2">Physical button.</td>
              <td class="border px-4 py-2">The <b>Button(s) pin(s)</b> page: actions for a single click, a double click and a long press.</td>
            </tr>
            <tr>
              <td class="border px-4 py-2"><b>DEVICE</b></td>
              <td class="border px-4 py-2">An output with an actuator connected: a relay, lamp, motor, etc. In conditions on other pages it is written with the letter <b>D</b>: <b>D6</b> means that the device with ID 6 is on.</td>
              <td class="border px-4 py-2">Controlled from the Button, Switch, Timer(s) and other pages. Zigbee devices are added separately, in the "Virtual pins of Zigbee" section.</td>
            </tr>
            <tr>
              <td class="border px-4 py-2"><b>1-WIRE</b></td>
              <td class="border px-4 py-2">Input of a DS18B20 or DHT22 temperature sensor.</td>
              <td class="border px-4 py-2">The <b>OneWire(s) pin(s)</b> page.</td>
            </tr>
            <tr>
              <td class="border px-4 py-2"><b>PWM</b></td>
              <td class="border px-4 py-2">PWM output: lamp brightness, fan speed.</td>
              <td class="border px-4 py-2">The Timer(s) and PID Controller(s) pages.</td>
            </tr>
            <tr>
              <td class="border px-4 py-2"><b>Enc.OutA</b>, <b>Enc.OutB</b></td>
              <td class="border px-4 py-2">Encoder outputs A and B.</td>
              <td class="border px-4 py-2">The <b>Encoder(s) pin(s)</b> page.</td>
            </tr>
            <tr>
              <td class="border px-4 py-2"><b>Security</b></td>
              <td class="border px-4 py-2">A pin for connecting a reed switch or a motion sensor to monitor their state changes.</td>
              <td class="border px-4 py-2">The <b>Security</b> page, the <b>Security Pins</b> block.</td>
            </tr>
          </tbody>
        </table>
        <div class="mt-2 text-slate-700">
          If the <b>PWM</b> or <b>Security</b> option of a pin is inactive, that pin cannot perform this role.
        </div>
      </section>

      <section class="rounded-2xl border-2 bg-emerald-50 border-emerald-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">Virtual pins of Zigbee</h2>
        <p>Each Zigbee device takes one virtual pin. Such a pin has only two types: <b>NONE</b> (free) and <b>Zigbee</b> (taken by a device).</p>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">How to add a device</h3>
          <ol class="list-decimal ml-6 space-y-2">
            <li>In the <b>"Virtual pins of Zigbee"</b> section choose a free pin and set the type to <b>Zigbee</b>.</li>
            <li>In the row that appears, enter the device <b>IEEE Address</b> and, if you wish, a name in the <b>Info</b> field (up to 29 characters).</li>
            <li>Click <b>Submit</b>. After that the device is configured on the <b>Zigbee Devices</b> page.</li>
          </ol>
        </div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">How to delete a device</h3>
          <ol class="list-decimal ml-6 space-y-2">
            <li>Find the device in the <b>"Virtual pins of Zigbee"</b> section.</li>
            <li>Set the pin type to <b>NONE</b>.</li>
            <li>Click <b>Submit</b>. The address, the name and all connections of this device on other pages are removed automatically.</li>
          </ol>
        </div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">IEEE Address</h3>
          <p>The unique 64-bit address of a Zigbee device, 16 hexadecimal characters (e.g. <b>588e81fffe36a343</b>). Find it in Zigbee2MQTT or on the device label. Upper-case letters are converted to lower case by the controller.</p>
        </div>
      </section>

      <section class="rounded-2xl border-2 bg-amber-50 border-amber-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">Automatic connection cleanup</h2>
        <p>When any pin (physical or Zigbee) is set to <b>NONE</b>, the controller automatically removes all references to its ID:</p>
        <ul class="list-disc ml-6 space-y-1">
          <li>connections between pins (Switch);</li>
          <li>actions of buttons and security sensors (single click, double click, long press);</li>
          <li>timer actions;</li>
          <li>actions of 1-Wire sensors (DS18B20 and DHT22);</li>
          <li>actions of Zigbee buttons (virtual pins);</li>
          <li>Sunrise / Sunset actions;</li>
          <li>encoder-to-Zigbee bindings;</li>
          <li>PID controllers bound to this PWM pin;</li>
          <li>conditions that contain this ID, both in action fields and in the conditions library.</li>
        </ul>
        <p>If the pin worked as <b>PWM</b> or <b>DEVICE</b>, its output is switched off immediately.</p>
        <p>You do not need to visit each page to find where the pin was used: everything is cleaned up in one action.</p>
        <p class="rounded-xl border border-red-300 bg-red-50 px-4 py-2 font-bold text-red-700">The cleanup cannot be undone. After you click Submit, the removed connections can only be restored manually.</p>
      </section>

      <section class="rounded-2xl border-2 bg-violet-50 border-violet-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">SIM800L switch</h2>
        <p>The SIM800L switch at the top of the page enables work with the GSM module. The module is connected to the UART2 pins, so while the switch is on these two pins (ID 1 and ID 35) are locked and their type cannot be changed.</p>
        <p>The phone number and the other module parameters are set on the <b>Security</b> page, in the <b>SIM800L Settings</b> block.</p>
      </section>
    </div>
  `
};

function TabSelect({ }) {
  const [varselect, setSelect] = useState(null);
  const [selectedValues, setSelectedValues] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [gpsEnabled, setGpsEnabled] = useState(false);
  const [language, setLanguage] = useState('ru');
  const [expandedSections, setExpandedSections] = useState({ physical: false, zigbee: false });
  const [showHelp, setShowHelp] = useState(false);
  const lastChangeTime = useRef(0);
  const lastPollData = useRef(null);
  const serverSnapshot = useRef({});
  const serverSim800l = useRef(false);

  const buildSnapshotEntry = (d) => ({
    topin: d.topin.toString(),
    zbee_ieee: d.zbee_ieee || '',
    zbee_endpoint: d.zbee_endpoint || 1,
    clusters: d.clusters || [6],
    zbee_label: d.zbee_label || '',
  });

  // Инициализируем глобальный tooltip один раз при монтировании
  useEffect(() => { initGlobalTooltip(); }, []);

  const handleGpsToggle = (enabled) => {
    setGpsEnabled(enabled);
    lastChangeTime.current = Date.now();
  };

  const isRowDisabled = (id) => {
    return gpsEnabled && (id === 1 || id === 35);
  };

  const PAGE_SIZE = 30;

  const fetchPage = (offset) =>
    fetch(`/api/select/get?offset=${offset}&limit=${PAGE_SIZE}`, { cache: 'no-store' })
      .then((r) => r.json());

  const refresh = () =>
    fetchPage(0).then(async (first) => {
      const total = first.total || first.data.length;
      const data = [...first.data];
      let offset = first.data.length;
      while (offset < total) {
        const page = await fetchPage(offset);
        data.push(...page.data);
        offset += page.data.length;
        if (page.data.length === 0) break;
      }
      return { ...first, data, total: data.length };
    }).then((r) => {
      const data = r.data || r;
      setSelect(data);
      setGpsEnabled(r.sim800l === 1);
      serverSim800l.current = (r.sim800l === 1);
      if (r.lang) setLanguage(r.lang);

      const initialValues = {};
      data.forEach((d) => {
        initialValues[`topin_${d.id}`] = d.topin.toString();
        if (d.zbee_ieee !== undefined) initialValues[`zbee_ieee_${d.id}`] = d.zbee_ieee;
        if (d.zbee_endpoint !== undefined) initialValues[`zbee_endpoint_${d.id}`] = d.zbee_endpoint;
        if (d.zbee_label !== undefined) initialValues[`zbee_label_${d.id}`] = d.zbee_label;
      });
      setSelectedValues(initialValues);

      const snap = {};
      data.forEach((d) => { snap[d.id] = buildSnapshotEntry(d); });
      serverSnapshot.current = snap;
    });

  useEffect(() => {
    let active = true;

    registerPoll('select', `/api/select/get?offset=0&limit=${PAGE_SIZE}`, function(r) {
      if (!active) return;
      if (Date.now() - lastChangeTime.current < 3000) return;
      if (r !== null && r !== undefined) {
        const total = r.total || r.data.length;
        const firstPageStr = JSON.stringify(r.data);
        if (firstPageStr !== lastPollData.current) {
          lastPollData.current = firstPageStr;
          refresh();
        }
      }
    }, { immediate: true });

    return function() {
      active = false;
      unregisterPoll('select');
    };
  }, []);

  useEffect(() => {
    let timer;
    if (isButtonDisabled && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsButtonDisabled(false);
      setSubmissionStatus(null);
    }
    return () => clearTimeout(timer);
  }, [isButtonDisabled, countdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const changed = [];
    varselect.forEach((d) => {
      const snap = serverSnapshot.current[d.id] || {};
      if (d.id < 89) {
        const raw = selectedValues[`topin_${d.id}`];
        const cur = raw !== undefined ? raw : d.topin.toString();
        if (cur !== snap.topin) {
          changed.push({ id: d.id, topin: parseInt(cur) });
        }
      } else {
        const curTopin = selectedValues[`topin_${d.id}`] !== undefined
          ? selectedValues[`topin_${d.id}`]
          : d.topin.toString();
        const cur = {
          zbee_ieee: selectedValues[`zbee_ieee_${d.id}`] || '',
          zbee_label: selectedValues[`zbee_label_${d.id}`] || '',
        };
        const isDirty =
          curTopin !== snap.topin ||
          cur.zbee_ieee !== snap.zbee_ieee ||
          cur.zbee_label !== snap.zbee_label;
        if (isDirty) {
            if (curTopin === '0') {
              changed.push({
                id: d.id,
                topin: 0,
                zbee_ieee: '',
                zbee_endpoint: 1,
                clusters: [6],
                zbee_label: '',
              });
            } else {
              changed.push({
                id: d.id,
                zbee_ieee: cur.zbee_ieee,
                zbee_endpoint: 1,
                clusters: d.clusters || [6],
                zbee_label: cur.zbee_label,
              });
            }
        }
      }
    });

    const gpsChanged = gpsEnabled !== serverSim800l.current;

    setIsButtonDisabled(true);
    setCountdown(3);

    if (changed.length === 0 && !gpsChanged) {
      setSubmissionStatus('success');
      return;
    }

    setSubmissionStatus('submitting');

    try {
      const CHUNK_SIZE = 20; // ~20 записей ≈ 3КБ, комфортно для mg_iobuf
      const jsonBase = { lang: language, sim800l: gpsEnabled ? 1 : 0 };

      // Если изменился только тумблер SIM800L — changed пуст, но запрос всё
      // равно нужен: бэкенд применит sim800l и запишет setings.ini.
      // Пустой data:[] безопасен — parse_select_json пропустит цикл по пинам.
      const slices = [];
      for (let i = 0; i < changed.length; i += CHUNK_SIZE) {
        slices.push(changed.slice(i, i + CHUNK_SIZE));
      }
      if (slices.length === 0) slices.push([]);

      for (const slice of slices) {
        const response = await fetch('/api/select/set', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...jsonBase, data: slice })
        });
        if (!response.ok) throw new Error('Network response was not ok');
      }

      serverSim800l.current = gpsEnabled;
      setSubmissionStatus('success');

      const updatedValues = {};
      changed.forEach((item) => {
        if (item.topin !== undefined) updatedValues[`topin_${item.id}`] = item.topin.toString();
        if (item.zbee_ieee !== undefined) updatedValues[`zbee_ieee_${item.id}`] = item.zbee_ieee;
        if (item.zbee_label !== undefined) updatedValues[`zbee_label_${item.id}`] = item.zbee_label;
      });
      setSelectedValues((prevState) => ({ ...prevState, ...updatedValues }));
      lastChangeTime.current = 0;

      refresh();
    } catch (error) {
      setSubmissionStatus('error');
      console.error('Error:', error);
    }
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setSelectedValues((prevState) => ({ ...prevState, [name]: value }));
    lastChangeTime.current = Date.now();
  };

  const handleFieldChange = (id, field, value) => {
    setSelectedValues(prev => ({ ...prev, [`${field}_${id}`]: value }));
    lastChangeTime.current = Date.now();
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  if (!varselect) return '';

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // getTooltipText передаётся в Th как prop (зависит от language)
  const getTooltipText = (key, index) => {
    const langObject = { langselect: language === 'ru' ? ruLangselect : enLangselect };
    let tooltipText =
      langObject[key] && langObject[key][index] ? langObject[key][index] : '';
    const words = tooltipText.split(' ');
    const lines = [];
    for (let i = 0; i < words.length; i += 15) {
      lines.push(words.slice(i, i + 15).join(' '));
    }
    return lines.join('<br>');
  };

  return html`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col justify-start items-center" style="overflow-anchor:none;">
      <!-- Decorative background glow -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
          Select pin(s)
        </div>

        <form onSubmit=${handleSubmit} class="flex-grow flex flex-col justify-center items-center w-full">
          <div class="w-full">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <button
                type="submit"
                class=${`px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${isButtonDisabled
                  ? 'bg-gray-400 cursor-not-allowed opacity-70 hover:scale-100 hover:shadow-none'
                  : 'bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40'
                }`}
                disabled=${isButtonDisabled}
              >
                ${isButtonDisabled ? `Please wait ${countdown} sec.` : 'Submit'}
              </button>

              <div class="flex items-center gap-3">
                <span class="text-slate-600 font-bold uppercase tracking-widest text-2xl drop-shadow-sm">SIM800L</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    class="sr-only peer"
                    checked=${gpsEnabled}
                    onChange=${(e) => handleGpsToggle(e.target.checked)}
                  />
                  <div class="w-[42px] h-[22px] bg-slate-200/80 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-300/50 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-teal-400 peer-checked:to-cyan-500 shadow-inner"></div>
                </label>
              </div>
            </div>

            ${submissionStatus === 'success' && html`
              <div class="mb-6 bg-green-50/80 backdrop-blur-sm border border-green-200 text-green-700 px-4 py-3 rounded-xl shadow-sm" role="alert">
                <strong class="font-bold">Успех! </strong>
                <span class="block sm:inline">Данные успешно сохранены. Идет запись на USB флешку. Кнопка станет активной через ${countdown} секунд.</span>
              </div>
            `}
            ${submissionStatus === 'error' && html`
              <div class="mb-6 bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-sm" role="alert">
                <strong class="font-bold">Ошибка!</strong>
                <span class="block sm:inline">Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз через ${countdown} секунд.</span>
              </div>
            `}

            <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6 overflow-auto">
              <div class="overflow-x-auto w-full">
                <table class="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <${Th} title="ID" tooltipIndex=${1} getTooltipText=${getTooltipText} />
                      <${Th} title="Pin" tooltipIndex=${2} getTooltipText=${getTooltipText} />
                      <${Th} title="Type(s) of pin(s)" tooltipIndex=${3} center=${true} getTooltipText=${getTooltipText} />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/40">
                    ${varselect && html`
                      <!-- Physical pins section -->
                      <tr class="bg-gradient-to-r from-slate-100 to-slate-50 cursor-pointer hover:from-slate-200 hover:to-slate-100 transition-colors" onclick=${() => toggleSection('physical')}>
                        <td colspan="3" class="px-6 py-3 text-lg font-bold text-slate-700">
                          <span class="mr-2 text-slate-500">${expandedSections.physical ? '▼' : '▶'}</span>
                          ${language === 'ru' ? 'Физические пины STM32' : 'Physical pins of STM32'}
                          <span class="ml-2 text-sm font-normal text-slate-500">(${varselect.filter(d => d.id < 89).length})</span>
                        </td>
                      </tr>
                      ${expandedSections.physical && varselect.filter(d => d.id < 89).map((d) => html`<${ArraySelect} d=${d} selectedValues=${selectedValues} isRowDisabled=${isRowDisabled} handleRadioChange=${handleRadioChange} handleFieldChange=${handleFieldChange} />`)}
                      
                      <!-- Zigbee virtual pins section -->
                      <tr class="bg-gradient-to-r from-cyan-100 to-cyan-50 cursor-pointer hover:from-cyan-200 hover:to-cyan-100 transition-colors" onclick=${() => toggleSection('zigbee')}>
                        <td colspan="3" class="px-6 py-3 text-lg font-bold text-cyan-700">
                          <span class="mr-2 text-cyan-500">${expandedSections.zigbee ? '▼' : '▶'}</span>
                          ${language === 'ru' ? 'Виртуальные пины Zigbee' : 'Virtual pins of Zigbee'}
                          <span class="ml-2 text-sm font-normal text-cyan-500">(${varselect.filter(d => d.id >= 89).length})</span>
                        </td>
                      </tr>
                      ${expandedSections.zigbee && varselect.filter(d => d.id >= 89).map((d) => html`<${ArraySelect} d=${d} selectedValues=${selectedValues} isRowDisabled=${isRowDisabled} handleRadioChange=${handleRadioChange} handleFieldChange=${handleFieldChange} />`)}
                    `}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex justify-between items-center mb-4 mt-2">
              <div class="flex justify-end flex-1">
                <button
                  type="submit"
                  class=${`px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${isButtonDisabled
                    ? 'bg-gray-400 cursor-not-allowed opacity-70 hover:scale-100 hover:shadow-none'
                    : 'bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40'
                  }`}
                  disabled=${isButtonDisabled}
                >
                  ${isButtonDisabled ? `Please wait ${countdown} sec.` : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </form>

        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 p-4 rounded-2xl">
          <button class="px-8 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-teal-400 to-cyan-500" onclick=${(e) => { lockToggle(e); setShowHelp(!showHelp); }}>
            ${showHelp ? (language === 'ru' ? 'Скрыть справку' : 'Hide Help') : (language === 'ru' ? 'Показать справку' : 'Show Help')}
          </button>
        </div>
        ${showHelp && html`<div class="mt-2 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner w-full" style="max-height:70vh;overflow-y:auto;">${HELP_CONTENT[language] || HELP_CONTENT['en']}</div>`}
      </div>
    </div>
  `;
}

export { TabSelect };

