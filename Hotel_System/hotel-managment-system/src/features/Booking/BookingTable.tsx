import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import RowTable from "../Shared/RowTable";
import EmptyData from "../../ui/EmptyData";
import { useAllBooking } from "./BookingHooks/useAllBooking";
import { useSearchBooking } from "./BookingHooks/useSearchBooking";
import ListOfBookings from "./ListOfBookings";
import { useSearchBookingByDate } from "./BookingHooks/useSearchBookingByDate";
import BookingForMobile from "./BookingForMobile";

export default function BookingTable() {
  const { isLoading, isFetching, bookings, countBookings } = useAllBooking();
  const {
    isLoading: isLoading2,
    searchBookings,
    countSearchBookings,
  } = useSearchBooking();
  const {
    isLoading: isLoading3,
    searchBookingsByDate,
    countSearchBookingsByDate,
  } = useSearchBookingByDate();
  const [searchParams] = useSearchParams();

  const value: string = searchParams.get("bookingSearch") || "";
  const DateRange: string = searchParams.get("fromDate") || "";

  if (isLoading || isLoading2 || isLoading3 || isFetching) {
    return <Spinner />;
  }

  if (value !== "" && countSearchBookings === 0) {
    return <EmptyData message="No Bookings with this search" />;
  } else if (DateRange !== "" && countSearchBookingsByDate === 0) {
    return <EmptyData message="No Bookings with this date range" />;
  } else if (!bookings.length)
    return <EmptyData message="No Bookings in database" />;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden p-4">
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <RowTable
                Rows={[
                  { value: "Booking Id" },
                  { value: "CheckIn" },
                  { value: "CheckOut" },
                  { value: "Status" },
                  { value: "Guest Name" },
                  { value: "Country Name" },
                  { value: "Paid Amount" },
                  { value: "Room Number" },
                  { value: "Floor" },
                  { value: "Actions" },
                ]}
              />
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <ListOfBookings
              allBookings={
                searchBookings.length
                  ? searchBookings
                  : searchBookingsByDate.length
                    ? searchBookingsByDate
                    : bookings
              }
            />
          </tbody>
        </table>
      </div>
      <BookingForMobile
        allBookings={
          searchBookings.length
            ? searchBookings
            : searchBookingsByDate.length
              ? searchBookingsByDate
              : bookings
        }
      />
      <Pagination
        count={
          countSearchBookings !== 0
            ? countSearchBookings
            : countSearchBookingsByDate !== 0
              ? countSearchBookingsByDate
              : countBookings
        }
      />
    </div>
  );
}
