"use client";

import React from "react";
import ExpenseListTable from "../../_components/ExpenseListTable";
import { Expense } from "@/db/schema";
import { useRouter } from "next/navigation";

interface ExpensesClientProps {
  expenseList: Expense[];
  budgetList: { id: number; name: string }[];
}

export default function ExpensesClient({ expenseList, budgetList }: ExpensesClientProps) {
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
  };

  return (
    <div className="mt-6">
      <ExpenseListTable 
        expenseList={expenseList} 
        budgetList={budgetList} 
        refreshData={handleRefresh} 
      />
    </div>
  );
}
