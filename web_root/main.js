// NOTE: API calls must start with 'api/' in order to serve the app at any URI

('use strict');
import {
  h,
  render,
  useState,
  useEffect,
  useRef,
  html,
  Router
} from './bundle.js';
import {
  Icons,
  Login,
  Setting,
  Button,
  Stat,
  tipColors,
  Colored,
  Notification,
  Pagination,
  UploadFileButton,
  textSection
} from './components.js';
import './Modal.css';
import { ruLangswitch } from './rulang.js';
import { enLangswitch } from './enlang.js';

import { rulangbutton } from './rulang.js';
import { enlangbutton } from './enlang.js';

import { rulangmonitoring } from './rulang.js';
import { enlangmonitoring } from './enlang.js';

import { ruencoder } from './rulang.js';
import { enencoder } from './enlang.js';

import { rurelay } from './rulang.js';
import { enrelay } from './enlang.js';

import { rulangpwm } from './rulang.js';
import { enlangpwm } from './enlang.js';

import { rulangtimers } from './rulang.js';
import { enlangtimers } from './enlang.js';

import { rulange1Wire } from './rulang.js';
import { enlange1Wire } from './enlang.js';

const Logo = (props) =>
  html`<svg
    class=${props.class}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12.87 12.85"
  >
    <defs>
      <style>
        .ll-cls-1 {
          fill: none;
          stroke: #000;
          stroke-miterlimit: 10;
          stroke-width: 0.5px;
        }
      </style>
    </defs>
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_1-2" data-name="Layer 1">
        <path
          class="ll-cls-1"
          d="M12.62,1.82V8.91A1.58,1.58,0,0,1,11,10.48H4a1.44,1.44,0,0,1-1-.37A.69.69,0,0,1,2.84,10l-.1-.12a.81.81,0,0,1-.15-.48V5.57a.87.87,0,0,1,.86-.86H4.73V7.28a.86.86,0,0,0,.86.85H9.42a.85.85,0,0,0,.85-.85V3.45A.86.86,0,0,0,10.13,3,.76.76,0,0,0,10,2.84a.29.29,0,0,0-.12-.1,1.49,1.49,0,0,0-1-.37H2.39V1.82A1.57,1.57,0,0,1,4,.25H11A1.57,1.57,0,0,1,12.62,1.82Z"
        />
        <path
          class="ll-cls-1"
          d="M10.48,10.48V11A1.58,1.58,0,0,1,8.9,12.6H1.82A1.57,1.57,0,0,1,.25,11V3.94A1.57,1.57,0,0,1,1.82,2.37H8.9a1.49,1.49,0,0,1,1,.37l.12.1a.76.76,0,0,1,.11.14.86.86,0,0,1,.14.47V7.28a.85.85,0,0,1-.85.85H8.13V5.57a.86.86,0,0,0-.85-.86H3.45a.87.87,0,0,0-.86.86V9.4a.81.81,0,0,0,.15.48l.1.12a.69.69,0,0,0,.13.11,1.44,1.44,0,0,0,1,.37Z"
        />
      </g>
    </g>
  </svg>`;
const NavLink = ({ title, href, ids }) =>
  html`<a href="#${href}/?id=${ids}" class="">${title}<///>`;
const DelLink = ({ title, href, ids, onclicks }) =>
  html`<a href="${href}" class="" id="${ids}" onclick="${onclicks}">${title}<///>`;

function Header({ logout, user, setShowSidebar, showSidebar }) {
  const [now, setNow] = useState(new Date());
  const [stm32Time, setStm32Time] = useState(null);

  // Функция для преобразования данных времени STM32 в объект Date
  const stm32ToDate = (timeData, timezone) => {
    //console.log('timeData.hour:', timeData.hour);
    //console.log('Timezone:', timezone);
    return new Date(
      timeData.year + 1900,
      timeData.mon,
      timeData.mday,
      timeData.hour,
      timeData.min,
      timeData.sec
    );
  };

  // Функция для обновления времени STM32
  const updateStm32Time = async () => {
    try {
      const response = await fetch('/api/stm32-time');
      //console.log('Raw response:', response);
      const textData = await response.text();
      //console.log('Response text:', textData);

      let data;
      try {
        data = JSON.parse(textData);
      } catch (parseError) {
        //console.error('Error parsing JSON:', parseError);
        //console.log('Invalid JSON data:', textData);
        return;
      }
      //console.log('Parsed data:', data);
      if (data.status && data.time) {
        setStm32Time(stm32ToDate(data.time, data.timezone));
      } else {
        //console.error('Failed to get STM32 time:', data.message);
        setStm32Time(null);
      }
    } catch (error) {
      //console.error('Error fetching STM32 time:', error);
      setStm32Time(null);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    const stm32Interval = setInterval(updateStm32Time, 1000);
    updateStm32Time(); // Первоначальное получение времени STM32
    return () => {
      clearInterval(interval);
      clearInterval(stm32Interval);
    };
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('ru-RU');
  };

  return html`
    <div
      class="bg-white sticky top-0 z-[48] w-full border-b py-2 ${showSidebar
        ? 'pl-72'
        : ''} transition-all duration-300 transform"
    >
      <div class="px-2 w-full py-0 my-0 flex items-center justify-between">
        <button
          type="button"
          onclick=${() => setShowSidebar((v) => !v)}
          class="text-slate-400"
        >
          <${Icons.bars3} class="h-6" />
        </button>
        <div class="flex flex-1 justify-center items-center">
          <span class="text-sm text-slate-600">
            Дата: ${formatDate(now)}<span style="margin-left: 8px;"></span
            >Время: ${formatTime(now)}
          </span>
        </div>
        <div class="flex flex-1 justify-center items-center">
          <span class="text-sm text-slate-600"
            >STM32 дата:
            ${stm32Time ? formatDate(stm32Time) : ' 00.00.0000'}<span
              style="margin-left: 8px;"
            ></span
            >Время: ${stm32Time ? formatTime(stm32Time) : '00:00'}
          </span>
        </div>
        <div class="flex items-center gap-x-4 lg:gap-x-6">
          <span class="text-sm text-slate-400">logged in as: ${user}</span>
          <div
            class="hidden lg:block lg:h-4 lg:w-px lg:bg-gray-200"
            aria-hidden="true"
          ></div>
          <${Button} title="Logout" icon=${Icons.logout} onclick=${logout} />
        </div>
      </div>
    </div>
  `;
}

function Sidebar({ url, show }) {
  const NavLink = ({ title, icon, href, url }) => html`
  <div>
    <a href="#${href}" class="${
    href == url
      ? 'bg-slate-50 text-blue-600 group'
      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 group'
  } flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
      <${icon} class="w-6 h-6"/>
      ${title}
    <///>
  <//>`;
  return html` <div
    class="bg-violet-100 hs-overlay hs-overlay-open:translate-x-0
            -translate-x-full transition-all duration-300 transform
            fixed top-0 left-0 bottom-0 z-[60] w-72 bg-white border-r
            border-gray-200 overflow-y-auto scrollbar-y
            ${show && 'translate-x-0'} right-auto bottom-0"
  >
    <div class="flex flex-col m-4 gap-y-6">
      <div
        class="flex h-10 shrink-0 items-center gap-x-4 font-bold text-xl text-slate-500"
      >
        <${Logo} class="h-full" /> Zagotovka
      <//>
      <div class="flex flex-1 flex-col">
        <${NavLink} title="Dashboard" icon=${Icons.home} href="/" url=${url} />
        <${NavLink}
          title="Select pin"
          icon=${Icons.bars4}
          href="/selects"
          url=${url}
        />
        <${NavLink}
          title="Switch pin"
          icon=${Icons.switchIcon}
          href="/switch"
          url=${url}
        />
        <${NavLink}
          title="Button pin "
          icon=${Icons.buttonIcon}
          href="/button"
          url=${url}
        />
        <${NavLink}
          title="Encoder pin"
          icon=${Icons.encoderIcon}
          href="/encoder"
          url=${url}
        />
        <${NavLink}
          title="Timers (cron)"
          icon=${Icons.timerIcon}
          href="/cron"
          url=${url}
        />
        <${NavLink}
          title="OneWire pin"
          icon=${Icons.owIcon}
          href="/1wire"
          url=${url}
        />
        <${NavLink}
          title="SIM800L/Security"
          icon=${Icons.cog}
          href="/Security"
          url=${url}
        />
        <${NavLink}
          title="Settings"
          icon=${Icons.cog}
          href="/settings"
          url=${url}
        />
        <${NavLink}
          title="Firmware Update"
          icon=${Icons.download}
          href="/update"
          url=${url}
        />
      <//>
    <//>
  <//>`;
}

function Events({}) {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);

  const refresh = () =>
    fetch('api/events/get', {
      method: 'POST',
      body: JSON.stringify({ page: page })
    })
      .then((r) => r.json())
      .then((r) => setEvents(r));

  useEffect(refresh, [page]);

  useEffect(() => {
    setPage(JSON.parse(localStorage.getItem('page')));
  }, []);

  useEffect(() => {
    localStorage.setItem('page', page.toString());
  }, [page]);

  const Th = (props) =>
    html`<th
      scope="col"
      class="sticky top-0 z-10 border-b border-slate-300 bg-white bg-opacity-75 py-1.5 px-4 text-left text-sm font-semibold text-slate-900 backdrop-blur backdrop-filter"
    >
      ${props.title}
    </th>`;
  const Td = (props) =>
    html`<td
      class="whitespace-nowrap border-b border-slate-200 py-2 px-4 pr-3 text-sm text-slate-900"
    >
      ${props.text}
    </td>`;
  const Prio = ({ prio }) => {
    const text = ['high', 'medium', 'low'][prio];
    const colors = [tipColors.red, tipColors.yellow, tipColors.green][prio];
    return html`<${Colored} colors=${colors} text=${text} />`;
  };

  const Event = ({ e }) => html` <tr>
    <${Td} text=${['power', 'hardware', 'tier3', 'tier4'][e.type]} />
    <${Td} text=${html`<${Prio} prio=${e.prio} />`} />
    <${Td}
      text=${e.time ? new Date(e.time * 1000).toLocaleString() : '1970-01-01'}
    />
    <${Td} text=${e.text} />
  <//>`;

  return html` <div
    class="m-4 divide-y divide-gray-200 overflow-auto rounded bg-white"
  >
    <div
      class="font-semibold flex items-center text-gray-600 px-3 justify-between whitespace-nowrap"
    >
      <div class="font-semibold flex items-center text-gray-600">
        <div class="mr-4">EVENT LOG</div>
      </div>
      <${Pagination}
        currentPage=${page}
        setPageFn=${setPage}
        totalItems="400"
        itemsPerPage="20"
      />
    <//>
    <div
      class="inline-block min-w-full align-middle"
      style="max-height: 82vh; overflow: auto;"
    >
      <table class="min-w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <${Th} title="Type" />
            <${Th} title="Prio" />
            <${Th} title="Time" />
            <${Th} title="Description" />
          </tr>
        </thead>
        <tbody>
          ${(events.arr ? events.arr : []).map((e) => h(Event, { e }))}
        </tbody>
      </table>
    <//>
  <//>`;
}

function Chart({ data }) {
  const n = data.length /* entries */,
    w = 20 /* entry width */,
    ls = 15; /* left space */
  const h = 100 /* graph height */,
    yticks = 5 /* Y axis ticks */,
    bs = 10; /* bottom space */
  const ymax = 25;
  const yt = (i) => ((h - bs) / yticks) * (i + 1);
  const bh = (p) => ((h - bs) * p) / 100; // Bar height
  const by = (p) => h - bs - bh(p);
  const range = (start, size, step) =>
    Array.from({ length: size }, (_, i) => i * (step || 1) + start);
  // console.log(ds);
  return html` <div
    class="my-4 divide-y divide-gray-200 overflow-auto rounded bg-white"
  >
    <div class="font-light uppercase flex items-center text-gray-600 px-4 py-2">
      Temperature, last 24h
    <//>
    <div class="relative">
      <svg class="bg-yellow-x50 w-full p-4" viewBox="0 0 ${n * w + ls} ${h}">
        ${range(0, yticks).map(
          (i) => html`
            <line
              x1="0"
              y1=${yt(i)}
              x2=${ls + n * w}
              y2=${yt(i)}
              stroke-width="0.3"
              class="stroke-slate-300"
              stroke-dasharray="1,1"
            />
            <text x="0" y=${yt(i) - 2} class="text-[6px] fill-slate-400"
              >${ymax - (ymax / yticks) * (i + 1)}<//
            >
          `
        )}
        ${range(0, n).map(
          (x) => html`
            <rect
              x=${ls + x * w}
              y=${by((data[x] * 100) / ymax)}
              width="12"
              height=${bh((data[x] * 100) / ymax)}
              rx="2"
              class="fill-cyan-500"
            />
            <text x=${ls + x * w} y="100" class="text-[6px] fill-slate-400"
              >${x * 2}:00<//
            >
          `
        )}
      <//>
    <//>
  <//>`;
}

function DeveloperNote({ text, children }) {
  return html` <div class="flex p-4 gap-2">
    <div class="text-sm text-slate-500">
      <div class="flex items-center">
        <${Icons.info}
          class="self-start basis-[30px] grow-0 shrink-0 text-green-600 mr-2"
        />
        <div class="font-semibold">Developer Note<//>
      <//>
      ${(text || '').split('.').map((v) => html` <p class="my-2 ">${v}<//>`)}
      ${children}
    <//>
  <//>`;
}

function Main({}) {
  const [stats, setStats] = useState(null);
  const refresh = () =>
    fetch('api/stats/get')
      .then((r) => r.json())
      .then((r) => setStats(r));
  useEffect(refresh, []);
  if (!stats) return '';
  return html` <div class="p-2">
    <div class="p-4 sm:p-2 mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
      <${Stat}
        title="Temperature"
        text="${stats.temperature} °C"
        tipText="good"
        tipIcon=${Icons.ok}
        tipColors=${tipColors.green}
      />
      <${Stat}
        title="Humidity"
        text="${stats.humidity} %"
        tipText="warn"
        tipIcon=${Icons.warn}
        tipColors=${tipColors.yellow}
      />
      <div class="bg-white col-span-2 border rounded-md shadow-lg" role="alert">
        <${DeveloperNote}
          text="Stats data is received from the Mongoose backend"
        />
      <//>
    <//>
    <div class="p-4 sm:p-2 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
      <${Chart} data=${stats.points} />

      <div class="my-4 hx-24 bg-white border rounded-md shadow-lg" role="alert">
        <${DeveloperNote}
          text="This chart is an SVG image, generated on the fly from the
        data returned by the api/stats/get API call"
        />
      <//>
    <//>
  <//>`;
}

const MyPolzunok = ({ value, onChange }) => {
  const handleSliderChange = (e) => {
    onChange(e.target.checked ? 1 : 0);
  };

  return html`
    <label class="switch">
      <input type="checkbox" checked=${value} onChange=${handleSliderChange} />
      <span class="slider"></span>
    </label>
    <span class="switch-status">${value ? 'On' : 'Off'}</span>
    <style>
      .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
        vertical-align: middle;
        margin-left: 10px;
      }
      .switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: 0.4s;
        border-radius: 34px;
      }
      .slider:before {
        position: absolute;
        content: '';
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
      }
      input:checked + .slider {
        background-color: #2196f3;
      }
      input:checked + .slider:before {
        transform: translateX(26px);
      }
      .switch-status {
        margin-left: 10px;
        vertical-align: middle;
      }
    </style>
  `;
};

function TabSelect({}) {
  const [varselect, setSelect] = useState(null);
  const [selectedValues, setSelectedValues] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [gpsEnabled, setGpsEnabled] = useState(false);
  const [language, setLanguage] = useState('ru');

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
        // Assuming the new structure with 'data' array
        const data = r.data || r;
        setSelect(data);

        // Initialize GPS state from received data
        setGpsEnabled(r.sim800l === 1);

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
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

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

  const ArraySelect = ({ d }) => html`
    <tr
      class="${isRowDisabled(d.id)
        ? 'bg-red-200 opacity-50 pointer-events-none'
        : d.id % 2 === 1
        ? 'bg-white'
        : 'bg-green-300'}"
    >
      <td class="px-4 py-2">${d.id}</td>
      <td class="px-4 py-2">${d.pins}</td>
      <td class="px-4 py-2 flex justify-center">
        <div class="px-8 flex items-center">
          <input
            id="${d.id}_0"
            class="mr-2"
            type="radio"
            name="topin_${d.id}"
            value="0"
            checked="${selectedValues[`topin_${d.id}`] === '0'}"
            onChange=${handleRadioChange}
            aria-label="NONE"
          />
          <label for="${d.id}_0" class="mr-2">NONE </label>
        </div>
        <div class="px-8 flex items-center">
          <input
            id="${d.id}_3"
            class="mr-2"
            type="radio"
            name="topin_${d.id}"
            value="3"
            checked="${selectedValues[`topin_${d.id}`] === '3'}"
            onChange=${handleRadioChange}
            aria-label="SWITCH"
          />
          <label for="${d.id}_3" class="mr-2">SWITCH</label>
        </div>
        <div class="px-8 flex items-center">
          <input
            id="${d.id}_1"
            class="mr-2"
            type="radio"
            name="topin_${d.id}"
            value="1"
            checked="${selectedValues[`topin_${d.id}`] === '1'}"
            onChange=${handleRadioChange}
            aria-label="BUTTON"
          />
          <label for="${d.id}_1" class="mr-2">BUTTON</label>
        </div>
        <div class="mx-2 flex items-center">
          <input
            id="${d.id}_2"
            class="mr-2"
            type="radio"
            name="topin_${d.id}"
            value="2"
            checked="${selectedValues[`topin_${d.id}`] === '2'}"
            onChange=${handleRadioChange}
            aria-label="DEVICE"
          />
          <label for="${d.id}_2" class="mr-2">DEVICE</label>
        </div>
        <div class="mx-2 flex items-center">
          <input
            id="${d.id}_4"
            class="mr-2"
            type="radio"
            name="topin_${d.id}"
            value="4"
            checked="${selectedValues[`topin_${d.id}`] === '4'}"
            onChange=${handleRadioChange}
            aria-label="1-WIRE"
          />
          <label for="${d.id}_4" class="mr-2">1-WIRE</label>
        </div>
        <div class="mx-2 flex items-center">
          <input
            id="${d.id}_5"
            class="mr-2"
            type="radio"
            name="topin_${d.id}"
            value="5"
            checked="${selectedValues[`topin_${d.id}`] === '5'}"
            onChange=${handleRadioChange}
            disabled="${d.pwm == 0 ? 'disabled' : ''}"
            aria-label="PWM"
          />
          <label
            for="${d.id}_5"
            class="${d.pwm == 0 ? 'text-gray-400' : ''} mr-2"
            >PWM</label
          >
        </div>
        <div class="mx-2 flex items-center">
          <input
            id="${d.id}_8"
            class="mr-2"
            type="radio"
            name="topin_${d.id}"
            value="8"
            checked="${selectedValues[`topin_${d.id}`] === '8'}"
            onChange=${handleRadioChange}
            aria-label="EncoderA"
          />
          <label for="${d.id}_8" class="mr-2">Enc.OutA</label>
        </div>
        <div class="mx-2 flex items-center">
          <input
            id="${d.id}_9"
            class="mr-2"
            type="radio"
            name="topin_${d.id}"
            value="9"
            checked="${selectedValues[`topin_${d.id}`] === '9'}"
            onChange=${handleRadioChange}
            aria-label="EncoderB"
          />
          <label for="${d.id}_9" class="mr-2">Enc.OutB</label>
        </div>
        <div class="mx-2 flex items-center">
          <input
            id="${d.id}_10"
            class="mr-2"
            type="radio"
            name="topin_${d.id}"
            value="10"
            checked="${selectedValues[`topin_${d.id}`] === '10'}"
            onChange=${handleRadioChange}
            disabled="${d.monitoring == 0 ? 'disabled' : ''}"
            aria-label="Security"
          />
          <label
            for="${d.id}_7"
            class="${d.monitoring == 0 ? 'text-gray-400' : ''} mr-2"
            >Security</label
          >
        </div>
      </td>
    </tr>
  `;

  return html`
    <div class="m-4 divide-y divide-gray-200 overflow-auto rounded bg-white">
      <div class="font-medium uppercase flex items-center px-4 py-2">
        Select pin(s)
      </div>
      <div class="flex-grow flex flex-col justify-center items-center">
        <div class="justify-center">
          <div class="mb-4">
            <form onSubmit=${handleSubmit}>
              <div class="relative flex justify-between items-center mb-5">
                <button
                  type="submit"
                  class=${`inline-flex justify-center items-center gap-2 rounded px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ${
                    isButtonDisabled
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-700'
                  }`}
                  disabled=${isButtonDisabled}
                >
                  ${isButtonDisabled
                    ? `Please wait ${countdown} sec.`
                    : 'Submit'}
                </button>

                <div class="flex items-center">
                  <span class="mr-3 text-gray-700">SIM800L</span>
                  <label
                    class="relative inline-flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      class="sr-only peer"
                      checked=${gpsEnabled}
                      onChange=${(e) => handleGpsToggle(e.target.checked)}
                    />
                    <div
                      class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 
                            peer-focus:ring-blue-300 peer-checked:after:translate-x-full 
                            peer-checked:after:border-white after:content-[''] after:absolute 
                            after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 
                            after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                            peer-checked:bg-blue-600"
                    ></div>
                  </label>
                </div>
              </div>

              ${submissionStatus === 'success' &&
              html`
                <div
                  class="mb-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded"
                  role="alert"
                >
                  <strong class="font-bold">Успех! </strong>
                  <span class="block sm:inline">
                    Данные успешно сохранены. Идет запись на USB флешку. Кнопка
                    станет активной через ${countdown} секунд.
                  </span>
                </div>
              `}
              ${submissionStatus === 'error' &&
              html`
                <div
                  class="mb-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded"
                  role="alert"
                >
                  <strong class="font-bold">Ошибка!</strong>
                  <span class="block sm:inline">
                    Произошла ошибка при отправке данных. Пожалуйста, попробуйте
                    еще раз через ${countdown} секунд.
                  </span>
                </div>
              `}

              <table class="table-auto border divide-y divide-gray-200">
                <thead>
                  <tr class="bg-gray-400">
                    <th class="px-4 py-2">ID</th>
                    <th class="px-4 py-2">Pin</th>
                    <th class="px-4 py-2">Type(s) of pin(s)</th>
                  </tr>
                </thead>
                <tbody>
                  ${varselect && varselect.map((d) => h(ArraySelect, { d }))}
                </tbody>
              </table>

              <div class="relative mt-5">
                <button
                  type="submit"
                  class=${`inline-flex justify-center items-center gap-2 rounded px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ${
                    isButtonDisabled
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-700'
                  }`}
                  disabled=${isButtonDisabled}
                >
                  ${isButtonDisabled
                    ? `Please wait ${countdown} sec.`
                    : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
}
// Добавлен параметр cache: 'no-store' для отключения кэширования
function ModalSwitch({
  modalType,
  page,
  hideModal,
  closeOnOverlayClick = true,
  title,
  selectedSwitch,
  onSwitchChange,
  connectionOptions,
  SliderComponent = MyPolzunok
}) {
  const [switchInfo, setSwitchInfo] = useState(selectedSwitch?.info || '');
  const [onoff, setOnOff] = useState(selectedSwitch?.onoff || 0);
  const [ptype, setPtype] = useState(selectedSwitch?.ptype || 0);
  const [selectedConnection, setSelectedConnection] = useState(
    selectedSwitch?.setrpins || ''
  );
  const [pinOptions, setPinOptions] = useState([]);

  useEffect(() => {
    fetch('/api/select/get', {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        if (!response || !response.data || !Array.isArray(response.data)) {
          console.error('Invalid data format:', response);
          setPinOptions([]);
          return;
        }
        const relayPins = response.data.filter((pin) => pin.topin === 2);
        setPinOptions(relayPins);
      })
      .catch((error) => {
        console.error('Error fetching pin config:', error);
        setPinOptions([]);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const jsonData = Object.fromEntries(formData);

    jsonData.id = selectedSwitch.id;
    jsonData.pins = selectedSwitch.pins;

    if (modalType === 'edit') {
      jsonData.onoff = onoff;
    } else if (modalType === 'connection') {
      const selectedPin = pinOptions.find(
        (pin) => pin.pins === jsonData.setrpins
      );
      if (selectedPin) {
        jsonData.pinact = {
          ...selectedSwitch.pinact,
          [selectedPin.id]: selectedPin.pins
        };
      }
    }

    fetch('/api/switch/set', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        onSwitchChange({
          ...selectedSwitch,
          ...jsonData
        });
        hideModal();
        window.location.href = '/#/switch';
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleConnectionChange = (e) => {
    setSelectedConnection(e.target.value);
  };

  const handlePtypeChange = (e) => {
    setPtype(parseInt(e.target.value));
  };

  const handleSwitchInfoChange = (e) => {
    setSwitchInfo(e.target.value);
  };

  const handleOnOffChange = (value) => {
    setOnOff(value);
  };

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      hideModal();
    }
  };

  const handleResetPin = () => {
    setPtype(0);
    setSwitchInfo('');
    setOnOff(0);
  };

  const modalContent = () => {
    if (page === 'TabSwitch') {
      if (modalType === 'connection') {
        return html`
          <form onsubmit=${handleSubmit}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">ID</td>
                    <td class="p-2">${selectedSwitch.id}</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Pin</td>
                    <td class="p-2">${selectedSwitch.pins}</td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">Connection</td>
                    <td class="p-2">
                      <select
                        name="setrpins"
                        value=${selectedConnection}
                        onchange=${handleConnectionChange}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select a connection</option>
                        ${pinOptions.map(
                          (option) => html`
                            <option value=${option.pins}>
                              ${option.pins} (ID: ${option.id})
                            </option>
                          `
                        )}
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer flex justify-end mt-4">
              <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save changes
              </button>
            </div>
          </form>
        `;
      } else if (modalType === 'edit') {
        return html`
          <form onsubmit=${handleSubmit}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">ID</td>
                    <td class="p-2">${selectedSwitch.id}</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Pin</td>
                    <td class="p-2">${selectedSwitch.pins}</td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">Pullup type</td>
                    <td class="p-2">
                      <select
                        name="ptype"
                        value=${ptype}
                        onchange=${handlePtypeChange}
                        class="border rounded p-2 w-full"
                      >
                        <option value="0">None</option>
                        <option value="1">GPIO_PULLUP</option>
                        <option value="2">GPIO_PULLDOWN</option>
                      </select>
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">INFO</td>
                    <td class="p-2">
                      <input
                        type="text"
                        name="info"
                        value=${switchInfo}
                        oninput=${handleSwitchInfoChange}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${SliderComponent}
                        value=${onoff}
                        onChange=${handleOnOffChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer flex justify-between items-center mt-4">
              <button
                type="button"
                onclick=${handleResetPin}
                class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Reset pin
              </button>
              <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save changes
              </button>
            </div>
          </form>
        `;
      }
    }
  };

  return html`
    <div
      class="fixed inset-0 z-50 bg-black bg-opacity-50"
      style="margin-top: 7px;"
      onclick=${handleOverlayClick}
    >
      <div class="flex items-center justify-center min-h-full p-4">
        <div
          class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative"
          style="max-height: calc(100vh - 57px); overflow-y: auto;"
        >
          <div class="modal-header flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">${title}</h2>
            <button
              onclick=${hideModal}
              class="close-button text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
          ${modalContent()}
        </div>
      </div>
    </div>
  `;
}

function TabSwitch({}) {
  const [switchData, setSwitchData] = useState(null);
  const [saveResult, setSaveResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedSwitch, setSelectedSwitch] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [language, setLanguage] = useState('ru');
  const [varswitch, setSwitch] = useState(null);
  const [pintopin, setPintopin] = useState([]);
  const [debugInfo, setDebugInfo] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const refresh = () =>
    Promise.all([
      fetch('/api/switch/get').then((r) => r.json()),
      fetch('/api/pintopin/get').then((r) => r.json())
    ])
      .then(([switchData, pintopinData]) => {
        setLanguage(switchData.lang);
        setSwitch(switchData.switches);
        setSwitchData(switchData);
        setPintopin(pintopinData);
        setDebugInfo(
          `Pintopin data: ${JSON.stringify(
            pintopinData,
            null,
            2
          )}\n\nSwitch data: ${JSON.stringify(switchData.switches, null, 2)}`
        );
        console.log('Pintopin data:', pintopinData);
        console.log('Switch data:', switchData.switches);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setDebugInfo(`Error fetching data: ${error.message}`);
      });

  const fetchSwitchData = () => {
    fetch('/api/switch/get')
      .then((r) => r.json())
      .then((data) => {
        setSwitch(data.switches);
        setLanguage(data.lang);
        console.log('Updated switch data:', data.switches);
      })
      .catch((error) => {
        console.error('Error fetching switch data:', error);
      });
  };

  const fetchPintopinData = () => {
    fetch('/api/pintopin/get')
      .then((r) => r.json())
      .then((data) => {
        setPintopin(data);
        console.log('Updated pintopin data:', data);
      })
      .catch((error) => {
        console.error('Error fetching pintopin data:', error);
      });
  };

  useEffect(() => {
    // Начальная загрузка данных
    fetchSwitchData();
    fetchPintopinData();

    // Устанавливаем интервал для периодического обновления данных
    const intervalId = setInterval(() => {
      fetchSwitchData();
      fetchPintopinData();
    }, 1000); // Обновляем каждую секунду

    // Очищаем интервал при размонтировании компонента
    return () => clearInterval(intervalId);
  }, []);

  const getConnectedPins = (switchId) => {
    const connectedPins = new Map();

    // Добавляем пины из pinact
    const switchItem = varswitch.find((sw) => sw.id === switchId);
    if (switchItem && switchItem.pinact) {
      Object.entries(switchItem.pinact).forEach(([pin, relayId]) => {
        connectedPins.set(pin, { pin, relayId });
      });
    }

    // Добавляем пины из pintopin
    pintopin.forEach((item) => {
      if (item.idin === switchId) {
        const key = `${item.pins}(${item.idout})`;
        if (!connectedPins.has(key)) {
          connectedPins.set(key, { pin: item.pins, relayId: item.idout });
        }
      }
    });
    return Array.from(connectedPins.values());
  };

  const getLangObject = () => {
    return language === 'ru' ? ruLangswitch : enLangswitch;
  };

  const getTooltipText = (key, index) => {
    const langObject = getLangObject();
    const tooltipText = langObject[index] || '';

    // Split text into words
    const words = tooltipText.split(' ');
    const lines = [];
    let currentLine = '';

    // Build lines word by word
    for (let i = 0; i < words.length; i++) {
      const word = words[i];

      if (currentLine.length + word.length + 1 <= 200) {
        // Add word to current line
        currentLine += (currentLine.length > 0 ? ' ' : '') + word;
      } else {
        // Line would be too long, start a new line
        if (currentLine.length > 0) {
          lines.push(currentLine);
        }
        currentLine = word;
      }
    }

    // Add the last line if there's anything left
    if (currentLine.length > 0) {
      lines.push(currentLine);
    }

    return lines.join('<br>');
  };

  const onsave = (id, pinInfo) => {
    console.log('Удаление соединения:', id, pinInfo);

    const [pinName, idoutStr] = pinInfo.split('(');
    const idout = idoutStr ? parseInt(idoutStr) : null;

    fetch('/api/connection/del', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id, pin: pinName.trim() })
    })
      .then((r) => r.json())
      .then((r) => {
        setSaveResult(r);
        setSwitch((prevSwitch) =>
          prevSwitch.map((sw) => {
            if (sw.id === id) {
              const updatedPinact = { ...sw.pinact };
              delete updatedPinact[pinName.trim()];
              return { ...sw, pinact: updatedPinact };
            }
            return sw;
          })
        );
        setPintopin((prevPintopin) =>
          prevPintopin.filter(
            (item) =>
              !(
                item.idin === id &&
                item.pins === pinName.trim() &&
                (idout === null || item.idout === idout)
              )
          )
        );
      })
      .then(() => {
        console.log('Соединение удалено успешно');
        refresh();
      })
      .catch((error) => {
        console.error('Ошибка при удалении соединения:', error);
      });
  };

  const openModal = (type, switchData) => {
    setModalType(type);
    setSelectedSwitch(switchData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedSwitch(null);
  };

  const handleSwitchChange = (updatedSwitch) => {
    console.log('handleSwitchChange:', updatedSwitch);

    // Отправляем обновление на сервер
    fetch('/api/onoff/set', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: updatedSwitch.id, onoff: updatedSwitch.onoff })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response from /api/onoff/set:', data);
        // Обновление будет получено при следующем fetchSwitchData
      })
      .catch((error) => {
        console.error('Error calling /api/onoff/set:', error);
      });

    closeModal();
  };

  const getRelayConnection = (switchId) => {
    const connection = pintopin.find((item) => item.idin === switchId);
    return connection ? `${connection.pins} (${connection.idout})` : '';
  };
  const helpContent = {
    ru: html`
      <div class="mytext space-y-6">
        <div>
          <pre class="mb-4">
            Данный API позволяет дистанционно управлять выключателем, просто выполнив команду в браузере любого устройства в вашей локальной сети.
          </pre>
          <pre class="text-red-500 font-bold">
            Не открывайте доступ из интернета к вашим API - это небезопасно!
          </pre>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Примеры API</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">API</th>
                <th class="border px-4 py-2">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/switch?id=27&onoff=1
                </td>
                <td class="border px-4 py-2">
                  Данная команда ВКЛючит выключатель с id = 27. Где "Zerg" это Ваш 'Token'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/switch?id=27&onoff=0
                </td>
                <td class="border px-4 py-2">
                  Данная команда ОТКлючит выключатель с id = 27. Где "Zerg" это Ваш 'Token'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div>
          <pre class="mb-4">
            MQTT позволяет дистанционно управлять выключателем из интернета!
          </pre>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Примеры команд MQTT</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">Команда</th>
                <th class="border px-4 py-2">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">Swarm/switch/id=27/onoff=1</td>
                <td class="border px-4 py-2">
                  Данная MQTT команда ВКЛючит выключатель с id = 27. Где "Swarm" это Ваш 'RX topic'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Swarm/switch/id=27/onoff=0</td>
                <td class="border px-4 py-2">
                  Данная MQTT команда ОТКлючит выключатель с id = 27. Где "Swarm" это Ваш 'RX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div>
          <h2 class="text-xl font-bold mb-2">Отслеживание изменений</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">Топик</th>
                <th class="border px-4 py-2">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">Swarm/switch/</td>
                <td class="border px-4 py-2">
                  Данная страница отслеживает изменения выключателей и автоматически отправляет каждое изменение по MQTT на топик: Swarm/switch/.
                  Где "Swarm" это Ваш 'RX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `,
    en: html`
      <div class="mytext space-y-6">
        <div>
          <pre class="mb-4">
            This API allows you to remotely control a switch by simply executing a command in the browser of any device on your local network.
          </pre>
          <pre class="text-red-500 font-bold">
            Do not expose your APIs to the internet - it's not secure!
          </pre>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">API Examples</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">API</th>
                <th class="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/switch?id=15&onoff=1
                </td>
                <td class="border px-4 py-2">
                  Where "Zerg" is your 'Token'. This command will turn on the switch with id = 15.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/switch?id=15&onoff=0
                </td>
                <td class="border px-4 py-2">
                  Where "Zerg" is your 'Token'. This command will turn off the switch with id = 15.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div>
          <pre class="mb-4">
            MQTT allows you to remotely control a switch from the internet!
          </pre>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">MQTT Command Examples</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">Command</th>
                <th class="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">Swarm/switch/id=27/onoff=1</td>
                <td class="border px-4 py-2">
                  Where "Swarm" is your 'RX topic'. This command will turn ON the switch with id = 27.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Swarm/switch/id=27/onoff=0</td>
                <td class="border px-4 py-2">
                  Where "Swarm" is your 'RX topic'. This command will turn OFF the switch with id = 27.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div>
          <h2 class="text-xl font-bold mb-2">Change Tracking</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">Topic</th>
                <th class="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">Swarm/switch/</td>
                <td class="border px-4 py-2">
                  This page tracks changes in switches and automatically sends each change via MQTT to the topic: Swarm/switch/.
                  Where "Swarm" is your 'RX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `
  };
  const Th = (props) => html`
    <th class="px-4 py-2 relative group">
      ${props.title}
      <div
        class="absolute z-50 invisible group-hover:visible bg-orange-300 p-2 rounded shadow-lg text-left"
        style="width: 400px; left: 50%; transform: translateX(-50%); top: 100%;"
        dangerouslySetInnerHTML=${{
          __html: getTooltipText('langbutton', props.tooltipIndex)
        }}
      ></div>
    </th>
  `;

  const ArraySwitch = ({ d, index }) => {
    const connectedPins = getConnectedPins(d.id);

    return html`
      <tr class="${index % 2 === 1 ? 'bg-white' : 'bg-green-300'}">
        <td class="px-4 py-2">${d.id}</td>
        <td class="px-4 py-2">${d.pins}</td>
        <td class="px-4 py-2">
          ${['None', 'GPIO_PULLUP', 'GPIO_PULLDOWN'][d.ptype]}
        </td>
        <td class="px-4 py-2">
          ${connectedPins.map(
            ({ pin, relayId }) => html`
              <span class="mr-2">
                ${pin}${relayId !== undefined ? `(${relayId})` : ''}
                <button
                  onClick=${(e) => {
                    e.preventDefault();
                    onsave(d.id, `${pin}(${relayId})`);
                  }}
                  class="text-red-500 hover:text-red-700"
                  style="margin-left: 2px; font-weight: bold;"
                >
                  [<strong>x</strong>]
                </button>
              </span>
            `
          )}
        </td>
        <td class="px-4 py-2">${d.info}</td>
        <td class="px-4 py-2">
          <${MyPolzunok}
            value=${d.onoff}
            onChange=${(value) => handleSwitchChange({ ...d, onoff: value })}
          />
        </td>
        <td class="px-4 py-2">
          <button
            onClick=${() => openModal('connection', d)}
            class="text-blue-500 hover:text-blue-700 mr-2"
          >
            Connection
          </button>
          |
          <button
            onClick=${() => openModal('edit', d)}
            class="text-blue-500 hover:text-blue-700 ml-2"
          >
            Edit
          </button>
        </td>
      </tr>
    `;
  };

  if (!varswitch) return '';

  return html`
    <div class="flex-grow flex flex-col justify-center items-center">
      <div class="font-medium uppercase flex items-center px-4 py-2">
        Switch(es) pin(s)
      </div>

      <div class="flex-grow flex flex-col justify-center items-center">
        <div class="justify-center">
          <div class="mb-4">
            <table class="table-auto border divide-y divide-gray-200">
              <thead>
                <tr class="bg-gray-400">
                  <${Th} title="ID" tooltipIndex=${1} />
                  <${Th} title="Pin" tooltipIndex=${2} />
                  <${Th} title="Pullup type" tooltipIndex=${3} />
                  <${Th} title="Device connection" tooltipIndex=${4} />
                  <${Th} title="INFO" tooltipIndex=${5} />
                  <${Th} title="On/Off" tooltipIndex=${6} />
                  <${Th} title="Action" tooltipIndex=${7} />
                </tr>
              </thead>
              <tbody id="tab1">
                ${varswitch.map(
                  (d, index) =>
                    html`<${ArraySwitch} d=${d} index=${index} key=${d.id} />`
                )}
              </tbody>
            </table>
          </div>

          <div class="flex justify-end mt-4">
            <button
              onclick=${() => setShowHelp(!showHelp)}
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              ${showHelp ? 'Hide Help' : 'Show Help'}
            </button>
          </div>

          ${showHelp &&
          html`
            <div class="mt-4 p-4 border rounded">${helpContent[language]}</div>
          `}
        </div>
      </div>

      ${isModalOpen &&
      html`
        <${ModalSwitch}
          modalType=${modalType}
          page="TabSwitch"
          hideModal=${closeModal}
          title=${modalType === 'connection'
            ? 'Edit Connection'
            : 'Edit switch'}
          selectedSwitch=${selectedSwitch}
          onSwitchChange=${handleSwitchChange}
        />
      `}
    </div>
  `;
}

const ModalButton = ({
  modalType,
  page,
  hideModal,
  closeOnOverlayClick = true,
  title,
  selectedButton,
  onButtonChange,
  SliderComponent = MyPolzunok
}) => {
  const [buttonInfo, setButtonInfo] = useState(selectedButton?.info || '');
  const [onoff, setOnOff] = useState(selectedButton?.onoff || 0);
  const [ptype, setPtype] = useState(selectedButton?.ptype || 0);
  const [sclick, setSclick] = useState(selectedButton?.sclick || '');
  const [dclick, setDclick] = useState(selectedButton?.dclick || '');
  const [lpress, setLpress] = useState(selectedButton?.lpress || '');
  const [pinOptions, setPinOptions] = useState([]);
  const [errors, setErrors] = useState({
    sclick: null,
    dclick: null,
    lpress: null
  });
  const [submitError, setSubmitError] = useState(null);

  const doubleClickLongPressRegex = /^(None|\d{1,2}:[012])(,\d{1,2}:[012])*$/;

  const validateInput = (value) => {
    if (!value || value.trim() === '' || value.toLowerCase() === 'none') {
      return null;
    }
    return doubleClickLongPressRegex.test(value)
      ? null
      : 'Incorrect format. Use "None" or "pin:value" format.';
  };

  const handleInputChange = (key, value) => {
    const error = validateInput(value);
    setErrors((prev) => ({ ...prev, [key]: error }));

    switch (key) {
      case 'sclick':
        setSclick(value);
        break;
      case 'dclick':
        setDclick(value);
        break;
      case 'lpress':
        setLpress(value);
        break;
    }
  };

  useEffect(() => {
    fetch('/api/select/get')
      .then((response) => response.json())
      .then((data) => {
        // Проверяем, является ли data массивом
        if (Array.isArray(data)) {
          setPinOptions(data.filter((pin) => pin.topin === 2));
        } else {
          // console.error('Expected array from API, received:', typeof data);
          setPinOptions([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching pin config:', error);
        setPinOptions([]);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(errors).some((error) => error !== null)) {
      setSubmitError('Please correct the errors before submitting.');
      return;
    }

    const updatedButton = {
      ...selectedButton,
      info: buttonInfo,
      sclick: sclick || 'None',
      dclick: dclick || 'None',
      lpress: lpress || 'None',
      onoff,
      ptype
    };

    fetch('/api/button/set', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedButton)
    })
      .then((response) => response.json())
      .then((data) => {
        onButtonChange(updatedButton);
        hideModal();
      })
      .catch((error) => {
        console.error('Error:', error);
        setSubmitError('Failed to save changes. Please try again.');
      });
  };

  const handleResetPin = () => {
    setPtype(0);
    setSclick('');
    setDclick('');
    setLpress('');
    setButtonInfo('');
    setOnOff(0);
    setErrors({ sclick: null, dclick: null, lpress: null });
  };

  const renderConnectionModal = () => html`
    <form onSubmit=${handleSubmit}>
      <div class="modal-body">
        <table class="table-auto w-full">
          <tbody>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">ID</td>
              <td class="p-2">${selectedButton.id}</td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">Pin</td>
              <td class="p-2">${selectedButton.pins}</td>
            </tr>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">Connection</td>
              <td class="p-2">
                <select
                  name="setrpins"
                  value=${selectedButton?.setrpins || ''}
                  onChange=${(e) =>
                    onButtonChange({
                      ...selectedButton,
                      setrpins: e.target.value
                    })}
                  class="border rounded p-2 w-full"
                >
                  <option value="">Select a connection</option>
                  ${pinOptions.map(
                    (option) => html`
                      <option value=${option.pins}>
                        ${option.pins} (ID: ${option.id})
                      </option>
                    `
                  )}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer flex justify-end mt-4">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save changes
        </button>
      </div>
    </form>
  `;

  const renderEditModal = () => html`
    <form onSubmit=${handleSubmit}>
      <div class="modal-body">
        <table class="table-auto w-full">
          <tbody>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">ID</td>
              <td class="p-2">${selectedButton.id}</td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">Pin</td>
              <td class="p-2">${selectedButton.pins}</td>
            </tr>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">Ptype</td>
              <td class="p-2">
                <select
                  name="ptype"
                  value=${ptype}
                  onChange=${(e) => setPtype(parseInt(e.target.value))}
                  class="border rounded p-2 w-full"
                >
                  <option value="0">None</option>
                  <option value="1">GPIO_PULLUP</option>
                  <option value="2">GPIO_PULLDOWN</option>
                </select>
              </td>
            </tr>
            ${['sclick', 'dclick', 'lpress'].map(
              (type) => html`
                <tr class=${type === 'dclick' ? 'bg-gray-200' : 'bg-white'}>
                  <td class="p-2 font-bold">
                    ${type === 'sclick'
                      ? 'Single Click'
                      : type === 'dclick'
                      ? 'Double Click'
                      : 'Long Press'}
                  </td>
                  <td class="p-2">
                    <input
                      type="text"
                      name=${type}
                      value=${eval(type)}
                      onInput=${(e) => handleInputChange(type, e.target.value)}
                      class="border rounded p-2 w-full ${errors[type]
                        ? 'border-red-500'
                        : ''}"
                      placeholder="None"
                    />
                    ${errors[type] &&
                    html`<p class="text-red-500 text-sm">${errors[type]}</p>`}
                  </td>
                </tr>
              `
            )}
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">INFO</td>
              <td class="p-2">
                <input
                  type="text"
                  name="info"
                  value=${buttonInfo}
                  onInput=${(e) => setButtonInfo(e.target.value)}
                  class="border rounded p-2 w-full"
                />
              </td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">On/Off</td>
              <td class="p-2">
                <${SliderComponent} value=${onoff} onChange=${setOnOff} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer flex justify-between mt-4">
        <button
          type="button"
          onClick=${handleResetPin}
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset Pin
        </button>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save changes
        </button>
      </div>
      ${submitError && html`<p class="text-red-500 mt-2">${submitError}</p>`}
    </form>
  `;

  return html`
    <div
      class="fixed inset-0 z-50 bg-black bg-opacity-50"
      style="margin-top: 7px;"
    >
      <div class="flex items-center justify-center min-h-full p-4">
        <div
          class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative"
          style="max-height: calc(100vh - 57px); overflow-y: auto;"
        >
          <div class="modal-header flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">${title}</h2>
            <button
              onClick=${hideModal}
              class="close-button text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
          ${page === 'TabButton' && modalType === 'connection'
            ? renderConnectionModal()
            : renderEditModal()}
        </div>
      </div>
    </div>
  `;
};

const TabButton = () => {
  const [buttonData, setButtonData] = useState(null);
  const [pintopin, setPintopin] = useState([]);
  const [varbutton, setButton] = useState(null);
  const [saveResult, setSaveResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [language, setLanguage] = useState('ru'); // Default to Russian
  const [debugInfo, setDebugInfo] = useState('');
  const [isUpdating, setIsUpdating] = useState(true);
  const helpContent = {
    ru: html`
      <div class="mytext space-y-6">
        <div>
          <pre class="mb-4">
            Данный API позволяет дистанционно управлять кнопкой, просто выполнив команду в браузере любого устройства в вашей локальной сети.
          </pre>
          <pre class="text-red-500 font-bold">
            Не открывайте доступ из интернета к вашим API - это небезопасно!
          </pre>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Примеры API</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">API</th>
                <th class="border px-4 py-2">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/button?id=30&single_click
                </td>
                <td class="border px-4 py-2">
                  Данная API команда выполнит действие, прописанное в 'SINGLE CLICK' c id = 30. Где "Zerg" это Ваш 'Token'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/button?id=30&double_click
                </td>
                <td class="border px-4 py-2">
                  Данная API команда выполнит действие, прописанное в 'DOUBLE CLICK' c id = 30. Где "Zerg" это Ваш 'Token'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/button?id=30&long_press
                </td>
                <td class="border px-4 py-2">
                  Данная API команда выполнит действие, прописанное в 'LONG PRESS' c id = 30. Где "Zerg" это Ваш 'Token'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div>
          <pre class="mb-4">
            MQTT позволяет дистанционно управлять кнопкой из интернета!
          </pre>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Примеры команд MQTT</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">Команда</th>
                <th class="border px-4 py-2">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">
                  Swarm/button/id=30/single_click
                </td>
                <td class="border px-4 py-2">
                  Данная MQTT команда выполнит команду, прописанную в 'SINGLE CLICK' c id = 30. Где "Swarm" это Ваш 'RX topic'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">
                  Swarm/button/id=30/double_click
                </td>
                <td class="border px-4 py-2">
                  Данная MQTT команда выполнит команду, прописанную в 'DOUBLE CLICK' c id = 30. Где "Swarm" это Ваш 'RX topic'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Swarm/button/id=30/long_press</td>
                <td class="border px-4 py-2">
                  Данная MQTT команда выполнит команду, прописанную в 'LONG PRESS' c id = 30. Где "Swarm" это Ваш 'RX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Отслеживание изменений</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">Топик</th>
                <th class="border px-4 py-2">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">Swarm/button/</td>
                <td class="border px-4 py-2">
                  Данная страница отслеживает изменения кнопок и автоматически отправляет каждое изменение по MQTT на топик: Swarm/button/.
                  Где "Swarm" это Ваш 'RX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `,
    en: html`
      <div class="mytext space-y-6">
        <div>
          <pre class="mb-4">
            This API allows you to remotely control a switch by simply executing a command in the browser of any device on your local network.
          </pre>
          <pre class="text-red-500 font-bold">
            Do not expose your APIs to the internet - it's not secure!
          </pre>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">API Examples</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">API</th>
                <th class="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/button?id=30&single_click
                </td>
                <td class="border px-4 py-2">
                  This API command will execute the action specified in 'SINGLE CLICK' with id = 30. Where "Zerg" is your 'Token'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/button?id=30&double_click
                </td>
                <td class="border px-4 py-2">
                  This API command will execute the action specified in 'DOUBLE CLICK' with id = 30. Where "Zerg" is your 'Token'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/button?id=30&long_press
                </td>
                <td class="border px-4 py-2">
                  This API command will execute the action specified in 'LONG PRESS' with id = 30. Where "Zerg" is your 'Token'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div>
          <pre class="mb-4">
            MQTT allows you to remotely control a switch from the internet!
          </pre>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">MQTT Command Examples</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">Command</th>
                <th class="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">
                  Swarm/button/id=30/single_click
                </td>
                <td class="border px-4 py-2">
                  This MQTT command will execute the command specified in 'SINGLE CLICK' with id = 30. Where "Swarm" is your 'RX topic'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">
                  Swarm/button/id=30/double_click
                </td>
                <td class="border px-4 py-2">
                  This MQTT command will execute the command specified in 'DOUBLE CLICK' with id = 30. Where "Swarm" is your 'RX topic'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Swarm/button/id=30/long_press</td>
                <td class="border px-4 py-2">
                  This MQTT command will execute the command specified in 'LONG PRESS' with id = 30. Where "Swarm" is your 'RX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Change Tracking</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">Topic</th>
                <th class="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">Swarm/button/</td>
                <td class="border px-4 py-2">
                  This page tracks changes in buttons and automatically sends each change via MQTT to the topic: Swarm/button/. Where "Swarm" is your 'RX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `,
  };
  const refresh = () =>
    Promise.all([fetch('/api/button/get').then((r) => r.json())])
      .then(([buttonData, pintopinData]) => {
        setLanguage(buttonData.lang);
        setButton(buttonData.switches);
        setButtonData(buttonData);
        setPintopin(pintopinData);
        setDebugInfo(
          `Pintopin data: ${JSON.stringify(
            pintopinData,
            null,
            2
          )}\n\nButton data: ${JSON.stringify(buttonData.buttons, null, 2)}`
        );
        // console.log('Pintopin data:', pintopinData);
        // console.log('Button data:', buttonData.buttons);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setDebugInfo(`Error fetching data: ${error.message}`);
      });

  const fetchButtonData = () => {
    fetch('/api/button/get')
      .then((r) => r.json())
      .then((data) => {
        setButton(data.buttons);
        setLanguage(data.lang);
        console.log('Updated button data:', data.buttons);
      })
      .catch((error) => {
        console.error('Error fetching button data:', error);
      });
  };

  useEffect(() => {
    // Начальная загрузка данных
    fetchButtonData();

    // Устанавливаем интервал для периодического обновления данных
    let intervalId;
    if (isUpdating) {
      intervalId = setInterval(() => {
        fetchButtonData();
      }, 1000); // Обновляем каждую секунду
    }

    // Очищаем интервал при размонтировании компонента или когда isUpdating становится false
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isUpdating]);

  const getConnectedPins = (buttonId) => {
    const connectedPins = new Map();

    // Добавляем пины из pinact
    const buttonItem = varbutton.find((b) => b.id === buttonId);
    if (buttonItem && buttonItem.pinact) {
      Object.entries(buttonItem.pinact).forEach(([pin, relayId]) => {
        connectedPins.set(pin, { pin, relayId });
      });
    }

    // Добавляем пины из pintopin
    pintopin.forEach((item) => {
      if (item.idin === buttonId) {
        const key = `${item.pins}(${item.idout})`;
        if (!connectedPins.has(key)) {
          connectedPins.set(key, { pin: item.pins, relayId: item.idout });
        }
      }
    });
    return Array.from(connectedPins.values());
  };

  const getLangObject = () => {
    return {
      langbutton: language === 'ru' ? rulangbutton : enlangbutton
    };
  };

  const getTooltipText = (key, index) => {
    const langObject = getLangObject();
    const tooltipText =
      langObject[key] && langObject[key][index] ? langObject[key][index] : '';
    return formatText(tooltipText);
  };

  const formatText = (text, maxLength = 100) => {
    // Увеличено с 50 до 100
    if (!text || typeof text !== 'string') {
      return '';
    }

    const lines = [];
    let currentLine = '';

    // Split by existing line breaks first
    const paragraphs = text.split('\n');

    paragraphs.forEach((paragraph, paragraphIndex) => {
      const words = paragraph.split(' ').filter((word) => word.length > 0);

      words.forEach((word, wordIndex) => {
        // Calculate length with potential space
        const wordWithSpace = currentLine.length === 0 ? word : ' ' + word;
        const potentialLength = currentLine.length + wordWithSpace.length;

        if (potentialLength <= maxLength) {
          // Add word with space if needed
          currentLine += wordWithSpace;
        } else {
          // Push current line if not empty and start new line
          if (currentLine.length > 0) {
            lines.push(currentLine);
          }
          currentLine = word;
        }
      });

      // Push last line of current paragraph
      if (currentLine.length > 0) {
        lines.push(currentLine);
        currentLine = '';
      }

      // Add line break between paragraphs, except for last paragraph
      if (paragraphIndex < paragraphs.length - 1) {
        lines.push('');
      }
    });

    // Push any remaining text
    if (currentLine.length > 0) {
      lines.push(currentLine);
    }

    return lines.join('\n');
  };

  const onsave = (id, pinInfo) => {
    console.log('Удаление соединения:', id, pinInfo);

    const [pinName, idoutStr] = pinInfo.split('(');
    const idout = idoutStr ? parseInt(idoutStr) : null;

    fetch('/api/connection/del', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id, pin: pinName.trim() })
    })
      .then((r) => r.json())
      .then((r) => {
        setSaveResult(r);
        setButton((prevButton) =>
          prevButton.map((b) => {
            if (b.id === id) {
              const updatedPinact = { ...b.pinact };
              delete updatedPinact[pinName.trim()];
              return { ...b, pinact: updatedPinact };
            }
            return b;
          })
        );
        setPintopin((prevPintopin) =>
          prevPintopin.filter(
            (item) =>
              !(
                item.idin === id &&
                item.pins === pinName.trim() &&
                (idout === null || item.idout === idout)
              )
          )
        );
      })
      .then(() => {
        console.log('Соединение удалено успешно');
        refresh();
      })
      .catch((error) => {
        console.error('Ошибка при удалении соединения:', error);
      });
  };

  const openModal = (type, buttonData) => {
    setModalType(type);
    setSelectedButton(buttonData);
    setIsModalOpen(true);
    setIsUpdating(false); // Останавливаем обновления при открытии модального окна
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedButton(null);
    setIsUpdating(true); // Возобновляем обновления при закрытии модального окна
  };

  const handleButtonChange = (updatedButton) => {
    console.log('handleButtonChange:', updatedButton);

    setButton((prevButtons) =>
      prevButtons.map((button) =>
        button.id === updatedButton.id
          ? { ...button, ...updatedButton }
          : button
      )
    );

    // Отправляем обновление на сервер
    fetch('/api/onoff/set', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: updatedButton.id, onoff: updatedButton.onoff })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response from /api/onoff/set:', data);
        // Обновление будет получено при следующем fetchButtonData
      })
      .catch((error) => {
        console.error('Error calling /api/onoff/set:', error);
      });

    closeModal();
  };

  const Th = (props) => html`
    <th class="px-3 py-2 relative group" style="white-space: pre-line;">
      ${props.title}
      <div
        class="absolute z-50 invisible group-hover:visible bg-orange-300 p-2 rounded shadow-lg text-left"
        style="min-width: 200px; max-width: 300px; white-space: pre-wrap; left: 50%; transform: translateX(-50%); top: 100%;"
      >
        ${getTooltipText('langbutton', props.tooltipIndex)}
      </div>
    </th>
  `;

  const ArrayButton = ({ d, index }) => {
    const connectedPins = getConnectedPins(d.id);

    return html`
      <tr class="${index % 2 === 1 ? 'bg-white' : 'bg-green-300'}">
        <td class="px-4 py-2">${d.id}</td>
        <td class="px-4 py-2">${d.pins}</td>
        <td class="px-4 py-2">
          ${['None', 'GPIO_PULLUP', 'GPIO_PULLDOWN'][d.ptype]}
        </td>

        <td
          class="px-4 py-2 max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis"
        >
          ${formatText(d.sclick)}
        </td>
        <td
          class="px-4 py-2 max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis"
        >
          ${formatText(d.dclick)}
        </td>
        <td
          class="px-4 py-2 max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis"
        >
          ${formatText(d.lpress)}
        </td>
        <td class="px-4 py-2">${d.info}</td>
        <td class="px-4 py-2">
          <${MyPolzunok}
            value=${d.onoff}
            onChange=${(value) => handleButtonChange({ ...d, onoff: value })}
          />
        </td>
        <td class="px-4 py-2">
          <button
            onClick=${() => openModal('edit', d)}
            class="text-blue-500 hover:text-blue-700 ml-2"
          >
            Edit
          </button>
        </td>
      </tr>
    `;
  };

  if (!varbutton) return '';

  return html`
    <div class="flex-grow flex flex-col justify-center items-center">
      <div class="font-medium uppercase flex items-center px-4 py-2">
        Button(s) pin(s)
      </div>
      <div class="flex-grow flex flex-col justify-center items-center">
        <div class="justify-center">
          <div class="mb-4">
            <table
              class="table-auto border divide-y divide-gray-200 overflow-x-auto"
            >
              <thead>
                <tr class="bg-gray-400">
                  <${Th} title="ID" tooltipIndex=${1} />
                  <${Th} title="Pin" tooltipIndex=${2} />
                  <${Th} title="Pullup type" tooltipIndex=${3} />
                  <${Th} title="SINGLE CLICK" tooltipIndex=${4} />
                  <${Th} title="DOUBLE CLICK" tooltipIndex=${5} />
                  <${Th} title="LONG PRESS" tooltipIndex=${6} />
                  <${Th} title="INFO" tooltipIndex=${7} />
                  <${Th} title="On/Off" tooltipIndex=${8} />
                  <${Th} title="Action" tooltipIndex=${9} />
                </tr>
              </thead>
              <tbody id="tab1">
                ${varbutton.map(
                  (d, index) => html`
                    <${ArrayButton} d=${d} index=${index} key=${d.id} />
                  `
                )}
              </tbody>
            </table>
          </div>
          <div class="flex justify-end mt-4">
            <button
              onclick=${() => setShowHelp(!showHelp)}
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              ${showHelp ? 'Hide Help' : 'Show Help'}
            </button>
          </div>

          ${showHelp &&
          html`
            <div class="mt-4 p-4 border rounded">${helpContent[language]}</div>
          `}
        </div>
      </div>
      ${isModalOpen &&
      html`
        <${ModalButton}
          modalType=${modalType}
          page="TabButton"
          hideModal=${closeModal}
          title=${modalType === 'connection'
            ? 'Edit Connection'
            : 'Edit Button pin'}
          selectedButton=${selectedButton}
          onButtonChange=${handleButtonChange}
        />
      `}
    </div>
  `;
};

// Добавлен параметр cache: 'no-store' для отключения кэширования
function ModalEncoder({
  modalType,
  page,
  hideModal,
  closeOnOverlayClick = true,
  title,
  selectedEncoder,
  handleEncoderChange,
  connectionOptions,
  SliderComponent = MyPolzunok
}) {
  const [encoderInfo, setEncoderInfo] = useState(selectedEncoder?.info || '');
  const [onoff, setOnOff] = useState(selectedEncoder?.onoff === 1);
  const [encoderB, setEncoderB] = useState({
    pin: selectedEncoder?.encdrbpin || '',
    id: selectedEncoder?.encoderb || ''
  });
  const [selectedConnection, setSelectedConnection] = useState(
    Object.entries(selectedEncoder.pinact || {})[0] || ['', '']
  );
  const [pinOptions, setPinOptions] = useState([]);
  const [encoderBOptions, setEncoderBOptions] = useState([]);
  const [pwmOptions, setPwmOptions] = useState([]);

  const [dvalue, setDvalue] = useState(selectedEncoder.dvalue || 0);
  const [ponr, setPonr] = useState(selectedEncoder.ponr || 0);

  useEffect(() => {
    fetch('/api/select/get', {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        if (!response || !response.data || !Array.isArray(response.data)) {
          console.error('Invalid data format:', response);
          setPinOptions([]);
          setEncoderBOptions([]);
          setPwmOptions([]);
          return;
        }

        const relayPins = response.data.filter((pin) => pin.topin === 2);
        const encoderBPins = response.data.filter((pin) => pin.topin === 9);
        const pwmPins = response.data.filter((pin) => pin.topin === 5);

        setPinOptions(relayPins);
        setEncoderBOptions(encoderBPins);
        setPwmOptions(pwmPins);

        if (selectedEncoder.encoderb) {
          const selectedOption = encoderBPins.find(
            (option) => option.pins === selectedEncoder.encoderb
          );
          setEncoderB({
            pin: selectedEncoder.encoderb,
            id: selectedOption ? selectedOption.id : ''
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching pin config:', error);
        setPinOptions([]);
        setEncoderBOptions([]);
        setPwmOptions([]);
      });
  }, [selectedEncoder]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (form instanceof HTMLFormElement) {
      let jsonData = {};

      if (modalType === 'edit') {
        jsonData = {
          topin: 8,
          id: selectedEncoder.id,
          pins: selectedEncoder.pins,
          dvalue: parseInt(dvalue),
          ponr: parseInt(ponr),
          info: encoderInfo,
          onoff: onoff ? 1 : 0
        };
      } else if (modalType === 'connection') {
        jsonData = {
          id: selectedEncoder.id,
          pins: selectedEncoder.pins,
          encoderb: parseInt(encoderB.id),
          encdrbpin: encoderB.pin,
          pinact: { [selectedConnection[0]]: parseInt(selectedConnection[1]) }
        };
      }
      console.log('We got a encoder JSON:', JSON.stringify(jsonData));
      fetch('/api/encoder/set', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      })
        .then((response) => response.json())
        .then((data) => {
          handleEncoderChange({ ...selectedEncoder, ...jsonData });
          hideModal();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      console.error('Form element not found');
    }
  };

  const handleEncoderInfoChange = (e) => {
    setEncoderInfo(e.target.value);
  };

  const handleOnOffChange = (newValue) => {
    setOnOff(newValue);
  };

  const handleEncoderBChange = (e) => {
    const selectedOption = encoderBOptions.find(
      (option) => option.pins === e.target.value
    );
    setEncoderB({
      pin: e.target.value,
      id: selectedOption ? selectedOption.id : ''
    });
  };

  const handleConnectionChange = (e) => {
    const [pin, id] = e.target.value.split('|');
    setSelectedConnection([pin, id]);
  };

  const handleDvalueChange = (e) => {
    setDvalue(e.target.value);
  };

  const handlePonrChange = (e) => {
    setPonr(e.target.value);
  };

  const modalContent = () => {
    if (page === 'TabEncoder') {
      if (modalType === 'connection') {
        return html`
          <form onsubmit=${handleSubmit}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">ID</td>
                    <td class="p-2">${selectedEncoder.id}</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Pin</td>
                    <td class="p-2">${selectedEncoder.pins}</td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">Encoder B</td>
                    <td class="p-2">
                      <select
                        name="encdrb"
                        value=${encoderB.pin}
                        onchange=${handleEncoderBChange}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select Encoder B</option>
                        ${encoderBOptions.map(
                          (option) => html`
                            <option value=${option.pins}>
                              ${option.pins} (ID: ${option.id})
                            </option>
                          `
                        )}
                      </select>
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">PWM connection</td>
                    <td class="p-2">
                      <select
                        name="pwmconnection"
                        value=${`${selectedConnection[0]}|${selectedConnection[1]}`}
                        onchange=${handleConnectionChange}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select PWM connection</option>
                        ${pwmOptions.map(
                          (option) => html`
                            <option value=${`${option.pins}|${option.id}`}>
                              ${option.pins} (ID: ${option.id})
                            </option>
                          `
                        )}
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer flex justify-end mt-4">
              <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save changes
              </button>
            </div>
          </form>
        `;
      } else if (modalType === 'edit') {
        return html`
          <form onsubmit=${handleSubmit}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">ID</td>
                    <td class="p-2">${selectedEncoder.id}</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Pin</td>
                    <td class="p-2">${selectedEncoder.pins}</td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">Dimmer value (0-100)</td>
                    <td class="p-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value=${dvalue}
                        oninput=${handleDvalueChange}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Power On Restore</td>
                    <td class="p-2">
                      <select
                        value=${ponr}
                        onchange=${handlePonrChange}
                        class="border rounded p-2 w-full"
                      >
                        <option value="0">OFF</option>
                        <option value="1">ON</option>
                      </select>
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">INFO</td>
                    <td class="p-2">
                      <input
                        type="text"
                        name="info"
                        value=${encoderInfo}
                        oninput=${handleEncoderInfoChange}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${SliderComponent}
                        value=${onoff}
                        onChange=${handleOnOffChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer flex justify-end mt-4">
              <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save changes
              </button>
            </div>
          </form>
        `;
      }
    }
  };

  return html`
    <div
      class="fixed inset-0 z-50 bg-black bg-opacity-50"
      style="margin-top: 7px;"
    >
      <div class="flex items-center justify-center min-h-full p-4">
        <div
          class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative"
          style="max-height: calc(100vh - 57px); overflow-y: auto;"
        >
          <div class="modal-header flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">${title}</h2>
            <button
              onClick=${hideModal}
              class="close-button text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
          ${modalContent()}
        </div>
      </div>
    </div>
  `;
}

//FIXME: Ползунок не отправляет POST после изменения положения!
function TabEncoder({}) {
  const [varencoder, setEncoder] = useState(null);
  const [saveResult, setSaveResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedEncoder, setSelectedEncoder] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [language, setLanguage] = useState('ru');
  const [pintopin, setPintopin] = useState([]);

  const refresh = () =>
    Promise.all([
      fetch('/api/encoder/get').then((r) => r.json()),
      fetch('/api/pintopin/get').then((r) => r.json())
    ])
      .then(([encoderData, pintopinData]) => {
        setLanguage(encoderData.lang);
        setEncoder(encoderData.encoders);
        setPintopin(pintopinData);
        console.log('Encoder data:', encoderData.encoders);
        console.log('Pintopin data:', pintopinData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  const fetchEncoderData = () => {
    fetch('/api/encoder/get')
      .then((r) => r.json())
      .then((data) => {
        setEncoder(data.encoders);
        setLanguage(data.lang);
        console.log('Updated encoder data:', data.encoders);
      })
      .catch((error) => {
        console.error('Error fetching encoder data:', error);
      });
  };

  const fetchPintopinData = () => {
    fetch('/api/pintopin/get')
      .then((r) => r.json())
      .then((data) => {
        setPintopin(data);
        console.log('Updated pintopin data:', data);
      })
      .catch((error) => {
        console.error('Error fetching pintopin data:', error);
      });
  };

  useEffect(() => {
    fetchEncoderData();
    fetchPintopinData();

    const intervalId = setInterval(() => {
      fetchEncoderData();
      fetchPintopinData();
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  const handleEncoderChange = (updatedEncoder) => {
    setEncoder((prevEncoders) =>
      prevEncoders.map((enc) =>
        enc.id === updatedEncoder.id ? updatedEncoder : enc
      )
    );
  };

  const getConnectedPins = (encoderId) => {
    const encoderItem = varencoder.find((enc) => enc.id === encoderId);
    const connectedPins = [];

    if (encoderItem && encoderItem.pinact) {
      Object.entries(encoderItem.pinact).forEach(([pin, idout]) => {
        connectedPins.push({ pin, idout });
      });
    }

    return connectedPins;
  };

  const getLangObject = () => ({
    langbutton: language === 'ru' ? ruencoder : enencoder
  });

  const getTooltipText = (key, index) => {
    const langObject = getLangObject();
    const tooltipText =
      langObject[key] && langObject[key][index] ? langObject[key][index] : '';
    return formatText(tooltipText);
  };

  const formatText = (text, maxLength = 50) => {
    if (!text || typeof text !== 'string') {
      return '';
    }

    const words = text.split(' ');
    let lines = [];
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      if (currentLine.length + words[i].length + 1 <= maxLength) {
        currentLine += `${currentLine ? ' ' : ''}${words[i]}`;
      } else {
        if (currentLine) {
          lines.push(currentLine.trim());
        }
        currentLine = words[i];
      }
    }

    if (currentLine) {
      lines.push(currentLine.trim());
    }

    return lines.join('\n');
  };

  const onsave = (id, pinInfo) => {
    console.log('Deleting connection:', id, pinInfo);

    const pinName = pinInfo.split('(')[0].trim();

    fetch('/api/connection/del', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id, pin: pinName })
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(
              `HTTP error! status: ${response.status}, message: ${text}`
            );
          });
        }
        return response.json();
      })
      .then((r) => {
        setSaveResult(r);
        setEncoder((prevEncoder) =>
          prevEncoder.map((enc) => {
            if (enc.id === id) {
              const updatedPinact = { ...enc.pinact };
              delete updatedPinact[pinName];
              return { ...enc, pinact: updatedPinact };
            }
            return enc;
          })
        );
        setPintopin((prevPintopin) =>
          prevPintopin.filter(
            (item) => !(item.idin === id && item.pins === pinName)
          )
        );
      })
      .then(() => {
        console.log('Connection deleted successfully');
        refresh();
      })
      .catch((error) => {
        console.error('Error deleting connection:', error);
      });
  };

  const openModal = (type, encoderData) => {
    console.log('Opening modal:', type, encoderData);
    setModalType(type);
    setSelectedEncoder(encoderData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedEncoder(null);
    //refresh(); // Обновляем данные после закрытия модального окна
  };
  const helpContent = {
    ru: html`
      <div class="mytext space-y-6">
        <div>
          <pre class="mb-4">
            Данный API позволяет дистанционно управлять энкодером, просто выполнив команду в браузере любого устройства в вашей локальной сети.
          </pre
          >
          <pre class="text-red-500 font-bold">
            Не открывайте доступ из интернета к вашим API - это небезопасно!
          </pre
          >
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Примеры API</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">API</th>
                <th class="border px-4 py-2">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/pwm?id=4&dvalue=25
                </td>
                <td class="border px-4 py-2">
                  Данная API команда установит значение димера в 25 единиц с id
                  = 4. Где "Zerg" это Ваш 'Token'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <pre class="mb-4">
            MQTT позволяет дистанционно управлять энкодером из интернета!
          </pre
          >
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Примеры команд MQTT</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">API</th>
                <th class="border px-4 py-2">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">Swarm/pwm/id=4/dvalue=25</td>
                <td class="border px-4 py-2">
                  Данная MQTT команда установит значение диммера в 25 едениц с
                  id = 4. Где "Swarm" это Ваш 'RX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `,
    en: html`
      <div class="mytext space-y-6">
        <div>
          <pre class="mb-4">
            This API allows you to remotely control a switch by simply executing a command in the browser of any device on your local network.
          </pre
          >
          <pre class="text-red-500 font-bold">
            Do not expose your APIs to the internet - it's not secure!
          </pre
          >
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">API Examples</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">API</th>
                <th class="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/pwm?id=7&dvalue=25
                </td>
                <td class="border px-4 py-2">
                  This command will set the dimmer to 25 for the device with ID
                  7. Where "Zerg" is your 'Token*.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <pre class="mb-4">
            MQTT allows you to remotely control a switch from the internet!
          </pre
          >
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">MQTT Command Examples</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">Command</th>
                <th class="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">Swarm/pwm/id=7/dvalue=25</td>
                <td class="border px-4 py-2">
                  This command will set the dimmer to 25 for the device with ID
                  7. Where "Swarm" is your 'RX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `
  };
  const Th = ({ title, tooltipIndex }) => html`
    <th class="px-4 py-2 relative group">
      ${title}
      <div
        class="absolute z-50 invisible group-hover:visible bg-orange-300 p-2 rounded shadow-lg whitespace-normal break-words text-left transform -translate-x-1/2 left-1/2 top-full mt-1"
        style="min-width: 200px; max-width: 400px;"
      >
        ${getTooltipText('langbutton', tooltipIndex)}
      </div>
    </th>
  `;

  const ArrayEncoder = ({ d, index }) => {
    const connectedPins = getConnectedPins(d.id);

    return html`
      <tr class="${index % 2 === 1 ? 'bg-white' : 'bg-green-300'}">
        <td class="px-4 py-2">${d.pins}(${d.id})</td>
        <td class="px-4 py-2">
          ${d.encdrbpin ? `${d.encdrbpin}(${d.encoderb})` : 'Not set'}
        </td>
        <td class="px-4 py-2">
          ${connectedPins.length > 0
            ? connectedPins.map(
                ({ pin, idout }) => html`
                  <span class="mr-2">
                    ${pin}(${idout})
                    <button
                      onClick=${(e) => {
                        e.preventDefault();
                        onsave(d.id, `${pin}(${idout})`);
                      }}
                      class="text-red-500 hover:text-red-700"
                      style="margin-left: 2px; font-weight: bold;"
                    >
                      [<strong>x</strong>]
                    </button>
                  </span>
                `
              )
            : 'Not set'}
        </td>
        <td class="px-4 py-2">${d.dvalue}</td>
        <td class="px-4 py-2">${d.ponr === 1 ? 'ON' : 'OFF'}</td>
        <td class="px-4 py-2">${d.info}</td>
        <td class="px-4 py-2">
          <${MyPolzunok}
            value=${d.onoff}
            onChange=${(value) => handleEncoderChange({ ...d, onoff: value })}
          />
        </td>
        <td class="px-4 py-2">
          <button
            onClick=${() => openModal('connection', d)}
            class="text-blue-500 hover:text-blue-700 mr-2"
          >
            Connection
          </button>
          |
          <button
            onClick=${() => openModal('edit', d)}
            class="text-blue-500 hover:text-blue-700 ml-2"
          >
            Edit Encdr.
          </button>
        </td>
      </tr>
    `;
  };

  if (!varencoder) return html`<div>Loading...</div>`;

  return html`
    <div class="flex-grow flex flex-col justify-center items-center">
      <div class="font-medium uppercase flex items-center px-4 py-2">
        Encoder(s) pin(s)
      </div>
      <div class="flex-grow flex flex-col justify-center items-center">
        <div class="justify-center">
          <div class="mb-4">
            <table class="table-auto border divide-y divide-gray-200">
              <thead>
                <tr class="bg-gray-400">
                  <${Th} title="Encoder A (ID)" tooltipIndex=${3} />
                  <${Th} title="Encoder B (ID)" tooltipIndex=${4} />
                  <${Th} title="PWM connection" tooltipIndex=${5} />
                  <${Th} title="Dimmer value (0-100)" tooltipIndex=${6} />
                  <${Th} title="Power On Restore" tooltipIndex=${7} />
                  <${Th} title="INFO" tooltipIndex=${8} />
                  <${Th} title="On/Off" tooltipIndex=${9} />
                  <${Th} title="Action" tooltipIndex=${10} />
                </tr>
              </thead>
              <tbody id="tab1">
                ${varencoder.map(
                  (d, index) =>
                    html`<${ArrayEncoder} d=${d} index=${index} key=${d.id} />`
                )}
              </tbody>
            </table>
          </div>

          <div class="flex justify-end mt-4">
            <button
              onclick=${() => setShowHelp(!showHelp)}
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              ${showHelp ? 'Hide Help' : 'Show Help'}
            </button>
          </div>

          ${showHelp &&
          html`
            <div class="mt-4 p-4 border rounded">${helpContent[language]}</div>
          `}
        </div>
      </div>
      ${isModalOpen &&
      html`
        <${ModalEncoder}
          modalType=${modalType}
          page="TabEncoder"
          hideModal=${closeModal}
          title=${modalType === 'connection'
            ? 'Edit Connection'
            : 'Edit Encoder'}
          selectedEncoder=${selectedEncoder}
          handleEncoderChange=${handleEncoderChange}
        />
      `}
    </div>
  `;
}

//FIXME:  Переменная onoff не передается в модальное окно! А вот из мольдального окна передается в таблицу!
function ModalCron({
  modalType,
  page,
  hideModal,
  closeOnOverlayClick = true,
  title,
  selectedCron,
  handleCronChange,
  connectionOptions,
  modalClass,
  SliderComponent = MyPolzunok
}) {
  // Инициализация переменных состояния
  const [cronInfo, setCronInfo] = useState(selectedCron?.info || '');
  const [onoff, setOnOff] = useState(selectedCron?.onoff === 1);
  const [activValue, setActivValue] = useState(selectedCron?.activ || '');
  const [cronExpression, setCronExpression] = useState(
    selectedCron?.cron || ''
  );
  const [selectedConnection, setSelectedConnection] = useState(
    selectedCron.setrpins || ''
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const jsonData = Object.fromEntries(formData);

    // Добавляем дополнительные поля, которые не входят в форму
    jsonData.id = selectedCron.id;
    jsonData.pins = selectedCron.pins;

    if (modalType === 'edit') {
      jsonData.onoff = onoff ? 1 : 0;
      jsonData.info = cronInfo;
      jsonData.cron = cronExpression;
      jsonData.activ = activValue;
    } else if (modalType === 'connection') {
      jsonData.setrpins = selectedConnection;
    }

    // Перед отправкой проверим...
    console.log('Data being sent to server:');
    console.log(jsonData);
    console.log('Stringified data:');
    console.log(JSON.stringify(jsonData));

    fetch('/api/cron/set', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        // Обновляем состояние переключателя
        handleCronChange({
          ...selectedCron,
          ...jsonData
        });
        // Закрываем модальное окно
        hideModal();
        // Перенаправляем пользователя
        window.location.href = '/#/cron';
      })
      .catch((error) => {
        console.error('Error:', error);
        // Можно добавить обработку ошибок, например, показать сообщение пользователю
      });
  };

  // Добавляем useEffect для обновления состояния при изменении selectedSwitch
  useEffect(() => {
    setCronInfo(selectedCron?.info || '');
    setSelectedConnection(selectedCron?.setrpins || '');
    setOnOff(selectedCron?.onoff === 1);
  }, [selectedCron]);

  // Обработчики изменений
  const handleCronExpressionChange = (e) => {
    setCronExpression(e.target.value);
  };

  const handleCronInfoChange = (e) => {
    setCronInfo(e.target.value);
  };

  const handleOnOffChange = (newValue) => {
    setOnOff(newValue);
  };

  const handleActivChange = (e) => {
    setActivValue(e.target.value);
  };

  const modalContent = () => {
    if (page === 'TabCron') {
      if (modalType === 'edit') {
        return html`
          <form onsubmit=${handleSubmit}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  ${[
                    { label: 'ID', value: selectedCron.id },
                    {
                      label: 'Cron',
                      value: html`
                        <input
                          type="text"
                          value=${cronExpression}
                          onInput=${handleCronExpressionChange}
                          class="border rounded p-2 w-full"
                        />
                      `
                    },
                    {
                      label: 'Script',
                      value: html`
                        <input
                          type="text"
                          value=${activValue}
                          onInput=${handleActivChange}
                          class="border rounded p-2 w-full"
                        />
                      `
                    },
                    {
                      label: 'INFO',
                      value: html`
                        <input
                          type="text"
                          value=${cronInfo}
                          onInput=${handleCronInfoChange}
                          class="border rounded p-2 w-full"
                        />
                      `
                    },
                    {
                      label: 'On/Off',
                      value: html`<${SliderComponent}
                        value=${onoff}
                        onChange=${handleOnOffChange}
                      />`
                    }
                  ].map(
                    (row, index) => html`
                      <tr
                        class="${index % 2 === 1 ? 'bg-white' : 'bg-gray-200'}"
                      >
                        <td class="p-2 font-bold">${row.label}</td>
                        <td class="p-2">${row.value}</td>
                      </tr>
                    `
                  )}
                </tbody>
              </table>
            </div>
            <div class="modal-footer flex justify-end mt-4">
              <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save changes
              </button>
            </div>
          </form>
        `;
      }
    }
  };

  return html`
    <div class=${`modal ${modalClass || ''}`}>
      <div class="modal-content">
        <div
          class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onclick=${(e) =>
            closeOnOverlayClick && e.target === e.currentTarget && hideModal()}
        >
          <div
            class="modal-content bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg relative"
            style="margin-top: 0px;"
          >
            <div
              class="modal-header flex justify-between items-center border-b pb-4 mb-4"
            >
              <h5 class="text-xl font-bold">
                ${modalType === 'edit' ? 'Edit Timer' : 'Edit Connection'}
              </h5>
              <button
                class="close-button text-gray-500 hover:text-gray-700"
                onclick=${hideModal}
              >
                Close
              </button>
            </div>
            ${modalContent()}
          </div>
        </div>
      </div>
    </div>
  `;
}
/****************************************************************************/
const HelpInfo = ({ language }) => {
  const [helpContent, setHelpContent] = useState('');

  useEffect(() => {
    const fetchHelpContent = async () => {
      const fileName = language === 'ru' ? 'help1rus.html' : 'help1eng.html';
      try {
        const response = await fetch(fileName);
        const content = await response.text();
        setHelpContent(content);
      } catch (error) {
        console.error('Error fetching help content:', error);
        setHelpContent('Error loading help content');
      }
    };

    fetchHelpContent();
  }, [language]);

  return html`
    <div
      class="mytext mt-8"
      dangerouslySetInnerHTML=${{ __html: helpContent }}
    ></div>
  `;
};

function TabCron({}) {
  const [varcron, setCron] = useState(null);
  const [saveResult, setSaveResult] = useState(null);
  const formRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedCron, setSelectedCron] = useState(null);
  const [language, setLanguage] = useState('ru');
  const [showHelp, setShowHelp] = useState(false);
  const [visibleCrons, setVisibleCrons] = useState(1);
  const [numline, setNumline] = useState(0);

  const refresh = () =>
    fetch('/api/cron/get')
      .then((r) => r.json())
      .then((r) => {
        console.log('API response:', r);
        if (r && Array.isArray(r.timers)) {
          setCron(r.timers);
          setLanguage(r.lang || 'ru');
          if (typeof r.numline === 'number') {
            setNumline(r.numline);
            setVisibleCrons(r.numline);
          }
        } else {
          console.error('Unexpected API response structure:', r);
          setCron([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching cron data:', error);
        setCron([]);
      });

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    // Send numline value to stm32 whenever it changes
    sendNumlineToStm32(numline);
  }, [numline]);

  const sendNumlineToStm32 = (value) => {
    fetch('/api/numline/set', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ numline: value })
    })
      .then((response) => response.json())
      .then((data) => console.log('Numline sent to stm32:', data))
      .catch((error) =>
        console.error('Error sending Crone line to stm32:', error)
      );
  };

  const addCron = () => {
    if (visibleCrons < varcron.length) {
      const newVisibleCrons = visibleCrons + 1;
      setVisibleCrons(newVisibleCrons);
      setNumline(newVisibleCrons);
      sendNumlineToStm32(newVisibleCrons);
    }
  };

  const deleteCron = () => {
    if (visibleCrons > 0) {
      const newVisibleCrons = visibleCrons - 1;
      setVisibleCrons(newVisibleCrons);
      setNumline(newVisibleCrons);
      sendNumlineToStm32(newVisibleCrons);
    }
  };

  const helpContent = {
    ru: html`
      <div class="mytext">
        <div>
          <pre>
            Шаблон Cron состоит из семи полей, разделенных пробелами.
            1 2 3 4 5 6 7
            ┬ ┬ ┬ ┬ ┬ ┬ ┬ команда для выполнения
            │ │ │ │ │ │ └── год (1970-3000)
            │ │ │ │ │ └──── день недели (0 - 7)
            │ │ │ │ └────── месяц (1 - 12)
            │ │ │ └──────── день месяца (1 - 31)
            │ │ └────────── час (0 - 23)
            │ └──────────── минута (0 - 59)
            └────────────── секунда (0-59)
          </pre>
        </div>
        <h2>Примеры CRON</h2>
        <table>
          <thead>
            <tr>
              <th>CRON</th>
              <th>Описание</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>* * * * * * *</td>
              <td>CRON выполняется каждую секунду.</td>
            </tr>
            <tr>
              <td>0 * * * * * *</td>
              <td>CRON выполняется в начале каждой минуты.</td>
            </tr>
            <tr>
              <td>* * * * * 2 *</td>
              <td>CRON выполняется каждый вторник в течение всего дня.</td>
            </tr>
            <tr>
              <td>0 0 13-15 * * 2-4 *</td>
              <td>
                CRON выполняется каждую минуту между 13 и 15 часами среды,
                четверга и пятницы.
              </td>
            </tr>
            <tr>
              <td>*/5 * * * * * *</td>
              <td>CRON выполняется каждые 5 секунд, начиная с 0.</td>
            </tr>
            <tr>
              <td>*/5 */5 * * * * *</td>
              <td>
                CRON выполняется каждые 5 секунд каждые 5 минут, с 00:00 до
                55:55.
              </td>
            </tr>
            <tr>
              <td>0 0 0 * * 5 *</td>
              <td>CRON выполняется каждую пятницу в полночь.</td>
            </tr>
            <tr>
              <td>0 0 */2 * * * *</td>
              <td>CRON выполняется каждые 2 часа в начале часа.</td>
            </tr>
            <tr>
              <td>* * */2 * * * *</td>
              <td>
                CRON выполняется каждую секунду каждые 2 часа (0, 2, 4, ...,
                22).
              </td>
            </tr>
            <tr>
              <td>0 0 0 * * 1-5 *</td>
              <td>
                CRON выполняется в полночь каждую неделю с понедельника по
                пятницу.
              </td>
            </tr>
            <tr>
              <td>15 23 */6 * * * *</td>
              <td>
                CRON выполняется каждые 6 часов в (мин:сек) 23:15 (00:23:15,
                06:23:15, 12:23:15 и т.д.).
              </td>
            </tr>
            <tr>
              <td>0 0 0 1 * * *</td>
              <td>CRON выполняется в начале каждого месяца в 00:00:00.</td>
            </tr>
            <tr>
              <td>0 0 0 1 */3 * *</td>
              <td>CRON выполняется в начале каждого квартала в 00:00:00.</td>
            </tr>
            <tr>
              <td>10 15 20 * 8 6 *</td>
              <td>CRON выполняется в 20:15:20 каждую субботу в августе.</td>
            </tr>
            <tr>
              <td>10 15 20 8 * 6 *</td>
              <td>
                CRON выполняется в 20:15:20 каждую субботу, которая также
                является 8-м днем месяца (день недели и дата должны совпадать).
              </td>
            </tr>
            <tr>
              <td>30-45 * * * * * *</td>
              <td>CRON выполняется каждую секунду между 30 и 45.</td>
            </tr>
            <tr>
              <td>30-45/3 * * * * * *</td>
              <td>
                CRON выполняется каждые 3 секунды в каждой минуты, когда секунды
                находятся между 30 и 45.
              </td>
            </tr>
            <tr>
              <td>0 23/1 * * * * *</td>
              <td>
                CRON выполняется в начале каждой минуты, когда минуты находятся
                между 23 и 59.
              </td>
            </tr>
            <tr>
              <td>50-10 * * * * * *</td>
              <td>
                CRON выполняется каждую секунду, когда секунды находятся в
                диапазоне от 50 до 59 и от 00 до 10 (режим переполнения).
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <pre>
            0 ── Откл
            1 ── Вкл
            2 ── Смена состояния
            p ── Пауза
            , ── Разделитель
          </pre>
        </div>
        <h2>Примеры ACTION</h2>
        <table>
          <thead>
            <tr>
              <th>ACTION</th>
              <th>Описание</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>18:1;p5;18:0</td>
              <td>
                18-й пин включится (ON) в указанное время (CRON), будет гореть в
                течении 5 сек. и после окончании паузы (p - PAUSE) отключится
                (OFF).
              </td>
            </tr>
            <tr>
              <td>12:2;p5</td>
              <td>
                12-й пин будет менять своё состояние (TOGGLE) через 5 сек.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h2 class="text-xl font-bold mb-2">Отслеживание изменений</h2>
        <table class="w-full">
          <thead>
            <tr>
              <th class="border px-4 py-2">Топик</th>
              <th class="border px-4 py-2">Описание</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2">Swarm/timer/</td>
              <td class="border px-4 py-2">
                Данная страница отслеживает изменения кнопок и автоматически отправляет каждое изменение по MQTT на топик: Swarm/timer/.
                Где "Swarm" это Ваш 'RX topic'.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    en: html`
      <div class="mytext">
        <div>
          <pre>
            The Cron pattern consists of seven space-separated fields.
            1 2 3 4 5 6 7
            ┬ ┬ ┬ ┬ ┬ ┬ ┬ command to execute
            │ │ │ │ │ │ └── year (1970-3000)
            │ │ │ │ │ └──── day of week (0 - 7)
            │ │ │ │ └────── month (1 - 12)
            │ │ │ └──────── day of month (1 - 31)
            │ │ └────────── hour (0 - 23)
            │ └──────────── minute (0 - 59)
            └────────────── second (0-59)
          </pre>
        </div>
        <h2>Examples of CRON</h2>
        <table>
          <thead>
            <tr>
              <th>CRON</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>* * * * * * *</td>
              <td>CRON is valid all the time, will fire every second.</td>
            </tr>
            <tr>
              <td>0 * * * * * *</td>
              <td>CRON is valid at the beginning of each minute.</td>
            </tr>
            <tr>
              <td>* * * * * 2 *</td>
              <td>CRON is valid every Tuesday all day long.</td>
            </tr>
            <tr>
              <td>0 0 13-15 * * 2-4 *</td>
              <td>
                CRON is valid every beginning of the minute between hours 13-15
                afternoon, between Tuesday and Thursday.
              </td>
            </tr>
            <tr>
              <td>*/5 * * * * * *</td>
              <td>CRON is valid every 5 seconds starting at 0.</td>
            </tr>
            <tr>
              <td>*/5 */5 * * * *</td>
              <td>
                CRON is valid every 5 seconds each 5 minutes, from 00:00 to
                55:55.
              </td>
            </tr>
            <tr>
              <td>0 0 0 * * 5 *</td>
              <td>Every Friday at midnight.</td>
            </tr>
            <tr>
              <td>0 0 */2 * * *</td>
              <td>Every 2 hours at beginning of the hour.</td>
            </tr>
            <tr>
              <td>* * */2 * * *</td>
              <td>
                Every second of every minute every 2 hours (0, 2, 4, .., 22).
              </td>
            </tr>
            <tr>
              <td>0 0 0 * * 1-5 *</td>
              <td>At midnight, 00:00 every week between Monday and Friday.</td>
            </tr>
            <tr>
              <td>15 23 */6 * * *</td>
              <td>
                Every 6 hours at (min:sec) 23:15 (00:23:15, 06:23:15, 12:23:15,
                …).
              </td>
            </tr>
            <tr>
              <td>0 0 0 1 * * *</td>
              <td>At 00:00:00 beginning of the month.</td>
            </tr>
            <tr>
              <td>0 0 0 1 */3 *</td>
              <td>Every beginning of the quarter at 00:00:00.</td>
            </tr>
            <tr>
              <td>10 15 20 * 8 6 *</td>
              <td>At 20:15:20 every Saturday in August.</td>
            </tr>
            <tr>
              <td>10 15 20 8 * 6 *</td>
              <td>
                At 20:15:20 every Saturday that is also 8th day in month (both
                must match, day Saturday and date 8th).
              </td>
            </tr>
            <tr>
              <td>30-45 * * * * *</td>
              <td>Every second between 30 and 45.</td>
            </tr>
            <tr>
              <td>30-45/3 * * * * *</td>
              <td>
                Every 3rd second in every minute, when seconds are between 30
                and 45.
              </td>
            </tr>
            <tr>
              <td>0 23/1 * * * *</td>
              <td>
                Every beginning of a minute when minute is between 23 and 59.
              </td>
            </tr>
            <tr>
              <td>50-10 * * * * *</td>
              <td>
                Every second when seconds are from 50-59 and 00-10 (overflow
                mode).
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <pre>
            0 ── OFF
            1 ── ON
            2 ── TOGGLE
            p ── PAUSE
            , ── Separator
          </pre>
        </div>
        <h2>Examples of ACTION</h2>
        <table>
          <thead>
            <tr>
              <th>ACTION</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>18:1;p5;18:0</td>
              <td>
                Pin 18 will turn on (ON) at the specified time (CRON), stay on
                for 5 seconds and turn off (OFF) at the end of the pause (p -
                PAUSE).
              </td>
            </tr>
            <tr>
              <td>12:2;p5</td>
              <td>
                Pin 12 will change its state (TOGGLE) after 5 seconds (p -
                PAUSE).
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h2 class="text-xl font-bold mb-2">Change Tracking</h2>
        <table class="w-full">
          <thead>
            <tr>
              <th class="border px-4 py-2">Topic</th>
              <th class="border px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2">Swarm/timer/</td>
              <td class="border px-4 py-2">
                This page tracks changes in buttons and automatically sends each change via MQTT to the topic: Swarm/timer/.
                Where "Swarm" is your 'RX topic'.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
  };

  if (varcron === null) {
    return html`<div>Loading...</div>`;
  }

  const getLangObject = () => {
    return {
      langtimers: language === 'ru' ? rulangtimers : enlangtimers
    };
  };

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

  const openModal = (type, cronData) => {
    setModalType(type);
    setSelectedCron(cronData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedCron(null);
  };

  const handleCronChange = (updatedCron) => {
    console.log('handleCronChange:', updatedCron);
    
    // Обновляем локальное состояние
    setCron(varcron.map((b) => (b.id === updatedCron.id ? updatedCron : b)));
    
    // Отправляем изменения на сервер
    fetch('/api/cron/set', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCron),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Cron job updated successfully:', data);
    })
    .catch(error => {
      console.error('Error updating cron job:', error);
    });
  };

  const getCronConnectionOptions = () => {
    if (Array.isArray(selectedCron)) {
      return selectedCron.flatMap((b) => {
        if (b.pinact) {
          return Object.keys(b.pinact).map((key) => ({
            value: key,
            label: key
          }));
        }
        return [];
      });
    } else if (selectedCron && selectedCron.pinact) {
      return Object.keys(selectedCron.pinact).map((key) => ({
        value: key,
        label: key
      }));
    }
    return [];
  };

  const Th = (props) => html`
    <th class="px-3 py-2 relative group">
      ${props.title}
      <div
        class="absolute z-50 invisible group-hover:visible bg-orange-300 p-2 rounded shadow-lg whitespace-normal break-words text-left"
        style="width: fit-content; max-width: 80vw; left: 50%; transform: translateX(-50%); top: 100%;"
      >
        ${getTooltipText('langtimers', props.tooltipIndex)}
      </div>
    </th>
  `;
  const ArrayCron = ({ d, index }) => html`
    <tr class="${index % 2 === 1 ? 'bg-white' : 'bg-green-300'}">
      <td class="px-4 py-2">${d.id}</td>
      <td class="px-4 py-2">${d.cron}</td>
      <td class="px-4 py-2">${d.activ}</td>
      <td class="px-4 py-2">${d.info}</td>
      <td class="px-4 py-2">
        <${MyPolzunok}
          value=${d.onoff}
          onChange=${(value) => handleCronChange({ ...d, onoff: value })}
        />
      </td>
      <td class="px-4 py-2">
        <button
          onclick=${() => openModal('edit', d)}
          class="text-blue-500 hover:text-blue-700 ml-2"
        >
          Edit
        </button>
      </td>
    </tr>
  `;

  return html`
    <div class="flex-grow flex flex-col justify-center items-center">
      <div class="flex-grow flex flex-col justify-center items-center">
        <div class="font-medium uppercase flex items-center px-4 py-2">
          Timer(s)
        </div>
        <div class="mb-4">
          ${varcron && varcron.length > 0
            ? html`
                <table
                  class="table-auto border divide-y divide-gray-200 overflow-x-auto"
                >
                  <thead>
                    <tr class="bg-gray-400">
                      <${Th} title="No" tooltipIndex=${1} />
                      <${Th} title="Cron" tooltipIndex=${2} />
                      <${Th} title="Script" tooltipIndex=${3} />
                      <${Th} title="Info" tooltipIndex=${4} />
                      <${Th} title="On/Off" tooltipIndex=${5} />
                      <${Th} title="Action" tooltipIndex=${6} />
                    </tr>
                  </thead>
                  <tbody>
                    ${varcron.slice(0, visibleCrons).map(
                      (cron, index) => html`
                        <tr
                          class=${index % 2 === 0 ? 'bg-green-300' : 'bg-white'}
                        >
                          <td class="border px-4 py-2">${cron.id}</td>
                          <td class="border px-4 py-2">${cron.cron}</td>
                          <td class="border px-4 py-2">${cron.activ}</td>
                          <td class="border px-4 py-2">${cron.info}</td>
                          <td class="border px-4 py-2">
                            <${MyPolzunok}
                              value=${cron.onoff}
                              onChange=${(value) =>
                                handleCronChange({ ...cron, onoff: value })}
                            />
                          </td>
                          <td class="border px-4 py-2">
                            <button
                              onclick=${() => openModal('edit', cron)}
                              class="text-blue-500 hover:text-blue-700 ml-2"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      `
                    )}
                  </tbody>
                </table>
              `
            : html`<div>No cron jobs available</div>`}
        </div>
        <div class="w-full flex justify-between items-center mb-4">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onclick=${() => setShowHelp(!showHelp)}
          >
            ${showHelp ? 'Hide Help' : 'Show Help'}
          </button>
          <div>
            ${varcron.length - visibleCrons > 0
              ? `Still available: ${varcron.length - visibleCrons} cron jobs`
              : 'No available: cron jobs!'}
          </div>
          <div>
            ${visibleCrons < varcron.length
              ? html`
                  <button
                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onclick=${addCron}
                  >
                    +
                  </button>
                `
              : null}
            ${visibleCrons > 0
              ? html`
                  <button
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onclick=${deleteCron}
                  >
                    -
                  </button>
                `
              : null}
          </div>
        </div>
      </div>
      ${showHelp && html`<div class="mt-4">${helpContent[language]}</div>`}
      ${isModalOpen &&
      html`
        <${ModalCron}
          modalType=${modalType}
          page="TabCron"
          hideModal=${closeModal}
          title=${modalType === 'edit' ? 'Edit Timer(s)' : 'Edit Connection'}
          selectedCron=${selectedCron}
          handleCronChange=${handleCronChange}
          connectionOptions=${getCronConnectionOptions()}
          modalClass="mt-24"
        />
      `}
    </div>
  `;
} //FIXME:
/****************************************************************************/
function ModalOneWire({
  oneWire,
  onClose,
  onUpdate,
  refresh,
  closeOnOverlayClick = true
}) {
  console.log('oneWire object:', oneWire);

  const [formData, setFormData] = useState({
    typsensor: oneWire.typsensor,
    numdevices: oneWire.numdevices
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [onoff, setOnOff] = useState(oneWire.onoff || 0);

  const handleOverlayClick = (e) => {
    // Проверяем, что клик был именно по оверлею (не по контенту)
    if (closeOnOverlayClick && e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: parseInt(value, 10) };

    if (name === 'typsensor') {
      if (value === '0') {
        newFormData.numdevices = 0;
      } else if (value === '2') {
        newFormData.numdevices = 1;
      }
    }

    setFormData(newFormData);
  };

  const handleOnOffChange = (value) => {
    setOnOff(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataToSend = {
      id: oneWire.id,
      pin: oneWire.pin,
      typsensor: formData.typsensor,
      numdevices: formData.numdevices,
      onoff: onoff
    };

    console.log('Sending data:', dataToSend);

    try {
      const response = await fetch('api/onewire/set', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedOneWire = { ...oneWire, ...formData, onoff };
      onUpdate(updatedOneWire);
      onClose();
    } catch (error) {
      console.error('Error updating OneWire:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return html`
    <div
      class="fixed inset-0 z-50 bg-black bg-opacity-50"
      style="margin-top: 7px;"
      onclick=${handleOverlayClick}
    >
      <div class="flex items-center justify-center min-h-full p-4">
        <div
          class="modal-content bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative"
          style="max-height: calc(100vh - 57px); overflow-y: auto;"
        >
          <div
            class="modal-header flex justify-between items-center border-b pb-4 mb-4"
          >
            <h5 class="text-xl font-bold">Edit OneWire pin</h5>
            <button
              class="close-button text-gray-500 hover:text-gray-700"
              onclick=${onClose}
              disabled=${isSubmitting}
            >
              Close
            </button>
          </div>
          <form onsubmit=${handleSubmit}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">ID</td>
                    <td class="p-2">
                      <input
                        type="number"
                        value=${oneWire.id}
                        class="border rounded p-2 w-full bg-gray-100"
                        readonly
                        disabled
                      />
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">Pin</td>
                    <td class="p-2">
                      <input
                        type="text"
                        value=${oneWire.pin}
                        class="border rounded p-2 w-full bg-gray-100"
                        readonly
                        disabled
                      />
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Selected sensor</td>
                    <td class="p-2">
                      <select
                        name="typsensor"
                        value=${formData.typsensor}
                        onchange=${handleChange}
                        class="border rounded p-2 w-full"
                        disabled=${isSubmitting}
                      >
                        <option value="0">None</option>
                        <option value="1">DS18B20</option>
                        <option value="2">DHT22</option>
                      </select>
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">Count of sensors</td>
                    <td class="p-2">
                      <input
                        type="number"
                        name="numdevices"
                        value=${formData.numdevices}
                        oninput=${formData.typsensor === 1
                          ? handleChange
                          : undefined}
                        class="border rounded p-2 w-full ${formData.typsensor !==
                        1
                          ? 'bg-gray-100'
                          : ''}"
                        min="0"
                        max="10"
                        readonly=${formData.typsensor !== 1}
                        disabled=${isSubmitting}
                      />
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${MyPolzunok}
                        value=${onoff}
                        onChange=${handleOnOffChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer flex justify-end mt-4">
              <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled=${isSubmitting}
              >
                ${isSubmitting ? 'Saving...' : 'Save changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}

const TabOneWire = () => {
  const [varonewire, setOneWire] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [editingOneWire, setEditingOneWire] = useState(null);
  const [language, setLanguage] = useState('ru');
  const [modalType, setModalType] = useState(null);

  const refresh = () => {
    console.log('Calling initial refresh...');
    fetch('/api/onewire/get')
      .then((r) => r.json())
      .then((data) => {
        console.log('Initial data received:', data);
        setLanguage(data.lang || 'ru');
        setOneWire(data.pins || []);
        console.log('Initial OneWire state set:', data.pins);
        setError(null);
      })
      .catch((err) => {
        console.error('Error in refresh:', err);
        setError(err.message);
        setOneWire([]);
      });
  };

  const updateSensorData = async () => {
    try {
      const response = await fetch('/api/temp/get');
      const data = await response.json();
      //console.log('New sensor data received:', data);

      setOneWire((prevState) => {
        return prevState.map((device) => {
          if (
            !device.sensors ||
            (device.typsensor !== 1 &&
              device.typsensr !== 1 &&
              device.typsensor !== 2 &&
              device.typsensr !== 2)
          ) {
            return device;
          }

          const updatedSensors = device.sensors.map((sensor) => {
            // Для DS18B20 датчиков
            if (device.typsensor === 1 || device.typsensr === 1) {
              const matchedSensor = data.ds18b20?.find(
                (d) => d.addr === sensor.s_number
              );
              if (matchedSensor) {
                return {
                  ...sensor,
                  t: matchedSensor.temp
                };
              }
            }
            // Для DHT22 датчиков
            else if (device.typsensor === 2 || device.typsensr === 2) {
              // Используем ID устройства для сопоставления вместо s_number
              const matchedSensor = data.dht22?.find((d) => d.id === device.id);
              if (matchedSensor) {
                return {
                  ...sensor,
                  t: matchedSensor.temp,
                  humidity: matchedSensor.humidity
                };
              }
            }
            return sensor;
          });

          return {
            ...device,
            sensors: updatedSensors
          };
        });
      });
    } catch (error) {
      console.error('Error in updateSensorData:', error);
    }
  };

  useEffect(() => {
    console.log('Setting up initial data and interval...');
    refresh();
    const updateInterval = setInterval(updateSensorData, 1000);
    return () => {
      //console.log('Cleaning up interval...');
      clearInterval(updateInterval);
    };
  }, []);

  const openModal = (type, cronData) => {
    setModalType(type);
    setSelectedSensor({ ...sensor, oneWireId, sensorType, pins });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSensor(null);
    setEditingOneWire(null);
  };

  const handleSensorUpdate = (updatedSensor) => {
    setOneWire((prevState) => {
      return prevState.map((device) => {
        if (device.id === updatedSensor.oneWireId) {
          const updatedSensors =
            device.sensors?.map((sensor) =>
              sensor.s_number === updatedSensor.s_number
                ? { ...sensor, ...updatedSensor }
                : sensor
            ) || [];
          return { ...device, sensors: updatedSensors };
        }
        return device;
      });
    });
    closeModal();
  };

  const openOneWireModal = (oneWire) => {
    setEditingOneWire(oneWire);
    setIsModalOpen(true);
  };

  const handleOWOnOffChange = (updatedOneWire) => {
    setOneWire((prevState) => {
      return prevState.map((device) =>
        device.id === updatedOneWire.id
          ? { ...device, onoff: updatedOneWire.onoff }
          : device
      );
    });
  };

  const handleOneWireUpdate = (updatedOneWire) => {
    setOneWire((prevState) => {
      return prevState.map((device) =>
        device.id === updatedOneWire.id ? updatedOneWire : device
      );
    });
    closeModal();
  };

  if (error) {
    return html`<div>Error fetching sensor data: ${error}</div>`;
  }

  const getLangObject = () => {
    return {
      lang1Wire: language === 'ru' ? rulange1Wire : enlange1Wire
    };
  };

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

  const Th = (props) => html`
    <th class="px-3 py-2 relative group">
      ${props.title}
      <div
        class="absolute z-50 invisible group-hover:visible bg-orange-300 p-2 rounded shadow-lg whitespace-normal break-words text-left"
        style="width: fit-content; max-width: 80vw; left: 50%; transform: translateX(-50%); top: 100%;"
      >
        ${getTooltipText('lang1Wire', props.tooltipIndex)}
      </div>
    </th>
  `;

  const ArrayOneWire = ({ device, index }) => {
    // Handle both 'pins' and 'pin' fields
    const pinValue = device.pins || device.pin;
    // Handle both 'typsensor' and 'typsensr' fields
    const sensorType = device.typsensor || device.typsensr || 0;
    // Handle both 'numdevices' and 'numsens' fields
    const numDevices = device.numdevices || device.numsens || 0;

    return html`
      <tr class="${index % 2 === 1 ? 'bg-white' : 'bg-green-300'}">
        <td class="px-4 py-2">${device.id}</td>
        <td class="px-4 py-2">${pinValue}</td>
        <td class="px-4 py-2">${['None', 'DS18B20', 'DHT22'][sensorType]}</td>
        <td class="px-4 py-2">${numDevices}</td>
        <td class="px-4 py-2">
          <${MyPolzunok}
            value=${device.onoff || 0}
            onChange=${(value) =>
              handleOWOnOffChange({ ...device, onoff: value })}
          />
        </td>
        <td class="px-4 py-2">
          <button
            class="text-blue-500 hover:text-blue-700"
            onclick=${() => openOneWireModal(device)}
          >
            Edit
          </button>
        </td>
      </tr>
      ${sensorType !== 0 && numDevices > 0
        ? html`
            <tr>
              <td colspan="7" class="px-4 py-2">
                <table class="w-full">
                  <${SensorTable} d=${device} />
                </table>
              </td>
            </tr>
          `
        : ''}
    `;
  };

  const SensorTable = ({ d }) => {
    //console.log('Rendering SensorTable with data:', d);
    const sensorType = d.typsensor || d.typsensr || 0;
    const numDevices = d.numdevices || d.numsens || 0;

    if (sensorType === 0 || numDevices === 0) {
      return html`
        <tr>
          <td colspan="7" class="px-4 py-2">
            No connected sensors for this OneWire pin.
          </td>
        </tr>
      `;
    }

    let sensors = d.sensors || [];

    const renderSensor = (sensorData, idx) => {
      const isDHT22 = sensorType === 2;
      return html`
        <tr class="${idx % 2 === 0 ? 'bg-blue-100' : 'bg-white'}">
          <td class="px-4 py-2">
            <div class="bg-blue-200 p-4 rounded-lg shadow-md">
              <div
                class="font-semibold text-lg mb-2 flex justify-between items-center"
              >
                <span>
                  ${isDHT22
                    ? `DHT22 Sensor`
                    : `DS18B20 Sensor (S/N: ${sensorData.s_number})`}
                </span>
                <a
                  href="#"
                  class="text-blue-500 hover:text-blue-700"
                  onclick=${(e) => {
                    e.preventDefault();
                    setSelectedSensor({
                      ...sensorData,
                      oneWireId: d.id,
                      sensorType: sensorType,
                      pins: d.pins || d.pin
                    });
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </a>
              </div>
              <table class="w-full text-sm">
                <tr>
                  <td class="font-medium pr-2">Current Temperature:</td>
                  <td class="action-column">${sensorData.t}°C</td>
                </tr>
                ${isDHT22 && 'humidity' in sensorData
                  ? html`
                      <tr>
                        <td class="font-medium pr-2">Current Humidity:</td>
                        <td class="action-column">${sensorData.humidity}%</td>
                      </tr>
                    `
                  : ''}
                <tr>
                  <td class="font-medium pr-2">
                    Upper Temp. Limit = ${sensorData.ut}°C
                  </td>
                  <td class="action-column">Action: ${sensorData.action_ut}</td>
                </tr>
                <tr>
                  <td class="font-medium pr-2">
                    Lower Temp. Limit = ${sensorData.lt}°C
                  </td>
                  <td class="action-column">Action: ${sensorData.action_lt}</td>
                </tr>
                ${isDHT22 && 'upphumid' in sensorData
                  ? html`
                      <tr>
                        <td class="font-medium pr-2">
                          Upper Humidity Limit = ${sensorData.upphumid}%
                        </td>
                        <td class="action-column">
                          Action: ${sensorData.actuphum}
                        </td>
                      </tr>
                      <tr>
                        <td class="font-medium pr-2">
                          Lower Humidity Limit = ${sensorData.humlolim}%
                        </td>
                        <td class="action-column">
                          Action: ${sensorData.actlowhum}
                        </td>
                      </tr>
                    `
                  : ''}
                <tr>
                  <td class="font-medium pr-2">Info:</td>
                  <td class="action-column">${sensorData.info}</td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
      `;
    };

    return sensors.length > 0 && Object.keys(sensors[0]).length > 0
      ? sensors.map((sensor, idx) => renderSensor(sensor, idx))
      : html`<tr>
          <td colspan="7" class="px-4 py-2">
            No sensor data available for this OneWire pin.
          </td>
        </tr>`;
  };

  return html`
    <div class="flex-grow flex flex-col justify-center items-center">
      <div class="font-medium uppercase flex items-center px-4 py-2">
        OneWire(s) pin(s)
      </div>
      <div class="flex-grow flex flex-col justify-center items-center">
        <div class="justify-center">
          <div class="mb-4">
            <table class="table-auto border divide-y divide-gray-200">
              <thead>
                <tr class="bg-gray-400">
                  <${Th} title="ID" tooltipIndex=${1} />
                  <${Th} title="Pin" tooltipIndex=${2} />
                  <${Th} title="Selected sensor" tooltipIndex=${3} />
                  <${Th} title="Count of sensors" tooltipIndex=${4} />
                  <${Th} title="On/Off" tooltipIndex=${5} />
                  <${Th} title="Actions" tooltipIndex=${6} />
                </tr>
              </thead>
              <tbody id="tab1">
                ${varonewire.length > 0
                  ? varonewire.map(
                      (device, index) =>
                        html`<${ArrayOneWire}
                          device=${device}
                          index=${index}
                          key=${device.id}
                        />`
                    )
                  : html`
                      <tr>
                        <td colspan="6" class="px-4 py-2">
                          ${error
                            ? `Error fetching sensor data: ${error}`
                            : 'No available pins configured as OneWire!'}
                        </td>
                      </tr>
                    `}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      ${isModalOpen &&
      (selectedSensor
        ? html`
            <${ModalEditSensor}
              typsensor=${selectedSensor}
              oneWireId=${selectedSensor.oneWireId}
              pins=${selectedSensor.pins}
              onClose=${closeModal}
              onUpdate=${handleSensorUpdate}
              sensorType=${selectedSensor.sensorType}
              closeOnOverlayClick=${true}
              refresh=${refresh}
            />
          `
        : html`
            <${ModalOneWire}
              oneWire=${editingOneWire}
              onClose=${closeModal}
              onUpdate=${handleOneWireUpdate}
              closeOnOverlayClick=${true}
              refresh=${refresh}
            />
          `)}
    </div>
  `;
};

function ModalEditSensor({
  typsensor,
  oneWireId,
  pins,
  onClose,
  onUpdate,
  sensorType,
  sensorData,
  closeOnOverlayClick = true
}) {
  const [formData, setFormData] = useState({
    ut: sensorData?.ut || typsensor.ut,
    lt: sensorData?.lt || typsensor.lt,
    action_ut: sensorData?.action_ut || typsensor.action_ut,
    action_lt: sensorData?.action_lt || typsensor.action_lt,
    upphumid: sensorData?.upphumid || typsensor.upphumid || 0,
    humlolim: sensorData?.humlolim || typsensor.humlolim || 0,
    actuphum: sensorData?.actuphum || typsensor.actuphum || '',
    actlowhum: sensorData?.actlowhum || typsensor.actlowhum || '',
    info: sensorData?.info || typsensor.info,
    onoff: sensorData?.onoff || typsensor.onoff || 0,
    humidity: sensorData?.humidity || typsensor.humidity || 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: ['ut', 'lt', 'upphumid', 'humlolim'].includes(name)
        ? parseFloat(value)
        : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/sensor/set', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: oneWireId,
          pins: pins,
          sensorNumber: typsensor.s_number,
          ut: formData.ut,
          lt: formData.lt,
          action_ut: formData.action_ut,
          action_lt: formData.action_lt,
          upphumid: formData.upphumid,
          humlolim: formData.humlolim,
          actuphum: formData.actuphum,
          actlowhum: formData.actlowhum,
          info: formData.info,
          s_number: typsensor.s_number,
          t: typsensor.t,
          humidity: formData.humidity
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      //console.log('Updated Sensor Data:', {oneWireId,pins,...formData,s_number: typsensor.s_number,t: typsensor.t});
      onUpdate({
        ...typsensor,
        ...formData,
        oneWireId,
        pins,
        s_number: typsensor.s_number,
        t: typsensor.t
      });
      onClose();
    } catch (error) {
      //console.error('Error updating Sensor:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return html`
    <div
      class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 pt-10"
      onclick=${handleOverlayClick}
    >
      <div
        class="modal-content bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative"
        style="transform: translateY(260px);"
      >
        <div
          class="modal-header flex justify-between items-center border-b pb-4 mb-4"
        >
          <h5 class="text-xl font-bold">Edit Sensor</h5>
          <button
            class="close-button text-gray-500 hover:text-gray-700"
            onclick=${onClose}
          >
            Close
          </button>
        </div>
        <form onsubmit=${handleSubmit}>
          <div class="modal-body">
            <table class="table-auto w-full">
              <tbody>
                <tr class="bg-blue-100">
                  <td class="p-2 font-bold">Upper Temperature</td>
                  <td class="p-2">
                    <input
                      type="number"
                      name="ut"
                      value=${formData.ut}
                      oninput=${handleChange}
                      class="border rounded p-2 w-full"
                      min="-55"
                      max="125"
                      step="0.1"
                    />
                  </td>
                </tr>
                <tr class="bg-white">
                  <td class="p-2 font-bold">Lower Temperature</td>
                  <td class="p-2">
                    <input
                      type="number"
                      name="lt"
                      value=${formData.lt}
                      oninput=${handleChange}
                      class="border rounded p-2 w-full"
                      min="-55"
                      max="125"
                      step="0.1"
                    />
                  </td>
                </tr>
                <tr class="bg-blue-100">
                  <td class="p-2 font-bold">Action for Upper Temperature</td>
                  <td class="p-2">
                    <input
                      type="text"
                      name="action_ut"
                      value=${formData.action_ut}
                      oninput=${handleChange}
                      class="border rounded p-2 w-full"
                      maxlength="100"
                    />
                  </td>
                </tr>
                <tr class="bg-white">
                  <td class="p-2 font-bold">Action for Lower Temperature</td>
                  <td class="p-2">
                    <input
                      type="text"
                      name="action_lt"
                      value=${formData.action_lt}
                      oninput=${handleChange}
                      class="border rounded p-2 w-full"
                      maxlength="100"
                    />
                  </td>
                </tr>
                ${sensorType === 2
                  ? html`
                      <tr class="bg-blue-100">
                        <td class="p-2 font-bold">Humidity upper limit</td>
                        <td class="p-2">
                          <input
                            type="number"
                            name="upphumid"
                            value=${formData.upphumid}
                            oninput=${handleChange}
                            class="border rounded p-2 w-full"
                            min="0"
                            max="100"
                            step="0.1"
                          />
                        </td>
                      </tr>
                      <tr class="bg-white">
                        <td class="p-2 font-bold">Humidity lower limit</td>
                        <td class="p-2">
                          <input
                            type="number"
                            name="humlolim"
                            value=${formData.humlolim}
                            oninput=${handleChange}
                            class="border rounded p-2 w-full"
                            min="0"
                            max="100"
                            step="0.1"
                          />
                        </td>
                      </tr>
                      <tr class="bg-blue-100">
                        <td class="p-2 font-bold">Action for upper H</td>
                        <td class="p-2">
                          <input
                            type="text"
                            name="actuphum"
                            value=${formData.actuphum}
                            oninput=${handleChange}
                            class="border rounded p-2 w-full"
                            maxlength="100"
                          />
                        </td>
                      </tr>
                      <tr class="bg-white">
                        <td class="p-2 font-bold">Action for lower H</td>
                        <td class="p-2">
                          <input
                            type="text"
                            name="actlowhum"
                            value=${formData.actlowhum}
                            oninput=${handleChange}
                            class="border rounded p-2 w-full"
                            maxlength="100"
                          />
                        </td>
                      </tr>
                    `
                  : ''}
                <tr class="bg-blue-100">
                  <td class="p-2 font-bold">Info</td>
                  <td class="p-2">
                    <input
                      type="text"
                      name="info"
                      value=${formData.info}
                      oninput=${handleChange}
                      class="border rounded p-2 w-full"
                      maxlength="30"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer flex justify-end mt-4">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}
/****************************************************************************/
function ModalSIM800L({ hideModal, title, selectedGps, onSave }) {
  const [tel, setTel] = useState(selectedGps?.tel || '');
  const [info, setInfo] = useState(selectedGps?.info || '');
  const [onoff, setOnoff] = useState(selectedGps?.onoff === 1);
  const [isValidPhone, setIsValidPhone] = useState(true);

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+\d{11,20}$/;
    return phoneRegex.test(phone);
  };

  const handlePhoneChange = (e) => {
    const newValue = e.target.value;
    setTel(newValue);
    setIsValidPhone(validatePhoneNumber(newValue));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidPhone) return;

    const jsonData = {
      tel: tel,
      info: info,
      onoff: onoff ? 1 : 0
    };

    console.log('Сохраняемые данные:', jsonData);

    fetch('/api/sim800l/set', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
      .then((response) => response.json())
      .then((data) => {
        if (typeof onSave === 'function') {
          onSave(jsonData);
        }
        hideModal();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return html`
    <div
      class="fixed inset-0 z-50 bg-black bg-opacity-50"
      style="margin-top: 7px;"
    >
      <div class="flex items-center justify-center min-h-full p-4">
        <div
          class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative"
          style="max-height: calc(100vh - 57px); overflow-y: auto;"
        >
          <div class="modal-header flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">${title}</h2>
            <button
              onClick=${hideModal}
              class="close-button text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>

          <form onSubmit=${handleSubmit}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">RXD</td>
                    <td class="p-2">PA3(1)</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">TXD</td>
                    <td class="p-2">PD5(35)</td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">Mobile phone</td>
                    <td class="p-2">
                      <input
                        type="text"
                        value=${tel}
                        onInput=${handlePhoneChange}
                        class=${`border rounded p-2 w-full ${
                          !isValidPhone && tel !== '' ? 'border-red-500' : ''
                        }`}
                        placeholder="+XXXXXXXXXXX"
                      />
                      ${!isValidPhone && tel !== ''
                        ? html`
                            <div class="text-red-500 text-sm mt-1">
                              Please enter valid phone number starting with +
                              and containing 11-20 digits
                            </div>
                          `
                        : ''}
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">INFO</td>
                    <td class="p-2">
                      <input
                        type="text"
                        value=${info}
                        onInput=${(e) => setInfo(e.target.value)}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${MyPolzunok} value=${onoff} onChange=${setOnoff} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer flex justify-end mt-4">
              <button
                type="submit"
                disabled=${!isValidPhone || tel === ''}
                class=${`font-bold py-2 px-4 rounded ${
                  isValidPhone && tel !== ''
                    ? 'bg-blue-500 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}

/****************************************************************************/
//FIXME:
const ModalSecurity = ({
  modalType,
  page,
  hideModal,
  title,
  selectedSecurity,
  onSecurityChange,
  SliderComponent = MyPolzunok
}) => {
  const [mecurityInfo, setSecurityInfo] = useState(
    selectedSecurity?.info || ''
  );
  const [onoff, setOnOff] = useState(selectedSecurity?.onoff || 0);
  const [ptype, setPtype] = useState(selectedSecurity?.ptype || 0);
  const [send_sms, setSend_sms] = useState(selectedSecurity?.send_sms || '');
  const [action, setAction] = useState(selectedSecurity?.action || '');
  const [pinOptions, setPinOptions] = useState([]);
  const [errors, setErrors] = useState({
    send_sms: null,
    action: null
  });
  const [submitError, setSubmitError] = useState(null);

  const mecurityRegex = /^(None|\d{1,2}:[012])(,\d{1,2}:[012])*$/;

  const validateInput = (key, value) => {
    if (!value || value.trim() === '' || value.toLowerCase() === 'none') {
      return null;
    }

    if (key === 'action') {
      return mecurityRegex.test(value)
        ? null
        : 'Incorrect format. Use "None" or "pin:value" format.';
    }

    if (value.length > 100) {
      return 'Text should not exceed 100 characters';
    }
    return null;
  };

  const handleInputChange = (key, value) => {
    const error = validateInput(key, value);
    setErrors((prev) => ({ ...prev, [key]: error }));

    switch (key) {
      case 'send_sms':
        setSend_sms(value);
        break;
      case 'action':
        setAction(value);
        break;
    }
  };

  useEffect(() => {
    fetch('/api/monitoring/get')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPinOptions(data.filter((pin) => pin.topin === 2));
        } else {
          // console.error('Expected array from API, received:', typeof data);
          setPinOptions([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching pin config:', error);
        setPinOptions([]);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(errors).some((error) => error !== null)) {
      setSubmitError('Please correct the errors before submitting.');
      return;
    }

    const updatedSecurity = {
      ...selectedSecurity,
      info: mecurityInfo,
      send_sms: send_sms || 'NO',
      action: action || 'None',
      onoff,
      ptype
    };

    fetch('/api/monitoring/set', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedSecurity)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        onSecurityChange(updatedSecurity);
        hideModal();
      })
      .catch((error) => {
        console.error('Error:', error);
        setSubmitError('Failed to save changes. Please try again.');
      });
  };

  const handleResetPin = () => {
    setPtype(0);
    setSend_sms('');
    setAction('');
    setSecurityInfo('');
    setOnOff(0);
    setErrors({ send_sms: null, action: null });
  };

  const renderConnectionModal = () => html`
    <form onSubmit=${handleSubmit}>
      <div class="modal-body">
        <table class="table-auto w-full">
          <tbody>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">ID</td>
              <td class="p-2">${selectedSecurity.id}</td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">Pin</td>
              <td class="p-2">${selectedSecurity.pins}</td>
            </tr>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">Connection</td>
              <td class="p-2">
                <select
                  name="setrpins"
                  value=${selectedSecurity?.setrpins || ''}
                  onChange=${(e) =>
                    onSecurityChange({
                      ...selectedSecurity,
                      setrpins: e.target.value
                    })}
                  class="border rounded p-2 w-full"
                >
                  <option value="">Select a connection</option>
                  ${pinOptions.map(
                    (option) => html`
                      <option value=${option.pins}>
                        ${option.pins} (ID: ${option.id})
                      </option>
                    `
                  )}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer flex justify-end mt-4">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save changes
        </button>
      </div>
    </form>
  `;

  const renderEditModal = () => html`
    <form onSubmit=${handleSubmit}>
      <div class="modal-body">
        <table class="table-auto w-full">
          <tbody>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">ID</td>
              <td class="p-2">${selectedSecurity.id}</td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">Pin</td>
              <td class="p-2">${selectedSecurity.pins}</td>
            </tr>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">Ptype</td>
              <td class="p-2">
                <select
                  name="ptype"
                  value=${ptype}
                  onChange=${(e) => setPtype(parseInt(e.target.value))}
                  class="border rounded p-2 w-full"
                >
                  <option value="0">PIR</option>
                  <option value="1">Normal open</option>
                  <option value="2">Normal close</option>
                </select>
              </td>
            </tr>

            <tr class="bg-gray-200">
              <td class="p-2 font-bold">Action</td>
              <td class="p-2">
                <input
                  type="text"
                  name="action"
                  value=${action}
                  onInput=${(e) => handleInputChange('action', e.target.value)}
                  class="border rounded p-2 w-full ${errors.action
                    ? 'border-red-500'
                    : ''}"
                  placeholder="None"
                />
                ${errors.action &&
                html`<p class="text-red-500 text-sm">${errors.action}</p>`}
              </td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">Send SMS</td>
              <td class="p-2">
                <select
                  name="send_sms"
                  value=${send_sms}
                  onchange=${(e) =>
                    handleInputChange('send_sms', e.target.value)}
                  class="border rounded p-2 w-full ${errors.send_sms
                    ? 'border-red-500'
                    : ''}"
                >
                  <option value="NO">NO</option>
                  <option value="YES">YES</option>
                </select>
                ${errors.send_sms &&
                html` <p class="text-red-500 text-sm">${errors.send_sms}</p> `}
              </td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">INFO</td>
              <td class="p-2">
                <input
                  type="text"
                  name="info"
                  value=${mecurityInfo}
                  onInput=${(e) => setSecurityInfo(e.target.value)}
                  class="border rounded p-2 w-full"
                />
              </td>
            </tr>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">On/Off</td>
              <td class="p-2">
                <${SliderComponent} value=${onoff} onChange=${setOnOff} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer flex justify-between mt-4">
        <button
          type="button"
          onClick=${handleResetPin}
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset Pin
        </button>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save changes
        </button>
      </div>
      ${submitError && html`<p class="text-red-500 mt-2">${submitError}</p>`}
    </form>
  `;

  return html`
    <div
      class="fixed inset-0 z-50 bg-black bg-opacity-50"
      style="margin-top: 7px;"
    >
      <div class="flex items-center justify-center min-h-full p-4">
        <div
          class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative"
          style="max-height: calc(100vh - 57px); overflow-y: auto;"
        >
          <div class="modal-header flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">${title}</h2>
            <button
              onClick=${hideModal}
              class="close-button text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
          ${page === 'TabSecurity' && modalType === 'connection'
            ? renderConnectionModal()
            : renderEditModal()}
        </div>
      </div>
    </div>
  `;
};

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
      <div class="space-y-6">
        <div>
          <h2>
            SIM800L - модуль для удаленного взаимодействия с "Заготовкой" в
            отсутствии интернета:
          </h2>
          <ul>
            <li>
              Принимает звонки на указанный номер в таблице "Mobile phone"
            </li>
            <li>Отправляет SMS-отчеты</li>
            <li>
              Ползунок 'OnOFF' является основным переключателем для всей системы
              SMS-уведомлений
            </li>
          </ul>
          <p>
            <strong>Если ползунок 'OnOFF' включен:</strong> SMS-уведомления
            работают согласно настройкам в таблице 'Security Pins'.
          </p>
          <p>
            <strong>Если ползунок 'OnOFF' отключен:</strong> Все SMS-уведомления
            отключаются. Настройки в таблице 'Security Pins' игнорируются.
          </p>
          <div class="text-red-500 font-bold">
            <h3>Важно для запуска:</h3>
            <ul>
              <li>Вставьте SIM-карту в SIM800L</li>
              <li>
                Включить SIM800L раньше STM32, чтобы модуль успел
                инициализироваться!
              </li>
            </ul>
          </div>
        </div>
      </div>
    `,
    en: html`
      <div class="space-y-6">
        <div>
          <h2>
            SIM800L - module for remote interaction with "Template" without
            internet:
          </h2>
          <ul>
            <li>
              Accepts calls to the specified number in the "Mobile phone" table
            </li>
            <li>Sends SMS reports</li>
            <li>
              The 'OnOFF' slider is the main switch for the entire SMS
              notification system
            </li>
          </ul>
          <p>
            <strong>If the 'OnOFF' slider is on:</strong> SMS notifications work
            according to the settings in the 'Security Pins' table.
          </p>
          <p>
            <strong>If the 'OnOFF' slider is off:</strong> All SMS notifications
            are disabled. Settings in the 'Security Pins' table are ignored.
          </p>
          <div class="text-red-500 font-bold">
            <h3>Important for launch:</h3>
            <ul>
              <li>Insert SIM card into SIM800L</li>
              <li>
                Turn on SIM800L 15 seconds before STM32 to allow the module to
                initialize
              </li>
            </ul>
          </div>
        </div>
      </div>
    `
  };

  // Help content for Security
  const helpContentSecurity = {
    ru: html`
      <div class="mytext space-y-6">
        <div>
          <pre class="text-xl font-bold mb-2">
            Нормально открытый геркон / Normal open</pre
          >
          <pre class="mb-4">
            В отсутствие магнитного поля контакты разомкнуты.
            При поднесении магнита контакты замыкаются.
            Подключение: один вывод к пину STM32, второй к <span class="text-red-500 font-bold">+3.3v</span>.
          </pre>
          <pre class="text-xl font-bold mb-2">
            Нормально закрытый геркон / Normal close</pre
          >
          <pre class="mb-4">
            В отсутствие магнитного поля контакты замкнуты.
            При поднесении магнита контакты размыкаются.
            Подключение: один вывод к пину STM32, второй к <span class="text-red-500 font-bold">+3.3v</span>.
          </pre>
          <pre class="text-xl font-bold mb-2">Датчики движения PIR</pre>
          <pre class="mb-4">
            В состоянии покоя выход/out LOW (логический 0)
            При обнаружении движения выход/out переходит в HIGH (логическая 1 т.е. максимум <span class="text-red-500 font-bold">+3.3v</span>).
          </pre>

          <pre class="text-xl font-bold mb-2">
Если в столбце "Send SMS" значение 'YES':</pre
          >
          <pre class="mb-4">
            SMS уведомление будет отправлено.
          </pre
          >
          <pre class="text-xl font-bold mb-2">
Если в столбце "Send SMS" значение 'NO':</pre
          >
          <pre class="mb-4">
            SMS уведомление не будет отправлено.
          </pre
          >
          <pre class="mb-4">
          Действие, указанное в столбце 'Action', будет выполнено в любом случае
    	    Выполнение действия не зависит от значения в столбце "Send SMS"
           </pre
          >
        </div>
      </div>
    `,
    en: html`
      <div class="mytext space-y-6">
        <div>
          <pre class="text-xl font-bold mb-2">
Normally open reed switch / Normal open</pre
          >
          <pre class="mb-4">
In the absence of a magnetic field, the contacts are open.
When a magnet is brought near, the contacts close.
Connection: one lead to the STM32 pin, the other to <span class="text-red-500 font-bold">+3.3v</span>.
    </pre>

          <pre class="text-xl font-bold mb-2">
Normally closed reed switch / Normal close</pre
          >
          <pre class="mb-4">
In the absence of a magnetic field, the contacts are closed.
When a magnet is brought near, the contacts open.
Connection: one lead to the STM32 pin, the other to <span class="text-red-500 font-bold">+3.3v</span>.
    </pre>

          <pre class="text-xl font-bold mb-2">PIR Motion Sensors</pre>
          <pre class="mb-4">
In the idle state, the output is LOW (logical 0)
When motion is detected, the output switches to HIGH (logical 1, i.e., maximum <span class="text-red-500 font-bold">+3.3v</span>).
    </pre>

          <pre class="text-xl font-bold mb-2">
If the "Send SMS" column value is 'YES':</pre
          >
          <pre class="mb-4">An SMS notification will be sent.</pre>

          <pre class="text-xl font-bold mb-2">
If the "Send SMS" column value is 'NO':</pre
          >
          <pre class="mb-4">An SMS notification will not be sent.</pre>

          <pre class="mb-4">
The action specified in the 'Action' column will be performed in any case
The execution of the action does not depend on the value in the "Send SMS" column
    </pre>
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
          class=${`w-full p-2 mb-4 text-white text-center 
          ${connectionStatus === 'error' ? 'bg-yellow-500' : 'bg-red-500'}`}
        >
          ${connectionStatus === 'error'
            ? 'Connection problems. Retrying...'
            : 'Connection lost. Check your internet connection.'}
        </div>
      `}
      <div class="flex flex-col items-center w-full p-4">
        <div class="w-full max-w-4xl mb-8">
          <h2 class="text-xl font-bold mb-4">SIM800L Settings</h2>
          <table class="w-full border-collapse bg-gray-400 shadow-sm mb-4">
            <thead>
              <tr>
                <th>RXD Pin</th>
                <th>TXD Pin</th>
                <th>Phone Number</th>
                <th>Info</th>
                <th>OnOff</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-green-300">
                <td>
                  ${sim800lData.sim800l === 1 ? 'PA3(1)' : 'Not configured'}
                </td>
                <td>
                  ${sim800lData.sim800l === 1 ? 'PD5(35)' : 'Not configured'}
                </td>
                <td>${sim800lData.tel || 'Not set'}</td>
                <td>${sim800lData.info || 'No info'}</td>
                <td>
                  <${MyPolzunok}
                    value=${sim800lData.onoff}
                    onChange=${(value) =>
                      handleSim800lSave({ ...sim800lData, onoff: value })}
                  />
                </td>
                <td>
                  <button
                    onClick=${() => setIsModalOpenSim800L(true)}
                    class="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex justify-end w-full">
            <button
              onClick=${() => setShowHelpSim800L(!showHelpSim800L)}
              class="bg-blue-500 hover:bg-blue-700 text-white"
            >
              ${showHelpSim800L ? 'Hide Help' : 'Show Help'}
            </button>
          </div>
          ${showHelpSim800L && helpContentSim800L[language]}
        </div>

        <div class="w-full max-w-4xl">
          <h2 class="text-xl font-bold mb-4">Security Pins</h2>
          <table
            class="table-auto border divide-y divide-gray-200 overflow-x-auto"
          >
            <thead>
              <tr class="bg-gray-400">
                <th>ID</th>
                <th>Pin</th>
                <th>Type of sensor</th>
                <th>Action</th>
                <th>Send SMS</th>
                <th>INFO</th>
                <th>On/Off</th>
                <th>Edit Pin</th>
              </tr>
            </thead>
            <tbody>
              ${varmonitoring.length > 0
                ? varmonitoring.map(
                    (d, index) => html`
                      <tr
                        class="${index % 2 === 1 ? 'bg-white' : 'bg-green-300'}"
                      >
                        <td class="px-4 py-2">${d.id}</td>
                        <td class="px-4 py-2">${d.pins}</td>
                        <td class="px-4 py-2">
                          ${['PIR', 'Normal open', 'Normal close'][d.ptype]}
                        </td>
                        <td class="px-4 py-2">${d.action}</td>
                        <td class="px-4 py-2">${d.send_sms}</td>
                        <td class="px-4 py-2">${d.info}</td>
                        <td class="px-4 py-2">
                          <${MyPolzunok}
                            value=${d.onoff}
                            onChange=${(value) =>
                              handleOnOffChange({ ...d, onoff: value })}
                          />
                        </td>
                        <td class="px-4 py-2">
                          <button
                            onClick=${() => openModal('edit', d)}
                            class="text-blue-500 hover:text-blue-700"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    `
                  )
                : html`
                    <tr>
                      <td colspan="8" class="text-center">
                        No monitoring data available
                      </td>
                    </tr>
                  `}
            </tbody>
          </table>
          <div class="flex justify-end mt-4">
            <button
              onClick=${() => setShowHlp(!showHelpSecurity)}
              class="bg-blue-500 hover:bg-blue-700 text-white"
            >
              ${showHelpSecurity ? 'Hide Help' : 'Show Help'}
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
/****************************************************************************/
function FirmwareStatus({ title, info, children }) {
  return html`
    <div class="bg-white xm-4 divide-y border rounded flex flex-col">
      <div
        class="font-light uppercase flex items-center text-gray-600 px-4 py-2"
      >
        ${title}
      </div>
      <div class="px-4 py-3 flex flex-col gap-2 grow">
        <div>Version: ${info.version || 'N/A'}</div>
        <div>Status: ${info.status || 'N/A'}</div>
        ${children}
      </div>
    </div>
  `;
}

function FirmwareUpdate({}) {
  const [info, setInfo] = useState([{}, {}]);
  const [alert, setAlert] = useState(null);

  const refresh = () =>
    fetch('api/firmware/status')
      .then((r) => r.json())
      .then((r) => setInfo(r));

  useEffect(refresh, []);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const oncommit = (ev) =>
    fetch('api/firmware/commit')
      .then((r) => r.json())
      .then(refresh);

  const onreboot = (ev) =>
    fetch('api/reboot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ reboot: 1 })
    })
      .then((r) => r.json())
      .then(
        (r) =>
          new Promise((resolve) =>
            setTimeout(() => {
              refresh();
              resolve();
            }, 5000)
          )
      );

  const onrollback = (ev) => fetch('api/firmware/rollback').then(onreboot);
  const onerase = (ev) => fetch('api/device/eraselast').then(refresh);

  const onupload = function (file) {
    if (!file) {
      setAlert({ type: 'yellow', message: 'Error: No file selected.' });
      return;
    }

    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (fileExtension !== 'bin' && fileExtension !== 'hex') {
      setAlert({
        type: 'red',
        message: 'Error: Only .bin and .hex files are allowed!'
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('api/firmware/upload', {
      method: 'POST',
      body: formData
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        setAlert({ type: 'green', message: 'Firmware uploaded successfully!' });
        refresh();
      })
      .catch((error) => {
        setAlert({
          type: 'yellow',
          message: `Error: Upload failed. ${error.message}`
        });
      });
  };

  const AlertComponent = ({ type, message }) => {
    const bgColor =
      type === 'red'
        ? 'bg-red-100 border-red-500 text-red-700'
        : type === 'yellow'
        ? 'bg-yellow-100 border-yellow-500 text-yellow-700'
        : 'bg-green-100 border-green-500 text-green-700';

    return html`
      <div
        class=${`fixed top-0 left-0 right-0 z-50 border-b-4 p-4 ${bgColor}`}
        role="alert"
      >
        <p class="font-bold text-center">${message}</p>
      </div>
    `;
  };

  const UploadFileButton = ({ title, onupload }) => {
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        onupload(file);
      }
    };

    return html`
      <label
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        ${title}
        <input
          type="file"
          class="hidden"
          accept=".bin,.hex"
          onChange=${handleFileChange}
        />
      </label>
    `;
  };

  return html`
    ${alert &&
    html`<${AlertComponent} type=${alert.type} message=${alert.message} />`}
    <div class="m-4 gap-4 grid grid-cols-1 lg:grid-cols-3">
      <${FirmwareStatus} title="Current firmware image" info=${info[0]}>
        <div class="flex flex-wrap gap-2">
          <${Button}
            title="Commit this firmware"
            onclick=${oncommit}
            icon=${Icons.thumbUp}
            disabled=${info[0].status == 3}
            cls="w-full"
          />
        </div>
      <//>
      <${FirmwareStatus} title="Previous firmware image" info=${info[1]}>
        <${Button}
          title="Rollback to this firmware"
          onclick=${onrollback}
          icon=${Icons.backward}
          disabled=${info[1].status == 0}
          cls="w-full"
        />
      <//>
      <div class="bg-white xm-4 divide-y border rounded flex flex-col">
        <div
          class="font-light uppercase flex items-center text-gray-600 px-4 py-2"
        >
          Device control
        </div>
        <div class="px-4 py-3 flex flex-col gap-2 grow">
          <${UploadFileButton}
            title="Upload new firmware (.bin or .hex)"
            onupload=${onupload}
          />
          <div class="grow"></div>
          <${Button}
            title="Reboot device"
            onclick=${onreboot}
            icon=${Icons.refresh}
            cls="w-full"
          />
          <${Button}
            title="Erase last sector"
            onclick=${onerase}
            icon=${Icons.doc}
            cls="w-full hidden"
          />
        </div>
      </div>
    </div>

    <div class="m-4 gap-4 grid grid-cols-1 lg:grid-cols-2">
      <div class="bg-white border shadow-lg">
        <${DeveloperNote}>
          <div class="my-2">
            Firmware status and other information is stored in the last sector
            of flash
          </div>
          <div class="my-2">
            Firmware status can be FIRST_BOOT, UNCOMMITTED or COMMITTED. If no
            information is available, it is UNAVAILABLE.
          </div>
          <div class="my-2">
            This GUI loads a firmware file and sends it chunk by chunk to the
            device, passing current chunk offset, total firmware size and a file
            name: api/firmware/upload?offset=X&total=Y&name=Z
          </div>
        <//>
      </div>

      <div class="bg-white border shadow-lg">
        <${DeveloperNote}>
          <div>
            Firmware update mechanism defines 3 API functions that the target
            device must implement: mg_ota_begin(), mg_ota_write() and
            mg_ota_end()
          </div>
          <div class="my-2">
            RESTful API handlers use ota_xxx() API to save firmware to flash.
            The last 0-length chunk triggers ota_end() which performs firmware
            update using saved firmware image
          </div>
          <div class="my-2">
            <a
              class="link text-blue-600 underline"
              href="https://mongoose.ws/webinars/"
              >Join our free webinar</a
            >
            to get detailed explanations about possible firmware updates
            strategies and implementation demo
          </div>
        <//>
      </div>
    </div>
  `;
}

const pageSetting = ({ value, setfn, type, options, error, ...props }) => {
  let inputElement;
  const inputClass = `w-full px-3 py-2 border rounded-md ${
    error ? 'border-red-500' : 'border-gray-300'
  }`;

  switch (type) {
    case 'text':
    case 'password':
    case 'number':
      inputElement = html`
        <input
          type=${type}
          value=${value}
          onInput=${(e) => setfn(e.target.value)}
          class=${inputClass}
          ...${props}
        />
      `;
      break;
    case 'select':
      inputElement = html`
        <select
          value=${value}
          onChange=${(e) => setfn(e.target.value)}
          class=${inputClass}
          ...${props}
        >
          ${options.map(
            ([value, label]) => html` <option value=${value}>${label}</option> `
          )}
        </select>
      `;
      break;
    case 'switch':
      inputElement = html`
        <label class="switch">
          <input
            type="checkbox"
            checked=${value}
            onChange=${(e) => setfn(e.target.checked)}
            ...${props}
          />
          <span class="slider round"></span>
        </label>
      `;
      break;
    default:
      inputElement = html`<span>Неподдерживаемый тип: ${type}</span>`;
  }

  return html`
    <div>
      ${inputElement}
      ${error && html`<div class="text-red-500 text-sm mt-1">${error}</div>`}
    </div>
  `;
};

const ipRegex =
  /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/;

const subnetMaskRegex =
  /^(((0|128|192|224|240|248|252|254)\.(0|128|192|224|240|248|252|254)\.(0|128|192|224|240|248|252|254)\.(0|128|192|224|240|248|252|254))|(255\.(0|255)\.(0|255)\.(0|255))|(255\.255\.(0|255)\.(0|255))|(255\.255\.255\.(0|255)))$/;

//const macAddressRegex = /^[0-9a-fA-F]{2}(-[0-9a-fA-F]{2}){5}$/;

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return html`
    <div
      class=${`fixed bottom-4 right-4 p-4 rounded-md ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      } text-white`}
    >
      ${message}
    </div>
  `;
}

function Settings({}) {
  const [settings, setSettings] = useState(null);
  //const [changedSettings, setChangedSettings] = useState({});
  const [saveResult, setSaveResult] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const [toast, setToast] = useState(null);
  const [topNotification, setTopNotification] = useState(null);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
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
    if (year > currentYear + 5) return false; // Ограничение на 5 лет вперед
    const daysInMonth = new Date(2000 + year, month, 0).getDate();
    if (day > daysInMonth) return false;
    return true;
  };
  
  const validateTimeFormat = (timeStr) => {
    const pattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    if (!pattern.test(timeStr)) return false;
    return true;
  };
  
  const showToast = (message, type) => {
    setToast({ message, type }); // Передаем объект
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

const refresh = () =>
  fetch('/api/mysett/get')
    .then((r) => r.json())
    .then((r) => {
      // Если получены данные offldt, разбираем их
      if (r.offldt) {
        const { date, time } = parseOfflineDateTime(r.offldt);
        r.offline_date = date;
        r.offline_time = time;
      }
      setSettings(r);
    })
    .catch(error => {
      console.error('Error fetching settings:', error);
      showToast('Ошибка при загрузке настроек', 'error');
    });

// Добавляем useEffect для выполнения начальной загрузки
useEffect(() => {
  refresh();
}, []);

  const validateInput = (key, value) => {
    let error = null;
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
        case 'offline_date':
  if (!validateDateFormat(value)) {
    error = 'Неверный формат даты (д.м.гг)';
  }
  break;
case 'offline_time':
  if (!validateTimeFormat(value)) {
    error = 'Неверный формат времени (чч:мм:сс)';
  }
  break;
      //case 'macaddr':
      //if (!macAddressRegex.test(value)) {
      //error = 'Неверный MAC-адрес';
      //}
      //break;
    }
    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const jsonData = { ...settings }; // Start with all current settings

    // Собираем все данные из формы
    for (const [key, value] of formData.entries()) {
      // Преобразуем числовые значения обратно в числа и заменяем пустые значения на 0
      if (['lon_de', 'lat_de', 'timezone', 'mqtt_prt'].includes(key)) {
        jsonData[key] = value === '' || value === null ? 0 : Number(value);
      } else {
        jsonData[key] = value;
      }
    }
      // Формируем offldt из offline_date и offline_time
  if (jsonData.offline_date && jsonData.offline_time) {
    jsonData.offldt = `d:${jsonData.offline_date} t:${jsonData.offline_time}`;
  }
    // Дополнительная проверка на null и пустые строки
    ['lon_de', 'lat_de', 'timezone', 'mqtt_prt'].forEach((key) => {
      if (jsonData[key] === null || jsonData[key] === '') {
        jsonData[key] = 0;
      }
    });

    jsonData.onsunrise = jsonData.onsunrise ? 1 : 0;
    jsonData.onsunset = jsonData.onsunset ? 1 : 0;
    jsonData.check_ip = jsonData.check_ip ? 1 : 0;
    jsonData.check_mqtt = jsonData.check_mqtt ? 1 : 0;
    jsonData.sunrise = settings.sunrise;
    jsonData.sunset = settings.sunset;
    jsonData.dlength = settings.dlength;

    console.log('Data will be sent to STM32:');
    console.log(jsonData);
    console.log('Stringified data:');
    console.log(JSON.stringify(jsonData));
    delete jsonData.offline_date;
    delete jsonData.offline_time;
    fetch('/api/mysett/set', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
      .then((data) => {
        setSubmissionStatus('success');
        setSaveResult(data);
        console.log('Успех:', data);
        showToast('Данные успешно сохранены', 'success');
        showTopNotification('Данные успешно сохранены');
      })
      .catch((error) => {
        setSubmissionStatus('error');
        setSaveResult(error);
        console.error('Ошибка:', error);
        showToast('Ошибка при сохранении данных', 'error');
        showTopNotification('Ошибка при сохранении данных', 'error');
      });
  };

  const handleChange = (key, value) => {
    //console.log(`handleChange called for ${key} with value ${value}`);
    let error = null;
  
    if (key === 'offline_date') {
      error = validateDateFormat(value) ? null : 'Неверный формат даты (д.м.гг)';
    } else if (key === 'offline_time') {
      error = validateTimeFormat(value) ? null : 'Неверный формат времени (чч:мм:сс)';
    } else {
      error = validateInput(key, value);
    }
  
    //console.log(`Error for ${key}: ${error}`);
  
    setErrors(prevErrors => {
      const newErrors = { ...prevErrors, [key]: error };
      //console.log('New errors state:', newErrors);
      const hasAnyError = Object.values(newErrors).some(err => err !== null);
      //console.log('Has any error:', hasAnyError);
      setSubmitButtonDisabled(hasAnyError);
      return newErrors;
    });
  
    let processedValue = value;
    if (['lon_de', 'lat_de', 'timezone', 'mqtt_prt'].includes(key)) {
      processedValue = value === '' || value === null ? 0 : Number(value);
    } else if (['onsunrise', 'onsunset', 'check_ip', 'check_mqtt'].includes(key)) {
      processedValue = value ? 1 : 0;
    }
  
    setSettings(prevSettings => ({ ...prevSettings, [key]: processedValue }));
  };
  
  

  const timeZone = [
    [-12.0, '(GMT -12:00) Eniwetok, Kwajalein'],
    [-11.0, '(GMT -11:00) Midway Island, Samoa'],
    [-10.0, '(GMT -10:00) Hawaii'],
    [-9.0, '(GMT -9:00) Alaska'],
    [-8.0, '(GMT -8:00) Pacific Time (US &amp; Canada)'],
    [-7.0, '(GMT -7:00) Mountain Time (US &amp; Canada)'],
    [-6.0, '(GMT -6:00) Central Time (US &amp; Canada), Mexico City'],
    [-5.0, '(GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima'],
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

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'ru', label: 'Russian' }
  ];

  if (!settings) return '';
  const hasErrors = Object.values(errors).some((error) => error !== null);

  return html`
    <div class="m-4 divide-y divide-gray-200 overflow-auto rounded bg-white">
      <div
        class="font-medium uppercase flex items-center px-4 py-2 bg-gray-400"
      >
        <span>Global settings</span>
        <select
          value=${settings.lang}
          onChange=${(e) => handleChange('lang', e.target.value)}
          class="ml-2 px-2 py-1 bg-white rounded text-sm"
        >
          ${languages.map(
            (lang) => html` <option value=${lang.value}>${lang.label}</option> `
          )}
        </select>
      </div>
      <div class="flex-grow flex flex-col justify-center items-center">
        ${topNotification &&
        html`
          <div
            class="w-full bg-green-500 text-white px-4 py-2 text-center mb-4"
          >
            ${topNotification}
          </div>
        `}
        <form
          ref=${formRef}
          onSubmit=${handleSubmit}
          class="justify-center overflow-x-auto mb-4 w-full max-w-2xl settings-table"
        >
          <div class="flex justify-start items-center p-2">
  <button
  type="submit"
  class=${`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
    submitButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
  }`}
  disabled=${submitButtonDisabled}
>
  Save changes
</button>
          </div>
          <div class="flex flex-col items-center">
            ${[
              { label: 'Login', key: 'adm_name', type: 'text' },
              { label: 'Password', key: 'adm_pswd', type: 'password' },
              {
                label: 'Time zone UTC',
                key: 'timezone',
                type: 'select',
                options: timeZone
              }
            ].map(
              (item, index) => html`
                <div
                  class="flex items-center w-full justify-center ${index % 2 ===
                  1
                    ? 'bg-white'
                    : 'bg-green-300'} p-2"
                >
                  <div class="w-1/3 font-medium text-right pr-4">
                    ${item.label}
                  </div>
                  <div class="w-2/3">
                    <${pageSetting}
                      value=${settings[item.key]}
                      setfn=${(value) => handleChange(item.key, value)}
                      type=${item.type}
                      options=${item.options}
                      class="w-full"
                      error=${errors[item.key]}
                    />
                  </div>
                </div>
              `
            )}

            <div
              class="flex items-center w-full justify-center bg-gray-400 p-2 mt-1"
            >
              <div class="w-1/3 font-medium text-right pr-4">
                ${settings.check_ip ? 'DHCP' : 'Static IP'}
              </div>
              <div class="w-2/3">
                <${Setting}
                  value=${settings.check_ip}
                  setfn=${(value) => handleChange('check_ip', value)}
                  type="switch"
                  class="w-full"
                />
              </div>
            </div>

            ${!settings.check_ip &&
            html`
              ${[
                { label: 'IP address', key: 'ip_addr' },
                { label: 'Subnet mask', key: 'sb_mask' },
                { label: 'Default gateway', key: 'gateway' }
                //{ label: 'MAC address', key: 'macaddr' }
              ].map(
                (item, index) => html`
                  <div
                    class="flex items-center w-full justify-center ${index %
                      2 ===
                    1
                      ? 'bg-white'
                      : 'bg-green-300'} p-2"
                  >
                    <div class="w-1/3 font-medium text-right pr-4">
                      ${item.label}
                    </div>
                    <div class="w-2/3">
                      <${pageSetting}
                        value=${settings[item.key]}
                        setfn=${(value) => handleChange(item.key, value)}
                        type="text"
                        class="w-full"
                        error=${errors[item.key]}
                      />
                    </div>
                  </div>
                `
              )}
            `}

            <div class="w-full text-center font-bold bg-gray-400 p-2 mt-1">
              API settings
            </div>

            <div
              class="flex items-center w-full justify-center bg-green-300 p-2"
            >
              <div class="w-1/3 font-medium text-right pr-4">Token</div>
              <div class="w-2/3">
                <${Setting}
                  value=${settings.token}
                  setfn=${(value) => handleChange('token', value)}
                  type="text"
                  class="w-full"
                />
              </div>
            </div>

            <div
              class="flex items-center w-full justify-center bg-gray-400 p-2 mt-1"
            >
              <div class="w-1/3 font-medium text-right pr-4">MQTT</div>
              <div class="w-2/3">
                <${Setting}
                  value=${settings.check_mqtt}
                  setfn=${(value) => handleChange('check_mqtt', value)}
                  type="switch"
                  class="w-full"
                />
              </div>
            </div>

            ${settings.check_mqtt
              ? html`
                  ${[
                    { label: 'Host', key: 'mqtt_hst', type: 'text' },
                    { label: 'Port', key: 'mqtt_prt', type: 'number' },
                    { label: 'Client', key: 'mqtt_clt', type: 'text' },
                    { label: 'User', key: 'mqtt_usr', type: 'text' },
                    { label: 'Password', key: 'mqtt_pswd', type: 'password' },
                    { label: 'TX topic', key: 'txmqttop', type: 'text' },
                    { label: 'RX topic', key: 'rxmqttop', type: 'text' }
                  ].map(
                    (item, index) => html`
                      <div
                        class="flex items-center w-full justify-center ${index %
                          2 ===
                        1
                          ? 'bg-white'
                          : 'bg-green-300'} p-2"
                      >
                        <div class="w-1/3 font-medium text-right pr-4">
                          ${item.label}
                        </div>
                        <div class="w-2/3">
                          <${pageSetting}
                            value=${settings[item.key]}
                            setfn=${(value) => handleChange(item.key, value)}
                            type=${item.type}
                            class="w-full"
                            error=${errors[item.key]}
                          />
                        </div>
                      </div>
                    `
                  )}
                `
              : null}

            <div class="w-full text-center font-bold bg-gray-400 p-2 mt-1">
              Coordinate settings
            </div>
            <div
              class="flex items-center w-full justify-center bg-green-300 p-2"
            >
              <div class="w-1/3 font-medium text-right pr-4">Longitude</div>
              <div class="w-2/3">
                <${Setting}
                  value=${settings.lon_de}
                  setfn=${(value) => handleChange('lon_de', value)}
                  type="text"
                  class="w-full"
                />
              </div>
            </div>
            <div class="flex items-center w-full justify-center bg-white p-2">
              <div class="w-1/3 font-medium text-right pr-4">Latitude</div>
              <div class="w-2/3">
                <${Setting}
                  value=${settings.lat_de}
                  setfn=${(value) => handleChange('lat_de', value)}
                  type="text"
                  class="w-full"
                />
              </div>
            </div>

            <div
              class="flex items-center w-full justify-center bg-green-300 p-2"
            >
              <div class="w-1/3 font-medium text-right pr-4">
                Sunrise: ${settings.sunrise}
              </div>
              <div class="w-2/3 flex items-center">
                <input
                  type="text"
                  value=${settings.sunrise_pins || ''}
                  onInput=${(e) => handleChange('sunrise_pins', e.target.value)}
                  maxlength="20"
                  placeholder="Action for sunrise"
                  class="w-1/2 mr-2 px-2 py-1 border rounded"
                />
                <${Setting}
                  value=${settings.onsunrise}
                  setfn=${(value) => handleChange('onsunrise', value)}
                  type="switch"
                  class="w-1/2"
                />
              </div>
            </div>
            <div class="flex items-center w-full justify-center bg-white p-2">
              <div class="w-1/3 font-medium text-right pr-4">
                Sunset: ${settings.sunset}
              </div>
              <div class="w-2/3 flex items-center">
                <input
                  type="text"
                  value=${settings.sunset_pins || ''}
                  onInput=${(e) => handleChange('sunset_pins', e.target.value)}
                  maxlength="20"
                  placeholder="Action for sunset"
                  class="w-1/2 mr-2 px-2 py-1 border rounded"
                />
                <${Setting}
                  value=${settings.onsunset}
                  setfn=${(value) => handleChange('onsunset', value)}
                  type="switch"
                  class="w-1/2"
                />
              </div>
            </div>
            <div
              class="flex items-center w-full justify-center bg-green-300 p-2"
            >
              <div class="w-1/3 font-medium text-right pr-4">Day Length</div>
              <div class="w-2/3">
                <span class="text-lg">${settings.dlength}</span>
              </div>
            </div>

            <div
              class="flex items-center w-full justify-center bg-gray-400 p-2"
            >
              <div class="w-1/3 font-medium text-right pr-4">
                Next full moon:
              </div>
              <div class="w-2/3">
                <span class="text-lg">
                  ${typeof settings.fullmoon === 'string' && settings.fullmoon
                    ? `${settings.fullmoon.split(' ')[0]} at ${
                        settings.fullmoon.split(' ')[1]
                      }`
                    : 'N/A'}
                </span>
              </div>
            </div>
<div class="flex items-center w-full justify-center bg-gray-400 p-2">
  <div class="w-1/3 font-medium text-right pr-4">[OFFLINE MODE] Date</div>
  <div class="w-2/3 flex items-center">
    <input
  type="text"
  name="offline_date"
  value=${settings.offline_date || ''}
  onInput=${(e) => handleChange('offline_date', e.target.value)}
  placeholder="д.м.гг"
  class=${`w-1/3 mr-2 px-2 py-1 border rounded ${
    errors.offline_date ? 'border-red-500' : ''
  } focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
    errors.offline_date ? 'focus-visible:ring-red-500' : ''
  }`}
/>
<span class="mr-4">Time</span>
<input
  type="text"
  name="offline_time"
  value=${settings.offline_time || ''}
  onInput=${(e) => handleChange('offline_time', e.target.value)}
  placeholder="чч:мм:сс"
  class=${`w-1/3 px-2 py-1 border rounded ${
    errors.offline_time ? 'border-red-500' : ''
  } focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
    errors.offline_time ? 'focus-visible:ring-red-500' : ''
  }`}
/>
  </div>
</div>
 <button 
    type="submit" 
    class=${`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
      submitButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
    }`}
    disabled=${submitButtonDisabled}
  >
    Save changes
  </button>
          </div>
        </form>
      </div>
      ${toast &&
      html`
        <div
          class="fixed bottom-5 right-5 ${toast.type === 'success'
            ? 'bg-green-500'
            : 'bg-red-500'} text-white px-4 py-2 rounded shadow-lg"
        >
          ${toast.message}
        </div>
      `}
    </div>
  `;
}


const App = function ({}) {
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState('/');
  const [user, setUser] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);

  const logout = () => fetch('api/logout').then((r) => setUser(''));
  const login = (r) =>
    !r.ok
      ? setLoading(false) && setUser(null)
      : r
          .json()
          .then((r) => setUser(r.user))
          .finally((r) => setLoading(false));

  useEffect(() => fetch('api/login').then(login), []);

  if (loading) return ''; // Show blank page on initial load
  if (!user)
    return html`<${Login}
      loginFn=${login}
      logoIcon=${Logo}
      title="Device Dashboard Login"
      tipText="To login, use: admin/admin, user1/user1, user2/user2"
    />`; // If not logged in, show login screen

  return html` <div class="min-h-screen bg-slate-100" id="mains">
    <${Sidebar} url=${url} show=${showSidebar} />
    <${Header}
      logout=${logout}
      user=${user}
      showSidebar=${showSidebar}
      setShowSidebar=${setShowSidebar}
    />
    <div
      class="${showSidebar && 'pl-72'} transition-all duration-300 transform"
    >
      <${Router}
        onChange=${(ev) => setUrl(ev.url)}
        history=${History.createHashHistory()}
      >
        <${Main} default=${true} />
        <${TabSelect} path="selects" />
        <${TabSwitch} path="switch" />
        <${TabButton} path="button" />
        <${TabEncoder} path="encoder" />
        <${TabCron} path="cron" />
        <${TabOneWire} path="1wire" />
        <${TabSecurity} path="Security" />
        <${Settings} path="settings" />
        <${FirmwareUpdate} path="update" />
      <//>
    <//>
  <//>`;
};

window.onload = () => render(h(App), document.body);
