import PageContainer from "@/components/pageContainer";
import Buscador from "./buscador";
import { auth } from "@clerk/nextjs/server";
import { isPremium } from "@/lib/api/roles";

export default async function ReclutadorDashboard() {
  const {getToken } = await auth();
  const token = await getToken();
  const { result: esPremium } = await isPremium(token);
  return (
    <PageContainer>
      <Buscador esPremium={esPremium} />
    </PageContainer>
  );
}
