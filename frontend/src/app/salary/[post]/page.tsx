import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { SALARY_DATA, getSalaryBySlug } from '../salary-data';
import { SalaryDetail } from '../SalaryDetail';

export function generateStaticParams() {
  return SALARY_DATA.map((p) => ({ post: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ post: string }> }): Promise<Metadata> {
  const { post: slug } = await params;
  const post = getSalaryBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.name} Salary 2026-27 — In-hand ₹${post.inHandSalary.metro.toLocaleString('en-IN')} (Metro) | SarkariAlert`,
    description: `${post.name} salary: Basic ₹${post.basicPay.toLocaleString('en-IN')}, In-hand ₹${post.inHandSalary.other.toLocaleString('en-IN')}-₹${post.inHandSalary.metro.toLocaleString('en-IN')} per month. ${post.payLevel}. Exam: ${post.exam}.`,
    alternates: { canonical: `https://sarkarialert.online/salary/${slug}` },
  };
}

export default async function SalaryPostPage({ params }: { params: Promise<{ post: string }> }) {
  const { post: slug } = await params;
  const post = getSalaryBySlug(slug);
  if (!post) notFound();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the salary of ${post.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The basic pay of ${post.name} is ₹${post.basicPay.toLocaleString('en-IN')} at ${post.payLevel}. With DA, HRA and other allowances, the in-hand salary ranges from ₹${post.inHandSalary.other.toLocaleString('en-IN')} to ₹${post.inHandSalary.metro.toLocaleString('en-IN')} per month depending on the city.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the in-hand salary of ${post.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The in-hand salary of ${post.name} is approximately ₹${post.inHandSalary.metro.toLocaleString('en-IN')} in metro cities, ₹${post.inHandSalary.tier2.toLocaleString('en-IN')} in tier-2 cities, and ₹${post.inHandSalary.other.toLocaleString('en-IN')} in other areas.`,
        },
      },
      {
        '@type': 'Question',
        name: `What are the perks of ${post.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${post.name} receives the following perks: ${post.perks.join(', ')}. The promotion path is: ${post.promotionPath}.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the promotion path for ${post.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The promotion path for ${post.name} is: ${post.promotionPath}. Promotions are based on seniority and departmental exams. Each promotion level comes with higher pay level and additional allowances.`,
        },
      },
      {
        '@type': 'Question',
        name: `How much DA does ${post.name} get?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${post.name} gets DA (Dearness Allowance) at 56% of basic pay, which is ₹${Math.round(post.basicPay * 0.56).toLocaleString('en-IN')} per month. DA increases by 3-4% every six months to adjust for inflation.`,
        },
      },
      {
        '@type': 'Question',
        name: `${post.name} ki salary kitni hoti hai?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${post.name} ki basic salary ₹${post.basicPay.toLocaleString('en-IN')} hai (${post.payLevel}). DA, HRA aur TA milakar metro city mein in-hand salary ₹${post.inHandSalary.metro.toLocaleString('en-IN')} aur chhote sheher mein ₹${post.inHandSalary.other.toLocaleString('en-IN')} milti hai.`,
        },
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Link
        href="/salary"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> All Posts
      </Link>

      <div className="mb-6">
        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase">
          {post.category}
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-2">{post.name} — Salary Details</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{post.exam} · {post.payLevel}</p>
      </div>

      <SalaryDetail post={post} />
    </div>
  );
}
