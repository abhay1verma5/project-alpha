import type { Metadata } from 'next';
import { ExamCountdownClient } from './ExamCountdownClient';

export const metadata: Metadata = {
  title: 'Exam Countdown Timers — Track Upcoming Government Exams',
  description: 'Live countdown timers for upcoming SSC, UPSC, IBPS, RRB, CTET, NDA exams. Never miss an exam date.',
};

export default function ExamCountdownPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <ExamCountdownClient />
    </div>
  );
}
