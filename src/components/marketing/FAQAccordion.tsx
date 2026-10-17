"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQAccordion() {
  const faqs: FAQItem[] = [
    {
      question: "How does PayTrack differ from our existing Tally or accounting software?",
      answer:
        "Accounting systems excel at recording accounting transactions after the fact (debit/credit entries). PayTrack solves the pre-payment operational gap—tracking customer follow-up calls, WhatsApp messages, verbal payment promises, promised payment dates, and supporting delivery evidence before an invoice becomes an uncollectible dispute.",
    },
    {
      question: "How does PayTrack monitor the MSMED 45-day statutory payment window?",
      answer:
        "Under Section 15 of India's Micro, Small and Medium Enterprises Development Act (MSMED), B2B buyers are legally required to make payment within the agreed credit period, which cannot exceed 45 days. PayTrack tracks aging receivables into statutory brackets (<15d, 16–30d, 31–45d, and >45d) so you receive early warnings before the statutory threshold is crossed.",
    },
    {
      question: "Can multiple team members log buyer touchpoints without conflicting?",
      answer:
        "Yes. Your sales executives, accounts team, and business owners can view and log buyer communications on a shared chronological timeline. Every entry records the exact date, communication channel (Phone Call, WhatsApp, Email, In-Person), actor name, and buyer reply.",
    },
    {
      question: "What is an active payment commitment?",
      answer:
        "When a buyer promises to pay on a specific date (e.g. 'We will transfer ₹1,45,000 on 22 October after director sign-off'), PayTrack records this as a Payment Commitment. The system monitors that date and flags if the commitment was fulfilled or missed, giving you an immediate morning triage list.",
    },
    {
      question: "Can we export records if we need to escalate to MSME Samadhaan or our legal advisor?",
      answer:
        "Yes. You can export a comprehensive audit timeline for any invoice, combining the original invoice details, logged follow-up communications, buyer commitments, and attached proof of delivery (signed PODs) into an organized PDF or spreadsheet record.",
    },
    {
      question: "Does PayTrack guarantee payment recovery or provide legal advice?",
      answer:
        "No. PayTrack is an operational workflow and record-keeping tool. It provides structured clarity, discipline, and documentation around credit sales. It does not provide legal representation, adjudicate disputes, or act as a collection agency.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#FAF8FC] border-t border-[#E9E4ED] scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow and Heading */}
        <ScrollReveal yOffset={20}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E9E4ED] text-[11px] font-bold text-[#665F70] uppercase tracking-[0.14em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            <span>HELP CENTER & FAQ</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#15121A] tracking-[-0.03em] leading-tight">
            Frequently asked questions.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#665F70] max-w-xl mx-auto">
            Clear answers about how PayTrack supports your receivables and collection workflow.
          </p>
        </ScrollReveal>

        {/* Accordion List */}
        <div className="mt-12 text-left space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl border transition-all duration-250 overflow-hidden ${
                  isOpen
                    ? "border-brand shadow-md ring-1 ring-brand-glow"
                    : "border-[#E9E4ED] shadow-xs hover:border-[#D8CFE0]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full py-4.5 px-6 flex items-center justify-between text-left gap-4 hover:bg-[#FAF8FC] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className={`font-bold text-sm sm:text-base transition-colors ${isOpen ? "text-[#15121A]" : "text-[#15121A]"}`}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#665F70] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-brand" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#665F70] leading-relaxed border-t border-[#F2EFF5] animate-in fade-in-50 duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
