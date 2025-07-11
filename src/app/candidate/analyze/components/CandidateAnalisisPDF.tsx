import { Document, Page, Text, View, Image } from "windy-pdf";
import { renderToStaticMarkup } from "react-dom/server";
import Markdown from "react-markdown";
import Html from "react-pdf-html";
import { CandidateAnalysisItem } from "@/app/types/AnalysisItem";

const element = (el: string) => renderToStaticMarkup(<Markdown>{el}</Markdown>);

export const CandidateAnalisisPDF = ({
  analysis,
}: {
  analysis: CandidateAnalysisItem;
}) => (
  <Document>
    <Page size="A4" className="w-[90%] pb-10">
      <View className="mx-10 m-10" fixed>
        {/* Da un aviso de que requiere alt pero este componente no tiene ese prop */}
        <Image
          src="/skinner-logo5.png"
          className="w-[50px] h-[50px] rounded-lg object-cover"
        />
      </View>
      <View className="m-10">
        {/* Modificar fuente directamente */}
        <Html style={{ fontSize: 12, textAlign: "justify" }}>
          {element(analysis.feedback.feedback)}
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
