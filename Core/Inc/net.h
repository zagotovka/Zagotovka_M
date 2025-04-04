// Copyright (c) 2023 Cesanta Software Limited
// All rights reserved
#pragma once

#include "mongoose.h"

#define HTTP_PORT "8000"
#define HTTPS_PORT "8443"
#define MQTT_PORT "1883"

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

void web_init(struct mg_mgr *mgr);

/*********************************** From Zagotovka ****************************************************/
void setup_mqtt(struct mg_mgr *mgr, struct mg_tcpip_if *mif);
void timer_fn_mqtt(void *arg);
void fn(struct mg_connection *c, int ev, void *ev_data, void *fn_data);

void clean_pem_data(const char *input, char *output, size_t output_size);
// Self signed certificates
// https://mongoose.ws/documentation/tutorials/tls/#self-signed-certificates
//#ifdef TLS_TWOWAY
//const char *s_tls_ca =
//    "-----BEGIN CERTIFICATE-----\n"
//    "MIIBqjCCAU+gAwIBAgIUESoOPGqMhf9uarzblVFwzrQweMcwCgYIKoZIzj0EAwIw\n"
//    "RDELMAkGA1UEBhMCSUUxDzANBgNVBAcMBkR1YmxpbjEQMA4GA1UECgwHQ2VzYW50\n"
//    "YTESMBAGA1UEAwwJVGVzdCBSb290MCAXDTIwMDUwOTIxNTE0NFoYDzIwNTAwNTA5\n"
//    "MjE1MTQ0WjBEMQswCQYDVQQGEwJJRTEPMA0GA1UEBwwGRHVibGluMRAwDgYDVQQK\n"
//    "DAdDZXNhbnRhMRIwEAYDVQQDDAlUZXN0IFJvb3QwWTATBgcqhkjOPQIBBggqhkjO\n"
//    "PQMBBwNCAAQsq9ECZiSW1xI+CVBP8VDuUehVA166sR2YsnJ5J6gbMQ1dUCH/QvLa\n"
//    "dBdeU7JlQcH8hN5KEbmM9BnZxMor6ussox0wGzAMBgNVHRMEBTADAQH/MAsGA1Ud\n"
//    "DwQEAwIBrjAKBggqhkjOPQQDAgNJADBGAiEAnHFsAIwGQQyRL81B04dH6d86Iq0l\n"
//    "fL8OKzndegxOaB0CIQCPwSIwEGFdURDqCC0CY2dnMrUGY5ZXu3hHCojZGS7zvg==\n"
//    "-----END CERTIFICATE-----\n";
//#endif

//// localhost,zagotovka.ddns.net

#define TLS_CERT \
"-----BEGIN CERTIFICATE-----\n" \
"MIIBqTCCAVCgAwIBAgIEZ6NdJDAKBggqhkjOPQQDAjATMREwDwYDVQQDEwhNb25n\n" \
"b29zZTAeFw0yNTAyMDUxMjQ0MjBaFw0zNTAyMDMxMjQ0MjBaMBQxEjAQBgNVBAMT\n" \
"CWxvY2FsaG9zdDBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABGts1w0UE3d0EpN5\n" \
"peWQjwCnLCIkpbApikzKK4HdLXc6BfilcUWVwSBW5ZHCToaIiKPPp+sv8IPZEOUh\n" \
"oOV9MrqjgZAwgY0wDgYDVR0PAQH/BAQDAgWgMBMGA1UdJQQMMAoGCCsGAQUFBwMB\n" \
"MAwGA1UdEwEB/wQCMAAwHwYDVR0jBBgwFoAU70eePsLRLVVKklJMc/zyorJdLzIw\n" \
"NwYDVR0RBDAwLoIJbG9jYWxob3N0gg0xOTIuMTY4LjE4LjI0ghJ6YWdvdG92a2Eu\n" \
"ZGRucy5uZXQwCgYIKoZIzj0EAwIDRwAwRAIgDuA1JDkcCxQE0WnMqf/v1h866hPe\n" \
"Wk6Z0e5KClwcmDgCIC+1id3Bn2+4dMWD2wyL1NmtQcpx0tmG+ZClAArNPnpb\n" \
"-----END CERTIFICATE-----"

#define TLS_KEY \
"-----BEGIN EC PRIVATE KEY-----\n" \
"MHcCAQEEINhjTzoFoB0clk30DEuFf/fhfS3LesFg/dknmGrPXRH7oAoGCCqGSM49\n" \
"AwEHoUQDQgAEa2zXDRQTd3QSk3ml5ZCPAKcsIiSlsCmKTMorgd0tdzoF+KVxRZXB\n" \
"IFblkcJOhoiIo8+n6y/wg9kQ5SGg5X0yug==\n" \
"-----END EC PRIVATE KEY-----"

#ifdef __cplusplus
}
#endif
