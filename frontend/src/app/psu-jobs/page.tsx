import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Factory } from 'lucide-react';

export const metadata: Metadata = {
  title: 'PSU Jobs 2026-27 — BHEL, NTPC, ONGC, IOCL Government Company | SarkariAlert',
  description:
    'PSU jobs 2026-27: Latest Maharatna, Navratna & Miniratna company recruitment. BHEL, NTPC, ONGC, IOCL, GAIL, SAIL, PGCIL, BPCL, HPCL vacancy through GATE & direct recruitment. Check eligibility, salary, selection process & apply online.',
  keywords: [
    'PSU recruitment 2026',
    'BHEL vacancy',
    'NTPC recruitment',
    'ONGC jobs',
    'IOCL vacancy',
    'PSU through GATE',
    'maharatna company jobs',
    'GAIL recruitment 2026',
    'SAIL vacancy',
    'PGCIL recruitment',
    'navratna PSU jobs',
    'PSU sarkari naukri',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/psu-jobs',
  },
  openGraph: {
    title: 'PSU Jobs 2026-27 — BHEL, NTPC, ONGC, IOCL Government Company',
    description:
      'Find latest PSU recruitment 2026-27. Maharatna, Navratna company vacancies at BHEL, NTPC, ONGC, IOCL, GAIL, SAIL through GATE & direct recruitment.',
    url: 'https://sarkarialert.online/psu-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the top PSU companies that recruit through GATE?',
    answer:
      'Major PSUs recruiting through GATE include: Maharatna companies - BHEL, NTPC, ONGC, IOCL, SAIL, GAIL, Coal India, PGCIL, BPCL, HPCL, Oil India. Navratna companies - BEL, NBCC, MDL, NMDC, NLC, NALCO, RITES, IRCON, EIL. Miniratna companies - MECL, PDIL, WAPCOS, NHPC, SJVN, THDC. Each PSU has its own GATE score cutoff and recruitment process.',
  },
  {
    question: 'PSU mein GATE ke through job kaise milti hai aur salary kitni hoti hai?',
    answer:
      'PSU mein GATE ke through job ke liye pehle GATE exam qualify karein acche score ke saath. Phir individual PSU websites par notification aane par apply karein. Selection GATE score + interview (kuch PSU mein) ke basis par hota hai. PSU Engineer/Officer ki starting salary Rs 40,000-60,000/month hoti hai (E1/E2 grade). CTC Rs 10-15 lakh/year hota hai with perks jaise HRA, medical, LTA, PF, pension, aur bonus.',
  },
  {
    question: 'Can non-engineering graduates apply for PSU jobs?',
    answer:
      'Yes, PSUs also recruit non-engineering graduates for various posts: HR/Personnel (MBA-HR), Finance (CA/ICWA/MBA-Finance), Law (LLB), Marketing (MBA-Marketing), IT (MCA/B.Tech CS), and administrative positions. Companies like ONGC, NTPC, IOCL, and Coal India recruit through their own exams or GATE for technical posts and separate exams for non-technical posts. Some PSUs also recruit through UGC-NET for research positions.',
  },
  {
    question: 'What is the difference between Maharatna, Navratna, and Miniratna PSUs?',
    answer:
      'Maharatna PSUs (12 companies) have the highest autonomy with annual turnover above Rs 25,000 crore - includes ONGC, NTPC, IOCL, Coal India, SAIL, BHEL, GAIL, BPCL, HPCL, PGCIL, Oil India, and NHPC. Navratna PSUs (14 companies) have medium autonomy with strong financials - includes BEL, NALCO, NLC, NBCC, RITES, etc. Miniratna PSUs (72+ companies) are profitable CPSEs with limited autonomy. Maharatna companies generally offer the highest salaries and best perks.',
  },
  {
    question: 'What is the selection process for PSU recruitment through GATE?',
    answer:
      'PSU recruitment through GATE follows this process: (1) Qualify GATE exam with a valid score, (2) Apply on respective PSU website when notification is released, (3) Shortlisting based on GATE score (cutoff varies by company and category), (4) Group Discussion (in some PSUs like IOCL, GAIL), (5) Personal Interview, (6) Document verification and medical examination. Some PSUs like BHEL, PGCIL have only GATE score + interview, while others like ONGC have GATE score + GD + interview.',
  },
  {
    question: 'Which PSU offers the highest salary package for freshers?',
    answer:
      'Among PSUs, ONGC and Oil India offer the highest starting CTC of Rs 16-18 lakh/year for E1 grade officers. NTPC, PGCIL, and NHPC offer Rs 12-15 lakh/year. IOCL and BPCL offer Rs 12-14 lakh/year. BHEL and SAIL offer Rs 10-12 lakh/year. Besides basic pay, PSU perks include subsidized housing/HRA (30% of basic), medical reimbursement, LTC, performance bonus (15-30% of basic), PF (12%), gratuity, and superannuation benefits. PSU employees also get DA revisions as per government pay commission.',
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
        name: 'PSU Jobs',
        item: 'https://sarkarialert.online/psu-jobs',
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
    data = await getJobs({ qualification: 'engineering', page: '1' });
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
      filterParams={{ qualification: 'engineering' }}
    />
  );
}

export default function PsuJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Factory className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              PSU Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              PSU भर्ती 2026 — सरकारी कंपनी वैकेंसी
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>PSU recruitment 2026</strong> across Maharatna, Navratna, and Miniratna companies.
            Apply for engineering and management positions at <strong>BHEL</strong>, <strong>NTPC</strong>,{' '}
            <strong>ONGC</strong>, <strong>IOCL</strong>, <strong>GAIL</strong>, <strong>SAIL</strong>,{' '}
            <strong>PGCIL</strong>, <strong>BPCL</strong>, <strong>HPCL</strong>, and <strong>Coal India</strong> through{' '}
            <strong>GATE</strong> score and direct recruitment. PSU jobs offer CTC of Rs 10-18 lakh/year with
            perks like HRA, medical, LTA, performance bonus, pension, and job security.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां सभी सरकारी कंपनियों (PSU) की नवीनतम भर्ती अधिसूचनाएं देखें। GATE के माध्यम से महारत्न,
            नवरत्न और मिनीरत्न कंपनियों में इंजीनियर, मैनेजमेंट और अन्य पदों के लिए आवेदन करें।
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
          Frequently Asked Questions — PSU Jobs
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
