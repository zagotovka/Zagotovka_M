import { h, render, useState, useEffect, useRef, html, Router } from '../bundle.js';
import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';
import { MyPolzunok, Chart, DeveloperNote } from '../main.js';
import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire } from '../rulang.js';
import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire } from '../enlang.js';

function ModalSwitch({
  modalType,
  page,
  hideModal,
  closeOnOverlayClick = true,
  title,
  selectedSwitch,
  onSwitchChange,
  connectionOptions,
  SliderComponent = MyPolzunok
}) {
  const [switchInfo, setSwitchInfo] = useState(selectedSwitch?.info || '');
  const [onoff, setOnOff] = useState(selectedSwitch?.onoff || 0);
  const [ptype, setPtype] = useState(selectedSwitch?.ptype || 0);
  const [selectedConnection, setSelectedConnection] = useState(
    selectedSwitch?.setrpins || ''
  );
  const [pinOptions, setPinOptions] = useState([]);

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
          return;
        }
        const relayPins = response.data.filter((pin) => pin.topin === 2);
        setPinOptions(relayPins);
      })
      .catch((error) => {
        console.error('Error fetching pin config:', error);
        setPinOptions([]);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const jsonData = Object.fromEntries(formData);

    jsonData.id = selectedSwitch.id;
    jsonData.pins = selectedSwitch.pins;

    if (modalType === 'edit') {
      jsonData.onoff = onoff;
    } else if (modalType === 'connection') {
      const selectedPin = pinOptions.find(
        (pin) => pin.pins === jsonData.setrpins
      );
      if (selectedPin) {
        jsonData.pinact = {
          ...selectedSwitch.pinact,
          [selectedPin.id]: selectedPin.pins
        };
      }
    }

    fetch('/api/switch/set', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        onSwitchChange({
          ...selectedSwitch,
          ...jsonData
        });
        hideModal();
        window.location.href = '/#/switch';
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleConnectionChange = (e) => {
    setSelectedConnection(e.target.value);
  };

  const handlePtypeChange = (e) => {
    setPtype(parseInt(e.target.value));
  };

  const handleSwitchInfoChange = (e) => {
    setSwitchInfo(e.target.value);
  };

  const handleOnOffChange = (value) => {
    setOnOff(value);
  };

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      hideModal();
    }
  };

  const handleResetPin = () => {
    setPtype(0);
    setSwitchInfo('');
    setOnOff(0);
  };

  const renderModalContent = () => {
    if (page === 'TabSwitch') {
      if (modalType === 'connection') {
        return html`
          <form onsubmit=${handleSubmit}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">ID</td>
                    <td class="p-2">${selectedSwitch.id}</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Pin</td>
                    <td class="p-2">${selectedSwitch.pins}</td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">Connection</td>
                    <td class="p-2">
                      <select
                        name="setrpins"
                        value=${pinOptions.some(opt => opt.pins === selectedConnection) ? selectedConnection : ''}
                        onchange=${handleConnectionChange}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select a connection</option>
                        ${pinOptions.map(
          (option) => html`
                            <option value=${option.pins}>
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
                    <td class="p-2">${selectedSwitch.id}</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Pin</td>
                    <td class="p-2">${selectedSwitch.pins}</td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">Pullup type</td>
                    <td class="p-2">
                      <select
                        name="ptype"
                        value=${ptype}
                        onchange=${handlePtypeChange}
                        class="border rounded p-2 w-full"
                      >
                        <option value="0">None</option>
                        <option value="1">GPIO_PULLUP</option>
                        <option value="2">GPIO_PULLDOWN</option>
                      </select>
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">INFO</td>
                    <td class="p-2">
                      <input
                        type="text"
                        name="info"
                        value=${switchInfo}
                        oninput=${handleSwitchInfoChange}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
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
            <div class="modal-footer flex justify-between items-center mt-4">
              <button
                type="button"
                onclick=${handleResetPin}
                class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Reset pin
              </button>
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
      onclick=${handleOverlayClick}
    >
      <div class="flex items-center justify-center min-h-full p-4">
        <div
          class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative"
          style="max-height: calc(100vh - 57px); overflow-y: auto;"
        >
          <div class="modal-header flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">${title}</h2>
            <button
              onclick=${hideModal}
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

export { ModalSwitch };
