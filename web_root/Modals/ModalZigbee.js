import { h, render, useState, useEffect, useRef, html } from '../bundle.js';
import { MyPolzunok } from '../main.js';

function ModalZigbee({ device, onClose, onUpdate }) {
  const deviceType = device.zbee_device_type || 'socket';
  const isLamp = deviceType === 'lamp';
  const isDimmer = deviceType === 'dimmer';

  const [onoff, setOnoff] = useState(device.onoff || 0);
  const [brightness, setBrightness] = useState(device.brightness || 254);
  const [color, setColor] = useState(device.color || '#FFAA00');

  const portalRef = useRef(null);
  const pendingUpdate = useRef(null);
  const prevSnapshot = useRef(JSON.stringify({
    onoff: device.onoff, brightness: device.brightness, color: device.color
  }));

  useEffect(() => {
    const el = document.createElement('div');
    el.id = 'modal-zigbee-portal';
    document.body.appendChild(el);
    portalRef.current = el;
    return () => {
      render(null, el);
      document.body.removeChild(el);
    };
  }, []);

  const scheduleUpdate = (patch) => {
    Object.assign(device, patch);
    const snap = JSON.stringify({ onoff: device.onoff, brightness: device.brightness, color: device.color });
    if (snap === prevSnapshot.current) return;
    clearTimeout(pendingUpdate.current);
    pendingUpdate.current = setTimeout(() => {
      prevSnapshot.current = snap;
      onUpdate({ ...device });
    }, 300);
  };

  const applyOnOff = (value) => {
    setOnoff(value);
    scheduleUpdate({ onoff: value });
  };

  const applyBrightness = (value) => {
    setBrightness(value);
    scheduleUpdate({ brightness: value });
  };

  const applyColor = (value) => {
    setColor(value);
    scheduleUpdate({ color: value });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const getClusterLabel = () => {
    if (isLamp) return 'Color Lamp';
    if (isDimmer) return 'Dimmer';
    return 'On/Off Socket';
  };

  const getClusterIcon = () => {
    if (isLamp) return '💡';
    if (isDimmer) return '🔆';
    return '🔌';
  };

  const modalContent = html`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50 backdrop-blur-sm"
      style="margin-top: 7px;"
      onclick=${handleOverlayClick}
    >
      <div class="flex items-center justify-center min-h-full p-4">
        <div
          class="bg-white rounded-2xl p-6 max-w-lg w-full mx-4 relative shadow-2xl"
          style="max-height: calc(100vh - 57px); overflow-y: auto;"
        >
          <div class="flex justify-between items-center mb-6">
            <div>
              <h2 class="text-xl font-bold text-slate-800">
                ${getClusterIcon()} ${device.zbee_label || 'Device ' + device.id}
              </h2>
              <p class="text-sm text-slate-500 mt-1">
                ID: ${device.id} · IEEE: ${device.zbee_ieee || '—'} · ${getClusterLabel()}
              </p>
            </div>
            <button
              onclick=${onClose}
              class="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div class="space-y-6">
            <div class="bg-slate-50 rounded-xl p-4">
              <div class="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">Power</div>
              <${MyPolzunok} value=${onoff} onChange=${applyOnOff} />
            </div>

            ${(isDimmer || isLamp) && html`
              <div class="bg-slate-50 rounded-xl p-4">
                <div class="flex justify-between items-center mb-3">
                  <span class="text-sm font-semibold text-slate-600 uppercase tracking-wider">Brightness</span>
                  <span class="text-sm font-mono text-slate-500">${Math.round((brightness / 254) * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="254"
                  value=${brightness}
                  onInput=${(e) => applyBrightness(parseInt(e.target.value))}
                  class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>
            `}

            ${isLamp && html`
              <div class="bg-slate-50 rounded-xl p-4">
                <div class="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">Color</div>
                <div class="flex items-center gap-4">
                  <input
                    type="color"
                    value=${color}
                    onInput=${(e) => applyColor(e.target.value)}
                    class="w-16 h-10 rounded-lg border-2 border-slate-200 cursor-pointer"
                  />
                  <div class="flex gap-2 flex-wrap">
                    ${['#FF0000', '#FFAA00', '#FFFF00', '#00FF00', '#00AAFF', '#FF00FF', '#FFFFFF'].map(c => html`
                      <button
                        onClick=${() => applyColor(c)}
                        class="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${color === c ? 'border-slate-800 scale-110' : 'border-slate-200'}"
                        style=${{ backgroundColor: c }}
                      />
                    `)}
                  </div>
                </div>
              </div>
            `}

            <div class="bg-slate-50 rounded-xl p-4">
              <div class="text-sm font-semibold text-slate-600 mb-2 uppercase tracking-wider">Info</div>
              <div class="text-sm text-slate-700 font-mono">
                EP: ${device.zbee_endpoint || 1} · Type: ${deviceType}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  useEffect(() => {
    if (portalRef.current) {
      render(modalContent, portalRef.current);
    }
  });

  return null;
}

export { ModalZigbee };
