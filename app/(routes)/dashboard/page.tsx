import { db } from "@/db/drizzle";
import { budgets } from "@/db/schema";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardClient from "./_components/DashboardClient";

export default async function Dashboard() {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const result = await db
    .select()
    .from(budgets)
    .where(eq(budgets.createdBy, user.primaryEmailAddress!.emailAddress));

  if (result.length === 0) {
    redirect("/dashboard/budgets");
  }

  return (
    <DashboardClient
      userName={user.fullName ?? ""}
      userEmail={user.primaryEmailAddress!.emailAddress}
    />
  );
}