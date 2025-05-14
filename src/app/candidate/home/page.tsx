import PageContainer from "@/components/pageContainer";
import CandidateHome from "./CandidateHome";
import Hero from "./hero"
import Contact from "./contact";

export default function AboutPage() {
  return (
    <PageContainer>
      <CandidateHome />
      <Hero />      
      <Contact />      
    </PageContainer>
  );
}
