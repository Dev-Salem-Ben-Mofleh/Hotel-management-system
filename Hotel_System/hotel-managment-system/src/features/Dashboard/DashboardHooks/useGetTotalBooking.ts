import { useQuery } from "@tanstack/react-query";
import { BookingRepository } from "../../../services/Repository/BookingRepository";

export function useGetTotalBooking() {
  const bookingRepository = new BookingRepository();

  const {
    isLoading,
    data: totalBooking,
    error,
  } = useQuery({
    queryKey: ["totalBookingsCount"],
    queryFn: () => bookingRepository.count("CountBooking", "", "", ""),
  });

  return { isLoading, error, totalBooking };
}
