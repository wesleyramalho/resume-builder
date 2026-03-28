import { z } from "zod";

export const contactSchema = z.object({
  email: z.string(),
  phone: z.string(),
  location: z.string(),
  linkedin: z.string(),
  website: z.string(),
});

export const personalInfoSchema = z.object({
  fullName: z.string(),
  headline: z.string(),
  contact: contactSchema,
});

export const experienceEntrySchema = z.object({
  id: z.string(),
  company: z.string(),
  title: z.string(),
  location: z.string(),
  startDate: z.string(),
  endDate: z.string().nullable(),
  current: z.boolean(),
  description: z.string(),
});

export const educationEntrySchema = z.object({
  id: z.string(),
  school: z.string(),
  degree: z.string(),
  field: z.string(),
  startDate: z.string(),
  endDate: z.string().nullable(),
  gpa: z.string().optional(),
  highlights: z.string(),
});

export const skillGroupSchema = z.object({
  id: z.string(),
  category: z.string(),
  skills: z.array(z.string()),
});

export const projectEntrySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  url: z.string().optional(),
  technologies: z.array(z.string()),
  startDate: z.string(),
  endDate: z.string().nullable(),
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;
export type ExperienceEntryFormValues = z.infer<typeof experienceEntrySchema>;
export type EducationEntryFormValues = z.infer<typeof educationEntrySchema>;
export type SkillGroupFormValues = z.infer<typeof skillGroupSchema>;
export type ProjectEntryFormValues = z.infer<typeof projectEntrySchema>;
