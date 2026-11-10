import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ITI & Diploma Government Jobs 2026-27 — Sarkari Naukri for ITI/Diploma Holders | SarkariAlert',
  description:
    'ITI & Diploma sarkari naukri 2026-27: Browse latest government jobs for ITI & Diploma holders. Railway, Defence, DRDO, ISRO, Ordnance Factory, State PWD & more. Apply online with eligibility & last date.',
  keywords: [
    'ITI sarkari naukri 2026',
    'diploma government jobs 2026',
    'ITI pass govt job',
    'diploma holder sarkari naukri',
    'railway ITI vacancy 2026',
    'defence ITI jobs',
    'ordnance factory apprentice',
    'ITI fitter electrician jobs',
    'polytechnic diploma govt jobs',
    'ITI trade apprentice 2026',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/diploma-jobs',
  },
  openGraph: {
    title: 'ITI & Diploma Government Jobs 2026-27 — Sarkari Naukri for Technical Candidates',
    description:
      'Find ITI & Diploma sarkari naukri 2026-27. Railway Technician, Defence, DRDO, ISRO, Ordnance Factory, Apprentice & more vacancies for ITI/Diploma holders.',
    url: 'https://sarkarialert.online/diploma-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'Which government jobs can I get after ITI?',
    answer:
      'After ITI, you can apply for Railway Technician (ALP/Technician), Defence civilian posts (MES, Ordnance Factory), DRDO & ISRO Technician, State Electricity Board (Lineman, Technician), PWD Junior Engineer, Apprentice posts in HAL/BEL/BHEL, State Transport Corporation, and various technical posts in central & state government.',
  },
  {
    question: 'ITI ke baad kaun si sarkari naukri mil sakti hai?',
    answer:
      'ITI ke baad aap Railway Technician (ALP/Technician), Defence civilian posts (MES, Ordnance Factory), DRDO & ISRO Technician, Rajya Vidyut Board (Lineman, Technician), PWD Junior Engineer, HAL/BEL/BHEL mein Apprentice, aur kai sarkaari vibhaagon mein technical padoon ke liye aavedan kar sakte hain.',
  },
  {
    question: 'What is the salary for ITI/Diploma government jobs?',
    answer:
      'ITI/Diploma government jobs offer salaries from Rs 19,900 to Rs 35,400 per month (Pay Level 2-5). Railway Technician posts offer Rs 19,900-63,200 (Level 2). DRDO/ISRO Technician posts can offer Rs 21,700-69,100 (Level 3). With allowances, gross salary ranges from Rs 25,000 to Rs 50,000+ per month.',
  },
  {
    question: 'What is the age limit for ITI/Diploma government jobs?',
    answer:
      'For most ITI/Diploma government jobs, the age limit is 18 to 30 years (general category). Railway Technician allows 18-30 years. Apprentice posts allow 15-24 years. OBC gets 3 years relaxation and SC/ST gets 5 years relaxation. Some PSU posts allow up to 32 years.',
  },
  {
    question: 'Which ITI trades are most in demand for government jobs?',
    answer:
      'The most in-demand ITI trades for government jobs are: 1) Electrician, 2) Fitter, 3) Welder, 4) Turner, 5) Machinist, 6) Diesel Mechanic, 7) Wireman, 8) Electronics Mechanic, 9) Instrument Mechanic, 10) COPA. Electrician and Fitter have the maximum number of government vacancies.',
  },
  {
    question: 'Can Diploma holders apply for engineering posts in government?',
    answer:
      'Yes, Diploma holders (Polytechnic) can apply for Junior Engineer (JE) posts in Railways, SSC JE, State PWD, CPWD, State Electricity Boards, Municipal Corporations, and various PSUs like NTPC, BHEL, SAIL. Diploma in Engineering is equivalent to a technical qualification for many government posts.',
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
        name: 'ITI & Diploma Jobs',
        item: 'https://sarkarialert.online/diploma-jobs',
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
    data = await getJobs({ qualification: 'ITI', page: '1' });
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
      filterParams={{ qualification: 'ITI' }}
    />
  );
}

export default function DiplomaJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Wrench className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              ITI & Diploma Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              ITI / डिप्लोमा सरकारी नौकरी 2026 — आईटीआई और डिप्लोमा धारकों के लिए सरकारी भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>ITI & Diploma sarkari naukri 2026</strong> across all major government departments.
            Candidates who hold an ITI certificate (Fitter, Electrician, Welder, Turner, etc.) or Polytechnic Diploma
            are eligible for technical posts like <strong>Railway Technician & ALP</strong>,{' '}
            <strong>Defence Civilian Posts</strong> (MES, Ordnance Factory), <strong>DRDO & ISRO Technician</strong>,{' '}
            <strong>SSC JE</strong> (for Diploma), <strong>State Electricity Board</strong> (Lineman, Technician),{' '}
            <strong>PWD</strong>, and Apprentice posts in HAL, BEL, BHEL & other PSUs. These technical posts offer
            pay scales of Rs 19,900 - 35,400+ with government benefits.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां ITI और डिप्लोमा धारकों के लिए सभी नवीनतम सरकारी नौकरियां देखें। रेलवे टेक्नीशियन, रक्षा विभाग,
            DRDO, ISRO, बिजली विभाग, PWD, ऑर्डनेंस फैक्ट्री और अन्य सभी तकनीकी भर्ती अधिसूचनाएं एक जगह।
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
          Frequently Asked Questions — ITI & Diploma Sarkari Naukri
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
