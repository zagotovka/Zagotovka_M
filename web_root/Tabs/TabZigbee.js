import { h, useState, useEffect, useRef, html } from '../bundle.js';
import { registerPoll, unregisterPoll } from '../pollQueue.js';
import { Icons } from '../components.js';
import { MyPolzunok } from '../main.js';
import { ModalZigbee } from '../Modals/ModalZigbee.js';
import { ModalLearn } from '../Modals/ModalLearn.js';

const HELP_CONTENT = {
  ru: html`
    <div style="line-height:1.8; font-size:14px; color:#334155;">
<div style="margin-bottom:14px;padding:12px 16px;border-radius:12px;background:#f0f9ff;border:1px solid #7dd3fc;"><h3 class="font-bold mb-2">Рубильник On/Off по SMS и DTMF</h3><p style="margin-bottom:8px;">Ползунок On/Off любой строки этой страницы можно переключить с телефона, номер которого указан в настройках SIM800L: SMS-сообщением или во время звонка (тональный набор DTMF). Формат команды одинаков на всех страницах: <b>ID#КОД*</b>, где ID - число из колонки ID нужной строки.</p><table style="width:100%;border-collapse:collapse;margin:8px 0;font-size:13px;"><thead><tr><th style="border:1px solid #cbd5e1;padding:4px 10px;text-align:left;">Действие</th><th style="border:1px solid #cbd5e1;padding:4px 10px;text-align:left;">SMS</th><th style="border:1px solid #cbd5e1;padding:4px 10px;text-align:left;">DTMF (во время звонка)</th></tr></thead><tbody><tr><td style="border:1px solid #cbd5e1;padding:4px 10px;">Отключить строку (ползунок Off)</td><td style="border:1px solid #cbd5e1;padding:4px 10px;"><code>93#00*</code></td><td style="border:1px solid #cbd5e1;padding:4px 10px;"><code>93#00*#</code></td></tr><tr><td style="border:1px solid #cbd5e1;padding:4px 10px;">Включить строку (ползунок On)</td><td style="border:1px solid #cbd5e1;padding:4px 10px;"><code>93#11*</code></td><td style="border:1px solid #cbd5e1;padding:4px 10px;"><code>93#11*#</code></td></tr></tbody></table><p style="margin-bottom:8px;">В таблице ID = 93 - это пример, подставьте ID своей строки.</p><p style="margin-bottom:8px;">Несколько команд подряд: <code>93#00*7#11*</code> (SMS) и <code>93#00*7#11*#</code> (звонок). Ввод во время звонка всегда завершается символами <code>*#</code>: последняя команда уже заканчивается на <code>*</code>, поэтому в конце добавляется только <code>#</code>.</p><p style="margin-bottom:8px;">Коды для всех страниц: Button, Switch, Encoder, OneWire, Security, Zigbee - <b>00</b> (выкл) и <b>11</b> (вкл); Cron - <b>33</b> и <b>44</b>; PID - <b>55</b> и <b>66</b>.</p><p style="margin-bottom:8px;">В ответ приходит SMS-отчёт, например <code>OnOff: Pin93=OFF</code> (отчёт отправляется, только если включён общий ползунок SIM800L). Неверные команды попадают в список Invld pins/cmd.</p><p style="margin-bottom:8px;">ID дочерних строк вида 93.1 по DTMF набрать нельзя (на клавиатуре нет точки): такие строки переключаются только по SMS, например <code>93.1#00*</code>. Головная строка (например 93) переключается и по SMS, и по DTMF. ID 222 по SMS и DTMF недоступен: комбинация 222 зарезервирована под быструю команду "выключить все SMS".</p></div>
      <p style="margin-bottom:12px; font-weight:700; font-size:15px;">Zigbee Devices — справка</p>

      <p style="margin-bottom:10px;">На этой странице отображаются все Zigbee-устройства, добавленные на странице <b>Select pin</b>. Здесь вы управляете их состоянием и параметрами.</p>

      <div style="margin-bottom:14px; line-height:1.6;">
        <p style="font-weight:700; margin-bottom:6px;">Колонки таблицы:</p>
        <span style="display:block;"><b>ID</b> — внутренний идентификатор устройства в контроллере</span>
        <span style="display:block;"><b>IEEE Address</b> — уникальный 64-битный адрес Zigbee-устройства</span>
        <span style="display:block;"><b>Type</b> — тип устройства (Socket, Lamp, Dimmer, Button, Switch, PIR)</span>
        <span style="display:block;"><b>Info</b> — подпись / название устройства (например, «Лампа кухня»)</span>
        <span style="display:block;"><b>On/Off</b> — переключатель состояния устройства</span>
      </div>

      <div style="margin-bottom:14px; line-height:1.6;">
        <p style="font-weight:700; margin-bottom:6px;">Кнопка «Управление»:</p>
        <div class="bg-blue-50 p-4 rounded-lg border border-blue-200 text-sm">
          <p>Открывает окно настройки устройства. Здесь можно:</p>
          <ul class="list-disc pl-5 space-y-1 text-slate-700 mt-2">
            <li>Изменить IEEE Address и Endpoint</li>
            <li>Выбрать тип устройства (лампа / реле / диммер)</li>
            <li>Установить подпись (Info)</li>
            <li>Управление яркостью и цветом (для ламп)</li>
            <li>Перезапросить кластеры устройства (Rescan)</li>
          </ul>
        </div>
      </div>

      <div style="margin-bottom:14px; line-height:1.6;">
        <p style="font-weight:700; margin-bottom:6px;">Кнопка «Обучение»:</p>
        <div class="bg-violet-50 p-4 rounded-lg border border-violet-200 text-sm">
          <p>Запускает режим обучения для Zigbee-кнопок и переключателей. После нажатия:</p>
          <ol style="padding-left:20px; margin-top:6px;" class="text-slate-700">
            <li>Нажмите физическую кнопку на Zigbee-устройстве</li>
            <li>Контроллер автоматически определит тип нажатия (single click, double click, long press)</li>
            <li>Связанное действие можно настроить на странице <b>Zigbee Buttons</b></li>
          </ol>
          <p style="margin-top:8px; color:#6b21a8;">Обучение доступно только для устройств с ролью <b>Button</b> или <b>Switch</b>.</p>
        </div>
      </div>

      <div style="line-height:1.6;">
        <p style="font-weight:700; margin-bottom:6px;">Мульти-устройства (Multi):</p>
        <p>Если одно физическое Zigbee-устройство имеет несколько эндпоинтов (например, лампа с управлением яркостью + цветом), строки группируются. Нажмите на строку чтобы развернуть группу.</p>
      </div>
    </div>
  `,
  en: html`
    <div style="line-height:1.8; font-size:14px; color:#334155;">
<div style="margin-bottom:14px;padding:12px 16px;border-radius:12px;background:#f0f9ff;border:1px solid #7dd3fc;"><h3 class="font-bold mb-2">On/Off switch by SMS and DTMF</h3><p style="margin-bottom:8px;">The On/Off slider of any row on this page can be switched from the phone number set in the SIM800L settings: by SMS or during a call (DTMF tones). The command format is the same on every page: <b>ID#CODE*</b>, where ID is the number from the ID column of the needed row.</p><table style="width:100%;border-collapse:collapse;margin:8px 0;font-size:13px;"><thead><tr><th style="border:1px solid #cbd5e1;padding:4px 10px;text-align:left;">Action</th><th style="border:1px solid #cbd5e1;padding:4px 10px;text-align:left;">SMS</th><th style="border:1px solid #cbd5e1;padding:4px 10px;text-align:left;">DTMF (during a call)</th></tr></thead><tbody><tr><td style="border:1px solid #cbd5e1;padding:4px 10px;">Turn the row off (slider Off)</td><td style="border:1px solid #cbd5e1;padding:4px 10px;"><code>93#00*</code></td><td style="border:1px solid #cbd5e1;padding:4px 10px;"><code>93#00*#</code></td></tr><tr><td style="border:1px solid #cbd5e1;padding:4px 10px;">Turn the row on (slider On)</td><td style="border:1px solid #cbd5e1;padding:4px 10px;"><code>93#11*</code></td><td style="border:1px solid #cbd5e1;padding:4px 10px;"><code>93#11*#</code></td></tr></tbody></table><p style="margin-bottom:8px;">In the table ID = 93 is an example, use the ID of your own row.</p><p style="margin-bottom:8px;">Several commands in a row: <code>93#00*7#11*</code> (SMS) and <code>93#00*7#11*#</code> (call). Input during a call always ends with <code>*#</code>: the last command already ends with <code>*</code>, so only <code>#</code> is added at the end.</p><p style="margin-bottom:8px;">Codes for all pages: Button, Switch, Encoder, OneWire, Security, Zigbee - <b>00</b> (off) and <b>11</b> (on); Cron - <b>33</b> and <b>44</b>; PID - <b>55</b> and <b>66</b>.</p><p style="margin-bottom:8px;">An SMS report is sent back, for example <code>OnOff: Pin93=OFF</code> (the report is sent only if the common SIM800L slider is On). Wrong commands are listed in Invld pins/cmd.</p><p style="margin-bottom:8px;">IDs of child rows like 93.1 cannot be dialed during a call (the keypad has no dot): such rows are switched by SMS only, for example <code>93.1#00*</code>. A head row (for example 93) is switched both by SMS and DTMF. ID 222 is not available by SMS or DTMF: the combination 222 is reserved for the quick command "turn all SMS alerts off".</p></div>
      <p style="margin-bottom:12px; font-weight:700; font-size:15px;">Zigbee Devices — Help</p>

      <p style="margin-bottom:10px;">This page displays all Zigbee devices added on the <b>Select pin</b> page. Here you can control their state and configure parameters.</p>

      <div style="margin-bottom:14px; line-height:1.6;">
        <p style="font-weight:700; margin-bottom:6px;">Table columns:</p>
        <span style="display:block;"><b>ID</b> — internal device identifier in the controller</span>
        <span style="display:block;"><b>IEEE Address</b> — unique 64-bit address of the Zigbee device</span>
        <span style="display:block;"><b>Type</b> — device type (Socket, Lamp, Dimmer, Button, Switch, PIR)</span>
        <span style="display:block;"><b>Info</b> — device label / name (e.g. "Kitchen lamp")</span>
        <span style="display:block;"><b>On/Off</b> — device state toggle</span>
      </div>

      <div style="margin-bottom:14px; line-height:1.6;">
        <p style="font-weight:700; margin-bottom:6px;">«Control» button:</p>
        <div class="bg-blue-50 p-4 rounded-lg border border-blue-200 text-sm">
          <p>Opens the device configuration window. Here you can:</p>
          <ul class="list-disc pl-5 space-y-1 text-slate-700 mt-2">
            <li>Change IEEE Address and Endpoint</li>
            <li>Select device type (lamp / relay / dimmer)</li>
            <li>Set a label (Info)</li>
            <li>Adjust brightness and color (for lamps)</li>
            <li>Re-scan device clusters (Rescan)</li>
          </ul>
        </div>
      </div>

      <div style="margin-bottom:14px; line-height:1.6;">
        <p style="font-weight:700; margin-bottom:6px;">«Learn» button:</p>
        <div class="bg-violet-50 p-4 rounded-lg border border-violet-200 text-sm">
          <p>Starts learning mode for Zigbee buttons and switches. After pressing:</p>
          <ol style="padding-left:20px; margin-top:6px;" class="text-slate-700">
            <li>Press the physical button on the Zigbee device</li>
            <li>The controller automatically detects the press type (single click, double click, long press)</li>
            <li>The associated action can be configured on the <b>Zigbee Buttons</b> page</li>
          </ol>
          <p style="margin-top:8px; color:#6b21a8;">Learning is only available for devices with <b>Button</b> or <b>Switch</b> role.</p>
        </div>
      </div>

      <div style="line-height:1.6;">
        <p style="font-weight:700; margin-bottom:6px;">Multi-device groups:</p>
        <p>If a physical Zigbee device has multiple endpoints (e.g. a lamp with brightness + color control), rows are grouped together. Click on a row to expand the group.</p>
      </div>
    </div>
  `
};

export function TabZigbee({}) {
  const [devices, setDevices] = useState([]);
  const [language, setLanguage] = useState('ru');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [learnIeee, setLearnIeee] = useState(null);
  const [expandedGroups, setExpandedGroups] = useState({});
  const isPending = useRef(false);
  const lastChangeTime = useRef(0);
  const serverSnapshot = useRef({});
  const dirtyIds = useRef(new Set());
  const pendingConfigSave = useRef(null);
  const modalOpenRef = useRef(false);

  const clusterToDeviceType = (clusters, override) => {
    if (override === 7) return 'pir';
    if (override === 1) return 'socket';
    if (override === 2) return 'dimmer';
    if (override === 3) return 'dimmer';
    if (override === 4) return 'lamp';
    const cl = Array.isArray(clusters) ? clusters : [clusters || 6];
    if (cl.includes(768)) return 'lamp';
    if (cl.includes(8)) return 'dimmer';
    return 'socket';
  };

  const buildSnapshot = (d) => ({
    zbee_ieee: d.ieee || '',
    zbee_endpoint: d.ep || 1,
    clusters: d.clusters || [6],
    zbee_label: d.info || '',
    onoff: d.onoff || 0,
    brightness: d.brightness || 254,
    color_hex: d.color_hex || 0xFFAA00,
  });

  const normalizeDevice = (d) => ({
    id: d.id,
    zbee_ieee: (d.ieee || '').toLowerCase().trim(),
    zbee_endpoint: d.ep || 1,
    clusters: d.clusters || [6],
    zbee_device_type: d.type === 'pir' ? 'pir'
      : d.type === 'sensor' ? 'sensor'
      : (d.role === 3 ? 'trigger' : (d.role === 5 ? 'switch' : clusterToDeviceType(d.clusters, d.override))),
    zbee_label: d.info || '',
    onoff: d.onoff || 0,
    brightness: d.brightness || 254,
    color_hex: d.color_hex || 0xFFAA00,
    zbee_role: d.role || 0,
    ep: d.ep || 0,
    override: d.override || 0,
  });

  const refresh = () =>
    fetch('/api/zigbee/get', { cache: 'no-store' })
      .then(r => r.json())
      .then(r => {
        const zigbee = r.zigbee || [];
        const normalized = zigbee.map(normalizeDevice);
        setDevices(normalized);
        setLanguage(r.lang || 'ru');
        const snap = {};
        zigbee.forEach(d => { snap[d.id] = buildSnapshot(d); });
        serverSnapshot.current = snap;
        dirtyIds.current.clear();
      })
      .catch(err => console.error('Error fetching zigbee data:', err));

  useEffect(() => {
    refresh();
    let active = true;
    registerPoll('zigbee', '/api/zigbee/get', function(data) {
      if (!active) return;
      if (isPending.current) return;
      if (Date.now() - lastChangeTime.current < 3000) return;
      if (data) {
        const zigbee = data.zigbee || [];
        const normalized = zigbee.map(normalizeDevice);
        const snap = {};
        zigbee.forEach(d => { snap[d.id] = buildSnapshot(d); });
        serverSnapshot.current = snap;

        if (!modalOpenRef.current) {
          setDevices(normalized);
          setLanguage(data.lang || 'ru');
          dirtyIds.current.clear();
          setSelectedDevice(prev => {
            if (!prev) return null;
            const updated = normalized.find(d => d.id === prev.id);
            return updated || prev;
          });
        }
      }
    });
    return () => { active = false; unregisterPoll('zigbee'); };
  }, []);

  const handleToggle = (device, onoff) => {
    const updated = { ...device, onoff: onoff ? 1 : 0 };
    setDevices(prev => prev.map(d => d.id === device.id ? updated : d));
    isPending.current = true;
    lastChangeTime.current = Date.now();

    /* Master enable/disable — только onoff, без MQTT-команды */
    fetch('/api/zigbee/enable', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: device.id, onoff: onoff ? 1 : 0 })
    })
      .then(r => r.json())
      .finally(() => {
        setTimeout(() => { isPending.current = false; }, 1500);
      });
  };

  const toggleGroup = (ieee) => {
    setExpandedGroups(prev => ({ ...prev, [ieee]: !prev[ieee] }));
  };

  const handleEdit = (device) => {
    const displayId = device.display_id || device.id;
    setSelectedDevice({ ...device, displayId });
    setIsModalOpen(true);
    modalOpenRef.current = true;
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDevice(null);
    modalOpenRef.current = false;
    setTimeout(() => refresh(), 300);
  };

  const handleDeviceUpdate = (updatedDevice) => {
    const snap = serverSnapshot.current[updatedDevice.id] || {};
    const typeToClusters = { socket: [6], dimmer: [6, 8], lamp: [6, 8, 768] };
    const clusters = updatedDevice.clusters || typeToClusters[updatedDevice.zbee_device_type] || [6];

    const cur = {
      zbee_ieee: updatedDevice.zbee_ieee || '',
      zbee_endpoint: parseInt(updatedDevice.zbee_endpoint) || 1,
      clusters: clusters,
      zbee_label: updatedDevice.zbee_label || '',
      onoff: updatedDevice.onoff || 0,
      brightness: updatedDevice.brightness,
      color: updatedDevice.color,
      color_hex: updatedDevice.color_hex,
    };

    const clustersEqual = (a, b) => {
      const sa = Array.isArray(a) ? [...a].sort() : [a || 6];
      const sb = Array.isArray(b) ? [...b].sort() : [b || 6];
      return sa.length === sb.length && sa.every((v, i) => v === sb[i]);
    };

    const onoffChanged = cur.onoff !== snap.onoff;
    const configChanged =
      cur.zbee_ieee !== snap.zbee_ieee ||
      String(cur.zbee_endpoint) !== String(snap.zbee_endpoint) ||
      !clustersEqual(cur.clusters, snap.clusters) ||
      cur.zbee_label !== snap.zbee_label ||
      cur.brightness !== snap.brightness ||
      cur.color_hex !== snap.color_hex;

    if (!onoffChanged && !configChanged) return;

    lastChangeTime.current = Date.now();
    setDevices(prev => prev.map(d => d.id === updatedDevice.id ? updatedDevice : d));

    if (onoffChanged) {
      /* Физическое управление — MQTT-команда, без master enable */
      fetch('/api/zigbee/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: updatedDevice.id, onoff: cur.onoff })
      }).catch(err => console.error('Error sending command:', err));
    }

    if (configChanged) {
      fetch('/api/zigbee/set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: updatedDevice.id,
          ieee: cur.zbee_ieee,
          ep: cur.zbee_endpoint,
          clusters: JSON.stringify(cur.clusters),
          info: cur.zbee_label,
          ...(cur.brightness !== snap.brightness && { brightness: cur.brightness }),
          ...(cur.color_hex !== snap.color_hex && { color_hex: cur.color_hex }),
          override: updatedDevice.override
        })
      }).catch(err => console.error('Error saving config:', err));
    }

    dirtyIds.current.delete(updatedDevice.id);
    serverSnapshot.current[updatedDevice.id] = { ...cur };
    setTimeout(() => { lastChangeTime.current = 0; }, 3000);
  };

  const handleRescan = (device) => {
    fetch('/api/zigbee/rescan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: device.id })
    })
      .then(r => r.json())
      .then(() => {
        /* Сбрасываем тип устройства до определения зонда */
        setDevices(prev => prev.map(d =>
          d.id === device.id ? { ...d, clusters: [6], zbee_device_type: 'socket' } : d
        ));
      })
      .catch(err => console.error('Error triggering rescan:', err));
  };

  const getDeviceTypeLabel = (deviceType) => {
    switch (deviceType) {
      case 'lamp': return 'Лампа (яркость + цвет)';
      case 'dimmer': return 'Лампа (яркость)';
      case 'trigger': return 'Button';
      case 'switch': return 'Switch';
      case 'pir': return 'PIR';
      case 'sensor': return 'Sensor';
      default: return 'Socket';
    }
  };

  const Th = ({ title }) => html`<th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide">${title}</th>`;

  if (!devices.length) return html`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col justify-center items-center">
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
          Zigbee Devices
        </div>
        <div class="text-center text-slate-500 text-lg py-12">
          ${language === 'ru' ? 'Нет настроенных Zigbee устройств. Добавьте их на странице Select pin.' : 'No Zigbee devices configured. Add them on the Select pin page.'}
        </div>
      </div>

      <div class="w-full flex justify-between items-center mb-4 mt-6 bg-white/40 backdrop-blur-md border border-white/60 p-4 rounded-2xl relative z-10">
        <button class="px-8 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-teal-400 to-cyan-500" onclick=${() => setShowHelp(!showHelp)}>
          ${showHelp ? (language === 'ru' ? 'Скрыть справку' : 'Hide Help') : (language === 'ru' ? 'Показать справку' : 'Show Help')}
        </button>
      </div>
      ${showHelp && html`<div class="mt-2 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner w-full relative z-10">${HELP_CONTENT[language] || HELP_CONTENT['en']}</div>`}
    </div>
  `;

  return html`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col justify-center items-center">
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      
      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
          Zigbee Devices
        </div>
        
        <div class="flex-grow flex flex-col justify-center items-center w-full">
          <div class="w-full">
            <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6 overflow-auto">
              <div class="overflow-x-auto w-full">
                <table class="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <${Th} title="ID" />
                      <${Th} title="IEEE Address" />
                      <${Th} title="Type" />
                      <${Th} title="Info" />
                      <${Th} title="On/Off" />
                      <${Th} title="Action" />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/40">
                    ${(() => {
                      /* Группировка: { ieee → [device, ...] } */
                      const groups = {};
                      devices.forEach(d => {
                        const ieeeKey = (d.zbee_ieee || '').toLowerCase().trim();
                        if (!groups[ieeeKey]) groups[ieeeKey] = [];
                        groups[ieeeKey].push(d);
                      });

                      const rows = [];
                      Object.values(groups).forEach(group => {
                        const head = group[0];
                        const hasMultiDp = group.length > 1;
                        const deviceType = head.zbee_device_type || 'socket';
                        const typeLabel = hasMultiDp ? 'Multi' : deviceType;

                        /* Головная строка */
                        const isExpanded = !!expandedGroups[head.zbee_ieee];
                        rows.push(html`
                          <tr class="hover:bg-slate-200/80 transition-colors bg-white/80 ${hasMultiDp ? 'cursor-pointer' : ''}"
                              onClick=${hasMultiDp ? () => toggleGroup(head.zbee_ieee) : undefined}>
                            <td class="px-6 py-2 text-sm text-slate-800" style="position:relative">
                              ${hasMultiDp ? html`<span style="position:absolute;left:60px" class="text-slate-500">${isExpanded ? '▼' : '▶'}</span>` : ''}${head.display_id || head.id}
                            </td>
                            <td class="px-6 py-2 text-sm text-slate-800 font-mono">
                              ${head.zbee_ieee || '—'}${hasMultiDp ? html`<span class="text-xs text-slate-400 font-sans ml-1.5">(EP${head.ep || 1})</span>` : ''}
                            </td>
                            <td class="px-6 py-2 text-sm text-slate-700">
                              ${hasMultiDp
                                ? html`Multi <span class="text-xs text-slate-400">×${group.length}</span>`
                                : getDeviceTypeLabel(typeLabel)}
                            </td>
                            <td class="px-6 py-2 text-sm text-slate-600">${head.zbee_label || ''}</td>
                            <td class="px-6 py-2" onClick=${(e) => e.stopPropagation()}>
                              <${MyPolzunok} value=${head.onoff || 0} disabled=${dirtyIds.current.has(head.id)} onChange=${(val) => {
                                if (hasMultiDp) {
                                  group.forEach(d => {
                                    handleToggle(d, val === 1);
                                  });
                                }
                                handleToggle(head, val);
                              }} />
                            </td>
                            <td class="px-6 py-2 text-sm flex gap-2" onClick=${(e) => e.stopPropagation()}>
                              <button
                                onClick=${() => handleEdit(head)}
                                class="px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600"
                              >
                                ${language === 'ru' ? 'Управление' : 'Control'}
                              </button>
                              <button
                                onClick=${() => setLearnIeee(head.zbee_ieee)}
                                style="background: linear-gradient(to right, #6366f1, #8b5cf6);"
                                class="px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 hover:opacity-90"
                              >
                                ${language === 'ru' ? 'Обучение' : 'Learn'}
                              </button>
                            </td>
                          </tr>
                        `);

                        /* Sub-строки для мульти-EP */
                        if (hasMultiDp && isExpanded) {
                          group.slice(1).forEach((d, idx) => {
                            const subType = d.zbee_device_type === 'pir' ? 'PIR'
                                          : d.zbee_device_type === 'sensor' ? 'Sensor'
                                          : d.zbee_device_type === 'trigger' ? 'Button'
                                          : d.zbee_device_type === 'switch' ? 'Switch'
                                          : (d.clusters || []).includes(768) ? 'Color'
                                          : (d.clusters || []).includes(8) ? 'Dimmer'
                                          : 'On/Off';
                            rows.push(html`
                              <tr class="hover:bg-slate-200/80 transition-colors bg-white/60"
                                  style="font-size:0.9em;">
                                <td class="px-6 py-2 text-sm font-mono"
                                    style="padding-left:60px; color:#6b7fa3;">${d.display_id || d.id}</td>
                                <td class="px-6 py-2 text-sm font-mono"
                                    style="border-left:3px solid var(--accent-color, #06b6d4); padding-left:60px; color:#6b7fa3;">↳ EP${d.ep}</td>
                                <td class="px-6 py-2 text-sm" style="padding-left:60px; color:#6b7fa3;">${subType}</td>
                                <td class="px-6 py-2 text-sm" style="padding-left:60px; color:#6b7fa3;">${d.zbee_label || ''}</td>
                                <td class="px-6 py-2" style="padding-left:60px;">
                                  <${MyPolzunok} value=${d.onoff || 0} disabled=${(head.onoff || 0) === 0 || dirtyIds.current.has(d.id)} activeColor="linear-gradient(to right, #5b7093, #8599b8)" onChange=${(val) => handleToggle(d, val)} />
                                </td>
                                <td class="px-6 py-2 text-sm">
                                </td>
                              </tr>
                            `);
                          });
                        }
                      });
                      return rows;
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      ${isModalOpen && selectedDevice && html`
        <${ModalZigbee}
          device=${selectedDevice}
          allDevices=${devices}
          onClose=${closeModal}
          onUpdate=${handleDeviceUpdate}
          onRescan=${handleRescan}
          language=${language}
        />
      `}

      ${learnIeee && html`
        <${ModalLearn}
          ieee=${learnIeee}
          language=${language}
          existingLabels=${devices
            .filter(d => (d.zbee_ieee || '').toLowerCase() === (learnIeee || '').toLowerCase())
            .map(d => ({ ep: d.ep, info: d.zbee_label }))}
          onClose=${() => setLearnIeee(null)}
          onSaved=${() => {
            setLearnIeee(null);
            refresh();
          }}
          onGoToButtonPin=${() => {
            setLearnIeee(null);
            window.location.href = '/#/button';
          }}
        />
      `}

      <div class="w-full flex justify-between items-center mb-4 mt-6 bg-white/40 backdrop-blur-md border border-white/60 p-4 rounded-2xl">
        <button class="px-8 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-teal-400 to-cyan-500" onclick=${() => setShowHelp(!showHelp)}>
          ${showHelp ? (language === 'ru' ? 'Скрыть справку' : 'Hide Help') : (language === 'ru' ? 'Показать справку' : 'Show Help')}
        </button>
      </div>
      ${showHelp && html`<div class="mt-2 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner w-full">${HELP_CONTENT[language] || HELP_CONTENT['en']}</div>`}
    </div>
  `;
}