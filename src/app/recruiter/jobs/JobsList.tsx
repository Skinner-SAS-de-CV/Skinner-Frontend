"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { getJobsByClient, JobResponse, deleteJob } from "@/lib/api/trabajo";
import { JobsDataTable, jobColumns } from "./components/JobsDataTable";
import { motion } from "motion/react";

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

  const handleDelete = async (id: number) => {
    const token = await getToken();
    await deleteJob({ id, token });
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  }

  return (
    <div className="gradient-surface text-white min-h-screen p-10">
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold gradient-brand-text font-display mb-2">
              Mis Puestos
            </h1>
            <p className="text-gray-400">Administra tus puestos de trabajo registrados</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <JobsDataTable columns={jobColumns} data={jobs} onDelete={handleDelete} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
