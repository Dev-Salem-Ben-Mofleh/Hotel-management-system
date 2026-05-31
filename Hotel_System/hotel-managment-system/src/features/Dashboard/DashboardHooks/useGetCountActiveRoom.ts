import { useQuery } from "@tanstack/react-query";
import { RoomRepository } from "../../../services/Repository/RoomRepository";

export function useGetCountActiveRoom() {
  const roomRepository = new RoomRepository();

  const {
    isLoading,
    data: countActiveRoom,
    error,
  } = useQuery({
    queryKey: ["countActiveRoom"],
    queryFn: () => roomRepository.GetCountActiveRoom(),
  });

  return { isLoading, error, countActiveRoom };
}
