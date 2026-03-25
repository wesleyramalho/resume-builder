import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border px-6 md:px-12 py-4">
        <Link href="/" className="font-mono text-sm font-bold uppercase tracking-widest text-foreground">
          Build My Resume
        </Link>
      </nav>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-12">
        <h1 className="font-sans font-bold text-3xl text-foreground mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: March 25, 2026</p>

        <div className="prose prose-sm text-muted-foreground space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Build My Resume, you agree to be bound by these Terms of
              Service. If you do not agree, please do not use the service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">2. Service Description</h2>
            <p>
              Build My Resume is a free, client-side resume builder tool. All resume data is
              stored locally in your browser. We do not provide hosting, storage, or backup
              services for your resume data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">3. AI-Powered Features</h2>
            <p>
              This application includes an optional AI text improvement feature powered by
              open-source models (Xenova/flan-t5-small, licensed under Apache 2.0). Important
              information about this feature:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                All AI processing runs entirely in your browser via WebAssembly. No resume
                content is sent to any external server for AI processing.
              </li>
              <li>
                AI-generated suggestions are provided &quot;as is&quot; without any warranty of
                accuracy, completeness, or fitness for a particular purpose.
              </li>
              <li>
                Suggestions may contain inaccuracies, grammatical errors, or content that does
                not accurately represent your experience. You must review and edit all
                AI-generated content before using it.
              </li>
              <li>
                You are solely responsible for the final content of your resume, including any
                content derived from AI suggestions.
              </li>
              <li>
                The service operator assumes no liability for any consequences arising from the
                use of AI-generated content, including but not limited to inaccurate
                representations in job applications.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">4. No Warranty</h2>
            <p>
              This service is provided &quot;as is&quot; and &quot;as available&quot; without
              warranties of any kind, either express or implied. We do not warrant that the
              service will be uninterrupted, error-free, or that any data will be preserved.
              Since all data is stored in your browser&apos;s localStorage, clearing your browser
              data will permanently delete your resumes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">5. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, the service operator shall not be liable
              for any indirect, incidental, special, consequential, or punitive damages arising
              from your use of or inability to use this service, including loss of data, loss of
              employment opportunities, or any other losses.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">6. User Responsibilities</h2>
            <p>
              You are responsible for the accuracy and truthfulness of all content in your
              resume. You agree not to use this service to create misleading, fraudulent, or
              illegal documents.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the
              service after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">8. Contact</h2>
            <p>
              For questions about these terms, please visit{" "}
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
