"use client";

import React, { useState, useEffect } from "react";
import { X, Paperclip, UploadCloud, Check, AlertCircle, FileText, CheckCircle2 } from "lucide-react";

interface InvoiceOption {
  id: string;
  invoiceNumber: string;
  buyerName: string;
}

interface AttachEvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEvidenceAttached: () => void;
  preselectedInvoiceId?: string;
}

export function AttachEvidenceModal({
  isOpen,
  onClose,
  onEvidenceAttached,
  preselectedInvoiceId,
}: AttachEvidenceModalProps) {
  const [invoices, setInvoices] = useState<InvoiceOption[]>([]);
  const [invoiceId, setInvoiceId] = useState(preselectedInvoiceId || "");
  const [category, setCategory] = useState<
    "invoice" | "purchase_order" | "delivery_proof" | "payment_commitment" | "communication" | "other"
  >("delivery_proof");
  const [fileName, setFileName] = useState("");
  const [fileData, setFileData] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);
  const [mimeType, setMimeType] = useState<string>("application/pdf");
  const [description, setDescription] = useState("");

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
            setInvoices(data.invoices);
            if (!invoiceId && data.invoices.length > 0) {
              setInvoiceId(data.invoices[0].id);
            }
          }
        })
        .catch((err) => console.warn("Error fetching invoices for evidence:", err));
    }
  }, [isOpen, preselectedInvoiceId]);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileSize(file.size);
      setMimeType(file.type || (file.name.endsWith(".pdf") ? "application/pdf" : "image/jpeg"));

      // Read file into Base64 Data URL for persistent storage in DB
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setFileData(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!invoiceId) {
      setError("Please select an invoice.");
      return;
    }
    if (!fileName.trim()) {
      setError("Please specify or upload an evidence document.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/evidence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceId,
          category,
          fileName: fileName.trim(),
          storagePath: fileData || undefined,
          fileSize: fileSize || 350000,
          mimeType: mimeType || "application/pdf",
          description: description.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to attach evidence");
      }
      onEvidenceAttached();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error attaching evidence";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#15121B] border border-[#292434] rounded-3xl p-6 shadow-2xl text-white my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#292434]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-[#15121A] font-bold">
              <Paperclip className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Attach Supporting Evidence</h2>
              <p className="text-xs text-[#958D9E]">Upload audit-ready PO, delivery proof or payment commitment</p>
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
                  {inv.invoiceNumber} — {inv.buyerName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#D4CFDC] mb-1.5">
              Document Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-3.5 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white focus:outline-none focus:border-brand cursor-pointer"
            >
              <option value="delivery_proof">Delivery Proof / Lorry Receipt / Stamped Challan</option>
              <option value="purchase_order">Customer Purchase Order (PO)</option>
              <option value="payment_commitment">Payment Commitment Proof (WhatsApp Screenshot/Email)</option>
              <option value="invoice">GST Tax Invoice Copy</option>
              <option value="communication">Formal Demand Notice / Follow-up Letter</option>
              <option value="other">Other Operational Evidence</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#D4CFDC] mb-1.5">
              Select File / Document Upload *
            </label>
            <div className="border-2 border-dashed border-[#292434] hover:border-brand-border rounded-2xl p-4 text-center cursor-pointer transition-colors bg-[#1C1724]/50">
              <input
                type="file"
                id="evidence-file-input"
                accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx"
                onChange={handleFileSelect}
                className="hidden"
              />
              <label htmlFor="evidence-file-input" className="cursor-pointer block">
                <UploadCloud className="w-6 h-6 text-brand mx-auto mb-1.5" />
                <span className="text-xs text-white font-medium block">
                  {fileName ? (
                    <span className="text-brand font-bold inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{fileName}</span>
                      {fileSize > 0 && (
                        <span className="text-[11px] text-[#958D9E] font-normal">
                          ({(fileSize / 1024).toFixed(0)} KB)
                        </span>
                      )}
                    </span>
                  ) : (
                    "Click to browse file (PDF, PNG, JPG, WEBP)"
                  )}
                </span>
                <span className="text-[10px] text-[#958D9E] mt-1 block">
                  Stored directly to database with cryptographic audit metadata
                </span>
              </label>
            </div>
            {!fileData && (
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Or enter document reference: e.g. Transporter_Receipt_LR_4829.pdf"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white placeholder-[#665F70] focus:outline-none focus:border-brand"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#D4CFDC] mb-1.5">
              Evidence Context / Description
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Stamped by buyer receiving stores on October 4; acknowledges full defect-free delivery."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              <span>{loading ? "Attaching to DB..." : "Attach Evidence"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
