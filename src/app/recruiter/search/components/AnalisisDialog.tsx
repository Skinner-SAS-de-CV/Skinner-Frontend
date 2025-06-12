'use client';
import React, { useRef, useState } from "react";
import Markdown from "react-markdown";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

{/*const GeneratePDF = dynamic(() => import("../../../../components/GeneratePDF"), { ssr: false });*/}

export function AnalisisDialog({ feedback, title }: { feedback: string; title: string; }) {
  const cardRef = useRef (null);
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="text-blue-400 hover:underline">
          Ver análisis
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-auto">
        <DialogHeader><DialogTitle>{title}</DialogTitle></DialogHeader>
        <div ref={cardRef} className="space-y-4">
          <Markdown>{feedback}</Markdown>
        </div>
       {/* <DialogFooter className="flex justify-between">
         <div className="ml-auto">
            <GeneratePDF cardRef={cardRef} name={`candidato_${id}.pdf`} />
          </div>
        </DialogFooter>*/}
        <Button variant="outline" onClick={() => setOpen(false)}>Cerrar</Button>
      </DialogContent>
    </Dialog>
  );
}
