import { h, render, useState, useEffect, useRef, html, Router } from '../bundle.js';
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
    [3.0,   '(GMT +3:00) Moscow, St. Petersburg, Baghdad, Riyadh'],
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
        if (!ipRegex.test(value)) error = 'Неверный IP-адрес';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    let jsonData = { ...settings };
    for (const [key, value] of formData.entries()) {
      if (['lon_de', 'lat_de', 'timezone', 'mqtt_prt'].includes(key)) {
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
    ['lon_de', 'lat_de', 'timezone', 'mqtt_prt'].forEach((key) => {
      if (jsonData[key] === null || jsonData[key] === '') jsonData[key] = 0;
    });
    jsonData.onsunrise = jsonData.onsunrise ? 1 : 0;
    jsonData.onsunset  = jsonData.onsunset  ? 1 : 0;
    jsonData.check_ip   = jsonData.check_ip   ? 1 : 0;
    jsonData.check_mqtt = jsonData.check_mqtt ? 1 : 0;
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
    if (key === 'offdate') {
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
    if (['lon_de', 'lat_de', 'timezone', 'mqtt_prt'].includes(key)) {
      processedValue = value === '' || value === null ? 0 : Number(value);
    } else if (['onsunrise', 'onsunset', 'check_ip', 'check_mqtt', 'usehttps'].includes(key)) {
      processedValue = value ? 1 : 0;
    }
    setSettings(prev => ({ ...prev, [key]: processedValue }));
    if (key === 'usehttps') {
      setErrors({});
      setSubmitButtonDisabled(false);
    }
  };

  // FIX: handleDelete удалён — нигде не вызывается, вместо него везде используется handleChange(key, '')

  const refresh = () =>
    fetch('/api/mysett/get')
      .then((r) => r.json())
      .then((r) => {
        if (r.offldt) {
          const { date, time } = parseOfflineDateTime(r.offldt);
          r.offdate = date;
          r.offtime = time;
        }
        setSettings(r);
        return r;  // FIX: возвращаем r, чтобы useEffect мог его использовать
      })
      .catch(error => {
        console.error('Error fetching settings:', error);
        showToast('Ошибка при загрузке настроек', 'error');
      });

  useEffect(() => {
    refresh().then((r) => {
      // FIX: используем r из промиса, а не settings из замыкания (stale closure)
      if (r?.tls_key)        setIsPrivateKeyHidden(true);
      if (r?.tls_cert)       setIsPublicKeyHidden(true);
      if (r?.tls_ca)         setIsSecretKeyHidden(true);
      if (r?.telegram_token) setIsTelegramTokenHidden(true);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setSubmitButtonDisabled(!isFormValid(settings, errors));
  }, [settings, errors]);

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
            <h3 class="text-2xl font-bold text-slate-700 tracking-wide drop-shadow-sm mb-4 pl-2">User data</h3>
            <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
              <table class="w-full table-fixed text-left border-collapse">
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
            <div class="flex items-center gap-4 mb-4">
              <h3 class="text-2xl font-bold text-slate-700 tracking-wide drop-shadow-sm pl-2">Network</h3>
              <div class="network-toggle">
                <${MyPolzunok} value=${settings.check_ip} onChange=${(v) => handleChange('check_ip', v)} />
              </div>
              <span class="text-slate-600 font-medium tracking-wide text-lg">
                ${settings.check_ip ? 'DHCP' : 'Static IP'}
              </span>
            </div>
            ${!settings.check_ip ? html`
              <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
                <table class="w-full table-fixed text-left border-collapse">
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
            ` : null}
          </div>

          <!-- ============================================================
               API Settings
          ============================================================ -->
          <div class="w-full mb-6">
            <h3 class="text-2xl font-bold text-slate-700 tracking-wide drop-shadow-sm mb-4 pl-2">API Settings</h3>
            <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
              <table class="w-full table-fixed text-left border-collapse">
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
               MQTT
          ============================================================ -->
          <div class="w-full mb-6">
            <div class="flex items-center gap-4 mb-4">
              <h3 class="text-2xl font-bold text-slate-700 tracking-wide drop-shadow-sm pl-2">MQTT</h3>
              <${MyPolzunok} value=${settings.check_mqtt} onChange=${(v) => handleChange('check_mqtt', v)} />
            </div>
            ${settings.check_mqtt ? html`
              <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
                <table class="w-full table-fixed text-left border-collapse">
                  <tbody>
                ${[
                  { label: 'Host',     key: 'mqtt_hst',  type: 'text'     },
                  { label: 'Port',     key: 'mqtt_prt',  type: 'number'   },
                  { label: 'Client',   key: 'mqtt_clt',  type: 'text'     },
                  { label: 'User',     key: 'mqtt_usr',  type: 'text'     },
                  { label: 'Password', key: 'mqtt_pswd', type: 'password', tipLabel: 'Password (MQTT)' },
                  { label: 'TX topic', key: 'txmqttop',  type: 'text'     },
                  { label: 'RX topic', key: 'rxmqttop',  type: 'text'     }
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
            ` : null}
          </div>

          <!-- ============================================================
               HTTPS
          ============================================================ -->
          <div class="w-full mb-6">
            <div class="flex items-center gap-4 mb-4">
              <h3 class="text-2xl font-bold text-slate-700 tracking-wide drop-shadow-sm pl-2">HTTPS</h3>
              <${MyPolzunok} value=${settings.usehttps} onChange=${(v) => handleChange('usehttps', v)} />
            </div>
            ${settings.usehttps ? html`
              <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
                <table class="w-full table-fixed text-left border-collapse">
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
            ` : null}
          </div>

          <!-- ============================================================
               Coordinates & Astronomy
          ============================================================ -->
          <div class="w-full mb-6">
            <h3 class="text-2xl font-bold text-slate-700 tracking-wide drop-shadow-sm mb-4 pl-2">Coordinates & Astronomy</h3>
            <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
              <table class="w-full table-fixed text-left border-collapse">
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
            <h3 class="text-2xl font-bold text-slate-700 tracking-wide drop-shadow-sm mb-4 pl-2">[OFFLINE MODE] Date & Time</h3>
            <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
              <table class="w-full table-fixed text-left border-collapse">
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