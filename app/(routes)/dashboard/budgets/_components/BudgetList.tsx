"use client"
import { useCallback, useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { getAllBudget, BudgetWithStats } from "@/server/budget";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";
import BudgetListSkeleton from "./BudgetListSkeleton";
import { useFilterStore } from "@/store/useFilterStore";

export default function BudgetList() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState<BudgetWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const { getFilterParams } = useFilterStore();

  const fetchBudgets = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const filterParams = getFilterParams();
    const response = await getAllBudget(filterParams);
    if (response?.success && response.result) {
      setBudgetList(response.result as BudgetWithStats[]);
    }
    setLoading(false);
  }, [user, getFilterParams]);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
        <CreateBudget refreshData={fetchBudgets} />
        {loading ? (
          [1, 2, 3, 4, 5].map((item, index) => (
            <BudgetListSkeleton key={index} />
          ))
        ) : (
          budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          )))}
      </div>
    </div>
  );
}
