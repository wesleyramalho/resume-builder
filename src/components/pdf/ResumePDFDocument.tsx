import {
  Document,
  Font,
  Image,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { Resume } from "@/types/resume";
import { formatMonthYear } from "@/lib/utils";
import {
  getResumeStyle,
  hexWithAlpha,
  type ResumeStyle,
} from "@/lib/resumeTemplates";
import enMessages from "@/messages/en.json";
import ptBRMessages from "@/messages/pt-BR.json";

export const PDF_FONT = "Helvetica";

const messagesMap: Record<string, typeof enMessages> = {
  en: enMessages,
  "pt-BR": ptBRMessages,
};

function getT(locale: string) {
  const msgs = messagesMap[locale] ?? messagesMap.en;
  return (ns: string, key: string) => {
    const nsObj = msgs[ns as keyof typeof msgs] as Record<string, string>;
    return nsObj?.[key] ?? key;
  };
}

// Disable automatic hyphenation so words don't break mid-word
Font.registerHyphenationCallback((word) => [word]);

function buildStyles(tmpl: ResumeStyle) {
  const { accentColor: accent, sectionDivider: divider, headerBgColor } = tmpl;
  const hasBg = !!headerBgColor;
  const nameColor = hasBg ? "#ffffff" : accent;
  const headlineColor = hasBg ? "rgba(255,255,255,0.7)" : "#6b7280";
  const contactColor = hasBg ? "rgba(255,255,255,0.6)" : "#9ca3af";
  return StyleSheet.create({
    page: {
      fontFamily: PDF_FONT,
      fontSize: 9,
      color: "#1a1a1a",
      paddingHorizontal: 48,
      paddingVertical: 40,
      backgroundColor: "#ffffff",
    },
    header: {
      fontFamily: PDF_FONT,
      borderBottomWidth: hasBg ? 0 : 0.5,
      borderBottomColor: hexWithAlpha(accent, 0.25),
      paddingBottom: 10,
      marginBottom: 10,
      ...(hasBg
        ? {
            backgroundColor: headerBgColor,
            marginHorizontal: -48,
            marginTop: -40,
            paddingHorizontal: 48,
            paddingTop: 30,
            paddingBottom: 20,
          }
        : {}),
      ...(tmpl.photoPosition === "top-center"
        ? { alignItems: "center" as const }
        : {}),
    },
    name: {
      fontSize: 16,
      fontFamily: PDF_FONT,
      fontWeight: 700,
      textTransform: "uppercase",
      marginLeft: "-5px",
      color: nameColor,
      marginBottom: 8,
      ...(tmpl.photoPosition === "top-center"
        ? { textAlign: "center" as const }
        : {}),
    },
    headline: {
      fontSize: 8,
      fontFamily: PDF_FONT,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      color: headlineColor,
      marginTop: 2,
      marginBottom: 4,
      ...(tmpl.photoPosition === "top-center"
        ? { textAlign: "center" as const }
        : {}),
    },
    contactRow: {
      flexDirection: "row",
      fontFamily: PDF_FONT,
      flexWrap: "wrap",
      gap: 8,
      marginTop: 4,
      ...(tmpl.photoPosition === "top-center"
        ? { justifyContent: "center" as const }
        : {}),
    },
    contactText: {
      fontFamily: PDF_FONT,
      fontSize: 7.5,
      color: contactColor,
    },
    section: {
      fontFamily: PDF_FONT,
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 7,
      fontFamily: PDF_FONT,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      color: hexWithAlpha(accent, 0.4),
      borderBottomWidth: divider === "line" ? 0.5 : 0,
      borderBottomColor: hexWithAlpha(accent, 0.15),
      paddingBottom: 3,
      marginBottom: 6,
    },
    summaryText: {
      fontFamily: PDF_FONT,
      fontSize: 9,
      color: "#4b5563",
      lineHeight: 1.5,
    },
    expItem: {
      fontFamily: PDF_FONT,
      marginBottom: 8,
    },
    expHeader: {
      fontFamily: PDF_FONT,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    expCompany: {
      fontSize: 9,
      fontFamily: PDF_FONT,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      color: accent,
    },
    expTitle: {
      fontFamily: PDF_FONT,
      fontSize: 8,
      color: "#6b7280",
      marginTop: 1,
    },
    expDate: {
      fontFamily: PDF_FONT,
      fontSize: 7.5,
      color: "#9ca3af",
      textAlign: "right",
    },
    bullet: {
      fontFamily: PDF_FONT,
      flexDirection: "row",
      gap: 4,
      marginTop: 2,
    },
    bulletDot: {
      fontFamily: PDF_FONT,
      fontSize: 9,
      color: "#d1d5db",
      marginTop: 0.5,
    },
    bulletText: {
      fontFamily: PDF_FONT,
      fontSize: 8.5,
      color: "#374151",
      flex: 1,
      lineHeight: 1.4,
    },
    eduItem: {
      fontFamily: PDF_FONT,
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 6,
    },
    eduSchool: {
      fontFamily: PDF_FONT,
      fontSize: 9,
      fontWeight: 700,
      color: accent,
    },
    eduDegree: {
      fontFamily: PDF_FONT,
      fontSize: 8,
      color: "#6b7280",
      marginTop: 1,
    },
    skillsRow: {
      fontFamily: PDF_FONT,
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 4,
      marginTop: 2,
    },
    skillTag: {
      fontFamily: PDF_FONT,
      fontSize: 7.5,
      borderWidth: 0.5,
      borderColor: hexWithAlpha(accent, 0.2),
      color: "#6b7280",
      paddingHorizontal: 4,
      paddingVertical: 1.5,
    },
    skillCategory: {
      fontFamily: PDF_FONT,
      fontSize: 7.5,
      color: "#9ca3af",
      marginRight: 4,
      marginTop: 2,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    skillGroupRow: {
      fontFamily: PDF_FONT,
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 3,
    },
  });
}

interface Props {
  resume: Resume;
  locale?: string;
}

const DEFAULT_SECTION_ORDER = [
  "experience",
  "education",
  "skills",
  "projects",
  "summary",
];

type PDFStyles = ReturnType<typeof buildStyles>;
type RD = import("@/types/resume").ResumeData;

interface PDFSectionProps {
  data: RD;
  s: PDFStyles;
  localeTag: string;
  presentLabel: string;
  t: (ns: string, key: string) => string;
}

function SummarySection({ data, s, t }: PDFSectionProps) {
  if (!data.sections.summary || !data.summary) return null;
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{t("resume", "profile")}</Text>
      <Text style={s.summaryText}>{data.summary}</Text>
    </View>
  );
}

function ExperienceSection({ data, s, localeTag, presentLabel, t }: PDFSectionProps) {
  if (!data.sections.experience || data.experience.length === 0) return null;
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{t("resume", "professionalExperience")}</Text>
      {data.experience.map((exp) => (
        <View key={exp.id} style={s.expItem}>
          <View style={s.expHeader}>
            <View>
              <Text style={s.expCompany}>{exp.company}</Text>
              <Text style={s.expTitle}>
                {exp.title}
                {exp.location ? ` · ${exp.location}` : ""}
              </Text>
            </View>
            <Text style={s.expDate}>
              {formatMonthYear(exp.startDate, localeTag, presentLabel)} –{" "}
              {exp.current ? presentLabel : formatMonthYear(exp.endDate, localeTag, presentLabel)}
            </Text>
          </View>
          {exp.description
            ? exp.description
                .split("\n")
                .filter(Boolean)
                .map((line, i) => (
                  <View key={i} style={s.bullet}>
                    <Text style={s.bulletDot}>•</Text>
                    <Text style={s.bulletText}>{line}</Text>
                  </View>
                ))
            : null}
        </View>
      ))}
    </View>
  );
}

function EducationSection({ data, s, localeTag, presentLabel, t }: PDFSectionProps) {
  if (!data.sections.education || data.education.length === 0) return null;
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{t("resume", "education")}</Text>
      {data.education.map((edu) => (
        <View key={edu.id} style={{ marginBottom: 6 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <View>
              <Text style={s.eduSchool}>{edu.school}</Text>
              <Text style={s.eduDegree}>
                {[edu.degree, edu.field].filter(Boolean).join(" · ")}
                {edu.gpa ? ` · GPA ${edu.gpa}` : ""}
              </Text>
            </View>
            <Text style={s.expDate}>
              {formatMonthYear(edu.startDate, localeTag, presentLabel)} – {formatMonthYear(edu.endDate, localeTag, presentLabel)}
            </Text>
          </View>
          {edu.highlights ? (
            <Text style={[s.bulletText, { marginTop: 2, fontStyle: "italic" }]}>
              {edu.highlights}
            </Text>
          ) : null}
        </View>
      ))}
    </View>
  );
}

function SkillsSection({ data, s, t }: PDFSectionProps) {
  if (!data.sections.skills || data.skillGroups.length === 0) return null;
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{t("resume", "technicalSkills")}</Text>
      {data.skillGroups.map((group) => (
        <View key={group.id} style={s.skillGroupRow}>
          {group.category ? (
            <Text style={s.skillCategory}>{group.category}</Text>
          ) : null}
          <View style={s.skillsRow}>
            {group.skills.map((skill, i) => (
              <Text key={i} style={s.skillTag}>
                {skill}
              </Text>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

function ProjectsSection({ data, s, localeTag, presentLabel, t }: PDFSectionProps) {
  if (!data.sections.projects || data.projects.length === 0) return null;
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{t("resume", "projects")}</Text>
      {data.projects.map((proj, i) => (
        <View key={proj.id} style={[s.expItem, i > 0 ? { marginTop: 8 } : {}]}>
          <View style={s.expHeader}>
            <View>
              <Text style={s.expCompany}>{proj.name}</Text>
              {proj.technologies.length > 0 ? (
                <Text style={s.expTitle}>{proj.technologies.join(" · ")}</Text>
              ) : null}
              {proj.url ? (
                <Text style={[s.expTitle, { color: "#9ca3af" }]}>
                  {proj.url}
                </Text>
              ) : null}
            </View>
            <Text style={s.expDate}>
              {formatMonthYear(proj.startDate, localeTag, presentLabel)} –{" "}
              {formatMonthYear(proj.endDate, localeTag, presentLabel)}
            </Text>
          </View>
          {proj.description ? (
            <Text style={s.bulletText}>{proj.description}</Text>
          ) : null}
        </View>
      ))}
    </View>
  );
}

export default function ResumePDFDocument({ resume, locale = "en" }: Props) {
  const { data } = resume;
  const tmpl = getResumeStyle(resume.templateId);
  const s = buildStyles(tmpl);
  const t = getT(locale);
  const localeTag = locale === "pt-BR" ? "pt-BR" : "en-US";
  const presentLabel = t("resume", "present");
  const order = data.sectionOrder?.length
    ? data.sectionOrder
    : DEFAULT_SECTION_ORDER;
  const contactParts = [
    data.contact.location,
    data.contact.email,
    data.contact.phone,
    data.contact.linkedin,
    data.contact.website,
  ].filter(Boolean);

  const hasSidebar = !!tmpl.sidebarColor;

  const headerBlock = !hasSidebar ? (
    <View
      style={[
        s.header,
        {
          flexDirection: tmpl.photoPosition === "top-center" ? "column" : "row",
          alignItems:
            tmpl.photoPosition === "top-center" ? "center" : "flex-start",
        },
      ]}
    >
      {data.photo && tmpl.photoPosition !== "top-right" ? (
        <Image
          src={data.photo}
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            ...(tmpl.photoPosition === "top-center"
              ? { marginBottom: 10 }
              : { marginRight: 10 }),
            ...(tmpl.headerBgColor
              ? { borderWidth: 2, borderColor: "rgba(255,255,255,0.3)" }
              : {}),
          }}
        />
      ) : null}
      <View
        style={{
          ...(tmpl.photoPosition === "top-center"
            ? { width: "100%" }
            : { flex: 1 }),
        }}
      >
        <Text style={s.name}>{data.fullName}</Text>
        {data.headline ? <Text style={s.headline}>{data.headline}</Text> : null}
        {contactParts.length > 0 && (
          <View style={s.contactRow}>
            {contactParts.map((c, i) => (
              <Text key={i} style={s.contactText}>
                {c}
              </Text>
            ))}
          </View>
        )}
      </View>
      {data.photo && tmpl.photoPosition === "top-right" ? (
        <Image
          src={data.photo}
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            marginLeft: 10,
            ...(tmpl.headerBgColor
              ? { borderWidth: 2, borderColor: "rgba(255,255,255,0.3)" }
              : {}),
          }}
        />
      ) : null}
    </View>
  ) : null;

  const sectionProps = { data, s, localeTag, presentLabel, t };

  const sectionsBlock = order.map((sectionId) => {
    if (sectionId === "summary")
      return <SummarySection key={sectionId} {...sectionProps} />;
    if (sectionId === "experience")
      return <ExperienceSection key={sectionId} {...sectionProps} />;
    if (sectionId === "education")
      return <EducationSection key={sectionId} {...sectionProps} />;
    if (sectionId === "skills" && !hasSidebar)
      return <SkillsSection key={sectionId} {...sectionProps} />;
    if (sectionId === "projects")
      return <ProjectsSection key={sectionId} {...sectionProps} />;
    return null;
  });

  if (hasSidebar) {
    return (
      <Document>
        <Page
          size="A4"
          style={[
            s.page,
            { paddingHorizontal: 0, paddingVertical: 0, flexDirection: "row" },
          ]}
        >
          {/* Sidebar */}
          <View
            style={{
              width: "30%",
              backgroundColor: tmpl.sidebarColor,
              padding: 20,
              alignItems: "center",
            }}
          >
            {data.photo ? (
              <Image
                src={data.photo}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  marginBottom: 8,
                  borderWidth: 2,
                  borderColor: "rgba(255,255,255,0.3)",
                }}
              />
            ) : null}
            <Text
              style={{
                fontFamily: PDF_FONT,
                fontSize: 10,
                fontWeight: 700,
                color: "#ffffff",
                textTransform: "uppercase",
                letterSpacing: 1,
                textAlign: "center",
              }}
            >
              {data.fullName}
            </Text>
            <Text
              style={{
                fontFamily: PDF_FONT,
                fontSize: 7,
                color: "rgba(255,255,255,0.7)",
                textTransform: "uppercase",
                letterSpacing: 0.5,
                marginTop: 2,
                textAlign: "center",
              }}
            >
              {data.headline}
            </Text>
            <View style={{ marginTop: 10, gap: 2 }}>
              {[
                data.contact.location,
                data.contact.email,
                data.contact.phone,
                data.contact.linkedin,
                data.contact.website,
              ]
                .filter(Boolean)
                .map((item, i) => (
                  <Text
                    key={i}
                    style={{
                      fontFamily: PDF_FONT,
                      fontSize: 6.5,
                      color: "rgba(255,255,255,0.6)",
                      textAlign: "center",
                    }}
                  >
                    {item}
                  </Text>
                ))}
            </View>
            {data.skillGroups.length > 0 && (
              <View style={{ marginTop: 12, width: "100%" }}>
                <Text
                  style={{
                    fontFamily: PDF_FONT,
                    fontSize: 6,
                    color: "rgba(255,255,255,0.5)",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    marginBottom: 4,
                  }}
                >
                  {t("resume", "skills")}
                </Text>
                {data.skillGroups.map((group, gi) => (
                  <View key={gi} style={{ marginBottom: 4, width: "100%" }}>
                    {group.category ? (
                      <Text
                        style={{
                          fontFamily: PDF_FONT,
                          fontSize: 5.5,
                          color: "rgba(255,255,255,0.4)",
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                          marginBottom: 1,
                        }}
                      >
                        {group.category}
                      </Text>
                    ) : null}
                    {group.skills.map((skill, i) => (
                      <Text
                        key={i}
                        style={{
                          fontFamily: PDF_FONT,
                          fontSize: 6.5,
                          color: "rgba(255,255,255,0.8)",
                          marginBottom: 2,
                        }}
                      >
                        {skill}
                      </Text>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </View>
          {/* Main content */}
          <View style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 40 }}>
            {sectionsBlock}
          </View>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {headerBlock}
        {sectionsBlock}
      </Page>
    </Document>
  );
}
