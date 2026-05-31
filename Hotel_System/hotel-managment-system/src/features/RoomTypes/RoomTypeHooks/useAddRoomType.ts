import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { RoomType } from "../../../services/models/RoomType";
import { RoomTypeRepository } from "../../../services/Repository/RoomTypeRepository";

export function useAddRoomType() {
  const queryClient = useQueryClient();

  const roomRepository = new RoomTypeRepository();
  const { mutateAsync: AddRoomTypeAsync, isPending } = useMutation({
    mutationFn: async ({ newRoomType }: { newRoomType: RoomType }) => {
      return await roomRepository.create("AddRoomType", newRoomType);
    },
    onSuccess: (result) => {
      toast.success(
        `Room type added successfully with id ${result.roomTypeId}`
      );
      queryClient.invalidateQueries({ queryKey: ["roomTypes"] });
    },
    onError: (err) => {
      const errorMessage = err?.message || "An error occurred";
      toast.error(`created failed: ${errorMessage}`);
    },
  });

  return { isPending, AddRoomTypeAsync };
}
