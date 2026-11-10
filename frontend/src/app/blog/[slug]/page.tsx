import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { articles, getArticle } from '@/lib/blog-articles';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: 'Article not found' };
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `https://sarkarialert.online/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://sarkarialert.online/blog/${article.slug}`,
      type: 'article',
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    dateModified: article.updated,
    author: { '@type': 'Organization', name: 'SarkariAlert' },
    mainEntityOfPage: `https://sarkarialert.online/blog/${article.slug}`,
  };

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-orange-600 dark:text-gray-400 mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> All articles
      </Link>

      <div className="flex items-center gap-3 mb-3">
        <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold ${article.categoryColor}`}>
          {article.category}
        </span>
        <span className="flex items-center gap-1 text-[11px] text-gray-400">
          <Clock className="w-3 h-3" /> {article.readTime}
        </span>
        <span className="flex items-center gap-1 text-[11px] text-gray-400">
          <Calendar className="w-3 h-3" /> Updated {article.updated}
        </span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-3">{article.title}</h1>
      <p className="text-base text-gray-600 dark:text-gray-300 mb-8">{article.description}</p>

      <article className="space-y-6">
        {article.body.map((section, i) => (
          <section key={i}>
            {section.heading && (
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{section.heading}</h2>
            )}
            {section.paragraphs?.map((p, j) => (
              <p key={j} className="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300 mb-3">
                {p}
              </p>
            ))}
            {section.bullets && (
              <ul className="list-disc pl-5 space-y-2 text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
                {section.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>

      <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Read next</h3>
        <ul className="space-y-2">
          {related.map((r) => (
            <li key={r.slug}>
              <Link href={`/blog/${r.slug}`} className="text-sm text-orange-600 dark:text-orange-400 hover:underline">
                {r.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
