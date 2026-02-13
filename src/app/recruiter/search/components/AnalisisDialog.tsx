"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { AnalisisPDF } from "@/components/AnalisisPDF";
import { Save } from "lucide-react";
import { AnalysisItem } from "../../../types/AnalysisItem";
import { AnalisisDialogBody } from "./AnalisisDIalogBody";

export function AnalisisDialog({ analysis }: { analysis: AnalysisItem }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="text-brand-sky hover:underline">
          Ver análisis
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-4xl overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex flex-row justify-between mr-5">
            <div>
              Análisis detallado - {analysis.name}
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

        <AnalisisDialogBody analysis={analysis} />

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
