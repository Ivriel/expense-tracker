"use client";
import React, { useState } from "react";
import { Goal } from "@/db/schema";
import { Trash, Edit, Plus } from "lucide-react";
import { deleteGoal, updateGoal, addToGoal } from "@/server/goal";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EmojiPicker from "emoji-picker-react";

interface Props {
  goal: Goal;
  refreshData: () => void;
}

export default function GoalItem({ goal, refreshData }: Props) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState(goal.name);
  const [targetAmount, setTargetAmount] = useState(goal.targetAmount.toString());
  const [emojiIcon, setEmojiIcon] = useState(goal.icon || "🎯");
  const [addAmount, setAddAmount] = useState("");

  const progress = ((goal.currentAmount / goal.targetAmount) * 100).toFixed(1);

  const onDeleteGoal = async () => {
    const result = await deleteGoal(goal.id);
    if (result?.success) {
      toast.success("Goal deleted successfully");
      refreshData();
    } else {
      toast.error("Failed to delete goal");
    }
  };

  const onUpdateGoal = async () => {
    if (!name || !targetAmount) {
      toast.error("Please fill all fields");
      return;
    }

    const result = await updateGoal(goal.id, {
      name: name,
      targetAmount: parseInt(targetAmount),
      currentAmount: goal.currentAmount,
      icon: emojiIcon,
    });

    if (result?.success) {
      toast.success("Goal updated successfully");
      refreshData();
      setOpenEdit(false);
    } else {
      toast.error("Failed to update goal");
    }
  };

  const onAddToGoal = async () => {
    if (!addAmount || parseInt(addAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const result = await addToGoal(goal.id, parseInt(addAmount));

    if (result?.success) {
      toast.success("Amount added successfully");
      refreshData();
      setAddAmount("");
      setOpenAdd(false);
    } else {
      toast.error("Failed to add amount");
    }
  };

  return (
    <div className="p-5 border rounded-lg hover:shadow-md cursor-pointer h-full flex flex-col justify-between">
      <div>
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">
              {goal.icon}
            </h2>
            <div>
              <h2 className="font-bold">{goal.name}</h2>
              <h2 className="text-sm text-gray-500">
                {goal.currentAmount.toLocaleString("id-ID")} / {goal.targetAmount.toLocaleString("id-ID")}
              </h2>
            </div>
          </div>
          <div className="flex gap-2">
            <Dialog open={openAdd} onOpenChange={setOpenAdd}>
              <DialogTrigger asChild>
                <Plus className="text-green-600 cursor-pointer hover:scale-110 transition-all" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add to Goal</DialogTitle>
                  <DialogDescription>
                    <div className="mt-5">
                      <h2 className="text-black font-medium my-1">Amount to Add</h2>
                      <Input
                        type="number"
                        placeholder="e.g. 500000"
                        onChange={(e) => setAddAmount(e.target.value)}
                        value={addAmount}
                      />
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    disabled={!addAmount}
                    onClick={onAddToGoal}
                    className="w-full"
                  >
                    Add Amount
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={openEdit} onOpenChange={setOpenEdit}>
              <DialogTrigger asChild>
                <Edit className="text-blue-600 cursor-pointer hover:scale-110 transition-all" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Goal</DialogTitle>
                  <DialogDescription>
                    <div className="mt-5">
                      <Button
                        variant="outline"
                        size="lg"
                        className="text-lg"
                        onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                      >
                        {emojiIcon}
                      </Button>
                      <div className="absolute z-10">
                        <EmojiPicker
                          open={openEmojiPicker}
                          onEmojiClick={(e) => {
                            setEmojiIcon(e.emoji);
                            setOpenEmojiPicker(false);
                          }}
                        />
                      </div>
                      <div className="mt-2">
                        <h2 className="text-black font-medium my-1">Goal Name</h2>
                        <Input
                          placeholder="e.g. Emergency Fund"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                        />
                      </div>
                      <div className="mt-2">
                        <h2 className="text-black font-medium my-1">Target Amount</h2>
                        <Input
                          type="number"
                          placeholder="e.g. 10000000"
                          onChange={(e) => setTargetAmount(e.target.value)}
                          value={targetAmount}
                        />
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    disabled={!(name && targetAmount)}
                    onClick={onUpdateGoal}
                    className="w-full"
                  >
                    Update Goal
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Trash className="text-red-600 cursor-pointer hover:scale-110 transition-all" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your goal.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onDeleteGoal}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs text-slate-400">Progress</h2>
            <h2 className="text-xs text-slate-400">{progress}%</h2>
          </div>
          <div className="w-full bg-slate-300 h-2 rounded-full">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all"
              style={{ width: `${Math.min(parseFloat(progress), 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
