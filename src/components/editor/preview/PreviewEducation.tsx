import { EducationEntry } from "@/types/resume";
import { formatMonthYear } from "@/lib/utils";
import { hexWithAlpha, type ResumeStyle } from "@/lib/resumeTemplates";

interface Props {
  education: EducationEntry[];
  style: ResumeStyle;
}

export default function PreviewEducation({ education, style: tmpl }: Props) {
  if (education.length === 0) return null;

  return (
    <div style={{ marginBottom: "10pt" }}>
      <h2
        style={{
          fontSize: "7pt",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "1.5pt",
          color: hexWithAlpha(tmpl.accentColor, 0.4),
          borderBottom: tmpl.sectionDivider === "line" ? `0.5pt solid ${hexWithAlpha(tmpl.accentColor, 0.15)}` : "none",
          paddingBottom: "3pt",
          marginBottom: "6pt",
        }}
      >
        Education
      </h2>
      {education.map((edu) => (
        <div
          key={edu.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "6pt",
          }}
        >
          <div>
            <p style={{ fontSize: "9pt", fontWeight: 700, color: tmpl.accentColor }}>
              {edu.school}
            </p>
            <p style={{ fontSize: "8pt", color: "#6b7280", marginTop: "1pt" }}>
              {[edu.degree, edu.field].filter(Boolean).join(" · ")}
              {edu.gpa ? ` · GPA ${edu.gpa}` : ""}
            </p>
          </div>
          <span
            style={{
              fontSize: "7.5pt",
              color: "#9ca3af",
              textAlign: "right",
              whiteSpace: "nowrap",
            }}
          >
            {formatMonthYear(edu.startDate)} – {formatMonthYear(edu.endDate)}
          </span>
        </div>
      ))}
    </div>
  );
}
