/**
 * safeFetch — обёртка над fetch с таймаутом и защитой от накопления запросов.
 *
 * 1. AbortController — отменяет запрос через `timeoutMs` (по умолчанию 5с).
 *    Это предотвращает зависшие соединения которые забивают пул браузера (6 max).
 *
 * 2. "in-flight" guard — вызов safeFetch с одинаковым `key` пропустит запрос,
 *    если предыдущий с этим key ещё не завершился. Это защищает от накопления
 *    promise-цепочек при агрессивном polling.
 *
 * Использование:
 *   import { safeFetch } from './safeFetch.js';
 *   // вместо fetch('/api/encoder/get').then(r => r.json())
 *   safeFetch('/api/encoder/get', 'encoder').then(data => { ... });
 */

const _inflight = new Map();

/**
 * @param {string} url — URL запроса
 * @param {string} key — уникальный ключ для in-flight дедупликации (напр. 'encoder', 'switch')
 * @param {object} [opts] — дополнительные опции fetch (method, body, headers)
 * @param {number} [timeoutMs=5000] — таймаут в миллисекундах
 * @returns {Promise<any|null>} — parsed JSON или null (при ошибке/пропуске)
 */
export function safeFetch(url, key, opts = {}, timeoutMs = 5000) {
  // Если предыдущий запрос с этим ключом ещё в полёте — пропускаем
  if (_inflight.get(key)) {
    return Promise.resolve(null);
  }

  _inflight.set(key, true);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  return fetch(url, { ...opts, signal: controller.signal })
    .then(r => {
      if (r.status === 304) return null;  // ETag match, no change
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    })
    .catch(err => {
      if (err.name !== 'AbortError') {
        console.warn(`[safeFetch] ${key}: ${err.message}`);
      }
      return null;
    })
    .finally(() => {
      clearTimeout(timer);
      _inflight.delete(key);
    });
}
