import { AlertCircle } from 'lucide-react';

// Bilingual honesty label shown near the top of the static-data pages.
// Shows both languages at once so it works in server and client components.
export function ApproxDataNotice() {
  return (
    <div role="note" className="mb-6 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
      <p className="flex items-start gap-2 text-sm font-semibold text-amber-900 dark:text-amber-200">
        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
        <span>Approximate data compiled from past notifications — always verify on the official notification before applying.</span>
      </p>
      <p className="mt-1 pl-6 text-sm text-amber-800 dark:text-amber-300">
        अनुमानित जानकारी — आवेदन से पहले आधिकारिक अधिसूचना ज़रूर देखें।
      </p>
    </div>
  );
}
