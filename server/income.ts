"use server"

import { db } from "@/db/drizzle"
import { incomes, InsertIncome } from "@/db/schema"
import { currentUser } from "@clerk/nextjs/server"
import { and, desc, eq, getTableColumns } from "drizzle-orm"
import { buildDateFilter } from "./dateFilter"
import { TimeRangeType } from "@/store/useFilterStore"

export const createIncome = async (data: Omit<InsertIncome, "id" | "createdAt" | "createdBy">) => {
    try {
        const user = await currentUser()
        const newIncome: InsertIncome = {
            ...data,
            createdBy: user?.primaryEmailAddress?.emailAddress ?? ""
        }
        const result = await db.insert(incomes).values(newIncome).returning({ insertedId: incomes.id, incomeName: incomes.name })
        return { success: true, message: "Income created successfully", result: result }
    } catch (error) {
        console.log(error)
        return { success: false, message: "Failed to create income" }
    }
}

export const deleteIncome = async (id: number) => {
    try {
        const user = await currentUser()
        await db.delete(incomes)
            .where(
                and(
                    eq(incomes.createdBy, user?.primaryEmailAddress?.emailAddress ?? ""),
                    eq(incomes.id, id)
                )
            ).returning({ deletedId: incomes.id })
        return { success: true, message: "Income deleted successfully" }
    } catch (error) {
        console.log(error)
        return { success: false, message: "Failed to delete income" }
    }
}

export const updateIncome = async (id: number, data: Omit<InsertIncome, "id" | "createdAt" | "createdBy">) => {
    try {
        const user = await currentUser()
        const result = await db.update(incomes)
            .set(data)
            .where(
                and(
                    eq(incomes.createdBy, user?.primaryEmailAddress?.emailAddress ?? ""),
                    eq(incomes.id, id)
                )
            ).returning({ updatedId: incomes.id })
        return { success: true, message: "Income updated successfully", result: result }
    } catch (error) {
        console.log(error)
        return { success: false, message: "Failed to update income" }
    }
}

export const getAllIncome = async (filterParams?: { month?: number; year?: number; type: TimeRangeType }) => {
    try {
        const user = await currentUser()
        const dateFilter = buildDateFilter(filterParams, incomes.createdAt);

        const result = await db.select(getTableColumns(incomes))
            .from(incomes)
            .where(
                and(
                    eq(incomes.createdBy, user?.primaryEmailAddress?.emailAddress ?? ""),
                    dateFilter
                )
            )
            .orderBy(desc(incomes.createdAt))
        return { success: true, message: "Income fetched successfully", result: result }
    } catch (error) {
        console.log(error)
        return { success: false, message: "Failed to fetch income" }
    }
}