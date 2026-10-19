"use client";

import React, { useRef } from "react";
import {
  X,
  Printer,
  FileText,
  Building2,
  Calendar,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Download,
  IndianRupee,
  ExternalLink,
} from "lucide-react";

export interface InvoiceViewerData {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  paidAmount: number;
  outstandingAmount: number;
  status: string;
  daysOutstanding: number;
  isOverdueMsmed: boolean;
  notes?: string;
  buyerName: string;
  buyerGstin?: string;
  buyerAddress?: string;
  buyerContact?: string;
  buyerPhone?: string;
  evidence?: Array<{
    id: string;
    fileName: string;
    category: string;
    storagePath?: string;
    description?: string;
  }>;
}

interface InvoiceViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: InvoiceViewerData | null;
  onOpenDocument?: (doc: any) => void;
}

export function InvoiceViewerModal({
  isOpen,
  onClose,
  invoice,
  onOpenDocument,
}: InvoiceViewerModalProps) {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  // Calculate tax breakdown (assuming standard 18% GST for industrial MSME supplies)
  const taxableValue = Math.round((invoice.amount / 1.18) * 100) / 100;
  const gstAmount = Math.round((invoice.amount - taxableValue) * 100) / 100;
  const cgst = Math.round((gstAmount / 2) * 100) / 100;
  const sgst = cgst;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#15121B] border border-[#292434] rounded-3xl p-5 sm:p-8 shadow-2xl text-white my-6 max-h-[92vh] flex flex-col">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#292434] shrink-0 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-[#15121A] font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Tax Invoice Preview</span>
                <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-brand-soft border border-brand-border text-brand">
                  {invoice.invoiceNumber}
                </span>
              </h2>
              <p className="text-xs text-[#958D9E]">
                Statutory GST B2B invoice format compliant with MSMED Act 2006
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-[#1C1724] border border-[#3A3347] hover:border-brand-border hover:bg-[#251F30] transition-all"
              title="Print / Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-brand" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#958D9E] hover:text-white rounded-xl hover:bg-white/5 transition-colors"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Invoice Content */}
        <div
          ref={printRef}
          className="mt-5 overflow-y-auto pr-1 space-y-6 flex-1 print:p-0 print:m-0"
        >
          {/* Printable Container */}
          <div className="bg-[#1C1724] border border-[#292434] rounded-2xl p-5 sm:p-8 text-white text-xs print:bg-white print:text-black print:border-black">
            {/* Header / Title Banner */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#292434] print:border-gray-300">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded bg-brand flex items-center justify-center font-bold text-[#15121A] text-xs">
                    P
                  </div>
                  <span className="font-bold text-lg tracking-tight text-white print:text-black">
                    BHADANE PRECISION MSME
                  </span>
                </div>
                <p className="text-[11px] text-[#958D9E] print:text-gray-600 leading-relaxed">
                  Precision Industrial Machining &amp; Mechanical Assemblies
                  <br />
                  Plot B-14, MIDC Industrial Area, Satpur, Nashik, Maharashtra - 422007
                  <br />
                  <strong className="text-[#D4CFDC] print:text-black">GSTIN:</strong> 27AABCB1234F1Z5 |{" "}
                  <strong className="text-[#D4CFDC] print:text-black">PAN:</strong> AABCB1234F
                  <br />
                  <strong className="text-brand print:text-black">MSME Udyam:</strong> UDYAM-MH-12-0049281 (Small Enterprise)
                </p>
              </div>

              <div className="sm:text-right shrink-0">
                <div className="text-xs font-bold uppercase tracking-widest text-brand print:text-black mb-1">
                  TAX INVOICE / कर चालान
                </div>
                <div className="font-mono text-base font-bold text-white print:text-black">
                  {invoice.invoiceNumber}
                </div>
                <div className="text-[11px] text-[#958D9E] print:text-gray-600 mt-1">
                  Issue Date: <strong className="text-white print:text-black">{invoice.issueDate}</strong>
                </div>
                <div className="text-[11px] text-[#958D9E] print:text-gray-600">
                  Due Date: <strong className="text-white print:text-black">{invoice.dueDate}</strong>
                </div>
                <div className="text-[11px] mt-1">
                  Status:{" "}
                  <span className="font-bold text-brand uppercase">{invoice.status.replace("_", " ")}</span>
                </div>
              </div>
            </div>

            {/* MSMED Statutory Clause Alert */}
            <div className="my-4 p-3 rounded-xl bg-brand/10 border border-brand/20 text-brand print:border-gray-400 print:text-black text-[11px] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-brand print:text-black" />
              <span>
                <strong>MSMED Act 2006 Notice:</strong> The supplier is a registered Micro/Small Enterprise. In terms of Section 15 of the MSMED Act, payment is statutorily due within agreed terms not exceeding 45 days. Delayed payments attract compound penal interest at three times RBI Bank Rate under Section 16.
              </span>
            </div>

            {/* Bill To & Dispatch Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-4 border-b border-[#292434] print:border-gray-300">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#958D9E] print:text-gray-600 mb-1">
                  Billed To (Buyer / Recipient)
                </div>
                <div className="font-bold text-sm text-white print:text-black">{invoice.buyerName}</div>
                <div className="text-[11px] text-[#958D9E] print:text-gray-600 mt-1 space-y-0.5">
                  {invoice.buyerGstin && (
                    <div>
                      <strong className="text-[#D4CFDC] print:text-black">GSTIN:</strong> {invoice.buyerGstin}
                    </div>
                  )}
                  {invoice.buyerContact && (
                    <div>
                      <strong className="text-[#D4CFDC] print:text-black">Contact Person:</strong> {invoice.buyerContact}
                    </div>
                  )}
                  {invoice.buyerPhone && (
                    <div>
                      <strong className="text-[#D4CFDC] print:text-black">Phone:</strong> {invoice.buyerPhone}
                    </div>
                  )}
                  {invoice.buyerAddress && (
                    <div>
                      <strong className="text-[#D4CFDC] print:text-black">Address:</strong> {invoice.buyerAddress}
                    </div>
                  )}
                </div>
              </div>

              <div className="sm:text-right">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#958D9E] print:text-gray-600 mb-1">
                  Credit Terms &amp; Settlement Ledger
                </div>
                <div className="text-[11px] text-[#958D9E] print:text-gray-600 space-y-1">
                  <div>
                    Agreed Terms: <strong className="text-white print:text-black">Credit Supply</strong>
                  </div>
                  <div>
                    Outstanding Days:{" "}
                    <strong
                      className={
                        invoice.isOverdueMsmed
                          ? "text-rose-400 font-bold print:text-black"
                          : "text-white print:text-black"
                      }
                    >
                      {invoice.daysOutstanding} Days
                    </strong>
                  </div>
                  <div>
                    Settlement Status:{" "}
                    <strong className="text-emerald-400 print:text-black">
                      ₹{invoice.paidAmount.toLocaleString("en-IN")} Received
                    </strong>
                  </div>
                  <div>
                    Balance Due:{" "}
                    <strong className="text-amber-300 font-bold print:text-black">
                      ₹{invoice.outstandingAmount.toLocaleString("en-IN")}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="py-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#292434] print:border-gray-300 text-[#958D9E] print:text-gray-700 font-semibold uppercase text-[10px]">
                      <th className="py-2.5 px-3">#</th>
                      <th className="py-2.5 px-3">Description of Goods / Services</th>
                      <th className="py-2.5 px-3">HSN/SAC</th>
                      <th className="py-2.5 px-3 text-right">Taxable Value</th>
                      <th className="py-2.5 px-3 text-right">CGST (9%)</th>
                      <th className="py-2.5 px-3 text-right">SGST (9%)</th>
                      <th className="py-2.5 px-3 text-right">Total Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#292434] print:divide-gray-300 text-xs">
                    <tr>
                      <td className="py-3 px-3 font-mono">01</td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-white print:text-black">
                          {invoice.notes || "Precision CNC Machined Components & Mechanical Parts Batch"}
                        </div>
                        <div className="text-[10px] text-[#958D9E] print:text-gray-600">
                          Billed under commercial credit agreement; verified against delivery challan.
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono">8466</td>
                      <td className="py-3 px-3 text-right font-mono">₹{taxableValue.toLocaleString("en-IN")}</td>
                      <td className="py-3 px-3 text-right font-mono">₹{cgst.toLocaleString("en-IN")}</td>
                      <td className="py-3 px-3 text-right font-mono">₹{sgst.toLocaleString("en-IN")}</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-white print:text-black">
                        ₹{invoice.amount.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Invoice Totals & Summary */}
            <div className="pt-4 border-t border-[#292434] print:border-gray-300 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              {/* Bank Details */}
              <div className="p-3.5 bg-[#15121B] print:bg-gray-100 rounded-xl border border-[#292434] print:border-gray-300 text-[11px] space-y-1">
                <div className="font-bold text-white print:text-black mb-1">
                  Bank Details for Electronic Settlement (RTGS/NEFT/UPI)
                </div>
                <div>Account Name: <strong className="text-white print:text-black">Bhadane Precision MSME</strong></div>
                <div>Bank: <strong className="text-white print:text-black">HDFC Bank Ltd.</strong></div>
                <div>Account Number: <strong className="text-white print:text-black font-mono">50200084928192</strong></div>
                <div>IFSC Code: <strong className="text-white print:text-black font-mono">HDFC0000060</strong></div>
                <div>Branch: <strong className="text-white print:text-black">Satpur Industrial Estate, Nashik</strong></div>
              </div>

              {/* Amount Calculations */}
              <div className="w-full sm:w-64 space-y-1.5 text-xs">
                <div className="flex justify-between text-[#958D9E] print:text-gray-600">
                  <span>Taxable Subtotal:</span>
                  <span className="font-mono text-white print:text-black">₹{taxableValue.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-[#958D9E] print:text-gray-600">
                  <span>CGST (9%):</span>
                  <span className="font-mono text-white print:text-black">₹{cgst.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-[#958D9E] print:text-gray-600">
                  <span>SGST (9%):</span>
                  <span className="font-mono text-white print:text-black">₹{sgst.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-[#292434] print:border-gray-400 text-white print:text-black">
                  <span>Invoice Total:</span>
                  <span className="font-mono text-brand print:text-black">₹{invoice.amount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-xs text-emerald-400 print:text-black">
                  <span>Amount Received:</span>
                  <span className="font-mono">₹{invoice.paidAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-amber-300 print:text-black pt-1 border-t border-[#292434]">
                  <span>Outstanding Balance:</span>
                  <span className="font-mono">₹{invoice.outstandingAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Signature & Declaration */}
            <div className="mt-8 pt-6 border-t border-[#292434] print:border-gray-300 flex flex-col sm:flex-row items-end justify-between gap-6 text-[11px] text-[#958D9E] print:text-gray-600">
              <div className="max-w-md">
                <p className="font-semibold text-white print:text-black mb-1">Declaration:</p>
                <p className="leading-relaxed">
                  We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct. Governed under provisions of the MSMED Act 2006.
                </p>
              </div>

              <div className="text-right sm:min-w-[200px]">
                <div className="font-bold text-white print:text-black">For Bhadane Precision MSME</div>
                <div className="h-12 flex items-center justify-end font-serif italic text-brand print:text-black text-sm">
                  Vinay Bhadane
                </div>
                <div className="border-t border-[#292434] print:border-gray-400 pt-1 text-[10px] uppercase tracking-wider">
                  Authorized Signatory
                </div>
              </div>
            </div>
          </div>

          {/* Attached Evidence & Proofs (if available) */}
          {invoice.evidence && invoice.evidence.length > 0 && (
            <div className="print:hidden bg-[#1C1724] border border-[#292434] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Attached Evidence &amp; Delivery Documents ({invoice.evidence.length})
                  </h3>
                </div>
                <span className="text-[11px] text-[#958D9E]">Audit-ready verification vault</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {invoice.evidence.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 bg-[#15121B] border border-[#292434] hover:border-brand-border rounded-xl flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="font-semibold text-xs text-white truncate">{doc.fileName}</div>
                      <div className="text-[10px] text-brand uppercase font-mono mt-0.5">
                        {doc.category.replace("_", " ")}
                      </div>
                      {doc.description && (
                        <div className="text-[11px] text-[#958D9E] truncate mt-0.5">{doc.description}</div>
                      )}
                    </div>

                    {onOpenDocument && (
                      <button
                        type="button"
                        onClick={() => onOpenDocument(doc)}
                        className="px-2.5 py-1.5 rounded-lg bg-brand-soft border border-brand-border text-brand hover:bg-brand/20 text-xs font-semibold shrink-0 transition-colors flex items-center gap-1"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-[#292434] mt-4 flex items-center justify-between shrink-0 print:hidden">
          <div className="text-xs text-[#958D9E] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Digital ledger record registered under user Vinay Bhadane</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#15121A] bg-brand hover:bg-brand-hover shadow-md transition-all flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Tax Invoice</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#958D9E] hover:text-white bg-[#1C1724] border border-[#292434] hover:bg-white/5 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
