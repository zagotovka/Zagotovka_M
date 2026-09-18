/**
 * @file slzb_watchdog.h
 * @brief Watchdog автовосстановления связи со шлюзом SLZB-06p7U.
 *
 * Проблема: шлюз SLZB-06p7U не подключается к встроенному MQTT-брокеру сразу
 * после включения/перезагрузки STM32, если включён MQTT Server и шлюз уже
 * считается "подключённым" к старому сокету. Лечение — перезагрузить шлюз
 * одним GET-запросом (ровно команда кнопки "Reboot" веб-панели SLZB-OS,
 * снята через Wireshark, выполняется без авторизации):
 *
 *   GET /api2?action=4&cmd=3 HTTP/1.1
 *   Host: <slzb_host>
 *
 * Логика watchdog'а:
 *  - пока mqtt_server_slzb_connected() == 0 дольше SLZB_WD_WAIT_MS — считаем
 *    это зависанием шлюза и дёргаем reboot;
 *  - после срабатывания — cooldown SLZB_WD_COOLDOWN_MS (не долбим reboot'ом
 *    чаще одного раза в минуту);
 *  - таймер перезапускается при каждом переходе connected->disconnected,
 *    т.е. следит не только за стартом брокера, но и за любым последующим
 *    отвалом SLZB в рантайме;
 *  - HTTP-запрос подстраховано по таймауту SLZB_WD_HTTP_TIMEOUT_MS: шлюз,
 *    не ответивший на reboot-запрос, не должен заклинить watchdog.
 *
 * Все функции НЕ потокобезопасны и должны вызываться из контекста
 * WebServerTask (тот же mg_mgr, что и встроенный MQTT-брокер).
 * Работает ТОЛЬКО если check_mqtt_srv == 1 и slzb_host непустой
 * (пустая строка в настройках = watchdog выключен).
 */
#ifndef SLZB_WATCHDOG_H
#define SLZB_WATCHDOG_H

#include "mongoose.h"

/* Ждать реконнекта не дольше 40с (SLZB сам реконнектится за 5-30с,
 * если не завис; 40с достаточно, чтобы не мешать штатному reconnect) */
#define SLZB_WD_WAIT_MS           40000u
/* Не чаще 1 раза в минуту (шлюзу нужно время подняться после reboot) */
#define SLZB_WD_COOLDOWN_MS       60000u
/* Таймаут ожидания ответа на HTTP-запрос reboot */
#define SLZB_WD_HTTP_TIMEOUT_MS   10000u

/* Вызвать ОДИН раз при старте WebServerTask, после mqtt_server_init().
 * slzb_host — IP-адрес шлюза SLZB-06p7U (только IPv4, например
 * "192.168.1.115"); NULL или пустая строка — watchdog выключен. */
void slzb_watchdog_init(const char *slzb_host);

/* Вызывать каждую итерацию WebServerTask, сразу после mqtt_server_poll()
 * (и в общем mg_mgr_poll() цикле). Дёшево: обычно один if. */
void slzb_watchdog_poll(struct mg_mgr *mgr);

#endif /* SLZB_WATCHDOG_H */
