import * as Yup from "yup";
import { RoomRepository } from "../../services/Repository/RoomRepository";

const roomRepository = new RoomRepository();

export const bookingSchema = Yup.object({
  personId: Yup.number().required("Person Name is required"),

  roomId: Yup.number()
    .required("Room Number is required")
    .test("room-available", "Room is not available", async function (value) {
      if (value == null) return true;

      try {
        const exists =
          await roomRepository.IsRoomAvailableByAvailabilityStatus(value);

        return exists;
      } catch {
        return true;
      }
    }),

  checkInDate: Yup.string().required("Check-in date is required"),

  checkOutDate: Yup.string()
    .required("Check-out date is required")
    .test(
      "date-availability",
      "Room is not available in this date",
      async function (value) {
        const { parent } = this;

        if (!value || !parent.roomId || !parent.checkInDate) return true;
        console.log(parent, value);
        try {
          const exists = await roomRepository.IsRoomAvailable(
            parent.bookingId || 0,
            parent.roomId,
            parent.checkInDate,
            value,
          );

          return exists;
        } catch {
          return true;
        }
      },
    ),

  status: Yup.string().required("Status is required"),
});

export type BookingFormValues = Yup.InferType<typeof bookingSchema>;
