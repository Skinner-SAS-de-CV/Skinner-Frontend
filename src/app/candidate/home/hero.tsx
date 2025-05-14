import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <>
      <main className="flex-1">
        <section className="bg-gradient-to-b from-gray-900 to-gray-800 w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-6 px-3">
                  Bienvenidos a Skinner
                </h1>
                <p className="text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Skinner es una plataforma de análisis profundo de currículums y perfiles profesionales. 
                Usa modelos de lenguaje, psicometría y machine learning para revelar insights ocultos sobre talento humano y potencial de crecimiento.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/candidate/onboard">
                <Button
                  size="lg"
                  className="px-6 py-6 text-white text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-full shadow-lg shadow-blue-700/20 w-full sm:w-auto"
                >
                  Registrate <ArrowRight className="ml-2" />
                </Button>
              </Link>
                </div>
              </div>
              <div className="mx-auto lg:ml-auto">
                <Image
                  src="/impulsa.jpg"
                  alt="Hero Image"
                  width={500}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Funciones</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                ¿Te preguntas cómo hacer un currículum que destaque? Déjate guiar por la IA.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {[
                {
                  title: "Paso 1",
                  description:
                    "Crea tu cuenta en nuestra plataforma y accede a la sección de análisis de currículum.",
                },
                {
                  title: "Paso 2",
                  description: "Escribe tu profesion y sube tu currículum ya sea en PDF o Word.",
                },
                {
                  title: "Paso 3",
                  description: "Recibe un análisis detallado de tu currículum, incluyendo recomendaciones personalizadas segun tu profesion.",
                
                },
                
              ].map((feature, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="bg-gradient-to-b from-gray-900 to-gray-800 w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-6 px-3">Sobre nuestro analisis curricular.</h2>
                <p className="text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  ForLabJP is a template repository designed to help developers quickly start new projects with a solid
                  foundation. It includes all the modern tools and practices to build scalable web applications.
                </p>
                <p className="text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Created with a focus on developer experience and performance, ForLabJP helps you focus on building
                  features rather than setting up infrastructure.
                </p>
              </div>
              <div className="mx-auto lg:ml-auto">
                <Image
                  src="/skinner-logo5.png"
                  alt="imagen de Skinner"
                  width={300}
                  height={200}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

    </>
  )
}