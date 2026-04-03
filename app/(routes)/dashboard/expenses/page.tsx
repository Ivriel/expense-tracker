import { BudgetWithStats, getAllBudget } from "@/server/budget";
import React from "react";
import ExpensesClient from "./_components/ExpensesClient";

export default async function ExpensesPage() {
  const budgetsRes = await getAllBudget();
  const budgetList = (budgetsRes?.result || []) as BudgetWithStats[];

  return (
    <div className="p-8">
      <h2 className="font-bold text-3xl">All <span className="text-purple-600">Expenses</span> </h2>
      <p className="text-gray-500">
        Laporan penuh mendetail seluruh transaksi dari semua budget Anda.
      </p>

      <ExpensesClient
        budgetList={budgetList}
      />
    </div>
  );
}
