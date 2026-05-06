/**
 * ws-client.js — Централизованный WebSocket клиент для Заготовки-М.
 *
 * Заменяет setInterval-polling единым push-потоком данных.
 *
 * Использование в табах:
 *   import { wsSubscribe, wsUnsubscribe } from '../ws-client.js';
 *
 *   useEffect(() => {
 *     const id = wsSubscribe('switch', data => setSwitch(data));
 *     return () => wsUnsubscribe(id);
 *   }, []);
 */

let _ws = null;
let _reconnTimer = null;
let _subId = 0;
const _subs = {};    // { id: { topic, callback } }
let _lastData = {};  // кэш последних данных по topic

function _getWsUrl() {
  const loc = window.location;
  const proto = loc.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${proto}//${loc.host}/ws`;
}

function _connect() {
  if (_ws && (_ws.readyState === WebSocket.OPEN || _ws.readyState === WebSocket.CONNECTING)) {
    return;
  }

  const url = _getWsUrl();
  console.log('[WS] connecting to', url);
  _ws = new WebSocket(url);

  _ws.onopen = () => {
    console.log('[WS] connected');
    if (_reconnTimer) {
      clearTimeout(_reconnTimer);
      _reconnTimer = null;
    }
  };

  _ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      _lastData = data;
      // Рассылаем каждому подписчику только его ключ
      for (const id in _subs) {
        const { topic, callback } = _subs[id];
        if (topic === '*') {
          callback(data);
        } else if (data[topic] !== undefined) {
          callback(data[topic]);
        }
      }
    } catch (e) {
      console.warn('[WS] parse error:', e);
    }
  };

  _ws.onclose = () => {
    console.warn('[WS] closed, reconnecting in 2s...');
    _ws = null;
    _scheduleReconnect();
  };

  _ws.onerror = (err) => {
    console.error('[WS] error:', err);
    _ws.close();
  };
}

function _scheduleReconnect() {
  if (_reconnTimer) return;
  _reconnTimer = setTimeout(() => {
    _reconnTimer = null;
    _connect();
  }, 2000);
}

/**
 * Подписка на топик.
 * @param {string} topic — ключ в JSON: 'switch', 'encoder', 'pid', 'button', 'temp', 'security', 'pintopin', 'time', или '*' для всего.
 * @param {function} callback — вызывается с данными при каждом push.
 * @returns {number} id подписки для wsUnsubscribe.
 */
export function wsSubscribe(topic, callback) {
  const id = ++_subId;
  _subs[id] = { topic, callback };

  // Автоматически поднимаем соединение при первой подписке
  if (!_ws || _ws.readyState !== WebSocket.OPEN) {
    _connect();
  }

  // Если уже есть кэш — сразу отдаём
  if (_lastData[topic] !== undefined && topic !== '*') {
    try { callback(_lastData[topic]); } catch(e) { /* ignore */ }
  }

  return id;
}

/**
 * Отписка.
 * @param {number} id — id подписки.
 */
export function wsUnsubscribe(id) {
  delete _subs[id];

  // Если нет подписчиков — закрываем соединение
  if (Object.keys(_subs).length === 0 && _ws) {
    console.log('[WS] no subscribers, closing connection');
    _ws.close();
    _ws = null;
  }
}

/**
 * Принудительное переподключение (после логина/логаута).
 */
export function wsReconnect() {
  if (_ws) {
    _ws.close();
    _ws = null;
  }
  _lastData = {};
  _connect();
}

/**
 * Геттер последнего кэшированного значения.
 */
export function wsGetLast(topic) {
  return _lastData[topic];
}
