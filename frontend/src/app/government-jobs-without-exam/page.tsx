import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, FileCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Government Jobs Without Exam 2026-27 — बिना परीक्षा सरकारी नौकरी | SarkariAlert',
  description:
    'Government jobs without exam 2026-27: Browse latest sarkari naukri without written test. GDS, Anganwadi, ASHA worker, sports quota, compassionate appointment, ex-servicemen & direct recruitment vacancies. Apply online with eligibility, salary & last date.',
  keywords: [
    'government jobs without exam 2026',
    'bina pariksha sarkari naukri',
    'gds recruitment without exam',
    'anganwadi worker vacancy 2026',
    'asha worker bharti 2026',
    'sports quota government jobs',
    'compassionate appointment govt jobs',
    'direct recruitment sarkari naukri',
    'without exam sarkari naukri',
    'bina exam government jobs',
    'ex servicemen quota jobs',
    'interview based government jobs',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/government-jobs-without-exam',
  },
  openGraph: {
    title: 'Government Jobs Without Exam 2026-27 — बिना परीक्षा सरकारी नौकरी',
    description:
      'Find government sarkari naukri without exam 2026-27. GDS, Anganwadi, ASHA worker, sports quota, compassionate appointment & direct recruitment vacancies.',
    url: 'https://sarkarialert.online/government-jobs-without-exam',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'Which government jobs do not require a written exam?',
    answer:
      'Several government jobs do not require written exams: GDS (Gramin Dak Sevak) selected on merit of 10th marks, Anganwadi Worker/Helper (interview-based), ASHA Worker (selection by local health committee), Sports Quota recruitment (based on sports achievements), Compassionate Appointment (for dependents of deceased government employees), Ex-Servicemen quota posts, and some contractual government positions. Selection is typically based on merit, interview, or document verification.',
  },
  {
    question: 'Bina pariksha sarkari naukri kaise milti hai?',
    answer:
      'Bina pariksha sarkari naukri paane ke kai tarike hain: GDS (Gramin Dak Sevak) mein 10th ke marks ke basis par selection hota hai, Anganwadi Worker/Helper mein interview se selection hota hai, ASHA Worker mein local health committee select karti hai, Sports Quota mein khel uplabdhiyon ke basis par, Compassionate Appointment mein mrit sarkari karmchari ke aashrit ko naukri milti hai, aur Ex-Servicemen Quota mein purv sainikon ko direct bharti ki jaati hai.',
  },
  {
    question: 'How does GDS (Gramin Dak Sevak) recruitment work without exam?',
    answer:
      'GDS (Gramin Dak Sevak) recruitment is purely merit-based on 10th class marks. No written exam is conducted. Apply online at indiapostgdsonline.gov.in when notification is released. Selection is based on merit list prepared from 10th class percentage. Auto-generated merit list is prepared with marks normalization. Age: 18-40 years. Monthly salary: Rs 12,000-14,500 (TRCA). GDS is one of the largest recruitment drives without written exam.',
  },
  {
    question: 'What is compassionate appointment in government jobs?',
    answer:
      'Compassionate appointment is a provision where dependents (spouse/children) of a deceased or permanently incapacitated government employee can get a government job without appearing for competitive exams. The appointment is made on Group C/D posts in the same department where the deceased employee worked. Eligible family members must apply within 5 years of death/incapacitation. Each department has a compassionate appointment cell that processes applications.',
  },
  {
    question: 'How does sports quota work for government jobs?',
    answer:
      'Sports quota recruitment allows sportspersons with recognized achievements to get government jobs based on their sports performance. Eligibility: Medal winners in Olympics, Asian Games, Commonwealth Games, National Games, or University/State-level tournaments recognized by Sports Authority of India. Organizations like Railways, Banks, CRPF, BSF, Army, and central/state government departments recruit through sports quota. Selection is based on sports certificates + trial/interview.',
  },
  {
    question: 'What is the salary for Anganwadi Worker and ASHA Worker?',
    answer:
      'Anganwadi Worker salary varies by state: Rs 8,000-12,000 per month (honorary/incentive-based). Anganwadi Helper gets Rs 4,000-6,000 per month. ASHA Worker receives incentive-based payment of Rs 6,000-10,000 per month depending on tasks completed (immunization drives, institutional deliveries, health surveys). Both positions also receive additional incentives for specific government programs and health campaigns.',
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
        name: 'Government Jobs Without Exam',
        item: 'https://sarkarialert.online/government-jobs-without-exam',
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
    data = await getJobs({ page: '1' });
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
      filterParams={{}}
    />
  );
}

export default function GovernmentJobsWithoutExamPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
            <FileCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Government Jobs Without Exam 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              बिना परीक्षा सरकारी नौकरी 2026
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>government jobs without exam 2026</strong> where selection is based on merit, interview, or document verification instead of written tests.
            These include <strong>GDS (Gramin Dak Sevak)</strong> selected on 10th class merit,{' '}
            <strong>Anganwadi Worker/Helper</strong> through interview,{' '}
            <strong>ASHA Worker</strong> through local health committee selection,{' '}
            <strong>Sports Quota</strong> based on sports achievements,{' '}
            <strong>Ex-Servicemen Quota</strong> for retired defence personnel,{' '}
            and <strong>Compassionate Appointment</strong> for dependents of deceased government employees.
            These posts offer a direct path to government employment without competitive written examinations.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां बिना परीक्षा के मिलने वाली सभी नवीनतम सरकारी नौकरियां देखें। GDS, आंगनवाड़ी, आशा वर्कर,
            खेल कोटा, अनुकंपा नियुक्ति और पूर्व सैनिक कोटा की भर्ती अधिसूचनाएं एक जगह।
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
          Frequently Asked Questions — Government Jobs Without Exam
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
