import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import RowTable from "../Shared/RowTable";
import EmptyData from "../../ui/EmptyData";
import { useAllRoom } from "./RoomHooks/useAllRoom";
import { useSearchRoom } from "./RoomHooks/useSearchRoom";
import ListOfRooms from "./ListOfRooms";
import RoomForMobile from "./RoomForMobile";

export default function RoomTable() {
  const { isLoading, isFetching, rooms, countRooms } = useAllRoom();
  const {
    isLoading: isLoading2,
    searchRooms,
    countSearchRooms,
  } = useSearchRoom();
  const [searchParams] = useSearchParams();

  const value: string = searchParams.get("roomSearch") || "";

  if (isLoading || isLoading2 || isFetching) {
    return <Spinner />;
  }

  if (value !== "" && countSearchRooms === 0) {
    return <EmptyData message="No Rooms with this search" />;
  } else if (!rooms.length) return <EmptyData message="No Rooms in database" />;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden p-4">
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <RowTable
                Rows={[
                  { value: "Type Title" },
                  { value: "ID" },
                  { value: "Room Number" },
                  { value: "Room Floor" },
                  { value: "Availability Status" },
                  { value: "Is Smoking Allowed" },
                  { value: "Is Pet Friendly" },
                  { value: "Actions" },
                ]}
              />
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <ListOfRooms allRooms={searchRooms.length ? searchRooms : rooms} />
          </tbody>
        </table>
      </div>
      <RoomForMobile allRooms={searchRooms.length ? searchRooms : rooms} />
      <Pagination
        count={countSearchRooms === 0 ? countRooms : countSearchRooms}
      />
    </div>
  );
}
