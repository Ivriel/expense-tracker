"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createGoal } from "@/server/goal";
import { toast } from "sonner";

interface Props {
  refreshData: () => void;
}

export default function CreateGoal({ refreshData }: Props) {
  const [emojiIcon, setEmojiIcon] = useState("🎯");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [open, setOpen] = useState(false);

  const onCreateGoal = async () => {
    if (!name || !targetAmount) {
      toast.error("Please fill all fields");
      return;
    }

    const result = await createGoal({
      name: name,
      targetAmount: parseInt(targetAmount),
      currentAmount: 0,
      icon: emojiIcon,
    });

    if (result?.success) {
      refreshData();
      toast.success("Goal created successfully");
      setName("");
      setTargetAmount("");
      setEmojiIcon("🎯");
      setOpen(false);
    } else {
      toast.error("Failed to create goal");
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md h-full justify-center">
            <h2 className="text-3xl">+</h2>
            <h2>Create New Goal</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Goal</DialogTitle>
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
          <DialogFooter className="sm:justify-start">
            <Button
              disabled={!(name && targetAmount)}
              onClick={onCreateGoal}
              className="mt-5 w-full"
            >
              Create Goal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
