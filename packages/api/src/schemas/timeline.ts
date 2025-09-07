import z from "zod/v4";

export const timelineSchema = z.object({
  action: z.enum([
    "UPDATED_TITLE",
    "MOVED_SPACE",
    "RESOLVED",
    "REOPENED",
    "COMMENTED",
  ]),
  subjectType: z.string(),
  subjectId: z.string(),
  referenceType: z.string().optional(),
  referenceId: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});
