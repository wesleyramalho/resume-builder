import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import { Globe } from "lucide-react";
import GitHubIcon from "@/components/icons/GitHubIcon";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border px-6 md:px-12 py-4">
        <Link href="/" className="font-mono text-sm font-bold uppercase tracking-widest text-foreground">
          Build My Resume
        </Link>
      </nav>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-12">
        <h1 className="font-sans font-bold text-3xl text-foreground mb-2">Contact</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Get in touch with the creator of Build My Resume.
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
                href="https://linkedin.com/in/wesleyramalho"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <LinkedInIcon className="w-4 h-4 shrink-0" />
                linkedin.com/in/wesleyramalho
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
