import { h, render, useState, useEffect, useRef, html, Router } from '../bundle.js';
import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';
import { MyPolzunok, Chart, DeveloperNote } from '../main.js';
import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire } from '../rulang.js';
import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire } from '../enlang.js';

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
  const [pinOptions, setPinOptions] = useState([]);
  const [encoderBOptions, setEncoderBOptions] = useState([]);
  const [pwmOptions, setPwmOptions] = useState([]);

  const [dvalue, setDvalue] = useState(selectedEncoder.dvalue || 0);
  const [ponr, setPonr] = useState(selectedEncoder.ponr || 0);
  const [pwmFreq, setPwmFreq] = useState(selectedEncoder.pwm || 10000000);

  useEffect(() => {
    fetch('/api/select/get', {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        if (!response || !response.data || !Array.isArray(response.data)) {
          console.error('Invalid data format:', response);
          setPinOptions([]);
          setEncoderBOptions([]);
          setPwmOptions([]);
          return;
        }

        const relayPins = response.data.filter((pin) => pin.topin === 2);
        const encoderBPins = response.data.filter((pin) => pin.topin === 9);
        const pwmPins = response.data.filter((pin) => pin.topin === 5);

        setPinOptions(relayPins);
        setEncoderBOptions(encoderBPins);
        setPwmOptions(pwmPins);

        if (selectedEncoder.encoderb || selectedEncoder.encdrbpin) {
          const selectedOption = encoderBPins.find(
            (option) => String(option.id) === String(selectedEncoder.encoderb) || option.pins === selectedEncoder.encdrbpin
          );
          setEncoderB({
            pin: selectedOption ? selectedOption.pins : '',
            id: selectedOption ? selectedOption.id : ''
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching pin config:', error);
        setPinOptions([]);
        setEncoderBOptions([]);
        setPwmOptions([]);
      });
  }, [selectedEncoder]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (form instanceof HTMLFormElement) {
      let jsonData = {};

      if (modalType === 'edit') {
        jsonData = {
          topin: 8,
          id: selectedEncoder.id,
          pins: selectedEncoder.pins,
          pwm: parseInt(pwmFreq),
          dvalue: parseInt(dvalue),
          ponr: parseInt(ponr),
          info: encoderInfo,
          onoff: onoff ? 1 : 0
        };
      } else if (modalType === 'connection') {
        jsonData = {
          id: selectedEncoder.id,
          pins: selectedEncoder.pins,
          encoderb: parseInt(encoderB.id),
          encdrbpin: encoderB.pin,
          pinact: { [selectedConnection[0]]: parseInt(selectedConnection[1]) }
        };
      }
      console.log('We got a encoder JSON:', JSON.stringify(jsonData));
      fetch('/api/encoder/set', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      })
        .then((response) => response.json())
        .then((data) => {
          handleEncoderChange({ ...selectedEncoder, ...jsonData });
          hideModal();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      console.error('Form element not found');
    }
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
          (option) => html`
                            <option value=${`${option.pins}|${option.id}`}>
                              ${option.pins} (ID: ${option.id})
                            </option>
                          `
        )}
                      </select>
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
                    <td class="p-2 font-bold">Dimmer value (0-100)</td>
                    <td class="p-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value=${dvalue}
                        oninput=${handleDvalueChange}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Duty on restore</td>
                    <td class="p-2">
                      <select
                        value=${ponr}
                        onchange=${handlePonrChange}
                        class="border rounded p-2 w-full"
                      >
                        <option value="0">OFF</option>
                        <option value="1">ON</option>
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
                        onChange=${handleOnOffChange}
                      />
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
      }
    }
  };

  const modalContent = html`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50"
      style="margin-top: 7px;"
    >
      <div class="flex items-center justify-center min-h-full p-4">
        <div
          class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative"
          style="max-height: calc(100vh - 57px); overflow-y: auto;"
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

export { ModalEncoder };
