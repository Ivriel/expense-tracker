"use client";
import { Button } from "@/components/ui/button";
import { Edit2, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Expense } from "@/db/schema";
import { updateExpense } from "@/server/expense";

export default function EditExpense({
  expense,
  refreshData,
}: {
  expense: Expense;
  refreshData: () => void;
}) {
  const [name, setName] = useState(expense?.name);
  const [amount, setAmount] = useState(expense?.amount);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setName(expense?.name || "");
      setAmount(expense?.amount || 0);
    }
  }, [isOpen, expense]);

  async function onEditExpense(name: string, amount: number) {
    try {
      setIsLoading(true);
      const result = await updateExpense(expense.id, {
        name,
        amount,
      });
      if (result.success) {
        setIsOpen(false)
        toast.success(result.message);
        refreshData();
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to edit expense");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="cursor-pointer">
            <Edit2 className="size-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Existing Expense</DialogTitle>
          </DialogHeader>
          <div className="mt-5">
            <div className="mt-2">
              <Label
                htmlFor="expense-name"
                className="text-slate-600 font-semibold mb-2 block"
              >
                Expense Name
              </Label>
              <Input
                id="expense-name"
                className="mt-1 focus-visible:ring-purple-400"
                placeholder="e.g. Groceries"
                onChange={(e) => setName(e.target.value)}
                value={name}
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
                placeholder="e.g. Rp 10000"
                type="number"
                className="mt-1 focus-visible:ring-purple-400"
                onChange={(e) => setAmount(Number(e.target.value))}
                value={amount || ""}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button
              onClick={() => onEditExpense(name, amount)}
              disabled={!(name && amount) || isLoading}
              className={`bg-purple-500 hover:bg-purple-600 ${isLoading || !(name && amount) ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Update Expense"
              )}
            </Button>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="cursor-pointer hover:bg-slate-200"
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
