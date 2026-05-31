import { useModuleContext } from "../../context/Hook/useModuleContext";
import type { RoomView } from "../../services/models/Room";

interface Data {
  allRooms: RoomView[];
}
const className: string = "text-gray-900 dark:text-white text-sm mb-1";
export default function RoomForMobile({ allRooms }: Data) {
  const { setModalType, setOpenId } = useModuleContext();

  return (
    <div className="md:hidden space-y-4">
      {allRooms.map((r) => (
        <div
          key={r.roomId}
          className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm"
        >
          <div className={className}>ID: {r.roomId}</div>
          <div className="font-semibold text-gray-900 dark:text-white">
            Type Title: {r.roomTypeDto.roomTypeTitle}
          </div>
          <div className={className}>Room Number: {r.roomNumber}</div>
          <div className={className}>Room Floor: {r.roomFloor}</div>
          <div className={className}>
            Availability Status:
            {r.availabilityStatus === "Available"
              ? "Available"
              : "Not Available"}
          </div>
          <div className={className}>
            Is Smoking Allowed:
            {r.isSmokingAllowed ? "Allowed" : "Not Allowed"}
          </div>
          <div className={className}>
            Is Pet Friendly:
            {r.isPetFriendly ? "Allowed" : "Not Allowed"}
          </div>
          <div className="flex space-x-2">
            <button
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
              onClick={() => {
                setOpenId(r.roomId);
                setModalType("view");
              }}
            >
              <i className="fas fa-eye mr-1"></i>View
            </button>
            <button
              className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm"
              onClick={() => {
                setOpenId(r.roomId);
                setModalType("update");
              }}
            >
              <i className="fas fa-edit mr-1"></i>Update
            </button>
            <button
              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm"
              onClick={() => {
                setOpenId(r.roomId);
                setModalType("delete");
              }}
            >
              <i className="fas fa-trash mr-1"></i>Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
