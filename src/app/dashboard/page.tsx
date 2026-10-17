"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  FileText,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  ArrowUpRight,
  Filter,
  Search,
  MessageSquare,
  Paperclip,
  TrendingUp,
  ShieldCheck,
  Building,
} from "lucide-react";

interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
  buyerName: string;
  buyerGstin: string;
  amount: number;
  dueDate: string;
  daysOutstanding: number;
  status: "promised" | "followup_due" | "overdue_msmed" | "settled";
  lastCommitment: string;
  commitmentDate: string;
  evidenceCount: number;
}

const SAMPLE_INVOICES: InvoiceRecord[] = [
  {
    id: "inv-1",
    invoiceNumber: "INV-2026-088",
    buyerName: "Tata AutoComp Systems Ltd",
    buyerGstin: "27AAACT2948G1ZQ",
    amount: 320000,
    dueDate: "2026-10-24",
    daysOutstanding: 28,
    status: "promised",
    lastCommitment: "Promised by Accounts Dept via WhatsApp confirmation",
    commitmentDate: "24 Oct 2026",
    evidenceCount: 3,
  },
  {
    id: "inv-2",
    invoiceNumber: "INV-2026-074",
    buyerName: "Bharat Gears Precision Corp",
    buyerGstin: "06AAACB1100F1Z4",
    amount: 485000,
    dueDate: "2026-10-14",
    daysOutstanding: 48,
    status: "overdue_msmed",
    lastCommitment: "Promised on Oct 10, partial RTGS ₹1L received, remainder pending",
    commitmentDate: "18 Oct 2026",
    evidenceCount: 4,
  },
  {
    id: "inv-3",
    invoiceNumber: "INV-2026-092",
    buyerName: "Kirloskar Oil Engines Foundry",
    buyerGstin: "27AAACK1010L1Z9",
    amount: 195000,
    dueDate: "2026-10-28",
    daysOutstanding: 14,
    status: "followup_due",
    lastCommitment: "PO acknowledged; 1st follow-up call scheduled today",
    commitmentDate: "Pending",
    evidenceCount: 2,
  },
  {
    id: "inv-4",
    invoiceNumber: "INV-2026-069",
    buyerName: "Godrej Aerospace Components",
    buyerGstin: "27AAACG0000A1Z5",
    amount: 540000,
    dueDate: "2026-10-05",
    daysOutstanding: 35,
    status: "promised",
    lastCommitment: "Payment voucher signed; scheduled for batch RTGS on 22nd",
    commitmentDate: "22 Oct 2026",
    evidenceCount: 5,
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredInvoices = SAMPLE_INVOICES.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.buyerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || inv.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Executive Welcome Banner */}
      <div className="bg-[#15121B] border border-[#292434] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Glow accent */}
        <div
          className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-[90px] opacity-20 pointer-events-none"
          style={{ backgroundColor: "var(--brand-primary)" }}
        />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-soft border border-brand-border text-brand text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Active Supplier Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Welcome back, {user?.displayName || "Supplier"}
          </h1>
          <p className="mt-1 text-sm text-[#958D9E] flex items-center gap-2">
            <span>{user?.company || "Independent MSME"}</span>
            <span className="text-[#665F70]">•</span>
            <span>{user?.email}</span>
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center gap-3 relative z-10 shrink-0">
          <button
            type="button"
            onClick={() => alert("Invoice recording dialog will open in the next slice.")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand hover:bg-brand-hover text-[#15121A] text-xs sm:text-sm font-bold shadow-md transition-all duration-200 hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Record Invoice</span>
          </button>
          <button
            type="button"
            onClick={() => alert("Payment commitment logging modal will open in the next slice.")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1C1724] hover:bg-[#251F30] border border-[#3A3347] hover:border-brand-border text-white text-xs sm:text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Log Commitment</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-[#15121B] border border-[#292434] rounded-2xl p-5 hover:border-brand-border transition-colors">
          <div className="flex items-center justify-between text-xs text-[#958D9E] font-medium">
            <span>Total Outstanding</span>
            <FileText className="w-4 h-4 text-brand" />
          </div>
          <div className="mt-3 text-2xl font-bold text-white tracking-tight">
            ₹15,40,000
          </div>
          <div className="mt-1 text-xs text-[#958D9E]">
            Across 4 active credit invoices
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#15121B] border border-[#292434] rounded-2xl p-5 hover:border-brand-border transition-colors">
          <div className="flex items-center justify-between text-xs text-[#958D9E] font-medium">
            <span>Commitments Due This Week</span>
            <Calendar className="w-4 h-4 text-brand" />
          </div>
          <div className="mt-3 text-2xl font-bold text-brand tracking-tight">
            ₹8,60,000
          </div>
          <div className="mt-1 text-xs text-emerald-400 font-medium">
            2 buyers promised by Friday
          </div>
        </div>

        {/* Metric 3: MSMED Alert */}
        <div className="bg-[#15121B] border border-amber-500/30 rounded-2xl p-5 hover:border-amber-500/50 transition-colors">
          <div className="flex items-center justify-between text-xs text-amber-300 font-medium">
            <span>Overdue (&gt;45 Days MSMED)</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-3 text-2xl font-bold text-amber-300 tracking-tight">
            ₹4,85,000
          </div>
          <div className="mt-1 text-xs text-amber-400/80">
            1 invoice exceeds Section 15 limits
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-[#15121B] border border-[#292434] rounded-2xl p-5 hover:border-brand-border transition-colors">
          <div className="flex items-center justify-between text-xs text-[#958D9E] font-medium">
            <span>Commitment Kept Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3 text-2xl font-bold text-white tracking-tight">
            84.2%
          </div>
          <div className="mt-1 text-xs text-[#958D9E]">
            Last 90 days resolution history
          </div>
        </div>
      </div>

      {/* Main Content Area: Invoices Table */}
      <div className="bg-[#15121B] border border-[#292434] rounded-3xl overflow-hidden shadow-xl">
        {/* Header & Filter Controls */}
        <div className="p-5 sm:p-6 border-b border-[#292434] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Receivables Register &amp; Commitment Status
            </h2>
            <p className="text-xs text-[#958D9E]">
              Track due dates, logged buyer commitments, and audit-ready delivery evidence
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#958D9E] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search invoice or buyer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white placeholder-[#665F70] focus:outline-none focus:border-brand"
              />
            </div>

            {/* Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-[#D4CFDC] focus:outline-none focus:border-brand cursor-pointer"
            >
              <option value="all">All Invoices</option>
              <option value="promised">Promised</option>
              <option value="followup_due">Follow-up Due</option>
              <option value="overdue_msmed">Overdue 45d</option>
            </select>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#292434] bg-[#1C1724]/60 text-[#958D9E] font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-5">Invoice #</th>
                <th className="py-3.5 px-5">Buyer &amp; GSTIN</th>
                <th className="py-3.5 px-5">Amount</th>
                <th className="py-3.5 px-5">Due Date &amp; Age</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5">Active Commitment</th>
                <th className="py-3.5 px-5 text-right">Evidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#292434]">
              {filteredInvoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="hover:bg-[#1C1724]/40 transition-colors group"
                >
                  {/* Invoice Number */}
                  <td className="py-4 px-5 font-mono font-bold text-white group-hover:text-brand transition-colors">
                    {inv.invoiceNumber}
                  </td>

                  {/* Buyer */}
                  <td className="py-4 px-5">
                    <div className="font-semibold text-white">{inv.buyerName}</div>
                    <div className="text-[11px] text-[#665F70] font-mono">{inv.buyerGstin}</div>
                  </td>

                  {/* Amount */}
                  <td className="py-4 px-5 font-semibold text-white">
                    ₹{inv.amount.toLocaleString("en-IN")}
                  </td>

                  {/* Due Date */}
                  <td className="py-4 px-5">
                    <div className="text-white">{inv.dueDate}</div>
                    <div className={`text-[11px] ${inv.daysOutstanding > 45 ? "text-amber-400 font-semibold" : "text-[#958D9E]"}`}>
                      {inv.daysOutstanding} days credit
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-5">
                    {inv.status === "promised" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-brand-soft text-brand border border-brand-border">
                        <Clock className="w-3 h-3" />
                        <span>Payment Promised</span>
                      </span>
                    )}
                    {inv.status === "followup_due" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/30">
                        <MessageSquare className="w-3 h-3" />
                        <span>Follow-up Due</span>
                      </span>
                    )}
                    {inv.status === "overdue_msmed" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Overdue 45d MSMED</span>
                      </span>
                    )}
                  </td>

                  {/* Commitment Detail */}
                  <td className="py-4 px-5 max-w-xs">
                    <div className="text-white truncate" title={inv.lastCommitment}>
                      {inv.lastCommitment}
                    </div>
                    <div className="text-[11px] text-brand font-medium">
                      Date: {inv.commitmentDate}
                    </div>
                  </td>

                  {/* Evidence Count */}
                  <td className="py-4 px-5 text-right">
                    <span className="inline-flex items-center gap-1 text-xs text-[#958D9E] bg-[#1C1724] px-2.5 py-1 rounded-lg border border-[#292434]">
                      <Paperclip className="w-3 h-3" />
                      <span>{inv.evidenceCount} files</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
