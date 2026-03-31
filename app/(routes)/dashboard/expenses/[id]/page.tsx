"use client";

import { getBudgetInfo, BudgetWithStats } from "@/server/budget";
import { use, useEffect, useState } from "react";

export default function ExpenseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [budgetInfo, setBudgetInfo] = useState<BudgetWithStats | null>(null);

  useEffect(() => {
    const getBudgetInformation = async () => {
      const result = await getBudgetInfo(id);
      if (result.success) {
        setBudgetInfo(result.result ?? null);
      }
    };
    getBudgetInformation();
  }, [id]);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">Expense Detail</h2>
    </div>
  );
}