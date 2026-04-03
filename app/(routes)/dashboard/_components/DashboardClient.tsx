"use client";

import { useCallback, useEffect, useState } from "react";
import CardInfoDashboard from "./CardInfoDashboard";
import { BudgetWithStats, getAllBudget } from "@/server/budget";
import BarchartDashboard from "./BarChartDashboard";
import BudgetItem from "../budgets/_components/BudgetItem";
import { Expense, Income } from "@/db/schema";
import { getAllExpenses } from "@/server/expense";
import ExpenseListTable from "./ExpenseListTable";
import { getAllIncome } from "@/server/income";
import { useFilterStore } from "@/store/useFilterStore";

interface Props {
  userName: string;
  userEmail: string;
}

export default function DashboardClient({ userName }: Props) {
  const [budgetList, setBudgetList] = useState<BudgetWithStats[]>([]);
  const [expenseList, setExpenseList] = useState<Expense[]>([]);
  const [incomeList, setIncomeList] = useState<Income[]>([]);
  const [loading, setLoading] = useState(true);
  const { getFilterParams } = useFilterStore();

  const fetchData = useCallback(async () => {
    setLoading(true);
    const filterParams = getFilterParams();

    const [budgetsRes, expensesRes, incomesRes] = await Promise.all([
      getAllBudget(filterParams),
      getAllExpenses(filterParams),
      getAllIncome(filterParams)
    ]);

    if (budgetsRes?.success && budgetsRes.result) {
      setBudgetList(budgetsRes.result as BudgetWithStats[]);
    }
    if (expensesRes?.success && expensesRes.result) {
      setExpenseList(expensesRes.result as Expense[]);
    }
    if (incomesRes?.success && incomesRes.result) {
      setIncomeList(incomesRes.result as Income[]);
    }

    setLoading(false);
  }, [getFilterParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Selamat Pagi";
    if (hour < 18) return "Selamat Siang";
    if (hour < 21) return "Selamat Sore";
    return "Selamat Malam";
  };

  const emoteGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "🌅";
    if (hour < 18) return "☀️";
    if (hour < 19) return "🌇";
    return "🌙";
  };

  return (
    <div className="p-5">
      <h1 className="font-bold text-3xl">
        {getGreeting()}, <span className="text-purple-600">{userName}</span>{" "}
        {emoteGreeting()}
      </h1>
      <p className="text-gray-600">
        Buat anggaran, atur keuangan, dan pantau pengeluaran Anda dengan mudah
        menggunakan{" "}
        <span className="text-purple-600 font-bold">expense tracker</span>
      </p>
      <CardInfoDashboard budgetList={budgetList} incomeList={incomeList} loading={loading} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-2">
        <div className="lg:col-span-2 pt-2">
          <BarchartDashboard budgetList={budgetList} />
        </div>
        <div className="flex flex-col gap-4 pt-2">
          {budgetList.slice(0, 2).map((budget, index) => (
            <BudgetItem key={index} budget={budget} />
          ))}
        </div>
      </div>

      <div className="mt-6 mb-4">
        <h2 className="font-bold text-xl mb-3 text-purple-600">Last Expenses</h2>
        <ExpenseListTable
          expenseList={expenseList.slice(0, 5)}
          budgetList={budgetList}
          refreshData={fetchData}
          loading={loading}
        />
      </div>
    </div>
  );
}
