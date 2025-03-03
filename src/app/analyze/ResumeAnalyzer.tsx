"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { getClients, getJobsByClient, Client as ApiClient, Job as ApiJob } from "@/lib/api";

export default function ResumeAnalyzer() {
  // Estados para subir archivo
  const [file, setFile] = useState<File | null>(null);
  // Estados para errores y resultados
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados para manejar clientes, trabajos y selecciones
  const [clients, setClients] = useState<ApiClient[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [jobs, setJobs] = useState<ApiJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<string>("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://fastapi-resume-analyzer-production.up.railway.app";

  // 1. Al montar, obtener la lista de clientes
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClients(); 
        setClients(data);
        // Selecciona el primer cliente si hay alguno
        if (data.length > 0) {
          setSelectedClient(data[0].name);
        }
      } catch (err) {
        console.error("Error al obtener clientes:", err);
      }
    };
    fetchClients();
  }, []);

  // 2. Cada vez que cambie selectedClient, obtener los trabajos para ese cliente
  useEffect(() => {
    const fetchJobs = async () => {
      if (!selectedClient) return;
      try {
        const data = await getJobsByClient(selectedClient);
        setJobs(data);
        // Selecciona el primer trabajo si existe
        if (data.length > 0) {
          setSelectedJob(data[0].title);
        } else {
          setSelectedJob("");
        }
      } catch (err) {
        console.error("Error al obtener trabajos:", err);
      }
    };
    fetchJobs();
  }, [selectedClient]);

  // 3. Función para enviar el CV al endpoint /analyze/
  const handleSubmit = async () => {
    if (!file || !selectedClient || !selectedJob) {
      setError("⚠️ Por favor, sube un archivo, elige un cliente y un trabajo.");
      return;
    }
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    // Enviamos el trabajo seleccionado
    formData.append("job_title", selectedJob);
    // Enviamos el cliente seleccionado
    formData.append("client_name", selectedClient);

    try {
      const response = await fetch(`${API_URL}/analyze/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error en la API. Verifica que el backend esté en línea.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("❌ Hubo un problema al analizar el CV. Inténtalo de nuevo.");
      console.error("Error al analizar el currículum:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 p-6">
      <Card className="w-full max-w-2xl bg-gray-900 text-white p-8 rounded-2xl shadow-lg border border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
            📄 Subir Currículum para Análisis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 1er Dropdown: Cliente */}
          <div>
            <label className="text-gray-300 font-medium">Selecciona el Cliente:</label>
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 p-2"
            >
              {clients.map((client) => (
                <option key={client.id} value={client.name}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          {/* 2do Dropdown: Trabajo */}
          <div>
            <label className="text-gray-300 font-medium">Selecciona el Trabajo:</label>
            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 p-2"
            >
              {jobs.map((job) => (
                <option key={job.id} value={job.title}>
                  {job.title}
                </option>
              ))}
            </select>
          </div>

          {/* Cargar archivo */}
          <div>
            <label className="text-gray-300 font-medium">Sube tu CV (PDF/DOCX):</label>
            <Input
              type="file"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              accept=".pdf,.docx"
              className="bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
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
          {result && (
            <Card className="mt-6 bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Resultados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-white">
                <p><strong>📄 Archivo:</strong> {result.file_name}</p>
                <p><strong>📊 Puntaje:</strong> {result.match_score}</p>
                <p>
                  <strong>✅ Decisión:</strong>{" "}
                  <span
                    className={
                      result.decision === "Selected"
                        ? "text-green-400 font-bold"
                        : "text-red-400 font-bold"
                    }
                  >
                    {result.decision}
                  </span>
                </p>
                <p><strong>📌 Razón:</strong> {result.reason}</p>
                <p><strong>💡 Feedback de IA:</strong> {result.feedback}</p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
