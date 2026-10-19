"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#15121A] selection:bg-[#9E7EB5] selection:text-white">
      <MarketingHeader />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-left">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#665F70] hover:text-brand transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-soft text-brand text-xs font-bold uppercase tracking-wider border border-brand-glow">
              <Mail className="w-3.5 h-3.5" />
              <span>DIRECT SUPPORT</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#15121A] tracking-tight leading-tight">
              Get in touch with the PayTrack team.
            </h1>

            <p className="text-sm sm:text-base text-[#665F70] leading-relaxed">
              Have questions about receivables workflows, MSMED 45-day statutory compliance, or deploying PayTrack for your manufacturing or trading enterprise? We are here to help.
            </p>

            <div className="space-y-4 pt-4 border-t border-[#E9E4ED] text-sm text-[#665F70]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#15121B] text-brand flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-[#958D9E]">Email Support</div>
                  <a href="mailto:support@paytrack.in" className="font-semibold text-[#15121A] hover:text-brand">
                    support@paytrack.in
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#15121B] text-[#9E7EB5] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-[#958D9E]">Working Hours</div>
                  <div className="font-semibold text-[#15121A]">
                    Monday – Friday, 9:30 AM – 6:30 PM IST
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#15121B] text-[#9E7EB5] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-[#958D9E]">Headquarters</div>
                  <div className="font-semibold text-[#15121A]">
                    Bengaluru / Gurugram, India
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7">
            <div className="bg-[#F9F7FA] rounded-3xl p-6 sm:p-10 border border-[#E9E4ED] shadow-sm">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-[#0D9488] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#15121A]">
                    Message Received
                  </h3>
                  <p className="text-sm text-[#665F70] max-w-sm mx-auto">
                    Thank you, {formData.name || "partner"}. An MSME workflow specialist will get in touch with you within one business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-brand text-[#15121A] text-xs font-bold hover:bg-brand-hover transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-xl font-bold text-[#15121A]">
                    Send us a message
                  </h2>

                  <div>
                    <label className="block text-xs font-bold text-[#665F70] mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Vinay Bhadane"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#E9E4ED] text-sm text-[#15121A] focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#665F70] mb-1.5">
                        Business Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="vinay@bhadane-tools.in"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#E9E4ED] text-sm text-[#15121A] focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#665F70] mb-1.5">
                        Enterprise Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Bhadane Precision Tools MSME"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#E9E4ED] text-sm text-[#15121A] focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#665F70] mb-1.5">
                      Your Query or Requirements
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="We have ~40 active B2B buyers and want to streamline overdue follow-ups..."
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#E9E4ED] text-sm text-[#15121A] focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-brand hover:bg-brand-hover text-[#15121A] font-bold text-sm shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-brand-glow active:translate-y-0 active:scale-[0.98] inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Submit Query</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
