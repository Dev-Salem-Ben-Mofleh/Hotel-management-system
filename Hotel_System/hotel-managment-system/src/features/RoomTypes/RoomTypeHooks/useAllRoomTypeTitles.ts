import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { RoomTypeRepository } from "../../../services/Repository/RoomTypeRepository";

export function useAllRoomTypeTitles() {
  const roomTypeRepository = useMemo(() => new RoomTypeRepository(), []);
  const {
    isLoading,
    data: RoomTitles = [],
    error,
  } = useQuery({
    queryKey: ["roomTypes"],
    queryFn: () => roomTypeRepository.getAll("AllRoomTypes"),
  });
  return { isLoading, error, RoomTitles };
}
