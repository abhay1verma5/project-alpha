'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  BookOpen,
  TrendingUp,
  IndianRupee,
  BarChart3,
  ChevronDown,
  Layers,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ───────── Types ───────── */
type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface ExamInfo {
  id: string;
  name: string;
  nameHi: string;
  subjects: string[];
  difficulty: Difficulty;
  salaryRange: string; // e.g. "25,500 – 81,100"
  category: string;
}

interface SimilarityEntry {
  targetId: string;
  overlapPercent: number;
  commonSubjects: string[];
}

/* ───────── Exam Data ───────── */
const EXAMS: ExamInfo[] = [
  {
    id: 'ssc-cgl',
    name: 'SSC CGL',
    nameHi: 'एसएससी सीजीएल',
    subjects: ['Quantitative Aptitude', 'English', 'General Intelligence & Reasoning', 'General Awareness'],
    difficulty: 'Medium',
    salaryRange: '25,500 – 1,51,100',
    category: 'SSC',
  },
  {
    id: 'ssc-chsl',
    name: 'SSC CHSL',
    nameHi: 'एसएससी सीएचएसएल',
    subjects: ['Quantitative Aptitude', 'English', 'General Intelligence & Reasoning', 'General Awareness'],
    difficulty: 'Easy',
    salaryRange: '19,900 – 63,200',
    category: 'SSC',
  },
  {
    id: 'ssc-mts',
    name: 'SSC MTS',
    nameHi: 'एसएससी एमटीएस',
    subjects: ['Numerical Aptitude', 'English', 'General Intelligence & Reasoning', 'General Awareness'],
    difficulty: 'Easy',
    salaryRange: '18,000 – 56,900',
    category: 'SSC',
  },
  {
    id: 'ssc-gd',
    name: 'SSC GD',
    nameHi: 'एसएससी जीडी',
    subjects: ['General Intelligence & Reasoning', 'General Awareness', 'Elementary Mathematics', 'English/Hindi'],
    difficulty: 'Easy',
    salaryRange: '21,700 – 69,100',
    category: 'SSC',
  },
  {
    id: 'ssc-cpo',
    name: 'SSC CPO',
    nameHi: 'एसएससी सीपीओ',
    subjects: ['Quantitative Aptitude', 'English', 'General Intelligence & Reasoning', 'General Awareness'],
    difficulty: 'Medium',
    salaryRange: '35,400 – 1,12,400',
    category: 'SSC',
  },
  {
    id: 'upsc-prelims',
    name: 'UPSC Prelims',
    nameHi: 'यूपीएससी प्रारंभिक',
    subjects: ['General Studies', 'CSAT (Aptitude)', 'Indian Polity', 'History', 'Geography', 'Economy', 'Science', 'Current Affairs'],
    difficulty: 'Hard',
    salaryRange: '56,100 – 2,50,000',
    category: 'UPSC',
  },
  {
    id: 'nda',
    name: 'NDA',
    nameHi: 'एनडीए',
    subjects: ['Mathematics', 'English', 'General Awareness', 'Physics', 'Chemistry', 'Geography', 'History'],
    difficulty: 'Medium',
    salaryRange: '56,100 – 2,50,000',
    category: 'Defence',
  },
  {
    id: 'cds',
    name: 'CDS',
    nameHi: 'सीडीएस',
    subjects: ['English', 'General Knowledge', 'Elementary Mathematics'],
    difficulty: 'Medium',
    salaryRange: '56,100 – 2,50,000',
    category: 'Defence',
  },
  {
    id: 'ibps-po',
    name: 'IBPS PO',
    nameHi: 'आईबीपीएस पीओ',
    subjects: ['Quantitative Aptitude', 'English', 'Reasoning Ability', 'General Awareness', 'Computer Knowledge'],
    difficulty: 'Medium',
    salaryRange: '36,000 – 63,840',
    category: 'Banking',
  },
  {
    id: 'ibps-clerk',
    name: 'IBPS Clerk',
    nameHi: 'आईबीपीएस क्लर्क',
    subjects: ['Quantitative Aptitude', 'English', 'Reasoning Ability', 'General Awareness', 'Computer Knowledge'],
    difficulty: 'Easy',
    salaryRange: '19,900 – 47,920',
    category: 'Banking',
  },
  {
    id: 'sbi-po',
    name: 'SBI PO',
    nameHi: 'एसबीआई पीओ',
    subjects: ['Quantitative Aptitude', 'English', 'Reasoning Ability', 'General Awareness', 'Computer Knowledge'],
    difficulty: 'Medium',
    salaryRange: '41,960 – 63,840',
    category: 'Banking',
  },
  {
    id: 'sbi-clerk',
    name: 'SBI Clerk',
    nameHi: 'एसबीआई क्लर्क',
    subjects: ['Quantitative Aptitude', 'English', 'Reasoning Ability', 'General Awareness', 'Computer Knowledge'],
    difficulty: 'Easy',
    salaryRange: '22,600 – 47,920',
    category: 'Banking',
  },
  {
    id: 'rrb-ntpc',
    name: 'RRB NTPC',
    nameHi: 'आरआरबी एनटीपीसी',
    subjects: ['Mathematics', 'General Intelligence & Reasoning', 'General Awareness', 'General Science'],
    difficulty: 'Medium',
    salaryRange: '19,900 – 63,200',
    category: 'Railway',
  },
  {
    id: 'rrb-group-d',
    name: 'RRB Group D',
    nameHi: 'आरआरबी ग्रुप डी',
    subjects: ['Mathematics', 'General Intelligence & Reasoning', 'General Awareness', 'General Science'],
    difficulty: 'Easy',
    salaryRange: '18,000 – 56,900',
    category: 'Railway',
  },
  {
    id: 'rrb-je',
    name: 'RRB JE',
    nameHi: 'आरआरबी जेई',
    subjects: ['Mathematics', 'General Intelligence & Reasoning', 'General Awareness', 'General Science', 'Technical (Engineering)'],
    difficulty: 'Medium',
    salaryRange: '35,400 – 1,12,400',
    category: 'Railway',
  },
  {
    id: 'ctet',
    name: 'CTET',
    nameHi: 'सीटीईटी',
    subjects: ['Child Development & Pedagogy', 'Language I', 'Language II', 'Mathematics', 'Environmental Studies / Science', 'Social Studies'],
    difficulty: 'Medium',
    salaryRange: '35,400 – 1,12,400',
    category: 'Teaching',
  },
  {
    id: 'ugc-net',
    name: 'UGC NET',
    nameHi: 'यूजीसी नेट',
    subjects: ['Teaching & Research Aptitude', 'Subject-Specific Paper', 'General Awareness', 'Reasoning', 'Data Interpretation'],
    difficulty: 'Hard',
    salaryRange: '57,700 – 2,18,200',
    category: 'Teaching',
  },
  {
    id: 'uppsc',
    name: 'UPPSC',
    nameHi: 'यूपीपीएससी',
    subjects: ['General Studies', 'CSAT (Aptitude)', 'Indian Polity', 'History', 'Geography', 'Economy', 'Current Affairs'],
    difficulty: 'Hard',
    salaryRange: '44,900 – 2,09,200',
    category: 'State PSC',
  },
  {
    id: 'bpsc',
    name: 'BPSC',
    nameHi: 'बीपीएससी',
    subjects: ['General Studies', 'CSAT (Aptitude)', 'Indian Polity', 'History', 'Geography', 'Economy', 'Current Affairs'],
    difficulty: 'Hard',
    salaryRange: '44,900 – 2,09,200',
    category: 'State PSC',
  },
  {
    id: 'mppsc',
    name: 'MPPSC',
    nameHi: 'एमपीपीएससी',
    subjects: ['General Studies', 'CSAT (Aptitude)', 'Indian Polity', 'History', 'Geography', 'Economy', 'Current Affairs'],
    difficulty: 'Hard',
    salaryRange: '44,900 – 2,09,200',
    category: 'State PSC',
  },
];

/* ───────── Similarity Matrix ───────── */
const SIMILARITY_MAP: Record<string, SimilarityEntry[]> = {
  'ssc-cgl': [
    { targetId: 'ssc-chsl', overlapPercent: 85, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness'] },
    { targetId: 'ssc-cpo', overlapPercent: 90, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness'] },
    { targetId: 'ssc-mts', overlapPercent: 70, commonSubjects: ['Reasoning', 'English', 'General Awareness', 'Numerical Aptitude'] },
    { targetId: 'ssc-gd', overlapPercent: 60, commonSubjects: ['Reasoning', 'General Awareness', 'Mathematics'] },
    { targetId: 'ibps-po', overlapPercent: 55, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness'] },
    { targetId: 'ibps-clerk', overlapPercent: 55, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness'] },
    { targetId: 'sbi-po', overlapPercent: 50, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness'] },
    { targetId: 'rrb-ntpc', overlapPercent: 65, commonSubjects: ['Mathematics', 'Reasoning', 'General Awareness'] },
    { targetId: 'cds', overlapPercent: 45, commonSubjects: ['English', 'General Knowledge', 'Mathematics'] },
  ],
  'ssc-chsl': [
    { targetId: 'ssc-cgl', overlapPercent: 85, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness'] },
    { targetId: 'ssc-cpo', overlapPercent: 80, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness'] },
    { targetId: 'ssc-mts', overlapPercent: 75, commonSubjects: ['Reasoning', 'English', 'General Awareness', 'Numerical Aptitude'] },
    { targetId: 'ssc-gd', overlapPercent: 65, commonSubjects: ['Reasoning', 'General Awareness', 'Mathematics'] },
    { targetId: 'ibps-clerk', overlapPercent: 55, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness'] },
    { targetId: 'rrb-ntpc', overlapPercent: 60, commonSubjects: ['Mathematics', 'Reasoning', 'General Awareness'] },
    { targetId: 'rrb-group-d', overlapPercent: 55, commonSubjects: ['Mathematics', 'Reasoning', 'General Awareness'] },
  ],
  'ssc-mts': [
    { targetId: 'ssc-chsl', overlapPercent: 75, commonSubjects: ['Reasoning', 'English', 'General Awareness', 'Numerical Aptitude'] },
    { targetId: 'ssc-cgl', overlapPercent: 70, commonSubjects: ['Reasoning', 'English', 'General Awareness', 'Numerical Aptitude'] },
    { targetId: 'ssc-gd', overlapPercent: 72, commonSubjects: ['Reasoning', 'General Awareness', 'Mathematics'] },
    { targetId: 'rrb-group-d', overlapPercent: 70, commonSubjects: ['Mathematics', 'Reasoning', 'General Awareness'] },
    { targetId: 'rrb-ntpc', overlapPercent: 55, commonSubjects: ['Mathematics', 'Reasoning', 'General Awareness'] },
  ],
  'ssc-gd': [
    { targetId: 'ssc-mts', overlapPercent: 72, commonSubjects: ['Reasoning', 'General Awareness', 'Mathematics'] },
    { targetId: 'ssc-chsl', overlapPercent: 65, commonSubjects: ['Reasoning', 'General Awareness', 'Mathematics'] },
    { targetId: 'ssc-cgl', overlapPercent: 60, commonSubjects: ['Reasoning', 'General Awareness', 'Mathematics'] },
    { targetId: 'rrb-group-d', overlapPercent: 75, commonSubjects: ['Mathematics', 'Reasoning', 'General Awareness', 'General Science'] },
    { targetId: 'rrb-ntpc', overlapPercent: 60, commonSubjects: ['Mathematics', 'Reasoning', 'General Awareness'] },
    { targetId: 'ssc-cpo', overlapPercent: 55, commonSubjects: ['Reasoning', 'General Awareness', 'Mathematics'] },
  ],
  'ssc-cpo': [
    { targetId: 'ssc-cgl', overlapPercent: 90, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness'] },
    { targetId: 'ssc-chsl', overlapPercent: 80, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness'] },
    { targetId: 'ssc-gd', overlapPercent: 55, commonSubjects: ['Reasoning', 'General Awareness', 'Mathematics'] },
    { targetId: 'ibps-po', overlapPercent: 50, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness'] },
    { targetId: 'rrb-ntpc', overlapPercent: 55, commonSubjects: ['Mathematics', 'Reasoning', 'General Awareness'] },
  ],
  'upsc-prelims': [
    { targetId: 'uppsc', overlapPercent: 85, commonSubjects: ['General Studies', 'CSAT', 'Polity', 'History', 'Geography', 'Economy'] },
    { targetId: 'bpsc', overlapPercent: 82, commonSubjects: ['General Studies', 'CSAT', 'Polity', 'History', 'Geography', 'Economy'] },
    { targetId: 'mppsc', overlapPercent: 82, commonSubjects: ['General Studies', 'CSAT', 'Polity', 'History', 'Geography', 'Economy'] },
    { targetId: 'cds', overlapPercent: 45, commonSubjects: ['English', 'General Knowledge'] },
    { targetId: 'nda', overlapPercent: 35, commonSubjects: ['General Knowledge', 'Geography', 'History'] },
    { targetId: 'ssc-cgl', overlapPercent: 30, commonSubjects: ['General Awareness', 'Reasoning'] },
  ],
  'nda': [
    { targetId: 'cds', overlapPercent: 65, commonSubjects: ['English', 'General Knowledge', 'Mathematics'] },
    { targetId: 'upsc-prelims', overlapPercent: 35, commonSubjects: ['General Knowledge', 'Geography', 'History'] },
    { targetId: 'ssc-cgl', overlapPercent: 40, commonSubjects: ['Mathematics', 'English', 'General Awareness'] },
    { targetId: 'rrb-ntpc', overlapPercent: 45, commonSubjects: ['Mathematics', 'General Awareness', 'General Science'] },
    { targetId: 'ssc-chsl', overlapPercent: 35, commonSubjects: ['Mathematics', 'English', 'General Awareness'] },
  ],
  'cds': [
    { targetId: 'nda', overlapPercent: 65, commonSubjects: ['English', 'General Knowledge', 'Mathematics'] },
    { targetId: 'upsc-prelims', overlapPercent: 45, commonSubjects: ['English', 'General Knowledge'] },
    { targetId: 'ssc-cgl', overlapPercent: 45, commonSubjects: ['English', 'General Knowledge', 'Mathematics'] },
    { targetId: 'ibps-po', overlapPercent: 40, commonSubjects: ['English', 'Quantitative Aptitude', 'General Awareness'] },
    { targetId: 'uppsc', overlapPercent: 35, commonSubjects: ['General Knowledge', 'Current Affairs'] },
  ],
  'ibps-po': [
    { targetId: 'sbi-po', overlapPercent: 92, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness', 'Computer Knowledge'] },
    { targetId: 'ibps-clerk', overlapPercent: 88, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness', 'Computer Knowledge'] },
    { targetId: 'sbi-clerk', overlapPercent: 85, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness', 'Computer Knowledge'] },
    { targetId: 'ssc-cgl', overlapPercent: 55, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness'] },
    { targetId: 'ssc-chsl', overlapPercent: 50, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness'] },
    { targetId: 'rrb-ntpc', overlapPercent: 45, commonSubjects: ['Mathematics', 'Reasoning', 'General Awareness'] },
  ],
  'ibps-clerk': [
    { targetId: 'sbi-clerk', overlapPercent: 92, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness', 'Computer Knowledge'] },
    { targetId: 'ibps-po', overlapPercent: 88, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness', 'Computer Knowledge'] },
    { targetId: 'sbi-po', overlapPercent: 85, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness', 'Computer Knowledge'] },
    { targetId: 'ssc-cgl', overlapPercent: 55, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness'] },
    { targetId: 'ssc-chsl', overlapPercent: 55, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness'] },
    { targetId: 'rrb-ntpc', overlapPercent: 45, commonSubjects: ['Mathematics', 'Reasoning', 'General Awareness'] },
  ],
  'sbi-po': [
    { targetId: 'ibps-po', overlapPercent: 92, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness', 'Computer Knowledge'] },
    { targetId: 'sbi-clerk', overlapPercent: 88, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness', 'Computer Knowledge'] },
    { targetId: 'ibps-clerk', overlapPercent: 85, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness', 'Computer Knowledge'] },
    { targetId: 'ssc-cgl', overlapPercent: 50, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness'] },
    { targetId: 'rrb-ntpc', overlapPercent: 40, commonSubjects: ['Mathematics', 'Reasoning', 'General Awareness'] },
  ],
  'sbi-clerk': [
    { targetId: 'ibps-clerk', overlapPercent: 92, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness', 'Computer Knowledge'] },
    { targetId: 'sbi-po', overlapPercent: 88, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness', 'Computer Knowledge'] },
    { targetId: 'ibps-po', overlapPercent: 85, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness', 'Computer Knowledge'] },
    { targetId: 'ssc-chsl', overlapPercent: 50, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness'] },
    { targetId: 'ssc-cgl', overlapPercent: 48, commonSubjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Awareness'] },
  ],
  'rrb-ntpc': [
    { targetId: 'rrb-group-d', overlapPercent: 82, commonSubjects: ['Mathematics', 'Reasoning', 'General Awareness', 'General Science'] },
    { targetId: 'rrb-je', overlapPercent: 70, commonSubjects: ['Mathematics', 'Reasoning', 'General Awareness', 'General Science'] },
    { targetId: 'ssc-cgl', overlapPercent: 65, commonSubjects: ['Mathematics', 'Reasoning', 'General Awareness'] },
    { targetId: 'ssc-chsl', overlapPercent: 60, commonSubjects: ['Mathematics', 'Reasoning', 'General Awareness'] },
    { targetId: 'ssc-gd', overlapPercent: 60, commonSubjects: ['Mathematics', 'Reasoning', 'General Awareness'] },
    { targetId: 'ibps-po', overlapPercent: 45, commonSubjects: ['Quantitative Aptitude', 'Reasoning', 'General Awareness'] },
  ],
  'rrb-group-d': [
    { targetId: 'rrb-ntpc', overlapPercent: 82, commonSubjects: ['Mathematics', 'Reasoning', 'General Awareness', 'General Science'] },
    { targetId: 'ssc-gd', overlapPercent: 75, commonSubjects: ['Mathematics', 'Reasoning', 'General Awareness', 'General Science'] },
    { targetId: 'ssc-mts', overlapPercent: 70, commonSubjects: ['Mathematics', 'Reasoning', 'General Awareness'] },
    { targetId: 'rrb-je', overlapPercent: 60, commonSubjects: ['Mathematics', 'Reasoning', 'General Awareness', 'General Science'] },
    { targetId: 'ssc-chsl', overlapPercent: 55, commonSubjects: ['Mathematics', 'Reasoning', 'General Awareness'] },
  ],
  'rrb-je': [
    { targetId: 'rrb-ntpc', overlapPercent: 70, commonSubjects: ['Mathematics', 'Reasoning', 'General Awareness', 'General Science'] },
    { targetId: 'rrb-group-d', overlapPercent: 60, commonSubjects: ['Mathematics', 'Reasoning', 'General Awareness', 'General Science'] },
    { targetId: 'ssc-cgl', overlapPercent: 45, commonSubjects: ['Mathematics', 'Reasoning', 'General Awareness'] },
    { targetId: 'ssc-chsl', overlapPercent: 40, commonSubjects: ['Mathematics', 'Reasoning', 'General Awareness'] },
  ],
  'ctet': [
    { targetId: 'ugc-net', overlapPercent: 35, commonSubjects: ['Teaching Aptitude', 'Child Development'] },
    { targetId: 'upsc-prelims', overlapPercent: 20, commonSubjects: ['General Studies', 'Science'] },
    { targetId: 'ssc-cgl', overlapPercent: 25, commonSubjects: ['Reasoning', 'Mathematics', 'English'] },
  ],
  'ugc-net': [
    { targetId: 'ctet', overlapPercent: 35, commonSubjects: ['Teaching Aptitude', 'Child Development'] },
    { targetId: 'upsc-prelims', overlapPercent: 25, commonSubjects: ['General Awareness', 'Reasoning'] },
    { targetId: 'ssc-cgl', overlapPercent: 20, commonSubjects: ['Reasoning', 'General Awareness'] },
  ],
  'uppsc': [
    { targetId: 'upsc-prelims', overlapPercent: 85, commonSubjects: ['General Studies', 'CSAT', 'Polity', 'History', 'Geography', 'Economy'] },
    { targetId: 'bpsc', overlapPercent: 88, commonSubjects: ['General Studies', 'CSAT', 'Polity', 'History', 'Geography', 'Economy', 'Current Affairs'] },
    { targetId: 'mppsc', overlapPercent: 88, commonSubjects: ['General Studies', 'CSAT', 'Polity', 'History', 'Geography', 'Economy', 'Current Affairs'] },
    { targetId: 'cds', overlapPercent: 35, commonSubjects: ['General Knowledge', 'Current Affairs'] },
    { targetId: 'ssc-cgl', overlapPercent: 30, commonSubjects: ['General Awareness', 'Reasoning'] },
  ],
  'bpsc': [
    { targetId: 'upsc-prelims', overlapPercent: 82, commonSubjects: ['General Studies', 'CSAT', 'Polity', 'History', 'Geography', 'Economy'] },
    { targetId: 'uppsc', overlapPercent: 88, commonSubjects: ['General Studies', 'CSAT', 'Polity', 'History', 'Geography', 'Economy', 'Current Affairs'] },
    { targetId: 'mppsc', overlapPercent: 90, commonSubjects: ['General Studies', 'CSAT', 'Polity', 'History', 'Geography', 'Economy', 'Current Affairs'] },
    { targetId: 'cds', overlapPercent: 35, commonSubjects: ['General Knowledge', 'Current Affairs'] },
    { targetId: 'ssc-cgl', overlapPercent: 28, commonSubjects: ['General Awareness', 'Reasoning'] },
  ],
  'mppsc': [
    { targetId: 'upsc-prelims', overlapPercent: 82, commonSubjects: ['General Studies', 'CSAT', 'Polity', 'History', 'Geography', 'Economy'] },
    { targetId: 'bpsc', overlapPercent: 90, commonSubjects: ['General Studies', 'CSAT', 'Polity', 'History', 'Geography', 'Economy', 'Current Affairs'] },
    { targetId: 'uppsc', overlapPercent: 88, commonSubjects: ['General Studies', 'CSAT', 'Polity', 'History', 'Geography', 'Economy', 'Current Affairs'] },
    { targetId: 'cds', overlapPercent: 35, commonSubjects: ['General Knowledge', 'Current Affairs'] },
    { targetId: 'ssc-cgl', overlapPercent: 28, commonSubjects: ['General Awareness', 'Reasoning'] },
  ],
};

/* ───────── Helpers ───────── */
function getExamById(id: string): ExamInfo | undefined {
  return EXAMS.find((e) => e.id === id);
}

function getDifficultyColor(d: Difficulty): string {
  switch (d) {
    case 'Easy':
      return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300';
    case 'Hard':
      return 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300';
  }
}

function getDifficultyHi(d: Difficulty): string {
  switch (d) {
    case 'Easy':
      return 'आसान';
    case 'Medium':
      return 'मध्यम';
    case 'Hard':
      return 'कठिन';
  }
}

function getOverlapBarColor(pct: number): string {
  if (pct >= 80) return 'bg-green-500 dark:bg-green-400';
  if (pct >= 60) return 'bg-blue-500 dark:bg-blue-400';
  if (pct >= 40) return 'bg-yellow-500 dark:bg-yellow-400';
  return 'bg-orange-500 dark:bg-orange-400';
}

function getCategoryColor(cat: string): string {
  switch (cat) {
    case 'SSC':
      return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300';
    case 'Banking':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300';
    case 'Railway':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300';
    case 'UPSC':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300';
    case 'Defence':
      return 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300';
    case 'Teaching':
      return 'bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300';
    case 'State PSC':
      return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
}

/* ───────── Component ───────── */
export function ExamSimilarity() {
  const [selectedExam, setSelectedExam] = useState('');
  const [sortBy, setSortBy] = useState<'overlap' | 'salary'>('overlap');

  const selectedInfo = useMemo(() => getExamById(selectedExam), [selectedExam]);

  const similarities = useMemo(() => {
    if (!selectedExam) return [];
    const entries = SIMILARITY_MAP[selectedExam] || [];
    const enriched = entries
      .map((entry) => {
        const target = getExamById(entry.targetId);
        if (!target) return null;
        return { ...entry, target };
      })
      .filter(Boolean) as (SimilarityEntry & { target: ExamInfo })[];

    if (sortBy === 'overlap') {
      enriched.sort((a, b) => b.overlapPercent - a.overlapPercent);
    } else {
      // sort by minimum salary (parsed from range)
      const getMinSalary = (range: string) => parseInt(range.replace(/[^0-9]/g, ''));
      enriched.sort((a, b) => getMinSalary(b.target.salaryRange) - getMinSalary(a.target.salaryRange));
    }
    return enriched;
  }, [selectedExam, sortBy]);

  // Group exams by category for the dropdown
  const examsByCategory = useMemo(() => {
    const groups: Record<string, ExamInfo[]> = {};
    EXAMS.forEach((exam) => {
      if (!groups[exam.category]) groups[exam.category] = [];
      groups[exam.category].push(exam);
    });
    return groups;
  }, []);

  return (
    <div className="space-y-6">
      {/* Exam selector */}
      <div>
        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-2">
          <Search className="w-4 h-4" />
          Select Your Exam / अपनी परीक्षा चुनें
        </label>
        <div className="relative mt-2">
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-base appearance-none pr-10"
          >
            <option value="">-- Choose an exam --</option>
            {Object.entries(examsByCategory).map(([cat, exams]) => (
              <optgroup key={cat} label={cat}>
                {exams.map((exam) => (
                  <option key={exam.id} value={exam.id}>
                    {exam.name} ({exam.nameHi})
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Selected exam info card */}
      {selectedInfo && (
        <div className="rounded-2xl bg-[#1a3a5c] p-5 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Layers className="w-6 h-6" />
                <h2 className="text-xl font-extrabold">{selectedInfo.name}</h2>
                <span className="text-sm opacity-80">({selectedInfo.nameHi})</span>
              </div>
              <p className="text-sm opacity-90">
                Syllabus overlap with other exams / अन्य परीक्षाओं के साथ सिलेबस ओवरलैप
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className={cn('px-3 py-1 rounded-full text-xs font-bold', getCategoryColor(selectedInfo.category))}>
                {selectedInfo.category}
              </span>
              <span className={cn('px-3 py-1 rounded-full text-xs font-bold', getDifficultyColor(selectedInfo.difficulty))}>
                {selectedInfo.difficulty} / {getDifficultyHi(selectedInfo.difficulty)}
              </span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedInfo.subjects.map((sub) => (
              <span
                key={sub}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/15 text-xs font-semibold"
              >
                <BookOpen className="w-3 h-3" />
                {sub}
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <IndianRupee className="w-4 h-4" />
            <span className="font-bold">Salary Range (वेतन):</span>
            <span className="opacity-90">{selectedInfo.salaryRange}</span>
          </div>
        </div>
      )}

      {/* Sort controls */}
      {selectedInfo && similarities.length > 0 && (
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sort by:</span>
          <button
            onClick={() => setSortBy('overlap')}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95',
              sortBy === 'overlap'
                ? 'bg-[#1a3a5c] text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            )}
          >
            <BarChart3 className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
            Overlap %
          </button>
          <button
            onClick={() => setSortBy('salary')}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95',
              sortBy === 'salary'
                ? 'bg-[#1a3a5c] text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            )}
          >
            <IndianRupee className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
            Salary
          </button>
        </div>
      )}

      {/* Results grid */}
      {selectedInfo && similarities.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {similarities.map((sim) => (
            <div
              key={sim.targetId}
              className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden transition-all hover:shadow-lg hover:border-[#1a3a5c]/30 dark:hover:border-blue-700/50"
            >
              {/* Card header */}
              <div className="px-5 pt-4 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                      {sim.target.name}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {sim.target.nameHi}
                    </span>
                  </div>
                  <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-bold', getCategoryColor(sim.target.category))}>
                    {sim.target.category}
                  </span>
                </div>

                {/* Overlap bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                      Syllabus Overlap / सिलेबस ओवरलैप
                    </span>
                    <span className="text-sm font-extrabold text-gray-900 dark:text-white">
                      {sim.overlapPercent}%
                    </span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <div
                      className={cn('h-full rounded-full transition-all duration-500', getOverlapBarColor(sim.overlapPercent))}
                      style={{ width: `${sim.overlapPercent}%` }}
                    />
                  </div>
                </div>

                {/* Common subjects */}
                <div className="mb-3">
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
                    Common Subjects / समान विषय
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {sim.commonSubjects.map((sub) => (
                      <span
                        key={sub}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 text-xs font-medium"
                      >
                        <BookOpen className="w-3 h-3 flex-shrink-0" />
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card footer */}
              <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                {/* Difficulty */}
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Difficulty:</span>
                  <span className={cn('px-2 py-0.5 rounded-full text-xs font-bold', getDifficultyColor(sim.target.difficulty))}>
                    {sim.target.difficulty} / {getDifficultyHi(sim.target.difficulty)}
                  </span>
                </div>
                {/* Salary */}
                <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                  <IndianRupee className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="font-bold whitespace-nowrap">{sim.target.salaryRange}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {selectedInfo && similarities.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-8 text-center">
          <Layers className="w-10 h-10 mx-auto text-gray-400 dark:text-gray-500 mb-3" />
          <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
            No similarity data available for this exam yet.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            इस परीक्षा के लिए अभी तक ओवरलैप डेटा उपलब्ध नहीं है।
          </p>
        </div>
      )}

      {/* Prompt if nothing selected */}
      {!selectedExam && (
        <div className="rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-8 text-center">
          <Search className="w-10 h-10 mx-auto text-gray-400 dark:text-gray-500 mb-3" />
          <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
            Select an exam above to see which other exams share syllabus overlap.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            ऊपर एक परीक्षा चुनें और देखें कि किन-किन परीक्षाओं का सिलेबस मिलता-जुलता है।
          </p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800 dark:text-amber-300">
          <p className="font-bold mb-1">Disclaimer / अस्वीकरण</p>
          <p>
            Overlap percentages are approximate and based on general syllabus comparison.
            Actual exam patterns may vary with each notification.
            Salary ranges are based on 7th Pay Commission and may vary by post.
            कृपया official notification ज़रूर देखें।
          </p>
        </div>
      </div>
    </div>
  );
}
