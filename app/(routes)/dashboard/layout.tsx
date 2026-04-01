import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "./_components/AppSidebar";
import DashboardHeader from "./_components/DashboardHeader";
import CustomSidebarTrigger from "./_components/CustomSidebarTrigger";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col flex-1 min-w-0 min-h-screen">
          <div className="sticky top-0 z-50 flex items-center border-b bg-white">
            <CustomSidebarTrigger />
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
