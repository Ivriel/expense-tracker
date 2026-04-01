import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="p-5">
      {/* 1. Header Skeleton (Greeting & Description) */}
      <Skeleton className="h-9 w-[300px] mb-2" />
      <Skeleton className="h-5 w-[80%] max-w-[600px]" />

      {/* 2. Card Info Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="p-7 border rounded-lg flex items-center justify-between bg-white"
          >
            <div className="space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-36" />
            </div>
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
        ))}
      </div>

      {/* 3. BarChart & BudgetItems Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-2">
        {/* Kolom Kiri: BarChart */}
        <div className="md:col-span-2 pt-2">
          <div className="w-full h-full min-h-[350px] border rounded-lg p-5 flex flex-col bg-white">
            <Skeleton className="h-7 w-[220px] mb-4" />
            <Skeleton className="flex-1 w-full rounded-md" />
          </div>
        </div>

        {/* Kolom Kanan: Latest BudgetItems */}
        <div className="flex flex-col gap-4 pt-2">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm"
            >
              {/* Header Budget Item */}
              <div className="flex gap-3 justify-between items-start">
                <div className="flex gap-3 items-center">
                  <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="flex justify-end"><Skeleton className="h-3 w-12" /></div>
                  <div className="flex justify-end"><Skeleton className="h-5 w-24" /></div>
                </div>
              </div>

              {/* Progress & Stats Area */}
              <div className="mt-5 space-y-3">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
                <div className="flex justify-between items-center mt-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
