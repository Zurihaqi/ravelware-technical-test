"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import { ChevronDown, ChevronUp, Download } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import transactions from "../../data/transactions.json";

interface SortConfig {
  key: keyof (typeof transactions)[0] | null;
  direction: "asc" | "desc";
}

function FuelTransactionHistory() {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2023-10-18")
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date("2023-10-26"));
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const handleSort = (key: keyof (typeof transactions)[0]) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedData = [...transactions].sort((a, b) => {
    if (!sortConfig.key) return 0;

    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const currentData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const SortIcon = ({ column }: { column: keyof (typeof transactions)[0] }) => {
    if (sortConfig.key !== column) {
      return (
        <div className="flex flex-col">
          <ChevronUp className="h-3 w-3" />
          <ChevronDown className="h-3 w-3" />
        </div>
      );
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  return (
    <div className="p-6 bg-[#1a1b2e] text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Fuel Transaction History</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#232442] rounded-lg p-2">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="bg-transparent w-32 outline-none text-end"
              dateFormat="MMM dd, yyyy"
            />
            <span>-</span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate ?? new Date()}
              className="bg-transparent w-32 outline-none"
              dateFormat="MMM dd, yyyy"
            />
          </div>
          <button className="flex items-center gap-2 bg-[#232442] px-4 py-2 rounded-lg hover:bg-[#2a2b4e] transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-600">
            <tr className="border-b border-gray-700">
              <th className="py-3 px-4 text-left">
                <button
                  className="flex items-center gap-1 hover:text-gray-300"
                  onClick={() => handleSort("id")}
                >
                  ID
                  <SortIcon column="id" />
                </button>
              </th>
              <th className="py-3 px-4 text-left">
                <button
                  className="flex items-center gap-1 hover:text-gray-300"
                  onClick={() => handleSort("datetime")}
                >
                  Time/Date
                  <SortIcon column="datetime" />
                </button>
              </th>
              <th className="py-3 px-4 text-left">
                <button
                  className="flex items-center gap-1 hover:text-gray-300"
                  onClick={() => handleSort("station")}
                >
                  Station
                  <SortIcon column="station" />
                </button>
              </th>
              <th className="py-3 px-4 text-left">
                <button
                  className="flex items-center gap-1 hover:text-gray-300"
                  onClick={() => handleSort("name")}
                >
                  Name
                  <SortIcon column="name" />
                </button>
              </th>
              <th className="py-3 px-4 text-left">
                <button
                  className="flex items-center gap-1 hover:text-gray-300"
                  onClick={() => handleSort("license")}
                >
                  License
                  <SortIcon column="license" />
                </button>
              </th>
              <th className="py-3 px-4 text-left">
                <button
                  className="flex items-center gap-1 hover:text-gray-300"
                  onClick={() => handleSort("code")}
                >
                  Code
                  <SortIcon column="code" />
                </button>
              </th>
              <th className="py-3 px-4 text-left">
                <button
                  className="flex items-center gap-1 hover:text-gray-300"
                  onClick={() => handleSort("fuel")}
                >
                  Fuel
                  <SortIcon column="fuel" />
                </button>
              </th>
              <th className="py-3 px-4 text-left">
                <button
                  className="flex items-center gap-1 hover:text-gray-300"
                  onClick={() => handleSort("usage")}
                >
                  Fuel Usage (L)
                  <SortIcon column="usage" />
                </button>
              </th>
              <th className="py-3 px-4 text-left">
                <button
                  className="flex items-center gap-1 hover:text-gray-300"
                  onClick={() => handleSort("leftOver")}
                >
                  Left Over (L)
                  <SortIcon column="leftOver" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-gray-700/50 hover:bg-gray-800/30"
              >
                <td className="py-3 px-4">{transaction.id}</td>
                <td className="py-3 px-4">{transaction.datetime}</td>
                <td className="py-3 px-4">{transaction.station}</td>
                <td className="py-3 px-4">{transaction.name}</td>
                <td className="py-3 px-4">{transaction.license}</td>
                <td className="py-3 px-4">{transaction.code}</td>
                <td className="py-3 px-4">{transaction.fuel}</td>
                <td className="py-3 px-4">{transaction.usage}</td>
                <td className="py-3 px-4">{transaction.leftOver}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "bg-[#232442] text-gray-300 hover:bg-[#2a2b4e]"
            }`}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            onClick={() =>
              setCurrentPage((curr) => Math.min(curr + 1, totalPages))
            }
            className="px-3 py-1 rounded bg-[#232442] text-gray-300 hover:bg-[#2a2b4e]"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default FuelTransactionHistory;
