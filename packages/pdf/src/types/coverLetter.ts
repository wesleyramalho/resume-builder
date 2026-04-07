import { ContactInfo } from "./resume";

export type CoverLetterStatus = "draft" | "complete";

export interface CoverLetterRecipient {
  name: string;
  title: string;
  company: string;
}

export interface CoverLetterData {
  senderName: string;
  senderContact: ContactInfo;
  recipient: CoverLetterRecipient;
  date: string;
  salutation: string;
  bodyParagraphs: string[];
  closing: string;
  linkedResumeId?: string;
}

export interface CoverLetter {
  id: string;
  name: string;
  templateId?: string;
  status: CoverLetterStatus;
  createdAt: string;
  updatedAt: string;
  exportCount: number;
  data: CoverLetterData;
}
