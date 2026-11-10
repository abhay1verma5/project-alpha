'use client';

import { SearchBar } from './SearchBar';
import { TrendingUp, Users, Award, Zap } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { tr } from '@/lib/translations';

export function Hero() {
  const { lang } = useLanguage();

  const STATS_MINI = [
    { icon: TrendingUp, label: tr('hero.dailyUpdates', lang), color: 'text-emerald-300' },
    { icon: Users, label: tr('hero.vacancies', lang), color: 'text-orange-300' },
    { icon: Award, label: tr('hero.allIndia', lang), color: 'text-amber-300' },
    { icon: Zap, label: tr('hero.aiVoice', lang), color: 'text-cyan-300' },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Government blue gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d2137] via-[#1a3a5c] to-[#1b3a5c] dark:from-[#050a18] dark:via-[#0d1b2a] dark:to-[#0d2137]" />

      {/* Subtle pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Ashoka Chakra-inspired subtle background element */}
      <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full" />
      <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-white/5 rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6f00]/20 border border-[#ff6f00]/30 text-xs sm:text-sm text-orange-200 mb-4 sm:mb-6">
            <span className="w-2 h-2 bg-[#ff6f00] rounded-full animate-pulse" />
            {tr('hero.badge', lang)}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold text-white mb-3 sm:mb-5 tracking-tight leading-tight">
            {tr('hero.title1', lang)}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6f00] via-amber-400 to-yellow-300">
              {tr('hero.titleHighlight', lang)}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-blue-200/80 text-sm sm:text-lg lg:text-xl mb-6 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
            {tr('hero.subtitle', lang)}
          </p>

          {/* Search */}
          <SearchBar />

          {/* Popular searches */}
          <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-sm">
            <span className="text-blue-300/60 text-xs">{tr('hero.trending', lang)}</span>
            {['SSC CGL', 'UPSC CSE', 'Railway NTPC', 'Bank PO', 'Agniveer', 'GNM Nursing', 'Gram Panchayat'].map((term) => (
              <a
                key={term}
                href={`/search?q=${encodeURIComponent(term)}&ai=1`}
                className="px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-blue-100 text-[11px] sm:text-xs hover:bg-white/20 active:scale-95 transition-all"
              >
                {term}
              </a>
            ))}
          </div>

          {/* Mini stats */}
          <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-2xl mx-auto">
            {STATS_MINI.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10"
              >
                <stat.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${stat.color}`} />
                <span className="text-[10px] sm:text-xs font-medium text-white/80">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L60 52C120 44 240 28 360 24C480 20 600 28 720 32C840 36 960 36 1080 32C1200 28 1320 20 1380 16L1440 12V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" className="fill-[#f5f7fa] dark:fill-[#050a18]" />
        </svg>
      </div>
    </section>
  );
}
