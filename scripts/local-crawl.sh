#!/bin/bash
# Local crawler — runs every 3 hours via launchd
# Crawls jobs, updates db, deploys backend to Vercel, pushes to GitHub

set -e

export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
export DJANGO_SECRET_KEY="local-crawler-key"
export DJANGO_DEBUG="False"

PROJECT="/Users/abhaykumarverma/job-search"
BACKEND="$PROJECT/backend"
LOG="$PROJECT/scripts/crawl-local.log"

echo "=== Crawl started: $(date) ===" >> "$LOG"

cd "$BACKEND"

# 1. Crawl all sources
python3 manage.py crawl_jobs >> "$LOG" 2>&1

# 2. Re-categorize
python3 manage.py recategorize_jobs --all >> "$LOG" 2>&1

# 3. Backfill Hindi titles
python3 manage.py backfill_hindi >> "$LOG" 2>&1

# 3.5 Deactivate jobs expired > 30 days
python3 -c "
import django, os; os.environ['DJANGO_SETTINGS_MODULE']='config.settings'; django.setup()
from jobs.models import Job; from django.utils import timezone; from datetime import timedelta
n = Job.objects.filter(is_active=True, last_date__lt=timezone.now().date()-timedelta(days=30)).update(is_active=False)
print(f'Deactivated {n} expired jobs')
" >> "$LOG" 2>&1

# 4. Vacuum db to keep size down
python3 -c "import sqlite3; c=sqlite3.connect('db.sqlite3'); c.execute('VACUUM'); c.close()" >> "$LOG" 2>&1

# 5. Deploy backend to Vercel
cd "$BACKEND"
npx vercel deploy --prod --yes >> "$LOG" 2>&1

# 6. Commit and push db
cd "$PROJECT"
# Stash any untracked/unstaged files so pull doesn't fail
git stash --include-untracked >> "$LOG" 2>&1 || true
git add backend/db.sqlite3 --force
if ! git diff --cached --quiet; then
  git commit -m "chore: update job database $(date +%Y-%m-%d)" >> "$LOG" 2>&1
  git pull --no-rebase origin main >> "$LOG" 2>&1 || true
  git push origin main >> "$LOG" 2>&1
  echo "Pushed updated db" >> "$LOG"
else
  echo "No new data" >> "$LOG"
fi
git stash pop >> "$LOG" 2>&1 || true

echo "=== Crawl finished: $(date) ===" >> "$LOG"
echo "" >> "$LOG"
