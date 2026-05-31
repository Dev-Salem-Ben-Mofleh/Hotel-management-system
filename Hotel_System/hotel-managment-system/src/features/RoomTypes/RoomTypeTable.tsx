import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { useAllRoomTypes } from "./RoomTypeHooks/useAllRoomTypes";
import Pagination from "../../ui/Pagination";
import RowTable from "../Shared/RowTable";
import EmptyData from "../../ui/EmptyData";
import { useSearchRoomTypes } from "./RoomTypeHooks/useSearchRoomTypes";
import RoomTypeForMobile from "./RoomTypeForMobile";
import ListOfRoomTypes from "./ListOfRoomTypes";

export default function RoomTypeTable() {
  const { isLoading, isFetching, roomTypes, countRoomTypes } =
    useAllRoomTypes();
  const {
    isLoading: isLoading2,
    searchRoomTypes,
    countSearchRoomTypes,
  } = useSearchRoomTypes();
  const [searchParams] = useSearchParams();

  const value: string = searchParams.get("roomTypeSearch") || "";

  if (isLoading || isLoading2 || isFetching) {
    return <Spinner />;
  }

  if (value !== "" && countSearchRoomTypes === 0) {
    return <EmptyData message="No RoomTypes with this search" />;
  } else if (!roomTypes.length)
    return <EmptyData message="No RoomTypes in database" />;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden p-4">
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <RowTable
                Rows={[
                  { value: "Title" },
                  { value: "ID" },
                  { value: "Capacity" },
                  { value: "Price Per Night" },
                  { value: "Description" },
                  { value: "Actions" },
                ]}
              />
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <ListOfRoomTypes
              allRoomTypes={
                searchRoomTypes.length ? searchRoomTypes : roomTypes
              }
            />
          </tbody>
        </table>
      </div>
      <RoomTypeForMobile
        allRoomTypes={searchRoomTypes.length ? searchRoomTypes : roomTypes}
      />
      <Pagination
        count={
          countSearchRoomTypes === 0 ? countRoomTypes : countSearchRoomTypes
        }
      />
    </div>
  );
}
