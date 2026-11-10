import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Plane } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Indian Air Force Recruitment 2026-27 — Agniveer Vayu, AFCAT | SarkariAlert',
  description:
    'Indian Air Force recruitment 2026-27: Latest Agniveer Vayu, AFCAT, Group X & Y vacancy notifications. IAF officer & airmen entry schemes with eligibility, age limit, physical standards, salary & online application for Air Force sarkari naukri.',
  keywords: [
    'air force recruitment 2026',
    'agniveer vayu',
    'AFCAT',
    'IAF group X Y',
    'air force rally',
    'indian air force vacancy',
    'air force agniveer 2026',
    'AFCAT 2026 notification',
    'IAF airmen recruitment',
    'air force officer entry',
    'air force technical trade',
    'air force sarkari naukri',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/air-force-jobs',
  },
  openGraph: {
    title: 'Indian Air Force Recruitment 2026-27 — Agniveer Vayu, AFCAT',
    description:
      'Find latest Indian Air Force recruitment 2026-27. Agniveer Vayu, AFCAT, Group X & Y, officer entries with eligibility, physical standards & apply links.',
    url: 'https://sarkarialert.online/air-force-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the entry schemes available in the Indian Air Force?',
    answer:
      'The Indian Air Force offers these entry schemes: Agniveer Vayu (4-year service for airmen in technical and non-technical trades), AFCAT (Air Force Common Admission Test for officers - Flying, Technical, and Ground Duty branches), NDA (National Defence Academy through UPSC for 12th pass), CDS (Combined Defence Services for graduates), and Meteorology Entry for post-graduates in Science/Maths.',
  },
  {
    question: 'Agniveer Vayu ke liye kya qualification chahiye aur salary kitni hai?',
    answer:
      'Agniveer Vayu ke liye Science stream (Group X) mein 12th pass with Physics, Maths (50% marks) chahiye. Other than Science (Group Y) mein 12th pass kisi bhi stream mein 50% marks chahiye. Age 17.5 se 23 saal honi chahiye. Salary pehle saal Rs 30,000/month se chauthe saal Rs 40,000/month tak badhti hai. 4 saal baad Seva Nidhi Rs 11.71 lakh milti hai.',
  },
  {
    question: 'What is AFCAT and how to become an Air Force Officer?',
    answer:
      'AFCAT (Air Force Common Admission Test) is conducted twice a year by IAF for officer recruitment. Eligibility: Graduation with 60% marks (for Ground Duty), B.E./B.Tech with 60% (for Technical branch), and graduation with 60% + valid CPSS score (for Flying branch). Selection: AFCAT written exam + AFSB Interview (5-day process including psychological tests, group tasks, and personal interview). Age limit is 20-26 years depending on the branch.',
  },
  {
    question: 'What is the physical fitness test for Air Force recruitment?',
    answer:
      'Air Force physical fitness test includes: 1.6 km run in 6 minutes 30 seconds, 10 push-ups, 10 sit-ups, 20 squats, and chin-ups. Height requirement: Minimum 152.5 cm for men. Eyesight standards are strict - 6/6 in both eyes for flying branch (no glasses), 6/6 & 6/18 correctable for ground duty. Candidates must have good hearing and no color blindness. Weight should be proportionate to height.',
  },
  {
    question: 'What is the salary structure in the Indian Air Force?',
    answer:
      'IAF salary by rank: Agniveer Vayu Rs 30,000-40,000/month, Flying Officer Rs 56,100/month + MSP Rs 15,500, Flight Lieutenant Rs 61,300/month + MSP, Squadron Leader Rs 69,400/month + MSP. Additional benefits include free accommodation, medical, transport allowance, high altitude allowance, flying allowance (for pilots), CSD canteen, pension, and NPS contributions.',
  },
  {
    question: 'Can women join the Indian Air Force?',
    answer:
      'Yes, women can join the Indian Air Force through AFCAT for all three branches - Flying, Technical, and Ground Duty (Administration and Logistics). Women are eligible for permanent commission in all branches. Through NDA, women can now join after 12th. Women officers serve as fighter pilots, helicopter pilots, transport pilots, and in all technical and administrative roles. The physical standards and eligibility criteria are the same as for male candidates with minor relaxations in physical fitness tests.',
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
        name: 'Air Force Jobs',
        item: 'https://sarkarialert.online/air-force-jobs',
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

export default function AirForceJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Plane className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Indian Air Force Recruitment 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              भारतीय वायुसेना भर्ती 2026 — अग्निवीर वायु, AFCAT
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Indian Air Force recruitment 2026</strong> notifications across all entry schemes.
            Apply for <strong>Agniveer Vayu</strong> (Group X Technical & Group Y Non-Technical), <strong>AFCAT</strong>{' '}
            (Flying, Technical & Ground Duty branches), <strong>NDA</strong>, <strong>CDS</strong>, and other officer
            entries. IAF personnel get salary of Rs 30,000 - 69,400+ per month with flying allowance, free
            accommodation, medical, and prestigious career opportunities.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां भारतीय वायुसेना की सभी नवीनतम भर्ती अधिसूचनाएं देखें। अग्निवीर वायु, AFCAT, NDA, CDS
            और अन्य प्रवेश योजनाओं के लिए पात्रता, आयु सीमा, शारीरिक मानदंड और आवेदन की पूरी जानकारी।
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
          Frequently Asked Questions — Indian Air Force Recruitment
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
