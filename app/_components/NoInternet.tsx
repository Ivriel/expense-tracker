"use client";
import { useState, useEffect } from "react";
import { WifiOff, RefreshCw } from "lucide-react";

function NoInternet() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
     <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center text-center animate-[float_3s_ease-in-out_infinite]">
        <div className="w-20 h-20 rounded-full bg-purple-200 flex items-center justify-center mb-6">
          <WifiOff className="w-8 h-8 text-purple-900" strokeWidth={1.5} />
        </div>

        <h1 className="text-xl font-medium text-purple-950 mb-2">
          No internet connection
        </h1>
        <p className="text-sm text-purple-600 mb-8 max-w-xs leading-relaxed">
          Check your connection and try again.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-purple-50 text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
      </div>
    </div>
  );
}

export default NoInternet;
