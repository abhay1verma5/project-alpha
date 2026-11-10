import type { Metadata } from 'next';
import { MockTestsClient } from './MockTestsClient';

export const metadata: Metadata = {
  title: 'Free Mock Tests — SSC, UPSC, Railway, Banking, GATE, NEET (Online Practice)',
  description:
    'Free online mock tests for SSC CGL, CHSL, MTS, UPSC, RRB NTPC, IBPS PO, SBI PO, GATE, NEET, JEE. Practice with previous year questions, timed tests, instant scores and detailed solutions.',
  alternates: { canonical: 'https://sarkarialert.online/mock-tests' },
  openGraph: {
    title: 'Free Mock Tests — Government Exam Online Practice',
    description: 'Practice free mock tests for SSC, UPSC, Railway, Banking, GATE, NEET exams with instant results.',
    url: 'https://sarkarialert.online/mock-tests',
  },
};

export default function MockTestsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a3a5c] via-[#1e4976] to-[#0f2b44] py-8 sm:py-12">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Free Mock Tests
          </h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto">
            Practice with real previous year questions. Timed mock tests with instant scoring and detailed solutions.
          </p>
        </div>
      </section>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MockTestsClient />
      </div>
    </div>
  );
}
