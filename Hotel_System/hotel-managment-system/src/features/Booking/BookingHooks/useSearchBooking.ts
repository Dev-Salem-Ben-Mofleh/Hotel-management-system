import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { Operations, PAGE_SIZE } from "../../../utils/constants";
import { BookingRepository } from "../../../services/Repository/BookingRepository";

export function useSearchBooking() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const bookingRepository = useMemo(() => new BookingRepository(), []);
  const column: string = searchParams.get("SearchtBy") || "";
  const value: string = searchParams.get("bookingSearch") || "";
  const operation: string =
    column === "bookingId" || column === "roomNumber"
      ? Operations.EQUAL
      : Operations.STARTS_WITH;

  const shouldFetchVisitors = value !== "";

  const pageNumber = Number(searchParams.get("page")) || 1;
  const { isLoading, data, error } = useQuery({
    queryKey: [
      "searchBooking",
      pageNumber,
      PAGE_SIZE,
      column,
      value,
      operation,
    ],
    queryFn: async () => {
      const [count, bookings] = await Promise.all([
        bookingRepository.count("CountBooking", column, value, operation),
        bookingRepository.getBookingUsingPageNumber(
          pageNumber,
          PAGE_SIZE,
          column,
          value,
          operation,
        ),
      ]);
      return { count, bookings };
    },
    enabled: shouldFetchVisitors,
  });

  const searchBookings = data?.bookings || [];
  const countSearchBookings: number = data?.count || 0;

  useEffect(() => {
    if (pageNumber < Math.ceil(countSearchBookings / PAGE_SIZE)) {
      queryClient.prefetchQuery({
        queryKey: [
          "searchBooking",
          pageNumber + 1,
          PAGE_SIZE,
          value,
          column,
          operation,
        ],
        queryFn: () =>
          bookingRepository.getBookingUsingPageNumber(
            pageNumber + 1,
            PAGE_SIZE,
            column,
            value,
            operation,
          ),
      });
    }

    if (pageNumber > 1) {
      queryClient.prefetchQuery({
        queryKey: [
          "searchBooking",
          pageNumber - 1,
          PAGE_SIZE,
          value,
          column,
          operation,
        ],
        queryFn: () =>
          bookingRepository.getBookingUsingPageNumber(
            pageNumber - 1,
            PAGE_SIZE,
            column,
            value,
            operation,
          ),
      });
    }
  }, [
    pageNumber,
    value,
    column,
    operation,
    countSearchBookings,
    bookingRepository,
    queryClient,
  ]);

  return { isLoading, error, searchBookings, countSearchBookings };
}
