// Copyright (c) 2023 Cesanta Software Limited
// All rights reserved
#pragma once

#include "mongoose.h"

#define HTTP_PORT "8000"
#define HTTPS_PORT "8443"
#define MQTT_PORT "1883"

// Shared JSON response buffer — heap-allocated in web_init() to save 16KB .bss
#define G_BODY_SIZE 16384

#ifdef __cplusplus
extern "C" {
#endif

#if !defined(HTTP_URL)
#define HTTP_URL "http://0.0.0.0:8000"
#endif

#if !defined(HTTPS_URL)
#define HTTPS_URL "https://0.0.0.0:8443"
#endif

#define MAX_DEVICE_NAME 40
#define MAX_EVENTS_NO 400
#define MAX_EVENT_TEXT_SIZE 10
#define EVENTS_PER_PAGE 20

// Event log entry
struct ui_event {
  uint8_t type, prio;
  unsigned long timestamp;
  char text[10];
};

extern volatile bool mqtt_connected_reported;  // true после MG_EV_MQTT_OPEN, false после MG_EV_CLOSE
extern char s_tls_cert[1024];
extern char s_tls_key[512];
extern bool s_tls_loaded;
extern char *g_body;  // shared JSON buffer (G_BODY_SIZE bytes in FreeRTOS heap)
void web_init(struct mg_mgr *mgr);

/*********************************** From Zagotovka ****************************************************/
void setup_mqtt(struct mg_mgr *mgr, struct mg_tcpip_if *mif);
void timer_fn_mqtt(void *arg);
void fn(struct mg_connection *c, int ev, void *ev_data, void *fn_data);

void clean_pem_data(const char *input, char *output, size_t output_size);

#ifdef __cplusplus
}
#endif
