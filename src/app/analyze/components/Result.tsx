import Markdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalysisResponse } from "./AnalysisResponse";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { AnalisisPDF } from "@/components/AnalisisPDF";
import { Save } from "lucide-react";
import { analysisItemSchema } from "@/app/types/AnalysisItem";

export default function Result({ result }: { result: AnalysisResponse }) {
  // TODO: hacer llamada del backend retorno resultado con tipo AnalysisItem
  const analysis = analysisItemSchema.parse({
    ...result,
    feedback: result.feedback.feedback,
  });
  return (
    <Card className="mt-6 w-full w-auto bg-gray-800 rounded-lg shadow-md border border-gray-700 sm:-mx-2 md:-mx-8">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-white flex justify-between items-center">
          <h1>Resultados</h1>
          <PDFDownloadLink
            document={<AnalisisPDF analysis={analysis} />}
            fileName={`${analysis.name} - analisis.pdf`}
          >
            {({ loading }) => (loading ? "Cargando documento..." : <Save />)}
          </PDFDownloadLink>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-white">
        <div>
          <strong>📄 Archivo:</strong> {result.file_name}
        </div>
        <div>
          <strong>📊 Calificación:</strong> {analysis.match_score}
        </div>
        <div>
          <strong>✅ Puntaje:</strong>{" "}
          <span
            className={
              result.decision === "Alto"
            ? "text-green-500 font-bold"
            : result.decision === "Promedio Alto"
            ? "text-lime-500 font-bold"
            : result.decision === "Promedio Bajo"
            ? "text-yellow-500 font-bold"
            : result.decision === "Bajo"
            ? "text-orange-500 font-bold"
            : result.decision === "Deficiente"
            ? "text-red-600 font-bold"
            : "text-gray-500 font-bold"
            }
          >
            {result.decision}
          </span>
        </div>
        <div>
          <strong>💡 Análisis:</strong>
          <div className="p-6 rounded-lg">
            <div className="prose prose-sm md:prose-base max-w-none">
              <Markdown>{result.feedback.feedback}</Markdown>
            </div>
            <div className="text-center mt-6 pt-4 border-t text-sm text-gray-500">
              Información procesada por www.skinnersv.net
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
