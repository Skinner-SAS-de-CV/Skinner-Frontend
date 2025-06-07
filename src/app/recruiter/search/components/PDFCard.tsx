'use client';
import React, { useRef } from "react";
import GeneratePDF from "../../../../components/GeneratePDF";
import("../../../../components/GeneratePDF");

interface AnalisisItem {
  id: number;
  name: string;
  job_title: string;
  match_score: number;
  created_at: string;
}

interface Props {
  item: AnalisisItem;
}

export const PDFCard = ({ item }: Props) => {
  const cardRef = useRef (null);

  return (
    <div
      ref={cardRef}
      className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-md border border-white/20"
    >
      <h3 className="text-xl font-semibold">{item.name}</h3>
      <p className="text-sm text-gray-300">{item.job_title}</p>
      <div className="mt-4 flex flex-col gap-2">
        <span className="text-md">
          <strong>Calificación:</strong> {item.match_score.toFixed(2)}
        </span>
        <span className="text-md">
          <strong>Fecha:</strong> {new Date(item.created_at).toLocaleDateString()}
        </span>
        <GeneratePDF cardRef={cardRef} name={`candidato_${item.id}.pdf`} />
      </div>
    </div>
  );
};
