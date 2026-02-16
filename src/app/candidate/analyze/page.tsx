import PageContainer from "@/components/pageContainer";
import AnalyzeForm from "./components/AnalyzeForm";
import { getSaldo } from "@/lib/api/candidato";
import { auth } from "@clerk/nextjs/server";

export default async function Analyze() {
  // Obtener el saldo del usuario y mostrarlo en el componente AnalyzeForm
  const { userId, getToken } = await auth();
  let saldo = 0;
  const token = await getToken();
  if (userId && token) {
    saldo = await getSaldo(userId, token);
  }
  return (
    <PageContainer>
      <div className="min-h-screen bg-surface-950 md:px-6 py-6">
        {/* Cambiále el nombre a este componente */}
        <AnalyzeForm saldo={saldo} />
      </div>
    </PageContainer>
  );
}
