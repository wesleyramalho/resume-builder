import { ResumeData } from "@/types/resume";

export function createEmptyResumeData(): ResumeData {
  return {
    fullName: "",
    headline: "",
    summary: "",
    contact: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
    },
    experience: [],
    education: [],
    skillGroups: [],
    projects: [],
    sections: {
      summary: true,
      experience: true,
      education: true,
      skills: true,
      projects: true,
    },
  };
}
