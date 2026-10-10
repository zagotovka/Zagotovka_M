import { lockToggle } from '../helpLock.js';
import { h, render, useState, useEffect, useRef, html, Router } from '../bundle.js';
import { registerPoll, unregisterPoll } from '../pollQueue.js';
import { Icons, Login, Setting as SettingsComp, Button, Stat, tipColors, Colored, Notification, Pagination, UploadFileButton, textSection } from '../components.js';
import { MyPolzunok, Chart, DeveloperNote, pageSetting, Toast } from '../main.js';
import { ruLangswitch, rulangbutton, rulangmonitoring, ruencoder, rurelay, rulangpwm, rulangtimers, rulange1Wire, rulangsettings } from '../rulang.js';
import { enLangswitch, enlangbutton, enlangmonitoring, enencoder, enrelay, enlangpwm, enlangtimers, enlange1Wire, enlangsettings } from '../enlang.js';
import { condHelpTitle } from '../condlib.js';
import { ThemeToggle } from '../theme.js';

// ---------------------------------------------------------------------------
// Глобальный tooltip-портал (position:fixed, body-level)
// ---------------------------------------------------------------------------
function initGlobalTooltip() {
  if (document.__tipInited) return;
  document.__tipInited = true;

  const tip = document.createElement('div');
  tip.id = '__global_tip';
  Object.assign(tip.style, {
    position:      'fixed',
    zIndex:        '99999',
    maxWidth:      '320px',
    background:    '#1a2332',
    color:         '#e8f4f8',
    padding:       '8px 12px',
    borderRadius:  '8px',
    border:        '1px solid rgba(0,188,188,0.35)',
    fontSize:      '12px',
    lineHeight:    '1.6',
    boxShadow:     '0 6px 20px rgba(0,0,0,0.45)',
    pointerEvents: 'none',
    whiteSpace:    'normal',
    display:       'none',
    transition:    'opacity 0.12s ease',
    opacity:       '0',
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
    tip.style.top  = '0px';

    requestAnimationFrame(() => {
      const tw = tip.offsetWidth;
      const th = tip.offsetHeight;
      const vw = window.innerWidth;
      const r  = el.getBoundingClientRect();

      let left = r.left + r.width / 2 - tw / 2;
      left = Math.max(8, Math.min(left, vw - tw - 8));

      let top = r.top - th - 8;
      if (top < 8) top = r.bottom + 8;

      tip.style.left    = left + 'px';
      tip.style.top     = top  + 'px';
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
// ---------------------------------------------------------------------------

// Карта: label поля → индекс в массиве rulangsettings / enlangsettings
const SETTINGS_TIP_IDX = {
  'Login':           1,
  'Password':        2,
  'Time zone UTC':   3,
  'IP address':      4,
  'Subnet mask':     5,
  'Default gateway': 6,
  'Token':           7,
  'Host':            8,
  'Port':            9,
  'Client':          10,
  'User':            11,
  'Password (MQTT)': 12,   // ключ для MQTT-пароля
  'TX topic':        13,
  'RX topic':        14,
  'RX Z2M topic':    26,
  'MQTT Server':     27,
  'Port (srv)':      28,
  'Max clients':     29,
  'User (srv)':      30,
  'Password (srv)':  31,
  'SLZB IP':         32,
  'HTTPS domain':    15,
  'Private Key':     16,
  'Public Key':      17,
  'Longitude':       18,
  'Latitude':        19,
  'Sunrise':         20,
  'Sunset':          21,
  'Day Length':      22,
  'Next full moon':  23,
  'Date':            24,
  'Time':            25,
};

// ---------------------------------------------------------------------------
// getTip и FieldRow вынесены ЗА пределы Settings, чтобы их референс не менялся
// при каждом ре-рендере — иначе Preact размонтирует <tr> и input теряет фокус
// ---------------------------------------------------------------------------
const getTip = (label, lang, rulangsettings, enlangsettings) => {
  const arr = lang === 'ru' ? rulangsettings : enlangsettings;
  const idx = SETTINGS_TIP_IDX[label];
  if (!idx || !arr || !arr[idx]) return '';
  const words = arr[idx].split(' ');
  const lines = [];
  for (let i = 0; i < words.length; i += 12) {
    lines.push(words.slice(i, i + 12).join(' '));
  }
  return lines.join('<br>');
};

const FieldRow = ({ label, tipLabel, index, tip, children }) => {
  const bg = index % 2 === 0 ? 'bg-white/80' : 'bg-sky-200/40';
  return html`
    <tr class="transition-colors border-b border-slate-200 ${bg} hover:bg-slate-200/80">
      <td
        class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help"
        data-tip=${tip}
      >
        ${label}
      </td>
      <td class="w-2/3 pl-4 py-4 pr-6">
        ${children}
      </td>
    </tr>
  `;
};
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Справка по условиям в полях Sunrise / Sunset (RU + EN, карточки Tailwind)
// По HELP_GUIDELINES.md. Порядок блоков и цвета (RU и EN одинаковы):
//   1 indigo  - Как настроить (пошагово) + Как это работает + Важно + пример с ID
//   2 sky     - Что это и как устроена строка
//   3 violet  - Как составить условие: слова и знаки
//   4 teal    - Готовые примеры (таблицы)
//   5 rose    - Примеры из жизни
//   6 amber   - Частые ошибки
//   7 emerald - Важные правила и лимиты
//   8 orange  - Не работает? Проверьте
// ---------------------------------------------------------------------------
const SUN_HELP = {
  ru: {
    panelTitle: condHelpTitle(true) + ' (Sunrise / Sunset)',
    whatTitle: 'Что это и зачем',
    what: [
      'Поля Sunrise и Sunset запускают действия на восходе и на закате: например, включить свет на закате и выключить на рассвете. К любому действию можно добавить «проверку» (условие): «сделай это, но ТОЛЬКО ЕСЛИ ...».',
      'Это как охранник у двери. В момент восхода (или заката) он подходит и проверяет условие. Верно - действие выполняется. Неверно - действие пропускается, и до завтрашнего дня оно не повторится.',
    ],
    formatTitle: 'Как устроена строка',
    formatIntro: 'Строка состоит из нескольких частей. Пример: -600/6:1?T3<10,12:0',
    colPart: 'Часть',
    colMeaning: 'Что означает',
    format: [
      ['-600', 'Смещение в секундах от восхода (или заката). 0 - ровно в момент события, -600 - за 10 минут до, 600 - через 10 минут после. Смещение одно на все действия строки.'],
      ['/', 'Разделитель. Ровно один на всю строку.'],
      ['6:1', 'Действие: номер пина (ID), двоеточие и что сделать: 0 - выключить, 1 - включить, 2 - переключить на противоположное.'],
      ['?T3<10', 'Условие: знак ? и сама проверка. Здесь: «только если на датчике 3 меньше 10 градусов». Без знака ? действие выполняется всегда.'],
      [',', 'Запятая отделяет одно действие от другого. У каждого действия своё условие (или совсем без условия).'],
    ],
    formatRead: 'Как читать пример: за 10 минут до события включить пин 6, но только если на датчике 3 меньше 10 градусов; и выключить пин 12 (без условия, всегда).',
    stepsTitle: 'Как настроить восход и закат (пошагово)',
    stepsView: html`
      <ol class="list-decimal ml-6 space-y-3">
        <li><b>Проверьте координаты.</b> Время восхода и заката устройство считает по <b>Longitude</b> и <b>Latitude</b> (строки выше на этой странице). Если координаты неверные, действие сработает не в то время.</li>
        <li><b>Включите ползунок</b> рядом с полем <b>Sunrise</b> или <b>Sunset</b>. Пока он выключен, действия этого поля не выполняются.</li>
        <li><b>Впишите действие без условия</b> и убедитесь, что оно работает. Например: <code>${'0/6:1'}</code> (смещение 0, слэш, ID устройства 6, двоеточие, команда 1 - включить).</li>
        <li><b>Допишите условие.</b> После действия поставьте знак <code>${'?'}</code> и проверку: <code>${'0/6:1?D2'}</code>. Из чего составить проверку - в таблицах ниже.</li>
        <li><b>Нажмите Save changes.</b> Если поле покраснело, страница подскажет, что не так. Белое поле ещё не значит, что условие верное: страница проверяет только допустимые символы и формат, а не смысл (см. блок «Частые ошибки»).</li>
        <li><b>Проверьте на деле.</b> Временно задайте смещение так, чтобы время срабатывания наступило через пару минут, и посмотрите, сработало ли действие.</li>
      </ol>

      <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300">
        <b>Как это работает:</b> в назначенный момент (восход или закат плюс смещение) устройство один раз проверяет условие каждого действия в строке. Условие верно - действие выполняется. Неверно - действие пропускается. Если условия нет, действие выполняется всегда.
      </div>

      <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300">
        <b>Важно:</b> условие проверяется ОДИН РАЗ - в момент срабатывания. Если оно оказалось неверным, действие в этот день уже не повторится, даже если через минуту условие станет верным.
      </div>

      <div class="mt-4">
        <b>Пример.</b> На крыльце лампа с ID 6, у входа гирлянда с ID 12. ID здесь условные, у вас будут свои.
        <ul class="list-disc ml-6 mt-1">
          <li>На закате включить обе: в поле <b>Sunset</b> пишем <code>${'0/6:1,12:1'}</code></li>
          <li>На рассвете выключить обе: в поле <b>Sunrise</b> пишем <code>${'0/6:0,12:0'}</code></li>
          <li>Лампа должна загораться за 10 минут до заката: в поле <b>Sunset</b> пишем <code>${'-600/6:1,12:1'}</code> (смещение одно на всю строку, поэтому гирлянда тоже включится на 10 минут раньше)</li>
        </ul>
      </div>
    `,
    lifeTitle: 'Примеры из жизни: что на самом деле умеет эта страница',
    lifeIntro: 'Четыре истории о том, как одна строка в поле Sunrise или Sunset заботится о доме вместо вас. ID, пины и номера датчиков в них условные: подставьте свои.',
    storiesView: html`
      <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
        <p class="text-lg font-bold text-black mb-1">Иней на рассаде</p>
        <p class="mb-1">Апрель, днём плюс двадцать, и вы спокойно уходите с участка. А вечером в приложении погоды вдруг минус. В теплице рассада, которую вы растили два месяца. Сердце ёкает.</p>
        <p class="mb-1">Спокойно! Обогреватель в теплице имеет ID 6, уличный датчик - ID 3. В поле <b>Sunset</b> записано <code>${'0/6:1?T3<10'}</code>, в поле <b>Sunrise</b> - <code>${'0/6:0'}</code>. На закате Zagotovka-M смотрит на датчик: холодно - включает обогреватель, тепло - оставляет выключенным.</p>
        <p class="mb-1"><b>Результат:</b> тёплым вечером обогреватель стоит, холодным включается сам, а на рассвете выключается в любом случае. Проверка одна, на закате.</p>
      </div>

      <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
        <p class="text-lg font-bold text-black mb-1">Подвал пахнет сыростью</p>
        <p class="mb-1">Вы вернулись на дачу после дождливой недели и открыли подвал. Запах, на стенах тёмные пятна. Опять придётся всё перебирать.</p>
        <p class="mb-1">Спокойно! Вытяжной вентилятор имеет ID 7, датчик влажности - ID 4. В поле <b>Sunset</b> записано <code>${'1800/7:1?H4>70'}</code>, в поле <b>Sunrise</b> - <code>${'0/7:0'}</code>. Через 30 минут после заката вентилятор включится, но только если влажность выше 70 процентов.</p>
        <p class="mb-1"><b>Результат:</b> в сухие вечера вентилятор молчит, в сырые сам проветривает подвал до рассвета.</p>
      </div>

      <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
        <p class="text-lg font-bold text-black mb-1">Дом притворяется жилым</p>
        <p class="mb-1">Вы уезжаете в отпуск на две недели. Вечером окна тёмные, и вы представляете, как это видно с улицы.</p>
        <p class="mb-1">Спокойно! Лампа на крыльце имеет ID 6, лампа в гостиной - ID 12, а ID 1 - это устройство-переключатель «Отпуск». В поле <b>Sunset</b> записано <code>${'0/6:1,12:1?D1'}</code>, в поле <b>Sunrise</b> - <code>${'0/6:0,12:0'}</code>. Крыльцо светит каждый вечер, а гостиная - только когда режим «Отпуск» включён.</p>
        <p class="mb-1"><b>Результат:</b> уезжая, включаете устройство 1 - и вечером дом выглядит обитаемым. Вернулись, выключили - гостиная больше не загорается сама.</p>
      </div>

      <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
        <p class="text-lg font-bold text-black mb-1">Порог нужно поменять в десяти местах</p>
        <p class="mb-1">Наступила осень. Порог «холодно» теперь не 5, а 8 градусов, а он записан в нескольких действиях. Править всё вручную и ничего не пропустить - вот это нервы.</p>
        <p class="mb-1">Спокойно! В строке <b>Conditions</b> этой страницы в ячейку <b>C1</b> записано <code>${'T3<5|H4>70'}</code>, а в действиях стоят короткие ссылки: в поле <b>Sunset</b> - <code>${'0/6:1?C1,7:1?C1'}</code>. Меняете одну ячейку C1 на <code>${'T3<8|H4>70'}</code>, и все места, где есть ссылка, сразу работают по-новому.</p>
        <p class="mb-1"><b>Результат:</b> одна правка вместо десяти. Число рядом с ячейкой показывает, сколько мест её используют.</p>
      </div>
    `,
    checkTitle: 'Не работает? Проверьте',
    check: [
      'Включён ли ползунок рядом с нужным полем (Sunrise или Sunset).',
      'Нажато ли Save changes и нет ли в поле красной ошибки.',
      'Тот ли ID указан в действии: проверьте его в таблице на странице нужного устройства.',
      'Не оказалось ли условие неверным в момент срабатывания (датчик молчит, устройство в другом состоянии): проверка одна, повторов в этот день нет.',
      'Не было ли устройство выключено или перезагружалось в момент срабатывания: окно около 5 минут.',
      'Верны ли Longitude и Latitude: от них зависят время восхода и заката.',
    ],
    buildTitle: 'Как составить своё условие: 4 простых шага',
    build: [
      'Решите, ЗА ЧЕМ следить. Буква подсказывает: D - устройство (включено или нет), B - кнопка, T - температура, H - влажность, Sr - день, Ss - ночь.',
      'Допишите номер устройства (его ID) из таблицы на странице этого устройства. Датчик с ID 3 - это T3, устройство с ID 2 - это D2.',
      'Если нужно «больше» или «меньше», допишите знак и число: T3<10 значит «на датчике 3 меньше 10 градусов». Для устройств и кнопок число не нужно: D2 - устройство включено, !D2 - выключено. Для отрицательной температуры ставьте минус прямо перед цифрой: T3<-5.',
      'Если проверок несколько, соедините их знаками: & значит «И» (нужно всё сразу), | значит «ИЛИ» (хватит одного). Пример: T3<10&D1 - «на датчике 3 холодно И устройство 1 включено».',
    ],
    wordsTitle: 'Из чего строится условие (слова)',
    wordsNote: 'Число после буквы - это ID устройства из таблицы на странице этого устройства. Датчик температуры в условии может быть любой, не обязательно связанный с действием.',
    colEntry: 'Запись',
    colRead: 'Как читать',
    words: [
      ['D5', 'Устройство (пин DEVICE) с ID 5 сейчас ВКЛючено. Для Zigbee-устройства - оно включено.'],
      ['!D5', 'Пин с ID 5 сейчас ВЫКЛючен (знак ! означает «НЕ»).'],
      ['DV3>0', 'Диммер (ШИМ) с ID 3 светит (значение больше нуля). Для Zigbee - яркость устройства.'],
      ['DV3=100', 'Значение диммера 3 ровно 100. У ШИМ-диммера шкала 0-100 (проценты), то есть полная яркость.'],
      ['DV3g50', 'Значение диммера 3 равно 50 или БОЛЬШЕ (буква g - «greater», то же, что >=).'],
      ['DV3l50', 'Значение диммера 3 равно 50 или МЕНЬШЕ (буква l - «less», то же, что <=).'],
      ['B1', 'Кнопка с ID 1 в этот момент нажата.'],
      ['BU1', 'Кнопка с ID 1 в этот момент НЕ нажата.'],
      ['BH1', 'Кнопка с ID 1 в этот момент удерживается (долгое нажатие).'],
      ['T5>25.5', 'Температура датчика 5 больше 25.5 градусов.'],
      ['T5<10', 'Температура датчика 5 меньше 10 градусов.'],
      ['T3<-5', 'Температура датчика 3 ниже минус 5 градусов. Минус пишется сразу перед цифрой, без пробела, и только справа от знака сравнения.'],
      ['T5.2>25.5', 'Температура второго датчика на шине DS18B20 пина 5 больше 25.5 градусов (.2 - номер датчика на шине, одна цифра от 1 до 9; без .номер берётся первый исправный).'],
      ['H4>50', 'Влажность датчика 4 больше 50 процентов.'],
      ['H4<30', 'Влажность датчика 4 меньше 30 процентов.'],
      ['Sr', 'День: в момент срабатывания время между восходом и закатом. Здесь нужен редко: ответ обычно очевиден (после восхода уже день, после заката уже ночь), но со смещением бывает наоборот.'],
      ['Ss', 'Ночь: в момент срабатывания время между закатом и восходом. Если время восхода и заката не рассчитано, Sr и Ss оба считаются НЕТ.'],
      ['C3', 'Подставить готовое условие из ячейки C3 библиотеки Conditions (строка ниже на этой странице). Вложенность - не глубже двух уровней.'],
    ],
    signsTitle: 'Чем соединять слова (знаки)',
    colSign: 'Знак',
    colSignMeaning: 'Смысл',
    colSignExample: 'Пример и как читать',
    signs: [
      ['&', 'И (нужно, чтобы выполнились ОБА)', 'D1&D2', 'устройство 1 включено И устройство 2 включено'],
      ['|', 'ИЛИ (достаточно ОДНОГО)', 'D1|D2', 'включено устройство 1 ИЛИ устройство 2 (или оба)'],
      ['!', 'НЕ (наоборот)', '!(D1&D2)', 'неверно, что включены оба сразу (а !D1 - устройство 1 выключено)'],
      ['( )', 'Скобки - что считать первым', '(D1|D2)&!D3', '(устройство 1 или устройство 2) И устройство 3 выключено'],
      ['= > < g l', 'Равно, больше, меньше; g - больше или равно, l - меньше или равно (можно писать и >=, <=)', 'T5>25.5, DV3=100, DV3l50', ''],
    ],
    tip: 'Совет: если в одном условии смешиваете & и |, всегда ставьте скобки. Без скобок порядок такой: сначала !, потом &, потом | (то есть D1|D2&D3 читается как D1|(D2&D3)). Числа у температуры и влажности пишутся как обычно: T5>25 и T5>25.0 - одно и то же, после точки допускается одна цифра. Большие и маленькие буквы не различаются: r2 и D2 - одно и то же. Пробелы страница убирает сама.',
    exTitle: 'Готовые примеры - впишите в поле Sunrise или Sunset',
    exNote: 'В каждом примере записана строка целиком: смещение, действие и условие. Меняйте номера пинов, датчиков и устройств на свои. Условие читается после знака ?.',
    colType: 'Что вписать в поле',
    colHappens: 'Что произойдёт',
    examples: [
      ['Действия без условия (для сравнения)', [
        ['0/6:1', 'В момент события включить пин 6. Условия нет, поэтому сработает всегда.'],
        ['0/6:1,12:0', 'В момент события включить пин 6 и выключить пин 12.'],
        ['-600/6:1', 'За 10 минут до события включить пин 6.'],
        ['1800/6:0', 'Через 30 минут после события выключить пин 6.'],
        ['0/6:2', 'В момент события переключить пин 6 на противоположное состояние.'],
      ]],
      ['Устройства и выключатели', [
        ['0/6:1?D2', 'Включить пин 6, только если устройство 2 включено.'],
        ['0/6:1?!D2', 'Включить пин 6, только если устройство 2 выключено.'],
        ['0/6:1?D1&D2', 'Включить пин 6, только если включены и устройство 1, и устройство 2.'],
        ['0/6:1?D1|D2', 'Включить пин 6, если включено хотя бы одно из устройств 1 и 2.'],
        ['0/6:1?D1&!D2', 'Включить пин 6, если устройство 1 включено, а устройство 2 выключено.'],
        ['0/6:1?!D1&!D2', 'Включить пин 6, только если оба устройства выключены.'],
        ['0/6:1?(D1|D2)&!D3', 'Включить пин 6, если включено устройство 1 или 2 и при этом устройство 3 выключено.'],
        ['0/6:1?!(D1&D2)', 'Включить пин 6 всегда, кроме случая, когда оба устройства включены сразу.'],
      ]],
      ['Диммеры (ШИМ) и Zigbee', [
        ['0/6:1?DV3>0', 'Включить пин 6, только если диммер 3 светит.'],
        ['0/6:1?DV3g50', 'Включить пин 6, только если значение диммера 3 равно 50 или больше.'],
        ['0/6:1?DV3l50', 'Включить пин 6, только если значение диммера 3 равно 50 или меньше.'],
        ['0/6:1?D93', 'Включить пин 6, только если Zigbee-устройство с ID 93 включено (ID Zigbee-устройств начинаются с 89).'],
        ['0/6:1?DV93g100', 'Включить пин 6, только если значение Zigbee-устройства 93 равно 100 или больше.'],
        ['0/93.1:2?D5', 'Запустить у Zigbee-триггера 93 действие номер 1 (суффикс .1 или .2 после номера), только если устройство 5 включено.'],
      ]],
      ['Кнопки', [
        ['0/6:1?B1', 'Включить пин 6, только если кнопка 1 в этот момент нажата.'],
        ['0/6:1?BU1', 'Включить пин 6, только если кнопка 1 в этот момент не нажата.'],
        ['0/6:1?BH1', 'Включить пин 6, только если кнопка 1 в этот момент удерживается долгим нажатием.'],
      ]],
      ['Температура и влажность', [
        ['0/6:1?T3<10', 'Включить пин 6, только если на датчике 3 (например, уличном) холоднее 10 градусов.'],
        ['0/6:1?T3>25.5', 'Включить пин 6, только если на датчике 3 жарче 25.5 градусов.'],
        ['0/6:1?T5.2>25.5', 'Включить пин 6, только если второй датчик DS18B20 на пине 5 показывает больше 25.5 градусов.'],
        ['0/6:1?H4<80', 'Включить пин 6, только если влажность на датчике 4 ниже 80 процентов.'],
        ['0/6:1?H4>50', 'Включить пин 6, только если влажность на датчике 4 выше 50 процентов.'],
        ['0/6:1?T3<10&!D7', 'Включить пин 6, если на датчике 3 холодно и устройство 7 (например, другой нагреватель) не включено.'],
        ['0/6:1?(T3<5|H4>70)&D1', 'Включить пин 6, если устройство 1 включено и при этом на датчике 3 очень холодно или на датчике 4 очень влажно.'],
        ['0/6:1?T3>10&T3<30', 'Включить пин 6, только если на датчике 3 теплее 10 и холоднее 30 градусов.'],
        ['0/6:1?T3<15|T3>30', 'Включить пин 6, если на датчике 3 холоднее 15 или жарче 30 градусов.'],
      ]],
      ['Мороз и отрицательные температуры', [
        ['0/6:1?T3<-5', 'Включить пин 6, только если на датчике 3 холоднее минус 5 градусов.'],
        ['0/6:1?T3g-12.3', 'Включить пин 6, если на датчике 3 минус 12.3 градуса или теплее.'],
        ['0/6:1?T3>-0.5&T3<3', 'Включить пин 6, только если на датчике 3 температура между минус 0.5 и плюс 3 градуса (около нуля).'],
      ]],
      ['День и ночь (нужны редко)', [
        ['0/6:1?Sr', 'Включить пин 6, только если в момент события уже день. На восходе без смещения условие обычно верно.'],
        ['-600/6:1?Ss', 'За 10 минут до восхода включить пин 6, только если ещё ночь.'],
      ]],
      ['Готовое условие из библиотеки', [
        ['0/6:1?C3', 'Включить пин 6, только если верно условие из ячейки C3 библиотеки Conditions.'],
        ['0/6:1?C3&!D2', 'Включить пин 6, если верно условие из ячейки C3 И устройство 2 выключено.'],
      ]],
      ['Несколько действий, у каждого своё условие', [
        ['0/6:1?D2,7:1?T3<10,12:0', 'Три действия. Пин 6 включится, если устройство 2 включено. Пин 7 включится, если на датчике 3 холодно. Пин 12 выключится всегда. Смещение 0 общее для всех трёх.'],
        ['-300/6:1?D2,7:1', 'За 5 минут до события: пин 6 включится, только если устройство 2 включено. Пин 7 включится всегда (условие стоит только у пина 6).'],
      ]],
      ['Особый случай: неисправный датчик', [
        ['0/6:1?T3<10|D1', 'Включить пин 6, если на датчике 3 меньше 10 градусов ИЛИ включено устройство 1. Если датчик 3 неисправен, а устройство 1 включено, действие всё равно выполнится.'],
      ]],
    ],
    mistakesTitle: 'Частые ошибки: так писать нельзя',
    mistakesNote: 'Одни ошибки страница ловит сразу и красит поле красным. Другие она пропускает: запись сохраняется, но условие потом всегда считается НЕТ, и действие молча не выполняется. Слева то, что писать нельзя, справа - что будет и как правильно.',
    colWrong: 'Так не надо',
    colWhy: 'Что будет и как правильно',
    mistakes: [
      ['6:1?D2', 'Нет смещения и знака /. Страница покажет ошибку. Пишите 0/6:1?D2.'],
      ['0/6:1?', 'После знака ? нет проверки. Страница покажет ошибку. Допишите условие или уберите знак ?.'],
      ['0/6:3?D2', 'Действие бывает только 0, 1 или 2. Страница покажет ошибку.'],
      ['0/6:1?D2,D3', 'Запятая начинает новое действие, а D3 действием не является. Страница покажет ошибку. Пишите D2&D3 (И) или D2|D3 (ИЛИ).'],
      ['0/6:1?T3>25,5', 'Десятые пишутся через точку, а не через запятую. Страница покажет ошибку. Пишите T3>25.5.'],
      ['0/6:1?D2?D3', 'Знак ? ставится один раз на действие. Страница покажет ошибку. Проверки соединяйте знаками & и |.'],
      ['0/6:1?D2 and D3', 'Слова писать нельзя, только знаки. Запись сохранится, но действие не сработает никогда. Пишите D2&D3.'],
      ['0/6:1?T3>T5', 'Сравнивать можно только с числом, а не с другим датчиком. Запись сохранится, но действие не сработает. Пишите T3>20.'],
      ['0/6:1?(D1|D2', 'Не закрыта скобка. Запись сохранится, но действие не сработает. Пишите (D1|D2).'],
      ['0/6:1?D1&', 'Знак & или | в конце без второй половины. Запись сохранится, но действие не сработает. Пишите D1&D2.'],
      ['0/6:1?T3', 'Датчик без сравнения - это просто число, а не «да/нет», и условие работает неправильно. Допишите сравнение: T3<10.'],
      ['Р2, Т3, В1', 'Русские буквы, похожие на латинские, в это поле не вводятся (пропадают). Переключите раскладку на английскую и пишите D2, T3, B1.'],
      ['0/6:1?C13', 'В библиотеке 12 ячеек (с 1 по 12). Ссылка на несуществующую ячейку считается НЕТ, действие не сработает.'],
      ['В ячейку Conditions: 0/6:1?D2', 'В ячейку библиотеки пишется только проверка, то есть то, что стоит после знака ?: D2. Строку с действием туда вписывать нельзя, ячейка её отклонит.'],
    ],
    rulesTitle: 'Важные правила',
    rules: [
      'Проверка идёт один раз - в момент срабатывания (восход или закат плюс смещение). Если условие верно, действие выполняется. Если нет, оно пропускается и в этот день больше не повторяется, даже если условие станет верным через минуту.',
      'Устройство должно работать в этот момент: действие выполняется в течение примерно 5 минут после назначенного времени. Если устройство в это время было выключено или перезагружалось дольше, действие за этот день пропущено.',
      'Условие относится только к своему действию. В строке 0/6:1?D2,7:1 условие D2 касается только пина 6, а пин 7 включится всегда.',
      'Смещение одно на всю строку, а не на каждое действие.',
      'Внутри условия нельзя ставить запятые и второй знак ?. Длина условия прямо в действии - до 60 символов, а в одной ячейке библиотеки - до 46. Если условие длинное или повторяется, запишите его один раз в ячейку библиотеки Conditions (строка ниже на этой странице; те же ячейки можно править и на страницах Switch, Encoder, PID) и ссылайтесь коротко: 0/6:1?C3. Условие длиннее 46 символов разбейте на две ячейки и соедините ссылками: 0/6:1?C3|C4. В ячейку пишется только проверка, без смещения и действия.',
      'Часть строки после знака / устройство читает максимум 99 символов: страница принимает больше, но прошивка обрезает хвост, и обрезанное условие сработает неверно. Держите строку короче.',
      'Неисправный или молчащий датчик в условии даёт ответ «неизвестно»: действие пропускается, даже если перед условием стоит !. Исключение: явная правда через |, например T3<10|D1.',
      'Страница проверяет только допустимые символы и формат строки, но не смысл условия. Поэтому после настройки проверьте условие на деле: например, временно задайте время срабатывания через пару минут.',
      'Условие работает только при срабатывании по Sunrise/Sunset. Ручное включение и выключение (ползунки, MQTT, API) условие не проверяет.',
      'Если время восхода и заката не рассчитано, условия с Sr и Ss всегда НЕТ.',
      'Если удалить устройство, упомянутое в условии, то условие превращается в ?0 (всегда НЕТ), и действие перестаёт срабатывать, пока вы не впишете новое условие.',
    ],
  },
  en: {
    panelTitle: condHelpTitle(false) + ' (Sunrise / Sunset)',
    whatTitle: 'What it is and why',
    what: [
      'The Sunrise and Sunset fields run actions at sunrise and at sunset: for example, turn a light on at sunset and off at dawn. You can add a "check" (a condition) to any action: "do this, but ONLY IF ...".',
      'It is like a guard at a door. At the moment of sunrise (or sunset) the guard comes and checks the condition. If it is true, the action is performed. If it is false, the action is skipped and will not be repeated until tomorrow.',
    ],
    formatTitle: 'How the line is built',
    formatIntro: 'The line consists of several parts. Example: -600/6:1?T3<10,12:0',
    colPart: 'Part',
    colMeaning: 'What it means',
    format: [
      ['-600', 'Offset in seconds from sunrise (or sunset). 0 - exactly at the moment of the event, -600 - 10 minutes before, 600 - 10 minutes after. One offset for all actions of the line.'],
      ['/', 'Separator. Exactly one in the whole line.'],
      ['6:1', 'The action: pin number (ID), a colon, and what to do: 0 - turn off, 1 - turn on, 2 - switch to the opposite.'],
      ['?T3<10', 'The condition: the ? sign and the check itself. Here: "only if sensor 3 is below 10 degrees". Without the ? sign the action is always performed.'],
      [',', 'A comma separates one action from another. Every action has its own condition (or none at all).'],
    ],
    formatRead: 'How to read the example: 10 minutes before the event turn pin 6 on, but only if sensor 3 is below 10 degrees; and turn pin 12 off (no condition, always).',
    stepsTitle: 'How to set up sunrise and sunset (step by step)',
    stepsView: html`
      <ol class="list-decimal ml-6 space-y-3">
        <li><b>Check the coordinates.</b> The device calculates sunrise and sunset from <b>Longitude</b> and <b>Latitude</b> (the rows above on this page). If the coordinates are wrong, the action will fire at the wrong time.</li>
        <li><b>Turn on the switch</b> next to the <b>Sunrise</b> or <b>Sunset</b> field. While it is off, the actions of that field are not performed.</li>
        <li><b>Type an action without a condition</b> and make sure it works. For example: <code>${'0/6:1'}</code> (offset 0, a slash, device ID 6, a colon, command 1 - turn on).</li>
        <li><b>Add the condition.</b> After the action put the <code>${'?'}</code> sign and a check: <code>${'0/6:1?D2'}</code>. What to build the check from is in the tables below.</li>
        <li><b>Press Save changes.</b> If the field turned red, the page tells you what is wrong. A white field does not yet mean the condition is correct: the page checks only the allowed characters and the format, not the meaning (see the "Common mistakes" block).</li>
        <li><b>Test it for real.</b> Temporarily set the offset so that the trigger time comes in a couple of minutes, and see whether the action runs.</li>
      </ol>

      <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300">
        <b>How it works:</b> at the scheduled moment (sunrise or sunset plus the offset) the device checks the condition of each action in the line, once. Condition true - the action is performed. False - the action is skipped. With no condition the action always runs.
      </div>

      <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300">
        <b>Important:</b> the condition is checked ONCE, at the moment of triggering. If it turns out false, the action is not repeated that day, even if the condition becomes true a minute later.
      </div>

      <div class="mt-4">
        <b>Example.</b> A porch lamp has ID 6, a garland by the entrance has ID 12. The IDs here are made up, yours will differ.
        <ul class="list-disc ml-6 mt-1">
          <li>Turn both on at sunset: in the <b>Sunset</b> field type <code>${'0/6:1,12:1'}</code></li>
          <li>Turn both off at dawn: in the <b>Sunrise</b> field type <code>${'0/6:0,12:0'}</code></li>
          <li>Light the lamp 10 minutes before sunset: in the <b>Sunset</b> field type <code>${'-600/6:1,12:1'}</code> (the offset is one for the whole line, so the garland also turns on 10 minutes earlier)</li>
        </ul>
      </div>
    `,
    lifeTitle: 'Real-life examples: what this page can really do',
    lifeIntro: 'Four stories about how one line in the Sunrise or Sunset field looks after your home for you. The IDs, pins and sensor numbers in them are made up: use your own.',
    storiesView: html`
      <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
        <p class="text-lg font-bold text-black mb-1">Frost on the seedlings</p>
        <p class="mb-1">April, plus twenty at noon, and you leave the plot without a worry. In the evening the weather app suddenly shows minus. The greenhouse holds seedlings you have grown for two months. Your heart skips.</p>
        <p class="mb-1">Relax! The greenhouse heater has ID 6, the outdoor sensor has ID 3. The <b>Sunset</b> field holds <code>${'0/6:1?T3<10'}</code>, the <b>Sunrise</b> field holds <code>${'0/6:0'}</code>. At sunset Zagotovka-M looks at the sensor: cold - it turns the heater on, warm - it leaves it off.</p>
        <p class="mb-1"><b>Result:</b> on a warm evening the heater stays off, on a cold one it turns on by itself, and at dawn it turns off in any case. There is one check, at sunset.</p>
      </div>

      <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
        <p class="text-lg font-bold text-black mb-1">The cellar smells damp</p>
        <p class="mb-1">You come back to the cottage after a rainy week and open the cellar. The smell, dark spots on the walls. Now everything has to be sorted out again.</p>
        <p class="mb-1">Relax! The exhaust fan has ID 7, the humidity sensor has ID 4. The <b>Sunset</b> field holds <code>${'1800/7:1?H4>70'}</code>, the <b>Sunrise</b> field holds <code>${'0/7:0'}</code>. 30 minutes after sunset the fan turns on, but only if humidity is above 70 percent.</p>
        <p class="mb-1"><b>Result:</b> on dry evenings the fan stays quiet, on damp ones it airs the cellar until dawn.</p>
      </div>

      <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
        <p class="text-lg font-bold text-black mb-1">The house pretends someone is home</p>
        <p class="mb-1">You leave for a two-week vacation. In the evening the windows are dark, and you picture how it looks from the street.</p>
        <p class="mb-1">Relax! The porch lamp has ID 6, the living room lamp has ID 12, and ID 1 is a switch device called "Vacation". The <b>Sunset</b> field holds <code>${'0/6:1,12:1?D1'}</code>, the <b>Sunrise</b> field holds <code>${'0/6:0,12:0'}</code>. The porch lights up every evening, and the living room only when "Vacation" mode is on.</p>
        <p class="mb-1"><b>Result:</b> when you leave, turn on device 1 - and in the evening the house looks lived in. When you are back, turn it off - the living room no longer lights up by itself.</p>
      </div>

      <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
        <p class="text-lg font-bold text-black mb-1">One threshold to change in ten places</p>
        <p class="mb-1">Autumn has come. "Cold" is now 8 degrees, not 5, and the number is written in several actions. Editing everything by hand without missing one is a nerve-wracking job.</p>
        <p class="mb-1">Relax! In the <b>Conditions</b> row of this page, cell <b>C1</b> holds <code>${'T3<5|H4>70'}</code>, and the actions use short references: in the <b>Sunset</b> field - <code>${'0/6:1?C1,7:1?C1'}</code>. Change one cell C1 to <code>${'T3<8|H4>70'}</code>, and every place with a reference immediately works the new way.</p>
        <p class="mb-1"><b>Result:</b> one edit instead of ten. The number next to a cell shows how many places use it.</p>
      </div>
    `,
    checkTitle: 'Not working? Check these',
    check: [
      'Is the switch next to the field you need turned on (Sunrise or Sunset)?',
      'Did you press Save changes, and is there no red error in the field?',
      'Is the ID in the action the right one? Check it in the table on that device page.',
      'Was the condition false at the moment of triggering (a silent sensor, a device in another state)? There is one check and no retries that day.',
      'Was the device off or rebooting at the moment of triggering? The window is about 5 minutes.',
      'Are Longitude and Latitude correct? Sunrise and sunset times depend on them.',
    ],
    buildTitle: 'How to write your own condition: 4 simple steps',
    build: [
      'Decide WHAT to watch. The letter tells it: D - device (on or off), B - button, T - temperature, H - humidity, Sr - daytime, Ss - night.',
      'Add the device number (its ID) from the table on that device page. The sensor with ID 3 is T3, the device with ID 2 is D2.',
      'If you need "more" or "less", add a sign and a number: T3<10 means "sensor 3 is below 10 degrees". Devices and buttons need no number: D2 - device is on, !D2 - device is off. For a negative temperature put the minus right before the digit: T3<-5.',
      'If there are several checks, join them with signs: & means AND (all at once), | means OR (one is enough). Example: T3<10&D1 - "sensor 3 is cold AND device 1 is on".',
    ],
    wordsTitle: 'What a condition is made of (words)',
    wordsNote: 'The number after the letter is the device ID from the table on that device page. The temperature sensor in a condition can be any sensor, not necessarily one connected to the action.',
    colEntry: 'Entry',
    colRead: 'How to read it',
    words: [
      ['D5', 'The device (DEVICE pin) with ID 5 is ON right now. For a Zigbee device - it is on.'],
      ['!D5', 'The pin with ID 5 is OFF right now (the ! sign means "NOT").'],
      ['DV3>0', 'Dimmer (PWM) with ID 3 is lit (value greater than zero). For Zigbee - the device brightness.'],
      ['DV3=100', 'Dimmer 3 value is exactly 100. A PWM dimmer uses a 0-100 scale (percent), so this is full brightness.'],
      ['DV3g50', 'Dimmer 3 value is 50 or GREATER (letter g = "greater", same as >=).'],
      ['DV3l50', 'Dimmer 3 value is 50 or LESS (letter l = "less", same as <=).'],
      ['B1', 'Button with ID 1 is pressed at this moment.'],
      ['BU1', 'Button with ID 1 is NOT pressed at this moment.'],
      ['BH1', 'Button with ID 1 is being held (long press) at this moment.'],
      ['T5>25.5', 'Temperature of sensor 5 is above 25.5 degrees.'],
      ['T5<10', 'Temperature of sensor 5 is below 10 degrees.'],
      ['T3<-5', 'Temperature of sensor 3 is below minus 5 degrees. The minus sign goes right before the digit, without a space, and only to the right of the comparison sign.'],
      ['T5.2>25.5', 'Temperature of the second DS18B20 sensor on the bus of pin 5 is above 25.5 degrees (.2 is the sensor number on the bus, a single digit from 1 to 9; without .number the first working sensor is used).'],
      ['H4>50', 'Humidity of sensor 4 is above 50 percent.'],
      ['H4<30', 'Humidity of sensor 4 is below 30 percent.'],
      ['Sr', 'Daytime: at the moment of triggering the time is between sunrise and sunset. Rarely needed here: the answer is usually obvious (after sunrise it is already day, after sunset already night), but with an offset it can be the opposite.'],
      ['Ss', 'Night: at the moment of triggering the time is between sunset and sunrise. If the sunrise and sunset times are not calculated, both Sr and Ss count as NO.'],
      ['C3', 'Insert the ready-made condition from cell C3 of the Conditions library (the row below on this page). Nesting - no deeper than two levels.'],
    ],
    signsTitle: 'What joins the words (signs)',
    colSign: 'Sign',
    colSignMeaning: 'Meaning',
    colSignExample: 'Example and how to read it',
    signs: [
      ['&', 'AND (BOTH must be true)', 'D1&D2', 'device 1 is on AND device 2 is on'],
      ['|', 'OR (ONE is enough)', 'D1|D2', 'device 1 is on OR device 2 is on (or both)'],
      ['!', 'NOT (the opposite)', '!(D1&D2)', 'it is not true that both are on at once (and !D1 - device 1 is off)'],
      ['( )', 'Brackets - what to calculate first', '(D1|D2)&!D3', '(device 1 or device 2) AND device 3 is off'],
      ['= > < g l', 'Equal, greater, less; g - greater or equal, l - less or equal (>= and <= also work)', 'T5>25.5, DV3=100, DV3l50', ''],
    ],
    tip: 'Tip: if you mix & and | in one condition, always use brackets. Without brackets the order is: ! first, then &, then | (so D1|D2&D3 reads as D1|(D2&D3)). Numbers for temperature and humidity are written as usual: T5>25 and T5>25.0 are the same, one digit after the dot is allowed. Uppercase and lowercase letters are not distinguished: r2 and D2 are the same. The page removes spaces by itself.',
    exTitle: 'Ready-made examples - type into the Sunrise or Sunset field',
    exNote: 'Each example is a whole line: offset, action and condition. Replace the numbers of pins, sensors and devices with your own. The condition is what comes after the ? sign.',
    colType: 'What to type into the field',
    colHappens: 'What will happen',
    examples: [
      ['Actions without a condition (for comparison)', [
        ['0/6:1', 'At the moment of the event turn pin 6 on. There is no condition, so it always works.'],
        ['0/6:1,12:0', 'At the moment of the event turn pin 6 on and pin 12 off.'],
        ['-600/6:1', '10 minutes before the event turn pin 6 on.'],
        ['1800/6:0', '30 minutes after the event turn pin 6 off.'],
        ['0/6:2', 'At the moment of the event switch pin 6 to the opposite state.'],
      ]],
      ['Devices and switches', [
        ['0/6:1?D2', 'Turn pin 6 on only if device 2 is on.'],
        ['0/6:1?!D2', 'Turn pin 6 on only if device 2 is off.'],
        ['0/6:1?D1&D2', 'Turn pin 6 on only if both device 1 and device 2 are on.'],
        ['0/6:1?D1|D2', 'Turn pin 6 on if at least one of devices 1 and 2 is on.'],
        ['0/6:1?D1&!D2', 'Turn pin 6 on if device 1 is on and device 2 is off.'],
        ['0/6:1?!D1&!D2', 'Turn pin 6 on only if both devices are off.'],
        ['0/6:1?(D1|D2)&!D3', 'Turn pin 6 on if device 1 or 2 is on and device 3 is off.'],
        ['0/6:1?!(D1&D2)', 'Turn pin 6 on always, except when both devices are on at once.'],
      ]],
      ['Dimmers (PWM) and Zigbee', [
        ['0/6:1?DV3>0', 'Turn pin 6 on only if dimmer 3 is lit.'],
        ['0/6:1?DV3g50', 'Turn pin 6 on only if the dimmer 3 value is 50 or greater.'],
        ['0/6:1?DV3l50', 'Turn pin 6 on only if the dimmer 3 value is 50 or less.'],
        ['0/6:1?D93', 'Turn pin 6 on only if the Zigbee device with ID 93 is on (Zigbee device IDs start from 89).'],
        ['0/6:1?DV93g100', 'Turn pin 6 on only if the value of Zigbee device 93 is 100 or greater.'],
        ['0/93.1:2?D5', 'Run action number 1 of the Zigbee trigger 93 (suffix .1 or .2 after the number), only if device 5 is on.'],
      ]],
      ['Buttons', [
        ['0/6:1?B1', 'Turn pin 6 on only if button 1 is pressed at this moment.'],
        ['0/6:1?BU1', 'Turn pin 6 on only if button 1 is not pressed at this moment.'],
        ['0/6:1?BH1', 'Turn pin 6 on only if button 1 is held with a long press at this moment.'],
      ]],
      ['Temperature and humidity', [
        ['0/6:1?T3<10', 'Turn pin 6 on only if sensor 3 (for example an outdoor one) is colder than 10 degrees.'],
        ['0/6:1?T3>25.5', 'Turn pin 6 on only if sensor 3 is hotter than 25.5 degrees.'],
        ['0/6:1?T5.2>25.5', 'Turn pin 6 on only if the second DS18B20 sensor on pin 5 shows more than 25.5 degrees.'],
        ['0/6:1?H4<80', 'Turn pin 6 on only if humidity on sensor 4 is below 80 percent.'],
        ['0/6:1?H4>50', 'Turn pin 6 on only if humidity on sensor 4 is above 50 percent.'],
        ['0/6:1?T3<10&!D7', 'Turn pin 6 on if sensor 3 shows cold and device 7 (for example another heater) is not on.'],
        ['0/6:1?(T3<5|H4>70)&D1', 'Turn pin 6 on if device 1 is on and sensor 3 is very cold or sensor 4 is very humid.'],
        ['0/6:1?T3>10&T3<30', 'Turn pin 6 on only if sensor 3 is warmer than 10 and colder than 30 degrees.'],
        ['0/6:1?T3<15|T3>30', 'Turn pin 6 on if sensor 3 is colder than 15 or hotter than 30 degrees.'],
      ]],
      ['Frost and negative temperatures', [
        ['0/6:1?T3<-5', 'Turn pin 6 on only if sensor 3 is colder than minus 5 degrees.'],
        ['0/6:1?T3g-12.3', 'Turn pin 6 on if sensor 3 shows minus 12.3 degrees or warmer.'],
        ['0/6:1?T3>-0.5&T3<3', 'Turn pin 6 on only if sensor 3 is between minus 0.5 and plus 3 degrees (around zero).'],
      ]],
      ['Day and night (rarely needed)', [
        ['0/6:1?Sr', 'Turn pin 6 on only if it is already day at the moment of the event. At sunrise without an offset the condition is usually true.'],
        ['-600/6:1?Ss', '10 minutes before sunrise turn pin 6 on only if it is still night.'],
      ]],
      ['A ready-made condition from the library', [
        ['0/6:1?C3', 'Turn pin 6 on only if the condition from cell C3 of the Conditions library is true.'],
        ['0/6:1?C3&!D2', 'Turn pin 6 on if the condition from cell C3 is true AND device 2 is off.'],
      ]],
      ['Several actions, each with its own condition', [
        ['0/6:1?D2,7:1?T3<10,12:0', 'Three actions. Pin 6 turns on if device 2 is on. Pin 7 turns on if sensor 3 is cold. Pin 12 turns off always. The offset 0 is common to all three.'],
        ['-300/6:1?D2,7:1', '5 minutes before the event: pin 6 turns on only if device 2 is on. Pin 7 turns on always (the condition is only on pin 6).'],
      ]],
      ['Special case: a faulty sensor', [
        ['0/6:1?T3<10|D1', 'Turn pin 6 on if sensor 3 is below 10 degrees OR device 1 is on. If sensor 3 is faulty but device 1 is on, the action is still performed.'],
      ]],
    ],
    mistakesTitle: 'Common mistakes: do not write it like this',
    mistakesNote: 'Some mistakes the page catches at once and turns the field red. Others it lets through: the line is saved, but the condition then always counts as NO and the action silently does not run. On the left is what must not be written, on the right is what happens and how to write it correctly.',
    colWrong: 'Not like this',
    colWhy: 'What happens and how to write it correctly',
    mistakes: [
      ['6:1?D2', 'No offset and no / sign. The page shows an error. Write 0/6:1?D2.'],
      ['0/6:1?', 'There is no check after the ? sign. The page shows an error. Add a condition or remove the ? sign.'],
      ['0/6:3?D2', 'The action can only be 0, 1 or 2. The page shows an error.'],
      ['0/6:1?D2,D3', 'A comma starts a new action, and D3 is not an action. The page shows an error. Write D2&D3 (AND) or D2|D3 (OR).'],
      ['0/6:1?T3>25,5', 'Tenths are written with a dot, not a comma. The page shows an error. Write T3>25.5.'],
      ['0/6:1?D2?D3', 'The ? sign is used once per action. The page shows an error. Join the checks with the signs & and |.'],
      ['0/6:1?D2 and D3', 'Words are not allowed, only signs. The line is saved, but the action never runs. Write D2&D3.'],
      ['0/6:1?T3>T5', 'You can compare only with a number, not with another sensor. The line is saved, but the action does not run. Write T3>20.'],
      ['0/6:1?(D1|D2', 'A bracket is not closed. The line is saved, but the action does not run. Write (D1|D2).'],
      ['0/6:1?D1&', 'The sign & or | at the end without a second half. The line is saved, but the action does not run. Write D1&D2.'],
      ['0/6:1?T3', 'A sensor without a comparison is just a number, not a yes/no, and the condition works incorrectly. Add a comparison: T3<10.'],
      ['Р2, Т3, В1', 'Russian letters that look like Latin ones cannot be typed into this field (they disappear). Switch the keyboard layout to English and write D2, T3, B1.'],
      ['0/6:1?C13', 'The library has 12 cells (1 to 12). A reference to a non-existent cell counts as NO, the action does not run.'],
      ['Into a Conditions cell: 0/6:1?D2', 'Only the check goes into a library cell, that is what comes after the ? sign: D2. A line with an action cannot be typed there, the cell rejects it.'],
    ],
    rulesTitle: 'Important rules',
    rules: [
      'The check happens once - at the moment of triggering (sunrise or sunset plus the offset). If the condition is true, the action is performed. If not, it is skipped and not repeated that day, even if the condition becomes true a minute later.',
      'The device must be running at that moment: the action is performed within about 5 minutes after the scheduled time. If the device was off or rebooting for longer, the action for that day is skipped.',
      'A condition belongs only to its own action. In the line 0/6:1?D2,7:1 the condition D2 affects only pin 6, and pin 7 turns on always.',
      'The offset is one for the whole line, not for each action.',
      'Inside a condition you cannot use commas or a second ? sign. A condition written right in the action can be up to 60 characters long, while one library cell holds up to 46. If a condition is long or repeats, write it once into a cell of the Conditions library (the row below on this page; the same cells can also be edited on the Switch, Encoder and PID pages) and refer to it briefly: 0/6:1?C3. A condition longer than 46 characters can be split into two cells and joined by references: 0/6:1?C3|C4. Only the check goes into the cell, without the offset and the action.',
      'The part of the line after the / sign is read by the device up to 99 characters: the page accepts more, but the firmware cuts the tail, and a cut condition will work incorrectly. Keep the line shorter.',
      'A faulty or silent sensor in a condition gives the answer "unknown": the action is skipped, even if the condition starts with !. Exception: explicit truth through |, for example T3<10|D1.',
      'The page checks only the allowed characters and the format of the line, not the meaning of the condition. So after setting up, test the condition in practice: for example, temporarily set the trigger time a couple of minutes ahead.',
      'A condition works only when triggered by Sunrise/Sunset. Manual on/off (switches, MQTT, API) does not check conditions.',
      'If the sunrise and sunset times are not calculated, conditions with Sr and Ss are always NO.',
      'If you delete a device mentioned in a condition, the condition turns into ?0 (always NO), and the action stops running until you type a new condition.',
    ],
  },
};

// ---------------------------------------------------------------------------
// Оформление справок страницы по "Правилам форматирования кода проекта":
// цветные карточки-секции, чёрные жирные заголовки (h2 text-xl, h4 text-lg),
// текст text-base, единый шрифт без font-mono, таблицы bg-white/70,
// предупреждения - красная плашка, все блоки всегда открыты.
// Классы Tailwind записаны целиком (без склейки строк), чтобы их увидела сборка.
// ---------------------------------------------------------------------------

const sunTable2 = (h1, h2, rows) => html`
  <div class="overflow-x-auto mb-3">
    <table class="w-full bg-white/70">
      <thead>
        <tr>
          <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">${h1}</th>
          <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">${h2}</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map((r) => html`
          <tr>
            <td class="border px-4 py-2 whitespace-nowrap"><code>${r[0]}</code></td>
            <td class="border px-4 py-2">${r[1]}</td>
          </tr>
        `)}
      </tbody>
    </table>
  </div>
`;

const sunTable3 = (h1, h2, h3, rows) => html`
  <div class="overflow-x-auto mb-3">
    <table class="w-full bg-white/70">
      <thead>
        <tr>
          <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">${h1}</th>
          <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">${h2}</th>
          <th class="border px-4 py-2 text-left font-bold text-black bg-black/5">${h3}</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map((r) => html`
          <tr>
            <td class="border px-4 py-2 whitespace-nowrap"><code>${r[0]}</code></td>
            <td class="border px-4 py-2">${r[1]}</td>
            <td class="border px-4 py-2"><code>${r[2]}</code>${r[3] ? ' - ' + r[3] : ''}</td>
          </tr>
        `)}
      </tbody>
    </table>
  </div>
`;

function SunCondHelp({ isRu }) {
  const X = SUN_HELP[isRu ? 'ru' : 'en'];
  return html`
    <div class="mytext space-y-6 font-sans text-base leading-relaxed text-slate-700 [&_code]:font-sans [&_code]:font-semibold [&_pre]:font-sans">

      <section class="rounded-2xl border-2 bg-indigo-50 border-indigo-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">${X.stepsTitle}</h2>
        <div class="space-y-3">
          ${X.stepsView}
        </div>
      </section>

      <section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">${X.whatTitle}</h2>
        <div class="space-y-3">
          ${X.what.map((t) => html`<p>${t}</p>`)}

          <h4 class="text-lg font-bold text-black mt-4 mb-2">${X.formatTitle}</h4>
          <p class="mb-2">${X.formatIntro}</p>
          ${sunTable2(X.colPart, X.colMeaning, X.format)}
          <div class="p-4 rounded-xl bg-white/80 border border-sky-300 mb-3">
            <p>${X.formatRead}</p>
          </div>
        </div>
      </section>

      <section class="rounded-2xl border-2 bg-violet-50 border-violet-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">${X.buildTitle}</h2>
        <div class="space-y-3">
          <ol class="list-decimal ml-6 mb-3 space-y-1">
            ${X.build.map((t) => html`<li>${t}</li>`)}
          </ol>

          <h4 class="text-lg font-bold text-black mt-4 mb-2">${X.wordsTitle}</h4>
          <p class="mb-2">${X.wordsNote}</p>
          ${sunTable2(X.colEntry, X.colRead, X.words)}

          <h4 class="text-lg font-bold text-black mt-4 mb-2">${X.signsTitle}</h4>
          ${sunTable3(X.colSign, X.colSignMeaning, X.colSignExample, X.signs)}
          <p class="mb-3">${X.tip}</p>
        </div>
      </section>

      <section class="rounded-2xl border-2 bg-teal-50 border-teal-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">${X.exTitle}</h2>
        <div class="space-y-3">
          <p class="mb-2">${X.exNote}</p>
          ${X.examples.map((g) => html`
            <h4 class="text-lg font-bold text-black mt-4 mb-2">${g[0]}</h4>
            ${sunTable2(X.colType, X.colHappens, g[1])}
          `)}
        </div>
      </section>

      <section class="rounded-2xl border-2 bg-rose-50 border-rose-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">${X.lifeTitle}</h2>
        <div class="space-y-3">
          <p class="mb-2">${X.lifeIntro}</p>
          ${X.storiesView}
        </div>
      </section>

      <section class="rounded-2xl border-2 bg-amber-50 border-amber-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">${X.mistakesTitle}</h2>
        <div class="space-y-3">
          <p class="mb-2">${X.mistakesNote}</p>
          ${sunTable2(X.colWrong, X.colWhy, X.mistakes)}
        </div>
      </section>

      <section class="rounded-2xl border-2 bg-emerald-50 border-emerald-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">${X.rulesTitle}</h2>
        <div class="space-y-3">
          <ul class="list-disc ml-6 mb-3 space-y-1">
            ${X.rules.map((t) => html`<li>${t}</li>`)}
          </ul>
        </div>
      </section>

      <section class="rounded-2xl border-2 bg-orange-50 border-orange-300 p-5 space-y-4">
        <h2 class="text-xl font-bold text-black">${X.checkTitle}</h2>
        <div class="space-y-3">
          <ul class="list-disc ml-6 mb-3 space-y-1">
            ${X.check.map((t) => html`<li>${t}</li>`)}
          </ul>
        </div>
      </section>

    </div>
  `;
}

// Справка по встроенному MQTT-брокеру (блок под таблицей MQTT Server).
// Тексты сверены с Core/Inc/mqtt_server.h и Core/Src/mqtt_server.c.
function MqttServerHelp({ isRu }) {
  return html`
    <div class="mytext space-y-6 font-sans text-base leading-relaxed text-slate-700 [&_code]:font-sans [&_code]:font-semibold [&_pre]:font-sans">
      ${isRu ? html`
        <div class="rounded-xl border border-red-300 bg-red-50 px-4 py-2 font-bold text-red-700">MQTT Server - встроенный MQTT-брокер, в настоящее время находится в разработке.</div>

        <section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Клиенты MQTT Server</h2>
          <div class="space-y-3">
            <p>MQTT Server поддерживает от 1 до 6 одновременно подключённых MQTT-клиентов. Вы можете изменить это значение, указав параметр <b>Max clients</b> в диапазоне от 1 до 6.</p>
            <p>Клиентом считается любое устройство или приложение, подключённое к серверу по MQTT. Например:</p>
            <ul class="list-disc ml-6 mb-3 space-y-1">
              <li>Шлюз SLZB-06p7U занимает 1 клиентское подключение.</li>
              <li>Подключённое Android-приложение с MQTT-клиентом - ещё одно подключение.</li>
            </ul>
            <p>Таким образом, вы можете настроить сервер на работу с необходимым количеством клиентов (от 1 до 6 устройств или приложений).</p>
          </div>
        </section>

        <section class="rounded-2xl border-2 bg-violet-50 border-violet-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Технические ограничения</h2>
          <div class="space-y-3">
            <ul class="list-disc ml-6 mb-3 space-y-1">
              <li>Поддерживается только QoS 0.</li>
              <li>Retained-сообщения поддерживаются в ограниченном виде: брокер помнит до 8 последних сообщений (топик до 63 символов, данные до 128 байт). LWT и TLS не поддерживаются.</li>
              <li>Не используйте MQTT Server и внешний MQTT-клиент на одном порту одновременно.</li>
              <li>Изменение настроек (включая Max clients) требует перезагрузки устройства.</li>
            </ul>
          </div>
        </section>

        <section class="rounded-2xl border-2 bg-teal-50 border-teal-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">SLZB IP - watchdog шлюза SLZB-06p7U</h2>
          <div class="space-y-3">
            <p>Если шлюз SLZB-06p7U не подключился к брокеру в течение 40 секунд после старта (или отвалился в процессе работы), устройство само перезагрузит его через веб-API - не чаще одного раза в минуту. Укажите в поле <b>SLZB IP</b> IP-адрес шлюза (например, 192.168.1.115). Пустое поле = watchdog выключен.</p>
          </div>
        </section>

        <section class="rounded-2xl border-2 bg-amber-50 border-amber-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Производительность при высокой нагрузке</h2>
          <div class="space-y-3">
            <div class="rounded-xl border border-red-300 bg-red-50 px-4 py-2 font-bold text-red-700">При высокой нагрузке возможны задержки и пропуски MQTT-сообщений от Zigbee-устройств.</div>
            <p>В настоящее время у автора проекта нет достаточного количества Zigbee-устройств и физического оборудования для полноценного тестирования MQTT Server при максимальной нагрузке. Поэтому невозможно гарантировать стабильную работу системы при одновременном использовании всех 89 физических пинов, 200 Zigbee-пинов и 50 таймеров, особенно если они одновременно отправляют MQTT-сообщения.</p>

            <h4 class="text-lg font-bold text-black mt-4 mb-2">Рекомендации при проблемах</h4>
            <p>Если вы столкнётесь с задержками, пропусками сообщений или другими проблемами при высокой нагрузке, отключите MQTT Server и настройте MQTT Client. MQTT Client работает стабильно даже при больших нагрузках.</p>
            <p>Для этого потребуется внешнее устройство с установленным MQTT-сервером. Это может быть:</p>
            <ul class="list-disc ml-6 mb-3 space-y-1">
              <li>Роутер с поддержкой MQTT-брокера</li>
              <li>Raspberry Pi</li>
              <li>Другое устройство (сервер, ПК и т.п.)</li>
            </ul>
          </div>
        </section>

        <section class="rounded-2xl border-2 bg-emerald-50 border-emerald-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Обратная связь</h2>
          <div class="space-y-3">
            <p>Если вы используете встроенный MQTT Server и столкнулись с проблемами, пожалуйста, сообщите о своём опыте. Предоставьте подробности конфигурации и журналы работы - эта информация поможет автору внести необходимые изменения в код и расширить возможности проекта.</p>
          </div>
        </section>
      ` : html`
        <div class="rounded-xl border border-red-300 bg-red-50 px-4 py-2 font-bold text-red-700">MQTT Server - the built-in MQTT broker is currently under development.</div>

        <section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">MQTT Server clients</h2>
          <div class="space-y-3">
            <p>MQTT Server supports from 1 to 6 simultaneously connected MQTT clients. You can change this value via the <b>Max clients</b> parameter, in the range from 1 to 6.</p>
            <p>A client is any device or application connected to the server over MQTT. For example:</p>
            <ul class="list-disc ml-6 mb-3 space-y-1">
              <li>The SLZB-06p7U gateway takes up 1 client connection.</li>
              <li>A connected Android app with an MQTT client is another connection.</li>
            </ul>
            <p>This way, you can configure the server to work with the number of clients you need (from 1 to 6 devices or applications).</p>
          </div>
        </section>

        <section class="rounded-2xl border-2 bg-violet-50 border-violet-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Technical limitations</h2>
          <div class="space-y-3">
            <ul class="list-disc ml-6 mb-3 space-y-1">
              <li>Only QoS 0 is supported.</li>
              <li>Retained messages are supported in a limited form: the broker keeps up to 8 latest messages (topic up to 63 characters, payload up to 128 bytes). LWT and TLS are not supported.</li>
              <li>Do not use MQTT Server and an external MQTT client on the same port at the same time.</li>
              <li>Changing the settings (including Max clients) requires a device reboot.</li>
            </ul>
          </div>
        </section>

        <section class="rounded-2xl border-2 bg-teal-50 border-teal-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">SLZB IP - SLZB-06p7U gateway watchdog</h2>
          <div class="space-y-3">
            <p>If the SLZB-06p7U gateway does not connect to the broker within 40 seconds after startup (or drops out during operation), the device will reboot it via its web API - no more than once per minute. Enter the gateway IP address in the <b>SLZB IP</b> field (for example, 192.168.1.115). An empty field = watchdog disabled.</p>
          </div>
        </section>

        <section class="rounded-2xl border-2 bg-amber-50 border-amber-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Performance under heavy load</h2>
          <div class="space-y-3">
            <div class="rounded-xl border border-red-300 bg-red-50 px-4 py-2 font-bold text-red-700">Under heavy load, delays and dropped MQTT messages from Zigbee devices are possible.</div>
            <p>The project author currently does not have enough Zigbee devices and physical hardware to fully test MQTT Server under maximum load. Therefore stable operation cannot be guaranteed when simultaneously using all 89 physical pins, 200 Zigbee pins and 50 timers, especially if they send MQTT messages at the same time.</p>

            <h4 class="text-lg font-bold text-black mt-4 mb-2">Recommendations if you run into problems</h4>
            <p>If you encounter delays, dropped messages or other issues under heavy load, disable MQTT Server and set up MQTT Client instead. MQTT Client works reliably even under heavy load.</p>
            <p>For this you will need an external device with an MQTT server installed. This can be:</p>
            <ul class="list-disc ml-6 mb-3 space-y-1">
              <li>A router with MQTT broker support</li>
              <li>A Raspberry Pi</li>
              <li>Another device (a server, a PC, etc.)</li>
            </ul>
          </div>
        </section>

        <section class="rounded-2xl border-2 bg-emerald-50 border-emerald-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Feedback</h2>
          <div class="space-y-3">
            <p>If you use the built-in MQTT Server and run into problems, please share your experience. Provide configuration details and logs - this information will help the author make the necessary code changes and expand the project's capabilities.</p>
          </div>
        </section>
      `}
    </div>
  `;
}
// ---------------------------------------------------------------------------

const LOG_CATEGORIES = [
  { id: 0, key: 'SYSTEM',    labelEn: 'System',    labelRu: 'Система' },
  { id: 1, key: 'MQTT',      labelEn: 'MQTT',      labelRu: 'MQTT' },
  { id: 2, key: 'NET',       labelEn: 'Network',   labelRu: 'Сеть' },
  { id: 3, key: 'GSM',       labelEn: 'GSM',       labelRu: 'GSM' },
  { id: 4, key: 'SCHEDULER', labelEn: 'Scheduler', labelRu: 'Планировщик' },
  { id: 5, key: 'SENSORS',   labelEn: 'Sensors',   labelRu: 'Датчики' },
  { id: 6, key: 'PID',       labelEn: 'PID Controller', labelRu: 'ПИД-регулятор' },
  { id: 7, key: 'SETTINGS',  labelEn: 'Settings',  labelRu: 'Настройки' },
  { id: 8, key: 'ETH',       labelEn: 'Ethernet',  labelRu: 'Ethernet' },
  { id: 9, key: 'PHY',       labelEn: 'PHY',       labelRu: 'PHY' },
  { id: 10, key: 'Z2M',      labelEn: 'Z2M',       labelRu: 'Z2M' },
  { id: 11, key: 'OTA',      labelEn: 'OTA',       labelRu: 'OTA' }
];

function Settings({ }) {
  const [settings, setSettings] = useState({});
  const [saveResult, setSaveResult] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const [toast, setToast] = useState(null);
  const [topNotification, setTopNotification] = useState(null);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [isPrivateKeyHidden, setIsPrivateKeyHidden] = useState(false);
  const [isPublicKeyHidden, setIsPublicKeyHidden] = useState(false);
  const [isSecretKeyHidden, setIsSecretKeyHidden] = useState(false);
  const [isTelegramTokenHidden, setIsTelegramTokenHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const lastInputTime = useRef(0);
  const [logFilterOpen, setLogFilterOpen] = useState(false);
  const [mqttSectionOpen, setMqttSectionOpen] = useState(false);
  const mqttSectionInit = useRef(false);
  const [condHelpOpen, setCondHelpOpen] = useState(false);
  // Инициализируем глобальный tooltip один раз при монтировании
  useEffect(() => {
    initGlobalTooltip();
    // Скрываем On/Off подписи у ползунка Network
    if (!document.getElementById('__network_toggle_style')) {
      const s = document.createElement('style');
      s.id = '__network_toggle_style';
      s.textContent = '.network-toggle span { display: none !important; }';
      document.head.appendChild(s);
    }
  }, []);

  // Сокращение для getTip с текущим языком
  const gt = (label) => getTip(label, settings.lang || 'ru', rulangsettings, enlangsettings);

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'ru', label: 'Russian' }
  ];

  const timeZone = [
    [-12.0, '(GMT -12:00) Eniwetok, Kwajalein'],
    [-11.0, '(GMT -11:00) Midway Island, Samoa'],
    [-10.0, '(GMT -10:00) Hawaii'],
    [-9.0,  '(GMT -9:00) Alaska'],
    [-8.0,  '(GMT -8:00) Pacific Time (US & Canada)'],
    [-7.0,  '(GMT -7:00) Mountain Time (US & Canada)'],
    [-6.0,  '(GMT -6:00) Central Time (US & Canada), Mexico City'],
    [-5.0,  '(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima'],
    [-4.0,  '(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz'],
    [-3.3,  '(GMT -3:30) Newfoundland'],
    [-3.0,  '(GMT -3:00) Brazil, Buenos Aires, Georgetown'],
    [-2.0,  '(GMT -2:00) Mid-Atlantic'],
    [-1.0,  '(GMT -1:00) Azores, Cape Verde Islands'],
    [0.0,   '(GMT +0:00) Western Europe Time, London, Lisbon, Casablanca'],
    [1.0,   '(GMT +1:00) Brussels, Copenhagen, Madrid, Paris'],
    [2.0,   '(GMT +2:00) Kaliningrad, South Africa'],
    [3.0,   '(GMT +3:00) Yashalta, Moscow, St. Petersburg, Baghdad, Riyadh'],
    [3.3,   '(GMT +3:30) Tehran'],
    [4.0,   '(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi'],
    [4.3,   '(GMT +4:30) Kabul'],
    [5.0,   '(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent'],
    [5.3,   '(GMT +5:30) Bombay, Calcutta, Madras, New Delhi'],
    [5.45,  '(GMT +5:45) Kathmandu'],
    [6.0,   '(GMT +6:00) Almaty, Dhaka, Colombo'],
    [7.0,   '(GMT +7:00) Bangkok, Hanoi, Jakarta'],
    [8.0,   '(GMT +8:00) Beijing, Perth, Singapore, Hong Kong'],
    [9.0,   '(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk'],
    [9.3,   '(GMT +9:30) Adelaide, Darwin'],
    [10.0,  '(GMT +10:00) Eastern Australia, Guam, Vladivostok'],
    [11.0,  '(GMT +11:00) Magadan, Solomon Islands, New Caledonia'],
    [12.0,  '(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka']
  ];

  // FIX: ipRegex и subnetMaskRegex объявлены локально — не полагаемся на экспорт из main.js
  const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const subnetMaskRegex = /^(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)$/;

  const parseOfflineDateTime = (offldt) => {
    if (!offldt) return { date: '', time: '' };
    const dateMatch = offldt.match(/d:(\d{1,2}\.\d{1,2}\.\d{2})/);
    const timeMatch = offldt.match(/t:(\d{2}:\d{2}:\d{2})/);
    return {
      date: dateMatch ? dateMatch[1] : '',
      time: timeMatch ? timeMatch[1] : ''
    };
  };

  const validateDateFormat = (dateStr) => {
    const pattern = /^\d{1,2}\.\d{1,2}\.\d{2}$/;
    if (!pattern.test(dateStr)) return false;
    const [day, month, year] = dateStr.split('.').map(Number);
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    if (year < 0 || year > 99) return false;
    const currentYear = new Date().getFullYear() % 100;
    if (year > currentYear + 5) return false;
    const daysInMonth = new Date(2000 + year, month, 0).getDate();
    if (day > daysInMonth) return false;
    return true;
  };

  const validateTimeFormat = (timeStr) => {
    const pattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    return pattern.test(timeStr);
  };

  // Sunrise / Sunset: формат "смещение/действия", например "0/6:1,12:1,18:0".
  //   смещение - целое число секунд относительно времени восхода/заката
  //              (отрицательное - раньше, положительное - позже);
  //   действия - список "пин:действие" через запятую, действие: 0 - выкл,
  //              1 - вкл, 2 - переключить; для Zigbee-триггеров допустим
  //              суффикс ".1" или ".2" после номера пина (например 93.1:2).
  // Прошивка режет часть действий до 127 байт (stack-буфер в action_handler).
  const SUN_ACTIONS_MAX_LEN = 127;
  const SUN_OFFSET_MAX = 86399;

  const sanitizeSunInput = (value) => {
    if (typeof value !== 'string') return '';
    // Разрешены цифры/формат и символы условий после '?': D1, !D2, DV1>0, B1, BH1, T5>25.5, Sr, Ss...
    // '-' экранирован: без этого "+-A" - диапазон, и заглавные B..Y (C, R, S, T, H...) вырезались
    return value.replace(/[^0-9:,.\/+\-A-Za-z()!&|=<>?]/g, '');
  };

  const validateSunActions = (value, required, isRu) => {
    const v = (value === undefined || value === null) ? '' : String(value);
    if (v === '') {
      return required
        ? (isRu ? 'Поле обязательно: переключатель включен. Пример: 0/6:1,12:0'
                : 'Required: the switch is on. Example: 0/6:1,12:0')
        : null;
    }
    const slashCount = (v.match(/\//g) || []).length;
    if (slashCount !== 1) {
      return isRu ? 'Нужен ровно один символ "/" между смещением и действиями. Пример: 0/6:1,12:0'
                  : 'Exactly one "/" is required between offset and actions. Example: 0/6:1,12:0';
    }
    const [offsetPart, actionsPart] = v.split('/');
    if (!/^[+-]?\d{1,5}$/.test(offsetPart) || Math.abs(parseInt(offsetPart, 10)) > SUN_OFFSET_MAX) {
      return isRu ? 'Смещение до "/" - целое число секунд от -86399 до 86399 (например 0 или -600)'
                  : 'Offset before "/" must be an integer number of seconds from -86399 to 86399 (e.g. 0 or -600)';
    }
    if (actionsPart === '') {
      return isRu ? 'После "/" укажите действия. Пример: 0/6:1,12:0'
                  : 'Specify actions after "/". Example: 0/6:1,12:0';
    }
    if (actionsPart.length > SUN_ACTIONS_MAX_LEN) {
      return isRu ? 'Часть с действиями длиннее ' + SUN_ACTIONS_MAX_LEN + ' символов'
                  : 'Actions part is longer than ' + SUN_ACTIONS_MAX_LEN + ' characters';
    }
    const tokens = actionsPart.split(',');
    const condChars = 'A-Za-z0-9()!&|=<>.-';
    const tokRe = new RegExp('^(\\d{1,3})(?:\\.([12]))?:([0-2])(\\?[' + condChars + ']{1,60})?$');
    for (const tok of tokens) {
      const m = tokRe.exec(tok);
      if (!m || parseInt(m[1], 10) > 255) {
        return isRu ? 'Неверное действие "' + tok + '". Ожидается пин:действие?условие, действие 0, 1 или 2 (например 6:1 или 6:1?D2)'
                    : 'Invalid action "' + tok + '". Expected pin:action?condition, action is 0, 1 or 2 (e.g. 6:1 or 6:1?D2)';
      }
    }
    return null;
  };

  // SLZB IP (watchdog шлюза SLZB-06p7U): поле опциональное (пусто = watchdog выключен),
  // но если пользователь что-то ввёл — это должен быть строго IPv4-адрес.
  // Мусор в этом поле нельзя: прошивка по нему шлёт шлюзу HTTP-reboot.
  // На лету вычищаем всё, кроме цифр и точек, ограничиваем формат адреса.
  const sanitizeIpInput = (value) => {
    if (typeof value !== 'string') return '';
    const parts = value.replace(/[^0-9.]/g, '').split('.').slice(0, 4);
    return parts.map((p) => p.slice(0, 3)).join('.');
  };

  const isValidIpInput = (value) => ipRegex.test(value);

  const isFormValid = (settings, errors) => {
    const hasErrors = Object.values(errors).some((error) => error !== null);
    const requiredFieldsFilled = settings.usehttps
      ? settings.domain && settings.domain.trim() !== ''
      : true;
    return !(hasErrors || !requiredFieldsFilled);
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => { setToast(null); }, 3000);
  };

  const showTopNotification = (message) => {
    setTopNotification(message);
    setTimeout(() => { setTopNotification(null); }, 3000);
  };

  const validateInput = (key, value) => {
    let error = null;
    if (!settings.usehttps && ['domain', 'tls_key', 'tls_cert', 'tls_ca', 'telegram_token'].includes(key)) {
      return null;
    }
    if (!value && ['ip_addr', 'gateway', 'mqtt_hst', 'sb_mask', 'offdate', 'offtime', 'domain'].includes(key)) {
      return 'Поле не может быть пустым';
    }
    switch (key) {
      case 'ip_addr':
      case 'gateway':
      case 'mqtt_hst':
        if (value.length > 50) error = 'Слишком длинное имя хоста';
        break;
      case 'slzb_host':
        // Опциональное поле: пусто = SLZB watchdog выключен (валидной считается и пустота).
        if (value && value.trim() !== '' && !isValidIpInput(value)) {
          error = 'Неверный формат IP-адреса (пример: 192.168.1.115)';
        }
        break;
      case 'sb_mask':
        if (!subnetMaskRegex.test(value)) error = 'Неверная маска подсети';
        break;
      case 'offdate':
        if (!validateDateFormat(value)) error = 'Неверный формат даты (д.м.гг)';
        break;
      case 'offtime':
        if (!validateTimeFormat(value)) error = 'Неверный формат времени (чч:мм:сс)';
        break;
      case 'sunrise_pins':
        error = validateSunActions(value, false, (settings.lang || 'ru') === 'ru');
        break;
      case 'sunset_pins':
        error = validateSunActions(value, false, (settings.lang || 'ru') === 'ru');
        break;
      case 'domain':
        if (value.length > 50) {
          error = 'Домен не должен превышать 50 символов';
        } else if (!value.match(/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/)) {
          error = 'Неверный формат домена';
        }
        break;
      case 'tls_key':
        if (value && value.trim() !== '') {
          if (value.length > 512) error = 'Private Key не должен превышать 512 символов';
          else if (!value.includes('BEGIN EC PRIVATE KEY') || !value.includes('END EC PRIVATE KEY')) error = 'Неверный формат Private Key';
        }
        break;
      case 'tls_cert':
        if (value && value.trim() !== '') {
          if (value.length > 1024) error = 'Public Key не должен превышать 1024 символов';
          else if (!value.includes('BEGIN CERTIFICATE') || !value.includes('END CERTIFICATE')) error = 'Неверный формат Public Key';
        }
        break;
      case 'tls_ca':
        if (value && value.trim() !== '') {
          if (value.length > 1024) error = 'Secret Key не должен превышать 1024 символов';
          else if (!value.includes('BEGIN CERTIFICATE') || !value.includes('END CERTIFICATE')) error = 'Неверный формат Secret Key';
        }
        break;
    }
    return error;
  };

  const handleLogMaskChange = (newMask) => {
    const isRu = (settings.lang || 'ru') === 'ru';
    setSettings(prev => ({ ...prev, log_filter_mask: newMask }));
    fetch('/api/logfilter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mask: newMask })
    })
      .then(r => {
        if (!r.ok) throw new Error('Network error');
        return r.json();
      })
      .then(data => {
        if (data.status) {
          showToast(isRu ? 'Фильтр логов обновлен в RAM' : 'Log filter updated in RAM', 'success');
        }
      })
      .catch(err => {
        console.error('Error applying log filter in RAM:', err);
        showToast(isRu ? 'Ошибка обновления RAM фильтра' : 'Error updating RAM log filter', 'error');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    {
      const isRuSun = (settings.lang || 'ru') === 'ru';
      const sunriseError = validateSunActions(settings.sunrise_pins, !!settings.onsunrise, isRuSun);
      const sunsetError = validateSunActions(settings.sunset_pins, !!settings.onsunset, isRuSun);
      if (sunriseError || sunsetError) {
        setErrors(prev => ({ ...prev, sunrise_pins: sunriseError, sunset_pins: sunsetError }));
        showToast(isRuSun ? 'Неверный формат полей Sunrise/Sunset' : 'Invalid Sunrise/Sunset format', 'error');
        return;
      }
    }
    const formData = new FormData(formRef.current);
    let jsonData = { ...settings };
    for (const [key, value] of formData.entries()) {
      if (['lon_de', 'lat_de', 'timezone', 'mqtt_prt', 'mqtt_srv_prt', 'mqtt_srv_maxcli'].includes(key)) {
        jsonData[key] = value === '' || value === null ? 0 : Number(value);
      } else {
        jsonData[key] = value;
      }
    }
    if (!jsonData.usehttps) {
      ['tls_ca', 'tls_key', 'tls_cert', 'telegram_token', 'domain'].forEach(f => delete jsonData[f]);
    }
    if (jsonData.offdate && jsonData.offtime) {
      jsonData.offldt = `d:${jsonData.offdate} t:${jsonData.offtime}`;
    } else {
      delete jsonData.offldt;
    }
    ['lon_de', 'lat_de', 'timezone', 'mqtt_prt', 'mqtt_srv_prt', 'mqtt_srv_maxcli'].forEach((key) => {
      if (jsonData[key] === null || jsonData[key] === '') jsonData[key] = 0;
    });
    jsonData.onsunrise = jsonData.onsunrise ? 1 : 0;
    jsonData.onsunset  = jsonData.onsunset  ? 1 : 0;
    jsonData.check_ip   = jsonData.check_ip   ? 1 : 0;
    jsonData.check_mqtt = jsonData.check_mqtt ? 1 : 0;
    jsonData.check_mqtt_srv = jsonData.check_mqtt_srv ? 1 : 0;
    jsonData.usehttps   = jsonData.usehttps   ? 1 : 0;

    fetch('/api/mysett/set', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonData),
    })
      .then((r) => { if (!r.ok) throw new Error('Ошибка сети'); return r.json(); })
      .then((data) => {
        setSubmissionStatus('success');
        setSaveResult(data);
        showToast('Данные успешно сохранены', 'success');
        showTopNotification('Данные успешно сохранены');
        lastInputTime.current = 0;
      })
      .catch((error) => {
        setSubmissionStatus('error');
        setSaveResult(error);
        showToast('Ошибка при сохранении данных', 'error');
        showTopNotification('Ошибка при сохранении данных');
      });
  };

  const handleChange = (key, value) => {
    let error = null;
    if (key === 'slzb_host') {
      // Чистим мусор ДО записи в state: буквы/пробелы/лишние точки просто
      // не попадут в поле, а не появятся с красной рамкой
      value = sanitizeIpInput(value);
      error = validateInput(key, value);
    } else if (key === 'sunrise_pins' || key === 'sunset_pins') {
      // Только цифры и символы формата: пробелы и буквы не попадут в поле
      value = sanitizeSunInput(value);
      error = validateInput(key, value);
    } else if (key === 'offdate') {
      error = validateDateFormat(value) ? null : 'Неверный формат даты (д.м.гг)';
    } else if (key === 'offtime') {
      error = validateTimeFormat(value) ? null : 'Неверный формат времени (чч:мм:сс)';
    } else {
      error = validateInput(key, value);
    }
    setErrors(prevErrors => {
      const newErrors = { ...prevErrors, [key]: error };
      const certKeys = ['tls_key', 'tls_cert', 'tls_ca'];
      const hasOtherErrors = Object.keys(newErrors)
        .filter(k => !certKeys.includes(k) && k !== 'telegram_token')
        .some(k => newErrors[k] !== null);
      setSubmitButtonDisabled(hasOtherErrors || (!settings.usehttps && certKeys.some(ck => settings[ck])));
      return newErrors;
    });
    let processedValue = value;
    if (['lon_de', 'lat_de', 'timezone', 'mqtt_prt', 'mqtt_srv_prt', 'mqtt_srv_maxcli'].includes(key)) {
      processedValue = value === '' || value === null ? 0 : Number(value);
    } else if (['onsunrise', 'onsunset', 'check_ip', 'check_mqtt', 'check_mqtt_srv', 'usehttps'].includes(key)) {
      processedValue = value ? 1 : 0;
    }
    setSettings(prev => ({ ...prev, [key]: processedValue }));
    lastInputTime.current = Date.now();
    if (key === 'usehttps') {
      setErrors({});
      setSubmitButtonDisabled(false);
    }
  };

  // FIX: handleDelete удалён — нигде не вызывается, вместо него везде используется handleChange(key, '')

  const refresh = () =>
    fetch('/api/mysett/get', { cache: 'no-store' })
      .then((r) => r.json())
      .then((r) => {
        if (r !== null && r !== undefined) {
          if (r.offldt) {
            const { date, time } = parseOfflineDateTime(r.offldt);
            r.offdate = date;
            r.offtime = time;
          }
          setSettings(r);
        }
        return r;
      })
      .catch(error => {
        console.error('Error fetching settings:', error);
        showToast('Ошибка при загрузке настроек', 'error');
      });

  useEffect(() => {
    let active = true;

    registerPoll('settings', '/api/mysett/get', function(r) {
      if (!active) return;
      if (Date.now() - lastInputTime.current < 8000) return;
      var activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'SELECT')) {
        return;
      }
      if (r !== null && r !== undefined) {
        if (r.offldt) {
          var dt = parseOfflineDateTime(r.offldt);
          r.offdate = dt.date;
          r.offtime = dt.time;
        }
        setSettings(r);
        setIsLoading(false);
        if (r.tls_key)        setIsPrivateKeyHidden(true);
        if (r.tls_cert)       setIsPublicKeyHidden(true);
        if (r.tls_ca)         setIsSecretKeyHidden(true);
        if (r.telegram_token) setIsTelegramTokenHidden(true);
      }
    }, {immediate: true});

    return function() {
      active = false;
      unregisterPoll('settings');
    };
  }, []);

  useEffect(() => {
    setSubmitButtonDisabled(!isFormValid(settings, errors));
  }, [settings, errors]);

  // Автораскрытие секции MQTT при первой загрузке, если Client или Server уже включены
  useEffect(() => {
    if (!isLoading && !mqttSectionInit.current) {
      mqttSectionInit.current = true;
      setMqttSectionOpen(!!(settings.check_mqtt || settings.check_mqtt_srv));
    }
  }, [isLoading]);

  if (isLoading) return html`<div>Loading...</div>`;
  if (!settings) return '';

  // Проверка полей Sunrise/Sunset на каждом рендере: ошибка видна и для значения,
  // пришедшего из прошивки, а не только после ручного редактирования
  const isRuSun = (settings.lang || 'ru') === 'ru';
  const sunErr_sunrise_pins = validateSunActions(settings.sunrise_pins, !!settings.onsunrise, isRuSun);
  const sunErr_sunset_pins = validateSunActions(settings.sunset_pins, !!settings.onsunset, isRuSun);
  const sunHasError = !!(sunErr_sunrise_pins || sunErr_sunset_pins);
  const sunHint = isRuSun
    ? 'Формат: СМЕЩЕНИЕ/действия. Одно смещение (секунды от восхода ИЛИ заката - смотря в какое поле записано; отрицательное - раньше) относится ко всем действиям после "/". У каждого действия может быть условие после "?". Примеры: 0/6:1,12:0 (на восходе: вкл 6, выкл 12), -600/6:1?D2 (за 10 мин до восхода включить 6, если устройство 2 включено). Подробная справка по условиям - в блоке ниже'
    : 'Format: OFFSET/actions. A single offset (seconds from sunrise OR sunset - whichever field it is in; negative = earlier) applies to ALL actions after "/". Each action may carry a condition after "?". Examples: 0/6:1,12:0 (at sunrise: on 6, off 12), -600/6:1?D2 (10 min before sunrise, turn 6 on if device 2 is on). Detailed help on conditions is in the block below';

  // Библиотека условий (12 записей): условия выбираются в модалках
  // Encoder/Switch/PID; инлайн-условия пишутся прямо в действиях "?D2&DV3>50"
  const handleCondChange = (idx, value) => {
    setSettings(prev => {
      const arr = Array.isArray(prev.conds) ? prev.conds.slice() : [];
      while (arr.length < 12) arr.push('');
      arr[idx] = value;
      return { ...prev, conds: arr };
    });
    lastInputTime.current = Date.now();
  };
  const condsArr = Array.isArray(settings.conds) ? settings.conds : [];

  const saveBtn = (extraClass = '') => html`
    <button
      type="submit"
      class=${`relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] hover:-translate-y-0.5 active:translate-y-0 ${(submitButtonDisabled || sunHasError) ? 'opacity-50 cursor-not-allowed bg-slate-400' : 'bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500'} ${extraClass}`}
      disabled=${submitButtonDisabled || sunHasError}
    >
      <span class="relative flex items-center gap-2 text-lg tracking-wide drop-shadow-md">Save changes</span>
    </button>
  `;

  return html`
    <div class="flex flex-col items-center w-full p-4 mb-16">
      <div class="flex flex-col items-center w-full p-6 bg-white/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 relative overflow-hidden">
        <!-- Decorative background glow -->
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <!-- Light / dark theme switch (top-right corner of the panel) -->
        <${ThemeToggle} lang=${settings.lang || 'ru'} />

        <!-- Header -->
        <div class="w-full mb-2 px-2 pr-24 flex flex-row items-center gap-6">
          <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight drop-shadow-sm uppercase">Global Settings</h2>
          <select
            value=${settings.lang}
            onChange=${(e) => handleChange('lang', e.target.value)}
            style="border: 2px solid #22d3ee; border-radius: 8px; padding: 4px 10px; font-size: 14px; font-weight: 600; background: white; color: #1e293b; cursor: pointer; outline: none;"
          >
            ${languages.map((lang) => html`<option value=${lang.value}>${lang.label}</option>`)}
          </select>
        </div>
        <div class="w-full px-2">
          <p class="text-sm text-slate-600 mb-6 max-w-3xl">${(settings.lang || 'ru') === 'ru' ? 'Лампа на крыльце сама загорается на закате, а вы даже не встали с дивана. Здесь настраивается всё общее: язык, логин и пароль, часовой пояс, восход и закат, сеть, MQTT. Достаточно один раз.' : 'The porch lamp lights up at sunset and you never leave the sofa. Everything shared lives here: language, login and password, time zone, sunrise and sunset, network, MQTT. Set it up once.'}</p>
        </div>

        ${topNotification && html`
          <div class="w-full max-w-4xl bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white font-bold px-4 py-3 rounded-xl shadow-md text-center mb-6 border border-green-400/50 backdrop-blur-md">
            ${topNotification}
          </div>
        `}

        <form ref=${formRef} onSubmit=${handleSubmit} class="w-full max-w-4xl flex flex-col gap-6 relative">

          <div class="flex justify-end w-full">${saveBtn()}</div>

          <!-- ============================================================
               User data
          ============================================================ -->
          <div class="w-full mb-6">
            <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
              <table class="w-full table-fixed text-left border-collapse">
                <thead>
                  <tr class="bg-teal-600/10 border-b border-teal-600/20">
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-1/3">User data</th>
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                  </tr>
                </thead>
                <tbody>
              ${[
                { label: 'Login',        key: 'adm_name', type: 'text'     },
                { label: 'Password',     key: 'adm_pswd', type: 'password' },
                { label: 'Time zone UTC',key: 'timezone', type: 'select', options: timeZone }
              ].map((item, index) => html`
                <${FieldRow} label=${item.label} tip=${gt(item.tipLabel || item.label)} index=${index}>
                  <${pageSetting}
                    value=${settings[item.key]}
                    setfn=${(v) => handleChange(item.key, v)}
                    type=${item.type}
                    options=${item.options}
                    class=${`w-full px-3 py-2 bg-white/50 border ${errors[item.key] ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                    error=${errors[item.key]}
                  />
                <//>
              `)}
                </tbody>
              </table>
            </div>
          </div>

          <!-- ============================================================
               Network
          ============================================================ -->
          <div class="w-full mb-6">
            ${!settings.check_ip ? html`
              <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
                <table class="w-full table-fixed text-left border-collapse">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-1/3">
                        <div class="flex items-center gap-3">
                          <span>Network</span>
                          <div class="network-toggle">
                            <${MyPolzunok} value=${settings.check_ip} onChange=${(v) => handleChange('check_ip', v)} />
                          </div>
                          <span class="text-slate-600 font-medium tracking-wide text-lg">
                            ${settings.check_ip ? 'DHCP' : 'Static IP'}
                          </span>
                        </div>
                      </th>
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                  ${[
                    { label: 'IP address',     key: 'ip_addr',  type: 'text' },
                    { label: 'Subnet mask',    key: 'sb_mask',  type: 'text' },
                    { label: 'Default gateway',key: 'gateway',  type: 'text' }
                  ].map((item, index) => html`
                    <${FieldRow} label=${item.label} tip=${gt(item.tipLabel || item.label)} index=${index}>
                      <${pageSetting}
                        value=${settings[item.key]}
                        setfn=${(v) => handleChange(item.key, v)}
                        type=${item.type}
                        class=${`w-full px-3 py-2 bg-white/50 border ${errors[item.key] ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                        error=${errors[item.key]}
                      />
                    <//>
                  `)}
                  </tbody>
                </table>
              </div>
            ` : html`
              <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
                <table class="w-full table-fixed text-left border-collapse">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide" colspan="2">
                        <div class="flex items-center gap-3">
                          <span>Network</span>
                          <div class="network-toggle">
                            <${MyPolzunok} value=${settings.check_ip} onChange=${(v) => handleChange('check_ip', v)} />
                          </div>
                          <span class="text-slate-600 font-medium tracking-wide text-lg">DHCP</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            `}
          </div>

          <!-- ============================================================
               API Settings
          ============================================================ -->
          <div class="w-full mb-6">
            <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
              <table class="w-full table-fixed text-left border-collapse">
                <thead>
                  <tr class="bg-teal-600/10 border-b border-teal-600/20">
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-1/3">API Settings</th>
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                  </tr>
                </thead>
                <tbody>
              <${FieldRow} label="Token" tip=${gt("Token")} index=${0}>
                <${pageSetting}
                  value=${settings.token}
                  setfn=${(v) => handleChange('token', v)}
                  type="text"
                  class="w-full px-3 py-2 bg-white/50 border border-white/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              <//>
                </tbody>
              </table>
            </div>
          </div>

          <!-- ============================================================
               MQTT — общий блок (топики) + подсекции Client / Server
          ============================================================ -->
          <div class="w-full mb-6">
            <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
              <table class="w-full table-fixed text-left border-collapse">
                <thead>
                  <tr class="bg-teal-600/10 border-b border-teal-600/20">
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide" colspan="2">
                      <div class="flex items-center gap-3">
                        <span>MQTT</span>
                        <${MyPolzunok} value=${mqttSectionOpen} onChange=${(v) => setMqttSectionOpen(v)} />
                      </div>
                    </th>
                  </tr>
                </thead>
                ${mqttSectionOpen ? html`
                  <tbody>
                ${[
                  { label: 'TX topic',  key: 'txmqttop', type: 'text', maxlength: 32 },
                  { label: 'RX topic',  key: 'rxmqttop', type: 'text', maxlength: 32 },
                  { label: 'Z2M topic', key: 'rxzbtop',  type: 'text', maxlength: 32, tipLabel: 'RX Z2M topic', placeholder: 'zigbee2mqtt' }
                ].map((item, index) => html`
                  <${FieldRow} label=${item.label} tip=${gt(item.tipLabel || item.label)} index=${index}>
                    <${pageSetting}
                      value=${settings[item.key]}
                      setfn=${(v) => handleChange(item.key, v)}
                      type=${item.type}
                      maxlength=${item.maxlength}
                      placeholder=${item.placeholder || ''}
                      class=${`w-full px-3 py-2 bg-white/50 border ${errors[item.key] ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                      error=${errors[item.key]}
                    />
                  <//>
                `)}
                  </tbody>
                ` : html`<tbody></tbody>`}
              </table>
            </div>

            ${mqttSectionOpen ? html`
            <div class="pl-6 mt-4 space-y-4 border-l-2 border-teal-500/30">

              <!-- ---- MQTT Client ---- -->
              <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
                <table class="w-full table-fixed text-left border-collapse">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-1/3">
                        <div class="flex items-center gap-3">
                          <span>MQTT Client</span>
                          <${MyPolzunok} value=${settings.check_mqtt} onChange=${(v) => handleChange('check_mqtt', v)} />
                        </div>
                      </th>
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                    </tr>
                  </thead>
                  ${settings.check_mqtt ? html`
                    <tbody>
                  ${[
                    { label: 'Host',     key: 'mqtt_hst',  type: 'text',     maxlength: 50 },
                    { label: 'Port',     key: 'mqtt_prt',  type: 'number'   },
                    { label: 'Client',   key: 'mqtt_clt',  type: 'text',     maxlength: 32 },
                    { label: 'User',     key: 'mqtt_usr',  type: 'text',     maxlength: 32 },
                    { label: 'Password', key: 'mqtt_pswd', type: 'password', maxlength: 32, tipLabel: 'Password (MQTT)' }
                  ].map((item, index) => html`
                    <${FieldRow} label=${item.label} tip=${gt(item.tipLabel || item.label)} index=${index}>
                      <${pageSetting}
                        value=${settings[item.key]}
                        setfn=${(v) => handleChange(item.key, v)}
                        type=${item.type}
                        maxlength=${item.maxlength}
                        class=${`w-full px-3 py-2 bg-white/50 border ${errors[item.key] ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                        error=${errors[item.key]}
                      />
                    <//>
                  `)}
                    </tbody>
                  ` : html`<tbody></tbody>`}
                </table>
              </div>

              <!-- ---- MQTT Server (экспериментальный встроенный брокер) ---- -->
              <div class="w-full overflow-auto rounded-2xl shadow-lg border border-amber-400/60 bg-white/30 backdrop-blur-sm">
                <table class="w-full table-fixed text-left border-collapse">
                  <thead>
                    <tr class="bg-amber-500/10 border-b border-amber-500/20">
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-1/3 cursor-help" data-tip=${gt('MQTT Server')}>
                        <div class="flex items-center gap-3">
                          <span>MQTT Server</span>
                          <${MyPolzunok} value=${settings.check_mqtt_srv} onChange=${(v) => handleChange('check_mqtt_srv', v)} />
                        </div>
                      </th>
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                    </tr>
                  </thead>
                  ${settings.check_mqtt_srv ? html`
                    <tbody>
                  ${[
                    { label: 'Port',        key: 'mqtt_srv_prt',    type: 'number',   tipLabel: 'Port (srv)',     min: 1, max: 65535 },
                    { label: 'Max clients', key: 'mqtt_srv_maxcli', type: 'number',   tipLabel: 'Max clients',    min: 1, max: 6 },
                    { label: 'User',        key: 'mqtt_srv_usr',    type: 'text',     maxlength: 32, tipLabel: 'User (srv)' },
                    { label: 'Password',    key: 'mqtt_srv_pswd',   type: 'password', maxlength: 32, tipLabel: 'Password (srv)' },
                    { label: 'SLZB IP',     key: 'slzb_host',       type: 'text',     maxlength: 15, tipLabel: 'SLZB IP', placeholder: '192.168.1.115' }
                  ].map((item, index) => html`
                    <${FieldRow} label=${item.label} tip=${gt(item.tipLabel || item.label)} index=${index}>
                      <${pageSetting}
                        value=${settings[item.key]}
                        setfn=${(v) => handleChange(item.key, v)}
                        name=${item.key}
                        type=${item.type}
                        maxlength=${item.maxlength}
                        min=${item.min}
                        max=${item.max}
                        class=${`w-full px-3 py-2 bg-white/50 border ${errors[item.key] ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                        error=${errors[item.key]}
                      />
                    <//>
                  `)}
                    </tbody>
                  ` : html`<tbody></tbody>`}
                </table>
                ${settings.check_mqtt_srv ? html`
                  <div class="px-6 py-5 border-t border-amber-500/20">
                    <${MqttServerHelp} isRu=${(settings.lang || 'ru') === 'ru'} />
                  </div>
                ` : ''}
              </div>

            </div>
            ` : ''}
          </div>

          <!-- ============================================================
               HTTPS
          ============================================================ -->
          <div class="w-full mb-6">
            ${settings.usehttps ? html`
              <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
                <table class="w-full table-fixed text-left border-collapse">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-1/3">
                        <div class="flex items-center gap-3">
                          <span>HTTPS</span>
                          <${MyPolzunok} value=${settings.usehttps} onChange=${(v) => handleChange('usehttps', v)} />
                        </div>
                      </th>
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                ${[
                  { label: 'HTTPS domain', key: 'domain',   type: 'text'     },
                  { label: 'Private Key',  key: 'tls_key',  type: 'textarea' },
                  { label: 'Public Key',   key: 'tls_cert', type: 'textarea' }
                ].map((item, index) => html`
                  <tr class="transition-colors border-b border-slate-200 ${index % 2 === 0 ? 'bg-sky-200/40' : 'bg-white/80'} hover:bg-slate-200/80">
                    <td
                      class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help align-top"
                      data-tip=${gt(item.label)}
                    >
                      ${item.label}
                    </td>
                    <td class="w-2/3 pl-4 py-4 pr-6 align-top">
                      <div class="relative w-full">
                        ${item.type === 'textarea'
                          ? html`
                            ${item.key === 'tls_key' && settings.tls_key
                              ? html`<div class="w-full px-3 py-2 bg-white/40 border border-white/50 rounded-lg text-slate-600 font-medium shadow-inner">Данные введены, но информация скрыта!</div>`
                              : item.key === 'tls_cert' && settings.tls_cert
                                ? html`<div class="w-full px-3 py-2 bg-white/40 border border-white/50 rounded-lg text-slate-600 font-medium shadow-inner">Данные введены успешно!</div>`
                                : html`<textarea
                                    name=${item.key}
                                    value=${settings[item.key] || ''}
                                    onInput=${(e) => handleChange(item.key, e.target.value)}
                                    class=${`w-full px-3 py-2 bg-white/50 border ${errors[item.key] ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                                    rows="1"
                                    placeholder="Enter ${item.label}"
                                  ></textarea>`
                            }
                          `
                          : html`
                            <input
                              type="text"
                              name=${item.key}
                              value=${settings[item.key] || ''}
                              onInput=${(e) => handleChange(item.key, e.target.value)}
                              class=${`w-full px-3 py-2 bg-white/50 border ${errors[item.key] ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                              maxlength="30"
                              placeholder="Enter domain (e.g., zagotovka.ddns.net)"
                            />
                          `}
                        ${settings[item.key] && item.key === 'tls_cert' && html`
                          <div class="absolute right-0 top-0 mt-[3px] mr-[3px] flex gap-2">
                            <button type="button"
                              onClick=${() => { navigator.clipboard.writeText(settings[item.key]); showTopNotification('Данные скопированы'); }}
                              class="px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(16,185,129,0.3)] hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-0.5"
                            >Копировать</button>
                            <button type="button"
                              onClick=${() => handleChange(item.key, '')}
                              class="px-3 py-1 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(225,29,72,0.3)] hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-all hover:-translate-y-0.5"
                            >Очистить</button>
                          </div>
                        `}
                        ${settings[item.key] && item.key !== 'domain' && item.key !== 'tls_cert' && html`
                          <button type="button"
                            onClick=${() => handleChange(item.key, '')}
                            class="absolute right-0 top-0 mt-[3px] mr-[3px] px-3 py-1 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(225,29,72,0.3)] hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-all hover:-translate-y-0.5"
                          >Очистить</button>
                        `}
                      </div>
                      ${errors[item.key] && html`<div class="text-red-500 text-sm mt-1 font-semibold w-full text-left">${errors[item.key]}</div>`}
                    </td>
                  </tr>
                `)}
                  </tbody>
                </table>
              </div>
            ` : html`
              <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
                <table class="w-full table-fixed text-left border-collapse">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide" colspan="2">
                        <div class="flex items-center gap-3">
                          <span>HTTPS</span>
                          <${MyPolzunok} value=${settings.usehttps} onChange=${(v) => handleChange('usehttps', v)} />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            `}
          </div>

          <!-- ============================================================
               Coordinates & Astronomy
          ============================================================ -->
          <div class="w-full mb-6">
            <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
              <table class="w-full table-fixed text-left border-collapse">
                <thead>
                  <tr class="bg-teal-600/10 border-b border-teal-600/20">
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-1/3">Coordinates & Astronomy</th>
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                  </tr>
                </thead>
                <tbody>

              <${FieldRow} label="Longitude" tip=${gt("Longitude")} index=${0}>
                <${pageSetting} value=${settings.lon_de} setfn=${(v) => handleChange('lon_de', v)} type="text"
                  class=${`w-full px-3 py-2 bg-white/50 border ${errors.lon_de ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  error=${errors.lon_de} />
              <//>

              <${FieldRow} label="Latitude" tip=${gt("Latitude")} index=${1}>
                <${pageSetting} value=${settings.lat_de} setfn=${(v) => handleChange('lat_de', v)} type="text"
                  class=${`w-full px-3 py-2 bg-white/50 border ${errors.lat_de ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  error=${errors.lat_de} />
              <//>

              <!-- Sunrise — нестандартная строка, data-tip вручную -->
              <tr class="transition-colors border-b border-slate-200 bg-white/80 hover:bg-slate-200/80">
                <td
                  class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help"
                  data-tip=${gt('Sunrise')}
                >
                  Sunrise: <span class="text-teal-600 drop-shadow-sm">${settings.sunrise}</span>
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <div class="flex items-center gap-4">
                    <${MyPolzunok} value=${settings.onsunrise} onChange=${(v) => handleChange('onsunrise', v)} />
                    <input type="text" value=${settings.sunrise_pins || ''} onInput=${(e) => handleChange('sunrise_pins', e.target.value)}
                      maxlength="135" placeholder="0/6:1,12:0"
                      class=${`flex-grow w-full px-3 py-2 bg-white/50 border ${sunErr_sunrise_pins ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`} />
                  </div>
                  ${sunErr_sunrise_pins ? html`<p class="mt-1 rounded-xl border border-red-300 bg-red-50 px-4 py-2 font-bold text-red-700">${sunErr_sunrise_pins}</p>` : null}
                  <p class="mt-1 text-base text-slate-700">${sunHint}</p>
                </td>
              </tr>

              <!-- Sunset -->
              <tr class="transition-colors border-b border-slate-200 bg-sky-200/40 hover:bg-slate-200/80">
                <td
                  class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help"
                  data-tip=${gt('Sunset')}
                >
                  Sunset: <span class="text-teal-600 drop-shadow-sm">${settings.sunset}</span>
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <div class="flex items-center gap-4">
                    <${MyPolzunok} value=${settings.onsunset} onChange=${(v) => handleChange('onsunset', v)} />
                    <input type="text" value=${settings.sunset_pins || ''} onInput=${(e) => handleChange('sunset_pins', e.target.value)}
                      maxlength="135" placeholder="0/6:1,12:0"
                      class=${`flex-grow w-full px-3 py-2 bg-white/50 border ${sunErr_sunset_pins ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`} />
                  </div>
                  ${sunErr_sunset_pins ? html`<p class="mt-1 rounded-xl border border-red-300 bg-red-50 px-4 py-2 font-bold text-red-700">${sunErr_sunset_pins}</p>` : null}
                  <p class="mt-1 text-base text-slate-700">${sunHint}</p>
                </td>
              </tr>

              <!-- Библиотека условий (условия для связей Encoder/Switch и PID) -->
              <tr class="transition-colors border-b border-slate-200 bg-white/80 hover:bg-slate-200/80">
                <td
                  class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 align-top cursor-help"
                  data-tip=${isRuSun ? 'Общие условия. В Encoder/Switch/PID условие вводится свободно в поле Condition; эти 12 ячеек нужны для коротких ссылок C1..C12 и для действий кнопок/таймеров, где условие пишется инлайн после "?". Те же ячейки можно смотреть и править на страницах Switch, Encoder, PID' : 'Shared conditions. Encoder/Switch/PID take a free-form condition in the Condition field; these 12 cells are for short C1..C12 references and for button/timer actions, where the condition is written inline after "?". The same cells can be viewed and edited on the Switch, Encoder and PID pages'}
                >
                  Conditions
                  <div class="text-base font-normal text-slate-700 mt-2">${isRuSun
                      ? '1..12 - общие ячейки C1..C12 (то же, что панель Conditions на страницах Switch, Encoder, PID): на них можно ссылаться из условий и действий. Своё условие можно вписать прямо в Encoder/Switch/PID - пул: ' + (settings.cond_pool ? `${settings.cond_pool.used}/${settings.cond_pool.total}` : '48')
                      : '1..12 - shared cells C1..C12 (the same as the Conditions panel on the Switch, Encoder, PID pages): they can be referenced from conditions and actions. You can also type a condition right in Encoder/Switch/PID - pool: ' + (settings.cond_pool ? `${settings.cond_pool.used}/${settings.cond_pool.total}` : '48')}</div>
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    ${Array.from({ length: 12 }, (_, i) => html`
                      <div class="flex items-center gap-2">
                        <span class="text-sm font-bold text-indigo-800 w-10">C${i + 1}</span>
                        <input type="text" value=${condsArr[i] || ''}
                          onInput=${(e) => handleCondChange(i, e.target.value)}
                          maxlength="46"
                          placeholder=${i === 0 ? 'D1&!D2 | Ss' : ''}
                          class="flex-grow w-full px-3 py-2 bg-white/50 border border-white/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono text-sm" />
                        ${(() => {
                          const used = Array.isArray(settings.conds_used) ? (settings.conds_used[i] || 0) : 0;
                          const cleared = (condsArr[i] || '') === '0';
                          return html`
                            ${used > 0 ? html`<span class="text-sm font-semibold text-amber-700 bg-amber-100 rounded px-1.5 py-0.5 whitespace-nowrap" title=${isRuSun ? 'Мест использования: связи Encoder/Switch, слоты PID и инлайн-ссылки ?C в действиях. Правка условия меняет их поведение сразу' : 'Usage sites: Encoder/Switch links, PID slots and inline ?C references. Editing this condition affects all of them at once'}>${used}</span>` : null}
                            ${cleared ? html`<span class="text-sm font-semibold text-red-700 bg-red-100 rounded px-1.5 py-0.5 whitespace-nowrap" title=${isRuSun ? 'Условие сброшено в "0" (обычно после удаления устройства). Все ссылки на него теперь блокируют действия' : 'Condition reset to "0" (usually after deleting a device). All references to it now block actions'}>${isRuSun ? 'сброшено' : 'reset'}</span>` : null}
                          `;
                        })()}
                      </div>
                    `)}
                  </div>
                  <div class="mt-3 text-base text-slate-700 space-y-1">
                    ${(isRuSun ? [
                      'Одна ячейка - одно условие, до 46 символов. Писать без запятых и пробелов.',
                      'Нужно два условия сразу? Запишите каждое в свою ячейку (например C3 и C4), а в поле Condition на страницах Switch, Encoder, PID напишите C3|C4 (верно хотя бы одно) или C3&C4 (верны оба).',
                      'Вставить ячейку в поле Condition: кнопкой C1..C12 под полем (она добавляет через |) или вручную, например C3.',
                      'Ячейка может ссылаться на другую ячейку, но не глубже двух уровней.',
                    ] : [
                      'One cell is one condition, up to 46 characters. Write it without commas or spaces.',
                      'Need two conditions at once? Put each in its own cell (for example C3 and C4), then write C3|C4 (at least one is true) or C3&C4 (both are true) in the Condition field on the Switch, Encoder, PID pages.',
                      'To insert a cell into the Condition field, press a C1..C12 button under the field (it adds the cell with |) or type it by hand, for example C3.',
                      'A cell can refer to another cell, but no deeper than two levels.',
                    ]).map((s) => html`<div>${s}</div>`)}
                  </div>
                  <p class="mt-2 text-base text-slate-700">
                    ${isRuSun
                      ? 'Синтаксис: D1 - устройство с ID 1 включено (выход на пине DEVICE, PWM с яркостью больше 0 или Zigbee-устройство; прежняя запись R1 тоже работает), !D2 - выключено, DV1>0 / DV1=100 / DV1g100 / DV1l100 - диммер (для Zigbee - состояние/яркость устройства), B1 - кнопка нажата, BU1 - не нажата, BH1 - удерживается, T5>25.5 - температура (°C), H4>50 - влажность (%), Sr - день, Ss - ночь. Операторы: ! & | ( ) = > < g l. В действиях можно ссылаться сюда: C3 = это условие №3. Мёртвый датчик даёт «неизвестно» - действие блокируется, в т.ч. под отрицанием, но явная истина через | перекрывает: T5<25|D1 сработает при мёртвом T5, если D1 вкл. ВАЖНО: прямое управление (ползунок On/Off, MQTT/API set) условие НЕ проверяет'
                      : 'Syntax: D1 - device with ID 1 is on (an output on a DEVICE pin, PWM with brightness above 0, or a Zigbee device; the old notation R1 also works), !D2 - off, DV1>0 / DV1=100 / DV1g100 / DV1l100 - dimmer (for Zigbee - device state/level), B1 - button pressed, BU1 - not pressed, BH1 - held, T5>25.5 - temperature, H4>50 - humidity, Sr - daytime, Ss - night. Operators: ! & | ( ) = > < g l. Actions can reference here: C3 = this condition #3. Dead sensor yields "unknown" - blocked even under negation, but explicit truth via | overrides: T5<25|D1 fires with dead T5 if D1 is on. NOTE: direct control (On/Off toggle, MQTT/API set) does NOT check conditions'}
                  </p>
                </td>
              </tr>

              <${FieldRow} label="Day Length" tip=${gt("Day Length")} index=${4}>
                <span class="text-xl font-medium text-slate-800">${settings.dlength}</span>
              <//>

              <${FieldRow} label="Next full moon" tip=${gt("Next full moon")} index=${5}>
                <span class="text-xl font-medium text-slate-800">
                  ${typeof settings.fullmoon === 'string' && settings.fullmoon
                    ? `${settings.fullmoon.split(' ')[0]} at ${settings.fullmoon.split(' ')[1]}`
                    : 'N/A'}
                </span>
              <//>
              </tbody>
            </table>
            </div>

            <!-- Справка по условиям Sunrise/Sunset (RU/EN): заголовок и кнопка Show Help / Hide Help -->
            <div class="flex items-center justify-between mt-6">
              <h2 class="text-xl font-bold text-black">${SUN_HELP[isRuSun ? 'ru' : 'en'].panelTitle}</h2>
              <button
                type="button"
                onClick=${(e) => { lockToggle(e); setCondHelpOpen(v => !v); }}
                class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
              >
                ${condHelpOpen ? 'Hide Help' : 'Show Help'}
              </button>
            </div>
            ${condHelpOpen && html`
              <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700" style="max-height:70vh;max-height:70dvh;overflow-y:auto;">
                <${SunCondHelp} isRu=${isRuSun} />
              </div>
            `}
          </div>

          <!-- ============================================================
               Offline Mode — Date & Time
          ============================================================ -->
          <div class="w-full mb-6">
            <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
              <table class="w-full table-fixed text-left border-collapse">
                <thead>
                  <tr class="bg-teal-600/10 border-b border-teal-600/20">
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-1/3">[OFFLINE MODE] Date & Time</th>
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                  </tr>
                </thead>
                <tbody>
              <!-- Date -->
              <tr class="transition-colors border-b border-slate-200 bg-white/80 hover:bg-slate-200/80">
                <td
                  class="w-1/3 font-bold text-slate-700 text-lg border-r border-slate-500 py-4 px-6 cursor-help"
                  data-tip=${gt('Date')}
                >
                  Date
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <input type="text" name="offdate" value=${settings.offdate || ''} onInput=${(e) => handleChange('offdate', e.target.value)}
                    placeholder="dd.mm.yy"
                    class=${`w-full px-3 py-2 bg-white/50 border ${errors.offdate ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`} />
                  ${errors.offdate && html`<div class="text-red-500 text-sm mt-1 font-semibold">${errors.offdate}</div>`}
                </td>
              </tr>

              <!-- Time -->
              <tr class="transition-colors border-b border-slate-200 bg-sky-200/40 hover:bg-slate-200/80">
                <td
                  class="w-1/3 font-bold text-slate-700 text-lg border-r border-slate-500 py-4 px-6 cursor-help"
                  data-tip=${gt('Time')}
                >
                  Time
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <input type="text" name="offtime" value=${settings.offtime || ''} onInput=${(e) => handleChange('offtime', e.target.value)}
                    placeholder="hh:mm:ss"
                    class=${`w-full px-3 py-2 bg-white/50 border ${errors.offtime ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/50'} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`} />
                  ${errors.offtime && html`<div class="text-red-500 text-sm mt-1 font-semibold">${errors.offtime}</div>`}
                </td>
              </tr>
              </tbody>
            </table>
            </div>
          </div>

          <!-- ============================================================
              Log Filter / Фильтр логов
          ============================================================ -->
          <div class="w-full mb-6">
            <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">

              <div
                class="bg-teal-600/10 border-b border-teal-600/20 px-6 py-4 flex items-center justify-between cursor-pointer select-none hover:bg-teal-600/20 transition-colors"
                onClick=${() => setLogFilterOpen(v => !v)}
              >
                <span class="text-2xl font-bold text-slate-700 tracking-wide flex items-center gap-2">
                  <span class="text-teal-600 text-lg">${logFilterOpen ? '▾' : '▸'}</span>
                  ${(settings.lang || 'ru') === 'ru' ? 'Фильтр логов' : 'Log Filter'}
                </span>
                <div class="flex items-center gap-3">
                  <span class="text-slate-600 font-medium tracking-wide text-lg">
                    ${(settings.lang || 'ru') === 'ru' ? 'Маска логов в RAM:' : 'RAM Log Mask:'}
                  </span>
                  <span class="px-2 py-0.5 bg-cyan-600/10 text-cyan-700 rounded-md font-mono font-bold text-lg">
                    ${settings.log_filter_mask !== undefined ? settings.log_filter_mask : 0x7FF} (0x${(settings.log_filter_mask !== undefined ? settings.log_filter_mask : 0x7FF).toString(16).toUpperCase()})
                  </span>
                </div>
              </div>

              ${logFilterOpen && html`
                <div class="flex flex-col sm:flex-row items-stretch">

                  <div class="w-full sm:w-1/4 sm:border-r border-b sm:border-b-0 border-slate-300 px-4 sm:px-6 py-4 sm:py-6 flex flex-col justify-center items-center gap-4"
                      data-tip=${(settings.lang || 'ru') === 'ru'
                        ? 'Выберите категории логов, которые выводятся в UART и отсылаются. Изменения применяются немедленно в RAM!'
                        : 'Select which log categories are enabled. Changes apply immediately in RAM!'}>
                    <span class="text-base font-bold text-slate-700 text-center">
                      ${(settings.lang || 'ru') === 'ru' ? 'Активные категории' : 'Active Categories'}
                    </span>
                    <button type="button" onClick=${() => handleLogMaskChange(0x7FF)}
                      class="w-full py-3 text-sm font-bold text-teal-600 bg-teal-50 border border-teal-200 rounded-xl hover:bg-teal-100 hover:text-teal-700 transition-all text-center shadow-sm">
                      ${(settings.lang || 'ru') === 'ru' ? 'Включить все' : 'Enable All'}
                    </button>
                    <button type="button" onClick=${() => handleLogMaskChange(0x00)}
                      class="w-full py-3 text-sm font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 hover:text-rose-700 transition-all text-center shadow-sm">
                      ${(settings.lang || 'ru') === 'ru' ? 'Выключить все' : 'Disable All'}
                    </button>
                  </div>

                  <div class="w-full sm:w-3/4 px-4 sm:px-6 py-4 sm:py-6">
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      ${LOG_CATEGORIES.map(cat => {
                        const maskVal = settings.log_filter_mask !== undefined ? settings.log_filter_mask : 0x7FF;
                        const isEnabled = (maskVal & (1 << cat.id)) !== 0;
                        return html`
                          <label class=${`flex items-center gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all duration-300 ${isEnabled ? 'bg-cyan-50/70 border-cyan-300 shadow-[0_2px_10px_rgba(34,211,238,0.15)] scale-[1.02]' : 'bg-slate-50/40 border-slate-200 hover:bg-slate-100/50'}`}>
                            <input
                              type="checkbox"
                              checked=${isEnabled}
                              onChange=${(e) => {
                                const newMask = e.target.checked
                                  ? (maskVal | (1 << cat.id))
                                  : (maskVal & ~(1 << cat.id));
                                handleLogMaskChange(newMask);
                              }}
                              class="w-5 h-5 text-cyan-600 border-slate-300 rounded focus:ring-cyan-500 focus:ring-2"
                            />
                            <div class="flex flex-col">
                              <span class="font-bold text-slate-800 text-base leading-tight">${cat.key}</span>
                              <span class="text-sm text-slate-600 font-medium">${(settings.lang || 'ru') === 'ru' ? cat.labelRu : cat.labelEn}</span>
                            </div>
                          </label>
                        `;
                      })}
                    </div>
                  </div>

                </div>
              `}
            </div>
          </div>

          ${topNotification && html`
            <div class="w-full bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white font-bold px-4 py-3 rounded-xl shadow-md text-center border border-green-400/50 backdrop-blur-md">
              ${topNotification}
            </div>
          `}

          <div class="flex justify-end w-full mb-4">${saveBtn()}</div>

        </form>
      </div>
    </div>
    ${toast && html`<${Toast} message=${toast.message} type=${toast.type} />`}
  `;
}

export { Settings };
