import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

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
    default: "ArchitectSuite — Curate Your Career Narrative",
    template: "%s | ArchitectSuite",
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
            __html: `
              (() => {
                try {
                  const theme = localStorage.getItem("architect-suite-theme");
                  if (theme === "dark") document.documentElement.classList.add("dark");
                  else document.documentElement.classList.remove("dark");
                } catch {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider>
          <SessionProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
