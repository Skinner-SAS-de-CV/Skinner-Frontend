import React, { useState, useEffect } from 'react';
import { FileText, Zap, Shield, TrendingUp, Check, Menu, X, Sparkles, Users, Brain, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Matching Inteligente",
      description: "Algoritmo avanzado que compara candidatos con requisitos del puesto en segundos"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Reportes PDF",
      description: "Genera análisis detallados y profesionales listos para compartir"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Súper Sencillo",
      description: "Interfaz intuitiva que no requiere capacitación técnica"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Para Todos",
      description: "Ideal para empresas con o sin departamento de RRHH"
    }
  ];

  const benefits = [
    "Reduce el tiempo de selección en un 70%",
    "Elimina sesgos en el proceso de evaluación",
    "Análisis basado en habilidades y funciones reales",
    "Compatible con múltiples formatos de CV",
    "Escalable según tus necesidades",
    "Soporte técnico dedicado"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                TalentMatch AI
              </span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="hover:text-purple-400 transition-colors">Características</a>
              <a href="#pricing" className="hover:text-purple-400 transition-colors">Licencias</a>
              <a href="#services" className="hover:text-purple-400 transition-colors">Servicios</a>
              <a href="#contact" className="hover:text-purple-400 transition-colors">Contacto</a>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/98 backdrop-blur-lg">
            <div className="px-4 pt-2 pb-4 space-y-2">
              <a href="#features" className="block py-2 hover:text-purple-400">Características</a>
              <a href="#pricing" className="block py-2 hover:text-purple-400">Licencias</a>
              <a href="#services" className="block py-2 hover:text-purple-400">Servicios</a>
              <a href="#contact" className="block py-2 hover:text-purple-400">Contacto</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-block">
                <span className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold border border-purple-500/30">
                  🚀 Análisis Curricular con IA
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
                Encuentra el{' '}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  talento perfecto
                </span>
                {' '}en segundos
              </h1>
              
              <p className="text-xl text-gray-300">
                Software inteligente de análisis curricular que automatiza tu proceso de selección. 
                Fácil de usar, potente en resultados.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg shadow-purple-500/50 transform hover:scale-105 transition-all">
                  Solicitar Demo Gratis
                </button>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 px-8 py-4 rounded-lg font-semibold text-lg transition-all">
                  Ver Precios
                </button>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-slate-900" />
                  ))}
                </div>
                <div>
                  <p className="text-sm text-gray-400">Más de 500+ empresas confían en nosotros</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
                <div className="space-y-4">
                  <div className="h-4 bg-gradient-to-r from-purple-400 to-transparent rounded w-3/4"></div>
                  <div className="h-4 bg-gradient-to-r from-pink-400 to-transparent rounded w-1/2"></div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="text-3xl font-bold text-purple-400">95%</div>
                      <div className="text-sm text-gray-400">Match Score</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="text-3xl font-bold text-pink-400">3min</div>
                      <div className="text-sm text-gray-400">Análisis</div>
                    </div>
                  </div>
                  <div className="pt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-400">Reporte Generado</span>
                    <FileText className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Características que{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                transforman
              </span>
            </h2>
            <p className="text-xl text-gray-400">Todo lo que necesitas para optimizar tu proceso de selección</p>
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
                ¿Por qué elegir{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  TalentMatch AI?
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Diseñado específicamente para recursos humanos modernos que buscan eficiencia y precisión
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start space-x-3 group">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Check className="w-4 h-4" />
                      </div>
                    </div>
                    <p className="text-gray-300 group-hover:text-white transition-colors">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 blur-3xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <Shield className="w-16 h-16 text-purple-400 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Sistema de Licencias Flexible</h3>
                <p className="text-gray-400 mb-6">
                  Escala según tus necesidades. Desde startups hasta grandes corporaciones, 
                  tenemos el plan perfecto para ti.
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
            Más que un software,{' '}
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
              <p className="text-gray-400">Soluciones de IA personalizadas para tu negocio</p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 hover:border-purple-500/50 transition-all">
              <Zap className="w-12 h-12 text-pink-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-3">Desarrollo de Software</h3>
              <p className="text-gray-400">Aplicaciones web y móviles de alta calidad</p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 hover:border-purple-500/50 transition-all">
              <Brain className="w-12 h-12 text-purple-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-3">Consultoría Tech</h3>
              <p className="text-gray-400">Asesoramiento estratégico en transformación digital</p>
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
              Agenda una demo gratuita y descubre cómo TalentMatch AI puede transformar tu departamento de RRHH
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

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <span className="font-bold">TalentMatch AI</span>
              </div>
              <p className="text-gray-400 text-sm">
                Transformando el futuro de los recursos humanos con tecnología inteligente
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Producto</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-purple-400">Características</a></li>
                <li><a href="#" className="hover:text-purple-400">Precios</a></li>
                <li><a href="#" className="hover:text-purple-400">Casos de Éxito</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-purple-400">Machine Learning</a></li>
                <li><a href="#" className="hover:text-purple-400">Desarrollo Software</a></li>
                <li><a href="#" className="hover:text-purple-400">Consultoría</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-purple-400">Soporte</a></li>
                <li><a href="#" className="hover:text-purple-400">Ventas</a></li>
                <li><a href="#" className="hover:text-purple-400">Documentación</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
            <p>© 2024 TalentMatch AI. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}