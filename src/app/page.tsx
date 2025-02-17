"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";

const features = [
  {
    title: "Análisis basado en IA",
    description:
      "Nuestros algoritmos avanzados de IA brindan un análisis profundo de su CV, asegurando que presente lo mejor de sí mismo a los empleadores potenciales.",
    image: "/analisis.jpg",
  },
  {
    title: "Identificación de carencias de habilidades",
    description:
      "Identifique rápidamente las habilidades o experiencias faltantes que sean cruciales para el puesto que desea cubrir.",
    image: "/habilidades.jpg",
  },
  {
    title: "Seguro y Confidencialidad",
    description:
      "Tus datos son tratados con la máxima seguridad y confidencialidad, cumpliendo estrictos estándares de privacidad.",
    image: "/seguridad.jpg",
  },
];

function FeaturesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Ventajas de unirte a nuestro equipo
          </p>
        </div>

        <div className="mt-10 space-y-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Imagen */}
              <div className="md:w-1/2 flex justify-center">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={400}
                  height={250}
                  className="rounded-lg shadow-md"
                  priority
                />
              </div>

              {/* Tarjeta */}
              <motion.div whileHover={{ scale: 1.05 }} className="md:w-1/2 p-6">
                <Card className="bg-white shadow-xl transition-transform rounded-lg p-6 hover:shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-blue-600">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
                Nuestro sistema de reclutamiento, potenciado por inteligencia artificial, identifica y selecciona a los candidatos idóneos, optimizando
                el proceso y los tiempos de contratación.
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

        {/* Seccion abajo del boton */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Una empresa comprometida en el mejoramiento de los procesos administrativos.
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Expertos en <span className="font-bold text-blue-600">inteligencia artificial</span> y profesionales en materia de <span className="font-bold text-blue-600">gestión humana</span>, dedicados a <span className="font-bold text-blue-600">revolucionar</span> los procesos de administración de personal.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
