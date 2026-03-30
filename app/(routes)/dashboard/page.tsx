import { db } from "@/db/drizzle";
import { budgets } from "@/db/schema";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await currentUser();
  
  if (user?.primaryEmailAddress?.emailAddress) {
    const result = await db
      .select()
      .from(budgets)
      .where(eq(budgets.createdBy, user.primaryEmailAddress.emailAddress));
      
    if (result.length === 0) {
      redirect("/dashboard/budgets");
    }
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
