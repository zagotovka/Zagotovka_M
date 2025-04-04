/*
 * setings.c
 *
 *  Created on: 29 мая 2023 г.
 *      Author: anton
 */

#include "db.h"
#include "fatfs.h"
#include "usb_host.h"
#include "cJSON.h"
#include <string.h>
#include <stdio.h>
#include "db.h"
#include "setings.h"
#include "multi_button.h"
#include "zagotovka.h"
#include "main.h"
#include "ds18b20Config.h"

//char fsbuffer[35000] = { 0 };//50500/35500 Размер fsbuffer он должен быть достаточным для хранения всего JSON-файла для GetPinConfig().
char currentChar; // Альтерантива fsbuffer! Считываем файлы "settings.ini", "cron.ini"  посимвольно и каждый символ сохраняем в currentChar.
#define JSON_BUF_SIZE 256// Для новой версии SetSetingsConfig()

extern osMessageQueueId_t mqttQueueHandle;
extern struct dbSettings SetSettings;
extern struct dbCron dbCrontxt[MAXSIZE];
extern struct dbPinsInfo PinsInfo[NUMPIN];
extern struct dbPinsConf PinsConf[NUMPIN];
extern struct dbPinToPin PinsLinks[NUMPINLINKS];
extern struct Button button[NUMPIN];
extern uint8_t mqttnum;
extern TIM_HandleTypeDef htim[NUMPIN];
extern ds18b20_pin_t ds18b20[MAX_DS18B20_P];
extern dht22_pin_t dht22[MAX_DHT22_P];

// Current state tracking
int pinindex = -1; //  Current pin index
int sensidx = -1; // Current sensor index
uint8_t typensor = 0; // Current Type Sensor
static int temp_id = -1; // Временное хранение ID до определения типа

// Функция включает тактирование на указанном порту.
int enablePort(char *portName) {

	switch (*portName) {
	case 'A':
		RCC->AHB1ENR |= RCC_AHB1ENR_GPIOAEN;
		break;
	case 'B':
		RCC->AHB1ENR |= RCC_AHB1ENR_GPIOBEN;
		break;
	case 'C':
		RCC->AHB1ENR |= RCC_AHB1ENR_GPIOCEN;
		break;
	case 'D':
		RCC->AHB1ENR |= RCC_AHB1ENR_GPIODEN;
		break;
	case 'E':
		RCC->AHB1ENR |= RCC_AHB1ENR_GPIOEEN;
		break;
	case 'F':
		RCC->AHB1ENR |= RCC_AHB1ENR_GPIOFEN;
		break;
	case 'G':
		RCC->AHB1ENR |= RCC_AHB1ENR_GPIOGEN;
		break;
	default:
		printf("Invalid port '%s'!\n", portName);
		return 0; // Вернем '0' если ошибка!
	}
	return 1;// Вернем '1' если все OK!
}

// Функция для проверки, включено ли тактирование порта
//void checkPortClockStatus(char *portName, int isClockEnabled) {
//    if (isClockEnabled) {
//        printf("port '%s' is ON!\n", portName);
//    } else {
//        printf("port '%s' is OFF!\n", portName);
//        enablePort(portName); // Подаем тактирование на не активный порт.
//        printf("port '%s' is ON!\n", portName);
//    }
//}
/*******************************************************************************************************************/

// Когда создаем новый "settings.ini" файл или когда сохраняем форму в файл "setings.ini"
void SetSettingsConfig() {
//    FRESULT fresult;
    UINT bytesWritten;
    char buffer[JSON_BUF_SIZE];

    if (f_open(&USBHFile, (const TCHAR*)"settings.ini", FA_CREATE_ALWAYS | FA_WRITE) != FR_OK) {
        return;
    }
    // Write opening bracket
    f_write(&USBHFile, "{", 1, &bytesWritten);
    // Helper function to write a field
    void writeField(const char* name, const char* format, ...) {
        va_list args;
        va_start(args, format);
        // Write field name
        snprintf(buffer, JSON_BUF_SIZE, "\"%s\":", name);
        f_write(&USBHFile, buffer, strlen(buffer), &bytesWritten);
        // Write field value
        vsnprintf(buffer, JSON_BUF_SIZE, format, args);
        f_write(&USBHFile, buffer, strlen(buffer), &bytesWritten);
        va_end(args);
        // Write comma
        f_write(&USBHFile, ",", 1, &bytesWritten);
    }
    // Write string fields
    writeField("adm_name", "\"%s\"", SetSettings.adm_name);
    writeField("adm_pswd", "\"%s\"", SetSettings.adm_pswd);
    writeField("token", "\"%s\"", SetSettings.token);
    writeField("lang", "\"%s\"", SetSettings.lang);

    writeField("numline", "%d", SetSettings.numline);
    writeField("timezone", "%f", SetSettings.timezone);
    writeField("lat_de", "%f", SetSettings.lat_de);
    writeField("lon_de", "%f", SetSettings.lon_de);
    writeField("onsunrise", "%hd", SetSettings.onsunrise);
    writeField("onsunset", "%hd", SetSettings.onsunset);

    if (strlen(SetSettings.dlength) > 0 && strlen(SetSettings.dlength) <= 6) {
        writeField("dlength", "\"%s\"", SetSettings.dlength);
    } else {
        writeField("dlength", "\"n/a\"");
    }
    writeField("sunrise", "\"%s\"", SetSettings.sunrise);
    writeField("sunset", "\"%s\"", SetSettings.sunset);
    writeField("srise_pins", "\"%s\"", SetSettings.srise_pins);
    writeField("sset_pins", "\"%s\"", SetSettings.sset_pins);

    writeField("ip1_sntp0", "%d", SetSettings.ip1_sntp0);
    writeField("ip1_sntp1", "%d", SetSettings.ip1_sntp1);
    writeField("ip1_sntp2", "%d", SetSettings.ip1_sntp2);
    writeField("ip1_sntp3", "%d", SetSettings.ip1_sntp3);

    writeField("ip2_sntp0", "%d", SetSettings.ip2_sntp0);
    writeField("ip2_sntp1", "%d", SetSettings.ip2_sntp1);
    writeField("ip2_sntp2", "%d", SetSettings.ip2_sntp2);
    writeField("ip2_sntp3", "%d", SetSettings.ip2_sntp3);

    writeField("ip3_sntp0", "%d", SetSettings.ip3_sntp0);
    writeField("ip3_sntp1", "%d", SetSettings.ip3_sntp1);
    writeField("ip3_sntp2", "%d", SetSettings.ip3_sntp2);
    writeField("ip3_sntp3", "%d", SetSettings.ip3_sntp3);

    writeField("check_mqtt", "%d", SetSettings.check_mqtt);
    writeField("mqtt_prt", "%d", SetSettings.mqtt_prt);
    writeField("mqtt_clt", "\"%s\"", SetSettings.mqtt_clt);
    writeField("mqtt_usr", "\"%s\"", SetSettings.mqtt_usr);
    writeField("mqtt_pswd", "\"%s\"", SetSettings.mqtt_pswd);
    writeField("txmqttop", "\"%s\"", SetSettings.txmqttop);
    writeField("rxmqttop", "\"%s\"", SetSettings.rxmqttop);

    writeField("mqtt_hst0", "%d", SetSettings.mqtt_hst0);
    writeField("mqtt_hst1", "%d", SetSettings.mqtt_hst1);
    writeField("mqtt_hst2", "%d", SetSettings.mqtt_hst2);
    writeField("mqtt_hst3", "%d", SetSettings.mqtt_hst3);

    writeField("check_ip", "%d", SetSettings.check_ip);
    writeField("ip_addr0", "%d", SetSettings.ip_addr0);
    writeField("ip_addr1", "%d", SetSettings.ip_addr1);
    writeField("ip_addr2", "%d", SetSettings.ip_addr2);
    writeField("ip_addr3", "%d", SetSettings.ip_addr3);

    writeField("sb_mask0", "%d", SetSettings.sb_mask0);
    writeField("sb_mask1", "%d", SetSettings.sb_mask1);
    writeField("sb_mask2", "%d", SetSettings.sb_mask2);
    writeField("sb_mask3", "%d", SetSettings.sb_mask3);

    writeField("gateway0", "%d", SetSettings.gateway0);
    writeField("gateway1", "%d", SetSettings.gateway1);
    writeField("gateway2", "%d", SetSettings.gateway2);
    writeField("gateway3", "%d", SetSettings.gateway3);

    writeField("sim800l", "%d", SetSettings.sim800l);

    writeField("sec", "%d", SetSettings.sec);
	writeField("min", "%d", SetSettings.min);
	writeField("hour", "%d", SetSettings.hour);
	writeField("mday", "%d", SetSettings.mday);
	writeField("mon", "%d", SetSettings.mon);
	writeField("year", "%d", SetSettings.year);
	writeField("usehttps", "%d", SetSettings.usehttps);

    snprintf(buffer, JSON_BUF_SIZE, "\"tel\":\"%s\"", SetSettings.tel);
//    printf("+++Real size of SetSettings: %u bytes & SetSettings.usehttps = %d\r\n", sizeof(struct dbSettings), SetSettings.usehttps);
    f_write(&USBHFile, buffer, strlen(buffer), &bytesWritten);
    // Write closing bracket
    f_write(&USBHFile, "}", 1, &bytesWritten);
    // Close file
    f_close(&USBHFile);
}
// Первый запуск если "settings.ini" не существует, создаем его и записываем данные.
void StartSettingsConfig() {
    UINT bytesWritten;
    char buffer[JSON_BUF_SIZE];

    if (f_open(&USBHFile, (const TCHAR*)"settings.ini", FA_CREATE_ALWAYS | FA_WRITE) != FR_OK) {
        return;
    }

    // Write opening bracket
    f_write(&USBHFile, "{", 1, &bytesWritten);

    // Helper function to write a field
    void writeField(const char* name, const char* format, ...) {
        va_list args;
        va_start(args, format);
        // Write field name
        snprintf(buffer, JSON_BUF_SIZE, "\"%s\":", name);
        f_write(&USBHFile, buffer, strlen(buffer), &bytesWritten);
        // Write field value
        vsnprintf(buffer, JSON_BUF_SIZE, format, args);
        f_write(&USBHFile, buffer, strlen(buffer), &bytesWritten);
        va_end(args);
        // Write comma
        f_write(&USBHFile, ",", 1, &bytesWritten);
    }

    // Write default string fields
    writeField("adm_name", "\"%s\"", ADM_NAME);
    writeField("adm_pswd", "\"%s\"", ADM_PASS);
    writeField("token", "\"\"");
    writeField("lang", "\"%s\"", LANG);

    // Write numeric fields
    writeField("timezone", "%d", TIMEZONE);
    writeField("lon_de", "%d", 0);
    writeField("lat_de", "%d", 0);

    // Write empty string fields
    writeField("sunrise", "\"\"");
    writeField("sunset", "\"\"");
    writeField("srise_pins", "\"\"");
    writeField("sset_pins", "\"\"");
    writeField("dlength", "\"\"");

    // Write additional boolean fields
    writeField("onsunrise", "%d", 0);
    writeField("onsunset", "%d", 0);

    // Write SNTP IP addresses
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 4; j++) {
            writeField("ip%d_sntp%d", "%d", i + 1, j, 0);
        }
    }

    // Write MQTT settings
    writeField("check_mqtt", "%d", CHECK_MQTT);
    writeField("mqtt_prt", "%d", MQTT_PRT);
    writeField("mqtt_qos", "%d", MQTT_QOS);
    writeField("mqtt_clt", "\"\"");
    writeField("mqtt_usr", "\"\"");
    writeField("mqtt_pswd", "\"\"");
    writeField("txmqttop", "\"%s\"", MQTT_TPC);
    writeField("rxmqttop", "\"\"");

    // Write MQTT host
    for (int i = 0; i < 4; i++) {
        writeField("mqtt_hst%d", "%d", i, 0);
    }

    // Write IP settings
    writeField("check_ip", "%d", CHECK_IP);

//    // Write IP address
//    writeField("ip_addr0", "%d", IP_ADDR0);
//    writeField("ip_addr1", "%d", IP_ADDR1);
//    writeField("ip_addr2", "%d", IP_ADDR2);
//    writeField("ip_addr3", "%d", IP_ADDR3);
//
//    // Write subnet mask
//    writeField("sb_mask0", "%d", SB_MASK0);
//    writeField("sb_mask1", "%d", SB_MASK1);
//    writeField("sb_mask2", "%d", SB_MASK2);
//    writeField("sb_mask3", "%d", SB_MASK3);
//
//    // Write gateway
//    writeField("gateway0", "%d", GATEWAY0);
//    writeField("gateway1", "%d", GATEWAY1);
//    writeField("gateway2", "%d", GATEWAY2);
//    writeField("gateway3", "%d", GATEWAY3);

    // Write MAC address (last field, no comma needed for the last one)
    for (int i = 0; i < 5; i++) {
        writeField("macaddr%d", "%d", i, 0);
    }
    // Write the last MAC address field without comma
    snprintf(buffer, JSON_BUF_SIZE, "\"macaddr5\":%d", 0);
    f_write(&USBHFile, buffer, strlen(buffer), &bytesWritten);

    // Write closing bracket
    f_write(&USBHFile, "}", 1, &bytesWritten);

    // Close file
    f_close(&USBHFile);

    // Copy default values to SetSettings structure
    strcpy(SetSettings.lang, LANG);
    strcpy(SetSettings.adm_name, ADM_NAME);
    strcpy(SetSettings.adm_pswd, ADM_PASS);
    SetSettings.timezone = TIMEZONE;
    SetSettings.check_ip = CHECK_IP;
    SetSettings.check_mqtt = CHECK_MQTT;
//    SetSettings.ip_addr0 = IP_ADDR0;
//    SetSettings.ip_addr1 = IP_ADDR1;
//    SetSettings.ip_addr2 = IP_ADDR2;
//    SetSettings.ip_addr3 = IP_ADDR3;
//    SetSettings.sb_mask0 = SB_MASK0;
//    SetSettings.sb_mask1 = SB_MASK1;
//    SetSettings.sb_mask2 = SB_MASK2;
//    SetSettings.sb_mask3 = SB_MASK3;
//    SetSettings.gateway0 = GATEWAY0;
//    SetSettings.gateway1 = GATEWAY1;
//    SetSettings.gateway2 = GATEWAY2;
//    SetSettings.gateway3 = GATEWAY3;
    SetSettings.mqtt_prt = MQTT_PRT;
    SetSettings.usehttps = CHECK_USEHTTPS;
//    SetSettings.mqtt_qos = MQTT_QOS;
}
// Если "settings.ini" существует, открываем его...
void GetSettingsConfig() {
	FILINFO finfo;
	FRESULT fresult;
	UINT bytesRead;
	char key[64] = { 0 };
	char value[64] = { 0 };
	size_t keyPos = 0, valuePos = 0;
	bool inString = false;
	bool isKey = true;
//	bool startValue = false;
//	printf("\r\n=== Starting GetSetingsConfig() ===\r\n");
	fresult = f_stat("settings.ini", &finfo);
	if (fresult != FR_OK) {
		printf("ERROR: settings.ini file not found!\r\n");
		return;
	}
	printf("settings.ini has size: %lu bytes\r\n", finfo.fsize);
	if (f_open(&USBHFile, "settings.ini", FA_READ) != FR_OK) {
		printf("ERROR: Cannot open settings.ini!\r\n");
		return;
	}
//	printf("File opened successfully\r\n");
	memset(&SetSettings, 0, sizeof(SetSettings));// обнуляем структуру

	while ((fresult = f_read(&USBHFile, &currentChar, 1, &bytesRead)) == FR_OK && bytesRead > 0) {
	    if (currentChar == '"') {
	        inString = !inString; // Переключаем состояние внутри строки
	        if (!inString) { // Выход из строки
	            if (isKey) {
	                key[keyPos] = '\0';
	                isKey = false;
	                valuePos = 0;
	            } else {
	                value[valuePos] = '\0';
	                goto process_key_value;
	            }
	        }
	        continue;
	    }
	    if (currentChar == ':' && !inString) {
	        if (!isKey) { // Если это числовое значение
	            valuePos = 0;
	        }
	        continue;
	    }
	    // Обработка числовых значений
	    if (!inString && !isKey && (currentChar == ',' || currentChar == '\n' || currentChar == '}')) {
	        if (valuePos > 0) {
	            value[valuePos] = '\0';
	            goto process_key_value;
	        }
	        continue;
	    }
	    // Пропускаем пробельные символы вне строк
	    if (!inString && (currentChar == ' ' || currentChar == '\t' || currentChar == '\r')) {
	        continue;
	    }
	    // Записываем символы
	    if (inString || (!inString && !isKey && (isdigit(currentChar) || currentChar == '-' || currentChar == '.'))) {
	        if (isKey) {
	            key[keyPos++] = currentChar;
	        } else {
	            value[valuePos++] = currentChar;
	        }
	    }
	    continue;

		process_key_value:
		// Очистка пробелов в начале и конце ключа
		char *trimmed_key = key;
		while (*trimmed_key == ' ')
			trimmed_key++;
		char *end = trimmed_key + strlen(trimmed_key) - 1;
		while (end > trimmed_key && *end == ' ')
			end--;
		*(end + 1) = '\0';
		// Обработка пары ключ-значение для строковых значений
		if (strcmp(key, "adm_name") == 0) {
			strncpy(SetSettings.adm_name, value, sizeof(SetSettings.adm_name) - 1);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "adm_pswd") == 0) {
			strncpy(SetSettings.adm_pswd, value, sizeof(SetSettings.adm_pswd) - 1);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "token") == 0) {
			strncpy(SetSettings.token, value, sizeof(SetSettings.token) - 1);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "lang") == 0) {
			strncpy(SetSettings.lang, value, sizeof(SetSettings.lang) - 1);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "dlength") == 0) {
			strncpy(SetSettings.dlength, value, sizeof(SetSettings.dlength) - 1);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "sunrise") == 0) {
			strncpy(SetSettings.sunrise, value, sizeof(SetSettings.sunrise) - 1);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "sunset") == 0) {
			strncpy(SetSettings.sunset, value, sizeof(SetSettings.sunset) - 1);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "srise_pins") == 0) {
			strncpy(SetSettings.srise_pins, value, sizeof(SetSettings.srise_pins) - 1);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "sset_pins") == 0) {
			strncpy(SetSettings.sset_pins, value, sizeof(SetSettings.sset_pins) - 1);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "mqtt_clt") == 0) {
			strncpy(SetSettings.mqtt_clt, value, sizeof(SetSettings.mqtt_clt) - 1);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "mqtt_usr") == 0) {
			strncpy(SetSettings.mqtt_usr, value, sizeof(SetSettings.mqtt_usr) - 1);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "mqtt_pswd") == 0) {
			strncpy(SetSettings.mqtt_pswd, value, sizeof(SetSettings.mqtt_pswd) - 1);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "txmqttop") == 0) {
			strncpy(SetSettings.txmqttop, value, sizeof(SetSettings.txmqttop) - 1);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "rxmqttop") == 0) {
			strncpy(SetSettings.rxmqttop, value, sizeof(SetSettings.rxmqttop) - 1);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "tel") == 0) {
			strncpy(SetSettings.tel, value, sizeof(SetSettings.tel) - 1);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "fullmoon") == 0) {
			strncpy(SetSettings.fullmoon, value, sizeof(SetSettings.fullmoon) - 1);
//			printf("Found key: %s, value: %s\r\n", key, value);
		}
		// Обработка пары ключ-значение для числовых значений
		if (strcmp(key, "numline") == 0) {
			SetSettings.numline = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "timezone") == 0) {
			SetSettings.timezone = atof(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "lat_de") == 0) {
			SetSettings.lat_de = atof(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "lon_de") == 0) {
			SetSettings.lon_de = atof(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "check_mqtt") == 0) {
			SetSettings.check_mqtt = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "mqtt_prt") == 0) {
			SetSettings.mqtt_prt = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "check_ip") == 0) {
			SetSettings.check_ip = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "sim800l") == 0) {
			SetSettings.sim800l = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		}  else if (strcmp(key, "sec") == 0) {
		    SetSettings.sec = atoi(value);
//		    printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "min") == 0) {
		    SetSettings.min = atoi(value);
//		    printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "hour") == 0) {
		    SetSettings.hour = atoi(value);
//		    printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "mday") == 0) {
		    SetSettings.mday = atoi(value);
//		    printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "mon") == 0) {
		    SetSettings.mon = atoi(value);
//		    printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "year") == 0) {
		    SetSettings.year = atoi(value);
//		    printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "ip_addr0") == 0) {
			SetSettings.ip_addr0 = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "ip_addr1") == 0) {
			SetSettings.ip_addr1 = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "ip_addr2") == 0) {
			SetSettings.ip_addr2 = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "ip_addr3") == 0) {
			SetSettings.ip_addr3 = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "sb_mask0") == 0) {
			SetSettings.sb_mask0 = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "sb_mask1") == 0) {
			SetSettings.sb_mask1 = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "sb_mask2") == 0) {
			SetSettings.sb_mask2 = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "sb_mask3") == 0) {
			SetSettings.sb_mask3 = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "gateway0") == 0) {
			SetSettings.gateway0 = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "gateway1") == 0) {
			SetSettings.gateway1 = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "gateway2") == 0) {
			SetSettings.gateway2 = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "gateway3") == 0) {
			SetSettings.gateway3 = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "mqtt_hst0") == 0) {
			SetSettings.mqtt_hst0 = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "mqtt_hst1") == 0) {
			SetSettings.mqtt_hst1 = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "mqtt_hst2") == 0) {
			SetSettings.mqtt_hst2 = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "mqtt_hst3") == 0) {
			SetSettings.mqtt_hst3 = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "onsunrise") == 0) {
			SetSettings.onsunrise = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "onsunset") == 0) {
			SetSettings.onsunset = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "monflg") == 0) {
			SetSettings.monflg = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "ip1_sntp0") == 0) {
			SetSettings.ip1_sntp0 = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "ip1_sntp1") == 0) {
			SetSettings.ip1_sntp1 = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "ip1_sntp2") == 0) {
			SetSettings.ip1_sntp2 = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "ip1_sntp3") == 0) {
			SetSettings.ip1_sntp3 = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "ip2_sntp0") == 0) {
			SetSettings.ip2_sntp0 = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "ip2_sntp1") == 0) {
			SetSettings.ip2_sntp1 = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "ip2_sntp2") == 0) {
			SetSettings.ip2_sntp2 = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "ip2_sntp3") == 0) {
			SetSettings.ip2_sntp3 = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "ip3_sntp0") == 0) {
			SetSettings.ip3_sntp0 = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "ip3_sntp1") == 0) {
			SetSettings.ip3_sntp1 = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "ip3_sntp2") == 0) {
			SetSettings.ip3_sntp2 = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "ip3_sntp3") == 0) {
			SetSettings.ip3_sntp3 = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		} else if (strcmp(key, "usehttps") == 0) {
			SetSettings.usehttps = atoi(value);
//			printf("Found key: %s, value: %s\r\n", key, value);
		}
		keyPos = 0;
		valuePos = 0;
		isKey = true;
//		startValue = false;
	}

	if (fresult != FR_OK) {
		printf("ERROR: Read failed!\r\n");
	}

	f_close(&USBHFile);
//	printf("File closed\r\n");
//	printf("=== GetSetingsConfig() complete ===\r\n");
}

// Если файл "cron.ini" существует, открываем для чтения.
void GetCronConfig() {
	FILINFO finfo;
	FRESULT fresult;
	UINT bytesRead;
	char key[64] = { 0 };
	char value[256] = { 0 };
	size_t keyPos = 0, valuePos = 0;
	bool inString = false;
	bool isKey = true;
	int currentIndex = 0;
	bool recordComplete = false;
//    printf("Starting GetCronConfig()\r\n");
	fresult = f_stat("cron.ini", &finfo);
	if (fresult != FR_OK) {
		printf("ERROR: cron.ini file not found!\r\n");
		return;
	}
//    printf("File size: %lu bytes\r\n", finfo.fsize);
	if (f_open(&USBHFile, "cron.ini", FA_READ) != FR_OK) {
		printf("ERROR: Cannot open cron.ini!\r\n");
		return;
	}
//    printf("File opened successfully\r\n");
	memset(dbCrontxt, 0, sizeof(dbCrontxt));
//    printf("Memory cleared\r\n");

	while ((fresult = f_read(&USBHFile, &currentChar, 1, &bytesRead)) == FR_OK && bytesRead > 0 && currentIndex < MAXSIZE) {
		if (currentChar == '"') {
			inString = !inString;
			if (!inString) {
				if (isKey) {
					key[keyPos] = '\0';
					isKey = false;
					valuePos = 0;
				} else {
					value[valuePos] = '\0';
					goto process_key_value;
				}
			}
			continue;
		}
		if (currentChar == ':' && !inString) {
			if (!isKey) {
				valuePos = 0;
			}
			continue;
		}
		if (!inString && !isKey && (currentChar == ',' || currentChar == '\n' || currentChar == '}' || currentChar == ']')) {
			if (valuePos > 0) {
				value[valuePos] = '\0';
				goto process_key_value;
			}
			if (currentChar == '}') {
				recordComplete = true;
			}
			continue;
		}
		if (!inString && (currentChar == ' ' || currentChar == '\t' || currentChar == '\r' || currentChar == '{' || currentChar == '[')) {
			continue;
		}
		if (inString) {
			if (isKey && keyPos < sizeof(key) - 1) {
				key[keyPos++] = currentChar;
			} else if (!isKey && valuePos < sizeof(value) - 1) {
				value[valuePos++] = currentChar;
			}
		} else if (!inString && !isKey && (isdigit(currentChar) || currentChar == '-' || currentChar == '.')) {
			if (valuePos < sizeof(value) - 1) {
				value[valuePos++] = currentChar;
			}
		}
		continue;
		process_key_value: char *trimmed_key = key;
		while (*trimmed_key == ' ')
			trimmed_key++;
		char *end = trimmed_key + strlen(trimmed_key) - 1;
		while (end > trimmed_key && *end == ' ')
			end--;
		*(end + 1) = '\0';
		if (strcmp(trimmed_key, "info") == 0) {
			strncpy(dbCrontxt[currentIndex].info, value, sizeof(dbCrontxt[currentIndex].info) - 1);
			recordComplete = true;
		} else if (strcmp(trimmed_key, "cron") == 0) {
			strncpy(dbCrontxt[currentIndex].cron, value, sizeof(dbCrontxt[currentIndex].cron) - 1);
		} else if (strcmp(trimmed_key, "activ") == 0) {
			strncpy(dbCrontxt[currentIndex].activ, value, sizeof(dbCrontxt[currentIndex].activ) - 1);
		} else if (strcmp(trimmed_key, "ptime") == 0) {
			dbCrontxt[currentIndex].ptime = atoi(value);
		} else if (strcmp(trimmed_key, "onoff") == 0) {
			dbCrontxt[currentIndex].onoff = atoi(value);
		}

		if (recordComplete && currentIndex == 0) {
//            printf("\r\n=== First Record Content ===\r\n");
//            printf("cron: '%s'\r\n", dbCrontxt[0].cron);
//            printf("activ: '%s'\r\n", dbCrontxt[0].activ);
//            printf("ptime: %lu\r\n", dbCrontxt[0].ptime);
//            printf("info: '%s'\r\n", dbCrontxt[0].info);
//            printf("onoff: %d\r\n", dbCrontxt[0].onoff);
//            printf("=========================\r\n\r\n");
		}
		if (recordComplete) {
			currentIndex++;
			recordComplete = false;
		}
		keyPos = 0;
		valuePos = 0;
		isKey = true;
	}
//    printf("Read finished with result: %d\r\n", fresult);
	if (fresult != FR_OK) {
		printf("ERROR: Read failed with code: %d\r\n", fresult);
	}
//    printf("Processed %d records\r\n", currentIndex);
	f_close(&USBHFile);
//    printf("File closed\r\n");
}


// Создаем всегда новый файл "cron.ini" и записываем данные
void SetCronConfig() {
    UINT bytesWritten;
    char buffer[JSON_BUF_SIZE];

    if (f_open(&USBHFile, (const TCHAR*)"cron.ini", FA_CREATE_ALWAYS | FA_WRITE) != FR_OK) {
        return;
    }
    f_write(&USBHFile, "[", 1, &bytesWritten);// Write opening bracket for array
    // Helper function to write a JSON object field
    void writeField(const char* name, const char* format, ...) {
        va_list args;
        va_start(args, format);
        snprintf(buffer, JSON_BUF_SIZE, "\"%s\":", name); // Write field name
        f_write(&USBHFile, buffer, strlen(buffer), &bytesWritten);
        // Write field value
        vsnprintf(buffer, JSON_BUF_SIZE, format, args);
        f_write(&USBHFile, buffer, strlen(buffer), &bytesWritten);
        va_end(args);
        f_write(&USBHFile, ",", 1, &bytesWritten);// Write comma
    }
    for (int i = 0; i < MAXSIZE; i++) {
        f_write(&USBHFile, "{", 1, &bytesWritten);// Write opening bracket for object
        writeField("cron", "\"%s\"", dbCrontxt[i].cron);
        writeField("activ", "\"%s\"", dbCrontxt[i].activ);
        writeField("ptime", "%d", 0);
        writeField("onoff", "%d", dbCrontxt[i].onoff);
        f_write(&USBHFile, ",", 1, &bytesWritten);
        snprintf(buffer, JSON_BUF_SIZE, "\"info\":\"%s\"", dbCrontxt[i].info);
        f_write(&USBHFile, buffer, strlen(buffer), &bytesWritten);
        // Write closing bracket for object
        if (i < MAXSIZE - 1) {
            f_write(&USBHFile, "},", 2, &bytesWritten); // Add comma if not last object
        } else {
            f_write(&USBHFile, "}", 1, &bytesWritten); // No comma for last object
        }
    }
    f_write(&USBHFile, "]", 1, &bytesWritten);    // Write closing bracket for array
    f_close(&USBHFile);
}

void GetPinConfig() {
    UINT bytesRead;
    char key[32] = {0};
    char value[64] = {0};
    int keyIndex = 0;
    int valueIndex = 0;
    int currentPin = 0;
    bool inObject = false;
    bool inQuotes = false;
    bool readingValue = false;

    if (f_open(&USBHFile, "pins.ini", FA_READ) != FR_OK) {
        return;
    }

    // Find first '['
    do {
        f_read(&USBHFile, &currentChar, 1, &bytesRead);
        if (bytesRead == 0) {
            f_close(&USBHFile);
            return;
        }
    } while (currentChar != '[');

    while (currentPin < NUMPIN) {
        f_read(&USBHFile, &currentChar, 1, &bytesRead);
        if (bytesRead == 0) break;

        // Handle object boundaries
        if (currentChar == '{') {
            inObject = true;
            continue;
        }
        if (currentChar == '}') {
            // Обработка последней пары ключ-значение для текущего пина
            if (keyIndex > 0 && valueIndex > 0) {
                key[keyIndex] = '\0';
                value[valueIndex] = '\0';

                // Remove quotes from key
                if (key[0] == '"') {
                    memmove(key, key + 1, strlen(key));
                    key[strlen(key) - 1] = '\0';
                }

                // Встроенная обработка пар ключ-значение
                if (strcmp(key, "topin") == 0) {
                    PinsConf[currentPin].topin = atoi(value);
//                    printf("Processing pin with topin=%d at index %d\n", PinsConf[currentPin].topin, currentPin);
                }
                else if (strcmp(key, "pwm") == 0) PinsConf[currentPin].pwm = atoi(value);
                else if (strcmp(key, "on") == 0) PinsConf[currentPin].on = atoi(value);
                else if (strcmp(key, "istate") == 0) PinsConf[currentPin].istate = atoi(value);
                else if (strcmp(key, "dvalue") == 0) PinsConf[currentPin].dvalue = atoi(value);
                else if (strcmp(key, "ponr") == 0) PinsConf[currentPin].ponr = atoi(value);
                else if (strcmp(key, "ptype") == 0) PinsConf[currentPin].ptype = atoi(value);
                else if (strcmp(key, "encoderb") == 0) PinsConf[currentPin].encoderb = atoi(value);
                else if (strcmp(key, "encbpin") == 0) strncpy(PinsConf[currentPin].encbpin, value + 1, sizeof(PinsConf[currentPin].encbpin) - 1);
                else if (strcmp(key, "hinter") == 0) PinsConf[currentPin].hinter = atoi(value);
                else if (strcmp(key, "repeat") == 0) PinsConf[currentPin].repeat = atoi(value);
                else if (strcmp(key, "rinter") == 0) PinsConf[currentPin].rinter = atoi(value);
                else if (strcmp(key, "dcinter") == 0) PinsConf[currentPin].dcinter = atoi(value);
                else if (strcmp(key, "sclick") == 0) strncpy(PinsConf[currentPin].sclick, value, sizeof(PinsConf[currentPin].sclick) - 1);
                else if (strcmp(key, "dclick") == 0) strncpy(PinsConf[currentPin].dclick, value, sizeof(PinsConf[currentPin].dclick) - 1);
                else if (strcmp(key, "lpress") == 0) strncpy(PinsConf[currentPin].lpress, value, sizeof(PinsConf[currentPin].lpress) - 1);
                else if (strcmp(key, "pclick") == 0) PinsConf[currentPin].pclick = atoi(value);
                else if (strcmp(key, "info") == 0) strncpy(PinsConf[currentPin].info, value, sizeof(PinsConf[currentPin].info) - 1);
                else if (strcmp(key, "onoff") == 0) PinsConf[currentPin].onoff = atoi(value);
                else if (strcmp(key, "event") == 0) PinsConf[currentPin].event = atoi(value);
                else if (strcmp(key, "act") == 0) PinsConf[currentPin].act = atoi(value);
                else if (strcmp(key, "parametr") == 0) PinsConf[currentPin].parametr = atoi(value);
                else if (strcmp(key, "timeout") == 0) PinsConf[currentPin].timeout = atoi(value);
                else if (strcmp(key, "send_sms") == 0) {
                    if (strlen(value) >= sizeof(PinsConf[currentPin].send_sms)) {
                        printf("WARNING: send_sms value too long!\n");
                    }
                    strncpy(PinsConf[currentPin].send_sms, value, sizeof(PinsConf[currentPin].send_sms) - 1);
                    PinsConf[currentPin].send_sms[sizeof(PinsConf[currentPin].send_sms) - 1] = '\0';
                }
            }
//            printf("Finished processing pin at index %d\n", currentPin);
            inObject = false;
            currentPin++;
            keyIndex = 0;
            valueIndex = 0;
            readingValue = false;
            memset(key, 0, sizeof(key));
            memset(value, 0, sizeof(value));
            continue;
        }

        // Skip whitespace outside of quotes
        if (!inQuotes && (currentChar == ' ' || currentChar == '\t' || currentChar == '\n' || currentChar == '\r')) {
            continue;
        }

        // Handle quotes
        if (currentChar == '"') {
            inQuotes = !inQuotes;
            continue;
        }

        // Handle key-value separator
        if (currentChar == ':' && !inQuotes) {
            readingValue = true;
            continue;
        }

        // Handle end of value
        if (currentChar == ',' && !inQuotes) {
            // Process the key-value pair
            if (keyIndex > 0 && valueIndex > 0) {
                key[keyIndex] = '\0';
                value[valueIndex] = '\0';

                // Remove quotes from key
                if (key[0] == '"') {
                    memmove(key, key + 1, strlen(key));
                    key[strlen(key) - 1] = '\0';
                }

                // Встроенная обработка пар ключ-значение
                if (strcmp(key, "topin") == 0) {
                    PinsConf[currentPin].topin = atoi(value);
//                    printf("Processing pin with topin=%d at index %d\n", PinsConf[currentPin].topin, currentPin);
                }
                else if (strcmp(key, "pwm") == 0) PinsConf[currentPin].pwm = atoi(value);
                else if (strcmp(key, "on") == 0) PinsConf[currentPin].on = atoi(value);
                else if (strcmp(key, "istate") == 0) PinsConf[currentPin].istate = atoi(value);
                else if (strcmp(key, "dvalue") == 0) PinsConf[currentPin].dvalue = atoi(value);
                else if (strcmp(key, "ponr") == 0) PinsConf[currentPin].ponr = atoi(value);
                else if (strcmp(key, "ptype") == 0) PinsConf[currentPin].ptype = atoi(value);
                else if (strcmp(key, "encoderb") == 0) PinsConf[currentPin].encoderb = atoi(value);
                else if (strcmp(key, "encbpin") == 0) strncpy(PinsConf[currentPin].encbpin, value + 1, sizeof(PinsConf[currentPin].encbpin) - 1);
                else if (strcmp(key, "hinter") == 0) PinsConf[currentPin].hinter = atoi(value);
                else if (strcmp(key, "repeat") == 0) PinsConf[currentPin].repeat = atoi(value);
                else if (strcmp(key, "rinter") == 0) PinsConf[currentPin].rinter = atoi(value);
                else if (strcmp(key, "dcinter") == 0) PinsConf[currentPin].dcinter = atoi(value);
                else if (strcmp(key, "sclick") == 0) strncpy(PinsConf[currentPin].sclick, value, sizeof(PinsConf[currentPin].sclick) - 1);
                else if (strcmp(key, "dclick") == 0) strncpy(PinsConf[currentPin].dclick, value, sizeof(PinsConf[currentPin].dclick) - 1);
                else if (strcmp(key, "lpress") == 0) strncpy(PinsConf[currentPin].lpress, value, sizeof(PinsConf[currentPin].lpress) - 1);
                else if (strcmp(key, "pclick") == 0) PinsConf[currentPin].pclick = atoi(value);
                else if (strcmp(key, "info") == 0) strncpy(PinsConf[currentPin].info, value, sizeof(PinsConf[currentPin].info) - 1);
                else if (strcmp(key, "onoff") == 0) PinsConf[currentPin].onoff = atoi(value);
                else if (strcmp(key, "event") == 0) PinsConf[currentPin].event = atoi(value);
                else if (strcmp(key, "act") == 0) PinsConf[currentPin].act = atoi(value);
                else if (strcmp(key, "parametr") == 0) PinsConf[currentPin].parametr = atoi(value);
                else if (strcmp(key, "timeout") == 0) PinsConf[currentPin].timeout = atoi(value);
                else if (strcmp(key, "send_sms") == 0) {
                    if (strlen(value) >= sizeof(PinsConf[currentPin].send_sms)) {
                        printf("WARNING: send_sms value too long!\n");
                    }
                    strncpy(PinsConf[currentPin].send_sms, value, sizeof(PinsConf[currentPin].send_sms) - 1);
                    PinsConf[currentPin].send_sms[sizeof(PinsConf[currentPin].send_sms) - 1] = '\0';
                }
            }
            keyIndex = 0;
            valueIndex = 0;
            readingValue = false;
            memset(key, 0, sizeof(key));
            memset(value, 0, sizeof(value));
            continue;
        }

        // Store character in appropriate buffer
        if (inObject) {
            if (!readingValue && keyIndex < sizeof(key) - 1) {
                key[keyIndex++] = currentChar;
            } else if (readingValue && valueIndex < sizeof(value) - 1) {
                value[valueIndex++] = currentChar;
            }
        }
    }
    f_close(&USBHFile);
}

void SetPinConfig() {
    FRESULT fresult;
    UINT Byteswritten = 0;
    char buffer[JSON_BUF_SIZE];//Было 256!

    fresult = f_open(&USBHFile, "pins.ini", FA_CREATE_ALWAYS | FA_WRITE);
    if (fresult != FR_OK) {
        printf("Failed to open file: %d\n", fresult);
        return;
    }
    fresult = f_write(&USBHFile, "[", 1, &Byteswritten);
    if (fresult != FR_OK) {
        printf("Failed to write '[': %d\n", fresult);
        f_close(&USBHFile);
        return;
    }
    for (int i = 0; i < NUMPIN; i++) {
        // Начало объекта пина
        fresult = f_write(&USBHFile, "{", 1, &Byteswritten);
        if (fresult != FR_OK) {
            printf("Failed to write '{': %d\n", fresult);
            f_close(&USBHFile);
            return;
        }
        snprintf(buffer, sizeof(buffer), "\"topin\":%d", PinsConf[i].topin);
        fresult = f_write(&USBHFile, buffer, strlen(buffer), &Byteswritten);
        if (fresult != FR_OK) {
            printf("Failed to write 'topin': %d\n", fresult);
            f_close(&USBHFile);
            return;
        }
        snprintf(buffer, sizeof(buffer), ",\"pwm\":%d", PinsConf[i].pwm);
        fresult = f_write(&USBHFile, buffer, strlen(buffer), &Byteswritten);
        if (fresult != FR_OK) {
            printf("Failed to write 'pwm': %d\n", fresult);
            f_close(&USBHFile);
            return;
        }
        snprintf(buffer, sizeof(buffer), ",\"on\":%d", PinsConf[i].on);
        fresult = f_write(&USBHFile, buffer, strlen(buffer), &Byteswritten);
        if (fresult != FR_OK) {
            printf("Failed to write 'on': %d\n", fresult);
            f_close(&USBHFile);
            return;
        }
        snprintf(buffer, sizeof(buffer), ",\"istate\":%d", PinsConf[i].istate);
        fresult = f_write(&USBHFile, buffer, strlen(buffer), &Byteswritten);
        if (fresult != FR_OK) {
            printf("Failed to write 'istate': %d\n", fresult);
            f_close(&USBHFile);
            return;
        }
        snprintf(buffer, sizeof(buffer), ",\"dvalue\":%d", PinsConf[i].dvalue);
        fresult = f_write(&USBHFile, buffer, strlen(buffer), &Byteswritten);
        if (fresult != FR_OK) {
            printf("Failed to write 'dvalue': %d\n", fresult);
            f_close(&USBHFile);
            return;
        }
        snprintf(buffer, sizeof(buffer), ",\"ponr\":%d", PinsConf[i].ponr);
        fresult = f_write(&USBHFile, buffer, strlen(buffer), &Byteswritten);
        if (fresult != FR_OK) {
            printf("Failed to write 'ponr': %d\n", fresult);
            f_close(&USBHFile);
            return;
        }
        snprintf(buffer, sizeof(buffer), ",\"ptype\":%d", PinsConf[i].ptype);
        fresult = f_write(&USBHFile, buffer, strlen(buffer), &Byteswritten);
        if (fresult != FR_OK) {
            printf("Failed to write 'ptype': %d\n", fresult);
            f_close(&USBHFile);
            return;
        }
        snprintf(buffer, sizeof(buffer), ",\"encoderb\":%d", PinsConf[i].encoderb);
        fresult = f_write(&USBHFile, buffer, strlen(buffer), &Byteswritten);
        if (fresult != FR_OK) {
            printf("Failed to write 'encoderb': %d\n", fresult);
            f_close(&USBHFile);
            return;
        }
        snprintf(buffer, sizeof(buffer), ",\"encbpin\":\"%s\"", PinsConf[i].encbpin);
        fresult = f_write(&USBHFile, buffer, strlen(buffer), &Byteswritten);
        if (fresult != FR_OK) {
            printf("Failed to write 'encbpin': %d\n", fresult);
            f_close(&USBHFile);
            return;
        }
        snprintf(buffer, sizeof(buffer), ",\"hinter\":%d", PinsConf[i].hinter);
        fresult = f_write(&USBHFile, buffer, strlen(buffer), &Byteswritten);
        if (fresult != FR_OK) {
            printf("Failed to write 'hinter': %d\n", fresult);
            f_close(&USBHFile);
            return;
        }
        snprintf(buffer, sizeof(buffer), ",\"repeat\":%d", PinsConf[i].repeat);
        fresult = f_write(&USBHFile, buffer, strlen(buffer), &Byteswritten);
        if (fresult != FR_OK) {
            printf("Failed to write 'repeat': %d\n", fresult);
            f_close(&USBHFile);
            return;
        }
        snprintf(buffer, sizeof(buffer), ",\"rinter\":%d", PinsConf[i].rinter);
        fresult = f_write(&USBHFile, buffer, strlen(buffer), &Byteswritten);
        if (fresult != FR_OK) {
            printf("Failed to write 'rinter': %d\n", fresult);
            f_close(&USBHFile);
            return;
        }
        snprintf(buffer, sizeof(buffer), ",\"dcinter\":%d", PinsConf[i].dcinter);
        fresult = f_write(&USBHFile, buffer, strlen(buffer), &Byteswritten);
        if (fresult != FR_OK) {
            printf("Failed to write 'dcinter': %d\n", fresult);
            f_close(&USBHFile);
            return;
        }
        snprintf(buffer, sizeof(buffer), ",\"pclick\":%d", PinsConf[i].pclick);
        fresult = f_write(&USBHFile, buffer, strlen(buffer), &Byteswritten);
        if (fresult != FR_OK) {
            printf("Failed to write 'pclick': %d\n", fresult);
            f_close(&USBHFile);
            return;
        }
        snprintf(buffer, sizeof(buffer), ",\"sclick\":\"%s\"", PinsConf[i].sclick);
        fresult = f_write(&USBHFile, buffer, strlen(buffer), &Byteswritten);
        if (fresult != FR_OK) {
            printf("Failed to write 'sclick': %d\n", fresult);
            f_close(&USBHFile);
            return;
        }
        snprintf(buffer, sizeof(buffer), ",\"dclick\":\"%s\"", PinsConf[i].dclick);
        fresult = f_write(&USBHFile, buffer, strlen(buffer), &Byteswritten);
        if (fresult != FR_OK) {
            printf("Failed to write 'dclick': %d\n", fresult);
            f_close(&USBHFile);
            return;
        }
        snprintf(buffer, sizeof(buffer), ",\"lpress\":\"%s\"", PinsConf[i].lpress);
        fresult = f_write(&USBHFile, buffer, strlen(buffer), &Byteswritten);
        if (fresult != FR_OK) {
            printf("Failed to write 'lpress': %d\n", fresult);
            f_close(&USBHFile);
            return;
        }
        snprintf(buffer, sizeof(buffer), ",\"info\":\"%s\"", PinsConf[i].info);
        fresult = f_write(&USBHFile, buffer, strlen(buffer), &Byteswritten);
        if (fresult != FR_OK) {
            printf("Failed to write 'info': %d\n", fresult);
            f_close(&USBHFile);
            return;
        }
        snprintf(buffer, sizeof(buffer), ",\"onoff\":%d", PinsConf[i].onoff);
        fresult = f_write(&USBHFile, buffer, strlen(buffer), &Byteswritten);
        if (fresult != FR_OK) {
            printf("Failed to write 'onoff': %d\n", fresult);
            f_close(&USBHFile);
            return;
        }
        snprintf(buffer, sizeof(buffer), ",\"event\":%d", PinsConf[i].event);
        fresult = f_write(&USBHFile, buffer, strlen(buffer), &Byteswritten);
        if (fresult != FR_OK) {
            printf("Failed to write 'event': %d\n", fresult);
            f_close(&USBHFile);
            return;
        }
        snprintf(buffer, sizeof(buffer), ",\"act\":%d", PinsConf[i].act);
        fresult = f_write(&USBHFile, buffer, strlen(buffer), &Byteswritten);
        if (fresult != FR_OK) {
            printf("Failed to write 'act': %d\n", fresult);
            f_close(&USBHFile);
            return;
        }
        snprintf(buffer, sizeof(buffer), ",\"parametr\":%d", PinsConf[i].parametr);
        fresult = f_write(&USBHFile, buffer, strlen(buffer), &Byteswritten);
        if (fresult != FR_OK) {
            printf("Failed to write 'parametr': %d\n", fresult);
            f_close(&USBHFile);
            return;
        }
        snprintf(buffer, sizeof(buffer), ",\"timeout\":%d", PinsConf[i].timeout);
        fresult = f_write(&USBHFile, buffer, strlen(buffer), &Byteswritten);
        if (fresult != FR_OK) {
            printf("Failed to write 'timeout': %d\n", fresult);
            f_close(&USBHFile);
            return;
        }
        snprintf(buffer, sizeof(buffer), ",\"send_sms\":\"%s\"", PinsConf[i].send_sms);
        fresult = f_write(&USBHFile, buffer, strlen(buffer), &Byteswritten);
        if (fresult != FR_OK) {
            printf("Failed to write 'send_sms': %d\n", fresult);
            f_close(&USBHFile);
            return;
        }
        fresult = f_write(&USBHFile, "}", 1, &Byteswritten);
        if (fresult != FR_OK) {
            printf("Failed to write '}': %d\n", fresult);
            f_close(&USBHFile);
            return;
        }
        // Добавляем запятую если это не последний пин
        if (i < NUMPIN - 1) {
            fresult = f_write(&USBHFile, ",", 1, &Byteswritten);
            if (fresult != FR_OK) {
                printf("Failed to write ',': %d\n", fresult);
                f_close(&USBHFile);
                return;
            }
        }
    }
    fresult = f_write(&USBHFile, "]", 1, &Byteswritten);
    if (fresult != FR_OK) {
        printf("Failed to write ']': %d\n", fresult);
        f_close(&USBHFile);
        return;
    }
    f_close(&USBHFile);
    // MQTT уведомление
    if ((s_conn != NULL && !s_conn->is_closing) && SetSettings.check_mqtt) {
        uint8_t mqttnum = 1;
        if (xQueueSend(mqttQueueHandle, &mqttnum, portMAX_DELAY) != pdPASS) {
            printf("Error send mqtt xQueueSend!\r\n");
        }
    }
}

void GetPinToPin() {
	FILINFO finfo;
	FRESULT fresult;
	UINT bytesRead;
//    char currentChar;
	char key[64] = { 0 };
	char value[64] = { 0 };
	size_t keyPos = 0, valuePos = 0;
	bool inString = false;
	bool isKey = true;
	uint8_t pinindex = 0;

	fresult = f_stat("pintopin.ini", &finfo);
	if (fresult != FR_OK) {
		printf("ERROR: pintopin.ini file not found!\r\n");
		return;
	}
	if (f_open(&USBHFile, "pintopin.ini", FA_READ) != FR_OK) {
		printf("ERROR: Cannot open pintopin.ini!\r\n");
		return;
	}
	memset(PinsLinks, 0, sizeof(PinsLinks)); // Reset all PinsLinks entries
	while ((fresult = f_read(&USBHFile, &currentChar, 1, &bytesRead)) == FR_OK && bytesRead > 0) {
		if (currentChar == '"') {
			inString = !inString;
			if (!inString) {
				if (isKey) {
					key[keyPos] = '\0';
					isKey = false;
					valuePos = 0;
				} else {
					value[valuePos] = '\0';
					goto process_key_value;
				}
			}
			continue;
		}
		if (currentChar == ':' && !inString) {
			if (!isKey) {
				valuePos = 0;
			}
			continue;
		}
		if (!inString && !isKey && (currentChar == ',' || currentChar == '\n' || currentChar == '}')) {
			if (valuePos > 0) {
				value[valuePos] = '\0';
				goto process_key_value;
			}
			continue;
		}
		if (!inString && (currentChar == ' ' || currentChar == '\t' || currentChar == '\r' || currentChar == '{' || currentChar == '[' || currentChar == ']')) {
			continue;
		}
		if (inString || (!inString && !isKey && (isdigit(currentChar) || currentChar == '-' || currentChar == '.'))) {
			if (isKey) {
				key[keyPos++] = currentChar;
			} else {
				value[valuePos++] = currentChar;
			}
		}
		continue;
		process_key_value: if (strcmp(key, "idin") == 0) {
			PinsLinks[pinindex].idin = atoi(value);
		} else if (strcmp(key, "idout") == 0) {
			PinsLinks[pinindex].idout = atoi(value);
		} else if (strcmp(key, "pins") == 0) {
			strncpy(PinsLinks[pinindex].pins, value, sizeof(PinsLinks[pinindex].pins) - 1);
			PinsLinks[pinindex].pins[sizeof(PinsLinks[pinindex].pins) - 1] = '\0';
			pinindex++;  // Move to next PinsLinks entry after processing "pins"
		}
		keyPos = 0;
		valuePos = 0;
		isKey = true;
	}
	if (fresult != FR_OK) {
		printf("ERROR: Read failed!\r\n");
	}
	f_close(&USBHFile);
}

// Записываем данные в файл "pintopin.ini", создавая его если его нет.
void SetPinToPin() {
    UINT bytesWritten;
    char buffer[JSON_BUF_SIZE];

    if (f_open(&USBHFile, (const TCHAR*)"pintopin.ini", FA_CREATE_ALWAYS | FA_WRITE) != FR_OK) {
        printf("Error opening file for writing\r\n");
        return;
    }
    f_write(&USBHFile, "[", 1, &bytesWritten);
    for (int i = 0; i < NUMPINLINKS; i++) {
        // Write opening bracket for object
        if (i > 0) {
            f_write(&USBHFile, ",{", 2, &bytesWritten);
        } else {
            f_write(&USBHFile, "{", 1, &bytesWritten);
        }
        snprintf(buffer, JSON_BUF_SIZE, "\"idin\":%d,", PinsLinks[i].idin);
        f_write(&USBHFile, buffer, strlen(buffer), &bytesWritten);
        snprintf(buffer, JSON_BUF_SIZE, "\"idout\":%d,", PinsLinks[i].idout);
        f_write(&USBHFile, buffer, strlen(buffer), &bytesWritten);
        snprintf(buffer, JSON_BUF_SIZE, "\"pins\":\"%s\"}", PinsLinks[i].pins);
        f_write(&USBHFile, buffer, strlen(buffer), &bytesWritten);
    }
    f_write(&USBHFile, "]", 1, &bytesWritten);

    f_close(&USBHFile);
    printf("File 'PINTOPIN.INI' updated successfully!\r\n");
}

void InitPin() {
	int i = 0;
	GPIO_InitTypeDef GPIO_InitStruct = { 0 };
//	static bool portEnabled[7] = { false }; // массив для портов A-G, инициализирован нулями
	SetSettings.monflg = 0;

	// Проверяем настройки SIM800L
	if (SetSettings.sim800l == 0) {
		HAL_UART_DeInit(&huart2);// Отключаем USART2
		__HAL_RCC_USART2_CLK_DISABLE();// Отключаем тактирование USART2
		// Просто сбрасываем пины в дефолтное состояние
		HAL_GPIO_DeInit(GPIOA, GPIO_PIN_3);  // PA3
		HAL_GPIO_DeInit(GPIOD, GPIO_PIN_5);  // PD5
	}

	for (i = 0; i < NUMPIN; i++) {
		// для Multi button
		PinsConf[i].act = 0;
		// initialization DEVICE & ONEWIRE
		if (PinsConf[i].topin == 2 || PinsConf[i].topin == 4) {
			checkPortClockStatus(PinsInfo[i].gpio_name);
			//сбрасываем биты для данного пина
			HAL_GPIO_DeInit(PinsInfo[i].gpio_name, PinsInfo[i].hal_pin);
			/*Configure GPIO pin Output Level */  // ???zerg???
			HAL_GPIO_WritePin(PinsInfo[i].gpio_name, PinsInfo[i].hal_pin, GPIO_PIN_RESET);
			// инициализация пина OUTPUT
			GPIO_InitStruct.Pin = PinsInfo[i].hal_pin; // вывод
			GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP; // режим – выход
			GPIO_InitStruct.Pull = GPIO_NOPULL;
			GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW; //
			HAL_GPIO_Init(PinsInfo[i].gpio_name, &GPIO_InitStruct);
		}
		// initialization EncoderA & EncoderB
		else if (PinsConf[i].topin == 8 || PinsConf[i].topin == 9) {
			checkPortClockStatus(PinsInfo[i].gpio_name);
			//сбрасываем биты для данного пина
			HAL_GPIO_DeInit(PinsInfo[i].gpio_name, PinsInfo[i].hal_pin);

			GPIO_InitStruct.Pin = PinsInfo[i].hal_pin; // вход
			GPIO_InitStruct.Mode = GPIO_MODE_INPUT; // устанавливаем режим работы порта на вход
			GPIO_InitStruct.Pull = GPIO_NOPULL;
			HAL_GPIO_Init(PinsInfo[i].gpio_name, &GPIO_InitStruct); // инициализируем
		}
		// initialization BUTTON & SWITCH
		else if (PinsConf[i].topin == 1 || PinsConf[i].topin == 3) {
			checkPortClockStatus(PinsInfo[i].gpio_name);
			// сбрасываем биты для данного пина
			HAL_GPIO_DeInit(PinsInfo[i].gpio_name, PinsInfo[i].hal_pin);
			// инициализация пина  INPUT
			GPIO_InitStruct.Pin = PinsInfo[i].hal_pin; // вход
			GPIO_InitStruct.Mode = GPIO_MODE_INPUT; // устанавливаем режим работы порта на вход
			if (PinsConf[i].ptype == 1) {
				GPIO_InitStruct.Pull = GPIO_PULLUP;
			} else if (PinsConf[i].ptype == 2) {
				GPIO_InitStruct.Pull = GPIO_PULLDOWN;
			} else if (PinsConf[i].ptype == 0) {
				GPIO_InitStruct.Pull = GPIO_NOPULL;
			} else {
				GPIO_InitStruct.Pull = GPIO_NOPULL;
			}
			GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_HIGH; // устанавливаем максимальную скорость порта
			HAL_GPIO_Init(PinsInfo[i].gpio_name, &GPIO_InitStruct); // инициализируем порт B
		}
		// initialization PWM
		else if (PinsConf[i].topin == 5) {
			//__HAL_RCC_TIM1_CLK_ENABLE();
			if (PinsInfo[i].tim == TIM1) {
				__HAL_RCC_TIM1_CLK_ENABLE();
			} else if (PinsInfo[i].tim == TIM2) {
				__HAL_RCC_TIM2_CLK_ENABLE();
			} else if (PinsInfo[i].tim == TIM3) {
				__HAL_RCC_TIM3_CLK_ENABLE();
			} else if (PinsInfo[i].tim == TIM4) {
				__HAL_RCC_TIM4_CLK_ENABLE();
			} else if (PinsInfo[i].tim == TIM5) {
				__HAL_RCC_TIM5_CLK_ENABLE();
			} else if (PinsInfo[i].tim == TIM7) {
				__HAL_RCC_TIM7_CLK_ENABLE();
			} else if (PinsInfo[i].tim == TIM8) {
				__HAL_RCC_TIM8_CLK_ENABLE();
			} else if (PinsInfo[i].tim == TIM9) {
				__HAL_RCC_TIM9_CLK_ENABLE();
			} else if (PinsInfo[i].tim == TIM10) {
				__HAL_RCC_TIM10_CLK_ENABLE();
			} else if (PinsInfo[i].tim == TIM11) {
				__HAL_RCC_TIM11_CLK_ENABLE();
			} else if (PinsInfo[i].tim == TIM12) {
				__HAL_RCC_TIM12_CLK_ENABLE();
			} else if (PinsInfo[i].tim == TIM13) {
				__HAL_RCC_TIM13_CLK_ENABLE();
			} else if (PinsInfo[i].tim == TIM14) {
				__HAL_RCC_TIM14_CLK_ENABLE();
			}
			//RCC->APB2ENR |= (1 << 0);
			TIM_MasterConfigTypeDef sMasterConfig = { 0 };
			TIM_OC_InitTypeDef sConfigOC = { 0 };
			TIM_BreakDeadTimeConfigTypeDef sBreakDeadTimeConfig = { 0 };
			/* USER CODE BEGIN TIM1_Init 1 */
			/* USER CODE END TIM1_Init 1 */
			htim[i].Instance = PinsInfo[i].tim;
			htim[i].Init.Prescaler = 216 - 1;
			htim[i].Init.CounterMode = TIM_COUNTERMODE_UP;
			htim[i].Init.Period = 100 - 1;
			htim[i].Init.ClockDivision = TIM_CLOCKDIVISION_DIV1;
			htim[i].Init.RepetitionCounter = 0;
			htim[i].Init.AutoReloadPreload = TIM_AUTORELOAD_PRELOAD_DISABLE;
			if (HAL_TIM_PWM_Init(&htim[i]) != HAL_OK) {
				Error_Handler();
			}
			sMasterConfig.MasterOutputTrigger = TIM_TRGO_RESET;
			sMasterConfig.MasterOutputTrigger2 = TIM_TRGO2_RESET;
			sMasterConfig.MasterSlaveMode = TIM_MASTERSLAVEMODE_DISABLE;
			if (HAL_TIMEx_MasterConfigSynchronization(&htim[i], &sMasterConfig) != HAL_OK) {
				Error_Handler();
			}
			sConfigOC.OCMode = TIM_OCMODE_PWM1;
			sConfigOC.Pulse = 0;
			sConfigOC.OCPolarity = TIM_OCPOLARITY_HIGH;
			sConfigOC.OCNPolarity = TIM_OCNPOLARITY_HIGH;
			sConfigOC.OCFastMode = TIM_OCFAST_DISABLE;
			sConfigOC.OCIdleState = TIM_OCIDLESTATE_RESET;
			sConfigOC.OCNIdleState = TIM_OCNIDLESTATE_RESET;
			if (HAL_TIM_PWM_ConfigChannel(&htim[i], &sConfigOC, PinsInfo[i].tim_channel) != HAL_OK) {
				Error_Handler();
			}
			sBreakDeadTimeConfig.OffStateRunMode = TIM_OSSR_DISABLE;
			sBreakDeadTimeConfig.OffStateIDLEMode = TIM_OSSI_DISABLE;
			sBreakDeadTimeConfig.LockLevel = TIM_LOCKLEVEL_OFF;
			sBreakDeadTimeConfig.DeadTime = 0;
			sBreakDeadTimeConfig.BreakState = TIM_BREAK_DISABLE;
			sBreakDeadTimeConfig.BreakPolarity = TIM_BREAKPOLARITY_HIGH;
			sBreakDeadTimeConfig.BreakFilter = 0;
			sBreakDeadTimeConfig.Break2State = TIM_BREAK2_DISABLE;
			sBreakDeadTimeConfig.Break2Polarity = TIM_BREAK2POLARITY_HIGH;
			sBreakDeadTimeConfig.Break2Filter = 0;
			sBreakDeadTimeConfig.AutomaticOutput = TIM_AUTOMATICOUTPUT_DISABLE;
			if (HAL_TIMEx_ConfigBreakDeadTime(&htim[i], &sBreakDeadTimeConfig) != HAL_OK) {
				Error_Handler();
			}
			/* USER CODE BEGIN TIM1_Init 2 */
			/* USER CODE END TIM1_Init 2 */
			GPIO_InitStruct.Pin = PinsInfo[i].hal_pin;
			//GPIO_InitStruct.Pin = GPIO_PIN_9;
			GPIO_InitStruct.Mode = GPIO_MODE_AF_PP;
			GPIO_InitStruct.Pull = GPIO_NOPULL;
			GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
			GPIO_InitStruct.Alternate = PinsInfo[i].af;
			//HAL_GPIO_Init(GPIOE, &GPIO_InitStruct);
			HAL_GPIO_Init(PinsInfo[i].gpio_name, &GPIO_InitStruct);
			//HAL_TIM_MspPostInit(&htim[i]);
			HAL_TIM_PWM_Start(&htim[i], PinsInfo[i].tim_channel);
		}
/******************************************* Security ***********************************************/
		else if (PinsConf[i].topin == 10) { // Security
			checkPortClockStatus(PinsInfo[i].gpio_name);
			if (SetSettings.sim800l == 1 && (i == 1 || i == 35)) { // Пропускаем пины UART2 если SIM800L включен
				SetSettings.monflg++;
				PinsConf[i].topin = 0; // Что бы не отображались в таблице 'Security'!
				continue; // Пропускаем
			}
			// Сбрасываем биты для данного пина
			HAL_GPIO_DeInit(PinsInfo[i].gpio_name, PinsInfo[i].hal_pin);

			GPIO_InitStruct.Pin = PinsInfo[i].hal_pin; // GPIO_PIN_x
			GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW; // Скорость
			GPIO_InitStruct.Pull = GPIO_NOPULL; // Подтяжка
			switch (PinsConf[i].ptype) {
			case 0: // PIR датчик движения
				GPIO_InitStruct.Mode = GPIO_MODE_INPUT;
				GPIO_InitStruct.Pull = GPIO_PULLDOWN;
				PinsConf[i].state = 0;    // Начальное состояние - нет движения
				PinsConf[i].prvstate = 0; // Предыдущее состояние
				break;
			case 1: // Геркон NC (нормально замкнутый)
				GPIO_InitStruct.Mode = GPIO_MODE_INPUT;
				GPIO_InitStruct.Pull = GPIO_PULLDOWN;
				PinsConf[i].state = 1;   // Начальное состояние - магнит поднесен (контакты замкнуты)
				PinsConf[i].prvstate = 1;   // Предыдущее состояние
				break;
			case 2: // Геркон NO (нормально разомкнутый)
				GPIO_InitStruct.Mode = GPIO_MODE_INPUT;
				GPIO_InitStruct.Pull = GPIO_PULLDOWN;
				PinsConf[i].state = 0;   // Начальное состояние - магнит отсутствует (контакты разомкнуты)
				PinsConf[i].prvstate = 0;   // Предыдущее состояние
				break;
			}
			// Инициализация порта
			HAL_GPIO_Init(PinsInfo[i].gpio_name, &GPIO_InitStruct);
/******************************************************************************************/
		}
	}
}


void InitMultibutton(void) {
	for(uint8_t i = 0; i < NUMPIN; i++){
		// Инциализация кнопки PULLDOWN
		if (PinsConf[i].ptype == 2) {
			button_init(&button[i], read_button_level, 1, i);
			// просто кнопка
			button_attach(&button[i], PRESS_DOWN, (BtnCallback) button_event_handler);
			button_attach(&button[i], PRESS_UP, (BtnCallback) button_event_handler);
			button_attach(&button[i], LONG_PRESS_START, (BtnCallback) button_event_handler);
			button_attach(&button[i], LONG_PRESS_HOLD, (BtnCallback) button_event_handler);
			button_attach(&button[i], SINGLE_CLICK, (BtnCallback) button_event_handler);
			button_attach(&button[i], DOUBLE_CLICK, (BtnCallback) button_event_handler);
			button_attach(&button[i], PRESS_REPEAT, (BtnCallback) button_event_handler);
			button_start(&button[i]);
			// инициализация Multibutton flag
			PinsConf[i].act = 1;
		}
		// Инциализация кнопки PULLUP
		if (PinsConf[i].ptype == 1) {
			button_init(&button[i], read_button_level, 0, i);
			// просто кнопка
			button_attach(&button[i], PRESS_DOWN, (BtnCallback) button_event_handler);
			button_attach(&button[i], PRESS_UP, (BtnCallback) button_event_handler);
			button_attach(&button[i], LONG_PRESS_START, (BtnCallback) button_event_handler);
			button_attach(&button[i], LONG_PRESS_HOLD, (BtnCallback) button_event_handler);
			button_attach(&button[i], SINGLE_CLICK, (BtnCallback) button_event_handler);
			button_attach(&button[i], DOUBLE_CLICK, (BtnCallback) button_event_handler);
			button_attach(&button[i], PRESS_REPEAT, (BtnCallback) button_event_handler);
			button_start(&button[i]);
			// инициализация Multibutton flag
			PinsConf[i].act = 1;
		}
	}
}

/***************************** OneWire ************************************/
void ProcessKeyValuePair(const char *key, const char *value, int nestLevel) {
	static int ds18b20_count = 0;
	static int dht22_count = 0;
	static bool expecting_id = false; // Новый флаг для отслеживания ожидания id
//	printf("DEBUG: Processing - Key: %s, Value: %s, NestLevel: %d\n", key, value, nestLevel);
//	printf("DEBUG: Current state - temp_id: %d, typensor: %d, pinindex: %d\n", temp_id, typensor, pinindex);
	if (nestLevel == 2) {
		// Если встречаем ключ "pins" и значение "id", готовимся к приему id
		if (strcmp(key, "pins") == 0 && strcmp(value, "id") == 0) {
			expecting_id = true;
			return;
		}
		// Если ожидаем id и получаем его через ключ "pins"
		if (expecting_id && strcmp(key, "pins") == 0) {
			temp_id = atoi(value);
			expecting_id = false; // Сбрасываем флаг
//			printf("DEBUG: Found new ID through pins: %d\n", temp_id);
			return;
		}
		// Существующая обработка id (оставляем для обратной совместимости)
		if (strcmp(key, "id") == 0) {
			temp_id = atoi(value);
//			printf("DEBUG: Found new ID: %d\n", temp_id);
			return;
		}
		if (strcmp(key, "typsensr") == 0) {
			typensor = atoi(value);
//			printf("DEBUG: Found sensor type: %d for ID: %d\n", typensor, temp_id);
			if (typensor == 1 && ds18b20_count < MAX_DS18B20_P) {
				pinindex = ds18b20_count;
				ds18b20[pinindex].id = temp_id;
				ds18b20[pinindex].typsensr = typensor;
				sensidx = 0;
				ds18b20_count++;
//				printf("New DS18B20 pin found! ID: %d, Index: %d\n", temp_id, pinindex);
			} else if (typensor == 2 && dht22_count < MAX_DHT22_P) {
				printf("DEBUG: Processing DHT22 - Count before: %d\n", dht22_count);
				pinindex = dht22_count;
				dht22[pinindex].id = temp_id;
				dht22[pinindex].typsensr = typensor;
				sensidx = 1;
				dht22_count++;
//				printf("New DHT22 pin found! ID: %d, Index: %d\n", temp_id, pinindex);
			} else {
				printf("DEBUG: ERROR - typsensr found but no valid ID or maximum devices reached!\n");
			}
		} else if (strcmp(key, "pin") == 0) {
			if (typensor == 1 && pinindex >= 0) {
				strncpy(ds18b20[pinindex].pin, value, sizeof(ds18b20[pinindex].pin) - 1);
//				printf("DS18B20 PIN saved: %s at index %d\n", value, pinindex);
			} else if (typensor == 2 && pinindex >= 0) {
				strncpy(dht22[pinindex].pin, value, sizeof(dht22[pinindex].pin) - 1);
//				printf("DHT22 PIN saved: %s at index %d\n", value, pinindex);
			}
		} else if (strcmp(key, "numsens") == 0) {
			if (typensor == 1 && pinindex >= 0) {
				ds18b20[pinindex].numsens = atoi(value);
//				printf("DS18B20 sensors count set to: %d at index %d\n", ds18b20[pinindex].numsens, pinindex);
			} else if (typensor == 2 && pinindex >= 0) {
				dht22[pinindex].numsens = atoi(value);
//				printf("DHT22 sensors count set to: %d at index %d\n", dht22[pinindex].numsens, pinindex);
			}
		} else if (strcmp(key, "onoff") == 0) {
			if (typensor == 1 && pinindex >= 0) {
				ds18b20[pinindex].onoff = atoi(value);
//				printf("DS18B20 onoff set to: %d at index %d\n", ds18b20[pinindex].onoff, pinindex);
			} else if (typensor == 2 && pinindex >= 0) {
				dht22[pinindex].onoff = atoi(value);
//				printf("DHT22 onoff set to: %d at index %d\n", dht22[pinindex].onoff, pinindex);
			}
		}
	} else if (nestLevel == 3) {
//		printf("DEBUG: Processing sensor data - ID: %d, Type: %d, PinIndex: %d, SensIdx: %d\n", temp_id, typensor, pinindex, sensidx);
		if (typensor == 1 && pinindex >= 0) {
			if (strcmp(key, "s_number") == 0) {
				// Увеличиваем sensidx только после успешного сохранения адреса
				if (sensidx < ds18b20[pinindex].numsens) {
					for (int i = 0; i < 8; i++) {
						char hexByte[3] = { value[i * 2], value[i * 2 + 1], '\0' };
						uint8_t byte = strtol(hexByte, NULL, 16);
						ds18b20[pinindex].sensors[sensidx].addr[i] = byte;
//						printf("Byte %d: 0x%02X\n", i, byte);
					}
//					printf("Address saved for pin %d sensor %d\n", pinindex, sensidx);
					sensidx++;  // Увеличиваем только после успешного сохранения адреса
				}
			} else if (strcmp(key, "t") == 0) {
				if (sensidx < ds18b20[pinindex].numsens) {
					ds18b20[pinindex].sensors[sensidx].temp = atof(value);
//					printf("Temperature saved: %.2f for pin %d sensor %d\n", ds18b20[pinindex].sensors[sensidx].temp, pinindex, sensidx);
				}
			} else if (strcmp(key, "valid") == 0) {
				if (sensidx < ds18b20[pinindex].numsens) {
					ds18b20[pinindex].sensors[sensidx].valid = (strcmp(value, "true") == 0);
//					printf("Valid flag saved: %d for pin %d sensor %d\n", ds18b20[pinindex].sensors[sensidx].valid, pinindex, sensidx);
				}
			} else if (strcmp(key, "ut") == 0) {
				if (sensidx < ds18b20[pinindex].numsens) {
					ds18b20[pinindex].sensors[sensidx].upt = atof(value);
//					printf("Upper temperature saved: %.2f for pin %d sensor %d\n", ds18b20[pinindex].sensors[sensidx].upt, pinindex, sensidx);
				}
			} else if (strcmp(key, "lt") == 0) {
				if (sensidx < ds18b20[pinindex].numsens) {
					ds18b20[pinindex].sensors[sensidx].lowt = atof(value);
//					printf("Lower temperature saved: %.2f for pin %d sensor %d\n", ds18b20[pinindex].sensors[sensidx].lowt, pinindex, sensidx);
				}
			} else if (strcmp(key, "action_ut") == 0) {
				if (sensidx < ds18b20[pinindex].numsens) {
					strncpy(ds18b20[pinindex].sensors[sensidx].actup, value, sizeof(ds18b20[pinindex].sensors[sensidx].actup) - 1);
//					printf("Upper action saved: %s for pin %d sensor %d\n", value, pinindex, sensidx);
				}
			} else if (strcmp(key, "action_lt") == 0) {
				if (sensidx < ds18b20[pinindex].numsens) {
					strncpy(ds18b20[pinindex].sensors[sensidx].actlow, value, sizeof(ds18b20[pinindex].sensors[sensidx].actlow) - 1);
//					printf("Lower action saved: %s for pin %d sensor %d\n", value, pinindex, sensidx);
				}
			} else if (strcmp(key, "info") == 0) {
				if (sensidx < ds18b20[pinindex].numsens) {
					strncpy(ds18b20[pinindex].sensors[sensidx].info, value, sizeof(ds18b20[pinindex].sensors[sensidx].info) - 1);
//					printf("Info saved for pin %d sensor %d\n", pinindex, sensidx);
				}
			}
		} else if (typensor == 2 && pinindex >= 0) {
			if (strcmp(key, "t") == 0) {
				dht22[pinindex].temp = atof(value);
//				printf("DHT22 temperature saved: %.2f\n", dht22[pinindex].temp);
			} else if (strcmp(key, "valid") == 0) {
				dht22[pinindex].valid = (strcmp(value, "true") == 0);
//				printf("DHT22 valid flag saved: %d\n", dht22[pinindex].valid);
			} else if (strcmp(key, "humidity") == 0) {
				dht22[pinindex].humid = atof(value);
//				printf("DHT22 humidity saved: %.2f\n", dht22[pinindex].humid);
			} else if (strcmp(key, "ut") == 0) {
				dht22[pinindex].upt = atof(value);
//				printf("DHT22 upper temperature saved: %.2f\n", dht22[pinindex].upt);
			} else if (strcmp(key, "lt") == 0) {
				dht22[pinindex].lowt = atof(value);
//				printf("DHT22 lower temperature saved: %.2f\n", dht22[pinindex].lowt);
			} else if (strcmp(key, "upphumid") == 0) {
				dht22[pinindex].uph = atof(value);
//				printf("DHT22 upper humidity saved: %.2f\n", dht22[pinindex].uph);
			} else if (strcmp(key, "humlolim") == 0) {
				dht22[pinindex].lowh = atof(value);
//				printf("DHT22 lower humidity saved: %.2f\n", dht22[pinindex].lowh);
			} else if (strcmp(key, "action_ut") == 0) {
				strncpy(dht22[pinindex].actup, value, sizeof(dht22[pinindex].actup) - 1);
//				printf("DHT22 upper temperature action saved: %s\n", dht22[pinindex].actup);
			} else if (strcmp(key, "action_lt") == 0) {
				strncpy(dht22[pinindex].actlow, value, sizeof(dht22[pinindex].actlow) - 1);
//				printf("DHT22 lower temperature action saved: %s\n", dht22[pinindex].actlow);
			} else if (strcmp(key, "actuphum") == 0) {
				strncpy(dht22[pinindex].actuh, value, sizeof(dht22[pinindex].actuh) - 1);
//				printf("DHT22 upper humidity action saved: %s\n", dht22[pinindex].actuh);
			} else if (strcmp(key, "actlowhum") == 0) {
				strncpy(dht22[pinindex].actlh, value, sizeof(dht22[pinindex].actlh) - 1);
//				printf("DHT22 lower humidity action saved: %s\n", dht22[pinindex].actlh);
			} else if (strcmp(key, "info") == 0) {
				strncpy(dht22[pinindex].info, value, sizeof(dht22[pinindex].info) - 1);
//				printf("DHT22 info saved: %s\n", dht22[pinindex].info);
			}
		}
	}
}

void GetOneWireConfig() {
	FILINFO finfo;
	FRESULT fresult;
	UINT bytesRead;
	char key[64] = { 0 };
	char value[JSON_BUF_SIZE] = { 0 };
	size_t keyPos = 0, valuePos = 0;
	bool inString = false;
	bool isKey = true;
//	char currentChar;
	int nestLevel = 0;

//	printf("\r\n=== Starting GetOneWireConfig() ===\r\n");

	fresult = f_stat("onewire.ini", &finfo);
	if (fresult != FR_OK) {
		printf("ERROR: onewire.ini file not found!\r\n");
		return;
	}
	printf("onewire.ini has size: %lu bytes\r\n", finfo.fsize);
	if (f_open(&USBHFile, "onewire.ini", FA_READ) != FR_OK) {
		printf("ERROR: Cannot open onewire.ini!\r\n");
		return;
	}
	memset(ds18b20, 0, sizeof(ds18b20_pin_t) * MAX_DS18B20_P);
	memset(dht22, 0, sizeof(dht22_pin_t) * MAX_DHT22_P);
	temp_id = -1;
	typensor = 0;
	pinindex = -1;
	sensidx = 0;
	while ((fresult = f_read(&USBHFile, &currentChar, 1, &bytesRead)) == FR_OK && bytesRead > 0) {
		if (!inString && (currentChar == ' ' || currentChar == '\t' || currentChar == '\r')) {
			continue;
		}
		if (currentChar == '"') {
			inString = !inString;
			if (!inString) {
				if (isKey) {
					key[keyPos] = '\0';
					isKey = false;
				} else {
					value[valuePos] = '\0';
					ProcessKeyValuePair(key, value, nestLevel);
					// Сбрасываем value после обработки
					valuePos = 0;
				}
			}
			continue;
		}
		if (!inString) {
			if (currentChar == '{') {
				nestLevel++;
				continue;
			}
			if (currentChar == '}') {
				// Process any remaining key-value pair before decreasing nest level
				if (valuePos > 0 && !isKey) {
					value[valuePos] = '\0';
					ProcessKeyValuePair(key, value, nestLevel);
				}
				nestLevel--;
				if (nestLevel == 1) {
					temp_id = -1;  // Only reset temp_id when leaving an object
					pinindex = -1;
				}
				continue;
			}
			if (currentChar == '[' || currentChar == ']') {
				continue;
			}
			if (currentChar == ':') {
				isKey = false;
				valuePos = 0;
				continue;
			}
			if (currentChar == ',' || currentChar == '\n') {
				if (valuePos > 0 && !isKey) {
					value[valuePos] = '\0';
					ProcessKeyValuePair(key, value, nestLevel);
				}
				isKey = true;
				keyPos = 0;
				valuePos = 0;
				continue;
			}
		}
		// Save characters for key or value
		if (inString || (!inString && !isKey && (isdigit(currentChar) || currentChar == '-' || currentChar == '.' || currentChar == 'f' || currentChar == 't'))) {
			if (isKey) {
				if (keyPos < sizeof(key) - 1) {
					key[keyPos++] = currentChar;
				}
			} else {
				if (valuePos < sizeof(value) - 1) {
					value[valuePos++] = currentChar;
				}
			}
		}
	}
	f_close(&USBHFile);
//	printf("=== Finished GetOneWireConfig() ===\r\n");
}
/***********************************************************************************************/
void SetOneWireConfig() {
    FRESULT fresult;
    UINT byteswritten;
    const uint8_t CHUNK_SIZE = 1; // Обработка по одному сенсору за раз для экономии памяти
    char *out_str = NULL;
    bool first_pin = true;

//    printf("Starting chunked SetOneWireConfig\n");

    // Open file
    fresult = f_open(&USBHFile, (const TCHAR*)"onewire.ini", FA_CREATE_ALWAYS | FA_WRITE);
    if (fresult != FR_OK) {
        printf("Error: Could not open onewire.ini for writing\n");
        return;
    }
    // Start the root object and write language
    const char *start_obj = "{\"lang\":\"";
    fresult = f_write(&USBHFile, start_obj, strlen(start_obj), &byteswritten);
    if (fresult != FR_OK) goto cleanup;
    fresult = f_write(&USBHFile, SetSettings.lang, strlen(SetSettings.lang), &byteswritten);
    if (fresult != FR_OK) goto cleanup;
    // Start pins array
    const char *pins_start = "\",\"pins\":[";
    fresult = f_write(&USBHFile, pins_start, strlen(pins_start), &byteswritten);
    if (fresult != FR_OK) goto cleanup;
    // Process DS18B20 sensors
    for (int i = 0; i < MAX_DS18B20_P; i++) {
        // Проверяем, что сенсор активен и имеет правильный тип
        if (ds18b20[i].typsensr != 1 || ds18b20[i].numsens == 0) continue;
        // Add comma if not first pin
        if (!first_pin) {
            fresult = f_write(&USBHFile, ",", 1, &byteswritten);
            if (fresult != FR_OK) goto cleanup;
        }
        first_pin = false;
//        printf("Processing DS18B20 pin %s with %d sensors\n", ds18b20[i].pin, ds18b20[i].numsens);
        // Create and write pin object header
        cJSON *pin_obj = cJSON_CreateObject();
        if (!pin_obj) continue;
        if (!(cJSON_AddNumberToObject(pin_obj, "id", ds18b20[i].id) &&
              cJSON_AddStringToObject(pin_obj, "pin", ds18b20[i].pin) &&
              cJSON_AddNumberToObject(pin_obj, "typsensr", 1) &&
              cJSON_AddNumberToObject(pin_obj, "numsens", ds18b20[i].numsens) &&
              cJSON_AddNumberToObject(pin_obj, "onoff", ds18b20[i].onoff))) {
            cJSON_Delete(pin_obj);
            continue;
        }
        out_str = cJSON_PrintUnformatted(pin_obj);
        cJSON_Delete(pin_obj);
        // Remove closing brace to add sensors array
        out_str[strlen(out_str) - 1] = '\0';
        fresult = f_write(&USBHFile, out_str, strlen(out_str), &byteswritten);
        free(out_str);
        if (fresult != FR_OK) goto cleanup;
        // Start sensors array
        fresult = f_write(&USBHFile, ",\"sensors\":[", strlen(",\"sensors\":["), &byteswritten);
        if (fresult != FR_OK) goto cleanup;
        // Process sensors in chunks
        bool first_sensor = true;
        for (int chunk_start = 0; chunk_start < ds18b20[i].numsens; chunk_start += CHUNK_SIZE) {
            int chunk_end = chunk_start + CHUNK_SIZE;
            if (chunk_end > ds18b20[i].numsens) chunk_end = ds18b20[i].numsens;
//            printf("Processing DS18B20 sensors %d to %d for pin %s\n", chunk_start, chunk_end-1, ds18b20[i].pin);
            for (int j = chunk_start; j < chunk_end; j++) {
                if (!first_sensor) {
                    fresult = f_write(&USBHFile, ",", 1, &byteswritten);
                    if (fresult != FR_OK) goto cleanup;
                }
                first_sensor = false;
                cJSON *sensor_obj = cJSON_CreateObject();
                if (!sensor_obj) continue;
                char sensor_addr_str[17];
                for (int k = 0; k < 8; k++) {
                    sprintf(sensor_addr_str + (k * 2), "%02X", ds18b20[i].sensors[j].addr[k]);
                }
                if (!(cJSON_AddStringToObject(sensor_obj, "s_number", sensor_addr_str) &&
                      cJSON_AddNumberToObject(sensor_obj, "t", 0.0) &&
                      cJSON_AddBoolToObject(sensor_obj, "valid", false) &&
                      cJSON_AddNumberToObject(sensor_obj, "ut", ds18b20[i].sensors[j].upt) &&
                      cJSON_AddNumberToObject(sensor_obj, "lt", ds18b20[i].sensors[j].lowt) &&
                      cJSON_AddStringToObject(sensor_obj, "action_ut", ds18b20[i].sensors[j].actup) &&
                      cJSON_AddStringToObject(sensor_obj, "action_lt", ds18b20[i].sensors[j].actlow) &&
                      cJSON_AddStringToObject(sensor_obj, "info", ds18b20[i].sensors[j].info))) {
                    cJSON_Delete(sensor_obj);
                    continue;
                }
                out_str = cJSON_PrintUnformatted(sensor_obj);
                cJSON_Delete(sensor_obj);
                fresult = f_write(&USBHFile, out_str, strlen(out_str), &byteswritten);
                free(out_str);
                if (fresult != FR_OK) goto cleanup;
            }
        }
        // Close sensors array and pin object
        fresult = f_write(&USBHFile, "]}", strlen("]}"), &byteswritten);
        if (fresult != FR_OK) goto cleanup;
    }
    // Process DHT22 sensors in chunks
    for (int chunk_start = 0; chunk_start < MAX_DHT22_P; chunk_start += CHUNK_SIZE) {
        int chunk_end = chunk_start + CHUNK_SIZE;
        if (chunk_end > MAX_DHT22_P) chunk_end = MAX_DHT22_P;
//        printf("Processing DHT22 sensors %d to %d\n", chunk_start, chunk_end-1);
        for (int j = chunk_start; j < chunk_end; j++) {
            if (dht22[j].typsensr != 2 || dht22[j].onoff == 0) continue;
//            printf("Processing DHT22 sensor on pin %s\n", dht22[j].pin);
            // Add comma if not first pin
            if (!first_pin) {
                fresult = f_write(&USBHFile, ",", 1, &byteswritten);
                if (fresult != FR_OK) goto cleanup;
            }
            first_pin = false;
            // Create pin object
            cJSON *pin_obj = cJSON_CreateObject();
            if (!pin_obj) continue;
            if (!(cJSON_AddNumberToObject(pin_obj, "id", dht22[j].id) &&
                  cJSON_AddStringToObject(pin_obj, "pin", dht22[j].pin) &&
                  cJSON_AddNumberToObject(pin_obj, "typsensr", 2) &&
                  cJSON_AddNumberToObject(pin_obj, "numsens", 1) &&
                  cJSON_AddNumberToObject(pin_obj, "onoff", dht22[j].onoff))) {
                cJSON_Delete(pin_obj);
                continue;
            }
            out_str = cJSON_PrintUnformatted(pin_obj);
            cJSON_Delete(pin_obj);
            // Remove closing brace to add sensors array
            out_str[strlen(out_str) - 1] = '\0';
            fresult = f_write(&USBHFile, out_str, strlen(out_str), &byteswritten);
            free(out_str);
            if (fresult != FR_OK) goto cleanup;
            // Start sensors array
            fresult = f_write(&USBHFile, ",\"sensors\":[", strlen(",\"sensors\":["), &byteswritten);
            if (fresult != FR_OK) goto cleanup;
            // Create DHT22 sensor object
            cJSON *sensor_obj = cJSON_CreateObject();
            if (!sensor_obj) goto cleanup;
            if (!(cJSON_AddStringToObject(sensor_obj, "s_number", "DHT22") &&
                  cJSON_AddNumberToObject(sensor_obj, "t", 0.00) &&
                  cJSON_AddNumberToObject(sensor_obj, "humidity", 0.00) &&
                  cJSON_AddBoolToObject(sensor_obj, "valid", false) &&
                  cJSON_AddNumberToObject(sensor_obj, "ut", dht22[j].upt) &&
                  cJSON_AddNumberToObject(sensor_obj, "lt", dht22[j].lowt) &&
                  cJSON_AddStringToObject(sensor_obj, "action_ut", dht22[j].actup) &&
                  cJSON_AddStringToObject(sensor_obj, "action_lt", dht22[j].actlow) &&
                  cJSON_AddNumberToObject(sensor_obj, "upphumid", dht22[j].uph) &&
                  cJSON_AddNumberToObject(sensor_obj, "humlolim", dht22[j].lowh) &&
                  cJSON_AddStringToObject(sensor_obj, "actuphum", dht22[j].actuh) &&
                  cJSON_AddStringToObject(sensor_obj, "actlowhum", dht22[j].actlh) &&
                  cJSON_AddStringToObject(sensor_obj, "info", dht22[j].info))) {
                cJSON_Delete(sensor_obj);
                goto cleanup;
            }
            out_str = cJSON_PrintUnformatted(sensor_obj);
            cJSON_Delete(sensor_obj);
            fresult = f_write(&USBHFile, out_str, strlen(out_str), &byteswritten);
            free(out_str);
            if (fresult != FR_OK) goto cleanup;
            // Close sensors array and pin object
            fresult = f_write(&USBHFile, "]}", strlen("]}"), &byteswritten);
            if (fresult != FR_OK) goto cleanup;
        }
    }
    // Close pins array and root object
    const char *end_json = "]}";
    fresult = f_write(&USBHFile, end_json, strlen(end_json), &byteswritten);
cleanup:
    if (fresult != FR_OK) {
        printf("Error: Failed to write to onewire.ini (error: %d)\n", fresult);
    }
    f_close(&USBHFile);
}
/***********************************************************************************************/
