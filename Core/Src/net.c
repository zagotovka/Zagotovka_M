// Copyright (c) 2023 Cesanta Software Limited
// All rights reserved

#include "net.h"
#include "zagotovka.h"
#include "ds18b20.h"
#include "ds18b20Config.h"
#include "main.h"

extern ds18b20_pin_t ds18num[MAX_DS18B20_P];
extern dht22_pin_t dht22num[MAX_DHT22_P];

struct user {
  const char *name, *pass, *access_token;
};

// Settings
struct settings {
  bool log_enabled;
  int log_level;
  long brightness;
  char *device_name;
};

static struct settings s_settings = {true, 1, 57, NULL};

const char *s_json_header =
    "Content-Type: application/json\r\n"
    "Cache-Control: no-cache\r\n";

uint64_t s_boot_timestamp = 0;  // Updated by SNTP

// This is for newlib and TLS (mbedTLS)
uint64_t mg_now(void) {
  return mg_millis() + s_boot_timestamp;
}

int ui_event_next(int no, struct ui_event *e) {
  if (no < 0 || no >= MAX_EVENTS_NO) return 0;

  srand((unsigned) no);
  e->type = (uint8_t) rand() % 4;
  e->prio = (uint8_t) rand() % 3;
  e->timestamp =
      (unsigned long) ((int64_t) mg_now() - 86400 * 1000 /* one day back */ +
                       no * 300 * 1000 /* 5 mins between alerts */ +
                       1000 * (rand() % 300) /* randomize event time */) /
      1000UL;

  mg_snprintf(e->text, MAX_EVENT_TEXT_SIZE, "event#%d", no);
  return no + 1;
}

// SNTP connection event handler. When we get a response from an SNTP server,
// adjust s_boot_timestamp. We'll get a valid time from that point on
static void sfn(struct mg_connection *c, int ev, void *ev_data) {
  uint64_t *expiration_time = (uint64_t *) c->data;
  if (ev == MG_EV_OPEN) {
    *expiration_time = mg_millis() + 3000;  // Store expiration time in 3s
  } else if (ev == MG_EV_SNTP_TIME) {
    uint64_t t = *(uint64_t *) ev_data;
    s_boot_timestamp = t - mg_millis();
    c->is_closing = 1;
    MG_INFO(("SNTP 1"));
  } else if (ev == MG_EV_POLL) {
    if (mg_millis() > *expiration_time) c->is_closing = 1;
  }
}

static void timer_sntp_fn(void *param) {  // SNTP timer function. Sync up time
  mg_sntp_connect(param, "udp://time.google.com:123", sfn, NULL);
}

// Parse HTTP requests, return authenticated user or NULL
static struct user *authenticate(struct mg_http_message *hm) {
  // In production, make passwords strong and tokens randomly generated
  // In this example, user list is kept in RAM. In production, it can
  // be backed by file, database, or some other method.
  static struct user users[] = {
      {SetSettings.adm_name, SetSettings.adm_pswd, "admin_token"},
      {"Zerg", "Sworm", "user1_token"},
//      {"user2", "user2", "user2_token"},
      {NULL, NULL, NULL},
  };
  char user[64], pass[64];
  struct user *u, *result = NULL;
  mg_http_creds(hm, user, sizeof(user), pass, sizeof(pass));
  MG_VERBOSE(("user [%s] pass [%s]", user, pass));

  if (user[0] != '\0' && pass[0] != '\0') {
    // Both user and password is set, search by user/password
    for (u = users; result == NULL && u->name != NULL; u++)
      if (strcmp(user, u->name) == 0 && strcmp(pass, u->pass) == 0) result = u;
  } else if (user[0] == '\0') {
    // Only password is set, search by token
    for (u = users; result == NULL && u->name != NULL; u++)
      if (strcmp(pass, u->access_token) == 0) result = u;
  }
  return result;
}

static void handle_login(struct mg_connection *c, struct user *u) {
  char cookie[256];
  mg_snprintf(cookie, sizeof(cookie),
              "Set-Cookie: access_token=%s; Path=/; "
              "%sHttpOnly; SameSite=Lax; Max-Age=%d\r\n",
              u->access_token, c->is_tls ? "Secure; " : "", 3600 * 24);
  mg_http_reply(c, 200, cookie, "{%m:%m}", MG_ESC("user"), MG_ESC(u->name));
}

static void handle_logout(struct mg_connection *c) {
  char cookie[256];
  mg_snprintf(cookie, sizeof(cookie),
              "Set-Cookie: access_token=; Path=/; "
              "Expires=Thu, 01 Jan 1970 00:00:00 UTC; "
              "%sHttpOnly; Max-Age=0; \r\n",
              c->is_tls ? "Secure; " : "");
  mg_http_reply(c, 200, cookie, "true\n");
}

static void handle_debug(struct mg_connection *c, struct mg_http_message *hm) {
  int level = mg_json_get_long(hm->body, "$.level", MG_LL_DEBUG);
  mg_log_set(level);
  mg_http_reply(c, 200, "", "Debug level set to %d\n", level);
}

static size_t print_int_arr(void (*out)(char, void *), void *ptr, va_list *ap) {
  size_t i, len = 0, num = va_arg(*ap, size_t);  // Number of items in the array
  int *arr = va_arg(*ap, int *);              // Array ptr
  for (i = 0; i < num; i++) {
    len += mg_xprintf(out, ptr, "%s%d", i == 0 ? "" : ",", arr[i]);
  }
  return len;
}

static void handle_stats_get(struct mg_connection *c) {
  int points[] = {21, 22, 22, 19, 18, 20, 23, 23, 22, 22, 22, 23, 22};
  mg_http_reply(c, 200, s_json_header, "{%m:%d,%m:%d,%m:[%M]}\n",
                MG_ESC("temperature"), 21,  //
                MG_ESC("humidity"), 67,     //
                MG_ESC("points"), print_int_arr,
                sizeof(points) / sizeof(points[0]), points);
}

static size_t print_events(void (*out)(char, void *), void *ptr, va_list *ap) {
  size_t len = 0;
  struct ui_event ev;
  int pageno = va_arg(*ap, int);
  int no = (pageno - 1) * EVENTS_PER_PAGE;
  int end = no + EVENTS_PER_PAGE;

  while ((no = ui_event_next(no, &ev)) != 0 && no <= end) {
    len += mg_xprintf(out, ptr, "%s{%m:%lu,%m:%d,%m:%d,%m:%m}\n",  //
                      len == 0 ? "" : ",",                         //
                      MG_ESC("time"), ev.timestamp,                //
                      MG_ESC("type"), ev.type,                     //
                      MG_ESC("prio"), ev.prio,                     //
                      MG_ESC("text"), MG_ESC(ev.text));
  }

  return len;
}

static void handle_events_get(struct mg_connection *c,
                              struct mg_http_message *hm) {
  int pageno = mg_json_get_long(hm->body, "$.page", 1);
  mg_http_reply(c, 200, s_json_header, "{%m:[%M], %m:%d}\n", MG_ESC("arr"),
                print_events, pageno, MG_ESC("totalCount"), MAX_EVENTS_NO);
}

static void handle_settings_set(struct mg_connection *c, struct mg_str body) {
  struct settings settings;
  char *s = mg_json_get_str(body, "$.device_name");
  bool ok = true;
  memset(&settings, 0, sizeof(settings));
  mg_json_get_bool(body, "$.log_enabled", &settings.log_enabled);
  settings.log_level = mg_json_get_long(body, "$.log_level", 0);
  settings.brightness = mg_json_get_long(body, "$.brightness", 0);
  if (s && strlen(s) < MAX_DEVICE_NAME) {
    free(settings.device_name);
    settings.device_name = s;
  } else {
    free(s);
  }
  s_settings = settings; // Save to the device flash
  mg_http_reply(c, 200, s_json_header,
                "{%m:%s,%m:%m}",                          //
                MG_ESC("status"), ok ? "true" : "false",  //
                MG_ESC("message"), MG_ESC(ok ? "Success" : "Failed"));
}

static void handle_settings_get(struct mg_connection *c) {
  mg_http_reply(c, 200, s_json_header, "{%m:%s,%m:%hhu,%m:%hhu,%m:%m}\n",  //
                MG_ESC("log_enabled"),
                s_settings.log_enabled ? "true" : "false",    //
                MG_ESC("log_level"), s_settings.log_level,    //
                MG_ESC("brightness"), s_settings.brightness,  //
                MG_ESC("device_name"), MG_ESC(s_settings.device_name));
}

static void handle_firmware_upload(struct mg_connection *c,
                                   struct mg_http_message *hm) {
  char name[64], offset[20], total[20];
  struct mg_str data = hm->body;
  long ofs = -1, tot = -1;
  name[0] = offset[0] = '\0';
  mg_http_get_var(&hm->query, "name", name, sizeof(name));
  mg_http_get_var(&hm->query, "offset", offset, sizeof(offset));
  mg_http_get_var(&hm->query, "total", total, sizeof(total));
  MG_INFO(("File %s, offset %s, len %lu", name, offset, data.len));
  if ((ofs = mg_json_get_long(mg_str(offset), "$", -1)) < 0 ||
      (tot = mg_json_get_long(mg_str(total), "$", -1)) < 0) {
    mg_http_reply(c, 500, "", "offset and total not set\n");
  } else if (ofs == 0 && mg_ota_begin((size_t) tot) == false) {
    mg_http_reply(c, 500, "", "mg_ota_begin(%ld) failed\n", tot);
  } else if (data.len > 0 && mg_ota_write(data.buf, data.len) == false) {
    mg_http_reply(c, 500, "", "mg_ota_write(%lu) @%ld failed\n", data.len, ofs);
    mg_ota_end();
  } else if (data.len == 0 && mg_ota_end() == false) {
    mg_http_reply(c, 500, "", "mg_ota_end() failed\n", tot);
  } else {
    mg_http_reply(c, 200, s_json_header, "true\n");
    if (data.len == 0) {
      // Successful mg_ota_end() called, schedule device reboot
      mg_timer_add(c->mgr, 500, 0, (void (*)(void *)) mg_device_reset, NULL);
    }
  }
}

static void handle_firmware_commit(struct mg_connection *c) {
  mg_http_reply(c, 200, s_json_header, "%s\n",
                mg_ota_commit() ? "true" : "false");
}

static void handle_firmware_rollback(struct mg_connection *c) {
  mg_http_reply(c, 200, s_json_header, "%s\n",
                mg_ota_rollback() ? "true" : "false");
}

static size_t print_status(void (*out)(char, void *), void *ptr, va_list *ap) {
  int fw = va_arg(*ap, int);
  return mg_xprintf(out, ptr, "{%m:%d,%m:%c%lx%c,%m:%u,%m:%u}\n",
                    MG_ESC("status"), mg_ota_status(fw), MG_ESC("crc32"), '"',
                    mg_ota_crc32(fw), '"', MG_ESC("size"), mg_ota_size(fw),
                    MG_ESC("timestamp"), mg_ota_timestamp(fw));
}

static void handle_firmware_status(struct mg_connection *c) {
  mg_http_reply(c, 200, s_json_header, "[%M,%M]\n", print_status,
                MG_FIRMWARE_CURRENT, print_status, MG_FIRMWARE_PREVIOUS);
}

static void handle_device_reset(struct mg_connection *c) {
  mg_http_reply(c, 200, s_json_header, "true\n");
  mg_timer_add(c->mgr, 500, 0, (void (*)(void *)) mg_device_reset, NULL);
}

static void handle_device_eraselast(struct mg_connection *c) {
  size_t ss = mg_flash_sector_size(), size = mg_flash_size();
  char *base = (char *) mg_flash_start(), *last = base + size - ss;
  if (mg_flash_bank() == 2) last -= size / 2;
  mg_flash_erase(last);
  mg_http_reply(c, 200, s_json_header, "true\n");
}

// HTTP request handler function
static void fn(struct mg_connection *c, int ev, void *ev_data) {
//	printf("Entered fn function, event: %d\r\n", ev);
	if (ev == MG_EV_ACCEPT) {
		if (c->fn_data != NULL) {  // TLS listener!
			struct mg_tls_opts opts = { 0 };
			opts.cert = mg_unpacked("/certs/server_cert.pem");
			opts.key = mg_unpacked("/certs/server_key.pem");
			mg_tls_init(c, &opts);
		}
	} else if (ev == MG_EV_HTTP_MSG) {
		struct mg_http_message *hm = (struct mg_http_message*) ev_data;
//		printf("Received HTTP request: %.*s\r\n", (int) hm->uri.len, hm->uri.buf);
	    if (strncmp(hm->uri.buf, "/api/stm32-time", hm->uri.len) != 0) {
//	        printf("Received HTTP request: %.*s\r\n", (int)hm->uri.len, hm->uri.buf);
	    }
		struct user *u = authenticate(hm);

		if (mg_match(hm->uri, mg_str("/api/#"), NULL) && u == NULL) {
			mg_http_reply(c, 403, "", "Not Authorised\n");
		} else if (mg_match(hm->uri, mg_str("/api/login"), NULL)) {
			handle_login(c, u);
		} else if (mg_match(hm->uri, mg_str("/api/logout"), NULL)) {
			handle_logout(c);
		} else if (mg_match(hm->uri, mg_str("/api/debug"), NULL)) {
			handle_debug(c, hm);
		} else if (mg_match(hm->uri, mg_str("/api/stats/get"), NULL)) {
			handle_stats_get(c);
		} else if (mg_match(hm->uri, mg_str("/api/events/get"), NULL)) {
			handle_events_get(c, hm);
		} else if (mg_match(hm->uri, mg_str("/api/settings/get"), NULL)) {
			handle_settings_get(c);
		} else if (mg_match(hm->uri, mg_str("/api/settings/set"), NULL)) {
			handle_settings_set(c, hm->body);
		} else if (mg_match(hm->uri, mg_str("/api/firmware/upload"), NULL)) {
			handle_firmware_upload(c, hm);
		} else if (mg_match(hm->uri, mg_str("/api/firmware/commit"), NULL)) {
			handle_firmware_commit(c);
		} else if (mg_match(hm->uri, mg_str("/api/firmware/rollback"), NULL)) {
			handle_firmware_rollback(c);
		} else if (mg_match(hm->uri, mg_str("/api/firmware/status"), NULL)) {
			handle_firmware_status(c);
		} else if (mg_match(hm->uri, mg_str("/api/device/reset"), NULL)) {
			handle_device_reset(c);
		} else if (mg_match(hm->uri, mg_str("/api/device/eraselast"), NULL)) {
			handle_device_eraselast(c);
		} else if (mg_match(hm->uri, mg_str("/api/select/get"), NULL)) {
			handle_select_get(c);
		} else if (mg_match(hm->uri, mg_str("/api/pintopin/get"), NULL)) {
			handle_pintopin_get(c);
		} else if (mg_match(hm->uri, mg_str("/api/select/set"), NULL)) {
			handle_select_set(c, hm);
		} else if (mg_match(hm->uri, mg_str("/api/switch/get"), NULL)) {
			handle_switch_get(c);
		} else if (mg_match(hm->uri, mg_str("/api/switch/set"), NULL)) {
			handle_switch_set(c, hm);
		} else if (mg_match(hm->uri, mg_str("/api/onoff/set"), NULL)) {
			handle_onoff_set(c, hm);
		} else if (mg_match(hm->uri, mg_str("/api/button/get"), NULL)) {
			handle_button_get(c);
		} else if (mg_match(hm->uri, mg_str("/api/button/set"), NULL)) {
			handle_button_set(c, hm);
		} else if (mg_match(hm->uri, mg_str("/api/encoder/get"), NULL)) {
			handle_encoder_get(c);
		} else if (mg_match(hm->uri, mg_str("/api/encoder/set"), NULL)) {
			handle_encoder_set(c, hm);
		} else if (mg_match(hm->uri, mg_str("/api/cron/get"), NULL)) {
			handle_timers_get(c);
		} else if (mg_match(hm->uri, mg_str("/api/numline/set"), NULL)) {
			handle_numline_set(c, hm);
		} else if (mg_match(hm->uri, mg_str("/api/cron/set"), NULL)) {
			handle_timers_set(c, hm);
		} else if (mg_match(hm->uri, mg_str("/api/mysett/get"), NULL)) {
			handle_mysett_get(c);
		} else if (mg_match(hm->uri, mg_str("/api/mysett/set"), NULL)) {
			handle_mysett_set(c, hm);
		} else if (mg_match(hm->uri, mg_str("/api/connection/del"), NULL)) {
			handle_connection_del(c, hm, PinsLinks);
		} else if (mg_match(hm->uri, mg_str("/api/stm32-time"), NULL)) {
			//printf("Matched /api/stm32-time route\n");handle_onewire_set
			handle_stm32time_get(c, hm);
		} else if (mg_match(hm->uri, mg_str("/api/temp/get"), NULL)) {
			handle_temp_get(c);
		} else if (mg_match(hm->uri, mg_str("/api/sim800l/get"), NULL)) {
			handle_sim800l_get(c);
		} else if (mg_match(hm->uri, mg_str("/api/sim800l/set"), NULL)) {
			handle_sim800l_set(c, hm);
		} else if (mg_match(hm->uri, mg_str("/api/monitoring/get"), NULL)) {
			handle_monitoring_get(c);
		} else if (mg_match(hm->uri, mg_str("/api/monitoring/set"), NULL)) {
			handle_monitoring_set(c, hm);
		} else if (mg_match(hm->uri, mg_str("/api/onewire/get"), NULL)) {
			handle_onewire_get(c);
		} else if (mg_match(hm->uri, mg_str("/api/sensor/set"), NULL)) {
			handle_sensor_set(c, hm);
		} else if (mg_match(hm->uri, mg_str("/api/onewire/set"), NULL)) {
			handle_onewire_set(c, hm);
		} else if (mg_match(hm->uri, mg_str("/api/*/*"), NULL)) {
		    const char *api_path = hm->uri.buf + 5;  // Skip "/api/"
		    const char *second_slash = strchr(api_path, '/');
		    if (second_slash) {
		        // Извлекаем токен для проверки
		        size_t token_len = second_slash - api_path;
		        if (token_len > 0 && token_len == strlen(SetSettings.token) &&
		            strncmp(api_path, SetSettings.token, token_len) == 0) {

		            const char *command = api_path;  // Полный путь с токеном
		            const char *end = strchr(command, ' ');  // Find end of URI
		            size_t command_len = end ? (size_t)(end - command) : strlen(command);

		            if (command_len > 0) {
		                printf("Extracted command with token: %.*s\n", (int)command_len, command);

		                // Пропускаем токен и проверяем команду
		                const char *cmd_after_token = second_slash + 1;

		                // Check if the command starts with "switch", "button", or "pwm"
		                if (strncmp(cmd_after_token, "switch", 6) == 0 ||
		                    strncmp(cmd_after_token, "button", 6) == 0 ||
		                    strncmp(cmd_after_token, "pwm", 3) == 0) {

		                    struct mg_http_message modified_hm = *hm;
		                    // Передаем полный URI вместе с токеном
		                    modified_hm.uri.buf = (char *)command;
		                    modified_hm.uri.len = command_len;

		                    api_handler(c, &modified_hm);
		                    return;  // Finish processing after calling handle_api
		                } else {
		                    printf("Invalid command format after token\n");
		                    mg_http_reply(c, 400, NULL, "Invalid command format\n");
		                    return;
		                }
		            }
		        } else {
		            printf("Invalid token\n");
		            mg_http_reply(c, 401, NULL, "Invalid token\n");
		            return;
		        }
		    }
		    // If we reach here, the URI format was invalid
		    mg_http_reply(c, 400, NULL, "Invalid API request format\n");
		    return;  // Finish processing after sending error
		} else if (mg_match(hm->uri, mg_str("/api/login"), NULL)) {
            handle_login(c, u);
        } else if (mg_match(hm->uri, mg_str("/api/logout"), NULL)) {
            handle_logout(c);
		} else {
//			printf("Did not match any known API pattern\r\n");
			struct mg_http_serve_opts opts;
			memset(&opts, 0, sizeof(opts));
#if MG_ARCH == MG_ARCH_UNIX || MG_ARCH == MG_ARCH_WIN32
      opts.root_dir = "web_root";  // On workstations, use filesystem
#else
			opts.root_dir = "/web_root";  // On embedded, use packed files
			opts.fs = &mg_fs_packed;
#endif
			mg_http_serve_dir(c, ev_data, &opts);
		}
		MG_DEBUG(("%lu %.*s %.*s -> %.*s", c->id, (int) hm->method.len, hm->method.buf, (int) hm->uri.len, hm->uri.buf, (int) 3, &c->send.buf[9]));
	}
}


// MQTT



static void fn_mqtt(struct mg_connection *c, int ev, void *ev_data, void *fn_data) {
  if (ev == MG_EV_OPEN) {
    MG_INFO(("%lu CREATED", c->id));
    // c->is_hexdumping = 1;
  } else if (ev == MG_EV_ERROR) {
    // On error, log error message
    MG_ERROR(("%lu ERROR %s", c->id, (char *) ev_data));
  } else if (ev == MG_EV_CONNECT) {
    // If target URL is SSL/TLS, command client connection to use TLS
    if (mg_url_is_ssl(get_mqtt_url())) {
      //struct mg_tls_opts opts = {.ca = "ca.pem"};
      //mg_tls_init(c, &opts);
    }
  } else if (ev == MG_EV_MQTT_OPEN) {// MQTT connect is successful
    struct mg_str subt = mg_str(s_sub_topic);
    struct mg_str pubt = mg_str(get_mqtt_topic()), data = mg_str("Hello from stm32!");
    MG_INFO(("%lu CONNECTED to %s", c->id, get_mqtt_url()));
    struct mg_mqtt_opts sub_opts;
    memset(&sub_opts, 0, sizeof(sub_opts));
    sub_opts.topic = subt;
    sub_opts.qos = s_qos;
    mg_mqtt_sub(c, &sub_opts);
    MG_INFO(("%lu SUBSCRIBED to %.*s", c->id, (int) subt.len, subt.buf));
    struct mg_mqtt_opts pub_opts;
    memset(&pub_opts, 0, sizeof(pub_opts));
    pub_opts.topic = pubt;
    pub_opts.message = data;
    pub_opts.qos = s_qos, pub_opts.retain = false;
    mg_mqtt_pub(c, &pub_opts);
   MG_INFO(("%lu PUBLISHED %.*s -> %.*s", c->id, (int) data.len, data.buf, (int) pubt.len, pubt.buf));
  } else if (ev == MG_EV_MQTT_MSG) {
    // When we get echo response, print it
    struct mg_mqtt_message *mm = (struct mg_mqtt_message *) ev_data;
   MG_INFO(("%lu RECEIVED %.*s <- %.*s", c->id, (int) mm->data.len, mm->data.buf, (int) mm->topic.len, mm->topic.buf));
  } else if (ev == MG_EV_CLOSE) {
    MG_INFO(("%lu CLOSED", c->id));
    s_conn = NULL;  // Mark that we're closed
  }
  (void) fn_data;
}

// Timer function - recreate client connection if it is closed
static void timer_fn_mqtt(void *arg) {
  struct mg_mgr *mgr = (struct mg_mgr *) arg;
  struct mg_mqtt_opts opts = {.clean = true,
                              .qos = s_qos,
                              .topic = mg_str(get_mqtt_topic()),
                              .version = 4,
                              .message = mg_str("bye")};
  if (s_conn == NULL) s_conn = mg_mqtt_connect(mgr, get_mqtt_url(), &opts, (mg_event_handler_t) fn_mqtt, NULL);
}

void web_init(struct mg_mgr *mgr) {
  s_settings.device_name = strdup("My Device");
  mg_http_listen(mgr, HTTP_URL, fn, NULL);
  mg_http_listen(mgr, HTTPS_URL, fn, (void *) 1);
  mg_timer_add(mgr, 10 * 1000, MG_TIMER_RUN_NOW | MG_TIMER_REPEAT, timer_sntp_fn, mgr);
  mg_timer_add(mgr, 1000, MG_TIMER_REPEAT | MG_TIMER_RUN_NOW, timer_fn_mqtt, mgr);
}
