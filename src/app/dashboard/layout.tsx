"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { LogOut, User, Building2, Bell, Shield, ArrowUpRight } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/dashboard");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#0F0D13] flex flex-col items-center justify-center text-white">
        <div className="w-10 h-10 border-2 border-brand border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm text-[#958D9E] font-medium">Verifying PayTrack session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0D13] text-white flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#15121B]/95 backdrop-blur-xl border-b border-[#292434] px-4 sm:px-8 h-18 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center font-bold text-[#15121A] text-sm shadow-sm">
              P
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-white">
                PayTrack
              </span>
              <span className="text-[10px] font-bold text-brand bg-brand-soft border border-brand-border px-1.5 py-0.5 rounded-full">
                MSME
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold text-[#958D9E]">
            <Link
              href="/dashboard"
              className="px-3 py-1.5 rounded-lg bg-white/5 text-brand"
            >
              Receivables Register
            </Link>
            <span className="px-3 py-1.5 rounded-lg hover:text-white cursor-not-allowed opacity-50">
              Commitment Log
            </span>
            <span className="px-3 py-1.5 rounded-lg hover:text-white cursor-not-allowed opacity-50">
              MSMED 45-Day Monitor
            </span>
            <span className="px-3 py-1.5 rounded-lg hover:text-white cursor-not-allowed opacity-50">
              Evidence Vault
            </span>
          </nav>
        </div>

        {/* Right User Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-semibold text-white leading-tight">
              {user.displayName || user.email?.split("@")[0] || "Authorized Supplier"}
            </span>
            <span className="text-[11px] text-[#958D9E] leading-tight">
              {user.company || user.email}
            </span>
          </div>

          <div className="w-9 h-9 rounded-full bg-brand-soft border border-brand-border flex items-center justify-center text-brand font-bold text-xs uppercase">
            {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
          </div>

          <button
            type="button"
            onClick={signOut}
            title="Sign Out"
            className="inline-flex items-center gap-1.5 text-xs text-[#958D9E] hover:text-white bg-[#1C1724] border border-[#292434] hover:border-brand-border px-3 py-1.5 rounded-lg transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
