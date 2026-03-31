"use client"
import { useCallback, useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { getAllBudget, BudgetWithStats } from "@/server/budget";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";
import BudgetListSkeleton from "./BudgetListSkeleton";

// Budget dari query join punya field tambahan yang tidak ada di schema inferSelect


export default function BudgetList() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState<BudgetWithStats[]>([]);
  const [loading, setLoading] = useState(true); // true = skeleton langsung tampil sebelum fetch selesai

  // fetchBudgets didefinisikan di level komponen agar bisa di-pass sebagai prop
  const fetchBudgets = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const response = await getAllBudget();
    if (response?.success && response.result) {
      setBudgetList(response.result as BudgetWithStats[]);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchBudgets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
        <CreateBudget refreshData={fetchBudgets} />
        {loading ? (
         [1,2,3,4,5].map((item,index)=>(
            <BudgetListSkeleton key={index}/>
         ))
        ) : (
          budgetList.map((budget, index) => (
        <BudgetItem budget={budget} key={index} />
        )))}
      </div>
    </div>
  );
}
