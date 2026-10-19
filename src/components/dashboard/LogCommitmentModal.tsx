"use client";

import React, { useState, useEffect } from "react";
import { X, MessageSquare, Calendar, Check, AlertCircle, Clock } from "lucide-react";

interface InvoiceOption {
  id: string;
  invoiceNumber: string;
  buyerName: string;
  outstandingAmount: number;
}

interface LogCommitmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCommitmentLogged: () => void;
  preselectedInvoiceId?: string;
}

export function LogCommitmentModal({
  isOpen,
  onClose,
  onCommitmentLogged,
  preselectedInvoiceId,
}: LogCommitmentModalProps) {
  const [invoices, setInvoices] = useState<InvoiceOption[]>([]);
  const [invoiceId, setInvoiceId] = useState(preselectedInvoiceId || "");
  const [promisedDate, setPromisedDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split("T")[0];
  });
  const [promisedAmount, setPromisedAmount] = useState("");
  const [sourceChannel, setSourceChannel] = useState("whatsapp");
  const [notes, setNotes] = useState("");

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
              setPromisedAmount(String(unpaid[0].outstandingAmount));
            }
          }
        })
        .catch((err) => console.warn("Error fetching invoices for commitment:", err));
    }
  }, [isOpen, preselectedInvoiceId]);

  const handleInvoiceChange = (id: string) => {
    setInvoiceId(id);
    const selected = invoices.find((i) => i.id === id);
    if (selected) {
      setPromisedAmount(String(selected.outstandingAmount));
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!invoiceId) {
      setError("Please select an active invoice.");
      return;
    }
    if (!promisedDate) {
      setError("Promised payment date is required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/commitments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceId,
          promisedDate,
          promisedAmount: promisedAmount ? Number(promisedAmount) : undefined,
          sourceChannel,
          notes: notes.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to log commitment");
      }
      onCommitmentLogged();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error logging commitment";
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
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-[#15121A] font-bold">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Log Buyer Payment Commitment</h2>
              <p className="text-xs text-[#958D9E]">Record specific payment promises made by buyer accounts</p>
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
              onChange={(e) => handleInvoiceChange(e.target.value)}
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
                Promised Payment Date *
              </label>
              <input
                type="date"
                required
                value={promisedDate}
                onChange={(e) => setPromisedDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white focus:outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#D4CFDC] mb-1.5">
                Promised Amount (INR ₹)
              </label>
              <input
                type="number"
                min="1"
                placeholder="Full or Partial Amount"
                value={promisedAmount}
                onChange={(e) => setPromisedAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white font-mono placeholder-[#665F70] focus:outline-none focus:border-brand"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#D4CFDC] mb-1.5">
              Source Communication Channel *
            </label>
            <select
              value={sourceChannel}
              onChange={(e) => setSourceChannel(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white focus:outline-none focus:border-brand cursor-pointer"
            >
              <option value="whatsapp">WhatsApp Confirmation Message</option>
              <option value="phone">Direct Phone Call with Accounts Lead</option>
              <option value="email">Official Corporate Email from Accounts</option>
              <option value="meeting">In-Person Commercial Meeting</option>
              <option value="letter">Official Payment Voucher / Letter</option>
              <option value="other">Other Communication Channel</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#D4CFDC] mb-1.5">
              Commitment Context / Summary Note
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Accounts head Vinay Bhadane confirmed batch RTGS voucher signed; will credit by Friday afternoon."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white placeholder-[#665F70] focus:outline-none focus:border-brand"
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
              <span>{loading ? "Logging..." : "Save Commitment"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
