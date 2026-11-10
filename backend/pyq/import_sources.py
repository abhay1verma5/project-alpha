"""Open sources of real previous-year questions, consumed by `import_pyq_json`.

Each entry:
    name              unique id used with --source
    url               raw file URL (GitHub raw, Hugging Face resolve/..., etc.)
    format            json | jsonl | csv            (default json)
    adapter           secretedoc | jeeneetards       (special layouts)
    exam_type         pyq.models.ExamType value
    year              default year when the file has none
    year_regex_field  pull the year out of this field (e.g. file_name)
    subject           default subject when the file has none
    answer_one_based  True when numeric answers count from 1 (checked by hand
                      against known answers before adding — see notes)
    official_key      True only when answers come from the exam body's own key
    license           recorded for the audit trail

Verified 2026-10-19 (docs/pyq-sources.md). Answer indexing was checked on
known questions for every numeric-answer source:
  - dipikakhullar/neet and sharad461/SSC-CGL: 0-based (ratio question 2:4:9 ->
    option index 1 "Rakesh=60, Ramesh=135").
  - srajwal1/ctet and sunitha98/ctet-hindi: 1-based ("dysgraphia" -> option 3).
Rejected: roshansk23 NEET_2021 (no English rows, index base unverifiable),
169Pi/exambench and similar (synthetic), Abhay557/indian-exams-rawdata (disabled).
Samkarya/online-exam-questions is already imported by the crawler; its licence
is non-commercial, so it must be removed before any ads or paid plans.
"""

SOURCES: list[dict] = [
    # ── UPSC Prelims GS-I, 2011–2025, parsed from official UPSC PDFs ──
    {
        "name": "upsc_sbandawala",
        "url": "https://raw.githubusercontent.com/S-bandawala/upsc-quiz-app/main/data/beta_questions.json",
        "exam_type": "upsc_prelims",
        "subject": "General Studies",
        "option_columns": ["option_a", "option_b", "option_c", "option_d"],
        "answer_keys": ["correct_option"],
        "license": "unspecified; parsed from official UPSC PDFs",
    },
    *[
        {
            "name": f"upsc_secretedoc_{year}",
            "url": f"https://raw.githubusercontent.com/secretedoc/upsc-prelims-gs1-2011-2025/main/UPSC_Papers/Categorywise/GS1_{year}.json",
            "adapter": "secretedoc",
            "exam_type": "upsc_prelims",
            "year": year,
            "license": "unspecified; official UPSC papers with community explanations",
        }
        for year in range(2017, 2026)
    ],
    # ── JEE Main / JEE Advanced / NEET 2000–2024 (210 papers, ExamGoal export) ──
    {
        "name": "jee_neet_jeeneetards",
        "url": "https://raw.githubusercontent.com/skndash96/jeeneetards/main/src/lib/exams.json",
        "adapter": "jeeneetards",
        "exam_type": "jee_main",  # overridden per paper by the adapter
        "license": "unspecified",
    },
    # ── NEET 2016–2024 English (C4AI global-exam schema, 0-based answers) ──
    {
        "name": "neet_dipikakhullar_en",
        "url": "https://huggingface.co/datasets/dipikakhullar/neet/resolve/main/en_huggingface_upload.json",
        "exam_type": "neet",
        "year_regex_field": "file_name",
        "answer_one_based": False,
        "license": "MIT (dataset card); content marked fair use",
    },
    {
        "name": "neet_dipikakhullar_hi",
        "url": "https://huggingface.co/datasets/dipikakhullar/neet/resolve/main/hi_huggingface_upload.json",
        "exam_type": "neet",
        "year_regex_field": "file_name",
        "answer_one_based": False,
        "language": "hi",
        "license": "MIT (dataset card); content marked fair use",
    },
    # ── NEET 2023 (JeeHub, 0-based float answers) ──
    {
        "name": "neet_2023_jeehub",
        "url": "https://raw.githubusercontent.com/dhruv-programmes/JeeHub/main/public/sqp/neet-2023.json",
        "exam_type": "neet",
        "year": 2023,
        "subject": "NEET 2023",
        "question_keys": ["question_value"],
        "answer_one_based": False,
        "license": "MIT",
    },
    # ── SSC CGL Tier 2, March 2023, Hindi (0-based answers) ──
    {
        "name": "ssc_cgl_2023_hi",
        "url": "https://huggingface.co/datasets/sharad461/SSC-CGL-2023-hi-multimodal/resolve/main/SSC_CGL_2023.json",
        "exam_type": "ssc_cgl",
        "year": 2023,
        "answer_one_based": False,
        "language": "hi",
        "license": "unknown",
    },
    # ── CTET 2022 and 2023, Hindi (1-based answers), from official ctet.nic.in PDFs ──
    {
        "name": "ctet_2022_hi",
        "url": "https://huggingface.co/datasets/srajwal1/ctet/resolve/main/ctet_converted.json",
        "exam_type": "ctet",
        "year": 2022,
        "answer_one_based": True,
        "language": "hi",
        "license": "unknown; source is official CTET PDF",
    },
    {
        "name": "ctet_2023_hi",
        "url": "https://huggingface.co/datasets/sunitha98/ctet-hindi-questions/resolve/main/ctet_multiple_years.json",
        "exam_type": "ctet",
        "year": 2023,
        "year_regex_field": "file_name",
        "subject_keys": ["section"],  # category_en is just "CTET"; use the default below
        "subject": "CTET Paper I",
        "answer_one_based": True,
        "language": "hi",
        "license": "open (dataset card); source ctet.nic.in",
    },
]
