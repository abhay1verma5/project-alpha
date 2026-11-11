'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  GraduationCap,
  Calendar,
  Briefcase,
  Clock,
  MapPin,
  Target,
  Brain,
  ChevronRight,
  ChevronLeft,
  Trophy,
  Star,
  Share2,
  ExternalLink,
  IndianRupee,
  Timer,
  Sparkles,
  RotateCcw,
  Award,
  TrendingUp,
  Shield,
  BookOpen,
} from 'lucide-react';

/* ---------- Types ---------- */

type Qualification = '8th' | '10th' | '12th' | 'graduate' | 'post_grad' | 'btech' | 'diploma' | 'iti';
type WorkStyle = 'desk' | 'field' | 'teaching' | 'defence' | 'technical' | 'any';
type StudyHours = '1-2' | '2-4' | '4-6' | '6+';
type Location = 'home_state' | 'anywhere' | 'metro';
type Priority = 'salary' | 'security' | 'work_life' | 'prestige' | 'quick';
type Strength = 'math' | 'reasoning' | 'english' | 'gk' | 'science' | 'hindi';

interface UserProfile {
  qualification: Qualification | null;
  age: number | null;
  workStyle: WorkStyle | null;
  studyHours: StudyHours | null;
  location: Location | null;
  priority: Priority | null;
  strengths: Strength[];
}

interface ExamEntry {
  id: string;
  name: string;
  fullName: string;
  minQualification: Qualification;
  minAge: number;
  maxAge: number;
  workStyle: WorkStyle[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  salaryRange: string;
  salaryScore: number;       // 1-5
  securityScore: number;     // 1-5
  workLifeScore: number;     // 1-5
  prestigeScore: number;     // 1-5
  selectionSpeed: number;    // 1-5 (5 = quickest)
  location: ('home_state' | 'anywhere' | 'metro')[];
  keySubjects: Strength[];
  prepMonths: number;
  nextExamDate: string;
  slug: string;
  category: string;
}

interface ScoredExam {
  exam: ExamEntry;
  totalScore: number;
  qualMatch: boolean;
  ageMatch: boolean;
  reasons: string[];
}

/* ---------- Qualification hierarchy ---------- */

const QUAL_LEVEL: Record<Qualification, number> = {
  '8th': 1,
  '10th': 2,
  '12th': 3,
  'iti': 3,
  'diploma': 4,
  'graduate': 5,
  'btech': 6,
  'post_grad': 7,
};

/* ---------- Exam database (~30 exams) ---------- */

const EXAM_DB: ExamEntry[] = [
  {
    id: 'ssc-cgl', name: 'SSC CGL', fullName: 'SSC Combined Graduate Level',
    minQualification: 'graduate', minAge: 18, maxAge: 32,
    workStyle: ['desk'], difficulty: 3, salaryRange: '44,900 - 1,51,100',
    salaryScore: 4, securityScore: 5, workLifeScore: 4, prestigeScore: 4, selectionSpeed: 2,
    location: ['anywhere'], keySubjects: ['math', 'reasoning', 'english', 'gk'],
    prepMonths: 8, nextExamDate: 'Jun 2027', slug: '/ssc-cgl', category: 'SSC',
  },
  {
    id: 'ssc-chsl', name: 'SSC CHSL', fullName: 'SSC Combined Higher Secondary Level',
    minQualification: '12th', minAge: 18, maxAge: 27,
    workStyle: ['desk'], difficulty: 2, salaryRange: '25,500 - 81,100',
    salaryScore: 3, securityScore: 5, workLifeScore: 4, prestigeScore: 3, selectionSpeed: 3,
    location: ['anywhere'], keySubjects: ['math', 'reasoning', 'english', 'gk'],
    prepMonths: 5, nextExamDate: 'Mar 2027', slug: '/ssc-chsl', category: 'SSC',
  },
  {
    id: 'ssc-gd', name: 'SSC GD', fullName: 'SSC GD Constable',
    minQualification: '10th', minAge: 18, maxAge: 23,
    workStyle: ['defence', 'field'], difficulty: 1, salaryRange: '21,700 - 69,100',
    salaryScore: 2, securityScore: 5, workLifeScore: 2, prestigeScore: 2, selectionSpeed: 4,
    location: ['anywhere'], keySubjects: ['math', 'reasoning', 'hindi', 'gk'],
    prepMonths: 3, nextExamDate: 'Feb 2027', slug: '/ssc-gd-constable', category: 'SSC',
  },
  {
    id: 'ssc-mts', name: 'SSC MTS', fullName: 'SSC Multi-Tasking Staff',
    minQualification: '10th', minAge: 18, maxAge: 25,
    workStyle: ['desk', 'field'], difficulty: 1, salaryRange: '18,000 - 56,900',
    salaryScore: 2, securityScore: 5, workLifeScore: 4, prestigeScore: 2, selectionSpeed: 4,
    location: ['anywhere'], keySubjects: ['math', 'reasoning', 'english', 'gk'],
    prepMonths: 3, nextExamDate: 'Apr 2027', slug: '/ssc-mts', category: 'SSC',
  },
  {
    id: 'ssc-je', name: 'SSC JE', fullName: 'SSC Junior Engineer',
    minQualification: 'diploma', minAge: 18, maxAge: 32,
    workStyle: ['technical', 'field'], difficulty: 3, salaryRange: '35,400 - 1,12,400',
    salaryScore: 3, securityScore: 5, workLifeScore: 3, prestigeScore: 3, selectionSpeed: 2,
    location: ['anywhere'], keySubjects: ['math', 'reasoning', 'science'],
    prepMonths: 6, nextExamDate: 'Jul 2027', slug: '/ssc-je', category: 'SSC',
  },
  {
    id: 'upsc-cse', name: 'UPSC CSE', fullName: 'UPSC Civil Services (IAS/IPS)',
    minQualification: 'graduate', minAge: 21, maxAge: 32,
    workStyle: ['desk', 'field'], difficulty: 5, salaryRange: '56,100 - 2,50,000',
    salaryScore: 5, securityScore: 5, workLifeScore: 2, prestigeScore: 5, selectionSpeed: 1,
    location: ['anywhere'], keySubjects: ['gk', 'english', 'reasoning'],
    prepMonths: 18, nextExamDate: 'May 2027', slug: '/upsc-cse', category: 'UPSC',
  },
  {
    id: 'upsc-cds', name: 'UPSC CDS', fullName: 'Combined Defence Services',
    minQualification: 'graduate', minAge: 20, maxAge: 25,
    workStyle: ['defence'], difficulty: 3, salaryRange: '56,100 - 1,77,500',
    salaryScore: 4, securityScore: 5, workLifeScore: 2, prestigeScore: 5, selectionSpeed: 2,
    location: ['anywhere'], keySubjects: ['math', 'english', 'gk'],
    prepMonths: 6, nextExamDate: 'Apr 2027', slug: '/upsc-cds', category: 'UPSC',
  },
  {
    id: 'upsc-nda', name: 'UPSC NDA', fullName: 'National Defence Academy',
    minQualification: '12th', minAge: 16, maxAge: 19,
    workStyle: ['defence'], difficulty: 3, salaryRange: '56,100 - 1,77,500',
    salaryScore: 4, securityScore: 5, workLifeScore: 2, prestigeScore: 5, selectionSpeed: 2,
    location: ['anywhere'], keySubjects: ['math', 'english', 'gk', 'science'],
    prepMonths: 6, nextExamDate: 'Apr 2027', slug: '/upsc-nda', category: 'UPSC',
  },
  {
    id: 'rrb-ntpc', name: 'RRB NTPC', fullName: 'Railway Non-Technical Popular Categories',
    minQualification: '12th', minAge: 18, maxAge: 33,
    workStyle: ['desk', 'field'], difficulty: 2, salaryRange: '19,900 - 92,300',
    salaryScore: 3, securityScore: 5, workLifeScore: 3, prestigeScore: 3, selectionSpeed: 2,
    location: ['anywhere'], keySubjects: ['math', 'reasoning', 'gk'],
    prepMonths: 6, nextExamDate: 'May 2027', slug: '/rrb-ntpc', category: 'Railway',
  },
  {
    id: 'rrb-group-d', name: 'RRB Group D', fullName: 'Railway Group D',
    minQualification: '10th', minAge: 18, maxAge: 33,
    workStyle: ['field', 'technical'], difficulty: 1, salaryRange: '18,000 - 56,900',
    salaryScore: 2, securityScore: 5, workLifeScore: 3, prestigeScore: 2, selectionSpeed: 3,
    location: ['anywhere'], keySubjects: ['math', 'reasoning', 'science', 'gk'],
    prepMonths: 4, nextExamDate: 'Mar 2027', slug: '/rrb-group-d', category: 'Railway',
  },
  {
    id: 'rrb-alp', name: 'RRB ALP', fullName: 'Railway Assistant Loco Pilot',
    minQualification: 'iti', minAge: 18, maxAge: 30,
    workStyle: ['technical', 'field'], difficulty: 2, salaryRange: '19,900 - 63,200',
    salaryScore: 3, securityScore: 5, workLifeScore: 2, prestigeScore: 3, selectionSpeed: 3,
    location: ['anywhere'], keySubjects: ['math', 'reasoning', 'science'],
    prepMonths: 5, nextExamDate: 'Jun 2027', slug: '/rrb-alp', category: 'Railway',
  },
  {
    id: 'ibps-po', name: 'IBPS PO', fullName: 'IBPS Probationary Officer',
    minQualification: 'graduate', minAge: 20, maxAge: 30,
    workStyle: ['desk'], difficulty: 3, salaryRange: '52,000 - 1,10,000',
    salaryScore: 4, securityScore: 5, workLifeScore: 3, prestigeScore: 4, selectionSpeed: 3,
    location: ['anywhere', 'metro'], keySubjects: ['math', 'reasoning', 'english'],
    prepMonths: 6, nextExamDate: 'Oct 2027', slug: '/ibps-po', category: 'Banking',
  },
  {
    id: 'ibps-clerk', name: 'IBPS Clerk', fullName: 'IBPS Clerk',
    minQualification: 'graduate', minAge: 20, maxAge: 28,
    workStyle: ['desk'], difficulty: 2, salaryRange: '28,000 - 65,000',
    salaryScore: 3, securityScore: 5, workLifeScore: 4, prestigeScore: 3, selectionSpeed: 3,
    location: ['home_state', 'anywhere'], keySubjects: ['math', 'reasoning', 'english'],
    prepMonths: 4, nextExamDate: 'Sep 2027', slug: '/ibps-clerk', category: 'Banking',
  },
  {
    id: 'sbi-po', name: 'SBI PO', fullName: 'State Bank of India PO',
    minQualification: 'graduate', minAge: 21, maxAge: 30,
    workStyle: ['desk'], difficulty: 3, salaryRange: '55,000 - 1,20,000',
    salaryScore: 4, securityScore: 5, workLifeScore: 3, prestigeScore: 4, selectionSpeed: 3,
    location: ['anywhere', 'metro'], keySubjects: ['math', 'reasoning', 'english'],
    prepMonths: 6, nextExamDate: 'Nov 2027', slug: '/sbi-po', category: 'Banking',
  },
  {
    id: 'sbi-clerk', name: 'SBI Clerk', fullName: 'State Bank of India Clerk',
    minQualification: 'graduate', minAge: 20, maxAge: 28,
    workStyle: ['desk'], difficulty: 2, salaryRange: '26,000 - 60,000',
    salaryScore: 3, securityScore: 5, workLifeScore: 4, prestigeScore: 3, selectionSpeed: 3,
    location: ['home_state', 'anywhere'], keySubjects: ['math', 'reasoning', 'english'],
    prepMonths: 4, nextExamDate: 'Nov 2027', slug: '/sbi-clerk', category: 'Banking',
  },
  {
    id: 'rbi-grade-b', name: 'RBI Grade B', fullName: 'Reserve Bank of India Grade B',
    minQualification: 'graduate', minAge: 21, maxAge: 30,
    workStyle: ['desk'], difficulty: 4, salaryRange: '77,208 - 2,10,000',
    salaryScore: 5, securityScore: 5, workLifeScore: 4, prestigeScore: 5, selectionSpeed: 2,
    location: ['metro'], keySubjects: ['english', 'reasoning', 'gk', 'math'],
    prepMonths: 8, nextExamDate: 'Aug 2027', slug: '/rbi-grade-b', category: 'Banking',
  },
  {
    id: 'ctet', name: 'CTET', fullName: 'Central Teacher Eligibility Test',
    minQualification: 'graduate', minAge: 18, maxAge: 45,
    workStyle: ['teaching'], difficulty: 2, salaryRange: '35,400 - 1,12,400',
    salaryScore: 3, securityScore: 5, workLifeScore: 5, prestigeScore: 3, selectionSpeed: 3,
    location: ['anywhere', 'home_state'], keySubjects: ['gk', 'reasoning', 'hindi', 'english'],
    prepMonths: 4, nextExamDate: 'Jul 2027', slug: '/ctet', category: 'Teaching',
  },
  {
    id: 'super-tet', name: 'Super TET', fullName: 'UP Super TET',
    minQualification: 'graduate', minAge: 21, maxAge: 40,
    workStyle: ['teaching'], difficulty: 2, salaryRange: '36,000 - 1,00,000',
    salaryScore: 3, securityScore: 5, workLifeScore: 5, prestigeScore: 3, selectionSpeed: 3,
    location: ['home_state'], keySubjects: ['gk', 'reasoning', 'hindi', 'science', 'math'],
    prepMonths: 4, nextExamDate: 'Aug 2027', slug: '/super-tet', category: 'Teaching',
  },
  {
    id: 'delhi-police', name: 'Delhi Police', fullName: 'Delhi Police Constable',
    minQualification: '12th', minAge: 18, maxAge: 25,
    workStyle: ['field', 'defence'], difficulty: 2, salaryRange: '21,700 - 69,100',
    salaryScore: 3, securityScore: 5, workLifeScore: 2, prestigeScore: 3, selectionSpeed: 3,
    location: ['metro'], keySubjects: ['reasoning', 'math', 'gk', 'hindi'],
    prepMonths: 4, nextExamDate: 'Mar 2027', slug: '/delhi-police', category: 'Police',
  },
  {
    id: 'up-police', name: 'UP Police', fullName: 'UP Police Constable',
    minQualification: '12th', minAge: 18, maxAge: 28,
    workStyle: ['field', 'defence'], difficulty: 1, salaryRange: '21,700 - 69,100',
    salaryScore: 2, securityScore: 5, workLifeScore: 2, prestigeScore: 2, selectionSpeed: 4,
    location: ['home_state'], keySubjects: ['hindi', 'gk', 'reasoning', 'math'],
    prepMonths: 3, nextExamDate: 'Feb 2027', slug: '/up-police-constable', category: 'Police',
  },
  {
    id: 'army-gd', name: 'Army GD', fullName: 'Indian Army Soldier GD',
    minQualification: '10th', minAge: 17, maxAge: 21,
    workStyle: ['defence'], difficulty: 2, salaryRange: '21,700 - 69,100',
    salaryScore: 3, securityScore: 5, workLifeScore: 1, prestigeScore: 4, selectionSpeed: 4,
    location: ['anywhere'], keySubjects: ['gk', 'math', 'reasoning', 'science'],
    prepMonths: 3, nextExamDate: 'Ongoing', slug: '/indian-army', category: 'Defence',
  },
  {
    id: 'navy-ssr', name: 'Navy SSR', fullName: 'Indian Navy SSR',
    minQualification: '12th', minAge: 17, maxAge: 20,
    workStyle: ['defence', 'technical'], difficulty: 2, salaryRange: '21,700 - 69,100',
    salaryScore: 3, securityScore: 5, workLifeScore: 1, prestigeScore: 4, selectionSpeed: 4,
    location: ['anywhere'], keySubjects: ['math', 'science', 'english', 'gk'],
    prepMonths: 3, nextExamDate: 'Ongoing', slug: '/indian-navy', category: 'Defence',
  },
  {
    id: 'airforce-x', name: 'Air Force X', fullName: 'Indian Air Force Group X',
    minQualification: '12th', minAge: 17, maxAge: 21,
    workStyle: ['defence', 'technical'], difficulty: 3, salaryRange: '21,700 - 69,100',
    salaryScore: 3, securityScore: 5, workLifeScore: 1, prestigeScore: 4, selectionSpeed: 3,
    location: ['anywhere'], keySubjects: ['math', 'science', 'english'],
    prepMonths: 4, nextExamDate: 'Ongoing', slug: '/indian-air-force', category: 'Defence',
  },
  {
    id: 'gate', name: 'GATE', fullName: 'Graduate Aptitude Test in Engineering',
    minQualification: 'btech', minAge: 16, maxAge: 45,
    workStyle: ['technical', 'desk'], difficulty: 4, salaryRange: '40,000 - 2,00,000 (PSU)',
    salaryScore: 5, securityScore: 4, workLifeScore: 4, prestigeScore: 5, selectionSpeed: 2,
    location: ['metro', 'anywhere'], keySubjects: ['math', 'reasoning', 'science'],
    prepMonths: 8, nextExamDate: 'Feb 2027', slug: '/gate', category: 'Engineering',
  },
  {
    id: 'lic-aao', name: 'LIC AAO', fullName: 'LIC Assistant Administrative Officer',
    minQualification: 'graduate', minAge: 21, maxAge: 30,
    workStyle: ['desk'], difficulty: 3, salaryRange: '50,000 - 1,05,000',
    salaryScore: 4, securityScore: 5, workLifeScore: 4, prestigeScore: 4, selectionSpeed: 3,
    location: ['anywhere'], keySubjects: ['math', 'reasoning', 'english', 'gk'],
    prepMonths: 5, nextExamDate: 'Sep 2027', slug: '/lic-aao', category: 'Insurance',
  },
  {
    id: 'epfo-ssa', name: 'EPFO SSA', fullName: 'EPFO Social Security Asst.',
    minQualification: 'graduate', minAge: 18, maxAge: 27,
    workStyle: ['desk'], difficulty: 2, salaryRange: '36,000 - 85,000',
    salaryScore: 3, securityScore: 5, workLifeScore: 5, prestigeScore: 3, selectionSpeed: 3,
    location: ['anywhere', 'home_state'], keySubjects: ['math', 'reasoning', 'english', 'gk'],
    prepMonths: 4, nextExamDate: 'Aug 2027', slug: '/epfo-ssa', category: 'Central Govt',
  },
  {
    id: 'fci-manager', name: 'FCI Manager', fullName: 'FCI Category III Manager',
    minQualification: 'graduate', minAge: 18, maxAge: 27,
    workStyle: ['desk', 'field'], difficulty: 3, salaryRange: '40,000 - 1,00,000',
    salaryScore: 3, securityScore: 5, workLifeScore: 3, prestigeScore: 3, selectionSpeed: 2,
    location: ['anywhere'], keySubjects: ['math', 'reasoning', 'english', 'gk'],
    prepMonths: 5, nextExamDate: 'TBA', slug: '/fci-manager', category: 'Central Govt',
  },
  {
    id: 'state-pcs', name: 'State PCS', fullName: 'State Public Service Commission',
    minQualification: 'graduate', minAge: 21, maxAge: 40,
    workStyle: ['desk', 'field'], difficulty: 4, salaryRange: '44,900 - 2,09,200',
    salaryScore: 5, securityScore: 5, workLifeScore: 3, prestigeScore: 5, selectionSpeed: 1,
    location: ['home_state'], keySubjects: ['gk', 'hindi', 'reasoning', 'math'],
    prepMonths: 12, nextExamDate: 'Varies by state', slug: '/state-psc', category: 'State PSC',
  },
  {
    id: 'railway-rpf', name: 'Railway RPF', fullName: 'Railway Protection Force',
    minQualification: '10th', minAge: 18, maxAge: 25,
    workStyle: ['field', 'defence'], difficulty: 1, salaryRange: '21,700 - 69,100',
    salaryScore: 2, securityScore: 5, workLifeScore: 2, prestigeScore: 2, selectionSpeed: 4,
    location: ['anywhere'], keySubjects: ['reasoning', 'math', 'gk'],
    prepMonths: 3, nextExamDate: 'Apr 2027', slug: '/railway-rpf', category: 'Railway',
  },
];

/* ---------- Quiz step configuration ---------- */

const STEPS = [
  {
    key: 'qualification',
    title: 'Your Qualification',
    subtitle: 'आपकी सबसे उच्च शैक्षिक योग्यता क्या है?',
    icon: GraduationCap,
  },
  {
    key: 'age',
    title: 'Your Age',
    subtitle: 'आपकी उम्र क्या है?',
    icon: Calendar,
  },
  {
    key: 'workStyle',
    title: 'Preferred Work Style',
    subtitle: 'आपको किस तरह की नौकरी पसंद है?',
    icon: Briefcase,
  },
  {
    key: 'studyHours',
    title: 'Daily Study Hours',
    subtitle: 'रोज़ कितने घंटे पढ़ाई कर सकते हैं?',
    icon: Clock,
  },
  {
    key: 'location',
    title: 'Preferred Location',
    subtitle: 'कहाँ नौकरी करना चाहेंगे?',
    icon: MapPin,
  },
  {
    key: 'priority',
    title: 'Your Top Priority',
    subtitle: 'नौकरी में सबसे ज़रूरी क्या है?',
    icon: Target,
  },
  {
    key: 'strengths',
    title: 'Your Strengths',
    subtitle: 'कौन से विषय मज़बूत हैं? (कम से कम 1 चुनें)',
    icon: Brain,
  },
] as const;

const QUALIFICATION_OPTIONS: { value: Qualification; label: string; labelHi: string; icon: string }[] = [
  { value: '8th', label: '8th Pass', labelHi: '8वीं पास', icon: '📗' },
  { value: '10th', label: '10th Pass', labelHi: '10वीं पास', icon: '📘' },
  { value: '12th', label: '12th Pass', labelHi: '12वीं पास', icon: '📙' },
  { value: 'iti', label: 'ITI', labelHi: 'आईटीआई', icon: '🔧' },
  { value: 'diploma', label: 'Diploma', labelHi: 'डिप्लोमा', icon: '📐' },
  { value: 'graduate', label: 'Graduate', labelHi: 'स्नातक', icon: '🎓' },
  { value: 'btech', label: 'B.Tech / B.E.', labelHi: 'बी.टेक', icon: '⚙️' },
  { value: 'post_grad', label: 'Post Graduate', labelHi: 'पोस्ट ग्रेजुएट', icon: '🏅' },
];

const WORK_STYLE_OPTIONS: { value: WorkStyle; label: string; labelHi: string; icon: typeof Briefcase }[] = [
  { value: 'desk', label: 'Desk Job', labelHi: 'ऑफिस/डेस्क जॉब', icon: Briefcase },
  { value: 'field', label: 'Field Job', labelHi: 'फील्ड जॉब', icon: MapPin },
  { value: 'teaching', label: 'Teaching', labelHi: 'शिक्षण', icon: BookOpen },
  { value: 'defence', label: 'Defence / Physical', labelHi: 'रक्षा/शारीरिक', icon: Shield },
  { value: 'technical', label: 'Technical', labelHi: 'तकनीकी', icon: Target },
  { value: 'any', label: 'Any / Open', labelHi: 'कोई भी', icon: Sparkles },
];

const STUDY_HOURS_OPTIONS: { value: StudyHours; label: string; labelHi: string }[] = [
  { value: '1-2', label: '1-2 hours', labelHi: '1-2 घंटे' },
  { value: '2-4', label: '2-4 hours', labelHi: '2-4 घंटे' },
  { value: '4-6', label: '4-6 hours', labelHi: '4-6 घंटे' },
  { value: '6+', label: '6+ hours', labelHi: '6+ घंटे' },
];

const LOCATION_OPTIONS: { value: Location; label: string; labelHi: string }[] = [
  { value: 'home_state', label: 'Home State', labelHi: 'अपना राज्य' },
  { value: 'anywhere', label: 'Anywhere in India', labelHi: 'पूरे भारत में कहीं भी' },
  { value: 'metro', label: 'Metro Cities Only', labelHi: 'सिर्फ बड़े शहर' },
];

const PRIORITY_OPTIONS: { value: Priority; label: string; labelHi: string; icon: typeof Trophy }[] = [
  { value: 'salary', label: 'High Salary', labelHi: 'ज़्यादा वेतन', icon: IndianRupee },
  { value: 'security', label: 'Job Security', labelHi: 'नौकरी की सुरक्षा', icon: Shield },
  { value: 'work_life', label: 'Work-Life Balance', labelHi: 'वर्क-लाइफ बैलेंस', icon: Timer },
  { value: 'prestige', label: 'Prestige / Status', labelHi: 'प्रतिष्ठा', icon: Award },
  { value: 'quick', label: 'Quick Selection', labelHi: 'जल्दी सेलेक्शन', icon: TrendingUp },
];

const STRENGTH_OPTIONS: { value: Strength; label: string; labelHi: string }[] = [
  { value: 'math', label: 'Math', labelHi: 'गणित' },
  { value: 'reasoning', label: 'Reasoning', labelHi: 'रीज़निंग' },
  { value: 'english', label: 'English', labelHi: 'अंग्रेजी' },
  { value: 'gk', label: 'GK / Current Affairs', labelHi: 'जीके / करेंट अफेयर्स' },
  { value: 'science', label: 'Science', labelHi: 'विज्ञान' },
  { value: 'hindi', label: 'Hindi', labelHi: 'हिंदी' },
];

/* ---------- Scoring algorithm ---------- */

function computeScores(profile: UserProfile): ScoredExam[] {
  const results: ScoredExam[] = [];

  for (const exam of EXAM_DB) {
    const reasons: string[] = [];
    let score = 0;

    // 1. Qualification match (weight: 25)
    const userQualLevel = QUAL_LEVEL[profile.qualification!];
    const examQualLevel = QUAL_LEVEL[exam.minQualification];
    const qualMatch = userQualLevel >= examQualLevel;

    if (qualMatch) {
      score += 25;
      if (userQualLevel === examQualLevel) {
        reasons.push('Qualification perfectly matches requirement');
      } else {
        reasons.push('You exceed the minimum qualification');
      }
    }

    // 2. Age eligibility (weight: 20)
    const age = profile.age!;
    const ageMatch = age >= exam.minAge && age <= exam.maxAge;

    if (ageMatch) {
      score += 20;
      const yearsLeft = exam.maxAge - age;
      if (yearsLeft <= 2) {
        reasons.push(`Hurry! Only ${yearsLeft} year(s) of age eligibility left`);
      } else {
        reasons.push(`${yearsLeft} years of eligibility remaining`);
      }
    }

    // 3. Work style preference (weight: 15)
    const workStyle = profile.workStyle!;
    if (workStyle === 'any' || exam.workStyle.includes(workStyle)) {
      score += 15;
      if (workStyle !== 'any') {
        reasons.push(`Matches your preferred ${workStyle} work style`);
      }
    } else {
      // partial score if there's overlap in broader sense
      score += 3;
    }

    // 4. Study hours vs difficulty (weight: 15)
    const studyHoursMap: Record<StudyHours, number> = { '1-2': 1, '2-4': 2, '4-6': 3, '6+': 4 };
    const userStudy = studyHoursMap[profile.studyHours!];
    const difficultyNeed = Math.ceil(exam.difficulty * 0.8); // map 1-5 to approximate study level needed

    if (userStudy >= difficultyNeed) {
      score += 15;
      reasons.push('Your study time is sufficient for this exam');
    } else if (userStudy >= difficultyNeed - 1) {
      score += 8;
      reasons.push('Manageable with focused preparation');
    } else {
      score += 2;
    }

    // 5. Location preference (weight: 10)
    const locPref = profile.location!;
    if (exam.location.includes(locPref)) {
      score += 10;
      reasons.push(`Available in your preferred location type`);
    } else if (locPref === 'metro' && exam.location.includes('anywhere')) {
      score += 7;
    } else if (locPref === 'home_state' && exam.location.includes('anywhere')) {
      score += 5;
    }

    // 6. Priority alignment (weight: 10)
    const priorityMap: Record<Priority, keyof ExamEntry> = {
      salary: 'salaryScore',
      security: 'securityScore',
      work_life: 'workLifeScore',
      prestige: 'prestigeScore',
      quick: 'selectionSpeed',
    };
    const priorityField = priorityMap[profile.priority!];
    const priorityValue = exam[priorityField] as number;
    const priorityScore = (priorityValue / 5) * 10;
    score += priorityScore;
    if (priorityValue >= 4) {
      const priorityLabels: Record<Priority, string> = {
        salary: 'high salary potential',
        security: 'excellent job security',
        work_life: 'great work-life balance',
        prestige: 'high prestige role',
        quick: 'relatively fast selection process',
      };
      reasons.push(`Offers ${priorityLabels[profile.priority!]}`);
    }

    // 7. Strength overlap (weight: 5)
    const overlapCount = profile.strengths.filter((s) => exam.keySubjects.includes(s)).length;
    const maxOverlap = Math.min(profile.strengths.length, exam.keySubjects.length);
    if (maxOverlap > 0) {
      const strengthScore = (overlapCount / maxOverlap) * 5;
      score += strengthScore;
      if (overlapCount >= 2) {
        const matched = profile.strengths.filter((s) => exam.keySubjects.includes(s));
        reasons.push(`Strong in key subjects: ${matched.map(s => STRENGTH_OPTIONS.find(o => o.value === s)?.label).join(', ')}`);
      }
    }

    results.push({
      exam,
      totalScore: Math.round(score),
      qualMatch,
      ageMatch,
      reasons: reasons.slice(0, 3),
    });
  }

  // Sort by score descending, then by exam name
  results.sort((a, b) => b.totalScore - a.totalScore || a.exam.name.localeCompare(b.exam.name));
  return results;
}

/* ---------- Animations ---------- */

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

/* ---------- Main component ---------- */

export function ExamRecommender() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<ScoredExam[]>([]);
  const resultsRef = useRef<HTMLDivElement>(null);

  const [profile, setProfile] = useState<UserProfile>({
    qualification: null,
    age: null,
    workStyle: null,
    studyHours: null,
    location: null,
    priority: null,
    strengths: [],
  });

  const totalSteps = STEPS.length;
  const progressPercent = showResults ? 100 : Math.round((step / totalSteps) * 100);

  const canGoNext = useCallback(() => {
    switch (step) {
      case 0: return profile.qualification !== null;
      case 1: return profile.age !== null && profile.age >= 16 && profile.age <= 45;
      case 2: return profile.workStyle !== null;
      case 3: return profile.studyHours !== null;
      case 4: return profile.location !== null;
      case 5: return profile.priority !== null;
      case 6: return profile.strengths.length >= 1;
      default: return false;
    }
  }, [step, profile]);

  const goNext = () => {
    if (!canGoNext()) return;
    if (step < totalSteps - 1) {
      setDirection(1);
      setStep(step + 1);
    } else {
      // compute results
      const scored = computeScores(profile);
      setResults(scored);
      setShowResults(true);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  };

  const goBack = () => {
    if (showResults) {
      setShowResults(false);
      return;
    }
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const restart = () => {
    setProfile({ qualification: null, age: null, workStyle: null, studyHours: null, location: null, priority: null, strengths: [] });
    setStep(0);
    setDirection(-1);
    setShowResults(false);
    setResults([]);
  };

  const toggleStrength = (s: Strength) => {
    setProfile((prev) => ({
      ...prev,
      strengths: prev.strengths.includes(s)
        ? prev.strengths.filter((x) => x !== s)
        : [...prev.strengths, s],
    }));
  };

  const handleShare = () => {
    if (!results.length) return;
    const top3 = results.slice(0, 3);
    const text = [
      `My Top Government Exam Matches (SarkariAlert AI Quiz):`,
      ...top3.map((r, i) => `${i + 1}. ${r.exam.name} — ${r.totalScore}% match`),
      '',
      `Take the quiz: https://sarkarialert.online/tools/exam-recommender`,
    ].join('\n');

    if (navigator.share) {
      navigator.share({ title: 'My Exam Profile — SarkariAlert', text }).catch(() => {});
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  /* ---------- Step renderers ---------- */

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="grid grid-cols-2 gap-3">
            {QUALIFICATION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setProfile({ ...profile, qualification: opt.value })}
                className={cn(
                  'flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all active:scale-95 text-center',
                  profile.qualification === opt.value
                    ? 'border-[#1a3a5c] bg-[#1a3a5c]/10 dark:bg-[#1a3a5c]/30 ring-2 ring-[#1a3a5c]/30'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600'
                )}
              >
                <span className="text-2xl">{opt.icon}</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{opt.label}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{opt.labelHi}</span>
              </button>
            ))}
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-full max-w-xs">
                <input
                  type="number"
                  min={16}
                  max={45}
                  value={profile.age ?? ''}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10);
                    setProfile({ ...profile, age: isNaN(v) ? null : v });
                  }}
                  placeholder="Enter your age"
                  className="w-full text-center text-4xl font-extrabold py-4 px-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-[#1a3a5c] focus:ring-2 focus:ring-[#1a3a5c]/30"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Acceptable range: 16 - 45 years
              </p>
              {profile.age !== null && (profile.age < 16 || profile.age > 45) && (
                <p className="text-xs text-red-500 font-bold">
                  Please enter age between 16 and 45
                </p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {WORK_STYLE_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.value}
                  onClick={() => setProfile({ ...profile, workStyle: opt.value })}
                  className={cn(
                    'flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all active:scale-95 text-center',
                    profile.workStyle === opt.value
                      ? 'border-[#1a3a5c] bg-[#1a3a5c]/10 dark:bg-[#1a3a5c]/30 ring-2 ring-[#1a3a5c]/30'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600'
                  )}
                >
                  <Icon className="w-6 h-6 text-[#1a3a5c] dark:text-blue-400" />
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{opt.label}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{opt.labelHi}</span>
                </button>
              );
            })}
          </div>
        );

      case 3:
        return (
          <div className="grid grid-cols-2 gap-3">
            {STUDY_HOURS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setProfile({ ...profile, studyHours: opt.value })}
                className={cn(
                  'flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all active:scale-95',
                  profile.studyHours === opt.value
                    ? 'border-[#1a3a5c] bg-[#1a3a5c]/10 dark:bg-[#1a3a5c]/30 ring-2 ring-[#1a3a5c]/30'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600'
                )}
              >
                <Clock className="w-6 h-6 text-[#1a3a5c] dark:text-blue-400" />
                <span className="text-base font-bold text-gray-900 dark:text-white">{opt.label}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{opt.labelHi}</span>
              </button>
            ))}
          </div>
        );

      case 4:
        return (
          <div className="grid grid-cols-1 gap-3">
            {LOCATION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setProfile({ ...profile, location: opt.value })}
                className={cn(
                  'flex items-center gap-4 p-5 rounded-2xl border-2 transition-all active:scale-95',
                  profile.location === opt.value
                    ? 'border-[#1a3a5c] bg-[#1a3a5c]/10 dark:bg-[#1a3a5c]/30 ring-2 ring-[#1a3a5c]/30'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600'
                )}
              >
                <MapPin className="w-6 h-6 text-[#1a3a5c] dark:text-blue-400 flex-shrink-0" />
                <div className="text-left">
                  <span className="text-base font-bold text-gray-900 dark:text-white block">{opt.label}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{opt.labelHi}</span>
                </div>
              </button>
            ))}
          </div>
        );

      case 5:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PRIORITY_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.value}
                  onClick={() => setProfile({ ...profile, priority: opt.value })}
                  className={cn(
                    'flex items-center gap-4 p-5 rounded-2xl border-2 transition-all active:scale-95',
                    profile.priority === opt.value
                      ? 'border-[#1a3a5c] bg-[#1a3a5c]/10 dark:bg-[#1a3a5c]/30 ring-2 ring-[#1a3a5c]/30'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600'
                  )}
                >
                  <Icon className="w-6 h-6 text-[#1a3a5c] dark:text-blue-400 flex-shrink-0" />
                  <div className="text-left">
                    <span className="text-sm font-bold text-gray-900 dark:text-white block">{opt.label}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{opt.labelHi}</span>
                  </div>
                </button>
              );
            })}
          </div>
        );

      case 6:
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {STRENGTH_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => toggleStrength(opt.value)}
                className={cn(
                  'flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all active:scale-95',
                  profile.strengths.includes(opt.value)
                    ? 'border-[#1a3a5c] bg-[#1a3a5c]/10 dark:bg-[#1a3a5c]/30 ring-2 ring-[#1a3a5c]/30'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600'
                )}
              >
                <Brain className="w-5 h-5 text-[#1a3a5c] dark:text-blue-400" />
                <span className="text-sm font-bold text-gray-900 dark:text-white">{opt.label}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{opt.labelHi}</span>
              </button>
            ))}
            <p className="col-span-2 sm:col-span-3 text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
              Select all subjects you are strong in ({profile.strengths.length} selected)
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  /* ---------- Results view ---------- */

  if (showResults) {
    const top5 = results.slice(0, 5);
    const eligible = results.filter((r) => r.qualMatch && r.ageMatch);
    const qualLabel = QUALIFICATION_OPTIONS.find((q) => q.value === profile.qualification)?.label ?? '';
    const wsLabel = WORK_STYLE_OPTIONS.find((w) => w.value === profile.workStyle)?.label ?? '';

    return (
      <div ref={resultsRef} className="space-y-6">
        {/* Profile summary card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-gradient-to-br from-[#1a3a5c] to-[#0d2137] p-6 text-white"
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-7 h-7 text-yellow-300" />
            <h2 className="text-xl font-extrabold">Your Exam Profile</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-xs text-white/60 mb-1">Qualification</p>
              <p className="font-bold">{qualLabel}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-xs text-white/60 mb-1">Age</p>
              <p className="font-bold">{profile.age} years</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-xs text-white/60 mb-1">Work Style</p>
              <p className="font-bold">{wsLabel}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-xs text-white/60 mb-1">Eligible Exams</p>
              <p className="font-bold text-green-300">{eligible.length} / {EXAM_DB.length}</p>
            </div>
          </div>
        </motion.div>

        {/* Top 5 recommendations */}
        <div>
          <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" /> Top 5 Recommended Exams
          </h3>
          <div className="space-y-4">
            {top5.map((item, idx) => (
              <motion.div
                key={item.exam.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  'rounded-2xl border-2 overflow-hidden',
                  idx === 0
                    ? 'border-yellow-400 dark:border-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/10'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'
                )}
              >
                {/* Header */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0',
                        idx === 0 ? 'bg-yellow-500' :
                        idx === 1 ? 'bg-gray-400' :
                        idx === 2 ? 'bg-amber-600' :
                        'bg-[#1a3a5c]'
                      )}>
                        #{idx + 1}
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-extrabold text-gray-900 dark:text-white">
                          {item.exam.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.exam.fullName} &middot; {item.exam.category}
                        </p>
                      </div>
                    </div>
                    {/* Match score */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className={cn(
                        'text-2xl font-extrabold',
                        item.totalScore >= 80 ? 'text-green-600 dark:text-green-400' :
                        item.totalScore >= 60 ? 'text-blue-600 dark:text-blue-400' :
                        item.totalScore >= 40 ? 'text-yellow-600 dark:text-yellow-400' :
                        'text-gray-500'
                      )}>
                        {item.totalScore}%
                      </div>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Match</p>
                    </div>
                  </div>

                  {/* Match bar */}
                  <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mb-4 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.totalScore}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                      className={cn(
                        'h-full rounded-full',
                        item.totalScore >= 80 ? 'bg-green-500' :
                        item.totalScore >= 60 ? 'bg-blue-500' :
                        item.totalScore >= 40 ? 'bg-yellow-500' :
                        'bg-gray-400'
                      )}
                    />
                  </div>

                  {/* Why recommended */}
                  <div className="space-y-1.5 mb-4">
                    {item.reasons.map((reason, ri) => (
                      <div key={ri} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                        <Star className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </div>
                    ))}
                    {!item.qualMatch && (
                      <div className="flex items-start gap-2 text-xs text-red-600 dark:text-red-400">
                        <span className="flex-shrink-0 mt-0.5">!</span>
                        <span>Qualification not sufficient (requires {QUALIFICATION_OPTIONS.find(q => q.value === item.exam.minQualification)?.label})</span>
                      </div>
                    )}
                    {!item.ageMatch && (
                      <div className="flex items-start gap-2 text-xs text-red-600 dark:text-red-400">
                        <span className="flex-shrink-0 mt-0.5">!</span>
                        <span>Age not eligible (requires {item.exam.minAge}-{item.exam.maxAge} years)</span>
                      </div>
                    )}
                  </div>

                  {/* Exam details grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                      <p className="text-gray-500 dark:text-gray-400 mb-0.5 flex items-center gap-1">
                        <IndianRupee className="w-3 h-3" /> Salary
                      </p>
                      <p className="font-bold text-gray-900 dark:text-white">{item.exam.salaryRange}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                      <p className="text-gray-500 dark:text-gray-400 mb-0.5 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Next Exam
                      </p>
                      <p className="font-bold text-gray-900 dark:text-white">{item.exam.nextExamDate}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                      <p className="text-gray-500 dark:text-gray-400 mb-0.5 flex items-center gap-1">
                        <Timer className="w-3 h-3" /> Prep Time
                      </p>
                      <p className="font-bold text-gray-900 dark:text-white">{item.exam.prepMonths} months</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                      <p className="text-gray-500 dark:text-gray-400 mb-0.5 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> Difficulty
                      </p>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {'*'.repeat(item.exam.difficulty)}{'*'.repeat(0)}
                        <span className="text-gray-300 dark:text-gray-600">{'*'.repeat(5 - item.exam.difficulty)}</span>
                      </p>
                    </div>
                  </div>

                  {/* Quick link */}
                  <a
                    href={item.exam.slug}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#1a3a5c] dark:text-blue-400 hover:underline"
                  >
                    View exam details on SarkariAlert <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Shareable card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 text-center"
        >
          <Share2 className="w-8 h-8 text-[#1a3a5c] dark:text-blue-400 mx-auto mb-3" />
          <h3 className="text-base font-extrabold text-gray-900 dark:text-white mb-1">Share Your Exam Profile</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            अपने दोस्तों को बताएं कि AI ने आपके लिए कौन सी परीक्षा recommend की!
          </p>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm transition-all active:scale-95"
          >
            <Share2 className="w-4 h-4" /> Share on WhatsApp
          </button>
        </motion.div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={goBack}
            className="flex-1 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-[0.98]"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Quiz
          </button>
          <button
            onClick={restart}
            className="flex-1 py-3 rounded-xl bg-[#1a3a5c] hover:bg-[#0d2137] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <RotateCcw className="w-4 h-4" /> Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  /* ---------- Quiz view ---------- */

  const StepIcon = STEPS[step].icon;

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-gray-500 dark:text-gray-400">
          <span>Step {step + 1} of {totalSteps}</span>
          <span>{progressPercent}% complete</span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#1a3a5c] to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
        {/* Step dots */}
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                i === step
                  ? 'bg-[#1a3a5c] dark:bg-blue-400 w-6'
                  : i < step
                  ? 'bg-[#1a3a5c]/40 dark:bg-blue-400/40'
                  : 'bg-gray-300 dark:bg-gray-600'
              )}
            />
          ))}
        </div>
      </div>

      {/* Step header */}
      <div className="text-center">
        <motion.div
          key={step}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1a3a5c]/10 dark:bg-[#1a3a5c]/30 mb-3"
        >
          <StepIcon className="w-7 h-7 text-[#1a3a5c] dark:text-blue-400" />
        </motion.div>
        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
          {STEPS[step].title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {STEPS[step].subtitle}
        </p>
      </div>

      {/* Step content with animation */}
      <div className="relative min-h-[280px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center gap-3 pt-2">
        {step > 0 && (
          <button
            onClick={goBack}
            className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-[0.98]"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        )}
        <button
          onClick={goNext}
          disabled={!canGoNext()}
          className={cn(
            'flex-1 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]',
            step === 0 ? 'w-full' : '',
            canGoNext()
              ? 'bg-[#1a3a5c] hover:bg-[#0d2137] text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
          )}
        >
          {step === totalSteps - 1 ? (
            <>
              <Sparkles className="w-4 h-4" /> Get My Recommendations
            </>
          ) : (
            <>
              Next <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
