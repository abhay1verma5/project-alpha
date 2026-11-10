'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface LinkItem {
  href: string;
  label: string;
}

interface RelatedLinksProps {
  title: string;
  links: LinkItem[];
}

/**
 * Internal linking component for SEO.
 * Displays a grid of related links to boost page authority and crawlability.
 */
export function RelatedLinks({ title, links }: RelatedLinksProps) {
  return (
    <section className="mt-10 border-t border-border pt-8">
      <h2 className="text-lg font-bold text-foreground mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg bg-surface hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm text-muted hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-border"
          >
            <span className="truncate">{link.label}</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-50" />
          </Link>
        ))}
      </div>
    </section>
  );
}

// Pre-built link sets for common pages
export const JOBS_RELATED_LINKS: LinkItem[] = [
  { href: '/results', label: 'Latest Results' },
  { href: '/admit-cards', label: 'Admit Cards' },
  { href: '/answer-keys', label: 'Answer Keys' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/syllabus', label: 'Syllabus' },
  { href: '/10th-pass-jobs', label: '10th Pass Jobs' },
  { href: '/12th-pass-jobs', label: '12th Pass Jobs' },
  { href: '/graduate-jobs', label: 'Graduate Jobs' },
  { href: '/engineering-jobs', label: 'Engineering Jobs' },
  { href: '/nursing-jobs', label: 'Nursing Jobs' },
  { href: '/teacher-jobs', label: 'Teacher Jobs' },
  { href: '/police-jobs', label: 'Police Jobs' },
  { href: '/iti-jobs', label: 'ITI Jobs' },
  { href: '/diploma-jobs', label: 'Diploma Jobs' },
  { href: '/railway-jobs', label: 'Railway Jobs' },
  { href: '/banking-jobs', label: 'Banking Jobs' },
  { href: '/defence-jobs', label: 'Defence Jobs' },
  { href: '/central-government-jobs', label: 'Central Govt Jobs' },
  { href: '/science-jobs', label: 'B.Sc Jobs' },
  { href: '/commerce-jobs', label: 'Commerce Jobs' },
  { href: '/arts-jobs', label: 'BA Jobs' },
  { href: '/post-graduate-jobs', label: 'PG Jobs' },
  { href: '/medical-jobs', label: 'Medical Jobs' },
  { href: '/pharmacy-jobs', label: 'Pharmacy Jobs' },
  { href: '/law-jobs', label: 'Law Jobs' },
  { href: '/mba-jobs', label: 'MBA Jobs' },
  { href: '/computer-jobs', label: 'IT/Computer Jobs' },
  { href: '/agriculture-jobs', label: 'Agriculture Jobs' },
  { href: '/government-jobs-for-women', label: 'Jobs for Women' },
  { href: '/government-jobs-without-exam', label: 'Jobs Without Exam' },
  { href: '/8th-pass-jobs', label: '8th Pass Jobs' },
  { href: '/anganwadi-jobs', label: 'Anganwadi Jobs' },
  { href: '/gds-jobs', label: 'GDS/Postal Jobs' },
  { href: '/panchayat-jobs', label: 'Panchayat Jobs' },
  { href: '/patwari-jobs', label: 'Patwari/Lekhpal' },
  { href: '/home-guard-jobs', label: 'Home Guard' },
  { href: '/apprentice-jobs', label: 'Apprentice Jobs' },
  { href: '/divyang-jobs', label: 'Divyang/PwBD Jobs' },
  { href: '/ex-servicemen-jobs', label: 'Ex-Servicemen Jobs' },
  { href: '/army-jobs', label: 'Army Jobs' },
  { href: '/navy-jobs', label: 'Navy Jobs' },
  { href: '/air-force-jobs', label: 'Air Force Jobs' },
  { href: '/court-jobs', label: 'Court Jobs' },
  { href: '/psu-jobs', label: 'PSU Jobs' },
  { href: '/postal-jobs', label: 'Post Office Jobs' },
  { href: '/clerk-jobs', label: 'Clerk Jobs' },
  { href: '/group-d-jobs', label: 'Group D Jobs' },
  { href: '/sarkari-result', label: 'Sarkari Result' },
  { href: '/forest-guard-jobs', label: 'Forest Guard Jobs' },
  { href: '/walk-in-jobs', label: 'Walk-In Jobs' },
  { href: '/sarkari-yojana', label: 'Sarkari Yojana' },
  { href: '/up-government-jobs', label: 'UP Govt Jobs' },
  { href: '/bihar-government-jobs', label: 'Bihar Govt Jobs' },
  { href: '/rajasthan-government-jobs', label: 'Rajasthan Govt Jobs' },
  { href: '/mp-government-jobs', label: 'MP Govt Jobs' },
  { href: '/maharashtra-government-jobs', label: 'Maharashtra Jobs' },
  { href: '/haryana-government-jobs', label: 'Haryana Govt Jobs' },
  { href: '/pyq', label: 'Previous Year Questions' },
  { href: '/current-affairs', label: 'Current Affairs' },
  { href: '/exam-calendar', label: 'Exam Calendar' },
  { href: '/tools/percentage-calculator', label: 'Percentage Calculator' },
  { href: '/tools/answer-key-calculator', label: 'Answer Key Calculator' },
  { href: '/blog', label: 'Preparation Tips' },
];

export const RESULTS_RELATED_LINKS: LinkItem[] = [
  { href: '/jobs', label: 'Latest Jobs' },
  { href: '/admit-cards', label: 'Admit Cards' },
  { href: '/answer-keys', label: 'Answer Keys' },
  { href: '/category/ssc', label: 'SSC Results' },
  { href: '/category/railway', label: 'Railway Results' },
  { href: '/category/banking', label: 'Banking Results' },
  { href: '/category/upsc', label: 'UPSC Results' },
  { href: '/category/police', label: 'Police Results' },
];

export const PYQ_RELATED_LINKS: LinkItem[] = [
  { href: '/pyq/ssc_cgl', label: 'SSC CGL PYQ' },
  { href: '/pyq/ssc_chsl', label: 'SSC CHSL PYQ' },
  { href: '/pyq/ssc_gd', label: 'SSC GD PYQ' },
  { href: '/pyq/rrb_ntpc', label: 'RRB NTPC PYQ' },
  { href: '/pyq/rrb_group_d', label: 'RRB Group D PYQ' },
  { href: '/pyq/upsc_prelims', label: 'UPSC Prelims PYQ' },
  { href: '/pyq/ibps_po', label: 'IBPS PO PYQ' },
  { href: '/pyq/sbi_po', label: 'SBI PO PYQ' },
  { href: '/pyq/ctet', label: 'CTET PYQ' },
  { href: '/pyq/neet', label: 'NEET PYQ' },
  { href: '/pyq/jee_main', label: 'JEE Main PYQ' },
  { href: '/pyq/gate_cse', label: 'GATE CSE PYQ' },
  { href: '/mock-tests', label: 'Mock Tests' },
  { href: '/topic-weightage', label: 'Topic Weightage' },
  { href: '/exam-pattern', label: 'Exam Patterns' },
  { href: '/blog', label: 'Preparation Tips' },
];

export const BLOG_RELATED_LINKS: LinkItem[] = [
  { href: '/pyq', label: 'Practice PYQ' },
  { href: '/current-affairs', label: 'Daily Current Affairs' },
  { href: '/daily-quiz', label: 'Daily Quiz' },
  { href: '/mock-tests', label: 'Mock Tests' },
  { href: '/exam-pattern', label: 'Exam Patterns' },
  { href: '/topic-weightage', label: 'Topic Weightage' },
  { href: '/tools', label: 'Exam Tools' },
  { href: '/jobs', label: 'Latest Jobs' },
  { href: '/scholarships', label: 'Scholarships' },
  { href: '/study-planner', label: 'Study Planner' },
  { href: '/ai-quiz', label: 'AI Quiz Generator' },
  { href: '/ai-career', label: 'AI Career Guide' },
];
