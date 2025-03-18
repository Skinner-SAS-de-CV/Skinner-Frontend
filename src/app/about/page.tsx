"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

// Variantes para fade
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const fadeLeftVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

// Variantes para contenedor con stagger
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Ajusta el retardo entre hijos
    },
  },
};

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Sección principal */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
          className="relative py-20 px-6 max-w-6xl mx-auto text-center overflow-hidden"
        >
          {/* Fondo abstracto */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 -z-10"
          >
            <Image
              src="/placeholder.svg?height=400&width=800"
              alt="Abstract background"
              fill
              className="object-cover opacity-40"
            />
          </motion.div>

          <motion.h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-6">
            Transformando la adquisición de talentos
          </motion.h1>
          <motion.p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Aprovechamos la inteligencia artificial avanzada para revolucionar el proceso de 
            contratación y ayudar a las empresas a encontrar la opción perfecta para sus equipos.
          </motion.p>
          <motion.div>
          <Link href="/register">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Empieza Ahora <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </motion.div>
        </motion.section>

        {/* Wave Transition  */}
        <div className="relative">
          <svg
            className="absolute left-0 right-0 -top-1 text-gray-800"
            viewBox="0 0 1440 50"
            fill="currentColor"
            preserveAspectRatio="none"
          >
            <path d="M0,10 C360,50 1080,0 1440,20 L1440,60 L0,60Z" />
          </svg>
        </div>

        {/* Misión */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeLeftVariants}
          className="py-16 px-6 max-w-5xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-blue-400 mb-6 text-center">
            Nuestra Misión
          </h2>
          <p className="text-lg text-gray-300 text-center">
            Nos dedicamos a mejorar los procesos de reclutamiento y contratación a través de inteligencia artificial avanzada. 
            Nuestro objetivo es ayudar a las empresas a encontrar el mejor talento 
            de manera eficiente y precisa, transformando la forma en que las organizaciones forman sus equipos.
          </p>
        </motion.section>

        {/* Wave Transition */}
        <div className="relative">
          <svg
            className="absolute left-0 right-0 -top-1 text-gray-800"
            viewBox="0 0 1440 50"
            fill="currentColor"
            preserveAspectRatio="none"
          >
            <path d="M0,10 C360,50 1080,0 1440,20 L1440,60 L0,60Z" />
          </svg>
        </div>

        {/* Nuestros valores */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="py-16 px-6 bg-gray-800 max-w-5xl mx-auto rounded-lg shadow-xl"
        >
          <motion.h2
            variants={fadeInUpVariants}
            className="text-4xl font-bold text-blue-400 mb-10 text-center"
          >
            Nuestros valores fundamentales
          </motion.h2>
          <motion.ul
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { title: "Transparencia", desc: "Operamos con honestidad y claridad en cada paso." },
              { title: "Innovación", desc: "Implementamos tecnologías de IA de última generación para optimizar la selección de talento." },
              { title: "Confianza", desc: "Priorizamos la seguridad y privacidad de la información de nuestros clientes." },
            ].map((value, index) => (
              <motion.li
                key={index}
                variants={fadeInUpVariants}
                className="bg-gray-700 p-6 rounded-lg shadow-md"
              >
                <CheckCircle className="text-blue-400 mb-4 h-8 w-8" />
                <h3 className="text-xl font-semibold text-blue-300 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-300">{value.desc}</p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>

        {/* Por qué elegirnos */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
          className="py-16 px-6 max-w-5xl mx-auto text-center"
        >
          <h3 className="text-4xl font-bold text-blue-400 mb-6">
            ¿Por qué elegirnos?
          </h3>
          <p className="text-lg text-gray-300 mb-8">
            Nuestro equipo de expertos combina tecnología de punta con profundos conocimientos en gestión de talento para brindar un
            servicio preciso y eficiente. Nos destacamos por nuestra capacidad de analizar datos en profundidad y brindar
            insights estratégicos para la toma de decisiones en RRHH.
          </p>
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-6"
          >
            {[
              {
                title: "Decisiones basadas en datos",
                desc: "Aproveche los conocimientos impulsados ​​por inteligencia artificial para tomar decisiones de contratación más inteligentes.",
              },
              {
                title: "Eficiencia de tiempo",
                desc: "Agilice su proceso de reclutamiento y reduzca el tiempo de contratación.",
              },
              {
                title: "Reducción de sesgo",
                desc: "Minimice los sesgos inconscientes en su proceso de selección de candidatos.",
              },
              {
                title: "Soluciones escalables",
                desc: "Haga crecer su equipo sin esfuerzo con nuestra plataforma.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUpVariants}
                className="bg-gray-700 p-6 rounded-lg shadow-md"
              >
                <h4 className="text-xl font-semibold text-blue-300 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-300">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
