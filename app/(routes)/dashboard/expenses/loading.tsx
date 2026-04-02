import React from 'react';
import ExpenseTableSkeleton from './_components/ExpenseTableSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function ExpensesLoading() {
  return (
    <div className="p-8">
      <Skeleton className="h-10 w-[300px] mb-2" />
      <Skeleton className="h-4 w-[450px]" />
      
      <div className="mt-6">
        <ExpenseTableSkeleton />
      </div>
    </div>
  );
}
