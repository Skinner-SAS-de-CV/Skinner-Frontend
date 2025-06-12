'use client';
import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/lib/api";
import { useAuth } from "@clerk/nextjs";
import TablaAnalisis from "./components/TablaAnalisis";

type AnalisisItem = {
  id: number;
  name: string;
  job_title: string;
  match_score: number;
  created_at: string;
  feedback: string;
}

export default function ReclutadorDashboard() {
  const [analisis, setAnalisis] = useState<AnalisisItem[]>([]);
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const { getToken } = useAuth();

  const fetchAnalisis = useCallback(async () => {
    const token = await getToken();
    const res = await fetch(
      `${API_URL}/analisis/?name=${name}&job_title=${jobTitle}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    setAnalisis(data);
  }, [name, jobTitle, getToken]);

  useEffect(() => {
    fetchAnalisis();
  }, [fetchAnalisis]);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen p-10">
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center">
      <Input
        placeholder="Nombre del candidato"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full md:w-64" 
      />
      <Input
        placeholder="Puesto de trabajo"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        className="w-full md:w-64"
      />
    </div>

      <div className="flex justify-center">
        <div className="w-full max-w-6xl">
          <TablaAnalisis data={analisis} />
        </div>
      </div>
    </div>
  );
}