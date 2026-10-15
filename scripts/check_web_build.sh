#!/bin/sh
# check_web_build.sh - проверка результата pre-build шага (build_web_and_pack.sh).
# Вызывается из makefile.targets перед линковкой прошивки.
# Код возврата != 0 останавливает сборку, CubeIDE показывает Build Failed.

PROJECT_DIR=$(cd "$(dirname "$0")/.." && pwd)
STATUS_FILE="$PROJECT_DIR/scripts/.web_build_status"
PACKED_C="$PROJECT_DIR/Core/Src/packed_fs.c"
VERSION_HEADER="$PROJECT_DIR/Core/Inc/version_gen.h"

fail() {
    echo "" >&2
    echo "############################################################" >&2
    echo "#  BUILD ABORTED: web interface build failed" >&2
    echo "#  Reason: $1" >&2
    echo "#  Scroll up to the [pre-build] output to see the real error." >&2
    echo "#  The firmware was NOT linked, so no stale web UI can be flashed." >&2
    echo "############################################################" >&2
    exit 1
}

[ -f "$STATUS_FILE" ] || fail "web build did not finish (scripts/.web_build_status is missing)"

ST=$(sed -n 1p "$STATUS_FILE")
ST_VER=$(sed -n 2p "$STATUS_FILE")
ST_JS=$(sed -n 3p "$STATUS_FILE")
CUR_VER=$(tr -d '[:space:]' < "$PROJECT_DIR/VERSION")

[ "$ST" = "OK" ] || fail "status file does not contain OK"
[ "$ST_VER" = "$CUR_VER" ] || fail "web build was made for v$ST_VER, but VERSION is v$CUR_VER"
[ -n "$ST_JS" ] || fail "status file has no bundle name"
grep -qF "\"v$CUR_VER\"" "$VERSION_HEADER" || fail "Core/Inc/version_gen.h does not contain v$CUR_VER"
grep -qF "/web_root/assets/$ST_JS" "$PACKED_C" || fail "Core/Src/packed_fs.c does not contain bundle $ST_JS"

echo "  Web build check OK: v$CUR_VER, bundle $ST_JS"
exit 0
