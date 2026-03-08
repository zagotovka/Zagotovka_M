import { h, render, useState, useEffect, useRef, html, Router } from '../bundle.js';
import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';
import { MyPolzunok, Chart, DeveloperNote } from '../main.js';
import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire } from '../rulang.js';
import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire } from '../enlang.js';

const ModalButton = ({
  modalType,
  page,
  hideModal,
  closeOnOverlayClick = true,
  title,
  selectedButton,
  onButtonChange,
  SliderComponent = MyPolzunok
}) => {
  const [buttonInfo, setButtonInfo] = useState(selectedButton?.info || '');
  const [onoff, setOnOff] = useState(selectedButton?.onoff || 0);
  const [ptype, setPtype] = useState(selectedButton?.ptype || 0);
  const [sclick, setSclick] = useState(selectedButton?.sclick || '');
  const [dclick, setDclick] = useState(selectedButton?.dclick || '');
  const [lpress, setLpress] = useState(selectedButton?.lpress || '');
  const [pinOptions, setPinOptions] = useState([]);
  const [errors, setErrors] = useState({
    sclick: null,
    dclick: null,
    lpress: null
  });
  const [submitError, setSubmitError] = useState(null);

  const doubleClickLongPressRegex = /^(None|\d{1,2}:[012])(,\d{1,2}:[012])*$/;

  const validateInput = (value) => {
    if (!value || value.trim() === '' || value.toLowerCase() === 'none') {
      return null;
    }
    return doubleClickLongPressRegex.test(value)
      ? null
      : 'Incorrect format. Use "None" or "pin:value" format.';
  };

  const handleInputChange = (key, value) => {
    const error = validateInput(value);
    setErrors((prev) => ({ ...prev, [key]: error }));

    switch (key) {
      case 'sclick':
        setSclick(value);
        break;
      case 'dclick':
        setDclick(value);
        break;
      case 'lpress':
        setLpress(value);
        break;
    }
  };

  useEffect(() => {
    fetch('/api/select/get')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPinOptions(data.filter((pin) => pin.topin === 2));
        } else {
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

    const updatedButton = {
      ...selectedButton,
      info: buttonInfo,
      sclick: sclick || 'None',
      dclick: dclick || 'None',
      lpress: lpress || 'None',
      onoff,
      ptype
    };

    fetch('/api/button/set', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedButton)
    })
      .then((response) => response.json())
      .then((data) => {
        onButtonChange(updatedButton);
        hideModal();
      })
      .catch((error) => {
        console.error('Error:', error);
        setSubmitError('Failed to save changes. Please try again.');
      });
  };

  const handleResetPin = () => {
    setPtype(0);
    setSclick('');
    setDclick('');
    setLpress('');
    setButtonInfo('');
    setOnOff(0);
    setErrors({ sclick: null, dclick: null, lpress: null });
  };

  const renderConnectionModal = () => html`
    <form onSubmit=${handleSubmit}>
      <div class="modal-body">
        <table class="table-auto w-full">
          <tbody>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">ID</td>
              <td class="p-2">${selectedButton.id}</td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">Pin</td>
              <td class="p-2">${selectedButton.pins}</td>
            </tr>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">Connection</td>
              <td class="p-2">
                <select
                  name="setrpins"
                  value=${pinOptions.some(opt => opt.pins === selectedButton?.setrpins) ? selectedButton?.setrpins : ''}
                  onChange=${(e) =>
      onButtonChange({
        ...selectedButton,
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
              <td class="p-2">${selectedButton.id}</td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">Pin</td>
              <td class="p-2">${selectedButton.pins}</td>
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
                  <option value="0">None</option>
                  <option value="1">GPIO_PULLUP</option>
                  <option value="2">GPIO_PULLDOWN</option>
                </select>
              </td>
            </tr>
            ${['sclick', 'dclick', 'lpress'].map(
    (type) => html`
                <tr class=${type === 'dclick' ? 'bg-gray-200' : 'bg-white'}>
                  <td class="p-2 font-bold">
                    ${type === 'sclick'
        ? 'Single Click'
        : type === 'dclick'
          ? 'Double Click'
          : 'Long Press'}
                  </td>
                  <td class="p-2">
                    <input
                      type="text"
                      name=${type}
                      value=${eval(type)}
                      onInput=${(e) => handleInputChange(type, e.target.value)}
                      class="border rounded p-2 w-full ${errors[type]
        ? 'border-red-500'
        : ''}"
                      placeholder="None"
                    />
                    ${errors[type] &&
      html`<p class="text-red-500 text-sm">${errors[type]}</p>`}
                  </td>
                </tr>
              `
  )}
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">INFO</td>
              <td class="p-2">
                <input
                  type="text"
                  name="info"
                  value=${buttonInfo}
                  onInput=${(e) => setButtonInfo(e.target.value)}
                  class="border rounded p-2 w-full"
                />
              </td>
            </tr>
            <tr class="bg-white">
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
      class="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick=${(e) => closeOnOverlayClick && e.target === e.currentTarget && hideModal()}
    >
      <div
        class="bg-white rounded-lg p-6 max-w-2xl w-full relative"
        style="max-height: 90vh; overflow-y: auto;"
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
        ${page === 'TabButton' && modalType === 'connection'
      ? renderConnectionModal()
      : renderEditModal()}
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

export { ModalButton };