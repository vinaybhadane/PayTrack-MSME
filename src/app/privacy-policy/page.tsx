"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";

export default function PrivacyPolicyPage() {
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
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>DATA PROTECTION &amp; TRUST</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#15121A] tracking-tight leading-tight">
          Privacy Policy
        </h1>
        <p className="mt-3 text-xs font-mono text-[#958D9E]">
          Last Updated: 18 October 2026 · PayTrack MSME Workflow Platform
        </p>

        <div className="mt-10 space-y-8 text-sm sm:text-base text-[#665F70] leading-relaxed">
          <section className="p-6 rounded-2xl bg-[#F9F7FA] border border-[#E9E4ED]">
            <h2 className="text-lg sm:text-xl font-bold text-[#15121A] mb-3">
              1. Overview &amp; Commitment to Indian MSEs
            </h2>
            <p>
              PayTrack (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) provides receivables workflow, timeline tracking, and payment commitment recording tools tailored for Indian Micro and Small Enterprises. We treat all business financial records, customer details, and invoice metadata as strictly confidential tenant data.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-[#15121A] mb-3">
              2. Information We Collect
            </h2>
            <p className="mb-3">
              To deliver operational receivables clarity, we collect information submitted directly by authorized business accounts:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm">
              <li>Business details: Business Name, GSTIN, Udyam Registration Number, and authorized contact information.</li>
              <li>Invoice records: Invoice numbers, dates, credit terms, buyer details, and amounts due.</li>
              <li>Follow-up history: Call notes, communication logs, and customer payment commitments.</li>
              <li>Supporting evidence: Uploaded delivery challans (PODs), purchase orders, and UTR payment receipts.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-[#15121A] mb-3">
              3. Strict Non-Disclosure &amp; Security Discipline
            </h2>
            <p>
              We do not sell, rent, or monetize your customer lists or invoice data to third-party lending desks, advertisers, or collection agencies. All tenant records are protected by strict server-side authorization: no user or organization can ever access another business&apos;s records or invoices.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-[#15121A] mb-3">
              4. Cookie Usage
            </h2>
            <p>
              We use essential cookies strictly to maintain secure user sessions, preserve authentication tokens, and remember interface preferences (such as your cookie consent selection). Analytical cookies may be used anonymously to improve website performance.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-[#15121A] mb-3">
              5. Contacting the Data Protection Officer
            </h2>
            <p>
              For inquiries regarding data privacy or record deletion requests, please contact us at{" "}
              <Link href="/contact" className="text-[#9E7EB5] font-semibold hover:underline">
                support@paytrack.in
              </Link>
              .
            </p>
          </section>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
