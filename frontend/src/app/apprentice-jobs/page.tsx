import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Apprentice Jobs 2026-27 — Railway, PSU & Government Apprenticeship | SarkariAlert',
  description:
    'Apprentice recruitment 2026-27: Latest railway apprentice, PSU apprenticeship, ITI apprentice vacancy. NAPS/NATS portal registration, stipend Rs 7,000-9,000, trade & graduate apprentice vacancies with eligibility, duration & apply online.',
  keywords: [
    'apprentice recruitment 2026',
    'railway apprentice',
    'PSU apprenticeship',
    'ITI apprentice vacancy',
    'NAPS portal',
    'apprentice stipend',
    'trade apprentice vacancy',
    'graduate apprentice 2026',
    'technician apprentice',
    'NATS portal registration',
    'apprentice act 1961',
    'railway apprentice selection',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/apprentice-jobs',
  },
  openGraph: {
    title: 'Apprentice Jobs 2026-27 — Railway, PSU & Government Apprenticeship',
    description:
      'Find latest apprentice vacancies 2026-27. Railway, PSU & government apprenticeship for ITI, diploma & graduate candidates with stipend details.',
    url: 'https://sarkarialert.online/apprentice-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the different types of apprenticeship in India?',
    answer:
      'There are five types of apprenticeship under the Apprentices Act 1961: (1) Trade Apprentice — for ITI pass candidates in designated trades, (2) Graduate Apprentice — for engineering graduates (B.Tech/B.E.), (3) Technician Apprentice — for diploma holders, (4) Technician (Vocational) Apprentice — for vocational certificate holders, and (5) Optional Trade Apprentice — for 10th/12th pass in non-designated trades. Railway, PSUs like BHEL, SAIL, ONGC, and government departments regularly recruit all types.',
  },
  {
    question: 'Apprentice ki stipend kitni hoti hai?',
    answer:
      'Apprentice ki stipend Apprenticeship Act ke anusaar fixed hoti hai. Trade Apprentice (ITI) ko Rs 7,000-9,000 per month, Graduate Apprentice ko Rs 9,000 per month, aur Technician Apprentice ko Rs 8,000 per month milti hai. Railway apprentice ko bhi yahi stipend milti hai. Kuch PSUs jaise BHEL, SAIL apni taraf se additional allowance bhi dete hain. Stipend har saal revise hoti hai.',
  },
  {
    question: 'How long is the apprenticeship duration?',
    answer:
      'Apprenticeship duration varies by type: Trade Apprentice — 1 to 2 years depending on the trade (Fitter, Turner, Electrician etc. are 2 years; Welder, Carpenter are 1 year). Graduate Apprentice — 1 year. Technician Apprentice — 1 year. Optional Trade Apprentice — 6 months to 1 year. After completion, candidates receive a National Apprenticeship Certificate (NAC) from NCVT which is valid for government job applications.',
  },
  {
    question: 'How to register on NAPS and NATS portal for apprenticeship?',
    answer:
      'NAPS (National Apprenticeship Promotion Scheme) portal — Visit apprenticeshipindia.gov.in, click "Candidate Registration", fill personal details, education, and upload documents. NATS (National Apprenticeship Training Scheme) portal — Visit portal.mhrdnats.gov.in for graduate and technician apprentice registration. After registration, you can search and apply for apprentice vacancies in various organizations. Keep your ITI/Diploma/Degree certificate and Aadhaar card ready.',
  },
  {
    question: 'What is the selection process for Railway Apprentice?',
    answer:
      'Railway Apprentice selection is based on merit — no written exam is conducted. Selection criteria: 50% weightage to ITI marks and 50% to 10th (matriculation) marks. Candidates must have ITI certificate in relevant trade from NCVT/SCVT recognized institute. Age limit is 15-24 years (relaxation for SC/ST/OBC/PwBD as per rules). Each Railway zone (like Northern Railway, Western Railway, Southern Railway) releases separate notifications for 1,000-5,000+ apprentice posts.',
  },
  {
    question: 'Does apprenticeship guarantee a permanent government job?',
    answer:
      'No, apprenticeship does not guarantee a permanent job. However, it provides significant advantages: (1) Experience certificate valid for government job applications, (2) NAC (National Apprenticeship Certificate) adds extra marks in many recruitment exams, (3) Some PSUs give preference to ex-apprentices in their regular recruitment, (4) Railway gives additional marks to ex-apprentices in Group D and Technician recruitment. Many candidates use apprenticeship as a stepping stone to crack regular government exams.',
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
        name: 'Apprentice Jobs',
        item: 'https://sarkarialert.online/apprentice-jobs',
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
    data = await getJobs({ qualification: 'iti', page: '1' });
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
      filterParams={{ qualification: 'iti' }}
    />
  );
}

export default function ApprenticeJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Wrench className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Apprentice Jobs 2026 — Railway, PSU & Government Apprenticeship
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              अप्रेंटिस भर्ती 2026 — रेलवे, PSU और सरकारी अप्रेंटिसशिप
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>apprentice recruitment 2026</strong> in Railway, PSUs, and government departments.
            Candidates with <strong>ITI</strong>, <strong>Diploma</strong>, or <strong>B.Tech/B.E.</strong> can apply for{' '}
            <strong>Trade Apprentice</strong>, <strong>Graduate Apprentice</strong>, and <strong>Technician Apprentice</strong> posts.
            Register on <strong>NAPS/NATS portal</strong> and apply for apprenticeship at BHEL, SAIL, ONGC, Indian Railways, and more.
            Apprentice stipend ranges from Rs 7,000 - 9,000 per month with a National Apprenticeship Certificate (NAC) on completion.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां रेलवे, PSU और सरकारी विभागों की सभी नवीनतम अप्रेंटिस भर्तियां देखें। ITI, डिप्लोमा और ग्रेजुएट उम्मीदवारों
            के लिए ट्रेड, टेक्नीशियन और ग्रेजुएट अप्रेंटिस वैकेंसी — NAPS/NATS रजिस्ट्रेशन, स्टाइपेंड और आवेदन की पूरी जानकारी।
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
          Frequently Asked Questions — Apprentice Jobs
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
