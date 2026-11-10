import type { Metadata } from 'next';
import { EligibilityChecker } from '@/components/tools/EligibilityChecker';

export const metadata: Metadata = {
  title: 'Exam Eligibility Checker — कौन सी परीक्षा दे सकते हैं? | SarkariAlert',
  description: 'Check your eligibility for 29+ government exams like SSC CGL, UPSC, Railway, Bank PO, Police, Army. Enter DOB, qualification and category to see all eligible exams.',
  keywords: ['exam eligibility checker', 'government exam eligibility', 'ssc eligibility', 'upsc age limit', 'railway exam eligibility', 'bank exam eligibility', 'sarkari naukri eligibility', 'कौन सी परीक्षा दे सकते हैं'],
  alternates: { canonical: 'https://sarkarialert.online/tools/eligibility-checker' },
};

export default function EligibilityCheckerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          Exam Eligibility Checker — कौन सी परीक्षा दे सकते हैं?
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          अपनी जन्मतिथि, शिक्षा और कैटेगरी दर्ज करें — जानें कि आप SSC, UPSC, Railway, Bank, Police, Army की कौन-कौन सी परीक्षा दे सकते हैं।
        </p>
      </div>
      <EligibilityChecker />
    </div>
  );
}
