import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Manipur Government Jobs 2026-27 — मणिपुर सरकारी नौकरी | SarkariAlert',
  description:
    'Manipur Government Jobs 2026-27: Latest Manipur sarkari naukri for MPSC, Manipur Police, Manipur Education Dept & more. Apply online for Manipur government vacancies.',
  keywords: [
    'manipur government jobs 2026', 'manipur sarkari naukri', 'mpsc manipur vacancy', 'manipur police bharti 2026',
    'manipur education department jobs', 'manipur health department recruitment', 'manipur psc exam 2026',
  ],
  alternates: { canonical: 'https://sarkarialert.online/manipur-government-jobs' },
  openGraph: {
    title: 'Manipur Government Jobs 2026-27 — মণিপুর সরকারি চাকরি',
    description: 'Find Manipur sarkari naukri 2026-27. MPSC, Manipur Police & more.',
    url: 'https://sarkarialert.online/manipur-government-jobs', type: 'website',
  },
};

const faqData = [
  { question: 'What are the major recruitment bodies in Manipur?', answer: 'MPSC (Manipur Public Service Commission) for MCS, MPS, and Group A/B posts. Manipur Police for constable, SI, and commando recruitment. Manipur Education Department for teacher recruitment. Various departments for direct Group C/D recruitment through district-level offices.' },
  { question: 'MPSC MCS exam ka pattern kya hai?', answer: 'MPSC Manipur Civil Services (MCS) exam mein Prelims (objective GS + CSAT), Mains (descriptive papers including Manipur-specific content), aur Interview hota hai. Posts: SDC, SDO, EAC, SP. MPSC exam UPSC pattern par based hai.' },
  { question: 'Manipur Police mein kaise apply karein?', answer: 'Manipur Police constable/SI ki bharti manipurpolice.gov.in par notification ke through hoti hai. Written Test + Physical Efficiency Test (PET) + Physical Standard Test + Medical + Document Verification. Inner Line Permit (ILP) holders get preference.' },
  { question: 'Manipur mein government jobs ke liye age limit kya hai?', answer: 'MPSC MCS: 21-38 years (General), +3 OBC, +5 SC/ST. Manipur Police Constable: 18-25 years. Teaching posts: 21-38 years. Most Manipur govt posts require Manipur domicile or Scheduled Tribe certificate for reserved posts.' },
  { question: 'Manipur mein teaching jobs ke liye kya qualification chahiye?', answer: 'Primary teacher: D.El.Ed/B.Ed + TET pass. TGT: B.Ed + graduation in subject. PGT: B.Ed + post-graduation. Manipur TET (MTET) conducted by Board of Secondary Education, Manipur. Knowledge of local language preferred.' },
];

function FAQSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqData.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}
function BreadcrumbSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sarkarialert.online/' },
    { '@type': 'ListItem', position: 2, name: 'Jobs', item: 'https://sarkarialert.online/jobs' },
    { '@type': 'ListItem', position: 3, name: 'Manipur Government Jobs', item: 'https://sarkarialert.online/manipur-government-jobs' },
  ] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}

async function JobsContent() {
  let data;
  try { data = await getJobs({ state: 'manipur', page: '1' }); } catch {
    return (<div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl"><Briefcase className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" /><p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">Unable to load jobs</p><p className="text-gray-500 dark:text-gray-400 text-sm">Backend server is not available. Please try again later.</p></div>);
  }
  return <JobsLoadMore initialJobs={data.results} totalCount={data.count} nextUrl={data.next} filterParams={{ state: 'manipur' }} />;
}

export default function ManipurGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema /><BreadcrumbSchema />
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20"><MapPin className="w-5 h-5 text-white" /></div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Manipur Government Jobs 2026</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">মণিপুর সরকারি চাকরি 2026 — MPSC, Manipur Police ভর্তি</p>
          </div>
        </div>
        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Manipur sarkari naukri 2026</strong> across all state government departments.
            Browse vacancies from <strong>MPSC</strong> (Manipur Civil Services), <strong>Manipur Police</strong> (Constable, SI),{' '}
            <strong>Education Department</strong> (Teacher recruitment), and other departments.
            Manipur offers unique opportunities including NE special category benefits and tribal area reservations.
          </p>
        </div>
      </div>
      <Suspense fallback={<JobListSkeleton />}><JobsContent /></Suspense>
      <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions — Manipur Government Jobs</h2>
        <div className="space-y-4">
          {faqData.map((faq, i) => (
            <details key={i} className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50">{faq.question}<span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span></summary>
              <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
