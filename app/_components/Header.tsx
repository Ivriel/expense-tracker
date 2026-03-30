import { Show, SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Header() {
  return (
    <header className="p-5 flex justify-between items-center border shadow-md">
      <Image src="/logo.svg" alt="Logo" width={160} height={100} />
      <div className="flex items-center gap-4">
        <Show when="signed-out">
          <SignInButton />
          <SignUpButton>
            <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign Up
            </button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <SignOutButton>
            <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign Out
            </button>
          </SignOutButton>
        </Show>
      </div>
    </header>
  );
}
