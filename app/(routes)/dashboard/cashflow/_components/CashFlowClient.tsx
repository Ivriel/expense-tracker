"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { Income, Expense } from "@/db/schema";
import { getAllIncome } from "@/server/income";
import { getAllExpenses } from "@/server/expense";
import { useFilterStore } from "@/store/useFilterStore";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from "recharts";
import { TrendingUp, TrendingDown, Banknote } from "lucide-react";

const formatRupiah = (value: number) => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}M`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(0)}Jt`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}Rb`;
  return `${value}`;
};

// Reusable hook untuk resize observer dengan debounce
function useChartSize() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Coba ukur, tapi delay sedikit biar layout selesai
    const measure = () => {
      const rect = el.getBoundingClientRect();
      const w = rect.width || el.offsetWidth;
      const h = rect.height || el.offsetHeight;
      if (w > 0 && h > 0) setSize({ width: w, height: h });
    };

    // Immediate attempt
    measure();

    // Fallback: coba lagi setelah browser paint
    const raf = requestAnimationFrame(() => {
      measure();
    });

    let debounceTimer: ReturnType<typeof setTimeout>;
    let isMounted = true;

    const observer = new ResizeObserver((entries) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (!isMounted) return;
        for (const entry of entries) {
          const w = entry.contentRect.width;
          const h = entry.contentRect.height;
          if (w > 0 && h > 0) setSize({ width: w, height: h });
        }
      }, 300);
    });

    observer.observe(el);

    return () => {
      isMounted = false;
      observer.disconnect();
      clearTimeout(debounceTimer);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { ref, ...size };
}

export default function CashFlowClient() {
  const [incomeList, setIncomeList] = useState<Income[]>([]);
  const [expenseList, setExpenseList] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const { getFilterParams } = useFilterStore();

  const barChart = useChartSize();
  const lineChart = useChartSize();

  const fetchData = useCallback(async () => {
    setLoading(true);
    const filterParams = getFilterParams();
    const [incomeRes, expenseRes] = await Promise.all([
      getAllIncome(filterParams),
      getAllExpenses(filterParams)
    ]);
    if (incomeRes?.success && incomeRes.result) setIncomeList(incomeRes.result as Income[]);
    if (expenseRes?.success && expenseRes.result) setExpenseList(expenseRes.result as Expense[]);
    setLoading(false);
  }, [getFilterParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalIncome = incomeList.reduce((sum, i) => sum + i.amount, 0);
  const totalExpense = expenseList.reduce((sum, e) => sum + e.amount, 0);
  const netCashFlow = totalIncome - totalExpense;

  const groupByMonth = (items: (Income | Expense)[]) => {
    const grouped: { [key: string]: number } = {};
    items.forEach(item => {
      if (item.createdAt) {
        const date = new Date(item.createdAt);
        const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
        grouped[monthYear] = (grouped[monthYear] || 0) + item.amount;
      }
    });
    return grouped;
  };

  const incomeByMonth = groupByMonth(incomeList);
  const expenseByMonth = groupByMonth(expenseList);
  const allMonths = Array.from(new Set([...Object.keys(incomeByMonth), ...Object.keys(expenseByMonth)]));
  const chartData = allMonths
    .map(month => ({
      month,
      income: incomeByMonth[month] || 0,
      expense: expenseByMonth[month] || 0,
      net: (incomeByMonth[month] || 0) - (expenseByMonth[month] || 0)
    }))
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

  if (loading) {
    return (
      <div className="mt-7 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="h-96 bg-slate-200 rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <div className="mt-7">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-6 border rounded-lg bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Income</p>
              <h3 className="text-2xl font-bold text-green-600">Rp {totalIncome.toLocaleString("id-ID")}</h3>
            </div>
            <TrendingUp className="text-green-600" size={32} />
          </div>
        </div>
        <div className="p-6 border rounded-lg bg-red-50 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Expenses</p>
              <h3 className="text-2xl font-bold text-red-600">Rp {totalExpense.toLocaleString("id-ID")}</h3>
            </div>
            <TrendingDown className="text-red-600" size={32} />
          </div>
        </div>
        <div className={`p-6 border rounded-lg ${netCashFlow >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Net Cash Flow</p>
              <h3 className={`text-2xl font-bold ${netCashFlow >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                Rp {netCashFlow.toLocaleString("id-ID")}
              </h3>
            </div>
            <Banknote className={netCashFlow >= 0 ? 'text-blue-600' : 'text-orange-600'} size={32} />
          </div>
        </div>
      </div>

      {chartData.length > 0 ? (
        <>
          {/* Bar Chart */}
          <div className="border rounded-lg p-5 mb-6 flex flex-col h-[370px]">
            <h3 className="font-bold text-lg mb-2 shrink-0">Income vs Expenses</h3>
            {/* Langsung ref di sini, kasih explicit height */}
            <div ref={barChart.ref} className="flex-1 w-full min-h-0">
              {barChart.width > 0 && barChart.height > 0 && (
                <BarChart
                  width={barChart.width}
                  height={barChart.height}
                  data={chartData}
                  margin={{ top: 5, right: 8, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={formatRupiah} />
                  <Tooltip formatter={(value) => `Rp ${Number(value).toLocaleString("id-ID")}`} />
                  <Legend />
                  <Bar dataKey="income" fill="#22c55e" name="Income" />
                  <Bar dataKey="expense" fill="#ef4444" name="Expenses" />
                </BarChart>
              )}
            </div>
          </div>

          {/* Line Chart */}
          <div className="border rounded-lg p-5 flex flex-col h-[370px]">
            <h3 className="font-bold text-lg mb-2 shrink-0">Net Cash Flow Trend</h3>
            <div ref={lineChart.ref} className="flex-1 w-full min-h-0">
              {lineChart.width > 0 && lineChart.height > 0 && (
                <LineChart
                  width={lineChart.width}
                  height={lineChart.height}
                  data={chartData}
                  margin={{ top: 5, right: 8, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={formatRupiah} />
                  <Tooltip formatter={(value) => `Rp ${Number(value).toLocaleString("id-ID")}`} />
                  <Legend />
                  <Line type="monotone" dataKey="net" stroke="#8b5cf6" strokeWidth={2} name="Net Cash Flow" />
                </LineChart>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="border rounded-lg p-12 text-center text-gray-500">
          <p>No data available for the selected period</p>
        </div>
      )}
    </div>
  );
}