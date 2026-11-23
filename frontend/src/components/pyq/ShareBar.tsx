'use client';

import { useState } from 'react';

/** WhatsApp / native share / copy link / print for a PYQ paper or question. */
export function ShareBar({ url, title, printable = false }: { url: string; title: string; printable?: boolean }) {
  const [copied, setCopied] = useState(false);
  const text = `${title}\n${url}`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      window.prompt('Copy this link', url);
    }
  };
  const share = async () => {
    if (navigator.share) {
      try { await navigator.share({ title, url }); } catch { /* cancelled */ }
    } else {
      copy();
    }
  };
  const btn = 'inline-flex items-center justify-center min-h-10 px-3 rounded-xl text-sm font-bold border';
  return (
    <div className="flex flex-wrap gap-2 print:hidden">
      <a href={`https://wa.me/?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer"
        className={`${btn} bg-green-600 border-green-600 text-white`}>WhatsApp</a>
      <button type="button" onClick={share} className={`${btn} border-border text-foreground`}>Share</button>
      <button type="button" onClick={copy} className={`${btn} border-border text-foreground`}>
        {copied ? 'Copied ✓' : 'Copy link'}
      </button>
      {printable && (
        <button type="button" onClick={() => window.print()} className={`${btn} border-border text-foreground`}>
          Print / PDF
        </button>
      )}
    </div>
  );
}

/** Small per-question "copy link" (link opens the paper scrolled to this question). */
export function QuestionLink({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1500); }
        catch { window.prompt('Copy this link', url); }
      }}
      className="text-[11px] font-semibold text-muted underline min-h-8 print:hidden"
      aria-label="Copy link to this question"
    >
      {copied ? 'Link copied ✓' : '🔗 Link'}
    </button>
  );
}
