import { useQuery } from "@tanstack/react-query";
import { RoomRepository } from "../../../services/Repository/RoomRepository";

export function useGetRoom(
  roomId: number | undefined,
  modalType: string | null,
) {
  const roomRepository = new RoomRepository();
  const {
    isLoading,
    data: roomDetails,
    error,
  } = useQuery({
    queryKey: ["rooms", roomId],
    queryFn: () => roomRepository.getById("FindRoom", roomId),
    enabled: !!roomId && (modalType === "view" || modalType === "update"),
  });
  return { isLoading, error, roomDetails };
}
