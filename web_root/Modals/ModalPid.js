
import { h, render, useState, useEffect, useRef, html, Router } from '../bundle.js';
import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';
import { MyPolzunok, Chart, DeveloperNote } from '../main.js';
import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire } from '../rulang.js';
import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire } from '../enlang.js';
import { fetchCondData, fetchPinsByType, condPayload, validateCondExpr, CondInput } from '../condlib.js';

const SENSOR_OPTIONS = [
  { value: '1', label: 'DS18B20' },
  { value: '2', label: 'DHT-22' },
];

function ModalPid({
  modalType,
  page,
  hideModal,
  closeOnOverlayClick = true,
  title,
  selectedPid,
  onSave,                 // async (body, { condChanged }) => { ok, message } - сохранение делает TabPid
  holdPoll = () => {},    // пауза опроса таблицы на время загрузки данных модалки
  releasePoll = () => {},
  condsInit = null,       // уже загруженная библиотека условий (стор CondLibrary.js)
  poolInit = null,
  language = 'en',
  modalClass,
  SliderComponent = MyPolzunok,
  presetList = [],
  PresetHintComponent = null
}) {
  const [pidInfo, setPidInfo] = useState(selectedPid?.info || '');
  const [onoff, setOnOff] = useState(selectedPid?.onoff === 1);
  const [selsens, setSelsens] = useState(selectedPid?.selsens || '1');
  const [sernum, setSernum] = useState(selectedPid?.sernum || '');
  const [sensorPinId, setSensorPinId] = useState(Number(selectedPid?.sensor_pin_id) || 0);
  const [sensorList, setSensorList] = useState([]);
  const [saving, setSaving] = useState(false);
  const [presets, setPresets] = useState(selectedPid?.presets || '1');
  const [tmpset, setTmpset] = useState(selectedPid?.tmpset || '');
  const [tmpcur, setTmpcur] = useState(selectedPid?.tmpcur || '');
  const [pwmOptions, setPwmOptions] = useState([]);
  const [selectedPwm, setSelectedPwm] = useState(Object.entries(selectedPid?.pinact || {})[0] || ['', '']);
  // Если TabPid передал библиотеку условий - отдельный запрос /api/mysett/get не нужен.
  const [condsLocal, setCondsLocal] = useState([]);
  const [poolLocal, setPoolLocal] = useState(null);
  const condsList = condsInit || condsLocal;
  const poolInfo = condsInit ? poolInit : poolLocal;
  const [pidCond, setPidCond] = useState(selectedPid?.cexpr || '');
  const [condText0, setCondText0] = useState(selectedPid?.cexpr || '');
  const [condNum0, setCondNum0] = useState(parseInt(selectedPid?.cond, 10) || 0);

  useEffect(() => {
    setPidInfo(selectedPid?.info || '');
    setOnOff(selectedPid?.onoff === 1);
    setSelsens(selectedPid?.selsens || '1');
    setSernum(selectedPid?.sernum || '');
    setSensorPinId(Number(selectedPid?.sensor_pin_id) || 0);
    setPresets(selectedPid?.presets || '1');
    setTmpset(selectedPid?.tmpset || '');
    setTmpcur(selectedPid?.tmpcur || '');
    setSelectedPwm(Object.entries(selectedPid?.pinact || {})[0] || ['', '']);
    setPidCond(selectedPid?.cexpr || '');
    setCondText0(selectedPid?.cexpr || '');
    setCondNum0(parseInt(selectedPid?.cond, 10) || 0);
  }, [selectedPid]);

  // Последовательная загрузка: не более одного запроса одновременно (экономия кучи на контроллере).
  // Опрос таблицы на это время стоит на паузе (holdPoll/releasePoll - со счётчиком в TabPid).
  useEffect(() => {
    let cancelled = false;
    holdPoll();

    // Плоский список датчиков с сервера: /api/sensors/get?type=1,2 (постранично по "next").
    // Раньше брался полный /api/state/onewire (все пины, пределы, действия, info).
    const fetchSensors = async () => {
      const out = [];
      let from = 0;
      for (let guard = 0; guard < 10; guard++) {
        const r = await fetch('/api/sensors/get?type=1,2&from=' + from + '&limit=40', { cache: 'no-store' });
        if (!r.ok) throw new Error('HTTP ' + r.status);
        const page = await r.json();
        if (Array.isArray(page.data)) out.push(...page.data);
        const next = typeof page.next === 'number' ? page.next : -1;
        if (next <= from) break;
        from = next;
      }
      return out;
    };

    (async () => {
      try {
        if (!condsInit) {
          const cd = await fetchCondData();   // запасной путь: стор ещё не загружен
          if (cancelled) return;
          setCondsLocal(cd.conds);
          setPoolLocal(cd.pool);
        }

        try {
          const list = await fetchPinsByType([5]);
          if (cancelled) return;
          setPwmOptions(list);
        } catch (error) {
          console.error('Error fetching pin config:', error);
          if (!cancelled) setPwmOptions([]);
        }

        try {
          const list = await fetchSensors();
          if (!cancelled) setSensorList(list);
        } catch (error) {
          console.error('Error fetching sensors:', error);
          if (!cancelled) setSensorList([]);
        }
      } finally {
        releasePoll();
      }
    })();

    return () => { cancelled = true; };
  }, [selectedPid]);

  const sensorChoices = [];
  sensorList.forEach((s) => {
    if (!s.id || String(s.typsensr) !== String(selsens)) return;
    const tail = s.valid ? ` - ${Number(s.t).toFixed(1)} C` : ' - no data';
    if (Number(s.typsensr) === 1) {
      sensorChoices.push({
        key: `${s.id}|${s.s_number}`,
        pinId: s.id,
        sernum: s.s_number,
        label: `${s.pin} (ID: ${s.id}) - ${s.s_number}` + tail
      });
    } else if (Number(s.typsensr) === 2) {
      sensorChoices.push({
        key: `${s.id}|`,
        pinId: s.id,
        sernum: '',
        label: `${s.pin} (ID: ${s.id}) - DHT22` + tail
      });
    }
  });
  const currentSensorKey = `${sensorPinId}|${sernum}`;
  const hasCurrentSensor = sensorChoices.some((c) => c.key === currentSensorKey);

  const handleSensorChange = (e) => {
    const c = sensorChoices.find((x) => x.key === e.target.value);
    setSensorPinId(c ? c.pinId : 0);
    setSernum(c ? c.sernum : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;   // защита от двойного клика: второй POST и второе соединение не нужны

    const hasPwm = selectedPwm[0] && selectedPwm[1] !== undefined && selectedPwm[1] !== '';

    const condErr = validateCondExpr(pidCond);
    if (condErr) {
      alert(condErr.ru);
      return;
    }
    const condBody = condPayload({ loadedText: condText0, loadedNum: condNum0, text: pidCond });

    const jsonData = {
      id: selectedPid.id,
      pins: selectedPwm[0],
      pinact: hasPwm
        ? { [selectedPwm[0]]: parseInt(selectedPwm[1]) }
        : {},
      selsens: selsens,
      sernum: sernum,
      sensor_pin_id: Number(sensorPinId) || 0,
      presets: presets,
      tmpset: tmpset,
      tmpcur: tmpcur,
      info: pidInfo,
      onoff: onoff ? 1 : 0,
      ...condBody,
    };

    const condChanged = (pidCond || '').trim() !== (condText0 || '').trim();

    setSaving(true);
    try {
      // POST, перезагрузка таблицы и обновление библиотеки условий делает TabPid под одной паузой опроса
      const res = await onSave(jsonData, { condChanged });
      if (!res || !res.ok) {
        alert((res && res.message) || 'Ошибка сохранения');
        return;
      }
      hideModal();
      window.location.href = '/#/pid';
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handlePwmChange = (e) => {
    if (!e.target.value) {
      setSelectedPwm(['', '']);
    } else {
      const parts = e.target.value.split('|');
      setSelectedPwm([parts[0], parts[1]]);
    }
  };

  const renderModalContent = () => {
    if (page === 'TabPid' && modalType === 'edit') {
      return html`
        <form onsubmit=${handleSubmit} class="flex flex-col flex-1 min-h-0">
          <div class="modal-body flex-1 min-h-0 overflow-y-auto overscroll-contain pr-1 -mr-1">
            <table class="table-auto w-full">
              <tbody>
                ${[
                  {
                    label: 'ID',
                    value: selectedPid.id
                  },
                    {
                      label: 'PWM Pin',
                      value: html`
                        <select
                          value=${pwmOptions.some(opt => String(opt.pins) === String(selectedPwm[0]))
                            ? `${selectedPwm[0]}|${selectedPwm[1]}`
                            : ''}
                          onChange=${handlePwmChange}
                          class="border rounded p-2 w-full"
                        >
                          <option value="">Select PWM pin</option>
                          ${pwmOptions.map(
                            (option) => html`
                              <option value=${`${option.pins}|${option.id}`}>
                                ${option.pins} (ID: ${option.id})
                              </option>
                            `
                          )}
                        </select>
                      `
                    },
                  {
                    label: 'Selected sensor',
                    value: html`
                      <select
                        value=${selsens}
                        onChange=${(e) => { setSelsens(e.target.value); setSensorPinId(0); setSernum(''); }}
                        class="border rounded p-2 w-full"
                      >
                        ${SENSOR_OPTIONS.map(
                          (opt) => html`
                            <option
                              value=${opt.value}
                              selected=${opt.value === selsens}
                            >
                              ${opt.label}
                            </option>
                          `
                        )}
                      </select>
                    `
                  },
                  {
                    label: 'Sensor',
                    value: html`
                      <select
                        value=${hasCurrentSensor ? currentSensorKey : (sensorPinId || sernum ? currentSensorKey : '')}
                        onChange=${handleSensorChange}
                        class="border rounded p-2 w-full font-mono"
                      >
                        <option value="">Select sensor</option>
                        ${!hasCurrentSensor && (sensorPinId || sernum)
                          ? html`<option value=${currentSensorKey}>${sernum || ('ID: ' + sensorPinId)} (not found)</option>`
                          : null}
                        ${sensorChoices.map(
                          (c) => html`<option value=${c.key}>${c.label}</option>`
                        )}
                      </select>
                    `
                  },
                  {
                    label: 'Presets',
                    value: html`
                      <div>
                        <select
                          value=${presets}
                          onChange=${(e) => setPresets(e.target.value)}
                          class="border rounded p-2 w-full"
                        >
                          ${presetList.map(
                            (opt) => html`
                              <option
                                value=${opt.value}
                                selected=${opt.value === presets}
                              >
                                ${opt.label}
                              </option>
                            `
                          )}
                        </select>
                        ${PresetHintComponent
                          ? html`<${PresetHintComponent}
                              lang=${language}
                              presetId=${presets}
                              tmpset=${tmpset}
                              sensor=${selsens}
                              changed=${String(presets) !== String(selectedPid?.presets || '1')}
                            />`
                          : null}
                      </div>
                    `
                  },
                  {
                    label: 't_set',
                    value: html`
                      <input
                        type="text"
                        value=${tmpset}
                        onInput=${(e) => setTmpset(e.target.value)}
                        class="border rounded p-2 w-full"
                        placeholder="°C"
                      />
                    `
                  },
                  {
                    label: 't_current',
                    value: html`
                      <input
                        type="text"
                        value=${tmpcur}
                        readOnly
                        class="border rounded p-2 w-full bg-gray-100 cursor-not-allowed"
                        placeholder="°C"
                      />
                    `
                  },
                  {
                    label: 'Condition',
                    value: html`
                      <div>
                        <${CondInput}
                          value=${pidCond}
                          onChange=${setPidCond}
                          conds=${condsList}
                          pool=${poolInfo}
                          isRu=${true}
                        />
                        <div class="text-gray-500 text-xs mt-1">
                          Регулятор работает только при истинном условии, иначе выход = 0. Пустое поле - без условия. Кнопки C1..C12 вставляют ссылку на ячейку библиотеки условий (панель Conditions под таблицей).
                        </div>
                      </div>
                    `
                  },

                  {
                    label: 'INFO',
                    value: html`
                      <input
                        type="text"
                        value=${pidInfo}
                        onInput=${(e) => setPidInfo(e.target.value)}
                        class="border rounded p-2 w-full"
                      />
                    `
                  },
                  {
                    label: 'On/Off',
                    value: html`
                      <${SliderComponent}
                        value=${onoff}
                        onChange=${(newValue) => setOnOff(newValue)}
                      />
                    `
                  }
                ].map(
                  (row, index) => html`
                    <tr class="${index % 2 === 1 ? 'bg-white' : 'bg-gray-200'}">
                      <td class="p-2 font-bold">${row.label}</td>
                      <td class="p-2">${row.value}</td>
                    </tr>
                  `
                )}
              </tbody>
            </table>
          </div>
          <div
            class="modal-footer flex-shrink-0 flex justify-end gap-2 pt-4 mt-4 border-t bg-white dark:bg-gray-800"
          >
            <button
              type="button"
              onclick=${hideModal}
              class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled=${saving}
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              Save changes
            </button>
          </div>
        </form>
      `;
    }
    return null;
  };

  const modalContent = html`
    <div class=${`modal ${modalClass || ''}`}>
      <div class="modal-content">
        <div
          class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 overflow-y-auto z-[999]"
          onclick=${(e) =>
            closeOnOverlayClick && e.target === e.currentTarget && hideModal()}
        >
          <div
            class="modal-content bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-lg relative flex flex-col"
            style="margin-top: 0px; max-height: calc(100vh - 2rem); max-height: calc(100dvh - 2rem);"
          >
            <div
              class="modal-header flex-shrink-0 flex justify-between items-center border-b pb-4 mb-4"
            >
              <h5 class="text-xl font-bold">Edit PID</h5>
              <button
                class="close-button text-gray-500 hover:text-gray-700"
                onclick=${hideModal}
              >
                Close
              </button>
            </div>
            ${renderModalContent()}
          </div>
        </div>
      </div>
    </div>
  `;

  const portalRef = useRef(null);

  useEffect(() => {
    const portalEl = document.createElement('div');
    portalEl.id = 'modal-portal';
    document.body.appendChild(portalEl);
    portalRef.current = portalEl;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') hideModal();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
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

export { ModalPid };
