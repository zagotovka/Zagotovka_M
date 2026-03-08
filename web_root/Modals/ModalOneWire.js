import { h, render, useState, useEffect, useRef, html, Router } from '../bundle.js';
import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';
import { MyPolzunok, Chart, DeveloperNote } from '../main.js';
import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire } from '../rulang.js';
import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire } from '../enlang.js';

function ModalOneWire({
  oneWire,
  onClose,
  onUpdate,
  refresh,
  closeOnOverlayClick = true
}) {
  console.log('oneWire object:', oneWire);

  const [formData, setFormData] = useState({
    typsensor: oneWire.typsensor,
    numdevices: oneWire.numdevices
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [onoff, setOnOff] = useState(oneWire.onoff || 0);

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: parseInt(value, 10) };

    if (name === 'typsensor') {
      if (value === '0') {
        newFormData.numdevices = 0;
      } else if (value === '2') {
        newFormData.numdevices = 1;
      }
    }

    setFormData(newFormData);
  };

  const handleOnOffChange = (value) => {
    setOnOff(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataToSend = {
      id: oneWire.id,
      pin: oneWire.pin,
      typsensor: formData.typsensor,
      numdevices: formData.numdevices,
      onoff: onoff
    };

    console.log('Sending data:', dataToSend);

    try {
      const response = await fetch('api/onewire/set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const updatedOneWire = { ...oneWire, ...formData, onoff };
      onUpdate(updatedOneWire);
      onClose();
    } catch (error) {
      console.error('Error updating OneWire:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalContent = html`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center p-4"
      onclick=${handleOverlayClick}
    >
      <div
        class="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative"
        style="max-height: 90vh; overflow-y: auto;"
      >
        <div class="modal-header flex justify-between items-center border-b pb-4 mb-4">
          <h5 class="text-xl font-bold">Edit OneWire pin</h5>
          <button
            class="close-button text-gray-500 hover:text-gray-700"
            onclick=${onClose}
            disabled=${isSubmitting}
          >
            Close
          </button>
        </div>
        <form onsubmit=${handleSubmit}>
          <div class="modal-body">
            <table class="table-auto w-full">
              <tbody>
                <tr class="bg-white">
                  <td class="p-2 font-bold">ID</td>
                  <td class="p-2">
                    <input
                      type="number"
                      value=${oneWire.id}
                      class="border rounded p-2 w-full bg-gray-100"
                      readonly
                      disabled
                    />
                  </td>
                </tr>
                <tr class="bg-gray-200">
                  <td class="p-2 font-bold">Pin</td>
                  <td class="p-2">
                    <input
                      type="text"
                      value=${oneWire.pin}
                      class="border rounded p-2 w-full bg-gray-100"
                      readonly
                      disabled
                    />
                  </td>
                </tr>
                <tr class="bg-white">
                  <td class="p-2 font-bold">Selected sensor</td>
                  <td class="p-2">
                    <select
                      name="typsensor"
                      value=${formData.typsensor}
                      onchange=${handleChange}
                      class="border rounded p-2 w-full"
                      disabled=${isSubmitting}
                    >
                      <option value="0">None</option>
                      <option value="1">DS18B20</option>
                      <option value="2">DHT22</option>
                    </select>
                  </td>
                </tr>
                <tr class="bg-gray-200">
                  <td class="p-2 font-bold">Count of sensors</td>
                  <td class="p-2">
                    <input
                      type="number"
                      name="numdevices"
                      value=${formData.numdevices}
                      oninput=${formData.typsensor === 1 ? handleChange : undefined}
                      class="border rounded p-2 w-full ${formData.typsensor !== 1 ? 'bg-gray-100' : ''}"
                      min="0"
                      max="10"
                      readonly=${formData.typsensor !== 1}
                      disabled=${isSubmitting}
                    />
                  </td>
                </tr>
                <tr class="bg-white">
                  <td class="p-2 font-bold">On/Off</td>
                  <td class="p-2">
                    <${MyPolzunok}
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
              disabled=${isSubmitting}
            >
              ${isSubmitting ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  const portalRef = useRef(null);

  useEffect(() => {
    const portalEl = document.createElement('div');
    portalEl.id = 'modal-portal-onewire';
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

export { ModalOneWire };