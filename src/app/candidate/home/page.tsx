import PageContainer from "@/components/pageContainer";
import CandidateHome from "./CandidateHome";
import Hero from "./hero"
import Features from "./features";

export default function AboutPage() {
  return (
    <PageContainer>
      <CandidateHome />
      <Hero />      
      <Features />      
    </PageContainer>
  );
}
