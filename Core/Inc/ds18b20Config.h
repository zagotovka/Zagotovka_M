#ifndef	_DS18B20CONFIG_H
#define	_DS18B20CONFIG_H

#include "main.h"
#include <stdbool.h>

extern TIM_HandleTypeDef htim1;
//	Init timer on cube    1us per tick				example 72 MHz cpu >>> Prescaler=(72-1)      counter period=Max
//###################################################################################
#define	_DS18B20_USE_FREERTOS					1

#define BYTES_FOR_BITS(n) (((n) + 7) / 8)           // Для округления в большую сторону!
#define  MAX_DS18B20_PER_PIN					10 // Если 50 то утечка памяти, разберись! // Макс. датчиков на 1 пин	~15-20	Электрика (ёмкость шины), время чтения (750мс + N×30мс), PID-частота
#define  MAX_DS18B20_P                              3 // Максимальное количество пинов сконфигурированных для DS18B20 // Макс. пинов для DS18B20	~10-20	RAM: каждый пин ≈ 12 + N×136 байт. При 20 пинах × 20 датчиков = 55 KB из 512 KB
#define  MAX_DHT22_P                                89 // Максимальное количество пинов сконфигурированных для DHT22 // Размер структуры dht22_pin_t составляет около 248 байт то NUMPIN = 89 только под DHT22: RAM = 89 пинов × 248 байт = 22 072 байта (≈ 21.5 KB)
#define JSON_BUFFER_SIZE                            50000  // ~50KB для запаса

//#define	_DS18B20_GPIO								SENSOR_GPIO_Port
//#define	_DS18B20_PIN								SENSOR_Pin

#define	_DS18B20_CONVERT_TIMEOUT_MS					1000//5000
#if (_DS18B20_USE_FREERTOS==1)
#define	_DS18B20_UPDATE_INTERVAL_MS					0// 10000	//  (((	if==0  >> Ds18b20_ManualConvert()  )))    ((( if>0  >>>> Auto refresh )))
#endif


#define	_DS18B20_TIMER								htim1
//###################################################################################
// Структура для пина с DS18B20
/* Макс. число последовательных ошибок чтения шины перед авто-отключением */
#define DS18B20_MAX_BUS_ERRORS       10
/* Интервал (мс) попытки переинициализации отключённой шины */
#define DS18B20_REINIT_INTERVAL_MS   60000

typedef struct {
    uint8_t id;          // id пина
    char pin[5];         // Название пина ("PA0")
    uint8_t numsens;     // Количество датчиков на шине
    uint8_t onoff;       // 1-On or 0-OFF
    uint8_t typsensr;    // Тип сенсора 0 - None, 1 - ds18b20, 2 - dht22.
    uint8_t error_cnt;   // Счётчик последовательных ошибок чтения всей шины
    uint8_t auto_disabled; // 1 = шина отключена автоматически из-за ошибок
    struct {
        uint8_t addr[8]; // Серийный номер ds18b20
        float temp;      // Текущее значение температуры
        float prevtemp;  // Предудущее значение температуры
        bool valid;
        bool errorflg;   // Флаг если сенсор не читается
        float upt;       // Верхний предел температуры
        float lowt;      // Нижний предел температуры
        char actup[30];  // Действие при достижении верхнего предела T
        char actlow[30]; // Действие при достижении нижнего предела T
        char info[30];   // Info
        uint8_t upflag;  // upflag устанавливается при превышении верхнего предела и сбрасывается только при достижении lowflag!
        uint8_t lowflag; // lowflag устанавливается при достижении нижнего предела и сбрасывается только при достижении upflag!
    } sensors[MAX_DS18B20_PER_PIN];
} ds18b20_pin_t;

// Структура для пина с DHT22
typedef struct {
    uint8_t id;          // id пина
    char pin[5];         // Название пина ("PA0")
    uint8_t numsens;     // Количество датчиков на шине
    uint8_t onoff;       // 1-On or 0-OFF
    uint8_t typsensr;    // Тип сенсора 0 - None, 1 - ds18b20, 2 - dht22.
    float temp;          // Текущее значение температуры
    float prevtemp;      // предудущее значение температуры
    bool valid;
    float humid;         // Текущее значение влажности (для DHT22)
    float prvhumid;      // Предудущее значение влажности (для DHT22)
    float upt;           // Верхний предел температуры
    float lowt;          // Нижний предел температуры
    float uph;           // Верхний предел влажности
    float lowh;          // Нижний предел влажности
    char actup[30];      // Действие при достижении верхнего предела T
    char actlow[30];     // Действие при достижении нижнего предела T
    char actuh[30];      // Действие при достижении верхнего предела влажности
    char actlh[30];      // Действие при достижении нижнего предела влажности
    char info[30];       // Info
    uint8_t upflag;      // upflag устанавливается при превышении верхнего предела и сбрасывается только при достижении lowflag!
    uint8_t lowflag;     // lowflag устанавливается при достижении нижнего предела и сбрасывается только при достижении upflag!
    uint8_t uphflg;      // uphflg устанавливается при превышении верхнего предела влажности и сбрасывается только при достижении lowflag! т.е. флаги сбрасываются только при достижении противоположного предела.
    uint8_t lowhflg;     // lowhflg устанавливается при достижении нижнего предела влажности и сбрасывается только при достижении upflag!
    uint32_t lastread;   // last read time
    bool errflag;        // Что бы не спамило если 'Checksum error'
} dht22_pin_t;

extern ds18b20_pin_t ds18b20[MAX_DS18B20_P];
extern dht22_pin_t dht22[MAX_DHT22_P];
//###################################################################################
#endif
