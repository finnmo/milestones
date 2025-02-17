'use client';

import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";

const ClientHeader = dynamic(() => import("@/components/Header").then(mod => mod.Header), {
  loading: () => <div className="h-16 bg-white shadow-md animate-pulse" />,
});

export default function NotFound() {
  return (
    <html suppressHydrationWarning>
      <body>
        <main className="relative bg-[#FFCB3C] min-h-screen">
          <div
            className="fixed inset-0"
            style={{
              backgroundImage: "url('/assets/Clocks-Money-BG.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "auto",
              opacity: 1,
              zIndex: 0
            }}
          />
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-16 px-4">
            <Suspense fallback={<div className="h-16 bg-white shadow-md animate-pulse" />}>
              <ClientHeader />
            </Suspense>
            
            <h1 className="text-6xl font-bold text-white mb-4">404</h1>
            <p className="text-2xl text-white/90 mb-8">Page not found</p>
            <Link
              href="/"
              className="px-6 py-3 bg-white text-[#FFCB3C] rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}