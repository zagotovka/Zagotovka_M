/**
 * fmt_float.h — форматирование float/double без newlib malloc
 *
 * Замена %f/%lf/%g в snprintf/printf для embedded-систем где:
 *   - используется -specs=nano.specs
 *   - УБРАН флаг -u _printf_float
 *   - нельзя допускать вызовы _sbrk / _malloc_r / _dtoa_r
 *
 * Использование:
 *   #include "fmt_float.h"
 *
 *   char buf[32];
 *   fmt_float(buf, sizeof(buf), val, 2);  // → "23.46"
 *
 * ВАЖНО: FMT0/FMT1/FMT2/FMT4/FMT6 используют статические буферы —
 *        НЕ вызывайте два макроса в одном snprintf-аргументе!
 *        Используйте явные временные переменные.
 *
 * Потокобезопасность: каждый макрос имеет свой статический буфер.
 * В однопоточном Mongoose event loop — безопасно.
 * Из разных FreeRTOS задач — используйте fmt_float() с явным буфером.
 */

#ifndef FMT_FLOAT_H
#define FMT_FLOAT_H

#include <stddef.h>
#include <stdint.h>
#include <string.h>

#ifdef __cplusplus
extern "C" {
#endif

static inline void fmt_float(char *out, size_t out_sz, double v, int decimals)
{
    if (out_sz == 0) return;

    static const uint32_t pow10[7] = {1, 10, 100, 1000, 10000, 100000, 1000000};

    if (decimals < 0) decimals = 0;
    if (decimals > 6) decimals = 6;

    /* NaN */
    if (v != v) {
        strncpy(out, "nan", out_sz - 1);
        out[out_sz - 1] = '\0';
        return;
    }
    /* Inf / out of range */
    if (v > 2147483647.0 || v < -2147483647.0) {
        strncpy(out, "inf", out_sz - 1);
        out[out_sz - 1] = '\0';
        return;
    }

    int neg = (v < 0.0);
    if (neg) v = -v;

    /* Округление */
    double half = 0.5;
    for (int i = 0; i < decimals; i++) half /= 10.0;
    v += half;

    long whole = (long)v;
    uint32_t frac = 0;
    if (decimals > 0) {
        double frac_d = (v - (double)whole) * (double)pow10[decimals];
        frac = (uint32_t)frac_d;
        if (frac >= pow10[decimals]) { frac = 0; whole++; }
    }

    char tmp[32];
    int pos = 0;
    if (neg) tmp[pos++] = '-';

    if (whole == 0) {
        tmp[pos++] = '0';
    } else {
        char digits[12];
        int d = 0;
        long w = whole;
        while (w > 0) { digits[d++] = '0' + (w % 10); w /= 10; }
        while (d > 0) tmp[pos++] = digits[--d];
    }

    if (decimals > 0) {
        tmp[pos++] = '.';
        for (int i = decimals - 1; i >= 0; i--) {
            tmp[pos + i] = '0' + (frac % 10);
            frac /= 10;
        }
        pos += decimals;
    }

    tmp[pos] = '\0';
    size_t len = (size_t)pos;
    if (len >= out_sz) len = out_sz - 1;
    memcpy(out, tmp, len);
    out[len] = '\0';
}

/* Удобные макросы с внутренними статическими буферами */
#define FMT0(v) ({ static char _b[24]; fmt_float(_b, sizeof(_b), (double)(v), 0); _b; })
#define FMT1(v) ({ static char _b[24]; fmt_float(_b, sizeof(_b), (double)(v), 1); _b; })
#define FMT2(v) ({ static char _b[24]; fmt_float(_b, sizeof(_b), (double)(v), 2); _b; })
#define FMT4(v) ({ static char _b[24]; fmt_float(_b, sizeof(_b), (double)(v), 4); _b; })
#define FMT6(v) ({ static char _b[24]; fmt_float(_b, sizeof(_b), (double)(v), 6); _b; })

#ifdef __cplusplus
}
#endif

#endif /* FMT_FLOAT_H */
