"""
Parser for indiabix.com — large MCQ question bank.
Covers: Aptitude, Reasoning, English, GK — useful for SSC, Banking, Railway, UPSC.
Site has clean HTML structure with questions and answers.
"""

import logging
import re

from .base import BasePYQParser

logger = logging.getLogger(__name__)

# IndiaBix sections mapped to exam types
SECTIONS = {
    "ssc_cgl": [
        ("Quantitative Aptitude", "https://www.indiabix.com/aptitude/numbers/"),
        ("Quantitative Aptitude", "https://www.indiabix.com/aptitude/percentage/"),
        ("Quantitative Aptitude", "https://www.indiabix.com/aptitude/profit-and-loss/"),
        ("Quantitative Aptitude", "https://www.indiabix.com/aptitude/ratio-and-proportion/"),
        ("Quantitative Aptitude", "https://www.indiabix.com/aptitude/time-and-work/"),
        ("Quantitative Aptitude", "https://www.indiabix.com/aptitude/time-and-distance/"),
        ("Quantitative Aptitude", "https://www.indiabix.com/aptitude/simple-interest/"),
        ("Quantitative Aptitude", "https://www.indiabix.com/aptitude/compound-interest/"),
        ("Reasoning", "https://www.indiabix.com/verbal-reasoning/analogy/"),
        ("Reasoning", "https://www.indiabix.com/verbal-reasoning/classification/"),
        ("Reasoning", "https://www.indiabix.com/logical-reasoning/analogies/"),
        ("Reasoning", "https://www.indiabix.com/logical-reasoning/cause-and-effect/"),
        ("English", "https://www.indiabix.com/verbal-ability/spotting-errors/"),
        ("English", "https://www.indiabix.com/verbal-ability/sentence-correction/"),
        ("English", "https://www.indiabix.com/verbal-ability/idioms-and-phrases/"),
        ("General Awareness", "https://www.indiabix.com/general-knowledge/indian-history/"),
        ("General Awareness", "https://www.indiabix.com/general-knowledge/indian-politics/"),
        ("General Awareness", "https://www.indiabix.com/general-knowledge/indian-economy/"),
        ("General Awareness", "https://www.indiabix.com/general-knowledge/general-science/"),
    ],
    "ibps_po": [
        ("Quantitative Aptitude", "https://www.indiabix.com/aptitude/problems-on-ages/"),
        ("Quantitative Aptitude", "https://www.indiabix.com/aptitude/averages/"),
        ("Quantitative Aptitude", "https://www.indiabix.com/aptitude/probability/"),
        ("Quantitative Aptitude", "https://www.indiabix.com/aptitude/permutation-and-combination/"),
        ("Reasoning", "https://www.indiabix.com/verbal-reasoning/blood-relation-test/"),
        ("Reasoning", "https://www.indiabix.com/verbal-reasoning/direction-sense-test/"),
        ("Reasoning", "https://www.indiabix.com/verbal-reasoning/seating-arrangement/"),
        ("English", "https://www.indiabix.com/verbal-ability/comprehension/"),
        ("English", "https://www.indiabix.com/verbal-ability/synonyms/"),
        ("English", "https://www.indiabix.com/verbal-ability/antonyms/"),
    ],
    "rrb_ntpc": [
        ("Mathematics", "https://www.indiabix.com/aptitude/area/"),
        ("Mathematics", "https://www.indiabix.com/aptitude/volume-and-surface-area/"),
        ("Mathematics", "https://www.indiabix.com/aptitude/boats-and-streams/"),
        ("Reasoning", "https://www.indiabix.com/verbal-reasoning/number-series/"),
        ("Reasoning", "https://www.indiabix.com/verbal-reasoning/coding-decoding/"),
        ("General Awareness", "https://www.indiabix.com/general-knowledge/world-geography/"),
        ("General Awareness", "https://www.indiabix.com/general-knowledge/physics/"),
        ("General Awareness", "https://www.indiabix.com/general-knowledge/chemistry/"),
        ("General Awareness", "https://www.indiabix.com/general-knowledge/biology/"),
    ],
}


class IndiaBixParser(BasePYQParser):
    name = "indiabix"
    base_url = "https://www.indiabix.com"
    request_delay = 3

    def parse(self):
        questions = []
        for exam_type, section_list in SECTIONS.items():
            for subject, url in section_list:
                try:
                    html = self.fetch(url)
                    if not html:
                        continue
                    soup = self.soup(html)
                    qs = self._extract(soup, exam_type, subject, url)
                    questions.extend(qs)
                    logger.info("indiabix: %s/%s → %d qs from %s", exam_type, subject, len(qs), url)
                except Exception as e:
                    logger.error("indiabix error %s: %s", url, e)
        return questions

    def _extract(self, soup, exam_type, subject, source_url):
        results = []
        # IndiaBix uses .bix-div-container for each question
        blocks = soup.select(".bix-div-container")
        if not blocks:
            # Fallback selectors
            blocks = soup.select("[class*='question'], .mx-question, .ques-section")

        for block in blocks:
            try:
                # Question text
                q_el = block.select_one(".bix-td-qtxt, .question-text, td.bix-td-qno + td")
                if not q_el:
                    continue
                q_text = self.clean_text(q_el.get_text())
                if len(q_text) < 10:
                    continue

                # Options
                opt_els = block.select(".bix-td-option-val, .option-val, .bix-tbl-options td:nth-child(2)")
                options = [self.clean_text(o.get_text()) for o in opt_els[:4]]
                if len(options) != 4:
                    continue

                # Correct answer from answer section
                correct = 0
                ans_el = block.select_one(".bix-ans-option, .correct-ans, .answer")
                if ans_el:
                    ans = ans_el.get_text().strip().upper()
                    for i, letter in enumerate(["A", "B", "C", "D"]):
                        if letter in ans[:5]:
                            correct = i
                            break

                # Explanation
                expl_el = block.select_one(".bix-ans-description, .explanation, .solution")
                explanation = self.clean_text(expl_el.get_text()) if expl_el else ""

                results.append({
                    "exam_type": exam_type,
                    "year": 2024,  # IndiaBix doesn't always have year info
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
