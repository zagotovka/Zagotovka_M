################################################################################
# Automatically-generated file. Do not edit!
# Toolchain: GNU Tools for STM32 (12.3.rel1)
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../Core/Src/compat_ota.c \
../Core/Src/db.c \
../Core/Src/ds18b20.c \
../Core/Src/dtcm_alloc.c \
../Core/Src/freertos.c \
../Core/Src/fw_meta.c \
../Core/Src/gsm.c \
../Core/Src/logger.c \
../Core/Src/lwdtc.c \
../Core/Src/main.c \
../Core/Src/mongoose.c \
../Core/Src/multi_button.c \
../Core/Src/net.c \
../Core/Src/onewire.c \
../Core/Src/packed_fs.c \
../Core/Src/setings.c \
../Core/Src/stm32f7xx_hal_msp.c \
../Core/Src/stm32f7xx_hal_timebase_tim.c \
../Core/Src/stm32f7xx_it.c \
../Core/Src/syscalls.c \
../Core/Src/sysmem.c \
../Core/Src/system_stm32f7xx.c \
../Core/Src/usart_ring.c \
../Core/Src/zagotovka.c \
../Core/Src/zbee_vbtn.c 

OBJS += \
./Core/Src/compat_ota.o \
./Core/Src/db.o \
./Core/Src/ds18b20.o \
./Core/Src/dtcm_alloc.o \
./Core/Src/freertos.o \
./Core/Src/fw_meta.o \
./Core/Src/gsm.o \
./Core/Src/logger.o \
./Core/Src/lwdtc.o \
./Core/Src/main.o \
./Core/Src/mongoose.o \
./Core/Src/multi_button.o \
./Core/Src/net.o \
./Core/Src/onewire.o \
./Core/Src/packed_fs.o \
./Core/Src/setings.o \
./Core/Src/stm32f7xx_hal_msp.o \
./Core/Src/stm32f7xx_hal_timebase_tim.o \
./Core/Src/stm32f7xx_it.o \
./Core/Src/syscalls.o \
./Core/Src/sysmem.o \
./Core/Src/system_stm32f7xx.o \
./Core/Src/usart_ring.o \
./Core/Src/zagotovka.o \
./Core/Src/zbee_vbtn.o 

C_DEPS += \
./Core/Src/compat_ota.d \
./Core/Src/db.d \
./Core/Src/ds18b20.d \
./Core/Src/dtcm_alloc.d \
./Core/Src/freertos.d \
./Core/Src/fw_meta.d \
./Core/Src/gsm.d \
./Core/Src/logger.d \
./Core/Src/lwdtc.d \
./Core/Src/main.d \
./Core/Src/mongoose.d \
./Core/Src/multi_button.d \
./Core/Src/net.d \
./Core/Src/onewire.d \
./Core/Src/packed_fs.d \
./Core/Src/setings.d \
./Core/Src/stm32f7xx_hal_msp.d \
./Core/Src/stm32f7xx_hal_timebase_tim.d \
./Core/Src/stm32f7xx_it.d \
./Core/Src/syscalls.d \
./Core/Src/sysmem.d \
./Core/Src/system_stm32f7xx.d \
./Core/Src/usart_ring.d \
./Core/Src/zagotovka.d \
./Core/Src/zbee_vbtn.d 


# Each subdirectory must supply rules for building sources it contributes
Core/Src/%.o Core/Src/%.su Core/Src/%.cyclo: ../Core/Src/%.c Core/Src/subdir.mk
	arm-none-eabi-gcc "$<" -mcpu=cortex-m7 -std=gnu11 -DUSE_HAL_DRIVER -DFW_TARGET_BANK=1 -DFW_LINK_BASE=0x08100000UL -DSTM32F767xx -DBUILD_BANK_B -c -I../Core/Inc -I../FATFS/Target -I../FATFS/App -I../USB_HOST/App -I../USB_HOST/Target -I../Drivers/STM32F7xx_HAL_Driver/Inc -I../Drivers/STM32F7xx_HAL_Driver/Inc/Legacy -I../Middlewares/Third_Party/FreeRTOS/Source/include -I../Middlewares/Third_Party/FreeRTOS/Source/CMSIS_RTOS_V2 -I../Middlewares/Third_Party/FreeRTOS/Source/portable/GCC/ARM_CM7/r0p1 -I../Middlewares/Third_Party/FatFs/src -I../Middlewares/ST/STM32_USB_Host_Library/Core/Inc -I../Middlewares/ST/STM32_USB_Host_Library/Class/MSC/Inc -I../Drivers/CMSIS/Device/ST/STM32F7xx/Include -I../Drivers/CMSIS/Include -Os -ffunction-sections -fdata-sections -Wall -fstack-usage -fcyclomatic-complexity -MMD -MP -MF"$(@:%.o=%.d)" -MT"$@" --specs=nano.specs -mfpu=fpv5-d16 -mfloat-abi=hard -mthumb -o "$@"

clean: clean-Core-2f-Src

clean-Core-2f-Src:
	-$(RM) ./Core/Src/compat_ota.cyclo ./Core/Src/compat_ota.d ./Core/Src/compat_ota.o ./Core/Src/compat_ota.su ./Core/Src/db.cyclo ./Core/Src/db.d ./Core/Src/db.o ./Core/Src/db.su ./Core/Src/ds18b20.cyclo ./Core/Src/ds18b20.d ./Core/Src/ds18b20.o ./Core/Src/ds18b20.su ./Core/Src/dtcm_alloc.cyclo ./Core/Src/dtcm_alloc.d ./Core/Src/dtcm_alloc.o ./Core/Src/dtcm_alloc.su ./Core/Src/freertos.cyclo ./Core/Src/freertos.d ./Core/Src/freertos.o ./Core/Src/freertos.su ./Core/Src/fw_meta.cyclo ./Core/Src/fw_meta.d ./Core/Src/fw_meta.o ./Core/Src/fw_meta.su ./Core/Src/gsm.cyclo ./Core/Src/gsm.d ./Core/Src/gsm.o ./Core/Src/gsm.su ./Core/Src/logger.cyclo ./Core/Src/logger.d ./Core/Src/logger.o ./Core/Src/logger.su ./Core/Src/lwdtc.cyclo ./Core/Src/lwdtc.d ./Core/Src/lwdtc.o ./Core/Src/lwdtc.su ./Core/Src/main.cyclo ./Core/Src/main.d ./Core/Src/main.o ./Core/Src/main.su ./Core/Src/mongoose.cyclo ./Core/Src/mongoose.d ./Core/Src/mongoose.o ./Core/Src/mongoose.su ./Core/Src/multi_button.cyclo ./Core/Src/multi_button.d ./Core/Src/multi_button.o ./Core/Src/multi_button.su ./Core/Src/net.cyclo ./Core/Src/net.d ./Core/Src/net.o ./Core/Src/net.su ./Core/Src/onewire.cyclo ./Core/Src/onewire.d ./Core/Src/onewire.o ./Core/Src/onewire.su ./Core/Src/packed_fs.cyclo ./Core/Src/packed_fs.d ./Core/Src/packed_fs.o ./Core/Src/packed_fs.su ./Core/Src/setings.cyclo ./Core/Src/setings.d ./Core/Src/setings.o ./Core/Src/setings.su ./Core/Src/stm32f7xx_hal_msp.cyclo ./Core/Src/stm32f7xx_hal_msp.d ./Core/Src/stm32f7xx_hal_msp.o ./Core/Src/stm32f7xx_hal_msp.su ./Core/Src/stm32f7xx_hal_timebase_tim.cyclo ./Core/Src/stm32f7xx_hal_timebase_tim.d ./Core/Src/stm32f7xx_hal_timebase_tim.o ./Core/Src/stm32f7xx_hal_timebase_tim.su ./Core/Src/stm32f7xx_it.cyclo ./Core/Src/stm32f7xx_it.d ./Core/Src/stm32f7xx_it.o ./Core/Src/stm32f7xx_it.su ./Core/Src/syscalls.cyclo ./Core/Src/syscalls.d ./Core/Src/syscalls.o ./Core/Src/syscalls.su ./Core/Src/sysmem.cyclo ./Core/Src/sysmem.d ./Core/Src/sysmem.o ./Core/Src/sysmem.su ./Core/Src/system_stm32f7xx.cyclo ./Core/Src/system_stm32f7xx.d ./Core/Src/system_stm32f7xx.o ./Core/Src/system_stm32f7xx.su ./Core/Src/usart_ring.cyclo ./Core/Src/usart_ring.d ./Core/Src/usart_ring.o ./Core/Src/usart_ring.su ./Core/Src/zagotovka.cyclo ./Core/Src/zagotovka.d ./Core/Src/zagotovka.o ./Core/Src/zagotovka.su ./Core/Src/zbee_vbtn.cyclo ./Core/Src/zbee_vbtn.d ./Core/Src/zbee_vbtn.o ./Core/Src/zbee_vbtn.su

.PHONY: clean-Core-2f-Src

