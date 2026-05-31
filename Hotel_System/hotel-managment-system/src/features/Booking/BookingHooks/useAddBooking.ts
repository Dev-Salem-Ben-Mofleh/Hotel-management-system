import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BookingRepository } from "../../../services/Repository/BookingRepository";
import type { Booking } from "../../../services/models/Booking";

export function useAddBooking() {
  const queryClient = useQueryClient();

  const bookingRepository = new BookingRepository();
  const { mutateAsync: AddBookingAsync, isPending } = useMutation({
    mutationFn: async ({ newBooking }: { newBooking: Booking }) => {
      return await bookingRepository.create("AddBooking", newBooking);
    },
    onSuccess: () => {
      toast.success(`Booking added successfully.`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => {
      const errorMessage = err?.message || "An error occurred";
      toast.error(`created failed: ${errorMessage}`);
    },
  });

  return { isPending, AddBookingAsync };
}
