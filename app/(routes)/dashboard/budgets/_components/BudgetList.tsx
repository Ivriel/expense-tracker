"use client"
import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { getAllBudget, BudgetWithStats } from "@/server/budget";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import BudgetItem from "./BudgetItem";

// Budget dari query join punya field tambahan yang tidak ada di schema inferSelect


export default function BudgetList() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState<BudgetWithStats[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    // Definisikan fungsi async di dalam effect — pattern yang direkomendasikan React
    const fetchBudgets = async () => {
      setLoading(true);
      const response = await getAllBudget();
      if (response?.success && response.result) {
        setBudgetList(response.result as BudgetWithStats[]);
      }
      setLoading(false);
    };

    fetchBudgets();
  }, [user]);

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
        <CreateBudget />
        {loading ? (
          <div className="col-span-full flex items-center justify-center">
            <Loader2 className="size-8 animate-spin" />
          </div>
        ) : (
          budgetList.map((budget, index) => (
        <BudgetItem budget={budget} key={index} />
        )))}
      </div>
    </div>
  );
}
