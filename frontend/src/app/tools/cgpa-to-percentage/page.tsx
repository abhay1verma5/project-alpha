import type { Metadata } from 'next';
import { CgpaConverter } from '@/components/tools/CgpaConverter';

export const metadata: Metadata = {
  title: 'CGPA to Percentage Converter — CBSE, VTU, All Universities | SarkariAlert',
  description: 'Convert CGPA to percentage and percentage to CGPA. Supports CBSE, VTU, Mumbai University, Anna University, KTU and custom multiplier formulas.',
  keywords: ['cgpa to percentage', 'percentage to cgpa', 'cbse cgpa converter', 'vtu cgpa calculator', 'mumbai university cgpa', 'cgpa calculator'],
  alternates: { canonical: 'https://sarkarialert.online/tools/cgpa-to-percentage' },
};

export default function CgpaToPercentagePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          CGPA to Percentage Converter
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          CGPA से प्रतिशत कनवर्टर — Convert between CGPA and percentage for CBSE, VTU, Mumbai University, and more.
        </p>
      </div>
      <CgpaConverter />
    </div>
  );
}
