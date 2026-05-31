import { useModuleContext } from "../../context/Hook/useModuleContext";
import type { RoomTypeView } from "../../services/models/RoomType";

interface Data {
  allRoomTypes: RoomTypeView[];
}
const className: string = "text-gray-900 dark:text-white text-sm mb-1";
export default function RoomTypeForMobile({ allRoomTypes }: Data) {
  const { setModalType, setOpenId } = useModuleContext();

  return (
    <div className="md:hidden space-y-4">
      {allRoomTypes.map((r) => (
        <div
          key={r.roomTypeId}
          className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm"
        >
          <div className={className}>ID: {r.roomTypeId}</div>
          <div className="font-semibold text-gray-900 dark:text-white">
            Title: {r.roomTypeTitle}
          </div>
          <div className={className}>Capacity: {r.roomTypeCapacity}</div>
          <div className={className}>
            Price Per Night: {r.roomTypePricePerNight}
          </div>
          <div className={className}>Description: {r.roomTypeDescription}</div>
          <div className="flex space-x-2">
            <button
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
              onClick={() => {
                setOpenId(r.roomTypeId);
                setModalType("view");
              }}
            >
              <i className="fas fa-eye mr-1"></i>View
            </button>
            <button
              className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm"
              onClick={() => {
                setOpenId(r.roomTypeId);
                setModalType("update");
              }}
            >
              <i className="fas fa-edit mr-1"></i>Update
            </button>
            <button
              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm"
              onClick={() => {
                setOpenId(r.roomTypeId);
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
