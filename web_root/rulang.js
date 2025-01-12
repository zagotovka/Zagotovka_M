export const ruLangswitch = [
  '', // Пустая строка для индекса 0
  'ID - уникальный числовой идентификатор пина. Присваивается автоматически',
  'Pin - Уникальный номер цифрового или аналогового пина.',
  'Pullup type - тип подтяжки:',
  'Relay connection - Здесь указаны пины одного реле или несколько с которыми взаимодействует данная кнопка.',
  'INFO - Укажите название данной кнопки для быстрой навигации на пример "Кухня", "Детская" и т.д. Не более 30-ти символов!',
  'On/Off - "Вкл""Откл" данный пин/выключатель.',
  'Action - Возможные действия с данным пином.'
];

export const rulangbutton = [
  '', // Пустая строка для индекса 0
  'ID - уникальный числовой идентификатор пина. Присваивается автоматически',
  'Pin - Уникальный номер цифрового или аналогового пина.',
  'Pullup type - тип подтяжки:',
  "sclick - 'On' или 'OFF' т.е. нужно ли отслеживать одиночное нажатие кнопки или нет?",
  "dclick - 'On' или 'OFF' т.е. нужно ли отслеживать двойное нажатие кнопки или нет?",
  "lpress - 'On' или 'OFF' т.е. нужно ли отслеживать долгое нажатие кнопки или нет?",
  'Relay connection - Здесь указаны пины одного реле или несколько с которыми взаимодействует данная кнопка.',
  'INFO - Укажите название данной кнопки для быстрой навигации на пример "Кухня", "Детская" и т.д. Не более 30-ти символов!',
  'On/Off - "Вкл""Откл" данный пин/выключатель.',
  'Action - Возможные действия с данным пином.'
];
export const rulangmonitoring = [
  '', // Пустая строка для индекса 0
  'ID - уникальный числовой идентификатор пина. Присваивается автоматически',
  'Pin - Уникальный номер цифрового или аналогового пина.',
  'Pullup type - тип подтяжки:',
  "Monitoring - 'On' или 'OFF' т.е. нужно ли отслеживать одиночное нажатие кнопки или нет?",
  'Relay connection - Здесь указаны пины одного реле или несколько с которыми взаимодействует данная кнопка.',
  'INFO - Укажите название данной кнопки для быстрой навигации на пример "Кухня", "Детская" и т.д. Не более 30-ти символов!',
  'On/Off - "Вкл""Откл" данный пин/выключатель.',
  'Action - Возможные действия с данным пином.'
];
export const ruencoder = [
  '', // Пустая строка для индекса 0
  'ID - уникальный числовой идентификатор пина. Присваивается автоматически',
  'Pin - Уникальный номер цифрового или аналогового пина.',
  'Pullup type - тип подтяжки:',
  "sclick - 'On' или 'OFF' т.е. нужно ли отслеживать одиночное нажатие кнопки или нет?",
  "dclick - 'On' или 'OFF' т.е. нужно ли отслеживать двойное нажатие кнопки или нет?",
  "lpress - 'On' или 'OFF' т.е. нужно ли отслеживать долгое нажатие кнопки или нет?",
  'Relay connection - Здесь указаны пины одного реле или несколько с которыми взаимодействует данная кнопка.',
  'INFO - Укажите название данной кнопки для быстрой навигации на пример "Кухня", "Детская" и т.д. Не более 30-ти символов!',
  'On/Off - "Вкл""Откл" данный пин/выключатель.',
  'Action - Возможные действия с данным пином.'
];

export const rulangeditbutton = [
  '', // Пустая строка для индекса 0
  'ID - уникальный числовой идентификатор пина. Присваивается автоматически',
  'Pin - Уникальный номер цифрового или аналогового пина.',
  'Pullup type - тип подтяжки: ',
  'Bounce interval (ms) - интервал подавления дребезга контактов (мс). Обычно 40мс достаточно.',
  'Hold interval (ms) - время в мс, которое нужно удерживать кнопку, чтобы она перешла в состояние Hold (удержание).',
  'Repeat - 1 или 0 - включить или выключить автоповтор нажатия в режиме удержания.',
  'Repeat interval (ms) - интервал в мс, с которым повторять нажатия в режиме удержания (в поле Repeat должно быть значение 1). Обычно 150мс.',
  'Double-click interval (ms) - интервал в мс, в течение которого два последовательных нажатия кнопки сгенерируют событие DoubleClick. 0 - не отслеживать двойное нажатие. Обычно 800мс.',
  'Prevent Click - 1 или 0 - предотвращать(1) генерацию события Click при первом нажатии, если за ним последовал DoubleClick. Имеет смысл только если Double-click interval больше нуля.',
  'Relay connection - Здесь указаны пины одного реле или несколько с которыми взаимодействует данная кнопка.',
  'INFO - Укажите название данной кнопки для быстрой навигации на пример "Кухня", "Детская" и т.д. Не более 30-ти символов!',
  'On/Off - "Вкл"/"Откл" данное реле.'
];

export const rulangpwm = [
  '', // Пустая строка для индекса 0
  'ID - уникальный числовой идентификатор пина. Присваивается автоматически',
  'Pin - Уникальный номер цифрового или аналогового пина.',
  'PWM frequency (Hz) - частота ШИМ в герцах. Если 0 - то ШИМ не используется.',
  'On - состояние выхода - 1-вкл, 0-откл.',
  'Invert State - инверсия порта (Выкл - на выходе логическая 1, вкл - 0).',
  'Dimmer value - если используется ШИМ - его скважность (0-255).',
  'PowerOn Restore - какие параметры нужно сохранять при изменении и восстановить при включении контроллера None - ничего не сохранять, при включении состояние и значение равны установленным при конфигурировании. State - восстанавливать последнее установленное состояние параметра On. Value - восстанавливать последнее установленное значение диммера (ШИМ). State&Value - восстанавливать состояние и значение.',
  'INFO - Дайте название выбранному реле для быстрой навигации на пример "Кухня", "Детская" и т.д. Не более 30-ти символов!',
  'On/Off - "Вкл"/"Откл" данное реле.',
  'Action - Возможные действия с данным пином.'
];

export const rurelay = [
  '', // Пустая строка для индекса 0
  'ID - уникальный числовой идентификатор пина. Присваивается автоматически',
  'Pin - Уникальный номер цифрового или аналогового пина.',
  'ON - состояние выхода - 1-вкл, 0-откл.',
  'PowerOn Restore - какие параметры нужно сохранять при изменении и восстановить при включении контроллера None - ничего не сохранять, при включении состояние и значение равны установленным при конфигурировании. State - восстанавливать последнее установленное состояние параметра On. Value - восстанавливать последнее установленное значение диммера (ШИМ). State&Value - восстанавливать состояние и значение.',
  'INFO - Дайте название выбранному реле для быстрой навигации на пример "Кухня", "Детская" и т.д. Не более 30-ти символов!',
  'On/Off - "Вкл"/"Откл" данное реле.',
  'Action - Возможные действия с данным пином.'
];

export const rulangeditrelay = [
  '', // Пустая строка для индекса 0
  'ID - уникальный числовой идентификатор пина. Присваивается автоматически',
  'Pin - Уникальный номер цифрового или аналогового пина.',
  'PWM frequency (Hz) - частота ШИМ в герцах. Если 0 - то ШИМ не используется.',
  'ON - состояние выхода - 1-вкл, 0-откл.',
  'Invert State - инверсия порта (Выкл - на выходе логическая 1, вкл - 0).',
  'Dimmer value - если используется ШИМ - его скважность (0-255).',
  'PowerOn Restore - какие параметры нужно сохранять при изменении и восстановить при включении контроллера None - ничего не сохранять, при включении состояние и значение равны установленным при конфигурировании. State - восстанавливать последнее установленное состояние параметра On. Value - восстанавливать последнее установленное значение диммера (ШИМ). State&Value - восстанавливать состояние и значение.',
  'INFO - Дайте название выбранному реле для быстрой навигации на пример "Кухня", "Детская" и т.д. Не более 30-ти символов!',
  'On/Off - "Вкл"/"Откл" данное реле.'
];

export const rulangz = [
  '', // Пустая строка для индекса 0
  'ID - уникальный числовой идентификатор пина. Присваивается автоматически',
  'Pin - Уникальный номер цифрового или аналогового пина.',
  'INFO - Дайте название выбранному реле для быстрой навигации на пример "Кухня", "Детская" и т.д. Не более 30-ти символов!',
  'On/Off - "Вкл"/"Откл" данное реле.',
  'Action - Для себя, запишите напоминание для чего этот пин!.'
];

export const rulangtimers = [
  '', // Пустая строка для индекса 0
  'ID - уникальный числовой идентификатор cron. Присваивается автоматически.',
  'Сконфигурируйте cron.',
  'Какое действие должно выполниться в указанное в таймере времени.',
  'INFO - Дайте название выбранному таймеру для быстрой навигации на пример "Полив газона", "Свет во дворе" и т.д. Не более 30-ти символов!',
  'Action - Возможные действия с данным таймером.'
];

export const rulangsettings = [
  '', // Пустая строка для индекса 0
  'Login - Введите имя пользователя для авторизации.',
  'Password - Введите пароль для авторизации.',
  'Язык - Выберите язык интерфейса/подсказок.',
  'Часовой пояс UTC - Выберите свой часовой пояс.',
  'IP address - Введите статически IP адрес. После перезагрузки, STM32 будет доступна по введенному адресу!',
  'Subnet mask - Введите маску подсети.',
  'Default gateway - Введите шлюз по умолчанию.',
  'MAC address - Если у вас более одного устройства то, необходимо каждому устройству указать уникальный MAC адрес.',
  'Host - Введите статически IP адрес MQTT брокера.',
  'Port - Укажите порт MQTT брокера.',
  'Client - Укажите ID клиента.',
  'User - Укажите имя пользователя.',
  'Password - Введите пароль для авторизации.',
  'Topic - Укажите имя топика.',
  'Full Topic - Укажите полный топик.',
  'QOS - Укажите уровень качества обслуживания.',
  'Longitude - Округлите значение долготы до трёх знаков после запятой.',
  'Latitude - Округлите значение широты до трёх знаков после запятой.',
  'Sunrise - Значение времени восхода солнца установятся автоматически согласно Вашим координатам.',
  'Sunset - Значение времени захода солнца установятся автоматически согласно Вашим координатам.'
];

export const rucronhelp = [
  '', // Пустая строка для индекса 0
  'CRON выполняется каждую секунду.',
  'CRON выполняется в начале каждой минуты.',
  'CRON выполняется каждый вторник в течение всего дня.',
  'CRON выполняется каждую минуту между 13 и 15 часами среды, четверга и пятницы.',
  'CRON выполняется каждые 5 секунд, начиная с 0.',
  'CRON выполняется каждые 5 секунд каждые 5 минут, с 00:00 до 55:55.',
  'CRON выполняется каждую пятницу в полночь.',
  'CRON выполняется каждые 2 часа в начале часа.',
  'CRON выполняется каждую секунду каждые 2 часа (0, 2, 4, ..., 22).',
  'CRON выполняется в полночь каждую неделю с понедельника по пятницу.',
  'CRON выполняется каждые 6 часов в (мин:сек) 23:15 (00:23:15, 06:23:15, 12:23:15 и т.д.).',
  'CRON выполняется в начале каждого месяца в 00:00:00.',
  'CRON выполняется в начале каждого квартала в 00:00:00.',
  'CRON выполняется в 20:15:20 каждую субботу в августе.',
  'CRON выполняется в 20:15:20 каждую субботу, которая также является 8-м днем месяца (день недели и дата должны совпадать).',
  'CRON выполняется каждую секунду между 30 и 45.',
  'CRON выполняется каждые 3 секунды в каждой минуты, когда секунды находятся между 30 и 45.',
  'CRON выполняется в начале каждой минуты, когда минуты находятся между 23 и 59.',
  'CRON выполняется каждую секунду, когда секунды находятся в диапазоне от 50 до 59 и от 00 до 10 (режим переполнения).'
];

export const ruactionhelp = [
  '', // Пустая строка для индекса 0
  '18-й пин включится (ON) в указанное время (CRON), будет гореть в течении 5 сек. и после окончании паузы (p - PAUSE) отключится (OFF).',
  '12-й пин будет менять своё состояние (TOGGLE) каждые 5 сек.',
  '12-й пин будет менять своё состояние (TOGGLE) каждое выполнение CRON.'
];

export const rulange1Wire = [
  '', // Пустая строка для индекса 0
  'ID - уникальный числовой идентификатор cron. Присваивается автоматически.',
  'Pin - Уникальный номер цифрового или аналогового пина.',
  'PWM frequency (Hz) - PWM frequency in Hertz. If 0, then PWM is not used.',
  "ON - State of pin -1 is 'On', 0 is 'Off'.",
  'INFO - Дайте название выбранному таймеру для быстрой навигации на пример "Полив газона", "Свет во дворе" и т.д. Не более 30-ти символов!',
  'On/Off - "Вкл"/"Откл" данное реле.'
];
