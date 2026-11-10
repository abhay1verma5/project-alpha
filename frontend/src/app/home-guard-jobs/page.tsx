import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Home Guard Bharti 2026-27 — होम गार्ड भर्ती & Vacancy | SarkariAlert',
  description:
    'Home Guard bharti 2026-27: Latest Home Guard recruitment & vacancy across all states. 10th pass eligibility, honorarium Rs 600-900/day, physical test details. State-wise vacancies for UP, Bihar, MP, Rajasthan & more.',
  keywords: [
    'home guard bharti 2026',
    'home guard vacancy',
    'home guard recruitment',
    'home guard salary',
    'home guard physical test',
    'UP home guard bharti',
    'Bihar home guard vacancy',
    'MP home guard recruitment',
    'Rajasthan home guard bharti',
    'home guard online form 2026',
    'home guard height weight',
    'home guard duty allowance',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/home-guard-jobs',
  },
  openGraph: {
    title: 'Home Guard Bharti 2026-27 — होम गार्ड भर्ती & Vacancy',
    description:
      'Find latest Home Guard bharti 2026-27. State-wise recruitment for UP, Bihar, MP, Rajasthan. 10th pass eligibility, physical test & honorarium details.',
    url: 'https://sarkarialert.online/home-guard-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What is the role of Home Guard and how is it different from Police?',
    answer:
      'Home Guard is a volunteer force that assists the police in maintaining law and order, traffic management, border security, and during natural disasters/emergencies. Unlike police, Home Guards are not permanent government employees — they are called for duty as needed and receive daily honorarium instead of monthly salary. They work under the Home Guard Act and are supervised by the District Commandant.',
  },
  {
    question: 'Home Guard ki salary (honorarium) kitni hoti hai aur duty kitne din ki hoti hai?',
    answer:
      'Home Guard ko monthly salary nahi milti, balki daily duty allowance (honorarium) milta hai. Ye state ke hisab se Rs 600-900 per day hota hai. UP mein Rs 750/day, Bihar mein Rs 600/day, MP mein Rs 700/day, Rajasthan mein Rs 800/day lagbhag milta hai. Duty usually month mein 15-25 din hoti hai. Kuch states mein festival duty ke liye extra allowance bhi milta hai.',
  },
  {
    question: 'What are the physical standards required for Home Guard recruitment?',
    answer:
      'Physical standards for Home Guard: Height — Male: 167 cm (general), 160 cm (SC/ST); Female: 152 cm (general), 147 cm (SC/ST). Chest — Male: 79 cm (unexpanded), 84 cm (expanded). Weight should be proportionate to height. Physical test includes 1.6 km running (in 6-7 minutes for males), long jump, high jump, and other exercises. Standards vary slightly by state.',
  },
  {
    question: 'What is the age limit and eligibility for Home Guard bharti?',
    answer:
      'Age limit for Home Guard is generally 20 to 47 years (some states 18-47 years). Educational qualification is 10th pass (some states accept 8th pass for rural/border areas). Candidates must be residents of the district they apply in. No criminal record. SC/ST candidates get 5 years age relaxation, OBC get 3 years. Physical and medical fitness is mandatory.',
  },
  {
    question: 'Which states have Home Guard vacancies in 2026?',
    answer:
      'Major Home Guard vacancies in 2026 are expected from Uttar Pradesh (largest Home Guard force with 50,000+ vacancies historically), Bihar, Madhya Pradesh, Rajasthan, Maharashtra, Karnataka, Gujarat, Haryana, and Uttarakhand. Each state conducts its own recruitment through the Directorate General of Home Guards. UP Home Guard bharti is the largest with recruitment in all 75 districts.',
  },
  {
    question: 'How to apply for Home Guard recruitment and what is the selection process?',
    answer:
      'To apply for Home Guard, visit the official Home Guard department website of your state when notification is released. Fill the online application form with documents (10th marksheet, domicile, caste certificate, Aadhaar, photos). Selection process includes: 1) Document verification, 2) Physical Measurement Test (height, chest, weight), 3) Physical Efficiency Test (running, long jump), 4) Written test (in some states), and 5) Medical examination.',
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
        name: 'Home Guard Jobs',
        item: 'https://sarkarialert.online/home-guard-jobs',
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

export default function HomeGuardJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-500 to-gray-700 flex items-center justify-center shadow-lg shadow-slate-500/20">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Home Guard Bharti 2026 — होम गार्ड भर्ती & Vacancy
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              होम गार्ड भर्ती 2026 — राज्यवार वैकेंसी और ऑनलाइन फॉर्म
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Home Guard bharti 2026</strong> across all states of India.
            Home Guard is a <strong>volunteer force</strong> that assists police in maintaining law and order, traffic control,
            and emergency situations. Eligibility is <strong>10th pass</strong> with age limit <strong>20-47 years</strong>.
            Selection includes <strong>physical measurement test</strong> (height, chest) and{' '}
            <strong>physical efficiency test</strong> (running, long jump). Daily honorarium ranges from{' '}
            <strong>Rs 600-900 per day</strong> depending on the state.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां सभी राज्यों की होम गार्ड भर्ती 2026 देखें। UP, बिहार, MP, राजस्थान, महाराष्ट्र सहित सभी राज्यों की
            वैकेंसी। 10वीं पास उम्मीदवार आवेदन करें। फिजिकल टेस्ट, हाइट-वेट और ऑनलाइन फॉर्म की पूरी जानकारी।
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
          Frequently Asked Questions — Home Guard Bharti
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
