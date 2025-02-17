"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";

// Configuración de tipografía global
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const features = [
  {
    title: "Análisis basado en IA",
    description:
      "Nuestros algoritmos avanzados de IA brindan un analizis profundo de la experiencia y conocimientos de los candidatos a evaluar, asegurando que puedan cumplir con las exigencias del puesto.",
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
    <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl text-blue-400">
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
                  className="rounded-lg shadow-lg border-2 border-blue-500"
                  priority
                />
              </div>

              {/* Tarjeta con mejor fondo y tipografía */}
              <motion.div whileHover={{ scale: 1.05 }} className="md:w-1/2 p-6">
                <Card className="bg-gradient-to-br from-gray-800 to-gray-700 shadow-lg shadow-blue-500/50 transition-transform rounded-xl p-6 hover:shadow-2xl border border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-blue-400">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{feature.description}</p>
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
    <div className={`${inter.className} flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white`}>
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 sm:text-6xl">
                Sistemas Inteligentes de Reclutamiento de Empleados.
              </h1>
              <p className="mt-4 max-w-md mx-auto text-lg text-gray-300 sm:text-xl md:max-w-3xl">
                Nuestro sistema de reclutamiento, potenciado por inteligencia artificial, identifica y selecciona a los candidatos idóneos, optimizando
                el proceso y los tiempos de contratación.
              </p>
            </motion.div>

            <div className="mt-8 flex justify-center">
              <motion.div 
                whileHover={{ scale: 1.1 }} 
                className="flex"
              >
                <Link href="/analyze">
                  <Button size="lg" className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg">
                    Empezar
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sección de Quiénes Somos */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.7 }}
              className="lg:text-center"
            >
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-blue-400 sm:text-4xl">
                Comprometidos con el mejoramiento de los procesos administrativos.
              </p>
              <p className="mt-4 max-w-2xl text-lg text-gray-300 lg:mx-auto">
                Expertos en <span className="font-bold text-blue-400">inteligencia artificial</span> y profesionales en <span className="font-bold text-blue-400">gestión humana</span>, dedicados a <span className="font-bold text-blue-400">revolucionar</span> la administración de personal.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
