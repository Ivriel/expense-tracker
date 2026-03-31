"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createExpense } from "@/server/expense";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function AddExpense({
  budgetId,
  refreshData,
}: {
  budgetId: number;
  refreshData: () => void;
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const resetForm = () => {
    setName("");
    setAmount("");
  };

  async function addNewExpense() {
    try {
      setIsLoading(true);
      const result = await createExpense({
        name,
        amount: Number(amount),
        budgetId,
      });
      if (result.success) {
        toast.success(result.message);
        resetForm();
        refreshData();
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add expense");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="border p-5 rounded-lg shadow-sm border-slate-100">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <Label
          htmlFor="expense-name"
          className="text-slate-600 font-semibold mb-2 block"
        >
          Expense Name
        </Label>
        <Input
          id="expense-name"
          value={name}
          className="mt-1 focus-visible:ring-purple-400"
          placeholder="e.g. Groceries"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <Label
          htmlFor="expense-amount"
          className="text-slate-600 font-semibold mb-2 block"
        >
          Expense Amount
        </Label>
        <Input
          id="expense-amount"
          value={amount}
          className="mt-1 focus-visible:ring-purple-400"
          placeholder="e.g. 10000"
          type="number"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button
        onClick={() => addNewExpense()}
        disabled={isLoading || !(name && amount)}
        className="w-full mt-3 cursor-pointer bg-purple-500 hover:bg-purple-600"
      >
        {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Add New Expense"}
      </Button>
    </div>
  );
}
