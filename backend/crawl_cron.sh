#!/bin/bash
# Auto-crawl script — runs crawl_jobs every 5 minutes
# Usage: ./crawl_cron.sh (runs in foreground) or nohup ./crawl_cron.sh &

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

VENV="$SCRIPT_DIR/venv/bin/activate"
INTERVAL=300  # 5 minutes

echo "=== SarkariAlert Auto-Crawler ==="
echo "Interval: ${INTERVAL}s ($(( INTERVAL / 60 )) min)"
echo "Press Ctrl+C to stop"
echo ""

while true; do
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting crawl..."
    source "$VENV" 2>/dev/null
    python manage.py crawl_jobs 2>&1
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Crawl complete. Sleeping ${INTERVAL}s..."
    echo "---"
    sleep $INTERVAL
done