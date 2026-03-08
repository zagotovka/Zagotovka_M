import { ModalSIM800L } from '../Modals/ModalSIM800L.js';
import { ModalSecurity } from '../Modals/ModalSecurity.js';
import { h, render, useState, useEffect, useRef, html, Router } from '../bundle.js';
import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';
import { MyPolzunok, Chart, DeveloperNote } from '../main.js';
import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire } from '../rulang.js';
import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire } from '../enlang.js';

const TabSecurity = () => {
  const [sim800lData, setSim800lData] = useState({
    lang: 'ru',
    sim800l: 0,
    onoff: 0,
    tel: '',
    info: ''
  });
  const [isModalOpenSim800L, setIsModalOpenSim800L] = useState(false);
  const [showHelpSim800L, setShowHelpSim800L] = useState(false);
  const [varmonitoring, setMonitoring] = useState([]);
  const [showHelpSecurity, setShowHlp] = useState(false);
  const [language, setLanguage] = useState('ru');
  // New state for Security modal
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedSecurity, setSelectedSecurity] = useState(null);

  const [isSaving, setIsSaving] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected'); // 'connected', 'disconnected', 'error'
  const [lastSaveTime, setLastSaveTime] = useState(0);
  // Debounce функция
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const fetchWithRetry = async (url, options = {}, retries = 3) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error('Network response was not ok');
      setConnectionStatus('connected');
      return response;
    } catch (error) {
      setConnectionStatus('error');
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return fetchWithRetry(url, options, retries - 1);
      }
      setConnectionStatus('disconnected');
      throw error;
    }
  };
  // Help content for SIM800L
  const helpContentSim800L = {
    ru: html`
      <div className="space-y-6 max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">
            Модуль SIM800L📱
          </h2>
          <p className="text-gray-600 mb-4">
            Модуль позволяет управлять "Заготовкой" при помощи мобильной связи - интернет не нужен!
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2">Возможности модуля:</h3>
            <ul className="space-y-2 list-disc pl-5">
              <li>Принимает звонки на номер телефона (указывается в разделе "Mobile phone")</li>
              <li>Держит вас в курсе происходящего при помощи SMS-уведомлений</li>
              <li>Включается и отключается при помощи ползунка 'OnOFF'</li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-green-50 rounded">
              <p className="font-medium">✅ Когда ползунок 'OnOFF' ВКЛючен:</p>
              <p>SMS-уведомления работают по вашим настройкам из таблицы 'Security Pins'</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <p className="font-medium">⭕ Когда ползунок 'OnOFF' ОТКлючен:</p>
              <p>Все SMS-уведомления отключены, настройки из таблицы 'Security Pins' не учитываются</p>
            </div>
          </div>
          <div className="mt-6 bg-red-50 p-4 rounded-lg">
            <h3 className="text-red-600 font-semibold mb-2">📍 ВАЖНО!</h3>
            <ul className="space-y-2 list-disc pl-5 text-red-700">
              <li>Установить SIM-карту в модуль SIM800L</li>
              <li>Включить SIM800L → Дождаться подключения к GSM → Включить STM32</li>
            </ul>
          </div>
        </div>
      </div>
    `,
    en: html`
      <div className="space-y-6 max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">
            SIM800L Module📱
          </h2>
          <p className="text-gray-600 mb-4">
            The module controls your "Template" using mobile network - no internet required!
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2">Module capabilities:</h3>
            <ul className="space-y-2 list-disc pl-5">
              <li>Receives calls to the phone number (specified in the "Mobile phone" section)</li>
              <li>Keeps you updated using SMS notifications</li>
              <li>Turns ON and OFF using the 'OnOFF' slider</li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-green-50 rounded">
              <p className="font-medium">✅ When 'OnOFF' slider is ON:</p>
              <p>SMS notifications work according to your settings in the 'Security Pins' table</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <p className="font-medium">⭕ When 'OnOFF' slider is OFF:</p>
              <p>All SMS notifications are disabled, settings in the 'Security Pins' table are ignored</p>
            </div>
          </div>
          <div className="mt-6 bg-red-50 p-4 rounded-lg">
            <h3 className="text-red-600 font-semibold mb-2">📍 IMPORTANT!</h3>
            <ul className="space-y-2 list-disc pl-5 text-red-700">
              <li>Insert SIM card into the SIM800L module</li>
              <li>Turn ON SIM800L → Wait for GSM connection → Turn ON STM32</li>
            </ul>
          </div>
        </div>
      </div>
    `
  };

  const helpContentSecurity = {
    ru: html`
      <div className="space-y-6 max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">
            Подключение датчиков 🔌
          </h2>
  
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-3">Нормально открытый геркон <span className="text-blue-500 font-bold">(Normal open)</span></h3>
            <ul className="space-y-2">
              <li>• Контакты разомкнуты без магнитного поля</li>
              <li>• Контакты замыкаются при поднесении магнита</li>
              <li>• Подключение: один провод к пину STM32, второй к <span className="text-red-500 font-bold">+3.3V</span></li>
            </ul>
          </div>
  
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-3">Нормально закрытый геркон <span className="text-blue-500 font-bold">(Normal close)</span></h3>
            <ul className="space-y-2">
              <li>• Контакты замкнуты без магнитного поля</li>
              <li>• Контакты размыкаются при поднесении магнита</li>
              <li>• Подключение: один провод к пину STM32, второй к <span className="text-red-500 font-bold">+3.3V</span></li>
            </ul>
          </div>
  
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-3">Датчики движения <span className="text-blue-500 font-bold">(PIR)</span></h3>
            <ul className="space-y-2">
              <li>• В покое: выход LOW (логический 0)</li>
              <li>• При движении: выход HIGH (логическая 1, максимум <span className="text-red-500 font-bold">+3.3V</span>)</li>
            </ul>
          </div>
  
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4 text-blue-600">
              Настройка SMS-уведомлений 📱
            </h2>
            
            <div className="space-y-4">
              <div className="p-3 bg-green-50 rounded">
                <p className="font-medium">✅ Значение <span className="text-blue-500 font-bold">'YES'</span> в столбце "Send SMS" таблицы 'Security Pins':</p>
                <p>SMS-уведомление будет отправлено</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-medium">⭕ Значение <span className="text-blue-500 font-bold">'NO'</span> в столбце "Send SMS" таблицы 'Security Pins':</p>
                <p>SMS-уведомление не будет отправлено</p>
              </div>
            </div>
  
            <div className="mt-4 bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">📍 Примечание:</h3>
              <ul className="space-y-2">
                <li>• Действия в столбце 'Action' зависят от ползунка 'OnOff' выбранного пина, и не зависят от настройки "Send SMS"!</li>
                <li>• Данная страница отслеживает изменения сенсоров и автоматически отправляет каждое изменение по MQTT на топик: <span className="text-blue-500 font-bold">Swarm/security/ </span> Где "Swarm" это Ваш 'TX topic' на странице Settings.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `,
    en: html`
      <div className="space-y-6 max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">
            Sensor Connection 🔌
          </h2>
  
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-3">Normally Open Reed Switch <span className="text-blue-500 font-bold">(Normal open)</span></h3>
            <ul className="space-y-2">
              <li>• Contacts are open without magnetic field</li>
              <li>• Contacts close when magnet is nearby</li>
              <li>• Connection: one wire to STM32 pin, another to <span className="text-red-500 font-bold">+3.3V</span></li>
            </ul>
          </div>
  
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-3">Normally Closed Reed Switch <span className="text-blue-500 font-bold">(Normal close)</span></h3>
            <ul className="space-y-2">
              <li>• Contacts are closed without magnetic field</li>
              <li>• Contacts open when magnet is nearby</li>
              <li>• Connection: one wire to STM32 pin, another to <span className="text-red-500 font-bold">+3.3V</span></li>
            </ul>
          </div>
  
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-3">Motion Sensors <span className="text-blue-500 font-bold">(PIR)</span></h3>
            <ul className="space-y-2">
              <li>• At rest: output LOW (logical 0)</li>
              <li>• When motion detected: output HIGH (logical 1, maximum <span className="text-red-500 font-bold">+3.3V</span>)</li>
            </ul>
          </div>
  
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4 text-blue-600">
              SMS Notification Settings 📱
            </h2>
            
            <div className="space-y-4">
              <div className="p-3 bg-green-50 rounded">
                <p className="font-medium">✅ Value <span className="text-blue-500 font-bold">'YES'</span> in "Send SMS" column of 'Security Pins' table:</p>
                <p>SMS notification will be sent</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-medium">⭕ Value <span className="text-blue-500 font-bold">'NO'</span> in "Send SMS" column of 'Security Pins' table:</p>
                <p>SMS notification will not be sent</p>
              </div>
            </div>
  
            <div className="mt-4 bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">📍 Note:</h3>
              <ul className="space-y-2">
                <li>• Actions in the 'Action' column depend on the 'OnOff' slider of the selected pin, and do not depend on the "Send SMS" setting!</li>
                <li>• This page monitors sensor changes and automatically sends each change via MQTT to the topic: <span className="text-blue-500 font-bold">Swarm/security/ </span> Where "Swarm" is your 'TX topic' on the Settings page.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  };

  const fetchSIM800LData = async () => {
    if (isSaving || Date.now() - lastSaveTime < 500) return;

    try {
      const response = await fetchWithRetry('/api/sim800l/get');
      const data = await response.json();
      setSim800lData(data);
    } catch (error) {
      console.error('Error fetching SIM800L data:', error);
    }
  };

  const fetchSecurityData = async () => {
    if (isSaving || Date.now() - lastSaveTime < 500) return;

    try {
      const response = await fetchWithRetry('/api/monitoring/get');
      const data = await response.json();
      setMonitoring(data.pins || []);
      setLanguage(data.lang || 'ru');
    } catch (error) {
      console.error('Error fetching monitoring data:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchSIM800LData();
      fetchSecurityData();
    }, 500); // Обновление каждые 500 мс

    return () => clearInterval(interval); // Очистка при размонтировании
  }, []);

  // Handler onoff for SIM800L
  const handleSim800lSave = debounce(async (updatedData) => {
    setIsSaving(true);
    try {
      const response = await fetchWithRetry('/api/sim800l/set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });

      setSim800lData(updatedData);
      setLastSaveTime(Date.now());
    } catch (error) {
      console.error('Error updating SIM800L:', error);
    } finally {
      setIsSaving(false);
    }
  }, 300);

  // Handler for Security changes
  const handleSecurityChange = async (updatedSecurity) => {
    try {
      const response = await fetch('/api/monitoring/set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSecurity)
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      setMonitoring((prevMonitoring) =>
        prevMonitoring.map((item) =>
          item.id === updatedSecurity.id ? updatedSecurity : item
        )
      );

      await fetchSecurityData();
      setIsSecurityModalOpen(false);
    } catch (error) {
      console.error('Error updating security:', error);
      alert('Failed to save changes. Please try again.');
      await fetchSecurityData();
    }
  };

  // Handler for onoff changes
  const handleOnOffChange = (updatedSecurity) => {
    console.log('handleOnOffChange:', updatedSecurity);

    // Обновляем состояние
    setMonitoring((prevMonitoring) =>
      prevMonitoring.map((item) =>
        item.id === updatedSecurity.id
          ? { ...item, ...updatedSecurity }
          : item
      )
    );

    // Отправляем обновление на сервер
    fetch('/api/onoff/set', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: updatedSecurity.id, onoff: updatedSecurity.onoff })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response from /api/onoff/set:', data);
        // Обновление будет получено при следующем fetchSecurityData
      })
      .catch((error) => {
        console.error('Error calling /api/onoff/set:', error);
      });

    closeModal();
  };

  // Handler for opening Security modal
  const openModal = (type, security) => {
    setModalType(type);
    setSelectedSecurity(security);
    setIsSecurityModalOpen(true);
  };

  return html`
    <div class="flex flex-col items-center w-full p-4">
      ${connectionStatus !== 'connected' &&
    html`
        <div
          class=${`w-full p-2 mb-4 text-white text-center rounded-xl shadow-md backdrop-blur-md 
          ${connectionStatus === 'error' ? 'bg-yellow-500/80 border border-yellow-400/50' : 'bg-red-500/80 border border-red-400/50'}`}
        >
          ${connectionStatus === 'error'
        ? 'Connection problems. Retrying...'
        : 'Connection lost. Check your internet connection.'}
        </div>
      `}
      <div class="flex flex-col items-center w-full p-6 bg-white/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/50">
        <div class="w-full mb-10">
          <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight mb-6 drop-shadow-sm">SIM800L Settings</h2>
          
          <div class="overflow-x-auto w-full rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm mb-4">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-teal-600/10 border-b border-teal-600/20">
                  <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide">RXD Pin</th>
                  <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide">TXD Pin</th>
                  <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide">Phone Number</th>
                  <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide">Info</th>
                  <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide">OnOff</th>
                  <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/40">
                <tr class="bg-white/80 hover:bg-slate-200/80 transition-colors">
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">
                    ${sim800lData.sim800l === 1 ? 'PA3(1)' : 'Not configured'}
                  </td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">
                    ${sim800lData.sim800l === 1 ? 'PD5(35)' : 'Not configured'}
                  </td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">${sim800lData.tel || 'Not set'}</td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">${sim800lData.info || 'No info'}</td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">
                    <${MyPolzunok}
                      value=${sim800lData.onoff}
                      onChange=${(value) =>
      handleSim800lSave({ ...sim800lData, onoff: value })}
                    />
                  </td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">
                    <button
                      onClick=${() => setIsModalOpenSim800L(true)}
                      class="text-teal-600 hover:text-cyan-600 font-bold transition-colors"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="flex justify-end w-full">
            <button
              onClick=${() => setShowHelpSim800L(!showHelpSim800L)}
              class="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-white transition-all duration-300 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl hover:from-teal-400 hover:to-cyan-500 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_0_15px_rgba(20,184,166,0.4)]"
            >
              <span class="relative flex items-center gap-2">
                ${showHelpSim800L ? 'Hide Help' : 'Show Help'}
              </span>
            </button>
          </div>
          ${showHelpSim800L && helpContentSim800L[language]}
        </div>

        <div class="w-full">
          <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight mb-6 drop-shadow-sm">Security Pins</h2>
          
          <div class="overflow-x-auto w-full rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm mb-4">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-teal-600/10 border-b border-teal-600/20">
                  <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide">ID</th>
                  <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide">Pin</th>
                  <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide">Type of sensor</th>
                  <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide">Action</th>
                  <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide">Send SMS</th>
                  <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide">INFO</th>
                  <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide">On/Off</th>
                  <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide">Edit Pin</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/40">
                ${varmonitoring.length > 0
      ? varmonitoring.map(
        (d, index) => html`
                        <tr
                          class="${index % 2 === 1 ? 'bg-white/80' : 'bg-sky-200/40'} hover:bg-slate-200/80 transition-colors"
                        >
                          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${d.id}</td>
                          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${d.pins}</td>
                          <td class="px-6 py-4 text-sm text-slate-800 font-medium">
                            ${['PIR', 'Normal open', 'Normal close'][d.ptype]}
                          </td>
                          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${d.action}</td>
                          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${d.send_sms}</td>
                          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${d.info}</td>
                          <td class="px-6 py-4 text-sm text-slate-800 font-medium">
                            <${MyPolzunok}
                              value=${d.onoff}
                              onChange=${(value) =>
            handleOnOffChange({ ...d, onoff: value })}
                            />
                          </td>
                          <td class="px-6 py-4 text-sm text-slate-800 font-medium">
                            <button
                              onClick=${() => openModal('edit', d)}
                              class="text-teal-600 hover:text-cyan-600 font-bold transition-colors"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      `
      )
      : html`
                      <tr>
                        <td colspan="8" class="px-6 py-4 text-center text-sm text-slate-600 font-medium">
                          No monitoring data available
                        </td>
                      </tr>
                    `}
              </tbody>
            </table>
          </div>
          
          <div class="flex justify-end mt-4">
            <button
              onClick=${() => setShowHlp(!showHelpSecurity)}
              class="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-white transition-all duration-300 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl hover:from-teal-400 hover:to-cyan-500 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_0_15px_rgba(20,184,166,0.4)]"
            >
              <span class="relative flex items-center gap-2">
                ${showHelpSecurity ? 'Hide Help' : 'Show Help'}
              </span>
            </button>
          </div>
          ${showHelpSecurity && helpContentSecurity[language]}
        </div>

        ${isModalOpenSim800L &&
    html`
          <${ModalSIM800L}
            hideModal=${() => setIsModalOpenSim800L(false)}
            title="Edit SIM800L Settings"
            selectedGps=${sim800lData}
            onSave=${handleSim800lSave}
          />
        `}
        ${isSecurityModalOpen &&
    html`
          <${ModalSecurity}
            modalType=${modalType}
            page="TabSecurity"
            hideModal=${() => setIsSecurityModalOpen(false)}
            title="Edit Security Settings"
            selectedSecurity=${selectedSecurity}
            onSecurityChange=${handleSecurityChange}
          />
        `}
      </div>
    </div>
  `;
};

export { TabSecurity };
