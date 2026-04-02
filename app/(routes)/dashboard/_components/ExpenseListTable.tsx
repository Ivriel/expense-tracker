"use client";

import { Expense } from "@/db/schema";
import React from "react";
import { DataTable } from "../expenses/data-table";
import { ColumnDef } from "@tanstack/react-table";
import DeleteExpenseButton from "../expenses/_components/DeleteExpenseButton";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type ExpenseTable = Expense & { budgetName: string | null };

export const createDashboardColumns = (
  refreshData: () => void,
): ColumnDef<ExpenseTable>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Expense Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(amount);
      return <div className="font-medium mr-4">{formatted}</div>;
    },
  },
  {
    accessorKey: "budgetName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          From Budget Of
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const budgetName = row.getValue("budgetName") as string | null;
      return (
       <Link href={`/dashboard/expenses/${row.original.budgetId}`}>
        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800 ml-4">
          {budgetName || "-"}
        </span>
       </Link>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date | null;
      if (!date) return <div>-</div>;
      return (
        <div className="text-gray-500">
          {new Date(date).toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const expense = row.original;
      return (
        <DeleteExpenseButton expense={expense} refreshData={refreshData} />
      );
    },
  },
];

import ExpenseTableSkeleton from "../expenses/_components/ExpenseTableSkeleton";

export default function ExpenseListTable({
  expenseList,
  budgetList,
  refreshData,
  loading = false,
}: {
  expenseList: Expense[];
  budgetList?: { id: number; name: string }[];
  refreshData: () => void;
  loading?: boolean;
}) {
  const columns = createDashboardColumns(refreshData);

  const enrichedExpenseList = expenseList.map((expense) => {
    const budget = budgetList?.find((b) => b.id === expense.budgetId);
    return {
      ...expense,
      budgetName: budget?.name || null,
    };
  });

  if (loading) {
    return <ExpenseTableSkeleton />;
  }

  return (
    <div className="mt-3">
      <DataTable columns={columns} data={enrichedExpenseList} />
    </div>
  );
}
