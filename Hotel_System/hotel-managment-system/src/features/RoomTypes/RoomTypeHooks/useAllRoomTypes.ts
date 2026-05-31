import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { PAGE_SIZE } from "../../../utils/constants";
import { RoomTypeRepository } from "../../../services/Repository/RoomTypeRepository";

export function useAllRoomTypes() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const roomTypeRepository = useMemo(() => new RoomTypeRepository(), []);

  const pageNumber = Number(searchParams.get("page")) || 1;
  const { isLoading, isFetching, data, error } = useQuery({
    queryKey: ["roomTypes", pageNumber, PAGE_SIZE, "", "", ""],
    queryFn: async () => {
      const [count, roomTypes] = await Promise.all([
        roomTypeRepository.count("CountRoomType", "", "", ""),
        roomTypeRepository.GetRoomTypeUsingPageNumber(
          pageNumber,
          PAGE_SIZE,
          "",
          "",
          ""
        ),
      ]);
      return { count, roomTypes };
    },
  });
  const roomTypes = data?.roomTypes || [];
  const countRoomTypes: number = data?.count || 0;

  useEffect(() => {
    if (pageNumber < Math.ceil(countRoomTypes / PAGE_SIZE)) {
      queryClient.prefetchQuery({
        queryKey: ["roomTypes", pageNumber + 1, PAGE_SIZE, "", "", ""],
        queryFn: () =>
          roomTypeRepository.GetRoomTypeUsingPageNumber(
            pageNumber + 1,
            PAGE_SIZE,
            "",
            "",
            ""
          ),
      });
    }

    if (pageNumber > 1) {
      queryClient.prefetchQuery({
        queryKey: ["roomTypes", pageNumber - 1, PAGE_SIZE, "", "", ""],
        queryFn: () =>
          roomTypeRepository.GetRoomTypeUsingPageNumber(
            pageNumber - 1,
            PAGE_SIZE,
            "",
            "",
            ""
          ),
      });
    }
  }, [pageNumber, countRoomTypes, roomTypeRepository, queryClient]);

  return { isLoading, isFetching, error, roomTypes, countRoomTypes };
}
