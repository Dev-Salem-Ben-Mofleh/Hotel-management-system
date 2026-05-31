import { useQuery } from "@tanstack/react-query";
import { RoomTypeRepository } from "../../../services/Repository/RoomTypeRepository";

export function useGetRoomType(
  roomTypeId: number | undefined,
  modalType: string | null,
) {
  const roomTypeRepository = new RoomTypeRepository();
  const {
    isLoading,
    data: roomTypeDetails,
    error,
  } = useQuery({
    queryKey: ["roomTypes", roomTypeId],
    queryFn: () => roomTypeRepository.getById("FindRoomType", roomTypeId),
    enabled: !!roomTypeId && (modalType === "view" || modalType === "update"),
  });
  return { isLoading, error, roomTypeDetails };
}
