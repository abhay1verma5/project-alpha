"""
PDF Question Extractor — downloads PYQ PDFs from the web and extracts MCQs using Gemini.
Targets: State police papers, TET papers, Patwari papers, GNM/ANM papers, etc.
"""

import io
import json
import logging
import os
import re
import time

import requests

from .base import BasePYQParser

logger = logging.getLogger(__name__)

GEMINI_MODELS = ["gemini-3.8-flash", "gemini-2.5-flash"]

# PDF URLs for various state exams — year-wise
PDF_TARGETS = {
    # UP Exams
    "up_police": [
        (2024, "General Studies", "https://www.sarkariresult.com/uppolice/uppolice-constable-2024-paper.pdf"),
        (2023, "General Studies", "https://www.sarkariresult.com/uppolice/uppolice-constable-2023-paper.pdf"),
    ],
    "uptet": [
        (2024, "Child Development", "https://www.exampur.com/pdf/uptet-previous-year-paper-2024.pdf"),
        (2023, "Child Development", "https://www.exampur.com/pdf/uptet-previous-year-paper-2023.pdf"),
    ],
    "up_lekhpal": [
        (2024, "General Knowledge", "https://www.exampur.com/pdf/up-lekhpal-previous-year-paper.pdf"),
    ],
    # Bihar Exams
    "bihar_police": [
        (2024, "General Studies", "https://www.exampur.com/pdf/bihar-police-previous-year-paper.pdf"),
    ],
    "bihar_tet": [
        (2024, "Child Development", "https://www.exampur.com/pdf/bihar-stet-previous-year-paper.pdf"),
    ],
    # MP Exams
    "mp_police": [
        (2024, "General Studies", "https://www.exampur.com/pdf/mp-police-previous-year-paper.pdf"),
    ],
    "mp_patwari": [
        (2024, "General Knowledge", "https://www.exampur.com/pdf/mp-patwari-previous-year-paper.pdf"),
    ],
    # Rajasthan
    "raj_police": [
        (2024, "General Studies", "https://www.exampur.com/pdf/rajasthan-police-previous-year-paper.pdf"),
    ],
    "reet": [
        (2024, "Child Development", "https://www.exampur.com/pdf/reet-previous-year-paper.pdf"),
    ],
    # Nursing
    "gnm": [
        (2024, "Nursing Foundations", "https://www.exampur.com/pdf/gnm-nursing-previous-year-paper.pdf"),
    ],
    "anm": [
        (2024, "Community Health", "https://www.exampur.com/pdf/anm-nursing-previous-year-paper.pdf"),
    ],
}

# Alternate sources — downloadable question paper sites
QUESTION_PAPER_SITES = [
    # These sites host question papers in HTML
    ("up_police", 2024, "GK", "https://www.jagranjosh.com/articles/up-police-constable-question-paper-1234567"),
    ("uptet", 2024, "Child Development", "https://www.jagranjosh.com/articles/uptet-previous-year-papers-1234"),
    ("bihar_police", 2024, "GK", "https://www.jagranjosh.com/articles/bihar-police-question-paper-1234"),
    ("gnm", 2024, "Nursing", "https://www.nursingexam.in/gnm-previous-year-question-papers/"),
    ("anm", 2024, "Nursing", "https://www.nursingexam.in/anm-previous-year-question-papers/"),
    ("bsc_nursing", 2024, "Nursing", "https://www.nursingexam.in/bsc-nursing-previous-year-question-papers/"),
    ("dpharm", 2024, "Pharmacology", "https://www.pharmaexam.in/d-pharm-previous-year-question-papers/"),
    ("bpharm", 2024, "Pharmacology", "https://www.pharmaexam.in/b-pharm-previous-year-question-papers/"),
]


def _call_gemini(prompt, api_key):
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
    return None


class PDFExtractorParser(BasePYQParser):
    name = "pdf_extractor"
    request_delay = 3

    def parse(self):
        api_key = os.environ.get("GEMINI_API_KEY", "")
        if not api_key:
            logger.warning("GEMINI_API_KEY not set, skipping PDF extractor")
            return []

        questions = []

        # Phase 1: Try PDF downloads
        for exam_type, papers in PDF_TARGETS.items():
            for year, subject, url in papers:
                try:
                    text = self._fetch_pdf_text(url)
                    if text and len(text) > 100:
                        qs = self._extract_with_ai(text, exam_type, year, subject, url, api_key)
                        questions.extend(qs)
                        logger.info("pdf: %s/%d → %d qs", exam_type, year, len(qs))
                except Exception as e:
                    logger.debug("pdf fetch failed %s: %s", url, e)
                time.sleep(2)

        # Phase 2: HTML question paper pages
        for exam_type, year, subject, url in QUESTION_PAPER_SITES:
            try:
                html = self.fetch(url)
                if not html:
                    continue
                soup = self.soup(html)
                for tag in soup(["script", "style", "nav", "footer", "header", "aside"]):
                    tag.decompose()
                text = soup.get_text(separator="\n", strip=True)
                if len(text) < 100:
                    continue
                qs = self._extract_with_ai(text[:10000], exam_type, year, subject, url, api_key)
                questions.extend(qs)
                logger.info("html_paper: %s/%d → %d qs", exam_type, year, len(qs))
            except Exception as e:
                logger.debug("html paper failed %s: %s", url, e)
            time.sleep(3)

        return questions

    def _fetch_pdf_text(self, url):
        """Download PDF and extract text."""
        try:
            resp = requests.get(url, timeout=30, headers={"User-Agent": "Mozilla/5.0"})
            if resp.status_code != 200:
                return None

            try:
                import PyPDF2
                reader = PyPDF2.PdfReader(io.BytesIO(resp.content))
                text = ""
                for page in reader.pages[:20]:  # First 20 pages
                    text += page.extract_text() or ""
                return text
            except ImportError:
                # Try pdfplumber
                try:
                    import pdfplumber
                    with pdfplumber.open(io.BytesIO(resp.content)) as pdf:
                        text = ""
                        for page in pdf.pages[:20]:
                            text += page.extract_text() or ""
                    return text
                except ImportError:
                    logger.warning("No PDF library available (install PyPDF2 or pdfplumber)")
                    return None
        except Exception as e:
            logger.debug("PDF download failed: %s", e)
            return None

    def _extract_with_ai(self, text, exam_type, year, subject, source_url, api_key):
        """Use Gemini to extract MCQs from text content."""
        if len(text) > 10000:
            text = text[:10000]

        prompt = f"""Extract ALL multiple choice questions (MCQs) from this {exam_type.replace('_', ' ').upper()} {year} {subject} exam paper.

For each question return a JSON object with:
- "question_text": the complete question text
- "options": array of exactly 4 options
- "correct_answer": 0-indexed (0=A, 1=B, 2=C, 3=D), use 0 if unknown
- "explanation": brief explanation if available, empty string otherwise

Return ONLY a valid JSON array. No markdown, no extra text.

CONTENT:
{text}"""

        raw = _call_gemini(prompt, api_key)
        if not raw:
            return []

        cleaned = raw.replace("```json", "").replace("```", "").strip()
        try:
            items = json.loads(cleaned)
        except json.JSONDecodeError:
            match = re.search(r'\[.*\]', cleaned, re.DOTALL)
            if match:
                try:
                    items = json.loads(match.group())
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
            q_text = str(item.get("question_text", "")).strip()
            opts = item.get("options", [])
            if len(q_text) < 15 or len(opts) != 4:
                continue
            correct = item.get("correct_answer", 0)
            if not isinstance(correct, int) or correct < 0 or correct > 3:
                correct = 0
            results.append({
                "exam_type": exam_type,
                "year": year,
                "subject": subject,
                "question_text": q_text,
                "options": [str(o) for o in opts],
                "correct_answer": correct,
                "explanation": str(item.get("explanation", "")),
                "difficulty": "medium",
                "source_url": source_url,
            })
        return results
