import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Defence Government Jobs 2026-27 — Indian Army, Navy, Air Force Sarkari Naukri | SarkariAlert',
  description:
    'Defence government jobs 2026-27: Browse latest sarkari naukri for Indian Army, Navy, Air Force, DRDO, OFB, Coast Guard, CAPF. NDA, CDS, AFCAT, Agniveer recruitment & Agnipath scheme vacancies. Apply online with eligibility, salary & last date.',
  keywords: [
    'defence government jobs 2026',
    'indian army recruitment 2026',
    'navy sarkari naukri 2026',
    'air force vacancy 2026',
    'nda exam 2026',
    'cds exam 2026',
    'afcat recruitment 2026',
    'agniveer bharti 2026',
    'agnipath scheme jobs',
    'drdo defence recruitment',
    'coast guard vacancy',
    'capf recruitment 2026',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/defence-jobs',
  },
  openGraph: {
    title: 'Defence Government Jobs 2026-27 — Indian Army, Navy, Air Force Sarkari Naukri',
    description:
      'Find defence sarkari naukri 2026-27. Indian Army, Navy, Air Force, DRDO, Coast Guard, CAPF & Agnipath scheme vacancies. NDA, CDS, AFCAT recruitment.',
    url: 'https://sarkarialert.online/defence-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'Which defence government jobs are available in India?',
    answer:
      'Defence government jobs include Indian Army (Officer through NDA/CDS/SSC, JCO/OR through Agniveer/Rally), Indian Navy (Officer through NDA/CDS/SSC, Sailor through Agniveer), Indian Air Force (Officer through AFCAT/NDA/CDS, Airman through Agniveer), DRDO Scientist/Technical posts, Ordnance Factory Board (OFB) posts, Indian Coast Guard, CAPF (BSF, CRPF, CISF, ITBP, SSB), and Defence Civilian posts in various cantonment boards and military establishments.',
  },
  {
    question: 'Agniveer bharti kaise hoti hai aur Agnipath scheme kya hai?',
    answer:
      'Agnipath scheme ke tahat Indian Army, Navy aur Air Force mein Agniveer ke roop mein 4 saal ke liye bharti hoti hai. Army Agniveer ke liye Rally-based recruitment hoti hai jismein physical test, medical, aur written exam hota hai. Navy aur Air Force Agniveer ke liye online exam hota hai. 4 saal baad 25% Agniveers ko permanent service mein retain kiya jaata hai. Baaqi ko Seva Nidhi (Rs 11.71 lakh) milti hai.',
  },
  {
    question: 'What is NDA exam and who can apply?',
    answer:
      'NDA (National Defence Academy) exam is conducted by UPSC twice a year for recruitment into Indian Army, Navy, and Air Force as officers. Candidates who have passed 12th class (10+2) can apply. For Army wing, any stream is accepted; for Navy and Air Force, Physics and Maths in 12th is mandatory. Age limit is 16.5 to 19.5 years. Selection involves written exam (Maths + GAT) followed by SSB interview.',
  },
  {
    question: 'What is CDS exam for defence recruitment?',
    answer:
      'CDS (Combined Defence Services) exam is conducted by UPSC twice a year for graduates to join Indian Military Academy (IMA), Officers Training Academy (OTA), Indian Naval Academy (INA), and Air Force Academy (AFA). Candidates need graduation for IMA/INA, and any graduation for OTA. Age limit is 19-25 years (varies by academy). Selection involves written exam followed by SSB interview (5-day process).',
  },
  {
    question: 'How to join Indian Air Force through AFCAT?',
    answer:
      'AFCAT (Air Force Common Admission Test) is conducted twice a year by Indian Air Force for recruitment as officers in Flying, Technical, and Ground Duty branches. Candidates need graduation/B.Tech depending on branch. Flying branch requires 60% in graduation with Maths and Physics in 12th. Selection involves AFCAT exam, AFSB interview (similar to SSB), and medical examination. Officers get Pay Level 10 (Rs 56,100+).',
  },
  {
    question: 'What is the salary structure in Indian Armed Forces?',
    answer:
      'Indian Armed Forces salary starts at Pay Level 10 (Rs 56,100 basic) for Lieutenant/Sub Lieutenant/Flying Officer. Captain/Lt Commander/Flight Lieutenant gets Pay Level 10B (Rs 61,300). Major/Commander/Squadron Leader gets Pay Level 11 (Rs 67,700). Additionally, officers get Military Service Pay (MSP) of Rs 15,500, DA, transport allowance, ration, accommodation, canteen facilities, and free medical for self and family.',
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
        name: 'Defence Jobs',
        item: 'https://sarkarialert.online/defence-jobs',
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
    data = await getJobs({ category: 'defence', page: '1' });
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
      filterParams={{ category: 'defence' }}
    />
  );
}

export default function DefenceJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center shadow-lg shadow-green-600/20">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Defence Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              रक्षा सरकारी नौकरी 2026 — सेना, नौसेना, वायुसेना भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>defence sarkari naukri 2026</strong> across all branches of Indian Armed Forces and defence organizations.
            Candidates can apply for <strong>Indian Army</strong> (NDA, CDS, Agniveer), <strong>Indian Navy</strong> (Officer/Sailor entry),{' '}
            <strong>Indian Air Force</strong> (AFCAT, Agniveer Vayu), <strong>DRDO</strong> Scientist/Technical posts,{' '}
            <strong>OFB</strong> (Ordnance Factory Board), <strong>Indian Coast Guard</strong>, and <strong>CAPF</strong> (BSF, CRPF, CISF, ITBP, SSB) positions.
            The <strong>Agnipath scheme</strong> offers 4-year service opportunity for youth aged 17.5-21 years across all three services.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां रक्षा क्षेत्र के उम्मीदवारों के लिए सभी नवीनतम सरकारी नौकरियां देखें। भारतीय सेना, नौसेना,
            वायुसेना, DRDO, तटरक्षक बल और CAPF की भर्ती अधिसूचनाएं एक जगह। अग्निपथ योजना की ताजा जानकारी।
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
          Frequently Asked Questions — Defence Government Jobs
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
