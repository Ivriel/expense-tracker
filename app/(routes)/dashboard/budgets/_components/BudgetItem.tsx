import { BudgetWithStats } from "@/server/budget";

export default function BudgetItem({ budget }: { budget: BudgetWithStats }) {
  const totalSpend = budget.totalSpend || 0;
  const remaining = budget.amount - totalSpend;
  const spendPercent = Math.min((totalSpend / budget.amount) * 100, 100);
  const isOverBudget = totalSpend > budget.amount;

  return (
    <div className="group relative p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-purple-400 via-purple-600 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      {/* Header */}
      <div className="flex gap-3 justify-between items-start">
        <div className="flex gap-3 items-center">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-50 rounded-xl text-2xl shrink-0 group-hover:scale-110 transition-transform duration-200">
            {budget?.icon}
          </div>
          <div>
            <h2 className="font-semibold text-slate-800 leading-tight">{budget.name}</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {budget.totalItems} {budget.totalItems === 1 ? "item" : "items"}
            </p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs text-slate-400 mb-0.5">Budget</p>
          <h2 className="font-bold text-purple-600 text-base leading-tight">
            Rp {budget.amount?.toLocaleString("id-ID")}
          </h2>
        </div>
      </div>

      {/* Stats & Progress */}
      <div className="mt-5 space-y-2.5">
        {/* Spend info row */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Used</p>
            <p className={`text-sm font-semibold ${isOverBudget ? "text-red-500" : "text-slate-700"}`}>
              Rp {totalSpend.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400">Remaining</p>
            <p className={`text-sm font-semibold ${isOverBudget ? "text-red-500" : "text-emerald-600"}`}>
              {isOverBudget ? "- " : ""}Rp {Math.abs(remaining).toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              isOverBudget
                ? "bg-red-400"
                : spendPercent > 80
                ? "bg-amber-400"
                : "bg-linear-to-r from-purple-400 to-violet-500"
            }`}
            style={{ width: `${spendPercent}%` }}
          />
        </div>

        {/* Percent label */}
        <p className="text-xs text-slate-400 text-right">
          {spendPercent.toFixed(0)}% Used
        </p>
      </div>
    </div>
  );
}