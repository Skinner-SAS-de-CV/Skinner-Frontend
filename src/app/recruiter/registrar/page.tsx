import PageContainer from "@/components/pageContainer"
import RegisterJobForm from "./RegisterJobForm"
import { auth } from "@clerk/nextjs/server"
import { isPremium } from "@/lib/api/roles"


export default async function AnalyzePage() {
  const { getToken } = await auth();
  const token = await getToken();
  const { result: esPremium } = await isPremium(token);
  return (
    <PageContainer>
      <RegisterJobForm esPremium={esPremium} />
    </PageContainer>
  )
}

