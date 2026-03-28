"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { ResumeData } from "@/types/resume";
import { getResumeStyle, hexWithAlpha } from "@/lib/resumeTemplates";
import PreviewHeader from "./PreviewHeader";
import PreviewExperience from "./PreviewExperience";
import PreviewEducation from "./PreviewEducation";
import PreviewSkills from "./PreviewSkills";
import PreviewProjects from "./PreviewProjects";

const DEFAULT_ORDER = [
  "experience",
  "education",
  "skills",
  "projects",
  "summary",
];

/** A4 width in CSS px (210mm ≈ 793.7px at 96dpi) */
const PAPER_WIDTH_PX = 793.7;
/** A4 height in CSS px (297mm ≈ 1122.5px at 96dpi) */
const PAGE_HEIGHT_PX = 1122.5;
/** Vertical padding per page in CSS px (40pt × 4/3) — matches PDF paddingVertical: 40 */
const PADDING_V_PX = 40 * (4 / 3);
/** Usable content area per PDF page (page height minus top + bottom padding) */
const CONTENT_PER_PAGE = PAGE_HEIGHT_PX - 2 * PADDING_V_PX;
/** Gap between page sheets in px */
const PAGE_GAP = 24;

interface Props {
  data: ResumeData;
  templateId?: string;
}

export default function ResumePreview({ data, templateId }: Props) {
  const order = data.sectionOrder?.length ? data.sectionOrder : DEFAULT_ORDER;
  const style = getResumeStyle(templateId);
  const containerRef = useRef<HTMLDivElement>(null);
  const measuringRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [containerWidth, setContainerWidth] = useState(PAPER_WIDTH_PX);
  const [contentHeight, setContentHeight] = useState(PAGE_HEIGHT_PX);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function updateScale() {
      const padding = 32;
      const w = el!.clientWidth;
      const available = w - padding;
      setContainerWidth(w);
      setScale(Math.min(1, available / PAPER_WIDTH_PX));
    }

    updateScale();

    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = measuringRef.current;
    if (!el) return;

    function measure() {
      setContentHeight(el!.scrollHeight);
    }

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const pages = Math.max(1, Math.ceil((contentHeight - 2 * PADDING_V_PX) / CONTENT_PER_PAGE));

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: "7pt",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "1.5pt",
    color: hexWithAlpha(style.accentColor, 0.4),
    borderBottom: style.sectionDivider === "line" ? `0.5pt solid ${hexWithAlpha(style.accentColor, 0.15)}` : "none",
    paddingBottom: "3pt",
    marginBottom: "6pt",
  };

  /* Build resume content as a renderable element */
  function renderContent(): ReactNode {
    return (
      <>
        {/* Sidebar strip */}
        {style.sidebarColor && (
          <div
            style={{
              width: "30%",
              backgroundColor: style.sidebarColor,
              padding: "40pt 16pt",
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12pt",
            }}
          >
            {data.photo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.photo}
                alt=""
                style={{
                  width: "60pt",
                  height: "60pt",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3pt solid rgba(255,255,255,0.3)",
                }}
              />
            )}
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "10pt", fontWeight: 700, color: "#ffffff", textTransform: "uppercase", letterSpacing: "1pt" }}>
                {data.fullName || "Your Name"}
              </p>
              <p style={{ fontSize: "7pt", color: "rgba(255,255,255,0.7)", marginTop: "2pt", textTransform: "uppercase", letterSpacing: "0.5pt" }}>
                {data.headline}
              </p>
            </div>
            {/* Contact in sidebar */}
            <div style={{ fontSize: "6.5pt", color: "rgba(255,255,255,0.6)", textAlign: "center", lineHeight: 1.6 }}>
              {[data.contact.location, data.contact.email, data.contact.phone, data.contact.linkedin, data.contact.website].filter(Boolean).map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
            {/* Skills in sidebar */}
            {data.skillGroups.length > 0 && (
              <div style={{ width: "100%", marginTop: "8pt" }}>
                <p style={{ fontSize: "6pt", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1pt", marginBottom: "4pt" }}>
                  Skills
                </p>
                {data.skillGroups.map((group, gi) => (
                <div key={gi} style={{ marginBottom: "4pt", width: "100%" }}>
                  {group.category && (
                    <p style={{ fontSize: "5.5pt", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.5pt", marginBottom: "1pt" }}>
                      {group.category}
                    </p>
                  )}
                  {group.skills.map((skill, i) => (
                    <p key={i} style={{ fontSize: "6.5pt", color: "rgba(255,255,255,0.8)", marginBottom: "2pt" }}>
                      {skill}
                    </p>
                  ))}
                </div>
              ))}
              </div>
            )}
          </div>
        )}

        {/* Main content */}
        <div
          style={{
            flex: style.sidebarColor ? 1 : undefined,
            paddingLeft: style.sidebarColor ? "24pt" : "48pt",
            paddingRight: "48pt",
            paddingTop: "40pt",
            paddingBottom: "40pt",
          }}
        >
          {/* Header — skip name/contact in sidebar mode (shown in sidebar) */}
          {!style.sidebarColor && <PreviewHeader data={data} style={style} />}
          {style.sidebarColor && (
            <div style={{ marginBottom: "10pt" }} />
          )}
          {order.map((id) => {
            if (id === "summary" && data.sections.summary && data.summary)
              return (
                <div key={id} style={{ marginBottom: "10pt" }}>
                  <h2 style={sectionTitleStyle}>Profile</h2>
                  <p style={{ fontSize: "9pt", color: "#4b5563", lineHeight: 1.5 }}>
                    {data.summary}
                  </p>
                </div>
              );
            if (id === "experience" && data.sections.experience)
              return <PreviewExperience key={id} experience={data.experience} style={style} />;
            if (id === "education" && data.sections.education)
              return <PreviewEducation key={id} education={data.education} style={style} />;
            if (id === "skills" && data.sections.skills && !style.sidebarColor)
              return <PreviewSkills key={id} skillGroups={data.skillGroups} style={style} />;
            if (id === "projects" && data.sections.projects)
              return <PreviewProjects key={id} projects={data.projects} style={style} />;
            return null;
          })}
        </div>
      </>
    );
  }

  const contentStyles: React.CSSProperties = {
    width: `${PAPER_WIDTH_PX}px`,
    minHeight: `${PAGE_HEIGHT_PX}px`,
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: "9pt",
    color: "#1a1a1a",
    display: style.sidebarColor ? "flex" : "block",
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-auto scrollbar-none bg-zinc-100"
      style={{ padding: "16px" }}
    >
      {/* Hidden measuring copy — full height, not clipped */}
      <div
        ref={measuringRef}
        aria-hidden
        style={{
          ...contentStyles,
          position: "absolute",
          visibility: "hidden",
          pointerEvents: "none",
        }}
      >
        {renderContent()}
      </div>

      {/* Visible pages */}
      <div
        style={{
          transformOrigin: "top left",
          transform: `scale(${scale})`,
          marginLeft: scale < 1 ? `${containerWidth / 2 - (PAPER_WIDTH_PX * scale) / 2 - 16}px` : "auto",
          marginRight: scale < 1 ? "0" : "auto",
          display: "flex",
          flexDirection: "column",
          gap: `${PAGE_GAP}px`,
        }}
      >
        {Array.from({ length: pages }, (_, pageIndex) => (
          <div
            key={pageIndex}
            className="bg-white shadow-lg"
            style={{
              width: `${PAPER_WIDTH_PX}px`,
              height: `${PAGE_HEIGHT_PX}px`,
              overflow: "hidden",
            }}
          >
            <div style={{ marginTop: `${-(pageIndex * CONTENT_PER_PAGE)}px` }}>
              <div style={contentStyles}>
                {renderContent()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
