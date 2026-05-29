/**
 * safeFetch — обёртка над fetch с таймаутом, дедупликацией и защитой от retry-storm.
 *
 * 1. AbortController — отменяет запрос через `timeoutMs` (по умолчанию 5с).
 * 2. "in-flight" guard — вызов safeFetch с одинаковым `key` пропустит запрос,
 *    если предыдущий с этим key ещё не завершился.
 * 3. "retry cooldown" — после ошибки (включая AbortError) следующий запрос с тем
 *    же key можно сделать не раньше чем через `minRetryMs` (по умолчанию 2000ms).
 *    Это предотвращает request/retry storm при нестабильном соединении.
 *
 * Использование:
 *   import { safeFetch } from './safeFetch.js';
 *   safeFetch('/api/encoder/get', 'encoder').then(data => { ... });
 */

const _inflight = new Map();    // key → true (запрос в полёте)
const _lastError = new Map();   // key → timestamp (последняя ошибка)

const DEFAULT_TIMEOUT = 5000;
const MIN_RETRY_MS = 2000;      // минимальный интервал между повторами после ошибки

/**
 * @param {string} url — URL запроса
 * @param {string} key — уникальный ключ для in-flight дедупликации
 * @param {object} [opts] — дополнительные опции fetch (method, body, headers)
 * @param {number} [timeoutMs=5000] — таймаут в миллисекундах
 * @returns {Promise<any|null>} — parsed JSON или null (при ошибке/пропуске)
 */
export function safeFetch(url, key, opts = {}, timeoutMs = DEFAULT_TIMEOUT) {
  // In-flight guard: предыдущий запрос с этим ключом ещё не завершился
  if (_inflight.get(key)) {
    return Promise.resolve(null);
  }

  // Retry cooldown: после ошибки ждём MIN_RETRY_MS перед повтором
  const lastErr = _lastError.get(key);
  if (lastErr && (Date.now() - lastErr) < MIN_RETRY_MS) {
    return Promise.resolve(null);
  }

  _inflight.set(key, true);
  _lastError.delete(key);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  return fetch(url, { ...opts, signal: controller.signal })
    .then(r => {
      if (r.status === 304) return null;  // ETag match, no change
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .catch(err => {
      _lastError.set(key, Date.now());  // запоминаем время ошибки для cooldown
      if (err.name !== 'AbortError') {
        console.warn('[safeFetch] ' + key + ': ' + err.message);
      }
      return null;
    })
    .finally(() => {
      clearTimeout(timer);
      _inflight.delete(key);
    });
}
