import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Expense Tracker",
    template: "%s | Expense Tracker",
  },
  description:
    "Track your expenses and manage your budget to save millions of money",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.className} ${outfit.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <Toaster />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
