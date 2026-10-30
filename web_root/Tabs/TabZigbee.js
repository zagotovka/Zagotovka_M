import { lockToggle } from '../helpLock.js';
import { HelpBox } from '../helpCopy.js';
import { h, useState, useEffect, useRef, html } from '../bundle.js';
import { registerPoll, unregisterPoll, pauseAll, resumeAll } from '../pollQueue.js';
import { fetchZigbeeAll } from '../condlib.js';
import { Icons } from '../components.js';
import { MyPolzunok } from '../main.js';
import { ModalZigbee } from '../Modals/ModalZigbee.js';
import { ModalLearn } from '../Modals/ModalLearn.js';

const HELP_CONTENT = {
  ru: html`
    <div class="mytext space-y-6 font-sans text-base leading-relaxed text-slate-700 [&_code]:font-sans [&_code]:font-semibold [&_pre]:font-sans">
        <section class="rounded-2xl border-2 bg-indigo-50 border-indigo-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Как подключить Zigbee-устройство (пошагово)</h2>
          <ol class="list-decimal ml-6 space-y-3">
            <li><b>Узнайте IEEE Address устройства.</b> Это уникальный адрес из 16 шестнадцатеричных символов, например <code>${'588e81fffe36a343'}</code>. Его можно найти в Zigbee2MQTT или на наклейке устройства.</li>
            <li>Откройте страницу <b>Select pin(s)</b>, в разделе <b>«Виртуальные пины Zigbee»</b> выберите свободный пин и установите тип <b>Zigbee</b>.</li>
            <li>В появившейся строке впишите <b>IEEE Address</b> и название в поле <b>Info</b>, затем нажмите <b>Submit</b>.</li>
            <li>Вернитесь на эту страницу: в таблице появится строка с ID, начиная с 90. Нажмите <b>«Обучение»</b>, подействуйте на устройство (нажмите кнопку, покрутите диммер), опишите появившиеся строки и нажмите <b>«Сохранить»</b>.</li>
            <li>Нажмите <b>«Управление»</b> и проверьте устройство ползунком <b>Power</b>.</li>
            <li>Убедитесь, что ползунок <b>On/Off</b> в строке устройства включён: пока он выключен, контроллер не отправляет устройству команды из окна <b>«Управление»</b>.</li>
          </ol>

          <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300">
            <b>Как это работает:</b> контроллер общается с Zigbee-устройствами через Zigbee2MQTT. При обучении он слушает устройство и сам определяет, что оно умеет: включаться, менять яркость или цвет, посылать нажатия. Вам остаётся только дать устройству имя.
          </div>

          <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300">
            <b>Важно:</b> у каждой строки два разных «выключателя». Ползунок <b>On/Off</b> в таблице - рубильник строки (он разрешает или запрещает контроллеру работать с устройством), а ползунок <b>Power</b> в окне <b>«Управление»</b> включает и выключает саму лампу или розетку. Power работает только при включённом рубильнике.
          </div>

          <div class="mt-4">
            <b>Пример.</b> Добавляем лампу на кухне. ID и адрес условные, у вас будут свои.
            <ul class="list-disc ml-6 mt-1">
              <li>На странице <b>Select pin(s)</b> выбираем свободный Zigbee-пин, тип <b>Zigbee</b>, <b>IEEE Address</b> <code>${'588e81fffe36a343'}</code>, <b>Info</b> «Лампа кухня», жмём <b>Submit</b></li>
              <li>В таблице на этой странице появилась строка с ID <b>93</b>. Жмём <b>«Обучение»</b>, нажимаем на лампе нужную функцию и сохраняем</li>
              <li>В окне <b>«Управление»</b> включаем <b>Power</b> - лампа загорается</li>
              <li>Теперь лампой можно управлять и с других страниц, например указать ID 93 в поле действия кнопки: <code>${'93:2'}</code> переключает лампу по нажатию</li>
            </ul>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Управление по SMS и DTMF</h2>
<div><h4 class="text-lg font-bold text-black mt-4 mb-2">Рубильник On/Off по SMS и DTMF</h4><p class="mb-2">Ползунок On/Off любой строки этой страницы можно переключить с телефона, номер которого указан в настройках SIM800L: SMS-сообщением или во время звонка (тональный набор DTMF). Формат команды одинаков на всех страницах: <b>ID#КОД*</b>, где ID - число из колонки ID нужной строки.</p><table class="w-full border-collapse my-2 bg-white/70"><thead><tr><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">Действие</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">SMS</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">DTMF (во время звонка)</th></tr></thead><tbody><tr><td class="border px-3 py-1">Отключить строку (ползунок Off)</td><td class="border px-3 py-1"><code>${'93#00*'}</code></td><td class="border px-3 py-1"><code>${'93#00*#'}</code></td></tr><tr><td class="border px-3 py-1">Включить строку (ползунок On)</td><td class="border px-3 py-1"><code>${'93#11*'}</code></td><td class="border px-3 py-1"><code>${'93#11*#'}</code></td></tr></tbody></table><p class="mb-2">В таблице ID = 93 - это пример, подставьте ID своей строки.</p><p class="mb-2">Несколько команд подряд: <code>${'93#00*7#11*'}</code> (SMS) и <code>${'93#00*7#11*#'}</code> (звонок). Ввод во время звонка всегда завершается символами <code>${'*#'}</code>: последняя команда уже заканчивается на <code>${'*'}</code>, поэтому в конце добавляется только <code>${'#'}</code>.</p><p class="mb-2">Коды для всех страниц: Button, Switch, Encoder, OneWire, Security, Zigbee - <b>00</b> (выкл) и <b>11</b> (вкл); Cron - <b>33</b> и <b>44</b>; PID - <b>55</b> и <b>66</b>.</p><p class="mb-2">В ответ приходит SMS-отчёт, например <code>${'OnOff: Pin93=OFF'}</code> (отчёт отправляется, только если включён общий ползунок SIM800L). Неверные команды попадают в список Invld pins/cmd.</p><p class="mb-2">ID дочерних строк вида 93.1 по DTMF набрать нельзя (на клавиатуре нет точки): такие строки переключаются только по SMS, например <code>${'93.1#00*'}</code>. Головная строка (например 93) переключается и по SMS, и по DTMF. ID 222 по SMS и DTMF недоступен: комбинация 222 зарезервирована под быструю команду "выключить все SMS".</p></div>
        </section>
        <section class="rounded-2xl border-2 bg-teal-50 border-teal-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Таблица устройств</h2>
          <div>
            <p class="mb-2">На этой странице отображаются все Zigbee-устройства, добавленные на странице <b>Select pin(s)</b> (режим <b>Zigbee</b>, поля <b>IEEE Address</b> и <b>Info</b>). ID Zigbee-устройств начинаются с 90.</p>
            <h3 class="text-lg font-bold text-black mb-2">Колонки таблицы</h3>
          <table class="w-full bg-white/70"><thead><tr><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Колонка</th><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что показывает</th></tr></thead><tbody><tr><td class="border px-4 py-2"><b>ID</b></td><td class="border px-4 py-2">Номер строки в контроллере. У вложенных строк группы ID вида 93.1, 93.2 (см. раздел про Multi).</td></tr><tr><td class="border px-4 py-2"><b>IEEE Address</b></td><td class="border px-4 py-2">Уникальный 64-битный адрес Zigbee-устройства. У группы рядом с адресом показан номер эндпоинта, например (EP1).</td></tr><tr><td class="border px-4 py-2"><b>Type</b></td><td class="border px-4 py-2">Тип устройства: Socket, Лампа (яркость), Лампа (яркость + цвет), Button, Switch, PIR, Sensor. Для группы строк показано Multi и число строк в ней.</td></tr><tr><td class="border px-4 py-2"><b>Info</b></td><td class="border px-4 py-2">Название устройства (например, Лампа кухня). Задаётся на странице Select pin(s) или в колонке «Название» окна обучения.</td></tr><tr><td class="border px-4 py-2"><b>On/Off</b></td><td class="border px-4 py-2">Рубильник строки (подробнее ниже).</td></tr><tr><td class="border px-4 py-2"><b>Action</b></td><td class="border px-4 py-2">Кнопки <b>Управление</b> и <b>Обучение</b>.</td></tr></tbody></table>
          </div>
          <div>
            <h3 class="text-lg font-bold text-black mb-2">Ползунок On/Off в таблице</h3>
            <p class="mb-2">Это рубильник строки. Пока он выключен, контроллер не отправляет этому устройству команды из окна <b>Управление</b>. Сам ползунок можно переключить мышью, по SMS или по звонку (см. первую карточку).</p>
            <p class="mb-2">Включать и выключать саму розетку или лампу нужно ползунком <b>Power</b> в окне <b>Управление</b>. Он работает только при включённом рубильнике строки.</p>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-violet-50 border-violet-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Кнопка «Управление»</h2>
          <div>
            <p class="mb-2">Открывает окно управления выбранным устройством. IEEE Address и Info здесь не меняются: их задают на странице <b>Select pin(s)</b>.</p>
            <h3 class="text-lg font-bold text-black mb-2">Что есть в окне</h3>
            <ul class="list-disc ml-6 mt-1">
              <li><b>Тип устройства</b> - выбор типа: Автоматически, Розетка (On/Off), Диммер, Лампа (яркость), Лампа (яркость + цвет), Выключатель (Switch), Кнопка (Button), PIR (датчик движения). Изменение сохраняется сразу. При значении Автоматически тип определяется по функциям, которые устройство сообщило при опросе.</li>
              <li><b>Power</b> - отправляет устройству команду включить или выключить.</li>
              <li><b>Brightness</b> - ползунок яркости (для диммеров и ламп).</li>
              <li><b>Color</b> - выбор цвета (для цветных ламп).</li>
              <li><b>Возможности</b> - что устройство умеет: Вкл/Выкл, Яркость, Цвет.</li>
              <li><b>Обновить возможности</b> - повторно опрашивает устройство. Пока идёт опрос, тип временно показывается как Socket.</li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-bold text-black mb-2">Для кнопок и выключателей</h3>
            <p class="mb-2">Вместо ползунков яркости и цвета окно показывает блок <b>Тестирование</b> (кнопки для проверки каждого сигнала) и блок <b>Настройка действий</b> со ссылкой на страницу <b>Button(s) pin(s)</b> или <b>Switch(es) pin(s)</b>. Действия (что включить по нажатию) задаются именно там.</p>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-emerald-50 border-emerald-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Кнопка «Обучение»</h2>
          <div>
            <p class="mb-2">Запускает режим обучения: контроллер слушает устройство и сам определяет, что оно умеет. Подходит для любых устройств (кнопки, выключатели, диммеры, лампы, датчики), а не только для кнопок.</p>
            <ol class="list-decimal ml-6 space-y-3">
              <li><b>Нажмите «Обучение»</b> в строке нужного устройства. Откроется окно <b>Режим обучения</b>, сессия стартует сама.</li>
              <li><b>Подействуйте на устройство</b>: нажмите кнопку, покрутите диммер, откройте дверь. В таблице <b>Мы увидели</b> появятся строки с колонками EP, Кластер, Значение.</li>
              <li><b>Опишите каждую строку.</b> В колонке <b>Название</b> впишите имя (оно попадёт в колонку Info), в колонке <b>Это:</b> выберите роль: Игнорировать (по умолчанию), Вкл/Выкл, Выключатель, Яркость, Диммер, Цвет, Температура, Влажность, Дтчк. движения (PIR), Кнопка, EP.
                <ul class="list-disc ml-6 mt-1">
                  <li>Для роли <b>Кнопка</b> выберите тип нажатия: Одиночное, Двойное или Долгое.</li>
                  <li>Для роли <b>Выключатель</b> выберите значение: 1 (Вкл), 0 (Выкл) или Toggle (одна кнопка). Пока значение не выбрано, кнопка <b>Сохранить</b> неактивна.</li>
                </ul>
              </li>
              <li><b>Нажмите «Сохранить».</b> Контроллер определит тип устройства и создаст нужные строки. Если у устройства несколько эндпоинтов, получится группа Multi.</li>
              <li><b>Задайте действия.</b> Для кнопок и выключателей окно предложит перейти на страницу <b>Button(s) pin(s)</b> или <b>Switch(es) pin(s)</b>: там пишется, что делать по нажатию.</li>
            </ol>
          </div>
          <p class="rounded-xl border border-red-300 bg-red-50 px-4 py-2 font-bold text-red-700">Во время обучения не трогайте другие Zigbee-устройства: это может задержать распознавание.</p>
          <div>
            <h3 class="text-lg font-bold text-black mb-2">Время сессии</h3>
            <ul class="list-disc ml-6 mt-1">
              <li>Сессия заканчивается, если с устройством ничего не происходило 15 минут. Каждое новое действие обновляет отсчёт. Дольше 2 часов сессия не длится в любом случае.</li>
              <li>Закрытие окна и потеря связи с браузером тоже останавливают сессию. Уже увиденные строки остаются в таблице, кнопка <b>Повторить</b> запускает сессию заново.</li>
              <li>Для диммеров в окне есть блок <b>Определение диапазона диммера</b>: покрутите регулятор до минимума и до максимума, границы определятся автоматически.</li>
            </ul>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-amber-50 border-amber-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Устройства с несколькими эндпоинтами (Multi)</h2>
          <div>
            <p class="mb-2">Если у одного физического устройства несколько эндпоинтов (например, многоклавишный выключатель или лампа с яркостью и цветом), его строки объединяются в группу.</p>
            <ul class="list-disc ml-6 mt-1">
              <li>Головная строка группы показывает тип <b>Multi</b> и число строк в группе. Клик по ней разворачивает или сворачивает группу.</li>
              <li>Вложенные строки помечены <b>EP</b> и имеют ID вида 93.1, 93.2. Их тип: On/Off, Dimmer, Color, Button, Switch, PIR или Sensor.</li>
              <li>Ползунок головной строки переключает всю группу. Ползунки вложенных строк недоступны, пока головная строка выключена.</li>
              <li>Кнопки <b>Управление</b> и <b>Обучение</b> есть только в головной строке. В окне <b>Управление</b> каждый эндпоинт управляется отдельно.</li>
            </ul>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-rose-50 border-rose-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Примеры из жизни: что на самом деле умеет эта страница</h2>
<p class="mb-2">ID условные.</p>
<ul class="list-disc ml-6 space-y-1">
<li><b>Выключатель, которого не было в стене.</b> <b>«Обучение»</b>, нажмите кнопку, роль <b>Кнопка</b>, тип <b>Одиночное</b>, <b>«Сохранить»</b>. Затем на <b>Button(s) pin(s)</b> в SINGLE CLICK впишите <code>${'93:2'}</code> (93 - лампа на кухне).</li>
<li><b>Ребёнок нажимает все клавиши.</b> Трёхклавишный выключатель образует группу <b>Multi</b>: строки 93, 93.1, 93.2, 93.3. Ползунок <b>On/Off</b> головной строки отключает всю группу, то же делают SMS <code>${'93#00*'}</code> и <code>${'93#11*'}</code>.</li>
<li><b>Диапазон диммера.</b> В <b>«Обучение»</b> блок <b>Определение диапазона диммера</b>: покрутите регулятор до минимума и максимума, границы определятся сами.</li>
<li><b>Окно обучения закрылось.</b> Сессия останавливается через 15 минут без событий, но строки остаются в таблице: нажмите <b>«Повторить»</b>.</li>
</ul>
</section>
        <section class="rounded-2xl border-2 bg-orange-50 border-orange-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Не работает? Проверьте</h2>
          <ul class="list-disc ml-6 mt-1">
            <li>Включён ли ползунок <b>On/Off</b> в строке устройства. Если он выключен, команды из окна <b>«Управление»</b> не отправляются, а <b>Power</b> не действует.</li>
            <li>Верно ли указан <b>IEEE Address</b> на странице <b>Select pin(s)</b>: ровно 16 шестнадцатеричных символов, без пробелов.</li>
            <li>Не трогали ли вы другие Zigbee-устройства во время обучения: это может задержать распознавание.</li>
            <li>Верно ли определён тип. Если нет, нажмите <b>«Обновить возможности»</b> или выберите тип вручную в окне <b>«Управление»</b>.</li>
            <li>Кнопка <b>«Сохранить»</b> в окне обучения неактивна: для роли <b>Выключатель</b> не выбрано значение (1, 0 или Toggle).</li>
            <li>SMS-отчёт на команду <code>${'93#00*'}</code> приходит только при включённом общем ползунке SIM800L.</li>
          </ul>
        </section>
    </div>
  `,
  en: html`
    <div class="mytext space-y-6 font-sans text-base leading-relaxed text-slate-700 [&_code]:font-sans [&_code]:font-semibold [&_pre]:font-sans">
        <section class="rounded-2xl border-2 bg-indigo-50 border-indigo-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">How to connect a Zigbee device (step by step)</h2>
          <ol class="list-decimal ml-6 space-y-3">
            <li><b>Find the IEEE Address of the device.</b> It is a unique address of 16 hexadecimal characters, for example <code>${'588e81fffe36a343'}</code>. You can find it in Zigbee2MQTT or on the device sticker.</li>
            <li>Open the <b>Select pin(s)</b> page, in the <b>"Virtual pins of Zigbee"</b> section choose a free pin and set the type to <b>Zigbee</b>.</li>
            <li>In the row that appears, type the <b>IEEE Address</b> and a name in the <b>Info</b> field, then press <b>Submit</b>.</li>
            <li>Come back to this page: a row with an ID starting from 90 appears in the table. Press <b>Learn</b>, act on the device (press a button, turn a dimmer), describe the rows that appear and press <b>Save</b>.</li>
            <li>Press <b>Control</b> and check the device with the <b>Power</b> slider.</li>
            <li>Make sure the <b>On/Off</b> slider in the device row is On: while it is Off, the controller does not send the device any commands from the <b>Control</b> window.</li>
          </ol>

          <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300">
            <b>How it works:</b> the controller talks to Zigbee devices through Zigbee2MQTT. In learning mode it listens to the device and works out what it can do: switch on, change brightness or color, send presses. All that is left for you is to give the device a name.
          </div>

          <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300">
            <b>Important:</b> every row has two different "switches". The <b>On/Off</b> slider in the table is the row master switch (it allows or forbids the controller to work with the device), while the <b>Power</b> slider in the <b>Control</b> window turns the lamp or socket itself on and off. Power works only while the master switch is On.
          </div>

          <div class="mt-4">
            <b>Example.</b> Adding a kitchen lamp. The ID and the address are made up, yours will differ.
            <ul class="list-disc ml-6 mt-1">
              <li>On the <b>Select pin(s)</b> page choose a free Zigbee pin, type <b>Zigbee</b>, <b>IEEE Address</b> <code>${'588e81fffe36a343'}</code>, <b>Info</b> "Kitchen lamp", press <b>Submit</b></li>
              <li>A row with ID <b>93</b> appeared in the table on this page. Press <b>Learn</b>, trigger the needed function on the lamp and save</li>
              <li>In the <b>Control</b> window turn <b>Power</b> on - the lamp lights up</li>
              <li>Now the lamp can be controlled from other pages too, for example put ID 93 into a button action field: <code>${'93:2'}</code> toggles the lamp on a press</li>
            </ul>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Control by SMS and DTMF</h2>
<div><h4 class="text-lg font-bold text-black mt-4 mb-2">On/Off switch by SMS and DTMF</h4><p class="mb-2">The On/Off slider of any row on this page can be switched from the phone number set in the SIM800L settings: by SMS or during a call (DTMF tones). The command format is the same on every page: <b>ID#CODE*</b>, where ID is the number from the ID column of the needed row.</p><table class="w-full border-collapse my-2 bg-white/70"><thead><tr><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">Action</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">SMS</th><th class="border px-3 py-1 text-left font-bold text-black bg-black/5">DTMF (during a call)</th></tr></thead><tbody><tr><td class="border px-3 py-1">Turn the row off (slider Off)</td><td class="border px-3 py-1"><code>${'93#00*'}</code></td><td class="border px-3 py-1"><code>${'93#00*#'}</code></td></tr><tr><td class="border px-3 py-1">Turn the row on (slider On)</td><td class="border px-3 py-1"><code>${'93#11*'}</code></td><td class="border px-3 py-1"><code>${'93#11*#'}</code></td></tr></tbody></table><p class="mb-2">In the table ID = 93 is an example, use the ID of your own row.</p><p class="mb-2">Several commands in a row: <code>${'93#00*7#11*'}</code> (SMS) and <code>${'93#00*7#11*#'}</code> (call). Input during a call always ends with <code>${'*#'}</code>: the last command already ends with <code>${'*'}</code>, so only <code>${'#'}</code> is added at the end.</p><p class="mb-2">Codes for all pages: Button, Switch, Encoder, OneWire, Security, Zigbee - <b>00</b> (off) and <b>11</b> (on); Cron - <b>33</b> and <b>44</b>; PID - <b>55</b> and <b>66</b>.</p><p class="mb-2">An SMS report is sent back, for example <code>${'OnOff: Pin93=OFF'}</code> (the report is sent only if the common SIM800L slider is On). Wrong commands are listed in Invld pins/cmd.</p><p class="mb-2">IDs of child rows like 93.1 cannot be dialed during a call (the keypad has no dot): such rows are switched by SMS only, for example <code>${'93.1#00*'}</code>. A head row (for example 93) is switched both by SMS and DTMF. ID 222 is not available by SMS or DTMF: the combination 222 is reserved for the quick command "turn all SMS alerts off".</p></div>
        </section>
        <section class="rounded-2xl border-2 bg-teal-50 border-teal-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Device table</h2>
          <div>
            <p class="mb-2">This page shows all Zigbee devices added on the <b>Select pin(s)</b> page (mode <b>Zigbee</b>, fields <b>IEEE Address</b> and <b>Info</b>). Zigbee device IDs start at 90.</p>
            <h3 class="text-lg font-bold text-black mb-2">Table columns</h3>
          <table class="w-full bg-white/70"><thead><tr><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Column</th><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What it shows</th></tr></thead><tbody><tr><td class="border px-4 py-2"><b>ID</b></td><td class="border px-4 py-2">Row number in the controller. Child rows of a group have IDs like 93.1, 93.2 (see the Multi section).</td></tr><tr><td class="border px-4 py-2"><b>IEEE Address</b></td><td class="border px-4 py-2">Unique 64-bit address of the Zigbee device. For a group, the endpoint number is shown next to the address, for example (EP1).</td></tr><tr><td class="border px-4 py-2"><b>Type</b></td><td class="border px-4 py-2">Device type: Socket, Lamp (brightness), Lamp (brightness + color), Button, Switch, PIR, Sensor. A group of rows shows Multi and the number of rows in it.</td></tr><tr><td class="border px-4 py-2"><b>Info</b></td><td class="border px-4 py-2">Device name (for example, Kitchen lamp). It is set on the Select pin(s) page or in the Name column of the learning window.</td></tr><tr><td class="border px-4 py-2"><b>On/Off</b></td><td class="border px-4 py-2">Row master switch (details below).</td></tr><tr><td class="border px-4 py-2"><b>Action</b></td><td class="border px-4 py-2">The <b>Control</b> and <b>Learn</b> buttons.</td></tr></tbody></table>
          </div>
          <div>
            <h3 class="text-lg font-bold text-black mb-2">On/Off slider in the table</h3>
            <p class="mb-2">This is the master switch of the row. While it is Off, the controller does not send commands from the <b>Control</b> window to this device. The slider itself can be switched with the mouse, by SMS or by a call (see the first card).</p>
            <p class="mb-2">To turn the socket or lamp itself on and off, use the <b>Power</b> slider in the <b>Control</b> window. It works only while the row master switch is On.</p>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-violet-50 border-violet-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">The Control button</h2>
          <div>
            <p class="mb-2">Opens the control window of the selected device. IEEE Address and Info are not changed here: they are set on the <b>Select pin(s)</b> page.</p>
            <h3 class="text-lg font-bold text-black mb-2">What the window contains</h3>
            <ul class="list-disc ml-6 mt-1">
              <li><b>Device Type</b> - type selection: Auto-detect, Socket (On/Off), Dimmer, Lamp (brightness), Lamp (brightness + color), Switch, Button, PIR (motion sensor). A change is saved at once. With Auto-detect the type is taken from the functions the device reported during the scan.</li>
              <li><b>Power</b> - sends the on or off command to the device.</li>
              <li><b>Brightness</b> - brightness slider (for dimmers and lamps).</li>
              <li><b>Color</b> - color picker (for color lamps).</li>
              <li><b>Capabilities</b> - what the device can do: On/Off, Brightness, Color.</li>
              <li><b>Rescan capabilities</b> - asks the device again. While the scan runs, the type is temporarily shown as Socket.</li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-bold text-black mb-2">For buttons and switches</h3>
            <p class="mb-2">Instead of brightness and color sliders the window shows a <b>Testing</b> block (buttons to test each signal) and a <b>Configure Actions</b> block with a link to the <b>Button(s) pin(s)</b> or <b>Switch(es) pin(s)</b> page. The actions (what to turn on by a press) are set there.</p>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-emerald-50 border-emerald-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">The Learn button</h2>
          <div>
            <p class="mb-2">Starts learning mode: the controller listens to the device and works out what it can do. It suits any device (buttons, switches, dimmers, lamps, sensors), not only buttons.</p>
            <ol class="list-decimal ml-6 space-y-3">
              <li><b>Click Learn</b> in the row of the needed device. The <b>Learning Mode</b> window opens and the session starts by itself.</li>
              <li><b>Act on the device</b>: press a button, turn a dimmer, open a door. Rows with the columns EP, Cluster, Value appear in the <b>We observed</b> table.</li>
              <li><b>Describe each row.</b> In the <b>Name</b> column type a name (it goes to the Info column), in the <b>This is:</b> column choose a role: Ignore (default), On/Off, Switch, Brightness, Dimmer, Color, Temperature, Humidity, Motion snsr (PIR), Button, EP.
                <ul class="list-disc ml-6 mt-1">
                  <li>For the <b>Button</b> role choose the press type: Single click, Double click or Long press.</li>
                  <li>For the <b>Switch</b> role choose the value: 1 (On), 0 (Off) or Toggle (single button). Until a value is chosen, the <b>Save</b> button stays disabled.</li>
                </ul>
              </li>
              <li><b>Click Save.</b> The controller determines the device type and creates the needed rows. If the device has several endpoints, a Multi group appears.</li>
              <li><b>Set the actions.</b> For buttons and switches the window offers to go to the <b>Button(s) pin(s)</b> or <b>Switch(es) pin(s)</b> page: that is where you write what to do on a press.</li>
            </ol>
          </div>
          <p class="rounded-xl border border-red-300 bg-red-50 px-4 py-2 font-bold text-red-700">While learning, do not touch other Zigbee devices: it may delay recognition.</p>
          <div>
            <h3 class="text-lg font-bold text-black mb-2">Session time</h3>
            <ul class="list-disc ml-6 mt-1">
              <li>The session ends if nothing happened with the device for 15 minutes. Every new action restarts the countdown. In any case a session never lasts longer than 2 hours.</li>
              <li>Closing the window or losing the connection with the browser also stops the session. Rows already observed stay in the table, and the <b>Retry</b> button starts the session again.</li>
              <li>For dimmers the window has a <b>Dimmer range detection</b> block: turn the knob to the minimum and to the maximum, and the limits are detected automatically.</li>
            </ul>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-amber-50 border-amber-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Devices with several endpoints (Multi)</h2>
          <div>
            <p class="mb-2">If one physical device has several endpoints (for example, a multi-key switch or a lamp with brightness and color), its rows are joined into a group.</p>
            <ul class="list-disc ml-6 mt-1">
              <li>The head row of the group shows the type <b>Multi</b> and the number of rows in the group. Clicking it expands or collapses the group.</li>
              <li>Child rows are marked <b>EP</b> and have IDs like 93.1, 93.2. Their type is On/Off, Dimmer, Color, Button, Switch, PIR or Sensor.</li>
              <li>The slider of the head row switches the whole group. Sliders of child rows are unavailable while the head row is Off.</li>
              <li>The <b>Control</b> and <b>Learn</b> buttons exist only in the head row. In the <b>Control</b> window each endpoint is controlled separately.</li>
            </ul>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-rose-50 border-rose-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Real-life examples: what this page can really do</h2>
<p class="mb-2">IDs are made up.</p>
<ul class="list-disc ml-6 space-y-1">
<li><b>A switch that was not in the wall.</b> <b>Learn</b>, press the button, role <b>Button</b>, type <b>Single click</b>, <b>Save</b>. Then on <b>Button(s) pin(s)</b> put <code>${'93:2'}</code> into SINGLE CLICK (93 is the kitchen lamp).</li>
<li><b>A child presses every key.</b> A three-key switch forms a <b>Multi</b> group: rows 93, 93.1, 93.2, 93.3. The head-row <b>On/Off</b> slider disables the whole group; SMS <code>${'93#00*'}</code> and <code>${'93#11*'}</code> do the same.</li>
<li><b>Dimmer range.</b> In <b>Learn</b> use the <b>Dimmer range detection</b> block: turn the knob to the minimum and maximum, the limits are detected automatically.</li>
<li><b>The learning window closed.</b> The session stops after 15 minutes without events, but the rows stay in the table: press <b>Retry</b>.</li>
</ul>
</section>
        <section class="rounded-2xl border-2 bg-orange-50 border-orange-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Not working? Check these</h2>
          <ul class="list-disc ml-6 mt-1">
            <li>Is the <b>On/Off</b> slider in the device row On? If it is Off, commands from the <b>Control</b> window are not sent and <b>Power</b> has no effect.</li>
            <li>Is the <b>IEEE Address</b> on the <b>Select pin(s)</b> page correct: exactly 16 hexadecimal characters, no spaces.</li>
            <li>Did you touch other Zigbee devices during learning? It may delay recognition.</li>
            <li>Is the type detected correctly? If not, press <b>Rescan capabilities</b> or choose the type manually in the <b>Control</b> window.</li>
            <li>The <b>Save</b> button in the learning window is disabled: no value (1, 0 or Toggle) is chosen for the <b>Switch</b> role.</li>
            <li>The SMS report for the command <code>${'93#00*'}</code> arrives only if the common SIM800L slider is On.</li>
          </ul>
        </section>
    </div>
  `
};

/* ---------------------------------------------------------------------------
   Всплывающие подсказки заголовков таблицы (общий механизм как на Timer(s)/Encoder):
   один глобальный div #__global_tip, реакция на любой элемент с атрибутом data-tip,
   цвета зависят от data-theme на <html>.
   --------------------------------------------------------------------------- */
function initGlobalTooltip() {
  if (document.__tipInited) return;
  document.__tipInited = true;

  const tip = document.createElement('div');
  tip.id = '__global_tip';
  Object.assign(tip.style, {
    position: 'fixed',
    zIndex: '99999',
    maxWidth: '280px',
    background: '#1a2332',
    color: '#e8f4f8',
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid rgba(0,188,188,0.35)',
    fontSize: '12px',
    lineHeight: '1.6',
    boxShadow: '0 6px 20px rgba(0,0,0,0.45)',
    pointerEvents: 'none',
    whiteSpace: 'normal',
    display: 'none',
    transition: 'opacity 0.12s ease',
    opacity: '0',
  });
  document.body.appendChild(tip);

  let hideTimer = null;

  function show(el) {
    clearTimeout(hideTimer);
    tip.innerHTML = el.dataset.tip;
    const darkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
    tip.style.background = darkTheme ? '#e6eef4' : '#1a2332';
    tip.style.color      = darkTheme ? '#14202b' : '#e8f4f8';
    tip.style.border     = darkTheme ? '1px solid rgba(0,160,170,0.65)' : '1px solid rgba(0,188,188,0.35)';
    tip.style.boxShadow  = darkTheme ? '0 6px 22px rgba(0,0,0,0.65)' : '0 6px 20px rgba(0,0,0,0.45)';
    tip.style.display = 'block';

    tip.style.opacity = '0';
    tip.style.left = '0px';
    tip.style.top = '0px';

    requestAnimationFrame(() => {
      const tw = tip.offsetWidth;
      const th = tip.offsetHeight;
      const vw = window.innerWidth;
      const r = el.getBoundingClientRect();

      let left = r.left + r.width / 2 - tw / 2;
      left = Math.max(8, Math.min(left, vw - tw - 8));

      let top = r.top - th - 8;
      if (top < 8) top = r.bottom + 8;

      tip.style.left = left + 'px';
      tip.style.top = top + 'px';
      tip.style.opacity = '1';
    });
  }

  function hide() {
    hideTimer = setTimeout(() => {
      tip.style.opacity = '0';
      setTimeout(() => { tip.style.display = 'none'; }, 120);
    }, 80);
  }

  document.addEventListener('mouseover', e => {
    const el = e.target.closest('[data-tip]');
    if (el) show(el);
  });

  document.addEventListener('mouseout', e => {
    const el = e.target.closest('[data-tip]');
    if (el) hide();
  });

  // Touch screens: tap on an element with a tooltip shows it, tap elsewhere hides it
  document.addEventListener('click', e => {
    if (!window.matchMedia('(pointer: coarse)').matches) return;
    const el = e.target.closest('[data-tip]');
    if (el) show(el); else hide();
  });
}

const ZB_TIPS = {
  ru: {
    id: 'Номер устройства в таблице прошивки. Используется в сценариях, ' +
        'условиях и MQTT как идентификатор этого Zigbee-устройства. ' +
        'У многоканального устройства каждая конечная точка (EP) имеет свой ID.',
    ieee: '<b>IEEE-адрес</b> - уникальный 64-битный адрес Zigbee-устройства: 16 символов 0-9, a-f ' +
          '(например 0x00124b0012345678). Не меняется при пересопряжении.<br><br>' +
          '<b>Где найти:</b><br>' +
          '1. В веб-панели SLZB-06p7U: <b>Zigbee Hub - Zigbee devices</b>, колонка IEEE.<br>' +
          '2. В инструкции или на наклейке устройства (IEEE / MAC / EUI64).<br>' +
          '3. В любом другом месте, где показан адрес: Zigbee2MQTT, ZHA, другой Zigbee-шлюз.',
    type: 'Тип устройства: Socket (розетка/реле), Dimmer, Color (RGB/CCT), PIR (датчик движения), ' +
          'Sensor, Button (кнопка), Switch (выключатель). Multi - устройство с несколькими ' +
          'каналами (EP); нажмите на строку, чтобы раскрыть список.',
    info: 'Ваше пояснение к устройству (например, название комнаты или лампы). ' +
          'Текстовая метка, на работу устройства не влияет.',
    onoff: 'Текущее состояние устройства. Переключатель отправляет команду включения/выключения. ' +
           'У группы Multi переключатель в головной строке управляет всеми каналами сразу.',
    action: '<b>Управление</b> - настройки устройства, тип, яркость и цвет.<br>' +
            '<b>Обучение</b> - мастер обучения устройства (окно Learn).'
  },
  en: {
    id: 'Device number in the firmware table. Used in scenarios, ' +
        'conditions and MQTT as the identifier of this Zigbee device. ' +
        'A multi-channel device gets a separate ID for each endpoint (EP).',
    ieee: '<b>IEEE address</b> is the unique 64-bit Zigbee device address: 16 characters 0-9, a-f ' +
          '(for example 0x00124b0012345678). It does not change when you re-pair the device.<br><br>' +
          '<b>Where to find it:</b><br>' +
          '1. In the SLZB-06p7U web panel: <b>Zigbee Hub - Zigbee devices</b>, IEEE column.<br>' +
          '2. In the device manual or on its label (IEEE / MAC / EUI64).<br>' +
          '3. Anywhere else that shows the address: Zigbee2MQTT, ZHA, another Zigbee gateway.',
    type: 'Device type: Socket (plug/relay), Dimmer, Color (RGB/CCT), PIR (motion sensor), ' +
          'Sensor, Button, Switch. Multi is a device with several channels (EP); ' +
          'click the row to expand the list.',
    info: 'Your own note for the device (for example a room or lamp name). ' +
          'A text label, does not affect how the device works.',
    onoff: 'Current device state. The switch sends an on/off command. ' +
           'On a Multi group the switch in the head row controls all channels at once.',
    action: '<b>Control</b> - device settings, type, brightness and color.<br>' +
            '<b>Learn</b> - device learning wizard (Learn window).'
  }
};

export function TabZigbee({}) {
  const [devices, setDevices] = useState([]);
  const [language, setLanguage] = useState('ru');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [learnIeee, setLearnIeee] = useState(null);
  const [expandedGroups, setExpandedGroups] = useState({});
  const [loadState, setLoadState] = useState('loading');   // 'loading' | 'ok' | 'error'
  const pendingPosts = useRef(0);          // POST-запросов в очереди или в полёте
  const holdUntil = useRef(0);             // до этого момента ответы опроса не применяются
  const lastChangeTime = useRef(0);
  const serverSnapshot = useRef({});
  const dirtyIds = useRef(new Set());
  const pendingConfigSave = useRef(null);
  const modalOpenRef = useRef(false);
  const mounted = useRef(true);
  const lastVer = useRef(null);            // версия таблицы, которую страница уже загрузила
  const refreshing = useRef(false);        // идёт полная перезагрузка таблицы
  const refreshAgain = useRef(false);      // во время перезагрузки попросили ещё одну
  const refreshCtl = useRef(null);         // AbortController текущей перезагрузки
  const reloadAfterModal = useRef(false);  // таблицу нужно перечитать после закрытия окна
  const deferredTimer = useRef(null);
  const retryTimer = useRef(null);
  const retryCount = useRef(0);
  const closeTimer = useRef(null);
  const postChain = useRef(Promise.resolve());

  /* Идут ли сейчас наши изменения (POST в работе или недавно завершились) */
  const guardActive = () =>
    pendingPosts.current > 0 ||
    Date.now() < holdUntil.current ||
    (Date.now() - lastChangeTime.current < 3000);

  /* Все POST страницы идут строго по одному. Раньше переключение группы запускало
     N+1 параллельных POST (головная строка входит в группу и отправлялась дважды), а сервер
     закрывает соединение после каждого POST и держит не больше 5 соединений. Каждый запрос
     с таймаутом 8 с, чтобы зависший POST не блокировал очередь. */
  const enqueuePost = (url, body) => {
    const run = () => {
      const ctl = new AbortController();
      const t = setTimeout(() => ctl.abort(), 8000);
      return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: ctl.signal
      }).then(r => r.json()).finally(() => clearTimeout(t));
    };
    const p = postChain.current.then(run);
    postChain.current = p.catch(() => {});
    return p;
  };

  const clusterToDeviceType = (clusters, override) => {
    if (override === 7) return 'pir';
    if (override === 1) return 'socket';
    if (override === 2) return 'dimmer';
    if (override === 3) return 'dimmer';
    if (override === 4) return 'lamp';
    const cl = Array.isArray(clusters) ? clusters : [clusters || 6];
    if (cl.includes(768)) return 'lamp';
    if (cl.includes(8)) return 'dimmer';
    return 'socket';
  };

  const buildSnapshot = (d) => ({
    zbee_ieee: d.ieee || '',
    zbee_endpoint: d.ep || 1,
    clusters: d.clusters || [6],
    zbee_label: d.info || '',
    onoff: d.onoff || 0,
    brightness: d.brightness || 254,
    color_hex: d.color_hex || 0xFFAA00,
  });

  const normalizeDevice = (d) => ({
    id: d.id,
    zbee_ieee: (d.ieee || '').toLowerCase().trim(),
    zbee_endpoint: d.ep || 1,
    clusters: d.clusters || [6],
    zbee_device_type: d.type === 'pir' ? 'pir'
      : d.type === 'sensor' ? 'sensor'
      : (d.role === 3 ? 'trigger' : (d.role === 5 ? 'switch' : clusterToDeviceType(d.clusters, d.override))),
    zbee_label: d.info || '',
    onoff: d.onoff || 0,
    brightness: d.brightness || 254,
    color_hex: d.color_hex || 0xFFAA00,
    zbee_role: d.role || 0,
    ep: d.ep || 0,
    override: d.override || 0,
  });

  /* Применение загруженной таблицы */
  const applyData = (res) => {
    const zigbee = res.zigbee || [];
    setDevices(zigbee.map(normalizeDevice));
    if (res.lang) setLanguage(res.lang);
    const snap = {};
    zigbee.forEach(d => { snap[d.id] = buildSnapshot(d); });
    serverSnapshot.current = snap;
    dirtyIds.current.clear();
  };

  /* Полная загрузка: страницы по одной (см. fetchZigbeeAll). Раньше один запрос без параметров
     получал только первые 30 записей из 200, остальные устройства пропадали молча. */
  const refresh = async (signal) => {
    const res = await fetchZigbeeAll({ signal });
    if (signal && signal.aborted) return;
    if (res.ver !== undefined) lastVer.current = String(res.ver);
    applyData(res);
  };

  const scheduleRetry = () => {
    if (retryCount.current >= 3) {
      setLoadState(prev => (prev === 'ok' ? 'ok' : 'error'));
      return;
    }
    retryCount.current++;
    clearTimeout(retryTimer.current);
    retryTimer.current = setTimeout(() => refreshSafe(), 3000 * retryCount.current);
  };

  /* Безопасная перезагрузка: не запускается параллельно сама с собой (флаг "идёт" и флаг
     "повторить"), на время работы ставит опрос на паузу, не трогает таблицу при открытом окне
     управления. Повторы при ошибках ограничены тремя. */
  const refreshSafe = async () => {
    if (!mounted.current) return;
    if (modalOpenRef.current) { reloadAfterModal.current = true; return; }
    if (refreshing.current) { refreshAgain.current = true; return; }
    refreshing.current = true;
    pauseAll();
    const ctl = new AbortController();
    refreshCtl.current = ctl;
    try {
      do {
        refreshAgain.current = false;
        await refresh(ctl.signal);
      } while (refreshAgain.current && mounted.current && !ctl.signal.aborted);
      if (!ctl.signal.aborted) {
        retryCount.current = 0;
        setLoadState('ok');
      }
    } catch (err) {
      if (!ctl.signal.aborted) {
        console.error('Error fetching zigbee data:', err);
        lastVer.current = null;
        scheduleRetry();
      }
    } finally {
      refreshing.current = false;
      refreshCtl.current = null;
      resumeAll();
    }
  };

  /* Ответ опроса, пришедший во время наших изменений, нельзя просто выбросить: pollQueue уже
     запомнил его ETag и больше не вызовет колбэк, пока версия не изменится снова. Откладываем
     перезагрузку до конца защитного окна. */
  const scheduleDeferred = () => {
    if (deferredTimer.current) return;
    deferredTimer.current = setTimeout(() => {
      deferredTimer.current = null;
      if (!mounted.current) return;
      if (guardActive()) { scheduleDeferred(); return; }
      refreshSafe();
    }, 1000);
  };

  useEffect(() => { initGlobalTooltip(); }, []);

  useEffect(() => {
    mounted.current = true;
    let active = true;
    /* Опрос лёгкий: одна запись (limit=1) и ETag по версии таблицы. Версия "ver" в заголовке
       ответа покрывает ВСЮ таблицу, а не одну страницу. Первый ответ опроса (версия ещё не
       известна) запускает первую загрузку, отдельного refresh() при монтировании больше нет. */
    registerPoll('zigbee', '/api/zigbee/get?offset=0&limit=1', function(data) {
      if (!active) return;
      if (!data || !Array.isArray(data.zigbee)) return;
      /* Запасной вариант для прошивки без поля ver: сравнение первой записи и total */
      const sig = (data.ver !== undefined)
        ? String(data.ver)
        : JSON.stringify([data.total, data.zigbee]);
      if (sig === lastVer.current) return;
      if (guardActive()) { scheduleDeferred(); return; }
      if (data.ver === undefined) lastVer.current = sig;
      refreshSafe();
    }, { immediate: true });

    /* Страховка: если опрос не доставил первый ответ (три ошибки подряд снимают запись
       из очереди), загрузка всё равно стартует */
    const startGuard = setTimeout(() => {
      if (active && lastVer.current === null && !refreshing.current) refreshSafe();
    }, 6000);

    return () => {
      active = false;
      mounted.current = false;
      clearTimeout(startGuard);
      clearTimeout(deferredTimer.current);
      clearTimeout(retryTimer.current);
      clearTimeout(closeTimer.current);
      if (refreshCtl.current) refreshCtl.current.abort();
      unregisterPoll('zigbee');
    };
  }, []);

  const handleToggle = (device, onoff) => {
    const updated = { ...device, onoff: onoff ? 1 : 0 };
    setDevices(prev => prev.map(d => d.id === device.id ? updated : d));
    pendingPosts.current++;
    lastChangeTime.current = Date.now();

    /* Master enable/disable — только onoff, без MQTT-команды */
    enqueuePost('/api/zigbee/enable', { id: device.id, onoff: onoff ? 1 : 0 })
      .catch(err => console.error('Error toggling zigbee device:', err))
      .finally(() => {
        pendingPosts.current--;
        holdUntil.current = Date.now() + 1500;
      });
  };

  const toggleGroup = (ieee) => {
    setExpandedGroups(prev => ({ ...prev, [ieee]: !prev[ieee] }));
  };

  const handleEdit = (device) => {
    const displayId = device.display_id || device.id;
    setSelectedDevice({ ...device, displayId });
    setIsModalOpen(true);
    modalOpenRef.current = true;
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDevice(null);
    modalOpenRef.current = false;
    /* Перечитываем таблицу только если в окне что-то менялось или пока оно было открыто пришла
       новая версия. Задержка больше 300 мс отложенной отправки в окне, чтобы чтение не обогнало запись. */
    if (reloadAfterModal.current) {
      reloadAfterModal.current = false;
      clearTimeout(closeTimer.current);
      closeTimer.current = setTimeout(() => {
        if (guardActive()) scheduleDeferred(); else refreshSafe();
      }, 600);
    }
  };

  const handleDeviceUpdate = (updatedDevice) => {
    reloadAfterModal.current = true;
    const snap = serverSnapshot.current[updatedDevice.id] || {};
    const typeToClusters = { socket: [6], dimmer: [6, 8], lamp: [6, 8, 768] };
    const clusters = updatedDevice.clusters || typeToClusters[updatedDevice.zbee_device_type] || [6];

    const cur = {
      zbee_ieee: updatedDevice.zbee_ieee || '',
      zbee_endpoint: parseInt(updatedDevice.zbee_endpoint) || 1,
      clusters: clusters,
      zbee_label: updatedDevice.zbee_label || '',
      onoff: updatedDevice.onoff || 0,
      brightness: updatedDevice.brightness,
      color: updatedDevice.color,
      color_hex: updatedDevice.color_hex,
    };

    const clustersEqual = (a, b) => {
      const sa = Array.isArray(a) ? [...a].sort() : [a || 6];
      const sb = Array.isArray(b) ? [...b].sort() : [b || 6];
      return sa.length === sb.length && sa.every((v, i) => v === sb[i]);
    };

    const onoffChanged = cur.onoff !== snap.onoff;
    const configChanged =
      cur.zbee_ieee !== snap.zbee_ieee ||
      String(cur.zbee_endpoint) !== String(snap.zbee_endpoint) ||
      !clustersEqual(cur.clusters, snap.clusters) ||
      cur.zbee_label !== snap.zbee_label ||
      cur.brightness !== snap.brightness ||
      cur.color_hex !== snap.color_hex;

    if (!onoffChanged && !configChanged) return;

    lastChangeTime.current = Date.now();
    setDevices(prev => prev.map(d => d.id === updatedDevice.id ? updatedDevice : d));

    /* Запросы идут по очереди (command, затем set), а не параллельно */
    const track = (p) => {
      pendingPosts.current++;
      p.catch(err => console.error('Error saving zigbee device:', err))
        .finally(() => {
          pendingPosts.current--;
          holdUntil.current = Date.now() + 1500;
        });
    };

    if (onoffChanged) {
      /* Физическое управление — MQTT-команда, без master enable */
      track(enqueuePost('/api/zigbee/command', { id: updatedDevice.id, onoff: cur.onoff }));
    }

    if (configChanged) {
      track(enqueuePost('/api/zigbee/set', {
        id: updatedDevice.id,
        ieee: cur.zbee_ieee,
        ep: cur.zbee_endpoint,
        clusters: JSON.stringify(cur.clusters),
        info: cur.zbee_label,
        ...(cur.brightness !== snap.brightness && { brightness: cur.brightness }),
        ...(cur.color_hex !== snap.color_hex && { color_hex: cur.color_hex }),
        override: updatedDevice.override
      }));
    }

    dirtyIds.current.delete(updatedDevice.id);
    serverSnapshot.current[updatedDevice.id] = { ...cur };
    setTimeout(() => { lastChangeTime.current = 0; }, 3000);
  };

  const handleRescan = (device) => {
    reloadAfterModal.current = true;
    enqueuePost('/api/zigbee/rescan', { id: device.id })
      .then(() => {
        /* Сбрасываем тип устройства до определения зонда */
        setDevices(prev => prev.map(d =>
          d.id === device.id ? { ...d, clusters: [6], zbee_device_type: 'socket' } : d
        ));
      })
      .catch(err => console.error('Error triggering rescan:', err));
  };

  const getDeviceTypeLabel = (deviceType) => {
    switch (deviceType) {
      case 'lamp': return 'Лампа (яркость + цвет)';
      case 'dimmer': return 'Лампа (яркость)';
      case 'trigger': return 'Button';
      case 'switch': return 'Switch';
      case 'pir': return 'PIR';
      case 'sensor': return 'Sensor';
      default: return 'Socket';
    }
  };

  const Th = ({ title, tip }) => html`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${ZB_TIPS[language === 'en' ? 'en' : 'ru'][tip]}
    >${title}</th>`;

  if (!devices.length) return html`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col justify-start items-center" style="overflow-anchor:none;">
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-2 drop-shadow-sm tracking-tight uppercase">
          Zigbee Devices
        </div>
        <p class="text-sm text-slate-600 mb-6 max-w-3xl">${language === 'ru' ? 'Беспроводная кнопка у кровати гасит лампу на кухне, и без единого провода. Здесь собраны ваши Zigbee-устройства: лампочки, розетки, датчики. Видно их состояние, ими можно управлять и учить новому.' : 'A wireless button by your bed turns off the kitchen lamp, with no wire at all. Your Zigbee devices live here: bulbs, plugs, sensors. See their state, control them and teach them new tricks.'}</p>
        <div class="text-center text-slate-500 text-lg py-12">
          ${loadState === 'loading'
            ? (language === 'ru' ? 'Загрузка...' : 'Loading...')
            : loadState === 'error'
              ? (language === 'ru' ? 'Не удалось загрузить список устройств. Проверьте связь с контроллером.' : 'Failed to load the device list. Check the connection to the controller.')
              : (language === 'ru' ? 'Нет настроенных Zigbee устройств. Добавьте их на странице Select pin.' : 'No Zigbee devices configured. Add them on the Select pin page.')}
        </div>
      </div>

      <div class="w-full flex justify-between items-center mb-4 mt-6 bg-white/40 backdrop-blur-md border border-white/60 p-4 rounded-2xl relative z-10">
        <button class="px-8 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-teal-400 to-cyan-500" onclick=${(e) => { lockToggle(e); setShowHelp(!showHelp); }}>
          ${showHelp ? (language === 'ru' ? 'Скрыть справку' : 'Hide Help') : (language === 'ru' ? 'Показать справку' : 'Show Help')}
        </button>
      </div>
      ${showHelp && html`<${HelpBox} language=${language} class="mt-2 relative z-10">${HELP_CONTENT[language] || HELP_CONTENT['en']}<//>`}
    </div>
  `;

  return html`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col justify-start items-center" style="overflow-anchor:none;">
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      
      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-2 drop-shadow-sm tracking-tight uppercase">
          Zigbee Devices
        </div>
        <p class="text-sm text-slate-600 mb-6 max-w-3xl">${language === 'ru' ? 'Беспроводная кнопка у кровати гасит лампу на кухне, и без единого провода. Здесь собраны ваши Zigbee-устройства: лампочки, розетки, датчики. Видно их состояние, ими можно управлять и учить новому.' : 'A wireless button by your bed turns off the kitchen lamp, with no wire at all. Your Zigbee devices live here: bulbs, plugs, sensors. See their state, control them and teach them new tricks.'}</p>
        
        <div class="flex-grow flex flex-col justify-center items-center w-full">
          <div class="w-full">
            <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6 overflow-auto">
              <div class="overflow-x-auto w-full">
                <table class="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <${Th} title="ID" tip="id" />
                      <${Th} title="IEEE Address" tip="ieee" />
                      <${Th} title="Type" tip="type" />
                      <${Th} title="Info" tip="info" />
                      <${Th} title="On/Off" tip="onoff" />
                      <${Th} title="Action" tip="action" />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/40">
                    ${(() => {
                      /* Группировка: { ieee → [device, ...] } */
                      const groups = {};
                      devices.forEach(d => {
                        const ieeeKey = (d.zbee_ieee || '').toLowerCase().trim();
                        if (!groups[ieeeKey]) groups[ieeeKey] = [];
                        groups[ieeeKey].push(d);
                      });

                      const rows = [];
                      Object.values(groups).forEach(group => {
                        const head = group[0];
                        const hasMultiDp = group.length > 1;
                        const deviceType = head.zbee_device_type || 'socket';
                        const typeLabel = hasMultiDp ? 'Multi' : deviceType;

                        /* Головная строка */
                        const isExpanded = !!expandedGroups[head.zbee_ieee];
                        rows.push(html`
                          <tr class="hover:bg-slate-200/80 transition-colors bg-white/80 ${hasMultiDp ? 'cursor-pointer' : ''}"
                              onClick=${hasMultiDp ? () => toggleGroup(head.zbee_ieee) : undefined}>
                            <td class="px-6 py-2 text-sm text-slate-800" style="position:relative">
                              ${hasMultiDp ? html`<span style="position:absolute;left:60px" class="text-slate-500">${isExpanded ? '▼' : '▶'}</span>` : ''}${head.display_id || head.id}
                            </td>
                            <td class="px-6 py-2 text-sm text-slate-800 font-mono">
                              ${head.zbee_ieee || '—'}${hasMultiDp ? html`<span class="text-xs text-slate-400 font-sans ml-1.5">(EP${head.ep || 1})</span>` : ''}
                            </td>
                            <td class="px-6 py-2 text-sm text-slate-700">
                              ${hasMultiDp
                                ? html`Multi <span class="text-xs text-slate-400">×${group.length}</span>`
                                : getDeviceTypeLabel(typeLabel)}
                            </td>
                            <td class="px-6 py-2 text-sm text-slate-600">${head.zbee_label || ''}</td>
                            <td class="px-6 py-2" onClick=${(e) => e.stopPropagation()}>
                              <${MyPolzunok} value=${head.onoff || 0} disabled=${dirtyIds.current.has(head.id)} onChange=${(val) => {
                                /* Группа включает головную строку: каждый слот переключается один раз */
                                if (hasMultiDp) {
                                  group.forEach(d => {
                                    handleToggle(d, val === 1);
                                  });
                                } else {
                                  handleToggle(head, val);
                                }
                              }} />
                            </td>
                            <td class="px-6 py-2 text-sm flex gap-2" onClick=${(e) => e.stopPropagation()}>
                              <button
                                onClick=${() => handleEdit(head)}
                                class="px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600"
                              >
                                ${language === 'ru' ? 'Управление' : 'Control'}
                              </button>
                              <button
                                onClick=${() => setLearnIeee(head.zbee_ieee)}
                                style="background: linear-gradient(to right, #6366f1, #8b5cf6);"
                                class="px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 hover:opacity-90"
                              >
                                ${language === 'ru' ? 'Обучение' : 'Learn'}
                              </button>
                            </td>
                          </tr>
                        `);

                        /* Sub-строки для мульти-EP */
                        if (hasMultiDp && isExpanded) {
                          group.slice(1).forEach((d, idx) => {
                            const subType = d.zbee_device_type === 'pir' ? 'PIR'
                                          : d.zbee_device_type === 'sensor' ? 'Sensor'
                                          : d.zbee_device_type === 'trigger' ? 'Button'
                                          : d.zbee_device_type === 'switch' ? 'Switch'
                                          : (d.clusters || []).includes(768) ? 'Color'
                                          : (d.clusters || []).includes(8) ? 'Dimmer'
                                          : 'On/Off';
                            rows.push(html`
                              <tr class="hover:bg-slate-200/80 transition-colors bg-white/60"
                                  style="font-size:0.9em;">
                                <td class="px-6 py-2 text-sm font-mono"
                                    style="padding-left:var(--zb-indent, 60px); color:#6b7fa3;">${d.display_id || d.id}</td>
                                <td class="px-6 py-2 text-sm font-mono"
                                    style="border-left:3px solid var(--accent-color, #06b6d4); padding-left:var(--zb-indent, 60px); color:#6b7fa3;">↳ EP${d.ep}</td>
                                <td class="px-6 py-2 text-sm" style="padding-left:var(--zb-indent, 60px); color:#6b7fa3;">${subType}</td>
                                <td class="px-6 py-2 text-sm" style="padding-left:var(--zb-indent, 60px); color:#6b7fa3;">${d.zbee_label || ''}</td>
                                <td class="px-6 py-2" style="padding-left:var(--zb-indent, 60px);">
                                  <${MyPolzunok} value=${d.onoff || 0} disabled=${(head.onoff || 0) === 0 || dirtyIds.current.has(d.id)} activeColor="linear-gradient(to right, #5b7093, #8599b8)" onChange=${(val) => handleToggle(d, val)} />
                                </td>
                                <td class="px-6 py-2 text-sm">
                                </td>
                              </tr>
                            `);
                          });
                        }
                      });
                      return rows;
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      ${isModalOpen && selectedDevice && html`
        <${ModalZigbee}
          device=${selectedDevice}
          allDevices=${devices}
          onClose=${closeModal}
          onUpdate=${handleDeviceUpdate}
          onRescan=${handleRescan}
          onTouched=${() => { reloadAfterModal.current = true; }}
          language=${language}
        />
      `}

      ${learnIeee && html`
        <${ModalLearn}
          ieee=${learnIeee}
          language=${language}
          existingLabels=${devices
            .filter(d => (d.zbee_ieee || '').toLowerCase() === (learnIeee || '').toLowerCase())
            .map(d => ({ ep: d.ep, info: d.zbee_label }))}
          onClose=${() => setLearnIeee(null)}
          onSaved=${() => {
            setLearnIeee(null);
            refreshSafe();
          }}
          onGoToButtonPin=${() => {
            setLearnIeee(null);
            window.location.href = '/#/button';
          }}
        />
      `}

      <div class="w-full flex justify-between items-center mb-4 mt-6 bg-white/40 backdrop-blur-md border border-white/60 p-4 rounded-2xl">
        <button class="px-8 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-teal-400 to-cyan-500" onclick=${(e) => { lockToggle(e); setShowHelp(!showHelp); }}>
          ${showHelp ? (language === 'ru' ? 'Скрыть справку' : 'Hide Help') : (language === 'ru' ? 'Показать справку' : 'Show Help')}
        </button>
      </div>
      ${showHelp && html`<${HelpBox} language=${language} class="mt-2">${HELP_CONTENT[language] || HELP_CONTENT['en']}<//>`}
    </div>
  `;
}