import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, HardHat } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Group D Government Jobs 2026-27 — MTS, Peon, Safai Karamchari | SarkariAlert',
  description:
    'Group D government jobs 2026-27: Latest MTS (Multi Tasking Staff), Peon, Safai Karamchari, Helper, Attendant & Chowkidar vacancy in railway, SSC, court & state government. Check eligibility, salary, syllabus & apply online for Group D sarkari naukri.',
  keywords: [
    'group d vacancy 2026',
    'MTS recruitment',
    'peon vacancy',
    'safai karamchari bharti',
    'group d railway',
    'SSC MTS',
    'government group d jobs',
    'chowkidar vacancy',
    'helper bharti 2026',
    'attendant government job',
    'group d sarkari naukri',
    'railway group d recruitment',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/group-d-jobs',
  },
  openGraph: {
    title: 'Group D Government Jobs 2026-27 — MTS, Peon, Safai Karamchari',
    description:
      'Find latest Group D recruitment 2026-27. SSC MTS, Railway Group D, Peon, Safai Karamchari, Helper vacancies with eligibility, salary & apply links.',
    url: 'https://sarkarialert.online/group-d-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the different Group D government jobs available?',
    answer:
      'Group D government jobs include: MTS (Multi Tasking Staff) through SSC in central government offices, Railway Group D (Track Maintainer, Helper, Pointsman, Gateman) through RRB, Peon/Orderly in courts and government offices, Safai Karamchari (sweeper) in various departments, Chowkidar/Watchman, Mali (gardener), Cook, Washer Man, and various attendant posts in hospitals, schools, and government buildings. State governments also recruit for similar Group D posts.',
  },
  {
    question: 'Group D sarkari naukri ke liye kya yogyata chahiye aur salary kitni milti hai?',
    answer:
      'Group D ke liye 10th pass (matric) hona zaroori hai. SSC MTS ke liye 10th pass chahiye. Railway Group D ke liye 10th pass + ITI (kuch posts mein) chahiye. Age limit 18-25 saal hai (relaxation applicable). Salary: SSC MTS ko Pay Level 1 (Rs 18,000-56,900 basic) milti hai. Railway Group D ko Level 1 (Rs 18,000-56,900) milti hai. DA, HRA mila kar gross salary Rs 22,000-28,000/month freshers ko milti hai.',
  },
  {
    question: 'What is the selection process for SSC MTS recruitment?',
    answer:
      'SSC MTS selection process: (1) Computer Based Test (CBT) - Session I with 40 questions on Numerical Aptitude and Mathematical Reasoning, and Session II with 50 questions on General Awareness and English/Hindi. Total time is 90 minutes. (2) Physical Efficiency Test (PET) / Physical Standard Test (PST) for Havaldar post only. (3) Document verification. The exam is of qualifying nature for MTS, and merit is prepared based on CBT marks. Negative marking of 1 mark for wrong answers.',
  },
  {
    question: 'What is the selection process for Railway Group D?',
    answer:
      'Railway Group D (RRB Level 1) selection: (1) Computer Based Test (CBT) with 100 questions covering Mathematics (25), General Intelligence & Reasoning (30), General Science (25), and General Awareness & Current Affairs (20) in 90 minutes, (2) Physical Efficiency Test (PET) - males: 35 kg weight lifting + 1000m run in 4 min 15 sec; females: 20 kg weight lifting + 1000m run in 5 min 40 sec, (3) Document verification and medical examination.',
  },
  {
    question: 'Is there any career growth in Group D government jobs?',
    answer:
      'Yes, Group D employees have career growth through departmental exams and promotions. SSC MTS (Level 1) can be promoted to LDC/UDC (Level 2-4), then to Assistant (Level 5-6) through LDCE (Limited Departmental Competitive Exam). Railway Group D can be promoted to Technician, Senior Technician, and further through departmental exams. After 10-15 years, Group D employees can reach Level 4-5 through MACP (Modified Assured Career Progression). Regular pay commission revisions also increase salary.',
  },
  {
    question: 'How to prepare for Group D government exams?',
    answer:
      'To prepare for Group D exams: (1) Mathematics - focus on basics like percentage, ratio, average, profit-loss, time-speed-distance, simple interest, (2) Reasoning - practice coding-decoding, series, analogy, classification, direction, blood relation, (3) General Science - study Physics, Chemistry, Biology basics from NCERT 6th-10th, (4) GK/Current Affairs - read newspapers, monthly magazines, government schemes, (5) Practice previous year papers of SSC MTS and RRB Group D, (6) Give mock tests regularly for time management. Most questions are of 10th level difficulty.',
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
        name: 'Group D Jobs',
        item: 'https://sarkarialert.online/group-d-jobs',
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
    data = await getJobs({ qualification: '10th', page: '1' });
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
      filterParams={{ qualification: '10th' }}
    />
  );
}

export default function GroupDJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-stone-500 to-stone-700 flex items-center justify-center shadow-lg shadow-stone-500/20">
            <HardHat className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Group D Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              ग्रुप डी सरकारी नौकरी 2026 — MTS, चपरासी भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-stone-50 dark:bg-stone-950/30 border border-stone-200 dark:border-stone-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Group D government jobs 2026</strong> across all central and state departments.
            Apply for <strong>SSC MTS (Multi Tasking Staff)</strong>, <strong>Railway Group D</strong> (Track Maintainer,
            Helper, Pointsman), <strong>Peon/Orderly</strong>, <strong>Safai Karamchari</strong>,{' '}
            <strong>Chowkidar</strong>, and other Level 1 posts. These jobs require only <strong>10th pass</strong>{' '}
            qualification with salary of Rs 18,000 - 56,900 (Level 1) plus DA, HRA, medical, and pension benefits.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां ग्रुप डी की सभी नवीनतम सरकारी नौकरी अधिसूचनाएं देखें। SSC MTS, रेलवे ग्रुप D, चपरासी,
            सफाई कर्मचारी, चौकीदार और अन्य पदों के लिए पात्रता, वेतन, सिलेबस और आवेदन की पूरी जानकारी।
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
          Frequently Asked Questions — Group D Government Jobs
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
