import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BookingRepository } from "../../../services/Repository/BookingRepository";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const bookingRepository = new BookingRepository();

  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: async ({ bookingId }: { bookingId: number }) => {
      return await bookingRepository.delete("DeleteBooking", bookingId);
    },
    onSuccess: () => {
      toast.success("booking successfully deleted.");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => {
      const errorMessage =
        err?.message || "An error occurred while deleting the room.";
      toast.error(`Deletion failed: ${errorMessage}`);
    },
  });

  return { isDeleting, deleteBooking };
}
