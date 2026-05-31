import { useModuleContext } from "../../context/Hook/useModuleContext";
import type { RoomTypeView } from "../../services/models/RoomType";

interface Data {
  allRoomTypes: RoomTypeView[];
}
const className =
  "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white";
export default function ListOfRoomTypes({ allRoomTypes }: Data) {
  const { setModalType, setOpenId } = useModuleContext();

  return (
    <>
      {allRoomTypes.map((r) => (
        <tr
          key={r.roomTypeId}
          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <td className={className}>{r.roomTypeTitle}</td>
          <td className={className}>{r.roomTypeId}</td>
          <td className={className}>{r.roomTypeCapacity}</td>
          <td className={className}>{r.roomTypePricePerNight}</td>
          <td className={className}>{r.roomTypeDescription}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
            <button
              onClick={() => {
                setOpenId(r.roomTypeId);
                setModalType("view");
              }}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              <i className="fas fa-eye mr-1"></i>View
            </button>
            <button
              onClick={() => {
                setOpenId(r.roomTypeId);
                setModalType("update");
              }}
              className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
            >
              <i className="fas fa-edit mr-1"></i>Update
            </button>
            <button
              onClick={() => {
                setOpenId(r.roomTypeId);
                setModalType("delete");
              }}
              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
            >
              <i className="fas fa-trash mr-1"></i>Delete
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}
