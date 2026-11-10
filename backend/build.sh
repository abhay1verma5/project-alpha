#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt

# Download compressed DB from GitHub release if not present or too small
DB_FILE="db.sqlite3"
MIN_SIZE=1000000  # 1MB minimum (empty DB is ~3.8MB)

if [ ! -f "$DB_FILE" ] || [ $(stat -f%z "$DB_FILE" 2>/dev/null || stat -c%s "$DB_FILE" 2>/dev/null || echo 0) -lt $MIN_SIZE ]; then
  echo "Downloading database from GitHub release..."
  curl -L -o db.sqlite3.gz "https://github.com/abhay1verma5/job-search/releases/download/db-v1/db.sqlite3.gz"
  gunzip -f db.sqlite3.gz
  echo "Database downloaded and extracted"
fi

python manage.py collectstatic --no-input
python manage.py migrate --no-input
