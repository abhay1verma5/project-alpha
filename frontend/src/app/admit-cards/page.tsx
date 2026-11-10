import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getAdmitCards } from '@/lib/api';
import { JobList } from '@/components/JobList';
import { Pagination } from '@/components/Pagination';
import { JobFilters } from '@/components/JobFilters';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { CreditCard } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admit Card 2026-27 — Download Government Exam Admit Cards',
  description: 'Download latest admit cards 2026-27 for SSC, UPSC, Railway, Banking, CTET, State PSC exams. Direct links to official admit card download pages.',
  keywords: ['admit card 2026', 'admit card 2027', 'SSC admit card', 'UPSC admit card', 'Railway admit card', 'exam hall ticket', 'download admit card'],
  alternates: {
    canonical: 'https://sarkarialert.online/admit-cards',
  },
};

interface Props {
  searchParams: Promise<Record<string, string>>;
}

async function AdmitCardsContent({ searchParams }: Props) {
  const params = await searchParams;
  const apiParams: Record<string, string> = { page: params.page || '1' };
  if (params.category) apiParams.category = params.category;
  if (params.state) apiParams.state = params.state;
  if (params.qualification) apiParams.qualification = params.qualification;
  if (params.ordering) apiParams.ordering = params.ordering;

  let data;
  try {
    data = await getAdmitCards(apiParams);
  } catch {
    return (
      <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
        <CreditCard className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
        <p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">Unable to load admit cards</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Backend server is not available. Please try again later.</p>
      </div>
    );
  }

  const page = parseInt(params.page || '1', 10);
  const totalPages = Math.ceil(data.count / 20);

  const filterParams: Record<string, string> = {};
  if (params.category) filterParams.category = params.category;
  if (params.state) filterParams.state = params.state;
  if (params.qualification) filterParams.qualification = params.qualification;
  if (params.ordering) filterParams.ordering = params.ordering;

  return (
    <>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{data.count} admit cards available</p>
      <JobList jobs={data.results} emptyMessage="No admit cards available yet." />
      <Pagination currentPage={page} totalPages={totalPages} basePath="/admit-cards" queryParams={filterParams} />
    </>
  );
}

const admitCardFaqData = [
  {
    question: 'How to download admit card from SarkariAlert?',
    answer:
      'On SarkariAlert, find your exam admit card from the list, click on it to see details, and use the direct official link provided to download your admit card from the official website. We provide direct links to official admit card portals — no registration needed on our site.',
  },
  {
    question: 'Admit card kaise download karein?',
    answer:
      'SarkariAlert par apne exam ka admit card dhundhein, uspe click karein aur diye gaye official link se directly download karein. Aapko registration number aur date of birth ki zaroorat hogi. Hamesha official website se hi download karein.',
  },
  {
    question: 'What details are needed to download an admit card?',
    answer:
      'Usually you need your Registration Number / Roll Number and Date of Birth or Password. Some exams also require your Application Number. Keep your registration confirmation email/SMS handy before downloading.',
  },
  {
    question: 'What should I do if my admit card has errors?',
    answer:
      'If your admit card has incorrect details (name, photo, category, etc.), immediately contact the exam conducting authority through their official helpdesk or grievance portal. Do not appear for the exam with an incorrect admit card as it may cause issues during verification.',
  },
  {
    question: 'How many days before exam is the admit card released?',
    answer:
      'Most government exam admit cards are released 10-15 days before the exam date. SSC releases 7-10 days before, UPSC 3 weeks before, Railway 10 days before, and Banking exams 15 days before. Check SarkariAlert regularly so you don\'t miss the download window.',
  },
  {
    question: 'Admit card kho gaya to kya karein?',
    answer:
      'Agar admit card kho gaye to official website se dobara download karein — admit card exam tak available rehta hai. Agar website band ho gayi to exam center par ID proof (Aadhaar/PAN) lekar jaayein aur invigilator ko bataayein. Kuch exams mein duplicate admit card ka provision hota hai.',
  },
  {
    question: 'What should I carry along with admit card to the exam center?',
    answer:
      'Along with admit card, carry: 1) Valid photo ID (Aadhaar, PAN, Passport, Voter ID). 2) Passport-size photos (2-3 copies). 3) Stationery (pen, pencil if allowed). Do NOT carry mobile phones, calculators, smartwatches, or electronic devices. Reach the center 30-60 minutes before reporting time.',
  },
  {
    question: 'Can I appear for exam without admit card?',
    answer:
      'No, you cannot appear for government exams without your admit card. It is a mandatory document. If you forget to bring it, try downloading it on your phone and showing it at the center — some centers accept digital copies. Always keep a backup downloaded on your phone.',
  },
];

function AdmitCardFAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: admitCardFaqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default async function AdmitCardsPage(props: Props) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <AdmitCardFAQSchema />
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
          <CreditCard className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admit Cards</h1>
      </div>

      <Suspense fallback={null}>
        <JobFilters basePath="/admit-cards" hideContentType />
      </Suspense>

      <Suspense fallback={<JobListSkeleton />}>
        <AdmitCardsContent searchParams={props.searchParams} />
      </Suspense>

      <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions — Admit Cards
        </h2>
        <div className="space-y-4">
          {admitCardFaqData.map((faq, i) => (
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
