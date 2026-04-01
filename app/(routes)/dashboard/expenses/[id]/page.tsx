"use client";

import { getBudgetInfo, BudgetWithStats } from "@/server/budget";
import { use, useEffect, useState } from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";
import BudgetListSkeleton from "../../budgets/_components/BudgetListSkeleton";
import AddExpense from "../_components/AddExpense";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getAllExpensesByBudgetId } from "@/server/expense";
import { Expense } from "@/db/schema";
import ExpenseListByBudgetIdTable from "../_components/ExpenseListByBudgetIdTable";
import DeleteBudgetButton from "../_components/DeleteBudgetButton";

export default function ExpenseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [budgetInfo, setBudgetInfo] = useState<BudgetWithStats | null>(null);
  const [expensesListByBudgetId, setExpensesListByBudgetId] = useState<
    Expense[] | null
  >(null);

  const getAllExpenses = async () => {
    const response = await getAllExpensesByBudgetId(Number(id));
    if (response.success) {
      setExpensesListByBudgetId(response.result ?? []);
    }
  };

  const getBudgetInformation = async () => {
    const result = await getBudgetInfo(id);
    if (result.success) {
      setBudgetInfo(result.result ?? null);
      getAllExpenses();
    }
  };

  useEffect(() => {
    getBudgetInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="p-10">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard/budgets">Budgets</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{budgetInfo?.name ?? "Loading..."}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between mt-5 mb-5">
        <h2 className="text-2xl font-bold">Expenses Manager for <span className="text-purple-600">{budgetInfo?.name}</span></h2>
        <DeleteBudgetButton budgetId={Number(id)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <BudgetListSkeleton />
        )}
        <AddExpense budgetId={Number(id)} refreshData={getBudgetInformation} />
      </div>

      <div className="mt-4">
        <h2 className="font-bold text-lg">All Expenses</h2>
        <ExpenseListByBudgetIdTable
          expensesListByBudgetId={expensesListByBudgetId}
          refreshData={getBudgetInformation}
        />
      </div>
    </div>
  );
}
