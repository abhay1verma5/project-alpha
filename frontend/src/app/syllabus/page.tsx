import type { Metadata } from 'next';
import { getSyllabus } from '@/lib/api';
import { JobList } from '@/components/JobList';
import { Pagination } from '@/components/Pagination';
import { BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Syllabus & Exam Pattern',
  description: 'Latest exam syllabus and pattern — SSC, UPSC, Railway, Banking, Police and more.',
};

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function SyllabusPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);

  let data;
  try {
    data = await getSyllabus({ page: String(page) });
  } catch {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Syllabus & Exam Pattern</h1>
        </div>
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
          <p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">Unable to load syllabus</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Backend server is not available. Please try again later.</p>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(data.count / 20);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Syllabus & Exam Pattern</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{data.count} syllabi available</p>
        </div>
      </div>
      <JobList jobs={data.results} emptyMessage="No syllabus available yet." />
      <Pagination currentPage={page} totalPages={totalPages} basePath="/syllabus" />
    </div>
  );
}