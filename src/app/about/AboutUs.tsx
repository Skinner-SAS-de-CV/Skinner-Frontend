"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  BarChartIcon as ChartSpline,
  CheckCircle,
  Database,
  Scale,
  Timer,
  Users,
  Lightbulb,
  Target,
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Variantes para animaciones
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

{/*const fadeLeftVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};*/}

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function AboutUs() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen">
      <main className="flex-grow">
        <section className="overflow-hidden w-full min-h-[90vh] text-center text-white mx-0 px-0 flex">
          {/* Contenido de about */}
          <motion.div
            className="bg-transparent min-h-[90vh]"
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
                <source
                  src="https://res.cloudinary.com/dgqogjfsz/video/upload/ac_none,vc_auto/v1743527056/msnwbyh9wdqcurbegunf.mp4"
                  type="video/mp4"
                />
                Tu navegador no soporta el video HTML5.
              </video>
            </div>
            </motion.div>          
          {/* Contenido Hero centrado */}
          <motion.div
            className="container m-auto px-4 z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
          >
            <h1 className="2xl:h-[70px] h-[140px] text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-6 px-3">
              Transformando la adquisición de talentos.
            </h1>

            <p className="text-lg md:text-xl text-white mb-8 max-w-3xl mx-auto">
              Aprovechamos la inteligencia artificial avanzada para revolucionar el proceso de contratación y ayudar a
              las empresas a encontrar la opción perfecta para sus equipos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="px-6 py-6 text-white text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-full shadow-lg shadow-blue-700/20 w-full sm:w-auto"
                >
                  Contáctanos <ArrowRight className="ml-2" />
                </Button>
              </Link>
              
            </div>
          </motion.div>
        </section>

        {/* Wave Transition */}
        <div className="relative">
          <svg
            className="absolute left-0 right-0 -top-1 text-gray-800 w-full"
            viewBox="0 0 1440 50"
            fill="currentColor"
            preserveAspectRatio="none"
          >
            <path d="M0,10 C360,50 1080,0 1440,20 L1440,60 L0,60Z" />
          </svg>
        </div>

        {/* Mission, Vision, Values Section */}
        <section className="py-20 px-4">
          <div className="mx-auto max-w-6xl lg:pt-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid md:grid-cols-3 gap-8"
            >
              {/* Mission */}
              <motion.div variants={fadeInUpVariants} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
                  Nuestra Misión
                </h2>
                <p className="text-gray-300">
                  Transformar y optimizar los procesos de gestión de talento humano mediante inteligencia artificial
                  avanzada y soluciones estratégicas de gestión tecnológica.
                </p>
              </motion.div>

              {/* Vision */}
              <motion.div variants={fadeInUpVariants} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
                  Nuestro Objetivo
                </h2>
                <p className="text-gray-300">
                  Facilitamos la automatización de los procesos de gestión humana, redefiniendo la forma en que las
                  organizaciones construyen equipos altamente efectivos.
                </p>
              </motion.div>

              {/* Team */}
              <motion.div variants={fadeInUpVariants} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
                  Nuestro Equipo
                </h2>
                <p className="text-gray-300">
                  Contamos con expertos en IA, recursos humanos y tecnología que trabajan juntos para ofrecer soluciones
                  innovadoras que transforman la forma de gestionar el talento.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto max-w-6xl px-4">
          <Separator className="my-8 bg-gray-700/50" />
        </div>

        {/* Valores */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="py-20 px-4"
        >
          <div className="container mx-auto max-w-6xl">
            <motion.h2
              variants={fadeInUpVariants}
              className="text-4xl md:text-5xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-12"
            >
              Nuestros valores fundamentales
            </motion.h2>

            <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Transparencia",
                  desc: "Operamos con honestidad y claridad en cada paso del proceso.",
                  icon: <CheckCircle className="text-blue-400 h-10 w-10" />,
                },
                {
                  title: "Innovación",
                  desc: "Utilizamos tecnologías de inteligencia artificial de última generación para optimizar continuamente la selección del talento.",
                  icon: <Lightbulb className="text-blue-400 h-10 w-10" />,
                },
                {
                  title: "Confianza",
                  desc: "Garantizamos la seguridad y privacidad absoluta de la información de nuestros clientes.",
                  icon: <CheckCircle className="text-blue-400 h-10 w-10" />,
                },
              ].map((val, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUpVariants}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-xl border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-blue-500/5"
                >
                  <div className="mb-6">{val.icon}</div>
                  <h3 className="text-2xl font-semibold text-blue-300 mb-4">{val.title}</h3>
                  <p className="text-gray-300 text-lg">{val.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Separator */}
        <div className="container mx-auto max-w-6xl px-4">
          <Separator className="my-8 bg-gray-700/50" />
        </div>

        {/* Por qué elegirnos */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
          className="py-20 px-4"
        >
          <div className="container mx-auto max-w-6xl">
            <motion.h2
              variants={fadeInUpVariants}
              className="md:h-[60px] text-4xl md:text-5xl text-center font-extrabold text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-6 bg-clip-text"
            >
              ¿Por qué elegirnos?
            </motion.h2>

            <motion.p variants={fadeInUpVariants} className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto text-center">
              Nuestro equipo de expertos combina tecnología avanzada con un profundo conocimiento tanto en gestión
              estratégica del talento humano como en consultoría especializada en tecnologías, ofreciendo soluciones
              integrales, precisas y eficaces.
            </motion.p>

            <motion.div variants={containerVariants} className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Decisiones basadas en datos",
                  desc: "Aproveche insights impulsados por inteligencia artificial para tomar decisiones estratégicas más acertadas.",
                  icon: <Database className="h-10 w-10 text-blue-400" />,
                },
                {
                  title: "Eficiencia de tiempo",
                  desc: "Agilice los procesos críticos de su organización, reduciendo significativamente los tiempos de selección, contratación e implementación tecnológica.",
                  icon: <Timer className="h-10 w-10 text-blue-400" />,
                },
                {
                  title: "Reducción de sesgo",
                  desc: "Minimice los sesgos inconscientes, asegurando decisiones más justas, inclusivas y objetivas.",
                  icon: <Scale className="h-10 w-10 text-blue-400" />,
                },
                {
                  title: "Soluciones escalables",
                  desc: "Expanda fácilmente su organización con soluciones flexibles que se adaptan eficientemente al crecimiento de su talento y tecnología.",
                  icon: <ChartSpline className="h-10 w-10 text-blue-400" />,
                },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUpVariants}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-xl border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-blue-500/5"
                >
                  <div className="mb-6">{f.icon}</div>
                  <h3 className="text-2xl font-semibold text-blue-300 mb-4">{f.title}</h3>
                  <p className="text-gray-300 text-lg">{f.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <div className="container mx-auto max-w-6xl px-4">
          <Separator className="my-8 bg-gray-700/50" />
        </div>

        {/* CTA Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
          className="py-20 px-4"
        >
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-500/20 shadow-xl overflow-hidden">
              <CardContent className="p-10">
                <motion.div variants={fadeInUpVariants} className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    ¿Listo para transformar su proceso de contratación?
                  </h2>
                  <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                    Descubra cómo nuestra plataforma impulsada por IA puede ayudarle a encontrar los mejores talentos
                    para su empresa de manera más rápida y eficiente.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="mailto:info@skinnersv.net?subject=Solicitar un demo&body=">
                      <Button
                        size="lg"
                        className="px-6 py-6 text-white text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-full shadow-lg shadow-blue-700/20 w-full sm:w-auto"
                      >
                        Solicitar una demo
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button
                        size="lg"
                        variant="outline"
                        className="px-6 py-6 bg-gradient-to-r from-purple-600 to-purple-700 border-blue-500/50 text-white text-lg hover:from-purple-700 hover:to-purple-900 shadow-purple-700/20 hover:text-white rounded-full w-full sm:w-auto"
                      >
                        Contactar con ventas
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </div>
        </motion.section>
      </main>
    </div>
  )
}
