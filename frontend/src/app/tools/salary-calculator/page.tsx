import type { Metadata } from 'next';
import { SalaryCalculator } from '@/components/tools/SalaryCalculator';

export const metadata: Metadata = {
  title: '7th & 8th Pay Commission Salary Calculator — SarkariAlert',
  description: 'Calculate government employee salary under 7th Pay Commission. See DA, HRA, Gross Pay, NPS deduction and in-hand salary for all pay levels.',
};

export default function SalaryCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          💰 Salary Calculator (7th Pay Commission)
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Calculate your government salary — Basic Pay, DA (56%), HRA, Gross, NPS deduction, and in-hand pay.
        </p>
      </div>
      <SalaryCalculator />
    </div>
  );
}
