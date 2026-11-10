import type { Metadata } from 'next';
import { VacancyTrendsClient } from './VacancyTrendsClient';

export const metadata: Metadata = {
  title: 'Vacancy Trends — Government Job Vacancy Statistics',
  description: 'View vacancy trends for SSC, UPSC, Railway, Banking exams over the years. Plan your preparation accordingly.',
};

export default function VacancyTrendsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <VacancyTrendsClient />
    </div>
  );
}
