"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  FileText,
  Calendar,
  Plus,
  AlertTriangle,
  ShieldCheck,
  Check,
  AlertCircle,
  UploadCloud,
  CheckCircle2,
} from "lucide-react";
import { CreateBuyerModal } from "./CreateBuyerModal";

interface Buyer {
  id: string;
  name: string;
  gstin?: string;
  creditPeriodDays?: number;
}

interface RecordInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvoiceCreated: () => void;
}

export function RecordInvoiceModal({
  isOpen,
  onClose,
  onInvoiceCreated,
}: RecordInvoiceModalProps) {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loadingBuyers, setLoadingBuyers] = useState(false);
  const [isAddBuyerOpen, setIsAddBuyerOpen] = useState(false);

  const [buyerId, setBuyerId] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [issueDate, setIssueDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split("T")[0];
  });
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");

  // Optional Invoice Document Upload
  const [fileName, setFileName] = useState("");
  const [fileData, setFileData] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);
  const [fileMime, setFileMime] = useState<string>("application/pdf");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch buyers on open
  useEffect(() => {
    if (isOpen) {
      setLoadingBuyers(true);
      fetch("/api/buyers")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.buyers) {
            setBuyers(data.buyers);
            if (data.buyers.length > 0 && !buyerId) {
              setBuyerId(data.buyers[0].id);
            }
          }
        })
        .catch((err) => console.warn("Error fetching buyers:", err))
        .finally(() => setLoadingBuyers(false));
    }
  }, [isOpen]);

  // When buyer selection changes, adjust default due date based on their creditPeriodDays
  const handleBuyerChange = (bId: string) => {
    setBuyerId(bId);
    const selected = buyers.find((b) => b.id === bId);
    const days = selected?.creditPeriodDays || 30;
    try {
      const issue = new Date(issueDate);
      issue.setDate(issue.getDate() + days);
      setDueDate(issue.toISOString().split("T")[0]);
    } catch {
      // Ignore
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileSize(file.size);
      setFileMime(file.type || (file.name.endsWith(".pdf") ? "application/pdf" : "image/jpeg"));

      const reader = new FileReader();
      reader.onload = (event) => {
        setFileData(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculate credit span in days
  const creditDays = (() => {
    try {
      const issue = new Date(issueDate);
      const due = new Date(dueDate);
      const diff = due.getTime() - issue.getTime();
      return Math.round(diff / (1000 * 60 * 60 * 24));
    } catch {
      return 0;
    }
  })();

  const isExceedingMsmed = creditDays > 45;

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!buyerId) {
      setError("Please select or add a buyer entity.");
      return;
    }
    if (!invoiceNumber.trim()) {
      setError("Invoice number is required.");
      return;
    }
    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Please enter a valid invoice amount in Rupees.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerId,
          invoiceNumber: invoiceNumber.trim().toUpperCase(),
          issueDate,
          dueDate,
          amount: parsedAmount,
          notes: notes.trim() || undefined,
          fileName: fileName || undefined,
          fileData: fileData || undefined,
          fileSize: fileSize || undefined,
          fileMimeType: fileMime || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to record invoice");
      }
      onInvoiceCreated();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error recording invoice";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
        <div className="relative w-full max-w-xl bg-[#15121B] border border-[#292434] rounded-3xl p-6 sm:p-7 shadow-2xl text-white my-8 max-h-[92vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#292434]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-[#15121A] font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white">Record Credit Invoice</h2>
                <p className="text-xs text-[#958D9E]">Track payment due date, statutory MSMED timeline & follow-ups</p>
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {/* Buyer Selection with Inline Add */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#D4CFDC]">
                  Corporate / Enterprise Buyer *
                </label>
                <button
                  type="button"
                  onClick={() => setIsAddBuyerOpen(true)}
                  className="text-[11px] font-bold text-brand hover:underline inline-flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add New Buyer</span>
                </button>
              </div>

              {loadingBuyers ? (
                <div className="py-2.5 px-3 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-[#958D9E]">
                  Loading registered buyers...
                </div>
              ) : buyers.length === 0 ? (
                <div className="p-3 bg-[#1C1724] border border-brand/30 rounded-xl text-xs flex items-center justify-between">
                  <span className="text-[#958D9E]">No buyers registered yet.</span>
                  <button
                    type="button"
                    onClick={() => setIsAddBuyerOpen(true)}
                    className="px-2.5 py-1 bg-brand text-[#15121A] rounded-lg font-bold text-xs"
                  >
                    Create First Buyer
                  </button>
                </div>
              ) : (
                <select
                  value={buyerId}
                  onChange={(e) => handleBuyerChange(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white focus:outline-none focus:border-brand cursor-pointer"
                >
                  {buyers.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} {b.gstin ? `(${b.gstin})` : ""}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Invoice Number & Amount */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#D4CFDC] mb-1.5">
                  Tax Invoice Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. INV-2026-104"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value.toUpperCase())}
                  className="w-full px-3.5 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white uppercase font-mono placeholder-[#665F70] focus:outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D4CFDC] mb-1.5">
                  Invoice Amount (INR ₹) *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  step="1"
                  placeholder="e.g. 250000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white font-mono placeholder-[#665F70] focus:outline-none focus:border-brand"
                />
              </div>
            </div>

            {/* Issue Date & Due Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#D4CFDC] mb-1.5">
                  Invoice Issue Date *
                </label>
                <input
                  type="date"
                  required
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white focus:outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D4CFDC] mb-1.5">
                  Agreed Payment Due Date *
                </label>
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white focus:outline-none focus:border-brand"
                />
              </div>
            </div>

            {/* MSMED Statutory Timeline Indicator */}
            <div
              className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                isExceedingMsmed
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                  : "bg-[#1C1724] border-[#292434] text-[#958D9E]"
              }`}
            >
              <div className="flex items-center gap-2">
                {isExceedingMsmed ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                ) : (
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                <span>
                  Credit Span: <strong className="text-white">{creditDays} Days</strong>
                  {isExceedingMsmed && " — Exceeds MSMED Act Sec. 15 limit (Max 45 days)"}
                </span>
              </div>
              <span className="text-[11px] font-mono">
                {isExceedingMsmed ? "Statutory Overdue Risk" : "Compliant"}
              </span>
            </div>

            {/* Optional File Upload */}
            <div>
              <label className="block text-xs font-semibold text-[#D4CFDC] mb-1.5">
                Attach Scanned Tax Invoice / Signed Challan (Optional)
              </label>
              <div className="border border-dashed border-[#292434] hover:border-brand-border rounded-xl p-3 text-center cursor-pointer bg-[#1C1724]/40 transition-colors">
                <input
                  type="file"
                  id="record-invoice-file"
                  accept=".pdf,.png,.jpg,.jpeg,.webp"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <label htmlFor="record-invoice-file" className="cursor-pointer block">
                  <UploadCloud className="w-5 h-5 text-brand mx-auto mb-1" />
                  <span className="text-xs text-white block">
                    {fileName ? (
                      <span className="text-brand font-bold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{fileName}</span>
                      </span>
                    ) : (
                      "Click to upload Invoice PDF / Scan (Stored securely in DB)"
                    )}
                  </span>
                </label>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold text-[#D4CFDC] mb-1.5">
                Item Description or Reference Notes
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Precision CNC parts batch #18, PO ref PO-9941..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white placeholder-[#665F70] focus:outline-none focus:border-brand"
              />
            </div>

            {/* Modal Actions */}
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
                disabled={loading || buyers.length === 0}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#15121A] bg-brand hover:bg-brand-hover shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-3.5 h-3.5 border-2 border-[#15121A] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Check className="w-4 h-4 stroke-[2.5]" />
                )}
                <span>{loading ? "Recording..." : "Record Credit Invoice"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Embedded New Buyer Modal */}
      <CreateBuyerModal
        isOpen={isAddBuyerOpen}
        onClose={() => setIsAddBuyerOpen(false)}
        onBuyerCreated={(newB) => {
          setBuyers((prev) => [newB, ...prev]);
          setBuyerId(newB.id);
        }}
      />
    </>
  );
}
