import { generateId } from "@/lib/utils";
import type {
  ResumeData,
  ExperienceEntry,
  EducationEntry,
  SkillGroup,
  ProjectEntry,
} from "@/types/resume";

// ── Regex patterns ──────────────────────────────────────────────────────────

const EMAIL_RE = /[\w.+-]+@[\w-]+\.[\w.]+/;
const PHONE_RE = /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const LINKEDIN_RE = /linkedin\.com\/in\/[\w-]+/i;
const URL_RE = /https?:\/\/[^\s,]+|www\.[^\s,]+/gi;
const LOCATION_RE = /\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)*,\s*[A-Z]{2}\b/;

const MONTH_NAMES: Record<string, string> = {
  jan: "01",
  january: "01",
  feb: "02",
  february: "02",
  mar: "03",
  march: "03",
  apr: "04",
  april: "04",
  may: "05",
  jun: "06",
  june: "06",
  jul: "07",
  july: "07",
  aug: "08",
  august: "08",
  sep: "09",
  september: "09",
  oct: "10",
  october: "10",
  nov: "11",
  november: "11",
  dec: "12",
  december: "12",
};

const DATE_RE =
  /(?:(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{4}|\d{1,2}\/\d{4}|\d{4}-\d{2}|\d{4})/gi;
const DATE_RANGE_RE = new RegExp(
  `(${DATE_RE.source})\\s*[-–—to]+\\s*(${DATE_RE.source}|Present|Current|Now)`,
  "gi",
);

const SECTION_PATTERNS: { key: string; re: RegExp }[] = [
  {
    key: "experience",
    re: /(?:experience|work\s*history|employment|professional\s*experience|career\s*history|work\s*experience|relevant\s*experience)/i,
  },
  {
    key: "education",
    re: /(?:education|academic|qualifications|certifications?|academic\s*background)/i,
  },
  {
    key: "skills",
    re: /(?:skills|technical\s*skills|core\s*competencies|competencies|technologies|expertise|areas?\s*of\s*expertise|technical\s*proficiencies)/i,
  },
  {
    key: "projects",
    re: /(?:projects|personal\s*projects|portfolio|side\s*projects|key\s*projects)/i,
  },
  {
    key: "summary",
    re: /(?:summary|profile|objective|about\s*me|professional\s*summary|career\s*summary|career\s*objective|personal\s*statement)/i,
  },
];

const DEGREE_RE =
  /\b(?:B\.?S\.?|B\.?A\.?|M\.?S\.?|M\.?A\.?|M\.?B\.?A\.?|Ph\.?D\.?|Bachelor|Master|Associate|Doctor|Diploma)\b/i;

// ── Helpers ──────────────────────────────────────────────────────────────────

function normalizeToYYYYMM(raw: string): string | null {
  const s = raw.trim();
  if (/present|current|now/i.test(s)) return null;

  // "Jan 2020" or "January 2020"
  const monthYear = s.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (monthYear) {
    const m = MONTH_NAMES[monthYear[1].toLowerCase().slice(0, 3)];
    return m ? `${monthYear[2]}-${m}` : `${monthYear[2]}-01`;
  }

  // "01/2020"
  const slashDate = s.match(/^(\d{1,2})\/(\d{4})$/);
  if (slashDate) return `${slashDate[2]}-${slashDate[1].padStart(2, "0")}`;

  // "2020-01"
  if (/^\d{4}-\d{2}$/.test(s)) return s;

  // "2020"
  if (/^\d{4}$/.test(s)) return `${s}-01`;

  return null;
}

function isContactLine(line: string): boolean {
  return (
    EMAIL_RE.test(line) ||
    PHONE_RE.test(line) ||
    LINKEDIN_RE.test(line) ||
    /^https?:\/\//.test(line)
  );
}

function isSectionHeader(line: string): boolean {
  return looksLikeSectionHeader(line) !== null;
}

function cleanLine(line: string): string {
  return line.replace(/^[\s•·\-–—►▪▸○●■□]+/, "").trim();
}

// ── Section splitter ────────────────────────────────────────────────────────

interface Section {
  key: string;
  lines: string[];
}

function looksLikeSectionHeader(line: string): { key: string } | null {
  const trimmed = line.replace(/^[\s•·\-–—:]+|[\s•·\-–—:]+$/g, "").trim();
  // Section headers are short and mostly just the section name
  if (trimmed.length > 45) return null;
  // Don't match lines that have too many words (likely body text)
  if (trimmed.split(/\s+/).length > 5) return null;
  return SECTION_PATTERNS.find((p) => p.re.test(trimmed)) ?? null;
}

function splitSections(lines: string[]): {
  header: string[];
  sections: Section[];
} {
  const sections: Section[] = [];
  const header: string[] = [];
  let current: Section | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      current?.lines.push("");
      continue;
    }

    const matched = looksLikeSectionHeader(trimmed);
    if (matched) {
      current = { key: matched.key, lines: [] };
      sections.push(current);
    } else if (current) {
      current.lines.push(trimmed);
    } else {
      header.push(trimmed);
    }
  }

  return { header, sections };
}

// ── Section parsers ─────────────────────────────────────────────────────────

function parseExperience(lines: string[]): ExperienceEntry[] {
  const entries: ExperienceEntry[] = [];
  const blocks = splitIntoBlocks(lines);

  for (const block of blocks) {
    const dateRangeMatch = block.join(" ").match(DATE_RANGE_RE);
    let startDate = "";
    let endDate: string | null = "";
    let current = false;

    if (dateRangeMatch) {
      const parts = dateRangeMatch[0].split(/\s*[-–—to]+\s*/i).filter(Boolean);
      startDate = normalizeToYYYYMM(parts[0]) ?? "";
      if (parts[1] && /present|current|now/i.test(parts[1])) {
        endDate = null;
        current = true;
      } else if (parts[1]) {
        endDate = normalizeToYYYYMM(parts[1]) ?? "";
      }
    }

    // First non-date, non-bullet line is likely company or title
    const titleLines = block.filter(
      (l) =>
        !DATE_RANGE_RE.test(l) &&
        !l.startsWith("•") &&
        !l.startsWith("-") &&
        l.length < 80,
    );

    let company = "";
    let title = "";
    let location = "";

    if (titleLines.length >= 2) {
      // Often: line 1 = company, line 2 = title (or vice versa)
      company = titleLines[0];
      title = titleLines[1];
    } else if (titleLines.length === 1) {
      // Check for "Title at Company" or "Title | Company" pattern
      const split = titleLines[0].split(/\s*[|–—@]\s*/);
      if (split.length >= 2) {
        title = split[0];
        company = split[1];
      } else {
        company = titleLines[0];
      }
    }

    const locMatch = block.join(" ").match(LOCATION_RE);
    if (locMatch) location = locMatch[0];

    const descLines = block
      .filter((l) => !titleLines.includes(l) && !DATE_RANGE_RE.test(l))
      .map(cleanLine)
      .filter(Boolean);

    entries.push({
      id: generateId(),
      company,
      title,
      location,
      startDate,
      endDate,
      current,
      description: descLines.join("\n"),
    });
  }

  return entries;
}

function parseEducation(lines: string[]): EducationEntry[] {
  const entries: EducationEntry[] = [];
  const blocks = splitIntoBlocks(lines);

  for (const block of blocks) {
    const text = block.join(" ");
    const dateRangeMatch = text.match(DATE_RANGE_RE);
    let startDate = "";
    let endDate: string | null = "";

    if (dateRangeMatch) {
      const parts = dateRangeMatch[0].split(/\s*[-–—to]+\s*/i).filter(Boolean);
      startDate = normalizeToYYYYMM(parts[0]) ?? "";
      endDate = parts[1] ? (normalizeToYYYYMM(parts[1]) ?? "") : "";
    }

    const degreeMatch = text.match(DEGREE_RE);
    const degree = degreeMatch ? degreeMatch[0] : "";
    let field = "";
    let school = "";

    // Try to find "Degree in Field" pattern
    if (degreeMatch) {
      const afterDegree = text.slice(
        text.indexOf(degreeMatch[0]) + degreeMatch[0].length,
      );
      const fieldMatch = afterDegree.match(/\s*(?:in|of)\s+([^,\n]+)/i);
      if (fieldMatch) field = fieldMatch[1].trim();
    }

    // School is usually the first non-degree, non-date line
    for (const l of block) {
      if (
        !DEGREE_RE.test(l) &&
        !DATE_RANGE_RE.test(l) &&
        l.length < 80 &&
        l.trim()
      ) {
        school = l.trim();
        break;
      }
    }

    if (!school && block.length > 0) school = block[0];

    const gpaMatch = text.match(/GPA[:\s]*(\d+\.?\d*)/i);

    entries.push({
      id: generateId(),
      school,
      degree,
      field,
      startDate,
      endDate,
      gpa: gpaMatch?.[1],
      highlights: "",
    });
  }

  return entries;
}

function parseSkills(lines: string[]): SkillGroup[] {
  const groups: SkillGroup[] = [];
  const allSkills: string[] = [];

  for (const line of lines) {
    if (!line.trim()) continue;

    // "Category: skill1, skill2, skill3"
    const colonSplit = line.match(/^([^:]+):\s*(.+)$/);
    if (colonSplit) {
      const category = colonSplit[1].trim();
      const skills = colonSplit[2]
        .split(/[,|;]/)
        .map((s) => s.trim())
        .filter(Boolean);
      if (skills.length > 0) {
        groups.push({ id: generateId(), category, skills });
      }
    } else {
      // Collect as flat skills
      const skills = line
        .split(/[,|;•·]/)
        .map((s) => s.trim())
        .filter((s) => s && s.length < 40);
      allSkills.push(...skills);
    }
  }

  if (allSkills.length > 0 && groups.length === 0) {
    groups.push({ id: generateId(), category: "", skills: allSkills });
  } else if (allSkills.length > 0) {
    groups.push({ id: generateId(), category: "Other", skills: allSkills });
  }

  return groups;
}

function parseProjects(lines: string[]): ProjectEntry[] {
  const entries: ProjectEntry[] = [];
  const blocks = splitIntoBlocks(lines);

  for (const block of blocks) {
    const text = block.join(" ");
    const name =
      block
        .find((l) => l.length < 60 && !l.startsWith("•") && !l.startsWith("-"))
        ?.trim() ?? "";
    const urlMatch = text.match(URL_RE);
    const descLines = block
      .filter((l) => l !== name && !URL_RE.test(l))
      .map(cleanLine)
      .filter(Boolean);

    const dateRangeMatch = text.match(DATE_RANGE_RE);
    let startDate = "";
    let endDate: string | null = "";
    if (dateRangeMatch) {
      const parts = dateRangeMatch[0].split(/\s*[-–—to]+\s*/i).filter(Boolean);
      startDate = normalizeToYYYYMM(parts[0]) ?? "";
      endDate = parts[1] ? (normalizeToYYYYMM(parts[1]) ?? "") : "";
    }

    if (name) {
      entries.push({
        id: generateId(),
        name,
        description: descLines.join("\n"),
        url: urlMatch?.[0],
        technologies: [],
        startDate,
        endDate,
      });
    }
  }

  return entries;
}

// ── Block splitter (groups lines into logical entries) ──────────────────────

function splitIntoBlocks(lines: string[]): string[][] {
  const blocks: string[][] = [];
  let current: string[] = [];

  for (const line of lines) {
    if (!line.trim()) {
      if (current.length > 0) {
        blocks.push(current);
        current = [];
      }
      continue;
    }
    current.push(line);
  }
  if (current.length > 0) blocks.push(current);

  // If we only got one block, try splitting by date ranges
  if (blocks.length <= 1 && lines.length > 3) {
    const byDate: string[][] = [];
    let cur: string[] = [];
    for (const line of lines) {
      if (DATE_RANGE_RE.test(line) && cur.length > 0) {
        byDate.push(cur);
        cur = [line];
      } else if (line.trim()) {
        cur.push(line);
      }
    }
    if (cur.length > 0) byDate.push(cur);
    if (byDate.length > 1) return byDate;
  }

  return blocks;
}

// ── Main parser ─────────────────────────────────────────────────────────────

export function parseResumeText(text: string): Partial<ResumeData> {
  const lines = text.split(/\n/).map((l) => l.trim());
  const { header, sections } = splitSections(lines);

  // ── Contact info from entire text ──
  const fullText = text;
  const email = fullText.match(EMAIL_RE)?.[0] ?? "";
  const phone = fullText.match(PHONE_RE)?.[0] ?? "";
  const linkedinMatch = fullText.match(LINKEDIN_RE);
  const linkedin = linkedinMatch ? `https://${linkedinMatch[0]}` : "";
  const location = fullText.match(LOCATION_RE)?.[0] ?? "";

  // Website: first URL that isn't LinkedIn
  const allUrls = fullText.match(URL_RE) ?? [];
  const website =
    allUrls.find((u) => !LINKEDIN_RE.test(u) && !u.includes("mailto:")) ?? "";

  // ── Name: first header line that isn't contact info ──
  const fullName =
    header.find(
      (l) =>
        l.length > 1 &&
        l.length < 60 &&
        !isContactLine(l) &&
        !isSectionHeader(l),
    ) ?? "";

  // ── Headline: second short non-contact header line ──
  const headlineCandidate = header.find(
    (l) =>
      l !== fullName &&
      l.length > 1 &&
      l.length < 80 &&
      !isContactLine(l) &&
      !isSectionHeader(l),
  );
  const headline = headlineCandidate ?? "";

  // ── Sections ──
  const sectionMap = new Map<string, string[]>();
  for (const s of sections) {
    sectionMap.set(s.key, s.lines);
  }

  const experience = sectionMap.has("experience")
    ? parseExperience(sectionMap.get("experience")!)
    : [];
  const education = sectionMap.has("education")
    ? parseEducation(sectionMap.get("education")!)
    : [];
  const skillGroups = sectionMap.has("skills")
    ? parseSkills(sectionMap.get("skills")!)
    : [];
  const projects = sectionMap.has("projects")
    ? parseProjects(sectionMap.get("projects")!)
    : [];

  const summaryLines = sectionMap.get("summary");
  const summary = summaryLines ? summaryLines.filter(Boolean).join(" ") : "";

  return {
    fullName,
    headline,
    summary,
    contact: { email, phone, location, linkedin, website },
    experience,
    education,
    skillGroups,
    projects,
    sections: {
      summary: !!summary,
      experience: experience.length > 0,
      education: education.length > 0,
      skills: skillGroups.length > 0,
      projects: projects.length > 0,
    },
  };
}
