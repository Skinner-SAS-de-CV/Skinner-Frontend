'use client';
import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { API_URL } from "@/lib/api";
import { useAuth } from "@clerk/nextjs";
import GeneratePDF from "../../../components/GeneratePDF";

interface AnalisisItem {
  id: number;
  name: string;
  job_title: string;
  match_score: number;
  created_at: string;
  decision: string;
}

export default function ReclutadorDashboard() {
  const [analisis, setAnalisis] = useState<AnalisisItem[]>([]);
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [orderBy, setOrderBy] = useState("match_score");
  const [ascending, setAscending] = useState(false);
  const { getToken } = useAuth();

  
  const rowRefs = React.useRef<Record<number, HTMLTableRowElement | null>>({});

  const fetchAnalisis = useCallback(async () => {
    const token = await getToken();
    const res = await fetch(
      `${API_URL}/analisis/?name=${name}&job_title=${jobTitle}&order_by=${orderBy}&ascending=${ascending}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    setAnalisis(data);
  }, [name, jobTitle, orderBy, ascending, getToken]);

  useEffect(() => {
    fetchAnalisis();
  }, [fetchAnalisis]);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen p-20">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Nombre del candidato"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Puesto de trabajo"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <Select onValueChange={(value) => setOrderBy(value)} defaultValue="match_score">
          <SelectTrigger>
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="match_score">Calificación</SelectItem>
            <SelectItem value="created_at">Fecha</SelectItem>
            <SelectItem value="job_title">Tipo de Trabajo</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setAscending(value === "asc")}>
          <SelectTrigger>
            <SelectValue placeholder="Orden" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascendente</SelectItem>
            <SelectItem value="desc">Descendente</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={fetchAnalisis}>Buscar</Button>
      </div>

      <div id="analisis" className="mt-12">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Puesto</TableHead>
              <TableHead>Calificación</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Descargar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {analisis.map((item) => (
              <TableRow
                key={item.id}
                ref={(el) => {
                  rowRefs.current[item.id] = el;
                }}
              >
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.job_title}</TableCell>
                <TableCell>{item.match_score.toFixed(2)}</TableCell>
                <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <GeneratePDF
                    cardRef={{ current: rowRefs.current[item.id] }}
                    name={`candidato_${item.id}.pdf`}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
