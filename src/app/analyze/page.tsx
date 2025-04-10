import { auth } from "@clerk/nextjs/server";
import ResumeAnalyzer from "../analyze/ResumeAnalyzer"
import PageContainer from "@/components/pageContainer"

export default async function AnalyzePage() {
  const { getToken } = await auth();
  const token = await getToken();
  return (
    <PageContainer>
      <ResumeAnalyzer token={token} />
    </PageContainer>
  )
}

