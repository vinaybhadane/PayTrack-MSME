"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, IndianRupee, Calendar, Check, AlertCircle } from "lucide-react";

interface InvoiceOption {
  id: string;
  invoiceNumber: string;
  buyerName: string;
  outstandingAmount: number;
}

interface RecordPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentRecorded: () => void;
  preselectedInvoiceId?: string;
}

export function RecordPaymentModal({
  isOpen,
  onClose,
  onPaymentRecorded,
  preselectedInvoiceId,
}: RecordPaymentModalProps) {
  const [invoices, setInvoices] = useState<InvoiceOption[]>([]);
  const [invoiceId, setInvoiceId] = useState(preselectedInvoiceId || "");
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [paymentMode, setPaymentMode] = useState("NEFT/RTGS");
  const [reference, setReference] = useState("");
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
              setAmount(String(unpaid[0].outstandingAmount));
            } else if (preselectedInvoiceId) {
              const matched = data.invoices.find((i: any) => i.id === preselectedInvoiceId);
              if (matched) {
                setAmount(String(matched.outstandingAmount));
              }
            }
          }
        })
        .catch((err) => console.warn("Error fetching invoices for payment:", err));
    }
  }, [isOpen, preselectedInvoiceId]);

  const handleInvoiceChange = (id: string) => {
    setInvoiceId(id);
    const selected = invoices.find((i) => i.id === id);
    if (selected) {
      setAmount(String(selected.outstandingAmount));
    }
  };

  const selectedInvoice = invoices.find((i) => i.id === invoiceId);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!invoiceId) {
      setError("Please select an invoice.");
      return;
    }
    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Please enter a valid payment amount.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceId,
          amount: parsedAmount,
          paymentDate,
          paymentMode,
          reference: reference.trim() || undefined,
          notes: notes.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to record payment");
      }
      onPaymentRecorded();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error recording payment";
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
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Record Payment Receipt</h2>
              <p className="text-xs text-[#958D9E]">Credit incoming funds & calculate outstanding balance</p>
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

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-[#D4CFDC]">
                Received Amount (INR ₹) *
              </label>
              {selectedInvoice && (
                <button
                  type="button"
                  onClick={() => setAmount(String(selectedInvoice.outstandingAmount))}
                  className="text-[11px] font-bold text-brand hover:underline"
                >
                  Pay Full Balance (₹{selectedInvoice.outstandingAmount.toLocaleString("en-IN")})
                </button>
              )}
            </div>
            <input
              type="number"
              required
              min="1"
              placeholder="e.g. 100000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white font-mono placeholder-[#665F70] focus:outline-none focus:border-brand"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#D4CFDC] mb-1.5">
                Receipt Date *
              </label>
              <input
                type="date"
                required
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white focus:outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#D4CFDC] mb-1.5">
                Payment Channel
              </label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white focus:outline-none focus:border-brand cursor-pointer"
              >
                <option value="NEFT/RTGS">NEFT / RTGS</option>
                <option value="IMPS">IMPS Instant Transfer</option>
                <option value="UPI">UPI Payment</option>
                <option value="Cheque">Cheque Clearing</option>
                <option value="Cash">Cash Receipt</option>
                <option value="Other">Other Bank Settlement</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#D4CFDC] mb-1.5">
              Bank Reference / UTR Number
            </label>
            <input
              type="text"
              placeholder="e.g. HDFCN26284910384 or Cheque #094812"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white font-mono placeholder-[#665F70] focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#D4CFDC] mb-1.5">
              Settlement Notes
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Received partial advance, remainder agreed for next billing cycle..."
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
              <span>{loading ? "Recording..." : "Record Payment Receipt"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
