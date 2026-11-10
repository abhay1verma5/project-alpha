# SarkariAlert — Code Audit, Market Research and Gap-Fill Plan

Date: 2026-10-19
Repo: https://github.com/abhay1verma5/job-search (private)

This document has three parts:

1. What the site actually does today (verified from code and the live SQLite DB).
2. What the market looks like and what users in tier 2/3/rural India need (web research, sources linked).
3. The gaps, and a prioritised plan to fill them with this website.

Facts marked **(est.)** are estimates or secondary sources, not official figures.

---

## Part 1 — What the site does today (code audit)

### 1.1 Headline numbers

| Item | Value | Note |
|---|---|---|
| Frontend routes | 63 `page.tsx` | Next.js 16, Vercel |
| Jobs in DB | 2,168 | all `is_active=1`; 41 already expired |
| Job content types | 918 job · 484 admit card · 251 answer key · 192 result · 169 admission · 154 syllabus | |
| PYQ questions | 5,150 | 0 verified, 0 Hindi, only 64 of 114 exams have any data |
| Current-affairs days | 5 | all 5 have an empty `quiz` list |
| Registered users | 0 | there is no login |
| Telegram subscribers | 0 | no bot endpoint exists to register them |
| Database | SQLite committed to git | rewritten hourly by two GitHub workflows |

### 1.2 Job data quality (the core product)

Field fill rates out of 2,168 jobs: apply_link 2,081 · qualification 1,084 · salary 869 · last_date 838 · age_limit 644 · vacancies 133 · description 95 · notification_pdf 74 · fee 26.

Where the values come from:

- Most salary / qualification / age values are **guessed from title keywords** by `backend/jobs/management/commands/enrich_jobs.py`, not scraped. One generic pay band ("₹44,900 – ₹1,42,400 (Level-7)") sits on 389 rows.
- `generate_last_date()` in the same file **invents deadlines** with `random.randint(5, 45)` days from today.
- Dedupe is only `slugify(title)` exists-check. Rows are never updated and expired jobs are never deactivated.
- Hindi titles are regex word substitution (`Job._translate_to_hindi`). The nine regional title columns (ta, te, bn, mr, gu, kn, ml, pa, or) are 0% filled.

### 1.3 Crawler health

- 981 crawl runs logged (2026-10-11 → 10-18). Errors: 975 "Failed to fetch", 519 HTTP 404, 430 max-retries, 238 SSL, 171 DNS, 140 timeouts.
- **SSC, UPSC, Railway (RRB), NCS, Judiciary and Employment News returned 0 items on every run.** About 25 official sites (ISRO, DRDO, KVS, NVS, BPSC, India Post…) failed every time.
- Volume comes from State PSC (~726/run, mostly PPSC = 484 rows) and the aggregators (RojgarResult 479, SarkariResult, FreeJobAlert).
- Scheduling: `.github/workflows/crawl.yml` runs hourly and commits `db.sqlite3` back to git. The local `crawl_cron.sh` loop has never succeeded (all 986 runs failed on missing `DJANGO_SECRET_KEY`). `render.yaml` has no cron.
- TLS verification is disabled in `BaseParser.fetch` (`verify=False`).

### 1.4 Exam prep content

- `generate_pyq.py` sends Gemini a prompt per exam × subject × year asking for "authentic" MCQs. **These are synthetic questions, labelled with a year, shown as "previous year questions".**
- Of the 2,761 rows marked "crawled": 2,184 are real JEE/NEET/CAT papers (2024–26) from the GitHub dataset `Samkarya/online-exam-questions`; **422 are OpenTDB general-trivia questions mislabelled as CBSE-12 / SSC CGL / UPSC Prelims / NEET 2024**; ~155 from IndiaBix.
- Fallback LLM when Gemini fails is an unauthenticated third-party endpoint `https://flm.stonech.at/v1/chat/completions` — prompts leave our control.
- Right now ~114 `generate_pyq` processes are running locally and every one is logging "No response from Gemini API". DB count has not moved from 5,150.
- Flashcards (30 cards), topic weightage (23 exams), cutoff tracker (4 exams), vacancy trends: all hard-coded TypeScript.

### 1.5 Features that are UI-only or broken

| Feature | State |
|---|---|
| `/alerts` (email) | Saves to localStorage; page text admits no email is sent |
| Telegram alerts | Two duplicate `send_telegram_alerts` commands, no workflow runs them, 0 subscribers |
| `/daily-quiz` | Always empty (all `quiz` JSON lists are empty) |
| `/blog` | 4 article cards, **no `/blog/[slug]` route**, nothing opens |
| `/previous-papers` | Metadata promises "year-wise PDFs from official sources"; no PDFs exist |
| `/leaderboard` | 14 fabricated users hard-coded in `LeaderboardClient.tsx:78-91` |
| `/ai-answer-writer`, `/ai-doubt`, `/ai-math`, `/ai-syllabus`, `/ai-vocabulary` | POST to a Django route that doesn't exist → always "Error" |
| `/ai-resume`, `/ai-interview` | Send `{role, content}`, route reads `m.text` → prompt arrives empty |
| Saved jobs | Split across two localStorage keys; jobs saved from the detail page never appear on `/saved-jobs` |
| Regional languages (ta/te/bn) | Only "critical UI strings" translated; `<html lang>` never changes; hreflang en-IN and hi-IN point to the same URL |

### 1.6 Security and infra findings

- **Gemini API key is in git history** (`.env.prod` committed at `8d3d08d` on 2026-10-16, removed at `4b8d209`). Repo is private, but the key was also printed in a terminal transcript. Rotate it.
- AI API routes have no auth and no rate limit; anyone can burn the Gemini quota.
- `CORS_ALLOW_ALL_ORIGINS = True`.
- Request logging writes to a file (`api_requests.log`) which will fail on Vercel's read-only filesystem.
- Migration drift: DB has `pyq.0003` applied but the file is missing from the repo; `jobs.0003_telegramalertlog` exists in repo but is not applied.
- A personal Gmail is shown on `/contact` and used in workflow git config.

### 1.7 What genuinely works

- Job listing, detail pages, category/state filters, search, related jobs, JobPosting JSON-LD, sitemap with every job slug, RSS, service worker + offline page, Hindi UI toggle.
- `/ai-career`, `/ai-quiz`, `/ai-eligibility`, `/ai-search` work (Gemini via Next API routes).
- Mock tests and spaced revision work against the PYQ table (with the content caveat above).
- Current affairs crawled from 7 RSS feeds (NDTV, TOI, IE, The Hindu, PIB, GKToday, AffairsCloud).

---

## Part 2 — Market and user research

### 2.1 Who the users are (tier 2/3/rural aspirants)

Scale per cycle (applications unless noted):

- SSC CGL 2025: 28.15 lakh for ~14.5k posts ([CareerPower](https://www.careerpower.in/blog/28-lakhs-candidates-applied-for-ssc-cgl-2025-exam)). SSC CHSL 2025: 30.69 lakh applied, only ~36% appeared per RTI ([Adda247](https://www.adda247.com/exams/ssc/ssc-chsl-rti-reply-shocks-aspirants-only-36-attendance-out-of-30-69-lakh-applicants/)). SSC MTS 2025: 36.17 lakh for 5,464 posts.
- RRB Group D (CEN 08/2024): **1.08 crore** applications for 32,438 posts ([Jagran](https://www.thedailyjagran.com/education/rrb-group-d-2025-sees-record-108-crore-applicants-for-32438-posts-mumbai-zone-leads-highest-applications-check-region-wise-details-here-10233204)).
- UP Police Constable 2024: 48.17 lakh appeared for 60,244 posts, eligibility 10th/12th pass ([Free Press Journal](https://www.freepressjournal.in/amp/education/up-police-constable-recruitment-2024-48-lakh-aspirants-to-compete-for-60244-posts-in-retest)).
- UPSC CSE 2025: 9.38 lakh applied, 5.77 lakh appeared ([PIB](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2235933&reg=3&lang=1)).
- **(est.)** 3–5 crore unique aspirants per year across cycles. Applied-vs-appeared gap of 36–60% means many apply blind and drop.

Who they are:

- Overqualified: 24.76 lakh applied for 53,749 Rajasthan peon posts, ~60% graduates/PG/PhD ([OTV](https://odishatv.in/news/trending/24-76-lakh-overqualified-graduates-phd-holders-apply-for-peon-posts-260949)).
- Youth (15–29) unemployment 9.9%, rural 8.3%, urban 13.6% — PLFS 2025 ([PIB](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2246009&lang=1&reg=3)). Male graduate unemployment 19.2% ([JustJobs](https://justjobsnetwork.org/data-story/indias-education-to-employment-gap-a-plfs-data-story/)).
- Women are ~8% of the SSC GD shortlist; rural women own smartphones at half the male rate; 58% of shared-device users are women ([IIMA Ventures](https://insights.iimaventures.com/works/the-other-internet/)).
- 729M Indians use the internet in Indian languages; ~70% trust local-language content more ([Business Standard](https://www.business-standard.com/india-news/india-s-internet-users-to-exceed-900-mn-in-2025-driven-by-indic-languages-125011600835_1.html)).
- Typical aspirant spends 2–3+ years and ~₹5,000/month in a coaching hub like Patna ([The Print](https://theprint.in/india/unemployed-for-years-craving-govt-job-why-story-of-bihars-youth-is-of-struggle-despair/826066/), [Scroll](https://scroll.in/article/1019543/inside-patnas-exam-hub-where-a-million-hopes-die-every-year)).

### 2.2 How they find jobs and prepare today

- Aggregator portals: sarkariresult.com **(est.)** 7–18M visits/month, 97–99% India ([Similarweb](https://www.similarweb.com/website/sarkariresult.com/vs/sarkariexam.com/)).
- Telegram/YouTube for free (often pirated) PDFs and test series ([TaiyarHo](https://www.taiyarho.in/blog/best-telegram-channels-govt-exams-2026/)).
- Willingness to pay clusters at ₹100–700/year: Adda247 Test Prime ₹299, SSC Prime ₹699; Testbook ₹30–599 ([Bankers Adda](https://www.bankersadda.com/prime-offers-on-books-and-test-series/)). **(est.)** Above that, Telegram piracy substitutes.
- Photo/signature rejection is the top reason government forms are rejected ([GovtPoint](https://govtpoint.com/photo-signature-rejected-govt-job-form/)).

### 2.3 Documented pain points

- **Fake notifications and scams.** PIB Fact Check repeatedly debunks fake appointment letters and recruitment drives ([LatestLY](https://www.latestly.com/social-viral/fact-check/fake-government-job-letters-go-viral-pib-fact-check-debunks-appointment-notices-using-mords-name-7598649.html), [Careers360](https://news.careers360.com/rrb-rpf-si-constable-recruitment-notice-circulating-on-social-media-fake-pib)). WFH/part-time job scams were the most-reported fraud type on the cybercrime portal ([CyberDefence](https://cyberdefence.org.in/blog/cyber-fraud-statistics-india-2026/)). Telegram "paper leak" sellers charge ₹10–25k ([The420](https://the420.in/telegram-paper-leak-scam/)).
- **Exam cancellations and chaos.** UP Police 2024, UPPSC RO/ARO 2024, NEET-UG 2024 & 2026, UGC-NET 2024, SSC MTS 2025 cancelled in 8 states ([Careers360](https://news.careers360.com/ssc-mts-exam-cancelled-across-8-states-multiple-centres-fresh-admit-cards-whats-happening-anxious-aspirants-new-dates/amp)). SSC 2025 centres allotted 500–700 km away, avg 168 km ([Careers360](https://news.careers360.com/ssc-cgl-2025-tier-1-single-shift-exam-centre-allocation-100km-aadhaar-authentication-technical-issues-chairman-outlines-reforms)).
- **Form-fill problems.** Aadhaar OTR with no edit option, face-auth glitches ([Adda247](https://www.adda247.com/exams/ssc/ssc-cgl-2025-registration-problems/)); fee debited-but-pending ([SarkariCore](https://sarkaricore.com/guides/how-to-fill-government-job-online-form)).
- **Result delays.** "Result kab aaega" — UP Police waited 8 months ([Careers360](https://news.careers360.com/up-police-constable-results-2024-48-lakh-await-uppbpb-gov-in-frustrated-candidates-ask-result-kab-aaega-cut-off/amp)).
- **Mental health.** Kota suicides 26 (2023) / 17 (2024) / 14 (H1 2025); NEET-linked suicides at record high in 2025 ([PMC](https://pmc.ncbi.nlm.nih.gov/articles/pmid/40656372), [Hans India](https://www.thehansindia.com/news/national/neet-student-suicides-reach-record-high-in-2025-kota-emerges-as-major-hotspot-1079305)).

### 2.4 Public schemes users struggle to understand

- NCS: 6.64 cr registered, but only 17.68 lakh vacancies active ([PIB](https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2198745&reg=3&lang=1)).
- PM Internship: 60,866 offers → 8,760 joined → 4,698 dropped ([Business Standard](https://www.business-standard.com/economy/news/pm-internship-scheme-only-20-of-offers-convert-to-joins-in-three-rounds-126092901119_1.html)).
- NAPS apprenticeship applications fell from 42.8 lakh (2022) to ~4 lakh (2025) ([PolicyCircle](https://www.policycircle.org/industry/indias-apprenticeship-scheme-naps/)).
- PMKVY: CAG found only 41% of certified trainees placed ([Business Standard](https://www.business-standard.com/economy/news/house-panel-asks-skill-ministry-to-update-placement-details-under-pmkvy-4-0-125042000540_1.html)).

### 2.5 Digital constraints

- 958M internet users, rural 57% and growing ~4× urban; 18% use someone else's device ([BestMediaInfo/IAMAI](https://bestmediainfo.com/insights/indias-internet-users-near-one-billion-in-2025-rural-india-leads-growth-iamai-11056899)).
- Sub-₹10k phone shipments fell 65% YoY in H1 2026 — users keep old low-RAM devices longer ([Techlomedia](https://techlomedia.in/2026/09/the-10000-smartphone-segment-is-slowly-disappearing-126875/)). Data tariffs up 20–25% ([Analysys Mason](https://www.analysysmason.com/research/content/articles/india-price-increases-rdrp0/)).
- WhatsApp ~536–597M Indian users ([Backlinko](https://backlinko.com/whatsapp-users)).

### 2.6 Competitor landscape — sarkari job portals

Traffic (Sep 2026, Similarweb / Semrush, **est.**, the two tools disagree ~2×):

| Site | Visits / month | Notes |
|---|---|---|
| sarkariresult.com.cm | 24–42M | #1 in category; a Cameroon ccTLD registered 2023 ([Similarweb](https://www.similarweb.com/website/sarkariresult.com.cm/)) |
| sarkariresult.com | 13–19M | the 2012 original; both sides are in a trademark war now at the Supreme Court ([LiveLaw](https://www.livelawbiz.com/trademark/sarkari-result-trademark-suit-allahabad-high-court-says-jurisdiction-objection-must-be-decided-before-plaint-amendment-553954)) |
| freejobalert.com | 6–10M | claims 1 crore monthly visitors, 475 jobs "closing this week" ([site](https://www.freejobalert.com/)) |
| sarkariexam.com | 2–4.5M | same group as .com.cm |

- Keyword demand **(est.)**: "sarkari result" ≈ 101M searches/month in India (Semrush).
- Audience **(est.)**: 77–80% male, 25–34 the largest band, India 94–99%, direct traffic 51–62%.
- Channels: Sarkari Result WhatsApp channel 6M followers, Telegram 1.5M; FreeJobAlert WhatsApp 3 lakh+. Wifistudy YouTube 15.6M.
- Apps (Play Store, 19 Oct 2026): Sarkari Result Official 10L+ installs / 4.5★; FreeJobAlert 10L+ / 3.6★; Jagran Sarkari Naukri 50L+ / 3.9★; Adda247 10M+ / 4.4★; Testbook 50M+ / 4.3★.

What a job post looks like on the leaders (verified by reading live pages):

- **FreeJobAlert** has the most complete structure: "Officially Verified" stamp, author, timestamp, date table, category-wise vacancy table, age table, fee, eligibility, pay level, selection, how to apply, documents list, "Apply Online — no link exists yet, beware unofficial links", notification PDF, "Report an Error". English only. Listing table has 7 columns including Qualification and Last Date ([example](https://www.freejobalert.com/articles/dgqa-recruitment-2026-apply-offline-for-32-technician-posts-3073326)).
- **sarkariresult.com.cm** posts: dates, fee by category, age, post-wise table, eligibility, how to fill (Hindi note), FAQ. **No salary, no documents section.** The "Apply Online" link points to their WhatsApp channel until the official link goes live ([example](https://sarkariresult.com.cm/upsssc-inter-12th-level-2026/)).
- **Adda247 / Testbook** job pages are headline feeds ("Notification Out for 32 Vacancies, Last Date 3rd April") that funnel to paid passes.
- **NCS (govt)**: 6.02 cr registered jobseekers, 40 lakh active vacancies, no job alerts ([PIB](https://labour.gov.in/sites/default/files/pib2147927.pdf)).

Play Store review complaints, verbatim themes ([Sarkari Result](https://play.google.com/store/apps/details?id=com.vinod.sarkarinaukri&hl=en_IN), [FreeJobAlert](https://play.google.com/store/apps/details?id=com.freejobalert&hl=en_IN), [Adda247](https://play.google.com/store/apps/details?id=com.adda247.app&hl=en_IN)):

- "Too many fake notifications… clickbait… cheap tactics to increase advertisement views."
- "Whole screen gets covered by ads."
- "Notifications stopped for a month" (developer admits delivery problems).
- "Select my course and relevant jobs"; "can't delete the posts that you are not eligible for"; "customized notification for state based jobs".
- "There must be an option to save a particular job."
- Scams: 42% of WhatsApp users received fake job offers asking for payment ([LocalCircles via Business Standard](https://www.business-standard.com/india-news/whatsapp-job-scams-survey-impersonation-fraud-localcircles-report-125052101713_1.html)).

Monetisation: display ads dominate aggregators; edtech funnels (Testbook Pass ₹749/yr, Adda Mahapack ₹2–5k) make the money. Testbook FY24 revenue ₹136.7 Cr, loss ₹84.9 Cr; Adda247 FY25 revenue ₹217 Cr, loss ₹103.6 Cr ([Inc42](https://inc42.com/company/testbook/financials/)).

### 2.7 Competitor landscape — exam prep and education

| Player | What it is | Price | Signal |
|---|---|---|---|
| Testbook | 690+ exams, "16,000 PYPs", mocks, AI doubt | Pass ₹749/yr | Trustpilot 1.7/5: refunds, auto-debit, EMI without consent ([Trustpilot](https://www.trustpilot.com/review/testbook.com)) |
| Adda247 | 12 languages, 500+ exams, free quizzes | Mahapack ₹2–5k | full-screen ads inside mock tests; 85% users tier II–IV |
| PhysicsWallah govt | 9,000+ tests, Hinglish, state batches for UP/Bihar/Punjab only | ₹399–449/yr | FY25 revenue ₹2,887 Cr; opening offline govt-exam centres ([PW](https://www.pw.live/test-series/govt-exam/ssc)) |
| Utkarsh (PW 75%) | Hindi-medium, Rajasthan/Hindi belt | — | 21M installs |
| Entri | Malayalam/Tamil/Kannada/Telugu/Hindi, Kerala PSC-heavy | not public | 10M+ installs, 4.6★ |
| Oliveboard | banking/SSC mocks with percentile | ~₹1.4–1.9k | small, stagnant (FY25 ₹22.7 Cr) |
| Unacademy | acquired by upGrad Sep 2026 for ~$200M, 94% below peak ([Inc42](https://inc42.com/buzz/from-3-5-bn-to-200-mn-upgrad-completes-unacademy-acquisition/)) | — | shrinking |
| BYJU'S Exam Prep, Embibe | dormant / absorbed | — | gone |
| NTA Abhyas (govt) | free, no ads, JEE/NEET/UGC-NET/CUET mocks, offline solutions | free | iOS 3.4★ |
| Careers360 / Shiksha / Collegedunia | college info, predictors (Careers360 predictor ₹499) | — | revenue is college lead-gen |

Where real previous-year papers come from (all free):

- UPSC publishes papers on upsc.gov.in; SSC releases papers and keys per exam; NTA hosts JEE Main archives. IBPS publishes nothing.
- Open datasets: HF `Abhay557/indian-exams-rawdata` (GATE / JEE Main / JEE Advanced PDFs + keys 2007–2025), `Hellboi78688/jee-neet-benchmark` (MIT licence), `Samkarya/online-exam-questions` on GitHub (already used by our crawler), `169Pi/exambench` (406k synthetic, Apache 2.0).
- Legal: Indian courts treat exam papers as copyrighted literary works ([CaseMine](https://www.casemine.com/in/column/copyright-in-examination-question-papers-in-india/view)); the CCPA's 2024 coaching-ad guidelines fined 24 centres ₹77.6 lakh for misleading content claims ([Taxmann](https://www.taxmann.com/post/blog/consumer-protection-authority-fines-24-coaching-centres-%e2%82%b977-6-lakh-for-misleading-ads-urges-compliance-with-guidelines)). **Marketing AI-generated questions as "previous year questions" is a misleading-content risk.**

Market size: test prep ~$14.8B FY26 → $23–26B FY30 (RedSeer); digital share 46% → 67% by 2032 (Ken Research); 67% of tier-2+ aspirants unwilling to relocate to coaching hubs ([Indian Television](https://indiantelevision.com/mam/indias-test-prep-market-set-to-reach-26-billion-by-fy30/)).

---

## Part 3 — Gaps, and how this website fills them

### 3.1 The gap map

Every row is something users ask for (Part 2) that no leader does well, matched against what our code does today (Part 1).

| # | Gap in the market | Who half-does it | Our state today | What we build |
|---|---|---|---|---|
| G1 | **Verified-official-only notices.** Users get clickbait and fake notices; aggregators route "Apply" through WhatsApp. | FreeJobAlert stamp (manual) | We crawl 80 official sites, but SSC/UPSC/RRB/NCS return 0 and most rows come from aggregators | Make official-source crawls work; show a "Source: ssc.gov.in" badge with the exact official URL; mark aggregator-only rows as "unverified" |
| G2 | **Trustworthy deadlines + reminders.** #1 complaint is missed dates; no site offers per-job reminders. | countdowns on-page only | We *invented* deadlines; 61% of jobs have none; alerts page is a stub | Never guess dates (done); parse last_date from the notification PDF; per-job reminder via Telegram bot and .ics calendar file |
| G3 | **Eligibility matching.** "Show only jobs I'm eligible for." | FreeJobAlert coarse registration | `/ai-eligibility` exists (Gemini); no profile, no filter | Local-storage profile (age, qualification, state, category) → rule-based filter on list pages, no AI call needed |
| G4 | **Full Hindi/regional content**, not just titles. 729M Indic users; 57% prefer regional search. | Adda (paid), Entri (South) | Hindi titles by regex; 9 regional columns 0% filled | Hindi body text per job from the official Hindi notification where it exists; one language at a time (Hindi first, then Bengali, Marathi) |
| G5 | **Free, exam-pattern mocks for 10th/12th-level exams** (GD, Group D, police, MTS: 1 cr+ applicants each). | paid passes; Telegram piracy | 5,150 questions, mostly synthetic, 422 trivia rows mislabelled | Import real papers from official PDFs and open datasets (free); label every question's true source; drop synthetic "PYQ" labelling |
| G6 | **Live exam-status tracker** (cancelled, re-exam, result delay, centre allotment). | news sites, rumour channels | nothing | Per-exam status timeline page fed by official notices + PIB Fact Check |
| G7 | **Form-fill help** (photo/signature specs, OTR, payment-pending). Top rejection cause. | scattered blogs, cyber cafés | photo editor, form assistant, document checklist exist (client-only) | Attach the exact photo spec and document list to each job post; link the tools from the job page |
| G8 | **Scam warning layer.** 42% got fake WhatsApp job offers. | PIB, NCS warnings | nothing | "Never pay to apply" banner on every post; lookalike-domain list; report-a-scam form |
| G9 | **State/district and contract jobs** (anganwadi, panchayat, outsourcing). | "Outsourcing" blocks on aggregators | State PSC = 39% of rows, but district portals not crawled | Add district/anganwadi/NHM portal parsers for UP, Bihar, MP, Rajasthan first |
| G10 | **Light, low-data, shared-device UX.** 18% shared devices; low-end phones. | NTA Abhyas offline | service worker + offline page exist | Keep pages under ~100KB first load; no login required; everything works in localStorage (already the case) |
| G11 | **Plan-B paths** (ITI, apprenticeship NAPS/NATS, polytechnic, nursing). | blogs only | scholarships page static | Apprenticeship feed + "after 10th/12th" route pages |

### 3.2 What was fixed in this pass (code, verified by reading and compiling)

- `enrich_jobs.py`: removed the random `last_date` generator. Deadlines now come only from parsers.
- `crawl_jobs.py`: expired jobs are deactivated after each crawl.
- `generate_pyq.py`: removed the unauthenticated third-party LLM fallback (`flm.stonech.at`); model list set to the current `gemini-3.8-flash`.
- `LeaderboardClient.tsx`: the 20 fabricated users are gone; the board shows only this device's own stats.
- `ShareButtons.tsx`: saved-jobs key unified with JobCard and `/saved-jobs`.
- New `/api/ai-tool` route with per-tool system prompts and per-IP rate limiting; the 5 broken AI pages (doubt, math, syllabus, vocabulary, answer-writer) now call it. `ai-resume` and `ai-interview` send the field the route reads.
- `lib/gemini.ts` rewritten for the Interactions API (`gemini-3.8-flash`) with legacy fallback; `lib/rate-limit.ts` added; `/api/ai-career` rate-limited.
- The 422 OpenTDB trivia rows were **relabelled, not deleted**: they now sit under `exam_type=general_gk` ("General Knowledge (practice)") so they no longer appear as SSC/UPSC/CBSE 2024 papers. Migration `pyq/0003` added for the new type.

Second pass (crawlers and infrastructure):

- **SSC parser rewritten** against the JSON API the ssc.gov.in app uses (`/api/admin/5.1/allExams`, `/api/admin/5.1/getAllCandiateAdvertisements`). Dry run: 30+ real exams with apply-form links, selection-post phases with true start/end dates. Previously 0 items.
- **UPSC parser rewritten**: reads `/examinations/active-exams` and `/forthcoming-exams`, then each exam page for *Last Date for Receipt of Applications*, *Date of Notification* and the official notification PDF. Dry run: 25 live exams. Previously 0.
- **Employment News parser fixed**: the `www.` host 404s; now reads `employmentnews.gov.in/NewEmp/AllJobs.aspx` (organisation, post, method, real last date). Previously 0.
- **RRB and NCS**: all RRB regional sites and rrbcdg.gov.in are unreachable from outside India-allowlisted networks (connection reset), and NCS is a JavaScript app with no public govt-jobs JSON endpoint found. Left as-is; railway notices still arrive via aggregators. Candidate fix: run the crawler from a GitHub Actions runner in an Indian region or a cheap Indian VPS.
- New `backend/config/gemini.py`: one Gemini helper using the Interactions API (`gemini-3.8-flash`); current-affairs items, the daily quiz and PYQ generation now go through it. The daily quiz was empty because the old `generateContent` call 404s on the new models.
- Logging: API request log goes to stdout on Vercel (read-only filesystem) instead of crashing on a FileHandler.
- `/api/v1/` pyq routes get their own namespace (removes the Django W005 warning).
- `<html lang>` now follows the chosen language; `/previous-papers` metadata no longer promises PDF downloads that don't exist.
- Blog: `/blog/[slug]` added with 8 full articles (static content, Article JSON-LD, in the sitemap). Cards previously linked to `#`.

### 3.3 Hard constraint found: the AI budget

The Gemini key is **Free Tier: 20 requests/day** on `gemini-3.8-flash`, and `gemini-2.5-flash` is retired for new keys. The 114 parallel generation processes exhausted the day's quota within seconds, which is why every log said "No response from Gemini API". Generating 191k synthetic questions this way is not possible, and it would be the wrong product anyway (see G5 and the CCPA risk).

Free-and-best path instead:

1. **Real papers, free**: official PDFs (UPSC, SSC, NTA, state PSCs) plus the open datasets above. Parse with the existing `pdf_extractor` scraper; label `source=crawled`, store the official `source_url`, set `is_verified` only when the answer key is official.
2. **AI only where it adds value and fits 20/day**: daily current-affairs quiz (1 call/day), AI search query parsing (cached), eligibility explanations. Everything else rule-based.
3. If a paid tier is ever added, use it to translate verified questions into Hindi, not to invent new ones.

### 3.4 Priority order (what to do next, in sequence)

1. **Rotate the Gemini key** (it is in git history and was shown in a terminal). 5 minutes.
2. **Run `remove_mislabelled_trivia --apply`** and commit the DB. 2 minutes.
3. **Fix the official-source crawlers** that return 0 (SSC, UPSC, RRB, NCS). These are the trust foundation for G1 and G2. Most fail on SSL/404 — the sites changed structure or block the user agent. 1–2 days.
4. **Parse `last_date` from notification PDFs** for every job that has one (74 PDFs today; grows once crawlers work). 1 day.
5. **Telegram bot for per-job reminders** — the subscriber model exists; add the `/start` webhook so rows get created, and a daily "closing in 3 days" push. Also emit an `.ics` link per job. 1–2 days.
6. **Eligibility profile filter** on `/jobs` (rule-based, no AI). 1 day.
7. **Import real PYQs** from official PDFs and open datasets; retire the synthetic "PYQ" label (keep synthetic items as "practice questions"). 2–3 days for the first 5 exams.
8. **Scam banner + "Source" badge** on every job page. Half a day.
9. **District/anganwadi/NHM parsers** for UP, Bihar, MP, Rajasthan. 2 days.
10. **Blog**: add `/blog/[slug]` and turn it into a daily "jobs closing this week" digest generated from the DB — no AI needed. 1 day.

Items 3–5 fix the core promise (fresh, true, reminded). Items 6–10 are the differentiators the leaders don't have.

### 3.5 What not to do

- Don't re-add a third-party "free" LLM endpoint; prompts and student data leave your control.
- Don't label AI questions as previous-year papers.
- Don't invent dates, salaries or leaderboard users to make pages look full. The research shows users already distrust aggregators for exactly this.
- Don't add login before the data is trustworthy; localStorage-only is a feature for shared devices.
