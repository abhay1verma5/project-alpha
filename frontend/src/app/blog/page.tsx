import type { Metadata } from 'next';
import Link from 'next/link';
import { Newspaper, Clock, ArrowRight } from 'lucide-react';
import { articles } from '@/lib/blog-articles';
import { RelatedLinks, BLOG_RELATED_LINKS } from '@/components/RelatedLinks';

export const metadata: Metadata = {
  title: 'Blog — Government Exam Preparation Tips & Articles',
  description:
    'Read expert articles on government exam preparation. Tips for SSC, UPSC, Railway, Banking exams, study plans, and career guidance.',
  alternates: {
    canonical: 'https://sarkarialert.online/blog',
  },
};

const faqData = [
  {
    question: 'What topics are covered in SarkariAlert blog?',
    answer: 'Our blog covers government exam preparation strategies, study plans for SSC, UPSC, Railway, and Banking exams, current affairs summaries, career guidance for government jobs, and tips for interview and physical fitness tests.',
  },
  {
    question: 'Kya blog articles Hindi mein available hain?',
    answer: 'Haan, hamare kai articles Hinglish (Hindi + English mix) mein likhe gaye hain taaki Hindi medium ke students bhi aasani se samajh sakein. Hum dheere-dheere pure Hindi articles bhi add kar rahe hain.',
  },
  {
    question: 'How often are new articles published?',
    answer: 'We publish new articles regularly, typically 2-3 articles per week. Topics are chosen based on upcoming exams, trending search queries, and reader requests to keep the content relevant and timely.',
  },
  {
    question: 'Can I suggest a blog topic?',
    answer: 'Yes! We welcome topic suggestions from our readers. You can reach out to us through our social media channels or contact page. We prioritize topics that help the maximum number of exam aspirants.',
  },
];

function FAQSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
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
        }),
      }}
    />
  );
}

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
          <Newspaper className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Blog & Articles</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Expert tips and guides for government exam preparation
          </p>
        </div>
      </div>

      {/* Articles grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-200"
          >
            {/* Category + Read time */}
            <div className="flex items-center justify-between mb-3">
              <span
                className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold ${article.categoryColor}`}
              >
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-gray-400">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-bold text-base text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
              {article.title}
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-4">
              {article.description}
            </p>

            {/* Read more */}
            <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 dark:text-orange-400 group-hover:gap-2 transition-all">
              Read more <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        ))}
      </div>

      {/* FAQ Section */}
      <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqData.map((faq, i) => (
            <details key={i} className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
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

      <RelatedLinks title="Study Resources" links={BLOG_RELATED_LINKS} />

      {/* CollectionPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Blog — Government Exam Preparation Tips & Articles',
            description: 'Expert articles on government exam preparation for SSC, UPSC, Railway, Banking exams.',
            url: 'https://sarkarialert.online/blog',
            numberOfItems: articles.length,
            isPartOf: { '@type': 'WebSite', name: 'SarkariAlert', url: 'https://sarkarialert.online' },
          }),
        }}
      />

      {/* FAQ JSON-LD */}
      <FAQSchema />
    </div>
  );
}
