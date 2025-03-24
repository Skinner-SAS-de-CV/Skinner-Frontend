"use client"

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo a la izquierda */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Menú para escritorio: enlaces y botón juntos los puse en el mismo contenedor*/}
        <div className="hidden sm:flex items-center space-x-6">
          <Link href="/" className="text-lg text-gray-300 hover:text-white transition">
            Home
          </Link>
          <Link href="/about" className="text-lg text-gray-300 hover:text-white transition">
            Quiénes Somos
          </Link>
        </div>

        {/* Botón de menú para móviles estilo hamburguesa */}
        <div className="sm:hidden">
          <button onClick={toggleMenu} className="text-lg text-gray-300 hover:text-white transition">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menú desplegable para móviles */}
      {isOpen && (
        <div className="sm:hidden px-8 pt-4 pb-6 space-y-4">
          <Link href="/" onClick={() => setIsOpen(false)} className="block text-lg text-gray-300 hover:text-white transition">
            Home
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="block text-lg text-gray-300 hover:text-white transition">
            Quiénes Somos
          </Link>
          <Link href="/analyze" onClick={() => setIsOpen(false)}>
            <Button className="w-full px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg">
              App
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
