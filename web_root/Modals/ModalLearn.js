import { h, useState, useEffect, useRef, html } from '../bundle.js';

const ROLE_OPTIONS = [
  { value: 'ignore',      label: { ru: 'Игнорировать', en: 'Ignore' } },
  { value: 'onoff',       label: { ru: 'Вкл/Выкл',    en: 'On/Off' } },
  { value: 'switch',      label: { ru: 'Выключатель',  en: 'Switch' } },
  { value: 'brightness',  label: { ru: 'Яркость',      en: 'Brightness' } },
  { value: 'dimmer',      label: { ru: 'Диммер',       en: 'Dimmer' } },
  { value: 'color',       label: { ru: 'Цвет',         en: 'Color' } },
  { value: 'temperature', label: { ru: 'Температура',   en: 'Temperature' } },
  { value: 'humidity',    label: { ru: 'Влажность',     en: 'Humidity' } },
  { value: 'occupancy',   label: { ru: 'Присутствие',   en: 'Occupancy' } },
  { value: 'button',      label: { ru: 'Кнопка',        en: 'Button' } },
  { value: 'ep',          label: { ru: 'EP',             en: 'EP' } },
];

function obsKey(o) {
  if (o.source === 'trigger') return `trigger_${o.payload}`;
  return `${o.ep}_${o.cluster}_${o.attr}`;
}

export function ModalLearn({ ieee, language, onClose, onSaved, onGoToButtonPin }) {
  const lang = language || 'ru';
  const [status, setStatus] = useState(null);
  const [observations, setObservations] = useState([]);
  const [labels, setLabels] = useState({});
  const [names, setNames] = useState({});
  const [saving, setSaving] = useState(false);
  const [savedType, setSavedType] = useState(null);
  const [error, setError] = useState(null);
  const [rawRanges, setRawRanges] = useState({});  // manual override: { obsKey: { min, max } }
  const pollRef = useRef(null);
  const mergedRef = useRef({});

  useEffect(() => {
    mergedRef.current = {};
    setObservations([]);
    setLabels({});
    setNames({});
    setRawRanges({});
    setSavedType(null);
    setError(null);
  }, [ieee]);

  useEffect(() => {
    let alive = true;
    const poll = async () => {
      if (!alive) return;
      try {
        const sr = await fetch('/api/zigbee/learn/status');
        const sd = await sr.json();
        if (!alive) return;
        setStatus(sd);

        if (sd.active) {
          const gr = await fetch('/api/zigbee/learn/get');
          const gd = await gr.json();
          if (!alive) return;

          for (const obs of (gd.observations || [])) {
            const k = obsKey(obs);
            if (!(k in mergedRef.current)) {
              mergedRef.current[k] = obs;
            } else {
              mergedRef.current[k] = { ...mergedRef.current[k], ...obs };
            }
          }
          setObservations(Object.values(mergedRef.current));
        } else if (Object.keys(mergedRef.current).length > 0) {
          setObservations(Object.values(mergedRef.current));
          clearInterval(pollRef.current);
        }
      } catch (e) {
        if (alive) setError(e.message);
      }
    };

    poll();
    pollRef.current = setInterval(poll, 1500);
    return () => { alive = false; clearInterval(pollRef.current); };
  }, [ieee]);

  const isActive = status?.active;
  const timedOut = status && !status.active && status.remaining_ms === 0;
  const hasData = observations.length > 0;

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ieee,
        labels: observations.map(o => {
          const k = obsKey(o);
          const base = o.source === 'trigger'
            ? {
                source: 'trigger',
                trigger_payload: o.payload,
                role: labels[k] || 'ignore',
                label: names[k] || '',
              }
            : {
                ep: o.cluster === '0xEF00' ? parseInt(o.attr, 16) : o.ep,
                cluster: o.cluster,
                attr: o.attr,
                role: labels[k] || 'ignore',
                label: names[k] || '',
              };
          /* Добавляем raw_min/raw_max для Tuya строк с ролью brightness/dimmer */
          const role = labels[k] || 'ignore';
          if ((role === 'brightness' || role === 'dimmer') && o.cluster === '0xEF00') {
            const override = rawRanges[k];
            base.raw_min = override?.min ?? o.obs_min;
            base.raw_max = override?.max ?? o.obs_max;
          }
          return base;
        }),
      };
      const r = await fetch('/api/zigbee/learn/label', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const res = await r.json();
      if (res.status) {
        setSavedType(res.device_type);
        if (res.device_type !== 'trigger' && res.device_type !== 'switch' && res.device_type !== 'multi_ep') {
          setTimeout(() => onSaved?.(res.device_type), 2000);
        }
        if (res.ep_slots > 1) {
          setSavedType('multi_ep');
        }
      } else {
        setError(res.message);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const remaining = status?.remaining_ms || 0;
  const remainMins = Math.floor(remaining / 60000);
  const remainSecs = Math.ceil((remaining % 60000) / 1000);

  const typeIcon = (t) => ({
    dimmer: '🔆', color_lamp: '💡', sensor: '📡',
    trigger: '🔘', switch: '🔀', multi_ep: '🏭', cover: '🚪',
    thermostat: '🌡️', lock: '🔒', socket: '🔌',
    multi_ep: '✱',
  }[t] || '🔌');

  const typeLabel = (t) => ({
    dimmer: lang === 'ru' ? 'Диммер' : 'Dimmer',
    color_lamp: lang === 'ru' ? 'Цветная лампа' : 'Color Lamp',
    sensor: lang === 'ru' ? 'Сенсор' : 'Sensor',
    trigger: lang === 'ru' ? 'Кнопка/Триггер' : 'Trigger',
    switch: lang === 'ru' ? 'Выключатель' : 'Switch',
    multi_ep: lang === 'ru' ? 'Multi-EP устройство' : 'Multi-EP Device',
    cover: lang === 'ru' ? 'Шторы/Жалюзи' : 'Cover',
    thermostat: lang === 'ru' ? 'Термостат' : 'Thermostat',
    lock: lang === 'ru' ? 'Замок' : 'Lock',
    socket: lang === 'ru' ? 'Розетка' : 'Socket',
    multi_ep: lang === 'ru' ? 'Multi-EP устройство' : 'Multi-EP Device',
  }[t] || t);

  return html`
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
         onClick=${e => e.target === e.currentTarget && onClose?.()}>
      <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">

        <div class="flex items-center justify-between px-6 py-4 border-b">
          <h2 class="text-xl font-bold text-slate-800">
            ${savedType
              ? (lang === 'ru' ? 'Устройство определено!' : 'Device identified!')
              : (lang === 'ru' ? 'Режим обучения' : 'Learning Mode')}
          </h2>
          <button class="text-slate-400 hover:text-slate-600 text-2xl"
                  onClick=${onClose}>×</button>
        </div>

        <div class="px-6 py-4">

          ${savedType && html`
            <div class="text-center py-8">
              <div class="text-5xl mb-4">${typeIcon(savedType)}</div>
              <div class="text-2xl font-bold text-slate-800 mb-1">${typeLabel(savedType)}</div>
              <div class="text-sm text-slate-400 mb-4">${ieee}</div>

              ${savedType === 'multi_ep' && html`
                <div class="bg-green-50 border border-green-200 rounded-lg p-4 mt-2 text-left">
                  <p class="text-sm text-green-800">
                    ${lang === 'ru'
                      ? 'Создано несколько устройств. Все они используют один IEEE-адрес, но управляются отдельно.'
                      : 'Multiple devices created. They share the same IEEE address but are controlled independently.'}
                  </p>
                </div>
              `}

              ${(savedType === 'trigger' || savedType === 'switch' || savedType === 'multi_ep') && html`
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-2 text-left">
                  <p class="text-sm text-blue-800 mb-3">
                    ${savedType === 'multi_ep'
                      ? (lang === 'ru'
                        ? 'Создано несколько устройств. Если есть кнопки, настройте действия на странице Button pin.'
                        : 'Multiple devices created. If there are buttons, configure actions on the Button pin page.')
                      : savedType === 'switch'
                        ? (lang === 'ru'
                          ? 'Выключатель определён. Настройте действия на странице Switch pin.'
                          : 'Switch identified. Configure actions on the Switch pin page.')
                        : (lang === 'ru'
                          ? 'Мы только определили устройство. Чтобы кнопка что-то делала при нажатии, настройте действия на странице Button pin.'
                          : 'We only identified the device. To make the button actually do something, configure actions on the Button pin page.')}
                  </p>
                  ${savedType === 'switch' && html`
                    <button
                      class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                      onClick=${() => { onClose(); window.location.href = '/#/switch'; }}>
                      ${lang === 'ru' ? 'Перейти на Switch pin →' : 'Go to Switch pin →'}
                    </button>
                  `}
                  ${savedType === 'trigger' && onGoToButtonPin && html`
                    <button
                      class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                      onClick=${() => onGoToButtonPin(ieee)}>
                      ${lang === 'ru' ? 'Перейти на Button pin →' : 'Go to Button pin →'}
                    </button>
                  `}
                </div>
              `}
            </div>
          `}

          ${!savedType && !isActive && !timedOut && html`
            <div class="text-center py-6 text-slate-500">
              ${lang === 'ru' ? 'Ожидание...' : 'Waiting...'}
            </div>
          `}

          ${isActive && html`
            <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <p class="text-sm text-amber-800 mb-2">
                ${lang === 'ru'
                  ? 'Автоопределение не сработало. Пожалуйста, физически подействуйте на устройство (нажмите кнопку / поверните диммер / откройте дверь) в течение следующих 5 минут.'
                  : 'Auto-detection failed. Please physically interact with the device (press button / turn dimmer / open door) within the next 5 minutes.'}
              </p>
              <p class="text-xs text-amber-600">
                ${lang === 'ru'
                  ? 'Во время обучения (5 мин) постарайтесь не трогать другие Zigbee-устройства — это может задержать распознавание из-за общей очереди сообщений.'
                  : 'During learning (5 min), avoid triggering other Zigbee devices — this may delay recognition due to the shared message queue.'}
              </p>
              <div class="mt-3 text-center">
                ${remainMins > 0 && html`
                  <span class="text-3xl font-mono font-bold text-amber-600">${remainMins}</span>
                  <span class="text-sm text-amber-500 ml-1">${lang === 'ru' ? 'мин' : 'min'}</span>
                `}
                <span class="text-3xl font-mono font-bold text-amber-600">${remainSecs}</span>
                <span class="text-sm text-amber-500 ml-1">${lang === 'ru' ? 'сек' : 'sec'}</span>
              </div>
            </div>
          `}

          ${timedOut && !hasData && html`
            <div class="text-center py-6">
              <div class="text-4xl mb-3">📭</div>
              <p class="text-slate-600 mb-1">
                ${lang === 'ru'
                  ? 'Устройство ничего не публикует в MQTT.'
                  : 'Device publishes nothing to MQTT.'}
              </p>
              <p class="text-xs text-slate-400">
                ${lang === 'ru'
                  ? 'Возможно, устройство не поддерживает Zigbee или находится слишком далеко от координатора.'
                  : 'The device may not support Zigbee or may be too far from the coordinator.'}
              </p>
            </div>
          `}

          ${(isActive || timedOut) && hasData && html`
            <div class="mb-4">
              <p class="text-sm text-slate-500 mb-2">
                ${lang === 'ru' ? 'Мы увидели:' : 'We observed:'}
              </p>
              <table class="w-full text-sm">
                <thead>
                  <tr class="text-left text-slate-500 border-b">
                    <th class="py-2">EP</th>
                    <th class="py-2">${lang === 'ru' ? 'Кластер' : 'Cluster'}</th>
                    <th class="py-2">${lang === 'ru' ? 'Значение' : 'Value'}</th>
                    <th class="py-2">${lang === 'ru' ? 'Название' : 'Name'}</th>
                    <th class="py-2">${lang === 'ru' ? 'Это:' : 'This is:'}</th>
                  </tr>
                </thead>
                <tbody>
                  ${observations.map(o => o.source === 'trigger' ? html`
                    <tr key=${obsKey(o)} class="border-b border-slate-100">
                      <td class="py-2 font-mono text-xs text-slate-400" colspan="2">
                        trigger
                      </td>
                      <td class="py-2 font-mono text-xs">
                        "${o.payload}"
                      </td>
                      <td class="py-2">
                        <input type="text"
                               class="border rounded px-2 py-1 text-sm w-full"
                               placeholder="${lang === 'ru' ? 'Напр. Двойной клик' : 'e.g. Double Click'}"
                               value=${names[obsKey(o)] || ''}
                               onInput=${e => setNames(prev => ({
                                 ...prev,
                                 [obsKey(o)]: e.target.value
                               }))} />
                      </td>
                      <td class="py-2">
                        <select class="border rounded px-2 py-1 text-sm bg-white"
                                value=${labels[obsKey(o)] || 'ignore'}
                                onChange=${e => setLabels(prev => ({
                                  ...prev,
                                  [obsKey(o)]: e.target.value
                                }))}>
                          ${ROLE_OPTIONS.map(opt => html`
                            <option key=${opt.value} value=${opt.value}>
                              ${opt.label[lang] || opt.label.en}
                            </option>
                          `)}
                        </select>
                      </td>
                    </tr>
                  ` : html`
                    <tr key=${obsKey(o)} class="border-b border-slate-100">
                      <td class="py-2 font-mono">${o.ep}</td>
                      <td class="py-2">
                        <span class="font-mono text-xs">${o.cluster}</span>
                        <span class="text-slate-400 ml-1">${o.cluster_name}${o.cluster === '0xEF00' ? ' EP' + parseInt(o.attr, 16) : ''}</span>
                        ${o.changed && html`
                          <span class="text-amber-500 ml-1" title="
                            ${lang === 'ru' ? 'Значение менялось' : 'Value changed'}">↻</span>
                        `}
                      </td>
                      <td class="py-2 font-mono text-xs">
                        ${o.first_val !== o.last_val
                          ? `${o.first_val}→${o.last_val}`
                          : String(o.last_val)}
                      </td>
                      <td class="py-2">
                        <input type="text"
                               class="border rounded px-2 py-1 text-sm w-full"
                               placeholder="${lang === 'ru' ? 'Напр. Яркость' : 'e.g. Brightness'}"
                               value=${names[obsKey(o)] || ''}
                               onInput=${e => setNames(prev => ({
                                 ...prev,
                                 [obsKey(o)]: e.target.value
                               }))} />
                      </td>
                      <td class="py-2">
                        <select class="border rounded px-2 py-1 text-sm bg-white"
                                value=${labels[obsKey(o)] || 'ignore'}
                                onChange=${e => setLabels(prev => ({
                                  ...prev,
                                  [obsKey(o)]: e.target.value
                                }))}>
                          ${ROLE_OPTIONS.map(opt => html`
                            <option key=${opt.value} value=${opt.value}>
                              ${opt.label[lang] || opt.label.en}
                            </option>
                          `)}
                        </select>
                      </td>
                    </tr>
                  `)}
                </tbody>
              </table>
            </div>
          `}

          ${error && html`
            <div class="bg-red-50 text-red-700 text-sm rounded p-3 mb-4">${error}</div>
          `}

          ${(() => {
            const dimmerObs = observations.filter(o => {
              const lbl = labels[obsKey(o)];
              return (lbl === 'dimmer' || lbl === 'brightness') && o.source !== 'trigger';
            });
            if (dimmerObs.length === 0) return html``;

            let currentVal = null;
            let globalMin = Infinity, globalMax = -Infinity;
            for (const o of dimmerObs) {
              const k = obsKey(o);
              const override = rawRanges[k];
              const vmin = override?.min ?? o.obs_min;
              const vmax = override?.max ?? o.obs_max;
              if (vmin < globalMin) globalMin = vmin;
              if (vmax > globalMax) globalMax = vmax;
              const v2 = parseInt(o.last_val, 10);
              if (!isNaN(v2)) currentVal = v2;
            }
            const dMin = globalMin !== Infinity ? globalMin : null;
            const dMax = globalMax !== -Infinity ? globalMax : null;
            const hasData = dMin !== null;
            const hasRange = hasData && dMax > dMin;

            return html`
              <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-sm">
                <div class="flex items-center gap-2 text-amber-700 font-medium mb-1">
                  💡 ${lang === 'ru' ? 'Определение диапазона диммера' : 'Dimmer range detection'}
                </div>
                <div class="text-amber-600 mb-3">
                  ${lang === 'ru'
                    ? 'Вращайте регулятор до minimum, затем до maximum. Система автоматически определит границы диапазона.'
                    : 'Rotate the dimmer to minimum, then to maximum. The system will automatically detect the range boundaries.'}
                </div>

                ${hasData && html`
                  <div class="bg-white rounded-lg p-3 border border-amber-100">
                    <div class="flex justify-between text-xs text-slate-500 mb-1">
                      <span>${lang === 'ru' ? 'Min' : 'Min'}: ${dMin}</span>
                      <span>${lang === 'ru' ? 'Max' : 'Max'}: ${dMax}</span>
                    </div>
                    <div class="relative h-4 bg-slate-200 rounded-full overflow-hidden">
                      ${currentVal !== null && html`
                        <div class="absolute top-0 bottom-0 left-0 rounded-full transition-all duration-300"
                             style="background: linear-gradient(to right, #4ade80, #22c55e); width: ${hasRange ? `${((currentVal - dMin) / (dMax - dMin)) * 100}%` : '50%'}">
                        </div>
                      `}
                    </div>
                    <div class="flex justify-between items-center mt-2">
                      <span class="text-xs text-slate-500">
                        ${lang === 'ru' ? 'Диапазон' : 'Range'}: ${dMax - dMin}
                      </span>
                      ${hasRange && html`
                        <span class="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
                          ✓ ${lang === 'ru' ? 'Диапазон определён' : 'Range detected'}
                        </span>
                      `}
                    </div>
                    ${currentVal !== null && html`
                      <div class="text-xs text-amber-600 mt-1">
                        ${lang === 'ru' ? 'Текущее:' : 'Current:'} <span class="font-mono font-bold">${currentVal}</span>
                      </div>
                    `}
                  </div>
                `}

                ${!hasData && html`
                  <div class="text-xs text-amber-500 italic">
                    ${lang === 'ru'
                      ? 'Ожидание данных... Вращайте регулятор.'
                      : 'Waiting for data... Rotate the dimmer.'}
                  </div>
                `}

                ${dimmerObs.filter(o => o.cluster === '0xEF00').length > 0 && html`
                  <div class="mt-3 pt-3 border-t border-amber-200">
                    <div class="text-xs text-amber-700 font-medium mb-2">
                      ${lang === 'ru' ? 'Ручная коррекция диапазона (Tuya DP)' : 'Manual range correction (Tuya DP)'}
                    </div>
                    <div class="text-xs text-amber-600 mb-2">
                      ${lang === 'ru'
                        ? 'Если вы крутили регулятор не на весь диапазон — поправьте значения.'
                        : 'If you did not rotate through the full range — adjust the values.'}
                    </div>
                    ${dimmerObs.filter(o => o.cluster === '0xEF00').map(o => {
                      const k = obsKey(o);
                      const override = rawRanges[k] || {};
                      const curMin = override.min ?? o.obs_min;
                      const curMax = override.max ?? o.obs_max;
                      return html`
                        <div class="flex items-center gap-2 mb-1">
                          <span class="text-xs text-slate-500 w-16">${lang === 'ru' ? 'EP' : 'EP'}${parseInt(o.attr, 16)}:</span>
                          <label class="text-xs text-slate-500">min</label>
                          <input type="number" class="border rounded px-1 py-0.5 text-xs w-16 font-mono"
                                 value=${curMin}
                                 onInput=${e => setRawRanges(prev => ({
                                   ...prev, [k]: { ...prev[k], min: parseInt(e.target.value) || 0 }
                                 }))} />
                          <label class="text-xs text-slate-500">max</label>
                          <input type="number" class="border rounded px-1 py-0.5 text-xs w-16 font-mono"
                                 value=${curMax}
                                 onInput=${e => setRawRanges(prev => ({
                                   ...prev, [k]: { ...prev[k], max: parseInt(e.target.value) || 0 }
                                 }))} />
                        </div>
                      `;
                    })}
                  </div>
                `}
              </div>
            `;
          })()}
        </div>

        <div class="flex justify-end gap-3 px-6 py-4 border-t">
          <button class="px-4 py-2 rounded-lg border text-sm"
                  onClick=${onClose}>
            ${lang === 'ru' ? 'Отмена' : 'Cancel'}
          </button>
          ${hasData && !savedType && html`
            <button class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm
                           disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled=${saving}
                    onClick=${handleSave}>
              ${saving
                ? (lang === 'ru' ? 'Сохранение...' : 'Saving...')
                : (lang === 'ru' ? 'Сохранить' : 'Save')}
            </button>
          `}
        </div>
      </div>
    </div>
  `;
}
