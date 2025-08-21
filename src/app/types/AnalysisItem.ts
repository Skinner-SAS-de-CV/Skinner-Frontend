import { z } from "zod/v4";

export const analysisItemSchema = z.object({
  id: z.number(),
  file_name: z.string(),
  job_title: z.string(),
  match_score: z.number().transform((val) => val.toFixed(2)),
  name: z.string(),
  created_at: z.string(),
  decision: z.string(),
  feedback: z.string(),
});


export const candidateAnalysisItemSchema = analysisItemSchema.pick({name: true}).extend({
  profesion: z.string(),
  feedback: z.object({
    feedback: z.string(),
  })
})

export const analysisItemsSchema = z.array(analysisItemSchema);

export type AnalysisItem = z.infer<typeof analysisItemSchema>;
export type CandidateAnalysisItem = z.infer<typeof candidateAnalysisItemSchema>;
