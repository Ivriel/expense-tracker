import { BudgetWithStats, getAllBudget } from "@/server/budget";
import { getAllExpenses } from "@/server/expense";
import React from "react";
import ExpensesClient from "./_components/ExpensesClient";
import { Expense } from "@/db/schema";

export default async function ExpensesPage() {
  const expensesRes = await getAllExpenses();
  const budgetsRes = await getAllBudget();

  const expenseList = (expensesRes?.result || []) as Expense[];
  const budgetList = (budgetsRes?.result || []) as BudgetWithStats[];

  return (
    <div className="p-8">
      <h2 className="font-bold text-3xl">All <span className="text-purple-600">Expenses</span> </h2>
      <p className="text-gray-500">
        Laporan penuh mendetail seluruh transaksi dari semua budget Anda.
      </p>

      <ExpensesClient 
        expenseList={expenseList} 
        budgetList={budgetList} 
      />
    </div>
  );
}
