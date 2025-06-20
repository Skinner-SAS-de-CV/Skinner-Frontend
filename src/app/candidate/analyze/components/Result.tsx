import Markdown from "react-markdown";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CandidateAnalisisPDF } from "./CandidateAnalisisPDF";
import { CandidateAnalysisItem } from "@/app/types/AnalysisItem";
import { Save } from "lucide-react";

export default function Result({ result }: { result: CandidateAnalysisItem }) {
  return (
    <Card
      className="mt-6 bg-gray-800 md:p-5 rounded-lg shadow-md border border-gray-700"
    >
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-white flex justify-between items-center">
          <h1>Resultados</h1>
          <div>
            <PDFDownloadLink
              document={<CandidateAnalisisPDF analysis={result} />}
              fileName={`${result.name} - ${result.profesion}`}
            >
              {({ loading }) => (loading ? "Cargando documento..." : <Save />)}
            </PDFDownloadLink>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-white">
        <div>
          <div className="pl-6 text-justify">
            <Markdown>{result.feedback.feedback}</Markdown>
            <div className="text-center">
              Información procesada por www.skinnersv.net
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
