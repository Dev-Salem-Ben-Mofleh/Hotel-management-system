import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import ListOfVisitors from "./ListOfVisitors";
import { useAllVisitors } from "./VisitorHooks/useAllVisitors";
import { useSearchVisitors } from "./VisitorHooks/useSearchVisitors";
import VisitorForMobile from "./VisitorForMobile";
import Pagination from "../../ui/Pagination";
import RowTable from "../Shared/RowTable";
import EmptyData from "../../ui/EmptyData";

export default function VisitorTable() {
  const { isLoading, isFetching, visitors, countVisitors } = useAllVisitors();
  const {
    isLoading: isLoading2,
    searchVisitors,
    countSearchVisitors,
  } = useSearchVisitors();
  const [searchParams] = useSearchParams();

  const value: string = searchParams.get("visitorSearch") || "";

  if (isLoading || isLoading2 || isFetching) {
    return <Spinner />;
  }

  if (value !== "" && countSearchVisitors === 0) {
    return <EmptyData message="No Visitors with this search" />;
  } else if (!visitors.length)
    return <EmptyData message="No Visitors in database" />;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden p-4">
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <RowTable
                Rows={[
                  { value: "Full Name" },
                  { value: "ID" },
                  { value: "Phone" },
                  { value: "Birth Date" },
                  { value: "Gender" },
                  { value: "Country" },
                  { value: "Actions" },
                ]}
              />
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <ListOfVisitors
              allVisitors={searchVisitors.length ? searchVisitors : visitors}
            />
          </tbody>
        </table>
      </div>
      <VisitorForMobile
        allVisitors={searchVisitors.length ? searchVisitors : visitors}
      />
      <Pagination
        count={countSearchVisitors === 0 ? countVisitors : countSearchVisitors}
      />
    </div>
  );
}
