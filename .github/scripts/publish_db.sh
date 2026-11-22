#!/usr/bin/env bash
# Upload backend/db.sqlite3 to the db-v1 release and redeploy Render,
# but ONLY when the data changed and the DB passes the safety checks below.
#
# Safety (added after 2026-11-21: a run that could not download the release DB
# started from an empty one and uploaded it, wiping 600K+ PYQ questions):
#   - jobs_job and pyq_examquestion must both be full-sized, in EVERY workflow;
#   - no table may lose more than 2% of its rows compared with the start of the run.
#
# Expects: run from backend/, /tmp/db_before.fp and /tmp/db_before_counts.json
#          written by the download step; GH_TOKEN, RENDER_DEPLOY_HOOK_URL in env.
set -uo pipefail

MIN_JOBS="${MIN_JOBS:-1000}"
MIN_PYQ="${MIN_PYQ:-100000}"

python3 - "$MIN_JOBS" "$MIN_PYQ" <<'PY' || { echo "❌ Safety check failed — NOT uploading; the release DB is left untouched"; exit 1; }
import json, sqlite3, sys
min_jobs, min_pyq = int(sys.argv[1]), int(sys.argv[2])
con = sqlite3.connect("db.sqlite3")
now = {t: con.execute(f'SELECT COUNT(*) FROM "{t}"').fetchone()[0]
       for (t,) in con.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'")}
print("rows now:", {k: now[k] for k in ("jobs_job", "pyq_examquestion") if k in now})
ok = True
if now.get("jobs_job", 0) < min_jobs:
    print(f"jobs_job has {now.get('jobs_job', 0)} rows (< {min_jobs})"); ok = False
if now.get("pyq_examquestion", 0) < min_pyq:
    print(f"pyq_examquestion has {now.get('pyq_examquestion', 0)} rows (< {min_pyq})"); ok = False
try:
    before = json.load(open("/tmp/db_before_counts.json"))
except Exception:
    print("no start-of-run row counts found"); before = None; ok = False
for t, n in (before or {}).items():
    if n >= 100 and now.get(t, 0) < n * 0.98:
        print(f"{t}: {n} -> {now.get(t, 0)} rows (shrank > 2%)"); ok = False
sys.exit(0 if ok else 1)
PY

BEFORE=$(cat /tmp/db_before.fp 2>/dev/null || echo none)
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
