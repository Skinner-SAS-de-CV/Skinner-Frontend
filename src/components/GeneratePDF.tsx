import { Button } from "@/components/ui/button";
import * as html2pdf from "html2pdf.js";
import { Save } from "lucide-react";
import { RefObject } from "react";

export default function GeneratePDF({
  cardRef,
  name,
}: {
  cardRef: RefObject<null>;
  name?: string;
}) {
  const handleSave = () => {
    if (cardRef.current) {
      html2pdf.default(cardRef.current, {
        filename: name || "analisis",
      });
    }
  };
  return (
    <Button variant="ghost" className="h-[50px] w-[50px]" onClick={handleSave}>
      {/* https://github.com/shadcn-ui/ui/issues/6316 */}
      <Save className="!size-7" />
    </Button>
  );
}
