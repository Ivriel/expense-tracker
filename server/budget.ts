"use server"

import { db } from "@/db/drizzle"
import { Budget, budgets, expenses, InsertBudget } from "@/db/schema"
import { currentUser } from "@clerk/nextjs/server"
import {  and, desc, eq, getTableColumns, sql } from "drizzle-orm"
import { buildDateFilter } from "./dateFilter"
import { TimeRangeType } from "@/store/useFilterStore"


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

export const getAllBudget = async(filterParams?: { month?: number; year?: number; type: TimeRangeType }) => {
    try {
        const user = await currentUser()
        const dateFilter = buildDateFilter(filterParams, budgets.createdAt);
        
        const result = await db.select({
            ...getTableColumns(budgets),//mengambil semua kolom dari sebuah tabel secara otomatis dan menyebarkan semua kolom tabel budgets ke dalam select object, jadi kamu tidak perlu tulis satu-satu seperti id, name, amount, dll.
            totalSpend:sql `sum(${expenses.amount})`.mapWith(Number), // ngitung jumlah amount nya (total jumlah pengeluaran) map with adalah method Drizzle untuk mengkonversi hasil query ke tipe JavaScript Number, karena hasil dari SQL aggregate function biasanya return sebagai string
            totalItems:sql `count(${expenses.id})`.mapWith(Number) //ngitung total barisnya. jumlah baris expense yang terhubung ke budget
        }).from(budgets)
        .leftJoin(expenses,eq(budgets.id,expenses.budgetId)) // ambil semua budget, dan jika ada expense yang budgetId-nya cocok dengan budgets.id, gabungkan datanya. Budget yang tidak punya expense tetap muncul (karena LEFT JOIN).
        .groupBy(budgets.id) // Karena kita pakai SUM() dan COUNT() (aggregate functions), data harus dikelompokkan. Di sini dikelompokkan per budgets.id sehingga setiap budget punya satu baris dengan total spend dan total items-nya sendiri
        .where(
            and(
                eq(budgets.createdBy,user?.primaryEmailAddress?.emailAddress ?? ""),
                dateFilter
            )
        )
        .orderBy(desc(budgets.createdAt))
        console.log(result)
        return { success: true, message: "Budget fetched successfully", result: result }
    } catch (error) {
        console.log(error)
        return { success: false, message: "Failed to fetch budget" }
    }
}

// id diterima sebagai string (dari URL params), lalu dikonversi ke number untuk query
export const getBudgetInfo = async (id: string) => {
    try {
        const user = await currentUser()
        const result = await db.select({
                ...getTableColumns(budgets),
                totalSpend: sql`sum(${expenses.amount})`.mapWith(Number),
                totalItems: sql`count(${expenses.id})`.mapWith(Number)
            }).from(budgets)
            .leftJoin(expenses, eq(budgets.id, expenses.budgetId))
            .groupBy(budgets.id)
            .where(
                // and() untuk menggabungkan dua kondisi where sekaligus
                and(
                    eq(budgets.createdBy, user?.primaryEmailAddress?.emailAddress ?? ""),
                    eq(budgets.id, parseInt(id)) // id dari URL selalu string, budgets.id number
                )
            )
            console.log(result)
        return { success: true, result: result[0] ?? null }
    } catch (error) {
        console.log(error)
        return { success: false, message: "Failed to fetch budget info" }
    }
}

export const deleteBudget = async(budgetId:number)=> {
    try {
        const user = await currentUser()
        await db.delete(budgets)
         .where(
            and(
                eq(budgets.createdBy, user?.primaryEmailAddress?.emailAddress ?? ""),
                eq(budgets.id, budgetId) 
            )
        ).returning({deletedId:budgets.id})
        return { success: true, message: "Budget deleted successfully" }
    } catch (error) {
        console.log(error)
        return { success: false, message: "Failed to delete budget" }
    }
}

export const updateBudget = async(budgetId:number,data:Omit<InsertBudget, "id" | "createdAt" | "createdBy">)=> {
    try {
        const user = await currentUser()
        const result = await db.update(budgets)
         .set(data)
         .where(
            and(
                eq(budgets.createdBy, user?.primaryEmailAddress?.emailAddress ?? ""),
                eq(budgets.id, budgetId) 
            )
        ).returning({updatedId:budgets.id})
        return { success: true, message: "Budget updated successfully", result: result }
    } catch (error) {
        console.log(error)
        return { success: false, message: "Failed to update budget" }
    }
}

export type BudgetWithStats = Budget & {
  totalSpend: number | null;
  totalItems: number;
};