import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { Room } from "../../../services/models/Room";
import { RoomRepository } from "../../../services/Repository/RoomRepository";

export function useAddRoom() {
  const queryClient = useQueryClient();

  const roomRepository = new RoomRepository();
  const { mutateAsync: AddRoomAsync, isPending } = useMutation({
    mutationFn: async ({ newRoom }: { newRoom: Room }) => {
      return await roomRepository.create("AddRoom", newRoom);
    },
    onSuccess: (result) => {
      toast.success(`Room added successfully with id ${result.roomTypeId}`);
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (err) => {
      const errorMessage = err?.message || "An error occurred";
      toast.error(`created failed: ${errorMessage}`);
    },
  });

  return { isPending, AddRoomAsync };
}
