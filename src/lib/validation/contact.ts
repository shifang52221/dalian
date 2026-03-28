import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  company: z.string().trim().min(1, "Company is required"),
  email: z.email("Valid email is required"),
  phone: z.string().trim().min(1, "Phone is required"),
  locale: z.enum(["zh", "ja"]),
  message: z.string().trim().min(1, "Message is required"),
});

export type ContactInput = z.infer<typeof contactSchema>;
