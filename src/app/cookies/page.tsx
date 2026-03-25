import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = { title: "Cookie Policy" };

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border px-6 md:px-12 py-4">
        <Link href="/" className="font-mono text-sm font-bold uppercase tracking-widest text-foreground">
          MyPDFCV
        </Link>
      </nav>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-12">
        <h1 className="font-sans font-bold text-3xl text-foreground mb-2">Cookie Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: March 25, 2026</p>

        <div className="prose prose-sm text-muted-foreground space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-foreground">1. What We Use</h2>
            <p>
              MyPDFCV does not use cookies. Instead, we use your browser&apos;s
              localStorage to store:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Your resume data (content, section order, template choice)</li>
              <li>Your theme preference (light or dark mode)</li>
            </ul>
            <p className="mt-2">
              This data never leaves your browser and is not transmitted to any server.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">2. No Tracking</h2>
            <p>
              We do not use any analytics, tracking pixels, advertising cookies, or third-party
              tracking tools. Your browsing activity on this site is not monitored or recorded.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">3. Third-Party Services</h2>
            <p>
              If you choose to sign in with LinkedIn, LinkedIn&apos;s own cookie and privacy
              policies apply to the authentication flow. We do not control LinkedIn&apos;s use of
              cookies. Please refer to{" "}
              <a href="https://www.linkedin.com/legal/cookie-policy" target="_blank" rel="noopener noreferrer" className="text-foreground underline">
                LinkedIn&apos;s Cookie Policy
              </a>{" "}
              for more information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">4. Clearing Data</h2>
            <p>
              You can remove all stored data at any time by clearing your browser&apos;s
              localStorage. This will permanently delete all resume data and preferences.
              In most browsers, this can be done via Settings → Privacy → Clear browsing data →
              Cookies and site data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">5. Contact</h2>
            <p>
              For questions about this policy, please visit{" "}
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
