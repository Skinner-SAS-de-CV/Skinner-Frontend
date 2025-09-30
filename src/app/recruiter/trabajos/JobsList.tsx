/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { getJobsByClient, JobResponse } from "@/lib/api/trabajo";
import { JobsDataTable, jobColumns } from "./components/JobsDataTable";

export default function JobsList() {
  const { getToken } = useAuth();
  const [jobs, setJobs] = useState<JobResponse>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const token = await getToken();
      const data = await getJobsByClient("0", token);
      setJobs(data);
    };
    fetchJobs();
  }, [getToken]);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen p-10">
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <JobsDataTable columns={jobColumns} data={jobs as any} />
        </div>
      </div>
    </div>
  );
}
