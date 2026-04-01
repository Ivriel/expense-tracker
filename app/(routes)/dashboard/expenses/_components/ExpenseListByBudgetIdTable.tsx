"use client"

import { Expense } from '@/db/schema'
import { DataTable } from '../data-table'
import { createColumns } from '../columns'
import ExpenseTableSkeleton from './ExpenseTableSkeleton'

export default function ExpenseListByBudgetIdTable({
    expensesListByBudgetId,
    refreshData,
}: {
    expensesListByBudgetId: Expense[] | null
    refreshData: () => void
}) {
    if (expensesListByBudgetId === null) {
        return <ExpenseTableSkeleton />
    }

    const columns = createColumns(refreshData)

    return (
        <div className='mt-3'>
            <DataTable columns={columns} data={expensesListByBudgetId} />
        </div>
    )
}
