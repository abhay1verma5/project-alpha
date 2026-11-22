import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { PracticeTabs } from './PracticeTabs';

export const metadata: Metadata = {
  title: 'Practice & Mock Tests — Free Online Tests for SSC, Railway, Banking, UPSC',
  description:
    'Free mock tests, a daily GK quiz and an AI quiz generator for 170+ government and entrance exams. Practice questions follow each exam’s pattern; for real past papers see PYQ.',
  alternates: { canonical: '/practice' },
  openGraph: {
    title: 'Practice & Mock Tests | SarkariAlert',
    description: 'Free mock tests, daily quiz and AI quiz for 170+ exams.',
    type: 'website',
  },
};

export default function PracticePage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-1">Practice &amp; Mock Tests</h1>
      <p className="text-sm text-muted mb-4">
        Practice questions are written by AI in each exam’s pattern and syllabus. For questions from actual past
        papers, use <Link href="/pyq" className="font-semibold text-gov-saffron underline">PYQ (real papers)</Link>.
      </p>
      <Suspense fallback={null}>
        <PracticeTabs />
      </Suspense>
    </main>
  );
}
