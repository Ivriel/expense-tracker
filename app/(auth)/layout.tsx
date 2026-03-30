import Image from "next/image";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh w-full bg-slate-50 dark:bg-zinc-950">
      {/* Left side / Decorative side */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 text-white relative overflow-hidden">
        {/* Background gradient & patterns */}
        <div className="absolute inset-0 bg-linear-to-br from-indigo-900/40 via-zinc-950 to-black z-0" />
        
        {/* Decorative ambient light blobs */}
        <div className="absolute top-0 -left-1/4 w-3/4 h-3/4 bg-indigo-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 -right-1/4 w-3/4 h-3/4 bg-violet-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none"></div>

        {/* Logo area */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 text-white font-bold text-xl shadow-lg shadow-indigo-500/30">
            ET
          </div>
          <span className="text-xl font-semibold tracking-tight">ExpenseTracker</span>
        </div>
        
        {/* Hero text */}
        <div className="relative z-10 space-y-6 max-w-lg mt-auto mb-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-medium text-indigo-200 mb-2">
            Release 2026.1
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            Take back control <br className="hidden lg:block"/> of your finances.
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Experience the seamless way to track, manage, and analyze your expenses in real-time. Join thousands of users who have revolutionized their budgeting with ExpenseTracker.
          </p>
          
          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-zinc-950 bg-zinc-800 flex items-center justify-center overflow-hidden">
                   <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} alt={`User ${i}`} width={40} height={40} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="text-sm font-medium text-zinc-300">
              Trusted by 10k+ users
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="relative z-10 text-sm font-medium text-zinc-500 flex justify-between items-center">
          <p>© {new Date().getFullYear()} Expense Tracker Inc.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
      
      {/* Right side / Auth side */}
      <div className="flex w-full lg:w-1/2 flex-col p-6 sm:p-12 relative min-h-dvh">
        {/* Mobile Logo */}
        <div className="flex lg:hidden items-center gap-2 mb-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-violet-600 text-white font-bold text-sm shadow-md">
            ET
          </div>
          <span className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">ExpenseTracker</span>
        </div>

        {/* Auth component container */}
        <div className="flex-1 flex flex-col items-center justify-center w-full animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
          <div className="w-full max-w-md flex flex-col items-center relative z-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
