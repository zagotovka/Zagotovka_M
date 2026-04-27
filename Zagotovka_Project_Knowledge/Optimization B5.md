Использование `double` для DHT22 влажности

**Файл:** [ds18b20Config.h:69-74](file:///home/zerg/STM32CubeIDE/workspace_1.15.1/Zagotovka_M/Core/Inc/ds18b20Config.h#L69)
```c
double humid;        // 8 байт
double prvhumid;     // 8 байт
double upt, lowt, uph, lowh;  // 6 × 8 = 48 байт
```
**Проблема:** DHT22 имеет точность ±0.5°C/±2%RH — `float` (4 байта) более чем достаточно. При `MAX_DHT22_P=5` экономия: 5 × 48 = **240 байт RAM**.  
**Решение:** Заменить `double` → `float` в `dht22_pin_t`.
```diff
-double humid;
+float humid;
-double prvhumid;
+float prvhumid;
-double upt, lowt, uph, lowh;
+float upt, lowt, uph, lowh;
```
**Риск:** 🟡 Средний — нужно проверить все приведения типов и `printf` формат-спецификаторы (`%.4f` → всё равно `float` при `va_arg`).  
**Валидация:** Проверить что JSON-генерация и парсинг температуры/влажности корректны.
