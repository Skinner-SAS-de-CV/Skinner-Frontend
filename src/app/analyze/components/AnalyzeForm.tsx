"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
import { ClientResponse, getClients } from "@/lib/api/cliente";
import { getJobsByClient, JobResponse } from "@/lib/api/trabajo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "@clerk/nextjs";
import { AnalysisResponse } from "./AnalysisResponse";
import Result from "./Result";
import { BlankPDFError } from "@/lib/errors";

export default function AnalyzeForm({
  toggleDerecha,
  toggleIzquierda,
}: {
  toggleDerecha?: () => void;
  toggleIzquierda?: () => void;
}) {
  // Estados para subir archivo
  const [file, setFile] = useState<File | null>(null);
  const { getToken } = useAuth();
  // Estados para errores y resultados
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados para manejar clientes, trabajos y selecciones
  const [clients, setClients] = useState<ClientResponse>();
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [jobs, setJobs] = useState<JobResponse>([]);
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [nombre, setNombre] = useState<string>("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = await getToken();
        const data = await getClients(token);
        setClients(data);
        // Selecciona el primer cliente si hay alguno
        if (data && data?.clientes?.length > 0) {
          setSelectedClient(String(data.clientes[0].id));
        }
      } catch (err) {
        console.error("Error al obtener clientes:", err);
      }
    };
    fetchClients();
  }, [getToken]);

  // Cada vez que cambie selectedClient, obtener los trabajos para ese cliente
  useEffect(() => {
    const fetchJobs = async () => {
      if (!selectedClient) return;
      try {
        const token = await getToken();
        const data = await getJobsByClient(selectedClient, token);
        setJobs(data);
        // Selecciona el primer trabajo si existe
        if (data.length > 0) {
          setSelectedJob(String(data[0].id));
        } else {
          setSelectedJob("");
        }
      } catch (err) {
        console.error("Error al obtener trabajos:", err);
      }
    };
    fetchJobs();
  }, [getToken, selectedClient]);

  //Función para enviar el CV al endpoint /analyze/
  const handleSubmit = async () => {
    if (!file || !selectedClient || !selectedJob) {
      setError("Sube un archivo, elige un cliente y un trabajo.");
      return;
    }
    setError(null);
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);
    // Enviamos el trabajo seleccionado
    formData.append("job_id", selectedJob);
    // Enviamos el cliente seleccionado
    formData.append("client_id", selectedClient);
    // Enviamos el nombre del cliente
    formData.append("nombre_del_candidato", nombre);

    try {
      const token = await getToken();
      const response = await fetch(`${API_URL}/analyze/`, {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
        // deberiamos usar otra manera para revisar si es cierto tipo de error
        if (data?.detail === "El archivo no contiene texto válido.") {
          throw new BlankPDFError("Error en la API.", data.detail);
        } else {
          throw new Error(
            "Error en la API. Verifica que el backend esté en línea."
          );
        }
      }

      setResult(data);
    } catch (err) {
      setError(
        `  ${
          err instanceof BlankPDFError
            ? "Error al analizar el CV: el archivo no contiene texto. Asegúrate de subir un PDF o DOCX con texto editable. No se admiten archivos escaneados."
            : "Hubo un problema al analizar el CV."
        }`
      );
      console.error("Error al analizar el currículum:", err);
    } finally {
      setLoading(false);
    }
  };
  const isSkinnerUser = clients?.name === "Skinner";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
    <Card className="w-full max-w-2xl bg-surface-900/80 backdrop-blur-sm text-white p-8 rounded-2xl shadow-2xl shadow-brand-indigo/5 border border-surface-700 relative overflow-hidden">
      {(toggleDerecha && toggleIzquierda) &&<div className="flex justify-between -mb-9">
        <Button className="bg-surface-900" onClick={toggleIzquierda}>&lt;</Button>
        <Button className="bg-surface-900" onClick={toggleDerecha}>&gt;</Button>
      </div>
      }
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center gradient-brand-text font-display">
          📄 Subir Currículum para Análisis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 1er Dropdown: Cliente */}
        {isSkinnerUser && <div>
          <label className="text-gray-300 font-medium">
            Selecciona el Cliente:
          </label>
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="w-full bg-surface-800 text-white border border-surface-700 rounded-lg focus:ring-2 focus:ring-brand-indigo p-2"
          >
            {clients?.clientes?.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>}

        {/* 2do Dropdown: Trabajo */}
        <div>
          <label className="text-gray-300 font-medium">
            Selecciona el Puesto:
          </label>
          <select
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
            className="w-full bg-surface-800 text-white border border-surface-700 rounded-lg focus:ring-2 focus:ring-brand-indigo p-2"
          >
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </select>
        </div>

        {/* Nombre de candidato */}
        <div>
          <label className="text-gray-300 font-medium">
            Nombre de Candidato:
          </label>
          <Input
            type="text"
            className="w-full bg-surface-800 text-white border border-surface-700 rounded-lg focus:ring-2 focus:ring-brand-indigo p-2"
            value={nombre}
            onChange={(e) => setNombre(e.currentTarget.value)}
          />
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
            className="file:text-white file:bg-brand-indigo file:rounded-md file:mr-3 file:px-2 file:pb-1 file:transition-all file:duration-300 file:shadow-lg bg-surface-800 text-white border border-surface-700 rounded-lg focus:ring-2 focus:ring-brand-indigo"
          />
        </div>

        {/* Botón para enviar */}
        <Button
          onClick={handleSubmit}
          className="w-full gradient-cta text-surface-950 font-semibold transition-all duration-300 shadow-lg"
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
    </motion.div>
  );
}
