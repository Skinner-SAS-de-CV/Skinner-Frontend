
import AnalyzeForm from "./components/AnalyzeForm";

export default function ResumeAnalyzer({ token }: { token: string | null }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 md:px-6 py-6">
      <AnalyzeForm token={token} />
    </div>
  );
}
