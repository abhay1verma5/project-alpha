import type { Metadata } from 'next';
import { CareerClient } from '@/components/ai-career/CareerClient';

export const metadata: Metadata = {
  title: 'AI Career Advisor — Government Career Guidance | SarkariAlert',
  description: 'Get personalized government career guidance from AI. Ask about SSC, UPSC, Railway, Banking exams and career paths in Hindi or English.',
  keywords: 'career advisor, government career guidance, sarkari naukri advice, which govt exam, career counselor, hindi career advice',
};

export default function AiCareerPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 mb-16 md:mb-0">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 text-xs font-bold text-purple-700 dark:text-purple-300 mb-3">
          <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
          AI-Powered
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          AI Career Advisor
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          Get personalized government career guidance
        </p>
      </div>
      <CareerClient />
    </div>
  );
}
