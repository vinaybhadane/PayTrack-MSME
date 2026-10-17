"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#15121A] selection:bg-[#9E7EB5] selection:text-white">
      <MarketingHeader />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-left">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#665F70] hover:text-brand transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-soft text-brand text-xs font-bold uppercase tracking-wider mb-4 border border-brand-glow">
          <Scale className="w-3.5 h-3.5" />
          <span>SERVICE TERMS &amp; OPERATIONAL BOUNDARIES</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#15121A] tracking-tight leading-tight">
          Terms &amp; Conditions
        </h1>
        <p className="mt-3 text-xs font-mono text-[#958D9E]">
          Effective Date: 18 October 2026 · PayTrack MSME Workflow Platform
        </p>

        <div className="mt-10 space-y-8 text-sm sm:text-base text-[#665F70] leading-relaxed">
          <section className="p-6 rounded-2xl bg-[#F9F7FA] border border-[#E9E4ED]">
            <h2 className="text-lg sm:text-xl font-bold text-[#15121A] mb-3">
              1. Nature of the Service
            </h2>
            <p>
              PayTrack provides an operational record-keeping, communication logging, and receivables management software. It is strictly a software productivity tool for Indian enterprises.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-[#15121A] mb-3">
              2. Explicit Exclusions &amp; Legal Disclaimer
            </h2>
            <p className="mb-3">
              To avoid ambiguity, users agree and acknowledge that PayTrack:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm">
              <li>Does not guarantee payment recovery or cash flow realization from your buyers.</li>
              <li>Does not act as a debt collection agency, legal representative, or recovery agent.</li>
              <li>Does not provide legal counsel, formal dispute adjudication, or statutory guarantees.</li>
              <li>Does not guarantee outcomes before MSME Samadhaan or the Micro and Small Enterprise Facilitation Council (MSEFC).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-[#15121A] mb-3">
              3. User Responsibilities &amp; Record Integrity
            </h2>
            <p>
              Users are solely responsible for the authenticity and accuracy of invoices, buyer names, payment commitment dates, and attached proof-of-delivery receipts entered into the application. PayTrack maintains records as entered by authorized users.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-[#15121A] mb-3">
              4. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These terms are governed by the laws of India. Any disputes arising in connection with the platform shall be subject to the exclusive jurisdiction of the competent courts in India.
            </p>
          </section>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
