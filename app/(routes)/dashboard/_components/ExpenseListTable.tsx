"use client";

import { Expense } from "@/db/schema";
import { DataTable } from "../expenses/data-table";
import { ColumnDef } from "@tanstack/react-table";
import DeleteExpenseButton from "../expenses/_components/DeleteExpenseButton";

type ExpenseTable = Expense & { budgetName: string | null };

export const createDashboardColumns = (
  refreshData: () => void,
): ColumnDef<ExpenseTable>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "amount",
    header: "Expense Amount",
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "budgetName",
    header: "From Budget Of",
    cell: ({ row }) => {
      const budgetName = row.getValue("budgetName") as string | null;
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
          {budgetName || "-"}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
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

export default function ExpenseListTable({
  expenseList,
  budgetList,
  refreshData,
}: {
  expenseList: Expense[];
  budgetList?: { id: number; name: string }[];
  refreshData: () => void;
}) {
  const columns = createDashboardColumns(refreshData);

  const enrichedExpenseList = expenseList.map((expense) => {
    const budget = budgetList?.find((b) => b.id === expense.budgetId);
    return {
      ...expense,
      budgetName: budget?.name || null,
    };
  });

  return (
    <div className="mt-3">
      <DataTable columns={columns} data={enrichedExpenseList} />
    </div>
  );
}
