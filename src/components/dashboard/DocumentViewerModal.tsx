"use client";

import React, { useState } from "react";
import {
  X,
  FileText,
  Download,
  ExternalLink,
  ShieldCheck,
  Calendar,
  HardDrive,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileCheck,
} from "lucide-react";

export interface EvidenceDocument {
  id: string;
  fileName: string;
  category: "invoice" | "purchase_order" | "delivery_proof" | "payment_commitment" | "communication" | "other" | string;
  storagePath?: string;
  mimeType?: string;
  fileSize?: number;
  description?: string;
  createdAt?: string;
}

interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: EvidenceDocument | null;
}

export function DocumentViewerModal({
  isOpen,
  onClose,
  document: doc,
}: DocumentViewerModalProps) {
  const [zoomLevel, setZoomLevel] = useState(1);

  if (!isOpen || !doc) return null;

  const isDataUrl = doc.storagePath?.startsWith("data:");
  const isImage =
    doc.mimeType?.startsWith("image/") ||
    doc.fileName.toLowerCase().match(/\.(png|jpg|jpeg|webp|gif|svg)$/) ||
    doc.storagePath?.startsWith("data:image/");
  const isPdf =
    doc.mimeType === "application/pdf" ||
    doc.fileName.toLowerCase().endsWith(".pdf") ||
    doc.storagePath?.startsWith("data:application/pdf");

  const formattedSize = doc.fileSize
    ? `${(doc.fileSize / 1024).toFixed(1)} KB`
    : "Verified Upload";

  const formattedDate = doc.createdAt
    ? new Date(doc.createdAt).toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Active Operational Record";

  const handleDownload = () => {
    if (doc.storagePath) {
      const link = window.document.createElement("a");
      link.href = doc.storagePath;
      link.download = doc.fileName;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#15121B] border border-[#292434] rounded-3xl p-5 sm:p-7 shadow-2xl text-white my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#292434] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white max-w-sm sm:max-w-md truncate">
                  {doc.fileName}
                </h2>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-soft border border-brand-border text-brand">
                  {doc.category.replace("_", " ")}
                </span>
              </div>
              <p className="text-xs text-[#958D9E] flex items-center gap-3 mt-0.5">
                <span>{formattedDate}</span>
                <span>•</span>
                <span>{formattedSize}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {doc.storagePath && (
              <button
                type="button"
                onClick={handleDownload}
                className="p-2 text-[#958D9E] hover:text-white bg-[#1C1724] border border-[#292434] hover:border-brand-border rounded-xl transition-all"
                title="Download Document"
              >
                <Download className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#958D9E] hover:text-white rounded-xl hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Viewer / Preview Area */}
        <div className="mt-4 flex-1 overflow-y-auto pr-1 space-y-4">
          {/* Document Preview Box */}
          <div className="relative min-h-[320px] max-h-[520px] bg-[#0E0C12] border border-[#292434] rounded-2xl flex items-center justify-center p-4 overflow-hidden">
            {isImage && doc.storagePath ? (
              <div className="relative overflow-auto max-h-[500px] w-full flex items-center justify-center">
                <img
                  src={doc.storagePath}
                  alt={doc.fileName}
                  style={{ transform: `scale(${zoomLevel})`, transition: "transform 0.2s ease" }}
                  className="max-h-[480px] max-w-full rounded-lg object-contain shadow-md"
                />
              </div>
            ) : isPdf && doc.storagePath ? (
              <iframe
                src={doc.storagePath}
                title={doc.fileName}
                className="w-full h-[480px] rounded-lg border-0 bg-white"
              />
            ) : (
              /* High-impact Forensic Document Certificate Preview */
              <div className="w-full max-w-md bg-[#1C1724] border border-[#292434] rounded-2xl p-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mx-auto">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">{doc.fileName}</h3>
                  <span className="text-[11px] text-brand uppercase font-mono font-semibold">
                    Category: {doc.category.replace("_", " ").toUpperCase()}
                  </span>
                </div>
                <div className="text-xs text-[#958D9E] bg-[#15121B] p-3 rounded-xl border border-[#292434] text-left space-y-1">
                  <div>
                    <span className="text-[#665F70]">Document Type:</span>{" "}
                    <span className="text-white font-mono">{doc.mimeType || "application/pdf"}</span>
                  </div>
                  <div>
                    <span className="text-[#665F70]">Verification Status:</span>{" "}
                    <span className="text-emerald-400 font-semibold">Verified Operational Record</span>
                  </div>
                  <div>
                    <span className="text-[#665F70]">Pre-dispute Proof:</span>{" "}
                    <span className="text-white">MSMED Act Section 15 Audit Evidence</span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-soft border border-brand-border text-brand text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Attached to User Workspace</span>
                  </div>
                </div>
              </div>
            )}

            {/* Floating Image Zoom Controls */}
            {isImage && doc.storagePath && (
              <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-[#15121B]/90 backdrop-blur-md border border-[#292434] p-1 rounded-xl shadow-lg">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(0.5, z - 0.25))}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-[#958D9E] hover:text-white"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-mono px-1.5 text-white">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-[#958D9E] hover:text-white"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Description & Metadata Note */}
          {doc.description && (
            <div className="p-3.5 bg-[#1C1724] border border-[#292434] rounded-2xl text-xs">
              <span className="text-[#958D9E] font-semibold block mb-1">Operational Context / Notes:</span>
              <p className="text-white leading-relaxed">{doc.description}</p>
            </div>
          )}

          {/* Statutory Evidence Notice */}
          <div className="p-3 bg-brand/10 border border-brand/20 rounded-2xl flex items-start gap-2.5 text-xs text-brand">
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-brand" />
            <p className="leading-relaxed">
              <strong>MSMED Statutory Admissibility:</strong> Stamped delivery challans, transporter lorry receipts (LR), and written payment promises recorded herein establish the supplier&apos;s prima facie case under the Micro, Small and Medium Enterprises Development Act, 2006.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#292434] mt-3 flex items-center justify-between shrink-0">
          <span className="text-xs text-[#958D9E]">
            Registered under <strong className="text-white">Vinay Bhadane</strong> (Bhadane Precision MSME)
          </span>

          <div className="flex items-center gap-2">
            {doc.storagePath && (
              <button
                type="button"
                onClick={handleDownload}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#15121A] bg-brand hover:bg-brand-hover shadow-md transition-all flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download File</span>
              </button>
            )}
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
