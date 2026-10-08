import { lockToggle } from '../helpLock.js';
import { ModalSIM800L, maskPhone, EyeIcon, EyeSlashIcon } from '../Modals/ModalSIM800L.js';
import { ModalSecurity } from '../Modals/ModalSecurity.js';
import { h, render, useState, useEffect, useRef, useContext, html, Router } from '../bundle.js';
import { registerPoll, unregisterPoll } from '../pollQueue.js';
import { StateContext } from '../context.js';
import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';
import { MyPolzunok, Chart, DeveloperNote } from '../main.js';
import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire, ruLangsecurity, ruLangsecuritypins } from '../rulang.js';
import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire, enLangsecurity, enLangsecuritypins } from '../enlang.js';
import { condHelpTitle } from '../condlib.js';

function initGlobalTooltip() {
  if (document.__tipInited) return;
  document.__tipInited = true;
  const tip = document.createElement('div');
  tip.id = '__global_tip';
  Object.assign(tip.style, {
    position: 'fixed', zIndex: '99999', maxWidth: '280px', background: '#1a2332', color: '#e8f4f8',
    padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(0,188,188,0.35)', fontSize: '12px',
    lineHeight: '1.6', boxShadow: '0 6px 20px rgba(0,0,0,0.45)', pointerEvents: 'none', whiteSpace: 'normal',
    display: 'none', transition: 'opacity 0.12s ease', opacity: '0',
  });
  document.body.appendChild(tip);
  let hideTimer = null;
  function show(el) {
    clearTimeout(hideTimer);
    tip.innerHTML = el.dataset.tip;
    tip.style.display = 'block'; tip.style.opacity = '0';
    tip.style.left = '0px'; tip.style.top = '0px';
    requestAnimationFrame(() => {
      const tw = tip.offsetWidth; const th = tip.offsetHeight; const vw = window.innerWidth;
      const r = el.getBoundingClientRect();
      let left = r.left + r.width / 2 - tw / 2;
      left = Math.max(8, Math.min(left, vw - tw - 8));
      let top = r.top - th - 8; if (top < 8) top = r.bottom + 8;
      tip.style.left = left + 'px'; tip.style.top = top + 'px'; tip.style.opacity = '1';
    });
  }
  function hide() { hideTimer = setTimeout(() => { tip.style.opacity = '0'; setTimeout(() => { tip.style.display = 'none'; }, 120); }, 80); }
  document.addEventListener('mouseover', e => { const el = e.target.closest('[data-tip]'); if (el) show(el); });
  document.addEventListener('mouseout', e => { const el = e.target.closest('[data-tip]'); if (el) hide(); });
  // Touch screens: tap on an element with a tooltip shows it, tap elsewhere hides it
  document.addEventListener('click', e => { if (!window.matchMedia('(pointer: coarse)').matches) return; const el = e.target.closest('[data-tip]'); if (el) show(el); else hide(); });
}

const TabSecurity = () => {
  const [sim800lData, setSim800lData] = useState({ lang: 'ru', sim800l: 0, onoff: 0, tel: '', info: '' });
  const [isModalOpenSim800L, setIsModalOpenSim800L] = useState(false);
  const [showHelpSim800L, setShowHelpSim800L] = useState(false);
  const [varmonitoring, setMonitoring] = useState([]);
  const [showHelpSecurity, setShowHlp] = useState(false);
  const [language, setLanguage] = useState('ru');
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedSecurity, setSelectedSecurity] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [lastSaveTime, setLastSaveTime] = useState(0);
  const [revealTablePhone, setRevealTablePhone] = useState(false); // по умолчанию номер скрыт

  const i18n = {
    ru: {
      titleSim: 'SIM800L Settings', titlePins: 'Security Pins',
      colRx: 'RXD Pin', colTx: 'TXD Pin', colPhone: 'Phone Number', colInfo: 'Info', colOnOff: 'OnOff', colAction: 'Action',
      colId: 'ID', colPin: 'Pin', colType: 'Type of sensor', colSendSms: 'Send SMS', colEditPin: 'Edit Pin',
      notConfigured: 'Не настроено', notSet: 'Не задан', noInfo: 'Нет инфо', noData: 'Нет доступных данных мониторинга',
      edit: 'Ред.', showHelp: 'Показать справку', hideHelp: 'Скрыть справку',
      showNumber: 'Показать номер', hideNumber: 'Скрыть номер',
      connRetry: 'Connection problems. Retrying...', connLost: 'Connection lost. Check your internet connection.'
    },
    en: {
      titleSim: 'SIM800L Settings', titlePins: 'Security Pins',
      colRx: 'RXD Pin', colTx: 'TXD Pin', colPhone: 'Phone Number', colInfo: 'Info', colOnOff: 'OnOff', colAction: 'Action',
      colId: 'ID', colPin: 'Pin', colType: 'Type of sensor', colSendSms: 'Send SMS', colEditPin: 'Edit Pin',
      notConfigured: 'Not configured', notSet: 'Not set', noInfo: 'No info', noData: 'No monitoring data available',
      edit: 'Edit', showHelp: 'Show Help', hideHelp: 'Hide Help',
      showNumber: 'Show number', hideNumber: 'Hide number',
      connRetry: 'Connection problems. Retrying...', connLost: 'Connection lost. Check your internet connection.'
    }
  };
  const T = i18n[language] || i18n['en'];

  const helpContentSim800L = {
    ru: html`
      <div class="mytext space-y-6 font-sans text-base leading-relaxed text-slate-700 [&_code]:font-sans [&_code]:font-semibold [&_pre]:font-sans">
        <section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Модуль SIM800L</h2>
          <p>Модуль позволяет управлять "Заготовкой" при помощи мобильной связи - интернет не нужен!</p>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Возможности модуля</h3>
          <ul class="list-disc ml-6 space-y-1">
            <li>Входящие вызовы и SMS принимаются только с номера, указанного в поле «Phone Number». Вызовы с других номеров отклоняются автоматически, SMS игнорируются.</li>
            <li>Держит вас в курсе происходящего при помощи SMS-уведомлений.</li>
            <li>Включается и отключается при помощи ползунка 'OnOFF'.</li>
          </ul>
        </div>
        </section>
        <section class="rounded-2xl border-2 bg-indigo-50 border-indigo-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Ползунок 'OnOFF' модуля</h2>
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Состояние</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что происходит</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">Ползунок 'OnOFF' ВКЛючен</td>
                <td class="border px-4 py-2">SMS-уведомления работают по вашим настройкам из таблицы 'Security Pins'.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">Ползунок 'OnOFF' ОТКлючен</td>
                <td class="border px-4 py-2">Все SMS-уведомления отключены, настройки из таблицы 'Security Pins' не учитываются.</td>
              </tr>
            </tbody>
          </table>
          <p class="rounded-xl border border-red-300 bg-red-50 px-4 py-2 font-bold text-red-700">ВАЖНО! Без SIM-карты и без соблюдения порядка включения модуль работать не будет.</p>
          <ol class="list-decimal ml-6 space-y-1">
            <li>Установите SIM-карту в модуль SIM800L.</li>
            <li>Включите SIM800L.</li>
            <li>Дождитесь подключения к GSM.</li>
            <li>Включите STM32.</li>
          </ol>
        </section>
      </div>
    `,
    en: html`
      <div class="mytext space-y-6 font-sans text-base leading-relaxed text-slate-700 [&_code]:font-sans [&_code]:font-semibold [&_pre]:font-sans">
        <section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">SIM800L Module</h2>
          <p>The module controls your "Template" using mobile network - no internet required!</p>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Module capabilities</h3>
          <ul class="list-disc ml-6 space-y-1">
            <li>Incoming calls and SMS messages are accepted only from the number specified in the "Phone Number" field. Calls from other numbers are automatically rejected, and SMS messages are ignored.</li>
            <li>Keeps you updated using SMS notifications.</li>
            <li>Turns ON and OFF using the 'OnOFF' slider.</li>
          </ul>
        </div>
        </section>
        <section class="rounded-2xl border-2 bg-indigo-50 border-indigo-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Module 'OnOFF' slider</h2>
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">State</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What happens</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">'OnOFF' slider is ON</td>
                <td class="border px-4 py-2">SMS notifications work according to your settings in the 'Security Pins' table.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">'OnOFF' slider is OFF</td>
                <td class="border px-4 py-2">All SMS notifications are disabled, settings in the 'Security Pins' table are ignored.</td>
              </tr>
            </tbody>
          </table>
          <p class="rounded-xl border border-red-300 bg-red-50 px-4 py-2 font-bold text-red-700">IMPORTANT! Without a SIM card and the correct power-up order the module will not work.</p>
          <ol class="list-decimal ml-6 space-y-1">
            <li>Insert the SIM card into the SIM800L module.</li>
            <li>Turn ON SIM800L.</li>
            <li>Wait for the GSM connection.</li>
            <li>Turn ON STM32.</li>
          </ol>
        </section>
      </div>
    `,
  };

  const helpContentSecurity = {
    ru: html`
      <div class="mytext space-y-6 font-sans text-base leading-relaxed text-slate-700 [&_code]:font-sans [&_code]:font-semibold [&_pre]:font-sans">
        <section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Управление по SMS и DTMF</h2>
          <div><h4 class="text-lg font-bold text-black mt-4 mb-2">Рубильник On/Off по SMS и DTMF</h4><p class="mb-2">Ползунок On/Off любой строки этой страницы можно переключить с телефона, номер которого указан в настройках SIM800L: SMS-сообщением или во время звонка (тональный набор DTMF). Формат команды одинаков на всех страницах: <b>ID#КОД*</b>, где ID - число из колонки ID нужной строки.</p><table class="w-full border-collapse my-2 bg-white/70"><thead><tr><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">Действие</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">SMS</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">DTMF (во время звонка)</th></tr></thead><tbody><tr><td class="border px-3 py-1">Отключить строку (ползунок Off)</td><td class="border px-3 py-1"><code>12#00*</code></td><td class="border px-3 py-1"><code>12#00*#</code></td></tr><tr><td class="border px-3 py-1">Включить строку (ползунок On)</td><td class="border px-3 py-1"><code>12#11*</code></td><td class="border px-3 py-1"><code>12#11*#</code></td></tr></tbody></table><p class="mb-2">В таблице ID = 12 - это пример, подставьте ID своей строки.</p><p class="mb-2">Несколько команд подряд: <code>12#00*7#11*</code> (SMS) и <code>12#00*7#11*#</code> (звонок). Ввод во время звонка всегда завершается символами <code>*#</code>: последняя команда уже заканчивается на <code>*</code>, поэтому в конце добавляется только <code>#</code>.</p><p class="mb-2">Коды для всех страниц: Button, Switch, Encoder, OneWire, Security, Zigbee - <b>00</b> (выкл) и <b>11</b> (вкл); Cron - <b>33</b> и <b>44</b>; PID - <b>55</b> и <b>66</b>.</p><p class="mb-2">В ответ приходит SMS-отчёт, например <code>OnOff: Pin12=OFF</code> (отчёт отправляется, только если включён общий ползунок SIM800L). Неверные команды попадают в список Invld pins/cmd.</p><p class="mb-2">Те же команды работают для строки SIM800L (общий ползунок SMS-уведомлений) и для Zigbee-датчиков движения в таблице Z2M (их ID начинаются с 89). Для строки SIM800L ID = 1.</p></div>
        </section>
        <section class="rounded-2xl border-2 bg-indigo-50 border-indigo-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Подключение датчиков</h2>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Нормально открытый геркон (Normal open)</h3>
          <ul class="list-disc ml-6 space-y-1">
            <li>Контакты разомкнуты без магнитного поля.</li>
            <li>Контакты замыкаются при поднесении магнита.</li>
            <li>Подключение: один провод к пину STM32, второй к <b>+3.3V</b>.</li>
            <li>Срабатывание: при размыкании контактов (магнит убрали).</li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Нормально закрытый геркон (Normal close)</h3>
          <ul class="list-disc ml-6 space-y-1">
            <li>Контакты замкнуты без магнитного поля.</li>
            <li>Контакты размыкаются при поднесении магнита.</li>
            <li>Подключение: один провод к пину STM32, второй к <b>+3.3V</b>.</li>
            <li>Срабатывание: при замыкании контактов (магнит убрали).</li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Датчики движения (PIR)</h3>
          <ul class="list-disc ml-6 space-y-1">
            <li>В покое: выход LOW (логический 0).</li>
            <li>При движении: выход HIGH (логическая 1, максимум <b>+3.3V</b>).</li>
            <li>Срабатывание: при появлении движения (переход из LOW в HIGH).</li>
          </ul>
        </div>
        </section>
        <section class="rounded-2xl border-2 bg-emerald-50 border-emerald-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Настройка SMS-уведомлений</h2>
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Значение в столбце "Send SMS"</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что произойдёт</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap"><b>YES</b></td>
                <td class="border px-4 py-2">SMS-уведомление будет отправлено.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap"><b>NO</b></td>
                <td class="border px-4 py-2">SMS-уведомление не будет отправлено.</td>
              </tr>
            </tbody>
          </table>
          <div class="p-4 rounded-xl bg-white/80 border border-emerald-300">
            <h4 class="text-lg font-bold text-black mb-2">Примечание</h4>
            <ul class="list-disc ml-6 space-y-1">
              <li>Действия в столбце 'Action' зависят от ползунка 'OnOff' выбранного пина.</li>
              <li>SMS-уведомление отправляется, только если включены ползунок 'OnOFF' выбранного пина и ползунок 'OnOFF' модуля SIM800L.</li>
              <li>Send SMS не зависит от поля Action: SMS уйдёт, даже если Action = None.</li>
            </ul>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-violet-50 border-violet-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">MQTT: отслеживание изменений</h2>
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Топик</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">Swarm/security/</td>
                <td class="border px-4 py-2">Данная страница отслеживает изменения сенсоров и автоматически отправляет каждое изменение по MQTT на топик: Swarm/security/. Где "Swarm" это Ваш 'TX topic'.</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section class="rounded-2xl border-2 bg-amber-50 border-amber-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">${condHelpTitle(true)}</h2>
          <div class="space-y-3">
<p class="text-slate-600 italic mb-2">Сработай, только если...</p>
          <p class="mb-2">Условие - это «замок» на действии в поле <b>Action</b>. Когда датчик срабатывает (увидел движение, открыли дверь), прошивка сначала проверяет условие. Если условие верно (ДА) - действие выполняется. Если неверно (НЕТ) - действие молча пропускается. Если условия нет - действие выполняется всегда, как раньше.</p>
          <p class="mb-3">Зачем это нужно: чтобы одна и та же сигнализация вела себя по-разному. Например: включать свет по движению только ночью; включать сирену, только когда включён «режим охраны»; не трогать вентилятор, если он уже работает.</p>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Как записать условие: три шага</h4>
          <ol class="list-decimal ml-6 mb-3 space-y-1">
            <li>Запишите действие как обычно: <code>${'6:1'}</code> (пин 6, включить).</li>
            <li>Сразу после него, <b>без пробелов</b>, поставьте знак <b>?</b>: <code>${'6:1?'}</code></li>
            <li>Допишите условие: <code>${'6:1?Ss'}</code>. Читаем так: «включить пин 6, но только ночью».</li>
          </ol>
          <p class="mb-3">Общий вид: <code>${'ID:команда?условие'}</code>. Команда: <b>0</b> - выключить, <b>1</b> - включить, <b>2</b> - переключить на противоположное. Несколько действий пишутся через запятую, и у каждого может быть своё условие или не быть никакого.</p>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Примеры из жизни</h4>
          <div class="p-4 rounded-xl bg-white/80 border border-amber-300 mb-3">
            <p class="mb-1">Датчик движения стоит в коридоре, лампа коридора подключена к пину 6. Хотим, чтобы лампа включалась при движении только ночью.</p>
            <p class="mb-1">В поле Action пишем: <code>${'6:1?Ss'}</code></p>
            <p>Результат: ночью лампа включается. Днём датчик тоже срабатывает, но лампа не включается - условие «сейчас ночь» не выполнено.</p>
          </div>
          <div class="p-4 rounded-xl bg-white/80 border border-amber-300 mb-3">
            <p class="mb-1">Сирена подключена к пину 8. Устройство 10 - это ваш «режим охраны»: вы включаете его, когда уходите из дома.</p>
            <p class="mb-1">В поле Action пишем: <code>${'8:1?D10'}</code></p>
            <p>Результат: пока устройство 10 выключено - сирена молчит, даже если датчик сработал. Когда устройство 10 включено - при срабатывании датчика сирена включается.</p>
          </div>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Из чего строится условие (слова)</h4>
          <table class="w-full bg-white/70 mb-3">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Запись</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Как читать</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'D5'}</code></td><td class="border px-4 py-2">Устройство (пин DEVICE) с ID 5 сейчас ВКЛючено. Для Zigbee-устройства - оно включено. Для ШИМ-пина - яркость больше нуля.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'!D5'}</code></td><td class="border px-4 py-2">Пин с ID 5 сейчас ВЫКЛючен (знак ! означает «НЕ»).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3>0'}</code></td><td class="border px-4 py-2">Диммер (ШИМ) с ID 3: значение больше нуля, то есть светит. Для Zigbee - яркость устройства.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3=50'}</code></td><td class="border px-4 py-2">Значение диммера 3 ровно 50 (у ШИМ-пина значение - это проценты от 0 до 100).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3g50'}</code></td><td class="border px-4 py-2">Значение диммера 3 равно 50 или БОЛЬШЕ (буква g - «greater», то же, что знак больше или равно).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3l50'}</code></td><td class="border px-4 py-2">Значение диммера 3 равно 50 или МЕНЬШЕ (буква l - «less», то же, что знак меньше или равно).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'B1'}</code></td><td class="border px-4 py-2">Кнопка с ID 1 сейчас нажата.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'BU1'}</code></td><td class="border px-4 py-2">Кнопка с ID 1 сейчас НЕ нажата.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'BH1'}</code></td><td class="border px-4 py-2">Кнопка с ID 1 сейчас удерживается (долгое нажатие).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5>25.5'}</code></td><td class="border px-4 py-2">Температура датчика 5 больше 25.5 градусов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5.2<10'}</code></td><td class="border px-4 py-2">Температура ВТОРОГО датчика на пине 5 (датчиков DS18B20 на одном пине может быть несколько) меньше 10 градусов. Без «.2» берётся первый исправный датчик.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'H4>50'}</code></td><td class="border px-4 py-2">Влажность датчика 4 (DHT22) больше 50 процентов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Sr'}</code></td><td class="border px-4 py-2">Сейчас ДЕНЬ (время между восходом и закатом).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Ss'}</code></td><td class="border px-4 py-2">Сейчас НОЧЬ (время между закатом и восходом).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'C3'}</code></td><td class="border px-4 py-2">Подставить готовое условие из ячейки №3 (ячейки хранятся на странице «Global Settings», строка Conditions, всего 12 ячеек). Вложенность - не глубже двух уровней.</td></tr>
            </tbody>
          </table>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Чем соединять слова (знаки)</h4>
          <table class="w-full bg-white/70 mb-3">
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
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'= > < g l'}</code></td><td class="border px-4 py-2">Равно, больше, меньше, больше или равно (g), меньше или равно (l). Также можно писать ${'>'}= и ${'<'}=</td><td class="border px-4 py-2"><code>${'T5>25.5'}</code>, <code>${'DV3=50'}</code>, <code>${'DV3l50'}</code></td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'-'}</code></td><td class="border px-4 py-2">Минус разрешён только справа от знака сравнения и сразу перед цифрами</td><td class="border px-4 py-2"><code>${'T5<-5'}</code> - холоднее минус 5 градусов</td></tr>
            </tbody>
          </table>
          <p class="mb-3 text-slate-600">Совет: если в одном условии смешиваете & и |, всегда ставьте скобки. Без скобок прошивка считает сначала НЕ (!), потом И (&), потом ИЛИ (|). Со скобками результат будет именно тот, который вы задумали.</p>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Готовые примеры - просто скопируйте в поле Action</h4>
          <h5 class="text-base font-bold text-black mt-3 mb-1">Устройства</h5>
          <table class="w-full bg-white/70 mb-3">
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
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?!(D1&D2)'}</code></td><td class="border px-4 py-2">Включить пин 6, если устройство 1 и 2 НЕ включены одновременно (хотя бы одно выключено).</td></tr>
            </tbody>
          </table>
          <h5 class="text-base font-bold text-black mt-3 mb-1">День и ночь</h5>
          <table class="w-full bg-white/70 mb-3">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что вписать в поле</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что произойдёт</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?Ss'}</code></td><td class="border px-4 py-2">Включить пин 6, только если сейчас ночь.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?Sr'}</code></td><td class="border px-4 py-2">Включить пин 6, только если сейчас день.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'8:1?Ss&D10'}</code></td><td class="border px-4 py-2">Включить пин 8 (например, сирену), если сейчас ночь и включено устройство 10 (например, «режим охраны»).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?Ss|D10'}</code></td><td class="border px-4 py-2">Включить пин 6, если сейчас ночь ИЛИ включено устройство 10.</td></tr>
            </tbody>
          </table>
          <h5 class="text-base font-bold text-black mt-3 mb-1">Кнопки</h5>
          <table class="w-full bg-white/70 mb-3">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что вписать в поле</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что произойдёт</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?B1'}</code></td><td class="border px-4 py-2">Включить пин 6, только если кнопка 1 сейчас нажата.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?BU1'}</code></td><td class="border px-4 py-2">Включить пин 6, только если кнопка 1 не нажата.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?BH1'}</code></td><td class="border px-4 py-2">Включить пин 6, только если кнопка 1 удерживается.</td></tr>
            </tbody>
          </table>
          <h5 class="text-base font-bold text-black mt-3 mb-1">Температура и влажность</h5>
          <table class="w-full bg-white/70 mb-3">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что вписать в поле</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что произойдёт</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5>25.5'}</code></td><td class="border px-4 py-2">Включить пин 6, если на датчике 5 жарче 25.5 градусов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5<18'}</code></td><td class="border px-4 py-2">Включить пин 6, если на датчике 5 холоднее 18 градусов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5<-5'}</code></td><td class="border px-4 py-2">Включить пин 6, если на датчике 5 мороз: ниже минус 5 градусов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5g20'}</code></td><td class="border px-4 py-2">Включить пин 6, если на датчике 5 20 градусов или выше.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5l30'}</code></td><td class="border px-4 py-2">Включить пин 6, если на датчике 5 30 градусов или ниже.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5.2>20'}</code></td><td class="border px-4 py-2">Включить пин 6, если на втором датчике пина 5 выше 20 градусов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?H4>50'}</code></td><td class="border px-4 py-2">Включить пин 6, если влажность на датчике 4 выше 50 процентов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?H4<30'}</code></td><td class="border px-4 py-2">Включить пин 6, если влажность на датчике 4 ниже 30 процентов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5>25&H4>60&!D7'}</code></td><td class="border px-4 py-2">Включить пин 6, если жарко, влажно и вентилятор (устройство 7) ещё не включён.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:0?Ss&T5<20'}</code></td><td class="border px-4 py-2">Выключить пин 6, если сейчас ночь и холодно (ниже 20 градусов).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?(T5>28|H4>70)&Sr'}</code></td><td class="border px-4 py-2">Включить пин 6, если сейчас день и при этом жарко или очень влажно.</td></tr>
            </tbody>
          </table>
          <h5 class="text-base font-bold text-black mt-3 mb-1">Диммер (ШИМ) и Zigbee</h5>
          <table class="w-full bg-white/70 mb-3">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что вписать в поле</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что произойдёт</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3>0'}</code></td><td class="border px-4 py-2">Включить пин 6, только если диммер 3 светит (значение больше нуля).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3=50'}</code></td><td class="border px-4 py-2">Включить пин 6, только если диммер 3 ровно на 50.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3g50'}</code></td><td class="border px-4 py-2">Включить пин 6, только если значение диммера 3 равно 50 или больше.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3l50'}</code></td><td class="border px-4 py-2">Включить пин 6, только если значение диммера 3 равно 50 или меньше.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3>0&Ss'}</code></td><td class="border px-4 py-2">Включить пин 6, если диммер 3 светит и сейчас ночь.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D93'}</code></td><td class="border px-4 py-2">Включить пин 6, только если Zigbee-устройство с ID 93 включено (ID Zigbee-устройств начинаются с 89).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV93g100'}</code></td><td class="border px-4 py-2">Включить пин 6, только если значение Zigbee-устройства 93 равно 100 или больше.</td></tr>
            </tbody>
          </table>
          <h5 class="text-base font-bold text-black mt-3 mb-1">Готовые условия из ячеек Global Settings</h5>
          <table class="w-full bg-white/70 mb-3">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что вписать в поле</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что произойдёт</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?C3'}</code></td><td class="border px-4 py-2">Включить пин 6, только если верно готовое условие из ячейки №3.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?C3&Ss'}</code></td><td class="border px-4 py-2">Включить пин 6, если верна ячейка №3 и сейчас ночь (ячейки можно смешивать с обычными словами).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?C1|C2'}</code></td><td class="border px-4 py-2">Включить пин 6, если верна ячейка №1 или ячейка №2.</td></tr>
            </tbody>
          </table>
          <h5 class="text-base font-bold text-black mt-3 mb-1">Несколько действий в одном поле</h5>
          <table class="w-full bg-white/70 mb-3">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что вписать в поле</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что произойдёт</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?Ss,7:0?!D10'}</code></td><td class="border px-4 py-2">Два действия сразу: пин 6 включить, если сейчас ночь; пин 7 выключить, если устройство 10 выключено.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1,7:0?D2'}</code></td><td class="border px-4 py-2">Пин 6 включить всегда; пин 7 выключить только если устройство 2 включено.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:2?D1,12:2?!D1,18:0'}</code></td><td class="border px-4 py-2">Три действия: пин 6 переключить, если устройство 1 включено; пин 12 переключить, если устройство 1 выключено; пин 18 выключить всегда.</td></tr>
            </tbody>
          </table>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Важные правила</h4>
          <p class="rounded-xl border border-red-300 bg-red-50 px-4 py-2 font-bold text-red-700 mb-3">Условие запирает только Action. Отправка SMS (Send SMS = YES) и отправка события в MQTT условием не блокируются: SMS уйдёт, даже если условие НЕТ.</p>
          <ul class="list-disc ml-6 mb-3 space-y-1">
            <li><b>Условие проверяется в момент срабатывания датчика</b> и для каждого действия отдельно. Если в этот момент было НЕТ - действие пропущено. Когда условие потом станет ДА, само по себе ничего не произойдёт: нужно дождаться следующего срабатывания датчика.</li>
            <li><b>Ползунок On/Off в строке датчика</b> сильнее любого условия: если он выключен, датчик игнорируется целиком.</li>
            <li><b>Датчик срабатывает не чаще одного раза в секунду.</b> Повторные срабатывания внутри этой секунды пропускаются, условие для них не проверяется.</li>
            <li><b>Прямое управление устройством</b> (ползунок On/Off у самого реле, команда API или MQTT прямо на реле) условия не проверяет. Условия работают только внутри полей Action.</li>
            <li><b>Sr и Ss</b> берут время восхода и заката со страницы «Global Settings». Если оно не настроено, и Sr, и Ss считаются НЕТ - действие с таким условием не выполнится.</li>
            <li><b>Неисправный датчик температуры или влажности</b> даёт ответ «неизвестно», и действие блокируется, даже если перед условием стоит !. Исключение: явная правда через |. Например <code>${'6:1?T5<25|D1'}</code> сработает при неисправном датчике 5, если устройство 1 включено.</li>
            <li><b>Температуру, влажность и диммер всегда сравнивайте с числом</b> (<code>${'T5>20'}</code>, <code>${'DV3>0'}</code>). Запись без сравнения вроде <code>${'6:1?T5'}</code> не имеет смысла.</li>
            <li><b>Длина поля - 124 символа вместе с условиями.</b> Чем длиннее условия, тем меньше действий поместится. Если условие длинное и нужно в нескольких местах, запишите его один раз в ячейку на странице «Global Settings» (строка Conditions, 12 ячеек) и пишите в действии коротко: <code>${'6:1?C3'}</code>.</li>
            <li><b>Допустимые символы в условии:</b> латинские буквы, цифры и знаки ( ) ! & | = ${'>'} ${'<'} - и точка. Пробелы не допускаются. Если запись неверна, под полем появится красное сообщение, и сохранить строку не получится.</li>
            <li><b>Жёлтое предупреждение под полем</b> обычно значит, что действие ссылается на ячейку Conditions, которая была сброшена в 0 (например, после удаления устройства). Такое действие заблокировано, пока в ячейке снова не будет верное условие. Пустая ячейка тоже считается НЕТ.</li>
            <li><b>Одну ячейку можно использовать во многих местах.</b> Правка ячейки сразу меняет поведение всех действий, которые на неё ссылаются.</li>
          </ul>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Частые ошибки</h4>
          <table class="w-full bg-white/70 mb-3">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Неправильно</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Правильно и почему</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1R2'}</code></td><td class="border px-4 py-2">${'<'}code${'>'}${'6:1?D2'}${'<'}/code${'>'} - забыли знак ? перед условием.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1? D2&D3'}</code></td><td class="border px-4 py-2">${'<'}code${'>'}${'6:1?D2&D3'}${'<'}/code${'>'} - пробелы в условии не допускаются.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D2,D3'}</code></td><td class="border px-4 py-2">${'<'}code${'>'}${'6:1?D2&D3'}${'<'}/code${'>'} - запятая разделяет ДЕЙСТВИЯ, а слова условия соединяются знаками & и |.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D1&D2|D3'}</code></td><td class="border px-4 py-2">${'<'}code${'>'}${'6:1?(D1&D2)|D3'}${'<'}/code${'>'} - смешали & и |, поставьте скобки.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?(D1|D2'}</code></td><td class="border px-4 py-2">${'<'}code${'>'}${'6:1?(D1|D2)'}${'<'}/code${'>'} - не закрыта скобка.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5'}</code></td><td class="border px-4 py-2">${'<'}code${'>'}${'6:1?T5>20'}${'<'}/code${'>'} - температуру нужно сравнивать с числом.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?-5<T5'}</code></td><td class="border px-4 py-2">${'<'}code${'>'}${'6:1?T5>-5'}${'<'}/code${'>'} - число и минус слева от знака сравнения не принимаются: слева слово, справа число.</td></tr>
            </tbody>
          </table>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-teal-50 border-teal-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Формат полей Action</h2>
          <p>Максимальное количество записей в формате <code>ID:Action</code> с разделителем <code>,</code> ограничено длиной строки - <b>124 символа</b>. Условия записываются в той же строке и занимают место, поэтому записей помещается меньше.</p>
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Длина ID</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Пример</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Байт на запись</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Записей в строке</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">1 знак</td>
                <td class="border px-4 py-2"><code>5:1</code></td>
                <td class="border px-4 py-2">3 + запятая = 4</td>
                <td class="border px-4 py-2">до 31</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">2 знака</td>
                <td class="border px-4 py-2"><code>15:1</code></td>
                <td class="border px-4 py-2">4 + запятая = 5</td>
                <td class="border px-4 py-2">до 25</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">3 знака</td>
                <td class="border px-4 py-2"><code>155:1</code></td>
                <td class="border px-4 py-2">5 + запятая = 6</td>
                <td class="border px-4 py-2">до 20</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    `,
    en: html`
      <div class="mytext space-y-6 font-sans text-base leading-relaxed text-slate-700 [&_code]:font-sans [&_code]:font-semibold [&_pre]:font-sans">
        <section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Control by SMS and DTMF</h2>
          <div><h4 class="text-lg font-bold text-black mt-4 mb-2">On/Off switch by SMS and DTMF</h4><p class="mb-2">The On/Off slider of any row on this page can be switched from the phone number set in the SIM800L settings: by SMS or during a call (DTMF tones). The command format is the same on every page: <b>ID#CODE*</b>, where ID is the number from the ID column of the needed row.</p><table class="w-full border-collapse my-2 bg-white/70"><thead><tr><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">Action</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">SMS</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">DTMF (during a call)</th></tr></thead><tbody><tr><td class="border px-3 py-1">Turn the row off (slider Off)</td><td class="border px-3 py-1"><code>12#00*</code></td><td class="border px-3 py-1"><code>12#00*#</code></td></tr><tr><td class="border px-3 py-1">Turn the row on (slider On)</td><td class="border px-3 py-1"><code>12#11*</code></td><td class="border px-3 py-1"><code>12#11*#</code></td></tr></tbody></table><p class="mb-2">In the table ID = 12 is an example, use the ID of your own row.</p><p class="mb-2">Several commands in a row: <code>12#00*7#11*</code> (SMS) and <code>12#00*7#11*#</code> (call). Input during a call always ends with <code>*#</code>: the last command already ends with <code>*</code>, so only <code>#</code> is added at the end.</p><p class="mb-2">Codes for all pages: Button, Switch, Encoder, OneWire, Security, Zigbee - <b>00</b> (off) and <b>11</b> (on); Cron - <b>33</b> and <b>44</b>; PID - <b>55</b> and <b>66</b>.</p><p class="mb-2">An SMS report is sent back, for example <code>OnOff: Pin12=OFF</code> (the report is sent only if the common SIM800L slider is On). Wrong commands are listed in Invld pins/cmd.</p><p class="mb-2">The same commands work for the SIM800L row (common SMS alerts slider) and for the Zigbee motion sensors in the Z2M table (their IDs start from 89). For the SIM800L row ID = 1.</p></div>
        </section>
        <section class="rounded-2xl border-2 bg-indigo-50 border-indigo-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Sensor Connection</h2>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Normally Open Reed Switch (Normal open)</h3>
          <ul class="list-disc ml-6 space-y-1">
            <li>Contacts are open without magnetic field.</li>
            <li>Contacts close when a magnet is nearby.</li>
            <li>Connection: one wire to STM32 pin, another to <b>+3.3V</b>.</li>
            <li>Triggers: when the contacts open (the magnet is removed).</li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Normally Closed Reed Switch (Normal close)</h3>
          <ul class="list-disc ml-6 space-y-1">
            <li>Contacts are closed without magnetic field.</li>
            <li>Contacts open when a magnet is nearby.</li>
            <li>Connection: one wire to STM32 pin, another to <b>+3.3V</b>.</li>
            <li>Triggers: when the contacts close (the magnet is removed).</li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Motion Sensors (PIR)</h3>
          <ul class="list-disc ml-6 space-y-1">
            <li>At rest: output LOW (logical 0).</li>
            <li>When motion is detected: output HIGH (logical 1, max <b>+3.3V</b>).</li>
            <li>Triggers: when motion appears (LOW to HIGH transition).</li>
          </ul>
        </div>
        </section>
        <section class="rounded-2xl border-2 bg-emerald-50 border-emerald-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">SMS Notification Settings</h2>
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Value in the "Send SMS" column</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What happens</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap"><b>YES</b></td>
                <td class="border px-4 py-2">SMS notification will be sent.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap"><b>NO</b></td>
                <td class="border px-4 py-2">SMS notification will not be sent.</td>
              </tr>
            </tbody>
          </table>
          <div class="p-4 rounded-xl bg-white/80 border border-emerald-300">
            <h4 class="text-lg font-bold text-black mb-2">Note</h4>
            <ul class="list-disc ml-6 space-y-1">
              <li>Actions in the 'Action' column depend on the 'OnOff' slider of the selected pin.</li>
              <li>An SMS is sent only when both the pin 'OnOFF' slider and the SIM800L module 'OnOFF' slider are ON.</li>
              <li>Send SMS does not depend on the Action field: the SMS is sent even if Action = None.</li>
            </ul>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-violet-50 border-violet-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">MQTT: change tracking</h2>
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Topic</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">Swarm/security/</td>
                <td class="border px-4 py-2">This page tracks sensor changes and automatically sends each change via MQTT to the topic: Swarm/security/. Where "Swarm" is your 'TX topic'.</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section class="rounded-2xl border-2 bg-amber-50 border-amber-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">${condHelpTitle(false)}</h2>
          <div class="space-y-3">
<p class="text-slate-600 italic mb-2">Act only if...</p>
          <p class="mb-2">A condition is a "lock" on an action in the <b>Action</b> field. When the sensor triggers (it saw motion, a door was opened), the firmware checks the condition first. If the condition is true (YES) - the action is executed. If it is false (NO) - the action is silently skipped. If there is no condition - the action is always executed, as before.</p>
          <p class="mb-3">Why you need it: so that the same alarm behaves differently in different situations. For example: turn on a light on motion only at night; turn on the siren only when "guard mode" is on; do not touch the fan if it is already running.</p>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">How to write a condition: three steps</h4>
          <ol class="list-decimal ml-6 mb-3 space-y-1">
            <li>Write the action as usual: <code>${'6:1'}</code> (pin 6, turn on).</li>
            <li>Right after it, <b>without spaces</b>, put the <b>?</b> sign: <code>${'6:1?'}</code></li>
            <li>Add the condition: <code>${'6:1?Ss'}</code>. Read it as: "turn on pin 6, but only at night".</li>
          </ol>
          <p class="mb-3">General form: <code>${'ID:command?condition'}</code>. Command: <b>0</b> - turn off, <b>1</b> - turn on, <b>2</b> - toggle to the opposite. Several actions are separated by commas, and each one may have its own condition or none at all.</p>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Examples from real life</h4>
          <div class="p-4 rounded-xl bg-white/80 border border-amber-300 mb-3">
            <p class="mb-1">A motion sensor stands in the hallway, the hallway lamp is connected to pin 6. We want the lamp to turn on on motion only at night.</p>
            <p class="mb-1">In the Action field we write: <code>${'6:1?Ss'}</code></p>
            <p>Result: at night the lamp turns on. In the daytime the sensor also triggers, but the lamp stays off - the "it is night now" condition is not met.</p>
          </div>
          <div class="p-4 rounded-xl bg-white/80 border border-amber-300 mb-3">
            <p class="mb-1">The siren is connected to pin 8. Device 10 is your "guard mode": you turn it on when you leave home.</p>
            <p class="mb-1">In the Action field we write: <code>${'8:1?D10'}</code></p>
            <p>Result: while device 10 is off - the siren stays silent even if the sensor triggered. When device 10 is on - the siren turns on when the sensor triggers.</p>
          </div>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">What a condition is built from (words)</h4>
          <table class="w-full bg-white/70 mb-3">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Record</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">How to read</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'D5'}</code></td><td class="border px-4 py-2">Device (DEVICE pin) with ID 5 is ON right now. For a Zigbee device - the device is on. For a PWM pin - brightness is above zero.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'!D5'}</code></td><td class="border px-4 py-2">Pin with ID 5 is OFF right now (the ! sign means "NOT").</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3>0'}</code></td><td class="border px-4 py-2">Dimmer (PWM) with ID 3: the value is above zero, i.e. it is lit. For Zigbee - the device brightness.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3=50'}</code></td><td class="border px-4 py-2">Dimmer 3 value is exactly 50 (for a PWM pin the value is percent, 0 to 100).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3g50'}</code></td><td class="border px-4 py-2">Dimmer 3 value is 50 or GREATER (letter g - "greater", same as the greater-or-equal sign).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3l50'}</code></td><td class="border px-4 py-2">Dimmer 3 value is 50 or LESS (letter l - "less", same as the less-or-equal sign).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'B1'}</code></td><td class="border px-4 py-2">Button with ID 1 is pressed right now.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'BU1'}</code></td><td class="border px-4 py-2">Button with ID 1 is NOT pressed right now.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'BH1'}</code></td><td class="border px-4 py-2">Button with ID 1 is being held (long press).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5>25.5'}</code></td><td class="border px-4 py-2">Temperature of sensor 5 is above 25.5 degrees.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5.2<10'}</code></td><td class="border px-4 py-2">Temperature of the SECOND sensor on pin 5 (several DS18B20 sensors can share one pin) is below 10 degrees. Without ".2" the first healthy sensor is used.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'H4>50'}</code></td><td class="border px-4 py-2">Humidity of sensor 4 (DHT22) is above 50 percent.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Sr'}</code></td><td class="border px-4 py-2">It is DAYTIME now (the time between sunrise and sunset).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Ss'}</code></td><td class="border px-4 py-2">It is NIGHT now (the time between sunset and sunrise).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'C3'}</code></td><td class="border px-4 py-2">Insert the ready-made condition from cell C3 (cells are stored on the "Global Settings" page, Conditions row, 12 cells in total). Nesting - no deeper than two levels.</td></tr>
            </tbody>
          </table>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">What to join the words with (signs)</h4>
          <table class="w-full bg-white/70 mb-3">
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
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'= > < g l'}</code></td><td class="border px-4 py-2">Equal, greater, less, greater or equal (g), less or equal (l). You can also write ${'>'}= and ${'<'}=</td><td class="border px-4 py-2"><code>${'T5>25.5'}</code>, <code>${'DV3=50'}</code>, <code>${'DV3l50'}</code></td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'-'}</code></td><td class="border px-4 py-2">Minus is allowed only to the right of a comparison sign, right before the digits</td><td class="border px-4 py-2"><code>${'T5<-5'}</code> - colder than minus 5 degrees</td></tr>
            </tbody>
          </table>
          <p class="mb-3 text-slate-600">Tip: if you mix & and | in one condition, always use brackets. Without brackets the firmware calculates NOT (!) first, then AND (&), then OR (|). With brackets the result is exactly what you meant.</p>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Ready-made examples - just copy into the Action field</h4>
          <h5 class="text-base font-bold text-black mt-3 mb-1">Devices</h5>
          <table class="w-full bg-white/70 mb-3">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What to enter in the field</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What will happen</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D2'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if device 2 is on.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?!D2'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if device 2 is off.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:2?D1&D2'}</code></td><td class="border px-4 py-2">Toggle pin 6 only if both device 1 and device 2 are on.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D1|D2'}</code></td><td class="border px-4 py-2">Turn on pin 6 if at least one of devices 1 and 2 is on.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D1&!D2'}</code></td><td class="border px-4 py-2">Turn on pin 6 if device 1 is on and device 2 is off.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:0?!D1&!D2'}</code></td><td class="border px-4 py-2">Turn off pin 6 only if both devices are off.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?(D1|D2)&!D3'}</code></td><td class="border px-4 py-2">Turn on pin 6 if device 1 or 2 is on and device 3 is off at the same time.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?!(D1&D2)'}</code></td><td class="border px-4 py-2">Turn on pin 6 if devices 1 and 2 are NOT on at the same time (at least one is off).</td></tr>
            </tbody>
          </table>
          <h5 class="text-base font-bold text-black mt-3 mb-1">Day and night</h5>
          <table class="w-full bg-white/70 mb-3">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What to enter in the field</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What will happen</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?Ss'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if it is night now.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?Sr'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if it is daytime now.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'8:1?Ss&D10'}</code></td><td class="border px-4 py-2">Turn on pin 8 (for example, a siren) if it is night and device 10 is on (for example, "guard mode").</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?Ss|D10'}</code></td><td class="border px-4 py-2">Turn on pin 6 if it is night OR device 10 is on.</td></tr>
            </tbody>
          </table>
          <h5 class="text-base font-bold text-black mt-3 mb-1">Buttons</h5>
          <table class="w-full bg-white/70 mb-3">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What to enter in the field</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What will happen</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?B1'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if button 1 is pressed right now.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?BU1'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if button 1 is not pressed.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?BH1'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if button 1 is being held.</td></tr>
            </tbody>
          </table>
          <h5 class="text-base font-bold text-black mt-3 mb-1">Temperature and humidity</h5>
          <table class="w-full bg-white/70 mb-3">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What to enter in the field</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What will happen</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5>25.5'}</code></td><td class="border px-4 py-2">Turn on pin 6 if sensor 5 shows above 25.5 degrees.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5<18'}</code></td><td class="border px-4 py-2">Turn on pin 6 if sensor 5 shows below 18 degrees.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5<-5'}</code></td><td class="border px-4 py-2">Turn on pin 6 if sensor 5 shows frost: below minus 5 degrees.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5g20'}</code></td><td class="border px-4 py-2">Turn on pin 6 if sensor 5 shows 20 degrees or higher.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5l30'}</code></td><td class="border px-4 py-2">Turn on pin 6 if sensor 5 shows 30 degrees or lower.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5.2>20'}</code></td><td class="border px-4 py-2">Turn on pin 6 if the second sensor on pin 5 shows above 20 degrees.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?H4>50'}</code></td><td class="border px-4 py-2">Turn on pin 6 if humidity on sensor 4 is above 50 percent.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?H4<30'}</code></td><td class="border px-4 py-2">Turn on pin 6 if humidity on sensor 4 is below 30 percent.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5>25&H4>60&!D7'}</code></td><td class="border px-4 py-2">Turn on pin 6 if it is hot, humid and the fan (device 7) is not on yet.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:0?Ss&T5<20'}</code></td><td class="border px-4 py-2">Turn off pin 6 if it is night and cold (below 20 degrees).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?(T5>28|H4>70)&Sr'}</code></td><td class="border px-4 py-2">Turn on pin 6 if it is daytime and it is hot or very humid.</td></tr>
            </tbody>
          </table>
          <h5 class="text-base font-bold text-black mt-3 mb-1">Dimmer (PWM) and Zigbee</h5>
          <table class="w-full bg-white/70 mb-3">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What to enter in the field</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What will happen</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3>0'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if dimmer 3 is lit (value above zero).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3=50'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if dimmer 3 is exactly 50.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3g50'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if dimmer 3 value is 50 or greater.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3l50'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if dimmer 3 value is 50 or less.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3>0&Ss'}</code></td><td class="border px-4 py-2">Turn on pin 6 if dimmer 3 is lit and it is night.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D93'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if the Zigbee device with ID 93 is on (Zigbee device IDs start from 89).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV93g100'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if the Zigbee device 93 value is 100 or greater.</td></tr>
            </tbody>
          </table>
          <h5 class="text-base font-bold text-black mt-3 mb-1">Ready-made conditions from Global Settings cells</h5>
          <table class="w-full bg-white/70 mb-3">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What to enter in the field</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What will happen</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?C3'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if the ready-made condition from cell C3 is true.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?C3&Ss'}</code></td><td class="border px-4 py-2">Turn on pin 6 if cell C3 is true and it is night (cells can be mixed with ordinary words).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?C1|C2'}</code></td><td class="border px-4 py-2">Turn on pin 6 if cell C1 or cell C2 is true.</td></tr>
            </tbody>
          </table>
          <h5 class="text-base font-bold text-black mt-3 mb-1">Several actions in one field</h5>
          <table class="w-full bg-white/70 mb-3">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What to enter in the field</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What will happen</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?Ss,7:0?!D10'}</code></td><td class="border px-4 py-2">Two actions at once: turn pin 6 on if it is night; turn pin 7 off if device 10 is off.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1,7:0?D2'}</code></td><td class="border px-4 py-2">Pin 6 is always turned on; pin 7 is turned off only if device 2 is on.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:2?D1,12:2?!D1,18:0'}</code></td><td class="border px-4 py-2">Three actions: toggle pin 6 if device 1 is on; toggle pin 12 if device 1 is off; pin 18 is always turned off.</td></tr>
            </tbody>
          </table>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Important rules</h4>
          <p class="rounded-xl border border-red-300 bg-red-50 px-4 py-2 font-bold text-red-700 mb-3">The condition locks only the Action. Sending the SMS (Send SMS = YES) and sending the event to MQTT are not blocked by the condition: the SMS goes out even if the condition is NO.</p>
          <ul class="list-disc ml-6 mb-3 space-y-1">
            <li><b>The condition is checked at the moment the sensor triggers</b> and separately for each action. If it was NO at that moment - the action is skipped. When the condition later becomes YES, nothing happens by itself: wait for the next sensor trigger.</li>
            <li><b>The On/Off slider in the sensor row</b> is stronger than any condition: if it is off, the sensor is ignored completely.</li>
            <li><b>The sensor triggers no more than once per second.</b> Repeated triggers inside that second are skipped and their condition is not checked.</li>
            <li><b>Direct control of a device</b> (the On/Off slider of the relay itself, an API or MQTT command straight to the relay) does not check conditions. Conditions work only inside the Action fields.</li>
            <li><b>Sr and Ss</b> take the sunrise and sunset time from the "Global Settings" page. If it is not set, both Sr and Ss count as NO - an action with such a condition will not run.</li>
            <li><b>A faulty temperature or humidity sensor</b> gives the answer "unknown", and the action is blocked even if ! stands in front of the condition. Exception: explicit truth through |. For example <code>${'6:1?T5<25|D1'}</code> works with a faulty sensor 5 if device 1 is on.</li>
            <li><b>Always compare temperature, humidity and dimmer with a number</b> (<code>${'T5>20'}</code>, <code>${'DV3>0'}</code>). A record without a comparison such as <code>${'6:1?T5'}</code> makes no sense.</li>
            <li><b>The field length is 124 characters including conditions.</b> The longer the conditions, the fewer actions fit. If a long condition is needed in several places, write it once into a cell on the "Global Settings" page (Conditions row, 12 cells) and write it short in the action: <code>${'6:1?C3'}</code>.</li>
            <li><b>Allowed characters in a condition:</b> Latin letters, digits and the signs ( ) ! & | = ${'>'} ${'<'} - and a dot. Spaces are not allowed. If the record is wrong, a red message appears under the field and the row cannot be saved.</li>
            <li><b>A yellow warning under the field</b> usually means the action refers to a Conditions cell that was reset to 0 (for example, after a device was deleted). Such an action is blocked until the cell holds a valid condition again. An empty cell also counts as NO.</li>
            <li><b>One cell can be used in many places.</b> Editing a cell instantly changes the behavior of all actions that refer to it.</li>
          </ul>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Common mistakes</h4>
          <table class="w-full bg-white/70 mb-3">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Wrong</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Right and why</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1R2'}</code></td><td class="border px-4 py-2">${'<'}code${'>'}${'6:1?D2'}${'<'}/code${'>'} - the ? sign before the condition is missing.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1? D2&D3'}</code></td><td class="border px-4 py-2">${'<'}code${'>'}${'6:1?D2&D3'}${'<'}/code${'>'} - spaces are not allowed in a condition.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D2,D3'}</code></td><td class="border px-4 py-2">${'<'}code${'>'}${'6:1?D2&D3'}${'<'}/code${'>'} - a comma separates ACTIONS; words of a condition are joined with & and |.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D1&D2|D3'}</code></td><td class="border px-4 py-2">${'<'}code${'>'}${'6:1?(D1&D2)|D3'}${'<'}/code${'>'} - & and | are mixed, use brackets.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?(D1|D2'}</code></td><td class="border px-4 py-2">${'<'}code${'>'}${'6:1?(D1|D2)'}${'<'}/code${'>'} - the bracket is not closed.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5'}</code></td><td class="border px-4 py-2">${'<'}code${'>'}${'6:1?T5>20'}${'<'}/code${'>'} - temperature must be compared with a number.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?-5<T5'}</code></td><td class="border px-4 py-2">${'<'}code${'>'}${'6:1?T5>-5'}${'<'}/code${'>'} - a number and a minus on the left of the comparison are not accepted: a word on the left, a number on the right.</td></tr>
            </tbody>
          </table>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-teal-50 border-teal-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Action Field Format</h2>
          <p>Maximum number of entries in <code>ID:Action</code> format with <code>,</code> separator is limited by string length - <b>124 characters</b>. Conditions are written in the same string and take space, so fewer entries fit.</p>
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">ID Length</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Example</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Bytes per entry</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Entries in string</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">1 digit</td>
                <td class="border px-4 py-2"><code>5:1</code></td>
                <td class="border px-4 py-2">3 + comma = 4</td>
                <td class="border px-4 py-2">up to 31</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">2 digits</td>
                <td class="border px-4 py-2"><code>15:1</code></td>
                <td class="border px-4 py-2">4 + comma = 5</td>
                <td class="border px-4 py-2">up to 25</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">3 digits</td>
                <td class="border px-4 py-2"><code>155:1</code></td>
                <td class="border px-4 py-2">5 + comma = 6</td>
                <td class="border px-4 py-2">up to 20</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    `,
  };

  useEffect(() => { initGlobalTooltip(); }, []);
  const updateSecurityData = (data) => {
    if (isSaving || Date.now() - lastSaveTime < 2000) return;
    if (!data) { setConnectionStatus('error'); return; }
    setSim800lData({ lang: data.lang, sim800l: data.sim800l, onoff: data.onoff, tel: data.tel, info: data.info });
    setMonitoring(data.pins || []); setConnectionStatus('connected');
  };

  useEffect(() => {
    let active = true;

    registerPoll('security', '/api/state/security', function(data) {
      if (!active) return;
      if (data !== null && data !== undefined) {
        setLanguage(data.lang || 'ru');
        updateSecurityData(data);
      }
    }, {immediate: true});

    return function() {
      active = false;
      unregisterPoll('security');
    };
  }, []);

  const handleSim800lSave = async (updated) => {
    setIsSaving(true);
    try {
      await fetch('/api/security/set', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'sim800l', ...updated }) });
      setSim800lData(updated); setLastSaveTime(Date.now());
    } finally { setIsSaving(false); }
  };

  const getTooltipText = (langArr, index) => {
    const text = langArr && langArr[index] ? langArr[index] : '';
    const lines = []; const words = text.split(' ');
    for (let i = 0; i < words.length; i += 15) lines.push(words.slice(i, i + 15).join(' '));
    return lines.join('<br>');
  };
  const Th = ({ title, langArr, tooltipIndex }) => html`
    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help" data-tip=${getTooltipText(langArr, tooltipIndex)}>${title}</th>
  `;

  return html`
    <div class="flex flex-col items-center w-full p-4" style="overflow-anchor:none;">
      ${connectionStatus !== 'connected' && html`
        <div class="w-full p-2 mb-4 text-white text-center rounded-xl shadow-md backdrop-blur-md ${connectionStatus === 'error' ? 'bg-yellow-500/80' : 'bg-red-500/80'}">
          ${connectionStatus === 'error' ? T.connRetry : T.connLost}
        </div>
      `}
      <div class="flex flex-col items-center w-full p-6 bg-white/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 relative overflow-hidden">
        <div class="w-full mb-10">
          <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight mb-2 drop-shadow-sm">${T.titleSim}</h2>
          <p class="text-sm text-slate-600 mb-6 max-w-3xl">${language === 'ru' ? 'Здесь настраивается связь через SIM-карту: контроллер присылает SMS на ваш телефон, а вы можете управлять им SMS-командами и звонком.' : 'Set up the SIM card link: the controller sends SMS to your phone, and you can control it with SMS commands and by phone call.'}</p>
          <div class="overflow-x-auto w-full rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm mb-4">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-teal-600/10 border-b border-teal-600/20">
                  <${Th} title=${T.colRx} langArr=${language === 'ru' ? ruLangsecurity : enLangsecurity} tooltipIndex=${1} />
                  <${Th} title=${T.colTx} langArr=${language === 'ru' ? ruLangsecurity : enLangsecurity} tooltipIndex=${2} />
                  <${Th} title=${T.colPhone} langArr=${language === 'ru' ? ruLangsecurity : enLangsecurity} tooltipIndex=${3} />
                  <${Th} title=${T.colInfo} langArr=${language === 'ru' ? ruLangsecurity : enLangsecurity} tooltipIndex=${4} />
                  <${Th} title=${T.colOnOff} langArr=${language === 'ru' ? ruLangsecurity : enLangsecurity} tooltipIndex=${5} />
                  <${Th} title=${T.colAction} langArr=${language === 'ru' ? ruLangsecurity : enLangsecurity} tooltipIndex=${6} />
                </tr>
              </thead>
              <tbody class="divide-y divide-white/40">
                <tr class="bg-white/80 hover:bg-slate-200/80 transition-colors">
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">${sim800lData.sim800l === 1 ? 'PA3(1)' : T.notConfigured}</td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">${sim800lData.sim800l === 1 ? 'PD5(35)' : T.notConfigured}</td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">
                    ${sim800lData.tel
                      ? html`
                          <div class="flex items-center gap-2">
                            <span>${revealTablePhone ? sim800lData.tel : maskPhone(sim800lData.tel)}</span>
                            <button
                              type="button"
                              onClick=${() => setRevealTablePhone((v) => !v)}
                              class="text-gray-500 hover:text-gray-700"
                              title=${revealTablePhone ? T.hideNumber : T.showNumber}
                            >
                              ${revealTablePhone
                                ? html`<${EyeSlashIcon} class="w-4 h-4" />`
                                : html`<${EyeIcon} class="w-4 h-4" />`}
                            </button>
                          </div>
                        `
                      : T.notSet}
                  </td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">${sim800lData.info || T.noInfo}</td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium"><${MyPolzunok} value=${sim800lData.onoff} onChange=${(v) => handleSim800lSave({ ...sim800lData, onoff: v })} /></td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium"><button onClick=${() => setIsModalOpenSim800L(true)} class="text-teal-600 hover:text-cyan-600 font-bold transition-colors">${T.edit}</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex justify-end mt-6 w-full"><button onclick=${(e) => { lockToggle(e); setShowHelpSim800L(!showHelpSim800L); }} class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40">${showHelpSim800L ? T.hideHelp : T.showHelp}</button></div>
          ${showHelpSim800L && html`<div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700" style="max-height:70vh;max-height:70dvh;overflow-y:auto;">${helpContentSim800L[language]}</div>`}
        </div>

        <div class="w-full">
          <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight mb-2 drop-shadow-sm">${T.titlePins}</h2>
          <p class="text-sm text-slate-600 mb-6 max-w-3xl">${language === 'ru' ? 'Здесь подключаются охранные датчики (дверь, движение): при срабатывании контроллер выполнит заданные действия, например отправит SMS.' : 'Connect security sensors (door, motion): when one triggers, the controller performs the actions you set, for example sends an SMS.'}</p>
          <div class="overflow-x-auto w-full rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm mb-4">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-teal-600/10 border-b border-teal-600/20">
                  <${Th} title=${T.colId} langArr=${language === 'ru' ? ruLangsecuritypins : enLangsecuritypins} tooltipIndex=${1} />
                  <${Th} title=${T.colPin} langArr=${language === 'ru' ? ruLangsecuritypins : enLangsecuritypins} tooltipIndex=${2} />
                  <${Th} title=${T.colType} langArr=${language === 'ru' ? ruLangsecuritypins : enLangsecuritypins} tooltipIndex=${3} />
                  <${Th} title=${T.colAction} langArr=${language === 'ru' ? ruLangsecuritypins : enLangsecuritypins} tooltipIndex=${4} />
                  <${Th} title=${T.colSendSms} langArr=${language === 'ru' ? ruLangsecuritypins : enLangsecuritypins} tooltipIndex=${5} />
                  <${Th} title=${T.colInfo} langArr=${language === 'ru' ? ruLangsecuritypins : enLangsecuritypins} tooltipIndex=${6} />
                  <${Th} title=${T.colOnOff} langArr=${language === 'ru' ? ruLangsecuritypins : enLangsecuritypins} tooltipIndex=${7} />
                  <${Th} title=${T.colEditPin} langArr=${language === 'ru' ? ruLangsecuritypins : enLangsecuritypins} tooltipIndex=${8} />
                </tr>
              </thead>
              <tbody class="divide-y divide-white/40">
                ${varmonitoring.length > 0 ? varmonitoring.map((d, i) => html`
                  <tr class="${i % 2 === 1 ? 'bg-white/80' : 'bg-sky-200/40'} hover:bg-slate-200/80 transition-colors">
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium">${d.id}</td><td class="px-6 py-4 text-sm text-slate-800 font-medium">${d.zbee ? 'Z2M' : d.pins}</td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium">${['PIR', 'Normal open', 'Normal close'][d.ptype]}</td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium">${d.action}</td><td class="px-6 py-4 text-sm text-slate-800 font-medium">${d.send_sms}</td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium">${d.info}</td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium"><${MyPolzunok} value=${d.onoff} onChange=${(v) => { setLastSaveTime(Date.now()); fetch('/api/onoff/set', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: d.id, onoff: v }) }); setMonitoring(prev => prev.map(item => item.id === d.id ? { ...item, onoff: v } : item)); }} /></td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium"><button onClick=${() => { setSelectedSecurity(d); setModalType('edit'); setIsSecurityModalOpen(true); }} class="text-teal-600 hover:text-cyan-600 font-bold transition-colors">${T.edit}</button></td>
                  </tr>`) : html`<tr><td colspan="8" class="px-6 py-4 text-center text-sm text-slate-600 font-medium">${T.noData}</td></tr>`}
              </tbody>
            </table>
          </div>
          <div class="flex justify-end mt-6 w-full"><button onclick=${(e) => { lockToggle(e); setShowHlp(!showHelpSecurity); }} class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40">${showHelpSecurity ? T.hideHelp : T.showHelp}</button></div>
          ${showHelpSecurity && html`<div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700" style="max-height:70vh;max-height:70dvh;overflow-y:auto;">${helpContentSecurity[language]}</div>`}
        </div>
      </div>
      ${isModalOpenSim800L && html`<${ModalSIM800L} hideModal=${() => setIsModalOpenSim800L(false)} title=${T.edit} selectedGps=${sim800lData} onSave=${handleSim800lSave} language=${language} />`}
      ${isSecurityModalOpen && html`<${ModalSecurity} modalType=${modalType} page="TabSecurity" hideModal=${() => setIsSecurityModalOpen(false)} title=${T.edit} selectedSecurity=${selectedSecurity} onSecurityChange=${(upd) => { setMonitoring(prev => prev.map(i => i.id === upd.id ? upd : i)); setIsSecurityModalOpen(false); }} />`}
    </div>
  `;
};

export { TabSecurity };
