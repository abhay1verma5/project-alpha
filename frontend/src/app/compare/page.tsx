import type { Metadata } from 'next';
import { CompareClient } from './CompareClient';

export const metadata: Metadata = {
  title: 'Compare Jobs Side-by-Side',
  description: 'Compare government jobs side-by-side on SarkariAlert. See vacancies, salary, eligibility, deadlines and more.',
};

export default function ComparePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <CompareClient />
    </div>
  );
}
