import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Police Government Jobs 2026-27 — Constable, SI & ASI Vacancies | SarkariAlert',
  description:
    'Police government jobs 2026-27: Browse latest sarkari naukri for Police Constable, Sub Inspector (SI), ASI & Head Constable. SSC GD, State Police, CRPF, BSF, CISF, ITBP, SSB & Delhi Police vacancies. Apply online with eligibility, salary & last date.',
  keywords: [
    'police government jobs 2026',
    'police constable vacancy 2026',
    'sub inspector si bharti 2026',
    'ssc gd constable vacancy',
    'state police recruitment 2026',
    'crpf constable bharti',
    'bsf head constable vacancy',
    'cisf constable jobs 2026',
    'delhi police constable bharti',
    'police sarkari naukri',
    'asi vacancy 2026',
    'itbp constable recruitment',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/police-jobs',
  },
  openGraph: {
    title: 'Police Government Jobs 2026-27 — Constable, SI & ASI Vacancies | Sarkari Naukri',
    description:
      'Find police sarkari naukri 2026-27. SSC GD, State Police, CRPF, BSF, CISF, Delhi Police & more vacancies for Constable, SI, ASI posts.',
    url: 'https://sarkarialert.online/police-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the eligibility criteria for police constable jobs?',
    answer:
      'For police constable jobs, you need to have passed 10th or 12th class (varies by state/organization). Age limit is generally 18-25 years (with relaxation for OBC/SC/ST). Physical standards: Height - 170cm (Male), 157cm (Female) for general category. Chest - 80cm (unexpanded), 85cm (expanded) for males. You must be an Indian citizen with no criminal record.',
  },
  {
    question: 'Police bharti mein physical test kya hota hai?',
    answer:
      'Police bharti mein physical test mein daudh (running), lambi kood (long jump), oonchi kood (high jump), aur chest measurement hoti hai. Purusho ke liye 1600m daudh 5-6 minute mein, aur mahilaon ke liye 800m daudh 3-4 minute mein puri karni hoti hai. Yeh maapdand rajya aur sangthan ke anusaar bhinn hote hain.',
  },
  {
    question: 'What is the height requirement for police jobs?',
    answer:
      'Height requirements vary by organization: For central forces (CRPF, BSF, CISF, ITBP, SSB) - Male: 170cm, Female: 157cm. For state police - Male: 168-172cm, Female: 155-160cm (varies by state). Relaxation of 2-3cm is given to hill area candidates, SC/ST candidates, and candidates from Northeast states.',
  },
  {
    question: 'What is the running requirement in police physical test?',
    answer:
      'Running requirements: For males - 1600m race in 5 minutes 30 seconds to 6 minutes 30 seconds (varies by organization). For females - 800m race in 3 minutes 30 seconds to 4 minutes. SSC GD Constable requires 1600m in 5 min 45 sec (male) and 800m in 3 min 30 sec (female). State police timings may differ.',
  },
  {
    question: 'What is the salary for police constable and sub inspector?',
    answer:
      'Police Constable gets Pay Level 3 (Rs 21,700 - Rs 69,100 basic). Sub Inspector (SI) gets Pay Level 6 (Rs 35,400 - Rs 1,12,400 basic). With allowances (DA, HRA, risk allowance, ration money, uniform allowance), constable gross salary is Rs 30,000-40,000 and SI gross salary is Rs 50,000-65,000 per month.',
  },
  {
    question: 'What is the difference between state police and central police forces?',
    answer:
      'State police (UP Police, MP Police, Rajasthan Police, etc.) handle law & order within the state. Central police forces (CRPF, BSF, CISF, ITBP, SSB, SSC GD) are under the central government and handle border security, VIP protection, industrial security, and internal security across India. Central forces offer all-India transfer, while state police serves within the state. Central forces are recruited through SSC GD, while state police through respective state police recruitment boards.',
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
        name: 'Police Jobs',
        item: 'https://sarkarialert.online/police-jobs',
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
    data = await getJobs({ category: 'police', page: '1' });
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
      filterParams={{ category: 'police' }}
    />
  );
}

export default function PoliceJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/20">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Police Government Jobs 2026 — Constable, SI & ASI Vacancies
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              पुलिस सरकारी नौकरी 2026 — कांस्टेबल, SI, ASI भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>police sarkari naukri 2026</strong> across all central and state police forces.
            Candidates who meet the physical and educational requirements can apply for posts like{' '}
            <strong>Police Constable</strong>, <strong>Sub Inspector (SI)</strong>, <strong>ASI (Assistant Sub Inspector)</strong>,{' '}
            <strong>Head Constable</strong> in <strong>SSC GD</strong>, <strong>CRPF</strong>, <strong>BSF</strong>,{' '}
            <strong>CISF</strong>, <strong>ITBP</strong>, <strong>SSB</strong>, <strong>Delhi Police</strong>,
            and all State Police departments. These jobs offer pay scale of Rs 21,700 - 35,400+ (Level 3-6) with
            government benefits like pension, medical, risk allowance, uniform allowance, and job security.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां पुलिस भर्ती के सभी नवीनतम अपडेट देखें। SSC GD, CRPF, BSF, CISF, ITBP, SSB, दिल्ली पुलिस
            और सभी राज्य पुलिस की कांस्टेबल, SI, ASI भर्ती अधिसूचनाएं एक जगह।
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
          Frequently Asked Questions — Police Government Jobs
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
