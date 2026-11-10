import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Anganwadi Bharti 2026-27 — Supervisor, Worker, Helper Vacancy | SarkariAlert',
  description:
    'Anganwadi bharti 2026-27: Latest Anganwadi supervisor, worker & helper vacancy across all states. ICDS recruitment for 8th, 10th pass & graduate candidates. Apply online with eligibility, salary (Rs 4,000-20,000) & last date details.',
  keywords: [
    'anganwadi bharti 2026',
    'anganwadi worker vacancy',
    'anganwadi supervisor recruitment',
    'mini anganwadi kendra',
    'ICDS bharti',
    'anganwadi helper vacancy 2026',
    'anganwadi salary',
    'anganwadi online form',
    'WCD recruitment 2026',
    'anganwadi sevika bharti',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/anganwadi-jobs',
  },
  openGraph: {
    title: 'Anganwadi Bharti 2026-27 — Supervisor, Worker, Helper Vacancy',
    description:
      'Find latest Anganwadi bharti 2026-27. Supervisor, worker & helper vacancy under ICDS across all states. 8th/10th pass & graduate eligibility.',
    url: 'https://sarkarialert.online/anganwadi-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What is the eligibility for Anganwadi worker, helper and supervisor posts?',
    answer:
      'Anganwadi Helper requires 8th pass, Anganwadi Worker requires 10th pass (some states accept 8th pass), and Anganwadi Supervisor requires graduation from a recognized university. Candidates must be married women (in most states) and residents of the same village/ward where the Anganwadi Kendra is located.',
  },
  {
    question: 'Anganwadi mein salary kitni milti hai aur kya ye permanent naukri hai?',
    answer:
      'Anganwadi Helper ko Rs 4,000-6,000 per month, Worker ko Rs 6,000-10,000 per month, aur Supervisor ko Rs 15,000-20,000 per month milta hai (state ke hisab se alag hota hai). Ye honorary post hoti hai, permanent sarkari naukri nahi hai, lekin long-term service milti hai aur kuch states mein incentives bhi diye jaate hain.',
  },
  {
    question: 'What is the age limit for Anganwadi recruitment?',
    answer:
      'The age limit for Anganwadi recruitment is generally 18 to 40 years. Some states allow age relaxation of 5 years for SC/ST candidates and 3 years for OBC candidates. The exact age criteria varies from state to state as per their WCD department guidelines.',
  },
  {
    question: 'What is the selection process for Anganwadi posts?',
    answer:
      'Anganwadi selection is mostly merit-based without any written exam. For Helper and Worker posts, selection is based on educational qualification marks. For Supervisor posts, some states conduct a written exam followed by interview. Document verification and preference is given to local residents of the area.',
  },
  {
    question: 'How to apply for Anganwadi vacancy 2026?',
    answer:
      'To apply for Anganwadi vacancy, candidates need to contact the District CDPO (Child Development Project Officer) or WCD (Women and Child Development) office. Many states now accept online applications through their official WCD department website. Applications are submitted with educational certificates, domicile, caste certificate, marriage certificate, and passport-size photos.',
  },
  {
    question: 'Which states have the most Anganwadi vacancies in 2026?',
    answer:
      'Major Anganwadi vacancies in 2026 are from Uttar Pradesh, Bihar, Madhya Pradesh, Rajasthan, Maharashtra, Karnataka, Tamil Nadu, West Bengal, and Odisha. UP alone has lakhs of Anganwadi Kendras. Each state releases its own notification through the respective WCD department.',
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
        name: 'Anganwadi Jobs',
        item: 'https://sarkarialert.online/anganwadi-jobs',
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
    data = await getJobs({ qualification: '8th', page: '1' });
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
      filterParams={{ qualification: '8th' }}
    />
  );
}

export default function AnganwadiJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Anganwadi Bharti 2026 — Supervisor, Worker, Helper Vacancy
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              आंगनवाड़ी भर्ती 2026 — सुपरवाइजर, वर्कर, हेल्पर वैकेंसी
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Anganwadi bharti 2026</strong> across all states under the ICDS (Integrated Child Development Services) scheme.
            Vacancies available for <strong>Anganwadi Supervisor</strong>, <strong>Anganwadi Worker (Sevika)</strong>, and{' '}
            <strong>Anganwadi Helper (Sahayika)</strong> posts. Eligibility ranges from <strong>8th pass</strong> for Helper,{' '}
            <strong>10th pass</strong> for Worker, to <strong>Graduate</strong> for Supervisor. Salary ranges from Rs 4,000 to Rs 20,000
            depending on post and state. Selection is merit-based through WCD department.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां सभी राज्यों की आंगनवाड़ी भर्ती 2026 देखें। सुपरवाइजर, सेविका और सहायिका पदों पर वैकेंसी। 8वीं, 10वीं पास और
            ग्रेजुएट उम्मीदवार आवेदन कर सकते हैं। जिला CDPO कार्यालय या WCD विभाग की वेबसाइट पर ऑनलाइन फॉर्म भरें।
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
          Frequently Asked Questions — Anganwadi Bharti
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
