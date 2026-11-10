# Previous-year question sources — what is imported, from where, under what terms

Date: 2026-10-19. Importer: `backend/pyq/management/commands/import_pyq_json.py`; source list: `backend/pyq/import_sources.py`; daily workflow: `.github/workflows/pyq-import.yml`.

## Bank after this import

| Exam | Questions | Years | Source |
|---|---|---|---|
| JEE Main | 7,215 | 2002–2026 (25 yrs) | skndash96/jeeneetards (ExamGoal export) + Samkarya |
| NEET | 6,909 | 2000–2024 (25 yrs) | jeeneetards + dipikakhullar/neet (en + hi) + JeeHub 2023 |
| CTET | 1,778 | 2015–2023 | srajwal1/ctet (2022, hi) + sunitha98/ctet-hindi (2023, hi) + earlier AI rows |
| UPSC Prelims GS-I | 1,702 | 2015–2025 | S-bandawala/upsc-quiz-app + secretedoc/upsc-prelims-gs1 (with explanations) |
| SSC CGL | 949 | 2015–2024 | sharad461 SSC CGL Tier-2 2023 (hi, 788 real) + earlier AI rows |
| JEE Advanced | 563 | 2008–2023 | jeeneetards |
| CAT | 531 | 2021–2025 | Samkarya (non-commercial licence — see below) |
| RRB NTPC / Group D | 398 | 2016–2025 | Samkarya |
| General practice (`general_gk`) | 1,402 | — | OpenTDB, Chemistry101, IELTS, NIMCET sets — **relabelled**, no longer shown as exam PYQs |

Total 23,622; `source=crawled` 21,097, `source=ai_generated` 2,525 (kept, to be labelled "Practice (AI)" in the UI — backlog C2).

## Answer-index verification

Numeric answers were checked against known questions before any import:
- dipikakhullar/neet and sharad461/SSC-CGL are **0-based** (ratio 2:4:9 question → option 1 "Rakesh = 60, Ramesh = 135"; election 64% / 434 votes → option 1 "1550").
- srajwal1/ctet and sunitha98/ctet-hindi are **1-based** ("dysgraphia" → option 3, the neurological writing disorder).
- Letter answers (UPSC, jeeneetards) need no base.
- roshansk23 NEET_2021 was **not imported**: no English rows, so the base could not be verified.

## Licence position

- Exam papers are copyright of the conducting body (Copyright Act s.13; the s.52 government-work exception does not cover question papers). Community JSON is a parsed cache of official PDFs. Every imported row stores its `source_url`; nothing is presented as our own.
- **Samkarya/online-exam-questions** is under the "ExamOven Non-Commercial Open Source License": fine while the site has no ads or paid plans; must be removed or licensed before monetising. It contributes CAT, RRB and 5 JEE Main papers.
- dipikakhullar/neet: MIT dataset card, content marked "fair use". JeeHub: MIT. sunitha98: "open". Others: unspecified.
- Synthetic datasets (169Pi/exambench, devNaam/examguru, BruthaCool/neetjee, etc.) were deliberately excluded.

## Sources with nothing structured and free

SSC CHSL/MTS/GD/CPO/JE, IBPS and SBI (no official archive exists), RBI, KVS, UPTET, REET, all state police and state PSC prelims, CUET, AFCAT, nursing entrance. SSC serves its papers only through a login viewer; UPSC's PDF pages block non-browser clients and the Prelims PDFs are scanned.

## GATE official papers (built: `import_gate_pdfs`)

Source: the GATE organising institute's download page (`gate2027.iitm.ac.in/static/doc/download/…`), which republishes every year's question papers and **official final answer keys** as text PDFs. This is the only source in the bank that earns `is_verified=True`.

- Imported: **777 MCQs** across gate_cse, gate_ece, gate_me, gate_ee, gate_ce for **2022–2026** (34 paper/key pairs; 2022 ME has no published key). Each row stores the paper URL and the official key letter in `explanation`.
- Skipped on purpose: MSQ (multiple correct options), NAT (numerical answer), "marks to all" questions, and any question whose stem refers to a figure/diagram/circuit, since the figure is not stored. GATE papers are ~65 questions, of which 25–33 are MCQ, so ~24 usable per paper is the expected yield — not the ~11k an earlier estimate suggested, which counted all question types.
- 2021 papers and keys are scanned images on that page (no text layer) and are not imported.
- The parser handles both key layouts (one row per line, and one cell per line as in 2025) by flattening the key text. Question numbering is enforced to be sequential so page-break artefacts ("Q.1" repeated in a footer) are ignored.
- Runs daily for the latest year inside `pyq-import.yml`; re-runs dedupe on question text, so a new year only needs its file names added to `PAPERS`.

Daily GK quizzes from GKToday/AffairsCloud were rejected: their terms prohibit reuse.
