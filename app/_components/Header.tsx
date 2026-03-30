import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <nav className="p-5 flex justify-between items-center border shadow-md">
      <Image src="/logo.svg" alt="Logo" width={160} height={100} />
      <Button>Get Started</Button>
    </nav>
  );
}
