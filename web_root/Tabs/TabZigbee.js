import { h, useState, useEffect, useRef, html } from '../bundle.js';
import { registerPoll, unregisterPoll } from '../pollQueue.js';
import { Icons } from '../components.js';
import { MyPolzunok } from '../main.js';
import { ModalZigbee } from '../Modals/ModalZigbee.js';

export function TabZigbee({}) {
  const [devices, setDevices] = useState([]);
  const [language, setLanguage] = useState('ru');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const isPending = useRef(false);
  const lastChangeTime = useRef(0);
  const serverSnapshot = useRef({});
  const dirtyIds = useRef(new Set());
  const pendingConfigSave = useRef(null);

  const clusterToDeviceType = (clusters) => {
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
    zbee_device_type: clusterToDeviceType(d.clusters),
    zbee_label: d.info || '',
    onoff: d.onoff || 0,
    brightness: d.brightness || 254,
    color_hex: d.color_hex || 0xFFAA00,
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
        setDevices(normalized);
        setLanguage(data.lang || 'ru');
        const snap = {};
        zigbee.forEach(d => { snap[d.id] = buildSnapshot(d); });
        serverSnapshot.current = snap;
        dirtyIds.current.clear();
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

  const handleEdit = (device) => {
    dirtyIds.current.add(device.id);
    setSelectedDevice({ ...device });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDevice(null);
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
          brightness: cur.brightness,
          color_hex: cur.color_hex
        })
      }).catch(err => console.error('Error saving config:', err));
    }

    dirtyIds.current.delete(updatedDevice.id);
    serverSnapshot.current[updatedDevice.id] = { ...cur };
    setTimeout(() => { lastChangeTime.current = 0; }, 3000);
  };

  const getDeviceTypeLabel = (deviceType) => {
    switch (deviceType) {
      case 'lamp': return '💡 Color Lamp';
      case 'dimmer': return '🔆 Dimmer';
      default: return '🔌 Socket';
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
                      <${Th} title="IEEE" />
                      <${Th} title="Type" />
                      <${Th} title="Info" />
                      <${Th} title="On/Off" />
                      <${Th} title="Action" />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/40">
                    ${devices.map((d, i) => {
                      const deviceType = d.zbee_device_type || 'socket';
                      return html`
                        <tr class="${i % 2 === 1 ? 'bg-white/80' : 'bg-sky-200/40'} hover:bg-slate-200/80 transition-colors">
                          <td class="px-6 py-2 text-sm text-slate-800">${d.id}</td>
                          <td class="px-6 py-2 text-sm text-slate-800 font-mono">${d.zbee_ieee || '—'}</td>
                          <td class="px-6 py-2 text-sm text-slate-700">
                            ${getDeviceTypeLabel(deviceType)}
                          </td>
                          <td class="px-6 py-2 text-sm text-slate-600">${d.zbee_label || ''}</td>
                          <td class="px-6 py-2">
                            <${MyPolzunok} value=${d.onoff || 0} disabled=${dirtyIds.current.has(d.id)} onChange=${(val) => handleToggle(d, val)} />
                          </td>
                          <td class="px-6 py-2 text-sm">
                            <button
                              onClick=${() => handleEdit(d)}
                              class="px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600"
                            >
                              ${language === 'ru' ? 'Настройки' : 'Settings'}
                            </button>
                          </td>
                        </tr>
                      `;
                    })}
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
          onClose=${closeModal}
          onUpdate=${handleDeviceUpdate}
        />
      `}
    </div>
  `;
}
