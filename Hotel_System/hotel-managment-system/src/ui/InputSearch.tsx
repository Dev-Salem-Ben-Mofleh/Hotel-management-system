import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { valueOfFiters } from "../utils/constants";

type data = {
  nameOfSearch: string;
};

export default function InputSearch({ nameOfSearch }: data) {
  const [searchParams, setSearchParams] = useSearchParams();

  const SearchtBy = searchParams.get("SearchtBy") || "";
  const currentText = searchParams.get(nameOfSearch) || "";
  const [text, setText] = useState(currentText);

  useEffect(() => {
    setText(currentText);
  }, [currentText]);

  function handleChange(value: string) {
    if (searchParams.get("page")) searchParams.set("page", "1");
    searchParams.set(nameOfSearch, value);
    setSearchParams(searchParams);
  }
  const debouncedHandleChange = useMemo(
    () => debounce(handleChange, 500),
    [searchParams],
  );

  return !valueOfFiters.includes(SearchtBy) ? (
    <div className="relative w-full">
      <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
      <input
        value={SearchtBy === "" ? "" : text}
        type="text"
        placeholder="Search by name or ID..."
        disabled={SearchtBy === ""}
        onChange={(e) => {
          setText(e.target.value);
          debouncedHandleChange(e.target.value);
        }}
        className={`w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                  dark:bg-gray-700 dark:text-white
                  ${
                    SearchtBy === ""
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-text"
                  }
                `}
      />
    </div>
  ) : null;
}
