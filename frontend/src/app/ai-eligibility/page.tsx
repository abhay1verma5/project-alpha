import type { Metadata } from 'next';
import { EligibilityClient } from '@/components/ai-eligibility/EligibilityClient';

export const metadata: Metadata = {
  title: 'AI Eligibility Checker — Check Your Government Exam Eligibility | SarkariAlert',
  description: 'Check your eligibility for 30+ government exams including SSC, UPSC, Railway, Banking, Defence, Police, and Teaching. AI-powered analysis based on age, qualification, and category.',
  keywords: 'eligibility checker, sarkari exam eligibility, ssc age limit, upsc eligibility, railway exam qualification, government job eligibility',
};

export default function AiEligibilityPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 mb-16 md:mb-0">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 text-xs font-bold text-purple-700 dark:text-purple-300 mb-3">
          <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
          AI-Powered
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          AI Eligibility Checker
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          Check which government exams you are eligible for
        </p>
      </div>
      <EligibilityClient />
    </div>
  );
}
