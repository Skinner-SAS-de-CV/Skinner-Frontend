import ResumeAnalyzer from "@/components/ResumeAnalyzer"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AnalyzePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-100 p-6">
        <ResumeAnalyzer />
      </main>
      <Footer />
    </div>
  )
}

