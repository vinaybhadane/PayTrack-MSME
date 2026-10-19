"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  MessageSquare,
  Plus,
  ArrowUpRight,
  IndianRupee,
  Search,
} from "lucide-react";
import { LogCommitmentModal } from "@/components/dashboard/LogCommitmentModal";
import { RecordPaymentModal } from "@/components/dashboard/RecordPaymentModal";
import { RecordFollowUpModal } from "@/components/dashboard/RecordFollowUpModal";

interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
  buyerName: string;
  amount: number;
  outstandingAmount: number;
  status: string;
  lastCommitmentText?: string;
  commitmentDate?: string;
}

export default function CommitmentsPage() {
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "missed" | "this_week">("all");

  const [isCommitmentOpen, setIsCommitmentOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isFollowUpOpen, setIsFollowUpOpen] = useState(false);
  const [activeInvoiceId, setActiveInvoiceId] = useState<string | undefined>();

  const fetchInvoices = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/invoices");
      const data = await res.json();
      if (data.success && data.invoices) {
        setInvoices(data.invoices);
      }
    } catch (err) {
      console.warn("Error fetching commitments:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Invoices with commitments
  const committedInvoices = invoices.filter((i) => i.commitmentDate);

  const filteredInvoices = committedInvoices.filter((inv) => {
    if (!inv.commitmentDate) return false;
    const cDate = new Date(inv.commitmentDate);
    cDate.setHours(0, 0, 0, 0);

    if (filter === "missed") {
      return cDate < today && inv.outstandingAmount > 0;
    }
    if (filter === "this_week") {
      const day = today.getDay();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - day);
      const endOfWeek = new Date(today);
      endOfWeek.setDate(today.getDate() + (6 - day));
      return cDate >= startOfWeek && cDate <= endOfWeek;
    }
    if (filter === "active") {
      return inv.outstandingAmount > 0;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#15121B] border border-[#292434] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-soft border border-brand-border text-brand text-xs font-semibold uppercase tracking-wider mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>Buyer Payment Commitments</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Commitment Tracking Register
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#958D9E] max-w-2xl leading-relaxed">
            Maintain historical and active buyer promises. Track whether commitments were honored,
            delayed, or broken before escalating.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setActiveInvoiceId(undefined);
            setIsCommitmentOpen(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand hover:bg-brand-hover text-[#15121A] text-xs sm:text-sm font-bold shadow-md transition-all hover:-translate-y-0.5 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Log New Commitment</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            filter === "all"
              ? "bg-brand text-[#15121A]"
              : "bg-[#1C1724] text-[#958D9E] hover:text-white"
          }`}
        >
          All Promises ({committedInvoices.length})
        </button>

        <button
          type="button"
          onClick={() => setFilter("this_week")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            filter === "this_week"
              ? "bg-brand text-[#15121A]"
              : "bg-[#1C1724] text-[#958D9E] hover:text-white"
          }`}
        >
          Due This Week
        </button>

        <button
          type="button"
          onClick={() => setFilter("missed")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            filter === "missed"
              ? "bg-amber-400 text-[#15121A]"
              : "bg-[#1C1724] text-amber-400 hover:text-white"
          }`}
        >
          Missed Commitments
        </button>

        <button
          type="button"
          onClick={() => setFilter("active")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            filter === "active"
              ? "bg-brand text-[#15121A]"
              : "bg-[#1C1724] text-[#958D9E] hover:text-white"
          }`}
        >
          Unsettled Invoices Only
        </button>
      </div>

      {/* Commitments List */}
      {loading ? (
        <div className="py-16 text-center text-xs text-[#958D9E]">
          <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          Loading commitments...
        </div>
      ) : filteredInvoices.length === 0 ? (
        <div className="p-12 text-center bg-[#15121B] border border-[#292434] rounded-3xl">
          <Clock className="w-8 h-8 text-brand mx-auto mb-2 opacity-80" />
          <h3 className="text-base font-bold text-white mb-1">No Commitments in this View</h3>
          <p className="text-xs text-[#958D9E] max-w-sm mx-auto mb-4">
            Log specific payment promises from accounts officers, WhatsApp chats, or phone calls.
          </p>
          <button
            type="button"
            onClick={() => setIsCommitmentOpen(true)}
            className="px-4 py-2 bg-brand text-[#15121A] rounded-xl text-xs font-bold"
          >
            Log Payment Promise
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredInvoices.map((inv) => {
            const cDate = new Date(inv.commitmentDate!);
            cDate.setHours(0, 0, 0, 0);
            const isMissed = cDate < today && inv.outstandingAmount > 0;
            const isSettled = inv.outstandingAmount === 0;

            return (
              <div
                key={inv.id}
                className="bg-[#15121B] border border-[#292434] hover:border-brand-border rounded-3xl p-5 sm:p-6 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-brand bg-brand-soft border border-brand-border px-2.5 py-0.5 rounded-full">
                      {inv.invoiceNumber}
                    </span>

                    {isSettled ? (
                      <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Honored &amp; Paid</span>
                      </span>
                    ) : isMissed ? (
                      <span className="text-[11px] font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-400" />
                        <span>Missed Commitment</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-brand bg-brand/10 border border-brand/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Pending Promise</span>
                      </span>
                    )}

                    <span className="text-xs text-white font-bold">{inv.buyerName}</span>
                  </div>

                  <p className="text-xs text-[#D4CFDC] leading-relaxed max-w-2xl">
                    {inv.lastCommitmentText}
                  </p>

                  <div className="text-xs text-[#665F70] font-mono flex items-center gap-3">
                    <span>Promised Date: <strong className="text-white">{inv.commitmentDate}</strong></span>
                    <span>•</span>
                    <span>
                      Pending: <strong className="text-white">₹{inv.outstandingAmount.toLocaleString("en-IN")}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {inv.outstandingAmount > 0 && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveInvoiceId(inv.id);
                          setIsPaymentOpen(true);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-brand text-[#15121A] text-xs font-bold hover:bg-brand-hover shadow-sm transition-all"
                      >
                        Record Payment
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveInvoiceId(inv.id);
                          setIsFollowUpOpen(true);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-[#1C1724] border border-[#292434] hover:border-brand-border text-white text-xs font-semibold transition-all"
                      >
                        Follow-Up
                      </button>
                    </>
                  )}

                  <Link
                    href={`/dashboard/invoices/${inv.id}`}
                    className="p-2 rounded-xl bg-[#1C1724] border border-[#292434] hover:border-brand text-[#958D9E] hover:text-white transition-all"
                    title="View Full Timeline"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      <LogCommitmentModal
        isOpen={isCommitmentOpen}
        onClose={() => setIsCommitmentOpen(false)}
        onCommitmentLogged={fetchInvoices}
        preselectedInvoiceId={activeInvoiceId}
      />

      <RecordPaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onPaymentRecorded={fetchInvoices}
        preselectedInvoiceId={activeInvoiceId}
      />

      <RecordFollowUpModal
        isOpen={isFollowUpOpen}
        onClose={() => setIsFollowUpOpen(false)}
        onFollowUpRecorded={fetchInvoices}
        preselectedInvoiceId={activeInvoiceId}
      />
    </div>
  );
}
