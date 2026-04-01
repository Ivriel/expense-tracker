"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Expense } from "@/db/schema"
import DeleteExpenseButton from "./_components/DeleteExpenseButton"

export const createColumns = (refreshData: () => void): ColumnDef<Expense>[] => [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "amount",
        header:"Amount",
        cell: ({ row }) => {
            const amount = row.getValue("amount") as number
            const formatted = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }).format(amount)
            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            const date = row.getValue("createdAt") as Date | null
            if (!date) return <div>-</div>
            return <div>{new Date(date).toString()}</div>
        },
    },
    {
        id: "actions",
        header: "Action",
        cell: ({ row }) => {
            const expense = row.original
            return (
               <DeleteExpenseButton expense={expense} refreshData={refreshData} />
            )
        },
    },
]