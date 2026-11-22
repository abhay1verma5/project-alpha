'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowUp } from 'lucide-react';

// Job detail pages (/jobs/<slug>) already have the sticky Apply bar; hide Back to top there.
const JOB_DETAIL_PATH = /^\/jobs\/[^/]+/;

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible || JOB_DETAIL_PATH.test(pathname)) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-[calc(var(--bottom-nav-h)_+_0.75rem)] md:bottom-8 right-4 z-40 w-11 h-11 rounded-full bg-[#1a3a5c] text-white shadow-lg shadow-blue-900/30 flex items-center justify-center hover:bg-[#0f2b44] active:scale-95 transition-all"
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
