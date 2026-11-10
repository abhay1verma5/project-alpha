import type { Metadata } from 'next';
import { BmiCalculator } from '@/components/tools/BmiCalculator';

export const metadata: Metadata = {
  title: 'BMI Calculator for Government Jobs — Army, Police, Defence | SarkariAlert',
  description: 'Calculate your BMI and check weight eligibility for Army, Police, Navy, Air Force, CRPF, SSC GD, and other government jobs. Shows ideal weight range.',
  keywords: ['bmi calculator', 'bmi calculator for government jobs', 'army bmi requirement', 'police weight requirement', 'defence bmi', 'ssc gd weight', 'crpf bmi'],
  alternates: { canonical: 'https://sarkarialert.online/tools/bmi-calculator' },
};

export default function BmiCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          BMI Calculator for Government Jobs
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          BMI कैलकुलेटर — सरकारी नौकरी के लिए वजन चेक करें — Calculate your Body Mass Index and check eligibility for Army, Police, Navy, Air Force, and more.
        </p>
      </div>
      <BmiCalculator />
    </div>
  );
}
