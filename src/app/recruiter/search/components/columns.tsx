'use client';
import { ColumnDef } from "@tanstack/react-table";
import { AnalisisDialog } from "./AnalisisDialog";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type AnalisisItem = {
  decision: string;
  file_name: string;
  analysis_id: number;
  id: number;
  name: string;
  job_title: string;
  match_score: number;
  created_at: string;
  feedback: string | { feedback: string };
}

export const columns: ColumnDef<AnalisisItem>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Candidato",
  },
  {
    accessorKey: "job_title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-0 hover:bg-transparent"
      >
        Puesto
        <ArrowUpDown className="ml-2 h-3 w-3" />
      </Button>
    ),
  },
  {
    accessorKey: "match_score",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-0 hover:bg-transparent"
      >
        Calificación
        <ArrowUpDown className="ml-2 h-3 w-3" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center">{(Number (row.getValue("match_score"))* 10).toFixed(1)}</div>,
  },
  {
  accessorKey: "created_at",
  header: ({ column }) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="px-0 hover:bg-transparent"
    >
      Fecha
      <ArrowUpDown className="ml-2 h-3 w-3" />
    </Button>
  ),
  cell: ({ row }) => {
    const date = new Date(row.getValue("created_at"));
    const formattedDate = date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return <div>{formattedDate}</div>;
  },
},
 {
  id: "actions",
  header: "Análisis",
  cell: ({ row }) => {
    const analysisData = {
      ...row.original,
      nombre_del_candidato: row.original.name,
      feedback: {
        feedback: typeof row.original.feedback === 'string' 
          ? row.original.feedback 
          : row.original.feedback?.feedback || ""
      },
      
      file_name: row.original.file_name || "Archivo no disponible",
      decision: row.original.decision || "Sin decisión",
      analysis_id: row.original.analysis_id || row.original.id
    };
    return <AnalisisDialog analysis={analysisData} />;
  }
}
];