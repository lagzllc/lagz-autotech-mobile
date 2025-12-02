// frontend/src/components/admin/TechActivity.jsx

export default function TechActivity() {
  const activities = [
    { tech: "Noah Technician", msg: "Completed job #15", time: "5 mins ago" },
    { tech: "David", msg: "Accepted job #14", time: "32 mins ago" },
    { tech: "John", msg: "Assigned to job #16", time: "1 hour ago" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-10">
      <h2 className="text-xl font-bold mb-4">Technician Activity</h2>

      <div className="space-y-4">
        {activities.map((a, i) => (
          <div key={i} className="p-3 bg-gray-100 rounded flex justify-between">
            <div>
              <strong>{a.tech}</strong> — {a.msg}
            </div>
            <span className="text-gray-500 text-sm">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
