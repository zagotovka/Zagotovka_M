#!/bin/bash
# build_web_and_pack.sh — Автоматическая сборка веб-интерфейса и упаковка в packed_fs.c
# Вызывается как Pre-build step в STM32CubeIDE

set -e

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
WEB_ROOT="$PROJECT_DIR/web_root"
PACK_DIR="$PROJECT_DIR/scripts/_pack_work"
PACK_TOOL="$PROJECT_DIR/pack"
PACKED_C="$PROJECT_DIR/Core/Src/packed_fs.c"

# 0. Генерация version_gen.h из файла VERSION (источник правды для FW_VERSION)
VER=$(cat "$PROJECT_DIR/VERSION" | tr -d '[:space:]')
VERSION_HEADER="$PROJECT_DIR/Core/Inc/version_gen.h"
NEW_CONTENT="// AUTO-GENERATED from VERSION file. Do not edit manually.
#pragma once
#define FW_VERSION \"v${VER}\""

if [ ! -f "$VERSION_HEADER" ] || [ "$(cat "$VERSION_HEADER")" != "$NEW_CONTENT" ]; then
    echo "$NEW_CONTENT" > "$VERSION_HEADER"
    echo "  ✓ version_gen.h updated: v${VER}"
else
    echo "  ✓ version_gen.h unchanged: v${VER}"
fi

# Очистка предыдущей рабочей директории
rm -rf "$PACK_DIR"

echo "============================================"
echo "  Web Build + Pack FS — Start"
echo "============================================"

# 1. Сборка веб-интерфейса (Vite)
echo "[1/4] Building web frontend (vite build)..."
cd "$WEB_ROOT"
if [ ! -d "node_modules" ]; then
    echo "  Installing npm dependencies..."
    npm install --silent
fi
npm run build
echo "  ✓ Web build complete"

# 2. Синхронизация dist → pack web_root
echo "[2/4] Syncing dist → pack web_root..."
mkdir -p "$PACK_DIR/web_root/assets"

# Копируем index.html
cp "$WEB_ROOT/dist/index.html" "$PACK_DIR/web_root/index.html"

# Копируем JS (с удалением старых хешированных файлов)
rm -f "$PACK_DIR/web_root/assets/index-"*.js "$PACK_DIR/web_root/assets/index-"*.js.gz "$PACK_DIR/web_root/assets/index-"*.js.orig
NEW_JS=$(ls "$WEB_ROOT/dist/assets/index-"*.js 2>/dev/null | head -1)
if [ -n "$NEW_JS" ]; then
    cp "$NEW_JS" "$PACK_DIR/web_root/assets/"
    echo "  ✓ JS: $(basename "$NEW_JS")"
else
    echo "  ERROR: no JS file in dist/assets!" >&2; exit 1
fi

# Копируем CSS (с удалением старых хешированных файлов)
rm -f "$PACK_DIR/web_root/assets/index-"*.css "$PACK_DIR/web_root/assets/index-"*.css.gz "$PACK_DIR/web_root/assets/index-"*.css.orig
NEW_CSS=$(ls "$WEB_ROOT/dist/assets/index-"*.css 2>/dev/null | head -1)
if [ -n "$NEW_CSS" ]; then
    cp "$NEW_CSS" "$PACK_DIR/web_root/assets/"
    echo "  ✓ CSS: $(basename "$NEW_CSS")"
else
    echo "  ERROR: no CSS file in dist/assets!" >&2; exit 1
fi

# Копируем history.min.js (если есть в web_root)
if [ -f "$WEB_ROOT/history.min.js" ]; then
    cp "$WEB_ROOT/history.min.js" "$PACK_DIR/web_root/"
fi

# 3. Генерация .gz и замена
echo "[3/4] Generating gzip and packing..."

# gzip для JS
JS_ORIG=$(ls "$PACK_DIR/web_root/assets/index-"*.js 2>/dev/null | grep -v '\.gz' | grep -v '\.orig' | head -1)
if [ -n "$JS_ORIG" ]; then
    gzip -k -f "$JS_ORIG"
    cp "$JS_ORIG" "${JS_ORIG}.orig"
    cp "${JS_ORIG}.gz" "$JS_ORIG"
fi

# gzip для CSS
CSS_ORIG=$(ls "$PACK_DIR/web_root/assets/index-"*.css 2>/dev/null | grep -v '\.gz' | grep -v '\.orig' | head -1)
if [ -n "$CSS_ORIG" ]; then
    gzip -k -f "$CSS_ORIG"
    cp "$CSS_ORIG" "${CSS_ORIG}.orig"
    cp "${CSS_ORIG}.gz" "$CSS_ORIG"
fi

# gzip для history.min.js
if [ -f "$PACK_DIR/web_root/history.min.js" ]; then
    gzip -k -f "$PACK_DIR/web_root/history.min.js"
    cp "$PACK_DIR/web_root/history.min.js" "$PACK_DIR/web_root/history.min.js.orig"
    cp "$PACK_DIR/web_root/history.min.js.gz" "$PACK_DIR/web_root/history.min.js"
fi

# Упаковка через pack tool с strip prefix
cd "$PACK_DIR"
"$PACK_TOOL" -s "$PACK_DIR" $(find web_root -type f ! -name "*.gz" ! -name "*.br" ! -name "*.orig") > packed_fs.tmp

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
rm packed_fs.tmp

# Восстанавливаем оригиналы
mv "${JS_ORIG}.orig" "$JS_ORIG" 2>/dev/null || true
mv "${CSS_ORIG}.orig" "$CSS_ORIG" 2>/dev/null || true
mv "$PACK_DIR/web_root/history.min.js.orig" "$PACK_DIR/web_root/history.min.js" 2>/dev/null || true

# Копируем packed_fs.c в Core/Src/
cp "$PACK_DIR/packed_fs.c" "$PACKED_C"

# Очистка временной рабочей директории
rm -rf "$PACK_DIR"

echo "============================================"
echo "  ✓ packed_fs.c generated → Core/Src/"
echo "============================================"
