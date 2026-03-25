import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Resume } from "@/types/resume";
import { formatMonthYear } from "@/lib/utils";
export const PDF_FONT = "Helvetica";

const styles = StyleSheet.create({
  page: {
    fontFamily: PDF_FONT,
    fontSize: 9,
    color: "#1a1a1a",
    paddingHorizontal: 48,
    paddingVertical: 40,
    backgroundColor: "#ffffff",
  },
  // Header
  header: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#d1d5db",
    paddingBottom: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontFamily: PDF_FONT,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: "#111827",
  },
  headline: {
    fontSize: 8,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: "#6b7280",
    marginTop: 2,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
  },
  contactText: {
    fontSize: 7.5,
    color: "#9ca3af",
  },
  // Section
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 7,
    fontFamily: PDF_FONT,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: "#9ca3af",
    borderBottomWidth: 0.5,
    borderBottomColor: "#f3f4f6",
    paddingBottom: 3,
    marginBottom: 6,
  },
  // Summary
  summaryText: {
    fontSize: 9,
    color: "#4b5563",
    lineHeight: 1.5,
  },
  // Experience
  expItem: {
    marginBottom: 8,
  },
  expHeader: {
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
    color: "#111827",
  },
  expTitle: {
    fontSize: 8,
    color: "#6b7280",
    marginTop: 1,
  },
  expDate: {
    fontSize: 7.5,
    color: "#9ca3af",
    textAlign: "right",
  },
  bullet: {
    flexDirection: "row",
    gap: 4,
    marginTop: 2,
  },
  bulletDot: {
    fontSize: 9,
    color: "#d1d5db",
    marginTop: 0.5,
  },
  bulletText: {
    fontSize: 8.5,
    color: "#374151",
    flex: 1,
    lineHeight: 1.4,
  },
  // Education
  eduItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  eduSchool: {
    fontSize: 9,
    fontFamily: PDF_FONT,
    fontWeight: 700,
    color: "#111827",
  },
  eduDegree: {
    fontSize: 8,
    color: "#6b7280",
    marginTop: 1,
  },
  // Skills
  skillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 2,
  },
  skillTag: {
    fontSize: 7.5,
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    color: "#6b7280",
    paddingHorizontal: 4,
    paddingVertical: 1.5,
  },
  skillCategory: {
    fontSize: 7.5,
    color: "#9ca3af",
    marginRight: 4,
    marginTop: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  skillGroupRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 3,
  },
});

interface Props {
  resume: Resume;
}

const DEFAULT_SECTION_ORDER = [
  "experience",
  "education",
  "skills",
  "projects",
  "summary",
];

function SummarySection({
  data,
}: {
  data: import("@/types/resume").ResumeData;
}) {
  if (!data.sections.summary || !data.summary) return null;
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Profile</Text>
      <Text style={styles.summaryText}>{data.summary}</Text>
    </View>
  );
}

function ExperienceSection({
  data,
}: {
  data: import("@/types/resume").ResumeData;
}) {
  if (!data.sections.experience || data.experience.length === 0) return null;
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Professional Experience</Text>
      {data.experience.map((exp) => (
        <View key={exp.id} style={styles.expItem}>
          <View style={styles.expHeader}>
            <View>
              <Text style={styles.expCompany}>{exp.company}</Text>
              <Text style={styles.expTitle}>
                {exp.title}
                {exp.location ? ` · ${exp.location}` : ""}
              </Text>
            </View>
            <Text style={styles.expDate}>
              {formatMonthYear(exp.startDate)} –{" "}
              {exp.current ? "Present" : formatMonthYear(exp.endDate)}
            </Text>
          </View>
          {exp.description
            ? exp.description
                .split("\n")
                .filter(Boolean)
                .map((line, i) => (
                  <View key={i} style={styles.bullet}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{line}</Text>
                  </View>
                ))
            : null}
        </View>
      ))}
    </View>
  );
}

function EducationSection({
  data,
}: {
  data: import("@/types/resume").ResumeData;
}) {
  if (!data.sections.education || data.education.length === 0) return null;
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Education</Text>
      {data.education.map((edu) => (
        <View key={edu.id} style={styles.eduItem}>
          <View>
            <Text style={styles.eduSchool}>{edu.school}</Text>
            <Text style={styles.eduDegree}>
              {[edu.degree, edu.field].filter(Boolean).join(" · ")}
              {edu.gpa ? ` · GPA ${edu.gpa}` : ""}
            </Text>
          </View>
          <Text style={styles.expDate}>
            {formatMonthYear(edu.startDate)} – {formatMonthYear(edu.endDate)}
          </Text>
        </View>
      ))}
    </View>
  );
}

function SkillsSection({
  data,
}: {
  data: import("@/types/resume").ResumeData;
}) {
  if (!data.sections.skills || data.skillGroups.length === 0) return null;
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Technical Skills</Text>
      {data.skillGroups.map((group) => (
        <View key={group.id} style={styles.skillGroupRow}>
          {group.category ? (
            <Text style={styles.skillCategory}>{group.category}</Text>
          ) : null}
          <View style={styles.skillsRow}>
            {group.skills.map((skill, i) => (
              <Text key={i} style={styles.skillTag}>
                {skill}
              </Text>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

function ProjectsSection({
  data,
}: {
  data: import("@/types/resume").ResumeData;
}) {
  if (!data.sections.projects || data.projects.length === 0) return null;
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Projects</Text>
      {data.projects.map((proj) => (
        <View key={proj.id} style={styles.expItem}>
          <View style={styles.expHeader}>
            <View>
              <Text style={styles.expCompany}>{proj.name}</Text>
              {proj.technologies.length > 0 ? (
                <Text style={styles.expTitle}>
                  {proj.technologies.join(" · ")}
                </Text>
              ) : null}
            </View>
            <Text style={styles.expDate}>
              {formatMonthYear(proj.startDate)} –{" "}
              {formatMonthYear(proj.endDate)}
            </Text>
          </View>
          {proj.description ? (
            <Text style={styles.bulletText}>{proj.description}</Text>
          ) : null}
        </View>
      ))}
    </View>
  );
}

export default function ResumePDFDocument({ resume }: Props) {
  const { data } = resume;
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

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header — always first */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.fullName}</Text>
          {data.headline ? (
            <Text style={styles.headline}>{data.headline}</Text>
          ) : null}
          {contactParts.length > 0 && (
            <View style={styles.contactRow}>
              {contactParts.map((c, i) => (
                <Text key={i} style={styles.contactText}>
                  {c}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Sections in user-defined order */}
        {order.map((sectionId) => {
          if (sectionId === "summary")
            return <SummarySection key={sectionId} data={data} />;
          if (sectionId === "experience")
            return <ExperienceSection key={sectionId} data={data} />;
          if (sectionId === "education")
            return <EducationSection key={sectionId} data={data} />;
          if (sectionId === "skills")
            return <SkillsSection key={sectionId} data={data} />;
          if (sectionId === "projects")
            return <ProjectsSection key={sectionId} data={data} />;
          return null;
        })}
      </Page>
    </Document>
  );
}
