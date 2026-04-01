"use client"

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ListIndentDecrease, ListIndentIncrease } from "lucide-react";

export default function CustomSidebarTrigger() {
 const { toggleSidebar, state } = useSidebar();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={toggleSidebar}
          className="ml-2 shrink-0 cursor-pointer"
        >
          {state === "expanded" ? <ListIndentDecrease /> : <ListIndentIncrease />}
        </Button>
      </TooltipTrigger>
      <TooltipContent align="center" side="bottom">
        {state === "expanded" ? "Collapse Menu" : "Expand Menu"}
      </TooltipContent>
    </Tooltip>
  );
}
