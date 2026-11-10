import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Building, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'SBI PO 2026-27 — State Bank Probationary Officer | SarkariAlert',
  description:
    'SBI PO 2026-27 State Bank of India Probationary Officer recruitment. Eligibility (graduation, 21-30 age), exam pattern (Prelims + Mains + GD + Interview), salary Rs 52,000+, career growth & how SBI PO differs from IBPS PO.',
  keywords: [
    'sbi po 2026',
    'sbi po notification 2026',
    'sbi po recruitment',
    'sbi po eligibility',
    'sbi po salary',
    'sbi po exam pattern',
    'sbi probationary officer',
    'sbi po prelims 2026',
    'sbi po mains 2026',
    'sbi po interview',
    'sbi po career growth',
    'sbi po vs ibps po',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/sbi-po',
  },
  openGraph: {
    title: 'SBI PO 2026-27 — State Bank Probationary Officer',
    description:
      'SBI PO 2026-27 recruitment — eligibility, exam pattern, salary Rs 52,000+, career growth. State Bank of India Probationary Officer.',
    url: 'https://sarkarialert.online/sbi-po',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What is the eligibility for SBI PO 2026?',
    answer:
      'SBI PO 2026 requires a Bachelor\'s degree (Graduation) from a recognized university in any discipline. Age limit is 21-30 years for General category. Candidates must be Indian citizens. Final year students awaiting results can also apply. Computer literacy is essential. There is no minimum percentage requirement in graduation for General/OBC, but some states may have specific requirements.',
  },
  {
    question: 'What is the SBI PO exam pattern?',
    answer:
      'SBI PO selection has four stages: 1) Prelims — 100 questions in 60 minutes covering English (30Q), Quantitative Aptitude (35Q), Reasoning Ability (35Q). 2) Mains — 155 questions + Descriptive Paper covering Reasoning & Computer Aptitude (45Q), Data Analysis (35Q), General/Economy/Banking Awareness (40Q), English (35Q), plus Essay & Letter Writing. 3) Group Discussion (GD). 4) Personal Interview. Final merit = Mains (75%) + GD & Interview (25%).',
  },
  {
    question: 'SBI PO ki salary kitni hoti hai?',
    answer:
      'SBI PO ki starting basic pay Rs 36,000 hai (revised). DA, HRA, CCA, medical aur allowances milakar in-hand salary approximately Rs 52,000-58,000 per month hoti hai metro cities mein. SBI apne employees ko leased accommodation, medical insurance, LFC, pension (NPS), aur performance-linked incentives bhi deta hai. SBI ka pay scale IBPS PO se thoda better hota hai additional perks ki wajah se.',
  },
  {
    question: 'How is SBI PO different from IBPS PO?',
    answer:
      'Key differences: 1) SBI PO is recruited by SBI directly while IBPS PO is for 11 other public sector banks. 2) SBI PO has an additional Group Discussion round. 3) SBI PO salary is slightly higher due to additional perks and allowances. 4) SBI PO has a larger network (22,000+ branches) offering more posting locations. 5) SBI has its own exam calendar, separate from IBPS. 6) Career growth in SBI is considered faster with more opportunities at senior levels.',
  },
  {
    question: 'What is the career growth for SBI PO?',
    answer:
      'SBI PO career progression: Probationary Officer (2 years probation) -> Assistant Manager -> Deputy Manager -> Manager -> Chief Manager -> Assistant General Manager (AGM) -> Deputy General Manager (DGM) -> General Manager (GM) -> Chief General Manager (CGM) -> Deputy Managing Director (DMD) -> Managing Director. Promotion from PO to Manager typically takes 5-7 years. Senior positions offer salary of Rs 1,00,000-2,50,000+ per month.',
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
        name: 'SBI PO',
        item: 'https://sarkarialert.online/sbi-po',
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
    data = await getJobs({ category: 'banking', page: '1' });
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
      filterParams={{ category: 'banking' }}
    />
  );
}

export default function SbiPoPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Building className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              SBI PO 2026 — State Bank Probationary Officer
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              SBI PO 2026 — स्टेट बैंक प्रोबेशनरी ऑफिसर
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Get the latest <strong>SBI PO 2026</strong> recruitment updates for <strong>Probationary Officer</strong> posts
            in India&apos;s largest public sector bank. Graduation in any discipline with age <strong>21-30 years</strong> is required.
            Selection through <strong>Prelims + Mains + GD + Interview</strong> with starting salary of{' '}
            <strong>Rs 52,000+ per month</strong>. SBI offers excellent career growth from PO to Managing Director level.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            SBI PO 2026 — भारत के सबसे बड़े बैंक में प्रोबेशनरी ऑफिसर भर्ती। ग्रेजुएशन पास
            21-30 वर्ष के उम्मीदवार आवेदन करें। वेतन Rs 52,000+ प्रति माह।
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
          Frequently Asked Questions — SBI PO 2026
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
