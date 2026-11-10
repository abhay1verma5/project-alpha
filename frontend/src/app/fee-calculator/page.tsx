import type { Metadata } from 'next';
import { FeeCalculatorClient } from './FeeCalculatorClient';

export const metadata: Metadata = {
  title: 'Exam Fee Calculator — Government Exam Application Fees',
  description: 'Calculate application fees for SSC, UPSC, IBPS, RRB, CTET, NDA exams based on your category.',
};

export default function FeeCalculatorPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <FeeCalculatorClient />
    </div>
  );
}
