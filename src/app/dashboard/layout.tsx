"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  LogOut,
  FileText,
  Clock,
  AlertTriangle,
  Users,
  Menu,
  X,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";
import { HowToUseModal } from "@/components/dashboard/HowToUseModal";
import { RouteTransitionLoader } from "@/components/dashboard/RouteTransitionLoader";

const navLinks = [
  { href: "/dashboard", label: "Receivables Register", icon: FileText },
  { href: "/dashboard/commitments", label: "Commitment Log", icon: Clock },
  { href: "/dashboard/msmed-monitor", label: "MSMED 45-Day Monitor", icon: AlertTriangle },
  { href: "/dashboard/buyers", label: "Buyers Directory", icon: Users },
];

function NavContent({
  mobileMenuOpen,
  setMobileMenuOpen,
  signOut,
  user,
  onOpenHowToUse,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
  signOut: () => void;
  user: any;
  onOpenHowToUse: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-[#958D9E]">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive =
            link.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
                isActive
                  ? "bg-brand/15 text-brand font-bold border border-brand/30 shadow-sm"
                  : "hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-18 left-0 w-full bg-[#15121B] border-b border-[#292434] px-4 py-4 space-y-2 z-50 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              link.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                  isActive
                    ? "bg-brand/15 text-brand border border-brand/30"
                    : "text-[#958D9E] hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHowToUse();
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-brand bg-brand-soft border border-brand-border"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand" />
                <span>How to Use / उपयोग कैसे करें</span>
              </div>
              <span className="text-[10px] bg-brand text-[#15121A] px-1.5 py-0.5 rounded font-bold">
                EN / हिंदी
              </span>
            </button>
          </div>

          <div className="pt-3 border-t border-[#292434] flex items-center justify-between">
            <div className="text-xs text-[#958D9E]">
              Signed in as <span className="text-white font-medium">{user?.displayName || "Vinay Bhadane"}</span>
            </div>
            <button
              type="button"
              onClick={signOut}
              className="inline-flex items-center gap-1.5 text-xs text-rose-400 bg-rose-500/10 px-3 py-1.5 rounded-lg border border-rose-500/20"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHowToUseOpen, setIsHowToUseOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/dashboard");
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen bg-[#0F0D13] text-white flex flex-col antialiased selection:bg-brand selection:text-black">
      {/* Route Navigation Attractive Glow Progress Bar */}
      <Suspense fallback={null}>
        <RouteTransitionLoader />
      </Suspense>

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#15121B]/95 backdrop-blur-xl border-b border-[#292434] px-4 sm:px-8 h-18 flex items-center justify-between relative shadow-sm">
        {/* Brand & Desktop Navigation */}
        <div className="flex items-center gap-6 lg:gap-8">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center font-bold text-[#15121A] text-sm shadow-sm group-hover:scale-105 transition-transform">
              P
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-white group-hover:text-brand transition-colors">
                PayTrack
              </span>
              <span className="text-[10px] font-bold text-brand bg-brand-soft border border-brand-border px-1.5 py-0.5 rounded-full">
                MSME
              </span>
            </div>
          </Link>

          <Suspense fallback={<div className="h-8" />}>
            <NavContent
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
              signOut={signOut}
              user={user}
              onOpenHowToUse={() => setIsHowToUseOpen(true)}
            />
          </Suspense>
        </div>

        {/* Right User Controls & Mobile Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* How to Use Navbar Button */}
          <button
            type="button"
            onClick={() => setIsHowToUseOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-brand bg-brand-soft border border-brand-border hover:bg-brand/20 px-3 py-1.5 rounded-xl transition-all shadow-sm"
            title="Standard Operating Procedure (English & Hindi)"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>How to Use</span>
            <span className="text-[10px] bg-brand text-[#15121A] px-1.5 py-0.2 rounded font-bold font-mono">
              EN / हिंदी
            </span>
          </button>

          <div className="hidden md:flex flex-col text-right">
            <span className="text-xs font-semibold text-white leading-tight">
              {user?.displayName || "Vinay Bhadane"}
            </span>
            <span className="text-[11px] text-[#958D9E] leading-tight">
              {user?.company || "Bhadane Precision MSME"}
            </span>
          </div>

          <div className="w-9 h-9 rounded-full bg-brand-soft border border-brand-border flex items-center justify-center text-brand font-bold text-xs uppercase shadow-sm">
            {user?.displayName?.charAt(0) || "V"}
          </div>

          <button
            type="button"
            onClick={signOut}
            title="Sign Out"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#958D9E] hover:text-white bg-[#1C1724] border border-[#292434] hover:border-brand-border px-3 py-1.5 rounded-xl transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Sign Out</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#958D9E] hover:text-white bg-[#1C1724] border border-[#292434] rounded-xl"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Workspace with Suspense and Page Transition Fade */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in duration-300">
        <Suspense
          fallback={
            <div className="min-h-[400px] flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          {children}
        </Suspense>
      </main>

      {/* How to Use Interactive Guide Modal */}
      <HowToUseModal
        isOpen={isHowToUseOpen}
        onClose={() => setIsHowToUseOpen(false)}
      />
    </div>
  );
}
