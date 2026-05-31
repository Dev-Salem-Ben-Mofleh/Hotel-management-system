import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { RoomRepository } from "../../../services/Repository/RoomRepository";

export function useAllRoomNumbers() {
  const roomRepository = useMemo(() => new RoomRepository(), []);
  const {
    isLoading,
    data: RoomNumbers = [],
    error,
  } = useQuery({
    queryKey: ["RoomNumbers"],
    queryFn: () => roomRepository.getAll("AllRooms"),
  });
  return { isLoading, error, RoomNumbers };
}
