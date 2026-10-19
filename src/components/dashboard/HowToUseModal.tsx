"use client";

import React, { useState } from "react";
import {
  X,
  HelpCircle,
  FileText,
  Clock,
  MessageSquare,
  Paperclip,
  CheckCircle2,
  AlertTriangle,
  Languages,
  Check,
  ShieldCheck,
} from "lucide-react";

interface HowToUseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HowToUseModal({ isOpen, onClose }: HowToUseModalProps) {
  const [lang, setLang] = useState<"en" | "hi">("en");

  if (!isOpen) return null;

  const stepsEn = [
    {
      step: "01",
      title: "Record Credit Invoice",
      icon: FileText,
      color: "text-brand",
      bg: "bg-brand/10 border-brand/20",
      desc: "Record your B2B invoice with amount, issue date, and agreed payment terms. The system monitors credit age and enforces the MSMED Section 15 statutory 45-day threshold.",
    },
    {
      step: "02",
      title: "Log Buyer Payment Commitments",
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
      desc: "When a customer promises payment over WhatsApp, phone call, or email, record the specific promised date and amount. The system highlights pending and broken commitments.",
    },
    {
      step: "03",
      title: "Conduct & Log Follow-Ups",
      icon: MessageSquare,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
      desc: "Maintain a clear operational log of every call or message with accounts leads, discussion summaries, buyer responses, and scheduled next follow-up dates.",
    },
    {
      step: "04",
      title: "Attach Evidence to Vault",
      icon: Paperclip,
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
      desc: "Upload stamped delivery challans, transporter lorry receipts (LR), purchase orders (PO), and WhatsApp chat screenshots to prove delivery acceptance.",
    },
    {
      step: "05",
      title: "Record Payments & Partial Receipts",
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
      desc: "Credit incoming RTGS, NEFT, or UPI payments with bank UTR reference numbers. Outstanding balances and settlement progress update automatically.",
    },
    {
      step: "06",
      title: "Monitor 45-Day MSMED Statutory Limits",
      icon: AlertTriangle,
      color: "text-rose-400",
      bg: "bg-rose-500/10 border-rose-500/20",
      desc: "Identify overdue credit beyond 45 days. View calculated statutory penal interest under Section 16 for legal notices or MSME Samadhaan pre-dispute applications.",
    },
  ];

  const stepsHi = [
    {
      step: "०१",
      title: "क्रेडिट इनवॉइस (चालान) दर्ज करें",
      icon: FileText,
      color: "text-brand",
      bg: "bg-brand/10 border-brand/20",
      desc: "अपनी चालान संख्या, खरीदार कंपनी और देय तिथि दर्ज करें। सिस्टम स्वचालित रूप से क्रेडिट दिनों की गणना करता है और MSMED कानून के 45 दिनों के नियम का पालन कराता है।",
    },
    {
      step: "०२",
      title: "भुगतान का वादा (Commitment) दर्ज करें",
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
      desc: "जब खरीदार व्हाट्सएप, फोन या ईमेल पर भुगतान का वादा करे, तो सटीक तारीख और राशि दर्ज करें। सिस्टम समय पर वादे की याद दिलाता है और छूटे हुए वादे को दर्शाता है।",
    },
    {
      step: "०३",
      title: "फॉलो-अप और बातचीत का रिकॉर्ड रखें",
      icon: MessageSquare,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
      desc: "खरीदार के एकाउंट्स अधिकारी से हुई हर बातचीत, उनके दिए गए जवाब और अगली फॉलो-अप तारीख को दर्ज करें ताकि विवाद होने से पहले आपके पास स्पष्ट प्रमाण रहे।",
    },
    {
      step: "०४",
      title: "डिलीवरी चालान और सबूत सुरक्षित करें",
      icon: Paperclip,
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
      desc: "स्टैम्प्ड डिलीवरी चालान, ट्रांसपोर्टर लॉरी रसीद (LR), परचेज ऑर्डर (PO) और व्हाट्सएप स्क्रीनशॉट को सीधे एविडेंस वॉल्ट में अपलोड करके सुरक्षित रखें।",
    },
    {
      step: "०५",
      title: "प्राप्त भुगतान दर्ज करें (पूर्ण या आंशिक)",
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
      desc: "बैंक खाते में RTGS, NEFT या UPI आते ही राशि और यूटीआर (UTR) नंबर दर्ज करें। शेष बकाया राशि और चालान की स्थिति तुरंत बदल जाती है।",
    },
    {
      step: "०६",
      title: "45-दिवसीय MSMED नियमों की निगरानी",
      icon: AlertTriangle,
      color: "text-rose-400",
      bg: "bg-rose-500/10 border-rose-500/20",
      desc: "45 दिनों से अधिक पुराने अटके बिलों को अलग से पहचानें। धारा 16 के तहत लगने वाले वैधानिक ब्याज की गणना देखें और समाधान (Samadhaan) प्रक्रिया के लिए तैयार रहें।",
    },
  ];

  const steps = lang === "en" ? stepsEn : stepsHi;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#15121B] border border-[#292434] rounded-3xl p-6 sm:p-7 shadow-2xl text-white my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#292434] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-[#15121A] font-bold">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                {lang === "en" ? "How to Use PayTrack MSME" : "PayTrack MSME का उपयोग कैसे करें"}
              </h2>
              <p className="text-xs text-[#958D9E]">
                {lang === "en"
                  ? "Standard operating procedure for Indian B2B receivables tracking"
                  : "भारतीय सूक्ष्म और लघु उद्यमों के लिए भुगतान ट्रैकिंग मार्गदर्शिका"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="flex items-center bg-[#1C1724] border border-[#292434] rounded-xl p-1 text-xs">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  lang === "en" ? "bg-brand text-[#15121A]" : "text-[#958D9E] hover:text-white"
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang("hi")}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  lang === "hi" ? "bg-brand text-[#15121A]" : "text-[#958D9E] hover:text-white"
                }`}
              >
                हिंदी (Hindi)
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#958D9E] hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Steps Content List */}
        <div className="mt-5 overflow-y-auto pr-1 space-y-3.5 flex-1">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-4 bg-[#1C1724] border border-[#292434] hover:border-brand-border rounded-2xl transition-colors flex items-start gap-3.5"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${item.bg} border flex items-center justify-center shrink-0 mt-0.5`}
                >
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-xs sm:text-sm font-bold text-white">{item.title}</h3>
                    <span className="text-[10px] font-mono font-bold text-brand bg-brand-soft border border-brand-border px-2 py-0.5 rounded-full">
                      Step {item.step}
                    </span>
                  </div>
                  <p className="text-xs text-[#958D9E] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#292434] mt-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#958D9E]">
            <ShieldCheck className="w-4 h-4 text-brand" />
            <span>
              {lang === "en"
                ? "Compliant with MSMED Act 2006 guidelines"
                : "MSMED अधिनियम 2006 के प्रावधानों के अनुरूप"}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-[#15121A] bg-brand hover:bg-brand-hover shadow-md transition-all flex items-center gap-1.5"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>{lang === "en" ? "Got It" : "समझ गया"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
