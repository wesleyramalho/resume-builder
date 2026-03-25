import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

const plusJakartaSans = localFont({
  src: [
    { path: "../../public/fonts/plus-jakarta-sans.woff2", weight: "400" },
    { path: "../../public/fonts/plus-jakarta-sans.woff2", weight: "600" },
    { path: "../../public/fonts/plus-jakarta-sans.woff2", weight: "700" },
  ],
  variable: "--font-jakarta",
  display: "swap",
});

const spaceMono = localFont({
  src: [
    { path: "../../public/fonts/space-mono-400.woff2", weight: "400" },
    { path: "../../public/fonts/space-mono-700.woff2", weight: "700" },
  ],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mypdfcv.com"),
  title: {
    default: "MyPDFCV — Curate Your Career Narrative",
    template: "%s | MyPDFCV",
  },
  description:
    "Build professional, ATS-ready resumes with real-time preview and one-click PDF export.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("architect-suite-theme");if(t==="dark")document.documentElement.classList.add("dark");else document.documentElement.classList.remove("dark")}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider>
          <SessionProvider>
            <TooltipProvider>
              {children}
              <Toaster richColors position="bottom-right" />
            </TooltipProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
