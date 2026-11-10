import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Sprout } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Agriculture Government Jobs 2026-27 — B.Sc Agriculture, ICAR Sarkari Naukri | SarkariAlert',
  description:
    'Agriculture government jobs 2026-27: Browse latest sarkari naukri for B.Sc Agriculture, M.Sc Agriculture candidates. ICAR, FCI, Agriculture Officer, Krishi Vibhag, NABARD & state agriculture department vacancies. Apply online with eligibility, salary & last date.',
  keywords: [
    'agriculture government jobs 2026',
    'agriculture sarkari naukri 2026',
    'icar recruitment 2026',
    'fci vacancy 2026',
    'agriculture officer bharti',
    'krishi vibhag vacancy',
    'nabard agriculture officer',
    'bsc agriculture govt jobs',
    'agriculture field officer',
    'state agriculture department jobs',
    'agriculture extension officer',
    'krishi sarkari naukri',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/agriculture-jobs',
  },
  openGraph: {
    title: 'Agriculture Government Jobs 2026-27 — Latest B.Sc Agriculture, ICAR Sarkari Naukri',
    description:
      'Find agriculture sarkari naukri 2026-27. ICAR, FCI, NABARD, Agriculture Officer & Krishi Vibhag vacancies for B.Sc Agriculture candidates.',
    url: 'https://sarkarialert.online/agriculture-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'Which government jobs are available for agriculture graduates?',
    answer:
      'Agriculture graduates can apply for ICAR Scientist/Technical posts, FCI (Food Corporation of India) Manager/AG-III, Agriculture Officer in state departments, NABARD Development Assistant, Agriculture Field Officer in banks (IBPS SO), State Agriculture Extension Officer, Krishi Vigyan Kendra posts, and UPSC IFS (Indian Forest Service) through agriculture optional.',
  },
  {
    question: 'Krishi vibhag ki sarkari naukri ke liye kya yogyata chahiye?',
    answer:
      'Krishi vibhag ki sarkari naukri ke liye B.Sc Agriculture ya M.Sc Agriculture kisi manyata prapt sansthan se honi chahiye. Agriculture Officer ke liye B.Sc Ag zaroori hai. ICAR Scientist ke liye M.Sc/Ph.D chahiye. FCI AG-III ke liye graduation kisi bhi subject me chalti hai lekin agriculture graduates ko preference milti hai.',
  },
  {
    question: 'How to get ICAR Scientist jobs?',
    answer:
      'ICAR recruits scientists through ASRB (Agricultural Scientists Recruitment Board). Candidates need M.Sc/Ph.D in Agriculture or allied sciences. The selection process includes ARS (Agricultural Research Service) exam conducted by ASRB with prelims, mains, and interview. NET qualification is also conducted by ASRB for eligibility as Assistant Professor.',
  },
  {
    question: 'What is the salary of Agriculture Officer in government?',
    answer:
      'Agriculture Officer in state government gets Pay Level 10 (Rs 56,100 - Rs 1,77,500 basic pay). With allowances, the gross salary is approximately Rs 70,000 - Rs 90,000 per month for freshers. ICAR Scientists start at Pay Level 10-11. FCI managers get attractive pay with additional benefits like subsidized food grains.',
  },
  {
    question: 'Can B.Sc Agriculture students apply for banking jobs?',
    answer:
      'Yes, B.Sc Agriculture graduates can apply for Agriculture Field Officer posts in banks through IBPS SO (Specialist Officer) exam. They can also apply for NABARD Development Assistant, RBI Grade B, and general banking positions through IBPS PO/Clerk. Agriculture graduates have dedicated posts in many public sector banks.',
  },
  {
    question: 'What is FCI recruitment process for agriculture graduates?',
    answer:
      'FCI recruits through online exam for AG-III (General, Depot, Technical, Accounts) and Manager posts. Agriculture graduates can apply for AG-III Technical and Manager (General/Movement) posts. Selection involves Phase-I (online exam), Phase-II (online exam for shortlisted candidates), and document verification.',
  },
];

function FAQSchema() {
  const schema = {
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function BreadcrumbSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sarkarialert.online/' },
      { '@type': 'ListItem', position: 2, name: 'Jobs', item: 'https://sarkarialert.online/jobs' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Agriculture Jobs',
        item: 'https://sarkarialert.online/agriculture-jobs',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

async function JobsContent() {
  let data;
  try {
    data = await getJobs({ qualification: 'agri', page: '1' });
  } catch {
    return (
      <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
        <Briefcase className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
        <p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">Unable to load jobs</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Backend server is not available. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <JobsLoadMore
      initialJobs={data.results}
      totalCount={data.count}
      nextUrl={data.next}
      filterParams={{ qualification: 'agri' }}
    />
  );
}

export default function AgricultureJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lime-500 to-green-600 flex items-center justify-center shadow-lg shadow-lime-500/20">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Agriculture Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              कृषि सरकारी नौकरी 2026 — ICAR, FCI, कृषि विभाग भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-lime-50 dark:bg-lime-950/30 border border-lime-200 dark:border-lime-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>agriculture sarkari naukri 2026</strong> across all major government departments and organizations.
            Candidates with <strong>B.Sc Agriculture</strong>, <strong>M.Sc Agriculture</strong>, or allied degrees can apply for posts like{' '}
            <strong>ICAR Scientist</strong>, <strong>FCI Manager/AG-III</strong>, <strong>Agriculture Officer</strong>,{' '}
            <strong>NABARD Development Assistant</strong>, <strong>Agriculture Field Officer</strong> in banks, and state agriculture department posts.
            These jobs offer pay scale of Rs 35,400 - 56,100+ (Level 6-10) with government benefits like pension, medical, and job security.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां कृषि उम्मीदवारों के लिए सभी नवीनतम सरकारी नौकरियां देखें। ICAR, FCI, NABARD,
            राज्य कृषि विभाग और बैंकों में कृषि क्षेत्र अधिकारी की भर्ती अधिसूचनाएं एक जगह।
          </p>
        </div>
      </div>

      {/* Job list */}
      <Suspense fallback={<JobListSkeleton />}>
        <JobsContent />
      </Suspense>

      {/* FAQ Section */}
      <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions — Agriculture Government Jobs
        </h2>
        <div className="space-y-4">
          {faqData.map((faq, i) => (
            <details
              key={i}
              className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden"
            >
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
    </div>
  );
}
