<div align="center">

# Zagotovka-M main branch

</div>

**[Русская версия README](README_Ru.md)** | **English README**

SPDX-License-Identifier: GPL-2.0-only or commercial

## Warning:
This software is experimental and a work in progress. Under no circumstances should these files be used in relation to any critical system(s). Use of these files is at your own risk. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Внимание:
Данное программное обеспечение является экспериментальным и находится в стадии разработки. Ни при каких обстоятельствах эти файлы не должны использоваться в отношении любой критически важной системы (систем). Использование этих файлов осуществляется на ваш страх и риск. ПРОГРАММНОЕ ОБЕСПЕЧЕНИЕ ПРЕДОСТАВЛЯЕТСЯ «КАК ЕСТЬ», БЕЗ КАКИХ-ЛИБО ГАРАНТИЙ, ЯВНЫХ ИЛИ ПОДРАЗУМЕВАЕМЫХ, ВКЛЮЧАЯ, НО НЕ ОГРАНИЧИВАЯСЬ, ГАРАНТИЯМИ ТОВАРНОГО СОСТОЯНИЯ, ПРИГОДНОСТИ ДЛЯ КОНКРЕТНОЙ ЦЕЛИ И НЕНАРУШЕНИЯ ПРАВ. НИ ПРИ КАКИХ ОБСТОЯТЕЛЬСТВАХ АВТОРЫ ИЛИ ПРАВООБЛАДАТЕЛИ НЕ НЕСУТ ОТВЕТСТВЕННОСТИ ЗА ЛЮБЫЕ ПРЕТЕНЗИИ, УБЫТКИ ИЛИ ДРУГИЕ ОБЯЗАТЕЛЬСТВА, БУДЬ ТО ДОГОВОРНЫЕ, ГРАЖДАНСКО-ПРАВОВЫЕ ИЛИ ИНЫЕ, ВОЗНИКАЮЩИЕ ИЗ, ИЗ ИЛИ В СВЯЗИ С ПРОГРАММНЫМ ОБЕСПЕЧЕНИЕМ, ИСПОЛЬЗОВАНИЕМ ИЛИ ИНЫМИ ДЕЙСТВИЯМИ С ПРОГРАММНЫМ ОБЕСПЕЧЕНИЕМ

## Information for frontend developers
Everything you need is in the "web_root" folder. [go to web_root](https://github.com/zagotovka/Zagotovka_M/tree/main/web_root)
To install and run the web interface with Vite (Debian):
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

## Information for backend developers
- STM32CubeIDE Version: 1.15.1
- FREERTOS Version: V10.2.1 CMSIS_V2
- Mongoose Version: 7.21

### Information for electricians: <a href="https://youtu.be/dl3f8Jo28ps"><img src="/icons/icons8-youtube-48.png" alt="YouTube" width="24" height="24" style="vertical-align: middle"></a>&nbsp;&nbsp;<a href="https://rutube.ru/video/a7eb1218174d5f78254775de943bdcde/"><img src="/icons/Rutube.png" alt="Rutube" width="50" height="26" style="vertical-align: middle"></a>
The wiring scheme using junction boxes is NOT suitable for this project!

<p float="left">
  <a href="/icons/provoda_OLD.png" target="_blank">
    <img src="/icons/provoda_OLD.png" alt="provoda_OLD" width="200" />
  </a>
  <a href="/icons/OLD_sxema.png" target="_blank">
    <img src="/icons/OLD_sxema.png" alt="OLD_sxema" width="200" />
  </a>
</p>

### Direct wiring is required:
From each point (outlet, switch, ceiling lamp, etc.) directly to the electrical panel!

<p float="left">
<a href="/icons/provoda_NEW.png" target="_blank">
  <img src="/icons/provoda_NEW.png" alt="Image" width="200" />
</a>
<a href="/icons/New_sxema.png" target="_blank">
    <img src="/icons/New_sxema.png" alt="New_sxema" width="200" />
  </a>
</p>

## What to buy:
1. [<img src="icons/1.png" width="100">](https://aliexpress.ru/wholesale?SearchText=NUCLEO-F767ZI&g=y&page=1) NUCLEO-F767ZI
2. [<img src="icons/2.png" width="100">](https://aliexpress.ru/wholesale?SearchText=GSM+Module+SIM800L&g=y&page=1) GSM Module SIM800L
3. [<img src="icons/3.png" width="100">](https://aliexpress.ru/wholesale?SearchText=Jumper+cap+2.54&g=y&page=1) Jumper cap 2.54
4. [<img src="icons/4.png" width="100">](https://aliexpress.ru/wholesale?SearchText=10pcs+2.54MM+pitch+MALE+SOCKET+straight+idc+box+headers+&g=y&page=1) 20P and 5P 2.54mm
5. [<img src="icons/5.png" width="100">](https://aliexpress.ru/wholesale?SearchText=10+%D1%88%D1%82.+2%252C54+%D0%BC%D0%BC+80+Pin+%D1%88%D0%B0%D0%B3+%D1%88%D1%82%D1%8B%D1%80%D0%B5%D0%B2%D0%BE%D0%B9+%D0%B4%D0%B2%D1%83%D1%85%D1%80%D1%8F%D0%B4%D0%BD%D1%8B%D0%B9&g=y&page=1) 2 pcs. 2.54mm 80 Pin male dual-row header
6. [<img src="icons/6.png" width="100">](https://aliexpress.ru/wholesale?SearchText=%D0%9A%D0%BB%D0%B5%D0%BC%D0%BC%D0%BD%D0%B0%D1%8F+%D0%BA%D0%BE%D0%BB%D0%BE%D0%B4%D0%BA%D0%B0+KF301-+2+P&g=y&page=1) Terminal block KF301-2P
7. [<img src="icons/7.png" width="100">](https://aliexpress.ru/item/1005008062387765.html) Dual-row connector FC-6P and FC-20P 2.54mm
8. [<img src="icons/8.png" width="100">](https://aliexpress.ru/wholesale?SearchText=%D0%9F%D0%BB%D0%BE%D1%81%D0%BA%D0%B8%D0%B9+%D0%BB%D0%B5%D0%BD%D1%82%D0%BE%D1%87%D0%BD%D1%8B%D0%B9+%D0%BA%D0%B0%D0%B1%D0%B5%D0%BB%D1%8C+%D0%B4%D0%BB%D1%8F+IDC+2%252C0+%D0%BC%D0%BC+FC+&g=y&page=1) Flat ribbon cable for IDC FC connector 2.54mm 40P and 12P
9. [<img src="icons/9.png" width="100">](https://aliexpress.ru/wholesale?SearchText=resistor&g=y&page=1) Resistors 2.2K 90pcs. and 10K 90pcs.
10. [<img src="icons/10.png" width="100">](https://aliexpress.ru/wholesale?SearchText=%D0%9A%D0%B0%D0%B1%D0%B5%D0%BB%D1%8C-%D0%BF%D0%B5%D1%80%D0%B5%D1%85%D0%BE%D0%B4%D0%BD%D0%B8%D0%BA+%D1%81+Micro+USB+%D0%BD%D0%B0+OTG&g=y&page=1) Micro USB 5Pin male to USB adapter cable
11. [<img src="icons/11.png" width="100">](https://aliexpress.ru/wholesale?SearchText=DC-DC+Buck+Converter+4.5V-16V+9V+12V+to+5V+3.3V+Step-down+Power+Voltage+Regulator+Module+Efficiency+98%25&g=y&page=1) DC-DC converter
12. [<img src="icons/19.png" width="100"><img src="icons/20.png" width="100">](https://aliexpress.ru/wholesale?SearchText=%D0%A2%D0%B2%D0%B5%D1%80%D0%B4%D0%BE%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9+%D1%80%D0%B5%D0%BB%D0%B5%D0%B9%D0%BD%D1%8B%D0%B9+%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8C&g=y&page=1) Solid-state relay module
13. [<img src="icons/21.png" width="100">](https://aliexpress.ru/wholesale?SearchText=2.54mm+Double+Row+Straight+Female+2-40P&g=y&page=1) Dual-row female connector
### Gerber files: <a href="https://youtu.be/3tv2-pYXrjg"><img src="/icons/icons8-youtube-48.png" alt="YouTube" width="24" height="24" style="vertical-align: middle"></a>&nbsp;&nbsp;<a href="https://rutube.ru/video/private/9b2cea71a3b7a72765657751a905738c/?p=SsnMQCw9kL5LmihFU1ot_Q"><img src="/icons/Rutube.png" alt="Rutube" width="50" height="26" style="vertical-align: middle"></a>
a. <a href="https://easyeda.com/editor#id=|e6a461cf7da546748c711f5ae1138cd7|2ffd4d2211de4b4ba91e1188545134c2" target="_blank">Zagotovka</a>
b. <a href="https://easyeda.com/editor#id=|23ee55cfd3e24ca19753cbba7066c13f|d1e252ee42ab4fbfb84c61a65fa2982f" target="_blank">Zagotovka-CN11</a>
c. <a href="https://easyeda.com/editor#id=|7e31c289e9f742a2acfa7db54bbde58a|30d6a426a32f425b8c8ff5ba5bdb792b" target="_blank">Zagotovka-CN12</a>
d. <a href="https://easyeda.com/editor#id=|125ff34d97324d308c97b01793449de7|1bc69b35cc6d419080bf3461774739e3" target="_blank">Zagotovka-10</a>
## Where to order PCBs:
- [Forum discussion](https://community.alexgyver.ru/threads/resheno-u-kogo-zakazyvat-pechatnye-platy-vo-vremja-dejstvija-sankcij.6818/page-9)

## Optional purchases:
15. [<img src="icons/12.png" width="100">](https://aliexpress.ru/wholesale?SearchText=%D0%AD%D0%BD%D0%BA%D0%BE%D0%B4%D0%B5%D1%80&g=y&page=1) Encoder
16. [<img src="icons/13.png" width="100">](https://aliexpress.ru/wholesale?SearchText=%D0%9F%D1%80%D0%BE%D0%B2%D0%BE%D0%B4%D0%BD%D0%BE%D0%B9+%D0%BC%D0%B0%D0%B3%D0%BD%D0%B8%D1%82%D0%BD%D1%8B%D0%B9+%D0%B4%D0%B2%D0%B5%D1%80%D0%BD%D0%BE%D0%B9%2C+%D0%BE%D0%BA%D0%BE%D0%BD%D0%BD%D1%8B%D0%B9+%D0%BA%D0%BE%D0%BD%D1%82%D0%B0%D0%BA%D1%82%D0%BD%D1%8B%D0%B9+%D0%B3%D0%B5%D1%80%D0%BA%D0%BE%D0%BD&g=y&page=1) Reed switch
17. [<img src="icons/14.png" width="100">](https://aliexpress.ru/wholesale?SearchText=ds18b20&g=y&page=1) DS18B20
18. [<img src="icons/15.png" width="100">](https://aliexpress.ru/wholesale?SearchText=dht22&g=y&page=1) DHT22
19. [<img src="icons/16.png" width="100">](https://aliexpress.ru/wholesale?SearchText=TTP223&g=y&page=1) TTP223
20. [<img src="icons/18.png" width="100">](https://aliexpress.ru/wholesale?SearchText=%D0%9A%D0%B0%D0%B1%D0%B5%D0%BB%D1%8C+Dupont+Line+%D0%B4%D0%BB%D1%8F+Arduino&g=y&page=1) Arduino jumper wires

### Assembly and connection. <a href="https://youtu.be/0MEFwOGv__A"><img src="/icons/icons8-youtube-48.png" alt="YouTube" width="24" height="24" style="vertical-align: middle"></a>&nbsp;&nbsp;<a href="https://rutube.ru/video/b01398d510e53b7798d8fa7cf06d6fbc/"><img src="/icons/Rutube.png" alt="Rutube" width="50" height="26" style="vertical-align: middle"></a>

## [Download firmware](https://github.com/zagotovka/Zagotovka_M/releases/latest) and how to flash STM32? <a href="https://youtu.be/C4c-W71eqqY"><img src="/icons/icons8-youtube-48.png" alt="YouTube" width="24" height="24" style="vertical-align: middle"></a>&nbsp;&nbsp;<a href="https://rutube.ru/video/55e08612c6f4ec527f6d10fa24ae89fb/"><img src="/icons/Rutube.png" alt="Rutube" width="50" height="26" style="vertical-align: middle"></a>

The project now uses a dual-bank (Bank A / Bank B) flash layout. For a first-time flash, download and program the Bank A image; Bank B is used for subsequent OTA updates. Both current firmware images are also available in the [Proshivka](https://github.com/zagotovka/Zagotovka_M/tree/main/Proshivka) folder.

### First flash of a new board (Windows, macOS, Linux)

A brand-new STM32 chip has its memory set up in the "single" way. Zagotovka_M needs the "dual" way (it is called **Dual Bank**, the option `nDBANK = 0`). The firmware cannot change this by itself: when the memory mode changes, everything stored in the chip is destroyed, including the bootloader. So the mode is changed from the outside, **before** the firmware is written.

You do not have to do it by hand. The script [`scripts/make_first_flash.py`](https://github.com/zagotovka/Zagotovka_M/blob/main/scripts/make_first_flash.py) does everything in one run:

1. It builds one file `Zagotovka_FIRST_FLASH_<version>.bin` (the bootloader + the Bank A firmware) in the folder `Proshivka/First_flash`. It takes the newest `Zagotovka_Bank_A_v*.bin` from the folder `Proshivka` by itself, so you never type the version.
2. It asks the chip which memory mode it has.
3. If the chip is in the old ("single") mode, it switches it to Dual Bank and waits until the chip restarts (up to 40 seconds, usually much less).
4. It erases the whole chip, writes the file and checks that the data was written correctly.
5. It prints `DONE`.

If something is wrong (a file is missing, the chip is not connected), the script stops and says why, before it touches the chip.

**How to run it:**

1. Install STM32CubeProgrammer (see below).
2. Connect the board to the computer with a USB cable (the ST-LINK connector).
3. Open the `scripts` folder, open a terminal (command line) in it and run:
   - Windows: `python make_first_flash.py`
   - macOS and Linux: `python3 make_first_flash.py`

Python 3 must be installed on the computer (it is free: <https://www.python.org/downloads/>); nothing extra is needed for it. After `DONE` the board restarts by itself and starts the firmware. If you only want to build the file and not touch the chip, add `--image-only` to the command.

> Do not just drag the `FIRST_FLASH` file onto the `NODE_F767ZI` USB drive of a brand-new board. Dragging a file does not change the memory mode, so the bootloader would print an error and would not start the firmware. Use the script above.

### STM32CubeProgrammer must be installed

The script works the same way on **Linux, Windows and macOS**, but only if the program **STM32CubeProgrammer** is installed on the computer. It is free, but you have to install it yourself: the script does not include it and does not download it.

Why it is needed:

- During installation it puts the drivers for the ST-LINK of the board into your system. Without them the computer does not see the board.
- The script talks to the chip through its command-line tool `STM32_Programmer_CLI`.
- Just in case, you can use it by hand to check the chip (see below).

**Where to get it.** Download it from the official site: <https://www.st.com/en/development-tools/stm32cubeprog.html>. Choose the installer for your operating system and run it. The script was tested with version 2.23.0.

**How to check the chip by hand.** Start STM32CubeProgrammer, choose `ST-LINK` in the list at the top right and press **Connect**. Open the **OB** tab (option bytes) and the group **User Configuration**: the box `nDBANK` must be **empty** (this is Dual Bank). If the box is ticked, the chip is still in the old mode: run the script again.

**Two more things that do not depend on the script:**

- **Windows.** The ST-LINK driver is needed (it is installed together with STM32CubeProgrammer or STM32CubeIDE). Type the command `python`, not `python3`.
- **Linux.** If the programmer says that it does not see the ST-LINK, but on another computer everything works, then your user has no right to use the USB device. This is fixed by the `udev` rules from the CubeProgrammer package (the folder `Drivers/rules` inside its installation folder): copy the `*.rules` files to `/etc/udev/rules.d/`, run `sudo udevadm control --reload-rules && sudo udevadm trigger`, and plug the board in again.

## Interface video guide.

### How to use the "Switches" page <a href="https://youtu.be/C74IQA4-2aI"><img src="/icons/icons8-youtube-48.png" alt="YouTube" width="24" height="24" style="vertical-align: middle"></a>&nbsp;&nbsp;<a href="https://rutube.ru/video/2d1cbc007f3da4553a70387ba9ce4421/"><img src="/icons/Rutube.png" alt="Rutube" width="50" height="26" style="vertical-align: middle"></a>
### How to use the "Buttons" page <a href="https://youtu.be/pMmqkwCnVaM"><img src="/icons/icons8-youtube-48.png" alt="YouTube" width="24" height="24" style="vertical-align: middle"></a>&nbsp;&nbsp;<a href="https://rutube.ru/video/b3336efe85e3811c379922c55f8c6e0f/"><img src="/icons/Rutube.png" alt="Rutube" width="50" height="26" style="vertical-align: middle"></a>
### How to use the "Encoders" page (under development) <a href="https://youtu.be/mRENaW0x7i8"><img src="/icons/icons8-youtube-48.png" alt="YouTube" width="24" height="24" style="vertical-align: middle"></a>&nbsp;&nbsp;<a href="https://rutube.ru/video/2289862620f6aff184af8c90487910ff/"><img src="/icons/Rutube.png" alt="Rutube" width="50" height="26" style="vertical-align: middle"></a>
### How to use the "Timers" page <a href="https://youtu.be/8pgqBO4cKdg"><img src="/icons/icons8-youtube-48.png" alt="YouTube" width="24" height="24" style="vertical-align: middle"></a>&nbsp;&nbsp;<a href="https://rutube.ru/video/1268e322b1618adb77710be2fff14bf2/"><img src="/icons/Rutube.png" alt="Rutube" width="50" height="26" style="vertical-align: middle"></a>
### How to use the "OneWire" page <a href="https://youtu.be/FTfkruXgUT0"><img src="/icons/icons8-youtube-48.png" alt="YouTube" width="24" height="24" style="vertical-align: middle"></a>&nbsp;&nbsp;<a href="https://rutube.ru/video/11652a191dc348f2218f202b141a8c76/"><img src="/icons/Rutube.png" alt="Rutube" width="50" height="26" style="vertical-align: middle"></a>
### How to use the "Security" page <a href="https://youtu.be/N9od6Ji41jU"><img src="/icons/icons8-youtube-48.png" alt="YouTube" width="24" height="24" style="vertical-align: middle"></a>&nbsp;&nbsp;<a href="https://rutube.ru/video/0043b0287f85fee9c82f10104955ec85/"><img src="/icons/Rutube.png" alt="Rutube" width="50" height="26" style="vertical-align: middle"></a>
### How to set up "HTTPS" for remote management from anywhere in the world. <a href="https://youtu.be/w-ke9_BD0vk"><img src="/icons/icons8-youtube-48.png" alt="YouTube" width="24" height="24" style="vertical-align: middle"></a>&nbsp;&nbsp;<a href="https://rutube.ru/video/9899433b2f574b507cda7e50bfcd342b/"><img src="/icons/Rutube.png" alt="Rutube" width="50" height="26" style="vertical-align: middle"></a>
### [Download 'CertGeneration.sh'](https://github.com/zagotovka/Zagotovka_M/raw/main/scripts/CertGeneration.sh) for certificate generation (right-click and select "Save link as").
### ⚠️ Dangerous bug that can lead to fatal consequences! <a href="https://youtu.be/F0R1ltD-ztE"><img src="/icons/icons8-youtube-48.png" alt="YouTube" width="24" height="24" style="vertical-align: middle"></a>&nbsp;&nbsp;<a href="https://rutube.ru/video/1d4476ca90e75804371516bbc6726cdd/"><img src="/icons/Rutube.png" alt="Rutube" width="50" height="26" style="vertical-align: middle"></a> ⚠️
<details>

<summary>Versioning system</summary>

<small>
This project uses semantic versioning. The version number follows the MAJOR.MINOR.PATCH format.

### Version components explained

#### MAJOR (first number)
- Increased for incompatible changes
- Example: changing from 1.x.x to 2.0.0 means significant changes that may break existing functionality

#### MINOR (second number)
- Increased when adding new functionality while maintaining backward compatibility
- Reset when MAJOR version increases
- Example: changing from 1.1.x to 1.2.0 means new features without breaking existing ones

#### PATCH (third number)
- Increased when fixing bugs that don't affect core functionality
- Reset when MAJOR or MINOR version increases
- Example: changing from 1.1.1 to 1.1.2 means fixing minor bugs
</small>

</details>

### Version history

| Version | Date       | Description               |
|---------|------------|---------------------------|
| 1.0.0   | 11-01-2025 | First stable release.|
| 1.0.1   | 3-02-2025 | Fixed bugs in "StartCronTask" and "ModalEditSensor".|
| 1.1.1   | 4-04-2025 | Added HTTPS support (HTTPS server implementation)|
| 2.0.0   | 27.06.2026 | Updated web interface and Mongoose library (7.13 → 7.21); added: SMS control, session limiting with indication, PID controller, PWM timer, desired encoder PWM frequency setting (0.05 Hz — 2 MHz); optimized and refactored code |
| 2.0.1 | 30.06.2026 | Replaced cJSON with Mongoose's built-in JSON API, heap optimization, and MQTT fix.|
| 2.0.2 | 02-07-2026 | Implemented: stop TLS Alert storm in pollQueue on session invalidation.|
| 2.1.0 | 15-07-2026 | Added Zigbee integration via MQTT gateway (SLZB-06p7U).|
| 2.1.1 | 17-07-2026 | Added DTCM pool allocator; migrated ~57 KB of buffers from .bss.|
| 2.2.0 | 18-07-2026 | Added universal Zigbee dimmer → encoder PWM binding with auto-detected range.|
| 2.2.1 | 19-07-2026 | Placed 42 hot functions in ITCM RAM for deterministic execution.|
| 2.2.2 | 20-07-2026 | Fixed Zigbee switch connection persistence, dimmer calibration, and learning mode.|
| 2.3.0 | 22-07-2026 | Added cascade deletion of connections when a pin type is set to NONE.|
| 2.4.0 | 24-07-2026 | Added universal Zigbee button support with auto-release and flexible payload matching.|
| 2.4.1 | 25-07-2026 | Fixed button event filtering, Zigbee PASSTHROUGH val:0 handling, and structured logging.|
| 2.5.0 | 31-07-2026 | Implemented OTA firmware update.|
| 2.5.1 | 01-08-2026 | Fixed a hardware bug with Flash memory lock.|
| 2.6.0 | 17-08-2026 | Implemented Dual Bank mode (dual-bank flash).|
| 2.6.1 | 07-09-2026 | Protected ITCM with MPU; fixed a NULL stdout write that corrupted ITCM.|
| 2.6.2 | 11-09-2026 | Added validation that the .bin firmware matches the inactive bank.|
| 2.7.0 | 13-09-2026 | Implemented a built-in MQTT server.|
| 2.8.0 | 14-09-2026 | Added live SYSTEM LOG tail to the Dashboard; embedded firmware version in release .bin file names.|
| 2.9.0 | 28-09-2026 | Raised the pin-to-pin link limit from 100 to 1024; fixed Zigbee ID truncation (IDs above 255) and out-of-bounds reads; links API now streamed in chunks; moved link storage from the DTCM pool to .bss.|
| 2.9.1 | 29-09-2026 | Fixed: empty INFO field could not be cleared; "Save changes" in Edit switch/Connection (also buttons, encoders) no longer turns on linked outputs.|
| 2.9.2 | 30-09-2026 | Improved button timing: immediate single-click handling without double-click support, configurable double-click interval via `dcinter`, and more deterministic 5 ms button polling. |
| 2.10.0 | 04-10-2026 | Added action conditions (e.g. `6:1?R2&!R3`) with a library of 12 shared conditions; Condition selector for Switch/Encoder links and PID; over-long actions are rejected, not truncated; Bank A now built with -Os. |
| 2.10.1 | 07-10-2026 | Added a Conditions library panel (C1..C12) with in-place editing, usage counters and warning badges for links to empty cells on the Switch, Encoder and PID pages; added the `D`/`DV` condition letters for device state and dimmer value (`R`/`RV` still work); fixed the Sunrise/Sunset fields rejecting uppercase letters; unified the formatting of all help sections and applied new menu icons. |
| 2.11.0 | 08-10-2026 | Made the web interface usable on phones; added PWM rows without an encoder to the PWM/Encoder pin page (On/Off switch, Normal/Inverted polarity, Zigbee dimmer binding); PWM can be switched by SMS and DTMF; renamed the Encoder pin page and added descriptions to all pages. |
| 2.12.0 | 13-10-2026 | Added a "Copy help" button to the help panel on every page (copies the whole help as Markdown, also works over plain http); the Device Logs page now has a "Show Help" / "Hide Help" button instead of an always-expanded help. |
| 2.12.1 | 13-10-2026 | Fixed OTA updates booting old firmware after successful writes: wrong flash sectors were erased when the 94-slot ring wrapped (now sectors 22–23 in Dual Bank mode, with erase/write verification). Reduced [DIAG] log flooding on the Device Logs page. Bootloader must be reflashed once with a programmer. |
| 2.12.2 | 15-10-2026 | Fixed: PWM pins with ID 30 and above were missing in the PWM timer and PID modals (added the lightweight /api/pwmpins/get request, lower heap peak); the On/Off slider now acts as a master enable for physical and Zigbee buttons; the page reloads to the login screen after an OTA update. A web build error now aborts the firmware build. |
| 2.12.3 | 19-10-2026 | Reduced heap peaks and hardened web UI/API: paginated responses, one request at a time, polling paused during saves. Added /api/pins/get and /api/sensors/get; fixed data loss, field truncation, JSON escaping, and log issues. POSTs return proper 400/507 errors. Firmware upload validates session and Content-Length first; /api/device/eraselast is disabled by default and POST-only. |
| 2.13.0 | 21-10-2026 | Added a per-pin "**State on power-up**" setting (like Tasmota PowerOnState): supports Device/PWM pins and Zigbee, with delayed USB state saving and a responsive column with tooltip. Existing behavior preserved by default. Renamed “Duty on restore” to “Power on state.” |
| 3.0.0 | 25-10-2026 | Shifted the logical ID scheme: physical pins now use IDs 1..89 (was 0..88), Zigbee 90..289 (was 89..288); saved configs are migrated automatically once (idver). IDs in the token API, MQTT, SMS commands and cron strings are shifted by +1. Reviewed every web page. Added an animated Zagotovka Mongoose logo (needs @property support: Chrome 85+, Safari 16.4+, Firefox 128+; older browsers show a static logo). |
| 3.0.1 | 26-10-2026 | OTA/bootloader reliability: bootloader verifies OTA image CRC32 before first trial boot and rolls back on mismatch; normal boot checks only MSP. Both banks’ size/CRC32 are stored in settings. Direct ST-Link flashes are detected and their stale version/CRC reset, showing “flashed directly” on the Firmware Update page. Settings writes are mutex-protected; OTA state survives settings-ring erase. Limitation: corrupted and directly flashed images are indistinguishable by content. One-time reflash of bootloader and erase of settings sectors 22–23 required; TLS key/certificate and Telegram token must be re-entered. |
| 3.0.2 | 27-10-2026 | Wrote the scripts/make_first_flash.py script, which prepares the microcontroller in a single operation, with no repeated runs: it reads FLASH->OPTCR, switches to Dual Bank if necessary (nDBANK=0), waits for the restart, erases the Flash, and programs Zagotovka_FIRST_FLASH_vX.X.Xx.bin (works on Windows, macOS, and Linux; requires STM32CubeProgrammer, which must be installed separately from the official ST website). For devices already running in Dual Bank, the script skips the Dual Bank switch. New boards must be switched to Dual Bank before the first flash (via the script or in CubeProgrammer): simply dragging the file onto the NODE_F767ZI drive does not change the memory mode! |
| 3.1.0 | 30-10-2026 | Added the Remote control page (`/remote`) with switches, PWM, buttons, Zigbee, PID, security and sensors on one screen, powered by paginated `GET /api/state/remote` (ETag/304) and `POST /api/remote/cmd`; hardened the built-in MQTT server and Zigbee power-on, including stale SLZB gateway eviction, cached gateway/client counts and immediate application of the saved power-on state; reworked web help with shared condition tables in `condHelp.js`, shortened examples, corrected 0–100 dimmer scale, mobile home-screen meta tags and about 180 KB smaller `web_root` before Zopfli. |
