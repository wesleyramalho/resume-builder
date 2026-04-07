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

// Cover Letter Types
export type {
  CoverLetter,
  CoverLetterData,
  CoverLetterStatus,
  CoverLetterRecipient,
} from "./types/coverLetter";

// Cover Letter Defaults
export { createEmptyCoverLetterData } from "./lib/coverLetterDefaults";

// Cover Letter Schemas
export {
  recipientSchema,
  coverLetterFormSchema,
  type CoverLetterFormValues,
  type RecipientFormValues,
} from "./lib/coverLetterSchemas";

// Cover Letter Templates
export {
  COVER_LETTER_TEMPLATES,
  getCoverLetterTemplate,
  getCoverLetterStyle,
  type CoverLetterTemplate,
  type CoverLetterStyle,
} from "./lib/coverLetterTemplates";

// Utilities
export { generateId, formatMonthYear } from "./lib/utils";
