import { ResumeData } from "@/types/resume";
import { hexWithAlpha, type ResumeStyle } from "@/lib/resumeTemplates";

interface Props {
  data: ResumeData;
  style: ResumeStyle;
}

export default function PreviewHeader({ data, style: tmpl }: Props) {
  const { fullName, headline, contact } = data;
  const contactParts = [
    contact.location,
    contact.email,
    contact.phone,
    contact.linkedin,
    contact.website,
  ].filter(Boolean);

  const hasBg = !!tmpl.headerBgColor;
  const textColor = hasBg ? "#ffffff" : tmpl.accentColor;
  const subtextColor = hasBg ? "rgba(255,255,255,0.7)" : "#6b7280";
  const contactColor = hasBg ? "rgba(255,255,255,0.6)" : "#9ca3af";

  const isPhotoRight = tmpl.photoPosition === "top-right";
  const isPhotoCentered = tmpl.photoPosition === "top-center";
  const isCentered = isPhotoCentered || tmpl.headerLayout === "centered";

  const photoEl = data.photo ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={data.photo}
      alt=""
      style={{
        width: "32pt",
        height: "32pt",
        borderRadius: "50%",
        objectFit: "cover",
        flexShrink: 0,
        border: hasBg ? "2pt solid rgba(255,255,255,0.3)" : "none",
      }}
    />
  ) : null;

  return (
    <div
      style={{
        borderBottom: hasBg ? "none" : `0.5pt solid ${hexWithAlpha(tmpl.accentColor, 0.25)}`,
        paddingBottom: hasBg ? "20pt" : "10pt",
        marginBottom: "10pt",
        ...(hasBg
          ? {
              backgroundColor: tmpl.headerBgColor,
              marginTop: "-40pt",
              marginLeft: "-48pt",
              marginRight: "-48pt",
              paddingTop: "30pt",
              paddingLeft: "48pt",
              paddingRight: "48pt",
              borderRadius: 0,
            }
          : {}),
        display: "flex",
        gap: "10pt",
        alignItems: isCentered ? "center" : "flex-start",
        flexDirection: isCentered ? "column" : "row",
      }}
    >
      {/* Photo left or centered (before text) */}
      {photoEl && !isPhotoRight && photoEl}

      <div style={{ flex: 1, textAlign: isCentered ? "center" : "left" }}>
        <h1
          style={{
            fontSize: "16pt",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1.5pt",
            color: textColor,
            margin: 0,
            marginBottom: "8pt",
          }}
        >
          {fullName || <span style={{ color: "#d1d5db" }}>Your Name</span>}
        </h1>
        <p
          style={{
            fontSize: "8pt",
            textTransform: "uppercase",
            letterSpacing: "1.5pt",
            color: subtextColor,
            margin: 0,
            marginTop: "2pt",
            marginBottom: "4pt",
          }}
        >
          {headline || <span style={{ color: "#d1d5db" }}>Your Headline</span>}
        </p>
        {contactParts.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8pt",
              marginTop: "4pt",
              justifyContent: isCentered ? "center" : "flex-start",
            }}
          >
            {contactParts.map((part, i) => (
              <span key={i} style={{ fontSize: "7.5pt", color: contactColor }}>
                {part}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Photo right */}
      {photoEl && isPhotoRight && photoEl}
    </div>
  );
}
