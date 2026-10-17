"use client";

import React from "react";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { HeroSection } from "@/components/marketing/HeroSection";
import { FeatureNarrativeSection } from "@/components/marketing/FeatureNarrativeSection";
import { QuickStartSteps } from "@/components/marketing/QuickStartSteps";
import { MsmedSection } from "@/components/marketing/MsmedSection";
import { ProductCapabilities } from "@/components/marketing/ProductCapabilities";
import { FAQAccordion } from "@/components/marketing/FAQAccordion";
import { FinalCTA } from "@/components/marketing/FinalCTA";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#15121A] selection:bg-brand selection:text-black">
      {/* 1. Header (Black pill-shaped navbar matching reference) */}
      <MarketingHeader />

      {/* Main Content Narrative */}
      <main className="flex-1">
        {/* 2. Hero Section with Oversized Sans-Serif & Floating Dashboard Preview */}
        <HeroSection />

        {/* 3. Feature Section: 2 Large Rounded Light-Gray Panels (Reference Image 0) */}
        <FeatureNarrativeSection />

        {/* 4. How PayTrack Works: 3-Step Workflow */}
        <QuickStartSteps />

        {/* 5. MSMED 45-Day Statutory Deadlines */}
        <MsmedSection />

        {/* 6. Product Capabilities (6 Grid Cards) */}
        <ProductCapabilities />

        {/* 7. Frequently Asked Questions */}
        <FAQAccordion />

        {/* 8. Final High-Contrast Minimal CTA */}
        <FinalCTA />
      </main>

      {/* 9. Minimal Black Footer with Compliance Disclaimers */}
      <MarketingFooter />
    </div>
  );
}
