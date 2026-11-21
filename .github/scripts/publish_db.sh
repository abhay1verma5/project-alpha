#!/usr/bin/env bash
# Upload backend/db.sqlite3 to the db-v1 release and redeploy Render,
# but ONLY when the data changed during this run.
#
#   publish_db.sh <min_table> <min_rows>
#     min_table/min_rows: safety check so an empty or broken DB is never uploaded.
#
# Expects: run from backend/, $BEFORE_FP_FILE written by the download step,
#          GH_TOKEN and RENDER_DEPLOY_HOOK_URL in the environment.
set -uo pipefail
TABLE="${1:-jobs_job}"
MIN="${2:-1}"

ROWS=$(python3 -c "import sqlite3;print(sqlite3.connect('db.sqlite3').execute('SELECT COUNT(*) FROM $TABLE').fetchone()[0])" 2>/dev/null || echo 0)
echo "Rows in $TABLE: $ROWS"
if [ "$ROWS" -lt "$MIN" ]; then
  echo "⚠️ $TABLE has $ROWS rows (< $MIN) — not uploading, release left untouched"
  exit 0
fi

BEFORE=$(cat "${BEFORE_FP_FILE:-/tmp/db_before.fp}" 2>/dev/null || echo none)
AFTER=$(python3 scripts/db_fingerprint.py db.sqlite3)
echo "fingerprint before=$BEFORE after=$AFTER"
if [ "$BEFORE" = "$AFTER" ]; then
  echo "No data changes — skipping upload and Render redeploy"
  exit 0
fi

gzip -c db.sqlite3 > db.sqlite3.gz
gh release upload db-v1 db.sqlite3.gz --clobber
echo "✅ Uploaded DB"
if [ -n "${RENDER_DEPLOY_HOOK_URL:-}" ]; then
  curl -s -o /dev/null -w "Render deploy hook: HTTP %{http_code}\n" "$RENDER_DEPLOY_HOOK_URL"
fi
