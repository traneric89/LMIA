const StatsByProgramStream = () => {
  const streams = [
    { name: "High Wage", percent: 49 },
    { name: "Low Wage", percent: 32 },
    { name: "Primary Agriculture", percent: 14 },
    { name: "Global Talent", percent: 5 },
  ];

  return (
    <section className="bg-slate-800 text-slate-100 px-6 py-8 mt-8 rounded-xl">
      <h2 className="text-xl font-semibold mb-6">Stats by Program Stream</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {streams.map((stream, idx) => (
          <div
            key={idx}
            className="bg-slate-700 p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <p className="text-m text-slate-300">{stream.name}</p>
            <p className="text-3xl font-bold text-sky-400">{stream.percent}%</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsByProgramStream;
