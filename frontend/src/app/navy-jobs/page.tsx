import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Anchor } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Indian Navy Recruitment 2026-27 — Agniveer, SSR, MR Vacancy | SarkariAlert',
  description:
    'Indian Navy recruitment 2026-27: Latest Agniveer SSR, MR, AA vacancy notifications. Navy officer entry through NDA, CDS, 10+2 B.Tech cadet entry & SSC. Check eligibility, age limit, physical standards, salary & apply online for Indian Navy sarkari naukri.',
  keywords: [
    'navy recruitment 2026',
    'navy agniveer',
    'navy SSR',
    'navy MR',
    'indian navy vacancy',
    'navy sailor',
    'navy officer entry',
    'navy AA recruitment',
    'indian navy bharti 2026',
    'navy 10+2 entry',
    'navy tradesman mate',
    'navy sarkari naukri',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/navy-jobs',
  },
  openGraph: {
    title: 'Indian Navy Recruitment 2026-27 — Agniveer, SSR, MR Vacancy',
    description:
      'Find latest Indian Navy recruitment 2026-27. Agniveer SSR, MR, AA, officer entry vacancies with eligibility, physical standards & apply links.',
    url: 'https://sarkarialert.online/navy-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the different entry schemes in the Indian Navy?',
    answer:
      'The Indian Navy offers multiple entry schemes: Agniveer SSR (Senior Secondary Recruits for 12th PCM), Agniveer MR (Matric Recruits for 10th pass), Agniveer AA (Artificer Apprentice), 10+2 B.Tech Cadet Entry for officer training, NDA entry through UPSC, CDS entry for graduates, SSC (Short Service Commission) for engineers, and University Entry Scheme (UES) for final year engineering students.',
  },
  {
    question: 'Navy Agniveer ke liye kya eligibility hai aur kitni salary milti hai?',
    answer:
      'Navy Agniveer SSR ke liye 12th pass with PCM (Maths, Physics) 60% marks chahiye, aur MR ke liye 10th pass 50% marks chahiye. Age 17.5 se 23 saal honi chahiye. Agniveer ki salary pehle saal Rs 30,000/month hai jo chauthe saal Rs 40,000/month hoti hai. 4 saal baad Seva Nidhi Rs 11.71 lakh milti hai. 25% Agniveer ko permanent enrollment milta hai.',
  },
  {
    question: 'What is the selection process for Navy SSR and MR?',
    answer:
      'The selection process for Navy Agniveer SSR/MR includes: (1) Online written exam covering Maths, Science, English, and General Knowledge, (2) Physical Fitness Test (PFT) - 1.6 km run in 7 minutes, 20 squats, 10 push-ups, (3) Medical examination at INS Chilka or designated centres. For SSR, the written exam has higher difficulty level compared to MR. Final merit is based on written exam marks.',
  },
  {
    question: 'How to become a Navy Officer through NDA or CDS?',
    answer:
      'To become a Navy Officer through NDA, apply after 12th (PCM) through UPSC NDA exam held twice a year. Selection includes written exam + SSB Interview (5-day process). Through CDS, graduates can apply via UPSC CDS exam. Other officer entries include 10+2 B.Tech Cadet Entry (for 12th PCM students), SSC (for B.Tech/M.Tech graduates), and University Entry Scheme for final year engineering students.',
  },
  {
    question: 'What is the salary and perks of Indian Navy personnel?',
    answer:
      'Indian Navy salary: Agniveer Rs 30,000-40,000/month, Sub Lieutenant Rs 56,100/month, Lieutenant Rs 61,300/month, Lt Commander Rs 69,400/month. Additional benefits include free accommodation on ships/naval bases, free medical for self and family, canteen facilities (CSD), subsidized rations, adventure and sports opportunities, foreign postings, and pension benefits for permanent cadre.',
  },
  {
    question: 'What are the physical standards required for Indian Navy recruitment?',
    answer:
      'Physical standards for Indian Navy: Minimum height 157 cm for sailors and 162 cm for officers. Eyesight 6/6 without glasses for sailors (6/6, 6/12 correctable for officers). Swimming ability is mandatory. PFT includes 1.6 km run in 7 minutes, 20 squats, and 10 push-ups. Candidates must be free from tattoos on visible body parts (small tattoo on inner forearm allowed for some entries).',
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
        name: 'Navy Jobs',
        item: 'https://sarkarialert.online/navy-jobs',
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

export default function NavyJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Anchor className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Indian Navy Recruitment 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              भारतीय नौसेना भर्ती 2026 — अग्निवीर, SSR, MR
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Indian Navy recruitment 2026</strong> notifications across all entry schemes.
            Apply for <strong>Agniveer SSR</strong> (Senior Secondary Recruits), <strong>Agniveer MR</strong> (Matric Recruits),{' '}
            <strong>Artificer Apprentice</strong>, <strong>10+2 B.Tech Cadet Entry</strong>, <strong>NDA</strong>,{' '}
            <strong>CDS</strong>, and <strong>SSC Officer</strong> entries. Navy personnel get salary of Rs 30,000 - 56,100+
            per month with free accommodation, medical, canteen, and foreign posting opportunities.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां भारतीय नौसेना की सभी नवीनतम भर्ती अधिसूचनाएं देखें। अग्निवीर SSR, MR, AA, अधिकारी
            प्रवेश योजनाओं के लिए पात्रता, आयु सीमा, शारीरिक मानदंड और ऑनलाइन आवेदन की पूरी जानकारी।
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
          Frequently Asked Questions — Indian Navy Recruitment
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
