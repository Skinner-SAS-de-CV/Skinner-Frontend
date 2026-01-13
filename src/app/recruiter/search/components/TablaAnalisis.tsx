import { AnalisisDataTable } from "@/app/recruiter/search/components/AnalisisDataTable";
import { columns } from "./columns";
import { AnalysisItem } from "../../../types/AnalysisItem";

interface TablaAnalisisProps {
  data: AnalysisItem[];
  onDelete?: (id: number) => Promise<void>;
}

export default function TablaAnalisis({ data, onDelete }: TablaAnalisisProps) {
  return <AnalisisDataTable columns={columns} data={data} onDelete={onDelete} />;
}
