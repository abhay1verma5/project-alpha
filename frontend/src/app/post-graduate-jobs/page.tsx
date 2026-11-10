import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Post Graduate Government Jobs 2026-27 — PG, MA, M.Sc, M.Com Sarkari Naukri | SarkariAlert',
  description:
    'Post graduate government jobs 2026-27: Browse latest sarkari naukri for PG degree holders. UGC NET, teaching, UPSC, research, scientist posts for MA, M.Sc, M.Com, MBA candidates. Apply online with eligibility, salary & last date.',
  keywords: [
    'post graduate government jobs 2026',
    'pg sarkari naukri 2026',
    'ma government jobs',
    'msc government jobs 2026',
    'mcom government jobs',
    'ugc net jobs 2026',
    'post graduate sarkari naukri',
    'teaching jobs for pg',
    'upsc jobs for post graduates',
    'research scientist government jobs',
    'phd sarkari naukri',
    'mba government jobs 2026',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/post-graduate-jobs',
  },
  openGraph: {
    title: 'Post Graduate Government Jobs 2026-27 — PG, MA, M.Sc, M.Com Sarkari Naukri',
    description:
      'Find post graduate sarkari naukri 2026-27. UGC NET, teaching, UPSC, research, scientist & more vacancies for MA, M.Sc, M.Com, MBA candidates.',
    url: 'https://sarkarialert.online/post-graduate-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'Which government jobs are available for post graduate candidates?',
    answer:
      'Post graduate candidates can apply for UGC NET qualified Assistant Professor posts, PGT (Post Graduate Teacher) at KVS/NVS/State Schools, UPSC Civil Services, State PSC posts, CSIR-UGC NET for JRF/Research, Scientist posts at DRDO/ISRO/BARC, University teaching positions, NABARD/RBI Grade B officers, and administrative posts in central/state government.',
  },
  {
    question: 'Post graduation ke baad kaun si sarkari naukri mil sakti hai?',
    answer:
      'Post graduation ke baad aap UGC NET paas karke Assistant Professor ban sakte hain, PGT Teacher (KVS, NVS, State Schools), UPSC Civil Services, State PCS, CSIR-UGC NET JRF ke through research, DRDO/ISRO/BARC mein Scientist, University Lecturer, RBI Grade B, NABARD, aur kai aur sarkari naukri ke liye apply kar sakte hain. PG degree aapko higher pay level ki jobs ke liye eligible banati hai.',
  },
  {
    question: 'How to become Assistant Professor through UGC NET?',
    answer:
      'To become Assistant Professor, you need to qualify UGC NET (National Eligibility Test) conducted by NTA. You need a post-graduation degree with minimum 55% marks (50% for SC/ST/OBC/PwD). After qualifying NET, apply for Assistant Professor posts at central/state universities, government colleges, and deemed universities. Pay Level 10 (Rs 57,700 basic) with Academic Grade Pay.',
  },
  {
    question: 'What is the salary for PGT teachers in government schools?',
    answer:
      'PGT (Post Graduate Teacher) in KVS/NVS gets Pay Level 8 (Rs 47,600 - Rs 1,51,100 basic pay). With allowances (DA, HRA, etc.), the gross salary is approximately Rs 65,000 - Rs 75,000 per month for freshers. State government PGT teachers also get similar pay scales. KVS/NVS additionally provide free accommodation, transport allowance, and other benefits.',
  },
  {
    question: 'Can post graduates apply for UPSC Civil Services?',
    answer:
      'Yes, post graduates can apply for UPSC Civil Services exam. While graduation is the minimum requirement, having a post-graduate degree gives you an advantage in choosing optional subjects and interview. Many PG holders choose their post-graduation subject as optional (History, Geography, Political Science, Public Administration, etc.) which gives them deeper understanding and better scores.',
  },
  {
    question: 'What research jobs are available for M.Sc and PhD holders?',
    answer:
      'M.Sc and PhD holders can apply for Scientist positions at DRDO (Scientist-B), ISRO (Scientist/Engineer SC), BARC (Scientific Officer), CSIR labs (Scientist/Senior Scientist), ICAR research institutes, DBT-funded research positions, DST-INSPIRE fellowships, ICMR research positions, and Pool Officer Scheme under CSIR. These posts offer Pay Level 10-12 with research allowances.',
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
        name: 'Post Graduate Jobs',
        item: 'https://sarkarialert.online/post-graduate-jobs',
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
    data = await getJobs({ qualification: 'post graduate', page: '1' });
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
      filterParams={{ qualification: 'post graduate' }}
    />
  );
}

export default function PostGraduateJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-600 flex items-center justify-center shadow-lg shadow-fuchsia-500/20">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Post Graduate Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              पोस्ट ग्रेजुएट सरकारी नौकरी 2026 — MA, M.Sc, M.Com भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-fuchsia-50 dark:bg-fuchsia-950/30 border border-fuchsia-200 dark:border-fuchsia-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>post graduate sarkari naukri 2026</strong> across all major government departments, universities, and research organizations.
            Candidates with <strong>MA</strong>, <strong>M.Sc</strong>, <strong>M.Com</strong>, <strong>MBA</strong>,{' '}
            <strong>M.Tech</strong>, or any post-graduate degree can apply for{' '}
            <strong>UGC NET Assistant Professor</strong>, <strong>PGT Teacher (KVS/NVS)</strong>, <strong>UPSC Civil Services</strong>,{' '}
            <strong>Scientist posts (DRDO/ISRO/BARC)</strong>, <strong>Research positions (CSIR/ICAR)</strong>, and administrative posts.
            These jobs offer higher pay scales starting from Pay Level 8-10 (Rs 47,600 - 57,700+) with academic/research allowances.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां पोस्ट ग्रेजुएट उम्मीदवारों के लिए सभी नवीनतम सरकारी नौकरियां देखें। UGC NET, KVS/NVS PGT,
            UPSC, DRDO, ISRO, CSIR और विश्वविद्यालय शिक्षण पदों की भर्ती अधिसूचनाएं एक जगह।
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
          Frequently Asked Questions — Post Graduate Government Jobs
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
