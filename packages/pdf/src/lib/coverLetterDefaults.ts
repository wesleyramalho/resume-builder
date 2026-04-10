import { CoverLetterData } from "../types/coverLetter";

export function createEmptyCoverLetterData(): CoverLetterData {
  return {
    senderName: "",
    senderContact: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
    },
    recipient: {
      name: "",
      title: "",
      company: "",
    },
    date: new Date().toISOString().slice(0, 10),
    salutation: "",
    bodyParagraphs: ["", "", ""],
    closing: "",
  };
}
