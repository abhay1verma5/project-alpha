import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Court Jobs 2026-27 — Judiciary Clerk, Stenographer, Peon Vacancy | SarkariAlert',
  description:
    'Court jobs 2026-27: Latest High Court, District Court, Supreme Court vacancy for clerk, stenographer, peon, process server & reader posts. Check eligibility, salary, syllabus & apply online for judiciary sarkari naukri across all states.',
  keywords: [
    'court vacancy 2026',
    'high court recruitment',
    'district court jobs',
    'court clerk',
    'court stenographer',
    'judiciary peon',
    'supreme court recruitment',
    'court process server',
    'court reader vacancy',
    'judiciary sarkari naukri',
    'high court clerk bharti',
    'district court peon vacancy',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/court-jobs',
  },
  openGraph: {
    title: 'Court Jobs 2026-27 — Judiciary Clerk, Stenographer, Peon Vacancy',
    description:
      'Find latest court recruitment 2026-27. High Court, District Court clerk, stenographer, peon & other judiciary vacancies with eligibility & apply links.',
    url: 'https://sarkarialert.online/court-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the different posts available in court recruitment?',
    answer:
      'Court recruitment offers various posts: Clerk/Junior Clerk (LDC/UDC), Stenographer (Hindi & English), Peon/Orderly, Process Server, Reader, Cashier, Translator, Personal Assistant (PA), System Officer/Computer Operator, Librarian, and Driver. Higher judiciary posts include Civil Judge (Junior Division), District Judge, and various administrative positions in High Courts and Supreme Court.',
  },
  {
    question: 'Court ki naukri ke liye kya yogyata chahiye aur salary kitni milti hai?',
    answer:
      'Court clerk ke liye graduation (any stream) chahiye with typing speed 30-40 WPM Hindi/English. Stenographer ke liye 80-100 WPM shorthand speed chahiye. Peon ke liye 8th/10th pass hona chahiye. Court clerk ki salary Rs 25,500-81,100 (Level 4) hoti hai, Stenographer ki Rs 35,400-1,12,400 (Level 6), aur Peon ki Rs 18,000-56,900 (Level 1) hoti hai. DA, HRA aur anya bhatte alag se milte hain.',
  },
  {
    question: 'How to apply for High Court recruitment 2026?',
    answer:
      'To apply for High Court recruitment: (1) Visit the official website of the respective High Court (e.g., allahabadhighcourt.in, mphc.gov.in, etc.), (2) Check the recruitment notification for eligibility, (3) Register and fill the online application form, (4) Upload photo, signature, and certificates, (5) Pay the application fee online. Each state High Court conducts its own recruitment. Keep checking official websites regularly for new notifications.',
  },
  {
    question: 'What is the selection process for court clerk and stenographer?',
    answer:
      'Court clerk selection process typically includes: (1) Written exam covering General Knowledge, Hindi, English, Maths, Reasoning, and Computer Knowledge, (2) Typing test (Hindi 25-30 WPM, English 30-40 WPM), (3) Document verification, (4) Interview (in some courts). For Stenographer: (1) Written exam, (2) Shorthand test (80-100 WPM), (3) Transcription test, (4) Document verification. Syllabus varies by state High Court.',
  },
  {
    question: 'Is there any age relaxation for court jobs?',
    answer:
      'Yes, age relaxation is provided as per government norms: OBC candidates get 3 years relaxation, SC/ST candidates get 5 years, PwD candidates get 10 years (General), 13 years (OBC), and 15 years (SC/ST). Ex-servicemen get relaxation as per rules. The general age limit for court clerk is 18-30 years, for peon 18-25 years, and for stenographer 18-35 years. Exact age limits vary by state and post.',
  },
  {
    question: 'Which courts offer the best salary and job security?',
    answer:
      'Supreme Court of India offers the highest salary among judiciary posts, followed by High Courts and then District Courts. However, all court jobs are government positions with excellent job security, pension benefits, and regular pay commission revisions. High Court posts offer better career growth opportunities. District Court posts are more numerous and have frequent vacancies. All court employees get benefits like medical, LTC, and government holidays.',
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
        name: 'Court Jobs',
        item: 'https://sarkarialert.online/court-jobs',
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

export default function CourtJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Court Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              कोर्ट भर्ती 2026 — न्यायालय क्लर्क, स्टेनोग्राफर, चपरासी
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>court vacancy 2026</strong> across Supreme Court, High Courts, and District Courts.
            Apply for <strong>Clerk</strong> (LDC/UDC), <strong>Stenographer</strong> (Hindi & English),{' '}
            <strong>Peon/Orderly</strong>, <strong>Process Server</strong>, <strong>Reader</strong>, and other
            judiciary posts. Court jobs offer salary of Rs 18,000 - 1,12,400 per month with government
            benefits like pension, medical, LTC, and excellent job security.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां सभी न्यायालयों की नवीनतम भर्ती अधिसूचनाएं देखें। सुप्रीम कोर्ट, हाई कोर्ट, जिला न्यायालय
            में क्लर्क, स्टेनोग्राफर, चपरासी और अन्य पदों के लिए पात्रता, वेतन और आवेदन की पूरी जानकारी।
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
          Frequently Asked Questions — Court Jobs
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
