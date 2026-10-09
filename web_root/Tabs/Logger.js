import { h, useState, useEffect, useRef, html } from '../bundle.js';

const LOG_RING_MAX_CHARS = 4000; // лимит на клиенте — не даём тексту расти бесконечно в DOM
const LOG_POLL_MS = 1000;        // опрос раз в секунду, пока не поставлено на паузу

// ---------------------------------------------------------------------------
// Help Content
// ---------------------------------------------------------------------------
const LOGGER_HELP = {
  ru: html`
    <div class="mytext space-y-6 font-sans text-base leading-relaxed text-slate-700 [&_code]:font-sans [&_code]:font-semibold [&_pre]:font-sans">
      <section class="rounded-2xl border-2 bg-indigo-50 border-indigo-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">Как подключиться к логу (пошагово)</h2>

        <ol class="list-decimal ml-6 space-y-3">
          <li>
            <b>Просто откройте эту страницу.</b> Подключаться никуда не нужно: окно <b>SYSTEM LOG (хвост UART3)</b>
            начнёт заполняться само, примерно раз в секунду. USB-UART переходник и терминальная программа не нужны.
          </li>
          <li>
            <b>Проверьте фильтр.</b> Откройте страницу <b>Global Settings</b>, раскройте блок <b>Фильтр логов</b>
            и убедитесь, что отмечены нужные вам категории. Сомневаетесь - нажмите <b>Включить все</b>. Затем вернитесь на эту страницу.
          </li>
          <li>
            <b>Повторите событие.</b> Нажмите кнопку, отправьте SMS, переключите устройство. Новые строки появятся в окне
            через секунду-две, а окно само прокрутится к самым новым.
          </li>
          <li>
            <b>Остановите поток.</b> Нажмите <b>Пауза</b>, и текст замрёт. Теперь его можно спокойно читать, выделять и копировать.
          </li>
          <li>
            <b>Продолжите.</b> Нажмите <b>Продолжить</b>, и приём возобновится с того места, где остановился.
          </li>
        </ol>

        <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300">
          <b>Как это работает:</b> устройство хранит в памяти небольшой буфер последних строк лога (около 1 КБ).
          Страница раз в секунду спрашивает у устройства, что появилось нового с прошлого раза, и дописывает это в окно.
          Тот же текст устройство продолжает выводить в UART3, так что обычный терминал работает как раньше.
        </div>

        <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300">
          <b>Важно:</b> в лог попадают только сообщения <b>включённых</b> категорий, и отбор происходит в момент записи.
          Сообщения выключенной категории не сохраняются нигде: включив её позже, прошлое вы уже не увидите.
          Включайте нужные категории до того, как повторите событие.
        </div>

        <div class="mt-4">
          <b>Пример.</b> Вы отправили SMS <code>${'30#SC*#'}</code> для кнопки с ID 30 (номер условный), а светодиод не изменился.
          На странице <b>Global Settings</b> в блоке <b>Фильтр логов</b> включаете категорию <b>GSM</b>, отправляете SMS ещё раз
          и возвращаетесь сюда. Строки с меткой <code>${'[GSM]'}</code> показывают, какие команды устройство разобрало из SMS
          и не сочло ли какие-то из них неверными. Увидели нужную строку - нажмите <b>Пауза</b>, и она никуда не убежит.
        </div>
      </section>

      <section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">Какие сообщения попадают в лог</h2>
        <p>Каждая строка лога начинается с метки категории в квадратных скобках, например <code>${'[GSM]'}</code> или <code>${'[OTA]'}</code>. По метке нужное легко найти глазами.
        Категорий 12, их включают и выключают на странице <b>Global Settings</b>, в блоке <b>Фильтр логов</b>. Изменения применяются сразу.</p>

        <div class="overflow-x-auto">
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Категория</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Метка в строке</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что здесь искать</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">Система</td>
                <td class="border px-4 py-2"><code>${'[SYSTEM]'}</code></td>
                <td class="border px-4 py-2">общие сообщения устройства: запуск, служебные события</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">MQTT</td>
                <td class="border px-4 py-2"><code>${'[MQTT]'}</code></td>
                <td class="border px-4 py-2">работа MQTT: подключения и публикации</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Сеть</td>
                <td class="border px-4 py-2"><code>${'[NET]'}</code></td>
                <td class="border px-4 py-2">сетевые соединения</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">GSM</td>
                <td class="border px-4 py-2"><code>${'[GSM]'}</code></td>
                <td class="border px-4 py-2">модем SIM800L: SMS, звонки, разбор команд и ответы</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Планировщик</td>
                <td class="border px-4 py-2"><code>${'[SCHEDULER]'}</code></td>
                <td class="border px-4 py-2">расписания и действия по времени</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Датчики</td>
                <td class="border px-4 py-2"><code>${'[SENSORS]'}</code></td>
                <td class="border px-4 py-2">опрос датчиков</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">ПИД-регулятор</td>
                <td class="border px-4 py-2"><code>${'[PID]'}</code></td>
                <td class="border px-4 py-2">работа ПИД-регуляторов</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Настройки</td>
                <td class="border px-4 py-2"><code>${'[SETTINGS]'}</code></td>
                <td class="border px-4 py-2">чтение и сохранение настроек</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Ethernet</td>
                <td class="border px-4 py-2"><code>${'[ETH]'}</code></td>
                <td class="border px-4 py-2">проводное подключение</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">PHY</td>
                <td class="border px-4 py-2"><code>${'[PHY]'}</code></td>
                <td class="border px-4 py-2">микросхема физического уровня Ethernet</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Z2M</td>
                <td class="border px-4 py-2"><code>${'[Z2M]'}</code></td>
                <td class="border px-4 py-2">обмен с Zigbee2MQTT и Zigbee-устройствами</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">OTA</td>
                <td class="border px-4 py-2"><code>${'[OTA]'}</code></td>
                <td class="border px-4 py-2">обновление прошивки</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-4 p-3 rounded-xl bg-white/80 border border-sky-300">
          <b>Совет:</b> оставьте только нужные категории. Буфер на устройстве небольшой и хранит только то, что прошло фильтр,
          поэтому чем меньше лишнего шума, тем дольше «живут» нужные строки.
        </div>

        <div class="mt-4 p-3 rounded-xl bg-white/80 border border-sky-300">
          <b>Выключить все.</b> Если нажать кнопку <b>Выключить все</b>, новые строки перестанут поступать.
          Если в окне уже был текст, он останется на экране до перезагрузки страницы. Если текста ещё не было,
          вы увидите надпись об ожидании данных. Кнопка <b>Включить все</b> возвращает все категории.
        </div>
      </section>

      <section class="rounded-2xl border-2 bg-violet-50 border-violet-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">Примеры из жизни: что лог расскажет за минуту</h2>
        <p class="mb-2">Четыре истории о том, как «дневник» контроллера превращает догадки в факты.</p>

        <div class="p-4 rounded-xl bg-white/80 border border-violet-300">
          <p class="text-lg font-bold text-black mb-1">SMS ушла, а свет не зажёгся</p>
          <p class="mb-1">Вы отправили команду, подождали, ещё подождали. Ничего. В голове уже три версии, и все плохие.</p>
          <p class="mb-1">Спокойно! На <b>Global Settings</b> оставьте в <b>Фильтре логов</b> категорию <b>GSM</b>, отправьте SMS <code>${'30#SC*#'}</code> ещё раз и нажмите <b>Пауза</b>. В строках <code>${'[GSM]'}</code> видно, какие команды устройство разобрало и какие отвергло как неверные. Через минуту вы знаете, где потерялась команда: в SMS или в устройстве.</p>
        </div>

        <div class="p-4 rounded-xl bg-white/80 border border-violet-300">
          <p class="text-lg font-bold text-black mb-1">Zigbee-лампа молчит</p>
          <p class="mb-1">Лампа не реагирует, и непонятно, кто виноват: лампа, Zigbee или MQTT.</p>
          <p class="mb-1">Спокойно! Оставьте категорию <b>Z2M</b>, нажмите кнопку управления лампой (ID 93, номер условный) и посмотрите строки <code>${'[Z2M]'}</code>. По ним видно, опубликовало ли устройство команду в MQTT или отбросило её. Вы сразу понимаете, с какой стороны искать неполадку.</p>
        </div>

        <div class="p-4 rounded-xl bg-white/80 border border-violet-300">
          <p class="text-lg font-bold text-black mb-1">Сбой, который не любит свидетелей</p>
          <p class="mb-1">Раз в день что-то идёт не так, а стоит сесть и посмотреть, как всё работает идеально. Знакомо?</p>
          <p class="mb-1">Спокойно! Оставьте эту страницу открытой на экране. Когда сбой случится, сразу нажмите <b>Пауза</b>: последние около 4000 символов лога перед вами. Выделите, скопируйте и сохраните, чтобы разобрать на свежую голову или показать автору проекта.</p>
        </div>

        <div class="p-4 rounded-xl bg-white/80 border border-violet-300">
          <p class="text-lg font-bold text-black mb-1">Лог молчит. Устройство зависло?</p>
          <p class="mb-1">Окно пустое, надпись об ожидании данных не исчезает. Сердце ёкнуло: неужели контроллер завис?</p>
          <p class="mb-1">Спокойно! Скорее всего, категории просто выключены. Откройте <b>Global Settings</b>, блок <b>Фильтр логов</b>, и нажмите <b>Включить все</b>. Строки вернутся сразу, без перезагрузки.</p>
        </div>
      </section>

      <section class="rounded-2xl border-2 bg-amber-50 border-amber-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">Лимиты и пропуски</h2>

        <div class="overflow-x-auto">
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Параметр</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Значение</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">Буфер на устройстве</td>
                <td class="border px-4 py-2">около 1 КБ последних символов лога (примерно 30-40 строк)</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Хранится на странице</td>
                <td class="border px-4 py-2">последние около 4000 символов</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Частота обновления</td>
                <td class="border px-4 py-2">раз в секунду, пока нет паузы и вкладка видна</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-4 p-3 rounded-xl bg-white/80 border border-amber-300">
          <b>Пауза и скрытая вкладка.</b> Пока нажата <b>Пауза</b> или вкладка браузера скрыта, лог не обновляется.
          После <b>Продолжить</b> или возврата на страницу приём продолжится сам.
        </div>

        <div class="mt-4 p-3 rounded-xl bg-white/80 border border-amber-300">
          <b>Пропуск.</b> Если за время паузы, скрытой вкладки или бурного потока устройство записало больше, чем помещается в его буфер,
          в окне появится пометка <b>пропуск — буфер устройства переполнен</b>. Это значит, что часть строк потеряна.
          Если пометка появляется часто, оставьте только нужные категории в <b>Фильтре логов</b>.
        </div>

        <p>Это живой хвост, а не архив: полной истории здесь нет. После перезагрузки страницы накопленный текст очищается, окно покажет то, что ещё осталось в буфере устройства, а дальше пойдут новые строки.</p>
      </section>

      <section class="rounded-2xl border-2 bg-rose-50 border-rose-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">Не работает? Проверьте</h2>
        <ul class="list-disc ml-6 space-y-2">
          <li><b>Окно пустое и ждёт данные.</b> На <b>Global Settings</b> в <b>Фильтре логов</b> не отмечена ни одна категория. Нажмите <b>Включить все</b>.</li>
          <li><b>Нужных строк нет.</b> Проверьте, включена ли их категория. Сообщения выключенной категории не сохраняются: включите её и повторите событие.</li>
          <li><b>Текст не движется.</b> Нажата <b>Пауза</b> (на кнопке написано <b>Продолжить</b>) или вкладка браузера скрыта.</li>
          <li><b>Появляется пометка о пропуске.</b> Сообщений слишком много для маленького буфера. Оставьте только нужные категории.</li>
        </ul>
      </section>
    </div>
  `,
  en: html`
    <div class="mytext space-y-6 font-sans text-base leading-relaxed text-slate-700 [&_code]:font-sans [&_code]:font-semibold [&_pre]:font-sans">
      <section class="rounded-2xl border-2 bg-indigo-50 border-indigo-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">How to connect to the log (step by step)</h2>

        <ol class="list-decimal ml-6 space-y-3">
          <li>
            <b>Just open this page.</b> There is nothing to connect: the <b>SYSTEM LOG (UART3 tail)</b> window
            starts filling by itself, about once a second. You do not need a USB-UART adapter or a terminal program.
          </li>
          <li>
            <b>Check the filter.</b> Open the <b>Global Settings</b> page, expand the <b>Log Filter</b> block
            and make sure the categories you care about are checked. Not sure? Click <b>Enable All</b>. Then come back to this page.
          </li>
          <li>
            <b>Repeat the event.</b> Press a button, send an SMS, switch a device. New lines show up in the window
            within a second or two, and the window scrolls to the newest ones on its own.
          </li>
          <li>
            <b>Stop the flow.</b> Click <b>Pause</b> and the text freezes. Now you can calmly read it, select it and copy it.
          </li>
          <li>
            <b>Continue.</b> Click <b>Resume</b> and receiving continues from where it stopped.
          </li>
        </ol>

        <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300">
          <b>How it works:</b> the device keeps a small buffer of the latest log lines in memory (about 1 KB).
          Once a second the page asks the device what is new since the last request and appends it to the window.
          The device keeps writing the same text to UART3, so a regular terminal works as before.
        </div>

        <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300">
          <b>Important:</b> only messages from <b>enabled</b> categories get into the log, and the selection happens at the moment of writing.
          Messages of a disabled category are not stored anywhere: if you enable it later, you will not see the past.
          Enable the categories you need before you repeat the event.
        </div>

        <div class="mt-4">
          <b>Example.</b> You sent the SMS <code>${'30#SC*#'}</code> for the button with ID 30 (the number is just an example), but the LED did not change.
          On the <b>Global Settings</b> page, in the <b>Log Filter</b> block, enable the <b>GSM</b> category, send the SMS again
          and come back here. The lines labeled <code>${'[GSM]'}</code> show which commands the device parsed from the SMS
          and whether it rejected any of them as invalid. Spotted the right line? Click <b>Pause</b> and it will not run away.
        </div>
      </section>

      <section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">Which messages get into the log</h2>
        <p>Every log line starts with a category label in square brackets, for example <code>${'[GSM]'}</code> or <code>${'[OTA]'}</code>. The label makes the right line easy to spot.
        There are 12 categories; you switch them on and off on the <b>Global Settings</b> page, in the <b>Log Filter</b> block. Changes apply immediately.</p>

        <div class="overflow-x-auto">
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Category</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Label in the line</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What to look for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">System</td>
                <td class="border px-4 py-2"><code>${'[SYSTEM]'}</code></td>
                <td class="border px-4 py-2">general device messages: startup, service events</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">MQTT</td>
                <td class="border px-4 py-2"><code>${'[MQTT]'}</code></td>
                <td class="border px-4 py-2">MQTT activity: connections and publications</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Network</td>
                <td class="border px-4 py-2"><code>${'[NET]'}</code></td>
                <td class="border px-4 py-2">network connections</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">GSM</td>
                <td class="border px-4 py-2"><code>${'[GSM]'}</code></td>
                <td class="border px-4 py-2">SIM800L modem: SMS, calls, command parsing and replies</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Scheduler</td>
                <td class="border px-4 py-2"><code>${'[SCHEDULER]'}</code></td>
                <td class="border px-4 py-2">schedules and time-based actions</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Sensors</td>
                <td class="border px-4 py-2"><code>${'[SENSORS]'}</code></td>
                <td class="border px-4 py-2">sensor polling</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">PID Controller</td>
                <td class="border px-4 py-2"><code>${'[PID]'}</code></td>
                <td class="border px-4 py-2">PID controller activity</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Settings</td>
                <td class="border px-4 py-2"><code>${'[SETTINGS]'}</code></td>
                <td class="border px-4 py-2">reading and saving settings</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Ethernet</td>
                <td class="border px-4 py-2"><code>${'[ETH]'}</code></td>
                <td class="border px-4 py-2">wired connection</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">PHY</td>
                <td class="border px-4 py-2"><code>${'[PHY]'}</code></td>
                <td class="border px-4 py-2">Ethernet physical layer chip</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Z2M</td>
                <td class="border px-4 py-2"><code>${'[Z2M]'}</code></td>
                <td class="border px-4 py-2">exchange with Zigbee2MQTT and Zigbee devices</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">OTA</td>
                <td class="border px-4 py-2"><code>${'[OTA]'}</code></td>
                <td class="border px-4 py-2">firmware update</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-4 p-3 rounded-xl bg-white/80 border border-sky-300">
          <b>Tip:</b> keep only the categories you need. The device buffer is small and holds only what passed the filter,
          so the less noise there is, the longer the useful lines stay available.
        </div>

        <div class="mt-4 p-3 rounded-xl bg-white/80 border border-sky-300">
          <b>Disable All.</b> If you click <b>Disable All</b>, new lines stop arriving.
          If the window already had text, it stays on the screen until the page is reloaded. If there was no text yet,
          you will see the waiting-for-data message. The <b>Enable All</b> button turns all categories back on.
        </div>
      </section>

      <section class="rounded-2xl border-2 bg-violet-50 border-violet-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">Real-life examples: what the log tells you in a minute</h2>
        <p class="mb-2">Four stories about how the diary of the controller turns guesses into facts.</p>

        <div class="p-4 rounded-xl bg-white/80 border border-violet-300">
          <p class="text-lg font-bold text-black mb-1">The SMS went out, but the light stayed off</p>
          <p class="mb-1">You sent the command, waited, waited some more. Nothing. Three theories are already in your head, and all of them are bad.</p>
          <p class="mb-1">Stay calm! On <b>Global Settings</b>, keep only the <b>GSM</b> category in the <b>Log Filter</b>, send the SMS <code>${'30#SC*#'}</code> again and click <b>Pause</b>. The <code>${'[GSM]'}</code> lines show which commands the device parsed and which it rejected as invalid. In a minute you know where the command got lost: in the SMS or in the device.</p>
        </div>

        <div class="p-4 rounded-xl bg-white/80 border border-violet-300">
          <p class="text-lg font-bold text-black mb-1">The Zigbee lamp is silent</p>
          <p class="mb-1">The lamp does not react, and it is unclear who is to blame: the lamp, Zigbee or MQTT.</p>
          <p class="mb-1">Stay calm! Keep the <b>Z2M</b> category, press the control button of the lamp (ID 93, the number is just an example) and look at the <code>${'[Z2M]'}</code> lines. They show whether the device published the command to MQTT or dropped it. You immediately know which side to investigate.</p>
        </div>

        <div class="p-4 rounded-xl bg-white/80 border border-violet-300">
          <p class="text-lg font-bold text-black mb-1">The glitch that hates witnesses</p>
          <p class="mb-1">Once a day something goes wrong, but as soon as you sit down to watch, everything works perfectly. Sounds familiar?</p>
          <p class="mb-1">Stay calm! Keep this page open on the screen. When the glitch happens, click <b>Pause</b> right away: the last ~4000 characters of the log are in front of you. Select, copy and save them to study later with a fresh head or to show the project author.</p>
        </div>

        <div class="p-4 rounded-xl bg-white/80 border border-violet-300">
          <p class="text-lg font-bold text-black mb-1">The log is silent. Did the device freeze?</p>
          <p class="mb-1">The window is empty, and the waiting-for-data message will not go away. Your heart skips a beat: has the controller frozen?</p>
          <p class="mb-1">Stay calm! Most likely the categories are simply switched off. Open <b>Global Settings</b>, the <b>Log Filter</b> block, and click <b>Enable All</b>. The lines come back at once, no reboot needed.</p>
        </div>
      </section>

      <section class="rounded-2xl border-2 bg-amber-50 border-amber-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">Limits and gaps</h2>

        <div class="overflow-x-auto">
          <table class="w-full bg-white/70">
            <thead>
              <tr>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Parameter</th>
                <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">Buffer on the device</td>
                <td class="border px-4 py-2">about 1 KB of the latest log characters (roughly 30-40 lines)</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Kept on the page</td>
                <td class="border px-4 py-2">the latest ~4000 characters</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Refresh rate</td>
                <td class="border px-4 py-2">once a second while not paused and the tab is visible</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-4 p-3 rounded-xl bg-white/80 border border-amber-300">
          <b>Pause and a hidden tab.</b> While <b>Pause</b> is on or the browser tab is hidden, the log is not refreshed.
          After <b>Resume</b> or when you return to the page, receiving continues by itself.
        </div>

        <div class="mt-4 p-3 rounded-xl bg-white/80 border border-amber-300">
          <b>Gap.</b> If during a pause, a hidden tab or a burst of messages the device wrote more than its buffer can hold,
          the window shows a <b>gap — device buffer overflowed</b> mark. It means that some lines were lost.
          If the mark appears often, keep only the categories you need in the <b>Log Filter</b>.
        </div>

        <p>This is a live tail, not an archive: there is no full history here. After the page is reloaded, the collected text is cleared, the window shows what is still in the device buffer, and then new lines keep coming.</p>
      </section>

      <section class="rounded-2xl border-2 bg-rose-50 border-rose-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">Not working? Check this</h2>
        <ul class="list-disc ml-6 space-y-2">
          <li><b>The window is empty and waiting for data.</b> No category is checked in the <b>Log Filter</b> on <b>Global Settings</b>. Click <b>Enable All</b>.</li>
          <li><b>The lines you need are missing.</b> Check that their category is enabled. Messages of a disabled category are not stored: enable it and repeat the event.</li>
          <li><b>The text does not move.</b> <b>Pause</b> is on (the button says <b>Resume</b>) or the browser tab is hidden.</li>
          <li><b>A gap mark keeps appearing.</b> There are too many messages for the small buffer. Keep only the categories you need.</li>
        </ul>
      </section>
    </div>
  `
};

function LogsTerminal({ language }) {
  const [text, setText] = useState('');
  const [paused, setPaused] = useState(false);
  const cursorRef = useRef(0);
  const boxRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    let stopped = false;

    const tick = () => {
      if (stopped || document.hidden) return;
      fetch('api/logs/get', {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({ since: cursorRef.current }),
      })
        .then((r) => r.json())
        .then((d) => {
          if (stopped || !d) return;
          cursorRef.current = d.cursor || 0;
          if (d.text) {
            setText((prev) => {
              const chunk = d.dropped
                ? (language === 'ru'
                    ? '\n… [пропуск — буфер устройства переполнен] …\n'
                    : '\n… [gap — device buffer overflowed] …\n') + d.text
                : d.text;
              const next = prev + chunk;
              return next.length > LOG_RING_MAX_CHARS
                ? next.slice(next.length - LOG_RING_MAX_CHARS)
                : next;
            });
          }
        })
        .catch(() => {});
    };

    tick();
    const id = setInterval(tick, LOG_POLL_MS);
    return () => {
      stopped = true;
      clearInterval(id);
    };
  }, [paused, language]);

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [text]);

  return html`
    <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner p-4 flex flex-col gap-3">
      <div class="flex items-center justify-between">
        <div class="text-xs font-bold uppercase tracking-wide text-teal-700/80">
          SYSTEM LOG (${language === 'ru' ? 'хвост UART3' : 'UART3 tail'})
        </div>
        <button
          type="button"
          onClick=${() => setPaused((v) => !v)}
          class="text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-300 text-slate-600 bg-white/70 hover:bg-slate-100 transition-colors"
        >
          ${paused
            ? (language === 'ru' ? 'Продолжить' : 'Resume')
            : (language === 'ru' ? 'Пауза' : 'Pause')}
        </button>
      </div>
      <div
        ref=${boxRef}
        class="bg-slate-900 text-amber-300 text-xs font-mono p-3 rounded-xl overflow-auto whitespace-pre-wrap selection:bg-amber-300 selection:text-slate-900"
        style="height: min(420px, 60vh); height: min(420px, 60dvh);"
      >
        ${text || (language === 'ru' ? '...ожидание данных...' : '...waiting for data...')}
      </div>
    </div>
  `;
}

export function Logger({ }) {
  const [language, setLanguage] = useState('ru');

  // Страница не хранит свои данные и не содержит /api/mysett/get — язык
  // берётся из общих настроек устройства (как на Firmware Update / Zigbee
  // Devices), чтобы переключатель языка на Global Settings управлял и
  // этой страницей тоже.
  const refreshLang = () =>
    fetch('api/mysett/get', { cache: 'no-store' })
      .then((r) => r.json())
      .then((r) => setLanguage(r.lang || 'ru'))
      .catch(() => { });

  useEffect(() => {
    refreshLang();
  }, []);

  return html`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex flex-col gap-6">
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="w-full relative z-10 flex flex-col gap-6">
        <div>
          <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-2 drop-shadow-sm tracking-tight uppercase">
          ${language === 'ru' ? 'Логи устройства' : 'Device Logs'}
        </div>
          <p class="text-sm text-slate-600 mb-6 max-w-3xl">${language === 'ru' ? 'Ночь, реле не щёлкнуло, а в интерфейсе всё выглядит правильно. Что на самом деле произошло? Откройте эту страницу: здесь «дневник» контроллера в реальном времени, и ответ обычно уже в нём.' : 'It is midnight, the relay did not click, and the interface says everything is fine. What really happened? Open this page: here is the diary of the controller in real time, and the answer is usually already there.'}</p>
        </div>

        <${LogsTerminal} language=${language} />

        ${LOGGER_HELP[language] || LOGGER_HELP.en}
      </div>
    </div>
  `;
}