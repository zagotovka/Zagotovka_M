<div align="center">

# Заготовка-M ветка main

</div>

**Русская версия README** | **[English README](README.md)**

SPDX-License-Identifier: GPL-2.0-only or commercial

## Внимание:
Данное программное обеспечение является экспериментальным и находится в стадии разработки. Ни при каких обстоятельствах эти файлы не должны использоваться в отношении любой критически важной системы (систем). Использование этих файлов осуществляется на ваш страх и риск. ПРОГРАММНОЕ ОБЕСПЕЧЕНИЕ ПРЕДОСТАВЛЯЕТСЯ «КАК ЕСТЬ», БЕЗ КАКИХ-ЛИБО ГАРАНТИЙ, ЯВНЫХ ИЛИ ПОДРАЗУМЕВАЕМЫХ, ВКЛЮЧАЯ, НО НЕ ОГРАНИЧИВАЯСЬ, ГАРАНТИЯМИ ТОВАРНОГО СОСТОЯНИЯ, ПРИГОДНОСТИ ДЛЯ КОНКРЕТНОЙ ЦЕЛИ И НЕНАРУШЕНИЯ ПРАВ. НИ ПРИ КАКИХ ОБСТОЯТЕЛЬСТВАХ АВТОРЫ ИЛИ ПРАВООБЛАДАТЕЛИ НЕ НЕСУТ ОТВЕТСТВЕННОСТИ ЗА ЛЮБЫЕ ПРЕТЕНЗИИ, УБЫТКИ ИЛИ ДРУГИЕ ОБЯЗАТЕЛЬСТВА, БУДЬ ТО ДОГОВОРНЫЕ, ГРАЖДАНСКО-ПРАВОВЫЕ ИЛИ ИНЫЕ, ВОЗНИКАЮЩИЕ ИЗ, ИЗ ИЛИ В СВЯЗИ С ПРОГРАММНЫМ ОБЕСПЕЧЕНИЕМ, ИСПОЛЬЗОВАНИЕМ ИЛИ ИНЫМИ ДЕЙСТВИЯМИ С ПРОГРАММНЫМ ОБЕСПЕЧЕНИЕМ

## Notice:
This software is experimental and a work in progress. Under no circumstances should these files be used in relation to any critical system(s). Use of these files is at your own risk. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Информация для разработчиков фронтенда
Все необходимое находится в папке "web_root". [перейти в web_root](https://github.com/zagotovka/Zagotovka_M/tree/main/web_root)
Для установки и запуска веб-интерфейса с Vite (Debian):
```bash
sudo apt update
sudo apt install nodejs npm
npm init -y
rm -rf node_modules
npm install
npm install preact-router
npm install history
npm run start
```

## Информация для разработчиков бэкенда
- STM32CubeIDE Version: 1.15.1
- FREERTOS Version: V10.2.1 CMSIS_V2
- Mongoose Version: 7.21

### Информация для электриков: <a href="https://youtu.be/dl3f8Jo28ps"><img src="/icons/icons8-youtube-48.png" alt="YouTube" width="24" height="24" style="vertical-align: middle"></a>&nbsp;&nbsp;<a href="https://rutube.ru/video/a7eb1218174d5f78254775de943bdcde/"><img src="/icons/Rutube.png" alt="Rutube" width="50" height="26" style="vertical-align: middle"></a>
Для данного проекта схема, которая использует распределительные коробки, не подходит!

<p float="left">
  <a href="/icons/provoda_OLD.png" target="_blank">
    <img src="/icons/provoda_OLD.png" alt="provoda_OLD" width="200" />
  </a>
  <a href="/icons/OLD_sxema.png" target="_blank">
    <img src="/icons/OLD_sxema.png" alt="OLD_sxema" width="200" />
  </a>
</p>

### Необходимо реализовать прямую проводку:
От каждой точки (розетки, выключателя, потолочной лампы и т.п.) до электрощитка!

<p float="left">
<a href="/icons/provoda_NEW.png" target="_blank">
  <img src="/icons/provoda_NEW.png" alt="Image" width="200" />
</a>
<a href="/icons/New_sxema.png" target="_blank">
    <img src="/icons/New_sxema.png" alt="New_sxema" width="200" />
  </a>
</p>

## Что купить:
1. [<img src="icons/1.png" width="100">](https://aliexpress.ru/wholesale?SearchText=NUCLEO-F767ZI&g=y&page=1) NUCLEO-F767ZI
2. [<img src="icons/2.png" width="100">](https://aliexpress.ru/wholesale?SearchText=GSM+Module+SIM800L&g=y&page=1) GSM Module SIM800L
3. [<img src="icons/3.png" width="100">](https://aliexpress.ru/wholesale?SearchText=Jumper+cap+2.54&g=y&page=1) Jumper cap 2.54
4. [<img src="icons/4.png" width="100">](https://aliexpress.ru/wholesale?SearchText=10pcs+2.54MM+pitch+MALE+SOCKET+straight+idc+box+headers+&g=y&page=1) 20P и 5P 2,54мм
5. [<img src="icons/5.png" width="100">](https://aliexpress.ru/wholesale?SearchText=10+%D1%88%D1%82.+2%252C54+%D0%BC%D0%BC+80+Pin+%D1%88%D0%B0%D0%B3+%D1%88%D1%82%D1%8B%D1%80%D0%B5%D0%B2%D0%BE%D0%B9+%D0%B4%D0%B2%D1%83%D1%85%D1%80%D1%8F%D0%B4%D0%BD%D1%8B%D0%B9&g=y&page=1) 2 шт. 2,54 мм 80 Pin штыревой двухрядный
6. [<img src="icons/6.png" width="100">](https://aliexpress.ru/wholesale?SearchText=%D0%9A%D0%BB%D0%B5%D0%BC%D0%BC%D0%BD%D0%B0%D1%8F+%D0%BA%D0%BE%D0%BB%D0%BE%D0%B4%D0%BA%D0%B0+KF301-+2+P&g=y&page=1) Клеммная колодка KF301- 2P
7. [<img src="icons/7.png" width="100">](https://aliexpress.ru/item/1005008062387765.html) Двухрядный разъем FC-6P и FC-20P 2,54 мм
8. [<img src="icons/8.png" width="100">](https://aliexpress.ru/wholesale?SearchText=%D0%9F%D0%BB%D0%BE%D1%81%D0%BA%D0%B8%D0%B9+%D0%BB%D0%B5%D0%BD%D1%82%D0%BE%D1%87%D0%BD%D1%8B%D0%B9+%D0%BA%D0%B0%D0%B1%D0%B5%D0%BB%D1%8C+%D0%B4%D0%BB%D1%8F+IDC+2%252C0+%D0%BC%D0%BC+FC+&g=y&page=1) Плоский ленточный кабель для разъема IDC FC 2,54 мм 40P и 12P
9. [<img src="icons/9.png" width="100">](https://aliexpress.ru/wholesale?SearchText=resistor&g=y&page=1) Резисторы 2.2K 90шт. и 10К 90шт.
10. [<img src="icons/10.png" width="100">](https://aliexpress.ru/wholesale?SearchText=%D0%9A%D0%B0%D0%B1%D0%B5%D0%BB%D1%8C-%D0%BF%D0%B5%D1%80%D0%B5%D1%85%D0%BE%D0%B4%D0%BD%D0%B8%D0%BA+%D1%81+Micro+USB+%D0%BD%D0%B0+OTG&g=y&page=1) Кабель-переходник с Micro USB 5Pin папа на USB
11. [<img src="icons/11.png" width="100">](https://aliexpress.ru/wholesale?SearchText=DC-DC+Buck+Converter+4.5V-16V+9V+12V+to+5V+3.3V+Step-down+Power+Voltage+Regulator+Module+Efficiency+98%25&g=y&page=1) DC DC преобразователь
12. [<img src="icons/19.png" width="100"><img src="icons/20.png" width="100">](https://aliexpress.ru/wholesale?SearchText=%D0%A2%D0%B2%D0%B5%D1%80%D0%B4%D0%BE%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9+%D1%80%D0%B5%D0%BB%D0%B5%D0%B9%D0%BD%D1%8B%D0%B9+%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8C&g=y&page=1) Твердотельный релейный модуль
13. [<img src="icons/21.png" width="100">](https://aliexpress.ru/wholesale?SearchText=2.54mm+Double+Row+Straight+Female+2-40P&g=y&page=1) Двухрядный прямой гнездовой разъем
### Gerber файлы: <a href="https://youtu.be/3tv2-pYXrjg"><img src="/icons/icons8-youtube-48.png" alt="YouTube" width="24" height="24" style="vertical-align: middle"></a>&nbsp;&nbsp;<a href="https://rutube.ru/video/private/9b2cea71a3b7a72765657751a905738c/?p=SsnMQCw9kL5LmihFU1ot_Q"><img src="/icons/Rutube.png" alt="Rutube" width="50" height="26" style="vertical-align: middle"></a>
a. <a href="https://easyeda.com/editor#id=|e6a461cf7da546748c711f5ae1138cd7|2ffd4d2211de4b4ba91e1188545134c2" target="_blank">Zagotovka</a>
b. <a href="https://easyeda.com/editor#id=|23ee55cfd3e24ca19753cbba7066c13f|d1e252ee42ab4fbfb84c61a65fa2982f" target="_blank">Zagotovka-CN11</a>
c. <a href="https://easyeda.com/editor#id=|7e31c289e9f742a2acfa7db54bbde58a|30d6a426a32f425b8c8ff5ba5bdb792b" target="_blank">Zagotovka-CN12</a>
d. <a href="https://easyeda.com/editor#id=|125ff34d97324d308c97b01793449de7|1bc69b35cc6d419080bf3461774739e3" target="_blank">Zagotovka-10</a>
## Где заказать печатные платы:
- [Обсуждение на форуме](https://community.alexgyver.ru/threads/resheno-u-kogo-zakazyvat-pechatnye-platy-vo-vremja-dejstvija-sankcij.6818/page-9)

## Необязательные покупки:
15. [<img src="icons/12.png" width="100">](https://aliexpress.ru/wholesale?SearchText=%D0%AD%D0%BD%D0%BA%D0%BE%D0%B4%D0%B5%D1%80&g=y&page=1) Энкодер
16. [<img src="icons/13.png" width="100">](https://aliexpress.ru/wholesale?SearchText=%D0%9F%D1%80%D0%BE%D0%B2%D0%BE%D0%B4%D0%BD%D0%BE%D0%B9+%D0%BC%D0%B0%D0%B3%D0%BD%D0%B8%D1%82%D0%BD%D1%8B%D0%B9+%D0%B4%D0%B2%D0%B5%D1%80%D0%BD%D0%BE%D0%B9%2C+%D0%BE%D0%BA%D0%BE%D0%BD%D0%BD%D1%8B%D0%B9+%D0%BA%D0%BE%D0%BD%D1%82%D0%B0%D0%BA%D1%82%D0%BD%D1%8B%D0%B9+%D0%B3%D0%B5%D1%80%D0%BA%D0%BE%D0%BD&g=y&page=1) Геркон
17. [<img src="icons/14.png" width="100">](https://aliexpress.ru/wholesale?SearchText=ds18b20&g=y&page=1) DS18B20
18. [<img src="icons/15.png" width="100">](https://aliexpress.ru/wholesale?SearchText=dht22&g=y&page=1) DHT22
19. [<img src="icons/16.png" width="100">](https://aliexpress.ru/wholesale?SearchText=TTP223&g=y&page=1) TTP223
20. [<img src="icons/18.png" width="100">](https://aliexpress.ru/wholesale?SearchText=%D0%9A%D0%B0%D0%B1%D0%B5%D0%BB%D1%8C+Dupont+Line+%D0%B4%D0%BB%D1%8F+Arduino&g=y&page=1) Arduino провода

### Сборка и подключение. <a href="https://youtu.be/0MEFwOGv__A"><img src="/icons/icons8-youtube-48.png" alt="YouTube" width="24" height="24" style="vertical-align: middle"></a>&nbsp;&nbsp;<a href="https://rutube.ru/video/b01398d510e53b7798d8fa7cf06d6fbc/"><img src="/icons/Rutube.png" alt="Rutube" width="50" height="26" style="vertical-align: middle"></a>

## [Скачать прошивку](https://github.com/zagotovka/Zagotovka_M/releases/latest) и как прошить stm32? <a href="https://youtu.be/C4c-W71eqqY"><img src="/icons/icons8-youtube-48.png" alt="YouTube" width="24" height="24" style="vertical-align: middle"></a>&nbsp;&nbsp;<a href="https://rutube.ru/video/55e08612c6f4ec527f6d10fa24ae89fb/"><img src="/icons/Rutube.png" alt="Rutube" width="50" height="26" style="vertical-align: middle"></a>

Проект теперь использует двухбанковую (Bank A / Bank B) организацию флеш-памяти. Для первой прошивки скачайте и прошейте образ Bank A; Bank B используется для последующих OTA-обновлений. Актуальные образы обоих банков также доступны в папке [Proshivka](https://github.com/zagotovka/Zagotovka_M/tree/main/Proshivka).

### Первая прошивка новой платы (Windows, macOS, Linux)

У совершенно нового микроконтроллера STM32 память устроена «Single Bank». Zagotovka_M нужна память «Dual Bank» (это называется **Dual Bank**, опция `nDBANK = 0`). Прошивка не может переключить это сама: когда режим памяти меняется, всё, что лежит в микроконтроллере, портится, включая загрузчик. Поэтому режим меняют снаружи, **до** записи прошивки.

Делать это вручную не нужно. Скрипт [`scripts/make_first_flash.py`](https://github.com/zagotovka/Zagotovka_M/blob/main/scripts/make_first_flash.py) делает всё за один запуск:

1. Собирает один файл `Zagotovka_FIRST_FLASH_<версия>.bin` (загрузчик + прошивка Bank A) в папке `Proshivka/First_flash`. Самый новый `Zagotovka_Bank_A_v*.bin` из папки `Proshivka` он находит сам, так что вводить версию не нужно.
2. Спрашивает у микроконтроллера, какой у него режим памяти.
3. Если режим старый («одиночный»), переключает его на Dual Bank и ждёт, пока микроконтроллер перезапустится (до 40 секунд, обычно гораздо меньше).
4. Стирает весь микроконтроллер, записывает файл и проверяет, что данные записаны верно.
5. Печатает `DONE`.

Если что-то не так (нет файла, не подключена плата), скрипт останавливается и пишет причину, не успев ничего изменить в микроконтроллере.

**Как запустить:**

1. Установите STM32CubeProgrammer (см. ниже).
2. Подключите плату к компьютеру USB-кабелем (разъём ST-LINK).
3. Откройте папку `scripts`, откройте в ней терминал (командную строку) и выполните:
   - Windows: `python make_first_flash.py`
   - macOS и Linux: `python3 make_first_flash.py`

На компьютере должен быть установлен Python 3 (он бесплатный: <https://www.python.org/downloads/>), больше для него ничего не нужно. После `DONE` плата сама перезапустится и запустит прошивку. Если нужно только собрать файл и не трогать микроконтроллер, добавьте к команде `--image-only`.

> Не перетаскивайте файл `FIRST_FLASH` просто на USB-диск `NODE_F767ZI` совершенно новой платы. Перетаскивание не меняет режим памяти, поэтому загрузчик выведет ошибку и не запустит прошивку. Используйте скрипт выше.

### STM32CubeProgrammer должен быть установлен

Скрипт одинаково работает в **Linux, Windows и macOS**, но только если на компьютере установлена программа **STM32CubeProgrammer**. Она бесплатная, но устанавливать её нужно самостоятельно: скрипт её не содержит и не скачивает.

Зачем она нужна:

- При установке она ставит в вашу систему драйверы для ST-LINK платы. Без них компьютер не увидит плату.
- Скрипт общается с микроконтроллером через её консольную программу `STM32_Programmer_CLI`.
- На всякий случай с её помощью можно вручную проверить микроконтроллер (см. ниже).

**Где взять.** Скачайте программу на официальном сайте: <https://www.st.com/en/development-tools/stm32cubeprog.html>. Выберите установщик для вашей операционной системы и запустите его. Скрипт проверялся с версией 2.23.0.

**Как проверить микроконтроллер вручную.** Запустите STM32CubeProgrammer, в списке справа вверху выберите `ST-LINK` и нажмите **Connect**. Откройте вкладку **OB** (option bytes) и раздел **User Configuration**: галочка `nDBANK` должна быть **снята** (это Dual Bank). Если галочка стоит, микроконтроллер ещё в старом режиме: запустите скрипт снова.

**Ещё две вещи, которые от скрипта не зависят:**

- **Windows.** Нужен драйвер ST-LINK (он ставится вместе с STM32CubeProgrammer или STM32CubeIDE). Вводите команду `python`, а не `python3`.
- **Linux.** Если программатор пишет, что не видит ST-LINK, а на другом компьютере всё работает, значит, у вашего пользователя нет прав на USB-устройство. Это лечится правилами `udev` из комплекта CubeProgrammer (папка `Drivers/rules` внутри папки установки): скопируйте файлы `*.rules` в `/etc/udev/rules.d/`, выполните `sudo udevadm control --reload-rules && sudo udevadm trigger` и подключите плату заново.

## Видеогид по интерфейсу.

### Как пользоваться страницей "Выключатели/Switch" <a href="https://youtu.be/C74IQA4-2aI"><img src="/icons/icons8-youtube-48.png" alt="YouTube" width="24" height="24" style="vertical-align: middle"></a>&nbsp;&nbsp;<a href="https://rutube.ru/video/2d1cbc007f3da4553a70387ba9ce4421/"><img src="/icons/Rutube.png" alt="Rutube" width="50" height="26" style="vertical-align: middle"></a>
### Как пользоваться страницей "Кнопки/Button" <a href="https://youtu.be/pMmqkwCnVaM"><img src="/icons/icons8-youtube-48.png" alt="YouTube" width="24" height="24" style="vertical-align: middle"></a>&nbsp;&nbsp;<a href="https://rutube.ru/video/b3336efe85e3811c379922c55f8c6e0f/"><img src="/icons/Rutube.png" alt="Rutube" width="50" height="26" style="vertical-align: middle"></a>
### Как пользоваться страницей "Энкодеры/Encoder" (в процессе разработки) <a href="https://youtu.be/mRENaW0x7i8"><img src="/icons/icons8-youtube-48.png" alt="YouTube" width="24" height="24" style="vertical-align: middle"></a>&nbsp;&nbsp;<a href="https://rutube.ru/video/2289862620f6aff184af8c90487910ff/"><img src="/icons/Rutube.png" alt="Rutube" width="50" height="26" style="vertical-align: middle"></a>
### Как пользоваться страницей "Таймеры/Timer" <a href="https://youtu.be/8pgqBO4cKdg"><img src="/icons/icons8-youtube-48.png" alt="YouTube" width="24" height="24" style="vertical-align: middle"></a>&nbsp;&nbsp;<a href="https://rutube.ru/video/1268e322b1618adb77710be2fff14bf2/"><img src="/icons/Rutube.png" alt="Rutube" width="50" height="26" style="vertical-align: middle"></a>
### Как пользоваться страницей "OneWire" <a href="https://youtu.be/FTfkruXgUT0"><img src="/icons/icons8-youtube-48.png" alt="YouTube" width="24" height="24" style="vertical-align: middle"></a>&nbsp;&nbsp;<a href="https://rutube.ru/video/11652a191dc348f2218f202b141a8c76/"><img src="/icons/Rutube.png" alt="Rutube" width="50" height="26" style="vertical-align: middle"></a>
### Как пользоваться страницей "Безопасность/Security" <a href="https://youtu.be/N9od6Ji41jU"><img src="/icons/icons8-youtube-48.png" alt="YouTube" width="24" height="24" style="vertical-align: middle"></a>&nbsp;&nbsp;<a href="https://rutube.ru/video/0043b0287f85fee9c82f10104955ec85/"><img src="/icons/Rutube.png" alt="Rutube" width="50" height="26" style="vertical-align: middle"></a>
### Как настроить "HTTPS" для удаленного управления из любой точки мира. <a href="https://youtu.be/w-ke9_BD0vk"><img src="/icons/icons8-youtube-48.png" alt="YouTube" width="24" height="24" style="vertical-align: middle"></a>&nbsp;&nbsp;<a href="https://rutube.ru/video/9899433b2f574b507cda7e50bfcd342b/"><img src="/icons/Rutube.png" alt="Rutube" width="50" height="26" style="vertical-align: middle"></a>
### [Скачать 'CertGeneration.sh'](https://github.com/zagotovka/Zagotovka_M/raw/main/scripts/CertGeneration.sh) для генерации сертификатов (нажмите правой кнопкой мыши и выберите "Сохранить ссылку как").
### ⚠️ Опасный баг, который может привести к летальному исходу! <a href="https://youtu.be/F0R1ltD-ztE"><img src="/icons/icons8-youtube-48.png" alt="YouTube" width="24" height="24" style="vertical-align: middle"></a>&nbsp;&nbsp;<a href="https://rutube.ru/video/1d4476ca90e75804371516bbc6726cdd/"><img src="/icons/Rutube.png" alt="Rutube" width="50" height="26" style="vertical-align: middle"></a> ⚠️
<details>

<summary>Система версионирования</summary>

<small>
Данный проект использует семантическое версионирование. Номер версии имеет формат MAJOR.MINOR.PATCH.

### Объяснение компонентов версии

#### MAJOR (первое число)
- Увеличивается при внесении несовместимых изменений
- Пример: переход с 1.x.x на 2.0.0 означает значительные изменения, которые могут нарушить существующую функциональность

#### MINOR (второе число)
- Увеличивается при добавлении новой функциональности с сохранением обратной совместимости
- Обнуляется при увеличении MAJOR версии
- Пример: переход с 1.1.x на 1.2.0 означает новые функции без нарушения работы существующих

#### PATCH (третье число)
- Увеличивается при исправлении ошибок, не затрагивающих основную функциональность
- Обнуляется при увеличении MAJOR или MINOR версии
- Пример: изменение с 1.1.1 на 1.1.2 означает исправление мелких ошибок
</small>

</details>

### История версий

| Версия | Дата       | Описание               |
|--------|------------|------------------------|
| 1.0.0  | 11-01-2025 | Первый стабильный релиз.|
| 1.0.1  | 3-02-2025 | Исправлены баги в «StartCronTask» и «ModalEditSensor».|
| 1.1.1  | 4-04-2025 | Реализована поддержка HTTPS (добавлен HTTPS-сервер)|
| 2.0.0  | 27.06.2026 | Обновлён веб-интерфейс и библиотека Mongoose (7.13 → 7.21); добавлены: SMS-управление, ограничение сессий с индикацией, PID-контроллер, ШИМ-таймер, установка желаемой частоты ШИМ энкодера (0,05 Гц — 2 МГц); оптимизирован и улучшен код |
| 2.0.1 | 30.06.2026 | Замена cJSON на встроенный JSON API Mongoose, оптимизация кучи и фикс MQTT.|
| 2.0.2 | 02-07-2026 | Реализована: остановка шторма TLS Alert в pollQueue при инвалидировании сессии. |
| 2.1.0 | 15-07-2026 | Добавлена интеграция Zigbee через MQTT-шлюз (SLZB-06p7U). |
| 2.1.1 | 17-07-2026 | Добавлен DTCM pool allocator; ~57 КБ буферов перенесены из .bss. |
| 2.2.0 | 18-07-2026 | Добавлена универсальная привязка Zigbee-диммера к PWM энкодера с автоопределением диапазона. |
| 2.2.1 | 19-07-2026 | 42 «горячие» функции размещены в ITCM RAM для детерминированного выполнения. |
| 2.2.2 | 20-07-2026 | Исправлено сохранение связей Zigbee-выключателя, калибровка диммера и режим обучения. |
| 2.3.0 | 22-07-2026 | Добавлено каскадное удаление связей при смене типа пина на NONE. |
| 2.4.0 | 24-07-2026 | Добавлена универсальная поддержка Zigbee-кнопок с авто-отпусканием и гибким сопоставлением payload. |
| 2.4.1 | 25-07-2026 | Исправлена фильтрация событий кнопок, обработка Zigbee PASSTHROUGH val:0, структурированное логирование. |
| 2.5.0 | 31-07-2026 | Реализовано OTA-обновление прошивки. |
| 2.5.1 | 01-08-2026 | Исправлен аппаратный баг блокировки Flash-памяти. |
| 2.6.0 | 17-08-2026 | Реализован режим Dual Bank (двухбанковая флеш-память). |
| 2.6.1 | 07-09-2026 | Защита ITCM через MPU; исправлена запись NULL в stdout, повреждавшая ITCM. |
| 2.6.2 | 11-09-2026 | Добавлена проверка соответствия .bin-файла прошивки неактивному банку. |
| 2.7.0 | 13-09-2026 | Реализован встроенный MQTT-сервер. |
| 2.8.0 | 14-09-2026 | На Dashboard добавлен живой хвост SYSTEM LOG; версия прошивки встроена в имя релизного .bin-файла. |
| 2.9.0 | 28-09-2026 | Лимит связей pin-to-pin увеличен со 100 до 1024; исправлено усечение Zigbee-ID (значения выше 255) и чтение за границами массива; API связей теперь отдаёт данные чанками; хранилище связей перенесено из DTCM-пула в .bss. |
| 2.9.1 | 29-09-2026 | Исправлено: поле INFO не очищалось; «Save changes» в Edit switch/Connection (а также у кнопок и энкодеров) больше не включает связанные выходы. |
| 2.9.2 | 30-09-2026 | Улучшена обработка таймингов кнопок: мгновенная обработка одиночного клика без поддержки двойного клика, настраиваемый интервал двойного клика через `dcinter` и более детерминированный опрос кнопок с периодом 5 мс. |
| 2.10.0 | 04-10-2026 | Добавлены условия для действий (например, `6:1?R2&!R3`) и библиотека из 12 общих условий; выбор Condition для связей Switch/Encoder и PID; длинные действия отклоняются, а не обрезаются; Bank A собран с -Os. |
| 2.10.1 | 07-10-2026 | Добавлена панель библиотеки условий (C1..C12) с редактированием на месте, счётчиком использования и предупреждающими бейджами для связей с пустыми ячейками на страницах Switch, Encoder и PID; добавлены буквы условий `D`/`DV` (состояние устройства и значение диммера), прежние `R`/`RV` продолжают работать; исправлен ввод заглавных букв в полях Sunrise/Sunset; все справки приведены к единому формату, применены новые иконки меню. |
| 2.11.0 | 08-10-2026 | Веб-интерфейс адаптирован для телефонов; на странице PWM/Encoder pin добавлены строки PWM без энкодера (рубильник On/Off, полярность Normal/Inverted, привязка Zigbee-диммера); PWM переключается по SMS и DTMF; страница Encoder pin переименована, на все страницы добавлены описания. |
| 2.12.0 | 13-10-2026 | В блок справки на каждой странице добавлена кнопка «Копировать справку» (копирует всю справку в формате Markdown, работает и по обычному http); на странице «Логи устройства» справка теперь сворачивается кнопкой «Показать справку» / «Скрыть справку» вместо постоянно раскрытой. |
| 2.12.1 | 13-10-2026 | Исправлено: после успешной OTA-записи устройство могло загружать старую прошивку из-за стирания неверных flash-секторов при замыкании 94-слотового кольца (теперь секторы 22–23 в Dual Bank, с проверкой стирания/записи). Убран спам `[DIAG]` в «Логах устройства». Загрузчик нужно один раз перепрошить программатором. |
| 2.12.2 | 15-10-2026 | Исправлено: PWM-пины с ID от 30 не показывались в окнах PWM-таймера и PID (добавлен облегчённый запрос /api/pwmpins/get, снижен пик кучи); переключатель On/Off теперь работает как главный выключатель для физических и Zigbee-кнопок; после OTA-обновления страница сама переходит на экран входа. Ошибка веб-сборки теперь останавливает сборку прошивки. |
| 2.12.3 | 19-10-2026 | Снижены пики памяти и повышена надёжность веб-интерфейса: ответы API разбиты на страницы, запросы идут по одному, опрос приостановлен при сохранении. Добавлены /api/pins/get и /api/sensors/get; устранены потери данных, усечение полей, ошибки JSON-экранирования и повтор журнала. POST возвращают корректные ошибки 400/507. Загрузка прошивки проверяет сессию и Content-Length до приёма тела; /api/device/eraselast отключён по умолчанию и только POST. |
| 2.13.0 | 21-10-2026 | Добавлена настройка «**Состояние при старте**» для каждого пина (как PowerOnState в Tasmota): для Device/PWM и Zigbee, с отложенным сохранением состояния на USB и адаптивной колонкой с подсказкой. По умолчанию прежнее поведение сохранено. «Duty on restore» переименовано в «Power on state». |
| 3.0.0 | 25-10-2026 | Изменена схема логических ID: физические пины теперь 1..89 (было 0..88), Zigbee 90..289 (было 89..288); сохранённые конфигурации автоматически мигрируют один раз (idver). ID в токен-API, MQTT, SMS-командах и cron-строках сдвинуты на +1. Все страницы веба проверены относительно прежней сборки. Добавлен анимированный логотип Zagotovka Mongoose под тему (нужен @property: Chrome 85+, Safari 16.4+, Firefox 128+; в старых браузерах статичный логотип). |
| 3.0.1 | 26-10-2026 | Повышена надёжность OTA и загрузчика: перед первой пробной загрузкой проверяется CRC32 OTA-образа, при ошибке — откат на предыдущий банк; обычный старт проверяет только MSP. Размер и CRC32 обоих банков хранятся в настройках. Банк, залитый напрямую через ST-Link, определяется автоматически: отображается «прошито напрямую», стирать настройки после каждой прошивки больше не нужно. Записи настроек защищены мьютексом; OTA-состояние сохраняется при стирании кольца настроек. Ограничение: повреждённый образ нельзя отличить от прямой прошивки по содержимому. Требуется однократно перепрошить загрузчик и стереть сектора настроек 22–23; TLS-ключ, сертификат и Telegram-токен нужно ввести заново. |
| 3.0.2 | 27-10-2026 | Написан скрипт `scripts/make_first_flash.py` настраивает микроконтроллер за одну операцию, без повторных запусков: читает `FLASH->OPTCR`, при необходимости переключает на Dual Bank (`nDBANK=0`), ждёт перезапуска, стирает Flash и прошивает `Zagotovka_FIRST_FLASH_vX.X.Xx.bin` (работает в Windows, macOS и Linux; нужен STM32CubeProgrammer, который нужно установить отдельно с официального сайта ST). Устройства, которые уже работают в Dual Bank, скрипт пропускает переключение на Dual Bank. Новые платы нужно перевести в Dual Bank до первой прошивки (скриптом или в CubeProgrammer): простое перетаскивание файла на диск `NODE_F767ZI` режим памяти не меняет! |
| 3.1.0 | 30-10-2026 | Добавлена страница «Пульт управления» (`/remote`): выключатели, PWM, кнопки, Zigbee, PID, охрана и датчики на одном экране; данные — новый постраничный `GET /api/state/remote` (ETag/304), команды — `POST /api/remote/cmd`; логика команд объединена с токен-API и возвращает реальные HTTP-ошибки (400/403/409/429/503). Усилены встроенный MQTT-сервер и Zigbee «состояние при старте»: зависшие слоты шлюза SLZB вытесняются при переподключении с того же IP, счётчики клиентов кэшируются для других задач, а сохранённое состояние Zigbee применяется сразу после подключения шлюза к встроенному брокеру. Справка в вебе: таблицы условий вынесены в общий `condHelp.js`, разделы «Примеры из жизни» сокращены до списков (около 180 КБ меньше в `web_root` до Zopfli), примеры диммера приведены к шкале 0–100; добавлены meta-теги для запуска с домашнего экрана телефона. |