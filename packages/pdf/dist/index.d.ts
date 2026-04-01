import { z } from 'zod';

type ResumeStatus = "draft" | "complete";
interface ContactInfo {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
}
interface ExperienceEntry {
    id: string;
    company: string;
    title: string;
    location: string;
    startDate: string;
    endDate: string | null;
    current: boolean;
    description: string;
}
interface EducationEntry {
    id: string;
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string | null;
    gpa?: string;
    highlights: string;
}
interface SkillGroup {
    id: string;
    category: string;
    skills: string[];
}
interface ProjectEntry {
    id: string;
    name: string;
    description: string;
    url?: string;
    technologies: string[];
    startDate: string;
    endDate: string | null;
}
interface ResumeData {
    fullName: string;
    headline: string;
    summary: string;
    photo?: string;
    contact: ContactInfo;
    experience: ExperienceEntry[];
    education: EducationEntry[];
    skillGroups: SkillGroup[];
    projects: ProjectEntry[];
    sections: {
        summary: boolean;
        experience: boolean;
        education: boolean;
        skills: boolean;
        projects: boolean;
    };
    /** Ordered list of section IDs for the editor sidebar and PDF output. "personal" is always first. */
    sectionOrder: string[];
    linkedInImported?: boolean;
}
interface Resume {
    id: string;
    name: string;
    templateId?: string;
    status: ResumeStatus;
    createdAt: string;
    updatedAt: string;
    exportCount: number;
    data: ResumeData;
}

interface ResumeTemplate {
    id: string;
    name: string;
    description: string;
    style: {
        accentColor: string;
        headerLayout: "standard" | "centered";
        showPhoto: boolean;
        sectionDivider: "line" | "none";
        headerBgColor?: string;
        photoPosition?: "top-left" | "top-right" | "top-center";
        sidebarColor?: string;
    };
    sampleData?: Partial<ResumeData>;
    /** Photo shown only in template previews (not copied to user's resume) */
    previewPhoto?: string;
}
declare const TEMPLATES: ResumeTemplate[];
declare function getTemplate(id: string): ResumeTemplate | undefined;
interface ResumeStyle {
    accentColor: string;
    sectionDivider: "line" | "none";
    headerBgColor?: string;
    headerLayout: "standard" | "centered";
    photoPosition?: "top-left" | "top-right" | "top-center";
    sidebarColor?: string;
}
declare function getResumeStyle(templateId?: string): ResumeStyle;
/**
 * Blend a hex color with white at a given opacity and return a flat hex.
 * Works in both CSS and @react-pdf/renderer (which doesn't support rgba).
 */
declare function hexWithAlpha(hex: string, alpha: number): string;

declare function createEmptyResumeData(): ResumeData;

declare const contactSchema: z.ZodObject<{
    email: z.ZodString;
    phone: z.ZodString;
    location: z.ZodString;
    linkedin: z.ZodString;
    website: z.ZodString;
}, z.core.$strip>;
declare const personalInfoSchema: z.ZodObject<{
    fullName: z.ZodString;
    headline: z.ZodString;
    contact: z.ZodObject<{
        email: z.ZodString;
        phone: z.ZodString;
        location: z.ZodString;
        linkedin: z.ZodString;
        website: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const experienceEntrySchema: z.ZodObject<{
    id: z.ZodString;
    company: z.ZodString;
    title: z.ZodString;
    location: z.ZodString;
    startDate: z.ZodString;
    endDate: z.ZodNullable<z.ZodString>;
    current: z.ZodBoolean;
    description: z.ZodString;
}, z.core.$strip>;
declare const educationEntrySchema: z.ZodObject<{
    id: z.ZodString;
    school: z.ZodString;
    degree: z.ZodString;
    field: z.ZodString;
    startDate: z.ZodString;
    endDate: z.ZodNullable<z.ZodString>;
    gpa: z.ZodOptional<z.ZodString>;
    highlights: z.ZodString;
}, z.core.$strip>;
declare const skillGroupSchema: z.ZodObject<{
    id: z.ZodString;
    category: z.ZodString;
    skills: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
declare const projectEntrySchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    url: z.ZodOptional<z.ZodString>;
    technologies: z.ZodArray<z.ZodString>;
    startDate: z.ZodString;
    endDate: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;
type ExperienceEntryFormValues = z.infer<typeof experienceEntrySchema>;
type EducationEntryFormValues = z.infer<typeof educationEntrySchema>;
type SkillGroupFormValues = z.infer<typeof skillGroupSchema>;
type ProjectEntryFormValues = z.infer<typeof projectEntrySchema>;

declare function generateId(): string;
/** Format a "YYYY-MM" date string to a localized short month + year */
declare function formatMonthYear(ym: string | null, locale?: string, presentLabel?: string): string;

export { type ContactInfo, type EducationEntry, type EducationEntryFormValues, type ExperienceEntry, type ExperienceEntryFormValues, type PersonalInfoFormValues, type ProjectEntry, type ProjectEntryFormValues, type Resume, type ResumeData, type ResumeStatus, type ResumeStyle, type ResumeTemplate, type SkillGroup, type SkillGroupFormValues, TEMPLATES, contactSchema, createEmptyResumeData, educationEntrySchema, experienceEntrySchema, formatMonthYear, generateId, getResumeStyle, getTemplate, hexWithAlpha, personalInfoSchema, projectEntrySchema, skillGroupSchema };
