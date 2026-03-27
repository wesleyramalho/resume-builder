import type { Metadata } from "next";
import LandingNav from "@/components/landing/LandingNav";

export const metadata: Metadata = {
  title: "Free Resume Builder — No Sign-up Required",
  description:
    "Create professional resumes with real-time preview, 7 free templates, AI text improvement, and one-click PDF export. Your data stays in your browser.",
};
import LandingHero from "@/components/landing/LandingHero";
import LandingFeatures from "@/components/landing/LandingFeatures";
import LandingTemplates from "@/components/landing/LandingTemplates";
import LandingCTA from "@/components/landing/LandingCTA";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <LandingNav />
      <LandingHero />
      <LandingFeatures />
      <LandingTemplates />
      <LandingCTA />
      <Footer />
    </main>
  );
}
