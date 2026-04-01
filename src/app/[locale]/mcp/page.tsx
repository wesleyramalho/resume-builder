"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Copy, Check } from "lucide-react";
import Footer from "@/components/Footer";
import SiteNav from "@/components/SiteNav";

const CONFIG_JSON = `{
  "mcpServers": {
    "mypdfcv": {
      "command": "npx",
      "args": ["-y", "@mypdfcv/mcp-server"]
    }
  }
}`;

const CLAUDE_CODE_CMD = "claude mcp add mypdfcv -- npx -y @mypdfcv/mcp-server";

export default function McpPage() {
  const t = useTranslations("mcp");

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <SiteNav />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-12">
        <h1 className="font-sans font-bold text-3xl text-foreground mb-2">
          {t("title")}
        </h1>
        <p className="text-sm text-muted-foreground mb-8">{t("subtitle")}</p>

        <div className="prose prose-sm max-w-none min-w-0 text-muted-foreground space-y-6">
          <Section heading={t("s1h")} content={t("s1")} />

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              {t("s2h")}
            </h2>
            <p>{t("s2intro")}</p>

            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {t("s2claudeDesktop")}
                </h3>
                <p className="text-xs text-muted-foreground mb-1">
                  {t("s2claudeDesktopDesc")}
                </p>
                <CodeBlock code={CONFIG_JSON} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {t("s2cursor")}
                </h3>
                <p className="text-xs text-muted-foreground mb-1">
                  {t("s2cursorDesc")}
                </p>
                <CodeBlock code={CONFIG_JSON} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {t("s2claudeCode")}
                </h3>
                <p className="text-xs text-muted-foreground mb-1">
                  {t("s2claudeCodeDesc")}
                </p>
                <CodeBlock code={CLAUDE_CODE_CMD} />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              {t("s3h")}
            </h2>
            <p>{t("s3intro")}</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              {(t.raw("s3items") as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <Section heading={t("s4h")} content={t("s4")} />
          <Section heading={t("s5h")} content={t("s5")} />

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              {t("s6h")}
            </h2>
            <p>{t("s6intro")}</p>
            <blockquote className="mt-2 border-l-2 border-foreground/20 pl-4 italic">
              &ldquo;{t("s6example")}&rdquo;
            </blockquote>
          </section>

          <Section heading={t("s7h")} content={t("s7")} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Section({ heading, content }: { heading: string; content: string }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-foreground">{heading}</h2>
      <p>{content}</p>
    </section>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative mt-1">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-foreground/10 hover:bg-foreground/20 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        aria-label="Copy to clipboard"
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
      <pre className="overflow-x-auto rounded-md bg-foreground/5 p-3 pr-10 text-xs text-foreground">
        <code>{code}</code>
      </pre>
    </div>
  );
}
