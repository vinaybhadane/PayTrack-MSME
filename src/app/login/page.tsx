"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const { user, signInWithEmail, signInWithGoogle, loading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !authLoading) {
      router.push(redirectUrl);
    }
  }, [user, authLoading, redirectUrl, router]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setSubmitting(true);
    try {
      await signInWithEmail(email, password);
      setSuccessMessage("Signed in successfully. Redirecting to dashboard...");
      setTimeout(() => {
        router.push(redirectUrl);
      }, 500);
    } catch (err: unknown) {
      const errObj = err as { code?: string; message?: string };
      if (errObj.code === "auth/invalid-credential" || errObj.code === "auth/user-not-found" || errObj.code === "auth/wrong-password") {
        setErrorMessage("Invalid email or password. Please check your credentials.");
      } else if (errObj.code === "auth/too-many-requests") {
        setErrorMessage("Too many failed attempts. Please reset your password or try again later.");
      } else {
        setErrorMessage(errObj.message || "Failed to sign in. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage("");
    setGoogleSubmitting(true);
    try {
      await signInWithGoogle();
      setSuccessMessage("Google authentication successful. Redirecting...");
      setTimeout(() => {
        router.push(redirectUrl);
      }, 500);
    } catch (err: unknown) {
      const errObj = err as { message?: string };
      setErrorMessage(errObj.message || "Failed to sign in with Google.");
    } finally {
      setGoogleSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0D13] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden hero-grid-pattern">
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Brand Logo & Back to Landing */}
        <div className="text-center mb-8">
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
          <h1 className="mt-5 text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Sign in to your account
          </h1>
          <p className="mt-2 text-sm text-[#958D9E]">
            Access your B2B receivables timeline and commitment registry
          </p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#15121B] border border-[#292434] hover:border-[#3A3347] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl transition-colors duration-300"
        >
          {/* Status Alerts */}
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

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleSubmitting || submitting}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-[#3A3347] bg-[#1C1724] hover:bg-[#251F30] text-white text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {/* Official Google Multicolor SVG Icon */}
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
            <span>{googleSubmitting ? "Connecting to Google..." : "Continue with Google"}</span>
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#292434]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#15121B] px-3 text-[#665F70] font-medium tracking-wider">
                or sign in with email
              </span>
            </div>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-[#D4CFDC] mb-1.5"
              >
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#958D9E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-white placeholder-[#665F70] text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#D4CFDC]"
                >
                  Password
                </label>
                <Link
                  href="/contact?topic=password-reset"
                  className="text-xs text-brand hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#958D9E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••••••"
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

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#1C1724] border-[#292434] text-brand focus:ring-brand focus:ring-offset-0 focus:ring-1 cursor-pointer"
                />
                <span className="text-xs text-[#958D9E]">Remember this device</span>
              </label>
            </div>

            {/* Primary Sign In Button */}
            <button
              type="submit"
              disabled={submitting || googleSubmitting}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand hover:bg-brand-hover text-[#15121A] text-sm font-bold shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-brand-glow active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <div className="w-5 h-5 border-2 border-[#15121A] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                </>
              )}
            </button>
          </form>

          {/* Footer inside card */}
          <div className="mt-6 pt-5 border-t border-[#292434] text-center">
            <p className="text-xs text-[#958D9E]">
              Don&apos;t have an account yet?{" "}
              <Link
                href="/signup"
                className="text-brand font-semibold hover:underline inline-flex items-center gap-1"
              >
                Create Account with OTP
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Security badge at bottom */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#665F70]">
          <ShieldCheck className="w-4 h-4 text-brand" />
          <span>Secured with Firebase Authentication &amp; MSME privacy controls</span>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0F0D13] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
