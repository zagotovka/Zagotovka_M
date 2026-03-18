import { h, render, useState, useEffect, useRef, html, Router } from '../bundle.js';
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

function TabSelect({ }) {
  const [varselect, setSelect] = useState(null);
  const [selectedValues, setSelectedValues] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [gpsEnabled, setGpsEnabled] = useState(false);
  const [language, setLanguage] = useState('ru');

  // Инициализируем глобальный tooltip один раз при монтировании
  useEffect(() => { initGlobalTooltip(); }, []);

  const handleGpsToggle = (enabled) => {
    setGpsEnabled(enabled);
  };

  const isRowDisabled = (id) => {
    return gpsEnabled && (id === 1 || id === 35);
  };

  const refresh = () =>
    fetch('api/select/get')
      .then((r) => r.json())
      .then((r) => {
        const data = r.data || r;
        setSelect(data);
        setGpsEnabled(r.sim800l === 1);
        if (r.lang) setLanguage(r.lang);

        const initialValues = {};
        data.forEach((d) => {
          initialValues[`topin_${d.id}`] = d.topin.toString();
        });
        setSelectedValues(initialValues);
      });

  useEffect(refresh, []);

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
    const formData = new FormData(e.target);
    const jsonData = {
      lang: language,
      sim800l: gpsEnabled ? 1 : 0,
      data: []
    };

    varselect.forEach((d) => {
      const value = formData.get(`topin_${d.id}`);
      jsonData.data.push({
        id: d.id,
        pins: d.pins,
        topin: parseInt(value),
        pwm: d.pwm,
        i2cdata: d.i2cdata,
        i2cclok: d.i2cclok
      });
    });

    setSubmissionStatus('submitting');
    setIsButtonDisabled(true);
    setCountdown(3);

    try {
      const response = await fetch('api/select/set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData)
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      setSubmissionStatus('success');
      console.log('Success:', data);

      const updatedValues = {};
      jsonData.data.forEach((item) => {
        updatedValues[`topin_${item.id}`] = item.topin.toString();
      });
      setSelectedValues((prevState) => ({ ...prevState, ...updatedValues }));

      refresh();
    } catch (error) {
      setSubmissionStatus('error');
      console.error('Error:', error);
    }
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setSelectedValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  if (!varselect) return '';

  // -------------------------------------------------------------------------
  // getLangObject / getTooltipText — аналогично другим страницам
  // -------------------------------------------------------------------------
  const getLangObject = () => ({
    langselect: language === 'ru' ? ruLangselect : enLangselect
  });

  const getTooltipText = (key, index) => {
    const langObject = getLangObject();
    let tooltipText =
      langObject[key] && langObject[key][index] ? langObject[key][index] : '';
    const words = tooltipText.split(' ');
    const lines = [];
    for (let i = 0; i < words.length; i += 15) {
      lines.push(words.slice(i, i + 15).join(' '));
    }
    return lines.join('<br>');
  };

  // -------------------------------------------------------------------------
  // Th — заголовок таблицы с tooltip через data-tip (портал в body)
  // -------------------------------------------------------------------------
  const Th = (props) => html`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      style=${props.center ? 'text-align: center' : ''}
      data-tip=${getTooltipText('langselect', props.tooltipIndex)}
    >
      ${props.title}
    </th>
  `;

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

  const ArraySelect = ({ d }) => html`
    <tr class="${isRowDisabled(d.id)
        ? 'bg-red-200/50 opacity-50 pointer-events-none'
        : d.id % 2 === 1
          ? 'bg-white/80'
          : 'bg-sky-200/40'
      } hover:bg-slate-200/80 transition-colors">
      <td class="px-6 py-2 text-sm text-slate-800">${d.id}</td>
      <td class="px-6 py-2 text-sm text-slate-800 font-medium">${d.pins}</td>
      <td class="px-2 py-2">
        <div class="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
          <${RadioOption} id=${d.id} value="0"  label="NONE"     checked=${selectedValues[`topin_${d.id}`] === '0'}  onChange=${handleRadioChange} />
          <${RadioOption} id=${d.id} value="3"  label="SWITCH"   checked=${selectedValues[`topin_${d.id}`] === '3'}  onChange=${handleRadioChange} />
          <${RadioOption} id=${d.id} value="1"  label="BUTTON"   checked=${selectedValues[`topin_${d.id}`] === '1'}  onChange=${handleRadioChange} />
          <${RadioOption} id=${d.id} value="2"  label="DEVICE"   checked=${selectedValues[`topin_${d.id}`] === '2'}  onChange=${handleRadioChange} />
          <${RadioOption} id=${d.id} value="4"  label="1-WIRE"   checked=${selectedValues[`topin_${d.id}`] === '4'}  onChange=${handleRadioChange} />
          <${RadioOption} id=${d.id} value="5"  label="PWM"      disabled=${d.pwm == 0} checked=${selectedValues[`topin_${d.id}`] === '5'}  onChange=${handleRadioChange} />
          <${RadioOption} id=${d.id} value="8"  label="Enc.OutA" checked=${selectedValues[`topin_${d.id}`] === '8'}  onChange=${handleRadioChange} />
          <${RadioOption} id=${d.id} value="9"  label="Enc.OutB" checked=${selectedValues[`topin_${d.id}`] === '9'}  onChange=${handleRadioChange} />
          <${RadioOption} id=${d.id} value="10" label="Security" disabled=${d.monitoring == 0} checked=${selectedValues[`topin_${d.id}`] === '10'} onChange=${handleRadioChange} />
        </div>
      </td>
    </tr>
  `;

  return html`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative overflow-hidden">
      <!-- Decorative background glow -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
          Select pin(s)
        </div>

        <form onSubmit=${handleSubmit}>
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

          <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner overflow-auto">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr class="bg-teal-600/10 border-b border-teal-600/20">
                    <${Th} title="ID" tooltipIndex=${1} />
                    <${Th} title="Pin" tooltipIndex=${2} />
                    <${Th} title="Type(s) of pin(s)" tooltipIndex=${3} center=${true} />
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/40">
                  ${varselect && varselect.map((d) => html`<${ArraySelect} d=${d} />`)}
                </tbody>
              </table>
            </div>
          </div>

          <div class="mt-6 flex justify-start">
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
        </form>
      </div>
    </div>
  `;
}

export { TabSelect };