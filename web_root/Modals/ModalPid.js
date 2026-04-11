import { h, render, useState, useEffect, useRef, html, Router } from '../bundle.js';
import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';
import { MyPolzunok, Chart, DeveloperNote } from '../main.js';
import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire } from '../rulang.js';
import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire } from '../enlang.js';

// Пресеты по языку
const PRESETS = {
  ru: [
    { value: '1', label: 'Паяльная станция T max=125°C, T min=-55°C' },
    { value: '2', label: 'Кулер / вентилятор T max=70°C, T min=-55°C' },
    { value: '3', label: '3D‑принтер (стол) T max=120°C, T min=0°C' },
    { value: '4', label: 'Форточный нагреватель T max=60°C, T min=-55°C' },
    { value: '5', label: 'Тёплый пол T max=45°C, T min=0°C' },
    { value: '6', label: 'Холодильник T max=100°C, T min=-55°C' },
    { value: '7', label: 'Аквариум / бойлер T max=80°C, T min=0°C' },
    { value: '8', label: 'Инкубатор T max=45°C, T min=0°C' },
    { value: '9', label: 'Теплица / комната T max=50°C, T min=-55°C' },
  ],
  en: [
    { value: '1', label: 'Soldering station T max=125°C, T min=-55°C' },
    { value: '2', label: 'Cooler / fan T max=70°C, T min=-55°C' },
    { value: '3', label: '3D printer (table) T max=120°C, T min=0°C' },
    { value: '4', label: 'Vent heater T max=60°C, T min=-55°C' },
    { value: '5', label: 'Warm floor T max=45°C, T min=0°C' },
    { value: '6', label: 'Refrigerator T max=100°C, T min=-55°C' },
    { value: '7', label: 'Aquarium / boiler T max=80°C, T min=0°C' },
    { value: '8', label: 'Incubator T max=45°C, T min=0°C' },
    { value: '9', label: 'Greenhouse / room T max=50°C, T min=-55°C' },
  ],
};

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
  handlePidChange,
  language = 'en',
  modalClass,
  SliderComponent = MyPolzunok
}) {
  const [pidInfo, setPidInfo] = useState(selectedPid?.info || '');
  const [onoff, setOnOff] = useState(selectedPid?.onoff === 1);
  const [selsens, setSelsens] = useState(selectedPid?.selsens || '1');
  const [sernum, setSernum] = useState(selectedPid?.sernum || '');
  const [presets, setPresets] = useState(selectedPid?.presets || '1');
  const [tmpset, setTmpset] = useState(selectedPid?.tmpset || '');
  const [tmpcur, setTmpcur] = useState(selectedPid?.tmpcur || '');
  const [pwmOptions, setPwmOptions] = useState([]);
  const [selectedPwm, setSelectedPwm] = useState(Object.entries(selectedPid?.pinact || {})[0] || ['', '']
);

  // Обновляем состояние при смене selectedPid
useEffect(() => {
  setPidInfo(selectedPid?.info || '');
  setOnOff(selectedPid?.onoff === 1);
  setSelsens(selectedPid?.selsens || '1');
  setSernum(selectedPid?.sernum || '');
  setPresets(selectedPid?.presets || '1');
  setTmpset(selectedPid?.tmpset || '');
  setTmpcur(selectedPid?.tmpcur || '');
  setSelectedPwm(Object.entries(selectedPid?.pinact || {})[0] || ['', '']);
}, [selectedPid]);


  useEffect(() => {
  fetch('/api/select/get', {
    method: 'GET',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then((response) => {
      if (!response || !response.data || !Array.isArray(response.data)) {
        console.error('Invalid data format:', response);
        setPwmOptions([]);
        return;
      }
      const pwmPins = response.data.filter((pin) => pin.topin === 5);
      setPwmOptions(pwmPins);
    })
    .catch((error) => {
      console.error('Error fetching pin config:', error);
      setPwmOptions([]);
    });
}, [selectedPid]);

  const handleSubmit = (e) => {
    e.preventDefault();

const hasPwm = selectedPwm[0] && selectedPwm[1] !== undefined && selectedPwm[1] !== '';

const jsonData = {
  id: selectedPid.id,
  pins: selectedPwm[0],          // имя пина, например "PB15"
  pinact: hasPwm
    ? { [selectedPwm[0]]: parseInt(selectedPwm[1]) }
    : {},
  selsens: selsens,
  sernum: sernum,
  presets: presets,
  tmpset: tmpset,
  tmpcur: tmpcur,
  info: pidInfo,
  onoff: onoff ? 1 : 0,
};

    console.log('Data being sent to server:', jsonData);

    fetch('/api/pid/set', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        handlePidChange({ ...selectedPid, ...jsonData });
        hideModal();
        window.location.href = '/#/pid';
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
const handlePwmChange = (e) => {
  if (!e.target.value) {
    setSelectedPwm(['', '']);
  } else {
    const parts = e.target.value.split('|');
    setSelectedPwm([parts[0], parts[1]]);
  }
};
  const presetList = PRESETS[language] || PRESETS['en'];

  const renderModalContent = () => {
    if (page === 'TabPid' && modalType === 'edit') {
      return html`
        <form onsubmit=${handleSubmit}>
          <div class="modal-body">
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
                        onChange=${(e) => setSelsens(e.target.value)}
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
                    label: 'Dev. ser. number',
                    value: selsens === '1'
                      ? html`
                          <input
                            type="text"
                            value=${sernum}
                            onInput=${(e) => setSernum(e.target.value)}
                            class="border rounded p-2 w-full font-mono"
                            placeholder="e.g. xxxxxxxxxxxxxxxx"
                          />
                        `
                      : html`
                          <input
                            type="text"
                            value="N/A"
                            readOnly
                            class="border rounded p-2 w-full bg-gray-100 cursor-not-allowed text-gray-400 italic"
                          />
                        `
                  },
                  {
                    label: 'Presets',
                    value: html`
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
    return null;
  };

  const modalContent = html`
    <div class=${`modal ${modalClass || ''}`}>
      <div class="modal-content">
        <div
          class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
          onclick=${(e) =>
            closeOnOverlayClick && e.target === e.currentTarget && hideModal()}
        >
          <div
            class="modal-content bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg relative"
            style="margin-top: 0px;"
          >
            <div
              class="modal-header flex justify-between items-center border-b pb-4 mb-4"
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

export { ModalPid };