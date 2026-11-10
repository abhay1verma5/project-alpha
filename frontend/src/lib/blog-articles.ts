// Blog articles. Plain content, no AI calls, so the pages are static and indexable.
// `body` is a list of sections; each section is a heading plus paragraphs or bullet lists.

export interface ArticleSection {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  readTime: string;
  category: string;
  categoryColor: string;
  updated: string; // ISO date
  body: ArticleSection[];
}

export const articles: Article[] = [
  {
    slug: 'how-to-prepare-ssc-cgl-3-months',
    title: 'How to Prepare for SSC CGL in 3 Months',
    description:
      'A complete roadmap to crack SSC CGL with a focused 90-day strategy. Covers Tier-1 and Tier-2 syllabus breakdown, daily schedule, and best resources.',
    readTime: '8 min read',
    category: 'SSC',
    categoryColor: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300',
    updated: '2026-10-19',
    body: [
      {
        paragraphs: [
          'SSC CGL 2025 drew 28 lakh applications for about 14,500 posts. Most of those candidates never finish the syllabus. Three months is enough for Tier-1 if you stop collecting resources and start solving questions on day one.',
        ],
      },
      {
        heading: 'Know the paper before you study',
        bullets: [
          'Tier-1: 100 questions, 200 marks, 60 minutes. Four sections of 25 questions each: Reasoning, General Awareness, Quantitative Aptitude, English. Negative marking is 0.50 per wrong answer.',
          'Tier-2 Paper-1 is the one that decides selection: Maths (30 q), Reasoning (30 q), English (45 q), General Awareness (25 q), Computer (20 q). Each question carries 3 marks, minus 1 for a wrong answer.',
          'Only Tier-1 is qualifying for most posts; your Tier-2 score is what gets ranked. Prepare for Tier-2 from the start.',
        ],
      },
      {
        heading: 'Month 1 — build the base',
        bullets: [
          'Maths: finish Arithmetic first (percentage, profit and loss, ratio, time and work, speed-distance, SI/CI). These are 60% of the paper and the fastest to score.',
          'English: 30 minutes a day on grammar rules (subject-verb agreement, tenses, prepositions). One passage of reading daily.',
          'Reasoning: practise 50 questions a day from previous-year papers; most patterns repeat.',
          'GA: start a current-affairs notebook from today and revise it weekly. Static GK comes from previous-year questions, not textbooks.',
        ],
      },
      {
        heading: 'Month 2 — speed and coverage',
        bullets: [
          'Maths: Advanced topics now (Geometry, Trigonometry, Mensuration, Algebra). Learn the 20 standard results, then solve 40 questions a day under time.',
          'English: vocabulary from previous-year papers (one-word substitution, idioms, synonyms). Start one full English sectional every other day.',
          'Take one Tier-1 full mock every Sunday. Analyse every wrong answer the same day.',
        ],
      },
      {
        heading: 'Month 3 — mock and revise',
        bullets: [
          'One full mock a day, alternating Tier-1 and Tier-2 pattern. Target 150+ in Tier-1 and 80% accuracy.',
          'Stop learning new topics after day 75. Revise formula sheets, error log, and current affairs.',
          'In the last week, sleep on time and solve only easy and medium questions to protect accuracy.',
        ],
      },
      {
        heading: 'Daily schedule that works',
        paragraphs: [
          'Six hours is enough if they are focused: 2 hours Maths, 1.5 hours English, 1 hour Reasoning, 1 hour GA, 30 minutes revising yesterday’s mistakes. Working candidates can split this across morning and night; the Maths block must stay daily.',
        ],
      },
    ],
  },
  {
    slug: 'top-10-tips-upsc-prelims-2027',
    title: 'Top 10 Tips for UPSC Prelims 2027',
    description:
      'Proven strategies from toppers to clear UPSC Prelims. Learn how to approach current affairs, CSAT, and negative marking effectively.',
    readTime: '10 min read',
    category: 'UPSC',
    categoryColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
    updated: '2026-10-19',
    body: [
      {
        paragraphs: [
          'In 2025, 9.38 lakh people applied for the Civil Services Examination and 5.77 lakh appeared. Around 14,000 clear Prelims. The exam rewards elimination skill and calm more than memory.',
        ],
      },
      {
        heading: 'The ten tips',
        bullets: [
          '1. Read the official syllabus and the last 10 years of question papers first. They tell you what UPSC asks; nothing else does.',
          '2. NCERTs (Class 6–12) for History, Geography, Polity, Economy and Science are the base. Read them once fully, then only the chapters that keep appearing.',
          '3. One standard book per subject: Laxmikanth (Polity), Spectrum (Modern History), GC Leong or NCERT (Geography), the Economic Survey summary (Economy). Do not switch books mid-way.',
          '4. Current affairs: one source, read daily, revised monthly. Cover the 12 months before the exam, with extra attention to government schemes, environment, and science.',
          '5. CSAT is qualifying (33%) but it fails thousands every year. Solve one CSAT paper a week from January; comprehension and basic maths are enough.',
          '6. Negative marking is one-third of a question. Attempt a question only when you can eliminate two options with reason. Blind guesses lose marks over a full paper.',
          '7. Take at least 25 full-length mocks. Sit for them at 9:30 AM, on paper, with an OMR sheet. The exam is physical as well as mental.',
          '8. Keep an error notebook. Every wrong answer gets one line: the fact you missed and why you chose the wrong option.',
          '9. Revise more than you read. A good ratio is three revisions for every first reading. Use short notes, not long ones.',
          '10. Protect the last 30 days: no new books, no new sources, no new topics. Revision and mocks only.',
        ],
      },
      {
        heading: 'A realistic timeline',
        paragraphs: [
          'June to December: foundation reading and NCERTs. January to March: standard books plus current affairs revision. April to the exam: mocks, PYQs and revision. Mains preparation should run alongside until about 90 days before Prelims.',
        ],
      },
    ],
  },
  {
    slug: 'best-books-rrb-ntpc-exam',
    title: 'Best Books for Railway RRB NTPC Exam',
    description:
      'Curated list of must-read books for RRB NTPC preparation. Covers Mathematics, General Intelligence, General Awareness, and English sections.',
    readTime: '6 min read',
    category: 'Railway',
    categoryColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
    updated: '2026-10-19',
    body: [
      {
        paragraphs: [
          'RRB NTPC CBT-1 has 100 questions in 90 minutes: Mathematics 30, General Intelligence and Reasoning 30, General Awareness 40. One-third negative marking. The paper is easier than SSC CGL but the competition is enormous — the last cycle had over 1.2 crore applicants.',
        ],
      },
      {
        heading: 'Mathematics',
        bullets: [
          'Quantitative Aptitude by R.S. Aggarwal: the standard book for arithmetic basics. Do the exercises, skip the theory you already know.',
          'Rakesh Yadav Class Notes (Hindi/English): short tricks for percentage, ratio, time and work, which make up most of the paper.',
          'Previous-year RRB NTPC and Group D papers: the level is similar and questions repeat in pattern.',
        ],
      },
      {
        heading: 'General Intelligence and Reasoning',
        bullets: [
          'A Modern Approach to Verbal and Non-Verbal Reasoning by R.S. Aggarwal, for coding-decoding, series, syllogism and puzzles.',
          'Kiran’s Railway Reasoning PYQ compilation, for exam-level practice.',
        ],
      },
      {
        heading: 'General Awareness (40 questions — the deciding section)',
        bullets: [
          'Lucent’s General Knowledge (Hindi or English edition) for static GK: history, geography, polity, science.',
          'NCERT Science Class 6–10 for basic science, which is heavily asked.',
          'A monthly current-affairs magazine or our daily current-affairs page for the 6 months before the exam.',
          'Kiran’s Railway GA PYQ book to see the real level of questions.',
        ],
      },
      {
        heading: 'How to use them',
        paragraphs: [
          'Finish one book per section, not three. Spend 40% of your time on General Awareness because it has the most questions and the least calculation. Give one full mock every week from the second month, and track your section-wise accuracy.',
        ],
      },
    ],
  },
  {
    slug: 'ibps-po-vs-sbi-po-comparison',
    title: 'IBPS PO vs SBI PO — Which is Better?',
    description:
      'Detailed comparison of IBPS PO and SBI PO in terms of salary, career growth, work-life balance, exam difficulty, and posting locations.',
    readTime: '7 min read',
    category: 'Banking',
    categoryColor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300',
    updated: '2026-10-19',
    body: [
      {
        paragraphs: [
          'Both are Probationary Officer posts in public-sector banks with the same basic pay scale. The differences are in the bank, the exam level, and the posting policy.',
        ],
      },
      {
        heading: 'Salary and allowances',
        bullets: [
          'Basic pay is the same scale (JMGS-I) in both. SBI pays higher allowances and offers 4 advance increments, so in-hand pay at SBI is typically ₹8,000–12,000 more per month in the early years.',
          'Both get DA, HRA, lease accommodation options, medical cover and concessional loans. SBI’s housing and vehicle loan terms are usually better.',
        ],
      },
      {
        heading: 'Exam difficulty',
        bullets: [
          'SBI PO Prelims and Mains are a notch harder, with longer puzzles, data interpretation and descriptive writing. Cut-offs are higher because more candidates compete for fewer seats.',
          'IBPS PO covers 11 banks in one exam, so vacancies are larger. The paper is standard; the cut-off moves with vacancies.',
        ],
      },
      {
        heading: 'Posting and transfers',
        bullets: [
          'SBI posts across India and transfers are frequent in the first 10 years, including rural postings.',
          'IBPS lets you prefer banks; smaller banks tend to post closer to home, and some have state-based cadres.',
        ],
      },
      {
        heading: 'Career growth',
        bullets: [
          'SBI has the largest branch network and the fastest promotion channel to Scale-II and Scale-III for good performers.',
          'IBPS banks vary. Bank of Baroda, Canara and PNB promote on similar timelines; smaller banks can be slower.',
        ],
      },
      {
        heading: 'Which one',
        paragraphs: [
          'Apply for both — the syllabus is almost identical. Prefer SBI if you want the brand, the higher pay and can accept transfers. Prefer IBPS if staying near home matters and you want more vacancies to compete for. Most serious candidates write both exams in the same year.',
        ],
      },
    ],
  },
  {
    slug: 'age-limit-relaxation-rules-government-jobs',
    title: 'Age Limit Relaxation Rules for Government Jobs',
    description:
      'Understand age relaxation rules for SC/ST, OBC, PwD, and ex-servicemen across all major government exams. Includes category-wise breakdowns.',
    readTime: '5 min read',
    category: 'Guide',
    categoryColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
    updated: '2026-10-19',
    body: [
      {
        paragraphs: [
          'Age is counted on a cut-off date printed in each notification, usually the 1st of a month near the closing date. Always check that date; being eligible "this year" means eligible on that date.',
        ],
      },
      {
        heading: 'Standard central-government relaxation',
        bullets: [
          'SC / ST: 5 years beyond the upper limit.',
          'OBC (non-creamy layer): 3 years.',
          'PwBD: 10 years (SC/ST PwBD 15 years, OBC PwBD 13 years).',
          'Ex-servicemen: service period plus 3 years, within the post’s rules.',
          'Widows, divorced women and judicially separated women not remarried: up to 35 years (40 for SC/ST) in many Group C posts.',
          'Central government civilian employees with 3 years’ service: up to 40 years (45 for SC/ST) for several posts.',
        ],
      },
      {
        heading: 'Exam-wise upper limits (general category)',
        bullets: [
          'UPSC CSE: 21–32, six attempts (OBC 35 and nine attempts; SC/ST 37 and unlimited attempts).',
          'SSC CGL: 18–27 for most posts, 20–30 for Inspector/ASO-type posts, up to 32 for some.',
          'SSC CHSL and MTS: 18–27 (MTS up to 25 for some posts).',
          'IBPS PO and SBI PO: 20–30. IBPS Clerk: 20–28.',
          'RRB NTPC: 18–33 (graduate posts), 18–30 (undergraduate). RRB Group D: 18–33.',
          'Agniveer (Army/Navy/Air Force): 17.5–21, no relaxation.',
        ],
      },
      {
        heading: 'Common mistakes',
        bullets: [
          'Claiming OBC relaxation with a creamy-layer certificate or one older than the notification allows.',
          'Counting age on the exam date instead of the cut-off date.',
          'Assuming state PSC limits match central limits — many states allow up to 40 for general and 45 for reserved categories.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-fill-government-job-application-forms',
    title: 'How to Fill Government Job Application Forms',
    description:
      'Step-by-step guide to filling online application forms correctly. Common mistakes to avoid, document requirements, and fee payment tips.',
    readTime: '6 min read',
    category: 'Guide',
    categoryColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
    updated: '2026-10-19',
    body: [
      {
        paragraphs: [
          'Rejected photos and signatures are the single biggest reason forms are thrown out. A fee that shows "pending" is the second. Both are avoidable with ten minutes of preparation.',
        ],
      },
      {
        heading: 'Before you open the form',
        bullets: [
          'Read the notification’s "How to apply" and "Documents" sections completely. Note the photo size (usually 20–50 KB JPG, 3.5 × 4.5 cm), signature size (10–20 KB), and the fee.',
          'Keep scanned copies ready: photo (recent, plain background, no cap or glasses unless medical), signature in black ink on white paper, 10th certificate (for date of birth), highest qualification, category certificate, PwBD certificate if any.',
          'Use one email and one mobile number for all government forms and keep them active for two years. OTPs and admit cards go there.',
        ],
      },
      {
        heading: 'SSC and the One-Time Registration (OTR)',
        bullets: [
          'SSC now uses Aadhaar-based OTR. Name, date of birth and gender are taken from Aadhaar; make sure they match your certificates before you register.',
          'Once submitted, some OTR fields cannot be edited. Fill slowly and check twice.',
          'Live photo capture is mandatory for some exams: sit in good light, face the camera, no filters.',
        ],
      },
      {
        heading: 'Filling the form',
        bullets: [
          'Type names exactly as they appear on your 10th certificate, including spacing and spelling.',
          'Choose exam centres you can reach on the day. In 2025 many SSC candidates were allotted centres hundreds of kilometres away after picking too few preferences.',
          'Post preferences: fill all of them, in a considered order. Blank preferences are treated as "not interested".',
          'Upload the photo and signature in the exact dimensions. Use our Photo Editor tool if the file is the wrong size.',
        ],
      },
      {
        heading: 'Paying the fee',
        bullets: [
          'Pay at least two days before the deadline. Payment servers slow down in the last hours.',
          'If money is debited but the status shows pending, wait 24–48 hours before paying again; most gateways auto-update. Keep the transaction ID.',
          'Women and SC/ST/PwBD/ESM candidates are fee-exempt in most central exams; do not pay if the form says NIL.',
        ],
      },
      {
        heading: 'After submission',
        bullets: [
          'Download the final form PDF and the payment receipt. Save them with the exam name and year.',
          'Check the correction window dates in the notification. Many exams allow one paid correction.',
          'Set a reminder for the admit card release, usually 7–10 days before the exam.',
        ],
      },
    ],
  },
  {
    slug: 'study-timetable-working-professionals',
    title: 'Study Timetable for Working Professionals',
    description:
      'Realistic study plans for candidates preparing for government exams while working a full-time job. Morning and evening study strategies included.',
    readTime: '7 min read',
    category: 'Strategy',
    categoryColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300',
    updated: '2026-10-19',
    body: [
      {
        paragraphs: [
          'Many selected candidates in SSC, banking and state PSC exams prepared while working. The constraint is not hours; it is consistency. Three focused hours every day beats ten hours on Sunday.',
        ],
      },
      {
        heading: 'The 3-hour weekday plan',
        bullets: [
          '5:30–7:00 AM: the hardest subject for you (usually Maths or Reasoning). The mind is fresh; use it for problem solving, not reading.',
          'Commute or lunch (30 min): current affairs on your phone, vocabulary flashcards, or a 10-question daily quiz.',
          '9:00–10:30 PM: reading subjects — General Awareness, English grammar, Polity. End with 15 minutes revising the morning’s mistakes.',
        ],
      },
      {
        heading: 'Weekends',
        bullets: [
          'Saturday: one full mock test in exam conditions, then two hours of analysis. This is non-negotiable.',
          'Sunday: 4–5 hours of weak-area practice and the week’s current-affairs revision. Rest in the evening.',
        ],
      },
      {
        heading: 'Rules that keep the plan alive',
        bullets: [
          'Fix the slots and tell your family. Protect the morning block even on bad days; do 30 minutes rather than zero.',
          'Use leave for the last 10 days before the exam, not for starting preparation.',
          'Track with a simple sheet: date, hours, topic, questions solved. Review it every Sunday.',
          'If you miss a day, do not "make it up" — continue the next day. Backlogs kill plans.',
        ],
      },
      {
        heading: 'How long it takes',
        paragraphs: [
          'At 3 hours a weekday and 8 on weekends, you get about 23 hours a week. SSC CGL or IBPS PO Tier-1 level can be reached in 4–5 months; state PSC prelims in 6–8 months. UPSC needs a year or more at this pace.',
        ],
      },
    ],
  },
  {
    slug: 'common-mistakes-government-exam-preparation',
    title: 'Common Mistakes in Government Exam Preparation',
    description:
      'Avoid the top 10 mistakes that aspirants make during preparation. From ignoring current affairs to over-relying on shortcuts, learn what not to do.',
    readTime: '5 min read',
    category: 'Strategy',
    categoryColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300',
    updated: '2026-10-19',
    body: [
      {
        paragraphs: [
          'SSC CHSL 2025 had 30.69 lakh applicants and only 36% appeared for the exam. Most people lose before the exam, in how they prepare. These are the patterns we see most often.',
        ],
      },
      {
        heading: 'The ten mistakes',
        bullets: [
          '1. Collecting resources instead of solving questions. One book and the last 10 years of papers beat five Telegram PDF folders.',
          '2. Applying for everything without checking eligibility or dates, then missing the one exam that mattered. Use the eligibility tool and set reminders.',
          '3. Skipping mocks until "the syllabus is complete". It never is. Start mocks from month two.',
          '4. Not analysing mocks. A mock without a two-hour review is wasted. Keep an error log.',
          '5. Ignoring negative marking. Attempting 100 questions at 70% accuracy scores less than 80 questions at 90%.',
          '6. Treating General Awareness as unimportant. It is the highest-scoring section per minute in SSC, Railway and banking exams.',
          '7. Learning shortcuts before basics. Tricks fail on unfamiliar questions; concepts do not.',
          '8. Changing strategy after every YouTube video. Pick a plan, run it for 60 days, then adjust.',
          '9. Paying for "leaked papers" or "guaranteed selection" on Telegram. These are scams; several sellers have been arrested. No exam body sells papers.',
          '10. No sleep in the last week. Fatigue costs more marks than any topic you might cram.',
        ],
      },
      {
        heading: 'One habit that fixes most of these',
        paragraphs: [
          'End every day by writing three lines: what you solved, what you got wrong, what you will revise tomorrow. It takes two minutes and makes the next day’s plan automatic.',
        ],
      },
    ],
  },
  // ── 12 new SEO articles targeting high-volume long-tail keywords ──
  {
    slug: 'ssc-gd-constable-salary-allowances-promotion',
    title: 'SSC GD Constable Salary 2026 — In-Hand Pay, Allowances & Promotion',
    description:
      'Complete SSC GD Constable salary breakdown including basic pay, DA, HRA, in-hand salary in different cities, and promotion path from Constable to Inspector.',
    readTime: '6 min read',
    category: 'SSC',
    categoryColor: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300',
    updated: '2026-10-22',
    body: [
      {
        paragraphs: [
          'SSC GD Constable is the largest central recruitment — the 2024–25 cycle had 46,617 vacancies across BSF, CISF, CRPF, SSB, ITBP, AR and SSF. The post is in Pay Level-3 (₹21,700–69,100) under the 7th Pay Commission.',
        ],
      },
      {
        heading: 'Basic pay and allowances',
        bullets: [
          'Basic pay on joining: ₹21,700. After training (usually 9–12 months at the respective force centre), this becomes the starting salary.',
          'Dearness Allowance (DA): revised every six months, currently around 53% of basic. That adds about ₹11,500.',
          'HRA: depends on the posting city — X cities (Delhi, Mumbai, Kolkata, Chennai, Bangalore, Hyderabad) get 27% of basic; Y cities 18%; Z cities 9%.',
          'Transport Allowance: ₹3,600 for X/Y cities, ₹1,800 for Z cities.',
          'Ration money, uniform allowance, risk and hardship allowance (border postings) add another ₹3,000–5,000.',
        ],
      },
      {
        heading: 'In-hand salary by city type',
        bullets: [
          'X-city posting (Delhi): approximately ₹38,000–42,000 per month after deductions.',
          'Y-city posting (Jaipur, Lucknow): approximately ₹35,000–38,000.',
          'Z-city / border posting: ₹33,000–36,000 base, but border allowances can push this to ₹40,000+.',
          'NPS (pension) deduction is 10% of basic + DA, so about ₹3,300. The government contributes 14%.',
        ],
      },
      {
        heading: 'Promotion path',
        bullets: [
          'Constable → Head Constable: 8–10 years or through departmental exam (LDCE).',
          'Head Constable → ASI (Assistant Sub-Inspector): 5–8 years from HC.',
          'ASI → Sub-Inspector → Inspector: possible in 20–25 years of total service.',
          'Direct SI recruitment (through SSC CPO) is faster for promotion; GD Constables who clear CPO while in service get accelerated promotion.',
        ],
      },
      {
        heading: 'After the 8th Pay Commission',
        paragraphs: [
          'The 8th Pay Commission is expected in 2026. Based on a 2.57x fitment factor (similar to 7th CPC), the basic pay could rise to about ₹55,700, making the in-hand salary ₹60,000–70,000 for fresh constables. This is not confirmed yet, but historically fitment factors have been generous.',
        ],
      },
    ],
  },
  {
    slug: 'government-jobs-for-women-2026',
    title: 'Government Jobs for Women 2026 — Best Posts, Reservation & Benefits',
    description:
      'Complete guide to government jobs for women in India. Posts reserved for women, fee exemptions, age relaxations, and the safest sectors for female candidates.',
    readTime: '8 min read',
    category: 'Guide',
    categoryColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
    updated: '2026-10-22',
    body: [
      {
        paragraphs: [
          'Women have a significant advantage in government job recruitment: fee exemptions in most central exams, age relaxation in several, and reserved posts in many state governments. Yet many women do not apply because they are unaware of these benefits.',
        ],
      },
      {
        heading: 'Fee exemptions',
        bullets: [
          'SSC (CGL, CHSL, MTS, GD, CPO): women candidates of all categories pay zero application fee.',
          'UPSC CSE, NDA, CDS, CAPF: women are exempt from the application fee.',
          'RRB (NTPC, Group D, ALP, JE): women pay zero fee regardless of category.',
          'IBPS and SBI exams: only SC/ST/PwBD women are exempt; OBC/General women pay the full fee.',
          'Most state PSC exams (UPPSC, BPSC, MPPSC): women from the home state are usually exempt.',
        ],
      },
      {
        heading: 'Best posts for women',
        bullets: [
          'SSC CHSL (LDC/DEO): office-based, regular hours, postings in central government offices. 10,000+ vacancies annually.',
          'Banking (IBPS Clerk, SBI Clerk): urban postings, regular shifts. Many banks have women-only branches.',
          'Teaching (CTET → KVS/NVS, state TET): high demand, summer and winter breaks, posting near home in state exams.',
          'Nursing and healthcare (AIIMS, state hospitals): massive recruitment, good pay, and government accommodation.',
          'SSC MTS: the easiest central exam (10th pass), office-based work, and zero fee for women.',
        ],
      },
      {
        heading: 'Women-only recruitments',
        bullets: [
          'Delhi Police Constable (Female): regular female-only vacancies.',
          'UP Police Women Constable: 15–20% of constable vacancies reserved for women.',
          'Anganwadi Worker/Helper: state-level posts exclusively for women.',
          'Women SI in state police forces: separate recruitment drives.',
          'CISF, CRPF, BSF women constable: dedicated vacancies through SSC GD.',
        ],
      },
      {
        heading: 'Age relaxation',
        bullets: [
          'Central government: widows, divorced women and judicially separated women (not remarried) get age relaxation up to 35 years (40 for SC/ST) in Group C posts.',
          'Several states (UP, MP, Rajasthan, Bihar) give 5 extra years to all women candidates above the general upper limit.',
          'This stacks with category relaxation: an OBC woman in UP gets the OBC relaxation plus the state\'s 5-year women relaxation.',
        ],
      },
      {
        heading: 'Physical test standards for women',
        paragraphs: [
          'In SSC GD, SSC CPO and state police, women have separate (lower) physical standards: 157 cm height (152 for ST/NE), 1600m run in 8.5 minutes, long jump, and other tests. Always check the specific notification, as standards vary by force and state.',
        ],
      },
    ],
  },
  {
    slug: 'railway-group-d-syllabus-preparation-strategy',
    title: 'Railway RRB Group D Syllabus 2026 — Complete Syllabus & Preparation Plan',
    description:
      'Full RRB Group D syllabus breakdown with topic-wise weightage, best books, and a 4-month preparation strategy. Covers Maths, GI, GS and Current Affairs.',
    readTime: '9 min read',
    category: 'Railway',
    categoryColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
    updated: '2026-10-22',
    body: [
      {
        paragraphs: [
          'RRB Group D (Level-1) is a massive recruitment for posts like Track Maintainer, Helper, Porter and Pointsman across all zonal railways. The 2024 cycle had 1,03,769 vacancies. The exam has a single-stage CBT followed by PET (Physical Efficiency Test).',
        ],
      },
      {
        heading: 'Exam pattern',
        bullets: [
          'CBT: 100 questions, 90 minutes. Sections: Mathematics (25), General Intelligence & Reasoning (30), General Science (25), General Awareness & Current Affairs (20).',
          'Marking: 1 mark per question, minus one-third for wrong answers.',
          'Qualifying marks: 40% for UR, 30% for OBC, 30% for SC/ST.',
          'PET: male — 35 kg weight lift and carry 100m in 2 minutes, 1000m run in 4 min 15 sec. Female — 20 kg weight, 1000m in 5 min 40 sec.',
        ],
      },
      {
        heading: 'Mathematics syllabus (25 questions)',
        bullets: [
          'Number system, BODMAS, fractions, decimals, percentage.',
          'Ratio and proportion, time and work, time speed distance.',
          'Simple and compound interest, profit and loss.',
          'Algebra (basic), geometry (lines, triangles, circles), mensuration (area, volume), trigonometry (basic ratios).',
          'Statistics: mean, median, mode. Elementary data interpretation.',
        ],
      },
      {
        heading: 'General Intelligence & Reasoning (30 questions)',
        bullets: [
          'Analogies, classification, series (number, letter, figure).',
          'Coding-decoding, mathematical operations, syllogism.',
          'Venn diagrams, data sufficiency, conclusions and decisions.',
          'Mirror/water image, paper folding, pattern completion, embedded figures.',
          'Calendar, clock, direction sense, blood relations.',
        ],
      },
      {
        heading: 'General Science (25 questions)',
        bullets: [
          'Physics: force, motion, light, sound, electricity, magnetism, heat. NCERT Class 6–10 level.',
          'Chemistry: acids-bases-salts, metals-nonmetals, periodic table basics, chemical reactions, carbon compounds.',
          'Biology: cell structure, human body systems, diseases, nutrition, reproduction. NCERT Class 6–10.',
          'Environmental science: pollution, biodiversity, ecosystems. 2–3 questions are common.',
        ],
      },
      {
        heading: 'General Awareness & Current Affairs (20 questions)',
        bullets: [
          'Static GK: Indian history (freedom movement, ancient/medieval), geography (rivers, mountains, states), polity (fundamental rights, parliament), economy basics.',
          'Current affairs: last 6 months — government schemes, awards, sports, summits, appointments.',
          'Science in everyday life: inventions, diseases, nutrition — often clubbed here.',
        ],
      },
      {
        heading: '4-month preparation plan',
        bullets: [
          'Month 1: finish NCERT Science (Class 6–10) and Arithmetic (percentage, ratio, time & work, SI/CI). Start daily current affairs.',
          'Month 2: complete remaining Maths (geometry, mensuration) and all Reasoning topics. Continue static GK (Lucent or equivalent).',
          'Month 3: start full-length mocks — one every two days. Analyse every wrong answer. Revise science and GA notes weekly.',
          'Month 4: one mock daily. Last 15 days: revise formula sheets, error log, 6-month current affairs compilation. Start PET practice (running + weight).',
        ],
      },
    ],
  },
  {
    slug: 'defence-jobs-after-12th-pass',
    title: 'Defence Jobs After 12th — Army, Navy, Air Force & Paramilitary',
    description:
      'Complete list of defence jobs you can join after 12th pass. Covers Agniveer, NDA, CDS, AFCAT, paramilitary forces, and Territorial Army entry schemes.',
    readTime: '7 min read',
    category: 'Defence',
    categoryColor: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300',
    updated: '2026-10-22',
    body: [
      {
        paragraphs: [
          'Defence forces offer structured careers with salary, pension, housing and social respect. After 12th, you have multiple entry paths depending on whether you want to join as a soldier/sailor/airman or as an officer.',
        ],
      },
      {
        heading: 'Soldier / sailor / airman entry (after 12th)',
        bullets: [
          'Agniveer (Army): 4-year contract, ₹30,000–40,000 per month. Age 17.5–21. Trades: General Duty, Technical, Clerk/SKT, Tradesman. After 4 years, 25% are retained as regular soldiers.',
          'Agniveer (Navy): SSR (10+2 with PCM) and MR (10th pass for cooks/stewards). 4-year engagement, ₹30,000–40,000.',
          'Agniveer (Air Force): Group X (technical, 10+2 PCM) and Group Y (non-technical). Exam is STAR (online) followed by physical and medical.',
          'Assam Rifles, SSB, ITBP, BSF, CISF, CRPF: through SSC GD Constable exam. Age 18–23, 10th/12th pass.',
        ],
      },
      {
        heading: 'Officer entry (after 12th)',
        bullets: [
          'NDA (National Defence Academy): 12th pass (or appearing), age 16.5–19.5. Written exam by UPSC (Maths + GAT) + SSB interview. 3-year training at NDA Khadakwasla, then 1 year at respective academy. Commission as Lieutenant.',
          'NDA is the most prestigious entry and the youngest officer entry. You get a degree (BA/BSc/BCA/BTech) during training.',
          'Indian Coast Guard: Navik (GD) after 12th with PCM, Navik (DB) after 10th. Age 18–22.',
          'Territorial Army: part-time military service for employed civilians, after graduation. Not available after 12th but worth knowing.',
        ],
      },
      {
        heading: 'After graduation — officer entries',
        bullets: [
          'CDS (Combined Defence Services): for graduates, through UPSC. Entry to IMA, OTA, Naval Academy, Air Force Academy.',
          'AFCAT: Air Force officer entry for graduates (60% marks). Written exam + AFSB interview.',
          'SSC (Short Service Commission) Tech: for BE/BTech graduates in specific branches. Direct SSB interview, no written exam.',
          'TGC (Technical Graduate Course): for engineering graduates, permanent commission.',
        ],
      },
      {
        heading: 'Physical and medical standards',
        bullets: [
          'Army GD: height 170 cm (166 for NE/hill states), weight proportionate, chest 77 cm with 5 cm expansion, 1.6 km run in 5 min 30 sec.',
          'Navy: height 157 cm, proportionate weight, good eyesight (6/6 uncorrected for some entries).',
          'Air Force: height 162.5 cm for flying branch, eyesight 6/6 uncorrected.',
          'No bone fracture, no flat feet, no colour blindness, no tattoos on forearms (Army allows on inner forearm in some entries).',
        ],
      },
      {
        heading: 'Salary comparison',
        paragraphs: [
          'Agniveer: ₹30,000–40,000 plus free food, accommodation and insurance. After 4 years, a lump-sum Seva Nidhi of about ₹11.71 lakh (if not retained). NDA/CDS officers start at ₹56,100 (Level 10) plus MSP ₹15,500, making in-hand salary ₹80,000–90,000 from day one of commission.',
        ],
      },
    ],
  },
  {
    slug: '10th-pass-government-jobs-list-2026',
    title: '10th Pass Government Jobs 2026 — Full List with Salary & Eligibility',
    description:
      'Complete list of government jobs for 10th pass candidates in 2026. Covers SSC MTS, Railway Group D, Army, Police Constable, Postman and more with salary details.',
    readTime: '8 min read',
    category: 'Guide',
    categoryColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
    updated: '2026-10-22',
    body: [
      {
        paragraphs: [
          'Lakhs of government posts are open to candidates who have passed 10th (Matriculation/High School) from a recognised board. These are mostly Group C and Group D posts, but the pay after the 7th Pay Commission makes them very attractive — even a Group D post starts above ₹18,000 basic.',
        ],
      },
      {
        heading: 'Central government posts (10th pass)',
        bullets: [
          'SSC MTS (Multi-Tasking Staff): Pay Level-1 (₹18,000–56,900). Posts in central ministries, offices, embassies. Age 18–25. Zero fee for women/SC/ST.',
          'SSC Havaldar (CBIC/CBN): Pay Level-1. Physical test required. Similar to MTS but in revenue/border departments.',
          'RRB Group D: Pay Level-1 (₹18,000). Track Maintainer, Helper, Porter. 1 lakh+ vacancies in each cycle.',
          'India Post GDS (Gramin Dak Sevak): 10th pass with local language knowledge. Monthly TRCA ₹12,000–14,500 for 4 hours of work. Massive vacancies (30,000+).',
          'India Post Postman/Mail Guard: 10th pass + 60-day computer training certificate. Pay Level-3 (₹21,700).',
          'Agniveer (Army Tradesman): 10th pass for certain trades. ₹30,000/month, 4-year engagement.',
        ],
      },
      {
        heading: 'State government posts (10th pass)',
        bullets: [
          'Police Constable: every state recruits separately. Pay Level-3 equivalent (₹21,700 basic). Physical test mandatory.',
          'Home Guard: part-time service, honorarium-based. Available in most states.',
          'Forest Guard: 10th pass, heavy physical test (hill running). State forest departments.',
          'Gram Panchayat Sachiv / VDO: 10th or 12th pass depending on state. State staff selection boards.',
          'Sweeper, Safai Karamchari, Mali, Peon: Group D posts in state offices, municipalities and courts. Pay Level-1.',
        ],
      },
      {
        heading: 'Semi-government and PSU posts',
        bullets: [
          'IOCL, ONGC, NTPC, SAIL Trade Apprentice: ITI or 10th pass. Stipend ₹7,000–12,000 during training, absorption as Technician.',
          'Railway Apprentice (Act Apprentice): 10th pass with 50%. 7,000+ vacancies per year per zone.',
          'Ordnance Factory Apprentice: 10th pass, various trades.',
        ],
      },
      {
        heading: 'Salary and career growth',
        bullets: [
          'Level-1 (₹18,000 basic): in-hand ₹25,000–30,000 with DA and HRA. Promotion to Level-2 after 3–5 years.',
          'Level-3 (₹21,700 basic): in-hand ₹33,000–40,000. This is where Postman, Constable and Group D regular employees start.',
          'Career progression: Group D → Group C through departmental exams. A motivated employee can reach Level-5 (₹29,200) in 15–20 years.',
          'Benefits: pension (NPS), medical cover, LTC, children education allowance, housing.',
        ],
      },
      {
        heading: 'How to prepare',
        paragraphs: [
          'Focus on Maths (basic arithmetic), Reasoning (pattern, series, coding) and General Awareness. These papers are easier than SSC CGL or banking — the syllabus is limited to Class 8–10 level. Two months of focused preparation with previous-year papers is enough for most candidates.',
        ],
      },
    ],
  },
  {
    slug: 'upsc-vs-state-psc-comparison',
    title: 'UPSC vs State PSC — Which Exam Should You Choose?',
    description:
      'Detailed comparison of UPSC Civil Services and State PSC exams. Covers difficulty, syllabus overlap, salary, posting, and strategy for preparing for both together.',
    readTime: '7 min read',
    category: 'UPSC',
    categoryColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
    updated: '2026-10-22',
    body: [
      {
        paragraphs: [
          'Every year lakhs of candidates prepare for UPSC CSE but ignore their state PSC, losing a realistic chance at a similar career. The overlap in syllabus is 60–70%, and state PSC posts (SDM, DSP, BDO, State Tax Officer) offer similar authority and salary at the state level.',
        ],
      },
      {
        heading: 'Difficulty comparison',
        bullets: [
          'UPSC CSE: 10–12 lakh apply, ~14,000 clear Prelims, ~2,500 reach Mains, ~1,000 get selected. Success rate: <0.1%.',
          'State PSC (UPPSC, BPSC, MPPSC): typically 2–5 lakh apply, 5,000–15,000 clear Prelims, 500–2,000 selected. Success rate: 0.2–0.5%.',
          'State PSC papers are shorter and the analytical depth is lower. But state-specific questions (state history, geography, schemes) require separate preparation.',
        ],
      },
      {
        heading: 'Syllabus overlap',
        bullets: [
          'General Studies (History, Geography, Polity, Economy, Science): 70% common. UPSC goes deeper; state PSC covers more state-specific content.',
          'Current Affairs: UPSC asks conceptual questions; state PSC asks factual. Cover both with the same source + a state newspaper.',
          'CSAT / aptitude: most state PSCs have a qualifying aptitude paper, similar to UPSC CSAT.',
          'Optional subject: UPSC requires one optional for Mains. Most state PSCs do not have optional subjects.',
        ],
      },
      {
        heading: 'Salary and posting',
        bullets: [
          'IAS/IPS (UPSC): starting at ₹56,100 (Level 10) + DA + TA. Posting anywhere in India. Can become District Magistrate, Commissioner, Secretary.',
          'State Civil Service (PCS/SAS): same Level 10 pay in most states. Posting within the home state. Can become SDM, ADM, Joint Secretary at state level.',
          'In-hand salary is similar in the first 10 years. IAS has an edge in seniority, deputation opportunities (central government, UN), and protocol.',
        ],
      },
      {
        heading: 'Strategy: prepare for both',
        bullets: [
          'Use UPSC-level books for GS preparation — this automatically covers state PSC.',
          'Add a state GK book (state history, geography, current schemes) for 1–2 hours per week.',
          'Write UPSC Prelims and your state PSC prelims in the same year. If you clear the state PSC, you get a safety net while continuing UPSC.',
          'Many IAS officers started as state PCS officers and then got absorbed or re-applied. It is not "giving up" to join state services first.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-prepare-bank-po-3-months',
    title: 'How to Prepare for Bank PO in 3 Months — IBPS & SBI',
    description:
      'Complete 90-day preparation plan for IBPS PO and SBI PO exams. Section-wise strategy for Quantitative Aptitude, Reasoning, English, General Awareness.',
    readTime: '8 min read',
    category: 'Banking',
    categoryColor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300',
    updated: '2026-10-22',
    body: [
      {
        paragraphs: [
          'Bank PO exams have three stages: Prelims (qualifying), Mains (merit), and Interview. Three months is enough for Prelims + Mains if you already have basic aptitude. For absolute beginners, add one month of foundation work.',
        ],
      },
      {
        heading: 'Prelims pattern (IBPS PO / SBI PO)',
        bullets: [
          'English Language: 30 questions, 20 minutes.',
          'Quantitative Aptitude: 35 questions, 20 minutes.',
          'Reasoning Ability: 35 questions, 20 minutes.',
          'Total: 100 questions, 60 minutes. Sectional cut-offs apply — you must clear each section separately.',
          'Negative marking: 0.25 per wrong answer.',
        ],
      },
      {
        heading: 'Month 1 — build speed',
        bullets: [
          'Maths: finish Number Series, Simplification, Data Interpretation (bar/pie/table). These are 60% of the Prelims paper and speed-dependent.',
          'Reasoning: Puzzles and Seating Arrangement (linear, circular, floor-based) are the backbone. Practise 5 sets daily until you solve a 5-variable puzzle in 7 minutes.',
          'English: Reading Comprehension — read one passage of 400 words daily and answer 5 questions in 7 minutes. Start error spotting and fill in the blanks.',
          'Take one sectional test daily (20 minutes) to track speed.',
        ],
      },
      {
        heading: 'Month 2 — Mains focus',
        bullets: [
          'Maths: add Quadratic Equations, Quantity Comparison, Caselet DI, Missing DI. These are Mains-specific. Arithmetic word problems (partnership, pipes, trains, boats) need 30 minutes daily.',
          'Reasoning: add Input-Output, Machine, Coding-Decoding, Syllogism (5-statement), Data Sufficiency. Increase puzzle difficulty to 6–7 variables.',
          'English: add Sentence Rearrangement, Cloze Test, and Inference-based RC. Start practising the Descriptive English (letter + essay) for SBI PO Mains.',
          'General Awareness: start daily 30-minute current-affairs + banking awareness (RBI policies, financial terms, government schemes). This section is only in Mains but carries 40 marks.',
          'Take one full Mains mock every weekend.',
        ],
      },
      {
        heading: 'Month 3 — mock and analyse',
        bullets: [
          'One full Prelims mock every alternate day, one full Mains mock on remaining days.',
          'Target: Prelims — 55+ in 45 minutes (leave 15 minutes for review). Mains — 100+ out of 200.',
          'Analyse every mock: which questions took more than 90 seconds? Which were solvable but skipped? Adjust your attempt strategy.',
          'Last week: revise banking awareness notes, formula sheet, error log. No new topics.',
        ],
      },
      {
        heading: 'Interview preparation',
        paragraphs: [
          'Start only after Mains results. Typical questions: "Why banking?", "Tell me about yourself", current RBI governor and policies, your graduation subject, and state-specific awareness. Practise with a friend for 7 days. Dress formally. The interview carries 100 marks and is largely about communication and awareness, not knowledge depth.',
        ],
      },
    ],
  },
  {
    slug: 'police-physical-fitness-test-guide',
    title: 'Police Physical Test — Height, Run, Long Jump & Chest Standards',
    description:
      'Complete guide to police physical efficiency test (PET) standards for all state police forces. Height, weight, running, long jump, high jump and chest requirements.',
    readTime: '7 min read',
    category: 'Police',
    categoryColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
    updated: '2026-10-22',
    body: [
      {
        paragraphs: [
          'The physical test (PET/PST) eliminates more candidates than the written exam in police recruitment. Knowing the exact standards and preparing for 3–4 months before the date makes the difference between clearing and failing.',
        ],
      },
      {
        heading: 'Standard physical test components',
        bullets: [
          'Physical Standard Test (PST): height and chest measurement. This is pass/fail — either you meet the minimum or you are out.',
          'Physical Efficiency Test (PET): running (800m–5km depending on state), long jump, high jump, shot put, and sometimes pull-ups or push-ups.',
          'Some states (UP, Bihar, Rajasthan) conduct PET before the written exam; others (SSC GD, Delhi Police) conduct it after.',
        ],
      },
      {
        heading: 'Height requirements (male / female)',
        bullets: [
          'General male: 168–170 cm in most states. UP Police: 168 cm, Bihar: 165 cm, Rajasthan: 168 cm, SSC GD: 170 cm.',
          'General female: 152–157 cm. UP Police: 152 cm, SSC GD: 157 cm, Rajasthan: 152 cm.',
          'SC/ST/OBC relaxation: 2–5 cm less in most states.',
          'NE states / hill areas: 5 cm less for both male and female.',
          'Chest (male only): 79–83 cm unexpanded, 5 cm minimum expansion. SSC GD: 80 cm (77 for ST/hilly areas).',
        ],
      },
      {
        heading: 'Running standards',
        bullets: [
          'SSC GD (Male): 5 km in 24 minutes. (Female): 1.6 km in 8 min 30 sec.',
          'UP Police Constable (Male): 4.8 km in 25 minutes. (Female): 2.4 km in 14 minutes.',
          'Bihar Police (Male): 1 mile (1.6 km) in 6 min 30 sec. (Female): 1 km in 5 minutes.',
          'Rajasthan Police (Male): 5 km in 25 minutes. (Female): no running test (long jump instead).',
          'Delhi Police (Male): 1.6 km in 6 min 30 sec. (Female): 800m in 4 minutes.',
        ],
      },
      {
        heading: 'Preparation strategy',
        bullets: [
          'Start 4 months before the expected PET date. Week 1–4: build endurance with slow 3 km runs daily.',
          'Week 5–8: increase distance to 5 km. Add sprint intervals (200m fast + 200m walk × 10 sets).',
          'Week 9–12: time trials — run the exam distance twice a week under exam time. Rest days for long jump and high jump practice.',
          'Week 13–16: maintain fitness, reduce volume. Two runs per week, focus on technique and timing.',
          'Diet: eat protein-rich food (eggs, paneer, dal, chicken). Stay hydrated. Avoid junk food and late nights.',
          'On exam day: arrive early, warm up for 10 minutes, start at moderate pace (not sprinting), increase speed in the last 1 km.',
        ],
      },
    ],
  },
  {
    slug: 'government-job-salary-7th-pay-commission',
    title: 'Government Job Salary Structure — 7th Pay Commission Pay Levels Explained',
    description:
      'Complete guide to government salary structure under 7th Pay Commission. Pay matrix, DA, HRA, in-hand salary calculation for all levels from Group D to IAS.',
    readTime: '9 min read',
    category: 'Guide',
    categoryColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
    updated: '2026-10-22',
    body: [
      {
        paragraphs: [
          'Every central government employee is placed on a "Pay Level" from 1 to 18 under the 7th Pay Commission. Your total salary = Basic Pay + DA + HRA + TA + other allowances − deductions (NPS, income tax, CGHS). Understanding this structure helps you compare different posts.',
        ],
      },
      {
        heading: 'Pay matrix — key levels',
        bullets: [
          'Level 1 (₹18,000): Group D — MTS, Safai Karamchari, Peon.',
          'Level 2 (₹19,900): Group C — some LDC, Operator posts.',
          'Level 3 (₹21,700): Group C — Constable, Postman, LDC, Data Entry Operator.',
          'Level 4 (₹25,500): Group C — SSC CHSL posts (LDC/DEO in some departments).',
          'Level 5 (₹29,200): Group C — UDC, Accountant, SSC CGL Tax Assistant.',
          'Level 6 (₹35,400): Group B — SSC CGL Inspector, Auditor, Sub-Inspector.',
          'Level 7 (₹44,900): Group B — Assistant Section Officer (CSS), some departmental promotions.',
          'Level 8 (₹47,600): Group B — Section Officer, Bank PO starting.',
          'Level 10 (₹56,100): Group A — IAS/IPS/IFS probationer, CAPF Assistant Commandant.',
          'Level 11 (₹67,700): Group A — Senior Scale (IAS after 4 years).',
          'Level 13 (₹1,23,100): Group A — Director, DIG, Joint Secretary level.',
          'Level 14 (₹1,44,200): Group A — Additional Secretary, IG.',
          'Level 17 (₹2,25,000): Cabinet Secretary (highest paid civil servant).',
        ],
      },
      {
        heading: 'How to calculate in-hand salary',
        bullets: [
          'Dearness Allowance (DA): currently about 53% of basic pay. This changes every January and July.',
          'House Rent Allowance (HRA): 27% (X cities like Delhi/Mumbai), 18% (Y cities), 9% (Z cities) of basic pay.',
          'Transport Allowance: ₹3,600 (Level 1–2, X/Y cities), ₹7,200 (Level 3+, X/Y cities), ₹1,800 / ₹3,600 for Z cities.',
          'NPS deduction: 10% of (basic + DA). Government contributes 14%.',
          'CGHS: ₹250–500/month depending on level.',
          'Income Tax: calculated on total annual income after standard deduction and 80C investments.',
        ],
      },
      {
        heading: 'In-hand salary examples (October 2026, Delhi)',
        bullets: [
          'SSC MTS (Level 1, ₹18,000 basic): ~₹28,000–32,000 in-hand.',
          'SSC CHSL LDC (Level 4, ₹25,500 basic): ~₹38,000–43,000 in-hand.',
          'SSC CGL Inspector (Level 6, ₹35,400 basic): ~₹52,000–58,000 in-hand.',
          'Bank PO (Level 8 equivalent): ~₹55,000–62,000 in-hand.',
          'IAS Probationer (Level 10, ₹56,100 basic): ~₹80,000–90,000 in-hand + government accommodation.',
        ],
      },
      {
        heading: 'Other benefits not counted in salary',
        bullets: [
          'Government accommodation (or HRA if quarters are not available).',
          'Medical cover for self and family (CGHS/CS-MA). Free treatment at government hospitals.',
          'LTC (Leave Travel Concession): air/train fare for home visit once a year.',
          'Children Education Allowance: ₹2,250/child/month (maximum 2 children).',
          'Concessional loans: housing loan at 7–8% (banks offer staff loans at even lower rates).',
          'Pension (NPS): lump-sum + monthly annuity after retirement. 60% of NPS corpus is tax-free on withdrawal.',
        ],
      },
    ],
  },
  {
    slug: 'self-study-vs-coaching-government-exams',
    title: 'Self-Study vs Coaching for Government Exams — Which Works Better?',
    description:
      'Honest comparison of self-study and coaching for SSC, UPSC, Banking, Railway exams. When coaching helps, when it wastes time, and how to combine both approaches.',
    readTime: '6 min read',
    category: 'Strategy',
    categoryColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300',
    updated: '2026-10-22',
    body: [
      {
        paragraphs: [
          'The coaching industry in India is worth ₹58,000 crore. But the toppers of every exam include both coaching students and self-study candidates. The question is not which method is "better" — it is which method is better for you.',
        ],
      },
      {
        heading: 'When coaching helps',
        bullets: [
          'You have zero background in the subject (example: a science graduate preparing for UPSC humanities subjects).',
          'The exam has a structured syllabus and the coaching covers it completely in a fixed timeline (example: SSC CGL, Bank PO).',
          'You need external discipline — a schedule, daily targets, and someone checking your progress.',
          'You are preparing for interview-based exams (UPSC, PCS) and need mock interview practice.',
          'You have the budget (₹30,000–1,50,000 for offline coaching, ₹5,000–20,000 for online).',
        ],
      },
      {
        heading: 'When self-study wins',
        bullets: [
          'You are a working professional with limited, irregular hours.',
          'You already have a strong academic base (your school/college subjects overlap with the exam).',
          'The exam syllabus is publicly available and standard books exist (SSC, Railway, IBPS all fit this).',
          'You are a repeat aspirant — you know the syllabus and need practice, not lectures.',
          'You have access to free or low-cost resources: YouTube (Adda247, Unacademy free, Wifistudy), our PYQ section, free mocks.',
        ],
      },
      {
        heading: 'The hybrid approach (best for most)',
        bullets: [
          'Use free online lectures for conceptual clarity. Watch at 1.5x speed.',
          'Buy a test series from a reputed platform (₹500–1,500). Mocks are where coaching adds most value.',
          'Read one standard book per subject — do not follow coaching notes blindly.',
          'Join a study group (offline or Telegram/WhatsApp) for accountability and doubt-solving.',
          'If you need coaching for one subject (say Maths), take a subject-specific batch, not the full course.',
        ],
      },
      {
        heading: 'Red flags in coaching',
        bullets: [
          'Any institute that "guarantees selection" or claims "100% success rate" is lying.',
          'Coaching that runs for 12+ months for exams like SSC or Banking is padding time to justify fees.',
          'If the batch size is 200+ students and there is no personal feedback, you are paying for YouTube with a roof.',
          'Beware of "study material" that is just photocopied books or PDFs scraped from the internet.',
        ],
      },
    ],
  },
  {
    slug: 'current-affairs-preparation-strategy-competitive-exams',
    title: 'Current Affairs Preparation Strategy for Competitive Exams',
    description:
      'How to prepare current affairs efficiently for SSC, UPSC, Banking, Railway, and State PSC exams. Daily routine, best sources, revision techniques, and what to skip.',
    readTime: '7 min read',
    category: 'Strategy',
    categoryColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300',
    updated: '2026-10-22',
    body: [
      {
        paragraphs: [
          'Current affairs appears in every major government exam. In SSC CGL it is 25 questions, in banking it is 40, in UPSC Prelims it is 15–20 direct questions plus conceptual ones. Yet most candidates waste hours reading news without retaining anything.',
        ],
      },
      {
        heading: 'The 30-minute daily routine',
        bullets: [
          'Read one source: The Hindu or Indian Express (national coverage) or our Daily Current Affairs page. Do not read three newspapers.',
          'Focus on: government schemes, bills and acts, appointments, awards, summits, MoUs, defence exercises, space/science discoveries, environment reports.',
          'Skip: crime news, entertainment, opinion pieces, stock market daily movements, sports scores (only note tournament winners).',
          'Make 10–15 bullet-point notes in a notebook or digital app. Each note: what happened, which organization, why it matters.',
        ],
      },
      {
        heading: 'Weekly and monthly revision',
        bullets: [
          'Sunday: revise the week\u2019s notes in 30 minutes. Mark the 5 most likely exam questions.',
          'Month-end: take a 50-question current affairs quiz (use our Daily Quiz feature). Score below 35? Revise harder.',
          'Use monthly compilations from our blog or any standard source. Do not buy separate books — use one source consistently.',
        ],
      },
      {
        heading: 'Exam-specific focus',
        bullets: [
          'UPSC: conceptual questions — "Why was the Biodiversity Bill amended?" Not just "When was it passed?" Connect current events to Polity, Economy, Environment syllabus.',
          'SSC (CGL, CHSL, GD, MTS): factual one-liners — "Who won the 2026 Dronacharya Award?" Cover 6 months before the exam.',
          'Banking (IBPS, SBI, RBI): banking-specific — RBI monetary policy, repo rate changes, new bank mergers, SEBI regulations, government budget announcements.',
          'Railway: same as SSC level. Add railway-specific news (new trains, Vande Bharat, railway budget).',
          'State PSC: add state-specific current affairs — CM announcements, state budgets, new schemes, state awards.',
        ],
      },
      {
        heading: 'Static GK vs current affairs',
        paragraphs: [
          'Static GK (history, geography, polity, science) is 50–60% of the General Awareness section in most exams. Current affairs is 30–40%. Do not spend all your time on current affairs and ignore static GK. A good balance: 20 minutes of current affairs + 20 minutes of static GK daily.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-crack-ctet-first-attempt',
    title: 'How to Crack CTET in First Attempt — Paper 1 & Paper 2 Strategy',
    description:
      'Complete CTET preparation guide for first-time aspirants. Covers Paper 1 (Class 1–5) and Paper 2 (Class 6–8) syllabus, cut-off, best books, and study plan.',
    readTime: '8 min read',
    category: 'Teaching',
    categoryColor: 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300',
    updated: '2026-10-22',
    body: [
      {
        paragraphs: [
          'CTET (Central Teacher Eligibility Test) is conducted twice a year by CBSE. It is required for teaching positions in KVS, NVS, central schools, and many state government schools. The certificate is valid for life (since 2021). About 20–25 lakh candidates appear each session; the qualifying mark is 90/150 (60%).',
        ],
      },
      {
        heading: 'Paper 1 (Primary: Class 1–5)',
        bullets: [
          'Child Development & Pedagogy: 30 questions. Focus on Piaget, Vygotsky, Kohlberg, inclusive education, learning disabilities, NCF 2005.',
          'Language I (English/Hindi): 30 questions. Reading comprehension + pedagogy of language teaching.',
          'Language II: 30 questions. Similar to Language I but in a different language.',
          'Mathematics: 30 questions. Content (number system, fractions, geometry, data handling — Class 1–5 NCERT level) + pedagogy (how to teach maths, error analysis, NCF recommendations).',
          'Environmental Studies: 30 questions. Content (family, food, shelter, water, animals, plants — Class 3–5 NCERT) + pedagogy.',
        ],
      },
      {
        heading: 'Paper 2 (Upper Primary: Class 6–8)',
        bullets: [
          'Child Development & Pedagogy: 30 questions (same as Paper 1 but questions are at higher cognitive level).',
          'Language I and II: 30 + 30 questions.',
          'Mathematics & Science OR Social Studies: 60 questions. Choose based on your subject.',
          'Maths/Science: Class 6–8 NCERT level. Physics, Chemistry, Biology basics + Maths (algebra, geometry, data). Pedagogy included.',
          'Social Studies: History (ancient to modern India), Geography (India and world), Civics (Constitution, government). Pedagogy of social science.',
        ],
      },
      {
        heading: 'Best books',
        bullets: [
          'Child Development: Arihant or Disha CTET guide (CDP section) + NCERT "Educational Psychology" summary.',
          'Maths/Science: NCERT textbooks Class 1–8 are the primary source. Solve all exercise questions.',
          'Social Studies: NCERT History, Geography, Civics (Class 6–8). Lucent GK for quick revision.',
          'EVS: NCERT Class 3–5 EVS textbooks — most questions come directly from these.',
          'Previous year papers: solve last 10 years — CTET repeats question patterns extensively.',
        ],
      },
      {
        heading: '60-day study plan',
        bullets: [
          'Day 1–20: read NCERTs for your content subjects + CDP theory (Piaget, Vygotsky, Kohlberg, learning theories, inclusive education).',
          'Day 21–40: solve previous year papers topic-wise. Identify weak areas. Read Language pedagogy and NCF 2005 recommendations.',
          'Day 41–55: one full mock every alternate day. Target 110+ in both papers. Revise CDP notes and pedagogy concepts weekly.',
          'Day 56–60: revise error log, formula sheets, CDP mnemonics. Light practice only. No new topics.',
        ],
      },
      {
        heading: 'After CTET: which jobs?',
        paragraphs: [
          'With a valid CTET score: apply for KVS PGT/TGT/PRT (centralized, Level 6–8 pay), NVS (Level 7–8), Army Public Schools, and state government teacher posts that accept CTET. Many states also conduct their own TET (UPTET, REET, HTET) — the syllabus overlaps 80% with CTET, so prepare for both together.',
        ],
      },
    ],
  },
  {
    slug: 'ssc-gd-taiyari-kaise-kare',
    title: 'SSC GD की तैयारी कैसे करें — Complete Guide in Hindi',
    description:
      'SSC GD Constable की पूरी तैयारी गाइड — सिलेबस, बेस्ट बुक्स, फिजिकल टेस्ट टिप्स और 90-दिन की स्ट्रेटेजी हिंदी में।',
    readTime: '9 min read',
    category: 'SSC',
    categoryColor: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'SSC GD Constable हर साल 25,000–30,000+ vacancies लेकर आता है — BSF, CISF, CRPF, SSB, ITBP, AR, NIA और SSF में। 2024 cycle में 46,617 vacancies थीं। 10वीं पास candidates के लिए यह सबसे बड़ी central government recruitment है। अगर आप सही strategy से पढ़ें तो 90 दिन में selection possible है।',
        ],
      },
      {
        heading: 'SSC GD Syllabus — क्या पढ़ना है?',
        bullets: [
          'General Intelligence & Reasoning (25 questions, 25 marks): Analogy, Classification, Series, Coding-Decoding, Matrix, Word Arrangement, Venn Diagram, Blood Relation, Direction sense। इसमें practice से 20+ marks पक्के हैं।',
          'General Knowledge & General Awareness (25 questions, 25 marks): Indian History (Freedom struggle focus), Polity (Fundamental Rights, Parliament), Geography (Indian rivers, mountains), Current Affairs (last 6 months)। Lucent GK + monthly magazine enough है।',
          'Elementary Mathematics (25 questions, 25 marks): Number System, HCF/LCM, Percentage, Average, Ratio & Proportion, Time & Work, Time & Distance, SI/CI, Profit & Loss, Geometry basics। Level Class 10 तक का है — NCERT 6–10 Maths solve करो।',
          'English/Hindi (25 questions, 25 marks): Fill in the blanks, Error Spotting, Synonym/Antonym, Idioms & Phrases, One Word Substitution, Reading Comprehension। Hindi medium वालों के लिए Hindi section easy scoring है।',
        ],
      },
      {
        heading: 'Best Books for SSC GD',
        bullets: [
          'Reasoning: Kiran Publication SSC Reasoning Chapter-wise — सबसे popular book, previous year questions included।',
          'Maths: Rakesh Yadav Class Notes (Arithmetic) + Kiran SSC Mathematics — दोनों में से एक काफी है।',
          'GK: Lucent General Knowledge (Hindi) — इसे 3 बार पढ़ो, 80% GK questions cover हो जाएंगे।',
          'English: SP Bakshi Objective English (Arihant) — beginners के लिए best है।',
          'Previous Papers: Kiran SSC GD Previous Year Papers — last 5 years solve करना mandatory है।',
        ],
      },
      {
        heading: '90-दिन का Study Plan',
        bullets: [
          'Day 1–30: Syllabus complete करो — Maths (2 hours daily), Reasoning (1.5 hours), GK (1 hour), English/Hindi (1 hour)। NCERT 6–10 Maths और Lucent GK शुरू करो।',
          'Day 31–60: Previous year papers topic-wise solve करो। Weak areas identify करो और extra time दो। Daily 1 mock test शुरू करो।',
          'Day 61–80: Full-length mock tests — alternate day। Analysis में 1 hour लगाओ। Wrong questions की notebook बनाओ।',
          'Day 81–90: Revision only — Lucent GK quick revision, formula sheet, reasoning tricks notebook, current affairs last 6 months। कोई new topic मत पढ़ो।',
        ],
      },
      {
        heading: 'Physical Test — कैसे पास करें?',
        bullets: [
          'Male: 5 km दौड़ 24 minutes में (Ladakh/Kashmir/NE candidates को 6.5 km in 35 min)। Height 170 cm, Chest 80-85 cm।',
          'Female: 1.6 km दौड़ 8.5 minutes में। Height 157 cm।',
          'Physical training Day 1 से शुरू करो — written exam के बाद शुरू करोगे तो time नहीं मिलेगा। रोज़ सुबह 3–5 km running + stretching करो।',
          'दौड़ के लिए interval training best है: 400m sprint + 200m walk, 6–8 sets। हफ्ते में 2 दिन long distance (5 km) और 3 दिन interval training करो।',
          'Diet: Protein ज़्यादा लो (अंडे, दूध, दाल, चना), junk food avoid करो। Hydration important है — exam से 2 months पहले से discipline follow करो।',
        ],
      },
    ],
  },
  {
    slug: '10th-pass-sarkari-naukri-list',
    title: '10वीं पास सरकारी नौकरी 2026 — पूरी लिस्ट, सैलरी और योग्यता',
    description:
      '10वीं पास candidates के लिए सभी सरकारी नौकरियों की पूरी लिस्ट — Railway, SSC, Defence, Police और State Government jobs की सैलरी और आवेदन प्रक्रिया।',
    readTime: '10 min read',
    category: 'Guide',
    categoryColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'बहुत से students सोचते हैं कि 10वीं के बाद सरकारी नौकरी नहीं मिल सकती — यह गलत है। Central और State level पर हर साल लाखों vacancies सिर्फ 10th pass candidates के लिए निकलती हैं। Monthly salary 18,000 से 56,000+ तक जाती है (7th Pay Commission)। यहां पूरी list है जो 2026 में available है।',
        ],
      },
      {
        heading: 'Central Government — 10th Pass Jobs',
        bullets: [
          'SSC GD Constable: BSF, CISF, CRPF, ITBP, SSB में। Pay Level 3 (₹21,700–69,100)। Age 18–23। हर साल 25,000–46,000 vacancies।',
          'SSC MTS (Multi Tasking Staff): Ministries और offices में। Pay Level 1 (₹18,000–56,900)। Age 18–25। Typing test नहीं है, सिर्फ written exam।',
          'Railway Group D: Track Maintainer, Helper, Porter, Pointsman। Pay Level 1 (₹18,000–56,900)। RRB हर 2–3 साल में 1 lakh+ vacancies निकालता है।',
          'Indian Army Soldier (GD): 10th pass apply कर सकते हैं। Pay Level 3 (₹21,700–69,100) + allowances। Agniveer scheme 2022 से applicable।',
          'Indian Navy (MR): Matric Recruit — Cook, Steward, Hygienist। 10th pass with minimum marks। Pay Level 3।',
          'Indian Air Force (Group Y): 10th pass for some trades। Agniveer scheme applicable।',
        ],
      },
      {
        heading: 'State Government — 10th Pass Jobs',
        bullets: [
          'State Police Constable: हर state अपनी recruitment करता है — UP Police, Bihar Police, MP Police, Rajasthan Police। Salary ₹21,700–69,100 (Pay Level 3)। Physical test mandatory।',
          'Forest Guard / Van Rakshak: State Forest Department। Salary ₹18,000–56,900। Physical endurance test + written exam।',
          'Gram Rozgar Sahayak / Panchayat Secretary: कई states में 10th pass eligible। Salary ₹15,000–25,000 (state-dependent)।',
          'Home Guard / Civil Defence: Part-time government duty। Daily allowance basis। 10th pass eligible।',
          'State Transport Corporation (Driver/Conductor): UPSRTC, MSRTC, GSRTC etc.। 10th + driving license required for Driver। Salary ₹18,000–45,000।',
        ],
      },
      {
        heading: 'Salary Structure — 7th Pay Commission',
        bullets: [
          'Pay Level 1 (SSC MTS, Railway Group D): Basic ₹18,000 + DA (50%+) + HRA (city-dependent) = Take-home ₹25,000–32,000/month।',
          'Pay Level 3 (SSC GD, Army Soldier, Police): Basic ₹21,700 + DA + HRA = Take-home ₹30,000–40,000/month।',
          'Benefits: Pension (NPS), Health insurance (CGHS/ECHS), LTC, Children education allowance, 30+ days leave, job security।',
          '8th Pay Commission 2026 में expected — salary में 25–30% increase होने की संभावना है।',
        ],
      },
      {
        heading: 'आवेदन कैसे करें?',
        bullets: [
          'SSC: ssc.gov.in पर registration करो। SSC calendar हर December में आता है — सभी exams की dates मिल जाएंगी।',
          'Railway: rrcb.gov.in या region-wise RRB websites। Indian Railways की official notification PDF ज़रूर पढ़ो।',
          'Army/Navy/Air Force: joinindianarmy.nic.in, joinindiannavy.gov.in, agnipathvayu.cdac.in। Rally भर्ती state-wise होती है।',
          'State Police: Respective state police recruitment board website पर। Employment News (रोजगार समाचार) weekly check करो।',
          'Documents ready रखो: 10th marksheet, Aadhar card, Caste certificate (if applicable), Domicile, Passport size photos, Bank account details।',
        ],
      },
    ],
  },
  {
    slug: 'railway-group-d-taiyari-hindi',
    title: 'रेलवे ग्रुप डी की तैयारी कैसे करें — सिलेबस, बुक्स और स्ट्रेटेजी',
    description:
      'RRB Group D 2026 की complete preparation guide — exam pattern, syllabus, best books, study plan और previous year analysis हिंदी में।',
    readTime: '9 min read',
    category: 'Railway',
    categoryColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'Railway Group D (Level 1 Posts) Indian Railways की सबसे बड़ी recruitment है — 2024 cycle में 1,03,769 vacancies निकली थीं। Posts include Track Maintainer Grade-IV, Helper/Assistant in Electrical, Mechanical, S&T departments। 10th pass candidates apply कर सकते हैं। Pay Level 1 (₹18,000–56,900) + Railway passes + quarters।',
        ],
      },
      {
        heading: 'Exam Pattern — CBT (Computer Based Test)',
        bullets: [
          'Total Questions: 100 | Total Marks: 100 | Time: 90 minutes (120 min for PwBD)।',
          'Mathematics: 25 questions — Number System, BODMAS, Decimals, Fractions, LCM/HCF, Ratio & Proportion, Percentage, Mensuration, Time & Work, Time & Distance, SI/CI, Algebra, Geometry, Trigonometry, Statistics। Level 10th class तक।',
          'General Intelligence & Reasoning: 30 questions — Analogies, Alphabetical/Number Series, Coding-Decoding, Syllogism, Venn Diagram, Data Interpretation, Conclusion, Decision Making, Similarities & Differences, Analytical Reasoning, Classification, Directions, Statement-Argument।',
          'General Science: 25 questions — Physics, Chemistry, Biology (10th NCERT level)। Life processes, Chemical reactions, Force & Laws of Motion, Light, Electricity सबसे important topics।',
          'General Awareness & Current Affairs: 20 questions — Indian History, Culture, Geography, Economy, Polity, General Scientific awareness, Current events (last 6–8 months)।',
          'Negative Marking: 1/3 mark deducted per wrong answer। Random guessing avoid करो।',
        ],
      },
      {
        heading: 'Best Books — RRB Group D',
        bullets: [
          'Maths: RS Aggarwal (Quantitative Aptitude) — basics strong करने के लिए सबसे अच्छी। Railway specific questions के लिए Kiran Railway Maths।',
          'Reasoning: Arihant Reasoning (Verbal & Non-Verbal) by BS Sijwali — short tricks included। Practice के लिए Kiran Reasoning।',
          'General Science: NCERT Class 6–10 (Physics + Chemistry + Biology) — यह non-negotiable है। Lucent General Science for quick revision।',
          'GK & Current Affairs: Lucent GK (Hindi) + monthly current affairs magazine (Pratiyogita Darpan या Chronicle)। Railway specific GK: Kiran One-liner Approach।',
          'Previous Papers: RRB Group D 2018 + 2022 + 2024 papers ज़रूर solve करो — 30% questions repeat होते हैं patterns में।',
        ],
      },
      {
        heading: 'Topic-wise Strategy',
        bullets: [
          'Maths: Arithmetic पहले complete करो (Percentage, Ratio, Average, Time & Work, Speed & Distance) — ये 15–18 questions cover करते हैं। Geometry और Mensuration formulas रट लो।',
          'Science: Biology सबसे easy और scoring है — Human body systems, Diseases, Nutrition, Cell biology। Physics में Units, Motion, Force, Light focus करो। Chemistry में Chemical equations, Acids & Bases, Metals & Non-metals।',
          'Reasoning: Daily 50 questions solve करो। Series, Analogy, Classification — इन तीनों से 15+ questions आते हैं। Coding-Decoding और Blood Relations practice based हैं।',
          'GK: Static GK (History, Geography, Polity) Lucent से पढ़ो। Current Affairs — daily newspaper reading या monthly magazine। Railway specific: First train in India, Zone headquarters, Longest route, UNESCO Heritage sites on railway routes।',
        ],
      },
      {
        heading: 'Physical Efficiency Test (PET) — Written के बाद',
        bullets: [
          'Male: 35 kg weight उठाकर 100 meter carry (2 minutes)। 1000 meter दौड़ 4 minutes 15 seconds में।',
          'Female: 20 kg weight उठाकर 100 meter carry (2 minutes)। 1000 meter दौड़ 5 minutes 40 seconds में।',
          'PET qualifying है — marks नहीं जुड़ते। लेकिन fail हुए तो selection cancel। Running practice Day 1 से शुरू करो।',
          'Tips: सुबह खाली पेट running करो, interval training (400m fast + 200m slow) सबसे effective है। Weight carry के लिए deadlifts और farmer walks practice करो।',
        ],
      },
    ],
  },
  {
    slug: 'sarkari-naukri-salary-kitni-hoti-hai',
    title: 'सरकारी नौकरी में सैलरी कितनी होती है — Pay Level 1 से 18 तक',
    description:
      '7th Pay Commission के अनुसार सभी सरकारी नौकरियों की सैलरी — Pay Level 1 (Group D) से Pay Level 18 (Cabinet Secretary) तक पूरी details हिंदी में।',
    readTime: '8 min read',
    category: 'Guide',
    categoryColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'सरकारी नौकरी में सिर्फ basic salary ही नहीं मिलती — DA (Dearness Allowance), HRA (House Rent Allowance), TA (Transport Allowance), और कई अन्य allowances भी मिलते हैं। 7th Pay Commission (2016 से लागू) के अनुसार minimum basic pay ₹18,000 और maximum ₹2,50,000 है। 2026 में 8th Pay Commission आने की उम्मीद है जिसमें 25–30% और increase होगा।',
        ],
      },
      {
        heading: 'Group D Jobs — Pay Level 1–3',
        bullets: [
          'Pay Level 1 (₹18,000–56,900): SSC MTS, Railway Group D, Safai Karamchari। Basic + DA (50%+) + HRA = Take-home approx ₹25,000–32,000/month।',
          'Pay Level 2 (₹19,900–63,200): Junior Secretariat Assistant, LDC initial grade। Take-home approx ₹28,000–35,000।',
          'Pay Level 3 (₹21,700–69,100): SSC GD Constable, Army Soldier (GD), State Police Constable initial। Take-home approx ₹30,000–40,000।',
          'Example: एक SSC GD Constable (BSF) posted in Delhi — Basic ₹21,700 + DA ₹11,935 + HRA ₹5,208 + Transport ₹3,600 + Ration Money ₹3,000 = Gross approx ₹45,000। Deductions (NPS, CGHS) के बाद take-home ₹38,000–42,000।',
        ],
      },
      {
        heading: 'Group C Jobs — Pay Level 4–7',
        bullets: [
          'Pay Level 4 (₹25,500–81,100): SSC CHSL (LDC/DEO), Railway Clerk, Postal Assistant। Take-home ₹33,000–42,000।',
          'Pay Level 5 (₹29,200–92,300): UDC, Accountant, Senior Clerk। Take-home ₹38,000–48,000।',
          'Pay Level 6 (₹35,400–1,12,400): SSC CGL (Tax Assistant, Auditor, Sub-Inspector), Bank Clerk initial। Take-home ₹45,000–58,000।',
          'Pay Level 7 (₹44,900–1,42,400): CTET qualified Teacher (TGT), State PCS initial, Railway Station Master, Bank PO initial। Take-home ₹55,000–70,000।',
        ],
      },
      {
        heading: 'Group B & A Jobs — Pay Level 8–14',
        bullets: [
          'Pay Level 8 (₹47,600–1,51,100): Section Officer, Central Excise Inspector promoted, Assistant Professor initial। Take-home ₹60,000–75,000।',
          'Pay Level 10 (₹56,100–1,77,500): IAS/IPS/IFS probationer, Assistant Commissioner, DSP initial। Take-home ₹70,000–90,000।',
          'Pay Level 11 (₹67,700–2,08,700): Under Secretary, Deputy SP, Deputy Commissioner। Take-home ₹85,000–1,10,000।',
          'Pay Level 13 (₹1,23,100–2,15,900): Joint Secretary, DIG Police, Professor। Take-home ₹1,50,000–1,80,000।',
          'Pay Level 14 (₹1,44,200–2,18,200): Additional Secretary, IG Police। Take-home ₹1,80,000–2,20,000।',
        ],
      },
      {
        heading: 'Top Level — Pay Level 15–18 (Apex Scale)',
        bullets: [
          'Pay Level 15 (₹1,82,200–2,24,100): Secretary to Government, DGP। Take-home ₹2,30,000+।',
          'Pay Level 17 (₹2,25,000 fixed): Cabinet Secretary, COAS, CJI। Take-home ₹2,80,000+।',
          'Pay Level 18 (₹2,50,000 fixed): Currently only applicable to Cabinet Secretary in some cases।',
          'Note: IAS officers get official residence, car, domestic help, security — in-hand salary से ज़्यादा perks की value होती है।',
        ],
      },
      {
        heading: 'Salary के अलावा क्या-क्या मिलता है?',
        bullets: [
          'Pension (NPS): Government 14% contribute करती है, employee 10%। Retirement पर lump sum + monthly pension।',
          'Health: CGHS (Central Govt Health Scheme) — family को free/subsidized treatment। ECHS for Defence।',
          'LTC: Leave Travel Concession — 4 साल में 2 बार anywhere in India travel free।',
          'Education: Children education allowance ₹2,250/month per child (max 2 children)।',
          'Leave: 30 Earned Leave + 20 Half Pay Leave + 8 Casual Leave per year। Encashment option at retirement (max 300 days)।',
          'Loan: Government employees को housing loan, vehicle loan, personal loan low interest rates पर मिलता है।',
        ],
      },
    ],
  },
  {
    slug: 'bank-po-kaise-bane',
    title: 'Bank PO कैसे बनें — योग्यता, सिलेबस, सैलरी और तैयारी',
    description:
      'Bank PO बनने की पूरी जानकारी — IBPS PO और SBI PO का syllabus, eligibility, salary, exam pattern और step-by-step preparation strategy हिंदी में।',
    readTime: '9 min read',
    category: 'Banking',
    categoryColor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'Bank PO (Probationary Officer) भारत की सबसे popular government-level jobs में से एक है। IBPS PO (19 public sector banks) और SBI PO (State Bank of India) — दोनों exams हर साल होते हैं। Starting salary ₹52,000–65,000/month है allowances मिलाकर। Graduation (any stream) minimum qualification है — Engineering, Arts, Commerce, Science कोई भी stream चलता है।',
        ],
      },
      {
        heading: 'Eligibility — कौन apply कर सकता है?',
        bullets: [
          'Education: Any recognized university से Graduation (minimum). Final year students भी apply कर सकते हैं।',
          'Age: IBPS PO — 20 to 30 years। SBI PO — 21 to 30 years। OBC को 3 साल, SC/ST को 5 साल relaxation।',
          'Nationality: Indian citizen। Some banks accept Nepal/Bhutan nationals भी।',
          'Computer Knowledge: Basic computer literacy certificate या degree with computer subject — most banks यह requirement रखते हैं।',
          'Language: Hindi और English दोनों में काम करना आना चाहिए। Bilingual proficiency preferred।',
        ],
      },
      {
        heading: 'Exam Pattern — IBPS PO',
        bullets: [
          'Prelims (Qualifying): English (30 questions, 30 marks), Quantitative Aptitude (35 questions, 35 marks), Reasoning (35 questions, 35 marks)। Total 100 questions, 100 marks, 60 minutes। Sectional timing: 20 min each section।',
          'Mains (Merit): Reasoning & Computer Aptitude (45 questions, 60 marks), English (35 questions, 40 marks), Data Analysis & Interpretation (35 questions, 60 marks), General/Economy/Banking Awareness (40 questions, 40 marks)। Total 155 questions, 200 marks, 3 hours।',
          'Descriptive Paper: English — Letter Writing + Essay। 25 marks, 30 minutes। Minimum qualifying marks apply।',
          'Interview: 100 marks। Final selection = Mains (80%) + Interview (20%)।',
          'Negative Marking: 1/4th of marks allotted per wrong answer in both Prelims and Mains।',
        ],
      },
      {
        heading: 'Subject-wise Preparation Strategy',
        bullets: [
          'Quantitative Aptitude: Simplification और Number Series daily practice करो (speed बढ़ाने के लिए)। DI (Data Interpretation) — Pie chart, Bar graph, Line graph, Tabular, Mixed DI — हर type के 50+ sets solve करो। Arithmetic (Percentage, Profit & Loss, CI/SI, Ratio, Time & Work, Boats & Streams) — RS Aggarwal से basics, फिर Arun Sharma Advanced।',
          'Reasoning: Seating Arrangement (Linear + Circular), Puzzles — इनसे 15–20 questions आते हैं Mains में। Daily 5 puzzles solve करो। Coding-Decoding, Syllogism, Inequalities, Blood Relations — ये easy marks हैं, accuracy 100% रखो।',
          'English: Reading Comprehension daily 2 passages। Cloze Test, Error Detection, Sentence Improvement — grammar rules (Subject-Verb Agreement, Tenses, Prepositions) solid करो। Vocab: daily 20 new words (The Hindu Editorial से)।',
          'General Awareness: Banking Awareness — RBI policies, Repo Rate, CRR/SLR, recent bank mergers, financial inclusion schemes। Current Affairs — last 6 months। Static GK — important days, headquarters, currencies, awards। Monthly banking capsule (Oliveboard/Adda247) follow करो।',
          'Computer Aptitude: MS Office basics, Networking (LAN/WAN/Internet), DBMS basics, Computer generations, Memory types, Number system (Binary, Octal, Hex)। 2–3 days में cover हो जाता है।',
        ],
      },
      {
        heading: 'Salary और Career Growth',
        bullets: [
          'Starting Salary: Basic ₹36,000 (as per 12th Bipartite Settlement) + DA + HRA + other allowances = Take-home ₹45,000–55,000 in non-metro, ₹55,000–65,000 in metro cities।',
          'Perks: Leased accommodation या HRA, Medical insurance for family, LFC (Leave Fare Concession), Newspaper allowance, Fuel allowance (for officers)।',
          'Career Path: PO → Manager (3–4 years) → Senior Manager → Chief Manager → AGM → DGM → GM → ED → MD & CEO। Manager level salary ₹80,000–1,00,000+।',
          'Promotion: Performance-based + JAIIB/CAIIB exams pass करने पर increment मिलता है। CAIIB clear करो तो 2 advance increments।',
          'Retirement benefits: Pension (old pension for pre-2010 recruits, NPS for new), Gratuity, Provident Fund।',
        ],
      },
    ],
  },
  {
    slug: 'police-constable-bharti-taiyari',
    title: 'पुलिस कांस्टेबल भर्ती 2026 — हाइट, दौड़, सिलेबस और तैयारी',
    description:
      'Police Constable भर्ती 2026 की पूरी तैयारी गाइड — Physical test (height, chest, running), written exam syllabus, best books और state-wise details हिंदी में।',
    readTime: '9 min read',
    category: 'Police',
    categoryColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'Police Constable भर्ती हर state अपने level पर करता है — UP Police, Bihar Police, MP Police, Rajasthan Police, Delhi Police (SSC through), Maharashtra Police, etc.। हर साल combined 2–5 lakh vacancies आती हैं पूरे India में। 10th/12th pass (state-dependent) candidates eligible हैं। Salary Pay Level 3 (₹21,700–69,100) है। Physical fitness इस job की सबसे important requirement है।',
        ],
      },
      {
        heading: 'Physical Standards — State-wise',
        bullets: [
          'Height (Male): General — 168 cm (UP, Bihar, MP), 170 cm (Delhi, Rajasthan, Haryana)। OBC — same as General। SC/ST — 5 cm relaxation most states में।',
          'Height (Female): General — 152 cm (UP, Bihar), 157 cm (Delhi, Rajasthan)। SC/ST — 5 cm relaxation।',
          'Chest (Male only): Unexpanded 79–80 cm, Expanded 84–85 cm (5 cm expansion mandatory)। Rajasthan/Haryana में standards slightly higher हैं।',
          'Running (Male): 4.8 km in 25–28 minutes (UP), 5 km in 25 minutes (Delhi Police/SSC GD), 1600m in 5 min 30 sec (Rajasthan, MP)।',
          'Running (Female): 2.4 km in 14–16 minutes (UP), 1.6 km in 8.5 minutes (Delhi Police), 1 km in 5 min (Rajasthan)।',
          'Note: Physical test qualifying है, marks नहीं जुड़ते। लेकिन यहीं सबसे ज़्यादा candidates eliminate होते हैं। Training Day 1 से शुरू करो।',
        ],
      },
      {
        heading: 'Written Exam Syllabus (Common across states)',
        bullets: [
          'General Hindi / English: Grammar (Sandhi, Samas, Vilom, Paryayvachi for Hindi; Tenses, Articles, Prepositions for English), Reading Comprehension, Fill in the blanks। 25–30 questions।',
          'Reasoning / Mental Ability: Analogy, Series, Classification, Coding-Decoding, Direction Test, Venn Diagram, Blood Relation, Mirror Image। 25–30 questions।',
          'Numerical Ability: Number System, Simplification, Percentage, Ratio & Proportion, Profit & Loss, Average, Time & Work, Time & Distance, Mensuration, Basic Algebra। 25–30 questions।',
          'General Knowledge & Current Affairs: Indian History (especially Freedom Struggle), Indian Constitution, Geography, Science basics, Current events (last 6 months), State-specific GK (very important — 5–10 questions state ki history, geography, culture se aate hain)।',
          'Law & Constitution (some states): IPC sections (important ones like 302, 307, 376, 420), CrPC basics, Fundamental Rights, Directive Principles।',
        ],
      },
      {
        heading: 'Best Books — Police Constable',
        bullets: [
          'Reasoning: Kiran Reasoning (Hindi) — Police exam level के लिए perfect है। Short tricks included।',
          'Maths: Kiran SSC Mathematics (Hindi) — level same है Police और SSC GD का।',
          'GK: Lucent GK (Hindi) — 3 बार revise करो। State-specific GK के लिए state की dedicated book लो (जैसे UP GK के लिए "Uttar Pradesh Samanya Gyan" by Upkar)।',
          'Hindi: Lucent Hindi Grammar — Police exams में Hindi Grammar बहुत पूछी जाती है।',
          'Previous Papers: अपने state की last 5 year papers ज़रूर solve करो। Kiran या Youth Competition Times publications best हैं।',
        ],
      },
      {
        heading: 'दौड़ कैसे पास करें — Running Tips',
        bullets: [
          'Week 1–2: Slow jogging से शुरू करो — 2 km daily बिना रुके। Body को adapt होने दो। Stretching before and after ज़रूरी।',
          'Week 3–4: Distance बढ़ाओ — 3–4 km daily। Pace maintain करो, speed अभी मत बढ़ाओ।',
          'Week 5–8: Interval training शुरू करो — 400m sprint + 200m walk × 8 sets। हफ्ते में 2 दिन long run (5 km), 3 दिन interval, 1 दिन rest।',
          'Week 9–12: Speed work — 200m sprints, tempo runs (target pace पर 2–3 km continuous)। Mock test दो — actual distance time करो।',
          'Diet: सुबह खाली पेट running करो (sirf water ले सकते हो)। Dinner light रखो। Protein: eggs (4–6 daily), milk, paneer, sprouts, chicken। Junk food strictly avoid। 8 hours sleep mandatory।',
          'Common mistakes: नए shoes पहनकर exam में मत जाओ — 2–3 weeks पहले shoes break-in करो। Race day overhydration avoid करो। Warm-up 10 minutes ज़रूर करो।',
        ],
      },
    ],
  },
  {
    slug: 'current-affairs-kaise-padhe',
    title: 'करेंट अफेयर्स कैसे पढ़ें — Daily Routine और Revision Strategy',
    description:
      'Government exams के लिए current affairs कैसे याद करें — daily routine, best sources, revision technique, और topic-wise approach हिंदी में।',
    readTime: '7 min read',
    category: 'Strategy',
    categoryColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'Current Affairs हर government exam में 15–25% weightage रखता है — SSC, Banking, Railway, UPSC, State PCS सब में। फिर भी ज़्यादातर students last moment में cramming करते हैं और exam में 5–10 marks lose कर देते हैं। Problem यह नहीं है कि current affairs बहुत ज़्यादा है — problem यह है कि method गलत है। एक simple daily routine follow करो और revision system बनाओ।',
        ],
      },
      {
        heading: 'Daily Routine — कितना Time लगेगा?',
        bullets: [
          'Morning (30 minutes): एक newspaper पढ़ो — The Hindu या Indian Express (English); Dainik Jagran या Amar Ujala (Hindi)। सब कुछ मत पढ़ो: National news, Economy, International relations, Science & Tech, Government schemes — बस ये 5 sections पढ़ो।',
          'Evening (15 minutes): एक YouTube channel से daily current affairs video देखो — Study IQ, Drishti IAS, या Adda247। Speed 1.5x पर देखो। जो newspaper में miss हुआ वो यहां cover हो जाएगा।',
          'Night (15 minutes): दिनभर के notes को revise करो। One-liner format में एक diary/notebook में लिखो। Example: "RBI ने Repo Rate 6.25% पर unchanged रखा — April 2026 MPC meeting"।',
          'Total time: सिर्फ 1 hour daily। 6 months consistent रहो तो exam में 20+ marks guaranteed हैं current affairs section में।',
        ],
      },
      {
        heading: 'Best Sources — Exam-wise',
        bullets: [
          'SSC (CGL/CHSL/GD): Monthly magazine (Pratiyogita Darpan या Arihant Current Affairs) + last 6 months। Static GK ज़्यादा important है SSC में।',
          'Banking (IBPS/SBI): Oliveboard Monthly Banking Capsule (free PDF) — banking awareness + current affairs combined। RBI policies, mergers, financial schemes focus करो।',
          'Railway (NTPC/Group D): Last 8 months current affairs + Sports + Awards + National/International events। Kiran Railway Current Affairs book available।',
          'UPSC/State PCS: The Hindu Editorial daily + Yojana/Kurukshetra magazine monthly + Vision IAS Monthly Current Affairs। यहां analysis और opinion-based questions आते हैं।',
          'Free Resources: PIB (Press Information Bureau) daily summary — government announcements direct source से। Govt exam preparation apps: Testbook, Adda247 — daily current affairs quiz free।',
        ],
      },
      {
        heading: 'Revision Strategy — याद कैसे रखें?',
        bullets: [
          'Weekly Revision: हर Sunday 1 hour — पूरे हफ्ते की one-liners revise करो। Jo yaad nahi raha use highlight करो।',
          'Monthly Revision: महीने की 30 तारीख को 2 hours — पूरे month की compilation पढ़ो। Monthly capsule/PDF download करो और print निकालो।',
          'Topic-wise Notebooks: अलग-अलग sections बनाओ — Appointments, Awards, Sports, Schemes, Economy, International। जब revise करो तो topic-wise देखो, date-wise नहीं।',
          'Mnemonics और Tricks: Related items group करो। Example: 2026 में launch हुई schemes को एक mnemonic बनाओ। Association technique — किसी famous person या event से link करो।',
          'Quiz yourself: Passive reading से याद नहीं रहता। Daily 20 current affairs MCQs solve करो (Testbook/Adda247 app पर free available हैं)। Wrong answers note करो — वही exam में आएंगे।',
        ],
      },
      {
        heading: 'Common Mistakes — क्या NOT करें',
        bullets: [
          'Multiple sources follow मत करो — 1 newspaper + 1 YouTube channel + 1 monthly magazine enough है। ज़्यादा sources = confusion + time waste।',
          'Notes बनाकर कभी revise नहीं करना — यह सबसे बड़ी गलती है। Notes बनाने से ज़्यादा important revise करना है।',
          'Exam से 1 month पहले start करना — current affairs cumulative subject है, last moment cramming से 5–7 marks ही आएंगे max। 6 months पहले से शुरू करो।',
          'Entertainment और crime news पढ़ना — exam में Bollywood और crime news नहीं पूछी जाती। Newspaper में सिर्फ relevant sections पढ़ो।',
          'Handwritten notes vs Digital: जो comfortable हो वो करो — लेकिन एक ही जगह रखो। Phone में 10 apps और 5 notebooks में बिखरे notes किसी काम के नहीं।',
        ],
      },
    ],
  },
  {
    slug: 'government-exam-preparation-tips-hindi',
    title: 'सरकारी परीक्षा की तैयारी के 15 Golden Tips',
    description:
      'Government exam crack करने के 15 proven tips — time management, study plan, mock tests, revision strategy और motivation हिंदी में। SSC, Railway, Banking, UPSC सबके लिए applicable।',
    readTime: '8 min read',
    category: 'Strategy',
    categoryColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'हर साल करोड़ों students सरकारी exam की तैयारी करते हैं लेकिन selection rate 1–3% है। इसका मतलब यह नहीं कि exam impossible है — इसका मतलब है कि 97% students गलत तरीके से पढ़ रहे हैं। यहां 15 practical tips हैं जो toppers और selected candidates common follow करते हैं। ये tips SSC, Railway, Banking, UPSC — सभी exams पर apply होती हैं।',
        ],
      },
      {
        heading: 'Tip 1–5: Foundation बनाओ',
        bullets: [
          'Tip 1 — Syllabus पहले दिन print करो: किसी भी exam की तैयारी शुरू करने से पहले official syllabus PDF download करो और print निकालो। दीवार पर लगाओ। जो topic complete हो उसे tick करो। बिना syllabus के पढ़ना = बिना map के travel करना।',
          'Tip 2 — Previous year papers analyse करो before studying: Last 5 years के papers solve करो (या analysis देखो)। कौन से topics से कितने questions आते हैं — यह पता लगाओ। 20% topics से 80% questions आते हैं — वो 20% पहले पढ़ो।',
          'Tip 3 — एक ही source से पढ़ो: Maths के लिए 5 books, Reasoning के लिए 3 books — यह सबसे बड़ी गलती है। एक book choose करो और 3 बार revise करो। Multiple books = incomplete preparation।',
          'Tip 4 — NCERT underestimate मत करो: SSC, Railway, Police — सब exams में Science, Maths, Social Science questions NCERT Class 6–10 level के होते हैं। NCERT textbooks free हैं (ncert.nic.in) — download करो और chapter-wise solve करो।',
          'Tip 5 — Daily target बनाओ, monthly नहीं: "इस month Maths complete करूंगा" — यह fail होता है। "आज Percentage chapter complete करूंगा + 30 questions solve करूंगा" — यह work करता है। Daily achievable targets बनाओ और track करो।',
        ],
      },
      {
        heading: 'Tip 6–10: Practice और Mock Tests',
        bullets: [
          'Tip 6 — Mock tests Day 1 से दो: बहुत students "syllabus complete होने दो फिर mock दूंगे" कहते हैं — syllabus कभी complete नहीं होता। Incomplete preparation में भी mock दो — exam environment समझ आएगा, weak areas पता चलेंगे, time management सीखोगे।',
          'Tip 7 — Mock analysis > Mock attempt: Mock देने में 1 hour लगता है — analysis में 2 hours लगाओ। हर wrong answer का reason लिखो। Same mistake दोबारा नहीं होनी चाहिए। Error log notebook बनाओ।',
          'Tip 8 — Speed बढ़ाओ accuracy बनाए रखो: Government exams में 90% students syllabus तो जानते हैं लेकिन time में solve नहीं कर पाते। Speed building = daily 50+ questions under timer solve करो। Accuracy = negative marking से बचो, unsure questions छोड़ो।',
          'Tip 9 — Sectional practice daily करो: 1 din sirf Maths, 1 din sirf Reasoning — यह गलत approach है। हर दिन सभी subjects को touch करो। Brain को switching habit बनानी होती है — exam में भी sections switch करने होते हैं।',
          'Tip 10 — Short tricks सीखो but basics पहले: YouTube पर tricks देखकर shortcut से सवाल हल करना tempting है — लेकिन basic concept clear नहीं है तो trick apply नहीं कर पाओगे। Concept → Practice → Trick — इस order में सीखो।',
        ],
      },
      {
        heading: 'Tip 11–15: Lifestyle और Mindset',
        bullets: [
          'Tip 11 — Consistent 5 hours > Random 12 hours: "आज 14 hours पढ़ूंगा" — यह 2 दिन चलता है फिर burnout। Consistently रोज़ 5–6 focused hours (with breaks) पढ़ो — 3 months में results दिखेंगे। Pomodoro technique use करो: 50 min study + 10 min break।',
          'Tip 12 — Phone को दूर रखो: Study table पर phone मत रखो। Social media notifications, reels, messages — ये concentration destroy करते हैं। Study time में phone airplane mode पर रखो या दूसरे room में। Forest app या StayFocused app use करो।',
          'Tip 13 — Health ignore मत करो: 30 minutes daily exercise (walking/running/yoga), 7–8 hours sleep, proper meals — ये "waste of time" नहीं हैं, ये preparation का हिस्सा हैं। Tired brain कभी effectively retain नहीं करता। Physical test वाले exams (SSC GD, Police, Army) में तो health mandatory ही है।',
          'Tip 14 — Comparison बंद करो: "वो topper daily 16 hours पढ़ता है" — ज़्यादातर ऐसा नहीं होता। Topper smart पढ़ता है, ज़्यादा नहीं। अपना progress track करो — कल से बेहतर हो, बस इतना काफी है। Telegram groups और YouTube comments पढ़कर demotivate मत हो।',
          'Tip 15 — Backup plan रखो but give 100%: सरकारी exam पहले attempt में clear न हो तो demotivate मत हो — average selection 2nd या 3rd attempt में होता है। लेकिन साथ में skill development करो (typing, computer course, driving license) ताकि confidence बना रहे। Multiple exams simultaneously apply करो — SSC + Railway + State exam — overlap बहुत है।',
        ],
      },
      {
        heading: 'Bonus: Daily Schedule Template',
        bullets: [
          '6:00–7:00 AM: Exercise / Running (physical test preparation + fresh mind के लिए)।',
          '7:30–9:30 AM: Subject 1 — Maths/Quantitative Aptitude (morning में brain fresh रहता है, maths सुबह करो)।',
          '10:00–11:30 AM: Subject 2 — Reasoning/Logic (medium difficulty, mid-morning best time)।',
          '12:00–1:00 PM: Current Affairs + GK reading (light study before lunch)।',
          '2:30–4:00 PM: Subject 3 — English/Hindi (post-lunch slump में language practice easier है)।',
          '4:30–6:00 PM: Mock Test / Previous Year Papers (exam-like practice in afternoon simulates real exam timing)।',
          '7:00–8:00 PM: Revision — error log, formula sheets, one-liners (night revision = better retention)।',
          'Total focused study: 6–7 hours। Rest of the time — meals, rest, family, light entertainment। Consistency > Hours।',
        ],
      },
    ],
  },
  {
    slug: 'sarkari-naukri-kaise-paye',
    title: 'Sarkari Naukri Kaise Paye — Complete Guide in Hindi',
    description:
      'Sarkari naukri kaise milti hai, kaunse exams dene padte hain, eligibility kya hai — poori jankari ek jagah। 10th pass se lekar graduate tak sabhi ke liye government job guide।',
    readTime: '12 min read',
    category: 'General',
    categoryColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'India mein har saal lagbhag 2-3 crore log sarkari naukri ke liye apply karte hain। Government job ka craze isliye hai kyunki yahan job security, pension, medical benefits, aur fixed working hours milte hain। Private sector mein salary zyada ho sakti hai, lekin sarkari naukri ka stability aur respect alag hi level ka hai।',
          'Is article mein hum aapko batayenge ki sarkari naukri kya hoti hai, kitne type ki hoti hain, kaise apply karte hain, aur kaunse exams ki taiyari karni chahiye। Chahe aap 10th pass ho ya post-graduate, har level ke liye government jobs available hain।',
        ],
      },
      {
        heading: 'Sarkari Naukri Kya Hoti Hai?',
        paragraphs: [
          'Sarkari naukri ka matlab hai government department ya PSU (Public Sector Undertaking) mein permanent ya contractual job। Yeh Central Government, State Government, ya semi-government bodies ke under aati hai। In jobs mein 7th Pay Commission ke according salary milti hai, pension milti hai (NPS ke through), aur har saal DA (Dearness Allowance) badhta hai।',
        ],
        bullets: [
          'Central Government Jobs — SSC, UPSC, Railway, Banking, Defence ke through bharti hoti hai। Poore desh mein posting ho sakti hai।',
          'State Government Jobs — State PSC, State Police, State Education boards ke through। Posting sirf usi state mein hoti hai।',
          'PSU Jobs — BHEL, ONGC, SAIL, NTPC jaise public sector companies। GATE ya company-specific exam ke through bharti।',
        ],
      },
      {
        heading: 'Government Jobs Ki Categories — Group A, B, C, D',
        bullets: [
          'Group A: IAS, IPS, IFS, IRS jaise top posts। UPSC CSE se bharti। Salary 56,100–2,50,000 per month (basic pay)। Decision-making authority hoti hai, District Collector, Commissioner level positions।',
          'Group B: Income Tax Inspector, Central Excise Inspector, Section Officer। SSC CGL, State PSC se bharti। Salary 44,900–1,42,400 per month। Gazetted ya non-gazetted dono posts hote hain।',
          'Group C: Clerk, Stenographer, LDC, UDC, Constable, Postman। SSC CHSL, SSC GD, Railway NTPC se bharti। Salary 19,900–63,200 per month। Maximum sarkari vacancies isi group mein aati hain।',
          'Group D: Peon, Safai Karmchari, Track Maintainer, Helper। Railway Group D, SSC MTS se bharti। Salary 18,000–56,900 per month। 10th pass candidates ke liye sabse bade openings yehi hain।',
        ],
      },
      {
        heading: 'Eligibility — Kaun Apply Kar Sakta Hai?',
        bullets: [
          'Age: Zyaadatar exams mein minimum 18 aur maximum 27-32 years hota hai। OBC ko 3 saal, SC/ST ko 5 saal, aur PwD ko 10 saal ki age relaxation milti hai।',
          'Education: 10th pass (Railway Group D, SSC MTS), 12th pass (SSC CHSL, NDA, Airforce), Graduate (SSC CGL, UPSC, Banking PO), Post-graduate (NET, teaching posts)।',
          'Nationality: Indian citizen hona zaroori hai। Kuch posts mein domicile certificate bhi chahiye (state-level jobs)।',
          'Physical Standards: Defence, Police, aur Railway mein height, weight, chest, aur eyesight ki requirements hoti hain।',
        ],
      },
      {
        heading: 'Top Sarkari Naukri Exams Ki List',
        bullets: [
          'UPSC Civil Services (CSE): IAS, IPS, IFS — India ka sabse prestigious exam। Har saal ~1000 vacancies, 10 lakh+ applicants।',
          'SSC CGL: Tax Inspector, Auditor, Sub-Inspector — Graduates ke liye sabse popular exam। 15,000-20,000 vacancies average।',
          'SSC CHSL: LDC, DEO, Postal Assistant — 12th pass ke liye best central govt job exam।',
          'SSC GD Constable: BSF, CRPF, CISF, ITBP mein constable ki bharti — 25,000-70,000 vacancies aati hain cycle mein।',
          'RRB NTPC: Station Master, Goods Guard, Clerk — Railway ki non-technical posts।',
          'RRB Group D: Track Maintainer, Helper — 10th pass ke liye lakhs of vacancies।',
          'IBPS PO/Clerk: Bank mein PO ya Clerk ki naukri — har saal 10,000+ vacancies।',
          'State PSC: State-level IAS (SDM, DSP) — har state ka apna exam hota hai (UPPSC, MPPSC, BPSC, RPSC)।',
          'NDA: Army, Navy, Air Force mein officer entry — 12th pass ke liye, age 16.5-19.5 years।',
        ],
      },
      {
        heading: 'Taiyari Kaise Karein — Preparation Tips',
        bullets: [
          'Pehle exam ka syllabus aur pattern samjho। Bina syllabus padhe random books padhna time waste hai।',
          'Previous year papers solve karo — kam se kam last 5 saal ke। Yeh tumhe actual difficulty level aur important topics bata denge।',
          'Ek fixed daily routine banao: minimum 4-6 hours focused study। Subah ka time maths/reasoning ke liye best hai, raat ko revision karo।',
          'Current affairs ke liye daily ek newspaper (The Hindu ya Dainik Jagran) aur ek monthly magazine (Pratiyogita Darpan) enough hai।',
          'Mock test zaroor do — weekly ek full-length mock। Sirf padhne se exam nahi nikalta, practice se nikalta hai।',
          'Coaching optional hai — aaj YouTube par free content itna hai ki ghar baithe taiyari ho sakti hai। But discipline tumhe khud laani padegi।',
        ],
      },
      {
        heading: 'Online Apply Kaise Karein?',
        paragraphs: [
          'Zyaadatar sarkari naukri ke forms ab online hote hain। Sahi websites pe jaake apply karo — SSC ke liye ssc.gov.in, UPSC ke liye upsc.gov.in, Railway ke liye rrbapply.gov.in, Banking ke liye ibps.in। Fake websites se bachna — kabhi bhi kisi third-party site pe fees mat do।',
        ],
        bullets: [
          'Step 1: Official website par jaao aur "Latest Notifications" section check karo।',
          'Step 2: Registration karo — naam, email, phone number, DOB bharke OTP verify karo।',
          'Step 3: Application form fill karo — education details, category, photo, signature upload karo। Photo 20-50 KB, JPG format mein honi chahiye।',
          'Step 4: Exam fee pay karo — General/OBC ke liye 100-500 Rs, SC/ST/Women ke liye mostly free।',
          'Step 5: Final submit ke baad confirmation page ka printout le lo। Admit card exam se 10-15 din pehle website par aata hai।',
        ],
      },
      {
        heading: 'Common Mistakes Jo Avoid Karni Chahiye',
        bullets: [
          'Bahut zyada exams ke liye ek saath apply karna — focus 2-3 exams par rakho jo tumhare level ke hain।',
          'Sirf padhna aur test nahi dena — mock test ke bina speed aur accuracy develop nahi hogi।',
          'Negative marking ignore karna — SSC mein 0.50 aur UPSC mein 0.33 marks katte hain, tukka lagana risky hai।',
          'Form bharne ki last date ka wait karna — server crash hota hai last day, pehle hi apply karo।',
          'Social media par zyada time waste — "topper strategy" videos dekhne se toppers nahi bante, padhne se bante hain।',
        ],
      },
    ],
  },
  {
    slug: 'ssc-gd-constable-taiyari-kaise-kare',
    title: 'SSC GD Constable Ki Taiyari Kaise Karein — 2026 Complete Strategy',
    description:
      'SSC GD Constable exam ki complete taiyari guide — syllabus, physical test, study plan, best books, aur previous year paper analysis। BSF, CRPF, CISF mein constable banne ka poora roadmap।',
    readTime: '10 min read',
    category: 'SSC',
    categoryColor: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'SSC GD Constable exam har saal lakhs of vacancies ke saath aata hai — 2024 cycle mein 46,617 vacancies thi। Yeh exam BSF, CRPF, CISF, ITBP, SSB, Assam Rifles, aur SSF mein Constable (GD) ki bharti ke liye hota hai। 10th pass candidates ke liye yeh sabse bade government job opportunities mein se ek hai।',
          'Exam ka level moderate hai — agar 3-4 mahine seriously padho toh crack ho sakta hai। Lekin competition bahut zyada hai — pichle cycle mein 50 lakh+ candidates ne apply kiya tha। Is article mein hum step-by-step strategy denge jo actually kaam karti hai।',
        ],
      },
      {
        heading: 'SSC GD Kya Hai — Basic Samjho',
        bullets: [
          'Conducting Body: Staff Selection Commission (SSC)।',
          'Posts: Constable (General Duty) in CAPFs — BSF, CRPF, CISF, ITBP, SSB, Assam Rifles, SSF, aur Rifleman in AR।',
          'Selection Process: Computer Based Exam → Physical Efficiency Test (PET) → Physical Standard Test (PST) → Medical Exam → Document Verification।',
          'Salary: Pay Level-3, Rs 21,700 – 69,100 (basic pay)। In-hand salary allowances ke saath Rs 30,000-40,000 per month hoti hai, posting location ke hisaab se।',
          'Age Limit: 18-23 years (General), OBC ko 26, SC/ST ko 28 saal tak relaxation।',
        ],
      },
      {
        heading: 'Syllabus Breakdown — Kya Padhna Hai',
        paragraphs: [
          'SSC GD CBE mein 80 questions aate hain, 160 marks ke, aur time 60 minutes milta hai। Har galat answer par 0.50 marks katte hain। Paper 4 sections mein divided hai:',
        ],
        bullets: [
          'General Intelligence & Reasoning (20 questions, 40 marks): Analogy, Classification, Series, Coding-Decoding, Matrix, Word Formation, Venn Diagram, Blood Relation, Direction, Non-Verbal (Mirror Image, Paper Folding)।',
          'General Knowledge & General Awareness (20 questions, 40 marks): Indian History, Geography, Indian Polity, Economy basics, Current Affairs (last 6 months), General Science, Important Days, Awards।',
          'Elementary Mathematics (20 questions, 40 marks): Number System, HCF/LCM, Ratio & Proportion, Percentage, Average, Profit & Loss, Time & Distance, Time & Work, SI/CI, Geometry basics, Mensuration, Trigonometry (basic)।',
          'English / Hindi (20 questions, 40 marks): Fill in the blanks, Error Detection, Synonyms/Antonyms, Spellings, Idioms & Phrases, One Word Substitution, Reading Comprehension, Sentence Improvement।',
        ],
      },
      {
        heading: 'Physical Test Requirements — PET & PST',
        bullets: [
          'Running (PET): Male — 5 km in 24 minutes। Female — 1.6 km in 8.5 minutes। Ladakh/J&K ke candidates ko extra time milta hai।',
          'Height (PST): Male — 170 cm (General/OBC), 165 cm (SC/ST)। Female — 157 cm (General/OBC), 155 cm (SC/ST)। North-East aur hill area candidates ko 2-3 cm relaxation।',
          'Chest (Male only): Unexpanded — 80 cm, Expanded — 85 cm (minimum 5 cm expansion)। SC/ST ke liye 76 cm unexpanded।',
          'Weight: Body weight height aur age ke proportion mein hona chahiye। Medical exam mein check hota hai।',
          'Medical: Eyesight 6/6 aur 6/9 without glasses (correctable to 6/6 and 6/9), color blindness nahi honi chahiye, flat feet aur knock knees disqualify karte hain।',
        ],
      },
      {
        heading: 'Month-Wise Study Plan — 4 Mahine Ka Roadmap',
        bullets: [
          'Month 1 — Foundation: Maths ke basics strong karo (number system, percentage, ratio)। Reasoning ke har topic ke 20-30 questions solve karo। Daily ek chapter GK ka padho (Lucent se)। English/Hindi grammar rules revise karo।',
          'Month 2 — Practice Mode: Har din 50 Maths + 30 Reasoning questions solve karo। Previous year papers start karo — SSC GD ke last 3 cycles ke papers available hain free mein। Current affairs ke liye monthly capsule download karo।',
          'Month 3 — Mock Tests: Har din ek full-length mock do। Time management practice karo — 80 questions 60 minutes mein, matlab 45 seconds per question। Galat answers ka error log banao aur weekly revise karo।',
          'Month 4 — Revision + Physical: Sirf revision aur mock tests। Koi naya topic mat padho। Simultaneously running practice aur physical fitness maintain karo। Exam se 1 hafte pehle light revision aur rest।',
        ],
      },
      {
        heading: 'Best Books for SSC GD',
        bullets: [
          'Maths: Rakesh Yadav Arithmetic (Hindi/English) — short tricks ke saath, SSC level ke liye perfect।',
          'Reasoning: Kiran\'s SSC Reasoning — chapter-wise PYQs ke saath। Ya phir S. Chand by M.K. Pandey।',
          'GK/GS: Lucent\'s General Knowledge — static GK ka Bible hai। Current affairs ke liye Arihant ya Jagran Josh monthly capsule।',
          'English: SP Bakshi Objective General English — grammar aur vocabulary dono cover hota hai।',
          'Previous Year Papers: Kiran\'s SSC GD Previous Year Papers — solved with explanations। Yeh sabse important resource hai।',
        ],
      },
      {
        heading: 'Previous Year Papers Analysis — Kya Zyada Aata Hai',
        bullets: [
          'Maths mein Percentage, Ratio, Average, Time & Work se har paper mein 8-10 questions aate hain। Geometry aur Trigonometry se 3-4 questions।',
          'Reasoning mein Analogy, Series, aur Classification se 10+ questions guaranteed। Blood Relation aur Direction se 2-3 questions।',
          'GK mein Current Affairs (last 6 months) se 8-10 questions। Indian History (freedom struggle) se 3-4। Science (Biology basics) se 3-4।',
          'English mein Error Detection aur Fill in the Blanks se 6-8 questions। Reading Comprehension se 4-5 questions।',
          'Takeaway: Pehle high-weightage topics padho, phir baaki। 80% marks 40% syllabus se aate hain।',
        ],
      },
    ],
  },
  {
    slug: 'railway-group-d-bharti-2026',
    title: 'Railway Group D Bharti 2026 — Salary, Syllabus, Taiyari Tips',
    description:
      'Railway Group D 2026 ki poori jankari — vacancy details, salary structure, syllabus, exam pattern, aur selection process। RRB Group D ki taiyari kaise karein step by step।',
    readTime: '8 min read',
    category: 'Railway',
    categoryColor: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'Railway Group D India ki sabse badi sarkari bharti mein se ek hai। Last major cycle (CEN 02/2024) mein 1,03,769 vacancies thi — itni badi bharti kisi aur department mein nahi aati। Track Maintainer, Helper, Porter, Pointsman jaise posts aate hain jo 10th pass candidates ke liye hain।',
          'Railway ki naukri ka sabse bada advantage hai — free rail travel pass (family ke liye bhi), railway quarters, medical facilities, aur retirement ke baad pension। Posting apne home state ke paas milne ke chances bhi zyada hote hain (zone preference dete hain)।',
        ],
      },
      {
        heading: 'RRB Group D Kya Hai — Posts aur Vacancies',
        bullets: [
          'Track Maintainer Grade-IV: Railway track ki maintenance aur inspection। Maximum vacancies isi post mein hoti hain (60-70%)।',
          'Helper/Assistant: Mechanical, Electrical, S&T (Signal & Telecom) workshops mein helper ka kaam।',
          'Porter: Railway station par passengers ki madad, luggage handling।',
          'Pointsman: Railway track points operate karna, signals manage karna।',
          'Vacancies: Har cycle mein 50,000 se 1,00,000+ vacancies aati hain। Zone-wise apply karna hota hai (21 Railway Zones hain)।',
        ],
      },
      {
        heading: 'Eligibility — Kaun Apply Kar Sakta Hai',
        bullets: [
          'Education: 10th pass (matriculation) kisi recognized board se। ITI diploma walon ko preference milti hai kuch posts mein।',
          'Age: 18-33 years (General)। OBC ko 36, SC/ST ko 38 saal tak। Ex-servicemen ko additional relaxation।',
          'Nationality: Indian citizen। Nepal aur Bhutan ke citizens bhi eligible hain specific conditions ke saath।',
          'Medical: Visual acuity standards follow karne padte hain। Color vision normal honi chahiye (especially track maintainer ke liye)।',
        ],
      },
      {
        heading: 'Salary Structure — Kitna Milta Hai',
        paragraphs: [
          'RRB Group D Pay Level-1 mein aata hai 7th Pay Commission ke under। Basic pay Rs 18,000 se start hoti hai aur Rs 56,900 tak ja sakti hai। Lekin actual in-hand salary allowances milake zyada hoti hai:',
        ],
        bullets: [
          'Basic Pay: Rs 18,000 (starting)।',
          'Dearness Allowance (DA): Basic pay ka ~50% (2026 mein approximately Rs 9,000)।',
          'HRA: City ke category par depend karta hai — X cities mein 24%, Y mein 16%, Z mein 8% of basic।',
          'Transport Allowance: Rs 1,350 - 3,600 per month।',
          'Total In-Hand: Rs 28,000 - 35,000 per month approximately (city aur posting par depend karta hai)।',
          'Extra Benefits: Free rail travel pass (duty + privilege), railway quarters (subsidized), medical treatment (railway hospitals mein free), children education allowance।',
        ],
      },
      {
        heading: 'Exam Pattern aur Syllabus',
        paragraphs: [
          'RRB Group D ka exam Computer Based Test (CBT) hota hai। 100 questions, 100 marks, 90 minutes ka time। Har galat answer par 1/3 marks katte hain।',
        ],
        bullets: [
          'Mathematics (25 questions): Number System, BODMAS, Decimals, Fractions, LCM/HCF, Ratio & Proportion, Percentage, Mensuration, Time & Work, Time & Distance, SI/CI, Profit & Loss, Algebra, Geometry, Trigonometry, Statistics।',
          'General Intelligence & Reasoning (30 questions): Analogies, Classification, Series, Coding-Decoding, Venn Diagram, Data Interpretation, Conclusions, Statement-Assumptions, Syllogism, Blood Relations, Directions, Clock & Calendar।',
          'General Science (25 questions): 10th NCERT level Physics, Chemistry, Biology। Life Processes, Metals & Non-metals, Electricity, Light, Acids-Bases-Salts, Periodic Table।',
          'General Awareness & Current Affairs (20 questions): Indian History, Geography, Indian Polity, Economy, Current Events (last 6-8 months), Sports, Awards, Important Days, Books & Authors।',
        ],
      },
      {
        heading: 'Taiyari Ke Tips — Kaise Crack Karein',
        bullets: [
          'NCERT 10th tak ki Science books ache se padho — Group D ka science section almost poora NCERT se aata hai। Physics mein Electricity, Light, Motion; Chemistry mein Chemical Reactions, Acids-Bases; Biology mein Life Processes, Nutrition padho।',
          'Maths mein basic arithmetic strong karo — Percentage, Ratio, Time-Work, Time-Speed roz 30 questions solve karo। Advanced topics (Trigonometry, Mensuration) se 4-5 questions aate hain, pehle basics pakdo।',
          'Reasoning ke liye daily 20-30 questions practice karo — Analogy aur Series se zyada questions aate hain। Non-verbal reasoning (mirror image, paper folding) mat chhodna।',
          'Current Affairs: Exam se pehle ke 6-8 months ka current affairs padho। Railway-specific current affairs bhi aate hain (new trains launched, railway records, ministers)।',
          'PYQ papers solve karo — RRB Group D ke previous year papers freely available hain। Exam ka exact level samajh aa jayega। Minimum 20 papers solve karo before exam।',
          'Running practice abhi se shuru karo — CBT clear hone ke baad PET hota hai jismein 1000m run 4 min 15 sec mein (male) aur 5 min 40 sec mein (female) karna hota hai।',
        ],
      },
      {
        heading: 'Important Dates aur Apply Kaise Karein',
        bullets: [
          'Official website: rrbapply.gov.in — yehi ek legitimate site hai apply karne ki। Kisi bhi "railway recruitment" naam ki private site par fees mat do।',
          'Notifications Railway ki official website aur Employment News mein aate hain। RRB ki zone-wise websites bhi check karo (jaise rrbmumbai.gov.in, rrbpatna.gov.in)।',
          'Application Fee: General/OBC ke liye Rs 500, SC/ST/Female/Ex-Servicemen ke liye Rs 250। Fee ka Rs 400 CBT dene ke baad refund hota hai।',
          'Exam generally notification ke 3-6 months baad hota hai। Admit card exam se 10-15 din pehle available hota hai website par।',
          'Tip: Apna preferred RRB zone soch samajh ke bharo — posting usi zone mein hogi। Home state ke paas wala zone prefer karo agar convenience chahiye।',
        ],
      },
    ],
  },
  {
    slug: 'dasvi-pass-sarkari-naukri-list',
    title: '10th Pass Sarkari Naukri List 2026 — Dasvi Ke Baad Government Jobs',
    description:
      '10th pass ke baad kaunsi sarkari naukri mil sakti hai? Railway Group D, SSC GD, Army, Police, Postal GDS, MTS — complete list with salary, age limit, aur apply process।',
    readTime: '10 min read',
    category: 'General',
    categoryColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'Bahut log sochte hain ki sarkari naukri ke liye graduation zaroori hai — yeh galat hai। India mein kai aise government jobs hain jinke liye sirf 10th pass hona kaafi hai। Aur yeh koi chhoti jobs nahi hain — Railway Group D mein 1 lakh+ vacancies aati hain, SSC GD mein 46,000+ aati hain। Salary bhi 18,000-21,000 basic se start hoti hai jo allowances ke saath 25,000-40,000 per month ho jaati hai।',
          'Agar aapne 10th pass kar li hai aur age 18-27 ke beech hai, toh aapke paas bahut saare options hain। Neeche hum har ek job ke baare mein detail mein baat karenge — kya kaam hota hai, kitni salary milti hai, aur kaise apply karna hai।',
        ],
      },
      {
        heading: 'Railway Group D — Sabse Zyada Vacancies',
        bullets: [
          'Kya hai: Track Maintainer, Helper, Porter, Pointsman posts Indian Railways mein।',
          'Vacancies: Har cycle mein 50,000-1,00,000+ vacancies। Yeh 10th pass candidates ke liye sabse bada opportunity hai।',
          'Salary: Pay Level-1, Basic Rs 18,000। In-hand Rs 28,000-35,000 per month (posting location ke hisaab se)। Free railway pass, quarters, medical bhi milta hai।',
          'Exam: CBT (Computer Based Test) — 100 questions, 90 minutes। Maths, Reasoning, Science, GK se questions aate hain।',
          'Physical Test: 1000m run — Male 4 min 15 sec, Female 5 min 40 sec।',
          'Age: 18-33 years (General), OBC/SC/ST ko relaxation milti hai।',
        ],
      },
      {
        heading: 'SSC GD Constable — Defence Forces Mein Entry',
        bullets: [
          'Kya hai: BSF, CRPF, CISF, ITBP, SSB, Assam Rifles mein Constable (General Duty) ki bharti।',
          'Vacancies: 25,000-70,000 per cycle। Last cycle mein 46,617 vacancies thi।',
          'Salary: Pay Level-3, Basic Rs 21,700। In-hand Rs 30,000-40,000 per month। Free accommodation, ration, medical।',
          'Exam: 80 questions, 60 minutes — Maths, Reasoning, GK, English/Hindi।',
          'Physical: Male — 5 km run in 24 min, Female — 1.6 km in 8.5 min। Height: Male 170 cm, Female 157 cm।',
          'Age: 18-23 years (General)। Yeh strict hai — jaldi apply karo।',
        ],
      },
      {
        heading: 'Indian Army Soldier — Agniveer Scheme',
        bullets: [
          'Kya hai: Agniveer scheme ke under Indian Army mein 4 saal ki service। 25% candidates ko permanent retention milta hai।',
          'Posts: Soldier General Duty (10th pass), Soldier Technical, Soldier Clerk (12th pass ke liye)।',
          'Salary: First year Rs 30,000, second year Rs 33,000, third year Rs 36,500, fourth year Rs 40,000 per month। Plus Seva Nidhi fund 4 saal baad approximately Rs 11.71 lakh milta hai।',
          'Selection: Rally-based bharti hoti hai — Physical Fitness Test, Medical, Written Exam (CEE)।',
          'Age: 17.5-21 years। Bahut kam age limit hai, toh 10th ke turant baad apply karna chahiye।',
        ],
      },
      {
        heading: 'State Police Constable — Har State Mein Bharti',
        bullets: [
          'Kya hai: State Police mein constable ki bharti। UP Police, MP Police, Rajasthan Police, Bihar Police — har state apna exam conduct karta hai।',
          'Vacancies: State ke size par depend karta hai — UP Police mein 50,000+, Rajasthan mein 10,000+, Bihar mein 20,000+ vacancies aati hain cycle mein।',
          'Salary: Rs 21,700-25,500 basic (state par differ karta hai)। In-hand Rs 25,000-35,000 per month।',
          'Selection: Written Exam + Physical Test + Medical + Document Verification।',
          'Physical Test: 1600m run — Male 5-6 min, Female 3 min mein 1 km (state ke hisaab se vary karta hai)। Height: Male 168-172 cm, Female 152-160 cm।',
        ],
      },
      {
        heading: 'India Post GDS — Postal Department',
        bullets: [
          'Kya hai: Gramin Dak Sevak — village level par postal services operate karna। Branch Postmaster, Dak Sevak posts।',
          'Vacancies: 30,000-40,000 per cycle। Yeh merit-based hai — koi exam nahi, 10th marks ke basis par selection।',
          'Salary: Rs 12,000-14,500 per month (TRCA)। Yeh full government salary nahi hai — GDS ko "extra departmental" mana jaata hai। But regular karne ka provision hai 3 saal baad।',
          'Age: 18-40 years (General)। Bahut relaxed age limit hai।',
          'How to Apply: indiapostgdsonline.gov.in par apply karo। Pure merit-based hai — 10th mein jitne zyada marks utna acha।',
        ],
      },
      {
        heading: 'SSC MTS — Multi Tasking Staff',
        bullets: [
          'Kya hai: Central Government offices mein peon, gardener, messenger, safai karmchari jaise non-technical posts।',
          'Vacancies: 5,000-11,000 per cycle।',
          'Salary: Pay Level-1, Basic Rs 18,000। In-hand Rs 22,000-28,000 per month। AC office mein kaam, fixed hours, no physical stress।',
          'Exam: Session 1 — 40 Maths + 20 Reasoning (60 min)। Session 2 — 25 English + 75 GK (45 min)।',
          'Age: 18-25 years (General)। SC/ST ko 30 aur OBC ko 28 saal tak।',
          'Tip: MTS ka paper easy hota hai but cutoff bahut high jaati hai। Accuracy maintain karna zaroori hai — negative marking se bacho।',
        ],
      },
      {
        heading: 'Apply Kaise Karein — Step by Step',
        bullets: [
          'Sabse pehle apni age aur education check karo — har job ki alag eligibility hai।',
          'Official websites bookmark karo: ssc.gov.in, rrbapply.gov.in, joinindianarmy.nic.in, indiapostgdsonline.gov.in, state police ki official sites।',
          'Documents ready rakho: 10th marksheet, Aadhar card, caste certificate (agar applicable ho), passport size photo (3x4 cm), signature scan।',
          'Form bharte waqt ek valid email aur phone number use karo jo long-term accessible ho — admit card aur results isi par aayenge।',
          'Application fee mostly Rs 100-500 hoti hai। SC/ST aur female candidates ko exemption milta hai zyaadatar exams mein।',
          'Form submit hone ke baad printout le lo aur exam date ka wait karo। Admit card exam se 10-15 din pehle available hota hai।',
        ],
      },
    ],
  },
  {
    slug: 'bank-po-ki-taiyari-kaise-kare',
    title: 'Bank PO Ki Taiyari Kaise Karein — IBPS PO, SBI PO Strategy',
    description:
      'Bank PO exam ki complete preparation guide — IBPS PO vs SBI PO comparison, salary details, prelims & mains syllabus, section-wise taiyari tips, aur interview preparation।',
    readTime: '10 min read',
    category: 'Banking',
    categoryColor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'Bank PO (Probationary Officer) India ki sabse respected sarkari naukri mein se ek hai। Achi salary, AC office, 5-day working week, aur management level ki posting milti hai। IBPS PO se 11 public sector banks mein bharti hoti hai, jabki SBI PO specifically State Bank of India ke liye hai। Dono exams ka pattern similar hai lekin difficulty level alag hai।',
          'Har saal IBPS PO mein 4,000-6,000 aur SBI PO mein 2,000-4,000 vacancies aati hain। Graduation (kisi bhi stream se) ke baad apply kar sakte ho। Aaj ke time mein banking sector mein government jobs ka future stable hai kyunki PSU banks expand ho rahe hain।',
        ],
      },
      {
        heading: 'Bank PO Kya Hai — Role aur Responsibilities',
        bullets: [
          'Probationary Officer ek management-level post hai — tum directly officer grade mein join karte ho।',
          'Kaam: Customer handling, loan processing, account management, cash management, aur branch operations supervise karna।',
          'Probation Period: 2 saal ka probation hota hai jismein alag-alag branches mein training milti hai।',
          'Promotion: PO → Senior Manager → Chief Manager → AGM → DGM → GM → ED → Chairman। Growth bahut structured hai।',
          'Posting: Initially rural/semi-urban branch mein milti hai, phir experience ke saath urban branches mein transfer hota hai।',
        ],
      },
      {
        heading: 'IBPS PO vs SBI PO — Kya Fark Hai',
        bullets: [
          'IBPS PO: 11 public sector banks (PNB, BOB, Canara Bank, Union Bank, IOB, etc.) mein bharti karata hai। Ek exam se multiple banks mein chance milta hai। Paper moderate difficulty ka hota hai।',
          'SBI PO: Sirf State Bank of India ke liye। SBI India ka sabse bada bank hai — SBI PO ka paper IBPS se thoda harder hota hai, lekin salary bhi higher hai।',
          'Eligibility: Dono ke liye graduation zaroori hai (kisi bhi stream se, minimum 50-60% marks)। Age: 20-30 years (IBPS), 21-30 years (SBI)।',
          'Selection Process: Dono mein Prelims → Mains → Interview hota hai। IBPS mein Prelims 20:80 (Prelims:Mains) weightage, SBI mein Prelims sirf qualifying hai।',
          'Tip: Dono exams ki preparation saath mein ho sakti hai kyunki syllabus 80% same hai। Pehle IBPS PO do (October mein hota hai), phir SBI PO (December/January mein)।',
        ],
      },
      {
        heading: 'Salary Comparison — Kitna Milta Hai',
        bullets: [
          'IBPS PO: Basic pay Rs 36,000 (starting)। In-hand Rs 52,000-58,000 per month (city aur bank par depend karta hai)। HRA, DA, medical, LFC extra।',
          'SBI PO: Basic pay Rs 41,960 (starting)। In-hand Rs 58,000-65,000 per month। SBI ka salary structure IBPS se better hai।',
          'Allowances: House Rent Allowance (HRA) — metro cities mein Rs 7,000-12,000। Dearness Allowance (DA) — quarterly revise hota hai। Petrol allowance, newspaper allowance, entertainment allowance bhi milta hai।',
          'Perks: Subsidized home loan (8.5% se bhi kam rate), car loan, personal loan at concessional rates, medical insurance (family ke liye bhi), pension (NPS), gratuity।',
          'After 3-5 years: Salary Rs 80,000-1,00,000+ per month ho jaati hai promotions ke saath।',
        ],
      },
      {
        heading: 'Syllabus — Prelims + Mains',
        paragraphs: [
          'Prelims exam qualifying nature ka hai — iska score final merit mein nahi jodta (SBI mein)। IBPS mein Prelims ka 20% weightage hai। Prelims mein 100 questions, 60 minutes mein solve karne hote hain:',
        ],
        bullets: [
          'Prelims — English (30 questions, 30 marks): Reading Comprehension, Cloze Test, Error Detection, Para Jumbles, Fill in the Blanks।',
          'Prelims — Quantitative Aptitude (35 questions, 35 marks): Simplification, Number Series, Data Interpretation, Arithmetic (Percentage, Ratio, Profit-Loss, Time-Work, CI/SI)।',
          'Prelims — Reasoning (35 questions, 35 marks): Puzzles (Linear, Circular, Floor, Box), Syllogism, Blood Relation, Coding-Decoding, Inequality, Direction।',
          'Mains — Reasoning & Computer (45 questions, 60 marks, 60 min): Advanced puzzles, input-output, logical reasoning, computer fundamentals।',
          'Mains — Data Analysis & Interpretation (35 questions, 60 marks, 45 min): Data Interpretation sets (tables, charts, graphs), Data Sufficiency, Probability, Permutation-Combination।',
          'Mains — General/Economy/Banking Awareness (40 questions, 40 marks, 35 min): Banking terms, RBI policies, current affairs (last 6 months), financial awareness, budget highlights।',
          'Mains — English (35 questions, 40 marks, 40 min): RC, Error correction, Sentence rearrangement, Vocabulary, Formal letter writing।',
        ],
      },
      {
        heading: 'Section-Wise Preparation Strategy',
        bullets: [
          'Quantitative Aptitude: Pehle basic arithmetic master karo (Percentage, Ratio, CI/SI, Profit-Loss) — yeh Prelims ka backbone hai। Phir Data Interpretation pe focus karo — Mains mein DI se 15-20 questions aate hain। DI ke liye calculation speed zaroori hai — daily 15 min simplification practice karo।',
          'Reasoning: Puzzles aur Seating Arrangement se 60-70% paper banta hai। Roz 3-4 puzzles solve karo — pehle easy, phir medium, phir hard level। Time limit ke andar solve karna seekho — ek puzzle par 7-8 min se zyada mat lagao।',
          'English: Daily ek editorial padho (The Hindu ya Indian Express)। RC mein answer hamesha passage mein hota hai — apna opinion mat lagao। Grammar rules ke liye SP Bakshi ya Wren & Martin use karo। Vocabulary ke liye word list mat ratto — context mein seekho।',
          'General Awareness: Banking awareness ke liye basic banking terms (CRR, SLR, Repo Rate, MCLR, NEFT, RTGS) ratt lo — yeh fixed content hai। Current affairs ke liye last 6 months ka monthly capsule enough hai। Budget, RBI policies, aur government schemes par focus karo।',
          'Computer: Basic computer knowledge (MS Office, Internet, OS, Networking) — yeh scoring section hai aur 2-3 din mein cover ho jaata hai।',
        ],
      },
      {
        heading: 'Interview Tips — Final Selection Ka Last Step',
        bullets: [
          'Interview IBPS PO mein 100 marks ka aur SBI PO mein 50 marks ka hota hai। Mains ke marks + Interview ke marks se final merit banti hai।',
          'Banking knowledge zaroori hai — current RBI Governor, Deputy Governors, SBI Chairman, latest monetary policy, GDP growth rate, inflation rate, government schemes (PM Mudra, Jan Dhan, Startup India) yaad rakho।',
          'Self-introduction prepare karo — 2 minute ka, cover karo: naam, education, family background, hobbies, why banking sector, aur apni strengths।',
          'Common questions: "Why banking?", "Why not private sector?", "Where do you see yourself in 5 years?", "Tell me about your hometown", "What is NPA?", "What is KYC?" — in sabke crisp answers tayyar rakho।',
          'Formal dress code: Male — formal shirt, trousers, tie, polished shoes। Female — formal salwar suit ya saree। Confidence dikhao lekin over-confident mat ho। Agar answer nahi aata toh honestly bol do "I am not sure about this"।',
        ],
      },
    ],
  },
  {
    slug: 'upsc-ki-taiyari-ghar-par-kaise-kare',
    title: 'UPSC Ki Taiyari Ghar Par Kaise Karein — Self Study Guide',
    description:
      'Bina coaching ke UPSC IAS ki taiyari kaise karein? Self-study strategy, NCERT se shuru kaise karein, optional subject kaise choose karein, daily schedule, aur answer writing practice ki complete guide।',
    readTime: '15 min read',
    category: 'UPSC',
    categoryColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'UPSC Civil Services Exam (CSE) ko "India ka sabse mushkil exam" kaha jaata hai — lekin yeh myth hai ki iske liye Delhi jaake coaching lena zaroori hai। Har saal toppers mein 30-40% self-study se prepare karte hain। 2023 topper Aditya Srivastava ne ghar par baithe taiyari ki thi। Zaroori hai discipline, sahi resources, aur consistent effort — coaching nahi।',
          'Is article mein hum honestly batayenge ki ghar par UPSC taiyari karna kaise possible hai, kahan mushkil hai, aur kya strategy follow karni chahiye। Yeh guide un students ke liye hai jo financially ya geographically coaching join nahi kar sakte, ya jo self-study prefer karte hain।',
        ],
      },
      {
        heading: 'UPSC IAS Kya Hai — Exam Structure Samjho',
        bullets: [
          'Stage 1 — Prelims (June): 2 papers, MCQ based। Paper 1 (General Studies) — 100 questions, 200 marks, 2 hours। Paper 2 (CSAT) — 80 questions, 200 marks, 2 hours। CSAT qualifying hai (33%), sirf Paper 1 ke marks count hote hain cutoff ke liye।',
          'Stage 2 — Mains (September): 9 papers, subjective (descriptive writing)। 4 General Studies papers (250 marks each), 1 Essay paper (250 marks), 2 Optional subject papers (250 marks each), 2 qualifying language papers। Total merit marks = 1750।',
          'Stage 3 — Interview/Personality Test (March-April): 275 marks। UPSC board ke members poochte hain — personality, awareness, communication skills test hota hai।',
          'Final Merit: Mains (1750) + Interview (275) = 2025 marks total। Prelims ke marks count nahi hote — yeh sirf screening hai।',
          'Posts: IAS (District Collector/Secretary level), IPS (SP/DGP level), IFS (Ambassador), IRS (Commissioner), IRTS, IDES, aur 20+ services। Total ~1000 vacancies per year।',
        ],
      },
      {
        heading: 'Self-Study vs Coaching — Honest Comparison',
        paragraphs: [
          'Coaching ke advantages: structured schedule milta hai, doubt clearing hota hai, peer group milta hai, current affairs notes ready milte hain। Lekin coaching ki cost Delhi mein Rs 1.5-3 lakh hai (hostel alag), aur quality bahut vary karti hai। Bahut saari coaching institutes sirf notes bechti hain — actual teaching nahi hoti।',
        ],
        bullets: [
          'Self-study ka biggest advantage: apni pace se padh sakte ho। UPSC ka syllabus itna vast hai ki classroom mein sab cover nahi hota — ultimately khud padhna hi padta hai, coaching ho ya na ho।',
          'Self-study mein challenge: discipline maintain karna mushkil hai, doubt clearing ke liye mentor nahi hota, current affairs compile karna time-consuming hai।',
          'Solution: YouTube par free UPSC lectures available hain (Vision IAS, Drishti IAS, StudyIQ, Unacademy)। Telegram groups mein daily current affairs notes milte hain। Optional subject ke liye ek subject-specific test series join kar lo (Rs 3,000-5,000 mein mil jaata hai online)।',
          'Bottom line: Coaching ek shortcut hai, but zaroori nahi hai। Self-study mein 6-8 months extra lag sakte hain foundation build karne mein, lekin outcome same ho sakta hai।',
        ],
      },
      {
        heading: 'Optional Subject Kaise Choose Karein',
        paragraphs: [
          'Optional subject selection UPSC mein sabse important decision hai — yeh 500 marks ka hai (Mains ka 28%)। Galat optional lene se poora attempt barbaad ho sakta hai। Yahan kuch practical tips hain:',
        ],
        bullets: [
          'Graduation ka subject prefer karo — agar tumne History/Geography/Political Science/Sociology padhi hai toh wohi optional lo। Foundation already hai, kam time lagega।',
          'Popular optionals aur unke pros: Sociology (short syllabus, scoring, Hindi medium mein bhi accha), Geography (maps + diagrams se marks milte hain, overlap with GS), History (vast but predictable), PSIR (Political Science — current affairs se link, scoring), Public Administration (shortest syllabus, overlaps with GS-2)।',
          'Avoid karo: Science optionals (Maths, Physics, Chemistry) agar tumhare graduation marks 70% se kam hain। Literature optionals risky hain — scoring examiner par depend karta hai।',
          'Previous years ke results dekho: Topper list mein kaunse optionals zyada hain? Sociology, Geography, PSIR, History, Anthropology — yeh consistently top 50 mein dikhte hain।',
          'Test series se pehle ek attempt likh ke dekho — 3-hour mein 250 marks ka paper likhna bahut different hai padhne se। Agar comfortable lage toh wohi optional finalize karo।',
        ],
      },
      {
        heading: 'NCERT Se Shuru Karein — Foundation Building',
        paragraphs: [
          'UPSC ki taiyari NCERTs se shuru hoti hai — yeh non-negotiable hai। Class 6-12 ki NCERTs padho in subjects mein: History (Ancient, Medieval, Modern), Geography, Political Science, Economics, Science। Yeh base banata hai jis par baaki saari books build hoti hain।',
        ],
        bullets: [
          'Phase 1 (Month 1-2): Class 6-10 NCERTs — History, Geography, Civics, Science। Ek din mein ek book finish kar sakte ho (chhoti hoti hain)। Notes mat banao pehli reading mein — sirf samjho।',
          'Phase 2 (Month 2-3): Class 11-12 NCERTs — Indian History (Themes in Indian History Part 1, 2, 3), Geography (Fundamentals + India: People and Economy), Political Science (Indian Constitution at Work + Politics in India Since Independence), Economics (Indian Economic Development)।',
          'Phase 3 (Month 3-4): Standard reference books shuru karo — Laxmikanth (Polity), Spectrum (Modern History), Ramesh Singh (Economy), GC Leong (Geography)। NCERTs ke baad yeh books samajh mein aayengi, bina NCERTs ke yeh bahut heavy lagti hain।',
          'Tip: NCERTs ko 2 baar padho — pehli baar understanding ke liye, doosri baar short notes banane ke liye। UPSC seedhe NCERT se questions poochta hai — 2024 Prelims mein 15-20 questions NCERT based the।',
        ],
      },
      {
        heading: 'Answer Writing Practice — Mains Ki Real Taiyari',
        paragraphs: [
          'UPSC Mains ek writing exam hai — tumhe 3 hours mein 20 answers likhne hote hain (GS paper mein)। Itna fast aur structured likhna practice ke bina impossible hai। Bahut candidates Prelims clear kar lete hain lekin Mains mein fail ho jaate hain kyunki answer writing practice nahi ki hoti।',
        ],
        bullets: [
          'Day 1 se answer writing shuru karo — chahe tumhe lagta ho ki "abhi syllabus complete nahi hua"। Jitna padha hai utne se likh sakte ho। Writing practice aur reading saath-saath chalni chahiye।',
          'Structure: Introduction (2-3 lines) → Body (subheadings ke saath, bullet points allowed) → Conclusion (way forward ya balanced view)। Har answer mein diagram, flowchart, ya map use karo — examiner ka attention grab hota hai।',
          '150-word answer ko 7-8 min mein aur 250-word answer ko 12-15 min mein likhne ki practice karo। Timer lagao।',
          'Weekly 1-2 answers kisi experienced person se review karao — online mentors available hain Rs 500-1000 per month mein। Ya phir UPSC answer writing forums (ForumIAS, Insights on India) par peer review lo।',
          'PYQ (Previous Year Questions) ke answers likho — last 10 saal ke GS questions list banao, har week 5 answers likho। Gradually speed aur content dono improve hoga।',
        ],
      },
      {
        heading: 'Daily Schedule — Ghar Par Kaise Manage Karein',
        bullets: [
          '6:00-7:00 AM: Newspaper reading (The Hindu ya Indian Express)। Important news underline karo aur ek diary mein 5-line summary likho।',
          '7:30-9:30 AM: Static subject study (History/Geography/Polity/Economy — rotate daily)। Fresh mind mein heavy reading karo।',
          '10:00 AM-12:00 PM: Optional subject study। Yeh tumhara scoring paper hai — ise priority do।',
          '12:00-1:00 PM: Answer writing practice — 2 answers daily likho (1 GS + 1 Optional)।',
          '2:00-4:00 PM: Current affairs + revision। Monthly magazine ya daily current affairs notes padho। Previous notes revise karo।',
          '4:30-6:00 PM: MCQ practice / mock test (Prelims ke liye) ya essay writing practice (Mains ke liye)।',
          '7:00-8:00 PM: Light revision — maps, Art & Culture, environment topics। Ya YouTube par UPSC lecture dekho kisi specific topic par।',
          'Total: 8-9 hours focused study। Breaks, meals, exercise bhi important hain — burnout hone se bachna zaroori hai। Sunday ko half-day off lo — long-term consistency ke liye breaks zaroori hain।',
          'Working professionals: 4-5 hours daily nikaal sakte ho (early morning + after office)। 18-24 months ka time do preparation ko instead of 12 months।',
        ],
      },
    ],
  },
  {
    slug: 'police-bharti-physical-test-tips',
    title: 'Police Bharti Physical Test Tips — Running, Height, Weight Guide',
    description:
      'Police bharti ka physical test kaise clear karein? 1600m running tips, height-weight criteria (state-wise), training schedule, diet plan, aur common disqualification reasons — sab kuch detail mein।',
    readTime: '8 min read',
    category: 'Police',
    categoryColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'Police bharti mein written exam clear karna aadha kaam hai — asli challenge physical test mein hota hai। Har saal hazaron candidates written exam clear karke physical mein fail ho jaate hain। Running mein time nahi ban paata, ya height/weight/chest mein disqualify ho jaate hain। Agar aapne physical fitness pehle se prepare nahi ki toh last minute mein kuch nahi ho sakta।',
          'Is article mein hum state-wise physical requirements batayenge, running improve karne ke tips denge, training schedule suggest karenge, aur woh common mistakes batayenge jinki wajah se log disqualify hote hain। Yeh guide police constable, SI (Sub Inspector), aur SSC GD constable ke physical tests ke liye useful hai।',
        ],
      },
      {
        heading: 'Physical Test Requirements — State-Wise Comparison',
        bullets: [
          'UP Police Constable: Male — 1600m in 6 min 30 sec, Height 168 cm (Gen), 160 cm (SC/ST)। Female — 1600m in 8 min, Height 152 cm (Gen), 147 cm (SC/ST)। Chest: 79 cm unexpanded, 84 cm expanded (male only)।',
          'Rajasthan Police: Male — 5 km in 25 min, Height 168 cm। Female — 5 km in 35 min, Height 152 cm। Rajasthan mein long-distance running hoti hai — endurance zyada chahiye।',
          'MP Police: Male — 800m in 2 min 40 sec, Height 167.5 cm। Female — 800m in 3 min 30 sec, Height 152.4 cm। MP mein short distance hai — speed focus karo।',
          'Bihar Police: Male — 1 mile (1.6 km) in 6 min 30 sec, Height 165 cm। Female — 1 km in 5 min, Height 155 cm।',
          'SSC GD Constable (Central): Male — 5 km in 24 min, Height 170 cm (Gen)। Female — 1.6 km in 8 min 30 sec, Height 157 cm (Gen)।',
          'Delhi Police: Male — 1600m in 6 min 30 sec, Height 170 cm। Female — 800m in 4 min, Height 157 cm। Delhi Police ka physical slightly harder hai state police se।',
        ],
      },
      {
        heading: '1600m Running Tips — Time Kaise Improve Karein',
        paragraphs: [
          'Running sabse important part hai physical test ka — agar running clear nahi ki toh aage kuch nahi hoga। 1600m (4 rounds of 400m track) ko 6-6:30 min mein complete karna hai toh har 400m round 1:30-1:37 mein aana chahiye। Yeh achievable hai agar 2-3 mahine pehle se practice shuru karo।',
        ],
        bullets: [
          'Week 1-2: Base building — daily 2-3 km slow jogging karo, speed ki chinta mat karo। Goal hai ki bina ruke 15-20 min continuously daudo। Pehle din se fast mat bhaago — injury hogi।',
          'Week 3-4: Distance badhao 4-5 km daily। Pace thoda improve karo — 7-8 min per km target karo। Alternate days sprint practice karo — 200m fast + 200m slow repeat 4-6 times।',
          'Week 5-6: Interval Training shuru karo — 400m fast (1:25-1:30 sec mein) + 1 min rest, 4 rounds repeat। Yeh actual exam condition simulate karta hai। Week mein 3 din interval, 2 din long run (5 km)।',
          'Week 7-8: Time trials — har 3rd day 1600m full speed se run karo aur time note karo। Target 6 min se kam time। Speed endurance build ho rahi hogi ab।',
          'Race day tips: Pehle 2 rounds thoda conservative bhaago (1:35 pace), teesre round mein pace maintain karo, chauthe round mein sprint karo। Pehle round mein energy waste mat karo।',
          'Breathing: Nose se inhale, mouth se exhale। Rhythm banao — 2 steps inhale, 2 steps exhale। Agar saans phoolne lage toh pace slow karo but rokna mat।',
        ],
      },
      {
        heading: 'Height, Weight, Chest Criteria — Kya Kar Sakte Hain',
        bullets: [
          'Height: 18-21 saal ki age mein height naturally increase ho sakti hai। Hanging exercise (pull-up bar se latakna) daily 15-20 min karo — spine decompress hoti hai aur 1-2 cm difference aa sakta hai। Swimming bhi helpful hai।',
          'Weight: BMI (Body Mass Index) check hota hai medical mein। Underweight ya overweight dono mein problem hoti hai। BMI 18.5-24.9 ke beech hona chahiye। Height 170 cm hai toh weight 55-72 kg ke beech acceptable hai।',
          'Chest: Male candidates ke liye chest expansion minimum 5 cm chahiye (kuch states mein 4 cm)। Chest badhane ke liye: push-ups (daily 50-100), chest press, pull-ups, aur deep breathing exercises। 2-3 months mein 2-3 cm improvement possible hai।',
          'Flat Feet: Agar flat feet hai toh disqualify ho sakte ho। Check karo — wet feet ka impression paper par lo — agar poora sole dikhe toh flat feet hai। Arch support insoles use karo aur foot exercises karo, but severe flat feet ka treatment mushkil hai।',
        ],
      },
      {
        heading: 'Training Schedule — 12 Week Program',
        bullets: [
          'Monday: 1600m time trial + upper body workout (push-ups 4x25, pull-ups 3x10, shoulder press)।',
          'Tuesday: 5 km slow run (recovery day) + core exercises (plank 3x1 min, crunches 3x30, leg raises 3x20)।',
          'Wednesday: Interval training — 400m x 6 (fast) with 90 sec rest + chest exercises (push-ups, chest expander)।',
          'Thursday: Rest day ya light walking/stretching। Recovery bahut important hai — overtraining se injury hoti hai।',
          'Friday: 200m sprints x 8 with 1 min rest + long jump / high jump practice (kuch states mein yeh bhi hota hai)।',
          'Saturday: Long run 7-8 km at comfortable pace। Endurance build hoti hai — race ke din stamina kaam aayega।',
          'Sunday: Complete rest। Body recover hone do। Light stretching kar sakte ho।',
        ],
      },
      {
        heading: 'Diet Plan — Kya Khayein Physical Test Se Pehle',
        bullets: [
          'Protein: Roz 1.2-1.5 gm per kg body weight। Sources: eggs (4-6 daily), paneer, dal, chicken (non-veg khaate ho toh), soybean, milk, sprouts। Protein muscles repair karta hai training ke baad।',
          'Carbohydrates: Brown rice, roti, oats, banana, sweet potato। Yeh energy ka main source hai running ke liye। Training se 2 ghante pehle carb-rich meal lo।',
          'Hydration: Minimum 3-4 litre paani daily। Dehydration se performance 20-30% gir jaata hai। Race se 2 ghante pehle 500ml paani piyo, race ke just pehle nahi (stomach heavy lagega)।',
          'Avoid: Junk food, cold drinks, excess sugar, fried items, alcohol, smoking। Yeh sab endurance aur recovery dono kharab karte hain।',
          'Race day breakfast: Race se 3 ghante pehle light meal — 2 roti + dal ya oats + banana। Kuch naya mat khao race ke din — pet kharab hone ka risk hota hai।',
          'Supplements: Multivitamin daily, Electrolyte powder (ORS) training ke baad, banana for potassium (cramps prevent karta hai)। Steroids ya performance-enhancing drugs bilkul mat lo — medical mein detect hote hain aur lifetime ban lag sakta hai।',
        ],
      },
      {
        heading: 'Common Disqualification Reasons — In Se Bacho',
        bullets: [
          'Tattoo: Visible tattoo (forearms, hands, neck) disqualify karti hai zyaadatar police bharti mein। Small religious tattoo inner arm par allowed ho sakta hai (state ke rules par depend karta hai)। Agar tattoo hai toh pehle eligibility check karo।',
          'Flat Feet: Pehle bola — flat feet serious disqualification reason hai। Doctor se check karao pehle se।',
          'Varicose Veins: Pair ki veins mein swelling ya visible veins — medical mein check hota hai। Agar hai toh doctor se treatment lo।',
          'Color Blindness: Ishihara test hota hai medical mein। Partial color blindness bhi disqualify kar sakti hai kuch posts mein।',
          'Knock Knees / Bow Legs: Ghutne andar ya bahar ki taraf aate hain — disqualify hota hai।',
          'Overweight / Underweight: BMI range se bahar ho toh disqualify। 2-3 mahine pehle se weight manage karo।',
          'Fake documents: Galat age, height, caste certificate — permanently blacklist ho jaoge। Kabhi fake documents mat lagao।',
        ],
      },
    ],
  },
  {
    slug: 'government-jobs-after-12th-science',
    title: 'Government Jobs After 12th Science — 12th Ke Baad Sarkari Naukri',
    description:
      '12th Science ke baad kaunsi sarkari naukri le sakte hain? NDA, Railway, SSC CHSL, AFCAT, Nursing, Pharmacist, Lab Technician — complete list with exams, salary, aur preparation guide।',
    readTime: '10 min read',
    category: 'General',
    categoryColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          '12th Science pass karne ke baad zyaadatar students Engineering ya Medical college ki taraf bhagte hain। Lekin kya aap jaante hain ki 12th ke turant baad kai aise sarkari naukri ke exams hain jinhein crack karke seedha government job mil sakti hai? NDA se Army/Navy/Air Force officer ban sakte ho, SSC CHSL se Central Government mein clerk ban sakte ho, aur Railway mein bhi 12th pass ke liye kai posts hain।',
          'Science stream ke students ka advantage yeh hai ki zyaadatar competitive exams mein Maths aur Science se questions aate hain — jinmein tumhara base already strong hai। Is article mein hum har ek option detail mein cover karenge।',
        ],
      },
      {
        heading: 'NDA (National Defence Academy) — Officer Bano 12th Ke Baad',
        bullets: [
          'Kya hai: NDA India ka premier defence training institute hai (Pune mein)। 12th ke baad Army, Navy, ya Air Force mein officer entry ka yeh sabse popular route hai। UPSC NDA exam conduct karta hai — saal mein 2 baar (April aur September)।',
          'Eligibility: 12th pass (Science stream compulsory for Air Force and Navy)। Age: 16.5-19.5 years। Sirf unmarried male candidates eligible hain NDA ke liye (female candidates ke liye separate entry hai — CDS/AFCAT ke through)।',
          'Exam Pattern: Written Test (900 marks) — Maths (300 marks, 2.5 hours) + General Ability Test (600 marks, 2.5 hours)। SSB Interview (900 marks) — 5 days ka rigorous personality test।',
          'Training: 3 saal NDA (Pune) + 1 saal IMA/Naval Academy/AFA — total 4 saal training। Training ke dauran bhi stipend milta hai (Rs 56,100/month)।',
          'Salary after training: Lieutenant rank, Rs 56,100 basic + Military Service Pay + allowances = Rs 80,000-1,00,000 in-hand। Plus free accommodation, medical, canteen, travel perks।',
          'Tip: NDA ka maths paper 11th-12th level ka hota hai — agar PCM strong hai toh bahut advantage milta hai। Physics aur Chemistry ki NCERT achhe se padho — GAT mein Science section cover hota hai।',
        ],
      },
      {
        heading: 'SSC CHSL — Central Government Mein Clerk/DEO',
        bullets: [
          'Kya hai: SSC CHSL (Combined Higher Secondary Level) exam se Lower Division Clerk (LDC), Data Entry Operator (DEO), aur Postal/Sorting Assistant ki bharti hoti hai various Central Government ministries mein।',
          'Eligibility: 12th pass (kisi bhi stream se)। Age: 18-27 years।',
          'Vacancies: 3,000-5,000 per cycle।',
          'Salary: LDC — Pay Level-2, Rs 19,900 basic। In-hand Rs 25,000-35,000। DEO — Pay Level-4, Rs 25,500 basic। In-hand Rs 35,000-42,000।',
          'Exam Pattern: Tier-1 (CBT) — 100 questions, 60 min (Maths, English, Reasoning, GK)। Tier-2 — 3 sessions (Maths+Reasoning, English, GK+Computer)। Tier-2 ke marks se final selection hota hai।',
          'Advantage: AC office mein desk job, fixed 9:30-6 timing, weekends off, Central Government benefits (DA, HRA, LTC, medical)। Work-life balance best hota hai government jobs mein।',
        ],
      },
      {
        heading: 'Indian Air Force — Agniveer Vayu',
        bullets: [
          'Kya hai: Indian Air Force mein Agniveer scheme ke under Group X (Technical) aur Group Y (Non-Technical) posts mein 4 saal ki service।',
          'Eligibility: Group X — 12th with Physics + Maths (50% marks)। Group Y — 12th with any stream (50% marks)। Age: 17.5-21 years।',
          'Selection: Online Test (Maths, Physics, English, Reasoning) → Physical Fitness Test → Medical → Document Verification।',
          'Salary: Rs 30,000 per month (first year) se Rs 40,000 (fourth year) tak। Plus Seva Nidhi fund ~Rs 11.71 lakh after 4 years। 25% ko permanent retention milta hai।',
          'Advantage: Technical trade mein aircraft maintenance seekhne milta hai — private aviation industry mein bhi bahut demand hai iska। Agar permanent nahi hue toh bhi skillset valuable hai।',
        ],
      },
      {
        heading: 'Railway Jobs — NTPC aur Other Posts',
        bullets: [
          'RRB NTPC: Station Master, Goods Guard, Commercial Apprentice, Clerk — 12th pass ke liye Graduate level posts mein kuch 12th pass bhi eligible hain (undergrad category)। Salary Rs 19,900-35,400 basic।',
          'Railway Apprentice (Act Apprentice): ITI ke bina bhi 12th Science (PCM) ke basis par apprenticeship milti hai various Railway workshops mein। Stipend Rs 7,000-9,000 per month, lekin training ke baad permanent job ke chances hain।',
          'RPF Constable: Railway Protection Force mein constable — 12th pass eligible। Salary Rs 21,700 basic, Rs 30,000+ in-hand।',
        ],
      },
      {
        heading: 'Healthcare Government Jobs — Nursing, Pharmacist, Lab Tech',
        bullets: [
          'Staff Nurse: 12th Science ke baad BSc Nursing (4 years) ya GNM (3 years) karke government hospitals mein staff nurse ban sakte ho। AIIMS, ESIC, Railway Hospitals, State Government hospitals mein vacancies aati hain। Salary Rs 44,900 basic (Level 7) — Rs 60,000-75,000 in-hand।',
          'Pharmacist: 12th Science ke baad D.Pharma (2 years) karke government hospitals, CGHS dispensaries, railway hospitals mein pharmacist ban sakte ho। Salary Rs 25,500-35,400 basic।',
          'Lab Technician: 12th Science ke baad DMLT (2 years) karke government labs, hospitals mein lab technician। Salary Rs 19,900-25,500 basic।',
          'ANM/GNM: Auxiliary Nurse Midwife — 12th ke baad 2 saal ka course। PHC (Primary Health Centre) mein posting milti hai। Salary Rs 21,700-25,500 basic।',
          'Advantage: Healthcare government jobs mein demand hamesha rehti hai — recession-proof hai। Female candidates ke liye especially ache options hain।',
        ],
      },
      {
        heading: 'AFCAT — Air Force Officer (Graduates Ke Liye)',
        bullets: [
          'Kya hai: AFCAT (Air Force Common Admission Test) se Indian Air Force mein Flying, Technical, aur Ground Duty branches mein officer entry hoti hai। Graduation ke baad apply karna hota hai।',
          'Kyun mention kar rahe hain: Agar aap abhi 12th mein hain toh graduation ke baad ke liye planning kar sakte hain। Engineering ke baad Technical branch (salary Rs 56,100 basic + allowances) ya any graduation ke baad Ground Duty branch join kar sakte ho।',
          'AFCAT Exam: English, Numerical Ability, Reasoning, General Awareness, Military Aptitude। Paper moderate difficulty ka hota hai।',
          'Tip: 12th ke baad NDA + graduation ke baad AFCAT/CDS — dono attempts lo। Multiple chances matlab zyada probability।',
        ],
      },
      {
        heading: 'Salary Comparison Table — Quick Overview',
        bullets: [
          'NDA (after training): Rs 56,100 basic, Rs 80,000-1,00,000 in-hand — Highest among 12th level entries।',
          'Staff Nurse (BSc): Rs 44,900 basic, Rs 60,000-75,000 in-hand — Best for science (Bio) students।',
          'SSC CHSL (DEO): Rs 25,500 basic, Rs 35,000-42,000 in-hand — Best desk job option।',
          'SSC CHSL (LDC): Rs 19,900 basic, Rs 25,000-35,000 in-hand — Easiest to crack among these।',
          'RPF Constable: Rs 21,700 basic, Rs 30,000+ in-hand — Railway benefits extra।',
          'Agniveer (Air Force): Rs 30,000-40,000/month — 4 year contract, Seva Nidhi extra।',
          'Tip: Salary se zyada career growth dekho — NDA aur Nursing mein long-term growth sabse best hai।',
        ],
      },
    ],
  },
  {
    slug: 'current-affairs-daily-strategy-hinglish',
    title: 'Current Affairs Kaise Padhe — Daily Current Affairs Strategy',
    description:
      'Competitive exams ke liye current affairs kaise padhe? Daily reading sources, monthly magazine vs daily news, topic-wise tracking, revision technique, aur PIB/Yojana/Kurukshetra ki complete guide।',
    readTime: '8 min read',
    category: 'General',
    categoryColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'Current affairs har competitive exam mein aata hai — UPSC, SSC, Banking, Railway, State PSC — koi bhi exam lo, current affairs ka section hoga। Problem yeh hai ki daily itni news aati hai ki students confuse ho jaate hain — kya padhein, kya chhodein, kahan se padhein। Result? Ya toh sab padhne ki koshish mein overwhelm ho jaate hain, ya phir current affairs skip kar dete hain।',
          'Is article mein hum ek practical strategy denge jo actually kaam karti hai — kitna time lagana hai, kya sources use karne hain, kaise notes banana hai, aur kaise revise karna hai taaki exam mein yaad rahe।',
        ],
      },
      {
        heading: 'Current Affairs Ka Importance — Kitne Marks Aate Hain',
        bullets: [
          'UPSC Prelims: 100 mein se 25-35 questions directly ya indirectly current affairs se aate hain। Mains mein toh har paper mein current affairs link karna padta hai answers mein।',
          'SSC CGL/CHSL: General Awareness section mein 50-60% questions last 6 months ke current affairs se aate hain।',
          'Banking (IBPS/SBI): General Awareness section mein 70-80% questions current affairs se। Banking awareness (RBI policies, new schemes, mergers) bhi current affairs hi hai।',
          'Railway (NTPC/Group D): General Awareness mein 10-15 questions current affairs se (40 mein se)। Yeh deciding factor ban sakte hain kyunki Maths/Reasoning mein sab similar marks laate hain।',
          'State PSC: State-level current affairs + national current affairs dono aate hain। State-specific schemes, CM ki announcements, local events — yeh sab cover karna padta hai।',
        ],
      },
      {
        heading: 'Daily Reading Sources — Kya Padhein',
        bullets: [
          'Newspaper (30-40 min daily): The Hindu ya Indian Express — dono mein se koi ek choose karo, dono mat padho। National pages padho, editorial padho, Economy page padho। Local news, crime, sports skip karo (exam mein nahi aata)।',
          'Hindi Medium Students: Dainik Jagran ya Dainik Bhaskar — national news section padho। Ya phir The Hindu ka Hindi summary online available hai free mein।',
          'Free Online Sources: InsightsIAS Daily Current Affairs, Drishti IAS Daily News Analysis (Hindi + English), Vision IAS Current Affairs monthly PDF, GKToday daily quiz।',
          'YouTube (Optional): Drishti IAS daily video (15-20 min), StudyIQ daily current affairs, Unacademy free sessions। Video dekhna time-consuming hai — sirf tab dekho jab reading se samajh nahi aa rahi ho।',
          'Warning: Multiple sources mat padho — ek newspaper + ek online source + monthly magazine = enough। Zyada sources = confusion + time waste।',
        ],
      },
      {
        heading: 'Monthly Magazine vs Daily News — Kya Better Hai',
        paragraphs: [
          'Bahut students ke mann mein yeh confusion rehta hai — kya daily newspaper padhein ya monthly magazine se kaam chala lein? Answer hai: dono ka combination best hai, lekin agar ek hi choose karna ho toh monthly magazine better hai exam preparation ke liye।',
        ],
        bullets: [
          'Daily Newspaper ka role: Awareness build karna — kya ho raha hai desh-duniya mein, background samajhna, editorial se analytical thinking develop karna। UPSC Mains ke liye newspaper zaroori hai, Prelims ke liye optional।',
          'Monthly Magazine ka role: Exam-oriented compilation — sirf important news filtered hoti hai, MCQ format mein practice milti hai, topics organized hote hain। SSC, Banking, Railway ke liye monthly magazine sufficient hai।',
          'Best Monthly Magazines: Pratiyogita Darpan (Hindi), Competition Success Review, Arihant Current Affairs, Jagran Josh Monthly GK। Inki price Rs 30-60 hai — bahut sasta resource hai।',
          'Strategy: Agar UPSC prepare kar rahe ho — daily newspaper + monthly magazine dono padho। Agar SSC/Banking/Railway — sirf monthly magazine + weekly online capsule enough hai। Time save hota hai aur focused rehta hai content।',
        ],
      },
      {
        heading: 'Topic-Wise Tracking — Smart Notes Banana',
        paragraphs: [
          'Random notes banana sabse bada time waste hai current affairs mein। Ek diary mein sab likh rahe ho bina categories ke — exam ke time dhundh nahi paoge। Smart approach hai topic-wise tracking।',
        ],
        bullets: [
          'Categories banao: (1) Appointments & Resignations, (2) Awards & Honours, (3) Government Schemes, (4) Economy & Banking, (5) International Relations, (6) Defence & Security, (7) Science & Technology, (8) Environment & Ecology, (9) Sports, (10) Summits & Conferences, (11) Reports & Indices, (12) State-specific news।',
          'Har news item ko relevant category mein note karo — ek line mein। Example: "RBI Repo Rate 6.5% (Oct 2026) — unchanged for 5th time" → Economy & Banking mein likho।',
          'Google Sheets ya Notion use karo — searchable hoga, filter kar sakoge category-wise। Physical diary bhi chalti hai agar consistent ho toh।',
          'Monthly revision: Har month ke end mein saare categories revise karo। Jo facts 2-3 baar repeat hue hain woh important hain — unhe highlight karo।',
          'Tip: Dates aur numbers yaad karo — "kaun, kya, kab, kahan" format mein notes banao। Descriptive detail mat likho — exam mein MCQ aata hai, one-liner enough hai।',
        ],
      },
      {
        heading: 'Revision Technique — Yaad Kaise Rakhein',
        bullets: [
          'Spaced Repetition: Ek fact padhne ke baad use 1 din baad, 3 din baad, 7 din baad, 30 din baad revise karo। Har baar yaad karna easier hoga — yeh scientifically proven method hai (Ebbinghaus forgetting curve)।',
          'Weekly Quiz: Har Sunday 50 MCQs solve karo last week ke current affairs se। Free online quizzes available hain — GKToday, Testbook, Gradeup par daily quizzes hoti hain।',
          'Monthly Test: Har month end mein 100 MCQs ka test do — poore month ka current affairs cover karo। Yeh exam simulation hai — real exam mein bhi aise hi questions aayenge।',
          'Flashcards: Important facts ke flashcards banao (Anki app free hai)। Phone mein install karo — free time mein review karo। 500 flashcards mein 3-4 months ka current affairs cover ho jaata hai।',
          'Group Study: 2-3 friends ke saath weekly quiz karni chahiye — ek dusre se questions poochho। Competition se motivation bhi milti hai aur facts yaad bhi rehte hain।',
        ],
      },
      {
        heading: 'PIB, Yojana, Kurukshetra — Government Sources',
        paragraphs: [
          'Yeh teen sources government ki official publications hain aur UPSC ke liye bahut important hain। SSC/Banking ke liye yeh optional hain, lekin UPSC aspirants ke liye yeh must-read hain।',
        ],
        bullets: [
          'PIB (Press Information Bureau): Government ki official press releases yahan aati hain — new schemes, policy changes, Cabinet decisions। Daily 5-10 important releases aati hain। PIB ki website par "Highlights" section padho — 10 min mein ho jaata hai।',
          'Yojana Magazine (Monthly, Rs 22): Government schemes aur policies ki detailed analysis। UPSC Mains ke liye bahut useful — GS-2 aur GS-3 ke answers mein Yojana ka content directly use ho sakta hai। Hindi aur English dono mein available hai।',
          'Kurukshetra Magazine (Monthly, Rs 22): Rural development, agriculture, Panchayati Raj — GS-3 ke liye important। Agar time kam hai toh Kurukshetra skip kar sakte ho, Yojana zyada important hai।',
          'How to use: In magazines ko word-by-word mat padho। Sirf exam-relevant articles padho — article ka heading dekho, agar syllabus se related hai toh padho, nahi toh skip karo। Ek magazine 2-3 hours mein finish ho jana chahiye।',
        ],
      },
    ],
  },
  {
    slug: 'mahila-ke-liye-sarkari-naukri',
    title: 'Mahila Ke Liye Sarkari Naukri 2026 — Women Government Jobs',
    description:
      'Women ke liye best sarkari naukri options — Anganwadi, WCD, women police, teaching, banking, UPSC। Age relaxation, reserved posts, aur work-life balance — mahilaon ke liye complete government job guide।',
    readTime: '10 min read',
    category: 'General',
    categoryColor: 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'India mein sarkari naukri mein women participation tezi se badh rahi hai। 2024 mein UPSC toppers mein 30%+ women thi, Banking sector mein 40%+ employees women hain, aur Teaching mein toh majority women hai। Government bahut saari posts mein women-only vacancies nikaalti hai — Anganwadi Worker, WCD (Women and Child Development) posts, Women Police, aur kai aur।',
          'Sarkari naukri women ke liye isliye bhi attractive hai kyunki yahan work-life balance private sector se bahut better hai — fixed working hours, maternity leave (180 days paid), child care leave (730 days), aur transfer policies mein bhi relaxation milti hai। Is article mein hum un government jobs ki baat karenge jo specifically women ke liye beneficial hain।',
        ],
      },
      {
        heading: 'Women-Only Government Posts — Sirf Mahilaon Ke Liye',
        bullets: [
          'Anganwadi Worker/Helper: WCD (Women and Child Development) Ministry ke under। Har state mein lakhs of vacancies aati hain। 10th ya 12th pass eligible। Salary Rs 8,000-15,000 per month (state par depend karta hai)। Kaam: village level par nutrition, health education, pre-school education provide karna। Application state government ki website par hoti hai।',
          'Women Police Constable: Har state police mein women-only constable posts hoti hain। UP Police mein 20% reservation women ke liye। Salary Rs 21,700-25,500 basic। Physical test relaxed hota hai women ke liye (kam distance running, kam height requirement)।',
          'Women Helpline (181) Staff: State governments 181 women helpline operate karti hain — yahan counselors, operators, aur coordinators ki bharti hoti hai। Social work ya Psychology background preferred।',
          'ASHA Worker: Health department ke under village-level health worker। 10th pass eligible। Incentive-based salary Rs 6,000-10,000 per month। Training free milti hai। Women-only post hai।',
          'WCD Department Posts: Child Development Project Officer (CDPO), Lady Supervisor, Mukhya Sevika — State PSC ya direct bharti ke through। Graduate/Post-graduate women eligible hain।',
        ],
      },
      {
        heading: 'Age Relaxation for Women — Zyada Samay Milta Hai',
        paragraphs: [
          'Bahut saare government exams mein women candidates ko age relaxation milti hai — yeh ek bada advantage hai jo zyaadatar women candidates utilize nahi karti kyunki unhein pata hi nahi hota।',
        ],
        bullets: [
          'State PSC Exams: Bahut saare states mein women ko 5 saal ki extra age relaxation milti hai। Example — UPPSC mein General female ki max age 40 saal hai (male ke liye 35 saal)। MPPSC mein koi upper age limit nahi hai women ke liye।',
          'SSC Exams: SSC CGL mein women ko age relaxation nahi milti, lekin SSC GD mein Female candidates ka age limit 18-23 hai (same as male)। Lekin exam fee mein exemption milta hai (free hai women ke liye zyaadatar SSC exams mein)।',
          'Railway Exams: RRB NTPC aur Group D mein women ko koi extra age relaxation nahi hai, lekin application fee mein exemption milta hai।',
          'Banking: IBPS aur SBI exams mein women ko koi extra age relaxation nahi milti, lekin application fee exempt hai। Category-wise relaxation (OBC/SC/ST) toh milti hi hai।',
          'State Police: Zyaadatar states mein women police bharti mein age limit thoda relaxed hota hai। Physical test criteria bhi different (easier) hote hain women ke liye।',
          'Tip: Apni category (General/OBC/SC/ST) + gender (Female) dono ka relaxation check karo — combined benefit milta hai। Example: OBC Female ko OBC ka 3 saal + Female ka 5 saal = 8 saal relaxation mil sakta hai kuch exams mein।',
        ],
      },
      {
        heading: 'Top Exams for Women — Kya Prepare Karein',
        bullets: [
          'Teaching (CTET/STET/TET): Primary aur upper primary teacher banne ke liye। B.Ed ya D.El.Ed ke baad eligible। Government schools mein salary Rs 35,000-50,000 per month। Working hours 8 AM - 2 PM + summer/winter vacations। Women ke liye sabse popular government job — best work-life balance।',
          'Banking (IBPS PO/Clerk, SBI PO/Clerk): Graduation ke baad eligible। Bank PO salary Rs 52,000-65,000, Clerk salary Rs 28,000-35,000। 5-day working week, AC office, professional environment। Women ke liye safe aur comfortable workplace।',
          'SSC (CGL, CHSL, Steno): Central Government mein desk jobs — Income Tax, Customs, Postal, Courts mein posting। Fixed 9:30-6 timing, comfortable office work। Salary Rs 25,000-50,000 depending on post।',
          'UPSC (IAS/IPS/IFS): Toughest exam but sabse rewarding career। 2023 mein Top 10 mein 4 women thi। IAS/IPS mein work pressure zyada hai but respect, power, aur salary unmatched hai।',
          'Nursing/Paramedical: Government hospitals mein staff nurse — AIIMS, ESIC, Railway Hospitals। BSc Nursing ke baad salary Rs 44,900 basic। Healthcare mein women ki demand hamesha hoti hai।',
          'Anganwadi/ASHA: 10th-12th pass women ke liye — village/block level posting, kam competition, regular income। Long-term mein regularization ka chance bhi hota hai।',
        ],
      },
      {
        heading: 'Work-Life Balance in Government Jobs — Kyun Best Hai Women Ke Liye',
        paragraphs: [
          'Government job mein work-life balance private sector se kahin better hai — aur yeh women ke liye especially important hai jo family responsibilities bhi handle karti hain। Yahan kuch specific benefits hain jo sirf government employees ko milte hain:',
        ],
        bullets: [
          'Maternity Leave: 180 days (6 months) paid maternity leave — private sector mein maximum 26 weeks milti hai lekin bahut companies comply nahi karti। Government mein yeh guaranteed hai। Adoption ke case mein bhi maternity leave milti hai।',
          'Child Care Leave (CCL): 730 days (2 saal) CCL milti hai — 2 bacchon tak। 18 saal se kam age ke bacche ki care ke liye। Yeh leave pay ke saath milti hai (lekin ab leave encashment nahi hogi)। Private sector mein aisi koi leave nahi hoti।',
          'Fixed Working Hours: Government offices zyaadatar 9:30 AM - 5:30/6:00 PM chalte hain। Overtime culture bahut kam hai (unlike IT/corporate sector)। Saturday-Sunday off (Central Government mein), State Government mein 2nd/4th Saturday off।',
          'Transfer Policy: Women employees ko husband ki posting ke paas transfer milne mein priority hoti hai। "Spouse Ground" par transfer request kar sakte ho। Single women ko sensitive/remote areas mein posting nahi di jaati generally।',
          'Creche Facility: Central Government offices mein creche (child care facility) mandatory hai। Private sector mein sirf 50+ employees wali companies mein mandatory hai — government mein guarantee hai।',
          'Safety: Government offices mein Internal Complaints Committee (ICC) mandatory hai sexual harassment ke against। Posh Act strictly followed hota hai। Women helpline aur women cell bhi hoti hai har department mein।',
        ],
      },
      {
        heading: 'Preparation Tips — Women Candidates Ke Liye Special Advice',
        bullets: [
          'Family support lo: Ghar walon ko bataao ki exam preparation serious commitment hai — 6-12 months focused study chahiye। Household responsibilities share karo ya dedicated study hours fix karo jab koi disturb na kare।',
          'Online resources use karo: Ghar se padhai kar sakti ho — YouTube, Telegram groups, free PDFs, online test series। Coaching jaana zaroori nahi hai। Testbook, Gradeup, Oliveboard par free mock tests available hain।',
          'Time management: Agar working woman ho ya ghar ki responsibilities hain toh 4-5 focused hours nikaalo — subah 5-7 AM (sabse pehle uthke) + raat 9-11 PM (sabke sone ke baad)। Short but consistent study beats long irregular sessions।',
          'Women-specific scholarships: GATE mein women ko PG Scholarship milta hai (Rs 12,400/month)। SSC exam fees women ke liye free hai। Kai states mein competitive exam coaching ke liye women ko free coaching milti hai (MPPSC, UPPSC etc.)।',
          'Health aur fitness: Agar police ya defence ki taiyari kar rahi ho toh physical fitness par kaam karo abhi se। Running, strength training start karo। Healthy diet lo — iron deficiency bahut common hai women mein aur yeh energy level affect karta hai।',
          'Peer group banao: Online ya offline — 3-4 serious women aspirants ka group banao jo same exam prepare kar rahi hain। Motivation milta hai, notes share ho jaate hain, aur ek dusre ko accountable rakhte hain।',
        ],
      },
    ],
  },
  {
    slug: 'obc-ncl-certificate-kaise-banaye',
    title: 'OBC NCL Certificate Kaise Banaye — पूरी प्रक्रिया Step by Step',
    description:
      'OBC Non-Creamy Layer certificate kaise banaye — online aur offline dono process, zaroori documents, validity, aur common mistakes ki complete jankari Hindi mein.',
    readTime: '8 min read',
    category: 'Guide',
    categoryColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'Sarkari naukri mein OBC category ke candidates ko 27% reservation milta hai — lekin yeh benefit tabhi milega jab aapke paas valid OBC Non-Creamy Layer (NCL) certificate ho. Har saal lakho candidates ka form sirf isliye reject hota hai kyunki unka OBC NCL certificate galat format mein hota hai, expire ho chuka hota hai, ya Central Government ke liye valid nahi hota. Is article mein hum complete process samjhayenge — kaunse documents chahiye, online kaise apply karein, aur kaunsi galtiyan avoid karein.',
        ],
      },
      {
        heading: 'OBC NCL Certificate Kya Hota Hai',
        paragraphs: [
          'OBC NCL certificate do cheezein prove karta hai: (1) Aap OBC category mein aate hain, aur (2) Aapki family "Non-Creamy Layer" mein hai, matlab aapke parents ki annual income Rs 8 lakh se kam hai (2024 se yeh limit badhakar Rs 8 lakh ki gayi hai). Creamy Layer wale OBC candidates ko reservation ka benefit nahi milta — woh General category mein count hote hain.',
          'Yeh certificate Tehsildar / SDM (Sub-Divisional Magistrate) issue karte hain. Central Government jobs (SSC, Railway, UPSC) ke liye alag format hota hai aur State Government jobs ke liye alag. Dono mein difference samajhna zaroori hai warna form reject ho jayega.',
        ],
      },
      {
        heading: 'Zaroori Documents — Kya Kya Chahiye',
        bullets: [
          'Caste Certificate: Aapke father/grandfather ka caste certificate jo prove kare ki aap OBC category mein hain. Agar nahi hai toh pehle caste certificate banwana padega.',
          'Income Proof: Father ki income certificate (Rs 8 lakh se kam annual income). Agar father government employee hain toh salary slip, agar business hai toh ITR copy ya income certificate from Tehsildar.',
          'Aadhaar Card: Applicant aur father dono ka Aadhaar card zaroori hai identity proof ke liye.',
          'Ration Card: Family members ka proof — ration card ya family ID se family structure verify hota hai.',
          'Self-Declaration Affidavit: Rs 10 ke stamp paper par notarized affidavit ki aapki family creamy layer mein nahi aati. Kuch states mein yeh mandatory hai.',
          'Passport Size Photos: 2-4 recent passport size photographs.',
          'Residence Proof: Bijli bill, paani bill, ya koi bhi address proof jo aapka permanent address confirm kare.',
        ],
      },
      {
        heading: 'Online Process — Ghar Baithe Apply Karo',
        paragraphs: [
          'Zyaadatar states mein ab OBC NCL certificate online apply kar sakte ho. UP mein eSathi portal (edistrict.up.nic.in), Bihar mein RTPS portal (serviceonline.bihar.gov.in), MP mein Samagra portal, Rajasthan mein eMitra, Maharashtra mein Aaple Sarkar portal use hota hai.',
          'Process simple hai: (1) State portal par registration karo apne Aadhaar/mobile number se, (2) OBC NCL certificate option select karo, (3) Details bharo — name, father name, caste, income, address, (4) Documents upload karo (scanned copies — usually 100-500 KB, JPG/PDF format), (5) Fee pay karo (Rs 10-50 states ke hisaab se), (6) Application number note karo aur receipt download karo.',
          'Processing time 7-15 working days hota hai. Certificate online hi download ho jayega ya aapko Tehsil office se collect karna padega — yeh state par depend karta hai. Status tracking bhi portal par available hoti hai.',
        ],
      },
      {
        heading: 'Offline Process — Tehsil Office Mein',
        paragraphs: [
          'Agar online facility nahi hai ya koi problem aa rahi hai toh Tehsil office (Tehsildar / SDM office) mein jaake directly apply kar sakte ho. Prescribed format mein application form lo (office se ya online download karo), saare documents ki photocopy attach karo (original bhi saath le jaana verification ke liye), aur submit karo. Receipt lena mat bhoolna.',
          'Tehsildar office mein Patwari ya Kanungo verification ke liye aayega — aapke ghar ya mohalle mein jaake confirm karega ki aap OBC category mein hain aur income limit ke andar hain. Yeh verification 3-7 din mein ho jaata hai. Uske baad certificate issue ho jayega.',
        ],
      },
      {
        heading: 'Central vs State Format — Yeh Samajhna Zaroori Hai',
        paragraphs: [
          'Sabse important baat: Central Government jobs (UPSC, SSC, Railway, Banking) ke liye OBC NCL certificate CENTRAL format mein hona chahiye — isme likha hota hai ki candidate "Central List of OBCs" mein aata hai. State format mein sirf state-level OBC list mention hoti hai.',
          'Bahut saare candidates state format ka certificate laga dete hain central exam mein — aur form reject ho jaata hai. Central format mein specifically likha hota hai: "This is to certify that Shri/Smt _____ belongs to _____ community which is recognised as OBC under the Government of India, Ministry of Social Justice..." State format mein state government ka reference hota hai.',
          'Tip: Jab apply karo toh Tehsildar ko clearly batao ki "Central Government format mein chahiye" — woh alag proforma use karenge.',
        ],
      },
      {
        heading: 'Validity Period — Kab Tak Valid Hai',
        paragraphs: [
          'Central Government exams ke liye OBC NCL certificate ki validity bahut strict hai. UPSC mein certificate exam ke saal ke 1st April ya usse pehle ka hona chahiye (financial year ka pehla din). SSC mein bhi similar rule hai — notification mein clearly mention hota hai ki certificate kis date tak valid hona chahiye.',
          'Generally, OBC NCL certificate har 1 saal mein renew karwana chahiye central exams ke liye. State exams mein kuch states 3 saal tak valid maante hain. Lekin safe rehne ke liye har saal naya banwa lo — especially income certificate wala part, kyunki family income change ho sakti hai aur aap creamy layer mein aa sakte ho.',
        ],
      },
      {
        heading: 'Common Mistakes Jo Avoid Karni Hain',
        bullets: [
          'Galat format: Central job ke liye state format laga dena — yeh sabse common rejection reason hai.',
          'Expired certificate: Purana certificate use karna jiska validity khatam ho chuki hai. Har saal naya banwao.',
          'Income limit cross: Father ki income Rs 8 lakh se zyada ho gayi toh aap Creamy Layer mein aa jaoge — NCL certificate nahi milega. Income honestly declare karo.',
          'Spelling mistakes: Name, father name, caste name mein spelling galat hona — yeh DV (Document Verification) mein reject hone ka reason ban sakta hai.',
          'Wrong caste entry: Kuch OBC castes Central list mein hain lekin State list mein nahi, ya ulta. Apni caste Central OBC list mein verify karo (ncbc.nic.in par list available hai).',
        ],
      },
      {
        heading: 'Renewal Process',
        paragraphs: [
          'OBC NCL certificate renew karna almost same process hai jaise naya banana — kyunki har baar income verify hoti hai. Same documents lagao, same portal par apply karo. Bas purana certificate number bhi mention kar do toh process thoda fast hota hai.',
          'Pro tip: January-February mein certificate banwa lo — kyunki March-April mein exam forms nikalte hain aur us waqt Tehsil offices mein bahut rush hota hai. Last minute mein banwane gaye toh 15-20 din lag sakte hain aur form ki last date nikal jayegi.',
        ],
      },
    ],
  },
  {
    slug: 'ews-certificate-kaise-banaye',
    title: 'EWS Certificate Kaise Banaye — 10% आरक्षण के लिए प्रमाण पत्र',
    description:
      'EWS (Economically Weaker Section) certificate kaise banaye — income limit, zaroori documents, online apply process, validity, aur kaunse exams mein accepted hai.',
    readTime: '7 min read',
    category: 'Guide',
    categoryColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          '2019 mein 103rd Constitutional Amendment ke baad General category ke economically weaker candidates ko 10% reservation milne laga — education aur government jobs dono mein. Lekin yeh benefit tabhi milega jab aapke paas valid EWS certificate ho. Is article mein hum samjhayenge ki EWS kya hai, income limit kitni hai, documents kya chahiye, aur online kaise apply karein.',
        ],
      },
      {
        heading: 'EWS Kya Hai — Economically Weaker Section',
        paragraphs: [
          'EWS reservation sirf General category ke candidates ke liye hai — jo SC, ST, ya OBC category mein nahi aate. Yeh un families ke liye hai jinki annual household income Rs 8 lakh se kam hai aur jo kuch property conditions bhi fulfill karti hain.',
          'Conditions: (1) Family ki gross annual income Rs 8 lakh se kam ho (salary + business + agriculture + sabkuch milake), (2) Agricultural land 5 acres se kam ho, (3) Residential flat area 1000 sq ft se kam ho, (4) Residential plot area 100 sq yards (notified municipality mein) ya 200 sq yards (non-notified area mein) se kam ho. Agar in sab conditions mein se koi bhi violate hoti hai toh EWS certificate nahi milega.',
        ],
      },
      {
        heading: 'Zaroori Documents',
        bullets: [
          'Income Certificate: Family ki total annual income ka proof — ITR filing, salary slips, ya Tehsildar se income certificate.',
          'Aadhaar Card: Applicant aur family head ka Aadhaar card.',
          'Self-Declaration Affidavit: Stamp paper par notarized declaration ki aapki family income Rs 8 lakh se kam hai aur property limits ke andar hai.',
          'Ration Card / Family ID: Family members ka proof.',
          'Land Documents: Agar agricultural land hai toh khasra/khatoni nakal jo prove kare ki 5 acres se kam hai.',
          'Property Documents: Residential property ka proof (agar hai toh) — registry ya property tax receipt.',
          'Caste Certificate (Negative Proof): Kuch states mein certificate chahiye ki aap SC/ST/OBC mein nahi aate. General category ka proof.',
        ],
      },
      {
        heading: 'Online Application Process',
        paragraphs: [
          'EWS certificate bhi state ke e-district portal se apply hota hai — same portal jo income certificate aur caste certificate ke liye use hota hai. UP mein eSathi, Bihar mein RTPS, Rajasthan mein eMitra, MP mein MP Online, Maharashtra mein Aaple Sarkar.',
          'Steps: (1) Portal par login karo, (2) "EWS Certificate" option select karo, (3) Personal details bharo — name, father name, address, income details, (4) Property details bharo honestly, (5) Documents upload karo, (6) Fee pay karo (Rs 10-50), (7) Submit karo aur application number save karo.',
          'Offline process bhi available hai — Tehsildar office mein prescribed form bharo, documents attach karo, submit karo. Patwari verification ke baad certificate issue hoga. Processing time 7-15 days.',
        ],
      },
      {
        heading: 'Validity Aur Renewal',
        paragraphs: [
          'EWS certificate ki validity 1 financial year hai — matlab 1st April se 31st March tak. Har saal naya certificate banwana padta hai kyunki income verify hoti hai. Agar aapki family ki income next year Rs 8 lakh se upar ho gayi toh aap EWS eligible nahi rahoge.',
          'Important: Exam notification mein clearly likha hota hai ki EWS certificate kis financial year ka hona chahiye. Purana certificate accept nahi hoga. Isliye jis saal exam de rahe ho, usi saal ka certificate banwa lo — preferably April-May mein taaki poore saal use kar sako.',
        ],
      },
      {
        heading: 'Kaunse Exams Mein EWS Certificate Accept Hota Hai',
        bullets: [
          'UPSC: Civil Services, CDS, NDA — sabhi mein EWS reservation available hai. 10% seats reserved hain.',
          'SSC: CGL, CHSL, MTS, GD Constable — sabhi SSC exams mein EWS quota hai.',
          'Railway: RRB NTPC, Group D, ALP — sabhi railway exams mein 10% EWS reservation.',
          'Banking: IBPS PO, IBPS Clerk, SBI PO, SBI Clerk — banking exams mein bhi EWS quota hai.',
          'State Exams: Zyaadatar states ne EWS reservation implement kar diya hai — UPPSC, MPPSC, RPSC sabhi mein available.',
          'Defence: Army, Navy, Air Force — officer entry exams mein EWS reservation applicable hai.',
          'Note: Kuch older notifications mein EWS nahi tha — 2019 ke baad ke sabhi notifications mein hai.',
        ],
      },
    ],
  },
  {
    slug: 'sarkari-naukri-medical-test-guide',
    title: 'Government Job Medical Test Guide — क्या-क्या चेक होता है?',
    description:
      'Sarkari naukri ke medical test mein kya kya check hota hai — chest X-ray, blood test, eye test, hearing test, common rejection reasons, aur prepare kaise karein.',
    readTime: '10 min read',
    category: 'Guide',
    categoryColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'Written exam clear karna half battle hai — uske baad medical test mein bhi pass hona zaroori hai. Bahut saare candidates jo merit mein aate hain, medical mein unfit declare ho jaate hain kyunki unhe pata hi nahi tha ki kya kya check hota hai. Is guide mein hum detailed breakdown denge — har test ka purpose, standards, common rejection reasons, aur prepare karne ke tips.',
        ],
      },
      {
        heading: 'Medical Test Mein Kya Kya Check Hota Hai',
        paragraphs: [
          'Government job medical test mein usually yeh sab check hota hai: general physical examination, chest X-ray, blood test (CBC, blood sugar, blood group), urine test, eye test (visual acuity, color vision), hearing test, blood pressure, height-weight measurement, aur specific tests jo post ke requirement ke hisaab se hote hain.',
          'Medical test government hospital mein hota hai — Railway hospital, Civil hospital, ya designated military hospital. Private hospital ka medical certificate accept nahi hota. Test usually 1 din mein complete ho jaata hai, lekin kuch cases mein specialist referral ke liye 2-3 din lag sakte hain.',
        ],
      },
      {
        heading: 'Eye Test — Vision Standards',
        paragraphs: [
          'Eye test mein visual acuity (door ka dikhna), near vision, aur color vision check hota hai. Different posts ke liye different standards hain. Railway Group C/D mein usually Distant Vision 6/9 (better eye) aur 6/12 (worse eye) chahiye without glasses. SSC GD mein 6/6 aur 6/9 chahiye.',
          'Color blindness sabse common rejection reason hai eye test mein. Ishihara test hota hai — colored dots wale plates dikhate hain jisme number ya pattern chhupa hota hai. Agar color blind ho (partial ya complete) toh Railway, Police, Defence mein reject ho sakte ho. Lekin desk jobs (SSC CGL Tax Assistant, Auditor) mein color vision relaxed hoti hai.',
        ],
        bullets: [
          'Visual Acuity: Snellen chart se check hota hai — 6/6 matlab perfect vision, 6/9 matlab thoda kam but acceptable, 6/12 ya usse zyada matlab glasses chahiye.',
          'Color Vision: Ishihara plates se check hota hai. Partial color blindness mein kuch posts mil sakte hain, complete color blindness mein zyaadatar posts mein reject.',
          'Night Blindness: Defence aur Railway mein night vision bhi check hota hai.',
          'Squint (Bhengapan): Agar functional problem nahi hai toh usually accept hota hai.',
        ],
      },
      {
        heading: 'Common Rejection Reasons',
        bullets: [
          'Color Blindness: Sabse common reason — especially Railway, Police, Defence mein. Ishihara test fail karna matlab rejection.',
          'Flat Feet (Pes Planus): Police aur Defence mein flat feet check hote hain. Wet footprint test hota hai — agar sole ka arch nahi dikhta toh flat feet hai. Grade 1 flat feet mein usually accept hota hai, Grade 2-3 mein reject.',
          'Varicose Veins: Pairo ki nason mein sujan — standing jobs (Police, Railway) mein reject ho sakte ho. Early stage mein treatment possible hai.',
          'Knock Knees / Bow Legs: Ghutno ka andar ya bahar jhukna — Police aur Defence mein reject. Measurement hoti hai — specific degrees tak allowed hai.',
          'Tattoo: Visible tattoo (hands, face, neck) Defence mein reject. Body ke covered parts par small tattoo usually allowed. Police mein state ke rules alag hote hain.',
          'Hernia: Agar hernia hai toh surgery karwa lo pehle — operated hernia usually accept hota hai. Un-operated hernia mein reject.',
          'Piles / Fistula: Severe cases mein reject. Surgery ke baad usually accept.',
          'Dental Issues: Minimum 14 dental points chahiye. Missing teeth ya severe decay mein reject ho sakte ho.',
          'Hearing Loss: Whisper test ya audiometry hoti hai. 40 dB se zyada hearing loss mein reject.',
        ],
      },
      {
        heading: 'Medical Test Ke Liye Kaise Prepare Karein',
        paragraphs: [
          'Medical test ke liye preparation 2-3 months pehle se shuru karo — especially agar koi known issue hai toh.',
        ],
        bullets: [
          'Eye Test: Agar glasses lagte hain toh doctor se updated prescription lo. Contact lenses mat pehno test se pehle. Color vision ka test ghar par online Ishihara plates se try karo — agar fail ho rahe ho toh pehle se pata chal jayega.',
          'Blood Test: Test se 8-10 hours pehle kuch mat khao (fasting blood sugar ke liye). 2-3 din pehle se oily/junk food avoid karo. Adequate water piyo. Alcohol bilkul avoid karo test se 3-4 din pehle.',
          'Urine Test: Subah ka first urine sample best hota hai. Paani adequate amount mein piyo. Test se pehle sugary drinks avoid karo.',
          'Blood Pressure: Test se pehle tension mat lo — BP high aa sakta hai anxiety se. Raat ko achi neend lo. Test se 30 minute pehle deep breathing karo.',
          'General Fitness: Agar weight zyada hai toh 2-3 months mein reduce karo. BMI normal range mein hona chahiye. Regular exercise karo.',
        ],
      },
      {
        heading: 'Medical Test Day — Kya Le Jaana Hai',
        bullets: [
          'Call letter / Admit card (original + 2 photocopies)',
          'Aadhaar Card original + photocopy',
          'Passport size photos (4-6)',
          'Previous medical reports agar koi surgery ya treatment hua ho toh',
          'Glasses agar use karte ho (prescription bhi saath rakhna)',
          'Rs 500-1000 cash (kuch tests ke liye additional fee lag sakti hai)',
          'Empty stomach jaana (blood test ke liye fasting zaroori hai) — pani pi sakte ho',
          'Comfortable kapde pehno — medical examination ke liye kapde utaarne pad sakte hain',
        ],
      },
      {
        heading: 'Re-Medical Process — Agar Unfit Aaye Toh',
        paragraphs: [
          'Agar medical mein "Temporarily Unfit" ya "Unfit" aata hai toh ghabrao mat — re-medical ka option hota hai. Usually 30-45 din ka time milta hai re-medical ke liye. Is beech mein treatment karwa sakte ho.',
          'Re-medical mein sirf wohi test dobara hota hai jismein problem aayi thi — poora medical dobara nahi hota. Re-medical ek alag hospital mein hota hai (usually higher-level hospital). Agar re-medical mein bhi unfit aaye toh appeal ka option hota hai — Review Medical Board (RMB) ke paas. RMB ka decision final hota hai.',
          'Important: Re-medical ke liye apne paas se koi private doctor ka certificate mat lao — sirf designated government hospital ka medical hi valid hota hai.',
        ],
      },
      {
        heading: 'Post-wise Medical Standards',
        bullets: [
          'Railway Group D / NTPC: Standard medical — 6/9 vision, color vision normal, no hernia, no flat feet. Relatively relaxed standards.',
          'SSC GD Constable / CAPF: Strict standards — 6/6 and 6/9 vision (without glasses), no color blindness, no flat feet, no varicose veins, no tattoo on visible body parts.',
          'Police (State): Similar to SSC GD but state-wise variations. UP Police mein tattoo allowed nahi hai, Maharashtra mein small tattoo allowed. Physical standards bhi alag hote hain.',
          'Defence (Army/Navy/Air Force): Sabse strict medical. Perfect vision chahiye fighter pilot ke liye (6/6 both eyes without correction). Ground duty mein thoda relaxed. No color blindness at all.',
          'Desk Jobs (SSC CGL, Banking): Relaxed medical — glasses allowed, minor issues accepted. Color vision relaxed for most posts. Basically functional fitness chahiye.',
        ],
      },
    ],
  },
  {
    slug: 'document-verification-process-hindi',
    title: 'Document Verification (DV) Kaise Hota Hai — Complete Guide Hindi Mein',
    description:
      'Sarkari naukri ke document verification mein kya hota hai — documents list, DV day checklist, common rejection reasons, aur tips Hindi mein.',
    readTime: '9 min read',
    category: 'Guide',
    categoryColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'Written exam aur physical test clear karne ke baad Document Verification (DV) aata hai — yeh wo stage hai jahan aapke original documents check hote hain. Bahut saare candidates jo merit mein hote hain, DV mein reject ho jaate hain kyunki koi document missing hota hai ya galat format mein hota hai. Is guide mein hum complete DV process samjhayenge — kya documents chahiye, kaise prepare karein, aur kaunsi galtiyan avoid karein.',
        ],
      },
      {
        heading: 'Document Verification Kya Hai',
        paragraphs: [
          'DV ek physical verification process hai jismein aap in-person jaate ho (designated center par) aur apne original documents dikhate ho. Verification officer check karta hai ki aapne form mein jo information bhari thi — name, date of birth, category, education — woh sab documents se match ho rahi hai ya nahi.',
          'DV mein documents ki original + self-attested photocopies dono chahiye hoti hain. Originals sirf dikhaane ke liye hote hain — woh wapas mil jaate hain. Photocopies submit karni padti hain. Usually 2 sets of photocopies le jaana — ek original set submit hoga, dusra backup ke liye.',
        ],
      },
      {
        heading: 'Complete Documents List',
        bullets: [
          '10th Marksheet + Certificate: Date of birth proof ke liye — yeh sabse important document hai. Agar DOB 10th certificate se match nahi karti toh reject ho jaoge.',
          '12th Marksheet + Certificate: Educational qualification proof (agar required hai toh).',
          'Graduation Marksheet (All Semesters/Years) + Degree Certificate: Agar post ke liye graduation required hai. Provisional certificate bhi chalega agar final degree nahi mili hai.',
          'Caste Certificate: SC/ST/OBC candidates ke liye mandatory. Central exams ke liye Central format mein hona chahiye. OBC candidates ke liye Non-Creamy Layer certificate bhi zaroori hai.',
          'EWS Certificate: Agar EWS category se apply kiya hai toh valid EWS certificate chahiye — financial year specific.',
          'PwBD Certificate: Agar Person with Benchmark Disability category se apply kiya hai toh Disability Certificate (40% ya zyada disability) chahiye from competent authority.',
          'Aadhaar Card: Identity proof ke liye.',
          'Photo ID: Aadhaar, Voter ID, Passport, ya Driving License mein se koi ek original.',
          'Passport Size Photos: 6-8 photos le jaana — different forms mein lagani pad sakti hain.',
          'NOC (No Objection Certificate): Agar already government employee ho toh current department se NOC chahiye. Bina NOC ke DV complete nahi hogi.',
          'Experience Certificate: Agar post ke liye experience required hai toh previous employer ka experience certificate.',
          'Domicile Certificate: State government exams ke liye mandatory. Prove karta hai ki aap us state ke permanent resident ho.',
          'Character Certificate: Police verification ya Gazetted Officer se character certificate. Kuch exams mein notarized affidavit bhi chalega.',
        ],
      },
      {
        heading: 'Caste/EWS/PwBD Certificate Rules',
        paragraphs: [
          'Category certificates ke rules bahut strict hain — ek chhoti si galti bhi rejection ka reason ban sakti hai. OBC NCL certificate Central format mein hona chahiye central exams ke liye, aur valid hona chahiye (usually 1 financial year ki validity). SC/ST certificate mein District Magistrate / Additional District Magistrate / SDM ka sign hona chahiye.',
          'EWS certificate usi financial year ka hona chahiye jo notification mein mention hai. PwBD certificate mein disability percentage clearly mentioned hona chahiye — minimum 40% disability required hai reservation ke liye. Certificate Chief Medical Officer ya Government Hospital ki Medical Board se issued hona chahiye.',
        ],
      },
      {
        heading: 'NOC for Government Employees',
        paragraphs: [
          'Agar aap pehle se government employee ho (Central ya State) aur doosri government job ke liye apply kar rahe ho, toh aapko apne current department se No Objection Certificate (NOC) lena zaroori hai. Bina NOC ke DV mein aapko allow nahi kiya jayega.',
          'NOC ke liye apne Head of Office / Controlling Officer ko application do — usually 2-4 weeks pehle apply karo kyunki approval mein time lagta hai. Kuch departments mein NOC dene mein delay hota hai — aise mein apne application ki copy aur department ka acknowledgement le jaao DV mein, aur request karo ki NOC submit karne ke liye extra time milein.',
        ],
      },
      {
        heading: 'DV Day Checklist — Kya Kya Le Jaana Hai',
        bullets: [
          'Call letter / DV letter (print out)',
          'Original documents — sab ek file mein sequence mein rakhna',
          'Self-attested photocopies — 2 sets (ek submit hoga, ek backup)',
          'Passport size photos — 8 copies',
          'Blue pen aur apna form ka printout (reference ke liye)',
          'Ek photocopy zyada — agar koi document extra maanga jaaye',
          'Mobile phone mein sab documents ki scanned copy bhi rakh lo — emergency reference ke liye',
          'Cash Rs 500-1000 — chai-paani aur travel ke liye',
          'DV center ka exact address aur contact number note kar lo',
          'Reporting time se 30-60 minute pehle pahunch jaao',
        ],
      },
      {
        heading: 'Common Rejection Reasons at DV',
        bullets: [
          'Name mismatch: 10th certificate, Aadhaar, aur form mein name alag alag hai. Agar name change hua hai toh Gazette notification ya affidavit zaroori hai.',
          'DOB mismatch: Form mein bhari DOB aur 10th certificate mein DOB alag hai — instant rejection.',
          'Wrong category certificate: State format ka certificate central exam ke liye, ya expired certificate.',
          'Missing NOC: Government employee hone par NOC na laana — DV incomplete ho jayega.',
          'Education qualification not matching: Form mein graduation select kiya but degree certificate nahi hai ya result awaited hai — reject.',
          'Photo mismatch: Exam ke time ki photo aur DV mein alag dikhna — identity verification fail.',
          'Original documents missing: Photocopy toh hai but original nahi laaye — verification nahi hogi.',
        ],
      },
    ],
  },
  {
    slug: 'age-relaxation-rules-sarkari-naukri',
    title: 'Age Relaxation Rules — सरकारी नौकरी में उम्र सीमा छूट नियम',
    description:
      'Sarkari naukri mein age relaxation rules — OBC, SC/ST, PwBD, Ex-servicemen ke liye kitni chhoot milti hai, SSC, UPSC, Railway ke rules, aur age calculation.',
    readTime: '8 min read',
    category: 'Guide',
    categoryColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'Sarkari naukri mein age limit ek major concern hai — bahut saare candidates sirf age bar hone ki wajah se apply nahi kar paate. Lekin government ne different categories ke liye age relaxation ka provision rakha hai. Is article mein hum samjhayenge ki kaunsi category ko kitni chhoot milti hai, kaise calculate hoti hai, aur kaunse exams mein kya rules hain.',
        ],
      },
      {
        heading: 'Category-wise Age Relaxation — Central Government Rules',
        paragraphs: [
          'Central Government ke rules (DoPT guidelines ke anusaar) yeh hain — yeh rules UPSC, SSC, Railway sabhi central exams par applicable hain unless notification mein specifically kuch aur likha ho:',
        ],
        bullets: [
          'OBC (Non-Creamy Layer): 3 years relaxation. Agar upper age limit 27 hai toh OBC ke liye 30 saal tak apply kar sakte hain.',
          'SC/ST: 5 years relaxation. Upper age limit 27 hai toh 32 saal tak apply kar sakte hain.',
          'PwBD (Person with Benchmark Disability): 10 years relaxation for General, 13 years for OBC, 15 years for SC/ST. Yeh sabse zyada relaxation hai.',
          'Ex-Servicemen: 5 years relaxation (after deducting military service period). Matlab agar 10 saal army mein rahe toh 10 saal minus hoke + 5 saal extra.',
          'Widows / Divorced Women: 5 years relaxation (up to 35 years for General, 38 for OBC, 40 for SC/ST). Yeh sirf first re-marriage tak valid hai.',
          'J&K Domicile (1980-1989): 5 years relaxation — yeh ab limited applicability mein hai.',
          'Central Government Employees: 5 years relaxation (up to 40 years for Group C posts). Yeh sirf departmental candidates ke liye hai.',
        ],
      },
      {
        heading: 'SSC Exams — Age Rules',
        paragraphs: [
          'SSC ke different exams mein age limit alag hoti hai, lekin relaxation rules same hain (OBC +3, SC/ST +5, PwBD +10):',
        ],
        bullets: [
          'SSC CGL: 18-27 years (for most posts). Kuch posts jaise Inspector mein 27, Tax Assistant mein 27, Statistical Investigator mein 26.',
          'SSC CHSL: 18-27 years. LDC/DEO ke liye.',
          'SSC MTS: 18-25 years. Multi Tasking Staff ke liye.',
          'SSC GD Constable: 18-23 years. CAPF mein GD Constable ke liye. Relaxation: OBC 26, SC/ST 28.',
          'SSC Steno: 18-27 years (Grade C), 18-30 years (Grade D).',
          'SSC JE: 18-27 years (for most). Junior Engineer posts ke liye.',
        ],
      },
      {
        heading: 'UPSC Exams — Age Rules',
        paragraphs: [
          'UPSC ke exams mein age limit aur attempts dono ki limit hoti hai:',
        ],
        bullets: [
          'Civil Services (IAS/IPS/IFS): 21-32 years. General: 6 attempts, OBC: 9 attempts (35 years tak), SC/ST: unlimited attempts (37 years tak).',
          'CDS (Combined Defence Services): 19-25 years for IMA, 19-22 for Air Force, 19-22 for Naval Academy. OBC/SC/ST relaxation applicable nahi hai CDS mein.',
          'NDA: 16.5-19.5 years. Koi category relaxation nahi.',
          'CAPF (AC): 20-25 years. OBC +3, SC/ST +5.',
          'IES/ISS: 21-30 years. OBC +3, SC/ST +5.',
        ],
      },
      {
        heading: 'Railway Exams — Age Rules',
        paragraphs: [
          'Railway Recruitment Board (RRB) ke exams mein age rules:',
        ],
        bullets: [
          'RRB NTPC (Graduate Level): 18-33 years for Level 2-6. Under-graduate level mein 18-30 years.',
          'RRB Group D: 18-33 years. OBC +3, SC/ST +5, PwBD +10.',
          'RRB ALP (Assistant Loco Pilot): 18-28 years. OBC 31, SC/ST 33.',
          'RRB JE: 18-33 years. Junior Engineer ke liye.',
          'RPF Constable: 18-25 years. OBC 28, SC/ST 30.',
          'Note: Railway mein age limit generally doosre departments se thodi zyada hoti hai — yeh ek advantage hai.',
        ],
      },
      {
        heading: 'Age Kaise Calculate Hoti Hai — Crucial Date',
        paragraphs: [
          'Age calculation "crucial date" ke basis par hoti hai — yeh date notification mein clearly mention hoti hai. Usually yeh application ki last date hoti hai. Example: Agar notification mein crucial date 1st January 2026 hai aur aapki DOB 2nd January 1999 hai, toh aapki age 26 years 11 months 29 days mani jayegi (27 nahi).',
          'SSC mein crucial date usually 1st January ya 1st August hoti hai (notification ke hisaab se). UPSC mein 1st August hoti hai. Railway mein application close hone ki date hoti hai.',
          'Important: Age calculation mein 1 din bhi matter karta hai. Agar aap age limit se 1 din bhi zyada ho toh form accept nahi hoga. Isliye crucial date dhyan se check karo aur apni age accurately calculate karo before applying.',
        ],
      },
      {
        heading: 'Multiple Category Relaxation Rules',
        paragraphs: [
          'Ek important sawaal: Agar koi OBC + PwBD hai toh kya dono relaxation milegi? Jawab hai haan — cumulative relaxation milti hai. OBC PwBD candidate ko 3 + 10 = 13 years relaxation milti hai. SC/ST PwBD ko 5 + 10 = 15 years.',
          'Lekin kuch combinations mein cumulative relaxation nahi milti. Example: Ex-serviceman + OBC — isme zyada wali relaxation milegi (whichever is higher), dono add nahi hongi. Similarly, widow + OBC mein zyada wali milegi.',
          'Central Government employee hone ka 5 years relaxation sirf departmental recruitment mein milta hai — open competition mein nahi. Isliye agar aap government employee ho aur outside exam de rahe ho toh yeh 5 years nahi milega — sirf category wali relaxation milegi.',
        ],
      },
    ],
  },
  {
    slug: 'online-form-bharne-mein-galtiyan',
    title: 'Online Form Bharne Mein 15 Common Mistakes — ये गलतियां न करें!',
    description:
      'Sarkari naukri ka online form bharte waqt hone wali 15 common mistakes — photo/signature specs, category selection, payment tips, aur correction window ki jankari.',
    readTime: '8 min read',
    category: 'Guide',
    categoryColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'Har saal lakho candidates ka sarkari naukri ka form reject hota hai — written exam se pehle hi. Reason? Online form bharte waqt chhoti chhoti galtiyan jo baad mein badi problem ban jaati hain. Photo wrong size, category galat select, payment fail — yeh sab avoidable mistakes hain. Is article mein hum 15 sabse common mistakes batayenge aur kaise avoid karein.',
        ],
      },
      {
        heading: 'Mistake 1-3: Photo aur Signature Specifications',
        paragraphs: [
          'Sabse zyada forms reject hote hain galat photo aur signature ki wajah se. Har exam board ki apni specifications hoti hain — size, format, background color, file size sab alag.',
        ],
        bullets: [
          'Photo specs: SSC mein usually 3.5cm x 4.5cm, JPG format, 20-50 KB file size, white background chahiye. UPSC mein bhi similar. Railway mein 3.5cm x 4.5cm par file size 20-50 KB mein honi chahiye. Galat background (blue ya red) ya selfie upload karna rejection ka reason hai.',
          'Signature specs: White paper par black ink pen se sign karo, scan karo, crop karo. File size usually 10-20 KB, JPG format. Digital signature mat dena — handwritten chahiye. Sign mein naam readable hona chahiye (agar name se match nahi karta toh DV mein problem aayegi).',
          'Left hand thumb impression: SC/ST candidates ke liye kuch forms mein thumb impression bhi chahiye — yeh bhi proper format mein hona chahiye. Blue ink se left thumb ka impression white paper par lo, scan karo.',
          'Pro tip: Nearest photo studio mein jaao aur bolo "sarkari form ke liye photo chahiye — SSC/UPSC/Railway format mein". Woh sab specifications jaante hain. Online tools jaise "Passport Photo Maker" app bhi use kar sakte ho crop karne ke liye.',
        ],
      },
      {
        heading: 'Mistake 4-6: Category aur Personal Details',
        bullets: [
          'Wrong category selection: General candidate ne OBC select kar diya ya OBC ne EWS select kar diya — yeh bahut common hai. Category change karna baad mein almost impossible hai. Double check karo: Agar aap OBC (Non-Creamy Layer) ho toh "OBC-NCL" select karo, sirf "OBC" nahi. Agar General ho aur EWS certificate hai toh "EWS" select karo.',
          'Father name galat: Form mein father ka naam exactly waise likho jaise 10th certificate mein hai. "Mohammad" vs "Mohd" vs "Md" — yeh mismatch DV mein rejection ka reason ban sakta hai. Abbreviation mat use karo agar certificate mein full name hai.',
          'Date of Birth galat: DOB 10th certificate se match honi chahiye — yeh non-negotiable hai. Agar DOB galat bhar di toh form reject hoga aur correction possible nahi hoga zyaadatar cases mein.',
        ],
      },
      {
        heading: 'Mistake 7-9: Mobile Number aur Email Errors',
        bullets: [
          'Wrong mobile number: Apna hi mobile number dena — dusre ka number mat dena. Admit card, result, DV call sab is number par aayega. Number change karna baad mein bahut mushkil hai.',
          'Temporary email: Exam notifications aur updates email par aate hain — proper email ID use karo (Gmail recommended). Temporary ya disposable email mat use karo. Spam folder bhi check karte rehna.',
          'Multiple registrations: Same exam ke liye 2 baar register mat karo different details se — dono forms reject ho sakte hain. "One Candidate One Application" rule hai zyaadatar exams mein.',
        ],
      },
      {
        heading: 'Mistake 10-12: Education Details',
        bullets: [
          'Qualification galat select karna: Agar graduation complete hai toh "Graduate" select karo, "Post Graduate" nahi (jab tak aapki PG complete na ho). Agar result awaited hai toh carefully check karo ki eligible ho ya nahi — kuch exams mein appearing candidates eligible hain, kuch mein nahi.',
          'Percentage calculation galat: CGPA ko percentage mein convert karna padta hai. University ka official conversion formula use karo. Generally CGPA x 9.5 = approximate percentage (but university se confirm karo). Galat percentage DV mein problem create karegi.',
          'University name galat: Apni university ka official name likho — exactly jaise degree certificate mein hai. "University of Delhi" vs "Delhi University" — official name use karo.',
        ],
      },
      {
        heading: 'Mistake 13: Payment Failure Tips',
        paragraphs: [
          'Payment failure sabse frustrating problem hai — paisa kat gaya lekin form submit nahi hua. Yeh kaise avoid karein:',
        ],
        bullets: [
          'Stable internet connection use karo — mobile data par mat karo agar signal weak hai.',
          'Payment ke time back button ya refresh mat dabao — transaction complete hone do.',
          'UPI payment mein timeout hone par 30 minute wait karo — amount automatically refund ho jayega ya transaction complete ho jayega.',
          'Net banking recommended hai — sabse reliable payment method hai sarkari forms ke liye.',
          'Payment receipt / transaction ID note karo ya screenshot lo. Agar payment success hua lekin form nahi hua toh yeh proof kaam aayega helpline par call karne mein.',
          'Double payment se bachne ke liye: Form ki status check karo login karke. Agar "Payment Pending" dikha raha hai tabhi dobara pay karo.',
        ],
      },
      {
        heading: 'Mistake 14: Form Preview Before Submit',
        paragraphs: [
          'Submit button dabane se pehle PREVIEW zaroor dekho — zyaadatar exam portals mein preview option hota hai. Har ek field check karo: Name, father name, DOB, category, education, photo, signature — sab sahi hai ya nahi.',
          'Common mistake: Bahut saare candidates jaldi mein preview skip kar dete hain aur seedha submit kar dete hain. Ek baar submit hone ke baad zyaadatar fields change nahi ho sakti. 5 minute lagake preview dekhna lakho ki naukri bacha sakta hai.',
        ],
      },
      {
        heading: 'Mistake 15: Application Print aur Correction Window',
        bullets: [
          'Application form ka print zaroor nikalo — 2-3 copies. Yeh DV mein chahiye hota hai. Registration number aur Roll number dono note karo alag se bhi.',
          'Correction window: SSC, Railway, UPSC — sabhi ek correction window dete hain form submit hone ke baad (usually 2-3 din). Is window mein category, photo, aur kuch details correct kar sakte ho. Yeh window miss mat karo — notification mein dates check karo.',
          'Last date par form mat bharo: Server down ho jaata hai, payment fail hota hai, website slow hoti hai. Kam se kam 3-4 din pehle form complete karo.',
        ],
      },
    ],
  },
  {
    slug: 'income-certificate-kaise-banaye',
    title: 'Income Certificate Kaise Banaye — आय प्रमाण पत्र ऑनलाइन',
    description:
      'Income certificate (aay praman patra) kaise banaye — online process, zaroori documents, processing time, validity, aur common issues ki complete jankari.',
    readTime: '7 min read',
    category: 'Guide',
    categoryColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'Income certificate (aay praman patra) sarkari naukri, scholarship, aur reservation ke liye sabse zaroori documents mein se ek hai. EWS certificate, OBC NCL certificate, fee waiver — sabke liye income certificate chahiye. Is article mein hum batayenge ki income certificate kaise banaye — online aur offline dono tarike se.',
        ],
      },
      {
        heading: 'Income Certificate Kyun Zaroori Hai',
        paragraphs: [
          'Income certificate bahut saari jagah maanga jaata hai: (1) EWS reservation ke liye (Rs 8 lakh se kam income prove karne ke liye), (2) OBC Non-Creamy Layer certificate banwane ke liye, (3) School/college admission mein fee waiver ke liye, (4) Scholarship applications mein, (5) Below Poverty Line (BPL) scheme benefits ke liye, (6) Ration card mein category decide karne ke liye.',
          'Sarkari naukri ke context mein income certificate isliye zaroori hai kyunki yeh prove karta hai ki aapki family economically weaker hai aur aap reservation ka benefit lene ke eligible ho. Bina valid income certificate ke EWS ya OBC NCL certificate nahi ban sakta.',
        ],
      },
      {
        heading: 'Zaroori Documents',
        bullets: [
          'Aadhaar Card: Applicant ka Aadhaar card (original + photocopy).',
          'Ration Card: Family members aur address proof ke liye.',
          'Salary Slip / ITR: Agar family head naukri karta hai toh salary slip ya Form 16. Agar business hai toh Income Tax Return (ITR) copy. Agar koi ITR file nahi karta toh self-declaration chalegi kuch states mein.',
          'Self-Declaration Affidavit: Rs 10-20 ke stamp paper par notarized affidavit — income details declare karte hue.',
          'Bank Passbook: Last 6 months ki bank statement ya passbook photocopy.',
          'Land Records: Agar agricultural income hai toh khasra/khatoni ki nakal.',
          'Passport Size Photo: 2 photos.',
          'Previous Income Certificate: Agar renewal kar rahe ho toh pichla income certificate.',
        ],
      },
      {
        heading: 'Online Process — State Portal Links',
        paragraphs: [
          'Har state ka apna e-district portal hai jahan se income certificate online apply kar sakte ho. Process almost same hai sabhi states mein:',
        ],
        bullets: [
          'Uttar Pradesh: eSathi portal (edistrict.up.nic.in) — Login > Apply for Services > Income Certificate > Fill form > Upload documents > Pay Rs 10-25 > Submit.',
          'Bihar: RTPS portal (serviceonline.bihar.gov.in) — Similar process. Fee Rs 0 (free hai Bihar mein).',
          'Madhya Pradesh: MP e-District (mpedistrict.gov.in) — CSC center par bhi apply kar sakte ho.',
          'Rajasthan: eMitra portal (emitra.rajasthan.gov.in) — eMitra kiosk par bhi apply kar sakte ho. Fee Rs 15-40.',
          'Maharashtra: Aaple Sarkar portal (aaplesarkar.mahaonline.gov.in) — Digital signature se certificate directly download hoga.',
          'Delhi: e-District Delhi (edistrict.delhigovt.nic.in) — Online apply karo, certificate 7-10 din mein aa jayega.',
          'Haryana: Saral Haryana portal (saralharyana.gov.in) — Antodaya SARAL center par bhi apply kar sakte ho.',
        ],
      },
      {
        heading: 'Offline Process — Tehsildar Office',
        paragraphs: [
          'Agar online process mein koi dikkat aa rahi hai toh offline bhi apply kar sakte ho. Apne area ke Tehsildar office ya SDM office mein jaao. Prescribed format mein application form lo (office se ya online download karo), documents attach karo, aur submit karo.',
          'Submit karne ke baad Patwari / Lekhpal / Village Officer aapke ghar ya area mein verification ke liye aayega. Woh income details verify karega — neighbors se poochh sakta hai, property dekh sakta hai. Verification ke baad Tehsildar certificate sign karke issue kar dega.',
          'Offline process mein 7-15 working days lagta hai. Lekin festivals ya peak season mein 20-30 din bhi lag sakte hain. Isliye jaldi apply karo — last minute par mat chhodo.',
        ],
      },
      {
        heading: 'Processing Time aur Validity',
        paragraphs: [
          'Online application ka processing time usually 7-15 working days hai — state par depend karta hai. Bihar mein RTPS ke under 7 din ki guarantee hai (Right to Public Service Act ke tahat). UP mein 15 din lagta hai average. Delhi mein 7-10 din.',
          'Income certificate ki validity usually 1 financial year hoti hai — 1st April se 31st March tak. Kuch states mein 6 months ki validity hoti hai. Sarkari naukri ke form mein mention hota hai ki certificate kis date tak valid hona chahiye — woh date carefully check karo.',
        ],
      },
      {
        heading: 'Common Issues aur Solutions',
        bullets: [
          'Verification mein delay: Patwari verification mein bahut delay hota hai kabhi kabhi. Solution: Tehsil office mein jaake follow-up karo, ya helpline number par call karo. RTI application ki dhamki dene par kaam jaldi hota hai.',
          'Income limit confusion: Family income mein sabki income count hoti hai — father, mother, dependent siblings ki. Sirf father ki income nahi, total household income dekhi jaati hai.',
          'ITR file nahi kiya: Agar koi ITR file nahi karta toh kuch states mein self-declaration affidavit accept karte hain, kuch mein nahi. Best practice: ITR file karo — zero income ho toh bhi. ITR sabse strong income proof hai.',
          'Online portal par error: State portals sometimes down rehte hain ya errors aate hain. Late night ya early morning try karo — traffic kam hota hai. Chrome browser best kaam karta hai.',
          'Certificate par galat information: Agar certificate mein name, income, ya koi detail galat print ho gayi hai toh immediately Tehsil office mein jaake correction karwao. Galat certificate use karna criminal offence hai.',
        ],
      },
    ],
  },
  {
    slug: 'domicile-certificate-kaise-banaye',
    title: 'Domicile/Mool Niwas Certificate Kaise Banaye — State-wise Guide',
    description:
      'Domicile certificate (mool niwas praman patra) kaise banaye — kab zaroori hai, documents, online process, state-wise portals, aur common rejection reasons.',
    readTime: '8 min read',
    category: 'Guide',
    categoryColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'Domicile certificate (mool niwas praman patra) prove karta hai ki aap kisi particular state ke permanent resident ho. State government jobs, state police bharti, state PSC exams — in sabke liye domicile certificate mandatory hai. Central government jobs mein usually zaroori nahi hota, lekin state quota ke posts mein chahiye. Is article mein hum complete guide denge — kaise banaye, kaunse documents chahiye, aur state-wise portals ki jankari.',
        ],
      },
      {
        heading: 'Domicile Certificate Kya Hai aur Kab Chahiye',
        paragraphs: [
          'Domicile certificate ek official document hai jo prove karta hai ki aap kisi state mein permanently rehte ho — usually 3 saal ya zyada se us state mein reh rahe ho. Yeh Tehsildar / SDM office se issue hota hai.',
          'Yeh kab chahiye: (1) State government jobs — UP Police, Bihar Police, MP Police, Rajasthan Patwari, etc., (2) State PSC exams — UPPSC, BPSC, MPPSC mein kuch posts ke liye, (3) State quota medical/engineering admissions, (4) Some scholarship schemes, (5) Voter ID aur other state-specific benefits. Central government jobs (SSC, UPSC, Railway) mein generally domicile certificate nahi chahiye — except kuch specific posts mein.',
        ],
      },
      {
        heading: 'Zaroori Documents',
        bullets: [
          'Aadhaar Card: Applicant ka Aadhaar card jismein state ka address ho.',
          'Ration Card: Family ration card jismein state ka address ho.',
          '10th Certificate: School certificate jismein birthplace ya address mentioned ho.',
          'Birth Certificate: Municipal corporation / Gram Panchayat se issued birth certificate.',
          'Electricity/Water Bill: State ke address ka bijli ya paani ka bill — at least 3 saal purana.',
          'Property Documents: Agar ghar / zameen hai us state mein toh property ki registry.',
          'Self-Declaration Affidavit: Stamp paper par affidavit ki main is state ka permanent resident hun aur pichle 3+ saal se yahan reh raha hun.',
          'Passport Size Photos: 2-4 photos.',
          'Voter ID (optional but helpful): Agar voter ID us state ki hai toh strong proof hai domicile ka.',
        ],
      },
      {
        heading: 'Online Process',
        paragraphs: [
          'Domicile certificate bhi e-district portal se online apply hota hai — same portal jo income certificate aur caste certificate ke liye hota hai. Process: (1) Portal par register/login karo, (2) "Domicile Certificate" ya "Mool Niwas Praman Patra" option select karo, (3) Personal details bharo, (4) Residence details bharo — kitne saal se is address par reh rahe ho, (5) Documents upload karo, (6) Fee pay karo, (7) Submit karo.',
          'Processing time 7-15 working days hai. Patwari verification hoga — aapke address par jaake confirm karega ki aap wahan rehte ho. Verification ke baad certificate issue ho jayega — online download kar sakte ho ya office se collect kar sakte ho.',
        ],
      },
      {
        heading: 'State-wise Portals',
        bullets: [
          'Uttar Pradesh: eSathi (edistrict.up.nic.in) — "Niwas Praman Patra" option select karo. Fee Rs 10-15. UP mein 15 saal ki age ke baad domicile certificate ban sakta hai.',
          'Bihar: RTPS (serviceonline.bihar.gov.in) — "Aawasiya Praman Patra" option. Free hai (no fee). 7 din mein mil jaata hai RTPS guarantee ke under.',
          'Madhya Pradesh: MP e-District (mpedistrict.gov.in) — "Mool Niwasi Praman Patra" option. CSC center ya Lok Seva Kendra par bhi apply kar sakte ho.',
          'Rajasthan: eMitra (emitra.rajasthan.gov.in) — "Mool Niwas Praman Patra" option. eMitra kiosk par bhi available. Fee Rs 15-40.',
          'Maharashtra: Aaple Sarkar (aaplesarkar.mahaonline.gov.in) — "Domicile Certificate" option. Digital certificate milta hai directly.',
          'Jharkhand: Jharsewa (jharsewa.jharkhand.gov.in) — "Sthaniya Niwasi Praman Patra" option.',
          'Uttarakhand: e-District Uttarakhand (edistrict.uk.gov.in) — "Niwas Praman Patra" option.',
        ],
      },
      {
        heading: 'Processing Time',
        paragraphs: [
          'Online application par average processing time 7-15 working days hai. Bihar mein RTPS Act ke tahat 7 din ki guarantee hai — agar delay hota hai toh complaint kar sakte ho aur concerned officer par penalty lagti hai.',
          'Offline (Tehsil office) mein 10-20 working days lagta hai. Peak season (exam form submission ke time) mein zyada time lag sakta hai kyunki applications bahut aati hain. Isliye advance mein apply karo — jab zaroorat ho tab tak ready hona chahiye.',
        ],
      },
      {
        heading: 'Common Rejection Reasons',
        bullets: [
          'Address mismatch: Aadhaar mein alag address, ration card mein alag — consistency honi chahiye. Pehle sab documents ka address same karwao.',
          'Insufficient residence proof: 3 saal se kam ka proof dena — purane bills, rent agreement etc. dikhao jo prove kare ki 3+ saal se wahan ho.',
          'Wrong state: Agar aapka Aadhaar aur 10th certificate alag alag state ka hai toh problem hogi. Jis state ka domicile chahiye us state ke address wale documents chahiye.',
          'Verification fail: Patwari verification mein agar padosi ya local log confirm nahi karte ki aap wahan rehte ho toh certificate reject ho sakta hai. Isliye apne local area mein jaane pehchaane hona zaroori hai.',
          'Documents incomplete: Ek bhi required document missing hona rejection ka reason hai. Checklist bana ke sab documents ready karo pehle, phir apply karo.',
        ],
      },
    ],
  },
  {
    slug: 'physical-test-ki-taiyari-kaise-kare',
    title: 'Physical Test Ki Taiyari Kaise Kare — Police, Army, SSC GD Tips',
    description:
      'Sarkari naukri ke physical test ki taiyari — running tips (1600m in 5:30), long jump, high jump, chest measurement, diet plan, aur 3-month training schedule.',
    readTime: '10 min read',
    category: 'Fitness',
    categoryColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'Police bharti, SSC GD, Army rally, CAPF — in sab mein physical test sabse pehla hurdle hai. Lakho candidates written exam clear kar lete hain lekin physical mein fail ho jaate hain — especially running mein. Is guide mein hum practical training tips denge — running speed kaise badhaye, long jump kaise improve kare, diet kya honi chahiye, aur 3 month ka complete training plan.',
        ],
      },
      {
        heading: 'Running Tips — 1600 Meter in 5 Minutes 30 Seconds',
        paragraphs: [
          '1600 meter (1.6 km) race sabse important physical test hai — zyaadatar exams mein qualifying time 5 minutes 30 seconds se 6 minutes 30 seconds ke beech hota hai. SSC GD mein 5:45 (Group 1), UP Police mein 4.8 km in 25 minutes, Army mein 1600m in 5:30.',
          'Pehle samjho ki 1600m ko 5:30 mein karne ke liye average speed 17.5 km/hr chahiye — yeh fast hai. Agar aaj aap 8-9 minute mein 1600m kar rahe ho toh 3 months mein 5:30 possible hai agar systematic training karo.',
        ],
        bullets: [
          'Week 1-2 (Base Building): Roz 3-4 km slow jogging karo — pace matter nahi karta, bus roz karo bina ruke. Subah 5 baje uthke ground jaao. Pehle 2 weeks mein stamina build hoga.',
          'Week 3-4 (Distance Increase): Distance badha ke 5-6 km karo daily. Pace thoda improve karo but comfortable rehna chahiye — 7-8 min/km pace theek hai.',
          'Week 5-6 (Speed Work Start): Interval training shuru karo — 400m fast run + 200m walk, 4-6 rounds. Isse speed aur stamina dono improve hoga. 400m target time: 1 minute 15-20 seconds.',
          'Week 7-8 (Tempo Runs): 1600m continuous run karo aur time note karo. Target: 6:30-7:00 mein complete karna. Week mein 2 baar interval training + 2 baar tempo run + 2 baar long slow run.',
          'Week 9-10 (Speed Push): 400m intervals ka target time 1:05-1:10 karo. 800m time trials karo — target 2:45. 1600m practice mein 6:00 ke andar aana chahiye.',
          'Week 11-12 (Peak Performance): 1600m time trials karo week mein 2 baar. Rest days zyada rakho — body recover hone do. Test se 2 din pehle sirf light jogging.',
        ],
      },
      {
        heading: 'Long Jump Tips',
        paragraphs: [
          'Long jump mein usually 12-14 feet (3.65-4.27 meter) ka target hota hai male candidates ke liye. Female candidates ke liye 9-10 feet. Technique bahut important hai — sirf strength se kaam nahi chalega.',
        ],
        bullets: [
          'Run-up: 10-12 steps ki approach run lo — speed gradually badhao. Last 3 steps sabse fast hone chahiye.',
          'Take-off: Board par ek pair se push karo — sabse strong pair (usually right). Pair flat ya thoda heel-first land kare board par, phir toe se push karo.',
          'Air technique: Jump ke baad pairo ko aage stretch karo, haath upar se neeche laao (arm swing), chest aage karo.',
          'Landing: Dono pair saath mein aage rakh ke land karo. Body aage lean karo landing ke time — peechhe mat giro.',
          'Practice: Roz 15-20 jumps karo with full approach run. Standing broad jump bhi karo daily — 20 reps. Squats aur lunges se leg strength badhao.',
        ],
      },
      {
        heading: 'High Jump Technique',
        paragraphs: [
          'High jump mein usually 3.5-4 feet (1.07-1.22 meter) ka standard hota hai. Scissor kick technique sabse easy hai beginners ke liye — Fosbury Flop advanced technique hai.',
        ],
        bullets: [
          'Scissor Kick: 45-degree angle se approach karo bar ki taraf. Take-off foot bar se dur wala pair hona chahiye. Pehle andar wala pair upar uthao bar ke upar, phir dusra pair follow karega — scissors ki tarah.',
          'Practice drill: Bina bar ke jump practice karo pehle — standing high jumps. Phir low height par bar rakh ke practice karo, gradually height badhao.',
          'Leg strength: Calf raises (50 reps daily), Box jumps (15-20 reps), Single leg squats — yeh sab high jump ke liye zaroori exercises hain.',
        ],
      },
      {
        heading: 'Chest Measurement Increase Tips',
        paragraphs: [
          'Male candidates ke liye chest measurement usually minimum 80-83 cm (unexpanded) aur 5 cm expansion chahiye. Police bharti mein yeh strict check hota hai. Chest measurement badhane mein 2-3 months lagta hai.',
        ],
        bullets: [
          'Push-ups: Roz 100+ push-ups karo — 4-5 sets mein. Wide grip push-ups chest ke liye best hain.',
          'Pull-ups: Roz 20-30 pull-ups — wide grip. Isse upper chest aur back dono develop hoti hai.',
          'Deep breathing exercises: Subah 15 minute deep breathing karo — lungs ki capacity badhti hai jisse chest expansion improve hota hai. Pranayam (Anulom Vilom, Bhastrika) bahut effective hai.',
          'Swimming: Agar possible ho toh swimming karo — chest muscles aur lung capacity dono ke liye best exercise.',
          'Dand-Baithak: Traditional Indian exercise — roz 50 dand (Hindu push-ups) + 100 baithak (squats). Isse overall body build hoti hai.',
        ],
      },
      {
        heading: 'Height-Weight Chart',
        paragraphs: [
          'Different exams mein height aur weight ke different standards hain. Yeh approximate values hain — exact values notification mein check karo:',
        ],
        bullets: [
          'Army (GD Soldier): Height — 170 cm (General), 165 cm (Hill areas), 160 cm (ST). Weight — height ke proportionate, BMI 18.5-24.9.',
          'SSC GD Constable: Male — 170 cm height, Chest 80/85 cm. Female — 157 cm height.',
          'UP Police: Male — 168 cm (General/OBC), 160 cm (SC/ST). Female — 152 cm (General/OBC), 147 cm (SC/ST).',
          'Railway RPF: Male — 165 cm, Chest 80/85 cm. Female — 157 cm.',
          'Delhi Police: Male — 170 cm, Chest 81/86 cm. Female — 157 cm.',
          'Note: Height badhana adult age mein mushkil hai. Agar height thodi kam hai toh Hill area / tribal area relaxation check karo. Weight BMI ke hisaab se maintain karo.',
        ],
      },
      {
        heading: '3-Month Training Schedule',
        paragraphs: [
          'Yeh sample weekly schedule hai — adjust karo apne fitness level ke hisaab se:',
        ],
        bullets: [
          'Monday: Running (interval training — 400m x 6 rounds) + Push-ups 100 + Pull-ups 20',
          'Tuesday: Long run (5-6 km slow pace) + Long jump practice (15 jumps) + Squats 100',
          'Wednesday: Running (tempo run 1600m for time) + High jump practice + Core exercises (plank, crunches)',
          'Thursday: Rest day ya light jogging (2 km) + Stretching',
          'Friday: Running (sprint training — 100m x 10 rounds) + Push-ups 100 + Dand-Baithak 50-100',
          'Saturday: Full mock test — 1600m race time trial + Long jump + High jump + Chest measurement check',
          'Sunday: Complete rest — body recovery ke liye zaroori hai.',
          'Important: 3 months mein results aa jayenge agar daily consistently follow karo. Miss mat karo — ek din bhi miss karna setback hai.',
        ],
      },
      {
        heading: 'Diet Plan for Physical Test',
        bullets: [
          'Subah (5:30 AM — running se pehle): 2 kele + 4-5 badam + 1 glass paani. Energy ke liye carbs chahiye running se pehle.',
          'Breakfast (7:30 AM — running ke baad): 4 egg whites + 2 roti/paratha + 1 glass doodh. Protein recovery ke liye zaroori hai.',
          'Mid-morning (10:30 AM): 1 fruit (apple/orange/seasonal) + handful of peanuts/chana.',
          'Lunch (1:00 PM): Chawal + dal + sabzi + salad + curd/raita. Balanced meal — carbs + protein + fiber.',
          'Evening snack (4:30 PM): Sprouts chaat ya peanut butter sandwich + 1 glass buttermilk.',
          'Dinner (7:30 PM): 2-3 roti + dal/paneer/chicken + sabzi. Dinner halka rakho — heavy dinner se subah ki training affect hoti hai.',
          'Before bed (9:30 PM): 1 glass doodh (haldi wala doodh — turmeric milk muscle recovery ke liye best).',
          'Paani: Roz kam se kam 3-4 litre paani piyo. Dehydration se performance drastically girti hai.',
          'Avoid: Cold drinks, junk food, zyada meetha, fried food, alcohol, smoking — yeh sab stamina khatam karte hain.',
        ],
      },
      {
        heading: 'Test Day Tips',
        bullets: [
          'Raat ko achi neend lo — kam se kam 7-8 ghante. Tension mat lo, prepared ho toh confidence rakho.',
          'Subah halka breakfast khao — 2 kele + paani + dry fruits. Heavy breakfast mat khao — bloating hogi aur running mein problem aayegi.',
          'Test se 1 ghanta pehle pahunch jaao — reporting, document check, warmup sab ke liye time chahiye.',
          'Warmup zaroor karo — 10 minute light jogging + stretching + 2-3 short sprints. Cold muscles mein injury hoti hai.',
          'Running mein pehle 400m mein over-speed mat karo — consistent pace rakho. Last 400m mein sprint lagao.',
          'Spike shoes pehno agar allowed hain — grip bahut better milti hai. New shoes test ke din mat pehno — pehle se practice mein use karo.',
          'Paani thoda thoda piyo intervals mein — ek baar mein zyada paani peena cramps ka reason banta hai.',
        ],
      },
    ],
  },
  {
    slug: 'sarkari-naukri-joining-process',
    title: 'Sarkari Naukri Mein Joining Kaise Hoti Hai — Selection Ke Baad Kya Kare',
    description:
      'Government job mein selection ke baad kya hota hai — joining process, documents, probation period, first posting, GPF/NPS, pay fixation, aur leave rules.',
    readTime: '9 min read',
    category: 'Guide',
    categoryColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'Bahut saari guides exam preparation ke baare mein hain — lekin selection ke baad kya hota hai, yeh koi nahi batata. Final result aane ke baad document verification, medical test, joining order — ek poora process hai jo 1-6 months le sakta hai. Is article mein hum step by step batayenge ki selection ke baad kya karna hai, kaunse documents chahiye, probation kya hai, aur pehli posting mein kya expect karein.',
        ],
      },
      {
        heading: 'Selection Ke Baad Ka Process — Step by Step',
        paragraphs: [
          'Final result ke baad yeh sequence hota hai (exam ke type par depend karta hai): (1) Document Verification (DV), (2) Medical Examination, (3) Training (agar applicable hai), (4) Joining Order issue hona, (5) Reporting at posting location, (6) Joining formalities complete karna.',
          'SSC CGL mein result ke baad DV hota hai, phir medical, phir allocation of departments (preferences ke hisaab se), phir joining order. UPSC mein result ke baad training hoti hai (LBSNAA mein foundation course), phir posting. Railway mein result ke baad DV + medical ek saath hota hai, phir joining order.',
          'Timeline: Result se joining tak usually 2-6 months lagta hai. Kuch cases mein 1 saal bhi lag jaata hai — especially agar legal challenges ya vacancy issues hain.',
        ],
      },
      {
        heading: 'Joining Ke Liye Zaroori Documents',
        bullets: [
          'Joining Order: Department se issued joining order/appointment letter — original le jaana.',
          'Educational Certificates: 10th, 12th, Graduation, Post Graduation — original + 4 attested photocopies.',
          'Caste / EWS / PwBD Certificate: Category certificate — original + copies.',
          'Medical Fitness Certificate: DV ke waqt ya separately medical test hota hai — medical fit certificate le jaana.',
          'Character Certificate: Latest character certificate — police verification ya gazetted officer se attested.',
          'Aadhaar Card + PAN Card: Salary account aur tax ke liye PAN card mandatory hai.',
          'Bank Account Details: Salary ke liye bank account chahiye — SBI ya designated bank mein account open karwao agar nahi hai.',
          'Passport Size Photos: 10-12 photos — har form mein lagti hain.',
          'Relieving Letter: Agar pehle kahi kaam kar rahe the (government ya private) toh relieving letter / experience certificate.',
          'Attestation Form: Gazetted Officer se attested form — yeh joining ke time milta hai fill karne ke liye.',
        ],
      },
      {
        heading: 'Probation Period — Kya Hai Aur Kitna Hota Hai',
        paragraphs: [
          'Naye government employee ko probation period mein rakha jaata hai — yeh trial period hai jismein aapki performance monitor hoti hai. Probation successfully complete karne ke baad aap confirmed employee ban jaate ho.',
          'Central Government mein probation period usually 2 saal hota hai. State government mein 1-2 saal. Railway mein 2 saal. Banking mein 1-2 saal. Probation mein aapko poori salary milti hai — salary mein koi difference nahi hota. Lekin kuch benefits jaise LTC (Leave Travel Concession) probation ke baad milte hain.',
          'Probation period mein kya hota hai: (1) Annual Confidential Report (ACR) likhi jaati hai aapke supervisor dwara, (2) Departmental exam pass karna pad sakta hai (some posts mein), (3) Conduct aur performance satisfactory hona chahiye. Agar probation mein performance unsatisfactory hai toh probation extend ho sakta hai ya rare cases mein termination bhi ho sakta hai — lekin yeh bahut rare hai.',
        ],
      },
      {
        heading: 'First Posting Location',
        paragraphs: [
          'Pehli posting kahan hogi — yeh sabse bada sawaal hota hai. Central government jobs mein posting anywhere in India ho sakti hai. State government jobs mein posting usi state mein hogi — lekin kisi bhi district mein.',
          'SSC CGL mein department allocation ke time preferences poochhi jaati hain — Income Tax, Customs, Postal, etc. Lekin preference guarantee nahi hai — merit rank aur vacancy ke basis par allocation hota hai. Top rankers ko usually preferred department milta hai.',
          'Railway mein zone allocation hota hai — aapne form mein jo zone prefer kiya tha us zone mein try karta hai post karne ka, lekin vacancy ke hisaab se kahi bhi ho sakta hai. Transfer ke liye usually 3 saal ka minimum service period chahiye.',
          'Important: Pehli posting mein mann na lage toh bhi join karo — probation complete hone ke baad transfer request kar sakte ho. Joining se mana karna matlab naukri jaana.',
        ],
      },
      {
        heading: 'GPF / NPS Enrollment',
        paragraphs: [
          '2004 ke baad join karne wale sabhi Central Government employees NPS (National Pension System) mein enrolled hote hain. Purane employees GPF (General Provident Fund) mein hain — ab naye employees ke liye GPF nahi hai.',
          'NPS mein aapki basic salary + DA ka 10% automatically deduct hota hai aur government bhi 14% contribute karti hai (2024 se badhakar 14% kiya gaya hai, pehle 10% tha). Yeh paisa retirement par milega as pension corpus. NPS mein equity + government bonds mein invest hota hai — returns market-linked hain.',
          'Joining ke time PRAN (Permanent Retirement Account Number) allot hoga — yeh aapka NPS account number hai. Online login karke apna NPS balance aur investment details dekh sakte ho (npscra.nsdl.co.in). Nominee bhi register karna padta hai — wife/husband/parents ka naam.',
        ],
      },
      {
        heading: 'Pay Fixation — Salary Kaise Calculate Hoti Hai',
        paragraphs: [
          '7th Pay Commission ke under Central Government employees ki salary pay matrix ke hisaab se hoti hai. Har post ka ek pay level hai (Level 1 se Level 18 tak) aur har level mein pay cells hain.',
          'Example: SSC CGL ka Tax Assistant Level 4 mein aata hai — basic pay Rs 25,500 se start hoti hai. SSC CHSL ka LDC Level 2 mein aata hai — basic pay Rs 19,900 se start. Railway Group D Level 1 mein hai — basic pay Rs 18,000.',
          'Total salary = Basic Pay + DA (Dearness Allowance — currently ~50% of basic) + HRA (House Rent Allowance — 8-24% based on city) + TA (Transport Allowance) + other allowances. So agar basic Rs 25,500 hai toh in-hand salary approximately Rs 40,000-52,000 hoti hai (city par depend karta hai).',
          'Annual increment: Har saal 1st July ko 3% increment milta hai basic pay par. MACP (Modified Assured Career Progression) ke under 10, 20, 30 saal ke baad pay level upgrade hota hai agar promotion nahi mila toh.',
        ],
      },
      {
        heading: 'Leave Rules — Chhuttiyon Ka Hisaab',
        paragraphs: [
          'Government job ki sabse badi perk hai leave rules — itni chhuttiyan private sector mein kabhi nahi milti. Yeh Central Government ke leave rules hain (state rules thode alag ho sakte hain):',
        ],
        bullets: [
          'Casual Leave (CL): 8 din per year. Half-day CL bhi le sakte ho. CL carry forward nahi hoti — saal khatam toh khatam. CL mein salary normal milti hai.',
          'Earned Leave (EL): 30 din per year (15 din har 6 months mein credit hoti hai). EL accumulate hoti hai — maximum 300 din tak. Retirement ke time unused EL ka encashment milta hai (lump sum payment).',
          'Half Pay Leave (HPL): 20 din per year. Medical ya personal reasons ke liye. HPL mein aadhi salary milti hai.',
          'Commuted Leave: HPL ko convert karke poori salary le sakte ho — lekin 2 HPL = 1 Commuted Leave.',
          'Maternity Leave: 180 din (6 months). 2 bacchon tak. Full salary milti hai.',
          'Paternity Leave: 15 din. Child birth ya adoption ke time.',
          'Child Care Leave (CCL): 730 din (2 saal). 18 saal se kam age ke bacche ki care ke liye. Female employees ke liye. Full salary milti hai.',
          'Study Leave: 2 saal (730 din). Higher studies ke liye — permission se. Stipend milta hai.',
          'Gazetted Holidays: 14-17 gazetted holidays per year (Republic Day, Independence Day, Gandhi Jayanti, Diwali, Holi, etc.).',
          'Restricted Holidays: 2 din choose kar sakte ho additional holidays ke liye given list se.',
        ],
      },
      {
        heading: 'Service Book — Sab Record Rakho',
        paragraphs: [
          'Government naukri join karte hi aapki Service Book banti hai — yeh aapka official employment record hai. Joining date, posting details, promotions, leaves, ACR ratings — sab is book mein record hota hai. Retirement tak yeh book maintain hoti hai.',
          'Important tip: Service Book ki personal copy bhi rakhna — kuch entries agar miss ho gayi toh baad mein pension ya promotion mein problem aati hai. Har transfer ke time, promotion ke time — Service Book update karwao aur verify karo ki entries sahi hain.',
          'Joining ke time yeh sab karwana zaroori hai: (1) Service Book banwao, (2) NPS enrollment, (3) Bank account salary ke liye, (4) Group Insurance Scheme (CGEGIS) enrollment, (5) Health card (CGHS/State health scheme), (6) Nomination forms bharo (GPF/NPS, CGEGIS, Gratuity — nominee register karo). Yeh sab joining ke pehle hafte mein establishment section mein jaake karwao — delay mat karo.',
        ],
      },
    ],
  },
  {
    slug: 'ssc-cgl-salary-7th-pay-commission',
    title: 'SSC CGL Salary After 7th Pay Commission 2026 — Post-wise Complete Details',
    description:
      'Complete breakdown of SSC CGL salary after 7th Pay Commission. Post-wise in-hand salary for Tax Assistant, Auditor, Inspector, ASO with DA, HRA, and all allowances.',
    readTime: '10 min read',
    category: 'SSC',
    categoryColor: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'SSC CGL clear karne ke baad sabse pehla sawaal hota hai — "salary kitni milegi?" 7th Pay Commission ke baad CGL posts ki salary kaafi achhi ho gayi hai. Depending on the post, aapka pay level 4 se lekar 7 tak hota hai, aur in-hand salary Rs 35,000 se lekar Rs 65,000 tak pahunch sakti hai — city aur post ke hisaab se.',
          'Is article mein hum har ek CGL post ki salary ka complete breakdown denge — basic pay, Dearness Allowance, House Rent Allowance, Transport Allowance, aur net in-hand salary. Sab numbers 2026 ke latest DA rate (53% as of January 2026) ke saath calculate kiye gaye hain.',
        ],
      },
      {
        heading: 'Pay Level 4, 5, 6, 7 — Kya Matlab Hai?',
        paragraphs: [
          '7th Pay Commission mein har government post ko ek Pay Level assign hota hai. SSC CGL ke through jo posts milti hain unka pay level 4 se 7 tak hota hai. Pay Level 4 ka basic pay Rs 25,500 se start hota hai (entry level), Pay Level 5 ka Rs 29,200 se, Pay Level 6 ka Rs 35,400 se, aur Pay Level 7 ka Rs 44,900 se.',
          'Pay Level jitna zyada hoga, basic pay utni zyada hogi — aur saari allowances basic pay ke percentage pe calculate hoti hain. Isliye Pay Level 7 ki in-hand salary Pay Level 4 se almost double hoti hai. CGL ke through milne wali top post — Assistant Section Officer (ASO) — Pay Level 7 pe aati hai.',
        ],
      },
      {
        heading: 'Post-wise Salary — Tax Assistant, Auditor, Inspector, ASO',
        paragraphs: [
          'Tax Assistant (CBDT/CBIC) Pay Level 4 mein aata hai — basic pay Rs 25,500 se start. In-hand salary Delhi mein approximately Rs 38,000-42,000 milti hai. Auditor (C&AG, CGDA) bhi Pay Level 5 mein hai — basic Rs 29,200, in-hand around Rs 42,000-47,000 in metros. Inspector posts (Central Excise, Preventive Officer, Examiner) Pay Level 7 mein aati hain — basic Rs 44,900, in-hand Rs 58,000-65,000 in X cities.',
          'ASO (Assistant Section Officer) CSS cadre mein Pay Level 7 pe hai. Yeh post Central Secretariat mein hoti hai, matlab Delhi posting guaranteed hai initially. ASO ki in-hand salary Rs 60,000-65,000 hoti hai first posting mein. Statistical Investigator Grade-II bhi Pay Level 7 pe hai with similar salary structure.',
        ],
        bullets: [
          'Tax Assistant (CBDT/CBIC): Pay Level 4, Basic Rs 25,500, In-hand Rs 38,000-42,000 (Delhi)',
          'Auditor (C&AG/CGDA): Pay Level 5, Basic Rs 29,200, In-hand Rs 42,000-47,000 (Delhi)',
          'Sub Inspector (CBI): Pay Level 6, Basic Rs 35,400, In-hand Rs 50,000-55,000 (Delhi)',
          'Inspector (Central Excise/CGST): Pay Level 7, Basic Rs 44,900, In-hand Rs 58,000-65,000 (Delhi)',
          'ASO (CSS): Pay Level 7, Basic Rs 44,900, In-hand Rs 60,000-65,000 (Delhi)',
        ],
      },
      {
        heading: 'In-Hand Salary Calculation — Basic + DA + HRA + TA',
        paragraphs: [
          'In-hand salary calculate karna simple hai. Example lete hain Inspector (Pay Level 7) ka, Delhi mein posted: Basic Pay Rs 44,900 + DA @ 53% = Rs 23,797 + HRA @ 27% of basic (X city) = Rs 12,123 + Transport Allowance Rs 7,200 + DA on TA = Rs 3,816. Total gross = Rs 91,836. Deductions: NPS @ 10% of (Basic+DA) = Rs 6,870 + CGHS Rs 350 + CGEGIS Rs 1,500. Net in-hand = approximately Rs 63,000-65,000.',
          'Lower pay level posts mein bhi same formula lagta hai. Tax Assistant (Pay Level 4, Basic Rs 25,500): gross around Rs 53,000, deductions around Rs 5,000-6,000, net in-hand Rs 38,000-42,000 depending on exact city. Yeh sab numbers joining ke time ke hain — har saal DA revision hota hai January aur July mein, toh salary gradually badhti rehti hai.',
        ],
      },
      {
        heading: 'City-wise HRA — X, Y, Z Classification',
        paragraphs: [
          'HRA (House Rent Allowance) city classification pe depend karta hai. X cities (Delhi, Mumbai, Kolkata, Chennai, Bengaluru, Hyderabad etc.) mein HRA 27% of basic milta hai. Y cities (Lucknow, Jaipur, Chandigarh, Pune, Ahmedabad, etc.) mein 18% milta hai. Z cities (remaining small cities/towns) mein 9% milta hai.',
          'Iska matlab hai ki same post pe agar aap Delhi mein ho toh in-hand salary kaafi zyada hogi compared to ek chhote sheher mein. Example: Inspector ka HRA Delhi mein Rs 12,123 hoga lekin Z city mein sirf Rs 4,041 — difference of Rs 8,000+ per month sirf HRA mein. Isliye kai log X city posting prefer karte hain initially.',
        ],
      },
      {
        heading: 'Perks Beyond Salary — Medical, LTC, Pension, Loans',
        paragraphs: [
          'Government job mein salary ke alawa bahut si perks milti hain jo private sector mein nahi milti. CGHS (Central Government Health Scheme) se free medical treatment milta hai — aapko aur aapke family ko. Empanelled hospitals mein cashless treatment available hota hai for major surgeries bhi.',
          'LTC (Leave Travel Concession) mein do trips milti hain in a 4-year block — ek hometown aur ek anywhere in India. Train fare fully reimbursed hota hai. Government quarters bhi milte hain (subsidized rent) agar available ho. Home loan pe interest subsidy milti hai. Children Education Allowance Rs 2,250 per month per child (max 2 children) milta hai.',
        ],
        bullets: [
          'CGHS: Free medical for self + family, cashless in empanelled hospitals',
          'LTC: 2 trips per 4-year block — hometown + all India',
          'NPS Pension: Government contributes 14% of Basic+DA towards your pension fund',
          'Children Education Allowance: Rs 2,250/month/child (max 2)',
          'Government quarters (Type-II/III/IV based on pay level) at subsidized rent',
          'Festival Advance, GPF loans, House Building Advance at low interest',
        ],
      },
      {
        heading: 'Promotion Scope — CGL Posts Mein Kitni Growth?',
        paragraphs: [
          'CGL ki sabse badi strength hai promotion scope. Tax Assistant (Pay Level 4) se aap Senior Tax Assistant (Level 5) mein 3-5 saal mein promote hote ho, phir Inspector (Level 7) mein, phir Superintendent (Level 8), AC/DC level tak jaate hain. Income Tax Inspector se aap Additional Commissioner tak pahunch sakte ho in 25-30 years.',
          'ASO (CSS cadre) ki promotion line sabse achhi mani jaati hai: ASO (Level 7) → Section Officer (Level 8, 4-5 years) → Under Secretary (Level 11, 12-15 years) → Deputy Secretary (Level 12) → Director (Level 13). CSS cadre mein Joint Secretary level tak bhi kuch officers promote hote hain. Inspector (Central Excise/CGST) se bhi Superintendent → AC → DC → Joint Commissioner tak growth hoti hai.',
          'SSC CGL overall ek excellent career choice hai — starting salary Rs 38,000+ hai aur top-level promotion pe Rs 2,00,000+ per month tak pahunch sakte ho retirement ke near.',
        ],
      },
    ],
  },
  {
    slug: 'bank-po-vs-ssc-cgl-comparison',
    title: 'Bank PO vs SSC CGL — Salary, Work, Growth, Which is Better?',
    description:
      'Detailed comparison of Bank PO and SSC CGL on salary, exam difficulty, work-life balance, transfers, promotions, and career growth. Decide which is better for you.',
    readTime: '12 min read',
    category: 'Comparison',
    categoryColor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'Bank PO aur SSC CGL — dono aspirants ke beech sabse popular government exams hain. Bahut se students dono exams ki preparation saath mein karte hain kyunki syllabus mein overlap hai. Lekin final choice mein confusion hoti hai — "agar dono clear ho jaaye toh kaunsi naukri join karun?" Is article mein hum dono ko har angle se compare karenge — salary, work culture, transfer policy, promotion, aur career satisfaction.',
          'Short answer: Agar aapko fixed hours, less work pressure, aur steady promotion chahiye toh SSC CGL behtar hai. Agar aapko higher starting salary, faster initial growth, aur banking sector ka exposure chahiye toh Bank PO jaao. Lekin detail mein samjho before deciding.',
        ],
      },
      {
        heading: 'Exam Difficulty — Kaunsa Zyada Mushkil?',
        paragraphs: [
          'SSC CGL ka exam ek straightforward pattern follow karta hai — Tier-1 (qualifying) aur Tier-2 (ranking). Total 4-5 months ka process hota hai. Maths, English, Reasoning, GK — in chaar subjects pe focus karna hota hai. Competition bahut hai (28 lakh+ applicants for 14,500 posts in 2025), lekin paper ka level manageable hai agar preparation consistent ho.',
          'Bank PO (SBI PO / IBPS PO) mein teen stages hain — Prelims, Mains, aur Interview. Mains mein Descriptive paper bhi aata hai (letter/essay writing). Interview ka weightage 20-25% hota hai overall selection mein. Bank PO mein Data Interpretation aur Analysis heavy hoti hai compared to CGL. Overall, Bank PO ka selection process thoda zyada demanding hai because of the interview round — CGL mein koi interview nahi hai.',
        ],
      },
      {
        heading: 'Syllabus Overlap — Ek Saath Prepare Ho Sakta Hai?',
        paragraphs: [
          'Achhi baat yeh hai ki 60-70% syllabus common hai. Quantitative Aptitude, Reasoning, English, aur General Awareness dono mein aate hain. Maths mein arithmetic portion almost same hai. English mein grammar aur comprehension dono mein similar hai. Isliye bahut se students dono exams saath mein dete hain — isse chances double ho jaate hain.',
          'Difference areas: Bank PO mein Data Interpretation, Computer Aptitude, aur Banking Awareness extra hai. SSC CGL mein Advanced Maths (Trigonometry, Geometry, Mensuration, Algebra) extra hai. Agar aap dono prepare kar rahe ho toh core syllabus pehle khatam karo, phir exam-specific topics ko alag se cover karo.',
        ],
      },
      {
        heading: 'Salary Comparison — In-Hand Kitni Milti Hai?',
        paragraphs: [
          'SBI PO ki starting in-hand salary approximately Rs 52,000-56,000 hoti hai metro city mein. IBPS PO ki around Rs 48,000-52,000 (bank pe depend karta hai). SSC CGL mein post pe depend karta hai — Inspector/ASO (Pay Level 7) ko Rs 58,000-65,000 milti hai, Tax Assistant (Level 4) ko Rs 38,000-42,000.',
          'Important point: Bank PO ko salary ke saath kuch extra perks milti hain — leased accommodation ya HRA (jo 30-40% of basic hota hai metro mein), entertainment allowance, newspaper allowance, aur petrol allowance (branch managers ko). SSC CGL mein government quarters, CGHS medical, LTC, aur NPS pension ka 14% government contribution milta hai. Long term mein, CGL Inspector/ASO ki total compensation Bank PO se comparable ya thodi better hai.',
        ],
        bullets: [
          'SBI PO: In-hand Rs 52,000-56,000 (metro), Rs 45,000-48,000 (rural)',
          'IBPS PO (PNB, BOB etc.): In-hand Rs 48,000-52,000 (metro)',
          'SSC CGL Inspector/ASO: In-hand Rs 58,000-65,000 (Delhi/metro)',
          'SSC CGL Tax Assistant: In-hand Rs 38,000-42,000 (Delhi)',
          'SSC CGL Auditor: In-hand Rs 42,000-47,000 (metro)',
        ],
      },
      {
        heading: 'Work-Life Balance — Daily Routine Kaisi Hoti Hai?',
        paragraphs: [
          'SSC CGL posts mein generally 9:00 AM to 5:30 PM fixed hours hote hain, Monday to Friday. Saturday-Sunday off. Overtime rare hai except kuch specific posts mein (year-end closing ya audit season mein Auditors ko extra hours lagte hain). Overall, CGL posts mein work-life balance achha hota hai — 5-day week guaranteed hai Central Government mein.',
          'Bank PO mein officially 10:00 AM to 5:00 PM hota hai lekin practically 9:00 AM to 7:00-8:00 PM tak kaam chalta hai. Month-end mein aur quarter-end mein pressure bahut zyada hota hai. Saturday ko alternate weeks open hota hai. Rural branches mein target pressure hota hai — insurance, loans, credit cards sell karne ka. Urban branches mein crowd aur customer complaints handle karne padte hain. Bank PO ka work pressure CGL se significantly zyada hai — yeh sabse bada differentiator hai.',
        ],
      },
      {
        heading: 'Transfer Policy — Kahan Posting Hogi?',
        paragraphs: [
          'SSC CGL mein transfer policy post pe depend karti hai. Central Excise/CGST Inspector ka transfer zonal hota hai — ek zone mein rehte ho (generally 4-5 states ka area). Tax Assistant ka transfer All India ho sakta hai lekin practically limited rehta hai. ASO ki posting Delhi mein hoti hai (Central Secretariat) — initial years mein Delhi hi rehta hai. Auditors ka transfer bhi limited hota hai.',
          'Bank PO mein transfer bahut frequent hota hai — har 3 years mein. SBI mein Circle level transfer hota hai (usually 3-4 states ka area). Rural posting initially mandatory hai — 2-3 years rural area mein kaam karna padta hai. IBPS PO mein bank pe depend karta hai — kuch banks All India transfer karte hain. Overall, Bank mein transfers zyada hote hain aur rural posting ka issue hai jo CGL mein nahi hai.',
        ],
      },
      {
        heading: 'Promotion Timeline — Kitne Saal Mein Kya Banega?',
        paragraphs: [
          'Bank PO ki promotion line: PO → Senior Manager (3-5 years) → Chief Manager (8-10 years) → AGM (15-18 years) → DGM → GM → CGM. Bank mein promotion relatively fast hai initially — PO se Senior Manager 3-5 saal mein hota hai. Lekin AGM ke baad competition based hota hai aur growth slow ho jaati hai.',
          'SSC CGL promotion (Inspector example): Inspector → Superintendent (4-6 years) → Assistant Commissioner (10-15 years) → Deputy Commissioner → Joint Commissioner → Additional Commissioner → Commissioner. CGL mein promotion slower hai initially lekin top level higher hai — IRS officers Group A mein promote hote hain.',
        ],
      },
      {
        heading: 'Final Verdict — Kaunsi Naukri Choose Kare?',
        paragraphs: [
          'Choose Bank PO if: aapko higher starting salary chahiye, aap people interaction mein comfortable ho, rural posting se problem nahi, aur fast initial promotion chahiye. Banking sector mein exposure achha milta hai — financial markets, loans, forex — yeh knowledge private sector mein bhi kaam aati hai agar aap baad mein switch karte ho.',
          'Choose SSC CGL if: aapko work-life balance priority hai, 5-day week chahiye, interview face nahi karna, aur long-term career growth chahiye. CGL Inspector/ASO posts mein work pressure kam hai, transfers manageable hain, aur government ke core departments mein kaam karne ka experience milta hai — policy making, revenue collection, audit.',
          'Agar dono clear ho jaaye toh: Inspector (Central Excise/CGST) > SBI PO > ASO > IBPS PO > Tax Assistant — yeh general preference hota hai most aspirants ka, salary aur work-life balance dono consider karke.',
        ],
      },
    ],
  },
  {
    slug: 'government-job-after-35-age',
    title: 'Government Jobs After 35 Age — 35 साल के बाद कौन सी नौकरी मिल सकती है?',
    description:
      '35 saal ke baad bhi sarkari naukri mil sakti hai. CTET, NTA NET, UPSC (OBC/SC/ST), State PCS, contractual jobs, aur teaching positions ki complete list with age limits.',
    readTime: '8 min read',
    category: 'Guide',
    categoryColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          '35 saal ke baad bahut se log sochte hain ki ab sarkari naukri ka chance nahi raha. Yeh galat hai. Bahut si government exams hain jinka upper age limit 35 se zyada hai — kuch mein toh koi upper age limit hi nahi hai. Is article mein hum un sab options ko cover karenge jo 35+ age ke candidates ke liye available hain.',
          'Important baat: reserved categories (OBC, SC, ST, PwD) ko additional age relaxation milta hai — 3 years OBC, 5 years SC/ST, 10 years PwD. Matlab agar upper age limit 35 hai toh OBC ke liye 38, SC/ST ke liye 40, aur PwD ke liye 45 tak apply kar sakte ho.',
        ],
      },
      {
        heading: 'Exams With No Upper Age Limit',
        paragraphs: [
          'CTET (Central Teacher Eligibility Test) mein koi upper age limit nahi hai — sirf minimum age 17 years hai. CTET qualify karne ke baad aap KVS, NVS, ya Central Government schools mein teaching positions ke liye apply kar sakte ho. Agar aapke paas B.Ed ya D.El.Ed hai toh CTET de sakte ho chahe aap 40 ya 50 saal ke ho.',
          'NTA UGC NET mein bhi Assistant Professor ke liye koi upper age limit nahi hai. JRF ke liye 30 years hai (SC/ST/OBC/PwD ko relaxation milta hai). NET qualify karke aap kisi bhi university ya college mein Assistant Professor ban sakte ho — salary Rs 57,700 basic (Level 10) se start hoti hai, in-hand Rs 80,000+ milti hai.',
        ],
        bullets: [
          'CTET: No upper age limit. Qualify karke KVS/NVS teacher ban sakte ho.',
          'NTA UGC NET: No upper age limit for Assistant Professor eligibility.',
          'GATE: No upper age limit. PSU jobs ke liye useful hai.',
          'Some State TET exams: No upper age limit (state pe depend karta hai).',
        ],
      },
      {
        heading: 'Exams With 40+ Age Limit',
        paragraphs: [
          'UPSC Civil Services ka upper age limit General ke liye 32 years hai, lekin OBC ke liye 35, SC/ST ke liye 37, aur PwD ke liye 42 years tak hai. Matlab OBC candidate 35 saal tak aur SC/ST candidate 37 tak UPSC de sakte hain. Number of attempts bhi extra milte hain — OBC ko 9, SC/ST ko unlimited (age limit tak).',
          'State PCS exams mein age limit generally higher hoti hai — UP PCS mein General ke liye 40 years, Bihar PCS mein 37, Rajasthan PCS mein 40 (OBC ke liye 43, SC/ST ke liye 45). MP PCS mein General 40, OBC 43, SC/ST 45. Yeh state-level exams 35+ candidates ke liye excellent options hain — SDM, DSP, BDO level ki posts milti hain.',
        ],
      },
      {
        heading: 'Contractual Government Jobs — Age Limit Relaxed',
        paragraphs: [
          'Bahut si government agencies contractual positions offer karti hain jahan age limit 40-45 years tak hoti hai, ya kuch cases mein koi age limit nahi. NITI Aayog, Ministry of IT, Defense Research, DRDO mein consultants aur project-based positions regularly nikti hain. In positions mein salary Rs 40,000 se Rs 1,50,000 tak hoti hai experience ke basis pe.',
          'SSC ka Contract basis pe bhi recruitment hota hai — Data Entry Operators, MTS, aur clerical posts mein contractual hiring hoti hai jahan age limit 40+ hota hai. State governments bhi contractual teachers, Anganwadi workers, Gram Rojgar Sahayak, aur similar posts mein 35+ candidates ko recruit karti hain.',
        ],
      },
      {
        heading: 'Teaching Positions — 35 Ke Baad Best Option',
        paragraphs: [
          'Teaching government jobs 35+ candidates ke liye sabse reliable option hain. KVS (Kendriya Vidyalaya Sangathan) mein PGT ke liye age limit 40 years hai, TGT ke liye 35 (SC/ST/OBC ko relaxation extra). NVS (Navodaya Vidyalaya) mein bhi similar age limits hain. State government schools mein teacher recruitment mein age limit 35-42 years tak hoti hai.',
          'Salary bhi achhi hai: PGT (Post Graduate Teacher) ki salary Pay Level 8 mein hai — basic Rs 47,600, in-hand Rs 55,000-65,000. TGT (Trained Graduate Teacher) Level 7 mein — basic Rs 44,900, in-hand Rs 50,000-60,000. University Assistant Professor Level 10 mein — basic Rs 57,700, in-hand Rs 80,000+. Teaching mein work-life balance bhi excellent hai — vacations milti hain, working hours fixed hain.',
        ],
      },
      {
        heading: 'Ex-Servicemen Options',
        paragraphs: [
          'Ex-servicemen (retired defence personnel) ko bahut si government jobs mein significant age relaxation milta hai — generally actual service period + 3 years. Matlab agar aapne 15 saal defence mein serve kiya aur 36 pe retire hue, toh aapko 15+3 = 18 years ka age relaxation milega. Isse most exams jo 25-30 age limit rakhte hain, unke liye bhi ex-servicemen 43-48 saal tak eligible rehte hain.',
          'Ex-servicemen ke liye reserved posts: CAPF (BSF, CRPF, CISF mein re-employment), Bank security guards, Railway RPF, Post Office, aur state police mein reserved vacancies hoti hain. DGR (Directorate General of Resettlement) ki website pe regularly ex-servicemen ke liye openings aati hain.',
        ],
      },
      {
        heading: 'Age Relaxation Stacking Rules — Kya Double Relaxation Milta Hai?',
        paragraphs: [
          'Ek common sawaal: "Main OBC bhi hoon aur ex-serviceman bhi — toh kya dono relaxation milegi?" Answer hai: generally nahi. Most exams mein sirf ek category ki relaxation milti hai — jo bhi zyada beneficial ho woh choose kar sakte ho. Lekin kuch exceptions hain — PwD + OBC dono ka relaxation kuch exams mein stack hota hai.',
          'UPSC mein clearly mention hota hai ki "cumulative age relaxation will not be available" for multiple categories — aapko ek choose karna hota hai. State PCS rules alag hote hain — kuch states double relaxation allow karte hain. Har exam ka notification carefully padho aur age relaxation section mein exact rules check karo before applying.',
          'Pro tip: 35+ age mein exam preparation start karne ka sabse important factor hai focus. Ek ya do exams choose karo — teaching (CTET/NET) ya State PCS — aur unpe full focus karo. Multiple exams mein energy split mat karo. 35 ke baad attempts limited hote hain, toh har attempt count karna chahiye.',
        ],
      },
    ],
  },
  {
    slug: 'free-coaching-sc-st-obc-students',
    title: 'Free Government Coaching for SC/ST/OBC Students — स्कॉलरशिप और मुफ्त कोचिंग',
    description:
      'SC/ST/OBC students ke liye free government coaching schemes — NSFDC, NBCFDC, PM Daksh, state-wise free coaching programs, eligibility, aur apply kaise kare.',
    readTime: '9 min read',
    category: 'Guide',
    categoryColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'Sarkari naukri ki preparation mein coaching ka kharcha ek bada barrier hai — UPSC coaching Rs 1-2 lakh, SSC coaching Rs 30,000-50,000, Bank coaching Rs 15,000-25,000 tak jaata hai. Lekin bahut se students ko pata nahi ki Central aur State governments SC/ST/OBC students ke liye completely free coaching provide karti hain — with stipend bhi.',
          'Is article mein hum Central Government ki major free coaching schemes, state-wise programs, eligibility criteria, aur apply karne ka complete process cover karenge. Agar aap SC/ST/OBC category se ho aur competitive exam ki preparation karna chahte ho — toh yeh options zaroor explore karo.',
        ],
      },
      {
        heading: 'Central Government Schemes — NSFDC & NBCFDC',
        paragraphs: [
          'NSFDC (National Scheduled Castes Finance and Development Corporation) SC students ke liye free coaching chalata hai top competitive exams ke liye — UPSC, SSC, Banking, Railway, State PCS. Coaching reputed institutes mein hoti hai (jaise Delhi mein ALS, Vajiram, Drishti etc. se tie-up hai). Students ko free coaching ke saath Rs 2,500 per month stipend bhi milta hai living expenses ke liye.',
          'NBCFDC (National Backward Classes Finance and Development Corporation) OBC students ke liye similar scheme chalata hai. Is scheme mein UPSC, SSC, Banking, Railway, JEE, NEET, CLAT jaise exams ki coaching milti hai. Annual family income limit Rs 3 lakh (non-creamy layer) honi chahiye. Coaching ke saath Rs 2,000-3,000 per month ka maintenance allowance milta hai.',
        ],
        bullets: [
          'NSFDC Free Coaching (SC): Top institutes mein coaching + Rs 2,500/month stipend. Apply: nsfdc.nic.in',
          'NBCFDC Free Coaching (OBC): Coaching + Rs 2,000-3,000/month allowance. Family income < Rs 3 lakh. Apply: nbcfdc.gov.in',
          'NSTFDC (ST students): Similar scheme for Scheduled Tribes. Apply: nstfdc.nic.in',
          'Ministry of Social Justice: Central Sector Scheme for coaching. Apply through National Fellowship Portal.',
        ],
      },
      {
        heading: 'State-wise Free Coaching Programs',
        paragraphs: [
          'UP mein "Abhyudaya Coaching Yojana" hai — state government ki free coaching UPSC, NEET, JEE, NDA, CDS, SSC ke liye. Divisional headquarters pe chalti hai — free of cost, koi income limit nahi. Bihar mein SC/ST/OBC students ke liye Mukhyamantri Anusuchit Jati/Janjati Free Coaching scheme hai — top 30 reputed coaching institutes mein free admission milta hai with Rs 3,000/month stipend.',
          'Rajasthan mein Mukhyamantri Anuprati Coaching Yojana hai — UPSC, RPSC, SSC, Banking, REET ki free coaching with Rs 40,000 per year assistance. MP mein SC/ST/OBC students ke liye Free UPSC/State PCS coaching Bhopal mein chalti hai — hostel aur mess ka kharcha bhi government deti hai. Delhi mein SC/ST/OBC residents ke liye free coaching scheme hai — empanelled institutes mein admission milta hai with Rs 2,500/month stipend.',
        ],
        bullets: [
          'UP — Abhyudaya Coaching: Free coaching for UPSC, SSC, Banking. No income limit. Apply: abhyuday.up.gov.in',
          'Bihar — Mukhyamantri Free Coaching: Rs 3,000/month stipend + coaching. SC/ST/OBC/EWS.',
          'Rajasthan — Anuprati Coaching: Rs 40,000/year + free coaching for competitive exams.',
          'MP — Free UPSC Coaching Bhopal: Hostel + mess + coaching free for SC/ST/OBC.',
          'Delhi — SC/ST/OBC Coaching: Rs 2,500/month stipend + coaching in empanelled institutes.',
          'Maharashtra — Rajarshi Shahu Maharaj: SC/OBC students ke liye free UPSC/MPSC coaching.',
        ],
      },
      {
        heading: 'PM Daksh Scheme — Skill + Competitive Exam Coaching',
        paragraphs: [
          'PM DAKSH (Pradhan Mantri Dakshta Aur Kushalta Sampann Hitgrahi) scheme Ministry of Social Justice and Empowerment chalata hai. Yeh specifically SC/OBC/Safai Karamchari communities ke liye hai. Is scheme ke under free skill development training milti hai — short term (up to 3 months), long term (up to 12 months), aur entrepreneurship development programs.',
          'Competitive exam coaching bhi is scheme ke under available hai. Training ke dauran Rs 1,500 per month stipend milta hai aur post-training placement support bhi milta hai. Apply karne ke liye pmdaksh.dosje.gov.in pe jaao — online registration hai, Aadhaar aur caste certificate chahiye. Har saal approximately 2.7 lakh beneficiaries ko cover kiya jaata hai.',
        ],
      },
      {
        heading: 'Eligibility Criteria — Kaun Apply Kar Sakta Hai?',
        paragraphs: [
          'Central schemes ke liye general eligibility: SC/ST/OBC category ka valid caste certificate hona chahiye. Annual family income mostly Rs 3-6 lakh se kam honi chahiye (scheme pe depend karta hai). Age generally 20-35 years ke beech honi chahiye. Minimum educational qualification graduation hona chahiye (UPSC coaching ke liye) ya 12th pass (SSC/Banking coaching ke liye).',
          'State schemes ki eligibility alag hoti hai — kuch states mein income limit zyada hai (Rs 8 lakh tak), kuch mein domicile certificate mandatory hai. EWS (Economically Weaker Section — General category) candidates bhi ab bahut si state schemes mein eligible hain — income limit Rs 8 lakh per annum.',
        ],
        bullets: [
          'Valid SC/ST/OBC/EWS certificate (latest, taluqa/tehsil se issued)',
          'Annual family income: Rs 3-6 lakh (Central), up to Rs 8 lakh (some States)',
          'Age: Generally 20-35 years (relaxation available for reserved categories)',
          'Education: Graduation for UPSC coaching, 12th pass for SSC/Banking coaching',
          'Domicile certificate (state schemes ke liye mandatory)',
          'Aadhaar card aur bank account (DBT stipend ke liye)',
        ],
      },
      {
        heading: 'How to Apply — Step by Step Process',
        paragraphs: [
          'Step 1: Decide karo ki aap Central scheme chahte ho ya State scheme — Central schemes mein institute choice zyada hota hai lekin competition bhi zyada. State schemes mein local coaching milti hai jo regional exams ke liye better hai. Step 2: Eligibility check karo — income certificate, caste certificate, aur educational documents ready rakho.',
          'Step 3: Online apply karo respective website pe — NSFDC ka nsfdc.nic.in, NBCFDC ka nbcfdc.gov.in, PM Daksh ka pmdaksh.dosje.gov.in, state schemes ki respective portals pe. Application deadline generally March-May mein hoti hai (coaching July-August se start hoti hai). Step 4: Document verification ke baad merit list aati hai — selected candidates ko coaching institute allot hota hai.',
          'Pro tip: Multiple schemes mein simultaneously apply karo — agar ek mein selection nahi hua toh doosri mein chance rehta hai. Lekin ek baar selected ho jaao toh sirf ek scheme ka benefit le sakte ho — duplicate benefit lena fraud hai aur legal action ho sakta hai.',
        ],
      },
      {
        heading: 'Online vs Offline Coaching — Kaunsi Better?',
        paragraphs: [
          'Government free coaching schemes mostly offline hoti hain — classroom coaching empanelled institutes mein. Lekin COVID ke baad bahut si schemes mein online coaching option bhi add hua hai. UP Abhyudaya coaching mein online classes bhi available hain. IGNOU ke through bhi SC/ST students ke liye free online coaching material milta hai.',
          'Agar aap chhote sheher mein ho aur relocate nahi kar sakte toh online coaching options explore karo — Unacademy, PW, aur Testbook jaise platforms pe bhi SC/ST/OBC students ke liye scholarship programs hain jo 50-100% fee waiver dete hain. Combine government stipend (Rs 2,000-5,000/month) with free online coaching — yeh sabse cost-effective preparation strategy hai.',
        ],
      },
    ],
  },
  {
    slug: 'ssc-chsl-salary-promotion-2026',
    title: 'SSC CHSL Salary 2026 — LDC, DEO, PA/SA Post-wise In-Hand Salary',
    description:
      'SSC CHSL salary 2026 ka complete breakdown — LDC, DEO, PA/SA ki post-wise in-hand salary, allowances, promotion path, aur kitne saal mein kya milega.',
    readTime: '8 min read',
    category: 'SSC',
    categoryColor: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'SSC CHSL (Combined Higher Secondary Level) exam 12th pass candidates ke liye sabse popular government exam hai. Is exam ke through teen tarah ki posts milti hain — LDC/JSA (Lower Division Clerk/Junior Secretariat Assistant), DEO (Data Entry Operator), aur PA/SA (Postal Assistant/Sorting Assistant). Teeno ki salary alag hoti hai kyunki pay level alag hai.',
          'CHSL ki salary CGL se kam hai — yeh fact hai. Lekin CHSL bhi ek permanent Central Government job hai with all benefits — pension, medical, LTC, job security. Aur promotion ke through aap CGL level tak pahunch sakte ho. Chaliye detail mein samjhte hain.',
        ],
      },
      {
        heading: 'Pay Level 2, 4, 5 — CHSL Posts Ka Structure',
        paragraphs: [
          'LDC/JSA Pay Level 2 mein aata hai — basic pay Rs 19,900 se start hoti hai aur maximum Rs 63,200 tak jaati hai. DEO Pay Level 4 mein hai — basic Rs 25,500 se Rs 81,100. PA/SA bhi Pay Level 4 mein hai — same basic pay Rs 25,500. Kuch DEO posts (higher grade) Pay Level 5 mein bhi hain — basic Rs 29,200.',
          'Yahan ek important clarification: CHSL mein sabse common post LDC hai — majority vacancies LDC ki hoti hain. PA/SA ki vacancies kam hoti hain lekin salary better hai. DEO ki vacancies sabse kam hoti hain. Isliye agar CHSL de rahe ho toh expect karo ki LDC post mil sakti hai — jo sabse kam salary wali post hai.',
        ],
      },
      {
        heading: 'LDC In-Hand Salary Calculation',
        paragraphs: [
          'LDC (Pay Level 2, Basic Rs 19,900) ki in-hand salary calculate karte hain Delhi mein: Basic Rs 19,900 + DA @ 53% = Rs 10,547 + HRA @ 27% (X city) = Rs 5,373 + Transport Allowance Rs 3,600 + DA on TA = Rs 1,908. Gross salary = Rs 41,328. Deductions: NPS 10% of (Basic+DA) = Rs 3,045 + CGHS Rs 250 + CGEGIS Rs 1,500. Net in-hand approximately Rs 30,000-33,000.',
          'Chhote sheher (Z city) mein: HRA sirf 9% hoga = Rs 1,791, toh in-hand Rs 25,000-28,000 ke around hogi. Yeh starting salary hai — har saal DA badhta hai (roughly 3-4% per year) aur annual increment bhi milta hai (3% of basic). 5 saal baad LDC ki salary approximately Rs 35,000-40,000 ho jaati hai.',
        ],
      },
      {
        heading: 'DEO & PA/SA In-Hand Salary',
        paragraphs: [
          'DEO aur PA/SA (Pay Level 4, Basic Rs 25,500) ki salary LDC se kaafi better hai. Delhi mein calculation: Basic Rs 25,500 + DA @ 53% = Rs 13,515 + HRA @ 27% = Rs 6,885 + Transport Allowance Rs 3,600 + DA on TA = Rs 1,908. Gross = Rs 51,408. Deductions approximately Rs 5,000-5,500. Net in-hand Rs 38,000-42,000.',
          'PA/SA post Department of Posts mein hoti hai — post office mein kaam karna padta hai. DEO data entry ka kaam karta hai — generally ministries ya attached offices mein. Dono ki salary same hai lekin work nature alag hai. PA/SA mein counter duty hoti hai (public dealing), DEO mein computer pe data entry — zyada tar log DEO prefer karte hain work comfort ke liye.',
        ],
      },
      {
        heading: 'Allowances — DA, HRA, TA Ke Alawa Kya Milta Hai?',
        paragraphs: [
          'Basic salary aur standard allowances ke alawa CHSL posts mein bhi woh sab perks milti hain jo Central Government employees ko milti hain. CGHS medical cover — free treatment government hospitals mein aur empanelled private hospitals mein. LTC — 2 trips per 4-year block (hometown + all India). Children Education Allowance — Rs 2,250/month per child (max 2 children).',
          'Festival Advance Rs 10,000 (interest-free loan, har saal). Overtime Allowance bhi kuch posts mein milta hai. Government quarters agar available ho toh subsidized rent pe milte hain — LDC ko Type-I quarters allot hote hain. NPS mein government 14% contribute karti hai aapke pension fund mein. Overall benefits add karein toh actual compensation in-hand salary se 30-40% zyada hoti hai.',
        ],
      },
      {
        heading: 'Promotion Path — LDC Se UDC Se Assistant Tak',
        paragraphs: [
          'LDC ka promotion path: LDC (Level 2) → UDC/Upper Division Clerk (Level 4) → Assistant (Level 6) → Section Officer (Level 8). LDC se UDC mein promotion approximately 3-5 saal mein hota hai (departmental exam pass karna padta hai). UDC se Assistant mein 5-8 saal aur lagte hain. Assistant se Section Officer mein 8-10 saal.',
          'PA/SA ka promotion path: PA/SA (Level 4) → LSG (Lower Selection Grade, Level 5) → HSG-II (Level 6) → HSG-I (Level 7) → Postmaster/ASP (Level 8). PA/SA mein promotion Department of Posts ke rules ke according hota hai — relatively faster hai compared to LDC line.',
          'Important point: LDC se lekar Section Officer tak pahunchne mein 15-20 saal lagte hain. Lekin Section Officer ki salary Rs 65,000-75,000 hoti hai — jo CGL ASO ke equivalent hai. Matlab CHSL se bhi aap eventually CGL level salary tak pahunch sakte ho — bas time zyada lagta hai.',
        ],
      },
      {
        heading: 'CHSL Leni Chahiye Ya CGL Ka Wait Kare?',
        paragraphs: [
          'Yeh decision aapki situation pe depend karta hai. Agar aap graduate ho aur CGL level ki preparation hai toh CGL try karo — directly Inspector/ASO level ki post milegi with higher salary. Lekin agar CGL 2-3 attempts mein nahi nikla aur CHSL ka offer aa gaya hai toh le lo — government job hai, security hai, aur promotion se grow kar sakte ho.',
          'Bahut se log CHSL join karke CGL ki preparation continue karte hain — yeh valid strategy hai. Government job mein rehke study leave ya deputation pe coaching bhi mil sakti hai. Aur agar CGL nikal gaya toh resign karke join kar lo. CHSL ko "backup" ki tarah use karna — yeh smartest approach hai. Kabhi bhi government job offer ko reject mat karo agar aapke paas koi better confirmed option nahi hai.',
        ],
      },
    ],
  },
  {
    slug: 'railway-group-d-salary-perks',
    title: 'Railway Group D Salary 2026 — In-Hand Salary, Allowances & Free Travel Pass',
    description:
      'Railway Group D salary 2026 — Pay Level 1 in-hand salary, DA, HRA, free railway pass, medical benefits, quarters, promotion to Group C, aur working hours ki complete jaankari.',
    readTime: '8 min read',
    category: 'Railway',
    categoryColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'Railway Group D India ki sabse badi government recruitment hai — har cycle mein 1 lakh se zyada vacancies aati hain aur 1 crore+ log apply karte hain. Posts jaise Track Maintainer, Helper, Porter, Pointsman, Gateman — yeh sab Group D mein aate hain. Bahut se candidates ke mann mein yeh sawaal hota hai — "itni mehnat karke selection hua, toh salary kitni milegi?"',
          'Railway Group D Pay Level 1 mein aata hai — jo 7th Pay Commission ka sabse basic level hai. Basic pay Rs 18,000 se start hoti hai. Sunne mein kam lagti hai, lekin Railway ki perks — free travel pass, medical, quarters, overtime — yeh sab jodke actual compensation Rs 30,000+ ho jaati hai. Chaliye detail mein samjhte hain.',
        ],
      },
      {
        heading: 'Pay Level 1 — Basic Pay Rs 18,000 to Rs 56,900',
        paragraphs: [
          'Group D ka Pay Level 1 hai — basic pay Rs 18,000 se start hoti hai aur maximum Rs 56,900 tak jaati hai. Har saal 3% annual increment milta hai — matlab pehle saal Rs 18,000, doosre saal Rs 18,540, teesre saal Rs 19,100 basic. 10 saal baad basic approximately Rs 24,000 ho jaati hai, 20 saal baad Rs 32,000+.',
          'Yeh sirf basic pay hai — allowances alag se milti hain. DA (Dearness Allowance) basic pay ka 53% milta hai (January 2026 rate). HRA city ke hisaab se 9-27% milta hai. Transport Allowance, Night Duty Allowance — sab extra. Actual in-hand salary basic pay se 40-60% zyada hoti hai.',
        ],
      },
      {
        heading: 'In-Hand Salary — Rs 22,000 to Rs 25,000 Starting',
        paragraphs: [
          'Group D ki in-hand salary calculate karte hain (Y city mein posted, starting basic Rs 18,000): Basic Rs 18,000 + DA @ 53% = Rs 9,540 + HRA @ 18% (Y city) = Rs 3,240 + Transport Allowance Rs 1,800 + DA on TA = Rs 954. Gross salary = Rs 33,534. Deductions: NPS 10% of (Basic+DA) = Rs 2,754 + other deductions Rs 1,000-1,500. Net in-hand approximately Rs 22,000-25,000.',
          'X city (Mumbai, Delhi) mein HRA 27% milta hai, toh in-hand Rs 24,000-27,000 ho jaati hai. Z city (small towns) mein HRA 9%, toh in-hand Rs 20,000-23,000. Overtime duty karne pe extra Rs 2,000-5,000 per month mil sakte hain. Night duty allowance bhi milta hai agar night shift mein kaam karte ho — Railways mein 24x7 operations chalte hain.',
        ],
      },
      {
        heading: 'Free Railway Pass — Sabse Badi Perk',
        paragraphs: [
          'Railway employees ko milne wali sabse valuable perk hai free railway pass. Group D employees ko har saal privilege passes milte hain — self aur family ke liye. Ek saal mein 6 sets of passes milte hain — har pass mein aap aur aapki family (spouse + 2 children) free travel kar sakte ho kahi bhi India mein. Pass sleeper class ka hota hai, lekin difference pay karke AC mein upgrade kar sakte ho.',
          'Post-retirement bhi railway pass milta hai — retired employees ko 2 sets per year aur spouse ko bhi milte hain. Iska monetary value samjho — agar aap saal mein 6 baar family ke saath travel karte ho long distance, toh Rs 50,000-80,000 worth ki travel free ho jaati hai. Yeh perk kisi aur government job mein nahi milti — Railway ki unique advantage hai.',
        ],
        bullets: [
          'Privilege Pass: 6 sets/year for self + family. All India travel. Sleeper class (AC mein upgradeable).',
          'PTO (Privilege Ticket Order): Additional subsidized tickets (33% of actual fare).',
          'School Pass: Children ke school travel ke liye free pass.',
          'Post-Retirement Pass: 2 sets/year for self + spouse.',
          'Duty Pass: Official travel ke liye unlimited free passes.',
        ],
      },
      {
        heading: 'Medical Benefits, Quarters & Other Perks',
        paragraphs: [
          'Railway ka apna medical system hai — Railway Hospitals poore India mein hain. Group D employees aur unki family ko completely free medical treatment milta hai railway hospitals mein. Serious cases mein empanelled private hospitals mein bhi free treatment milta hai — heart surgery, cancer treatment, dialysis sab covered hai. Yeh CGHS se bhi better system hai kyunki Railway hospitals directly managed hain.',
          'Railway quarters bhi milte hain — Group D ko Type-I quarters allot hote hain (small but functional). Rent nominal hota hai — Rs 500-1,000 per month. Quarters station/yard ke paas hote hain toh commute ka kharcha nahi lagta. Canteen subsidy milti hai — railway canteens mein subsidized food milta hai. Children ke education ke liye Railway Schools hain — fees minimal hai. Gratuity retirement pe milti hai — 15 days salary per year of service.',
        ],
      },
      {
        heading: 'Promotion — Group D Se Group C Mein Kaise Jaaye?',
        paragraphs: [
          'Group D se promotion Group C (Non-Technical Popular Categories — NTPC level posts) mein hota hai. Track Maintainer se Senior Track Maintainer, phir Trackman-I, phir Junior Engineer (JE) tak promote ho sakte ho. Helper se Skilled Worker, phir Senior Skilled Worker mein promote hote ho. Promotion time-bound hoti hai + departmental exam based.',
          'MACP (Modified Assured Career Progression) ke under bhi 3 financial upgradations guaranteed hain — 10, 20, aur 30 saal ki service complete karne pe. Matlab agar koi promotion nahi bhi hua toh 10 saal pe Level 2 ki pay milegi, 20 pe Level 3, 30 pe Level 4. MACP se salary automatically badhti rehti hai chahe actual promotion ho ya nahi.',
          'LDCE (Limited Departmental Competitive Exam) pass karke Group D se directly Group C ya even Group B mein bhi promote ho sakte ho. Railways mein departmental exam bahut important hai — prepare karo aur do. Bahut se Group D employees 10-15 saal mein Section Engineer ya Station Master level tak pahunch jaate hain through departmental exams.',
        ],
      },
      {
        heading: 'Working Hours & Leave — Kitne Ghante Kaam?',
        paragraphs: [
          'Railway Group D mein working hours post aur department pe depend karte hain. Track Maintainer ko generally 8 hours ki shift milti hai — morning shift (6 AM - 2 PM) ya day shift (8 AM - 4 PM). Station staff (Porter, Pointsman) ko rotational shifts milti hain — morning, evening, night. Night shift ke liye extra Night Duty Allowance milta hai.',
          'Leave entitlement: Casual Leave 8 din, Earned Leave 30 din per year, Half Pay Leave 20 din. Railways mein ek special leave hai — "Pass Leave" — jab aap privilege pass use karke travel karte ho toh pass leave milti hai. National holidays aur gazetted holidays bhi milti hain. Overall, Railway mein kaam physically demanding hai (especially Track Maintainer, Helper), lekin job security aur perks ke liye lakho log yeh naukri chahte hain.',
        ],
      },
    ],
  },
  {
    slug: 'upsc-vs-state-pcs-which-easier',
    title: 'UPSC vs State PCS — Which is Easier? Salary, Difficulty, Posts Comparison',
    description:
      'UPSC aur State PCS ka detailed comparison — exam difficulty, syllabus depth, competition level, salary, career progression, aur kaunsa exam pehle prepare karna chahiye.',
    readTime: '10 min read',
    category: 'Comparison',
    categoryColor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'UPSC Civil Services aur State PCS — dono exams administrative officers select karte hain. UPSC se IAS, IPS, IFS, IRS jaise All India Services milti hain. State PCS se SDM, DSP, Block Development Officer, State Civil Service officer bante ho. Bahut se aspirants confused rehte hain — "UPSC bahut mushkil hai, kya State PCS easy hai? Pehle kaunsa try karun?"',
          'Is article mein hum dono exams ko difficulty, syllabus, competition, salary, aur career growth ke basis pe compare karenge. Spoiler: State PCS UPSC se definitely easier hai, lekin "easy" nahi hai — dono mein serious preparation chahiye.',
        ],
      },
      {
        heading: 'Exam Pattern Comparison',
        paragraphs: [
          'UPSC pattern: Prelims (2 papers — GS + CSAT), Mains (9 papers including 2 optional + essay + 4 GS + 2 language qualifying), Interview (275 marks). Total Mains marks: 1750 + Interview 275 = 2025. Selection Prelims se Final result tak 12-14 months lagta hai. Optional subject ka selection bahut important hai.',
          'State PCS pattern state pe depend karta hai lekin generally: Prelims (2 papers — GS + CSAT similar to UPSC), Mains (generally 4-8 papers — GS + optional + Hindi/regional language + essay), Interview. UP PCS mein Mains ke 8 papers hain. Bihar PCS mein optional hat gaya hai. Rajasthan PCS mein 4 GS papers hain Mains mein. Overall, State PCS ka Mains UPSC se shorter aur less deep hota hai — kam papers, kam topics.',
        ],
      },
      {
        heading: 'Syllabus Depth — Kitna Padhna Padta Hai?',
        paragraphs: [
          'UPSC ka syllabus ocean jaisa hai — GS mein History, Geography, Polity, Economy, Environment, Science & Tech, Ethics, International Relations, Disaster Management, Internal Security sab covered karna padta hai. Optional subject ki depth post-graduation level ki hoti hai. Essay writing mein philosophical depth chahiye. Current affairs ka coverage 18 months ka chahiye.',
          'State PCS ka syllabus UPSC ka subset hai — core topics same hain lekin depth kam hai. State PCS mein state-specific GK bahut important hai — state ki history, geography, economy, current affairs. Optional subject kuch states mein hai (UP PCS) aur kuch mein nahi (Bihar PCS). Mains answers UPSC mein 200-250 words ke hote hain, State PCS mein 150-200 words — analysis ki depth kam chahiye.',
          'Practical terms mein: UPSC ki preparation 2-3 saal full-time chahiye. State PCS ki preparation 1-1.5 saal mein ho sakti hai agar focused ho. UPSC ke liye 15-20 books padhne padte hain, State PCS ke liye 8-12 books sufficient hain.',
        ],
      },
      {
        heading: 'Competition Level — Applicants vs Vacancies',
        paragraphs: [
          'UPSC CSE 2025 mein approximately 9.38 lakh log apply kiye, 5.77 lakh appeared, aur around 1,000 final selection hua. Success rate: approximately 0.1-0.2%. Yeh India ka toughest exam hai competition ke hisaab se.',
          'State PCS ki competition state pe depend karti hai. UP PCS 2024 mein around 7 lakh applications aayi thi, 300-400 posts ke liye — success rate 0.05-0.06% (actually UPSC se bhi tough by numbers). Lekin Bihar PCS mein 4 lakh applications aur 700+ posts hain — success rate better. Rajasthan PCS, MP PCS mein competition relatively less hai — 2-3 lakh applications with 200-400 posts.',
        ],
        bullets: [
          'UPSC CSE: ~5.77 lakh appeared, ~1,000 selected. Success rate ~0.17%.',
          'UP PCS: ~7 lakh applied, ~350 posts. Success rate ~0.05% (extremely tough).',
          'Bihar PCS: ~4 lakh applied, ~700 posts. Success rate ~0.18%.',
          'Rajasthan PCS: ~2.5 lakh applied, ~200 posts. Success rate ~0.08%.',
          'MP PCS: ~2 lakh applied, ~300 posts. Success rate ~0.15%.',
        ],
      },
      {
        heading: 'Salary Comparison — State PCS vs IAS',
        paragraphs: [
          'IAS officer ki starting salary Pay Level 10 mein hai — basic Rs 56,100, in-hand Rs 75,000-85,000 (without perks). Lekin IAS ki real compensation salary mein nahi hai — free bungalow, car, driver, cook, security, TA/DA, aur power jo milta hai woh unmatched hai. DM level pe total compensation Rs 2-3 lakh equivalent hoti hai including all perks.',
          'State PCS officer (SDM, DSP level) ki starting salary bhi Pay Level 10 mein hoti hai (most states mein). Basic Rs 56,100, in-hand Rs 70,000-80,000. Lekin state PCS officers ko IAS jaisi perks nahi milti — bungalow chhota hota hai, car nahi milti initially. Promotion bhi slower hai — State Civil Service mein DM banana almost impossible hai (IAS reserved post hai). State PCS officer maximum Commissioner/Secretary level tak state government mein pahunch sakta hai.',
        ],
      },
      {
        heading: 'Career Progression — Long Term Kya Hoga?',
        paragraphs: [
          'IAS ka career path: SDM/BDO → ADM → DM/CEO ZP → Divisional Commissioner → Secretary level → Chief Secretary. IAS officer 25-30 years mein Secretary level tak pahunch jaata hai — salary Level 17 (Rs 2.5 lakh basic). Cabinet Secretary India ka highest civil servant hota hai.',
          'State PCS ka career path: SDM → ADM → Additional Commissioner → Commissioner level. State PCS officers IAS empanelment ke through IAS mein bhi promote ho sakte hain — lekin yeh bahut limited hai (state ke top 10-15 PCS officers ko milta hai). State PCS mein maximum Level 14-15 tak pahunchte hain retirement tak — basic Rs 1.44 lakh to Rs 1.82 lakh.',
          'IPS (through UPSC) vs DSP (through State PCS): DSP state police mein initial posting hoti hai, SP level tak promote hote hain 15-20 saal mein. IPS officer directly ASP/DSP se start karke DIG/IG/DGP tak jaate hain. Same exam level difference, different career trajectory.',
        ],
      },
      {
        heading: 'State-wise PCS Difficulty Ranking',
        paragraphs: [
          'Based on competition level, syllabus depth, aur overall difficulty: UP PCS sabse mushkil State PCS mana jaata hai — maximum applicants, hard Mains papers, aur Hindi medium ka advantage limited hai ab. Bihar PCS second toughest hai — post-2015 pattern change ke baad Mains tough ho gaya hai. Rajasthan PCS aur MP PCS moderate difficulty hain — regional candidates ka advantage hota hai.',
          'Relatively easier State PCS exams: Jharkhand PCS, Uttarakhand PCS, Chhattisgarh PCS, Himachal Pradesh PCS — in states mein competition less hai kyunki applicant pool chhota hai. North-East states (Assam, Manipur, Meghalaya) ki PCS exams mein bhi competition comparatively less hai. Lekin "easy" koi PCS nahi hai — har state mein lakho log apply karte hain.',
        ],
      },
      {
        heading: 'Kaunsa Pehle Prepare Kare? Practical Strategy',
        paragraphs: [
          'Agar aap 21-25 age bracket mein ho toh UPSC pehle try karo — aapke paas 5-6 attempts hain (General category). UPSC ki preparation automatically State PCS ki bhi cover kar deti hai. Dono exams saath mein do — UPSC Prelims June mein hota hai, State PCS Prelims alag time pe. Same preparation se dono chances milte hain.',
          'Agar aap 28-30+ age mein ho aur UPSC attempts khatam ho rahe hain toh State PCS pe focus karo — specifically apne home state ki. State-specific GK pe focus badhao, state ka current affairs closely follow karo. State PCS mein local knowledge ka advantage milta hai jo outsiders ko nahi hota.',
          'Best strategy: UPSC + home state PCS + neighboring state PCS — teen exams saath mein prepare karo. Syllabus ka 70% overlap hai. State-specific portion ke liye alag se 2-3 months do. Yeh approach maximum chances deta hai — kisi na kisi exam mein selection ho jayega agar preparation solid hai.',
        ],
      },
    ],
  },
  {
    slug: 'government-job-without-coaching',
    title: 'Bina Coaching Sarkari Naukri Kaise Crack Kare — Self Study Complete Guide',
    description:
      'Bina coaching ke sarkari naukri ki preparation kaise kare — free resources, YouTube channels, study plan, mock test strategy, aur self-study toppers ki success stories.',
    readTime: '10 min read',
    category: 'Strategy',
    categoryColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'Coaching institutes ka marketing ek narrative create karta hai — "bina coaching ke government exam clear nahi hoga." Yeh galat hai. UPSC toppers mein se 30-40% self-study se prepare karte hain. SSC aur Banking exams mein toh majority successful candidates coaching nahi jaate — YouTube aur free resources se prepare karte hain. Coaching helpful ho sakti hai, lekin necessary nahi hai.',
          'Is article mein hum complete self-study roadmap denge — free resources kaunse use kare, daily schedule kaise banaye, subject-wise material kahan se milega, aur mock tests kaise use kare. Agar aapke paas coaching ka paisa nahi hai ya aapke sheher mein achhi coaching nahi hai — toh yeh guide aapke liye hai.',
        ],
      },
      {
        heading: 'Free Resources — YouTube Channels, Apps & Telegram',
        paragraphs: [
          'YouTube pe har subject ke liye world-class free content available hai. Maths ke liye Rakesh Yadav Sir ka channel, English ke liye Rani Mam (SSC level) aur Aditya Sir (Banking), Reasoning ke liye Abhinay Sharma Sir, GK/GS ke liye StudyIQ aur Drishti IAS ka channel — yeh sab completely free hain aur coaching se better content dete hain kai baar.',
          'Apps: Testbook, Adda247, Gradeup (ByJu\'s Exam Prep) — in sab pe free mock tests milte hain daily. Previous year papers bhi free available hain. Telegram pe har exam ke liye groups hain jahan daily current affairs, PDFs, aur notes share hote hain. "SSC CGL Preparation" ya "UPSC Daily MCQ" search karo Telegram pe — lakho members ke groups mil jayenge.',
        ],
        bullets: [
          'Maths: Rakesh Yadav (YouTube), RS Aggarwal PDF, Kiran Publications PYQs',
          'English: Rani Mam, Neetu Singh (YouTube), Wren & Martin PDF freely available',
          'Reasoning: Abhinay Sharma (YouTube), MK Pandey (PDF)',
          'GK/GS: StudyIQ, Drishti IAS, Adda247 (YouTube). Lucent GK (PDF)',
          'Current Affairs: Daily — The Hindu Editorial (free), PIB summary (free apps), Monthly — Pratiyogita Darpan',
          'Mock Tests: Testbook (free daily mocks), SSC official website (old papers), NRA mock tests',
        ],
      },
      {
        heading: 'Self-Study Plan — Without Coaching Daily Schedule',
        paragraphs: [
          'Self-study mein sabse badi problem hai discipline — coaching mein toh fixed schedule hota hai, ghar pe aapko khud se manage karna padta hai. Ek proven schedule: Morning 6-8 AM: Maths (fresh mind mein quantitative topics best solve hote hain). 9-11 AM: English + Reasoning. 11-12 PM: Current Affairs (daily news + notes banana). 2-4 PM: GK/GS (static portion). 4-5 PM: Previous year papers solve karo.',
          'Evening 7-8 PM: Mock test analysis (subah ka mock analyse karo). 8-9 PM: Revision — aaj jo padha uska quick recap. Total 7-8 hours daily study sufficient hai. Sunday ko poora din ek full mock do aur analyse karo. Yeh schedule SSC/Banking/Railway sabke liye kaam karta hai — bus subject allocation exam ke hisaab se adjust karo.',
        ],
      },
      {
        heading: 'Subject-wise Free Study Material',
        paragraphs: [
          'Maths: RS Aggarwal ki book ka PDF freely available hai (older editions). Rakesh Yadav ki 7300+ chapter-wise PYQ book — yeh single book SSC Maths ke liye enough hai. Formula sheet banao — 4-5 pages ki. Daily 50 questions solve karo minimum. Focus on Arithmetic pehle — yeh 60% paper hai.',
          'English: Wren & Martin (grammar bible) ka PDF milta hai. SSC ke previous year English questions ki free PDF Testbook aur Oliveboard pe milti hai. Daily 1 editorial padho — The Hindu ya Indian Express (free online). Vocabulary ke liye word lists mat ratao — context mein seekho editorials se.',
          'Reasoning: Verbal aur Non-verbal dono ke liye MK Pandey sufficient hai. YouTube pe Abhinay Sharma Sir ki reasoning playlist complete hai — 100+ videos free. Reasoning mein practice hi key hai — concepts simple hain, speed chahiye. Daily 40-50 questions karo.',
          'GK/GS: Lucent GK ek hi book kaafi hai static GK ke liye. Current affairs ke liye monthly magazine (Pratiyogita Darpan) ya free YouTube compilations. Science ke liye NCERT Class 6-10 sufficient hai. History/Geography ke liye NCERT Class 6-12.',
        ],
      },
      {
        heading: 'Previous Year Papers — Sabse Important Resource',
        paragraphs: [
          'Yeh baat yaad rakhna — coaching ki zaroorat isliye kam hai kyunki previous year papers mein sab kuch hai. SSC CGL ke last 10 saal ke papers solve karo — aapko pattern samajh aa jayega, difficulty level samajh aayega, aur 30-40% questions directly ya indirectly repeat hote hain. Same concept, different numbers.',
          'Kaise use kare PYQs: Pehle topic-wise solve karo (example: sirf Percentage ke sab PYQs karo across all years). Phir shift-wise full papers solve karo under time limit. Analysis mein note karo — kaunsa topic zyada aata hai, kaunsa rarely aata hai. Apna time allocate karo accordingly — jo zyada aata hai usko zyada time do.',
        ],
      },
      {
        heading: 'Mock Test Strategy — Weekly 3 Mocks Minimum',
        paragraphs: [
          'Mock tests self-study ka sabse critical component hai — bina mocks ke preparation incomplete hai. Minimum 3 mocks per week do — 2 sectional aur 1 full length. Free mocks Testbook, Adda247, Oliveboard pe milte hain. SSC ki official website pe bhi practice papers available hain.',
          'Mock analysis coaching se bhi important hai. Har mock ke baad 1.5-2 ghanta analysis karo: (1) Kaunse questions galat hue — concept gap ya silly mistake? (2) Kaunse questions attempt nahi kiye — time ki kami thi ya topic nahi aata? (3) Time management — kaunse section mein zyada time laga? Error log maintain karo — ek notebook mein har galat answer likho with correct explanation. Weekly error log revise karo.',
        ],
      },
      {
        heading: 'Time Management & Consistency Tips',
        paragraphs: [
          'Self-study mein fail hone ka #1 reason hai inconsistency — 3 din padhte ho, 2 din skip, phir guilt mein 12 ghante padhte ho, phir burn out. Yeh cycle break karo. Daily 6 ghante consistent study > weekly 40 ghante irregular study. Calendar pe har din tick karo — streak mat tootne do.',
          'Pomodoro technique use karo: 45 minutes padho, 10 minutes break. 3 Pomodoros ke baad 30 minutes ka longer break. Phone ko airplane mode pe rakho study hours mein — yeh single change productivity 3x kar deta hai. Social media daily 30 minutes se zyada mat use karo exam period mein.',
        ],
      },
      {
        heading: 'Success Stories — Self-Study Toppers',
        paragraphs: [
          'UPSC 2023 Topper Aditya Srivastava (AIR 1) ne interview mein kaha tha ki unhone mostly self-study ki thi — coaching sirf test series ke liye join ki thi. SSC CGL 2024 ke bahut se toppers ne YouTube aur Testbook se prepare kiya — unke interviews YouTube pe available hain. Ek common thread hai sab success stories mein — consistency, PYQ focus, aur mock test analysis.',
          'Railway Group D, NTPC mein toh majority selections self-study se hote hain — kyunki yeh exams coaching-heavy nahi hain, basic concepts aur practice chahiye. Banking exams mein bhi Oliveboard aur Testbook ke free resources se kai candidates SBI PO aur IBPS PO crack kar chuke hain. Coaching ek shortcut ho sakti hai, lekin sirf shortcut — destination self-effort se hi milta hai.',
          'Final advice: Agar coaching afford nahi kar sakte toh bilkul tension mat lo. Aaj ke time mein internet pe sab free available hai. Discipline rakho, daily study karo, mocks do, PYQs solve karo — selection ho jayega. Bahane banana band karo aur aaj se start karo.',
        ],
      },
    ],
  },
  {
    slug: 'police-constable-salary-state-wise',
    title: 'Police Constable Salary 2026 State-Wise — UP, Bihar, Rajasthan, MP, Delhi',
    description:
      'Police Constable salary 2026 state-wise comparison — Delhi Police, UP Police, Bihar Police, Rajasthan Police, MP Police ki in-hand salary, allowances, risk allowance, aur promotion.',
    readTime: '8 min read',
    category: 'Police',
    categoryColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'Police Constable India mein sabse zyada demand wali government job hai — har state mein lakho log constable ki vacancy ke liye apply karte hain. Salary state pe depend karti hai kyunki police state subject hai — Central Pay Commission ki recommendations har state ne differently implement ki hain. Delhi Police sabse zyada salary deta hai kyunki woh Central Government ke under hai.',
          'Is article mein hum major states ki Police Constable salary ka detailed comparison karenge — basic pay, grade pay (jo kuch states mein abhi bhi hai), DA, HRA, risk allowance, aur net in-hand salary. Saath mein promotion timeline bhi cover karenge.',
        ],
      },
      {
        heading: 'State-wise Salary Table — Quick Comparison',
        paragraphs: [
          'Sabse pehle ek quick overview dekhte hain ki kaunse state mein kitni salary milti hai starting mein. Yeh approximate in-hand figures hain 2026 ke DA rates ke saath:',
        ],
        bullets: [
          'Delhi Police: Pay Level 3 (Rs 21,700 basic), In-hand Rs 33,000-37,000. Sabse zyada salary.',
          'Haryana Police: Rs 21,700 basic, In-hand Rs 30,000-34,000. DA Haryana government rates pe.',
          'UP Police: Pay Level (revised), Basic Rs 21,700, In-hand Rs 25,000-30,000.',
          'Rajasthan Police: Basic Rs 20,800 (state pay matrix), In-hand Rs 24,000-28,000.',
          'Bihar Police: Basic Rs 21,700 (7th CPC implemented), In-hand Rs 23,000-27,000.',
          'MP Police: Basic Rs 19,500 (state pay scale), In-hand Rs 22,000-26,000.',
          'Maharashtra Police: Basic Rs 25,500 (state 7th CPC), In-hand Rs 30,000-35,000.',
          'Tamil Nadu Police: Basic Rs 20,600, In-hand Rs 28,000-32,000 (state allowances higher).',
        ],
      },
      {
        heading: 'Delhi Police — Highest Salary at Rs 35,000+',
        paragraphs: [
          'Delhi Police Central Government ke under aata hai (Home Ministry) — isliye 7th Pay Commission puri tarah apply hoti hai. Constable ka Pay Level 3 hai, basic pay Rs 21,700 se start. DA Central Government rate pe milta hai (53% as of Jan 2026), HRA 27% (X city — Delhi). In-hand salary Rs 33,000-37,000 hoti hai joining ke time.',
          'Delhi Police mein additional perks: Kit Allowance (uniform ke liye), Ration Money, Delhi Police specific allowances. Risk allowance milta hai duty pe. Free medical CGHS ke through. Delhi mein posting hone ka fayda — bahut saare extra earning opportunities hote hain (election duty, event duty — extra TA/DA milta hai). 5 saal baad salary Rs 38,000-42,000 ho jaati hai.',
        ],
      },
      {
        heading: 'UP Police — Rs 25,000+ Starting',
        paragraphs: [
          'UP Police mein 7th Pay Commission implement ho chuki hai. Constable ka basic pay Rs 21,700 hai (Pay Level equivalent). Lekin UP mein DA state government rate pe milta hai — jo Central se thoda kam hota hai. HRA bhi state rates pe — Lucknow mein 16% ya Rs 2,520 (jo zyada ho), chhote sheher mein 8%.',
          'UP Police Constable ki in-hand salary: Lucknow mein Rs 27,000-30,000, chhote district mein Rs 25,000-27,000. UP mein risk allowance Rs 300-500 per month milta hai (bahut kam — isse lekar constables ki demand hai zyada karne ki). Uniform allowance separately milta hai. UP Police mein sab se badi perk hai government quarters — most districts mein police lines mein quarters allot hote hain.',
        ],
      },
      {
        heading: 'Bihar Police, Rajasthan Police & MP Police',
        paragraphs: [
          'Bihar Police mein 7th CPC implement ho chuki hai — Constable basic Rs 21,700. Lekin Bihar mein DA rate lower hai (around 42-45% state government rate pe). HRA Patna mein 12-16%. In-hand salary Rs 23,000-27,000 range mein hai. Bihar Police mein posting mostly rural areas mein hoti hai — living cost kam hai toh salary relatively sufficient hai.',
          'Rajasthan Police Constable ka basic pay Rs 20,800 hai (state pay matrix thoda different hai). DA Rajasthan government rate pe — approximately 40-45%. HRA Jaipur mein 16%, other cities mein 8-12%. In-hand Rs 24,000-28,000. Rajasthan mein allowances relatively better hain — Desert Allowance aur Tribal Area Allowance certain postings mein extra milta hai.',
          'MP Police Constable ka basic Rs 19,500 hai (MP ne 7th CPC partially implement ki hai). In-hand salary Rs 22,000-26,000 range mein hai — yeh major states mein sabse kam hai. MP mein posting Naxal-affected areas mein hone pe special allowance milta hai — Rs 3,000-5,000 extra per month.',
        ],
      },
      {
        heading: 'Risk Allowance, Night Duty & Special Allowances',
        paragraphs: [
          'Police job mein risk inherent hai — isliye risk allowance milta hai lekin honestly yeh bahut kam hai. Most states mein Rs 200-500 per month hi hai. Central Armed Police Forces (BSF, CRPF) mein risk allowance better hai — Rs 5,000-10,000 per month. Delhi Police mein bhi risk allowance relatively better hai compared to state police.',
          'Night duty allowance milta hai agar night shift mein duty karte ho. Overtime ka concept police mein officially nahi hai — 24x7 duty ka nature hai. Lekin festivals, elections, VIP duty mein extra TA/DA milta hai. Naxal/border area posting pe hardship allowance milta hai — Rs 3,000-10,000 per month extra depending on area classification. Overall, police ki actual income in-hand salary se Rs 3,000-8,000 per month zyada ho sakti hai allowances ke saath.',
        ],
      },
      {
        heading: 'Promotion Timeline — Constable Se SI Tak Ka Safar',
        paragraphs: [
          'Police Constable ka promotion path: Constable → Head Constable (HC) → Assistant Sub Inspector (ASI) → Sub Inspector (SI). Constable se HC mein promotion 8-12 saal mein hota hai (state pe depend karta hai — Delhi mein relatively faster, Bihar mein slow). HC se ASI mein 5-8 saal. ASI se SI mein 5-8 saal. Matlab Constable se SI banne mein 18-25 saal lag sakte hain normal promotion route se.',
          'Departmental exam pass karke yeh timeline accelerate ho sakti hai. Kuch states mein Limited Departmental Exam (LDE) se Constable directly SI mein promote ho sakte hain — 5-8 saal mein. Delhi Police mein departmental exam route se Constable se HC mein 5-6 saal mein promote hote hain.',
        ],
        bullets: [
          'Constable (Level 3, Rs 21,700) → Head Constable (Level 4, Rs 25,500): 8-12 years',
          'Head Constable → ASI (Level 5, Rs 29,200): 5-8 years',
          'ASI → SI (Level 6, Rs 35,400): 5-8 years',
          'SI → Inspector (Level 7, Rs 44,900): 8-10 years',
          'Inspector → DSP (Level 10, Rs 56,100): Only through special quota/deputation for exceptional officers',
        ],
      },
    ],
  },
  {
    slug: 'iti-ke-baad-sarkari-naukri',
    title: 'ITI Ke Baad Sarkari Naukri — Best Government Jobs After ITI in Hindi',
    description:
      'ITI ke baad sarkari naukri ke best options — Railway Apprentice, ONGC/IOCL Technician, Defence (EME), SSC, Ordnance Factory, State Electricity Board, trade-wise best jobs.',
    readTime: '9 min read',
    category: 'Guide',
    categoryColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'ITI (Industrial Training Institute) karne ke baad bahut se students sochte hain ki "ab sirf private factory mein kaam milega." Yeh galat soch hai. ITI ke baad bahut si achhi sarkari naukriyan available hain — Railway, Defence, ONGC, IOCL, Ordnance Factory, State Electricity Board — in sab mein ITI trade certificate holders ki demand hai. Salary bhi Rs 18,000 se Rs 35,000 per month tak milti hai government sector mein.',
          'Is article mein hum ITI ke baad available sabhi major government job options cover karenge — eligibility, salary, apply kaise kare, aur kaunsa trade sabse zyada demand mein hai. Agar aap ITI pass ho ya ITI mein padh rahe ho — toh yeh article aapke liye bahut useful hoga.',
        ],
      },
      {
        heading: 'Railway Apprentice — ITI Ke Baad Best Option',
        paragraphs: [
          'Indian Railways ITI holders ke liye sabse bada employer hai. Railway Apprentice Act ke under har saal thousands of apprentice positions nikti hain — Fitter, Electrician, Welder, Machinist, Turner, Mechanic Diesel jaise trades mein. Apprenticeship 1 saal ki hoti hai jismein Rs 8,000-9,000 per month stipend milta hai aur training ke baad regular Railway jobs mein absorption ka chance hota hai.',
          'Railway Recruitment Cell ke through directly bhi recruitment hoti hai — Group D (Helper, Track Maintainer) aur Group C (Technician Grade-III) positions mein. Railway Group D mein ITI holders ko advantage milta hai selection mein — merit list mein ITI qualified candidates ko preference milti hai. Technician Grade-III ki salary Pay Level 2 mein hai — basic Rs 19,900, in-hand Rs 24,000-28,000.',
        ],
        bullets: [
          'Railway Apprentice: 1 year training, Rs 8,000-9,000 stipend, absorption chance',
          'Railway Group D: Pay Level 1, Rs 18,000 basic, in-hand Rs 22,000-25,000',
          'Railway Technician Grade-III: Pay Level 2, Rs 19,900 basic, in-hand Rs 24,000-28,000',
          'Apply: rfrinda.com (Railway Apprentice), rrbcdg.gov.in (Group D/Technician)',
        ],
      },
      {
        heading: 'ONGC/IOCL/GAIL — PSU Technician Jobs',
        paragraphs: [
          'Oil & Gas sector ke PSUs — ONGC, IOCL, BPCL, HPCL, GAIL — yeh sab ITI holders ko Technician aur Junior Assistant positions mein recruit karte hain. ONGC mein Technician ki salary Rs 24,000-28,000 starting hoti hai with excellent perks — free accommodation, medical, subsidized canteen, aur petrol/diesel allowance. IOCL mein Junior Engineering Assistant ki salary Rs 25,000-30,000 starting hai.',
          'In PSU jobs mein selection mostly written exam + skill test ke basis pe hota hai — koi interview nahi usually. Electrician, Fitter, Instrument Mechanic, Mechanic Motor Vehicle — yeh trades sabse zyada demand mein hain oil companies mein. GATE score se bhi kuch PSUs recruit karti hain (diploma holders ke liye) — lekin ITI wale direct recruitment ke through apply karte hain. Notifications har saal October-March ke beech aati hain.',
        ],
      },
      {
        heading: 'Ordnance Factory & Defence — EME, Military Engineering',
        paragraphs: [
          'Ordnance Factories (ab Advanced Weapons and Equipment India Limited ke under) mein ITI holders ke liye Semi-Skilled positions regularly nikti hain. Fitter, Turner, Machinist, Welder, Electrician — yeh sabse zyada vacancies wale trades hain. Salary Pay Level 2 mein hai — Rs 19,900 basic, in-hand Rs 23,000-27,000. Defence perks extra milti hain — canteen facility (CSD), medical, quarters.',
          'Indian Army mein bhi ITI holders ke liye direct entry hai — Soldier Technical category mein. Age 17.5 to 21 years. EME (Corps of Electronics and Mechanical Engineers) mein ITI Electrician, Mechanic, Fitter trade wale join kar sakte hain. Army salary Rs 21,700 basic + DA + Military Service Pay (Rs 5,200) + allowances. In-hand Rs 30,000-35,000 starting. 4 saal ke baad pension bhi milti hai (agar 15 saal serve karo).',
        ],
      },
      {
        heading: 'SSC for ITI Trades — MTS & Technical Posts',
        paragraphs: [
          'SSC (Staff Selection Commission) ke through bhi ITI holders apply kar sakte hain kuch posts ke liye. SSC MTS (Multi Tasking Staff) mein ITI certificate holders eligible hain — 10th pass minimum requirement hai, ITI add-on qualification maana jaata hai. MTS ki salary Pay Level 1 — basic Rs 18,000, in-hand Rs 21,000-24,000. Central Government mein posting hoti hai — ministries, attached offices mein.',
          'SSC ke through kuch technical posts bhi aati hain — Junior Engineer (Electrical/Mechanical/Civil) ke liye diploma chahiye, lekin kuch departments mein ITI + experience bhi accept karte hain. CSIR, DRDO, BARC mein bhi technical positions hain jahan ITI holders eligible hain — Trade Apprentice aur Scientific Assistant (lower grade) posts mein.',
        ],
      },
      {
        heading: 'State Electricity Board & PWD/CPWD',
        paragraphs: [
          'Har state ka Electricity Board (jaise UPPCL, BSEB, RRVUNL, MPPGCL) ITI Electrician trade holders ko Line Attendant, Technician, aur Junior Engineer (diploma ke baad) positions mein recruit karta hai. Electricity Board ki salary state pe depend karti hai — Rs 20,000-30,000 starting range mein hoti hai. Perks mein free electricity ya subsidized electricity milti hai — kuch states mein 100 units free.',
          'CPWD (Central Public Works Department) aur state PWD mein bhi ITI holders ke liye positions hain — Wireman, Plumber, Carpenter, Mason, Electrician. CPWD Central Government ka department hai toh 7th CPC salary milti hai — Pay Level 1-2, in-hand Rs 21,000-27,000. State PWD mein salary state rules ke according hoti hai. Construction aur maintenance ka kaam hota hai — government buildings, bridges, roads ki.',
        ],
      },
      {
        heading: 'Trade-wise Best Government Jobs',
        paragraphs: [
          'Har ITI trade ke liye alag government jobs hain — apne trade ke hisaab se target karo. Electrician trade sabse versatile hai — Railway, Defence, Electricity Board, ONGC, CPWD, NTPC sab mein demand hai. Fitter trade ka dusra number hai — Railway workshops, Ordnance Factory, Oil companies, Steel plants mein Fitter ki bahut demand hai. Welder trade ke liye shipbuilding (Cochin Shipyard, Mazagon Dock), Oil rigs, Railways mein demand hai.',
          'Mechanic Motor Vehicle trade ke liye Army (EME Corps), State Transport Corporation, aur PSU automobile units mein jobs milti hain. Turner/Machinist ke liye Ordnance Factory sabse achha option hai. COPA (Computer Operator & Programming Assistant) trade wale Data Entry Operator positions ke liye SSC ke through apply kar sakte hain — yeh desk job hai aur growing demand mein hai.',
        ],
        bullets: [
          'Electrician: Railway, ONGC/IOCL, Electricity Board, Defence, CPWD. Salary Rs 18,000-30,000.',
          'Fitter: Railway (largest recruiter), Ordnance Factory, SAIL, BHEL. Salary Rs 18,000-28,000.',
          'Welder: Shipyard (Cochin, Mazagon), Oil rigs, Railways. Salary Rs 18,000-25,000.',
          'Mechanic Diesel/Motor Vehicle: Army EME, State Transport, PSU workshops. Salary Rs 21,000-35,000.',
          'Turner/Machinist: Ordnance Factory, HAL, BHEL. Salary Rs 19,000-27,000.',
          'COPA: SSC DEO, Court Data Entry, Ministry offices. Salary Rs 18,000-25,000.',
        ],
      },
      {
        heading: 'Salary Range & How to Apply',
        paragraphs: [
          'ITI ke baad sarkari naukri mein salary range Rs 18,000 (Group D/MTS level) se Rs 35,000 (Army Technical/PSU Technician) tak hoti hai starting mein. 10 saal service ke baad yeh Rs 28,000-50,000 tak pahunch jaati hai promotions aur increments ke saath. Yeh private sector ITI jobs se significantly better hai — private mein ITI fresher ko Rs 8,000-12,000 milte hain, government mein Rs 18,000+ guaranteed.',
          'Apply karne ka process: Railway Apprentice ke liye rfrinda.com pe apply karo. Railway Group D/Technician ke liye rrbcdg.gov.in. Defence ke liye joinindianarmy.nic.in. ONGC/IOCL ke liye unki respective careers page pe. SSC MTS ke liye ssc.nic.in. State Electricity Board ke liye respective state corporation ki website pe. Notifications mostly October se March ke beech aati hain — employment news (weekly newspaper) aur freejobalert.com pe regularly check karte raho.',
          'Pro tip: ITI ke baad agar 1-2 saal aur padh sakte ho toh Diploma karo (Lateral Entry se directly 2nd year mein admission milta hai). Diploma ke baad Junior Engineer level ki posts eligible ho jaati hai — salary Rs 35,000-50,000 starting. Long term mein diploma investment worth it hai — SSC JE, Railway JE, State JE sab eligible ho jaate ho.',
        ],
      },
    ],
  },
  {
    slug: 'government-jobs-after-btech',
    title: 'Government Jobs After B.Tech — PSU, SSC JE, GATE Score Opportunities',
    description:
      'Complete guide to government job options after B.Tech engineering degree. PSU recruitment through GATE, SSC JE, ISRO, DRDO, Railway JE, IES and state engineering services with salary details.',
    readTime: '10 min read',
    category: 'Guide',
    categoryColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'B.Tech ke baad sarkari naukri ke options bahut strong hain — engineering graduates ko government sector mein Rs 50,000 se Rs 2,00,000 tak starting salary milti hai depending on the post. Problem yeh hai ki zyaadatar students sirf private placement pe focus karte hain aur government opportunities miss kar dete hain. GATE score se PSU, direct recruitment se SSC JE aur Railway JE, aur UPSC se IES — har level pe options hain.',
        ],
      },
      {
        heading: 'PSU Jobs Through GATE — Rs 50,000-60,000 Starting Salary',
        paragraphs: [
          'GATE (Graduate Aptitude Test in Engineering) sabse important exam hai B.Tech graduates ke liye. 60+ PSUs GATE score ke through recruit karti hain. Top PSUs aur unki approximate starting salary (CTC): ONGC — Rs 1,20,000/month (E1 grade, CTC Rs 18 lakh), NTPC — Rs 1,00,000/month (E1, CTC Rs 15.5 lakh), BHEL — Rs 60,000-70,000/month (E1, CTC Rs 11 lakh), IOCL — Rs 90,000/month (CTC Rs 14 lakh), GAIL — Rs 80,000/month (CTC Rs 13 lakh), Power Grid — Rs 90,000/month (E2, CTC Rs 14 lakh).',
          'GATE qualify karne ke baad PSU mein interview hota hai — typically 30% GATE score + 70% interview. Kuch PSUs jaise BARC, ISRO apna separate exam bhi conduct karte hain lekin GATE score bhi accept karte hain shortlisting ke liye. GATE mein top 100-500 rank laane se multiple PSU calls aate hain. Mechanical, Electrical, Civil aur CS branches mein sabse zyaada PSU vacancies hoti hain.',
        ],
        bullets: [
          'BHEL: E1 grade, basic Rs 40,000, in-hand Rs 50,000-60,000, CTC Rs 11 lakh. Mechanical, Electrical, Electronics branches.',
          'NTPC: E1 grade, basic Rs 40,000, in-hand Rs 80,000-1,00,000 (with perks), CTC Rs 15.5 lakh. Power sector ka best PSU.',
          'ONGC: E1 grade, basic Rs 60,000, in-hand Rs 1,00,000-1,20,000, CTC Rs 18 lakh. Oil & gas sector, remote posting allowance extra.',
          'IOCL: basic Rs 40,000, in-hand Rs 70,000-90,000, CTC Rs 14 lakh. Refinery posting pe additional allowances milte hain.',
          'Power Grid: E2 grade se start, basic Rs 50,000, in-hand Rs 80,000-90,000. Transmission sector, field posting zyaada.',
        ],
      },
      {
        heading: 'SSC JE — Junior Engineer Without GATE',
        paragraphs: [
          'SSC JE (Junior Engineer) exam GATE ki zaroorat nahi hai — B.Tech ya Diploma holders directly apply kar sakte hain. SSC JE ke through CPWD, CWC, BRO, Military Engineering Service (MES), aur CGWA mein posting hoti hai. Salary Pay Level 6 — basic Rs 35,400, in-hand Rs 42,000-48,000 depending on posting city. DA, HRA, Transport Allowance sab milta hai.',
          'SSC JE exam pattern: Paper-1 (CBT) — 200 marks, 120 minutes. General Intelligence & Reasoning (50 marks), General Awareness (50 marks), General Engineering (100 marks — Civil/Electrical/Mechanical). Paper-2 (Descriptive) — 300 marks, 120 minutes. Engineering subject ka detailed paper. Cutoff typically 300-350/500 rehta hai depending on branch aur category. Age limit 32 years (OBC 35, SC/ST 37). Har saal roughly 1,500-2,500 vacancies aati hain.',
        ],
      },
      {
        heading: 'ISRO & DRDO — Scientist/Engineer Posts',
        paragraphs: [
          'ISRO Scientist/Engineer (SC) position mein B.Tech graduates ko recruit karta hai — salary Pay Level 10, basic Rs 56,100, in-hand Rs 70,000-80,000. ISRO GATE score ke basis pe shortlist karta hai aur phir written test + interview leta hai. Competition bahut high hai — roughly 50,000 apply karte hain 200-300 posts ke liye. Branches: Mechanical, Electrical, Electronics, CS, Civil.',
          'DRDO apna CEPTAM (Centre for Personnel Talent Management) exam conduct karta hai Scientist B aur Tech A positions ke liye. DRDO Scientist B ki salary Pay Level 10 — basic Rs 56,100, in-hand Rs 65,000-75,000. DRDO SET exam ke through bhi recruit karta hai — yeh GATE jaisa hi exam hai. DRDO mein research-oriented kaam hota hai — missiles, radar, electronics systems, naval systems, aeronautics. 50+ DRDO labs across India mein posting hoti hai.',
        ],
      },
      {
        heading: 'Railway JE — Indian Railways Engineering Posts',
        paragraphs: [
          'RRB JE (Railway Junior Engineer) B.Tech aur Diploma dono ke liye open hai. Salary Pay Level 6 — basic Rs 35,400, in-hand Rs 40,000-45,000 plus railway quarters, medical, travel pass. Railway JE ka kaam rolling stock maintenance, track maintenance, signalling, electrical systems aur bridge engineering hota hai. Har saal 10,000-15,000 JE vacancies aati hain — competition roughly 15:1 rehta hai.',
          'RRB JE exam pattern: CBT-1 (screening) — 100 questions, 90 minutes. Maths, General Intelligence, General Awareness, General Science. CBT-2 (selection) — 150 questions, 120 minutes. General Awareness (15), Physics & Chemistry (15), Computer (10), Environment (10), Technical (100). Senior Section Engineer (SSE) position bhi hai — same exam se higher grade milti hai, salary Pay Level 7 — basic Rs 44,900.',
        ],
      },
      {
        heading: 'State Engineering Services & State PSC',
        paragraphs: [
          'Har state apni Public Service Commission ke through Assistant Engineer (AE) aur Junior Engineer (JE) recruit karti hai. State AE ki salary state pe depend karti hai — Rs 40,000-70,000 starting. UP mein AE ki salary Rs 56,100 (Pay Level 10), Maharashtra mein Rs 41,800, Rajasthan mein Rs 36,200. State engineering services mein PWD, Irrigation, Public Health Engineering, Rural Engineering mein posting hoti hai.',
          'State PSC engineering exam typically General Studies + Technical Subject ka hota hai. Kuch states jaise Tamil Nadu, Karnataka, AP GATE score bhi accept karti hain AE recruitment ke liye. State services ka advantage yeh hai ki posting apne home state mein hoti hai — Central services mein all-India transfer hota hai. Promotion path: JE to AE to Executive Engineer to Superintending Engineer to Chief Engineer. Chief Engineer ka Pay Level 14 — Rs 1,44,200 basic.',
        ],
      },
      {
        heading: 'IES — Indian Engineering Services Through UPSC',
        paragraphs: [
          'UPSC Indian Engineering Services (IES/ESE) sabse prestigious engineering service hai — Class 1 Gazetted Officer bante ho. Starting salary Pay Level 10 — basic Rs 56,100, in-hand Rs 70,000-85,000. IES officers Railways, CPWD, CWC, Defence (MES), Telecom mein top engineering positions pe posted hote hain. 20 saal baad Superintending Engineer — salary Rs 1,18,500.',
          'IES exam pattern: Prelims — General Studies & Engineering Aptitude (200 marks) + Engineering Discipline paper (300 marks). Mains — two conventional (essay-type) engineering papers of 300 marks each. Interview — 200 marks. Total 1300 marks. Har saal roughly 500 vacancies aati hain — Civil, Mechanical, Electrical, Electronics. Competition: 1-2 lakh candidates appear, 500 selected. Success rate roughly 0.3-0.5%. 3-4 attempts mein select hone ka realistic chance hai agar consistent preparation ho.',
        ],
      },
      {
        heading: 'Which Engineering Branch Has Most Government Job Opportunities?',
        bullets: [
          'Electrical Engineering: sabse zyaada options — SSC JE, Railway JE, State Electricity Board, NTPC, Power Grid, BHEL, ONGC, ISRO, DRDO, IES. Roughly 40% sarkari engineering vacancies Electrical ke liye hain.',
          'Mechanical Engineering: second most — Railway (largest recruiter), BHEL, ONGC, IOCL, Defence (HAL, BEL, Ordnance Factory), IES. 30% vacancies Mechanical ke liye.',
          'Civil Engineering: CPWD, State PWD, Railways, CWC, IES, State AE. Infrastructure projects badhne se vacancies badh rahi hain. 20% share.',
          'Computer Science/IT: ISRO, DRDO, NIC, NIELIT, some PSUs. Direct government IT jobs kam hain lekin GATE CS se PSU mein achhi salary milti hai. BEL, ECIL mein CS/IT positions.',
          'Electronics & Communication: ISRO (sabse preferred), DRDO, BEL, Indian Navy, BSNL, Railway Signalling. Telecom aur defence sector mein strong demand.',
        ],
      },
    ],
  },
  {
    slug: 'government-jobs-after-bsc',
    title: 'B.Sc Ke Baad Government Jobs — Science Stream Sarkari Naukri List',
    description:
      'B.Sc graduates ke liye complete sarkari naukri guide. SSC CGL, UPSC, Lab Technician, Forest Service, ISRO, DRDO aur teaching jobs ki full details with salary aur eligibility.',
    readTime: '9 min read',
    category: 'Guide',
    categoryColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'B.Sc ke baad government jobs ka scope bahut wide hai — problem yeh hai ki zyaadatar students ko sirf teaching aur research ke baare mein pata hota hai. Reality mein B.Sc graduates SSC CGL se Inspector ban sakte hain, UPSC se IFS officer, Lab Technician, Forest Officer, ISRO/DRDO mein Scientist aur bahut kuch. Har saal roughly 2 lakh government posts aati hain jahan B.Sc qualification eligible hai.',
        ],
      },
      {
        heading: 'SSC CGL — Inspector, Tax Assistant, Auditor Posts',
        paragraphs: [
          'SSC CGL (Combined Graduate Level) exam B.Sc graduates ke liye sabse popular option hai. Graduation kisi bhi stream se chalti hai — B.Sc Mathematics, Physics, Chemistry, Biology sab eligible hain. SSC CGL se milne wali top posts aur salary: Income Tax Inspector — Pay Level 7, basic Rs 44,900, in-hand Rs 52,000-60,000. Central Excise Inspector — same salary as IT Inspector. Auditor (CAG/CGDA) — Pay Level 5, basic Rs 29,200, in-hand Rs 35,000-40,000. Tax Assistant (CBDT/CBIC) — Pay Level 4, basic Rs 25,500, in-hand Rs 30,000-35,000. Statistical Investigator — Pay Level 6, basic Rs 35,400 (B.Sc Statistics wale ke liye exclusive post).',
          'SSC CGL mein B.Sc Maths/Stats wale candidates ka advantage hota hai — Quantitative Aptitude section mein strong performance dete hain. Statistical Investigator post sirf B.Sc Statistics graduates ke liye hai — salary Rs 35,400 basic, promotion se Assistant Director (Rs 56,100) tak jaate hain. CGL mein age limit 18-32 years (UR), 35 (OBC), 37 (SC/ST). Har saal roughly 7,000-15,000 vacancies aati hain.',
        ],
      },
      {
        heading: 'UPSC — IFS (Forest Service) & Geologist',
        paragraphs: [
          'UPSC Indian Forest Service (IFS) B.Sc graduates ke liye ek excellent option hai — especially B.Sc Botany, Zoology, Chemistry, Physics, Forestry wale candidates ke liye. IFS officer ki starting salary Pay Level 10 — basic Rs 56,100, in-hand Rs 70,000-80,000. IFS officers forest conservation, wildlife protection aur environmental management ka kaam karte hain. DFO (Divisional Forest Officer) level pe salary Rs 78,800, CCF level pe Rs 1,44,200.',
          'UPSC Geologist exam B.Sc Geology graduates ke liye exclusive hai — Geological Survey of India (GSI) mein posting hoti hai. Starting salary Pay Level 10 — Rs 56,100 basic. Field work hota hai — mineral exploration, geological mapping, earthquake assessment. UPSC Combined Geo-Scientist exam mein Geologist, Geophysicist, Chemist aur Jr. Hydrogeologist posts hain. Har saal roughly 80-120 vacancies. B.Sc Geology wale ke liye competition kam hai kyunki niche field hai.',
        ],
      },
      {
        heading: 'Lab Technician & Scientific Assistant',
        paragraphs: [
          'B.Sc graduates ke liye Lab Technician aur Scientific Assistant posts bahut achhi hain — directly science field mein kaam milta hai. DRDO, BARC, ISRO, National Physical Laboratory, CSIR labs mein Scientific Assistant (Group B) ki salary Pay Level 6 — basic Rs 35,400, in-hand Rs 40,000-45,000. Food Safety Officer — B.Sc Chemistry/Microbiology ke liye, salary Rs 35,400-44,900.',
          'State Public Health Lab mein Lab Technician ki salary Rs 25,500-35,400 (state pe depend karta hai). Central Government hospitals (AIIMS, Safdarjung, RML) mein Lab Technician Pay Level 5 — Rs 29,200 basic. Forensic Science Laboratory mein Scientific Assistant — B.Sc Chemistry/Biology ke liye, salary Rs 35,400. FSSAI (Food Safety) mein Food Analyst — B.Sc Chemistry required, salary Rs 35,400-44,900.',
        ],
      },
      {
        heading: 'Forest Service — State Forest Department',
        paragraphs: [
          'State Forest Department mein Range Forest Officer (RFO) aur Deputy Ranger posts B.Sc graduates ke liye hain. RFO ki salary Rs 35,400-44,900 depending on state. Forest Guard (B.Sc preferred but not mandatory) — Rs 21,700-25,500. State Forest Service ke through Conservator of Forests tak promote ho sakte ho — salary Rs 1,18,500.',
          'Forest department jobs ke advantages: government quarter forest area mein milta hai, vehicle milti hai, field allowance extra milta hai. Physically fit hona zaroori hai — 25 km walk test, 4 km run hota hai. B.Sc Forestry/Botany/Zoology graduates ko preference milti hai kuch states mein. UPSC IFS alag hai aur State Forest Service alag — dono mein B.Sc eligible hai.',
        ],
      },
      {
        heading: 'ISRO & DRDO — Science Stream Positions',
        paragraphs: [
          'ISRO mein B.Sc graduates Technical Assistant aur Scientific Assistant positions ke liye eligible hain. Technical Assistant salary Pay Level 6 — Rs 35,400. ISRO SAC (Space Applications Centre), VSSC, LPSC mein B.Sc Physics/Maths/Chemistry graduates ki requirement hoti hai. ISRO ka exam GATE jaisa hota hai — MCQ based, subject specific.',
          'DRDO mein CEPTAM exam ke through Senior Technical Assistant (STA-B) position B.Sc graduates ke liye hai — salary Pay Level 6, Rs 35,400 basic, in-hand Rs 40,000-45,000. DRDO mein 50+ labs hain — chemistry, physics, biology, maths sab branches ke liye positions hain. BARC (Bhabha Atomic Research Centre) apna OCES/DGFS program run karta hai — B.Sc Physics/Chemistry wale ke liye Scientific Officer C — salary Rs 56,100.',
        ],
      },
      {
        heading: 'Teaching — TGT Science & State PSC Scientific Officer',
        paragraphs: [
          'B.Sc + B.Ed ke baad TGT (Trained Graduate Teacher) Science teacher ban sakte ho — KVS, NVS, DSSSB, State TGT mein. KVS TGT salary Pay Level 7 — basic Rs 44,900, in-hand Rs 52,000-60,000 (metro mein zyaada). NVS TGT same salary + free accommodation + free meals. Summer aur winter vacation roughly 60 days milti hai. KVS/NVS mein all-India transfer hota hai, state TGT mein state ke andar.',
          'State PSC Scientific Officer posts B.Sc graduates ke liye hain — Water Testing Lab, Pollution Control Board, Agriculture Department, Sericulture Department mein. Salary state pe depend karti hai — Rs 35,400-56,100 range. Drug Inspector — B.Sc Pharmacy ya B.Sc Chemistry se eligible, salary Rs 44,900. Plant Protection Officer — B.Sc Agriculture/Botany, salary Rs 35,400. Meteorological Department mein Scientific Assistant — B.Sc Physics/Maths, salary Rs 35,400.',
        ],
      },
    ],
  },
  {
    slug: 'government-jobs-after-bcom',
    title: 'B.Com Ke Baad Government Jobs — Accountant, Auditor, Tax Inspector',
    description:
      'B.Com graduates ke liye sarkari naukri options ki complete list. SSC CGL, CAG office, Income Tax, Banking, RBI aur State PSC finance cadre ki salary aur eligibility details.',
    readTime: '8 min read',
    category: 'Guide',
    categoryColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'B.Com ke baad sarkari naukri mein ek strong advantage hai — commerce background wale candidates ko finance, accounts aur taxation posts mein natural edge milta hai. SSC CGL se Auditor, Accountant aur Tax Inspector, Banking se PO aur Clerk, RBI mein Grade B Officer, CAG office mein Audit Officer — options bahut hain. B.Com graduates ka success rate SSC CGL mein above average hai kyunki Maths aur Accounts dono strong hote hain.',
        ],
      },
      {
        heading: 'SSC CGL — Auditor, Accountant, Tax Assistant',
        paragraphs: [
          'SSC CGL B.Com graduates ke liye sabse natural fit hai. CGL se milne wali finance/accounts related posts: Auditor (CAG/CGDA/CGA) — Pay Level 5, basic Rs 29,200, in-hand Rs 35,000-40,000, promotion se Senior Auditor (Rs 35,400), then AAO (Rs 47,600). Accountant (CAG/CGA) — Pay Level 5, basic Rs 29,200, similar to Auditor salary. Tax Assistant (CBDT/CBIC) — Pay Level 4, basic Rs 25,500, in-hand Rs 30,000-35,000, promotion se Income Tax Officer (Rs 47,600) ban sakte ho.',
          'Income Tax Inspector — Pay Level 7, basic Rs 44,900, in-hand Rs 52,000-60,000. Yeh CGL ki sabse sought-after post hai. Preventive Officer (Customs) — same salary as IT Inspector. Assistant (CSS) — Pay Level 6, Rs 35,400, Central Secretariat mein posting. B.Com graduates ka Auditor/Accountant post mein direct advantage hai — accounts aur financial statements ka background hota hai. Promotion path clear hai — Auditor se 8-10 saal mein AAO, 15-18 saal mein Senior Audit Officer.',
        ],
      },
      {
        heading: 'CAG Office — Comptroller & Auditor General',
        paragraphs: [
          'CAG (Comptroller and Auditor General) office mein B.Com graduates ka sabse zyaada placement hota hai SSC CGL ke through. CAG ke under IA&AD (Indian Audit & Accounts Department) aata hai — yeh government expenditure ka audit karta hai. CAG Auditor ki posting states mein hoti hai — Principal Accountant General office mein. Kaam: government departments ka financial audit, accounts scrutiny, performance audit.',
          'CAG office ki promotion chain: Auditor (Pay Level 5, Rs 29,200) — Senior Auditor (Pay Level 6, Rs 35,400, 3 saal baad) — AAO/Assistant Audit Officer (Pay Level 8, Rs 47,600, departmental exam pass karne pe) — Audit Officer (Pay Level 10, Rs 56,100) — Senior Audit Officer (Pay Level 11, Rs 67,700). AAO banne ke liye SAS (Subordinate Accounts Service) exam pass karna hota hai — yeh departmental exam hai. B.Com graduates is exam mein naturally achha karte hain — Accounts aur Auditing subjects hote hain.',
        ],
      },
      {
        heading: 'Income Tax Department — Direct Tax Cadre',
        paragraphs: [
          'Income Tax department mein SSC CGL ke through Tax Assistant aur Inspector dono posts milti hain. Tax Assistant (CBDT) ka kaam: TDS returns processing, assessment orders drafting, refund processing. Promotion se Inspector of Income Tax ban sakte ho — Pay Level 7, Rs 44,900. Further promotion: Income Tax Officer (ITO) — Pay Level 9, Rs 53,100. ITO ke baad Assistant Commissioner (ACIT) — Pay Level 11, Rs 67,700.',
          'Income Tax Inspector ka kaam: tax survey, search & seizure operations mein participate karna, assessments karna, tax evasion cases investigate karna. Field work hota hai — office + outdoor dono. IT department mein B.Com/CA graduates ko extra respect milti hai kyunki financial statements samajhna unke liye easy hota hai. CBDT mein har saal roughly 2,000-3,000 vacancies aati hain various levels pe.',
        ],
      },
      {
        heading: 'Banking — IBPS PO, Clerk & RBI',
        paragraphs: [
          'Banking sector B.Com graduates ke liye traditional stronghold hai. IBPS PO (Probationary Officer) — starting salary Rs 52,000-58,000 (metro mein zyaada, rural mein kam). IBPS Clerk — starting salary Rs 28,000-32,000. SBI PO — Rs 55,000-63,000. SBI Clerk — Rs 26,000-29,000. Banking mein graduation kisi bhi stream se chalti hai lekin B.Com graduates ka edge hai — financial products, accounting concepts already clear hote hain.',
          'RBI Grade B Officer — yeh banking ka sabse prestigious post hai graduation level pe. Starting salary approximately Rs 1,05,000/month (gross, Mumbai). RBI Grade B exam: Phase 1 — 200 marks (GA, Quant, English, Reasoning), Phase 2 — 300 marks (Economics/Finance paper, Management paper, English essay). B.Com graduates Phase 2 mein achha karte hain kyunki Finance aur Economics padha hota hai. RBI mein har saal roughly 300-400 Grade B vacancies aati hain. NABARD Grade A bhi similar salary hai — Rs 90,000-1,00,000/month.',
        ],
      },
      {
        heading: 'State PSC — Finance & Accounts Cadre',
        paragraphs: [
          'Har state PSC finance aur accounts cadre ki posts recruit karti hai — B.Com graduates ke liye specifically designed. State Accountant/Accounts Officer — salary varies by state, Rs 35,400-56,100 range. Treasury Officer — state treasury mein posting, Rs 44,900-56,100. Commercial Tax Officer (State GST) — Rs 44,900-56,100, tax collection aur audit ka kaam. Cooperative Inspector — Rs 29,200-35,400, cooperative societies ka audit.',
          'State PSC exam typically General Studies + Commerce/Accounts subject ka hota hai. UP PCS mein Accounts Officer ki vacancy har saal aati hai. MPSC mein Commercial Tax Inspector. RPSC mein Accountant. BPSC mein State Audit Officer. State PSC ki advantage: home state mein posting, local language mein exam (most states), relatively less competition compared to Central services. B.Com + CA Inter ya B.Com + MBA wale candidates ko extra preference milti hai kuch states mein higher posts ke liye.',
        ],
      },
    ],
  },
  {
    slug: 'ias-ips-ifs-salary-comparison',
    title: 'IAS vs IPS vs IFS Salary 2026 — Post-wise Salary, Perks, Bungalow, Car',
    description:
      'Detailed comparison of IAS, IPS and IFS officer salaries at every level. Pay scale Level 10 to 18, in-hand salary, perks including bungalow, car, staff, security and retirement benefits.',
    readTime: '12 min read',
    category: 'Comparison',
    categoryColor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'IAS, IPS aur IFS (Foreign Service) — teeno All India Services/Central Services mein top-tier hain. Salary structure teeno ki almost same hai kyunki sab 7th CPC ke under aate hain. Real difference perks, power aur lifestyle mein hai. Is article mein har post level pe exact salary, allowances aur perks ka comparison hai — training se lekar retirement tak.',
        ],
      },
      {
        heading: 'Pay Scale — Level 10 to Level 18',
        paragraphs: [
          '7th Pay Commission ke under IAS/IPS/IFS officers ka pay scale same hai. Entry level (after training): Pay Level 10 — basic Rs 56,100. 4 saal baad: Pay Level 11 — Rs 67,700. 9 saal baad: Pay Level 12 — Rs 78,800 (Senior Time Scale). 13 saal baad: Pay Level 13 — Rs 1,18,500 (Junior Administrative Grade). 16 saal baad: Pay Level 13A — Rs 1,31,100 (Selection Grade). 25 saal baad: Pay Level 14 — Rs 1,44,200 (Super Time Scale). 30 saal baad: Pay Level 15 — Rs 1,82,200 (Above Super Time Scale). 33+ saal baad: Pay Level 16 — Rs 2,05,400 (HAG). Apex Level: Pay Level 17 — Rs 2,25,000. Cabinet Secretary: Pay Level 18 — Rs 2,50,000.',
        ],
        bullets: [
          'Pay Level 10 (Entry): Basic Rs 56,100 — SDM/ASP/Third Secretary level.',
          'Pay Level 11 (4 yrs): Basic Rs 67,700 — ADM/Addl SP level.',
          'Pay Level 12 (9 yrs): Basic Rs 78,800 — Under Secretary/DIG level.',
          'Pay Level 13 (13 yrs): Basic Rs 1,18,500 — Joint Secretary/IG level.',
          'Pay Level 14 (25 yrs): Basic Rs 1,44,200 — Additional Secretary/ADG level.',
          'Pay Level 17 (Apex): Basic Rs 2,25,000 — Chief Secretary/DGP/Foreign Secretary level.',
        ],
      },
      {
        heading: 'Posting-wise In-hand Salary Breakdown',
        paragraphs: [
          'In-hand salary posting location pe bahut depend karti hai — DA (Dearness Allowance), HRA (House Rent Allowance) aur TA (Transport Allowance) city classification ke hisaab se milta hai. DA currently 53% hai (Jan 2026 revision). HRA: X cities (Delhi, Mumbai, etc.) — 27% of basic, Y cities — 18%, Z cities — 9%.',
        ],
        bullets: [
          'Entry Level (Pay Level 10, Delhi posting): Basic Rs 56,100 + DA Rs 29,733 + HRA Rs 15,147 + TA Rs 7,200 + other allowances = In-hand approximately Rs 1,05,000-1,10,000/month after deductions.',
          'Entry Level (small town/Z city): Basic Rs 56,100 + DA Rs 29,733 + HRA Rs 5,049 + TA Rs 3,600 = In-hand approximately Rs 85,000-90,000/month.',
          'DM/SP Level (13 yrs, Pay Level 13, Delhi): Basic Rs 1,18,500 + DA Rs 62,805 + HRA Rs 31,995 + TA = In-hand approximately Rs 2,00,000-2,10,000/month.',
          'Secretary Level (Pay Level 17): Basic Rs 2,25,000 + DA Rs 1,19,250 + HRA Rs 60,750 = In-hand approximately Rs 3,80,000-4,00,000/month.',
        ],
      },
      {
        heading: 'Perks — Bungalow, Car, Staff, Security',
        paragraphs: [
          'IAS/IPS/IFS officers ki real compensation salary se kahin zyaada hai — perks ka monetary value Rs 50,000-5,00,000/month extra hota hai depending on posting level. Government bungalow (rent-free ya nominal rent) — DM level pe Type V/VI quarter (3-4 BHK, 2,000-3,000 sq ft), Secretary level pe Lutyens Delhi bungalow (market rent Rs 5-10 lakh/month). Government vehicle with driver — fuel aur maintenance government pay karti hai. Staff — peon, cook, gardener, driver (DM level pe 3-4 staff, Secretary pe 6-8).',
          'Medical: CGHS coverage — free treatment at government and empanelled private hospitals for self, spouse, children and dependent parents. No insurance premium, no claim limit. Children education allowance: Rs 2,250/month per child (max 2 children). LTC (Leave Travel Concession): free travel to hometown or anywhere in India once in 4 years. Telephone/internet: free landline + mobile reimbursement. Newspaper/magazine allowance. Deputation allowance (if posted outside cadre): extra 5-10% of basic.',
        ],
      },
      {
        heading: 'Retirement Benefits',
        paragraphs: [
          'Retirement pe: Pension — NPS ke under approximately 40-50% of last drawn salary as monthly pension (market-linked). Gratuity — roughly Rs 20-25 lakh at retirement. Commutation of pension — lump sum Rs 50 lakh-1 crore. CGHS facility — lifetime medical coverage after retirement (Rs 1,000/year contribution). Government accommodation — 6 months retention after retirement (extendable). Post-retirement: IAS/IPS officers ko commission, tribunal aur board positions milti hain — salary Rs 2,50,000/month. IFS officers ko Ambassador/High Commissioner positions milti hain retirement ke baad bhi.',
        ],
      },
      {
        heading: 'IAS District Collector — Salary & Perks',
        paragraphs: [
          'District Collector/District Magistrate (DM) post IAS officers ko 8-12 saal ki service ke baad milti hai. Pay Level 12-13 — basic Rs 78,800-1,18,500, in-hand Rs 1,50,000-2,10,000. DM ke perks: Circuit House mein official residence (colonial era bungalow, 4-6 BHK, 5,000-10,000 sq ft), 2-3 official vehicles, 5-6 staff members, protocol officer, security (1 gunman minimum, sensitive districts mein more). DM ki power: district ka administrative head — revenue, law & order, development, elections sab dekhta hai. 40-50 lakh logon ka zila apke under.',
        ],
      },
      {
        heading: 'IPS SP — Salary & Perks',
        paragraphs: [
          'IPS officers ko SP (Superintendent of Police) post 6-8 saal mein milti hai. Pay Level 12 — basic Rs 78,800, in-hand Rs 1,40,000-1,60,000. SP ke perks: official residence (Type V/VI quarter), 2 official vehicles (Bolero/Innova), armed guards (2-4 PSO), orderly/staff, wireless communication. DIG level pe security badhti hai — 4-6 guards. IG/ADG pe armoured vehicle bhi mil sakti hai.',
          'IPS officers ko additional benefits: free arms license, subsidised mess facility, sports/gym facility. Risk allowance sensitive areas mein — Naxal affected, J&K, NE posting pe extra Rs 25,000-35,000/month. IPS officers ko Central deputation pe RAW, IB, CBI, NIA mein posting milti hai — yahan confidential allowance extra milta hai. DGP level pe Pay Level 17 — Rs 2,25,000 basic, total package Rs 4-5 lakh/month with perks.',
        ],
      },
      {
        heading: 'IFS Posting Abroad — Salary & Perks',
        paragraphs: [
          'IFS (Indian Foreign Service) officers ki unique USP hai foreign posting. India mein salary IAS/IPS jaisi hi hai, lekin abroad posting pe Foreign Allowance milta hai — yeh posting country ke cost of living pe based hai. USA/UK/Europe posting: Foreign Allowance $5,000-8,000/month (Rs 4-6.5 lakh) — yeh salary ke upar extra hai. African/Asian countries: $2,000-4,000/month. Ambassador/High Commissioner level: $10,000-15,000/month foreign allowance.',
          'Abroad perks: rent-free accommodation (embassy provides flat/house — London/New York mein Rs 5-15 lakh/month equivalent ka accommodation), official car with driver, children education allowance (international school fees covered — $20,000-40,000/year), home leave passages (free tickets to India), entertainment allowance for hosting diplomatic events. IFS officers typically 3-4 years India mein aur 3-4 years abroad alternate karte hain. Total compensation abroad posting pe Rs 8-15 lakh/month equivalent hota hai.',
        ],
      },
      {
        heading: 'Which Service Should You Choose?',
        bullets: [
          'IAS: Maximum administrative power, district/state/central level pe decision-making. Best for those who want to impact governance, development aur policy. Transfer every 2-3 years, rural posting initial years mein.',
          'IPS: Law enforcement, crime investigation, internal security. Best for those who are action-oriented aur physically fit. Uniform ka respect, but high-stress job — 24x7 on call, political pressure.',
          'IFS: International diplomacy, represent India abroad. Best for those who love travel, languages aur international relations. Lifestyle sabse glamorous lekin family separation (spouse posting issues), limited domestic influence.',
          'Salary: Almost identical at every level. IFS wins on total compensation due to foreign allowance. IAS wins on perks domestically (bungalow, staff, power). IPS wins on security cover aur uniform allowance.',
          'Career growth: IAS officers DM/Commissioner/Chief Secretary bante hain. IPS officers SP/DIG/IG/DGP bante hain. IFS officers Consul General/Ambassador bante hain. Top 50 rank typically IAS choose karte hain, 50-100 IFS, 100-200 IPS — lekin yeh personal preference hai.',
        ],
      },
    ],
  },
  {
    slug: 'top-10-easiest-government-exams',
    title: 'Top 10 Easiest Government Exams 2026 — कम कॉम्पिटिशन वाली परीक्षाएं',
    description:
      'Sabse aasaan sarkari exams ki list jahan competition kam hai aur selection chances zyaada. GDS, Forest Guard, Anganwadi, SSC MTS, RRB Group D aur more — with applicant-to-vacancy ratio.',
    readTime: '10 min read',
    category: 'Strategy',
    categoryColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'Har sarkari exam ka competition same nahi hota — kuch exams mein 500:1 ratio hai aur kuch mein 10:1. Smart strategy yeh hai ki pehle kam competition wale exams crack karo, government job secure karo, aur phir andar se higher exams ki preparation karo. Is list mein wo 10 exams hain jahan selection chances sabse zyaada hain — ya toh kam candidates apply karte hain, ya vacancies bahut zyaada hain, ya exam relatively easy hai.',
        ],
      },
      {
        heading: '1. GDS (Gramin Dak Sevak) — Merit Based, No Written Exam',
        paragraphs: [
          'India Post ka GDS recruitment sabse unique hai — koi written exam nahi hota, 10th class marks ke basis pe merit list banti hai. 10th mein 60%+ marks hain toh chances achhe hain. Har cycle mein 30,000-40,000 vacancies aati hain — sabse zyaada vacancies kisi bhi single recruitment mein. Applicant-to-vacancy ratio: roughly 8:1 to 15:1 (state pe depend karta hai — Bihar/UP mein zyaada, NE states mein kam).',
          'GDS salary: Rs 12,000-14,500/month (TRCA — Time-Related Continuity Allowance). Yeh regular government salary nahi hai — GDS ko government employee nahi maana jaata technically, lekin pension aur gratuity milti hai. 3 saal baad Postman/MTS mein conversion ka option hai — tab regular salary Rs 18,000+ milti hai. Age limit: 18-40 years. Apply: indiapostgdsonline.gov.in.',
        ],
      },
      {
        heading: '2. Forest Guard — Low Competition, Physical Focus',
        paragraphs: [
          'State Forest Department ka Forest Guard exam mein written test easy hota hai — 10th level ka GK, Maths, Science. Selection mostly physical test pe depend karta hai — 25 km walk (4 hours mein), 1600m run (6 minutes mein), chest measurement. Applicant-to-vacancy ratio: 20:1 to 40:1 — written exam easy hone ke baad bhi physical mein 60-70% candidates fail ho jaate hain, toh effective competition bahut kam hai.',
          'Forest Guard salary: Pay Level 2-3, Rs 19,900-21,700 basic, in-hand Rs 23,000-27,000. Forest area mein posting hoti hai — quarter milta hai. Promotion: Forest Guard to Head Guard to Forester to Deputy Ranger. Physically fit candidates ke liye yeh sabse aasaan sarkari naukri hai. Har state apni recruitment separately karti hai — MP, Chhattisgarh, Rajasthan mein vacancies zyaada aati hain.',
        ],
      },
      {
        heading: '3. Anganwadi Worker/Helper — Interview Based',
        paragraphs: [
          'Anganwadi Worker aur Helper ki recruitment mostly interview/merit based hoti hai — kuch states mein simple written test hota hai (GK, Child Development basics). Anganwadi Worker ke liye minimum 10th pass, Helper ke liye 8th pass chalti hai. Applicant-to-vacancy ratio: 5:1 to 15:1 — mostly local candidates hi apply karte hain kyunki apne gram panchayat mein hi posting hoti hai.',
          'Anganwadi Worker salary: Rs 8,000-12,000/month (state pe depend karta hai — Delhi mein Rs 12,000, UP mein Rs 8,000). Helper salary: Rs 4,000-6,000/month. Yeh salary kam hai lekin kaam bhi part-time hai (6 hours/day). Recently Supreme Court ne regular pay dene ka direction diya hai — kuch states mein salary Rs 15,000-18,000 tak badhi hai. Benefits: ESI, maternity leave, pension (kuch states mein).',
        ],
      },
      {
        heading: '4. State PSC Lower Division Posts & SSC MTS',
        paragraphs: [
          'State PSC ki lower posts — Lower Division Clerk (LDC), Stenographer, Junior Assistant — mein competition comparatively kam hota hai. UP, MP, Rajasthan, Bihar mein LDC ke liye 20:1 to 40:1 ratio rehta hai. LDC salary: Rs 19,900-25,500 basic. Exam: General Hindi/English, Maths, GK — 10th-12th level difficulty. Typing test bhi hota hai — Hindi 25 WPM ya English 30 WPM.',
          'SSC MTS (Multi Tasking Staff) — 10th pass ke liye sabse popular exam. Salary Pay Level 1: basic Rs 18,000, in-hand Rs 21,000-27,000 (city pe depend). Applicant-to-vacancy ratio: 50:1 to 80:1 — yeh high lagta hai lekin actual serious candidates (jo actually prepare karte hain) ka ratio 15:1 ke aas paas hai. Exam: 2 papers — Paper 1 (90 questions, 90 minutes — Reasoning, Maths, English, GA), Paper 2 (descriptive — short essay/letter in English/Hindi). 10th level difficulty.',
        ],
      },
      {
        heading: '5. ESIC & RRB Group D',
        paragraphs: [
          'ESIC (Employees State Insurance Corporation) UDC, Stenographer, MTS posts ke liye recruit karta hai. ESIC UDC salary: Rs 25,500-29,200, in-hand Rs 30,000-35,000. Applicant-to-vacancy ratio: 25:1 to 35:1 — kam logon ko ESIC ka pata hota hai toh competition SSC se kam rehta hai. Exam pattern SSC jaisa hi hai — Reasoning, Quant, English, GA. ESIC mein medical facilities ka additional benefit milta hai.',
          'RRB Group D — 10th pass ke liye Railway mein entry. Salary Pay Level 1: basic Rs 18,000, in-hand Rs 21,000-24,000. Vacancies har cycle mein 50,000-1,00,000+ aati hain — India ka sabse bada single recruitment drive. Applicant-to-vacancy ratio: roughly 40:1 to 60:1 — lekin vacancies itni zyaada hain ki absolute numbers mein bahut log select hote hain. Railway pass (free travel across India), medical, quarter — perks achhe hain. Exam: CBT — 100 questions, 90 minutes. Maths, GI, GA, GS — 10th level.',
        ],
      },
      {
        heading: '6. Apprentice, FCI & EPFO',
        paragraphs: [
          'Apprentice recruitment under Apprentice Act — railways, defence, PSUs mein. Koi competitive exam nahi — ITI/Diploma marks pe merit. Stipend Rs 7,000-15,000/month during training. Training ke baad regularisation chances hain — Railway Apprentice ka 70%+ absorption rate hai. Age limit: 15-24 years. Apply: apprenticeshipindia.gov.in. Competition: very low — many seats remain vacant because students do not know about this scheme.',
          'FCI (Food Corporation of India) Watchman/AG-III posts: salary Rs 25,500-35,400. AG-III (General/Accounts/Technical/Depot) mein graduation chahiye. Exam relatively easy — SSC level. Applicant-to-vacancy ratio: 20:1 to 30:1. FCI ka perk: subsidised food grains. EPFO (Employees Provident Fund Organisation) SSA (Social Security Assistant): salary Rs 25,500 basic, in-hand Rs 32,000-36,000. EPFO mein promotion achhi hai — SSA se APFC (Rs 56,100) tak departmental exam se. Applicant-to-vacancy ratio: 30:1 to 40:1.',
        ],
      },
    ],
  },
  {
    slug: 'best-youtube-channels-sarkari-exam',
    title: 'Best YouTube Channels for Government Exam Preparation 2026 — Free Study',
    description:
      'Top YouTube channels for SSC, Banking, UPSC, Railway and other government exam preparation. Free video lectures, mock tests and study material ki complete guide.',
    readTime: '8 min read',
    category: 'Resources',
    categoryColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'YouTube pe free mein government exam ki preparation karna ab puri tarah possible hai — coaching ki zaroorat nahi. Top educators apne channels pe complete courses dete hain jo paid coaching se kam nahi hain. Is guide mein exam-wise best channels hain — sirf wo jo consistently quality content dete hain aur proven results hain. Ek channel pe depend mat raho — subject-wise best teacher follow karo.',
        ],
      },
      {
        heading: 'SSC Exam Channels — CGL, CHSL, MTS, CPO',
        paragraphs: [
          'SSC Maths ke liye Gagan Pratap Sir (7M+ subscribers) — unka "Maths by Gagan Pratap" channel SSC aspirants mein sabse popular hai. Complete arithmetic aur advance maths course free hai. Shortcuts aur tricks pe focus hai — exam hall mein time bachate hain. Rakesh Yadav Sir (5M+ subscribers) — "Rakesh Yadav Readers Club" channel. Unki Arithmetic book sarkari exam ki Bible maani jaati hai — YouTube pe bhi same quality.',
          'SSC English ke liye Neetu Singh Mam (English With Neetu Singh) — grammar aur vocabulary ke liye best. Aman Vashishth Sir (2M+ subscribers) — Reading Comprehension aur Error Detection ke liye. SSC Reasoning ke liye Sahil Sir (Reasoning by Sahil Sir) — coding-decoding, syllogism, puzzles ke liye achhe hain. SSC GK ke liye Lucent GK ka YouTube channel aur Khan Sir Patna (25M+ subscribers) — Khan Sir GK ko entertaining banate hain, boring nahi lagta.',
        ],
      },
      {
        heading: 'Banking Exam Channels — IBPS, SBI, RBI',
        paragraphs: [
          'Adda247 (10M+ subscribers) — banking exams ke liye one-stop channel. Daily current affairs, quant, reasoning, English sab milta hai. Unka "Bankersadda" channel specifically banking focused hai. Free mock tests bhi dete hain regularly. Oliveboard (2M+ subscribers) — RBI Grade B aur NABARD ke liye best content. Economics aur Finance subjects ke liye detailed lectures.',
          'Banking Quant ke liye Arun Sir (Quantum CAT/Bank fame) — advanced level quant problems. Reasoning ke liye Puzzle Guru channel — banking mein puzzles aur seating arrangement hi 60% reasoning paper hota hai, yeh channel sirf wahi cover karta hai. English ke liye Amandeep Mam (English by Amandeep) — cloze test, reading comprehension, error spotting. Current Affairs ke liye Study IQ Daily Current Affairs (free, 30 minutes daily) — banking + SSC dono ke liye useful.',
        ],
      },
      {
        heading: 'UPSC Channels — Prelims, Mains, Interview',
        paragraphs: [
          'Drishti IAS (15M+ subscribers) — UPSC ke liye sabse comprehensive free resource. Daily current affairs (Hindi medium), subject-wise lectures, answer writing practice sab milta hai. Unka "Drishti PCS" channel state PSC ke liye hai. StudyIQ Education (20M+ subscribers) — Gaurav Maan Sir ka channel. UPSC + general awareness ke liye excellent. Daily current affairs in Hindi aur English dono. Subscriber base sabse bada hai government exam category mein.',
          'UPSC specific subjects: History ke liye Hemant Sir (History by Hemant Sir) — Modern History aur Ancient History lectures. Geography ke liye Khan Academy (basics) + Drishti IAS (Indian Geography). Polity ke liye M Laxmikanth book ka video explanation — PWOnlyIAS channel pe milta hai. Economy ke liye Vivek Singh Sir (Economy by Vivek Singh). Optional subjects ke liye BYJU\'s Free Classes (selected optionals ka free content hai). Mrunal.org ka YouTube channel — Economy aur Ethics ke liye gold standard.',
        ],
      },
      {
        heading: 'Railway Exam Channels — RRB NTPC, Group D, JE',
        paragraphs: [
          'Railway exams ke liye RRB Guru channel — specifically railway exam focused content. Exam pattern, previous year papers, subject-wise lectures sab free. Wifistudy (8M+ subscribers) — Rakesh Yadav Publication ka official channel. SSC + Railway dono ke liye daily classes. Maths, Reasoning, GK, Science — sab subjects covered. Live classes aur recorded lectures dono available.',
          'Railway Science ke liye Alakh Pandey Sir (Physics Wallah — 20M+ subscribers) — unka basic science content railway exam level ke liye perfect hai. Class 10 Science series complete karlo — railway GS section cover ho jaata hai. Railway GK ke liye Lucent GK ka YouTube channel + "GK by Sandeep Sir" — railway previous year GK questions ka analysis. Testbook (5M+ subscribers) — free mock tests ke saath video solutions bhi dete hain — railway, SSC, banking sab ke liye.',
        ],
      },
      {
        heading: 'General Channels — Multiple Exams',
        paragraphs: [
          'Testbook (5M+ subscribers) — free mock tests aur video courses. SSC, Banking, Railway, State PSC — almost har exam ka content hai. Daily free live classes. Unacademy Free (10M+ subscribers) — Unacademy ka free YouTube channel. Top educators ke lectures free mein milte hain — subscription ki zaroorat nahi YouTube ke liye. UPSC, SSC, Banking, Railway sab. Exampur (8M+ subscribers) — Vivek Sir ka channel. Daily classes, current affairs, subject-wise courses. Hindi medium mein sabse popular all-in-one channel.',
          'Utkarsh Classes (6M+ subscribers) — Rajasthan-based lekin all-India exams cover karte hain. Kumar Gaurav Sir (Maths) aur Narendra Sir (Reasoning) famous hain. Dear Sir (3M+ subscribers) — Banking + SSC ke liye daily live classes. Paid courses bhi hain lekin YouTube pe free content bhi substantial hai. Competition tip: ek channel pe complete ek subject karo, phir doosre pe switch karo. 5 channels simultaneously follow karne se confusion hoti hai, progress nahi.',
        ],
      },
      {
        heading: 'Subject-wise Best Channels',
        bullets: [
          'Maths: Gagan Pratap (SSC level), Rakesh Yadav (SSC/Bank), Arun Sir (Banking advanced), Mohit Goyal (all exams). Daily 50 questions solve karo inke videos se.',
          'English: Neetu Singh (Grammar), Aman Vashishth (Comprehension), Amandeep Mam (Banking English). English mein consistency chahiye — daily 30 minutes minimum.',
          'Reasoning: Sahil Sir (SSC), Puzzle Guru (Banking puzzles), Deepak Sir (Utkarsh). Reasoning practice-based hai — video dekho aur turant solve karo, passive mat dekho.',
          'General Knowledge/GK: Khan Sir Patna (entertaining + informative), Lucent GK channel, Sandeep Sir. Static GK ke liye ek baar Lucent book padho, phir YouTube se revise karo.',
          'Current Affairs: StudyIQ Daily CA (30 min), Drishti IAS Daily CA (45 min), Adda247 Daily CA. Ek hi channel follow karo daily — consistency matters more than source.',
          'Science (Railway/SSC): Physics Wallah (basics), Khan Academy Hindi, Alakh Sir. Class 10 NCERT Science complete karna = 90% railway science covered.',
        ],
      },
    ],
  },
  {
    slug: 'agniveer-scheme-complete-guide',
    title: 'Agniveer Scheme Complete Guide 2026 — Salary, Training, After 4 Years Options',
    description:
      'Agniveer Yojana ki complete jankari — eligibility, age limit, salary structure Rs 30K-40K, 4-year training, Seva Nidhi Rs 11.71 lakh, 25% retention policy aur after 4 years career options.',
    readTime: '10 min read',
    category: 'Defence',
    categoryColor: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'Agniveer scheme June 2022 mein launch hui — Indian Army, Navy aur Air Force mein ab soldiers/sailors/airmen ki recruitment sirf Agnipath scheme ke through hoti hai. Yeh 4-saal ka engagement hai, permanent nahi. 75% Agniveers 4 saal baad retire hote hain aur 25% ko permanent enrollment milta hai. Yeh scheme controversial hai lekin reality yeh hai ki ab defence mein jaane ka yahi ek raasta hai — toh isko achhe se samajhna zaroori hai.',
        ],
      },
      {
        heading: 'Agniveer Kya Hai — Scheme Overview',
        paragraphs: [
          'Agnipath scheme ke under "Agniveer" naam se jawaan recruit hote hain — Army mein Agniveer (General Duty, Technical, Clerk/SKT, Tradesman), Navy mein Agniveer (SSR, MR, AA), Air Force mein Agniveer (Group X Technical, Group Y Non-Technical). Engagement period: 4 years (extendable nahi hai). 4 saal ke baad: 25% ko permanent enrollment offer hoga based on performance, baaki 75% retire honge with Seva Nidhi package. Agniveers ko full military training milti hai — same training jo pehle regular soldiers ko milti thi.',
          'Important: Agniveer ko "soldier" ka official status milta hai service ke dauraan. Military law ke under aate hain. Canteen, medical, quarter — sab facilities milti hain. Lekin 4 saal ke baad retire hone pe ex-serviceman ka status nahi milta (yeh ek major criticism hai). Pension nahi milti — Seva Nidhi ek lump-sum amount hai. Gratuity bhi nahi milti. Insurance coverage Rs 48 lakh hai service ke dauraan — death/disability pe milta hai.',
        ],
      },
      {
        heading: 'Eligibility & Age Limit',
        bullets: [
          'Age: 17.5 to 21 years (initially 23 years tha first batch ke liye, ab 21 fix hai). Date of birth online registration ke time count hoti hai.',
          'Education: Army GD — 10th pass (minimum 33% aggregate aur each subject mein 33%). Army Technical — 12th pass with Physics, Maths, Chemistry/CS (minimum 50%). Army Clerk/SKT — 12th pass any stream (minimum 60%). Army Tradesman — 10th pass (8th for some trades).',
          'Navy SSR — 12th pass with Maths & Physics (minimum 50%). Navy MR — 10th pass. Navy AA (Artificer Apprentice) — 12th with 65% in Maths & Physics.',
          'Air Force Group X (Technical) — 12th with Physics & Maths (minimum 50%). Air Force Group Y (Non-Technical) — 12th pass any stream (minimum 50%). Both X & Y — 12th with Physics, Maths + English (50% each).',
          'Physical: Height — 170cm (general, relaxation for hill areas 165cm, tribal 162cm). Weight — proportional to height. Chest — 77cm (expansion 5cm minimum). Medical — no flat feet, colour blindness, or major health issues.',
          'Nationality: Indian citizen only. Domicile of a specific state required for some rally-based recruitments.',
        ],
      },
      {
        heading: 'Salary Structure — Rs 30,000 to Rs 40,000',
        paragraphs: [
          'Agniveer ki salary customised package hai — yeh regular 7th CPC pay scale nahi hai. Year 1: Rs 30,000/month (in-hand Rs 21,000 — 30% Agniveer Corpus Fund mein jaata hai + equal government contribution). Year 2: Rs 33,000/month (in-hand Rs 23,100). Year 3: Rs 36,500/month (in-hand Rs 25,580). Year 4: Rs 40,000/month (in-hand Rs 28,000). Risk/Hardship allowance: Rs 5,000-10,000 extra depending on posting area.',
          'Total in-hand salary 4 saal mein: approximately Rs 11.71 lakh (salary ka 70%). Total Seva Nidhi (lump sum on exit): approximately Rs 11.71 lakh (30% contribution + government matching + interest). Grand total monetary benefit in 4 years: Rs 23-25 lakh. Additionally: free food, accommodation, uniform, medical for self during service. Insurance: Rs 48 lakh life cover (non-contributory — government pays premium). Ration money: Rs 4,000-5,000/month equivalent free food.',
        ],
      },
      {
        heading: 'Seva Nidhi — Rs 11.71 Lakh Package',
        paragraphs: [
          'Seva Nidhi ka calculation: Agniveer apni salary ka 30% har month contribute karta hai ek corpus fund mein. Government equal amount match karti hai. 4 saal ka total contribution (Agniveer + Government): Year 1 — Rs 1,08,000 x 2 = Rs 2,16,000. Year 2 — Rs 1,18,800 x 2 = Rs 2,37,600. Year 3 — Rs 1,31,400 x 2 = Rs 2,62,800. Year 4 — Rs 1,44,000 x 2 = Rs 2,88,000. Total: Rs 10,04,400 + accrued interest = approximately Rs 11.71 lakh.',
          'Seva Nidhi tax-free hai — income tax nahi lagta is amount pe. Yeh amount 4 saal ki service complete hone pe milta hai — beech mein chhodne pe sirf Agniveer ka contribution milta hai, government matching nahi. Seva Nidhi ke saath skill certificate bhi milta hai — yeh higher education ya employment mein help karta hai. 25% jo permanent enrolled hote hain — unko Seva Nidhi nahi milti, unko regular military service ki pension aur benefits milte hain.',
        ],
      },
      {
        heading: 'After 4 Years — Career Options',
        paragraphs: [
          '25% Retention: Top performers ko permanent enrollment milta hai — Regular Cadre mein aa jaate hain. Tab pension, gratuity, ex-serviceman benefits sab milte hain. 15 years minimum service ke baad pension eligible. Selection merit-based hai — 4 saal ki performance, discipline, medical fitness dekhi jaati hai.',
          'Baaki 75% ke liye options: CAPF (BSF, CRPF, CISF, SSB, ITBP) mein 10% reservation milta hai Agniveers ko. Age relaxation 3-5 years. State Police mein preference — kuch states ne 10-15% reservation announce kiya hai. Defence PSU (BEL, HAL, BDL) mein preference. Private security sector mein high demand — Agniveer certificate valued hai. Higher education — IGNOU, skill courses ke liye fee waiver/scholarship. Seva Nidhi se apna business start kar sakte ho — Rs 11.71 lakh seed capital.',
        ],
        bullets: [
          '25% Permanent Retention — Regular Cadre, pension eligible, full ex-serviceman benefits. Minimum 15 years service for pension.',
          'CAPF Recruitment — 10% reservation in BSF, CRPF, CISF, SSB, ITBP. Age relaxation 3-5 years. Salary Rs 21,700-69,100.',
          'State Police — Several states announced 10-15% reservation. UP, MP, Haryana, Rajasthan have notified preferences for Agniveers.',
          'Defence PSUs — BEL, HAL, BEML, MDL preference in recruitment. Technical Agniveers especially valued.',
          'Private Sector — Corporate security, facility management, logistics. Starting salary Rs 25,000-40,000 in security firms.',
          'Entrepreneurship — Rs 11.71 lakh Seva Nidhi as startup capital. Mudra Loan preference for Agniveers. Skill certificate helps in bank loan approval.',
        ],
      },
      {
        heading: 'Pros, Cons & How to Apply',
        paragraphs: [
          'Pros: Military training aur discipline milti hai — life mein kahi bhi kaam aaye. Rs 11.71 lakh tax-free lump sum at age 21-25 — bahut achhi seed money. Insurance Rs 48 lakh. Skill certificate. CAPF/Police mein preference. 25% chance of permanent defence career. Physical aur mental fitness jo civilian life mein nahi milti.',
          'Cons: 4 saal baad 75% ko nikalna padta hai — no pension, no ex-serviceman status. 21-25 age ke crucial years defence mein lag jaate hain — civil preparation ka time nikalta hai. Seva Nidhi Rs 11.71 lakh 4 saal ke liye kam hai compared to regular soldier pension. Family quarters nahi milte Agniveers ko (only for permanent cadre). Political uncertainty — scheme change hone ka risk.',
          'How to apply: joinindianarmy.nic.in (Army), joinindiannavy.gov.in (Navy), agnipathvayu.cdac.in (Air Force). Process: Online registration — Written exam (CEE for Army, INET for Navy, Phase 1 for AF) — Physical Fitness Test — Medical — Merit List. Rally-based recruitment bhi hoti hai kuch categories mein — apne state/district mein rally ka notification check karo. Exam centres district level pe hote hain.',
        ],
      },
    ],
  },
  {
    slug: 'nps-vs-ops-pension-comparison',
    title: 'NPS vs OPS — Which Pension is Better? Government Employee Guide',
    description:
      'NPS (New Pension Scheme) aur OPS (Old Pension Scheme) ka detailed comparison. UPS (Unified Pension Scheme), monthly pension calculation, which states restored OPS aur new employees ke liye guide.',
    readTime: '9 min read',
    category: 'Finance',
    categoryColor: 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'Pension ka mudda har government employee ke liye sabse important hai — retirement ke baad monthly income ka sawaal hai. 2004 se pehle join karne wale employees ko OPS (Old Pension Scheme) milti hai — guaranteed 50% of last drawn basic salary as pension. 2004 ke baad join karne wale ko NPS (New Pension Scheme) milti hai — market-linked, koi guarantee nahi. 2025 mein Government ne UPS (Unified Pension Scheme) announce kiya — yeh NPS ka improved version hai. Is article mein teeno ka detailed comparison hai.',
        ],
      },
      {
        heading: 'OPS — Old Pension Scheme (50% of Last Basic Pay)',
        paragraphs: [
          'OPS mein pension ka formula simple hai: 50% of last drawn basic pay + DA as monthly pension. Employee ka koi contribution nahi hota — government puri pension pay karti hai. Example: agar retirement ke time basic pay Rs 56,100 + DA 53% = Rs 85,833 hai, toh monthly pension Rs 42,916 milegi. Har 6 months mein DA badhne pe pension bhi automatically badhti hai. Family pension (spouse ko): 30% of last basic + DA.',
          'OPS ke benefits: Guaranteed pension — market conditions se koi farak nahi padta. Commutation: retirement pe 40% pension lump sum mein le sakte ho (15 saal baad restore ho jaati hai). Gratuity: last basic + DA x 15/26 x years of service (max Rs 20 lakh). Leave encashment: 300 days max — Rs 10-15 lakh. Medical: CGHS lifetime. GPF (General Provident Fund): jo employee contribute karta hai interest ke saath milta hai retirement pe — typically Rs 30-50 lakh.',
        ],
      },
      {
        heading: 'NPS — New Pension Scheme (Market-Linked)',
        paragraphs: [
          'NPS mein employee apni basic salary ka 10% contribute karta hai aur government 14% contribute karti hai (total 24%). Yeh paisa PFRDA (Pension Fund Regulatory & Development Authority) ke through equity, government bonds aur corporate bonds mein invest hota hai. Retirement pe: 60% corpus ko annuity (pension) khareedni hoti hai, 40% lump sum tax-free milta hai.',
          'NPS pension calculation example: 30 saal service, average basic Rs 40,000 pe total corpus approximately Rs 1.5-2 crore (depending on market returns — 10-12% assumed). 60% of Rs 1.75 crore = Rs 1.05 crore annuity mein. Annuity rate 6-7% pe monthly pension approximately Rs 52,000-61,000. 40% = Rs 70 lakh lump sum. Lekin yeh guaranteed nahi hai — agar market crash hota hai toh pension kam ho sakti hai. NPS mein DA increase ke saath pension nahi badhti — annuity fixed rehti hai (unless inflation-indexed annuity li ho jo expensive hoti hai).',
        ],
      },
      {
        heading: 'UPS — Unified Pension Scheme (2025 Update)',
        paragraphs: [
          'Government ne April 2025 mein UPS (Unified Pension Scheme) announce kiya — yeh NPS subscribers ke liye optional hai. UPS features: Assured pension — 50% of average basic pay of last 12 months (minimum 25 years service ke liye). Pro-rata pension for 10-25 years service. Minimum pension: Rs 10,000/month (minimum 10 years service). Family pension: 60% of employee pension. Inflation indexing — pension DA ke saath badhegi.',
          'UPS mein employee contribution 10% rehta hai, government contribution 18.5% ho gaya hai (NPS mein 14% tha). UPS choose karne pe NPS corpus UPS mein convert ho jaata hai. UPS ka benefit: OPS jaisi guaranteed pension milegi with slight modifications. Drawback: average of last 12 months ka basic liya jaata hai (OPS mein last drawn basic, jo zyaada hota hai). UPS 1 April 2025 se effective hai — existing NPS subscribers ek baar mein switch kar sakte hain.',
        ],
      },
      {
        heading: 'Monthly Pension Comparison — Real Example',
        paragraphs: [
          'Example: Employee retires at Pay Level 12, basic Rs 1,31,100. DA at retirement: 53%. Last drawn = Rs 1,31,100 + Rs 69,483 DA = Rs 2,00,583.',
        ],
        bullets: [
          'OPS Pension: 50% of (Rs 1,31,100 + DA) = Rs 1,00,291/month. Plus DA revision every 6 months. After 10 years pension could be Rs 1,50,000+ due to DA.',
          'NPS Pension (estimated): Corpus Rs 2.5 crore (assumed 11% return over 35 years). 60% annuity = Rs 1.5 crore. At 6.5% annuity rate = Rs 81,250/month. Fixed — no DA increase. 40% lump sum = Rs 1 crore.',
          'UPS Pension: 50% of average basic of last 12 months = Rs 65,550/month approximately (only basic, not basic+DA). Plus DA indexing — so effectively similar to OPS over time.',
          'Winner: OPS gives highest monthly pension with inflation protection. UPS is close second. NPS depends on market — could be higher or lower than OPS.',
        ],
      },
      {
        heading: 'Which States Restored OPS',
        paragraphs: [
          'Several states announced OPS restoration for state government employees: Rajasthan (2022 — first state), Chhattisgarh (2022), Jharkhand (2022), Himachal Pradesh (2023), Punjab (2023). Some states announced but implementation pending: Madhya Pradesh, Karnataka (under review). States that chose UPS instead: Central Government, Uttar Pradesh, Gujarat, Maharashtra.',
          'Important: OPS restoration is only for state government employees — Central Government employees are under NPS/UPS. State OPS restoration means employees who joined after 2004 will shift back to OPS from NPS. Their NPS corpus will be transferred to state treasury. Financial experts warn that OPS is a huge fiscal burden — states ka pension bill GDP ka 4-5% ho sakta hai. But employees obviously prefer OPS kyunki guaranteed pension milti hai.',
        ],
      },
      {
        heading: 'Impact on Take-home Salary & What New Employees Should Know',
        paragraphs: [
          'NPS mein employee contribution 10% of basic salary monthly katti hai — isse take-home salary kam hoti hai compared to OPS (where no employee contribution for pension). Example: Rs 56,100 basic pe NPS contribution Rs 5,610/month = Rs 67,320/year — yeh paise pocket se jaate hain. OPS mein yeh katauti nahi hoti thi — GPF optional tha. UPS mein contribution same 10% hai — take-home same as NPS.',
          'New employees ke liye advice: agar Central Government join kar rahe ho, UPS choose karo — guaranteed pension milegi. Agar state government join kar rahe ho, check karo state ne OPS restore kiya hai ya nahi. NPS mein agar rahna hai toh aggressive equity allocation choose karo (up to 75% in equity) — long term mein returns zyaada milenge. NPS Tier 2 account separately kholo — extra savings ke liye useful hai, withdrawal restrictions nahi hain. Financial planning early start karo — NPS ke saath PPF, ELSS, sukanya samriddhi mein bhi invest karo taaki retirement pe dependence sirf pension pe na ho.',
        ],
      },
    ],
  },
  {
    slug: 'government-job-interview-tips-hindi',
    title: 'Government Job Interview Tips — इंटरव्यू में क्या पूछा जाता है?',
    description:
      'Sarkari naukri interview ki complete preparation guide. Common questions, dress code, documents checklist, body language tips, UPSC interview vs SSC DV aur panel composition details.',
    readTime: '8 min read',
    category: 'Strategy',
    categoryColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'Government job interview mein selection ya rejection aksar chhoti chhoti cheezon pe depend karta hai — sahi kapde, confident body language, aur prepared answers. UPSC personality test ho ya SSC document verification, State PSC interview ho ya Banking interview — har ek ka format alag hai lekin basic preparation same hai. Is guide mein wo sab hai jo tumhe interview ke din confident banayega.',
        ],
      },
      {
        heading: 'Common Interview Questions — Yeh Zaroor Puchha Jaata Hai',
        paragraphs: [
          '"Tell me about yourself / Apne baare mein batao" — yeh pehla question hai 90% interviews mein. Answer mein: naam, education, hometown, family background (briefly), achievements, why this job — 2 minutes mein khatam karo. Rehearse karo lekin ratta mat lagao — natural sound karna chahiye. Hometown ke baare mein 2-3 interesting facts yaad rakho — panel aksar wahan se questions uthata hai.',
          '"Why government job / Sarkari naukri kyun chahte ho?" — honest answer do lekin sirf "job security" mat bolo. Bolo: "I want to serve the public through a structured system. Government jobs allow me to contribute to nation-building at the grassroots level while providing stability for my family." Hindi mein: "Main samaj ki seva structured tareeke se karna chahta hoon, aur sarkari naukri mein yeh mauka milta hai." Paisa aur security mention karna galat nahi hai — lekin service angle pehle rakho.',
        ],
        bullets: [
          '"Current affairs" — Last 3 months ki important news, especially government schemes, international events, sports achievements. Daily 15 minutes newspaper padho interview se 1 month pehle.',
          '"Your state/district ke baare mein batao" — District ka area, population, famous places, industries, problems, MP/MLA ka naam, district collector ka naam.',
          '"Why this specific department?" — Research karo department kya kaam karta hai. Income Tax mein interview ho toh tax collection figures, recent changes (new tax regime) jaano.',
          '"Hobbies" — jo bhi bolo uske baare mein 5 follow-up questions ka answer ready rakho. Cricket bola toh last match score, captain, recent controversy jaano. Reading bola toh last 3 books ke naam aur summary yaad ho.',
          '"Strengths and weaknesses" — Strength: relevant to job (analytical thinking, patience, teamwork). Weakness: genuine lekin non-critical (I tend to overthink decisions, I am working on being more concise).',
        ],
      },
      {
        heading: 'Dress Code — Kya Pehne Interview Mein',
        paragraphs: [
          'Men: Light-colored formal shirt (white, light blue, cream) + dark formal trousers (navy, dark grey, black) + leather belt + polished formal shoes (black or brown). Tie optional lekin UPSC/Banking mein pehno. Full sleeves preferred. Beard trimmed ya clean-shaven. Hair neat. No strong perfume — mild deodorant enough. Watch pehen sakte ho — formal watch, digital/sports nahi.',
          'Women: Formal salwar suit ya saree (solid colors — avoid loud prints), ya formal western (blazer + trousers + formal shirt). Light makeup — no heavy eye shadow or bright lipstick. Hair tied neatly — bun ya ponytail. Minimal jewelry — small earrings, no danglers. Comfortable formal shoes — no stilettos (you may need to walk). Dupatta properly pinned. Bindi optional — depends on personal preference.',
        ],
      },
      {
        heading: 'Documents to Carry — Complete Checklist',
        bullets: [
          'Original documents: 10th marksheet, 12th marksheet, Graduation degree/provisional certificate, Post-graduation (if applicable), Caste certificate (if SC/ST/OBC), Income certificate (if EWS), Domicile certificate, Character certificate (from Gazetted Officer or college), Experience certificate (if applicable).',
          'Photocopies: 3 sets of all original documents (attested by Gazetted Officer). 8-10 passport-size photos (white background, recent — same as uploaded during application). Aadhar card, PAN card photocopy.',
          'Admit card + application form printout (2 copies). Medical fitness certificate (some interviews require — check notification). NOC from current employer (if already in government service). Affidavit (if required — gap in education, name change, etc.).',
          'Carry everything in a neat folder/file — not in a plastic bag. Organize documents in sequence: personal ID first, then education (10th to highest), then certificates. Use transparent sheet protectors for originals.',
        ],
      },
      {
        heading: 'Body Language Tips — Non-verbal Communication',
        paragraphs: [
          'Interview panel pehle 30 seconds mein impression bana leta hai — yeh mostly body language se aata hai. Enter karo — door knock karo 2-3 baar, permission milne pe enter karo. "May I come in Sir/Madam?" bolo. Chair ke paas jao, "May I sit down?" pucho. Permission milne pe baitho — chair pe poora baitho, edge pe mat baitho. Straight posture — back rest pe lightly lean karo, slump mat karo.',
          'Eye contact: sabse important. Panel ke jis member ne question pucha hai usse primarily eye contact rakho, lekin baaki members ko bhi occasionally dekho. Neeche ya ceiling ki taraf mat dekho — insecurity lagti hai. Haath: table pe lightly rakh sakte ho ya lap mein. Excessive hand gestures avoid karo. Pen/file se mat khelo. Legs: cross mat karo, spread mat karo — straight rakho ya slightly angled. Nervous habits: hair touch karna, lip biting, pen clicking — yeh sab consciously avoid karo. Practice: mirror ke saamne ya phone camera pe record karke dekho.',
        ],
      },
      {
        heading: 'UPSC Interview vs SSC DV — Key Differences',
        paragraphs: [
          'UPSC Personality Test: 275 marks (total 2025 marks mein). Panel: 5 members (Chairman + 4). Duration: 25-40 minutes. Questions: personality assessment — opinion-based, analytical, current affairs, your background, ethical dilemmas. No right/wrong answers — assessment is on clarity of thought, communication, leadership potential, integrity. Marks range: typically 140-210 (average 170-180). Dressing: formal — suit/blazer for men, saree/formal for women.',
          'SSC Document Verification (DV): SSC mein interview hataya gaya hai 2016 se — ab sirf DV hota hai. DV mein: documents verify hote hain, physical standards check hoti hai (kuch posts mein), typing test hoti hai (LDC/DEO ke liye). Koi personality assessment nahi. Documents sahi hone chahiye — ek bhi document galat ya missing ho toh candidature cancel. DV ke din time pe pahuncho — late aane pe entry nahi milti.',
          'State PSC Interview: 50-100 marks (state pe depend). Panel: 3-5 members. Duration: 10-20 minutes. Questions: state-specific GK, current affairs, personal background, why this post. Bihar PSC mein 120 marks, UP PSC mein interview nahi hai ab (2024 se hataya). Some states conduct interview in regional language — Hindi/regional language mein answer dena acceptable hai.',
        ],
      },
      {
        heading: 'Panel Composition & Marks Distribution',
        paragraphs: [
          'UPSC panel: Chairman (usually a retired IAS/IPS officer or academician) + 4 members (bureaucrats, professors, professionals, sometimes a retired judge). Har member independently marks deta hai — average nikala jaata hai. Panel ko tumhara DAF (Detailed Application Form) milta hai — usme tumhara education, work experience, hobbies, home state, optional subject sab likha hota hai. Zyaadatar questions DAF se hi aate hain — isliye DAF bahut carefully bharo.',
          'State PSC panel: Chairman (PSC member) + 2-3 members (subject experts, bureaucrats). Panel ko tumhari application form milti hai. Marks: typically 30-40% current affairs, 20-30% personal questions, 20-30% subject/department knowledge, 10-20% communication aur personality. Tip: agar kisi question ka answer nahi aata toh honestly bolo "I am not sure about this, Sir/Madam." Galat answer dene se zyaada impression kharab hota hai honestly admit karne se. Panel tumhari honesty ko respect karta hai.',
        ],
      },
    ],
  },
  {
    slug: 'highest-paying-government-jobs-without-gate',
    title: 'Highest Paying Government Jobs Without GATE 2026 — बिना GATE सबसे ज्यादा सैलरी',
    description:
      'GATE exam ke bina sabse zyaada salary wali sarkari naukri ki complete list. UPSC IES, SSC JE, Railway JE, State Engineering Services, DRDO aur Defence civilian posts ka salary comparison.',
    readTime: '9 min read',
    category: 'Guide',
    categoryColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
    updated: '2026-10-24',
    body: [
      {
        paragraphs: [
          'GATE exam bahut tough hai — 9-10 lakh candidates mein se sirf top 15-20% qualify karte hain, aur PSU ke liye top 500-1000 rank chahiye. Lekin achhi baat yeh hai ki GATE ke bina bhi bahut saari high-paying engineering government jobs hain. UPSC IES, SSC JE, Railway JE, State AE — yeh sab direct recruitment exams hain jahan GATE score ki zaroorat nahi. Is article mein bina GATE ke milne wali sabse zyaada salary wali government engineering jobs hain.',
        ],
      },
      {
        heading: 'UPSC IES (Indian Engineering Services) — Rs 56,100 Starting',
        paragraphs: [
          'IES/ESE (Engineering Services Examination) UPSC conduct karti hai — yeh GATE se completely independent exam hai. IES clear karne pe Class 1 Gazetted Officer bante ho — starting Pay Level 10, basic Rs 56,100, in-hand Rs 70,000-85,000 (posting city pe depend). IES officers Railway, CPWD, MES, CWC, CGWB, Telecom mein top positions pe posted hote hain. 20 saal baad Superintending Engineer — Pay Level 13, basic Rs 1,18,500, in-hand Rs 2,00,000+.',
          'IES exam: Prelims (objective) — Paper 1: General Studies & Engineering Aptitude (200 marks), Paper 2: Engineering Discipline (300 marks). Mains (conventional) — two papers of 300 marks each — detailed engineering problems solve karne hote hain. Interview: 200 marks. Total 1300 marks. Branches: Civil, Mechanical, Electrical, Electronics & Telecom. Age limit: 21-30 years (OBC 33, SC/ST 35). Har saal roughly 500 vacancies. GATE se farak: IES mein General Studies bhi hai, interview bhi hai — sirf technical nahi.',
        ],
      },
      {
        heading: 'SSC JE (Junior Engineer) — Rs 35,400 Starting',
        paragraphs: [
          'SSC JE sabse popular non-GATE engineering exam hai. B.Tech ya Diploma holders eligible hain — GATE score ki zaroorat nahi. Posting: CPWD, CWC, BRO, MES, Farakka Barrage Project, CGWB mein. Pay Level 6 — basic Rs 35,400, in-hand Rs 42,000-48,000. Central Government benefits: DA, HRA, TA, medical (CGHS), LTC, children education allowance.',
          'SSC JE exam: Paper-1 (CBT) — 200 marks, 120 minutes. Three parts: General Intelligence & Reasoning (50 marks), General Awareness (50 marks), General Engineering (100 marks — Civil or Electrical or Mechanical). Paper-2 (Descriptive) — 300 marks, 120 minutes — detailed engineering questions. Cutoff (2024): Civil — 290/500, Electrical — 270/500, Mechanical — 260/500. Age limit: 18-32 years. Vacancies: 1,500-2,500 annually. Promotion: JE to AE (Pay Level 7, Rs 44,900) — 5-8 years, then Executive Engineer (Pay Level 10, Rs 56,100) — departmental exam se.',
        ],
      },
      {
        heading: 'Railway JE Direct Recruitment — Rs 35,400 Starting',
        paragraphs: [
          'RRB JE (Junior Engineer) recruitment bhi GATE ke bina hoti hai — direct CBT exam hota hai. Railway JE Pay Level 6 — basic Rs 35,400, in-hand Rs 40,000-45,000. Additional railway perks: free railway pass (self + family — unlimited AC 2-tier travel), railway quarter (subsidised rent), railway hospital (free medical), railway schools (subsidised education). Yeh perks ki monetary value Rs 15,000-20,000/month extra hai.',
          'RRB JE exam: CBT-1 (screening) — 100 questions, 90 minutes. Maths (30), GI & Reasoning (25), General Awareness (15), General Science (30). CBT-2 (selection) — 150 questions, 120 minutes. GA (15), Physics & Chemistry (15), Basics of Computer (10), Basics of Environment (10), Technical (100 — specific branch). Senior Section Engineer (SSE) bhi same exam se select hota hai — Pay Level 7, basic Rs 44,900, in-hand Rs 50,000-55,000. Har saal roughly 10,000-15,000 JE/SSE vacancies.',
        ],
      },
      {
        heading: 'State Engineering Services — Direct Recruitment',
        paragraphs: [
          'Har state apni Public Service Commission ke through Assistant Engineer (AE) aur Junior Engineer (JE) recruit karti hai — GATE score nahi chahiye (except kuch states jaise Karnataka, Tamil Nadu jo GATE score bhi accept karti hain alternatively). State AE salary: UP — Pay Level 10, Rs 56,100 basic. Maharashtra — Rs 41,800 basic. Rajasthan — Rs 36,200 basic. Bihar — Rs 35,400. Madhya Pradesh — Rs 36,200.',
          'State engineering services ka advantage: apne home state mein posting milti hai — Central services mein all-India transfer hota hai. Exam typically State PSC ke through hota hai — General Studies + Technical Subject. Kuch states (UP, MP, Rajasthan) mein Hindi mein exam hota hai jo Hindi medium students ke liye advantage hai. Promotion: JE to AE to Executive Engineer to SE to CE. State mein CE banna relatively easier hai compared to Central services — competition pool chhota hai.',
        ],
      },
      {
        heading: 'DRDO — Non-GATE Entry Options',
        paragraphs: [
          'DRDO mein GATE ke bina bhi entry possible hai — CEPTAM (Centre for Personnel Talent Management) exam ke through. DRDO CEPTAM Senior Technical Assistant (STA-B) — B.Tech holders ke liye, Pay Level 6, basic Rs 35,400, in-hand Rs 40,000-45,000. DRDO CEPTAM Technician A — Diploma/ITI holders ke liye, Pay Level 2, basic Rs 19,900.',
          'DRDO SET (Scientist Entry Test) bhi hai jo GATE independent hai — Scientist B position ke liye. Scientist B salary: Pay Level 10, basic Rs 56,100, in-hand Rs 65,000-75,000. DRDO SET mein written test + interview hota hai. Branches: CS, Electronics, Mechanical, Physics, Chemistry, Maths, Biology. DRDO mein 50+ labs hain — DRDL (missiles), LRDE (radar), CABS (airborne), NRL (naval), DMRL (materials). Research-oriented kaam hai — academic interest wale candidates ke liye ideal.',
        ],
      },
      {
        heading: 'Defence Civilian Posts & Salary Comparison Table',
        paragraphs: [
          'Defence Ministry ke under civilian posts bhi hoti hain — MES (Military Engineering Service), Defence Accounts, Ordnance Factory, Army HQ, Navy HQ, Air HQ mein. MES JE/AE: SSC JE ke through recruit hote hain — Pay Level 6-7. Defence Accounts: CDA offices mein Accountant/Auditor — SSC CGL se. Ordnance Factory: Chargeman (Pay Level 6, Rs 35,400), Industrial staff. Arsenal/EME workshops: Supervisor (Pay Level 6). Yeh sab GATE ke bina direct recruitment exams se bhare jaate hain.',
        ],
        bullets: [
          'UPSC IES: Pay Level 10, Basic Rs 56,100, In-hand Rs 70,000-85,000. Highest non-GATE engineering job. Exam: UPSC ESE.',
          'DRDO Scientist B: Pay Level 10, Basic Rs 56,100, In-hand Rs 65,000-75,000. Via DRDO SET exam.',
          'State AE (UP/Rajasthan): Pay Level 10, Basic Rs 56,100, In-hand Rs 60,000-75,000. Via State PSC.',
          'SSC JE: Pay Level 6, Basic Rs 35,400, In-hand Rs 42,000-48,000. Central Government posting.',
          'Railway JE: Pay Level 6, Basic Rs 35,400, In-hand Rs 40,000-45,000 + Railway perks worth Rs 15K-20K/month.',
          'Railway SSE: Pay Level 7, Basic Rs 44,900, In-hand Rs 50,000-55,000. Same RRB exam, higher grade.',
          'MES JE: Pay Level 6, Basic Rs 35,400, In-hand Rs 42,000-48,000. Defence posting, via SSC JE.',
          'DRDO STA-B: Pay Level 6, Basic Rs 35,400, In-hand Rs 40,000-45,000. Via DRDO CEPTAM.',
          'Ordnance Factory Chargeman: Pay Level 6, Basic Rs 35,400, In-hand Rs 38,000-42,000. Direct recruitment exam.',
        ],
      },
    ],
  },
  // ── NEW ARTICLES (Deep Research) ──
  {
    slug: 'gate-score-government-jobs-psu',
    title: 'GATE Score Se Government Jobs & PSU Recruitment 2026-27',
    description: 'Complete guide on how GATE score helps in PSU recruitment (ONGC, BHEL, IOCL, NTPC, GAIL) and M.Tech admission. Cutoff, salary, and application process.',
    readTime: '10 min read', category: 'Engineering', categoryColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300', updated: '2026-10-25',
    body: [
      { paragraphs: ['GATE (Graduate Aptitude Test in Engineering) is not just for M.Tech admission. It is the gateway to some of India\'s highest-paying government jobs in PSUs (Public Sector Undertakings). With a valid GATE score, you can apply to 100+ PSUs with starting salary of Rs 40,000-60,000+ per month.'] },
      { heading: 'Top PSUs Recruiting Through GATE', bullets: ['ONGC: Pay Level 10, Starting Rs 60,000-80,000. Petroleum engineer most sought after.', 'BHEL: Pay Level 8, Starting Rs 50,000-65,000. Mechanical, Electrical, Electronics branches.', 'IOCL: Pay Level 10, Starting Rs 55,000-75,000. Chemical, Mechanical engineers preferred.', 'NTPC: Pay Level 8, Starting Rs 50,000-70,000. Electrical, Mechanical branches.', 'GAIL: Pay Level 10, Starting Rs 55,000-75,000. Chemical, Mechanical, Instrumentation.', 'PGCIL (Power Grid): Pay Level 8, Starting Rs 50,000-65,000. Electrical engineers.', 'BARC: OCES/DGFS through GATE. Nuclear engineering and research positions.'] },
      { heading: 'GATE Score Cutoff for PSUs (General Category)', bullets: ['ONGC: 65-75+ GATE score typically required', 'IOCL: 60-70+ GATE score', 'NTPC: 55-65+ GATE score', 'BHEL: 50-60+ GATE score', 'PGCIL: 55-65+ GATE score', 'Note: Cutoffs vary by branch and year. CS/IT and Mechanical typically have higher cutoffs.'] },
      { heading: 'Salary Comparison: PSU vs Private Sector', bullets: ['PSU Engineer (Entry): Rs 50,000-80,000/month + HRA + DA + perks = Rs 12-18 LPA CTC', 'Private IT (Entry): Rs 30,000-50,000/month = Rs 4-8 LPA CTC', 'PSU perks include: Medical (lifetime), LTC, Housing, Subsidized canteen, Job security, Pension', 'After 5 years: PSU salary doubles to Rs 1,00,000-1,50,000/month with increments and promotions'] },
      { heading: 'How to Prepare for GATE', bullets: ['Start 8-10 months before the exam. Focus on core subjects of your branch.', 'Engineering Mathematics and General Aptitude are common across all branches (15% weightage).', 'Solve previous 20 years\' GATE papers. Most questions are variations of past patterns.', 'Take at least 20 full-length mock tests in the last 2 months.', 'Books: Subject-specific standard textbooks + Made Easy / ACE Academy notes.'] },
    ],
  },
  {
    slug: 'mental-health-tips-competitive-exam-preparation',
    title: 'Mental Health During Competitive Exam Preparation — मानसिक स्वास्थ्य गाइड',
    description: 'How to manage stress, anxiety, and burnout while preparing for government exams. Practical tips for mental wellness during UPSC, SSC, Banking exam preparation.',
    readTime: '7 min read', category: 'Guide', categoryColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300', updated: '2026-10-25',
    body: [
      { paragraphs: ['Competitive exam preparation is a marathon, not a sprint. The average UPSC aspirant prepares for 2-3 years, SSC candidates often give 3-4 attempts, and banking aspirants juggle multiple exams simultaneously. During this journey, mental health often takes a backseat — but it should be your top priority.'] },
      { heading: 'Recognizing Burnout Early', bullets: ['Constant fatigue even after sleeping 7-8 hours', 'Unable to concentrate for more than 30 minutes at a stretch', 'Loss of interest in subjects you once enjoyed', 'Comparing yourself excessively with others (especially on social media)', 'Physical symptoms: headaches, stomach issues, sleep disturbance', 'If you experience 3+ of these for more than 2 weeks, take a planned break.'] },
      { heading: 'Daily Habits That Protect Mental Health', bullets: ['Exercise 30 minutes daily — even a brisk walk releases endorphins and improves memory retention.', 'Sleep 7-8 hours. Do NOT sacrifice sleep for extra study hours. Sleep consolidates memory.', 'Limit social media to 20 minutes. Unfollow accounts that trigger comparison anxiety.', 'Talk to family/friends daily. Isolation worsens anxiety. Even a 10-minute phone call helps.', 'Practice 5-minute deep breathing before starting your study session.', 'Keep a "Done List" instead of a "To-Do List" — it shows progress and builds confidence.'] },
      { heading: 'Dealing with Exam Failure', bullets: ['Failure is data, not a verdict. Analyze what went wrong: was it preparation, time management, or exam-day stress?', 'Most toppers failed multiple times. UPSC topper Tina Dabi cleared in 1st attempt but many IAS officers cleared after 3-5 attempts.', 'Set a limit: decide in advance how many attempts you will give. This reduces open-ended anxiety.', 'Have a Plan B. It is not a sign of weakness — it actually reduces pressure and improves performance.', 'Consider talking to a counselor. Many government schemes provide free mental health counseling.'] },
      { heading: 'Kab break lein?', bullets: ['Har 50 minute study ke baad 10 minute break lein (Pomodoro technique).', 'Weekly off rakhein — Sunday ko padhai se chutti. Movies dekhein, dost se milein, ghumein.', 'Agar 3 hafte se zyada burnout feel ho raha hai toh 1 week ka complete break lein.', 'Exam ke 1 din pehle naya topic mat padhein. Revision karein aur relax rahein.', 'Yaad rakhein: healthy mind = better performance. Apna khayal rakhna kamzori nahi, samajhdaari hai.'] },
    ],
  },
  {
    slug: 'state-pcs-vs-upsc-which-to-choose',
    title: 'State PCS vs UPSC CSE — Which Should You Choose?',
    description: 'Detailed comparison of State PCS exams (UPPSC, BPSC, MPPSC, RPSC) vs UPSC Civil Services. Difficulty, salary, posting, preparation strategy compared.',
    readTime: '9 min read', category: 'Comparison', categoryColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300', updated: '2026-10-25',
    body: [
      { paragraphs: ['Should you aim for UPSC CSE or State PCS? This is the most common dilemma for civil services aspirants. The answer depends on your goals, age, financial situation, and risk appetite. Let\'s break it down objectively.'] },
      { heading: 'Competition Level', bullets: ['UPSC CSE: 10-12 lakh applicants, ~1000 vacancies. Success rate: ~0.1%', 'UPPSC PCS: 6-8 lakh applicants, ~400-600 vacancies. Success rate: ~0.08%', 'BPSC: 4-5 lakh applicants, ~500-800 vacancies. Success rate: ~0.15%', 'MPPSC: 3-4 lakh applicants, ~200-400 vacancies. Success rate: ~0.1%', 'RPSC RAS: 2-3 lakh applicants, ~200-300 vacancies. Success rate: ~0.1%', 'Surprise: State PCS competition is almost as tough as UPSC for top posts!'] },
      { heading: 'Salary and Perks Comparison', bullets: ['IAS (UPSC): Pay Level 10, Starting ~Rs 56,100 + DA/HRA = Rs 80,000-1,00,000. Reaches Rs 2,50,000 as Secretary.', 'SDM via State PCS: Pay Level 10, Starting ~Rs 56,100 + DA/HRA = Rs 80,000-1,00,000. Same starting salary!', 'Key difference: IAS officers get central government perks and can reach Cabinet Secretary level.', 'State PCS officers get state-specific perks and can reach Principal Secretary/Chief Secretary level.', 'Both get: Government bungalow, vehicle, staff, medical, LTC, pension.'] },
      { heading: 'Strategic Approach', bullets: ['If you are 22-25 with strong academics: Attempt UPSC first while simultaneously preparing for State PCS.', 'If you are 28+ with limited attempts: Focus on State PCS as primary and UPSC as secondary.', 'If you want to serve a specific state: State PCS gives guaranteed posting in your home state.', 'If you want all-India service exposure: Only UPSC gives IAS/IPS/IFS with pan-India postings.', '70% of UPSC syllabus overlaps with State PCS. Preparing for one automatically covers the other.', 'Smart strategy: Give UPSC Prelims + State PCS together. Same preparation covers both.'] },
    ],
  },
  {
    slug: 'sebi-grade-a-preparation-guide',
    title: 'SEBI Grade A Officer Exam — Complete Preparation Guide 2026',
    description: 'How to prepare for SEBI Grade A exam. Salary (Rs 18 LPA+), syllabus, exam pattern, books, and strategy for General, Legal, IT, and Official streams.',
    readTime: '8 min read', category: 'Banking', categoryColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300', updated: '2026-10-25',
    body: [
      { paragraphs: ['SEBI Grade A is one of the highest-paying government exams in India. With an in-hand salary of Rs 1,00,000+ per month (CTC ~Rs 18-20 LPA), it rivals RBI Grade B and is significantly better than banking PO posts. Yet, fewer aspirants target it, making it a strategic opportunity.'] },
      { heading: 'Exam Pattern', bullets: ['Phase 1 (Screening): 100 questions, 120 minutes. GK + English + Quantitative + Reasoning (same as banking exams).', 'Phase 2 (Mains): 2 papers. Paper 1: Multiple choice on Commerce/Economics/Finance/Management. Paper 2: Descriptive (Essay + Comprehension + Precis).', 'Phase 3: Interview (if applicable for the stream).', 'Qualifying marks: General ~45-55%, OBC ~40-50% typically.'] },
      { heading: 'Salary Breakdown', bullets: ['Basic Pay: Rs 44,500 (Start of Grade A)', 'DA (55%): Rs 24,475', 'HRA (Metro): Rs 12,015', 'Other Allowances: Rs 15,000-20,000', 'Gross: Rs 95,000-1,00,000 per month', 'Deductions (NPS + Tax): ~Rs 15,000-20,000', 'In-hand: Rs 75,000-85,000+ (varies by city)', 'Perks: Medical (family), LTC, Housing Loan subsidy, Performance Bonus, Laptop, Mobile'] },
      { heading: 'Preparation Strategy', bullets: ['Phase 1 is similar to banking PO exams. If you are already preparing for IBPS/SBI PO, you are 60% prepared.', 'Phase 2 requires deep knowledge of capital markets, securities laws, SEBI regulations, economic survey.', 'Study SEBI Annual Report thoroughly — many questions come from recent regulatory changes.', 'Books: Sanjiv Verma\'s Economic Survey, SEBI Master Circulars, Mrunal.org notes for economics.', 'Practice descriptive writing: 1 essay + 1 precis daily for last 2 months.', 'Previous year papers are freely available on sebi.gov.in — solve all of them.'] },
    ],
  },
  {
    slug: 'rbi-grade-b-vs-sebi-grade-a-comparison',
    title: 'RBI Grade B vs SEBI Grade A — Which Is Better?',
    description: 'Comprehensive comparison of RBI Grade B and SEBI Grade A officer exams. Salary, perks, career growth, exam difficulty, and which to target in 2026.',
    readTime: '7 min read', category: 'Comparison', categoryColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300', updated: '2026-10-25',
    body: [
      { paragraphs: ['RBI Grade B and SEBI Grade A are India\'s two most coveted regulatory body exams. Both offer exceptional salary, job security, and prestige. But which one should you target? Let\'s compare them head-to-head.'] },
      { heading: 'Salary Comparison (2026)', bullets: ['RBI Grade B: In-hand Rs 90,000-1,05,000/month. CTC: Rs 20-22 LPA. Residential quarters in metro cities.', 'SEBI Grade A: In-hand Rs 75,000-85,000/month. CTC: Rs 18-20 LPA.', 'After 4 years: RBI Grade C = Rs 1,30,000-1,50,000. SEBI Grade B = Rs 1,10,000-1,30,000.', 'RBI wins on salary, but SEBI has faster promotions and better work-life balance.'] },
      { heading: 'Exam Difficulty', bullets: ['RBI Grade B: Phase 1 (Objective, 200 marks) + Phase 2 (3 papers: Economics/Social Issues/Finance + Descriptive English + Finance & Management). Very tough Phase 2.', 'SEBI Grade A: Phase 1 (Screening) + Phase 2 (MCQ + Descriptive on Commerce/Economics). Relatively easier Phase 2.', 'Competition: RBI gets 5-8 lakh applicants for 200-300 posts. SEBI gets 1-2 lakh for 100-150 posts.', 'If you are strong in economics and writing: Target RBI Grade B.', 'If you are a commerce/finance graduate: SEBI Grade A may suit you better.'] },
      { heading: 'Career Growth & Perks', bullets: ['RBI: Grade B → Grade C → Grade D → CGM → ED → Deputy Governor → Governor. Supreme prestige.', 'SEBI: Grade A → B → C → D → ED → Whole-Time Member → Chairman.', 'RBI provides quarters in prime locations (Mumbai, Delhi, etc.). SEBI HQ is in Mumbai.', 'Both provide: Car facility at senior levels, Medical for lifetime, Study leave, Deputation to IMF/World Bank.', 'RBI is considered more prestigious but SEBI offers better work-life balance and modern work culture.'] },
    ],
  },
  {
    slug: 'nabard-grade-a-preparation-strategy',
    title: 'NABARD Grade A Exam Preparation Strategy 2026',
    description: 'Complete guide to crack NABARD Grade A (Development Manager). Syllabus, books, salary (Rs 44,500 basic), exam pattern, and month-wise study plan.',
    readTime: '8 min read', category: 'Banking', categoryColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300', updated: '2026-10-25',
    body: [
      { paragraphs: ['NABARD Grade A (Assistant Manager / Development Manager) is a premium government job that most aspirants overlook. With basic pay of Rs 44,500 and in-hand salary of Rs 65,000-75,000, it offers RBI-equivalent compensation with a focus on rural development and agriculture finance.'] },
      { heading: 'Why NABARD Grade A?', bullets: ['Salary: Basic Rs 44,500 + DA + HRA = In-hand Rs 65,000-75,000/month. CTC Rs 14-16 LPA.', 'Perks: Medical, LTC, Leased Housing, Vehicle Loan, Study Leave, Deputation opportunities.', 'Lower competition than RBI/SEBI. Typically 3-5 lakh applicants for 150-200 posts.', 'Rural development focus — meaningful work that directly impacts farmers and villages.', 'Posting: NABARD regional offices across India. Not restricted to metro cities.'] },
      { heading: 'Exam Pattern', bullets: ['Prelims: 200 questions, 200 marks, 120 minutes. Economic & Social Issues (40q) + Agriculture & Rural Dev (40q) + Reasoning (20q) + English (20q) + Computer (20q) + Quantitative (20q) + General Awareness (20q) + Decision Making (20q).', 'Mains (Phase 2): Paper 1 — Economic & Social Issues + Rural Dev (100 marks, descriptive). Paper 2 — Agriculture/Finance/Economics (100 marks, descriptive).', 'Interview: 25 marks.', 'Total: Mains + Interview = 225 marks.'] },
      { heading: 'Preparation Strategy', bullets: ['Unique part: Agriculture & Rural Development — study from NABARD Annual Report + Economic Survey Chapter on Agriculture.', 'Economic & Social Issues: Same as RBI Grade B. Study Sanjiv Verma, Mrunal lectures.', 'Reasoning/English/Quant: Banking PO level. If you prepare for IBPS PO, you are covered.', 'Special focus: Microfinance, SHGs, NRLM, PM-KISAN, Cooperative Banking, Crop Insurance.', 'Study NABARD website thoroughly: schemes, reports, publications.', 'Timeline: 4-6 months dedicated preparation sufficient if banking base is strong.'] },
    ],
  },
  {
    slug: 'time-management-competitive-exams-working-professionals',
    title: 'Time Management for Working Professionals Preparing for Government Exams',
    description: 'How to prepare for SSC, Banking, UPSC exams while doing a full-time job. Practical daily schedule, weekend strategy, and resource optimization.',
    readTime: '8 min read', category: 'Strategy', categoryColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300', updated: '2026-10-25',
    body: [
      { paragraphs: ['30% of government exam aspirants are working professionals. They face a unique challenge: limited study hours, mental fatigue after work, and no coaching classes during weekdays. But many toppers were working professionals too. The key is smart time management, not more hours.'] },
      { heading: 'The 3-3-1 Daily Formula', bullets: ['3 hours morning (5:00 AM - 8:00 AM): This is your golden time. Brain is fresh, no distractions. Use for new topics, conceptual study, and difficult subjects.', '3 hours evening (8:00 PM - 11:00 PM): Revision, practice questions, and mock tests. Avoid new heavy topics at night.', '1 hour during commute/lunch: Listen to podcasts (current affairs, GK), read short notes on phone, revise flashcards.', 'Total: 7 hours/day on weekdays. This is equivalent to a full-time aspirant studying 10 hours (because quality > quantity).'] },
      { heading: 'Weekend Strategy', bullets: ['Saturday: Full mock test (3 hours) + Analysis (2 hours) + Current affairs weekly revision (2 hours) = 7 hours.', 'Sunday: Weak area practice (3 hours) + New topic (3 hours) + Relaxation/family time (rest of day).', 'Do NOT try to study 15 hours on weekends. Burnout will ruin your Monday performance at work.', 'One weekend per month: Complete revision of all notes made during the month.'] },
      { heading: 'Smart Shortcuts for Working Professionals', bullets: ['Use app-based learning: Testbook, Adda247, Oliveboard — take quizzes during short breaks.', 'PDF notes > Physical books. Read on phone during commute.', 'Subscribe to 1 good YouTube channel per subject instead of 5 different ones.', 'Use weekends for mocks, weekdays for topic-wise study. Never mix both.', 'Target exams strategically: Prepare for SSC CGL + IBPS PO together (70% syllabus overlap).', 'If your job is IT/private sector, consider GATE for PSU — you already have the engineering base.', 'Most important: Set a deadline. If you cannot clear in 2-3 attempts while working, re-evaluate — either go full-time or accept current career.'] },
    ],
  },
  {
    slug: 'nda-preparation-complete-guide',
    title: 'NDA Preparation Complete Guide 2026 — How to Crack NDA in First Attempt',
    description: 'Complete NDA preparation strategy including Mathematics, GAT syllabus, physical fitness requirements, SSB interview tips, and recommended books for NDA 2026.',
    category: 'Defence',
    categoryColor: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300',
    readTime: '14 min read',
    updated: '2026-10-25',
    body: [
      { heading: 'Why NDA is the Best Career Entry Point', paragraphs: ['National Defence Academy (NDA) is the joint services academy of Indian Armed Forces, training cadets for Army, Navy, and Air Force simultaneously. Entry at 16.5-19.5 years after 12th makes it the youngest and most prestigious route into defence services.', 'NDA graduates get a degree from JNU while training at Khadakwasla, Pune. The career offers unmatched adventure, respect, and benefits.'] },
      { heading: 'NDA Exam Pattern', bullets: ['Paper I: Mathematics — 300 marks, 120 questions, 2.5 hours. Class 11-12 level math.', 'Paper II: General Ability Test (GAT) — 600 marks, 150 questions, 2.5 hours. English (200) + GK (400).', 'Total: 900 marks written + SSB Interview (900 marks) = 1800 marks.', 'Negative marking: 1/3 of marks for wrong answers.', 'NDA exam conducted twice a year (April and September) by UPSC.'] },
      { heading: 'Mathematics Preparation Strategy', bullets: ['Focus areas: Algebra (30%), Trigonometry (20%), Calculus (15%), Vectors & 3D (10%), Statistics (10%).', 'NCERT Class 11-12 Mathematics is the base. Complete it first.', 'Pathfinder NDA by Arihant is the bible for NDA math preparation.', 'Practice previous year papers (last 10 years) — patterns repeat significantly.', 'Speed matters: You need to solve 120 questions in 150 minutes = 75 seconds per question.', 'Focus on shortcut methods for Trigonometry, Integration, and Matrices.'] },
      { heading: 'GAT (General Ability Test) Strategy', bullets: ['English (200 marks): Grammar, vocabulary, comprehension, usage. Wren & Martin + newspaper reading daily.', 'Physics + Chemistry (160 marks combined): NCERT Class 11-12 level. Focus on numerical-based questions.', 'General Knowledge (240 marks): History, Geography, Current Affairs, Defence-specific GK.', 'For GK, focus on: Indian freedom struggle, World Geography, Indian Constitution, Defence current affairs.', 'Read newspapers daily (The Hindu/Indian Express). Make notes on defence-related news.'] },
      { heading: 'SSB Interview Preparation', bullets: ['SSB is 5 days: Screening (Day 1), Psychological Tests (Day 2), GTO Tasks (Day 3-4), Interview (Day 5).', 'OLQ (Officer Like Qualities): Effective Intelligence, Social Adaptability, Dynamic Qualities, Organizing Ability.', 'Start preparing from Day 1 of NDA preparation. Join a local SSB coaching if possible.', 'Practice group discussions, outdoor activities, and public speaking regularly.', 'Physical fitness is crucial: Running, push-ups, sit-ups, chin-ups should be daily routine.', 'Read "Let\'s Crack SSB" by Arihant for comprehensive SSB preparation.'] },
      { heading: 'Physical Fitness Requirements', bullets: ['1.6 km run in under 6 minutes 30 seconds.', 'Minimum height: 157 cm (Army), 157 cm (Navy), 162.5 cm (Air Force).', 'Vision: 6/6 for Air Force, 6/6-6/12 for Navy, 6/6-6/18 for Army.', 'Daily routine: Morning run (5 km), 50 push-ups, 50 sit-ups, 10 chin-ups.', 'Start fitness training at least 6 months before SSB date.'] },
    ],
  },
  {
    slug: 'ssc-je-preparation-strategy',
    title: 'SSC JE Preparation Strategy 2026 — Civil, Mechanical, Electrical Engineering',
    description: 'Complete SSC JE preparation guide for Civil, Mechanical, Electrical engineering with syllabus analysis, paper pattern, cutoff trends, and best books.',
    category: 'SSC',
    categoryColor: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300',
    readTime: '12 min read',
    updated: '2026-10-25',
    body: [
      { heading: 'SSC JE Exam Overview', bullets: ['Paper I (Computer Based): 200 marks, 200 questions, 2 hours. GI+Reasoning (50) + GA (50) + Technical (100).', 'Paper II (Descriptive): 300 marks, Conventional type, 2 hours. Purely technical.', 'Minimum qualifying marks: 30% (UR), 25% (OBC/EWS), 20% (SC/ST/PwD).', 'Posts: Junior Engineer in CPWD, CWC, MES, and other central departments.', 'Salary: Level 6 (₹35,400-1,12,400). In-hand: ₹45,000-55,000 approximately.'] },
      { heading: 'Paper I General Strategy', bullets: ['Reasoning (50 marks): Standard SSC level — Analogies, Series, Coding, Matrix, Blood Relations. Score 40+.', 'General Awareness (50 marks): Current affairs (30%) + Static GK (30%) + Basic Science (40%). Target 35+.', 'Technical (100 marks): This decides your selection. Focus maximum time here.', 'Time management: Reasoning (25 min) → GA (20 min) → Technical (75 min).'] },
      { heading: 'Civil Engineering Focus Areas', bullets: ['Building Materials: Cement types, Steel grades, Timber, Bricks — 8-10 questions.', 'Surveying: Chain surveying, Compass, Levelling, Theodolite — 6-8 questions.', 'Soil Mechanics: Soil classification, Bearing capacity, Consolidation — 6-8 questions.', 'RCC & Steel Structures: Design basics, Working stress method — 8-10 questions.', 'Fluid Mechanics: Bernoulli, Open channel flow, Pipe flow — 5-7 questions.', 'Highway & Transportation: CBR, Pavement design, Traffic — 5-6 questions.', 'Environmental Engineering: Water treatment, Sewage treatment, BOD/COD — 5-7 questions.'] },
      { heading: 'Best Books for SSC JE', bullets: ['Civil: R.S. Khurmi (all civil subjects), B.C. Punmia (Surveying, Soil Mechanics).', 'Mechanical: R.K. Jain (Mechanical Engg), R.S. Khurmi (Strength of Materials, Thermodynamics).', 'Electrical: B.L. Theraja (Electrical Technology), V.K. Mehta (Power Systems).', 'All branches: Kiran SSC JE Previous Year Papers, Made Easy SSC JE book.', 'For Paper II: Practice conventional question solving from university textbooks.'] },
    ],
  },
  {
    slug: 'reasoning-shortcuts-competitive-exams',
    title: 'Reasoning Shortcuts & Tricks for Competitive Exams — Score 45+ in 25 Minutes',
    description: 'Master reasoning shortcuts for SSC, Banking, Railway exams. Learn quick tricks for Blood Relations, Coding-Decoding, Syllogism, Seating Arrangement, and more.',
    category: 'Preparation',
    categoryColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
    readTime: '11 min read',
    updated: '2026-10-25',
    body: [
      { heading: 'Why Reasoning is the Game Changer', paragraphs: ['In SSC CGL, Banking, and Railway exams, Reasoning carries 25-35% of total marks. Unlike GK which needs memorization, reasoning is pure logic — once you learn the tricks, you can score 90%+ consistently.', 'Most students waste time on reasoning because they solve every question from scratch. Smart students use patterns and shortcuts.'] },
      { heading: 'Blood Relations — The Family Tree Method', bullets: ['Draw a family tree diagram FIRST. Never try to solve in your head.', 'Males at top/left with (+), Females at bottom/right with (-).', 'Key relationship codes: $ = father, # = mother, @ = brother, * = sister.', 'For coded blood relations: Decode the relationship first, then draw the tree.', 'Practice tip: Solve 10 blood relation questions daily for 1 week — you will never get them wrong again.'] },
      { heading: 'Coding-Decoding — Pattern Recognition', bullets: ['Type 1 (Letter shift): Check if each letter shifts by same number (+1, +2, -3). Apply same shift to answer.', 'Type 2 (Reverse order): COME = EMOC type. Reverse each word.', 'Type 3 (Position-based): A=1, B=2... Z=26. Convert letters to numbers, find the pattern.', 'Type 4 (Symbol-based): Map symbols to operations. Write it down systematically.', 'Speed trick: In exams, check options first. Sometimes only one option has the right pattern.'] },
      { heading: 'Syllogism — Venn Diagram Method', bullets: ['Draw Venn diagrams for ALL statements. Never try to solve mentally.', 'All A are B = A circle completely inside B circle.', 'Some A are B = A and B circles overlap partially.', 'No A is B = A and B circles completely separate.', 'Key rule: Particular + Particular = No conclusion. Universal + Particular = Particular conclusion.', 'For "Either I or II follows": Check if I and II are complementary (one positive, one negative of the same relationship).'] },
      { heading: 'Seating Arrangement — The Grid Method', bullets: ['Linear arrangement: Draw a horizontal line with positions. Mark fixed positions first.', 'Circular arrangement: Draw a circle with numbered positions. Fix one person and work around.', 'Start with definite clues (exact positions). Save conditional clues for later.', 'Use symbols: → (faces right), ← (faces left), ↑ (faces center), ↓ (faces outside).', 'For 8+ person arrangements: Use elimination. Fill what you know, use options to test rest.', 'Time limit: If stuck for more than 3 minutes on an arrangement puzzle, skip and return later.'] },
      { heading: 'Direction Sense — The Compass Trick', bullets: ['Always draw a compass (N-E-S-W) on your rough sheet before starting.', 'Left turn from North = West. Right turn from North = East.', 'Opposite: N↔S, E↔W, NE↔SW, NW↔SE.', 'For distance problems: Plot movements on a grid. Use Pythagoras theorem for final distance.', 'Shadow trick: Morning shadow = West (sun in East). Evening shadow = East (sun in West).'] },
    ],
  },
  {
    slug: 'quantitative-aptitude-tricks-banking-ssc',
    title: 'Quantitative Aptitude Tricks for Banking & SSC — Speed Math Techniques',
    description: 'Learn speed math techniques and shortcuts for Data Interpretation, Percentage, Profit-Loss, Time-Work, and Number Series for Banking and SSC exams.',
    category: 'Preparation',
    categoryColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
    readTime: '13 min read',
    updated: '2026-10-25',
    body: [
      { heading: 'Speed Math — The Foundation', bullets: ['Learn tables up to 30. This alone saves 2-3 minutes per exam.', 'Learn squares up to 30 and cubes up to 15. Frequently tested in simplification.', 'Percentage to fraction: 12.5% = 1/8, 16.67% = 1/6, 33.33% = 1/3, 37.5% = 3/8, 62.5% = 5/8.', 'Multiply by 11 trick: 36 × 11 = 3(3+6)6 = 396. For 2-digit numbers, sum middle digits.', 'Square of numbers ending in 5: 75² = 7×8 | 25 = 5625. (Multiply first digit by next, append 25).'] },
      { heading: 'Data Interpretation — The DI Dominator Strategy', bullets: ['DI carries 15-20 marks in banking exams. Master this to guarantee 15+ marks.', 'Step 1: Read the data carefully for 30-60 seconds before touching questions.', 'Step 2: Approximate! In DI, exact calculation is rarely needed. Round to nearest 5 or 10.', 'Step 3: Use fraction shortcuts. 1/4 of 840 ≈ 210. 1/3 of 960 ≈ 320.', 'For percentage change: (Difference/Base) × 100. Always use the old value as base.', 'For ratio-based DI: Convert all values to the same denominator first.', 'Time target: 5 DI questions in 8-10 minutes maximum.'] },
      { heading: 'Profit, Loss & Discount — One Formula Approach', bullets: ['Master formula: SP = CP × (100 ± P/L%) / 100.', 'Successive discount: Two discounts of a% and b% = (a + b - ab/100)%.', 'Markup × Discount = Profit: If markup 25% and discount 20%, profit = 25-20-(25×20/100) = 0%.', 'Dishonest shopkeeper: Uses 900g weight instead of 1000g. Profit = (100/900) × 100 = 11.11%.', 'Buy 3 Get 1 Free = 25% discount (you pay for 3, get value of 4).'] },
      { heading: 'Time & Work — LCM Method', bullets: ['LCM method is 10x faster than fraction method. Take LCM of days as total work.', 'Example: A does in 12 days, B in 15 days. LCM(12,15) = 60 units total work.', 'A per day = 60/12 = 5 units. B per day = 60/15 = 4 units. Together = 9 units/day.', 'Days together = 60/9 = 6.67 days. Done in seconds instead of minutes with fractions.', 'Pipes & Cisterns: Same logic. Filling pipe = positive work. Draining pipe = negative work.'] },
      { heading: 'Number Series — Pattern Recognition', bullets: ['Common patterns: +constant, ×constant, +increasing, ×increasing, alternating, nested.', 'First check: Differences between consecutive terms. If constant = Arithmetic series.', 'Second check: Ratios between consecutive terms. If constant = Geometric series.', 'Third check: Differences of differences. If constant = Quadratic series.', 'For complex series: Check if it is a combination (e.g., ×2+1, ×2+3, ×2+5...).', 'Prime number series, square series, cube series — memorize first 20 of each.'] },
    ],
  },
  {
    slug: 'bpsc-preparation-complete-guide',
    title: 'BPSC Preparation Complete Guide 2026 — Bihar PCS Strategy, Syllabus & Books',
    description: 'Complete BPSC (Bihar Public Service Commission) preparation guide with Prelims-Mains strategy, Bihar-specific syllabus, best books, and previous year analysis.',
    category: 'State PSC',
    categoryColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
    readTime: '15 min read',
    updated: '2026-10-25',
    body: [
      { heading: 'Why BPSC is Special', paragraphs: ['BPSC (Bihar Public Service Commission) conducts one of the most competitive state civil service exams in India. With 3-4 lakh applicants for 500-800 posts, the competition is fierce but the reward — becoming an SDM, DSP, or BDO in Bihar — is immense.', 'Key difference from UPSC: BPSC has NO CSAT paper, NO optional subject in Prelims, and Hindi is compulsory in Mains. Bihar-specific content carries significant weightage.'] },
      { heading: 'BPSC Exam Pattern', bullets: ['Prelims: 1 paper, 150 questions, 150 marks, 2 hours. NO negative marking!', 'Mains: 4 papers — Hindi (qualifying), GS Paper 1 (300 marks), GS Paper 2 (300 marks), Optional (300 marks).', 'Interview: 120 marks. Total merit = Mains + Interview = 1020 marks.', 'Qualifying marks: Prelims cutoff varies (typically 80-95 for General category).', 'No negative marking in Prelims is a huge advantage — attempt all 150 questions!'] },
      { heading: 'Bihar-Specific Preparation', bullets: ['Bihar History: Magadha empire, Nalanda University, Bihar in freedom struggle, JP movement, Champaran Satyagraha.', 'Bihar Geography: Rivers (Ganga, Kosi, Son, Gandak), Floods, Soil types, Minerals, Agriculture.', 'Bihar Economy: Budget, GSDP, Agriculture (rice, wheat, litchi), Industries, Bihar\'s development schemes.', 'Bihar Polity: Panchayati Raj in Bihar, Bihar State Administration, Reservation policies.', 'Bihar Current Affairs: State government schemes, important appointments, Bihar awards.', 'Source: Bihar Darshan by Gyan Chand (best book for Bihar-specific content).'] },
      { heading: 'Best Books for BPSC', bullets: ['Prelims: Spectrum Modern India + Laxmikanth Polity + NCERT Geography (6-12) + Bihar Darshan.', 'Mains GS Paper 1: Indian History (Spectrum), Indian Geography (Majid Husain), Bihar GK (Bihar Darshan).', 'Mains GS Paper 2: Indian Polity (Laxmikanth), Indian Economy (Ramesh Singh), Science & Tech (TMH).', 'Hindi Paper: Regular newspaper reading in Hindi + essay practice in Hindi. This is qualifying only.', 'Optional: Choose based on your graduation subject. History, Geography, Political Science are popular choices.'] },
      { heading: 'Month-wise Strategy (6 Months Plan)', bullets: ['Month 1-2: Complete NCERT (Class 6-12) for History, Geography, Polity, Science. Simultaneously read Bihar Darshan.', 'Month 3: Standard reference books — Spectrum, Laxmikanth, Ramesh Singh. Make short notes.', 'Month 4: Bihar-specific content deep dive + Current affairs compilation (last 1 year).', 'Month 5: Previous year papers (last 10 years) + Mock tests (at least 20 full mocks).', 'Month 6: Revision of notes + Daily mock tests + Bihar current affairs revision.', 'Daily routine: 8-10 hours study. Bihar GK 2 hours + GS 4 hours + Current Affairs 1 hour + Mock/Revision 2 hours.'] },
    ],
  },
  {
    slug: 'uppsc-pcs-preparation-guide',
    title: 'UPPSC PCS Preparation Guide 2026 — UP Civil Services Strategy & Syllabus',
    description: 'Complete UPPSC PCS preparation strategy with UP-specific syllabus, Prelims-Mains approach, best books, and cutoff analysis for UP state civil services.',
    category: 'State PSC',
    categoryColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
    readTime: '14 min read',
    updated: '2026-10-25',
    body: [
      { heading: 'UPPSC PCS Overview', paragraphs: ['UPPSC (Uttar Pradesh Public Service Commission) PCS is one of the most sought-after state civil service exams. Posts include SDM, DSP, BDO, District Excise Officer, and more. With UP being the most populous state, the competition is extremely high — 6-8 lakh applicants for 400-600 posts.'] },
      { heading: 'Exam Pattern', bullets: ['Prelims: Paper 1 (GS) — 150 questions, 200 marks, 2 hours. Paper 2 (CSAT) — 100 questions, 200 marks, 2 hours (qualifying).', 'Mains: 8 papers. GS-I to GS-IV (200 marks each), Essay (3 essays in Hindi), Hindi & English (compulsory, qualifying), Optional (2 papers, 200 marks each).', 'Interview: 100 marks. Total merit = Mains (1500) + Interview (100) = 1600 marks.', 'Negative marking: 1/3 of marks in Prelims.', 'UPPSC unique feature: Hindi is mandatory. Essay must be written in Hindi only.'] },
      { heading: 'UP-Specific Content (Critical for Success)', bullets: ['UP History: Awadh, Lucknow Nawabs, 1857 Revolt (Meerut, Kanpur, Jhansi), UP in freedom movement.', 'UP Geography: Gangetic plain, Terai, Bundelkhand, Rivers, Agriculture patterns, Climate.', 'UP Economy: UP Budget, Industrial corridors (Noida, Lucknow), UP tourism, Agriculture (sugarcane, wheat, rice).', 'UP Government Schemes: One District One Product (ODOP), UP Kisan Kalyan Mission, CM Kanya Sumangala Yojana.', 'UP Current Affairs: State government decisions, infrastructure projects, appointments, awards.'] },
      { heading: 'Best Books', bullets: ['UP GK: UP Special by Pariksha Vani (must-have), UP GK by Lekhpal series.', 'General Studies: Same as UPSC — Spectrum, Laxmikanth, Ramesh Singh, Shankar IAS Environment.', 'Hindi: Lucent Hindi Grammar + Daily Hindi newspaper reading (Dainik Jagran, Amar Ujala).', 'Essay Practice: Write 1 essay per week in Hindi. Topics: social issues, UP development, national issues.', 'Previous Years: Last 10 years solved papers are essential. Patterns repeat significantly.'] },
    ],
  },
  {
    slug: 'career-progression-government-jobs',
    title: 'Career Progression in Government Jobs — From Constable to DGP, Clerk to GM',
    description: 'Complete guide to career progression and promotion timelines in government jobs across Police, Banking, SSC, Railway, and Defence services.',
    category: 'Career',
    categoryColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
    readTime: '12 min read',
    updated: '2026-10-25',
    body: [
      { heading: 'Police Career Progression', bullets: ['Constable → Head Constable (8-10 years) → ASI (12-15 years) → SI (departmental exam/15-20 years) → Inspector (20-25 years).', 'Direct SI entry: SI → Inspector (5-7 years) → DSP (departmental exam) → SP (IPS or promotion).', 'IPS entry: ASP → SP → DIG → IG → ADG → DGP. Fastest track to top.', 'State PCS (DSP): DSP → ASP → SP → DIG → IG (can reach IG level on promotion).', 'Key insight: Direct entry at higher level means faster promotions. Constable to Inspector takes 20+ years, but direct SI to Inspector takes 5-7 years.'] },
      { heading: 'Banking Career Progression', bullets: ['IBPS Clerk: Clerk (Scale I) → Officer (departmental exam, 5-7 years) → Branch Manager → Regional Manager.', 'IBPS PO: PO (Scale I) → Senior Officer (Scale II, 3-5 years) → Chief Manager (Scale III) → AGM → DGM → GM.', 'SBI PO: Probationary Officer → Manager → Chief Manager → AGM → DGM → GM → CGM → MD → Chairman.', 'RBI Grade B: Grade B Officer → Grade C (AD) → Grade D (Director) → Grade E (CGM) → Grade F (ED) → Governor/Deputy Governor.', 'Time to top: PO to GM typically takes 20-25 years. Clerk to branch manager can take 15-20 years.'] },
      { heading: 'SSC Career Progression', bullets: ['SSC MTS: MTS → UDC (departmental, 5-7 years) → Head Clerk → Superintendent.', 'SSC CHSL: LDC → UDC (3-5 years) → Superintendent → AD (Administrative Officer level).', 'SSC CGL: Tax Assistant → Inspector (5-7 years) → Superintendent (10-12 years) → Assistant Commissioner (15-18 years) → Commissioner.', 'SSC CGL (Audit): Auditor → Senior Auditor → AAO → AO → Group Officer.', 'Best SSC CGL post for promotion: Inspector (Examiner) in CBDT/CBIC — fastest promotion to Commissioner level.'] },
      { heading: 'Railway Career Progression', bullets: ['Group D: Trackman/Helper → Sr Technician → JE (departmental, 10-15 years).', 'ALP: Assistant Loco Pilot → Senior ALP → Loco Pilot (Goods) → Loco Pilot (Passenger) → Loco Pilot (Mail/Express) → Senior LP.', 'Station Master: ASM → SS → DSM → CH. SS → DRM (through LDCE exam).', 'RRB NTPC: Ticket Collector → Chief TC → Inspector → Senior Inspector.', 'Railway promotions are largely seniority-based. Departmental exams can accelerate promotion by 3-5 years.'] },
      { heading: 'Defence Career Progression', bullets: ['Agniveer (4 years): 25% retained as regular soldiers. Others get Seva Nidhi of ₹11.71 lakhs.', 'Soldier (Regular): Sepoy → Lance Naik → Naik → Havildar → Nb Subedar → Subedar → Subedar Major → Honorary Captain/Major.', 'Direct Officer (IMA/OTA): Lieutenant → Captain (2 years) → Major (6 years) → Lt Colonel (13 years) → Colonel → Brigadier → Major General.', 'NDA Officer: Same progression but enters as Lieutenant at age 21-22. Fastest promotion track.', 'Key: IMA graduates (via NDA/CDS) can become Lt General/General. Short Service Commission officers serve 10-14 years with option to convert to permanent.'] },
    ],
  },
  {
    slug: 'psu-jobs-through-gate-complete-list',
    title: 'PSU Jobs Through GATE 2026 — Complete List of 50+ PSUs Recruiting via GATE Score',
    description: 'Complete list of PSU companies recruiting through GATE score with salary packages, cutoff trends, and application process for GATE 2026 aspirants.',
    category: 'Engineering',
    categoryColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
    readTime: '11 min read',
    updated: '2026-10-25',
    body: [
      { heading: 'Why PSU Jobs Through GATE?', paragraphs: ['PSU (Public Sector Undertaking) jobs through GATE offer the best of both worlds: government job security with private sector-like salary. A fresh GATE qualifier can get ₹60,000-1,20,000 per month starting salary in Maharatna/Navratna PSUs. No interview stress — just GATE score + document verification in most cases.'] },
      { heading: 'Top Maharatna PSUs (Highest Pay)', bullets: ['NTPC: E2 grade, ₹50,000-1,60,000 pay scale. CTC: ₹15-18 LPA. Branches: EE, ME, ECE, Civil, Instrumentation.', 'ONGC: E1 grade, ₹60,000-1,80,000 pay scale. CTC: ₹18-22 LPA. Branches: ME, Petroleum, Chemical, EE, ECE, Geology.', 'IOCL: Graduate Apprentice → Officer. ₹50,000-1,60,000. CTC: ₹14-16 LPA. Branches: ME, Chemical, EE, Civil, Instrumentation.', 'BHEL: E1 grade, ₹40,000-1,40,000. CTC: ₹10-12 LPA. Branches: ME, EE, ECE, Civil, CS, Metallurgy.', 'GAIL: E2 grade, ₹60,000-1,80,000. CTC: ₹16-20 LPA. Branches: ME, Chemical, Instrumentation, EE, CS.', 'Coal India: E2 grade, ₹50,000-1,60,000. CTC: ₹14-18 LPA. Branches: Mining, ME, EE, Civil.', 'Power Grid: E2 grade, ₹50,000-1,60,000. CTC: ₹15-18 LPA. Branches: EE, ECE, Civil, CS.'] },
      { heading: 'Navratna PSUs', bullets: ['BPCL: ₹50,000-1,60,000. CTC: ₹14-16 LPA. ME, Chemical, EE, Instrumentation, CS.', 'HPCL: ₹50,000-1,60,000. CTC: ₹14-16 LPA. ME, Chemical, EE, Civil, Instrumentation.', 'BEL: ₹40,000-1,40,000. CTC: ₹10-14 LPA. ECE, EE, ME, CS.', 'NALCO: ₹40,000-1,40,000. CTC: ₹10-12 LPA. ME, EE, Chemical, Mining, Metallurgy.', 'MDL (Mazagon Dock): ₹40,000-1,40,000. CTC: ₹10-14 LPA. ME, EE, ECE, CS, Naval Architecture.', 'NLC: ₹50,000-1,60,000. CTC: ₹12-15 LPA. ME, EE, Mining, Civil, Instrumentation.'] },
      { heading: 'GATE Score Cutoff Trends', bullets: ['ONGC: General 700-750+, OBC 650-700+, SC 500-550+. (Out of 1000 GATE score).', 'NTPC: General 550-600+, OBC 500-550+, SC 400-450+.', 'IOCL: General 600-650+, OBC 550-600+, SC 450-500+.', 'BHEL: General 450-500+, OBC 400-450+, SC 350-400+.', 'Power Grid: General 600-650+, OBC 550-600+, SC 450-500+.', 'Tip: GATE score of 650+ opens doors to almost all Maharatna PSUs.'] },
      { heading: 'Application Process', bullets: ['Step 1: Appear for GATE exam (February every year). Valid for 3 years.', 'Step 2: PSU notifications come from March-August. Apply individually to each PSU.', 'Step 3: Shortlisting based on GATE score. No separate written test in most PSUs.', 'Step 4: GD + Interview (some PSUs like ONGC, IOCL). Document verification in others.', 'Step 5: Medical examination → Joining (typically within 3-6 months of result).', 'Pro tip: Apply to ALL PSUs you are eligible for. Multiple offers give negotiation power.'] },
    ],
  },
  {
    slug: 'physical-fitness-test-preparation-police-defence',
    title: 'Physical Fitness Test Preparation for Police & Defence — Complete Training Plan',
    description: 'Complete physical fitness training plan for police constable, SI, army, navy, and air force physical tests including running, push-ups, long jump, and medical standards.',
    category: 'Defence',
    categoryColor: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300',
    readTime: '13 min read',
    updated: '2026-10-25',
    body: [
      { heading: 'Standard Physical Tests Across Recruitments', bullets: ['Police Constable: 1600m run (Male: 5:30-6:00), 800m run (Female: 3:30-4:00), Long Jump (Male: 3.65m, Female: 2.70m), High Jump (Male: 1.20m, Female: 0.90m).', 'Police SI: Same as constable but stricter cutoffs. Additional: Shot Put in some states.', 'Army (Agniveer): 1600m run in 5:30, Pull-ups (minimum 6), 9-ft ditch jump, Balancing beam.', 'Navy: 1600m run in 7:00, 20 squats, Push-ups (minimum 12), Sit-ups (minimum 12).', 'Air Force: 1600m run in 6:30, Push-ups (minimum 10), Sit-ups (minimum 10), Chin-ups (minimum 3).', 'SSC GD Constable: 1600m in 5 minutes (Male), 800m in 3:30 (Female) at altitude adjusted times.'] },
      { heading: '12-Week Running Training Plan', bullets: ['Week 1-2: Walk/jog 2 km daily. Build base endurance. No sprinting yet.', 'Week 3-4: Jog 3 km daily at comfortable pace. Add 400m intervals (2 sets).', 'Week 5-6: Run 4 km daily. Add 800m intervals (3 sets with 2-min rest).', 'Week 7-8: Run 5 km daily. Practice 1600m time trial twice a week. Target: under 7 minutes.', 'Week 9-10: Increase speed. 1600m target: under 6 minutes. Add hill sprints if possible.', 'Week 11-12: Peak phase. 1600m target: under 5:30. Rest 2 days before actual test.', 'Key: Morning practice is best (5-6 AM). Drink water 30 minutes before running, not during.'] },
      { heading: 'Strength Training (Push-ups, Pull-ups, Squats)', bullets: ['Push-ups progression: Start with wall push-ups (Week 1) → Knee push-ups (Week 2-3) → Full push-ups (Week 4+).', 'Push-up target: 40+ (most exams require 15-25). Practice 5 sets of max reps daily.', 'Pull-ups: Dead hang (Week 1-2) → Assisted pull-ups (Week 3-4) → Full pull-ups (Week 5+).', 'Pull-up target: 10+ (Army requires 6 minimum). Practice 5 sets daily.', 'Squats: Start with bodyweight, 50 per day. Increase by 10 each week. Target: 100.', 'Long jump: Practice approach run + takeoff daily. Plyometric exercises (box jumps, frog jumps) help significantly.'] },
      { heading: 'Diet Plan for Physical Test Preparation', bullets: ['Morning (5 AM): 2 bananas + warm water with honey → Morning run.', 'Breakfast (7:30 AM): 4 eggs (2 whole + 2 whites) + 2 roti/bread + milk.', 'Lunch (1 PM): Dal + rice + sabzi + salad + curd. Protein-rich meals.', 'Evening snack (4 PM): Dry fruits (almonds, walnuts) + fruit + peanut butter bread.', 'Dinner (8 PM): Light — roti + dal/chicken + salad. No heavy food after 8 PM.', 'Supplements: Not necessary if diet is good. If needed: whey protein + multivitamin.', 'Avoid: Junk food, cold drinks, fried food, alcohol, tobacco. These directly affect stamina.'] },
      { heading: 'Common Mistakes to Avoid', bullets: ['Do NOT start training 1 week before the exam. Minimum 8-12 weeks needed.', 'Do NOT skip rest days. Your body needs recovery. Train 5 days, rest 2 days.', 'Do NOT practice only running. Include strength training for overall fitness.', 'Do NOT wear new shoes on exam day. Break in your running shoes 2-3 weeks before.', 'Do NOT eat heavy meal before the test. Light meal 2 hours before is ideal.', 'Hydrate well the day before. Dehydration is the #1 reason for poor performance.'] },
    ],
  },
  {
    slug: 'document-verification-government-jobs-complete-guide',
    title: 'Document Verification for Government Jobs — Complete Checklist & Common Rejections',
    description: 'Complete guide to document verification in government job recruitment with checklist of required documents, common rejection reasons, and how to prepare for DV.',
    category: 'Career',
    categoryColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
    readTime: '10 min read',
    updated: '2026-10-25',
    body: [
      { heading: 'Documents Required (Universal Checklist)', bullets: ['10th Marksheet + Certificate (for age proof — most important document).', '12th Marksheet + Certificate.', 'Graduation Degree + Marksheet (all semesters).', 'Post-graduation (if applicable) — for higher posts.', 'Caste Certificate (SC/ST/OBC-NCL): Must be latest. OBC-NCL needs renewal every year.', 'EWS Certificate: Valid for 1 year from issue date. Must be from the year of notification.', 'Domicile/Residence Certificate: For state-specific recruitment.', 'Aadhar Card + PAN Card.', '4-6 passport size photographs (same as used in application form).', 'Character Certificate from Police Station (not older than 6 months).', 'Medical Fitness Certificate (usually done on the day of DV or after).'] },
      { heading: 'Common Rejection Reasons', bullets: ['OBC-NCL certificate expired or from wrong financial year — #1 rejection reason.', 'Name mismatch between 10th certificate and graduation degree (e.g., after marriage).', 'Date of birth mismatch between documents and application form.', 'Missing original documents (photocopies not accepted at DV).', 'Caste certificate not from the home state (some exams require home state certificate).', 'EWS certificate issued after the cutoff date mentioned in notification.', 'Photo mismatch — recent photo vs application photo look very different.', 'Graduation percentage not meeting minimum criteria (especially for banking).'] },
      { heading: 'Pro Tips for Smooth DV', bullets: ['Make 3 sets of all photocopies. Self-attested. Arranged in order of notification checklist.', 'Carry the ORIGINAL notification/advertisement printout with you.', 'Reach the venue 1 hour early. Long queues are common.', 'Get your name corrected NOW if there is any mismatch between documents. Apply for affidavit + gazette notification.', 'For female candidates: If name changed after marriage, carry marriage certificate + gazette notification.', 'Download e-certificates from DigiLocker as backup.', 'If a document is lost: Get a duplicate from the issuing authority + FIR copy + affidavit.'] },
    ],
  },
  {
    slug: 'mppsc-preparation-complete-guide',
    title: 'MPPSC Preparation Strategy — Complete Guide for Prelims & Mains',
    description: 'Comprehensive MPPSC preparation guide covering Prelims, Mains, and Interview strategy with MP-specific focus areas and book recommendations.',
    category: 'State PSC',
    categoryColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300',
    readTime: '14 min read',
    updated: '2026-10-25',
    body: [
      { heading: 'MPPSC Exam Pattern Overview', bullets: ['Prelims: 2 papers — GS (200 marks, 100 Qs) + CSAT (200 marks, 100 Qs). Only GS counts for merit.', 'Mains: 6 papers — GS-I to GS-IV (300 marks each) + Hindi (200) + Hindi Essay (100). Total: 1400 marks.', 'Interview: 175 marks. Personality test focusing on general awareness and MP knowledge.', 'Final selection: Mains + Interview marks combined. Prelims is only qualifying.', 'MPPSC requires strong knowledge of MP history, geography, economy, and current affairs.'] },
      { heading: 'MP-Specific Focus Areas', bullets: ['MP History: Gond dynasty, Holkar dynasty, Scindias of Gwalior, Bhopal Nawabs, tribal revolts.', 'MP Geography: Narmada, Tapti, Chambal basins. Satpura-Vindhya ranges. Districts and divisions.', 'MP Economy: Agriculture (soybean, wheat), industries (Pithampur, Mandideep), tribal economy.', 'MP Art & Culture: Bhagoria festival, Korku dance, Gond paintings, Tansen music, Khajuraho.', 'MP Current Affairs: State government schemes, new districts, development projects, CM announcements.'] },
      { heading: 'Book Recommendations', bullets: ['MP General Studies: "MP ek Parichay" by Rajesh Mishra — bible for MP GK.', 'History: NCERT (class 6-12) + Spectrum Modern History + MP state history from local publishers.', 'Geography: NCERT + Orient Blackswan Atlas + MP geography by Mahesh Barnwal.', 'Indian Polity: M. Laxmikanth "Indian Polity" — essential for both Prelims and Mains.', 'Economy: Ramesh Singh "Indian Economy" + MP Economic Survey (yearly).', 'Current Affairs: "Pratiyogita Darpan" + "Samasamayiki Ghatna Chakra" monthly magazines.'] },
      { heading: '12-Month Study Plan', bullets: ['Month 1-3: Complete NCERTs (6-12) for History, Geography, Science, Polity. Build foundation.', 'Month 4-6: Read standard books — Laxmikanth, Spectrum, Ramesh Singh. Start MP-specific content.', 'Month 7-9: Current affairs daily + PYQ solving (last 10 years). Weekly mock tests for Prelims.', 'Month 10-11: Intensive Prelims revision + full-length mocks (at least 30 tests).', 'Month 12: Post-Prelims Mains preparation — answer writing practice. 2 answers daily minimum.', 'Throughout: 2 hours daily for MP-specific topics. This is what differentiates MPPSC from UPSC.'] },
    ],
  },
  {
    slug: 'rpsc-ras-preparation-guide',
    title: 'RPSC RAS Preparation — Complete Guide for Rajasthan State Services',
    description: 'Complete RPSC RAS preparation strategy with Rajasthan-specific GK focus, book list, and month-wise study plan for Prelims and Mains.',
    category: 'State PSC',
    categoryColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300',
    readTime: '13 min read',
    updated: '2026-10-25',
    body: [
      { heading: 'RPSC RAS Exam Pattern', bullets: ['Prelims: 1 paper — GS (200 marks, 150 Qs, 3 hours). Negative marking: 1/3.', 'Mains: 4 papers — GK & GS-I to III (200 marks each) + Hindi & English Language. Total: 800 marks.', 'Interview: 100 marks. Total: 900 marks for final selection.', 'Rajasthan-specific topics carry 40-50% weightage in both Prelims and Mains.', 'Cut-off trend: Gen 70-80 marks in Prelims out of 200 (varies by year).'] },
      { heading: 'Rajasthan-Specific Focus Areas (40% Weightage)', bullets: ['Rajasthan History: Rajput kingdoms (Mewar, Marwar, Jaipur, Bikaner). Rana Sanga, Rana Pratap, Prithviraj Chauhan.', 'Rajasthan Art & Culture: Miniature paintings (Kishangarh, Bundi, Kota). Puppetry (Kathputli). Folk dances (Ghoomar, Kalbelia).', 'Rajasthan Geography: Thar Desert, Aravalli Range, rivers (Chambal, Luni, Banas), lakes (Sambhar, Pushkar).', 'Rajasthan Economy: Tourism, handicrafts, marble industry, wind energy. Mineral resources (marble, granite, copper).', 'Saints & Religious Movements: Meerabai, Dadu Dayal, Jasnath ji. Jain temples of Dilwara, Ranakpur.'] },
      { heading: 'Essential Books', bullets: ['Rajasthan GK: "Rajasthan ek Parichay" by L.P. Sharma — most comprehensive for RAS.', '"Rajasthan ki Rajvyavastha" by B.L. Fadia — for Rajasthan polity and administration.', 'History: NCERT + Rajasthan History by Ratan Lal Mishra + Spectrum.', 'Geography: NCERT + "Rajasthan ka Bhugol" by L.R. Bhalla.', 'Art & Culture: "Rajasthani Kala evam Sanskriti" by Raghunath Singh.', 'Current Affairs: Rajasthan Patrika daily + Drishti IAS Rajasthan current affairs.'] },
    ],
  },
  {
    slug: 'epfo-ssa-preparation-strategy',
    title: 'EPFO SSA Preparation — Complete Strategy for Social Security Assistant',
    description: 'EPFO SSA exam preparation guide covering Prelims, Mains, and scoring strategy with subject-wise approach and time management tips.',
    category: 'SSC',
    categoryColor: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300',
    readTime: '10 min read',
    updated: '2026-10-25',
    body: [
      { heading: 'EPFO SSA Exam Overview', bullets: ['Conducted by UPSC (not SSC). Level: graduate-level banking exam pattern.', 'Prelims: 100 Qs — English (30), Reasoning (35), Quant (35). 60 minutes. Negative: 0.25.', 'Mains: 3 sections — GA (40), Quant (40), English (20). 120 marks. 2 hours. Descriptive: Essay + Letter.', 'Total vacancies: Usually 1,000-3,000. Competition ratio: 1:50 approximately.', 'Post: Social Security Assistant in EPFO offices. Level 5 pay (₹29,200-92,300).'] },
      { heading: 'Section-wise Strategy', bullets: ['English (30 Qs): Focus on RC (10 Qs), Error Detection (5), Cloze Test (5). Practice 1 RC daily.', 'Reasoning (35 Qs): Puzzles & Seating (15 Qs most important). Practice 5 puzzles daily.', 'Quant (35 Qs): DI (10 Qs, highest scoring). Number Series (5 Qs). Practice speed math.', 'GA for Mains: Focus on EPFO/ESIC/Labour laws + current affairs + banking awareness.', 'Descriptive: Practice 1 essay + 1 letter weekly. Focus on social security topics.'] },
      { heading: 'Labour Laws for EPFO (Mains)', bullets: ['Employees Provident Fund & Misc. Provisions Act, 1952 — know EPF contribution rates, eligibility.', 'Employees State Insurance Act, 1948 — ESI scheme, coverage limits, benefits.', 'Labour Code on Social Security, 2020 — new amalgamated code replacing old acts.', 'Minimum Wages Act + Payment of Wages Act — basic concepts.', 'Recent changes: PF interest rate, auto-claim settlement, ABRY scheme, e-nomination.'] },
    ],
  },
  {
    slug: 'capf-ac-preparation-guide',
    title: 'CAPF AC Preparation — Complete Guide for Assistant Commandant Exam',
    description: 'UPSC CAPF AC preparation strategy covering Paper I, Paper II, Physical Standards, and Interview preparation for BSF/CRPF/CISF/ITBP/SSB.',
    category: 'Defence',
    categoryColor: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300',
    readTime: '12 min read',
    updated: '2026-10-25',
    body: [
      { heading: 'CAPF AC Exam Pattern', bullets: ['Paper I: GS & Current Affairs — 250 marks, 125 MCQs, 2 hours. Negative: 1/3.', 'Paper II: English Comprehension & Precis Writing — 200 marks. Descriptive. 3 hours.', 'Physical/Medical Standards: Height 165cm (Male), 150cm (Female). Chest 81-86cm. Vision 6/6.', 'Interview/Personality Test: 150 marks. Focus on leadership, current affairs, defence knowledge.', 'Total: 600 marks (Paper I + Paper II + Interview). Medical exam is qualifying.'] },
      { heading: 'Paper I Strategy (250 Marks)', bullets: ['Similar to UPSC CSE Prelims level but includes defence & security topics.', 'Current Affairs (60-70 marks): Focus on last 1 year. National security, border issues.', 'History & Polity (50-60 marks): Modern India, Constitution, Governance.', 'Geography (30-40 marks): India physical & economic geography. Strategic locations.', 'Science & Economy (40-50 marks): General science + Indian economy basics.', 'Defence & Security: CAPF roles, border management, internal security, insurgency.'] },
      { heading: 'Paper II Strategy (English - 200 Marks)', bullets: ['Precis Writing: Most important — 80 marks. Practice reducing 500 words to 150 words daily.', 'Comprehension: 2 passages — 80 marks. Similar to UPSC Mains English paper.', 'Essay: 1 essay — 40 marks. Current affairs or security-related topics.', 'Practice source: The Hindu editorials for vocabulary + The Indian Express for essay ideas.', 'Time management: Precis (1 hour) + Comprehension (1 hour) + Essay (1 hour).'] },
      { heading: 'Physical Preparation', bullets: ['Running: 1600m in 6.5 minutes (Male), 800m in 4 minutes (Female). Train 3 months minimum.', 'Long Jump: 3.5m (Male), 3m (Female). Practice plyometric exercises.', 'Shot Put: 4.5m (Male - 7.26 kg), 3.5m (Female - 4 kg). Upper body strength needed.', 'Height & Chest: Non-negotiable medical standards. Chest expansion must be 5cm minimum.', 'Eye sight: Distant vision 6/6 (both eyes). Near vision must be clear. No color blindness.'] },
    ],
  },
  {
    slug: 'rrb-alp-preparation-strategy',
    title: 'RRB ALP Preparation — Complete Strategy for Assistant Loco Pilot',
    description: 'RRB ALP exam preparation guide with CBT-1, CBT-2, CBAT strategy and trade-specific preparation tips for aspiring railway loco pilots.',
    category: 'Railway',
    categoryColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
    readTime: '11 min read',
    updated: '2026-10-25',
    body: [
      { heading: 'RRB ALP Exam Stages', bullets: ['CBT-1 (75 Qs, 60 min): Math (20), GI&R (25), Science (20), GA (10). Negative: 1/3.', 'CBT-2 Part A: Same as CBT-1 (100 Qs, 90 min). Part B: Trade/Engineering (75 Qs, 60 min).', 'CBAT: Computer-based Aptitude Test — tests memory, following instructions, speed distance.', 'Document Verification + Medical: Vision must be 6/6 without glasses. Color vision mandatory.', 'Training: After selection, 1-year training at Zonal Railway Training Institutes.'] },
      { heading: 'CBT-1 Strategy (Qualifying Stage)', bullets: ['Math (20 Qs): Number System (4-5 Qs), %, Ratio, Profit (4-5 Qs), TSD/T&W (3-4 Qs).', 'Reasoning (25 Qs): Analogies (5-6), Series (4-5), Coding (3-4), Figure-based (5-6).', 'Science (20 Qs): Physics most important (8-10 Qs). Mechanics, electricity, optics focus.', 'GA (10 Qs): Current affairs + Railway GK (Kavach, DFC, Vande Bharat, new trains).', 'Expected cutoff: 55-65 marks out of 75 (General category). Accuracy matters more than speed.'] },
      { heading: 'Trade-Specific Preparation (CBT-2 Part B)', bullets: ['ITI Electrician: Focus on AC/DC circuits, motors, transformers, wiring, electrical safety.', 'ITI Fitter: Metrology, drilling, welding, hand tools, thermal properties.', 'Diploma Electrical: All of ITI + power systems, electrical machines, control systems.', 'Diploma Mechanical: Thermodynamics, strength of materials, manufacturing processes.', 'Study from: NIMI trade theory books (official ITI textbooks). Railway-specific question banks.'] },
      { heading: 'CBAT Preparation Tips', bullets: ['CBAT tests aptitude, not knowledge. It checks if you can be a safe loco pilot.', 'Memory test: Remember sequences of numbers/colors shown briefly. Practice daily.', 'Following instructions: Complex instructions given → execute correctly under time pressure.', 'Speed & distance judgment: Critical for driving trains. Practice spatial awareness games.', 'Only top 8× vacancies from CBT-2 are called for CBAT. So CBT-2 score is crucial.'] },
    ],
  },
  {
    slug: 'dsssb-exam-preparation-guide',
    title: 'DSSSB Exam Preparation — Complete Guide for Delhi Government Jobs',
    description: 'Complete DSSSB preparation guide covering Tier-1, Tier-2 pattern, post-wise strategy, and Delhi-specific GK for all DSSSB posts.',
    category: 'State PSC',
    categoryColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300',
    readTime: '11 min read',
    updated: '2026-10-25',
    body: [
      { heading: 'DSSSB Exam Overview', bullets: ['DSSSB recruits for Delhi Government departments: LDC, Patwari, Teacher (PRT/TGT/PGT), JE, Pharmacist, etc.', 'Tier-1 (CBT): 200 Qs, 200 marks, 2 hours. Common for all Group C posts.', 'Tier-2: Descriptive/Skill Test (for specific posts like Teacher, Stenographer).', 'Pattern: GK (50), Reasoning (50), Math (50), English/Hindi (50). Equal weightage.', 'No interview for Group C posts. Merit based on written exam marks only.'] },
      { heading: 'Delhi-Specific GK (10-15 Marks)', bullets: ['Delhi History: Prithviraj Chauhan, Tughlaq dynasty, Mughal era, 1857 revolt in Delhi.', 'Delhi Geography: Yamuna river, Ridge area, Delhi NCR districts, climate.', 'Delhi Administration: LG powers, MCD structure, Delhi Police (under Centre, not state).', 'Delhi Art & Culture: Qutub Minar, Red Fort, Humayun Tomb, Jantar Mantar, India Gate.', 'Delhi Current Affairs: Government schemes, metro expansion, pollution measures, Smart City projects.'] },
      { heading: 'Post-Wise Preparation', bullets: ['LDC/UDC: Focus on Reasoning + Math. GK moderate level. Typing test after CBT.', 'Patwari: Revenue/land records knowledge + computer proficiency. Math + Reasoning heavy.', 'PRT Teacher: Child Development & Pedagogy extra paper. NCERT content. B.Ed mandatory.', 'TGT/PGT: Subject knowledge (60 Qs) + General section (140 Qs). B.Ed + PG for PGT.', 'JE (Civil/Electrical): Technical paper (100 Qs) + General (100 Qs). Diploma/B.Tech.'] },
      { heading: 'Book Recommendations & Resources', bullets: ['Reasoning: R.S. Aggarwal "A Modern Approach to Verbal & Non-Verbal Reasoning".', 'Math: Rakesh Yadav "7300+ Objective Arithmetic" — DSSSB level.', 'GK: Lucent GK + Delhi-specific GK from Kiran Prakashan.', 'English: SP Bakshi "Objective General English" — basics to advanced.', 'Previous papers: Solve last 5 years DSSSB papers — questions repeat themes.', 'Mock tests: Practice 30+ mock tests before exam. Testbook/Adda247 recommended.'] },
    ],
  },
  {
    slug: 'how-to-choose-right-government-exam',
    title: 'How to Choose the Right Government Exam — Based on Your Profile',
    description: 'Guide to selecting the best government exam based on your age, qualification, interests, and career goals. Comparison of all major exams.',
    category: 'Career',
    categoryColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
    readTime: '12 min read',
    updated: '2026-10-25',
    body: [
      { heading: 'Step 1: Check Your Eligibility', bullets: ['Age: Most exams have 18-27/30/32 age limit. UPSC allows up to 32 (Gen). State PSCs allow 35-40.', 'Qualification: 10th (MTS, Group D, Constable), 12th (CHSL, GD, Clerk), Graduate (CGL, PO, PSC), Engineering (JE, ESE).', 'Physical Standards: Police, CAPF, Railway require height/chest standards. Check before investing time.', 'Category relaxation: OBC (+3 years), SC/ST (+5 years). PwD gets +10 years. Use relaxation strategically.'] },
      { heading: 'Step 2: Match Your Strengths', paragraphs: ['If you are strong in Math + Reasoning: SSC CGL, SSC CHSL, Banking (PO/Clerk), Railway (NTPC/JE) are ideal.', 'If you are strong in GK + Current Affairs: UPSC, State PSC, RBI Grade B, NABARD, SEBI are better choices.', 'If you are strong in English: Banking exams and UPSC have English as a major component.', 'If you are physically fit: Police SI/Constable, CAPF AC, NDA, CDS. These have physical tests.', 'If you have engineering background: SSC JE, UPSC ESE (IES), GATE for PSU, Railway JE.'] },
      { heading: 'Step 3: Compare Salary & Growth', bullets: ['Highest salary (entry): IAS/IPS (Level 10, ₹56,100) > SEBI/RBI Grade A (₹44,500) > SBI PO (₹41,960).', 'Fastest promotion: Defence services > IPS > Banking (PO to Manager in 3 years).', 'Best work-life balance: Teaching (KVS/NVS/TGT/PGT), SSC CGL desk jobs, Banking (Clerk).', 'Maximum job security: All government jobs are secure, but central government > state.', 'Best perks: Railway (free travel), Defence (canteen/housing), Banking (loans), IAS (car/house/staff).'] },
      { heading: 'Decision Matrix by Qualification', bullets: ['10th Pass: SSC MTS (₹18,000) > Railway Group D (₹18,000) > Police Constable (₹21,700).', '12th Pass: SSC CHSL (₹25,500) > SSC GD (₹21,700) > Banking Clerk (₹19,900).', 'Graduate: SSC CGL (₹44,900) > Banking PO (₹41,960) > State PSC (₹56,100). Best ROI: SSC CGL.', 'B.Tech: GATE PSU (₹40,000-60,000) > SSC JE (₹35,400) > UPSC ESE (₹56,100 but very hard).', 'Post Graduate: UGC NET (₹57,700) > RBI Grade B (₹77,208) > State PSC (₹56,100).'] },
    ],
  },
  {
    slug: 'mock-test-strategy-competitive-exams',
    title: 'Mock Test Strategy — How to Use Practice Tests Effectively',
    description: 'Complete guide to mock test strategy for competitive exams. Learn when to start, how many to take, and how to analyze your performance for maximum improvement.',
    category: 'Strategy',
    categoryColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
    readTime: '9 min read',
    updated: '2026-10-25',
    body: [
      { heading: 'When to Start Mock Tests', bullets: ['Start sectional tests after completing 60% of syllabus (not 100% — you will never feel "ready").', 'Start full-length mocks 2 months before exam date. Minimum 20-30 full mocks before D-day.', 'Ratio: 70% study + 30% practice in first 2 months → 30% study + 70% practice in last 2 months.', 'Take 1 mock per day in the last 2 weeks. Analyze for 2 hours after each mock.'] },
      { heading: 'How to Take a Mock Test', bullets: ['Simulate real exam conditions: Same time slot, no phone, no breaks, strict timer.', 'Do NOT check answers during the test. Complete all sections first.', 'Time allocation: Spend maximum 60-70% time on your strong sections first.', 'Skip questions you cannot solve in 60 seconds. Come back in the end.', 'For negative marking exams: Only attempt if you can eliminate 2 options.'] },
      { heading: 'How to Analyze Mock Tests (Most Important)', bullets: ['Analysis should take 2-3× the test duration. 1-hour test → 2-3 hours analysis.', 'Categorize every wrong answer: Conceptual gap vs Silly mistake vs Time pressure.', 'Maintain an "Error Log" spreadsheet: Question type, why wrong, correct approach.', 'Track accuracy per topic over 10+ mocks. Identify weak areas with data, not feelings.', 'Review questions you got right by guessing — learn the proper method.', 'Check time per question: If >90 seconds on any question, you need to practice that type more.'] },
      { heading: 'Common Mock Test Mistakes', bullets: ['Taking mocks without analyzing = waste of time. Analysis is where learning happens.', 'Comparing scores with others = demotivating. Compare with YOUR previous scores only.', 'Taking 100+ mocks without studying = diminishing returns. Study gaps between mocks.', 'Changing strategy every 2 tests. Give a strategy at least 5 mocks before changing.', 'Not taking mocks at the same time as the real exam. Brain performs differently at different times.'] },
    ],
  },
  {
    slug: 'up-police-constable-preparation-guide',
    title: 'UP Police Constable 81000 Vacancy — Complete Preparation Guide 2026',
    description:
      'Step-by-step preparation strategy for UP Police Constable 81000 vacancy recruitment. Covers written exam syllabus, physical test standards, document verification, and selection process.',
    readTime: '10 min read',
    category: 'Police',
    categoryColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
    updated: '2026-10-27',
    body: [
      {
        paragraphs: [
          'The Uttar Pradesh Police Recruitment and Promotion Board (UPPRPB) has announced 81,000 constable vacancies — the largest single police recruitment drive in Indian history. With over 50 lakh expected applicants, the competition ratio will be roughly 60:1. A structured preparation plan is non-negotiable if you want to clear this exam.',
        ],
      },
      {
        heading: 'Exam Pattern and Syllabus Breakdown',
        bullets: [
          'Written exam: 300 marks, 150 questions, 2 hours. Objective multiple-choice format with 1/4 negative marking.',
          'Subjects: General Hindi (37 questions), General Knowledge / Current Affairs (38 questions), Numerical & Mental Ability (38 questions), Mental Aptitude / Intelligence / Reasoning (37 questions).',
          'Physical Standard Test (PST): Male — 168 cm height (Gen/OBC), 160 cm (SC/ST). Female — 152 cm (Gen/OBC), 147 cm (SC/ST).',
          'Physical Efficiency Test (PET): Male — 4.8 km run in 25 minutes. Female — 2.4 km run in 14 minutes.',
          'Document verification is the final stage. Keep all original certificates ready — marksheets, caste certificate, domicile, character certificate from two gazetted officers.',
        ],
      },
      {
        heading: 'Subject-Wise Preparation Strategy',
        bullets: [
          'General Hindi (37 marks): Focus on Vilom Shabd, Paryayvachi, Muhavare, Lokoktiyan, Sandhi, Samas, and one-word substitution. Read Lucent Hindi grammar — it covers 90% of the syllabus.',
          'GK & Current Affairs (38 marks): Focus on UP-specific GK — UP history, geography, economy, festivals, famous personalities. Last 6 months current affairs are critical.',
          'Numerical Ability (38 marks): Simplification, Percentage, Profit & Loss, Ratio, Average, Time-Work, Number Series. Practice RS Aggarwal arithmetic — most questions come from basic arithmetic.',
          'Reasoning (37 marks): Coding-Decoding, Direction, Blood Relations, Alphabet Series, Analogy, Venn Diagrams. Solve 50 reasoning questions daily from previous-year papers.',
          'Allocate 2 hours daily to GK + Hindi (theory subjects), 2 hours to Maths + Reasoning (practice subjects). Revise weekly.',
        ],
      },
      {
        heading: 'Physical Test Preparation Tips',
        bullets: [
          'Start running training 3 months before PET date. Begin with 2 km and add 500m every week.',
          'Male candidates: Target completing 4.8 km in 22 minutes (3 minutes buffer). Practice interval running — 400m sprint followed by 200m jog.',
          'Female candidates: Target completing 2.4 km in 12 minutes. Focus on stamina building with daily 30-minute runs.',
          'Morning runs between 5-7 AM replicate exam conditions. Avoid running in the afternoon heat.',
          'Diet: High protein (eggs, dal, paneer), complex carbs (roti, oats), and stay hydrated. Avoid junk food and sugary drinks during training.',
        ],
      },
      {
        heading: 'Previous Year Cut-Off and Target Score',
        bullets: [
          '2024 cut-off (General Male): approximately 220/300. OBC: 200/300. SC: 175/300. Target at least 240+ to be safe.',
          'Accuracy matters more than attempts. Attempt 130+ questions with 85%+ accuracy to score 240+.',
          'Spend first 45 minutes on Reasoning + Maths (high-scoring). Next 45 minutes on GK + Hindi. Last 30 minutes for revision and doubtful questions.',
          'Take at least 15 full-length mock tests in the final month. Analyze every mock — identify which topics cost you the most marks.',
          'Join a free test series on Testbook or Adda247 for UP Police-specific mocks. Practice in exam-like conditions.',
        ],
      },
    ],
  },
  {
    slug: 'rajasthan-police-recruitment-complete-guide',
    title: 'Rajasthan Police Constable 24576 Posts — Complete Preparation Guide',
    description:
      'Detailed preparation guide for Rajasthan Police 24576 constable recruitment. Covers exam pattern, Rajasthan GK preparation, physical test, and subject-wise strategy.',
    readTime: '9 min read',
    category: 'Police',
    categoryColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
    updated: '2026-10-27',
    body: [
      {
        paragraphs: [
          'The Rajasthan Police has released 24,576 constable vacancies across various districts. This is one of the biggest police recruitment drives in Rajasthan. The exam is conducted by the Rajasthan Police Subordinate Board and follows a well-defined pattern that rewards candidates who focus on Rajasthan-specific general knowledge alongside standard aptitude subjects.',
        ],
      },
      {
        heading: 'Exam Pattern and Selection Process',
        bullets: [
          'Written exam: 150 questions, 75 marks (each question = 0.5 marks). Duration: 2 hours. No negative marking — attempt every question.',
          'Subjects: Reasoning (30 q), GK & GS (45 q), Rajasthan GK (45 q), Computer Knowledge (15 q), Current Affairs (15 q).',
          'Physical Efficiency Test (after written exam): Male — 5 km run in 25 min, Long Jump 12 feet, Shot Put (7.26 kg) 19 feet. Female — 5 km run in 35 min, Long Jump 9 feet, Shot Put (4 kg) 15 feet.',
          'Physical Standard: Male height 168 cm (Gen), 165 cm (SC/ST). Chest: 81 cm unexpanded, 86 cm expanded. Female height 152 cm (Gen), 145 cm (SC/ST).',
          'Final merit = Written exam marks + PET marks + bonus marks (NCC/Home Guard/Sports). No interview.',
        ],
      },
      {
        heading: 'Rajasthan GK — The Deciding Factor (45 Questions)',
        bullets: [
          'Rajasthan History: Rajput dynasties (Chauhans, Rathores, Sisodias), freedom fighters (Kesari Singh Barhat, Vijay Singh Pathik, Arjun Lal Sethi), 1857 revolt in Rajasthan.',
          'Rajasthan Geography: Aravalli Range, Thar Desert, rivers (Chambal, Banas, Luni), climate zones, lakes (Sambhar, Pushkar, Pichhola), minerals and mining.',
          'Art & Culture: Paintings (Kishangarh, Bundi, Mewar), folk dances (Ghoomar, Kalbelia, Kathputli), fairs (Pushkar, Nagaur), handicrafts, saints (Meerabai, Kabir).',
          'Rajasthan Polity: Panchayati Raj (73rd amendment implementation), Governor, CM, state legislature, important government schemes (Chiranjeevi, Indira Rasoi).',
          'Best books: Rajasthan GK by Laxminarayan Nathuramka + Rajasthan Darpan magazine. Read these two thoroughly for 45/45.',
        ],
      },
      {
        heading: 'Other Subjects Strategy',
        bullets: [
          'Reasoning (30 questions): Blood Relations, Coding-Decoding, Analogy, Series, Syllogism, Mirror Image. Level is moderate — solve Kiran Reasoning book for practice.',
          'GK & General Science (45 questions): Focus on Indian History (Modern India), Indian Geography, Polity (fundamental rights, amendments), Physics (units, light, sound), Chemistry (acids/bases, pH), Biology (diseases, vitamins, blood groups).',
          'Computer Knowledge (15 questions): MS Office basics, internet terms, hardware/software, shortcuts, full forms (RAM, ROM, CPU, URL). These are easy marks — do not skip.',
          'Current Affairs (15 questions): Last 6 months national + Rajasthan state current affairs. Focus on government schemes, awards, sports events, appointments.',
          'Since there is no negative marking, attempt all 150 questions. Even intelligent guessing adds marks.',
        ],
      },
      {
        heading: 'Preparation Timeline — 90 Day Plan',
        bullets: [
          'Day 1-30: Complete Rajasthan GK + Indian GK syllabus. Read one chapter daily. Make short notes for revision.',
          'Day 31-60: Focus on Reasoning (1 hour daily) + Computer Knowledge (30 min daily). Start solving previous-year papers topic-wise.',
          'Day 61-75: Full-length mock tests — one per day. Analyze weak areas after each test. Revise Rajasthan GK notes every 3 days.',
          'Day 76-90: Revision only. Re-read short notes, solve 2 mocks per day, focus on current affairs of the last 3 months.',
          'Physical training: Start running from Day 1 itself. Run 5 km daily in the morning. Practice long jump and shot put at least 3 times per week.',
        ],
      },
    ],
  },
  {
    slug: 'kvs-teacher-recruitment-preparation-2026',
    title: 'KVS Teacher Recruitment 2026 — Preparation Guide for 9500 Posts',
    description:
      'Complete preparation strategy for KVS 9500 teacher posts including PGT, TGT, PRT, and Librarian. Covers exam pattern, interview preparation, demo teaching, and subject-wise tips.',
    readTime: '11 min read',
    category: 'Teaching',
    categoryColor: 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300',
    updated: '2026-10-27',
    body: [
      {
        paragraphs: [
          'Kendriya Vidyalaya Sangathan (KVS) has announced 9,500 teaching posts across PGT, TGT, PRT, and other categories. KVS is one of the most prestigious teaching positions in India — it offers 7th Pay Commission salary, government housing, and the satisfaction of teaching in a well-structured school system. The selection process involves a written exam followed by a demo lesson and interview.',
        ],
      },
      {
        heading: 'Post Categories and Eligibility',
        bullets: [
          'PRT (Primary Teacher): Graduation + D.El.Ed/B.El.Ed + CTET Paper-I qualified. Salary: Level 6 (₹35,400-1,12,400). Teaches classes 1-5.',
          'TGT (Trained Graduate Teacher): Graduation in subject + B.Ed + CTET Paper-II. Salary: Level 7 (₹44,900-1,42,400). Teaches classes 6-10.',
          'PGT (Post Graduate Teacher): Post-Graduation in subject + B.Ed. CTET not mandatory for PGT. Salary: Level 8 (₹47,600-1,51,100). Teaches classes 11-12.',
          'Other posts: Librarian (B.Lib.Sc + experience), Music Teacher, Art Teacher, Physical Education Teacher.',
          'Upper age limit: PRT/TGT — 30 years, PGT — 40 years. Standard relaxation for reserved categories.',
        ],
      },
      {
        heading: 'Written Exam Pattern',
        bullets: [
          'Part I (Common for all): General English (10 marks), General Hindi (10 marks), General Knowledge & Current Affairs (10 marks), Reasoning (5 marks), Computer Literacy (5 marks), Education & Pedagogy (20 marks). Total: 60 marks.',
          'Part II (Subject-specific): 40 marks. Questions based on your teaching subject up to +2 level for TGT, graduation level for PGT.',
          'Total: 180 questions, 180 marks, 3 hours. Negative marking: 1/3 for wrong answers.',
          'Minimum qualifying marks: 60% for General, 55% for OBC, 50% for SC/ST/PwD.',
          'Part II (subject) carries the highest weightage per question. Score 32+ out of 40 in your subject to stay competitive.',
        ],
      },
      {
        heading: 'Education & Pedagogy — The Most Important Section (20 Marks)',
        bullets: [
          'Child Development: Piaget (cognitive stages), Vygotsky (Zone of Proximal Development), Kohlberg (moral development), Howard Gardner (Multiple Intelligence).',
          'Learning Theories: Constructivism, Behaviorism (Pavlov, Skinner), Social Learning (Bandura). Understand with classroom examples.',
          'NCF 2005 & NEP 2020: Know the key recommendations — 5+3+3+4 structure, mother tongue as medium, holistic report cards, coding from Class 6.',
          'Inclusive Education: RTE Act 2009, learning disabilities (Dyslexia, Dyscalculia, ADHD), strategies for gifted children and slow learners.',
          'Assessment: Formative vs Summative, CCE (Continuous Comprehensive Evaluation), rubrics, portfolio assessment. NCERT books on pedagogy are the best source.',
        ],
      },
      {
        heading: 'Demo Lesson and Interview Preparation',
        bullets: [
          'Demo lesson (40 marks): You get a topic and 15-20 minutes to prepare, then teach for 15 minutes before a panel. Use blackboard, engage with imaginary students, ask questions.',
          'Structure your demo: Introduction (2 min, relate topic to real life) → Main Content (8 min, explain with examples) → Activity (3 min, involve students) → Summary (2 min, recap key points).',
          'Interview (20 marks): Questions on teaching philosophy, KVS transfer policy, NEP 2020, classroom management, how you handle weak students.',
          'Common interview questions: Why KVS over state schools? How will you handle a student who is consistently scoring low? Explain a topic from your subject in simple terms.',
          'Dress formally, maintain eye contact, speak clearly. KVS values teachers who show genuine passion for education over rote academic knowledge.',
        ],
      },
    ],
  },
  {
    slug: 'bpsc-school-teacher-tre-preparation',
    title: 'BPSC TRE 4.0 — Complete Guide for 33320 Teacher Posts in Bihar',
    description:
      'Preparation strategy for BPSC Teacher Recruitment Exam (TRE) 4.0 for 33320 posts. Covers paper pattern for Primary, Upper Primary, Secondary, and Senior Secondary teachers.',
    readTime: '10 min read',
    category: 'Teaching',
    categoryColor: 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300',
    updated: '2026-10-27',
    body: [
      {
        paragraphs: [
          'Bihar Public Service Commission (BPSC) has released 33,320 teacher vacancies under TRE 4.0 across four levels — Primary (Class 1-5), Upper Primary (Class 6-8), Secondary (Class 9-10), and Senior Secondary (Class 11-12). This is a massive opportunity for B.Ed and D.El.Ed holders from Bihar and neighboring states. The exam is purely merit-based with no interview, making the written test the sole deciding factor.',
        ],
      },
      {
        heading: 'Post-Wise Vacancy and Eligibility',
        bullets: [
          'Primary Teacher (Class 1-5): Intermediate (12th) + D.El.Ed + CTET/BTET Paper-I. Approximately 12,000 vacancies. Salary: Level 1 (₹21,700-69,100).',
          'Upper Primary Teacher (Class 6-8): Graduation + B.Ed + CTET/BTET Paper-II. Approximately 10,000 vacancies. Subject-wise posts in Hindi, English, Maths, Science, Social Science.',
          'Secondary Teacher (Class 9-10): Graduation in subject + B.Ed. Approximately 7,000 vacancies. Must have the subject as a major in graduation.',
          'Senior Secondary Teacher (Class 11-12): Post-Graduation in subject + B.Ed. Approximately 4,320 vacancies. PGT-level knowledge required.',
          'CTET/BTET qualification is mandatory for Primary and Upper Primary. Valid CTET lifetime validity rule applies.',
        ],
      },
      {
        heading: 'Exam Pattern — What to Expect',
        bullets: [
          'Primary: 150 questions, 150 marks, 2.5 hours. Language I (30q), Language II (30q), Maths (30q), EVS (30q), Child Pedagogy (30q). No negative marking.',
          'Upper Primary: 150 questions, 150 marks, 2.5 hours. Language I (25q), Language II (25q), Subject (50q), Child Pedagogy (50q).',
          'Secondary & Senior Secondary: 150 questions, 150 marks, 2.5 hours. Subject Knowledge (100q) + General Studies (50q including Maths, Reasoning, Current Affairs, Bihar GK).',
          'All questions are objective (MCQ). No descriptive or written section.',
          'Since there is no negative marking, attempt all 150 questions. Leave nothing blank.',
        ],
      },
      {
        heading: 'Subject-Wise Preparation Tips',
        bullets: [
          'Child Pedagogy (common for Primary/Upper Primary): NCF 2005, NEP 2020, Piaget, Vygotsky, inclusive education, learning disabilities. Study NCERT pedagogy textbooks.',
          'Language I & II: Grammar-heavy — Hindi Vyakaran (Sandhi, Samas, Alankar, Vilom, Paryayvachi) and English Grammar (Tenses, Voice, Narration, Articles). Unseen passage comprehension.',
          'Maths (Primary): Number system, fractions, decimals, geometry, measurement, data handling. All from NCERT Class 1-5 level but with deep understanding.',
          'EVS (Primary): Family, food, shelter, water, plants, animals, travel, mapping. Focus on NCERT Class 3-5 EVS books — questions come directly from these.',
          'Bihar GK (for Secondary/Sr. Secondary): Bihar history (Magadh, Nalanda, Champaran Satyagraha), Bihar geography (rivers, soil, crops), Bihar polity, famous personalities from Bihar.',
        ],
      },
      {
        heading: 'Cut-Off Analysis and Score Target',
        bullets: [
          'TRE 3.0 cut-offs (General): Primary — 95/150, Upper Primary — 90/150, Secondary — 85/150. Expect similar or slightly higher for TRE 4.0.',
          'Target score: Primary — 110+, Upper Primary — 105+, Secondary — 100+. This gives comfortable margin above cut-off.',
          'Focus areas for quick marks: Child Pedagogy (study 10 days, score 25+/30), Language sections (grammar rules = guaranteed marks), Bihar GK (15-20 questions, very specific).',
          'Use BPSC TRE previous year papers from 2023 and 2024 — question pattern and difficulty repeat significantly.',
          'Join a free test series. Take 20+ full mocks. Practice completing 150 questions in under 2 hours to have 30 minutes for revision.',
        ],
      },
    ],
  },
  {
    slug: 'tnpsc-group-4-preparation-strategy',
    title: 'TNPSC Group 4 Preparation Strategy — 6574 Posts Complete Guide',
    description:
      'Detailed preparation strategy for TNPSC Group 4 exam covering 6574 vacancies. Covers syllabus, Tamil/English medium approach, Samacheer Kalvi books, and cut-off analysis.',
    readTime: '9 min read',
    category: 'SSC',
    categoryColor: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300',
    updated: '2026-10-27',
    body: [
      {
        paragraphs: [
          'Tamil Nadu Public Service Commission (TNPSC) Group 4 is one of the most popular state-level exams in South India with 6,574 vacancies for posts like Village Administrative Officer (VAO), Junior Assistant, Bill Collector, Typist, and Steno-Typist. The exam is based entirely on the Samacheer Kalvi school curriculum, making it accessible to anyone who studied in Tamil Nadu state board. But the competition is intense — over 15 lakh candidates apply.',
        ],
      },
      {
        heading: 'Exam Pattern and Syllabus',
        bullets: [
          'Single paper: 200 questions, 300 marks, 3 hours. 75 questions on General Studies, 25 on Aptitude & Mental Ability, 100 on General Tamil/English.',
          'General Studies (75q × 1.5 marks = 112.5 marks): History, Geography, Indian Polity, Indian Economy, Science, Current Events.',
          'Aptitude & Mental Ability (25q × 1.5 marks = 37.5 marks): Number series, Simplification, Percentage, Profit & Loss, Coding, Blood Relations, Logical Reasoning.',
          'General Tamil/English (100q × 1.5 marks = 150 marks): Grammar, Literature, Comprehension. Tamil is recommended for Tamil medium students as it is easier to score 130+.',
          'No negative marking. Attempt every single question — there is no reason to leave any blank.',
        ],
      },
      {
        heading: 'The Samacheer Kalvi Strategy (Most Important)',
        bullets: [
          'TNPSC Group 4 syllabus is 90% from Samacheer Kalvi textbooks (Class 6-12). Read these books cover to cover — they are your primary source.',
          'History: Class 6-12 History textbooks. Focus on Tamil Nadu history (Pallavas, Cholas, Pandyas, Vijayanagar, Nayaks, Freedom Movement in TN).',
          'Geography: Class 6-12 Geography. Focus on Indian geography + Tamil Nadu geography (rivers, districts, climate, soil, crops).',
          'Science: Class 6-10 Science for basics. Class 11-12 for advanced questions. Focus on Biology (diseases, nutrition) and Physics (units, simple machines).',
          'Polity: Class 6-12 Civics. Indian Constitution, Fundamental Rights, DPSP, amendments, local government, state government of Tamil Nadu.',
        ],
      },
      {
        heading: 'Tamil/English Section Strategy',
        bullets: [
          'General Tamil (if choosing Tamil): Thirukkural with meanings (at least 100 kurals), Purananuru, Agananooru, Tamil grammar (Ezhuththu, Sol, Porul), Proverbs, Tamil literature authors and works.',
          'General English (if choosing English): Synonyms, Antonyms, Sentence Completion, Spotting Errors, One-word Substitution, Idioms & Phrases, Comprehension passages.',
          'Tamil medium candidates have a clear advantage in the Tamil section — scoring 140+/150 is possible with thorough preparation.',
          'English medium candidates should target 120+/150 and compensate with higher GS scores.',
          'Practice 50 Tamil/English questions daily from previous year papers. Pattern repeats heavily.',
        ],
      },
      {
        heading: 'Cut-Off and Final Preparation Tips',
        bullets: [
          'Recent cut-offs (General): VAO — 170/300, Junior Assistant — 165/300, Bill Collector — 160/300. SC/ST cut-offs are 20-40 marks lower.',
          'Target 200+ out of 300 to be safe across all posts and categories.',
          'Monthly current affairs: Focus on Tamil Nadu government schemes, central government schemes, appointments, sports, awards. TNPSC asks 10-15 current affairs questions.',
          'Revision cycle: Read Samacheer books twice (Month 1-2), solve topic-wise PYQs (Month 3), full mocks + revision (Month 4). Four months is the ideal preparation time.',
          'Best resources: Samacheer Kalvi books (free PDF on textbooks.online), TNPSC previous year papers (last 10 years), Adda247/Testbook Tamil mock tests.',
        ],
      },
    ],
  },
  {
    slug: 'supreme-court-junior-court-assistant-guide',
    title: 'Supreme Court Junior Court Assistant — Complete Preparation Guide',
    description:
      'Preparation guide for Supreme Court of India Junior Court Assistant (JCA) recruitment. Covers exam pattern, typing test requirements, computer skills, and subject-wise strategy.',
    readTime: '8 min read',
    category: 'SSC',
    categoryColor: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300',
    updated: '2026-10-27',
    body: [
      {
        paragraphs: [
          'The Supreme Court of India periodically recruits Junior Court Assistants (JCA) — one of the most coveted clerical positions in the Indian judiciary. Working in the Supreme Court comes with prestige, excellent salary (7th Pay Commission Level 4-5), central government benefits, and a posting in Delhi. The selection process includes a computer-based test, typing proficiency test, and skill test.',
        ],
      },
      {
        heading: 'Selection Process Overview',
        bullets: [
          'Part I — Computer Based Test (CBT): 200 questions, 200 marks, 2 hours. Sections: General Knowledge (50q), English Language (50q), General Aptitude (50q), Computer Knowledge (50q).',
          'Part II — Typing Proficiency Test: English typing at 35 WPM on computer (OR Hindi typing at 30 WPM). This is qualifying — not counted in merit, but you must clear it.',
          'Part III — Skill Test: Conducted on computer to test practical ability. Usually involves formatting, data entry, or document preparation.',
          'Final merit is based on CBT marks only. Typing and skill tests are qualifying in nature.',
          'Eligibility: Graduate from recognized university. Age: 18-30 years (relaxation for reserved categories). No prior experience required.',
        ],
      },
      {
        heading: 'English Language — The High-Scoring Section (50 Marks)',
        bullets: [
          'Comprehension passages (10-12 questions): Read the passage twice. Answers are always in the passage — do not use outside knowledge.',
          'Grammar: Sentence correction, Fill in the blanks (articles, prepositions, conjunctions), Active/Passive Voice, Direct/Indirect Speech. Practice Wren & Martin objective exercises.',
          'Vocabulary: Synonyms, Antonyms, One-word substitution, Idioms & Phrases. Learn 20 new words daily from "Word Power Made Easy" by Norman Lewis.',
          'Para Jumbles and Sentence Rearrangement: Look for opening sentence (general statement), closing sentence (conclusion), and linking words (however, moreover, therefore).',
          'Target: 42+ out of 50. English section is the easiest to maximize with consistent practice.',
        ],
      },
      {
        heading: 'Computer Knowledge — Free Marks (50 Marks)',
        bullets: [
          'MS Office: Word (formatting, mail merge, headers/footers), Excel (formulas — SUM, AVERAGE, VLOOKUP, IF), PowerPoint (animations, slide transitions, master slide).',
          'Operating Systems: Windows basics (Control Panel, Task Manager, file management), Linux basic commands (ls, cd, mkdir, chmod — just know the basics).',
          'Internet & Networking: HTTP/HTTPS, URL, domain name, IP address, browser, search engine, email protocols (SMTP, POP3, IMAP), cloud computing basics.',
          'Hardware: Input/Output devices, memory types (RAM, ROM, Cache), storage devices (HDD, SSD), processor architecture (32-bit vs 64-bit).',
          'Database basics: What is DBMS, SQL basics (SELECT, INSERT, UPDATE), primary key, foreign key. Study Arihant Computer Knowledge book — covers everything.',
        ],
      },
      {
        heading: 'Typing Test Preparation',
        bullets: [
          'English typing requirement: 35 WPM with minimum 90% accuracy. Practice on typing.com or monkeytype.com daily for 30 minutes.',
          'Hindi typing (if opted): 30 WPM in Remington (GAIL) or Inscript keyboard layout. Practice on Hindi Typing Tutor software.',
          'Start with accuracy, not speed. Type at 20 WPM with zero errors first, then gradually increase speed by 2-3 WPM per week.',
          'Common mistakes: Looking at keyboard, incorrect finger placement, skipping home row position. Use all 10 fingers from day one.',
          'Practice legal/judicial passages for the typing test — Supreme Court may use legal terminology in the typing test paragraph.',
        ],
      },
    ],
  },
  {
    slug: 'rrb-station-master-preparation-2026',
    title: 'RRB Station Master 2026 — Preparation Guide for 1250 Posts',
    description:
      'Complete preparation strategy for RRB Station Master (Traffic Assistant) 1250 posts. Covers CBT-1, CBT-2, CBAT aptitude test, document verification, and medical fitness requirements.',
    readTime: '10 min read',
    category: 'Railway',
    categoryColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
    updated: '2026-10-27',
    body: [
      {
        paragraphs: [
          'Railway Recruitment Boards (RRBs) have notified 1,250 Station Master (Traffic Assistant) vacancies across Indian Railways. Station Master is one of the most respected NTPC-level posts — it carries Level 6 pay (₹35,400-1,12,400), railway quarters, free travel passes, and the responsibility of managing an entire railway station. The selection involves CBT-1, CBT-2, Computer-Based Aptitude Test (CBAT), document verification, and medical examination.',
        ],
      },
      {
        heading: 'Complete Selection Process',
        bullets: [
          'CBT-1 (Screening): 100 questions, 90 minutes. Sections: Maths (30q), General Intelligence & Reasoning (30q), General Awareness (40q). 1/3 negative marking. Qualifying nature — marks not added to final merit.',
          'CBT-2 (Main Exam): 120 questions, 90 minutes. Maths (35q), General Intelligence & Reasoning (35q), General Awareness (50q). 1/3 negative marking. This decides your rank.',
          'CBAT (Computer-Based Aptitude Test): Specific to Station Master. Tests cognitive abilities — memory, attention span, concentration, following directions, spatial reasoning. No syllabus — it tests natural aptitude.',
          'Document Verification: Original certificates, caste certificate, medical fitness certificate.',
          'Medical Standards: Visual acuity 6/6 in both eyes without glasses, no color blindness (Ishihara test). Hearing should be normal. This is strictly enforced — get your eyes tested before applying.',
        ],
      },
      {
        heading: 'CBT-2 Subject-Wise Strategy',
        bullets: [
          'Mathematics (35 questions): Number System, BODMAS, HCF/LCM, Ratio, Percentage, Profit & Loss, SI/CI, Time-Work-Speed, Mensuration, Algebra basics, Trigonometry basics. Level is higher than CBT-1.',
          'Reasoning (35 questions): Analogies, Coding-Decoding, Syllogism, Venn Diagrams, Blood Relations, Series, Statement-Conclusion, Data Sufficiency, Non-verbal (paper cutting, mirror image).',
          'General Awareness (50 questions): Indian History (Ancient, Medieval, Modern), Geography, Polity, Economy, General Science, Current Affairs (last 12 months), Computer basics, Sports, Awards.',
          'Railway-specific GK: Indian Railway history, zones (18 zones), divisions, Railway Budget, recent railway projects (Vande Bharat, Kavach, Dedicated Freight Corridor), Railway Board chairman.',
          'Current Affairs weightage is 15-20 questions. Read monthly current affairs capsules from Adda247 or GradeUp.',
        ],
      },
      {
        heading: 'CBAT — The Unique Challenge',
        bullets: [
          'CBAT is only for Station Master (not for other NTPC posts). It tests aptitude, not knowledge. You cannot "study" for it in the traditional sense.',
          'Test areas: Following Directions (signals, sequences), Concentration (tracking moving objects), Spatial Reasoning (3D visualization), Memory (remembering patterns and numbers).',
          'Practice: Play memory games, Sudoku, chess, pattern recognition puzzles. Train your brain to hold multiple pieces of information simultaneously.',
          'Online simulators: Some coaching websites offer CBAT practice tests. Take at least 10-15 practice sessions to understand the interface and question types.',
          'Minimum qualifying score in CBAT: 42 out of 70. Candidates who score below this are eliminated regardless of CBT-2 rank.',
        ],
      },
      {
        heading: 'Preparation Timeline and Resources',
        bullets: [
          'Month 1-2: Complete syllabus — Maths (RS Aggarwal), Reasoning (Kiran Prakashan), GK (Lucent). Focus on basics and concept clarity.',
          'Month 3: Previous year papers — solve RRB NTPC 2019, 2021, 2024 papers. Identify repeated topics and question patterns.',
          'Month 4: Mock tests — 1 full mock per day. Analyze time spent per section. Target: Maths 30/35, Reasoning 30/35, GK 40/50.',
          'Last 2 weeks: Revision + current affairs + CBAT practice. Do not start any new topic.',
          'Medical preparation: Get eyes tested 6 months before exam. If you have minor vision issues, consult an ophthalmologist early. Color blindness is a permanent disqualification for Station Master.',
        ],
      },
    ],
  },
  {
    slug: 'ibps-po-interview-preparation-tips',
    title: 'IBPS PO Interview Preparation — Tips for 7565 Vacancies',
    description:
      'Complete interview preparation guide for IBPS PO 7565 vacancies. Covers common interview questions, banking awareness, personal introduction, current affairs, and dos and donts.',
    readTime: '9 min read',
    category: 'Banking',
    categoryColor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300',
    updated: '2026-10-27',
    body: [
      {
        paragraphs: [
          'Clearing IBPS PO Prelims and Mains is only two-thirds of the battle — the interview carries 100 marks and plays a decisive role in the final merit list. With 7,565 PO vacancies across 11 participating banks, the interview is your chance to stand out. Unlike written exams, the interview tests your personality, communication skills, banking awareness, and ability to think on your feet. Here is a complete guide to ace the IBPS PO interview.',
        ],
      },
      {
        heading: 'Interview Format and Marking',
        bullets: [
          'Panel: 3-5 members (usually bank officials and RBI/IBPS nominee). Duration: 15-25 minutes.',
          'Total marks: 100 (earlier it was 100, some banks now use scaled scores). Minimum qualifying marks: 40% (Gen), 35% (Reserved).',
          'Final merit: 80% Mains + 20% Interview. If your Mains score is 100/200 and interview is 70/100, final = 80 + 14 = 94.',
          'The panel evaluates: Communication skills, Banking knowledge, Current awareness, Problem-solving ability, Personality and confidence.',
          'Dress code: Formal — men should wear a light-colored shirt with tie and dark trousers. Women should wear a formal saree or salwar suit. No jeans, no casual wear.',
        ],
      },
      {
        heading: 'Personal Introduction — The First 3 Minutes',
        bullets: [
          'Prepare a crisp 2-minute introduction: Name, hometown, education, work experience (if any), hobbies, why banking, and one unique fact about yourself.',
          'Structure: "Good morning, I am [Name] from [City]. I completed [Degree] from [College] in [Year]. I am passionate about banking because [reason]. In my free time, I [hobby]. I believe my [strength] makes me suitable for a career in banking."',
          'Do NOT memorize word-for-word — it sounds robotic. Know the key points and speak naturally.',
          'Every word in your introduction is potential follow-up question material. Only mention hobbies/experiences you can discuss in depth.',
          'If you have work experience, mention it with specific achievements. "I worked at [Company] for 2 years where I handled [responsibility] and achieved [result]."',
        ],
      },
      {
        heading: 'Banking Knowledge — Must-Know Topics',
        bullets: [
          'RBI basics: Functions of RBI, monetary policy tools (Repo rate, Reverse Repo, CRR, SLR, MSF), current rates, RBI Governor and Deputy Governors.',
          'Banking terms: NPA (Non-Performing Asset), CASA ratio, Basel III norms, Priority Sector Lending (40% for domestic banks), KYC/AML, NEFT/RTGS/IMPS/UPI.',
          'Recent banking news: Latest bank mergers, new bank licenses, digital banking developments, RBI circulars in last 3 months.',
          'Government schemes: PM Jan Dhan Yojana, PM Mudra Yojana, Stand-Up India, PM SVANidhi, Atal Pension Yojana. Know the purpose, eligibility, and target beneficiaries.',
          'Your preferred bank: Research the specific bank you want (SBI, PNB, BOB, etc.). Know its headquarters, CEO/MD, tagline, recent financial performance, and any recent news.',
        ],
      },
      {
        heading: 'Common Interview Questions and How to Answer',
        bullets: [
          '"Why banking?" — "Banking is the backbone of the Indian economy. As a PO, I can contribute to financial inclusion and help people access credit and savings. The structured career growth from PO to AGM/DGM over 15-20 years is also very motivating."',
          '"Why not private sector/IT?" — "I value job security, structured growth, and public service. Government banking offers work-life balance and the chance to serve rural India through branch postings."',
          '"What is NPA?" — "A loan account where interest/installment is overdue for more than 90 days. NPAs are classified as Sub-standard (up to 12 months), Doubtful (12-36 months), and Loss assets. As of latest data, gross NPA ratio of scheduled commercial banks is around 3-4%."',
          '"Where do you see yourself in 5 years?" — "I see myself as a Branch Manager handling a team and driving business targets. I want to specialize in credit appraisal and help MSMEs access formal banking."',
          '"Any questions for us?" — Always ask one thoughtful question: "What are the most important qualities you look for in a new Probationary Officer?" or "How is the bank adapting to digital banking transformation?"',
        ],
      },
    ],
  },
  {
    slug: 'government-exam-time-management-tips',
    title: 'Time Management During Competitive Exams — Proven Strategies',
    description:
      'Practical time management strategies for government exam aspirants. Learn how to manage exam day time, daily study schedule, and long-term preparation planning for SSC, Banking, Railway, and UPSC.',
    readTime: '8 min read',
    category: 'Strategy',
    categoryColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300',
    updated: '2026-10-27',
    body: [
      {
        paragraphs: [
          'Time management is the number one skill that separates candidates who clear competitive exams from those who do not. It is not about studying 16 hours a day — it is about studying the right things at the right time with the right intensity. This guide covers three levels of time management: exam-day strategy, daily study schedule, and long-term preparation planning.',
        ],
      },
      {
        heading: 'Exam-Day Time Management',
        bullets: [
          'Rule of 60-30-10: Spend 60% of exam time on questions you can solve confidently, 30% on questions you can solve with some effort, and 10% reviewing your answers.',
          'First scan (5 minutes): Quickly scroll through all questions. Mark easy, medium, and hard questions mentally. This prevents panic when you encounter difficult questions later.',
          'Per-question time limit: Calculate time per question before the exam. 60-minute exam with 100 questions = 36 seconds per question. If stuck for more than 50 seconds, mark and move on.',
          'Section order: Start with your strongest section. Confidence from early correct answers improves performance in remaining sections. Never start with your weakest section.',
          'Last 10 minutes: Review marked questions. For negative marking exams, only attempt marked questions if you can eliminate at least 2 options. For no-negative exams, attempt everything.',
        ],
      },
      {
        heading: 'Daily Study Schedule — The 6-Hour Effective Study Plan',
        bullets: [
          'Quality over quantity: 6 focused hours beat 12 distracted hours. Use the Pomodoro technique — 50 minutes study, 10 minutes break, repeat.',
          'Morning (6 AM - 8 AM): Study new concepts when your brain is freshest. This is the best time for Maths, Reasoning, and complex topics.',
          'Mid-morning (9 AM - 11 AM): Practice previous year questions on the topics you studied in the morning. Solving problems cements understanding.',
          'Afternoon (2 PM - 4 PM): GK, Current Affairs, and revision. Afternoon energy is lower, so lighter subjects work better here.',
          'Evening (6 PM - 7 PM): One mock test or sectional test. Analyze mistakes for 30 minutes after the test.',
          'Night (9 PM - 10 PM): Revise the day\'s notes and read current affairs. Do NOT study new topics at night — it disrupts sleep and retention.',
        ],
      },
      {
        heading: 'Long-Term Planning — The 90-Day Framework',
        bullets: [
          'Days 1-30 (Foundation Phase): Complete 100% of syllabus basics. One topic per day. No mock tests yet — just study and solve chapter-end exercises.',
          'Days 31-60 (Practice Phase): Solve previous year papers topic-wise. Take 2 sectional tests per day. Identify weak areas and allocate extra time to them.',
          'Days 61-80 (Mock Test Phase): One full-length mock per day. Analyze for 2 hours after each mock. Maintain error log. Stop studying new topics.',
          'Days 81-90 (Revision Phase): Revise short notes, formula sheets, current affairs. Take 2 mocks per day. Sleep 7+ hours. No new study material.',
          'Weekly review: Every Sunday, review the week — what went well, what did not, what to change next week. Adjust schedule based on actual performance, not feelings.',
        ],
      },
      {
        heading: 'Common Time Wasters to Eliminate',
        bullets: [
          'Collecting resources instead of studying: Stop downloading PDFs you will never read. Pick one book per subject and finish it before buying another.',
          'Social media during study hours: Use app blockers (Forest, Stay Focused) during study time. One Instagram scroll can waste 30+ minutes without you realizing.',
          'Studying easy topics repeatedly: Comfort studying feels productive but is not. Spend more time on weak topics — that is where the marks are.',
          'Group study without structure: Group study works only with a specific agenda. "Let us study together" usually becomes "Let us chat for 3 hours." Study alone, discuss doubts in groups.',
          'Not sleeping enough: Sleep deprivation reduces retention by 40%. Eight hours of sleep is non-negotiable. Your brain consolidates memory during deep sleep — skipping it is counterproductive.',
        ],
      },
    ],
  },
  {
    slug: 'physical-fitness-test-preparation-guide',
    title: 'Physical Fitness Test Preparation — Complete Guide for Police, Army & CAPF Exams',
    description:
      'Detailed physical fitness test preparation guide for Police Constable, SI, CAPF, Army, SSB, and NDA. Covers running, long jump, high jump, shot put, and endurance training with week-by-week plans.',
    readTime: '12 min read',
    category: 'Police',
    categoryColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
    updated: '2026-10-27',
    body: [
      {
        paragraphs: [
          'Physical fitness tests eliminate more candidates than written exams in Police, Army, and CAPF recruitments. Thousands of candidates who clear the written exam fail in running, long jump, or high jump — not because they lack ability, but because they did not train systematically. This guide covers physical test requirements across major exams and provides a structured 12-week training plan to help you clear any PET.',
        ],
      },
      {
        heading: 'Physical Test Standards Across Major Exams',
        bullets: [
          'UP Police Constable: Male — 4.8 km in 25 min, Female — 2.4 km in 14 min. No long jump or shot put.',
          'SSC GD Constable: Male — 5 km in 24 min, Female — 1.6 km in 8.5 min.',
          'CAPF (AC/SI): Male — 100m in 16 sec, 800m in 2 min 45 sec, Long Jump 3.5m, Shot Put 4.5m. Female — 100m in 18 sec, 800m in 3 min 30 sec, Long Jump 2.5m, Shot Put 3m.',
          'Delhi Police Constable: Male — 1600m in 6 min 30 sec, Long Jump 13 feet, High Jump 3 feet 9 inches. Female — 800m in 4 min, Long Jump 9 feet, High Jump 3 feet.',
          'Indian Army Soldier GD: 1.6 km in 5 min 30 sec, Pull-ups (minimum 6), 9 feet ditch jump, Zig-zag balance. Very strict standards — practice daily.',
        ],
      },
      {
        heading: '12-Week Running Training Plan',
        bullets: [
          'Weeks 1-2 (Base Building): Run 2-3 km at comfortable pace daily. Focus on completing the distance without stopping. Speed does not matter yet. Warm up with 5-minute walk + dynamic stretches.',
          'Weeks 3-4 (Distance Building): Increase to 4-5 km daily. Maintain a conversational pace (you should be able to talk while running). Add 500m per week.',
          'Weeks 5-6 (Speed Introduction): Introduce interval training twice a week — 400m sprint + 200m jog, repeat 6-8 times. Other days, maintain 5 km easy runs.',
          'Weeks 7-8 (Race Pace Training): Run at target pace for 3 km, then slow down for remaining distance. Example: If target is 5 km in 24 min, run first 3 km at 4:48/km pace.',
          'Weeks 9-10 (Peak Training): Run full distance at target pace 3 times a week. Add 100m sprints (10 reps) for finishing speed. Include one long slow run (8-10 km) per week for endurance.',
          'Weeks 11-12 (Tapering): Reduce volume by 40%. Run shorter distances at race pace. Rest 2 days before the actual PET. Keep body fresh and avoid injuries.',
        ],
      },
      {
        heading: 'Long Jump, High Jump & Shot Put Training',
        bullets: [
          'Long Jump: Practice approach run (12-16 steps), take-off from the board, and landing on both feet. Key: Speed of approach run determines distance. Sprint speed + explosive takeoff = longer jump.',
          'Exercises for long jump: Box jumps (3 sets × 10), single-leg hops (3 × 15 each leg), standing broad jump (practice daily, target 2.5m+), lunges with weight.',
          'High Jump (Scissors technique for beginners): Approach at 30-degree angle, take off from the foot farther from the bar, swing the lead leg up, scissor over the bar.',
          'Shot Put: Stand sideways to the throwing area, hold the shot at neck/chin level, push (do not throw) the shot using shoulder and arm extension. Power comes from legs and core rotation.',
          'Exercises for shot put: Push-ups (4 × 25), medicine ball throws, shoulder press with dumbbells, core exercises (planks, Russian twists). Upper body strength is critical.',
        ],
      },
      {
        heading: 'Diet and Recovery for Physical Training',
        bullets: [
          'Pre-workout (30 min before): 2 bananas + 10 almonds OR 2 rotis with peanut butter. You need carbs for energy.',
          'Post-workout (within 30 min): 4 egg whites + 2 whole eggs + 1 glass milk OR protein shake. Post-workout protein repairs muscle damage.',
          'Daily diet: 4-5 meals per day. Each meal should have protein (dal, eggs, paneer, chicken), complex carbs (roti, rice, oats), and vegetables. Total daily protein: at least 1g per kg of body weight.',
          'Hydration: Drink 3-4 liters of water daily. During running, drink 200ml water every 20 minutes. Dehydration reduces performance by 20% and increases injury risk.',
          'Rest days: Take 1 full rest day per week. Sleep 7-8 hours daily. Muscles grow during rest, not during exercise. Overtraining leads to injuries and burnout.',
          'Common injuries: Shin splints (ice + rest + proper shoes), knee pain (strengthen quadriceps, do not run on concrete), ankle sprain (ankle rotation exercises daily). If pain persists for more than 3 days, see a physiotherapist.',
        ],
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
