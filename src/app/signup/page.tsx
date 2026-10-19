"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Building2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function SignupForm() {
  const router = useRouter();
  const { user, signInWithGoogle, signUpWithVerifiedOtp, loading: authLoading } = useAuth();

  // Step 1: Form Details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Step 2: OTP State
  const [step, setStep] = useState<1 | 2>(1);
  const [otpValues, setOtpValues] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Feedback states
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [devOtpHint, setDevOtpHint] = useState<string | null>(null);

  // Resend cooldown timer
  const [resendCooldown, setResendCooldown] = useState(0);

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !authLoading) {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  // Resend timer countdown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  // Step 1 Handler: Request OTP via Brevo
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setDevOtpHint(null);

    if (!name.trim() || name.trim().length < 2) {
      setErrorMessage("Please enter your full name (at least 2 characters).");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid business email address.");
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          company: company.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to send verification code.");
      }

      setStep(2);
      setSuccessMessage(data.message || "Verification code sent to your email.");
      setResendCooldown(60);

      if (data.devOtp) {
        setDevOtpHint(data.devOtp);
      }

      // Auto-focus the first OTP input
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 150);
    } catch (err: unknown) {
      const errObj = err as { message?: string };
      setErrorMessage(errObj.message || "Something went wrong while sending the OTP.");
    } finally {
      setSubmitting(false);
    }
  };

  // Step 2 Handler: OTP Input Change Handling (Auto-advance & Backspace)
  const handleOtpChange = (index: number, val: string) => {
    // Only numeric input
    const cleanVal = val.replace(/\D/g, "");
    if (!cleanVal && val !== "") return;

    const newOtp = [...otpValues];

    // Handle single character
    if (cleanVal.length <= 1) {
      newOtp[index] = cleanVal;
      setOtpValues(newOtp);

      // Auto advance
      if (cleanVal && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    } else {
      // Handle paste
      const pastedDigits = cleanVal.slice(0, 6).split("");
      pastedDigits.forEach((digit, i) => {
        if (i < 6) newOtp[i] = digit;
      });
      setOtpValues(newOtp);
      const nextFocus = Math.min(pastedDigits.length, 5);
      inputRefs.current[nextFocus]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (resendCooldown > 0 || submitting) return;
    setErrorMessage("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), name: name.trim(), company: company.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to resend verification code.");
      }
      setSuccessMessage("New verification code sent!");
      setResendCooldown(60);
      if (data.devOtp) setDevOtpHint(data.devOtp);
    } catch (err: unknown) {
      const errObj = err as { message?: string };
      setErrorMessage(errObj.message || "Failed to resend OTP.");
    } finally {
      setSubmitting(false);
    }
  };

  // Step 2 Handler: Verify OTP and Create Firebase Account
  const handleVerifyAndCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const fullOtp = otpValues.join("");
    if (fullOtp.length !== 6) {
      setErrorMessage("Please enter all 6 digits of your verification code.");
      return;
    }

    setSubmitting(true);
    try {
      // 1. Verify OTP with server route
      const verifyRes = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), otp: fullOtp }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok || !verifyData.success) {
        throw new Error(verifyData.message || "Invalid verification code.");
      }

      // 2. Verified! Now create the account with Firebase
      await signUpWithVerifiedOtp({
        email: email.trim(),
        password,
        name: name.trim(),
        company: company.trim(),
        registrationToken: verifyData.registrationToken,
      });

      setSuccessMessage("Account created successfully! Redirecting to your dashboard...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 700);
    } catch (err: unknown) {
      const errObj = err as { code?: string; message?: string };
      if (errObj.code === "auth/email-already-in-use") {
        setErrorMessage("An account with this email already exists. Please sign in instead.");
      } else if (errObj.code === "auth/weak-password") {
        setErrorMessage("Password is too weak. Please use at least 6 characters.");
      } else {
        setErrorMessage(errObj.message || "Failed to complete account registration.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Google Sign In option
  const handleGoogleSignIn = async () => {
    setErrorMessage("");
    setGoogleSubmitting(true);
    try {
      await signInWithGoogle();
      setSuccessMessage("Google authentication successful. Redirecting...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } catch (err: unknown) {
      const errObj = err as { message?: string };
      setErrorMessage(errObj.message || "Failed to sign in with Google.");
    } finally {
      setGoogleSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0D13] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Logo and header */}
        <div className="text-center mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-full px-3 py-1.5 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center font-bold text-[#15121A] text-lg shadow-md group-hover:scale-105 transition-transform duration-300">
              P
            </div>
            <div className="text-left">
              <span className="text-xl font-bold tracking-tight text-white block leading-tight">
                PayTrack<span className="text-brand font-medium text-xs ml-1.5 px-2 py-0.5 rounded-full bg-brand-soft border border-brand-border">MSME</span>
              </span>
            </div>
          </Link>
          <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {step === 1 ? "Create your account" : "Verify your email"}
          </h1>
          <p className="mt-1.5 text-sm text-[#958D9E]">
            {step === 1
              ? "Start tracking invoices, buyer commitments, and payment evidence"
              : `Enter the 6-digit code sent to ${email}`}
          </p>
        </div>

        {/* Step Progression Bar */}
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step === 1
                  ? "bg-brand text-[#15121A]"
                  : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
              }`}
            >
              1
            </span>
            <span className={`text-xs font-medium ${step === 1 ? "text-white" : "text-[#958D9E]"}`}>
              Details
            </span>
          </div>
          <div className="w-8 h-[2px] bg-[#292434]" />
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step === 2
                  ? "bg-brand text-[#15121A]"
                  : "bg-[#1C1724] text-[#665F70] border border-[#292434]"
              }`}
            >
              2
            </span>
            <span className={`text-xs font-medium ${step === 2 ? "text-white" : "text-[#665F70]"}`}>
              OTP Verification
            </span>
          </div>
        </div>

        {/* Card */}
        <motion.div
          layout
          className="bg-[#15121B] border border-[#292434] hover:border-[#3A3347] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl transition-colors duration-300"
        >
          {/* Alerts */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300 text-sm"
            >
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 text-emerald-300 text-sm"
            >
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
              <span>{successMessage}</span>
            </motion.div>
          )}

          {/* Dev Mode OTP Callout for immediate testing */}
          {devOtpHint && (
            <div className="mb-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
              <span><strong>Dev Mode:</strong> Your OTP code is <strong>{devOtpHint}</strong></span>
              <button
                type="button"
                onClick={() => {
                  const digits = devOtpHint.split("");
                  setOtpValues(digits);
                }}
                className="ml-2 px-2 py-0.5 rounded bg-amber-400 text-[#15121A] font-bold text-[11px] hover:bg-amber-300"
              >
                Auto-fill
              </button>
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 ? (
              /* STEP 1: ACCOUNT DETAILS */
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Google Sign In option */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={googleSubmitting || submitting}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-[#3A3347] bg-[#1C1724] hover:bg-[#251F30] text-white text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed group mb-5"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>{googleSubmitting ? "Connecting to Google..." : "Sign up with Google"}</span>
                </button>

                <div className="relative my-5">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#292434]" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#15121B] px-3 text-[#665F70] font-medium tracking-wider">
                      or sign up with email OTP
                    </span>
                  </div>
                </div>

                <form onSubmit={handleRequestOtp} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="signup-name"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#D4CFDC] mb-1.5"
                    >
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#958D9E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="signup-name"
                        type="text"
                        required
                        placeholder="Vinay Bhadane"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-white placeholder-[#665F70] text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
                      />
                    </div>
                  </div>

                  {/* Business Email */}
                  <div>
                    <label
                      htmlFor="signup-email"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#D4CFDC] mb-1.5"
                    >
                      Work / Business Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#958D9E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="signup-email"
                        type="email"
                        required
                        placeholder="vinay@bhadane-msme.in"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-white placeholder-[#665F70] text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-[#958D9E]">
                      A 6-digit verification code will be sent to this email via Brevo.
                    </p>
                  </div>

                  {/* Company Name (Optional) */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="signup-company"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#D4CFDC]"
                      >
                        Company / Trade Name
                      </label>
                      <span className="text-[11px] text-[#665F70] italic">Optional</span>
                    </div>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-[#958D9E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="signup-company"
                        type="text"
                        placeholder="Bhadane Precision Components Pvt Ltd"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-white placeholder-[#665F70] text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="signup-password"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#D4CFDC] mb-1.5"
                    >
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#958D9E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        required
                        minLength={6}
                        placeholder="At least 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-11 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-white placeholder-[#665F70] text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#958D9E] hover:text-white p-1 rounded-md transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-3 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand hover:bg-brand-hover text-[#15121A] text-sm font-bold shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <div className="w-5 h-5 border-2 border-[#15121A] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Continue &amp; Send OTP</span>
                        <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              /* STEP 2: OTP VERIFICATION */
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center justify-between mb-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-1.5 text-xs text-[#958D9E] hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Change details</span>
                  </button>
                  <span className="text-xs text-[#665F70]">Step 2 of 2</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1C1724] border border-[#292434] mb-6">
                  <div className="text-xs text-[#958D9E]">Recipient Email:</div>
                  <div className="text-sm font-semibold text-white truncate mt-0.5">{email}</div>
                </div>

                <form onSubmit={handleVerifyAndCreateAccount} className="space-y-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-center text-[#D4CFDC] mb-3">
                      Enter 6-Digit Code
                    </label>

                    {/* 6-box OTP Input */}
                    <div className="flex items-center justify-center gap-2 sm:gap-2.5">
                      {otpValues.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => {
                            inputRefs.current[index] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-bold rounded-xl bg-[#1C1724] border text-white transition-all duration-200 focus:outline-none ${
                            digit
                              ? "border-brand bg-[#251F30]"
                              : "border-[#292434] focus:border-brand focus:ring-1 focus:ring-brand"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Resend Action */}
                  <div className="text-center">
                    {resendCooldown > 0 ? (
                      <span className="text-xs text-[#665F70]">
                        Resend code in <strong className="text-brand">{resendCooldown}s</strong>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={submitting}
                        className="inline-flex items-center gap-1.5 text-xs text-brand hover:underline font-medium"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Resend verification code</span>
                      </button>
                    )}
                  </div>

                  {/* Verify & Create Button */}
                  <button
                    type="submit"
                    disabled={submitting || otpValues.join("").length !== 6}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand hover:bg-brand-hover text-[#15121A] text-sm font-bold shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <div className="w-5 h-5 border-2 border-[#15121A] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Verify &amp; Create Account</span>
                        <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer inside card */}
          <div className="mt-6 pt-5 border-t border-[#292434] text-center">
            <p className="text-xs text-[#958D9E]">
              Already have an account?{" "}
              <Link href="/login" className="text-brand font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Security Notice */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#665F70]">
          <ShieldCheck className="w-4 h-4 text-brand" />
          <span>Protected by Brevo Transactional OTP &amp; Firebase Identity</span>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0F0D13] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SignupForm />
    </Suspense>
  );
}
