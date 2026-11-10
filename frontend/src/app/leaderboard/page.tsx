import type { Metadata } from 'next';
import { LeaderboardClient } from './LeaderboardClient';

export const metadata: Metadata = {
  title: 'Leaderboard — Mock Test Rankings & Quiz Scores',
  description:
    'See how you rank against other aspirants. Track your mock test scores, quiz accuracy, streak days, and climb the leaderboard on SarkariAlert.',
  keywords: [
    'leaderboard', 'mock test ranking', 'quiz scores', 'exam preparation leaderboard',
    'sarkari exam ranking', 'SSC mock test scores', 'UPSC practice scores',
  ],
  alternates: { canonical: 'https://sarkarialert.online/leaderboard' },
  openGraph: {
    title: 'Leaderboard — Mock Test Rankings | SarkariAlert',
    description: 'Track your mock test scores, accuracy and streak. See how you rank against other aspirants.',
    url: 'https://sarkarialert.online/leaderboard',
  },
};

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a3a5c] via-[#1e4976] to-[#0f2b44] py-8 sm:py-12">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Leaderboard
          </h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto">
            Track your performance and see how you compare with other aspirants.
          </p>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LeaderboardClient />
      </div>
    </div>
  );
}
