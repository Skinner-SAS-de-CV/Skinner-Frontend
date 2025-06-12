import { DataTable } from "@/components/ui/data-table";
import { columns, AnalisisItem } from "./columns";

export default function TablaAnalisis({ data }: { data: AnalisisItem[] }) {
  return <DataTable columns={columns} data={data} />;
}
