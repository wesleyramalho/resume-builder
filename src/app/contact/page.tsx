import Image from "next/image";
import Footer from "@/components/Footer";
import SiteNav from "@/components/SiteNav";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import { Globe } from "lucide-react";
import GitHubIcon from "@/components/icons/GitHubIcon";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <SiteNav />

      <main className="flex-1 max-w-3xl mx-auto px-6 pt-24 pb-12">
        <h1 className="font-sans font-bold text-3xl text-foreground mb-2">Contact</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Get in touch with the creator of MyPDFCV.
        </p>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/pixel-me.svg"
                alt="Wesley Ramalho"
                width={40}
                height={40}
                className="rounded-lg bg-black"
              />
              <h2 className="font-sans font-semibold text-lg text-foreground">Wesley Ramalho</h2>
            </div>

            <div className="space-y-3">
              <a
                href="https://wesleyramalho.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Globe className="w-4 h-4 shrink-0" />
                wesleyramalho.com
              </a>
              <a
                href="https://github.com/wesleyramalho"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <GitHubIcon className="w-4 h-4 shrink-0" />
                github.com/wesleyramalho
              </a>
              <a
                href="https://www.linkedin.com/in/wesley-ramalho-245bb5b1/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <LinkedInIcon className="w-4 h-4 shrink-0" />
                Linkedin - Wesley Ramalho
              </a>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-sans font-semibold text-lg text-foreground mb-2">General Inquiries</h2>
            <p className="text-sm text-muted-foreground">
              For questions, feedback, or support, please reach out via{" "}
              <a
                href="https://www.wesleyramalho.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline"
              >
                www.wesleyramalho.com/contact
              </a>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
