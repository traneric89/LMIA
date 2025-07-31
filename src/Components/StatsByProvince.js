const StatsByProvince = () => {
  const provinces = [
    { name: "Ontario", percent: 28 },
    { name: "British Columbia", percent: 22 },
    { name: "Alberta", percent: 12 },
    { name: "Quebec", percent: 32 },
    { name: "Manitoba", percent: 1.5 },
    { name: "Nova Scotia", percent: 0.8 },
    { name: "Saskatchewan", percent: 1.6 },
    { name: "New Brunswick", percent: 0.5 },
    { name: "Newfoundland", percent: 0.1 },
    { name: "Prince Edward Island", percent: 0.4 },
  ];

  return (
    <section className="bg-slate-800 text-slate-100 px-6 py-8 rounded-xl">
      <h2 className="text-xl font-semibold mb-6"> Stats by Province</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {provinces.map((prov, idx) => (
          <div
            key={idx}
            className="bg-slate-700 p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <p className="text-m text-slate-300">{prov.name}</p>
            <p className="text-2xl font-bold text-indigo-400">
              {prov.percent}%
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsByProvince;
