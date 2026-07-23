import { h, useState, useEffect, useRef, html } from '../bundle.js';
import { registerPoll, unregisterPoll } from '../pollQueue.js';
import { Icons } from '../components.js';
import { MyPolzunok } from '../main.js';
import { ModalZigbee } from '../Modals/ModalZigbee.js';
import { ModalLearn } from '../Modals/ModalLearn.js';

const HELP_CONTENT = {
  ru: html`
    <div style="line-height:1.8; font-size:14px; color:#334155;">
      <p style="margin-bottom:12px; font-weight:700; font-size:15px;">Zigbee Devices — справка</p>

      <p style="margin-bottom:10px;">На этой странице отображаются все Zigbee-устройства, добавленные на странице <b>Select pin</b>. Здесь вы управляете их состоянием и параметрами.</p>

      <div style="margin-bottom:14px; line-height:1.6;">
        <p style="font-weight:700; margin-bottom:6px;">Колонки таблицы:</p>
        <span style="display:block;"><b>ID</b> — внутренний идентификатор устройства в контроллере</span>
        <span style="display:block;"><b>IEEE Address</b> — уникальный 64-битный адрес Zigbee-устройства</span>
        <span style="display:block;"><b>Type</b> — тип устройства (Socket, Lamp, Dimmer, Button, Switch)</span>
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
      <p style="margin-bottom:12px; font-weight:700; font-size:15px;">Zigbee Devices — Help</p>

      <p style="margin-bottom:10px;">This page displays all Zigbee devices added on the <b>Select pin</b> page. Here you can control their state and configure parameters.</p>

      <div style="margin-bottom:14px; line-height:1.6;">
        <p style="font-weight:700; margin-bottom:6px;">Table columns:</p>
        <span style="display:block;"><b>ID</b> — internal device identifier in the controller</span>
        <span style="display:block;"><b>IEEE Address</b> — unique 64-bit address of the Zigbee device</span>
        <span style="display:block;"><b>Type</b> — device type (Socket, Lamp, Dimmer, Button, Switch)</span>
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
    zbee_ieee: d.ieee || '',
    zbee_endpoint: d.ep || 1,
    clusters: d.clusters || [6],
    zbee_device_type: d.role === 3 ? 'trigger' : (d.role === 5 ? 'switch' : clusterToDeviceType(d.clusters, d.override)),
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
          onoff: cur.onoff,
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
                        if (!groups[d.zbee_ieee]) groups[d.zbee_ieee] = [];
                        groups[d.zbee_ieee].push(d);
                      });

                      const rows = [];
                      Object.values(groups).forEach(group => {
                        const head = group[0];
                        const hasMultiDp = group.length > 1 && group.some(d => d.ep > 0);
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
                            <td class="px-6 py-2 text-sm text-slate-800 font-mono">${head.zbee_ieee || '—'}</td>
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
                                onClick=${() => {
                                  setLearnIeee(head.zbee_ieee);
                                  fetch('/api/zigbee/learn/start', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ ieee: head.zbee_ieee })
                                  }).catch(err => console.error('Error starting learn:', err));
                                }}
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
                            const subType = (d.clusters || []).includes(8) ? 'Dimmer'
                                          : (d.clusters || []).includes(768) ? 'Color'
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
                                <td class="px-6 py-2 text-sm flex gap-2">
                                  <button
                                    onClick=${() => handleEdit(d)}
                                    class="px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600"
                                  >
                                    ${language === 'ru' ? 'Управление' : 'Control'}
                                  </button>
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
