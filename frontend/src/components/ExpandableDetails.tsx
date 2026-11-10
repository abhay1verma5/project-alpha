'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Users, IndianRupee } from 'lucide-react';

export function VacancyBreakdown({ total, details }: { total: number | null; details: Record<string, number> | null }) {
  const [expanded, setExpanded] = useState(false);

  if (!total) return null;

  // Group vacancy details by type: reservation categories vs post-level breakdown
  const reservationKeys = ['General', 'UR', 'OBC', 'SC', 'ST', 'EWS', 'PwD', 'Ex-Serviceman', 'Female', 'Male'];
  const reservationEntries: [string, number][] = [];
  const postLevelEntries: [string, number][] = [];

  if (details) {
    Object.entries(details).forEach(([key, count]) => {
      if (reservationKeys.some(rk => key.toLowerCase().includes(rk.toLowerCase()))) {
        reservationEntries.push([key, count]);
      } else {
        postLevelEntries.push([key, count]);
      }
    });
  }

  const hasDetails = (details && Object.keys(details).length > 0);

  return (
    <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-200 dark:border-blue-800 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 text-left active:bg-blue-100 dark:active:bg-blue-900/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Total Vacancies</p>
            <p className="text-xl font-extrabold text-gray-900 dark:text-white">{total.toLocaleString('en-IN')} posts</p>
          </div>
        </div>
        {hasDetails && (
          <div className="flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
            {expanded ? 'Hide' : 'View Details'}
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        )}
      </button>

      {expanded && hasDetails && (
        <div className="px-4 pb-4 border-t border-blue-200 dark:border-blue-800">
          {/* Post-level breakdown (Officer, Clerk, etc.) */}
          {postLevelEntries.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-1">Post-wise Breakdown</p>
              <div className="space-y-1.5">
                {postLevelEntries.map(([post, count]) => (
                  <div key={post} className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-white dark:bg-gray-900 border border-blue-100 dark:border-blue-900">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{post}</span>
                    <span className="text-sm font-extrabold text-blue-700 dark:text-blue-300">{count.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Category reservation breakdown (General, OBC, SC, ST, EWS) */}
          {reservationEntries.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-1">Category-wise Reservation</p>
              <div className="grid grid-cols-2 gap-1.5">
                {reservationEntries.map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-white dark:bg-gray-900 border border-blue-100 dark:border-blue-900">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{category}</span>
                    <span className="text-sm font-extrabold text-blue-700 dark:text-blue-300">{count.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* If no grouping was possible, show all flat */}
          {postLevelEntries.length === 0 && reservationEntries.length === 0 && details && (
            <div className="grid grid-cols-2 gap-1.5 mt-3">
              {Object.entries(details).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-white dark:bg-gray-900 border border-blue-100 dark:border-blue-900">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{category}</span>
                  <span className="text-sm font-extrabold text-blue-700 dark:text-blue-300">{count.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          )}

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            Total: {Object.values(details!).reduce((a, b) => a + b, 0).toLocaleString('en-IN')} posts
          </p>
        </div>
      )}
    </div>
  );
}

export function FeeDetails({ fee }: { fee: Record<string, string> | null }) {
  const [expanded, setExpanded] = useState(false);

  if (!fee || Object.keys(fee).length === 0) return null;

  // Show first fee as preview
  const firstEntry = Object.entries(fee)[0];

  return (
    <div className="rounded-xl bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-800 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 text-left active:bg-green-100 dark:active:bg-green-900/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center">
            <IndianRupee className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">Application Fee</p>
            <p className="text-base font-bold text-gray-900 dark:text-white">
              {firstEntry ? `${firstEntry[0]}: ${firstEntry[1]}` : 'View fee details'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm font-semibold text-green-600 dark:text-green-400">
          {expanded ? 'Hide' : 'All Fees'}
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-green-200 dark:border-green-800">
          <div className="space-y-1.5 mt-3">
            {Object.entries(fee).map(([category, amount]) => (
              <div key={category} className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-white dark:bg-gray-900 border border-green-100 dark:border-green-900">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{category}</span>
                <span className="text-sm font-extrabold text-green-700 dark:text-green-300">{amount}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            Fee may vary. Check official notification for exact details.
          </p>
        </div>
      )}
    </div>
  );
}
