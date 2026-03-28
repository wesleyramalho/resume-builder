"use client";

import { useTranslations } from "next-intl";
import Footer from "@/components/Footer";
import SiteNav from "@/components/SiteNav";

export default function CookiesPage() {
  const t = useTranslations("cookies");

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
          <section>
            <h2 className="text-lg font-semibold text-foreground">{t("s1h")}</h2>
            <p>{t("s1intro")}</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              {(t.raw("s1items") as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mt-2">{t("s1note")}</p>
          </section>

          <Section heading={t("s2h")} content={t("s2")} />

          <section>
            <h2 className="text-lg font-semibold text-foreground">{t("s3h")}</h2>
            <p>{t("s3intro")}</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              {(t.raw("s3items") as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mt-2">{t("s3note")}</p>
          </section>

          <Section heading={t("s4h")} content={t("s4")} />
          <Section heading={t("s5h")} content={t("s5")} />
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
