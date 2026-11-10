import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `https://sarkarialert.online${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-5 overflow-x-auto scrollbar-hide"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <span key={index} className="flex items-center gap-1.5 whitespace-nowrap">
              {index > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-gray-400 dark:text-gray-600 flex-shrink-0" />
              )}
              {isLast ? (
                <span className="font-medium text-gray-900 dark:text-white truncate max-w-[200px] sm:max-w-xs">
                  {index === 0 && <Home className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />}
                  {item.label}
                </span>
              ) : item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {index === 0 && <Home className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />}
                  {item.label}
                </Link>
              ) : (
                <span>
                  {index === 0 && <Home className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />}
                  {item.label}
                </span>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
