import { z } from "zod";

const windowSchema = z.object({
  days: z.array(z.string()).min(1, "Select at least one day"),
  timeFrom: z.string().min(1, "Start time required"),
  timeTo: z.string().min(1, "End time required"),
  timezone: z.string().min(1, "Timezone required"),
});

export const settingsSchema = z.object({
  campaignName: z
    .string()
    .min(2, "Campaign name must be at least 2 characters")
    .max(100, "Max 100 characters"),
  sendingWindows: z.array(windowSchema).min(1, "At least one sending window required"),
  aiAssist: z.object({
    autoReply: z.boolean(),
    autoHandleLeads: z.boolean(),
    followUpCount: z.number().min(1).max(10),
  }),
  zapierEvents: z.object({
    responseReceived: z.boolean(),
    inviteSent: z.boolean(),
    invitationAccepted: z.boolean(),
    invitationWithdrawn: z.boolean(),
    followupSent: z.boolean(),
  }),
});
