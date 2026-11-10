import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Footprints } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Walk-In Interview Government Jobs 2026-27 — Direct Recruitment | SarkariAlert',
  description:
    'Walk-in interview government jobs 2026-27: Find latest direct recruitment sarkari naukri without written exam. Walk-in bharti for teachers, doctors, engineers, clerks & more. No exam government jobs with eligibility, date & venue.',
  keywords: [
    'walk in interview government jobs 2026',
    'direct recruitment sarkari naukri',
    'no exam government jobs',
    'walk in bharti 2026',
    'government jobs without exam',
    'walk in interview today',
    'direct recruitment vacancy 2026',
    'bina pariksha sarkari naukri',
    'walk in jobs near me',
    'contract government jobs',
    'temporary government vacancy',
    'guest teacher walk in',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/walk-in-jobs',
  },
  openGraph: {
    title: 'Walk-In Interview Government Jobs 2026-27 — Direct Recruitment Without Exam',
    description:
      'Find walk-in interview sarkari naukri 2026-27. Direct recruitment without written exam for teachers, doctors, engineers & more.',
    url: 'https://sarkarialert.online/walk-in-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are walk-in interview government jobs?',
    answer:
      'Walk-in interview government jobs are positions where candidates can directly appear for an interview on a specified date and venue without any prior written exam. These are usually contractual, temporary, or guest positions in government departments, hospitals, universities, and research organizations. Candidates just need to bring their documents and appear at the interview venue.',
  },
  {
    question: 'Walk-in interview mein kya documents le jaane chahiye?',
    answer:
      'Walk-in interview mein yeh documents le jaayein: Updated resume/CV, original certificates aur photocopies (10th, 12th, graduation, post-graduation marksheets), Aadhaar Card, experience certificates (agar hai), caste certificate (OBC/SC/ST ke liye), passport-size photographs (4-5 copies), domicile certificate, aur notification mein maange gaye koi bhi specific documents. Sab originals aur self-attested photocopies dono le jaayein.',
  },
  {
    question: 'Which departments conduct walk-in interviews for government jobs?',
    answer:
      'Departments that frequently conduct walk-in interviews: Government hospitals (doctors, nurses, lab technicians), Universities and colleges (guest faculty, research assistants), DRDO, ISRO, BARC (project staff, JRF, SRF), State education departments (guest/contract teachers), Municipal corporations (various posts), District administration offices, PSUs for temporary/contract positions, and research institutes (CSIR, ICMR labs).',
  },
  {
    question: 'Are walk-in government jobs permanent?',
    answer:
      'Most walk-in interview government jobs are contractual or temporary (3 months to 1-2 years). However, some positions offer regularization after a certain period of service. Guest teacher positions may continue year after year. Some walk-in recruited staff are later absorbed as permanent employees based on performance and government policy. It is important to check the notification for the tenure and regularization policy.',
  },
  {
    question: 'What is the salary range for walk-in government jobs?',
    answer:
      'Salary for walk-in government jobs varies widely: Guest Teachers earn Rs 15,000-30,000/month, Contract Doctors earn Rs 50,000-1,00,000/month, JRF/SRF in research labs earn Rs 31,000-35,000/month, Contract Engineers earn Rs 25,000-50,000/month, Data Entry Operators earn Rs 12,000-20,000/month. These are consolidated pay without regular government allowances in most cases.',
  },
  {
    question: 'How to prepare for a walk-in interview in government sector?',
    answer:
      'To prepare for a walk-in government interview: 1) Read the notification carefully for eligibility and required documents. 2) Prepare a well-formatted resume highlighting relevant experience. 3) Revise your subject knowledge — technical questions are common. 4) Dress formally and reach the venue early. 5) Carry all original documents with self-attested photocopies. 6) Be prepared to explain gaps in career if any. 7) Practice common HR questions and subject-specific questions.',
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
        name: 'Walk-In Jobs',
        item: 'https://sarkarialert.online/walk-in-jobs',
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

export default function WalkInJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Footprints className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Walk-In Interview Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              वॉक-इन इंटरव्यू सरकारी नौकरी 2026 — बिना परीक्षा भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>walk-in interview government jobs 2026</strong> — direct recruitment without written exam.
            Government departments, <strong>hospitals</strong>, <strong>universities</strong>, <strong>research labs</strong> (DRDO, ISRO, CSIR),
            and <strong>PSUs</strong> regularly conduct walk-in interviews for positions like{' '}
            <strong>guest teachers</strong>, <strong>contract doctors</strong>, <strong>JRF/SRF</strong>,{' '}
            <strong>project engineers</strong>, and <strong>data entry operators</strong>.
            Just bring your documents and appear at the interview venue on the scheduled date.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां बिना परीक्षा वाली सरकारी नौकरियां देखें। वॉक-इन इंटरव्यू से सीधी भर्ती — सरकारी अस्पतालों,
            विश्वविद्यालयों, DRDO, ISRO, CSIR और अन्य विभागों में। बस अपने दस्तावेज़ लेकर इंटरव्यू में जाएं।
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
          Frequently Asked Questions — Walk-In Interview Government Jobs
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
