import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border px-6 md:px-12 py-4">
        <Link href="/" className="font-mono text-sm font-bold uppercase tracking-widest text-foreground">
          Build My Resume
        </Link>
      </nav>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-12">
        <h1 className="font-sans font-bold text-3xl text-foreground mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: March 25, 2026</p>

        <div className="prose prose-sm text-muted-foreground space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-foreground">1. Data Storage</h2>
            <p>
              Build My Resume is a client-side application. All resume data you create is stored
              exclusively in your browser&apos;s localStorage. We do not collect, transmit, or store
              your resume data on any server.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">2. LinkedIn OAuth</h2>
            <p>
              If you choose to sign in with LinkedIn, we access only the following information
              through LinkedIn&apos;s OAuth API: your name, email address, headline, location, and
              profile photo. This data is used solely to pre-fill your resume and is stored only
              in your browser&apos;s localStorage. We do not retain your LinkedIn access token
              beyond the active session.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">3. AI Processing</h2>
            <p>
              Our AI-powered text improvement feature runs entirely in your browser using
              open-source models (Xenova/flan-t5-small) via WebAssembly. No resume content is
              sent to external servers for AI processing. The AI model is downloaded once and
              cached locally in your browser.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">4. Cookies &amp; Tracking</h2>
            <p>
              We do not use tracking cookies, analytics services, or any third-party tracking
              tools. We use localStorage only for saving your resume data and theme preference.
              See our <Link href="/cookies" className="text-foreground underline">Cookie Policy</Link> for
              more details.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">5. Contact</h2>
            <p>
              For privacy-related inquiries, please visit{" "}
              <a href="https://www.wesleyramalho.com/contact" target="_blank" rel="noopener noreferrer" className="text-foreground underline">
                www.wesleyramalho.com/contact
              </a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
