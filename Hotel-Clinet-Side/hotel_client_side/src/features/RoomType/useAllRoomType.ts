import { useQuery } from "@tanstack/react-query";
import { getAllRoomType } from "../../services/RoomTypeApi";

export function useAllRoomType() {
  const {
    isLoading,
    data: roomTypes = [],
    error,
  } = useQuery({
    queryKey: ["roomTypes"],
    queryFn: () => getAllRoomType(),
  });

  return { isLoading, error, roomTypes };
}
