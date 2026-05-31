import { useQuery } from "@tanstack/react-query";
import { BookingRepository } from "../../../services/Repository/BookingRepository";

export function useGetBooking(
  bookingId: number | undefined,
  modalType: string | null,
) {
  const bookingRepository = new BookingRepository();
  const {
    isLoading,
    data: bookingDetails,
    error,
  } = useQuery({
    queryKey: ["bookings", bookingId],
    queryFn: () => bookingRepository.getById("FindBooking", bookingId),
    enabled: !!bookingId && (modalType === "view" || modalType === "update"),
  });
  return { isLoading, error, bookingDetails };
}
