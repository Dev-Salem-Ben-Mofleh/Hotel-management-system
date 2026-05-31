import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { Operations, PAGE_SIZE } from "../../../utils/constants";
import { BookingRepository } from "../../../services/Repository/BookingRepository";

export function useAllBooking() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const bookingRepository = useMemo(() => new BookingRepository(), []);
  const filterValue: string = searchParams.get("filterValue") || "";
  const column: string = searchParams.get("filterBy") || "";
  const operation: string = filterValue !== "all" ? Operations.EQUAL : "";

  const pageNumber = Number(searchParams.get("page")) || 1;
  const { isLoading, isFetching, data, error } = useQuery({
    queryKey: [
      "bookings",
      pageNumber,
      PAGE_SIZE,
      column,
      filterValue,
      operation,
    ],
    queryFn: async () => {
      const [count, bookings] = await Promise.all([
        bookingRepository.count("CountBooking", column, filterValue, operation),
        bookingRepository.getBookingUsingPageNumber(
          pageNumber,
          PAGE_SIZE,
          column,
          filterValue,
          operation,
        ),
      ]);
      return { count, bookings };
    },
  });
  const bookings = data?.bookings || [];
  const countBookings: number = data?.count || 0;

  useEffect(() => {
    if (pageNumber < Math.ceil(countBookings / PAGE_SIZE)) {
      queryClient.prefetchQuery({
        queryKey: [
          "bookings",
          pageNumber + 1,
          PAGE_SIZE,
          column,
          filterValue,
          operation,
        ],
        queryFn: () =>
          bookingRepository.getBookingUsingPageNumber(
            pageNumber + 1,
            PAGE_SIZE,
            column,
            filterValue,
            operation,
          ),
      });
    }

    if (pageNumber > 1) {
      queryClient.prefetchQuery({
        queryKey: [
          "bookings",
          pageNumber - 1,
          PAGE_SIZE,
          column,
          filterValue,
          operation,
        ],
        queryFn: () =>
          bookingRepository.getBookingUsingPageNumber(
            pageNumber - 1,
            PAGE_SIZE,
            column,
            filterValue,
            operation,
          ),
      });
    }
  }, [
    pageNumber,
    countBookings,
    bookingRepository,
    queryClient,
    column,
    filterValue,
    operation,
  ]);

  return { isLoading, isFetching, error, bookings, countBookings };
}
