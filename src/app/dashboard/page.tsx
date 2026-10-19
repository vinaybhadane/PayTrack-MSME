"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
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
  RefreshCw,
  Sparkles,
  Trash2,
  ExternalLink,
  IndianRupee,
  Eye,
  Printer,
} from "lucide-react";
import { RecordInvoiceModal } from "@/components/dashboard/RecordInvoiceModal";
import { LogCommitmentModal } from "@/components/dashboard/LogCommitmentModal";
import { RecordPaymentModal } from "@/components/dashboard/RecordPaymentModal";
import { RecordFollowUpModal } from "@/components/dashboard/RecordFollowUpModal";
import { AttachEvidenceModal } from "@/components/dashboard/AttachEvidenceModal";
import { InvoiceViewerModal } from "@/components/dashboard/InvoiceViewerModal";
import { DocumentViewerModal } from "@/components/dashboard/DocumentViewerModal";

interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
  buyerName: string;
  buyerGstin: string;
  amount: number;
  paidAmount: number;
  outstandingAmount: number;
  issueDate: string;
  dueDate: string;
  daysOutstanding: number;
  status: "pending" | "promised" | "followup_due" | "partially_paid" | "paid" | "overdue_msmed" | "disputed";
  isOverdueMsmed: boolean;
  lastCommitmentText?: string;
  commitmentDate?: string;
  evidenceCount: number;
  notes?: string;
}

interface AttentionItem {
  id: string;
  type: string;
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
  invoiceId: string;
  invoiceNumber: string;
  buyerName: string;
  amount: number;
  dueDate: string;
}

interface DashboardStats {
  totalOutstanding: number;
  commitmentsDueThisWeek: number;
  overdueMsmedAmount: number;
  totalInvoicesCount: number;
  settledInvoicesCount: number;
  overdueCount: number;
  promisedCount: number;
  followupDueCount: number;
  commitmentKeptRate: number;
  needsAttention: AttentionItem[];
}

export default function DashboardPage() {
  const { user } = useAuth();

  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Modal controls
  const [isRecordInvoiceOpen, setIsRecordInvoiceOpen] = useState(false);
  const [isCommitmentOpen, setIsCommitmentOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isFollowUpOpen, setIsFollowUpOpen] = useState(false);
  const [isEvidenceOpen, setIsEvidenceOpen] = useState(false);
  const [activeInvoiceId, setActiveInvoiceId] = useState<string | undefined>();

  // Document & Invoice Viewers
  const [viewingInvoice, setViewingInvoice] = useState<any | null>(null);
  const [viewingDocument, setViewingDocument] = useState<any | null>(null);

  // Fetch real live data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [statsRes, invoicesRes] = await Promise.all([
        fetch("/api/dashboard/stats"),
        fetch("/api/invoices"),
      ]);

      const statsData = await statsRes.json();
      const invoicesData = await invoicesRes.json();

      if (statsData.success) {
        setStats(statsData.stats);
      }
      if (invoicesData.success) {
        setInvoices(invoicesData.invoices || []);
      }
    } catch (error) {
      console.warn("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Open full Tax Invoice preview modal
  const handleQuickViewInvoice = async (inv: InvoiceRecord) => {
    try {
      const res = await fetch(`/api/invoices/${inv.id}`);
      const data = await res.json();
      if (data.success && data.invoice) {
        setViewingInvoice({
          id: data.invoice.id,
          invoiceNumber: data.invoice.invoiceNumber,
          issueDate: data.invoice.issueDate,
          dueDate: data.invoice.dueDate,
          amount: data.invoice.amount,
          paidAmount: data.invoice.paidAmount,
          outstandingAmount: data.invoice.outstandingAmount,
          status: data.invoice.status,
          daysOutstanding: data.invoice.daysOutstanding,
          isOverdueMsmed: data.invoice.isOverdueMsmed,
          notes: data.invoice.notes,
          buyerName: data.invoice.buyerName,
          buyerGstin: data.invoice.buyerGstin,
          buyerAddress: data.buyer?.address,
          buyerContact: data.buyer?.contactPerson,
          buyerPhone: data.buyer?.phone,
          evidence: data.evidence || [],
        });
        return;
      }
    } catch (err) {
      console.warn("Error loading invoice preview:", err);
    }

    // Fallback if detail fetch has delay
    setViewingInvoice({
      id: inv.id,
      invoiceNumber: inv.invoiceNumber,
      issueDate: inv.issueDate,
      dueDate: inv.dueDate,
      amount: inv.amount,
      paidAmount: inv.paidAmount,
      outstandingAmount: inv.outstandingAmount,
      status: inv.status,
      daysOutstanding: inv.daysOutstanding,
      isOverdueMsmed: inv.isOverdueMsmed,
      notes: inv.notes,
      buyerName: inv.buyerName,
      buyerGstin: inv.buyerGstin,
      evidence: [],
    });
  };

  // Seed sample data for user's personal workspace
  const handleSeedDemoData = async () => {
    if (!confirm("Load realistic sample MSME credit invoices into your workspace?")) return;
    setActionLoading(true);
    try {
      const res = await fetch("/api/demo/seed", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        await fetchData();
      }
    } finally {
      setActionLoading(false);
    }
  };

  // Reset workspace
  const handleResetData = async () => {
    if (!confirm("Are you sure you want to clear all invoices and buyers in your workspace?")) return;
    setActionLoading(true);
    try {
      const res = await fetch("/api/demo/reset", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        await fetchData();
      }
    } finally {
      setActionLoading(false);
    }
  };

  // Filter invoices
  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.buyerGstin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || inv.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Executive Welcome Banner */}
      <div className="bg-[#15121B] border border-[#292434] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-xl">
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
            Welcome back, {user?.displayName || "Vinay Bhadane"}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#958D9E] flex items-center gap-2">
            <span>{user?.company || "Bhadane Precision MSME"}</span>
            <span className="text-[#665F70]">•</span>
            <span>{user?.email || "vinay.bhadane@msme.in"}</span>
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 relative z-10 shrink-0">
          <button
            type="button"
            onClick={() => setIsRecordInvoiceOpen(true)}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-brand hover:bg-brand-hover text-[#15121A] text-xs sm:text-sm font-bold shadow-md transition-all duration-200 hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Record Invoice</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveInvoiceId(undefined);
              setIsCommitmentOpen(true);
            }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-full bg-[#1C1724] hover:bg-[#251F30] border border-[#3A3347] hover:border-brand-border text-white text-xs sm:text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
          >
            <Clock className="w-4 h-4 text-brand" />
            <span>Log Commitment</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveInvoiceId(undefined);
              setIsPaymentOpen(true);
            }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-full bg-[#1C1724] hover:bg-[#251F30] border border-[#3A3347] hover:border-emerald-500/50 text-white text-xs sm:text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Record Payment</span>
          </button>

          {/* Workspace Management Controls */}
          <div className="flex items-center gap-1.5 ml-1">
            <button
              type="button"
              onClick={handleSeedDemoData}
              disabled={actionLoading}
              title="Load Realistic Sample MSME Data for testing"
              className="p-2.5 rounded-full bg-[#1C1724] hover:bg-[#251F30] border border-[#3A3347] text-[#958D9E] hover:text-brand transition-colors"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleResetData}
              disabled={actionLoading}
              title="Clear Workspace"
              className="p-2.5 rounded-full bg-[#1C1724] hover:bg-rose-500/10 border border-[#3A3347] hover:border-rose-500/30 text-[#958D9E] hover:text-rose-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Overview Grid with smooth hover transitions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Outstanding */}
        <div className="bg-[#15121B] border border-[#292434] rounded-2xl p-5 hover:border-brand-border hover:-translate-y-0.5 transition-all duration-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#958D9E] font-medium">
            <span>Total Outstanding</span>
            <FileText className="w-4 h-4 text-brand" />
          </div>
          <div className="mt-3 text-2xl font-bold text-white tracking-tight tabular-nums font-mono">
            ₹{(stats?.totalOutstanding ?? 0).toLocaleString("en-IN")}
          </div>
          <div className="mt-1 text-xs text-[#958D9E]">
            Across {stats?.totalInvoicesCount ?? 0} invoices ({stats?.settledInvoicesCount ?? 0} settled)
          </div>
        </div>

        {/* Metric 2: Commitments Due This Week */}
        <div className="bg-[#15121B] border border-[#292434] rounded-2xl p-5 hover:border-brand-border hover:-translate-y-0.5 transition-all duration-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#958D9E] font-medium">
            <span>Commitments Due This Week</span>
            <Calendar className="w-4 h-4 text-brand" />
          </div>
          <div className="mt-3 text-2xl font-bold text-brand tracking-tight tabular-nums font-mono">
            ₹{(stats?.commitmentsDueThisWeek ?? 0).toLocaleString("en-IN")}
          </div>
          <div className="mt-1 text-xs text-emerald-400 font-medium">
            {stats?.promisedCount ?? 0} active buyer promises logged
          </div>
        </div>

        {/* Metric 3: MSMED Section 15 Alert */}
        <div
          className={`rounded-2xl p-5 transition-all duration-200 shadow-sm border hover:-translate-y-0.5 ${(stats?.overdueMsmedAmount ?? 0) > 0
              ? "bg-[#15121B] border-amber-500/40 hover:border-amber-500/60"
              : "bg-[#15121B] border-[#292434] hover:border-brand-border"
            }`}
        >
          <div className="flex items-center justify-between text-xs font-medium">
            <span className={(stats?.overdueMsmedAmount ?? 0) > 0 ? "text-amber-300" : "text-[#958D9E]"}>
              Overdue (&gt;45 Days MSMED)
            </span>
            <AlertTriangle
              className={`w-4 h-4 ${(stats?.overdueMsmedAmount ?? 0) > 0 ? "text-amber-400" : "text-[#665F70]"}`}
            />
          </div>
          <div
            className={`mt-3 text-2xl font-bold tracking-tight tabular-nums font-mono ${(stats?.overdueMsmedAmount ?? 0) > 0 ? "text-amber-300" : "text-white"
              }`}
          >
            ₹{(stats?.overdueMsmedAmount ?? 0).toLocaleString("en-IN")}
          </div>
          <div className="mt-1 text-xs text-[#958D9E]">
            {stats?.overdueCount ?? 0} invoices exceed statutory Section 15
          </div>
        </div>

        {/* Metric 4: Kept Rate */}
        <div className="bg-[#15121B] border border-[#292434] rounded-2xl p-5 hover:border-brand-border hover:-translate-y-0.5 transition-all duration-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#958D9E] font-medium">
            <span>Commitment Kept Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3 text-2xl font-bold text-white tracking-tight tabular-nums font-mono">
            {stats?.commitmentKeptRate ?? 100}%
          </div>
          <div className="mt-1 text-xs text-[#958D9E]">
            Resolution history across buyer promises
          </div>
        </div>
      </div>

      {/* Action Items / Needs Attention Surface */}
      {stats && stats.needsAttention && stats.needsAttention.length > 0 && (
        <div className="bg-[#15121B] border border-amber-500/30 rounded-3xl p-5 sm:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm sm:text-base font-bold text-white">
                Needs Immediate Attention ({stats.needsAttention.length})
              </h2>
            </div>
            <span className="text-[11px] text-[#958D9E]">Prioritized operational alerts</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {stats.needsAttention.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-[#1C1724] border border-[#292434] hover:border-amber-500/50 rounded-2xl flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-white">{item.invoiceNumber}</span>
                    <span className="text-amber-400 font-mono font-semibold">
                      ₹{item.amount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-brand mb-1">{item.buyerName}</div>
                  <p className="text-xs text-[#958D9E] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#292434] flex items-center justify-between">
                  <span className="text-[10px] text-[#665F70] font-mono">Due: {item.dueDate}</span>
                  <Link
                    href={`/dashboard/invoices/${item.invoiceId}`}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-brand hover:underline"
                  >
                    <span>Follow Up</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Area: Invoices Register */}
      <div className="bg-[#15121B] border border-[#292434] rounded-3xl overflow-hidden shadow-xl">
        {/* Header & Filter Controls */}
        <div className="p-5 sm:p-6 border-b border-[#292434] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Receivables Register &amp; Commitment Status
            </h2>
            <p className="text-xs text-[#958D9E]">
              Track credit due dates, active buyer commitments, and audit-ready delivery evidence
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#958D9E] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search invoice or buyer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white placeholder-[#665F70] focus:outline-none focus:border-brand w-48 sm:w-56"
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
              <option value="overdue_msmed">Overdue 45d (MSMED)</option>
              <option value="partially_paid">Partially Paid</option>
              <option value="paid">Settled / Paid</option>
              <option value="pending">Pending</option>
            </select>

            {/* Refresh */}
            <button
              type="button"
              onClick={fetchData}
              title="Refresh Register"
              className="p-2 bg-[#1C1724] hover:bg-[#251F30] border border-[#292434] text-[#958D9E] hover:text-white rounded-xl transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Empty State */}
        {filteredInvoices.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-[#1C1724] border border-[#292434] flex items-center justify-center text-brand mb-3">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              {searchTerm || filterStatus !== "all"
                ? "No invoices match your filter criteria"
                : "No credit invoices recorded yet"}
            </h3>
            <p className="text-xs text-[#958D9E] max-w-sm mb-5">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search keywords or resetting the status dropdown."
                : "Maintain an operational ledger of due dates, buyer payment commitments, and delivery proof."}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsRecordInvoiceOpen(true)}
                className="px-4 py-2 rounded-xl bg-brand text-[#15121A] text-xs font-bold hover:bg-brand-hover shadow-md transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Record Credit Invoice</span>
              </button>
              {invoices.length === 0 && (
                <button
                  type="button"
                  onClick={handleSeedDemoData}
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-xl bg-[#1C1724] hover:bg-[#251F30] border border-[#3A3347] text-white text-xs font-medium transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-brand" />
                  <span>Load Sample MSME Invoices</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Responsive Table with Quick View */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#292434] bg-[#1C1724]/60 text-[#958D9E] font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-5">Invoice #</th>
                  <th className="py-3.5 px-5">Buyer &amp; GSTIN</th>
                  <th className="py-3.5 px-5">Amount &amp; Balance</th>
                  <th className="py-3.5 px-5">Due Date &amp; Credit Age</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5">Active Commitment</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#292434]">
                {filteredInvoices.map((inv) => (
                  <tr
                    key={inv.id}
                    className="hover:bg-[#1C1724]/50 transition-colors group"
                  >
                    {/* Invoice Number with Quick View trigger */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleQuickViewInvoice(inv)}
                          className="font-mono font-bold text-white group-hover:text-brand transition-colors inline-flex items-center gap-1 hover:underline text-left"
                          title="View Official Tax Invoice"
                        >
                          <span>{inv.invoiceNumber}</span>
                          <Eye className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-brand" />
                        </button>
                      </div>
                    </td>

                    {/* Buyer */}
                    <td className="py-4 px-5">
                      <div className="font-semibold text-white">{inv.buyerName}</div>
                      <div className="text-[11px] text-[#665F70] font-mono">{inv.buyerGstin}</div>
                    </td>

                    {/* Amount & Balance */}
                    <td className="py-4 px-5">
                      <div className="font-bold text-white tabular-nums font-mono">
                        ₹{inv.amount.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[11px] text-[#958D9E] tabular-nums font-mono">
                        Pending: ₹{inv.outstandingAmount.toLocaleString("en-IN")}
                        {inv.paidAmount > 0 && (
                          <span className="text-emerald-400 ml-1">
                            (Paid ₹{inv.paidAmount.toLocaleString("en-IN")})
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Due Date & Credit Age */}
                    <td className="py-4 px-5">
                      <div className="text-white font-mono">{inv.dueDate}</div>
                      <div
                        className={`text-[11px] font-mono ${inv.isOverdueMsmed
                            ? "text-amber-400 font-bold"
                            : "text-[#958D9E]"
                          }`}
                      >
                        {inv.daysOutstanding} days credit
                        {inv.isOverdueMsmed && " (>45d MSMED)"}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-5">
                      {inv.status === "paid" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Settled</span>
                        </span>
                      )}
                      {inv.status === "partially_paid" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/30">
                          <Clock className="w-3 h-3" />
                          <span>Partially Paid</span>
                        </span>
                      )}
                      {inv.status === "promised" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-brand-soft text-brand border border-brand-border">
                          <Clock className="w-3 h-3" />
                          <span>Payment Promised</span>
                        </span>
                      )}
                      {inv.status === "followup_due" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                          <MessageSquare className="w-3 h-3" />
                          <span>Follow-up Due</span>
                        </span>
                      )}
                      {inv.status === "overdue_msmed" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Overdue 45d MSMED</span>
                        </span>
                      )}
                      {inv.status === "pending" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gray-500/10 text-gray-300 border border-gray-500/30">
                          <Clock className="w-3 h-3" />
                          <span>Credit Active</span>
                        </span>
                      )}
                    </td>

                    {/* Commitment Details */}
                    <td className="py-4 px-5 max-w-xs">
                      {inv.lastCommitmentText ? (
                        <>
                          <div
                            className="text-white truncate"
                            title={inv.lastCommitmentText}
                          >
                            {inv.lastCommitmentText}
                          </div>
                          {inv.commitmentDate && (
                            <div className="text-[11px] text-brand font-medium">
                              Promised: {inv.commitmentDate}
                            </div>
                          )}
                        </>
                      ) : (
                        <span className="text-[#665F70] italic">No active promise logged</span>
                      )}
                    </td>

                    {/* Actions & Evidence */}
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Quick View Tax Invoice Button */}
                        <button
                          type="button"
                          onClick={() => handleQuickViewInvoice(inv)}
                          title="Quick View Official Tax Invoice"
                          className="p-1.5 rounded-lg bg-[#1C1724] hover:bg-brand-soft text-[#958D9E] hover:text-brand border border-[#292434] hover:border-brand-border transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {inv.outstandingAmount > 0 && (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                setActiveInvoiceId(inv.id);
                                setIsPaymentOpen(true);
                              }}
                              title="Record Payment"
                              className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors"
                            >
                              <IndianRupee className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setActiveInvoiceId(inv.id);
                                setIsCommitmentOpen(true);
                              }}
                              title="Log Buyer Commitment"
                              className="p-1.5 rounded-lg bg-brand-soft hover:bg-brand/25 text-brand border border-brand-border transition-colors"
                            >
                              <Clock className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setActiveInvoiceId(inv.id);
                                setIsFollowUpOpen(true);
                              }}
                              title="Record Follow-up Call/Message"
                              className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            setActiveInvoiceId(inv.id);
                            setIsEvidenceOpen(true);
                          }}
                          title="Attach Evidence"
                          className="p-1.5 rounded-lg bg-[#1C1724] hover:bg-[#251F30] text-[#958D9E] hover:text-white border border-[#292434] transition-colors"
                        >
                          <Paperclip className="w-3.5 h-3.5" />
                        </button>

                        <Link
                          href={`/dashboard/invoices/${inv.id}`}
                          title="View Invoice Timeline & Audit Vault"
                          className="px-2.5 py-1 rounded-lg bg-[#1C1724] hover:bg-brand text-[#958D9E] hover:text-[#15121A] border border-[#292434] text-[11px] font-semibold transition-colors flex items-center gap-1"
                        >
                          <span>Timeline</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      <RecordInvoiceModal
        isOpen={isRecordInvoiceOpen}
        onClose={() => setIsRecordInvoiceOpen(false)}
        onInvoiceCreated={fetchData}
      />

      <LogCommitmentModal
        isOpen={isCommitmentOpen}
        onClose={() => setIsCommitmentOpen(false)}
        onCommitmentLogged={fetchData}
        preselectedInvoiceId={activeInvoiceId}
      />

      <RecordPaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onPaymentRecorded={fetchData}
        preselectedInvoiceId={activeInvoiceId}
      />

      <RecordFollowUpModal
        isOpen={isFollowUpOpen}
        onClose={() => setIsFollowUpOpen(false)}
        onFollowUpRecorded={fetchData}
        preselectedInvoiceId={activeInvoiceId}
      />

      <AttachEvidenceModal
        isOpen={isEvidenceOpen}
        onClose={() => setIsEvidenceOpen(false)}
        onEvidenceAttached={fetchData}
        preselectedInvoiceId={activeInvoiceId}
      />

      {/* Quick View Tax Invoice Modal */}
      <InvoiceViewerModal
        isOpen={Boolean(viewingInvoice)}
        onClose={() => setViewingInvoice(null)}
        invoice={viewingInvoice}
        onOpenDocument={(doc) => setViewingDocument(doc)}
      />

      {/* Document Viewer Modal */}
      <DocumentViewerModal
        isOpen={Boolean(viewingDocument)}
        onClose={() => setViewingDocument(null)}
        document={viewingDocument}
      />
    </div>
  );
}
