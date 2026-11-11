#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt

# Always download fresh DB from GitHub releases (db.sqlite3 is NOT in git)
echo "Downloading database from GitHub release..."
rm -f db.sqlite3 db.sqlite3.gz
curl -fL -o db.sqlite3.gz "https://github.com/abhay1verma5/data-sync/releases/download/db-v1/db.sqlite3.gz" \
  || curl -fL -o db.sqlite3.gz "https://github.com/abhay1verma5/project-alpha/releases/download/db-v1/db.sqlite3.gz" \
  || echo "WARNING: Could not download DB from any source"
[ -f db.sqlite3.gz ] && gunzip -f db.sqlite3.gz && echo "Database downloaded: $(ls -lh db.sqlite3 | awk '{print $5}')"

python manage.py collectstatic --no-input
python manage.py migrate --no-input
