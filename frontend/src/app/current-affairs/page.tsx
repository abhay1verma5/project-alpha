import type { Metadata } from 'next';
import { CurrentAffairsClient } from '@/components/current-affairs/CurrentAffairsClient';

export const metadata: Metadata = {
  title: 'Daily Current Affairs — GK Today | SarkariAlert',
  description:
    'Daily current affairs for UPSC, SSC, Banking, Railway, State PSC exams. Get today\'s GK updates with quiz, covering national, international, economy, science, sports & awards.',
  keywords: [
    'current affairs today', 'daily GK', 'current affairs 2026-27', 'UPSC current affairs',
    'SSC current affairs', 'banking awareness', 'daily quiz', 'GK today',
    'current affairs in Hindi', 'current affairs for competitive exams',
  ],
  openGraph: {
    title: 'Daily Current Affairs — GK Today | SarkariAlert',
    description: 'Daily GK updates & quiz for UPSC, SSC, Banking, Railway exams.',
    type: 'website',
  },
};

export default function CurrentAffairsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-6">
      <CurrentAffairsClient />
    </main>
  );
}
