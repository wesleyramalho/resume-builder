import { ResumeData } from "@/types/resume";
import { getResumeStyle, hexWithAlpha } from "@/lib/resumeTemplates";

interface Props {
  data: ResumeData;
  templateId?: string;
}

export default function ResumeThumbnail({ data, templateId }: Props) {
  const style = getResumeStyle(templateId);
  const { accentColor, sectionDivider, sidebarColor, headerBgColor, headerLayout } = style;
  const dividerBorder = sectionDivider === "line" ? `1px solid ${hexWithAlpha(accentColor, 0.15)}` : "none";
  const isCentered = headerLayout === "centered";

  // Content block shared by both sidebar and standard layouts
  const contentBlock = (
    <>
      {/* Header — only for non-sidebar layouts */}
      {!sidebarColor && (
        <div
          style={{
            borderBottom: headerBgColor ? "none" : `1px solid ${hexWithAlpha(accentColor, 0.25)}`,
            paddingBottom: "1rem",
            marginBottom: "1rem",
            display: "flex",
            gap: "0.75rem",
            alignItems: "flex-start",
            flexDirection: isCentered ? "column" : "row",
            ...(isCentered ? { alignItems: "center", textAlign: "center" } : {}),
            ...(headerBgColor ? { backgroundColor: headerBgColor, margin: "-2rem -2rem 1rem -2rem", padding: "1.5rem 2rem" } : {}),
          }}
        >
          {data.photo && !isCentered && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.photo} alt="" style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
          )}
          <div style={{ textAlign: isCentered ? "center" : "left" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: headerBgColor ? "#ffffff" : accentColor }}>
              {data.fullName || "Your Name"}
            </h1>
            <p style={{ fontSize: "0.75rem", color: headerBgColor ? "rgba(255,255,255,0.7)" : "#6b7280", marginTop: "0.15rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {data.headline || "Your Headline"}
            </p>
          </div>
        </div>
      )}

      {/* Summary */}
      {data.summary && (
        <div style={{ marginBottom: "0.75rem" }}>
          <p style={{ fontSize: "0.6rem", color: hexWithAlpha(accentColor, 0.4), textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.35rem", borderBottom: dividerBorder, paddingBottom: "0.2rem" }}>
            Profile
          </p>
          <p style={{ fontSize: "0.7rem", color: "#4b5563", lineHeight: 1.5 }}>
            {data.summary.slice(0, 120)}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div style={{ marginBottom: "0.75rem" }}>
          <p style={{ fontSize: "0.6rem", color: hexWithAlpha(accentColor, 0.4), textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.35rem", borderBottom: dividerBorder, paddingBottom: "0.2rem" }}>
            Experience
          </p>
          {data.experience.slice(0, 2).map((exp) => (
            <div key={exp.id} style={{ marginBottom: "0.5rem" }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", color: accentColor }}>{exp.company}</p>
              <p style={{ fontSize: "0.6rem", color: "#6b7280" }}>{exp.title}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div style={{ marginBottom: "0.75rem" }}>
          <p style={{ fontSize: "0.6rem", color: hexWithAlpha(accentColor, 0.4), textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.35rem", borderBottom: dividerBorder, paddingBottom: "0.2rem" }}>
            Education
          </p>
          {data.education.slice(0, 1).map((edu) => (
            <div key={edu.id}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, color: accentColor }}>{edu.school}</p>
              <p style={{ fontSize: "0.6rem", color: "#6b7280" }}>{[edu.degree, edu.field].filter(Boolean).join(" · ")}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );

  // Sidebar layout
  if (sidebarColor) {
    return (
      <div className="w-full aspect-[3/4] bg-white relative overflow-hidden rounded pointer-events-none select-none flex">
        {/* Sidebar */}
        <div style={{ width: "30%", backgroundColor: sidebarColor, padding: "0.5rem 0.35rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem", flexShrink: 0 }}>
          {data.photo && (
            <div style={{ width: "1.2rem", height: "1.2rem", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "0.35rem", fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>
                {(data.fullName || "?").split(" ").map(n => n[0]).join("").slice(0, 2)}
              </span>
            </div>
          )}
          <p style={{ fontSize: "0.3rem", fontWeight: 700, color: "#ffffff", textTransform: "uppercase", textAlign: "center", letterSpacing: "0.03em", lineHeight: 1.2 }}>
            {data.fullName || "Name"}
          </p>
          <p style={{ fontSize: "0.2rem", color: "rgba(255,255,255,0.5)", textAlign: "center", lineHeight: 1.2 }}>
            {data.headline}
          </p>
        </div>
        {/* Content */}
        <div style={{ flex: 1, padding: "0.75rem", fontFamily: "Helvetica, Arial, sans-serif", color: "#1a1a1a", fontSize: "0.5rem" }}>
          {contentBlock}
        </div>
      </div>
    );
  }

  // Standard layout
  return (
    <div className="w-full aspect-[3/4] bg-white relative overflow-hidden rounded pointer-events-none select-none">
      <div
        className="absolute origin-top-left"
        style={{
          width: "400%",
          height: "400%",
          transform: "scale(0.25)",
          padding: "2rem",
          fontFamily: "Helvetica, Arial, sans-serif",
          color: "#1a1a1a",
        }}
      >
        {contentBlock}

        {/* Skills — only in standard layout */}
        {data.skillGroups.length > 0 && (
          <div>
            <p style={{ fontSize: "0.6rem", color: hexWithAlpha(accentColor, 0.4), textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.35rem", borderBottom: dividerBorder, paddingBottom: "0.2rem" }}>
              Skills
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
              {data.skillGroups.flatMap((g) => g.skills).slice(0, 8).map((skill, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "0.5rem",
                    padding: "0.1rem 0.4rem",
                    border: `1px solid ${hexWithAlpha(accentColor, 0.2)}`,
                    color: "#6b7280",
                    borderRadius: "2px",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
