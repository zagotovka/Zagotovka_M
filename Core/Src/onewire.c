/**
 * |----------------------------------------------------------------------
 * | Copyright (C) Tilen Majerle, 2014
 * |
 * | This program is free software: you can redistribute it and/or modify
 * | it under the terms of the GNU General Public License as published by
 * | the Free Software Foundation, either version 3 of the License, or
 * | any later version.
 * |
 * | This program is distributed in the hope that it will be useful,
 * | but WITHOUT ANY WARRANTY; without even the implied warranty of
 * | MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * | GNU General Public License for more details.
 * |
 * | You should have received a copy of the GNU General Public License
 * | along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * |----------------------------------------------------------------------
 */
#include "onewire.h"
#include "ds18b20Config.h"
#include "main.h"
#include "stdio.h"/* для printf */
#include "FreeRTOS.h"
#include "task.h"

/* Задержка в мкс на счётчике циклов ядра (DWT->CYCCNT, DWT_Init() вызывается
 * при старте). Не использовать TIM1 или другой таймер ШИМ: их PSC/ARR задаются
 * частотой ШИМ, и обнуление CNT ломает ШИМ. */
void ONEWIRE_DELAY(uint16_t time_us)
{
	uint32_t cycles = (uint32_t)time_us * (SystemCoreClock / 1000000U);
	uint32_t start  = DWT->CYCCNT;
	while ((DWT->CYCCNT - start) < cycles) {
		/* wait */
	}
}
void ONEWIRE_LOW(OneWire_t *gp)
{
	gp->GPIOx->BSRR = gp->GPIO_Pin<<16;
}
void ONEWIRE_HIGH(OneWire_t *gp)
{
	gp->GPIOx->BSRR = gp->GPIO_Pin;
}
/* Пин всегда в режиме Open-Drain (настраивается один раз в OneWire_Init).
 * "INPUT" = отпустить линию (записать 1 в ODR -> Hi-Z), чтение через IDR
 * работает и в режиме выхода. Никаких HAL_GPIO_Init в битовых слотах -
 * он слишком медленный и ломает тайминг 1-Wire. */
void ONEWIRE_INPUT(OneWire_t *gp)
{
	gp->GPIOx->BSRR = gp->GPIO_Pin;           /* release */
}
/* Полная (медленная) настройка пина - вызывать только из OneWire_Init */
static void ONEWIRE_CONFIG_OD(OneWire_t *gp)
{
	GPIO_InitTypeDef	gpinit = {0};
	gpinit.Mode = GPIO_MODE_OUTPUT_OD;
	gpinit.Pull = GPIO_PULLUP;   /* доп. внутренняя подтяжка ~40 кОм параллельно внешней */
	gpinit.Speed = GPIO_SPEED_FREQ_HIGH;
	gpinit.Pin = gp->GPIO_Pin;
	HAL_GPIO_Init(gp->GPIOx,&gpinit);
}
void ONEWIRE_OUTPUT(OneWire_t *gp)
{
	(void)gp;   /* режим уже OD, ничего не делаем */
}
void OneWire_Init(OneWire_t* OneWireStruct, GPIO_TypeDef* GPIOx, uint16_t GPIO_Pin)
{
	/* TIM1 не запускаем: задержки идут на DWT, TIM1 целиком отдан ШИМ */
	OneWireStruct->GPIOx = GPIOx;
	OneWireStruct->GPIO_Pin = GPIO_Pin;
	ONEWIRE_HIGH(OneWireStruct);              /* ODR=1 до смены режима, без импульса */
	ONEWIRE_CONFIG_OD(OneWireStruct);
	ONEWIRE_HIGH(OneWireStruct);
	OneWireDelay(1000);
	ONEWIRE_LOW(OneWireStruct);
	OneWireDelay(1000);
	ONEWIRE_HIGH(OneWireStruct);
	OneWireDelay(2000);
}

inline uint8_t OneWire_Reset(OneWire_t* OneWireStruct)
{
	uint8_t i;

	/* Line low, and wait 480us */
	ONEWIRE_LOW(OneWireStruct);
	ONEWIRE_DELAY(480);
	ONEWIRE_DELAY(20);
	/* Release line and wait for 70us */
	taskENTER_CRITICAL();
	ONEWIRE_INPUT(OneWireStruct);
	ONEWIRE_DELAY(70);
	/* Check bit value */
	i = HAL_GPIO_ReadPin(OneWireStruct->GPIOx, OneWireStruct->GPIO_Pin);
	taskEXIT_CRITICAL();

	/* Delay for 410 us */
	ONEWIRE_DELAY(410);
	/* Return value of presence pulse, 0 = OK, 1 = ERROR */
	return i;
}

inline void OneWire_WriteBit(OneWire_t* OneWireStruct, uint8_t bit)
{
	taskENTER_CRITICAL();
	if (bit)
	{
		/* Write 1: низкий 6 мкс, потом отпустить, слот ~70 мкс */
		ONEWIRE_LOW(OneWireStruct);
		ONEWIRE_DELAY(6);
		ONEWIRE_INPUT(OneWireStruct);
		ONEWIRE_DELAY(64);
	}
	else
	{
		/* Write 0: низкий 65 мкс, отпустить, пауза восстановления */
		ONEWIRE_LOW(OneWireStruct);
		ONEWIRE_DELAY(65);
		ONEWIRE_INPUT(OneWireStruct);
		ONEWIRE_DELAY(5);
	}
	taskEXIT_CRITICAL();
}

inline uint8_t OneWire_ReadBit(OneWire_t* OneWireStruct)
{
	uint8_t bit = 0;
	taskENTER_CRITICAL();
	/* Низкий 2 мкс, отпустить */
	ONEWIRE_LOW(OneWireStruct);
	ONEWIRE_DELAY(2);
	ONEWIRE_INPUT(OneWireStruct);
	/* Семплируем через ~8 мкс после отпускания (итого ~11-12 мкс от
	 * падающего фронта, строго < 15 мкс) */
	ONEWIRE_DELAY(8);
	if (HAL_GPIO_ReadPin(OneWireStruct->GPIOx, OneWireStruct->GPIO_Pin)) {
		bit = 1;
	}
	/* Дожидаемся конца слота (~60+ мкс) */
	ONEWIRE_DELAY(50);
	taskEXIT_CRITICAL();
	return bit;
}

void OneWire_WriteByte(OneWire_t* OneWireStruct, uint8_t byte) {
	uint8_t i = 8;
	/* Write 8 bits */
	while (i--) {
		/* LSB bit is first */
		OneWire_WriteBit(OneWireStruct, byte & 0x01);
		byte >>= 1;
	}
}

uint8_t OneWire_ReadByte(OneWire_t* OneWireStruct) {
	uint8_t i = 8, byte = 0;
	while (i--) {
		byte >>= 1;
		byte |= (OneWire_ReadBit(OneWireStruct) << 7);
	}

	return byte;
}

uint8_t OneWire_First(OneWire_t* OneWireStruct) {
	/* Reset search values */
	OneWire_ResetSearch(OneWireStruct);

	/* Start with searching */
	return OneWire_Search(OneWireStruct, ONEWIRE_CMD_SEARCHROM);
}

uint8_t OneWire_Next(OneWire_t* OneWireStruct) {
   /* Leave the search state alone */
   return OneWire_Search(OneWireStruct, ONEWIRE_CMD_SEARCHROM);
}

void OneWire_ResetSearch(OneWire_t* OneWireStruct) {
	/* Reset the search state */
	OneWireStruct->LastDiscrepancy = 0;
	OneWireStruct->LastDeviceFlag = 0;
	OneWireStruct->LastFamilyDiscrepancy = 0;
}

uint8_t OneWire_Search(OneWire_t* OneWireStruct, uint8_t command) {
	uint8_t id_bit_number;
	uint8_t last_zero, rom_byte_number, search_result;
	uint8_t id_bit, cmp_id_bit;
	uint8_t rom_byte_mask, search_direction;

	/* Initialize for search */
	id_bit_number = 1;
	last_zero = 0;
	rom_byte_number = 0;
	rom_byte_mask = 1;
	search_result = 0;

	// if the last call was not the last one
	if (!OneWireStruct->LastDeviceFlag)
	{
		// 1-Wire reset
		if (OneWire_Reset(OneWireStruct))
		{
			/* Reset the search */
			OneWireStruct->LastDiscrepancy = 0;
			OneWireStruct->LastDeviceFlag = 0;
			OneWireStruct->LastFamilyDiscrepancy = 0;
			return 0;
		}

		// issue the search command
		OneWire_WriteByte(OneWireStruct, command);

		// loop to do the search
		do {
			// read a bit and its complement
			id_bit = OneWire_ReadBit(OneWireStruct);
			cmp_id_bit = OneWire_ReadBit(OneWireStruct);

			// check for no devices on 1-wire
			if ((id_bit == 1) && (cmp_id_bit == 1)) {
				break;
			} else {
				// all devices coupled have 0 or 1
				if (id_bit != cmp_id_bit) {
					search_direction = id_bit;  // bit write value for search
				} else {
					// if this discrepancy if before the Last Discrepancy
					// on a previous next then pick the same as last time
					if (id_bit_number < OneWireStruct->LastDiscrepancy) {
						search_direction = ((OneWireStruct->ROM_NO[rom_byte_number] & rom_byte_mask) > 0);
					} else {
						// if equal to last pick 1, if not then pick 0
						search_direction = (id_bit_number == OneWireStruct->LastDiscrepancy);
					}

					// if 0 was picked then record its position in LastZero
					if (search_direction == 0) {
						last_zero = id_bit_number;

						// check for Last discrepancy in family
						if (last_zero < 9) {
							OneWireStruct->LastFamilyDiscrepancy = last_zero;
						}
					}
				}

				// set or clear the bit in the ROM byte rom_byte_number
				// with mask rom_byte_mask
				if (search_direction == 1) {
					OneWireStruct->ROM_NO[rom_byte_number] |= rom_byte_mask;
				} else {
					OneWireStruct->ROM_NO[rom_byte_number] &= ~rom_byte_mask;
				}

				// serial number search direction write bit
				OneWire_WriteBit(OneWireStruct, search_direction);

				// increment the byte counter id_bit_number
				// and shift the mask rom_byte_mask
				id_bit_number++;
				rom_byte_mask <<= 1;

				// if the mask is 0 then go to new SerialNum byte rom_byte_number and reset mask
				if (rom_byte_mask == 0) {
					//docrc8(ROM_NO[rom_byte_number]);  // accumulate the CRC
					rom_byte_number++;
					rom_byte_mask = 1;
				}
			}
		} while (rom_byte_number < 8);  // loop until through all ROM bytes 0-7

		// if the search was successful then
		if (!(id_bit_number < 65)) {
			// search successful so set LastDiscrepancy,LastDeviceFlag,search_result
			OneWireStruct->LastDiscrepancy = last_zero;

			// check for last device
			if (OneWireStruct->LastDiscrepancy == 0) {
				OneWireStruct->LastDeviceFlag = 1;
			}

			search_result = 1;
		}
	}

	// if no device found then reset counters so next 'search' will be like a first
	if (!search_result || !OneWireStruct->ROM_NO[0]) {
		OneWireStruct->LastDiscrepancy = 0;
		OneWireStruct->LastDeviceFlag = 0;
		OneWireStruct->LastFamilyDiscrepancy = 0;
		search_result = 0;
	}

	return search_result;
}

int OneWire_Verify(OneWire_t* OneWireStruct) {
	unsigned char rom_backup[8];
	int i,rslt,ld_backup,ldf_backup,lfd_backup;

	// keep a backup copy of the current state
	for (i = 0; i < 8; i++)
	rom_backup[i] = OneWireStruct->ROM_NO[i];
	ld_backup = OneWireStruct->LastDiscrepancy;
	ldf_backup = OneWireStruct->LastDeviceFlag;
	lfd_backup = OneWireStruct->LastFamilyDiscrepancy;

	// set search to find the same device
	OneWireStruct->LastDiscrepancy = 64;
	OneWireStruct->LastDeviceFlag = 0;

	if (OneWire_Search(OneWireStruct, ONEWIRE_CMD_SEARCHROM)) {
		// check if same device found
		rslt = 1;
		for (i = 0; i < 8; i++) {
			if (rom_backup[i] != OneWireStruct->ROM_NO[i]) {
				rslt = 1;
				break;
			}
		}
	} else {
		rslt = 0;
	}

	// restore the search state
	for (i = 0; i < 8; i++) {
		OneWireStruct->ROM_NO[i] = rom_backup[i];
	}
	OneWireStruct->LastDiscrepancy = ld_backup;
	OneWireStruct->LastDeviceFlag = ldf_backup;
	OneWireStruct->LastFamilyDiscrepancy = lfd_backup;

	// return the result of the verify
	return rslt;
}

void OneWire_TargetSetup(OneWire_t* OneWireStruct, uint8_t family_code) {
   uint8_t i;

	// set the search state to find SearchFamily type devices
	OneWireStruct->ROM_NO[0] = family_code;
	for (i = 1; i < 8; i++) {
		OneWireStruct->ROM_NO[i] = 0;
	}

	OneWireStruct->LastDiscrepancy = 64;
	OneWireStruct->LastFamilyDiscrepancy = 0;
	OneWireStruct->LastDeviceFlag = 0;
}

void OneWire_FamilySkipSetup(OneWire_t* OneWireStruct) {
	// set the Last discrepancy to last family discrepancy
	OneWireStruct->LastDiscrepancy = OneWireStruct->LastFamilyDiscrepancy;
	OneWireStruct->LastFamilyDiscrepancy = 0;

	// check for end of list
	if (OneWireStruct->LastDiscrepancy == 0) {
		OneWireStruct->LastDeviceFlag = 1;
	}
}

uint8_t OneWire_GetROM(OneWire_t* OneWireStruct, uint8_t index) {
	return OneWireStruct->ROM_NO[index];
}

void OneWire_Select(OneWire_t* OneWireStruct, uint8_t* addr) {
	uint8_t i;
	OneWire_WriteByte(OneWireStruct, ONEWIRE_CMD_MATCHROM);

	for (i = 0; i < 8; i++) {
		OneWire_WriteByte(OneWireStruct, *(addr + i));
	}
}

void OneWire_SelectWithPointer(OneWire_t* OneWireStruct, uint8_t *ROM) {
	uint8_t i;
	OneWire_WriteByte(OneWireStruct, ONEWIRE_CMD_MATCHROM);

	for (i = 0; i < 8; i++) {
		OneWire_WriteByte(OneWireStruct, *(ROM + i));
	}
}

void OneWire_GetFullROM(OneWire_t* OneWireStruct, uint8_t pin_index, uint8_t sensor_index) {
    uint8_t i;
    if (pin_index >= MAX_DS18B20_P || sensor_index >= MAX_DS18B20_PER_PIN) {
        printf("Error: Invalid pin or sensor index\n");
        return;
    }
    // Copy ROM to sensor structure
    for (i = 0; i < 8; i++) {
        ds18b20[pin_index].sensors[sensor_index].addr[i] = OneWireStruct->ROM_NO[i];
        printf("%02X ", OneWireStruct->ROM_NO[i]);
        if ((i + 1) % 8 == 0) {
            printf("\n");
        }
    }
    // Print verification of saved address
//    printf("OneWire_GetFullROM(): Saved address: ");
//    for (i = 0; i < 8; i++) {
//        printf("%02X ", ds18b20[pin_index].sensors[sensor_index].addr[i]);
//    }
//    printf("\n");
}

uint8_t OneWire_CRC8(uint8_t *addr, uint8_t len) {
	uint8_t crc = 0, inbyte, i, mix;

	while (len--) {
		inbyte = *addr++;
		for (i = 8; i; i--) {
			mix = (crc ^ inbyte) & 0x01;
			crc >>= 1;
			if (mix) {
				crc ^= 0x8C;
			}
			inbyte >>= 1;
		}
	}

	/* Return calculated CRC */
	return crc;
}

/* Диагностика физики линии: время нарастания и первые 8 пар бит Search */
void OneWire_Diag(OneWire_t* ow, uint8_t pin_id)
{
	uint16_t rise_us = 0xFFFF;
	char     pairs[8 * 3 + 1];
	uint8_t  presence;

	/* 1) Время нарастания: тянем линию вниз 500 мкс, отпускаем, ждём HIGH */
	taskENTER_CRITICAL();
	ONEWIRE_LOW(ow);
	ONEWIRE_DELAY(500);
	ONEWIRE_INPUT(ow);
	{
		uint32_t cpm   = SystemCoreClock / 1000000U;
		uint32_t start = DWT->CYCCNT;
		while ((DWT->CYCCNT - start) < (1000U * cpm)) {
			if (HAL_GPIO_ReadPin(ow->GPIOx, ow->GPIO_Pin)) {
				rise_us = (uint16_t)((DWT->CYCCNT - start) / cpm);
				break;
			}
		}
	}
	taskEXIT_CRITICAL();
	osDelay(5);

	/* 2) Presence + первые 8 пар (id_bit, cmp_id_bit) команды Search ROM.
	 * Для семейства 0x28 ожидается: 01 01 10 01 10 01 01 01 */
	pairs[0] = '\0';
	presence = OneWire_Reset(ow);
	if (presence == 0) {
		OneWire_WriteByte(ow, ONEWIRE_CMD_SEARCHROM);
		for (uint8_t i = 0; i < 8; i++) {
			uint8_t id  = OneWire_ReadBit(ow);
			uint8_t cmp = OneWire_ReadBit(ow);
			pairs[i * 3]     = id  ? '1' : '0';
			pairs[i * 3 + 1] = cmp ? '1' : '0';
			pairs[i * 3 + 2] = ' ';
			OneWire_WriteBit(ow, id);
		}
		pairs[8 * 3] = '\0';
	}
	OneWire_Reset(ow);   /* прервать поиск */

	printf("[OW-DIAG2] pin %d rise=%s%u us presence=%s pairs=[%s]\r\n",
	       pin_id,
	       rise_us == 0xFFFF ? ">" : "",
	       (unsigned)(rise_us == 0xFFFF ? 1000 : rise_us),
	       presence == 0 ? "YES" : "NO",
	       pairs);
}
