"use server"

import { db } from "@/db/drizzle"
import { InsertExpense, expenses } from "@/db/schema"
import { currentUser } from "@clerk/nextjs/server"

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