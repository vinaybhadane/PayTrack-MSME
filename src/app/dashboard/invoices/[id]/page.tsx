"use client";

import React, { useState, useEffect, useCallback, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Building2,
  Phone,
  Mail,
  MapPin,
  Plus,
  MessageSquare,
  IndianRupee,
  Paperclip,
  ShieldCheck,
  TrendingUp,
  Download,
  ExternalLink,
  Printer,
  Eye,
} from "lucide-react";
import { RecordPaymentModal } from "@/components/dashboard/RecordPaymentModal";
import { LogCommitmentModal } from "@/components/dashboard/LogCommitmentModal";
import { RecordFollowUpModal } from "@/components/dashboard/RecordFollowUpModal";
import { AttachEvidenceModal } from "@/components/dashboard/AttachEvidenceModal";
import { InvoiceViewerModal } from "@/components/dashboard/InvoiceViewerModal";
import { DocumentViewerModal } from "@/components/dashboard/DocumentViewerModal";

interface InvoiceDetailState {
  invoice: any;
  buyer: any;
  payments: any[];
  followUps: any[];
  commitments: any[];
  evidence: any[];
  activityEvents: any[];
}

export default function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const invoiceId = resolvedParams.id;

  const [data, setData] = useState<InvoiceDetailState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modals
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isCommitmentOpen, setIsCommitmentOpen] = useState(false);
  const [isFollowUpOpen, setIsFollowUpOpen] = useState(false);
  const [isEvidenceOpen, setIsEvidenceOpen] = useState(false);
  const [isInvoiceViewerOpen, setIsInvoiceViewerOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  const fetchInvoice = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/invoices/${invoiceId}`);
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to load invoice details");
      }
      setData(json);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error fetching invoice";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [invoiceId]);

  useEffect(() => {
    fetchInvoice();
  }, [fetchInvoice]);

  if (loading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center text-white animate-pulse">
        <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs text-[#958D9E]">Loading operational timeline and evidence...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-8 bg-[#15121B] border border-rose-500/30 rounded-3xl text-center">
        <AlertTriangle className="w-8 h-8 text-rose-400 mx-auto mb-2" />
        <h2 className="text-base font-bold text-white mb-1">Invoice Not Found</h2>
        <p className="text-xs text-[#958D9E] mb-4">{error || "Unable to retrieve invoice record."}</p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-[#15121A] rounded-xl text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Receivables Register</span>
        </Link>
      </div>
    );
  }

  const { invoice, buyer, payments, followUps, commitments, evidence, activityEvents } = data;

  const paymentPercentage =
    invoice.amount > 0 ? Math.min(100, Math.round((invoice.paidAmount / invoice.amount) * 100)) : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Back Link */}
      <div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#958D9E] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Receivables Register</span>
        </Link>
      </div>

      {/* Header Banner */}
      <div className="bg-[#15121B] border border-[#292434] rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div>
          <div className="flex flex-wrap items-center gap-2.5 mb-2">
            <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-brand-soft border border-brand-border text-brand">
              {invoice.invoiceNumber}
            </span>

            {invoice.status === "paid" && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Fully Settled</span>
              </span>
            )}
            {invoice.status === "partially_paid" && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/30">
                <Clock className="w-3.5 h-3.5" />
                <span>Partially Paid ({paymentPercentage}%)</span>
              </span>
            )}
            {invoice.status === "promised" && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-brand-soft text-brand border border-brand-border">
                <Clock className="w-3.5 h-3.5" />
                <span>Payment Promised</span>
              </span>
            )}
            {invoice.status === "overdue_msmed" && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Overdue &gt;45 Days MSMED</span>
              </span>
            )}
            {invoice.status === "followup_due" && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Follow-up Due</span>
              </span>
            )}

            {invoice.isOverdueMsmed && (
              <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30 font-semibold">
                Section 15 Threshold Exceeded ({invoice.daysOutstanding}d)
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {invoice.buyerName}
          </h1>
          <p className="mt-1 text-xs text-[#958D9E] font-mono flex items-center gap-3">
            <span>GSTIN: {invoice.buyerGstin}</span>
            <span>•</span>
            <span>Issued: {invoice.issueDate}</span>
            <span>•</span>
            <span>Due: {invoice.dueDate}</span>
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* View Tax Invoice Button */}
          <button
            type="button"
            onClick={() => setIsInvoiceViewerOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#1C1724] hover:bg-[#251F30] border border-[#3A3347] hover:border-brand-border text-white text-xs font-medium transition-all shadow-sm"
            title="View / Print Official GST Tax Invoice"
          >
            <Printer className="w-4 h-4 text-brand" />
            <span>View Tax Invoice</span>
          </button>

          {invoice.outstandingAmount > 0 && (
            <>
              <button
                type="button"
                onClick={() => setIsPaymentOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand hover:bg-brand-hover text-[#15121A] text-xs font-bold shadow-md transition-all"
              >
                <IndianRupee className="w-4 h-4 stroke-[2.5]" />
                <span>Record Payment</span>
              </button>

              <button
                type="button"
                onClick={() => setIsCommitmentOpen(true)}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#1C1724] hover:bg-[#251F30] border border-[#3A3347] hover:border-brand-border text-white text-xs font-medium transition-all"
              >
                <Clock className="w-4 h-4 text-brand" />
                <span>Log Commitment</span>
              </button>

              <button
                type="button"
                onClick={() => setIsFollowUpOpen(true)}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#1C1724] hover:bg-[#251F30] border border-[#3A3347] hover:border-blue-500/50 text-white text-xs font-medium transition-all"
              >
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <span>Record Follow-Up</span>
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => setIsEvidenceOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#1C1724] hover:bg-[#251F30] border border-[#3A3347] text-white text-xs font-medium transition-all"
          >
            <Paperclip className="w-4 h-4 text-[#958D9E]" />
            <span>Attach Evidence</span>
          </button>
        </div>
      </div>

      {/* Financial Health Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Amount */}
        <div className="bg-[#15121B] border border-[#292434] rounded-2xl p-5 hover:border-brand-border/40 transition-colors">
          <div className="text-xs text-[#958D9E] font-medium">Invoice Value</div>
          <div className="mt-2 text-2xl font-bold text-white font-mono tabular-nums">
            ₹{invoice.amount.toLocaleString("en-IN")}
          </div>
          <div className="mt-1 text-xs text-[#665F70]">Total billed credit amount</div>
        </div>

        {/* Paid Amount */}
        <div className="bg-[#15121B] border border-[#292434] rounded-2xl p-5 hover:border-emerald-500/40 transition-colors">
          <div className="text-xs text-[#958D9E] font-medium">Received to Date</div>
          <div className="mt-2 text-2xl font-bold text-emerald-400 font-mono tabular-nums">
            ₹{invoice.paidAmount.toLocaleString("en-IN")}
          </div>
          <div className="mt-1 text-xs text-emerald-500/80">
            {paymentPercentage}% of total invoice cleared
          </div>
        </div>

        {/* Outstanding Amount */}
        <div
          className={`rounded-2xl p-5 border transition-colors ${
            invoice.outstandingAmount > 0
              ? "bg-[#15121B] border-amber-500/40 hover:border-amber-500/60"
              : "bg-[#15121B] border-[#292434]"
          }`}
        >
          <div
            className={`text-xs font-medium ${
              invoice.outstandingAmount > 0 ? "text-amber-300" : "text-[#958D9E]"
            }`}
          >
            Outstanding Balance
          </div>
          <div
            className={`mt-2 text-2xl font-bold font-mono tabular-nums ${
              invoice.outstandingAmount > 0 ? "text-amber-300" : "text-white"
            }`}
          >
            ₹{invoice.outstandingAmount.toLocaleString("en-IN")}
          </div>
          <div className="mt-1 text-xs text-[#665F70]">
            {invoice.outstandingAmount === 0 ? "Zero balance pending" : "Requires settlement"}
          </div>
        </div>
      </div>

      {/* Payment Progress Bar */}
      <div className="bg-[#15121B] border border-[#292434] rounded-2xl p-4">
        <div className="flex items-center justify-between text-xs text-[#958D9E] mb-2 font-mono">
          <span>Settlement Progress</span>
          <span>{paymentPercentage}% Cleared</span>
        </div>
        <div className="w-full h-2.5 bg-[#1C1724] rounded-full overflow-hidden">
          <div
            className="h-full bg-brand transition-all duration-500"
            style={{ width: `${paymentPercentage}%` }}
          />
        </div>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Chronological Operational Timeline (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#15121B] border border-[#292434] rounded-3xl p-6 sm:p-7 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#292434] mb-6">
              <div>
                <h2 className="text-base font-bold text-white">Invoice Operational Timeline</h2>
                <p className="text-xs text-[#958D9E]">
                  Complete verifiable sequence: Follow-ups, commitments, receipts &amp; evidence
                </p>
              </div>
              <span className="text-xs text-brand font-mono font-semibold">
                {activityEvents.length} Events Logged
              </span>
            </div>

            {activityEvents.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#958D9E]">
                No activity logged yet for this invoice.
              </div>
            ) : (
              <div className="relative border-l-2 border-[#292434] ml-3 sm:ml-4 pl-5 sm:pl-6 space-y-6">
                {activityEvents.map((evt) => {
                  let badgeColor = "bg-brand text-[#15121A]";
                  let eventLabel = evt.eventType;

                  if (evt.eventType === "PAYMENT_RECORDED") {
                    badgeColor = "bg-emerald-400 text-[#15121A]";
                    eventLabel = "Payment Received";
                  } else if (evt.eventType === "COMMITMENT_LOGGED") {
                    badgeColor = "bg-amber-400 text-[#15121A]";
                    eventLabel = "Promise Logged";
                  } else if (evt.eventType === "FOLLOWUP_LOGGED") {
                    badgeColor = "bg-blue-400 text-[#15121A]";
                    eventLabel = "Follow-Up Conducted";
                  } else if (evt.eventType === "EVIDENCE_ATTACHED") {
                    badgeColor = "bg-purple-400 text-[#15121A]";
                    eventLabel = "Evidence Attached";
                  } else if (evt.eventType === "INVOICE_CREATED") {
                    badgeColor = "bg-gray-400 text-[#15121A]";
                    eventLabel = "Invoice Recorded";
                  }

                  const formattedDate = new Date(evt.createdAt).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <div key={evt.id} className="relative group">
                      {/* Node Bullet */}
                      <div
                        className={`absolute -left-[27px] sm:-left-[31px] top-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#15121B] ${
                          evt.eventType === "PAYMENT_RECORDED"
                            ? "bg-emerald-400"
                            : evt.eventType === "COMMITMENT_LOGGED"
                            ? "bg-amber-400"
                            : "bg-brand"
                        }`}
                      />

                      <div className="p-4 bg-[#1C1724] border border-[#292434] rounded-2xl group-hover:border-brand-border transition-colors">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${badgeColor}`}
                          >
                            {eventLabel}
                          </span>
                          <span className="text-[11px] text-[#665F70] font-mono">
                            {formattedDate}
                          </span>
                        </div>

                        <p className="text-xs text-white leading-relaxed">{evt.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Payments Receipt Table */}
          <div className="bg-[#15121B] border border-[#292434] rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#292434] mb-4">
              <h2 className="text-base font-bold text-white">Payment Receipts History</h2>
              <span className="text-xs text-[#958D9E]">{payments.length} Recorded</span>
            </div>

            {payments.length === 0 ? (
              <div className="py-6 text-center text-xs text-[#665F70]">
                No payment receipts logged yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#292434] text-[#958D9E]">
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Amount</th>
                      <th className="py-2.5 px-3">Mode</th>
                      <th className="py-2.5 px-3">UTR / Reference</th>
                      <th className="py-2.5 px-3">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#292434]">
                    {payments.map((p) => (
                      <tr key={p.id}>
                        <td className="py-3 px-3 font-mono text-white">{p.paymentDate}</td>
                        <td className="py-3 px-3 font-mono font-bold text-emerald-400">
                          ₹{p.amount.toLocaleString("en-IN")}
                        </td>
                        <td className="py-3 px-3 text-[#D4CFDC]">{p.paymentMode}</td>
                        <td className="py-3 px-3 font-mono text-white">{p.reference || "—"}</td>
                        <td className="py-3 px-3 text-[#958D9E] max-w-xs truncate">{p.notes || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Buyer Details & Evidence Vault (1/3 width) */}
        <div className="space-y-6">
          {/* Buyer Profile Card */}
          <div className="bg-[#15121B] border border-[#292434] rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#292434]">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-brand" />
                <h3 className="text-sm font-bold text-white">Buyer Profile</h3>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[#665F70] block">Corporate Entity</span>
                <span className="text-white font-semibold">{buyer.name}</span>
              </div>
              {buyer.gstin && (
                <div>
                  <span className="text-[#665F70] block">GSTIN</span>
                  <span className="text-white font-mono">{buyer.gstin}</span>
                </div>
              )}
              {buyer.contactPerson && (
                <div>
                  <span className="text-[#665F70] block">Accounts / Commercial Contact</span>
                  <span className="text-white">{buyer.contactPerson}</span>
                </div>
              )}
              {buyer.phone && (
                <div>
                  <span className="text-[#665F70] block">Phone / WhatsApp</span>
                  <span className="text-white font-mono">{buyer.phone}</span>
                </div>
              )}
              {buyer.email && (
                <div>
                  <span className="text-[#665F70] block">Email</span>
                  <span className="text-white font-mono">{buyer.email}</span>
                </div>
              )}
              {buyer.address && (
                <div>
                  <span className="text-[#665F70] block">Address</span>
                  <span className="text-white">{buyer.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Active Commitments Card */}
          <div className="bg-[#15121B] border border-[#292434] rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#292434]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand" />
                <h3 className="text-sm font-bold text-white">Buyer Commitments</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCommitmentOpen(true)}
                className="text-[11px] font-bold text-brand hover:underline"
              >
                + Log
              </button>
            </div>

            {commitments.length === 0 ? (
              <p className="text-xs text-[#665F70] py-3 text-center">
                No payment commitment logged yet.
              </p>
            ) : (
              <div className="space-y-3">
                {commitments.map((com) => (
                  <div
                    key={com.id}
                    className="p-3 bg-[#1C1724] border border-[#292434] rounded-2xl text-xs"
                  >
                    <div className="flex items-center justify-between text-brand font-semibold mb-1">
                      <span>Promised: {com.promisedDate}</span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-brand/10 border border-brand/20">
                        {com.sourceChannel || "whatsapp"}
                      </span>
                    </div>
                    {com.promisedAmount && (
                      <div className="text-white font-mono font-bold mb-1">
                        Amount: ₹{com.promisedAmount.toLocaleString("en-IN")}
                      </div>
                    )}
                    {com.notes && <p className="text-[#958D9E] leading-relaxed">{com.notes}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Evidence Vault Card with Interactive Document Viewer */}
          <div className="bg-[#15121B] border border-[#292434] rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#292434]">
              <div className="flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-brand" />
                <h3 className="text-sm font-bold text-white">Evidence Vault</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEvidenceOpen(true)}
                className="text-[11px] font-bold text-brand hover:underline"
              >
                + Attach
              </button>
            </div>

            {evidence.length === 0 ? (
              <p className="text-xs text-[#665F70] py-3 text-center">
                No delivery proofs or POs attached.
              </p>
            ) : (
              <div className="space-y-2.5">
                {evidence.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDocument(doc)}
                    className="p-3 bg-[#1C1724] border border-[#292434] hover:border-brand-border rounded-2xl flex items-center justify-between text-xs cursor-pointer group transition-all"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="font-semibold text-white group-hover:text-brand truncate transition-colors flex items-center gap-1.5">
                        <span>{doc.fileName}</span>
                        <Eye className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-brand transition-opacity" />
                      </div>
                      <div className="text-[10px] text-brand uppercase tracking-wider font-semibold">
                        {doc.category.replace("_", " ")}
                      </div>
                      {doc.description && (
                        <div className="text-[11px] text-[#958D9E] mt-0.5 truncate">
                          {doc.description}
                        </div>
                      )}
                    </div>
                    <span className="p-1.5 rounded-lg bg-white/5 group-hover:bg-brand-soft text-[#958D9E] group-hover:text-brand transition-colors shrink-0">
                      <FileText className="w-4 h-4" />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <RecordPaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onPaymentRecorded={fetchInvoice}
        preselectedInvoiceId={invoice.id}
      />

      <LogCommitmentModal
        isOpen={isCommitmentOpen}
        onClose={() => setIsCommitmentOpen(false)}
        onCommitmentLogged={fetchInvoice}
        preselectedInvoiceId={invoice.id}
      />

      <RecordFollowUpModal
        isOpen={isFollowUpOpen}
        onClose={() => setIsFollowUpOpen(false)}
        onFollowUpRecorded={fetchInvoice}
        preselectedInvoiceId={invoice.id}
      />

      <AttachEvidenceModal
        isOpen={isEvidenceOpen}
        onClose={() => setIsEvidenceOpen(false)}
        onEvidenceAttached={fetchInvoice}
        preselectedInvoiceId={invoice.id}
      />

      {/* Full GST Tax Invoice Preview Modal */}
      <InvoiceViewerModal
        isOpen={isInvoiceViewerOpen}
        onClose={() => setIsInvoiceViewerOpen(false)}
        invoice={{
          id: invoice.id,
          invoiceNumber: invoice.invoiceNumber,
          issueDate: invoice.issueDate,
          dueDate: invoice.dueDate,
          amount: invoice.amount,
          paidAmount: invoice.paidAmount,
          outstandingAmount: invoice.outstandingAmount,
          status: invoice.status,
          daysOutstanding: invoice.daysOutstanding,
          isOverdueMsmed: invoice.isOverdueMsmed,
          notes: invoice.notes,
          buyerName: invoice.buyerName,
          buyerGstin: invoice.buyerGstin,
          buyerAddress: buyer?.address,
          buyerContact: buyer?.contactPerson,
          buyerPhone: buyer?.phone,
          evidence: evidence,
        }}
        onOpenDocument={(doc) => setSelectedDocument(doc)}
      />

      {/* Evidence Document Previewer Modal */}
      <DocumentViewerModal
        isOpen={Boolean(selectedDocument)}
        onClose={() => setSelectedDocument(null)}
        document={selectedDocument}
      />
    </div>
  );
}
