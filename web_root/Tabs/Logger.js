import { h, useState, useEffect, useRef, html } from '../bundle.js';

const LOG_RING_MAX_CHARS = 4000; // лимит на клиенте — не даём тексту расти бесконечно в DOM
const LOG_POLL_MS = 1000;        // опрос раз в секунду, пока не поставлено на паузу

// ---------------------------------------------------------------------------
// Help Content
// ---------------------------------------------------------------------------
const LOGGER_HELP = {
  ru: html`
    <div class="mytext space-y-6 font-sans text-base leading-relaxed text-slate-700 [&_code]:font-sans [&_code]:font-semibold [&_pre]:font-sans">
      <section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">Для чего нужна эта страница</h2>
        <p>Окно <b>SYSTEM LOG (хвост UART3)</b> показывает тот же диагностический лог, который устройство выводит в UART3. Обычно его смотрят через отладочный терминал, здесь он выведен прямо в браузер. Подключать USB-UART переходник и терминальную программу к плате не нужно.</p>
        <p>По логу видно, что устройство делает изнутри прямо сейчас: сетевые события, работу MQTT-брокера, Zigbee, OTA, планировщика и другое.</p>
        <p>Показывается только хвост лога, то есть последние строки. Это срез того, что происходит сейчас, а не полная история.</p>
      </section>

      <section class="rounded-2xl border-2 bg-emerald-50 border-emerald-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">Как пользоваться</h2>
        <ol class="list-decimal ml-6 space-y-2">
          <li>Окно обновляется само примерно раз в секунду и прокручивается вниз, к самым новым строкам.</li>
          <li>Чтобы спокойно прочитать нужный момент или скопировать текст, нажмите <b>Пауза</b>. Новые строки перестанут добавляться, а уже накопленный текст останется на месте.</li>
          <li>Чтобы продолжить, нажмите <b>Продолжить</b>. Приём возобновится с того места, где остановился.</li>
        </ol>
        <p>Пока вкладка браузера скрыта, лог не обновляется. После возврата на страницу обновление продолжится само.</p>
        <p>Если за время паузы или скрытой вкладки устройство успело записать больше, чем помещается в его буфер, в окне появится пометка <b>пропуск — буфер устройства переполнен</b>. Это значит, что часть строк потеряна.</p>
      </section>

      <section class="rounded-2xl border-2 bg-amber-50 border-amber-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">Какие сообщения попадают в лог</h2>
        <p>Лог показывает только те категории сообщений, которые включены на странице <b>Global Settings</b>, в блоке <b>Фильтр логов</b>. Всего категорий 12: Система, MQTT, Сеть, GSM, Планировщик, Датчики, ПИД-регулятор, Настройки, Ethernet, PHY, Z2M и OTA. Если категория выключена, её сообщений здесь не будет.</p>
        <p>Если выключить все категории (кнопка <b>Выключить все</b>), окно останется пустым и будет показывать ожидание данных. Кнопка <b>Включить все</b> возвращает все категории.</p>
        <table class="w-full bg-white/70">
          <thead>
            <tr>
              <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Параметр</th>
              <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Значение</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2">Буфер на устройстве</td>
              <td class="border px-4 py-2">около 1 КБ последних символов лога</td>
            </tr>
            <tr>
              <td class="border px-4 py-2">Хранится на странице</td>
              <td class="border px-4 py-2">последние около 4000 символов</td>
            </tr>
            <tr>
              <td class="border px-4 py-2">Частота обновления</td>
              <td class="border px-4 py-2">раз в секунду, пока нет паузы</td>
            </tr>
          </tbody>
        </table>
        <p>После перезагрузки страницы накопленный текст очищается: лог начнёт набираться заново.</p>
      </section>
    </div>
  `,
  en: html`
    <div class="mytext space-y-6 font-sans text-base leading-relaxed text-slate-700 [&_code]:font-sans [&_code]:font-semibold [&_pre]:font-sans">
      <section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">What this page is for</h2>
        <p>The <b>SYSTEM LOG (UART3 tail)</b> window shows the same diagnostic log that the device writes to UART3. It is usually watched through a debug terminal; here it is shown right in the browser. You do not need to connect a USB-UART adapter and a terminal program to the board.</p>
        <p>The log shows what the device is doing under the hood right now: network events, the MQTT broker, Zigbee, OTA, the scheduler and more.</p>
        <p>Only the tail of the log is shown, that is, the most recent lines. It is a snapshot of what is happening now, not the full history.</p>
      </section>

      <section class="rounded-2xl border-2 bg-emerald-50 border-emerald-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">How to use it</h2>
        <ol class="list-decimal ml-6 space-y-2">
          <li>The window refreshes by itself about once a second and scrolls down to the newest lines.</li>
          <li>To read a specific moment or copy some text, click <b>Pause</b>. New lines stop being added, and the text already collected stays in place.</li>
          <li>To continue, click <b>Resume</b>. Receiving continues from where it stopped.</li>
        </ol>
        <p>While the browser tab is hidden, the log is not refreshed. It continues by itself when you return to the page.</p>
        <p>If during a pause or a hidden tab the device wrote more than its buffer can hold, the window shows a <b>gap — device buffer overflowed</b> mark. It means that some lines were lost.</p>
      </section>

      <section class="rounded-2xl border-2 bg-amber-50 border-amber-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">Which messages get into the log</h2>
        <p>The log shows only the message categories enabled on the <b>Global Settings</b> page, in the <b>Log Filter</b> block. There are 12 categories: System, MQTT, Network, GSM, Scheduler, Sensors, PID Controller, Settings, Ethernet, PHY, Z2M and OTA. If a category is switched off, its messages will not appear here.</p>
        <p>If you switch off all categories (the <b>Disable All</b> button), the window stays empty and shows that it is waiting for data. The <b>Enable All</b> button turns all categories back on.</p>
        <table class="w-full bg-white/70">
          <thead>
            <tr>
              <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Parameter</th>
              <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2">Buffer on the device</td>
              <td class="border px-4 py-2">about 1 KB of the latest log characters</td>
            </tr>
            <tr>
              <td class="border px-4 py-2">Kept on the page</td>
              <td class="border px-4 py-2">the latest ~4000 characters</td>
            </tr>
            <tr>
              <td class="border px-4 py-2">Refresh rate</td>
              <td class="border px-4 py-2">once a second while not paused</td>
            </tr>
          </tbody>
        </table>
        <p>After the page is reloaded, the collected text is cleared and the log starts filling again.</p>
      </section>
    </div>
  `
};

function LogsTerminal({ language }) {
  const [text, setText] = useState('');
  const [paused, setPaused] = useState(false);
  const cursorRef = useRef(0);
  const boxRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    let stopped = false;

    const tick = () => {
      if (stopped || document.hidden) return;
      fetch('api/logs/get', {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({ since: cursorRef.current }),
      })
        .then((r) => r.json())
        .then((d) => {
          if (stopped || !d) return;
          cursorRef.current = d.cursor || 0;
          if (d.text) {
            setText((prev) => {
              const chunk = d.dropped
                ? (language === 'ru'
                    ? '\n… [пропуск — буфер устройства переполнен] …\n'
                    : '\n… [gap — device buffer overflowed] …\n') + d.text
                : d.text;
              const next = prev + chunk;
              return next.length > LOG_RING_MAX_CHARS
                ? next.slice(next.length - LOG_RING_MAX_CHARS)
                : next;
            });
          }
        })
        .catch(() => {});
    };

    tick();
    const id = setInterval(tick, LOG_POLL_MS);
    return () => {
      stopped = true;
      clearInterval(id);
    };
  }, [paused, language]);

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [text]);

  return html`
    <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner p-4 flex flex-col gap-3">
      <div class="flex items-center justify-between">
        <div class="text-xs font-bold uppercase tracking-wide text-teal-700/80">
          SYSTEM LOG (${language === 'ru' ? 'хвост UART3' : 'UART3 tail'})
        </div>
        <button
          type="button"
          onClick=${() => setPaused((v) => !v)}
          class="text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-300 text-slate-600 bg-white/70 hover:bg-slate-100 transition-colors"
        >
          ${paused
            ? (language === 'ru' ? 'Продолжить' : 'Resume')
            : (language === 'ru' ? 'Пауза' : 'Pause')}
        </button>
      </div>
      <div
        ref=${boxRef}
        class="bg-slate-900 text-amber-300 text-xs font-mono p-3 rounded-xl overflow-auto whitespace-pre-wrap selection:bg-amber-300 selection:text-slate-900"
        style="height: min(420px, 60vh); height: min(420px, 60dvh);"
      >
        ${text || (language === 'ru' ? '...ожидание данных...' : '...waiting for data...')}
      </div>
    </div>
  `;
}

export function Logger({ }) {
  const [language, setLanguage] = useState('ru');

  // Страница не хранит свои данные и не содержит /api/mysett/get — язык
  // берётся из общих настроек устройства (как на Firmware Update / Zigbee
  // Devices), чтобы переключатель языка на Global Settings управлял и
  // этой страницей тоже.
  const refreshLang = () =>
    fetch('api/mysett/get', { cache: 'no-store' })
      .then((r) => r.json())
      .then((r) => setLanguage(r.lang || 'ru'))
      .catch(() => { });

  useEffect(() => {
    refreshLang();
  }, []);

  return html`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex flex-col gap-6">
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="w-full relative z-10 flex flex-col gap-6">
        <div>
          <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-2 drop-shadow-sm tracking-tight uppercase">
          ${language === 'ru' ? 'Логи устройства' : 'Device Logs'}
        </div>
          <p class="text-sm text-slate-600 mb-6 max-w-3xl">${language === 'ru' ? 'Здесь виден «дневник» контроллера: что он делает прямо сейчас. Пригодится, чтобы понять, почему что-то не сработало.' : 'The diary of the controller: what it is doing right now. Handy for finding out why something did not work.'}</p>
        </div>

        <${LogsTerminal} language=${language} />

        ${LOGGER_HELP[language] || LOGGER_HELP.en}
      </div>
    </div>
  `;
}
