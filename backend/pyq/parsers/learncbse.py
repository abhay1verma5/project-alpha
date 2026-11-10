"""Parser for learncbse.in — CBSE 10/11/12 PYQs."""

import logging
import re

from .base import BasePYQParser

logger = logging.getLogger(__name__)

LEARNCBSE_URLS = {
    "cbse_12": {
        "Physics": "https://www.learncbse.in/previous-year-question-paper-physics-class-12/",
        "Chemistry": "https://www.learncbse.in/previous-year-question-paper-chemistry-class-12/",
        "Mathematics": "https://www.learncbse.in/previous-year-question-paper-maths-class-12/",
        "Biology": "https://www.learncbse.in/previous-year-question-paper-biology-class-12/",
        "English": "https://www.learncbse.in/previous-year-question-paper-english-class-12/",
    },
    "cbse_10": {
        "Mathematics": "https://www.learncbse.in/previous-year-question-paper-maths-class-10/",
        "Science": "https://www.learncbse.in/previous-year-question-paper-science-class-10/",
        "Social Science": "https://www.learncbse.in/previous-year-question-paper-social-science-class-10/",
        "English": "https://www.learncbse.in/previous-year-question-paper-english-class-10/",
    },
}


class LearnCBSEParser(BasePYQParser):
    name = "learncbse"
    base_url = "https://www.learncbse.in"
    use_proxy = True

    def parse(self):
        questions = []
        for exam_type, subjects in LEARNCBSE_URLS.items():
            for subject, url in subjects.items():
                try:
                    html = self.fetch(url)
                    if not html:
                        continue
                    soup = self.soup(html)
                    questions.extend(self._extract_questions(soup, exam_type, subject, url))
                except Exception as e:
                    logger.error("LearnCBSE parse error for %s/%s: %s", exam_type, subject, e)
        return questions

    def _extract_questions(self, soup, exam_type, subject, source_url):
        results = []
        # LearnCBSE typically has questions in ordered lists or numbered paragraphs
        content = soup.select_one(".entry-content, .post-content, article")
        if not content:
            return results

        # Find MCQ-style questions (look for option patterns like (a), (b), (c), (d))
        text = content.get_text()
        # Split by question number pattern
        q_pattern = re.compile(
            r"(?:Q\.?\s*\d+|Question\s+\d+|\d+\.\s+)(.+?)(?=(?:Q\.?\s*\d+|Question\s+\d+|\d+\.\s+)|$)",
            re.DOTALL,
        )
        option_pattern = re.compile(
            r"\(([a-d])\)\s*(.+?)(?=\([a-d]\)|Answer|$)", re.DOTALL | re.IGNORECASE
        )
        answer_pattern = re.compile(r"Answer[:\s]*\(?([a-dA-D])\)?", re.IGNORECASE)

        matches = q_pattern.findall(text)
        year_match = re.search(r"20[12]\d", source_url)
        year = int(year_match.group()) if year_match else 2024

        for q_block in matches:
            opts = option_pattern.findall(q_block)
            if len(opts) < 4:
                continue

            # Question text = everything before first option
            first_opt_pos = q_block.find(f"({opts[0][0]})")
            q_text = self.clean_text(q_block[:first_opt_pos]) if first_opt_pos > 0 else ""
            if len(q_text) < 10:
                continue

            options = [self.clean_text(o[1]) for o in opts[:4]]
            correct = 0
            ans_match = answer_pattern.search(q_block)
            if ans_match:
                ans_letter = ans_match.group(1).lower()
                correct = ord(ans_letter) - ord("a")

            results.append({
                "exam_type": exam_type,
                "year": year,
                "subject": subject,
                "question_text": q_text,
                "options": options,
                "correct_answer": min(correct, 3),
                "explanation": "",
                "difficulty": "medium",
                "source_url": source_url,
            })

        logger.info("LearnCBSE: extracted %d questions for %s/%s", len(results), exam_type, subject)
        return results
