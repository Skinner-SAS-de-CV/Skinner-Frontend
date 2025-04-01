"use client";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ChartSpline,
  CheckCircle,
  Database,
  Scale,
  Timer,
} from "lucide-react";
import Link from "next/link";

// Variantes para animaciones
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const fadeLeftVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">

        <section className="overflow-hidden w-full min-h-[90vh] text-center text-white mx-0 px-0">
          {/* Contenido de about */}
          <motion.div
          className="bg-transparent min-h-[90vh]  flex flex-col justify-center items-center text-center"
            initial="hidden"
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            variants={fadeInUpVariants}
          >

            {/* He puesto las lineas para colocar el video, pero aun no lo he probado si se ve.  */}
            <div className="absolute -z-10 inset-0 overflow-hidden w-screen h-full">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover brightness-[0.4]"
              >
                <source src="https://res.cloudinary.com/dgqogjfsz/video/upload/ac_none,vc_auto/v1743527056/msnwbyh9wdqcurbegunf.mp4" type="video/mp4" />
                Tu navegador no soporta el video HTML5.
              </video>
            </div>


            <h1 className="md:h-[70px] h-[150px] text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-6 px-3">
              Transformando la adquisición de talentos
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 max-w-3xl mx-auto">
              Aprovechamos la inteligencia artificial avanzada para revolucionar
              el proceso de contratación y ayudar a las empresas a encontrar la
              opción perfecta para sus equipos.
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Contáctanos <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </section>

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

        {/* Misión */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeLeftVariants}
          className="py-16 px-6 max-w-5xl mx-auto"
        >
          <h2 className="text-5xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-6">
            Nuestra Misión
          </h2>
          <p className="text-lg text-gray-300 text-center">
          Nos dedicamos a mejorar los procesos de reclutamiento y contratación a través de inteligencia artificial avanzada. 
          Nuestro objetivo es ayudar a las empresas a encontrar el mejor talento 
          de manera eficiente y precisa, transformando la forma en que las organizaciones forman sus equipos.
          </p>
        </motion.section>

        {/* Valores */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="py-16 px-6 bg-gray-800 max-w-5xl mx-auto rounded-lg shadow-xl"
        >
          <motion.h2
            variants={fadeInUpVariants}
            className="text-5xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-6"
          >
            Nuestros valores fundamentales
          </motion.h2>
          <motion.ul
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Transparencia",
                desc: "Operamos con honestidad y claridad en cada paso.",
              },
              {
                title: "Innovación",
                desc: "Implementamos tecnologías de IA de última generación para optimizar la selección de talento.",
              },
              {
                title: "Confianza",
                desc: "Priorizamos la seguridad y privacidad de la información de nuestros clientes.",
              },
            ].map((val, idx) => (
              <motion.li
                key={idx}
                variants={fadeInUpVariants}
                className="bg-gray-700 p-6 rounded-lg shadow-md"
              >
                <CheckCircle className="text-blue-400 mb-4 h-8 w-8" />
                <h3 className="text-xl font-semibold text-blue-300 mb-2">
                  {val.title}
                </h3>
                <p className="text-gray-300">{val.desc}</p>
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
          <motion.h2 className="md:h-[60px] h-[120px] text-5xl font-extrabold text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-5 bg-clip-text">
            ¿Por qué elegirnos?
          </motion.h2>
          <motion.div className="text-lg text-gray-300 mb-8">
            Nuestro equipo de expertos combina tecnología de punta con profundos
            conocimientos en gestión de talento para brindar un servicio preciso
            y eficiente. Nos destacamos por nuestra capacidad de analizar datos
            en profundidad y brindar insights estratégicos para la toma de
            decisiones en RRHH.
          </motion.div>
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-6"
          >
            {[
              {
                title: "Decisiones basadas en datos",
                desc: "Aproveche los conocimientos impulsados por inteligencia artificial para tomar decisiones de contratación más inteligentes.",
                icon: <Database className="inline align-super text-gray-200" />,
              },
              {
                title: "Eficiencia de tiempo",
                desc: "Agilice su proceso de reclutamiento y reduzca el tiempo de contratación.",
                icon: <Timer className="inline align-super text-gray-200" />,
              },
              {
                title: "Reducción de sesgo",
                desc: "Minimice los sesgos inconscientes en su proceso de selección de candidatos.",
                icon: <Scale className="inline align-super text-gray-200" />,
              },
              {
                title: "Soluciones escalables",
                desc: "Haga crecer su equipo sin esfuerzo con nuestra plataforma.",
                icon: (
                  <ChartSpline className="inline align-super text-gray-200" />
                ),
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                variants={fadeInUpVariants}
                className="bg-gray-700 p-6 rounded-lg shadow-md"
              >
                <h4>{f.icon}</h4>
                <h4 className="text-xl font-semibold text-blue-300 mb-2">
                  {f.title}
                </h4>
                <p className="text-gray-300">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
