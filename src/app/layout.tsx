import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

const montserratAlternates = localFont({
  src: [
    { path: "../../public/fonts/montserrat-alternates-400.woff2", weight: "400" },
    { path: "../../public/fonts/montserrat-alternates-600.woff2", weight: "600" },
    { path: "../../public/fonts/montserrat-alternates-700.woff2", weight: "700" },
  ],
  variable: "--font-montserrat-alt",
  display: "swap",
});

const orbitron = localFont({
  src: [
    { path: "../../public/fonts/orbitron-400-700.woff2", weight: "400" },
    { path: "../../public/fonts/orbitron-400-700.woff2", weight: "700" },
  ],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Build My Resume — Curate Your Career Narrative",
    template: "%s | Build My Resume",
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
      className={`${montserratAlternates.variable} ${orbitron.variable}`}
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
