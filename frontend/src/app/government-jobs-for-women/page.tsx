import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Government Jobs for Women 2026-27 — महिलाओं के लिए सरकारी नौकरी | SarkariAlert',
  description:
    'Government jobs for women 2026-27: Browse latest sarkari naukri for women candidates. Anganwadi worker, WCD posts, women police, CISF, bank jobs, teaching & women-only vacancies. Apply online with eligibility, salary & last date.',
  keywords: [
    'government jobs for women 2026',
    'mahilaon ke liye sarkari naukri',
    'women government jobs 2026',
    'anganwadi worker vacancy 2026',
    'wcd recruitment 2026',
    'women police constable bharti',
    'female government jobs',
    'mahila sarkari naukri 2026',
    'women only government vacancies',
    'cisf women constable',
    'asha worker vacancy 2026',
    'bank jobs for women',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/government-jobs-for-women',
  },
  openGraph: {
    title: 'Government Jobs for Women 2026-27 — महिलाओं के लिए सरकारी नौकरी',
    description:
      'Find government sarkari naukri for women 2026-27. Anganwadi, WCD, women police, CISF, bank jobs, teaching & women-only vacancies.',
    url: 'https://sarkarialert.online/government-jobs-for-women',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'Which government jobs are exclusively for women candidates?',
    answer:
      'Several government jobs are exclusively for women: Anganwadi Worker/Helper (WCD Department), ASHA Worker (Health Department), Women Police Constable/SI posts (reserved quota), ANM (Auxiliary Nurse Midwife), Mahila Supervisor, Lady Teacher posts in girls schools, Women Helpline executives, and posts under the Ministry of Women & Child Development. Many state governments also have women-only quotas in various departments.',
  },
  {
    question: 'Mahilaon ke liye sarkari naukri mein kya age relaxation milti hai?',
    answer:
      'Haan, mahilaon ko jyadatar sarkari naukri mein age relaxation milti hai. UPSC mein general category mahilaon ko koi extra relaxation nahi milti, lekin OBC mahilaon ko 6 saal aur SC/ST mahilaon ko 10 saal ki chhoot milti hai. SSC mein mahilaon ko koi alag relaxation nahi hai. Lekin kai rajya sarkaren mahilaon ko 3-5 saal ki extra age relaxation deti hain. State police mein bhi mahilaon ko age relaxation milti hai.',
  },
  {
    question: 'How to apply for Anganwadi Worker/Helper posts?',
    answer:
      'Anganwadi Worker/Helper posts are recruited by the Women & Child Development (WCD) Department of respective states. Applications are usually offline through district-level WCD offices or online through state WCD portals. Eligibility: 10th/12th pass, age 18-35 years, must be a resident of the same village/ward. Salary: Rs 8,000-12,000 per month (varies by state) with additional incentives.',
  },
  {
    question: 'Can women apply for police and defence jobs?',
    answer:
      'Yes, women can apply for police constable, SI, ASI posts in state police and central forces (CRPF, CISF, BSF, SSB, ITBP). Women also have reserved posts in Delhi Police, Railway Protection Force (RPF), and paramilitary forces. In defence, women can join through CDS (Combined Defence Services), NDA (from 2022), SSC (Short Service Commission), and military nursing service. Physical standards are relaxed for women candidates.',
  },
  {
    question: 'What are the best government jobs for women with good work-life balance?',
    answer:
      'Government jobs offering good work-life balance for women include Teaching (KVS, NVS, State Schools - regular hours + summer vacations), Bank PO/Clerk (IBPS/SBI), SSC CGL posts (office hours), Post Office jobs, LIC/GIC officers, State PSC administrative posts, and DRDO/ISRO Scientist posts. These jobs offer regular working hours, maternity leave (180 days), child care leave (730 days), and other women-friendly policies.',
  },
  {
    question: 'Which bank jobs are best for women candidates?',
    answer:
      'Bank jobs are excellent for women candidates. IBPS PO/Clerk, SBI PO/Clerk, RBI Grade B/Assistant, NABARD, SIDBI, and other bank exams are open for women. Banks offer 180 days maternity leave, child care leave, creche facilities, and women-only branches. Many banks have women reservation in recruitment. Salary ranges from Rs 35,000-60,000 per month with perks like housing, medical, and pension.',
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
        name: 'Government Jobs for Women',
        item: 'https://sarkarialert.online/government-jobs-for-women',
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

export default function GovernmentJobsForWomenPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Government Jobs for Women 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              महिलाओं के लिए सरकारी नौकरी 2026
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>government jobs for women 2026</strong> including women-only vacancies and posts where women can apply.
            Women candidates can explore exclusive posts like{' '}
            <strong>Anganwadi Worker/Helper</strong>, <strong>ASHA Worker</strong>, <strong>Women Police Constable/SI</strong>,{' '}
            <strong>ANM (Auxiliary Nurse Midwife)</strong>, <strong>WCD Department posts</strong>, <strong>Mahila Supervisor</strong>,{' '}
            and <strong>CISF/CRPF women constable</strong> vacancies.
            Women can also apply for all general government posts in <strong>Banking (IBPS/SBI)</strong>, <strong>SSC CGL/CHSL</strong>,{' '}
            <strong>Teaching (KVS/NVS)</strong>, <strong>Railway</strong>, and <strong>UPSC</strong> with age relaxation benefits.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां महिलाओं के लिए सभी नवीनतम सरकारी नौकरियां देखें। आंगनवाड़ी कार्यकर्ता, आशा वर्कर, महिला पुलिस,
            WCD विभाग, ANM, बैंक, शिक्षण और अन्य महिला-केंद्रित भर्ती अधिसूचनाएं एक जगह।
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
          Frequently Asked Questions — Government Jobs for Women
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
