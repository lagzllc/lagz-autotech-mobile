import { useEffect, useState } from "react";
import axios from "axios";

export default function TechDashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    const token = localStorage.getItem("techToken");

    const res = await axios.get(
      "https://api.lagzautotechmobile.com/api/bookings/my-jobs",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setJobs(res.data);
  };

  return (
    <div className="pt-28 p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">My Assigned Jobs</h1>

      {jobs.map((job) => (
        <div className="p-4 border rounded mb-4" key={job.id}>
          <p className="font-bold">{job.customer_name}</p>
          <p>{job.service}</p>
          <p className="text-sm text-gray-600">{job.date}</p>
        </div>
      ))}
    </div>
  );
}
