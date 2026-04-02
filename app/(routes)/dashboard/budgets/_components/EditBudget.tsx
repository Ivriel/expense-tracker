"use client";
import { Button } from "@/components/ui/button";
import { Edit2, Loader2 } from "lucide-react";
import { BudgetWithStats, updateBudget } from "@/server/budget";
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
import EmojiPicker from "emoji-picker-react";
import { toast } from "sonner";

export default function EditBudget({
  budget,
  refreshData,
}: {
  budget: BudgetWithStats;
  refreshData: () => void;
}) {
  const [emojiIcon, setEmojiIcon] = useState(budget?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState(budget?.name);
  const [amount, setAmount] = useState(budget?.amount);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setName(budget?.name || "");
      setAmount(budget?.amount || 0);
      setEmojiIcon(budget?.icon || "💰");
    }
  }, [isOpen, budget]);

  async function onEditBudget(name: string, amount: number, icon: string) {
    try {
      setIsLoading(true);
      const result = await updateBudget(budget.id, {
        name,
        amount,
        icon,
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
      toast.error("Failed to edit budget");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="cursor-pointer">
            <Edit2 className="size-4 mr-2" />
            Edit Budget
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Existing Budget</DialogTitle>
          </DialogHeader>
          <div className="mt-5">
            <Button
              variant="outline"
              size="lg"
              className="text-2xl"
              onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
            >
              {emojiIcon}
            </Button>
            <div className="absolute z-20">
              {openEmojiPicker && (
                <EmojiPicker
                  onEmojiClick={(e) => {
                    setEmojiIcon(e.emoji);
                    setOpenEmojiPicker(false);
                  }}
                />
              )}
            </div>
            <div className="mt-2">
              <Label
                htmlFor="budget-name"
                className="text-slate-600 font-semibold mb-2 block"
              >
                Budget Name
              </Label>
              <Input
                id="budget-name"
                className="mt-1 focus-visible:ring-purple-400"
                placeholder="e.g. Groceries"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="mt-2">
              <Label
                htmlFor="budget-amount"
                className="text-slate-600 font-semibold mb-2 block"
              >
                Budget Amount
              </Label>
              <Input
                id="budget-amount"
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
              onClick={() => onEditBudget(name, amount, emojiIcon || "")}
              disabled={!(name && amount) || isLoading}
              className={`bg-purple-500 hover:bg-purple-600 ${isLoading || !(name && amount) ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Update Budget"
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
