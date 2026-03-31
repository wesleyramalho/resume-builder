import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { getLocale } from "next-intl/server";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mypdfcv.com"),
  title: {
    default: "MyPDFCV — Free Resume Builder",
    template: "%s | MyPDFCV",
  },
  description:
    "Build professional resumes with real-time preview, 7 templates, and free PDF export. No paywall, no sign-up. 100% free and open source.",
  keywords: [
    "resume builder",
    "free resume",
    "PDF resume",
    "CV builder",
    "open source resume",
  ],
  authors: [{ name: "MyPDFCV" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "MyPDFCV",
    title: "MyPDFCV — Free Resume Builder",
    description:
      "Build professional resumes for free. No sign-up, no paywall, open source.",
    url: "https://mypdfcv.com",
    images: [{ url: "https://mypdfcv.com/og-image.png", width: 1536, height: 1024 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MyPDFCV — Free Resume Builder",
    description:
      "Build professional resumes for free. No sign-up, no paywall, open source.",
    images: ["https://mypdfcv.com/og-image.png"],
  },
  robots: { index: true, follow: true },
};

// Variable font — single file covers all weights (400–800)
const plusJakartaSans = localFont({
  src: "../../public/fonts/plus-jakarta-sans.woff2",
  weight: "100 800",
  variable: "--font-jakarta",
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      className={`${plusJakartaSans.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
