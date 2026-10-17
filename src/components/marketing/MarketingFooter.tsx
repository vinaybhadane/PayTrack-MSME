import React from "react";
import Link from "next/link";
import { ShieldCheck, Mail, ArrowUpRight } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer className="bg-[#15121B] text-[#958D9E] pt-16 pb-12 text-xs border-t border-[#292434]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-[#221C2B] flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-brand"
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                >
                  <path d="M7 10C10 7.5 14 7 18 8.5C21 9.5 23 12 25 12" />
                  <path d="M5 16C9 13 14 13 18 15C22 17 24 19 27 18" />
                  <path d="M7 22C10 19.5 14 19 18 20.5C21 21.5 23 24 25 24" />
                </svg>
              </div>
              <span className="font-extrabold text-sm tracking-wider text-white">
                PAYTRACK
              </span>
              <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-brand text-[#15121A]">
                MSME
              </span>
            </div>
            <p className="text-xs text-[#958D9E] leading-relaxed max-w-sm">
              Unified receivables workflow and payment communication platform designed specifically for Indian Micro and Small Enterprises (MSEs) to manage credit sales and maintain payment accountability.
            </p>
          </div>

          {/* Legal & Compliance Column */}
          <div className="md:col-span-3">
            <div className="font-bold text-white text-xs uppercase tracking-wider mb-3.5">
              Legal & Compliance
            </div>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-[#958D9E] hover:text-brand transition-colors inline-flex items-center gap-1 group"
                >
                  <span>Privacy Policy</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-[#958D9E] hover:text-brand transition-colors inline-flex items-center gap-1 group"
                >
                  <span>Terms & Conditions</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <a
                  href="/#msmed"
                  className="text-[#958D9E] hover:text-brand transition-colors inline-flex items-center gap-1"
                >
                  <span>MSMED Section 15 Tiers</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Contact Column */}
          <div className="md:col-span-3">
            <div className="font-bold text-white text-xs uppercase tracking-wider mb-3.5">
              Support & Help
            </div>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/contact"
                  className="text-[#958D9E] hover:text-brand transition-colors inline-flex items-center gap-1.5 group"
                >
                  <Mail className="w-3.5 h-3.5 text-brand" />
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <a
                  href="/#faq"
                  className="text-[#958D9E] hover:text-brand transition-colors"
                >
                  Help Center & FAQ
                </a>
              </li>
              <li>
                <a
                  href="/#workflow"
                  className="text-[#958D9E] hover:text-brand transition-colors"
                >
                  Workflow Overview
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="pt-8 border-t border-[#292434] space-y-3">
          <p className="text-[11px] leading-relaxed text-[#958D9E]">
            <strong>Disclaimer:</strong> PayTrack MSME is an operational workflow and record-keeping software designed to track B2B invoices, follow-ups, and payment communications. It does not provide legal advice, guarantee debtor payment, act as a recovery agency, or guarantee outcomes under MSME Samadhaan. All financial metrics and timeline records represent application-level user records.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-[11px] text-[#665F70]">
            <span>© 2026 PayTrack MSME. All rights reserved.</span>
            <span className="text-brand font-semibold">Live Operational Prototype</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
