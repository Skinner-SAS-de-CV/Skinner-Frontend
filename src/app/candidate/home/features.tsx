"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const features = [
  {
    title: "Plataforma amigable y accesible",
    description:
      "Con un diseño intuitivo y moderno, cada paso es claro y directo. No más complicaciones.",
  },
  {
    title: "Carga sin complicaciones",
    description:
      "Sube tu currículum en PDF o DOCX y deja que nuestra IA se encargue del resto. Sin formularios tediosos ni pasos innecesarios: solo resultados claros y útiles sobre tu perfil profesional.",
  },
  {
    title: "Precios transparentes, sin sorpresas",
    description:
      "Te mostramos desde el inicio cuánto cuesta y qué obtienes. Nuestro compromiso es con un servicio claro, ético y sin sorpresas desagradables.",
  },
  {
    title: "Descarga tu análisis en PDF",
    description:
      "Obten un informe completo de tu perfil profesional listo para descargar en formato PDF. Ideal para compartir, guardar o simplemente tener a mano tu evolución.",
  },
];

const pricingFeatures = [
  "Enfoque en diagnóstico con IA",
  "Sugerencias de mejoras",
  "Comparativo competitivo",
  "Reporte descargable en PDF",
];

export default function Features() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUpVariants}
      className="py-20 px-4"
    >
      {/* Contenedor para cards*/}
      <div className="container mx-auto max-w-6xl space-y-6">
        {/* CARD DE IMAGEN + PRECIOS */}
        <motion.div variants={fadeInUpVariants}>
          <Card className="bg-gradient-to-br from-gray-900/90 to-black/80 border-gray-700/50 shadow-2xl h-full rounded-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 h-full min-h-[500px]">
                {/* Lado Izquierdo - Imagen */}
                <div className="flex items-center justify-center bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-500/20 p-4 min-h-[500px] md:min-h-auto">
                  <div className="relative w-full h-full max-w-[400px] mx-auto">
                    <Image
                      src="/celu.png"
                      alt="celular foto"
                      fill
                      className="rounded-lg md:rounded-xl lg:rounded-2xl object-contain shadow-xl"
                      priority
                    />
                  </div>
                </div>

                {/* Lado Derecho - Precios */}
                <div className="p-6 md:p-10 flex flex-col justify-center">
                  <motion.div variants={fadeInUpVariants}>
                    <div className="inline-block bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                      ANÁLISIS PROFESIONAL
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">Precio</h3>
                    <div className="mb-6">
                      <span className="text-5xl font-bold text-white">$5.00</span>
                      <span className="text-gray-400 text-lg ml-2">/por 5 evaluaciones</span>
                    </div>

                    <div className="space-y-4 mb-8">
                      {pricingFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={20} />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link href="/candidate/signup" className="block">
                      <Button
                        size="lg"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-700/40"
                      >
                        Registrate
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CARD DE POR QUÉ ELEGIRNOS */}
        <motion.div variants={fadeInUpVariants}>
          <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-500/20 shadow-xl h-full">
            <CardContent className="p-6 md:p-10">
              <motion.div variants={fadeInUpVariants} className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  ¿Por qué deberías elegirnos?
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUpVariants}
                    className="flex items-start gap-4"
                  >
                    <CheckCircle className="text-blue-400 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 text-sm text-justify">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center mt-10">
                <Link href="/candidate/signup">
                  <Button
                    size="lg"
                    className="px-6 py-6 text-white text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-full shadow-lg shadow-blue-700/20 w-full sm:w-auto"
                  >
                    Regístrate <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}