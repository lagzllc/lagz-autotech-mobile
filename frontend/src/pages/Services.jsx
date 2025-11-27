export default function Services() {
  const services = [
    "Diagnostics",
    "Brake Repair",
    "Battery Replacement",
    "Alternator",
    "Starter",
    "Tune-ups",
    "Oil Change",
    "Engine Light Scan"
  ];

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-primary mb-4">Services</h1>
      <ul className="space-y-2">
        {services.map((s) => (
          <li key={s} className="p-3 bg-gray-100 rounded">{s}</li>
        ))}
      </ul>
    </div>
  );
}
