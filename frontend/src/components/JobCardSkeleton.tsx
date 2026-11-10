export function JobCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-4 sm:p-5 animate-pulse">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded-lg" />
        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded-lg" />
      </div>
      <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-800 rounded mb-2" />
      <div className="h-4 w-1/2 bg-gray-100 dark:bg-gray-800/50 rounded mb-3" />
      <div className="flex gap-3 mt-3">
        <div className="h-4 w-20 bg-gray-100 dark:bg-gray-800/50 rounded" />
        <div className="h-4 w-24 bg-gray-100 dark:bg-gray-800/50 rounded" />
        <div className="h-4 w-16 bg-gray-100 dark:bg-gray-800/50 rounded" />
      </div>
    </div>
  );
}

export function JobListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="grid gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <JobCardSkeleton key={i} />
      ))}
    </div>
  );
}
