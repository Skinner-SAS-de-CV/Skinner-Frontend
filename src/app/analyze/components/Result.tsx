import Markdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalysisResponse } from "./AnalysisResponse";
import { useRef } from "react";
import dynamic from "next/dynamic";

const GeneratePDF = dynamic(() => import("./GeneratePDF"), { ssr: false });

export default function Result({ result }: { result: AnalysisResponse }) {
  const cardRef = useRef(null);
  return (
    <Card
      ref={cardRef}
      className="mt-6 bg-gray-800 md:p-5 rounded-lg shadow-md border border-gray-700"
    >
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-white flex justify-between items-center">
          <h1>Resultados</h1>
          <GeneratePDF cardRef={cardRef} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-white">
        <div>
          <strong>📄 Archivo:</strong> {result.file_name}
        </div>
        <div>
          <strong>📊 Puntaje:</strong> {result.match_score}
        </div>
        <div>
          <strong>✅ Decisión:</strong>{" "}
          <span
            className={
              result.decision === "Selected"
                ? "text-green-400 font-bold"
                : "text-red-400 font-bold"
            }
          >
            {result.decision}
          </span>
        </div>
        <div>
          <strong>💡 Feedback de IA:</strong>
          <div className="pl-6">
            <Markdown>{result.feedback.feedback}</Markdown>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
