import { h, render, useState, useEffect, useRef, html, Router } from '../bundle.js';
import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';
import { MyPolzunok, Chart, DeveloperNote, pageSetting, ipRegex, subnetMaskRegex, Toast } from '../main.js';
import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire } from '../rulang.js';
import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire } from '../enlang.js';

function Settings({ }) {
  const [settings, setSettings] = useState({});
  const [saveResult, setSaveResult] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const [toast, setToast] = useState(null);
  const [topNotification, setTopNotification] = useState(null);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [isPrivateKeyHidden, setIsPrivateKeyHidden] = useState(false);
  const [isPublicKeyHidden, setIsPublicKeyHidden] = useState(false);
  const [isSecretKeyHidden, setIsSecretKeyHidden] = useState(false);
  const [isTelegramTokenHidden, setIsTelegramTokenHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'ru', label: 'Russian' }
  ];

  const timeZone = [
    [-12.0, '(GMT -12:00) Eniwetok, Kwajalein'],
    [-11.0, '(GMT -11:00) Midway Island, Samoa'],
    [-10.0, '(GMT -10:00) Hawaii'],
    [-9.0, '(GMT -9:00) Alaska'],
    [-8.0, '(GMT -8:00) Pacific Time (US & Canada)'],
    [-7.0, '(GMT -7:00) Mountain Time (US & Canada)'],
    [-6.0, '(GMT -6:00) Central Time (US & Canada), Mexico City'],
    [-5.0, '(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima'],
    [-4.0, '(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz'],
    [-3.3, '(GMT -3:30) Newfoundland'],
    [-3.0, '(GMT -3:00) Brazil, Buenos Aires, Georgetown'],
    [-2.0, '(GMT -2:00) Mid-Atlantic'],
    [-1.0, '(GMT -1:00) Azores, Cape Verde Islands'],
    [0.0, '(GMT +0:00) Western Europe Time, London, Lisbon, Casablanca'],
    [1.0, '(GMT +1:00) Brussels, Copenhagen, Madrid, Paris'],
    [2.0, '(GMT +2:00) Kaliningrad, South Africa'],
    [3.0, '(GMT +3:00) Яшалта, Moscow, St. Petersburg, Baghdad, Riyadh'],
    [3.3, '(GMT +3:30) Tehran'],
    [4.0, '(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi'],
    [4.3, '(GMT +4:30) Kabul'],
    [5.0, '(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent'],
    [5.3, '(GMT +5:30) Bombay, Calcutta, Madras, New Delhi'],
    [5.45, '(GMT +5:45) Kathmandu'],
    [6.0, '(GMT +6:00) Almaty, Dhaka, Colombo'],
    [7.0, '(GMT +7:00) Bangkok, Hanoi, Jakarta'],
    [8.0, '(GMT +8:00) Beijing, Perth, Singapore, Hong Kong'],
    [9.0, '(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk'],
    [9.3, '(GMT +9:30) Adelaide, Darwin'],
    [10.0, '(GMT +10:00) Eastern Australia, Guam, Vladivostok'],
    [11.0, '(GMT +11:00) Magadan, Solomon Islands, New Caledonia'],
    [12.0, '(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka']
  ];

  const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const subnetMaskRegex = /^(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)$/;

  const parseOfflineDateTime = (offldt) => {
    if (!offldt) return { date: '', time: '' };

    const dateMatch = offldt.match(/d:(\d{1,2}\.\d{1,2}\.\d{2})/);
    const timeMatch = offldt.match(/t:(\d{2}:\d{2}:\d{2})/);

    return {
      date: dateMatch ? dateMatch[1] : '',
      time: timeMatch ? timeMatch[1] : ''
    };
  };

  const validateDateFormat = (dateStr) => {
    const pattern = /^\d{1,2}\.\d{1,2}\.\d{2}$/;
    if (!pattern.test(dateStr)) return false;
    const [day, month, year] = dateStr.split('.').map(Number);
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    if (year < 0 || year > 99) return false;
    const currentYear = new Date().getFullYear() % 100;
    if (year > currentYear + 5) return false;
    const daysInMonth = new Date(2000 + year, month, 0).getDate();
    if (day > daysInMonth) return false;
    return true;
  };

  const validateTimeFormat = (timeStr) => {
    const pattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    if (!pattern.test(timeStr)) return false;
    return true;
  };

  const isFormValid = (settings, errors) => {
    const hasErrors = Object.values(errors).some((error) => error !== null);

    // Игнорируем проверку поля domain, если HTTPS отключен
    const requiredFieldsFilled = settings.usehttps
      ? settings.domain && settings.domain.trim() !== ''
      : true; // Если HTTPS отключен, не проверяем это поле

    return !(hasErrors || !requiredFieldsFilled);
  };


  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const showTopNotification = (message) => {
    setTopNotification(message);
    setTimeout(() => {
      setTopNotification(null);
    }, 3000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => showToast('Скопировано в буфер обмена', 'success'))
      .catch(() => showToast('Ошибка при копировании', 'error'));
  };

  const handleCopyPublicKey = () => {
    if (settings.tls_cert) {
      copyToClipboard(settings.tls_cert);
    }
  };

  const validateInput = (key, value) => {
    let error = null;

    // Если usehttps отключен, пропускаем валидацию HTTPS-полей
    if (!settings.usehttps && ['domain', 'tls_key', 'tls_cert', 'tls_ca', 'telegram_token'].includes(key)) {
      return null; // Ошибок нет, если HTTPS отключен
    }

    if (!value && ['ip_addr', 'gateway', 'mqtt_hst', 'sb_mask', 'offdate', 'offtime', 'domain'].includes(key)) {
      return 'Поле не может быть пустым';
    }

    switch (key) {
      case 'ip_addr':
      case 'gateway':
      case 'mqtt_hst':
        if (!ipRegex.test(value)) {
          error = 'Неверный IP-адрес';
        }
        break;
      case 'sb_mask':
        if (!subnetMaskRegex.test(value)) {
          error = 'Неверная маска подсети';
        }
        break;
      case 'offdate':
        if (!validateDateFormat(value)) {
          error = 'Неверный формат даты (д.м.гг)';
        }
        break;
      case 'offtime':
        if (!validateTimeFormat(value)) {
          error = 'Неверный формат времени (чч:мм:сс)';
        }
        break;
      case 'domain':
        if (value.length > 50) {
          error = 'Домен не должен превышать 50 символов';
        } else if (!value.match(/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/)) {
          error = 'Неверный формат домена';
        }
        break;
      case 'tls_key':
        if (value && value.trim() !== '') {
          if (value.length > 512) {
            error = 'Private Key не должен превышать 512 символов';
          } else if (!value.includes('BEGIN EC PRIVATE KEY') || !value.includes('END EC PRIVATE KEY')) {
            error = 'Неверный формат Private Key';
          }
        }
        break;
      case 'tls_cert':
        if (value && value.trim() !== '') {
          if (value.length > 1024) {
            error = 'Public Key не должен превышать 1024 символов';
          } else if (!value.includes('BEGIN CERTIFICATE') || !value.includes('END CERTIFICATE')) {
            error = 'Неверный формат Public Key';
          }
        }
        break;
      case 'tls_ca':
        if (value && value.trim() !== '') {
          if (value.length > 1024) {
            error = 'Secret Key не должен превышать 1024 символов';
          } else if (!value.includes('BEGIN CERTIFICATE') || !value.includes('END CERTIFICATE')) {
            error = 'Неверный формат Secret Key';
          }
        }
        break;
    }
    return error;
  };

  // 4. Основные функции
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    let jsonData = { ...settings };

    // Преобразуем данные из формы в JSON
    for (const [key, value] of formData.entries()) {
      if (['lon_de', 'lat_de', 'timezone', 'mqtt_prt'].includes(key)) {
        jsonData[key] = value === '' || value === null ? 0 : Number(value);
      } else {
        jsonData[key] = value;
      }
    }

    // Если HTTPS отключен, удаляем соответствующие поля
    if (!jsonData.usehttps) {
      const httpsFields = ['tls_ca', 'tls_key', 'tls_cert', 'telegram_token', 'domain'];
      httpsFields.forEach(field => {
        delete jsonData[field];
      });
    }

    // Формируем поле offldt, если есть дата и время
    if (jsonData.offdate && jsonData.offtime) {
      jsonData.offldt = `d:${jsonData.offdate} t:${jsonData.offtime}`;
    } else {
      delete jsonData.offldt;
    }

    // Убедимся, что числовые поля не null или пустые
    ['lon_de', 'lat_de', 'timezone', 'mqtt_prt'].forEach((key) => {
      if (jsonData[key] === null || jsonData[key] === '') {
        jsonData[key] = 0;
      }
    });

    // Преобразуем булевы значения в числа
    jsonData.onsunrise = jsonData.onsunrise ? 1 : 0;
    jsonData.onsunset = jsonData.onsunset ? 1 : 0;
    jsonData.check_ip = jsonData.check_ip ? 1 : 0;
    jsonData.check_mqtt = jsonData.check_mqtt ? 1 : 0;
    jsonData.usehttps = jsonData.usehttps ? 1 : 0;

    // Отправляем данные на сервер
    fetch('/api/mysett/set', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка сети или сервера');
        }
        return response.json();
      })
      .then((data) => {
        setSubmissionStatus('success');
        setSaveResult(data);
        showToast('Данные успешно сохранены', 'success');
        showTopNotification('Данные успешно сохранены');
      })
      .catch((error) => {
        setSubmissionStatus('error');
        setSaveResult(error);
        showToast('Ошибка при сохранении данных', 'error');
        showTopNotification('Ошибка при сохранении данных', 'error');
      });
  };

  const handleChange = (key, value) => {
    let error = null;

    if (key === 'offdate') {
      error = validateDateFormat(value) ? null : 'Неверный формат даты (д.м.гг)';
    } else if (key === 'offtime') {
      error = validateTimeFormat(value) ? null : 'Неверный формат времени (чч:мм:сс)';
    } else {
      error = validateInput(key, value);
    }

    // Обработка ошибок
    setErrors(prevErrors => {
      const newErrors = { ...prevErrors, [key]: error };

      const certificateKeys = ['tls_key', 'tls_cert', 'tls_ca'];

      const hasOtherErrors = Object.keys(newErrors)
        .filter(errorKey => !certificateKeys.includes(errorKey) && errorKey !== 'telegram_token')
        .some(errorKey => newErrors[errorKey] !== null);

      // Оцените состояние кнопки
      setSubmitButtonDisabled(hasOtherErrors || (!settings.usehttps && certificateKeys.some(certKey => settings[certKey])));

      return newErrors;
    });

    // Обработка значения
    let processedValue = value;
    if (['lon_de', 'lat_de', 'timezone', 'mqtt_prt'].includes(key)) {
      processedValue = value === '' || value === null ? 0 : Number(value);
    } else if (['onsunrise', 'onsunset', 'check_ip', 'check_mqtt', 'usehttps'].includes(key)) {
      processedValue = value ? 1 : 0;
    }

    setSettings(prevSettings => ({ ...prevSettings, [key]: processedValue }));

    // Если изменяется usehttps, сбросьте ошибки и проверьте состояние кнопки
    if (key === 'usehttps') {
      setErrors({}); // Очистите все ошибки
      setSubmitButtonDisabled(false); // Активируйте кнопку
    }
  };


  const handleDelete = (key) => {
    setSettings(prevSettings => ({ ...prevSettings, [key]: '' }));
    setErrors(prevErrors => ({ ...prevErrors, [key]: null }));

    if (key === 'tls_key') setIsPrivateKeyHidden(false);
    if (key === 'tls_cert') setIsPublicKeyHidden(false);
    if (key === 'tls_ca') setIsSecretKeyHidden(false);
    if (key === 'telegram_token') setIsTelegramTokenHidden(false);
  };

  // 5. Эффекты
  const refresh = () =>
    fetch('/api/mysett/get')
      .then((r) => r.json())
      .then((r) => {
        if (r.offldt) {
          const { date, time } = parseOfflineDateTime(r.offldt);
          r.offdate = date;
          r.offtime = time;
        }
        console.log('Loaded settings:', r); // Проверь, что все поля присутствуют!
        setSettings(r);
      })
      .catch(error => {
        console.error('Error fetching settings:', error);
        showToast('Ошибка при загрузке настроек', 'error');
      });

  useEffect(() => {
    refresh().then(() => {
      if (settings?.tls_key) setIsPrivateKeyHidden(true);
      if (settings?.tls_cert) setIsPublicKeyHidden(true);
      if (settings?.tls_ca) setIsSecretKeyHidden(true);
      if (settings?.telegram_token) setIsTelegramTokenHidden(true);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const isValid = isFormValid(settings, errors);
    setSubmitButtonDisabled(!isValid);
  }, [settings, errors]);

  // 6. Рендер компонента
  if (isLoading) {
    return html`<div>Loading...</div>`;
  }

  if (!settings) return '';

  const hasErrors = Object.values(errors).some((error) => error !== null);

  return html`
    <div class="flex flex-col items-center w-full p-4 mb-16">
      <div class="flex flex-col items-center w-full p-6 bg-white/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/50">
        
        <div class="w-full mb-6 overflow-hidden rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
          <div class="bg-teal-600/10 border-b border-slate-500 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 class="text-3xl font-extrabold text-slate-700 tracking-wide drop-shadow-sm uppercase">Global Settings</h2>
            <select
              value=${settings.lang}
              onChange=${(e) => handleChange('lang', e.target.value)}
              class="px-3 py-1.5 bg-white/90 text-slate-800 rounded-lg text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
            >
              ${languages.map((lang) => html`<option value=${lang.value}>${lang.label}</option>`)}
            </select>
          </div>
        </div>

        ${topNotification && html`
          <div class="w-full max-w-4xl bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white font-bold px-4 py-3 rounded-xl shadow-md text-center mb-6 border border-green-400/50 backdrop-blur-md">
            ${topNotification}
          </div>
        `}

        <form
          ref=${formRef}
          onSubmit=${handleSubmit}
          class="w-full max-w-4xl flex flex-col gap-6 relative"
        >
          <div class="flex justify-end w-full">
            <button
              type="submit"
              class=${`relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_0_15px_rgba(20,184,166,0.4)] ${submitButtonDisabled ? 'opacity-50 cursor-not-allowed bg-slate-400' : 'bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500'}`}
              disabled=${submitButtonDisabled}
            >
              <span class="relative flex items-center gap-2 text-lg tracking-wide drop-shadow-md">
                Save changes
              </span>
            </button>
          </div>

          <!-- General Settings -->
          <div class="w-full border border-slate-500 bg-white/30 backdrop-blur-sm">
            <div class="bg-teal-600/10 border-b border-slate-500 px-6 py-4">
              <h3 class="text-2xl font-bold text-slate-700 tracking-wide drop-shadow-sm">General</h3>
            </div>
            <div class="flex flex-col divide-y divide-slate-500">
                  ${[
      { label: 'Login', key: 'adm_name', type: 'text' },
      { label: 'Password', key: 'adm_pswd', type: 'password' },
      { label: 'Time zone UTC', key: 'timezone', type: 'select', options: timeZone }
    ].map((item, index) => html`
                    <div class="flex flex-col md:flex-row md:items-center px-6 py-2 transition-colors ${index % 2 === 0 ? 'bg-white/80' : 'bg-sky-200/40'} hover:bg-slate-200/80 gap-2 md:gap-0">
                      <div class="w-full md:w-1/3 text-lg font-bold text-slate-700 md:pr-4 drop-shadow-sm pl-2 border-r border-slate-500 py-2">
                        ${item.label}
                      </div>
                      <div class="w-full md:w-2/3 pl-4">
                        <${pageSetting} 
                          value=${settings[item.key]} 
                          setfn=${(value) => handleChange(item.key, value)} 
                          type=${item.type} 
                          options=${item.options}
                          class=${`w-full px-3 py-2 bg-white/50 border ${errors[item.key] ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                          error=${errors[item.key]} 
                        />
                      </div>
                    </div>
                  `)}
            </div>
          </div>

          <!-- Network Settings -->
          <div class="w-full border border-slate-500 bg-white/30 backdrop-blur-sm">
            <div class="bg-teal-600/10 border-b border-slate-500 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <h3 class="text-2xl font-bold text-slate-700 tracking-wide drop-shadow-sm w-full sm:w-auto text-center sm:text-left">Network</h3>
              <div class="flex items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
                <span class="text-slate-600 font-medium drop-shadow-sm tracking-wide text-lg">${settings.check_ip ? 'DHCP' : 'Static IP'}</span>
                <${MyPolzunok}
                  value=${settings.check_ip}
                  onChange=${(value) => handleChange('check_ip', value)}
                />
              </div>
            </div>
            
            ${!settings.check_ip ? html`
              <div class="flex flex-col divide-y divide-slate-500">
                    ${[{ label: 'IP address', key: 'ip_addr', type: 'text' },
      { label: 'Subnet mask', key: 'sb_mask', type: 'text' },
      { label: 'Default gateway', key: 'gateway', type: 'text' }].map((item, index) => html`
                      <div class="flex flex-col md:flex-row md:items-center px-6 py-2 transition-colors ${index % 2 === 0 ? 'bg-white/80' : 'bg-sky-200/40'} hover:bg-slate-200/80 gap-2 md:gap-0">
                        <div class="w-full md:w-1/3 text-lg font-bold text-slate-700 md:pr-4 drop-shadow-sm pl-2 border-r border-slate-500 py-2">
                          ${item.label}
                        </div>
                        <div class="w-full md:w-2/3 pl-4">
                          <${pageSetting} 
                            value=${settings[item.key]} 
                            setfn=${(value) => handleChange(item.key, value)} 
                            type=${item.type} 
                            class=${`w-full px-3 py-2 bg-white/50 border ${errors[item.key] ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                            error=${errors[item.key]} 
                          />
                        </div>
                      </div>
                    `)}
              </div>
            ` : null}
          </div>

          <!-- API Settings -->
          <div class="w-full border border-slate-500 bg-white/30 backdrop-blur-sm">
            <div class="bg-teal-600/10 border-b border-slate-500 px-6 py-4">
              <h3 class="text-2xl font-bold text-slate-700 tracking-wide drop-shadow-sm">API Settings</h3>
            </div>
            <div class="flex flex-col divide-y divide-slate-500">
                  <div class="flex flex-col md:flex-row md:items-center px-6 py-2 transition-colors bg-white/80 hover:bg-slate-200/80 gap-2 md:gap-0">
                    <div class="w-full md:w-1/3 text-lg font-bold text-slate-700 md:pr-4 drop-shadow-sm pl-2 border-r border-slate-500 py-2">Token</div>
                    <div class="w-full md:w-2/3 pl-4">
                      <${pageSetting}
                        value=${settings.token}
                        setfn=${(value) => handleChange('token', value)}
                        type="text"
                        class="w-full px-3 py-2 bg-white/50 border border-white/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                  </div>
            </div>
          </div>

          <!-- MQTT Settings -->
          <div class="w-full border border-slate-500 bg-white/30 backdrop-blur-sm">
            <div class="bg-teal-600/10 border-b border-slate-500 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <h3 class="text-2xl font-bold text-slate-700 tracking-wide drop-shadow-sm w-full sm:w-auto text-center sm:text-left">MQTT</h3>
              <div class="flex items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
                 <span class="text-slate-600 font-medium drop-shadow-sm tracking-wide text-lg">Enabled</span>
                 <${MyPolzunok}
                   value=${settings.check_mqtt}
                   onChange=${(value) => handleChange('check_mqtt', value)}
                 />
              </div>
            </div>
            
            ${settings.check_mqtt ? html`
              <div class="flex flex-col divide-y divide-slate-500">
                    ${[
        { label: 'Host', key: 'mqtt_hst', type: 'text' },
        { label: 'Port', key: 'mqtt_prt', type: 'number' },
        { label: 'Client', key: 'mqtt_clt', type: 'text' },
        { label: 'User', key: 'mqtt_usr', type: 'text' },
        { label: 'Password', key: 'mqtt_pswd', type: 'password' },
        { label: 'TX topic', key: 'txmqttop', type: 'text' },
        { label: 'RX topic', key: 'rxmqttop', type: 'text' }
      ].map((item, index) => html`
                      <div class="flex flex-col md:flex-row md:items-center px-6 py-2 transition-colors ${index % 2 === 0 ? 'bg-sky-200/40' : 'bg-white/80'} hover:bg-slate-200/80 gap-2 md:gap-0">
                        <div class="w-full md:w-1/3 text-lg font-bold text-slate-700 md:pr-4 drop-shadow-sm pl-2 border-r border-slate-500 py-2">
                          ${item.label}
                        </div>
                        <div class="w-full md:w-2/3 pl-4">
                          <${pageSetting} 
                            value=${settings[item.key]} 
                            setfn=${(value) => handleChange(item.key, value)} 
                            type=${item.type} 
                            class=${`w-full px-3 py-2 bg-white/50 border ${errors[item.key] ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                            error=${errors[item.key]} 
                          />
                        </div>
                      </div>
                    `)}
              </div>
            ` : null}
          </div>

          <!-- HTTPS Settings -->
          <div class="w-full border border-slate-500 bg-white/30 backdrop-blur-sm">
            <div class="bg-teal-600/10 border-b border-slate-500 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <h3 class="text-2xl font-bold text-slate-700 tracking-wide drop-shadow-sm w-full sm:w-auto text-center sm:text-left">HTTPS</h3>
              <div class="flex items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
                 <span class="text-slate-600 font-medium drop-shadow-sm tracking-wide text-lg">Enabled</span>
                 <${MyPolzunok}
                   value=${settings.usehttps}
                   onChange=${(value) => handleChange('usehttps', value)}
                 />
              </div>
            </div>
            
            ${settings.usehttps ? html`
              <div class="flex flex-col divide-y divide-slate-500">
                    ${[
        { label: 'HTTPS domain', key: 'domain', type: 'text' },
        { label: 'Private Key', key: 'tls_key', type: 'textarea' },
        { label: 'Public Key', key: 'tls_cert', type: 'textarea' }
      ].map((item, index) => html`
                      <div class="flex flex-col md:flex-row md:items-center px-6 py-2 transition-colors ${index % 2 === 0 ? 'bg-sky-200/40' : 'bg-white/80'} hover:bg-slate-200/80 gap-2 md:gap-0">
                        <div class="w-full md:w-1/3 text-lg font-bold text-slate-700 md:pr-4 drop-shadow-sm pl-2 mt-1 md:mt-0 border-r border-slate-500 py-2">
                          ${item.label}
                        </div>
                        <div class="w-full md:w-2/3 flex items-start md:items-center">
                          <div class="relative w-full">
                            ${item.type === 'textarea'
          ? html`
                                ${item.key === 'tls_key' && settings.tls_key
              ? html`<div class="w-full px-3 py-2 bg-white/40 border border-white/50 rounded-lg text-slate-600 font-medium shadow-inner">Данные введены, но информация скрыта!</div>`
              : item.key === 'tls_cert' && settings.tls_cert
                ? html`<div class="w-full px-3 py-2 bg-white/40 border border-white/50 rounded-lg text-slate-600 font-medium shadow-inner">Данные введены успешно!</div>`
                : html`<textarea
                                          name=${item.key}
                                          value=${settings[item.key] || ''}
                                          onInput=${(e) => handleChange(item.key, e.target.value)}
                                          class=${`w-full px-3 py-2 bg-white/50 border ${errors[item.key] ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                                          rows="1"
                                          placeholder="Enter ${item.label}"
                                        ></textarea>`
            }
                              `
          : html`
                              <input
                                type="text"
                                name=${item.key}
                                value=${settings[item.key] || ''}
                                onInput=${(e) => handleChange(item.key, e.target.value)}
                                class=${`w-full px-3 py-2 bg-white/50 border ${errors[item.key] ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                                maxlength="30"
                                placeholder="Enter domain (e.g., zagotovka.ddns.net)"
                              />
                            `}
                          
                          ${settings[item.key] && item.key === 'tls_cert' && html`
                            <div class="absolute right-0 top-0 mt-[3px] mr-[3px] flex gap-2">
                              <button
                                type="button"
                                onClick=${() => {
            navigator.clipboard.writeText(settings[item.key]);
            setTopNotification('Данные скопированы');
            setTimeout(() => setTopNotification(''), 3000);
          }}
                                class="px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(16,185,129,0.3)] hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-0.5"
                              >Копировать</button>
                              <button
                                type="button"
                                onClick=${() => handleChange(item.key, '')}
                                class="px-3 py-1 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(225,29,72,0.3)] hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-all hover:-translate-y-0.5"
                              >Очистить</button>
                            </div>
                          `}
                          ${settings[item.key] && item.key !== 'domain' && item.key !== 'tls_cert' && html`
                            <button
                              type="button"
                              onClick=${() => handleChange(item.key, '')}
                              class="absolute right-0 top-0 mt-[3px] mr-[3px] px-3 py-1 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(225,29,72,0.3)] hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-all hover:-translate-y-0.5"
                            >Очистить</button>
                          `}
                          </div>
                          ${errors[item.key] && html`
                            <div class="text-red-500 text-sm mt-1 font-semibold w-full text-left">${errors[item.key]}</div>
                          `}
                        </div>
                      </div>
                    `)}
              </div>
            ` : null}
          </div>

          <!-- Coordinate Settings -->
          <div class="w-full border border-slate-500 bg-white/30 backdrop-blur-sm">
            <div class="bg-teal-600/10 border-b border-slate-500 px-6 py-4">
              <h3 class="text-2xl font-bold text-slate-700 tracking-wide drop-shadow-sm">Coordinates & Astronomy</h3>
            </div>
            <div class="flex flex-col divide-y divide-slate-500">
                  <div class="flex flex-col md:flex-row md:items-center px-6 py-2 transition-colors bg-white/80 hover:bg-slate-200/80 gap-2 md:gap-0">
                    <div class="w-full md:w-1/3 text-lg font-bold text-slate-700 md:pr-4 drop-shadow-sm pl-2 border-r border-slate-500 py-2">Longitude</div>
                    <div class="w-full md:w-2/3 pl-4">
                      <${pageSetting} value=${settings.lon_de} setfn=${(value) => handleChange('lon_de', value)} type="text" class=${`w-full px-3 py-2 bg-white/50 border ${errors.lon_de ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`} error=${errors.lon_de} />
                    </div>
                  </div>
                  <div class="flex flex-col md:flex-row md:items-center px-6 py-2 transition-colors bg-sky-200/40 hover:bg-slate-200/80 gap-2 md:gap-0">
                    <div class="w-full md:w-1/3 text-lg font-bold text-slate-700 md:pr-4 drop-shadow-sm pl-2 border-r border-slate-500 py-2">Latitude</div>
                    <div class="w-full md:w-2/3 pl-4">
                      <${pageSetting} value=${settings.lat_de} setfn=${(value) => handleChange('lat_de', value)} type="text" class=${`w-full px-3 py-2 bg-white/50 border ${errors.lat_de ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`} error=${errors.lat_de} />
                    </div>
                  </div>
                  <div class="flex flex-col md:flex-row md:items-center px-6 py-2 transition-colors bg-white/80 hover:bg-slate-200/80 gap-2 md:gap-0">
                    <div class="w-full md:w-1/3 text-lg font-bold text-slate-700 md:pr-4 drop-shadow-sm pl-2 border-r border-slate-500 py-2">
                      Sunrise: <span class="text-teal-600 drop-shadow-sm">${settings.sunrise}</span>
                    </div>
                    <div class="w-full md:w-2/3 flex items-center gap-4">
                      <${MyPolzunok} value=${settings.onsunrise} onChange=${(value) => handleChange('onsunrise', value)} />
                      <input
                        type="text"
                        value=${settings.sunrise_pins || ''}
                        onInput=${(e) => handleChange('sunrise_pins', e.target.value)}
                        maxlength="20"
                        placeholder="Action for sunrise"
                        class="flex-grow w-full px-3 py-2 bg-white/50 border border-white/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                  </div>
                  <div class="flex flex-col md:flex-row md:items-center px-6 py-2 transition-colors bg-sky-200/40 hover:bg-slate-200/80 gap-2 md:gap-0">
                    <div class="w-full md:w-1/3 text-lg font-bold text-slate-700 md:pr-4 drop-shadow-sm pl-2 border-r border-slate-500 py-2">
                      Sunset: <span class="text-teal-600 drop-shadow-sm">${settings.sunset}</span>
                    </div>
                    <div class="w-full md:w-2/3 flex items-center gap-4">
                      <${MyPolzunok} value=${settings.onsunset} onChange=${(value) => handleChange('onsunset', value)} />
                      <input
                        type="text"
                        value=${settings.sunset_pins || ''}
                        onInput=${(e) => handleChange('sunset_pins', e.target.value)}
                        maxlength="20"
                        placeholder="Action for sunset"
                        class="flex-grow w-full px-3 py-2 bg-white/50 border border-white/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                  </div>
                  <div class="flex flex-col md:flex-row md:items-center px-6 py-2 transition-colors bg-white/80 hover:bg-slate-200/80 gap-2 md:gap-0">
                    <div class="w-full md:w-1/3 text-lg font-bold text-slate-700 md:pr-4 drop-shadow-sm pl-2 border-r border-slate-500 py-2">Day Length</div>
                    <div class="w-full md:w-2/3 pl-4">
                      <span class="text-xl font-medium text-slate-800">${settings.dlength}</span>
                    </div>
                  </div>
                  <div class="flex flex-col md:flex-row md:items-center px-6 py-2 transition-colors bg-sky-200/40 hover:bg-slate-200/80 gap-2 md:gap-0">
                    <div class="w-full md:w-1/3 text-lg font-bold text-slate-700 md:pr-4 drop-shadow-sm pl-2 border-r border-slate-500 py-2">Next full moon</div>
                    <div class="w-full md:w-2/3 pl-4">
                      <span class="text-xl font-medium text-slate-800">
                        ${typeof settings.fullmoon === 'string' && settings.fullmoon ? `${settings.fullmoon.split(' ')[0]} at ${settings.fullmoon.split(' ')[1]}` : 'N/A'}
                      </span>
                    </div>
                  </div>
            </div>
          </div>

          <!-- Offline Mode -->
          <div class="w-full border border-slate-500 bg-white/30 backdrop-blur-sm mb-4">
            <div class="bg-teal-600/10 border-b border-slate-500 px-6 py-4">
              <h3 class="text-2xl font-bold text-slate-700 tracking-wide drop-shadow-sm">[OFFLINE MODE] Date & Time</h3>
            </div>
            <div class="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-slate-500 bg-white/80 items-stretch">
              <div class="flex-1 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 hover:bg-slate-200/80 transition-colors">
                <div class="font-bold text-slate-700 text-lg sm:w-1/3 flex-shrink-0 border-r border-slate-500 py-3 px-6">Date</div>
                <div class="flex-grow flex flex-col w-full pr-4">
                  <input
                    type="text"
                    name="offdate"
                    value=${settings.offdate || ''}
                    onInput=${(e) => handleChange('offdate', e.target.value)}
                    placeholder="dd.mm.yy"
                    class=${`w-full px-3 py-2 bg-white/50 border ${errors.offdate ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  />
                  ${errors.offdate && html`<div class="text-red-500 text-sm mt-1 font-semibold">${errors.offdate}</div>`}
                </div>
              </div>
              <div class="flex-1 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 hover:bg-slate-200/80 transition-colors">
                <div class="font-bold text-slate-700 text-lg sm:w-1/3 flex-shrink-0 border-r border-slate-500 py-3 px-6">Time</div>
                <div class="flex-grow flex flex-col w-full pr-4">
                  <input
                    type="text"
                    name="offtime"
                    value=${settings.offtime || ''}
                    onInput=${(e) => handleChange('offtime', e.target.value)}
                    placeholder="hh:mm:ss"
                    class=${`w-full px-3 py-2 bg-white/50 border ${errors.offtime ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  />
                  ${errors.offtime && html`<div class="text-red-500 text-sm mt-1 font-semibold">${errors.offtime}</div>`}
                </div>
              </div>
            </div>
          </div>

          ${topNotification && html`
            <div class="w-full bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white font-bold px-4 py-3 rounded-xl shadow-md text-center border border-green-400/50 backdrop-blur-md">
              ${topNotification}
            </div>
          `}

          <div class="flex justify-end w-full mb-4">
            <button
              type="submit"
              class=${`relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_0_15px_rgba(20,184,166,0.4)] ${submitButtonDisabled ? 'opacity-50 cursor-not-allowed bg-slate-400' : 'bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500'}`}
              disabled=${submitButtonDisabled}
            >
              <span class="relative flex items-center gap-2 text-lg tracking-wide drop-shadow-md">
                Save changes
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `;;
}

export { Settings };
