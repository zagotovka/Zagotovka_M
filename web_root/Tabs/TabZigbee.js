import { lockToggle } from '../helpLock.js';
import { h, useState, useEffect, useRef, html } from '../bundle.js';
import { registerPoll, unregisterPoll } from '../pollQueue.js';
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
            <li>Вернитесь на эту страницу: в таблице появится строка с ID, начиная с 89. Нажмите <b>«Обучение»</b>, подействуйте на устройство (нажмите кнопку, покрутите диммер), опишите появившиеся строки и нажмите <b>«Сохранить»</b>.</li>
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
            <p class="mb-2">На этой странице отображаются все Zigbee-устройства, добавленные на странице <b>Select pin(s)</b> (режим <b>Zigbee</b>, поля <b>IEEE Address</b> и <b>Info</b>). ID Zigbee-устройств начинаются с 89.</p>
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
          <p class="mb-2">Четыре истории о том, как беспроводные устройства становятся частью вашего дома. ID в них условные.</p>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Выключатель, которого не было в стене</p>
            <p class="mb-1">Вы лежите в кровати и вспоминаете: на кухне горит лампа. Вставать не хочется, а выключатель у двери, на другом конце комнаты. Тянуть провод - ремонт на выходные.</p>
            <p class="mb-1">Спокойно! Беспроводную кнопку Zigbee можно приклеить прямо у кровати. Нажмите <b>«Обучение»</b>, нажмите кнопку, выберите роль <b>Кнопка</b> и тип <b>Одиночное</b>, нажмите <b>«Сохранить»</b>. Затем на странице <b>Button(s) pin(s)</b> в поле SINGLE CLICK этой кнопки впишите <code>${'93:2'}</code>, где 93 - лампа на кухне.</p>
            <p class="mb-1"><b>Результат:</b> одно нажатие у изголовья переключает лампу на кухне, и без единого провода.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Ребёнок нажимает все клавиши подряд</p>
            <p class="mb-1">Трёхклавишный Zigbee-выключатель в детской, и малыш уже нашёл, что клавиши щёлкают. Свет мигает, вы вздрагиваете от каждого щелчка.</p>
            <p class="mb-1">Спокойно! Такой выключатель образует группу <b>Multi</b>: головная строка 93 и вложенные 93.1, 93.2, 93.3. Ползунок <b>On/Off</b> головной строки отключает всю группу сразу. Можно и с телефона: SMS <code>${'93#00*'}</code>, номер должен быть тем, что указан в настройках SIM800L.</p>
            <p class="mb-1"><b>Результат:</b> клавиши перестают действовать. Когда малыш подрастёт, включите группу обратно ползунком или SMS <code>${'93#11*'}</code>.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Диммер, который не знал своих границ</p>
            <p class="mb-1">Купили Zigbee-крутилку для света. Крутите её, а что именно она посылает контроллеру - непонятно. Не хочется гадать с цифрами.</p>
            <p class="mb-1">Спокойно! Откройте <b>«Обучение»</b>: в окне есть блок <b>Определение диапазона диммера</b>. Покрутите регулятор до минимума и до максимума, и границы определятся автоматически.</p>
            <p class="mb-1"><b>Результат:</b> контроллер знает диапазон вашей крутилки, и вы можете спокойно связывать её с диммируемой лампой.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Пока ходили за чаем, окно закрылось</p>
            <p class="mb-1">Вы начали обучать датчик, нажали на нём пару функций, отошли налить чаю, а вернувшись, видите: сессия закончилась. Неужели всё сначала?</p>
            <p class="mb-1">Спокойно! Сессия обучения останавливается, если с устройством ничего не происходило 15 минут, но уже увиденные строки остаются в таблице. Нажмите <b>«Повторить»</b>, и сессия стартует заново.</p>
            <p class="mb-1"><b>Результат:</b> ничего не потеряно: опишите строки, нажмите <b>«Сохранить»</b> и продолжайте.</p>
          </div>
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
            <li>Come back to this page: a row with an ID starting from 89 appears in the table. Press <b>Learn</b>, act on the device (press a button, turn a dimmer), describe the rows that appear and press <b>Save</b>.</li>
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
            <p class="mb-2">This page shows all Zigbee devices added on the <b>Select pin(s)</b> page (mode <b>Zigbee</b>, fields <b>IEEE Address</b> and <b>Info</b>). Zigbee device IDs start at 89.</p>
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
          <p class="mb-2">Four stories about how wireless devices become part of your home. The IDs in them are made up.</p>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">A switch that was never in the wall</p>
            <p class="mb-1">You lie in bed and suddenly remember: the kitchen lamp is still on. You do not feel like getting up, and the switch is by the door on the other side of the room. Running a wire is a weekend renovation.</p>
            <p class="mb-1">Relax! A wireless Zigbee button can be stuck right by the bed. Press <b>Learn</b>, press the button, choose the role <b>Button</b> and the type <b>Single click</b>, press <b>Save</b>. Then on the <b>Button(s) pin(s)</b> page type <code>${'93:2'}</code> into the SINGLE CLICK field of this button, where 93 is the kitchen lamp.</p>
            <p class="mb-1"><b>Result:</b> one press at the bedside toggles the kitchen lamp, with no wire at all.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">The child presses all the keys in a row</p>
            <p class="mb-1">A three-key Zigbee switch in the nursery, and the little one has already found out that the keys click. The light flickers, and you flinch at every click.</p>
            <p class="mb-1">Relax! Such a switch forms a <b>Multi</b> group: the head row 93 and the child rows 93.1, 93.2, 93.3. The <b>On/Off</b> slider of the head row turns off the whole group at once. You can also do it from the phone: SMS <code>${'93#00*'}</code>, sent from the number set in the SIM800L settings.</p>
            <p class="mb-1"><b>Result:</b> the keys stop working. When the little one grows up, turn the group back on with the slider or with SMS <code>${'93#11*'}</code>.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">A dimmer that did not know its limits</p>
            <p class="mb-1">You bought a Zigbee knob for the light. You turn it, but what exactly it sends to the controller is a mystery. You do not want to guess with numbers.</p>
            <p class="mb-1">Relax! Open <b>Learn</b>: the window has a <b>Dimmer range detection</b> block. Turn the knob to the minimum and to the maximum, and the limits are detected automatically.</p>
            <p class="mb-1"><b>Result:</b> the controller knows the range of your knob, and you can safely link it with a dimmable lamp.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">The window closed while you fetched tea</p>
            <p class="mb-1">You started learning a sensor, triggered a couple of functions, walked off to pour some tea, and when you come back the session is over. Do you have to start from scratch?</p>
            <p class="mb-1">Relax! The learning session stops if nothing happened with the device for 15 minutes, but the rows already observed stay in the table. Press <b>Retry</b> and the session starts again.</p>
            <p class="mb-1"><b>Result:</b> nothing is lost: describe the rows, press <b>Save</b> and carry on.</p>
          </div>
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

export function TabZigbee({}) {
  const [devices, setDevices] = useState([]);
  const [language, setLanguage] = useState('ru');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [learnIeee, setLearnIeee] = useState(null);
  const [expandedGroups, setExpandedGroups] = useState({});
  const isPending = useRef(false);
  const lastChangeTime = useRef(0);
  const serverSnapshot = useRef({});
  const dirtyIds = useRef(new Set());
  const pendingConfigSave = useRef(null);
  const modalOpenRef = useRef(false);

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

  const refresh = () =>
    fetch('/api/zigbee/get', { cache: 'no-store' })
      .then(r => r.json())
      .then(r => {
        const zigbee = r.zigbee || [];
        const normalized = zigbee.map(normalizeDevice);
        setDevices(normalized);
        setLanguage(r.lang || 'ru');
        const snap = {};
        zigbee.forEach(d => { snap[d.id] = buildSnapshot(d); });
        serverSnapshot.current = snap;
        dirtyIds.current.clear();
      })
      .catch(err => console.error('Error fetching zigbee data:', err));

  useEffect(() => {
    refresh();
    let active = true;
    registerPoll('zigbee', '/api/zigbee/get', function(data) {
      if (!active) return;
      if (isPending.current) return;
      if (Date.now() - lastChangeTime.current < 3000) return;
      if (data) {
        const zigbee = data.zigbee || [];
        const normalized = zigbee.map(normalizeDevice);
        const snap = {};
        zigbee.forEach(d => { snap[d.id] = buildSnapshot(d); });
        serverSnapshot.current = snap;

        if (!modalOpenRef.current) {
          setDevices(normalized);
          setLanguage(data.lang || 'ru');
          dirtyIds.current.clear();
          setSelectedDevice(prev => {
            if (!prev) return null;
            const updated = normalized.find(d => d.id === prev.id);
            return updated || prev;
          });
        }
      }
    });
    return () => { active = false; unregisterPoll('zigbee'); };
  }, []);

  const handleToggle = (device, onoff) => {
    const updated = { ...device, onoff: onoff ? 1 : 0 };
    setDevices(prev => prev.map(d => d.id === device.id ? updated : d));
    isPending.current = true;
    lastChangeTime.current = Date.now();

    /* Master enable/disable — только onoff, без MQTT-команды */
    fetch('/api/zigbee/enable', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: device.id, onoff: onoff ? 1 : 0 })
    })
      .then(r => r.json())
      .finally(() => {
        setTimeout(() => { isPending.current = false; }, 1500);
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
    setTimeout(() => refresh(), 300);
  };

  const handleDeviceUpdate = (updatedDevice) => {
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

    if (onoffChanged) {
      /* Физическое управление — MQTT-команда, без master enable */
      fetch('/api/zigbee/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: updatedDevice.id, onoff: cur.onoff })
      }).catch(err => console.error('Error sending command:', err));
    }

    if (configChanged) {
      fetch('/api/zigbee/set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: updatedDevice.id,
          ieee: cur.zbee_ieee,
          ep: cur.zbee_endpoint,
          clusters: JSON.stringify(cur.clusters),
          info: cur.zbee_label,
          ...(cur.brightness !== snap.brightness && { brightness: cur.brightness }),
          ...(cur.color_hex !== snap.color_hex && { color_hex: cur.color_hex }),
          override: updatedDevice.override
        })
      }).catch(err => console.error('Error saving config:', err));
    }

    dirtyIds.current.delete(updatedDevice.id);
    serverSnapshot.current[updatedDevice.id] = { ...cur };
    setTimeout(() => { lastChangeTime.current = 0; }, 3000);
  };

  const handleRescan = (device) => {
    fetch('/api/zigbee/rescan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: device.id })
    })
      .then(r => r.json())
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

  const Th = ({ title }) => html`<th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide">${title}</th>`;

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
          ${language === 'ru' ? 'Нет настроенных Zigbee устройств. Добавьте их на странице Select pin.' : 'No Zigbee devices configured. Add them on the Select pin page.'}
        </div>
      </div>

      <div class="w-full flex justify-between items-center mb-4 mt-6 bg-white/40 backdrop-blur-md border border-white/60 p-4 rounded-2xl relative z-10">
        <button class="px-8 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-teal-400 to-cyan-500" onclick=${(e) => { lockToggle(e); setShowHelp(!showHelp); }}>
          ${showHelp ? (language === 'ru' ? 'Скрыть справку' : 'Hide Help') : (language === 'ru' ? 'Показать справку' : 'Show Help')}
        </button>
      </div>
      ${showHelp && html`<div class="mt-2 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner w-full relative z-10" style="max-height:70vh;max-height:70dvh;overflow-y:auto;">${HELP_CONTENT[language] || HELP_CONTENT['en']}</div>`}
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
                      <${Th} title="ID" />
                      <${Th} title="IEEE Address" />
                      <${Th} title="Type" />
                      <${Th} title="Info" />
                      <${Th} title="On/Off" />
                      <${Th} title="Action" />
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
                                if (hasMultiDp) {
                                  group.forEach(d => {
                                    handleToggle(d, val === 1);
                                  });
                                }
                                handleToggle(head, val);
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
            refresh();
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
      ${showHelp && html`<div class="mt-2 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner w-full" style="max-height:70vh;max-height:70dvh;overflow-y:auto;">${HELP_CONTENT[language] || HELP_CONTENT['en']}</div>`}
    </div>
  `;
}