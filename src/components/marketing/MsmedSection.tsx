"use client";

import React from "react";
import { AlertCircle, Clock, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export function MsmedSection() {
  return (
    <section id="msmed" className="py-20 sm:py-28 bg-white scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal yOffset={24} duration={0.6}>
          <div className="bg-[#15121B] rounded-[32px] p-8 sm:p-14 text-white relative overflow-hidden border border-[#292434] shadow-2xl">
            
            {/* Subtle atmospheric glow in top right */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand/15 rounded-full filter blur-3xl pointer-events-none animate-ambient-glow" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center text-left">
              
              {/* Left 6 cols: Text */}
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#221C2B] text-brand border border-[#3A3347] shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>STATUTORY COMPLIANCE MONITORING</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-[-0.03em] leading-tight">
                  MSMED payment deadlines. Tracked automatically.
                </h2>

                <p className="text-sm sm:text-base text-[#A69FB0] leading-relaxed pt-1">
                  Under Section 15 of India&apos;s MSMED Act, buyer credit terms cannot exceed 45 days. PayTrack continuously classifies your open invoices into statutory aging brackets so your team acts before receivables turn into formal disputes.
                </p>

                <div className="pt-3 space-y-2.5 text-xs text-[#D4CFDC]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                    <span>Early warning alerts at 30 days and 40 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                    <span>Preserve delivery challans & agreed terms for MSEFC readiness</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                    <span>Informational interest calculations based on statutory provisions</span>
                  </div>
                </div>

                <p className="text-[11px] text-[#958D9E] italic pt-2">
                  *Note: PayTrack provides operational deadline reminders and records; it does not constitute legal counsel or dispute adjudication.
                </p>
              </div>

              {/* Right 6 cols: Realistic Deadline Tracking Interface Preview */}
              <div className="lg:col-span-6">
                <div className="bg-[#1C1724] rounded-2xl p-5 sm:p-6 border border-[#2E273A] shadow-lg hover:-translate-y-1 hover:border-brand-glow transition-all duration-300 ease-out">
                <div className="flex items-center justify-between pb-3 border-b border-[#2E273A]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white">Invoice #INV-2026-089</span>
                    <span className="font-mono text-[11px] text-[#A69FB0]">Apex Engg</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF1F2] text-[#E11D48]">
                    Overdue 18 Days
                  </span>
                </div>

                {/* Statutory Timeline Progress */}
                <div className="mt-5 space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-[#A69FB0] mb-1.5">
                      <span>Invoice Date (Day 0)</span>
                      <span className="font-bold text-white">15 Aug 2026</span>
                    </div>
                    <div className="flex justify-between text-xs text-[#A69FB0] mb-1.5">
                      <span className="text-brand font-semibold">MSMED 45-Day Threshold</span>
                      <span className="font-bold text-brand">30 Sep 2026</span>
                    </div>
                    <div className="flex justify-between text-xs text-[#A69FB0]">
                      <span>Today&apos;s Elapsed Time</span>
                      <span className="font-bold text-[#E11D48]">63 Days (Exceeded by 18d)</span>
                    </div>
                  </div>

                  {/* Visual Timeline Bar */}
                  <div className="w-full h-3 rounded-full bg-[#2E273A] overflow-hidden flex">
                    <div className="h-full bg-[#0D9488]" style={{ width: "60%" }} title="Credit Term" />
                    <div className="h-full bg-brand" style={{ width: "20%" }} title="45-Day Limit" />
                    <div className="h-full bg-[#E11D48]" style={{ width: "20%" }} title="Overdue" />
                  </div>

                  <div className="flex justify-between text-[10px] text-[#958D9E] font-mono">
                    <span>Day 0</span>
                    <span className="text-brand">Day 45 (Statutory)</span>
                    <span className="text-[#E11D48]">Day 63 (Current)</span>
                  </div>

                  {/* Summary Box */}
                  <div className="p-3 rounded-xl bg-[#15121B] border border-[#2E273A] flex items-center justify-between text-xs">
                    <span className="text-[#A69FB0]">Principal Outstanding:</span>
                    <span className="font-mono font-bold text-white tabular-nums">₹1,45,000</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);
}
