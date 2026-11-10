import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, GraduationCap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Graduate Government Jobs 2026-27 — Sarkari Naukri for Graduates | SarkariAlert',
  description:
    'Graduate sarkari naukri 2026-27: Browse latest government jobs for graduates & degree holders. UPSC, SSC CGL, Banking PO, State PSC, Railway & more. Apply online with eligibility, salary & last date.',
  keywords: [
    'graduate government jobs 2026',
    'graduation pass sarkari naukri',
    'degree holder sarkari naukri 2026',
    'ssc cgl vacancy 2026',
    'upsc jobs 2026',
    'banking po jobs 2026',
    'state psc jobs',
    'graduate govt job apply online',
    'BA pass sarkari naukri',
    'BSc pass government job',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/graduate-jobs',
  },
  openGraph: {
    title: 'Graduate Government Jobs 2026-27 — Sarkari Naukri for Degree Holders',
    description:
      'Find graduate level sarkari naukri 2026-27. UPSC, SSC CGL, Banking PO, State PSC, Railway & more vacancies for BA, BSc, BCom & other degree holders.',
    url: 'https://sarkarialert.online/graduate-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'Which government jobs can I get after graduation?',
    answer:
      'After graduation, you are eligible for a wide range of government jobs including UPSC Civil Services (IAS, IPS, IFS), SSC CGL (Inspector, ASO, Auditor), Banking PO & SO (IBPS PO, SBI PO), State PSC (SDM, DSP, BDO), Railway (NTPC Graduate level), Teaching (TGT, PGT, KVS, NVS), and many more Group A, B & C posts.',
  },
  {
    question: 'Graduation ke baad kaun si sarkari naukri mil sakti hai?',
    answer:
      'Graduation ke baad aap UPSC Civil Services (IAS, IPS), SSC CGL (Inspector, ASO, Auditor), Banking PO (IBPS PO, SBI PO), State PSC, Railway NTPC, Teaching (TGT, PGT), aur kai Group A, B & C padoon ke liye aavedan kar sakte hain. Graduation sabse zyada sarkari naukri ke darwaze kholti hai.',
  },
  {
    question: 'What is the salary for graduate level government jobs?',
    answer:
      'Graduate level government jobs offer salaries from Rs 25,500 to Rs 2,50,000+ per month depending on the post. SSC CGL posts offer Pay Level 4-7 (Rs 25,500-1,12,400). UPSC posts offer Pay Level 10+ (Rs 56,100-2,50,000). Banking PO starts at Rs 36,000-63,840. With allowances, the CTC can be significantly higher.',
  },
  {
    question: 'What is the age limit for graduate government jobs?',
    answer:
      'For SSC CGL, the age limit is 18-32 years (varies by post). UPSC Civil Services allows up to 32 years (general). Banking PO is 20-30 years. State PSC varies by state (typically 21-35 years). OBC gets 3 years and SC/ST gets 5 years relaxation in most exams.',
  },
  {
    question: 'Which exam is best for government job after graduation?',
    answer:
      'The top exams after graduation are: 1) UPSC CSE for IAS/IPS (highest prestige), 2) SSC CGL for central government Group B/C posts (most popular), 3) IBPS/SBI PO for banking career, 4) State PSC for state administrative services, 5) RBI Grade B for Reserve Bank, 6) CAPF AC for paramilitary forces. Choose based on your interest and preparation level.',
  },
  {
    question: 'Can I apply for government jobs with any graduation degree?',
    answer:
      'Yes, most government exams like UPSC, SSC CGL, Banking PO, and State PSC accept any graduation degree (BA, BSc, BCom, BBA, BCA, etc.) from a recognized university. Some technical posts require specific degrees (e.g., B.Tech for engineering posts, LLB for legal posts). Always check the specific notification for exact eligibility.',
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
        name: 'Graduate Jobs',
        item: 'https://sarkarialert.online/graduate-jobs',
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
    data = await getJobs({ qualification: 'graduate', page: '1' });
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
      filterParams={{ qualification: 'graduate' }}
    />
  );
}

export default function GraduateJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Graduate Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              ग्रेजुएट सरकारी नौकरी 2026 — स्नातक पास के लिए सरकारी भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>graduate sarkari naukri 2026</strong> across all major government departments.
            Candidates who hold a graduation degree (BA, BSc, BCom, BBA, BCA, B.Tech, or any equivalent) are eligible
            for the highest-paying government posts including <strong>UPSC Civil Services</strong> (IAS, IPS, IFS),{' '}
            <strong>SSC CGL</strong> (Inspector, ASO, Auditor), <strong>Banking PO & SO</strong>,{' '}
            <strong>State PSC</strong> (SDM, DSP, BDO), <strong>Railway NTPC</strong>, Teaching (TGT, PGT), RBI,
            NABARD, and many more Group A, B & C posts with pay scales from Rs 25,500 to Rs 2,50,000+.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां ग्रेजुएट/स्नातक उम्मीदवारों के लिए सभी नवीनतम सरकारी नौकरियां देखें। UPSC, SSC CGL, बैंकिंग PO,
            State PSC, रेलवे NTPC, शिक्षक भर्ती और अन्य सभी विभागों की भर्ती अधिसूचनाएं एक जगह।
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
          Frequently Asked Questions — Graduate Sarkari Naukri
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
