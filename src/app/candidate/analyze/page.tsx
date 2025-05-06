import PageContainer from "@/components/pageContainer";
import AnalyzeForm from "./components/AnalyzeForm";

export default function Analyze() {
  return (
    <PageContainer>
      <div className="min-h-screen bg-gray-950 md:px-6 py-6">
        {/* Cambiále el nombre a este componente */}
        <AnalyzeForm />
      </div>
    </PageContainer>
  );
}
