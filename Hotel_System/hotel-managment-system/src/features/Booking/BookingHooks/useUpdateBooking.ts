import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BookingRepository } from "../../../services/Repository/BookingRepository";
import type { Booking } from "../../../services/models/Booking";

export function useUpdateBooking() {
  const queryClient = useQueryClient();

  const bookingRepository = new BookingRepository();
  const { mutateAsync: UpdateBookingAsync, isPending } = useMutation({
    mutationFn: async ({
      bookingId,
      updateBooking,
    }: {
      bookingId: number;
      updateBooking: Booking;
    }) => {
      return await bookingRepository.update(
        "UpdateBooking",
        bookingId,
        updateBooking,
      );
    },
    onSuccess: () => {
      toast.success(`Booking updated successfully`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => {
      const errorMessage = err?.message || "An error occurred";
      toast.error(`update failed: ${errorMessage}`);
    },
  });

  return { isPending, UpdateBookingAsync };
}
