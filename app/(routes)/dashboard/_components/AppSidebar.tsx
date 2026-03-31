"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidenavMenuList } from "../_data/sidenav";

export function AppSidebar() {
  const path = usePathname();

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="p-4">
        <Link href="/dashboard">
          <Image src="/logo.svg" alt="Logo" width={160} height={100} />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SidenavMenuList.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={path === item.path}
                    tooltip={item.name}
                    size="lg"
                    className={
                      path === item.path
                        ? "bg-purple-500 text-white hover:bg-purple-600 hover:text-white"
                        : "text-gray-500 hover:text-purple-500"
                    }
                  >
                    <Link href={item.path}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
