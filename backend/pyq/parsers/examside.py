"""
Parser for examside.com — huge free PYQ repository.
Covers: SSC, UPSC, Railway, Banking, GATE, JEE, NEET, State PSC, CBSE, etc.
Site serves static HTML with well-structured question blocks.
"""

import logging
import re

from .base import BasePYQParser

logger = logging.getLogger(__name__)

# examside.com URL patterns: /questions/exam-name/subject/page
EXAM_URLS = {
    "ssc_cgl": [
        ("General Awareness", "https://www.examside.com/q/ssc-cgl/general-awareness"),
        ("Quantitative Aptitude", "https://www.examside.com/q/ssc-cgl/quantitative-aptitude"),
        ("English", "https://www.examside.com/q/ssc-cgl/english-language"),
        ("Reasoning", "https://www.examside.com/q/ssc-cgl/general-intelligence-reasoning"),
    ],
    "ssc_chsl": [
        ("General Awareness", "https://www.examside.com/q/ssc-chsl/general-awareness"),
        ("Quantitative Aptitude", "https://www.examside.com/q/ssc-chsl/quantitative-aptitude"),
        ("English", "https://www.examside.com/q/ssc-chsl/english-language"),
        ("Reasoning", "https://www.examside.com/q/ssc-chsl/general-intelligence-reasoning"),
    ],
    "upsc_prelims": [
        ("General Studies", "https://www.examside.com/q/upsc-ias-prelims/general-studies-paper-1"),
        ("CSAT", "https://www.examside.com/q/upsc-ias-prelims/csat-paper-2"),
    ],
    "gate_cse": [
        ("Computer Science", "https://www.examside.com/q/gate-cse/computer-science-and-information-technology"),
    ],
    "gate_ece": [
        ("Electronics", "https://www.examside.com/q/gate-ece/electronics-and-communications"),
    ],
    "gate_me": [
        ("Mechanical", "https://www.examside.com/q/gate-me/mechanical-engineering"),
    ],
    "gate_ee": [
        ("Electrical", "https://www.examside.com/q/gate-ee/electrical-engineering"),
    ],
    "gate_ce": [
        ("Civil", "https://www.examside.com/q/gate-ce/civil-engineering"),
    ],
    "jee_main": [
        ("Physics", "https://www.examside.com/q/jee-main/physics"),
        ("Chemistry", "https://www.examside.com/q/jee-main/chemistry"),
        ("Mathematics", "https://www.examside.com/q/jee-main/mathematics"),
    ],
    "jee_advanced": [
        ("Physics", "https://www.examside.com/q/jee-advanced/physics"),
        ("Chemistry", "https://www.examside.com/q/jee-advanced/chemistry"),
        ("Mathematics", "https://www.examside.com/q/jee-advanced/mathematics"),
    ],
    "neet": [
        ("Physics", "https://www.examside.com/q/neet/physics"),
        ("Chemistry", "https://www.examside.com/q/neet/chemistry"),
        ("Biology", "https://www.examside.com/q/neet/biology"),
    ],
    "rrb_ntpc": [
        ("General Awareness", "https://www.examside.com/q/rrb-ntpc/general-awareness"),
        ("Mathematics", "https://www.examside.com/q/rrb-ntpc/mathematics"),
        ("Reasoning", "https://www.examside.com/q/rrb-ntpc/general-intelligence-reasoning"),
    ],
}


class ExamsidePYQParser(BasePYQParser):
    name = "examside"
    base_url = "https://www.examside.com"
    request_delay = 3

    def parse(self):
        questions = []
        for exam_type, subjects in EXAM_URLS.items():
            for subject, base_url in subjects:
                try:
                    # Crawl first 3 pages
                    for page in range(1, 4):
                        url = f"{base_url}?page={page}" if page > 1 else base_url
                        html = self.fetch(url)
                        if not html:
                            break
                        soup = self.soup(html)
                        page_qs = self._extract(soup, exam_type, subject, url)
                        if not page_qs:
                            break
                        questions.extend(page_qs)
                        logger.info("examside: %s/%s page %d → %d qs", exam_type, subject, page, len(page_qs))
                except Exception as e:
                    logger.error("examside error %s/%s: %s", exam_type, subject, e)
        return questions

    def _extract(self, soup, exam_type, subject, source_url):
        results = []
        # examside uses div.question-box or article blocks
        blocks = soup.select(".question-box, .question-card, .question-item, article.question")
        if not blocks:
            # fallback: try finding numbered question patterns
            blocks = soup.select("[class*='question'], [class*='ques']")

        for block in blocks:
            try:
                # Question text
                q_el = block.select_one(".question-text, .q-text, .question-content, h3, h4, p.question")
                if not q_el:
                    # Try first <p> tag
                    q_el = block.select_one("p")
                if not q_el:
                    continue
                q_text = self.clean_text(q_el.get_text())
                if len(q_text) < 15:
                    continue

                # Options
                opt_els = block.select(".option, .options li, .option-item, .choice, ol li, ul.options li")
                options = [self.clean_text(o.get_text()) for o in opt_els[:4]]
                if len(options) != 4:
                    # Try regex extraction from block text
                    options = self._extract_options_regex(block.get_text())
                if len(options) != 4:
                    continue

                # Correct answer
                correct = 0
                for i, o in enumerate(opt_els[:4]):
                    classes = " ".join(o.get("class", []))
                    if "correct" in classes or "right" in classes or "active" in classes:
                        correct = i
                        break
                # Also check for answer text
                ans_el = block.select_one(".answer, .correct-answer, .solution .ans")
                if ans_el:
                    ans_text = ans_el.get_text().strip().upper()
                    for i, letter in enumerate(["A", "B", "C", "D"]):
                        if letter in ans_text[:3]:
                            correct = i
                            break

                # Year
                year = 2024
                year_match = re.search(r"20[012]\d", block.get_text())
                if year_match:
                    y = int(year_match.group())
                    if 2000 <= y <= 2027:
                        year = y

                # Explanation
                expl_el = block.select_one(".solution, .explanation, .answer-detail")
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
            except Exception:
                continue
        return results

    @staticmethod
    def _extract_options_regex(text):
        """Extract options using (a)/(b)/(c)/(d) or A./B./C./D. patterns."""
        patterns = [
            r'\(a\)\s*(.+?)\s*\(b\)\s*(.+?)\s*\(c\)\s*(.+?)\s*\(d\)\s*(.+?)(?:\n|$)',
            r'A\.\s*(.+?)\s*B\.\s*(.+?)\s*C\.\s*(.+?)\s*D\.\s*(.+?)(?:\n|$)',
            r'\(1\)\s*(.+?)\s*\(2\)\s*(.+?)\s*\(3\)\s*(.+?)\s*\(4\)\s*(.+?)(?:\n|$)',
        ]
        for pat in patterns:
            m = re.search(pat, text, re.IGNORECASE | re.DOTALL)
            if m:
                return [m.group(i).strip() for i in range(1, 5)]
        return []
