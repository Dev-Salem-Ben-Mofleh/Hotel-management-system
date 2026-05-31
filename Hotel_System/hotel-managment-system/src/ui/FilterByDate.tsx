import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { valueOfFiters } from "../utils/constants";

interface Data {
  filterKey: string;
}

export default function FilterByDate({ filterKey }: Data) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterBy = searchParams.get("filterBy") || "";

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  function handleSearch() {
    if (fromDate) searchParams.set("fromDate", fromDate);
    if (toDate) searchParams.set("toDate", toDate);
    searchParams.set("page", "1");

    setSearchParams(searchParams);
  }

  if (!(valueOfFiters.includes(filterBy) && filterKey === filterBy)) {
    return null;
  }

  return (
    <div className="w-full flex flex-col sm:flex-row gap-3 items-end bg-white p-4 rounded-xl shadow-md border">
      <div className="flex flex-col w-full">
        <label className="text-sm text-gray-600 mb-1">From</label>
        <input
          type="date"
          value={fromDate}
          max={new Date().toISOString().split("T")[0]}
          onChange={(e) => setFromDate(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex flex-col w-full">
        <label className="text-sm text-gray-600 mb-1">To</label>
        <input
          type="date"
          value={toDate}
          min={fromDate}
          disabled={fromDate === ""}
          onChange={(e) => setToDate(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <button
        onClick={handleSearch}
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
      >
        Search
      </button>
    </div>
  );
}
