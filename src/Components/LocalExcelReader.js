import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import sampleCSV from "../Data/2025q1.csv";

const LocalExcelReader = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [provinceFilter, setProvinceFilter] = useState("All");

  const rowsPerPage = 10;

  // Load data
  useEffect(() => {
    fetch(sampleCSV)
      .then((res) => res.text())
      .then((csvText) => {
        const workbook = XLSX.read(csvText, { type: "string" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsed = XLSX.utils.sheet_to_json(sheet);
        setData(parsed);
        setFilteredData(parsed);
      });
  }, []);

  // Extract unique provinces for dropdown
  const provinces = React.useMemo(() => {
    const allProvinces = data.map((d) => d.Province).filter(Boolean);
    return ["All", ...Array.from(new Set(allProvinces))];
  }, [data]);

  // Update filtered data whenever filters change
  useEffect(() => {
    let filtered = data;

    if (searchTerm) {
      filtered = filtered.filter((row) =>
        row.Employer?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    if (provinceFilter !== "All") {
      filtered = filtered.filter((row) => row.Province === provinceFilter);
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset page on filter change
  }, [searchTerm, provinceFilter, data]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="p-6 bg-slate-800 text-slate-100 rounded-2xl shadow-md max-w-screen-xl mx-auto mt-8 mb-4">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        LMIA Data
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Employer filter */}
        <input
          type="text"
          placeholder="Filter by Employer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border border-gray-300 dark:border-gray-700 rounded text-sm dark:bg-gray-800 dark:text-white"
        />

        {/* Province filter */}
        <select
          value={provinceFilter}
          onChange={(e) => setProvinceFilter(e.target.value)}
          className="p-2 border border-gray-300 dark:border-gray-700 rounded text-sm dark:bg-gray-800 dark:text-white"
        >
          {provinces.map((prov) => (
            <option key={prov} value={prov}>
              {prov}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300 border-collapse min-w-max">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              {filteredData[0] &&
                Object.keys(filteredData[0]).map((key, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-medium whitespace-nowrap"
                  >
                    {key}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                {Object.values(row).map((val, i) => (
                  <td
                    key={i}
                    className="px-4 py-4 text-sm align-top break-words whitespace-nowrap"
                  >
                    {val}
                  </td>
                ))}
              </tr>
            ))}
            {currentRows.length === 0 && (
              <tr>
                <td
                  colSpan={
                    filteredData[0] ? Object.keys(filteredData[0]).length : 1
                  }
                  className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
                >
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white px-3 py-1 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-gray-700 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LocalExcelReader;
