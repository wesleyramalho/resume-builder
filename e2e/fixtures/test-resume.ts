/**
 * Deterministic test resume with known content for assertions.
 * Types are inlined to avoid importing from src/ (path alias issues).
 */

export interface TestResume {
  id: string;
  name: string;
  templateId?: string;
  status: "draft" | "complete";
  createdAt: string;
  updatedAt: string;
  exportCount: number;
  data: {
    fullName: string;
    headline: string;
    summary: string;
    photo?: string;
    contact: {
      email: string;
      phone: string;
      location: string;
      linkedin: string;
      website: string;
    };
    experience: {
      id: string;
      company: string;
      title: string;
      location: string;
      startDate: string;
      endDate: string | null;
      current: boolean;
      description: string;
    }[];
    education: {
      id: string;
      school: string;
      degree: string;
      field: string;
      startDate: string;
      endDate: string | null;
      gpa?: string;
      highlights: string;
    }[];
    skillGroups: {
      id: string;
      category: string;
      skills: string[];
    }[];
    projects: {
      id: string;
      name: string;
      description: string;
      url?: string;
      technologies: string[];
      startDate: string;
      endDate: string | null;
    }[];
    sections: {
      summary: boolean;
      experience: boolean;
      education: boolean;
      skills: boolean;
      projects: boolean;
    };
    sectionOrder: string[];
    linkedInImported?: boolean;
  };
}

export const TEST_RESUME: TestResume = {
  id: "test-resume-1",
  name: "Test Resume",
  templateId: "modern",
  status: "complete",
  createdAt: "2025-01-01T00:00:00.000Z",
  updatedAt: "2025-01-01T00:00:00.000Z",
  exportCount: 0,
  data: {
    fullName: "Alex Chen",
    headline: "Senior Software Engineer",
    summary:
      "Full-stack engineer with 6+ years building scalable web applications. Passionate about developer experience, performance, and clean architecture.",
    contact: {
      email: "alex.chen@email.com",
      phone: "+1 (555) 234-5678",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/alexchen",
      website: "alexchen.dev",
    },
    experience: [
      {
        id: "exp-1",
        company: "Stripe",
        title: "Senior Software Engineer",
        location: "San Francisco, CA",
        startDate: "2021-06",
        endDate: null,
        current: true,
        description:
          "Led development of the new billing dashboard used by 50K+ merchants.\nArchitected real-time event pipeline processing 2M+ events/day.\nMentored 4 junior engineers through structured onboarding program.",
      },
      {
        id: "exp-2",
        company: "Vercel",
        title: "Software Engineer",
        location: "Remote",
        startDate: "2019-03",
        endDate: "2021-05",
        current: false,
        description:
          "Built core deployment infrastructure handling 10K+ deploys/day.\nContributed to Next.js framework, improving build performance by 35%.\nDesigned and implemented edge middleware caching layer.",
      },
    ],
    education: [
      {
        id: "edu-1",
        school: "UC Berkeley",
        degree: "B.S.",
        field: "Computer Science",
        startDate: "2015-08",
        endDate: "2019-05",
        gpa: "3.8",
        highlights: "",
      },
    ],
    skillGroups: [
      {
        id: "skill-1",
        category: "Languages",
        skills: ["TypeScript", "Python", "Go", "SQL"],
      },
      {
        id: "skill-2",
        category: "Frameworks",
        skills: ["React", "Next.js", "Node.js", "FastAPI"],
      },
    ],
    projects: [
      {
        id: "proj-1",
        name: "ResumeBuilder",
        description:
          "Open-source resume builder that runs entirely in the browser with zero data sent to any server.",
        url: "https://github.com/alexchen/resume-builder",
        technologies: ["Next.js", "React", "TypeScript"],
        startDate: "2024-01",
        endDate: null,
      },
    ],
    sections: {
      summary: true,
      experience: true,
      education: true,
      skills: true,
      projects: true,
    },
    sectionOrder: ["experience", "education", "skills", "projects"],
  },
};

/** Expected content strings for assertions — used by both preview and PDF tests. */
export const EXPECTED = {
  fullName: "Alex Chen",
  headline: "Senior Software Engineer",
  companies: ["Stripe", "Vercel"],
  jobTitles: ["Senior Software Engineer", "Software Engineer"],
  schools: ["UC Berkeley"],
  skills: ["TypeScript", "Python", "React", "Next.js"],
  projectNames: ["ResumeBuilder"],
  contactEmail: "alex.chen@email.com",
  location: "San Francisco, CA",
};

/**
 * Template-specific test data: template ID → { fullName, companies, schools, skills }
 * Derived from the sampleData in src/lib/resumeTemplates.ts
 */
export const TEMPLATE_EXPECTATIONS: Record<
  string,
  {
    templateId: string;
    fullName: string;
    companies: string[];
    schools: string[];
    skills: string[];
  }
> = {
  modern: {
    templateId: "modern",
    fullName: "Alex Chen",
    companies: ["Stripe", "Vercel"],
    schools: ["UC Berkeley"],
    skills: ["TypeScript", "React"],
  },
  classic: {
    templateId: "classic",
    fullName: "Sarah Mitchell",
    companies: ["Goldman Sachs", "Deloitte"],
    schools: ["NYU Stern School of Business"],
    skills: ["Financial Modeling", "SQL"],
  },
  minimal: {
    templateId: "minimal",
    fullName: "Jordan Rivera",
    companies: ["Figma", "Spotify"],
    schools: ["Rhode Island School of Design"],
    skills: ["Figma", "Sketch"],
  },
  executive: {
    templateId: "executive",
    fullName: "Charlotte Warren",
    companies: ["Haskins Corp", "DPG Recruitment"],
    schools: ["CUNY"],
    skills: ["English", "French"],
  },
  bold: {
    templateId: "bold",
    fullName: "Herman Walton",
    companies: ["GEO Corp", "Sisco Enterprises"],
    schools: ["University of Arizona"],
    skills: ["Financial Reporting", "Budgeting"],
  },
  balanced: {
    templateId: "balanced",
    fullName: "Gregory Walls",
    companies: ["Timothy Glover Carpentry Inc.", "Ringwood Inc."],
    schools: ["Charter Oak State College"],
    skills: ["Time Management", "Supervision"],
  },
  clear: {
    templateId: "clear",
    fullName: "Patricia Giordano",
    companies: ["Luxury Hotel Group", "Little Star Day Spa"],
    schools: ["Pierce College"],
    skills: ["English", "Italian"],
  },
};
