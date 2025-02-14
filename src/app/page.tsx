import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-100 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                Sistemas Inteligentes de Reclutamiento de Empleados.
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Nuestro sistema de reclutamiento, potenciado por inteligencia artificial, identifica y selecciona a los candidatos idoneos, optimizando 
              el proceso y los tiempos de contratación,
               asegurando una integración exitosa de el nuevo personal a los objetivos 
               de la empresa.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <Link href="/analyze">
                  <Button size="lg" className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0">
                    Empezar
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section id="who-we-are" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Una empresa conprometida en el mejoramiento de los procesos admistrativos.
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Expertos en <span className="font-bold text-blue-600">inteligencia artificial</span> y profesionales en materia de <span className="font-bold text-blue-600">gestión humana</span>, dedicados a <span className="font-bold text-blue-600">revolucionar</span> los procesos de administración de personal.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Ventajas de unirte a nuestro equipo.
            </p>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Análisis basado en IA",
                  description:
                    "Nuestros algoritmos avanzados de IA brindan un análisis profundo de su CV, lo que garantiza que presente lo mejor de sí mismo a los empleadores potenciales.",
                },
                
                {
                  title: "Identificación de carencias de habilidades",
                  description:
                    "Identifique rápidamente las habilidades o experiencias faltantes que sean cruciales para el puesto que desea cubrir.",
                },
                
                {
                  title: "Seguro y Confidencialidad",
                  description:
                    "Tus datos son tratados con la máxima seguridad y confidencialidad, cumpliendo estrictos estándares de privacidad.",
                },
              ].map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  )
}

