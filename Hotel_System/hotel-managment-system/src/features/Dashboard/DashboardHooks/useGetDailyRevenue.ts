import { useQuery } from "@tanstack/react-query";
import { BookingRepository } from "../../../services/Repository/BookingRepository";

export function useGetDailyRevenue() {
  const bookingRepository = new BookingRepository();

  const {
    isLoading,
    data: dailyRevenue,
    error,
  } = useQuery({
    queryKey: ["dailyRevenue"],
    queryFn: () => bookingRepository.GetDailyRevenue(),
  });

  return { isLoading, error, dailyRevenue };
}
