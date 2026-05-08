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
let _currentTab = '';  // активная вкладка для фильтрации на STM32
let _lastDataTs = 0;   // timestamp последнего полученного сообщения
let _watchdogTimer = null; // watchdog для обнаружения мёртвого соединения
let _pingTimer = null;     // периодический ping для keepalive

const WS_DATA_TIMEOUT = 15000; // 15с без данных = мёртвое соединение
const WS_PING_INTERVAL = 5000;  // ping каждые 5с (чтобы Mongoose не закрыл idle-соединение)

function _getWsUrl() {
  const loc = window.location;
  const proto = loc.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${proto}//${loc.host}/ws`;
}

/* Watchdog: если данные не приходили > WS_DATA_TIMEOUT — reconnect */
function _startWatchdog() {
  _stopWatchdog();
  _watchdogTimer = setInterval(() => {
    if (_ws && _ws.readyState === WebSocket.OPEN && _lastDataTs > 0) {
      const diff = Date.now() - _lastDataTs;
      if (diff > WS_DATA_TIMEOUT) {
        console.warn(`[WS] watchdog triggered: no data for ${diff}ms (timeout=${WS_DATA_TIMEOUT}), forcing reconnect`);
        _forceReconnect();
      }
    }
  }, 2000);
}

function _stopWatchdog() {
  if (_watchdogTimer) { clearInterval(_watchdogTimer); _watchdogTimer = null; }
}

/* Периодический ping чтобы соединение не умирало через NAT/proxy/Mongoose idle_timeout */
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

/* Принудительный reconnect — закрывает старый WS и создаёт новый */
function _forceReconnect() {
  _stopPing();
  if (_ws) {
    try { _ws.onclose = null; _ws.onerror = null; _ws.close(); } catch(e) {}
    _ws = null;
  }
  _lastDataTs = 0;
  if (_reconnTimer) { clearTimeout(_reconnTimer); _reconnTimer = null; }
  _connect();
}

/* Page Visibility API — при возврате на вкладку сразу reconnect */
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && Object.keys(_subs).length > 0) {
      /* Вкладка стала видимой — проверяем/переподключаем WS */
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
    if (_reconnTimer) {
      clearTimeout(_reconnTimer);
      _reconnTimer = null;
    }
    _startPing();
    _startWatchdog();
    /* При реконнекте — переотправляем activeTab */
    if (_currentTab) {
      _ws.send(JSON.stringify({ activeTab: _currentTab }));
    }
  };

  _ws.onmessage = (event) => {
    // Безусловное обновление таймера при ЛЮБОМ входящем пакете
    _lastDataTs = Date.now();
    
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
    console.warn('[WS] closed by server, reconnecting in 2s...');
    _ws = null;
    _stopPing();
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

/**
 * Отправляет STM32 имя активной вкладки для фильтрации данных.
 * @param {string} tabName — 'switch'|'encoder'|'pid'|'button'|'temp'|'security'|''
 */
export function wsSendActiveTab(tabName) {
  _currentTab = tabName || '';
  if (_ws && _ws.readyState === WebSocket.OPEN) {
    _ws.send(JSON.stringify({ activeTab: _currentTab }));
  }
}
