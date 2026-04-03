"use server"

import { db } from "@/db/drizzle"
import { goals, InsertGoal } from "@/db/schema"
import { currentUser } from "@clerk/nextjs/server"
import { and, desc, eq, getTableColumns } from "drizzle-orm"
import { buildDateFilter } from "./dateFilter"
import { TimeRangeType } from "@/store/useFilterStore"

export const createGoal = async(data:Omit<InsertGoal,"id" | "createdAt" | "createdBy">)=> {
    try {
        const user = await currentUser()
        const newGoal: InsertGoal = {
            ...data,
            createdBy: user?.primaryEmailAddress?.emailAddress ?? ""
        }
        const result = await db.insert(goals).values(newGoal).returning({insertedId:goals.id,goalName:goals.name})
        return { success: true, message: "Goal created successfully", result: result }
    } catch (error) {
        console.log(error)
        return { success: false, message: "Failed to create goal" }
    }
}

export const deleteGoal = async(id:number)=> {
    try {
        const user = await currentUser()
        await db.delete(goals)
         .where(
            and(
                eq(goals.createdBy, user?.primaryEmailAddress?.emailAddress ?? ""),
                eq(goals.id, id) 
            )
        ).returning({deletedId:goals.id})
        return { success: true, message: "Goal deleted successfully" }
    } catch (error) {
        console.log(error)
        return { success: false, message: "Failed to delete goal" }
    }
}

export const updateGoal = async(id:number,data:Omit<InsertGoal,"id" | "createdAt" | "createdBy">)=> {
    try {
        const user = await currentUser()
        const result = await db.update(goals)
         .set(data)
         .where(
            and(
                eq(goals.createdBy, user?.primaryEmailAddress?.emailAddress ?? ""),
                eq(goals.id, id) 
            )
        ).returning({updatedId:goals.id})
        return { success: true, message: "Goal updated successfully", result: result }
    } catch (error) {
        console.log(error)
        return { success: false, message: "Failed to update goal" }
    }
}

export const getAllGoals = async(filterParams?: { month?: number; year?: number; type: TimeRangeType })=> {
    try {
        const user = await currentUser()
        const dateFilter = buildDateFilter(filterParams, goals.createdAt);
        
        const result = await db.select(getTableColumns(goals))
        .from(goals)
        .where(
            and(
                eq(goals.createdBy, user?.primaryEmailAddress?.emailAddress ?? ""),
                dateFilter
            )
        )
        .orderBy(desc(goals.createdAt))
        return { success: true, message: "Goals fetched successfully", result: result }
    } catch (error) {
        console.log(error)
        return { success: false, message: "Failed to fetch goals" }
    }
}

export const addToGoal = async(id:number, amount:number)=> {
    try {
        const user = await currentUser()
        const goal = await db.select().from(goals)
         .where(
            and(
                eq(goals.createdBy, user?.primaryEmailAddress?.emailAddress ?? ""),
                eq(goals.id, id) 
            )
        )
        
        if (!goal[0]) {
            return { success: false, message: "Goal not found" }
        }

        const newAmount = (goal[0].currentAmount || 0) + amount
        
        const result = await db.update(goals)
         .set({ currentAmount: newAmount })
         .where(eq(goals.id, id))
         .returning({updatedId:goals.id})
        
        return { success: true, message: "Amount added to goal successfully", result: result }
    } catch (error) {
        console.log(error)
        return { success: false, message: "Failed to add amount to goal" }
    }
}
