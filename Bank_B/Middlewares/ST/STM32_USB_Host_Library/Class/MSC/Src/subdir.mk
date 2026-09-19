################################################################################
# Automatically-generated file. Do not edit!
# Toolchain: GNU Tools for STM32 (12.3.rel1)
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../Middlewares/ST/STM32_USB_Host_Library/Class/MSC/Src/usbh_msc.c \
../Middlewares/ST/STM32_USB_Host_Library/Class/MSC/Src/usbh_msc_bot.c \
../Middlewares/ST/STM32_USB_Host_Library/Class/MSC/Src/usbh_msc_scsi.c 

OBJS += \
./Middlewares/ST/STM32_USB_Host_Library/Class/MSC/Src/usbh_msc.o \
./Middlewares/ST/STM32_USB_Host_Library/Class/MSC/Src/usbh_msc_bot.o \
./Middlewares/ST/STM32_USB_Host_Library/Class/MSC/Src/usbh_msc_scsi.o 

C_DEPS += \
./Middlewares/ST/STM32_USB_Host_Library/Class/MSC/Src/usbh_msc.d \
./Middlewares/ST/STM32_USB_Host_Library/Class/MSC/Src/usbh_msc_bot.d \
./Middlewares/ST/STM32_USB_Host_Library/Class/MSC/Src/usbh_msc_scsi.d 


# Each subdirectory must supply rules for building sources it contributes
Middlewares/ST/STM32_USB_Host_Library/Class/MSC/Src/%.o Middlewares/ST/STM32_USB_Host_Library/Class/MSC/Src/%.su Middlewares/ST/STM32_USB_Host_Library/Class/MSC/Src/%.cyclo: ../Middlewares/ST/STM32_USB_Host_Library/Class/MSC/Src/%.c Middlewares/ST/STM32_USB_Host_Library/Class/MSC/Src/subdir.mk
	arm-none-eabi-gcc "$<" -mcpu=cortex-m7 -std=gnu11 -DUSE_HAL_DRIVER -DFW_TARGET_BANK=1 -DFW_LINK_BASE=0x08100000UL -DSTM32F767xx -DBUILD_BANK_B -c -I../Core/Inc -I../FATFS/Target -I../FATFS/App -I../USB_HOST/App -I../USB_HOST/Target -I../Drivers/STM32F7xx_HAL_Driver/Inc -I../Drivers/STM32F7xx_HAL_Driver/Inc/Legacy -I../Middlewares/Third_Party/FreeRTOS/Source/include -I../Middlewares/Third_Party/FreeRTOS/Source/CMSIS_RTOS_V2 -I../Middlewares/Third_Party/FreeRTOS/Source/portable/GCC/ARM_CM7/r0p1 -I../Middlewares/Third_Party/FatFs/src -I../Middlewares/ST/STM32_USB_Host_Library/Core/Inc -I../Middlewares/ST/STM32_USB_Host_Library/Class/MSC/Inc -I../Drivers/CMSIS/Device/ST/STM32F7xx/Include -I../Drivers/CMSIS/Include -Os -ffunction-sections -fdata-sections -Wall -fstack-usage -fcyclomatic-complexity -MMD -MP -MF"$(@:%.o=%.d)" -MT"$@" --specs=nano.specs -mfpu=fpv5-d16 -mfloat-abi=hard -mthumb -o "$@"

clean: clean-Middlewares-2f-ST-2f-STM32_USB_Host_Library-2f-Class-2f-MSC-2f-Src

clean-Middlewares-2f-ST-2f-STM32_USB_Host_Library-2f-Class-2f-MSC-2f-Src:
	-$(RM) ./Middlewares/ST/STM32_USB_Host_Library/Class/MSC/Src/usbh_msc.cyclo ./Middlewares/ST/STM32_USB_Host_Library/Class/MSC/Src/usbh_msc.d ./Middlewares/ST/STM32_USB_Host_Library/Class/MSC/Src/usbh_msc.o ./Middlewares/ST/STM32_USB_Host_Library/Class/MSC/Src/usbh_msc.su ./Middlewares/ST/STM32_USB_Host_Library/Class/MSC/Src/usbh_msc_bot.cyclo ./Middlewares/ST/STM32_USB_Host_Library/Class/MSC/Src/usbh_msc_bot.d ./Middlewares/ST/STM32_USB_Host_Library/Class/MSC/Src/usbh_msc_bot.o ./Middlewares/ST/STM32_USB_Host_Library/Class/MSC/Src/usbh_msc_bot.su ./Middlewares/ST/STM32_USB_Host_Library/Class/MSC/Src/usbh_msc_scsi.cyclo ./Middlewares/ST/STM32_USB_Host_Library/Class/MSC/Src/usbh_msc_scsi.d ./Middlewares/ST/STM32_USB_Host_Library/Class/MSC/Src/usbh_msc_scsi.o ./Middlewares/ST/STM32_USB_Host_Library/Class/MSC/Src/usbh_msc_scsi.su

.PHONY: clean-Middlewares-2f-ST-2f-STM32_USB_Host_Library-2f-Class-2f-MSC-2f-Src

