import { AppNavbar as Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PageContainer({children}: React.PropsWithChildren) {
  return (
    <div className="min-h-screen">
      <Navbar className="bg-gray-900 text-white border-0" />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}
