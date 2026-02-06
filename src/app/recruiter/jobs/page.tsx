import PageContainer from "@/components/pageContainer";
import JobsList from "./JobsList";
import { auth } from "@clerk/nextjs/server";
import { isPremium } from "@/lib/api/roles";

export default async function TrabajosPage() {
  const { getToken }= await auth();
  const token = await getToken();
  const { result: esPremium } = await isPremium(token);
  return (
    <PageContainer>
      <JobsList esPremium={esPremium} />
    </PageContainer>
  );
}
