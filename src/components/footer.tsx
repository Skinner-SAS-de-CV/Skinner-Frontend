import { Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-surface-900 text-white py-8 border-t border-brand-indigo/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contenedor principal en flex-col para apilar elementos en móviles */}
        <div className="flex flex-col md:flex-row items-center md:justify-between">
          {/* Contenedor para el texto con overflow horizontal */}
          <div className="text-md">
            <span>
              &copy; 2026 <span className="font-display">SKINNER</span> S.A.S de C.V.  </span>


             <div className="md:inline">&nbsp; Todos los Derechos Reservados.</div> 
          </div>
          {/* Enlaces a términos y privacidad */}
            <div className="mt-2 flex flex-col md:flex-row md:space-x-4 text-sm">
              <Link href="/terms" className="hover:underline">
                Términos y Condiciones
              </Link>
              <Link href="/privacy" className="hover:underline">
                Política de Privacidad
              </Link>
            </div>
          {/* Íconos de redes sociales en una fila */}
          <div className="flex flex-row space-x-4 items-center mt-4 md:mt-0">
            {/* Red social X */}
            <a
              href="https://x.com/skinner_sv"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-gold transition-colors duration-200"
            >
              
              <svg
                role="img"
                className="fill-white hover:fill-brand-gold h-6 w-6 transition-colors duration-200"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>X</title>
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>

            {/* Red social LinkedIn */}
            <a
              href="https://www.linkedin.com/in/skinner-sas-de-cv"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-gold transition-colors duration-200"
            >
              <svg
                role="img"
                className="fill-white hover:fill-brand-gold h-6 w-6 transition-colors duration-200"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>LinkedIn</title>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.026-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.899 1.637-1.849 3.369-1.849 3.601 0 4.267 2.369 4.267 5.452v6.288zM5.337 7.433c-1.144 0-2.07-.927-2.07-2.07 0-1.144.926-2.07 2.07-2.07s2.07.926 2.07 2.07c0 1.143-.926 2.07-2.07 2.07zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
              </svg>
            </a>

            {/* Mail */}
            <a
              href="mailto:info@skinnersv.net"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-gold transition-colors duration-200"
            >
              <Mail size={31} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
