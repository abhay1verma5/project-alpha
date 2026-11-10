'use client';

import { useState } from 'react';
import { Download, Check } from 'lucide-react';

interface DownloadPDFProps {
  title: string;
  contentId: string;
}

export function DownloadPDF({ title, contentId }: DownloadPDFProps) {
  const [printing, setPrinting] = useState(false);
  const [done, setDone] = useState(false);

  const handlePrint = () => {
    const content = document.getElementById(contentId);
    if (!content) return;

    setPrinting(true);

    // Set document title for the PDF filename
    const originalTitle = document.title;
    document.title = title;

    // Mark elements that should be hidden during print
    const hideElements = document.querySelectorAll(
      'header, footer, nav, [class*="sticky-apply"], [class*="back-to-top"]'
    );
    hideElements.forEach((el) => el.setAttribute('data-print-hide', 'true'));

    // Trigger the browser print dialog (user can save as PDF)
    window.print();

    // Restore after print
    document.title = originalTitle;
    hideElements.forEach((el) => el.removeAttribute('data-print-hide'));
    setPrinting(false);
    setDone(true);
    setTimeout(() => setDone(false), 2500);
  };

  return (
    <button
      onClick={handlePrint}
      disabled={printing}
      title="Download as PDF"
      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/40 active:scale-95 transition-all disabled:opacity-50"
    >
      {done ? (
        <>
          <Check className="w-4 h-4 text-green-500" /> Saved
        </>
      ) : (
        <>
          <Download className="w-4 h-4" /> {printing ? 'Preparing...' : 'PDF'}
        </>
      )}
    </button>
  );
}
