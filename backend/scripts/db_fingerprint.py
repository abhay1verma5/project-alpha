"""Print a cheap fingerprint of the data in db.sqlite3.

Used by the GitHub Actions workflows to decide whether a run changed any data.
SQLite file bytes change on every migrate/VACUUM even when no rows change, so
hashing the file would trigger a Render redeploy on every run. This hashes row
counts, max rowids and a few "last touched" columns instead.
"""
import hashlib
import json
import sqlite3
import sys

ARGS = [a for a in sys.argv[1:] if not a.startswith("--")]
DB = ARGS[0] if ARGS else "db.sqlite3"
COUNTS = "--counts" in sys.argv  # print {table: row_count} as JSON instead

EXTRA = {
    "jobs_job": "SELECT SUM(is_active), COUNT(last_date), MAX(updated_at), "
    "COUNT(DISTINCT content_type || category) FROM jobs_job",
}


def main() -> None:
    try:
        con = sqlite3.connect(f"file:{DB}?mode=ro", uri=True)
    except sqlite3.Error:
        print("missing")
        return
    parts = []
    counts = {}
    tables = [
        r[0]
        for r in con.execute(
            "SELECT name FROM sqlite_master WHERE type='table' "
            "AND name NOT LIKE 'sqlite_%' AND name NOT LIKE 'django_%' ORDER BY name"
        )
    ]
    for t in tables:
        row = con.execute(f'SELECT COUNT(*), MAX(rowid) FROM "{t}"').fetchone()
        parts.append(f"{t}:{row}")
        counts[t] = row[0]
        if t in EXTRA:
            parts.append(f"{t}+:{con.execute(EXTRA[t]).fetchone()}")
    if COUNTS:
        print(json.dumps(counts, sort_keys=True))
        return
    print(hashlib.sha256("|".join(parts).encode()).hexdigest())


if __name__ == "__main__":
    main()
