import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText, ChevronRight, Calendar, Award, ExternalLink,
} from 'lucide-react';
import { PaperCards } from './PaperCards';

export const metadata: Metadata = {
  title: 'Previous Year Questions — CBSE, UP Board, Class 10 & 12, SSC, UPSC, Railway, Banking',
  description:
    'Practise previous year questions online for CBSE Class 10 & 12, UP Board 10th & 12th (Hindi/English), SSC CGL, CHSL, UPSC, RRB NTPC, IBPS PO, JEE, NEET. 10 lakh+ questions with answers and solutions.',
  keywords: ['previous year questions', 'PYQ', 'cbse class 10 pyq', 'cbse class 12 pyq', 'up board 10th previous paper', 'up board 12th previous paper', 'ssc cgl previous papers', 'upsc previous year papers', 'board exam papers', 'UP Board PYQ Hindi'],
  alternates: { canonical: 'https://sarkarialert.online/previous-papers' },
  openGraph: {
    title: 'Previous Year Questions — CBSE & UP Board Class 10, 12 + All Exams',
    description: 'Practise 10 lakh+ PYQs for CBSE, UP Board Class 10 & 12, SSC, UPSC, Railway, Banking — with answers & solutions.',
    url: 'https://sarkarialert.online/previous-papers',
  },
};

const CATEGORIES = [
  'All', 'Class 10', 'Class 12', 'SSC', 'UPSC', 'Railway', 'Banking',
  'Engineering', 'Medical', 'Police', 'Teaching', 'Defence', 'Law', 'MBA',
];

interface Props {
  searchParams: Promise<Record<string, string>>;
}

export default async function PreviousPapersPage(props: Props) {
  const params = await props.searchParams;
  const filterCat = params.category || 'All';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a3a5c] via-[#1e4976] to-[#0f2b44] py-8 sm:py-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white/30 rounded-full" />
          <div className="absolute bottom-10 right-10 w-48 h-48 border-2 border-white/20 rounded-full" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-blue-100 text-sm font-medium mb-4">
            <FileText className="w-4 h-4" />
            Last 20-30 Years
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            Previous Year Papers — 10 Lakh+ Questions
          </h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto">
            CBSE, UP Board Class 10 & 12 (Hindi/English), SSC, UPSC, Railway, Banking, JEE, NEET — practice PYQ with answers & solutions.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={cat === 'All' ? '/previous-papers' : `/previous-papers?category=${cat}`}
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${
                filterCat === cat
                  ? 'bg-[#1a3a5c] text-white border-[#1a3a5c] shadow-lg'
                  : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-300'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Exam Paper Cards with dropdowns */}
        <PaperCards filterCategory={filterCat} />

        {/* Topic Weightage CTA */}
        <div className="mt-10 bg-gradient-to-r from-[#1a3a5c] to-[#0f2b44] rounded-2xl p-6 sm:p-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Know what to study first
          </h2>
          <p className="text-blue-100 mb-6 max-w-lg mx-auto">
            See topic-wise weightage analysis from last 10+ years of papers. Focus on high-scoring topics.
          </p>
          <Link
            href="/topic-weightage"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ff6f00] text-white font-semibold hover:bg-[#e65100] transition-colors shadow-lg"
          >
            <Award className="w-4 h-4" />
            Topic Weightage Analysis
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Previous Year Question Papers - Government Exams',
            description: 'Download PYQ papers for SSC, UPSC, Railway, Banking exams — year-wise PDFs from official sources.',
            url: 'https://sarkarialert.online/previous-papers',
          }),
        }}
      />
    </div>
  );
}
