// condHelp.js - общий блок справки об условиях: таблицы «слова» и «знаки».
// Один текст на RU и EN для вкладок Switch, Button, Encoder, Cron.
import { html } from './bundle.js';

export function condWordsSigns(isRu) {
  return isRu ? html`
<h4 class="text-lg font-bold text-black mt-4 mb-2">Из чего строится условие (слова)</h4>
<p class="mb-2">Число после буквы - это <b>ID</b> устройства из таблицы на соответствующей странице.</p>
<table class="w-full mb-3 bg-white/70">
<thead>
<tr>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Запись</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Как читать</th>
</tr>
</thead>
<tbody>
<tr><td class="border px-4 py-2 whitespace-nowrap">Буквы</td><td class="border px-4 py-2">Буквы в условии: D - состояние устройства (выход на пине DEVICE, PWM или Zigbee-устройство), DV - значение диммера, B - кнопка (BU - не нажата, BH - удерживается), T - температурный датчик, H - датчик влажности, Sr / Ss - день / ночь, C - ссылка на ячейку библиотеки. Прежние буквы R и RV тоже работают.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'D5'}</code></td><td class="border px-4 py-2">Устройство (пин DEVICE) с ID 5 сейчас ВКЛючено. Для Zigbee-устройства - оно включено.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'!D5'}</code></td><td class="border px-4 py-2">Пин с ID 5 сейчас ВЫКЛючен (знак ! означает «НЕ»).</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3>0'}</code></td><td class="border px-4 py-2">Диммер (ШИМ) с ID 3 светит (значение больше нуля). Для Zigbee - яркость устройства.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3=100'}</code></td><td class="border px-4 py-2">Значение диммера 3 ровно 100. У ШИМ-диммера шкала 0-100 (проценты), поэтому это полная яркость. Для Zigbee - значение, которое отдаёт само устройство.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3g50'}</code></td><td class="border px-4 py-2">Значение диммера 3 равно 50 или БОЛЬШЕ (буква g - «greater», то же, что >=).</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3l50'}</code></td><td class="border px-4 py-2">Значение диммера 3 равно 50 или МЕНЬШЕ (буква l - «less», то же, что ${'<='}).</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'B1'}</code></td><td class="border px-4 py-2">Кнопка с ID 1 сейчас нажата.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'BU1'}</code></td><td class="border px-4 py-2">Кнопка с ID 1 сейчас НЕ нажата.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'BH1'}</code></td><td class="border px-4 py-2">Кнопка с ID 1 сейчас удерживается (долгое нажатие).</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5>25.5'}</code></td><td class="border px-4 py-2">Температура датчика 5 больше 25.5 градусов.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5<10'}</code></td><td class="border px-4 py-2">Температура датчика 5 меньше 10 градусов.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5.2>25.5'}</code></td><td class="border px-4 py-2">Температура второго датчика на шине DS18B20 пина 5 больше 25.5 градусов (.2 - номер датчика на шине; без .номер берётся первый исправный).</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'H4>50'}</code></td><td class="border px-4 py-2">Влажность датчика 4 больше 50 процентов.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'H4<30'}</code></td><td class="border px-4 py-2">Влажность датчика 4 меньше 30 процентов.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Sr'}</code></td><td class="border px-4 py-2">День (Sunrise): сейчас время между восходом и закатом. Берётся из времени восхода/заката в «Global Settings».</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Ss'}</code></td><td class="border px-4 py-2">Ночь (Sunset): сейчас время между закатом и восходом. Если время восхода/заката не настроено, Sr и Ss оба считаются НЕТ.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'C3'}</code></td><td class="border px-4 py-2">Подставить готовое условие из ячейки C3. Вложенность - не глубже двух уровней.</td></tr>
</tbody>
</table>
<h4 class="text-lg font-bold text-black mt-4 mb-2">Чем соединять слова (знаки)</h4>
<table class="w-full mb-3 bg-white/70">
<thead>
<tr>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Знак</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Смысл</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Пример и как читать</th>
</tr>
</thead>
<tbody>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'&'}</code></td><td class="border px-4 py-2">И (нужно, чтобы выполнились ОБА)</td><td class="border px-4 py-2"><code>${'D1&D2'}</code> - устройство 1 включено И устройство 2 включено</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'|'}</code></td><td class="border px-4 py-2">ИЛИ (достаточно ОДНОГО)</td><td class="border px-4 py-2"><code>${'D1|D2'}</code> - включено устройство 1 ИЛИ устройство 2 (или оба)</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'!'}</code></td><td class="border px-4 py-2">НЕ (наоборот)</td><td class="border px-4 py-2"><code>${'!D1'}</code> - устройство 1 выключено; <code>${'!(D1&D2)'}</code> - неверно, что включены оба сразу</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'( )'}</code></td><td class="border px-4 py-2">Скобки - что считать первым</td><td class="border px-4 py-2"><code>${'(D1|D2)&!D3'}</code> - (устройство 1 или устройство 2) И устройство 3 выключено</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'= > < g l'}</code></td><td class="border px-4 py-2">Равно, больше, меньше; g - больше или равно, l - меньше или равно (можно писать и ${'>='}, ${'<='})</td><td class="border px-4 py-2"><code>${'T5>25.5'}</code>, <code>${'DV3=100'}</code>, <code>${'DV3l50'}</code></td></tr>
</tbody>
</table>
<p class="mb-3 text-slate-700">Совет: если в одном условии смешиваете & и |, всегда ставьте скобки. Без скобок порядок такой: сначала !, потом &, потом | (то есть <code>${'D1|D2&D3'}</code> читается как <code>${'D1|(D2&D3)'}</code>). Числа у температуры и влажности пишутся как обычно: <code>${'T5>25'}</code> и <code>${'T5>25.0'}</code> - одно и то же, после точки допускается одна цифра.</p>
` : html`
<h4 class="text-lg font-bold text-black mt-4 mb-2">What a condition is made of (words)</h4>
<p class="mb-2">The number after the letter is the device <b>ID</b> from the table on the corresponding page.</p>
<table class="w-full mb-3 bg-white/70">
<thead>
<tr>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Entry</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">How to read it</th>
</tr>
</thead>
<tbody>
<tr><td class="border px-4 py-2 whitespace-nowrap">Letters</td><td class="border px-4 py-2">Letters in a condition: D - device state (output on a DEVICE pin, PWM or Zigbee device), DV - dimmer value, B - button (BU - not pressed, BH - held), T - temperature sensor, H - humidity sensor, Sr / Ss - day / night, C - reference to a library cell. The old letters R and RV still work.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'D5'}</code></td><td class="border px-4 py-2">The device (DEVICE pin) with ID 5 is ON right now. For a Zigbee device - it is on.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'!D5'}</code></td><td class="border px-4 py-2">The pin with ID 5 is OFF right now (the ! sign means "NOT").</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3>0'}</code></td><td class="border px-4 py-2">Dimmer (PWM) with ID 3 is lit (value greater than zero). For Zigbee - the device brightness.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3=100'}</code></td><td class="border px-4 py-2">Dimmer 3 value is exactly 100. A PWM dimmer uses a 0-100 scale (percent), so this is full brightness. For Zigbee - the value reported by the device itself.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3g50'}</code></td><td class="border px-4 py-2">Dimmer 3 value is 50 or GREATER (letter g = "greater", same as >=).</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'DV3l50'}</code></td><td class="border px-4 py-2">Dimmer 3 value is 50 or LESS (letter l = "less", same as ${'<='}).</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'B1'}</code></td><td class="border px-4 py-2">Button with ID 1 is pressed right now.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'BU1'}</code></td><td class="border px-4 py-2">Button with ID 1 is NOT pressed right now.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'BH1'}</code></td><td class="border px-4 py-2">Button with ID 1 is being held (long press).</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5>25.5'}</code></td><td class="border px-4 py-2">Temperature of sensor 5 is above 25.5 degrees.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5<10'}</code></td><td class="border px-4 py-2">Temperature of sensor 5 is below 10 degrees.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'T5.2>25.5'}</code></td><td class="border px-4 py-2">Temperature of the second DS18B20 sensor on the bus of pin 5 is above 25.5 degrees (.2 is the sensor number on the bus; without .number the first working sensor is used).</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'H4>50'}</code></td><td class="border px-4 py-2">Humidity of sensor 4 is above 50 percent.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'H4<30'}</code></td><td class="border px-4 py-2">Humidity of sensor 4 is below 30 percent.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Sr'}</code></td><td class="border px-4 py-2">Daytime (Sunrise): it is now between sunrise and sunset. The times are taken from the sunrise/sunset values in "Global Settings".</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'Ss'}</code></td><td class="border px-4 py-2">Night (Sunset): it is now between sunset and sunrise. If the sunrise/sunset times are not set, both Sr and Ss count as NO.</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'C3'}</code></td><td class="border px-4 py-2">Insert the ready-made condition from cell C3. Nesting - no deeper than two levels.</td></tr>
</tbody>
</table>
<h4 class="text-lg font-bold text-black mt-4 mb-2">What joins the words (signs)</h4>
<table class="w-full mb-3 bg-white/70">
<thead>
<tr>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Sign</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Meaning</th>
<th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Example and how to read it</th>
</tr>
</thead>
<tbody>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'&'}</code></td><td class="border px-4 py-2">AND (BOTH must be true)</td><td class="border px-4 py-2"><code>${'D1&D2'}</code> - device 1 is on AND device 2 is on</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'|'}</code></td><td class="border px-4 py-2">OR (ONE is enough)</td><td class="border px-4 py-2"><code>${'D1|D2'}</code> - device 1 is on OR device 2 is on (or both)</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'!'}</code></td><td class="border px-4 py-2">NOT (the opposite)</td><td class="border px-4 py-2"><code>${'!D1'}</code> - device 1 is off; <code>${'!(D1&D2)'}</code> - it is not true that both are on at once</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'( )'}</code></td><td class="border px-4 py-2">Brackets - what to calculate first</td><td class="border px-4 py-2"><code>${'(D1|D2)&!D3'}</code> - (device 1 or device 2) AND device 3 is off</td></tr>
<tr><td class="border px-4 py-2 whitespace-nowrap"><code>${'= > < g l'}</code></td><td class="border px-4 py-2">Equal, greater, less; g - greater or equal, l - less or equal (${'>='} and ${'<='} also work)</td><td class="border px-4 py-2"><code>${'T5>25.5'}</code>, <code>${'DV3=100'}</code>, <code>${'DV3l50'}</code></td></tr>
</tbody>
</table>
<p class="mb-3 text-slate-700">Tip: if you mix & and | in one condition, always use brackets. Without brackets the order is: ! first, then &, then | (so <code>${'D1|D2&D3'}</code> reads as <code>${'D1|(D2&D3)'}</code>). Numbers for temperature and humidity are written as usual: <code>${'T5>25'}</code> and <code>${'T5>25.0'}</code> are the same, one digit after the dot is allowed.</p>
`;
}

export function condRulesCommon(isRu) {
  return isRu ? html`
<li><b>Неисправный или молчащий датчик</b> даёт ответ «неизвестно», и действие блокируется, даже если перед условием стоит !: <code>${'!(T5<25)'}</code> при мёртвом датчике НЕ сработает. Исключение: явная правда через |, например <code>${'T5<25|D1'}</code> сработает при неисправном датчике 5, если устройство 1 включено.</li>
<li><b>Прямое управление условие не проверяет:</b> ползунок On/Off или диммера у самого устройства, команда API или MQTT прямо на устройство, обратная связь от Zigbee-устройства работают независимо от условия.</li>
<li><b>Допустимые символы в условии и в ячейках:</b> латинские буквы, цифры и знаки ( ) ! & | = ${'>'} ${'<'}, точка и минус (минус только для отрицательного числа справа от знака сравнения). Пробелы не допускаются.</li>
<li><b>Одну ячейку (C1..C12) можно использовать во многих местах.</b> Число рядом с ячейкой (например «3 мест») показывает, сколько мест её используют; одинаковые условия в связях хранятся один раз и считаются за одно место. Правка ячейки сразу меняет поведение всех этих мест (в панели «Библиотека условий» перед сохранением используемой ячейки запрашивается подтверждение).</li>
<li><b>Пустая ячейка, ячейка со значением 0 и ячейка с неверной записью считаются НЕТ.</b> Значение 0 появляется, например, после удаления устройства, которое было в условии (метка «сброшено (0)»). Пока в ячейке 0 или пусто, все действия и связи, которые на неё ссылаются, заблокированы. Впишите верное условие в ячейку или уберите ссылку на неё. В таблице такая связь подсвечивается красным бейджем «C1: пусто» (жёлтым, если пустая ячейка стоит внутри составного условия); под полем действий появляется жёлтое предупреждение.</li>
<li><b>Длинное условие</b>, нужное в нескольких местах, запишите один раз в ячейку (панель «Библиотека условий» или строка Conditions на странице «Global Settings», 12 ячеек) и ссылайтесь на него коротко: <code>${'C3'}</code>. Вложенность ссылок - не глубже двух уровней, третий уровень считается НЕТ.</li>
` : html`
<li><b>A faulty or silent sensor</b> gives the answer "unknown", and the action is blocked even if the condition starts with !: <code>${'!(T5<25)'}</code> will NOT fire with a dead sensor. The exception is an explicit truth through |, for example <code>${'T5<25|D1'}</code> fires with a faulty sensor 5 if device 1 is on.</li>
<li><b>Direct control does not check the condition:</b> the On/Off or dimmer slider of the device itself, an API or MQTT command sent straight to the device, and feedback from a Zigbee device work regardless of the condition.</li>
<li><b>Allowed characters in a condition and in cells:</b> Latin letters, digits and the signs ( ) ! & | = ${'>'} ${'<'}, a dot and a minus sign (the minus only for a negative number to the right of a comparison sign). Spaces are not allowed.</li>
<li><b>One cell (C1..C12) can be used in many places.</b> The number next to a cell (for example "3 places") shows how many places use it; identical conditions in links are stored once and count as one place. Editing a cell instantly changes the behavior of all those places (in the Conditions library panel, saving a cell that is in use asks for confirmation).</li>
<li><b>An empty cell, a cell with the value 0 and a cell with an invalid entry count as NO.</b> The value 0 appears, for example, after a device used in the condition is deleted (the "reset (0)" label). While a cell holds 0 or is empty, all actions and links that refer to it are blocked. Type a valid condition into the cell or remove the reference to it. In the table such a link is shown with a red badge "C1: empty" (or a yellow one if the empty cell is inside a compound condition); a yellow warning appears under the action field.</li>
<li><b>A long condition</b> needed in several places, write once into a cell (the Conditions library panel or the Conditions row on the "Global Settings" page, 12 cells) and refer to it briefly: <code>${'C3'}</code>. References nest no deeper than two levels; the third level counts as NO.</li>
`;
}
