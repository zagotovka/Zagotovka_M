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

import { TabSelect } from './Tabs/TabSelect.js';
import { TabSwitch } from './Tabs/TabSwitch.js';
import { TabButton } from './Tabs/TabButton.js';
import { TabEncoder } from './Tabs/TabEncoder.js';
import { TabCron } from './Tabs/TabCron.js';
import { TabOneWire } from './Tabs/TabOneWire.js';
import { TabSecurity } from './Tabs/TabSecurity.js';
import { Settings } from './Tabs/Settings.js';
import { ModalSwitch } from './Modals/ModalSwitch.js';
import { ModalEncoder } from './Modals/ModalEncoder.js';
import { ModalCron } from './Modals/ModalCron.js';
import { ModalOneWire } from './Modals/ModalOneWire.js';
import { ModalEditSensor } from './Modals/ModalEditSensor.js';
import { ModalSIM800L } from './Modals/ModalSIM800L.js';
import { ModalButton } from './Modals/ModalButton.js';
import { ModalSecurity } from './Modals/ModalSecurity.js';

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
      class="bg-white/40 backdrop-blur-md border-b border-white/40 shadow-sm sticky top-0 z-[48] w-full py-2 ${showSidebar
      ? 'pl-72'
      : ''} transition-all duration-300 transform"
    >
      <div class="px-4 w-full py-0 my-0 flex items-center justify-between">
        <button
          type="button"
          onclick=${() => setShowSidebar((v) => !v)}
          class="text-slate-500 hover:text-teal-500 transition-colors"
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
            class="hidden lg:block lg:h-4 lg:w-px lg:bg-slate-200/60"
            aria-hidden="true"
          ></div>
          <${Button} title="Logout" icon=${Icons.logout} onclick=${logout}
  colors="bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 shadow-md hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
  cls="rounded-full font-bold"
/>
        </div>
      </div>
    </div>
  `;
}

function Sidebar({ url, show }) {
  const NavLink = ({ title, icon, href, url }) => html`
  <div>
    <a href="#${href}" class="${href == url
      ? 'bg-gradient-to-r from-teal-400 to-cyan-500 text-white shadow-md group'
      : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-800 group'
    } flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
      <${icon} class="w-6 h-6"/>
      ${title}
    <///>
  <//>`;
  return html` <div
    class="hs-overlay hs-overlay-open:translate-x-0
            -translate-x-full transition-all duration-300 transform
            fixed top-0 left-0 bottom-0 z-[60] w-72
            bg-white/60 backdrop-blur-md border-r border-white/40 shadow-xl
            overflow-y-auto scrollbar-y
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

function Events({ }) {
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

export function Chart({ data }) {
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

export function DeveloperNote({ text, children }) {
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

function Main({ }) {
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

export const MyPolzunok = ({ value, onChange }) => {
  const handleSliderChange = (e) => {
    onChange(e.target.checked ? 1 : 0);
  };

  return html`
    <div class="flex items-center gap-3">
      <label class="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          class="sr-only peer"
          checked=${value}
          onChange=${handleSliderChange}
        />
        <div class="w-[42px] h-[22px] bg-slate-200/80 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-300/50 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-teal-400 peer-checked:to-cyan-500 shadow-inner"></div>
      </label>
      <span class="text-sm font-medium text-slate-600 w-8">${value ? 'On' : 'Off'}</span>
    </div>
  `;
};

// -> Extracted TabSelect to Tabs/TabSelect.js


// Добавлен параметр cache: 'no-store' для отключения кэширования
// -> Extracted ModalSwitch to Modals/ModalSwitch.js


// -> Extracted TabSwitch to Tabs/TabSwitch.js


// -> Extracted ModalButton to Modals/ModalButton.js


// -> Extracted TabButton to Tabs/TabButton.js


// Добавлен параметр cache: 'no-store' для отключения кэширования
// Добавлен параметр cache: 'no-store' для отключения кэширования
// -> Extracted ModalEncoder to Modals/ModalEncoder.js


// -> Extracted TabEncoder to Tabs/TabEncoder.js


//FIXME:  Переменная onoff не передается в модальное окно! А вот из мольдального окна передается в таблицу!
// -> Extracted ModalCron to Modals/ModalCron.js

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

function FirmwareUpdate({ }) {
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

export const pageSetting = ({ value, setfn, type, options, error, ...props }) => {
  let inputElement;
  const inputClass = `w-full px-3 py-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'
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

export const ipRegex =
  /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/;

export const subnetMaskRegex =
  /^(((0|128|192|224|240|248|252|254)\.(0|128|192|224|240|248|252|254)\.(0|128|192|224|240|248|252|254)\.(0|128|192|224|240|248|252|254))|(255\.(0|255)\.(0|255)\.(0|255))|(255\.255\.(0|255)\.(0|255))|(255\.255\.255\.(0|255)))$/;

//const macAddressRegex = /^[0-9a-fA-F]{2}(-[0-9a-fA-F]{2}){5}$/;

export function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return html`
    <div
      class=${`fixed bottom-4 right-4 p-4 rounded-md ${type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`}
    >
      ${message}
    </div>
  `;
}

const App = function ({ }) {
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
