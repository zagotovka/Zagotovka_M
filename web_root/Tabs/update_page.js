import { h, useState, useEffect, useRef, html } from '../bundle.js';
import { pauseAll, resumeAll } from '../pollQueue.js';
import { Icons, Button } from '../components.js';

const FIRMWARE_UPLOAD_CHUNK_SIZE = 4096; // байт на POST; лимит тела запроса для /api/firmware/upload на устройстве не действует

export function FirmwareUpdate({ }) {
  const [info, setInfo] = useState([{}, {}]);
  const [language, setLanguage] = useState('ru');
  const [alert, setAlert] = useState(null);
  const [progress, setProgress] = useState(null); // null = нет активной загрузки, 0..100 = процент
  const [uploading, setUploading] = useState(false); // блокирует повторный/параллельный запуск onupload
  const uploadingRef = useRef(false);

  const refresh = () =>
    fetch('api/firmware/status')
      .then((r) => r.json())
      .then((r) => setInfo(r));

  // /api/firmware/status не содержит поле lang, поэтому язык берём
  // из общего источника настроек устройства (как на странице Settings),
  // по аналогии с тем, как это сделано на странице Zigbee Devices.
  const refreshLang = () =>
    fetch('api/mysett/get', { cache: 'no-store' })
      .then((r) => r.json())
      .then((r) => setLanguage(r.lang || 'ru'))
      .catch(() => { });

  useEffect(() => {
    refresh();
    refreshLang();
  }, []);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const statusText = (s) => {
    const map = {
      0: language === 'ru' ? 'Нет данных о версии (прошито не через OTA)' : 'No OTA data (flashed directly, not via OTA)',
      1: language === 'ru' ? 'Первая загрузка' : 'First boot',
      2: language === 'ru' ? 'Не подтверждено' : 'Uncommitted',
      3: language === 'ru' ? 'Подтверждено' : 'Committed'
    };
    return s != null && map[s] !== undefined ? map[s] : (language === 'ru' ? 'Н/Д' : 'N/A');
  };

  // Кнопка "Подтвердить эту прошивку" вызывает mg_ota_commit() — это защитный
  // механизм двухбанковой OTA-схемы: пока прошивка не подтверждена, при
  // следующей перезагрузке bootloader откатится на предыдущий образ.
  // Подтверждать имеет смысл только в статусах 1 (первая загрузка после OTA)
  // и 2 (не подтверждено); при 0 (нет OTA-данных) и 3 (уже подтверждено)
  // кнопка неактивна, т.к. подтверждать нечего.
  const canCommit = info[0].status === 1 || info[0].status === 2;

  const oncommit = (ev) =>
    fetch('api/firmware/commit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    })
      .then((r) => r.json())
      .then(refresh);

  const onreboot = (ev) =>
    fetch('api/device/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reboot: 1 })
    })
      .then((r) => r.json())
      .then(
        (r) =>
          new Promise((resolve) =>
            setTimeout(() => {
              refresh();
              resolve();
            }, 5000)
          )
      );

  // Перезагрузка спрятана отдельно от Upload и требует подтверждения,
  // чтобы её нельзя было случайно нажать вместо "Upload new firmware".
  const onrebootConfirm = (ev) => {
    const confirmMsg =
      language === 'ru'
        ? 'Перезагрузить устройство сейчас? Все несохранённые данные будут потеряны.'
        : 'Reboot the device now? Any unsaved state will be lost.';
    if (!window.confirm(confirmMsg)) {
      return Promise.resolve();
    }
    return onreboot(ev);
  };

  const onerase = (ev) => fetch('api/device/eraselast').then(refresh);

  const onupload = async function (file) {
    if (uploadingRef.current) {
      // Загрузка уже идёт (двойной клик / повторное срабатывание onChange) —
      // игнорируем, иначе на устройство уйдут два параллельных запроса на
      // offset=0 и второй получит 409 "OTA already in progress".
      return;
    }
    uploadingRef.current = true;

    if (!file) {
      setAlert({
        type: 'yellow',
        message: language === 'ru' ? 'Ошибка: файл не выбран.' : 'Error: No file selected.'
      });
      uploadingRef.current = false;
      return;
    }

    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (fileExtension !== 'bin') {
      // .hex поддерживать нельзя: устройство пишет полученные байты как
      // есть во flash, а Intel HEX — это текстовый формат с адресами и
      // контрольными суммами, а не сырой образ прошивки.
      setAlert({
        type: 'red',
        message:
          language === 'ru'
            ? 'Ошибка: разрешены только файлы .bin!'
            : 'Error: Only .bin files are allowed!'
      });
      uploadingRef.current = false;
      return;
    }

    const total = file.size;
    let offset = 0;
    setProgress(0);
    setUploading(true);
    pauseAll();

    try {
      for (;;) {
        const slice = file.slice(
          offset,
          Math.min(offset + FIRMWARE_UPLOAD_CHUNK_SIZE, total)
        );
        const buf = await slice.arrayBuffer();
        const url =
          'api/firmware/upload?name=' +
          encodeURIComponent(file.name) +
          '&offset=' +
          offset +
          '&total=' +
          total;

        const response = await fetch(url, { method: 'POST', body: buf });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} @offset=${offset}`);
        }

        setProgress(total ? Math.round((offset / total) * 100) : 100);

        if (buf.byteLength === 0) break; // нулевой чанк => mg_ota_end() на устройстве
        offset += buf.byteLength;
      }

      setProgress(100);
      setAlert({
        type: 'green',
        message:
          language === 'ru'
            ? 'Прошивка успешно загружена! Ожидание перезагрузки устройства...'
            : 'Firmware uploaded successfully! Waiting for device to reboot...'
      });

      let retryCount = 0;
      const checkStatus = async () => {
        try {
          const res = await fetch('api/firmware/status');
          if (res.ok) {
            window.location.reload();
            return;
          }
        } catch (e) {
          // Игнорируем ошибки сети во время перезагрузки
        }
        
        retryCount++;
        if (retryCount < 60) {
          setTimeout(checkStatus, 1000);
        } else {
          setAlert({
            type: 'red',
            message: language === 'ru' ? 'Таймаут перезагрузки устройства' : 'Device reboot timeout'
          });
        }
      };
      
      setTimeout(checkStatus, 3000);
    } catch (error) {
      setAlert({
        type: 'yellow',
        message:
          (language === 'ru' ? 'Ошибка загрузки. ' : 'Error: Upload failed. ') + error.message
      });
    } finally {
      uploadingRef.current = false;
      setUploading(false);
      resumeAll();
      setTimeout(() => setProgress(null), 2000);
    }
  };

  const AlertComponent = ({ type, message }) => {
    const bgColor =
      type === 'red'
        ? 'bg-red-100 border-red-500 text-red-700'
        : type === 'yellow'
          ? 'bg-yellow-100 border-yellow-500 text-yellow-700'
          : 'bg-green-100 border-green-500 text-green-700';

    return html`
      <div
        class=${`fixed top-0 left-0 right-0 z-50 border-b-4 p-4 ${bgColor}`}
        role="alert"
      >
        <p class="font-bold text-center">${message}</p>
      </div>
    `;
  };

  const UploadFileButton = ({ title, onupload, disabled }) => {
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      // Сбрасываем value сразу же, независимо от результата: иначе повторный
      // выбор того же файла может не вызвать onChange в некоторых браузерах,
      // а в некоторых, наоборот, приводит к повторному срабатыванию события.
      event.target.value = '';
      if (file && !disabled) {
        onupload(file);
      }
    };

    return html`
      <label
        class=${`w-full flex items-center justify-center gap-2 font-bold text-sm py-3 px-6 rounded-full shadow-md transition-all duration-300 transform ${
          disabled
            ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
            : 'text-white bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:scale-105 active:scale-95 cursor-pointer'
        }`}
      >
        <${Icons.upload} class="w-4" />
        ${title}
        <input
          type="file"
          class="hidden"
          accept=".bin"
          disabled=${disabled}
          onChange=${handleFileChange}
        />
      </label>
    `;
  };

  return html`
    ${alert &&
    html`<${AlertComponent} type=${alert.type} message=${alert.message} />`}

    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col justify-center items-center">
      <!-- декоративные размытые круги — как на Zigbee Devices -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
          ${language === 'ru' ? 'Обновление прошивки' : 'Firmware Update'}
        </div>

        <!-- Полоса прогресса загрузки: над блоками CURRENT FIRMWARE IMAGE и DEVICE UPDATE,
             во всю ширину сетки, толщиной не меньше кнопки Upload. Заливка сделана
             тем же приёмом (подстановка внутри строки style, а не style=${'...'} целиком),
             что и рабочая полоса "Определение диапазона диммера" на странице Zigbee Devices -->
        ${progress !== null &&
        html`
          <div class="w-full mb-6">
            <div class="relative w-full h-12 md:h-14 rounded-full overflow-hidden border border-white/60 shadow-inner bg-slate-200/70">
              <div
                class="absolute top-0 bottom-0 left-0 rounded-full transition-all duration-150"
                style="background: linear-gradient(to right, #4ade80, #22c55e); width: ${progress}%;"
              ></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <span
                  class="text-sm md:text-base font-extrabold text-black"
                  style="text-shadow: 0 0 3px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.7);"
                >
                  ${progress}%
                </span>
              </div>
            </div>
          </div>
        `}

        <!-- Current firmware + Device update -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mb-6">
          <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner p-6 flex flex-col gap-3">
            <div class="text-xs font-bold uppercase tracking-wide text-teal-700/80">
              ${language === 'ru' ? 'Текущий образ прошивки' : 'Current firmware image'}
            </div>
            <div class="text-slate-700 text-sm">
              ${language === 'ru' ? 'Версия' : 'Version'}: ${info[0].version || 'N/A'}
            </div>
            <div class="text-slate-700 text-sm mb-2">
              ${language === 'ru' ? 'Статус' : 'Status'}: ${statusText(info[0].status)}
            </div>
            <button
              onclick=${oncommit}
              disabled=${!canCommit}
              title=${language === 'ru'
                ? 'Подтверждает текущую прошивку, чтобы устройство не откатилось на предыдущую после перезагрузки'
                : 'Confirms the current firmware so the device won\'t roll back to the previous one after reboot'}
              class="w-full inline-flex justify-center items-center gap-2 py-2.5 rounded-full text-sm font-bold text-white shadow-md transition-all duration-300 transform bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
            >
              <${Icons.thumbUp} class="w-4" />
              ${language === 'ru' ? 'Подтвердить эту прошивку' : 'Commit this firmware'}
            </button>
          </div>

          <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner p-6 flex flex-col gap-4">
            <div class="text-xs font-bold uppercase tracking-wide text-teal-700/80">
              ${language === 'ru' ? 'Обновление устройства' : 'Device update'}
            </div>

            <${UploadFileButton}
              title=${language === 'ru' ? 'Загрузить новую прошивку (.bin)' : 'Upload new firmware (.bin)'}
              onupload=${onupload}
              disabled=${uploading}
            />

            <${Button}
              title=${language === 'ru' ? 'Стереть последний сектор' : 'Erase last sector'}
              onclick=${onerase}
              icon=${Icons.doc}
              cls="w-full hidden"
            />
          </div>
        </div>

        <!-- Developer notes -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mb-6">
          <div class="rounded-2xl bg-white/70 backdrop-blur-md border border-white/60 shadow-inner p-6">
            <div class="flex items-center gap-2 mb-3">
              <${Icons.info} class="w-5 h-5 text-green-600" />
              <div class="font-semibold text-slate-700">Developer Note</div>
            </div>
            <div class="text-sm text-slate-600 space-y-2 leading-relaxed">
              <p>
                ${language === 'ru'
      ? 'Zagotovka_M — полностью open-source проект. Используйте его как есть на своём устройстве или сделайте форк и адаптируйте под своё оборудование, датчики и задачи — именно для этого он и создан.'
      : "Zagotovka_M is a fully open-source project. Take it as-is and run it on your device, or fork it and adapt it to your own hardware, sensors and needs — that's exactly what it's here for."}
              </p>
              <p>
                ${language === 'ru'
      ? 'Есть идея, исправление бага или новая функция? Pull request-ы очень приветствуются!'
      : 'Got an idea, a bugfix, or a new feature? Pull requests are very welcome!'}
              </p>
              <a
                class="inline-flex items-center gap-1.5 font-semibold text-cyan-700 hover:text-cyan-800 underline underline-offset-2"
                href="https://github.com/zagotovka/Zagotovka_M"
                target="_blank"
                rel="noopener noreferrer"
              >
                <${Icons.link} class="w-4 h-4" />
                github.com/zagotovka/Zagotovka_M
              </a>
            </div>
          </div>

          <div class="rounded-2xl bg-white/70 backdrop-blur-md border border-white/60 shadow-inner p-6">
            <div class="flex items-center gap-2 mb-3">
              <${Icons.info} class="w-5 h-5 text-green-600" />
              <div class="font-semibold text-slate-700">Developer Note</div>
            </div>
            <div class="text-sm text-slate-600 leading-relaxed">
              <p class="mb-2">
                ${language === 'ru'
      ? 'Как загрузить новый образ прошивки:'
      : 'How to upload a new firmware image:'}
              </p>

              <!-- Предупреждение про HTTP/HTTPS -->
              <div class="mb-3 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-amber-800 font-semibold">
                ⚠️
                ${language === 'ru'
      ? ' Не рекомендуется заливать прошивку в незащищённом режиме HTTP! В целях безопасности мы настоятельно рекомендуем выполнять обновление прошивки только в режиме HTTPS!'
      : ' Uploading firmware over plain HTTP is not recommended! For security reasons we strongly recommend performing the firmware update only in HTTPS mode!'}
              </div>

              <ol class="list-decimal pl-5 space-y-1.5">
                <li>
                  ${language === 'ru'
      ? html`Убедитесь, что файл <code class="bg-slate-100 px-1 rounded">.bin</code> собран именно для этой платы (Zagotovka_M / STM32F767ZI). Загрузка неверного образа автоматически не отслеживается.`
      : html`Make sure the <code class="bg-slate-100 px-1 rounded">.bin</code> file was built for this exact board (Zagotovka_M / STM32F767ZI). Uploading a wrong image will not be caught automatically.`}
                </li>
                <li>
                  ${language === 'ru'
      ? html`Нажмите <b>«Загрузить новую прошивку (.bin)»</b> выше и выберите файл.`
      : html`Click <b>"Upload new firmware (.bin)"</b> above and select the file.`}
                </li>
                <li>
                  ${language === 'ru'
      ? 'Не закрывайте вкладку и не выключайте питание устройства, пока движется полоса загрузки — файл передаётся частями напрямую во flash-память.'
      : 'Keep the tab open and do not power off the device while the progress bar is moving — the file is streamed chunk by chunk directly into flash.'}
                </li>
                <li>
                  ${language === 'ru'
      ? html`Когда появится сообщение <b>«Прошивка успешно загружена»</b>, устройство само переключит образы и перезагрузится.`
      : html`When you see <b>"Firmware uploaded successfully"</b>, the device swaps images and reboots by itself automatically.`}
                </li>
                <li>
                  ${language === 'ru'
      ? 'После перезагрузки откройте эту страницу снова и убедитесь, что новая прошивка работает как ожидается.'
      : 'After it comes back, open this page again and check that the new firmware works as expected.'}
                </li>
                <li>
                  ${language === 'ru'
      ? html`Если всё в порядке, нажмите <b>«Подтвердить эту прошивку»</b>, чтобы подтвердить обновление.`
      : html`If everything is fine, press <b>"Commit this firmware"</b> to confirm the update.`}
                </li>
              </ol>
            </div>
          </div>
        </div>

        <!-- "Reboot" убран из Device Update и спрятан отдельно, -->
        <!-- приглушённая, но заметная кнопка + подтверждение, чтобы не нажать случайно -->
        <div class="w-full flex justify-end">
          <button
            onclick=${onrebootConfirm}
            class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-amber-700 border border-amber-300 bg-amber-50 hover:bg-amber-100 hover:border-amber-400 transition-colors"
            title=${language === 'ru' ? 'Перезагрузить устройство (требуется подтверждение)' : 'Reboot device (requires confirmation)'}
          >
            <${Icons.refresh} class="w-3.5 h-3.5" />
            ${language === 'ru' ? 'Перезагрузить устройство' : 'Reboot device'}
          </button>
        </div>
      </div>
    </div>
  `;
}