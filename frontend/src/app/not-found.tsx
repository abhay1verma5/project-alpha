import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Briefcase, FileCheck, CreditCard, Search, Key } from 'lucide-react';

export const metadata: Metadata = {
  title: '404 — Page Not Found | SarkariAlert',
  robots: 'noindex',
};

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24 text-center">
      {/* Big 404 */}
      <div className="relative mb-6">
        <h1 className="text-[120px] sm:text-[160px] font-black text-gray-100 dark:text-gray-900 leading-none select-none">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff6f00] to-amber-500 flex items-center justify-center shadow-xl shadow-orange-500/30">
            <Search className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Page Not Found</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
        The page you are looking for doesn't exist or the job posting may have been removed. Try searching or browse our sections below.
      </p>

      {/* Quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 max-w-lg mx-auto">
        {[
          { href: '/', label: 'Home', icon: Home, color: 'from-blue-500 to-blue-600' },
          { href: '/jobs', label: 'Latest Jobs', icon: Briefcase, color: 'from-emerald-500 to-emerald-600' },
          { href: '/results', label: 'Results', icon: FileCheck, color: 'from-purple-500 to-purple-600' },
          { href: '/admit-cards', label: 'Admit Cards', icon: CreditCard, color: 'from-amber-500 to-amber-600' },
          { href: '/answer-keys', label: 'Answer Keys', icon: Key, color: 'from-rose-500 to-rose-600' },
          { href: '/search', label: 'Search', icon: Search, color: 'from-cyan-500 to-cyan-600' },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all active:scale-95 text-sm font-bold text-gray-700 dark:text-gray-200"
          >
            <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center`}>
              <link.icon className="w-3.5 h-3.5 text-white" />
            </div>
            {link.label}
          </Link>
        ))}
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-600">
        If you believe this is an error, please go back or try searching for the job.
      </p>
    </div>
  );
}
