import { pgTable, serial, timestamp, integer, varchar } from "drizzle-orm/pg-core";

export const budgets = pgTable('budgets', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    amount: integer('amount').notNull(),
    icon:varchar('icon'),
    createdAt: timestamp('created_at').defaultNow(),
    createdBy: varchar('created_by').notNull()
});

export type InsertBudget = typeof budgets.$inferInsert;

export const schema = {
    budgets
}