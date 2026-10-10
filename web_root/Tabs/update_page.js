import { lockToggle } from '../helpLock.js';
import { h, useState, useEffect, useRef, html } from '../bundle.js';
import { pauseAll, resumeAll } from '../pollQueue.js';
import { Icons, Button } from '../components.js';

const FIRMWARE_UPLOAD_CHUNK_SIZE = 4096; // байт на POST; лимит тела запроса для /api/firmware/upload на устройстве не действует

const helpContent = {
  ru: html`
    <div class="mytext space-y-6 font-sans text-base leading-relaxed text-slate-700 [&_code]:font-sans [&_code]:font-semibold [&_pre]:font-sans">
        <section class="rounded-2xl border-2 bg-indigo-50 border-indigo-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Как загрузить новую прошивку (пошагово)</h2>
          <ol class="list-decimal ml-6 space-y-3">
            <li><b>Узнайте, какой банк активен.</b> Это видно в карточке <b>«Текущий образ прошивки»</b>. Обновляется только неактивный банк, поэтому нужен файл для противоположного: активен Bank A - берите <code>${'Zagotovka_Bank_B.bin'}</code>, активен Bank B - берите <code>${'Zagotovka_Bank_A.bin'}</code>.</li>
            <li>Убедитесь, что файл <code>${'.bin'}</code> собран именно для этой платы (Zagotovka_M / STM32F767ZI). Загрузка образа для другой платы автоматически не отслеживается.</li>
            <li>В карточке <b>«Обновление устройства»</b> нажмите <b>«Загрузить новую прошивку (.bin)»</b> и выберите файл.</li>
            <li>Не закрывайте вкладку и не выключайте питание устройства, пока движется полоса загрузки: файл передаётся частями напрямую во flash-память.</li>
            <li>Когда появится сообщение <b>«Прошивка успешно загружена»</b>, устройство само переключит образы и перезагрузится.</li>
            <li>После перезагрузки откройте эту страницу снова и убедитесь, что новая прошивка работает как ожидается. Если всё в порядке, нажмите <b>«Подтвердить эту прошивку»</b>.</li>
          </ol>

          <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300">
            <b>Как это работает:</b> новый файл записывается только в неактивный банк, а работающая прошивка в активном банке остаётся нетронутой. После загрузки устройство перезагружается на новый образ и «обкатывает» его: даёт до трёх пробных запусков (подробности в блоке ниже).
          </div>

          <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300">
            <b>Важно:</b> нужен файл <b>противоположного</b> банка, а не любой <code>${'.bin'}</code>. Интерфейс не начнёт загрузку, если в имени файла указан не тот банк, а устройство дополнительно проверяет метку банка внутри образа ещё до записи во flash.
          </div>

          <div class="mt-4">
            <b>Пример.</b> Сейчас активен Bank A, версия 1.4 (номера условные).
            <ul class="list-disc ml-6 mt-1">
              <li>Берём файл <code>${'Zagotovka_Bank_B.bin'}</code> и выбираем его по кнопке <b>«Загрузить новую прошивку (.bin)»</b></li>
              <li>Ждём конца полосы и сообщения <b>«Прошивка успешно загружена»</b>, устройство перезагружается</li>
              <li>В статусе видим «1-я тестовая загрузка из 3», проверяем работу и нажимаем <b>«Подтвердить эту прошивку»</b></li>
              <li>Статус сменится на «Подтверждено», а Bank A останется запасным на случай отката</li>
            </ul>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-violet-50 border-violet-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Как устройство «обкатывает» новую прошивку</h2>
          <p>Представьте, что вы купили новую обувь и меряете её три раза, прежде чем решить, подходит она или нет. Так же устройство «обкатывает» новую прошивку.</p>
          <ul class="list-disc ml-6 mt-1">
            <li>После заливки устройство даёт новой прошивке <b>до 3 пробных запусков</b>. В статусе при этом написано «N-я тестовая загрузка из 3». Каждая перезагрузка до подтверждения - это следующая пробная попытка.</li>
            <li>Самоподтверждение включается на <b>3-й пробной загрузке</b>: если прошивка проработала спокойно <b>целую минуту</b> без перезагрузок, устройство само подтверждает обновление, как будто вы нажали «Подтвердить эту прошивку». На 1-й и 2-й пробных загрузках само оно не подтверждает: нажмите кнопку сами, когда убедитесь, что всё работает.</li>
            <li>Если после трёх пробных запусков прошивка так и не подтверждена (например, на третьей попытке была перезагрузка раньше минуты), устройство <b>само вернётся</b> на прежнюю рабочую версию. В статусе появится «Выполнен автоматический откат на предыдущую версию прошивки.», чтобы это не путалось с вашим подтверждением.</li>
          </ul>
        </section>
        <section class="rounded-2xl border-2 bg-teal-50 border-teal-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Банки Bank A и Bank B</h2>
          <div>
            <h3 class="text-lg font-bold text-black mb-2">Файлы для банков</h3>
            <p class="mb-2">Файл <code>.bin</code>, который сейчас лежит в Bank A, и файл, который лежит в Bank B, - это две разные сборки, слинкованные под разные адреса flash. Артефакты сборки различаются по имени: <code>Zagotovka_Bank_A.bin</code> и <code>Zagotovka_Bank_B.bin</code>.</p>
            <ul class="list-disc ml-6 mt-1">
              <li>Обновлять можно только неактивный банк: нужен файл для банка, противоположного активному.</li>
              <li>Каждая сборка несёт внутри образа метку своего банка. Устройство сверяет её в начале загрузки и отклоняет образ не для того банка ещё до записи во flash.</li>
              <li>Интерфейс не начнёт загрузку, если в имени файла указан не тот банк.</li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-bold text-black mb-2">Кнопки управления банками</h3>
            <p class="mb-2">Цвет кнопки подсказывает риск. <b>Зелёная</b> кнопка безопасна. <b>Красная</b> (переключение банка) и <b>янтарная</b> (перезагрузка) сразу перезагружают устройство и всегда просят подтверждение. Переключение банка находится в карточке «Текущий образ прошивки», перезагрузка - в карточке «Обновление устройства».</p>
          <table class="w-full bg-white/70"><thead><tr><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Кнопка</th><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Что делает</th><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Когда доступна</th></tr></thead><tbody><tr><td class="border px-4 py-2"><b>Подтвердить эту прошивку</b></td><td class="border px-4 py-2">Закрепляет только что залитый и уже загрузившийся образ как рабочий, чтобы устройство не откатилось на предыдущий банк при следующей перезагрузке.</td><td class="border px-4 py-2">Только пока есть неподтверждённый кандидат.</td></tr><tr><td class="border px-4 py-2"><b>Переключиться на Bank X</b></td><td class="border px-4 py-2">Мгновенно переключает на уже подтверждённый ранее образ в другом банке. Ничего нового не заливается, пробного цикла нет: устройство перезагрузится сразу, поэтому нужно подтверждение.</td><td class="border px-4 py-2">Только если в другом банке есть рабочий образ и идёт не загрузка файла.</td></tr><tr><td class="border px-4 py-2"><b>Перезагрузить устройство</b></td><td class="border px-4 py-2">Перезагружает устройство. Требует подтверждения, чтобы не нажать случайно.</td><td class="border px-4 py-2">Всегда, кроме времени загрузки файла.</td></tr></tbody></table>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-rose-50 border-rose-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Примеры из жизни: что на самом деле умеет эта страница</h2>
          <p class="mb-2">Четыре истории о том, как обновление прошивки перестаёт быть страшным.</p>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Свет мигнул посреди обновления</p>
            <p class="mb-1">Вы запустили загрузку и пошли ставить чайник. Вернулись, а в доме свет мигнул, и полоса загрузки остановилась. Сердце ёкает: теперь контроллер превратился в кирпич?</p>
            <p class="mb-1">Спокойно! Новая прошивка пишется только в неактивный банк, а рабочая версия в активном банке не тронута. Пока загрузка не завершена и не появилось «Прошивка успешно загружена», устройство продолжает жить на прежней версии.</p>
            <p class="mb-1"><b>Результат:</b> дождитесь, пока устройство и сеть вернутся, снова нажмите <b>«Загрузить новую прошивку (.bin)»</b> и повторите загрузку с начала.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Новая версия оказалась с сюрпризом</p>
            <p class="mb-1">Вы собрали свой форк, залили его, и устройство уходит в перезагрузку снова и снова. Ехать к нему с кабелем и программатором не хочется совсем.</p>
            <p class="mb-1">Спокойно! У новой прошивки есть три пробные попытки. Если подтвердить её не удалось, устройство само вернётся на прежнюю рабочую версию, а в статусе появится «Выполнен автоматический откат на предыдущую версию прошивки.»</p>
            <p class="mb-1"><b>Результат:</b> вы снова на старой прошивке без кабеля. Поправьте код, соберите файл и повторите загрузку.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Через неделю стало капризничать</p>
            <p class="mb-1">Прошивку вы подтвердили, а через неделю замечаете: датчик иногда виснет, и что-то раньше работало лучше. Назад хочется прямо сейчас.</p>
            <p class="mb-1">Спокойно! Прежняя подтверждённая версия лежит в другом банке. Нажмите красную кнопку <b>«Переключиться на Bank X»</b> в карточке «Текущий образ прошивки» и подтвердите перезагрузку: новую заливку делать не нужно.</p>
            <p class="mb-1"><b>Результат:</b> одно нажатие, одна перезагрузка, и устройство работает на прежней версии. Кнопка доступна, пока в другом банке есть рабочий образ.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Скачали не тот файл</p>
            <p class="mb-1">Обновляете вечером, уже устали, и в папке лежат оба файла: Bank_A и Bank_B. Выбрали наугад. Вдруг не тот?</p>
            <p class="mb-1">Спокойно! Если в имени файла указан не тот банк, интерфейс не начнёт загрузку и скажет, какой файл нужен. Если файл переименован, устройство само проверит метку банка внутри образа и отклонит чужой образ до записи во flash.</p>
            <p class="mb-1"><b>Результат:</b> ничего не записано, активная прошивка цела. Возьмите файл противоположного банка и нажмите загрузку ещё раз.</p>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-amber-50 border-amber-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Обновление по HTTP и HTTPS</h2>
          <p class="rounded-xl border border-red-300 bg-red-50 px-4 py-2 font-bold text-red-700">Обновление по HTTP идёт без шифрования.</p>
          <p>Для большинства случаев HTTP подходит: например, если устройство находится в вашей домашней или локальной сети за роутером и снаружи не доступно. HTTP-режим не требует настройки домена и сертификатов и работает «из коробки».</p>
          <p>Но если устройство доступно из недоверенной сети (публичный Wi-Fi, проброс порта в интернет), файл прошивки и админ-сессию теоретически можно перехватить или подменить на лету. Для такого сценария в <b>Settings</b> можно настроить HTTPS (домен и сертификат).</p>
        </section>
        <section class="rounded-2xl border-2 bg-emerald-50 border-emerald-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Не работает? Проверьте</h2>
          <ul class="list-disc ml-6 mt-1">
            <li>Выбран ли файл противоположного банка: активен Bank A - нужен Bank_B, активен Bank B - нужен Bank_A.</li>
            <li>Расширение файла должно быть <code>${'.bin'}</code>: другие файлы страница не принимает.</li>
            <li>Не закрывалась ли вкладка и не пропадало ли питание во время загрузки: тогда просто повторите загрузку.</li>
            <li>Кнопка <b>«Подтвердить эту прошивку»</b> неактивна: подтверждать нечего, прошивка уже подтверждена или нет неподтверждённого кандидата.</li>
            <li>Кнопка <b>«Переключиться на Bank X»</b> неактивна: в другом банке нет рабочего образа или сейчас идёт загрузка файла.</li>
          </ul>
        </section>
        <section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">О проекте</h2>
          <p>Zagotovka_M - полностью open-source проект. Используйте его как есть на своём устройстве или сделайте форк и адаптируйте под своё оборудование, датчики и задачи: именно для этого он и создан.</p>
          <p>Есть идея, исправление бага или новая функция? Pull request-ы очень приветствуются!</p>
          <p><a class="inline-flex items-center gap-1.5 font-semibold text-cyan-700 hover:text-cyan-800 underline underline-offset-2" href="https://github.com/zagotovka/Zagotovka_M" target="_blank" rel="noopener noreferrer"><${Icons.link} class="w-5 h-5" />github.com/zagotovka/Zagotovka_M</a></p>
        </section>
    </div>
  `,
  en: html`
    <div class="mytext space-y-6 font-sans text-base leading-relaxed text-slate-700 [&_code]:font-sans [&_code]:font-semibold [&_pre]:font-sans">
        <section class="rounded-2xl border-2 bg-indigo-50 border-indigo-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">How to upload a new firmware (step by step)</h2>
          <ol class="list-decimal ml-6 space-y-3">
            <li><b>Find out which bank is active.</b> You can see it in the <b>"Current firmware image"</b> card. Only the inactive bank gets updated, so you need the file for the opposite one: Bank A is active - take <code>${'Zagotovka_Bank_B.bin'}</code>, Bank B is active - take <code>${'Zagotovka_Bank_A.bin'}</code>.</li>
            <li>Make sure the <code>${'.bin'}</code> file was built for this exact board (Zagotovka_M / STM32F767ZI). An image for a different board is not caught automatically.</li>
            <li>In the <b>"Device update"</b> card press <b>"Upload new firmware (.bin)"</b> and select the file.</li>
            <li>Keep the tab open and do not power off the device while the progress bar is moving: the file is streamed chunk by chunk directly into flash.</li>
            <li>When you see <b>"Firmware uploaded successfully"</b>, the device swaps images and reboots by itself.</li>
            <li>After it comes back, open this page again and check that the new firmware works as expected. If everything is fine, press <b>"Commit this firmware"</b>.</li>
          </ol>

          <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300">
            <b>How it works:</b> the new file is written only into the inactive bank, and the working firmware in the active bank stays untouched. After the upload the device reboots into the new image and test-drives it: it allows up to three trial boots (details in the block below).
          </div>

          <div class="mt-4 p-3 rounded-xl bg-white/80 border border-indigo-300">
            <b>Important:</b> you need the file of the <b>opposite</b> bank, not just any <code>${'.bin'}</code>. The interface does not start the upload if the file name points to the wrong bank, and the device additionally checks the bank label inside the image before anything is written to flash.
          </div>

          <div class="mt-4">
            <b>Example.</b> Bank A is active right now, version 1.4 (the numbers are made up).
            <ul class="list-disc ml-6 mt-1">
              <li>Take the file <code>${'Zagotovka_Bank_B.bin'}</code> and pick it with the <b>"Upload new firmware (.bin)"</b> button</li>
              <li>Wait for the end of the progress bar and the <b>"Firmware uploaded successfully"</b> message, the device reboots</li>
              <li>The status reads "Trial boot 1 of 3": check that everything works and press <b>"Commit this firmware"</b></li>
              <li>The status changes to "Committed", and Bank A stays as a spare in case of a rollback</li>
            </ul>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-violet-50 border-violet-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">How the device test-drives a new firmware</h2>
          <p>Think of trying on a new pair of shoes three times before deciding whether to keep them. The device "test-drives" a new firmware the same way.</p>
          <ul class="list-disc ml-6 mt-1">
            <li>After the upload, the device gives the new firmware <b>up to 3 trial boots</b>. The status then reads "Trial boot N of 3". Every reboot before the commit is the next trial attempt.</li>
            <li>Self-commit switches on at the <b>3rd trial boot</b>: if the firmware runs quietly for a <b>full minute</b> without rebooting, the device confirms the update on its own, as if you had pressed "Commit this firmware". On the 1st and 2nd trial boots it does not commit by itself: press the button yourself once you are sure everything works.</li>
            <li>If after three trial boots the firmware is still not committed (for example, it rebooted within a minute on the third attempt), the device <b>switches back</b> to the previous working version by itself. The status then shows "Automatic rollback to the previous firmware version was performed.", so it is never confused with you confirming the update.</li>
          </ul>
        </section>
        <section class="rounded-2xl border-2 bg-teal-50 border-teal-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Bank A and Bank B</h2>
          <div>
            <h3 class="text-lg font-bold text-black mb-2">Files for the banks</h3>
            <p class="mb-2">The <code>.bin</code> file currently in Bank A and the one in Bank B are two different builds, linked for different flash addresses. The build artifacts are named differently: <code>Zagotovka_Bank_A.bin</code> and <code>Zagotovka_Bank_B.bin</code>.</p>
            <ul class="list-disc ml-6 mt-1">
              <li>Only the inactive bank can be updated: you need the file for the bank opposite to the active one.</li>
              <li>Each build carries its bank label inside the image. The device verifies it at the start of the upload and rejects an image built for the other bank before anything is written to flash.</li>
              <li>The interface does not start the upload if the file name points to the wrong bank.</li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-bold text-black mb-2">Bank buttons</h3>
            <p class="mb-2">The button color hints at the risk. The <b>green</b> button is safe. The <b>red</b> one (bank switch) and the <b>amber</b> one (reboot) reboot the device right away and always ask for confirmation. Bank switching is in the "Current firmware image" card, rebooting is in the "Device update" card.</p>
          <table class="w-full bg-white/70"><thead><tr><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">Button</th><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">What it does</th><th class="border px-4 py-2 text-left font-bold text-black bg-black/5">When it is available</th></tr></thead><tbody><tr><td class="border px-4 py-2"><b>Commit this firmware</b></td><td class="border px-4 py-2">Locks in the image that was just uploaded and has already booted, so the device will not roll back to the other bank on the next reboot.</td><td class="border px-4 py-2">Only while there is an uncommitted candidate.</td></tr><tr><td class="border px-4 py-2"><b>Switch to Bank X</b></td><td class="border px-4 py-2">Immediately switches to a previously committed image in the other bank. Nothing new is uploaded and there is no trial cycle: the device reboots right away, which is why it asks for confirmation.</td><td class="border px-4 py-2">Only if the other bank has a working image and no upload is running.</td></tr><tr><td class="border px-4 py-2"><b>Reboot device</b></td><td class="border px-4 py-2">Reboots the device. It asks for confirmation so it cannot be pressed by accident.</td><td class="border px-4 py-2">Always, except while a file is being uploaded.</td></tr></tbody></table>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-rose-50 border-rose-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Real-life examples: what this page can really do</h2>
          <p class="mb-2">Four stories about how a firmware update stops being scary.</p>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">The lights blinked mid-update</p>
            <p class="mb-1">You started the upload and went to put the kettle on. You come back: the lights blinked at home and the progress bar has stopped. Your heart skips: is the controller a brick now?</p>
            <p class="mb-1">Relax! The new firmware is written only into the inactive bank, and the working version in the active bank is untouched. Until the upload finishes and "Firmware uploaded successfully" appears, the device keeps living on the previous version.</p>
            <p class="mb-1"><b>Result:</b> wait until the device and the network are back, press <b>"Upload new firmware (.bin)"</b> again and repeat the upload from the start.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">The new version came with a surprise</p>
            <p class="mb-1">You built your own fork, uploaded it, and the device keeps rebooting again and again. Driving to it with a cable and a programmer is the last thing you want.</p>
            <p class="mb-1">Relax! A new firmware gets three trial boots. If it could not be committed, the device returns to the previous working version by itself, and the status reads "Automatic rollback to the previous firmware version was performed."</p>
            <p class="mb-1"><b>Result:</b> you are back on the old firmware without a cable. Fix the code, build the file and upload again.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">A week later it started acting up</p>
            <p class="mb-1">You committed the firmware, and a week later you notice: a sensor sometimes hangs, and something used to work better. You want to go back right now.</p>
            <p class="mb-1">Relax! The previous committed version sits in the other bank. Press the red <b>"Switch to Bank X"</b> button in the "Current firmware image" card and confirm the reboot: no new upload is needed.</p>
            <p class="mb-1"><b>Result:</b> one press, one reboot, and the device runs the previous version. The button is available while the other bank holds a working image.</p>
          </div>

          <div class="p-4 rounded-xl bg-white/80 border border-rose-300">
            <p class="text-lg font-bold text-black mb-1">Downloaded the wrong file</p>
            <p class="mb-1">You update in the evening, already tired, and the folder holds both files: Bank_A and Bank_B. You picked one at random. What if it is the wrong one?</p>
            <p class="mb-1">Relax! If the file name points to the wrong bank, the interface does not start the upload and tells you which file is needed. If the file was renamed, the device checks the bank label inside the image itself and rejects a foreign image before anything is written to flash.</p>
            <p class="mb-1"><b>Result:</b> nothing is written, the active firmware is intact. Take the file of the opposite bank and start the upload again.</p>
          </div>
        </section>
        <section class="rounded-2xl border-2 bg-amber-50 border-amber-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Updating over HTTP and HTTPS</h2>
          <p class="rounded-xl border border-red-300 bg-red-50 px-4 py-2 font-bold text-red-700">Updating over HTTP is unencrypted.</p>
          <p>HTTP is fine for most setups: for example, when the device is on your home or local network behind a router and not exposed externally. HTTP mode works out of the box, with no domain or certificate setup needed.</p>
          <p>However, if the device is reachable from an untrusted network (public Wi-Fi, port-forwarded to the internet), the firmware file and admin session could in theory be intercepted or tampered with in transit. For that scenario you can configure HTTPS (domain and certificate) in <b>Settings</b>.</p>
        </section>
        <section class="rounded-2xl border-2 bg-emerald-50 border-emerald-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">Not working? Check these</h2>
          <ul class="list-disc ml-6 mt-1">
            <li>Is it the file of the opposite bank: Bank A is active - you need Bank_B, Bank B is active - you need Bank_A.</li>
            <li>The file extension must be <code>${'.bin'}</code>: the page accepts no other files.</li>
            <li>Was the tab closed or the power lost during the upload? Then simply repeat the upload.</li>
            <li>The <b>"Commit this firmware"</b> button is inactive: there is nothing to commit, the firmware is already committed or there is no uncommitted candidate.</li>
            <li>The <b>"Switch to Bank X"</b> button is inactive: the other bank has no working image or a file upload is running.</li>
          </ul>
        </section>
        <section class="rounded-2xl border-2 bg-sky-50 border-sky-300 p-5 space-y-4">
          <h2 class="text-xl font-bold text-black">About the project</h2>
          <p>Zagotovka_M is a fully open-source project. Take it as-is and run it on your device, or fork it and adapt it to your own hardware, sensors and needs: that is exactly what it is here for.</p>
          <p>Got an idea, a bugfix, or a new feature? Pull requests are very welcome!</p>
          <p><a class="inline-flex items-center gap-1.5 font-semibold text-cyan-700 hover:text-cyan-800 underline underline-offset-2" href="https://github.com/zagotovka/Zagotovka_M" target="_blank" rel="noopener noreferrer"><${Icons.link} class="w-5 h-5" />github.com/zagotovka/Zagotovka_M</a></p>
        </section>
    </div>
  `
};

export function FirmwareUpdate({ }) {
  // /api/firmware/status возвращает ОБЪЕКТ: { firmwares: [current, previous],
  // active_bank: 0|1, bank_a_version, bank_b_version }
  const [info, setInfo] = useState({
    firmwares: [{}, {}],
    active_bank: 0,
    bank_a_version: '',
    bank_b_version: '',
    bank_a_valid: false,
    bank_b_valid: false
  });
  const [language, setLanguage] = useState('ru');
  const [alert, setAlert] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
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
      // Зелёные алерты (OTA success) показываем дольше — 60 сек,
      // чтобы пользователь успел увидеть до редиректа.
      // Ошибки/предупреждения — 5 сек.
      const timeout = alert.type === 'green' ? 60000 : 5000;
      const timer = setTimeout(() => {
        setAlert(null);
      }, timeout);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const statusText = (fw) => {
    const s = fw?.status;
    if (s === 1) {
      const n = fw.retries == null ? '?' : Math.max(1, fw.retries);
      const max = fw.max_retries ?? 3;
      return language === 'ru'
        ? `${n}-я тестовая загрузка из ${max}`
        : `Trial boot ${n} of ${max}`;
    }
    const map = {
      0: language === 'ru' ? 'Нет данных о версии (прошито не через OTA)' : 'No OTA data (flashed directly, not via OTA)',
      2: language === 'ru' ? 'Не подтверждено' : 'Uncommitted',
      3: language === 'ru' ? 'Подтверждено' : 'Committed',
      4: language === 'ru' ? 'Выполнен автоматический откат на предыдущую версию прошивки.' : 'Automatic rollback to the previous firmware version was performed.'
    };
    return s != null && map[s] !== undefined ? map[s] : (language === 'ru' ? 'Н/Д' : 'N/A');
  };

  const firmwares = info.firmwares || [{}, {}];
  const activeBank = info.active_bank || 0;
  const bankAVersion = info.bank_a_version || '';
  const bankBVersion = info.bank_b_version || '';
  // bank_a_valid/bank_b_valid — реальное наличие рабочего образа в банке
  // (сервер проверяет MSP в векторной таблице по адресу банка), а НЕ
  // непустота bank_a_version/bank_b_version. Версия появляется только
  // после mg_ota_commit(), т.е. только если прошивка попадала в банк
  // через OTA. Bank A всегда прошивается напрямую через ST-Link (сразу
  // после bootloader'а, на чистом МК) — версии там никогда не будет,
  // хотя сам образ полностью валиден и загружается. Раньше "Bank A: —"
  // ошибочно читалось как "банк пуст", хотя это лишь означало "версия
  // неизвестна, потому что прошито не через OTA".
  const bankAValid = !!info.bank_a_valid;
  const bankBValid = !!info.bank_b_valid;

  // Пустая версия при валидном образе означает одно из двух:
  //  1) банк прошит напрямую через ST-Link — версии не будет никогда;
  //  2) это активный банк, только что залитый через OTA, но ещё не
  //     закоммиченный (status 1 = trial, 2 = uncommitted) — версия
  //     появится после mg_ota_commit(), сейчас её отсутствие не значит
  //     "не через OTA".
  // "Необкатанный" образ всегда лежит в активном банке (новый образ
  // через OTA сразу становится активным), поэтому для неактивного банка
  // с пустой версией остаётся только вариант (1).
  const currentStatus = firmwares[0]?.status;
  const isUncommittedOta = currentStatus === 1 || currentStatus === 2;
  const bankLabel = (version, valid, isActiveBank) => {
    if (version) return version;
    if (isActiveBank && isUncommittedOta) {
      return language === 'ru'
        ? 'прошито через OTA (не подтверждено)'
        : 'flashed via OTA (uncommitted)';
    }
    if (valid) {
      return language === 'ru' ? 'прошито напрямую (не через OTA)' : 'flashed directly (not via OTA)';
    }
    return '—';
  };

  // Целевой банк для переключения — противоположный активному.
  // Активный банк никогда не трогается OTA-циклом (новый образ всегда
  // пишется в другой банк), поэтому в нём всегда остаётся последняя
  // подтверждённая рабочая прошивка — переключение на него безопасно.
  const targetBank = activeBank === 1 ? 'A' : 'B';
  const targetVersion = activeBank === 1 ? bankAVersion : bankBVersion;
  const targetValid = activeBank === 1 ? bankAValid : bankBValid;

  // Кнопка "Вернуться на Bank X" не должна быть кликабельной, если в целевом
  // банке реально нет образа (targetValid === false) — иначе клик приводит
  // только к ошибке от сервера постфактум. Именно наличие образа, а не
  // наличие версии: у прошивки, залитой через ST-Link, версии не будет,
  // но переключаться на неё можно и нужно. Полностью меняем набор классов
  // (а не полагаемся на disabled:opacity-40 и т.п.), чтобы неактивность
  // кнопки было видно сразу, а не только по курсору при наведении — по
  // аналогии с кнопкой "Подтвердить эту прошивку" ниже.
  const bankSwitchDisabled = uploading || !targetValid;

  // Кнопка "Подтвердить эту прошивку" вызывает mg_ota_commit() — это защитный
  // механизм двухбанковой OTA-схемы: пока прошивка не подтверждена, при
  // следующей перезагрузке bootloader откатится на предыдущий образ.
  // Подтверждать имеет смысл только в статусах 1 (первая загрузка после OTA)
  // и 2 (не подтверждено); при 0 (нет OTA-данных) и 3 (уже подтверждено)
  // кнопка неактивна, т.к. подтверждать нечего.
  const canCommit = firmwares[0].status === 1 || firmwares[0].status === 2;

  const oncommit = (ev) =>
    fetch('api/firmware/commit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    })
      .then((r) => r.json())
      .then(refresh)
      .catch(() =>
        setAlert({
          type: 'red',
          message:
            language === 'ru'
              ? 'Ошибка: не удалось подтвердить прошивку.'
              : 'Error: could not commit the firmware.'
        })
      );

  // Переключение активного банка (Bank A <-> Bank B) без заливки нового
  // образа: mg_ota_switch_bank() проверяет валидность образа в целевом
  // банке, делает его активным и перезагружает устройство.
  // Ответ "true" — устройство уже ребутается, "false" — образа нет.
  const onswitchbank = (ev) =>
    fetch('api/firmware/switch-bank', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    })
      .then((r) => r.json())
      .then((ok) => {
        if (ok) {
          setAlert({
            type: 'green',
            message:
              language === 'ru'
                ? `Переключение на Bank ${targetBank}... Ожидание перезагрузки устройства...`
                : `Switching to Bank ${targetBank}... Waiting for device to reboot...`
          });
          setTimeout(() => window.location.reload(), 8000);
        } else {
          setAlert({
            type: 'red',
            message:
              language === 'ru'
                ? `Ошибка: в Bank ${targetBank} нет валидного образа прошивки.`
                : `Error: Bank ${targetBank} has no valid firmware image.`
          });
        }
      })
      .catch(() =>
        setAlert({
          type: 'red',
          message:
            language === 'ru'
              ? 'Ошибка: не удалось переключить банк.'
              : 'Error: could not switch the bank.'
        })
      );

  // Переключение банка — мгновенный ребут без trial-цикла, поэтому
  // требует подтверждения по той же логике, что и onrebootConfirm ниже:
  // случайный клик не должен сразу перезагружать устройство. Текст диалога
  // прямо называет действие, чтобы красный цвет кнопки подкреплялся словами.
  const onswitchbankConfirm = (ev) => {
    const confirmMsg =
      language === 'ru'
        ? `Переключиться на Bank ${targetBank}${targetVersion ? ` (${targetVersion})` : ''} и перезагрузить устройство? Перезагрузка произойдёт немедленно, пробного цикла не будет.`
        : `Switch to Bank ${targetBank}${targetVersion ? ` (${targetVersion})` : ''} and reboot the device? The reboot happens immediately, there is no trial cycle.`;
    if (!window.confirm(confirmMsg)) {
      return Promise.resolve();
    }
    return onswitchbank(ev);
  };

  // Ожидание возвращения устройства после перезагрузки: опрашиваем
  // api/firmware/status раз в секунду (до 60 раз) и перезагружаем страницу,
  // как только устройство ответило. Общая функция для загрузки прошивки
  // и для кнопки перезагрузки.
  const waitForDevice = (firstDelayMs) => {
    let retryCount = 0;
    const checkStatus = async () => {
      try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 2000); // не ждать вечно (защита от мёртвых keep-alive сокетов / NAT / Wi-Fi)
        const res = await fetch('api/firmware/status', { signal: ctrl.signal, cache: 'no-store' });
        clearTimeout(t);
        if (res.ok) {
          window.location.reload();
          return;
        }
      } catch (e) {
        // Сеть недоступна / таймаут — ожидаемо во время перезагрузки
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

    setTimeout(checkStatus, firstDelayMs);
  };

  const onreboot = async (ev) => {
    try {
      await fetch('api/device/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reboot: 1 })
      });
    } catch (e) {
      // Устройство может оборвать соединение, не успев ответить, - это нормально
    }
    setAlert({
      type: 'green',
      message:
        language === 'ru'
          ? 'Перезагрузка устройства... Ожидание ответа...'
          : 'Rebooting the device... Waiting for it to come back...'
    });
    waitForDevice(5000);
  };

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

    const fname = file.name.toLowerCase();
    const looksA = fname.includes('bank_a');
    const looksB = fname.includes('bank_b');
    if ((targetBank === 'A' && looksB) || (targetBank === 'B' && looksA)) {
      // Блокирующая подсказка по имени файла — just-UX: реальная защита —
      // серверная проверка метки банка (fw_meta) в первом чанке, до записи
      // во flash (Core/Src/net.c). Здесь просто не начинаем загрузку.
      setAlert({
        type: 'red',
        message: language === 'ru'
          ? `Для обновления нужен файл «Bank ${targetBank}», так как сейчас активен «Bank ${activeBank === 1 ? 'B' : 'A'}». Нельзя обновлять активный банк.`
          : `The update needs a "Bank ${targetBank}" file, since "Bank ${activeBank === 1 ? 'B' : 'A'}" is currently active. The active bank cannot be updated.`
      });
      uploadingRef.current = false;
      return; // загрузка не начинается вообще
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
          // Тело ответа содержит пояснение сервера. Отказ по банку
          // ("Wrong bank image: built for Bank X, need Bank Y") показываем
          // красным баннером; всё остальное — общая ошибка загрузки (жёлтый).
          const errBody = await response.text();
          if (errBody.startsWith('Wrong bank image')) {
            setAlert({
              type: 'red',
              message: language === 'ru'
                ? `Для обновления нужен файл «Bank ${targetBank}», так как сейчас активен «Bank ${activeBank === 1 ? 'B' : 'A'}». Нельзя обновлять активный банк.`
                : `The update needs a "Bank ${targetBank}" file, since "Bank ${activeBank === 1 ? 'B' : 'A'}" is currently active. The active bank cannot be updated.`
            });
            uploadingRef.current = false;
            return;
          }
          throw new Error(`HTTP ${response.status} @offset=${offset}`);
        }

        setProgress(total ? Math.round((offset / total) * 100) : 100);

        if (buf.byteLength === 0) break;
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

      waitForDevice(3000);
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
        class=${`fixed top-0 left-0 right-0 z-50 border-b-4 p-3 sm:p-4 break-words ${bgColor}`}
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

    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col justify-start items-center" style="overflow-anchor:none;">
      <!-- декоративные размытые круги — как на Zigbee Devices -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-2 drop-shadow-sm tracking-tight uppercase">
          ${language === 'ru' ? 'Обновление прошивки' : 'Firmware Update'}
        </div>
        <p class="text-sm text-slate-600 mb-6 max-w-3xl">${language === 'ru' ? 'Вышла новая версия, а контроллер стоит в подвале и каждый его простой на счету. Выберите файл и загрузите его: если что-то пойдёт не так, устройство само вернётся на прежнюю прошивку.' : 'A new version is out, and the controller sits in the cellar where every minute of downtime counts. Pick the file and upload it: if something goes wrong, the device goes back to the previous firmware by itself.'}</p>

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
              ${language === 'ru' ? 'Версия' : 'Version'}: ${firmwares[0].version || 'N/A'}
            </div>
            <div class="text-slate-700 text-sm">
              ${language === 'ru' ? 'Активный банк' : 'Active bank'}: ${activeBank === 1 ? 'B' : 'A'}
            </div>
            <div class="text-slate-700 text-sm mb-2">
              ${language === 'ru' ? 'Статус' : 'Status'}: ${statusText(firmwares[0])}
            </div>
            <div class="text-slate-700 text-sm">
              Bank A: ${bankLabel(bankAVersion, bankAValid, activeBank === 0)}
            </div>
            <div class="text-slate-700 text-sm mb-2">
              Bank B: ${bankLabel(bankBVersion, bankBValid, activeBank === 1)}
            </div>
            <!-- Цвета кнопок страницы (чтобы их нельзя было перепутать):
                 бирюзовый градиент - только основное действие (загрузка прошивки);
                 зелёная - безопасное подтверждение; красная контурная - откат/
                 переключение банка (самое рискованное); янтарная контурная -
                 перезагрузка. Когда подтверждать нечего, вместо кнопки
                 показывается бейдж-статус, а не серая кнопка. -->
            ${canCommit
              ? html`
                <button
                  onclick=${oncommit}
                  title=${language === 'ru'
                    ? 'Подтверждает текущую прошивку, чтобы устройство не откатилось на предыдущую после перезагрузки'
                    : 'Confirms the current firmware so the device won\'t roll back to the previous one after reboot'}
                  class="w-full inline-flex justify-center items-center gap-2 py-2.5 rounded-full text-sm font-bold text-white shadow-md transition-all duration-300 transform bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-105 active:scale-95"
                >
                  <${Icons.ok} class="w-4" />
                  ${language === 'ru' ? 'Подтвердить эту прошивку' : 'Commit this firmware'}
                </button>
              `
              : (firmwares[0].status === 3
                ? html`
                  <div
                    role="status"
                    title=${language === 'ru'
                      ? 'Эта прошивка уже подтверждена, повторное подтверждение не требуется'
                      : 'This firmware is already committed, no further action needed'}
                    class="w-full inline-flex justify-center items-center gap-2 py-2.5 rounded-full text-sm font-bold bg-green-50 text-green-700 border border-green-300"
                  >
                    <${Icons.ok} class="w-4" />
                    ${language === 'ru' ? 'Прошивка подтверждена' : 'Firmware committed'}
                  </div>
                `
                : html`
                  <div
                    role="status"
                    class="w-full inline-flex justify-center items-center gap-2 py-2.5 rounded-full text-sm font-bold bg-slate-100 text-slate-500 border border-slate-300"
                  >
                    ${language === 'ru' ? 'Подтверждать нечего' : 'Nothing to commit'}
                  </div>
                `)}

            <div class="mt-auto pt-4 border-t border-slate-300/60 flex flex-col gap-3">
              <div class="text-xs font-bold uppercase tracking-wide text-rose-700/80">
                ${language === 'ru' ? 'Управление банками' : 'Bank control'}
              </div>
              <button
                onclick=${onswitchbankConfirm}
                disabled=${bankSwitchDisabled}
                title=${!targetValid
                  ? (language === 'ru'
                      ? `В Bank ${targetBank} нет прошивки - переключаться не на что`
                      : `Bank ${targetBank} has no firmware - nothing to switch to`)
                  : (language === 'ru'
                      ? `Переключает активный банк на Bank ${targetBank}${targetVersion ? ` (${targetVersion})` : ''} без заливки нового образа и перезагружает устройство`
                      : `Switches the active bank to Bank ${targetBank}${targetVersion ? ` (${targetVersion})` : ''} without uploading a new image, then reboots`)}
                class=${bankSwitchDisabled
                  ? "w-full inline-flex justify-center items-center gap-2 py-2.5 rounded-full text-sm font-bold bg-slate-200 text-slate-400 shadow-inner cursor-not-allowed"
                  : "w-full inline-flex justify-center items-center gap-2 py-2.5 rounded-full text-sm font-bold bg-white text-rose-700 border-2 border-rose-400 shadow-sm transition-all duration-300 hover:bg-rose-600 hover:text-white hover:border-rose-600 dark:hover:!bg-rose-600 dark:hover:!text-white dark:hover:!border-rose-600 active:scale-95"}
              >
                <${Icons.backward} class="w-4" />
                ${language === 'ru'
                  ? `Переключиться на Bank ${targetBank}${targetVersion ? ` (${targetVersion})` : ''}`
                  : `Switch to Bank ${targetBank}${targetVersion ? ` (${targetVersion})` : ''}`}
              </button>
            </div>
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

            <div class="mt-auto pt-4 border-t border-slate-300/60 flex flex-col gap-3">
              <div class="text-xs font-bold uppercase tracking-wide text-amber-700/80">
                ${language === 'ru' ? 'Перезагрузка' : 'Reboot'}
              </div>
              <button
                onclick=${onrebootConfirm}
                disabled=${uploading}
                title=${uploading
                  ? (language === 'ru' ? 'Недоступно во время загрузки прошивки' : 'Unavailable while a firmware upload is running')
                  : (language === 'ru' ? 'Перезагрузить устройство (требуется подтверждение)' : 'Reboot device (requires confirmation)')}
                class=${uploading
                  ? "w-full inline-flex justify-center items-center gap-2 py-2.5 rounded-full text-sm font-bold bg-slate-200 text-slate-400 shadow-inner cursor-not-allowed"
                  : "w-full inline-flex justify-center items-center gap-2 py-2.5 rounded-full text-sm font-bold bg-white text-amber-700 border-2 border-amber-400 shadow-sm transition-all duration-300 hover:bg-amber-500 hover:text-white hover:border-amber-500 dark:hover:!bg-amber-500 dark:hover:!text-white dark:hover:!border-amber-500 active:scale-95"}
              >
                <${Icons.refresh} class="w-4" />
                ${language === 'ru' ? 'Перезагрузить устройство' : 'Reboot device'}
              </button>
            </div>
          </div>
        </div>

        <div class="flex justify-end mt-2">
          <button
	  type="button"
	  onclick=${(e) => { lockToggle(e); setShowHelp(!showHelp); }}
	  class="px-8 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 shadow-sm transition-all duration-300 active:scale-95"
	>
            ${showHelp ? (language === 'ru' ? 'Скрыть справку' : 'Hide Help') : (language === 'ru' ? 'Показать справку' : 'Show Help')}
          </button>
        </div>

        ${showHelp &&
          html`
            <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700" style="max-height:70vh;max-height:70dvh;overflow-y:auto;">
              ${helpContent[language] || helpContent.en}
            </div>
          `}
      </div>
    </div>
  `;
}