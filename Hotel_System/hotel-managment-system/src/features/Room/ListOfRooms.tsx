import { useModuleContext } from "../../context/Hook/useModuleContext";
import type { RoomView } from "../../services/models/Room";

interface Data {
  allRooms: RoomView[];
}
const className =
  "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white";
export default function ListOfRooms({ allRooms }: Data) {
  const { setModalType, setOpenId } = useModuleContext();

  return (
    <>
      {allRooms.map((r) => (
        <tr
          key={r.roomId}
          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <td className={className}>{r.roomTypeDto.roomTypeTitle}</td>
          <td className={className}>{r.roomId}</td>
          <td className={className}>{r.roomNumber}</td>
          <td className={className}>{r.roomFloor}</td>
          <td className={className}>
            {r.availabilityStatus === "Available"
              ? "Available"
              : "Not Available"}
          </td>
          <td className={className}>
            {r.isSmokingAllowed ? "Allowed" : "Not Allowed"}
          </td>
          <td className={className}>
            {r.isPetFriendly ? "Allowed" : "Not Allowed"}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
            <button
              onClick={() => {
                setOpenId(r.roomId);
                setModalType("view");
              }}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              <i className="fas fa-eye mr-1"></i>View
            </button>
            <button
              onClick={() => {
                setOpenId(r.roomId);
                setModalType("update");
              }}
              className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
            >
              <i className="fas fa-edit mr-1"></i>Update
            </button>
            <button
              onClick={() => {
                setOpenId(r.roomId);
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
