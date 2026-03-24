import { ResumeData } from "@/types/resume";
import { LinkedInProfile } from "@/types/linkedin";
import { generateId } from "@/lib/utils";

export function mapLinkedInOAuthToResume(profile: LinkedInProfile): Partial<ResumeData> {
  return {
    fullName: profile.name ?? "",
    headline: profile.headline ?? "",
    contact: {
      email: profile.email ?? "",
      phone: "",
      location: profile.location?.name ?? "",
      linkedin: profile.sub ? `https://linkedin.com/in/${profile.sub}` : "",
      website: "",
    },
    // Experience, education, and skills not available via standard OAuth
    experience: [],
    education: [],
    skillGroups: [],
  };
}

// Generates a placeholder ID for the mapping function (same import)
export { generateId };
