import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { RoomTypeRepository } from "../../../services/Repository/RoomTypeRepository";

export function useDeleteRoomType() {
  const queryClient = useQueryClient();
  const roomTypeRepository = new RoomTypeRepository();

  const { isPending: isDeleting, mutate: deleteroomType } = useMutation({
    mutationFn: async ({ roomTypeId }: { roomTypeId: number }) => {
      return await roomTypeRepository.delete("DeleteRoomType", roomTypeId);
    },
    onSuccess: () => {
      toast.success("roomType successfully deleted.");
      queryClient.invalidateQueries({
        queryKey: ["roomTypes"],
      });
    },
    onError: (err) => {
      const errorMessage =
        err?.message || "An error occurred while deleting the roomType.";
      toast.error(`Deletion failed: ${errorMessage}`);
    },
  });

  return { isDeleting, deleteroomType };
}
