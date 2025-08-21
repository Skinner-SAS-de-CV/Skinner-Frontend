import { Document, Page, Text, View, Image } from "windy-pdf";
import { renderToStaticMarkup } from "react-dom/server";
import Markdown from "react-markdown";
import Html from "react-pdf-html";
import { AnalysisItem } from "../app/types/AnalysisItem";

const element = (el: string) => renderToStaticMarkup(<Markdown>{el}</Markdown>);

export const AnalisisPDF = ({ analysis }: { analysis: AnalysisItem }) => (
  <Document>
    <Page size="A4" className="w-[90%] pb-10">
      <View className="mx-10 m-10" fixed>
        {/* Da un aviso de que requiere alt pero este componente no tiene ese prop */}
        <Image
          src="/skinner-logo5.png" 
          className="w-[50px] h-[50px] rounded-lg object-cover"
        />
      </View>
      <View className="grid grid-cols-2 gap-4 bg-gray-100 p-6 rounded-lg mx-10 text-sm">
        <Text>
          <Text className="font-semibold">Nombre de Candidato:</Text>
          <Text> {analysis.name}</Text>
        </Text>
        <Text>
          <Text className="font-semibold">Puesto evaluado:</Text>
          <Text> {analysis.job_title}</Text>
        </Text>
        <Text>
          <Text className="font-semibold">Calificación:</Text>
          <Text> {analysis.match_score}</Text>
        </Text>
        <Text>
          <Text className="font-semibold">Decisión:</Text>
          <Text
            className={`font-medium ${
              analysis.decision === "Alto"
                ? "text-green-500"
                : analysis.decision === "Promedio Alto"
                ? "text-lime-500"
                : analysis.decision === "Promedio Bajo"
                ? "text-yellow-500"
                : analysis.decision === "Bajo"
                ? "text-orange-500" 
                : analysis.decision === "Deficiente"
                ? "text-red-500"
                : "text-gray-500"

            }`}
          >
            {" "}
            {analysis.decision}
          </Text>
        </Text>
      </View>
      <View className="m-10">
        {/* Modificar fuente directamente */}
        <Html style={{ fontSize: 12, textAlign: "justify" }}>
          {element(analysis.feedback)}
        </Html>
      </View>
      <View fixed className="absolute bottom-5">
        <Text className="text-xs w-full text-center">
          &copy; 2025 SKINNER S.A.S de C.V.
        </Text>
      </View>
    </Page>
  </Document>
);
