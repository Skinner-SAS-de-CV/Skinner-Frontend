'use client';
import { ColumnDef } from "@tanstack/react-table";
import { AnalisisDialog } from "./AnalisisDialog";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type AnalisisItem = {
  id: number;
  name: string;
  job_title: string;
  match_score: number;
  created_at: string;
  feedback: string;
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
  },
  {
    id: "actions",
    header: "Analisis",
    cell: ({ row }) => (
      <AnalisisDialog
        title={row.original.name}
        feedback={row.original.feedback}
      />
    ),
  }
];