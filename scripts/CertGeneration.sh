#!/bin/sh

cd `dirname $0`

# Переменная для указания количества дней действия сертификатов
DAYS=3650  # Укажите сколько дней должны быть валидными ваши сертификаты.

# Создание временного файла конфигурации для добавления SAN
echo "[SAN]" > cnf
echo "subjectAltName=DNS:zagotovka.example.com" >> cnf # Укажите здесь свой домен вместо "zagotovka.example.com"

# Функция для преобразования файла в формат строковой константы C/C++
convert_to_c_string() {
    input_file=$1
    output_file=$2
    var_name=$3

    # Преобразуем содержимое файла в строковый литерал C/C++
    echo "const char *${var_name} = " > "${output_file}"
    cat "${input_file}" | while IFS= read -r line; do
        # Экранируем строку и добавляем \n в конце каждой строки
        printf '"%s\\n"\n' "$(echo "$line" | sed 's/\\/\\\\/g; s/"/\\"/g')" >> "${output_file}"
    done
    echo ";" >> "${output_file}"
}

# Генерация Secret Key (TLS_CA)
echo "Генерация Secret Key (TLS_CA)..."
if openssl ecparam -noout -name prime256v1 -genkey -out Secret_Key.txt > /dev/null 2>&1; then
    echo "Secret Key (TLS_CA) - Ok"
    # Преобразуем Secret_Key.txt в формат C/C++
    convert_to_c_string "Secret_Key.txt" "Secret_Key_c.txt" "TLS_CA"
else
    echo "Secret Key (TLS_CA) - Not Ok"
    exit 1
fi

# Генерация CA сертификата (необходим для подписи серверного сертификата)
echo "Генерация CA сертификата..."
if openssl req -x509 -new -key Secret_Key.txt -days $DAYS -subj "/CN=Mongoose" -out ca.crt > /dev/null 2>&1; then
    echo "CA сертификат - Ok"
else
    echo "CA сертификат - Not Ok"
    exit 1
fi

# Генерация Private Key (TLS_KEY)
echo "Генерация Private Key (TLS_KEY)..."
if openssl ecparam -noout -name prime256v1 -genkey -out Private_Key.txt > /dev/null 2>&1; then
    echo "Private Key (TLS_KEY) - Ok"
    # Преобразуем Private_Key.txt в формат C/C++
    convert_to_c_string "Private_Key.txt" "Private_Key_c.txt" "TLS_KEY"
else
    echo "Private Key (TLS_KEY) - Not Ok"
    exit 1
fi

# Генерация запроса на сертификат (CSR) для сервера
echo "Генерация CSR для сервера..."
if openssl req -new -sha256 -key Private_Key.txt -days $DAYS -subj "/CN=server" -out server.csr > /dev/null 2>&1; then
    echo "CSR для сервера - Ok"
else
    echo "CSR для сервера - Not Ok"
    exit 1
fi

# Генерация Public Key (TLS_CERT)
echo "Генерация Public Key (TLS_CERT)..."
if openssl x509 -req -sha256 -in server.csr -extensions SAN -extfile cnf \
    -CAkey Secret_Key.txt -CA ca.crt -CAcreateserial -days $DAYS -out Public_Key.txt > /dev/null 2>&1; then
    echo "Public Key (TLS_CERT) - Ok"
    # Преобразуем Public_Key.txt в формат C/C++
    convert_to_c_string "Public_Key.txt" "Public_Key_c.txt" "TLS_CERT"
else
    echo "Public Key (TLS_CERT) - Not Ok"
    exit 1
fi

# Удаление временных файлов
rm -f cnf server.csr ca.srl ca.crt Secret_Key.txt Private_Key.txt Public_Key.txt

echo "Все операции завершены успешно!"
