'use client';
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@clerk/nextjs";
import TablaAnalisis from "./components/TablaAnalisis";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnalysisItem, analysisItemsSchema } from "../../types/AnalysisItem";
import { deleteAnalysis } from "@/lib/api/analisis";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function ReclutadorDashboard({ esPremium }: { esPremium: boolean }) {
  const [analisis, setAnalisis] = useState<AnalysisItem[]>([]);
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const { getToken } = useAuth();
  console.log("Es premium:", esPremium);

  useEffect( () => {
    const fetchAnalisis = async () => {
      const token = await getToken();
      if (!token) {
        console.error("No se pudo obtener el token de autenticación");
        return;
      }
    console.log("Token:", token); // Verifica que el token se obtenga correctamente
    const res = await fetch(
      `${BACKEND_URL}/analisis/?name=${name}&job_title=${jobTitle}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    const analisisItems = analysisItemsSchema.parse(data);
    setAnalisis(analisisItems);
    setTotalPages(Math.ceil(data.length / itemsPerPage));
    }
    fetchAnalisis();
  }, [name, jobTitle, getToken]);

  const handleDelete = async (id: number) => {
    const token = await getToken();
    await deleteAnalysis({ id, token });
    setAnalisis((prevAnalisis) => prevAnalisis.filter((item) => item.id !== id));
    setTotalPages(Math.ceil((analisis.length - 1) / itemsPerPage));
  };



  // Datos paginados (se corta el array para mostrar solo los de la página actual)
  const paginatedData = analisis.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="bg-linear-to-b from-gray-900 to-gray-800 text-white min-h-screen p-10">
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center">
        <Input
          placeholder="Nombre del candidato"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setCurrentPage(1); // Resetear a página 1 al buscar
          }}
          className="w-full md:w-64" 
        />
        <Input
          placeholder="Puesto de trabajo"
          value={jobTitle}
          onChange={(e) => {
            setJobTitle(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-64"
        />
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-6xl">
          <TablaAnalisis data={paginatedData} onDelete={handleDelete} /> 
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-2 mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-black border-white hover:bg-gray-400"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Atrás
        </Button>
        
        <span className="text-sm text-gray-300">
          Página {currentPage} de {totalPages}
        </span>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="text-black border-white hover:bg-gray-400"
        >
          Siguiente
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}