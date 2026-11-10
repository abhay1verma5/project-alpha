import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Commerce Government Jobs 2026-27 — B.Com, CA, Accountant Sarkari Naukri | SarkariAlert',
  description:
    'Commerce government jobs 2026-27: Browse latest sarkari naukri for B.Com, M.Com, CA, ICWA candidates. SSC CGL accountant, Income Tax Inspector, CAG audit, banking exams & state accountant vacancies. Apply online with eligibility, salary & last date.',
  keywords: [
    'commerce government jobs 2026',
    'bcom sarkari naukri 2026',
    'ssc cgl accountant vacancy',
    'income tax inspector recruitment',
    'ca government jobs',
    'cag auditor vacancy 2026',
    'banking exams for commerce',
    'accountant sarkari naukri',
    'bcom ke baad govt jobs',
    'state accountant vacancy',
    'commerce graduate govt jobs',
    'chartered accountant sarkari naukri',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/commerce-jobs',
  },
  openGraph: {
    title: 'Commerce Government Jobs 2026-27 — Latest B.Com, CA, Accountant Sarkari Naukri',
    description:
      'Find commerce sarkari naukri 2026-27. SSC CGL accountant, Income Tax, CAG audit, banking exams & state accountant vacancies for B.Com, CA candidates.',
    url: 'https://sarkarialert.online/commerce-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'Which government jobs are available for commerce graduates?',
    answer:
      'Commerce graduates (B.Com, M.Com, CA, ICWA) can apply for SSC CGL (Accountant/Auditor posts in CAG, CGA, CGDA), Income Tax Inspector/Officer, Banking exams (IBPS PO/Clerk, SBI PO/Clerk, RBI Assistant), Excise Inspector, Customs Inspector, State Accountant/Auditor posts, Railway Accounts department, Defence Accounts department, and Postal department (Postal Assistant/Sorting Assistant).',
  },
  {
    question: 'B.Com ke baad kaun si sarkari naukri mil sakti hai?',
    answer:
      'B.Com ke baad aap SSC CGL se Accountant/Auditor (CAG, CGA mein), Income Tax Inspector, Banking exams (IBPS PO/Clerk, SBI), Railway Accounts, Defence Accounts, State Finance department, aur Treasury Officer posts ke liye apply kar sakte hain. CA/ICWA holders ke liye CAG, RBI, SEBI mein special posts hain. M.Com holders UGC NET dekar Assistant Professor bhi ban sakte hain.',
  },
  {
    question: 'How to become Income Tax Inspector?',
    answer:
      'To become Income Tax Inspector, qualify the SSC CGL (Combined Graduate Level) exam. SSC CGL has four tiers: Tier-I (Prelims CBT), Tier-II (Mains CBT covering Quantitative Aptitude, English, Statistics, General Studies). Based on merit and preference, candidates are allocated to Income Tax department. Income Tax Inspector gets Pay Level 7 (Rs 44,900 - Rs 1,42,400 basic). Promotion path leads to Assistant Commissioner and above.',
  },
  {
    question: 'What is the role of CA in government sector?',
    answer:
      'Chartered Accountants (CA) have prestigious government positions including CAG (Comptroller & Auditor General) audit posts, RBI Grade B Officer, SEBI Grade A Officer, NABARD Officer, Income Tax Commissioner (through UPSC), Cost Accountant in government departments, and Finance Advisor/Controller in ministries. CA qualified candidates get direct entry into many senior government financial positions.',
  },
  {
    question: 'What is the salary for SSC CGL Accountant/Auditor?',
    answer:
      'SSC CGL Accountant/Auditor gets Pay Level 5 (Rs 29,200 - Rs 92,300 basic pay) for Auditor posts and Pay Level 6 (Rs 35,400 - Rs 1,12,400) for Accountant posts. With allowances (DA, HRA, TA), the gross salary is approximately Rs 45,000 - Rs 60,000 per month for freshers. Income Tax Inspector gets Pay Level 7 (Rs 44,900+) which is higher.',
  },
  {
    question: 'Which banking exams are best for commerce graduates?',
    answer:
      'Best banking exams for commerce graduates include IBPS PO (Probationary Officer), IBPS Clerk, SBI PO, SBI Clerk, RBI Assistant, RBI Grade B, NABARD Grade A/B, and IBPS SO (Specialist Officer). IBPS PO and SBI PO offer Scale-I Officer posts with basic pay of Rs 36,000-63,840. RBI Grade B offers Rs 55,200+ basic. Commerce graduates have an advantage in financial and accounting knowledge sections.',
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
        name: 'Commerce Jobs',
        item: 'https://sarkarialert.online/commerce-jobs',
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
    data = await getJobs({ qualification: 'commerce', page: '1' });
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
      filterParams={{ qualification: 'commerce' }}
    />
  );
}

export default function CommerceJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Commerce Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              कॉमर्स सरकारी नौकरी 2026 — SSC CGL, Income Tax, Banking भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>commerce sarkari naukri 2026</strong> across all major government departments and financial institutions.
            Candidates with <strong>B.Com</strong>, <strong>M.Com</strong>, <strong>CA</strong>, or <strong>ICWA</strong> can apply for posts like{' '}
            <strong>SSC CGL Accountant/Auditor</strong>, <strong>Income Tax Inspector</strong>, <strong>CAG Auditor</strong>,{' '}
            <strong>Banking exams (IBPS PO/Clerk, SBI PO)</strong>, and state government accountant posts.
            These jobs offer pay scale of Rs 29,200 - 44,900+ (Level 5-7) with government benefits like pension, medical, and job security.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां कॉमर्स उम्मीदवारों के लिए सभी नवीनतम सरकारी नौकरियां देखें। SSC CGL (अकाउंटेंट/ऑडिटर),
            आयकर विभाग, CAG, बैंकिंग परीक्षा और राज्य लेखा विभाग की भर्ती अधिसूचनाएं एक जगह।
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
          Frequently Asked Questions — Commerce Government Jobs
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
