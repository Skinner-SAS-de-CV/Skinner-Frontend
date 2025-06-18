'use client';
import { ColumnDef } from "@tanstack/react-table";
import { AnalisisDialog } from "./AnalisisDialog";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnalysisItem } from "../types/AnalysisItem";


export const columns: ColumnDef<AnalysisItem>[] = [
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
    cell: ({ row }) => <div className="text-center">{row.getValue("match_score")}</div>,
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
      file_name: row.original.file_name || "Archivo no disponible",
      decision: row.original.decision || "Sin decisión",
      id: row.original.id
    };
    return <AnalisisDialog analysis={analysisData} />;
  }
}
];