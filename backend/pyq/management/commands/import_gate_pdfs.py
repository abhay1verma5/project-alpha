"""Import GATE questions from the official IIT question papers and answer keys.

The GATE organising institutes publish text-based PDFs of every paper with a
separate official key, so these rows are the only ones that can carry
is_verified=True honestly. Only single-answer MCQs with text options are
imported; MSQ (multiple correct), NAT (numerical) and questions that depend on
a figure are skipped. 2021 papers are scanned images and are skipped.

Usage:
    python manage.py import_gate_pdfs                   # latest year only
    python manage.py import_gate_pdfs --years 2022 2023 2024 2025 2026
    python manage.py import_gate_pdfs --branches cs ec --dry-run
"""

import io
import re
import time

import requests
from django.core.management.base import BaseCommand

from pyq.models import ExamQuestion, PYQCrawlLog, QuestionSource

BASE = "https://gate2027.iitm.ac.in/static/doc/download"
HEADERS = {"User-Agent": "SarkariAlert-PYQ-Importer/1.0 (+https://sarkarialert.online)"}

EXAM_TYPE = {"cs": "gate_cse", "ec": "gate_ece", "me": "gate_me", "ee": "gate_ee", "ce": "gate_ce"}
BRANCH_NAME = {
    "cs": "Computer Science & IT", "ec": "Electronics & Communication",
    "me": "Mechanical Engineering", "ee": "Electrical Engineering", "ce": "Civil Engineering",
}

# (year, branch, session-label, paper path, key path). Paths as published on the
# gate2027.iitm.ac.in download page on 2026-10-19; file names change every year.
PAPERS = [
    (2022, "cs", "", "2022/cs_2022.pdf", "Answer_keys2022/cs_2022.pdf"),
    (2022, "ec", "", "2022/ec_2022.pdf", "Answer_keys2022/ec_2022.pdf"),
    (2022, "ee", "", "2022/ee_2022.pdf", "Answer_keys2022/ee_2022.pdf"),
    (2022, "ce", "", "2022/ce_2022.pdf", "Answer_keys2022/ce_2022.pdf"),
    # 2022 ME key is not published on the page.
    (2023, "cs", "", "2023/cs_2023.pdf", "Answer_keys2023/CS_ANS_GATE2023.pdf"),
    (2023, "ec", "", "2023/ec_2023.pdf", "Answer_keys2023/EC_ANS_GATE2023.pdf"),
    (2023, "me", "", "2023/me_2023.pdf", "Answer_keys2023/ME_ANS_GATE2023.pdf"),
    (2023, "ee", "", "2023/ee_2023.pdf", "Answer_keys2023/EE_ANS_GATE2023.pdf"),
    (2023, "ce", "1", "2023/ce1_2023.pdf", "Answer_keys2023/CE1_ANS_GATE2023.pdf"),
    (2023, "ce", "2", "2023/ce2_2023.pdf", "Answer_keys2023/CE2_ANS_GATE2023.pdf"),
    (2024, "cs", "1", "2024/CS124S5.pdf", "2024/CS1FinalAnswerKey.pdf"),
    (2024, "cs", "2", "2024/CS224S6.pdf", "2024/CS2FinalAnswerKey.pdf"),
    (2024, "ec", "", "2024/EC24S7.pdf", "2024/ECFinalAnswerKey.pdf"),
    (2024, "me", "", "2024/ME24S2.pdf", "2024/MEFinalAnswerKey.pdf"),
    (2024, "ee", "", "2024/EE24S8.pdf", "2024/EEFinalAnswerKey.pdf"),
    (2024, "ce", "1", "2024/CE124S3.pdf", "2024/CE1FinalAnswerKey.pdf"),
    (2024, "ce", "2", "2024/CE224S4.pdf", "2024/CE2FinalAnswerKey.pdf"),
    (2025, "cs", "1", "2025/CS12025.pdf", "2025_Key/CS1_Keys.pdf"),
    (2025, "cs", "2", "2025/CS22025.pdf", "2025_Key/CS2_Keys.pdf"),
    (2025, "ec", "", "2025/EC2025.pdf", "2025_Key/EC_Keys.pdf"),
    (2025, "me", "", "2025/ME2025.pdf", "2025_Key/ME_Keys.pdf"),
    (2025, "ee", "", "2025/EE2025.pdf", "2025_Key/EE_Keys.pdf"),
    (2025, "ce", "1", "2025/CE12025.pdf", "2025_Key/CE1_Keys.pdf"),
    (2025, "ce", "2", "2025/CE22025.pdf", "2025_Key/CE2_Keys.pdf"),
    (2026, "cs", "1", "2026/QPs/CS1.pdf", "2026/Keys/CS1_Keys.pdf"),
    (2026, "cs", "2", "2026/QPs/CS2.pdf", "2026/Keys/CS2_Keys.pdf"),
    (2026, "ec", "", "2026/QPs/EC.pdf", "2026/Keys/EC_Keys.pdf"),
    (2026, "me", "", "2026/QPs/ME.pdf", "2026/Keys/ME_Keys.pdf"),
    (2026, "ee", "", "2026/QPs/EE.pdf", "2026/Keys/EE_Keys.pdf"),
    (2026, "ce", "1", "2026/QPs/CE1.pdf", "2026/Keys/CE1_Keys.pdf"),
    (2026, "ce", "2", "2026/QPs/CE2.pdf", "2026/Keys/CE2_Keys.pdf"),
]

Q_START = re.compile(r"^\s*Q\.?\s*(\d{1,3})\s*[.:]?\s*(.*)$")
OPTION = re.compile(r"^\s*\(([A-D])\)\s*(.*)$")
# Key rows: "12 1 MCQ CS-1 B 1". Some years put each cell on its own line, so
# the key text is flattened first and rows are found with a lookahead for the
# next row (or the page footer / end of text).
KEY_ROW = re.compile(
    r"(\d{1,3})\s+\d\s+(MCQ|MSQ|NAT)\s+(\S+)\s+(.+?)\s+([12])"
    r"(?=\s+(?:\d{1,3}\s+\d\s+(?:MCQ|MSQ|NAT)\b|Page\b|GATE\b|Answer\b)|\s*$)"
)
NOISE = re.compile(
    r"^(Page \d+ of \d+|Organizing Institute.*|General Aptitude.*|.*Carry (ONE|TWO) marks? Each.*|SESSION.*|GATE 20\d\d.*|\s*)$",
    re.I,
)
TITLE_LINE = re.compile(r"\([A-Z]{2}\d?\)\s*$")  # "Computer Science & Information Technology (CS1)"
FIGURE = re.compile(r"\b(figure|diagram|shown below|given below|circuit shown|graph shown|as shown|following (table|figure|graph|circuit))\b", re.I)


def pdf_lines(data):
    from pypdf import PdfReader

    reader = PdfReader(io.BytesIO(data))
    lines = []
    for page in reader.pages:
        lines.extend((page.extract_text() or "").splitlines())
    return lines


def parse_keys(data):
    """{q_no: (type, letter_or_None)} from the official key PDF."""
    keys = {}
    flat = re.sub(r"\s+", " ", " ".join(pdf_lines(data)))
    for m in KEY_ROW.finditer(flat):
        qno, qtype, _section, key, _marks = m.groups()
        key = key.strip()
        if int(qno) in keys:
            continue
        if qtype == "MCQ" and re.fullmatch(r"[A-D]", key):
            keys[int(qno)] = ("MCQ", key)
        else:
            keys[int(qno)] = (qtype, None)  # MSQ/NAT/MTA: recorded but not imported
    return keys


def parse_questions(data):
    """{q_no: {"stem": str, "options": [4 str], "has_figure": bool}} from the paper."""
    questions = {}
    current = None
    expected = 1
    for raw in pdf_lines(data):
        line = raw.rstrip()
        if NOISE.match(line) or (TITLE_LINE.search(line) and len(line) < 90):
            continue
        m = Q_START.match(line)
        if m and int(m.group(1)) == expected:
            current = {"stem": [m.group(2).strip()], "options": {}, "opt": None}
            questions[expected] = current
            expected += 1
            continue
        if current is None:
            continue
        om = OPTION.match(line)
        if om:
            current["opt"] = om.group(1)
            current["options"][om.group(1)] = [om.group(2).strip()]
            continue
        if current["opt"]:
            current["options"][current["opt"]].append(line.strip())
        else:
            current["stem"].append(line.strip())

    out = {}
    for qno, q in questions.items():
        stem = re.sub(r"\s+", " ", " ".join(s for s in q["stem"] if s)).strip()
        opts = [re.sub(r"\s+", " ", " ".join(q["options"].get(k, []))).strip() for k in "ABCD"]
        out[qno] = {"stem": stem, "options": opts, "has_figure": bool(FIGURE.search(stem))}
    return out


class Command(BaseCommand):
    help = "Import GATE MCQs from official question papers and answer keys (is_verified=True)"

    def add_arguments(self, parser):
        parser.add_argument("--years", nargs="*", type=int, help="Default: latest year in the table")
        parser.add_argument("--branches", nargs="*", help="cs ec me ee ce (default all)")
        parser.add_argument("--dry-run", action="store_true")

    def handle(self, *args, **options):
        years = set(options["years"] or [max(p[0] for p in PAPERS)])
        branches = set(options["branches"] or EXAM_TYPE)
        todo = [p for p in PAPERS if p[0] in years and p[1] in branches]
        grand = 0
        for year, branch, session, paper_path, key_path in todo:
            label = f"GATE {year} {branch.upper()}{session}"
            start = time.time()
            log = PYQCrawlLog(source=f"gate:{year}:{branch}{session}")
            try:
                paper = requests.get(f"{BASE}/{paper_path}", headers=HEADERS, timeout=120)
                key = requests.get(f"{BASE}/{key_path}", headers=HEADERS, timeout=120)
                paper.raise_for_status()
                key.raise_for_status()
                keys = parse_keys(key.content)
                qs = parse_questions(paper.content)
                if not keys or not qs:
                    raise ValueError(f"parsed {len(qs)} questions / {len(keys)} keys (scanned PDF?)")

                saved = skipped = 0
                for qno, q in qs.items():
                    qtype, letter = keys.get(qno, (None, None))
                    if qtype != "MCQ" or not letter:
                        skipped += 1
                        continue
                    if q["has_figure"] or len(q["stem"]) < 15 or any(len(o) == 0 for o in q["options"]):
                        skipped += 1
                        continue
                    h = ExamQuestion.compute_hash(q["stem"])
                    if ExamQuestion.objects.filter(question_text_hash=h).exists():
                        continue
                    subject = "General Aptitude" if qno <= 10 else BRANCH_NAME[branch]
                    if not options["dry_run"]:
                        ExamQuestion.objects.create(
                            question_text_hash=h,
                            exam_type=EXAM_TYPE[branch],
                            year=year,
                            subject=subject,
                            chapter="",
                            question_text=q["stem"],
                            options=q["options"],
                            correct_answer="ABCD".index(letter),
                            explanation=f"Official GATE {year} answer key: ({letter}).",
                            difficulty="medium" if qno <= 35 else "hard",
                            source=QuestionSource.CRAWLED,
                            source_url=f"{BASE}/{paper_path}",
                            language="en",
                            is_verified=True,
                        )
                    saved += 1
                grand += saved
                log.status, log.questions_found, log.questions_new = "success", len(qs), saved
                self.stdout.write(f"  {label}: {len(qs)} questions, {len(keys)} keys, {saved} new MCQs, {skipped} skipped ({time.time() - start:.0f}s)")
            except Exception as e:
                log.status, log.error_message = "error", str(e)[:500]
                self.stderr.write(f"  {label}: ERROR {str(e)[:140]}")
            log.duration_seconds = round(time.time() - start, 2)
            if not options["dry_run"]:
                log.save()

        self.stdout.write(self.style.SUCCESS(
            f"{'Would add' if options['dry_run'] else 'Added'} {grand} verified GATE MCQs. Total now: {ExamQuestion.objects.count()}"
        ))
