import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { Operations, PAGE_SIZE } from "../../../utils/constants";
import { RoomRepository } from "../../../services/Repository/RoomRepository";

export function useAllRoom() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const roomRepository = useMemo(() => new RoomRepository(), []);
  const filterValue: string = searchParams.get("filterValue") || "";
  const column: string = searchParams.get("filterBy") || "";
  const operation: string = filterValue !== "all" ? Operations.EQUAL : "";

  const pageNumber = Number(searchParams.get("page")) || 1;
  const { isLoading, isFetching, data, error } = useQuery({
    queryKey: ["rooms", pageNumber, PAGE_SIZE, column, filterValue, operation],
    queryFn: async () => {
      const [count, rooms] = await Promise.all([
        roomRepository.count("CountRoom", column, filterValue, operation),
        roomRepository.getRoomUsingPageNumber(
          pageNumber,
          PAGE_SIZE,
          column,
          filterValue,
          operation,
        ),
      ]);
      return { count, rooms };
    },
  });
  const rooms = data?.rooms || [];
  const countRooms: number = data?.count || 0;

  useEffect(() => {
    if (pageNumber < Math.ceil(countRooms / PAGE_SIZE)) {
      queryClient.prefetchQuery({
        queryKey: [
          "rooms",
          pageNumber + 1,
          PAGE_SIZE,
          column,
          filterValue,
          operation,
        ],
        queryFn: () =>
          roomRepository.getRoomUsingPageNumber(
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
          "rooms",
          pageNumber - 1,
          PAGE_SIZE,
          column,
          filterValue,
          operation,
        ],
        queryFn: () =>
          roomRepository.getRoomUsingPageNumber(
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
    countRooms,
    roomRepository,
    queryClient,
    column,
    filterValue,
    operation,
  ]);

  return { isLoading, isFetching, error, rooms, countRooms };
}
