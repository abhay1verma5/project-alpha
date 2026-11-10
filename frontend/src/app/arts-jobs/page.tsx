import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'BA Government Jobs 2026-27 — Arts Graduate Sarkari Naukri | SarkariAlert',
  description:
    'BA government jobs 2026-27: Browse latest sarkari naukri for arts graduates. UPSC, SSC CGL, State PCS, IAS, Bank PO & clerk vacancies for BA pass candidates. Apply online with eligibility, salary & last date.',
  keywords: [
    'ba government jobs 2026',
    'arts graduate sarkari naukri',
    'ba pass sarkari naukri 2026',
    'upsc civil services ba graduate',
    'ssc cgl arts graduate jobs',
    'state pcs vacancy 2026',
    'ba graduate govt jobs',
    'ias preparation for ba students',
    'bank po arts graduate',
    'ba sarkari naukri hindi',
    'graduation pass government jobs',
    'arts stream sarkari naukri',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/arts-jobs',
  },
  openGraph: {
    title: 'BA Government Jobs 2026-27 — Arts Graduate Sarkari Naukri',
    description:
      'Find BA sarkari naukri 2026-27. UPSC, SSC CGL, State PCS, Bank PO & more vacancies for arts graduates.',
    url: 'https://sarkarialert.online/arts-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'Which government jobs can BA graduates apply for?',
    answer:
      'BA graduates can apply for a wide range of government jobs including UPSC Civil Services (IAS, IPS, IFS), SSC CGL (Tax Assistant, Auditor, Inspector), State PCS exams, Bank PO/Clerk through IBPS, SSC CHSL (LDC, DEO, PA/SA), Railway NTPC, State Teaching (TGT), Police Sub Inspector, and many posts in central/state ministries. BA is one of the most versatile degrees for government jobs.',
  },
  {
    question: 'BA ke baad kaun si sarkari naukri mil sakti hai?',
    answer:
      'BA ke baad aap UPSC Civil Services (IAS, IPS, IFS), SSC CGL (Tax Assistant, Auditor, Inspector), State PCS, Bank PO/Clerk (IBPS), SSC CHSL (LDC, DEO), Railway NTPC, Police SI, TGT Teacher, aur kai aur sarkari naukri ke liye apply kar sakte hain. BA graduation ke saath aap lagbhag sabhi competitive exams de sakte hain.',
  },
  {
    question: 'Can BA graduates crack UPSC Civil Services exam?',
    answer:
      'Yes, absolutely! BA graduates have an excellent track record in UPSC Civil Services. Many IAS/IPS toppers are arts graduates. Optional subjects like History, Geography, Political Science, Sociology, and Hindi Literature from arts stream are very popular and scoring in UPSC Mains. BA graduates can choose these as optional subjects and have a strong foundation.',
  },
  {
    question: 'What is the salary for government jobs after BA?',
    answer:
      'Salary varies by post: IAS/IPS officers start at Pay Level 10 (Rs 56,100 basic). SSC CGL posts offer Pay Level 4-7 (Rs 25,500 - Rs 44,900 basic). Bank PO starts at Rs 36,000-40,000 basic. State PCS officers get similar pay as central services. With allowances, SSC CGL gross salary is Rs 40,000-65,000, while Bank PO gets Rs 50,000-60,000 per month.',
  },
  {
    question: 'Is BA enough for SSC CGL and Bank PO exams?',
    answer:
      'Yes, BA (graduation in any discipline) is sufficient for SSC CGL and Bank PO exams. SSC CGL requires graduation from a recognized university. IBPS PO/Clerk also requires graduation in any discipline. You do not need any specific stream or subject for these exams. However, you must prepare well for quantitative aptitude, reasoning, English, and general awareness sections.',
  },
  {
    question: 'Which State PCS exams can arts graduates apply for?',
    answer:
      'Arts graduates can apply for all State PCS exams including UPPSC (UP), BPSC (Bihar), MPPSC (MP), RPSC (Rajasthan), HPSC (Haryana), PPSC (Punjab), WBPSC (West Bengal), TNPSC (Tamil Nadu), KPSC (Karnataka), and others. These exams recruit for posts like SDM, DSP, BDO, Tehsildar, Naib Tehsildar, and various administrative positions at state level.',
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
        name: 'Arts Jobs',
        item: 'https://sarkarialert.online/arts-jobs',
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
    data = await getJobs({ qualification: 'graduation', page: '1' });
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
      filterParams={{ qualification: 'graduation' }}
    />
  );
}

export default function ArtsJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              BA Government Jobs 2026 — Arts Graduate Sarkari Naukri
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              बीए सरकारी नौकरी 2026 — आर्ट्स ग्रेजुएट भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>BA sarkari naukri 2026</strong> across all major government departments and competitive exams.
            Arts graduates with <strong>BA</strong> in <strong>History</strong>, <strong>Political Science</strong>,{' '}
            <strong>Geography</strong>, <strong>Hindi</strong>, <strong>English</strong>, or any subject can apply for{' '}
            <strong>UPSC Civil Services (IAS/IPS)</strong>, <strong>SSC CGL</strong>, <strong>State PCS</strong>,{' '}
            <strong>Bank PO/Clerk</strong>, <strong>Railway NTPC</strong>, and many more posts.
            BA is one of the most versatile degrees for government jobs with opportunities in Pay Level 4-14 across ministries, banks, railways, and state services.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां बीए आर्ट्स ग्रेजुएट उम्मीदवारों के लिए सभी नवीनतम सरकारी नौकरियां देखें। UPSC, SSC CGL,
            State PCS, बैंक PO, रेलवे NTPC और अन्य भर्ती अधिसूचनाएं एक जगह।
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
          Frequently Asked Questions — BA Government Jobs
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
