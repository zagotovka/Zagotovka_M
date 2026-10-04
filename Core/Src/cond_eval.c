/*
 * cond_eval.c — вычислитель дополнительных условий срабатывания действий.
 * См. описание синтаксиса в cond_eval.h.
 *
 * Разбор выражения полностью итеративный (схема "сортировочной станции"),
 * без рекурсии: стеки операторов/операндов фиксированной глубины,
 * переполнение -> ошибка разбора. Сравнения (=, >, <, g, l, >=, <=)
 * сворачиваются на уровне атома: "RV1>50&R2" == (RV1>50)&R2.
 * Приоритет: '!' выше, затем '&', затем '|'.
 */

#include "cond_eval.h"
#include "db.h"
#include "zagotovka.h"
#include "main.h"
#include "ds18b20Config.h"
#include "multi_button.h"
#include "stm32f7xx_hal.h"
#include "FreeRTOS.h"
#include <string.h>
#include <stdlib.h>
#include <stdio.h>
#include <time.h>

/* ── Внешние объекты состояния ── */
extern struct Button *button;              /* DTCM, индекс = ID пина */
extern ds18b20_pin_t ds18b20[MAX_DS18B20_P];
extern dht22_pin_t *dht22;                 /* DTCM */

/* ── Библиотека условий (строки живут в SetSettings.conds) ──
 * idx == 0            - условие не выбрано -> true (безусловное поведение);
 * idx вне диапазона   - true (защита от мусора);
 * ячейка ПУСТАЯ       - false! Иначе ссылка "C5" на незаполненную ячейку
 *                       сделала бы действие безусловным. */
bool cond_eval_ref(uint8_t idx) {
  if (idx == 0 || idx > NUMCOND) return true;
  if (SetSettings.conds[idx - 1][0] == '\0') return false;
  return cond_eval(SetSettings.conds[idx - 1]);
}

/* ── Время суток для Sr/Ss ──
 * Кэш на 1 с. Гонки между задачами безопасны: запись атомарна,
 * худший случай — секундной давности значение. */
static volatile uint32_t ss_calc_tick = 0;
static volatile int8_t ss_is_day = -1; /* -1 неизвестно, 1 день, 0 ночь */

static void cond_timeofday_update(void) {
  uint32_t now = HAL_GetTick();
  int8_t cached = ss_is_day;
  if (cached >= 0 && (now - ss_calc_tick) < 1000u) return;

  int8_t day = -1;
  if (SetSettings.sunrise[0] != '\0' && SetSettings.sunset[0] != '\0') {
    struct tm tcopy;
    taskENTER_CRITICAL();
    memcpy(&tcopy, &timez_copy, sizeof(tcopy));
    taskEXIT_CRITICAL();

    int h1 = 0, m1 = 0, h2 = 0, m2 = 0;
    if (sscanf(SetSettings.sunrise, "%d:%d", &h1, &m1) == 2 &&
        sscanf(SetSettings.sunset, "%d:%d", &h2, &m2) == 2) {
      struct tm st = tcopy, et = tcopy;
      st.tm_hour = h1; st.tm_min = m1; st.tm_sec = 0;
      et.tm_hour = h2; et.tm_min = m2; et.tm_sec = 0;
      time_t cur = mktime(&tcopy);
      time_t sr = mktime(&st);
      time_t ss = mktime(&et);
      if (cur >= sr && cur < ss) day = 1; else day = 0;
    }
  }
  if (day >= 0) {
    ss_is_day = day;
    ss_calc_tick = now;
  }
  /* Ненастроенное время: day остаётся -1, кэш не заполняем —
   * и Sr, и Ss читаются как false. */
}

/* ── Значения операндов ──
 * Трёхзначная логика (Клейни): 0 - ложь, 1 - истина, COND_UNKNOWN - неизвестно.
 * «Неизвестно» (мёртвый датчик) проходит через !, & и | и в итоге БЛОКИРУЕТ
 * действие: !(T5<25) при отсутствии данных не станет истиной. */
#define COND_NOVAL INT32_MIN
#define COND_UNKNOWN COND_NOVAL

static int32_t cond_read_state(int id) {
  if (id >= 0 && id < NUMPIN) {
    if (PinsConf[id].topin == 5) /* PWM: "включен" = яркость > 0 */
      return (PinsConf[id].dvalue > 0) ? 1 : 0;
    if (PinsInfo[id].gpio_name)
      return (int32_t)HAL_GPIO_ReadPin(PinsInfo[id].gpio_name,
                                       PinsInfo[id].hal_pin);
    return 0;
  }
  if (id >= NUMPIN && id < NUMPIN + NUMZBEE)
    return ZigbeeConf[id - NUMPIN].state ? 1 : 0;
  return 0;
}

static int32_t cond_read_value(int id) {
  if (id >= 0 && id < NUMPIN) {
    if (PinsConf[id].topin == 5) return (int32_t)PinsConf[id].dvalue;
    return 0;
  }
  if (id >= NUMPIN && id < NUMPIN + NUMZBEE)
    return (int32_t)ZigbeeConf[id - NUMPIN].dvalue;
  return 0;
}

/* Физическая кнопка: multi_button state: 1 - нажата, 3 - нажата повторно
 * (внутри окна двойного клика), 5 - удержание (long-hold). */
static void cond_read_button(int id, int32_t *pressed, int32_t *held) {
  *pressed = 0;
  *held = 0;
  if (id >= 0 && id < NUMPIN) {
    if (button && PinsConf[id].topin == 1) {
      uint8_t st = button[id].state;
      if (st == 1 || st == 3 || st == 5) *pressed = 1;
      if (st == 5) *held = 1;
    }
  } else if (id >= NUMPIN && id < NUMPIN + NUMZBEE) {
    uint8_t st = ZigbeeConf[id - NUMPIN].vbtn_state;
    if (st == VBTN_STATE_PRESSED || st == VBTN_STATE_WAIT_REPEAT ||
        st == VBTN_STATE_RE_PRESSED)
      *pressed = 1;
    if (st == VBTN_STATE_LONG_HOLD) *held = 1;
  }
}

/* Температура x10: DS18B20 (T<id> / T<id>.<номер на шине>) либо DHT22 (T<id>).
 * Нет данных / мусор (-127 датчика, ошибка чтения) -> COND_NOVAL -> ложь. */
static int32_t cond_read_temp(int id, int sub) {
  for (int i = 0; i < MAX_DS18B20_P; i++) {
    if (ds18b20[i].typsensr != 1 || ds18b20[i].id != id) continue;
    if (sub > 0) {
      if (sub <= (int)ds18b20[i].numsens) {
        float t = ds18b20[i].sensors[sub - 1].temp;
        if (!ds18b20[i].sensors[sub - 1].valid || t <= -100.0f) return COND_NOVAL;
        return (int32_t)(t * 10.0f);
      }
      return COND_NOVAL;
    }
    for (int k = 0; k < (int)ds18b20[i].numsens; k++) {
      if (ds18b20[i].sensors[k].valid && !ds18b20[i].sensors[k].errorflg) {
        float t = ds18b20[i].sensors[k].temp;
        if (t <= -100.0f) continue; /* -127 = ошибка преобразования */
        return (int32_t)(t * 10.0f);
      }
    }
    return COND_NOVAL;
  }
  if (dht22) {
    for (int i = 0; i < MAX_DHT22_P; i++) {
      if (dht22[i].typsensr == 2 && dht22[i].id == id) {
        if (!dht22[i].valid || dht22[i].temp <= -100.0f) return COND_NOVAL;
        return (int32_t)(dht22[i].temp * 10.0f);
      }
    }
  }
  return COND_NOVAL;
}

/* Влажность x10: только DHT22. Нет данных/мусор -> COND_NOVAL -> ложь. */
static int32_t cond_read_hum(int id) {
  if (!dht22) return COND_NOVAL;
  for (int i = 0; i < MAX_DHT22_P; i++) {
    if (dht22[i].typsensr == 2 && dht22[i].id == id) {
      if (!dht22[i].valid || dht22[i].humid < 0.0f || dht22[i].humid > 100.0f)
        return COND_NOVAL;
      return (int32_t)(dht22[i].humid * 10.0f);
    }
  }
  return COND_NOVAL;
}

/* Лог ошибки разбора не чаще раза в 10 с (PID может звать каждую секунду). */
static void cond_log_error(void) {
  static uint32_t last_err_log = 0;
  uint32_t now = HAL_GetTick();
  if ((now - last_err_log) >= 10000u) {
    printf("[cond] expression error - condition evaluated as FALSE\r\n");
    last_err_log = now;
  }
}

#define COND_OP_MAX  16
#define COND_VAL_MAX 16

typedef struct {
  const char *p;         /* текущая позиция разбора */
  int32_t vals[COND_VAL_MAX];
  int vtop;
  char ops[COND_OP_MAX]; /* '!', '&', '|', '(' */
  int otop;
  bool err;
} cond_ctx_t;

static bool is_digit(char ch) { return ch >= '0' && ch <= '9'; }
static char lc(char ch) {
  return (ch >= 'A' && ch <= 'Z') ? (char)(ch - 'A' + 'a') : ch;
}

/* Разобрать беззнаковое целое с насыщением (защита от переполнения int
 * на длинных числах вроде "R999999999999"). Возвращает true, если была
 * хотя бы одна цифра. */
static bool scan_uint_sat(const char **pp, int *out) {
  const char *p = *pp;
  long v = 0;
  bool have = false;
  while (is_digit(*p)) {
    if (v <= 99999999L) v = v * 10 + (*p - '0');
    p++;
    have = true;
  }
  *pp = p;
  *out = (v > 999999999L) ? 999999999 : (int)v;
  return have;
}

static void ctx_apply(cond_ctx_t *c) {
  if (c->otop <= 0 || c->err) { c->err = true; return; }
  char op = c->ops[--c->otop];
  if (op == '!') {
    if (c->vtop < 1) { c->err = true; return; }
    int32_t a = c->vals[--c->vtop];
    if (c->vtop >= COND_VAL_MAX) { c->err = true; return; }
    /* Клейни: неизвестное под отрицанием остаётся неизвестным */
    c->vals[c->vtop++] = (a == COND_UNKNOWN) ? COND_UNKNOWN
                                             : ((a == 0) ? 1 : 0);
  } else {
    if (c->vtop < 2) { c->err = true; return; }
    int32_t b = c->vals[--c->vtop];
    int32_t a = c->vals[--c->vtop];
    if (c->vtop >= COND_VAL_MAX) { c->err = true; return; }
    int32_t r;
    if (op == '&') {
      /* Клейни: 0&x = 0; неизвестное&истина = неизвестное */
      if (a == 0 || b == 0) r = 0;
      else if (a == COND_UNKNOWN || b == COND_UNKNOWN) r = COND_UNKNOWN;
      else r = 1;
    } else {
      /* Клейни: 1|x = 1; неизвестное|ложь = неизвестное */
      if (a == 1 || b == 1) r = 1;
      else if (a == COND_UNKNOWN || b == COND_UNKNOWN) r = COND_UNKNOWN;
      else r = 0;
    }
    c->vals[c->vtop++] = r;
  }
}

static void ctx_push_op(cond_ctx_t *c, char op) {
  if (c->otop >= COND_OP_MAX) { c->err = true; return; }
  c->ops[c->otop++] = op;
}

static void ctx_push_val(cond_ctx_t *c, int32_t v) {
  if (c->vtop >= COND_VAL_MAX) { c->err = true; return; }
  c->vals[c->vtop++] = v;
}

static void skip_ws(cond_ctx_t *c) {
  while (*c->p == ' ' || *c->p == '\t') c->p++;
}

/* После помещения значения применяем накопившиеся унарные '!'. */
static void apply_pending_not(cond_ctx_t *c) {
  while (!c->err && c->otop > 0 && c->ops[c->otop - 1] == '!')
    ctx_apply(c);
}

/* Разобрать префикс операнда. 0 - не операнд; 1 - значение в *out. */
static int parse_operand(cond_ctx_t *c, int32_t *out) {
  const char *p = c->p;
  int id = 0;
  bool have_digits = false;

  /* RV<id> — значение диммера */
  if (lc(p[0]) == 'r' && lc(p[1]) == 'v' && is_digit(p[2])) {
    p += 2;
    have_digits = scan_uint_sat(&p, &id);
    if (!have_digits) return 0;
    c->p = p;
    *out = cond_read_value(id);
    return 1;
  }
  /* BH<id> / BU<id> — удержание / не нажата */
  if (lc(p[0]) == 'b' && (lc(p[1]) == 'h' || lc(p[1]) == 'u') && is_digit(p[2])) {
    int held = (lc(p[1]) == 'h');
    p += 2;
    have_digits = scan_uint_sat(&p, &id);
    if (!have_digits) return 0;
    c->p = p;
    int32_t pr = 0, hd = 0;
    cond_read_button(id, &pr, &hd);
    *out = held ? hd : (pr ? 0 : 1);
    return 1;
  }
  /* B<id> — нажата */
  if (lc(p[0]) == 'b' && is_digit(p[1])) {
    p++;
    have_digits = scan_uint_sat(&p, &id);
    if (!have_digits) return 0;
    c->p = p;
    int32_t pr = 0, hd = 0;
    cond_read_button(id, &pr, &hd);
    *out = pr;
    return 1;
  }
  /* T<id>[.<sub>] — температура x10 */
  if (lc(p[0]) == 't' && is_digit(p[1])) {
    int sub = 0;
    p++;
    have_digits = scan_uint_sat(&p, &id);
    if (!have_digits) return 0;
    if (*p == '.' && is_digit(p[1])) {
      p++;
      sub = *p - '0';
      p++;
    }
    c->p = p;
    *out = cond_read_temp(id, sub);
    return 1;
  }
  /* H<id> — влажность x10 */
  if (lc(p[0]) == 'h' && is_digit(p[1])) {
    p++;
    have_digits = scan_uint_sat(&p, &id);
    if (!have_digits) return 0;
    c->p = p;
    *out = cond_read_hum(id);
    return 1;
  }
  /* C<n> - ссылка на условие №n из библиотеки (для коротких полей,
   * например в действиях датчиков: "6:1?C3"). Циклы рвутся depth-guard'ом. */
  if (lc(p[0]) == 'c' && is_digit(p[1])) {
    int cn = 0;
    p++;
    have_digits = scan_uint_sat(&p, &cn);
    if (!have_digits) return 0;
    c->p = p;
    if (cn >= 1 && cn <= NUMCOND)
      *out = cond_eval_ref((uint8_t)cn) ? 1 : 0;
    else
      *out = 0; /* нет такого условия в библиотеке */
    return 1;
  }
  /* R<id> — состояние выхода (реле/устройство/вход) */
  if (lc(p[0]) == 'r' && is_digit(p[1])) {
    p++;
    have_digits = scan_uint_sat(&p, &id);
    if (!have_digits) return 0;
    c->p = p;
    *out = cond_read_state(id);
    return 1;
  }
  /* Sr / Ss — день / ночь */
  if (lc(p[0]) == 's' && (lc(p[1]) == 'r' || lc(p[1]) == 's')) {
    c->p = p + 2;
    if (SetSettings.sunrise[0] == '\0' || SetSettings.sunset[0] == '\0') {
      *out = 0; /* время не настроено — оба флага ложны */
    } else {
      cond_timeofday_update();
      int8_t day = ss_is_day;
      if (day < 0) *out = 0;
      else *out = (lc(p[1]) == 'r') ? day : (day ? 0 : 1);
    }
    return 1;
  }
  return 0;
}

/* Разобрать число: цифры, необязательно '.' и одна цифра после точки.
 * "25.5" -> 255 (масштаб x10, как у T/H). Возвращает 0 - не число. */
static int parse_number(cond_ctx_t *c, int32_t *out, bool *had_decimal) {
  const char *p = c->p;
  int32_t v = 0;
  if (!scan_uint_sat(&p, &v)) return 0;
  if (had_decimal) *had_decimal = false;
  if (*p == '.' && is_digit(p[1])) {
    if (v <= 99999999) v = v * 10 + (p[1] - '0');
    p += 2;
    if (had_decimal) *had_decimal = true;
  }
  c->p = p;
  *out = v;
  return 1;
}

/* Атом: операнд либо число, с необязательным сравнением с числом. */
static void parse_atom(cond_ctx_t *c) {
  int32_t v;
  skip_ws(c);
  /* Операнды T/H хранят десятые доли градуса/влажности — для них
   * целочисленный литерал в сравнении масштабируется x10. */
  bool tenths = (lc(c->p[0]) == 't' && is_digit(c->p[1])) ||
                (lc(c->p[0]) == 'h' && is_digit(c->p[1]));
  if (parse_operand(c, &v) || parse_number(c, &v, NULL)) {
    skip_ws(c);
    /* Сравнение: = > < g l >= <= */
    char cmp = 0;
    const char *p = c->p;
    if (p[0] == '>' && p[1] == '=')      { cmp = 'g'; c->p = p + 2; }
    else if (p[0] == '<' && p[1] == '=') { cmp = 'l'; c->p = p + 2; }
    else if (p[0] == '=')                { cmp = '='; c->p = p + 1; }
    else if (p[0] == '>')                { cmp = '>'; c->p = p + 1; }
    else if (p[0] == '<')                { cmp = '<'; c->p = p + 1; }
    else if (lc(p[0]) == 'g')            { cmp = 'g'; c->p = p + 1; }
    else if (lc(p[0]) == 'l')            { cmp = 'l'; c->p = p + 1; }
    /* Примечание: 'g'/'l' не могут начинать операнд, поэтому здесь это
     * всегда операторы сравнения (>= / <= записанные одной буквой). */

    if (cmp) {
      int32_t n;
      bool had_decimal = false;
      skip_ws(c);
      if (!parse_number(c, &n, &had_decimal)) { c->err = true; return; }
      if (tenths && !had_decimal) n *= 10; /* T5>25 == T5>25.0 */
      if (v == COND_NOVAL) {
        /* Нет данных (датчик не отвечает) - сравнение «НЕИЗВЕСТНО»:
         * блокирует действие и корректно проходит через !, &, | */
        v = COND_UNKNOWN;
      } else {
        switch (cmp) {
        case '=': v = (v == n) ? 1 : 0; break;
        case '>': v = (v > n) ? 1 : 0; break;
        case '<': v = (v < n) ? 1 : 0; break;
        case 'g': v = (v >= n) ? 1 : 0; break;
        case 'l': v = (v <= n) ? 1 : 0; break;
        default: c->err = true; return;
        }
      }
    } else if (v == COND_NOVAL) {
      /* Голый датчик-операнд без данных (T5 без сравнения) - «неизвестно» */
      v = COND_UNKNOWN;
    }
    ctx_push_val(c, v);
    apply_pending_not(c);
  } else {
    c->err = true;
  }
}

/* Общий цикл разбора: атомы, унарные '!', '&', '|', скобки. */
static void parse_loop(cond_ctx_t *c) {
  for (;;) {
    skip_ws(c);
    char ch = *c->p;

    if (ch == '\0')
      return;

    if (ch == '(') {
      c->p++;
      ctx_push_op(c, '(');
      continue;
    }

    if (ch == ')') {
      /* хвост без атома перед ')' — ошибка */
      if (c->vtop <= 0 || c->otop <= 0) { c->err = true; return; }
      c->p++;
      while (c->otop > 0 && c->ops[c->otop - 1] != '(' && !c->err)
        ctx_apply(c);
      if (c->otop > 0 && c->ops[c->otop - 1] == '(') c->otop--;
      else { c->err = true; return; }
      apply_pending_not(c);
      continue;
    }

    if (ch == '!') {
      c->p++;
      ctx_push_op(c, '!');
      continue;
    }

    if (ch == '&' || ch == '|') {
      if (c->vtop <= 0) { c->err = true; return; } /* оператор без левого операнда */
      c->p++;
      /* лево-ассоциативно: применяем операторы с приоритетом >= текущего */
      while (c->otop > 0 && c->ops[c->otop - 1] != '(' &&
             c->ops[c->otop - 1] != '!' && !c->err) {
        char top = c->ops[c->otop - 1];
        bool flush = (ch == '|') ? true : (top == '&'); /* '&' перед '&'; всё перед '|' */
        if (flush) ctx_apply(c);
        else break;
      }
      ctx_push_op(c, ch);
      continue;
    }

    /* атом (операнд или число) */
    parse_atom(c);
    if (c->err) return;
  }
}

static bool cond_run(const char *expr, int32_t *result) {
  cond_ctx_t c;
  memset(&c, 0, sizeof(c));
  c.p = expr;
  parse_loop(&c);

  /* Финальный сброс операторов */
  while (c.otop > 0 && !c.err) {
    if (c.ops[c.otop - 1] == '(') { c.err = true; break; }
    ctx_apply(&c);
  }

  if (c.err || c.vtop != 1) return false;
  *result = c.vals[0];
  return true;
}

bool cond_eval(const char *expr) {
  if (expr == NULL) return true;
  const char *q = expr;
  while (*q == ' ' || *q == '\t') q++;
  if (*q == '\0') return true; /* условие не задано */

  /* Защита от циклов ссылок C<id> -> C<id> (и от чрезмерной вложенности):
   * на глубине 3 вычисление блокируется (ложь). Счётчик глобальный,
   * гонки между задачами в худшем случае дают ложь - безопасно. */
  static int s_eval_depth = 0;
  if (s_eval_depth >= 3) return false;

  int32_t result = 0;
  s_eval_depth++;
  bool ok = cond_run(expr, &result);
  s_eval_depth--;

  if (!ok) {
    cond_log_error();
    return false;
  }
  /* Истина только при явной 1: «неизвестно» блокирует действие */
  return result == 1;
}

bool cond_valid(const char *expr) {
  if (expr == NULL) return true;
  const char *q = expr;
  while (*q == ' ' || *q == '\t') q++;
  if (*q == '\0') return true;

  int32_t result = 0;
  return cond_run(expr, &result);
}

/* ── Нейтрализация условий, ссылающихся на удалённый ID ── */

static bool cond_mentions_id(const char *s, int id) {
  char idbuf[8];
  int idlen = snprintf(idbuf, sizeof(idbuf), "%d", id);
  const char *p = s;
  while (*p) {
    const char *match = NULL;
    int mlen = 0;
    if (lc(p[0]) == 'r' && lc(p[1]) == 'v' && is_digit(p[2])) { match = p; mlen = 2; }
    else if (lc(p[0]) == 'b' && (lc(p[1]) == 'h' || lc(p[1]) == 'u') && is_digit(p[2])) { match = p; mlen = 2; }
    else if ((lc(p[0]) == 'r' || lc(p[0]) == 'b' || lc(p[0]) == 't' || lc(p[0]) == 'h') && is_digit(p[1])) { match = p; mlen = 1; }
    if (match) {
      const char *d = match + mlen;
      int n = 0;
      while (is_digit(*d)) { d++; n++; }
      if (n == idlen && strncmp(match + mlen, idbuf, (size_t)idlen) == 0)
        return true;
      p = d; /* за цифры — чтобы не найти ID внутри более длинного числа */
      continue;
    }
    p++;
  }
  return false;
}

bool cond_lib_neutralize_id(int id) {
  bool changed = false;
  for (int i = 0; i < NUMCOND; i++) {
    /* НЕ очищаем запись (иначе ссылки на неё стали бы безусловными),
     * а записываем заведомо ложное условие "0". */
    if (SetSettings.conds[i][0] != '\0' &&
        strcmp(SetSettings.conds[i], "0") != 0 &&
        cond_mentions_id(SetSettings.conds[i], id)) {
      SetSettings.conds[i][0] = '0';
      SetSettings.conds[i][1] = '\0';
      changed = true;
    }
  }
  return changed;
}

void cond_count_crefs(const char *s, int *counts) {
  if (s == NULL || counts == NULL) return;
  const char *p = s;
  while (*p) {
    if (lc(p[0]) == 'c' && is_digit(p[1])) {
      const char *d = p + 1;
      int n = 0;
      /* до 2 цифр достаточно (NUMCOND <= 99); граница - не-цифра */
      while (is_digit(*d) && d - p <= 3) d++;
      int len = (int)(d - (p + 1));
      if (len <= 2) {
        n = atoi(p + 1);
        if (n >= 1 && n <= NUMCOND) counts[n - 1]++;
      }
      p = d; /* за цифры */
      continue;
    }
    p++;
  }
}

int cond_strip_id(char *s, int id) {
  if (s == NULL) return 0;
  int removed = 0;
  char *q = s;
  while ((q = strchr(q, '?')) != NULL) {
    /* условие длится до ',' или конца строки (запятых в синтаксисе условий нет) */
    char *end = q;
    while (*end != '\0' && *end != ',') end++;
    char saved = *end;
    *end = '\0';
    bool mentions = cond_mentions_id(q + 1, id);
    *end = saved;
    if (mentions) {
      /* НЕ стираем условие (иначе действие станет безусловным), а делаем
       * заведомо ложным: "6:1?R2" -> "6:1?0". Действие не сработает,
       * пока пользователь не задаст новое условие. */
      size_t restlen = strlen(end); /* ",..." или "" */
      q[0] = '?';
      q[1] = '0';
      memmove(q + 2, end, restlen + 1);
      removed++;
      q += 2; /* продолжить после вставленного "?0" */
    } else {
      if (saved == '\0') break;
      q = end; /* продолжить поиск после проверенного условия */
    }
  }
  return removed;
}
