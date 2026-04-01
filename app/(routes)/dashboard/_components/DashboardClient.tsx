"use client";

import { useCallback, useEffect, useState } from "react";
import CardInfo from "./CardInfoDashboard";
import { BudgetWithStats, getAllBudget } from "@/server/budget";
import BarchartDashboard from "./BarChartDashboard";

interface Props {
  userName: string;
  userEmail: string;
}

export default function DashboardClient({ userName }: Props) {
  const [budgetList, setBudgetList] = useState<BudgetWithStats[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBudgets = useCallback(async () => {
    setLoading(true);
    const response = await getAllBudget();
    if (response?.success && response.result) {
      setBudgetList(response.result as BudgetWithStats[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

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
    if (hour < 21) return "🌇";
    return "🌙";
  };

  return (
    <div className="p-5">
      <h1 className="font-bold text-3xl">
        {getGreeting()},{" "}
        <span className="text-purple-600">{userName}</span>{" "}
        {emoteGreeting()}
      </h1>
      <p className="text-gray-600">
        Buat anggaran, atur keuangan, dan pantau pengeluaran Anda dengan mudah
        menggunakan{" "}
        <span className="text-purple-600 font-bold">expense tracker</span>.
      </p>
      <CardInfo budgetList={budgetList} loading={loading} />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-2">
        <div className="md:col-span-2 pt-2">
          <BarchartDashboard budgetList={budgetList} />
        </div>
        <div>Other Content</div>
      </div>
    </div>
  );
}
