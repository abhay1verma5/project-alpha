'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Briefcase, Bell, Menu, X, FileCheck, CreditCard, Key, GraduationCap, BookOpen, Wrench, Newspaper, Sparkles, Award, FileText, BarChart3, Target, Brain, ClipboardCheck, MessageCircle, ScrollText, IndianRupee, Clock, TrendingDown, BookMarked } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from './LanguageProvider';
import { tr } from '@/lib/translations';
import { cn } from '@/lib/utils';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { lang } = useLanguage();

  const NAV_LINKS = [
    { href: '/', label: tr('nav.home', lang), icon: Briefcase },
    { href: '/jobs', label: tr('nav.jobs', lang), icon: Briefcase },
    { href: '/results', label: tr('nav.results', lang), icon: FileCheck },
    { href: '/admit-cards', label: tr('nav.admitCards', lang), icon: CreditCard },
    { href: '/answer-keys', label: tr('nav.answerKeys', lang), icon: Key },
    { href: '/admissions', label: tr('nav.admissions', lang), icon: GraduationCap },
    { href: '/syllabus', label: tr('nav.syllabus', lang), icon: BookOpen },
    { href: '/scholarships', label: tr('nav.scholarships', lang), icon: Award },
    { href: '/previous-papers', label: tr('nav.pyqPapers', lang), icon: FileText },
    { href: '/pyq', label: tr('nav.pyqPractice', lang), icon: ScrollText },
    { href: '/current-affairs', label: tr('nav.currentAffairs', lang), icon: Newspaper },
    { href: '/daily-quiz', label: tr('nav.dailyQuiz', lang), icon: Brain },
    { href: '/topic-weightage', label: tr('nav.weightage', lang), icon: BarChart3 },
    { href: '/salary', label: tr('nav.salary', lang), icon: IndianRupee },
    { href: '/age-limit', label: tr('nav.ageLimit', lang), icon: Clock },
    { href: '/cutoff-tracker', label: tr('nav.cutoff', lang), icon: TrendingDown },
    { href: '/blog', label: tr('nav.blog', lang), icon: BookMarked },
    { href: '/mock-tests', label: tr('nav.mockTests', lang), icon: Target },
    { href: '/tools', label: tr('nav.tools', lang), icon: Wrench },
    { href: '/exam-calendar', label: tr('nav.jobNews', lang), icon: Newspaper },
    { href: '/search', label: tr('nav.aiSearch', lang), icon: Sparkles },
    { href: '/ai-quiz', label: tr('nav.aiQuiz', lang), icon: Brain },
    { href: '/ai-eligibility', label: tr('nav.aiEligibility', lang), icon: ClipboardCheck },
    { href: '/ai-career', label: tr('nav.aiCareer', lang), icon: MessageCircle },
    { href: '/ai-tools', label: tr('nav.aiTools', lang), icon: Sparkles },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#1a3a5c]/95 backdrop-blur-xl shadow-lg'
            : 'bg-[#1a3a5c]'
        }`}
      >
        <div className="h-1 bg-gradient-to-r from-[#ff6f00] via-white to-[#1b5e20]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#ff6f00] flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-shadow">
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="font-bold text-lg sm:text-xl text-white tracking-tight">
                Sarkari<span className="text-[#ff6f00]">Alert</span>
              </span>
            </Link>

            {/* Desktop nav — single row, scrollable */}
            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-0.5 overflow-x-auto scrollbar-hide">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'whitespace-nowrap px-2.5 py-1.5 rounded-lg text-[13px] font-semibold transition-all',
                    pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                      ? 'text-[#ff6f00] bg-white/15'
                      : 'text-blue-100 hover:text-white hover:bg-white/10'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex-shrink-0 flex items-center gap-1.5">
              <LanguageToggle />
              <ThemeToggle />
              <Link href="/notifications" className="relative p-2 rounded-xl hover:bg-white/10 transition-colors text-blue-100 hover:text-white" aria-label="Notifications">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ff6f00] rounded-full" aria-hidden="true" />
              </Link>
              <button
                className="lg:hidden p-2 rounded-xl hover:bg-white/10 transition-colors text-blue-100 hover:text-white"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-40" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="absolute top-[61px] left-0 right-0 bg-white dark:bg-gray-900 border-b-2 border-[#ff6f00] shadow-2xl max-h-[calc(100vh-61px)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <nav aria-label="Mobile menu" className="p-3 space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all',
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/40 text-[#1a3a5c] dark:text-blue-200'
                        : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                    )}
                    onClick={() => setMenuOpen(false)}
                  >
                    <link.icon className={cn('w-5 h-5', isActive ? 'text-[#ff6f00]' : 'text-gray-500 dark:text-gray-400')} />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
