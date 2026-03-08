import { h, render, useState, useEffect, useRef, html, Router } from '../bundle.js';
import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';
import { MyPolzunok, Chart, DeveloperNote } from '../main.js';
import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire } from '../rulang.js';
import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire } from '../enlang.js';

const ModalSecurity = ({
  modalType,
  page,
  hideModal,
  title,
  selectedSecurity,
  onSecurityChange,
  SliderComponent = MyPolzunok
}) => {
  const [mecurityInfo, setSecurityInfo] = useState(
    selectedSecurity?.info || ''
  );
  const [onoff, setOnOff] = useState(selectedSecurity?.onoff || 0);
  const [ptype, setPtype] = useState(selectedSecurity?.ptype || 0);
  const [send_sms, setSend_sms] = useState(selectedSecurity?.send_sms || '');
  const [action, setAction] = useState(selectedSecurity?.action || '');
  const [pinOptions, setPinOptions] = useState([]);
  const [errors, setErrors] = useState({
    send_sms: null,
    action: null
  });
  const [submitError, setSubmitError] = useState(null);

  const mecurityRegex = /^(None|\d{1,2}:[012])(,\d{1,2}:[012])*$/;

  const validateInput = (key, value) => {
    if (!value || value.trim() === '' || value.toLowerCase() === 'none') {
      return null;
    }

    if (key === 'action') {
      return mecurityRegex.test(value)
        ? null
        : 'Incorrect format. Use "None" or "pin:value" format.';
    }

    if (value.length > 100) {
      return 'Text should not exceed 100 characters';
    }
    return null;
  };

  const handleInputChange = (key, value) => {
    const error = validateInput(key, value);
    setErrors((prev) => ({ ...prev, [key]: error }));

    switch (key) {
      case 'send_sms':
        setSend_sms(value);
        break;
      case 'action':
        setAction(value);
        break;
    }
  };

  useEffect(() => {
    fetch('/api/monitoring/get')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPinOptions(data.filter((pin) => pin.topin === 2));
        } else {
          // console.error('Expected array from API, received:', typeof data);
          setPinOptions([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching pin config:', error);
        setPinOptions([]);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(errors).some((error) => error !== null)) {
      setSubmitError('Please correct the errors before submitting.');
      return;
    }

    const updatedSecurity = {
      ...selectedSecurity,
      info: mecurityInfo,
      send_sms: send_sms || 'NO',
      action: action || 'None',
      onoff,
      ptype
    };

    fetch('/api/monitoring/set', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedSecurity)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        onSecurityChange(updatedSecurity);
        hideModal();
      })
      .catch((error) => {
        console.error('Error:', error);
        setSubmitError('Failed to save changes. Please try again.');
      });
  };

  const handleResetPin = () => {
    setPtype(0);
    setSend_sms('');
    setAction('');
    setSecurityInfo('');
    setOnOff(0);
    setErrors({ send_sms: null, action: null });
  };

  const renderConnectionModal = () => html`
    <form onSubmit=${handleSubmit}>
      <div class="modal-body">
        <table class="table-auto w-full">
          <tbody>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">ID</td>
              <td class="p-2">${selectedSecurity.id}</td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">Pin</td>
              <td class="p-2">${selectedSecurity.pins}</td>
            </tr>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">Connection</td>
              <td class="p-2">
                <select
                  name="setrpins"
                  value=${pinOptions.some(opt => opt.pins === selectedSecurity?.setrpins) ? selectedSecurity?.setrpins : ''}
                  onChange=${(e) =>
      onSecurityChange({
        ...selectedSecurity,
        setrpins: e.target.value
      })}
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

  const renderEditModal = () => html`
    <form onSubmit=${handleSubmit}>
      <div class="modal-body">
        <table class="table-auto w-full">
          <tbody>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">ID</td>
              <td class="p-2">${selectedSecurity.id}</td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">Pin</td>
              <td class="p-2">${selectedSecurity.pins}</td>
            </tr>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">Ptype</td>
              <td class="p-2">
                <select
                  name="ptype"
                  value=${ptype}
                  onChange=${(e) => setPtype(parseInt(e.target.value))}
                  class="border rounded p-2 w-full"
                >
                  <option value="0">PIR</option>
                  <option value="1">Normal open</option>
                  <option value="2">Normal close</option>
                </select>
              </td>
            </tr>

            <tr class="bg-gray-200">
              <td class="p-2 font-bold">Action</td>
              <td class="p-2">
                <input
                  type="text"
                  name="action"
                  value=${action}
                  onInput=${(e) => handleInputChange('action', e.target.value)}
                  class="border rounded p-2 w-full ${errors.action
      ? 'border-red-500'
      : ''}"
                  placeholder="None"
                />
                ${errors.action &&
    html`<p class="text-red-500 text-sm">${errors.action}</p>`}
              </td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">Send SMS</td>
              <td class="p-2">
                <select
                  name="send_sms"
                  value=${send_sms}
                  onchange=${(e) =>
      handleInputChange('send_sms', e.target.value)}
                  class="border rounded p-2 w-full ${errors.send_sms
      ? 'border-red-500'
      : ''}"
                >
                  <option value="NO">NO</option>
                  <option value="YES">YES</option>
                </select>
                ${errors.send_sms &&
    html` <p class="text-red-500 text-sm">${errors.send_sms}</p> `}
              </td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">INFO</td>
              <td class="p-2">
                <input
                  type="text"
                  name="info"
                  value=${mecurityInfo}
                  onInput=${(e) => setSecurityInfo(e.target.value)}
                  class="border rounded p-2 w-full"
                />
              </td>
            </tr>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">On/Off</td>
              <td class="p-2">
                <${SliderComponent} value=${onoff} onChange=${setOnOff} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer flex justify-between mt-4">
        <button
          type="button"
          onClick=${handleResetPin}
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset Pin
        </button>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save changes
        </button>
      </div>
      ${submitError && html`<p class="text-red-500 mt-2">${submitError}</p>`}
    </form>
  `;

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
          ${page === 'TabSecurity' && modalType === 'connection'
      ? renderConnectionModal()
      : renderEditModal()}
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

};

export { ModalSecurity };
