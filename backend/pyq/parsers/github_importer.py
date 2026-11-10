"""
GitHub Question Importer — fetches free MCQ datasets from open-source repos + APIs.

Sources:
1. Samkarya/online-exam-questions — Real JEE, CAT, RRB, NIMCET papers (JSON)
2. RajYOUTH/MCQ-Quiz-Data — TNPSC, SSC, RRB questions (JSON)
3. medmcqa/medmcqa — 194k medical MCQs (AIIMS/NEET PG)
4. Open Trivia Database — GK, Science, Math, History, Geography
5. Chemistry101 subject-wise questions
"""

import html
import json
import logging
import random
import re
import time

import requests

from .base import BasePYQParser

logger = logging.getLogger(__name__)

BASE = "https://raw.githubusercontent.com"

# ══════════════════════════════════════════════════════════════════
# VERIFIED GitHub sources with EXACT file paths
# ══════════════════════════════════════════════════════════════════

SAMKARYA_REPO = "Samkarya/online-exam-questions/main"

# Real Indian exam papers from Samkarya/online-exam-questions
SAMKARYA_FILES = [
    # JEE Mains
    ("India/undergraduate/JEEMains/jeeMain_2025_22Jan_shift1.json", "jee_main", 2025),
    ("India/undergraduate/JEEMains/jeeMain_2025_22Jan_shift2.json", "jee_main", 2025),
    ("India/undergraduate/JEEMains/jeeMain_2026_02April_shift1.json", "jee_main", 2026),
    ("India/undergraduate/JEEMains/jeeMain_2026_02April_shift2.json", "jee_main", 2026),
    ("India/undergraduate/JEEMains/jeeMain_2026_04April_shift1.json", "jee_main", 2026),
    # CAT
    ("India/management/CAT/cat_2021_slot1_completePaper.json", "cat", 2021),
    ("India/management/CAT/cat_2022_slot1_completePaper.json", "cat", 2022),
    ("India/management/CAT/cat_2023_slot1_completePaper.json", "cat", 2023),
    ("India/management/CAT/cat_2024_slot1_completePaper.json", "cat", 2024),
    ("India/management/CAT/cat_2024_slot1_quant.json", "cat", 2024),
    ("India/management/CAT/cat_2024_slot2_quant.json", "cat", 2024),
    ("India/management/CAT/cat_2024_slot3_quant.json", "cat", 2024),
    ("India/management/CAT/cat_2025_slot1_completePaper.json", "cat", 2025),
    ("India/management/CAT/cat_2025_slot2_completePaper.json", "cat", 2025),
    ("India/management/CAT/cat_2025_slot3_completePaper.json", "cat", 2025),
    # RRB
    ("India/government/RRB_NTPC/RRB-NTPC_2025_05June_shift1.json", "rrb_ntpc", 2025),
    ("India/government/RRB_Group_D/27Nov2025shift1paper.json", "rrb_group_d", 2025),
    ("India/government/RRB_Group_D/28Nov2025shift1paper.json", "rrb_group_d", 2025),
    # NIMCET files skipped: not GATE CSE papers and no nimcet exam type exists.
    # Chemistry
    ("global/subject/Chemistry101/chem101_Acids_Bases.json", "general_gk", 2024),
    ("global/subject/Chemistry101/chem101_Atomic_Theory.json", "general_gk", 2024),
    ("global/subject/Chemistry101/chem101_Bonding_Geometry.json", "general_gk", 2024),
    ("global/subject/Chemistry101/chem101_Bonding_Ionic_Covalent.json", "general_gk", 2024),
    ("global/subject/Chemistry101/chem101_Buffers_Titrations.json", "general_gk", 2024),
    ("global/subject/Chemistry101/chem101_Electronic_Structure.json", "general_gk", 2024),
    ("global/subject/Chemistry101/chem101_Equilibrium.json", "general_gk", 2024),
    ("global/subject/Chemistry101/chem101_Gas_Laws.json", "general_gk", 2024),
    ("global/subject/Chemistry101/chem101_Introduction.json", "general_gk", 2024),
    ("global/subject/Chemistry101/chem101_Kinetics.json", "general_gk", 2024),
    ("global/subject/Chemistry101/chem101_Lab_Chemistry.json", "general_gk", 2024),
    ("global/subject/Chemistry101/chem101_Periodic_Table.json", "general_gk", 2024),
    ("global/subject/Chemistry101/chem101_Redox_Electrochemistry.json", "general_gk", 2024),
    ("global/subject/Chemistry101/chem101_Stoichiometry.json", "general_gk", 2024),
    ("global/subject/Chemistry101/chem101_Thermochemistry.json", "general_gk", 2024),
    # IELTS (useful for SSC English)
    ("global/language/IELTS/ielts_grammar_0.json", "general_gk", 2024),
    ("global/language/IELTS/ielts_vocabulary_0.json", "general_gk", 2024),
    ("global/language/IELTS/ielts_reading_0.json", "general_gk", 2024),
]

# RajYOUTH MCQ Quiz Data — TNPSC/SSC/RRB questions
RAJYOUTH_REPO = "RajYOUTH/MCQ-Quiz-Data/main"
RAJYOUTH_FILES = [
    "test1.json", "test2.json", "test3.json", "test10.json",
    "gr1test1.json", "rt1gt.json", "rt2gsm.json", "rt3gt.json",
    "rt4gsm.json", "rt5gt.json", "rt6gsm.json",
    "youthguide-rt3gm.json", "youthguide-rt5gt.json",
]

# Open Trivia Database categories
OPENTDB_CATEGORIES = [
    (9, "general_gk", "General Knowledge"),
    (17, "general_gk", "General Science"),
    (18, "general_gk", "Computer Science"),
    (19, "general_gk", "Mathematics"),
    (22, "general_gk", "Geography"),
    (23, "general_gk", "History"),
    (24, "general_gk", "Political Science"),
    (25, "general_gk", "Art & Culture"),
    (26, "general_gk", "General Knowledge"),
    (30, "general_gk", "Computer Science"),
]


class GitHubQuestionImporter(BasePYQParser):
    name = "github_importer"

    def parse(self):
        all_questions = []

        # 1. Samkarya real exam papers
        qs = self._fetch_samkarya()
        all_questions.extend(qs)
        logger.info(f"Samkarya: {len(qs)} questions")

        # 2. RajYOUTH MCQ data
        qs = self._fetch_rajyouth()
        all_questions.extend(qs)
        logger.info(f"RajYOUTH: {len(qs)} questions")

        # 3. Open Trivia DB
        qs = self._fetch_opentdb()
        all_questions.extend(qs)
        logger.info(f"OpenTDB: {len(qs)} questions")

        logger.info(f"Total from GitHub/APIs: {len(all_questions)}")
        return all_questions

    # ── Samkarya/online-exam-questions ──

    def _fetch_samkarya(self):
        """Fetch real exam papers from Samkarya repo."""
        questions = []
        for filepath, exam, year in SAMKARYA_FILES:
            url = f"{BASE}/{SAMKARYA_REPO}/{filepath}"
            try:
                resp = requests.get(url, timeout=20)
                if resp.status_code != 200:
                    continue
                data = resp.json()
                qs = self._parse_samkarya_format(data, exam, year, url)
                questions.extend(qs)
                logger.info(f"  {filepath}: {len(qs)} questions")
                time.sleep(0.3)
            except Exception as e:
                logger.warning(f"  Failed {filepath}: {e}")
        return questions

    def _parse_samkarya_format(self, data, exam, year, url):
        """Parse Samkarya JSON format: list of {question_text, options:{a,b,c,d}, correct_answer}"""
        questions = []
        items = data if isinstance(data, list) else []

        for item in items:
            q_text = item.get("question_text", item.get("Question_EN", ""))
            if not q_text or len(q_text) < 10:
                continue

            # Handle options as dict {a, b, c, d} or list
            raw_opts = item.get("options", {})
            if isinstance(raw_opts, dict):
                options = [
                    str(raw_opts.get("a", "")),
                    str(raw_opts.get("b", "")),
                    str(raw_opts.get("c", "")),
                    str(raw_opts.get("d", "")),
                ]
            elif isinstance(raw_opts, list) and len(raw_opts) == 4:
                options = [str(o) for o in raw_opts]
            else:
                # Try RajYOUTH format
                options = [
                    item.get("Option_A_EN", item.get("option_a", "")),
                    item.get("Option_B_EN", item.get("option_b", "")),
                    item.get("Option_C_EN", item.get("option_c", "")),
                    item.get("Option_D_EN", item.get("option_d", "")),
                ]
                options = [str(o) for o in options]

            if not all(options) or len([o for o in options if o]) != 4:
                continue

            # Correct answer
            correct = item.get("correct_answer", item.get("Correct", "a"))
            if isinstance(correct, str):
                ans_map = {"a": 0, "b": 1, "c": 2, "d": 3, "A": 0, "B": 1, "C": 2, "D": 3}
                correct_idx = ans_map.get(correct.strip(), 0)
            elif isinstance(correct, int):
                correct_idx = correct
            else:
                correct_idx = 0

            subject = item.get("subject", item.get("Main_Subject", item.get("topic", "")))
            if not subject:
                subject = "General"

            difficulty = item.get("difficulty", item.get("Difficulty", "medium"))
            if isinstance(difficulty, str):
                difficulty = difficulty.lower()
            if difficulty not in ("easy", "medium", "hard"):
                difficulty = "medium"

            explanation = item.get("explanation", item.get("Explanation_EN", "")) or ""

            questions.append({
                "exam_type": exam,
                "year": year,
                "subject": subject,
                "question_text": q_text,
                "options": options,
                "correct_answer": correct_idx,
                "explanation": str(explanation)[:500],
                "difficulty": difficulty,
                "source_url": url,
            })

        return questions

    # ── RajYOUTH MCQ Data ──

    def _fetch_rajyouth(self):
        """Fetch TNPSC/SSC questions from RajYOUTH repo."""
        questions = []
        for filename in RAJYOUTH_FILES:
            url = f"{BASE}/{RAJYOUTH_REPO}/{filename}"
            try:
                resp = requests.get(url, timeout=20)
                if resp.status_code != 200:
                    continue
                data = resp.json()
                qs = self._parse_samkarya_format(data, "ssc_cgl", 2026, url)
                questions.extend(qs)
                logger.info(f"  RajYOUTH {filename}: {len(qs)} questions")
                time.sleep(0.3)
            except Exception as e:
                logger.warning(f"  Failed RajYOUTH {filename}: {e}")
        return questions

    # ── Open Trivia Database ──

    def _fetch_opentdb(self):
        """Fetch from Open Trivia Database API."""
        questions = []
        for cat_id, exam, subject in OPENTDB_CATEGORIES:
            url = f"https://opentdb.com/api.php?amount=50&category={cat_id}&type=multiple"
            try:
                resp = requests.get(url, timeout=15)
                if resp.status_code != 200:
                    continue
                data = resp.json()
                qs = self._parse_opentdb(data, exam, subject, url)
                questions.extend(qs)
                time.sleep(2)  # OpenTDB rate limit
            except Exception as e:
                logger.warning(f"  Failed OpenTDB cat {cat_id}: {e}")
        return questions

    def _parse_opentdb(self, data, exam, subject, url):
        """Parse Open Trivia Database API response."""
        questions = []
        for item in data.get("results", []):
            q_text = html.unescape(item.get("question", ""))
            q_text = re.sub(r'<[^>]+>', '', q_text).strip()
            correct = html.unescape(item.get("correct_answer", ""))
            incorrects = [html.unescape(a) for a in item.get("incorrect_answers", [])]

            if not q_text or not correct or len(incorrects) != 3:
                continue

            options = incorrects + [correct]
            random.shuffle(options)
            correct_idx = options.index(correct)

            questions.append({
                "exam_type": exam,
                "year": 2024,
                "subject": subject,
                "question_text": q_text,
                "options": options,
                "correct_answer": correct_idx,
                "explanation": f"Category: {item.get('category', '')}",
                "difficulty": item.get("difficulty", "medium"),
                "source_url": url,
            })
        return questions
