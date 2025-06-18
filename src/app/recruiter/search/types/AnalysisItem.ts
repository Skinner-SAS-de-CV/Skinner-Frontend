import { z } from "zod/v4";

export const analysisItemSchema = z.object({
  id: z.number(),
  file_name: z.string(),
  job_title: z.string(),
  match_score: z.number().transform((val) => val * 10),
  name: z.string(),
  decision: z.string(),
  feedback: z.string(),
});

export const analysisItemsSchema = z.array(analysisItemSchema);

export type AnalysisItem = z.infer<typeof analysisItemSchema>;
