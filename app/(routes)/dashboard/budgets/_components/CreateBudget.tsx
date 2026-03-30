"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

export default function CreateBudget() {
  const [emojiIcon, setEmojiIcon] = useState("💰");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="border-2 border-dashed flex flex-col items-center justify-center p-5 mt-5 rounded-lg hover:bg-slate-100 hover:shadow-md cursor-pointer">
            <h2 className="text-3xl">+</h2>
            <h2 className="text-lg">Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                <div>{openEmojiPicker ? <EmojiPicker open={openEmojiPicker} onEmojiClick={(e)=>setEmojiIcon(e.emoji)}/> : null}</div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
