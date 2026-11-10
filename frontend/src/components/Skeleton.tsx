import { cn } from '@/lib/utils';

export function SkeletonLine({ className }: { className?: string }) {
  return <div className={cn('h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse', className)} />;
}

export function SkeletonCircle({ className }: { className?: string }) {
  return <div className={cn('w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse', className)} />;
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-3 animate-pulse', className)}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
        </div>
      </div>
      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full" />
      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
    </div>
  );
}
