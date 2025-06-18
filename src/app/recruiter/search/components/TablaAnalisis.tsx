import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { AnalysisItem } from "../types/AnalysisItem";

export default function TablaAnalisis({ data }: { data: AnalysisItem[] }) {
  return <DataTable columns={columns} data={data} />;
}
