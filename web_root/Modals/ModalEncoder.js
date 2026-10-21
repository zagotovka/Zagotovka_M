
import { h, render, useState, useEffect, useRef, html, Router } from '../bundle.js';
import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';
import { MyPolzunok, Chart, DeveloperNote } from '../main.js';
import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire } from '../rulang.js';
import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire } from '../enlang.js';
import { pwmTimerMap } from '../Tabs/TabEncoder.js';
import { fetchPinsByType, fetchZigbeeAll, condPayload, validateCondExpr, CondInput, condHint } from '../condlib.js';
import { useCondLibrary, refreshCondLibrary } from '../CondLibrary.js';
import { pauseAll, resumeAll } from '../pollQueue.js';

let _loadPauseCount = 0;
function pauseForLoad() {
  if (_loadPauseCount === 0) pauseAll();
  _loadPauseCount++;
}
function resumeForLoad() {
  _loadPauseCount--;
  if (_loadPauseCount <= 0) {
    _loadPauseCount = 0;
    resumeAll();
  }
}

function ModalEncoder({
  modalType,
  page,
  hideModal,
  closeOnOverlayClick = true,
  title,
  selectedEncoder,
  handleEncoderChange,
  connectionOptions,
  SliderComponent = MyPolzunok
}) {
  const [encoderInfo, setEncoderInfo] = useState(selectedEncoder?.info || '');
  const [onoff, setOnOff] = useState(selectedEncoder?.onoff === 1);
  const [encoderB, setEncoderB] = useState({
    pin: selectedEncoder?.encdrbpin || '',
    id: selectedEncoder?.encoderb || ''
  });
  const [selectedConnection, setSelectedConnection] = useState(
    Object.entries(selectedEncoder.pinact || {})[0] || ['', '']
  );
  const [encoderBOptions, setEncoderBOptions] = useState([]);
  const [pwmOptions, setPwmOptions] = useState([]);
  const [zbeeBind, setZbeeBind] = useState(selectedEncoder?.zbee_bind || 0);
  const [zbDimmers, setZbDimmers] = useState([]);
  const submitting = useRef(false);
  // Библиотека условий берётся из общего стора страницы (уже загружена): без запроса
  const condLib = useCondLibrary();
  const condsList = condLib.loaded ? condLib.conds : [];
  const poolInfo = condLib.loaded ? condLib.pool : null;
  // Условие связи энкодера - свободное выражение. Исходные значения нужны,
  // чтобы не отвязать ссылку на ячейку библиотеки (cond 1..12) без правки.
  const [linkExpr, setLinkExpr] = useState(selectedEncoder?.cexpr || '');
  const [condText0] = useState(selectedEncoder?.cexpr || '');
  const [condNum0] = useState(parseInt(selectedEncoder?.cond, 10) || 0);

  // dvalue хранится как ПРОЦЕНТ 0-100. C-код сам масштабирует в шаги таймера.
  const pwmmax = selectedEncoder.pwmmax || 100;
  const [dvalue, setDvalue] = useState(selectedEncoder.dvalue || 0);
  // Power On State: 2 OFF, 3 ON, 4 LAST (по умолчанию LAST - сохранённое значение)
  const [ponr, setPonr] = useState(selectedEncoder.ponr >= 2 && selectedEncoder.ponr <= 4 ? selectedEncoder.ponr : 4);
  const [pwmFreq, setPwmFreq] = useState(selectedEncoder.pwm || 10000000);
  // Строка PWM без энкодера (kind:"pwm"): настройки пишутся в сам PWM-пин
  const isPwmRow = selectedEncoder.kind === 'pwm';
  const isPid = selectedEncoder.owner === 'pid';
  const isLocked = !!selectedEncoder.locked;
  // CH Polarity: 0 - Normal, 1 - Inverted
  const [pol, setPol] = useState(selectedEncoder.pol ? 1 : 0);

  const percentToSteps = (percent) => Math.round((percent * pwmmax) / 100);

  // Что нужно окну. Edit Encoder не требует ни пинов, ни Zigbee; Edit PWM - только
  // Zigbee-диммеры; Connection - пины Encoder B (9) и PWM (5) и Zigbee-диммеры.
  const needPins = modalType === 'connection';
  const needZbee = modalType === 'connection' || (modalType === 'edit' && isPwmRow);

  useEffect(() => {
    let cancelled = false;
    const ac = new AbortController();
    pauseForLoad();

    (async () => {
      if (needPins) {
        try {
          const pins = await fetchPinsByType([9, 5], { signal: ac.signal });
          if (cancelled) return;
          const encoderBPins = pins.filter((pin) => pin.topin === 9);
          const pwmPins = pins.filter((pin) => pin.topin === 5);
          setEncoderBOptions(encoderBPins);
          setPwmOptions(pwmPins);

          if (selectedEncoder.encoderb || selectedEncoder.encdrbpin) {
            const selectedOption = encoderBPins.find(
              (option) => String(option.id) === String(selectedEncoder.encoderb)
                || option.pins === selectedEncoder.encdrbpin
            );
            setEncoderB({
              pin: selectedOption ? selectedOption.pins : (selectedEncoder.encdrbpin || ''),
              id: selectedOption ? selectedOption.id : (selectedEncoder.encoderb || '')
            });
          }
        } catch (error) {
          if (cancelled || error.name === 'AbortError') return;
          console.error('Error fetching pin config:', error);
          setEncoderBOptions([]);
          setPwmOptions([]);
        }
      }

      if (needZbee && !cancelled) {
        try {
          const zb = await fetchZigbeeAll({ type: 'dimmer', signal: ac.signal });
          if (!cancelled && zb && zb.zigbee) {
            setZbDimmers(zb.zigbee.filter(z => z && z.type === 'dimmer'));
          }
        } catch (e) {
          if (!cancelled && e.name !== 'AbortError') console.error('Error fetching zigbee:', e);
        }
      }
    })().finally(() => { resumeForLoad(); });

    return () => { cancelled = true; ac.abort(); };
  }, [selectedEncoder]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (!(form instanceof HTMLFormElement)) return;
    if (submitting.current) return;   // повторное нажатие во время отправки

    let jsonData = {};

    if (modalType === 'edit') {
      // Окно редактирования параметров (Частота, Шаги и т.д.)
      jsonData = {
        // PWM-строка остаётся topin 5: иначе Save превратил бы PWM-пин в Encoder A
        topin: isPwmRow ? 5 : 8,
        id: selectedEncoder.id,
        pins: selectedEncoder.pins,
        pwm: parseInt(pwmFreq), // Отправляем миллигерцы (10000000)
        pwmmax: selectedEncoder.pwmmax,
        dvalue: parseInt(dvalue),  // 0-100%, C-код масштабирует в шаги
        ponr: parseInt(ponr),
        info: encoderInfo,
        onoff: onoff ? 1 : 0,
        pol: pol
      };
      if (isPwmRow) jsonData.zbee_bind = zbeeBind;
    } else if (modalType === 'connection') {
      // Окно редактирования связей (Connection)

      // Проверяем, выбрана ли связь (имя пина в [0] и ID в [1])
      const hasConnection = selectedConnection && selectedConnection[0] && selectedConnection[1] !== undefined;

      // Формируем ОБЪЕКТ-СЛОВАРЬ для STM32: {"pinName": idout}
      // Бэкенд ожидает cJSON_IsObject + cJSON_ArrayForEach с key=имя_пина и valueint=id
      const pinactValue = hasConnection
        ? { [selectedConnection[0]]: parseInt(selectedConnection[1]) }
        : {};

      jsonData = {
        id: selectedEncoder.id,
        pins: selectedEncoder.pins,
        pwm: parseInt(pwmFreq),
        zbee_bind: zbeeBind
      };

      // Логика для Encoder B
      if (encoderB && encoderB.id !== undefined && encoderB.id !== '') {
        jsonData.encoderb = parseInt(encoderB.id);
        jsonData.encdrbpin = encoderB.pin;
      } else {
        jsonData.encoderb = 255;
        jsonData.encdrbpin = "";
      }

      // Добавляем объект связей (пустой объект {} если связь не выбрана)
      jsonData.pinact = pinactValue;
      // Дополнительное условие срабатывания связи: свободное выражение
      // ("cexpr") либо, если текст условия не менялся, номер ячейки.
      const condErr = validateCondExpr(linkExpr);
      if (condErr) {
        alert(condErr.ru);
        return;
      }
      Object.assign(jsonData, condPayload({ loadedText: condText0, loadedNum: condNum0, text: linkExpr }));
    }

    console.log('Sending JSON to STM32:', JSON.stringify(jsonData));

    submitting.current = true;
    pauseAll();   // на время отправки опрос стоит
    fetch('/api/encoder/set', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonData)
    })
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (!r.ok) {
          // Например 400: условие длиннее 46 символов или с ошибкой синтаксиса
          alert(data.message || `Ошибка ${r.status}`);
          return;
        }
        // Занятость пула выражений изменилась: обновляем общий стор (один запрос)
        if (modalType === 'connection') {
          try { await refreshCondLibrary(true); } catch (err) { console.error('conds refresh:', err); }
        }
        handleEncoderChange({ ...selectedEncoder, ...jsonData });
        hideModal();
      })
      .catch(err => console.error('Error saving encoder:', err))
      .finally(() => { submitting.current = false; resumeAll(); });
  };

  const handleEncoderInfoChange = (e) => {
    setEncoderInfo(e.target.value);
  };

  const handleOnOffChange = (newValue) => {
    setOnOff(newValue);
  };

  const handleEncoderBChange = (e) => {
    const selectedOption = encoderBOptions.find(
      (option) => option.pins === e.target.value
    );
    setEncoderB({
      pin: e.target.value,
      id: selectedOption ? selectedOption.id : ''
    });
  };

  const handleConnectionChange = (e) => {
    if (!e.target.value) {
      setSelectedConnection(['', '']);
    } else {
      const parts = e.target.value.split('|');
      setSelectedConnection([parts[0], parts[1]]);
    }
  };

  const handleDvalueChange = (e) => {
    setDvalue(e.target.value);
  };

  const handlePonrChange = (e) => {
    setPonr(e.target.value);
  };

  const handlePwmFreqChange = (e) => {
    setPwmFreq(e.target.value);
  };

  // Привязанное устройство, которого нет в списке диммеров, не должно молча пропасть из select
  const zbOptions = (zbeeBind > 0 && !zbDimmers.some((z) => z.id === zbeeBind))
    ? [...zbDimmers, { id: zbeeBind }]
    : zbDimmers;

  const getFreqStatus = (mhz) => {
    const hz = mhz / 1000;
    if (hz <= 40000) return { cls: 'text-green-600', msg: 'Optimal range' };
    if (hz <= 200000) return { cls: 'text-yellow-600', msg: 'Precision might drop' };
    return { cls: 'text-red-600', msg: 'Expert mode: low precision' };
  };

  const renderModalContent = () => {
    if (page === 'TabEncoder') {
      if (modalType === 'connection') {
        return html`
          <form onsubmit=${handleSubmit}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">ID</td>
                    <td class="p-2">${selectedEncoder.id}</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Pin</td>
                    <td class="p-2">${selectedEncoder.pins}</td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">Encoder B</td>
                    <td class="p-2">
                      <select
                        name="encdrb"
                        value=${encoderBOptions.some(opt => opt.pins === encoderB.pin) ? encoderB.pin : ''}
                        onchange=${handleEncoderBChange}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select Encoder B</option>
                        ${encoderBOptions.map(
          (option) => html`
                            <option value=${option.pins}>
                              ${option.pins} (ID: ${option.id})
                            </option>
                          `
        )}
                      </select>
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">PWM connection</td>
                    <td class="p-2">
                      <select
                        name="pwmconnection"
                        value=${pwmOptions.some(opt => String(opt.pins) === String(selectedConnection[0])) ? `${selectedConnection[0]}|${selectedConnection[1]}` : ''}
                        onchange=${handleConnectionChange}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select PWM connection</option>
                        ${pwmOptions.map(
          (option) => {
            const timerName = pwmTimerMap[option.pins] || 'Unknown Timer';
            return html`
                            <option value=${`${option.pins}|${option.id}`}>
                              ${option.pins} (${timerName}, ID: ${option.id})
                            </option>
                          `
          }
        )}
                      </select>
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Condition</td>
                    <td class="p-2">
                      <${CondInput}
                        value=${linkExpr}
                        onChange=${setLinkExpr}
                        conds=${condsList}
                        pool=${poolInfo}
                        isRu=${true}
                      />
                      <div class="text-xs text-slate-500 mt-1">
                        Срабатывает только при истинном условии. Пустое поле - без условия. Кнопки C1..C12 вставляют ссылку на ячейку библиотеки условий (панель Conditions под таблицей: её можно править там же).
                      </div>
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">Zigbee Device</td>
                    <td class="p-2">
                      <select
                        name="zbee_bind"
                        value=${zbeeBind}
                        onchange=${e => {
                          const val = parseInt(e.target.value) || 0;
                          setZbeeBind(val);
                        }}
                        class="border rounded p-2 w-full"
                      >
                        <option value="0">None</option>
                        ${zbOptions.map(z => html`
                          <option value=${z.id || 0}>
                            ID: ${z.id}
                          </option>
                        `)}
                      </select>
                      <div class="text-xs text-slate-500 mt-1">
                        Привязать к Zigbee-диммеру для автоматического управления
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer flex justify-end mt-4">
              <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save changes
              </button>
            </div>
          </form>
        `;
      } else if (modalType === 'edit') {
        return html`
          <form onsubmit=${handleSubmit}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">ID</td>
                    <td class="p-2">${selectedEncoder.id}</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Pin</td>
                    <td class="p-2">${selectedEncoder.pins}</td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">PWM Frequency (milliHz)</td>
                    <td class="p-2">
                      <input
                        type="number"
                        min="50"
                        max="2000000000"
                        value=${pwmFreq}
                        oninput=${e => setPwmFreq(e.target.value)}
                        class="border rounded p-2 w-full font-mono"
                        placeholder="50 - 2000000000"
                      />
                      <div class="text-xs ${getFreqStatus(pwmFreq).cls}">
                        ${getFreqStatus(pwmFreq).msg}
                      </div>
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Resolution</td>
                    <td class="p-2 text-blue-600 font-mono">
                      ${selectedEncoder.pwmmax || '---'} steps
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">Dimmer value %</td>
                    <td class="p-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value=${dvalue}
                        oninput=${handleDvalueChange}
                        disabled=${isPid}
                        class="border rounded p-2 w-full ${isPid ? 'bg-gray-100 text-gray-500' : ''}"
                      />
                      ${isPid ? html`<div class="text-xs text-amber-700">PID: значение задаёт регулятор (read-only)</div>` : ''}
                      <div class="text-xs text-gray-500">
                        ${dvalue}% = ${percentToSteps(parseInt(dvalue) || 0)} / ${pwmmax} steps
                      </div>
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Power on state</td>
                    <td class="p-2">
                      <select
                        value=${ponr}
                        onchange=${handlePonrChange}
                        class="border rounded p-2 w-full"
                      >
                        <option value="2">OFF</option>
                        <option value="3">ON</option>
                        <option value="4">LAST</option>
                      </select>
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">INFO</td>
                    <td class="p-2">
                      <input
                        type="text"
                        name="info"
                        value=${encoderInfo}
                        oninput=${handleEncoderInfoChange}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${SliderComponent}
                        value=${onoff}
                        disabled=${isPid}
                        onChange=${handleOnOffChange}
                      />
                      ${isPid ? html`<div class="text-xs text-amber-700">У PID свой переключатель</div>` : ''}
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">Полярность PWM / CH Polarity</td>
                    <td class="p-2">
                      <select
                        value=${pol}
                        disabled=${isLocked}
                        onchange=${e => setPol(parseInt(e.target.value) || 0)}
                        class="border rounded p-2 w-full"
                      >
                        <option value="0">Normal</option>
                        <option value="1">Inverted</option>
                      </select>
                      <div class="text-xs text-slate-500 mt-1">
                        Normal: 20% в интерфейсе = 20% на нагрузке. Inverted: для плат с инвертирующим каскадом (например, оптрон 6N137), чтобы 20% в интерфейсе по-прежнему были 20% на нагрузке. Применяется сразу, без перезагрузки.
                      </div>
                    </td>
                  </tr>
                  ${isPwmRow ? html`
                    <tr class="bg-white">
                      <td class="p-2 font-bold">Zigbee Device</td>
                      <td class="p-2">
                        <select
                          name="zbee_bind"
                          value=${zbeeBind}
                          onchange=${e => setZbeeBind(parseInt(e.target.value) || 0)}
                          class="border rounded p-2 w-full"
                        >
                          <option value="0">None</option>
                          ${zbOptions.map(z => html`
                            <option value=${z.id || 0}>ID: ${z.id}</option>
                          `)}
                        </select>
                        <div class="text-xs text-slate-500 mt-1">
                          Zigbee-диммер управляет этим PWM напрямую, пины Encoder A/B не нужны
                        </div>
                      </td>
                    </tr>
                  ` : ''}
                </tbody>
              </table>
            </div>
            <div class="modal-footer flex justify-end mt-4">
              <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save changes
              </button>
            </div>
          </form>
        `;
      }
    }
  };

  const modalContent = html`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick=${(e) => closeOnOverlayClick && e.target === e.currentTarget && hideModal()}
    >
      <div
        class="bg-white rounded-lg p-4 sm:p-6 max-w-2xl w-full relative"
        style="max-height: 90vh; max-height: 90dvh; overflow-y: auto;"
      >
        <div class="modal-header flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">${title}</h2>
          <button
            onClick=${hideModal}
            class="close-button text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
        ${renderModalContent()}
      </div>
    </div>
  `;

  const portalRef = useRef(null);

  useEffect(() => {
    const portalEl = document.createElement('div');
    portalEl.id = 'encoder-modal-portal';
    document.body.appendChild(portalEl);
    portalRef.current = portalEl;
    return () => {
      render(null, portalEl);
      document.body.removeChild(portalEl);
    };
  }, []);

  useEffect(() => {
    if (portalRef.current) {
      render(modalContent, portalRef.current);
    }
  });

  return null;
}

export { ModalEncoder };


