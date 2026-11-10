import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Mailbox } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Post Office Jobs 2026-27 — India Post GDS, Postman, MTS Vacancy | SarkariAlert',
  description:
    'Post office jobs 2026-27: Latest India Post GDS (Gramin Dak Sevak), Postman, Mail Guard, MTS, Postal Assistant & Sorting Assistant vacancy. Check eligibility, salary, selection process & apply online for postal department sarkari naukri.',
  keywords: [
    'post office recruitment 2026',
    'india post vacancy',
    'postman bharti',
    'postal MTS',
    'postal assistant',
    'mail guard vacancy',
    'GDS recruitment 2026',
    'gramin dak sevak bharti',
    'india post GDS',
    'sorting assistant vacancy',
    'postal department jobs',
    'post office sarkari naukri',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/postal-jobs',
  },
  openGraph: {
    title: 'Post Office Jobs 2026-27 — India Post GDS, Postman, MTS Vacancy',
    description:
      'Find latest post office recruitment 2026-27. India Post GDS, Postman, Mail Guard, MTS, Postal Assistant vacancies with eligibility & apply links.',
    url: 'https://sarkarialert.online/postal-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the different posts available in India Post recruitment?',
    answer:
      'India Post offers various posts: GDS (Gramin Dak Sevak) - Branch Postmaster, Dak Sevak, Assistant Branch Postmaster; Postman/Mail Guard; MTS (Multi Tasking Staff); Postal Assistant (PA); Sorting Assistant (SA); Postal Inspector; Superintendent of Post Offices; and various Group A/B officer posts through SSC and UPSC. GDS is the largest recruitment with thousands of vacancies across all states.',
  },
  {
    question: 'Post office ki naukri ke liye kya yogyata chahiye aur salary kitni milti hai?',
    answer:
      'GDS ke liye 10th pass chahiye with 10th marks ke basis par merit hoti hai. Postman ke liye 12th pass chahiye. Postal Assistant ke liye graduation chahiye. MTS ke liye 10th pass. GDS ki salary Rs 12,000-14,500/month (TRCA), Postman ki Rs 25,500-81,100 (Level 4), PA/SA ki Rs 25,500-81,100 (Level 4), aur MTS ki Rs 18,000-56,900 (Level 1) hoti hai. Regular employees ko DA, HRA, pension aur medical benefits milte hain.',
  },
  {
    question: 'How to apply for India Post GDS recruitment 2026?',
    answer:
      'To apply for India Post GDS: (1) Visit appost.in/gdsonline, (2) Register with mobile number and email, (3) Fill the application form with personal details, educational qualification, and preferred post offices, (4) Upload photo, signature, and 10th marksheet, (5) Submit application (no fee for GDS). Selection is purely based on 10th class marks merit - no written exam. You can apply for up to 5 post offices in your division.',
  },
  {
    question: 'What is the selection process for Postman and Postal Assistant?',
    answer:
      'Postman selection: (1) Written exam conducted by respective Postal Circle covering General Knowledge, Mathematics, English/Hindi, (2) Computer/Typing test, (3) Document verification. Postal Assistant (PA/SA) selection through SSC: (1) SSC CHSL Tier-I (CBT), (2) SSC CHSL Tier-II (CBT + Typing), (3) Document verification. Direct recruitment for PA/SA in some circles includes aptitude test + typing test. Both posts have reserved vacancies for various categories.',
  },
  {
    question: 'Can GDS employees become regular postal employees?',
    answer:
      'Yes, GDS employees can become regular postal employees through departmental exams. GDS can appear for Postman/Mail Guard recruitment (25% quota reserved for GDS), MTS recruitment, and PA/SA recruitment through departmental quota. After completing 3 years of service, GDS are eligible for these departmental exams. Regular postal employees get full government benefits including pension, medical, LTC, and higher pay scale.',
  },
  {
    question: 'What is the age limit for post office recruitment?',
    answer:
      'Age limits for post office recruitment: GDS - 18 to 40 years (relaxation: OBC 3 years, SC/ST 5 years, PwD 10 years). Postman - 18 to 27 years. MTS - 18 to 25 years. Postal Assistant - 18 to 27 years. Age relaxation for ex-servicemen is 3 years (General), 6 years (OBC), 8 years (SC/ST). Central government employees get age relaxation up to 40 years for departmental candidates.',
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
        name: 'Postal Jobs',
        item: 'https://sarkarialert.online/postal-jobs',
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

export default function PostalJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-500/20">
            <Mailbox className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Post Office Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              डाक विभाग भर्ती 2026 — पोस्टमैन, GDS, MTS
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>post office recruitment 2026</strong> across all postal circles in India.
            Apply for <strong>GDS (Gramin Dak Sevak)</strong>, <strong>Postman</strong>, <strong>Mail Guard</strong>,{' '}
            <strong>MTS</strong>, <strong>Postal Assistant (PA)</strong>, and <strong>Sorting Assistant (SA)</strong> posts.
            India Post is one of the largest employers with thousands of vacancies every year. Salary ranges from
            Rs 12,000 (GDS) to Rs 81,100 (PA/SA) with government benefits, pension, and job security.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां डाक विभाग (India Post) की सभी नवीनतम भर्ती अधिसूचनाएं देखें। GDS, पोस्टमैन, MTS,
            पोस्टल असिस्टेंट और अन्य पदों के लिए पात्रता, वेतन, चयन प्रक्रिया और ऑनलाइन आवेदन की जानकारी।
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
          Frequently Asked Questions — Post Office Jobs
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
