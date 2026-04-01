"use server"

import { db } from "@/db/drizzle"
import { InsertExpense, expenses } from "@/db/schema"
import { currentUser } from "@clerk/nextjs/server"
import { and, desc, eq } from "drizzle-orm"

export const createExpense = async (data:Omit<InsertExpense,'id'|'createdAt'|'createdBy'>) => {
    try {
        const user = await currentUser()
        const newExpense:InsertExpense = {
            ...data,
            createdBy:user?.primaryEmailAddress?.emailAddress ?? ""
        }
        const result = await db.insert(expenses).values(newExpense).returning({insertedId:expenses.id})
        return { success: true, message: "Expense created successfully", result: result }
    } catch (error) {
        console.log(error)
        return { success: false, message: "Failed to create expense" }
    }
}

export const getAllExpensesByBudgetId = async(budgetId:number)=> {
    try {
        const user = await currentUser()
        const result = await db.select().from(expenses)
         .where(
            and(
                eq(expenses.createdBy, user?.primaryEmailAddress?.emailAddress ?? ""),
                eq(expenses.budgetId, budgetId) 
            )
        )
        .orderBy(desc(expenses.createdAt))
        console.log("result",result)
        return { success: true, message: "Expenses fetched successfully", result: result }
    } catch (error) {
        console.log(error)
        return { success: false, message: "Failed to fetch expenses" }
    }
}

export const deleteExpense = async(expenseId:number)=> {
    try {
        const user = await currentUser()
        await db.delete(expenses)
         .where(
            and(
                eq(expenses.createdBy, user?.primaryEmailAddress?.emailAddress ?? ""),
                eq(expenses.id, expenseId) 
            )
        ).returning({deletedId:expenses.id})
        return { success: true, message: "Expense deleted successfully" }
    } catch (error) {
        console.log(error)
        return { success: false, message: "Failed to delete expense" }
    }
}