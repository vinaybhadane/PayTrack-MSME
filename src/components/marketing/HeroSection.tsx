"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductPreview } from "./ProductPreview";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export function HeroSection() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-12 sm:pt-16 pb-12 sm:pb-20 overflow-hidden text-center hero-grid-pattern">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal yOffset={20} duration={0.6}>
          {/* Controlled Proportional Headline (Strictly 2 lines on desktop) */}
          <h1 className="text-[30px] sm:text-[38px] md:text-[44px] lg:text-[50px] xl:text-[54px] font-semibold text-[#15121A] tracking-[-0.035em] leading-[1.12] max-w-[1280px] mx-auto font-sans">
            <span className="block whitespace-normal lg:whitespace-nowrap">
              Every invoice. Every promise. <span className="inline-block">Every payment.</span>
            </span>
            <span className="inline-block relative mt-1 sm:mt-1.5">
              <span className="relative z-10 text-[#15121A]">All in one place.</span>
              <span className="absolute bottom-1 left-0 right-0 h-2 sm:h-2.5 bg-brand -z-0 rounded-xs opacity-75" />
            </span>
          </h1>

          {/* Supporting Copy (2 intentional lines on desktop, line-height 1.55) */}
          <p className="mt-5 sm:mt-6 text-[16px] sm:text-[18px] text-[#665F70] max-w-[700px] mx-auto font-normal leading-[1.55]">
            Track outstanding invoices, record buyer commitments, manage follow-ups,<br className="hidden sm:inline" />{" "}
            and maintain payment evidence in one reliable workspace built for MSMEs.
          </p>

          {/* Dual Pill Calls to Action (~52px height, 14–18px gap) */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 h-[52px] rounded-full bg-brand hover:bg-brand-hover text-[#15121A] text-[15px] font-bold shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-brand-glow active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </Link>

            <a
              href="#workflow"
              onClick={(e) => scrollTo(e, "workflow")}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 h-[52px] rounded-full bg-white hover:bg-[#F9F7FA] text-[#15121A] border border-[#E9E4ED] hover:border-brand text-[15px] font-semibold transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <span>Learn More</span>
            </a>
          </div>
        </ScrollReveal>

        {/* Dashboard Visual Preview appearing shortly below CTAs (~75–100px) */}
        <ScrollReveal delay={0.15} yOffset={28} duration={0.65}>
          <div id="preview" className="mt-14 sm:mt-20">
            <ProductPreview />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
