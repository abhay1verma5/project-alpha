import type { Metadata } from 'next';
import { SearchPageClient } from '@/components/SearchPageClient';

export const metadata: Metadata = {
  title: 'Search Jobs — SarkariAlert',
  description: 'Search government jobs — normal keyword search or AI-powered smart search in Hindi/English with voice support.',
  keywords: ['search government jobs', 'sarkari naukri search', 'find government jobs', 'job search india', 'ssc jobs search', 'upsc jobs search'],
  alternates: { canonical: 'https://sarkarialert.online/search' },
};

interface Props {
  searchParams: Promise<{ q?: string; mode?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = params.q || '';
  const mode = params.mode || 'normal'; // 'normal' or 'ai'

  return <SearchPageClient initialQuery={query} initialMode={mode} />;
}
