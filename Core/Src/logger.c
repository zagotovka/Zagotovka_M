#include "logger.h"
#include "FreeRTOS.h"
#include "message_buffer.h"
#include "task.h"
#include "cmsis_os2.h"
#include "db.h"
#include "main.h"
#include <stdio.h>
#include <string.h>
#include <stdarg.h>
#include <ctype.h>

extern UART_HandleTypeDef huart3;
extern struct dbSettings SetSettings;
void SetSettingsConfig(void);

MessageBufferHandle_t xMessageBuffer = NULL;
volatile uint32_t g_log_filter_mask = LOG_MASK_ALL;

typedef struct {
    TaskHandle_t task_handle;
    char buffer[192];
    uint16_t len;
} TaskLogBuffer_t;

static TaskLogBuffer_t g_task_bufs[16];

const char* cat_prefixes[] = {
    "[SYSTEM] ",
    "[MQTT] ",
    "[NET] ",
    "[GSM] ",
    "[SCHEDULER] ",
    "[SENSORS] ",
    "[PID] ",
    "[SETTINGS] ",
    "[ETH] ",
    "[PHY] "
};

const char* logger_get_category_name(LogCategory_t cat) {
    switch(cat) {
        case LOG_CAT_SYSTEM:    return "SYSTEM";
        case LOG_CAT_MQTT:      return "MQTT";
        case LOG_CAT_NET:       return "NET";
        case LOG_CAT_GSM:       return "GSM";
        case LOG_CAT_SCHEDULER: return "SCHEDULER";
        case LOG_CAT_SENSORS:   return "SENSORS";
        case LOG_CAT_PID:       return "PID";
        case LOG_CAT_SETTINGS:  return "SETTINGS";
        case LOG_CAT_ETH:       return "ETH";
        case LOG_CAT_PHY:       return "PHY";
        default:                return "UNKNOWN";
    }
}

void logger_init(void) {
    xMessageBuffer = xMessageBufferCreate(4096);
    memset(g_task_bufs, 0, sizeof(g_task_bufs));
}

void logger_set_mask(uint32_t mask) {
    g_log_filter_mask = mask;
    SetSettings.log_filter_mask = mask;
}

uint32_t logger_get_mask(void) {
    return g_log_filter_mask;
}

void logger_save_mask(void) {
    SetSettings.log_filter_mask = g_log_filter_mask;
    SetSettingsConfig();
}

void logger_send(LogCategory_t cat, const char *fmt, ...) {
    if (cat >= LOG_CAT_COUNT) return;
    
    // Quick runtime check
    if (!(g_log_filter_mask & (1u << cat))) {
        return;
    }
    
    char buf[192 + 2];
    buf[0] = (char)cat;
    
    va_list args;
    va_start(args, fmt);
    int len = vsnprintf(buf + 1, sizeof(buf) - 2, fmt, args);
    va_end(args);
    
    if (len > 0) {
        int total_len = len + 1; // cat + chars
        if (total_len >= (int)sizeof(buf)) {
            total_len = sizeof(buf) - 1;
        }
        buf[total_len] = '\0';
        total_len++; // include null terminator
        
        if (xMessageBuffer != NULL) {
            xMessageBufferSend(xMessageBuffer, buf, total_len, 0);
        } else {
            // Before scheduler: print directly to UART
            HAL_UART_Transmit(&huart3, (uint8_t*)cat_prefixes[cat], strlen(cat_prefixes[cat]), 0xFFFF);
            HAL_UART_Transmit(&huart3, (uint8_t*)(buf + 1), strlen(buf + 1), 0xFFFF);
        }
    }
}

static TaskLogBuffer_t* get_task_buffer(void) {
    TaskHandle_t current_task = xTaskGetCurrentTaskHandle();
    if (current_task == NULL) {
        return NULL;
    }
    
    // Quick search without critical section
    for (int i = 0; i < 16; i++) {
        if (g_task_bufs[i].task_handle == current_task) {
            return &g_task_bufs[i];
        }
    }
    
    // Not found, allocate a slot in critical section
    TaskLogBuffer_t *allocated = NULL;
    taskENTER_CRITICAL();
    // Re-check inside critical section
    for (int i = 0; i < 16; i++) {
        if (g_task_bufs[i].task_handle == current_task) {
            allocated = &g_task_bufs[i];
            break;
        }
    }
    if (!allocated) {
        for (int i = 0; i < 16; i++) {
            if (g_task_bufs[i].task_handle == NULL) {
                g_task_bufs[i].task_handle = current_task;
                g_task_bufs[i].len = 0;
                allocated = &g_task_bufs[i];
                break;
            }
        }
    }
    taskEXIT_CRITICAL();
    return allocated;
}

static LogCategory_t parse_category_from_string(const char *str, int *prefix_len) {
    if (strncmp(str, "[SYSTEM]", 8) == 0) { *prefix_len = 8; return LOG_CAT_SYSTEM; }
    if (strncmp(str, "[MQTT]", 6) == 0) { *prefix_len = 6; return LOG_CAT_MQTT; }
    if (strncmp(str, "[NET]", 5) == 0) { *prefix_len = 5; return LOG_CAT_NET; }
    if (strncmp(str, "[GSM]", 5) == 0) { *prefix_len = 5; return LOG_CAT_GSM; }
    if (strncmp(str, "[SCHEDULER]", 11) == 0) { *prefix_len = 11; return LOG_CAT_SCHEDULER; }
    if (strncmp(str, "[SENSORS]", 9) == 0) { *prefix_len = 9; return LOG_CAT_SENSORS; }
    if (strncmp(str, "[PID]", 5) == 0) { *prefix_len = 5; return LOG_CAT_PID; }
    if (strncmp(str, "[SETTINGS]", 10) == 0) { *prefix_len = 10; return LOG_CAT_SETTINGS; }
    if (strncmp(str, "[ETH]", 5) == 0) { *prefix_len = 5; return LOG_CAT_ETH; }
    if (strncmp(str, "[PHY]", 5) == 0) { *prefix_len = 5; return LOG_CAT_PHY; }
    *prefix_len = 0;
    return LOG_CAT_SYSTEM;
}

int __io_putchar(int ch) {
    // If inside interrupt, send directly to UART to avoid blocking or FreeRTOS API calls
    if (__get_IPSR() != 0) {
        uint8_t c = (uint8_t)ch;
        HAL_UART_Transmit(&huart3, &c, 1, 10);
        return ch;
    }

    TaskLogBuffer_t *buf = get_task_buffer();
    if (!buf) {
        uint8_t c = (uint8_t)ch;
        HAL_UART_Transmit(&huart3, &c, 1, 10);
        return ch;
    }

    buf->buffer[buf->len++] = (char)ch;

    if (ch == '\n' || buf->len >= 190) {
        // null-terminate temporarily for string parsing
        buf->buffer[buf->len] = '\0';

        int pfx_len = 0;
        LogCategory_t cat = parse_category_from_string(buf->buffer, &pfx_len);

        if (g_log_filter_mask & (1u << cat)) {
            char *msg_start = buf->buffer;
            int msg_len = buf->len;

            if (pfx_len > 0) {
                msg_start += pfx_len;
                msg_len -= pfx_len;
                // Skip spaces after prefix
                while (msg_len > 0 && isspace((unsigned char)*msg_start)) {
                    msg_start++;
                    msg_len--;
                }
            }

            char send_buf[192 + 16];
            send_buf[0] = (char)cat;
            memcpy(send_buf + 1, msg_start, msg_len);

            int send_len = msg_len;
            if (buf->len >= 190 && ch != '\n') {
                const char* trunc = " [TRUNCATED]\n";
                int trunc_len = strlen(trunc);
                memcpy(send_buf + 1 + send_len, trunc, trunc_len);
                send_len += trunc_len;
            }
            send_buf[1 + send_len] = '\0';

            if (xMessageBuffer != NULL) {
                xMessageBufferSend(xMessageBuffer, send_buf, send_len + 2, 0);
            } else {
                // Before scheduler: print directly to UART
                HAL_UART_Transmit(&huart3, (uint8_t*)cat_prefixes[cat], strlen(cat_prefixes[cat]), 0xFFFF);
                HAL_UART_Transmit(&huart3, (uint8_t*)msg_start, send_len, 0xFFFF);
            }
        }
        buf->len = 0;
    }
    return ch;
}
