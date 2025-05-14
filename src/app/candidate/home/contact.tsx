"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link"; 




// Variantes para animaciones
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Contact() {
  return (
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
                Descubra cómo nuestra plataforma impulsada por IA puede ayudarle a encontrar los mejores talentos para
                su empresa de manera más rápida y eficiente.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="mailto:info@skinnersv.net?subject=Solicitar un demo">
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
  );
}