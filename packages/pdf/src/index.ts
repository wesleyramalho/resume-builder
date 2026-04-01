// Types
export type {
  Resume,
  ResumeData,
  ResumeStatus,
  ContactInfo,
  ExperienceEntry,
  EducationEntry,
  SkillGroup,
  ProjectEntry,
} from "./types/resume";

// Templates
export {
  TEMPLATES,
  getTemplate,
  getResumeStyle,
  hexWithAlpha,
  type ResumeTemplate,
  type ResumeStyle,
} from "./lib/resumeTemplates";

// Defaults
export { createEmptyResumeData } from "./lib/resumeDefaults";

// Schemas
export {
  contactSchema,
  personalInfoSchema,
  experienceEntrySchema,
  educationEntrySchema,
  skillGroupSchema,
  projectEntrySchema,
  type PersonalInfoFormValues,
  type ExperienceEntryFormValues,
  type EducationEntryFormValues,
  type SkillGroupFormValues,
  type ProjectEntryFormValues,
} from "./lib/schemas";

// Utilities
export { generateId, formatMonthYear } from "./lib/utils";
