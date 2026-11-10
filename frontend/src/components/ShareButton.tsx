'use client';

import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  text: string;
  url?: string;
  className?: string;
}

export function ShareButton({ title, text, url, className = '' }: ShareButtonProps) {
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
      } catch {}
    } else {
      // Fallback: WhatsApp share
      const waText = encodeURIComponent(`${text}\n${shareUrl}`);
      window.open(`https://wa.me/?text=${waText}`, '_blank');
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-600 text-white font-bold text-sm active:scale-[0.98] transition-all ${className}`}
    >
      <Share2 className="w-4 h-4" />
      Share
    </button>
  );
}
