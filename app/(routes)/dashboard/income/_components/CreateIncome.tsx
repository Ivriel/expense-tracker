"use client";
import { Button } from "@/components/ui/button";
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
import { createIncome } from "@/server/income";
import EmojiPicker from "emoji-picker-react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateIncome({ refreshData }: { refreshData: () => void }) {
  const [emojiIcon, setEmojiIcon] = useState("💰");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const resetForm = () => {
    setName("");
    setAmount(0);
    setEmojiIcon("💰");
    setOpenEmojiPicker(false);
    setIsLoading(false);
    setIsOpen(false);
  };

  async function onCreateIncome(name: string, amount: number, icon: string) {
    try {
      setIsLoading(true);
      const result = await createIncome({ name, amount, icon });
      if (result.success) {
        refreshData()
        toast.success(result.message);
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create budget");
    } finally {
      setIsLoading(false);
      resetForm();
    }
  }

  return (
    <div className="h-full">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className="h-full border-2 border-dashed flex flex-col items-center justify-center p-5 rounded-lg hover:bg-slate-100 hover:shadow-md cursor-pointer">
            <h2 className="text-3xl">+</h2>
            <h2 className="text-lg">Create New Income</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Income</DialogTitle>
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
                htmlFor="income-name"
                className="text-slate-600 font-semibold mb-2 block"
              >
                Income Name
              </Label>
              <Input
                id="income-name"
                className="mt-1 focus-visible:ring-purple-400"
                placeholder="e.g. Groceries"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mt-2">
              <Label
                htmlFor="income-amount"
                className="text-slate-600 font-semibold mb-2 block"
              >
                Income Amount
              </Label>
              <Input
                id="i -amount"
                placeholder="e.g. 10000"
                type="number"
                className="mt-1 focus-visible:ring-purple-400"
                onChange={(e) => setAmount(Number(e.target.value))}
                required
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
             <Button
                onClick={() => onCreateIncome(name, amount, emojiIcon)}
                disabled={!(name && amount) || isLoading}
                className={`bg-purple-500 hover:bg-purple-600 ${isLoading || !(name && amount) ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  "Create Income"
                )}
              </Button>
            <DialogClose asChild>
             <Button variant="outline" className="cursor-pointer hover:bg-slate-200">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
