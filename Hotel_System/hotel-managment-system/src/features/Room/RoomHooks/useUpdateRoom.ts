import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { RoomRepository } from "../../../services/Repository/RoomRepository";
import type { Room } from "../../../services/models/Room";

export function useUpdateRoom() {
  const queryClient = useQueryClient();

  const roomRepository = new RoomRepository();
  const { mutateAsync: UpdateRoomAsync, isPending } = useMutation({
    mutationFn: async ({
      roomId,
      updateRoom,
    }: {
      roomId: number;
      updateRoom: Room;
    }) => {
      return await roomRepository.update("UpdateRoom", roomId, updateRoom);
    },
    onSuccess: (result) => {
      toast.success(`RoomType updated successfully with id ${result.roomId}`);
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (err) => {
      const errorMessage = err?.message || "An error occurred";
      toast.error(`update failed: ${errorMessage}`);
    },
  });

  return { isPending, UpdateRoomAsync };
}
