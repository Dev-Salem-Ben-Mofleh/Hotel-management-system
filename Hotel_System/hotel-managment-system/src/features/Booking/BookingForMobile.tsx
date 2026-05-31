import { useModuleContext } from "../../context/Hook/useModuleContext";
import type { BookingView } from "../../services/models/Booking";

interface Data {
  allBookings: BookingView[];
}
const className: string = "text-gray-900 dark:text-white text-sm mb-1";
export default function BookingForMobile({ allBookings: allBookings }: Data) {
  const { setModalType, setOpenId } = useModuleContext();

  return (
    <div className="md:hidden space-y-4">
      {allBookings.map((b) => (
        <div
          key={b.bookingId}
          className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm"
        >
          <div className={className}>ID: {b.bookingId}</div>
          <div className={className}>
            Check in date:{" "}
            {b.checkInDate ? new Date(b.checkInDate).toLocaleDateString() : "-"}
          </div>
          <div className={className}>
            Check out date:{" "}
            {b.checkOutDate
              ? new Date(b.checkOutDate).toLocaleDateString()
              : "-"}
          </div>
          <div className={className}>Status: {b.status}</div>
          <div className={className}>Full Name: {b.fullName}</div>
          <div className={className}>Country: {b.countryName}</div>
          <div className={className}>Paid Amount: {b.paidAmount}</div>
          <div className={className}>Room Number: {b.roomNumber}</div>
          <div className={className}>Floor: {b.roomFloor}</div>
          <div className="flex space-x-2">
            <button
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
              onClick={() => {
                setOpenId(b.bookingId);
                setModalType("view");
              }}
            >
              <i className="fas fa-eye mr-1"></i>View
            </button>
            <button
              className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm"
              onClick={() => {
                setOpenId(b.bookingId);
                setModalType("update");
              }}
            >
              <i className="fas fa-edit mr-1"></i>Update
            </button>
            <button
              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm"
              onClick={() => {
                setOpenId(b.bookingId);
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
