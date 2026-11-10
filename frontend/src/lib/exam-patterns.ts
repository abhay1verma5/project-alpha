// Exam patterns for every exam in the PYQ bank.
//
// Section weightage is derived from the official marks split (marks ÷ total), so
// it is exact for the pattern given. Patterns change; `checked` is the date the
// entry was last compared with the official notification. Anything marked
// `approx: true` was filled from the most recent notification we could find and
// should be re-checked before an exam cycle.

export interface Section {
  name: string;
  questions: number;
  marks: number;
}

export interface Stage {
  name: string;
  mode: 'CBT' | 'OMR' | 'Written' | 'PET/PST' | 'Interview' | 'Skill' | 'Descriptive';
  duration: string;
  negative: string;
  sections: Section[];
  note?: string;
}

export interface ExamPattern {
  key: string; // matches pyq ExamType
  name: string;
  body: string;
  level: '10th' | '12th' | 'Graduate' | 'Postgraduate' | 'Diploma' | 'School';
  frequency: string;
  ageLimit?: string;
  stages: Stage[];
  checked: string;
  approx?: boolean;
  weightageSlug?: string; // /topic-weightage/[slug] if a topic-level analysis exists
}

const cbt = (name: string, duration: string, negative: string, sections: Section[], note?: string): Stage => ({
  name, mode: 'CBT', duration, negative, sections, note,
});

export const EXAM_PATTERNS: ExamPattern[] = [
  // ─── SSC ───────────────────────────────────────────────
  {
    key: 'ssc_cgl', name: 'SSC CGL', body: 'Staff Selection Commission', level: 'Graduate', frequency: 'Yearly', ageLimit: '18–32 (post-wise)',
    checked: '2026-10-19', weightageSlug: 'ssc-cgl',
    stages: [
      cbt('Tier 1', '60 min', '0.50 per wrong', [
        { name: 'General Intelligence & Reasoning', questions: 25, marks: 50 },
        { name: 'General Awareness', questions: 25, marks: 50 },
        { name: 'Quantitative Aptitude', questions: 25, marks: 50 },
        { name: 'English Comprehension', questions: 25, marks: 50 },
      ], 'Qualifying for most posts; Tier 2 decides merit.'),
      cbt('Tier 2 Paper 1', '2 h 30 min', '1 per wrong', [
        { name: 'Mathematical Abilities', questions: 30, marks: 90 },
        { name: 'Reasoning & General Intelligence', questions: 30, marks: 90 },
        { name: 'English Language & Comprehension', questions: 45, marks: 135 },
        { name: 'General Awareness', questions: 25, marks: 75 },
        { name: 'Computer Knowledge', questions: 20, marks: 60 },
      ], 'Plus a qualifying Data Entry Speed Test. Paper 2 (Statistics) only for JSO.'),
    ],
  },
  {
    key: 'ssc_chsl', name: 'SSC CHSL', body: 'Staff Selection Commission', level: '12th', frequency: 'Yearly', ageLimit: '18–27',
    checked: '2026-10-19', weightageSlug: 'ssc-chsl',
    stages: [
      cbt('Tier 1', '60 min', '0.50 per wrong', [
        { name: 'General Intelligence', questions: 25, marks: 50 },
        { name: 'General Awareness', questions: 25, marks: 50 },
        { name: 'Quantitative Aptitude', questions: 25, marks: 50 },
        { name: 'English Language', questions: 25, marks: 50 },
      ]),
      cbt('Tier 2', '2 h 15 min', '1 per wrong', [
        { name: 'Mathematical Abilities', questions: 30, marks: 90 },
        { name: 'Reasoning', questions: 30, marks: 90 },
        { name: 'English Language', questions: 40, marks: 120 },
        { name: 'General Awareness', questions: 20, marks: 60 },
        { name: 'Computer Knowledge', questions: 15, marks: 45 },
      ], 'Plus qualifying typing / DEST.'),
    ],
  },
  {
    key: 'ssc_mts', name: 'SSC MTS & Havaldar', body: 'Staff Selection Commission', level: '10th', frequency: 'Yearly', ageLimit: '18–25 (27 for some posts)',
    checked: '2026-10-19', weightageSlug: 'ssc-mts',
    stages: [
      cbt('Session 1 (qualifying)', '45 min', 'None', [
        { name: 'Numerical & Mathematical Ability', questions: 20, marks: 60 },
        { name: 'Reasoning Ability & Problem Solving', questions: 20, marks: 60 },
      ]),
      cbt('Session 2 (merit)', '45 min', '1 per wrong', [
        { name: 'General Awareness', questions: 25, marks: 75 },
        { name: 'English Language & Comprehension', questions: 25, marks: 75 },
      ], 'Havaldar posts also need PET/PST.'),
    ],
  },
  {
    key: 'ssc_gd', name: 'SSC GD Constable', body: 'Staff Selection Commission (CAPFs, SSF, Assam Rifles)', level: '10th', frequency: 'Yearly', ageLimit: '18–23',
    checked: '2026-10-19', weightageSlug: 'ssc-gd',
    stages: [
      cbt('CBT', '60 min', '0.25 per wrong', [
        { name: 'General Intelligence & Reasoning', questions: 20, marks: 40 },
        { name: 'General Knowledge & Awareness', questions: 20, marks: 40 },
        { name: 'Elementary Mathematics', questions: 20, marks: 40 },
        { name: 'English / Hindi', questions: 20, marks: 40 },
      ]),
      { name: 'PET / PST', mode: 'PET/PST', duration: '—', negative: '—', sections: [], note: '5 km run in 24 min (men) / 1.6 km in 8½ min (women); height and chest standards.' },
    ],
  },
  {
    key: 'ssc_cpo', name: 'SSC CPO (SI in Delhi Police & CAPFs)', body: 'Staff Selection Commission', level: 'Graduate', frequency: 'Yearly', ageLimit: '20–25',
    checked: '2026-10-19', weightageSlug: 'ssc-cpo',
    stages: [
      cbt('Paper 1', '2 h', '0.25 per wrong', [
        { name: 'General Intelligence & Reasoning', questions: 50, marks: 50 },
        { name: 'General Knowledge & Awareness', questions: 50, marks: 50 },
        { name: 'Quantitative Aptitude', questions: 50, marks: 50 },
        { name: 'English Comprehension', questions: 50, marks: 50 },
      ]),
      { name: 'PET / PST', mode: 'PET/PST', duration: '—', negative: '—', sections: [] },
      cbt('Paper 2', '2 h', '0.25 per wrong', [{ name: 'English Language & Comprehension', questions: 200, marks: 200 }]),
    ],
  },
  {
    key: 'ssc_je', name: 'SSC JE', body: 'Staff Selection Commission', level: 'Diploma', frequency: 'Yearly', ageLimit: 'Up to 30/32 (post-wise)',
    checked: '2026-10-19', weightageSlug: 'ssc-je',
    stages: [
      cbt('Paper 1', '2 h', '0.25 per wrong', [
        { name: 'General Intelligence & Reasoning', questions: 50, marks: 50 },
        { name: 'General Awareness', questions: 50, marks: 50 },
        { name: 'Engineering (Civil / Electrical / Mechanical)', questions: 100, marks: 100 },
      ]),
      cbt('Paper 2', '2 h', '1 per wrong', [{ name: 'Engineering (discipline-specific)', questions: 100, marks: 300 }]),
    ],
  },
  {
    key: 'ssc_steno', name: 'SSC Stenographer Grade C & D', body: 'Staff Selection Commission', level: '12th', frequency: 'Yearly', ageLimit: '18–27 (C) / 18–30 (D)',
    checked: '2026-10-19', weightageSlug: 'ssc-steno',
    stages: [
      cbt('CBT', '2 h', '0.25 per wrong', [
        { name: 'General Intelligence & Reasoning', questions: 50, marks: 50 },
        { name: 'General Awareness', questions: 50, marks: 50 },
        { name: 'English Language & Comprehension', questions: 100, marks: 100 },
      ]),
      { name: 'Skill test (dictation)', mode: 'Skill', duration: '10 min dictation', negative: '—', sections: [], note: '100 wpm (Grade C) / 80 wpm (Grade D), then transcription.' },
    ],
  },

  // ─── UPSC ──────────────────────────────────────────────
  {
    key: 'upsc_prelims', name: 'UPSC Civil Services Prelims', body: 'Union Public Service Commission', level: 'Graduate', frequency: 'Yearly', ageLimit: '21–32 (Gen), 6 attempts',
    checked: '2026-10-19', weightageSlug: 'upsc-cse',
    stages: [
      { name: 'GS Paper I', mode: 'OMR', duration: '2 h', negative: '1/3 of marks per wrong', sections: [{ name: 'General Studies', questions: 100, marks: 200 }] },
      { name: 'GS Paper II (CSAT)', mode: 'OMR', duration: '2 h', negative: '1/3 of marks per wrong', sections: [{ name: 'Aptitude, comprehension, reasoning', questions: 80, marks: 200 }], note: 'Qualifying: 33% (66 marks).' },
    ],
  },
  {
    key: 'upsc_mains', name: 'UPSC Civil Services Mains', body: 'Union Public Service Commission', level: 'Graduate', frequency: 'Yearly',
    checked: '2026-10-19',
    stages: [
      { name: 'Qualifying papers', mode: 'Descriptive', duration: '3 h each', negative: 'None', sections: [{ name: 'Paper A — Indian language', questions: 0, marks: 300 }, { name: 'Paper B — English', questions: 0, marks: 300 }], note: '25% needed; marks not counted.' },
      { name: 'Merit papers', mode: 'Descriptive', duration: '3 h each', negative: 'None', sections: [
        { name: 'Essay', questions: 2, marks: 250 },
        { name: 'GS I (History, Geography, Society)', questions: 20, marks: 250 },
        { name: 'GS II (Polity, Governance, IR)', questions: 20, marks: 250 },
        { name: 'GS III (Economy, Environment, S&T, Security)', questions: 20, marks: 250 },
        { name: 'GS IV (Ethics)', questions: 12, marks: 250 },
        { name: 'Optional Paper I', questions: 8, marks: 250 },
        { name: 'Optional Paper II', questions: 8, marks: 250 },
      ] },
      { name: 'Personality test', mode: 'Interview', duration: '—', negative: '—', sections: [{ name: 'Interview', questions: 0, marks: 275 }] },
    ],
  },
  {
    key: 'nda', name: 'NDA & NA', body: 'UPSC', level: '12th', frequency: 'Twice a year', ageLimit: '16.5–19.5',
    checked: '2026-10-19', weightageSlug: 'nda',
    stages: [
      { name: 'Written', mode: 'OMR', duration: '2 h 30 min each', negative: '1/3 of marks per wrong', sections: [
        { name: 'Mathematics', questions: 120, marks: 300 },
        { name: 'General Ability Test (English 200 + GK 400)', questions: 150, marks: 600 },
      ] },
      { name: 'SSB Interview', mode: 'Interview', duration: '5 days', negative: '—', sections: [{ name: 'SSB', questions: 0, marks: 900 }] },
    ],
  },
  {
    key: 'cds', name: 'CDS', body: 'UPSC', level: 'Graduate', frequency: 'Twice a year', ageLimit: '20–24 (IMA) / 20–25 (OTA)',
    checked: '2026-10-19', weightageSlug: 'cds',
    stages: [
      { name: 'Written (IMA/INA/AFA)', mode: 'OMR', duration: '2 h each', negative: '1/3 of marks per wrong', sections: [
        { name: 'English', questions: 120, marks: 100 },
        { name: 'General Knowledge', questions: 120, marks: 100 },
        { name: 'Elementary Mathematics', questions: 100, marks: 100 },
      ], note: 'OTA candidates write only English and GK.' },
      { name: 'SSB Interview', mode: 'Interview', duration: '5 days', negative: '—', sections: [{ name: 'SSB', questions: 0, marks: 300 }] },
    ],
  },
  {
    key: 'capf', name: 'CAPF (Assistant Commandant)', body: 'UPSC', level: 'Graduate', frequency: 'Yearly', ageLimit: '20–25',
    checked: '2026-10-19', weightageSlug: 'capf-ac',
    stages: [
      { name: 'Paper I', mode: 'OMR', duration: '2 h', negative: '1/3 of marks per wrong', sections: [{ name: 'General Ability & Intelligence', questions: 125, marks: 250 }] },
      { name: 'Paper II', mode: 'Descriptive', duration: '3 h', negative: 'None', sections: [{ name: 'General Studies, Essay & Comprehension', questions: 0, marks: 200 }] },
      { name: 'PET / Medical / Interview', mode: 'Interview', duration: '—', negative: '—', sections: [{ name: 'Interview', questions: 0, marks: 150 }] },
    ],
  },
  {
    key: 'afcat', name: 'AFCAT', body: 'Indian Air Force', level: 'Graduate', frequency: 'Twice a year', ageLimit: '20–24 (Flying) / 20–26 (Ground)',
    checked: '2026-10-19', weightageSlug: 'afcat',
    stages: [
      cbt('AFCAT', '2 h', '1 per wrong', [
        { name: 'General Awareness', questions: 20, marks: 60 },
        { name: 'Verbal Ability in English', questions: 30, marks: 90 },
        { name: 'Numerical Ability', questions: 15, marks: 45 },
        { name: 'Reasoning & Military Aptitude', questions: 35, marks: 105 },
      ]),
      cbt('EKT (technical only)', '45 min', '1 per wrong', [{ name: 'Engineering Knowledge Test', questions: 50, marks: 150 }]),
      { name: 'AFSB', mode: 'Interview', duration: '5 days', negative: '—', sections: [] },
    ],
  },
  {
    key: 'ese', name: 'UPSC ESE (Engineering Services)', body: 'UPSC', level: 'Graduate', frequency: 'Yearly', ageLimit: '21–30',
    checked: '2026-10-19', weightageSlug: 'upsc-ese',
    stages: [
      { name: 'Prelims', mode: 'OMR', duration: '2 h + 3 h', negative: '1/3 of marks per wrong', sections: [
        { name: 'Paper I — General Studies & Engineering Aptitude', questions: 100, marks: 200 },
        { name: 'Paper II — Engineering discipline', questions: 150, marks: 300 },
      ] },
      { name: 'Mains', mode: 'Descriptive', duration: '3 h each', negative: 'None', sections: [{ name: 'Paper I', questions: 0, marks: 300 }, { name: 'Paper II', questions: 0, marks: 300 }] },
      { name: 'Personality test', mode: 'Interview', duration: '—', negative: '—', sections: [{ name: 'Interview', questions: 0, marks: 200 }] },
    ],
  },

  // ─── Railways ──────────────────────────────────────────
  {
    key: 'rrb_ntpc', name: 'RRB NTPC', body: 'Railway Recruitment Boards', level: '12th', frequency: 'Every 2–3 years', ageLimit: '18–30 (UG) / 18–33 (Graduate)',
    checked: '2026-10-19', weightageSlug: 'rrb-ntpc',
    stages: [
      cbt('CBT 1', '90 min', '1/3 per wrong', [
        { name: 'Mathematics', questions: 30, marks: 30 },
        { name: 'General Intelligence & Reasoning', questions: 30, marks: 30 },
        { name: 'General Awareness', questions: 40, marks: 40 },
      ]),
      cbt('CBT 2', '90 min', '1/3 per wrong', [
        { name: 'Mathematics', questions: 35, marks: 35 },
        { name: 'General Intelligence & Reasoning', questions: 35, marks: 35 },
        { name: 'General Awareness', questions: 50, marks: 50 },
      ], 'Then typing / CBAT for specific posts.'),
    ],
  },
  {
    key: 'rrb_group_d', name: 'RRB Group D (Level 1)', body: 'Railway Recruitment Boards', level: '10th', frequency: 'Every 2–3 years', ageLimit: '18–33',
    checked: '2026-10-19', weightageSlug: 'rrb-group-d',
    stages: [
      cbt('CBT', '90 min', '1/3 per wrong', [
        { name: 'General Science', questions: 25, marks: 25 },
        { name: 'Mathematics', questions: 25, marks: 25 },
        { name: 'General Intelligence & Reasoning', questions: 30, marks: 30 },
        { name: 'General Awareness & Current Affairs', questions: 20, marks: 20 },
      ]),
      { name: 'PET', mode: 'PET/PST', duration: '—', negative: '—', sections: [], note: 'Lift 35 kg for 100 m (men) / 20 kg (women); 1 km run.' },
    ],
  },
  {
    key: 'rrb_alp', name: 'RRB ALP (Assistant Loco Pilot)', body: 'Railway Recruitment Boards', level: '10th', frequency: 'Every 2–3 years', ageLimit: '18–30',
    checked: '2026-10-19', weightageSlug: 'rrb-alp',
    stages: [
      cbt('CBT 1', '60 min', '1/3 per wrong', [
        { name: 'Mathematics', questions: 20, marks: 20 },
        { name: 'General Intelligence & Reasoning', questions: 25, marks: 25 },
        { name: 'General Science', questions: 20, marks: 20 },
        { name: 'General Awareness & Current Affairs', questions: 10, marks: 10 },
      ]),
      cbt('CBT 2', '2 h 30 min', '1/3 per wrong', [
        { name: 'Part A — Maths, Reasoning, Basic Science & Engg, GA', questions: 100, marks: 100 },
        { name: 'Part B — Trade (qualifying)', questions: 75, marks: 75 },
      ], 'Then Computer Based Aptitude Test (qualifying).'),
    ],
  },
  {
    key: 'rrb_je', name: 'RRB JE', body: 'Railway Recruitment Boards', level: 'Diploma', frequency: 'Every 2–3 years', ageLimit: '18–33',
    checked: '2026-10-19', weightageSlug: 'rrb-je',
    stages: [
      cbt('CBT 1', '90 min', '1/3 per wrong', [
        { name: 'Mathematics', questions: 30, marks: 30 },
        { name: 'General Intelligence & Reasoning', questions: 25, marks: 25 },
        { name: 'General Awareness', questions: 15, marks: 15 },
        { name: 'General Science', questions: 30, marks: 30 },
      ]),
      cbt('CBT 2', '2 h', '1/3 per wrong', [
        { name: 'General Awareness', questions: 15, marks: 15 },
        { name: 'Physics & Chemistry', questions: 15, marks: 15 },
        { name: 'Basics of Computers', questions: 10, marks: 10 },
        { name: 'Environment & Pollution Control', questions: 10, marks: 10 },
        { name: 'Technical Abilities', questions: 100, marks: 100 },
      ]),
    ],
  },
  {
    key: 'rpf', name: 'RPF Constable / SI', body: 'Railway Protection Force', level: '10th', frequency: 'Irregular', ageLimit: '18–28 (Constable) / 20–28 (SI)',
    checked: '2026-10-19',
    stages: [
      cbt('CBT', '90 min', '1/3 per wrong', [
        { name: 'General Awareness', questions: 50, marks: 50 },
        { name: 'Arithmetic', questions: 35, marks: 35 },
        { name: 'General Intelligence & Reasoning', questions: 35, marks: 35 },
      ]),
      { name: 'PET / PMT', mode: 'PET/PST', duration: '—', negative: '—', sections: [] },
    ],
  },

  // ─── Banking & insurance ───────────────────────────────
  {
    key: 'ibps_po', name: 'IBPS PO', body: 'IBPS', level: 'Graduate', frequency: 'Yearly', ageLimit: '20–30',
    checked: '2026-10-19', weightageSlug: 'ibps-po',
    stages: [
      cbt('Prelims', '60 min (20 each)', '0.25 per wrong', [
        { name: 'English Language', questions: 30, marks: 30 },
        { name: 'Quantitative Aptitude', questions: 35, marks: 35 },
        { name: 'Reasoning Ability', questions: 35, marks: 35 },
      ]),
      cbt('Mains', '3 h + 30 min descriptive', '0.25 per wrong', [
        { name: 'Reasoning & Computer Aptitude', questions: 45, marks: 60 },
        { name: 'General / Economy / Banking Awareness', questions: 40, marks: 40 },
        { name: 'English Language', questions: 35, marks: 40 },
        { name: 'Data Analysis & Interpretation', questions: 35, marks: 60 },
        { name: 'English (Letter & Essay)', questions: 2, marks: 25 },
      ]),
      { name: 'Interview', mode: 'Interview', duration: '—', negative: '—', sections: [{ name: 'Interview', questions: 0, marks: 100 }], note: 'Final: Mains 80 : Interview 20.' },
    ],
  },
  {
    key: 'ibps_clerk', name: 'IBPS Clerk', body: 'IBPS', level: 'Graduate', frequency: 'Yearly', ageLimit: '20–28',
    checked: '2026-10-19', weightageSlug: 'ibps-clerk',
    stages: [
      cbt('Prelims', '60 min (20 each)', '0.25 per wrong', [
        { name: 'English Language', questions: 30, marks: 30 },
        { name: 'Numerical Ability', questions: 35, marks: 35 },
        { name: 'Reasoning Ability', questions: 35, marks: 35 },
      ]),
      cbt('Mains', '160 min', '0.25 per wrong', [
        { name: 'General / Financial Awareness', questions: 50, marks: 50 },
        { name: 'General English', questions: 40, marks: 40 },
        { name: 'Reasoning & Computer Aptitude', questions: 50, marks: 60 },
        { name: 'Quantitative Aptitude', questions: 50, marks: 50 },
      ], 'No interview.'),
    ],
  },
  {
    key: 'ibps_so', name: 'IBPS SO', body: 'IBPS', level: 'Graduate', frequency: 'Yearly', ageLimit: '20–30',
    checked: '2026-10-19', weightageSlug: 'ibps-so', approx: true,
    stages: [
      cbt('Prelims', '2 h', '0.25 per wrong', [
        { name: 'English Language', questions: 50, marks: 25 },
        { name: 'Reasoning', questions: 50, marks: 50 },
        { name: 'Quantitative Aptitude / General Awareness (post-wise)', questions: 50, marks: 50 },
      ]),
      cbt('Mains', '45 min', '0.25 per wrong', [{ name: 'Professional Knowledge', questions: 60, marks: 60 }]),
      { name: 'Interview', mode: 'Interview', duration: '—', negative: '—', sections: [{ name: 'Interview', questions: 0, marks: 100 }] },
    ],
  },
  {
    key: 'sbi_po', name: 'SBI PO', body: 'State Bank of India', level: 'Graduate', frequency: 'Yearly', ageLimit: '21–30',
    checked: '2026-10-19', weightageSlug: 'sbi-po',
    stages: [
      cbt('Prelims', '60 min (20 each)', '0.25 per wrong', [
        { name: 'English Language', questions: 40, marks: 40 },
        { name: 'Quantitative Aptitude', questions: 30, marks: 30 },
        { name: 'Reasoning Ability', questions: 30, marks: 30 },
      ]),
      cbt('Mains', '3 h + 30 min descriptive', '0.25 per wrong', [
        { name: 'Reasoning & Computer Aptitude', questions: 40, marks: 50 },
        { name: 'Data Analysis & Interpretation', questions: 30, marks: 50 },
        { name: 'General / Economy / Banking Awareness', questions: 60, marks: 60 },
        { name: 'English Language', questions: 40, marks: 40 },
        { name: 'Descriptive (Letter & Essay)', questions: 2, marks: 50 },
      ]),
      { name: 'Psychometric + GD + Interview', mode: 'Interview', duration: '—', negative: '—', sections: [{ name: 'Phase III', questions: 0, marks: 50 }], note: 'Final: Mains 75 : Phase III 25.' },
    ],
  },
  {
    key: 'sbi_clerk', name: 'SBI Clerk (Junior Associate)', body: 'State Bank of India', level: 'Graduate', frequency: 'Yearly', ageLimit: '20–28',
    checked: '2026-10-19', weightageSlug: 'sbi-clerk',
    stages: [
      cbt('Prelims', '60 min (20 each)', '0.25 per wrong', [
        { name: 'English Language', questions: 30, marks: 30 },
        { name: 'Numerical Ability', questions: 35, marks: 35 },
        { name: 'Reasoning Ability', questions: 35, marks: 35 },
      ]),
      cbt('Mains', '2 h 40 min', '0.25 per wrong', [
        { name: 'General / Financial Awareness', questions: 50, marks: 50 },
        { name: 'General English', questions: 40, marks: 40 },
        { name: 'Quantitative Aptitude', questions: 50, marks: 50 },
        { name: 'Reasoning & Computer Aptitude', questions: 50, marks: 60 },
      ], 'Plus local-language test.'),
    ],
  },
  {
    key: 'rbi_grade_b', name: 'RBI Grade B (General)', body: 'Reserve Bank of India', level: 'Graduate', frequency: 'Yearly', ageLimit: '21–30',
    checked: '2026-10-19', weightageSlug: 'rbi-grade-b',
    stages: [
      cbt('Phase I', '2 h', '0.25 per wrong', [
        { name: 'General Awareness', questions: 80, marks: 80 },
        { name: 'English Language', questions: 30, marks: 30 },
        { name: 'Quantitative Aptitude', questions: 30, marks: 30 },
        { name: 'Reasoning', questions: 60, marks: 60 },
      ]),
      cbt('Phase II', '2 h each', '0.25 per wrong', [
        { name: 'Economic & Social Issues', questions: 0, marks: 100 },
        { name: 'English (descriptive)', questions: 0, marks: 100 },
        { name: 'Finance & Management', questions: 0, marks: 100 },
      ]),
      { name: 'Interview', mode: 'Interview', duration: '—', negative: '—', sections: [{ name: 'Interview', questions: 0, marks: 75 }] },
    ],
  },
  {
    key: 'rbi_assistant', name: 'RBI Assistant', body: 'Reserve Bank of India', level: 'Graduate', frequency: 'Yearly', ageLimit: '20–28',
    checked: '2026-10-19', weightageSlug: 'rbi-assistant',
    stages: [
      cbt('Prelims', '60 min', '0.25 per wrong', [
        { name: 'English Language', questions: 30, marks: 30 },
        { name: 'Numerical Ability', questions: 35, marks: 35 },
        { name: 'Reasoning Ability', questions: 35, marks: 35 },
      ]),
      cbt('Mains', '135 min', '0.25 per wrong', [
        { name: 'Reasoning', questions: 40, marks: 40 },
        { name: 'English Language', questions: 40, marks: 40 },
        { name: 'Numerical Ability', questions: 40, marks: 40 },
        { name: 'General Awareness', questions: 40, marks: 40 },
        { name: 'Computer Knowledge', questions: 40, marks: 40 },
      ], 'Plus language proficiency test.'),
    ],
  },
  {
    key: 'nabard', name: 'NABARD Grade A', body: 'NABARD', level: 'Graduate', frequency: 'Yearly', ageLimit: '21–30',
    checked: '2026-10-19', weightageSlug: 'nabard-grade-a', approx: true,
    stages: [
      cbt('Prelims', '2 h', '0.25 per wrong', [
        { name: 'Reasoning', questions: 20, marks: 20 },
        { name: 'English', questions: 30, marks: 30 },
        { name: 'Computer Knowledge', questions: 20, marks: 20 },
        { name: 'Quantitative Aptitude', questions: 20, marks: 20 },
        { name: 'Decision Making', questions: 10, marks: 10 },
        { name: 'General Awareness', questions: 20, marks: 20 },
        { name: 'Economic & Social Issues', questions: 40, marks: 40 },
        { name: 'Agriculture & Rural Development', questions: 40, marks: 40 },
      ]),
      cbt('Mains', '—', '0.25 per wrong', [{ name: 'Paper I English (descriptive)', questions: 0, marks: 100 }, { name: 'Paper II ESI & ARD / discipline', questions: 0, marks: 100 }]),
      { name: 'Interview', mode: 'Interview', duration: '—', negative: '—', sections: [{ name: 'Interview', questions: 0, marks: 50 }] },
    ],
  },
  {
    key: 'sebi', name: 'SEBI Grade A', body: 'SEBI', level: 'Graduate', frequency: 'Irregular', ageLimit: 'Up to 30',
    checked: '2026-10-19', weightageSlug: 'sebi-grade-a', approx: true,
    stages: [
      cbt('Phase I', '60 min each', '0.25 per wrong', [{ name: 'Paper 1 — GA, English, Quant, Reasoning', questions: 100, marks: 100 }, { name: 'Paper 2 — Stream', questions: 100, marks: 100 }]),
      cbt('Phase II', '—', '0.25 per wrong', [{ name: 'Paper 1 — English (descriptive)', questions: 0, marks: 100 }, { name: 'Paper 2 — Stream', questions: 0, marks: 100 }]),
      { name: 'Interview', mode: 'Interview', duration: '—', negative: '—', sections: [] },
    ],
  },
  {
    key: 'lic_aao', name: 'LIC AAO', body: 'Life Insurance Corporation', level: 'Graduate', frequency: 'Irregular', ageLimit: '21–30',
    checked: '2026-10-19', weightageSlug: 'lic-aao',
    stages: [
      cbt('Prelims', '60 min', '0.25 per wrong', [
        { name: 'Reasoning Ability', questions: 35, marks: 35 },
        { name: 'Quantitative Aptitude', questions: 35, marks: 35 },
        { name: 'English Language (qualifying)', questions: 30, marks: 30 },
      ]),
      cbt('Mains', '2 h 30 min', '0.25 per wrong', [
        { name: 'Reasoning', questions: 30, marks: 90 },
        { name: 'General Knowledge & Current Affairs', questions: 30, marks: 60 },
        { name: 'Data Analysis & Interpretation', questions: 30, marks: 90 },
        { name: 'Insurance & Financial Market Awareness', questions: 30, marks: 60 },
        { name: 'English (Letter & Essay)', questions: 2, marks: 25 },
      ]),
      { name: 'Interview', mode: 'Interview', duration: '—', negative: '—', sections: [] },
    ],
  },
  {
    key: 'lic_ado', name: 'LIC ADO', body: 'Life Insurance Corporation', level: 'Graduate', frequency: 'Irregular', ageLimit: '21–30',
    checked: '2026-10-19', approx: true,
    stages: [
      cbt('Prelims', '60 min', '0.25 per wrong', [
        { name: 'Reasoning', questions: 35, marks: 35 },
        { name: 'Numerical Ability', questions: 35, marks: 35 },
        { name: 'English Language (qualifying)', questions: 30, marks: 30 },
      ]),
      cbt('Mains', '2 h', '0.25 per wrong', [
        { name: 'Reasoning & Numerical Ability', questions: 50, marks: 50 },
        { name: 'General Knowledge, Current Affairs & English', questions: 50, marks: 50 },
        { name: 'Insurance & Marketing', questions: 60, marks: 60 },
      ]),
      { name: 'Interview', mode: 'Interview', duration: '—', negative: '—', sections: [] },
    ],
  },
  {
    key: 'niacl', name: 'NIACL AO', body: 'New India Assurance', level: 'Graduate', frequency: 'Irregular', ageLimit: '21–30',
    checked: '2026-10-19', approx: true,
    stages: [
      cbt('Prelims', '60 min', '0.25 per wrong', [{ name: 'English', questions: 30, marks: 30 }, { name: 'Reasoning', questions: 35, marks: 35 }, { name: 'Quantitative Aptitude', questions: 35, marks: 35 }]),
      cbt('Mains', '2 h + 30 min', '0.25 per wrong', [{ name: 'Reasoning, English, GA, Quant', questions: 200, marks: 200 }, { name: 'Descriptive English', questions: 2, marks: 30 }]),
      { name: 'Interview', mode: 'Interview', duration: '—', negative: '—', sections: [] },
    ],
  },
  {
    key: 'uiic', name: 'UIIC AO / Assistant', body: 'United India Insurance', level: 'Graduate', frequency: 'Irregular',
    checked: '2026-10-19', approx: true,
    stages: [
      cbt('Prelims', '60 min', '0.25 per wrong', [{ name: 'English', questions: 30, marks: 30 }, { name: 'Reasoning', questions: 35, marks: 35 }, { name: 'Quantitative Aptitude', questions: 35, marks: 35 }]),
      cbt('Mains', '2 h', '0.25 per wrong', [{ name: 'Reasoning, English, GA, Quant, Computers', questions: 200, marks: 200 }]),
    ],
  },
  {
    key: 'epfo', name: 'EPFO SSA / Stenographer', body: 'EPFO', level: 'Graduate', frequency: 'Irregular', ageLimit: '18–27',
    checked: '2026-10-19', weightageSlug: 'epfo-ssa', approx: true,
    stages: [
      cbt('Phase I', '2 h', '0.25 per wrong', [
        { name: 'General English', questions: 25, marks: 100 },
        { name: 'Reasoning', questions: 25, marks: 100 },
        { name: 'Quantitative Aptitude', questions: 25, marks: 100 },
        { name: 'General Awareness', questions: 25, marks: 100 },
      ]),
      { name: 'Phase II — Computer Data Entry Test', mode: 'Skill', duration: '—', negative: '—', sections: [] },
    ],
  },
  {
    key: 'fci', name: 'FCI Category III (Assistant Grade)', body: 'Food Corporation of India', level: 'Graduate', frequency: 'Irregular', ageLimit: '18–27',
    checked: '2026-10-19', approx: true,
    stages: [
      cbt('Phase I', '60 min', '0.25 per wrong', [
        { name: 'English Language', questions: 30, marks: 30 },
        { name: 'Reasoning Ability', questions: 35, marks: 35 },
        { name: 'Numerical Aptitude', questions: 35, marks: 35 },
      ]),
      cbt('Phase II', '90 min + post paper', '0.25 per wrong', [{ name: 'Paper I — Reasoning, DA, Computer, GA, English', questions: 120, marks: 120 }, { name: 'Paper II/III — post-specific', questions: 60, marks: 60 }]),
    ],
  },

  // ─── Teaching ──────────────────────────────────────────
  {
    key: 'ctet', name: 'CTET', body: 'CBSE', level: 'Graduate', frequency: 'Twice a year',
    checked: '2026-10-19', weightageSlug: 'ctet',
    stages: [
      { name: 'Paper I (Classes 1–5)', mode: 'OMR', duration: '2 h 30 min', negative: 'None', sections: [
        { name: 'Child Development & Pedagogy', questions: 30, marks: 30 },
        { name: 'Language I', questions: 30, marks: 30 },
        { name: 'Language II', questions: 30, marks: 30 },
        { name: 'Mathematics', questions: 30, marks: 30 },
        { name: 'Environmental Studies', questions: 30, marks: 30 },
      ], note: 'Qualifying: 60% (55% for reserved). Certificate valid for life.' },
      { name: 'Paper II (Classes 6–8)', mode: 'OMR', duration: '2 h 30 min', negative: 'None', sections: [
        { name: 'Child Development & Pedagogy', questions: 30, marks: 30 },
        { name: 'Language I', questions: 30, marks: 30 },
        { name: 'Language II', questions: 30, marks: 30 },
        { name: 'Maths & Science OR Social Studies', questions: 60, marks: 60 },
      ] },
    ],
  },
  {
    key: 'ugc_net', name: 'UGC NET', body: 'NTA', level: 'Postgraduate', frequency: 'Twice a year',
    checked: '2026-10-19', weightageSlug: 'ugc-net',
    stages: [
      cbt('Single session', '3 h', 'None', [
        { name: 'Paper I — Teaching & Research Aptitude', questions: 50, marks: 100 },
        { name: 'Paper II — Subject', questions: 100, marks: 200 },
      ]),
    ],
  },
  {
    key: 'kvs', name: 'KVS PRT / TGT / PGT', body: 'Kendriya Vidyalaya Sangathan', level: 'Graduate', frequency: 'Irregular',
    checked: '2026-10-19', weightageSlug: 'kvs-tgt-pgt', approx: true,
    stages: [
      cbt('Written (TGT/PGT pattern)', '3 h', 'None', [
        { name: 'Part I — GE, GK, Reasoning, Computers (common)', questions: 30, marks: 30 },
        { name: 'Part II — Perspectives on Education & Leadership', questions: 40, marks: 40 },
        { name: 'Part III — Subject', questions: 80, marks: 80 },
      ]),
      { name: 'Demo teaching + Interview', mode: 'Interview', duration: '—', negative: '—', sections: [] },
    ],
  },
  {
    key: 'dsssb', name: 'DSSSB (Teacher / Clerk posts)', body: 'Delhi Subordinate Services Selection Board', level: 'Graduate', frequency: 'Irregular',
    checked: '2026-10-19', weightageSlug: 'dsssb', approx: true,
    stages: [
      cbt('Tier 1 (common)', '2 h', '0.25 per wrong', [
        { name: 'General Awareness', questions: 20, marks: 20 },
        { name: 'Reasoning', questions: 20, marks: 20 },
        { name: 'Arithmetic & Numerical Ability', questions: 20, marks: 20 },
        { name: 'Hindi', questions: 20, marks: 20 },
        { name: 'English', questions: 20, marks: 20 },
        { name: 'Subject (teaching posts)', questions: 100, marks: 100 },
      ]),
    ],
  },
  { key: 'uptet', name: 'UPTET', body: 'UPBEB', level: 'Graduate', frequency: 'Irregular', checked: '2026-10-19', weightageSlug: 'uptet', stages: [
    { name: 'Paper I / II', mode: 'OMR', duration: '2 h 30 min', negative: 'None', sections: [
      { name: 'Child Development & Pedagogy', questions: 30, marks: 30 }, { name: 'Language I (Hindi)', questions: 30, marks: 30 },
      { name: 'Language II', questions: 30, marks: 30 }, { name: 'Maths & EVS (P-I) / Subject (P-II)', questions: 60, marks: 60 },
    ] } ] },
  { key: 'supertet', name: 'UP Super TET', body: 'UPBEB', level: 'Graduate', frequency: 'Irregular', checked: '2026-10-19', approx: true, stages: [
    { name: 'Written', mode: 'OMR', duration: '2 h 30 min', negative: 'None', sections: [
      { name: 'Language (Hindi, English, Sanskrit)', questions: 40, marks: 40 }, { name: 'Science', questions: 10, marks: 10 }, { name: 'Maths', questions: 20, marks: 20 },
      { name: 'Environment & Social Studies', questions: 10, marks: 10 }, { name: 'Teaching Methodology', questions: 10, marks: 10 }, { name: 'Child Psychology', questions: 10, marks: 10 },
      { name: 'General Knowledge & Current Affairs', questions: 30, marks: 30 }, { name: 'Logical Reasoning', questions: 5, marks: 5 }, { name: 'IT', questions: 5, marks: 5 }, { name: 'Life Skills', questions: 10, marks: 10 },
    ] } ] },
  { key: 'bihar_tet', name: 'Bihar STET / BTET', body: 'BSEB', level: 'Graduate', frequency: 'Irregular', checked: '2026-10-19', approx: true, stages: [
    cbt('Paper', '2 h 30 min', 'None', [{ name: 'Subject', questions: 100, marks: 100 }, { name: 'Teaching Aptitude, GK, Reasoning', questions: 50, marks: 50 }]) ] },
  { key: 'mptet', name: 'MP TET', body: 'MPESB', level: 'Graduate', frequency: 'Irregular', checked: '2026-10-19', approx: true, stages: [
    cbt('Paper', '2 h 30 min', 'None', [{ name: 'CDP', questions: 30, marks: 30 }, { name: 'Language I', questions: 30, marks: 30 }, { name: 'Language II', questions: 30, marks: 30 }, { name: 'Maths / Subject', questions: 30, marks: 30 }, { name: 'EVS / Subject', questions: 30, marks: 30 }]) ] },
  { key: 'reet', name: 'REET', body: 'RBSE', level: 'Graduate', frequency: 'Irregular', checked: '2026-10-19', stages: [
    { name: 'Level 1 / Level 2', mode: 'OMR', duration: '2 h 30 min', negative: 'None (1/3 for unattempted beyond 10%)', sections: [
      { name: 'CDP', questions: 30, marks: 30 }, { name: 'Language I', questions: 30, marks: 30 }, { name: 'Language II', questions: 30, marks: 30 }, { name: 'Maths & EVS / Subject', questions: 60, marks: 60 },
    ] } ] },
  { key: 'htet', name: 'HTET', body: 'BSEH', level: 'Graduate', frequency: 'Yearly', checked: '2026-10-19', approx: true, stages: [
    { name: 'Level 1/2/3', mode: 'OMR', duration: '2 h 30 min', negative: 'None', sections: [{ name: 'CDP', questions: 30, marks: 30 }, { name: 'Languages (Hindi + English)', questions: 30, marks: 30 }, { name: 'GK, Reasoning, Quant', questions: 30, marks: 30 }, { name: 'Subject', questions: 60, marks: 60 }] } ] },
  { key: 'otet', name: 'OTET', body: 'BSE Odisha', level: 'Graduate', frequency: 'Yearly', checked: '2026-10-19', approx: true, stages: [
    { name: 'Paper I / II', mode: 'OMR', duration: '2 h 30 min', negative: 'None', sections: [{ name: 'CDP', questions: 30, marks: 30 }, { name: 'Language I', questions: 30, marks: 30 }, { name: 'Language II', questions: 30, marks: 30 }, { name: 'Maths & EVS / Subject', questions: 60, marks: 60 }] } ] },
  { key: 'wb_tet', name: 'WB TET', body: 'WBBPE', level: 'Graduate', frequency: 'Irregular', checked: '2026-10-19', approx: true, stages: [
    { name: 'Paper', mode: 'OMR', duration: '2 h 30 min', negative: 'None', sections: [{ name: 'CDP', questions: 30, marks: 30 }, { name: 'Language I', questions: 30, marks: 30 }, { name: 'Language II', questions: 30, marks: 30 }, { name: 'Maths', questions: 30, marks: 30 }, { name: 'EVS', questions: 30, marks: 30 }] } ] },
  { key: 'tntet', name: 'TN TET', body: 'TRB Tamil Nadu', level: 'Graduate', frequency: 'Irregular', checked: '2026-10-19', approx: true, stages: [
    { name: 'Paper I / II', mode: 'OMR', duration: '3 h', negative: 'None', sections: [{ name: 'CDP', questions: 30, marks: 30 }, { name: 'Language I (Tamil)', questions: 30, marks: 30 }, { name: 'Language II (English)', questions: 30, marks: 30 }, { name: 'Maths & EVS / Subject', questions: 60, marks: 60 }] } ] },
  { key: 'kartet', name: 'KARTET', body: 'Karnataka School Education', level: 'Graduate', frequency: 'Irregular', checked: '2026-10-19', approx: true, stages: [
    { name: 'Paper I / II', mode: 'OMR', duration: '2 h 30 min', negative: 'None', sections: [{ name: 'CDP', questions: 30, marks: 30 }, { name: 'Language I', questions: 30, marks: 30 }, { name: 'Language II', questions: 30, marks: 30 }, { name: 'Maths & EVS / Subject', questions: 60, marks: 60 }] } ] },
  { key: 'aptet', name: 'AP TET', body: 'AP School Education', level: 'Graduate', frequency: 'Irregular', checked: '2026-10-19', approx: true, stages: [
    cbt('Paper I / II', '2 h 30 min', 'None', [{ name: 'CDP', questions: 30, marks: 30 }, { name: 'Language I', questions: 30, marks: 30 }, { name: 'Language II', questions: 30, marks: 30 }, { name: 'Maths & EVS / Subject', questions: 60, marks: 60 }]) ] },

  // ─── Police & state SI ─────────────────────────────────
  { key: 'up_police', name: 'UP Police Constable', body: 'UPPRPB', level: '12th', frequency: 'Irregular', ageLimit: '18–22 (men) / 18–25 (women)', checked: '2026-10-19', weightageSlug: 'up-police', stages: [
    { name: 'Written', mode: 'OMR', duration: '2 h', negative: '0.25 per wrong', sections: [
      { name: 'General Knowledge', questions: 38, marks: 76 }, { name: 'General Hindi', questions: 37, marks: 74 }, { name: 'Numerical & Mental Ability', questions: 38, marks: 76 }, { name: 'Mental Aptitude, IQ & Reasoning', questions: 37, marks: 74 },
    ] },
    { name: 'PST / PET', mode: 'PET/PST', duration: '—', negative: '—', sections: [], note: '4.8 km in 25 min (men) / 2.4 km in 14 min (women).' } ] },
  { key: 'up_si', name: 'UP Police SI', body: 'UPPRPB', level: 'Graduate', frequency: 'Irregular', ageLimit: '21–28', checked: '2026-10-19', weightageSlug: 'up-police-si', stages: [
    cbt('Written', '2 h', 'None', [
      { name: 'General Hindi', questions: 40, marks: 100 }, { name: 'Law & Constitution / General Knowledge', questions: 40, marks: 100 }, { name: 'Numerical & Mental Ability', questions: 40, marks: 100 }, { name: 'Mental Aptitude, IQ, Reasoning', questions: 40, marks: 100 },
    ], 'Minimum 35% per section.'),
    { name: 'PST / PET', mode: 'PET/PST', duration: '—', negative: '—', sections: [] } ] },
  { key: 'bihar_police', name: 'Bihar Police Constable', body: 'CSBC', level: '12th', frequency: 'Irregular', ageLimit: '18–25', checked: '2026-10-19', stages: [
    { name: 'Written', mode: 'OMR', duration: '2 h', negative: 'None', sections: [{ name: 'Hindi, English, Maths, Social Science, Science, GK & Current Affairs', questions: 100, marks: 100 }], note: 'Qualifying 30%; final merit on PET.' },
    { name: 'PET', mode: 'PET/PST', duration: '—', negative: '—', sections: [{ name: 'Run, long jump, shot put', questions: 0, marks: 100 }] } ] },
  { key: 'bihar_si', name: 'Bihar Police SI', body: 'BPSSC', level: 'Graduate', frequency: 'Irregular', ageLimit: '20–37', checked: '2026-10-19', stages: [
    { name: 'Prelims', mode: 'OMR', duration: '2 h', negative: '0.20 per wrong', sections: [{ name: 'General Knowledge & Current Affairs', questions: 100, marks: 200 }] },
    { name: 'Mains', mode: 'OMR', duration: '2 h each', negative: '0.20 per wrong', sections: [{ name: 'Paper I — General Hindi (qualifying)', questions: 100, marks: 200 }, { name: 'Paper II — GS, Maths, Reasoning, Mental ability', questions: 100, marks: 200 }] },
    { name: 'PET', mode: 'PET/PST', duration: '—', negative: '—', sections: [] } ] },
  { key: 'mp_police', name: 'MP Police Constable', body: 'MPESB', level: '12th', frequency: 'Irregular', ageLimit: '18–33', checked: '2026-10-19', stages: [
    cbt('Paper I', '2 h', 'None', [{ name: 'General Knowledge & Reasoning', questions: 40, marks: 40 }, { name: 'Intellectual Ability & Mental Aptitude', questions: 30, marks: 30 }, { name: 'Science & Simple Arithmetic', questions: 30, marks: 30 }]),
    { name: 'PET / PST', mode: 'PET/PST', duration: '—', negative: '—', sections: [] } ] },
  { key: 'mp_si', name: 'MP Police SI', body: 'MPESB', level: 'Graduate', frequency: 'Irregular', checked: '2026-10-19', approx: true, stages: [
    cbt('Paper I', '2 h', 'None', [{ name: 'Hindi', questions: 70, marks: 70 }, { name: 'English', questions: 30, marks: 30 }]),
    cbt('Paper II', '3 h', 'None', [{ name: 'GK, Reasoning, Science, Maths, Computer', questions: 200, marks: 200 }]) ] },
  { key: 'raj_police', name: 'Rajasthan Police Constable', body: 'Rajasthan Police', level: '12th', frequency: 'Irregular', ageLimit: '18–23', checked: '2026-10-19', stages: [
    { name: 'Written', mode: 'OMR', duration: '2 h', negative: '0.25 per wrong', sections: [
      { name: 'Reasoning, Logic, Computer', questions: 60, marks: 60 }, { name: 'GK, Science, Social Science, Current Affairs', questions: 35, marks: 35 }, { name: 'Women & child crimes and laws', questions: 10, marks: 10 }, { name: 'Rajasthan history, culture, geography', questions: 45, marks: 45 },
    ] },
    { name: 'PET / PST', mode: 'PET/PST', duration: '—', negative: '—', sections: [{ name: 'Physical', questions: 0, marks: 30 }] } ] },
  { key: 'raj_si', name: 'Rajasthan Police SI', body: 'RPSC', level: 'Graduate', frequency: 'Irregular', ageLimit: '20–25', checked: '2026-10-19', stages: [
    { name: 'Written', mode: 'OMR', duration: '2 h each', negative: '1/3 per wrong', sections: [{ name: 'Paper I — General Hindi', questions: 100, marks: 200 }, { name: 'Paper II — General Knowledge & General Science', questions: 100, marks: 200 }] },
    { name: 'PET + Interview', mode: 'Interview', duration: '—', negative: '—', sections: [{ name: 'PET', questions: 0, marks: 100 }, { name: 'Interview', questions: 0, marks: 50 }] } ] },
  { key: 'haryana_police', name: 'Haryana Police Constable', body: 'HSSC', level: '12th', frequency: 'Irregular', ageLimit: '18–25', checked: '2026-10-19', approx: true, stages: [
    cbt('Knowledge test', '90 min', 'None', [{ name: 'GK, Reasoning, Maths, Science, Computer, Haryana GK', questions: 100, marks: 100 }], 'Includes CET qualifying stage.'),
    { name: 'PMT / PST', mode: 'PET/PST', duration: '—', negative: '—', sections: [] } ] },
  { key: 'delhi_police', name: 'Delhi Police Constable', body: 'SSC', level: '12th', frequency: 'Irregular', ageLimit: '18–25', checked: '2026-10-19', weightageSlug: 'delhi-police', stages: [
    cbt('CBT', '90 min', '0.25 per wrong', [
      { name: 'Reasoning', questions: 25, marks: 25 }, { name: 'General Knowledge & Current Affairs', questions: 50, marks: 50 }, { name: 'Numerical Ability', questions: 15, marks: 15 }, { name: 'Computer Fundamentals', questions: 10, marks: 10 },
    ]),
    { name: 'PE & MT', mode: 'PET/PST', duration: '—', negative: '—', sections: [] } ] },
  { key: 'cg_police', name: 'Chhattisgarh Police Constable', body: 'CG Police', level: '10th', frequency: 'Irregular', checked: '2026-10-19', approx: true, stages: [
    { name: 'Written', mode: 'OMR', duration: '2 h', negative: 'None', sections: [{ name: 'GK, Reasoning, Maths, Science, CG GK', questions: 100, marks: 100 }] },
    { name: 'PET', mode: 'PET/PST', duration: '—', negative: '—', sections: [] } ] },
  { key: 'uk_police', name: 'Uttarakhand Police Constable', body: 'UKSSSC', level: '12th', frequency: 'Irregular', checked: '2026-10-19', approx: true, stages: [
    { name: 'Written', mode: 'OMR', duration: '2 h', negative: '0.25 per wrong', sections: [{ name: 'GK, Reasoning, Uttarakhand GK, Hindi', questions: 100, marks: 100 }] },
    { name: 'PET / PST', mode: 'PET/PST', duration: '—', negative: '—', sections: [] } ] },
  { key: 'jharkhand_police', name: 'Jharkhand Police Constable', body: 'JSSC', level: '10th', frequency: 'Irregular', checked: '2026-10-19', approx: true, stages: [
    { name: 'Written', mode: 'OMR', duration: '2 h', negative: 'None', sections: [{ name: 'Hindi, GK, Jharkhand GK, Reasoning, Maths', questions: 100, marks: 300 }] },
    { name: 'PET', mode: 'PET/PST', duration: '—', negative: '—', sections: [] } ] },

  // ─── State PSC (prelims; mains are descriptive and vary) ─
  ...([
    ['uppsc', 'UPPSC PCS', 'UPPSC', '21–40'],
    ['bpsc', 'BPSC CCE', 'BPSC', '20/21–37'],
    ['mppsc', 'MPPSC State Service', 'MPPSC', '21–40'],
    ['rpsc', 'RPSC RAS', 'RPSC', '21–40'],
    ['appsc', 'APPSC Group 1', 'APPSC', '18–42'],
    ['tnpsc', 'TNPSC Group 1', 'TNPSC', '21–32'],
    ['wbpsc', 'WBPSC WBCS', 'WBPSC', '21–36'],
    ['kpsc', 'KPSC KAS', 'KPSC', '21–35'],
    ['hpsc', 'HPSC HCS', 'HPSC', '21–42'],
    ['jpsc', 'JPSC CCE', 'JPSC', '21–35'],
    ['ukpsc', 'UKPSC PCS', 'UKPSC', '21–42'],
    ['cgpsc', 'CGPSC State Service', 'CGPSC', '21–30 (40 domicile)'],
    ['gpsc', 'GPSC Class 1-2', 'GPSC', '20–35'],
    ['opsc', 'OPSC OCS', 'OPSC', '21–38'],
    ['ppsc', 'PPSC PCS', 'PPSC', '21–37'],
  ] as const).map(([key, name, body, age]): ExamPattern => ({
    key, name, body, level: 'Graduate', frequency: 'Yearly (usually)', ageLimit: age, checked: '2026-10-19', approx: true,
    stages: [
      { name: 'Prelims', mode: 'OMR', duration: '2 h each', negative: 'Varies (1/3 typical; none in some states)', sections: [
        { name: 'Paper I — General Studies', questions: 150, marks: 200 },
        { name: 'Paper II — CSAT (qualifying in most states)', questions: 100, marks: 200 },
      ], note: 'Question counts vary by state (BPSC 150 in one paper; TNPSC 200). State-specific GK carries 20–40% of GS.' },
      { name: 'Mains', mode: 'Descriptive', duration: '3 h per paper', negative: 'None', sections: [{ name: 'GS papers + Essay + Language (+ Optional in some)', questions: 0, marks: 1500 }] },
      { name: 'Interview', mode: 'Interview', duration: '—', negative: '—', sections: [{ name: 'Interview', questions: 0, marks: 100 }] },
    ],
  })),

  // ─── Revenue / Group C ─────────────────────────────────
  { key: 'up_lekhpal', name: 'UP Lekhpal', body: 'UPSSSC', level: '12th', frequency: 'Irregular', ageLimit: '18–40', checked: '2026-10-19', stages: [
    { name: 'Mains (after PET)', mode: 'OMR', duration: '2 h', negative: '0.25 per wrong', sections: [{ name: 'General Hindi', questions: 25, marks: 25 }, { name: 'Mathematics', questions: 25, marks: 25 }, { name: 'General Knowledge', questions: 25, marks: 25 }, { name: 'Rural Development & Village Society', questions: 25, marks: 25 }] } ] },
  { key: 'up_vdo', name: 'UPSSSC VDO (Gram Panchayat Adhikari)', body: 'UPSSSC', level: '12th', frequency: 'Irregular', ageLimit: '18–40', checked: '2026-10-19', approx: true, stages: [
    { name: 'Mains (after PET)', mode: 'OMR', duration: '2 h', negative: '0.25 per wrong', sections: [{ name: 'Hindi Knowledge & Writing', questions: 50, marks: 50 }, { name: 'General Intelligence Test', questions: 50, marks: 50 }, { name: 'General Knowledge', questions: 50, marks: 50 }] } ] },
  { key: 'up_ro_aro', name: 'UPPSC RO / ARO', body: 'UPPSC', level: 'Graduate', frequency: 'Irregular', ageLimit: '21–40', checked: '2026-10-19', stages: [
    { name: 'Prelims', mode: 'OMR', duration: '2 h + 1 h', negative: '1/3 per wrong', sections: [{ name: 'General Studies', questions: 140, marks: 140 }, { name: 'General Hindi', questions: 60, marks: 60 }] },
    { name: 'Mains', mode: 'Descriptive', duration: '—', negative: '—', sections: [{ name: 'GS, General Hindi & Drafting, Hindi Essay', questions: 0, marks: 400 }] } ] },
  { key: 'mp_patwari', name: 'MP Patwari', body: 'MPESB', level: 'Graduate', frequency: 'Irregular', ageLimit: '18–40', checked: '2026-10-19', stages: [
    cbt('Group 2 Sub-Group 4', '3 h', 'None', [{ name: 'Part A — GK, Hindi, English, Maths, Computer', questions: 100, marks: 100 }, { name: 'Part B — GK, Reasoning, General Management, Rural economy', questions: 100, marks: 100 }]) ] },
  { key: 'raj_patwari', name: 'Rajasthan Patwari', body: 'RSSB', level: 'Graduate', frequency: 'Irregular', ageLimit: '18–40', checked: '2026-10-19', stages: [
    { name: 'Written', mode: 'OMR', duration: '3 h', negative: '1/3 per wrong', sections: [{ name: 'General Science, History, Polity, Geography of India', questions: 38, marks: 76 }, { name: 'Rajasthan history, culture, geography', questions: 30, marks: 60 }, { name: 'General English & Hindi', questions: 22, marks: 44 }, { name: 'Mental Ability & Reasoning, Basic Numerical', questions: 45, marks: 90 }, { name: 'Basic Computer', questions: 15, marks: 30 }] } ] },
  { key: 'cg_patwari', name: 'CG Patwari', body: 'CG Vyapam', level: '12th', frequency: 'Irregular', checked: '2026-10-19', approx: true, stages: [
    { name: 'Written', mode: 'OMR', duration: '2 h', negative: '0.25 per wrong', sections: [{ name: 'Computer', questions: 20, marks: 20 }, { name: 'Hindi & English', questions: 20, marks: 20 }, { name: 'Maths', questions: 30, marks: 30 }, { name: 'Reasoning', questions: 30, marks: 30 }, { name: 'GK & CG GK', questions: 50, marks: 50 }] } ] },
  { key: 'bihar_cdpo', name: 'Bihar CDPO', body: 'BPSC', level: 'Graduate', frequency: 'Irregular', checked: '2026-10-19', approx: true, stages: [
    { name: 'Prelims', mode: 'OMR', duration: '2 h', negative: 'None', sections: [{ name: 'General Studies', questions: 150, marks: 150 }] },
    { name: 'Mains', mode: 'Descriptive', duration: '3 h each', negative: 'None', sections: [{ name: 'General Hindi (qualifying), GS I & II, Optional', questions: 0, marks: 900 }] } ] },
  { key: 'mp_vyapam', name: 'MP Vyapam Group 2/3/4 (MPESB)', body: 'MPESB', level: 'Graduate', frequency: 'Irregular', checked: '2026-10-19', approx: true, stages: [
    cbt('Paper', '3 h', 'None', [{ name: 'Part A — GK, Hindi, English, Maths, Computer, Reasoning, Management', questions: 100, marks: 100 }, { name: 'Part B — Post subject', questions: 100, marks: 100 }]) ] },
  { key: 'raj_ldc', name: 'Rajasthan LDC (Junior Assistant)', body: 'RSSB', level: '12th', frequency: 'Irregular', checked: '2026-10-19', approx: true, stages: [
    { name: 'Written', mode: 'OMR', duration: '3 h each', negative: '1/3 per wrong', sections: [{ name: 'Paper I — GK, Science, Maths', questions: 150, marks: 100 }, { name: 'Paper II — Hindi & English', questions: 150, marks: 100 }] },
    { name: 'Typing test', mode: 'Skill', duration: '—', negative: '—', sections: [] } ] },
  { key: 'jssc', name: 'JSSC CGL', body: 'JSSC', level: 'Graduate', frequency: 'Irregular', checked: '2026-10-19', approx: true, stages: [
    cbt('CBT', '2 h each', '1 per wrong', [{ name: 'Paper I — Language (Hindi & English)', questions: 120, marks: 360 }, { name: 'Paper II — Regional/tribal language', questions: 100, marks: 300 }, { name: 'Paper III — GK, Reasoning, Maths, Jharkhand GK, Computer', questions: 150, marks: 450 }]) ] },
  { key: 'osssc', name: 'OSSSC (RI, ARI, Amin etc.)', body: 'OSSSC', level: '12th', frequency: 'Irregular', checked: '2026-10-19', approx: true, stages: [
    cbt('Written', '2 h', '0.25 per wrong', [{ name: 'Arithmetic, GK, Reasoning, Computer, Odia, English', questions: 100, marks: 100 }]) ] },
  { key: 'wbssc', name: 'WBSSC / WB PSC Clerkship', body: 'WBPSC', level: '10th', frequency: 'Irregular', checked: '2026-10-19', approx: true, stages: [
    { name: 'Part I', mode: 'OMR', duration: '90 min', negative: '0.25 per wrong', sections: [{ name: 'English', questions: 30, marks: 30 }, { name: 'General Studies', questions: 40, marks: 40 }, { name: 'Arithmetic', questions: 30, marks: 30 }] },
    { name: 'Part II', mode: 'Descriptive', duration: '1 h', negative: 'None', sections: [{ name: 'Group A English, Group B Bengali/Hindi/Urdu/Nepali/Santali', questions: 0, marks: 100 }] } ] },
  { key: 'hssc', name: 'HSSC CET (Group C)', body: 'HSSC', level: '12th', frequency: 'Irregular', checked: '2026-10-19', approx: true, stages: [
    { name: 'CET', mode: 'OMR', duration: '105 min', negative: 'None', sections: [{ name: 'GK, Reasoning, Maths, Science, Computer, English, Hindi (75%)', questions: 75, marks: 75 }, { name: 'Haryana GK (25%)', questions: 25, marks: 25 }], note: 'Score valid 3 years; then post-specific exam.' } ] },
  { key: 'icar', name: 'ICAR NET / JRF / SRF', body: 'ASRB', level: 'Postgraduate', frequency: 'Yearly', checked: '2026-10-19', approx: true, stages: [
    cbt('NET', '2 h', '1/3 per wrong', [{ name: 'Subject', questions: 150, marks: 150 }]) ] },

  // ─── Engineering & medical entrance ────────────────────
  {
    key: 'jee_main', name: 'JEE Main', body: 'NTA', level: '12th', frequency: 'Twice a year (Jan & Apr)', checked: '2026-10-19', weightageSlug: 'jee-main',
    stages: [cbt('Paper 1 (B.E./B.Tech)', '3 h', '1 per wrong MCQ', [
      { name: 'Physics (20 MCQ + 5 numerical)', questions: 25, marks: 100 },
      { name: 'Chemistry (20 MCQ + 5 numerical)', questions: 25, marks: 100 },
      { name: 'Mathematics (20 MCQ + 5 numerical)', questions: 25, marks: 100 },
    ], 'Paper 2A (B.Arch) and 2B (B.Planning) have drawing / planning sections.')],
  },
  {
    key: 'jee_advanced', name: 'JEE Advanced', body: 'IITs (rotating)', level: '12th', frequency: 'Yearly', checked: '2026-10-19', weightageSlug: 'jee-advanced', approx: true,
    stages: [
      cbt('Paper 1', '3 h', 'Varies by question type', [{ name: 'Physics', questions: 17, marks: 60 }, { name: 'Chemistry', questions: 17, marks: 60 }, { name: 'Mathematics', questions: 17, marks: 60 }]),
      cbt('Paper 2', '3 h', 'Varies by question type', [{ name: 'Physics', questions: 17, marks: 60 }, { name: 'Chemistry', questions: 17, marks: 60 }, { name: 'Mathematics', questions: 17, marks: 60 }], 'Pattern changes every year; counts shown are the 2024–25 format.'),
    ],
  },
  {
    key: 'neet', name: 'NEET-UG', body: 'NTA', level: '12th', frequency: 'Yearly (May)', checked: '2026-10-19', weightageSlug: 'neet-ug',
    stages: [{ name: 'Pen-and-paper', mode: 'OMR', duration: '3 h', negative: '1 per wrong', sections: [
      { name: 'Physics', questions: 45, marks: 180 }, { name: 'Chemistry', questions: 45, marks: 180 }, { name: 'Botany', questions: 45, marks: 180 }, { name: 'Zoology', questions: 45, marks: 180 },
    ], note: '180 questions, 720 marks, 13 languages.' }],
  },
  { key: 'neet_pg', name: 'NEET-PG', body: 'NBEMS', level: 'Graduate', frequency: 'Yearly', checked: '2026-10-19', stages: [
    cbt('CBT', '3 h 30 min', '1 per wrong', [{ name: 'Pre-clinical, Para-clinical, Clinical subjects', questions: 200, marks: 800 }]) ] },
  { key: 'aiims', name: 'AIIMS (Nursing Officer / paramedical NORCET)', body: 'AIIMS', level: 'Graduate', frequency: 'Twice a year', checked: '2026-10-19', approx: true, stages: [
    cbt('NORCET Prelims', '3 h', '1/3 per wrong', [{ name: 'Nursing subjects', questions: 160, marks: 160 }, { name: 'GK & Aptitude', questions: 40, marks: 40 }]),
    cbt('NORCET Mains', '90 min', '1/3 per wrong', [{ name: 'Nursing', questions: 100, marks: 100 }]) ] },
  { key: 'jipmer', name: 'JIPMER (Nursing Officer / Group B)', body: 'JIPMER', level: 'Graduate', frequency: 'Irregular', checked: '2026-10-19', approx: true, stages: [
    cbt('CBT', '90 min', '1/3 per wrong', [{ name: 'Subject', questions: 80, marks: 320 }, { name: 'GK, English, Reasoning', questions: 20, marks: 80 }]) ] },
  { key: 'isro', name: 'ISRO Scientist / Engineer SC', body: 'ISRO (ICRB)', level: 'Graduate', frequency: 'Irregular', ageLimit: 'Up to 28', checked: '2026-10-19', stages: [
    { name: 'Written', mode: 'OMR', duration: '90 min', negative: '1/3 per wrong', sections: [{ name: 'Discipline (ECE / ME / CS / EE)', questions: 80, marks: 240 }] },
    { name: 'Interview', mode: 'Interview', duration: '—', negative: '—', sections: [{ name: 'Interview', questions: 0, marks: 100 }], note: 'Final: written 50 : interview 50.' } ] },
  ...(([
    ['gate_cse', 'GATE CS & IT', 'gate-cse'], ['gate_ece', 'GATE ECE', 'gate-ece'], ['gate_me', 'GATE ME', 'gate-me'], ['gate_ee', 'GATE EE', 'gate-ee'],
    ['gate_ce', 'GATE CE', 'gate-ce'], ['gate_ch', 'GATE CH', undefined], ['gate_in', 'GATE IN', undefined], ['gate_bt', 'GATE BT', undefined], ['gate_pi', 'GATE PI', undefined], ['gate_xe', 'GATE XE', undefined],
  ] as const).map(([key, name, slug]): ExamPattern => ({
    key, name, body: 'IITs / IISc (rotating)', level: 'Graduate', frequency: 'Yearly (Feb)', checked: '2026-10-19', weightageSlug: slug,
    stages: [cbt('Single paper', '3 h', '1/3 (1-mark) and 2/3 (2-mark) for MCQ; none for MSQ/NAT', [
      { name: 'General Aptitude', questions: 10, marks: 15 },
      { name: 'Engineering Mathematics', questions: 10, marks: 13 },
      { name: 'Subject', questions: 45, marks: 72 },
    ], '65 questions, 100 marks. Score valid 3 years for PSU recruitment and M.Tech.')],
  }))),

  // ─── Management, law, university ───────────────────────
  { key: 'cat', name: 'CAT', body: 'IIMs (rotating)', level: 'Graduate', frequency: 'Yearly (Nov)', checked: '2026-10-19', stages: [
    cbt('CBT', '2 h (40 min per section)', '1 per wrong MCQ; none for TITA', [{ name: 'VARC', questions: 24, marks: 72 }, { name: 'DILR', questions: 22, marks: 66 }, { name: 'Quantitative Ability', questions: 22, marks: 66 }], 'Counts as per CAT 2024–25.') ] },
  { key: 'xat', name: 'XAT', body: 'XLRI', level: 'Graduate', frequency: 'Yearly (Jan)', checked: '2026-10-19', approx: true, stages: [
    cbt('Part 1', '170 min', '0.25 per wrong; 0.10 for >8 unattempted', [{ name: 'Verbal & Logical Ability', questions: 26, marks: 26 }, { name: 'Decision Making', questions: 21, marks: 21 }, { name: 'Quant & DI', questions: 28, marks: 28 }]),
    cbt('Part 2', '30 min', 'None', [{ name: 'General Knowledge', questions: 20, marks: 20 }, { name: 'Essay', questions: 1, marks: 0 }]) ] },
  { key: 'mat', name: 'MAT', body: 'AIMA', level: 'Graduate', frequency: '4 times a year', checked: '2026-10-19', stages: [
    cbt('CBT/PBT', '2 h 30 min', '0.25 per wrong', [{ name: 'Language Comprehension', questions: 40, marks: 40 }, { name: 'Mathematical Skills', questions: 40, marks: 40 }, { name: 'Data Analysis & Sufficiency', questions: 40, marks: 40 }, { name: 'Intelligence & Critical Reasoning', questions: 40, marks: 40 }, { name: 'Indian & Global Environment', questions: 40, marks: 40 }]) ] },
  { key: 'clat', name: 'CLAT UG', body: 'Consortium of NLUs', level: '12th', frequency: 'Yearly (Dec)', checked: '2026-10-19', weightageSlug: 'clat-ug', stages: [
    { name: 'Pen-and-paper', mode: 'OMR', duration: '2 h', negative: '0.25 per wrong', sections: [{ name: 'English Language', questions: 24, marks: 24 }, { name: 'Current Affairs incl. GK', questions: 28, marks: 28 }, { name: 'Legal Reasoning', questions: 32, marks: 32 }, { name: 'Logical Reasoning', questions: 24, marks: 24 }, { name: 'Quantitative Techniques', questions: 12, marks: 12 }], note: '120 passage-based questions.' } ] },
  { key: 'ailet', name: 'AILET', body: 'NLU Delhi', level: '12th', frequency: 'Yearly (Dec)', checked: '2026-10-19', stages: [
    { name: 'Pen-and-paper', mode: 'OMR', duration: '2 h', negative: '0.25 per wrong', sections: [{ name: 'English Language', questions: 50, marks: 50 }, { name: 'Current Affairs & GK', questions: 30, marks: 30 }, { name: 'Logical Reasoning', questions: 70, marks: 70 }] } ] },
  { key: 'cuet', name: 'CUET-UG', body: 'NTA', level: '12th', frequency: 'Yearly (May)', checked: '2026-10-19', stages: [
    cbt('Per subject', '60 min each', '1 per wrong', [{ name: 'Each chosen subject / language / General Test', questions: 50, marks: 250 }], 'Up to 5 subjects; +5 / −1 marking.') ] },
  // ─── Nursing & paramedical ─────────────────────────────
  { key: 'gnm', name: 'GNM entrance (state boards)', body: 'State nursing councils', level: '12th', frequency: 'Yearly', checked: '2026-10-19', approx: true, stages: [
    { name: 'Written', mode: 'OMR', duration: '2 h', negative: 'Varies', sections: [{ name: 'Physics, Chemistry, Biology', questions: 60, marks: 60 }, { name: 'English, GK, Aptitude', questions: 40, marks: 40 }] } ] },
  { key: 'anm', name: 'ANM entrance (state boards)', body: 'State nursing councils', level: '12th', frequency: 'Yearly', checked: '2026-10-19', approx: true, stages: [
    { name: 'Written', mode: 'OMR', duration: '2 h', negative: 'Varies', sections: [{ name: 'Science (10th level)', questions: 50, marks: 50 }, { name: 'GK, Hindi/English, Aptitude', questions: 50, marks: 50 }] } ] },
  { key: 'bsc_nursing', name: 'B.Sc Nursing (NEET / state entrance)', body: 'NTA / state boards', level: '12th', frequency: 'Yearly', checked: '2026-10-19', approx: true, stages: [
    { name: 'Entrance', mode: 'OMR', duration: '2 h', negative: 'Varies', sections: [{ name: 'Physics', questions: 25, marks: 25 }, { name: 'Chemistry', questions: 25, marks: 25 }, { name: 'Biology', questions: 50, marks: 50 }] }, ], },
  { key: 'bpharm', name: 'B.Pharm entrance (state CETs)', body: 'State CET cells', level: '12th', frequency: 'Yearly', checked: '2026-10-19', approx: true, stages: [
    cbt('CET', '3 h', 'None (most states)', [{ name: 'Physics', questions: 50, marks: 50 }, { name: 'Chemistry', questions: 50, marks: 50 }, { name: 'Biology / Maths', questions: 100, marks: 100 }]) ] },
  { key: 'dpharm', name: 'D.Pharm entrance / exit exam', body: 'PCI / state boards', level: '12th', frequency: 'Yearly', checked: '2026-10-19', approx: true, stages: [
    cbt('Exit exam (DPEE)', '3 h per paper', 'None', [{ name: 'Pharmaceutics', questions: 50, marks: 50 }, { name: 'Pharmacology & Pharmacotherapeutics', questions: 50, marks: 50 }, { name: 'Pharmacy Practice & Jurisprudence', questions: 50, marks: 50 }]) ] },
  { key: 'dmlt', name: 'DMLT entrance', body: 'State paramedical boards', level: '12th', frequency: 'Yearly', checked: '2026-10-19', approx: true, stages: [
    { name: 'Written', mode: 'OMR', duration: '2 h', negative: 'Varies', sections: [{ name: 'Physics, Chemistry, Biology', questions: 75, marks: 75 }, { name: 'English & GK', questions: 25, marks: 25 }] } ] },

  // ─── School boards & olympiads ─────────────────────────
  { key: 'cbse_10', name: 'CBSE Class 10 Board', body: 'CBSE', level: 'School', frequency: 'Yearly (Feb–Mar); two exams from 2026', checked: '2026-10-19', stages: [
    { name: 'Theory per subject', mode: 'Written', duration: '3 h', negative: 'None', sections: [{ name: 'MCQ / competency-based (≈50%)', questions: 20, marks: 40 }, { name: 'Short & long answer', questions: 18, marks: 40 }], note: '80 theory + 20 internal per subject.' } ] },
  { key: 'cbse_11', name: 'CBSE Class 11 (school exam)', body: 'CBSE pattern', level: 'School', frequency: 'Yearly', checked: '2026-10-19', approx: true, stages: [
    { name: 'Theory per subject', mode: 'Written', duration: '3 h', negative: 'None', sections: [{ name: 'MCQ & case-based', questions: 18, marks: 30 }, { name: 'Short & long answer', questions: 15, marks: 40 }, { name: 'Internal / practical', questions: 0, marks: 30 }] } ] },
  { key: 'cbse_12', name: 'CBSE Class 12 Board', body: 'CBSE', level: 'School', frequency: 'Yearly (Feb–Mar)', checked: '2026-10-19', stages: [
    { name: 'Theory per subject', mode: 'Written', duration: '3 h', negative: 'None', sections: [{ name: 'MCQ / competency-based (≈50%)', questions: 18, marks: 35 }, { name: 'Short & long answer', questions: 15, marks: 35 }], note: '70 theory + 30 practical for science; 80 + 20 for others.' } ] },
  ...((['up_board_10_en', 'up_board_10_hi'] as const).map((key): ExamPattern => ({
    key, name: 'UP Board Class 10', body: 'UPMSP', level: 'School', frequency: 'Yearly (Feb–Mar)', checked: '2026-10-19',
    stages: [{ name: 'Theory per subject', mode: 'Written', duration: '3 h 15 min', negative: 'None', sections: [{ name: 'MCQ (OMR)', questions: 20, marks: 20 }, { name: 'Descriptive', questions: 15, marks: 50 }], note: '70 theory + 30 internal.' }],
  }))),
  ...((['up_board_12_en', 'up_board_12_hi'] as const).map((key): ExamPattern => ({
    key, name: 'UP Board Class 12', body: 'UPMSP', level: 'School', frequency: 'Yearly (Feb–Mar)', checked: '2026-10-19',
    stages: [{ name: 'Theory per subject', mode: 'Written', duration: '3 h 15 min', negative: 'None', sections: [{ name: 'MCQ', questions: 20, marks: 20 }, { name: 'Descriptive', questions: 15, marks: 50 }], note: '70 theory + 30 practical (science) or 100 theory (others).' }],
  }))),
  { key: 'icse_10', name: 'ICSE Class 10', body: 'CISCE', level: 'School', frequency: 'Yearly (Feb–Mar)', checked: '2026-10-19', stages: [
    { name: 'Theory per subject', mode: 'Written', duration: '2 h', negative: 'None', sections: [{ name: 'Section A (compulsory)', questions: 4, marks: 40 }, { name: 'Section B (choice)', questions: 4, marks: 40 }], note: '80 theory + 20 internal.' } ] },
  { key: 'isc_12', name: 'ISC Class 12', body: 'CISCE', level: 'School', frequency: 'Yearly (Feb–Mar)', checked: '2026-10-19', stages: [
    { name: 'Theory per subject', mode: 'Written', duration: '3 h', negative: 'None', sections: [{ name: 'Theory', questions: 0, marks: 70 }, { name: 'Practical / project', questions: 0, marks: 30 }] } ] },
  { key: 'olympiad', name: 'Olympiads (NSEJS / IOQ / SOF)', body: 'HBCSE / SOF', level: 'School', frequency: 'Yearly', checked: '2026-10-19', approx: true, stages: [
    { name: 'Stage 1 (NSE / IOQ Part I)', mode: 'OMR', duration: '2 h', negative: '1 per wrong (NSE)', sections: [{ name: 'Subject MCQs', questions: 60, marks: 180 }] } ] },
  { key: 'ntse', name: 'NTSE (discontinued after 2021; state talent exams continue)', body: 'NCERT', level: 'School', frequency: 'Discontinued', checked: '2026-10-19', stages: [
    { name: 'Stage 1 / 2', mode: 'OMR', duration: '2 h each', negative: 'None', sections: [{ name: 'MAT', questions: 100, marks: 100 }, { name: 'SAT', questions: 100, marks: 100 }] } ] },
  { key: 'kvpy', name: 'KVPY (merged into INSPIRE-SHE in 2022)', body: 'IISc / DST', level: 'School', frequency: 'Discontinued', checked: '2026-10-19', stages: [
    cbt('Aptitude test', '3 h', '1 per wrong (Part I), 2 (Part II)', [{ name: 'Part I (4 subjects)', questions: 60, marks: 60 }, { name: 'Part II', questions: 20, marks: 40 }]) ] },
  { key: 'general_gk', name: 'General Knowledge practice', body: 'SarkariAlert practice set', level: '10th', frequency: '—', checked: '2026-10-19', stages: [
    { name: 'Practice', mode: 'CBT', duration: 'Self-paced', negative: 'None', sections: [{ name: 'General Knowledge', questions: 0, marks: 0 }], note: 'Not an exam. General trivia used for warm-up practice only.' } ] },
];

export const PATTERN_MAP: Record<string, ExamPattern> = Object.fromEntries(EXAM_PATTERNS.map((p) => [p.key, p]));

export function getPattern(key: string): ExamPattern | undefined {
  return PATTERN_MAP[key];
}

/** Section weightage (percent of the stage's marks). */
export function sectionWeightage(stage: Stage): { name: string; percent: number; questions: number; marks: number }[] {
  const total = stage.sections.reduce((s, x) => s + x.marks, 0);
  return stage.sections.map((s) => ({
    name: s.name,
    questions: s.questions,
    marks: s.marks,
    percent: total ? Math.round((s.marks / total) * 1000) / 10 : 0,
  }));
}

export const LEVEL_LABELS: Record<ExamPattern['level'], string> = {
  '10th': '10th pass', '12th': '12th pass', Diploma: 'Diploma / ITI', Graduate: 'Graduate', Postgraduate: 'Postgraduate', School: 'School boards',
};
