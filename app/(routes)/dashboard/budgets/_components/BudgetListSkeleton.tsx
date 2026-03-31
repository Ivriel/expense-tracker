export default function BudgetListSkeleton() {
  return (
    <div className="p-5 border rounded-2xl space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="w-12 h-12 bg-slate-200 animate-pulse rounded-xl" />
          <div className="space-y-2">
            <div className="w-24 h-4 bg-slate-200 animate-pulse rounded" />
            <div className="w-16 h-3 bg-slate-200 animate-pulse rounded" />
          </div>
        </div>
        <div className="w-20 h-5 bg-slate-200 animate-pulse rounded" />
      </div>
      {/* Stats */}
      <div className="flex justify-between mt-4">
        <div className="space-y-1">
          <div className="w-12 h-3 bg-slate-200 animate-pulse rounded" />
          <div className="w-20 h-4 bg-slate-200 animate-pulse rounded" />
        </div>
        <div className="space-y-1">
          <div className="w-12 h-3 bg-slate-200 animate-pulse rounded" />
          <div className="w-20 h-4 bg-slate-200 animate-pulse rounded" />
        </div>
      </div>
      {/* Progress bar */}
      <div className="w-full h-2 bg-slate-200 animate-pulse rounded-full" />
      <div className="w-16 h-3 bg-slate-200 animate-pulse rounded ml-auto" />
    </div>
  );
}