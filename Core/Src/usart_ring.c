/*
 * usart_ring.c
 *
 *  Created on: 19 авг. 2019 г.
 *      Author: dima
 */

#include "usart_ring.h"
#include "stm32f7xx.h"  /* __DMB() */

/////////////////// GSM USART /////////////////////
volatile gsm_rx_buffer_index_t gsm_rx_buffer_head = 0;
volatile gsm_rx_buffer_index_t gsm_rx_buffer_tail = 0;
uint8_t gsm_rx_buffer[GSM_RX_BUFFER_SIZE] = {0,};

int16_t gsm_available(void)
{
	gsm_rx_buffer_index_t h = gsm_rx_buffer_head;  /* single volatile read */
	gsm_rx_buffer_index_t t = gsm_rx_buffer_tail;
	return ((uint16_t)(GSM_RX_BUFFER_SIZE + h - t)) % GSM_RX_BUFFER_SIZE;
}

int16_t gsm_read(void)
{
	gsm_rx_buffer_index_t h = gsm_rx_buffer_head;  /* single volatile read */
	gsm_rx_buffer_index_t t = gsm_rx_buffer_tail;

	if (h == t)
	{
		printf("Buffer empty!\r\n");
		return -1;
	}

	__DMB();  /* barrier: гарантирует видимость данных после чтения head */
	unsigned char c = gsm_rx_buffer[t];
	__DMB();  /* barrier: данные прочитаны ДО обновления tail */
	gsm_rx_buffer_tail = (gsm_rx_buffer_index_t)(t + 1) % GSM_RX_BUFFER_SIZE;
	return c;
}

/////////////////// DEBUG USART //////////////////// можно удалить после отладки всего

volatile dbg_rx_buffer_index_t dbg_rx_buffer_head = 0;
volatile dbg_rx_buffer_index_t dbg_rx_buffer_tail = 0;
uint8_t dbg_rx_buffer[DBG_RX_BUFFER_SIZE] = {0,};

int16_t dbg_available(void)
{
	return ((uint16_t)(DBG_RX_BUFFER_SIZE + dbg_rx_buffer_head - dbg_rx_buffer_tail)) % DBG_RX_BUFFER_SIZE;
}

int16_t dbg_read(void)
{
	if(dbg_rx_buffer_head == dbg_rx_buffer_tail)
	{
		return -1;
	}
	else
	{
		uint8_t c = dbg_rx_buffer[dbg_rx_buffer_tail];
		dbg_rx_buffer_tail = (dbg_rx_buffer_index_t)(dbg_rx_buffer_tail + 1) % DBG_RX_BUFFER_SIZE;
		return c;
	}
}
