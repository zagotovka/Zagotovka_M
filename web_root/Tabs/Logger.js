import { h, useState, useEffect, useRef, html } from '../bundle.js';
import { Icons } from '../components.js';

const LOG_RING_MAX_CHARS = 4000; // лимит на клиенте — не даём тексту расти бесконечно в DOM
const LOG_POLL_MS = 1000;        // опрос раз в секунду, пока не поставлено на паузу

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
            ? (language === 'ru' ? '▶ Продолжить' : '▶ Resume')
            : (language === 'ru' ? '⏸ Пауза' : '⏸ Pause')}
        </button>
      </div>
      <div
        ref=${boxRef}
        class="bg-slate-900 text-amber-300 text-xs font-mono p-3 rounded-xl overflow-auto whitespace-pre-wrap"
        style="height: 420px;"
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
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 drop-shadow-sm tracking-tight uppercase">
          ${language === 'ru' ? 'Логи устройства' : 'Device Logs'}
        </div>

        <${LogsTerminal} language=${language} />

        <!-- Developer Note: что это за панель и как ей пользоваться -->
        <div class="rounded-2xl bg-white/70 backdrop-blur-md border border-white/60 shadow-inner p-6">
          <div class="flex items-center gap-2 mb-3">
            <${Icons.info} class="w-5 h-5 text-green-600" />
            <div class="font-semibold text-slate-700">Developer Note</div>
          </div>
          <div class="text-sm text-slate-600 space-y-3 leading-relaxed">
            <p>
              <span class="font-semibold text-slate-700">
                ${language === 'ru'
                  ? 'Для чего нужен "SYSTEM LOG (хвост UART3)":'
                  : 'What "SYSTEM LOG (UART3 tail)" is for:'}
              </span>
              ${language === 'ru'
                ? ' Это тот же самый диагностический лог, что устройство пишет в UART3 (тот, что обычно смотрят через отладочный терминал), но показанный прямо в браузере. Он помогает увидеть, что устройство делает "изнутри" прямо сейчас: сетевые события, MQTT-брокер, Zigbee, OTA, работу планировщика (cron) и т.д. — без необходимости подключать USB-UART переходник и терминальную программу к плате.'
                : ' This is the exact same diagnostic log the device writes to UART3 (the one you would normally watch through a debug terminal), shown right in the browser. It helps you see what the device is doing right now under the hood: networking events, the MQTT broker, Zigbee, OTA, the cron scheduler, and so on — without hooking up a USB-UART adapter and a terminal program to the board.'}
            </p>
            <p>
              ${language === 'ru'
                ? ' Показывается только "хвост" — небольшой буфер последних строк (лимит на устройстве ~1 КБ, на странице — последние ~4000 символов), поэтому это живой срез "что происходит сейчас", а не полная история. Какие категории логов вообще попадают в этот поток (SYSTEM/MQTT/NET/GSM/SCHEDULER и т.д.), настраивается на странице Global Settings — если там категория выключена, её сообщений здесь не будет.'
                : ' Only the "tail" is shown — a small buffer of the most recent lines (device-side limit ~1 KB, ~4000 characters on this page), so this is a live snapshot of "what is happening right now", not full history. Which log categories actually make it into this stream (SYSTEM/MQTT/NET/GSM/SCHEDULER, etc.) is configured on the Global Settings page — if a category is switched off there, its messages simply won\'t appear here.'}
            </p>
            <p>
              <span class="font-semibold text-slate-700">
                ${language === 'ru' ? 'Как пользоваться:' : 'How to use it:'}
              </span>
              ${language === 'ru'
                ? ' Окно обновляется автоматически примерно раз в секунду и само прокручивается вниз, к самым новым строкам. Кнопка «⏸ Пауза» останавливает автообновление — это удобно, когда нужно спокойно прочитать конкретный момент или скопировать текст, не боясь, что он "уедет" вверх новыми строками. Пока лог на паузе, кнопка меняется на «▶ Продолжить» — нажмите её, чтобы возобновить приём новых строк (уже накопленный текст никуда не пропадает, опрос просто продолжится с того места, на котором остановился).'
                : ' The window refreshes automatically about once a second and auto-scrolls to the newest lines. The «⏸ Pause» button stops the auto-refresh — handy when you want to calmly read a specific moment or copy some text without it scrolling away under new lines. While paused, the button turns into «▶ Resume» — click it to resume receiving new lines (the text already collected is not lost; polling simply continues from where it left off).'}
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}