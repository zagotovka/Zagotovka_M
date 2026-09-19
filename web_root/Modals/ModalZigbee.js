import { h, render, useState, useEffect, useRef, html } from '../bundle.js';
import { MyPolzunok } from '../main.js';

function ModalZigbee({ device, allDevices, onClose, onUpdate, onRescan, language }) {
  const lang = language || 'ru';
  const [isScanning, setIsScanning] = useState(false);

  const isTrigger = device.zbee_role === 3 || device.override === 6;
  const isSwitch = device.zbee_role === 5 || device.override === 5;
  const [triggers, setTriggers] = useState([]);

  useEffect(() => {
    if (!isTrigger && !isSwitch) return;
    fetch('/api/button/get')
      .then(r => r.json())
      .then(data => {
        const btns = data.data || data;
        if (Array.isArray(btns)) {
          const myTriggers = btns.filter(b => b.is_zigbee && b.payload);
          setTriggers(myTriggers);
        }
      })
      .catch(() => {});
  }, [isTrigger, isSwitch, device.id]);

  /* Определяем, мульти-EP группа или одиночное устройство */
  const siblings = (allDevices || []).filter(d => d.zbee_ieee === device.zbee_ieee);
  const isMultiDp = siblings.length > 1;

  /* Для мульти-EP: собираем все слоты группы (включая родительский/головной элемент) */
  const dpSlotsRaw = isMultiDp ? siblings : [];
  const [dpSlots, setDpSlots] = useState(dpSlotsRaw);

  useEffect(() => {
    setDpSlots(dpSlotsRaw);
  }, [allDevices]);

  const initialOverride = device.override !== 0 
    ? device.override 
    : (isSwitch ? 5 : (isTrigger ? 6 : 0));
  const [overrideType, setOverrideType] = useState(initialOverride);

  const applyOverrideType = (e) => {
    const val = parseInt(e.target.value, 10);
    setOverrideType(val);
    fetch('/api/zigbee/set', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: device.id, override: val })
    }).then(() => {
        onUpdate({ ...device, override: val });
    });
  };

  /* Маршрут и подписи для кнопки перехода (Switch pin vs Button pin) */
  const hasSwitchRole = isSwitch || dpSlots.some(s => s.zbee_role === 5 || s.override === 5);
  const targetPinPage = hasSwitchRole ? '/#/switch' : '/#/button';
  const targetPinLabel = hasSwitchRole 
    ? (lang === 'ru' ? 'Перейти на Switch pin →' : 'Go to Switch pin →')
    : (lang === 'ru' ? 'Перейти на Button pin →' : 'Go to Button pin →');
  const targetPinDesc = hasSwitchRole
    ? (lang === 'ru' ? 'Настройте привязки переключателя на странице Switch pin.' : 'Configure switch links on the Switch pin page.')
    : (lang === 'ru' ? 'Настройте действия для каждого payload на странице Button pin.' : 'Configure actions for each payload on the Button pin page.');

  /* Для одиночного устройства */
  const effectiveOverride = overrideType;
  const hasDimmer = effectiveOverride === 0 
    ? (device.clusters || []).includes(8) 
    : (effectiveOverride === 2 || effectiveOverride === 3 || effectiveOverride === 4);
  const hasColor = effectiveOverride === 0 
    ? (device.clusters || []).includes(768) 
    : (effectiveOverride === 4);

  /* Калибровка диапазона: для ZCL Level Control (cluster 8) спека фиксирует 1-254.
     Для Tuya DP dimmer_min/dimmer_max приходят с бэкенда после Learning Mode. */
  const dMin = (device.dimmer_min != null && device.dimmer_min !== 0) ? device.dimmer_min : 1;
  const dMax = (device.dimmer_max != null && device.dimmer_max !== 0) ? device.dimmer_max : 254;

  const [onoff, setOnoff] = useState(device.onoff || 0);
  const [brightness, setBrightness] = useState(device.brightness || 254);
  const [color, setColor] = useState(device.color || '#' + (device.color_hex || 0xFFAA00).toString(16).padStart(6, '0'));

  useEffect(() => {
    setOnoff(device.onoff || 0);
    setBrightness(device.brightness || 254);
    setColor(device.color || '#' + (device.color_hex || 0xFFAA00).toString(16).padStart(6, '0'));
    if (isScanning) setIsScanning(false);
  }, [device.onoff, device.brightness, device.color_hex]);

  useEffect(() => {
    if (!isScanning) return;
    const t = setTimeout(() => setIsScanning(false), 5000);
    return () => clearTimeout(t);
  }, [isScanning]);


  const portalRef = useRef(null);
  const pendingUpdate = useRef(null);
  const prevSnapshot = useRef(JSON.stringify({
    brightness: device.brightness, color: device.color, color_hex: device.color_hex
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
    const snap = JSON.stringify({ brightness: device.brightness, color: device.color, color_hex: device.color_hex, clusters: device.clusters });
    if (snap === prevSnapshot.current) return;
    clearTimeout(pendingUpdate.current);
    pendingUpdate.current = setTimeout(() => {
      prevSnapshot.current = snap;
      onUpdate({ ...device });
    }, 300);
  };

  const applyOnOff = (value) => {
    const val = value ? 1 : 0;
    setOnoff(val);
    fetch('/api/zigbee/command', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: device.id, onoff: val })
    }).catch(err => console.error('Error sending command:', err));
  };

  const applyBrightness = (value) => {
    setBrightness(value);
    scheduleUpdate({ brightness: value });
  };

  const applyColor = (value) => {
    setColor(value);
    const hex = parseInt(value.replace('#', ''), 16);
    scheduleUpdate({ color: value, color_hex: hex });
  };

  /* Команды для мульти-EP слотов */
  const applyDpOnOff = (slotId, value) => {
    const val = value ? 1 : 0;
    setDpSlots(prev => prev.map(s => s.id === slotId ? { ...s, onoff: val } : s));
    fetch('/api/zigbee/command', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: slotId, onoff: val })
    }).catch(err => console.error('Error sending ep command:', err));
  };

  const applyDpBrightness = (slotId, value) => {
    setDpSlots(prev => prev.map(s => s.id === slotId ? { ...s, brightness: value } : s));
    fetch('/api/zigbee/set', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: slotId, brightness: value })
    }).catch(err => console.error('Error sending ep brightness:', err));
  };

  const applyDpColor = (slotId, value) => {
    const hex = parseInt(value.replace('#', ''), 16);
    setDpSlots(prev => prev.map(s => s.id === slotId ? { ...s, color: value, color_hex: hex } : s));
    fetch('/api/zigbee/set', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: slotId, color_hex: hex })
    }).catch(err => console.error('Error sending ep color:', err));
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const dpIcon = (flags) => {
    if (flags & 0x01) return html`<span class="text-lg">🔌</span>`;
    if (flags & 0x02) return html`<span class="text-lg">🔆</span>`;
    if (flags & 0x04) return html`<span class="text-lg">💡</span>`;
    return html`<span class="text-lg">⚙️</span>`;
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
                ${isMultiDp ? html`✱ ${device.zbee_label || 'Smart Device'}` : html`
                  ${isTrigger ? '🔘' : (isSwitch ? '🔀' : (hasColor ? '💡' : (hasDimmer ? '🔆' : '🔌')))}
                  ${device.zbee_label || 'Device ' + device.id}
                `}
              </h2>
              <p class="text-sm text-slate-500 mt-1">
                ID: ${device.displayId || device.id} · ${isMultiDp
                  ? `Multi-EP (${dpSlots.length} EP)`
                  : (isTrigger ? 'Button' : (isSwitch ? 'Switch' : (hasColor ? 'Лампа (яркость + цвет)' : (hasDimmer ? 'Лампа (яркость)' : 'Розетка (On/Off)'))))}
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

          <div class="space-y-4">
            
            <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 flex justify-between items-center">
              <span class="text-sm font-medium text-slate-600">${lang === 'ru' ? 'Тип устройства:' : 'Device Type:'}</span>
              <select 
                class="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5"
                value=${overrideType}
                onChange=${applyOverrideType}
              >
                <option value="0">${lang === 'ru' ? 'Автоматически' : 'Auto-detect'}</option>
                <option value="1">${lang === 'ru' ? 'Розетка (On/Off)' : 'Socket (On/Off)'}</option>
                <option value="2">${lang === 'ru' ? 'Диммер' : 'Dimmer'}</option>
                <option value="3">${lang === 'ru' ? 'Лампа (яркость)' : 'Lamp (brightness)'}</option>
                <option value="4">${lang === 'ru' ? 'Лампа (яркость + цвет)' : 'Lamp (brightness + color)'}</option>
                <option value="5">${lang === 'ru' ? 'Выключатель (Switch)' : 'Switch'}</option>
                <option value="6">${lang === 'ru' ? 'Кнопка (Button)' : 'Button'}</option>
              </select>
            </div>

            ${isMultiDp ? html`
              <!-- Мульти-EP: групповая модалка -->
              ${dpSlots.map(slot => {
                const sClusters = (slot.clusters && slot.clusters.length) ? slot.clusters : [6];
                return html`
                  <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div class="flex items-center justify-between mb-3">
                      <div class="flex items-center gap-2">
                        ${dpIcon(sClusters[0] || 6)}
                        <span class="text-sm font-semibold text-slate-700">${slot.zbee_label || 'EP' + (slot.ep || 1)}</span>
                      </div>
                      <span class="text-xs text-slate-400 font-mono">EP${slot.ep || 1}</span>
                    </div>
                    ${sClusters.includes(6) && html`
                      <${MyPolzunok} value=${slot.onoff || 0} onChange=${(val) => applyDpOnOff(slot.id, val)} />
                    `}
                    ${sClusters.includes(8) && (() => {
                      const sMin = (slot.dimmer_min != null && slot.dimmer_min !== 0) ? slot.dimmer_min : 1;
                      const sMax = (slot.dimmer_max != null && slot.dimmer_max !== 0) ? slot.dimmer_max : 254;
                      const sVal = slot.brightness != null ? slot.brightness : sMax;
                      const sPct = Math.round(((sVal - sMin) / (sMax - sMin)) * 100);
                      return html`
                        <div class="mt-3">
                          <div class="flex justify-between items-center mb-2">
                            <span class="text-xs text-slate-500">${lang === 'ru' ? 'Яркость' : 'Brightness'}</span>
                            <span class="text-xs font-mono text-slate-500">${sPct}%</span>
                          </div>
                          <input
                            type="range"
                            min=${sMin}
                            max=${sMax}
                            value=${sVal}
                            onInput=${(e) => applyDpBrightness(slot.id, parseInt(e.target.value))}
                            class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                          />
                        </div>
                      `;
                    })()}
                    ${sClusters.includes(768) && (() => {
                      const sColor = slot.color || '#' + (slot.color_hex || 0xFFAA00).toString(16).padStart(6, '0');
                      return html`
                        <div class="mt-3">
                          <div class="text-xs text-slate-500 mb-1">${lang === 'ru' ? 'Цвет' : 'Color'}</div>
                          <input
                            type="color"
                            value=${sColor}
                            onInput=${(e) => applyDpColor(slot.id, e.target.value)}
                            onChange=${(e) => applyDpColor(slot.id, e.target.value)}
                            class="w-16 h-10 rounded-lg border-2 border-slate-200 cursor-pointer"
                          />
                        </div>
                      `;
                    })()}
                  </div>
                `;
              })}

              <div class="bg-slate-50 rounded-xl p-4">
                <div class="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">${language === 'ru' ? 'Возможности' : 'Capabilities'}</div>
                <div class="flex gap-3 flex-wrap">
                  ${dpSlots.filter(s => (s.clusters || []).includes(6)).length > 0 && html`
                    <span class="px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-700">
                      🔘 ${language === 'ru' ? 'Вкл/Выкл' : 'On/Off'} ×${dpSlots.filter(s => (s.clusters || []).includes(6)).length}
                    </span>
                  `}
                  ${dpSlots.filter(s => (s.clusters || []).includes(8)).length > 0 && html`
                    <span class="px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-700">
                      🔆 ${language === 'ru' ? 'Яркость' : 'Brightness'} ×${dpSlots.filter(s => (s.clusters || []).includes(8)).length}
                    </span>
                  `}
                  ${dpSlots.filter(s => (s.clusters || []).includes(768)).length > 0 && html`
                    <span class="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                      🎨 ${language === 'ru' ? 'Цвет' : 'Color'} ×${dpSlots.filter(s => (s.clusters || []).includes(768)).length}
                    </span>
                  `}
                </div>
              </div>

              <div class="flex justify-center">
                <button
                  onClick=${() => { onClose(); window.location.href = targetPinPage; }}
                  class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                  ${targetPinLabel}
                </button>
              </div>
            ` : isTrigger ? html`
              <div class="bg-slate-50 rounded-xl p-4">
                <div class="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">
                  ${lang === 'ru' ? 'Тестирование' : 'Testing'}
                </div>
                <p class="text-sm text-slate-500 mb-3">
                  ${lang === 'ru'
                    ? 'Нажмите кнопку на устройстве и наблюдайте за событиями. Или отправьте команду для тестирования:'
                    : 'Press the button on the device and observe events. Or send a command for testing:'}
                </p>
                <div class="flex gap-3 flex-wrap">
                  ${triggers.map(t => html`
                    <button
                      onClick=${() => {
                        fetch('/api/zigbee/command', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ id: t.id, trigger: t.payload })
                        });
                      }}
                      class="px-4 py-2 rounded-lg bg-teal-500 text-white text-sm font-medium hover:bg-teal-600 transition-colors">
                      ${t.label || t.payload}
                    </button>
                  `)}
                  ${triggers.length === 0 && html`
                    <span class="text-sm text-slate-400 italic">
                      ${lang === 'ru' ? 'Нет триггеров — нажмите кнопку на устройстве' : 'No triggers — press a button on the device'}
                    </span>
                  `}
                </div>
              </div>

              <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div class="text-sm font-semibold text-blue-700 mb-2">
                  ${lang === 'ru' ? 'Настройка действий' : 'Configure Actions'}
                </div>
                <p class="text-sm text-blue-600 mb-3">
                  ${targetPinDesc}
                </p>
                <button
                  onClick=${() => { onClose(); window.location.href = targetPinPage; }}
                  class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                  ${targetPinLabel}
                </button>
              </div>
            ` : isSwitch ? html`
              <!-- Switch: On/Off + Тестирование -->
              <div class="bg-slate-50 rounded-xl p-4">
                <div class="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">Power</div>
                <${MyPolzunok} value=${onoff} onChange=${applyOnOff} />
              </div>

              <div class="bg-slate-50 rounded-xl p-4">
                <div class="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">
                  ${lang === 'ru' ? 'Тестирование' : 'Testing'}
                </div>
                <p class="text-sm text-slate-500 mb-3">
                  ${lang === 'ru'
                    ? 'Нажмите кнопку на устройстве и наблюдайте за событиями. Или отправьте команду для тестирования:'
                    : 'Press the button on the device and observe events. Or send a command for testing:'}
                </p>
                <div class="flex gap-3 flex-wrap">
                  ${triggers.map(t => html`
                    <button
                      onClick=${() => {
                        fetch('/api/zigbee/command', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ id: t.id, trigger: t.payload })
                        });
                      }}
                      class="px-4 py-2 rounded-lg bg-teal-500 text-white text-sm font-medium hover:bg-teal-600 transition-colors">
                      ${t.label || t.payload}
                    </button>
                  `)}
                  ${triggers.length === 0 && html`
                    <span class="text-sm text-slate-400 italic">
                      ${lang === 'ru' ? 'Нет триггеров — нажмите кнопку на устройстве' : 'No triggers — press a button on the device'}
                    </span>
                  `}
                </div>
              </div>

              <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div class="text-sm font-semibold text-blue-700 mb-2">
                  ${lang === 'ru' ? 'Настройка действий' : 'Configure Actions'}
                </div>
                <p class="text-sm text-blue-600 mb-3">
                  ${targetPinDesc}
                </p>
                <button
                  onClick=${() => { onClose(); window.location.href = targetPinPage; }}
                  class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                  ${targetPinLabel}
                </button>
              </div>
            ` : html`
              <!-- Одиночное устройство -->
              <div class="bg-slate-50 rounded-xl p-4">
                <div class="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">Power</div>
                <${MyPolzunok} value=${onoff} onChange=${applyOnOff} />
              </div>

              ${(hasDimmer || hasColor) && html`
                <div class="bg-slate-50 rounded-xl p-4">
                  <div class="flex justify-between items-center mb-3">
                    <span class="text-sm font-semibold text-slate-600 uppercase tracking-wider">Brightness</span>
                    <span class="text-sm font-mono text-slate-500">
                      ${Math.round(((brightness - dMin) / (dMax - dMin)) * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min=${dMin}
                    max=${dMax}
                    value=${brightness}
                    onInput=${(e) => applyBrightness(parseInt(e.target.value))}
                    class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>
              `}

              ${hasColor && html`
                <div class="bg-slate-50 rounded-xl p-4">
                  <div class="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">Color</div>
                  <input
                    type="color"
                    value=${color}
                    onInput=${(e) => applyColor(e.target.value)}
                    onChange=${(e) => applyColor(e.target.value)}
                    class="w-16 h-10 rounded-lg border-2 border-slate-200 cursor-pointer"
                  />
                </div>
              `}

              <div class="bg-slate-50 rounded-xl p-4">
                <div class="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">${language === 'ru' ? 'Возможности' : 'Capabilities'}</div>
                <div class="flex gap-3 flex-wrap">
                  ${(device.clusters || []).includes(6) && html`<span class="px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-700">🔘 ${language === 'ru' ? 'Вкл/Выкл' : 'On/Off'}</span>`}
                  ${(device.clusters || []).includes(8) && html`<span class="px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-700">🔆 ${language === 'ru' ? 'Яркость' : 'Brightness'}</span>`}
                  ${(device.clusters || []).includes(768) && html`<span class="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">🎨 ${language === 'ru' ? 'Цвет' : 'Color'}</span>`}
                </div>
              </div>
            `}

            ${(!isTrigger || isMultiDp) && html`
              <div class="flex justify-center">
                <button
                onClick=${() => {
                  if (isScanning) return;
                  setIsScanning(true);
                  onRescan(device);
                }}
                disabled=${isScanning}
                class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all duration-200 ${isScanning ? 'bg-cyan-100 text-cyan-600 cursor-wait' : 'bg-white border-2 border-slate-300 text-slate-700 hover:border-cyan-400 hover:text-cyan-600 hover:shadow-lg active:scale-95'}"
              >
                ${isScanning
                  ? html`<span class="inline-block animate-spin">⏳</span> ${language === 'ru' ? 'Сканирование...' : 'Scanning...'}`
                  : html`🔄 ${language === 'ru' ? 'Обновить возможности' : 'Rescan capabilities'}`
                }
              </button>
            </div>
            `}
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
