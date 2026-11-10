#!/bin/bash
# Installs two launchd agents on this Mac:
#   com.sarkarialert.crawl  — every 3 hours
#   com.sarkarialert.daily  — every day at 08:30 local time
# Re-run to update. Remove with:  launchctl bootout gui/$(id -u)/com.sarkarialert.crawl
# The Mac must be awake (or set "Prevent automatic sleeping" in Energy settings).

set -e
BACKEND="$(cd "$(dirname "$0")/.." && pwd)"
SCRIPT="$BACKEND/scripts/local_scheduler.sh"
AGENTS="$HOME/Library/LaunchAgents"
mkdir -p "$AGENTS"
chmod +x "$SCRIPT"

write_plist() {  # label, mode, schedule-xml
  cat >"$AGENTS/$1.plist" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>$1</string>
  <key>ProgramArguments</key>
  <array><string>/bin/bash</string><string>$SCRIPT</string><string>$2</string></array>
  <key>WorkingDirectory</key><string>$BACKEND</string>
  <key>EnvironmentVariables</key>
  <dict><key>PATH</key><string>/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin</string></dict>
  $3
  <key>StandardOutPath</key><string>$HOME/Library/Logs/sarkarialert/$2.launchd.log</string>
  <key>StandardErrorPath</key><string>$HOME/Library/Logs/sarkarialert/$2.launchd.log</string>
</dict>
</plist>
EOF
}

mkdir -p "$HOME/Library/Logs/sarkarialert"
write_plist com.sarkarialert.crawl crawl "<key>StartInterval</key><integer>10800</integer>"
write_plist com.sarkarialert.daily daily "<key>StartCalendarInterval</key><dict><key>Hour</key><integer>8</integer><key>Minute</key><integer>30</integer></dict>"

for label in com.sarkarialert.crawl com.sarkarialert.daily; do
  launchctl bootout "gui/$(id -u)/$label" 2>/dev/null || true
  launchctl bootstrap "gui/$(id -u)" "$AGENTS/$label.plist"
  echo "loaded $label"
done
launchctl list | grep sarkarialert
