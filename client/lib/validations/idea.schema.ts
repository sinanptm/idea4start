import * as z from "zod";

export const stages = [
  "idea", "validation", "prototype", "mvp", "launched"
] as const;

export const createIdeaSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  industries: z.array(z.string()).min(1, "Select at least one industry"),
  problemStatement: z.string().min(15, "Problem statement must be at least 15 characters"),
  stage: z.enum(stages, {
    required_error: "Please select a stage",
  }),
  tags: z.array(z.string()).min(1, "Add at least one tag"),
  uniqueValue: z.string().optional(),
  relatedUrls: z.array(z.string()).optional(),
  risks: z.string().optional(),
  businessModel: z.array(z.string()).min(1, "Select at least one business model")
});

export type CreateIdeaInput = z.infer<typeof createIdeaSchema>;