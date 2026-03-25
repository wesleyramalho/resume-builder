import Image from "next/image";
import Link from "next/link";

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 md:px-12 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <a
          href="https://wesleyramalho.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <Image
            src="/pixel-me.svg"
            alt="Wesley Ramalho"
            width={20}
            height={20}
            className="rounded bg-black"
          />
          Created by wesleyramalho.com
        </a>

        <nav className="flex flex-wrap items-center gap-4">
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="max-w-7xl mx-auto mt-4">
        <p className="text-[10px] text-muted-foreground/60 text-center md:text-left">
          &copy; {new Date().getFullYear()} MyPDFCV. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
