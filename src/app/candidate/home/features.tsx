"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle} from "lucide-react";
import Link from "next/link"; 

import { Button } from "@/components/ui/button";

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const features = [
  {
    title: "La sencillez se une con la inteligencia",
    description:
      "La simplicidad por sí sola no basta. Por eso la combinamos con inteligencia artificial de última generación.",
  },
  {
    title: "Carga sin complicaciones",
    description:
      "Subí tu currículum en PDF o DOCX y dejá que nuestra IA se encargue del resto. Sin formularios tediosos ni pasos innecesarios: solo resultados claros y útiles sobre tu perfil profesional.",
  },
  {
    title: "Precios transparentes, sin sorpresas",
    description:
      "Te mostramos desde el inicio cuánto cuesta y qué obtenés. Nuestro compromiso es con un servicio claro, ético y sin sorpresas desagradables.",
  },
  {
    title: "Descargá tu análisis en PDF",
    description:
      "Obtené un informe completo de tu perfil profesional listo para descargar en formato PDF. Ideal para compartir, guardar o simplemente tener a mano tu evolución.",
  },
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
      <div className="container mx-auto max-w-6xl">
        <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-500/20 shadow-xl overflow-hidden">
          <CardContent className="p-10">
            <motion.div variants={fadeInUpVariants} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¿Por qué deberias de elegirnos?
              </h2>
              
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUpVariants}
                  className="flex items-start gap-4"
                >
                  <CheckCircle className="text-blue-400 mt-1 self-start flex-shrink-0" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
                          {/* Botón Registrate */}
              <div className="flex justify-center mt-10">
                <Link href="/candidate/onboard">
                  <Button
                    size="lg"
                    className="px-6 py-6 text-white text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-full shadow-lg shadow-blue-700/20 w-full sm:w-auto"
                  >
                    Registrate <ArrowRight className="ml-2" />
                  </Button>
                </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
}
