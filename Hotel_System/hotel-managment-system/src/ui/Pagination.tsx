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
    <div
      className="
    mt-6
    flex flex-wrap items-center justify-center
    gap-3 sm:gap-4
  "
    >
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className={`
      flex items-center gap-2
      rounded-xl
      px-3 sm:px-4
      py-2.5
      text-sm sm:text-base
      font-medium
      transition-all duration-200
      shadow-sm

      ${
        currentPage === 1
          ? `
            cursor-not-allowed
            bg-blue-100
            text-blue-400
            dark:bg-blue-900/30
            dark:text-blue-300
          `
          : `
            bg-blue-500
            text-white
            hover:bg-blue-600
            active:scale-95
          `
      }
    `}
      >
        <HiChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />

        <span className="hidden xs:block">Previous</span>
      </button>

      <div
        className="
      rounded-xl
      bg-blue-100 dark:bg-blue-900/30
      px-4 sm:px-5
      py-2.5
      text-sm sm:text-base
      font-semibold
      text-blue-700 dark:text-blue-300
      shadow-inner
      text-center
      min-w-[130px]
    "
      >
        Page {currentPage} of {pageCount}
      </div>

      <button
        onClick={nextPage}
        disabled={currentPage === pageCount}
        className={`
      flex items-center gap-2
      rounded-xl
      px-3 sm:px-4
      py-2.5
      text-sm sm:text-base
      font-medium
      transition-all duration-200
      shadow-sm

      ${
        currentPage === pageCount
          ? `
            cursor-not-allowed
            bg-blue-100
            text-blue-400
            dark:bg-blue-900/30
            dark:text-blue-300
          `
          : `
            bg-blue-500
            text-white
            hover:bg-blue-600
            active:scale-95
          `
      }
    `}
      >
        <span className="hidden xs:block">Next</span>

        <HiChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </div>
  );
}

export default Pagination;
