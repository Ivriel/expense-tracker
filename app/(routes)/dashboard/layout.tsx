import React from "react";
import Sidenav from "./_components/Sidenav";
import DashboardHeader from "./_components/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="fixed md:w-64 hidden md:block">
        <Sidenav />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}
