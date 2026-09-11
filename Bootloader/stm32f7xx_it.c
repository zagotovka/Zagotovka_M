/* USER CODE BEGIN Header */
/**
  ******************************************************************************
  * @file    stm32f7xx_it.c
  * @brief   Interrupt Service Routines.
  ******************************************************************************
  * @attention
  *
  * Copyright (c) 2026 STMicroelectronics.
  * All rights reserved.
  *
  * This software is licensed under terms that can be found in the LICENSE file
  * in the root directory of this software component.
  * If no LICENSE file comes with this software, it is provided AS-IS.
  *
  ******************************************************************************
  */
/* USER CODE END Header */

/* Includes ------------------------------------------------------------------*/
#include "main.h"
#include "stm32f7xx_it.h"
/* Private includes ----------------------------------------------------------*/
/* USER CODE BEGIN Includes */
#include <string.h>
#include <stdio.h>
/* USER CODE END Includes */

/* Private typedef -----------------------------------------------------------*/
/* USER CODE BEGIN TD */

/* USER CODE END TD */

/* Private define ------------------------------------------------------------*/
/* USER CODE BEGIN PD */

/* USER CODE END PD */

/* Private macro -------------------------------------------------------------*/
/* USER CODE BEGIN PM */

/* USER CODE END PM */

/* Private variables ---------------------------------------------------------*/
/* USER CODE BEGIN PV */
extern UART_HandleTypeDef huart3;

/* --------------------------------------------------------------------------
 * HardFault diagnostic support
 * -------------------------------------------------------------------------- */
static void fault_puts(const char *s)
{
    HAL_UART_Transmit(&huart3,
                      (uint8_t *)s,
                      (uint16_t)strlen(s),
                      1000);
}
static void fault_print_hex(uint32_t v)
{
    char buf[11];
    snprintf(buf, sizeof(buf), "0x%08lX",
             (unsigned long)v);
    fault_puts(buf);
}
static void fault_print_dec(uint32_t v) __attribute__((used));
static void fault_print_dec(uint32_t v)
{
    char buf[12];
    snprintf(buf, sizeof(buf), "%lu",
             (unsigned long)v);
    fault_puts(buf);
}

/* Побитовый декод статусных регистров_fault: печатает установленные биты
 * с их номерами (десятичными, через fault_print_dec) и мнемониками. */
static void fault_decode_bits(const char *label, uint32_t bits,
                              const char *const *names, uint32_t nbits)
{
    fault_puts(label);
    if (bits == 0)
    {
        fault_puts(" none\r\n");
        return;
    }
    for (uint32_t i = 0; i < nbits; i++)
    {
        if (((bits >> i) & 1UL) != 0UL && names[i] != 0)
        {
            fault_puts(" bit");
            fault_print_dec(i);
            fault_puts("(");
            fault_puts(names[i]);
            fault_puts(")");
        }
    }
    fault_puts("\r\n");
}

static const char *const mmfsr_bit_names[8] = {
        "IACCVIOL", "DACCVIOL", 0, "MUNSTKERR",
        "MSTKERR", "MLSPERR", 0, "MMARVALID" };
static const char *const bfsr_bit_names[8] = {
        "IBUSERR", "PRECISERR", "IMPRECISERR", "UNSTKERR",
        "STKERR", "LSPERR", 0, "BFARVALID" };
static const char *const ufsr_bit_names[16] = {
        "UNDEFINSTR", "INVSTATE", "INVPC", "NOCP",
        0, 0, 0, 0,
        "UNALIGNED", "DIVBYZERO", 0, 0, 0, 0, 0, 0 };
static void fault_report(uint32_t *stack_frame,
                         uint32_t *r4_r11,
                         uint32_t exc_return)
{
    fault_puts("\r\n\r\n");
    fault_puts("========== HARDFAULT ==========\r\n");
    fault_puts("EXC_RETURN = ");
    fault_print_hex(exc_return);
    fault_puts("\r\n");
    fault_puts("Stack frame = ");
    fault_print_hex((uint32_t)stack_frame);
    fault_puts("\r\n");
    fault_puts("\r\n[Exception Stack Frame]\r\n");
    fault_puts("R0   = ");
    fault_print_hex(stack_frame[0]);
    fault_puts("\r\n");
    fault_puts("R1   = ");
    fault_print_hex(stack_frame[1]);
    fault_puts("\r\n");
    fault_puts("R2   = ");
    fault_print_hex(stack_frame[2]);
    fault_puts("\r\n");
    fault_puts("R3   = ");
    fault_print_hex(stack_frame[3]);
    fault_puts("\r\n");
    fault_puts("R12  = ");
    fault_print_hex(stack_frame[4]);
    fault_puts("\r\n");
    fault_puts("LR   = ");
    fault_print_hex(stack_frame[5]);
    fault_puts("\r\n");
    fault_puts("PC   = ");
    fault_print_hex(stack_frame[6]);
    fault_puts("\r\n");
    fault_puts("xPSR = ");
    fault_print_hex(stack_frame[7]);
    fault_puts("\r\n");
    fault_puts("\r\n[Saved R4-R11]\r\n");
    for (uint32_t r = 4; r <= 11; r++)
    {
        fault_puts("R");
        fault_print_dec(r);
        fault_puts(r < 10 ? "   = " : "  = ");
        fault_print_hex(r4_r11[r - 4]);
        fault_puts("\r\n");
    }
    fault_puts("\r\n[Stack dump]\r\n");
    for (uint32_t i = 0; i < 16; i++)
    {
        if ((i % 4) == 0)
        {
            fault_puts("SP+");
            fault_print_dec(i * 4);
            fault_puts(": ");
        }
        fault_print_hex(stack_frame[i]);
        fault_puts(" ");
        if ((i % 4) == 3)
            fault_puts("\r\n");
    }
    fault_puts("\r\n[Fault status]\r\n");
    fault_puts("CFSR = ");
    fault_print_hex(SCB->CFSR);
    fault_puts("\r\n");
    fault_decode_bits("MMFSR", SCB->CFSR & 0xFFUL,
                      mmfsr_bit_names, 8);
    fault_decode_bits("BFSR", (SCB->CFSR >> 8) & 0xFFUL,
                      bfsr_bit_names, 8);
    fault_decode_bits("UFSR", (SCB->CFSR >> 16) & 0xFFFFUL,
                      ufsr_bit_names, 16);
    fault_puts("HFSR = ");
    fault_print_hex(SCB->HFSR);
    fault_puts("\r\n");
    fault_puts("DFSR = ");
    fault_print_hex(SCB->DFSR);
    fault_puts("\r\n");
    fault_puts("AFSR = ");
    fault_print_hex(SCB->AFSR);
    fault_puts("\r\n");
    fault_puts("MMFAR = ");
    fault_print_hex(SCB->MMFAR);
    fault_puts("\r\n");
    fault_puts("BFAR = ");
    fault_print_hex(SCB->BFAR);
    fault_puts("\r\n");
    fault_puts("\r\n================================\r\n");
    fault_puts("FAULT HALTED\r\n");
    while (1)
    {
        __NOP();
    }
}
__attribute__((naked))
static void fault_handler_asm(void)
{
    __asm volatile
    (
        "tst     lr, #4                  \n"
        "ite     eq                      \n"
        "mrseq   r0, msp                 \n"
        "mrsne   r0, psp                 \n"
        "push    {r4-r11}                \n"
        "mov     r1, sp                  \n"
        "mov     r2, lr                  \n"
        "b       fault_handler_c         \n"
    );
}
static void fault_handler_c(uint32_t *stack_frame,
                            uint32_t *r4_r11,
                            uint32_t exc_return) __attribute__((used));
static void fault_handler_c(uint32_t *stack_frame,
                            uint32_t *r4_r11,
                            uint32_t exc_return)
{
    fault_report(stack_frame, r4_r11, exc_return);
}
/* USER CODE END PV */

/* Private function prototypes -----------------------------------------------*/
/* USER CODE BEGIN PFP */

/* USER CODE END PFP */

/* Private user code ---------------------------------------------------------*/
/* USER CODE BEGIN 0 */

/* USER CODE END 0 */

/* External variables --------------------------------------------------------*/

/* USER CODE BEGIN EV */

/* USER CODE END EV */

/******************************************************************************/
/*           Cortex-M7 Processor Interruption and Exception Handlers          */
/******************************************************************************/
/**
  * @brief This function handles Non maskable interrupt.
  */
void NMI_Handler(void)
{
  /* USER CODE BEGIN NonMaskableInt_IRQn 0 */

  /* USER CODE END NonMaskableInt_IRQn 0 */
  /* USER CODE BEGIN NonMaskableInt_IRQn 1 */
   while (1)
  {
  }
  /* USER CODE END NonMaskableInt_IRQn 1 */
}

/**
  * @brief This function handles Hard fault interrupt.
  */
void HardFault_Handler(void)
{
  /* USER CODE BEGIN HardFault_IRQn 0 */
	fault_handler_asm();
  /* USER CODE END HardFault_IRQn 0 */
  while (1)
  {
    /* USER CODE BEGIN W1_HardFault_IRQn 0 */
	  __NOP();
    /* USER CODE END W1_HardFault_IRQn 0 */
  }
}

/**
  * @brief This function handles Memory management fault.
  */
void MemManage_Handler(void)
{
  /* USER CODE BEGIN MemoryManagement_IRQn 0 */

  /* USER CODE END MemoryManagement_IRQn 0 */
  while (1)
  {
    /* USER CODE BEGIN W1_MemoryManagement_IRQn 0 */
    /* USER CODE END W1_MemoryManagement_IRQn 0 */
  }
}

/**
  * @brief This function handles Pre-fetch fault, memory access fault.
  */
void BusFault_Handler(void)
{
  /* USER CODE BEGIN BusFault_IRQn 0 */

  /* USER CODE END BusFault_IRQn 0 */
  while (1)
  {
    /* USER CODE BEGIN W1_BusFault_IRQn 0 */
    /* USER CODE END W1_BusFault_IRQn 0 */
  }
}

/**
  * @brief This function handles Undefined instruction or illegal state.
  */
void UsageFault_Handler(void)
{
  /* USER CODE BEGIN UsageFault_IRQn 0 */

  /* USER CODE END UsageFault_IRQn 0 */
  while (1)
  {
    /* USER CODE BEGIN W1_UsageFault_IRQn 0 */
    /* USER CODE END W1_UsageFault_IRQn 0 */
  }
}

/**
  * @brief This function handles System service call via SWI instruction.
  */
void SVC_Handler(void)
{
  /* USER CODE BEGIN SVCall_IRQn 0 */

  /* USER CODE END SVCall_IRQn 0 */
  /* USER CODE BEGIN SVCall_IRQn 1 */

  /* USER CODE END SVCall_IRQn 1 */
}

/**
  * @brief This function handles Debug monitor.
  */
void DebugMon_Handler(void)
{
  /* USER CODE BEGIN DebugMonitor_IRQn 0 */

  /* USER CODE END DebugMonitor_IRQn 0 */
  /* USER CODE BEGIN DebugMonitor_IRQn 1 */

  /* USER CODE END DebugMonitor_IRQn 1 */
}

/**
  * @brief This function handles Pendable request for system service.
  */
void PendSV_Handler(void)
{
  /* USER CODE BEGIN PendSV_IRQn 0 */

  /* USER CODE END PendSV_IRQn 0 */
  /* USER CODE BEGIN PendSV_IRQn 1 */

  /* USER CODE END PendSV_IRQn 1 */
}

/**
  * @brief This function handles System tick timer.
  */
void SysTick_Handler(void)
{
  /* USER CODE BEGIN SysTick_IRQn 0 */

  /* USER CODE END SysTick_IRQn 0 */
  HAL_IncTick();
  /* USER CODE BEGIN SysTick_IRQn 1 */

  /* USER CODE END SysTick_IRQn 1 */
}

/******************************************************************************/
/* STM32F7xx Peripheral Interrupt Handlers                                    */
/* Add here the Interrupt Handlers for the used peripherals.                  */
/* For the available peripheral interrupt handler names,                      */
/* please refer to the startup file (startup_stm32f7xx.s).                    */
/******************************************************************************/

/* USER CODE BEGIN 1 */

/* USER CODE END 1 */
