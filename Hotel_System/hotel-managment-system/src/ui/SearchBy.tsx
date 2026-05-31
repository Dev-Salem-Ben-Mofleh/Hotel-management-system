import { useSearchParams } from "react-router-dom";
import { valueOfFiters } from "../utils/constants";

interface Option {
  value: string;
  label: string;
}

interface Data {
  options: Option[];
  nameOfSearch: string;
}

export default function SearchBy({ options, nameOfSearch }: Data) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(value: string) {
    const isFoundFilter = valueOfFiters.includes(value);

    if (isFoundFilter) {
      searchParams.set(nameOfSearch, "");
      searchParams.set("filterBy", value);
    } else {
      searchParams.set("filterBy", "");
    }

    searchParams.set("SearchtBy", value);
    searchParams.set("filterValue", "all");
    searchParams.set(nameOfSearch, "");
    searchParams.set("fromDate", "");
    searchParams.set("toDate", "");
    setSearchParams(searchParams);
  }

  return (
    <select
      onChange={(e) => handleChange(e.target.value)}
      className="w-full sm:min-w-[220px] px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
bg-white dark:bg-gray-700 text-gray-700 dark:text-white 
focus:ring-2 focus:ring-blue-500 focus:border-transparent
shadow-sm cursor-pointer transition-all duration-200
hover:shadow-md hover:border-blue-400"
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
