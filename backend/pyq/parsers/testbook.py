"""Parser for testbook.com — SSC, Railway, Banking PYQs."""

import logging
import re

from .base import BasePYQParser

logger = logging.getLogger(__name__)

TESTBOOK_URLS = {
    "ssc_cgl": {
        "Quantitative Aptitude": "https://testbook.com/ssc-cgl/previous-year-papers-quantitative-aptitude",
        "English Language": "https://testbook.com/ssc-cgl/previous-year-papers-english",
        "General Intelligence & Reasoning": "https://testbook.com/ssc-cgl/previous-year-papers-reasoning",
        "General Awareness": "https://testbook.com/ssc-cgl/previous-year-papers-general-awareness",
    },
    "ssc_chsl": {
        "Quantitative Aptitude": "https://testbook.com/ssc-chsl/previous-year-papers-quantitative-aptitude",
        "English Language": "https://testbook.com/ssc-chsl/previous-year-papers-english",
        "General Intelligence & Reasoning": "https://testbook.com/ssc-chsl/previous-year-papers-reasoning",
        "General Awareness": "https://testbook.com/ssc-chsl/previous-year-papers-general-awareness",
    },
    "rrb_ntpc": {
        "Mathematics": "https://testbook.com/rrb-ntpc/previous-year-papers-mathematics",
        "General Intelligence & Reasoning": "https://testbook.com/rrb-ntpc/previous-year-papers-reasoning",
        "General Awareness": "https://testbook.com/rrb-ntpc/previous-year-papers-general-awareness",
        "General Science": "https://testbook.com/rrb-ntpc/previous-year-papers-general-science",
    },
    "ibps_po": {
        "Quantitative Aptitude": "https://testbook.com/ibps-po/previous-year-papers-quantitative-aptitude",
        "English Language": "https://testbook.com/ibps-po/previous-year-papers-english",
        "Reasoning Ability": "https://testbook.com/ibps-po/previous-year-papers-reasoning",
    },
    "rrb_group_d": {
        "Mathematics": "https://testbook.com/rrb-group-d/previous-year-papers-mathematics",
        "General Intelligence & Reasoning": "https://testbook.com/rrb-group-d/previous-year-papers-reasoning",
        "General Awareness": "https://testbook.com/rrb-group-d/previous-year-papers-general-awareness",
        "General Science": "https://testbook.com/rrb-group-d/previous-year-papers-general-science",
    },
}


class TestbookPYQParser(BasePYQParser):
    name = "testbook"
    base_url = "https://testbook.com"
    use_proxy = True

    def parse(self):
        questions = []
        for exam_type, subjects in TESTBOOK_URLS.items():
            for subject, url in subjects.items():
                try:
                    html = self.fetch(url)
                    if not html:
                        continue
                    soup = self.soup(html)
                    questions.extend(self._extract_questions(soup, exam_type, subject, url))
                except Exception as e:
                    logger.error("Testbook parse error for %s/%s: %s", exam_type, subject, e)
        return questions

    def _extract_questions(self, soup, exam_type, subject, source_url):
        results = []
        # Testbook uses structured question cards
        q_blocks = soup.select(
            ".question-card, .pyq-item, [class*='question-wrap'], .quiz-question"
        )

        for block in q_blocks:
            try:
                q_el = block.select_one(
                    ".question-text, .q-text, .question-content, h3, h4"
                )
                if not q_el:
                    continue
                q_text = self.clean_text(q_el.get_text())
                if len(q_text) < 10:
                    continue

                option_els = block.select(
                    ".option, .answer-option, .option-text, li"
                )
                options = [self.clean_text(o.get_text()) for o in option_els[:4]]
                if len(options) != 4:
                    continue

                correct = 0
                for i, o in enumerate(option_els[:4]):
                    classes = " ".join(o.get("class", []))
                    if "correct" in classes or "right" in classes:
                        correct = i
                        break

                year = 2024
                year_match = re.search(r"20[12]\d", block.get_text())
                if year_match:
                    year = int(year_match.group())

                expl_el = block.select_one(".solution, .explanation, .answer-desc")
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
                logger.debug("Testbook question parse error: %s", e)
                continue

        logger.info("Testbook: extracted %d questions for %s/%s", len(results), exam_type, subject)
        return results
