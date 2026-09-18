import { h, render, useState, useEffect, useRef, html, Router } from '../bundle.js';
import { registerPoll, unregisterPoll } from '../pollQueue.js';
import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';
import { MyPolzunok, Chart, DeveloperNote, pageSetting, Toast } from '../main.js';
import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire, rulangsettings } from '../rulang.js';
import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire, enlangsettings } from '../enlang.js';

// ---------------------------------------------------------------------------
// Глобальный tooltip-портал (position:fixed, body-level)
// ---------------------------------------------------------------------------
function initGlobalTooltip() {
  if (document.__tipInited) return;
  document.__tipInited = true;

  const tip = document.createElement('div');
  tip.id = '__global_tip';
  Object.assign(tip.style, {
    position:      'fixed',
    zIndex:        '99999',
    maxWidth:      '320px',
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

// Карта: label поля → индекс в массиве rulangsettings / enlangsettings
const SETTINGS_TIP_IDX = {
  'Login':           1,
  'Password':        2,
  'Time zone UTC':   3,
  'IP address':      4,
  'Subnet mask':     5,
  'Default gateway': 6,
  'Token':           7,
  'Host':            8,
  'Port':            9,
  'Client':          10,
  'User':            11,
  'Password (MQTT)': 12,   // ключ для MQTT-пароля
  'TX topic':        13,
  'RX topic':        14,
  'RX Z2M topic':    26,
  'MQTT Server':     27,
  'Port (srv)':      28,
  'Max clients':     29,
  'User (srv)':      30,
  'Password (srv)':  31,
  'SLZB IP':         32,
  'HTTPS domain':    15,
  'Private Key':     16,
  'Public Key':      17,
  'Longitude':       18,
  'Latitude':        19,
  'Sunrise':         20,
  'Sunset':          21,
  'Day Length':      22,
  'Next full moon':  23,
  'Date':            24,
  'Time':            25,
};

// ---------------------------------------------------------------------------
// getTip и FieldRow вынесены ЗА пределы Settings, чтобы их референс не менялся
// при каждом ре-рендере — иначе Preact размонтирует <tr> и input теряет фокус
// ---------------------------------------------------------------------------
const getTip = (label, lang, rulangsettings, enlangsettings) => {
  const arr = lang === 'ru' ? rulangsettings : enlangsettings;
  const idx = SETTINGS_TIP_IDX[label];
  if (!idx || !arr || !arr[idx]) return '';
  const words = arr[idx].split(' ');
  const lines = [];
  for (let i = 0; i < words.length; i += 12) {
    lines.push(words.slice(i, i + 12).join(' '));
  }
  return lines.join('<br>');
};

const FieldRow = ({ label, tipLabel, index, tip, children }) => {
  const bg = index % 2 === 0 ? 'bg-white/80' : 'bg-sky-200/40';
  return html`
    <tr class="transition-colors border-b border-slate-200 ${bg} hover:bg-slate-200/80">
      <td
        class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help"
        data-tip=${tip}
      >
        ${label}
      </td>
      <td class="w-2/3 pl-4 py-4 pr-6">
        ${children}
      </td>
    </tr>
  `;
};
// ---------------------------------------------------------------------------

const LOG_CATEGORIES = [
  { id: 0, key: 'SYSTEM',    labelEn: 'System',    labelRu: 'Система' },
  { id: 1, key: 'MQTT',      labelEn: 'MQTT',      labelRu: 'MQTT' },
  { id: 2, key: 'NET',       labelEn: 'Network',   labelRu: 'Сеть' },
  { id: 3, key: 'GSM',       labelEn: 'GSM',       labelRu: 'GSM' },
  { id: 4, key: 'SCHEDULER', labelEn: 'Scheduler', labelRu: 'Планировщик' },
  { id: 5, key: 'SENSORS',   labelEn: 'Sensors',   labelRu: 'Датчики' },
  { id: 6, key: 'PID',       labelEn: 'PID Controller', labelRu: 'ПИД-регулятор' },
  { id: 7, key: 'SETTINGS',  labelEn: 'Settings',  labelRu: 'Настройки' },
  { id: 8, key: 'ETH',       labelEn: 'Ethernet',  labelRu: 'Ethernet' },
  { id: 9, key: 'PHY',       labelEn: 'PHY',       labelRu: 'PHY' },
  { id: 10, key: 'Z2M',      labelEn: 'Z2M',       labelRu: 'Z2M' },
  { id: 11, key: 'OTA',      labelEn: 'OTA',       labelRu: 'OTA' }
];

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
  const lastInputTime = useRef(0);
  const [logFilterOpen, setLogFilterOpen] = useState(false);
  const [mqttSectionOpen, setMqttSectionOpen] = useState(false);
  const mqttSectionInit = useRef(false);
  // Инициализируем глобальный tooltip один раз при монтировании
  useEffect(() => {
    initGlobalTooltip();
    // Скрываем On/Off подписи у ползунка Network
    if (!document.getElementById('__network_toggle_style')) {
      const s = document.createElement('style');
      s.id = '__network_toggle_style';
      s.textContent = '.network-toggle span { display: none !important; }';
      document.head.appendChild(s);
    }
  }, []);

  // Сокращение для getTip с текущим языком
  const gt = (label) => getTip(label, settings.lang || 'ru', rulangsettings, enlangsettings);

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'ru', label: 'Russian' }
  ];

  const timeZone = [
    [-12.0, '(GMT -12:00) Eniwetok, Kwajalein'],
    [-11.0, '(GMT -11:00) Midway Island, Samoa'],
    [-10.0, '(GMT -10:00) Hawaii'],
    [-9.0,  '(GMT -9:00) Alaska'],
    [-8.0,  '(GMT -8:00) Pacific Time (US & Canada)'],
    [-7.0,  '(GMT -7:00) Mountain Time (US & Canada)'],
    [-6.0,  '(GMT -6:00) Central Time (US & Canada), Mexico City'],
    [-5.0,  '(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima'],
    [-4.0,  '(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz'],
    [-3.3,  '(GMT -3:30) Newfoundland'],
    [-3.0,  '(GMT -3:00) Brazil, Buenos Aires, Georgetown'],
    [-2.0,  '(GMT -2:00) Mid-Atlantic'],
    [-1.0,  '(GMT -1:00) Azores, Cape Verde Islands'],
    [0.0,   '(GMT +0:00) Western Europe Time, London, Lisbon, Casablanca'],
    [1.0,   '(GMT +1:00) Brussels, Copenhagen, Madrid, Paris'],
    [2.0,   '(GMT +2:00) Kaliningrad, South Africa'],
    [3.0,   '(GMT +3:00) Yashalta, Moscow, St. Petersburg, Baghdad, Riyadh'],
    [3.3,   '(GMT +3:30) Tehran'],
    [4.0,   '(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi'],
    [4.3,   '(GMT +4:30) Kabul'],
    [5.0,   '(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent'],
    [5.3,   '(GMT +5:30) Bombay, Calcutta, Madras, New Delhi'],
    [5.45,  '(GMT +5:45) Kathmandu'],
    [6.0,   '(GMT +6:00) Almaty, Dhaka, Colombo'],
    [7.0,   '(GMT +7:00) Bangkok, Hanoi, Jakarta'],
    [8.0,   '(GMT +8:00) Beijing, Perth, Singapore, Hong Kong'],
    [9.0,   '(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk'],
    [9.3,   '(GMT +9:30) Adelaide, Darwin'],
    [10.0,  '(GMT +10:00) Eastern Australia, Guam, Vladivostok'],
    [11.0,  '(GMT +11:00) Magadan, Solomon Islands, New Caledonia'],
    [12.0,  '(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka']
  ];

  // FIX: ipRegex и subnetMaskRegex объявлены локально — не полагаемся на экспорт из main.js
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
    return pattern.test(timeStr);
  };

  // SLZB IP (watchdog шлюза SLZB-06p7U): поле опциональное (пусто = watchdog выключен),
  // но если пользователь что-то ввёл — это должен быть строго IPv4-адрес.
  // Мусор в этом поле нельзя: прошивка по нему шлёт шлюзу HTTP-reboot.
  // На лету вычищаем всё, кроме цифр и точек, ограничиваем формат адреса.
  const sanitizeIpInput = (value) => {
    if (typeof value !== 'string') return '';
    const parts = value.replace(/[^0-9.]/g, '').split('.').slice(0, 4);
    return parts.map((p) => p.slice(0, 3)).join('.');
  };

  const isValidIpInput = (value) => ipRegex.test(value);

  const isFormValid = (settings, errors) => {
    const hasErrors = Object.values(errors).some((error) => error !== null);
    const requiredFieldsFilled = settings.usehttps
      ? settings.domain && settings.domain.trim() !== ''
      : true;
    return !(hasErrors || !requiredFieldsFilled);
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => { setToast(null); }, 3000);
  };

  const showTopNotification = (message) => {
    setTopNotification(message);
    setTimeout(() => { setTopNotification(null); }, 3000);
  };

  const validateInput = (key, value) => {
    let error = null;
    if (!settings.usehttps && ['domain', 'tls_key', 'tls_cert', 'tls_ca', 'telegram_token'].includes(key)) {
      return null;
    }
    if (!value && ['ip_addr', 'gateway', 'mqtt_hst', 'sb_mask', 'offdate', 'offtime', 'domain'].includes(key)) {
      return 'Поле не может быть пустым';
    }
    switch (key) {
      case 'ip_addr':
      case 'gateway':
      case 'mqtt_hst':
        if (value.length > 50) error = 'Слишком длинное имя хоста';
        break;
      case 'slzb_host':
        // Опциональное поле: пусто = SLZB watchdog выключен (валидной считается и пустота).
        if (value && value.trim() !== '' && !isValidIpInput(value)) {
          error = 'Неверный формат IP-адреса (пример: 192.168.1.115)';
        }
        break;
      case 'sb_mask':
        if (!subnetMaskRegex.test(value)) error = 'Неверная маска подсети';
        break;
      case 'offdate':
        if (!validateDateFormat(value)) error = 'Неверный формат даты (д.м.гг)';
        break;
      case 'offtime':
        if (!validateTimeFormat(value)) error = 'Неверный формат времени (чч:мм:сс)';
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
          if (value.length > 512) error = 'Private Key не должен превышать 512 символов';
          else if (!value.includes('BEGIN EC PRIVATE KEY') || !value.includes('END EC PRIVATE KEY')) error = 'Неверный формат Private Key';
        }
        break;
      case 'tls_cert':
        if (value && value.trim() !== '') {
          if (value.length > 1024) error = 'Public Key не должен превышать 1024 символов';
          else if (!value.includes('BEGIN CERTIFICATE') || !value.includes('END CERTIFICATE')) error = 'Неверный формат Public Key';
        }
        break;
      case 'tls_ca':
        if (value && value.trim() !== '') {
          if (value.length > 1024) error = 'Secret Key не должен превышать 1024 символов';
          else if (!value.includes('BEGIN CERTIFICATE') || !value.includes('END CERTIFICATE')) error = 'Неверный формат Secret Key';
        }
        break;
    }
    return error;
  };

  const handleLogMaskChange = (newMask) => {
    const isRu = (settings.lang || 'ru') === 'ru';
    setSettings(prev => ({ ...prev, log_filter_mask: newMask }));
    fetch('/api/logfilter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mask: newMask })
    })
      .then(r => {
        if (!r.ok) throw new Error('Network error');
        return r.json();
      })
      .then(data => {
        if (data.status) {
          showToast(isRu ? 'Фильтр логов обновлен в RAM' : 'Log filter updated in RAM', 'success');
        }
      })
      .catch(err => {
        console.error('Error applying log filter in RAM:', err);
        showToast(isRu ? 'Ошибка обновления RAM фильтра' : 'Error updating RAM log filter', 'error');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    let jsonData = { ...settings };
    for (const [key, value] of formData.entries()) {
      if (['lon_de', 'lat_de', 'timezone', 'mqtt_prt', 'mqtt_srv_prt', 'mqtt_srv_maxcli'].includes(key)) {
        jsonData[key] = value === '' || value === null ? 0 : Number(value);
      } else {
        jsonData[key] = value;
      }
    }
    if (!jsonData.usehttps) {
      ['tls_ca', 'tls_key', 'tls_cert', 'telegram_token', 'domain'].forEach(f => delete jsonData[f]);
    }
    if (jsonData.offdate && jsonData.offtime) {
      jsonData.offldt = `d:${jsonData.offdate} t:${jsonData.offtime}`;
    } else {
      delete jsonData.offldt;
    }
    ['lon_de', 'lat_de', 'timezone', 'mqtt_prt', 'mqtt_srv_prt', 'mqtt_srv_maxcli'].forEach((key) => {
      if (jsonData[key] === null || jsonData[key] === '') jsonData[key] = 0;
    });
    jsonData.onsunrise = jsonData.onsunrise ? 1 : 0;
    jsonData.onsunset  = jsonData.onsunset  ? 1 : 0;
    jsonData.check_ip   = jsonData.check_ip   ? 1 : 0;
    jsonData.check_mqtt = jsonData.check_mqtt ? 1 : 0;
    jsonData.check_mqtt_srv = jsonData.check_mqtt_srv ? 1 : 0;
    jsonData.usehttps   = jsonData.usehttps   ? 1 : 0;

    fetch('/api/mysett/set', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonData),
    })
      .then((r) => { if (!r.ok) throw new Error('Ошибка сети'); return r.json(); })
      .then((data) => {
        setSubmissionStatus('success');
        setSaveResult(data);
        showToast('Данные успешно сохранены', 'success');
        showTopNotification('Данные успешно сохранены');
        lastInputTime.current = 0;
      })
      .catch((error) => {
        setSubmissionStatus('error');
        setSaveResult(error);
        showToast('Ошибка при сохранении данных', 'error');
        showTopNotification('Ошибка при сохранении данных');
      });
  };

  const handleChange = (key, value) => {
    let error = null;
    if (key === 'slzb_host') {
      // Чистим мусор ДО записи в state: буквы/пробелы/лишние точки просто
      // не попадут в поле, а не появятся с красной рамкой
      value = sanitizeIpInput(value);
      error = validateInput(key, value);
    } else if (key === 'offdate') {
      error = validateDateFormat(value) ? null : 'Неверный формат даты (д.м.гг)';
    } else if (key === 'offtime') {
      error = validateTimeFormat(value) ? null : 'Неверный формат времени (чч:мм:сс)';
    } else {
      error = validateInput(key, value);
    }
    setErrors(prevErrors => {
      const newErrors = { ...prevErrors, [key]: error };
      const certKeys = ['tls_key', 'tls_cert', 'tls_ca'];
      const hasOtherErrors = Object.keys(newErrors)
        .filter(k => !certKeys.includes(k) && k !== 'telegram_token')
        .some(k => newErrors[k] !== null);
      setSubmitButtonDisabled(hasOtherErrors || (!settings.usehttps && certKeys.some(ck => settings[ck])));
      return newErrors;
    });
    let processedValue = value;
    if (['lon_de', 'lat_de', 'timezone', 'mqtt_prt', 'mqtt_srv_prt', 'mqtt_srv_maxcli'].includes(key)) {
      processedValue = value === '' || value === null ? 0 : Number(value);
    } else if (['onsunrise', 'onsunset', 'check_ip', 'check_mqtt', 'check_mqtt_srv', 'usehttps'].includes(key)) {
      processedValue = value ? 1 : 0;
    }
    setSettings(prev => ({ ...prev, [key]: processedValue }));
    lastInputTime.current = Date.now();
    if (key === 'usehttps') {
      setErrors({});
      setSubmitButtonDisabled(false);
    }
  };

  // FIX: handleDelete удалён — нигде не вызывается, вместо него везде используется handleChange(key, '')

  const refresh = () =>
    fetch('/api/mysett/get', { cache: 'no-store' })
      .then((r) => r.json())
      .then((r) => {
        if (r !== null && r !== undefined) {
          if (r.offldt) {
            const { date, time } = parseOfflineDateTime(r.offldt);
            r.offdate = date;
            r.offtime = time;
          }
          setSettings(r);
        }
        return r;
      })
      .catch(error => {
        console.error('Error fetching settings:', error);
        showToast('Ошибка при загрузке настроек', 'error');
      });

  useEffect(() => {
    let active = true;

    registerPoll('settings', '/api/mysett/get', function(r) {
      if (!active) return;
      if (Date.now() - lastInputTime.current < 8000) return;
      var activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'SELECT')) {
        return;
      }
      if (r !== null && r !== undefined) {
        if (r.offldt) {
          var dt = parseOfflineDateTime(r.offldt);
          r.offdate = dt.date;
          r.offtime = dt.time;
        }
        setSettings(r);
        setIsLoading(false);
        if (r.tls_key)        setIsPrivateKeyHidden(true);
        if (r.tls_cert)       setIsPublicKeyHidden(true);
        if (r.tls_ca)         setIsSecretKeyHidden(true);
        if (r.telegram_token) setIsTelegramTokenHidden(true);
      }
    }, {immediate: true});

    return function() {
      active = false;
      unregisterPoll('settings');
    };
  }, []);

  useEffect(() => {
    setSubmitButtonDisabled(!isFormValid(settings, errors));
  }, [settings, errors]);

  // Автораскрытие секции MQTT при первой загрузке, если Client или Server уже включены
  useEffect(() => {
    if (!isLoading && !mqttSectionInit.current) {
      mqttSectionInit.current = true;
      setMqttSectionOpen(!!(settings.check_mqtt || settings.check_mqtt_srv));
    }
  }, [isLoading]);

  if (isLoading) return html`<div>Loading...</div>`;
  if (!settings) return '';

  const saveBtn = (extraClass = '') => html`
    <button
      type="submit"
      class=${`relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] hover:-translate-y-0.5 active:translate-y-0 ${submitButtonDisabled ? 'opacity-50 cursor-not-allowed bg-slate-400' : 'bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500'} ${extraClass}`}
      disabled=${submitButtonDisabled}
    >
      <span class="relative flex items-center gap-2 text-lg tracking-wide drop-shadow-md">Save changes</span>
    </button>
  `;

  return html`
    <div class="flex flex-col items-center w-full p-4 mb-16">
      <div class="flex flex-col items-center w-full p-6 bg-white/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 relative overflow-hidden">
        <!-- Decorative background glow -->
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <!-- Header -->
        <div class="w-full mb-6 px-2 flex flex-row items-center gap-6">
          <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight drop-shadow-sm uppercase">Global Settings</h2>
          <select
            value=${settings.lang}
            onChange=${(e) => handleChange('lang', e.target.value)}
            style="border: 2px solid #22d3ee; border-radius: 8px; padding: 4px 10px; font-size: 14px; font-weight: 600; background: white; color: #1e293b; cursor: pointer; outline: none;"
          >
            ${languages.map((lang) => html`<option value=${lang.value}>${lang.label}</option>`)}
          </select>
        </div>

        ${topNotification && html`
          <div class="w-full max-w-4xl bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white font-bold px-4 py-3 rounded-xl shadow-md text-center mb-6 border border-green-400/50 backdrop-blur-md">
            ${topNotification}
          </div>
        `}

        <form ref=${formRef} onSubmit=${handleSubmit} class="w-full max-w-4xl flex flex-col gap-6 relative">

          <div class="flex justify-end w-full">${saveBtn()}</div>

          <!-- ============================================================
               User data
          ============================================================ -->
          <div class="w-full mb-6">
            <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
              <table class="w-full table-fixed text-left border-collapse">
                <thead>
                  <tr class="bg-teal-600/10 border-b border-teal-600/20">
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-1/3">User data</th>
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                  </tr>
                </thead>
                <tbody>
              ${[
                { label: 'Login',        key: 'adm_name', type: 'text'     },
                { label: 'Password',     key: 'adm_pswd', type: 'password' },
                { label: 'Time zone UTC',key: 'timezone', type: 'select', options: timeZone }
              ].map((item, index) => html`
                <${FieldRow} label=${item.label} tip=${gt(item.tipLabel || item.label)} index=${index}>
                  <${pageSetting}
                    value=${settings[item.key]}
                    setfn=${(v) => handleChange(item.key, v)}
                    type=${item.type}
                    options=${item.options}
                    class=${`w-full px-3 py-2 bg-white/50 border ${errors[item.key] ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                    error=${errors[item.key]}
                  />
                <//>
              `)}
                </tbody>
              </table>
            </div>
          </div>

          <!-- ============================================================
               Network
          ============================================================ -->
          <div class="w-full mb-6">
            ${!settings.check_ip ? html`
              <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
                <table class="w-full table-fixed text-left border-collapse">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-1/3">
                        <div class="flex items-center gap-3">
                          <span>Network</span>
                          <div class="network-toggle">
                            <${MyPolzunok} value=${settings.check_ip} onChange=${(v) => handleChange('check_ip', v)} />
                          </div>
                          <span class="text-slate-600 font-medium tracking-wide text-lg">
                            ${settings.check_ip ? 'DHCP' : 'Static IP'}
                          </span>
                        </div>
                      </th>
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                  ${[
                    { label: 'IP address',     key: 'ip_addr',  type: 'text' },
                    { label: 'Subnet mask',    key: 'sb_mask',  type: 'text' },
                    { label: 'Default gateway',key: 'gateway',  type: 'text' }
                  ].map((item, index) => html`
                    <${FieldRow} label=${item.label} tip=${gt(item.tipLabel || item.label)} index=${index}>
                      <${pageSetting}
                        value=${settings[item.key]}
                        setfn=${(v) => handleChange(item.key, v)}
                        type=${item.type}
                        class=${`w-full px-3 py-2 bg-white/50 border ${errors[item.key] ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                        error=${errors[item.key]}
                      />
                    <//>
                  `)}
                  </tbody>
                </table>
              </div>
            ` : html`
              <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
                <table class="w-full table-fixed text-left border-collapse">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide" colspan="2">
                        <div class="flex items-center gap-3">
                          <span>Network</span>
                          <div class="network-toggle">
                            <${MyPolzunok} value=${settings.check_ip} onChange=${(v) => handleChange('check_ip', v)} />
                          </div>
                          <span class="text-slate-600 font-medium tracking-wide text-lg">DHCP</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            `}
          </div>

          <!-- ============================================================
               API Settings
          ============================================================ -->
          <div class="w-full mb-6">
            <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
              <table class="w-full table-fixed text-left border-collapse">
                <thead>
                  <tr class="bg-teal-600/10 border-b border-teal-600/20">
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-1/3">API Settings</th>
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                  </tr>
                </thead>
                <tbody>
              <${FieldRow} label="Token" tip=${gt("Token")} index=${0}>
                <${pageSetting}
                  value=${settings.token}
                  setfn=${(v) => handleChange('token', v)}
                  type="text"
                  class="w-full px-3 py-2 bg-white/50 border border-white/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              <//>
                </tbody>
              </table>
            </div>
          </div>

          <!-- ============================================================
               MQTT — общий блок (топики) + подсекции Client / Server
          ============================================================ -->
          <div class="w-full mb-6">
            <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
              <table class="w-full table-fixed text-left border-collapse">
                <thead>
                  <tr class="bg-teal-600/10 border-b border-teal-600/20">
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide" colspan="2">
                      <div class="flex items-center gap-3">
                        <span>MQTT</span>
                        <${MyPolzunok} value=${mqttSectionOpen} onChange=${(v) => setMqttSectionOpen(v)} />
                      </div>
                    </th>
                  </tr>
                </thead>
                ${mqttSectionOpen ? html`
                  <tbody>
                ${[
                  { label: 'TX topic',  key: 'txmqttop', type: 'text', maxlength: 32 },
                  { label: 'RX topic',  key: 'rxmqttop', type: 'text', maxlength: 32 },
                  { label: 'Z2M topic', key: 'rxzbtop',  type: 'text', maxlength: 32, tipLabel: 'RX Z2M topic', placeholder: 'zigbee2mqtt' }
                ].map((item, index) => html`
                  <${FieldRow} label=${item.label} tip=${gt(item.tipLabel || item.label)} index=${index}>
                    <${pageSetting}
                      value=${settings[item.key]}
                      setfn=${(v) => handleChange(item.key, v)}
                      type=${item.type}
                      maxlength=${item.maxlength}
                      placeholder=${item.placeholder || ''}
                      class=${`w-full px-3 py-2 bg-white/50 border ${errors[item.key] ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                      error=${errors[item.key]}
                    />
                  <//>
                `)}
                  </tbody>
                ` : html`<tbody></tbody>`}
              </table>
            </div>

            ${mqttSectionOpen ? html`
            <div class="pl-6 mt-4 space-y-4 border-l-2 border-teal-500/30">

              <!-- ---- MQTT Client ---- -->
              <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
                <table class="w-full table-fixed text-left border-collapse">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-1/3">
                        <div class="flex items-center gap-3">
                          <span>MQTT Client</span>
                          <${MyPolzunok} value=${settings.check_mqtt} onChange=${(v) => handleChange('check_mqtt', v)} />
                        </div>
                      </th>
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                    </tr>
                  </thead>
                  ${settings.check_mqtt ? html`
                    <tbody>
                  ${[
                    { label: 'Host',     key: 'mqtt_hst',  type: 'text',     maxlength: 50 },
                    { label: 'Port',     key: 'mqtt_prt',  type: 'number'   },
                    { label: 'Client',   key: 'mqtt_clt',  type: 'text',     maxlength: 32 },
                    { label: 'User',     key: 'mqtt_usr',  type: 'text',     maxlength: 32 },
                    { label: 'Password', key: 'mqtt_pswd', type: 'password', maxlength: 32, tipLabel: 'Password (MQTT)' }
                  ].map((item, index) => html`
                    <${FieldRow} label=${item.label} tip=${gt(item.tipLabel || item.label)} index=${index}>
                      <${pageSetting}
                        value=${settings[item.key]}
                        setfn=${(v) => handleChange(item.key, v)}
                        type=${item.type}
                        maxlength=${item.maxlength}
                        class=${`w-full px-3 py-2 bg-white/50 border ${errors[item.key] ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                        error=${errors[item.key]}
                      />
                    <//>
                  `)}
                    </tbody>
                  ` : html`<tbody></tbody>`}
                </table>
              </div>

              <!-- ---- MQTT Server (экспериментальный встроенный брокер) ---- -->
              <div class="w-full overflow-auto rounded-2xl shadow-lg border border-amber-400/60 bg-white/30 backdrop-blur-sm">
                <table class="w-full table-fixed text-left border-collapse">
                  <thead>
                    <tr class="bg-amber-500/10 border-b border-amber-500/20">
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-1/3 cursor-help" data-tip=${gt('MQTT Server')}>
                        <div class="flex items-center gap-3">
                          <span>MQTT Server</span>
                          <${MyPolzunok} value=${settings.check_mqtt_srv} onChange=${(v) => handleChange('check_mqtt_srv', v)} />
                        </div>
                      </th>
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                    </tr>
                  </thead>
                  ${settings.check_mqtt_srv ? html`
                    <tbody>
                  ${[
                    { label: 'Port',        key: 'mqtt_srv_prt',    type: 'number',   tipLabel: 'Port (srv)',     min: 1, max: 65535 },
                    { label: 'Max clients', key: 'mqtt_srv_maxcli', type: 'number',   tipLabel: 'Max clients',    min: 1, max: 6 },
                    { label: 'User',        key: 'mqtt_srv_usr',    type: 'text',     maxlength: 32, tipLabel: 'User (srv)' },
                    { label: 'Password',    key: 'mqtt_srv_pswd',   type: 'password', maxlength: 32, tipLabel: 'Password (srv)' },
                    { label: 'SLZB IP',     key: 'slzb_host',       type: 'text',     maxlength: 15, tipLabel: 'SLZB IP', placeholder: '192.168.1.115' }
                  ].map((item, index) => html`
                    <${FieldRow} label=${item.label} tip=${gt(item.tipLabel || item.label)} index=${index}>
                      <${pageSetting}
                        value=${settings[item.key]}
                        setfn=${(v) => handleChange(item.key, v)}
                        name=${item.key}
                        type=${item.type}
                        maxlength=${item.maxlength}
                        min=${item.min}
                        max=${item.max}
                        class=${`w-full px-3 py-2 bg-white/50 border ${errors[item.key] ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                        error=${errors[item.key]}
                      />
                    <//>
                  `)}
                    </tbody>
                  ` : html`<tbody></tbody>`}
                </table>
                ${settings.check_mqtt_srv ? html`
                  <div class="px-6 py-3 text-sm font-semibold text-amber-700 bg-amber-500/10 border-t border-amber-500/20 space-y-2">
                    ${settings.lang === 'ru' ? html`
                      <p>MQTT Server — встроенный MQTT-брокер в настоящее время находится в разработке.</p>
                      <p>MQTT Server поддерживает от 1 до 6 одновременно подключённых MQTT-клиентов. Вы можете изменить это значение, указав параметр <b>Max clients</b> в диапазоне от 1 до 6.</p>
                      <p>Клиентом считается любое устройство или приложение, подключённое к серверу по MQTT. Например:</p>
                      <ul class="list-disc pl-5 space-y-1">
                        <li>Шлюз SLZB-06p7U занимает 1 клиентское подключение</li>
                        <li>Подключённое Android-приложение с MQTT-клиентом — ещё одно подключение</li>
                      </ul>
                      <p>Таким образом, вы можете настроить сервер на работу с необходимым количеством клиентов (от 1 до 6 устройств или приложений).</p>
                      <p class="font-bold pt-1">Технические ограничения</p>
                      <ul class="list-disc pl-5 space-y-1">
                        <li>Поддерживается только QoS 0</li>
                        <li>Retained-сообщения, LWT и TLS не поддерживаются</li>
                        <li>Не используйте MQTT Server и внешний MQTT-клиент на одном порту одновременно</li>
                        <li>Изменение настроек (включая Max clients) требует перезагрузки устройства</li>
                      </ul>
                      <p class="font-bold pt-1">SLZB IP — watchdog шлюза SLZB-06p7U</p>
                      <p>Если шлюз SLZB-06p7U не подключился к брокеру в течение 40 секунд после старта (или отвалился в процессе работы), устройство само перезагрузит его через веб-API — не чаще одного раза в минуту. Укажите в поле <b>SLZB IP</b> IP-адрес шлюза (например, 192.168.1.115). Пустое поле = watchdog выключен.</p>
                      <p class="font-bold pt-1">Производительность при высокой нагрузке</p>
                      <p>При высокой нагрузке возможны задержки и пропуски MQTT-сообщений от Zigbee-устройств.</p>
                      <p>В настоящее время у автора проекта нет достаточного количества Zigbee-устройств и физического оборудования для полноценного тестирования MQTT Server при максимальной нагрузке. Поэтому невозможно гарантировать стабильную работу системы при одновременном использовании всех 89 физических пинов, 200 Zigbee-пинов и 50 таймеров, особенно если они одновременно отправляют MQTT-сообщения.</p>
                      <p class="font-bold pt-1">Рекомендации при проблемах</p>
                      <p>Если вы столкнётесь с задержками, пропусками сообщений или другими проблемами при высокой нагрузке, отключите MQTT Server и настройте MQTT Client. MQTT Client работает стабильно даже при больших нагрузках.</p>
                      <p>Для этого потребуется внешнее устройство с установленным MQTT-сервером. Это может быть:</p>
                      <ul class="list-disc pl-5 space-y-1">
                        <li>Роутер с поддержкой MQTT-брокера</li>
                        <li>Raspberry Pi</li>
                        <li>Другое устройство (сервер, ПК и т.п.)</li>
                      </ul>
                      <p class="font-bold pt-1">Обратная связь</p>
                      <p>Если вы используете встроенный MQTT Server и столкнулись с проблемами, пожалуйста, сообщите о своём опыте. Предоставьте подробности конфигурации и журналы работы — эта информация поможет автору внести необходимые изменения в код и расширить возможности проекта.</p>
                    ` : html`
                      <p>MQTT Server — the built-in MQTT broker is currently under development.</p>
                      <p>MQTT Server supports from 1 to 6 simultaneously connected MQTT clients. You can change this value via the <b>Max clients</b> parameter, in the range from 1 to 6.</p>
                      <p>A client is any device or application connected to the server over MQTT. For example:</p>
                      <ul class="list-disc pl-5 space-y-1">
                        <li>The SLZB-06p7U gateway takes up 1 client connection</li>
                        <li>A connected Android app with an MQTT client — another connection</li>
                      </ul>
                      <p>This way, you can configure the server to work with the number of clients you need (from 1 to 6 devices or applications).</p>
                      <p class="font-bold pt-1">Technical limitations</p>
                      <ul class="list-disc pl-5 space-y-1">
                        <li>Only QoS 0 is supported</li>
                        <li>Retained messages, LWT and TLS are not supported</li>
                        <li>Do not use MQTT Server and an external MQTT client on the same port at the same time</li>
                        <li>Changing the settings (including Max clients) requires a device reboot</li>
                      </ul>
                      <p class="font-bold pt-1">SLZB IP — SLZB-06p7U gateway watchdog</p>
                      <p>If the SLZB-06p7U gateway does not connect to the broker within 40 seconds after startup (or drops out during operation), the device will reboot it via its web API — no more than once per minute. Enter the gateway IP address in the <b>SLZB IP</b> field (for example, 192.168.1.115). An empty field = watchdog disabled.</p>
                      <p class="font-bold pt-1">Performance under heavy load</p>
                      <p>Under heavy load, delays and dropped MQTT messages from Zigbee devices are possible.</p>
                      <p>The project author currently does not have enough Zigbee devices and physical hardware to fully test MQTT Server under maximum load. Therefore stable operation cannot be guaranteed when simultaneously using all 89 physical pins, 200 Zigbee pins and 50 timers, especially if they send MQTT messages at the same time.</p>
                      <p class="font-bold pt-1">Recommendations if you run into problems</p>
                      <p>If you encounter delays, dropped messages or other issues under heavy load, disable MQTT Server and set up MQTT Client instead. MQTT Client works reliably even under heavy load.</p>
                      <p>For this you will need an external device with an MQTT server installed. This can be:</p>
                      <ul class="list-disc pl-5 space-y-1">
                        <li>A router with MQTT broker support</li>
                        <li>A Raspberry Pi</li>
                        <li>Another device (a server, a PC, etc.)</li>
                      </ul>
                      <p class="font-bold pt-1">Feedback</p>
                      <p>If you use the built-in MQTT Server and run into problems, please share your experience. Provide configuration details and logs — this information will help the author make the necessary code changes and expand the project's capabilities.</p>
                    `}
                  </div>
                ` : ''}
              </div>

            </div>
            ` : ''}
          </div>

          <!-- ============================================================
               HTTPS
          ============================================================ -->
          <div class="w-full mb-6">
            ${settings.usehttps ? html`
              <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
                <table class="w-full table-fixed text-left border-collapse">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-1/3">
                        <div class="flex items-center gap-3">
                          <span>HTTPS</span>
                          <${MyPolzunok} value=${settings.usehttps} onChange=${(v) => handleChange('usehttps', v)} />
                        </div>
                      </th>
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                ${[
                  { label: 'HTTPS domain', key: 'domain',   type: 'text'     },
                  { label: 'Private Key',  key: 'tls_key',  type: 'textarea' },
                  { label: 'Public Key',   key: 'tls_cert', type: 'textarea' }
                ].map((item, index) => html`
                  <tr class="transition-colors border-b border-slate-200 ${index % 2 === 0 ? 'bg-sky-200/40' : 'bg-white/80'} hover:bg-slate-200/80">
                    <td
                      class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help align-top"
                      data-tip=${gt(item.label)}
                    >
                      ${item.label}
                    </td>
                    <td class="w-2/3 pl-4 py-4 pr-6 align-top">
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
                            <button type="button"
                              onClick=${() => { navigator.clipboard.writeText(settings[item.key]); showTopNotification('Данные скопированы'); }}
                              class="px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(16,185,129,0.3)] hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-0.5"
                            >Копировать</button>
                            <button type="button"
                              onClick=${() => handleChange(item.key, '')}
                              class="px-3 py-1 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(225,29,72,0.3)] hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-all hover:-translate-y-0.5"
                            >Очистить</button>
                          </div>
                        `}
                        ${settings[item.key] && item.key !== 'domain' && item.key !== 'tls_cert' && html`
                          <button type="button"
                            onClick=${() => handleChange(item.key, '')}
                            class="absolute right-0 top-0 mt-[3px] mr-[3px] px-3 py-1 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(225,29,72,0.3)] hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-all hover:-translate-y-0.5"
                          >Очистить</button>
                        `}
                      </div>
                      ${errors[item.key] && html`<div class="text-red-500 text-sm mt-1 font-semibold w-full text-left">${errors[item.key]}</div>`}
                    </td>
                  </tr>
                `)}
                  </tbody>
                </table>
              </div>
            ` : html`
              <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
                <table class="w-full table-fixed text-left border-collapse">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide" colspan="2">
                        <div class="flex items-center gap-3">
                          <span>HTTPS</span>
                          <${MyPolzunok} value=${settings.usehttps} onChange=${(v) => handleChange('usehttps', v)} />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            `}
          </div>

          <!-- ============================================================
               Coordinates & Astronomy
          ============================================================ -->
          <div class="w-full mb-6">
            <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
              <table class="w-full table-fixed text-left border-collapse">
                <thead>
                  <tr class="bg-teal-600/10 border-b border-teal-600/20">
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-1/3">Coordinates & Astronomy</th>
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                  </tr>
                </thead>
                <tbody>

              <${FieldRow} label="Longitude" tip=${gt("Longitude")} index=${0}>
                <${pageSetting} value=${settings.lon_de} setfn=${(v) => handleChange('lon_de', v)} type="text"
                  class=${`w-full px-3 py-2 bg-white/50 border ${errors.lon_de ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  error=${errors.lon_de} />
              <//>

              <${FieldRow} label="Latitude" tip=${gt("Latitude")} index=${1}>
                <${pageSetting} value=${settings.lat_de} setfn=${(v) => handleChange('lat_de', v)} type="text"
                  class=${`w-full px-3 py-2 bg-white/50 border ${errors.lat_de ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  error=${errors.lat_de} />
              <//>

              <!-- Sunrise — нестандартная строка, data-tip вручную -->
              <tr class="transition-colors border-b border-slate-200 bg-white/80 hover:bg-slate-200/80">
                <td
                  class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help"
                  data-tip=${gt('Sunrise')}
                >
                  Sunrise: <span class="text-teal-600 drop-shadow-sm">${settings.sunrise}</span>
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <div class="flex items-center gap-4">
                    <${MyPolzunok} value=${settings.onsunrise} onChange=${(v) => handleChange('onsunrise', v)} />
                    <input type="text" value=${settings.sunrise_pins || ''} onInput=${(e) => handleChange('sunrise_pins', e.target.value)}
                      maxlength="20" placeholder="Action for sunrise"
                      class="flex-grow w-full px-3 py-2 bg-white/50 border border-white/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                  </div>
                </td>
              </tr>

              <!-- Sunset -->
              <tr class="transition-colors border-b border-slate-200 bg-sky-200/40 hover:bg-slate-200/80">
                <td
                  class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help"
                  data-tip=${gt('Sunset')}
                >
                  Sunset: <span class="text-teal-600 drop-shadow-sm">${settings.sunset}</span>
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <div class="flex items-center gap-4">
                    <${MyPolzunok} value=${settings.onsunset} onChange=${(v) => handleChange('onsunset', v)} />
                    <input type="text" value=${settings.sunset_pins || ''} onInput=${(e) => handleChange('sunset_pins', e.target.value)}
                      maxlength="20" placeholder="Action for sunset"
                      class="flex-grow w-full px-3 py-2 bg-white/50 border border-white/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                  </div>
                </td>
              </tr>

              <${FieldRow} label="Day Length" tip=${gt("Day Length")} index=${4}>
                <span class="text-xl font-medium text-slate-800">${settings.dlength}</span>
              <//>

              <${FieldRow} label="Next full moon" tip=${gt("Next full moon")} index=${5}>
                <span class="text-xl font-medium text-slate-800">
                  ${typeof settings.fullmoon === 'string' && settings.fullmoon
                    ? `${settings.fullmoon.split(' ')[0]} at ${settings.fullmoon.split(' ')[1]}`
                    : 'N/A'}
                </span>
              <//>
              </tbody>
            </table>
            </div>
          </div>

          <!-- ============================================================
               Offline Mode — Date & Time
          ============================================================ -->
          <div class="w-full mb-6">
            <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
              <table class="w-full table-fixed text-left border-collapse">
                <thead>
                  <tr class="bg-teal-600/10 border-b border-teal-600/20">
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-1/3">[OFFLINE MODE] Date & Time</th>
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                  </tr>
                </thead>
                <tbody>
              <!-- Date -->
              <tr class="transition-colors border-b border-slate-200 bg-white/80 hover:bg-slate-200/80">
                <td
                  class="w-1/3 font-bold text-slate-700 text-lg border-r border-slate-500 py-4 px-6 cursor-help"
                  data-tip=${gt('Date')}
                >
                  Date
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <input type="text" name="offdate" value=${settings.offdate || ''} onInput=${(e) => handleChange('offdate', e.target.value)}
                    placeholder="dd.mm.yy"
                    class=${`w-full px-3 py-2 bg-white/50 border ${errors.offdate ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`} />
                  ${errors.offdate && html`<div class="text-red-500 text-sm mt-1 font-semibold">${errors.offdate}</div>`}
                </td>
              </tr>

              <!-- Time -->
              <tr class="transition-colors border-b border-slate-200 bg-sky-200/40 hover:bg-slate-200/80">
                <td
                  class="w-1/3 font-bold text-slate-700 text-lg border-r border-slate-500 py-4 px-6 cursor-help"
                  data-tip=${gt('Time')}
                >
                  Time
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <input type="text" name="offtime" value=${settings.offtime || ''} onInput=${(e) => handleChange('offtime', e.target.value)}
                    placeholder="hh:mm:ss"
                    class=${`w-full px-3 py-2 bg-white/50 border ${errors.offtime ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`} />
                  ${errors.offtime && html`<div class="text-red-500 text-sm mt-1 font-semibold">${errors.offtime}</div>`}
                </td>
              </tr>
              </tbody>
            </table>
            </div>
          </div>

          <!-- ============================================================
              Log Filter / Фильтр логов
          ============================================================ -->
          <div class="w-full mb-6">
            <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">

              <div
                class="bg-teal-600/10 border-b border-teal-600/20 px-6 py-4 flex items-center justify-between cursor-pointer select-none hover:bg-teal-600/20 transition-colors"
                onClick=${() => setLogFilterOpen(v => !v)}
              >
                <span class="text-2xl font-bold text-slate-700 tracking-wide flex items-center gap-2">
                  <span class="text-teal-600 text-lg">${logFilterOpen ? '▾' : '▸'}</span>
                  ${(settings.lang || 'ru') === 'ru' ? 'Фильтр логов' : 'Log Filter'}
                </span>
                <div class="flex items-center gap-3">
                  <span class="text-slate-600 font-medium tracking-wide text-lg">
                    ${(settings.lang || 'ru') === 'ru' ? 'Маска логов в RAM:' : 'RAM Log Mask:'}
                  </span>
                  <span class="px-2 py-0.5 bg-cyan-600/10 text-cyan-700 rounded-md font-mono font-bold text-lg">
                    ${settings.log_filter_mask !== undefined ? settings.log_filter_mask : 0x7FF} (0x${(settings.log_filter_mask !== undefined ? settings.log_filter_mask : 0x7FF).toString(16).toUpperCase()})
                  </span>
                </div>
              </div>

              ${logFilterOpen && html`
                <div class="flex items-stretch">

                  <div class="w-1/4 border-r border-slate-300 px-6 py-6 flex flex-col justify-center items-center gap-4"
                      data-tip=${(settings.lang || 'ru') === 'ru'
                        ? 'Выберите категории логов, которые выводятся в UART и отсылаются. Изменения применяются немедленно в RAM!'
                        : 'Select which log categories are enabled. Changes apply immediately in RAM!'}>
                    <span class="text-base font-bold text-slate-700 text-center">
                      ${(settings.lang || 'ru') === 'ru' ? 'Активные категории' : 'Active Categories'}
                    </span>
                    <button type="button" onClick=${() => handleLogMaskChange(0x7FF)}
                      class="w-full py-3 text-sm font-bold text-teal-600 bg-teal-50 border border-teal-200 rounded-xl hover:bg-teal-100 hover:text-teal-700 transition-all text-center shadow-sm">
                      ${(settings.lang || 'ru') === 'ru' ? 'Включить все' : 'Enable All'}
                    </button>
                    <button type="button" onClick=${() => handleLogMaskChange(0x00)}
                      class="w-full py-3 text-sm font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 hover:text-rose-700 transition-all text-center shadow-sm">
                      ${(settings.lang || 'ru') === 'ru' ? 'Выключить все' : 'Disable All'}
                    </button>
                  </div>

                  <div class="w-3/4 px-6 py-6">
                    <div class="grid grid-cols-4 gap-3">
                      ${LOG_CATEGORIES.map(cat => {
                        const maskVal = settings.log_filter_mask !== undefined ? settings.log_filter_mask : 0x7FF;
                        const isEnabled = (maskVal & (1 << cat.id)) !== 0;
                        return html`
                          <label class=${`flex items-center gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all duration-300 ${isEnabled ? 'bg-cyan-50/70 border-cyan-300 shadow-[0_2px_10px_rgba(34,211,238,0.15)] scale-[1.02]' : 'bg-slate-50/40 border-slate-200 hover:bg-slate-100/50'}`}>
                            <input
                              type="checkbox"
                              checked=${isEnabled}
                              onChange=${(e) => {
                                const newMask = e.target.checked
                                  ? (maskVal | (1 << cat.id))
                                  : (maskVal & ~(1 << cat.id));
                                handleLogMaskChange(newMask);
                              }}
                              class="w-5 h-5 text-cyan-600 border-slate-300 rounded focus:ring-cyan-500 focus:ring-2"
                            />
                            <div class="flex flex-col">
                              <span class="font-bold text-slate-800 text-base leading-tight">${cat.key}</span>
                              <span class="text-xs text-slate-500 font-medium">${(settings.lang || 'ru') === 'ru' ? cat.labelRu : cat.labelEn}</span>
                            </div>
                          </label>
                        `;
                      })}
                    </div>
                  </div>

                </div>
              `}
            </div>
          </div>

          ${topNotification && html`
            <div class="w-full bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white font-bold px-4 py-3 rounded-xl shadow-md text-center border border-green-400/50 backdrop-blur-md">
              ${topNotification}
            </div>
          `}

          <div class="flex justify-end w-full mb-4">${saveBtn()}</div>

        </form>
      </div>
    </div>
    ${toast && html`<${Toast} message=${toast.message} type=${toast.type} />`}
  `;
}

export { Settings };