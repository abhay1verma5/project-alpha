import Link from 'next/link';
import { type LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

function DefaultIllustration() {
  return (
    <svg
      width="160"
      height="160"
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
      aria-hidden="true"
    >
      {/* Background circle */}
      <circle cx="80" cy="80" r="72" className="fill-gray-100 dark:fill-gray-800" />

      {/* Document stack - back */}
      <rect
        x="44"
        y="38"
        width="64"
        height="80"
        rx="6"
        className="fill-gray-200 dark:fill-gray-700"
        transform="rotate(-3 44 38)"
      />

      {/* Document stack - front */}
      <rect
        x="48"
        y="34"
        width="64"
        height="80"
        rx="6"
        strokeWidth="1.5"
        className="fill-white dark:fill-gray-600 stroke-gray-300 dark:stroke-gray-500"
      />

      {/* Lines on document */}
      <rect x="58" y="50" width="40" height="4" rx="2" className="fill-gray-200 dark:fill-gray-500" />
      <rect x="58" y="60" width="32" height="4" rx="2" className="fill-gray-200 dark:fill-gray-500" />
      <rect x="58" y="70" width="36" height="4" rx="2" className="fill-gray-200 dark:fill-gray-500" />
      <rect x="58" y="80" width="24" height="4" rx="2" className="fill-gray-200 dark:fill-gray-500" />

      {/* Magnifying glass */}
      <circle
        cx="104"
        cy="96"
        r="18"
        className="fill-blue-50 dark:fill-blue-900/30 stroke-blue-400 dark:stroke-blue-500"
        strokeWidth="3"
      />
      <line
        x1="116"
        y1="108"
        x2="130"
        y2="122"
        className="stroke-blue-400 dark:stroke-blue-500"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Question mark in magnifying glass */}
      <text
        x="104"
        y="102"
        textAnchor="middle"
        className="fill-blue-400 dark:fill-blue-400"
        fontSize="18"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        ?
      </text>
    </svg>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Illustration or icon */}
      {Icon ? (
        <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6">
          <Icon className="w-10 h-10 text-gray-400 dark:text-gray-500" />
        </div>
      ) : (
        <div className="mb-6">
          <DefaultIllustration />
        </div>
      )}

      {/* Title */}
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mb-6 leading-relaxed">
        {description}
      </p>

      {/* Action button */}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors shadow-lg shadow-blue-500/20"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
