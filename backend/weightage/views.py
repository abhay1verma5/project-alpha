"""Exam topic-weightage API (SSC CGL, UPSC, RRB NTPC, ...).

Data: data/exam_weightage.json, generated once by data/build_exam_weightage.js from the
frontend exam-data.ts (category/level/state are added there). The JSON is parsed on first
use and kept in memory; filtering and normalization run in Python per request.
"""

import json
from collections import Counter, namedtuple
from functools import lru_cache
from pathlib import Path

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

DATA_FILE = Path(__file__).resolve().parent / "data" / "exam_weightage.json"

CATEGORY_LABELS = {
    "ssc": "SSC",
    "railway": "Railways (RRB)",
    "banking": "Banking",
    "upsc": "UPSC",
    "defence": "Defence",
    "state_psc": "State PSC",
    "police": "Police",
    "teaching": "Teaching",
    "engineering": "Engineering (GATE / PSU)",
    "medical": "Medical",
    "entrance": "Entrance (JEE / NEET / CUET / CAT)",
    "insurance": "Insurance",
    "judiciary": "Judiciary",
    "other": "Other",
}
LEVEL_LABELS = {
    "10th": "10th pass",
    "12th": "12th pass",
    "graduate": "Graduate",
    "postgraduate": "Postgraduate",
}
TRENDS = ("high", "medium", "low")
SORTS = ("name", "questions")
WEIGHTAGE_TOTAL = 100
TOP_TOPICS_COUNT = 3

Entry = namedtuple("Entry", "slug summary subjects haystack")


def _normalize_weightages(raw_values):
    """Scale to WEIGHTAGE_TOTAL with largest-remainder rounding so the integers sum exactly."""
    total = sum(raw_values)
    if total <= 0:
        return [0 for _ in raw_values]
    exact = [value * WEIGHTAGE_TOTAL / total for value in raw_values]
    floors = [int(value) for value in exact]
    shortfall = WEIGHTAGE_TOTAL - sum(floors)
    by_remainder = sorted(
        range(len(exact)), key=lambda index: exact[index] - floors[index], reverse=True
    )
    for index in by_remainder[:shortfall]:
        floors[index] += 1
    return floors


def _state_label(state):
    return state.replace("_", " ").title()


def _build_entry(item):
    subjects = []
    for subject in item["subjects"]:
        normalized = _normalize_weightages([topic["weightage_raw"] for topic in subject["topics"]])
        subjects.append(
            {
                "subject": subject["subject"],
                "topics": [
                    {
                        "topic": topic["topic"],
                        "questions": topic["questions"],
                        "weightage": weightage,
                        "weightage_raw": topic["weightage_raw"],
                        "trend": topic["trend"],
                    }
                    for topic, weightage in zip(subject["topics"], normalized)
                ],
            }
        )

    flat_topics = [
        {"subject": subject["subject"], **topic}
        for subject in subjects
        for topic in subject["topics"]
    ]
    top_topics = sorted(flat_topics, key=lambda topic: topic["weightage"], reverse=True)
    top_topics = [
        {
            "subject": topic["subject"],
            "topic": topic["topic"],
            "questions": topic["questions"],
            "weightage": topic["weightage"],
            "trend": topic["trend"],
        }
        for topic in top_topics[:TOP_TOPICS_COUNT]
    ]

    summary = {
        "slug": item["slug"],
        "exam": item["exam"],
        "paper": item["paper"],
        "category": item["category"],
        "level": item["level"],
        "state": item["state"],
        "total_questions": item["total_questions"],
        "total_marks": item["total_marks"],
        "duration": item["duration"],
        "negative_marking": item["negative_marking"],
        "subjects": [subject["subject"] for subject in subjects],
        "top_topics": top_topics,
        "color": item["color"],
        "approx": item["approx"],
        "as_of": item["as_of"],
    }

    haystack_parts = [item["exam"]]
    for subject in subjects:
        haystack_parts.append(subject["subject"])
        haystack_parts.extend(topic["topic"] for topic in subject["topics"])
    haystack = " ".join(haystack_parts).lower()

    return Entry(slug=item["slug"], summary=summary, subjects=subjects, haystack=haystack)


@lru_cache(maxsize=1)
def _catalog():
    with DATA_FILE.open(encoding="utf-8") as handle:
        items = json.load(handle)
    return tuple(_build_entry(item) for item in items)


def _facet(values, order, labels):
    counts = Counter(values)
    return [
        {"value": value, "label": labels.get(value) or _state_label(value), "count": counts[value]}
        for value in order
        if counts[value]
    ]


def _filters(entries):
    categories = [entry.summary["category"] for entry in entries]
    levels = [entry.summary["level"] for entry in entries]
    states = [entry.summary["state"] for entry in entries]
    state_order = sorted(set(states), key=lambda state: (state != "all_india", state))
    return {
        "categories": _facet(categories, CATEGORY_LABELS, CATEGORY_LABELS),
        "levels": _facet(levels, LEVEL_LABELS, LEVEL_LABELS),
        "states": _facet(states, state_order, {}),
    }


def _read_choice(params, name, allowed):
    """Return (value, error). Empty means no filter; anything outside `allowed` is an error."""
    value = params.get(name, "").strip().lower()
    if value and value not in allowed:
        return None, f"invalid {name}"
    return value or None, None


@api_view(["GET"])
def topic_weightage_list_view(request):
    params = request.query_params
    entries = _catalog()
    all_states = {entry.summary["state"] for entry in entries}

    category, error = _read_choice(params, "category", set(CATEGORY_LABELS))
    if error:
        return Response({"error": error}, status=status.HTTP_400_BAD_REQUEST)
    level, error = _read_choice(params, "level", set(LEVEL_LABELS))
    if error:
        return Response({"error": error}, status=status.HTTP_400_BAD_REQUEST)
    state, error = _read_choice(params, "state", all_states)
    if error:
        return Response({"error": error}, status=status.HTTP_400_BAD_REQUEST)
    trend, error = _read_choice(params, "trend", set(TRENDS))
    if error:
        return Response({"error": error}, status=status.HTTP_400_BAD_REQUEST)
    sort, error = _read_choice(params, "sort", set(SORTS))
    if error:
        return Response({"error": error}, status=status.HTTP_400_BAD_REQUEST)

    words = params.get("q", "").strip().lower().split()
    matches = []
    for entry in entries:
        summary = entry.summary
        if category and summary["category"] != category:
            continue
        if level and summary["level"] != level:
            continue
        if state and summary["state"] != state:
            continue
        if trend and not any(
            topic["trend"] == trend for subject in entry.subjects for topic in subject["topics"]
        ):
            continue
        if words and not all(word in entry.haystack for word in words):
            continue
        matches.append(entry)

    if sort == "questions":
        matches.sort(key=lambda entry: (-entry.summary["total_questions"], entry.summary["exam"]))
    else:
        matches.sort(key=lambda entry: entry.summary["exam"].lower())

    return Response(
        {
            "count": len(matches),
            "results": [entry.summary for entry in matches],
            "filters": _filters(entries),
        }
    )


@api_view(["GET"])
def topic_weightage_detail_view(request, slug):
    for entry in _catalog():
        if entry.slug == slug:
            return Response({**entry.summary, "subjects": entry.subjects})
    return Response({"error": "not found"}, status=status.HTTP_404_NOT_FOUND)
