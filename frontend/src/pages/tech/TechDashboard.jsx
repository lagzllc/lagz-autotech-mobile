import { useEffect, useState } from "react";
import { updateStatus, updatePartsLabor } from "../../lib/api";
import axios from "axios";

export default function TechDashboard() {
  const [jobs, setJobs] = useState([]);

  const load = async () => {
    const token = localStorage.getItem("techToken");
    const result = await axios.get("/booking/tech", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setJobs(result.data);
  };

  useEffect(() => {
    load();
  }, []);

  const changeStatus = async (id, status) => {
    await updateStatus({ booking_id: id, status });
    load();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Assigned Jobs</h1>

      {jobs.map((job) => (
        <div key={job.id} className="p-4 border rounded mb-4">
          <h2 className="text-xl font-bold">
            {job.make} {job.model} ({job.year})
          </h2>

          <p className="text-gray-600">{job.service}</p>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => changeStatus(job.id, "in-progress")}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              In Progress
            </button>

            <button
              onClick={() => changeStatus(job.id, "completed")}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Complete Job
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
