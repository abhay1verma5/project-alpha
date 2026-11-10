import type { Metadata } from 'next';
import { DailyQuizClient } from '@/components/daily-quiz/DailyQuizClient';

export const metadata: Metadata = {
  title: 'Daily GK Quiz — Free Practice for Competitive Exams | SarkariAlert',
  description:
    'Free daily GK quiz for UPSC, SSC, Banking, Railway exams. 10 questions daily with answers & explanations. Track your streak and improve your general knowledge.',
  keywords: [
    'daily quiz', 'GK quiz', 'daily current affairs quiz', 'competitive exam quiz',
    'UPSC quiz', 'SSC quiz', 'banking quiz', 'free online quiz',
    'general knowledge test', 'daily practice',
  ],
  openGraph: {
    title: 'Daily GK Quiz — Free Practice | SarkariAlert',
    description: 'Free daily quiz with 10 GK questions. Track your streak!',
    type: 'website',
  },
};

export default function DailyQuizPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-6">
      <DailyQuizClient />
    </main>
  );
}
