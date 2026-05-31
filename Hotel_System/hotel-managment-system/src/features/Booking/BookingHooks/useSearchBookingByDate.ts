import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { PAGE_SIZE } from "../../../utils/constants";
import { BookingRepository } from "../../../services/Repository/BookingRepository";

export function useSearchBookingByDate() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const bookingRepository = useMemo(() => new BookingRepository(), []);
  const from: string = searchParams.get("fromDate") || "";
  const to: string = searchParams.get("toDate") || "";

  const shouldFetchVisitors = from !== "" && to !== "";

  const pageNumber = Number(searchParams.get("page")) || 1;
  const { isLoading, data, error } = useQuery({
    queryKey: ["searchBooking", pageNumber, PAGE_SIZE, from, to],
    queryFn: async () => {
      const [count, bookings] = await Promise.all([
        bookingRepository.countBookingByDate(from, to),
        bookingRepository.getBookingUsingDate(pageNumber, PAGE_SIZE, from, to),
      ]);
      return { count, bookings };
    },
    enabled: shouldFetchVisitors,
  });

  const searchBookingsByDate = data?.bookings || [];
  const countSearchBookingsByDate: number = data?.count || 0;

  useEffect(() => {
    if (pageNumber < Math.ceil(countSearchBookingsByDate / PAGE_SIZE)) {
      queryClient.prefetchQuery({
        queryKey: ["searchBooking", pageNumber + 1, PAGE_SIZE, from, to],
        queryFn: () =>
          bookingRepository.getBookingUsingDate(
            pageNumber + 1,
            PAGE_SIZE,
            from,
            to,
          ),
      });
    }

    if (pageNumber > 1) {
      queryClient.prefetchQuery({
        queryKey: ["searchBooking", pageNumber - 1, PAGE_SIZE, from, to],
        queryFn: () =>
          bookingRepository.getBookingUsingDate(
            pageNumber - 1,
            PAGE_SIZE,
            from,
            to,
          ),
      });
    }
  }, [
    pageNumber,
    from,
    to,
    countSearchBookingsByDate,
    bookingRepository,
    queryClient,
  ]);

  return { isLoading, error, searchBookingsByDate, countSearchBookingsByDate };
}
