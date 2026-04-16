/* USER CODE BEGIN Header */
/**
  ******************************************************************************
  * File Name          : freertos.c
  * Description        : Code for freertos applications
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
#include "FreeRTOS.h"
#include "task.h"
#include "main.h"

/* Private includes ----------------------------------------------------------*/
/* USER CODE BEGIN Includes */

/* USER CODE END Includes */

/* Private typedef -----------------------------------------------------------*/
/* USER CODE BEGIN PTD */

/* USER CODE END PTD */

/* Private define ------------------------------------------------------------*/
/* USER CODE BEGIN PD */

/* USER CODE END PD */

/* Private macro -------------------------------------------------------------*/
/* USER CODE BEGIN PM */

/* USER CODE END PM */

/* Private variables ---------------------------------------------------------*/
/* USER CODE BEGIN Variables */

/* USER CODE END Variables */

/* Private function prototypes -----------------------------------------------*/
/* USER CODE BEGIN FunctionPrototypes */

/* USER CODE END FunctionPrototypes */

/* Private application code --------------------------------------------------*/
/* USER CODE BEGIN Application */

/* ═══════════════════════════════════════════════════════════════════════
 *  Stack Overflow Hook — вызывается FreeRTOS при обнаружении переполнения.
 *  Использует прямой вывод в USART3 (без HAL, без printf — они могут быть
 *  недоступны при повреждённом стеке).
 * ═══════════════════════════════════════════════════════════════════════ */
static void sof_putchar(char c) {
  volatile uint32_t *ISR = (volatile uint32_t *)(0x40004800 + 0x1C);
  volatile uint32_t *TDR = (volatile uint32_t *)(0x40004800 + 0x28);
  volatile uint32_t t = 2000000;
  while (!((*ISR) & (1 << 7)) && --t) {}
  *TDR = (uint32_t)c;
}

static void sof_puts(const char *s) {
  while (*s) {
    if (*s == '\n') sof_putchar('\r');
    sof_putchar(*s++);
  }
}

void vApplicationStackOverflowHook(TaskHandle_t xTask, signed char *pcTaskName) {
  (void)xTask;

  sof_puts("\n\n");
  sof_puts("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n");
  sof_puts("!!! STACK OVERFLOW DETECTED by FreeRTOS !!!\n");
  sof_puts("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n");
  sof_puts("  Task: ");

  /* Безопасный вывод имени задачи (макс 16 символов) */
  if (pcTaskName != NULL &&
      (uint32_t)pcTaskName >= 0x20000000 &&
      (uint32_t)pcTaskName < 0x20080000) {
    for (int i = 0; i < 16 && pcTaskName[i] != '\0'; i++) {
      char c = pcTaskName[i];
      if (c >= 0x20 && c <= 0x7E)
        sof_putchar(c);
      else
        sof_putchar('?');
    }
  } else {
    sof_puts("<corrupted>");
  }

  sof_puts("\n\n");
  sof_puts("  SOLUTION: increase .stack_size for this task in main.c\n");
  sof_puts("  System halted. Red+Green LEDs alternate.\n\n");

  __disable_irq();
  while (1) {
    /* Красный и зелёный мигают поочерёдно — уникальный паттерн Stack Overflow */
    HAL_GPIO_TogglePin(LD1_GPIO_Port, LD1_Pin);
    HAL_GPIO_TogglePin(LD3_GPIO_Port, LD3_Pin);
    for(volatile uint32_t i = 0; i < 300000; i++);
    HAL_GPIO_TogglePin(LD1_GPIO_Port, LD1_Pin);
    HAL_GPIO_TogglePin(LD3_GPIO_Port, LD3_Pin);
    for(volatile uint32_t i = 0; i < 300000; i++);
  }
}

/* USER CODE END Application */

