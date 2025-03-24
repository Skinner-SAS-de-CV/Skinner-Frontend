import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import RegisterJobForm from "../register/RegisterJobForm"

export default function AnalyzePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="bg-gray-800 p-6">
        <RegisterJobForm />
      </main>
      
      <Footer />
    </div>
  )
}

