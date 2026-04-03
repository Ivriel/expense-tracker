"use client";

import React, { useCallback, useEffect, useState } from "react";
import ExpenseListTable from "../../_components/ExpenseListTable";
import { Expense } from "@/db/schema";
import { getAllExpenses } from "@/server/expense";
import { useFilterStore } from "@/store/useFilterStore";

interface ExpensesClientProps {
  budgetList: { id: number; name: string }[];
}

export default function ExpensesClient({ budgetList }: ExpensesClientProps) {
  const [expenseList, setExpenseList] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const { getFilterParams } = useFilterStore();

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    const filterParams = getFilterParams();
    const response = await getAllExpenses(filterParams);
    if (response?.success && response.result) {
      setExpenseList(response.result as Expense[]);
    }
    setLoading(false);
  }, [getFilterParams]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return (
    <div className="mt-6">
      <ExpenseListTable
        expenseList={expenseList}
        budgetList={budgetList}
        refreshData={fetchExpenses}
        loading={loading}
      />
    </div>
  );
}
