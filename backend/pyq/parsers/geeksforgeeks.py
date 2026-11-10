"""
Parser for geeksforgeeks.org — GATE PYQ year-wise.
GFG has year-wise GATE previous year papers with structured MCQs.
"""

import logging
import re

from .base import BasePYQParser

logger = logging.getLogger(__name__)

# GFG GATE PYQ URLs are year-wise
GATE_PYQ_URLS = {
    "gate_cse": [
        (2024, "https://www.geeksforgeeks.org/gate-cs-2024-question-paper-with-answer-key/"),
        (2023, "https://www.geeksforgeeks.org/gate-cs-2023-question-paper-with-answer-key/"),
        (2022, "https://www.geeksforgeeks.org/gate-cs-2022-question-paper-with-answer-key/"),
        (2021, "https://www.geeksforgeeks.org/gate-cs-2021-set-1/"),
        (2020, "https://www.geeksforgeeks.org/gate-cs-2020-question-paper/"),
        (2019, "https://www.geeksforgeeks.org/gate-cs-2019-question-paper/"),
        (2018, "https://www.geeksforgeeks.org/gate-cs-2018-question-paper/"),
        (2017, "https://www.geeksforgeeks.org/gate-gate-cs-2017-set-1/"),
        (2016, "https://www.geeksforgeeks.org/gate-gate-cs-2016-set-1/"),
        (2015, "https://www.geeksforgeeks.org/gate-gate-cs-2015-set-1/"),
    ],
}

# GFG also has subject-wise MCQs
SUBJECT_MCQS = {
    "gate_cse": [
        ("Data Structures", "https://www.geeksforgeeks.org/data-structure-gq/"),
        ("Algorithms", "https://www.geeksforgeeks.org/algorithms-gq/"),
        ("Operating Systems", "https://www.geeksforgeeks.org/operating-systems-gq/"),
        ("DBMS", "https://www.geeksforgeeks.org/dbms-gq/"),
        ("Computer Networks", "https://www.geeksforgeeks.org/computer-networks-gq/"),
        ("Computer Organization", "https://www.geeksforgeeks.org/computer-organization-and-architecture-gq/"),
        ("Theory of Computation", "https://www.geeksforgeeks.org/theory-of-computation-automata-tutorials-gq/"),
        ("Compiler Design", "https://www.geeksforgeeks.org/compiler-design-gq/"),
        ("Digital Logic", "https://www.geeksforgeeks.org/digital-electronics-logic-design-gq/"),
        ("Engineering Mathematics", "https://www.geeksforgeeks.org/engineering-mathematics-gq/"),
    ],
    "jee_main": [
        ("Physics", "https://www.geeksforgeeks.org/physics-gq/"),
        ("Chemistry", "https://www.geeksforgeeks.org/chemistry-gq/"),
        ("Mathematics", "https://www.geeksforgeeks.org/maths-gq/"),
    ],
}


class GeeksForGeeksParser(BasePYQParser):
    name = "geeksforgeeks"
    base_url = "https://www.geeksforgeeks.org"
    request_delay = 3

    def parse(self):
        questions = []

        # Year-wise GATE PYQs
        for exam_type, year_urls in GATE_PYQ_URLS.items():
            for year, url in year_urls:
                try:
                    html = self.fetch(url)
                    if not html:
                        continue
                    soup = self.soup(html)
                    qs = self._extract_pyq(soup, exam_type, "Computer Science", year, url)
                    questions.extend(qs)
                    logger.info("gfg: %s/%d → %d qs", exam_type, year, len(qs))
                except Exception as e:
                    logger.error("gfg error %s/%d: %s", exam_type, year, e)

        # Subject-wise MCQs
        for exam_type, subjects in SUBJECT_MCQS.items():
            for subject, url in subjects:
                try:
                    html = self.fetch(url)
                    if not html:
                        continue
                    soup = self.soup(html)

                    # Get first 3 quiz links from index page
                    quiz_links = self._get_quiz_links(soup)
                    for link in quiz_links[:3]:
                        try:
                            qhtml = self.fetch(link)
                            if not qhtml:
                                continue
                            qsoup = self.soup(qhtml)
                            qs = self._extract_quiz(qsoup, exam_type, subject, link)
                            questions.extend(qs)
                        except Exception:
                            continue
                except Exception as e:
                    logger.error("gfg quiz error %s/%s: %s", exam_type, subject, e)

        return questions

    def _get_quiz_links(self, soup):
        links = []
        for a in soup.select("article a, .entry-content a, .content a"):
            href = a.get("href", "")
            if href and ("quiz" in href or "gq" in href or "question" in href):
                if href.startswith("http") and href not in links:
                    links.append(href)
        return links

    def _extract_pyq(self, soup, exam_type, subject, year, source_url):
        """Extract questions from GFG PYQ page."""
        results = []
        content = soup.select_one("article .text, .entry-content, article")
        if not content:
            return results

        text = content.get_text()
        # GFG PYQ format: Question N:, followed by options (A) (B) (C) (D)
        blocks = re.split(r'Question\s+\d+', text)

        for block in blocks[1:]:  # skip first empty split
            try:
                # Split question from options
                parts = re.split(r'\(A\)', block, 1)
                if len(parts) < 2:
                    continue

                q_text = self.clean_text(parts[0].strip(":. \n"))
                if len(q_text) < 15:
                    continue

                # Extract A/B/C/D options
                opt_text = "(A)" + parts[1]
                opt_matches = re.findall(
                    r'\(([ABCD])\)\s*(.+?)(?=\([ABCD]\)|Answer|Solution|Explanation|$)',
                    opt_text, re.DOTALL
                )
                options = [self.clean_text(m[1]) for m in opt_matches[:4]]
                if len(options) != 4:
                    continue

                # Answer
                correct = 0
                ans_match = re.search(r'Answer[:\s]*\(([ABCD])\)', block)
                if ans_match:
                    correct = {"A": 0, "B": 1, "C": 2, "D": 3}.get(ans_match.group(1), 0)

                # Explanation
                explanation = ""
                expl_match = re.search(r'(?:Explanation|Solution)[:\s]*(.+?)(?=Question|\Z)', block, re.DOTALL)
                if expl_match:
                    explanation = self.clean_text(expl_match.group(1))[:500]

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
            except Exception:
                continue
        return results

    def _extract_quiz(self, soup, exam_type, subject, source_url):
        """Extract questions from GFG quiz pages."""
        results = []
        # GFG quiz containers
        blocks = soup.select(".quiz-question, .question-container, .practice-question")

        for block in blocks:
            try:
                q_el = block.select_one(".question-text, h3, .quiz-question-text")
                if not q_el:
                    continue
                q_text = self.clean_text(q_el.get_text())
                if len(q_text) < 15:
                    continue

                opt_els = block.select(".option, .answer-option, li, .quiz-option")
                options = [self.clean_text(o.get_text()) for o in opt_els[:4]]
                if len(options) != 4:
                    continue

                correct = 0
                for i, o in enumerate(opt_els[:4]):
                    cls = " ".join(o.get("class", []))
                    if "correct" in cls or "right" in cls:
                        correct = i
                        break

                expl_el = block.select_one(".explanation, .solution, .answer-explanation")
                explanation = self.clean_text(expl_el.get_text()) if expl_el else ""

                results.append({
                    "exam_type": exam_type,
                    "year": 2024,
                    "subject": subject,
                    "question_text": q_text,
                    "options": options,
                    "correct_answer": correct,
                    "explanation": explanation,
                    "difficulty": "medium",
                    "source_url": source_url,
                })
            except Exception:
                continue
        return results
