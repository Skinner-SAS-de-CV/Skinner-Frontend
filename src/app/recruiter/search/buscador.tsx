'use client';
import React, { useState, useEffect, useCallback} from "react";
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
import { PDFCard } from "./components/PDFCard";

type AnalisisItem= {
  id: number;
  name: string;
  job_title: string;
  match_score: number;
  created_at: string;
  decision: string;
  feedback: string;
}

export default function ReclutadorDashboard() {
  const [analisis, setAnalisis] = useState<AnalisisItem[]>([]);
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [orderBy, setOrderBy] = useState("match_score");
  const [ascending, setAscending] = useState(false);
  const { getToken } = useAuth();

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
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen p-10">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {analisis.map((item) => (
          <PDFCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
