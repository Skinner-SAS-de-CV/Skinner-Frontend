"use client";
import React, { useState } from "react";
import Markdown from "react-markdown";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { AnalisisPDF } from "./AnalisisPDF";
import { Save } from "lucide-react";

export type AnalysisData = {
  analysis_id: number;
  file_name: string;
  job_title: string;
  match_score: number;
  nombre_del_candidato: string;
  decision: string;
  feedback: {
    feedback: string;
  };
}

export function AnalisisDialog({ analysis }: { analysis: AnalysisData }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="text-blue-400 hover:underline">
          Ver análisis
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-4xl overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex flex-col space-between">
            <div>
              Análisis detallado - {analysis.nombre_del_candidato}
              </div>
            <div>
              <PDFDownloadLink document={<AnalisisPDF analysis={analysis} />} fileName={analysis.file_name}>
                {({ loading }) =>
                  loading ? "Cargando documento..." : <Save />
                }
              </PDFDownloadLink>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información resumida */}
          <div className="grid grid-cols-2 gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <div>
              <h3 className="font-semibold">Puesto evaluado:</h3>
              <p>{analysis.job_title}</p>
            </div>
            <div>
              <h3 className="font-semibold">Match Score:</h3>
              <p>{analysis.match_score.toFixed(2)}</p>
            </div>
            <div>
              <h3 className="font-semibold">Decisión:</h3>
              <p
                className={`font-medium ${
                  analysis.decision === "Puntaje Alto"
                    ? "text-green-500"
                    : analysis.decision === "Puntaje Medio"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {analysis.decision}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Archivo evaluado:</h3>
              <p className="truncate">{analysis.file_name}</p>
            </div>
          </div>

          {/* Feedback detallado */}
          <div className="prose dark:prose-invert max-w-none">
            <Markdown>{analysis.feedback.feedback}</Markdown>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
