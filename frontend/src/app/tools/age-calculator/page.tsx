import type { Metadata } from 'next';
import { AgeCalculator } from '@/components/tools/AgeCalculator';

export const metadata: Metadata = {
  title: 'Age Calculator for Government Jobs — SarkariAlert',
  description: 'Calculate exact age for government job eligibility. Includes SC/ST/OBC/EWS/PwD age relaxation. For SSC, UPSC, Railway, Bank exams.',
  keywords: ['age calculator', 'government job age limit', 'ssc age calculator', 'upsc age limit', 'obc age relaxation', 'sc st age relaxation', 'sarkari naukri age'],
  alternates: { canonical: 'https://sarkarialert.online/tools/age-calculator' },
};

export default function AgeCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          🎂 Age Calculator for Govt Jobs
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Check your exact age and eligibility with category-wise relaxation (SC/ST/OBC/PwD/Ex-Serviceman).
        </p>
      </div>
      <AgeCalculator />
    </div>
  );
}
