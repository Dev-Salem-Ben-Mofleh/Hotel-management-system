import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { Operations, PAGE_SIZE } from "../../../utils/constants";
import { RoomTypeRepository } from "../../../services/Repository/RoomTypeRepository";

export function useSearchRoomTypes() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const roomTypeRepository = useMemo(() => new RoomTypeRepository(), []);
  const column: string = searchParams.get("SearchtBy") || "";
  const value: string = searchParams.get("roomTypeSearch") || "";
  const operation: string =
    column === "roomTypeId" || column === "roomTypeCapacity"
      ? Operations.EQUAL
      : Operations.STARTS_WITH;

  const shouldFetchVisitors = value !== "";

  const pageNumber = Number(searchParams.get("page")) || 1;
  const { isLoading, data, error } = useQuery({
    queryKey: [
      "searchRoomType",
      pageNumber,
      PAGE_SIZE,
      column,
      value,
      operation,
    ],
    queryFn: async () => {
      const [count, roomTypes] = await Promise.all([
        roomTypeRepository.count("CountRoomType", column, value, operation),
        roomTypeRepository.GetRoomTypeUsingPageNumber(
          pageNumber,
          PAGE_SIZE,
          column,
          value,
          operation
        ),
      ]);
      return { count, roomTypes };
    },
    enabled: shouldFetchVisitors,
  });

  const searchRoomTypes = data?.roomTypes || [];
  const countSearchRoomTypes: number = data?.count || 0;

  useEffect(() => {
    if (pageNumber < Math.ceil(countSearchRoomTypes / PAGE_SIZE)) {
      queryClient.prefetchQuery({
        queryKey: [
          "searchRoomType",
          pageNumber + 1,
          PAGE_SIZE,
          value,
          column,
          operation,
        ],
        queryFn: () =>
          roomTypeRepository.GetRoomTypeUsingPageNumber(
            pageNumber + 1,
            PAGE_SIZE,
            column,
            value,
            operation
          ),
      });
    }

    if (pageNumber > 1) {
      queryClient.prefetchQuery({
        queryKey: [
          "searchRoomType",
          pageNumber - 1,
          PAGE_SIZE,
          value,
          column,
          operation,
        ],
        queryFn: () =>
          roomTypeRepository.GetRoomTypeUsingPageNumber(
            pageNumber - 1,
            PAGE_SIZE,
            column,
            value,
            operation
          ),
      });
    }
  }, [
    pageNumber,
    value,
    column,
    operation,
    countSearchRoomTypes,
    roomTypeRepository,
    queryClient,
  ]);

  return { isLoading, error, searchRoomTypes, countSearchRoomTypes };
}
