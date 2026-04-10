import { z } from "zod";
import { contactSchema } from "./schemas";

export const recipientSchema = z.object({
  name: z.string().max(100, "tooLong"),
  title: z.string().max(100, "tooLong"),
  company: z.string().max(100, "tooLong"),
});

export const coverLetterFormSchema = z.object({
  senderName: z.string().max(100, "tooLong"),
  senderContact: contactSchema,
  recipient: recipientSchema,
  date: z.string(),
  salutation: z.string().max(200, "tooLong"),
  bodyParagraphs: z.array(z.string().max(5000, "tooLong")),
  closing: z.string().max(200, "tooLong"),
});

export type CoverLetterFormValues = z.infer<typeof coverLetterFormSchema>;
export type RecipientFormValues = z.infer<typeof recipientSchema>;
