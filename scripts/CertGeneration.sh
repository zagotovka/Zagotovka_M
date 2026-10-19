#!/bin/sh
# ============================================================
#   ЧТО НУЖНО ЗАПОЛНИТЬ - ТОЛЬКО ДВЕ СТРОКИ НИЖЕ
# ============================================================

# 1) На сколько дней сертификат. 3650 = 10 лет. Можно не менять.
DAYS=3650

# 2) Адрес устройства: то, что вы набираете в браузере.
#    Впишите домен и/или IP-адрес в кавычках, через пробел.
#    Пример:  NAMES="zagotovka.com 192.168.1.17"
#    Если вписать с https:// или с портом, скрипт сам их уберёт.
NAMES="https://zagotovka.ddns.net:8443 192.168.1.107"

# ============================================================
#   ДАЛЬШЕ НИЧЕГО НЕ МЕНЯЙТЕ. Просто запустите:
#       sh CertGeneration.sh
#
#   После запуска рядом со скриптом появится папка "ca".
#   В ней файл ca.crt. Отправьте его себе на телефон и
#   компьютер (почта, мессенджер) и откройте по инструкции
#   ниже. Файл ca/ca.key никому не давайте.
#
#   Для прошивки скрипт создаёт три файла:
#     Private_Key_c.txt  - TLS_KEY  (приватный ключ сервера)
#     Public_Key_c.txt   - TLS_CERT (сертификат сервера)
#     Secret_Key_c.txt   - TLS_CA   (публичный сертификат CA)
#
#   ВАЖНО: открывайте устройство в браузере по тому же адресу,
#   который вы вписали в NAMES выше. По другому адресу
#   предупреждение останется.
#
#   НЕ ПОЛУЧИЛОСЬ? НИЧЕГО СТРАШНОГО! Всё будет работать так же,
#   просто браузер будет показывать предупреждение:
#     Chrome:  "Дополнительные" -> "Перейти на сайт"
#     Safari:  "Показать подробности" -> "посетить этот веб-сайт"
#     Firefox: "Дополнительно" -> "Принять риск и продолжить"
#   Страница откроется, данные по-прежнему зашифрованы.
#
#   КАК ПОНЯТЬ, ЧТО ПОЛУЧИЛОСЬ: после установки закройте браузер
#   и откройте заново. Если предупреждения нет - всё готово.
#
# ------------------------- WINDOWS --------------------------
#   1. Два раза щёлкните по файлу ca.crt.
#   2. Нажмите "Установить сертификат".
#   3. Выберите "Текущий пользователь", нажмите "Далее".
#   4. Выберите "Поместить все сертификаты в следующее
#      хранилище", нажмите "Обзор" и выберите "Доверенные
#      корневые центры сертификации".
#   5. Нажмите "Далее", "Готово" и "Да".
#   (Firefox хранит сертификаты отдельно - см. раздел LINUX,
#   пункт Firefox: шаги те же.)
#
# ------------------------- ANDROID --------------------------
#   1. Перекиньте ca.crt на телефон (почта, мессенджер, USB).
#   2. Откройте Настройки, в поиске наберите "Сертификат".
#   3. Выберите "Установить сертификат" -> "Сертификат ЦС".
#   4. Нажмите "Всё равно установить" и выберите файл
#      (обычно он в папке "Загрузки").
#   Если телефон просит задать PIN-код или блокировку экрана -
#   это нормально, так требует Android. Надпись про
#   "отслеживание сети" тоже можно пропустить.
#   (Названия пунктов на разных телефонах могут отличаться.)
#
# ------------------------- iPHONE ---------------------------
#   1. Отправьте ca.crt себе (почта или AirDrop) и нажмите на
#      него. Телефон напишет "Профиль загружен" - так и надо.
#   2. Настройки -> Основные -> VPN и управление устройством ->
#      нажмите на профиль -> "Установить".
#   3. Настройки -> Основные -> Об этом устройстве ->
#      Доверие сертификатов -> включите "Zagotovka CA".
#
# -------------------------- macOS ---------------------------
#   1. Два раза щёлкните по файлу ca.crt. Откроется программа
#      "Связка ключей" (Keychain Access).
#   2. Если спросит, в какую связку добавить - оставьте "вход"
#      и нажмите "Добавить". Введите пароль от компьютера.
#   3. Найдите в списке "Zagotovka CA" и щёлкните по нему
#      два раза.
#   4. Раскройте пункт "Доверие" и в строке "При использовании
#      этого сертификата" выберите "Всегда доверять".
#   5. Закройте окно и введите пароль ещё раз.
#
# -------------------------- LINUX ---------------------------
#   ВАЖНО: на Linux сертификат нужно добавить ИМЕННО В БРАУЗЕР.
#   Команды в терминале (ниже) браузерам НЕ помогают.
#
#   Firefox:
#   1. Настройки -> Приватность и защита -> прокрутите вниз до
#      "Соединение и защита программного обеспечения"
#      (Connection and software security) -> нажмите на него.
#   2. В разделе "Сертификаты" (Certificates) нажмите
#      "Управление сертификатами" (Manage certificates).
#   3. Откройте вкладку "Центры сертификации" (Authorities).
#   4. Нажмите "Импортировать" (Import), выберите ca.crt и
#      поставьте галочку "Доверять при идентификации
#      веб-сайтов" (Trust this CA to identify websites).
#   (В более старых версиях: Настройки -> Приватность и защита
#   -> Сертификаты -> "Просмотр сертификатов".)
#   5. Появится окно "Вы хотите доверять ... Zagotovka CA?"
#      ("Trust this CA to identify websites" - галочка должна
#      стоять). Нажмите OK, затем OK в окне "Управление
#      сертификатами". Закройте Firefox и откройте заново.
#
#   Chrome / Chromium:
#   1. Настройки -> Конфиденциальность и безопасность ->
#      Безопасность -> "Управление сертификатами".
#   2. Вкладка "Центры сертификации" -> "Импорт", выберите
#      ca.crt и поставьте галочку "Доверять для веб-сайтов".
#   (Названия пунктов в разных версиях могут отличаться.)
#
#   После импорта ЗАКРОЙТЕ браузер полностью и откройте заново.
#
#   ТОЛЬКО ДЛЯ ОПЫТНЫХ (обычным пользователям это не нужно):
#   доверие для системных программ (curl, wget, apt), НЕ для
#   браузеров.
#   Ubuntu / Debian:
#     sudo cp ca.crt /usr/local/share/ca-certificates/zagotovka-ca.crt
#     sudo update-ca-certificates
#   Fedora:
#     sudo cp ca.crt /etc/pki/ca-trust/source/anchors/zagotovka-ca.crt
#     sudo update-ca-trust
#   (Строка "rehash: warning: skipping ca-certificates.crt..."
#   при этом - нормальная, её можно игнорировать.)
# ============================================================
cd "$(dirname "$0")" || exit 1

# Git Bash / MSYS на Windows иначе портит параметр -subj "/CN=..."
export MSYS_NO_PATHCONV=1

# Срок жизни CA с запасом, чтобы сертификат сервера не пережил свой CA
CA_DAYS=$((DAYS * 2))

# Временные файлы удаляются ВСЕГДА: и при успехе, и при ошибке.
# (папка ca/ НЕ удаляется)
LOG=$(mktemp 2>/dev/null || echo "openssl_error.log")
cleanup() {
    rm -f cnf server.csr Private_Key.txt Public_Key.txt "$LOG"
}
trap cleanup EXIT

# Показать ошибку OpenSSL и выйти
fail() {
    echo "$1 - Not Ok"
    if [ -s "$LOG" ]; then
        echo "--- Сообщение OpenSSL ---"
        cat "$LOG"
        echo "-------------------------"
    fi
    exit 1
}

# Старые файлы для прошивки удаляем сразу, чтобы после неудачного
# запуска не осталось ключа от одного запуска и сертификата от другого.
rm -f Private_Key_c.txt Public_Key_c.txt Secret_Key_c.txt

# ---- Собираем SAN: DNS:имя,IP:адрес,... ----
# Из каждой записи убираем: схему (https://), логин@, путь, порт, [ ].
# Затем: только цифры и точки (или есть ':') -> IP, иначе -> домен.
SAN=""
for n in $NAMES; do
    n=$(printf '%s' "$n" | tr -d '\r' | tr 'A-Z' 'a-z' |
        sed 's|^[a-z][a-z0-9+.-]*://||; s|[/?#].*$||; s|^[^@]*@||')
    case "$n" in
        \[*\]*) n=$(printf '%s' "$n" | sed 's|^\[\([^]]*\)\].*|\1|') ;;  # [IPv6]:порт
        *:*:*)  : ;;                                                    # IPv6 без скобок
        *:*)    n=${n%%:*} ;;                                           # имя:порт
    esac
    [ -z "$n" ] && continue
    case "$n" in
        *:*)           item="IP:$n" ;;
        *[!0-9.]*)     item="DNS:$n" ;;
        *)             item="IP:$n" ;;
    esac
    if [ -z "$SAN" ]; then SAN="$item"; else SAN="$SAN,$item"; fi
done

if [ -z "$SAN" ]; then
    echo "Ошибка: в строке NAMES нет ни одного адреса."
    exit 1
fi
echo "Адреса в сертификате: $SAN"

# Преобразование файла в строковую константу C/C++
convert_to_c_string() {
    input_file=$1
    output_file=$2
    var_name=$3

    printf 'const char *%s = \n' "$var_name" > "$output_file"
    while IFS= read -r line || [ -n "$line" ]; do
        esc=$(printf '%s' "$line" | tr -d '\r' | sed 's/\\/\\\\/g; s/"/\\"/g')
        printf '"%s\\n"\n' "$esc" >> "$output_file"
    done < "$input_file"
    printf ';\n' >> "$output_file"
}

mkdir -p ca

# ---- CA: создаётся один раз и потом сохраняется ----
if [ -f ca/ca.key ] && [ -f ca/ca.crt ]; then
    echo "CA уже существует (ca/ca.crt) - используем его"
else
    echo "Генерация CA..."
    if openssl ecparam -noout -name prime256v1 -genkey -out ca/ca.key >"$LOG" 2>&1 &&
       openssl req -x509 -new -sha256 -key ca/ca.key -days $CA_DAYS \
           -subj "/CN=Zagotovka CA" \
           -addext "basicConstraints=critical,CA:TRUE" \
           -addext "keyUsage=critical,keyCertSign,cRLSign" \
           -out ca/ca.crt >>"$LOG" 2>&1; then
        echo "CA - Ok"
    else
        rm -f ca/ca.key ca/ca.crt
        echo "(нужен OpenSSL 1.1.1 или новее; на macOS: brew install openssl)"
        fail "CA"
    fi
fi

# ---- Приватный ключ сервера (TLS_KEY) ----
echo "Генерация Private Key (TLS_KEY)..."
if openssl ecparam -noout -name prime256v1 -genkey -out Private_Key.txt >"$LOG" 2>&1; then
    echo "Private Key (TLS_KEY) - Ok"
    convert_to_c_string "Private_Key.txt" "Private_Key_c.txt" "TLS_KEY"
else
    fail "Private Key (TLS_KEY)"
fi

# ---- Расширения сертификата сервера ----
cat > cnf <<EOT
[server_ext]
basicConstraints=critical,CA:FALSE
keyUsage=critical,digitalSignature
extendedKeyUsage=serverAuth
subjectAltName=$SAN
EOT

# ---- CSR ----
echo "Генерация CSR для сервера..."
if openssl req -new -sha256 -key Private_Key.txt -subj "/CN=zagotovka" -out server.csr >"$LOG" 2>&1; then
    echo "CSR для сервера - Ok"
else
    fail "CSR для сервера"
fi

# ---- Сертификат сервера (TLS_CERT), подписанный CA ----
echo "Генерация Public Key (TLS_CERT)..."
if openssl x509 -req -sha256 -in server.csr -extfile cnf -extensions server_ext \
    -CA ca/ca.crt -CAkey ca/ca.key -CAserial ca/ca.srl -CAcreateserial \
    -days $DAYS -out Public_Key.txt >"$LOG" 2>&1; then
    echo "Public Key (TLS_CERT) - Ok"
    convert_to_c_string "Public_Key.txt" "Public_Key_c.txt" "TLS_CERT"
else
    fail "Public Key (TLS_CERT)"
fi

# TLS_CA - публичный сертификат CA
convert_to_c_string "ca/ca.crt" "Secret_Key_c.txt" "TLS_CA"

echo "Все операции завершены успешно!"
echo "Установите на устройства файл: ca/ca.crt"
echo "В прошивку: Private_Key_c.txt, Public_Key_c.txt, Secret_Key_c.txt"