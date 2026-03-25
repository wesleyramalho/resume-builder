import LandingNav from "@/components/landing/LandingNav";
import LandingHero from "@/components/landing/LandingHero";
import LandingFeatures from "@/components/landing/LandingFeatures";
import LandingResumeSample from "@/components/landing/LandingResumeSample";
import LandingCTA from "@/components/landing/LandingCTA";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <LandingNav />
      <LandingHero />
      <LandingFeatures />
      <LandingResumeSample />
      <LandingCTA />

      <footer className="border-t border-white/5 py-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-zinc-600 uppercase tracking-widest">
            Build My Resume
          </p>
          <div className="flex gap-6 text-xs text-zinc-600">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookie Policy</span>
            <span>Contact</span>
          </div>
          <p className="font-mono text-[10px] text-zinc-700">
            © 2026 Build My Resume. Editorial Excellence.
          </p>
        </div>
      </footer>
    </main>
  );
}
