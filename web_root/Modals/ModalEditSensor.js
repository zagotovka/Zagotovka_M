import { h, render, useState, useEffect, useRef, html, Router } from '../bundle.js';
import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';
import { MyPolzunok, Chart, DeveloperNote } from '../main.js';
import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire } from '../rulang.js';
import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire } from '../enlang.js';

function ModalEditSensor({
  typsensor,
  oneWireId,
  pins,
  onClose,
  onUpdate,
  sensorType,
  sensorData,
  closeOnOverlayClick = true
}) {
  const [formData, setFormData] = useState({
    ut: sensorData?.ut || typsensor.ut,
    lt: sensorData?.lt || typsensor.lt,
    action_ut: sensorData?.action_ut || typsensor.action_ut,
    action_lt: sensorData?.action_lt || typsensor.action_lt,
    upphumid: sensorData?.upphumid || typsensor.upphumid || 0,
    humlolim: sensorData?.humlolim || typsensor.humlolim || 0,
    actuphum: sensorData?.actuphum || typsensor.actuphum || '',
    actlowhum: sensorData?.actlowhum || typsensor.actlowhum || '',
    info: sensorData?.info || typsensor.info,
    onoff: sensorData?.onoff || typsensor.onoff || 0,
    humidity: sensorData?.humidity || typsensor.humidity || 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateNumericInput = (value, min, max) => {
    if (value === '' || value === '-') return value;
    const normalizedValue = value.replace(',', '.');
    if (!/^-?\d*\.?\d*$/.test(normalizedValue)) return null;
    const numValue = parseFloat(normalizedValue);
    if (isNaN(numValue)) return null;
    if (numValue < min || numValue > max) return null;
    return normalizedValue;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['ut', 'lt'].includes(name)) {
      const validValue = validateNumericInput(value, -55, 125);
      if (validValue !== null) {
        setFormData(prev => ({ ...prev, [name]: validValue }));
      }
    } else if (['upphumid', 'humlolim'].includes(name)) {
      const validValue = validateNumericInput(value, 0, 100);
      if (validValue !== null) {
        setFormData(prev => ({ ...prev, [name]: validValue }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const parseNumericValues = (data) => {
    const numericFields = ['ut', 'lt', 'upphumid', 'humlolim'];
    const parsedData = { ...data };
    numericFields.forEach(field => {
      if (parsedData[field] === '' || parsedData[field] === '-') {
        parsedData[field] = 0;
      } else {
        parsedData[field] = parseFloat(parsedData[field].toString().replace(',', '.'));
      }
    });
    return parsedData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const parsedFormData = parseNumericValues(formData);
    try {
      const response = await fetch('/api/sensor/set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: oneWireId,
          pins: pins,
          sensorNumber: typsensor.s_number,
          ...parsedFormData,
          s_number: typsensor.s_number,
          t: typsensor.t
        })
      });
      if (!response.ok) throw new Error('Network response was not ok');
      onUpdate({
        ...typsensor,
        ...parsedFormData,
        oneWireId,
        pins,
        s_number: typsensor.s_number,
        t: typsensor.t
      });
      onClose();
    } catch (error) {
      console.error('Error updating Sensor:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
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
          <h5 class="text-xl font-bold">Edit Sensor</h5>
          <button
            class="close-button text-gray-500 hover:text-gray-700"
            onclick=${onClose}
          >
            Close
          </button>
        </div>
        <form onsubmit=${handleSubmit}>
          <div class="modal-body">
            <table class="table-auto w-full">
              <tbody>
                <tr class="bg-blue-100">
                  <td class="p-2 font-bold">Upper Temperature</td>
                  <td class="p-2">
                    <input
                      type="text"
                      name="ut"
                      value=${formData.ut}
                      oninput=${handleChange}
                      class="border rounded p-2 w-full"
                      placeholder="-55 to 125"
                    />
                  </td>
                </tr>
                <tr class="bg-white">
                  <td class="p-2 font-bold">Lower Temperature</td>
                  <td class="p-2">
                    <input
                      type="text"
                      name="lt"
                      value=${formData.lt}
                      oninput=${handleChange}
                      class="border rounded p-2 w-full"
                      placeholder="-55 to 125"
                    />
                  </td>
                </tr>
                <tr class="bg-blue-100">
                  <td class="p-2 font-bold">Action for Upper Temperature</td>
                  <td class="p-2">
                    <input
                      type="text"
                      name="action_ut"
                      value=${formData.action_ut}
                      oninput=${handleChange}
                      class="border rounded p-2 w-full"
                      maxlength="100"
                    />
                  </td>
                </tr>
                <tr class="bg-white">
                  <td class="p-2 font-bold">Action for Lower Temperature</td>
                  <td class="p-2">
                    <input
                      type="text"
                      name="action_lt"
                      value=${formData.action_lt}
                      oninput=${handleChange}
                      class="border rounded p-2 w-full"
                      maxlength="100"
                    />
                  </td>
                </tr>
                ${sensorType === 2
      ? html`
                      <tr class="bg-blue-100">
                        <td class="p-2 font-bold">Humidity upper limit</td>
                        <td class="p-2">
                          <input
                            type="text"
                            name="upphumid"
                            value=${formData.upphumid}
                            oninput=${handleChange}
                            class="border rounded p-2 w-full"
                            placeholder="0 to 100"
                          />
                        </td>
                      </tr>
                      <tr class="bg-white">
                        <td class="p-2 font-bold">Humidity lower limit</td>
                        <td class="p-2">
                          <input
                            type="text"
                            name="humlolim"
                            value=${formData.humlolim}
                            oninput=${handleChange}
                            class="border rounded p-2 w-full"
                            placeholder="0 to 100"
                          />
                        </td>
                      </tr>
                      <tr class="bg-blue-100">
                        <td class="p-2 font-bold">Action for upper H</td>
                        <td class="p-2">
                          <input
                            type="text"
                            name="actuphum"
                            value=${formData.actuphum}
                            oninput=${handleChange}
                            class="border rounded p-2 w-full"
                            maxlength="100"
                          />
                        </td>
                      </tr>
                      <tr class="bg-white">
                        <td class="p-2 font-bold">Action for lower H</td>
                        <td class="p-2">
                          <input
                            type="text"
                            name="actlowhum"
                            value=${formData.actlowhum}
                            oninput=${handleChange}
                            class="border rounded p-2 w-full"
                            maxlength="100"
                          />
                        </td>
                      </tr>
                    `
      : ''}
                <tr class="bg-blue-100">
                  <td class="p-2 font-bold">Info</td>
                  <td class="p-2">
                    <input
                      type="text"
                      name="info"
                      value=${formData.info}
                      oninput=${handleChange}
                      class="border rounded p-2 w-full"
                      maxlength="30"
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
      </div>
    </div>
  `;

  const portalRef = useRef(null);

  useEffect(() => {
    const portalEl = document.createElement('div');
    portalEl.id = 'modal-portal-sensor';
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

export { ModalEditSensor };