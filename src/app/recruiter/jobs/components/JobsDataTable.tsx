"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export type JobRow = {
  id: number;
  title: string;
};

export const jobColumns: ColumnDef<JobRow>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const id = row.getValue("id") as number;
      return (
        <Link
          href={`/recruiter/jobs/${id}`}
          className="text-blue-300 hover:underline"
        >
          {id}
        </Link>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Puesto",
    cell: ({ row }) => {
      const id = row.getValue("id") as number;
      const title = row.getValue("title") as string;
      return (
        <Link
          href={`/recruiter/jobs/${id}`}
          className="text-blue-300 hover:underline"
        >
          {title}
        </Link>
      );
    },
  },
];

interface JobsDataTableProps {
  columns: ColumnDef<JobRow, unknown>[];
  data: JobRow[];
  onDelete: (id: number) => Promise<void>;
}

export function JobsDataTable({ columns, data, onDelete }: JobsDataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar este puesto?")) {
      setDeletingId(id);
      try {
        await onDelete(id);
        toast.success("Puesto eliminado correctamente");
      } catch (error) {
        toast.error("Error al eliminar el puesto");
        console.error(error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const columnsWithActions: ColumnDef<JobRow>[] = [
    ...columns,
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const id = row.getValue("id") as number;
        return (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(id)}
            disabled={deletingId === id}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            {deletingId === id ? "Eliminando..." : "Eliminar"}
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns: columnsWithActions,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full rounded-md border border-white/20 overflow-x-auto ">
      <Table className="w-full mx-auto">
        <TableHeader className="bg-white/10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Sin trabajos.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
