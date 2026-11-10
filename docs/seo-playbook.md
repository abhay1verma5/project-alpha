# How SarkariAlert ranks on Google — playbook and what is already coded

Date: 2026-10-19. Companion to [gap-analysis.md](gap-analysis.md) and [feature-backlog.md](feature-backlog.md).

The sarkari-job space is one of the largest search markets in India ("sarkari result" ≈ 101M searches a month, "free job alert" ≈ 4M). The leaders rank on three things: they publish first, they have a page for every query, and Google trusts the domain. A new site cannot win on age, so it must win on **freshness, coverage and accuracy signals** that Google can measure.

## 1. What Google measures that we control

| Signal | What it means here | Status in code |
|---|---|---|
| **Freshness** | New notices indexed within minutes of the official release | Hourly crawl + IndexNow ping on new URLs (`crawl_jobs._ping_indexnow`). SSC/UPSC/Employment News crawlers now return items. |
| **Coverage** | A URL for every query class: exam × stage, education level, state, category | Added `/exam-pattern/[exam]` (100+), `/jobs-for/[level]` (8), `/exam/[name]` timelines (14 in sitemap), on top of jobs, states, categories, PYQ, blog. |
| **Structured data** | Rich results: JobPosting, FAQ, Breadcrumb, Article, ItemList | JobPosting + Breadcrumb existed. Added **FAQPage** on every job page and every exam-pattern page, **Article** on blog posts, **ItemList/CollectionPage** on index pages. |
| **E-E-A-T / trust** | Google's quality raters look for who published it and whether it is accurate | Source badge with the official domain on every notice; scam warning; no invented dates/salaries (removed). Add an About page with a real author and contact, and a correction policy (TODO). |
| **Core Web Vitals** | LCP < 2.5 s, INP < 200 ms, CLS < 0.1 on low-end Android | Static pages, no client JS on index pages, service worker. Keep images off list pages; measure with PageSpeed monthly. |
| **Mobile-first** | 65–80% of this audience is on phones | Responsive layouts; add the text-only `/lite` list (backlog E1). |
| **Internal linking** | Every page reachable within 3 clicks; related links in context | Job → exam timeline → exam pattern → PYQ → mock test is now a connected loop; footer links added. |
| **Sitemaps** | All URLs with real `lastmod` | `sitemap.ts` covers jobs (from the API), states, categories, exam patterns, education levels, timelines, blog. |

## 2. Keyword map (what each page type targets)

| Page type | Primary query pattern | Example target |
|---|---|---|
| `/jobs/[slug]` | `<exam> recruitment 2026`, `<exam> last date`, `<exam> notification pdf` | "SSC CGL 2026 notification" |
| `/exam-pattern/[exam]` | `<exam> exam pattern`, `<exam> syllabus and pattern`, `<exam> negative marking` | "RRB NTPC exam pattern 2026" |
| `/exam/[name]` | `<exam> admit card`, `<exam> result`, `<exam> answer key`, `<exam> kab aayega` | "UP Police result 2026" |
| `/jobs-for/[level]` | `10th pass govt job`, `12th pass sarkari naukri`, `ITI govt vacancy 2026` | "10th pass government jobs 2026" |
| `/state/[state]` | `<state> govt jobs`, `<state> sarkari naukri 2026` | "Bihar sarkari naukri" |
| `/pyq/[exam]` | `<exam> previous year questions`, `<exam> pyq` | "SSC CHSL previous year questions" |
| `/blog/[slug]` | how-to and strategy queries | "how to fill government job form" |

Rules: one H1 per page that contains the query; title ≤ 60 characters with the year; meta description ≤ 155 characters that states the concrete value (last date, number of posts, official link). Never put a date in the URL.

## 3. The weekly loop (30 minutes)

1. **Search Console → Pages → "Crawled, not indexed"**: if job pages pile up here, thin content is the cause. Fix by ensuring every job page has at least last date, qualification, vacancies or a PDF link; deactivate the rest (the crawler now deactivates expired jobs).
2. **Search Console → Queries sorted by impressions, position > 10**: these are the pages one improvement away from page 1. Add the missing section (FAQ answer, table, Hindi line) and re-request indexing.
3. **PageSpeed Insights on three pages** (home, a job page, an exam-pattern page) on "Mobile". Keep LCP under 2.5 s.
4. **Check the sitemap** is accepted and the IndexNow key file is served.

## 4. Content that compounds

- **Exam pattern + PYQ + timeline per exam** is now one connected cluster per exam. Each new exam added to `exam-patterns.ts` creates three indexable pages.
- **Weekly "closing this week" digest** (backlog F1) gives Google a reason to re-crawl the blog and gives users a reason to come back on a schedule.
- **Cut-off archives** (backlog F2) attract the highest-intent queries after results ("SSC CGL cut off 2025").
- **Hindi body text** (backlog E2): Hindi queries have less competition and higher conversion for this audience.

## 5. What not to do

- No doorway pages: one page per real query, not 50 city pages with identical text.
- No fake dates or counts to look fresh; Google's helpful-content system demotes sites with unreliable data, and users report them.
- No AI-written "previous year papers" labelled as real; the CCPA guidelines treat that as misleading content.
- No interstitial ads or pop-ups on mobile; they hurt rankings and are the top complaint against competitors.

## 6. Code added for SEO in this pass

- `frontend/src/app/exam-pattern/` — index with filters (qualification, negative marking, category, search) and per-exam pages with section weightage and FAQ JSON-LD.
- `frontend/src/lib/exam-patterns.ts` — 100+ exam patterns (teacher PRT/TGT/PGT via KVS, DSSSB, Super TET and 11 state TETs; all police, SI, PSC, railway, bank, SSC, entrance and board exams in the PYQ bank).
- `frontend/src/app/jobs-for/[level]/` — 8 education-level landing pages with Hindi titles.
- FAQPage JSON-LD on job pages (`jobs/[slug]/page.tsx`).
- Sitemap entries for all of the above; footer links.
