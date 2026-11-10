import type { Metadata } from 'next';
import { HandwritingClient } from './HandwritingClient';

export const metadata: Metadata = {
  title: 'Handwriting Practice — Improve Your Writing Speed',
  description: 'Practice handwriting for government exam answer sheets. Lined paper with timer for speed improvement.',
};

export default function HandwritingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <HandwritingClient />
    </div>
  );
}
