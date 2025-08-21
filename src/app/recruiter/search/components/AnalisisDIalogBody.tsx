import { AnalysisItem } from "@/app/types/AnalysisItem";
import Markdown from "react-markdown";

export function AnalisisDialogBody({ analysis }: { analysis: AnalysisItem }) {
  return (
    <div className="">
      {/* Información resumida */}
      <div className="grid grid-cols-2 gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <div>
          <h3 className="font-semibold">Puesto evaluado:</h3>
          <p>{analysis.job_title}</p>
        </div>
        <div>
          <h3 className="font-semibold">Calificación:</h3>
          <p>{analysis.match_score}</p>
        </div>
        <div>
          <h3 className="font-semibold">Decisión:</h3>
          <p
            className={`font-medium ${
              analysis.decision === "Alto"
              ? "text-green-500 font-bold"
              : analysis.decision === "Promedio Alto"
              ? "text-lime-500 font-bold"
              : analysis.decision === "Promedio Bajo"
              ? "text-yellow-500 font-bold"
              : analysis.decision === "Bajo"
              ? "text-orange-500 font-bold"
              : analysis.decision === "Deficiente"
              ? "text-red-600 font-bold"
              : "text-gray-500 font-bold"
            }`}
          >
            {analysis.decision}
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Archivo evaluado:</h3>
          <p className="truncate">{analysis.file_name}</p>
        </div>
      </div>

      {/* Feedback detallado */}
      <div className="prose dark:prose-invert max-w-none">
        <Markdown>{analysis.feedback}</Markdown>
      </div>
    </div>
  );
}
