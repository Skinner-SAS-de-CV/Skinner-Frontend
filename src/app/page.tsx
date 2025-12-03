"use client";

import { cubicBezier, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Efecto de formas geométricas animadas
function ElegantShape({
  className = "",
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/8",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate: rotate }}
      transition={{ duration: 2.4, delay, ease: [0.23, 0.86, 0.39, 0.96] }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-linear-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/15",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.5 + i * 0.2, ease: cubicBezier(0.25, 0.4, 0.25, 1) },
    }),
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gray-900">
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-purple-500/5 blur-3xl" />

      {/* Formas geométricas animadas */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape delay={0.3} width={600} height={140} rotate={12} gradient="from-blue-500/15" className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]" />
        <ElegantShape delay={0.5} width={500} height={120} rotate={-15} gradient="from-purple-500/15" className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]" />
        <ElegantShape delay={0.4} width={300} height={80} rotate={-8} gradient="from-indigo-500/15" className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]" />
        <ElegantShape delay={0.6} width={250} height={90} rotate={20} gradient="from-teal-500/15" className="right-[10%] md:right-[15%] bottom-[10%] md:bottom-[15%]" />
        <ElegantShape delay={0.7} width={200} height={70} rotate={-25} gradient="from-pink-500/15" className="left-[15%] md:left-[20%] top-[5%] md:top-[10%]" />
        <ElegantShape delay={0.3} width={600} height={140} rotate={12} gradient="from-blue-500/15" className="right-[-10%] md:right-[-5%] top-[15%] md:top-[20%]" />

      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        {/* Logo agregado arriba del título */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          className="flex justify-center mb-6"
        >
          <div
            className="relative rounded-full shadow-lg"
            style={{
              width: 240,
              height: 230,
              overflow: "",
            }}
          >
            <Image
              src="/skinner-logo4.png"
              alt="Skinner Logo"
              fill
              sizes="230px"
              priority
              className="object-contain"
            />
          </div>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-600 md:px-12"
        >
          Sistemas inteligentes de gestión administrativa
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mt-6 text-lg sm:text-xl text-gray-200"
        >
          Nuestra plataforma integra inteligencia artificial avanzada y gestión
          estratégica del talento humano, optimizando los procesos administrativos
          y fortaleciendo la infrastructura tecnológica y operativa de las organizaciones.
        </motion.p>

        <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible" className="mt-8 flex justify-center gap-4 pb-6">
          <Link href="/about" className="">
            <Button size="lg" className="px-6 py-3 text-white text-lg bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg">
              Empresas
            </Button>
          </Link>
          <Link href="/candidate/home" className="">
            <Button size="lg" className="px-6 py-3 text-white text-lg bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg">
              Candidatos
            </Button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
