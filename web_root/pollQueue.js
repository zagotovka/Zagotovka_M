/**
 * pollQueue — глобальный sequential poller.
 *
 * Max 1 fetch одновременно. Вкладки регистрируются через registerPoll().
 * Polling: round-robin по зарегистрированным endpoint'ам.
 *
 * При unregisterPoll() in-flight запрос НЕ абортится — даём ему завершиться,
 * но callback заменяется на no-op. Это предотвращает cascade abort storm
 * при быстром переключении вкладок.
 *
 * Использование:
 *   import { registerPoll, unregisterPoll } from './pollQueue.js';
 *
 *   useEffect(() => {
 *     registerPoll('buttons', '/api/state/button', (data) => {
 *       if (data !== null && data !== undefined) setButton(data.buttons);
 *     });
 *     return () => unregisterPoll('buttons');
 *   }, []);
 */

const _registered = new Map();  // key → { url, callback, etag, oneShot, failCount, backoffMs }
let _active = false;
let _timer = null;
let _keys = [];
let _idx = 0;

const MAX_FAILS = 3;           // остановка после N подряд ошибок
const BASE_BACKOFF = 2000;     // начальный backoff (мс)

const POLL_INTERVAL = 1000;   // интервал между запросами (мс)
const FETCH_TIMEOUT = 5000;   // таймаут одного запроса (мс)
const MAX_QUEUE = 8;          // максимальная глубина очереди

/**
 * @param {string} key
 * @param {string} url
 * @param {function} callback  — вызывается с данными (или null)
 * @param {object} [opts]
 * @param {boolean} [opts.immediate] — вставить в начало очереди и выполнить немедленно
 * @param {boolean} [opts.oneShot]   — удалить после первого успешного ответа
 */
export function registerPoll(key, url, callback, opts = {}) {
  // Ограничение глубины очереди: вытесняем самую старую запись, кроме 'common'
  if (_keys.length >= MAX_QUEUE && !_registered.has(key)) {
    for (let i = 0; i < _keys.length; i++) {
      const oldKey = _keys[i];
      if (oldKey !== 'common') {
        _registered.delete(oldKey);
        _keys.splice(i, 1);
        if (_idx > _keys.length) _idx = 0;
        break;
      }
    }
  }

  _registered.set(key, { url, callback, etag: null, oneShot: opts.oneShot || false, failCount: 0, backoffMs: 0 });
  _keys = Array.from(_registered.keys());
  // immediate: этот ключ будет опрошен СЛЕДУЮЩИМ тиком
  if (opts.immediate) {
    _idx = _keys.indexOf(key);
    // Если в данный момент опрос не активен (idle), сбрасываем таймер и запускаем опрос мгновенно
    if (!_active) {
      _clearTimer();
      _timer = setTimeout(_tick, 0);
      return;
    }
  }
  if (!_timer) _schedule();
}

export function unregisterPoll(key) {
  // НЕ абортим in-flight запрос — даём ему завершиться,
  // но заменяем callback на no-op чтобы избежать stale update
  const entry = _registered.get(key);
  if (entry) entry.callback = function() {};

  _registered.delete(key);
  _keys = Array.from(_registered.keys());
  if (_keys.length === 0) _clearTimer();
}

function _clearTimer() {
  clearTimeout(_timer);
  _timer = null;
}

function _schedule(ms) {
  _clearTimer();
  _timer = setTimeout(_tick, ms !== undefined ? ms : POLL_INTERVAL);
}

async function _tick() {
  if (_active) { _schedule(); return; }
  if (_keys.length === 0) { _clearTimer(); return; }

  _active = true;

  // Round-robin: следующий endpoint
  if (_idx >= _keys.length) _idx = 0;
  const key = _keys[_idx];
  const entry = _registered.get(key);

  if (entry) {
    const controller = new AbortController();
    const timeoutId = setTimeout(function() { controller.abort(); }, FETCH_TIMEOUT);

    try {
      const headers = {};
      if (entry.etag) headers['If-None-Match'] = entry.etag;

      const r = await fetch(entry.url, {
        signal: controller.signal,
        cache: 'no-store',
        headers: headers
      });
      clearTimeout(timeoutId);

      const newEtag = r.headers.get('ETag');
      if (newEtag) entry.etag = newEtag;

      if (r.status === 304) { /* no change */ }
      else if (r.ok) {
        const data = await r.json();
        entry.callback(data);
        entry.failCount = 0;
        entry.backoffMs = 0;
        // oneShot: удаляем после первого успешного ответа
        if (entry.oneShot) {
          _registered.delete(key);
          _keys = Array.from(_registered.keys());
        }
      } else if (r.status === 401 || r.status === 403) {
        // session expired — stop polling this entry immediately
        entry.callback({ __session_expired: true });
        _registered.delete(key);
        _keys = Array.from(_registered.keys());
        if (_idx >= _keys.length && _keys.length > 0) _idx = 0;
      }
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name !== 'AbortError') {
        console.warn('[pollQueue] ' + key + ': ' + err.message);
      }
      if (entry) {
        entry.etag = null;
        entry.failCount = (entry.failCount || 0) + 1;
        if (entry.failCount >= MAX_FAILS) {
          console.warn('[pollQueue] ' + key + ': stopped after ' + entry.failCount + ' consecutive errors');
          _registered.delete(key);
          _keys = Array.from(_registered.keys());
          if (_idx >= _keys.length && _keys.length > 0) _idx = 0;
        } else {
          entry.backoffMs = Math.min((entry.backoffMs || BASE_BACKOFF) * 2, 30000);
        }
      }
    }
  }

  _active = false;

  // Определяем задержку: если текущий entry в backoff — используем его
  const currentEntry = _registered.get(key);
  const delay = (currentEntry && currentEntry.backoffMs > 0)
    ? currentEntry.backoffMs
    : POLL_INTERVAL;

  _idx++;
  if (_idx >= _keys.length) {
    _idx = 0;
    if (_keys.length > 0) _schedule(delay); else _clearTimer();
  } else {
    if (_keys.length > 0) _schedule(0); else _clearTimer();
  }
}
