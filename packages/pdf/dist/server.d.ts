import { Resume } from './index.js';
export { ContactInfo, EducationEntry, EducationEntryFormValues, ExperienceEntry, ExperienceEntryFormValues, PersonalInfoFormValues, ProjectEntry, ProjectEntryFormValues, ResumeData, ResumeStatus, ResumeStyle, ResumeTemplate, SkillGroup, SkillGroupFormValues, TEMPLATES, contactSchema, createEmptyResumeData, educationEntrySchema, experienceEntrySchema, formatMonthYear, generateId, getResumeStyle, getTemplate, hexWithAlpha, personalInfoSchema, projectEntrySchema, skillGroupSchema } from './index.js';
import * as react_jsx_runtime from 'react/jsx-runtime';
import 'zod';

declare function generateResumePDF(resume: Resume, locale?: string, messages?: Record<string, Record<string, string>>): Promise<Buffer>;

declare const PDF_FONT = "Helvetica";
interface Props {
    resume: Resume;
    locale?: string;
    messages?: Record<string, Record<string, string>>;
}
declare function ResumePDFDocument({ resume, locale, messages }: Props): react_jsx_runtime.JSX.Element;

export { PDF_FONT, Resume, ResumePDFDocument, generateResumePDF };
