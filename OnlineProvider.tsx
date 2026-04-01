"use client";
import { useEffect, useState } from "react";
import NoInternet from "./app/_components/NoInternet";

export default function OnlineProvider({ children }: { children: React.ReactNode }) {
  // Langsung pakai navigator.onLine sebagai initial value
  const [isOnline, setIsOnline] = useState(() => 
    typeof window !== "undefined" ? navigator.onLine : true
  );

  useEffect(() => {
    const on = () => setIsOnline(true);
    const off = () => setIsOnline(false);

    window.addEventListener("online", on);
    window.addEventListener("offline", off);

    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  if (!isOnline) return <NoInternet />;
  return <>{children}</>;
}