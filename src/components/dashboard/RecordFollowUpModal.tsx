"use client";

import React, { useState, useEffect } from "react";
import { X, MessageSquare, Phone, Mail, Calendar, Check, AlertCircle } from "lucide-react";

interface InvoiceOption {
  id: string;
  invoiceNumber: string;
  buyerName: string;
  outstandingAmount: number;
}

interface RecordFollowUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFollowUpRecorded: () => void;
  preselectedInvoiceId?: string;
}

export function RecordFollowUpModal({
  isOpen,
  onClose,
  onFollowUpRecorded,
  preselectedInvoiceId,
}: RecordFollowUpModalProps) {
  const [invoices, setInvoices] = useState<InvoiceOption[]>([]);
  const [invoiceId, setInvoiceId] = useState(preselectedInvoiceId || "");
  const [channel, setChannel] = useState<"phone" | "whatsapp" | "email" | "meeting" | "letter" | "other">("phone");
  const [contactPerson, setContactPerson] = useState("");
  const [notes, setNotes] = useState("");
  const [buyerResponse, setBuyerResponse] = useState("");
  const [nextFollowupAt, setNextFollowupAt] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (preselectedInvoiceId) {
        setInvoiceId(preselectedInvoiceId);
      }
      fetch("/api/invoices")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.invoices) {
            const unpaid = data.invoices.filter((i: any) => i.outstandingAmount > 0);
            setInvoices(unpaid);
            if (!invoiceId && unpaid.length > 0) {
              setInvoiceId(unpaid[0].id);
            }
          }
        })
        .catch((err) => console.warn("Error fetching invoices for follow-up:", err));
    }
  }, [isOpen, preselectedInvoiceId]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!invoiceId) {
      setError("Please select an invoice.");
      return;
    }
    if (!notes.trim()) {
      setError("Please enter follow-up discussion notes.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/followups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceId,
          channel,
          contactPerson: contactPerson.trim() || undefined,
          notes: notes.trim(),
          buyerResponse: buyerResponse.trim() || undefined,
          nextFollowupAt: nextFollowupAt || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to record follow-up");
      }
      onFollowUpRecorded();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error recording follow-up";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#15121B] border border-[#292434] rounded-3xl p-6 shadow-2xl text-white my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#292434]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Record Follow-Up Call / Message</h2>
              <p className="text-xs text-[#958D9E]">Log communication and buyer remarks on credit invoices</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#958D9E] hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#D4CFDC] mb-1.5">
              Select Invoice *
            </label>
            <select
              value={invoiceId}
              onChange={(e) => setInvoiceId(e.target.value)}
              required
              disabled={Boolean(preselectedInvoiceId)}
              className="w-full px-3.5 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white focus:outline-none focus:border-brand cursor-pointer disabled:opacity-60"
            >
              {invoices.map((inv) => (
                <option key={inv.id} value={inv.id}>
                  {inv.invoiceNumber} — {inv.buyerName} (Pending ₹
                  {inv.outstandingAmount.toLocaleString("en-IN")})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#D4CFDC] mb-1.5">
                Channel *
              </label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white focus:outline-none focus:border-brand cursor-pointer"
              >
                <option value="phone">Phone Call</option>
                <option value="whatsapp">WhatsApp Message</option>
                <option value="email">Official Email</option>
                <option value="meeting">In-Person Meeting</option>
                <option value="letter">Official Formal Notice</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#D4CFDC] mb-1.5">
                Spoken With / Contact Person
              </label>
              <input
                type="text"
                placeholder="e.g. Vinay Bhadane (Accounts)"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white placeholder-[#665F70] focus:outline-none focus:border-brand"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#D4CFDC] mb-1.5">
              Discussion Summary / What was discussed *
            </label>
            <textarea
              rows={2}
              required
              placeholder="e.g. Inquired about payment status; informed that delivery challan & QA clearance was approved 2 weeks ago..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white placeholder-[#665F70] focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#D4CFDC] mb-1.5">
              Buyer Official Response
            </label>
            <input
              type="text"
              placeholder="e.g. Accounts head is on leave; promised to verify SAP clearance on Monday"
              value={buyerResponse}
              onChange={(e) => setBuyerResponse(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white placeholder-[#665F70] focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#D4CFDC] mb-1.5">
              Scheduled Next Action Date (Optional)
            </label>
            <input
              type="date"
              value={nextFollowupAt}
              onChange={(e) => setNextFollowupAt(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white focus:outline-none focus:border-brand"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#292434]">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#958D9E] hover:text-white bg-[#1C1724] border border-[#292434] hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !invoiceId}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#15121A] bg-brand hover:bg-brand-hover shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-3.5 h-3.5 border-2 border-[#15121A] border-t-transparent rounded-full animate-spin" />
              ) : (
                <Check className="w-4 h-4 stroke-[2.5]" />
              )}
              <span>{loading ? "Recording..." : "Record Follow-Up"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
