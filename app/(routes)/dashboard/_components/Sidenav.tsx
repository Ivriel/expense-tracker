"use client";
import Image from "next/image";
import { SidenavMenuList } from "../_data/sidenav";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function Sidenav() {
  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, [path]);
  return (
    <aside className="h-screen p-5 border shadow-sm">
      <div>
        <Image src="/logo.svg" alt="Logo" width={160} height={100} />
      </div>
      <nav className="mt-5">
        {SidenavMenuList.map((item) => (
          <Link href={item.path} key={item.id}>
            <h2
              className={`flex gap-2 items-center p-5 rounded-md cursor-pointer font-medium mb-2
  ${
    path == item.path
      ? "text-white bg-purple-500" // kalau aktif
      : "text-gray-500 hover:text-purple-500" // kalau tidak aktif
  }`}
            >
              <item.icon />
              {item.name}
            </h2>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
