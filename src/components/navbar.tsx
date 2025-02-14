import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";

export function Navbar() {
  return (
        <nav className="bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center">
        {/* Logo alineado a la izquierda */}
        <div className="flex items-center flex-1"> 
          <Logo />
        </div>

        {/* Enlaces alineados a la derecha */}
        <div className="hidden sm:flex space-x-8">
          <Link href="/" className="text-lg text-gray-300 hover:text-white transition">
            Home
          </Link>
          <Link href="/#who-we-are" className="text-lg text-gray-300 hover:text-white transition">
            Quiénes Somos
          </Link>
          <Link href="/contact" className="text-lg text-gray-300 hover:text-white transition">
            Contacto
          </Link>
        </div>

        {/* Botón a la derecha */}
        <div className="hidden sm:flex ml-8">
          <Link href="/analyze">
            <Button className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg">
              Go to App
            </Button>
          </Link>
        </div>
      </div>
    </nav>

  );
}
