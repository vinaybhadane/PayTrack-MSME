"use client";

import React from "react";
import {
  LayoutDashboard,
  FileText,
  Users,
  PhoneCall,
  CalendarCheck,
  FileCheck2,
} from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";

export function ProductCapabilities() {
  const capabilities = [
    {
      icon: LayoutDashboard,
      title: "Receivables Overview",
      description:
        "High-density cash position dashboard showing total outstanding, overdue exposure, and upcoming settlements.",
    },
    {
      icon: FileText,
      title: "Invoice Tracking",
      description:
        "Comprehensive tracking of due dates, credit terms (Net 15/30/45), and partial or full payment statuses.",
    },
    {
      icon: Users,
      title: "Buyer Management",
      description:
        "Buyer profiles with contact details, GSTIN, payment discipline history, and team follow-up assignments.",
    },
    {
      icon: PhoneCall,
      title: "Follow-up Logging",
      description:
        "Record customer calls, WhatsApp responses, and notes in 15 seconds so your team operates with shared context.",
    },
    {
      icon: CalendarCheck,
      title: "Payment Commitments",
      description:
        "Log promised payment dates and amounts. Automatically track whether customers honored their payment commitments.",
    },
    {
      icon: FileCheck2,
      title: "Evidence & Audit Vault",
      description:
        "Attach purchase orders, signed delivery challans (POD), and bank UTR slips directly to the invoice timeline.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FAF8FC] border-t border-[#E9E4ED]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Eyebrow and Headings */}
        <ScrollReveal yOffset={20}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E9E4ED] text-[11px] font-bold text-[#665F70] uppercase tracking-[0.14em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            <span>EVERYTHING INCLUDED</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#15121A] tracking-[-0.03em] leading-tight">
            Built for the real B2B receivables workflow.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#665F70] max-w-xl mx-auto">
            Every capability is designed to maintain operational discipline and eliminate payment ambiguity.
          </p>
        </ScrollReveal>

        {/* 6 Grid Cards with Staggered Viewport Reveal */}
        <StaggerContainer staggerChildren={0.08} className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={index}>
                <div className="bg-white rounded-[22px] p-6 sm:p-7 border border-[#E9E4ED] shadow-xs group hover:-translate-y-1 hover:border-brand-glow hover:shadow-brand-glow transition-all duration-300 ease-out cursor-default h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#15121B] text-brand group-hover:bg-brand group-hover:text-[#15121A] flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-xs">
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <h3 className="font-extrabold text-base text-[#15121A] tracking-tight group-hover:text-brand transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#665F70] leading-relaxed">
                      {item.description}
                    </p>
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
