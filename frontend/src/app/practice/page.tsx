import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { PracticeTabs } from './PracticeTabs';
import { EXAM_CATEGORIES } from '@/lib/pyq-types';

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

      {/* Practice by exam — every exam has its own page, e.g. /practice/gate_ece */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-foreground mb-3">Practice by exam / परीक्षा चुनें</h2>
        <div className="space-y-3">
          {EXAM_CATEGORIES.map((cat) => (
            <details key={cat.id} className="rounded-xl border border-border bg-surface px-4 py-3" id={cat.id}>
              <summary className="cursor-pointer font-bold text-foreground min-h-10 flex items-center gap-2">
                <span>{cat.icon}</span> {cat.label}
                <span className="text-xs font-semibold text-muted">({cat.exams.length})</span>
              </summary>
              <div className="mt-3 flex flex-wrap gap-2">
                {cat.exams.map((e) => (
                  <Link
                    key={e.value}
                    href={`/practice/${e.value}`}
                    className="inline-flex items-center min-h-10 px-3 rounded-lg border border-border text-sm font-semibold text-foreground hover:border-gov-saffron"
                  >
                    {e.label}
                  </Link>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
