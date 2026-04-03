import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <section className="bg-gray-50 flex flex-col items-center justify-center pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pb-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Understand user flow and
          <strong className="text-indigo-600"> increase </strong>
          conversions
        </h1>

        <p className="mx-auto mt-4 max-w-prose text-base text-slate-600 sm:text-lg/relaxed">
          Make Your Financial Plan and Save Millions of Money. Best App for Money Tracking.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            className="inline-flex items-center justify-center rounded-lg border border-indigo-600 bg-indigo-600 px-6 py-3 font-medium text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md"
            href="/dashboard"
          >
            Get Started
          </Link>

          <a
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-6 py-3 font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 hover:shadow-md"
            href="#"
          >
            Learn More
          </a>
        </div>
      </div>

      <div className="mx-auto mt-16 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200/50 bg-white shadow-2xl p-2 sm:p-4 ring-1 ring-slate-200/50">
          <Image
            src="/dashboard-placeholder.svg"
            alt="Dashboard mockup"
            width={1200}
            height={800}
            className="w-full rounded-xl object-cover border border-slate-100"
            priority
          />
        </div>
      </div>
    </section>
  );
}
