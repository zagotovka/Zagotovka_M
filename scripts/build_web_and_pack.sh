#!/bin/bash
# build_web_and_pack.sh - сборка веб-интерфейса (Vite) и упаковка в Core/Src/packed_fs.c
# Вызывается как Pre-build step в STM32CubeIDE.
#
# CubeIDE игнорирует код возврата pre-build шага, поэтому надёжность обеспечена так:
#   1. Любая ошибка немедленно прерывает скрипт и печатает крупный блок ERROR.
#   2. Признак успеха - файл scripts/.web_build_status - пишется ТОЛЬКО в самом конце.
#   3. makefile.targets перед линковкой запускает scripts/check_web_build.sh,
#      который проверяет этот файл и роняет сборку прошивки, если он не в порядке.

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
WEB_ROOT="$PROJECT_DIR/web_root"
PACK_DIR="$PROJECT_DIR/scripts/_pack_work"
PACK_TOOL="$PROJECT_DIR/pack"
PACKED_C="$PROJECT_DIR/Core/Src/packed_fs.c"
ZOPFLI="$PROJECT_DIR/scripts/zopfli_gzip.py"
STATUS_FILE="$PROJECT_DIR/scripts/.web_build_status"

# Старый признак успеха удаляем сразу: пока скрипт не дошёл до конца, сборка считается неудачной
rm -f "$STATUS_FILE"

on_exit() {
    local code=$?
    if [ "$code" -ne 0 ]; then
        {
            echo ""
            echo "############################################################"
            echo "#  ERROR: WEB BUILD / PACK FAILED (exit code $code)"
            echo "#  Firmware build will be ABORTED. Fix the error above."
            echo "#  Core/Src/packed_fs.c was NOT updated."
            echo "############################################################"
        } >&2
    fi
}
trap on_exit EXIT

die() {
    echo "  ERROR: $*" >&2
    exit 1
}

# 0. Генерация version_gen.h из файла VERSION (источник правды для FW_VERSION)
[ -f "$PROJECT_DIR/VERSION" ] || die "VERSION file not found: $PROJECT_DIR/VERSION"
VER=$(tr -d '[:space:]' < "$PROJECT_DIR/VERSION")
[ -n "$VER" ] || die "VERSION file is empty"

VERSION_HEADER="$PROJECT_DIR/Core/Inc/version_gen.h"
NEW_CONTENT="// AUTO-GENERATED from VERSION file. Do not edit manually.
#pragma once
#define FW_VERSION \"v${VER}\""

if [ ! -f "$VERSION_HEADER" ] || [ "$(cat "$VERSION_HEADER")" != "$NEW_CONTENT" ]; then
    echo "$NEW_CONTENT" > "$VERSION_HEADER"
    echo "  OK: version_gen.h updated: v${VER}"
else
    echo "  OK: version_gen.h unchanged: v${VER}"
fi

# Проверка инструментов до начала работы
command -v npm >/dev/null 2>&1 || die "npm not found in PATH (CubeIDE may run with a reduced PATH, e.g. node installed via nvm)"
command -v python3 >/dev/null 2>&1 || die "python3 not found in PATH"
[ -x "$PACK_TOOL" ] || die "pack tool not found or not executable: $PACK_TOOL"

# Очистка предыдущей рабочей директории
rm -rf "$PACK_DIR"

echo "============================================"
echo "  Web Build + Pack FS - Start (v${VER})"
echo "============================================"

# 1. Сборка веб-интерфейса (Vite)
echo "[1/4] Building web frontend (vite build)..."
cd "$WEB_ROOT"

# npm install запускается, если нет node_modules/vite или package.json / package-lock.json новее node_modules
if [ ! -x "node_modules/.bin/vite" ] \
   || [ "package.json" -nt "node_modules" ] \
   || { [ -f "package-lock.json" ] && [ "package-lock.json" -nt "node_modules" ]; }; then
    echo "  Installing npm dependencies..."
    npm install --no-audit --no-fund
    touch node_modules
fi

# Старый dist удаляется, чтобы упавшая сборка не могла оставить прошлый бандл
rm -rf "$WEB_ROOT/dist"
npm run build
[ -f "$WEB_ROOT/dist/index.html" ] || die "vite build finished but dist/index.html is missing"
echo "  OK: Web build complete"

# 2. Синхронизация dist -> pack web_root
echo "[2/4] Syncing dist -> pack web_root..."
mkdir -p "$PACK_DIR/web_root/assets"

cp "$WEB_ROOT/dist/index.html" "$PACK_DIR/web_root/index.html"

# JS
NEW_JS=$(ls -t "$WEB_ROOT"/dist/assets/index-*.js 2>/dev/null | head -1 || true)
[ -n "$NEW_JS" ] || die "no index-*.js in dist/assets"
JS_NAME=$(basename "$NEW_JS")
[ -s "$NEW_JS" ] || die "bundle $JS_NAME is empty"
grep -qF "v${VER}" "$NEW_JS" || die "bundle $JS_NAME does not contain version v${VER} (VERSION file and bundle are out of sync)"
grep -qF "$JS_NAME" "$WEB_ROOT/dist/index.html" || die "dist/index.html does not reference $JS_NAME"
cp "$NEW_JS" "$PACK_DIR/web_root/assets/"
echo "  OK: JS: $JS_NAME (contains v${VER})"

# CSS
NEW_CSS=$(ls -t "$WEB_ROOT"/dist/assets/*.css 2>/dev/null | head -1 || true)
[ -n "$NEW_CSS" ] || die "no *.css in dist/assets"
CSS_NAME=$(basename "$NEW_CSS")
[ -s "$NEW_CSS" ] || die "stylesheet $CSS_NAME is empty"
grep -qF "$CSS_NAME" "$WEB_ROOT/dist/index.html" || die "dist/index.html does not reference $CSS_NAME"
cp "$NEW_CSS" "$PACK_DIR/web_root/assets/"
echo "  OK: CSS: $CSS_NAME"

# history.min.js
if [ -f "$WEB_ROOT/history.min.js" ]; then
    cp "$WEB_ROOT/history.min.js" "$PACK_DIR/web_root/"
elif grep -q "history.min.js" "$WEB_ROOT/dist/index.html"; then
    die "index.html references history.min.js but $WEB_ROOT/history.min.js does not exist"
fi

# 3. Сжатие gzip (Zopfli: тот же формат gzip/DEFLATE, но меньше) и замена файла сжатой копией
echo "[3/4] Generating gzip and packing..."

gzip_in_place() {
    local f="$1"
    [ -f "$f" ] || return 0
    if ! python3 "$ZOPFLI" "$f" 2>/dev/null; then
        echo "  WARNING: zopfli unavailable, falling back to gzip -9" >&2
        gzip -9 -k -f "$f"
    fi
    gzip -t "${f}.gz" || die "gzip integrity check failed: ${f}.gz"
    mv -f "${f}.gz" "$f"
}

gzip_in_place "$PACK_DIR/web_root/assets/$JS_NAME"
gzip_in_place "$PACK_DIR/web_root/assets/$CSS_NAME"
gzip_in_place "$PACK_DIR/web_root/history.min.js"

# Упаковка через pack tool с strip prefix
cd "$PACK_DIR"
PACK_FILES=$(find web_root -type f ! -name "*.gz" ! -name "*.br" ! -name "*.orig" | sort)
# shellcheck disable=SC2086
"$PACK_TOOL" -s "$PACK_DIR" $PACK_FILES > packed_fs.tmp
[ -s packed_fs.tmp ] || die "pack tool produced empty output"

# 4. Генерация packed_fs.c
echo "[4/4] Generating packed_fs.c..."
sed -e '1i #include "mongoose.h"' \
    -e '/static const struct packed_file {/,/} packed_files\[\] = {/c\const struct mg_mem_file mg_packed_files[] = {' \
    -e 's/sizeof(v\([0-9]*\))/sizeof(v\1) - 1/g' \
    -e '/^static int scmp/,$d' \
    -e '/mg_unlist/d' \
    -e '/mg_unpack/d' \
    -e 's/[[:space:]]*$//' \
    packed_fs.tmp > packed_fs.c
rm -f packed_fs.tmp

# Проверка результата до копирования в проект
grep -q "mg_packed_files" packed_fs.c || die "generated packed_fs.c has no mg_packed_files table"
grep -qF "/web_root/assets/$JS_NAME" packed_fs.c || die "generated packed_fs.c does not list /web_root/assets/$JS_NAME"
grep -qF "/web_root/assets/$CSS_NAME" packed_fs.c || die "generated packed_fs.c does not list /web_root/assets/$CSS_NAME"
JS_ENTRIES=$(grep -o 'assets/index-[A-Za-z0-9_.-]*\.js' packed_fs.c | sort -u | wc -l || true)
[ "$JS_ENTRIES" -eq 1 ] || die "packed_fs.c lists $JS_ENTRIES different index-*.js bundles, expected exactly 1"

# Копируем через временный файл, чтобы не оставить полузаписанный packed_fs.c
cp packed_fs.c "${PACKED_C}.new"
mv -f "${PACKED_C}.new" "$PACKED_C"

cd "$PROJECT_DIR"
rm -rf "$PACK_DIR"

# Признак успеха - самая последняя операция скрипта
printf 'OK\n%s\n%s\n' "$VER" "$JS_NAME" > "$STATUS_FILE"

echo "============================================"
echo "  OK: packed_fs.c generated -> Core/Src/"
echo "      version: v${VER}, bundle: ${JS_NAME}"
echo "============================================"
