import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { AGE_LIMIT_DATA, getAgeLimitBySlug } from '../age-limit-data';
import { AgeLimitDetail } from '../AgeLimitDetail';

export function generateStaticParams() {
  return AGE_LIMIT_DATA.map((e) => ({ exam: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ exam: string }> }): Promise<Metadata> {
  const { exam: slug } = await params;
  const exam = getAgeLimitBySlug(slug);
  if (!exam) return { title: 'Exam Not Found' };
  return {
    title: `${exam.name} Age Limit 2026-27 — Category-wise Relaxation & Eligibility | SarkariAlert`,
    description: `${exam.name} age limit: ${exam.minAge}-${exam.maxAge} years (General). OBC +${exam.relaxation.obc}, SC/ST +${exam.relaxation.sc_st} years relaxation. Qualification: ${exam.qualification}.`,
    alternates: { canonical: `https://sarkarialert.online/age-limit/${slug}` },
  };
}

export default async function AgeLimitExamPage({ params }: { params: Promise<{ exam: string }> }) {
  const { exam: slug } = await params;
  const exam = getAgeLimitBySlug(slug);
  if (!exam) notFound();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the age limit for ${exam.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The age limit for ${exam.name} is ${exam.minAge}-${exam.maxAge} years for General category. OBC candidates get +${exam.relaxation.obc} years, SC/ST get +${exam.relaxation.sc_st} years relaxation.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the qualification required for ${exam.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The minimum qualification for ${exam.name} is ${exam.qualification}. The exam is conducted by ${exam.organization}.`,
        },
      },
      {
        '@type': 'Question',
        name: `How many attempts are allowed in ${exam.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${exam.name} allows ${exam.attempts.gen === 'unlimited' ? 'unlimited' : exam.attempts.gen} attempts for General, ${exam.attempts.obc === 'unlimited' ? 'unlimited' : exam.attempts.obc} for OBC, and ${exam.attempts.sc_st === 'unlimited' ? 'unlimited' : exam.attempts.sc_st} for SC/ST candidates.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the age relaxation for PwD in ${exam.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `PwD candidates in ${exam.name} get ${exam.relaxation.pwdGen} years relaxation for General-PwD, ${exam.relaxation.pwdObc} years for OBC-PwD, and ${exam.relaxation.pwdScSt} years for SC/ST-PwD category.`,
        },
      },
      {
        '@type': 'Question',
        name: `${exam.name} ke liye age limit kya hai?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${exam.name} ke liye General category mein age limit ${exam.minAge}-${exam.maxAge} saal hai. OBC ko +${exam.relaxation.obc} saal, SC/ST ko +${exam.relaxation.sc_st} saal ki chhoot milti hai. Age cutoff date: ${exam.cutoffDate}. Qualification: ${exam.qualification}.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the age cutoff date for ${exam.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The age cutoff date for ${exam.name} is ${exam.cutoffDate}. Your age on this specific date determines your eligibility, not the exam date or application date. Make sure to calculate your age as of the cutoff date mentioned in the official notification.`,
        },
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Link
        href="/age-limit"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> {/* Back */} All Exams
      </Link>

      <div className="mb-6">
        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase">
          {exam.category}
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-2">{exam.name} — Age Limit</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{exam.organization}</p>
      </div>

      <AgeLimitDetail exam={exam} />
    </div>
  );
}
