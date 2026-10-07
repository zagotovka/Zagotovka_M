import { lockToggle } from '../helpLock.js';


import { ModalCron } from '../Modals/ModalCron.js';
import { ModalPwmCron } from '../Modals/ModalPwmCron.js';
import { h, render, useState, useEffect, useRef, html, Router } from '../bundle.js';
import { registerPoll, unregisterPoll } from '../pollQueue.js';
import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';
import { MyPolzunok, Chart, DeveloperNote } from '../main.js';
import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire } from '../rulang.js';
import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire } from '../enlang.js';
import { condHelpTitle } from '../condlib.js';

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
    position: 'fixed',
    zIndex: '99999',
    maxWidth: '280px',
    background: '#1a2332',
    color: '#e8f4f8',
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid rgba(0,188,188,0.35)',
    fontSize: '12px',
    lineHeight: '1.6',
    boxShadow: '0 6px 20px rgba(0,0,0,0.45)',
    pointerEvents: 'none',
    whiteSpace: 'normal',
    display: 'none',
    transition: 'opacity 0.12s ease',
    opacity: '0',
  });
  document.body.appendChild(tip);

  let hideTimer = null;

  function show(el) {
    clearTimeout(hideTimer);
    tip.innerHTML = el.dataset.tip;
    tip.style.display = 'block';

    tip.style.opacity = '0';
    tip.style.left = '0px';
    tip.style.top = '0px';

    requestAnimationFrame(() => {
      const tw = tip.offsetWidth;
      const th = tip.offsetHeight;
      const vw = window.innerWidth;
      const r = el.getBoundingClientRect();

      let left = r.left + r.width / 2 - tw / 2;
      left = Math.max(8, Math.min(left, vw - tw - 8));

      let top = r.top - th - 8;
      if (top < 8) top = r.bottom + 8;

      tip.style.left = left + 'px';
      tip.style.top = top + 'px';
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

function TabCron({ }) {
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
  const isPendingOnOff = useRef(false);

  // Инициализируем глобальный tooltip один раз при монтировании
  useEffect(() => { initGlobalTooltip(); }, []);

  useEffect(() => {
    let active = true;

    registerPoll('cron', '/api/cron/get', function(r) {
      if (!active || isPendingOnOff.current) return;
      if (r !== null && r !== undefined && Array.isArray(r.timers)) {
        setCron(r.timers);
        setLanguage(r.lang || 'ru');
        if (typeof r.numline === 'number') {
          setNumline(r.numline);
          setVisibleCrons(r.numline);
        }
      }
    }, {immediate: true});

    return function() {
      active = false;
      unregisterPoll('cron');
    };
  }, []);

  const sendNumlineToStm32 = (value) => {
    isPendingOnOff.current = true;
    fetch('/api/numline/set', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numline: value })
    })
      .then((response) => response.json())
      .catch((error) => console.error('Error sending Crone line to stm32:', error))
      .finally(() => {
        setTimeout(() => {
          isPendingOnOff.current = false;
        }, 1500);
      });
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
      <div class="mytext space-y-6 font-sans text-base leading-relaxed text-slate-700 [&_code]:font-sans [&_code]:font-semibold [&_pre]:font-sans">
        <section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Управление по SMS и DTMF</h2>
          <div><h4 class="text-lg font-bold text-black mt-4 mb-2">Рубильник On/Off по SMS и DTMF</h4><p class="mb-2">Ползунок On/Off любой строки этой страницы можно переключить с телефона, номер которого указан в настройках SIM800L: SMS-сообщением или во время звонка (тональный набор DTMF). Формат команды одинаков на всех страницах: <b>ID#КОД*</b>, где ID - число из колонки ID нужной строки.</p><table class="w-full border-collapse my-2 bg-white/70"><thead><tr><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">Действие</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">SMS</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">DTMF (во время звонка)</th></tr></thead><tbody><tr><td class="border px-3 py-1">Отключить строку (ползунок Off)</td><td class="border px-3 py-1"><code>5#33*</code></td><td class="border px-3 py-1"><code>5#33*#</code></td></tr><tr><td class="border px-3 py-1">Включить строку (ползунок On)</td><td class="border px-3 py-1"><code>5#44*</code></td><td class="border px-3 py-1"><code>5#44*#</code></td></tr></tbody></table><p class="mb-2">В таблице ID = 5 - это пример, подставьте ID своей строки.</p><p class="mb-2">Несколько команд подряд: <code>5#33*7#44*</code> (SMS) и <code>5#33*7#44*#</code> (звонок). Ввод во время звонка всегда завершается символами <code>*#</code>: последняя команда уже заканчивается на <code>*</code>, поэтому в конце добавляется только <code>#</code>.</p><p class="mb-2">Коды для всех страниц: Button, Switch, Encoder, OneWire, Security, Zigbee - <b>00</b> (выкл) и <b>11</b> (вкл); Cron - <b>33</b> и <b>44</b>; PID - <b>55</b> и <b>66</b>.</p><p class="mb-2">В ответ приходит SMS-отчёт, например <code>OnOff: Cron5=OFF</code> (отчёт отправляется, только если включён общий ползунок SIM800L). Неверные команды попадают в список Invld pins/cmd.</p><p class="mb-2">Нумерация строк Cron в колонке ID начинается с 0. Доступны только строки, видимые на странице (в пределах заданного количества строк).</p></div>
        </section>
        <section class="rounded-2xl border-2 bg-indigo-50 border-indigo-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Формат CRON</h2>
          <p>Шаблон Cron состоит из семи полей, разделённых пробелами. Длина поля Cron - до 34 символов.</p>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Формат CRON: поля</h3>
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">№</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Поле</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Допустимые значения</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">1</td>
                <td class="border px-4 py-2">Секунда</td>
                <td class="border px-4 py-2">0-59</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">2</td>
                <td class="border px-4 py-2">Минута</td>
                <td class="border px-4 py-2">0-59</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">3</td>
                <td class="border px-4 py-2">Час</td>
                <td class="border px-4 py-2">0-23</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">4</td>
                <td class="border px-4 py-2">День месяца</td>
                <td class="border px-4 py-2">1-31</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">5</td>
                <td class="border px-4 py-2">Месяц</td>
                <td class="border px-4 py-2">1-12</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">6</td>
                <td class="border px-4 py-2">День недели</td>
                <td class="border px-4 py-2">0-7</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">7</td>
                <td class="border px-4 py-2">Год</td>
                <td class="border px-4 py-2">1970-3000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Примеры CRON</h3>
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">CRON</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">* * * * * * *</td>
                <td class="border px-4 py-2">CRON выполняется каждую секунду.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">0 * * * * * *</td>
                <td class="border px-4 py-2">CRON выполняется в начале каждой минуты.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">* * * * * 2 *</td>
                <td class="border px-4 py-2">CRON выполняется каждый вторник в течение всего дня.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">0 0 13-15 * * 2-4 *</td>
                <td class="border px-4 py-2">CRON выполняется в 13:00, 14:00 и 15:00 по вторникам, средам и четвергам.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">*/5 * * * * * *</td>
                <td class="border px-4 py-2">CRON выполняется каждые 5 секунд, начиная с 0.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">*/5 */5 * * * * *</td>
                <td class="border px-4 py-2">CRON выполняется каждые 5 секунд каждые 5 минут, с 00:00 до 55:55.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">0 0 0 * * 5 *</td>
                <td class="border px-4 py-2">CRON выполняется каждую пятницу в полночь.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">0 0 */2 * * * *</td>
                <td class="border px-4 py-2">CRON выполняется каждые 2 часа в начале часа.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">* * */2 * * * *</td>
                <td class="border px-4 py-2">CRON выполняется каждую секунду каждые 2 часа (0, 2, 4, ..., 22).</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">0 0 0 * * 1-5 *</td>
                <td class="border px-4 py-2">CRON выполняется в полночь каждую неделю с понедельника по пятницу.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">15 23 */6 * * * *</td>
                <td class="border px-4 py-2">CRON выполняется каждые 6 часов в (мин:сек) 23:15.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">0 0 0 1 * * *</td>
                <td class="border px-4 py-2">CRON выполняется в начале каждого месяца в 00:00:00.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">0 0 0 1 */3 * *</td>
                <td class="border px-4 py-2">CRON выполняется в начале каждого квартала в 00:00:00.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">10 15 20 * 8 6 *</td>
                <td class="border px-4 py-2">CRON выполняется в 20:15:20 каждую субботу в августе.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">10 15 20 8 * 6 *</td>
                <td class="border px-4 py-2">CRON выполняется в 20:15:20 каждую субботу, которая также является 8-м днем месяца.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">30-45 * * * * * *</td>
                <td class="border px-4 py-2">CRON выполняется каждую секунду между 30 и 45.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">30-45/3 * * * * * *</td>
                <td class="border px-4 py-2">CRON выполняется каждые 3 секунды в каждую минуту, когда секунды находятся между 30 и 45.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">0 23/1 * * * * *</td>
                <td class="border px-4 py-2">CRON выполняется в начале каждой минуты, когда минуты находятся между 23 и 59.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">50-10 * * * * * *</td>
                <td class="border px-4 py-2">CRON выполняется каждую секунду в диапазоне от 50 до 59 и от 00 до 10 (режим переполнения).</td>
              </tr>
            </tbody>
          </table>
        </div>
        </section>
        <section class="rounded-2xl border-2 bg-emerald-50 border-emerald-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Формат Script (ACTION)</h2>
          <p>Одно действие записывается как <b>ID:команда</b>, например <code>18:1</code>. Несколько действий и паузы пишутся через запятую, без пробелов.</p>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Примеры ACTION</h3>
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">ACTION</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">18:1,p5,18:0</td>
                <td class="border px-4 py-2">18-й пин включится (ON) в указанное время (CRON), будет гореть 5 сек. и после паузы отключится (OFF).</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">p5,12:2</td>
                <td class="border px-4 py-2">После срабатывания CRON пройдёт пауза 5 сек., затем 12-й пин сменит своё состояние (TOGGLE).</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Обозначения в Script</h3>
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Символ</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Значение</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">0</td>
                <td class="border px-4 py-2">Откл (OFF)</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">1</td>
                <td class="border px-4 py-2">Вкл (ON)</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">2</td>
                <td class="border px-4 py-2">Смена состояния (TOGGLE)</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">p</td>
                <td class="border px-4 py-2">Пауза в секундах: <code>p5</code> - пауза 5 секунд</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">,</td>
                <td class="border px-4 py-2">Разделитель действий</td>
              </tr>
            </tbody>
          </table>
        </div>
        </section>
        <section class="rounded-2xl border-2 bg-violet-50 border-violet-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">PWM: Sunrise и Sunset</h2>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Sunrise / Sunset</h3>
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Тип</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">Sunrise (Восход)</td>
                <td class="border px-4 py-2">Нажмите кнопку <b>PWM</b> для настройки. Укажите <b>Start Duty</b> (начальная скважность, например 0) и <b>End Duty</b> (конечная скважность, например 100). Плавное увеличение скважности (яркости) будет происходить в течение времени, заданного в <b>Duration (Sec)</b> (от 1 до 864000 секунд).</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">Sunset (Закат)</td>
                <td class="border px-4 py-2">Для эффекта заката укажите <b>Start Duty</b> = 100, а <b>End Duty</b> = 0. Переход будет плавно уменьшать скважность на протяжении заданного в <b>Duration (Sec)</b> времени.</td>
              </tr>
            </tbody>
          </table>
        </div>
        </section>
        <section class="rounded-2xl border-2 bg-amber-50 border-amber-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">${condHelpTitle(true)}</h2>
          <div class="space-y-3">
<p class="text-slate-600 italic mb-2">Таймер сработал, но сделай только если...</p>
          <p class="mb-2">Обычный таймер делает одно и то же в заданное время и всегда. Условие добавляет к действию слова «но только если». Например: «в 18:00 включить свет, но только если уже темно».</p>
          <p class="mb-2">Условие - это «замок» на одном действии в поле <b>Script</b>. Когда наступает время таймера (поле <b>Cron</b>), прошивка проверяет условие каждого действия отдельно. Если условие верно (ДА) - действие выполняется. Если неверно (НЕТ) - это действие молча пропускается, а остальные действия в той же строке выполняются как обычно. Если условия нет - действие выполняется всегда.</p>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Как записать условие: три шага</h4>
          <ol class="list-decimal ml-6 mb-3 space-y-1">
            <li>Нажмите <b>Edit</b> у нужной строки. В поле <b>Script</b> запишите действие как обычно: <code>${'18:1'}</code> (пин 18, включить).</li>
            <li>Сразу после него, <b>без пробелов</b>, поставьте знак <b>?</b>: <code>${'18:1?'}</code></li>
            <li>Допишите условие: <code>${'18:1?Ss'}</code>. Читаем так: «включить пин 18, но только если сейчас ночь». Нажмите <b>Save changes</b>.</li>
          </ol>
          <p class="mb-3">Общий вид: <code>${'ID:команда?условие'}</code>. Команда: <b>0</b> - выключить, <b>1</b> - включить, <b>2</b> - переключить на противоположное. Несколько действий пишутся через <b>запятую</b> (не через точку с запятой и без пробелов), и у каждого может быть своё условие или не быть никакого. Время срабатывания по-прежнему задаётся в поле <b>Cron</b>, условие его не заменяет.</p>

          <div class="p-4 rounded-xl bg-white/80 border border-amber-300 mb-3">
            <p class="font-bold mb-1">Пример из жизни: свет в саду</p>
            <p class="mb-1">Хотим, чтобы каждый день в 18:00 включался садовый светильник (пин 18). Но летом в 18:00 ещё светло, и лампа горела бы зря. Поэтому добавляем условие «только если уже темно».</p>
            <p class="mb-1">В поле Cron пишем: <code>${'0 0 18 * * * *'}</code></p>
            <p class="mb-1">В поле Script пишем: <code>${'18:1?Ss'}</code></p>
            <p>Результат: зимой, когда в 18:00 уже темно (Ss), свет включится. Летом, когда ещё светло, действие будет пропущено. Чтобы Sr и Ss работали, на странице «Global Settings» должно быть настроено время восхода и заката.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/80 border border-amber-300 mb-3">
            <p class="font-bold mb-1">Пример из жизни: обогреватель сам следит за температурой</p>
            <p class="mb-1">Берём две строки таймера, обе срабатывают каждую минуту (Cron: <code>${'0 * * * * * *'}</code>).</p>
            <p class="mb-1">Первая строка, Script: <code>${'7:1?T5<18'}</code> - если на датчике 5 холоднее 18 градусов, включить обогреватель (пин 7).</p>
            <p class="mb-1">Вторая строка, Script: <code>${'7:0?T5>22'}</code> - если теплее 22 градусов, выключить обогреватель.</p>
            <p>Результат: таймер каждую минуту «смотрит» на температуру и сам включает и выключает обогреватель. Между 18 и 22 градусами ничего не происходит. Для таких частых таймеров используйте команды 0 и 1, а команду 2 (переключить) не используйте: она будет переключать устройство при каждом срабатывании.</p>
          </div>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Из чего строится условие (слова)</h4>
          <p class="mb-2">Число после буквы - это <b>ID</b> устройства из таблицы на соответствующей странице.</p>
          <table class="w-full bg-white/70 mb-3">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Запись</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Как читать</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'D5'}</code></td><td class="border px-4 py-2">Устройство (пин DEVICE) с ID 5 сейчас ВКЛючено. Для Zigbee-устройства - оно включено.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'!D5'}</code></td><td class="border px-4 py-2">Пин с ID 5 сейчас ВЫКЛючен (знак ! означает «НЕ»).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3>0'}</code></td><td class="border px-4 py-2">Диммер (ШИМ) с ID 3 светит (значение больше нуля). Для Zigbee - яркость устройства.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3=100'}</code></td><td class="border px-4 py-2">Значение диммера 3 ровно 100. У ШИМ-диммера шкала 0-100 (проценты), поэтому это полная яркость. Для Zigbee - значение, которое отдаёт само устройство.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3g50'}</code></td><td class="border px-4 py-2">Значение диммера 3 равно 50 или БОЛЬШЕ (буква g - «greater»).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3l50'}</code></td><td class="border px-4 py-2">Значение диммера 3 равно 50 или МЕНЬШЕ (буква l - «less»).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'B1'}</code></td><td class="border px-4 py-2">Кнопка с ID 1 сейчас нажата.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'BU1'}</code></td><td class="border px-4 py-2">Кнопка с ID 1 сейчас НЕ нажата.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'BH1'}</code></td><td class="border px-4 py-2">Кнопка с ID 1 сейчас удерживается (долгое нажатие).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5>25.5'}</code></td><td class="border px-4 py-2">Температура датчика 5 больше 25.5 градусов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5<10'}</code></td><td class="border px-4 py-2">Температура датчика 5 меньше 10 градусов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5.2>25.5'}</code></td><td class="border px-4 py-2">Температура второго датчика на шине DS18B20 пина 5 больше 25.5 градусов (.2 - номер датчика на шине; без .номер берётся первый исправный).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'H4>50'}</code></td><td class="border px-4 py-2">Влажность датчика 4 больше 50 процентов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'H4<30'}</code></td><td class="border px-4 py-2">Влажность датчика 4 меньше 30 процентов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Sr'}</code></td><td class="border px-4 py-2">День: сейчас время между восходом и закатом. Берётся из времени восхода/заката в «Global Settings».</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Ss'}</code></td><td class="border px-4 py-2">Ночь: сейчас время между закатом и восходом. Если время восхода/заката не настроено, Sr и Ss оба считаются НЕТ.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'C3'}</code></td><td class="border px-4 py-2">Подставить готовое условие из ячейки C3 (ячейки хранятся на странице «Global Settings», строка Conditions). Вложенность - не глубже двух уровней.</td></tr>
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
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'= > < g l'}</code></td><td class="border px-4 py-2">Равно, больше, меньше; g - больше или равно, l - меньше или равно (можно писать и <code>${'>='}</code>, <code>${'<='}</code>)</td><td class="border px-4 py-2"><code>${'T5>25.5'}</code>, <code>${'DV3=100'}</code>, <code>${'DV3l50'}</code></td></tr>
            </tbody>
          </table>
          <p class="mb-3 text-slate-600">Совет: если в одном условии смешиваете & и |, всегда ставьте скобки. Так результат будет именно тот, который вы задумали. Без скобок порядок такой: сначала !, потом &, потом | (то есть <code>${'D1|D2&D3'}</code> читается как <code>${'D1|(D2&D3)'}</code>). Числа у температуры и влажности пишутся как обычно: <code>${'T5>25'}</code> и <code>${'T5>25.0'}</code> - одно и то же, после точки допускается одна цифра.</p>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Готовые примеры - просто скопируйте в поле Script</h4>
          <table class="w-full bg-white/70 mb-3">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что вписать в поле Script</th>
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
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?!(D1&D2)'}</code></td><td class="border px-4 py-2">Включить пин 6, если устройство 1 и устройство 2 НЕ включены одновременно.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?Ss'}</code></td><td class="border px-4 py-2">Включить пин 6, только если сейчас ночь (Ss).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:0?Sr'}</code></td><td class="border px-4 py-2">Выключить пин 6, только если сейчас день (Sr).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?Ss&B1'}</code></td><td class="border px-4 py-2">Включить пин 6, если сейчас ночь (Ss) и нажата кнопка 1.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?Ss|D1'}</code></td><td class="border px-4 py-2">Включить пин 6, если сейчас ночь (Ss) ИЛИ включено устройство 1.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?BU1'}</code></td><td class="border px-4 py-2">Включить пин 6, только если кнопка 1 не нажата.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?BH1'}</code></td><td class="border px-4 py-2">Включить пин 6, только если кнопка 1 удерживается.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5>25.5'}</code></td><td class="border px-4 py-2">Включить пин 6, если на датчике 5 жарче 25.5 градусов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5<18'}</code></td><td class="border px-4 py-2">Включить пин 6, если на датчике 5 холоднее 18 градусов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5.2>25.5'}</code></td><td class="border px-4 py-2">Включить пин 6, если второй датчик на шине пина 5 показывает больше 25.5 градусов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?H4>50'}</code></td><td class="border px-4 py-2">Включить пин 6, если влажность на датчике 4 выше 50 процентов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?H4<30'}</code></td><td class="border px-4 py-2">Включить пин 6, если влажность на датчике 4 ниже 30 процентов.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5>25&H4>60&!D7'}</code></td><td class="border px-4 py-2">Включить пин 6, если жарко, влажно и вентилятор (устройство 7) ещё не включён.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:0?Sr&T5<20'}</code></td><td class="border px-4 py-2">Выключить пин 6, если сейчас день (Sr) и при этом холодно.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?(T5>28|H4>70)&Sr'}</code></td><td class="border px-4 py-2">Включить пин 6, если сейчас день (Sr) и при этом жарко или очень влажно.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3>0'}</code></td><td class="border px-4 py-2">Включить пин 6, только если диммер 3 светит (значение больше нуля).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3=100'}</code></td><td class="border px-4 py-2">Включить пин 6, только если диммер 3 горит на полную яркость (100).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3g50'}</code></td><td class="border px-4 py-2">Включить пин 6, только если значение диммера 3 равно 50 или больше.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3l50'}</code></td><td class="border px-4 py-2">Включить пин 6, только если значение диммера 3 равно 50 или меньше.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3>0&Ss'}</code></td><td class="border px-4 py-2">Включить пин 6, если диммер 3 светит и сейчас ночь (Ss).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D93'}</code></td><td class="border px-4 py-2">Включить пин 6, только если Zigbee-устройство с ID 93 включено (ID Zigbee-устройств начинаются с 89).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV93g100'}</code></td><td class="border px-4 py-2">Включить пин 6, только если яркость Zigbee-устройства 93 равна 100 или больше.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'93.1:2?D2'}</code></td><td class="border px-4 py-2">Zigbee: слот 93, sub-action 1, переключить - только если устройство 2 включено.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5<25|D1'}</code></td><td class="border px-4 py-2">Включить пин 6, если на датчике 5 ниже 25 градусов ИЛИ включено устройство 1 (особый случай при неисправном датчике - см. правила ниже).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?C3'}</code></td><td class="border px-4 py-2">Включить пин 6, только если верно готовое условие из ячейки C3.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'pwm:5,600,0,100?Ss'}</code></td><td class="border px-4 py-2">Плавный разгон диммера 5 с 0 до 100 процентов за 600 секунд, только если сейчас ночь (Ss). У pwm-действия условие пишется в самом конце, после последнего числа.</td></tr>
            </tbody>
          </table>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Несколько действий в одном поле, в том числе с паузой</h4>
          <p class="mb-2">Пауза записывается как <b>p</b> и число секунд: <code>${'p600'}</code> - ждать 600 секунд. Всё, что стоит после паузы, выполнится, когда пауза закончится.</p>
          <table class="w-full bg-white/70 mb-3">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что вписать в поле Script</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что произойдёт</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D2,7:0?!D2'}</code></td><td class="border px-4 py-2">Два действия сразу: пин 6 включить, если устройство 2 включено; пин 7 выключить, если устройство 2 выключено.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1,7:0?D2'}</code></td><td class="border px-4 py-2">Пин 6 включить всегда; пин 7 выключить только если устройство 2 включено.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D1,12:1?!D1,18:0'}</code></td><td class="border px-4 py-2">Три действия: пин 6 включить, если устройство 1 включено; пин 12 включить, если устройство 1 выключено; пин 18 выключить всегда.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'18:1?Ss,p600,18:0'}</code></td><td class="border px-4 py-2">Включить пин 18, если сейчас ночь; через 600 секунд (10 минут) выключить пин 18 в любом случае. Условие стоит на действии, а не на паузе p600.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'18:1,p600,18:0?Sr'}</code></td><td class="border px-4 py-2">Включить пин 18; через 10 минут выключить его, но только если к тому времени уже день. Условие после паузы проверяется в момент окончания паузы.</td></tr>
            </tbody>
          </table>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Готовые пары: что вписать в Cron и что в Script</h4>
          <table class="w-full bg-white/70 mb-3">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Cron (когда)</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Script (что и при каком условии)</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что произойдёт</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'0 0 18 * * * *'}</code></td><td class="border px-4 py-2 whitespace-nowrap"><code>${'18:1?Ss'}</code></td><td class="border px-4 py-2">Каждый день в 18:00: включить свет (пин 18), только если уже темно.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'0 30 6 * * * *'}</code></td><td class="border px-4 py-2 whitespace-nowrap"><code>${'18:0?Sr'}</code></td><td class="border px-4 py-2">Каждый день в 6:30: выключить свет (пин 18), только если уже день.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'0 0 7 * * 1-5 *'}</code></td><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?!D3'}</code></td><td class="border px-4 py-2">По будням в 7:00: включить пин 6, только если пин 3 сейчас выключен.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'0 * * * * * *'}</code></td><td class="border px-4 py-2 whitespace-nowrap"><code>${'7:1?T5<18'}</code></td><td class="border px-4 py-2">Каждую минуту: если на датчике 5 холоднее 18 градусов - включить обогреватель (пин 7).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'0 * * * * * *'}</code></td><td class="border px-4 py-2 whitespace-nowrap"><code>${'7:0?T5>22'}</code></td><td class="border px-4 py-2">Каждую минуту: если на датчике 5 теплее 22 градусов - выключить обогреватель (пин 7). Пара с предыдущей строкой: между 18 и 22 градусами ничего не меняется, и обогреватель не «дёргается».</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'0 */5 * * * * *'}</code></td><td class="border px-4 py-2 whitespace-nowrap"><code>${'9:1?H4>70'}</code></td><td class="border px-4 py-2">Каждые 5 минут: если влажность на датчике 4 выше 70 процентов - включить вытяжку (пин 9).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'0 0 22 * * * *'}</code></td><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:0,7:0?!D1'}</code></td><td class="border px-4 py-2">В 22:00: пин 6 выключить всегда, а пин 7 выключить, только если устройство 1 выключено.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'0 0 19 * * * *'}</code></td><td class="border px-4 py-2 whitespace-nowrap"><code>${'pwm:5,600,0,100?Ss'}</code></td><td class="border px-4 py-2">В 19:00: если уже темно - плавно зажечь диммер 5 за 10 минут.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'0 0 10 * * 6 *'}</code></td><td class="border px-4 py-2 whitespace-nowrap"><code>${'12:1?T5>25&Sr'}</code></td><td class="border px-4 py-2">По субботам в 10:00: если сейчас день и на датчике 5 жарче 25 градусов - включить вентилятор (пин 12).</td></tr>
            </tbody>
          </table>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Важные правила</h4>
          <p class="rounded-xl border border-red-300 bg-red-50 px-4 py-2 font-bold text-red-700 mb-3">Не ставьте знак ? на паузу. Запись <code>${'p600?D2'}</code> неверна: если условие даст НЕТ, пауза не запустится, и все действия после неё выполнятся сразу. Условия пишите только на действиях.</p>
          <ul class="list-disc ml-6 mb-3 space-y-1">
            <li><b>Условие проверяется в момент срабатывания таймера</b> (по полю Cron) и для каждого действия отдельно. Если в этот момент было НЕТ - действие пропущено. Когда условие потом станет ДА, само по себе ничего не произойдёт: нужно дождаться следующего срабатывания таймера. Если условие нужно проверять почти постоянно, сделайте таймер частым, например каждую минуту (<code>${'0 * * * * * *'}</code>).</li>
            <li><b>Для действий после паузы</b> условие проверяется в момент окончания паузы, а не в момент старта таймера.</li>
            <li><b>Главный ползунок On/Off в строке таймера</b> сильнее любого условия: если он выключен, таймер игнорируется целиком.</li>
            <li><b>Условие работает только в поле Script.</b> Прямое управление устройством (ползунок On/Off у самого реле, команда API или MQTT прямо на реле) условия не проверяет.</li>
            <li><b>Частый таймер и команда 2.</b> Команда 2 (переключить) при каждом срабатывании меняет состояние на противоположное. Для частых таймеров с условиями используйте команды 0 и 1.</li>
            <li><b>Неисправный датчик</b> даёт ответ «неизвестно», и действие блокируется, даже если перед условием стоит !. Исключение: явная правда через |. Например <code>${'6:1?T5<25|D1'}</code> сработает при неисправном датчике 5, если устройство 1 включено.</li>
            <li><b>Если условие записано с ошибкой</b> (опечатка, лишний символ, пробел), страница таймеров при сохранении ничего не скажет, а действие будет молча пропускаться. Поэтому после сохранения проверьте условие на простом примере.</li>
            <li><b>Допустимые символы в условии:</b> латинские буквы, цифры и знаки ( ) ! & | = ${'>'} ${'<'} и точка. Пробелы не допускаются.</li>
            <li><b>Длина поля Script - до 254 символов</b> вместе с условиями (счётчик под полем). Чем длиннее условия, тем меньше действий поместится. Если условие длинное и нужно в нескольких местах, запишите его один раз в ячейку на странице «Global Settings» (строка Conditions, 12 ячеек) и пишите в действии коротко: <code>${'18:1?C3'}</code>. Берите то, что стоит после знака ?: в ячейку пишется только условие, например <code>${'Ss&T5>25'}</code>.</li>
            <li><b>Жёлтое предупреждение под полем Script</b> обычно значит, что действие ссылается на ячейку Conditions, которая была сброшена в 0. Такое действие заблокировано, пока в ячейке снова не будет верное условие.</li>
            <li><b>Если вы удалите устройство</b>, на которое ссылается условие, прошивка заменит такое условие на заведомо ложное <code>${'?0'}</code>. Действие перестанет срабатывать, но не станет безусловным. Задайте новое условие.</li>
            <li><b>Диммер (кнопка PWM у строки).</b> Условие для плавного разгона или затухания записывается в самом конце: <code>${'pwm:5,600,0,100?Ss'}</code>. Эту запись нужно вводить в поле Script обычной кнопкой Edit. Если потом открыть эту строку и сохранить через окно PWM, окно соберёт запись заново из четырёх чисел, и условие пропадёт: впишите его снова.</li>
          </ul>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-teal-50 border-teal-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">MQTT: отслеживание изменений</h2>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Swarm/timer/</h3>
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Топик</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">Swarm/timer/</td>
                <td class="border px-4 py-2">Данная страница отслеживает изменения таймеров и автоматически отправляет каждое изменение по MQTT на топик: Swarm/timer/. Где "Swarm" это Ваш 'TX topic'.</td>
              </tr>
            </tbody>
          </table>
        </div>
        </section>
      </div>
    `,
    en: html`
      <div class="mytext space-y-6 font-sans text-base leading-relaxed text-slate-700 [&_code]:font-sans [&_code]:font-semibold [&_pre]:font-sans">
        <section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Control by SMS and DTMF</h2>
          <div><h4 class="text-lg font-bold text-black mt-4 mb-2">On/Off switch by SMS and DTMF</h4><p class="mb-2">The On/Off slider of any row on this page can be switched from the phone number set in the SIM800L settings: by SMS or during a call (DTMF tones). The command format is the same on every page: <b>ID#CODE*</b>, where ID is the number from the ID column of the needed row.</p><table class="w-full border-collapse my-2 bg-white/70"><thead><tr><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">Action</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">SMS</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">DTMF (during a call)</th></tr></thead><tbody><tr><td class="border px-3 py-1">Turn the row off (slider Off)</td><td class="border px-3 py-1"><code>5#33*</code></td><td class="border px-3 py-1"><code>5#33*#</code></td></tr><tr><td class="border px-3 py-1">Turn the row on (slider On)</td><td class="border px-3 py-1"><code>5#44*</code></td><td class="border px-3 py-1"><code>5#44*#</code></td></tr></tbody></table><p class="mb-2">In the table ID = 5 is an example, use the ID of your own row.</p><p class="mb-2">Several commands in a row: <code>5#33*7#44*</code> (SMS) and <code>5#33*7#44*#</code> (call). Input during a call always ends with <code>*#</code>: the last command already ends with <code>*</code>, so only <code>#</code> is added at the end.</p><p class="mb-2">Codes for all pages: Button, Switch, Encoder, OneWire, Security, Zigbee - <b>00</b> (off) and <b>11</b> (on); Cron - <b>33</b> and <b>44</b>; PID - <b>55</b> and <b>66</b>.</p><p class="mb-2">An SMS report is sent back, for example <code>OnOff: Cron5=OFF</code> (the report is sent only if the common SIM800L slider is On). Wrong commands are listed in Invld pins/cmd.</p><p class="mb-2">Cron rows in the ID column are numbered from 0. Only rows visible on the page are available (within the configured number of lines).</p></div>
        </section>
        <section class="rounded-2xl border-2 bg-indigo-50 border-indigo-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">CRON format</h2>
          <p>The Cron pattern consists of seven space-separated fields. The Cron field length is up to 34 characters.</p>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">CRON format: fields</h3>
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">No</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Field</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Allowed values</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">1</td>
                <td class="border px-4 py-2">Second</td>
                <td class="border px-4 py-2">0-59</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">2</td>
                <td class="border px-4 py-2">Minute</td>
                <td class="border px-4 py-2">0-59</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">3</td>
                <td class="border px-4 py-2">Hour</td>
                <td class="border px-4 py-2">0-23</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">4</td>
                <td class="border px-4 py-2">Day of month</td>
                <td class="border px-4 py-2">1-31</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">5</td>
                <td class="border px-4 py-2">Month</td>
                <td class="border px-4 py-2">1-12</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">6</td>
                <td class="border px-4 py-2">Day of week</td>
                <td class="border px-4 py-2">0-7</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">7</td>
                <td class="border px-4 py-2">Year</td>
                <td class="border px-4 py-2">1970-3000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Examples of CRON</h3>
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">CRON</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">* * * * * * *</td>
                <td class="border px-4 py-2">CRON is valid all the time, will fire every second.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">0 * * * * * *</td>
                <td class="border px-4 py-2">CRON is valid at the beginning of each minute.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">* * * * * 2 *</td>
                <td class="border px-4 py-2">CRON is valid every Tuesday all day long.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">0 0 13-15 * * 2-4 *</td>
                <td class="border px-4 py-2">CRON is valid at 13:00, 14:00 and 15:00 on Tuesday, Wednesday and Thursday.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">*/5 * * * * * *</td>
                <td class="border px-4 py-2">CRON is valid every 5 seconds starting at 0.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">*/5 */5 * * * * *</td>
                <td class="border px-4 py-2">CRON is valid every 5 seconds each 5 minutes, from 00:00 to 55:55.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">0 0 0 * * 5 *</td>
                <td class="border px-4 py-2">Every Friday at midnight.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">0 0 */2 * * * *</td>
                <td class="border px-4 py-2">Every 2 hours at beginning of the hour.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">* * */2 * * * *</td>
                <td class="border px-4 py-2">Every second of every minute every 2 hours (0, 2, 4, .., 22).</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">0 0 0 * * 1-5 *</td>
                <td class="border px-4 py-2">At midnight, 00:00 every week between Monday and Friday.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">15 23 */6 * * * *</td>
                <td class="border px-4 py-2">Every 6 hours at (min:sec) 23:15.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">0 0 0 1 * * *</td>
                <td class="border px-4 py-2">At 00:00:00 beginning of the month.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">0 0 0 1 */3 * *</td>
                <td class="border px-4 py-2">Every beginning of the quarter at 00:00:00.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">10 15 20 * 8 6 *</td>
                <td class="border px-4 py-2">At 20:15:20 every Saturday in August.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">10 15 20 8 * 6 *</td>
                <td class="border px-4 py-2">At 20:15:20 every Saturday that is also 8th day in month.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">30-45 * * * * * *</td>
                <td class="border px-4 py-2">Every second between 30 and 45.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">30-45/3 * * * * * *</td>
                <td class="border px-4 py-2">Every 3rd second in every minute, when seconds are between 30 and 45.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">0 23/1 * * * * *</td>
                <td class="border px-4 py-2">Every beginning of a minute when minute is between 23 and 59.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">50-10 * * * * * *</td>
                <td class="border px-4 py-2">Every second when seconds are from 50-59 and 00-10 (overflow mode).</td>
              </tr>
            </tbody>
          </table>
        </div>
        </section>
        <section class="rounded-2xl border-2 bg-emerald-50 border-emerald-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Script (ACTION) format</h2>
          <p>One action is written as <b>ID:command</b>, for example <code>18:1</code>. Several actions and pauses are separated by commas, without spaces.</p>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Examples of ACTION</h3>
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">ACTION</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">18:1,p5,18:0</td>
                <td class="border px-4 py-2">Pin 18 will turn on (ON) at the specified time (CRON), stay on for 5 seconds and turn off (OFF) after the pause.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">p5,12:2</td>
                <td class="border px-4 py-2">After the CRON fires there is a 5-second pause, then pin 12 changes its state (TOGGLE).</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Symbols in Script</h3>
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Symbol</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">0</td>
                <td class="border px-4 py-2">OFF</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">1</td>
                <td class="border px-4 py-2">ON</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">2</td>
                <td class="border px-4 py-2">TOGGLE</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">p</td>
                <td class="border px-4 py-2">Pause in seconds: <code>p5</code> - a 5-second pause</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">,</td>
                <td class="border px-4 py-2">Action separator</td>
              </tr>
            </tbody>
          </table>
        </div>
        </section>
        <section class="rounded-2xl border-2 bg-violet-50 border-violet-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">PWM: Sunrise and Sunset</h2>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Sunrise / Sunset</h3>
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Type</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">Sunrise</td>
                <td class="border px-4 py-2">Click the <b>PWM</b> button to configure. Set <b>Start Duty</b> (e.g., 0) and <b>End Duty</b> (e.g., 100). The duty cycle (brightness) will smoothly increase over the time specified in <b>Duration (Sec)</b> (from 1 to 864000 seconds).</td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">Sunset</td>
                <td class="border px-4 py-2">For a sunset effect, set <b>Start Duty</b> = 100 and <b>End Duty</b> = 0. The duty cycle will smoothly decrease over the time specified in <b>Duration (Sec)</b>.</td>
              </tr>
            </tbody>
          </table>
        </div>
        </section>
        <section class="rounded-2xl border-2 bg-amber-50 border-amber-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">${condHelpTitle(false)}</h2>
          <div class="space-y-3">
<p class="text-slate-600 italic mb-2">The timer fired, but act only if...</p>
          <p class="mb-2">A normal timer does the same thing at the set time, always. A condition adds the words "but only if" to an action. For example: "at 18:00 turn the light on, but only if it is already dark".</p>
          <p class="mb-2">A condition is a "lock" on a single action in the <b>Script</b> field. When the time of the timer comes (the <b>Cron</b> field), the firmware checks the condition of each action separately. If the condition is true (YES), the action is executed. If it is false (NO), that action is silently skipped, and the other actions in the same field run as usual. If there is no condition, the action always runs.</p>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">How to write a condition: three steps</h4>
          <ol class="list-decimal ml-6 mb-3 space-y-1">
            <li>Click <b>Edit</b> on the needed row. In the <b>Script</b> field write the action as usual: <code>${'18:1'}</code> (pin 18, turn on).</li>
            <li>Right after it, <b>without spaces</b>, put the <b>?</b> sign: <code>${'18:1?'}</code></li>
            <li>Add the condition: <code>${'18:1?Ss'}</code>. Read it as: "turn on pin 18, but only if it is night now". Click <b>Save changes</b>.</li>
          </ol>
          <p class="mb-3">General form: <code>${'ID:command?condition'}</code>. Command: <b>0</b> - turn off, <b>1</b> - turn on, <b>2</b> - toggle to the opposite. Several actions are separated by <b>commas</b> (not semicolons, and without spaces), and each one may have its own condition or none at all. The time of the run is still set in the <b>Cron</b> field; the condition does not replace it.</p>

          <div class="p-4 rounded-xl bg-white/80 border border-amber-300 mb-3">
            <p class="font-bold mb-1">Real-life example: a garden light</p>
            <p class="mb-1">We want the garden lamp (pin 18) to turn on every day at 18:00. But in summer it is still light at 18:00, and the lamp would burn for nothing. So we add the condition "only if it is already dark".</p>
            <p class="mb-1">In the Cron field type: <code>${'0 0 18 * * * *'}</code></p>
            <p class="mb-1">In the Script field type: <code>${'18:1?Ss'}</code></p>
            <p>Result: in winter, when it is already dark at 18:00 (Ss), the light turns on. In summer, when it is still light, the action is skipped. For Sr and Ss to work, the sunrise and sunset times must be set on the "Global Settings" page.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/80 border border-amber-300 mb-3">
            <p class="font-bold mb-1">Real-life example: a heater that watches the temperature itself</p>
            <p class="mb-1">We take two timer rows, both firing every minute (Cron: <code>${'0 * * * * * *'}</code>).</p>
            <p class="mb-1">First row, Script: <code>${'7:1?T5<18'}</code> - if sensor 5 reads below 18 degrees, turn on the heater (pin 7).</p>
            <p class="mb-1">Second row, Script: <code>${'7:0?T5>22'}</code> - if it reads above 22 degrees, turn the heater off.</p>
            <p>Result: every minute the timer "looks" at the temperature and switches the heater on and off by itself. Between 18 and 22 degrees nothing happens. For such frequent timers use commands 0 and 1, and do not use command 2 (toggle): it would flip the device at every run.</p>
          </div>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">What a condition is made of (words)</h4>
          <p class="mb-2">The number after the letter is the <b>ID</b> of the device from the table on the corresponding page.</p>
          <table class="w-full bg-white/70 mb-3">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Entry</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">How to read it</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'D5'}</code></td><td class="border px-4 py-2">Device (DEVICE pin) with ID 5 is ON right now. For a Zigbee device - it is on.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'!D5'}</code></td><td class="border px-4 py-2">Pin with ID 5 is OFF right now (the ! sign means "NOT").</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3>0'}</code></td><td class="border px-4 py-2">Dimmer (PWM) with ID 3 is lit (value above zero). For Zigbee - the brightness of the device.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3=100'}</code></td><td class="border px-4 py-2">Dimmer 3 value is exactly 100. A PWM dimmer has a 0-100 scale (percent), so this is full brightness. For Zigbee - the value reported by the device itself.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3g50'}</code></td><td class="border px-4 py-2">Dimmer 3 value is 50 or MORE (letter g = "greater").</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3l50'}</code></td><td class="border px-4 py-2">Dimmer 3 value is 50 or LESS (letter l = "less").</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'B1'}</code></td><td class="border px-4 py-2">Button with ID 1 is pressed right now.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'BU1'}</code></td><td class="border px-4 py-2">Button with ID 1 is NOT pressed right now.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'BH1'}</code></td><td class="border px-4 py-2">Button with ID 1 is being held right now (long press).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5>25.5'}</code></td><td class="border px-4 py-2">Temperature of sensor 5 is above 25.5 degrees.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5<10'}</code></td><td class="border px-4 py-2">Temperature of sensor 5 is below 10 degrees.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5.2>25.5'}</code></td><td class="border px-4 py-2">Temperature of the second DS18B20 sensor on the bus of pin 5 is above 25.5 degrees (.2 is the sensor number on the bus; without .number the first healthy one is used).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'H4>50'}</code></td><td class="border px-4 py-2">Humidity of sensor 4 is above 50 percent.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'H4<30'}</code></td><td class="border px-4 py-2">Humidity of sensor 4 is below 30 percent.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Sr'}</code></td><td class="border px-4 py-2">Day: it is between sunrise and sunset right now. The times are taken from sunrise/sunset in "Global Settings".</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Ss'}</code></td><td class="border px-4 py-2">Night: it is between sunset and sunrise right now. If sunrise/sunset times are not set, Sr and Ss are both NO.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'C3'}</code></td><td class="border px-4 py-2">Insert the ready-made condition from cell C3 (the cells are stored on the "Global Settings" page, Conditions row). Nesting - no deeper than two levels.</td></tr>
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
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'|'}</code></td><td class="border px-4 py-2">OR (ONE is enough)</td><td class="border px-4 py-2"><code>${'D1|D2'}</code> - device 1 OR device 2 is on (or both)</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'!'}</code></td><td class="border px-4 py-2">NOT (the opposite)</td><td class="border px-4 py-2"><code>${'!D1'}</code> - device 1 is off; <code>${'!(D1&D2)'}</code> - it is not true that both are on at once</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'( )'}</code></td><td class="border px-4 py-2">Brackets - what to evaluate first</td><td class="border px-4 py-2"><code>${'(D1|D2)&!D3'}</code> - (device 1 or device 2) AND device 3 is off</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'= > < g l'}</code></td><td class="border px-4 py-2">Equal, greater, less; g - greater or equal, l - less or equal (<code>${'>='}</code> and <code>${'<='}</code> also work)</td><td class="border px-4 py-2"><code>${'T5>25.5'}</code>, <code>${'DV3=100'}</code>, <code>${'DV3l50'}</code></td></tr>
            </tbody>
          </table>
          <p class="mb-3 text-slate-600">Tip: if you mix & and | in one condition, always use brackets. Then the result is exactly what you meant. Without brackets the order is: first !, then &, then | (so <code>${'D1|D2&D3'}</code> reads as <code>${'D1|(D2&D3)'}</code>). Numbers for temperature and humidity are written as usual: <code>${'T5>25'}</code> and <code>${'T5>25.0'}</code> are the same, one digit after the dot is allowed.</p>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Ready-made examples - just copy into the Script field</h4>
          <table class="w-full bg-white/70 mb-3">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What to type in the Script field</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What happens</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D2'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if device 2 is on.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?!D2'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if device 2 is off.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:2?D1&D2'}</code></td><td class="border px-4 py-2">Toggle pin 6 only if both device 1 and device 2 are on.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D1|D2'}</code></td><td class="border px-4 py-2">Turn on pin 6 if at least one of devices 1 and 2 is on.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D1&!D2'}</code></td><td class="border px-4 py-2">Turn on pin 6 if device 1 is on and device 2 is off.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:0?!D1&!D2'}</code></td><td class="border px-4 py-2">Turn off pin 6 only if both devices are off.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?(D1|D2)&!D3'}</code></td><td class="border px-4 py-2">Turn on pin 6 if device 1 or 2 is on and device 3 is off.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?!(D1&D2)'}</code></td><td class="border px-4 py-2">Turn on pin 6 if devices 1 and 2 are NOT on at the same time.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?Ss'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if it is night now (Ss).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:0?Sr'}</code></td><td class="border px-4 py-2">Turn off pin 6 only if it is day now (Sr).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?Ss&B1'}</code></td><td class="border px-4 py-2">Turn on pin 6 if it is night (Ss) and button 1 is pressed.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?Ss|D1'}</code></td><td class="border px-4 py-2">Turn on pin 6 if it is night (Ss) OR device 1 is on.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?BU1'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if button 1 is not pressed.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?BH1'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if button 1 is being held.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5>25.5'}</code></td><td class="border px-4 py-2">Turn on pin 6 if sensor 5 reads above 25.5 degrees.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5<18'}</code></td><td class="border px-4 py-2">Turn on pin 6 if sensor 5 reads below 18 degrees.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5.2>25.5'}</code></td><td class="border px-4 py-2">Turn on pin 6 if the second sensor on the bus of pin 5 reads above 25.5 degrees.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?H4>50'}</code></td><td class="border px-4 py-2">Turn on pin 6 if humidity on sensor 4 is above 50 percent.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?H4<30'}</code></td><td class="border px-4 py-2">Turn on pin 6 if humidity on sensor 4 is below 30 percent.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5>25&H4>60&!D7'}</code></td><td class="border px-4 py-2">Turn on pin 6 if it is hot, humid and the fan (device 7) is not on yet.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:0?Sr&T5<20'}</code></td><td class="border px-4 py-2">Turn off pin 6 if it is day (Sr) and it is cold.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?(T5>28|H4>70)&Sr'}</code></td><td class="border px-4 py-2">Turn on pin 6 if it is day (Sr) and it is hot or very humid.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3>0'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if dimmer 3 is lit (value above zero).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3=100'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if dimmer 3 is at full brightness (100).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3g50'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if dimmer 3 value is 50 or more.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3l50'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if dimmer 3 value is 50 or less.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV3>0&Ss'}</code></td><td class="border px-4 py-2">Turn on pin 6 if dimmer 3 is lit and it is night (Ss).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D93'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if the Zigbee device with ID 93 is on (Zigbee device IDs start from 89).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?DV93g100'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if the brightness of Zigbee device 93 is 100 or more.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'93.1:2?D2'}</code></td><td class="border px-4 py-2">Zigbee: slot 93, sub-action 1, toggle - only if device 2 is on.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?T5<25|D1'}</code></td><td class="border px-4 py-2">Turn on pin 6 if sensor 5 is below 25 degrees OR device 1 is on (special case with a dead sensor - see the rules below).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?C3'}</code></td><td class="border px-4 py-2">Turn on pin 6 only if the ready-made condition from cell C3 is true.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'pwm:5,600,0,100?Ss'}</code></td><td class="border px-4 py-2">Smooth ramp-up of dimmer 5 from 0 to 100 percent over 600 seconds, only if it is night (Ss). For a pwm action the condition goes at the very end, after the last number.</td></tr>
            </tbody>
          </table>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Several actions in one field, including a pause</h4>
          <p class="mb-2">A pause is written as <b>p</b> and a number of seconds: <code>${'p600'}</code> - wait 600 seconds. Everything after the pause runs when the pause is over.</p>
          <table class="w-full bg-white/70 mb-3">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What to type in the Script field</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What happens</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D2,7:0?!D2'}</code></td><td class="border px-4 py-2">Two actions at once: turn on pin 6 if device 2 is on; turn off pin 7 if device 2 is off.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1,7:0?D2'}</code></td><td class="border px-4 py-2">Turn on pin 6 always; turn off pin 7 only if device 2 is on.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?D1,12:1?!D1,18:0'}</code></td><td class="border px-4 py-2">Three actions: turn on pin 6 if device 1 is on; turn on pin 12 if device 1 is off; turn off pin 18 always.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'18:1?Ss,p600,18:0'}</code></td><td class="border px-4 py-2">Turn on pin 18 if it is night; after 600 seconds (10 minutes) turn pin 18 off in any case. The condition is on the action, not on the pause p600.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'18:1,p600,18:0?Sr'}</code></td><td class="border px-4 py-2">Turn on pin 18; after 10 minutes turn it off, but only if it is day by then. A condition after a pause is checked at the moment the pause ends.</td></tr>
            </tbody>
          </table>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Ready-made pairs: what to type in Cron and what in Script</h4>
          <table class="w-full bg-white/70 mb-3">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Cron (when)</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Script (what, and on which condition)</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What happens</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'0 0 18 * * * *'}</code></td><td class="border px-4 py-2 whitespace-nowrap"><code>${'18:1?Ss'}</code></td><td class="border px-4 py-2">Every day at 18:00: turn on the light (pin 18), only if it is already dark.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'0 30 6 * * * *'}</code></td><td class="border px-4 py-2 whitespace-nowrap"><code>${'18:0?Sr'}</code></td><td class="border px-4 py-2">Every day at 6:30: turn off the light (pin 18), only if it is already day.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'0 0 7 * * 1-5 *'}</code></td><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:1?!D3'}</code></td><td class="border px-4 py-2">On weekdays at 7:00: turn on pin 6, only if pin 3 is off right now.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'0 * * * * * *'}</code></td><td class="border px-4 py-2 whitespace-nowrap"><code>${'7:1?T5<18'}</code></td><td class="border px-4 py-2">Every minute: if sensor 5 reads below 18 degrees - turn on the heater (pin 7).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'0 * * * * * *'}</code></td><td class="border px-4 py-2 whitespace-nowrap"><code>${'7:0?T5>22'}</code></td><td class="border px-4 py-2">Every minute: if sensor 5 reads above 22 degrees - turn off the heater (pin 7). A pair to the previous row: between 18 and 22 degrees nothing changes, so the heater does not flicker.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'0 */5 * * * * *'}</code></td><td class="border px-4 py-2 whitespace-nowrap"><code>${'9:1?H4>70'}</code></td><td class="border px-4 py-2">Every 5 minutes: if humidity on sensor 4 is above 70 percent - turn on the extractor fan (pin 9).</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'0 0 22 * * * *'}</code></td><td class="border px-4 py-2 whitespace-nowrap"><code>${'6:0,7:0?!D1'}</code></td><td class="border px-4 py-2">At 22:00: turn off pin 6 always, and turn off pin 7 only if device 1 is off.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'0 0 19 * * * *'}</code></td><td class="border px-4 py-2 whitespace-nowrap"><code>${'pwm:5,600,0,100?Ss'}</code></td><td class="border px-4 py-2">At 19:00: if it is already dark - smoothly bring dimmer 5 up over 10 minutes.</td></tr>
              <tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'0 0 10 * * 6 *'}</code></td><td class="border px-4 py-2 whitespace-nowrap"><code>${'12:1?T5>25&Sr'}</code></td><td class="border px-4 py-2">On Saturdays at 10:00: if it is day and sensor 5 reads above 25 degrees - turn on the fan (pin 12).</td></tr>
            </tbody>
          </table>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">Important rules</h4>
          <p class="rounded-xl border border-red-300 bg-red-50 px-4 py-2 font-bold text-red-700 mb-3">Do not put the ? sign on a pause. The entry <code>${'p600?D2'}</code> is wrong: if the condition gives NO, the pause does not start, and all actions after it run immediately. Write conditions on actions only.</p>
          <ul class="list-disc ml-6 mb-3 space-y-1">
            <li><b>The condition is checked at the moment the timer fires</b> (by the Cron field), separately for each action. If it was NO at that moment, the action is skipped. When the condition later becomes YES, nothing happens by itself: wait for the next run of the timer. If the condition has to be checked almost all the time, make the timer frequent, for example every minute (<code>${'0 * * * * * *'}</code>).</li>
            <li><b>For actions after a pause</b> the condition is checked at the moment the pause ends, not when the timer starts.</li>
            <li><b>The master On/Off slider in the timer row</b> is stronger than any condition: if it is off, the timer is ignored entirely.</li>
            <li><b>The condition works only in the Script field.</b> Direct control of a device (the On/Off slider of the relay itself, an API or MQTT command sent straight to the relay) does not check conditions.</li>
            <li><b>A frequent timer and command 2.</b> Command 2 (toggle) flips the state to the opposite at every run. For frequent timers with conditions use commands 0 and 1.</li>
            <li><b>A dead sensor</b> gives the answer "unknown", and the action is blocked even if the condition starts with !. Exception: explicit truth through |. For example <code>${'6:1?T5<25|D1'}</code> fires with a dead sensor 5 if device 1 is on.</li>
            <li><b>If a condition is written with a mistake</b> (a typo, an extra character, a space), the timers page says nothing when saving, and the action is silently skipped. So after saving, test the condition on a simple example.</li>
            <li><b>Allowed characters in a condition:</b> Latin letters, digits and the signs ( ) ! & | = ${'>'} ${'<'} and a dot. Spaces are not allowed.</li>
            <li><b>The Script field length is up to 254 characters</b> including the conditions (the counter under the field). The longer the conditions, the fewer actions fit. If a condition is long and needed in several places, write it once into a cell on the "Global Settings" page (Conditions row, 12 cells) and use it in the action in short form: <code>${'18:1?C3'}</code>. Take what stands after the ? sign: only the condition is written into the cell, for example <code>${'Ss&T5>25'}</code>.</li>
            <li><b>A yellow warning under the Script field</b> usually means that the action refers to a Conditions cell that was reset to 0. Such an action is blocked until the cell holds a correct condition again.</li>
            <li><b>If you delete a device</b> that a condition refers to, the firmware replaces that condition with an always-false <code>${'?0'}</code>. The action stops firing but does not become unconditional. Set a new condition.</li>
            <li><b>Dimmer (the PWM button of the row).</b> The condition for a smooth ramp-up or fade-out goes at the very end: <code>${'pwm:5,600,0,100?Ss'}</code>. Enter this in the Script field with the regular Edit button. If you later open this row and save it through the PWM window, the window rebuilds the entry from the four numbers and the condition is lost: write it again.</li>
          </ul>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-teal-50 border-teal-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">MQTT: change tracking</h2>
        <div>
          <h3 class="text-lg font-bold text-black mb-2">Swarm/timer/</h3>
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Topic</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap font-semibold">Swarm/timer/</td>
                <td class="border px-4 py-2">This page tracks changes of timers and automatically sends each change via MQTT to the topic: Swarm/timer/. Where "Swarm" is your 'TX topic'.</td>
              </tr>
            </tbody>
          </table>
        </div>
        </section>
      </div>
    `,
  };

  if (varcron === null) {
    return html`<div>Loading...</div>`;
  }

  const getLangObject = () => ({
    langtimers: language === 'ru' ? rulangtimers : enlangtimers
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

    setCron(varcron.map((b) => (b.id === updatedCron.id ? updatedCron : b)));
    isPendingOnOff.current = true;

    fetch('/api/cron/set', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCron),
    })
      .then(response => response.json())
      .then(data => { console.log('Cron job updated successfully:', data); })
      .catch(error => { console.error('Error updating cron job:', error); })
      .finally(() => {
        setTimeout(() => {
          isPendingOnOff.current = false;
        }, 1500);
      });
  };

  // -------------------------------------------------------------------------
  // Th — заголовок таблицы с tooltip через data-tip (портал в body)
  // -------------------------------------------------------------------------
  const Th = (props) => html`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${getTooltipText('langtimers', props.tooltipIndex)}
    >
      ${props.title}
    </th>
  `;

const ArrayCron = ({ d, index }) => {
    const isPwmCron = d.activ && d.activ.startsWith('pwm:');
    let displayActiv = d.activ;
    if (isPwmCron) {
      const parts = d.activ.substring(4).split(',');
      if (parts.length === 4) {
        displayActiv = `pwmID=${parts[0]} | ${parts[1]}s | ${parts[2]}%→${parts[3]}%`;  // убран значок и слово Pin
      }
    }

    return html`
    <tr class="${index % 2 === 1 ? 'bg-white/80' : 'bg-sky-200/40'} hover:bg-slate-200/80 transition-colors">
      <td class="px-6 py-4 text-sm text-slate-800 font-medium">${d.id}</td>
      <td class="px-6 py-4 text-sm text-slate-700 font-mono tracking-wider">${d.cron}</td>
      <td class="px-6 py-4 text-sm text-slate-700 font-mono tracking-wider items-center gap-1 flex justify-start">${displayActiv}</td>
      <td class="px-6 py-4 text-sm text-slate-600">${d.info}</td>
      <td class="px-6 py-4">
        <${MyPolzunok}
          value=${d.onoff}
          onChange=${(value) => handleCronChange({ ...d, onoff: value })}
        />
      </td>
     <td class="px-6 py-4 text-center">
        ${!isPwmCron ? html`
       <button
            onclick=${() => openModal('edit', d)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap mr-2"
          >
            Edit
          </button>
          <button
            onclick=${() => openModal('edit_pwm', d)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap ml-3"
            title="Set as PWM Cron"
          >
            PWM
          </button>
        ` : html`
          <button
            onclick=${() => openModal('edit_pwm', d)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap mr-3"
          >
            Edit
          </button>
          <button
            onclick=${() => openModal('edit_pwm', d)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap ml-1"
          >
            PWM
          </button>
        `}
      </td>
    </tr>
  `;
  };

  return html`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col justify-start items-center" style="overflow-anchor:none;">
      <!-- Decorative background glow -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
          Timer(s)
        </div>
        <div class="w-full mb-6 relative">
          ${varcron && varcron.length > 0
      ? html`
                <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6 overflow-auto">
                  <div class="overflow-x-auto w-full">
                    <table class="w-full text-left border-collapse whitespace-nowrap">
                      <thead>
                        <tr class="bg-teal-600/10 border-b border-teal-600/20">
                          <${Th} title="No" tooltipIndex=${1} />
                          <${Th} title="Cron" tooltipIndex=${2} />
                          <${Th} title="Script" tooltipIndex=${3} />
                          <${Th} title="Info" tooltipIndex=${4} />
                          <${Th} title="On/Off" tooltipIndex=${5} />
                          <${Th} title="Action" tooltipIndex=${6} />
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-white/40">
                        ${varcron.slice(0, visibleCrons).map(
        (cron, index) => html`<${ArrayCron} d=${cron} index=${index} key=${cron.id} />`
      )}
                      </tbody>
                    </table>
                  </div>
                </div>
              `
      : html`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">${language === 'ru' ? 'Нет доступных таймеров' : 'No cron jobs available'}</div>`}
        </div>
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm p-4 rounded-2xl">
          <button
            class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
            onclick=${(e) => { lockToggle(e); setShowHelp(!showHelp); }}
          >
            ${showHelp
      ? (language === 'ru' ? 'Скрыть справку' : 'Hide Help')
      : (language === 'ru' ? 'Показать справку' : 'Show Help')}
          </button>
          <div class="font-semibold text-slate-600 tracking-wide">
            ${varcron && (varcron.length - visibleCrons > 0)
      ? (language === 'ru'
          ? `Ещё доступно: ${varcron.length - visibleCrons} таймер(ов)`
          : `Still available: ${varcron.length - visibleCrons} cron jobs`)
      : (language === 'ru' ? 'Нет доступных таймеров!' : 'No available: cron jobs!')}
          </div>
          <div class="flex gap-2">
            ${varcron && (visibleCrons < varcron.length)
      ? html`
                  <button
                    class="bg-emerald-500 hover:bg-emerald-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-emerald-500/30"
                    onclick=${addCron}
                    title=${language === 'ru' ? 'Добавить таймер' : 'Add Cron'}
                  >+</button>
                `
      : null}
            ${visibleCrons > 0
      ? html`
                  <button
                    class="bg-rose-500 hover:bg-rose-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-rose-500/30"
                    onclick=${deleteCron}
                    title=${language === 'ru' ? 'Удалить таймер' : 'Remove Cron'}
                  >-</button>
                `
      : null}
          </div>
        </div>
      </div>

      ${showHelp && html`
        <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700 w-full" style="max-height:70vh;overflow-y:auto;">
          ${helpContent[language]}
        </div>
      `}

      ${isModalOpen && modalType === 'edit_pwm' ? html`
        <${ModalPwmCron}
          modalType=${modalType}
          page="TabCron"
          hideModal=${closeModal}
          title="Edit PWM Timer(s)"
          selectedCron=${selectedCron}
          handleCronChange=${handleCronChange}
          modalClass="mt-24"
        />
      ` : isModalOpen ? html`
        <${ModalCron}
          modalType=${modalType}
          page="TabCron"
          hideModal=${closeModal}
          title="Edit Timer(s)"
          selectedCron=${selectedCron}
          handleCronChange=${handleCronChange}
          modalClass="mt-24"
        />
      ` : null}
    </div>
  `;
}

export { TabCron };

