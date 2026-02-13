"use client";
import React, { useEffect, useState } from "react";
import { easeOut, motion } from "framer-motion";
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
    <div className="relative bg-surface-900">
      <svg
        className="left-0 right-0 -top-1 text-surface-900 w-full z-10"
        viewBox="0 0 1440 50"
        fill="rgba(60, 90, 102, 3)" // Color oscuro con opacidad
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
  const [openLicense, setOpenLicense] = useState<
    null | "empresarial" | "corporativa"
  >(null);

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
    "Compatible con PDF, Word",
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
      transition: { duration: 2.2, times: [0, 0.2, 0.85, 1], ease: easeOut },
    },
  };

  // Animación del logo: aparece después de que el cuadro se oculta
  const logoAfterCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 3, duration: 2, ease: "easeOut" },
    },
  } as const;

  return (
    <div className="gradient-surface text-white min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden w-full min-h-[90vh] pt-30 pb-20 lg:pb-10 px-4 sm:px-6 lg:px-8">
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
              <h1 className="text-4xl sm:min-h-[100px] sm:text-5xl md:text-5xl font-extrabold gradient-brand-text font-display mb-6 text-center-justify">
                Encuentra el{" "}
                <span className="bg-linear-to-r bg-clip-text from-blue-500/60 to-purple-400/900 text-transparent">
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
                    className="px-6 py-6 text-lg gradient-cta text-surface-950 font-bold hover:brightness-110 rounded-full shadow-lg shadow-brand-indigo/20 w-full sm:w-auto"
                  >
                    Solicitar una demo
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="sm"
                    className="px-6 py-6 bg-linear-to-r from-brand-indigo to-brand-violet border-brand-indigo/50 text-white text-lg hover:brightness-110 shadow-brand-indigo/20 rounded-full w-full sm:w-auto"
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
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.6 } },
              }}
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
                        <AnimatedNumber value={95} suffix="%" duration={1.5} />
                      </div>
                      <div className="text-sm text-gray-400">
                        Match Promedio
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="text-3xl font-bold text-pink-400">
                        <AnimatedNumber value={3} suffix="min" duration={1.5} />
                      </div>
                      <div className="text-sm text-gray-400">
                        Tiempo Análisis
                      </div>
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
      <div className="relative -mt-4 sm:-mt-6 lg:-mt-12">
        <svg
          className="relative block w-full -translate-y-1 text-gray-800 z-20 pointer-events-none"
          viewBox="0 0 1440 50"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,10 C360,50 1080,0 1440,20 L1440,60 L0,60Z" />
        </svg>
      </div>

      {/* Sección: Grafo animado por CV (más dinámico) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center font-extrabold gradient-brand-text font-display leading-[1.2] md:leading-[1.15] pb-1 md:pb-2 mb-12">
            Visualización de matching por habilidades
          </h2>
          <ResumeMatchGraph
            height={520}
            resumes={[
              {
                name: "Ana Gómez",
                avatar: "/4.jpg",
                skills: ["Python", "SQL", "AWS", "Pandas", "Machine Learning"],
                experience: 3,
                education: "Lic. Informática",
                matchScore: 90,
              },
              {
                name: "Carlos Martínez",
                avatar: "/2.jpg",
                skills: ["JavaScript", "React", "TypeScript", "Node.js", "AWS"],
                experience: 5,
                education: "Ing. Sistemas",
                matchScore: 40,
              },
              {
                name: "María López",
                avatar: "/3.jpg",
                skills: ["Data Analysis", "SQL", "PowerBI", "Python", "AWS"],
                experience: 3,
                education: "Lic. Estadística",
                matchScore: 82,
              },
              {
                name: "Alberto Ruiz",
                avatar: "/1.jpg",
                skills: ["DevOps", "Docker", "Kubernetes", "AWS", "CI/CD"],
                experience: 2,
                education: "Ing. Informática",
                matchScore: 68,
              },
              {
                name: "Benjamín Torres",
                avatar: "/6.jpg",
                skills: [
                  "DevOps",
                  "Docker",
                  "Kubernetes",
                  "AWS",
                  "Python",
                  "Machine Learning",
                  "SQL",
                  "Deep Learning",
                ],
                experience: 5,
                education: "Data Science",
                matchScore: 92,
              },
              {
                name: "Joceline Watson",
                avatar: "/5.jpg",
                skills: ["DevOps", "Docker", "Kubernetes", "AWS", "CI/CD"],
                experience: 2,
                education: "Ing. Informática",
                matchScore: 50,
              },
            ]}
            jobRequirements={{
              skills: ["Python", "SQL", "AWS", "Machine Learning"],
              minExperience: 3,
              education: "Data Science",
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
            <h2 className="text-4xl md:text-5xl font-extrabold gradient-brand-text font-display mb-4">
              Características que transforman
            </h2>
            <p className="text-xl text-gray-300">
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
                <Card className="h-full rounded-2xl bg-surface-800/80 backdrop-blur-sm border border-surface-700/50 shadow-xl hover:border-brand-indigo/40 hover:shadow-brand-indigo/10 transition-all duration-300">
                  <CardContent className="p-6 md:p-7 h-full flex flex-col items-center text-center gap-2">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-brand-indigo/10 flex items-center justify-center text-brand-sky mb-3">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold mb-1 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
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
              <h2 className="text-4xl md:text-4xl font-extrabold gradient-brand-text font-display text-center mb-6">
                ¿Por qué elegir{" "}
                <span className="bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                  Skinner?
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Diseñado específicamente para recursos humanos modernos que
                buscan eficiencia y precisión
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center space-x-3 group">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-700 to-blue-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
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
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenLicense(
                          openLicense === "empresarial" ? null : "empresarial"
                        )
                      }
                      className="w-full flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <span>Licencia Empresarial</span>
                      <ChevronRight
                        className={`w-5 h-5 text-purple-400 transition-transform ${
                          openLicense === "empresarial" ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                    {openLicense === "empresarial" && (
                      <p className="text-sm text-gray-300 text-left">
                        Ideal para pymes, empresas sin departamento de RR. HH. y
                        empresas en crecimiento. Incluye acceso para varios
                        usuarios, actualizaciones periódicas y soporte por
                        correo.
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenLicense(
                          openLicense === "corporativa" ? null : "corporativa"
                        )
                      }
                      className="w-full flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <span>Licencia Corporativa</span>
                      <ChevronRight
                        className={`w-5 h-5 text-purple-400 transition-transform ${
                          openLicense === "corporativa" ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                    {openLicense === "corporativa" && (
                      <p className="text-sm text-gray-300 text-left">
                        Para grandes organizaciones con múltiples filiales.
                        Ofrece funcionalidades avanzadas y soporte dedicado.
                      </p>
                    )}
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
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white to-white mb-6">
            Más que un software,{" "}
            <span className="gradient-brand-text">
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
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUpVariants}
        className="py-20 px-4"
      >
        <div className="container mx-auto max-w-4xl">
          <Card className="relative bg-surface-800/90 backdrop-blur-sm border border-surface-700/50 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-brand-indigo/10 via-transparent to-brand-violet/10 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-brand-indigo via-brand-sky to-brand-violet" />
            <CardContent className="relative p-10">
              <motion.div variants={fadeInUpVariants} className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  ¿Listo para transformar su proceso de contratación?
                </h2>
                <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                  Descubra cómo nuestra plataforma impulsada por IA puede
                  ayudarle a encontrar los mejores talentos para su empresa de
                  manera más rápida y eficiente.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="mailto:info@skinnersv.net?subject=Solicitar un demo">
                    <Button
                      size="lg"
                      className="px-6 py-6 text-lg gradient-cta text-surface-950 font-bold hover:brightness-110 rounded-full shadow-lg shadow-brand-gold/20 w-full sm:w-auto"
                    >
                      Solicitar una demo
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="px-6 py-6 bg-white/10 border-0 text-white text-lg hover:bg-white/20 rounded-full w-full sm:w-auto transition-colors duration-200"
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
    </div>
  );
}
