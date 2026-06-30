import { z } from "zod";

export const campaignSettingsSchema = z.object({
  name: z.string().min(1, "Campaign name is required").max(100, "Name too long"),
  description: z.string().max(500, "Description too long").optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  timezone: z.string().default("UTC"),
  dailyLimit: z.coerce.number().min(0).max(100000).optional(),
  schedule: z.enum(["immediate", "scheduled"]).default("immediate"),
});

export const campaignSchema = z.object({
  type: z.enum(["linkedin", "csv", "leads", "webhook"]),
  audienceSource: z.enum(["linkedin", "csv", "leads", "webhook"]).optional(),
  workflowType: z.enum(["standard", "advanced"]).optional(),
  lookalikeIds: z.array(z.string()).optional(),
  settings: campaignSettingsSchema.optional(),
});

export const mappingSchema = z.object({
  mappings: z.record(z.string(), z.string()),
});

export const csvUploadSchema = z.object({
  file: z.instanceof(File, { message: "Please upload a CSV file" }).refine(
    (f) => f.size <= 10 * 1024 * 1024,
    "File size must be under 10MB"
  ),
});
