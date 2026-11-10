"""Import real previous-year questions from open JSON/CSV sources.

Sources are declared in pyq/import_sources.py. Each entry names a URL (raw
GitHub, Hugging Face "resolve" URL, or any public JSON/CSV), the exam_type,
and how to map the file's fields onto ExamQuestion. Nothing is generated:
only rows with a question, 2+ options and a known correct option are saved,
labelled source=crawled with the file URL, so every question is traceable.

Usage:
    python manage.py import_pyq_json                 # all sources
    python manage.py import_pyq_json --source upsc_sbandawala
    python manage.py import_pyq_json --dry-run
"""

import csv
import html
import io
import json
import re
import time

import requests
from django.core.management.base import BaseCommand

from pyq.import_sources import SOURCES
from pyq.models import ExamQuestion, PYQCrawlLog, QuestionSource

HEADERS = {"User-Agent": "SarkariAlert-PYQ-Importer/1.0 (+https://sarkarialert.online)"}
LETTERS = "ABCDEFGH"
OPTION_PREFIX = re.compile(r"^\(?[a-dA-D1-4]\)?[.)]?\s+")
TAG = re.compile(r"<[^>]+>")


def clean(text):
    """Collapse whitespace and drop HTML tags/entities."""
    if text is None:
        return ""
    text = html.unescape(TAG.sub(" ", str(text)))
    return re.sub(r"\s+", " ", text).strip()


def _pick(row, keys):
    """First non-empty value among candidate keys (case-insensitive)."""
    if not isinstance(row, dict):
        return None
    lower = {str(k).lower(): v for k, v in row.items()}
    for k in keys:
        v = lower.get(k.lower())
        if v not in (None, "", []):
            return v
    return None


def answer_index(ans, options, spec):
    """Map an answer (letter, index, or option text) to a 0-based index."""
    if ans is None or isinstance(ans, bool):
        return None
    if isinstance(ans, float):
        ans = int(ans)
    if isinstance(ans, int):
        idx = ans - 1 if spec.get("answer_one_based") else ans
    else:
        s = str(ans).strip()
        if re.fullmatch(r"[A-Ha-h]", s):
            idx = LETTERS.index(s.upper())
        elif re.fullmatch(r"\d+", s):
            idx = int(s) - 1 if spec.get("answer_one_based") else int(s)
        else:
            norm = clean(s).lower()
            idx = next((i for i, o in enumerate(options) if o.lower() == norm), None)
    if idx is None or not (0 <= idx < len(options)):
        return None
    return idx


def normalise(row, spec):
    """Turn one raw record into ExamQuestion kwargs, or None if unusable."""
    q = _pick(row, spec.get("question_keys", ["question", "question_text", "content", "q", "text", "prompt"]))
    if isinstance(q, dict):  # e.g. {"text": ..., "img_url": ...}
        q = q.get("text")
    q = clean(q)
    if len(q) < 8:
        return None

    options = _pick(row, spec.get("options_keys", ["options", "choices"]))
    if isinstance(options, dict):
        options = [v for _, v in sorted(options.items(), key=lambda kv: str(kv[0]))]
    elif isinstance(options, list) and options and isinstance(options[0], dict):
        options = [o.get("content") or o.get("text") or "" for o in options]
    elif options is None or isinstance(options, str):
        options = []
        for k in spec.get("option_columns", ["option_a", "option_b", "option_c", "option_d", "a", "b", "c", "d", "opt1", "opt2", "opt3", "opt4"]):
            v = _pick(row, [k])
            if v not in (None, ""):
                options.append(v)
    options = [OPTION_PREFIX.sub("", clean(o)) for o in options]
    options = [o for o in options if o]
    if len(options) < 2:
        return None
    # Image-only options cannot be shown as text.
    if any(re.fullmatch(r"image_\d+\.png", o) for o in options):
        return None

    # Many dumps keep the options inside the question text: "(a) … (b) … (c) … (d) …".
    # Those inline options belong to *this* question, so prefer them over column
    # values (which some datasets fill generically) and cut them off the stem.
    m = re.search(r"\s\(a\)\s", q)
    if m and len(q) - m.start() < 600:
        inline = re.split(r"\s*\((?:a|b|c|d)\)\s*", q[m.start():])
        inline = [clean(o) for o in inline if clean(o)]
        if 2 <= len(inline) <= 4:
            options = inline
        q = q[: m.start()].strip()

    # Some exports double every LaTeX backslash ("\\\\frac" for "\\frac").
    q = q.replace("\\\\", "\\")
    options = [o.replace("\\\\", "\\") for o in options]

    ans = _pick(row, spec.get("answer_keys", ["correct_options", "correct_option", "correct_answer", "answer_key", "answer", "correct", "answer_index", "ans"]))
    if isinstance(ans, list):
        if len(ans) != 1:  # multi-select or missing: skip
            return None
        ans = ans[0]
    correct = answer_index(ans, options, spec)
    if correct is None:
        return None

    year = _pick(row, spec.get("year_keys", ["year", "exam_year"]))
    if not year and spec.get("year_regex_field"):
        m = re.search(r"(20\d{2}|19\d{2})", str(row.get(spec["year_regex_field"], "")))
        year = m.group(1) if m else None
    year = year or spec.get("year")
    try:
        year = int(str(year)[:4])
    except (TypeError, ValueError):
        return None

    subject = _pick(row, spec.get("subject_keys", ["subject", "category_en", "section"])) or spec.get("subject", "General")
    chapter = _pick(row, spec.get("chapter_keys", ["chapter", "topic", "subtopic"])) or ""
    explanation = _pick(row, spec.get("explanation_keys", ["explanation", "answer_explanation", "solution", "rationale"])) or ""
    difficulty = str(_pick(row, ["difficulty", "level"]) or "medium").lower()
    if difficulty not in ("easy", "medium", "hard"):
        difficulty = "medium"
    language = str(_pick(row, ["language", "lang"]) or spec.get("language", "en")).lower()[:5]

    return {
        "exam_type": spec["exam_type"],
        "year": year,
        "subject": clean(subject).title()[:100],
        "chapter": clean(chapter)[:200],
        "question_text": q,
        "options": options[:8],
        "correct_answer": correct,
        "explanation": clean(explanation)[:4000],
        "difficulty": difficulty,
        "language": language,
    }


# ── Source-specific adapters: yield (row_dict, spec) pairs ──────────────────

def loads_tolerant(text):
    """json.loads that survives control characters and the unescaped quotes
    found in hand-edited dumps (via json_repair when plain parsing fails)."""
    try:
        return json.loads(text, strict=False)
    except json.JSONDecodeError:
        from json_repair import loads as repair_loads

        return repair_loads(text)


def adapter_secretedoc(text, spec):
    """UPSC GS-I dumps: options live in one string "(a) … (b) … (c) … (d) …".

    File shapes vary by year: a list, {"questions": [...]}, or
    {"processed_questions": [...]}."""
    text = re.sub(r"\[cite_start\]|\[cite:[^\]]*\]", "", text)
    data = loads_tolerant(text)
    if isinstance(data, dict):
        data = data.get("questions") or data.get("processed_questions") or []
    for row in data:
        if not isinstance(row, dict):
            continue
        raw_opts = row.get("options_combined") or row.get("options") or ""
        if isinstance(raw_opts, dict):
            raw_opts = [v for _, v in sorted(raw_opts.items())]
        if isinstance(raw_opts, list):
            opts = [str(o).strip() for o in raw_opts if str(o).strip()]
        else:
            opts = re.split(r"\s*\((?:a|b|c|d)\)\s*", str(raw_opts))
            opts = [o.strip() for o in opts if o.strip()]
        yield {
            "question": row.get("question_text_combined", ""),
            "options": opts,
            "answer": row.get("answer_key"),
            "year": row.get("year"),
            "subject": row.get("subject"),
            "topic": row.get("topic"),
            "explanation": row.get("answer_explanation"),
        }, spec


def adapter_jeeneetards(text, spec):
    """Index file -> one JSON per paper (sections -> questions). HTML content."""
    exam_map = {"jee-main": "jee_main", "jee-advanced": "jee_advanced", "neet": "neet"}
    base = "https://raw.githubusercontent.com/skndash96/jeeneetards/main/static/pyqs/"
    papers = [p for g in json.loads(text) for p in g.get("papers", [])]
    for paper in papers:
        exam_type = exam_map.get(paper.get("exam"))
        if not exam_type or not paper.get("year"):
            continue
        try:
            resp = requests.get(f"{base}{paper['metaId']}.json", headers=HEADERS, timeout=60)
            resp.raise_for_status()
            sections = resp.json()
        except Exception:
            continue
        sub_spec = {**spec, "exam_type": exam_type, "year": paper["year"]}
        for section in sections if isinstance(sections, list) else [sections]:
            for q in section.get("questions", []):
                if q.get("type") != "mcq" or q.get("isBonus"):
                    continue
                if "<img" in (q.get("content") or ""):
                    continue  # question needs an image we don't store
                yield {
                    "question": q.get("content"),
                    "options": q.get("options"),
                    "correct_options": q.get("correct_options"),
                    "subject": q.get("subject"),
                    "chapter": q.get("chapter"),
                    "explanation": q.get("explanation"),
                    "year": paper["year"],
                    "language": "en",
                }, sub_spec


ADAPTERS = {"secretedoc": adapter_secretedoc, "jeeneetards": adapter_jeeneetards}


def iter_records(text, spec):
    adapter = ADAPTERS.get(spec.get("adapter"))
    if adapter:
        yield from adapter(text, spec)
        return
    fmt = spec.get("format", "json")
    if fmt == "csv":
        for row in csv.DictReader(io.StringIO(text)):
            yield row, spec
        return
    if fmt == "jsonl":
        for line in text.splitlines():
            if line.strip():
                try:
                    yield json.loads(line), spec
                except json.JSONDecodeError:
                    continue
        return
    data = json.loads(text)
    for part in (spec.get("records_path") or "").split("."):
        if part and isinstance(data, dict):
            data = data.get(part, [])
    if isinstance(data, dict):
        data = data.get("questions") or data.get("data") or list(data.values())
    for row in data or []:
        yield row, spec


class Command(BaseCommand):
    help = "Import real PYQs from open JSON/CSV sources into ExamQuestion"

    def add_arguments(self, parser):
        parser.add_argument("--source", help="Only this source name")
        parser.add_argument("--dry-run", action="store_true")

    def handle(self, *args, **options):
        selected = [s for s in SOURCES if not options["source"] or s["name"] == options["source"]]
        if not selected:
            self.stderr.write("No matching source")
            return

        grand_new = 0
        for spec in selected:
            start = time.time()
            log = PYQCrawlLog(source=f"import:{spec['name']}")
            try:
                resp = requests.get(spec["url"], headers=HEADERS, timeout=120)
                resp.raise_for_status()
                found = saved = skipped = 0
                for row, row_spec in iter_records(resp.text, spec):
                    found += 1
                    item = normalise(row, row_spec)
                    if not item:
                        skipped += 1
                        continue
                    # Same hash the model uses, so re-runs and other importers dedupe together.
                    h = ExamQuestion.compute_hash(item["question_text"])
                    if ExamQuestion.objects.filter(question_text_hash=h).exists():
                        continue
                    if not options["dry_run"]:
                        ExamQuestion.objects.create(
                            question_text_hash=h,
                            source=QuestionSource.CRAWLED,
                            source_url=spec["url"],
                            is_verified=bool(row_spec.get("official_key", False)),
                            **item,
                        )
                    saved += 1
                log.status = "success"
                log.questions_found = found
                log.questions_new = saved
                grand_new += saved
                self.stdout.write(f"  {spec['name']}: {found} rows, {saved} new, {skipped} unusable ({time.time() - start:.0f}s)")
            except Exception as e:
                log.status = "error"
                log.error_message = str(e)[:500]
                self.stderr.write(f"  {spec['name']}: ERROR {str(e)[:120]}")
            log.duration_seconds = round(time.time() - start, 2)
            if not options["dry_run"]:
                log.save()

        self.stdout.write(self.style.SUCCESS(
            f"{'Would add' if options['dry_run'] else 'Added'} {grand_new} questions. Total now: {ExamQuestion.objects.count()}"
        ))
