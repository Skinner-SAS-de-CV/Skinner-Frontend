"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ResumeMatchGraph } from "./components/ResumeMatchGraph";
import {
  FileText,
  Zap,
  Shield,
  TrendingUp,
  Check,
  Users,
  Brain,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
{
  /*
type Candidate = {
  name: string;
  title: string;
  score: number;
  avatar?: string;
}; */
}

{
  /* aca los logos de las empresas  lineas de abajo - 425-459
const partners = [
  { name: "asep", src: "/ccsb.png", href: "https://https://ccsbso.org" },
  {
    name: "llantas bariloche",
    src: "/llantas-bariloch_logo.png",
    href: "https://llantasbariloche.com/",
  },
]; */
}

function AnimatedNumber({
  value,
  suffix = "",
  duration = 1.2,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let frameId: number;

    const startValue = 0;
    const diff = value - startValue;
    const totalDuration = duration * 1000;

    const step = (timestamp: number) => {
      if (startTimestamp === null) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / totalDuration, 1);
      setDisplay(startValue + diff * progress);
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };
    {
      /* Wave Transition */
    }
    <div className="relative">
      <svg
        className="left-0 right-0 -top-1 text-gray-800 w-full z-10"
        viewBox="0 0 1440 50"
        fill="rgba(73, 80, 102, 1)" // Color oscuro con opacidad
        preserveAspectRatio="none"
      >
        <path d="M0,10 C360,50 1080,0 1440,20 L1440,60 L0,60Z" />
      </svg>
    </div>;
    frameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frameId);
  }, [value, duration]);

  return (
    <span>
      {Math.round(display)}
      {suffix}
    </span>
  );
}

export default function Companies() {
  const features = [
    {
      icon: <Brain className="w-8 h-8 md:w-9 md:h-9" />,
      title: "Matching Inteligente",
      description:
        "Algoritmo avanzado que compara candidatos con requisitos del puesto en segundos",
    },
    {
      icon: <FileText className="w-8 h-8 md:w-9 md:h-9" />,
      title: "Reportes PDF",
      description:
        "Genera análisis detallados y profesionales listos para compartir",
    },
    {
      icon: <Zap className="w-8 h-8 md:w-9 md:h-9" />,
      title: "Súper Sencillo",
      description: "Interfaz intuitiva que no requiere capacitación técnica",
    },
    {
      icon: <Users className="w-8 h-8 md:w-9 md:h-9" />,
      title: "Para Todos",
      description: "Ideal para empresas con o sin departamento de RRHH",
    },
  ];

  const benefits = [
    "Reduce el tiempo de selección en un 70%",
    "Elimina sesgos en el proceso de evaluación",
    "Análisis basado en habilidades y funciones reales",
    "Compatible con múltiples formatos de CV",
    "Escalable según tus necesidades",
    "Soporte técnico dedicado",
  ];

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  } as const;

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  } as const;

  // Animación del cuadro de métricas: aparece, se mantiene ~1.6s y desaparece
    const timeCardVariants = {
      hidden: { opacity: 0, scale: 0.98, y: 16 },
      visible: {
        opacity: [0, 1, 1, 0],
        scale: [0.98, 1, 1, 0.98],
        y: [16, 0, 0, 16],
        transition: { duration: 2.2, times: [0, 0.2, 0.85, 1], ease: "easeOut" },
      },
    };

  // Animación del logo: aparece después de que el cuadro se oculta
  const logoAfterCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { delay: 3, duration: 2, ease: "easeOut" } },
  } as const;

  return (
    <div className="bg-linear-to-b from-gray-900 to-gray-800 text-white min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden w-full min-h-[90vh] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Fondo */}
        <div className="absolute -z-10 inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.08) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />
          <div className="absolute -top-32 -left-32 w-[40rem] h-[40rem] bg-purple-600 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-[40rem] h-[40rem] bg-pink-600/20 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-block"></div>

              <h1 className="text-4xl sm:min-h-[100px] sm:text-5xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-6 px-3 text-center-justify">
                Encuentra el{" "}
                <span className="bg-linear-to-r from-purple-500 to-blue-900 text-transparent">
                  talento perfecto
                </span>{" "}
                en segundos
              </h1>

              <p className="text-xl text-gray-300 text-center-justify">
                Software inteligente de análisis curricular que automatiza tu
                proceso de selección. Fácil de usar, potente en resultados.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="mailto:info@skinnersv.net?subject=Solicitar un demo">
                  <Button
                    size="sm"
                    className="px-6 py-6 text-white text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-full shadow-lg shadow-blue-700/20 w-full sm:w-auto"
                  >
                    Solicitar una demo
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="sm"
                    className="px-6 py-6 bg-gradient-to-r from-purple-600 to-purple-700 border-blue-500/50 text-white text-lg hover:from-purple-700 hover:to-purple-900 shadow-purple-700/20 hover:text-white rounded-full w-full sm:w-auto"
                  >
                    Contactar con ventas
                  </Button>
                </Link>
              </div>

              {/* parte de logos de las empresas 

              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-3">
                  {partners.map((p, i) => (
                    <motion.a
                      key={p.name}
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      aria-label={`Abrir sitio de ${p.name}`}
                    >
                      <div className="h-10 w-28 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center px-2">
                        <Image
                          src={p.src}
                          alt={`Logo de ${p.name}`}
                          width={120}
                          height={60}
                          className="h-6 w-auto object-contain opacity-90 grayscale transition group-hover:grayscale-0 group-hover:opacity-100"
                          priority
                        />
                      </div>
                    </motion.a>
                  ))}
                </div>

                <p className="text-sm text-gray-400">
                  Estamos orgullosos de colaborar con nuestras primeras empresas
                  pioneras:
                </p>
              </div> */}
            </div>
            {/* grafico de tiempo analisis (secuencial: primero gráfico, luego logo) */}
            <motion.div
              className="relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.6 } } }}
            >
              {/* glow de fondo */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-900 to-blue-900 blur-3xl opacity-30"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              />

              {/* tarjeta del gráfico */}
              <motion.div
className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-8 min-h-[220px] md:min-h-[260px] border border-white/20 shadow-2xl"
                variants={timeCardVariants}
              >
<div className="space-y-3">
                  <div className="h-4 bg-gradient-to-r from-purple-400 to-transparent rounded w-3/4" />
                  <div className="h-4 bg-gradient-to-r from-pink-400 to-transparent rounded w-1/2" />
<div className="grid grid-cols-2 gap-3 pt-3">
<div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="text-3xl font-bold text-purple-400">
                        <AnimatedNumber value={95} suffix="%" duration={1.8} />
                      </div>
                      <div className="text-sm text-gray-400">Match Promedio</div>
                    </div>
<div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="text-3xl font-bold text-pink-400">
                        <AnimatedNumber value={3} suffix="min" duration={1.8} />
                      </div>
                      <div className="text-sm text-gray-400">Tiempo Análisis</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* logo Skinner que aparece después */}
              <motion.div
                className="absolute inset-0 z-10 flex items-center justify-center"
                variants={logoAfterCardVariants}
              >
                <div className="relative w-[clamp(160px,28vw,350px)] h-[clamp(180px,30vw,350px)]">
                  <Image
                    src="/skinner-logo5.png"
                    alt="Skinner"
                    fill
                    sizes="(max-width: 700px) 130px, (max-width: 800px) 200px, (max-width: 1024px) 170px, 160px"
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wave Transition */}
      <div className="relative -mt6 sm:-mt-8">
        <svg
          className="left-0 right-0 -top-1 text-gray-800 w-full z-10"
          viewBox="0 0 1440 50"
          fill="rgba(73, 80, 102, 1)" // Color oscuro con opacidad
          preserveAspectRatio="none"
        >
          <path d="M0,10 C360,50 1080,0 1440,20 L1440,60 L0,60Z" />
        </svg>
      </div>

      {/* Sección: Grafo animado por CV (más dinámico) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Visualización de matching por habilidades
          </h2>
          <ResumeMatchGraph
            height={520}
            resumes={[
              {
                name: "Ana Gómez",
                avatar: "/1.jpg",
                skills: ["Python", "SQL", "AWS", "Pandas", "Machine Learning"],
                experience: 4,
                education: "Lic. Informática",
                matchScore: 92,
              },
              {
                name: "Diego Pérez",
                avatar: "/2.jpg",
                skills: ["JavaScript", "React", "TypeScript", "Node.js", "AWS"],
                experience: 5,
                education: "Ing. Sistemas",
                matchScore: 88,
              },
              {
                name: "María López",
                avatar: "/3.jpg",
                skills: ["Data Analysis", "SQL", "PowerBI", "Python", "AWS"],
                experience: 3,
                education: "Lic. Estadística",
                matchScore: 84,
              },
              {
                name: "Luis Torres",
                avatar: "/4.jpg",
                skills: ["DevOps", "Docker", "Kubernetes", "AWS", "CI/CD"],
                experience: 6,
                education: "Ing. Informática",
                matchScore: 90,
              },
            ]}
            jobRequirements={{
              skills: ["Python", "SQL", "AWS", "Machine Learning"],
              minExperience: 3,
              education: "Lic.",
            }}
          />
        </div>
      </section>

      {/* Features Section */}
      <motion.section
        id="features"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUpVariants}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Características que{" "}
              <span className="bg-gradient-to-r from-blue-700 to-purple-800 bg-clip-text text-transparent">
                transforman
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Todo lo que necesitas para optimizar tu proceso de selección
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUpVariants}
                whileHover={{ y: -2 }}
              >
                <Card className="bg-gradient-to-br from-grey-900 to-blue-900/40 border-blue-500/20 shadow-xl h-full hover:border-blue-500/40 transition-colors">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 text-blue-400 mb-4 mx-auto">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-400 text-center">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 text-justify-center">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                ¿Por qué elegir{" "}
                <span className="bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                  Skinner?
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Diseñado específicamente para recursos humanos modernos que
                buscan eficiencia y precisión
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start space-x-3 group">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-700 to-purple-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Check className="w-4 h-4" />
                      </div>
                    </div>
                    <p className="text-gray-300 group-hover:text-white transition-colors">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 blur-3xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <Shield className="w-16 h-16 text-purple-400 mb-6" />
                <h3 className="text-2xl font-bold mb-4">
                  Sistema de Licencias Flexible
                </h3>
                <p className="text-gray-400 mb-6">
                  Escala según tus necesidades. Desde startups hasta grandes
                  corporaciones, tenemos el plan perfecto para ti.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span>Licencia Individual</span>
                    <ChevronRight className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span>Licencia Empresarial</span>
                    <ChevronRight className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span>Licencia Corporativa</span>
                    <ChevronRight className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Más que un software,{" "}
            <span className="bg-gradient-to-r from-blue-700 to-purple-800 bg-clip-text text-transparent">
              tu partner tecnológico
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
            También ofrecemos servicios de consultoría tecnológica especializada
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 hover:border-purple-500/50 transition-all">
              <TrendingUp className="w-12 h-12 text-purple-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-3">Machine Learning</h3>
              <p className="text-gray-400">
                Soluciones de IA personalizadas para tu negocio
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 hover:border-purple-500/50 transition-all">
              <Zap className="w-12 h-12 text-pink-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-3">
                Desarrollo de Software
              </h3>
              <p className="text-gray-400">
                Aplicaciones web y móviles de alta calidad
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 hover:border-purple-500/50 transition-all">
              <Brain className="w-12 h-12 text-purple-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-3">Consultoría Tech</h3>
              <p className="text-gray-400">
                Asesoramiento estratégico en transformación digital
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-linear-to-br from-purple-600 to-grey-800 backdrop-blur-xl rounded-2xl p-12 border border-white/10">
            <h2 className="text-4xl font-bold mb-6">
              ¿Listo para revolucionar tu proceso de selección?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Agenda una demo gratuita y descubre cómo TalentMatch AI puede
              transformar tu departamento de RRHH
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg shadow-purple-500/50 transform hover:scale-105 transition-all">
                Agendar Demo Gratuita
              </button>
              <button className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all">
                Hablar con Ventas
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
