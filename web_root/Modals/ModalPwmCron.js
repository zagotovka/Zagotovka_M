import { h, render, useState, useEffect, useRef, html } from '../bundle.js';
import { MyPolzunok } from '../main.js';

function ModalPwmCron({
    modalType,
    page,
    hideModal,
    closeOnOverlayClick = true,
    title,
    selectedCron,
    handleCronChange,
    modalClass,
    SliderComponent = MyPolzunok
}) {
    // Parsing existing PWM activ if present. Format: "pwm:<id>,<duration_sec>,<start_duty>,<end_duty>"
    let initialPwmId = '';
    let initialDuration = '900';
    let initialStartDuty = '0';
    let initialEndDuty = '100';

    if (selectedCron?.activ && selectedCron.activ.startsWith('pwm:')) {
        const parts = selectedCron.activ.substring(4).split(',');
        if (parts.length === 4) {
            initialPwmId = parts[0];
            initialDuration = parts[1];
            initialStartDuty = parts[2];
            initialEndDuty = parts[3];
        }
    }

    const [cronInfo, setCronInfo] = useState(selectedCron?.info || '');
    const [onoff, setOnOff] = useState(selectedCron?.onoff === 1);
    const [cronExpression, setCronExpression] = useState(selectedCron?.cron || '');

    const [pwmId, setPwmId] = useState(initialPwmId);
    const [duration, setDuration] = useState(initialDuration);
    const [startDuty, setStartDuty] = useState(initialStartDuty);
    const [endDuty, setEndDuty] = useState(initialEndDuty);

    const [pwmOptions, setPwmOptions] = useState([]);

    useEffect(() => {
        fetch('/api/select/get', { method: 'GET', cache: 'no-store' })
            .then(res => res.json())
            .then(res => {
                if (res && res.data && Array.isArray(res.data)) {
                    const pwms = res.data.filter(pin => pin.topin === 5);
                    setPwmOptions(pwms);
                    if (!pwmId && pwms.length > 0) {
                        setPwmId(pwms[0].id.toString());
                    }
                }
            })
            .catch(err => console.error("Error fetching pin config:", err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const jsonData = Object.fromEntries(formData);

        jsonData.id = selectedCron.id;
        jsonData.pins = selectedCron.pins;

        jsonData.onoff = onoff ? 1 : 0;
        jsonData.info = cronInfo;
        jsonData.cron = cronExpression;
        jsonData.activ = `pwm:${pwmId},${duration},${startDuty},${endDuty}`;

        fetch('/api/cron/set', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData)
        })
            .then((response) => response.json())
            .then((data) => {
                handleCronChange({ ...selectedCron, ...jsonData });
                hideModal();
                window.location.href = '/#/cron';
            })
            .catch((error) => console.error('Error:', error));
    };

    const renderModalContent = () => {
        return html`
      <form onsubmit=${handleSubmit}>
        <div class="modal-body">
          <table class="table-auto w-full">
            <tbody>
              <tr class="bg-gray-200">
                <td class="p-2 font-bold">ID</td>
                <td class="p-2">${selectedCron.id}</td>
              </tr>
              <tr class="bg-white">
                <td class="p-2 font-bold">PWM Pin</td>
                <td class="p-2">
                  <select
                    value=${pwmId}
                    onChange=${(e) => setPwmId(e.target.value)}
                    class="border rounded p-2 w-full"
                    required
                  >
                    ${pwmOptions.map(opt => html`<option value=${opt.id}>${opt.pins}</option>`)}
                  </select>
                </td>
              </tr>
              <tr class="bg-gray-200">
                <td class="p-2 font-bold">Cron Pattern</td>
                <td class="p-2">
                  <input
                    type="text"
                    value=${cronExpression}
                    onInput=${(e) => setCronExpression(e.target.value)}
                    class="border rounded p-2 w-full"
                    placeholder="* * * * * * *"
                    required
                  />
                </td>
              </tr>
              <tr class="bg-white">
                <td class="p-2 font-bold">Duration (Sec)</td>
                <td class="p-2">
                  <input
                    type="number"
                    min="1"
                    max="864000"
                    value=${duration}
                    onInput=${(e) => setDuration(e.target.value)}
                    class="border rounded p-2 w-full"
                    required
                  />
                </td>
              </tr>
              <tr class="bg-gray-200">
                <td class="p-2 font-bold">Start Duty (0-100)</td>
                <td class="p-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value=${startDuty}
                    onInput=${(e) => setStartDuty(e.target.value)}
                    class="border rounded p-2 w-full"
                    required
                  />
                </td>
              </tr>
              <tr class="bg-white">
                <td class="p-2 font-bold">End Duty (0-100)</td>
                <td class="p-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value=${endDuty}
                    onInput=${(e) => setEndDuty(e.target.value)}
                    class="border rounded p-2 w-full"
                    required
                  />
                </td>
              </tr>
              <tr class="bg-gray-200">
                <td class="p-2 font-bold">INFO</td>
                <td class="p-2">
                  <input
                    type="text"
                    value=${cronInfo}
                    onInput=${(e) => setCronInfo(e.target.value)}
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
        <div class="modal-footer flex justify-end mt-4">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Save PWM Cron
          </button>
        </div>
      </form>
    `;
    };

    const modalContent = html`
    <div class=${`modal ${modalClass || ''}`}>
      <div class="modal-content">
        <div
          class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
          onclick=${(e) => closeOnOverlayClick && e.target === e.currentTarget && hideModal()}
        >
          <div
            class="modal-content bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg relative"
            style="margin-top: 0px;"
          >
            <div class="modal-header flex justify-between items-center border-b pb-4 mb-4">
              <h5 class="text-xl font-bold">Edit PWM Timer</h5>
              <button class="close-button text-gray-500 hover:text-gray-700" onclick=${hideModal}>
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
        portalEl.id = 'pwm-modal-portal';
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

export { ModalPwmCron };
