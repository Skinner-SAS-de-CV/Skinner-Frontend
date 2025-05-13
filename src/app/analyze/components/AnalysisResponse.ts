export type AnalysisResponse = {
  file_name: string;
  match_score: number;
  decision: string; // talvez es un enum?
  nombre_de_candidato: string;
  feedback: {
    feedback: string;
  };
};
