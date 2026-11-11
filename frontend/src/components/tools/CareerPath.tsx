'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Shield,
  Train,
  Building2,
  BookOpen,
  ChevronRight,
  X,
  TrendingUp,
  TrendingDown,
  Clock,
  IndianRupee,
  Users,
  ArrowLeftRight,
  Star,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Types ───────────────────────────────────────────────────────────────────

type Qualification = '8th' | '10th' | '12th' | 'graduate' | 'post_graduate' | 'btech' | 'diploma' | 'iti';
type AgeRange = '18-25' | '25-30' | '30-35' | '35-40';
type Sector = 'any' | 'defence' | 'railways' | 'banking' | 'ssc' | 'teaching' | 'police' | 'state_govt';
type Difficulty = 'easy' | 'medium' | 'hard';

interface CareerOption {
  id: string;
  exam: string;
  post: string;
  salaryRange: string;
  salaryMin: number;
  salaryMax: number;
  ageMin: number;
  ageMax: number;
  sector: Sector;
  difficulty: Difficulty;
  qualifications: Qualification[];
  selectionSteps: string[];
  prepTime: string;
  vacancyTrend: 'increasing' | 'decreasing' | 'stable';
  highlights?: string;
}

// ─── Career Data ─────────────────────────────────────────────────────────────

const CAREER_DATA: CareerOption[] = [
  // 10th Pass
  {
    id: 'rrb-group-d',
    exam: 'RRB Group D',
    post: 'Track Maintainer / Helper',
    salaryRange: '₹18,000 – 56,900',
    salaryMin: 18000,
    salaryMax: 56900,
    ageMin: 18,
    ageMax: 33,
    sector: 'railways',
    difficulty: 'easy',
    qualifications: ['10th', '12th', 'iti', 'diploma', 'graduate', 'btech', 'post_graduate'],
    selectionSteps: ['CBT', 'PET (Physical Test)', 'Document Verification', 'Medical'],
    prepTime: '3-6 months',
    vacancyTrend: 'increasing',
    highlights: '1,00,000+ vacancies expected',
  },
  {
    id: 'ssc-mts',
    exam: 'SSC MTS',
    post: 'Multi Tasking Staff',
    salaryRange: '₹18,000 – 56,900',
    salaryMin: 18000,
    salaryMax: 56900,
    ageMin: 18,
    ageMax: 27,
    sector: 'ssc',
    difficulty: 'easy',
    qualifications: ['10th', '12th', 'iti', 'diploma', 'graduate', 'btech', 'post_graduate'],
    selectionSteps: ['CBT Session 1', 'CBT Session 2', 'Document Verification'],
    prepTime: '3-6 months',
    vacancyTrend: 'stable',
  },
  {
    id: 'army-gd',
    exam: 'Army GD Agniveer',
    post: 'Agniveer (General Duty)',
    salaryRange: '₹30,000',
    salaryMin: 30000,
    salaryMax: 40000,
    ageMin: 17,
    ageMax: 23,
    sector: 'defence',
    difficulty: 'medium',
    qualifications: ['10th', '12th', 'iti', 'diploma', 'graduate', 'btech', 'post_graduate'],
    selectionSteps: ['Online Exam', 'Physical Test', 'Medical', 'Document Verification'],
    prepTime: '3-6 months',
    vacancyTrend: 'increasing',
    highlights: 'Agniveer scheme — 4 year tenure',
  },
  {
    id: 'police-constable',
    exam: 'Police Constable',
    post: 'Constable',
    salaryRange: '₹20,000 – 63,200',
    salaryMin: 20000,
    salaryMax: 63200,
    ageMin: 18,
    ageMax: 28,
    sector: 'police',
    difficulty: 'medium',
    qualifications: ['10th', '12th', 'iti', 'diploma', 'graduate', 'btech', 'post_graduate'],
    selectionSteps: ['Written Exam', 'Physical Test', 'Document Verification', 'Medical'],
    prepTime: '4-6 months',
    vacancyTrend: 'increasing',
    highlights: 'State-wise recruitment',
  },
  {
    id: 'postal-mts',
    exam: 'India Post MTS',
    post: 'Mail Guard / MTS',
    salaryRange: '₹18,000 – 56,900',
    salaryMin: 18000,
    salaryMax: 56900,
    ageMin: 18,
    ageMax: 27,
    sector: 'state_govt',
    difficulty: 'easy',
    qualifications: ['10th', '12th', 'iti', 'diploma', 'graduate', 'btech', 'post_graduate'],
    selectionSteps: ['CBT', 'Document Verification', 'Medical'],
    prepTime: '3-5 months',
    vacancyTrend: 'stable',
  },

  // 12th Pass
  {
    id: 'ssc-chsl',
    exam: 'SSC CHSL',
    post: 'LDC / DEO / PA/SA',
    salaryRange: '₹25,500 – 81,100',
    salaryMin: 25500,
    salaryMax: 81100,
    ageMin: 18,
    ageMax: 27,
    sector: 'ssc',
    difficulty: 'medium',
    qualifications: ['12th', 'iti', 'diploma', 'graduate', 'btech', 'post_graduate'],
    selectionSteps: ['Tier 1 (CBT)', 'Tier 2 (CBT + Typing)', 'Document Verification'],
    prepTime: '4-8 months',
    vacancyTrend: 'stable',
  },
  {
    id: 'ssc-gd',
    exam: 'SSC GD Constable',
    post: 'GD Constable (CAPF/BSF/CISF)',
    salaryRange: '₹21,700 – 69,100',
    salaryMin: 21700,
    salaryMax: 69100,
    ageMin: 18,
    ageMax: 23,
    sector: 'ssc',
    difficulty: 'medium',
    qualifications: ['10th', '12th', 'iti', 'diploma', 'graduate', 'btech', 'post_graduate'],
    selectionSteps: ['CBT', 'PET/PST', 'Medical', 'Document Verification'],
    prepTime: '3-6 months',
    vacancyTrend: 'increasing',
    highlights: '25,000+ vacancies yearly',
  },
  {
    id: 'rrb-ntpc',
    exam: 'RRB NTPC',
    post: 'Station Master / Clerk / TA',
    salaryRange: '₹19,900 – 63,200',
    salaryMin: 19900,
    salaryMax: 63200,
    ageMin: 18,
    ageMax: 33,
    sector: 'railways',
    difficulty: 'medium',
    qualifications: ['12th', 'iti', 'diploma', 'graduate', 'btech', 'post_graduate'],
    selectionSteps: ['CBT Stage 1', 'CBT Stage 2', 'Typing/CBAT', 'Document Verification', 'Medical'],
    prepTime: '6-8 months',
    vacancyTrend: 'increasing',
    highlights: '10,000+ vacancies',
  },
  {
    id: 'nda',
    exam: 'NDA (UPSC)',
    post: 'Army/Navy/Air Force Officer',
    salaryRange: '₹56,100+',
    salaryMin: 56100,
    salaryMax: 177500,
    ageMin: 16,
    ageMax: 19,
    sector: 'defence',
    difficulty: 'hard',
    qualifications: ['12th', 'graduate', 'btech', 'post_graduate'],
    selectionSteps: ['Written Exam', 'SSB Interview (5 days)', 'Medical'],
    prepTime: '6-12 months',
    vacancyTrend: 'stable',
    highlights: 'Prestigious — Officer rank entry',
  },
  {
    id: 'airforce-xy',
    exam: 'Air Force Agniveer',
    post: 'Agniveer (X/Y Group)',
    salaryRange: '₹30,000+',
    salaryMin: 30000,
    salaryMax: 40000,
    ageMin: 17,
    ageMax: 21,
    sector: 'defence',
    difficulty: 'medium',
    qualifications: ['12th', 'iti', 'diploma', 'graduate', 'btech', 'post_graduate'],
    selectionSteps: ['Online Exam', 'Physical Fitness Test', 'Adaptability Test', 'Medical'],
    prepTime: '4-6 months',
    vacancyTrend: 'stable',
  },
  {
    id: 'police-si',
    exam: 'Police Sub-Inspector',
    post: 'Sub Inspector (SI)',
    salaryRange: '₹35,400 – 1,12,400',
    salaryMin: 35400,
    salaryMax: 112400,
    ageMin: 21,
    ageMax: 28,
    sector: 'police',
    difficulty: 'medium',
    qualifications: ['12th', 'graduate', 'btech', 'post_graduate'],
    selectionSteps: ['Written Exam', 'Physical Test', 'Interview', 'Document Verification', 'Medical'],
    prepTime: '6-10 months',
    vacancyTrend: 'increasing',
  },
  {
    id: 'bank-clerk',
    exam: 'IBPS Clerk',
    post: 'Bank Clerk',
    salaryRange: '₹20,000 – 60,000',
    salaryMin: 20000,
    salaryMax: 60000,
    ageMin: 20,
    ageMax: 28,
    sector: 'banking',
    difficulty: 'medium',
    qualifications: ['12th', 'graduate', 'btech', 'post_graduate'],
    selectionSteps: ['Prelims', 'Mains', 'Language Proficiency', 'Document Verification'],
    prepTime: '4-6 months',
    vacancyTrend: 'decreasing',
    highlights: 'Declining due to digital banking',
  },

  // Graduate
  {
    id: 'ssc-cgl',
    exam: 'SSC CGL',
    post: 'Tax Inspector / Auditor / ASO',
    salaryRange: '₹44,900 – 1,42,400',
    salaryMin: 44900,
    salaryMax: 142400,
    ageMin: 18,
    ageMax: 32,
    sector: 'ssc',
    difficulty: 'hard',
    qualifications: ['graduate', 'btech', 'post_graduate'],
    selectionSteps: ['Tier 1 (CBT)', 'Tier 2 (CBT)', 'Document Verification'],
    prepTime: '8-12 months',
    vacancyTrend: 'stable',
    highlights: 'Most popular graduate-level exam',
  },
  {
    id: 'upsc-cse',
    exam: 'UPSC CSE',
    post: 'IAS / IPS / IFS / IRS',
    salaryRange: '₹56,100 – 2,50,000',
    salaryMin: 56100,
    salaryMax: 250000,
    ageMin: 21,
    ageMax: 32,
    sector: 'ssc',
    difficulty: 'hard',
    qualifications: ['graduate', 'btech', 'post_graduate'],
    selectionSteps: ['Prelims (CSAT)', 'Mains (9 papers)', 'Interview/Personality Test'],
    prepTime: '12-24 months',
    vacancyTrend: 'stable',
    highlights: 'India\'s toughest exam — highest prestige',
  },
  {
    id: 'ibps-po',
    exam: 'IBPS PO',
    post: 'Probationary Officer',
    salaryRange: '₹36,000 – 63,840',
    salaryMin: 36000,
    salaryMax: 63840,
    ageMin: 20,
    ageMax: 30,
    sector: 'banking',
    difficulty: 'medium',
    qualifications: ['graduate', 'btech', 'post_graduate'],
    selectionSteps: ['Prelims', 'Mains', 'Interview', 'Document Verification'],
    prepTime: '6-9 months',
    vacancyTrend: 'stable',
  },
  {
    id: 'sbi-po',
    exam: 'SBI PO',
    post: 'Probationary Officer',
    salaryRange: '₹41,960 – 68,500',
    salaryMin: 41960,
    salaryMax: 68500,
    ageMin: 21,
    ageMax: 30,
    sector: 'banking',
    difficulty: 'hard',
    qualifications: ['graduate', 'btech', 'post_graduate'],
    selectionSteps: ['Prelims', 'Mains', 'Interview/GE', 'Document Verification'],
    prepTime: '6-9 months',
    vacancyTrend: 'stable',
    highlights: 'SBI — most reputed public bank',
  },
  {
    id: 'rbi-grade-b',
    exam: 'RBI Grade B',
    post: 'Officer Grade B',
    salaryRange: '₹77,208+',
    salaryMin: 77208,
    salaryMax: 150000,
    ageMin: 21,
    ageMax: 30,
    sector: 'banking',
    difficulty: 'hard',
    qualifications: ['graduate', 'btech', 'post_graduate'],
    selectionSteps: ['Phase 1 (Prelims)', 'Phase 2 (Mains)', 'Interview', 'Document Verification'],
    prepTime: '8-12 months',
    vacancyTrend: 'stable',
    highlights: 'One of the highest-paying banking jobs',
  },
  {
    id: 'ctet-tgt',
    exam: 'CTET + TGT',
    post: 'Trained Graduate Teacher',
    salaryRange: '₹44,900',
    salaryMin: 44900,
    salaryMax: 142400,
    ageMin: 18,
    ageMax: 35,
    sector: 'teaching',
    difficulty: 'medium',
    qualifications: ['graduate', 'btech', 'post_graduate'],
    selectionSteps: ['CTET Exam', 'State TGT Exam', 'Interview', 'Document Verification'],
    prepTime: '4-8 months',
    vacancyTrend: 'increasing',
    highlights: 'B.Ed required additionally',
  },
  {
    id: 'capf',
    exam: 'UPSC CAPF (AC)',
    post: 'Assistant Commandant',
    salaryRange: '₹56,100+',
    salaryMin: 56100,
    salaryMax: 177500,
    ageMin: 20,
    ageMax: 25,
    sector: 'defence',
    difficulty: 'hard',
    qualifications: ['graduate', 'btech', 'post_graduate'],
    selectionSteps: ['Written Exam', 'Physical/Medical Test', 'Interview'],
    prepTime: '6-10 months',
    vacancyTrend: 'stable',
  },
  {
    id: 'cds',
    exam: 'UPSC CDS',
    post: 'Army/Navy/Air Force Officer',
    salaryRange: '₹56,100+',
    salaryMin: 56100,
    salaryMax: 177500,
    ageMin: 20,
    ageMax: 25,
    sector: 'defence',
    difficulty: 'hard',
    qualifications: ['graduate', 'btech', 'post_graduate'],
    selectionSteps: ['Written Exam', 'SSB Interview (5 days)', 'Medical'],
    prepTime: '6-10 months',
    vacancyTrend: 'stable',
    highlights: 'Direct officer entry for graduates',
  },

  // Post Graduate
  {
    id: 'ugc-net',
    exam: 'UGC NET / JRF',
    post: 'Asst. Professor / JRF',
    salaryRange: '₹57,700+',
    salaryMin: 57700,
    salaryMax: 208700,
    ageMin: 18,
    ageMax: 40,
    sector: 'teaching',
    difficulty: 'hard',
    qualifications: ['post_graduate'],
    selectionSteps: ['CBT Paper 1 & 2', 'Result Declaration'],
    prepTime: '4-8 months',
    vacancyTrend: 'stable',
    highlights: 'No upper age limit for NET (only JRF has 31 limit)',
  },
  {
    id: 'pgt',
    exam: 'PGT Teacher',
    post: 'Post Graduate Teacher',
    salaryRange: '₹44,900 – 1,42,400',
    salaryMin: 44900,
    salaryMax: 142400,
    ageMin: 21,
    ageMax: 40,
    sector: 'teaching',
    difficulty: 'medium',
    qualifications: ['post_graduate'],
    selectionSteps: ['Written Exam', 'Interview', 'Document Verification'],
    prepTime: '3-6 months',
    vacancyTrend: 'increasing',
    highlights: 'State-wise recruitment — KVS/NVS/DSSSB',
  },

  // B.Tech
  {
    id: 'gate-psu',
    exam: 'GATE + PSU',
    post: 'Engineer (NTPC/ONGC/BHEL/GAIL)',
    salaryRange: '₹60,000 – 1,80,000',
    salaryMin: 60000,
    salaryMax: 180000,
    ageMin: 18,
    ageMax: 30,
    sector: 'state_govt',
    difficulty: 'hard',
    qualifications: ['btech'],
    selectionSteps: ['GATE Exam', 'PSU Application', 'Interview', 'Document Verification'],
    prepTime: '8-12 months',
    vacancyTrend: 'stable',
    highlights: 'Single exam — multiple PSU options',
  },
  {
    id: 'ese',
    exam: 'UPSC ESE (IES)',
    post: 'Engineering Services Officer',
    salaryRange: '₹56,100+',
    salaryMin: 56100,
    salaryMax: 215900,
    ageMin: 21,
    ageMax: 30,
    sector: 'state_govt',
    difficulty: 'hard',
    qualifications: ['btech'],
    selectionSteps: ['Prelims (Objective)', 'Mains (Conventional)', 'Interview'],
    prepTime: '10-14 months',
    vacancyTrend: 'stable',
    highlights: 'Highest prestige for engineers',
  },
  {
    id: 'ssc-je',
    exam: 'SSC JE',
    post: 'Junior Engineer',
    salaryRange: '₹35,400 – 1,12,400',
    salaryMin: 35400,
    salaryMax: 112400,
    ageMin: 18,
    ageMax: 32,
    sector: 'ssc',
    difficulty: 'medium',
    qualifications: ['btech', 'diploma'],
    selectionSteps: ['Paper 1 (CBT)', 'Paper 2 (CBT)', 'Document Verification'],
    prepTime: '6-8 months',
    vacancyTrend: 'stable',
  },
  {
    id: 'rrb-je',
    exam: 'RRB JE',
    post: 'Junior Engineer (Railway)',
    salaryRange: '₹35,400 – 1,12,400',
    salaryMin: 35400,
    salaryMax: 112400,
    ageMin: 18,
    ageMax: 33,
    sector: 'railways',
    difficulty: 'medium',
    qualifications: ['btech', 'diploma'],
    selectionSteps: ['CBT Stage 1', 'CBT Stage 2', 'Document Verification', 'Medical'],
    prepTime: '6-8 months',
    vacancyTrend: 'stable',
  },
  {
    id: 'isro',
    exam: 'ISRO Scientist/Engineer',
    post: 'Scientist/Engineer SC',
    salaryRange: '₹56,100+',
    salaryMin: 56100,
    salaryMax: 208700,
    ageMin: 18,
    ageMax: 35,
    sector: 'state_govt',
    difficulty: 'hard',
    qualifications: ['btech'],
    selectionSteps: ['Written Exam', 'Interview', 'Document Verification', 'Medical'],
    prepTime: '6-10 months',
    vacancyTrend: 'stable',
    highlights: 'Dream job for engineers — Space research',
  },

  // 8th Pass
  {
    id: 'army-tradesman',
    exam: 'Army Agniveer (Tradesman)',
    post: 'Agniveer Tradesman',
    salaryRange: '₹30,000',
    salaryMin: 30000,
    salaryMax: 40000,
    ageMin: 17,
    ageMax: 23,
    sector: 'defence',
    difficulty: 'easy',
    qualifications: ['8th', '10th', '12th', 'iti', 'diploma', 'graduate', 'btech', 'post_graduate'],
    selectionSteps: ['Rally', 'Physical Test', 'Medical', 'Written Exam'],
    prepTime: '2-4 months',
    vacancyTrend: 'increasing',
  },
  {
    id: 'safai-karamchari',
    exam: 'Safai Karamchari',
    post: 'Sweeper / Safai Karamchari',
    salaryRange: '₹18,000 – 56,900',
    salaryMin: 18000,
    salaryMax: 56900,
    ageMin: 18,
    ageMax: 25,
    sector: 'state_govt',
    difficulty: 'easy',
    qualifications: ['8th', '10th', '12th', 'iti', 'diploma', 'graduate', 'btech', 'post_graduate'],
    selectionSteps: ['Application', 'Document Verification', 'Merit-based Selection'],
    prepTime: '1-2 months',
    vacancyTrend: 'stable',
  },
  {
    id: 'forest-guard',
    exam: 'Forest Guard',
    post: 'Forest Guard / Van Rakshak',
    salaryRange: '₹18,000 – 56,900',
    salaryMin: 18000,
    salaryMax: 56900,
    ageMin: 18,
    ageMax: 28,
    sector: 'state_govt',
    difficulty: 'easy',
    qualifications: ['8th', '10th', '12th', 'iti', 'diploma', 'graduate', 'btech', 'post_graduate'],
    selectionSteps: ['Written Exam', 'Physical Test', 'Document Verification', 'Medical'],
    prepTime: '2-4 months',
    vacancyTrend: 'stable',
  },

  // Diploma / ITI
  {
    id: 'railway-alp',
    exam: 'RRB ALP',
    post: 'Assistant Loco Pilot',
    salaryRange: '₹19,900 – 63,200',
    salaryMin: 19900,
    salaryMax: 63200,
    ageMin: 18,
    ageMax: 30,
    sector: 'railways',
    difficulty: 'medium',
    qualifications: ['iti', 'diploma', 'btech', 'graduate', 'post_graduate'],
    selectionSteps: ['CBT Stage 1', 'CBT Stage 2', 'CBAT', 'Document Verification', 'Medical'],
    prepTime: '4-8 months',
    vacancyTrend: 'increasing',
    highlights: 'ITI mandatory — Loco Pilot career path',
  },
  {
    id: 'railway-technician',
    exam: 'RRB Technician',
    post: 'Technician Grade III',
    salaryRange: '₹19,900 – 63,200',
    salaryMin: 19900,
    salaryMax: 63200,
    ageMin: 18,
    ageMax: 33,
    sector: 'railways',
    difficulty: 'easy',
    qualifications: ['iti', 'diploma', 'btech', 'graduate', 'post_graduate'],
    selectionSteps: ['CBT', 'Document Verification', 'Medical'],
    prepTime: '3-5 months',
    vacancyTrend: 'increasing',
  },
];

// ─── Constants ───────────────────────────────────────────────────────────────

const QUALIFICATIONS: { value: Qualification; label: string; labelHi: string }[] = [
  { value: '8th', label: '8th Pass', labelHi: '8वीं पास' },
  { value: '10th', label: '10th Pass', labelHi: '10वीं पास' },
  { value: '12th', label: '12th Pass', labelHi: '12वीं पास' },
  { value: 'iti', label: 'ITI', labelHi: 'ITI' },
  { value: 'diploma', label: 'Diploma', labelHi: 'डिप्लोमा' },
  { value: 'graduate', label: 'Graduate', labelHi: 'ग्रेजुएट' },
  { value: 'post_graduate', label: 'Post Graduate', labelHi: 'पोस्ट ग्रेजुएट' },
  { value: 'btech', label: 'B.Tech / B.E.', labelHi: 'बी.टेक' },
];

const AGE_RANGES: { value: AgeRange; label: string }[] = [
  { value: '18-25', label: '18 – 25 years' },
  { value: '25-30', label: '25 – 30 years' },
  { value: '30-35', label: '30 – 35 years' },
  { value: '35-40', label: '35 – 40 years' },
];

const SECTORS: { value: Sector; label: string; icon: typeof Briefcase }[] = [
  { value: 'any', label: 'All Sectors', icon: Briefcase },
  { value: 'defence', label: 'Defence', icon: Shield },
  { value: 'railways', label: 'Railways', icon: Train },
  { value: 'banking', label: 'Banking', icon: Building2 },
  { value: 'ssc', label: 'SSC / UPSC', icon: BookOpen },
  { value: 'teaching', label: 'Teaching', icon: GraduationCap },
  { value: 'police', label: 'Police', icon: Shield },
  { value: 'state_govt', label: 'State / Central Govt', icon: Building2 },
];

const DIFFICULTY_CONFIG: Record<Difficulty, { label: string; bg: string; text: string; border: string }> = {
  easy: {
    label: 'Easy',
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-400',
    border: 'border-green-300 dark:border-green-700',
  },
  medium: {
    label: 'Medium',
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'text-yellow-700 dark:text-yellow-400',
    border: 'border-yellow-300 dark:border-yellow-700',
  },
  hard: {
    label: 'Hard',
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-700 dark:text-red-400',
    border: 'border-red-300 dark:border-red-700',
  },
};

const SECTOR_COLORS: Record<string, string> = {
  defence: 'border-l-red-500',
  railways: 'border-l-blue-500',
  banking: 'border-l-yellow-500',
  ssc: 'border-l-green-500',
  teaching: 'border-l-pink-500',
  police: 'border-l-orange-500',
  state_govt: 'border-l-purple-500',
  any: 'border-l-gray-500',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseAgeRange(range: AgeRange): [number, number] {
  const [min, max] = range.split('-').map(Number);
  return [min, max];
}

function getSectorLabel(s: Sector): string {
  return SECTORS.find((sec) => sec.value === s)?.label || s;
}

// ─── Step Indicator ──────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
              i + 1 <= current
                ? 'bg-[#1a3a5c] text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
            )}
          >
            {i + 1 <= current ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
          </div>
          {i < total - 1 && (
            <div
              className={cn(
                'w-8 sm:w-12 h-0.5 transition-all',
                i + 1 < current ? 'bg-[#1a3a5c]' : 'bg-gray-200 dark:bg-gray-700'
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Career Card ─────────────────────────────────────────────────────────────

function CareerCard({
  option,
  isSelected,
  onToggleCompare,
  compareCount,
}: {
  option: CareerOption;
  isSelected: boolean;
  onToggleCompare: (id: string) => void;
  compareCount: number;
}) {
  const diff = DIFFICULTY_CONFIG[option.difficulty];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className={cn(
        'relative rounded-xl border-2 border-l-4 bg-white dark:bg-gray-900 overflow-hidden transition-all',
        SECTOR_COLORS[option.sector] || 'border-l-gray-400',
        isSelected
          ? 'border-[#1a3a5c] dark:border-blue-500 ring-2 ring-[#1a3a5c]/20 dark:ring-blue-500/20'
          : 'border-gray-200 dark:border-gray-700'
      )}
    >
      {/* Header */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-extrabold text-gray-900 dark:text-white leading-tight">
              {option.exam}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{option.post}</p>
          </div>
          <span
            className={cn(
              'flex-shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold',
              diff.bg,
              diff.text
            )}
          >
            {diff.label}
          </span>
        </div>

        {/* Key Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Salary</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">{option.salaryRange}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Age Limit</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {option.ageMin} – {option.ageMax} yrs
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Prep Time</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">{option.prepTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {option.vacancyTrend === 'increasing' ? (
              <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
            ) : option.vacancyTrend === 'decreasing' ? (
              <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
            ) : (
              <TrendingUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
            )}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Vacancies</p>
              <p
                className={cn(
                  'text-sm font-bold',
                  option.vacancyTrend === 'increasing'
                    ? 'text-green-600 dark:text-green-400'
                    : option.vacancyTrend === 'decreasing'
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-gray-600 dark:text-gray-400'
                )}
              >
                {option.vacancyTrend === 'increasing'
                  ? 'Increasing'
                  : option.vacancyTrend === 'decreasing'
                  ? 'Decreasing'
                  : 'Stable'}
              </p>
            </div>
          </div>
        </div>

        {/* Selection Steps */}
        <div className="mb-3">
          <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
            Selection Process
          </p>
          <div className="flex flex-wrap items-center gap-1">
            {option.selectionSteps.map((step, i) => (
              <span key={i} className="flex items-center">
                <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-md font-medium">
                  {step}
                </span>
                {i < option.selectionSteps.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-gray-400 mx-0.5 flex-shrink-0" />
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Highlights */}
        {option.highlights && (
          <div className="flex items-center gap-1.5 mb-3">
            <Star className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <p className="text-xs text-amber-700 dark:text-amber-400 font-semibold">{option.highlights}</p>
          </div>
        )}

        {/* Compare Button */}
        <button
          onClick={() => onToggleCompare(option.id)}
          disabled={!isSelected && compareCount >= 2}
          className={cn(
            'w-full mt-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5',
            isSelected
              ? 'bg-[#1a3a5c] text-white hover:bg-[#0d2137]'
              : compareCount >= 2
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          )}
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          {isSelected ? 'Selected for Compare' : 'Compare'}
        </button>
      </div>
    </motion.div>
  );
}

// ─── Compare Modal ───────────────────────────────────────────────────────────

function ComparePanel({
  items,
  onClose,
}: {
  items: CareerOption[];
  onClose: () => void;
}) {
  if (items.length < 2) return null;
  const [a, b] = items;

  const rows: { label: string; valA: string; valB: string; highlight?: 'higher-a' | 'higher-b' | 'none' }[] = [
    {
      label: 'Exam',
      valA: a.exam,
      valB: b.exam,
    },
    {
      label: 'Post',
      valA: a.post,
      valB: b.post,
    },
    {
      label: 'Salary Range',
      valA: a.salaryRange,
      valB: b.salaryRange,
      highlight: a.salaryMax > b.salaryMax ? 'higher-a' : a.salaryMax < b.salaryMax ? 'higher-b' : 'none',
    },
    {
      label: 'Max Salary',
      valA: `₹${a.salaryMax.toLocaleString('en-IN')}`,
      valB: `₹${b.salaryMax.toLocaleString('en-IN')}`,
      highlight: a.salaryMax > b.salaryMax ? 'higher-a' : a.salaryMax < b.salaryMax ? 'higher-b' : 'none',
    },
    {
      label: 'Age Limit',
      valA: `${a.ageMin} – ${a.ageMax} yrs`,
      valB: `${b.ageMin} – ${b.ageMax} yrs`,
    },
    {
      label: 'Difficulty',
      valA: DIFFICULTY_CONFIG[a.difficulty].label,
      valB: DIFFICULTY_CONFIG[b.difficulty].label,
    },
    {
      label: 'Prep Time',
      valA: a.prepTime,
      valB: b.prepTime,
    },
    {
      label: 'Selection Steps',
      valA: a.selectionSteps.length + ' steps',
      valB: b.selectionSteps.length + ' steps',
    },
    {
      label: 'Vacancy Trend',
      valA: a.vacancyTrend.charAt(0).toUpperCase() + a.vacancyTrend.slice(1),
      valB: b.vacancyTrend.charAt(0).toUpperCase() + b.vacancyTrend.slice(1),
    },
    {
      label: 'Sector',
      valA: getSectorLabel(a.sector),
      valB: getSectorLabel(b.sector),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full sm:max-w-2xl max-h-[85vh] bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700 bg-[#1a3a5c]">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5" /> Side-by-Side Comparison
          </h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase w-1/4">
                    Parameter
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-bold text-[#1a3a5c] dark:text-blue-400 uppercase w-[37.5%]">
                    {a.exam}
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-bold text-[#1a3a5c] dark:text-blue-400 uppercase w-[37.5%]">
                    {b.exam}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {rows.map((row, i) => (
                  <tr key={i}>
                    <td className="py-3 px-2 text-xs font-bold text-gray-500 dark:text-gray-400">
                      {row.label}
                    </td>
                    <td
                      className={cn(
                        'py-3 px-2 text-center font-semibold text-sm',
                        row.highlight === 'higher-a'
                          ? 'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/20 rounded-lg'
                          : 'text-gray-900 dark:text-white'
                      )}
                    >
                      {row.valA}
                    </td>
                    <td
                      className={cn(
                        'py-3 px-2 text-center font-semibold text-sm',
                        row.highlight === 'higher-b'
                          ? 'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/20 rounded-lg'
                          : 'text-gray-900 dark:text-white'
                      )}
                    >
                      {row.valB}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Selection Process Detail */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[a, b].map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-gray-200 dark:border-gray-700 p-4"
              >
                <h4 className="text-sm font-extrabold text-gray-900 dark:text-white mb-2">
                  {item.exam} — Selection Steps
                </h4>
                <ol className="space-y-1.5">
                  {item.selectionSteps.map((step, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <span className="w-5 h-5 rounded-full bg-[#1a3a5c] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function CareerPath() {
  const [step, setStep] = useState(1);
  const [qualification, setQualification] = useState<Qualification | null>(null);
  const [ageRange, setAgeRange] = useState<AgeRange | null>(null);
  const [sector, setSector] = useState<Sector>('any');
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  const handleQualificationSelect = useCallback((q: Qualification) => {
    setQualification(q);
    setStep(2);
  }, []);

  const handleAgeSelect = useCallback((a: AgeRange) => {
    setAgeRange(a);
    setStep(3);
  }, []);

  const handleSectorSelect = useCallback((s: Sector) => {
    setSector(s);
    setStep(4);
  }, []);

  const handleReset = useCallback(() => {
    setStep(1);
    setQualification(null);
    setAgeRange(null);
    setSector('any');
    setCompareIds([]);
    setShowCompare(false);
  }, []);

  const handleToggleCompare = useCallback((id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) return prev;
      return [...prev, id];
    });
  }, []);

  // Filter results
  const filteredResults = useMemo(() => {
    if (!qualification || !ageRange) return [];

    const [ageMin, ageMax] = parseAgeRange(ageRange);

    return CAREER_DATA.filter((c) => {
      // Qualification match
      if (!c.qualifications.includes(qualification)) return false;

      // Age overlap: user's age range must overlap with exam's age range
      if (ageMin > c.ageMax || ageMax < c.ageMin) return false;

      // Sector filter
      if (sector !== 'any' && c.sector !== sector) return false;

      return true;
    }).sort((a, b) => {
      // Sort by salary max descending
      return b.salaryMax - a.salaryMax;
    });
  }, [qualification, ageRange, sector]);

  // Group by sector
  const groupedResults = useMemo(() => {
    const groups: Record<string, CareerOption[]> = {};
    filteredResults.forEach((c) => {
      const key = c.sector;
      if (!groups[key]) groups[key] = [];
      groups[key].push(c);
    });
    return groups;
  }, [filteredResults]);

  const compareItems = useMemo(
    () => CAREER_DATA.filter((c) => compareIds.includes(c.id)),
    [compareIds]
  );

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      {step < 4 && <StepIndicator current={step} total={3} />}

      {/* Step 1: Qualification */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-lg font-extrabold text-gray-900 dark:text-white mb-1">
              Step 1: What is your qualification?
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              आपकी शिक्षा क्या है? सबसे उच्च योग्यता चुनें।
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {QUALIFICATIONS.map((q) => (
                <button
                  key={q.value}
                  onClick={() => handleQualificationSelect(q.value)}
                  className={cn(
                    'rounded-xl border-2 p-4 text-center transition-all hover:border-[#1a3a5c] hover:shadow-md active:scale-95',
                    qualification === q.value
                      ? 'border-[#1a3a5c] bg-[#1a3a5c]/5 dark:bg-[#1a3a5c]/20'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'
                  )}
                >
                  <GraduationCap className="w-6 h-6 mx-auto mb-2 text-[#1a3a5c] dark:text-blue-400" />
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{q.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{q.labelHi}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Age Range */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">
                Step 2: What is your age range?
              </h2>
              <button
                onClick={() => setStep(1)}
                className="text-xs font-bold text-[#1a3a5c] dark:text-blue-400 hover:underline"
              >
                Back
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              आपकी उम्र कितनी है? अपनी age group चुनें।
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {AGE_RANGES.map((a) => (
                <button
                  key={a.value}
                  onClick={() => handleAgeSelect(a.value)}
                  className={cn(
                    'rounded-xl border-2 p-4 text-center transition-all hover:border-[#1a3a5c] hover:shadow-md active:scale-95',
                    ageRange === a.value
                      ? 'border-[#1a3a5c] bg-[#1a3a5c]/5 dark:bg-[#1a3a5c]/20'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'
                  )}
                >
                  <Users className="w-6 h-6 mx-auto mb-2 text-[#1a3a5c] dark:text-blue-400" />
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{a.label}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Sector */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">
                Step 3: Preferred sector?
              </h2>
              <button
                onClick={() => setStep(2)}
                className="text-xs font-bold text-[#1a3a5c] dark:text-blue-400 hover:underline"
              >
                Back
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              कौन सा क्षेत्र पसंद है? &quot;All Sectors&quot; चुनें सभी विकल्प देखने के लिए।
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SECTORS.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.value}
                    onClick={() => handleSectorSelect(s.value)}
                    className={cn(
                      'rounded-xl border-2 p-4 text-center transition-all hover:border-[#1a3a5c] hover:shadow-md active:scale-95',
                      sector === s.value
                        ? 'border-[#1a3a5c] bg-[#1a3a5c]/5 dark:bg-[#1a3a5c]/20'
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'
                    )}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2 text-[#1a3a5c] dark:text-blue-400" />
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{s.label}</p>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Step 4: Results */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Results Header */}
            <div className="rounded-2xl bg-[#1a3a5c] p-5 text-white mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-extrabold mb-1 flex items-center gap-2">
                    <Briefcase className="w-6 h-6" />
                    Your Career Options
                  </h2>
                  <p className="text-sm text-blue-200">
                    {QUALIFICATIONS.find((q) => q.value === qualification)?.label} |{' '}
                    {ageRange} years |{' '}
                    {getSectorLabel(sector)}
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-bold transition-all"
                >
                  <RotateCcw className="w-4 h-4" /> Reset
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <div className="bg-white/10 rounded-lg px-3 py-2">
                  <p className="text-xs text-blue-200">Total Options</p>
                  <p className="text-2xl font-extrabold">{filteredResults.length}</p>
                </div>
                <div className="bg-white/10 rounded-lg px-3 py-2">
                  <p className="text-xs text-blue-200">Highest Salary</p>
                  <p className="text-2xl font-extrabold">
                    {filteredResults.length > 0
                      ? `₹${Math.max(...filteredResults.map((r) => r.salaryMax)).toLocaleString('en-IN')}`
                      : 'N/A'}
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg px-3 py-2">
                  <p className="text-xs text-blue-200">Easy Exams</p>
                  <p className="text-2xl font-extrabold">
                    {filteredResults.filter((r) => r.difficulty === 'easy').length}
                  </p>
                </div>
              </div>
            </div>

            {/* Sector Filter Tabs (when showing All Sectors results) */}
            {sector === 'any' && Object.keys(groupedResults).length > 1 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {Object.entries(groupedResults).map(([sectorKey, items]) => (
                  <span
                    key={sectorKey}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300"
                  >
                    <span
                      className={cn(
                        'w-2 h-2 rounded-full',
                        SECTOR_COLORS[sectorKey]?.replace('border-l-', 'bg-') || 'bg-gray-400'
                      )}
                    />
                    {getSectorLabel(sectorKey as Sector)} ({items.length})
                  </span>
                ))}
              </div>
            )}

            {/* Compare Bar */}
            {compareIds.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-0 z-40 rounded-xl border-2 border-[#1a3a5c] dark:border-blue-500 bg-blue-50 dark:bg-blue-950/30 p-3 mb-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <ArrowLeftRight className="w-4 h-4 text-[#1a3a5c] dark:text-blue-400" />
                  <span className="text-sm font-bold text-[#1a3a5c] dark:text-blue-400">
                    Compare: {compareIds.length}/2 selected
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {compareItems.map((c) => c.exam).join(' vs ')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {compareIds.length === 2 && (
                    <button
                      onClick={() => setShowCompare(true)}
                      className="px-3 py-1.5 rounded-lg bg-[#1a3a5c] text-white text-xs font-bold hover:bg-[#0d2137] transition-all"
                    >
                      Compare Now
                    </button>
                  )}
                  <button
                    onClick={() => setCompareIds([])}
                    className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Results Grid grouped by sector */}
            {filteredResults.length === 0 ? (
              <div className="text-center py-12 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                <Briefcase className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                <p className="text-lg font-bold text-gray-500 dark:text-gray-400">
                  No matching career options found
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  कोई मिलान नहीं मिला। कृपया अलग qualification या sector चुनें।
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-4 py-2 rounded-lg bg-[#1a3a5c] text-white text-sm font-bold hover:bg-[#0d2137] transition-all"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {Object.entries(groupedResults).map(([sectorKey, items]) => (
                  <div key={sectorKey}>
                    <h3 className="text-base font-extrabold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <span
                        className={cn(
                          'w-3 h-3 rounded-full',
                          SECTOR_COLORS[sectorKey]?.replace('border-l-', 'bg-') || 'bg-gray-400'
                        )}
                      />
                      {getSectorLabel(sectorKey as Sector)}
                      <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">
                        ({items.length} {items.length === 1 ? 'option' : 'options'})
                      </span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {items.map((option) => (
                        <CareerCard
                          key={option.id}
                          option={option}
                          isSelected={compareIds.includes(option.id)}
                          onToggleCompare={handleToggleCompare}
                          compareCount={compareIds.length}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-8 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800 dark:text-amber-300">
                <p className="font-bold mb-1">Disclaimer / अस्वीकरण</p>
                <p>
                  यह जानकारी सामान्य मार्गदर्शन के लिए है। Salary 7th Pay Commission (DA 56%) पर आधारित है।
                  Age limits, eligibility और vacancies अलग-अलग notifications के अनुसार बदल सकती हैं।
                  कृपया apply करने से पहले official notification अवश्य देखें।
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compare Modal */}
      <AnimatePresence>
        {showCompare && compareItems.length === 2 && (
          <ComparePanel
            items={compareItems}
            onClose={() => setShowCompare(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
