import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Target, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'SSC CGL 2026-27 — Notification, Syllabus, Eligibility, Exam Date | SarkariAlert',
  description:
    'SSC CGL 2026-27 notification, syllabus, eligibility, exam date, vacancy details. Apply for SSC Combined Graduate Level posts — Inspector, ASO, Auditor, Tax Assistant. Complete guide with salary, age limit & selection process.',
  keywords: [
    'ssc cgl 2026',
    'ssc cgl notification 2026',
    'ssc cgl syllabus 2026',
    'ssc cgl eligibility',
    'ssc cgl exam date 2026',
    'ssc cgl salary',
    'ssc cgl vacancy 2026',
    'ssc combined graduate level',
    'ssc cgl inspector post',
    'ssc cgl aso recruitment',
    'ssc cgl auditor vacancy',
    'ssc cgl tier 1 tier 2',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/ssc-cgl',
  },
  openGraph: {
    title: 'SSC CGL 2026-27 — Notification, Syllabus, Eligibility, Exam Date',
    description:
      'SSC CGL 2026-27 complete guide — notification, syllabus, eligibility, salary, exam pattern. Apply for Inspector, ASO, Auditor & Tax Assistant posts.',
    url: 'https://sarkarialert.online/ssc-cgl',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What is the eligibility for SSC CGL 2026?',
    answer:
      'SSC CGL 2026 requires a Bachelor\'s degree (Graduation) from a recognized university in any stream. There is no percentage requirement — just a pass degree is sufficient. For some posts like Statistical Investigator, a specific subject in graduation (Statistics) is required.',
  },
  {
    question: 'SSC CGL ke liye age limit kya hai?',
    answer:
      'SSC CGL ke liye age limit 18 se 32 saal hai (general category). OBC ko 3 saal, SC/ST ko 5 saal aur PwD ko 10 saal ki chhoot milti hai. Kuch posts jaise Inspector ke liye upper age 30 saal hai jabki kuch posts ke liye 27 saal hai. Age 1 January 2026 ke hisaab se count hogi.',
  },
  {
    question: 'What is the SSC CGL exam pattern for 2026?',
    answer:
      'SSC CGL exam has two tiers: Tier 1 (Computer Based Test) has 100 questions for 200 marks with 60 minutes duration covering General Intelligence, General Awareness, Quantitative Aptitude & English. Tier 2 has multiple papers including Maths (390 marks), English & General Awareness (200 marks each) and a Computer Knowledge Test.',
  },
  {
    question: 'What is the salary of SSC CGL posts?',
    answer:
      'SSC CGL salary ranges from Rs 25,500 to Rs 1,51,100 basic pay depending on the post and pay level. Group B posts like Inspector (CBDT/CBIC) get Pay Level 7 (Rs 44,900-1,42,400). ASO gets Pay Level 6 (Rs 35,400-1,12,400). Tax Assistant gets Pay Level 4 (Rs 25,500-81,100). With DA, HRA and other allowances, in-hand salary ranges from Rs 45,000 to Rs 80,000+ per month.',
  },
  {
    question: 'Which are the best posts in SSC CGL?',
    answer:
      'The best SSC CGL posts based on salary, promotion and work profile are: 1) Inspector (CBDT/CBIC) — Pay Level 7, good promotion prospects. 2) Assistant Section Officer (ASO) in CSS — Pay Level 6, Central Secretariat posting with fast promotions. 3) Auditor in CAG — Pay Level 5, good work-life balance. 4) Inspector (Preventive Officer) in Customs — fieldwork with additional allowances. 5) Statistical Investigator — Pay Level 6, specialized role in MoSPI.',
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
        name: 'SSC CGL',
        item: 'https://sarkarialert.online/ssc-cgl',
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
    data = await getJobs({ category: 'ssc', page: '1' });
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
      filterParams={{ category: 'ssc' }}
    />
  );
}

export default function SscCglPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              SSC CGL 2026 — Notification, Syllabus, Eligibility, Exam Date
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              SSC CGL 2026 — अधिसूचना, सिलेबस, पात्रता, परीक्षा तिथि
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Get the latest <strong>SSC CGL 2026</strong> updates including notification, syllabus, eligibility criteria, and exam dates.
            SSC Combined Graduate Level exam offers prestigious posts like{' '}
            <strong>Inspector (CBDT/CBIC)</strong>, <strong>Assistant Section Officer (ASO)</strong>,{' '}
            <strong>Auditor</strong>, and <strong>Tax Assistant</strong> across central government departments.
            Salary ranges from Rs 25,500 to Rs 1,51,100 with excellent career growth and government benefits.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            SSC CGL 2026 की पूरी जानकारी — अधिसूचना, सिलेबस, पात्रता, वेतन, परीक्षा पैटर्न।
            ग्रेजुएशन पास उम्मीदवार इंस्पेक्टर, ASO, ऑडिटर जैसे पदों के लिए आवेदन करें।
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
          Frequently Asked Questions — SSC CGL 2026
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
