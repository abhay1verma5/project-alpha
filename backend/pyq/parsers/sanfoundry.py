"""
Parser for sanfoundry.com — huge MCQ bank for GATE, Engineering, Science.
Covers: GATE (all branches), Engineering subjects, Science.
Well-structured HTML with clear question/answer format.
"""

import logging
import re

from .base import BasePYQParser

logger = logging.getLogger(__name__)

SECTIONS = {
    "gate_cse": [
        ("Data Structures", "https://www.sanfoundry.com/data-structure-questions-answers/"),
        ("Algorithms", "https://www.sanfoundry.com/algorithms-problems-solutions/"),
        ("Operating Systems", "https://www.sanfoundry.com/operating-system-questions-answers/"),
        ("Database Management", "https://www.sanfoundry.com/database-management-system-questions-answers/"),
        ("Computer Networks", "https://www.sanfoundry.com/computer-network-questions-answers/"),
        ("Compiler Design", "https://www.sanfoundry.com/compiler-design-questions-answers/"),
        ("Theory of Computation", "https://www.sanfoundry.com/automata-theory-questions-answers/"),
        ("Digital Logic", "https://www.sanfoundry.com/digital-circuits-questions-answers/"),
        ("Computer Architecture", "https://www.sanfoundry.com/computer-architecture-questions-answers/"),
    ],
    "gate_ece": [
        ("Analog Circuits", "https://www.sanfoundry.com/analog-circuits-questions-answers/"),
        ("Digital Electronics", "https://www.sanfoundry.com/digital-electronics-questions-answers/"),
        ("Signals and Systems", "https://www.sanfoundry.com/signals-systems-questions-answers/"),
        ("Control Systems", "https://www.sanfoundry.com/control-systems-questions-answers/"),
        ("Communication Systems", "https://www.sanfoundry.com/communication-engineering-questions-answers/"),
        ("Electromagnetic Theory", "https://www.sanfoundry.com/electromagnetic-theory-questions-answers/"),
    ],
    "gate_me": [
        ("Thermodynamics", "https://www.sanfoundry.com/thermodynamics-questions-answers/"),
        ("Fluid Mechanics", "https://www.sanfoundry.com/fluid-mechanics-questions-answers/"),
        ("Strength of Materials", "https://www.sanfoundry.com/strength-of-materials-questions-answers/"),
        ("Manufacturing", "https://www.sanfoundry.com/manufacturing-processes-questions-answers/"),
        ("Heat Transfer", "https://www.sanfoundry.com/heat-transfer-questions-answers/"),
        ("Machine Design", "https://www.sanfoundry.com/machine-design-questions-answers/"),
    ],
    "gate_ee": [
        ("Power Systems", "https://www.sanfoundry.com/power-systems-questions-answers/"),
        ("Electrical Machines", "https://www.sanfoundry.com/electrical-machines-questions-answers/"),
        ("Control Systems", "https://www.sanfoundry.com/control-systems-questions-answers/"),
        ("Power Electronics", "https://www.sanfoundry.com/power-electronics-questions-answers/"),
    ],
    "gate_ce": [
        ("Structural Analysis", "https://www.sanfoundry.com/structural-analysis-questions-answers/"),
        ("Geotechnical Engineering", "https://www.sanfoundry.com/geotechnical-engineering-questions-answers/"),
        ("Fluid Mechanics", "https://www.sanfoundry.com/fluid-mechanics-questions-answers/"),
        ("Environmental Engineering", "https://www.sanfoundry.com/environmental-engineering-questions-answers/"),
    ],
    "neet": [
        ("Physics", "https://www.sanfoundry.com/physics-questions-answers/"),
        ("Chemistry", "https://www.sanfoundry.com/chemistry-questions-answers/"),
        ("Biology", "https://www.sanfoundry.com/biology-questions-answers/"),
    ],
    "cbse_12": [
        ("Physics", "https://www.sanfoundry.com/physics-questions-answers/"),
        ("Chemistry", "https://www.sanfoundry.com/chemistry-questions-answers/"),
        ("Mathematics", "https://www.sanfoundry.com/engineering-mathematics-questions-answers/"),
        ("Biology", "https://www.sanfoundry.com/biology-questions-answers/"),
    ],
}


class SanfoundryParser(BasePYQParser):
    name = "sanfoundry"
    base_url = "https://www.sanfoundry.com"
    request_delay = 3

    def parse(self):
        questions = []
        for exam_type, section_list in SECTIONS.items():
            for subject, index_url in section_list:
                try:
                    # Fetch index page to get sub-topic links
                    html = self.fetch(index_url)
                    if not html:
                        continue
                    soup = self.soup(html)

                    # Get links to actual question pages
                    links = self._get_topic_links(soup, index_url)
                    # Limit to first 5 topic pages to be respectful
                    for link in links[:5]:
                        try:
                            page_html = self.fetch(link)
                            if not page_html:
                                continue
                            page_soup = self.soup(page_html)
                            qs = self._extract(page_soup, exam_type, subject, link)
                            questions.extend(qs)
                            logger.info("sanfoundry: %s/%s → %d qs", exam_type, subject, len(qs))
                        except Exception as e:
                            logger.debug("sanfoundry page error: %s", e)
                except Exception as e:
                    logger.error("sanfoundry error %s/%s: %s", exam_type, subject, e)
        return questions

    def _get_topic_links(self, soup, base_url):
        """Extract links to individual question pages from index."""
        links = []
        for a in soup.select("article a, .entry-content a, .sf-section a"):
            href = a.get("href", "")
            if href and "questions-answers" in href and href.startswith("http"):
                if href != base_url and href not in links:
                    links.append(href)
        return links

    def _extract(self, soup, exam_type, subject, source_url):
        results = []
        content = soup.select_one(".entry-content, article, .post-content")
        if not content:
            return results

        text = content.get_text()

        # Sanfoundry format: numbered questions with a-d options
        # Pattern: 1. Question text\na) option1\nb) option2\nc) option3\nd) option4
        q_pattern = re.compile(
            r'(\d+)\.\s+(.+?)\n\s*a\)\s*(.+?)\n\s*b\)\s*(.+?)\n\s*c\)\s*(.+?)\n\s*d\)\s*(.+?)(?=\n\d+\.|Answer:|$)',
            re.DOTALL
        )

        # Also try: View Answer pattern
        answer_pattern = re.compile(r'Answer:\s*([abcd])', re.IGNORECASE)

        # Split by question blocks
        blocks = re.split(r'(?=\d+\.\s)', text)
        for block in blocks:
            try:
                # Extract question
                q_match = re.match(r'\d+\.\s+(.+?)(?=\n\s*a\))', block, re.DOTALL)
                if not q_match:
                    continue
                q_text = self.clean_text(q_match.group(1))
                if len(q_text) < 15:
                    continue

                # Extract options
                opt_matches = re.findall(r'[abcd]\)\s*(.+?)(?=\n\s*[abcd]\)|\nAnswer:|\nView Answer|$)', block, re.DOTALL)
                options = [self.clean_text(o) for o in opt_matches[:4]]
                if len(options) != 4:
                    continue

                # Extract answer
                correct = 0
                ans_match = answer_pattern.search(block)
                if ans_match:
                    ans_letter = ans_match.group(1).lower()
                    correct = {"a": 0, "b": 1, "c": 2, "d": 3}.get(ans_letter, 0)

                # Explanation (text after Answer:)
                explanation = ""
                expl_match = re.search(r'Explanation:\s*(.+?)(?=\d+\.|$)', block, re.DOTALL)
                if expl_match:
                    explanation = self.clean_text(expl_match.group(1))

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
