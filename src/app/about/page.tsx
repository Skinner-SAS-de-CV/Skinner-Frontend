"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-20 px-6 max-w-6xl mx-auto text-center relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 -z-10"
          >
            <Image
              src="/placeholder.svg?height=400&width=800"
              alt="Abstract background"
              layout="fill"
              objectFit="cover"
              className="opacity-20"
            />
          </motion.div>
          <motion.h1
            {...fadeInUp}
            className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-6"
          >
            Transformando la adquisición de talentos
          </motion.h1>
          <motion.p {...fadeInUp} className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Aprovechamos la inteligencia artificial avanzada para revolucionar el proceso de 
          contratación y ayudar a las empresas a encontrar la opción perfecta para sus equipos.
          </motion.p>
          <motion.div {...fadeInUp}>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Aprenda más <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-6 max-w-5xl mx-auto">
          <motion.h2 {...fadeInUp} className="text-4xl font-bold text-blue-400 mb-6 text-center">
            Nuestra Misión
          </motion.h2>
          <motion.p {...fadeInUp} className="text-lg text-gray-300 text-center">
          Nos dedicamos a mejorar los procesos de reclutamiento y contratación a través de inteligencia artificial avanzada. 
          Nuestro objetivo es ayudar a las empresas a encontrar el mejor talento 
          de manera eficiente y precisa, transformando la forma en que las organizaciones forman sus equipos.
          </motion.p>
        </section>

        {/* Values Section */}
        <section className="py-16 px-6 bg-gray-800 max-w-5xl mx-auto rounded-lg shadow-xl">
          <motion.h2 {...fadeInUp} className="text-4xl font-bold text-blue-400 mb-10 text-center">
          Nuestros valores fundamentales
          </motion.h2>
          <motion.ul variants={stagger} initial="initial" animate="animate" className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Transparencia", desc: "Operamos con honestidad y claridad en cada paso." },
              { title: "Innovación", desc: "Implementamos tecnologías de IA de última generación para optimizar la selección de talento." },
              { title: "Confianza", desc: "Priorizamos la seguridad y privacidad de la información de nuestros clientes." },
            ].map((value, index) => (
              <motion.li key={index} variants={fadeInUp} className="bg-gray-700 p-6 rounded-lg shadow-md">
                <CheckCircle className="text-blue-400 mb-4 h-8 w-8" />
                <h3 className="text-xl font-semibold text-blue-300 mb-2">{value.title}</h3>
                <p className="text-gray-300">{value.desc}</p>
              </motion.li>
            ))}
          </motion.ul>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 px-6 max-w-5xl mx-auto text-center">
          <motion.h3 {...fadeInUp} className="text-4xl font-bold text-blue-400 mb-6">
          ¿Por qué elegirnos?
          </motion.h3>
          <motion.p {...fadeInUp} className="text-lg text-gray-300 mb-8">
          Nuestro equipo de expertos combina tecnología de punta con profundos conocimientos en gestión de talento para brindar un
servicio preciso y eficiente. Nos destacamos por nuestra capacidad de analizar datos en profundidad y brindar
insights estratégicos para la toma de decisiones en RRHH.
          </motion.p>
          <motion.div variants={stagger} initial="initial" animate="animate" className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Decisiones basadas en datos", desc: "Aproveche los conocimientos impulsados ​​por inteligencia artificial para tomar decisiones de contratación más inteligentes." },
              { title: "Eficiencia de tiempo", desc: "Agilice su proceso de reclutamiento y reduzca el tiempo de contratación." },
              { title: "Reducción de sesgo", desc: "Minimice los sesgos inconscientes en su proceso de selección de candidatos." },
              { title: "Soluciones escalables", desc: "Haga crecer su equipo sin esfuerzo con nuestra plataforma." },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp} className="bg-gray-700 p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-blue-300 mb-2">{feature.title}</h4>
                <p className="text-gray-300">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

