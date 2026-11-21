"""Decide whether a listing is dead from its title alone.

Most crawled listings have no last_date, and posted_date is reset whenever the
DB is rebuilt, so the date-based rules in crawl_jobs never fire for them. The
title usually says when the notice belongs: "... GATE-2023 Score",
"Exam on 07.05.2025", "Answer Key 2024". This module reads that.
"""
import re
from datetime import date, timedelta

# 2024, 2024-25, 2024/2025
_YEAR = re.compile(r"(?<!\d)(20\d{2})(?:\s*[-–/]\s*(\d{2,4}))?(?!\d)")
# 07.05.2025, 7-5-2025, 07/05/2025
_DATE = re.compile(r"(?<!\d)(\d{1,2})[./-](\d{1,2})[./-](20\d{2})(?!\d)")

# Types that are only useful around one event (exam, result, key...).
EVENT_TYPES = {"admit_card", "answer_key", "result", "exam_date", "notice"}

# A dated title older than this is over (exam held, window closed).
DATED_TITLE_MAX_AGE = timedelta(days=120)


def latest_year(title):
    years = []
    for start, end in _YEAR.findall(title or ""):
        years.append(int(start))
        if end:
            y = int(end) if len(end) == 4 else int(start[:2] + end)
            if int(start) <= y <= 2099:
                years.append(y)
    return max(years) if years else None


def latest_date(title):
    found = []
    for d, m, y in _DATE.findall(title or ""):
        try:
            found.append(date(int(y), int(m), int(d)))
        except ValueError:
            continue
    return max(found) if found else None


def is_dead(title, content_type, today=None):
    """True when the title shows the listing belongs to the past."""
    today = today or date.today()
    year = latest_year(title)
    if year is not None and year <= today.year - 2:
        return True  # e.g. anything from 2024 or earlier in 2026
    if year is not None and year <= today.year - 1 and content_type in EVENT_TYPES:
        return True  # last year's admit card / result / answer key / notice
    d = latest_date(title)
    if d is not None and today - d > DATED_TITLE_MAX_AGE:
        return True
    return False
