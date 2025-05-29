import { AnalysisResponse } from "@/app/analyze/components/AnalysisResponse";
export type AnalysisCandidateResponse = Omit<
  AnalysisResponse,
  "file_name" | "match_score" | "decision" | "nombre_de_candidato"
>;
