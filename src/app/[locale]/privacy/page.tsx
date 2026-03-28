"use client";

import { useTranslations } from "next-intl";
import Footer from "@/components/Footer";
import SiteNav from "@/components/SiteNav";

export default function PrivacyPage() {
  const t = useTranslations("privacy");

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <SiteNav />

      <main className="flex-1 max-w-3xl mx-auto px-6 pt-24 pb-12">
        <h1 className="font-sans font-bold text-3xl text-foreground mb-2">
          {t("title")}
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          {t("lastUpdated")}
        </p>

        <div className="prose prose-sm text-muted-foreground space-y-6">
          <Section heading={t("s1h")} content={t("s1")} />
          <Section heading={t("s2h")} content={t("s2")} />
          <Section heading={t("s3h")} content={t("s3")} />
          <Section heading={t("s4h")} content={t("s4")} />

          <section>
            <h2 className="text-lg font-semibold text-foreground">{t("s5h")}</h2>
            <p>{t("s5intro")}</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              {(t.raw("s5items") as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">{t("s6h")}</h2>
            <p>{t("s6intro")}</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              {(t.raw("s6items") as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <Section heading={t("s7h")} content={t("s7")} />
          <Section heading={t("s8h")} content={t("s8")} />
          <Section heading={t("s9h")} content={t("s9")} />
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
