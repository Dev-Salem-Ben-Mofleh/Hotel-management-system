import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { RoomTypeRepository } from "../../../services/Repository/RoomTypeRepository";
import type { RoomType } from "../../../services/models/RoomType";

export function useUpdateRoomTypes() {
  const queryClient = useQueryClient();

  const roomTypeRepository = new RoomTypeRepository();
  const { mutateAsync: UpdateRoomTypeAsync, isPending } = useMutation({
    mutationFn: async ({
      roomTypeId,
      updateRoomType,
    }: {
      roomTypeId: number;
      updateRoomType: RoomType;
    }) => {
      return await roomTypeRepository.update(
        "UpdateRoomType",
        roomTypeId,
        updateRoomType
      );
    },
    onSuccess: (result) => {
      toast.success(
        `RoomType updated successfully with id ${result.roomTypeId}`
      );
      queryClient.invalidateQueries({ queryKey: ["roomTypes"] });
    },
    onError: (err) => {
      const errorMessage = err?.message || "An error occurred";
      toast.error(`update failed: ${errorMessage}`);
    },
  });

  return { isPending, UpdateRoomTypeAsync };
}
