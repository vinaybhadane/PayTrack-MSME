"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function MarketingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Smooth scroll & scrollspy detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 25);

      // Section tracking
      const sections = ["features", "workflow", "msmed", "faq"];
      const scrollPosition = scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }

      if (scrollY < 200) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler with header offset
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setActiveSection(targetId);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { id: "features", label: "Features" },
    { id: "workflow", label: "Workflow" },
    { id: "msmed", label: "MSMED 45-Day" },
    { id: "faq", label: "Help Center" },
  ];

  return (
    <>
      {/* Background Dimming Overlay for Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <div
        className={`w-full px-4 sm:px-8 sticky top-0 z-50 transition-all duration-300 ease-out ${
          scrolled ? "pt-2 sm:pt-3 pb-1" : "pt-6 sm:pt-8 pb-2"
        }`}
      >
        <header
          className={`max-w-[1380px] mx-auto rounded-full px-6 sm:px-8 flex items-center justify-between transition-all duration-300 ease-out ${
            scrolled
              ? "bg-[#15121B]/85 backdrop-blur-xl text-white h-[62px] border border-brand-glow shadow-[0_16px_36px_rgba(0,0,0,0.45),0_0_24px_var(--brand-primary-glow)]"
              : "bg-[#15121B] text-white h-[72px] border border-[#292434] shadow-2xl"
          }`}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-full py-1 group"
          >
            {/* Stylized wave circular logo driven by theme */}
            <div className="w-8 h-8 rounded-full bg-[#15121B] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
              <svg
                className="w-7 h-7 text-brand"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              >
                <path d="M7 10C10 7.5 14 7 18 8.5C21 9.5 23 12 25 12" />
                <path d="M5 16C9 13 14 13 18 15C22 17 24 19 27 18" />
                <path d="M7 22C10 19.5 14 19 18 20.5C21 21.5 23 24 25 24" />
              </svg>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[16px] sm:text-[17px] tracking-[0.06em] text-white font-sans">
                PAYTRACK
              </span>
              <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-brand text-[#15121A] tracking-wider transition-transform duration-200 group-hover:scale-105 shadow-xs">
                MSME
              </span>
            </div>
          </Link>

          {/* Center Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-3" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => scrollTo(e, link.id)}
                  className={`text-[14px] font-medium px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-brand-soft text-brand font-semibold shadow-xs"
                      : "text-[#D4CFDC] hover:text-brand hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right CTA Actions with subtle hover lift and active scale */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#preview"
              onClick={(e) => scrollTo(e, "preview")}
              className="text-[14px] font-medium text-white px-4 py-2 rounded-full border border-[#3A3347] hover:border-brand hover:text-brand transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            >
              Sign In
            </a>
            <a
              href="#preview"
              onClick={(e) => scrollTo(e, "preview")}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-brand hover:bg-brand-hover text-[#15121A] text-[14px] font-bold shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-brand-glow active:translate-y-0 active:scale-[0.98]"
            >
              <span>Create Account</span>
            </a>
          </div>

          {/* Mobile Hamburger Button with animated icon rotation */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-white hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand transition-colors relative"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </motion.div>
            </button>
          </div>
        </header>

        {/* Mobile Drawer Menu with AnimatePresence fluid height and slide */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-50 md:hidden mt-2 max-w-[1380px] mx-auto rounded-3xl bg-[#15121B]/95 backdrop-blur-2xl border border-brand-glow p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_25px_var(--brand-primary-glow)] text-white"
            >
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => scrollTo(e, link.id)}
                    className={`px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      activeSection === link.id
                        ? "bg-brand-soft text-brand font-semibold"
                        : "text-[#D4CFDC] hover:text-brand hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-3 mt-1 border-t border-[#292434] flex flex-col gap-2.5">
                  <a
                    href="#preview"
                    onClick={(e) => scrollTo(e, "preview")}
                    className="w-full text-center py-2.5 text-sm font-medium text-white rounded-full border border-[#3A3347] hover:border-brand hover:text-brand transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                  >
                    Sign In
                  </a>
                  <a
                    href="#preview"
                    onClick={(e) => scrollTo(e, "preview")}
                    className="w-full text-center py-2.5 rounded-full bg-brand text-[#15121A] text-sm font-bold shadow-md hover:bg-brand-hover transition-all duration-300 hover:-translate-y-0.5 hover:shadow-brand-glow active:translate-y-0 active:scale-[0.98]"
                  >
                    Create Account
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
