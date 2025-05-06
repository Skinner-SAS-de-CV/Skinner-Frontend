"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useEffect, useState } from "react";
import { useState } from "react";
// import { Client as ApiClient, Job as ApiJob, getJobsByClient } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import { useAuth } from "@clerk/nextjs";
import { AnalysisCandidateResponse } from "./AnalysisCandidateResponse";
import Result from "./Result";

export default function AnalyzeForm() {
  // Estados para subir archivo
  const [file, setFile] = useState<File | null>(null);
  const { getToken } = useAuth();
  // Estados para errores y resultados
  const [result, setResult] = useState<AnalysisCandidateResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados para manejar clientes, trabajos y selecciones
  // const [jobs, setJobs] = useState<ApiJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<string>("");

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://fastapi-resume-analyzer-production.up.railway.app";

  // Obtener los trabajos para ese cliente
  // Usar cuando endpoint de profesiones exista
  // useEffect(() => {
  //   const fetchJobs = async () => {
  //     try {
  //       // Crear getJobs para obtener lista de profesiones
  //       const data = await getJobs();
  //       setJobs(data);
  //       // Selecciona el primer trabajo si existe
  //       if (data.length > 0) {
  //         setSelectedJob(String(data[0].id));
  //       } else {
  //         setSelectedJob("");
  //       }
  //     } catch (err) {
  //       console.error("Error al obtener profesiones:", err);
  //     }
  //   };
  //   fetchJobs();
  // }, []);

  //Función para enviar el CV al endpoint /analyze/
  const handleSubmit = async () => {
    // Agregar esta linea cuando tengamos profesiones
    // if (!file || !selectedJob) {
    if (!file) {
      setError("Sube un archivo y elige una profesión.");
      return;
    }
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    // Enviamos la profesión seleccionada
    formData.append("job_id", selectedJob);

    try {
      const token = await getToken();
      // TODO: usar el nuevo endpoint
      const response = await fetch(`${API_URL}/feedbackCandidate/`, {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(
          "Error en la API. Verifica que el backend esté en línea."
        );
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(" Hubo un problema al analizar el CV. Inténtalo de nuevo.");
      console.error("Error al analizar el currículum:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl bg-gray-900 text-white p-8 rounded-2xl shadow-lg border border-gray-800 m-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
          📄 Subir Currículum para Análisis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 1er Dropdown: Profesión */}
        <div>
          <label className="text-gray-300 font-medium">
            Selecciona la Profesión:
          </label>
          <select
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 p-2"
          >
            {/* {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))} */}
          </select>
        </div>

        {/* Cargar archivo */}
        <div>
          <label className="text-gray-300 font-medium">
            Sube tu CV (PDF/DOCX):
          </label>
          <Input
            type="file"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            accept=".pdf,.docx"
            className="file:text-white file:bg-gradient-to-r file:rounded-md file:mr-3 file:px-2 file:pb-1 file:from-blue-500 file:to-purple-600 file:transition-all file:duration-300 file:shadow-lg bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Botón para enviar */}
        <Button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 shadow-lg"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analizando...
            </>
          ) : (
            "Analizar Currículum"
          )}
        </Button>

        {error && <p className="text-red-400 text-center mt-2">{error}</p>}

        {/* Mostrar resultados */}
        {result && <Result result={result} />}
      </CardContent>
    </Card>
  );
}
