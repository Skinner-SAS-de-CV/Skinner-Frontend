"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { getJobsByClient, JobResponse, deleteJob } from "@/lib/api/trabajo";
import { JobsDataTable, jobColumns } from "./components/JobsDataTable";

export default function JobsList({ esPremium }: { esPremium: boolean }) {
  const { getToken } = useAuth();
  const [jobs, setJobs] = useState<JobResponse>([]);
  console.log("Es premium:", esPremium);

  useEffect(() => {
    const fetchJobs = async () => {
      const token = await getToken();
      const data = await getJobsByClient("0", token);
      setJobs(data);
    };
    fetchJobs();
  }, [getToken]);

  const handleDelete = async (id: number) => {
    const token = await getToken();
    await deleteJob({ id, token });
    // actualiza despues de borrar
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  }

  return (
    <div className="bg-linear-to-b from-gray-900 to-gray-800 text-white min-h-screen p-10">
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <JobsDataTable columns={jobColumns} data={jobs} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}
