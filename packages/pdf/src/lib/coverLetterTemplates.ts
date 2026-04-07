export interface CoverLetterTemplate {
  id: string;
  name: string;
  description: string;
  style: CoverLetterStyle;
}

export interface CoverLetterStyle {
  accentColor: string;
  headerLayout: "left" | "centered";
}

export const COVER_LETTER_TEMPLATES: CoverLetterTemplate[] = [
  {
    id: "standard",
    name: "Standard",
    description: "Classic left-aligned letter with a clean professional look.",
    style: {
      accentColor: "#1e3a5f",
      headerLayout: "left",
    },
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary layout with blue accents matching the Modern resume.",
    style: {
      accentColor: "#2563eb",
      headerLayout: "left",
    },
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Centered header with minimal styling for a refined look.",
    style: {
      accentColor: "#374151",
      headerLayout: "centered",
    },
  },
];

export function getCoverLetterTemplate(id?: string): CoverLetterTemplate | undefined {
  return COVER_LETTER_TEMPLATES.find((t) => t.id === id);
}

export function getCoverLetterStyle(templateId?: string): CoverLetterStyle {
  const tmpl = getCoverLetterTemplate(templateId);
  return tmpl?.style ?? COVER_LETTER_TEMPLATES[0].style;
}
