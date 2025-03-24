import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PageContainer({children}: React.PropsWithChildren) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="bg-gray-800 p-6">
        {children}
      </main>
      <Footer />
    </div>
  )
}
