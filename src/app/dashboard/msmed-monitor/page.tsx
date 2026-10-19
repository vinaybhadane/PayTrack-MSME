"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ShieldCheck,
  Clock,
  ArrowUpRight,
  Info,
  Calendar,
  IndianRupee,
  Building2,
  FileText,
  AlertCircle,
} from "lucide-react";

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
  status: string;
  isOverdueMsmed: boolean;
}

export default function MsmedMonitorPage() {
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInvoices = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/invoices");
      const data = await res.json();
      if (data.success && data.invoices) {
        // Only active unpaid credit invoices
        setInvoices(data.invoices.filter((i: any) => i.outstandingAmount > 0));
      }
    } catch (err) {
      console.warn("Error loading invoices for MSMED monitor:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  // Segment invoices into statutory cohorts
  const safeInvoices = invoices.filter((i) => i.daysOutstanding <= 30);
  const cautionInvoices = invoices.filter((i) => i.daysOutstanding > 30 && i.daysOutstanding <= 45);
  const breachedInvoices = invoices.filter((i) => i.daysOutstanding > 45);

  const totalBreachedAmount = breachedInvoices.reduce((sum, i) => sum + i.outstandingAmount, 0);

  // RBI Repo rate calculation estimate (Repo ~6.5% * 3 = 19.5% p.a. compound monthly)
  // Penal interest approx: principal * (19.5% / 365) * overdue_days
  const calculateEstimatedInterest = (principal: number, days: number) => {
    const overdueDays = Math.max(0, days - 45);
    const dailyRate = 0.195 / 365;
    return Math.round(principal * dailyRate * overdueDays);
  };

  const totalEstimatedInterest = breachedInvoices.reduce(
    (sum, i) => sum + calculateEstimatedInterest(i.outstandingAmount, i.daysOutstanding),
    0
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#15121B] border border-[#292434] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Statutory Compliance Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            MSMED Act 45-Day Monitor
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#958D9E] max-w-2xl leading-relaxed">
            Monitor receivables against statutory thresholds under Section 15 of the Micro, Small and
            Medium Enterprises Development (MSMED) Act, 2006.
          </p>
        </div>

        {totalBreachedAmount > 0 && (
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-right shrink-0">
            <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider block">
              Total Overdue Exposure (&gt;45d)
            </span>
            <span className="text-2xl font-bold text-amber-300 font-mono tabular-nums block mt-1">
              ₹{totalBreachedAmount.toLocaleString("en-IN")}
            </span>
            <span className="text-[10px] text-amber-400/80 block mt-0.5">
              Across {breachedInvoices.length} statutory breach invoices
            </span>
          </div>
        )}
      </div>

      {/* Statutory Regulatory Guide Card */}
      <div className="p-4 sm:p-5 bg-[#1C1724] border border-[#292434] rounded-2xl flex items-start gap-3.5 text-xs text-[#D4CFDC] leading-relaxed">
        <Info className="w-5 h-5 text-brand shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">MSMED Act 2006 Statutory Guidelines:</strong>
          <span className="text-[#958D9E] ml-1">
            Under Section 15, the agreed credit period between an MSME supplier and a B2B buyer
            cannot exceed 45 days from delivery acceptance. In the absence of an agreement, payment is
            due within 15 days. Under Section 16, failure to settle within 45 days triggers compound
            interest with monthly rests at 3 times the RBI Bank Rate (~19.5% p.a.). All calculations
            are informational records for supplier tracking.
          </span>
        </div>
      </div>

      {/* 3 Statutory Buckets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Bucket 1: Safe Horizon */}
        <div className="bg-[#15121B] border border-[#292434] rounded-3xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold mb-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>0 – 30 Days (Standard)</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px]">
                Compliant
              </span>
            </div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums mt-3">
              ₹
              {safeInvoices
                .reduce((sum, i) => sum + i.outstandingAmount, 0)
                .toLocaleString("en-IN")}
            </div>
            <p className="text-xs text-[#958D9E] mt-1">
              {safeInvoices.length} invoices within healthy credit horizon
            </p>
          </div>
        </div>

        {/* Bucket 2: Caution Zone */}
        <div className="bg-[#15121B] border border-blue-500/30 rounded-3xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-blue-300 font-semibold mb-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>31 – 45 Days (Approaching)</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-[10px]">
                Caution
              </span>
            </div>
            <div className="text-2xl font-bold text-blue-300 font-mono tabular-nums mt-3">
              ₹
              {cautionInvoices
                .reduce((sum, i) => sum + i.outstandingAmount, 0)
                .toLocaleString("en-IN")}
            </div>
            <p className="text-xs text-[#958D9E] mt-1">
              {cautionInvoices.length} invoices nearing 45-day threshold
            </p>
          </div>
        </div>

        {/* Bucket 3: Breach Zone */}
        <div className="bg-[#15121B] border border-amber-500/50 rounded-3xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-amber-300 font-semibold mb-2">
              <span className="flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>&gt;45 Days (Breached)</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px]">
                Statutory Breach
              </span>
            </div>
            <div className="text-2xl font-bold text-amber-300 font-mono tabular-nums mt-3">
              ₹{totalBreachedAmount.toLocaleString("en-IN")}
            </div>
            <p className="text-xs text-amber-400/80 mt-1">
              Estimated penal interest: ~₹{totalEstimatedInterest.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>

      {/* Section 15 Breached Invoices Table */}
      <div className="bg-[#15121B] border border-[#292434] rounded-3xl p-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-[#292434] mb-4">
          <div>
            <h2 className="text-base font-bold text-white">
              Overdue Receivables Exceeding 45-Day Statutory Limit
            </h2>
            <p className="text-xs text-[#958D9E]">
              Invoices eligible for MSME Samadhaan dispute facilitation under Section 18
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-amber-400">
            {breachedInvoices.length} Invoices
          </span>
        </div>

        {breachedInvoices.length === 0 ? (
          <div className="py-8 text-center text-xs text-emerald-400 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Zero invoices currently exceed the statutory 45-day credit period!</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#292434] text-[#958D9E]">
                  <th className="py-3 px-4">Invoice #</th>
                  <th className="py-3 px-4">Buyer Entity &amp; GSTIN</th>
                  <th className="py-3 px-4">Issue Date</th>
                  <th className="py-3 px-4">Credit Age</th>
                  <th className="py-3 px-4">Principal Pending</th>
                  <th className="py-3 px-4">Est. Penal Interest</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#292434]">
                {breachedInvoices.map((inv) => {
                  const estInterest = calculateEstimatedInterest(
                    inv.outstandingAmount,
                    inv.daysOutstanding
                  );
                  return (
                    <tr key={inv.id} className="hover:bg-[#1C1724]/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-white">
                        {inv.invoiceNumber}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">{inv.buyerName}</div>
                        <div className="text-[11px] text-[#665F70] font-mono">{inv.buyerGstin}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#D4CFDC]">{inv.issueDate}</td>
                      <td className="py-3.5 px-4">
                        <span className="text-amber-400 font-bold font-mono">
                          {inv.daysOutstanding} Days
                        </span>
                        <span className="text-[10px] text-[#665F70] block">
                          (+{inv.daysOutstanding - 45}d delay)
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-white font-mono tabular-nums">
                        ₹{inv.outstandingAmount.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3.5 px-4 text-amber-300 font-mono tabular-nums">
                        ~₹{estInterest.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/dashboard/invoices/${inv.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-soft text-brand hover:bg-brand hover:text-[#15121A] text-xs font-bold transition-all"
                        >
                          <span>Manage</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
