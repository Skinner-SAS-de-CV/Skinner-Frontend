"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { ResumeMatchGraph } from './components/ResumeMatchGraph';
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
import Link from "next/link";
import Image from "next/image";

type Candidate = {
  name: string;
  title: string;
  score: number;
  avatar?: string;
};
{
  /* aca los logos de las empresas */
}
const partners = [
  { name: "asep", src: "/ccsb.png", href: "https://https://ccsbso.org" },
  {
    name: "llantas bariloche",
    src: "/llantas-bariloch_logo.png",
    href: "https://llantasbariloche.com/",
  },
];

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

function MatchGraph({
  jobTitle,
  candidates,
  height = 420,
  autoRotateMs = 2200,
}: {
  jobTitle: string;
  candidates: Candidate[];
  height?: number;
  autoRotateMs?: number;
}) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % candidates.length),
      autoRotateMs
    );
    return () => clearInterval(id);
  }, [autoRotateMs, candidates.length]);

  // Posiciones normalizadas (0-100) en círculo alrededor del centro (50,50)
  const center = { x: 50, y: 50 };
  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));
  // Usamos radios elípticos para separar mejor arriba/abajo y acercar izquierda/derecha
  const radiusX = 26; // menos ancho para que los laterales no se alejen mucho
  const radiusY = 44; // más alto para que top/bottom no se peguen al panel central
  const positions = candidates.map((_, i) => {
    const angle = (i / candidates.length) * Math.PI * 2 - Math.PI / 2; // inicia arriba
    const px = center.x + radiusX * Math.cos(angle);
    const py = center.y + radiusY * Math.sin(angle);
    // Evitar que se corten en los bordes
    return {
      x: clamp(px, 8, 92),
      y: clamp(py, 10, 90),
    };
  });

  return (
    <div className="relative w-full" style={{ height }}>
      {/* Glow background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 blur-3xl opacity-20 item-center" />

      {/* SVG lines layer */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#274cda" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8337e8" stopOpacity="0.9" />
          </linearGradient>
          v
        </defs>
        {candidates.map((c, i) => (
          <motion.line
            key={`line-${c.name}`}
            x1={center.x}
            y1={center.y}
            x2={positions[i]?.x ?? 50}
            y2={positions[i]?.y ?? 50}
            stroke={i === active ? "url(#lineGrad)" : "rgba(255,255,255,0.18)"}
            strokeWidth={1}
            strokeLinecap="round"
            initial={false}
            animate={
              i === active
                ? { strokeDashoffset: [12, 0] }
                : { strokeDashoffset: 0 }
            }
            transition={{
              repeat: i === active ? Infinity : 0,
              duration: 1.2,
              ease: "linear",
            }}
            strokeDasharray={i === active ? "4 6" : "0 0"}
          />
        ))}

        {/* orbit dots for aesthetics */}
        {candidates.map((c, i) => (
          <circle
            key={`dot-${c.name}`}
            cx={positions[i]?.x ?? 50}
            cy={positions[i]?.y ?? 50}
            r="0.7"
            fill="#ffffff"
            opacity={i === active ? 0.85 : 0.35}
          />
        ))}
      </svg>

      {/* Center node */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 w-[290px]">
        <p className="text-sm text-gray-300">Puesto objetivo</p>
        <div className="flex items-center justify-between mt-1">
          <h3 className="text-2xl font-bold">{jobTitle}</h3>
          <div className="relative w-12 h-12">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(#a78bfa ${
                  candidates[active].score * 3.6
                }deg, rgba(255,255,255,0.1) 0deg)`,
              }}
            />
            <div className="absolute inset-2 rounded-full bg-black/40 flex items-center justify-center text-sm">
              {candidates[active].score}%
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-gray-300">
          <div className="bg-white/5 rounded-lg p-2 text-center">
            Habilidades
          </div>
          <div className="bg-white/5 rounded-lg p-2 text-center">
            Experiencia
          </div>
          <div className="bg-white/5 rounded-lg p-2 text-center">Cultura</div>
        </div>
      </div>

      {/* Candidate nodes */}
      {candidates.map((c, i) => {
        const pos = positions[i] ?? center;
        const initials = c.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 4)
          .toUpperCase();
        return (
          <motion.div
            key={`cand-${c.name}`}
            className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer`}
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            onMouseEnter={() => setActive(i)}
            whileHover={{ scale: 1.05 }}
          >
            <div
              className={`relative w-16 h-16 rounded-full overflow-hidden border ${
                i === active
                  ? "border-purple-400/70 ring-4 ring-purple-500/20"
                  : "border-white/20"
              }`}
            >
              {c.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/40 to-pink-500/40 text-white font-semibold">
                  {initials}
                </div>
              )}
            </div>
            <div className="mt-2 text-center">
              <p
                className={`text-sm ${
                  i === active ? "text-white" : "text-gray-300"
                }`}
              >
                {c.name}
              </p>
              <p className="text-xs text-gray-400">{c.title}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
function GraphsCarousel({
  graphs,
  intervalMs = 5000,
}: {
  graphs: { title: string; candidates: Candidate[] }[];
  intervalMs?: number;
}) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setIdx((i) => (i + 1) % graphs.length),
      intervalMs
    );
    return () => clearInterval(id);
  }, [graphs.length, intervalMs]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 item-justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={graphs[idx].title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            <MatchGraph
              jobTitle={graphs[idx].title}
              candidates={graphs[idx].candidates}
              height={460}
              autoRotateMs={1700}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Companies() {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Matching Inteligente",
      description:
        "Algoritmo avanzado que compara candidatos con requisitos del puesto en segundos",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Reportes PDF",
      description:
        "Genera análisis detallados y profesionales listos para compartir",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Súper Sencillo",
      description: "Interfaz intuitiva que no requiere capacitación técnica",
    },
    {
      icon: <Users className="w-6 h-6" />,
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

  const graphs = [
    {
      title: "Data Scientist",
      candidates: [
        { name: "Diego", title: "Data Scientist", score: 95, avatar: "/1.jpg" },
        { name: "Ana", title: "ML Engineer", score: 88, avatar: "/2.jpg" },
        { name: "María", title: "Data Analyst", score: 79, avatar: "/3.jpg" },
        { name: "Luis", title: "MLOps", score: 84, avatar: "/4.jpg" },
      ] as Candidate[],
    },
    {
      title: "Frontend Developer",
      candidates: [
        { name: "Ana", title: "React Dev", score: 91, avatar: "/1.jpg" },
        { name: "Luis", title: "Vue Dev", score: 78, avatar: "/4.jpg" },
        { name: "María", title: "Next.js Dev", score: 86, avatar: "/3.jpg" },
        { name: "Diego", title: "Angular Dev", score: 72, avatar: "/2.jpg" },
      ] as Candidate[],
    },
    {
      title: "DevOps Engineer",
      candidates: [
        { name: "Luis", title: "DevOps", score: 90, avatar: "/4.jpg" },
        { name: "María", title: "SRE", score: 82, avatar: "/3.jpg" },
        { name: "Diego", title: "Cloud Engineer", score: 85, avatar: "/2.jpg" },
        { name: "Ana", title: "Platform Eng", score: 76, avatar: "/1.jpg" },
      ] as Candidate[],
    },
    {
      title: "Product Manager",
      candidates: [
        { name: "María", title: "PM", score: 88, avatar: "/3.jpg" },
        { name: "Ana", title: "Assoc. PM", score: 80, avatar: "/1.jpg" },
        { name: "Diego", title: "Growth PM", score: 83, avatar: "/2.jpg" },
        { name: "Luis", title: "Tech PM", score: 78, avatar: "/4.jpg" },
      ] as Candidate[],
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden w-full min-h-[90vh] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Fondo moderno: grid + blobs */}
        <div className="absolute -z-10 inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.08) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />
          <div className="absolute -top-32 -left-32 w-[40rem] h-[40rem] bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-[40rem] h-[40rem] bg-pink-600/20 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-block"></div>

              <h1 className="text-4xl sm:min-h-[100px] sm:text-5xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-6 px-3 text-center-justify">
                Encuentra el{" "}
                <span className="bg-gradient-to-r from-purple-700 to-blue-400 bg-clip-text text-transparent">
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

              {/* parte de logos de las empresas */}

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
              </div>
            </div>
            {/* grafico de tiempo analisis*/}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-blue-400 blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
                <div className="space-y-4">
                  <div className="h-4 bg-gradient-to-r from-purple-400 to-transparent rounded w-3/4"></div>
                  <div className="h-4 bg-gradient-to-r from-pink-400 to-transparent rounded w-1/2"></div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="text-3xl font-bold text-purple-400">
                        <AnimatedNumber value={95} suffix="%" duration={1.8} />
                      </div>
                      <div className="text-sm text-gray-400">
                        Match Promedio
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="text-3xl font-bold text-pink-400">
                        <AnimatedNumber value={3} suffix="min" duration={1.4} />
                      </div>
                      <div className="text-sm text-gray-400">
                        Tiempo Análisis
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección aparte: Carrusel de grafos 
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl  sm:text-4xl font-bold text-center mb-10">
            Match ideal
          </h2>
          <GraphsCarousel graphs={graphs} intervalMs={5000} />
        </div>
      </section>*/}

      {/* Sección: Grafo animado por CV (más dinámico) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">Visualización de matching por habilidades</h2>
          <ResumeMatchGraph
            height={520}
            resumes={[
              { name: 'Ana Gómez', avatar: '/1.jpg', skills: ['Python','SQL','AWS','Pandas','Machine Learning'], experience: 4, education: 'Lic. Informática', matchScore: 92 },
              { name: 'Diego Pérez', avatar: '/2.jpg', skills: ['JavaScript','React','TypeScript','Node.js','AWS'], experience: 5, education: 'Ing. Sistemas', matchScore: 88 },
              { name: 'María López', avatar: '/3.jpg', skills: ['Data Analysis','SQL','PowerBI','Python','AWS'], experience: 3, education: 'Lic. Estadística', matchScore: 84 },
              { name: 'Luis Torres', avatar: '/4.jpg', skills: ['DevOps','Docker','Kubernetes','AWS','CI/CD'], experience: 6, education: 'Ing. Informática', matchScore: 90 },
            ]}
            jobRequirements={{
              skills: ['Python','SQL','AWS','Machine Learning'],
              minExperience: 3,
              education: 'Lic.',
            }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Características que{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                transforman
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Todo lo que necesitas para optimizar tu proceso de selección
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all hover:transform hover:scale-105 cursor-pointer group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                ¿Por qué elegir{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
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
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
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
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
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
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-12 border border-white/10">
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
