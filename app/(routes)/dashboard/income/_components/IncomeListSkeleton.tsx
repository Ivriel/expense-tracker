import { Skeleton } from "@/components/ui/skeleton";

export default function IncomeListSkeleton() {
  return (
    <div className="relative p-5 bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden w-full">
      {/* Header */}
      <div className="flex gap-3 justify-between items-start">
        <div className="flex gap-3 items-center">
          <Skeleton className="w-11 h-11 rounded-xl shrink-0" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-12 rounded-full" />
          </div>
        </div>
        <div className="text-right space-y-2">
          <Skeleton className="h-3 w-12 ml-auto" />
          <Skeleton className="h-5 w-24 ml-auto" />
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-slate-100" />

      {/* Meta */}
      <div className="flex justify-between items-center">
        <div className="space-y-1.5">
          <Skeleton className="h-3 w-14" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="text-right space-y-1.5">
          <Skeleton className="h-3 w-8 ml-auto" />
          <Skeleton className="h-4 w-20 ml-auto" />
        </div>
      </div>
    </div>
  );
}