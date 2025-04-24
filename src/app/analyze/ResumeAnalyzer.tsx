import AnalyzeForm from "./components/AnalyzeForm";

export default function ResumeAnalyzer() {
  return (
    <div className="grid grid-rows-3 lg:grid-rows-2 xl:grid-rows-1 grid-flow-col gap-4 justify-center min-h-screen bg-gray-950 md:px-6 py-6">
      <div className="lg:col-start-1">
        <AnalyzeForm />
      </div>
      <div className="lg:col-start-2">
        <AnalyzeForm />
      </div>
      <div className="xl:col-start-3">
        <AnalyzeForm />
      </div>
    </div>
  );
}
