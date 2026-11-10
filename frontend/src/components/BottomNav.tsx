'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, FileCheck, Sparkles, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from './LanguageProvider';
import { tr } from '@/lib/translations';

export function BottomNav() {
  const pathname = usePathname();
  const { lang } = useLanguage();

  const NAV_ITEMS = [
    { href: '/', icon: Home, label: tr('bottomNav.home', lang), activeColor: 'text-[#1a3a5c]', activeBg: 'bg-blue-50' },
    { href: '/jobs', icon: Briefcase, label: tr('bottomNav.jobs', lang), activeColor: 'text-[#ff6f00]', activeBg: 'bg-orange-50' },
    { href: '/results', icon: FileCheck, label: tr('bottomNav.results', lang), activeColor: 'text-green-600', activeBg: 'bg-green-50' },
    { href: '/tools', icon: Wrench, label: tr('bottomNav.tools', lang), activeColor: 'text-[#1b5e20]', activeBg: 'bg-emerald-50' },
    { href: '/ai-quiz', icon: Sparkles, label: tr('bottomNav.quiz', lang), activeColor: 'text-purple-600', activeBg: 'bg-purple-50' },
  ];

  return (
    <nav aria-label="Mobile navigation" className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-lg border-t-2 border-[#1a3a5c]/20 dark:border-gray-800 safe-area-bottom">
      <div className="grid grid-cols-5 h-16">
        {NAV_ITEMS.map((item) => {
          const isActive = item.href === '/'
            ? pathname === '/'
            : item.href === '/ai-quiz'
              ? pathname === '/ai-quiz'
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 text-[10px] font-bold transition-colors active:scale-95',
                isActive
                  ? item.activeColor
                  : 'text-gray-500 dark:text-gray-400'
              )}
            >
              <div className={cn(
                'relative p-1.5 rounded-xl transition-colors',
                isActive ? item.activeBg + ' dark:bg-gray-800' : ''
              )}>
                <item.icon className="w-5 h-5" />
              </div>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
