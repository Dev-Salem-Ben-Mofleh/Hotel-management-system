import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { Operations, PAGE_SIZE } from "../../../utils/constants";
import { RoomRepository } from "../../../services/Repository/RoomRepository";

export function useSearchRoom() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const roomRepository = useMemo(() => new RoomRepository(), []);
  const column: string = searchParams.get("SearchtBy") || "";
  const value: string = searchParams.get("roomSearch") || "";
  const operation: string =
    column === "roomId" ||
    column === "roomNumber" ||
    column === "roomFloor" ||
    column === "roomTypeId"
      ? Operations.EQUAL
      : Operations.STARTS_WITH;

  const shouldFetchVisitors = value !== "";

  const pageNumber = Number(searchParams.get("page")) || 1;
  const { isLoading, data, error } = useQuery({
    queryKey: ["searchRoom", pageNumber, PAGE_SIZE, column, value, operation],
    queryFn: async () => {
      const [count, rooms] = await Promise.all([
        roomRepository.count("CountRoom", column, value, operation),
        roomRepository.getRoomUsingPageNumber(
          pageNumber,
          PAGE_SIZE,
          column,
          value,
          operation,
        ),
      ]);
      return { count, rooms };
    },
    enabled: shouldFetchVisitors,
  });

  const searchRooms = data?.rooms || [];
  const countSearchRooms: number = data?.count || 0;

  useEffect(() => {
    if (pageNumber < Math.ceil(countSearchRooms / PAGE_SIZE)) {
      queryClient.prefetchQuery({
        queryKey: [
          "searchRoom",
          pageNumber + 1,
          PAGE_SIZE,
          value,
          column,
          operation,
        ],
        queryFn: () =>
          roomRepository.getRoomUsingPageNumber(
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
          "searchRoom",
          pageNumber - 1,
          PAGE_SIZE,
          value,
          column,
          operation,
        ],
        queryFn: () =>
          roomRepository.getRoomUsingPageNumber(
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
    countSearchRooms,
    roomRepository,
    queryClient,
  ]);

  return { isLoading, error, searchRooms, countSearchRooms };
}
