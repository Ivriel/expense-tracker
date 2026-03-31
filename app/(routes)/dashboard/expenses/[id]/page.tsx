"use client";

import { getBudgetInfo, BudgetWithStats } from "@/server/budget";
import { use, useEffect, useState } from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";
import BudgetListSkeleton from "../../budgets/_components/BudgetListSkeleton";
import AddExpense from "../_components/AddExpense";

export default function ExpenseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [budgetInfo, setBudgetInfo] = useState<BudgetWithStats | null>(null);

  const getBudgetInformation = async () => {
    const result = await getBudgetInfo(id);
    if (result.success) {
      setBudgetInfo(result.result ?? null);
    }
  };

  useEffect(() => {
    getBudgetInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-5">My Expenses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <BudgetListSkeleton />
        )}
        <AddExpense budgetId={Number(id)} refreshData={getBudgetInformation} />
      </div>
    </div>
  );
}
