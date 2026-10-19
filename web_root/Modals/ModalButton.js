

import { h, render, useState, useEffect, useRef, html, Router } from '../bundle.js';
import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';
import { MyPolzunok, Chart, DeveloperNote } from '../main.js';
import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire } from '../rulang.js';
import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire } from '../enlang.js';
import { validateActionStr, condHint, hasDisabledCond, DISABLED_COND_WARN } from '../condlib.js';

const ModalButton = ({
  modalType,
  page,
  hideModal,
  closeOnOverlayClick = true,
  title,
  selectedButton,
  onSubmit,
  onButtonChange,
  SliderComponent = MyPolzunok
}) => {
  const [buttonInfo, setButtonInfo] = useState(selectedButton?.info || '');
  const [onoff, setOnOff] = useState(selectedButton?.onoff || 0);
  const [ptype, setPtype] = useState(selectedButton?.ptype || 0);
  const [sclick, setSclick] = useState(selectedButton?.sclick || selectedButton?.action || '');
  const [dclick, setDclick] = useState(selectedButton?.dclick || '');
  const [lpress, setLpress] = useState(selectedButton?.lpress || '');
  const [errors, setErrors] = useState({
    sclick: null,
    dclick: null,
    lpress: null
  });
  const [submitError, setSubmitError] = useState(null);
  const [saving, setSaving] = useState(false);
  const mounted = useRef(true);
  const savingRef = useRef(false);   // защита от двойного клика: state обновляется только после перерисовки

  const isRu = (selectedButton?.lang || 'ru') === 'ru';

  // info на контроллере - char[30], то есть до 29 байт UTF-8 (кириллица занимает 2 байта на букву).
  // Более длинное значение сервер молча обрезает, поэтому проверяем до отправки.
  const INFO_MAX_BYTES = 29;
  const infoBytes = new TextEncoder().encode(buttonInfo).length;

  const validateInput = (value) => {
    return validateActionStr(value);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (savingRef.current) return;

    // ── Edit (без изменений) ──
    if (Object.values(errors).some((error) => error !== null)) {
      setSubmitError('Please correct the errors before submitting.');
      return;
    }
    if (infoBytes > INFO_MAX_BYTES) {
      setSubmitError(isRu
        ? `INFO слишком длинный: ${infoBytes} из ${INFO_MAX_BYTES} байт (кириллица занимает 2 байта на букву).`
        : `INFO is too long: ${infoBytes} of ${INFO_MAX_BYTES} bytes.`);
      return;
    }

    const updatedButton = {
      ...selectedButton,
      info: buttonInfo,
      onoff,
      ptype,
      sclick: sclick || 'None',
      dclick: dclick || 'None',
      lpress: lpress || 'None'
    };

    // В POST уходят только поля, которые читает контроллер (handle_button_set).
    const payload = {
      id: updatedButton.id,
      info: updatedButton.info,
      onoff: updatedButton.onoff,
      ptype: updatedButton.ptype,
      sclick: updatedButton.sclick,
      dclick: updatedButton.dclick,
      lpress: updatedButton.lpress
    };

    setSubmitError(null);
    savingRef.current = true;
    setSaving(true);
    try {
      // onSubmit ставит опрос на паузу, не пересекает запрос с перезагрузкой таблицы
      // и бросает ошибку с текстом сервера при ответе 400/507.
      await onSubmit(payload);
    } catch (error) {
      console.error('Error:', error);
      savingRef.current = false;
      if (mounted.current) {
        setSaving(false);
        setSubmitError(
          (error && error.message)
            ? 'Failed to save changes: ' + error.message
            : 'Failed to save changes. Please try again.'
        );
      }
      return;
    }
    onButtonChange(updatedButton);
    hideModal();
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

  const renderEditModal = () => {
    const isZigbee = selectedButton.is_zigbee;
    const displayId = selectedButton.display_id || selectedButton.id;

    return html`
    <form onSubmit=${handleSubmit}>
      <div class="modal-body">
        <table class="table-auto w-full">
          <tbody>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">ID</td>
              <td class="p-2">${displayId}</td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">Pin</td>
              <td class="p-2">${isZigbee ? 'Z2M' : selectedButton.pins}</td>
            </tr>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">Ptype</td>
              <td class="p-2">
                <select
                  name="ptype"
                  value=${isZigbee ? 0 : ptype}
                  onChange=${(e) => setPtype(parseInt(e.target.value))}
                  class="border rounded p-2 w-full ${isZigbee ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}"
                  disabled=${isZigbee}
                >
                  <option value="0">None</option>
                  ${!isZigbee && html`
                    <option value="1">GPIO_PULLUP</option>
                    <option value="2">GPIO_PULLDOWN</option>
                  `}
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
                      placeholder="None, 6:1, 93.1:2, 6:1?D2"
                      maxLength="124"
                    />
                    ${errors[type] &&
      html`<p class="text-red-500 text-sm">${errors[type]}</p>`}
                    <p class="text-gray-500 text-xs mt-1 text-right">${124 - (eval(type) || '').length}/124</p>
                    ${hasDisabledCond(eval(type)) &&
      html`<p class="text-amber-600 text-xs mt-1 font-medium">${DISABLED_COND_WARN[(selectedButton?.lang || 'ru') === 'ru' ? 'ru' : 'en']}</p>`}
                    ${type === 'sclick' &&
      html`<p class="text-gray-500 text-xs mt-1">${condHint(isRu)}</p>`}
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
                  class="border rounded p-2 w-full ${infoBytes > INFO_MAX_BYTES ? 'border-red-500' : ''}"
                />
                <p class="${infoBytes > INFO_MAX_BYTES ? 'text-red-500' : 'text-gray-500'} text-xs mt-1 text-right">${infoBytes}/${INFO_MAX_BYTES} bytes</p>
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
          disabled=${saving}
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${saving ? 'opacity-60 cursor-not-allowed' : ''}"
        >
          ${saving ? 'Saving...' : 'Save changes'}
        </button>
      </div>
      ${submitError && html`<p class="text-red-500 mt-2">${submitError}</p>`}
    </form>
  `;
  };

  const modalContent = html`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick=${(e) => closeOnOverlayClick && e.target === e.currentTarget && hideModal()}
    >
      <div
        class="bg-white rounded-lg p-4 sm:p-6 max-w-2xl w-full relative"
        style="max-height: 90vh; max-height: 90dvh; overflow-y: auto;"
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
        ${renderEditModal()}
      </div>
    </div>
  `;

  const portalRef = useRef(null);

  useEffect(() => {
    mounted.current = true;
    const portalEl = document.createElement('div');
    portalEl.id = 'modal-portal';
    document.body.appendChild(portalEl);
    portalRef.current = portalEl;
    return () => {
      mounted.current = false;
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
