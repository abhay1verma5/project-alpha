import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Patwari/Lekhpal Bharti 2026-27 — Revenue Department Vacancy | SarkariAlert',
  description:
    'Patwari/Lekhpal bharti 2026-27: Latest revenue department sarkari naukri. UP Lekhpal, MP Patwari, Rajasthan Patwari vacancy with eligibility, salary Rs 20,000-35,000, exam syllabus, selection process & apply online links.',
  keywords: [
    'patwari bharti 2026',
    'lekhpal vacancy',
    'revenue department recruitment',
    'patwari salary',
    'patwari exam syllabus',
    'tehsildar vacancy',
    'up lekhpal bharti 2026',
    'mp patwari vacancy',
    'rajasthan patwari recruitment',
    'patwari sarkari naukri',
    'revenue inspector vacancy',
    'land record officer jobs',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/patwari-jobs',
  },
  openGraph: {
    title: 'Patwari/Lekhpal Bharti 2026-27 — Revenue Department Vacancy',
    description:
      'Find latest patwari & lekhpal sarkari naukri 2026-27. UP Lekhpal, MP Patwari, Rajasthan Patwari vacancy with salary, eligibility & exam details.',
    url: 'https://sarkarialert.online/patwari-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What is the role of a Patwari/Lekhpal in government?',
    answer:
      'A Patwari (also called Lekhpal in UP, Talati in Gujarat, Village Administrative Officer in some states) is a revenue department official responsible for maintaining land records, updating ownership details, measuring agricultural land, collecting land revenue, and issuing land-related documents like khatauni, khasra, and jamabandi. They work under the Tehsildar and are the primary link between the revenue administration and rural population.',
  },
  {
    question: 'Patwari banne ke liye kya qualification chahiye?',
    answer:
      'Patwari banne ke liye graduation (any stream) kisi manyata prapt university se hona zaroori hai. Saath mein computer certificate (CCC/CPCT ya equivalent) bhi chahiye. Kuch states mein Hindi typing ya local language typing bhi maangi jaati hai. Age limit generally 18-40 years hoti hai (reserved categories ko relaxation milti hai).',
  },
  {
    question: 'What is the salary of a Patwari/Lekhpal?',
    answer:
      'Patwari/Lekhpal salary varies by state. Generally, the basic pay is Rs 20,000 - Rs 35,000 per month. With DA, HRA, and other allowances, the gross salary comes to approximately Rs 25,000 - Rs 45,000 per month. After 7th Pay Commission implementation, many states have revised patwari salaries upward. Additional benefits include pension (in some states), medical allowance, and travel allowance.',
  },
  {
    question: 'What is the Patwari exam pattern and syllabus?',
    answer:
      'The Patwari exam typically consists of an objective-type written test covering: General Knowledge & Current Affairs (25-30 marks), Hindi Language (20-25 marks), Mathematics (25-30 marks), Rural Economy & Panchayati Raj (15-20 marks), and Computer Knowledge (15-20 marks). Some states also include Reasoning and a local language section. Total marks range from 100-200 with 2-3 hours duration. Selection is based on written exam marks + document verification.',
  },
  {
    question: 'Which states conduct Patwari recruitment regularly?',
    answer:
      'Major states that conduct regular patwari/lekhpal recruitment include: Uttar Pradesh (UP Lekhpal through UPSSSC), Madhya Pradesh (MP Patwari through MP Vyapam/PEB), Rajasthan (Rajasthan Patwari through RSMSSB), Chhattisgarh (CG Patwari), Himachal Pradesh (HP Patwari), and Punjab. Each state has its own recruitment board and exam pattern. UP Lekhpal and MP Patwari are among the largest recruitments with 5,000-10,000+ vacancies.',
  },
  {
    question: 'Is there any promotion scope after becoming a Patwari?',
    answer:
      'Yes, Patwari has a defined promotion path in the revenue department. A Patwari can be promoted to Naib Tehsildar, then Tehsildar, and further to SDM (Sub Divisional Magistrate) level through departmental exams and seniority. Some states also allow patwaris to appear for state PSC exams for direct promotion to higher revenue posts. The typical promotion timeline is 8-12 years for Naib Tehsildar.',
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
        name: 'Patwari Jobs',
        item: 'https://sarkarialert.online/patwari-jobs',
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

export default function PatwariJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg shadow-yellow-500/20">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Patwari/Lekhpal Bharti 2026 — Revenue Department Vacancy
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              पटवारी/लेखपाल भर्ती 2026 — राजस्व विभाग वैकेंसी
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>patwari/lekhpal bharti 2026</strong> across all states of India.
            Candidates with <strong>graduation (any stream)</strong> and <strong>computer certificate (CCC/CPCT)</strong> can apply for revenue department posts like{' '}
            <strong>UP Lekhpal</strong>, <strong>MP Patwari</strong>, <strong>Rajasthan Patwari</strong>,{' '}
            <strong>CG Patwari</strong>, and <strong>HP Patwari</strong>.
            These posts offer salary of Rs 20,000 - 35,000+ with government benefits, pension, and promotion to Naib Tehsildar and Tehsildar.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां सभी राज्यों की पटवारी/लेखपाल भर्ती की जानकारी देखें। UP लेखपाल, MP पटवारी, राजस्थान पटवारी,
            छत्तीसगढ़ पटवारी और अन्य राज्यों की राजस्व विभाग वैकेंसी — पात्रता, सिलेबस, सैलरी और आवेदन लिंक एक जगह।
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
          Frequently Asked Questions — Patwari/Lekhpal Jobs
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
