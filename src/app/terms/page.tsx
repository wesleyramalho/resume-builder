import Footer from "@/components/Footer";
import SiteNav from "@/components/SiteNav";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <SiteNav />

      <main className="flex-1 max-w-3xl mx-auto px-6 pt-24 pb-12">
        <h1 className="font-sans font-bold text-3xl text-foreground mb-2">
          Terms of Service
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Last updated: March 25, 2026
        </p>

        <div className="prose prose-sm text-muted-foreground space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-foreground">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using MyPDFCV, you agree to be bound by these
              Terms of Service. If you do not agree, please do not use the
              service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              2. Service Description
            </h2>
            <p>
              MyPDFCV is a free, client-side resume builder tool. All resume
              data is stored locally in your browser. We do not provide hosting,
              storage, or backup services for your resume data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              3. AI-Powered Features
            </h2>
            <p>
              This application includes an optional AI text improvement feature
              powered by open-source models (Xenova/flan-t5-small, licensed
              under Apache 2.0). Important information about this feature:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                All AI processing runs entirely in your browser via WebAssembly.
                No resume content is sent to any external server for AI
                processing.
              </li>
              <li>
                AI-generated suggestions are provided &quot;as is&quot; without
                any warranty of accuracy, completeness, or fitness for a
                particular purpose.
              </li>
              <li>
                Suggestions may contain inaccuracies, grammatical errors, or
                content that does not accurately represent your experience. You
                must review and edit all AI-generated content before using it.
              </li>
              <li>
                You are solely responsible for the final content of your resume,
                including any content derived from AI suggestions.
              </li>
              <li>
                The service operator assumes no liability for any consequences
                arising from the use of AI-generated content, including but not
                limited to inaccurate representations in job applications.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              4. Document Import Feature
            </h2>
            <p>
              MyPDFCV allows you to import existing resumes from PDF and DOCX
              files. Important information about this feature:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                All file processing happens entirely in your browser. Uploaded
                files are never transmitted to any server.
              </li>
              <li>
                Files are read into memory, text is extracted to populate resume
                fields, and then the original file data is discarded. We do not
                store your uploaded documents.
              </li>
              <li>
                The accuracy of text extraction depends on the file format and
                structure. Some formatting, images, or non-standard layouts may
                not be extracted correctly.
              </li>
              <li>
                You are responsible for reviewing and correcting all imported
                content.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              5. Open-Source Software
            </h2>
            <p>
              MyPDFCV is built with open-source software. The following key
              libraries are used under their respective licenses:
            </p>
            {/* Desktop: table */}
            <div className="mt-3 hidden sm:block overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 text-foreground font-semibold">
                      Library
                    </th>
                    <th className="text-left py-2 pr-4 text-foreground font-semibold">
                      License
                    </th>
                    <th className="text-left py-2 text-foreground font-semibold">
                      Purpose
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4">Xenova/flan-t5-small</td>
                    <td className="py-2 pr-4">Apache 2.0</td>
                    <td className="py-2">AI text improvement model</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4">@huggingface/transformers</td>
                    <td className="py-2 pr-4">Apache 2.0</td>
                    <td className="py-2">AI model runtime (WebAssembly)</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4">pdfjs-dist (Mozilla)</td>
                    <td className="py-2 pr-4">Apache 2.0</td>
                    <td className="py-2">PDF text extraction</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4">mammoth.js</td>
                    <td className="py-2 pr-4">BSD-2-Clause</td>
                    <td className="py-2">DOCX text extraction</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4">@react-pdf/renderer</td>
                    <td className="py-2 pr-4">MIT</td>
                    <td className="py-2">PDF generation</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile: stacked cards */}
            <div className="mt-3 sm:hidden space-y-3">
              {[
                { library: "Xenova/flan-t5-small", license: "Apache 2.0", purpose: "AI text improvement model" },
                { library: "@huggingface/transformers", license: "Apache 2.0", purpose: "AI model runtime (WebAssembly)" },
                { library: "pdfjs-dist (Mozilla)", license: "Apache 2.0", purpose: "PDF text extraction" },
                { library: "mammoth.js", license: "BSD-2-Clause", purpose: "DOCX text extraction" },
                { library: "@react-pdf/renderer", license: "MIT", purpose: "PDF generation" },
              ].map((item) => (
                <div key={item.library} className="text-sm border border-border/50 rounded-md p-3 space-y-1">
                  <p className="text-foreground font-semibold">{item.library}</p>
                  <p><span className="text-foreground/70">License:</span> {item.license}</p>
                  <p><span className="text-foreground/70">Purpose:</span> {item.purpose}</p>
                </div>
              ))}
            </div>
            <p className="mt-3">
              Full license texts are available in each library&apos;s respective
              repository. Use of these libraries does not imply endorsement by
              their creators or maintainers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              6. No Warranty
            </h2>
            <p>
              This service is provided &quot;as is&quot; and &quot;as
              available&quot; without warranties of any kind, either express or
              implied. We do not warrant that the service will be uninterrupted,
              error-free, or that any data will be preserved. Since all data is
              stored in your browser&apos;s localStorage, clearing your browser
              data will permanently delete your resumes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              7. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, the service operator shall
              not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising from your use of or
              inability to use this service, including loss of data, loss of
              employment opportunities, or any other losses.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              8. User Responsibilities
            </h2>
            <p>
              You are responsible for the accuracy and truthfulness of all
              content in your resume. You agree not to use this service to
              create misleading, fraudulent, or illegal documents.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              9. Governing Law
            </h2>
            <p>
              This service is provided from the United States. Any disputes
              arising from these terms shall be governed by the laws of the
              State of California, United States, without regard to conflict of
              law principles. If you are located in the European Union or
              European Economic Area, nothing in these terms affects your rights
              under the General Data Protection Regulation (GDPR) or other
              applicable local laws.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              10. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these terms at any time. Continued
              use of the service after changes constitutes acceptance of the
              updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              11. Contact
            </h2>
            <p>
              For questions about these terms, please visit{" "}
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
