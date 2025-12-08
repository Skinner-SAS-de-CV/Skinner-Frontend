"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Briefcase, GraduationCap, Code, Award, Star } from "lucide-react";

export interface Resume {
  name: string;
  avatar: string;
  skills: string[];
  experience: number; // años
  education: string;
  matchScore: number;
}

interface ResumeMatchGraphProps {
  resumes: Resume[];
  jobRequirements: {
    skills: string[];
    minExperience: number;
    education: string;
  };
  height?: number;
}

export function ResumeMatchGraph({
  resumes,
  jobRequirements,
  height = 500,
}: ResumeMatchGraphProps) {
  const [activeResume, setActiveResume] = useState(0);
  const [animationCycle, setAnimationCycle] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar mobile para usar altura auto
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const onChange = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile("matches" in e ? e.matches : (e as MediaQueryList).matches);
    onChange(mql);
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  // Auto-cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveResume((prev) => (prev + 1) % resumes.length);
      setAnimationCycle((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [resumes.length]);

  const currentResume = resumes[activeResume];

  // Coincidencia de habilidades
  const matchedSkills = currentResume.skills.filter((skill) =>
    jobRequirements.skills.some(
      (req) => req.toLowerCase() === skill.toLowerCase()
    )
  );

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: isMobile ? "auto" : height }}
    >
      <div className="flex flex-col md:flex-row h-full md:items-stretch">
        <div className="flex-1 flex md:h-full md:items-stretch justify-center p-4 sm:p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeResume}
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="relative md:h-full md:w-full md:max-w-sm"
            >
              {/* Tarjeta CV */}
              <div className="w-full md:h-full max-w-sm bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl flex flex-col gap-3 md:justify-start">
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={currentResume.avatar || "/placeholder.svg"}
                      alt={currentResume.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
                    />
                    <motion.div
                      className="absolute -top-1 -right-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Star className="w-3 h-3 text-white fill-white" />
                    </motion.div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg">
                      {currentResume.name}
                    </h3>
                    <div className="flex items-center gap-1 text-md text-gray-400">
                      <Briefcase className="w-3 h-3" />
                      {currentResume.experience} años exp.
                    </div>
                  </div>
                </div>

                {/* Educación */}
                <div className="mb-4 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                    <GraduationCap className="w-4 h-4 text-purple-400" />
                    Educación
                  </div>
                  <p className="text-gray-300 text-sm font-medium">
                    {currentResume.education}
                  </p>
                </div>

                {/* Habilidades */}
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                    <Code className="w-4 h-4 text-blue-400" />
                    Habilidades
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentResume.skills.slice(0, 5).map((skill, idx) => {
                      const isMatched = matchedSkills.includes(skill);
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * idx }}
                          className={`px-2 py-1 rounded-lg text-xs font-medium ${
                            isMatched
                              ? "bg-green-500/20 text-green-300 border border-green-500/30"
                              : "bg-white/5 text-gray-400 border border-white/10"
                          }`}
                        >
                          {skill}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Efecto scanning */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent rounded-2xl pointer-events-none"
                initial={{ y: "-100%" }}
                animate={{ y: "200%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Centro: conexiones */}
        <div className="flex-1 flex items-center justify-center relative min-h-[220px] sm:min-h-[260px] md:min-h-0">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ overflow: "visible" }}
          >
            {/* Líneas con partícula */}
            {matchedSkills.map((_, idx) => {
              const startX = "5%";
              const startY = `${30 + idx * 15}%`;
              const endX = "95%";
              const endY = `${30 + idx * 15}%`;

              return (
                <g key={idx}>
                  {/* Línea */}
                  <motion.line
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 1, delay: idx * 0.2 }}
                  />

                  {/* Partícula animada */}
                  <motion.circle
                    cx={startX}
                    cy={startY}
                    r="4"
                    fill="url(#particleGradient)"
                    initial={{ cx: startX }}
                    animate={{ cx: [startX, endX] }}
                    transition={{
                      duration: 2,
                      delay: idx * 0.3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 1,
                    }}
                  />
                </g>
              );
            })}

            {/* Gradientes */}
            <defs>
              <linearGradient
                id="lineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#ec4899" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
              </linearGradient>
              <radialGradient id="particleGradient">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#a855f7" />
              </radialGradient>
            </defs>
          </svg>

          {/* Círculo central */}
          <motion.div
            key={animationCycle}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="relative z-10 w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/50 flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 animate-ping opacity-20" />
            <div className="relative text-center">
              <div className="text-3xl font-bold text-white">
                {currentResume.matchScore}%
              </div>
              <div className="text-xs text-purple-100 uppercase tracking-wide">
                Match
              </div>
            </div>
          </motion.div>
        </div>

        {/* Derecha: requisitos */}
        <div className="flex-1 flex md:h-full md:items-stretch justify-center p-4 sm:p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:h-full max-w-sm bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl flex flex-col gap-3 md:justify-start"
          >
            {/* Header */}
            <div className="flex gap-3 mb-4 pb-3 border-b border-white/10">
              <div className="w-14 h-12 rounded-md bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl md:text-2xl font-extrabold text-white text-center">
                  Requisitos del puesto
                </h3>
                <p className="text-md text-gray-400 text-center">
                  Data Science
                </p>
              </div>
            </div>

            {/* Skills requeridas */}
            <div className="mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                <Code className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">Habilidades requeridas</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {jobRequirements.skills.map((skill, idx) => {
                  const ok = matchedSkills.some(
                    (s) => s.toLowerCase() === skill.toLowerCase()
                  );
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * idx }}
                      className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        ok
                          ? "bg-green-500/20 text-green-300 border border-green-500/30"
                          : "bg-white/5 text-gray-400 border border-white/10"
                      }`}
                    >
                      {skill}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Experiencia */}
            <div className="mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <Award className="w-4 h-4 text-purple-400" />
                Experiencia
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">
                  {jobRequirements.minExperience}+ años
                </span>
                {currentResume.experience >= jobRequirements.minExperience && (
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                )}
              </div>
            </div>

            {/* Educación */}
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <GraduationCap className="w-4 h-4 text-purple-400" />
                Educación
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white font-medium text-sm">
                  {jobRequirements.education}
                </span>
                {currentResume.education
                  .toLowerCase()
                  .includes(jobRequirements.education.toLowerCase()) && (
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Indicadores inferiores */}
      <div className="mt-4 md:absolute md:bottom-4 md:left-1/2 md:-translate-x-1/2 flex justify-center gap-2">
        {resumes.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => setActiveResume(idx)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              idx === activeResume ? "w-8 bg-purple-500" : "w-2 bg-white/20"
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </div>
  );
}
