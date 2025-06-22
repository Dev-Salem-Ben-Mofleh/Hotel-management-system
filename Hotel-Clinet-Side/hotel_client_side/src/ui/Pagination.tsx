import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";

type countPagination = {
  count: number;
};

function Pagination({ count }: countPagination) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next: number =
      currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next.toString());
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev: number = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev.toString());
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="w-full flex items-center justify-between mt-5">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className={`flex items-center justify-center gap-1 px-3 py-2 rounded-sm font-medium text-[1.4rem] transition-all
    ${
      currentPage === 1
        ? "bg-yellow-100 text-yellow-400 cursor-not-allowed"
        : "bg-yellow-400 text-white hover:bg-yellow-500"
    }`}
      >
        <HiChevronLeft className="w-[1.8rem] h-[1.8rem]" />
        <span>Previous</span>
      </button>

      <button
        onClick={nextPage}
        disabled={currentPage === pageCount}
        className={`flex items-center justify-center gap-1 px-3 py-2 rounded-sm font-medium text-[1.4rem] transition-all
    ${
      currentPage === pageCount
        ? "bg-yellow-100 text-yellow-400 cursor-not-allowed"
        : "bg-yellow-400 text-white hover:bg-yellow-500"
    }`}
      >
        <span>Next</span>
        <HiChevronRight className="w-[1.8rem] h-[1.8rem]" />
      </button>
    </div>
  );
}

export default Pagination;
