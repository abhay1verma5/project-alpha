import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Cog } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Engineering Government Jobs 2026-27 — PSU, SSC JE & Technical Sarkari Naukri | SarkariAlert',
  description:
    'Engineering government jobs 2026-27: Browse latest sarkari naukri for B.Tech, B.E., Diploma engineers. PSU recruitment through GATE, SSC JE, ISRO, DRDO, Railway & State Engineering Services vacancies. Apply online with eligibility, salary & last date.',
  keywords: [
    'engineering government jobs 2026',
    'ssc je vacancy 2026',
    'psu recruitment through gate 2026',
    'engineering sarkari naukri',
    'btech government jobs',
    'isro recruitment 2026',
    'drdo engineer vacancy',
    'railway engineering jobs',
    'state engineering services',
    'gate score government jobs',
    'junior engineer sarkari naukri',
    'diploma engineering govt jobs',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/engineering-jobs',
  },
  openGraph: {
    title: 'Engineering Government Jobs 2026-27 — Latest PSU, SSC JE & Technical Sarkari Naukri',
    description:
      'Find engineering sarkari naukri 2026-27. PSU through GATE, SSC JE, ISRO, DRDO, Railway & more vacancies for B.Tech, B.E., Diploma engineers.',
    url: 'https://sarkarialert.online/engineering-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'Which government jobs are available for engineering graduates?',
    answer:
      'Engineering graduates can apply for PSU jobs through GATE (BHEL, NTPC, ONGC, IOCL, GAIL, SAIL, etc.), SSC JE (Junior Engineer), ISRO Scientist/Engineer, DRDO Scientist-B, Railway JE/SSE, State Engineering Services (AE/JE), IES (Indian Engineering Services), and various technical posts in central/state government departments.',
  },
  {
    question: 'Engineering sarkari naukri ke liye kya yogyata chahiye?',
    answer:
      'Engineering sarkari naukri ke liye B.Tech/B.E. ya Diploma in Engineering kisi manyata prapt sansthan se hona chahiye. PSU jobs ke liye GATE score zaroori hai. SSC JE ke liye Diploma ya B.Tech dono chalte hain. ISRO aur DRDO ke liye B.Tech/M.Tech zaroori hai.',
  },
  {
    question: 'How to get PSU jobs through GATE score?',
    answer:
      'To get PSU jobs through GATE, first qualify the GATE exam with a good score. PSUs like BHEL, NTPC, ONGC, IOCL, GAIL, SAIL, PGCIL, etc. recruit through GATE score. Apply on individual PSU websites when notifications are released. Selection is based on GATE score followed by interview (in some PSUs).',
  },
  {
    question: 'What is the salary for SSC JE (Junior Engineer)?',
    answer:
      'SSC JE (Junior Engineer) gets Pay Level 6 (Rs 35,400 - Rs 1,12,400 basic pay). With allowances (DA, HRA, etc.), the gross salary for SSC JE is approximately Rs 50,000 - Rs 60,000 per month for freshers. Senior positions like AE/AEE offer even higher pay scales.',
  },
  {
    question: 'What is the selection process for engineering government jobs?',
    answer:
      'The selection process varies: SSC JE has Paper-I (CBT) + Paper-II (Descriptive) + Document Verification. PSU through GATE has GATE Score + Interview. ISRO has Written Test + Interview. IES (Indian Engineering Services) has Prelims + Mains + Interview conducted by UPSC.',
  },
  {
    question: 'Can diploma engineers apply for government jobs?',
    answer:
      'Yes, diploma engineers can apply for many government jobs including SSC JE (Junior Engineer), Railway JE, State PWD JE, CPWD JE, Military Engineering Service (MES), and various state-level junior engineer posts. Diploma holders are eligible for Pay Level 6 posts in most departments.',
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
        name: 'Engineering Jobs',
        item: 'https://sarkarialert.online/engineering-jobs',
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
    data = await getJobs({ qualification: 'engineering', page: '1' });
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
      filterParams={{ qualification: 'engineering' }}
    />
  );
}

export default function EngineeringJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Cog className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Engineering Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              इंजीनियरिंग सरकारी नौकरी 2026 — PSU, SSC JE, ISRO, DRDO भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>engineering sarkari naukri 2026</strong> across all major government departments and PSUs.
            Candidates with <strong>B.Tech</strong>, <strong>B.E.</strong>, or <strong>Diploma in Engineering</strong> can apply for posts like{' '}
            <strong>SSC JE</strong>, <strong>Railway JE/SSE</strong>, <strong>ISRO Scientist/Engineer</strong>,{' '}
            <strong>DRDO Scientist-B</strong>, and PSU jobs through <strong>GATE</strong> at BHEL, NTPC, ONGC, IOCL, GAIL, SAIL, and more.
            These jobs offer pay scale of Rs 35,400 - 56,100+ (Level 6-10) with government benefits like pension, medical, and job security.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां इंजीनियरिंग उम्मीदवारों के लिए सभी नवीनतम सरकारी नौकरियां देखें। GATE के माध्यम से PSU, SSC JE,
            ISRO, DRDO, रेलवे और राज्य इंजीनियरिंग सेवाओं की भर्ती अधिसूचनाएं एक जगह।
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
          Frequently Asked Questions — Engineering Government Jobs
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
