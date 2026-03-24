import { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
}

export default function ResumeThumbnail({ data }: Props) {
  return (
    <div className="w-full aspect-[3/4] bg-white relative overflow-hidden rounded pointer-events-none select-none">
      {/* Scaled-down resume preview */}
      <div
        className="absolute origin-top-left"
        style={{
          width: "400%",
          height: "400%",
          transform: "scale(0.25)",
          padding: "2rem",
          fontFamily: "serif",
          color: "#1a1a1a",
        }}
      >
        {/* Name */}
        <div style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "1rem", marginBottom: "1rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            {data.fullName || "Your Name"}
          </h1>
          <p style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.25rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            {data.headline || "Your Headline"}
          </p>
        </div>

        {/* Summary */}
        {data.summary && (
          <div style={{ marginBottom: "1rem" }}>
            <p style={{ fontSize: "0.625rem", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>
              Profile
            </p>
            <p style={{ fontSize: "0.75rem", color: "#4b5563", lineHeight: 1.5 }}>
              {data.summary.slice(0, 180)}
            </p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div style={{ marginBottom: "1rem" }}>
            <p style={{ fontSize: "0.625rem", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>
              Experience
            </p>
            {data.experience.slice(0, 2).map((exp) => (
              <div key={exp.id} style={{ marginBottom: "0.75rem" }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>{exp.company}</p>
                <p style={{ fontSize: "0.625rem", color: "#6b7280" }}>{exp.title}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skillGroups.length > 0 && (
          <div>
            <p style={{ fontSize: "0.625rem", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>
              Skills
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
              {data.skillGroups.flatMap((g) => g.skills).slice(0, 6).map((skill, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "0.5rem",
                    padding: "0.125rem 0.5rem",
                    border: "1px solid #e5e7eb",
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
