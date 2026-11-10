import type { Metadata } from 'next';
import { PhysicalTestCalculator } from '@/components/tools/PhysicalTestCalculator';

export const metadata: Metadata = {
  title: 'Physical Test Calculator — Police, Army, SSC GD Body Standards | SarkariAlert',
  description: 'Check your height, weight, and chest eligibility for UP Police, SSC GD, Army GD, CRPF, BSF, Railway RPF, Delhi Police, and State Police physical tests.',
  keywords: ['physical test calculator', 'police physical test', 'army height weight', 'ssc gd physical', 'crpf physical standard', 'bsf height requirement', 'chest measurement police'],
  alternates: { canonical: 'https://sarkarialert.online/tools/physical-test-calculator' },
};

export default function PhysicalTestCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          Physical Test Calculator
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          फिजिकल टेस्ट कैलकुलेटर — हाइट, वेट, चेस्ट चेक करें — Check your body measurements against requirements for Police, Army, SSC GD, and more.
        </p>
      </div>
      <PhysicalTestCalculator />
    </div>
  );
}
