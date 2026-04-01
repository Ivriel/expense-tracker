"use client";
import { Button } from "@/components/ui/button";
import { Expense } from "@/db/schema";
import { deleteExpense } from "@/server/expense";
import { Loader2, Trash2 } from "lucide-react";
import React, { useState } from "react";
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

export default function DeleteExpenseButton({
  expense,
  refreshData,
}: {
  expense: Expense;
  refreshData: () => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const result = await deleteExpense(expense.id);
      if (result.success) {
        toast.success(result.message);
        refreshData();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to delete expense");
      console.error("Error deleting expense", error);
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="cursor-pointer"
          disabled={isDeleting}
        >
          {isDeleting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Trash2 className="size-4" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            expense.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="cursor-pointer bg-purple-500 hover:bg-purple-600">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
