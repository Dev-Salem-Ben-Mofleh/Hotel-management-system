import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { RoomRepository } from "../../../services/Repository/RoomRepository";

export function useDeleteRoom() {
  const queryClient = useQueryClient();
  const roomRepository = new RoomRepository();

  const { isPending: isDeleting, mutate: deleteRoom } = useMutation({
    mutationFn: async ({ roomId }: { roomId: number }) => {
      return await roomRepository.delete("DeleteRoom", roomId);
    },
    onSuccess: () => {
      toast.success("room successfully deleted.");
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
    },
    onError: (err) => {
      const errorMessage =
        err?.message || "An error occurred while deleting the room.";
      toast.error(`Deletion failed: ${errorMessage}`);
    },
  });

  return { isDeleting, deleteRoom };
}
