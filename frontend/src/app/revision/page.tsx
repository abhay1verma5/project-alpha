import type { Metadata } from 'next';
import { RevisionClient } from './RevisionClient';

export const metadata: Metadata = {
  title: 'Spaced Revision — Smart PYQ Review System | SarkariAlert',
  description:
    'Review PYQ questions you got wrong using spaced repetition (SM-2 algorithm). Scientifically proven intervals — 1, 3, 7, 14, 30 days — help you retain answers for JEE, NEET, SSC, UPSC, Railway, Banking and 60+ exams.',
  keywords: [
    'spaced repetition', 'PYQ revision', 'smart review', 'SM-2 algorithm',
    'exam revision', 'question review', 'memorization technique',
    'JEE revision', 'NEET revision', 'SSC revision', 'UPSC revision',
    'previous year question revision', 'study technique',
  ],
  openGraph: {
    title: 'Spaced Revision — Smart PYQ Review | SarkariAlert',
    description: 'Scientifically review wrong PYQ answers at optimal intervals. Never forget what you learned.',
    type: 'website',
  },
};

export default function RevisionPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-6">
      <RevisionClient />
    </main>
  );
}
