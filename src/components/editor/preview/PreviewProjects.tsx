import { ProjectEntry } from "@/types/resume";
import { formatMonthYear } from "@/lib/utils";
import { hexWithAlpha, type ResumeStyle } from "@/lib/resumeTemplates";

interface Props {
  projects: ProjectEntry[];
  style: ResumeStyle;
}

export default function PreviewProjects({ projects, style: tmpl }: Props) {
  if (projects.length === 0) return null;

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
        Projects
      </h2>
      {projects.map((proj) => (
        <div key={proj.id} style={{ marginBottom: "8pt" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p
                style={{
                  fontSize: "9pt",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.5pt",
                  color: tmpl.accentColor,
                }}
              >
                {proj.name}
              </p>
              {proj.technologies.length > 0 && (
                <p style={{ fontSize: "8pt", color: "#6b7280", marginTop: "1pt" }}>
                  {proj.technologies.join(" · ")}
                </p>
              )}
              {proj.url && (
                <p style={{ fontSize: "7.5pt", color: "#9ca3af", marginTop: "1pt" }}>
                  {proj.url}
                </p>
              )}
            </div>
            <span
              style={{
                fontSize: "7.5pt",
                color: "#9ca3af",
                textAlign: "right",
                whiteSpace: "nowrap",
              }}
            >
              {formatMonthYear(proj.startDate)} – {formatMonthYear(proj.endDate)}
            </span>
          </div>
          {proj.description && (
            <p style={{ fontSize: "8.5pt", color: "#374151", marginTop: "2pt", lineHeight: 1.4 }}>
              {proj.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
