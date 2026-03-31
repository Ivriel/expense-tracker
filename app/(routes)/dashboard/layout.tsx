import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "./_components/AppSidebar";
import DashboardHeader from "./_components/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center border-b">
            <SidebarTrigger className="ml-2 shrink-0 cursor-pointer" />
            <div className="flex-1">
              <DashboardHeader />
            </div>
          </div>
          <main className="flex-1">{children}</main>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
