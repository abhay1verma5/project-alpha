"""Parser for embibe.com — JEE, NEET PYQs."""

import logging
import re

from .base import BasePYQParser

logger = logging.getLogger(__name__)

# Embibe PYQ listing URLs
EMBIBE_URLS = {
    "jee_main": {
        "Physics": "https://www.embibe.com/exams/jee-main-previous-year-papers-physics/",
        "Chemistry": "https://www.embibe.com/exams/jee-main-previous-year-papers-chemistry/",
        "Mathematics": "https://www.embibe.com/exams/jee-main-previous-year-papers-maths/",
    },
    "neet": {
        "Physics": "https://www.embibe.com/exams/neet-previous-year-question-papers-physics/",
        "Chemistry": "https://www.embibe.com/exams/neet-previous-year-question-papers-chemistry/",
        "Biology (Botany)": "https://www.embibe.com/exams/neet-previous-year-question-papers-biology/",
    },
}


class EmbibePYQParser(BasePYQParser):
    name = "embibe"
    base_url = "https://www.embibe.com"
    use_proxy = True

    def parse(self):
        questions = []
        for exam_type, subjects in EMBIBE_URLS.items():
            for subject, url in subjects.items():
                try:
                    html = self.fetch(url)
                    if not html:
                        continue
                    soup = self.soup(html)
                    questions.extend(self._extract_questions(soup, exam_type, subject, url))
                except Exception as e:
                    logger.error("Embibe parse error for %s/%s: %s", exam_type, subject, e)
        return questions

    def _extract_questions(self, soup, exam_type, subject, source_url):
        """Extract MCQ questions from Embibe page structure."""
        results = []
        # Embibe uses various class patterns for questions
        q_blocks = soup.select(".question-container, .pyq-question, [class*='question']")

        for block in q_blocks:
            try:
                q_text_el = block.select_one(".question-text, .q-text, p")
                if not q_text_el:
                    continue
                q_text = self.clean_text(q_text_el.get_text())
                if len(q_text) < 10:
                    continue

                # Extract options
                option_els = block.select(".option, .answer-option, li")
                options = [self.clean_text(o.get_text()) for o in option_els[:4]]
                if len(options) != 4:
                    continue

                # Try to extract correct answer
                correct = 0
                for i, o in enumerate(option_els[:4]):
                    if "correct" in (o.get("class", []) or []) or o.select_one(".correct"):
                        correct = i
                        break

                # Try to extract year
                year = 2024
                year_match = re.search(r"20[12]\d", block.get_text())
                if year_match:
                    year = int(year_match.group())

                # Explanation
                expl_el = block.select_one(".solution, .explanation, .answer-explanation")
                explanation = self.clean_text(expl_el.get_text()) if expl_el else ""

                results.append({
                    "exam_type": exam_type,
                    "year": year,
                    "subject": subject,
                    "question_text": q_text,
                    "options": options,
                    "correct_answer": correct,
                    "explanation": explanation,
                    "difficulty": "medium",
                    "source_url": source_url,
                })
            except Exception as e:
                logger.debug("Embibe question parse error: %s", e)
                continue

        logger.info("Embibe: extracted %d questions for %s/%s", len(results), exam_type, subject)
        return results
