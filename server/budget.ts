"use server"

import { db } from "@/db/drizzle"
import { budgets, InsertBudget } from "@/db/schema"
import { currentUser } from "@clerk/nextjs/server"


export const createBudget = async (data: Omit<InsertBudget, "id" | "createdAt" | "createdBy">) => {
    try {
        const user = await currentUser()
        
        const newBudget: InsertBudget = {
            ...data,
            createdBy: user?.primaryEmailAddress?.emailAddress ?? ""
        }

        const result = await db.insert(budgets).values(newBudget).returning({insertedId:budgets.id,budgetName:budgets.name})
        
        return { success: true, message: "Budget created successfully", result: result }
    } catch (error) {
        console.log(error)
        return { success: false, message: "Failed to create budget" }
    }
}