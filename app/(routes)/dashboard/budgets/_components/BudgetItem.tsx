import { BudgetWithStats } from "@/server/budget";
import Link from "next/link";

export default function BudgetItem({ budget }: { budget: BudgetWithStats }) {
  // --- 3C: LOGIKA KALKULASI ---
  const totalSpend = budget.totalSpend || 0;
  const remaining = budget.amount - totalSpend;

  // Math.min memastikan bar tidak "jebol" keluar kotak (max 100%)
  const spendPercent = Math.min((totalSpend / budget.amount) * 100, 100);
  const remainingPercent = Math.min((remaining / budget.amount) * 100, 100);

  const isOverBudget = totalSpend > budget.amount;

  // --- 4E: LOGIKA WARNA (VERSI GAMPANG DIBACA) ---
  // Kita tentukan warna di sini, bukan di dalam return
  const getStatusColor = () => {
    if (isOverBudget) {
      return "bg-red-400"; // Warna merah kalau boncos
    }
    if (spendPercent > 80) {
      return "bg-amber-400"; // Warna kuning kalau udah mau habis (warning)
    }
    return "bg-linear-to-r from-purple-400 to-violet-500"; // Warna ungu kalau aman
  };

  const statusColor = getStatusColor();

  return (
    <Link
      href={`/dashboard/expenses/${budget.id}`}
      className="group relative p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden"
    >
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-purple-400 via-purple-600 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      {/* Header */}
      <div className="flex gap-3 justify-between items-start">
        <div className="flex gap-3 items-center">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-50 rounded-xl text-2xl shrink-0 group-hover:scale-110 transition-transform duration-200">
            {budget?.icon}
          </div>
          <div>
            <h2 className="font-semibold text-slate-800 leading-tight">
              {budget.name}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {budget.totalItems} {budget.totalItems === 1 ? "item" : "items"}
            </p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs font-bold text-black mb-0.5">Budget</p>
          <h2 className="font-bold text-purple-600 text-base leading-tight">
            {/* 4C: Format Mata Uang Indonesia */}
            Rp {budget.amount?.toLocaleString("id-ID")}
          </h2>
        </div>
      </div>

      {/* Stats & Progress */}
      <div className="mt-5 space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Used</p>
            <p
              className={`text-sm font-semibold ${isOverBudget ? "text-red-500" : "text-slate-700"}`}
            >
              Rp {totalSpend.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400">Remaining</p>
            <p
              className={`text-sm font-semibold ${isOverBudget ? "text-red-500" : "text-emerald-600"}`}
            >
              {isOverBudget ? "- " : ""}Rp{" "}
              {/* 4C: Math.abs agar angka negatif jadi positif (minusnya kita tulis manual di atas) */}
              {Math.abs(remaining).toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            /* 4E: Menggunakan variabel statusColor yang sudah rapi */
            className={`h-2 rounded-full transition-all duration-500 ${statusColor}`}
            style={{ width: `${spendPercent}%` }}
          />
        </div>

        <div className="flex justify-between items-center">
          {/* Percent label */}

          <p className="text-xs text-slate-400">
            {spendPercent.toFixed(2)}% Used
          </p>
          <p className="text-xs text-slate-400 text-right">
            {remainingPercent.toFixed(2)}% Remaining
          </p>
        </div>
      </div>
    </Link>
  );
}
