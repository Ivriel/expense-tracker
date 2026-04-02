"use client"
import { useCallback, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Income } from "@/db/schema";
import { getAllIncome } from "@/server/income";
import CreateIncome from "./CreateIncome";
import IncomeItem from "./IncomeItem";
import IncomeListSkeleton from "./IncomeListSkeleton";

// Budget dari query join punya field tambahan yang tidak ada di schema inferSelect


export default function IncomeList() {
  const { user } = useUser();
  const [incomeList, setIncomeList] = useState<Income[]>([]);
  const [loading, setLoading] = useState(true); // true = skeleton langsung tampil sebelum fetch selesai

  // fetchBudgets didefinisikan di level komponen agar bisa di-pass sebagai prop
  const fetchIncomes = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const response = await getAllIncome();
    if (response?.success && response.result) {
      setIncomeList(response.result as Income[]);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchIncomes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
        <CreateIncome refreshData={fetchIncomes} />
        {loading ? (
         [1,2,3,4,5].map((item,index)=>(
            <IncomeListSkeleton key={index}/>
         ))
        ) : (
          incomeList.map((income, index) => (
        <IncomeItem income={income} key={index} />
        )))}
      </div>
    </div>
  );
}
