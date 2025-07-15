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
import { AnalysisItem } from "../../../types/AnalysisItem";
import { AnalisisDialogBody } from "./AnalisisDIalogBody";

export function AnalisisCompareDialog({
  analysises,
}: {
  analysises: AnalysisItem[];
}) {
  const [open, setOpen] = useState(false);
  const canSetOpenDialog = analysises.length >= 2;

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => canSetOpenDialog && setOpen(state)}
    >
      <div className="flex justify-end">
        <DialogTrigger asChild className="mb-6">
          <Button className="text-blue-400" disabled={analysises.length < 2}>
            Comparar Candidatos
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="max-h-[80vh] max-w-[90vw] overflow-auto">
        <DialogHeader>
          <DialogTitle className="grid auto-cols-auto grid-flow-col gap-6">
            {analysises.map((analysis) => (
              <div key={analysis.id}>{analysis.name}</div>
            ))}
          </DialogTitle>
        </DialogHeader>
        <div className="grid auto-cols-auto grid-flow-col gap-6">
          {analysises.map((analysis) => (
            <AnalisisDialogBody analysis={analysis} key={analysis.id} />
          ))}
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
