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
//static struct user *authenticate(struct mg_http_message *hm) {
struct user *authenticate(struct mg_http_message *hm) {
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

void handle_login(struct mg_connection *c, struct user *u) {
  char cookie[256];
  mg_snprintf(cookie, sizeof(cookie),
              "Set-Cookie: access_token=%s; Path=/; "
              "%sHttpOnly; SameSite=Lax; Max-Age=%d\r\n",
              u->access_token, c->is_tls ? "Secure; " : "", 3600 * 24);
  mg_http_reply(c, 200, cookie, "{%m:%m}", MG_ESC("user"), MG_ESC(u->name));
}

void handle_logout(struct mg_connection *c) {
  char cookie[256];
  mg_snprintf(cookie, sizeof(cookie),
              "Set-Cookie: access_token=; Path=/; "
              "Expires=Thu, 01 Jan 1970 00:00:00 UTC; "
              "%sHttpOnly; Max-Age=0; \r\n",
              c->is_tls ? "Secure; " : "");
  mg_http_reply(c, 200, cookie, "true\n");
}

void handle_debug(struct mg_connection *c, struct mg_http_message *hm) {
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

void handle_stats_get(struct mg_connection *c) {
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

void handle_events_get(struct mg_connection *c,
                              struct mg_http_message *hm) {
  int pageno = mg_json_get_long(hm->body, "$.page", 1);
  mg_http_reply(c, 200, s_json_header, "{%m:[%M], %m:%d}\n", MG_ESC("arr"),
                print_events, pageno, MG_ESC("totalCount"), MAX_EVENTS_NO);
}

void handle_settings_set(struct mg_connection *c, struct mg_str body) {
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

void handle_settings_get(struct mg_connection *c) {
  mg_http_reply(c, 200, s_json_header, "{%m:%s,%m:%hhu,%m:%hhu,%m:%m}\n",  //
                MG_ESC("log_enabled"),
                s_settings.log_enabled ? "true" : "false",    //
                MG_ESC("log_level"), s_settings.log_level,    //
                MG_ESC("brightness"), s_settings.brightness,  //
                MG_ESC("device_name"), MG_ESC(s_settings.device_name));
}

void handle_firmware_upload(struct mg_connection *c,
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

void handle_firmware_commit(struct mg_connection *c) {
  mg_http_reply(c, 200, s_json_header, "%s\n",
                mg_ota_commit() ? "true" : "false");
}

void handle_firmware_rollback(struct mg_connection *c) {
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

void handle_firmware_status(struct mg_connection *c) {
  mg_http_reply(c, 200, s_json_header, "[%M,%M]\n", print_status,
                MG_FIRMWARE_CURRENT, print_status, MG_FIRMWARE_PREVIOUS);
}

void handle_device_reset(struct mg_connection *c) {
  mg_http_reply(c, 200, s_json_header, "true\n");
  mg_timer_add(c->mgr, 500, 0, (void (*)(void *)) mg_device_reset, NULL);
}

void handle_device_eraselast(struct mg_connection *c) {
  size_t ss = mg_flash_sector_size(), size = mg_flash_size();
  char *base = (char *) mg_flash_start(), *last = base + size - ss;
  if (mg_flash_bank() == 2) last -= size / 2;
  mg_flash_erase(last);
  mg_http_reply(c, 200, s_json_header, "true\n");
}
// Определяем типы соединений
#define CONN_TYPE_HTTP  1
#define CONN_TYPE_HTTPS 2
#define CONN_TYPE_MQTT  3

static void *HTTPS_MARKER = (void *) 1; // Маркер для HTTPS-соединений

// HTTP, HTTPS, MQTT request handler function
static const char *get_connection_header(struct mg_http_message *hm) {
    struct mg_str *conn_hdr = mg_http_get_header(hm, "Connection");
    if (conn_hdr && mg_vcmp(conn_hdr, "close") == 0) {
        return "Connection: close\r\n";
    }
    return "Connection: keep-alive\r\n";
}

void fn(struct mg_connection *c, int ev, void *ev_data, void *fn_data) {
	// --- Логирование всех событий для отладки ---
//	MG_DEBUG(("%lu Event received: %d", c->id, ev));
	// --- TLS-specific event handling (for HTTPS) ---
//	if (c->is_tls) {
//		switch (ev) {
//		case MG_EV_OPEN:
//			MG_INFO(("%lu HTTPS connection created (TLS enabled)", c->id));
//			break;
//		case MG_EV_READ:
//			if (c->recv.len > 0) {
//				MG_INFO(("%lu HTTPS data received (TLS enabled, %lu bytes)", c->id, c->recv.len));
//			}
//			break;
//		case MG_EV_TLS_HS:
//			MG_INFO(("%lu HTTPS TLS handshake completed", c->id));
//			break;
//		case MG_EV_CLOSE:
//			MG_INFO(("%lu HTTPS connection closed (TLS enabled)", c->id));
//			break;
//		default:
//			// Закомментировано для уменьшения спама
//			// MG_DEBUG(("%lu TLS-specific event: %d", c->id, ev));
//			break;
//		}
//	}
	// --- General events (for HTTP, HTTPS, and MQTT) ---
	switch (ev) {
	case MG_EV_OPEN:
		MG_INFO(("%lu Connection created (TLS: %d, fn_data: %p)", c->id, c->is_tls, fn_data));
		break;

    case MG_EV_ACCEPT: {
        unsigned int local_port = mg_ntohs(c->loc.port);
        MG_INFO(("Accept: local %M remote %M", mg_print_ip_port, &c->loc, mg_print_ip_port, &c->rem));

        if (local_port == atoi(HTTP_PORT)) {
            c->fn_data = (void *)CONN_TYPE_HTTP;
            MG_INFO(("HTTP connection accepted on port %s", HTTP_PORT));
        }
        else if (local_port == atoi(HTTPS_PORT)) {
            c->fn_data = (void *)CONN_TYPE_HTTPS;
            c->is_tls = 1; // Где 1-указывает, что соединение должно использовать TLS
            c->is_tls_hs = 0; // Где 0-инициализирует состояние TLS handshake
            MG_INFO(("HTTPS connection accepted on port %s", HTTPS_PORT));
/***************************************************************************/
            if (fn_data != NULL) {
                // Локальные буферы для сертификатов и ключей (убираем static, чтобы избежать проблем в многопоточной среде)
                char cert_buffer[1024] = {0};
                char key_buffer[512] = {0};

                // Загрузка сертификатов
                bool cert_loaded = https_get_tls_cert(cert_buffer, sizeof(cert_buffer));
                bool key_loaded = https_get_tls_key(key_buffer, sizeof(key_buffer));

                if (!cert_loaded || !key_loaded) {
                    MG_ERROR(("Error: Failed to load certificate or key"));
                    mg_close_conn(c); // Закрываем соединение в случае ошибки
                    return;
                }

                // Проверка корректности формата данных (опционально, для повышения надежности)
                if (strstr(cert_buffer, "-----BEGIN CERTIFICATE-----") == NULL ||
                    strstr(cert_buffer, "-----END CERTIFICATE-----") == NULL) {
                    MG_ERROR(("Error: Invalid certificate format"));
                    mg_close_conn(c);
                    return;
                }
                if (strstr(key_buffer, "-----BEGIN EC PRIVATE KEY-----") == NULL ||
                    strstr(key_buffer, "-----END EC PRIVATE KEY-----") == NULL) {
                    MG_ERROR(("Error: Invalid key format"));
                    mg_close_conn(c);
                    return;
                }

//                MG_INFO(("Loaded certificate:\n%s", cert_buffer));
//                printf("Loaded certificate:\r\n%s", cert_buffer);
//                MG_INFO(("Loaded key:\n%s", key_buffer));
//                printf("Loaded key:\r\n%s", key_buffer);

                // Прямое сравнение байт за байтом данных (cert_buffer и ) с теми, которые работают (TLS_CERT и TLS_KEY), чтобы убедиться, что они идентичны
//                uint8_t mis_sert = 0;
//                uint8_t mis_key = 0;
//                for (size_t i = 0; i < strlen(TLS_CERT) && i < strlen(cert_buffer); i++) {
//                    if (TLS_CERT[i] != cert_buffer[i]) {
//                        printf("mis_sert at position %u: TLS_CERT[%u]='%c' (0x%02X), mis_sert[%u]='%c' (0x%02X)\n",
//                               i, i, TLS_CERT[i], (unsigned char)TLS_CERT[i],
//                               i, cert_buffer[i], (unsigned char)cert_buffer[i]);
//                        mis_sert++;
//                        if (mis_sert >= 254) break;  // Ограничиваем количество расхождений в выводе
//                    }
//                }
//                for (size_t i = 0; i < strlen(TLS_KEY) && i < strlen(key_buffer); i++) {
//                    if (TLS_KEY[i] != key_buffer[i]) {
//                        printf("mis_key at position %u: TLS_KEY[%u]='%c' (0x%02X), mis_key[%u]='%c' (0x%02X)\n",
//                               i, i, TLS_KEY[i], (unsigned char)TLS_KEY[i],
//                               i, key_buffer[i], (unsigned char)key_buffer[i]);
//                        mis_key++;
//                        if (mis_key >= 254) break;  // Ограничиваем количество расхождений в выводе
//                    }
//                }

                // Инициализация TLS с использованием данных в чистом PEM-формате
                struct mg_tls_opts opts = {
                    .cert = mg_str(cert_buffer),
                    .key = mg_str(key_buffer),
                };
                mg_tls_init(c, &opts);

                // Проверяем успешность инициализации TLS
                if (c->tls == NULL) {
                    MG_ERROR(("Error: TLS initialization failed"));
                    mg_close_conn(c); // Закрываем соединение в случае ошибки
                    return;
                }
            }
        }
    }
    break;
/***************************************************************************/
	case MG_EV_HTTP_MSG: {
		struct mg_http_message *hm = (struct mg_http_message*) ev_data;
		MG_INFO(("%lu Received HTTP/HTTPS message (TLS: %d, URI: %.*s)", c->id, c->is_tls, (int) hm->uri.len, hm->uri.buf));

		if (c->is_tls) {
			MG_INFO(("%lu HTTPS message received: %.*s", c->id, (int) hm->uri.len, hm->uri.buf));
		} else {
			MG_INFO(("%lu HTTP message received: %.*s", c->id, (int) hm->uri.len, hm->uri.buf));
		}

		// Проверка авторизации для API
		struct user *u = authenticate(hm);
		MG_INFO(("%lu Authentication result: user = %p", c->id, (void*) u));

		struct mg_str uri = hm->uri;
		MG_INFO(("%lu Checking URI: %.*s (len: %d)", c->id, (int) uri.len, uri.buf, (int) uri.len));

		// Обработка корневого пути (/) и статических страниц
		if (uri.len == 1 && strncmp(uri.buf, "/", uri.len) == 0) {
			MG_INFO(("%lu Serving root path (/) for connection", c->id));
			struct mg_http_message *hm = (struct mg_http_message*) ev_data;
//		    const char *conn_hdr = get_connection_header(hm); // Получаем заголовок Connection

			// Проверяем, запросил ли клиент Connection: close
			struct mg_str *conn_value = mg_http_get_header(hm, "Connection");
			bool is_connection_close = conn_value && mg_vcmp(conn_value, "close") == 0;

			if (is_connection_close) {
				// Если клиент запросил Connection: close, используем кастомную отправку ответа
				char extra_headers[256];
				snprintf(extra_headers, sizeof(extra_headers), "Cache-Control: max-age=3600\r\nConnection: close\r\n");

				// Читаем содержимое index.html (или другого файла) вручную
				struct mg_http_serve_opts opts;
				memset(&opts, 0, sizeof(opts));
#if MG_ARCH == MG_ARCH_UNIX || MG_ARCH == MG_ARCH_WIN32
		        opts.root_dir = "web_root";
		        MG_INFO(("%lu Using filesystem root_dir: %s", c->id, opts.root_dir));
		#else
				opts.root_dir = "/web_root";
				opts.fs = &mg_fs_packed;
				MG_INFO(("%lu Using packed filesystem root_dir: %s", c->id, opts.root_dir));
#endif

				// Читаем файл index.html
				char path[256];
				snprintf(path, sizeof(path), "%s/index.html", opts.root_dir);
				struct mg_fd *fd = mg_fs_open(opts.fs, path, MG_FS_READ);
				if (fd == NULL) {
					mg_http_reply(c, 404, extra_headers, "Not found\n");
				} else {
					// Читаем содержимое файла
					char *data = NULL;
					size_t size = 0;
					struct mg_str file_content = mg_file_read(&mg_fs_posix, path);
					if (file_content.len > 0) {
						data = file_content.buf;
						size = file_content.len;
					}

					if (data == NULL) {
						mg_http_reply(c, 500, extra_headers, "Error reading file\n");
					} else {
						// Отправляем ответ с кастомными заголовками
						mg_printf(c, "HTTP/1.1 200 OK\r\n"
								"Content-Type: text/html; charset=utf-8\r\n"
								"Content-Length: %u\r\n"
								"%s"
								"\r\n", size, extra_headers);
						mg_send(c, data, size);
						free(data); // Освобождаем память, если mg_file_read выделил ее
					}
					mg_fs_close(fd);
				}

				// Указываем Mongoose, что соединение должно быть закрыто
				c->is_draining = 1;
		    } else {
		        // Если клиент не запросил Connection: close, используем mg_http_serve_dir
		        char extra_headers[256];
		        snprintf(extra_headers, sizeof(extra_headers),
		                 "Cache-Control: max-age=3600\r\nConnection: keep-alive\r\n");

		        struct mg_http_serve_opts opts;
		        memset(&opts, 0, sizeof(opts));
		#if MG_ARCH == MG_ARCH_UNIX || MG_ARCH == MG_ARCH_WIN32
		        opts.root_dir = "web_root";
		        MG_INFO(("%lu Using filesystem root_dir: %s", c->id, opts.root_dir));
		#else
		        opts.root_dir = "/web_root";
		        opts.fs = &mg_fs_packed;
		        MG_INFO(("%lu Using packed filesystem root_dir: %s", c->id, opts.root_dir));
		#endif
		        opts.extra_headers = extra_headers; // Добавляем кастомные заголовки

		        // Используем mg_http_serve_dir для обслуживания всей директории
		        mg_http_serve_dir(c, ev_data, &opts);
		        MG_INFO(("%lu Root path served successfully", c->id));
		    }
		}  else {
			MG_INFO(("%lu Not root path, proceeding to API handling", c->id));

			// Обработка API-запросов
			if (mg_match(hm->uri, mg_str("/api/#"), NULL) && u == NULL) {
				MG_ERROR(("%lu Unauthorized API request: %.*s", c->id, (int) hm->uri.len, hm->uri.buf));
				const char *conn_hdr = get_connection_header(hm);
				mg_http_reply(c, 403, conn_hdr, "Not Authorised\n");
			} else if (mg_match(hm->uri, mg_str("/api/login"), NULL)) {
				MG_INFO(("%lu Processing /api/login", c->id));
				handle_login(c, u);
			} else if (mg_match(hm->uri, mg_str("/api/logout"), NULL)) {
				MG_INFO(("%lu Processing /api/logout", c->id));
				handle_logout(c);
			} else if (mg_match(hm->uri, mg_str("/api/debug"), NULL)) {
				MG_INFO(("%lu Processing /api/debug", c->id));
				handle_debug(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/stats/get"), NULL)) {
				MG_INFO(("%lu Processing /api/stats/get", c->id));
				handle_stats_get(c);
			} else if (mg_match(hm->uri, mg_str("/api/events/get"), NULL)) {
				MG_INFO(("%lu Processing /api/events/get", c->id));
				handle_events_get(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/settings/get"), NULL)) {
				MG_INFO(("%lu Processing /api/settings/get", c->id));
				handle_settings_get(c);
			} else if (mg_match(hm->uri, mg_str("/api/settings/set"), NULL)) {
				MG_INFO(("%lu Processing /api/settings/set", c->id));
				handle_settings_set(c, hm->body);
			} else if (mg_match(hm->uri, mg_str("/api/firmware/upload"), NULL)) {
				MG_INFO(("%lu Processing /api/firmware/upload", c->id));
				handle_firmware_upload(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/firmware/commit"), NULL)) {
				MG_INFO(("%lu Processing /api/firmware/commit", c->id));
				handle_firmware_commit(c);
			} else if (mg_match(hm->uri, mg_str("/api/firmware/rollback"), NULL)) {
				MG_INFO(("%lu Processing /api/firmware/rollback", c->id));
				handle_firmware_rollback(c);
			} else if (mg_match(hm->uri, mg_str("/api/firmware/status"), NULL)) {
				MG_INFO(("%lu Processing /api/firmware/status", c->id));
				handle_firmware_status(c);
			} else if (mg_match(hm->uri, mg_str("/api/device/reset"), NULL)) {
				MG_INFO(("%lu Processing /api/device/reset", c->id));
				handle_device_reset(c);
			} else if (mg_match(hm->uri, mg_str("/api/device/eraselast"), NULL)) {
				MG_INFO(("%lu Processing /api/device/eraselast", c->id));
				handle_device_eraselast(c);
			} else if (mg_match(hm->uri, mg_str("/api/select/get"), NULL)) {
				MG_INFO(("%lu Processing /api/select/get", c->id));
				handle_select_get(c);
			} else if (mg_match(hm->uri, mg_str("/api/pintopin/get"), NULL)) {
				MG_INFO(("%lu Processing /api/pintopin/get", c->id));
				handle_pintopin_get(c);
			} else if (mg_match(hm->uri, mg_str("/api/select/set"), NULL)) {
				MG_INFO(("%lu Processing /api/select/set", c->id));
				handle_select_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/switch/get"), NULL)) {
				MG_INFO(("%lu Processing /api/switch/get", c->id));
				handle_switch_get(c);
			} else if (mg_match(hm->uri, mg_str("/api/switch/set"), NULL)) {
				MG_INFO(("%lu Processing /api/switch/set", c->id));
				handle_switch_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/onoff/set"), NULL)) {
				MG_INFO(("%lu Processing /api/onoff/set", c->id));
				handle_onoff_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/button/get"), NULL)) {
				MG_INFO(("%lu Processing /api/button/get", c->id));
				handle_button_get(c);
			} else if (mg_match(hm->uri, mg_str("/api/button/set"), NULL)) {
				MG_INFO(("%lu Processing /api/button/set", c->id));
				handle_button_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/encoder/get"), NULL)) {
				MG_INFO(("%lu Processing /api/encoder/get", c->id));
				handle_encoder_get(c);
			} else if (mg_match(hm->uri, mg_str("/api/encoder/set"), NULL)) {
				MG_INFO(("%lu Processing /api/encoder/set", c->id));
				handle_encoder_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/cron/get"), NULL)) {
				MG_INFO(("%lu Processing /api/cron/get", c->id));
				handle_timers_get(c);
			} else if (mg_match(hm->uri, mg_str("/api/numline/set"), NULL)) {
				MG_INFO(("%lu Processing /api/numline/set", c->id));
				handle_numline_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/cron/set"), NULL)) {
				MG_INFO(("%lu Processing /api/cron/set", c->id));
				handle_timers_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/mysett/get"), NULL)) {
				MG_INFO(("%lu Processing /api/mysett/get", c->id));
				handle_mysett_get(c);
			} else if (mg_match(hm->uri, mg_str("/api/mysett/set"), NULL)) {
				MG_INFO(("%lu Processing /api/mysett/set", c->id));
				handle_mysett_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/connection/del"), NULL)) {
				MG_INFO(("%lu Processing /api/connection/del", c->id));
				handle_connection_del(c, hm, PinsLinks);
			} else if (mg_match(hm->uri, mg_str("/api/stm32-time"), NULL)) {
				MG_INFO(("%lu Processing /api/stm32-time", c->id));
				handle_stm32time_get(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/temp/get"), NULL)) {
				MG_INFO(("%lu Processing /api/temp/get", c->id));
				handle_temp_get(c);
			} else if (mg_match(hm->uri, mg_str("/api/sim800l/get"), NULL)) {
				MG_INFO(("%lu Processing /api/sim800l/get", c->id));
				handle_sim800l_get(c);
			} else if (mg_match(hm->uri, mg_str("/api/sim800l/set"), NULL)) {
				MG_INFO(("%lu Processing /api/sim800l/set", c->id));
				handle_sim800l_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/monitoring/get"), NULL)) {
				MG_INFO(("%lu Processing /api/monitoring/get", c->id));
				handle_monitoring_get(c);
			} else if (mg_match(hm->uri, mg_str("/api/monitoring/set"), NULL)) {
				MG_INFO(("%lu Processing /api/monitoring/set", c->id));
				handle_monitoring_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/onewire/get"), NULL)) {
				MG_INFO(("%lu Processing /api/onewire/get", c->id));
				handle_onewire_get(c);
			} else if (mg_match(hm->uri, mg_str("/api/sensor/set"), NULL)) {
				MG_INFO(("%lu Processing /api/sensor/set", c->id));
				handle_sensor_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/onewire/set"), NULL)) {
				MG_INFO(("%lu Processing /api/onewire/set", c->id));
				handle_onewire_set(c, hm);
			} else if (mg_match(hm->uri, mg_str("/api/*/*"), NULL)) {
				MG_INFO(("%lu Processing /api/*/*", c->id));
				const char *api_path = hm->uri.buf + 5;  // Skip "/api/"
				const char *second_slash = strchr(api_path, '/');
				if (second_slash) {
					// Извлекаем токен для проверки
					size_t token_len = second_slash - api_path;
					if (token_len > 0 && token_len == strlen(SetSettings.token) && strncmp(api_path, SetSettings.token, token_len) == 0) {
						const char *command = api_path;  // Полный путь с токеном
						const char *end = strchr(command, ' ');  // Find end of URI
						size_t command_len = end ? (size_t) (end - command) : strlen(command);

						if (command_len > 0) {
							// Пропускаем токен и проверяем команду
							const char *cmd_after_token = second_slash + 1;
							if (strncmp(cmd_after_token, "switch", 6) == 0 || strncmp(cmd_after_token, "button", 6) == 0 || strncmp(cmd_after_token, "pwm", 3) == 0) {
								struct mg_http_message modified_hm = *hm;
								modified_hm.uri.buf = (char*) command;
								modified_hm.uri.len = command_len;
								MG_INFO(("%lu Processing API command with token: %.*s", c->id, (int) command_len, command));
								api_handler(c, &modified_hm);
							} else {
								MG_ERROR(("%lu Invalid command format: %.*s", c->id, (int)(command_len - token_len - 1), cmd_after_token));
								mg_http_reply(c, 400, NULL, "Invalid command format\n");
							}
						} else {
							MG_ERROR(("%lu Empty command after token", c->id));
							mg_http_reply(c, 400, NULL, "Empty command\n");
						}
					} else {
						MG_ERROR(("%lu Invalid token: %.*s", c->id, (int) token_len, api_path));
						mg_http_reply(c, 401, NULL, "Invalid token\n");
					}
				} else {
					MG_ERROR(("%lu Invalid API path format: %.*s", c->id, (int) hm->uri.len, hm->uri.buf));
					mg_http_reply(c, 400, NULL, "Invalid API path format\n");
				}
			} else {
				// Обработка статических страниц для всех остальных запросов
				MG_INFO(("%lu Did not match any API pattern, serving static content", c->id));
				struct mg_http_serve_opts opts;
				memset(&opts, 0, sizeof(opts));
#if MG_ARCH == MG_ARCH_UNIX || MG_ARCH == MG_ARCH_WIN32
                            opts.root_dir = "web_root";
                            MG_INFO(("%lu Using filesystem root_dir: %s for static content", c->id, opts.root_dir));
            #else
				opts.root_dir = "/web_root";
				opts.fs = &mg_fs_packed;
				MG_INFO(("%lu Using packed filesystem root_dir: %s for static content", c->id, opts.root_dir));
#endif
				mg_http_serve_dir(c, ev_data, &opts);
				MG_INFO(("%lu Static content served", c->id));
			}
		}
		MG_INFO(("%lu HTTP/HTTPS request processing completed", c->id));
		break;
	}
		// --- Обработка MQTT-событий ---
//	case MG_EV_MQTT_OPEN:
//		MG_INFO(("%lu MQTT connection opened", c->id));
//		break;
//
//	case MG_EV_MQTT_MSG: {
//		struct mg_mqtt_message *mm = (struct mg_mqtt_message*) ev_data;
//		MG_INFO(("%lu MQTT message received (topic: %.*s)", c->id, (int) mm->topic.len, mm->topic.buf));
//		if (mm->topic.len == strlen(SetSettings.rxmqttop) && strncmp(mm->topic.buf, SetSettings.rxmqttop, mm->topic.len) == 0) {
//			if (mm->data.len > 0) {
//				MG_INFO(("%lu Processing MQTT message: %.*s", c->id, (int) mm->data.len, mm->data.buf));
//				mqtt_message_handler(SetSettings.rxmqttop, (const char*) mm->data.buf);
//			} else {
//				MG_INFO(("%lu Empty MQTT message received", c->id));
//			}
//		} else {
//			MG_DEBUG(("%lu Unknown MQTT topic: %.*s", c->id, (int) mm->topic.len, mm->topic.buf));
//		}
//		MG_INFO(("%lu MQTT request processing completed", c->id));
//		break;
//	}

	case MG_EV_CLOSE:
		MG_INFO(("%lu Connection closed (TLS: %d)", c->id, c->is_tls));
		break;

	case MG_EV_ERROR:
		MG_ERROR(("%lu ERROR: %s", c->id, (char*) ev_data));
		break;

	case MG_EV_POLL:
		// Закомментировано для уменьшения спама
		// MG_DEBUG(("%lu MG_EV_POLL: Connection polled", c->id));
		// Здесь можно добавить проверку таймаутов или обновление состояния, если требуется
		break;

	default:
		// Логирование неизвестных событий для отладки
		MG_DEBUG(("%lu Unknown event: %d", c->id, ev));
		break;
	}
}
/****************************************************************/

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
//static void timer_fn_mqtt(void *arg) {
void timer_fn_mqtt(void *arg) {
  struct mg_mgr *mgr = (struct mg_mgr *) arg;
  struct mg_mqtt_opts opts = {.clean = true,
                              .qos = s_qos,
                              .topic = mg_str(get_mqtt_topic()),
                              .version = 4,
                              .message = mg_str("bye")};
  if (s_conn == NULL) s_conn = mg_mqtt_connect(mgr, get_mqtt_url(), &opts, (mg_event_handler_t) fn_mqtt, NULL);
}

//void web_init(struct mg_mgr *mgr) {
//  s_settings.device_name = strdup("My Device");
//  mg_http_listen(mgr, HTTP_URL, (mg_event_handler_t)fn, NULL);
//  mg_http_listen(mgr, HTTPS_URL, (mg_event_handler_t)fn, (void *) 1);
//  mg_timer_add(mgr, 10 * 1000, MG_TIMER_RUN_NOW | MG_TIMER_REPEAT, timer_sntp_fn, mgr);
//  mg_timer_add(mgr, 1000, MG_TIMER_REPEAT | MG_TIMER_RUN_NOW, timer_fn_mqtt, mgr);
//}
void web_init(struct mg_mgr *mgr) {
    // Инициализация настроек устройства
    s_settings.device_name = strdup("My Device");

    // Формируем URL для HTTP, HTTPS и MQTT
    char http_url[32], https_url[32], mqtt_url[32];
    snprintf(http_url, sizeof(http_url), "http://0.0.0.0:%s", HTTP_PORT);
    snprintf(https_url, sizeof(https_url), "https://0.0.0.0:%s", HTTPS_PORT);
    snprintf(mqtt_url, sizeof(mqtt_url), "mqtt://0.0.0.0:%s", MQTT_PORT);

    // Запуск HTTP-сервера
    struct mg_connection *http_conn = mg_http_listen(mgr, http_url, (mg_event_handler_t)fn, NULL);
    if (http_conn) {
        MG_INFO(("HTTP server started on %s, conn=%p", http_url, (void *)http_conn));
    } else {
        MG_ERROR(("Failed to start HTTP server on %s", http_url));
    }

    // Запуск HTTPS-сервера с маркером HTTPS_MARKER
    struct mg_connection *https_conn = mg_http_listen(mgr, https_url, (mg_event_handler_t)fn, HTTPS_MARKER);
    if (https_conn) {
        MG_INFO(("HTTPS server started on %s, conn=%p", https_url, (void *)https_conn));
    } else {
        MG_ERROR(("Failed to start HTTPS server on %s", https_url));
    }

    // Запуск MQTT-сервера (если требуется)
    struct mg_connection *mqtt_conn = mg_mqtt_listen(mgr, mqtt_url, (mg_event_handler_t)fn, NULL);
    if (mqtt_conn) {
        MG_INFO(("MQTT server started on %s, conn=%p", mqtt_url, (void *)mqtt_conn));
    } else {
        MG_ERROR(("Failed to start MQTT server on %s", mqtt_url));
    }

    // Добавление таймеров
    mg_timer_add(mgr, 10 * 1000, MG_TIMER_RUN_NOW | MG_TIMER_REPEAT, timer_sntp_fn, mgr);
    mg_timer_add(mgr, 1000, MG_TIMER_REPEAT | MG_TIMER_RUN_NOW, timer_fn_mqtt, mgr);
}
/*********************************** From Zagotovka ****************************************************/
extern bool *flagmqtt;
void setup_mqtt(struct mg_mgr *mgr, struct mg_tcpip_if *mif){
    if (mif->state != MG_TCPIP_STATE_READY) {// Проверяем готовность сети
        MG_INFO(("setup_mqtt: Network not ready, skipping MQTT setup"));
        return; // Если сеть не готова, выходим
    }
    // Инициализация MQTT (выполняется только один раз)
    if (SetSettings.check_mqtt) {
        set_mqtt_topic(SetSettings.txmqttop);  // Установим топик (например, "Swarm")
        MG_INFO(("set_mqtt_topic: Topic set to: %s", SetSettings.txmqttop));

        // Формирование URL с корректной схемой mqtt://
        char mqtt_url[50];  // Увеличен размер буфера для URL
        int result = snprintf(mqtt_url, sizeof(mqtt_url), "http://%d.%d.%d.%d:%d",
                              SetSettings.mqtt_hst0, SetSettings.mqtt_hst1,
                              SetSettings.mqtt_hst2, SetSettings.mqtt_hst3,
                              SetSettings.mqtt_prt);
        if (result < 0 || result >= sizeof(mqtt_url)) {
            MG_ERROR(("Error: MQTT URL truncated or formatting error"));
        } else {
            set_mqtt_url(mqtt_url);
            MG_INFO(("MQTT URL set: %s", mqtt_url));
        }

        // Добавление таймера для MQTT
        MG_INFO(("Adding MQTT timer"));
        mg_timer_add(mgr, 3000, MG_TIMER_REPEAT | MG_TIMER_RUN_NOW, timer_fn_mqtt, mgr);
        *flagmqtt = true; // Устанавливаем флаг, что инициализация выполнена
    } else {
        MG_INFO(("MQTT is disabled in settings"));
        *flagmqtt = true; // Устанавливаем флаг, чтобы не пытаться инициализировать снова
    }
}
