export type AnalysisResponse = {
  file_name: string;
  match_score: number;
  decision: string; // talvez es un enum?
  feedback: {
    feedback: string;
  };
};
