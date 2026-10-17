"use client";

import React from "react";
import { ArrowRight, Layers, ShieldCheck, FileCheck, Users, Clock, Banknote } from "lucide-react";

export function InsightPanel() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#F1F8FF] border border-[#DCE6F1] p-8 sm:p-14 overflow-hidden text-left">
          {/* Subtle Ambient Decorative Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#51DDF5]/20 to-transparent rounded-full filter blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-[#BFDBFE] text-[#145DFF] mb-5 shadow-xs">
              <Layers className="w-3.5 h-3.5" />
              <span>UNIFIED OPERATIONAL WORKSPACE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif text-[#10233F] tracking-tight leading-[1.12]">
              One screen for the business. Clear next actions for the team.
            </h2>

            <p className="mt-5 text-base sm:text-lg text-[#344762] leading-relaxed">
              PayTrack bridges the operational gap between invoice dispatch and bank settlement. Your sales reps log calls, your accountant records payments, and you always know the exact cash-flow position.
            </p>

            {/* 3 Pillars Grid */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white/80 backdrop-blur-xs p-5 rounded-xl border border-[#DCE6F1] shadow-xs">
                <div className="w-9 h-9 rounded-lg bg-[#EAF2FF] text-[#145DFF] flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h3 className="font-semibold text-sm text-[#10233F]">Overdue Prioritization</h3>
                <p className="mt-1.5 text-xs text-[#475569] leading-relaxed">
                  Morning triage queue showing who broke payment promises and who needs immediate contact.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-xs p-5 rounded-xl border border-[#DCE6F1] shadow-xs">
                <div className="w-9 h-9 rounded-lg bg-[#ECFDF5] text-[#047857] flex items-center justify-center mb-3">
                  <FileCheck className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h3 className="font-semibold text-sm text-[#10233F]">Evidence Vault</h3>
                <p className="mt-1.5 text-xs text-[#475569] leading-relaxed">
                  Store signed delivery challans, PO copies, and payment confirmations tied to the invoice.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-xs p-5 rounded-xl border border-[#DCE6F1] shadow-xs">
                <div className="w-9 h-9 rounded-lg bg-[#FFFBEB] text-[#B45309] flex items-center justify-center mb-3">
                  <Users className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h3 className="font-semibold text-sm text-[#10233F]">Team Accountability</h3>
                <p className="mt-1.5 text-xs text-[#475569] leading-relaxed">
                  Assign buyer accounts to team members with full visibility of follow-up frequency.
                </p>
              </div>
            </div>

            {/* Action */}
            <div className="mt-10">
              <a
                href="#preview"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#145DFF] hover:bg-[#0847D9] text-white text-sm font-semibold shadow-sm transition-all duration-150 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145DFF]"
              >
                <span>Launch Interactive Demo</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
