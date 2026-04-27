`numline` парсинг использует `cJSON` с `if-else` вместо `atoi` строки

Это скорее наблюдение: обработка `ptype` в `parse_monitoring_json()` использует двойную проверку `cJSON_IsString → atoi` и `cJSON_IsNumber`, что правильно, но можно упростить вспомогательной функцией `cjson_get_int()`.  
**Риск:** 🟢 Минимальный.