"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useEffect, useState } from "react";
import { useState } from "react";
// import { Client as ApiClient, Job as ApiJob, getJobsByClient } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Info, Loader2, TriangleAlert } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import Result from "./Result";
import { BlankPDFError, SinSaldoError } from "@/lib/errors";
import { CandidateAnalysisItem } from "@/app/types/AnalysisItem";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getCandidateAnalysis } from "@/lib/api/analisis";



export default function AnalyzeForm({ saldo }: { saldo: number }) {
  const [saldoRestante, setSaldoRestante] = useState<number>(saldo);
  // Estados para subir archivo
  const [file, setFile] = useState<File | null>(null);
  const { getToken } = useAuth();
  // Estados para errores y resultados
  const [result, setResult] = useState<CandidateAnalysisItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados para manejar clientes, trabajos y selecciones
  const [profesion, setProfesion] = useState<string>("");

  //Función para enviar el CV al endpoint /analyze/
  const handleSubmit = async () => {
    // Agregar esta linea cuando tengamos profesiones
    // if (!file || !selectedJob) {
    if (!file || !profesion) {
      setError("Sube un archivo y ponga una profesión.");
      return;
    }
    setError(null);
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);
    // Enviamos la profesión seleccionada
    formData.append("profesion", profesion);

    try {
      const token = await getToken();
      // TODO: usar el nuevo endpoint
      const response = await getCandidateAnalysis(formData, token);

      const data = await response.json();
      if (!response.ok) {
        // deberiamos usar otra manera para revisar si es cierto tipo de error
        // también, limpiar esta logica por que está muy confusa ahora
        if (data?.detail === "El archivo no contiene texto válido.") {
          throw new BlankPDFError("Error en la API.", data.detail);
        } else if (response.status === 403) {
          throw new SinSaldoError('Error en la API.', data.detail);
        } else {
          throw new Error(
            "Error en la API. Verifica que el backend esté en línea."
          );
        }
      }
      setResult(data);
      setSaldoRestante(data.usoRestante)
    } catch (err: unknown) {
      let errDetail = "Hubo un problema al analizar el CV.";
      if (err instanceof SinSaldoError) {
        errDetail = err.detail
        setSaldoRestante(0);
      }
      setError(
        `  ${err instanceof BlankPDFError
          ? "Error al analizar el CV: el archivo no contiene texto. Asegúrate de subir un PDF o DOCX con texto editable. No se admiten archivos escaneados."
          : errDetail
        }`
      );
    } finally {
      setLoading(false);
    }
  };
  const iconoSaldo = saldoRestante > 1 ? (<Info className="stroke-neutral-200" />) : (<TriangleAlert className="stroke-yellow-400" />);
  return (
    <Card className="w-full max-w-2xl bg-gray-900 text-white p-8 rounded-2xl shadow-lg border border-gray-800 m-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text pb-4">
          📄 Subir Currículum para Análisis
        </CardTitle>
        <Alert className="bg-slate-700 border-gray-800 text-grey-300 pt-4">
          {iconoSaldo}
          <AlertTitle>Te queda{saldoRestante !== 1 ? "n" : ""} {saldoRestante} intento{saldoRestante !== 1 ? "s" : ""}</AlertTitle>
          <AlertDescription>
            <a href="/candidate/payment" className="text-blue-300 hover:underline">Recarga tu saldo aquí</a>.
          </AlertDescription>
        </Alert>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 1er Campo: Profesión */}
        <div>
          <label className="text-gray-300 font-medium">Descripción del puesto de trabajo a aplicar:</label>
          <Textarea
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 p-2"
            // TODO: Cambiar a descripción de trabajo
            value={profesion}
            onChange={(e) => setProfesion(e.currentTarget.value)}
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
