export type AnalysisResponse = {
  id: number;
  file_name: string;
  match_score: number;
  decision: string; // talvez es un enum?
  name: string;
  job_title: string;
  feedback: {
    feedback: string;
  };
  created_at: string;
};
