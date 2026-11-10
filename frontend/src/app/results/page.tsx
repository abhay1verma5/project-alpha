import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getResults } from '@/lib/api';
import { JobList } from '@/components/JobList';
import { Pagination } from '@/components/Pagination';
import { JobFilters } from '@/components/JobFilters';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { FileCheck } from 'lucide-react';
import { RelatedLinks, RESULTS_RELATED_LINKS } from '@/components/RelatedLinks';

export const metadata: Metadata = {
  title: 'Sarkari Result 2026-27 — Latest Government Exam Results',
  description: 'Check latest sarkari result 2026-27 — SSC, UPSC, Railway, Banking, State PSC, Police, Defence exam results. Direct links to official result pages.',
  keywords: ['sarkari result', 'exam result 2026', 'exam result 2027', 'SSC result', 'UPSC result', 'Railway result', 'government exam result'],
  alternates: {
    canonical: 'https://sarkarialert.online/results',
  },
};

interface Props {
  searchParams: Promise<Record<string, string>>;
}

async function ResultsContent({ searchParams }: Props) {
  const params = await searchParams;
  const apiParams: Record<string, string> = { page: params.page || '1' };
  if (params.category) apiParams.category = params.category;
  if (params.state) apiParams.state = params.state;
  if (params.qualification) apiParams.qualification = params.qualification;
  if (params.ordering) apiParams.ordering = params.ordering;

  let data;
  try {
    data = await getResults(apiParams);
  } catch {
    return (
      <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
        <FileCheck className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
        <p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">Unable to load results</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Backend server is not available. Please try again later.</p>
      </div>
    );
  }

  const page = parseInt(params.page || '1', 10);
  const totalPages = Math.ceil(data.count / 20);

  const filterParams: Record<string, string> = {};
  if (params.category) filterParams.category = params.category;
  if (params.state) filterParams.state = params.state;
  if (params.qualification) filterParams.qualification = params.qualification;
  if (params.ordering) filterParams.ordering = params.ordering;

  return (
    <>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{data.count} results declared</p>
      <JobList jobs={data.results} emptyMessage="No results available yet." />
      <Pagination currentPage={page} totalPages={totalPages} basePath="/results" queryParams={filterParams} />
    </>
  );
}

const faqData = [
  {
    question: 'How to check sarkari result online?',
    answer: 'Visit SarkariAlert.online/results or the official exam conducting body website. Search for your exam name, click the result link, and enter your roll number or registration number to view your result.',
  },
  {
    question: 'Sarkari result kab aata hai?',
    answer: 'Result ka time har exam ke liye alag hota hai. Usually exam ke 30-90 din baad result aata hai. SSC results 2-3 months mein, UPSC Prelims 15-20 din mein, aur Railway exams ke results 1-2 months mein aate hain.',
  },
  {
    question: 'What documents are needed after result declaration?',
    answer: 'After qualifying, you typically need: original marksheets, caste/category certificate, domicile certificate, identity proof (Aadhaar/PAN), passport-size photos, and experience certificates if applicable.',
  },
  {
    question: 'How to download scorecard/marksheet?',
    answer: 'Go to the official website of the exam body, navigate to the results section, enter your registration number and date of birth, and click download. Save the PDF scorecard for future reference.',
  },
  {
    question: 'What is the cut-off for government exams?',
    answer: 'Cut-off varies by exam, category, and year. General category cut-offs are usually higher than reserved categories. SarkariAlert publishes expected and official cut-offs for all major exams like SSC CGL, UPSC, Railway, and Banking.',
  },
  {
    question: 'Result ke baad kya karna chahiye?',
    answer: 'Result aane ke baad: 1) Scorecard download karein aur save karein. 2) Cut-off se apna score compare karein. 3) Agar qualify kiya to next stage (Mains/Interview/DV) ki taiyaari shuru karein. 4) Documents ready rakhein. 5) Official website par next dates check karein.',
  },
  {
    question: 'What is the difference between merit list and result?',
    answer: 'Result shows whether you passed or failed (qualified/not qualified). Merit list is the final selection list ranking candidates who cleared all stages. You can qualify in the result but still not make it to the merit list if your rank is lower than available vacancies.',
  },
  {
    question: 'Can I get re-evaluation of my answer sheet?',
    answer: 'Most computer-based exams (SSC, Railway, Banking) do not allow re-evaluation. For descriptive/written exams (UPSC Mains, State PSC), you can apply for re-checking/re-counting of marks within the given timeframe. The fee is usually Rs 500-1000 per paper.',
  },
];

function FAQSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqData.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }),
      }}
    />
  );
}

export default async function ResultsPage(props: Props) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
          <FileCheck className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Exam Results</h1>
      </div>

      <Suspense fallback={null}>
        <JobFilters basePath="/results" hideContentType />
      </Suspense>

      <Suspense fallback={<JobListSkeleton />}>
        <ResultsContent searchParams={props.searchParams} />
      </Suspense>

      {/* FAQ Section */}
      <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqData.map((faq, i) => (
            <details key={i} className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50">
                {faq.question}
                <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      <RelatedLinks title="Related Pages" links={RESULTS_RELATED_LINKS} />

      {/* FAQ JSON-LD */}
      <FAQSchema />
    </div>
  );
}
