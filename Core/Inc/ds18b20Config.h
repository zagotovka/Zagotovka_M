#ifndef	_DS18B20CONFIG_H
#define	_DS18B20CONFIG_H

#include "main.h"
#include <stdbool.h>

extern TIM_HandleTypeDef htim1;
//	Init timer on cube    1us per tick				example 72 MHz cpu >>> Prescaler=(72-1)      counter period=Max
//###################################################################################
#define	_DS18B20_USE_FREERTOS		    			1

#define BYTES_FOR_BITS(n) (((n) + 7) / 8)           // Для округления в большую сторону!
#define  MAX_DS18B20_PER_PIN		    			10 // Если 50 то утечка памяти, разберись!
#define  MAX_DS18B20_P                              3 // Максимальное количество пинов сконфигурированных для DS18B20
#define  MAX_DHT22_P                                5 // Максимальное количество пинов сконфигурированных для DHT22
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
typedef struct {
    uint8_t id;          // id пина
    char pin[5];         // Название пина ("PA0")
    uint8_t numsens;     // Количество датчиков на шине
    uint8_t onoff;       // 1-On or 0-OFF
    uint8_t typsensr;    // Тип сенсора 0 - None, 1 - ds18b20, 2 - dht22.
    struct {
        uint8_t addr[8]; // Серийный номер ds18b20
        float temp;      // Текущее значение температуры
        float prevtemp;  // Предудущее значение температуры
        bool valid;
        bool errorflg;   // Флаг если сенсор не читается
        double upt;      // Верхний предел температуры
        double lowt;     // Нижний предел температуры
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
    double humid;        // Текущее значение влажности (для DHT22)
    double prvhumid;     // Предудущее значение влажности (для DHT22)
    double upt;          // Верхний предел температуры
    double lowt;         // Нижний предел температуры
    double uph;          // Верхний предел влажности
    double lowh;         // Нижний предел влажности
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


