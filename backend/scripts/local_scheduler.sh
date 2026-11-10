#!/bin/bash
# Local stand-in for the GitHub Actions schedules (crawl.yml, pyq-import.yml,
# telegram-alerts.yml) while Actions cannot run. Driven by launchd — see
# scripts/install_launchd.sh. Each mode runs the management commands, commits
# backend/db.sqlite3, pushes, and redeploys the backend to Vercel.
#
#   scripts/local_scheduler.sh crawl    # every 3 hours
#   scripts/local_scheduler.sh daily    # once a day: PYQ import, PDF dates, alerts
#
# Secrets come from backend/.env (GEMINI_API_KEY, optional TELEGRAM_*).

set -u
MODE="${1:-crawl}"
BACKEND="$(cd "$(dirname "$0")/.." && pwd)"
REPO="$(cd "$BACKEND/.." && pwd)"
LOG_DIR="$HOME/Library/Logs/sarkarialert"
mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/$MODE.log"
exec >>"$LOG" 2>&1
echo "=== $(date '+%Y-%m-%d %H:%M:%S') mode=$MODE"

cd "$BACKEND" || exit 1
# shellcheck disable=SC1091
source venv/bin/activate
set -a; [ -f .env ] && source .env; set +a
export DJANGO_SECRET_KEY="${DJANGO_SECRET_KEY:-local-scheduler}"
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"   # vercel, gh, git

# Never run two instances at once (launchd can overlap if a run is slow).
LOCK="/tmp/sarkarialert-$MODE.lock"
if ! mkdir "$LOCK" 2>/dev/null; then echo "another $MODE run is active; skipping"; exit 0; fi
trap 'rmdir "$LOCK"' EXIT

cd "$REPO" && git pull --rebase --quiet origin main || echo "git pull failed (continuing with local DB)"
cd "$BACKEND"
python manage.py migrate --noinput | tail -1

case "$MODE" in
  crawl)
    python manage.py crawl_jobs | grep -E "found|Deactivated|Total new|ERROR" | grep -v "Failed to fetch"
    python manage.py recategorize_jobs --all | tail -1
    python manage.py backfill_hindi | tail -1
    ;;
  daily)
    python manage.py import_pyq_json | tail -3
    python manage.py import_gate_pdfs | tail -2
    python manage.py extract_pdf_dates --apply --limit 60 | tail -1
    python manage.py crawl_current_affairs | tail -2
    if [ -n "${TELEGRAM_BOT_TOKEN:-}" ]; then
      python manage.py send_telegram_alerts | tail -1
      python manage.py send_deadline_reminders | tail -1
    else
      echo "TELEGRAM_BOT_TOKEN not set; alerts skipped"
    fi
    ;;
  *) echo "unknown mode $MODE"; exit 1 ;;
esac

cd "$REPO"
git add backend/db.sqlite3 --force
if git diff --cached --quiet; then
  echo "no DB changes"
else
  git -c user.name="abhay1verma5" -c user.email="abhaykumarverma910@gmail.com" \
    commit -q -m "chore($MODE): local scheduler update $(date -u +%Y-%m-%dT%H:%MZ)"
  for i in 1 2 3; do git pull --rebase --quiet origin main && git push --quiet origin main && echo "pushed" && break; sleep 5; done
  cd "$BACKEND" && vercel deploy --prod --yes 2>&1 | grep -E "^Production|Error" | tail -1
fi
echo "=== done $(date '+%H:%M:%S')"
