'use client'
import AnalyzeForm from "./components/AnalyzeForm";
import { useState } from "react";

export default function ResumeAnalyzer() {
  const [mostrarDerecha, setMostrarDerecha] = useState<boolean>(false);
  const [mostarIzquierda, setMostrarIzquierda] = useState<boolean>(false);
  const toggleDerecha = () => setMostrarDerecha(prevState => !prevState);
  const toggleIzquierda = () => setMostrarIzquierda(prevState => !prevState);
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 bg-gray-950 md:px-6 py-6">
      <div>
        {mostarIzquierda &&<AnalyzeForm />}
      </div>
      <div>
        <AnalyzeForm toggleDerecha={toggleDerecha} toggleIzquierda={toggleIzquierda} />
      </div>
      <div>
        {mostrarDerecha && <AnalyzeForm />}
      </div>
    </div>
  );
}
