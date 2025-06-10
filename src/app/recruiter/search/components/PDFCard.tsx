'use client';
import React, { useRef } from "react";
import Markdown from "react-markdown";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import dynamic from "next/dynamic";


const GeneratePDF = dynamic(() => import("../../../../components/GeneratePDF"), { ssr: false });

type AnalisisItem = {
  id: number;
  name: string;
  job_title: string;
  match_score: number;
  created_at: string;
  feedback: string;
}

type Props= {
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
          <strong>Fecha:</strong>{" "}
          {new Date(item.created_at).toLocaleDateString("es-SV")}
        </span>
      </div>

      <Accordion type="single" collapsible className="mt-4">
        <AccordionItem value="analisis">
          <AccordionTrigger className="text-sm text-blue-400 hover:underline">
            Ver análisis detallado del candidato
          </AccordionTrigger>
          <AccordionContent>
           <div className="flex w-full mb-4">
              <div className="ml-auto">
                <GeneratePDF cardRef={cardRef} name={`candidato_${item.id}.pdf`} />
              </div>
            </div>

            {item.feedback ? (
              <Markdown>{item.feedback}</Markdown>
            ) : (
              "Sin análisis disponible."
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      
    </div>
  );
};