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
import { useState } from "react";
import { AnalisisCompareDialog } from "@/app/recruiter/search/components/AnalisisCompareDialog";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onDelete?: (id: number) => Promise<void>;
}

export function AnalisisDataTable<
// TODO: investigar por que tenemos que usar extend
  AnalysisItem extends {
    id: number;
    file_name: string;
    job_title: string;
    match_score: string;
    name: string;
    created_at: string;
    decision: string;
    feedback: string;
  },
  TValue
>({ columns, data, onDelete }: DataTableProps<AnalysisItem, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (!onDelete) return;
    if (confirm("¿Estás seguro de que deseas eliminar este análisis?")) {
      setDeletingId(id);
      try {
        await onDelete(id);
        toast.success("Análisis eliminado correctamente");
      } catch (error) {
        toast.error("Error al eliminar el análisis");
        console.error(error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const columnsWithDelete: ColumnDef<AnalysisItem, TValue>[] = onDelete
    ? [
        ...columns,
        {
          id: "delete",
          header: "Eliminar",
          cell: ({ row }) => {
            const id = row.original.id;
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
      ]
    : columns;

  const table = useReactTable({
    data,
    columns: columnsWithDelete,
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
  });

  return (
    <>
      <AnalisisCompareDialog
        analysises={data.filter((_datum, idx) =>
          Object.keys(rowSelection).includes(String(idx))
        )}
      />
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
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="data-[state=selected]:bg-gray-500"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sin resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
