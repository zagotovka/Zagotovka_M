/**
 * netGate — глобальный лимитер параллельных fetch().
 *
 * Зачем: каждое параллельное HTTPS-соединение к устройству стоит ~6 КБ heap и
 * один TLS-handshake (~150 мс CPU на МК). Мобильный браузер при нескольких
 * одновременных fetch открывает до 6 сокетов → пик памяти. Здесь все fetch()
 * страницы (pollQueue, safeFetch, postJson и прямые вызовы в Tabs/Modals)
 * проходят через очередь на MAX_PARALLEL слотов → браузеру нужно не больше
 * MAX_PARALLEL keep-alive сокетов, и они переиспользуются.
 *
 * Подключается ПЕРВЫМ импортом в main.js; патчит window.fetch один раз.
 * Слот освобождается, когда пришли заголовки ответа (fetch() resolve/reject);
 * чтение тела (.json()) уже идёт по тому же сокету, и из-за малого размера
 * ответов (JSON до единиц КБ) перекрытие несущественно.
 * AbortSignal учитывается и пока запрос ждёт в очереди.
 */
const MAX_PARALLEL = 2;

if (typeof window !== 'undefined' && !window.__netGateInstalled) {
  window.__netGateInstalled = true;

  const origFetch = window.fetch.bind(window);
  const waiters = [];
  let active = 0;

  const abortError = () => new DOMException('The operation was aborted.', 'AbortError');

  const acquire = (signal) =>
    new Promise((resolve, reject) => {
      if (signal && signal.aborted) { reject(abortError()); return; }
      if (active < MAX_PARALLEL) { active++; resolve(); return; }
      const w = { resolve, signal, onAbort: null };
      if (signal) {
        w.onAbort = () => {
          const i = waiters.indexOf(w);
          if (i >= 0) waiters.splice(i, 1);
          reject(abortError());
        };
        signal.addEventListener('abort', w.onAbort, { once: true });
      }
      waiters.push(w);
    });

  const release = () => {
    active--;
    while (waiters.length && active < MAX_PARALLEL) {
      const w = waiters.shift();
      if (w.signal && w.onAbort) w.signal.removeEventListener('abort', w.onAbort);
      active++;
      w.resolve();
    }
  };

  window.fetch = async function (input, init) {
    const signal = (init && init.signal) || (input && typeof input === 'object' && input.signal) || undefined;
    await acquire(signal);
    try {
      return await origFetch(input, init);
    } finally {
      release();
    }
  };
}

export { MAX_PARALLEL };
