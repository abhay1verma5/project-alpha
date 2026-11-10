import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Flame, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Agniveer Bharti 2026-27 — Army, Navy, Air Force Recruitment | SarkariAlert',
  description:
    'Agniveer Bharti 2026-27 for Indian Army, Navy & Air Force. Eligibility (17.5-21 age, 10th/12th pass), salary Rs 30,000-40,000, Seva Nidhi package Rs 11.71 lakh, 4-year service scheme. Apply online for Agnipath recruitment.',
  keywords: [
    'agniveer bharti 2026',
    'agniveer recruitment 2026',
    'agnipath scheme 2026',
    'agniveer army bharti',
    'agniveer navy recruitment',
    'agniveer air force bharti',
    'agniveer salary 2026',
    'agniveer eligibility',
    'agniveer seva nidhi',
    'agniveer after 4 years',
    'agniveer age limit',
    'agnipath yojana 2026',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/agniveer',
  },
  openGraph: {
    title: 'Agniveer Bharti 2026-27 — Army, Navy, Air Force Recruitment',
    description:
      'Agniveer Bharti 2026-27 — Army, Navy, Air Force recruitment under Agnipath scheme. Salary Rs 30,000-40,000, Seva Nidhi Rs 11.71 lakh.',
    url: 'https://sarkarialert.online/agniveer',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What is the Agniveer (Agnipath) scheme?',
    answer:
      'Agnipath is a new recruitment scheme launched by the Indian Government in June 2022 for the Indian Armed Forces (Army, Navy, Air Force). Under this scheme, youth are recruited as "Agniveers" for a period of 4 years. After 4 years, up to 25% of Agniveers will be retained for regular service (15 years), while the remaining 75% will be released with a Seva Nidhi package. The scheme aims to bring younger, fitter soldiers into the armed forces.',
  },
  {
    question: 'What is the eligibility for Agniveer Bharti 2026?',
    answer:
      'Agniveer eligibility: Age — 17.5 to 21 years (relaxed to 23 years for initial batches). Education — varies by category: Agniveer General Duty requires 10th pass (Class X) with 33% aggregate. Agniveer Technical requires 12th pass with Physics, Chemistry, Maths with 50%. Agniveer Clerk/Store Keeper requires 12th pass with 60% aggregate. Agniveer Tradesman requires 10th pass. Physical fitness and medical standards as per armed forces requirements.',
  },
  {
    question: 'Agniveer ki salary kitni hoti hai?',
    answer:
      'Agniveer ki salary 4 saal ke tenure mein badhti rehti hai: Pehle saal — Rs 30,000 per month (in-hand Rs 21,000, Rs 9,000 Seva Nidhi Fund mein). Dusre saal — Rs 33,000 per month. Teesre saal — Rs 36,500 per month. Chauthe saal — Rs 40,000 per month. Iske alawa Risk & Hardship Allowance, Ration, Dress, Travel Allowance aur Rs 48 lakh ka insurance cover bhi milta hai.',
  },
  {
    question: 'What happens after 4 years of Agniveer service?',
    answer:
      'After completing 4 years: 1) Up to 25% of Agniveers will be selected for regular enrollment in the armed forces for an additional 15 years based on merit and organizational requirements. 2) The remaining 75% will be released with the Seva Nidhi package and can pursue other career options. Released Agniveers get preference in CAPFs (CRPF, BSF, CISF, etc.), state police, and other government job recruitments. They also get skill certificates and educational credits.',
  },
  {
    question: 'What is the Seva Nidhi package for Agniveers?',
    answer:
      'The Seva Nidhi (Service Fund) package is approximately Rs 11.71 lakh after 4 years of service. This is calculated as: 30% of the monthly salary is contributed by the Agniveer to the Seva Nidhi Fund, and an equal matching contribution is made by the government. After 4 years, the accumulated corpus with interest is paid as a lump sum. This amount is tax-free. Additionally, Agniveers get Rs 48 lakh life insurance cover and Rs 44 lakh for disability during service.',
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
        name: 'Agniveer Bharti',
        item: 'https://sarkarialert.online/agniveer',
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
    data = await getJobs({ category: 'defence', page: '1' });
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
      filterParams={{ category: 'defence' }}
    />
  );
}

export default function AgniveerPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-red-500/20">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Agniveer Bharti 2026 — Army, Navy, Air Force Recruitment
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              अग्निवीर भर्ती 2026 — सेना, नौसेना, वायुसेना
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Get the latest <strong>Agniveer Bharti 2026</strong> recruitment updates for <strong>Indian Army</strong>,{' '}
            <strong>Navy</strong>, and <strong>Air Force</strong> under the Agnipath scheme.
            Youth aged <strong>17.5 to 21 years</strong> with <strong>10th/12th pass</strong> qualification can apply.
            Monthly salary ranges from <strong>Rs 30,000 to Rs 40,000</strong> during the 4-year service period.
            After completion, Agniveers receive <strong>Seva Nidhi package of Rs 11.71 lakh</strong> with 25% retention for regular service.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            अग्निवीर भर्ती 2026 — अग्निपथ योजना के तहत थल सेना, नौसेना और वायुसेना में भर्ती।
            17.5-21 वर्ष, 10वीं/12वीं पास उम्मीदवार आवेदन करें। वेतन Rs 30,000-40,000, सेवा निधि Rs 11.71 लाख।
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
          Frequently Asked Questions — Agniveer Bharti 2026
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
