import { ModalSIM800L } from '../Modals/ModalSIM800L.js';
import { ModalSecurity } from '../Modals/ModalSecurity.js';
import { h, render, useState, useEffect, useRef, html, Router } from '../bundle.js';
import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';
import { MyPolzunok, Chart, DeveloperNote } from '../main.js';
import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire, ruLangsecurity, ruLangsecuritypins } from '../rulang.js';
import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire, enLangsecurity, enLangsecuritypins } from '../enlang.js';

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

  const i18n = {
    ru: {
      titleSim: 'SIM800L Settings', titlePins: 'Security Pins',
      colRx: 'RXD Pin', colTx: 'TXD Pin', colPhone: 'Phone Number', colInfo: 'Info', colOnOff: 'OnOff', colAction: 'Action',
      colId: 'ID', colPin: 'Pin', colType: 'Type of sensor', colSendSms: 'Send SMS', colEditPin: 'Edit Pin',
      notConfigured: 'Не настроено', notSet: 'Не задан', noInfo: 'Нет инфо', noData: 'Нет доступных данных мониторинга',
      edit: 'Ред.', showHelp: 'Показать справку', hideHelp: 'Скрыть справку',
      connRetry: 'Connection problems. Retrying...', connLost: 'Connection lost. Check your internet connection.'
    },
    en: {
      titleSim: 'SIM800L Settings', titlePins: 'Security Pins',
      colRx: 'RXD Pin', colTx: 'TXD Pin', colPhone: 'Phone Number', colInfo: 'Info', colOnOff: 'OnOff', colAction: 'Action',
      colId: 'ID', colPin: 'Pin', colType: 'Type of sensor', colSendSms: 'Send SMS', colEditPin: 'Edit Pin',
      notConfigured: 'Not configured', notSet: 'Not set', noInfo: 'No info', noData: 'No monitoring data available',
      edit: 'Edit', showHelp: 'Show Help', hideHelp: 'Hide Help',
      connRetry: 'Connection problems. Retrying...', connLost: 'Connection lost. Check your internet connection.'
    }
  };
  const T = i18n[language] || i18n['en'];

  const helpContentSim800L = {
    ru: html`
      <div class="mytext space-y-6">
        <div>
          <h2 class="text-xl font-bold mb-4 text-blue-600">Модуль SIM800L</h2>
          <p class="mb-4">Модуль позволяет управлять "Заготовкой" при помощи мобильной связи - интернет не нужен!</p>
          <div class="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 class="font-bold mb-2">Возможности модуля:</h3>
            <ul class="space-y-2 list-disc pl-5">
              <li>Входящие вызовы и SMS принимаются только с номера, указанного в поле «Phone Number». Вызовы с других номеров отклоняются автоматически, SMS — игнорируются.</li>
              <li>Держит вас в курсе происходящего при помощи SMS-уведомлений</li>
              <li>Включается и отключается при помощи ползунка 'OnOFF'</li>
            </ul>
          </div>
          <div class="space-y-4">
            <div class="p-3 bg-green-50 rounded">
              <p class="font-bold">Когда ползунок 'OnOFF' ВКЛючен:</p>
              <p>SMS-уведомления работают по вашим настройкам из таблицы 'Security Pins'</p>
            </div>
            <div class="p-3 bg-gray-50 rounded">
              <p class="font-bold">Когда ползунок 'OnOFF' ОТКлючен:</p>
              <p>Все SMS-уведомления отключены, настройки из таблицы 'Security Pins' не учитываются</p>
            </div>
          </div>
          <div class="mt-6 bg-red-50 p-4 rounded-lg">
            <h3 class="text-red-600 font-bold mb-2">ВАЖНО!</h3>
            <ul class="space-y-2 list-disc pl-5 text-red-700">
              <li>Установить SIM-карту в модуль SIM800L</li>
              <li>Включить SIM800L → Дождаться подключения к GSM → Включить STM32</li>
            </ul>
          </div>
        </div>
      </div>`,
    en: html`
      <div class="mytext space-y-6">
        <div>
          <h2 class="text-xl font-bold mb-4 text-blue-600">SIM800L Module</h2>
          <p class="mb-4">The module controls your "Template" using mobile network - no internet required!</p>
          <div class="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 class="font-bold mb-2">Module capabilities:</h3>
            <ul class="space-y-2 list-disc pl-5">
              <li>Incoming calls and SMS messages are accepted only from the number specified in the “Phone Number” field. Calls from other numbers are automatically rejected, and SMS messages are ignored.</li>
              <li>Keeps you updated using SMS notifications</li>
              <li>Turns ON and OFF using the 'OnOFF' slider</li>
            </ul>
          </div>
          <div class="space-y-4">
            <div class="p-3 bg-green-50 rounded">
              <p class="font-bold">When 'OnOFF' slider is ON:</p>
              <p>SMS notifications work according to your settings in the 'Security Pins' table</p>
            </div>
            <div class="p-3 bg-gray-50 rounded">
              <p class="font-bold">When 'OnOFF' slider is OFF:</p>
              <p>All SMS notifications are disabled, settings in the 'Security Pins' table are ignored</p>
            </div>
          </div>
          <div class="mt-6 bg-red-50 p-4 rounded-lg">
            <h3 class="text-red-600 font-bold mb-2">IMPORTANT!</h3>
            <ul class="space-y-2 list-disc pl-5 text-red-700">
              <li>Insert SIM card into the SIM800L module</li>
              <li>Turn ON SIM800L → Wait for GSM connection → Turn ON STM32</li>
            </ul>
          </div>
        </div>
      </div>`
  };

  const helpContentSecurity = {
    ru: html`
      <div class="mytext space-y-6">
        <div>
          <h2 class="text-xl font-bold mb-4 text-blue-600">Подключение датчиков 🔌</h2>
          <div class="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 class="font-bold mb-3">Нормально открытый геркон <span class="text-blue-500 font-bold">(Normal open)</span></h3>
            <ul class="space-y-2">
              <li>• Контакты разомкнуты без магнитного поля</li>
              <li>• Контакты замыкаются при поднесении магнита</li>
              <li>• Подключение: один провод к пину STM32, второй к <span class="text-red-500 font-bold">+3.3V</span></li>
            </ul>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 class="font-bold mb-3">Нормально закрытый геркон <span class="text-blue-500 font-bold">(Normal close)</span></h3>
            <ul class="space-y-2">
              <li>• Контакты замкнуты без магнитного поля</li>
              <li>• Контакты размыкаются при поднесении магнита</li>
              <li>• Подключение: один провод к пину STM32, второй к <span class="text-red-500 font-bold">+3.3V</span></li>
            </ul>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 class="font-bold mb-3">Датчики движения <span class="text-blue-500 font-bold">(PIR)</span></h3>
            <ul class="space-y-2">
              <li>• В покое: выход LOW (логический 0)</li>
              <li>• При движении: выход HIGH (логическая 1, максимум <span class="text-red-500 font-bold">+3.3V</span>)</li>
            </ul>
          </div>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-4 text-blue-600">Настройка SMS-уведомлений 📱</h2>
          <div class="space-y-4">
            <div class="p-3 bg-green-50 rounded">
              <p class="font-bold">Значение <span class="text-blue-500 font-bold">'YES'</span> в столбце "Send SMS":</p>
              <p>SMS-уведомление будет отправлено</p>
            </div>
            <div class="p-3 bg-gray-50 rounded">
              <p class="font-bold">Значение <span class="text-blue-500 font-bold">'NO'</span> в столбце "Send SMS":</p>
              <p>SMS-уведомление не будет отправлено</p>
            </div>
          </div>
          <div class="mt-4 bg-yellow-50 p-4 rounded-lg">
            <h3 class="font-bold mb-2">Примечание:</h3>
            <ul class="space-y-2">
              <li>• Действия в столбце 'Action' зависят от ползунка 'OnOff' выбранного пина.</li>
            </ul>
          </div>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2 mt-6">Отслеживание изменений</h2>
          <table class="w-full">
            <thead>
              <tr><th class="border px-4 py-2">Топик</th><th class="border px-4 py-2">Описание</th></tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">Swarm/security/</td>
                <td class="border px-4 py-2">Данная страница отслеживает изменения сенсоров и автоматически отправляет каждое изменение по MQTT на топик: Swarm/security/. Где "Swarm" это Ваш 'TX topic'.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>`,
    en: html`
      <div class="mytext space-y-6">
        <div>
          <h2 class="text-xl font-bold mb-4 text-blue-600">Sensor Connection 🔌</h2>
          <div class="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 class="font-bold mb-3">Normally Open Reed Switch <span class="text-blue-500 font-bold">(Normal open)</span></h3>
            <ul class="space-y-2">
              <li>• Contacts are open without magnetic field</li>
              <li>• Contacts close when magnet is nearby</li>
              <li>• Connection: one wire to STM32 pin, another to <span class="text-red-500 font-bold">+3.3V</span></li>
            </ul>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 class="font-bold mb-3">Normally Closed Reed Switch <span class="text-blue-500 font-bold">(Normal close)</span></h3>
            <ul class="space-y-2">
              <li>• Contacts are closed without magnetic field</li>
              <li>• Contacts open when magnet is nearby</li>
              <li>• Connection: one wire to STM32 pin, another to <span class="text-red-500 font-bold">+3.3V</span></li>
            </ul>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 class="font-bold mb-3">Motion Sensors <span class="text-blue-500 font-bold">(PIR)</span></h3>
            <ul class="space-y-2">
              <li>• At rest: output LOW (logical 0)</li>
              <li>• When motion detected: output HIGH (logical 1, max <span class="text-red-500 font-bold">+3.3V</span>)</li>
            </ul>
          </div>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-4 text-blue-600">SMS Notification Settings 📱</h2>
          <div class="space-y-4">
            <div class="p-3 bg-green-50 rounded">
              <p class="font-bold">Value <span class="text-blue-500 font-bold">'YES'</span> in "Send SMS" column:</p>
              <p>SMS notification will be sent</p>
            </div>
            <div class="p-3 bg-gray-50 rounded">
              <p class="font-bold">Value <span class="text-blue-500 font-bold">'NO'</span> in "Send SMS" column:</p>
              <p>SMS notification will not be sent</p>
            </div>
          </div>
          <div class="mt-4 bg-yellow-50 p-4 rounded-lg">
            <h3 class="font-bold mb-2">Note:</h3>
            <ul class="space-y-2">
              <li>• Actions in the 'Action' column depend on the 'OnOff' slider of the selected pin.</li>
              <li>• This page sends changes via MQTT to topic: <span class="text-blue-500 font-bold">Swarm/security/</span></li>
            </ul>
          </div>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2 mt-6">Tracking Changes</h2>
          <table class="w-full">
            <thead>
              <tr><th class="border px-4 py-2">Topic</th><th class="border px-4 py-2">Description</th></tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">Swarm/security/</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>`
  };

  useEffect(() => { initGlobalTooltip(); }, []);
  const fetchSecurityAll = async () => {
    if (isSaving || Date.now() - lastSaveTime < 500) return;
    try {
      const r = await fetch('/api/security/get'); const data = await r.json();
      setSim800lData({ lang: data.lang, sim800l: data.sim800l, onoff: data.onoff, tel: data.tel, info: data.info });
      setMonitoring(data.pins || []); setConnectionStatus('connected');
    } catch (e) { setConnectionStatus('error'); }
  };
  useEffect(() => {
    fetch('/api/security/get').then(r => r.json()).then(data => setLanguage(data.lang || 'ru'));
    const interval = setInterval(fetchSecurityAll, 1000); return () => clearInterval(interval);
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
    <div class="flex flex-col items-center w-full p-4">
      ${connectionStatus !== 'connected' && html`
        <div class="w-full p-2 mb-4 text-white text-center rounded-xl shadow-md backdrop-blur-md ${connectionStatus === 'error' ? 'bg-yellow-500/80' : 'bg-red-500/80'}">
          ${connectionStatus === 'error' ? T.connRetry : T.connLost}
        </div>
      `}
      <div class="flex flex-col items-center w-full p-6 bg-white/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 relative overflow-hidden">
        <div class="w-full mb-10">
          <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight mb-6 drop-shadow-sm">${T.titleSim}</h2>
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
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">${sim800lData.tel || T.notSet}</td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">${sim800lData.info || T.noInfo}</td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium"><${MyPolzunok} value=${sim800lData.onoff} onChange=${(v) => handleSim800lSave({ ...sim800lData, onoff: v })} /></td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium"><button onClick=${() => setIsModalOpenSim800L(true)} class="text-teal-600 hover:text-cyan-600 font-bold transition-colors">${T.edit}</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex justify-end mt-6 w-full"><button onclick=${() => setShowHelpSim800L(!showHelpSim800L)} class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40">${showHelpSim800L ? T.hideHelp : T.showHelp}</button></div>
          ${showHelpSim800L && html`<div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">${helpContentSim800L[language]}</div>`}
        </div>

        <div class="w-full">
          <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight mb-6 drop-shadow-sm">${T.titlePins}</h2>
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
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium">${d.id}</td><td class="px-6 py-4 text-sm text-slate-800 font-medium">${d.pins}</td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium">${['PIR', 'Normal open', 'Normal close'][d.ptype]}</td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium">${d.action}</td><td class="px-6 py-4 text-sm text-slate-800 font-medium">${d.send_sms}</td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium">${d.info}</td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium"><${MyPolzunok} value=${d.onoff} onChange=${(v) => { fetch('/api/onoff/set', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: d.id, onoff: v }) }); setMonitoring(prev => prev.map(item => item.id === d.id ? { ...item, onoff: v } : item)); }} /></td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium"><button onClick=${() => { setSelectedSecurity(d); setModalType('edit'); setIsSecurityModalOpen(true); }} class="text-teal-600 hover:text-cyan-600 font-bold transition-colors">${T.edit}</button></td>
                  </tr>`) : html`<tr><td colspan="8" class="px-6 py-4 text-center text-sm text-slate-600 font-medium">${T.noData}</td></tr>`}
              </tbody>
            </table>
          </div>
          <div class="flex justify-end mt-6 w-full"><button onclick=${() => setShowHlp(!showHelpSecurity)} class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40">${showHelpSecurity ? T.hideHelp : T.showHelp}</button></div>
          ${showHelpSecurity && html`<div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">${helpContentSecurity[language]}</div>`}
        </div>
      </div>
      ${isModalOpenSim800L && html`<${ModalSIM800L} hideModal=${() => setIsModalOpenSim800L(false)} title=${T.edit} selectedGps=${sim800lData} onSave=${handleSim800lSave} />`}
      ${isSecurityModalOpen && html`<${ModalSecurity} modalType=${modalType} page="TabSecurity" hideModal=${() => setIsSecurityModalOpen(false)} title=${T.edit} selectedSecurity=${selectedSecurity} onSecurityChange=${(upd) => { setMonitoring(prev => prev.map(i => i.id === upd.id ? upd : i)); setIsSecurityModalOpen(false); }} />`}
    </div>
  `;
};

export { TabSecurity };
