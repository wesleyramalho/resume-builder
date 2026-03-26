import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border px-6 md:px-12 py-4">
        <Link
          href="/"
          className="font-sans text-sm font-bold uppercase tracking-widest text-foreground"
        >
          MyPDFCV
        </Link>
      </nav>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-12">
        <h1 className="font-sans font-bold text-3xl text-foreground mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Last updated: March 26, 2026
        </p>

        <div className="prose prose-sm text-muted-foreground space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-foreground">
              1. Data Storage
            </h2>
            <p>
              MyPDFCV is a client-side application. All resume data you create
              is stored exclusively in your browser&apos;s localStorage. We do
              not collect, transmit, or store your resume data on any server.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              2. LinkedIn OAuth
            </h2>
            <p>
              If you choose to sign in with LinkedIn, we access only the
              following information through LinkedIn&apos;s OAuth API: your
              name, email address, headline, location, and profile photo. This
              data is used solely to pre-fill your resume and is stored only in
              your browser&apos;s localStorage. We do not retain your LinkedIn
              access token beyond the active session.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              3. AI Processing
            </h2>
            <p>
              Our AI-powered text improvement feature runs entirely in your
              browser using open-source models (Xenova/flan-t5-small) via
              WebAssembly. No resume content is sent to external servers for AI
              processing. The AI model is downloaded once and cached locally in
              your browser.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              4. Document Import
            </h2>
            <p>
              When you import a PDF or DOCX file, the document is processed
              entirely in your browser. We do not upload, transmit, or store
              your uploaded documents on any server. The file is read into
              memory, text is extracted to populate your resume fields, and the
              original file data is immediately discarded. No copy of your
              uploaded document is retained.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              5. GDPR Compliance (EU/EEA Users)
            </h2>
            <p>
              If you are located in the European Union or European Economic
              Area, the following applies under the General Data Protection
              Regulation (GDPR):
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <strong className="text-foreground">Data controller:</strong>{" "}
                Wesley Ramalho. For inquiries, visit{" "}
                <a
                  href="https://www.wesleyramalho.com/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline"
                >
                  www.wesleyramalho.com/contact
                </a>
                .
              </li>
              <li>
                <strong className="text-foreground">Legal basis:</strong>{" "}
                Consent. You choose to use the service and provide information
                voluntarily.
              </li>
              <li>
                <strong className="text-foreground">Data processed:</strong>{" "}
                Only the resume content you type or import. All data is stored
                in your browser&apos;s localStorage and is not transmitted to
                our servers.
              </li>
              <li>
                <strong className="text-foreground">
                  No cross-border transfers:
                </strong>{" "}
                Your personal data is not transferred to any server. It remains
                in your browser. The only exception is the optional LinkedIn
                OAuth flow, which is governed by LinkedIn&apos;s own privacy
                policy.
              </li>
              <li>
                <strong className="text-foreground">Your rights:</strong> You
                have the right to access, rectify, erase, restrict processing,
                object to processing, and port your data. Since all data is
                stored locally in your browser:
                <ul className="list-disc pl-5 space-y-1 mt-1">
                  <li>
                    <strong className="text-foreground">
                      Access &amp; portability:
                    </strong>{" "}
                    Export your resume as PDF at any time.
                  </li>
                  <li>
                    <strong className="text-foreground">Rectification:</strong>{" "}
                    Edit your resume directly in the editor.
                  </li>
                  <li>
                    <strong className="text-foreground">Erasure:</strong> Delete
                    individual resumes from the dashboard, or clear all data by
                    clearing your browser&apos;s localStorage.
                  </li>
                </ul>
              </li>
              <li>
                <strong className="text-foreground">
                  No automated decision-making:
                </strong>{" "}
                We do not use your data for automated decision-making or
                profiling. The AI text improvement feature generates suggestions
                that you manually review and accept or reject.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              6. CCPA Compliance (California Users)
            </h2>
            <p>
              If you are a California resident, the following applies under the
              California Consumer Privacy Act (CCPA):
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <strong className="text-foreground">
                  We do not sell personal information.
                </strong>{" "}
                We do not share personal information with third parties for
                monetary or other valuable consideration.
              </li>
              <li>
                <strong className="text-foreground">
                  We do not collect personal information on our servers.
                </strong>{" "}
                All resume data is stored in your browser&apos;s localStorage
                only.
              </li>
              <li>
                <strong className="text-foreground">Right to delete:</strong>{" "}
                You can delete all data at any time by clearing your
                browser&apos;s localStorage or removing individual resumes from
                the dashboard.
              </li>
              <li>
                <strong className="text-foreground">Right to know:</strong> The
                categories of information processed are limited to resume
                content you voluntarily create (name, contact details, work
                history, education, skills), stored locally only.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              7. Children&apos;s Privacy
            </h2>
            <p>
              This service is not directed at children under 13 years of age (as
              defined by the U.S. Children&apos;s Online Privacy Protection Act,
              COPPA) or under 16 years of age (as defined by the GDPR). We do
              not knowingly collect personal information from children. Since
              all data is stored locally in the user&apos;s browser and not
              transmitted to us, we have no means to identify the age of our
              users.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              8. Cookies &amp; Tracking
            </h2>
            <p>
              We do not use tracking cookies, analytics services, or any
              third-party tracking tools. We use localStorage only for saving
              your resume data and theme preference. See our{" "}
              <Link href="/cookies" className="text-foreground underline">
                Cookie Policy
              </Link>{" "}
              for more details.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              9. Contact
            </h2>
            <p>
              For privacy-related inquiries, please visit{" "}
              <a
                href="https://www.wesleyramalho.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline"
              >
                www.wesleyramalho.com/contact
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
