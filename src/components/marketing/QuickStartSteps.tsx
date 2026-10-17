"use client";

import React from "react";
import { FilePlus2, MessageSquareText, ShieldCheck, ArrowRight } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";

export function QuickStartSteps() {
  const steps = [
    {
      number: "01",
      icon: FilePlus2,
      title: "Add your invoices",
      description:
        "Import or record unpaid B2B invoices with clear credit terms (Net 15/30/45) and buyer contact details.",
      tag: "15-second entry",
    },
    {
      number: "02",
      icon: MessageSquareText,
      title: "Track commitments & follow-ups",
      description:
        "Log customer calls and WhatsApp payment promises. The system monitors promised dates and alerts you if a commitment is missed.",
      tag: "Accountability",
    },
    {
      number: "03",
      icon: ShieldCheck,
      title: "Record payments & preserve evidence",
      description:
        "Reconcile bank credits with UTR transaction references, signed delivery challans (POD), and dispute-free audit timelines.",
      tag: "Audit-ready",
    },
  ];

  return (
    <section id="workflow" className="py-20 sm:py-28 bg-[#F9F7FA] border-y border-[#E9E4ED] scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow and Headings */}
        <ScrollReveal yOffset={20}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E9E4ED] text-[11px] font-bold text-[#665F70] uppercase tracking-[0.14em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            <span>WORKFLOW CLARITY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#15121A] tracking-[-0.03em] leading-tight">
            How PayTrack works.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#665F70] max-w-xl mx-auto">
            A focused receivables workflow that keeps invoice status, buyer promises, and payment evidence unified.
          </p>
        </ScrollReveal>

        {/* 3 Steps Horizontal Workflow with Stagger Reveal */}
        <StaggerContainer staggerChildren={0.12} className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <StaggerItem key={step.number}>
                <div className="bg-white rounded-[24px] p-7 border border-[#E9E4ED] shadow-xs group hover:-translate-y-1 hover:border-brand-glow hover:shadow-brand-glow transition-all duration-300 ease-out flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="w-10 h-10 rounded-full bg-[#15121B] text-brand flex items-center justify-center font-bold group-hover:scale-110 transition-transform duration-200 shadow-xs">
                        <Icon className="w-5 h-5 stroke-[2.2]" />
                      </span>
                      <span className="text-xs font-mono font-extrabold text-[#958D9E] tracking-wider">
                        STEP {step.number}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#15121A] tracking-tight group-hover:text-brand transition-colors duration-200">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm text-[#665F70] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#F2EFF5] flex items-center justify-between text-xs font-bold text-[#15121A]">
                    <span className="px-2 py-0.5 rounded bg-[#F9F7FA] text-[#665F70] border border-[#E9E4ED] group-hover:border-brand-glow transition-colors">
                      {step.tag}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#15121A] group-hover:translate-x-1 group-hover:text-brand transition-all duration-200" />
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
