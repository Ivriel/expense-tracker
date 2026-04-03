import { pgTable,bigint, serial, timestamp, integer, varchar } from "drizzle-orm/pg-core";

export const incomes = pgTable('incomes',{
    id:serial('id').primaryKey(),
    name:varchar('name',{length:255}).notNull(),
    amount:bigint('amount',{mode:'number'}).notNull().default(0),
    icon:varchar('icon'),
    createdAt:timestamp('created_at').defaultNow(),
    createdBy:varchar('created_by').notNull()
})

export const budgets = pgTable('budgets', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    amount: bigint('amount', { mode: 'number' }).notNull(),
    icon:varchar('icon'),
    createdAt: timestamp('created_at').defaultNow(),
    createdBy: varchar('created_by').notNull()
});

export const expenses = pgTable('expenses',{
    id:serial('id').primaryKey(),
    name:varchar('name',{length:255}).notNull(),
    amount: bigint('amount', { mode: 'number' }).notNull().default(0),
    budgetId:integer('budget_id').references(()=>budgets.id,{onDelete:'cascade'
        
    }),
    createdAt:timestamp('created_at').defaultNow(),
    createdBy:varchar('created_by').notNull()
});

export const goals = pgTable('goals', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    targetAmount: bigint('target_amount', { mode: 'number' }).notNull(),
    currentAmount: bigint('current_amount', { mode: 'number' }).notNull().default(0),
    icon: varchar('icon'),
    createdAt: timestamp('created_at').defaultNow(),
    createdBy: varchar('created_by').notNull()
});

export type InsertBudget = typeof budgets.$inferInsert;
export type Budget = typeof budgets.$inferSelect;
export type InsertExpense = typeof expenses.$inferInsert;
export type Expense = typeof expenses.$inferSelect;
export type InsertIncome = typeof incomes.$inferInsert;
export type Income = typeof incomes.$inferSelect;
export type InsertGoal = typeof goals.$inferInsert;
export type Goal = typeof goals.$inferSelect;

export const schema = {
    incomes,
    budgets,
    expenses,
    goals
}