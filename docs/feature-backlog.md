# SarkariAlert — Feature Backlog (what to add next)

Date: 2026-10-19. Derived from the research in [gap-analysis.md](gap-analysis.md). Every item is free to run (no paid API, no paid data) and uses what the codebase already has. Ordered by value ÷ effort. "Evidence" says why users want it; "Build" says what it touches.

## Tier A — trust and deadlines (the core promise)

| # | Feature | Evidence | Build | Effort |
|---|---|---|---|---|
| A1 | **Source badge on every job**: "From ssc.gov.in" with the exact official URL, or "Via aggregator — not yet verified". | Top Play Store complaint is fake/clickbait notices; FreeJobAlert's "Officially Verified" stamp is the only one in the market | `Job.source_url` already exists; add `is_official` (derived from parser class) and a badge in `JobCard` and the detail page | ½ day |
| A2 | **"Never pay to apply" banner + scam reporting** | 42% of WhatsApp users got fake job offers; PIB debunks weekly | Static banner component on job pages; `report-scam` form that emails you (no backend) | ½ day |
| A3 | **Last-date extraction from notification PDFs** | 61% of jobs have no deadline; missed deadlines are the #1 regret | `pdfplumber` on `notification_pdf`; regex for "last date / closing date" patterns; run in `crawl_jobs` | 1 day |
| A4 | **Per-job `.ics` calendar file** ("Add deadline to calendar") | No competitor offers reminders; users ask for them in reviews | Next route `/jobs/[slug]/deadline.ics` generating a VEVENT with 3-day and 1-day alarms | ½ day |
| A5 | **Telegram bot registration + daily "closing in 3 days" push** | TelegramSubscriber model exists with 0 rows; channels are one-way broadcasts | Django view for the bot webhook (`/start`, `/state UP`, `/cat ssc`); schedule `send_telegram_alerts` in GitHub Actions | 1–2 days |
| A6 | **Exam status timeline** per exam (notification → form → admit card → exam → key → result → cancelled/re-exam) | SSC MTS cancelled in 8 states, UP Police re-exam, "result kab aaega" threads | Group `Job` rows by exam name + `content_type`; render a timeline on `/exam/[name]` | 1–2 days |

## Tier B — personalisation without login

| # | Feature | Evidence | Build | Effort |
|---|---|---|---|---|
| B1 | **Eligibility profile filter** (age, qualification, state, category) on `/jobs` | "Show only jobs I'm eligible for" appears in reviews of all 3 big apps | localStorage profile; rule-based filter on `qualification`, `age_limit`, `state`; no AI | 1 day |
| B2 | **"Jobs for 10th / 12th / ITI / Graduate" landing pages** | FreeJobAlert's "Jobs by Education" is a top nav item; 1 cr Group D applicants are 10th-pass | Static routes that filter by qualification keywords; strong SEO terms | ½ day |
| B3 | **Saved-jobs deadline list** | Users asked for "save a job" on Sarkari Result app | `/saved-jobs` already exists; add deadline sorting and a "closing soon" group | ½ day |
| B4 | **Shared-device safe mode** ("clear my data" button, no account) | 18% of users share a phone, mostly women | One button that clears all `sarkari_*` localStorage keys | 1 hour |

## Tier C — exam prep that is honest and free

| # | Feature | Evidence | Build | Effort |
|---|---|---|---|---|
| C1 | **Real PYQ importer** from official PDFs (UPSC, SSC, NTA) and open datasets (`Abhay557/indian-exams-rawdata`, `Samkarya/online-exam-questions`) | AI "PYQ" is a CCPA misleading-content risk; real papers are free | Extend `pdf_extractor`; set `source=crawled`, `source_url`, `is_verified` when the key is official | 2–3 days first 5 exams |
| C2 | **Label synthetic questions as "Practice (AI)"** everywhere in the UI | Same risk; honesty is the differentiator | Read `source` field in PYQ, mock and revision pages; show a chip | ½ day |
| C3 | **Daily quiz from the day's current affairs** (1 Gemini call/day) | Daily-quiz page has been empty since launch | Already wired through `config/gemini.py`; schedule `crawl_current_affairs` daily in Actions | ½ day |
| C4 | **Official answer-key links per exam** | Wrong keys and normalisation disputes are a top complaint | `content_type=answer_key` rows exist; surface them on the exam timeline (A6) | ½ day |
| C5 | **Hindi-medium explanations for verified questions** | Topper interviews cite the Hindi material gap; Adda refunds for wrong-language packs | Translate verified questions in batches when a paid tier is available; until then crowd-source via a "suggest Hindi" form | later |

## Tier D — coverage the leaders skip

| # | Feature | Evidence | Build | Effort |
|---|---|---|---|---|
| D1 | **District / anganwadi / NHM / panchayat parsers** for UP, Bihar, MP, Rajasthan | These appear only as "Outsourcing" blocks on aggregators; scattered district portals | New parser classes following `state_psc.py` pattern | 2 days |
| D2 | **Apprenticeship feed** (NAPS/NATS, PSU apprentice notices) | NAPS applications fell to 4 lakh; no feed exists | Parser for apprenticeshipindia.gov.in notices; `category=apprenticeship` | 1 day |
| D3 | **"After 10th/12th" route pages**: ITI, polytechnic, nursing, railway apprentice, Agniveer | No structured product; Josh Talks blogs only | Static guide pages linking to live jobs by qualification (B2) | 1 day |
| D4 | **Run the crawler from India** so RRB and NIC-hosted sites respond | RRB regional sites reset connections from abroad | GitHub Actions self-hosted runner on a ₹300/month Indian VPS, or Oracle free tier Mumbai | ½ day |

## Tier E — low-data and language

| # | Feature | Evidence | Build | Effort |
|---|---|---|---|---|
| E1 | **Lite job list** (`/lite`): text-only, no icons, <30 KB | Sub-₹10k phones, 23% mobile-only users, rising data prices | A server component rendering plain HTML list | ½ day |
| E2 | **Hindi body text from the Hindi notification** where the source publishes one (SSC, UPSC, Employment News all do) | 729M Indic users; "Hindi titles only" on every competitor | Parsers pick up `_hi.pdf` / Hindi page variants; store in `description_hi` | 1–2 days |
| E3 | **Bengali and Marathi UI strings** after Hindi is complete | Adda247 credits Marathi/Punjabi for growth | Extend `lib/translations.ts`; the provider already supports `bn`, `ta`, `te` | 1 day each |

## Tier F — content that brings search traffic (no AI)

| # | Feature | Evidence | Build | Effort |
|---|---|---|---|---|
| F1 | **Weekly "jobs closing this week" digest** as a blog post generated from the DB | FreeJobAlert's "475 jobs closing this week" block; "sarkari result" has 101M searches/month | Cron that writes a static article from `last_date` within 7 days | 1 day |
| F2 | **Vacancy and cut-off archives per exam** from official PDFs | Cut-off opacity complaints; Careers360 charges ₹499 for predictors | Store cut-offs in a `Cutoff` model; render tables; cite the PDF | 2 days |
| F3 | **State pages with real counts and deadlines** | State-based filtering is requested in reviews | `/state/[state]` exists; add counts, closing-soon list, state PSC calendar | ½ day |

## Status

Tier A shipped on 2026-10-19: A1 source badge (`is_official` + `source_host` in the API, badge on cards and detail pages), A2 scam warning on every notice, A3 `extract_pdf_dates` command (runs daily), A4 `/jobs/[slug]/deadline.ics` with 3-day and 1-day alarms ("Remind me" button), A5 Telegram bot webhook (`/start`, `/cat`, `/state`, `/me`, `/stop`) + `send_deadline_reminders` + daily workflow, A6 `/exam/[name]` timeline page ("Track exam" button).

To switch on Telegram: set `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHANNEL_ID`, `TELEGRAM_WEBHOOK_SECRET` as GitHub secrets and on the backend host, then call once:
`https://api.telegram.org/bot<TOKEN>/setWebhook?url=<API_URL>/telegram/webhook/<SECRET>/`

C1 shipped on 2026-10-19 (first pass): `import_pyq_json` + `pyq/import_sources.py` + daily `pyq-import.yml`. Bank went from 5,286 to **23,622 questions (21,097 real)**: JEE Main 25 years, NEET 25 years, UPSC Prelims 2015–2025, CTET 2015–2023, SSC CGL 2023 (Hindi). GATE official papers added the same day via `import_gate_pdfs`: 777 MCQs with official keys (`is_verified=True`) for CS/EC/ME/EE/CE 2022–2026; bank now 24,399. C2 done: every question shows Official paper / Previous year / Practice (AI). Details and licences in [pyq-sources.md](pyq-sources.md).

## What users will love — by tier

The research kept pointing at the same thing: people don't want more features, they want fewer surprises. Each line below is a moment where the site can beat the competition by being honest, fast, and in the user's language.

**Tier 1 / metro (graduates, UPSC, banking, SSC CGL)**
- One page per exam that answers "what happens next and when" (A6) — they currently piece this together from five Telegram channels.
- Honest cut-off archives with the official PDF cited (F2). Careers360 charges ₹499 for a predictor; a free, sourced table wins.
- Real previous papers with official keys (C1) and a visible "AI practice" label on anything synthetic (C2). Trust is the product.
- Calendar reminders (A4) and a weekly "closing this week" digest (F1).

**Tier 2 (state capitals and district towns, state PSC, police, teaching)**
- State-first pages with real counts and the state PSC calendar (F3); 39% of our listings are state PSC but the state pages are thin.
- Hindi body text from the Hindi notification where it exists (E2), not only Hindi titles.
- Eligibility filter by age / qualification / state / category (B1) — the most requested feature in reviews of all three big apps.
- Form-fill help attached to the job: photo spec, documents, fee rules, OTR notes (links to the existing tools from the job page).

**Tier 3 / rural (10th–12th pass, Group D, GD, anganwadi, apprenticeship)**
- "Jobs for 10th pass / 12th pass / ITI" landing pages (B2): the biggest applicant pools and the least served online.
- District, anganwadi, NHM and panchayat notices (D1) and an apprenticeship feed (D2).
- The scam banner (A2) in Hindi on every page, and the source badge (A1) so "Via aggregator" is visible before anyone pays a cyber café to apply.
- A text-only lite list under 30 KB (E1) and a "clear my data" button for shared phones (B4).
- WhatsApp-ready share text that includes the last date and the official link (already partly there in the share button).

**All tiers**
- Never a fake number: no invented dates, salaries or leaderboards. The audit found all three; they're gone.
- Free stays free: the 20-call Gemini budget goes to one daily quiz, everything else is rule-based or from official PDFs.

## Not recommended

- Paid AI generation of "previous year questions" (misleading, and the free tier can't do it anyway).
- Login before the data is trustworthy.
- AMP pages (deprecated by Google).
- Any third-party "free LLM" proxy.
