import type { Metadata } from 'next';
import { PercentageCalculator } from '@/components/tools/PercentageCalculator';

export const metadata: Metadata = {
  title: 'Percentage Calculator — Marks to Percentage Converter | SarkariAlert',
  description: 'Convert marks to percentage and percentage to marks instantly. Shows grade (A+, A, B+, B, C, D, F). Quick presets for all total marks.',
  keywords: ['percentage calculator', 'marks to percentage', 'percentage to marks', 'grade calculator', 'marks calculator', 'exam percentage'],
  alternates: { canonical: 'https://sarkarialert.online/tools/percentage-calculator' },
};

export default function PercentageCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          Percentage Calculator
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          मार्क्स से प्रतिशत कैलकुलेटर — Convert marks to percentage or find marks needed for a target percentage.
        </p>
      </div>
      <PercentageCalculator />
    </div>
  );
}
