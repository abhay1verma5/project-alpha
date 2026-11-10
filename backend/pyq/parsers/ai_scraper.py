"""
AI-powered PYQ scraper — fetches real exam pages, uses Gemini to extract MCQs.
Works on ANY educational site without site-specific CSS selectors.
Targets: Byjus, SSCAdda, BankersAdda, Embibe, and other PYQ sources.
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

# Real PYQ page URLs organized by exam, year, subject
AI_CRAWL_TARGETS = {
    "jee_main": [
        (2024, "Physics", "https://byjus.com/jee/jee-main-2024-january-27-shift-1-physics-question-paper/"),
        (2024, "Chemistry", "https://byjus.com/jee/jee-main-2024-january-27-shift-1-chemistry-question-paper/"),
        (2024, "Mathematics", "https://byjus.com/jee/jee-main-2024-january-27-shift-1-maths-question-paper/"),
        (2023, "Physics", "https://byjus.com/jee/jee-main-2023-physics-question-paper/"),
        (2023, "Chemistry", "https://byjus.com/jee/jee-main-2023-chemistry-question-paper/"),
        (2023, "Mathematics", "https://byjus.com/jee/jee-main-2023-maths-question-paper/"),
        (2022, "Physics", "https://byjus.com/jee/jee-main-2022-june-24-shift-1-physics/"),
        (2022, "Chemistry", "https://byjus.com/jee/jee-main-2022-june-24-shift-1-chemistry/"),
    ],
    "neet": [
        (2024, "Physics", "https://byjus.com/neet/neet-2024-physics-question-paper/"),
        (2024, "Chemistry", "https://byjus.com/neet/neet-2024-chemistry-question-paper/"),
        (2024, "Biology", "https://byjus.com/neet/neet-2024-biology-question-paper/"),
        (2023, "Physics", "https://byjus.com/neet/neet-2023-physics-question-paper/"),
        (2023, "Chemistry", "https://byjus.com/neet/neet-2023-chemistry-question-paper/"),
        (2023, "Biology", "https://byjus.com/neet/neet-2023-biology-question-paper/"),
        (2022, "Physics", "https://byjus.com/neet/neet-2022-physics-question-paper/"),
        (2022, "Biology", "https://byjus.com/neet/neet-2022-biology-question-paper/"),
    ],
    "upsc_prelims": [
        (2024, "General Studies", "https://byjus.com/free-ias-prep/upsc-prelims-2024-question-paper-analysis/"),
        (2023, "General Studies", "https://byjus.com/free-ias-prep/upsc-prelims-2023-question-paper-analysis/"),
        (2022, "General Studies", "https://byjus.com/free-ias-prep/upsc-prelims-2022-question-paper-analysis/"),
    ],
    "ssc_cgl": [
        (2024, "General Awareness", "https://www.sscadda.com/ssc-cgl-previous-year-question-paper/"),
        (2024, "Quantitative Aptitude", "https://www.sscadda.com/ssc-cgl-quantitative-aptitude-questions/"),
        (2023, "General Awareness", "https://www.sscadda.com/ssc-cgl-general-awareness-questions/"),
        (2023, "Reasoning", "https://www.sscadda.com/ssc-cgl-reasoning-questions/"),
    ],
    "ibps_po": [
        (2024, "Reasoning", "https://www.bankersadda.com/ibps-po-previous-year-question-paper/"),
        (2024, "Quantitative Aptitude", "https://www.bankersadda.com/ibps-po-quantitative-aptitude-questions/"),
    ],
    "gate_cse": [
        (2024, "Computer Science", "https://byjus.com/gate/gate-cs-question-paper-2024/"),
        (2023, "Computer Science", "https://byjus.com/gate/gate-cs-question-paper-2023/"),
    ],
    "ctet": [
        (2024, "Child Development", "https://byjus.com/free-ias-prep/ctet-previous-year-papers/"),
    ],
    "cbse_12": [
        (2024, "Physics", "https://byjus.com/cbse/cbse-class-12-physics-previous-year-question-paper/"),
        (2024, "Chemistry", "https://byjus.com/cbse/cbse-class-12-chemistry-previous-year-question-paper/"),
        (2024, "Mathematics", "https://byjus.com/cbse/cbse-class-12-maths-previous-year-question-paper/"),
    ],
    "rrb_ntpc": [
        (2024, "General Awareness", "https://www.adda247.com/railway-exam/rrb-ntpc-previous-year-question-paper/"),
    ],
    "nda": [
        (2024, "Mathematics", "https://byjus.com/nda/nda-maths-previous-year-question-paper/"),
        (2024, "General Ability", "https://byjus.com/nda/nda-gat-previous-year-question-paper/"),
    ],
    "ugc_net": [
        (2024, "General Paper", "https://byjus.com/free-ias-prep/ugc-net-previous-year-question-paper/"),
    ],
}


def _call_gemini(prompt, api_key):
    """Call Gemini API to extract questions from text."""
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
        except Exception as e:
            logger.warning("Gemini %s error: %s", model, e)
            continue

    # Fallback to free stonechat API
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


class AIPYQScraper(BasePYQParser):
    name = "ai_scraper"
    request_delay = 2

    def parse(self):
        api_key = os.environ.get("GEMINI_API_KEY", "")
        if not api_key:
            logger.warning("GEMINI_API_KEY not set, skipping AI scraper")
            return []

        questions = []
        for exam_type, targets in AI_CRAWL_TARGETS.items():
            for year, subject, url in targets:
                try:
                    qs = self._scrape_url(url, exam_type, year, subject, api_key)
                    questions.extend(qs)
                    logger.info("ai_scraper: %s/%s/%d → %d qs", exam_type, subject, year, len(qs))
                    time.sleep(3)  # Rate limit between API calls
                except Exception as e:
                    logger.error("ai_scraper error %s/%s/%d: %s", exam_type, subject, year, e)
        return questions

    def _scrape_url(self, url, exam_type, year, subject, api_key):
        """Fetch page, extract text, ask Gemini to find MCQs."""
        html = self.fetch(url)
        if not html:
            return []

        soup = self.soup(html)
        # Remove non-content elements
        for tag in soup(["script", "style", "nav", "footer", "header", "aside", "iframe", "noscript"]):
            tag.decompose()

        text = soup.get_text(separator="\n", strip=True)
        # Truncate to fit Gemini context
        if len(text) > 10000:
            text = text[:10000]
        if len(text) < 100:
            return []

        prompt = f"""You are extracting MCQ questions from a {exam_type.replace('_', ' ').upper()} {year} {subject} exam paper page.

Extract ALL multiple choice questions from this content. For each question return:
- "question_text": the complete question
- "options": array of exactly 4 option strings (A, B, C, D)
- "correct_answer": 0-indexed correct option (0=A, 1=B, 2=C, 3=D)
- "explanation": explanation if available, otherwise empty string

Return ONLY a valid JSON array. No markdown, no extra text. If no questions found, return [].

PAGE CONTENT:
{text}"""

        raw = _call_gemini(prompt, api_key)
        if not raw:
            return []

        # Parse JSON response
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
                "source_url": url,
            })

        return results
