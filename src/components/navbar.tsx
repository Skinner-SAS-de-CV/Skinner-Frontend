"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "@/components/logo";
import { Menu, X } from "lucide-react";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const { user } = useUser();
  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo a la izquierda */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Menú para escritorio: enlaces y botón juntos en el mismo contenedor */}
        <div className="hidden sm:flex items-center space-x-6">
          <Link href="/" className="text-lg text-gray-300 hover:text-blue-500">
            Home
          </Link>
          <Link
            href="/about"
            className="text-lg text-gray-300 hover:text-blue-500"
          >
            Quiénes Somos
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="block text-lg text-gray-300 hover:text-blue-500"
          >
            Contáctanos
          </Link>
          <SignedIn>
            <Link
              href="/candidate/analyze"
              onClick={() => setIsOpen(false)}
              className="block text-lg text-gray-300 hover:text-blue-500"
            >
              Analizar CV
            </Link>
            {user?.publicMetadata.role === "admin" && (
              <>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="block text-lg text-gray-300 hover:text-blue-500"
                >
                  Registrar
                </Link>
                <Link
                  href="/analyze"
                  onClick={() => setIsOpen(false)}
                  className="block text-lg text-gray-300 hover:text-blue-500"
                >
                  Analizar
                </Link>
                <Link
              href="/recruiter/search"
              onClick={() => setIsOpen(false)}
              className="block text-lg text-gray-300 hover:text-blue-500"
            >
              Buscador
            </Link>
              </>
            )}
            <UserButton />
          </SignedIn>
        </div>

        {/* Botón de menú para móviles estilo hamburguesa */}
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="text-lg text-gray-300 hover:text-white transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menú desplegable para móviles */}
      {isOpen && (
        <div className="sm:hidden px-8 pt-4 pb-6 space-y-4">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block text-lg text-gray-300 hover:text-blue-500"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block text-lg text-gray-300 hover:text-blue-500"
          >
            Quiénes Somos
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="block text-lg text-gray-300 hover:text-blue-500"
          >
            Contáctanos
          </Link>
          <SignedIn>
            <Link
              href="/candidate/analyze"
              onClick={() => setIsOpen(false)}
              className="block text-lg text-gray-300 hover:text-blue-500"
            >
              Analizar CV
            </Link>
            {user?.publicMetadata.role === "admin" && (
              <> 
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="block text-lg text-gray-300 hover:text-blue-500"
            >
              Registrar
            </Link>
            <Link
              href="/analyze"
              onClick={() => setIsOpen(false)}
              className="block text-lg text-gray-300 hover:text-blue-500"
            >
              Analizar
            </Link>

            <Link
              href="/recruiter/search"
              onClick={() => setIsOpen(false)}
              className="block text-lg text-gray-300 hover:text-blue-500"
            >
              Buscador
            </Link>
            </>)}
            <UserButton />
          </SignedIn>
        </div>
      )}
    </nav>
  );
}
