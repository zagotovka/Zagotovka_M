import { ModalEncoder } from '../Modals/ModalEncoder.js';
import { h, render, useState, useEffect, useRef, html, Router } from '../bundle.js';
import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';
import { MyPolzunok, Chart, DeveloperNote } from '../main.js';
import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire } from '../rulang.js';
import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire } from '../enlang.js';

function TabEncoder({ }) {
  {
    const [varencoder, setEncoder] = useState(null);
    const [saveResult, setSaveResult] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedEncoder, setSelectedEncoder] = useState(null);
    const [showHelp, setShowHelp] = useState(false);
    const [language, setLanguage] = useState('ru');
    const [pintopin, setPintopin] = useState([]);
    // Флаг: пока POST /api/onoff/set в полёте — не перезаписываем состояние из поллинга
    const isPendingOnOff = useRef(false);

    const refresh = () =>
      Promise.all([
        fetch('/api/encoder/get').then((r) => r.json()),
        fetch('/api/pintopin/get').then((r) => r.json())
      ])
        .then(([encoderData, pintopinData]) => {
          setLanguage(encoderData.lang);
          setEncoder(encoderData.encoders);
          setPintopin(pintopinData);
          console.log('Encoder data:', encoderData.encoders);
          console.log('Pintopin data:', pintopinData);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });

    const fetchEncoderData = () => {
      fetch('/api/encoder/get')
        .then((r) => r.json())
        .then((data) => {
          // Пропускаем перезапись, если onoff-запрос ещё не завершился
          if (isPendingOnOff.current) {
            console.log('Polling skip: onoff request in flight');
            return;
          }
          setEncoder(data.encoders);
          setLanguage(data.lang);
          console.log('Updated encoder data:', data.encoders);
        })
        .catch((error) => {
          console.error('Error fetching encoder data:', error);
        });
    };

    const fetchPintopinData = () => {
      fetch('/api/pintopin/get')
        .then((r) => r.json())
        .then((data) => {
          setPintopin(data);
          console.log('Updated pintopin data:', data);
        })
        .catch((error) => {
          console.error('Error fetching pintopin data:', error);
        });
    };

    useEffect(() => {
      fetchEncoderData();
      fetchPintopinData();

      const intervalId = setInterval(() => {
        fetchEncoderData();
        fetchPintopinData();
      }, 500);

      return () => clearInterval(intervalId);
    }, []);

    const handleEncoderChange = (updatedEncoder) => {
      setEncoder((prevEncoders) =>
        prevEncoders.map((enc) =>
          enc.id === updatedEncoder.id ? updatedEncoder : enc
        )
      );

      // Блокируем поллинг, чтобы он не перезатёр наше оптимистичное обновление
      isPendingOnOff.current = true;

      // Отправляем обновление на сервер
      fetch('/api/onoff/set', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: updatedEncoder.id, onoff: updatedEncoder.onoff })
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Response from /api/onoff/set (Encoder):', data);
        })
        .catch((error) => {
          console.error('Error calling /api/onoff/set (Encoder):', error);
        })
        .finally(() => {
          // Разрешаем поллинг снова
          isPendingOnOff.current = false;
        });
    };

    const getConnectedPins = (encoderId) => {
      const encoderItem = varencoder.find((enc) => enc.id === encoderId);
      const connectedPins = [];

      if (encoderItem && encoderItem.pinact) {
        Object.entries(encoderItem.pinact).forEach(([pin, idout]) => {
          connectedPins.push({ pin, idout });
        });
      }

      return connectedPins;
    };

    const getFreqStatus = (mhz) => {
      const hz = mhz / 1000;
      if (hz <= 40000) return { cls: 'text-green-600', msg: '✓' };
      if (hz <= 200000) return { cls: 'text-yellow-600', msg: '~' };
      return { cls: 'text-red-600', msg: '!' };
    };

    const formatPwmFreq = (mhz) => {
      if (!mhz) return '—';
      const hz = mhz / 1000;
      if (hz >= 1000000) return `${(hz / 1000000).toFixed(2)} MHz`;
      if (hz >= 1000) return `${(hz / 1000).toFixed(1)} kHz`;
      return `${hz} Hz`;
    };

    const getLangObject = () => ({
      langbutton: language === 'ru' ? ruencoder : enencoder
    });

    const getTooltipText = (key, index) => {
      const langObject = getLangObject();
      const tooltipText =
        langObject[key] && langObject[key][index] ? langObject[key][index] : '';
      return formatText(tooltipText);
    };

    const formatText = (text, maxLength = 50) => {
      if (!text || typeof text !== 'string') {
        return '';
      }

      const words = text.split(' ');
      let lines = [];
      let currentLine = '';

      for (let i = 0; i < words.length; i++) {
        if (currentLine.length + words[i].length + 1 <= maxLength) {
          currentLine += `${currentLine ? ' ' : ''}${words[i]}`;
        } else {
          if (currentLine) {
            lines.push(currentLine.trim());
          }
          currentLine = words[i];
        }
      }

      if (currentLine) {
        lines.push(currentLine.trim());
      }

      return lines.join('\n');
    };

    const onsave = (id, pinInfo) => {
      console.log('Deleting connection:', id, pinInfo);

      const pinName = pinInfo.split('(')[0].trim();

      fetch('/api/connection/del', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, pin: pinName })
      })
        .then((response) => {
          if (!response.ok) {
            return response.text().then((text) => {
              throw new Error(
                `HTTP error! status: ${response.status}, message: ${text}`
              );
            });
          }
          return response.json();
        })
        .then((r) => {
          setSaveResult(r);
          setEncoder((prevEncoder) =>
            prevEncoder.map((enc) => {
              if (enc.id === id) {
                const updatedPinact = { ...enc.pinact };
                delete updatedPinact[pinName];
                return { ...enc, pinact: updatedPinact };
              }
              return enc;
            })
          );
          setPintopin((prevPintopin) =>
            prevPintopin.filter(
              (item) => !(item.idin === id && item.pins === pinName)
            )
          );
        })
        .then(() => {
          console.log('Connection deleted successfully');
          refresh();
        })
        .catch((error) => {
          console.error('Error deleting connection:', error);
        });
    };

    const openModal = (type, encoderData) => {
      console.log('Opening modal:', type, encoderData);
      setModalType(type);
      setSelectedEncoder(encoderData);
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
      setModalType(null);
      setSelectedEncoder(null);
      //refresh(); // Обновляем данные после закрытия модального окна
    };
    const helpContent = {
      ru: html`
      <div class="mytext space-y-6">
        <div>
          <pre class="mb-4">
            Данный API позволяет дистанционно управлять энкодером, просто выполнив команду в браузере любого устройства в вашей локальной сети.
          </pre
          >
          <pre class="text-red-500 font-bold">
            Не открывайте доступ из интернета к вашим API - это небезопасно!
          </pre
          >
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Примеры API</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">API</th>
                <th class="border px-4 py-2">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/pwm?id=4&dvalue=25
                </td>
                <td class="border px-4 py-2">
                  Данная API команда установит значение димера в 25 единиц с id
                  = 4. Где "Zerg" это Ваш 'Token'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <pre class="mb-4">
            MQTT позволяет дистанционно управлять энкодером из интернета!
          </pre
          >
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Примеры команд MQTT</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">API</th>
                <th class="border px-4 py-2">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">Swarm/pwm/id=4/dvalue=25</td>
                <td class="border px-4 py-2">
                  Данная MQTT команда установит значение диммера в 25 едениц с
                  id = 4. Где "Swarm" это Ваш 'TX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `,
      en: html`
      <div class="mytext space-y-6">
        <div>
          <pre class="mb-4">
            This API allows you to remotely control a switch by simply executing a command in the browser of any device on your local network.
          </pre
          >
          <pre class="text-red-500 font-bold">
            Do not expose your APIs to the internet - it's not secure!
          </pre
          >
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">API Examples</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">API</th>
                <th class="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/pwm?id=7&dvalue=25
                </td>
                <td class="border px-4 py-2">
                  This command will set the dimmer to 25 for the device with ID
                  7. Where "Zerg" is your 'Token*.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <pre class="mb-4">
            MQTT allows you to remotely control a switch from the internet!
          </pre
          >
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">MQTT Command Examples</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">Command</th>
                <th class="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">Swarm/pwm/id=7/dvalue=25</td>
                <td class="border px-4 py-2">
                  This command will set the dimmer to 25 for the device with ID
                  7. Where "Swarm" is your 'RX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `
    };
    const Th = ({ title, tooltipIndex }) => html`
    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide relative group">
      ${title}
      <div
        class="absolute z-50 invisible group-hover:visible bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-xl border border-slate-200 text-left text-sm font-normal text-slate-600 whitespace-normal break-words transform -translate-x-1/2 left-1/2 top-full mt-2"
        style="min-width: 200px; max-width: 400px;"
      >
        ${getTooltipText('langbutton', tooltipIndex)}
      </div>
    </th>
  `;

    const ArrayEncoder = ({ d, index }) => {
      const connectedPins = getConnectedPins(d.id);
      const fStatus = getFreqStatus(d.pwm || 0);

      return html`
      <tr class="${index % 2 === 1 ? 'bg-white/80' : 'bg-sky-200/40'} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-2 text-sm text-slate-800 font-medium">${d.pins}(${d.id})</td>
        <td class="px-6 py-2 text-sm text-slate-700">
          ${d.encdrbpin ? `${d.encdrbpin}(${d.encoderb})` : 'Not set'}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono">
          ${connectedPins.length > 0
          ? connectedPins.map(
            ({ pin, idout }) => html`
                  <span class="mr-2 inline-flex items-center">
                    ${pin}(${idout})
                    <button
                      onClick=${(e) => {
                e.preventDefault();
                onsave(d.id, `${pin}(${idout})`);
              }}
                      class="ml-1 text-red-500 hover:text-red-700 transition-colors font-bold"
                      title="Remove connection"
                    >
                      [x]
                    </button>
                  </span>
                `
          )
          : 'Not set'}
        </td>
        <td class="px-6 py-2 text-sm">
          <span class="font-mono text-slate-700">${formatPwmFreq(d.pwm)}</span>
          <span class="ml-1 font-bold ${fStatus.cls}">${fStatus.msg}</span>
        </td>
        <td class="px-6 py-2 font-mono text-sm text-blue-600">
          ${d.pwmmax ? `${d.pwmmax} steps` : '—'}
        </td>
        <td class="px-6 py-2 text-sm text-slate-800">${d.dvalue}</td>
        <td class="px-6 py-2 text-sm text-slate-700 font-semibold">${d.ponr === 1 ? 'ON' : 'OFF'}</td>
        <td class="px-6 py-2 text-sm text-slate-600">${d.info}</td>
        <td class="px-6 py-2">
          <${MyPolzunok}
            value=${d.onoff}
            onChange=${(value) => handleEncoderChange({ ...d, onoff: value })}
          />
        </td>
        <td class="px-6 py-2 text-sm whitespace-nowrap">
          <button
            onClick=${() => openModal('connection', d)}
            class="text-teal-600 hover:text-cyan-600 font-semibold transition-colors mr-2"
          >
            Connection
          </button>
          <span class="text-slate-300">|</span>
          <button
            onClick=${() => openModal('edit', d)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors ml-2"
          >
            Edit Encdr.
          </button>
        </td>
      </tr>
    `;
    };

    if (!varencoder) return html`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">Loading...</div>`;

    return html`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative overflow-hidden flex-grow flex flex-col justify-center items-center">
      <!-- Decorative background glow -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
          Encoder(s) pin(s)
        </div>
        <div class="flex-grow flex flex-col justify-center items-center w-full">
          <div class="w-full">
            <div class="rounded-2xl overflow-hidden bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6">
              <div class="overflow-x-auto w-full">
                <table class="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <${Th} title="Encoder A (ID)" tooltipIndex=${3} />
                      <${Th} title="Encoder B (ID)" tooltipIndex=${4} />
                      <${Th} title="PWM connection" tooltipIndex=${5} />
                      <${Th} title="PWM Frequency" tooltipIndex=${11} />
                      <${Th} title="Resolution (steps)" tooltipIndex=${12} />
                      <${Th} title="Dimmer value (0-100)" tooltipIndex=${6} />
                      <${Th} title="Duty on restore" tooltipIndex=${7} />
                      <${Th} title="INFO" tooltipIndex=${8} />
                      <${Th} title="On/Off" tooltipIndex=${9} />
                      <${Th} title="Action" tooltipIndex=${10} />
                    </tr>
                  </thead>
                  <tbody id="tab1" class="divide-y divide-white/40">
                    ${varencoder.map(
      (d, index) =>
        html`<${ArrayEncoder} d=${d} index=${index} key=${d.id} />`
    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <button
                onclick=${() => setShowHelp(!showHelp)}
                class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
              >
                ${showHelp ? 'Hide Help' : 'Show Help'}
              </button>
            </div>

            ${showHelp &&
      html`
              <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                ${helpContent[language]}
              </div>
            `}
          </div>
        </div>
        ${isModalOpen &&
      html`
          <${ModalEncoder}
            modalType=${modalType}
            page="TabEncoder"
            hideModal=${closeModal}
            title=${modalType === 'connection'
          ? 'Edit Connection'
          : 'Edit Encoder'}
            selectedEncoder=${selectedEncoder}
            handleEncoderChange=${handleEncoderChange}
          />
        `}
      </div>
    </div>
  `;
  }
}

export { TabEncoder };
