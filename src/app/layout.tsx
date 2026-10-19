import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CookieConsent } from "@/components/common/CookieConsent";
import { AuthProvider } from "@/context/AuthContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#15121B",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://paytrack.in"),
  title: {
    default: "PayTrack MSME — B2B Receivables & Payment Workflow Platform",
    template: "%s | PayTrack MSME",
  },
  description:
    "Track credit terms, payment commitments, follow-ups, and Section 15 MSMED 45-day statutory compliance in one unified operational ledger for Indian MSMEs.",
  keywords: [
    "MSME receivables",
    "B2B payments India",
    "delayed payment tracking",
    "MSMED Act Section 15",
    "45 days credit limit MSME",
    "payment commitment tracker",
    "MSME Samadhaan pre-dispute ledger",
    "invoice follow-up software",
    "Indian manufacturing receivables",
  ],
  authors: [{ name: "Vinay Bhadane" }, { name: "PayTrack MSME" }],
  creator: "PayTrack MSME",
  publisher: "PayTrack MSME",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "PayTrack MSME — B2B Receivables & Payment Workflow Platform",
    description:
      "Operational invoice workflow and payment commitment tracking for Indian Micro & Small Enterprises.",
    url: "https://paytrack.in",
    siteName: "PayTrack MSME",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PayTrack MSME — B2B Receivables Platform",
    description:
      "Maintain an operational record around invoices, payment promises, and delivery evidence.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PayTrack MSME",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description":
      "Dedicated pre-dispute delayed-payment tracking and payment commitment management software for Indian Micro and Small Enterprises under the MSMED Act 2006.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
    },
  };

  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#171717] antialiased">
        <AuthProvider>
          {children}
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}
