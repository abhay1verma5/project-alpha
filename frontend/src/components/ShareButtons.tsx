'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Send, Link2, Check, Bookmark, BookmarkCheck } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  // Same key as JobCard and /saved-jobs so a save from the detail page shows up there.
  const SAVED_KEY = 'sarkari_saved_jobs';

  useEffect(() => {
    try {
      const savedJobs: string[] = JSON.parse(localStorage.getItem(SAVED_KEY) || '[]');
      setSaved(savedJobs.includes(slug));
    } catch {}
  }, [slug]);

  const url = `https://sarkarialert.online/jobs/${slug}`;
  const text = `${title} — Check details and apply: ${url}`;

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareTelegram = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      '_blank',
    );
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleSave = () => {
    let savedJobs: string[] = [];
    try { savedJobs = JSON.parse(localStorage.getItem(SAVED_KEY) || '[]'); } catch {}
    const updated = saved ? savedJobs.filter((s) => s !== slug) : [...savedJobs, slug];
    try { localStorage.setItem(SAVED_KEY, JSON.stringify(updated)); } catch {}
    setSaved(!saved);
  };

  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <button
        onClick={shareWhatsApp}
        title="Share on WhatsApp"
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 text-xs font-bold whitespace-nowrap hover:bg-green-100 dark:hover:bg-green-900/40 active:scale-95 transition-all"
      >
        <MessageCircle className="w-4 h-4 flex-shrink-0" /> <span className="hidden sm:inline">WhatsApp</span>
      </button>
      <button
        onClick={shareTelegram}
        title="Share on Telegram"
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold whitespace-nowrap hover:bg-blue-100 dark:hover:bg-blue-900/40 active:scale-95 transition-all"
      >
        <Send className="w-4 h-4 flex-shrink-0" /> <span className="hidden sm:inline">Telegram</span>
      </button>
      <button
        onClick={copyLink}
        title="Copy link"
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold whitespace-nowrap hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95 transition-all"
      >
        {copied ? <Check className="w-4 h-4 text-green-500 flex-shrink-0" /> : <Link2 className="w-4 h-4 flex-shrink-0" />}
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <button
        onClick={toggleSave}
        title={saved ? 'Remove bookmark' : 'Save job'}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-bold whitespace-nowrap hover:bg-amber-100 dark:hover:bg-amber-900/40 active:scale-95 transition-all"
      >
        {saved ? <BookmarkCheck className="w-4 h-4 flex-shrink-0" /> : <Bookmark className="w-4 h-4 flex-shrink-0" />}
        {saved ? 'Saved' : 'Save'}
      </button>
    </div>
  );
}
