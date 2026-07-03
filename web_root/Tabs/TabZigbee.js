import { h, useState, useEffect, useRef, html } from '../bundle.js';
import { registerPoll, unregisterPoll } from '../pollQueue.js';
import { Icons } from '../components.js';
import { MyPolzunok } from '../main.js';

export function TabZigbee({}) {
  const [zigbeeData, setZigbeeData] = useState([]);
  const [language, setLanguage] = useState('ru');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const isPending = useRef(false);

  const refresh = () =>
    fetch('/api/zigbee/get')
      .then((r) => r.json())
      .then((data) => {
        setLanguage(data.lang || 'ru');
        setZigbeeData(data.zigbee || []);
      })
      .catch((error) => console.error('Error fetching zigbee data:', error));

  useEffect(() => {
    refresh();
    let active = true;
    registerPoll('zigbee', '/api/zigbee/get', function(data) {
      if (!active) return;
      if (isPending.current) return;
      if (data && data.zigbee) {
        setZigbeeData(data.zigbee);
        setLanguage(data.lang || 'ru');
      }
    });
    return () => {
      active = false;
      unregisterPoll('zigbee');
    };
  }, []);

  const handleEdit = (item) => {
    setSelectedItem({ ...item });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleSave = () => {
    if (!selectedItem) return;
    
    // Save to backend
    fetch('/api/zigbee/set', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: selectedItem.id,
        ieee: selectedItem.ieee,
        ep: parseInt(selectedItem.ep),
        cl: parseInt(selectedItem.cl),
        attr: parseInt(selectedItem.attr),
        info: selectedItem.info,
        onoff: selectedItem.onoff
      })
    })
      .then((r) => r.json())
      .then(() => {
        // Optimistic update
        setZigbeeData((prev) => prev.map((item) => (item.id === selectedItem.id ? selectedItem : item)));
        closeModal();
        refresh();
      })
      .catch((err) => console.error('Error saving zigbee:', err));
  };

  const handleToggle = (item, onoff) => {
    const updated = { ...item, onoff: onoff ? 1 : 0 };
    setZigbeeData((prev) => prev.map((sw) => (sw.id === item.id ? updated : sw)));
    isPending.current = true;
    fetch('/api/zigbee/set', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    })
      .then((r) => r.json())
      .finally(() => {
        setTimeout(() => {
          isPending.current = false;
        }, 1500);
      });
  };

  const Th = ({ title }) => html`<th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide">${title}</th>`;

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
                      <${Th} title="EP/CL/ATTR" />
                      <${Th} title="INFO" />
                      <${Th} title="On/Off" />
                      <${Th} title="Action" />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/40">
                    ${zigbeeData.map((d, i) => html`
                      <tr class="${i % 2 === 1 ? 'bg-white/80' : 'bg-sky-200/40'} hover:bg-slate-200/80 transition-colors">
                        <td class="px-6 py-2 text-sm text-slate-800">${d.id}</td>
                        <td class="px-6 py-2 text-sm text-slate-800 font-medium">${d.ieee || '-'}</td>
                        <td class="px-6 py-2 text-sm text-slate-700 font-mono">${d.ep} / 0x${d.cl.toString(16).toUpperCase()} / 0x${d.attr.toString(16).toUpperCase()}</td>
                        <td class="px-6 py-2 text-sm text-slate-600">${d.info}</td>
                        <td class="px-6 py-2">
                          <${MyPolzunok} value=${d.onoff} onChange=${(val) => handleToggle(d, val)} />
                        </td>
                        <td class="px-6 py-2 text-sm">
                          <button onClick=${() => handleEdit(d)} class="text-blue-600 hover:text-blue-800 font-semibold transition-colors">Edit</button>
                        </td>
                      </tr>
                    `)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      ${isModalOpen && html`
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 class="text-xl font-bold text-gray-800">Edit Zigbee Device ${selectedItem.id}</h3>
              <button onClick=${closeModal} class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <div class="p-6 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">IEEE Address (hex)</label>
                <input type="text" value=${selectedItem.ieee} onInput=${(e) => setSelectedItem({...selectedItem, ieee: e.target.value})} class="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Endpoint</label>
                  <input type="number" value=${selectedItem.ep} onInput=${(e) => setSelectedItem({...selectedItem, ep: e.target.value})} class="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Cluster (dec)</label>
                  <input type="number" value=${selectedItem.cl} onInput=${(e) => setSelectedItem({...selectedItem, cl: e.target.value})} class="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Attr (dec)</label>
                  <input type="number" value=${selectedItem.attr} onInput=${(e) => setSelectedItem({...selectedItem, attr: e.target.value})} class="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Info / Name</label>
                <input type="text" value=${selectedItem.info} onInput=${(e) => setSelectedItem({...selectedItem, info: e.target.value})} class="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
            </div>
            <div class="p-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
              <button onClick=${closeModal} class="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick=${handleSave} class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Save</button>
            </div>
          </div>
        </div>
      `}
    </div>
  `;
}
