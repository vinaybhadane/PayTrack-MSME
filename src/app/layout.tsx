import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CookieConsent } from "@/components/common/CookieConsent";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "PayTrack MSME — B2B Receivables & Payment Workflow Platform",
  description:
    "Keep buyer credit terms, payment commitments, follow-ups, and audit-ready evidence connected in one dependable workspace built for Indian MSMEs.",
  keywords: [
    "MSME receivables",
    "B2B payments India",
    "delayed payment tracking",
    "MSMEDA 45 days",
    "invoice follow-up software",
    "payment commitment tracker",
  ],
  authors: [{ name: "PayTrack Team" }],
};

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-white text-[#171717] antialiased">
        <AuthProvider>
          {children}
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}
