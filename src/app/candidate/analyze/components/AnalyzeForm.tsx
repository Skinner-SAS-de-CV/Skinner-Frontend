"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Info, Loader2, TriangleAlert, Upload } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import Result from "./Result";
import { API_URL } from "@/lib/api";
import { BlankPDFError, SinSaldoError } from "@/lib/errors";
import { CandidateAnalysisItem } from "@/app/types/AnalysisItem";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "motion/react";


const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function AnalyzeForm({ saldo }: { saldo: number }) {
  const [saldoRestante, setSaldoRestante] = useState<number>(saldo);
  const [file, setFile] = useState<File | null>(null);
  const { getToken } = useAuth();
  const [result, setResult] = useState<CandidateAnalysisItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profesion, setProfesion] = useState<string>("");
  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = async () => {
    if (!file || !profesion) {
      setError("Sube un archivo y ponga una profesión.");
      return;
    }
    setError(null);
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("profesion", profesion);

    try {
      const token = await getToken();
      const response = await fetch(`${BACKEND_URL || API_URL}/feedbackCandidate/`, {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
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

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const iconoSaldo = saldoRestante > 1 ? (<Info className="stroke-neutral-200" />) : (<TriangleAlert className="stroke-yellow-400" />);
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.05) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-brand-indigo/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-brand-sky/8 rounded-full filter blur-3xl" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="w-full max-w-2xl bg-surface-900/80 backdrop-blur-sm text-white p-8 rounded-2xl shadow-2xl shadow-brand-indigo/5 border border-surface-700 m-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-1.5 bg-gradient-to-b from-brand-indigo to-brand-violet" />
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center gradient-brand-text font-display pb-4">
              Subir Curriculum para Analisis
            </CardTitle>
            <Alert className="bg-surface-800 border-surface-700 text-grey-300 pt-4">
              {iconoSaldo}
              <AlertTitle>Te queda{saldoRestante !== 1 ? "n" : ""} {saldoRestante} intento{saldoRestante !== 1 ? "s" : ""}</AlertTitle>
              <AlertDescription>
                <a href="/candidate/payment" className="text-brand-sky hover:underline">Recarga tu saldo aquí</a>.
              </AlertDescription>
            </Alert>
          </CardHeader>
          <CardContent className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label className="text-gray-300 font-medium">Descripción del puesto de trabajo a aplicar:</label>
              <Textarea
                className="w-full bg-surface-800 text-white border border-surface-700 rounded-lg focus:ring-2 focus:ring-brand-indigo p-2"
                value={profesion}
                onChange={(e) => setProfesion(e.currentTarget.value)}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <label className="text-gray-300 font-medium mb-2 block">
                Sube tu CV (PDF/DOCX):
              </label>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-200 cursor-pointer ${
                  dragActive
                    ? "border-brand-gold bg-brand-gold/5"
                    : "border-surface-700 hover:border-brand-indigo/50 bg-surface-800/50"
                }`}
              >
                <Upload className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                <p className="text-gray-300 text-sm">
                  {file ? file.name : "Arrastra tu archivo aquí o haz clic para seleccionar"}
                </p>
                <p className="text-gray-500 text-xs mt-1">PDF o DOCX</p>
                <Input
                  type="file"
                  onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                  accept=".pdf,.docx"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                onClick={handleSubmit}
                className="w-full gradient-cta text-surface-950 font-semibold transition-transform duration-300 shadow-lg hover:scale-[1.02] active:scale-[0.98]"
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
            </motion.div>

            {error && <p className="text-red-400 text-center mt-2">{error}</p>}
            {result && <Result result={result} />}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
