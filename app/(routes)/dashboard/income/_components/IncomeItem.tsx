import { Income } from "@/db/schema";
import Link from "next/link";

export default function IncomeItem({ income }: { income: Income }) {
  const formattedDate = new Date(income.createdAt!).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link href={`/dashboard/incomes/${income.id}`}>
      <div className="group relative p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

        {/* Header */}
        <div className="flex gap-3 justify-between items-start">
          <div className="flex gap-3 items-center">
            <div className="flex items-center justify-center w-11 h-11 bg-emerald-50 rounded-xl text-xl shrink-0 group-hover:scale-110 transition-transform duration-200">
              {income.icon}
            </div>
            <div>
              <h2 className="font-semibold text-slate-800 leading-tight">
                {income.name}
              </h2>
              <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full">
                Income
              </span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs font-bold text-black mb-0.5">Amount</p>
            <h2 className="font-bold text-emerald-600 text-base leading-tight">
              Rp {income.amount.toLocaleString("id-ID")}
            </h2>
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-slate-100" />

        {/* Meta */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-slate-400">Created by</p>
            <p className="text-sm text-slate-700">@{income.createdBy}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400">Date</p>
            <p className="text-sm text-slate-700">{formattedDate}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}