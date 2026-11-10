"""
Mega source aggregator — crawls ALL major Indian exam paper sites.
Targets: JagranJosh, Adda247, Exampur, Testbook, Embibe, Byjus, Vedantu,
         NursingExam, PharmaExam, DoubtNut, Unacademy blog, Gradeup,
         SarkariResult, FreePDF, and many more.

Uses Gemini AI to extract MCQs from any page — no site-specific selectors needed.
"""

import json
import logging
import os
import re
import time

import requests

from .base import BasePYQParser

logger = logging.getLogger(__name__)

GEMINI_MODELS = ["gemini-3.8-flash", "gemini-2.5-flash"]

# ══════════════════════════════════════════════════════════════════
# MASSIVE URL DATABASE — organized by exam type
# Each entry: (year, subject, url)
# ══════════════════════════════════════════════════════════════════

MEGA_TARGETS = {
    # ── JEE Main ──
    "jee_main": [
        (2024, "Physics", "https://byjus.com/jee/jee-main-2024-physics-question-paper/"),
        (2024, "Chemistry", "https://byjus.com/jee/jee-main-2024-chemistry-question-paper/"),
        (2024, "Mathematics", "https://byjus.com/jee/jee-main-2024-maths-question-paper/"),
        (2023, "Physics", "https://byjus.com/jee/jee-main-2023-physics-question-paper/"),
        (2023, "Chemistry", "https://byjus.com/jee/jee-main-2023-chemistry-question-paper/"),
        (2023, "Mathematics", "https://byjus.com/jee/jee-main-2023-maths-question-paper/"),
        (2022, "Physics", "https://byjus.com/jee/jee-main-2022-physics-question-paper/"),
        (2022, "Chemistry", "https://byjus.com/jee/jee-main-2022-chemistry-question-paper/"),
        (2021, "Physics", "https://byjus.com/jee/jee-main-2021-physics-question-paper/"),
        (2024, "Physics", "https://www.vedantu.com/jee-main/jee-main-2024-question-paper-physics"),
        (2024, "Chemistry", "https://www.vedantu.com/jee-main/jee-main-2024-question-paper-chemistry"),
        (2024, "Mathematics", "https://www.vedantu.com/jee-main/jee-main-2024-question-paper-maths"),
        (2024, "Physics", "https://www.embibe.com/exams/jee-main-previous-year-papers-physics/"),
        (2024, "Chemistry", "https://www.embibe.com/exams/jee-main-previous-year-papers-chemistry/"),
        (2024, "Mathematics", "https://www.embibe.com/exams/jee-main-previous-year-papers-maths/"),
        (2023, "Physics", "https://www.allen.ac.in/jee-main-question-paper-2023/"),
    ],
    # ── JEE Advanced ──
    "jee_advanced": [
        (2024, "Physics", "https://byjus.com/jee/jee-advanced-2024-question-paper/"),
        (2023, "Physics", "https://byjus.com/jee/jee-advanced-2023-question-paper/"),
        (2022, "Physics", "https://byjus.com/jee/jee-advanced-2022-question-paper/"),
        (2024, "Physics", "https://www.vedantu.com/jee-advanced/jee-advanced-2024-question-paper"),
    ],
    # ── NEET ──
    "neet": [
        (2024, "Physics", "https://byjus.com/neet/neet-2024-physics-question-paper/"),
        (2024, "Chemistry", "https://byjus.com/neet/neet-2024-chemistry-question-paper/"),
        (2024, "Biology", "https://byjus.com/neet/neet-2024-biology-question-paper/"),
        (2023, "Physics", "https://byjus.com/neet/neet-2023-physics-question-paper/"),
        (2023, "Chemistry", "https://byjus.com/neet/neet-2023-chemistry-question-paper/"),
        (2023, "Biology", "https://byjus.com/neet/neet-2023-biology-question-paper/"),
        (2022, "Physics", "https://byjus.com/neet/neet-2022-physics-question-paper/"),
        (2022, "Biology", "https://byjus.com/neet/neet-2022-biology-question-paper/"),
        (2024, "Physics", "https://www.vedantu.com/neet/neet-2024-question-paper"),
        (2024, "Biology", "https://www.embibe.com/exams/neet-previous-year-question-papers-biology/"),
        (2024, "Physics", "https://www.embibe.com/exams/neet-previous-year-question-papers-physics/"),
        (2024, "Chemistry", "https://www.embibe.com/exams/neet-previous-year-question-papers-chemistry/"),
        (2023, "Physics", "https://www.allen.ac.in/neet-question-paper-2023/"),
    ],
    # ── GATE CSE ──
    "gate_cse": [
        (2024, "Computer Science", "https://byjus.com/gate/gate-cs-question-paper-2024/"),
        (2023, "Computer Science", "https://byjus.com/gate/gate-cs-question-paper-2023/"),
        (2022, "Computer Science", "https://byjus.com/gate/gate-cs-question-paper-2022/"),
        (2024, "Computer Science", "https://www.geeksforgeeks.org/gate-cs-2024-question-paper-with-answer-key/"),
        (2023, "Computer Science", "https://www.geeksforgeeks.org/gate-cs-2023-question-paper-with-answer-key/"),
        (2022, "Computer Science", "https://www.geeksforgeeks.org/gate-cs-2022-question-paper-with-answer-key/"),
        (2021, "Computer Science", "https://www.geeksforgeeks.org/gate-cs-2021-set-1/"),
    ],
    # ── SSC CGL ──
    "ssc_cgl": [
        (2024, "General Awareness", "https://www.sscadda.com/ssc-cgl-previous-year-question-paper/"),
        (2024, "Quantitative Aptitude", "https://www.sscadda.com/ssc-cgl-quantitative-aptitude-questions/"),
        (2023, "General Awareness", "https://www.jagranjosh.com/articles/ssc-cgl-previous-year-papers-download-pdf-1615880312-1"),
        (2024, "Reasoning", "https://testbook.com/ssc-cgl/previous-year-papers"),
        (2024, "English", "https://www.adda247.com/ssc-jobs/ssc-cgl-previous-year-question-paper/"),
    ],
    # ── SSC CHSL ──
    "ssc_chsl": [
        (2024, "General Awareness", "https://www.sscadda.com/ssc-chsl-previous-year-question-paper/"),
        (2024, "Reasoning", "https://testbook.com/ssc-chsl/previous-year-papers"),
        (2024, "English", "https://www.adda247.com/ssc-jobs/ssc-chsl-previous-year-question-paper/"),
    ],
    # ── SSC GD ──
    "ssc_gd": [
        (2024, "General Knowledge", "https://www.sscadda.com/ssc-gd-previous-year-question-paper/"),
        (2024, "Mathematics", "https://testbook.com/ssc-gd/previous-year-papers"),
    ],
    # ── UPSC Prelims ──
    "upsc_prelims": [
        (2024, "General Studies", "https://byjus.com/free-ias-prep/upsc-prelims-2024-question-paper-analysis/"),
        (2023, "General Studies", "https://byjus.com/free-ias-prep/upsc-prelims-2023-question-paper-analysis/"),
        (2022, "General Studies", "https://byjus.com/free-ias-prep/upsc-prelims-2022-question-paper-analysis/"),
        (2024, "General Studies", "https://www.jagranjosh.com/articles/upsc-prelims-question-paper-2024-1234567"),
        (2024, "CSAT", "https://www.drishtiias.com/upsc-prelims-question-paper-2024"),
        (2023, "General Studies", "https://www.drishtiias.com/upsc-prelims-question-paper-2023"),
    ],
    # ── RRB NTPC ──
    "rrb_ntpc": [
        (2024, "General Awareness", "https://www.adda247.com/railway-exam/rrb-ntpc-previous-year-question-paper/"),
        (2024, "Mathematics", "https://testbook.com/rrb-ntpc/previous-year-papers"),
        (2023, "General Awareness", "https://www.jagranjosh.com/articles/rrb-ntpc-previous-year-papers-1234567"),
    ],
    # ── RRB Group D ──
    "rrb_group_d": [
        (2024, "General Science", "https://testbook.com/rrb-group-d/previous-year-papers"),
        (2024, "Mathematics", "https://www.adda247.com/railway-exam/rrb-group-d-previous-year-question-paper/"),
    ],
    # ── IBPS PO ──
    "ibps_po": [
        (2024, "Reasoning", "https://www.bankersadda.com/ibps-po-previous-year-question-paper/"),
        (2024, "Quantitative Aptitude", "https://testbook.com/ibps-po/previous-year-papers"),
        (2023, "Reasoning", "https://www.jagranjosh.com/articles/ibps-po-previous-year-papers-1234567"),
    ],
    # ── SBI PO ──
    "sbi_po": [
        (2024, "Reasoning", "https://www.bankersadda.com/sbi-po-previous-year-question-paper/"),
        (2024, "Quantitative Aptitude", "https://testbook.com/sbi-po/previous-year-papers"),
    ],
    # ── CTET ──
    "ctet": [
        (2024, "Child Development", "https://byjus.com/free-ias-prep/ctet-previous-year-papers/"),
        (2024, "Child Development", "https://www.jagranjosh.com/articles/ctet-previous-year-papers-1234567"),
        (2024, "Mathematics", "https://testbook.com/ctet/previous-year-papers"),
    ],
    # ── UGC NET ──
    "ugc_net": [
        (2024, "General Paper I", "https://byjus.com/free-ias-prep/ugc-net-previous-year-question-paper/"),
        (2024, "General Paper I", "https://testbook.com/ugc-net/previous-year-papers"),
    ],
    # ── CBSE Board ──
    "cbse_12": [
        (2024, "Physics", "https://byjus.com/cbse/cbse-class-12-physics-previous-year-question-paper/"),
        (2024, "Chemistry", "https://byjus.com/cbse/cbse-class-12-chemistry-previous-year-question-paper/"),
        (2024, "Mathematics", "https://byjus.com/cbse/cbse-class-12-maths-previous-year-question-paper/"),
        (2024, "Biology", "https://byjus.com/cbse/cbse-class-12-biology-previous-year-question-paper/"),
        (2024, "Physics", "https://www.vedantu.com/cbse/cbse-class-12-physics-previous-year-question-paper"),
        (2024, "Chemistry", "https://www.vedantu.com/cbse/cbse-class-12-chemistry-previous-year-question-paper"),
        (2023, "Physics", "https://www.learncbse.in/cbse-class-12-physics-previous-year-question-papers/"),
        (2023, "Mathematics", "https://www.learncbse.in/cbse-class-12-maths-previous-year-question-papers/"),
    ],
    "cbse_10": [
        (2024, "Mathematics", "https://byjus.com/cbse/cbse-class-10-maths-previous-year-question-paper/"),
        (2024, "Science", "https://byjus.com/cbse/cbse-class-10-science-previous-year-question-paper/"),
        (2024, "Social Science", "https://byjus.com/cbse/cbse-class-10-social-science-previous-year-question-paper/"),
        (2024, "Mathematics", "https://www.vedantu.com/cbse/cbse-class-10-maths-previous-year-question-paper"),
        (2023, "Science", "https://www.learncbse.in/cbse-class-10-science-previous-year-question-papers/"),
    ],
    # ── State Police ──
    "up_police": [
        (2024, "General Hindi", "https://www.jagranjosh.com/articles/up-police-constable-previous-year-papers-1234567"),
        (2024, "General Knowledge", "https://testbook.com/up-police/previous-year-papers"),
        (2023, "Reasoning", "https://www.adda247.com/upsc-exam/up-police-previous-year-question-paper/"),
    ],
    "up_si": [
        (2024, "General Studies", "https://testbook.com/up-si/previous-year-papers"),
        (2023, "Hindi", "https://www.adda247.com/upsc-exam/up-si-previous-year-question-paper/"),
    ],
    "bihar_police": [
        (2024, "General Knowledge", "https://testbook.com/bihar-police/previous-year-papers"),
        (2024, "Hindi", "https://www.adda247.com/teaching-jobs-exam/bihar-police-previous-year-question-paper/"),
    ],
    "mp_police": [
        (2024, "General Knowledge", "https://testbook.com/mp-police/previous-year-papers"),
    ],
    "raj_police": [
        (2024, "Reasoning", "https://testbook.com/rajasthan-police/previous-year-papers"),
    ],
    "delhi_police": [
        (2024, "General Awareness", "https://testbook.com/delhi-police/previous-year-papers"),
        (2024, "Reasoning", "https://www.adda247.com/ssc-jobs/delhi-police-previous-year-question-paper/"),
    ],
    "haryana_police": [
        (2024, "General Knowledge", "https://testbook.com/haryana-police/previous-year-papers"),
    ],
    # ── State TET ──
    "uptet": [
        (2024, "Child Development", "https://www.jagranjosh.com/articles/uptet-previous-year-papers-1234567"),
        (2024, "Child Development", "https://testbook.com/uptet/previous-year-papers"),
        (2023, "Mathematics", "https://www.adda247.com/teaching-jobs-exam/uptet-previous-year-question-paper/"),
    ],
    "reet": [
        (2024, "Child Development", "https://testbook.com/reet/previous-year-papers"),
        (2023, "Child Development", "https://www.adda247.com/teaching-jobs-exam/reet-previous-year-question-paper/"),
    ],
    "htet": [
        (2024, "Child Development", "https://testbook.com/htet/previous-year-papers"),
    ],
    "mptet": [
        (2024, "Child Development", "https://testbook.com/mptet/previous-year-papers"),
    ],
    "bihar_tet": [
        (2024, "Child Development", "https://testbook.com/bihar-tet/previous-year-papers"),
    ],
    # ── Nursing & Pharma ──
    "gnm": [
        (2024, "Nursing Foundations", "https://www.nursingexam.in/gnm-previous-year-question-papers/"),
        (2024, "Anatomy", "https://www.exampur.com/study-material/gnm-nursing-question-papers/"),
        (2024, "Community Health", "https://nursingmanthra.com/gnm-nursing-previous-year-question-papers/"),
    ],
    "anm": [
        (2024, "Community Health", "https://www.nursingexam.in/anm-previous-year-question-papers/"),
        (2024, "Midwifery", "https://nursingmanthra.com/anm-previous-year-question-papers/"),
    ],
    "bsc_nursing": [
        (2024, "Anatomy", "https://www.nursingexam.in/bsc-nursing-previous-year-question-papers/"),
        (2024, "Pharmacology", "https://nursingmanthra.com/bsc-nursing-previous-year-question-papers/"),
    ],
    "bpharm": [
        (2024, "Pharmacology", "https://www.pharmaexamprep.com/b-pharm-previous-year-question-papers/"),
    ],
    "dpharm": [
        (2024, "Pharmaceutics", "https://www.pharmaexamprep.com/d-pharm-previous-year-question-papers/"),
    ],
    # ── State PSC ──
    "uppsc": [
        (2024, "General Studies", "https://byjus.com/free-ias-prep/uppsc-previous-year-question-paper/"),
        (2024, "General Studies", "https://testbook.com/uppsc/previous-year-papers"),
        (2023, "General Studies", "https://www.drishtiias.com/uppcs-previous-year-question-papers"),
    ],
    "bpsc": [
        (2024, "General Studies", "https://testbook.com/bpsc/previous-year-papers"),
        (2024, "General Studies", "https://byjus.com/free-ias-prep/bpsc-previous-year-question-paper/"),
        (2023, "General Studies", "https://www.drishtiias.com/bpsc-previous-year-question-papers"),
    ],
    "mppsc": [
        (2024, "General Studies", "https://testbook.com/mppsc/previous-year-papers"),
        (2024, "General Studies", "https://byjus.com/free-ias-prep/mppsc-previous-year-question-paper/"),
    ],
    "rpsc": [
        (2024, "General Knowledge", "https://testbook.com/rpsc/previous-year-papers"),
        (2024, "Rajasthan GK", "https://byjus.com/free-ias-prep/rpsc-previous-year-question-paper/"),
    ],
    "tnpsc": [
        (2024, "General Studies", "https://testbook.com/tnpsc/previous-year-papers"),
    ],
    "wbpsc": [
        (2024, "General Studies", "https://testbook.com/wbpsc/previous-year-papers"),
    ],
    "appsc": [
        (2024, "General Studies", "https://testbook.com/appsc/previous-year-papers"),
    ],
    # ── Patwari/Lekhpal ──
    "up_lekhpal": [
        (2024, "General Knowledge", "https://testbook.com/up-lekhpal/previous-year-papers"),
        (2022, "General Hindi", "https://www.jagranjosh.com/articles/up-lekhpal-previous-year-papers-1234567"),
    ],
    "mp_patwari": [
        (2024, "General Knowledge", "https://testbook.com/mp-patwari/previous-year-papers"),
    ],
    "raj_patwari": [
        (2024, "General Knowledge", "https://testbook.com/rajasthan-patwari/previous-year-papers"),
    ],
    # ── CLAT / Law ──
    "clat": [
        (2024, "Legal Reasoning", "https://byjus.com/free-ias-prep/clat-previous-year-question-paper/"),
        (2024, "English", "https://testbook.com/clat/previous-year-papers"),
    ],
    # ── NDA ──
    "nda": [
        (2024, "Mathematics", "https://byjus.com/nda/nda-previous-year-question-paper/"),
        (2024, "General Ability", "https://testbook.com/nda/previous-year-papers"),
    ],
    # ── GATE other branches ──
    "gate_ece": [
        (2024, "Electronics", "https://byjus.com/gate/gate-ece-question-paper-2024/"),
        (2023, "Electronics", "https://byjus.com/gate/gate-ece-question-paper-2023/"),
    ],
    "gate_me": [
        (2024, "Mechanical", "https://byjus.com/gate/gate-me-question-paper-2024/"),
        (2023, "Mechanical", "https://byjus.com/gate/gate-me-question-paper-2023/"),
    ],
    "gate_ee": [
        (2024, "Electrical", "https://byjus.com/gate/gate-ee-question-paper-2024/"),
        (2023, "Electrical", "https://byjus.com/gate/gate-ee-question-paper-2023/"),
    ],
    "gate_ce": [
        (2024, "Civil", "https://byjus.com/gate/gate-ce-question-paper-2024/"),
    ],
    # ── Group C/D ──
    "up_vdo": [
        (2024, "General Hindi", "https://testbook.com/up-vdo/previous-year-papers"),
    ],
    "mp_vyapam": [
        (2024, "General Knowledge", "https://testbook.com/mp-vyapam/previous-year-papers"),
    ],
    "hssc": [
        (2024, "General Knowledge", "https://testbook.com/hssc/previous-year-papers"),
    ],
    # ── CAT/MBA ──
    "cat": [
        (2024, "Quantitative Aptitude", "https://byjus.com/cat/cat-previous-year-question-paper/"),
        (2023, "VARC", "https://testbook.com/cat/previous-year-papers"),
    ],
    # ── Others ──
    "cuet": [
        (2024, "General Test", "https://byjus.com/cuet/cuet-previous-year-question-paper/"),
        (2024, "English", "https://testbook.com/cuet/previous-year-papers"),
    ],
    "epfo": [
        (2024, "General Awareness", "https://testbook.com/epfo/previous-year-papers"),
    ],
    "fci": [
        (2024, "General Knowledge", "https://testbook.com/fci/previous-year-papers"),
    ],
    "rpf": [
        (2024, "General Awareness", "https://testbook.com/rpf/previous-year-papers"),
    ],
    "dsssb": [
        (2024, "General Awareness", "https://testbook.com/dsssb/previous-year-papers"),
    ],
    "ssc_mts": [
        (2024, "General Awareness", "https://testbook.com/ssc-mts/previous-year-papers"),
    ],
    "ssc_cpo": [
        (2024, "General Awareness", "https://testbook.com/ssc-cpo/previous-year-papers"),
    ],
    "ibps_clerk": [
        (2024, "Reasoning", "https://testbook.com/ibps-clerk/previous-year-papers"),
    ],
    "sbi_clerk": [
        (2024, "Reasoning", "https://testbook.com/sbi-clerk/previous-year-papers"),
    ],
    "rrb_je": [
        (2024, "General Science", "https://testbook.com/rrb-je/previous-year-papers"),
    ],
    "rrb_alp": [
        (2024, "General Science", "https://testbook.com/rrb-alp/previous-year-papers"),
    ],
}


def _call_gemini(prompt, api_key):
    """Call Gemini with fallback to free API."""
    for model in GEMINI_MODELS:
        try:
            resp = requests.post(
                f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}",
                json={
                    "contents": [{"role": "user", "parts": [{"text": prompt}]}],
                    "generationConfig": {"temperature": 0.1, "maxOutputTokens": 8192},
                },
                timeout=90,
            )
            if resp.ok:
                data = resp.json()
                return data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
            if resp.status_code in (429, 503):
                time.sleep(5)
                continue
        except Exception:
            continue

    # Free API fallback
    try:
        resp = requests.post(
            "https://flm.stonech.at/v1/chat/completions",
            json={
                "model": "gpt-4o-mini",
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.1,
                "max_tokens": 8192,
            },
            timeout=90,
        )
        if resp.ok:
            return resp.json()["choices"][0]["message"]["content"]
    except Exception:
        pass
    return None


class MegaSourceParser(BasePYQParser):
    name = "mega_sources"
    request_delay = 3

    def parse(self):
        api_key = os.environ.get("GEMINI_API_KEY", "")
        if not api_key:
            logger.warning("GEMINI_API_KEY not set, skipping mega sources")
            return []

        questions = []
        for exam_type, targets in MEGA_TARGETS.items():
            for year, subject, url in targets:
                try:
                    qs = self._scrape_url(url, exam_type, year, subject, api_key)
                    questions.extend(qs)
                    if qs:
                        logger.info("mega: %s/%s/%d → %d qs from %s", exam_type, subject, year, len(qs), url)
                    time.sleep(3)
                except Exception as e:
                    logger.debug("mega error %s: %s", url, e)
        return questions

    def _scrape_url(self, url, exam_type, year, subject, api_key):
        html = self.fetch(url)
        if not html:
            return []

        soup = self.soup(html)
        for tag in soup(["script", "style", "nav", "footer", "header", "aside", "iframe", "noscript", "svg"]):
            tag.decompose()

        text = soup.get_text(separator="\n", strip=True)
        if len(text) > 12000:
            text = text[:12000]
        if len(text) < 100:
            return []

        prompt = f"""Extract ALL MCQ questions from this {exam_type.replace('_', ' ').upper()} {year} {subject} exam paper page.

Return a JSON array where each object has:
- "question_text": complete question
- "options": array of exactly 4 strings
- "correct_answer": 0-indexed (0=A, 1=B, 2=C, 3=D)
- "explanation": explanation or empty string

Return ONLY valid JSON array. No markdown.

CONTENT:
{text}"""

        raw = _call_gemini(prompt, api_key)
        if not raw:
            return []

        cleaned = raw.replace("```json", "").replace("```", "").strip()
        try:
            items = json.loads(cleaned)
        except json.JSONDecodeError:
            m = re.search(r'\[.*\]', cleaned, re.DOTALL)
            if m:
                try:
                    items = json.loads(m.group())
                except json.JSONDecodeError:
                    return []
            else:
                return []

        if not isinstance(items, list):
            return []

        results = []
        for item in items:
            if not isinstance(item, dict):
                continue
            q = str(item.get("question_text", "")).strip()
            opts = item.get("options", [])
            if len(q) < 15 or len(opts) != 4:
                continue
            c = item.get("correct_answer", 0)
            if not isinstance(c, int) or c < 0 or c > 3:
                c = 0
            results.append({
                "exam_type": exam_type,
                "year": year,
                "subject": subject,
                "question_text": q,
                "options": [str(o) for o in opts],
                "correct_answer": c,
                "explanation": str(item.get("explanation", "")),
                "difficulty": "medium",
                "source_url": url,
            })
        return results
