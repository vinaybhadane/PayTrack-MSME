"use client";

import React from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export function FinalCTA() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-white text-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal yOffset={24} duration={0.6}>
          <div className="bg-[#15121B] rounded-[32px] sm:rounded-[40px] p-8 sm:p-16 text-white relative overflow-hidden border border-[#292434] shadow-2xl">
            
            {/* Subtle atmospheric accent glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[250px] bg-brand/15 rounded-full filter blur-3xl pointer-events-none animate-ambient-glow" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#221C2B] border border-[#3A3347] text-[11px] font-bold text-brand uppercase tracking-wider mb-6">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>START IN 2 MINUTES</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-[-0.035em] leading-[1.1]">
                Spend less time chasing payments.
              </h2>

              <p className="mt-5 text-base sm:text-lg text-[#A69FB0] font-normal leading-relaxed">
                Bring invoices, buyer commitments, and payment records into one dependable workspace built for Indian MSMEs.
              </p>

              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <a
                  href="#preview"
                  onClick={(e) => scrollTo(e, "preview")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand hover:bg-brand-hover text-[#15121A] text-sm font-extrabold shadow-md hover:shadow-brand-glow transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </a>

                <a
                  href="#workflow"
                  onClick={(e) => scrollTo(e, "workflow")}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-transparent hover:bg-[#221C2B] text-white border border-[#3A3347] hover:border-brand text-sm font-bold transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5 active:translate-y-0 active:scale-[0.98]"
                >
                  <span>Explore Workflow</span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
