"use client"
import Image from "next/image"
import { Separator } from "@radix-ui/react-separator";
import { motion } from "framer-motion";
import { UserPlus, FileText, CheckCircle } from "lucide-react";


// Animation variants for framer-motion
const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

        export default function MainHero() {
          return (
            <>
              <main>
                <section className="bg-gradient-to-b from-gray-900 to-gray-800 w-full py-12 md:py-24 lg:py-32">
                  <div className="w-full">
                    <div className="flex flex-wrap justify-around px-4 gap-6">
                      <div className="lg:w-[40%]">
                        <h1 className="text-4xl sm:min-h-[100px] sm:text-5xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-6 px-3 ">
                          &quot;Revela el talento que hay debajo del papel.&quot;
                        </h1>
                        <p className="text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                          Tu currículum solo muestra una parte de tu historia. Nosotros te ayudamos a contarla mejor, mostrar lo que puedes lograr y destacar realmente en el mercado laboral.
                        </p>
                      </div>
                      {/* div de imagen */}
                      <div>
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

            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="bg-gradient-to-b from-gray-900 to-gray-800 text-white pb-9"
            >
              <div className="px-4 md:px-6">
                <motion.div
                  variants={fadeInUpVariants}
                  className="flex flex-col items-center justify-center space-y-4 text-center"
                >
                <div className="container mx-auto max-w-6xl px-4">
                  <Separator className="my-8 bg-gray-700/50" />
                </div>       
              
                  <div className="space-y-2">
                    <h2 className="text-4xl lg:min-h-[55px] sm:text-5xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-6 px-3">¿Te preguntás cómo hacer un currículum que destaque?</h2>
                  </div>
                    <p className="max-w-[900px] text-white text-center md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Registrate y sigue estos pasos.
                    </p>
                </motion.div>
                <motion.div
                  variants={containerVariants}
                  className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12"
                >
                  {[
                    {
                      title: "Paso 1",
                      desc: "Crea tu cuenta en nuestra plataforma y accede a la sección de análisis de currículum.",
                      icon: <UserPlus className="text-blue-400 h-10 w-10 mx-auto mb-4" />,
                    },
                    {
                      title: "Paso 2",
                      desc: "Escribe tu profesión y sube tu currículum ya sea en PDF o Word.",
                      icon: <FileText className="text-blue-400 h-10 w-10 mx-auto mb-4" />,
                    },
                    {
                      title: "Paso 3",
                      desc: "Recibe un análisis detallado de tu currículum, incluyendo recomendaciones personalizadas según tu profesión.",
                      icon: <CheckCircle className="text-blue-400 h-10 w-10 mx-auto mb-4" />,
                    },
                  ].map((step, idx) => (
                    <motion.div
                      key={idx}
                      variants={fadeInUpVariants}
                      className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-xl border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-blue-500/5 flex flex-col items-center text-center"
                    >
                      {step.icon}
                      <h3 className="text-2xl font-semibold text-blue-300 mb-4">{step.title}</h3>
                      <p className="text-gray-300 text-lg">{step.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.section>

        <section id="about" className="bg-gradient-to-b from-gray-900 to-gray-800 w-full py-12 md:py-24 lg:py-32 m-auto">
            <div className="flex flex-wrap justify-around px-4">
              <div className="lg:w-[40%]">
                <h2 className="text-4xl sm:text-5xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-6 px-3">Sobre nuestro analisis curricular.</h2>
                <p className="text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Nuestra plataforma analiza tu currículum y perfil profesional con inteligencia artificial y modelos de lenguaje avanzados. Detecta tus fortalezas, 
                habilidades ocultas y áreas de mejora para que sepas exactamente dónde estás y cómo avanzar. 
                Descubre tu potencial real y toma el control de tu crecimiento profesional.
                </p>
              </div>
              <div>
                <Image
                  src="/skinner-logo5.png"
                  alt="imagen de Skinner"
                  width={300}
                  height={200}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>      
        </section>

        <div className="container mx-auto max-w-6xl px-4">
                  <Separator className="my-8 bg-gray-700/50" />
                </div>
        
                {/* Wave Transition */}
                <div className="relative">
                  <svg

                  className="left-0 right-0 -top-1 text-gray-800 w-full z-10"
                  viewBox="0 0 1440 50"
                  fill="rgba(73, 80, 102, 1)" // Color oscuro con opacidad
                  preserveAspectRatio="none"
                >
                  <path d="M0,10 C360,50 1080,0 1440,20 L1440,60 L0,60Z" />
                </svg>
                </div>
      </main>

    </>
  )
}