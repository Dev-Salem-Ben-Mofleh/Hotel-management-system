import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { valueOfFiters } from "../utils/constants";

interface Option {
  value: string;
  label: string;
}

interface Data {
  options: Option[];
  filterKey: string;
}

export default function Filter({ options, filterKey }: Data) {
  const [searchParams, setSearchParans] = useSearchParams();

  const filterBy = searchParams.get("filterBy") || "";
  const currentValue = searchParams.get("filterValue") || "";
  const [text, setText] = useState(currentValue);

  useEffect(() => {
    setText(currentValue);
  }, [currentValue]);

  function handleChange(value: string) {
    searchParams.set("filterValue", value);
    if (searchParams.get("page")) searchParams.set("page", "1");
    setSearchParans(searchParams);
  }

  return valueOfFiters.includes(filterBy) && filterKey === filterBy ? (
    <select
      value={text}
      onChange={(e) => handleChange(e.target.value)}
      className={`w-full sm:min-w-[180px] px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
bg-white dark:bg-gray-700 text-gray-700 dark:text-white 
focus:ring-2 focus:ring-blue-500 focus:border-transparent
shadow-sm transition-all duration-200
hover:shadow-md hover:border-blue-400 cursor-pointer`}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  ) : null;
}
