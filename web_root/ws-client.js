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
const _subs = {};
let _lastData = {};
let _currentTab = '';
let _lastDataTs = 0;
let _watchdogTimer = null;
let _pingTimer = null;

const WS_DATA_TIMEOUT = 30000;
const WS_PING_INTERVAL = 5000;

function _getWsUrl() {
  const loc = window.location;
  const proto = loc.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${proto}//${loc.host}/ws`;
}

function _startWatchdog() {
  _stopWatchdog();
  _watchdogTimer = setInterval(() => {
    if (_ws && _ws.readyState === WebSocket.OPEN && _lastDataTs > 0) {
      const diff = Date.now() - _lastDataTs;
      if (diff > WS_DATA_TIMEOUT) {
        console.warn(`[WS] no data for ${diff}ms, forcing reconnect`);
        _forceReconnect();
      }
    }
  }, 2000);
}

function _stopWatchdog() {
  if (_watchdogTimer) { clearInterval(_watchdogTimer); _watchdogTimer = null; }
}

function _startPing() {
  _stopPing();
  _pingTimer = setInterval(() => {
    if (_ws && _ws.readyState === WebSocket.OPEN) {
      try { _ws.send('{}'); } catch(e) { /* ignore */ }
    }
  }, WS_PING_INTERVAL);
}

function _stopPing() {
  if (_pingTimer) { clearInterval(_pingTimer); _pingTimer = null; }
}

function _forceReconnect() {
  _stopPing();
  _stopWatchdog();
  if (_ws) {
    try { _ws.onclose = null; _ws.onerror = null; _ws.close(); } catch(e) {}
    _ws = null;
  }
  _lastDataTs = 0;
  if (_reconnTimer) { clearTimeout(_reconnTimer); _reconnTimer = null; }
  _connect();
}

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && Object.keys(_subs).length > 0) {
      if (!_ws || _ws.readyState !== WebSocket.OPEN) {
        console.log('[WS] tab visible, reconnecting...');
        _forceReconnect();
      } else if (_lastDataTs > 0 && Date.now() - _lastDataTs > WS_DATA_TIMEOUT) {
        console.log('[WS] tab visible, stale connection, reconnecting...');
        _forceReconnect();
      }
    }
  });
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
    _lastDataTs = Date.now();
    if (_reconnTimer) { clearTimeout(_reconnTimer); _reconnTimer = null; }
    _startPing();
    _startWatchdog();
    if (_currentTab) {
      _ws.send(JSON.stringify({ activeTab: _currentTab }));
    }
  };

  _ws.onmessage = (event) => {
    // Обновляем таймер при ЛЮБОМ входящем пакете включая ping-ответ
    _lastDataTs = Date.now();
    try {
      const data = JSON.parse(event.data);
      // Пустой ping-ответ {} — не рассылаем подписчикам
      if (Object.keys(data).length === 0) return;
      _lastData = data;
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
    console.warn('[WS] closed by server, reconnecting in 2s...');
    _ws = null;
    _stopPing();
    _stopWatchdog(); // ← исправлено: останавливаем watchdog при закрытии
    _lastDataTs = 0; // ← исправлено: сбрасываем таймер
    _scheduleReconnect();
  };

  _ws.onerror = (err) => {
    console.error('[WS] error:', err);
    if (_ws) _ws.close();
  };
}

function _scheduleReconnect() {
  if (_reconnTimer) return;
  _reconnTimer = setTimeout(() => {
    _reconnTimer = null;
    _connect();
  }, 2000);
}

export function wsSubscribe(topic, callback) {
  const id = ++_subId;
  _subs[id] = { topic, callback };
  if (!_ws || _ws.readyState !== WebSocket.OPEN) {
    _connect();
  }
  if (_lastData[topic] !== undefined && topic !== '*') {
    try { callback(_lastData[topic]); } catch(e) { /* ignore */ }
  }
  return id;
}

export function wsUnsubscribe(id) {
  delete _subs[id];
  if (Object.keys(_subs).length === 0 && _ws) {
    console.log('[WS] no subscribers, closing connection');
    _stopPing();
    _stopWatchdog();
    _ws.close();
    _ws = null;
  }
}

export function wsReconnect() {
  _lastData = {};
  _forceReconnect();
}

export function wsGetLast(topic) {
  return _lastData[topic];
}

export function wsSendActiveTab(tabName) {
  _currentTab = tabName || '';
  if (_ws && _ws.readyState === WebSocket.OPEN) {
    _ws.send(JSON.stringify({ activeTab: _currentTab }));
  }
}