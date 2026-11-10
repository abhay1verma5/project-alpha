import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Indian Army Bharti 2026-27 — Army Rally, Agniveer & Officer Entry | SarkariAlert',
  description:
    'Indian Army Bharti 2026-27: Latest army rally bharti, Agniveer recruitment, soldier GD, clerk, tradesman & officer entry vacancies. Check eligibility, age limit, physical standards, salary & apply online for Indian Army sarkari naukri.',
  keywords: [
    'army bharti 2026',
    'army rally',
    'agniveer army',
    'indian army recruitment',
    'army soldier GD',
    'army clerk',
    'army tradesman',
    'army rally bharti 2026',
    'indian army vacancy',
    'army officer entry',
    'army technical entry',
    'army sarkari naukri',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/army-jobs',
  },
  openGraph: {
    title: 'Indian Army Bharti 2026-27 — Army Rally, Agniveer & Officer Entry',
    description:
      'Find latest Indian Army recruitment 2026-27. Agniveer, rally bharti, soldier GD, clerk, tradesman & officer entry vacancies with eligibility & apply links.',
    url: 'https://sarkarialert.online/army-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the different entry schemes in the Indian Army?',
    answer:
      'The Indian Army offers several entry schemes: Agniveer (4-year service for soldiers), NDA (National Defence Academy for 12th pass), CDS (Combined Defence Services for graduates), TES (Technical Entry Scheme for PCM students), SSC Tech for engineering graduates, and direct rally bharti for soldier GD, clerk, tradesman, and nursing assistant posts.',
  },
  {
    question: 'Indian Army Agniveer ke liye kya yogyata chahiye aur salary kitni milti hai?',
    answer:
      'Agniveer ke liye age 17.5 se 23 saal honi chahiye. Soldier GD ke liye 10th pass (50% marks), Clerk ke liye 12th pass (60% marks), aur Tradesman ke liye 10th pass chahiye. Agniveer ki salary pehle saal Rs 30,000/month hoti hai jo chauthe saal Rs 40,000/month tak badhti hai. Seva Nidhi package Rs 11.71 lakh milta hai 4 saal baad.',
  },
  {
    question: 'What is the physical fitness test for Army Rally Bharti?',
    answer:
      'Army Rally Bharti physical tests include: 1.6 km run in 5 minutes 30 seconds (Group I) or 5 minutes 45 seconds (Group II), pull-ups (minimum 6 for 21 marks), 9 feet ditch jump, and balancing beam walk. Height requirement is minimum 170 cm for soldier GD and 162 cm for clerk. Chest measurement minimum 77 cm with 5 cm expansion.',
  },
  {
    question: 'How to apply for Indian Army recruitment online?',
    answer:
      'To apply for Indian Army recruitment: Visit joinindianarmy.nic.in, register with your email and phone number, fill the online application form with personal details, educational qualification, and upload required documents (photo, signature, certificates). For rally bharti, download the admit card after registration. For officer entries (NDA/CDS), apply through UPSC website.',
  },
  {
    question: 'What is the salary and benefits of Indian Army personnel?',
    answer:
      'Indian Army salary varies by rank: Sepoy/Agniveer gets Rs 30,000-40,000/month, Naib Subedar Rs 47,600-1,51,100, Lieutenant Rs 56,100-1,77,500, and Captain Rs 61,300-1,93,900. Benefits include free medical, CSD canteen, subsidized housing, pension (for permanent cadre), insurance, and education allowance for children.',
  },
  {
    question: 'What is the selection process for Indian Army Soldier GD?',
    answer:
      'The selection process for Army Soldier GD includes: (1) Online registration on joinindianarmy.nic.in, (2) Rally Bharti with physical fitness test, physical measurement, and document verification, (3) Written exam (CEE - Common Entrance Exam) with questions on GK, Maths, and General Science, (4) Medical examination. Final merit list is based on all stages combined.',
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
        name: 'Army Jobs',
        item: 'https://sarkarialert.online/army-jobs',
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

export default function ArmyJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center shadow-lg shadow-green-600/20">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Indian Army Bharti 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              भारतीय सेना भर्ती 2026 — अग्निवीर, रैली भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Indian Army bharti 2026</strong> notifications across all entry schemes.
            Apply for <strong>Agniveer</strong> (Soldier GD, Clerk, Tradesman), <strong>Army Rally Bharti</strong>,{' '}
            <strong>NDA</strong>, <strong>CDS</strong>, <strong>TES (Technical Entry Scheme)</strong>, and{' '}
            <strong>SSC Officer</strong> entries. These posts offer salary of Rs 30,000 - 56,100+ per month with
            allowances, free medical, CSD canteen, housing, and lifelong pension benefits.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां भारतीय सेना की सभी नवीनतम भर्ती अधिसूचनाएं देखें। अग्निवीर, रैली भर्ती, NDA, CDS, TES
            और अन्य प्रवेश योजनाओं के लिए पात्रता, आयु सीमा, शारीरिक मानदंड और ऑनलाइन आवेदन की जानकारी।
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
          Frequently Asked Questions — Indian Army Bharti
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
