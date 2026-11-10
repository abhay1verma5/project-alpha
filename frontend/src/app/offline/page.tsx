'use client';

import { WifiOff, RefreshCw } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
          <WifiOff className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">
          You&apos;re Offline
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          No internet connection. Please check your network and try again. Previously visited pages may still be available.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Try Again
        </button>
      </div>
    </div>
  );
}
