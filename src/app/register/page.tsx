import PageContainer from "@/components/pageContainer"
import RegisterJobForm from "../register/RegisterJobForm"
import { auth } from "@clerk/nextjs/server"

export default async function AnalyzePage() {
  const { getToken } = await auth();
  const token = await getToken();
  return (
    <PageContainer>
      <RegisterJobForm token={token} />
    </PageContainer>
  )
}

