import { z } from "zod";

export const linkedinSchema = z.object({
  searchUrl: z
    .string()
    .min(1, "LinkedIn URL is required")
    .url("Must be a valid URL")
    .refine((v) => v.includes("linkedin.com"), "Must be a LinkedIn URL"),
});
