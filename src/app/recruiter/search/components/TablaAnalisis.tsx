import { AnalisisDataTable } from "@/app/recruiter/search/components/AnalisisDataTable";
import { columns } from "./columns";
import { AnalysisItem } from "../../../types/AnalysisItem";

export default function TablaAnalisis({ data }: { data: AnalysisItem[] }) {
  return <AnalisisDataTable columns={columns} data={data} />;
}
