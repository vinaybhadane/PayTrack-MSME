"use client";

import React from "react";
import {
  ArrowRight,
  Check,
  Phone,
  MessageSquare,
  Clock,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  User,
  Building2,
  FileCheck,
} from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";

export function FeatureNarrativeSection() {
  return (
    <section id="features" className="py-16 sm:py-24 bg-white scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal yOffset={20}>
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#15121A] tracking-[-0.03em] leading-tight">
              Control your cash flow with zero friction.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#665F70] max-w-xl mx-auto">
              Handle B2B receivables and payment follow-ups without delays or spreadsheets.
            </p>
          </div>
        </ScrollReveal>

        {/* 2-Column Large Rounded Light-Gray Panels */}
        <StaggerContainer staggerChildren={0.15} className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* PANEL 1: Know exactly who owes you */}
          <StaggerItem>
            <div className="bg-[#F9F7FA] rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 border border-[#E9E4ED] flex flex-col justify-between group hover:-translate-y-1 hover:border-brand-glow hover:shadow-brand-glow transition-all duration-300 ease-out h-full">
            
            {/* Visual: Floating Receivables Card */}
            <div className="relative py-8 sm:py-12 flex items-center justify-center">
              <div className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-[0_20px_45px_rgba(0,0,0,0.06)] border border-[#E9E4ED] hover:shadow-brand-glow transition-shadow duration-300">
                
                {/* From Buyer Box */}
                <div className="flex items-center justify-between pb-3.5 border-b border-[#F2EFF5]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#15121B] text-brand font-bold text-xs flex items-center justify-center">
                      AE
                    </div>
                    <div>
                      <div className="text-[11px] text-[#665F70]">From Buyer</div>
                      <div className="font-bold text-xs text-[#15121A]">Apex Engineering</div>
                    </div>
                  </div>
                  <div className="font-mono font-extrabold text-sm text-[#15121A] tabular-nums">
                    ₹1,45,000
                  </div>
                </div>

                {/* Exchange / Conversion rate line */}
                <div className="py-2.5 flex items-center justify-center text-[10px] text-[#958D9E] font-mono">
                  <span>Terms: Net 45 · Overdue 18 Days</span>
                </div>

                {/* To Settlement Box */}
                <div className="flex items-center justify-between pt-2 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand text-[#15121A] font-bold text-xs flex items-center justify-center">
                      PT
                    </div>
                    <div>
                      <div className="text-[11px] text-[#665F70]">To Your Account</div>
                      <div className="font-bold text-xs text-[#15121A]">Precision Tools</div>
                    </div>
                  </div>
                  <div className="font-mono font-extrabold text-sm text-[#0D9488] tabular-nums">
                    ₹1,45,000
                  </div>
                </div>

                {/* Swipe/Confirm Action Pill */}
                <div className="w-full bg-[#15121B] text-white rounded-full py-2.5 px-3 flex items-center justify-between shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer">
                  <span className="w-6 h-6 rounded-full bg-[#292434] flex items-center justify-center text-brand font-mono text-xs">
                    &gt;&gt;
                  </span>
                  <span className="text-xs font-bold tracking-wide">
                    Slide to log payment
                  </span>
                  <span className="w-6" />
                </div>
              </div>
            </div>

            {/* Panel 1 Text */}
            <div className="text-center pt-4">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#15121A] tracking-tight">
                Know exactly who owes you.
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#665F70] max-w-md mx-auto leading-relaxed">
                See outstanding balances, overdue invoices, and upcoming payment deadlines without chasing spreadsheets.
              </p>
            </div>
          </div>
        </StaggerItem>

          {/* PANEL 2: Turn every promise into a record */}
          <StaggerItem>
            <div className="bg-[#F9F7FA] rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 border border-[#E9E4ED] flex flex-col justify-between group hover:-translate-y-1 hover:border-brand-glow hover:shadow-brand-glow transition-all duration-300 ease-out h-full">
              
              {/* Visual: Floating Progress Node Card */}
              <div className="relative py-8 sm:py-12 flex items-center justify-center">
                <div className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-[0_20px_45px_rgba(0,0,0,0.06)] border border-[#E9E4ED] hover:shadow-brand-glow transition-shadow duration-300">
                  
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#F2EFF5]">
                    <span className="text-xs font-bold text-[#15121A]">Commitment Tracking</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand animate-ping" />
                  </div>

                  {/* 3 Connected Nodes with Brand highlight */}
                  <div className="relative py-4 px-2 flex items-center justify-between">
                    <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-brand" />

                    {/* Node 1: Contact Avatar */}
                    <div className="relative z-10 flex flex-col items-center group cursor-default">
                      <div className="w-9 h-9 rounded-full bg-[#15121B] text-brand font-bold text-xs flex items-center justify-center border-2 border-white shadow-md group-hover:scale-110 transition-transform">
                        RV
                      </div>
                      <span className="text-[10px] font-bold text-[#15121A] mt-1.5">Call Logged</span>
                    </div>

                    {/* Node 2: Brand Glowing Circle */}
                    <div className="relative z-10 flex flex-col items-center group cursor-default">
                      <div className="w-9 h-9 rounded-full bg-brand text-[#15121A] font-bold flex items-center justify-center border-2 border-white shadow-[0_0_15px_var(--brand-primary-glow)] group-hover:scale-110 transition-transform">
                        <Clock className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <span className="text-[10px] font-bold text-[#15121A] mt-1.5">Promise 22 Oct</span>
                    </div>

                    {/* Node 3: Target Settlement */}
                    <div className="relative z-10 flex flex-col items-center group cursor-default">
                      <div className="w-9 h-9 rounded-full bg-brand text-[#15121A] font-bold flex items-center justify-center border-2 border-white shadow-[0_0_15px_var(--brand-primary-glow)] group-hover:scale-110 transition-transform">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                      <span className="text-[10px] font-bold text-[#15121A] mt-1.5">Bank Credit</span>
                    </div>
                  </div>

                  {/* Skeleton/Preview bars below */}
                  <div className="mt-4 pt-3 border-t border-[#F2EFF5] space-y-2">
                    <div className="h-2.5 w-3/4 bg-[#F2EFF5] rounded-full" />
                    <div className="h-2.5 w-1/2 bg-[#F2EFF5] rounded-full" />
                  </div>
                </div>
              </div>

              {/* Panel 2 Text */}
              <div className="text-center pt-4">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#15121A] tracking-tight">
                  Turn every promise into a record.
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[#665F70] max-w-md mx-auto leading-relaxed">
                  Capture buyer commitments, log follow-ups, and keep payment evidence connected to the right invoice.
                </p>
              </div>
            </div>
          </StaggerItem>

        </StaggerContainer>
      </div>
    </section>
  );
}
