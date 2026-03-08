import { h, render, useState, useEffect, useRef, html, Router } from '../bundle.js';
import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';
import { MyPolzunok, Chart, DeveloperNote } from '../main.js';
import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire } from '../rulang.js';
import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire } from '../enlang.js';

function ModalCron({
  modalType,
  page,
  hideModal,
  closeOnOverlayClick = true,
  title,
  selectedCron,
  handleCronChange,
  connectionOptions,
  modalClass,
  SliderComponent = MyPolzunok
}) {
  // Инициализация переменных состояния
  const [cronInfo, setCronInfo] = useState(selectedCron?.info || '');
  const [onoff, setOnOff] = useState(selectedCron?.onoff === 1);
  const [activValue, setActivValue] = useState(selectedCron?.activ || '');
  const [cronExpression, setCronExpression] = useState(
    selectedCron?.cron || ''
  );
  const [selectedConnection, setSelectedConnection] = useState(
    selectedCron.setrpins || ''
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const jsonData = Object.fromEntries(formData);

    // Добавляем дополнительные поля, которые не входят в форму
    jsonData.id = selectedCron.id;
    jsonData.pins = selectedCron.pins;

    if (modalType === 'edit') {
      jsonData.onoff = onoff ? 1 : 0;
      jsonData.info = cronInfo;
      jsonData.cron = cronExpression;
      jsonData.activ = activValue;
    } else if (modalType === 'connection') {
      jsonData.setrpins = selectedConnection;
    }

    // Перед отправкой проверим...
    console.log('Data being sent to server:');
    console.log(jsonData);
    console.log('Stringified data:');
    console.log(JSON.stringify(jsonData));

    fetch('/api/cron/set', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        // Обновляем состояние переключателя
        handleCronChange({
          ...selectedCron,
          ...jsonData
        });
        // Закрываем модальное окно
        hideModal();
        // Перенаправляем пользователя
        window.location.href = '/#/cron';
      })
      .catch((error) => {
        console.error('Error:', error);
        // Можно добавить обработку ошибок, например, показать сообщение пользователю
      });
  };

  // Добавляем useEffect для обновления состояния при изменении selectedSwitch
  useEffect(() => {
    setCronInfo(selectedCron?.info || '');
    setSelectedConnection(selectedCron?.setrpins || '');
    setOnOff(selectedCron?.onoff === 1);
  }, [selectedCron]);

  // Обработчики изменений
  const handleCronExpressionChange = (e) => {
    setCronExpression(e.target.value);
  };

  const handleCronInfoChange = (e) => {
    setCronInfo(e.target.value);
  };

  const handleOnOffChange = (newValue) => {
    setOnOff(newValue);
  };

  const handleActivChange = (e) => {
    setActivValue(e.target.value);
  };

  const renderModalContent = () => {
    if (page === 'TabCron') {
      if (modalType === 'edit') {
        return html`
          <form onsubmit=${handleSubmit}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  ${[
            { label: 'ID', value: selectedCron.id },
            {
              label: 'Cron',
              value: html`
                        <input
                          type="text"
                          value=${cronExpression}
                          onInput=${handleCronExpressionChange}
                          class="border rounded p-2 w-full"
                        />
                      `
            },
            {
              label: 'Script',
              value: html`
                        <input
                          type="text"
                          value=${activValue}
                          onInput=${handleActivChange}
                          class="border rounded p-2 w-full"
                        />
                      `
            },
            {
              label: 'INFO',
              value: html`
                        <input
                          type="text"
                          value=${cronInfo}
                          onInput=${handleCronInfoChange}
                          class="border rounded p-2 w-full"
                        />
                      `
            },
            {
              label: 'On/Off',
              value: html`<${SliderComponent}
                        value=${onoff}
                        onChange=${handleOnOffChange}
                      />`
            }
          ].map(
            (row, index) => html`
                      <tr
                        class="${index % 2 === 1 ? 'bg-white' : 'bg-gray-200'}"
                      >
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
    }
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
              <h5 class="text-xl font-bold">
                ${modalType === 'edit' ? 'Edit Timer' : 'Edit Connection'}
              </h5>
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

export { ModalCron };
