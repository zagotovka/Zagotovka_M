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
        <section class="rounded-2xl border-2 bg-indigo-50 border-indigo-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Как подключить модуль SIM800L (пошагово)</h2>
          <ol class="list-decimal ml-6 space-y-3">
            <li><b>Соберите модуль.</b> Вставьте SIM-карту в SIM800L. Пин <b>PA3</b> (RXD Pin, ID 1) принимает данные, поэтому его соединяют с выходом TXD модуля. Пин <b>PD5</b> (TXD Pin, ID 35) передаёт данные, поэтому его соединяют со входом RXD модуля. Земли (GND) платы и модуля соедините вместе, а модуль питайте от отдельного мощного источника.</li>
            <li><b>Включите модуль в проекте.</b> Откройте страницу <b>"Select pin(s)"</b>, включите переключатель <b>SIM800L</b> вверху страницы и нажмите <b>"Submit"</b>. Пины ID 1 и ID 35 при этом блокируются, их тип менять нельзя.</li>
            <li><b>Укажите свой номер.</b> В блоке <b>SIM800L Settings</b> нажмите <b>Ред.</b> и в поле <b>"Мобильный телефон"</b> введите ВАШ номер: знак <b>+</b> и от 11 до 20 цифр, например <code>${'+358401234567'}</code>. Это не номер SIM-карты, которая стоит в модуле!</li>
            <li><b>Сохраните.</b> Нажмите <b>"Сохранить"</b>. Пока номер введён неверно, кнопка остаётся серой.</li>
            <li><b>Включите ползунок OnOff</b> в строке модуля. Пока он выключен, SMS от модуля не отправляются.</li>
            <li><b>Включите питание по порядку и проверьте.</b> Сначала SIM-карта в модуле, затем питание SIM800L, дождитесь подключения к сети GSM и только потом включайте STM32. Для проверки отправьте со своего телефона SMS <code>${'777'}</code>: придёт ответ <code>${'ALL SMS notifications are switched ON!'}</code>.</li>
          </ol>
          <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300"><b>Как это работает:</b> Модуль принимает звонки и SMS только с номера из поля <b>"Мобильный телефон"</b> и отправляет SMS на тот же номер. Звонок с чужого номера сбрасывается, чужие SMS игнорируются. Ползунок <b>OnOff</b> - общий рубильник SMS-уведомлений всего проекта.</div>
          <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300"><b>Важно:</b> без SIM-карты и без правильного порядка включения (SIM-карта, SIM800L, ожидание GSM, STM32) модуль не заработает.</div>
          <div class="mt-4"><b>Пример.</b> Ваш телефон <b>+358401234567</b> (номер условный). В поле <b>"Мобильный телефон"</b> пишем именно его, без пробелов и дефисов: <code>${'+358401234567'}</code>. Сохраняем, включаем ползунок <b>OnOff</b> и отправляем с этого телефона SMS <code>${'777'}</code>. Ответ пришёл - модуль работает!</div>
        </section>
        <section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Управление по SMS и DTMF</h2>
          <div class="overflow-x-auto">
          <table class="w-full bg-white/70">
            <thead><tr><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Действие</th><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">SMS</th><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">DTMF (во время звонка)</th></tr></thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap">Включить все SMS-уведомления</td><td class="border px-4 py-2"><code>${'777'}</code></td><td class="border px-4 py-2"><code>${'777'}</code></td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap">Выключить все SMS-уведомления</td><td class="border px-4 py-2"><code>${'222'}</code></td><td class="border px-4 py-2"><code>${'222'}</code></td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap">То же рубильником (ID строки модуля = 1): включить</td><td class="border px-4 py-2"><code>${'1#11*'}</code></td><td class="border px-4 py-2"><code>${'1#11*#'}</code></td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap">То же рубильником (ID строки модуля = 1): выключить</td><td class="border px-4 py-2"><code>${'1#00*'}</code></td><td class="border px-4 py-2"><code>${'1#00*#'}</code></td></tr>
            </tbody>
          </table>
          </div>
          <p class="mb-2">Для DTMF позвоните на SIM-карту модуля со своего телефона: модуль сам снимет трубку, а коды вы набираете на клавиатуре телефона. Коды <code>${'777'}</code> и <code>${'222'}</code> вводятся без <code>${'*'}</code> и <code>${'#'}</code>. Команды вида <code>${'ID#КОД*'}</code> во время звонка завершаются символами <code>${'*#'}</code>.</p>
          <p class="mb-2">Ответ на <code>${'777'}</code> - <code>${'ALL SMS notifications are switched ON!'}</code>, на <code>${'222'}</code> - <code>${'ALL SMS notifications are switched OFF!'}</code>. Ответ <code>${'OnOff: Pin1=ON'}</code> на команду <code>${'1#11*'}</code> приходит, только если после команды ползунок включён. Поэтому на <code>${'1#00*'}</code> ответа не будет, а на <code>${'222'}</code> будет.</p>
          <p class="mb-2">Все команды принимаются только с номера из поля <b>"Мобильный телефон"</b>. Остальные номера модуль игнорирует.</p>
        </section>
        <section class="rounded-2xl border-2 bg-emerald-50 border-emerald-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Ползунок 'OnOff' модуля</h2>
          <div class="overflow-x-auto">
          <table class="w-full bg-white/70">
            <thead><tr><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Состояние</th><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что происходит</th></tr></thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap">Ползунок 'OnOff' ВКЛючен</td><td class="border px-4 py-2">Тревоги от датчиков и SMS-ответы на ваши команды отправляются по настройкам из таблицы 'Security Pins'.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap">Ползунок 'OnOff' ОТКлючен</td><td class="border px-4 py-2">Все SMS от модуля прекращаются: ни тревог, ни ответов на команды вида <code>${'ID#КОД*'}</code>, настройки из таблицы 'Security Pins' не учитываются. Сами команды с вашего телефона при этом выполняются, а коды <code>${'777'}</code> и <code>${'222'}</code> и ответы на них работают всегда.</td></tr>
            </tbody>
          </table>
          </div>
          <p class="text-slate-700">Выключение SMS не отключает сами датчики: действия на устройствах и события MQTT продолжают работать, замолкают только SMS.</p>
        </section>
        <section class="rounded-2xl border-2 bg-rose-50 border-rose-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Примеры из жизни: что на самом деле умеет эта страница</h2>
          <p class="mb-2">Четыре истории о том, как SIM-карта превращает Zagotovka-M в пульт, которому не нужен интернет.</p>
          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Телефон вибрирует в самый неподходящий момент</p>
            <p class="mb-1">Важная встреча (или кино, или сон), а телефон дрожит от SMS-тревог: датчик у двери срабатывает снова и снова. Выключить бы всё, но вы не дома.</p>
            <p class="mb-1">Спокойно! Отправьте SMS <code>${'222'}</code> (или позвоните и наберите <code>${'222'}</code>): все SMS-уведомления выключены, придёт <code>${'ALL SMS notifications are switched OFF!'}</code>. Освободились - отправьте <code>${'777'}</code>, и тревоги снова приходят. Датчики и действия на устройствах работали всё это время, молчали только SMS.</p>
          </div>
          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Дача без интернета</p>
            <p class="mb-1">В деревне нет ни роутера, ни Wi-Fi, а на телефоне ни одного приложения под рукой. Через час вы приезжаете, а в доме холодно.</p>
            <p class="mb-1">Спокойно! Позвоните на SIM-карту модуля с номера из настроек. Модуль сам снимет трубку, наберите <code>${'6#1*#'}</code>, где 6 - условный ID реле обогрева. Обогрев включён, а после окончания звонка придёт SMS-отчёт.</p>
          </div>
          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Звонит незнакомый номер</p>
            <p class="mb-1">Кто-то посторонний узнал номер модуля и названивает, пробуя набрать коды. Неприятно, правда?</p>
            <p class="mb-1">Спокойно! Модуль слушается только номера из поля <b>"Мобильный телефон"</b>: вызов с любого другого номера сбрасывается автоматически, а чужие SMS игнорируются. Проверьте сами: позвоните с другого телефона, и модуль сбросит вызов.</p>
          </div>
          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Номер на экране виден всем</p>
            <p class="mb-1">Вы показываете настройки другу на видеозвонке или делаете скриншот для форума, а в таблице светится ваш номер.</p>
            <p class="mb-1">Спокойно! Номер скрыт звёздочками, по одной на каждую цифру, знак + остаётся. Чтобы увидеть его, нажмите значок глаза рядом с номером, и он снова спрячется по вашему же нажатию.</p>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-teal-50 border-teal-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Ограничения и значения</h2>
          <div class="overflow-x-auto">
          <table class="w-full bg-white/70">
            <thead><tr><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Параметр</th><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Значение</th></tr></thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap">RXD Pin</td><td class="border px-4 py-2">PA3 (ID 1), фиксированный</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap">TXD Pin</td><td class="border px-4 py-2">PD5 (ID 35), фиксированный</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap">Phone Number</td><td class="border px-4 py-2">Знак + и от 11 до 20 цифр, без пробелов и дефисов. Пустое поле - модуль не используется</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap">Кто может управлять</td><td class="border px-4 py-2">Только номер из этого поля</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap">Пины PA3 и PD5</td><td class="border px-4 py-2">Пока включён переключатель SIM800L на странице "Select pin(s)", их тип изменить нельзя</td></tr>
            </tbody>
          </table>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-amber-50 border-amber-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Не работает? Проверьте</h2>
          <ul class="list-disc ml-6 space-y-1">
            <li>Модуль молчит на ваши SMS: проверьте, что вы пишете с номера из поля <b>"Мобильный телефон"</b> (а не с другого телефона) и что он не пустой.</li>
            <li>Команды выполняются, но ответов нет: выключен ползунок <b>OnOff</b>. Отправьте <code>${'777'}</code> - ответ придёт даже при выключенном ползунке, а сам ползунок включится.</li>
            <li>Модуль не отвечает совсем: не включён переключатель <b>SIM800L</b> на странице <b>"Select pin(s)"</b>, нарушен порядок включения или перепутаны RXD и TXD.</li>
            <li>Кнопка <b>"Сохранить"</b> серая: номер введён неверно, нужен знак + и от 11 до 20 цифр.</li>
            <li>Звонок сбрасывается сразу: вы звоните не с того номера, который указан в настройках.</li>
          </ul>
        </section>
      </div>
    `,
    en: html`
      <div class="mytext space-y-6 font-sans text-base leading-relaxed text-slate-700 [&_code]:font-sans [&_code]:font-semibold [&_pre]:font-sans">
        <section class="rounded-2xl border-2 bg-indigo-50 border-indigo-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">How to connect the SIM800L module (step by step)</h2>
          <ol class="list-decimal ml-6 space-y-3">
            <li><b>Assemble the module.</b> Insert the SIM card into SIM800L. Pin <b>PA3</b> (RXD Pin, ID 1) receives data, so it goes to the TXD output of the module. Pin <b>PD5</b> (TXD Pin, ID 35) sends data, so it goes to the RXD input of the module. Connect the grounds (GND) of the board and the module together, and power the module from a separate powerful supply.</li>
            <li><b>Enable the module in the project.</b> Open the <b>"Select pin(s)"</b> page, turn on the <b>SIM800L</b> switch at the top of the page and click <b>"Submit"</b>. Pins ID 1 and ID 35 become locked, their type cannot be changed.</li>
            <li><b>Enter your number.</b> In the <b>SIM800L Settings</b> block click <b>Edit</b> and in the <b>"Mobile phone"</b> field enter YOUR number: the <b>+</b> sign and 11 to 20 digits, for example <code>${'+358401234567'}</code>. This is not the number of the SIM card inside the module!</li>
            <li><b>Save.</b> Click <b>"Save changes"</b>. While the number is invalid, the button stays gray.</li>
            <li><b>Turn on the OnOff slider</b> in the module row. While it is off, the module sends no SMS.</li>
            <li><b>Power up in the right order and test.</b> First the SIM card in the module, then power on SIM800L, wait for the GSM network connection and only then turn on STM32. To test, send the SMS <code>${'777'}</code> from your phone: the reply is <code>${'ALL SMS notifications are switched ON!'}</code>.</li>
          </ol>
          <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300"><b>How it works:</b> The module accepts calls and SMS only from the number in the <b>"Mobile phone"</b> field and sends SMS to the same number. A call from any other number is rejected, foreign SMS are ignored. The <b>OnOff</b> slider is the common switch of SMS notifications of the whole project.</div>
          <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300"><b>Important:</b> without a SIM card and without the right power-up order (SIM card, SIM800L, wait for GSM, STM32) the module will not work.</div>
          <div class="mt-4"><b>Example.</b> Your phone is <b>+358401234567</b> (the number is made up). In the <b>"Mobile phone"</b> field we write exactly that, without spaces or dashes: <code>${'+358401234567'}</code>. We save, turn on the <b>OnOff</b> slider and send the SMS <code>${'777'}</code> from this phone. A reply came - the module works!</div>
        </section>
        <section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Control by SMS and DTMF</h2>
          <div class="overflow-x-auto">
          <table class="w-full bg-white/70">
            <thead><tr><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Action</th><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">SMS</th><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">DTMF (during a call)</th></tr></thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap">Turn all SMS notifications on</td><td class="border px-4 py-2"><code>${'777'}</code></td><td class="border px-4 py-2"><code>${'777'}</code></td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap">Turn all SMS notifications off</td><td class="border px-4 py-2"><code>${'222'}</code></td><td class="border px-4 py-2"><code>${'222'}</code></td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap">The same with the switch (module row ID = 1): on</td><td class="border px-4 py-2"><code>${'1#11*'}</code></td><td class="border px-4 py-2"><code>${'1#11*#'}</code></td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap">The same with the switch (module row ID = 1): off</td><td class="border px-4 py-2"><code>${'1#00*'}</code></td><td class="border px-4 py-2"><code>${'1#00*#'}</code></td></tr>
            </tbody>
          </table>
          </div>
          <p class="mb-2">For DTMF call the SIM card of the module from your phone: the module picks up by itself and you dial the codes on the phone keypad. The codes <code>${'777'}</code> and <code>${'222'}</code> are entered without <code>${'*'}</code> and <code>${'#'}</code>. Commands like <code>${'ID#CODE*'}</code> end with <code>${'*#'}</code> during a call.</p>
          <p class="mb-2">The reply to <code>${'777'}</code> is <code>${'ALL SMS notifications are switched ON!'}</code>, to <code>${'222'}</code> it is <code>${'ALL SMS notifications are switched OFF!'}</code>. The reply <code>${'OnOff: Pin1=ON'}</code> to the command <code>${'1#11*'}</code> comes only if the slider is on after the command. So <code>${'1#00*'}</code> gets no reply, while <code>${'222'}</code> does.</p>
          <p class="mb-2">All commands are accepted only from the number in the <b>"Mobile phone"</b> field. The module ignores all other numbers.</p>
        </section>
        <section class="rounded-2xl border-2 bg-emerald-50 border-emerald-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Module 'OnOff' slider</h2>
          <div class="overflow-x-auto">
          <table class="w-full bg-white/70">
            <thead><tr><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">State</th><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What happens</th></tr></thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap">'OnOff' slider is ON</td><td class="border px-4 py-2">Sensor alerts and SMS replies to your commands are sent according to your settings in the 'Security Pins' table.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap">'OnOff' slider is OFF</td><td class="border px-4 py-2">All SMS from the module stop: no alerts, no replies to commands like <code>${'ID#CODE*'}</code>, settings in the 'Security Pins' table are ignored. The commands from your phone are still executed, and the codes <code>${'777'}</code> and <code>${'222'}</code> and their replies always work.</td></tr>
            </tbody>
          </table>
          </div>
          <p class="text-slate-700">Turning SMS off does not turn the sensors off: actions on devices and MQTT events keep working, only SMS go silent.</p>
        </section>
        <section class="rounded-2xl border-2 bg-rose-50 border-rose-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Examples from real life: what this page can really do</h2>
          <p class="mb-2">Four stories about how a SIM card turns Zagotovka-M into a remote that needs no internet.</p>
          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Your phone buzzes at the worst moment</p>
            <p class="mb-1">An important meeting (or a movie, or sleep), and your phone shakes with SMS alerts: the door sensor triggers again and again. You would switch it all off, but you are not at home.</p>
            <p class="mb-1">Relax! Send the SMS <code>${'222'}</code> (or call and dial <code>${'222'}</code>): all SMS notifications are off, and you get <code>${'ALL SMS notifications are switched OFF!'}</code>. When you are free, send <code>${'777'}</code> and the alerts come back. The sensors and actions on devices worked all that time, only the SMS were silent.</p>
          </div>
          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">A cottage without internet</p>
            <p class="mb-1">In the village there is no router, no Wi-Fi, and not a single app at hand on your phone. You arrive in an hour, and the house is cold.</p>
            <p class="mb-1">Relax! Call the SIM card of the module from the number in the settings. The module picks up by itself, dial <code>${'6#1*#'}</code>, where 6 is a made-up ID of the heating relay. The heating is on, and after the call ends an SMS report arrives.</p>
          </div>
          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">An unknown number is calling</p>
            <p class="mb-1">Someone outside learned the number of the module and keeps calling, trying to dial codes. Unpleasant, right?</p>
            <p class="mb-1">Relax! The module obeys only the number from the <b>"Mobile phone"</b> field: a call from any other number is rejected automatically, and foreign SMS are ignored. Check it yourself: call from another phone and the module drops the call.</p>
          </div>
          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Your number is visible to everyone</p>
            <p class="mb-1">You show the settings to a friend on a video call or take a screenshot for a forum, and your number shines in the table.</p>
            <p class="mb-1">Relax! The number is hidden by asterisks, one per digit, the + sign stays. To see it, click the eye icon next to the number, and it hides again on your next click.</p>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-teal-50 border-teal-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Limits and values</h2>
          <div class="overflow-x-auto">
          <table class="w-full bg-white/70">
            <thead><tr><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Parameter</th><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Value</th></tr></thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap">RXD Pin</td><td class="border px-4 py-2">PA3 (ID 1), fixed</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap">TXD Pin</td><td class="border px-4 py-2">PD5 (ID 35), fixed</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap">Phone Number</td><td class="border px-4 py-2">The + sign and 11 to 20 digits, no spaces or dashes. An empty field - the module is not used</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap">Who can control</td><td class="border px-4 py-2">Only the number from this field</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap">Pins PA3 and PD5</td><td class="border px-4 py-2">While the SIM800L switch on the "Select pin(s)" page is on, their type cannot be changed</td></tr>
            </tbody>
          </table>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-amber-50 border-amber-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Not working? Check</h2>
          <ul class="list-disc ml-6 space-y-1">
            <li>The module is silent to your SMS: check that you write from the number in the <b>"Mobile phone"</b> field (not from another phone) and that it is not empty.</li>
            <li>Commands are executed but there are no replies: the <b>OnOff</b> slider is off. Send <code>${'777'}</code> - the reply comes even with the slider off, and the slider turns on.</li>
            <li>The module does not answer at all: the <b>SIM800L</b> switch on the <b>"Select pin(s)"</b> page is off, the power-up order was broken, or RXD and TXD are swapped.</li>
            <li>The <b>"Save changes"</b> button is gray: the number is invalid, it needs the + sign and 11 to 20 digits.</li>
            <li>The call is dropped at once: you call not from the number set in the settings.</li>
          </ul>
        </section>
      </div>
    `,
  };

  const helpContentSecurity = {
    ru: html`
      <div class="mytext space-y-6 font-sans text-base leading-relaxed text-slate-700 [&_code]:font-sans [&_code]:font-semibold [&_pre]:font-sans">
        <section class="rounded-2xl border-2 bg-indigo-50 border-indigo-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Как подключить датчик (пошагово)</h2>
          <ol class="list-decimal ml-6 space-y-3">
            <li><b>Выберите пин.</b> Откройте страницу <b>"Select pin(s)"</b>, найдите нужный пин, выберите для него режим <b>"Security"</b> и нажмите <b>"Submit"</b>. Если переключатель Security у пина неактивен, этот пин такую роль выполнять не может. После этого пин появится в таблице <b>Security Pins</b>.</li>
            <li><b>Подключите датчик.</b> Геркон: один провод к пину, второй к <b>+3.3V</b>. Датчик движения (PIR): его выход к пину, питание и земля по паспорту датчика. Схемы и логику срабатывания смотрите в блоке "Подключение датчиков" ниже.</li>
            <li><b>Выберите тип датчика.</b> В строке пина нажмите <b>Ред.</b> в колонке <b>Edit Pin</b> и в списке <b>"Type of sensor"</b> выберите <b>PIR</b> (датчик движения), <b>Normal open</b> (нормально открытый геркон) или <b>Normal close</b> (нормально закрытый геркон).</li>
            <li><b>Скажите, что делать.</b> В поле <b>"Action"</b> впишите ID устройства, двоеточие и команду: <b>1</b> - включить, <b>0</b> - выключить, <b>2</b> - переключить. Без пробелов! Несколько устройств через запятую: <code>${'6:1,8:1'}</code>. Если нужны только SMS, напишите <b>None</b>.</li>
            <li><b>Настройте SMS и название.</b> В поле <b>"Send SMS"</b> выберите <b>YES</b>, если нужна SMS-тревога, а в поле <b>"INFO"</b> напишите короткое название места латиницей, например <code>${'Corridor'}</code>. Нажмите <b>"Save changes"</b>.</li>
            <li><b>Включите ползунок On/Off</b> в строке датчика и проверьте: пройдите перед датчиком движения или поднесите и уберите магнит. Если ползунок выключен, датчик игнорируется целиком.</li>
          </ol>
          <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300"><b>Как это работает:</b> прошивка постоянно следит за пином и сама отсеивает дребезг контактов. При срабатывании по очереди: (1) выполняется <b>Action</b> с проверкой условий; (2) событие уходит по MQTT, если <b>Action</b> не пустой; (3) уходит SMS, если <b>Send SMS</b> = YES, и для этого <b>Action</b> не нужен. Повторные срабатывания чаще одного раза в секунду пропускаются.</div>
          <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300"><b>Важно:</b> в поле <b>Action</b> пишется <b>ID устройства, которым вы хотите управлять</b> (реле, лампа, сирена, Zigbee-устройство), а <b>не</b> ID самого датчика.</div>
          <div class="mt-4"><b>Пример.</b> Датчик движения подключён к пину с ID <b>14</b> (все номера условные, у вас будут свои). Лампа коридора - ID <b>6</b>, сирена - ID <b>8</b>. Хотим при движении включить лампу и сирену и получить SMS:
            <ul class="list-disc ml-6 mt-1">
              <li><b>Type of sensor</b> - PIR</li>
              <li><b>Action</b> - <code>${'6:1,8:1'}</code></li>
              <li><b>Send SMS</b> - YES, <b>INFO</b> - <code>${'Corridor'}</code></li>
              <li>Ползунок <b>On/Off</b> включён</li>
            </ul>
            <div class="mt-2">Результат: при движении лампа и сирена включаются, а на телефон приходит <code>${'ALARM:ID=14:Corridor'}</code>.</div></div>
        </section>
        <section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Управление по SMS и DTMF</h2>
          <div><h4 class="text-lg font-bold text-black mt-4 mb-2">Рубильник On/Off по SMS и DTMF</h4><p class="mb-2">Ползунок On/Off любой строки этой страницы можно переключить с телефона, номер которого указан в настройках SIM800L: SMS-сообщением или во время звонка (тональный набор DTMF). Формат команды одинаков на всех страницах: <b>ID#КОД*</b>, где ID - число из колонки ID нужной строки.</p><div class="overflow-x-auto"><table class="w-full border-collapse my-2 bg-white/70"><thead><tr><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">Действие</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">SMS</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">DTMF (во время звонка)</th></tr></thead><tbody><tr><td class="border px-3 py-1">Отключить строку (ползунок Off)</td><td class="border px-3 py-1"><code>${'14#00*'}</code></td><td class="border px-3 py-1"><code>${'14#00*#'}</code></td></tr><tr><td class="border px-3 py-1">Включить строку (ползунок On)</td><td class="border px-3 py-1"><code>${'14#11*'}</code></td><td class="border px-3 py-1"><code>${'14#11*#'}</code></td></tr></tbody></table></div><p class="mb-2">В таблице ID = 14 - это пример, подставьте ID своей строки.</p><p class="mb-2">Несколько команд подряд: <code>${'14#00*15#11*'}</code> (SMS) и <code>${'14#00*15#11*#'}</code> (звонок). Ввод во время звонка всегда завершается символами <code>${'*#'}</code>: последняя команда уже заканчивается на <code>${'*'}</code>, поэтому в конце добавляется только <code>${'#'}</code>.</p><p class="mb-2">Коды для всех страниц: Button, Switch, Encoder, OneWire, Security, Zigbee - <b>00</b> (выкл) и <b>11</b> (вкл); Cron - <b>33</b> и <b>44</b>; PID - <b>55</b> и <b>66</b>.</p><p class="mb-2">В ответ приходит SMS-отчёт, например <code>${'OnOff: Pin14=OFF'}</code>. Он подтверждает, что команда выполнена и ползунок строки переключён, а не перепроверяет сам датчик. Отчёт отправляется, только если включён общий ползунок <b>OnOff</b> в блоке SIM800L Settings. Неверные команды попадают в список Invld pins/cmd.</p><p class="mb-2">Для датчика работают и короткие команды из одной цифры: <code>${'14#0*'}</code> (выключить), <code>${'14#1*'}</code> (включить), <code>${'14#2*'}</code> (переключить). Ответ у них другой, например <code>${'Valid pins: SEC-TY:14:ON'}</code>: в нём сразу видно итоговое состояние датчика.</p><p class="mb-2">Ответа <code>${'DISABLED'}</code> у датчика не бывает: команда сама переключает его ползунок On/Off и выполняется при любом его положении.</p><p class="mb-2">Те же команды работают для строки SIM800L (общий ползунок SMS-уведомлений, ID = 1) и для Zigbee-датчиков движения в таблице Z2M (их ID начинаются с 89). Быстрые коды <code>${'777'}</code> и <code>${'222'}</code> сразу включают и выключают все SMS-уведомления, подробности в справке блока SIM800L Settings.</p></div>
        </section>
        <section class="rounded-2xl border-2 bg-emerald-50 border-emerald-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Настройка SMS-уведомлений</h2>
          <div class="overflow-x-auto">
          <table class="w-full bg-white/70">
            <thead><tr><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Значение в столбце "Send SMS"</th><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что произойдёт</th></tr></thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><b>YES</b></td><td class="border px-4 py-2">SMS-тревога будет отправлена.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><b>NO</b></td><td class="border px-4 py-2">SMS-тревога не будет отправлена.</td></tr>
            </tbody>
          </table>
          </div>
          <div class="p-4 rounded-xl bg-white/80 border border-emerald-300">
            <h4 class="text-lg font-bold text-black mb-2">Примечание</h4>
            <ul class="list-disc ml-6 space-y-1">
              <li>Действия в столбце 'Action' зависят от ползунка 'OnOff' выбранного пина.</li>
              <li>SMS-тревога отправляется, только если включены ползунок 'OnOFF' выбранного пина и общий ползунок 'OnOFF' в блоке SIM800L Settings.</li>
              <li>Send SMS не зависит от поля Action: SMS уйдёт, даже если Action = None.</li>
              <li>Текст тревоги: <code>${'ALARM:ID=14:Corridor'}</code>, где 14 - ID датчика, а Corridor - содержимое поля INFO. Для Zigbee-датчика движения то же самое, например <code>${'ALARM:ID=89:Hall'}</code>.</li>
              <li>Пишите INFO латиницей и цифрами: SMS отправляется в кодировке GSM, и кириллица может не отобразиться.</li>
            </ul>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-violet-50 border-violet-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">MQTT: отслеживание изменений</h2>
          <div class="overflow-x-auto">
          <table class="w-full bg-white/70">
            <thead><tr><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Топик</th><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Описание</th></tr></thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap">Swarm/security/</td><td class="border px-4 py-2">Когда датчик сработал и в поле Action что-то записано, страница отправляет событие по MQTT на топик Swarm/security/. Пример: <code>${'SECURITY/ID=14/ACTION=6:1,8:1/Corridor'}</code>. Где "Swarm" это Ваш 'TX topic'.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap">Swarm/onoff/</td><td class="border px-4 py-2">При каждом изменении ползунка On/Off датчика (на сайте, по SMS или звонку) отправляется <code>${'ID=14/OnOff=OFF/Corridor'}</code>.</td></tr>
            </tbody>
          </table>
          </div>
          <p class="text-slate-700">Если поле Action пустое или None, событие срабатывания по MQTT не отправляется, а SMS уходит как обычно. Условие в Action событие MQTT не блокирует. Для отправки в разделе MQTT должен быть указан 'TX topic'.</p>
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
            <li><b>Условие проверяется и для команды выключения.</b> Запись <code>${'6:0?Ss'}</code> выключит пин 6 только ночью; если условие НЕТ, пин останется как был.</li>
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
        <section class="rounded-2xl border-2 bg-rose-50 border-rose-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Примеры из жизни: что на самом деле умеет эта страница</h2>
          <p class="mb-2">Четыре истории о том, как дом учится охранять себя сам.</p>
          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Сердце ёкнуло в аэропорту</p>
            <p class="mb-1">Вы уже в очереди на посадку, и вдруг мысль: а я поставил дом на охрану? Возвращаться поздно, и сердце колотится.</p>
            <p class="mb-1">Спокойно! Достаньте телефон и отправьте SMS <code>${'14#11*'}</code>, где 14 - ID вашего датчика. Придёт <code>${'OnOff: Pin14=ON'}</code>: команда выполнена, датчик на охране. Если ответа нет, проверьте общий ползунок <b>OnOff</b> в блоке SIM800L Settings.</p>
          </div>
          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Шаги в тёмном коридоре</p>
            <p class="mb-1">Ночью вы идёте на кухню и шарите рукой по стене в поисках выключателя. А днём свет в коридоре вообще не нужен.</p>
            <p class="mb-1">Спокойно! Датчик движения в коридоре, в поле <b>Action</b> записано <code>${'6:1?Ss'}</code>: лампа 6 включается по движению, но только ночью. Днём датчик тоже срабатывает, а лампа спит. Время восхода и заката должно быть задано на странице "Global Settings".</p>
          </div>
          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Окно открыли, пока вас нет</p>
            <p class="mb-1">Вы на работе, а дома кто-то открывает окно. Узнать об этом хочется сразу, а не вечером.</p>
            <p class="mb-1">Спокойно! Магнит на створке, геркон <b>Normal open</b> на раме: пока окно закрыто, магнит рядом. Как только створку открыли, контакты размыкаются и датчик срабатывает. В <b>Action</b> записано <code>${'8:1'}</code> (сирена), <b>Send SMS</b> = YES, <b>INFO</b> = <code>${'Window'}</code>. Сирена воет, на телефон приходит <code>${'ALARM:ID=15:Window'}</code>, а в MQTT уходит событие на Swarm/security/.</p>
          </div>
          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Сигнализация, которая знает, что вы дома</p>
            <p class="mb-1">Сирена на двери - это отлично, пока вы сами не пришли домой. Оправдываться перед соседями совсем не хочется.</p>
            <p class="mb-1">Спокойно! Устройство 10 - ваш "режим охраны". В поле <b>Action</b> датчика двери записано <code>${'8:1?D10'}</code>: сирена включается, только когда устройство 10 включено. Пришли домой - выключили устройство 10, и дверь можно открывать спокойно. Условие запирает только сирену: SMS при Send SMS = YES придёт в любом случае.</p>
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
        <section class="rounded-2xl border-2 bg-orange-50 border-orange-300 p-5 space-y-4">
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
        <section class="rounded-2xl border-2 bg-cyan-50 border-cyan-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Не работает? Проверьте</h2>
          <ul class="list-disc ml-6 space-y-1">
            <li>Ничего не происходит: выключен ползунок <b>On/Off</b> в строке датчика. В таком случае игнорируются и действие, и SMS, и MQTT.</li>
            <li>Действие не выполняется: в <b>Action</b> указан ID самого датчика вместо ID устройства, условие после ? дало НЕТ, или срабатывание пришлось на ту же секунду, что и предыдущее.</li>
            <li>SMS не приходят: выключен общий ползунок <b>OnOff</b> в SIM800L Settings, в строке датчика <b>Send SMS</b> = NO, или не указан номер в поле Phone Number.</li>
            <li>Датчик реагирует не в тот момент: неверно выбран <b>Type of sensor</b>. Normal open и Normal close срабатывают на противоположные события, поэтому для геркона выберите именно тот тип, который у вас стоит.</li>
            <li>Команда по SMS попала в Invld pins/cmd: ID не соответствует строке с ползунком On/Off или команда записана неверно.</li>
          </ul>
        </section>
      </div>
    `,
    en: html`
      <div class="mytext space-y-6 font-sans text-base leading-relaxed text-slate-700 [&_code]:font-sans [&_code]:font-semibold [&_pre]:font-sans">
        <section class="rounded-2xl border-2 bg-indigo-50 border-indigo-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">How to connect a sensor (step by step)</h2>
          <ol class="list-decimal ml-6 space-y-3">
            <li><b>Choose a pin.</b> Open the <b>"Select pin(s)"</b> page, find the pin you need, choose the <b>"Security"</b> mode for it and click <b>"Submit"</b>. If the Security option of a pin is inactive, that pin cannot play this role. After that the pin appears in the <b>Security Pins</b> table.</li>
            <li><b>Connect the sensor.</b> Reed switch: one wire to the pin, the other to <b>+3.3V</b>. Motion sensor (PIR): its output to the pin, power and ground as in the sensor datasheet. Wiring diagrams and the trigger logic are in the "Sensor Connection" block below.</li>
            <li><b>Choose the sensor type.</b> In the pin row click <b>Edit</b> in the <b>Edit Pin</b> column and in the <b>"Type of sensor"</b> list choose <b>PIR</b> (motion sensor), <b>Normal open</b> (normally open reed switch) or <b>Normal close</b> (normally closed reed switch).</li>
            <li><b>Say what to do.</b> In the <b>"Action"</b> field write the ID of a device, a colon and a command: <b>1</b> - turn on, <b>0</b> - turn off, <b>2</b> - toggle. No spaces! Several devices go through commas: <code>${'6:1,8:1'}</code>. If you only need SMS, write <b>None</b>.</li>
            <li><b>Set up SMS and the name.</b> In the <b>"Send SMS"</b> field choose <b>YES</b> if you want an SMS alert, and in the <b>"INFO"</b> field write a short name of the place in Latin letters, for example <code>${'Corridor'}</code>. Click <b>"Save changes"</b>.</li>
            <li><b>Turn on the On/Off slider</b> in the sensor row and test: walk in front of the motion sensor or bring a magnet and take it away. If the slider is off, the sensor is ignored completely.</li>
          </ol>
          <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300"><b>How it works:</b> the firmware watches the pin all the time and filters out contact bounce by itself. When the sensor triggers, in turn: (1) the <b>Action</b> is executed with the conditions checked; (2) the event goes out by MQTT if <b>Action</b> is not empty; (3) an SMS is sent if <b>Send SMS</b> = YES, and <b>Action</b> is not needed for that. Repeated triggers more often than once per second are skipped.</div>
          <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300"><b>Important:</b> the <b>Action</b> field holds <b>the ID of the device you want to control</b> (a relay, a lamp, a siren, a Zigbee device), <b>not</b> the ID of the sensor itself.</div>
          <div class="mt-4"><b>Example.</b> A motion sensor is connected to the pin with ID <b>14</b> (all numbers are made up, yours will differ). The hallway lamp is ID <b>6</b>, the siren is ID <b>8</b>. We want the lamp and the siren to turn on on motion and an SMS to arrive:
            <ul class="list-disc ml-6 mt-1">
              <li><b>Type of sensor</b> - PIR</li>
              <li><b>Action</b> - <code>${'6:1,8:1'}</code></li>
              <li><b>Send SMS</b> - YES, <b>INFO</b> - <code>${'Corridor'}</code></li>
              <li>The <b>On/Off</b> slider is on</li>
            </ul>
            <div class="mt-2">Result: on motion the lamp and the siren turn on, and <code>${'ALARM:ID=14:Corridor'}</code> arrives on your phone.</div></div>
        </section>
        <section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Control by SMS and DTMF</h2>
          <div><h4 class="text-lg font-bold text-black mt-4 mb-2">On/Off switch by SMS and DTMF</h4><p class="mb-2">The On/Off slider of any row on this page can be switched from the phone number set in the SIM800L settings: by SMS or during a call (DTMF tones). The command format is the same on every page: <b>ID#CODE*</b>, where ID is the number from the ID column of the needed row.</p><div class="overflow-x-auto"><table class="w-full border-collapse my-2 bg-white/70"><thead><tr><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">Action</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">SMS</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">DTMF (during a call)</th></tr></thead><tbody><tr><td class="border px-3 py-1">Turn the row off (slider Off)</td><td class="border px-3 py-1"><code>${'14#00*'}</code></td><td class="border px-3 py-1"><code>${'14#00*#'}</code></td></tr><tr><td class="border px-3 py-1">Turn the row on (slider On)</td><td class="border px-3 py-1"><code>${'14#11*'}</code></td><td class="border px-3 py-1"><code>${'14#11*#'}</code></td></tr></tbody></table></div><p class="mb-2">In the table ID = 14 is an example, use the ID of your own row.</p><p class="mb-2">Several commands in a row: <code>${'14#00*15#11*'}</code> (SMS) and <code>${'14#00*15#11*#'}</code> (call). Input during a call always ends with <code>${'*#'}</code>: the last command already ends with <code>${'*'}</code>, so only <code>${'#'}</code> is added at the end.</p><p class="mb-2">Codes for all pages: Button, Switch, Encoder, OneWire, Security, Zigbee - <b>00</b> (off) and <b>11</b> (on); Cron - <b>33</b> and <b>44</b>; PID - <b>55</b> and <b>66</b>.</p><p class="mb-2">An SMS report is sent back, for example <code>${'OnOff: Pin14=OFF'}</code>. It confirms that the command was executed and the row slider was switched; it does not re-check the sensor itself. The report is sent only if the common <b>OnOff</b> slider in the SIM800L Settings block is on. Wrong commands are listed in Invld pins/cmd.</p><p class="mb-2">For a sensor the short one-digit commands work too: <code>${'14#0*'}</code> (turn off), <code>${'14#1*'}</code> (turn on), <code>${'14#2*'}</code> (toggle). Their reply is different, for example <code>${'Valid pins: SEC-TY:14:ON'}</code>: it shows the resulting state of the sensor right away.</p><p class="mb-2">A sensor never gets the <code>${'DISABLED'}</code> reply: the command itself switches its On/Off slider and is executed with the slider in any position.</p><p class="mb-2">The same commands work for the SIM800L row (common SMS alerts slider, ID = 1) and for the Zigbee motion sensors in the Z2M table (their IDs start from 89). The quick codes <code>${'777'}</code> and <code>${'222'}</code> turn all SMS notifications on and off at once, details are in the help of the SIM800L Settings block.</p></div>
        </section>
        <section class="rounded-2xl border-2 bg-emerald-50 border-emerald-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">SMS Notification Settings</h2>
          <div class="overflow-x-auto">
          <table class="w-full bg-white/70">
            <thead><tr><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Value in the "Send SMS" column</th><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What happens</th></tr></thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><b>YES</b></td><td class="border px-4 py-2">An SMS alert will be sent.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><b>NO</b></td><td class="border px-4 py-2">An SMS alert will not be sent.</td></tr>
            </tbody>
          </table>
          </div>
          <div class="p-4 rounded-xl bg-white/80 border border-emerald-300">
            <h4 class="text-lg font-bold text-black mb-2">Note</h4>
            <ul class="list-disc ml-6 space-y-1">
              <li>Actions in the 'Action' column depend on the 'OnOff' slider of the selected pin.</li>
              <li>An SMS alert is sent only when both the pin 'OnOFF' slider and the common 'OnOFF' slider in the SIM800L Settings block are ON.</li>
              <li>Send SMS does not depend on the Action field: the SMS is sent even if Action = None.</li>
              <li>The alert text is <code>${'ALARM:ID=14:Corridor'}</code>, where 14 is the sensor ID and Corridor is the content of the INFO field. For a Zigbee motion sensor it is the same, for example <code>${'ALARM:ID=89:Hall'}</code>.</li>
              <li>Write INFO in Latin letters and digits: the SMS is sent in the GSM charset, and Cyrillic may not display.</li>
            </ul>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-violet-50 border-violet-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">MQTT: change tracking</h2>
          <div class="overflow-x-auto">
          <table class="w-full bg-white/70">
            <thead><tr><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Topic</th><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Description</th></tr></thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap">Swarm/security/</td><td class="border px-4 py-2">When the sensor has triggered and something is written in the Action field, the page sends the event by MQTT to the topic Swarm/security/. Example: <code>${'SECURITY/ID=14/ACTION=6:1,8:1/Corridor'}</code>. Where "Swarm" is your 'TX topic'.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap">Swarm/onoff/</td><td class="border px-4 py-2">Every time the On/Off slider of a sensor changes (on the site, by SMS or by a call), <code>${'ID=14/OnOff=OFF/Corridor'}</code> is sent.</td></tr>
            </tbody>
          </table>
          </div>
          <p class="text-slate-700">If the Action field is empty or None, the trigger event is not sent by MQTT, while the SMS goes out as usual. A condition in Action does not block the MQTT event. To send anything, the 'TX topic' must be set in the MQTT section.</p>
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
            <li><b>The condition is checked for a turn-off command too.</b> The entry <code>${'6:0?Ss'}</code> turns pin 6 off only at night; if the condition is NO, the pin stays as it was.</li>
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
        <section class="rounded-2xl border-2 bg-rose-50 border-rose-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Examples from real life: what this page can really do</h2>
          <p class="mb-2">Four stories about how a home learns to guard itself.</p>
          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Your heart skipped a beat at the airport</p>
            <p class="mb-1">You are already in the boarding line, and suddenly: did I arm the house? It is too late to go back, and your heart is pounding.</p>
            <p class="mb-1">Relax! Take out your phone and send the SMS <code>${'14#11*'}</code>, where 14 is the ID of your sensor. You get <code>${'OnOff: Pin14=ON'}</code>: the command was executed, the sensor is armed. If there is no reply, check the common <b>OnOff</b> slider in the SIM800L Settings block.</p>
          </div>
          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Steps in a dark hallway</p>
            <p class="mb-1">At night you walk to the kitchen, feeling the wall for a switch. In the daytime the hallway light is not needed at all.</p>
            <p class="mb-1">Relax! A motion sensor in the hallway, the <b>Action</b> field says <code>${'6:1?Ss'}</code>: lamp 6 turns on on motion, but only at night. In the daytime the sensor triggers too, and the lamp sleeps. The sunrise and sunset times must be set on the "Global Settings" page.</p>
          </div>
          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">The window was opened while you are away</p>
            <p class="mb-1">You are at work, and at home someone opens a window. You want to know right away, not in the evening.</p>
            <p class="mb-1">Relax! A magnet on the sash, a <b>Normal open</b> reed switch on the frame: while the window is closed, the magnet is near. As soon as the sash is opened, the contacts open and the sensor triggers. The <b>Action</b> says <code>${'8:1'}</code> (siren), <b>Send SMS</b> = YES, <b>INFO</b> = <code>${'Window'}</code>. The siren howls, <code>${'ALARM:ID=15:Window'}</code> arrives on your phone, and an event goes to Swarm/security/ by MQTT.</p>
          </div>
          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">An alarm that knows you are home</p>
            <p class="mb-1">A siren on the door is great, until you come home yourself. Explaining it to the neighbors is the last thing you want.</p>
            <p class="mb-1">Relax! Device 10 is your "guard mode". The <b>Action</b> field of the door sensor says <code>${'8:1?D10'}</code>: the siren turns on only when device 10 is on. You came home - turn device 10 off, and the door can be opened in peace. The condition locks only the siren: with Send SMS = YES the SMS arrives anyway.</p>
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
        <section class="rounded-2xl border-2 bg-orange-50 border-orange-300 p-5 space-y-4">
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
        <section class="rounded-2xl border-2 bg-cyan-50 border-cyan-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Not working? Check</h2>
          <ul class="list-disc ml-6 space-y-1">
            <li>Nothing happens: the <b>On/Off</b> slider in the sensor row is off. Then the action, the SMS and the MQTT event are all ignored.</li>
            <li>The action is not executed: the <b>Action</b> holds the ID of the sensor itself instead of the ID of a device, the condition after ? gave NO, or the trigger came within the same second as the previous one.</li>
            <li>No SMS arrive: the common <b>OnOff</b> slider in SIM800L Settings is off, <b>Send SMS</b> = NO in the sensor row, or the Phone Number field is empty.</li>
            <li>The sensor reacts at the wrong moment: the wrong <b>Type of sensor</b> is chosen. Normal open and Normal close trigger on opposite events, so for a reed switch choose exactly the type you have.</li>
            <li>An SMS command went to Invld pins/cmd: the ID does not match a row with an On/Off slider or the command is written wrongly.</li>
          </ul>
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
          <p class="text-sm text-slate-600 mb-6 max-w-3xl">${language === 'ru' ? 'Три часа ночи, вы за тысячу километров от дома, и мысль не отпускает: а я всё выключил? Вставьте SIM-карту, и Zagotovka-M ответит на ваш звонок и SMS даже там, где нет ни Wi-Fi, ни интернета. Один звонок, и дом снова под вашим контролем!' : 'Three in the morning, you are a thousand kilometers from home, and the thought will not let go: did I turn everything off? Put in a SIM card, and Zagotovka-M answers your call and your SMS even where there is no Wi-Fi and no internet. One call, and the house is under your control again!'}</p>
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
          <p class="text-sm text-slate-600 mb-6 max-w-3xl">${language === 'ru' ? 'В тёмном коридоре что-то скрипнуло, и сердце уже колотится. Спокойно! Датчик движения сам включит свет, а геркон на двери пришлёт SMS раньше, чем вы успеете испугаться. Узнайте, как научить дом охранять себя самому!' : 'Something creaks in the dark hallway, and your heart is already pounding. Relax! A motion sensor turns the light on by itself, and a reed switch on the door texts you before you even get scared. Learn how to teach your home to guard itself!'}</p>
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