"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Users,
  Clock,
  AlertCircle,
  CheckCircle2,
  Phone,
  ArrowUpRight,
  TrendingUp,
  Share2,
  Building2,
  ShieldCheck,
  Check,
  ChevronDown,
} from "lucide-react";

export function ProductPreview() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "invoices">("dashboard");

  return (
    <div className="relative w-full max-w-[1180px] mx-auto pt-4 pb-12 px-2 sm:px-6">
      {/* ─────────────────────────────────────────────────────────────
          FLOATING CARD A: Top Left Balance Badge
      ────────────────────────────────────────────────────────────── */}
      <div className="hidden sm:flex absolute -top-1 left-2 lg:left-6 z-20 items-center gap-2 bg-white rounded-full py-1.5 px-3.5 shadow-md border border-[#E9E4ED] animate-float">
        <span className="w-5 h-5 rounded-full bg-brand flex items-center justify-center text-[#15121A]">
          <Check className="w-3 h-3 stroke-[3]" />
        </span>
        <span className="font-mono font-bold text-xs text-[#15121A] tabular-nums">
          +₹85,000.00
        </span>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          FLOATING CARD B: Mid-Left Buyer Action Card (Apex Engg)
      ────────────────────────────────────────────────────────────── */}
      <div className="hidden md:flex absolute top-36 -left-6 lg:-left-12 z-30 w-64 bg-white rounded-2xl p-4 shadow-md border border-[#E9E4ED] flex-col gap-3 -rotate-2 hover:rotate-0 transition-transform duration-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#15121B] text-brand flex items-center justify-center font-bold text-sm shrink-0">
            AE
          </div>
          <div className="overflow-hidden">
            <div className="font-bold text-xs text-[#15121A] truncate">
              Apex Engineering Corp
            </div>
            <div className="text-[11px] text-[#665F70]">Due: Overdue 18 Days</div>
          </div>
        </div>

        <div className="pt-2 border-t border-[#F2EFF5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-brand text-[#15121A] flex items-center justify-center font-bold">
              <Phone className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold text-[#15121A]">Follow-up</span>
          </div>
          <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-[#F9F7FA] text-[#15121A] border border-[#E9E4ED]">
            NEFT
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          FLOATING CARD C: Top-Right Aging Bar Chart Card
      ────────────────────────────────────────────────────────────── */}
      <div className="hidden sm:flex absolute -top-4 -right-4 lg:-right-8 z-20 w-56 bg-white rounded-2xl p-4 shadow-md border border-[#E9E4ED] flex-col gap-2 rotate-2 hover:rotate-0 transition-transform duration-300">
        <div className="text-[11px] font-semibold text-[#665F70] flex items-center justify-between">
          <span>Receivables Aging</span>
          <span className="text-[9px] font-bold text-[#15121A] bg-[#F9F7FA] px-1.5 py-0.5 rounded border border-[#E9E4ED]">
            MSMEDA
          </span>
        </div>

        {/* Visual Bar Graph with Brand bars */}
        <div className="h-20 flex items-end justify-between gap-1.5 pt-2 px-1">
          <div className="w-4 bg-[#6B4785] rounded-t-sm h-[35%]" />
          <div className="w-4 bg-[#6B4785] rounded-t-sm h-[65%]" />
          <div className="w-4 bg-brand rounded-t-sm h-[90%]" />
          <div className="w-4 bg-[#6B4785] rounded-t-sm h-[45%]" />
          <div className="w-4 bg-[#6B4785] rounded-t-sm h-[75%]" />
          <div className="w-4 bg-[#15121B] rounded-t-sm h-[55%]" />
        </div>
        <div className="flex justify-between text-[9px] font-mono text-[#958D9E] px-0.5">
          <span>&lt;15d</span>
          <span>30d</span>
          <span className="text-brand font-bold">45d</span>
          <span>60d</span>
          <span>90d</span>
          <span>&gt;90d</span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          FLOATING CARD D: Bottom-Right Team Activity Card
      ────────────────────────────────────────────────────────────── */}
      <div className="hidden md:flex absolute -bottom-4 -right-2 lg:-right-6 z-30 bg-white rounded-2xl py-3 px-4 shadow-md border border-[#E9E4ED] items-center gap-3 animate-float-alt">
        <div className="flex -space-x-2">
          <div className="w-7 h-7 rounded-full bg-[#15121B] text-brand font-bold text-[10px] flex items-center justify-center border-2 border-white">
            RK
          </div>
          <div className="w-7 h-7 rounded-full bg-brand text-[#15121A] font-bold text-[10px] flex items-center justify-center border-2 border-white">
            VK
          </div>
          <div className="w-7 h-7 rounded-full bg-[#EDE7F2] text-[#15121A] font-bold text-[10px] flex items-center justify-center border-2 border-white">
            +3
          </div>
        </div>
        <div className="text-left">
          <div className="text-xs font-bold text-[#15121A]">Commitment Logged</div>
          <div className="text-[10px] text-[#665F70]">₹1,45,000 due 22 Oct</div>
        </div>
        <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center text-[#15121A]">
          <Share2 className="w-3 h-3" />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MAIN DASHBOARD DISPLAY (Dark Sleek Bezel Frame)
      ────────────────────────────────────────────────────────────── */}
      <div className="relative w-full bg-[#181520] rounded-[28px] sm:rounded-[36px] p-2.5 sm:p-3.5 shadow-2xl border border-[#2A2436] text-left">
        {/* Inside Display Screen Canvas */}
        <div className="w-full bg-[#FAF8FC] rounded-[22px] sm:rounded-[28px] overflow-hidden flex flex-col md:flex-row min-h-[460px]">
          
          {/* Dashboard Left Sidebar */}
          <div className="w-full md:w-52 bg-white border-b md:border-b-0 md:border-r border-[#E9E4ED] p-4 flex md:flex-col justify-between shrink-0">
            <div>
              {/* Brand Logo in Sidebar */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 rounded-full bg-[#15121B] flex items-center justify-center text-brand">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-xs tracking-wider text-[#15121A]">
                  PAYTRACK
                </span>
              </div>

              {/* Sidebar Navigation */}
              <nav className="flex md:flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveTab("dashboard")}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all text-left ${
                    activeTab === "dashboard"
                      ? "bg-brand text-[#15121A] shadow-xs"
                      : "text-[#665F70] hover:text-[#15121A] hover:bg-[#F2EFF5]"
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("invoices")}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all text-left ${
                    activeTab === "invoices"
                      ? "bg-brand text-[#15121A] shadow-xs"
                      : "text-[#665F70] hover:text-[#15121A] hover:bg-[#F2EFF5]"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Invoices</span>
                </button>

                <div className="hidden md:flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#665F70] hover:text-[#15121A] cursor-pointer">
                  <Users className="w-4 h-4" />
                  <span>Buyers</span>
                </div>

                <div className="hidden md:flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#665F70] hover:text-[#15121A] cursor-pointer">
                  <Clock className="w-4 h-4" />
                  <span>Timeline</span>
                </div>
              </nav>
            </div>

            {/* Bottom Tenant Info */}
            <div className="hidden md:flex items-center gap-2 pt-4 border-t border-[#F2EFF5]">
              <div className="w-7 h-7 rounded-full bg-[#15121B] text-brand font-bold text-xs flex items-center justify-center">
                PT
              </div>
              <div className="overflow-hidden">
                <div className="text-[11px] font-bold text-[#15121A] truncate">Precision Tools</div>
                <div className="text-[9px] text-[#665F70]">GST Active</div>
              </div>
            </div>
          </div>

          {/* Dashboard Main Workspace Area */}
          <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
            {/* Top Workspace Greeting & Profile Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E9E4ED]">
              <div>
                <h3 className="font-extrabold text-lg sm:text-[22px] text-[#15121A] flex items-center gap-1.5 tracking-tight">
                  Welcome back, Vinay
                </h3>
                <p className="text-xs sm:text-[13px] text-[#665F70]">
                  Bhadane Precision MSME · Today&apos;s receivables overview
                </p>
              </div>

              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-[#E9E4ED] shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-[#15121B] text-brand font-bold text-[10px] flex items-center justify-center">
                  VB
                </div>
                <span className="text-xs font-semibold text-[#15121A] hidden sm:inline">
                  Vinay Bhadane
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#665F70]" />
              </div>
            </div>

            {/* Dynamic Content switching based on activeTab */}
            {activeTab === "dashboard" ? (
              <div className="animate-in fade-in-50 duration-200 flex-1 flex flex-col justify-between">
                {/* 3 Metric Cards Row with card-hover-lift */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-4">
                  {/* Metric 1 */}
                  <div className="bg-white p-4 rounded-xl border border-[#E9E4ED] shadow-xs card-hover-lift cursor-default">
                    <div className="flex items-center justify-between text-xs sm:text-[13px] font-semibold text-[#665F70]">
                      <span>Available Balance</span>
                      <span className="text-[10px] font-bold bg-[#F0FDF4] text-[#0D9488] px-1.5 py-0.5 rounded-full border border-[#BBF7D0]">
                        +2.4%
                      </span>
                    </div>
                    <div className="text-2xl sm:text-[28px] font-extrabold text-[#15121A] font-mono mt-1 tabular-nums tracking-tight">
                      ₹12,48,050
                    </div>
                    {/* Micro trend line */}
                    <div className="mt-2.5 h-1.5 w-full bg-[#F2EFF5] rounded-full overflow-hidden">
                      <div className="h-full bg-brand rounded-full transition-all duration-500" style={{ width: "72%" }} />
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="bg-white p-4 rounded-xl border border-[#E9E4ED] shadow-xs card-hover-lift cursor-default">
                    <div className="flex items-center justify-between text-xs sm:text-[13px] font-semibold text-[#665F70]">
                      <span>Total Outstanding</span>
                      <span className="text-[10px] font-bold bg-[#F4EEF7] text-[#6B4785] px-1.5 py-0.5 rounded-full border border-[#E9E4ED]">
                        12 Inv
                      </span>
                    </div>
                    <div className="text-2xl sm:text-[28px] font-extrabold text-[#15121A] font-mono mt-1 tabular-nums tracking-tight">
                      ₹14,85,000
                    </div>
                    <div className="mt-2.5 h-1.5 w-full bg-[#F2EFF5] rounded-full overflow-hidden">
                      <div className="h-full bg-[#15121B] rounded-full transition-all duration-500" style={{ width: "58%" }} />
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="bg-white p-4 rounded-xl border border-[#FECDD3] shadow-xs bg-[#FFF1F2]/30 card-hover-lift cursor-default">
                    <div className="flex items-center justify-between text-xs sm:text-[13px] font-bold text-[#E11D48]">
                      <span>Overdue Invoices</span>
                      <span className="text-[10px] font-extrabold bg-[#FFF1F2] text-[#E11D48] px-1.5 py-0.5 rounded-full border border-[#FECDD3]">
                        4 Overdue
                      </span>
                    </div>
                    <div className="text-2xl sm:text-[28px] font-extrabold text-[#E11D48] font-mono mt-1 tabular-nums tracking-tight">
                      ₹4,20,000
                    </div>
                    <div className="mt-2.5 h-1.5 w-full bg-[#FECDD3] rounded-full overflow-hidden">
                      <div className="h-full bg-[#E11D48] rounded-full transition-all duration-500" style={{ width: "35%" }} />
                    </div>
                  </div>
                </div>

                {/* Bottom Content Container: Immediate Action Queue */}
                <div className="bg-white p-4 rounded-xl border border-[#E9E4ED] shadow-xs flex-1">
                  <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#F2EFF5]">
                    <div className="text-xs font-bold text-[#15121A] flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-[#E11D48]" />
                      <span>Immediate Action Queue</span>
                    </div>
                    <span className="text-[11px] font-medium text-[#665F70]">Sorted by Overdue Days</span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    {/* Row 1 */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-lg bg-[#F9F7FA] hover:bg-[#F2EFF5] transition-all duration-200 border border-[#E9E4ED] hover:border-brand-glow">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#E11D48]" />
                        <span className="font-bold text-[#15121A]">Apex Engineering</span>
                        <span className="font-mono text-[#665F70] text-[11px]">INV-089</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF1F2] text-[#E11D48]">
                          18d Overdue
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-[#15121A] tabular-nums">
                          ₹1,45,000
                        </span>
                        <button
                          type="button"
                          className="px-3 py-1 rounded-full bg-[#15121B] text-brand font-bold text-[11px] hover:bg-[#221C2B] transition-colors active:scale-95 cursor-pointer"
                        >
                          Call Buyer
                        </button>
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-lg bg-[#F9F7FA] hover:bg-[#F2EFF5] transition-all duration-200 border border-[#E9E4ED] hover:border-brand-glow">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#D97706]" />
                        <span className="font-bold text-[#15121A]">Bharat Tooling & Fab</span>
                        <span className="font-mono text-[#665F70] text-[11px]">INV-094</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFFBEB] text-[#D97706]">
                          8d Overdue
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-[#15121A] tabular-nums">
                          ₹85,000
                        </span>
                        <button
                          type="button"
                          className="px-3 py-1 rounded-full bg-brand text-[#15121A] font-bold text-[11px] hover:bg-brand-hover transition-colors active:scale-95 cursor-pointer"
                        >
                          Record Payment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Invoices Tab View */
              <div className="animate-in fade-in-50 duration-200 flex-1 flex flex-col justify-between my-4">
                <div className="bg-white rounded-xl border border-[#E9E4ED] shadow-xs p-4 flex-1">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F2EFF5]">
                    <div className="text-xs font-bold text-[#15121A] flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-brand" />
                      <span>Active Invoices Register</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#665F70]">Showing 4 of 12 open</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    {[
                      { id: "INV-2026-089", buyer: "Apex Engineering", amount: "₹1,45,000", status: "Overdue 18d", statusBg: "bg-[#FFF1F2] text-[#E11D48]", due: "18 Sep 2026" },
                      { id: "INV-2026-094", buyer: "Bharat Tooling & Fab", amount: "₹85,000", status: "Overdue 8d", statusBg: "bg-[#FFFBEB] text-[#D97706]", due: "28 Sep 2026" },
                      { id: "INV-2026-098", buyer: "Zenith Auto Components", amount: "₹3,20,000", status: "Due Today", statusBg: "bg-[#F4EEF7] text-[#6B4785]", due: "06 Oct 2026" },
                      { id: "INV-2026-102", buyer: "Kalyan Heavy Forge", amount: "₹2,10,000", status: "Net 30 Active", statusBg: "bg-[#F0FDF4] text-[#0D9488]", due: "22 Oct 2026" },
                    ].map((inv) => (
                      <div
                        key={inv.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-[#F9F7FA] hover:bg-[#F2EFF5] border border-[#E9E4ED] hover:border-brand-glow transition-all duration-150 gap-2"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono font-bold text-[#15121A] text-[11px]">{inv.id}</span>
                          <span className="font-semibold text-[#15121A]">{inv.buyer}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${inv.statusBg}`}>
                            {inv.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[11px] text-[#665F70]">Due: {inv.due}</span>
                          <span className="font-mono font-bold text-[#15121A] tabular-nums">{inv.amount}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
