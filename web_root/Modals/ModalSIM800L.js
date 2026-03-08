import { h, render, useState, useEffect, useRef, html, Router } from '../bundle.js';
import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';
import { MyPolzunok, Chart, DeveloperNote } from '../main.js';
import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire } from '../rulang.js';
import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire } from '../enlang.js';

function ModalSIM800L({ hideModal, title, selectedGps, onSave }) {
  const [tel, setTel] = useState(selectedGps?.tel || '');
  const [info, setInfo] = useState(selectedGps?.info || '');
  const [onoff, setOnoff] = useState(selectedGps?.onoff === 1);
  const [isValidPhone, setIsValidPhone] = useState(true);

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+\d{11,20}$/;
    return phoneRegex.test(phone);
  };

  const handlePhoneChange = (e) => {
    const newValue = e.target.value;
    setTel(newValue);
    setIsValidPhone(validatePhoneNumber(newValue));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidPhone) return;

    const jsonData = {
      tel: tel,
      info: info,
      onoff: onoff ? 1 : 0
    };

    console.log('Сохраняемые данные:', jsonData);

    fetch('/api/sim800l/set', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
      .then((response) => response.json())
      .then((data) => {
        if (typeof onSave === 'function') {
          onSave(jsonData);
        }
        hideModal();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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

          <form onSubmit=${handleSubmit}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">RXD</td>
                    <td class="p-2">PA3(1)</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">TXD</td>
                    <td class="p-2">PD5(35)</td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">Mobile phone</td>
                    <td class="p-2">
                      <input
                        type="text"
                        value=${tel}
                        onInput=${handlePhoneChange}
                        class=${`border rounded p-2 w-full ${!isValidPhone && tel !== '' ? 'border-red-500' : ''
    }`}
                        placeholder="+XXXXXXXXXXX"
                      />
                      ${!isValidPhone && tel !== ''
      ? html`
                            <div class="text-red-500 text-sm mt-1">
                              Please enter valid phone number starting with +
                              and containing 11-20 digits
                            </div>
                          `
      : ''}
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">INFO</td>
                    <td class="p-2">
                      <input
                        type="text"
                        value=${info}
                        onInput=${(e) => setInfo(e.target.value)}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${MyPolzunok} value=${onoff} onChange=${setOnoff} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer flex justify-end mt-4">
              <button
                type="submit"
                disabled=${!isValidPhone || tel === ''}
                class=${`font-bold py-2 px-4 rounded ${isValidPhone && tel !== ''
      ? 'bg-blue-500 hover:bg-blue-700 text-white'
      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
    }`}
              >
                Save changes
              </button>
            </div>
          </form>
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

export { ModalSIM800L };
