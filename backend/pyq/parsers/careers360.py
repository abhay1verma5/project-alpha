"""Parser for careers360.com — JEE, NEET, GATE PYQs."""

import logging
import re

from .base import BasePYQParser

logger = logging.getLogger(__name__)

CAREERS360_URLS = {
    "jee_main": {
        "Physics": "https://engineering.careers360.com/articles/jee-main-previous-year-question-papers-physics",
        "Chemistry": "https://engineering.careers360.com/articles/jee-main-previous-year-question-papers-chemistry",
        "Mathematics": "https://engineering.careers360.com/articles/jee-main-previous-year-question-papers-mathematics",
    },
    "neet": {
        "Physics": "https://medicine.careers360.com/articles/neet-previous-year-question-papers-physics",
        "Chemistry": "https://medicine.careers360.com/articles/neet-previous-year-question-papers-chemistry",
        "Biology (Botany)": "https://medicine.careers360.com/articles/neet-previous-year-question-papers-biology",
    },
    "gate_cse": {
        "Computer Science": "https://engineering.careers360.com/articles/gate-cse-previous-year-question-papers",
    },
    "gate_ece": {
        "Electronics": "https://engineering.careers360.com/articles/gate-ece-previous-year-question-papers",
    },
    "gate_me": {
        "Mechanical": "https://engineering.careers360.com/articles/gate-me-previous-year-question-papers",
    },
}


class Careers360Parser(BasePYQParser):
    name = "careers360"
    base_url = "https://www.careers360.com"
    use_proxy = True

    def parse(self):
        questions = []
        for exam_type, subjects in CAREERS360_URLS.items():
            for subject, url in subjects.items():
                try:
                    html = self.fetch(url)
                    if not html:
                        continue
                    soup = self.soup(html)
                    questions.extend(self._extract_questions(soup, exam_type, subject, url))
                except Exception as e:
                    logger.error("Careers360 parse error for %s/%s: %s", exam_type, subject, e)
        return questions

    def _extract_questions(self, soup, exam_type, subject, source_url):
        results = []
        content = soup.select_one(".article-content, .entry-content, .content-area, article")
        if not content:
            return results

        text = content.get_text()
        # Pattern: Q1. question text followed by options
        q_pattern = re.compile(
            r"(?:Q\.?\s*(\d+)|(\d+)\.\s)(.+?)(?=(?:Q\.?\s*\d+|\d+\.\s)|$)",
            re.DOTALL,
        )
        option_pattern = re.compile(
            r"(?:\(([a-d])\)|([A-D])[\.\)])\s*(.+?)(?=(?:\([a-d]\)|[A-D][\.\)])|Answer|Ans|$)",
            re.DOTALL | re.IGNORECASE,
        )
        answer_pattern = re.compile(r"(?:Answer|Ans)[:\s]*\(?([a-dA-D1-4])\)?", re.IGNORECASE)

        for match in q_pattern.finditer(text):
            q_block = match.group(3)
            opts = option_pattern.findall(q_block)
            if len(opts) < 4:
                continue

            first_opt = opts[0]
            opt_letter = first_opt[0] or first_opt[1]
            first_pos = q_block.find(f"({opt_letter})") if first_opt[0] else q_block.find(f"{opt_letter}.")
            q_text = self.clean_text(q_block[:first_pos]) if first_pos > 0 else ""
            if len(q_text) < 10:
                continue

            options = [self.clean_text(o[2]) for o in opts[:4]]
            correct = 0
            ans_match = answer_pattern.search(q_block)
            if ans_match:
                ans = ans_match.group(1).lower()
                if ans.isdigit():
                    correct = int(ans) - 1
                else:
                    correct = ord(ans) - ord("a")

            year = 2024
            year_match = re.search(r"20[12]\d", q_block)
            if year_match:
                year = int(year_match.group())

            results.append({
                "exam_type": exam_type,
                "year": year,
                "subject": subject,
                "question_text": q_text,
                "options": options,
                "correct_answer": min(max(correct, 0), 3),
                "explanation": "",
                "difficulty": "medium",
                "source_url": source_url,
            })

        logger.info("Careers360: extracted %d questions for %s/%s", len(results), exam_type, subject)
        return results
