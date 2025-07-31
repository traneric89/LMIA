import Header from "./Components/Header";
import StatsByProvince from "./Components/StatsByProvince";
import StatsByProgramStream from "./Components/StatsByProgramStream";
import LocalExcelReader from "./Components/LocalExcelReader";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4">
      <Header />
      <main className="max-w-7xl mx-auto py-10">
        <StatsByProvince />
        <StatsByProgramStream />
        <LocalExcelReader />
        <p className="w-full text-center text-sm ext-gray-500 dark:text-gray-400">
          Source:{" "}
          <a
            href="https://open.canada.ca/data/en/dataset/90fed587-1364-4f33-a9ee-208181dc0b97"
            target="_blank"
            rel="noreferrer"
          >
            Data from Q1 2025
          </a>
        </p>
      </main>
    </div>
  );
};

export default App;
