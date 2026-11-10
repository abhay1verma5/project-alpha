import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobFilters } from '@/components/JobFilters';
import { SearchBar } from '@/components/SearchBar';
import { Briefcase } from 'lucide-react';
import { CATEGORY_LABELS, STATE_LABELS } from '@/lib/utils';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { RelatedLinks, JOBS_RELATED_LINKS } from '@/components/RelatedLinks';

export const metadata: Metadata = {
  title: 'Sarkari Naukri 2026-27 — Latest Government Jobs & Vacancies',
  description: 'Browse 800+ latest sarkari naukri 2026-27 notifications — SSC, UPSC, Railway, Banking, Defence, Police, State PSC. Apply online with eligibility, salary & last date details.',
  alternates: {
    canonical: 'https://sarkarialert.online/jobs',
  },
};

interface Props {
  searchParams: Promise<Record<string, string>>;
}

async function JobsContent({ searchParams }: Props) {
  const params = await searchParams;
  const apiParams: Record<string, string> = { page: '1' };
  if (params.category) apiParams.category = params.category;
  if (params.state) apiParams.state = params.state;
  if (params.qualification) apiParams.qualification = params.qualification;
  if (params.content_type) apiParams.content_type = params.content_type;
  if (params.ordering) apiParams.ordering = params.ordering;

  let data;
  try {
    data = await getJobs(apiParams);
  } catch {
    return (
      <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
        <Briefcase className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
        <p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">Unable to load jobs</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Backend server is not available. Please try again later.</p>
      </div>
    );
  }

  // Build filter params (excluding page) for the Load More component
  const filterParams: Record<string, string> = {};
  if (params.category) filterParams.category = params.category;
  if (params.state) filterParams.state = params.state;
  if (params.qualification) filterParams.qualification = params.qualification;
  if (params.content_type) filterParams.content_type = params.content_type;
  if (params.ordering) filterParams.ordering = params.ordering;

  return (
    <JobsLoadMore
      initialJobs={data.results}
      totalCount={data.count}
      nextUrl={data.next}
      filterParams={filterParams}
    />
  );
}

const faqData = [
  {
    question: 'How to apply for sarkari naukri online?',
    answer: 'Visit the official recruitment website or SarkariAlert.online, find the job notification, check eligibility, and click the "Apply Online" link. Fill the application form, upload documents, pay the fee, and submit before the last date.',
  },
  {
    question: 'Sarkari naukri ke liye kya yogyata chahiye?',
    answer: 'Yogyata har post ke hisaab se alag hoti hai. 10th pass se lekar Post Graduate tak ke liye government jobs available hain. Har notification mein educational qualification, age limit aur experience clearly mention hota hai.',
  },
  {
    question: 'Which government jobs have the highest salary?',
    answer: 'IAS/IPS officers (UPSC), RBI Grade B officers, SEBI officers, and PSU executives have the highest salaries in government sector. Starting salary ranges from Rs 56,100 to Rs 2,25,000+ per month depending on the post.',
  },
  {
    question: 'How to check last date for government jobs?',
    answer: 'On SarkariAlert, every job listing shows the last date prominently. You can also filter jobs by deadline, check the official notification PDF, or set alerts so you never miss an important deadline.',
  },
  {
    question: 'Government job ke liye age limit kya hai?',
    answer: 'General category ke liye usually 18-27 saal hoti hai. OBC ko 3 saal, SC/ST ko 5 saal ki chhoot milti hai. Kuch posts jaise teaching aur medical mein age limit 35-40 saal tak ho sakti hai.',
  },
  {
    question: 'Kya bina exam ke sarkari naukri mil sakti hai?',
    answer: 'Haan, kuch government jobs bina exam ke milti hain — jaise Anganwadi Worker, GDS (Gramin Dak Sevak), Safai Karmchari, Home Guard, aur kuch contractual posts. Ye merit-based ya interview-based hoti hain. SarkariAlert par "Without Exam" filter use karein.',
  },
  {
    question: 'What is the application fee for government jobs?',
    answer: 'Application fees vary by exam: SSC exams charge Rs 100 (free for SC/ST/Female/PwD). UPSC charges Rs 100 (free for Female/SC/ST). Banking exams charge Rs 450-850 for General/OBC. Railway exams charge Rs 250-500. Most exams offer free applications for SC/ST/PwD/Ex-Servicemen.',
  },
  {
    question: 'How many government jobs are available in 2026-27?',
    answer: 'Lakhs of government vacancies are announced every year across central and state governments. Major recruiters include SSC (50,000+ posts), Railways (1,00,000+ posts), Banking (50,000+ posts), Defence (70,000+ posts), State PSCs, and Police departments. SarkariAlert tracks 800+ active notifications.',
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

export default async function JobsPage(props: Props) {
  const params = await props.searchParams;

  const title = params.category
    ? `${CATEGORY_LABELS[params.category] || params.category} Jobs`
    : params.state
      ? `Jobs in ${STATE_LABELS[params.state] || params.state}`
      : 'All Government Jobs';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
        </div>
        <div className="sm:ml-auto w-full sm:w-auto">
          <SearchBar variant="inline" />
        </div>
      </div>

      {/* Filters */}
      <Suspense fallback={null}>
        <JobFilters />
      </Suspense>

      {/* Job list */}
      <Suspense fallback={<JobListSkeleton />}>
        <JobsContent searchParams={props.searchParams} />
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

      {/* Internal links for SEO */}
      <RelatedLinks title="Explore More" links={JOBS_RELATED_LINKS} />

      {/* CollectionPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: title,
            description: 'Browse latest government job notifications in India — SSC, UPSC, Railway, Banking, Defence, Police.',
            url: 'https://sarkarialert.online/jobs',
            isPartOf: { '@type': 'WebSite', name: 'SarkariAlert', url: 'https://sarkarialert.online' },
          }),
        }}
      />

      {/* FAQ JSON-LD */}
      <FAQSchema />
    </div>
  );
}