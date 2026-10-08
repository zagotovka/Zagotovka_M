import { h, render, useState, useEffect, useRef, html, Router } from '../bundle.js';
import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';
import { MyPolzunok, Chart, DeveloperNote } from '../main.js';
import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire } from '../rulang.js';
import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire } from '../enlang.js';

// Прячет только цифры за '*', остальные символы (например ведущий '+')
// остаются как есть — это даёт "звёздочек ровно по числу цифр".
const maskPhone = (phone) => (phone || '').replace(/\d/g, '*');

// Простые Heroicons-style SVG, без внешних зависимостей.
const EyeIcon = ({ class: cls }) => html`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="1.5" class=${cls}>
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
`;

const EyeSlashIcon = ({ class: cls }) => html`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="1.5" class=${cls}>
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
`;

// Локализация модалки. modal раньше был захардкожен по-английски —
// теперь берёт язык из пропа `language`, который передаёт родитель (TabSecurity).
const i18nModal = {
  ru: {
    rxd: 'RXD',
    txd: 'TXD',
    mobilePhone: 'Мобильный телефон',
    phoneHint: 'Это ВАШ номер телефона. Звонки/SMS на модуль SIM800L принимаются только с него — это НЕ номер SIM-карты, установленной в самом модуле.',
    phoneError: 'Введите корректный номер телефона: начинается с "+" и содержит 11-20 цифр',
    phonePlaceholder: '+XXXXXXXXXXX',
    showNumber: 'Показать номер',
    hideNumber: 'Скрыть номер',
    info: 'ИНФО',
    onOff: 'Вкл/Выкл',
    close: 'Закрыть',
    saveChanges: 'Сохранить'
  },
  en: {
    rxd: 'RXD',
    txd: 'TXD',
    mobilePhone: 'Mobile phone',
    phoneHint: 'This is YOUR phone number. Calls/SMS to the SIM800L module are accepted only from it — it is NOT the number of the SIM card installed inside the module.',
    phoneError: 'Please enter a valid phone number starting with + and containing 11-20 digits',
    phonePlaceholder: '+XXXXXXXXXXX',
    showNumber: 'Show number',
    hideNumber: 'Hide number',
    info: 'INFO',
    onOff: 'On/Off',
    close: 'Close',
    saveChanges: 'Save changes'
  }
};

function ModalSIM800L({ hideModal, title, selectedGps, onSave, language = 'en' }) {
  const M = i18nModal[language] || i18nModal.en;

  const [tel, setTel] = useState(selectedGps?.tel || '');
  const [info, setInfo] = useState(selectedGps?.info || '');
  const [onoff, setOnoff] = useState(selectedGps?.onoff === 1);
  const [isValidPhone, setIsValidPhone] = useState(true);

  // Показывать номер открыто: либо явно нажали "глаз", либо поле сейчас в фокусе (редактируем).
  const [revealPhone, setRevealPhone] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const showPlain = revealPhone || phoneFocused;

  const validatePhoneNumber = (phone) => {
    // Пустое поле — валидно: значит модуль SIM800L просто не используется,
    // и номер можно удалить/оставить незаполненным.
    if (phone === '') return true;
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
      type: 'sim800l',
      tel: tel,
      info: info,
      onoff: onoff ? 1 : 0
    };

    console.log('Сохраняемые данные:', jsonData);

    fetch('/api/security/set', {
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
      <div class="flex items-center justify-center min-h-full p-2 sm:p-4">
        <div
          class="bg-white rounded-lg p-4 sm:p-6 max-w-2xl w-full mx-0 sm:mx-4 relative"
          style="max-height: calc(100vh - 57px); max-height: calc(100dvh - 57px); overflow-y: auto;"
        >
          <div class="modal-header flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">${title}</h2>
            <button
              onClick=${hideModal}
              class="close-button text-gray-500 hover:text-gray-700"
            >
              ${M.close}
            </button>
          </div>

          <form onSubmit=${handleSubmit}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">${M.rxd}</td>
                    <td class="p-2">PA3(1)</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">${M.txd}</td>
                    <td class="p-2">PD5(35)</td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">${M.mobilePhone}</td>
                    <td class="p-2">
                      <div class="relative">
                        <input
                          type="text"
                          value=${showPlain ? tel : maskPhone(tel)}
                          onInput=${handlePhoneChange}
                          onFocus=${() => setPhoneFocused(true)}
                          onBlur=${() => setPhoneFocused(false)}
                          class=${`border rounded p-2 pr-10 w-full ${!isValidPhone && tel !== '' ? 'border-red-500' : ''
    }`}
                          placeholder=${M.phonePlaceholder}
                          autocomplete="off"
                        />
                        <button
                          type="button"
                          onClick=${() => setRevealPhone((v) => !v)}
                          class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          title=${revealPhone ? M.hideNumber : M.showNumber}
                        >
                          ${revealPhone
      ? html`<${EyeSlashIcon} class="w-5 h-5" />`
      : html`<${EyeIcon} class="w-5 h-5" />`}
                        </button>
                      </div>
                      <div class="text-xs text-gray-500 mt-1">
                        ${M.phoneHint}
                      </div>
                      ${!isValidPhone && tel !== ''
      ? html`
                            <div class="text-red-500 text-sm mt-1">
                              ${M.phoneError}
                            </div>
                          `
      : ''}
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">${M.info}</td>
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
                    <td class="p-2 font-bold">${M.onOff}</td>
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
                disabled=${!isValidPhone}
                class=${`font-bold py-2 px-4 rounded ${isValidPhone
      ? 'bg-blue-500 hover:bg-blue-700 text-white'
      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
    }`}
              >
                ${M.saveChanges}
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

export { ModalSIM800L, maskPhone, EyeIcon, EyeSlashIcon };
