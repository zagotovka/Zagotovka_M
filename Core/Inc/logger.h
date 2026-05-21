#ifndef INC_LOGGER_H_
#define INC_LOGGER_H_

#include <stdint.h>
#include "FreeRTOS.h"
#include "message_buffer.h"

typedef enum {
    LOG_CAT_SYSTEM    = 0,
    LOG_CAT_MQTT      = 1,
    LOG_CAT_NET       = 2,
    LOG_CAT_GSM       = 3,
    LOG_CAT_SCHEDULER = 4,
    LOG_CAT_SENSORS   = 5,
    LOG_CAT_PID       = 6,
    LOG_CAT_SETTINGS  = 7,
    LOG_CAT_ETH       = 8,
    LOG_CAT_PHY       = 9,
    LOG_CAT_COUNT     = 10
} LogCategory_t;

#define LOG_MASK_SYSTEM    (1u << LOG_CAT_SYSTEM)
#define LOG_MASK_MQTT      (1u << LOG_CAT_MQTT)
#define LOG_MASK_NET       (1u << LOG_CAT_NET)
#define LOG_MASK_GSM       (1u << LOG_CAT_GSM)
#define LOG_MASK_SCHEDULER (1u << LOG_CAT_SCHEDULER)
#define LOG_MASK_SENSORS   (1u << LOG_CAT_SENSORS)
#define LOG_MASK_PID       (1u << LOG_CAT_PID)
#define LOG_MASK_SETTINGS  (1u << LOG_CAT_SETTINGS)
#define LOG_MASK_ETH       (1u << LOG_CAT_ETH)
#define LOG_MASK_PHY       (1u << LOG_CAT_PHY)
#define LOG_MASK_ALL       0x3FFu

// Compile-time controls (1 - enabled, 0 - disabled)
#define LOG_CONF_SYSTEM_EN    1
#define LOG_CONF_MQTT_EN      1
#define LOG_CONF_NET_EN       1
#define LOG_CONF_GSM_EN       1
#define LOG_CONF_SCHEDULER_EN 1
#define LOG_CONF_SENSORS_EN   1
#define LOG_CONF_PID_EN       1
#define LOG_CONF_SETTINGS_EN  1
#define LOG_CONF_ETH_EN       1
#define LOG_CONF_PHY_EN       1

extern volatile uint32_t g_log_filter_mask;

void logger_init(void);
void logger_set_mask(uint32_t mask);
uint32_t logger_get_mask(void);
void logger_save_mask(void);
void logger_send(LogCategory_t cat, const char *fmt, ...);
const char* logger_get_category_name(LogCategory_t cat);
void mqtt_publish_logfilter_status(void);

// Exported for StartLoggerTask in main.c
extern MessageBufferHandle_t xMessageBuffer;
extern const char* cat_prefixes[];

#define LOG_SYSTEM(fmt, ...) \
    do { if (LOG_CONF_SYSTEM_EN && (g_log_filter_mask & LOG_MASK_SYSTEM)) \
        logger_send(LOG_CAT_SYSTEM, fmt, ##__VA_ARGS__); } while(0)

#define LOG_MQTT(fmt, ...) \
    do { if (LOG_CONF_MQTT_EN && (g_log_filter_mask & LOG_MASK_MQTT)) \
        logger_send(LOG_CAT_MQTT, fmt, ##__VA_ARGS__); } while(0)

#define LOG_NET(fmt, ...) \
    do { if (LOG_CONF_NET_EN && (g_log_filter_mask & LOG_MASK_NET)) \
        logger_send(LOG_CAT_NET, fmt, ##__VA_ARGS__); } while(0)

#define LOG_GSM(fmt, ...) \
    do { if (LOG_CONF_GSM_EN && (g_log_filter_mask & LOG_MASK_GSM)) \
        logger_send(LOG_CAT_GSM, fmt, ##__VA_ARGS__); } while(0)

#define LOG_SCHEDULER(fmt, ...) \
    do { if (LOG_CONF_SCHEDULER_EN && (g_log_filter_mask & LOG_MASK_SCHEDULER)) \
        logger_send(LOG_CAT_SCHEDULER, fmt, ##__VA_ARGS__); } while(0)

#define LOG_SENSORS(fmt, ...) \
    do { if (LOG_CONF_SENSORS_EN && (g_log_filter_mask & LOG_MASK_SENSORS)) \
        logger_send(LOG_CAT_SENSORS, fmt, ##__VA_ARGS__); } while(0)

#define LOG_PID(fmt, ...) \
    do { if (LOG_CONF_PID_EN && (g_log_filter_mask & LOG_MASK_PID)) \
        logger_send(LOG_CAT_PID, fmt, ##__VA_ARGS__); } while(0)

#define LOG_SETTINGS(fmt, ...) \
    do { if (LOG_CONF_SETTINGS_EN && (g_log_filter_mask & LOG_MASK_SETTINGS)) \
        logger_send(LOG_CAT_SETTINGS, fmt, ##__VA_ARGS__); } while(0)

#define LOG_ETH(fmt, ...) \
    do { if (LOG_CONF_ETH_EN && (g_log_filter_mask & LOG_MASK_ETH)) \
        logger_send(LOG_CAT_ETH, fmt, ##__VA_ARGS__); } while(0)

#define LOG_PHY(fmt, ...) \
    do { if (LOG_CONF_PHY_EN && (g_log_filter_mask & LOG_MASK_PHY)) \
        logger_send(LOG_CAT_PHY, fmt, ##__VA_ARGS__); } while(0)

#endif /* INC_LOGGER_H_ */
