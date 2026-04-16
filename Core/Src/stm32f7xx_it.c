/* USER CODE BEGIN Header */
/**
  ******************************************************************************
  * @file    stm32f7xx_it.c
  * @brief   Interrupt Service Routines.
  ******************************************************************************
  * @attention
  *
  * Copyright (c) 2024 STMicroelectronics.
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
#include "usart_ring.h"
#include "FreeRTOS.h"
#include "task.h"
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
/////////////////// GSM USART ////////////////////
extern volatile gsm_rx_buffer_index_t gsm_rx_buffer_head;
extern volatile gsm_rx_buffer_index_t gsm_rx_buffer_tail;
extern unsigned char gsm_rx_buffer[GSM_RX_BUFFER_SIZE];
/////////////////// DEBUG USART //////////////////// можно удалить после отладки всего
extern volatile dbg_rx_buffer_index_t dbg_rx_buffer_head;
extern volatile dbg_rx_buffer_index_t dbg_rx_buffer_tail;
extern unsigned char dbg_rx_buffer[DBG_RX_BUFFER_SIZE];
/* USER CODE END PV */

/* Private function prototypes -----------------------------------------------*/
/* USER CODE BEGIN PFP */

/* USER CODE END PFP */

/* Private user code ---------------------------------------------------------*/
/* USER CODE BEGIN 0 */

/* ═══════════════════════════════════════════════════════════════════════
 *  FAULT DIAGNOSTICS — прямой вывод в UART3 без HAL (HAL может быть сломан)
 * ═══════════════════════════════════════════════════════════════════════ */

/* Прямая запись символа в USART3 через регистры (без HAL, без прерываний) */
static void fault_putchar(char c) {
  /* USART3 base: 0x40004800 (STM32F767).  TDR offset = 0x28, ISR offset = 0x1C */
  /* Ждём пока TXE (бит 7 ISR) станет 1 — передатчик свободен */
  volatile uint32_t *ISR = (volatile uint32_t *)0x40004800 + (0x1C / 4);
  volatile uint32_t *TDR = (volatile uint32_t *)0x40004800 + (0x28 / 4);
  /* Таймаут ~10 мс при 216 МГц (чтобы не зависнуть если UART сломан) */
  volatile uint32_t timeout = 2000000;
  while (!((*ISR) & (1 << 7)) && --timeout) {}
  *TDR = (uint32_t)c;
}

static void fault_puts(const char *s) {
  while (*s) {
    if (*s == '\n') fault_putchar('\r');
    fault_putchar(*s++);
  }
}

/* Вывод 32-бит числа в HEX */
static void fault_print_hex(uint32_t val) {
  const char hex[] = "0123456789ABCDEF";
  fault_puts("0x");
  for (int i = 28; i >= 0; i -= 4) {
    fault_putchar(hex[(val >> i) & 0xF]);
  }
}

/* Вывод десятичного числа */
static void fault_print_dec(uint32_t val) {
  char buf[12];
  int i = 0;
  if (val == 0) { fault_putchar('0'); return; }
  while (val > 0) { buf[i++] = '0' + (val % 10); val /= 10; }
  while (--i >= 0) fault_putchar(buf[i]);
}

/* Вывод одного регистра: "  NAME = 0x12345678\n" */
static void fault_print_reg(const char *name, uint32_t val) {
  fault_puts("  ");
  fault_puts(name);
  fault_puts(" = ");
  fault_print_hex(val);
  fault_puts("\n");
}

/* Определяет имя региона по адресу PC */
static const char* fault_addr_region(uint32_t addr) {
  if (addr >= 0x08000000 && addr < 0x08200000) return " [FLASH]";
  if (addr >= 0x20000000 && addr < 0x20080000) return " [RAM]";
  if (addr >= 0x40000000 && addr < 0x60000000) return " [PERIPH]";
  if (addr >= 0xE0000000) return " [SYSTEM]";
  return " [UNKNOWN]";
}

/* Декодирование CFSR (Configurable Fault Status Register) */
static void fault_decode_cfsr(uint32_t cfsr) {
  fault_puts("\n  --- CFSR Decoded ---\n");
  /* MemManage (bits 7:0) */
  if (cfsr & (1 << 0)) fault_puts("  [MMFSR] IACCVIOL: Instruction access violation\n");
  if (cfsr & (1 << 1)) fault_puts("  [MMFSR] DACCVIOL: Data access violation\n");
  if (cfsr & (1 << 3)) fault_puts("  [MMFSR] MUNSTKERR: MemManage on unstacking (return)\n");
  if (cfsr & (1 << 4)) fault_puts("  [MMFSR] MSTKERR:  MemManage on stacking (entry)\n");
  if (cfsr & (1 << 5)) fault_puts("  [MMFSR] MLSPERR:  MemManage during FP lazy stacking\n");
  if (cfsr & (1 << 7)) {
    fault_puts("  [MMFSR] MMARVALID: Faulting address in MMFAR\n");
  }
  /* BusFault (bits 15:8) */
  if (cfsr & (1 << 8))  fault_puts("  [BFSR] IBUSERR:   Instruction bus error\n");
  if (cfsr & (1 << 9))  fault_puts("  [BFSR] PRECISERR:  Precise data bus error\n");
  if (cfsr & (1 << 10)) fault_puts("  [BFSR] IMPRECISERR: Imprecise data bus error\n");
  if (cfsr & (1 << 11)) fault_puts("  [BFSR] UNSTKERR:   BusFault on unstacking\n");
  if (cfsr & (1 << 12)) fault_puts("  [BFSR] STKERR:     BusFault on stacking\n");
  if (cfsr & (1 << 13)) fault_puts("  [BFSR] LSPERR:     BusFault during FP lazy stacking\n");
  if (cfsr & (1 << 15)) {
    fault_puts("  [BFSR] BFARVALID:  Faulting address in BFAR\n");
  }
  /* UsageFault (bits 25:16) */
  if (cfsr & (1 << 16)) fault_puts("  [UFSR] UNDEFINSTR: Undefined instruction\n");
  if (cfsr & (1 << 17)) fault_puts("  [UFSR] INVSTATE:   Invalid EPSR.T bit (ARM mode?)\n");
  if (cfsr & (1 << 18)) fault_puts("  [UFSR] INVPC:      Invalid EXC_RETURN\n");
  if (cfsr & (1 << 19)) fault_puts("  [UFSR] NOCP:       Coprocessor not present\n");
  if (cfsr & (1 << 24)) fault_puts("  [UFSR] UNALIGNED:  Unaligned access\n");
  if (cfsr & (1 << 25)) fault_puts("  [UFSR] DIVBYZERO:  Division by zero\n");
}

/* Декодирование HFSR (HardFault Status Register) */
static void fault_decode_hfsr(uint32_t hfsr) {
  fault_puts("\n  --- HFSR Decoded ---\n");
  if (hfsr & (1 << 1))  fault_puts("  VECTTBL: Vector table read error on exception\n");
  if (hfsr & (1 << 30)) fault_puts("  FORCED:  Escalated from configurable fault (see CFSR)\n");
  if (hfsr & (1 << 31)) fault_puts("  DEBUGEVT: Debug event triggered fault\n");
}

/*
 * Главная функция диагностики.
 * Вызывается из всех Fault Handlers.
 * stack_ptr — указатель на стек-фрейм исключения (8 слов).
 */
static void fault_report(const char *fault_name, uint32_t *stack_ptr) {
  /* Регистры системы управления отказами Cortex-M7 */
  volatile uint32_t cfsr  = *(volatile uint32_t *)0xE000ED28;  /* CFSR  */
  volatile uint32_t hfsr  = *(volatile uint32_t *)0xE000ED2C;  /* HFSR  */
  volatile uint32_t mmfar = *(volatile uint32_t *)0xE000ED34;  /* MMFAR */
  volatile uint32_t bfar  = *(volatile uint32_t *)0xE000ED38;  /* BFAR  */
  volatile uint32_t afsr  = *(volatile uint32_t *)0xE000ED3C;  /* AFSR  */

  fault_puts("\n\n");
  fault_puts("╔══════════════════════════════════════════════════════════════╗\n");
  fault_puts("║            !!! SYSTEM FAULT DETECTED !!!                    ║\n");
  fault_puts("╚══════════════════════════════════════════════════════════════╝\n");
  fault_puts("  Fault Type: ");
  fault_puts(fault_name);
  fault_puts("\n");

  /* ── Стек-фрейм исключения (CPU сохранил при входе в ISR) ── */
  if (stack_ptr != NULL) {
    fault_puts("\n  === Exception Stack Frame ===");
    fault_puts("\n");
    fault_print_reg("R0 ", stack_ptr[0]);
    fault_print_reg("R1 ", stack_ptr[1]);
    fault_print_reg("R2 ", stack_ptr[2]);
    fault_print_reg("R3 ", stack_ptr[3]);
    fault_print_reg("R12", stack_ptr[4]);
    fault_print_reg("LR ", stack_ptr[5]);
    fault_puts("  PC  = ");
    fault_print_hex(stack_ptr[6]);
    fault_puts(fault_addr_region(stack_ptr[6]));
    fault_puts("  <<< FAULTING INSTRUCTION\n");
    fault_print_reg("PSR", stack_ptr[7]);

    /* Ретроспектива: куда собиралась вернуться функция */
    fault_puts("  LR  = ");
    fault_print_hex(stack_ptr[5]);
    fault_puts(fault_addr_region(stack_ptr[5]));
    fault_puts("  <<< CALLER\n");
  } else {
    fault_puts("  WARNING: stack_ptr is NULL — cannot read frame\n");
  }

  /* ── Указатели стека ── */
  fault_puts("\n  === Stack Pointers ===");
  fault_puts("\n");
  uint32_t msp_val, psp_val, control_val;
  __asm volatile ("MRS %0, MSP" : "=r" (msp_val));
  __asm volatile ("MRS %0, PSP" : "=r" (psp_val));
  __asm volatile ("MRS %0, CONTROL" : "=r" (control_val));
  fault_print_reg("MSP    ", msp_val);
  fault_print_reg("PSP    ", psp_val);
  fault_print_reg("CONTROL", control_val);
  fault_puts("  Active SP: ");
  fault_puts((control_val & 2) ? "PSP (Thread mode)" : "MSP (Handler mode)");
  fault_puts("\n");

  /* ── Регистры управления отказами ── */
  fault_puts("\n  === Fault Status Registers ===");
  fault_puts("\n");
  fault_print_reg("CFSR ", cfsr);
  fault_print_reg("HFSR ", hfsr);
  fault_print_reg("MMFAR", mmfar);
  fault_print_reg("BFAR ", bfar);
  fault_print_reg("AFSR ", afsr);

  /* Декодирование битовых полей */
  if (cfsr != 0) fault_decode_cfsr(cfsr);
  if (hfsr != 0) fault_decode_hfsr(hfsr);

  /* Адрес виновника (если доступен) */
  if (cfsr & (1 << 7)) {
    fault_puts("\n  >>> MemManage Fault Address: ");
    fault_print_hex(mmfar);
    fault_puts(fault_addr_region(mmfar));
    fault_puts("\n");
  }
  if (cfsr & (1 << 15)) {
    fault_puts("\n  >>> BusFault Address: ");
    fault_print_hex(bfar);
    fault_puts(fault_addr_region(bfar));
    fault_puts("\n");
  }

  /* ── Информация о FreeRTOS ── */
  fault_puts("\n  === FreeRTOS Info ===");
  fault_puts("\n");

  /* Имя текущей задачи (может быть повреждено, оборачиваем) */
  TaskHandle_t current_task = xTaskGetCurrentTaskHandle();
  if (current_task != NULL) {
    const char *task_name = pcTaskGetName(current_task);
    if (task_name != NULL &&
        (uint32_t)task_name >= 0x20000000 &&
        (uint32_t)task_name < 0x20080000) {
      fault_puts("  Current Task: ");
      /* Безопасный вывод: макс 16 символов */
      for (int i = 0; i < 16 && task_name[i] != '\0'; i++) {
        char c = task_name[i];
        if (c >= 0x20 && c <= 0x7E)
          fault_putchar(c);
        else
          fault_putchar('?');
      }
      fault_puts("\n");
    } else {
      fault_puts("  Current Task: <name ptr corrupt>\n");
    }
  } else {
    fault_puts("  Current Task: <none / ISR>\n");
  }

  /* FreeRTOS heap info */
  fault_puts("  FreeRTOS Heap Free:     ");
  fault_print_dec(xPortGetFreeHeapSize());
  fault_puts(" bytes\n");
  fault_puts("  FreeRTOS Heap Min Ever: ");
  fault_print_dec(xPortGetMinimumEverFreeHeapSize());
  fault_puts(" bytes\n");

  /* ── Stack High Water Mark текущей задачи ── */
  if (current_task != NULL) {
    UBaseType_t hwm = uxTaskGetStackHighWaterMark(current_task);
    fault_puts("  Stack HWM (words left): ");
    fault_print_dec((uint32_t)hwm);
    fault_puts("\n");
    if (hwm == 0) {
      fault_puts("  >>> STACK OVERFLOW CONFIRMED! <<<\n");
    } else if (hwm < 32) {
      fault_puts("  >>> STACK NEARLY EXHAUSTED! <<<\n");
    }
  }

  /* ── Подсказки ── */
  fault_puts("\n  === How to debug ===");
  fault_puts("\n");
  fault_puts("  1. Look at PC value — this is the faulting instruction\n");
  fault_puts("  2. In STM32CubeIDE: Debug > Disassembly > Go to address [PC]\n");
  fault_puts("  3. Or run: arm-none-eabi-addr2line -e firmware.elf [PC] [LR]\n");
  fault_puts("  4. CFSR bits tell you the TYPE of fault\n");
  fault_puts("  5. BFAR/MMFAR tell you the TARGET address that caused it\n");

  fault_puts("\n══════════════════════════════════════════════════════════════\n");
  fault_puts("  System halted. Reset to continue.\n");
  fault_puts("══════════════════════════════════════════════════════════════\n\n");
}

/*
 * ASM-обёртка: извлекает PSP или MSP в зависимости от EXC_RETURN.LR[2]
 * и передаёт как аргумент в C-функцию.
 */
__attribute__((naked))
static void fault_handler_asm(void) {
  __asm volatile (
    "TST   LR, #4       \n"   /* Проверяем бит 2 EXC_RETURN */
    "ITE   EQ           \n"
    "MRSEQ R0, MSP      \n"   /* Если 0 → использовался MSP */
    "MRSNE R0, PSP      \n"   /* Если 1 → использовался PSP */
    "B     fault_handler_c \n" /* Переходим в C-обработчик */
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */

/* USER CODE END 0 */

/* External variables --------------------------------------------------------*/
extern HCD_HandleTypeDef hhcd_USB_OTG_FS;
extern ETH_HandleTypeDef heth;
extern UART_HandleTypeDef huart2;
extern TIM_HandleTypeDef htim6;

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
  fault_puts("\n!!! NMI_Handler triggered !!!\n");
  /* NMI обычно вызывается Clock Security System (CSS) */
  fault_puts("  Possible cause: HSE oscillator failure (CSS)\n");
  /* Мигание LD1 (зелёный) + LD3 (красный) — паттерн NMI */
  while (1) {
    HAL_GPIO_TogglePin(LD1_GPIO_Port, LD1_Pin);
    HAL_GPIO_TogglePin(LD3_GPIO_Port, LD3_Pin);
    for(volatile uint32_t i = 0; i < 500000; i++);
  }
  /* USER CODE END NonMaskableInt_IRQn 1 */
}

/**
  * @brief This function handles Hard fault interrupt.
  */
/* C-обработчик, вызывается из ASM-обёртки с указателем на стек-фрейм */
void fault_handler_c(uint32_t *stack_frame);
void fault_handler_c(uint32_t *stack_frame) {
  /* Определяем тип fault по регистрам */
  volatile uint32_t cfsr = *(volatile uint32_t *)0xE000ED28;
  volatile uint32_t hfsr = *(volatile uint32_t *)0xE000ED2C;
  const char *name = "HardFault";
  if (hfsr & (1 << 30)) {
    /* FORCED — escalated из configurable fault */
    if (cfsr & 0x000000FF) name = "HardFault (escalated MemManage)";
    else if (cfsr & 0x0000FF00) name = "HardFault (escalated BusFault)";
    else if (cfsr & 0x00FF0000) name = "HardFault (escalated UsageFault)";
    else name = "HardFault (FORCED, unknown sub-fault)";
  }
  fault_report(name, stack_frame);
  /* Мигание LD3 (красный) быстро — паттерн HardFault */
  while (1) {
    HAL_GPIO_TogglePin(LD3_GPIO_Port, LD3_Pin);
    for(volatile uint32_t i = 0; i < 200000; i++);
  }
}

void HardFault_Handler(void)
{
  /* USER CODE BEGIN HardFault_IRQn 0 */
  fault_handler_asm();
  /* USER CODE END HardFault_IRQn 0 */
  while (1)
  {
    /* USER CODE BEGIN W1_HardFault_IRQn 0 */
    /* USER CODE END W1_HardFault_IRQn 0 */
  }
}

/**
  * @brief This function handles Memory management fault.
  */
void MemManage_Handler(void)
{
  /* USER CODE BEGIN MemoryManagement_IRQn 0 */
  /* Извлекаем стек-фрейм */
  uint32_t *sp;
  __asm volatile ("TST LR, #4 \n ITE EQ \n MRSEQ %0, MSP \n MRSNE %0, PSP" : "=r" (sp));
  fault_report("MemManage Fault (MPU violation / stack overflow)", sp);
  /* Мигание LD3 медленно — паттерн MemManage */
  while (1) {
    HAL_GPIO_TogglePin(LD3_GPIO_Port, LD3_Pin);
    for(volatile uint32_t i = 0; i < 1000000; i++);
  }
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
  uint32_t *sp;
  __asm volatile ("TST LR, #4 \n ITE EQ \n MRSEQ %0, MSP \n MRSNE %0, PSP" : "=r" (sp));
  fault_report("BusFault (invalid memory access)", sp);
  /* Мигание LD2 (синий) — паттерн BusFault */
  while (1) {
    HAL_GPIO_TogglePin(LD2_GPIO_Port, LD2_Pin);
    for(volatile uint32_t i = 0; i < 300000; i++);
  }
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
  uint32_t *sp;
  __asm volatile ("TST LR, #4 \n ITE EQ \n MRSEQ %0, MSP \n MRSNE %0, PSP" : "=r" (sp));
  fault_report("UsageFault (illegal instruction / div by zero / unaligned)", sp);
  /* Мигание LD1 (зелёный) — паттерн UsageFault */
  while (1) {
    HAL_GPIO_TogglePin(LD1_GPIO_Port, LD1_Pin);
    for(volatile uint32_t i = 0; i < 300000; i++);
  }
  /* USER CODE END UsageFault_IRQn 0 */
  while (1)
  {
    /* USER CODE BEGIN W1_UsageFault_IRQn 0 */
    /* USER CODE END W1_UsageFault_IRQn 0 */
  }
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

/******************************************************************************/
/* STM32F7xx Peripheral Interrupt Handlers                                    */
/* Add here the Interrupt Handlers for the used peripherals.                  */
/* For the available peripheral interrupt handler names,                      */
/* please refer to the startup file (startup_stm32f7xx.s).                    */
/******************************************************************************/

/**
  * @brief This function handles USART2 global interrupt.
  */
void USART2_IRQHandler(void)
{
  /* USER CODE BEGIN USART2_IRQn 0 */
// ВАРИАНТ - 1
//	if(((huart2.Instance->ISR & USART_ISR_RXNE) != RESET) && ((huart2.Instance->CR1 & USART_CR1_RXNEIE) != RESET))
//	{
//	   uint8_t rbyte = (uint8_t)(huart2.Instance->RDR & (uint8_t)0x00FF); // читает байт из регистра
//	   gsm_rx_buffer_index_t i = (uint16_t)(gsm_rx_buffer_head + 1) % GSM_RX_BUFFER_SIZE;
//
//	   if(i != gsm_rx_buffer_tail)
//	   {
//	    gsm_rx_buffer[gsm_rx_buffer_head] = rbyte;
//	    gsm_rx_buffer_head = i;
//	   }
//	}
//	return;
// ВАРИАНТ - 2
    // Проверка на ошибки
    if(huart2.Instance->ISR & (USART_ISR_ORE | USART_ISR_NE | USART_ISR_FE | USART_ISR_PE))
    {
        // Сброс флагов ошибок
        huart2.Instance->ICR = USART_ICR_ORECF | USART_ICR_NCF |
                              USART_ICR_FECF | USART_ICR_PECF;
    }

    if(((huart2.Instance->ISR & USART_ISR_RXNE) != RESET) &&
       ((huart2.Instance->CR1 & USART_CR1_RXNEIE) != RESET))
    {
        uint8_t rbyte = (uint8_t)(huart2.Instance->RDR & (uint8_t)0x00FF);
        gsm_rx_buffer_index_t i = (uint16_t)(gsm_rx_buffer_head + 1) % GSM_RX_BUFFER_SIZE;

        if(i != gsm_rx_buffer_tail)
        {
            gsm_rx_buffer[gsm_rx_buffer_head] = rbyte;
            gsm_rx_buffer_head = i;
        }
        else
        {
            // Буфер переполнен
            // Можно добавить обработку этой ситуации
        }
    }

  /* USER CODE END USART2_IRQn 0 */
  HAL_UART_IRQHandler(&huart2);
  /* USER CODE BEGIN USART2_IRQn 1 */

  /* USER CODE END USART2_IRQn 1 */
}

/**
  * @brief This function handles TIM6 global interrupt, DAC1 and DAC2 underrun error interrupts.
  */
void TIM6_DAC_IRQHandler(void)
{
  /* USER CODE BEGIN TIM6_DAC_IRQn 0 */

  /* USER CODE END TIM6_DAC_IRQn 0 */
  HAL_TIM_IRQHandler(&htim6);
  /* USER CODE BEGIN TIM6_DAC_IRQn 1 */

  /* USER CODE END TIM6_DAC_IRQn 1 */
}

/**
  * @brief This function handles Ethernet global interrupt.
  */
//void ETH_IRQHandler(void)
//{
//  /* USER CODE BEGIN ETH_IRQn 0 */
////
//  /* USER CODE END ETH_IRQn 0 */
//  HAL_ETH_IRQHandler(&heth);
//  /* USER CODE BEGIN ETH_IRQn 1 */
////
//  /* USER CODE END ETH_IRQn 1 */
//}

/**
  * @brief This function handles USB On The Go FS global interrupt.
  */
void OTG_FS_IRQHandler(void)
{
  /* USER CODE BEGIN OTG_FS_IRQn 0 */

  /* USER CODE END OTG_FS_IRQn 0 */
  HAL_HCD_IRQHandler(&hhcd_USB_OTG_FS);
  /* USER CODE BEGIN OTG_FS_IRQn 1 */

  /* USER CODE END OTG_FS_IRQn 1 */
}

/* USER CODE BEGIN 1 */

/* USER CODE END 1 */
