"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const consent = localStorage.getItem("cookie_consent");
      if (!consent) {
        // Small delay so page loads gracefully first
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage might be disabled in private mode
    }
  }, []);

  const handleConsent = (choice: "accepted" | "declined") => {
    try {
      localStorage.setItem("cookie_consent", choice);
    } catch {
      // Ignore storage errors
    }
    setIsVisible(false);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 sm:bottom-6 left-4 sm:left-auto sm:right-6 max-w-md z-50 bg-[#15121B]/95 backdrop-blur-xl border border-brand-glow rounded-2xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_var(--brand-primary-glow)] text-white"
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#221C2B] border border-brand-glow flex items-center justify-center shrink-0 text-brand mt-0.5">
              <Cookie className="w-4 h-4" />
            </div>

            <div className="flex-1 text-left">
              <div className="flex items-center justify-between">
                <h4 id="cookie-consent-title" className="text-xs font-bold text-white tracking-wide uppercase">
                  Cookie Preferences
                </h4>
                <button
                  type="button"
                  onClick={() => handleConsent("declined")}
                  className="text-[#958D9E] hover:text-white transition-colors p-1 -mr-1"
                  aria-label="Dismiss cookie notice"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <p id="cookie-consent-description" className="mt-1.5 text-xs text-[#A69FB0] leading-relaxed">
                We use cookies to enhance your experience, analyze site usage, and support MSME workflow operations. Learn more in our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-brand hover:underline font-semibold"
                >
                  Privacy Policy
                </Link>
                .
              </p>

              <div className="mt-3.5 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleConsent("accepted")}
                  className="px-4 py-2 rounded-full bg-brand hover:bg-brand-hover text-[#15121A] text-xs font-bold shadow-xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer"
                >
                  Accept All
                </button>
                <button
                  type="button"
                  onClick={() => handleConsent("declined")}
                  className="px-4 py-2 rounded-full bg-transparent hover:bg-white/10 text-[#D4CFDC] hover:text-white border border-[#3A3347] hover:border-brand-glow text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer"
                >
                  Essential Only
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
