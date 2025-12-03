import PageContainer from "@/components/pageContainer";
import CandidateHome from "./hero";
import Hero from "./main-hero"
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
