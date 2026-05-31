import { useModuleContext } from "../../context/Hook/useModuleContext";
import type { BookingView } from "../../services/models/Booking";

interface Data {
  allBookings: BookingView[];
}
const className =
  "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white";
export default function ListOfBookings({ allBookings }: Data) {
  const { setModalType, setOpenId } = useModuleContext();

  return (
    <>
      {allBookings.map((b) => (
        <tr
          key={b.bookingId}
          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <td className={className}>{b.bookingId}</td>
          <td className={className}>
            {b.checkInDate ? new Date(b.checkInDate).toLocaleDateString() : "-"}
          </td>
          <td className={className}>
            {b.checkOutDate
              ? new Date(b.checkOutDate).toLocaleDateString()
              : "-"}
          </td>
          <td className={className}>{b.status}</td>
          <td className={className}>{b.fullName}</td>
          <td className={className}>{b.countryName}</td>
          <td className={className}>{b.paidAmount}</td>
          <td className={className}>{b.roomNumber}</td>
          <td className={className}>{b.roomFloor}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
            <button
              onClick={() => {
                setOpenId(b.bookingId);
                setModalType("view");
              }}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              <i className="fas fa-eye mr-1"></i>View
            </button>
            <button
              onClick={() => {
                setOpenId(b.bookingId);
                setModalType("update");
              }}
              className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
            >
              <i className="fas fa-edit mr-1"></i>Update
            </button>
            <button
              onClick={() => {
                setOpenId(b.bookingId);
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
